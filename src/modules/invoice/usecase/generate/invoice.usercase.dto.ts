export type InputGenerateInvoiceDTO = {
  name: string;
  document: string;
  address: AddressDTO;
  items: InputInvoiceItemsDTO[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type AddressDTO = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};

export type InputInvoiceItemsDTO = {
  name: string;
  price: number;
};
