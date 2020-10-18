const { Listener } = require('axoncore');

class HelpDetect extends Listener {
    /**
     * @param {import('axoncore').Module} module
     * @param {import('axoncore').ListenerData} data
     */
    constructor(module, data = {}) {
        super(module, data);

        /** Event Name (Discord name) */
        this.eventName = 'messageCreate';
        /** Event name (Function name) */
        this.label = 'helpDetect';
    }

    execute(guild, guildConfig) { // eslint-disable-line
        console.log(`msg`);
    }
}

module.exports = HelpDetect;
