const { Client, Events, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');
const { datapath } = require('./config.json');
const client = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers,],});
if (!fs.existsSync(datapath)) {fs.mkdirSync(datapath);}
client.login(token);

client.on(Events.ClientReady, c => {
	console.log(`${c.user.tag}`);
});

client.on('messageCreate', async message => {
if (message.author.bot) {return;}
if (message.content === " ") {return;}
var content = message.author.username + " : " + message.content;
content = content.replace("\n", " ");
console.log(message.guild.name + " >> " + content);
const filepath = datapath + message.guildId + ".txt"
fs.appendFile(filepath, content + "\n", function (err) {if (err) throw err;});
})