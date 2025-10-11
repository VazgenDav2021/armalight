import { createServer } from "http";
import app from "./app.js";
import { connectMongo } from "./config/mongoose.js";
import { env } from "./config/env.js";

await connectMongo(env.MONGODB_URI);

const server = createServer(app);
server.listen(env.PORT, () => {
  console.log(`http://localhost:${env.PORT}`);
});
