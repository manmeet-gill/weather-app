const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index',{
        title: 'weather app',
        name:'Manmeet'
    })
})
app.get('/about', (req, res)=> {
    res.render('about',{
        title: 'about app',
        name:'Manmeet'
    })
})

app.get('/help', (req, res)=> {
    res.render('help',{
        title: 'Help app',
        message:'Help is on its way',
        name:'Manmeet'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    location = req.query.address
    geocode(location, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
            //return console.log(error)
        }
        forecast(latitude, longitude, (error, forecastdata)=>{
        if(error){
            return res.send({error})
          //  return console.log(error)
        }
            res.send({
                location,
                forecastdata
            })
           
        })
    })

    

})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'help article not found',
        name:'Manmeet'
    })
})

app.get('*',(req, res)=> {
    res.render('404',{
        title:'404',
        errorMessage:'page not found',
        name:'Manmeet'
    })
})



app.listen(port, ()=>{
    console.log('Server is up on port: '+port)
})