const { Utils } = require('axoncore');
const config = require('../configs/config.json');

class MazzUtils extends Utils {
    /**
     * @param {import('axoncore').AxonClient} client
     */
    constructor(client) {
        super(client);
        this.invite = /^(discord.gg\/|discordapp.com\/invite\/)([a-z0-9]+)$/gi;
    }

    // ====================================================================================================================================
    //
    // Embeds
    //
    // ====================================================================================================================================

    // error embed util
    sendError(channel, description) {
        let date = new Date();
        date = date.toISOString();
        return channel.createMessage({
            embed: {
                description: description,
                title: `${config.template.emotes.error} Error`,
                color: config.template.embeds.error,
                timestamp: date,
                footer: { text: this.bot.user.username, icon_url: this.bot.user.avatarURL }
            }
        });
    }

    // basic embed util
    sendBasic(message, description, title) {
        let date = new Date();
        date = date.toISOString();
        const embed = {
            description: description,
            author: { name: message.author.username, icon_url: message.author.avatarURL },
            color: config.template.embeds.global,
            timestamp: date,
            footer: { text: this.bot.user.username, icon_url: this.bot.user.avatarURL },
        };
        if (title) embed.title = title;
        return message.channel.createMessage({ embed: embed });
    }

    // ====================================================================================================================================
    //
    // Colors
    //
    // ====================================================================================================================================

    /**
     * Convert a hex code into a rgb code
     *
     * @param {String} hex -  The base10 number to convert OR the base10 number as a String
     * @returns {[Number, Number, Number]} rgb color code `[xxx, xxx, xxx]`
     */
    hexTOrgb(hex) {
        const num = parseInt(hex.replace('#', ''), 16);
        return [
            num >> 16,
            (num >> 8) & 255,
            num & 255,
        ];
    }

    /**
    * Convert a rgb code into a hex code
    *
    * @param {Number} red - RGB value for Red
    * @param {Number} green - RGB value for Green
    * @param {Number} blue - RGB value for Blue
    * @returns {String} Hex color code (6 char) (without #)
    */
    rgbTOhex(red, green, blue) {
        return ( (blue | (green << 8) | (red << 16) ) | (1 << 24) ).toString(16).slice(1);
    }
}

module.exports = MazzUtils;
