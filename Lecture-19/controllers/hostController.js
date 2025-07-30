const Home = require("../models/home"); //Adding Module

const registeredHomes = [];
exports.getAddhome = (req, res, next) => {
  //mvc
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "addHome",
    editing:false,
    isLoggedIn : req.isLoggedIn
  });
  //Important to change in partial
};

exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then(home => {
    // const home = homes[0];
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
      isLoggedIn:req.isLoggedIn
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then(registeredHomes=>{ //Use find instead of fetchAll in mongoose
      res.render("host/host-home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "Host Home List",
        currentPage: "host-homes",
        isLoggedIn:req.isLoggedIn
      }) //Important to change in partial
  });
};

//Editing home
exports.postAddHome = (req, res, next) => {
  console.log(req.body); //parcel

  const { houseName, price, location, rating, photoURL,description } = req.body;
  const home = new Home({houseName, price, location, rating, photoURL,description}); //Adding Module
  home.save().then(()=>{
    console.log('Home Saved succesfully')
  })
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  console.log(req.body); //parcel

  const {id, houseName, price, location, rating, photoURL,description } = req.body;
  Home.findById(id).then((home)=>{
    home.houseName=houseName;
    home.price=price;
    home.location=location;
    home.rating=rating;
    home.photoURL=photoURL;
    home.description=description;
    home.save().then(result=>{
      console.log('Home updated',result)
    }).catch(err=>{
      console.log("Error while updating",err)
    })
    res.redirect("/host/host-home-list");
  }).catch(err=>{
    console.log("Error while finding home",err)
  })
};

//delete
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete ', homeId);
  Home.findByIdAndDelete(homeId).then(() => {
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log('Error while deleting ', error);
  })
}
exports.registeredHomes = registeredHomes;
