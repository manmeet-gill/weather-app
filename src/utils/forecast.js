 const request = require('request')



 var forecast = (lat, lon, callback) =>{
    const url = 'https://api.darksky.net/forecast/a50dee52270f4816bdd2b5bb1786ca90/' + lat+','+lon

    request({ url, json: true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect to Network services', undefined)
        }else if(body.error){
            callback('Unable to get weather for location, try again with different location', undefined)
        } else{
            callback(undefined, body.daily.data[0].summary+'it is currently '+ body.currently.temperature+' degrees out. There is a '+ body.currently.precipProbability+'% chance of rain. \nHumidity is approx. '+body.currently.humidity*100 +'% with wind speed of '+body.currently.windSpeed+' miles per hour.')
        }
    })
}

module.exports = forecast