export const verify = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.send("please verify yourself");
};
