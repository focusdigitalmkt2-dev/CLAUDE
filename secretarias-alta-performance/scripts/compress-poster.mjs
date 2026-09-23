// Reduz a capa da VSL (baixada do YouTube no deploy) para 960px de largura,
// qualidade 72 e sem metadados: ~35-45 KB em vez de ~105 KB.
// Uso: node scripts/compress-poster.mjs <entrada.jpg> <saida.jpg>
import { createRequire } from "node:module";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("uso: node scripts/compress-poster.mjs <entrada.jpg> <saida.jpg>");
  process.exit(1);
}

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_PATH || "sharp");

const info = await sharp(input)
  .resize({ width: 960, withoutEnlargement: true })
  .jpeg({ quality: 72, mozjpeg: true })
  .toFile(output);

console.log(`capa: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`);
