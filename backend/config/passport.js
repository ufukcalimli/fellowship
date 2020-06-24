const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.serializeUser((user, done) => {
    console.log(`Serialize user: ${user}`)
    done(null, user.id)
});

passport.deserializeUser((userId, done) => {
    console.log(`Deserialize user: ${userId}`)
    User.findById(userId)
        .then((user) => done(null, user))
        .catch(err => done(err))
});

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => { // TODO: check the password
        console.log(`Strategy is called`)
        User.findOne({ email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect email address.' });
            }
            // if (!user.validPassword(password)) {
            //     return done(null, false, { message: 'Incorrect password.' });
            // }
            return done(null, user);
        });
    })
)