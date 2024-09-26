import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import { InvoiceModel, ItemInvoiceModel } from "./invoice.model";
import { Invoice, InvoiceItems } from "../domain/invoice.entity";
import InvoiceRepository from "./invoice.repository";

describe("Invoice Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, ItemInvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Lucian",
      document: "1234-5678",
      address: new Address(
        "Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888",
      ),
      items: [
        new InvoiceItems({
          name: "product teste",
          price: 35,
        }),
      ],
    });

    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({ where: { id: "1" } });

    expect(invoiceDb).toBeDefined();
    expect(invoiceDb.id).toEqual(invoice.id.id);
    expect(invoiceDb.name).toEqual(invoice.name);
    expect(invoiceDb.document).toEqual(invoice.document);
    expect(invoiceDb.street).toEqual(invoice.address.street);
    expect(invoiceDb.number).toEqual(invoice.address.number);
    expect(invoiceDb.complement).toEqual(invoice.address.complement);
    expect(invoiceDb.city).toEqual(invoice.address.city);
    expect(invoiceDb.state).toEqual(invoice.address.state);
    expect(invoiceDb.zipcode).toEqual(invoice.address.zipCode);
    expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt);
    expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt);
  });

  // it("should find a client", async () => {
  //   const client = await ClientModel.create({
  //     id: "1",
  //     name: "Lucian",
  //     email: "lucian@123.com",
  //     document: "1234-5678",
  //     street: "Rua 123",
  //     number: "99",
  //     complement: "Casa Verde",
  //     city: "Criciúma",
  //     state: "SC",
  //     zipcode: "88888-888",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });
  //
  //   const repository = new ClientRepository();
  //   const result = await repository.find(client.id);
  //
  //   expect(result.id.id).toEqual(client.id);
  //   expect(result.name).toEqual(client.name);
  //   expect(result.email).toEqual(client.email);
  //   expect(result.address.street).toEqual(client.street);
  //   expect(result.address.number).toEqual(client.number);
  //   expect(result.address.complement).toEqual(client.complement);
  //   expect(result.address.city).toEqual(client.city);
  //   expect(result.address.state).toEqual(client.state);
  //   expect(result.address.zipCode).toEqual(client.zipcode);
  //   expect(result.createdAt).toStrictEqual(client.createdAt);
  //   expect(result.updatedAt).toStrictEqual(client.updatedAt);
  // });
});
