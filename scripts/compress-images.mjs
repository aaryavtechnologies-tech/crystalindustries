import sharp from "sharp";
import { readdirSync, statSync, renameSync } from "fs";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ASSETS_DIR = join(__dirname, "..", "src", "assets");

function getAllImages(dir) {
  const results = [];
  const items = readdirSync(dir);
  for (const item of items) {
    const full = join(dir, item);
    if (statSync(full).isDirectory()) {
      results.push(...getAllImages(full));
    } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
      results.push(full);
    }
  }
  return results;
}

const images = getAllImages(ASSETS_DIR);
console.log(`Found ${images.length} images to compress...`);

let totalBefore = 0;
let totalAfter = 0;

for (const imgPath of images) {
  const sizeBefore = statSync(imgPath).size;
  totalBefore += sizeBefore;
  const ext = extname(imgPath).toLowerCase();
  const tmpPath = imgPath + ".tmp";

  try {
    if (ext === ".png") {
      await sharp(imgPath)
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(tmpPath);
    } else {
      await sharp(imgPath)
        .jpeg({ quality: 78, progressive: true, mozjpeg: true })
        .toFile(tmpPath);
    }
    renameSync(tmpPath, imgPath);
    const sizeAfter = statSync(imgPath).size;
    totalAfter += sizeAfter;
    const saved = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(1);
    console.log(`  ✓ ${basename(imgPath)}: ${(sizeBefore/1024).toFixed(0)}KB → ${(sizeAfter/1024).toFixed(0)}KB (-${saved}%)`);
  } catch (err) {
    console.error(`  ✗ ${basename(imgPath)}: ${err.message}`);
    try { renameSync(tmpPath, imgPath); } catch {}
  }
}

console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(2)}MB → ${(totalAfter/1024/1024).toFixed(2)}MB (saved ${((totalBefore-totalAfter)/1024/1024).toFixed(2)}MB)`);
