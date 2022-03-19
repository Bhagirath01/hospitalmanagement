const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ConfigSchema = new mongoose.Schema({
    
        email:{type:String},
        phone:{type:String},
        address:{type:String},
        contactperson:{type:String}
   
});

module.exports = mongoose.model("Config", ConfigSchema);
