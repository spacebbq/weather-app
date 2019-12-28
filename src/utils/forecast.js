const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url =
        'https://api.darksky.net/forecast/211c7e185fc45a53a49b47f9fa52c951/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback("Unable to access forecast services", undefined)
        } else if (response.body.error) {
            callback("Unable to find location.", undefined)
        } else {
            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                currentTemp: response.body.currently.temperature,
                currentPrecip: response.body.currently.precipProbability
            })

        }
    })
}

module.exports = forecast