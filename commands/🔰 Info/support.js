const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "support",
  category: "🔰 Info",
  usage: "invite",
  description: "Sends you the Support Server Link",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let button_public_invite = new MessageButton().setStyle('url').setLabel('Invite Public Bot').setURL("https://discord.com/api/oauth2/authorize?client_id=865203502245609472&permissions=8&scope=bot")
      let button_invite = new MessageButton().setStyle('url').setLabel('Invite this Bot').setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
      //array of all buttons
      const allbuttons = [button_public_invite,  button_invite]
      message.channel.send({
        embed: new MessageEmbed()
          .setColor(ee.color)
         .setTitle(":tickets: You Need Help? **JOIN OUR SUPPORT SERVER**")
          .setDescription(`**[WEBSITE](https://www.devmrvenom.ml/)  •  [Support Server](https://discord.gg/bTY2quuXp3)  •   
          [Support Patreons](https://www.patreon.com/DevVenom)**`)
          .setFooter("Developed by MrVenomYt#7103", "https://media.discordapp.net/attachments/886502267262488586/891250731821191228/Logo_3_Reapers.png")
          .setURL("https://discord.com/api/oauth2/authorize?client_id=865279052716834856&permissions=8&scope=bot"),
        buttons: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}

