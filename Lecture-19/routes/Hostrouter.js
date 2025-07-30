// const path=require('path')
const express = require("express");
// const rootDir = require("../utils/pathutils");
const hostrouter = express.Router();
const hostController=require("../controllers/hostController.js")//mvc
hostrouter.get("/add-home",hostController.getAddhome)//mvc
//to store input data
// const registeredHomes = [];
hostrouter.get("/host-home-list", hostController.getHostHomes)
//edit home
hostrouter.get("/edit-home/:homeId",hostController.getEditHome)
hostrouter.post("/add-home", hostController.postAddHome)
hostrouter.post("/edit-home",hostController.postEditHome)
//delete
hostrouter.post("/delete-home/:homeId",hostController.postDeleteHome)
module.exports = hostrouter;
