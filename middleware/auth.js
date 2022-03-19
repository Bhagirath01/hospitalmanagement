var passport = require("passport");
var passportJWT = require("passport-jwt");
var Hospital = require("../models/hospital");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey: 'safsad4d5s8a4f8sd4f8gds4g8dfs48g',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt")
};

module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
    var hospital = Hospital.findById(payload.id, function(err, hospital) {
      if (err) {
        return done(new Error("hospitalNotFound"), null);
      } else if(payload.expire<=Date.now()) {
        return done(new Error("TokenExpired"), null);
      } else{
        return done(null, hospital);
      }
    });
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", false);
    }
  };
};