var passport = require('passport');
Hospital = require('../../models/hospital');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = require('../../middleware/upload');


//changePassword

async function changePassword(req, res) {
    try {
        Hospital.findById(req.hospital._id).then(function(sanitizedUser) {
            if (sanitizedUser) {
                sanitizedUser.changePassword(req.body.currentpassword, req.body.newpassword, function(err) {
                    if (!err) {
                        sanitizedUser.save();
                        res.status(200).json({ status: true, message: 'Password changed successful', data: {} });
                    } else {
                        if(err.name=='IncorrectPasswordError'){
                            res.status(200).json({ status: false, message: 'Current Password is incorrect.', data: {} });
                        }else{
                            res.status(200).json({ status: false, message: err.message, data: {} });
                        }
                    }
                });
            } else {
                res.status(200).json({ status: false, message: 'This user does not exist', data: {} });
            }
        }, function(err) {
            res.status(200).json({ status: false, message: 'Unable to change password', data: {} });
        })
    } catch (err) {
        throw err;
    }
}
exports.changePassword = changePassword;


//userUpdate

async function hospitalUpdate(req, res) {
    try {
        const hospital = await Hospital.findByIdAndUpdate({ _id: req.hospital._id }, {
            address:req.body.address,
            phone: req.body.phone,
            personcontact: req.body.personcontact,

        }, {
            omitUndefined: true,
            new: true,
        });
        const hospitalData = await hospital.save()
        var newObj = {
            phone: hospitalData.phone,
            address: hospitalData.address,
            personcontact: hospitalData.personcontact,
            created_at: hospitalData.created_at,
            updated_at: hospitalData.updated_at
        }

        res.json({ status: true, message: "hospital data updated successfully", data: newObj })
    } catch (err) {
        console.log(err);
        res.json({ status: false, message: "unable to update hospital data", data: {} })

    }
}
exports.hospitalUpdate = hospitalUpdate;

async function deleteHospital(req, res) {
	Vender.findOneAndRemove({_id: req.params.vender_id}, (err) => {
		if (err) {
			res.json({ status: false, message: "unable to delete"})
		}else{
			res.json({ status: true, message: "vender deleted successfully"})
		}
	});
}
exports.deleteHospital = deleteHospital;

