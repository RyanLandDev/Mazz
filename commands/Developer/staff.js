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
      usage: '<add|remove|purge> <Role:string> (User:member)',
    });
  }

  async add(message, params) {
    console.log(params[0]);
    console.log(params[1]);
    console.log(params[2]);
    const obj = require(`../../config/${params[2]}s.json`);
    const stringToSearch = JSON.stringify(obj);
    const newUser = params[2].user.id;
    if (stringToSearch.includes(newUser)) return message.channel.send('This user is already a developer!');
    obj.headdeveloper.push(newUser);
    const stringToSave = JSON.stringify(obj, null, 4);
    fs.writeFile(`./config/${params[1]}s.json`, stringToSave, (err) => {
      if (err) throw err;
    });
    message.channel.send(`${message.author} has been added to the developer team!`);
  }

  async remove(message, params) {
    const obj = require(`../../config/${params[2]}s.json`);
    const stringToSearch = JSON.stringify(obj);
    const newUser = params[1].user.id;
    if (!stringToSearch.includes(newUser)) return message.channel.send('This user isn\'t staff!');
  }

};