exports.getError=(req,res,next)=>{
  res.status(404).render("page_404",{pageTitle:"404",currentPage:"404",isLoggedIn:req.isLoggedIn})
}