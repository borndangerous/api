var fs       = require('fs')
  , withings = require('./withings.js');

var fetchData = function (credentials) {
  withings({
    user_id: credentials.WITHINGS_USER_ID,
    consumer_key: credentials.WITHINGS_CONSUMER_KEY,
    consumer_secret: credentials.WITHINGS_CONSUMER_SECRET,
    token: credentials.WITHINGS_TOKEN,
    token_secret: credentials.WITHINGS_TOKEN_SECRET
  }, function (error, body) {
    if (error) {
      consoloe.log(error);
    }
    else {
      console.log(body);
    }
  });
};

fs.readFile('credentials.json', function (error, file) {
  if (error) {
    console.log(error);
  }
  else {
    fetchData(JSON.parse(file));
  }
});
