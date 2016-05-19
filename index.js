'use strict';
const OAuth = require('oauth');
const url = require('url');

const GNIP_API_PROTOCOL = 'https';
const GNIP_API_HOST = 'data-api.twitter.com';
const TWITTER_URL_REQ = 'https://api.twitter.com/oauth/request_token';
const TWITTER_URL_OA_ACCESS = 'https://api.twitter.com/oauth/access_token';
const CONTENT_TYPE = 'application/json';

const Gnip = function(args) {
  const credentials = {
    consumerKey: args.consumerKey,
    consumerSecret: args.consumerSecret,
    accessToken: args.accessToken,
    accessTokenSecret: args.accessTokenSecret
  };
  this.credentials = credentials;
  this.auth = new OAuth.OAuth(
    TWITTER_URL_REQ,
    TWITTER_URL_OA_ACCESS,
    credentials.consumerKey,
    credentials.consumerSecret,
    '1.0A',
    null,
    'HMAC-SHA1'
  );
};

Gnip.prototype = {
  get: function(endpointPath, params, callback) {
    const endpointUrl = url.format({
      protocol: GNIP_API_PROTOCOL,
      hostname: GNIP_API_HOST,
      pathname: endpointPath,
      query: params
    });
    const accessToken = this.credentials.accessToken;
    const accessTokenSecret = this.credentials.accessTokenSecret;
    return this.auth.get(endpointUrl, accessToken, accessTokenSecret, callback);
  },
  post: function(endpointPath, params, callback) {
    const endpointUrl = url.format({
      protocol: GNIP_API_PROTOCOL,
      hostname: GNIP_API_HOST,
      pathname: endpointPath
    });
    const accessToken = this.credentials.accessToken;
    const accessTokenSecret = this.credentials.accessTokenSecret;
    const data = JSON.stringify(params);
    return this.auth.post(endpointUrl, accessToken, accessTokenSecret, data, CONTENT_TYPE, callback);
  }
};

module.exports = Gnip;
