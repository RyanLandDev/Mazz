const { Module } = require('axoncore');

const commands = require('./commands/index');
const listeners = require('./listeners/index');

class General extends Module {
    /**
     * @param {import('axoncore').AxonClient} client
     * @param {import('axoncore').ModuleData} data
     */
    constructor(client, data = {} ) {
        super(client, data);

        this.label = 'General';

        this.info = {
            name: 'General',
            description: 'General commands like help, ping and more.',
        };
    }

    init() {
        return { commands, listeners };
    }
}

module.exports = General;
