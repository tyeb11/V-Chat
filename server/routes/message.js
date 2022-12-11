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
      return res.send("invalid");
    }

    const message = await Message.find({ chatId })
      .populate("chatId")
      .populate("sender", ["-email", "-password", "-id"]);
    console.log(message);
    res.send(message);
  });
  app.patch("/api/message", verify, async (req, res) => {
    const { messageId, newMessage } = req.body;

    if (!messageId) {
      return res.send("no messageid");
    }
    if (!newMessage) {
      return res.send("no new Message");
    }
    const message = await Message.findById(messageId)
      .populate("chatId")
      .populate("sender", ["-email", "-password"]);
    console.log(String(message.sender._id) === String(req.user));
    console.log(req.user);
    if (String(message.sender._id) === String(req.user)) {
      const messageUpdate = await Message.updateOne(
        { _id: messageId },
        { message: newMessage }
      );
      return res.send(messageUpdate);
    }
    return res.send("you dont have excess to edit message");
  });
};
