var oauthSignature = require('oauth-signature')
  , nonce          = require('nonce')()
  , request        = require('request');

module.exports = function (options, callback) {
  var parameters = {
    action: 'getmeas',
    oauth_consumer_key: options.consumer_key,
    oauth_nonce: nonce(),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Date.now(),
    oauth_token: options.token,
    oauth_version: '1.0',
    userid: options.user_id
  };

  var url = 'http://wbsapi.withings.net/measure';

  parameters['oauth_signature'] = oauthSignature.generate('GET', url, parameters, options.consumer_secret, 
    options.token_secret, { encodeSignature: false });

  request.get({ url: url, qs: parameters }, function (error, response, body) {
      if (error) {
        callback(error, null);
      }
      else {
        callback(null, body);
      }
  });
};
