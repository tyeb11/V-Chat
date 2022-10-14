import express from "express";
import chalk from "chalk";

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(chalk.green(`server listening on port ${process.env.PORT} ...`));
});
