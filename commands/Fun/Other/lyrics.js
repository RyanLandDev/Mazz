const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Search for lyrics.',
      cooldown: 10,
      usage: '<SongTitle:str> [...]',
    });
  }

  async run(msg, params) {
    const output = await fetch(`https://some-random-api.ml/lyrics?title=${params.join()}`)
      .then(response => response.json())
      .then(body => body);
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setThumbnail(output.thumbnail.genius)
      .setTimestamp()
      .setTitle(output.author + ' - ' + output.title);
    if (output.lyrics.length > 2048) Embed.setDescription(`**Lyrics**\n[Link to Lyrics](${output.links.genius})`); else Embed.setDescription('**Lyrics\n**' + output.lyrics);
    msg.send(Embed);
  }

};