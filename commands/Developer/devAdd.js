const { Command } = require('klasa');
const obj = require('../../config/developers.json');
const fs = require('fs');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Manages staff members.',
      name: 'staff',
      guarded: true,
      permissionLevel: 29,
      usage: '<User:member>',
    });
  }

  async run(message, [...params]) {
    const stringToSearch = JSON.stringify(obj);
    const newUser = params[0].user.id;
    if (stringToSearch.includes(newUser)) return message.channel.send('This user is already a developer!');
    obj.headdeveloper.push(newUser);
    const stringToSave = JSON.stringify(obj, null, 4);
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