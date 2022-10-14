import mongoose from "mongoose";
import chalk from "chalk";

mongoose.connect(process.env.DB_URL, (err) => {
  if (err) {
    return console.log(chalk.red(`can not connect to database`));
  }
  console.log(chalk.green(`connected to database ...`));
});
