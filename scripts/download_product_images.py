#!/usr/bin/env python3
"""
Crystal Industries - Accurate Product Image Downloader v2
"""
import io, time, urllib.request, urllib.error
from pathlib import Path
from PIL import Image, ImageOps

PUBLIC_DIR = Path("public/products/items")
ASSETS_DIR = Path("src/assets/products/items")
PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
ASSETS_DIR.mkdir(parents=True, exist_ok=True)

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0"}

PRODUCT_IMAGE_MAP = {
    "whole-chili":       "https://images.unsplash.com/photo-1588177806125-c7b54ab3-bda6?auto=format&fit=crop&w=600&q=82",
    "turmeric-finger":   "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=82",
    "nutmeg-whole":      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=82",
    "cinnamon":          "https://images.unsplash.com/photo-1559181567-c3190ca9be46?auto=format&fit=crop&w=600&q=82",
    "cloves":            "https://images.unsplash.com/photo-1612528443702-f6741f70a049?auto=format&fit=crop&w=600&q=82",
    "dry-ginger":        "https://images.unsplash.com/photo-1573163946968-53fa3a93c0f7?auto=format&fit=crop&w=600&q=82",
    "turmeric-powder":   "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=82",
    "chilli-powder":     "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=82",
    "cumin-powder":      "https://images.unsplash.com/photo-1607302591952-a12c8e11e67c?auto=format&fit=crop&w=600&q=82",
    "coriander-powder":  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=82",
    "fenugreek-powder":  "https://images.unsplash.com/photo-1597690774706-97c6b38ac6dd?auto=format&fit=crop&w=600&q=82",
    "nutmeg-powder":     "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=82",
    "cinnamon-powder":   "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=600&q=82",
    "curry-powder":      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=82",
    "black-pepper-powder":"https://images.unsplash.com/photo-1618306400042-6de31ddb1dcb?auto=format&fit=crop&w=600&q=82",
    "ginger-powder":     "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=82",
    "cumin-seeds":       "https://images.unsplash.com/photo-1607302591952-a12c8e11e67c?auto=format&fit=crop&w=600&q=82",
    "sesame-seeds":      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=82",
    "fenugreek-seeds":   "https://images.unsplash.com/photo-1597690774706-97c6b38ac6dd?auto=format&fit=crop&w=600&q=82",
    "fennel-seeds":      "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=600&q=82",
    "coriander-seeds":   "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=82",
    "black-mustard-seeds":"https://images.unsplash.com/photo-1612528443702-f6741f70a049?auto=format&fit=crop&w=600&q=82",
    "yellow-mustard-seeds":"https://images.unsplash.com/photo-1612528443702-f6741f70a049?auto=format&fit=crop&w=600&q=82",
    "black-cumin-seeds": "https://images.unsplash.com/photo-1597690774706-97c6b38ac6dd?auto=format&fit=crop&w=600&q=82",
    "chia-seeds":        "https://images.unsplash.com/photo-1548898994-efd85d3d1d6d?auto=format&fit=crop&w=600&q=82",
    "flax-seeds":        "https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&w=600&q=82",
    "dill-seeds":        "https://images.unsplash.com/photo-1611575619040-e3e1c7f3e8b1?auto=format&fit=crop&w=600&q=82",
    "basil-seeds":       "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=82",
    "asaliya-seeds":     "https://images.unsplash.com/photo-1611575619040-e3e1c7f3e8b1?auto=format&fit=crop&w=600&q=82",
    "cardamom-seeds":    "https://images.unsplash.com/photo-1640265284660-2a82b0b7c5df?auto=format&fit=crop&w=600&q=82",
    "sunflower-seeds":   "https://images.unsplash.com/photo-1555951015-6da899b5c2cd?auto=format&fit=crop&w=600&q=82",
    "soyabean-seeds":    "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=82",
    "psyllium-seeds":    "https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&w=600&q=82",
    "sorghum":           "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=82",
    "millet":            "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=82",
    "chickpeas":         "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=82",
    "quinoa":            "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=82",
    "basmati-rice":      "https://images.unsplash.com/photo-1536304993881-ff86e0c9c9d2?auto=format&fit=crop&w=600&q=82",
    "non-basmati-rice":  "https://images.unsplash.com/photo-1536304993881-ff86e0c9c9d2?auto=format&fit=crop&w=600&q=82",
    "roasted-gram":      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=82",
    "garlic-powder":     "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=600&q=82",
    "garlic-flakes":     "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=600&q=82",
    "garlic-granules":   "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=600&q=82",
    "red-onion-powder":  "https://images.unsplash.com/photo-1618236736535-bf66d62d3b31?auto=format&fit=crop&w=600&q=82",
    "pink-onion-powder": "https://images.unsplash.com/photo-1618236736535-bf66d62d3b31?auto=format&fit=crop&w=600&q=82",
    "white-onion-powder":"https://images.unsplash.com/photo-1618236736535-bf66d62d3b31?auto=format&fit=crop&w=600&q=82",
    "red-onion-flakes":  "https://images.unsplash.com/photo-1618236736535-bf66d62d3b31?auto=format&fit=crop&w=600&q=82",
    "pink-onion-flakes": "https://images.unsplash.com/photo-1618236736535-bf66d62d3b31?auto=format&fit=crop&w=600&q=82",
    "white-onion-flakes":"https://images.unsplash.com/photo-1618236736535-bf66d62d3b31?auto=format&fit=crop&w=600&q=82",
    "onion-granules":    "https://images.unsplash.com/photo-1618236736535-bf66d62d3b31?auto=format&fit=crop&w=600&q=82",
    "fried-onion-crispy":"https://images.unsplash.com/photo-1618236736535-bf66d62d3b31?auto=format&fit=crop&w=600&q=82",
    "senna-leaves":      "https://images.unsplash.com/photo-1574856344991-aaa31b6f4b38?auto=format&fit=crop&w=600&q=82",
    "senna-pods":        "https://images.unsplash.com/photo-1574856344991-aaa31b6f4b38?auto=format&fit=crop&w=600&q=82",
    "moringa-leaves":    "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?auto=format&fit=crop&w=600&q=82",
    "ashwagandha":       "https://images.unsplash.com/photo-1627483297886-49710ae1fc22?auto=format&fit=crop&w=600&q=82",
    "bay-leaf":          "https://images.unsplash.com/photo-1574856344991-aaa31b6f4b38?auto=format&fit=crop&w=600&q=82",
    "rosemary-leaves":   "https://images.unsplash.com/photo-1515586838455-8b35f4a38e5d?auto=format&fit=crop&w=600&q=82",
    "sage-leaves":       "https://images.unsplash.com/photo-1592419043777-03c1e98c1f55?auto=format&fit=crop&w=600&q=82",
    "basil-sweet-leaves":"https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=600&q=82",
    "akarkara":          "https://images.unsplash.com/photo-1627483297886-49710ae1fc22?auto=format&fit=crop&w=600&q=82",
    "neem-leaves":       "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?auto=format&fit=crop&w=600&q=82",
    "psyllium-husk-shorts":"https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&w=600&q=82",
    "desiccated-coconut":"https://images.unsplash.com/photo-1561043433-9265f73e203f?auto=format&fit=crop&w=600&q=82",
    "dry-copra":         "https://images.unsplash.com/photo-1581375073936-ec71e6fdb73f?auto=format&fit=crop&w=600&q=82",
    "robusta-coffee":    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=82",
    "arabica-coffee":    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=82",
    "raisins":           "https://images.unsplash.com/photo-1593100126453-19b562a800c1?auto=format&fit=crop&w=600&q=82",
    "cashew":            "https://images.unsplash.com/photo-1563208622-5782e4832451?auto=format&fit=crop&w=600&q=82",
    "peanuts":           "https://images.unsplash.com/photo-1567892737950-30c4db37cd89?auto=format&fit=crop&w=600&q=82",
}

