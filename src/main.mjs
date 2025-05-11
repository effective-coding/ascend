import createApp from "./app.mjs";

const server = createApp();

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`application running on http://localhost:${port}`);
});
