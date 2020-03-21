const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Flip a coin with the mentioned user.',
      cooldown: 5,
      runIn: ['text'],
      usage: '<member:member> <bet:num>',
      usageDelim: ' ',
      aliases: ['cf'],
    });
  }

  async run(msg, params) {
    const member = params[0].user, bet = params[1];
    const parent = this;

    // check: coinflip self
    if (member === msg.author) {
      throw msg.send(new MessageEmbed()
        .setColor('RED')
        .setDescription('You can\'t coinflip with yourself!')
        .setAuthor(msg.author.username, msg.author.avatarURL()),
      );
    }

    // check: negative
    if (bet < 1) throw msg.send('You can\'t coinflip less than zero');

    // check: author enough money
    if (bet > msg.author.settings.balance) {
      throw msg.send(new MessageEmbed()
        .setColor('RED')
        .setDescription('You can\'t bet more than you have!')
        .setAuthor(msg.author.username, msg.author.avatarURL(),
        ));
    }

    // check: opponent enough money
    if (bet > member.settings.balance) {
      throw msg.send(new MessageEmbed()
        .setColor('RED')
        .setDescription(`${member} doesn't have this amount of money!`)
        .setAuthor(msg.author.username, msg.author.avatarURL(),
        ));
    }

    // accept/reject coinflip
    const acceptOrDenyEmbed = new MessageEmbed()
      .setAuthor(member.username, member.avatarURL())
      .setTimestamp()
      .setColor('#0099FF')
      .setDescription(`${msg.member} has invited you to a coinflip! Use the reaction buttons below to accept.\nThis invite will expire in 30 seconds.\n**Amount:** ${msg.guild.settings.currency}${bet}`);
    const msgAcceptOrDeny = await msg.send(acceptOrDenyEmbed);
    msgAcceptOrDeny.react('591919521598799872'); // ds_greentick
    msgAcceptOrDeny.react('591919718554796033'); // ds_redtick

    acceptOrDenyEmbed.setDescription(`<:ds_redtick:591919718554796033> The invite has been rejected by ${member}.`);
    acceptOrDenyEmbed.setColor('RED');

    // check rejected
    const filter = (reaction, user) => {
      return reaction.emoji.id === '591919718554796033' && user.id === member.id;
    };
    const collector = msgAcceptOrDeny.createReactionCollector(filter, { time: 30000 });
    collector.on('collect', () => {
      // remove reactions
      msgAcceptOrDeny.reactions.removeAll();
      return msgAcceptOrDeny.edit(acceptOrDenyEmbed);
    });
    // check expired
    let showExpired = true;
    collector.on('end', () => {
      if (showExpired) {
        // remove reactions
        msgAcceptOrDeny.reactions.removeAll();
        return msgAcceptOrDeny.edit(new MessageEmbed()
          .setAuthor(member.username, member.avatarURL())
          .setColor('RED')
          .setTimestamp()
          .setDescription('<:ds_redtick:591919718554796033> This invite has expired.'),
        );
      }
    });
    // check accepted
    const filter2 = (reaction, user) => {
      return reaction.emoji.id === '591919521598799872' && user.id === member.id;
    };
    const collector2 = msgAcceptOrDeny.createReactionCollector(filter2, { time: 30000 });
    // accepted
    collector2.on('collect', () => {
      // remove reactions
      msgAcceptOrDeny.reactions.removeAll();
      // stop collectors
      showExpired = false;
      collector.stop();
      collector2.stop();
      // countdown
      const coinflipEmbed = new MessageEmbed()
        .setAuthor(member.username, member.avatarURL())
        .setTimestamp()
        .setDescription('The coinflip has started!')
        .setColor('#0099FF');
      let c = 5;
      const timer = setInterval(function() {
        coinflipEmbed.setDescription(c + '...');
        c = c - 1;
        msgAcceptOrDeny.edit(coinflipEmbed);
        if (c == 0) {
          c = 0;
          // end coinflip
          let winner, loser;
          const random = Math.round(Math.random());
          if (random == 1) winner = params[0], loser = msg.member; else winner = msg.member, loser = params[0];
          loser.user.settings.update('balance', loser.user.settings.balance - bet);
          winner.user.settings.update('balance', winner.user.settings.balance + bet);
          coinflipEmbed.setDescription(`The coinflip has ended! ${winner} has won ${msg.guild.settings.currency}**${bet * 2}**!`);
          msgAcceptOrDeny.edit(coinflipEmbed);
          clearInterval(timer);
          parent.client.channels.cache.get('690256358431653894').send(new MessageEmbed()
            .setTitle('Coinflip')
            .setColor('#0099FF')
            .setThumbnail(msg.guild.iconURL())
            .addField('Amount', msg.guild.settings.currency + bet, true)
            .addField('Starter', `${msg.author.tag} (${msg.author.id})`, true)
            .addField('Opponent', `${member.tag} (${member.id})`, true)
            .addField('Starter\'s Original Balance', msg.author.settings.balance, true)
            .addField('Starter\'s Final Balance', loser === msg.member ? msg.author.settings.balance - bet : msg.author.settings.balance + bet, true)
            .addField('Guild', msg.guild.name + ` (${msg.guild.id})`, true)
            .addField('Opponent\'s Original Balance', member.settings.balance, true)
            .addField('Opponent\'s Final Balance', loser === params[0] ? member.settings.balance - bet : member.settings.balance + bet, true),
          );
          return;
        }
      }, 1000);
    });
  }
};

