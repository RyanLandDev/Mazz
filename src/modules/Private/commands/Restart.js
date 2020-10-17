const { Command, CommandPermissions } = require('axoncore');

class Restart extends Command {
    constructor(module) {
        super(module);

        this.label = 'restart';
        this.aliases = ['restart', 'rs'],
            this.info = { description: 'Restarts the bot.' };
        this.permissions = new CommandPermissions(this, {
            staff: {
                needed: this.axon.staff.owners,
            },
        });
    }

    async execute({ msg }) {
        await this.utils.sendBasic(msg, 'Restarting... This will finish automatically.')
        process.exit();
    }
}

module.exports = Restart;