const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

const trials = require('../../config/trials.json');
const mods = require('../../config/moderators.json');
const admins = require('../../config/admins.json');
const devs = require('../../config/developers.json');
const patrons = require('../../config/patrons.json');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Get a list of all people that have helped Mazz.',
      guarded: true,
      aliases: ['credit', 'devs', 'developers', 'mods', 'patrons', 'moderators', 'admins', 'administrator', 'trials'],
    });
  }

  async run(message) {
    const devsString = [];
    for(let i = 0; i < devs.seconddeveloper.length; i++) {
      await message.client.users.fetch(devs.seconddeveloper[i]).then(value =>
        devsString.push(value.username + '#' + value.discriminator));
    }
    const devsStringified = devsString.join('\n');
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setDescription('Below is a list of all people that are supporting Mazz.')
      .addField('**Second Developers**', devsStringified, true);
    message.channel.send(Embed);
  }

};