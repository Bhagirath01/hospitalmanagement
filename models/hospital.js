const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");



const HospitalSchema = new mongoose.Schema({

    personcontact:{
        type: String,
    },
    email:{
        type: String,
        required: 'hospital email is required.',
    },
    phone:{
        type: String,
    },
    password:{
        type: String,
    },
    address:{
        type: String,
    },
    status:{
        type: Number,
        default: 1
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
   image:String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

HospitalSchema.plugin(passportLocalMongoose,{usernameField:'email'});

// HospitalSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

HospitalSchema.query.byStatus = function(sCode) {
    return this.where({ status: sCode })
};





module.exports = mongoose.model("Hospital", HospitalSchema);