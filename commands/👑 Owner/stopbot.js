var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing, isValidURL
} = require(`../../handlers/functions`);
module.exports = {
  name: "stopbot",
  category: "👑 Owner",
  aliases: ["botrestart"],
  cooldown: 5,
  usage: "stopbot",
  description: "Stops the Bot, to set it OFFLINE",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(message.author.id != "442355791412854784")
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> **You are not allowed to run this Command**`)
        .setDescription(`***Only <@442355791412854784> is allowed to execute this Command, this is to prevent Rate Limits, if you need a Bot restart Contact him (\`Tomato#6966\`)***`)
      );
    try {
      message.reply("Stopping BOT! If you want it back online then DM: `Tomato#6966`")

      message.channel.send(`Please send this Information to him too, if you want the Bot to get back online!:\n\n> **Path:**
\`\`\`yml
${process.cwd()}
\`\`\`
> **Server:**
\`\`\`yml
${String(Object.values(require('os').networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family==='IPv4' && !i.internal && i.address || []), [])), [])).split(".")[3]}
\`\`\`
> **Command:**
\`\`\`yml
pm2 list | grep "${String(String(process.cwd()).split("/")[String(process.cwd()).split("/").length - 1]).toLowerCase()}" --ignore-case
\`\`\`
`)

      require("child_process").exec(`pm2 stop index.js CLANBOT_${process.cwd().split(require("path").sep).pop()}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          message.reply("SOMETHING WENT WRONG, CONTACT THE OWNER PLEASE! `Tomato#6966`")
          return;
        }
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  },
};
