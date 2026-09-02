import sharp from 'sharp'

const sizes = [192, 512]

const svg = (size) => {
  const r = Math.round(size * 0.22)
  const fs = Math.round(size * 0.5)
  const ty = Math.round(size * 0.69)
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="#0A0A0A"/>
  <text x="${size/2}" y="${ty}" font-family="system-ui, sans-serif" font-size="${fs}" font-weight="800" fill="#B3FF1D" text-anchor="middle">C</text>
</svg>`)
}

for (const size of sizes) {
  await sharp(svg(size))
    .resize(size, size)
    .png()
    .toFile(`public/icon-${size}.png`)
  console.log(`Generated icon-${size}.png`)
}
