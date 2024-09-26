import Address from "../../../@shared/domain/value-object/address";
import { Invoice, InvoiceItems } from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./invoice.usercase";

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

describe("Find Invoice use case unit test", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: invoiceMock.id.id,
    };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(invoiceMock.name);
    expect(result.document).toEqual(invoiceMock.document);
    expect(result.address.street).toEqual(invoiceMock.address.street);
    expect(result.address.city).toEqual(invoiceMock.address.city);
    expect(result.address.complement).toEqual(invoiceMock.address.complement);
    expect(result.address.state).toEqual(invoiceMock.address.state);
    expect(result.address.number).toEqual(invoiceMock.address.number);
    expect(result.address.zipCode).toEqual(invoiceMock.address.zipCode);
  });
});
