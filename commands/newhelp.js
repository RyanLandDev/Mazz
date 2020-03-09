const images = [
  'https://i.imgur.com/gh3vYgj.jpg',
  'https://i.imgur.com/vBV81m4.jpg',
  'https://i.imgur.com/92hAsqe.jpg',
];

const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, { description: 'Test RichDisplay' });
  }

  async run(message) {
    const display = new RichDisplay(new MessageEmbed()
      .setColor(0x673AB7)
      .setAuthor(this.client.user.username, this.client.user.avatarURL())
      .setTitle('Norway Pictures Slideshow')
      .setDescription('Scroll between the images using the provided reaction emotes.'),
    );

    for (let i = 0; i < images.length; i++) {
      display.addPage(template => template.setImage(images[i]));
    }

    return display.run(await message.send('Loading help...'));
  }

};