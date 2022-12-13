const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/api",
      "/api/auth/google",
      "/api/auth/custom",
      "/api/auth/github",
      "/api/chat",
      "/api/group-chat",
      "/api/message",
    ],
    createProxyMiddleware({
      target: "http://localhost:3001",
    })
  );
};
