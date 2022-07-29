/*const Discord = require('discord.js');
const client = new Discord.Client(994119180284592148);
const token = 'OTk0MTE5MTgwMjg0NTkyMTQ4.G1qOKl.4EHiqZcgvm2Q9tSkbQrGeHBrk0Ko5_-_NHuMFA'

client.once('ready', () => {
   console.log('Félicitations, votre bot Discord a été correctement initialisé !');
});

client.login(token);*/

require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client({intents: [
  Discord.Intents.FLAGS.GUILDS,
  Discord.Intents.FLAGS.GUILD_MEMBERS,
 ]
});
const prefix = "/"
client.on("ready", () => {
  console.log(`${client.user.tag} est en ligne !`)
});

const Canvas = require("canvas");
const dim = {
  height: 1080,
  width: 1920,
  margin: 50,
  round: 5
}

// Welcome Message
client.on("guildMemberAdd", async member => {
  console.log("un membre est arrivé.");
 client.channels.cache.get("1001459617949306961").send("VROOM ! <@" + member.id + "> est arrivé sur le terrain !");

  var canvas = Canvas.createCanvas(1920, 1080);

  ctx = canvas.getContext("2d");

  var background = await Canvas.loadImage("./background.png");
  ctx.drawImage(background, 0, 0, 1920, 1080);

  ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
  ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin, dim.round);

 // var blanc = await Canvas.loadImage("./blanc.png");
 // ctx.drawImage(blanc, 0, 0, 914, 899);

  ctx.font = "180px Maximum Impact";
  ctx.fillStyle = "#F19BE4";
  ctx.textAlign = "center";
  ctx.fillText("BIENVENUE", 930, 820);

  ctx.font = "120px Maximum Impact";
  ctx.fillStyle = "#FF6A7C";
  ctx.textAlign = "center";
  ctx.fillText(member.user.tag.toUpperCase(), 930, 970);

  ctx.beginPath();
  ctx.arc(920, 390, 245, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();


  var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
    format: "png",
    size: 1024
  }));

  ctx.drawImage(avatar, 650, 100, 538, 538);
  

  var attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");

  client.channels.cache.get("1001459617949306961").send({files: [attachment]});

});

// Custom Status
client.on("ready", () => {
  function randomStatus() {
    let status = ["En Maintenance..."]
    let rstatus = Math.floor(Math.random() * status.length);

    client.user.setActivity(status[rstatus], {type: "PLAYING", url: "https://twitch.tv/bijuesport"});
  }; setInterval(randomStatus, 2000)
});

client.login(process.env.DISCORD_TOKEN);
