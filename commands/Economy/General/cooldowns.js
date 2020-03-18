const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check all the cooldowns.',
      aliases: ['k', 'cooldown'],
      runIn: ['text'],
      cooldown: 3,
    });
  }

  async run(msg) {
    // work
    let workCDh, workCDm, workCDs;
    if (this.client.commands.get('work').cooldowns.get(msg.author.id)) {
      const workRemainingS = Math.floor(this.client.commands.get('work').cooldowns.get(msg.author.id).remainingTime / 1000);
      workCDh = Math.floor(workRemainingS / 3600);
      if (workCDh === 0) workCDm = Math.floor(workRemainingS / 60); else workCDm = workRemainingS / 60 - (workCDh * 60);
      if (workCDm === 0) workCDs = workRemainingS; else workCDs = Math.round(workRemainingS - ((workCDh * 3600) + (workCDm * 60)));
    }

    // crime
    let crimeCDh, crimeCDm, crimeCDs;
    if (this.client.commands.get('crime').cooldowns.get(msg.author.id)) {
      const crimeRemainingS = Math.floor(this.client.commands.get('crime').cooldowns.get(msg.author.id).remainingTime / 1000);
      crimeCDh = Math.floor(crimeRemainingS / 3600);
      if (crimeCDh === 0) crimeCDm = Math.floor(crimeRemainingS / 60); else crimeCDm = crimeRemainingS / 60 - (crimeCDh * 60);
      if (crimeCDm === 0) crimeCDs = crimeRemainingS; else crimeCDs = Math.round(crimeRemainingS - ((crimeCDh * 3600) + (crimeCDm * 60)));
    }

    // beg
    let begCDh, begCDm, begCDs;
    if (this.client.commands.get('beg').cooldowns.get(msg.author.id)) {
      const begRemainingS = Math.floor(this.client.commands.get('beg').cooldowns.get(msg.author.id).remainingTime / 1000);
      begCDh = Math.floor(begRemainingS / 3600);
      if (begCDh === 0) begCDm = Math.floor(begRemainingS / 60); else begCDm = begRemainingS / 60 - (begCDh * 60);
      if (begCDm === 0) begCDs = begRemainingS; else begCDs = Math.round(begRemainingS - ((begCDh * 3600) + (begCDm * 60)));
    }

    // search
    let searchCDh, searchCDm, searchCDs;
    if (this.client.commands.get('search').cooldowns.get(msg.author.id)) {
      const searchRemainingS = Math.floor(this.client.commands.get('search').cooldowns.get(msg.author.id).remainingTime / 1000);
      searchCDh = Math.floor(searchRemainingS / 3600);
      if (searchCDh === 0) searchCDm = Math.floor(searchRemainingS / 60); else searchCDm = searchRemainingS / 60 - (searchCDh * 60);
      if (searchCDm === 0) searchCDs = searchRemainingS; else searchCDs = Math.round(searchRemainingS - ((searchCDh * 3600) + (searchCDm * 60)));
    }

    // rob
    let robCDh, robCDm, robCDs;
    if (this.client.commands.get('rob').cooldowns.get(msg.author.id)) {
      const robRemainingS = Math.floor(this.client.commands.get('rob').cooldowns.get(msg.author.id).remainingTime / 1000);
      robCDh = Math.floor(robRemainingS / 3600);
      if (robCDh === 0) robCDm = Math.floor(robRemainingS / 60); else searchCDm = robRemainingS / 60 - (robCDh * 60);
      if (robCDm === 0) robCDs = robRemainingS; else robCDs = Math.round(robRemainingS - ((robCDh * 3600) + (robCDm * 60)));
    }

    const description = [];
    if (this.client.commands.get('work').cooldowns.get(msg.author.id)) description.push(`**Work** | ${workCDh === 0 ? '' : `${workCDh}h`}${workCDm === 0 ? '' : `${workCDm}m`}${workCDs}s`); else description.push('**Work** | **Ready**');
    if (this.client.commands.get('crime').cooldowns.get(msg.author.id)) description.push(`**Crime** | ${crimeCDh === 0 ? '' : `${crimeCDh}h`}${crimeCDm === 0 ? '' : `${crimeCDm}m`}${crimeCDs}s`); else description.push('**Crime** | **Ready**');
    if (this.client.commands.get('beg').cooldowns.get(msg.author.id)) description.push(`**Beg** | ${begCDh === 0 ? '' : `${begCDh}h`}${begCDm === 0 ? '' : `${begCDm}m`}${begCDs}s`); else description.push('**Beg** | **Ready**');
    if (this.client.commands.get('search').cooldowns.get(msg.author.id)) description.push(`**Search** | ${searchCDh === 0 ? '' : `${searchCDh}h`}${searchCDm === 0 ? '' : `${searchCDm}m`}${searchCDs}s`); else description.push('**Search** | **Ready**');
    if (this.client.commands.get('rob').cooldowns.get(msg.author.id)) description.push(`**Rob** | ${robCDh === 0 ? '' : `${robCDh}h`}${robCDm === 0 ? '' : `${robCDm}m`}${robCDs}s`); else description.push('**Rob** | **Ready**');

    const embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setColor('#0099FF')
      .setTitle('Cooldowns')
      .setDescription(description.join('\n'))
      .setThumbnail(msg.author.avatarURL());
    msg.send(embed);
  }
};