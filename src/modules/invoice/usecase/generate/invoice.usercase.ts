import Address from "../../../@shared/domain/value-object/address";
import { Invoice, InvoiceItems } from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { InputGenerateInvoiceDTO } from "./invoice.usercase.dto";

export default class GenerateInvoiceUseCase {
  constructor(private repository: InvoiceGateway) {}

  async execute(input: InputGenerateInvoiceDTO): Promise<void> {
    const iAddress = input.address;
    const address = new Address(
      iAddress.street,
      iAddress.number,
      iAddress.complement,
      iAddress.city,
      iAddress.state,
      iAddress.zipCode,
    );
    const items = input.items.map((item) => new InvoiceItems({ ...item }));
    const invoice = new Invoice({
      ...input,
      address,
      items,
    });
    this.repository.generate(invoice);
  }
}
