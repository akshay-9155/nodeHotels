const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person')
passport.use(new LocalStrategy(async (username, password, done) => {    // 'done' here is a callback function that takes 3 parameters (error, user, info). If auth is successfull we call done(null, user) and if the auth fails we call done(null, false, {message: "some message"}) where false represents that the auth has failed and message is optional which provides some additional info about the reason of auth failure.

    // authentication logic is written here
    try {
        // console.log("Received Credentials: ",username,password);
        const user = await Person.findOne({ username: username });
        if (!user) done(null, false, { message: "Incorrect Username" })
        else {
            if (await user.comparePassword(password)) done(null, user)
            else done(null, false, { message: "Wrong Password" });
        }
    } catch (error) {
        return done(error);
    }
}))

module.exports = {passport}