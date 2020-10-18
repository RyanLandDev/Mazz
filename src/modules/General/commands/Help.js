const { readdirSync } = require('fs');
const config = require('../../../../configs/config.json');

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

const categories = getDirectories('./src/modules');

        module.exports = {
            ErrorHelp: function errorHelp(thisClient, message) {
                thisClient.utils.sendError(message.channel, `Incorrect usage! \`[PREFIX HERE]help <command or category>\``);
    },


    // =============================================================================================================


    SpecHelp: function SpecHelp(thisClient, command, commandEnvironment) {
        const message = commandEnvironment.msg;

        return message.channel.createMessage('test2' + message.content);
    }
}