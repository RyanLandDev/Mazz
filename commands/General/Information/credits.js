const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

const trials = require('../../../config/trials.json');
const mods = require('../../../config/moderators.json');
const admins = require('../../../config/admins.json');
const devs = require('../../../config/developers.json');
const patrons = require('../../../config/patrons.json');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Get a list of all people that have helped Mazz.',
      guarded: true,
      aliases: ['credit', 'devs', 'developers', 'mods', 'patrons', 'moderators', 'admins', 'administrator', 'trials'],
      cooldown: 10,
    });
  }

  async run(message) {
    // Head Developers
    let baseArray = [];
    for(let i = 0; i < devs.headdeveloper.length; i++) {
      await message.client.users.fetch(devs.headdeveloper[i]).then(value =>
        baseArray.push(value.tag));
    }
    const headDevs = baseArray.join('\n');

    // Second Developers
    baseArray = [];
    for(let i = 0; i < devs.seconddeveloper.length; i++) {
      await message.client.users.fetch(devs.seconddeveloper[i]).then(value =>
        baseArray.push(value.tag));
    }
    const secondDevs = baseArray.join('\n');

    // Head Admins
    baseArray = [];
    for(let i = 0; i < admins.headadmin.length; i++) {
      await message.client.users.fetch(admins.headadmin[i]).then(value =>
        baseArray.push(value.tag));
    }
    const headAdmins = baseArray.join('\n');

    // Second Admins
    baseArray = [];
    for(let i = 0; i < admins.secondadmin.length; i++) {
      await message.client.users.fetch(admins.secondadmin[i]).then(value =>
        baseArray.push(value.tag));
    }
    const secondAdmins = baseArray.join('\n');

    // Head Moderators
    baseArray = [];
    for(let i = 0; i < mods.headmoderator.length; i++) {
      await message.client.users.fetch(mods.headmoderator[i]).then(value =>
        baseArray.push(value.tag));
    }
    const headMods = baseArray.join('\n');

    // Second Moderators
    baseArray = [];
    for(let i = 0; i < mods.secondmoderator.length; i++) {
      await message.client.users.fetch(mods.secondmoderator[i]).then(value =>
        baseArray.push(value.tag));
    }
    const secondMods = baseArray.join('\n');

    // Head Trials
    baseArray = [];
    for(let i = 0; i < trials.headtrial.length; i++) {
      await message.client.users.fetch(trials.headtrial[i]).then(value =>
        baseArray.push(value.tag));
    }
    const headTrials = baseArray.join('\n');

    // Second Trials
    baseArray = [];
    for(let i = 0; i < trials.secondtrial.length; i++) {
      await message.client.users.fetch(trials.secondtrial[i]).then(value =>
        baseArray.push(value.tag));
    }
    const secondTrials = baseArray.join('\n');

    // Patrons
    baseArray = [];
    for(let i = 0; i < patrons.sometier.length; i++) {
      await message.client.users.fetch(patrons.sometier[i]).then(value =>
        baseArray.push(value.tag));
    }
    const patronsNew = baseArray.join('\n');

    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setThumbnail('https://cdn.discordapp.com/icons/631734689530380308/39aaa46e86544209c6ab2cd44f958481.png?size=256')
      .setDescription('Below is a list of all people that are supporting Mazz.')
      .addField('**Head Developers**', headDevs, true)
      .addField('**Second Developers**', secondDevs, true)
      .addBlankField()
      .addField('**Head Admins**', headAdmins, true)
      .addField('**Second Admins**', secondAdmins, true)
      .addBlankField()
      .addField('**Head Moderators**', headMods, true)
      .addField('**Second Moderators**', secondMods, true)
      .addBlankField()
      .addField('**Head Trials**', headTrials, true)
      .addField('**Second Trials**', secondTrials, true)
      .addBlankField()
      .addField('**Patrons**', patronsNew, true);
    message.channel.send(Embed);
  }

};