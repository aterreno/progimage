const AWS = require('aws-sdk');
const debug = require('debug')('retrieve-handler');
const sharp = require('sharp');

const allowedExt = ['png', 'jpeg', 'tiff', 'webp'];
const { jsonResponse, imgResponse } = require('../util/http');

const { bucketName } = process.env;
const s3 = new AWS.S3();

const handle = async (event, context, callback) => {
  debug('retrieve');
  if (!event.queryStringParameters || !event.queryStringParameters.fileName) {
    callback(null, jsonResponse(400, { message: 'fileName query parameter is mandatory for this API Endpoint' }));
  } else {
    const { fileName } = event.queryStringParameters;
    try {
      const { Body: body } = await s3.getObject({ Bucket: bucketName, Key: fileName }).promise();

      if (event.queryStringParameters.convertTo) {
        const { convertTo } = event.queryStringParameters;
        if (allowedExt.includes(convertTo)) {
          const converted = await sharp(body)
            .toFormat(convertTo)
            .toBuffer();
          callback(null, imgResponse(200, converted.toString('base64'), convertTo));
        } else {
          callback(null, jsonResponse(400, `Invalid convert: ${convertTo}, only: ${allowedExt.join(',')} are allowed`));
        }
      } else {
        callback(null, imgResponse(200, body.toString('base64')), 'png');
      }
    } catch (error) {
      debug(error);
      callback(null, jsonResponse(error.statusCode, { message: error.message }));
    }
  }
};

module.exports = {
  handle,
};
