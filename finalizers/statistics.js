const { Finalizer } = require('klasa');
const moment = require('moment');
const fs = require('fs');

const statistics = require('../config/statistics/usage.json');

module.exports = class extends Finalizer {
  constructor(...args) {
    super(...args, {
    });
  }

  run() {
    const date = moment().format('DD-MM-YYYY');
    if (!statistics[date]) statistics[date] = 0;
    statistics[date] = statistics[date] + 1;

    fs.writeFile('./config/statistics/usage.json', JSON.stringify(statistics, null, 4), (err) => {
      if (err) throw err;
    });
  }
};