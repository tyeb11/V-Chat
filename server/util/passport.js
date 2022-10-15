import chalk from "chalk";
import passport from "passport";
import passportCustom from "passport-custom";
import passportGoogle from "passport-google-oauth20";
import passportGithub from "passport-github2";
import { User } from "../model/user.js";
import mongoose from "mongoose";

const CustomStrategy = passportCustom.Strategy;
const GoogleStartegy = passportGoogle.Strategy;
const GithubStrategy = passportGithub.Strategy;

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

passport.use(
  new GoogleStartegy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      const { email, name, sub } = profile._json;
      const existingUser = await User.findOne({ id: sub });
      if (existingUser) {
        return done(null, existingUser._id);
      }
      const user = await new User({
        id: sub,
        username: name,
        email: email,
        password: sub,
      });
      await user.save();
      done(null, user._id);
    }
  )
);
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      const { id, username } = profile;
      const existingUser = await User.findOne({ id });
      if (existingUser) {
        return done(null, existingUser._id);
      }
      const user = await new User({
        id,
        username,
        email: `${username}@github.com`,
        password: id,
      });
      await user.save();
      done(null, user._id);
    }
  )
);
