import passport from "passport";
import { User } from "../model/user.js";
import { customVerify } from "../util/customVerify.js";
import { verify } from "../util/verify.js";

export default (app) => {
  app.post(
    "/api/auth/custom",

    passport.authenticate("custom", {
      failureRedirect: "/",
    }),
    (req, res) => {
      res.send(req.user);
    }
  );
  app.get(
    "/api/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      failureRedirect: "/",
    })
  );
  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/chat");
    }
  );

  app.get(
    "/api/auth/github",
    passport.authenticate("github", {
      failureRedirect: "/",
    })
  );
  app.get(
    "/api/auth/github/callback",
    passport.authenticate("github"),
    (req, res) => {
      res.redirect("/api/auth/current-user");
    }
  );
  app.get("/api/auth/logout", verify, async (req, res) => {
    const user = await User.findByIdAndDelete(req.user);

    await req.logout();
    req.session = null;
    res.clearCookie("session.sig");
    res.clearCookie("session");
    res.redirect("/");
  });
  app.get("/api/auth/current-user", verify, (req, res) => {
    res.send(req.user);
  });
  app.get("/chat", verify, (req, res) => {
    res.send(req.user);
  });
};
