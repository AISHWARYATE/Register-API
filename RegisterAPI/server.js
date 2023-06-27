const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const regRouter = require('./src/routes/regRouter')

app.use('/register',regRouter)

const urlencodedparser=bodyParser.urlencoded({ extended: false})
app.listen(5000,()=>
{
  console.log("server starte at port http://localhost:5000");
})

