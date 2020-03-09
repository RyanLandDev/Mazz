const { MessageEmbed } = require('discord.js');
const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, { description: 'meow :3', cooldown: 3 });
  }

  async run(msg) {
    const image = await fetch('https://some-random-api.ml/img/cat')
      .then(response => response.json())
      .then(body => body.link);

    msg.channel.send(
      new MessageEmbed()
        .setImage(image)
        .setTitle('Cat :cat:')
        .setColor('#0099FF'),
    );
  }
};
