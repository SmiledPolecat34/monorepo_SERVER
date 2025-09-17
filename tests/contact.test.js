import request from "supertest";
import app from "../server.js";
import mongoose from "mongoose";
import User from "../src/models/User.js";
import Contact from "../src/models/Contact.js";

describe("Tests des routes de contacts", () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Create a user and get a token
    const user = {
      email: "contact-test@example.com",
      password: "password123",
    };
    await request(app).post("/api/auth/register").send(user);
    const res = await request(app).post("/api/auth/login").send(user);
    token = res.body.token;
    const userDoc = await User.findOne({ email: user.email });
    userId = userDoc._id;
  });

  afterAll(async () => {
    // Clean up the database
    await User.deleteMany({ email: /@example.com/ });
    await Contact.deleteMany({ user: userId });
    await mongoose.connection.close();
  });

  it("devrait créer un contact", async () => {
    const res = await request(app)
      .post("/api/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "John",
        lastName: "Doe",
        phone: "1234567890",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("firstName", "John");
  });

  it("devrait récupérer les contacts", async () => {
    const res = await request(app)
      .get("/api/contacts")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("devrait mettre à jour un contact", async () => {
    const contact = await Contact.findOne({ firstName: "John" });
    const res = await request(app)
      .patch(`/api/contacts/${contact._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Jane",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("firstName", "Jane");
  });

  it("devrait supprimer un contact", async () => {
    const contact = await Contact.findOne({ firstName: "Jane" });
    const res = await request(app)
      .delete(`/api/contacts/${contact._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("msg", "Contact removed");
  });
});
