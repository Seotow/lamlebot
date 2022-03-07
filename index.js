const { Client, Intents, Collection } = require( 'discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus} = require('@discordjs/voice');
const { token, prefix } = require('./config.json');
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_VOICE_STATES,

    ] 
});

require('./server.js')


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


client.on('voiceStateUpdate', (oldState, newState) => {
    return 
    // console.log(newState.channelId);
    // console.log(oldState);
    // 543777202483757066 id việt anh
    if(newState.member.id == '543777202483757066' && newState.channelId){
        function play(){
            const dmva = 'https://translate.google.com/translate_tts?ie=UTF-8&q=ditmevietanh&tl=vi&total=1&idx=0&textlen=12&client=tw-ob&prev=input&ttsspeed=1'
            const resource = createAudioResource(dmva); 
            const player = createAudioPlayer();
        
            const connection = joinVoiceChannel({
                channelId: newState.channelId,
                guildId: newState.guild.id,
                adapterCreator: newState.guild.voiceAdapterCreator
            });
            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => {
                setTimeout(() => {
                    if(!connection){return}
                    connection.destroy();
                }, 2000)
    
            })
        }
        setTimeout(play,2000)
        
    }
    

})

client.on("messageCreate", (message) => {
    // if(message.author.id == '543777202483757066' || message.author.id == '399537178381778945' || message.author.id == '906118122723999746') {
    //     message.delete({timeout: 1000});
    // }

    if(message.author.bot) {return};
    if(!message.guild) {return};
    if(!message.content.startsWith(prefix)) {return}

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length === 0) {return};
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args)

    // console.log(message)
    
    
});




['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client)
})

client.login(token);