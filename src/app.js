const path = require('path') //core module
const express =  require('express')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public')) //pointing to public folder
const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath)) //to customize our server
//static means items do not change, so if I refresh the page it will be showing the same.
const port = 3000

//it wont run if app.use(...) is running
// app.get('',(req,res)=>{
//     res.send('<h1>hello express</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send({name:'Erick',age:27})
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>about page</h1>')
// })

app.get('/weather',(req,res)=>{
    res.send({forecast:'It is snowing',location:'Punta Negra'})
})

//app.com
//app.com/help

app.listen(port,()=>{console.log(`Starting server on port ${port}`)})
