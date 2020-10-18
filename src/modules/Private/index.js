const { Module, CommandPermissions } = require('axoncore');

const commands = require('./commands/index');
const listeners = require('./listeners/index');

class Private extends Module {
    /**
     * @param {import('axoncore').AxonClient} client
     * @param {import('axoncore').ModuleData} data
     */
    constructor(client, data = {} ) {
        super(client, data);

        this.label = 'Private';

        this.info = {
            name: 'Private',
            description: 'Developer utility commands.',
        };

        /**
         * @type {CommandPermissions}
         */
        this.permissions = new CommandPermissions(this, {}, true);
    }

    init() {
        return { commands, listeners };
    }
}

module.exports = Private;
