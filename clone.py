#!/usr/bin/env python3
"""
clone_site.py
-------------
Clones a static (React/Vite built) website by downloading the HTML page,
then following all linked assets (JS, CSS, images, fonts, favicons, etc.)
referenced inside HTML and CSS, and saves everything into a clean local
folder structure that mirrors the site's URL paths.

Works well for Vite/React (and Lovable) builds because after `vite build`
the whole site is just static files (index.html + /assets/*.js/*.css/*.png...),
so a recursive asset-follower reconstructs it almost 1:1.

USAGE:
    pip install requests beautifulsoup4 tinycss2
    python clone_site.py https://warisbrotherenterprises.co.in/ ./cloned_site

If tinycss2 isn't installed, the script still works (it falls back to a
regex-based CSS url() scanner).
"""

import os
import re
import sys
import time
import mimetypes
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote

import requests
from bs4 import BeautifulSoup

try:
    import tinycss2
    HAVE_TINYCSS2 = True
except ImportError:
    HAVE_TINYCSS2 = False


HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    )
}

# Tags/attrs that can hold a URL we want to download
HTML_ASSET_ATTRS = [
    ("link", "href"),
    ("script", "src"),
    ("img", "src"),
    ("img", "srcset"),
    ("source", "src"),
    ("source", "srcset"),
    ("video", "poster"),
    ("audio", "src"),
]

CSS_URL_RE = re.compile(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)")


