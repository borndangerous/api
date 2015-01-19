# API

A personal statistics API.

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

## Inspiration

* [Anand Sharma](http://aprilzero.com/) (and his new company [Gyroscope](https://gyrosco.pe))
* [Naveen Salvadurai](http://api.naveen.com/) ([blog post](http://x.naveen.com/post/51808692792/a-personal-api))
* [Chris Hopkin](https://github.com/hopkinschris/dashboard) ([blog post](http://blog.hopkins.io/2013/06/08/personal-api/))
