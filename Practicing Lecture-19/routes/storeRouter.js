const express=require("express")
const storeRouter=express.Router()

const storeController=require("../controllers/storeController")
storeRouter.get("/",storeController.getIndex)
storeRouter.get("/Homes",storeController.getHomeList)
storeRouter.get("/bookings",storeController.getBooking)
storeRouter.get("/favourite",storeController.getFavouriteList)
storeRouter.post("/favourite",storeController.postAddToFavourite)
storeRouter.get("/Homes/:homeId",storeController.getHomeDetails)
storeRouter.post("/favourite/delete/:homeId",storeController.postDeleteFavourite)
module.exports=storeRouter