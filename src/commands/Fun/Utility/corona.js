const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check information on the Coronavirus.',
      aliases: ['covid19', 'coronavirus'],
      cooldown: 10,
    });
  }

  async run(msg) {
    msg.channel.startTyping();
    const output = await fetch('https://corona.lmao.ninja/all')
      .then(response => response.json())
      .then(body => body);
    const countries = await fetch('https://corona.lmao.ninja/countries')
      .then(response => response.json())
      .then(body => body);

    const mostActiveCases = countries.slice();
    mostActiveCases.sort(function(a, b) {
      return b.active - a.active;
    });

    const mostDeaths = countries.slice();
    mostDeaths.sort(function(a, b) {
      return b.deaths - a.deaths;
    });

    const mostRecovered = countries.slice();
    mostRecovered.sort(function(a, b) {
      return b.recovered - a.recovered;
    });

    const mostCritical = countries.slice();
    mostRecovered.sort(function(a, b) {
      return b.critical - a.critical;
    });

    const mostMillion = countries.slice();
    mostMillion.sort(function(a, b) {
      return b.casesPerOneMillion - a.casesPerOneMillion;
    });

    const embed = new MessageEmbed()
      .setTitle('Coronavirus Outbreak')
      .setAuthor(this.client.user.username, this.client.user.avatarURL())
      .setColor('#0099FF')
      .setDescription('Here is some useful information regarding the pandemic COVID-19.\n**Stay safe and protect your loved ones.**')
      .setFooter('Updated at')
      .setThumbnail(this.client.user.avatarURL())
      .setImage('https://www.broadcastmagazine.nl/wp-content/uploads/2020/02/corona1020.jpg')
      .setTimestamp(output.updated)
      .addField('Total Cases', output.cases, true)
      .addField('Deaths', output.deaths, true)
      .addField('Recovered', output.recovered, true)
      .addField('Countries with most cases', [`${countries[0].country}: ${countries[0].cases}`,
        `${countries[1].country}: ${countries[1].cases}`,
        `${countries[2].country}: ${countries[2].cases}`,
        `${countries[3].country}: ${countries[3].cases}`,
        `${countries[4].country}: ${countries[4].cases}`,
        `${countries[5].country}: ${countries[5].cases}`,
        `${countries[6].country}: ${countries[6].cases}`,
        `${countries[7].country}: ${countries[7].cases}`,
        `${countries[8].country}: ${countries[8].cases}`,
        `${countries[9].country}: ${countries[9].cases}`].join('\n'), true)
      .addField('Countries with most active cases', [`${mostActiveCases[0].country}: ${mostActiveCases[0].active}`,
        `${mostActiveCases[1].country}: ${mostActiveCases[1].active}`,
        `${mostActiveCases[2].country}: ${mostActiveCases[2].active}`,
        `${mostActiveCases[3].country}: ${mostActiveCases[3].active}`,
        `${mostActiveCases[4].country}: ${mostActiveCases[4].active}`,
        `${mostActiveCases[5].country}: ${mostActiveCases[5].active}`,
        `${mostActiveCases[6].country}: ${mostActiveCases[6].active}`,
        `${mostActiveCases[7].country}: ${mostActiveCases[7].active}`,
        `${mostActiveCases[8].country}: ${mostActiveCases[8].active}`,
        `${mostActiveCases[9].country}: ${mostActiveCases[9].active}`].join('\n'), true)
      .addField('Countries with most deaths', [`${mostDeaths[0].country}: ${mostDeaths[0].deaths}`,
        `${mostDeaths[1].country}: ${mostDeaths[1].deaths}`,
        `${mostDeaths[2].country}: ${mostDeaths[2].deaths}`,
        `${mostDeaths[3].country}: ${mostDeaths[3].deaths}`,
        `${mostDeaths[4].country}: ${mostDeaths[4].deaths}`,
        `${mostDeaths[5].country}: ${mostDeaths[5].deaths}`,
        `${mostDeaths[6].country}: ${mostDeaths[6].deaths}`,
        `${mostDeaths[7].country}: ${mostDeaths[7].deaths}`,
        `${mostDeaths[8].country}: ${mostDeaths[8].deaths}`,
        `${mostDeaths[9].country}: ${mostDeaths[9].deaths}`].join('\n'), true)
      .addField('Countries with most recovered', [`${mostCritical[0].country}: ${mostCritical[0].recovered}`,
        `${mostCritical[1].country}: ${mostCritical[1].recovered}`,
        `${mostCritical[2].country}: ${mostCritical[2].recovered}`,
        `${mostCritical[3].country}: ${mostCritical[3].recovered}`,
        `${mostCritical[4].country}: ${mostCritical[4].recovered}`,
        `${mostCritical[5].country}: ${mostCritical[5].recovered}`,
        `${mostCritical[6].country}: ${mostCritical[6].recovered}`,
        `${mostCritical[7].country}: ${mostCritical[7].recovered}`,
        `${mostCritical[8].country}: ${mostCritical[8].recovered}`,
        `${mostCritical[9].country}: ${mostCritical[9].recovered}`].join('\n'), true)
      .addField('Countries with most cases per million', [`${mostMillion[0].country}: ${mostMillion[0].casesPerOneMillion}`,
        `${mostMillion[1].country}: ${mostMillion[1].casesPerOneMillion}`,
        `${mostMillion[2].country}: ${mostMillion[2].casesPerOneMillion}`,
        `${mostMillion[3].country}: ${mostMillion[3].casesPerOneMillion}`,
        `${mostMillion[4].country}: ${mostMillion[4].casesPerOneMillion}`,
        `${mostMillion[5].country}: ${mostMillion[5].casesPerOneMillion}`,
        `${mostMillion[6].country}: ${mostMillion[6].casesPerOneMillion}`,
        `${mostMillion[7].country}: ${mostMillion[7].casesPerOneMillion}`,
        `${mostMillion[8].country}: ${mostMillion[8].casesPerOneMillion}`,
        `${mostMillion[9].country}: ${mostMillion[9].casesPerOneMillion}`].join('\n'), true);
    msg.send(embed);
    msg.channel.stopTyping();
  }
};