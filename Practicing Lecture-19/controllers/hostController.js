const { Result } = require("postcss")
const Home = require("../models/home")

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", { pageTitle: "Add Home", currentPage: "addhome", editing: false ,isLoggedIn:req.isLoggedIn})
}
const registeredHome = []

exports.getHomeAdd = (req, res, next) => {
  // console.log(req.body)
  const { houseName, price, location, rating, photoURL } = req.body
  const home = new Home({ houseName, price, location, rating, photoURL })

  home.save().then(() => {
    console.log("Home saved sccessfully")
  })
  res.redirect("/host/host-home-list")
}

exports.getHostHomeList = (req, res, next) => {

  Home.find().then(registeredHome => {
    res.render("host/host-home-list", { registeredHome: registeredHome, pageTitle: "Host Home List", currentPage: "hostHomeList" ,isLoggedIn:req.isLoggedIn})
  })
}
exports.getEditHome = (req, res, next) => {

  const homeId = req.params.homeId
  const editing = req.query.editing === 'true'
  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home does not found for editing")
      return res.redirect("/host/host-home-list")
    }
    console.log(homeId, editing, home)
    res.render("host/edit-home", { home: home, pageTitle: "Edit your Home", currentPage: "addhome", editing: editing ,isLoggedIn:req.isLoggedIn})

  })
}
exports.postEditHome = (req, res, next) => {
  const { id, houseName, location, rating, price, photoURL } = req.body
  Home.findById(id).then((home) => {
    home.houseName = houseName
    home.location = location
    home.rating = rating
    home.price = price
    home.photoURL = photoURL
    home.save().then(result => {
      console.log('Home updated', result)
    }).catch(err => {
      console.log('Error', err)
    })
    res.redirect("/host/host-home-list")
  }).catch(err => {
    console.log('Error', err)
  })

}

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId
  console.log("Came to delete home ID", homeId)
  Home.findByIdAndDelete(homeId).then(()=>{
    res.redirect("/host/host-home-list")
  }).catch((error)=>{
    console.log('Error while deleting ',error)
  })
}
exports.registeredHome = registeredHome