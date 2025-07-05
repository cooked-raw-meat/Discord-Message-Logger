const fs = require("fs-extra");
const git = require("simple-git");
git().clone('https://github.com/cooked-raw-meat/Discord-Message-Logger', 'temp');
function update(){
if (!fs.existsSync("temp")) {checkUpdate()}
fs.copyFileSync("temp/index.js","index.js")
fs.remove('temp')
}
function checkUpdate() {
setTimeout(update, 1000);
}
checkUpdate();