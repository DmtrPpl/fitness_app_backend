// UserModel.js

const db = require('../db/db');
const bcrypt = require('bcrypt'); // Import bcrypt for password comparison
const mongoose = require('mongoose');


const { Schema } = mongoose; // Destructuring assignment

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    goal: {
        type: String,
    },
    activity: {
        type: String,
    },
}, { timestamps: true });  // timestamps: true adds createdAt and updatedAt fields to the schema


UserSchema.pre('save', async function () {// Hash the password before saving the user model
    var user = this;
    if (!user.isModified('password')) { 
        return 
    }
    try {
        const salt = await bcrypt.genSaltSync(10); // Generate a salt
        const hash = await bcrypt.hashSync(user.password, salt); // Hash the password with the salt

        user.password = hash; // Replace the plain text password with the hash
    }
    catch (err) {
        console.log(err);
    }
});


UserSchema.methods.comparePassword = async function (password) {// Compare the plain text password with the hash stored in the database
    try {
        console.log("password", this.password)

        const IsValid = await bcrypt.compareSync(password, this.password); // Compare the plain text password with the hash
        return IsValid;
    }
    catch (err) {
        console.log(err);
    }
};

const UserModel = db.model('User', UserSchema);
module.exports = UserModel; // Export the model