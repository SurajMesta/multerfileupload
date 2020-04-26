const express=require('express')
const app= express()
const route=require('./router/router')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const PORT= Number(process.env.port || 5000)
const config= require('./config/config')

app.use(bodyParser.urlencoded({extended:true}))
app.use('/',route)


mongoose.Promise=global.Promise
mongoose.connect(config.DB,{useNewUrlParser:true}).then(myRes=>{
    console.log("Mongoose Connection Successful")
},
err=>{
    console.log("Mongoose Connection Failed")
})


app.set('views','./views')
app.set('view engine','ejs')


app.listen(PORT,()=>{
    console.log(`The server is up and running at PORT ${PORT}`)
})