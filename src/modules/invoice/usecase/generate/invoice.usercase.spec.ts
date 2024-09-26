import Address from "../../../@shared/domain/value-object/address";
import { Invoice, InvoiceItems } from "../../domain/invoice.entity";
import GenerateInvoiceUseCase from "./invoice.usercase";

const address = new Address(
  "Rua teste",
  "5",
  "Casa 2",
  "Rio de Janeiro",
  "RJ",
  "28800-000",
);
const items = [new InvoiceItems({ name: "Produto 1", price: 35.0 })];
const invoiceMock = new Invoice({
  name: "Compra para casa",
  document: "123-312-32",
  address,
  items,
});

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoiceMock)),
  };
};

describe("Generate Invoice use case unit test", () => {
  it("should create a invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);
    const input = {
      name: "Compra para casa",
      document: "123-312-32",
      address: {
        street: "Rua teste",
        number: "5",
        complement: "Casa 2",
        city: "Rio de Janeiro",
        state: "RJ",
        zipCode: "28800-000",
      },
      items: [{ name: "Produto 1", price: 35.0 }],
    };
    const result = await usecase.execute(input);

    expect(repository.generate).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});
