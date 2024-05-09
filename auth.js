// authentication
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');


passport.use(new LocalStrategy(async (username, password, done) => {
    // authentication logic here
    try {
        // console.log('Received credentials:', username, password);
        const user = await Person.findOne({ username: username});
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        const isPassportMatch = user.comparePassword(password);
        if (isPassportMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Incorrect password." });
        }
    } catch (error) {
        return done(error);
    }
}))

module.exports = passport;
