import argon from "argon2";
import passport from "passport";
import passportLocal from "passport-local";

import User from "../../mongoose/schemas/user.schema.mjs";

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default new passportLocal.Strategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username }).select("password");

    if (!user) throw new Error("user: " + username + " not found");

    const verified = await argon.verify(user.password, password);

    if (!verified) {
      throw new Error("invalid credentials");
    }

    done(null, user.id);
  } catch (error) {
    done(error, null);
  }
});
