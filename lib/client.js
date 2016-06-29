'use strict';

const OAuth = require('oauth').OAuth;
const Promise = require('bluebird');
const url = require('url');
const REQUEST_TOKEN_URL = 'https://api.twitter.com/oauth/request_token';
const ACCESS_TOKEN_URL = 'https://api.twitter.com/oauth/access_token';
const CONTENT_TYPE = 'application/json';
const CUSTOM_HEADERS = {
  'Accept-Encoding': 'gzip'
};
const getClient = (credentials) => {
  const key = credentials.consumerKey;
  const secret = credentials.consumerSecret;
  return new OAuth(
    REQUEST_TOKEN_URL, ACCESS_TOKEN_URL, key, secret, '1.0A', null, 'HMAC-SHA1', null, CUSTOM_HEADERS
  );
};

const validateCredentials = (credentials) => {
  const requiredFields = ['consumerKey', 'consumerSecret', 'accessToken', 'accessTokenSecret'];
  requiredFields.forEach((key) => {
    if (!credentials[key]) throw new Error('invalid credentials');
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

const Gnip = (credentials) => {
  validateCredentials(credentials);
  const client = getClient(credentials);

  return (path, params, fn) => {
    const token = credentials.accessToken;
    const secret = credentials.accessTokenSecret;
    const data = JSON.stringify(params);

    return new Promise((resolve, reject) => {
      client.post(buildURL(path), token, secret, data, CONTENT_TYPE, (error, data) => {
        if (error) return reject(error);
        resolve(JSON.parse(data));
      });
    }).nodeify(fn);
  };
};

module.exports = Gnip;
