const AWS = require('aws-sdk');
const debug = require('debug')('handler');
const uuid = require('uuid/v1');
const { jsonResponse, pngResponse } = require('./util/http');

const { bucketName } = process.env;
const s3 = new AWS.S3();

const ping = async () => {
  debug('ping');
  return 'pong';
};

const upload = async (event, context, callback) => {
  debug('upload');

  const fileName = uuid();
  const { image } = JSON.parse(Buffer.from(event.body, 'base64').toString('utf-8'));
  const buffer = Buffer.from(image, 'base64');

  try {
    await s3.putObject({ Body: buffer, Bucket: bucketName, Key: fileName }).promise();
    callback(null, jsonResponse(201, { fileName }));
  } catch (error) {
    debug(error);
    callback(null, jsonResponse(error.statusCode, { message: error.message }));
  }
};

const retrieve = async (event, context, callback) => {
  debug('retrieve');
  if (!event.queryStringParameters || !event.queryStringParameters.fileName) {
    callback(null, jsonResponse(400, { message: 'fileName query parameter is mandatory for this API Endpoint' }));
  } else {
    const { fileName } = event.queryStringParameters;
    try {
      const { Body: body } = await s3.getObject({ Bucket: bucketName, Key: fileName }).promise();
      callback(null, pngResponse(200, body.toString('base64')));
    } catch (error) {
      debug(error);
      callback(null, jsonResponse(error.statusCode, { message: error.message }));
    }
  }
};

module.exports = {
  ping,
  upload,
  retrieve,
};
