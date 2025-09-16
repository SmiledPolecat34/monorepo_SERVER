import request from "supertest";
import app from "../server.js";

describe("Test basique API", () => {
  it("GET /api-docs doit répondre 200", async () => {
    const res = await request(app).get("/api-docs/");
    expect(res.statusCode).toBe(200);
  });
});
