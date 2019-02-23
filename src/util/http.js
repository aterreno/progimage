const jsonResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
};

const imgResponse = (statusCode, body, type) => {
  return {
    statusCode,
    headers: { 'Content-Type': `image/${type}` },
    isBase64Encoded: true,
    body,
  };
};

module.exports = {
  jsonResponse,
  imgResponse,
};
