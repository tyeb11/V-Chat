import passport from "passport";

export default (app) => {
  app.post(
    "/api/auth/custom",
    passport.authenticate("custom", { failureRedirect: "/" }),
    (req, res) => {
      res.send(req.user);
      //res.redirect("/chat");
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
      res.redirect("/api/auth/current-user");
    }
  );

  app.get(
    "/api/auth/github",
    passport.authenticate("github", { failureRedirect: "/" })
  );
  app.get(
    "/api/auth/github/callback",
    passport.authenticate("github"),
    (req, res) => {
      res.redirect("/api/auth/current-user");
    }
  );

  app.get("/api/auth/current-user", (req, res) => {
    res.send(req.user);
  });
};
