import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const client = {
      name: "client name",
      email: "email@client.test.com",
      document: "000.000.000-23",
      address: {
        street: "Rua de Teste",
        number: "45",
        complement: "",
        city: "Rio de Janeiro",
        state: "RJ",
        zipCode: "28890-345",
      }
    }
    const response = await request(app)
      .post("/clients")
      .send(client);
    expect(response.status).toBe(201);
  });
});
