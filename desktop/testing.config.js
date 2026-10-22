// electron-builder settings for Fire at Will Testing: the normal app's settings from package.json,
// with its own name and id (so it installs next to the game and keeps its own saved data)
// and fire-at-will-testing.html as the game file. Build with: npx electron-builder --config testing.config.js
const base = JSON.parse(JSON.stringify(require('./package.json').build));

module.exports = {
  ...base,
  appId: 'com.foma.fireatwill.testing',
  productName: 'Fire at Will Testing',
  extraMetadata: { name: 'fire-at-will-testing', productName: 'Fire at Will Testing', testing: true, desktopName: 'fire-at-will-testing.desktop' },
  files: base.files.map((f) => (typeof f === 'object' ? { ...f, filter: ['fire-at-will-testing.html'] } : f === 'build/icon.png' ? 'build/icon-testing.png' : f)),
  icon: 'build/icon-testing.png',   // the game's icon in blueprint blue
  nsis: { ...base.nsis, artifactName: 'Fire-at-Will-Testing-Setup.${ext}' },
  portable: { ...base.portable, artifactName: 'Fire-at-Will-Testing-Portable.${ext}' },
  mac: { ...base.mac, artifactName: 'Fire-at-Will-Testing-Mac.${ext}' },
  linux: { ...base.linux, artifactName: 'Fire-at-Will-Testing-Linux.${ext}' },
};
