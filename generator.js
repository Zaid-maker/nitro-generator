const Discord = require("discord.js");
const client = new Discord.Client();

const generator = require("generate-password");
const config = require("./config.js");

client.login(config.token);

const anim = require("chalk-animation");
client.on("ready", () => {
    anim.rainbow("READY TO GENERATE NITRO :))");
    client.user.setActivity(config.status, {
        type: "STREAMING",
        url: "https://www.twitch.tv/ninja"
    });
});

const getFake = () => {
    let fakeString = generator.generate({ length: 16, numbers: true });
    return `https://discord.gift/${fakeString}`;
};

client.on("message", (message) => {

    if(message.author.bot || !message.guild) return;

    if(message.channel.id === config.genClassic){
        if(!message.content.startsWith(`${config.prefix}nitro`)) return message.delete();
        message.author.createDM().then((channel) => channel.send(getFake()));
        return message.channel.send({ embed: { author: { name: "🚀 Nitro code sent in DMs!" }, color: 0x7289DA }});
    } else if(message.content.startsWith(`${config.prefix}nitro`)){
        return message.channel.send(`You aren't in the good channel. Please see <#${config.genClassic}>!`);
    }

    if(message.channel.id === config.genGames){
        if(!message.content.startsWith(`${config.prefix}premium`)) return message.delete();
        message.author.createDM().then((channel) => channel.send(getFake()));
        return message.channel.send({ embed: { author: { name: "🚀 Nitro code sent in DMs!" }, color: 0x7289DA }});
    } else if(message.content.startsWith(`${config.prefix}premium`)){
        return message.channel.send(`You aren't in the good channel. Please see <#${config.genGames}>!`);
    }

});