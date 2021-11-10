module.exports = {
    name: 'youtube',
    aliases: ['play', 'p'],
    category: 'fun',
    run: async (client, message, args) => {
        const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus} = require('@discordjs/voice');
        const ytdl = require('ytdl-core');

        if(message.author.id != 680039671765532756){
            return message.reply({ 
                content: `Chỉ nguyentrunghjeu mới có thể dùng`
            })
        };

        const author = message.author.username;
        const string = args.join(' ');
        const channel = message.member.voice.channel;
          
        if(!string) {
            return message.reply({ 
                content: `Djt me ${author} nhập cc gì đấy`
            })
        }
        
        if(!string.startsWith('https://')){
            return message.reply({ 
                content: `Djt me ${author} link kiểu cc gì đấy`
            })
        }
        
        if (!channel) return message.reply({ 
            content: `Djt me ${author} đéo vào voice thì bố tìm kiểu gì`
        })

        const player = createAudioPlayer();
        const resource = createAudioResource(stream);
        
        try {
            const stream = ytdl(string, { filter: 'audioonly' });
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator
            });

            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => {
                setTimeout(() => {
                    if(!connection){return}
                    message.channel.send('Đã rời phòng vì không hoạt động')
                    connection.destroy();
                }, 30000)
    
            })
        } catch (e) {
            return message.reply({ 
                content: `Djt me ${author} đợi tí bố đang lag`
            })
        }
        
    }
}