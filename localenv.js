var fs = require('fs');

module.exports = function (filename, callback) {
  if (fs.existsSync(filename)) {
    fs.readFile(filename, function (error, file) {
      if (error) {
        callback(error);
      }
      else {
        callback(null, JSON.parse(file))
      }
    });
  } 
  else {
    callback(null, process.env);
  }
};
