const { Command } = require('klasa');
const fs = require('fs');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Ban a user from using the bot.',
      guarded: true,
      usage: '<User:member>',
      // Mazz Moderator
      permissionLevel: 27,
    });
  }

  async run(message, params) {
    const obj = require('../../../config/userbans.json');
    if (JSON.stringify(obj).includes(params[0].user.id)) return message.channel.send('This user is already banned!');
    obj.permanent.push(params[0].user.id);
    fs.writeFile('./config/userbans.json', JSON.stringify(obj, null, 4), (err) => {
      if (err) throw err;
    });
    return message.channel.send(`${params[0].user} has been banned from using Mazz!`);
  }

};