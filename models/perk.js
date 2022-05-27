const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const perksSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
});

const Perk = mongoose.model("Perk", perksSchema);

module.exports = Perk;
