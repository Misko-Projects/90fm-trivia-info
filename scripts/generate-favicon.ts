/**
 * Build app/favicon.ico from app/icon.svg.
 *
 * Re-run any time the SVG icon changes:
 *   pnpm icon:generate
 *
 * Modern browsers prefer the SVG automatically; this is purely a legacy
 * fallback for clients that only understand ICO.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const SOURCE_SVG = path.resolve("app/icon.svg");
const OUTPUT_ICO = path.resolve("app/favicon.ico");
// Classic Windows ICO container: 16, 32, 48. Browsers pick the best match.
const SIZES = [16, 32, 48];

async function main() {
  const svg = await fs.readFile(SOURCE_SVG);

  // Render a PNG at each target size. The SVG has a dark-mode media query
  // which doesn't apply during raster render — sharp uses the default
  // (light-mode) styles, which is correct for an ICO fallback.
  const pngs = await Promise.all(
    SIZES.map((size) =>
      sharp(svg, { density: 384 })
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer(),
    ),
  );

  const ico = await pngToIco(pngs);
  await fs.writeFile(OUTPUT_ICO, ico);
  console.log(`Wrote ${OUTPUT_ICO} (${ico.byteLength} bytes, sizes: ${SIZES.join(", ")})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
