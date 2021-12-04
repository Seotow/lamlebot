module.exports = {
    name: 'speak',
    aliases: ['speak', 's', 'sua', 'sủa', 'gâu', 'gau'],
    category: 'fun',
    run: async (client, message, args) => {
        // if(message.author.id != 680039671765532756){
        //     return message.reply({ 
        //         content: `Chỉ nguyentrunghjeu mới có thể dùng`
        //     })
        // };
        
        const { getAudioUrl, getAllAudioUrls } = require('google-tts-api');
        const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus} = require('@discordjs/voice');

        const author = message.author.username;
        const string = args.join(' ');

        const channel = message.member.voice.channel;
        console.log(channel);
        const player = createAudioPlayer();
        
        if (!channel) return message.reply({ 
            content: `Djt me ${author} đéo vào voice thì bố tìm kiểu gì`
        })

        if(!string) {
            return message.reply({ 
                content: `Djt me ${author} nhập cc gì đấy`
            })
        }

        if (string.length >= 200) {
            // audioUrl = getAllAudioUrls(string, {
            //     lang: 'vi',
            //     slow: false,
            //     host: 'https://translate.google.com',
            //     timeout: 10000,
            //     splitPunct: ',.?',
            // });

            // async function getTodos() {
            //     for (const audio of audioUrl) {
            //         resource = await createAudioResource(audio.url);
            //         player.play(resource);
            //         connection.subscribe(player);
            //     }
            // }
            return message.reply({ 
                content: `Djt me ${author} nhập ít hơn 200 từ thôi`
            })

        } 

        try {
            const audioUrl = getAudioUrl(string, {
                lang: 'vi',
                slow: false,
                host: 'https://translate.google.com',
                timeout: 10000,
            });
            const resource = createAudioResource(audioUrl);
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
                    connection.destroy();
                }, 40000)
    
            })
        } catch (err) {
            return message.reply({ 
                content: `Djt me ${author} đợi tí bố đang lag`
            })
            // throw err;
        }
        
    }
}