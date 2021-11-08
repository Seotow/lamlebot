module.exports = {
    name: 'ping',
    category: 'user',
    aliases: ['ping', 'p'],
    run: (client ,message, args) => {
        message.reply({ 
            content: `Ping: \`${client.ws.ping}\` ms `
        })
    }
}