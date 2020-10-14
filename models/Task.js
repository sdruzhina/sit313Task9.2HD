const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema(
    {
        requesterId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['CHOICE', 'DECISION', 'SENTENCE', 'IMAGE'],
            default: 'CHOICE'
        },
        setup: {
            type: Object,
            of: String,
            required: true
        },
        master: {
            type: Boolean
        },
        numberWorkers: {
            type: Number,
            default: 1
        },
        reward: {
            type: Number
        },
        expiry: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['AVAILABLE', 'ACCEPTED', 'COMPLETED'],
            default: 'AVAILABLE'
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
)

module.exports  =  mongoose.model("Task", taskSchema)
