const { Command } = require('klasa');
const obj = require('../../config/developers.json');
const fs = require('fs');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Add a new developer.',
      name: 'devadd',
      guarded: true,
      // permissionLevel: 29,
      usage: '<User:member>',
    });
  }

  async run(message, [...params]) {
    const stringToSearch = JSON.stringify(obj);
    const integer = parseInt(params[0].user.id, 10);
    if (stringToSearch.includes(integer)) return message.channel.send('This user is already a developer!');
    obj.headdeveloper.push(integer);
    const stringToSave = JSON.stringify(obj, null, 2);
    fs.writeFile('./config/developers.json', stringToSave, (err) => {
      if (err) throw err;
    });
    message.channel.send(`${message.author} has been added to the developer team!`);
  }

  async init() {
    /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
  }

};