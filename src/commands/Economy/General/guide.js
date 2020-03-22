const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      guarded: true,
      description: 'Open the Mazz Economy Guide.',
      cooldown: 15,
      runIn: ['text'],
    });
  }

  async run(msg) {
    const richDisplay = new RichDisplay(new MessageEmbed()
      .setColor('#0099FF')
      .setThumbnail(this.client.user.avatarURL())
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTitle('Mazz Economy Guide'),
    );
    const p = msg.guild.settings.prefix;
    // basics
    richDisplay.addPage(template => template.setDescription(`Welcome to the Guide! Let's get right into it!\n\nThere are 4 main commands for making money: \`${p}work\`, \`${p}crime\`, \`${p}beg\` and \`${p}search\`. For crime and search, a few things are different.\n\nCrimes have a chance of failing. You will be fined if you fail committing a crime.\nIf you're lucky, you will be able to get an item using search.\n\nYou can take a look at all the items you have in your \`${p}inventory\`. You can use them using \`${p}use\`.\n\nYou can upgrade your statistics in the \`${p}store\`. You can also buy various other things there.\n\nBoom! Those were all the basics of Mazz. Now let's get onto the juicy stuff.\n\n**Tip!** Get a list of all commands using \`${p}help\`.`));
    richDisplay.setFooterPrefix('Page ');
    return richDisplay.run(await msg.send('Loading guide...'));
  }
};