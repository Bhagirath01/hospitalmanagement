// var Request = require("request");
var passport = require('passport');
const jwt = require('jsonwebtoken');
Hospital = require("./../../models/hospital");
const path = require('path');
var nodemailer = require('nodemailer');
const constants = require("../../config/constants");
const fetch = require("node-fetch");
var http = require('http');

var transporter = nodemailer.createTransport({
	service: constants.Constants.MAIL.SMTP_SERVICE,
	secure: false,
	port: 587,
	auth: {
		user: constants.Constants.MAIL.USER_NAME,
		pass: constants.Constants.MAIL.PASSWORD
	}
});


//login

exports.login = function (req, res) {
  Hospital.findOne({ email: req.body.email }, 'name email phone status isAdmin', (err, userData) => {
    if (err) {
      res.status(200).json({ status: false, message: err.message, data: {} });
    }else if(!userData){
      res.status(200).json({ status: false, message: 'No account found on this email', data: {} });
    }else {
        var newObj = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          isAdmin: userData.isAdmin,
          created_at: userData.created_at,
          updated_at: userData.updated_at
        }
        res.status(200).json({ status: true, message: 'logged in successfully', data: { token: jwt.sign({ data: userData }, 'safsad4d5s8a4f8sd4f8gds4g8dfs48g', { expiresIn: '2h' }), hospital: newObj } });
     
    }
  });
};



// registerUser
async function registerUser(req, res) {
  Hospital.findOne({ email: req.body.email }, 'email status', (err, user) => {
    if(user){
        res.status(200).json({ status: false, message: 'An user with this email address already exist', data: {} });
      }else{

      Hospital.register(new Hospital({
                    address:req.body.address,
                    email: req.body.email,
                    phone: req.body.phone,
                    personcontact: req.body.personcontact,

      }),
      req.body.password,
      function (err, userData) {
        if (err) {
          console.log("error is occure here");
         
          res.status(200).json({ status: false, message: err.message, data: {} });
          console.log(err);
        }else{
          var newObj = {
                id: userData.id,
                email:userData.email,
                phone: userData.phone,
                personcontact: userData.personcontact,
                created_at: userData.created_at,
                updated_at: userData.updated_at
          }
          
          passport.authenticate("local")(req,res,function(){
            res.status(200).json({status:true,message: 'Account created successfully',data:newObj});
          });

            var mailOptions = {
              from: constants.Constants.MAIL.MAIL_FROM,
              to: newObj.email,
              subject: 'mail regarding password',
              html: mailMembership(user)
            };
  
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
         
        }
      });
    }
  
  });

}
exports.registerUser = registerUser;


function mailMembership(user) {
  var strTemplate = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"><meta http-equiv="x-ua-compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"></head><body style="margin: 0px;padding: 0px;"><center><table width="100%" bgcolor="#ffffff" align="center" style="padding: 0px !important;"><tr><td align="center"><table class="mainTable" width="800" bgcolor="#000000" border="0" cellspacing="0" cellpadding="0" style="padding: 0px !important;"><tr><td class="header" align="center" style="padding: 90px 0 0 0;"><div style="height:10px"><a href="' + constants.Constants.MAIL.SITE_FRONT + '" title="exclusive vaults"><img class="headerLogo" src="' + constants.Constants.MAIL.SITE_PATH + '/images/exclusive-vaults-logo.png" alt="exclusive vaults" /></a></div></td></tr><tr><td><img src="' + constants.Constants.MAIL.SITE_PATH + '/images/bg1.png?v1.1.1" alt="bg1" style="width: 100% !important;height: auto !important;"></td></tr>';
	strTemplate += '<tr>';
	strTemplate += '<td class="conentMain" style="padding:0px 0px 50px 0px;">';
	strTemplate += '<div class="conentMainInner">';
	strTemplate += '<h3 class="conTitle" style="font-family: \'Poppins\', sans-serif; font-size: 53px; font-weight:900; color: #ffffff; line-height:1.1; padding:0px 0px 30px; margin:0px;text-align: center;">Hi</h3>';
	strTemplate += '<p style="display:block;font-family: \'Poppins\', sans-serif; font-weight: 500; font-size: 24px; line-height:1.1; color:#ffffff; margin:auto;text-align: center;width: 635px;">Your Passwor</p>';
	strTemplate += '</div>';
	strTemplate += '</div>';
	strTemplate += '</td>';
	strTemplate += '</tr>';
	strTemplate += '</ul><hr style="display: block;height: 16px;width: 100%;border: 0px !important; margin: 0px !important;padding: 0px !important; background: linear-gradient(180deg, rgba(250,210,82,1) 29%,rgba(189,146,53,1) 48%,rgba(254,214,82,1) 71%) !important;"></td></tr></table></td></tr></table></center></body></html>';
	return strTemplate;
}

