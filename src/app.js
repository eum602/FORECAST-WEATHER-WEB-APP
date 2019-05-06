const path = require('path') //core module
const express =  require('express')

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath)) //to customize our server
//static means items do not change, so if I refresh the page it will be showing the same.

app.set('view engine','hbs') //setting the view engine as hbs, now we can create some dynamic content.

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
        name:'Erick'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help page'
    })
})

const port = 3000

app.get('/weather',(req,res)=>{
    res.send({forecast:'It is snowing',location:'Punta Negra'})
})

app.listen(port,()=>{console.log(`Starting server on port ${port}`)})
