const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const lib = process.argv[2];

const sharedDir = path.join(__dirname, '..', 'src', 'shared');
const privateSharedDir = path.join(__dirname, '..', '..', 'private-sharedjs', 'lib');

fs.rmSync(sharedDir, { recursive: true, force: true });
fs.mkdirSync(sharedDir, { recursive: true });
fs.cpSync(path.join(privateSharedDir, 'js'), path.join(sharedDir, 'js'), { recursive: true });
fs.cpSync(path.join(privateSharedDir, 'browser'), path.join(sharedDir, 'browser'), { recursive: true });
if (lib === 'radix') {
  fs.cpSync(path.join(privateSharedDir, 'radix'), path.join(sharedDir, 'radix'), { recursive: true });
} else if (lib === 'semi') {
  fs.cpSync(path.join(privateSharedDir, 'semi'), path.join(sharedDir, 'semi'), { recursive: true });
}

const alsoBuiltPath = path.join(sharedDir, 'semi', 'AlsoBuilt.jsx');
if (fs.existsSync(alsoBuiltPath)) {
  const alsoBuilt = fs
    .readFileSync(alsoBuiltPath, 'utf8')
    .replaceAll('https://soundice.net', 'https://soundice.peng37.com')
    .replaceAll('https://app.soundice.net/icons2/icon-192.png', 'https://soundice.peng37.com/icons2/icon-192.png')
    .replaceAll('https://moonfinder.live', 'https://moonfinder.peng37.com');
  fs.writeFileSync(alsoBuiltPath, alsoBuilt);
}
// execSync(
//   `rm -f scripts/upload.js && cp -a ../private-sharedjs/scripts/upload.js scripts/upload.js`
// );
