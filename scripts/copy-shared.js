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
// execSync(
//   `rm -f scripts/upload.js && cp -a ../private-sharedjs/scripts/upload.js scripts/upload.js`
// );
