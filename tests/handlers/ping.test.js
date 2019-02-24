const rp = require('request-promise');

const endpoint = 'https://js0zcbth7g.execute-api.eu-west-2.amazonaws.com/dev/';

const pingRequest = {
  method: 'GET',
  uri: `${endpoint}/ping`,
  json: true,
  resolveWithFullResponse: true,
};

describe('ping handler', () => {
  it('should always return pong', async () => {
    const result = await rp(pingRequest);
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe('pong');
  });
});
