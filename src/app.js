const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const publicStaticDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const weatherData =require('../utils/weatherData')
// setting  paths
app.use(express.static(publicStaticDirPath))

// setting up views engine
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath) 



// create a listening port 
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('listening on port: ', port); 
})

// create routes
app.get('',(req, res) =>{
    res.render('index', {
        title: 'Weather App'
    })
})
app.get('/weather',(req,res) =>{
    const address = req.query.address
    if(!address){
       return res.send({
           error:"you must enter the address in the search box"})
    }
    weatherData( address, (error, {temperature, description, cityName} = {}) =>{
        if(error){
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName)
        res.send({
            temperature,
            description,
            cityName
        })
    })
})
app.get('*', (req,res)=>{
    res.render('404',{
        title: "Page not Found"
    })
})