export const customVerify = (req, done) => {
  const { username, email, password } = req.body;
  if (!username) {
    return done("please provide username");
  }
  if (!email) {
    return done("please provide email");
  }
  if (!password) {
    return done("please provide password");
  }
};
