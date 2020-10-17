const { Command, CommandOptions, CommandResponse } = require('axoncore');

class Ping extends Command {
    constructor(module) {
        super(module);

        this.label = 'ping';
        this.info = { description: 'Get the bot\'s current ping.' };
    }
            
    async execute({ msg }) {
        const start = Date.now();
        const mess = await this.sendMessage(msg.channel, ':ping_pong: | Passing the ball...');
        if (!mess) return;

        const diff = (Date.now() - start);
        this.editMessage(mess, `:ping_pong: | Returned at ${diff}ms`);
    }
}

module.exports = Ping;
