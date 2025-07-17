const { Client, Events, GatewayIntentBits } = require("discord.js")
const fs = require("fs-extra");
const http = require("http");
const readLastLines = require('read-last-lines');
const { token } = require("./config.json")
const { datapath } = require("./config.json")
const { port } = require("./config.json");
const { read, readlink } = require("fs");
const client = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers,],})
if (!fs.existsSync(datapath)) {fs.mkdirSync(datapath);}
client.login(token)

client.on(Events.ClientReady, c => {
	console.log(`${c.user.tag}`)
})

client.on('messageCreate', async message => {
if (message.author.bot) {return}
if (message.content.replace(" ","") === "") {return}
var content = message.author.username + " : " + message.content
content = content.replace(/\n/g, " ")
content = content.replace(/\d{5}/g, "")
console.log(message.guild.name + " >> " + content)
const filepath = datapath + message.guildId + ".txt"
fs.appendFile(filepath, content + "\n", function (err) {if (err) throw err})
})

http.createServer((req, res) => {
	if (req.method === "POST") {
		let body = ""
		req.on("data", chunk => {body += chunk;});
	    req.on("end", () => {
		    readLastLines.read(datapath+body+".txt", 50)
		    .then((lines) => res.end(lines));
	    });
	}else{
		req.end("Please POST GuildID")
	}
}).listen(port, () => console.log("has http server started a "+port+"port"))
