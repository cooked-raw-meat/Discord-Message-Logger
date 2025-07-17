const fs = require("fs-extra");
const git = require("simple-git");
git().clone("https://github.com/cooked-raw-meat/Discord-Message-Logger", "temp");
function updatecheck() {if (!fs.existsSync("temp")) {setTimeout(updatecheck, 1000);}else{update();}}
function update () {fs.removeSync("temp/config.json");fs.copy("temp","./");fs.removeSync("temp");}
updatecheck();
