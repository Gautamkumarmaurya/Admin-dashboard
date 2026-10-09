import app from "./app.js";
import env from "./config/env.js";
import { connectDB } from "./config/db.js";

// Start server
async function start() {
  try {
    await connectDB();

    global.mongooseConnected = true;

    app.listen(
      env.port,
      "0.0.0.0",
      () =>
        console.log(
          `API listening on port ${env.port}`
        )
    );
  } catch (error) {
    console.error("Server startup aborted.");

    process.exit(1);
  }
}

start();