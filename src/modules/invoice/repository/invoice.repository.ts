import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import { Invoice, InvoiceItems } from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel, ItemInvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(entity: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: entity.id.id,
        name: entity.name,
        document: entity.document,
        street: entity.address.street,
        number: entity.address.number,
        city: entity.address.city,
        complement: entity.address.complement,
        zipcode: entity.address.zipCode,
        state: entity.address.state,
        items: entity.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: ItemInvoiceModel,
      },
    );
  }

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: ItemInvoiceModel,
    });

    if (!invoice) {
      throw new Error("Client not found");
    }

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.street,
        invoice.number,
        invoice.complement,
        invoice.city,
        invoice.state,
        invoice.zipcode,
      ),
      items: invoice.items.map(
        (item) =>
          new InvoiceItems({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          }),
      ),
      createdAt: invoice.createdAt,
      updatedAt: invoice.createdAt,
    });
  }
}
