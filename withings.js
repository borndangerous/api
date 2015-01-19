var oauthSignature = require('oauth-signature')
  , nonce          = require('nonce')()
  , request        = require('request')
  , fs             = require('fs')
  , _              = require('underscore');

module.exports = function (options, callback) {
  fetchBodyMeasurements(options, function (error, data) {
    if (error) {
      callback(error);
    }
    else {
      callback(null, transformBodyMeasurementsResponse(JSON.parse(data)));
    }
  });
};

var transformBodyMeasurementsResponse = function (response) {
  var transformBodyMeasurement = function (measurement, date) {
    var typeIdentifiersToStrings = {
      1: 'weight',
      4: 'height',
      5: 'fat_free_mass',
      6: 'fat_ratio',
      8: 'fat_mass_ratio',
      9: 'diastolic_blood_pressure',
      10: 'systolic_blood_pressure',
      11: 'heart_pulse',
      54: 'sp02'
    };

    var convertBodyMeasurementValue = function (measurement) {
      var value = (function () {
        var metersToFeet = function (meters) {
          return meters * 3.28084;
        };

        var kilogramsToPounds = function (kilograms) {
          return kilograms * 2.20462262;
        };

        switch (measurement.type) {
          // Meters
          case 4:
            return metersToFeet(measurement.value);
          // Kilograms
          case 1:
          case 5:
          case 8:
            return kilogramsToPounds(measurement.value);
          default:
            return measurement.value;
        }
      }()); 

      var applyExponent = function (value, exponent) {
        var precision = 4;

        if (exponent < 0) {
          return (value/Math.pow(10, -exponent)).toPrecision(precision);
        }
        else if (exponent > 0) {
          return (value * Math.pow(10, exponent)).toPrecision(precision); 
        }
        else {
          return value;
        }
      };

      return applyExponent(value, measurement.unit);
    };

    return {
      type: typeIdentifiersToStrings[measurement.type],
      date: date,
      value: convertBodyMeasurementValue(measurement)
    };
  };

  return _(response.body.measuregrps)
    .chain()
    .filter(function (group) {
      // Return only real measurements (as opposed to user objectives)
      return group.category === 1;
    })
    .map(function (group) {
      // Convert each group into just an array of measurements, and convert each Withings API measurement object into our own type
      return _(group.measures).map(function (measurement) {
        return transformBodyMeasurement(measurement, group.date);
      });
    })
    // Flatten arrays of measurements into a single array
    .flatten()
    // Group measurements by their type (e.g. weight, blood pressure)
    .groupBy('type')
    .each(function (measurements) {
      // We’re now grouped by type, so each individual measurement object doesn’t need a type property
      _(measurements).each(function (measurement) {
        delete measurement.type;
      });
    })
    .value()
};

var fetchBodyMeasurements = function (options, callback) {
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
        callback(error);
      }
      else {
        callback(null, body);
      }
  });
};
