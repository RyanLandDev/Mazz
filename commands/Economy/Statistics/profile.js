const { Command } = require('klasa');
const Discord = require('discord.js');
const Canvas = require('canvas');

// unfinished

const applyText = (canvas, text) => {
  const ctx = canvas.getContext('2d');
  let fontSize = 70;

  do {
    ctx.font = `${fontSize -= 10}px sans-serif`;
  } while (ctx.measureText(text).width > canvas.width - 300);

  return ctx.font;
};

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Check your profile.',
      aliases: ['pf', 'balance', 'bal', 'money', 'wallet', 'cash'],
    });
  }

  async run(msg) {
    const channel = msg.guild.channels.cache.find(ch => ch.name === '🚔│testing');
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./config/images/profileBg.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(msg.member.displayName, canvas.width / 2.5, canvas.height / 3.5);

    ctx.font = applyText(canvas, msg.member.displayName);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${msg.member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(msg.author.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    msg.send(`Welcome to the server, ${msg.member}!`, attachment);
  }

};