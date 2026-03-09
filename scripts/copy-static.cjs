const fs = require('fs');
const path = require('path');

const root = process.cwd();
const dist = path.join(root, 'dist');

const copyTargets = ['rogo', 'KigyouSearch'];

for (const target of copyTargets) {
  const src = path.join(root, target);
  const dest = path.join(dist, target);

  if (!fs.existsSync(src)) {
    continue;
  }

  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log(`Copied: ${target}`);
}
