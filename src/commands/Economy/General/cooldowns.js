const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check all the cooldowns.',
      aliases: ['k', 'cooldown', 'cd'],
      runIn: ['text'],
      cooldown: 3,
    });
  }

  async run(msg) {
    // work
    let workCDh, workCDm, workCDs;
    if (this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('work'))) {
      const workRemainingS = Math.floor(this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('work')).remainingTime / 1000);
      workCDh = Math.floor(workRemainingS / 3600);
      if (workCDh === 0) workCDm = Math.floor(workRemainingS / 60); else workCDm = Math.floor(workRemainingS / 60 - (workCDh * 60));
      if (workCDm === 0) workCDs = workRemainingS; else workCDs = Math.round(workRemainingS - ((workCDh * 3600) + (workCDm * 60)));
    }

    // crime
    let crimeCDh, crimeCDm, crimeCDs;
    if (this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('crime'))) {
      const crimeRemainingS = Math.floor(this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('crime')).remainingTime / 1000);
      crimeCDh = Math.floor(crimeRemainingS / 3600);
      if (crimeCDh === 0) crimeCDm = Math.floor(crimeRemainingS / 60); else crimeCDm = Math.floor(crimeRemainingS / 60 - (crimeCDh * 60));
      if (crimeCDm === 0) crimeCDs = crimeRemainingS; else crimeCDs = Math.round(crimeRemainingS - ((crimeCDh * 3600) + (crimeCDm * 60)));
    }

    // beg
    let begCDh, begCDm, begCDs;
    if (this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('beg'))) {
      const begRemainingS = Math.floor(this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('beg')).remainingTime / 1000);
      begCDh = Math.floor(begRemainingS / 3600);
      if (begCDh === 0) begCDm = Math.floor(begRemainingS / 60); else begCDm = Math.floor(begRemainingS / 60 - (begCDh * 60));
      if (begCDm === 0) begCDs = begRemainingS; else begCDs = Math.round(begRemainingS - ((begCDh * 3600) + (begCDm * 60)));
    }

    // search
    let searchCDh, searchCDm, searchCDs;
    if (this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('search'))) {
      const searchRemainingS = Math.floor(this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('search')).remainingTime / 1000);
      searchCDh = Math.floor(searchRemainingS / 3600);
      if (searchCDh === 0) searchCDm = Math.floor(searchRemainingS / 60); else searchCDm = Math.floor(searchRemainingS / 60 - (searchCDh * 60));
      if (searchCDm === 0) searchCDs = searchRemainingS; else searchCDs = Math.round(searchRemainingS - ((searchCDh * 3600) + (searchCDm * 60)));
    }

    // rob
    let robCDh, robCDm, robCDs;
    if (this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('rob'))) {
      const robRemainingS = Math.floor(this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('rob')).remainingTime / 1000);
      robCDh = Math.floor(robRemainingS / 3600);
      if (robCDh === 0) robCDm = Math.floor(robRemainingS / 60); else robCDm = Math.floor(robRemainingS / 60 - (robCDh * 60));
      if (robCDm === 0) robCDs = robRemainingS; else robCDs = Math.round(robRemainingS - ((robCDh * 3600) + (robCDm * 60)));
    }

    const description = [];
    if (Math.ceil(this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('work')).remainingTime / 1000) !== this.client.commands.get('work').cooldown) description.push(`**Work** | ${workCDh === 0 ? '' : `${workCDh}h`}${workCDm === 0 ? '' : `${workCDm}m`}${workCDs}s`); else description.push('**Work** | **Ready**');
    if (Math.ceil(this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('crime')).remainingTime / 1000) !== this.client.commands.get('crime').cooldown) description.push(`**Crime** | ${crimeCDh === 0 ? '' : `${crimeCDh}h`}${crimeCDm === 0 ? '' : `${crimeCDm}m`}${crimeCDs}s`); else description.push('**Crime** | **Ready**');
    if (Math.ceil(this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('beg')).remainingTime / 1000) !== this.client.commands.get('beg').cooldown) description.push(`**Beg** | ${begCDh === 0 ? '' : `${begCDh}h`}${begCDm === 0 ? '' : `${begCDm}m`}${begCDs}s`); else description.push('**Beg** | **Ready**');
    if (Math.ceil(this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('search')).remainingTime / 1000) !== this.client.commands.get('search').cooldown) description.push(`**Search** | ${searchCDh === 0 ? '' : `${searchCDh}h`}${searchCDm === 0 ? '' : `${searchCDm}m`}${searchCDs}s`); else description.push('**Search** | **Ready**');
    if (Math.ceil(this.client.finalizers.get('commandCooldown').getCooldown(msg, this.client.commands.get('rob')).remainingTime / 1000) !== this.client.commands.get('rob').cooldown) description.push(`**Rob** | ${robCDh === 0 ? '' : `${robCDh}h`}${robCDm === 0 ? '' : `${robCDm}m`}${robCDs}s`); else description.push('**Rob** | **Ready**');

    const embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setColor('#0099FF')
      .setTitle('Cooldowns')
      .setDescription(description.join('\n'))
      .setThumbnail(msg.author.avatarURL());
    msg.send(embed);
  }
};