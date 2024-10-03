import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import {
  InvoiceModel,
  ItemInvoiceModel,
} from "../../modules/invoice/repository/invoice.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { clientRoute } from "./routes/client.route";
import { invoiceRoute } from "./routes/invoice.route";
import { productRoute } from "./routes/product.route";

export const app: Express = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/clients", clientRoute);
app.use("/products", productRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelize.addModels([
    ClientModel,
    ProductModel,
    InvoiceModel,
    ItemInvoiceModel,
  ]);
  await sequelize.sync();
}
setupDb();
