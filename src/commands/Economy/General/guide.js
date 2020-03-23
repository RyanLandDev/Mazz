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
    richDisplay.addPage(template => template.setDescription(`Welcome to the Guide! Let's get right into it!\n\nThere are 4 main commands for making money: \`${p}work\`, \`${p}crime\`, \`${p}beg\` and \`${p}search\`. For crime and search, a few things are different.\n\nCrimes have a chance of failing. You will be fined if you fail committing a crime.\nIf you're lucky, you will be able to get an item using search.\n\nYou can take a look at all the items you have in your \`${p}inventory\`. There are a lot of items, all with different abilities. You can use them using \`${p}use\`.\n\nYou can upgrade your statistics in the \`${p}store\`. You can also buy various other things there.\nYou can check your or others' statistics, balance and more using \`${p}profile\`.\n\nBoom! Those were all the basics of Mazz. Now let's get onto the juicy stuff.\n\n**Tip!** Get a list of all commands using \`${p}help\`.`));
    richDisplay.addPage(template => template.setDescription(`Meet the \`${p}bank\`. To be able to use the bank, you will need to buy and upgrade a bank account in the \`${p}store\`. Using the bank, you can \`${p}deposit\` and \`${p}withdraw\` money.\n\nAnother feature is robbing. You can \`${p}rob\` anyone every 4 hours. This is one of the interaction commands. You can also do a \`${p}coinflip\` with anyone, and \`${p}give\` money to anyone. These last two don't have cooldowns.\nLooking for a target? Check the \`${p}leaderboard\`. There are multiple leaderboards to check, four. Check them all out using \`${p}help leaderboard\`.\n\nIf you want to see how long you have to wait until you can do something again, try \`${p}cooldowns\`.\n\nNext, we're going to take a look at some other features Mazz has to help you.\n\n **Tip!** Use \`${p}help [command]\` to show more information about a specific command and its aliases, so you can do everything a bit faster.`));
    richDisplay.addPage(template => template.setDescription(`Let's talk about \`${p}contacts\`. To be able to \`${p}call\` contacts, you will have to meet them first. Think realistically of how you could meet people, I won't spoil it for you. Contacts are very powerful. Try unlocking them all!\n\nNow that you got some money, it's time to move on. Introducing the \`${p}rebirth\`. When rebirthing, you will lose nearly everything. Everything except levels, contacts and multipliers. Let's stick to the last thing. Your base multiplier will be increased by **0.1** every time you rebirth! Note that the price to rebirth will also rise every time you do.\n\nNext, let's talk crime: Gangs.`));
    richDisplay.addPage(template => template.setDescription(`(Gangs are coming soon.)`));
    richDisplay.setFooterPrefix('Page ');
    return richDisplay.run(await msg.send('Loading guide...'));
  }
};