import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./invoice.usercase.dto";

export default class FindInvoiceUseCase {
  constructor(private repository: InvoiceGateway) {}

  async execute(
    input: FindInvoiceUseCaseInputDTO,
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.repository.find(input.id);
    const output = {
      id: invoice.id.id,
      document: invoice.document,
      name: invoice.name,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.items.reduce((acc, item) => acc + item.price, 0),
      createdAt: invoice.createdAt,
    };

    return output;
  }
}
