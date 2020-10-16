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
        setup: {
            type: Object,
            of: String,
            required: true
        },
        response: {
            type: Object,
            of: String
        },
        status: {
            type: String,
            required: true,
            enum: ['NEW', 'PROCESSING', 'COMPLETED', 'FAILED'],
            default: 'NEW'
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
)

module.exports  =  mongoose.model("Task", taskSchema)
