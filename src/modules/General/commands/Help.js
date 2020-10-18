module.exports = {
    CategoryHelp: function categoryHelp(message) {
    message.channel.createMessage('test' + message.content);
    },
    CommandHelp: function commandHelp(message) {
        message.channel.createMessage('test2' + message.content);
    }
}