const { Command, Stopwatch, Type, util } = require('klasa');
const { inspect } = require('util');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      // developer
      permissionLevel: 29,
      guarded: true,
      description: 'Evaluate JavaScript code.',
      usage: '<expression:str>',
    });
  }

  async run(message, [code]) {
    const { success, result, type } = await this.eval(message, code);
    const footer = util.codeBlock('ts', type);
    const output = message.language.get(success ? 'COMMAND_EVAL_OUTPUT' : 'COMMAND_EVAL_ERROR',
      ' ', util.codeBlock('js', result), footer);

    if ('silent' in message.flagArgs) return null;

    // Handle too-long-messages
    if (output.length > 2000) {
      if (message.guild && message.channel.attachable) {
        return message.channel.sendFile(Buffer.from(result), 'output.txt', message.language.get('COMMAND_EVAL_SENDFILE', '2', footer));
      }
      this.client.emit('log', result);
      return message.sendLocale('COMMAND_EVAL_SENDCONSOLE', ['3', footer]);
    }

    // If it's a message that can be sent correctly, send it
    const Embed = new MessageEmbed()
      .setDescription(output)
      .setColor('#0099FF')
      .setAuthor(message.author.username, message.author.avatarURL());
    return message.channel.send(Embed);
  }

  // Eval the input
  async eval(message, code) {
    // eslint-disable-next-line no-unused-vars
    const msg = message;
    const { flagArgs: flags } = message;
    code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, '\'');
    const stopwatch = new Stopwatch();
    let success, syncTime, asyncTime, result;
    let thenable = false;
    let type;
    try {
      if (flags.async) code = `(async () => {\n${code}\n})();`;
      result = eval(code);
      syncTime = stopwatch.toString();
      type = new Type(result);
      if (util.isThenable(result)) {
        thenable = true;
        stopwatch.restart();
        result = await result;
        asyncTime = stopwatch.toString();
      }
      success = true;
    }
    catch (error) {
      if (!syncTime) syncTime = stopwatch.toString();
      if (!type) type = new Type(error);
      if (thenable && !asyncTime) asyncTime = stopwatch.toString();
      if (error && error.stack) this.client.emit('error', error.stack);
      result = error;
      success = false;
    }

    stopwatch.stop();
    if (typeof result !== 'string') {
      result = inspect(result, {
        depth: flags.depth ? parseInt(flags.depth) || 0 : 0,
        showHidden: Boolean(flags.showHidden),
      });
    }
    return { success, type, result: util.clean(result) };
  }

};
