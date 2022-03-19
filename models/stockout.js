const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const StockoutSchema = new mongoose.Schema({
    hospitalId:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    venderId:{
        type: Schema.Types.ObjectId,
        ref: 'Vender'
    },
    stockinId:{
        type: Schema.Types.ObjectId,
        ref: 'Stockin'
    },
    qty:{
        type: Number,
    },
    price:{
        type: Number,
    },
    totalprice:{
        type: Number,
    },
    showpricetocustomer:{
        type: Boolean  
    }, 
    showpriceininvoice:{
        type: Boolean  
    },   
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model("Stockout",StockoutSchema);
