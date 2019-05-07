const request=require('request')

//variables
const DARSKY_ACCESS_TOKEN = "f1d60d08ed11ec2553fe01dee752e52e"
const forecast = ((latitude, longitude,callback)=>{
    const url = `https://api.darksky.net/forecast/${DARSKY_ACCESS_TOKEN}/${latitude},${longitude}?units=si&lang=es`
    //request({url:url,json:true},(error, response)=>{    
    request({url,json:true},(error, {body})=>{            
        //const data = JSON.parse(response.body)
        if(error){
            //console.log(chalk.red.inverse('unable to connect - check your network'))
            callback('unable to connect - check your network',undefined)
        }else if(body.error){
            //console.log(chalk.red.inverse('Unable to find location'))
            callback('Unable to find location',undefined)
        }else{
            //console.log(chalk.green.inverse(`${response.body.daily.data[0].summary}. It is currently ${response.body.currently.temperature} degrees. There is a ${response.body.currently.precipProbability}% chance of rain`))
            const message = `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degrees. There is a ${body.currently.precipProbability}% chance of rain`
            callback(undefined,message)
        }
    })
})

module.exports = forecast