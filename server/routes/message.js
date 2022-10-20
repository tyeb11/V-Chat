import { Chat } from "../model/chat.js";
import { Message } from "../model/message.js";
import { User } from "../model/user.js";
import { verify } from "../util/verify.js";

export default (app) => {
  app.post("/api/message", verify, async (req, res) => {
    const { message, chatId } = req.body;
    if (!chatId || !message) {
      return res.send("invalid");
    }
    let data = {
      sender: req.user,
      message,
      chatId,
    };
    let newMessage = await new Message(data);
    await newMessage.save();
    newMessage = await newMessage.populate("sender", [
      "-password",
      "-email",
      "-id",
    ]);
    newMessage = await newMessage.populate("chatId");
    newMessage = await User.populate(newMessage, {
      path: "chatId.users",
      select: "username _id",
    });
    await Chat.findByIdAndUpdate(chatId, { currentMessage: newMessage._id });
    return res.send(newMessage);
  });
  app.get("/api/message", verify, async (req, res) => {
    const { chatId } = req.body;
    if (!chatId) {
      res.send("invalid");
    }

    const message = await Message.find({ chatId })
      .populate("chatId")
      .populate("sender", ["-email", "-password", "-id"]);

    res.send(message);
  });
};
