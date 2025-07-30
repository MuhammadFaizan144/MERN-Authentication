exports.getLogin = (req, res, next) => {
  //mvc
  res.render("auth/Login", {
    pageTitle: "Login", currentPage:"login", isLoggedIn:false
  });
  //Important to change in partial
};
exports.getSignUp=(req,res,next)=>{
  res.render("auth/signUp",{
    pageTitle:"SignUp",currentPage:"signup",isLoggedIn:false
  })
}
exports.postLogin=(req,res,next)=>{
  console.log(req.body)
  req.session.isLoggedIn=true
  // res.cookie("isLoggedIn",true)
  // req.isLoggedIn=true;
  res.redirect("/");
}
exports.postSignUp=(req,res,next)=>{
  console.log(req.body)
  // req.session.isLoggedIn=true
  res.redirect("/login");
}

exports.postLogout=(req,res,next)=>{
  req.session.destroy(()=>{
    res.redirect("/login")

  })
}