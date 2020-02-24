const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'I have measuring powers.',
      aliases: ['dick', 'pp'],
      usage: '[User:member]',
      cooldown: 3,
    });
  }

  async run(message, [User]) {
    let str = '';
    for(let i = 0; i < Math.floor(Math.random() * 20); i++) {
      str += '=';
    }
    str = '8' + str + 'D';
    if (User && User.user.id === '650273454062567435') return message.channel.send(':eggplant: My penis: 8=================================================================================D');
    if (!User) return message.channel.send(':eggplant: Your penis: ' + str);
    const Username = User.user.username;
    if (Username.includes('@everyone') | Username.includes('@here')) return message.channel.send('I\'m smarter');
    message.channel.send(`:eggplant: ${Username}'s penis: ` + str);
  }

};