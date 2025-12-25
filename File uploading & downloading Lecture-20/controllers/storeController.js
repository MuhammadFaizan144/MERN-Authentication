
const Home = require("../models/home");
const User = require("../models/user");
// const { registeredHome } = require("./hostController");
exports.getIndex = (req, res, next) => {
  // console.log("Session Value: ",req.session)
  Home.find().then(registeredHome => {
    res.render("store/index", {
      registeredHome: registeredHome,
      pageTitle: "Home",
      currentPage: "home",isLoggedIn:req.isLoggedIn,user:req.session.user,
    });
  });
};
exports.getHomeList = (req, res, next) => {
  Home.find().then(registeredHome => {
    res.render("store/home-list", {
      registeredHome: registeredHome,
      pageTitle: "Home List",
      currentPage: "Home",isLoggedIn:req.isLoggedIn,user:req.session.user,
    });
  });
};
exports.getBooking = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "Booking",
    currentPage: "bookings",isLoggedIn:req.isLoggedIn,user:req.session.user,
  });
};
exports.getFavouriteList =async (req, res, next) => {
  const userId=req.session.user._id
  const user=await User.findById(userId).populate('favourite')
  // const favouriteHomes=favourite.map((fav)=>fav.houseId)
  console.log("User ",user)
      res.render("store/favourite-list", {
        favouriteHomes: user.favourite,
        pageTitle: "Favourite",
        currentPage: "favourite",isLoggedIn:req.isLoggedIn,
        user:req.session.user,
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
        currentPage: "home-details",isLoggedIn:req.isLoggedIn,user:req.session.user,
      });
    }
  });
};

exports.postAddToFavourite =async (req, res, next) => {
  const homeId=req.body.id
  const userId=req.session.user._id
  const user=await User.findById(userId)
  if(!user.favourite.includes(homeId) ){
  user.favourite.push(homeId)
  await user.save()
  }
  res.redirect("/favourite");
  
};
exports.postDeleteFavourite=async(req,res,next)=>{
  const homeId=req.params.homeId
  // const homeId=req.body.id
  const userId=req.session.user._id
  const user=await User.findById(userId)
  if(user.favourite.includes(homeId)){
    user.favourite=user.favourite.filter(fav=>fav!=homeId)
    await user.save()
  }
    res.redirect("/favourite");
}