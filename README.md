# API

A (very much work in progress) personal statistics API.

## Integrations

*  Withings

#### Configuration

For each service below, the variables listed need to be added as either environment variables (for a production environment e.g. Heroku) or included in a `credentials.json` file (for local development).

##### Withings

* `WITHINGS_CONSUMER_KEY`
* `WITHINGS_CONSUMER_SECRET`
* `WITHINGS_TOKEN`
* `WITHINGS_TOKEN_SECRET`
* `WITHINGS_USER_ID`

## Routes

### `/v1/health`

#### Response

```json
{
  "heart_pulse": [
    {
      "date": 1421600481,
      "value": 70
    }
  ],
  "weight": [
    {
      "date": 1421600481,
      "value": "163.9"
    }
  ],
  "fat_free_mass": [
    {
      "date": 1421600481,
      "value": "139.0"
    }
  ],
  "fat_ratio": [
    {
      "date": 1421600481,
      "value": "15.19"
    }
  ],
  "fat_mass_ratio": [
    {
      "date": 1421600481,
      "value": "24.89"
    }
  ],
  "height": [
    {
      "date": 1385171117,
      "value": "5.8325512"
    }
  ]
}
```

### `/v1/fitness`

### `/v1/music`

### `/v1/code`

### `/v1/travel`

## Inspiration

* [Anand Sharma](http://aprilzero.com/) (and his new company [Gyroscope](https://gyrosco.pe))
* [Naveen Salvadurai](http://api.naveen.com/) ([blog post](http://x.naveen.com/post/51808692792/a-personal-api))
* [Chris Hopkin](https://github.com/hopkinschris/dashboard) ([blog post](http://blog.hopkins.io/2013/06/08/personal-api/))

## License
Available for use under the MIT license: [http://bryan.mit-license.org](http://bryan.mit-license.org)
