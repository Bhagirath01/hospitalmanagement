var express = require('express');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const Hospital = require('../models/hospital');
const bcrypt = require('bcrypt');
Vender = require('../models/vender');

var auth = require("../middleware/auth-api");

var router = express.Router();
const upload = require('../middleware/upload');

const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret456484854848"

var AuthController = require('../controllers/api/AuthController');
var HospitalController = require('../controllers/api/HospitalController');
var AccountController = require('../controllers/api/AccountController');
var VenderController = require('../controllers/api/VenderController');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, Hospital.authenticate()));


router.post("/login", passport.authenticate("local"), AuthController.login);
router.post("/register", AuthController.registerUser);

router.post("/profile", auth.verify, HospitalController.profile);

//change-password
router.post("/change-password", auth.verify, AccountController.changePassword);

//Hospital Update
router.get("/delete-hospital/hospital.id",auth.verify,AccountController.deleteHospital);

router.post("/hospitalupdate", auth.verify, AccountController.hospitalUpdate);

//password
router.post("/change-password", auth.verify, AccountController.changePassword);

//Vender
router.post("/addvender", auth.verify,VenderController.addVender);
router.post("/removevender/:vender_id",auth.verify, VenderController.deletevender);
router.post("/updatevender/:vender_id",auth.verify, VenderController.venderUpdate);
router.get("/getvender", VenderController.getVender);





router.get("/logout", (req, res) => {
    req.logout();
});



module.exports = router;