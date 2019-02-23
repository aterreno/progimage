const jsonResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
};

const pngResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: { 'Content-Type': 'image/png' },
    isBase64Encoded: true,
    body,
  };
};

module.exports = { jsonResponse, pngResponse };
