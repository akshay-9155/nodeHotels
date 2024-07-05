const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "manager"],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

personSchema.pre('save', async function(next) {
    try {
        const person = this;
        if (!person.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);     // salt generation
        const hashedPassword = await bcrypt.hash(person.password, salt);        // hashedPassword generation
        person.password = hashedPassword;       // Overriding plain password with hashed password
        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const person = this;
        return bcrypt.compare(candidatePassword, person.password);
    } catch (error) {
        throw error;
    }
}

const Person = mongoose.model('Person', personSchema);

module.exports = Person;