const { Client, Events, GatewayIntentBits } = require("discord.js")
const fs = require("fs-extra");
const http = require("http");
const readLastLines = require('read-last-lines');
const { token } = require("./config.json")
var { datapath } = require("./config.json")
const { port } = require("./config.json");
const client = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers,],})
if (!fs.existsSync(datapath)) {fs.mkdirSync(datapath);}
if (!datapath.endsWith("/")) {datapath = datapath+"/"}
client.login(token)
client.on(Events.ClientReady, c => {console.log(`${c.user.tag}`)})

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
	if (!port > 1024) {console.log("Set the port to 1024 higher");return;}
	if (req.method === "POST") {
		var body = ""
		req.on("data", chunk => {body += chunk;});
	    req.on("end", () => {
			if (!fs.existsSync(datapath+body+".txt")) {
				var guildlist = fs.readdirSync(datapath);
				for (i = 0;i < guildlist.length;i++) {
					guildlist[i] = guildlist[i].replace(".txt","");
					guild = client.guilds.cache.get(guildlist[i]);guildlist[i] = guildlist[i] + "("+guild.name+")\n";}
					res.end("GuildID List\n"+guildlist.join(""));return;
				}
		    readLastLines.read(datapath+body+".txt", 50)
		    .then((lines) => res.end(lines));
	    });
	}else{
		res.end("")
	}
}).listen(port, () => console.log("has http server started a "+port+"port"))
