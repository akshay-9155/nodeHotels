const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ["spicy", "sweet", "sour", "salty"],
        required: true
    },
    isDrink: {
        type: Boolean,
        required: true
    },
    ingredients: {
        type: [String],
        default: []
    },
    numSales: {
        type: Number,
        default: 0
    }
},{timestamps: true})

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;