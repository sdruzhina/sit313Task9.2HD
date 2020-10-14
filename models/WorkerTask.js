const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workerTaskSchema = new mongoose.Schema(
    {
        worker: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        task: {
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['ACCEPTED', 'COMPLETED', 'DELETED'],
            default: 'ACCEPTED'
        },
        response: {
            type: Object,
            of: String
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

module.exports  =  mongoose.model("WorkerTask", workerTaskSchema)
