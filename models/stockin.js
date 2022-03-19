const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const qtySchema = new Schema({
    box: {
        type: Number,
    },
    totalpeace:{
        type: Number,
    }
},
{ timestamps: { createdAt: 'created_at' } });


const StockinSchema = new mongoose.Schema({

    venderId:{
        type: Schema.Types.ObjectId,
        ref: 'Vender'
    },
    itemname:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
        
    },
    qty:[qtySchema]
   
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model("Stockin",StockinSchema);
