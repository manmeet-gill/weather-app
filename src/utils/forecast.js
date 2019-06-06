 const request = require('request')

 var forecast = (lat, lon, callback) =>{
    const url = 'https://api.darksky.net/forecast/a50dee52270f4816bdd2b5bb1786ca90/' + lat+','+lon

    request({ url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect to Network services', undefined)
        }else if(response.body.error){
            callback('Unable to get weather for location, try again with different location', undefined)
        } else{
            callback(undefined, response.body.daily.data[0].summary+'it is currently '+ response.body.currently.temperature+' degrees out. There is a '+ response.body.currently.precipProbability+'% chance of rain.')
        }
    })
}

module.exports = forecast