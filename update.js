const fs = require("fs-extra");
const git = require("simple-git");
git().clone("https://github.com/cooked-raw-meat/Discord-Message-Logger", "temp");
function updatecheck() {
    if (!fs.existsSync("temp/index.js")) {
        setTimeout(updatecheck, 1000);
    }else{
        update();
    }
}
function update () {
    fs.removeSync("temp/config.json");
    fs.copySync("temp","./");
    fs.removeSync("temp");
    console.log("Update has  Successfully")
}
updatecheck();
