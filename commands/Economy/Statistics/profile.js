const { Command } = require('klasa');
const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Check your profile.',
      aliases: ['pf', 'balance', 'bal', 'money', 'wallet', 'cash'],
      usage: '[member:member]',
      requiredPermissions: ['ATTACH_FILES'],
      runIn: ['text'],
    });
  }

  async run(msg, params) {
    let Member;
    if (params.length === 0) Member = msg.member; else Member = params[0];

    // make the canvas and context
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    // make the background
    const background = await Canvas.loadImage('./config/images/profileBg.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // the border
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // name
    ctx.font = '60px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(Member.displayName, canvas.width / 2.5, canvas.height / 3.5);

    // level
    ctx.font = '25px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Level', canvas.width / 2.5, canvas.height / 2.3);

    // money
    ctx.font = '25px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('$' + Member.user.settings.get('balance'), canvas.width / 2.5, canvas.height / 1.9);

    // make avatar rounded
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // make avatar
    const avatar = await Canvas.loadImage(Member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    // make attachment
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    // send message
    msg.send(attachment).catch(() => msg.send('I don\'t have perms'));
  }
};