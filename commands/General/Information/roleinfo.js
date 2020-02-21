const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Display information about the mentioned role.',
      guarded: true,
      usage: '[Role:role]',
      aliases: ['role-info'],
    });
  }

  async run(message, params, [Role]) {
    // triggers if the role is incorrect, so we can search for name
    // search role via name, access parameter using params[0] then set Role to role object
    if (!Role) {
      // Roles Object for server. / this is the way of saying search for the role with role name Role
      const newRole = await message.guild.roles.find(role => role.name == params[0]);
      // checks if it found the role
      if (newRole) {
        message.channel.send(`The role name is ${newRole.name} & it's ID is ${newRole.id}`);
      }
      else {
        message.channel.send('Sorry that role doesn\'t exist');
      }
    }
    else {
      message.channel.send(`The role name is ${Role.name} & it's ID is ${Role.id}`);
    }
  }

};