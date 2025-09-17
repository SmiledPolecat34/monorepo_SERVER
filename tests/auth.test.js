import request from "supertest";
import app from "../server.js";
import mongoose from "mongoose";
import User from "../src/models/User.js";

describe("Test basique API", () => {
  beforeAll(async () => {
    await User.deleteMany({ email: /@example.com/ });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("GET /api-docs doit répondre 200", async () => {
    const res = await request(app).get("/api-docs/");
    expect(res.statusCode).toBe(200);
  });

  it("GET /api/profile sans auth doit répondre 401", async () => {
    const res = await request(app).get("/api/profile");
    expect(res.statusCode).toBe(401);
  });

  it("POST /api/auth/register doit créer un utilisateur", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("userId");
  });

  it("POST /api/auth/register avec un utilisateur existant doit répondre 400", async () => {
    await request(app).post("/api/auth/register").send({
      email: "test2@example.com",
      password: "password123",
    });
    const res = await request(app).post("/api/auth/register").send({
      email: "test2@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(400);
  });

  it("POST /api/auth/login doit connecter un utilisateur", async () => {
    const user = {
      email: "login@example.com",
      password: "password123",
    };
    await request(app).post("/api/auth/register").send(user);
    const res = await request(app).post("/api/auth/login").send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("POST /api/auth/login avec un mot de passe incorrect doit répondre 400", async () => {
    const user = {
      email: "wrong-password@example.com",
      password: "password123",
    };
    await request(app).post("/api/auth/register").send(user);
    const res = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: "wrongpassword",
    });
    expect(res.statusCode).toBe(400);
  });

  it("GET /api/profile avec auth doit répondre 200", async () => {
    const user = {
      email: "profile@example.com",
      password: "password123",
    };
    await request(app).post("/api/auth/register").send(user);
    const loginRes = await request(app).post("/api/auth/login").send(user);
    const token = loginRes.body.token;
    const res = await request(app)
      .get("/api/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", user.email);
  });
});