def optimize_image(data):
    img = Image.open(io.BytesIO(data))
    img = ImageOps.exif_transpose(img)
    if img.mode != "RGB":
        img = img.convert("RGB")
    img.thumbnail((520, 390), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=82, optimize=True)
    return buf.getvalue()

def download_and_save(product_id, url):
    pub_file = PUBLIC_DIR / f"{product_id}.jpg"
    asset_file = ASSETS_DIR / f"{product_id}.jpg"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            raw = resp.read()
        if len(raw) < 3000:
            print(f"  [!] {product_id}: Too small, skipping")
            return False
        opt = optimize_image(raw)
        pub_file.write_bytes(opt)
        asset_file.write_bytes(opt)
        print(f"  [OK] {product_id}.jpg -> {len(opt)//1024}KB")
        return True
    except Exception as e:
        print(f"  [FAIL] {product_id}: {e}")
        fallback = Path("src/assets/hero-spices.jpg")
        if fallback.exists():
            opt = optimize_image(fallback.read_bytes())
            pub_file.write_bytes(opt)
            asset_file.write_bytes(opt)
            print(f"  [FALLBACK] {product_id}.jpg")
            return True
        return False

def main():
    print(f"Crystal Industries - Downloading {len(PRODUCT_IMAGE_MAP)} product images...\n")
    ok = 0
    for pid, url in PRODUCT_IMAGE_MAP.items():
        if download_and_save(pid, url):
            ok += 1
        time.sleep(0.2)
    print(f"\nComplete! {ok}/{len(PRODUCT_IMAGE_MAP)} images saved.")

if __name__ == "__main__":
    main()