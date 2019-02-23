const AWS = require('aws-sdk');
const debug = require('debug')('handler');
const uuid = require('uuid/v1');
const { jsonResponse } = require('./util/http');

const { bucketName } = process.env;
const s3 = new AWS.S3();

const ping = async () => {
  debug('ping');
  return 'pong';
};

const upload = async (event, context, callback) => {
  debug('upload');

  const fileName = uuid();
  try {
    const encodedImage = JSON.parse(event.body).image;
    const buffer = Buffer.from(encodedImage, 'base64');
    await s3.putObject({ Body: buffer, Bucket: bucketName, Key: fileName }).promise();
    callback(null, jsonResponse(201, { fileName }));
  } catch (error) {
    callback(error, jsonResponse(500, { error }));
  }
};

module.exports = {
  ping,
  upload,
};
