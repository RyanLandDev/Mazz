const { Listener } = require('axoncore');
const botConfig = require('../../../../configs/config.json');

class GuildCreate extends Listener {
    /**
     * @param {import('axoncore').Module} module
     * @param {import('axoncore').ListenerData} data
     */
    constructor(module, data = {} ) {
        super(module, data);

        /** Event Name (Discord name) */
        this.eventName = 'guildCreate';
        /** Event name (Function name) */
        this.label = 'guildCreate';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'Guild Create event',
        };
    }

    /**
     * @param {import('eris').Guild} guild
     * @param {import('axoncore').GuildConfig} guildConfig
     */
    execute(guild, guildConfig) { // eslint-disable-line 
        console.log(`Guild Created: ${guild.name} [${guild.id}]`);
        this.bot.editStatus(null, {
            name: `${botConfig.prefixes.general}help | ${this.bot.guilds.size} servers 🔥`,
            type: 0,
        } );
        return Promise.resolve();
    }
}

module.exports = GuildCreate;
