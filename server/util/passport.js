import chalk from "chalk";
import passport from "passport";
import passportCustom from "passport-custom";
import { User } from "../model/user.js";

const CustomStrategy = passportCustom.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  const { _id } = await User.findById(user);

  done(null, _id);
});

passport.use(
  "custom",
  new CustomStrategy(async function (req, done) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return done(null, existingUser._id);
    }
    const user = await new User(req.body);
    await user.save();
    done(null, user._id);
  })
);
