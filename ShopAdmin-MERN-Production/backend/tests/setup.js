import mongoose from "mongoose";
import {
  MongoMemoryServer,
} from "mongodb-memory-server";

import env from "../src/config/env.js";

let mongo;

// Start in-memory MongoDB before all tests
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();

  await mongoose.connect(
    mongo.getUri()
  );

  global.mongooseConnected = true;
});

// Clear database after each test
afterEach(async () => {
  for (
    const c of Object.values(
      mongoose.connection.collections
    )
  ) {
    await c.deleteMany({});
  }
});

// Disconnect and stop MongoDB after all tests
afterAll(async () => {
  await mongoose.disconnect();

  await mongo.stop();
});