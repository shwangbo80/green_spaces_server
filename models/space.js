const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const spaceSchema = new Schema(
    {
        city: {
            type: String,
            required: true,
            unique: true,
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
        description: {
            type: String,
            required: true,
        },
        comments: [commentSchema],
    },
    {
        timestamps: true,
    }
);

const Space = mongoose.model("Space", spaceSchema);

module.exports = Space;
