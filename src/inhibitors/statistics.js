const { Inhibitor, Timestamp } = require('klasa');

module.exports = class extends Inhibitor {
  constructor(...args) {
    super(...args);
    this.timestamp = new Timestamp('DD-MM-YYYY');
  }

  async run() {
    const current = this.client.settings.get('dayStats');
    const date = this.timestamp.display();

    const checker = current.some(c => c.startsWith(date));
    if (checker) {
      const last = current.length - 1;
      const lastValue = parseInt(current[last].substr(13));
      await this.client.settings.update('dayStats', `${date} ~ ${lastValue + 1}`, { arrayIndex: last });
    } else {
      await this.client.settings.update('dayStats', `${date} ~ 1`, { arrayAction: 'add' });
    }
  }
};