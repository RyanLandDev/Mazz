const { Listener } = require('axoncore');
const botConfig = require('../../../../configs/config.json');

class GuildDelete extends Listener {
    /**
     * @param {import('axoncore').Module} module
     * @param {import('axoncore').ListenerData} data
     */
    constructor(module, data = {} ) {
        super(module, data);

        /** Event Name (Discord name) */
        this.eventName = 'guildDelete';
        /** Event name (Function name) */
        this.label = 'guildDelete';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'Guild Delete event',
        };
    }

    /**
     * @param {import('eris').Guild} guild
     * @param {import('axoncore').GuildConfig} guildConfig
     */
    execute(guild, guildConfig) { // eslint-disable-line
        console.log(`Guild Deleted: ${guild.name} [${guild.id}]`);
        this.bot.editStatus(null, {
            name: `${botConfig.prefixes.general}help | ${this.bot.guilds.size} servers 🔥`,
            type: 0,
        } );
        return Promise.resolve();
    }
}

module.exports = GuildDelete;
