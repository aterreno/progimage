const debug = require('debug')('handler');

module.exports.ping = async () => {
  debug('ping');
  return 'pong';
};
