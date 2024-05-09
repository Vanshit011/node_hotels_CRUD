const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'],
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
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

personSchema.pre('save', async function (next) {
    const person = this;

    if (!person.isModified('password')) {
        return next();
    } else {
        try {
            //hash password generation
            const salt = await bcrypt.genSalt(10);

            //hash password
            const hashedPassword = await bcrypt.hash(person.password, salt);

            //assign hashed password to password field
            person.password = hashedPassword;
            next();
        } catch (error) {
            return next(error)
        }
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        return error;
    }
}

// create person module
const Person = mongoose.model('Person', personSchema);
module.exports = Person;