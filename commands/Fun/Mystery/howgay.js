const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'I know how gay you are.',
      aliases: ['gay'],
      usage: '[User:member]',
      cooldown: 3,
    });
  }

  async run(message, [User]) {
    let Username;
    if (User) Username = User.user.username;
    if (User && Username.includes('@everyone') | Username.includes('@here')) return message.channel.send('I\'m smarter');
    if (User.user.id === '650273454062567435') return message.channel.send(':rainbow_flag: I am 300% gay');
    message.channel.send(`:rainbow_flag: ${User ? Username + ' is' : 'You are'} ${Math.round(Math.random() * 100)}% gay`);
  }

};