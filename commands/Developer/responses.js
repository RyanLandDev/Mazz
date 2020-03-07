const { Command } = require('klasa');
const fs = require('fs');

// unfinished

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Manipulate the responses for commands.',
      guarded: true,
      usageDelim: ' ',
      subcommands: true,
      // mazz admin
      permissionLevel: 28,
      usage: '<add> <work|crime|roast> [input:str] [...]',
    });
  }

  async add(msg, params) {
    if (params.length === 1) return msg.send('No input!');

    const type = params[0];
    const responses = require(`../../config/${type}_responses.json`);
    const input = params;
    input.shift();

    const stringToSearch = JSON.stringify(responses);
    if (stringToSearch.includes(input.join(' '))) return msg.send('This situation already exists!');

    responses.push(input.join(' '));
    const stringToSave = JSON.stringify(responses, null, 4);
    fs.writeFile(`./config/${type}_responses.json`, stringToSave, (err) => {
      if (err) throw err;
    });
    return msg.send('Success!');
  }

};