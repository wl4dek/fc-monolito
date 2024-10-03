import { app, sequelize } from "../express";
import request from "supertest";
import {
  InvoiceModel,
  ItemInvoiceModel,
} from "../../../modules/invoice/repository/invoice.model";

describe("E2E test for invoice", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should not found a invoice if not exist", async () => {
    const response = await request(app).get("/invoice").send({
      id: "1",
    });
    expect(response.status).toBe(404);
  });

  it("should find a invoice by id", async () => {
    const items = [
      {
        id: "1",
        name: "Produto name",
        price: 35,
      },
    ];

    const invoice = {
      id: "1",
      name: "Compra de produto",
      document: "0000001",
      street: "Rua teste",
      number: "100",
      city: "Rio de Janeiro",
      complement: "",
      zipcode: "28890-000",
      state: "RJ",
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        createdAt: new Date(),
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await InvoiceModel.create(invoice, {
      include: ItemInvoiceModel,
    });

    const response = await request(app)
      .get(`/invoice/${invoice.id}`)
      .set("Accept", "application/json")
      .send();

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(invoice.id);
    expect(response.body.name).toBe(invoice.name);
    expect(response.body.document).toBe(invoice.document);
    expect(response.body.address).toEqual({
      city: invoice.city,
      complement: invoice.complement,
      number: invoice.number,
      state: invoice.state,
      street: invoice.street,
      zipCode: invoice.zipcode,
    });
    expect(response.body.items.length).toBe(1);
  });
});
