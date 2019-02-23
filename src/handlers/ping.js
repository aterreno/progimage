const debug = require('debug')('ping-handler');
const { jsonResponse } = require('../util/http');

const handle = async (event, context, callback) => {
  debug('ping');
  callback(null, jsonResponse(200, 'pong'));
};

module.exports = {
  handle,
};
