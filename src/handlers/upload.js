const debug = require('debug')('upload-handler');
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
const { jsonResponse } = require('../util/http');

const s3 = new AWS.S3();

const { bucketName } = process.env;

const handle = async (event, context, callback) => {
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

module.exports = {
  handle,
};
