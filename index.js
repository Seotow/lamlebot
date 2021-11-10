const { Client, Intents, Collection } = require( 'discord.js');
const { token, prefix } = require('./config.json');
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_VOICE_STATES,

    ] 
});
const express = require('express');

const app = express();
app.listen(process.env.PORT || 5000);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    client.user.setPresence({
        activity: {
            name: 'ditmevietanh',
            type: 'PLAYING'
        },
        status: 'online'
    })
});

client.commands = new Collection();
client.aliases = new Collection();



client.on("messageCreate", (message) => {
    if(message.author.bot) {return};
    if(!message.guild) {return};
    if(!message.content.startsWith(prefix)) {return}

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length === 0) {return};
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args)

    console.log(message)
});

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client)
})

client.login(token);