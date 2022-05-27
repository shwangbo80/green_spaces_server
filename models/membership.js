const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const membershipSchema = new Schema({
    name: {
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
    featured: {
        type: Boolean,
        required: true,
        default: false,
    },
    price: {
        type: String,
        required: true,
    },
});

const Membership = mongoose.model("Membership", membershipSchema);

module.exports = Membership;
