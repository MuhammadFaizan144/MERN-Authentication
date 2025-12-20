const Favourite = require("../models/favourite");
const Home = require("../models/home");
const { registeredHome } = require("./hostController");
exports.getIndex = (req, res, next) => {
  // console.log("Session Value: ",req.session)
  Home.find().then(registeredHome => {
    res.render("store/index", {
      registeredHome: registeredHome,
      pageTitle: "Home",
      currentPage: "home",isLoggedIn:req.isLoggedIn
    });
  });
};
exports.getHomeList = (req, res, next) => {
  Home.find().then(registeredHome => {
    res.render("store/home-list", {
      registeredHome: registeredHome,
      pageTitle: "Home List",
      currentPage: "Home",isLoggedIn:req.isLoggedIn
    });
  });
};
exports.getBooking = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "Booking",
    currentPage: "bookings",isLoggedIn:req.isLoggedIn
  });
};
exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
  .populate('houseId')
  .then((favourite) => {
    const favouriteHomes=favourite.map((fav)=>fav.houseId)
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "Favourite",
        currentPage: "favourite",isLoggedIn:req.isLoggedIn
      });
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(home=> {
    if (!home) {
      console.log("Home not found");
      res.redirect("/Homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home-details",isLoggedIn:req.isLoggedIn
      });
    }
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId=req.body.id
  Favourite.findOne({houseId:homeId}).then((fav)=>{
    if(fav){
      console.log("already marked as favourite")
      res.redirect("/favourite");
    }else{
      fav=new Favourite({houseId:homeId});
      fav.save().then((result)=>{
        console.log("Fav added",result)
      })
    }
    res.redirect("/favourite");
  }).catch(err=>{
    console.log("Error while marking favourites: ",err)
  })
  
};
exports.postDeleteFavourite=(req,res,next)=>{
  const homeId=req.params.homeId
  Favourite.findOneAndDelete({houseId:homeId})
  .then(result=>{
    console.log('Fav Removed: ', result);
  }).catch(err => {
    console.log("Error while removing favourite: ", err);
  }).finally(() => {
    res.redirect("/favourite");
  });
}