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
  app.get("/api/auth/current-user", (req, res) => {
    res.send(req.user);
  });
};
