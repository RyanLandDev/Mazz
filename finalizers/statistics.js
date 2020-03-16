const { Finalizer } = require('klasa');
const moment = require('moment');

module.exports = class extends Finalizer {
  constructor(...args) {
    super(...args, {
    });
  }

  run(message) {
    const current = message.client.settings.dayStats.slice();
    const date = moment().format('DD-MM-YYYY');

    let checker = false;
    for (let i = 0; i < current.length; i++) if (current[i].startsWith(date) === true) checker = true;
    if (checker === false) current.push(date + ' ~ 1'); else current[current.length - 1] = `${date} ~ ${parseInt(current[current.length - 1].substr(13)) + 1}`;

    message.client.settings.update('dayStats', current, { action: 'overwrite' });
  }
};