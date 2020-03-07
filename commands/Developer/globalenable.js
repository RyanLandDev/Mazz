const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      // mazz admin
      permissionLevel: 28,
      guarded: true,
      description: 'Globally enable a command that had been disabled.',
      usage: '<Piece:piece>',
    });
  }

  async run(message, [piece]) {
    piece.enable();
    if (this.client.shard) {
      await this.client.shard.broadcastEval(`
				if (String(this.shard.id) !== '${this.client.shard.id}') this.${piece.store}.get('${piece.name}').enable();
			`);
    }
    return message.sendCode('diff', message.language.get('COMMAND_ENABLE', piece.type, piece.name));
  }

};
