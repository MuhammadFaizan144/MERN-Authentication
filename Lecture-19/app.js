const path = require("path");
const rootDir = require("./utils/pathutils");
const express = require("express");
const app = express();
//session
const session=require("express-session")
const MongoDBStore=require('connect-mongodb-session')(session)
//ejs

const DB_PATH =
  "mongodb+srv://fg7829098:faizanfk0309@cluster01.erroaal.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Cluster01";

const storeRouter = require("./routes/storeRouter"); //Export Router
const hostrouter = require("./routes/Hostrouter"); //Export Router
const authRouter = require("./routes/authRouter");
// const { error } = require("console");
const Homecontroller = require("./controllers/error");
// const { mongoConnect } = require("./utils/databaseUtil");
const { default: mongoose } = require("mongoose");
app.set("view engine", "ejs"); // Tells Express to use EJS templates
app.set("views", path.join(rootDir, "views")); // Correct key is 'views' new version key

app.use(express.urlencoded()); //parcel
//session
const store=new MongoDBStore({//to store session in mongodb
  uri:DB_PATH,
  collection:'session'
})
app.use(session({
  secret:"KnowledgeGate AI with Complete Coding",
  resave:false,
  saveUninitialized:true,
  store

}))
//cookie
app.use((req, res, next) => {
    req.isLoggedIn = req.session.isLoggedIn

  next()
});

app.use(authRouter); //auth router
app.use(storeRouter); //Export Router
app.use("/host", (req, res, next) => {
  //to prevent access page by url without login
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostrouter); //Export Router /host for overall path sharing
app.use(express.static(path.join(rootDir, "public"))); //To access css file

app.use(Homecontroller.page404);

const PORT = 3002;
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to mongoose");
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
