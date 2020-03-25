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
    const active = msg.author.settings.get('activeContacts').slice();

    // jake
    if (recipient === 'jake') {
      const callmsg = await msg.send(':telephone_receiver: **Jake** - Huh? How\'d you find my number?? Shh!');
      await new Promise(resolve => setTimeout(resolve, 2000));
      callmsg.edit(':telephone: **Jake hang up.**');
      return;
    }
    // uncle g
    if (recipient === 'uncleg') {
      if (!msg.author.settings.get('contacts').includes('uncleg')) {
        const callmsg = await msg.send(':telephone_receiver: **Uncle G** - who da fuck be dis');
        await new Promise(resolve => setTimeout(resolve, 1000));
        callmsg.edit(':telephone: **Uncle G hang up.**');
        return;
      }
      if (msg.author.settings.get('balance') < 15000) {
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
      msg.author.settings.update('balance', msg.author.settings.get('balance') - 15000);
      msg.author.settings.update('activeContacts', 'uncleg', { action: 'add' });
      msg.author.settings.update('iuncleg', moment().format('x'));
      const callmsg = await msg.send(':telephone_receiver: **Uncle G** - ayy thanks I\'ll git started right away my homie');
      await new Promise(resolve => setTimeout(resolve, 1500));
      callmsg.edit(':telephone: **Uncle G hang up.**');
      return;
    }
    // lawyer
    if (recipient === 'lawyer') {
      if (!msg.author.settings.get('contacts').includes('lawyer')) {
        const callmsg = await msg.send(':telephone_receiver: **Lawyer** - Who is this? Too busy right now.');
        await new Promise(resolve => setTimeout(resolve, 1500));
        callmsg.edit(':telephone: **Lawyer hang up.**');
        return;
      }
      if (msg.author.settings.get('balance') < 400) {
        const callmsg = await msg.send(':telephone_receiver: **Lawyer** - Sorry, I am going to need a little more than that to be able to work for you, my respect.');
        await new Promise(resolve => setTimeout(resolve, 2500));
        callmsg.edit(':telephone: **Lawyer hang up.**');
        return;
      }
      if (active.includes('lawyer')) {
        const callmsg = await msg.send(':telephone_receiver: **Lawyer** - I\'m already working for you, my client.');
        await new Promise(resolve => setTimeout(resolve, 2500));
        callmsg.edit(':telephone: **Lawyer hang up.**');
        return;
      }
      msg.author.settings.update('balance', msg.author.settings.get('balance') - 400);
      msg.author.settings.update('activeContacts', 'lawyer', { action: 'add' });
      const callmsg = await msg.send(':telephone_receiver: **Lawyer** - Thanks! I won\'t let you down, my client. My respect.');
      await new Promise(resolve => setTimeout(resolve, 1500));
      callmsg.edit(':telephone: **Lawyer hang up.**');
      return;
    }
    // guard
    if (recipient === 'guard') {
      if (!msg.author.settings.get('contacts').includes('guard')) {
        const callmsg = await msg.send(':telephone_receiver: **Guard** - Who is this?');
        await new Promise(resolve => setTimeout(resolve, 3000));
        callmsg.edit(':telephone: **Guard hang up.**');
        return;
      }
      if (msg.author.settings.get('balance') < 1500) {
        const callmsg = await msg.send(':telephone_receiver: **Guard** - That\'s not enough for my services, sir or ma\'am.');
        await new Promise(resolve => setTimeout(resolve, 3000));
        callmsg.edit(':telephone: **Guard hang up.**');
        return;
      }
      if (active.includes('guard')) {
        const callmsg = await msg.send(':telephone_receiver: **Guard** - My services are already being processed, sir or ma\'am.');
        await new Promise(resolve => setTimeout(resolve, 5000));
        callmsg.edit(':telephone: **Guard hang up.**');
        return;
      }
      msg.author.settings.update('balance', msg.author.settings.get('balance') - 1500);
      msg.author.settings.update('activeContacts', 'guard', { action: 'add' });
      const callmsg = await msg.send(':telephone_receiver: **Guard** - Alrighty, my services have started. Thank you, sir or ma\'am.');
      await new Promise(resolve => setTimeout(resolve, 5000));
      callmsg.edit(':telephone: **Guard hang up.**');
      return;
    }
    throw msg.send(':telephone: **Unknown Number**');
  }
};