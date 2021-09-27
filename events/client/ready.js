//here the event starts
const config = require("../../botconfig/config.json")
module.exports = client => {

  try{
    try{
      const stringlength = 69;
      console.log("\n")
      console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + `Discord Bot is online!`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`Discord Bot is online!`.length)+ "┃".bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${client.user.tag} /--/ `.length)+ "┃".bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
      console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
    }catch{ /* */ }

    change_status(client);
  
    setInterval(()=>{
      change_status(client);
    }, 60 * 1000);
  
  } catch (e){
    console.log(String(e.stack).bgRed)
  }
}
var state = false;
function change_status(client){
  if(!state){
    state = !state;
    client.user.setActivity(`${config.status.text}`.replace("{prefix}", config.prefix), {type: config.status.type, url: config.status.url});
  } else {
    client.user.setActivity(`${config.status.text}`.replace("{prefix}", config.prefix), {type: config.status.type, url: config.status.url});
  }
  if(client.adenabled){
    setTimeout(()=>{
      client.user.setActivity(client.statusad);
    }, 45 * 1000);
  }
}
