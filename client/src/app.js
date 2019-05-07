const path = require('path') //core module
const express =  require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast =  require('./utils/forecast')


const app = express()
const port = 3000

//defines paths for Exoress config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath =  path.join(__dirname,'../templates/partials')

//setup handle bars engine and  views location
app.set('view engine','hbs') //setting the view engine as hbs, now we can create some dynamic content.
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath)) //to customize our server
//static means items do not change, so if I refresh the page it will be showing the same.



app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Erick Pacheco'
    }) //instead send we use render in order to render the views, previously we must set the wiew engine
    //index refers ti index.hbs
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Erick Pacheco'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'Erick Pacheco',
        helpText:'Some Help content'
    })
})



app.get('/products', (req,res)=>{
    const {search, rating} = req.query//req.quey is an object
    if(!search){
        return res.send({ //putting return so we can use res.send lines down
            error:'you must provide a search item'
        })
    }
    res.send({products:[]})
})


app.get('/weather',(req,res)=>{
    const {address} = req.query
    if(!address){
        return res.send({error:'provide a valid address'})
    }
    geocode(address, (error,{latitude,longitude,location}={}) => {//es6 default parameters    
        if(error){
            return res.send({error})//console.log(error)
        }
        
        forecast(latitude, longitude,(error,data)=>{//callback chaining
            if(error){
                return res.send({error})//console.log('Error',error)
            }
    
            res.send({forecast:data,location,address})//console.log(chalk.green.inverse(`${location}\n ${data}`))
        })
    })   
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Article not found',
        name:'Erick Pacheco',
        errorMessage: 'Help article not found'
    })
})

//lastly by default
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Erick Pacheco',
        errorMessage: 'page not found'
    })
})


app.listen(port,()=>{console.log(`Starting server on port ${port}`)})
