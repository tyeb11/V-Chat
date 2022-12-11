import chalk from "chalk";
import passport from "passport";
import passportCustom from "passport-custom";
import passportGoogle from "passport-google-oauth20";
import passportGithub from "passport-github2";
import { User } from "../model/user.js";

import bcrypt from "bcryptjs";
import { customVerify } from "./customVerify.js";

const CustomStrategy = passportCustom.Strategy;
const GoogleStartegy = passportGoogle.Strategy;
const GithubStrategy = passportGithub.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  const result = await User.findOne({ _id: user });

  if (result) return done(null, result._id);
  done(null, user);
});

passport.use(
  "custom",

  new CustomStrategy(async function (req, done) {
    try {
      customVerify(req, done);
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        if (await bcrypt.compare(password, existingUser.password)) {
          return done(null, existingUser._id);
        }

        return done("incorrect email or password");
      }
      const user = await new User(req.body);
      await user.save();
      done(null, user._id);
    } catch (e) {
      console.log(e);
    }
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
      try {
        const { displayName, id } = profile;
        const existingUser = await User.findOne({ id });
        if (existingUser) {
          return done(null, existingUser._id);
        }
        const user = await new User({
          id,
          username: displayName,
        });
        await user.save();
        done(null, user._id);
      } catch (e) {
        console.log(e);
      }
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
      try {
        const { id, username } = profile;

        const existingUser = await User.findOne({ id });
        if (existingUser) {
          return done(null, existingUser._id);
        }
        const user = await new User({
          id,
          username,
        });
        await user.save();
        done(null, user._id);
      } catch (e) {
        console.log(e);
      }
    }
  )
);
