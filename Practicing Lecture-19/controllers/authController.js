exports.getLogin=(req,res,next)=>{
    res.render("auth/login", {pageTitle: "Login", currentPage: "addhome",isLoggedIn:false})
}
exports.getSignup=(req,res,next)=>{
    res.render("auth/signup", {pageTitle: "SignUp", currentPage: "signup",isLoggedIn:false})
}
exports.postSignup=(req,res,next)=>{
    console.log(req.body)
    // req.session.isLoggedIn=true
    res.redirect("/")
}
exports.postLogin=(req,res,next)=>{
    console.log(req.body)
    req.session.isLoggedIn=true
    res.redirect("/")
}
exports.postLogout=(req,res,next)=>{
    // console.log(req.body)
    req.session.destroy(()=>{
        res.redirect("/login")

    })
}
