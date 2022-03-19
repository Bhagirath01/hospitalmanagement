var passport = require('passport');
Hospital = require("./../../models/hospital");
const jwt = require('jsonwebtoken');

// var passport = require('passport');
// User = require("./../../models/user");
// const jwt = require('jsonwebtoken');

exports.login = function (req, res) {
  Hospital.findOne({ email: req.body.email }, 'name email phone status isAdmin', (err, userData) => {
    if (err) {
      console.log("1234")
      res.status(200).json({ status: false, message: err.message, data: {} });
    }else if(!userData){
      res.status(200).json({ status: false, message: 'No account found on this email', data: {} });
    }else if(userData.status!=1){
      res.status(200).json({ status: false, message: 'Your account is not active', data: {} });
    }else {
        var fullName = userData.name.split(' ');
        var newObj = {
          id: userData.id,
          first_name: fullName[0],
          last_name: (fullName[1]) ? fullName[1] : '',
          email: userData.email,
          phone: userData.phone,
          isAdmin: userData.isAdmin,
          created_at: userData.created_at,
          updated_at: userData.updated_at
        }
        res.status(200).json({ status: true, message: 'logged in successfully', data: { token: jwt.sign({ data: userData }, 'safsad4d5s8a4f8sd4f8gds4g8dfs48g', { expiresIn: '2h' }), user: newObj } });
     
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
                    name: req.body.name,
                    personcontact: req.body.personcontact,

      }),
      req.body.password,
      function (err, userData) {
        if (err) {
          res.status(200).json({ status: false, message: err.message, data: {} });
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
        }
      });
    }
  
  });

}
exports.registerUser = registerUser;

 
async function profile(req, res) {

  res.send('Welcome ' + req.user.name);
}
exports.profile = profile;


//Membershiprequest

async function membershipRequest(req, res, next) {
  try {

    // var token = Math.random().toString(64).slice(2);

    var anysize = 32;
    var charset = "abcdefghijklmnopqrstuvwxyz";
    var result = "";
    for (var i = 0; i < anysize; i++) {
      result += charset[Math.floor(Math.random() * charset.length)];
    }
    console.log(result);

    const membershiprequest = new Membershiprequest({
      ...req.body,
      token: result
    });
    membershiprequest.save(function (err, results) {
      res.status(201).json({
        message: "request send successfully",
        status: 'success',
        token: result,

      });
    });

  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Unable to send request", data: {} })

  }

}
exports.membershipRequest = membershipRequest;

  



// exports.login = function (req, res) {
//   Hospital.findOne({ email: req.body.email }, 'name email phone', (err, hospitalData) => {
//     if (err) {
//       res.status(200).json({ status: false, message: err.message, data: {} });
//     } else {
//       var newObj = {
//         id: hospitalData.id,
//         personcontact: hospitalData.personcontact,
//         email: hospitalData.email,
//         phone: hospitalData.phone,
//         address: hospitalData.address,
//         created_at: hospitalData.created_at,
//         updated_at: hospitalData.updated_at
//       }
//       res.status(200).json({ status: true, message: 'logged in successfully', data: { token: jwt.sign({ data: hospitalData }, 'safsad4d5s8a4f8sd4f8gds4g8dfs48g', { expiresIn: '2h' }), hospital: newObj } });
//     }
//   });
// };
// // // registerUser
// async function registerUser(req, res) {
//   User.findOne({ email: req.body.email }, 'email status', (err, user) => {
//     if(user){
//         res.status(200).json({ status: false, message: 'An user with this email address already exist', data: {} });
//       }else{
//       User.register(new User({
//         name: (req.body.first_name + ' ' + req.body.last_name),
//         email: req.body.email,
//         phone: req.body.phone,
//         referralsource: req.body.referralsource,

//       }),
//       req.body.password,
//       function (err, userData) {
//         if (err) {
//           res.status(200).json({ status: false, message: err.message, data: {} });
//         }else{
//           var fullName = userData.name.split(' ');
//           var newObj = {
//             id: userData.id,
//             first_name: fullName[0],
//             last_name: (fullName[1]) ? fullName[1] : '',
//             email: userData.email,
//             phone: userData.phone,
//             referralsource: userData.referralsource,
//             created_at: userData.created_at,
//             updated_at: userData.updated_at
//           }
          
//           passport.authenticate("local")(req,res,function(){
//             res.status(200).json({status:true,message: 'Account created successfully',data:newObj});
//           });
//         }
//       });
//     }
  
//   });

// }
// exports.registerUser = registerUser;
// // async function registerHospital(req, res) {
// //     Hospital.findOne({ email: req.body.email }, 'email status', (err, hospital) => {
// //     if(hospital){
// //         res.status(200).json({ status: false, message: 'An hospital with this email address already exist', data: {} });
// //       }else{
// //         Hospital.register(new Hospital({
// //           address:req.body.address,
// //             email: req.body.email,
// //             phone: req.body.phone,
// //             personcontact: req.body.personcontact,
// //           }),
// //           req.body.password,
// //           function (err, userData) {
// //             if (err) {
// //               console.log(err);
// //               res.status(200).json({ status: false, message: err.message, data: {} });
// //             }else{
// //               var newObj = {
// //                 id: userData.id,
// //                 email:userData.email,
// //                 phone: userData.phone,
// //                 personcontact: userData.personcontact,
// //                 created_at: userData.created_at,
// //                 updated_at: userData.updated_at
// //               }
              
// //               passport.authenticate("local")(req,res,function(){
// //                 res.status(200).json({status:true,message: 'Account created successfully',data:newObj});
// //               });
// //             }
// //           });
      
    
       
// //     }
// //   }); 
  
// // }
// // exports.registerHospital = registerHospital;

// async function profile(req, res) {

//   res.send('Welcome ' + req.hospital.name);
// }
// exports.profile = profile;
