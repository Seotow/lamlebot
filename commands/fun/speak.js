module.exports = {
    name: 'speak',
    aliases: ['speak', 's', 'sua', 'sủa', 'gâu', 'gau'],
    category: 'fun',
    run: async (client, message, args) => {
        const { getAudioUrl, getAllAudioUrls } = require('google-tts-api');
        const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus} = require('@discordjs/voice');
        const ytdl = require('ytdl-core');

        const author = message.author.username;
        const string = args.join(' ');
        const channel = message.member.voice.channel;
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });
        
        const player = createAudioPlayer();
        let audioUrl, resource;

        if(!string) {
            return message.reply({ 
                content: `Djt me ${author} nhập cc gì đấy`
            })
        }

        if(string.startsWith('https://')){
            const url = string;
            try {
                const stream = ytdl(url, { filter: 'audioonly' });
                player.play(resource);
                connection.subscribe(player);
            } catch(err) {
                return message.reply({ 
                    content: `Djt me ${author} nhập sai link rồi`
                })
            }
        } else if(string.length < 200) {
            audioUrl = getAudioUrl(string, {
                lang: 'vi',
                slow: false,
                host: 'https://translate.google.com',
                timeout: 10000,
            });
            resource = createAudioResource(audioUrl);
            player.play(resource);
            connection.subscribe(player);
        } else if (string.length >= 200) {
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