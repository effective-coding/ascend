import argon from "argon2";
import passport from "passport";
import passportLocal from "passport-local";

import User from "../../mongoose/schemas/user.schema.mjs";
import Account from "../../mongoose/schemas/account.schema.mjs";

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default new passportLocal.Strategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email }).select("password");

      if (!user) throw new Error("user: " + email + " not found");

      const account = await Account.findOne({ user: user._id });

      const verified = await argon.verify(account.credentials.hash, password);

      if (!verified) {
        throw new Error("invalid credentials");
      }

      done(null, user.id);
    } catch (error) {
      done(error, null);
    }
  }
);
