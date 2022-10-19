import { verify } from "../util/verify.js";
import { User } from "../model/user.js";
import bcrypt from "bcryptjs";

export default (app) => {
  app.get("/api/", verify, async (req, res) => {
    try {
      const search = req.query.search;
      const user = await User.find({ username: search })
        .find({
          _id: { $ne: req.user },
        })
        .select(["_id", "username"]);

      res.send(user);
    } catch (e) {
      console.log(e);
    }
  });
  app.patch("/api/user", verify, async (req, res) => {
    const updates = Object.keys(req.body);

    const updates_allowed = ["avatar", "username", "setStatus", "password"];
    const validUpdates = updates.every((update) =>
      updates_allowed.includes(update)
    );
    if (!validUpdates) {
      return res.send("update not allowed");
    }
    const update_obj = {};
    updates.forEach((update) => {
      update_obj[update] = req.body[update];
    });

    if (update_obj["password"]) {
      update_obj.password = await bcrypt.hash(update_obj["password"], 8);
    }
    const user = await User.updateOne({ _id: req.user }, update_obj);

    res.send();
  });
};
