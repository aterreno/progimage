const rp = require('request-promise');

const endpoint = 'https://js0zcbth7g.execute-api.eu-west-2.amazonaws.com/dev/';
const sampleImage = require('../data-samples/ok-sample.json');

const uploadRequest = {
  method: 'POST',
  uri: `${endpoint}/upload`,
  json: true,
  resolveWithFullResponse: true,
};

describe('upload handler', () => {
  it('should upload an image', async () => {
    const options = {
      ...uploadRequest,
      body: { ...sampleImage },
    };

    const result = await rp(options);
    expect(result.statusCode).toBe(201);
    expect(result.body.fileName).toBeDefined();
  });

  it('should bail off when no body', async () => {
    const options = {
      ...uploadRequest,
    };
    await expect(rp(options)).rejects.toThrow(/400/);
  });

  it('should bail off when empty body', async () => {
    const options = {
      ...uploadRequest,
      body: {},
    };
    await expect(rp(options)).rejects.toThrow(/400/);
  });

  it('should bail off when wrong format', async () => {
    const options = {
      ...uploadRequest,
      body: { wrong: 'format' },
    };
    await expect(rp(options)).rejects.toThrow(/400/);
  });
});
