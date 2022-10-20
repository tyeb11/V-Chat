import { verify } from "../util/verify.js";
import { Chat } from "../model/chat.js";
import { User } from "../model/user.js";

export default (app) => {
  app.post("/api/chat", verify, async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.send("no user id");
      }
      if (req.user == userId) {
        return res.send("invalid");
      }
      let isChat = await Chat.find({
        groupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
        .populate("users", ["-password", "-email", "-id"])
        .populate("currentMessage");

      isChat = await User.populate(isChat, {
        path: "currentMessage.sender",
        select: "username _id",
      });

      if (isChat.length > 0) {
        res.send(isChat[0]);
      } else {
        let data = {
          users: [req.user, userId],
        };
        const chat = await new Chat(data);
        await chat.save();
        const getChat = await Chat.findById(chat._id).populate(
          "users",
          "-password"
        );
        console.log(getChat);
        return res.send(getChat);
      }
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/chat", verify, async (req, res) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user } } })
        .populate("users", ["-password", "-email", "-id"])
        .populate("admin", ["-password", "-email", "-id"])
        .populate("currentMessage")
        .sort({ updateAt: -1 })
        .then((result) => {
          return User.populate(result, {
            path: "currentMessage.sender",
            select: "username _id",
          });
        })
        .then((result) => res.send(result));
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/api/group-chat", verify, async (req, res) => {
    try {
      const { name, users } = req.body;
      if (!name || !users) {
        return res.send("invalid");
      }
      if (users.length < 2) {
        return res.send("not enought members");
      }
      users.push(req.user);
      const groupChat = await new Chat({
        name,
        users,
        groupChat: true,
        admin: req.user,
      });
      await groupChat.save();
      const getGroupChat = await Chat.findById(groupChat._id)
        .populate("users", ["-password", "-id", "-email"])
        .populate("admin", ["-password", "-id", "-email"]);
      res.send(getGroupChat);
    } catch (e) {
      console.log(e);
    }
  });
  app.patch("/api/group-chat/rename", verify, async (req, res) => {
    try {
      const { chatId, name } = req.body;
      const canUpdate = await Chat.findOne({ _id: chatId, admin: req.user });
      if (canUpdate) {
        let result = await Chat.findByIdAndUpdate(chatId, { name });

        await result.save();
        result = await Chat.findById(chatId)
          .populate("users", ["-password", "-id", "-email"])
          .populate("admin", ["-password", "-email", "-id"]);
        return res.send(result);
      } else {
        return res.send("you can not change name");
      }
    } catch (e) {
      console.log(e);
    }
  });
  app.delete("/api/group-chat/user", verify, async (req, res) => {
    try {
      const { chatId, user } = req.body;
      if (!user || !chatId) {
        return res.send("invalid");
      }
      const result = await Chat.findByIdAndUpdate(chatId, {
        $pull: { users: user },
      })
        .populate("users", ["-password", "-id", "-email"])
        .populate("admin", ["-password", "-id", "-email"]);

      await result.save();
      return res.send(result);
    } catch (e) {
      console.log(e);
    }
  });
  app.post("/api/group-chat/user", verify, async (req, res) => {
    try {
      const { chatId, user } = req.body;
      if (!user || !chatId) {
        return res.send("invalid");
      }
      const result = await Chat.findByIdAndUpdate(chatId, {
        $push: { users: user },
      })
        .populate("users", ["-password", "-id", "-email"])
        .populate("admin", ["-password", "-id", "-email"]);

      await result.save();
      return res.send(result);
    } catch (e) {
      console.log(e);
    }
  });
};
