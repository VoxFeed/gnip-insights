const url = require('url');
const request = require('request');

const Gnip = (oauth) => {
  validateCredentials(oauth);

  return (path, params) => {
    return new Promise((resolve, reject) => {
      const gzip = true;
      const url = buildURL(path);
      request.post({url, oauth, gzip, json: true, body: params}, (error, data) => {
        if (error) return reject(error);
        if (data.statusCode === 500) return reject(new Error('Request failed'));
        resolve(data.body);
      });
    });
  };
};

const validateCredentials = (oauth) => {
  const requiredFields = ['consumer_key', 'consumer_secret', 'token', 'token_secret'];
  requiredFields.forEach((key) => {
    if (!oauth[key]) throw new Error('invalid credentials');
  });
};

const buildURL = (path, params) => {
  return url.format({
    protocol: 'https',
    hostname: 'data-api.twitter.com',
    pathname: path,
    query: params
  });
};

module.exports = Gnip;
