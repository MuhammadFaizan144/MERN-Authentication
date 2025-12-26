const express=require('express')
const session=require('express-session')
const multer=require('multer')
const MongoDBStore=require('connect-mongodb-session')(session);
const DB_PATH="mongodb+srv://fg7829098:faizanfk0309@cluster01.erroaal.mongodb.net/?appName=Cluster01"
// const { default: mongoose } = require('mongoose')
const app=express()
const path=require('path')
const rootDir=require('./utils/pathutils')
const storeRouter=require("./routes/storeRouter")
const hostRouter=require("./routes/hostRouter")
const authRouter=require("./routes/authRouter")
const get404=require("./controllers/error")
const mongoose=require('mongoose')
app.set("view engine","ejs")
app.set("views","views")

const store=new MongoDBStore({
  url:DB_PATH,
  collection:'sessions'
})

const multerOption={
  dest:"uploads/"
}

app.use(express.static(path.join(rootDir,"public")))
app.use(express.urlencoded())
app.use(multer(multerOption).single('photo'))

app.use(session({
  secret:"Hello Habibi",
  resave:false,
  saveUninitialized:true,
  store:store,
}))

app.use((req,res,next)=>{
  req.isLoggedIn=req.session.isLoggedIn
  next()
})



app.use(authRouter)
app.use(storeRouter)
app.use("/host",(req,res,next)=>{
  if(req.isLoggedIn){
    next()
  }else{
    res.redirect("/")
  }
})
app.use("/host",hostRouter)
app.use(get404.getError)

const POST=3000
mongoose.connect(DB_PATH).then(()=>{
  console.log('Connected to Mongo')
  app.listen(POST,()=>{
    console.log(`Server link http://localhost:${POST}` )
  })
}).catch(err=>{
  console.log('Error while connecting to Mongo: ',err)
})