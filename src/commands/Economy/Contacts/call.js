const { Command } = require('klasa');
const moment = require('moment');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Call one of your contacts.',
      usage: '<recipient:str>',
      runIn: ['text'],
      cooldown: 6,
    });
  }

  async run(msg, [recipient]) {
    recipient.toLowerCase();
    const active = msg.author.settings.activeContacts.slice();

    // unknown
    if (recipient === 'jake') {
      const callmsg = await msg.send(':telephone_receiver: **Jake** - Huh? How\'d you find my number?? Shh!');
      await new Promise(resolve => setTimeout(resolve, 2000));
      callmsg.edit(':telephone: **Jake hang up.**');
      return;
    }
    // uncle g
    if (recipient === 'uncleg') {
      if (!msg.author.settings.contacts.includes('uncleg')) {
        const callmsg = await msg.send(':telephone_receiver: **Uncle G** - who da fuck be dis');
        await new Promise(resolve => setTimeout(resolve, 1000));
        callmsg.edit(':telephone: **Uncle G hang up.**');
        return;
      }
      if (msg.author.settings.balance < 15000) {
        const callmsg = await msg.send(':telephone_receiver: **Uncle G** - can\'t work fo\' yo\' wit\' dat lil\' money, yo\' fat ass');
        await new Promise(resolve => setTimeout(resolve, 2000));
        callmsg.edit(':telephone: **Uncle G hang up.**');
        return;
      }
      if (active.includes('uncleg')) {
        const callmsg = await msg.send(':telephone_receiver: **Uncle G** - yo\' dumb im already workin fo\' ya my g');
        await new Promise(resolve => setTimeout(resolve, 2000));
        callmsg.edit(':telephone: **Uncle G hang up.**');
        return;
      }
      msg.author.settings.update('balance', msg.author.settings.balance - 15000);
      msg.author.settings.update('activeContacts', 'uncleg', { action: 'add' });
      msg.author.settings.update('iuncleg', moment().format('x'));
      const callmsg = await msg.send(':telephone_receiver: **Uncle G** - ayy thanks I\'ll git started right away my homie');
      await new Promise(resolve => setTimeout(resolve, 1500));
      callmsg.edit(':telephone: **Uncle G hang up.**');
    }
  }
};