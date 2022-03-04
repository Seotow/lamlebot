const { MessageReaction } = require('discord.js');
module.exports = {
    name: 'instagram',
    aliases: ['react', 'r', 'dmva'],
    category: 'fun',
    run: async (client, message, args) => {
        // var reactions = args[0].toLowerCase().split('');
        setTimeout(() => {message.delete()}, 1000)
        let msgId = args[0];
        let reactions = [
            'letter_d',
            'letter_i_1',
            'letter_t_1',
            'letter_m',
            'letter_e_1',
            'letter_v',
            'letter_i_2',
            'letter_e_2',
            'letter_t_2',
            'letter_a',
            'letter_n',
            'letter_h',
        ];
        
        async function reacting(message) {
            let breakLoop = false;
            for (let i = 0; i < reactions.length; i++) {
                if (breakLoop) break;
                    let userReaction = client.emojis.cache.find(emnoji => emnoji.name == reactions[i]);
                    
                    // Discord native emoji or server/Nitro
                    try {
                    // https://discordjs.guide/popular-topics/reactions.html#reacting-in-order
                await message.react(userReaction).catch(async function(err) {
                    console.log(err);
                    breakLoop = true;
                });
                } catch(e) {
                    console.log(e);
                }
                
                }
        }
        let msg = message.channel.messages.fetch(msgId)
            .then(message => {
                reacting(message)
            })
            .catch(console.error);
        
    }
}