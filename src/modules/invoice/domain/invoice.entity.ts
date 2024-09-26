import { string } from "yup";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItems[];
  createdAt?: Date;
  updatedAt?: Date;
};

type InvoiceItemsProps = {
  id?: Id;
  name: string;
  price: number;
};

export class InvoiceItems extends BaseEntity {
  private _name: string;
  private _price: number;

  constructor(props: InvoiceItemsProps) {
    super(props.id);
    this._name = props.name;
    this._price = props.price;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}

export class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: InvoiceItems[];

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._address = props.address;
    this._document = props.document;
    this._items = props.items;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get document(): string {
    return this._document;
  }

  get items(): InvoiceItems[] {
    return this._items;
  }
}
