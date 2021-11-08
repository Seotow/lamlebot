module.exports = {
    name: 'ping',
    category: 'user',
    aliases: ['ping', 'pi'],
    run: (client ,message, args) => {
        message.reply({ 
            content: `Ping: \`${client.ws.ping}\` ms `
        })
    }
}