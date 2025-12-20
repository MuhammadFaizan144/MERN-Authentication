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
exports.postSignUp=[
  check("firstName")
  .trim()
  .isLength({min: 2})
  .withMessage("First Name should be atleast 2 characters long")
  .matches(/^[A-Za-z\s]+$/)
  .withMessage("First Name should contain only alphabets"),

  check("lastName")
  .matches(/^[A-Za-z\s]*$/)
  .withMessage("Last Name should contain only alphabets"),

  check("email")
  .isEmail()
  .withMessage("Please enter a valid email")
  .normalizeEmail(),

  check("password")
  .isLength({min: 8})
  .withMessage("Password should be atleast 8 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password should contain atleast one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password should contain atleast one lowercase letter")
  .matches(/[0-9]/)
  .withMessage("Password should contain atleast one number")
  .matches(/[!@&]/)
  .withMessage("Password should contain atleast one special character")
  .trim(),

  check("confirmPassword")
  .trim()
  .custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  check("userType")
  .notEmpty()
  .withMessage("Please select a user type")
  .isIn(['guest', 'host'])
  .withMessage("Invalid user type"),

  check("terms")
  .notEmpty()
  .withMessage("Please accept the terms and conditions")
  .custom((value, {req}) => {
    if (value !== "on") {
      throw new Error("Please accept the terms and conditions");
    }
    return true;
  }),
  

  (req,res,next)=>{
    
  const {firstName,secondName,email,password,userType}=req.body
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).render("auth/signup",{
      page:"Signup",
      currentPage:"signup",
      isLoggedIn:false,
      errors:errors.array().map(err=>err.msg),
      oldInput:{firstName,lastName,email,password,userType}
    })
  }
  // req.session.isLoggedIn=true
  res.redirect("/login");
}]

exports.postLogout=(req,res,next)=>{
  req.session.destroy(()=>{
    res.redirect("/login")

  })
}