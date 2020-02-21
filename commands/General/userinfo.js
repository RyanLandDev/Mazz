const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Get some information about Mazz.',
      guarded: true,
    });
  }

  async run(message) {
    const Embed = new MessageEmbed()
      .setColor('#47177a')
      .setDescription('Want to know a little bit more about yourself? Well you have typed the right command!')
      .addField('Created', `Your account was created at ${message.author.createdAt}}`)
      .addField('Last message sent', `Your last message sent was ${message.author.lastMessage.content} at ${message.author.lastMessage.createdAt.format('DD/MM/YYYY')}`);
    message.channel.send(Embed);
  }

};