const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VenderSchema = new mongoose.Schema({
    type:{
        type: Boolean,
        default: true
    },
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    contact:{
        type: String,
    },
    companyname:{
        type: String,
    },
    address:{
        type: String,
    },
    payment:{
        type: String,
    },
    status:{
        type: Number,
        default: 1
    },
    
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
) ;

VenderSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


VenderSchema.query.byStatus = function(sCode) {
    return this.where({ status: sCode })
};

module.exports = mongoose.model("Vender",VenderSchema);
