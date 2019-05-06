const path = require('path') //core module
const express =  require('express')
const hbs = require('hbs')

const app = express()

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

const port = 3000

app.get('/weather',(req,res)=>{
    res.send({forecast:'It is snowing',location:'Punta Negra'})
})

app.listen(port,()=>{console.log(`Starting server on port ${port}`)})
