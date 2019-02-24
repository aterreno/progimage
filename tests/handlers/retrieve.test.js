const rp = require('request-promise');

const endpoint = 'https://js0zcbth7g.execute-api.eu-west-2.amazonaws.com/dev/';
const sampleImage = require('../data-samples/ok-sample.json');

const uploadRequest = {
  method: 'POST',
  uri: `${endpoint}/upload`,
  json: true,
  resolveWithFullResponse: true,
};

const retrieveRequest = {
  method: 'GET',
  json: true,
  resolveWithFullResponse: true,
};

describe('retrieve handler', () => {
  it('should download an image which has been uploaded', async () => {
    const uploadOptions = {
      ...uploadRequest,
      body: { ...sampleImage },
    };

    const { fileName } = (await rp(uploadOptions)).body;

    const retrieveOptions = {
      ...retrieveRequest,
      uri: `${endpoint}/retrieve?fileName=${fileName}`,
    };

    const result = await rp(retrieveOptions);
    expect(result.statusCode).toBe(200);
    expect(result.body).toBeDefined();
  });

  it('should bail off for an image which does not exist', async () => {
    const retrieveOptions = {
      ...retrieveRequest,
      uri: `${endpoint}/retrieve?fileName=not-there`,
    };

    await expect(rp(retrieveOptions)).rejects.toThrow(/404/);
  });

  it('should bail off when not called properly', async () => {
    const retrieveOptions = {
      ...retrieveRequest,
      uri: `${endpoint}/retrieve?wrongParam=justWrong`,
    };

    await expect(rp(retrieveOptions)).rejects.toThrow(/400/);
  });

  it('should bail off when not called with empty fileName param', async () => {
    const retrieveOptions = {
      ...retrieveRequest,
      uri: `${endpoint}/retrieve?fileName`,
    };

    await expect(rp(retrieveOptions)).rejects.toThrow(/400/);
  });
});
