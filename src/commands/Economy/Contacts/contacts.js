const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const contacts = require('../../../config/contacts/contacts.json');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Take a look at the contacts in your phone.',
      runIn: ['text'],
      cooldown: 3,
    });
  }

  async run(msg) {
    const userContacts = msg.author.settings.contacts.slice();

    const embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setColor('#0099FF')
      .setThumbnail(msg.author.avatarURL())
      .setDescription(`*More contacts coming soon*\n${userContacts.length}/${contacts.length} unlocked`)
      .setTitle('Contacts')
      .setTimestamp()
      .setFooter('Contacts', this.client.user.avatarURL());
    for (let i = 0; i < userContacts.length; i++) {
      let contact;
      for (let j = 0; j < contacts.length; j++) if (contacts[j].codename === userContacts[i]) contact = contacts[j];
      embed.addField('\u200b', `**${contact.title}**\n${contact.description}\n*'${contact.nickname}'*  \`${msg.guild.settings.prefix}call ${contact.codename}\``, true);
    }
    if (embed.fields.length === 0) embed.setDescription('(Empty)');
    msg.send(embed);
  }
};