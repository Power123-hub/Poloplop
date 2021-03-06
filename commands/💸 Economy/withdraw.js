const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "withdraw",
  category: "💸 Economy",
  aliases: ["tobank"],
  description: "Allows you to withdraw a specific amount or everything from your Bank",
  usage: "withdraw <AMOUNT/ALL>",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(!client.settings.get(message.guild.id, "ECONOMY")){
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
      );
    }
    try {
    //command
    var user = message.author
    if(user.bot) return message.reply("<:no:833101993668771842> **A Discord Bot can not have Economy!**")
    
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, user.id)
    var data = client.economy.get(`${message.guild.id}-${user.id}`)
    if(!args[0])
      return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:no:833101993668771842> You didn't provide a valid Argument`)
          .setDescription(`Usage: \`${prefix}withdraw <All/Amount>\`\n\n\Example: \`${prefix}withdraw 100\``)
        );
    if(args[0].toLowerCase() == "all"){
      client.economy.math(`${message.guild.id}-${user.id}`, "+", data.bank, "balance")
      //set the current time to the db
      client.economy.set(`${message.guild.id}-${user.id}`, 0, "bank")

      var withdrawed = data.balance;

      data = client.economy.get(`${message.guild.id}-${user.id}`)

      return message.reply(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`<a:yes:833101995723194437> You withdrawed **\`${nFormatter(withdrawed)}💸\`** from your Bank`)
        .setDescription(`**🏦 You now have \`${nFormatter(Math.floor(data.bank))} 💸\` in your Bank**\n\n👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
      );
    }else {
      let amount = Number(args[0]);
      if(amount <= 0)
      return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:no:833101993668771842> You can't withdraw a negative Amount of Money or no Money, from your Bank`)
        );
      
      if(amount > data.bank)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:no:833101993668771842> You can't withdraw more Money than you have in your **🏦 Bank (\`${data.balance} 💸\`)**`)
        );
      
      client.economy.math(`${message.guild.id}-${user.id}`, "+", amount, "balance")
      client.economy.math(`${message.guild.id}-${user.id}`, "-", amount, "bank")
      //get the data
      data = client.economy.get(`${message.guild.id}-${user.id}`)
      //show the message
      return message.reply(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`<a:yes:833101995723194437> You withdrawed **\`${nFormatter(amount)}💸\`** from your Bank`)
        .setDescription(`**🏦 You now have \`${nFormatter(Math.floor(data.bank))} 💸\` in your Bank**\n\n👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
      );
    }
  } catch (e) {
    console.log(String(e.stack).bgRed)
    return message.channel.send(new MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`<:no:833101993668771842> An error occurred`)
      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
    );
  }
}
};

