const url = require('url');
const request = require('request');
const {InvalidCredentials, RequestFailed} = require('./errors');

const validateCredentials = (oauth) => {
  const requiredFields = ['consumer_key', 'consumer_secret', 'token', 'token_secret'];
  requiredFields.forEach((key) => {
    if (!oauth[key]) throw InvalidCredentials();
  });
};

const Gnip = (oauth) => {
  validateCredentials(oauth);

  const doRequest = (path, params) => {
    return new Promise((resolve, reject) => {
      const opts = _buildRequestOptions(path, params);
      request.post(opts, _handleResponse(resolve, reject));
    });
  };

  const _buildRequestOptions = (path, params) => {
    const gzip = true;
    const url = _buildURL(path);
    return {url, oauth, gzip, json: true, body: params};
  };

  const _buildURL = (path) => {
    return url.format({
      protocol: 'https',
      hostname: 'data-api.twitter.com',
      pathname: path
    });
  };

  const _handleResponse = (resolve, reject) => {
    return (err, data) => {
      if (err) return reject(err);
      if (_requestFailed(data)) return reject(RequestFailed());
      resolve(data.body);
    };
  };

  const _requestFailed = (data) => data.statusCode === 500;

  return doRequest;
};

module.exports = Gnip;
