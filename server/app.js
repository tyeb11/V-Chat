import express from "express";
import chalk from "chalk";
import cookieSession from "cookie-session";
import passport from "passport";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";

import "./util/dbconnect.js";
import "./util/passport.js";

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
userRoutes(app);
chatRoutes(app);
messageRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(chalk.green(`server listening on port ${process.env.PORT} ...`));
});
