import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import { InvoiceModel, ItemInvoiceModel } from "./invoice.model";
import { Invoice, InvoiceItems } from "../domain/invoice.entity";
import InvoiceRepository from "./invoice.repository";

describe("Invoice Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date("2022-03-01T14:30:00.000Z"));
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
    jest.useRealTimers();
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

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: "1" },
      include: ItemInvoiceModel,
    });

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
    expect(invoiceDb.items.length).toEqual(1);
  });

  it("should find a invoice", async () => {
    const invoice = await InvoiceModel.create(
      {
        id: "1",
        name: "Lucian",
        document: "1234-5678",
        street: "Rua 123",
        number: "99",
        complement: "Casa Verde",
        city: "Criciúma",
        state: "SC",
        zipcode: "88888-888",
        items: [
          {
            id: "1",
            name: "product teste",
            price: 35,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: ItemInvoiceModel,
      },
    );

    const repository = new InvoiceRepository();
    const result = await repository.find(invoice.id);
    const item = new InvoiceItems({
      id: new Id("1"),
      name: "product teste",
      price: 35,
    });
    expect(result.id.id).toEqual(invoice.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.items.length).toEqual(1);
    expect(result.items[0].id).toEqual(item.id);
    expect(result.items[0].name).toEqual(item.name);
    expect(result.items[0].price).toEqual(item.price);
    expect(result.address.street).toEqual(invoice.street);
    expect(result.address.number).toEqual(invoice.number);
    expect(result.address.complement).toEqual(invoice.complement);
    expect(result.address.city).toEqual(invoice.city);
    expect(result.address.state).toEqual(invoice.state);
    expect(result.address.zipCode).toEqual(invoice.zipcode);
    expect(result.createdAt).toStrictEqual(invoice.createdAt);
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt);
  });
});
