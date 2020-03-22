const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;
const User= require('./database').users;

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password != password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(username, done) {
    User.findOne({
        where: {
          username: username
        }
    }).then((user)=>{
        if(!user){
          return done(new Error('No such user'));
        }
        return done(null,user)
    }).catch((err)=>{
      return done(err);
    })
  });