const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://apiko-2021-spring-course-api.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
