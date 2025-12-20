exports.getLogin=(req,res,next)=>{
    res.render("auth/login", {pageTitle: "Login", currentPage: "addhome",isLoggedIn:false})

}
exports.postLogin=(req,res,next)=>{
    // console.log(req.body)
    req.session.isLoggedIn=true
    // res.session("isLoggedIn",true)
    // res.isLoggedIn=true
    res.redirect("/")
}
exports.postLogout=(req,res,next)=>{
    // console.log(req.body)
    req.session.destroy(()=>{
        res.redirect("/login")

    })
}