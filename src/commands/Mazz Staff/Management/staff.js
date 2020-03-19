const { Command } = require('klasa');
const fs = require('fs');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Manages staff members.',
      name: 'staff',
      guarded: true,
      // Mazz Admin
      permissionLevel: 28,
      subcommands: true,
      usageDelim: ' ',
      usage: '<add|remove|purge> <trial|moderator|admin|developer> [User:member] [Head:boolean]',
    });
  }

  async add(message, params) {
    if (!params[1]) return message.channel.send('You need to mention a member (ID)!');
    let arrayToPush;
    const obj = require(`../../../config/users/${params[0]}s.json`);
    const stringToSearch = JSON.stringify(obj);
    const newUser = params[1].user.id;
    if (stringToSearch.includes(newUser)) return message.channel.send(`This user is already apart of the ${params[0]} team!`);
    if (params[2] === true) {
      arrayToPush = 'head' + params[0];
    }
    else {
      arrayToPush = 'second' + params[0];
    }
    obj[arrayToPush].push(newUser);
    const stringToSave = JSON.stringify(obj, null, 4);
    fs.writeFile(`./config/users/${params[0]}s.json`, stringToSave, (err) => {
      if (err) throw err;
    });
    return message.channel.send(`${params[1].user} has been added to the${params[2] ? ' head ' : ' '}${params[0]} team!`);
  }

  async remove(message, params) {
    if (!params[1]) return message.channel.send('You need to mention a member (ID)!');
    let arrayToSplice = 0;
    const obj = require(`../../../config/users/${params[0]}s.json`);
    const fullStringToSearch = JSON.stringify(obj);
    const stringToSearch = JSON.stringify(obj[(params[2] ? 'head' : 'second') + params[0]]);
    const newUser = params[1].user.id;
    if (!stringToSearch.includes(newUser)) return message.channel.send(`This user isn't${params[2] ? ' head ' : ' second '}${params[0]}!`);
    if (params[2] === true) {
      arrayToSplice = 'head' + params[0];
    }
    else {
      arrayToSplice = 'second' + params[0];
    }
    obj[arrayToSplice].splice(obj[arrayToSplice].indexOf(newUser), 1);
    const stringToSaveNoMod = JSON.stringify(obj);
    const stringToSave = JSON.stringify(obj, null, 4);
    if (stringToSaveNoMod === fullStringToSearch) return message.channel.send(`This user isn't${params[2] ? ' head ' : ' second '}${params[0]}!`);
    fs.writeFile(`./config/users/${params[0]}s.json`, stringToSave, (err) => {
      if (err) throw err;
    });
    return message.channel.send(`${params[1].user} has been removed from the${params[2] ? ' head ' : ' '}${params[0]} team!`);
  }

  async purge(message, params) {
    if (JSON.stringify(require(`../../../config/users/${params[0]}s.json`)) === '{}') return message.channel.send(`There aren't any ${params[0]} members to purge!`);
    const baseObj = { [`head${params[0]}`]: [], [`second${params[0]}`]: [] };
    fs.writeFile(`./config/users/${params[0]}s.json`, JSON.stringify(baseObj, null, 4), (err) => {
      if (err) throw err;
    });
    return message.channel.send(`The ${params[0]} team has been purged!`);
  }

};