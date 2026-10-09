import request from "supertest";
import app from "../../src/app.js";

// Health endpoint test
test("health endpoint", async () => {
  const r = await request(app).get(
    "/api/v1/health"
  );

  expect(r.status).toBe(200);
  expect(r.body.success).toBe(true);
});

// Register and login test
test("register and login", async () => {
  let r = await request(app)
    .post("/api/v1/auth/register")
    .send({
      name: "Jane",
      email: "jane@test.com",
      password: "secret123",
    });

  expect(r.status).toBe(201);

  r = await request(app)
    .post("/api/v1/auth/login")
    .send({
      email: "jane@test.com",
      password: "secret123",
    });

  expect(r.status).toBe(200);
  expect(r.body.data.token).toBeTruthy();
});