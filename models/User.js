const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required']
        },
        email: {
            type: String,
            trim: true,
            required: [true, 'Email is required'],
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)){
                    throw new Error('Email is not valid!');
                }
            }
        },
        isRequester: {
            type: Boolean,
            required: true,
            default: true
        },
        isWorker: {
            type: Boolean,
            required: true,
            default: false
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now()
        },
        resetToken: {
            type: String,
            required: false
        }
    }
)

// Add the Passport local plugin
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports  =  mongoose.model("User", userSchema)