class SiteCloner:
    def __init__(self, base_url: str, out_dir: str, max_pages: int = 50, delay: float = 0.15):
        self.base_url = base_url.rstrip("/") + "/"
        self.origin = "{0.scheme}://{0.netloc}".format(urlparse(self.base_url))
        self.out_dir = Path(out_dir)
        self.max_pages = max_pages
        self.delay = delay

        self.visited_pages = set()
        self.downloaded_assets = set()
        self.session = requests.Session()
        self.session.headers.update(HEADERS)

        self.out_dir.mkdir(parents=True, exist_ok=True)

    # ---------- helpers ----------

    def is_same_origin(self, url: str) -> bool:
        return urlparse(url).netloc in ("", urlparse(self.origin).netloc)

    def url_to_local_path(self, url: str) -> Path:
        """Map a URL to a local file path inside out_dir, mirroring its structure."""
        parsed = urlparse(url)
        path = unquote(parsed.path)

        if path in ("", "/"):
            path = "/index.html"
        elif path.endswith("/"):
            path = path + "index.html"
        else:
            # if there's no file extension, treat as a route -> index.html inside folder
            last_segment = path.rsplit("/", 1)[-1]
            if "." not in last_segment:
                path = path.rstrip("/") + "/index.html"

        local_path = self.out_dir / path.lstrip("/")
        return local_path

    def save_bytes(self, local_path: Path, content: bytes):
        local_path.parent.mkdir(parents=True, exist_ok=True)
        with open(local_path, "wb") as f:
            f.write(content)

    def fetch(self, url: str):
        try:
            resp = self.session.get(url, timeout=20)
            resp.raise_for_status()
            return resp
        except requests.RequestException as e:
            print(f"  [!] Failed: {url} ({e})")
            return None

    # ---------- asset downloading ----------

    def download_asset(self, url: str):
        """Download a single asset (js/css/image/font/etc.), rewriting CSS url()s recursively."""
        clean_url = url.split("#")[0]
        if clean_url in self.downloaded_assets:
            return
        if not self.is_same_origin(clean_url):
            return  # skip external CDNs/fonts by default (see NOTE below)

        self.downloaded_assets.add(clean_url)
        resp = self.fetch(clean_url)
        if resp is None:
            return

        local_path = self.url_to_local_path(clean_url)
        content = resp.content

        content_type = resp.headers.get("Content-Type", "")
        if "css" in content_type or clean_url.endswith(".css"):
            content = self.process_css(clean_url, content.decode("utf-8", errors="ignore"))
            content = content.encode("utf-8")

        self.save_bytes(local_path, content)
        print(f"  [+] Saved asset: {local_path.relative_to(self.out_dir)}")
        time.sleep(self.delay)

    def process_css(self, css_url: str, css_text: str) -> str:
        """Find url(...) references inside CSS, download them, and rewrite to relative paths."""
        urls_found = set(CSS_URL_RE.findall(css_text))

        for raw_url in urls_found:
            raw_url = raw_url.strip()
            if raw_url.startswith("data:"):
                continue
            absolute = urljoin(css_url, raw_url)
            if self.is_same_origin(absolute):
                self.download_asset(absolute)
                # Rewrite to a relative path from this CSS file's folder
                css_local = self.url_to_local_path(css_url)
                asset_local = self.url_to_local_path(absolute)
                rel = os.path.relpath(asset_local, start=css_local.parent)
                css_text = css_text.replace(raw_url, rel.replace(os.sep, "/"))

        return css_text

    # ---------- HTML page crawling ----------

    def process_srcset(self, srcset_value: str, page_url: str):
        """srcset can contain multiple 'url widthDescriptor' pairs."""
        candidates = [c.strip() for c in srcset_value.split(",") if c.strip()]
        for c in candidates:
            parts = c.split()
            if not parts:
                continue
            url = urljoin(page_url, parts[0])
            if self.is_same_origin(url):
                self.download_asset(url)

    def crawl_page(self, url: str):
        clean_url = url.split("#")[0]
        if clean_url in self.visited_pages or len(self.visited_pages) >= self.max_pages:
            return
        if not self.is_same_origin(clean_url):
            return

        self.visited_pages.add(clean_url)
        print(f"[Page] {clean_url}")
        resp = self.fetch(clean_url)
        if resp is None:
            return

        soup = BeautifulSoup(resp.text, "html.parser")

        # download every asset referenced in the HTML
        for tag_name, attr in HTML_ASSET_ATTRS:
            for tag in soup.find_all(tag_name):
                val = tag.get(attr)
                if not val:
                    continue
                if attr == "srcset":
                    self.process_srcset(val, clean_url)
                else:
                    absolute = urljoin(clean_url, val)
                    if self.is_same_origin(absolute):
                        self.download_asset(absolute)

        # inline <style> url(...) references
        for style_tag in soup.find_all("style"):
            if style_tag.string:
                style_tag.string.replace_with(self.process_css(clean_url, style_tag.string))

        # save the (unmodified-reference) HTML as-is; asset paths in a Vite build
        # are already root-relative (e.g. /assets/index-xxxx.js) which will work
        # fine when served from a local static server or re-deployed as-is.
        local_path = self.url_to_local_path(clean_url)
        self.save_bytes(local_path, str(soup).encode("utf-8"))
        print(f"  [+] Saved page: {local_path.relative_to(self.out_dir)}")

        # follow same-origin internal links for extra routes (SPA routes will
        # mostly 404 server-side but this catches any additional real pages,
        # e.g. /sitemap.xml, /robots.txt style static files linked in <a href>)
        for a in soup.find_all("a", href=True):
            absolute = urljoin(clean_url, a["href"])
            absolute = absolute.split("#")[0]
            if self.is_same_origin(absolute) and absolute not in self.visited_pages:
                # only follow "page-like" links, skip mailto/tel/etc.
                if absolute.startswith(self.origin):
                    self.crawl_page(absolute)

        time.sleep(self.delay)

    # ---------- entry point ----------

    def run(self):
        # always grab common root files too
        for extra in ["robots.txt", "sitemap.xml", "favicon.ico", "manifest.json", "site.webmanifest"]:
            self.download_asset(urljoin(self.origin + "/", extra))

        self.crawl_page(self.base_url)

        print("\nDone.")
        print(f"Pages saved:  {len(self.visited_pages)}")
        print(f"Assets saved: {len(self.downloaded_assets)}")
        print(f"Output folder: {self.out_dir.resolve()}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python clone_site.py <url> [output_folder]")
        sys.exit(1)

    url = sys.argv[1]
    out_dir = sys.argv[2] if len(sys.argv) > 2 else "cloned_site"

    cloner = SiteCloner(url, out_dir)
    cloner.run()


if __name__ == "__main__":
    main()