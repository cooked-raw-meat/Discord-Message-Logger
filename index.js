//load module
const http = require("http")
const fs = require("fs")
const {Client, Events, GatewayIntentBits, ChannelManager, GuildAuditLogsEntry} = require("discord.js")
const client = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers,],})

//load config
const { token } = require("./config.json")
var { datapath } = require("./config.json")
const { port } = require("./config.json")

//setup
if (!fs.existsSync(datapath)) {fs.mkdirSync(datapath);}
if (!datapath.endsWith("/")) {datapath = datapath+"/"}

//ready messasge
client.on("clientReady", () => {
  console.log(client.user.tag + " ready")
})

//monitoring message
client.on("messageCreate", message => {
  console.log(message.guild.name + ">>"+ message.channel.name + ">>" + message.author.username + ":" + message.content.replace(/\n/g," "))
  if (!fs.existsSync(datapath + message.guild)) {fs.mkdirSync(datapath + message.guild)}
  fs.appendFileSync(datapath + message.guild + "/" + message.channel + ".txt",message.author.username + ":" + message.content.replace(/\n/g," ") + "\n")
});

//server
const server = http.createServer((req, res) => {
  res.writeHead(200,{"content-type": "text/plain"})
  if (req.method === "GET") {
    res.end(client.user.tag + "\nping:" + client.ws.ping + "\nhost:" + process.platform + "\narch:" + process.arch)
  }else if (req.method === "POST") {
    var post = ""
    req.on("data", chunk => {post += chunk;})
    req.on("end", () => {
      if (post.includes(",")) {
        var GuildID = ""
        var ChannelID = ""
        for (let i = 0; i < 19; i++) {GuildID = GuildID + post[i]}
        for (let i = 20; i < 39; i++) {ChannelID = ChannelID + post[i]}
        if (!fs.existsSync(datapath + GuildID + "/" + ChannelID + ".txt")) {
          res.end("File Not Found")
          return
        }
        res.end(fs.readFileSync(datapath + GuildID + "/" + ChannelID + ".txt"))
      }else if(post = " ") {
        var DataList = ""
        const GuildList = fs.readdirSync(datapath)
        for (let i = 0; i < GuildList.length; i++) {
          const ChannelList = fs.readdirSync(datapath + "/" + GuildList[i])
          DataList = DataList + GuildList[i] + "(" +client.guilds.cache.get(GuildList[i]).name + ")\n"
          for (let i = 0; i < ChannelList.length; i++) {
            DataList = DataList + i + "." + ChannelList[i].replace(".txt", "") + "(" +client.channels.cache.get(ChannelList[i].replace(".txt", "")).name + ")\n"
          }
        }
        res.end(DataList)
      }else{
        res.end("Syntax Error")
      }
    })
  }
}).listen(port)

//login
client.login(token)
