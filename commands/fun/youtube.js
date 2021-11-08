module.exports = {
    name: 'youtube',
    aliases: ['play', 'p'],
    category: 'fun',
    run: async (client, message, args) => {
        const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus} = require('@discordjs/voice');
        const ytdl = require('ytdl-core');

        if(message.author.id != 680039671765532756){return};

        const author = message.author.username;
        const string = args.join(' ');
          
        if(!string) {
            return message.reply({ 
                content: `Djt me ${author} nhập cc gì đấy`
            })
        }
        
        if(!string.startsWith('https://')){return}
        const stream = ytdl(string, { filter: 'audioonly' });

        const channel = message.member.voice.channel;
        
        const player = createAudioPlayer();
        const resource = createAudioResource(stream);

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        player.play(resource);
        connection.subscribe(player);

        if (!channel) return message.reply({ 
            content: `Djt me ${author} đéo vào voice thì bố tìm kiểu gì`
        })

        player.on(AudioPlayerStatus.Idle, () => {
            const timeOutId = setTimeout(() => {
                connection.destroy();
            }, 20000)

            if(!connection){clearTimeout(timeOutId)}
        })

        
    }
}