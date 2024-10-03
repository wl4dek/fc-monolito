import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const product = {
      name: "Product test",
      description: "produto para teste",
      purchasePrice: 54.34,
      stock: 100
    }
    const response = await request(app)
      .post("/products")
      .send(product);

    expect(response.status).toBe(201);
    const productSaved = await ProductModel.findOne({ where: { name: product.name } })
    expect(productSaved.id).toBeDefined()
    expect(productSaved.name).toBe(product.name)
    expect(productSaved.description).toBe(product.description)
    expect(productSaved.purchasePrice).toBe(product.purchasePrice)
    expect(productSaved.stock).toBe(product.stock)
  });

});
