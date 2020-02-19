const { Command } = require('klasa');
const fs = require('fs');


//
// UNFINISHED
//


module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Manages staff members.',
      name: 'staff',
      guarded: true,
      permissionLevel: 29,
      subcommands: true,
      usageDelim: ' ',
      usage: '<add|remove|purge> <trial|moderator|admin|developer> (User:member)',
    });
  }

  async add(message, params) {
    const obj = require(`../../config/${params[0]}s.json`);
    const stringToSearch = JSON.stringify(obj);
    const newUser = params[1].user.id;
    if (stringToSearch.includes(newUser)) return message.channel.send('This user is already a developer!');
    obj.headdeveloper.push(newUser);
    const stringToSave = JSON.stringify(obj, null, 4);
    fs.writeFile(`./config/${params[0]}s.json`, stringToSave, (err) => {
      if (err) throw err;
    });
    return message.channel.send(`${params[1].user} has been added to the ${params[0]} team!`);
  }

  async remove(message, params) {
    const obj = require(`../../config/${params[0]}s.json`);
    const stringToSearch = JSON.stringify(obj);
    const newUser = params[1].user.id;
    if (!stringToSearch.includes(newUser)) return message.channel.send('This user isn\'t staff!');
    obj.splice(obj.indexOf(newUser), 1);
    const stringToSave = JSON.stringify(obj, null, 4);
    fs.writeFile(`./config/${params[0]}s.json`, stringToSave, (err) => {
      if (err) throw err;
    });
    return message.channel.send(`${params[1].user} has been removed from the ${params[0]} team!`);
  }

};