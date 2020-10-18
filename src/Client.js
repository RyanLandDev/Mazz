const { AxonClient } = require('axoncore');
const { ErrorHelp, SpecHelp } = require('./modules/General/commands/Help');

const modules = require('./modules/index');

/**
 * Example - Client constructor
 *
 * @author KhaaZ
 *
 * @class Client
 * @extends AxonClient
 */
class Client extends AxonClient {
    /**
     * @param {import('eris').Client} client
     * @param {import('axoncore').AxonOptions} axonOptions
     */
    constructor(client, axonOptions) {
        super(client, axonOptions, modules);

        this.param = 1; // personal stuff
        this._param = 2; // personal hidden stuff
    }

    /**
     * @returns {true}
     */
    onInit() {
        this.staff.contributors = [];
        return true;
    }

    /**
     * @returns {Promise<true>}
     */
    onStart() {
        return Promise.resolve(true);
    }

    /**
     * @returns {Promise<true>}
     */
    onReady() {
        return Promise.resolve(true);
    }

    initStatus() {
        // called after ready event
        // overrides default editStatus
        // used to setup custom status
        this.botClient.editStatus(null, {
            name: `${this.settings.prefixes[0]}help | ${this.botClient.guilds.size} servers 🔥`,
            type: 0,
        } );
    }

    /**
     * @param {import('discord.js').Message} msg
     * @param {import('axoncore').GuildConfig} guildConfig
     * @returns {Promise<import('discord.js').Message>}
     */
    // eslint-disable-next-line no-unused-vars
    sendFullHelp(msg) {
        return ErrorHelp(this, msg);
    }

    /**
     * @param {import('axoncore').Command} command
     * @param {import('axoncore').CommandEnvironment} env
     * @returns {Promise<import('discord.js').Message>}
     */
    sendHelp(cmd, env) {
        return SpecHelp(this, cmd, env);
    }
}

module.exports = Client;
