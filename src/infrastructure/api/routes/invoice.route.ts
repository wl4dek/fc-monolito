import express, { Request, Response } from "express";
import InvoiceRepository from "../../../modules/invoice/repository/invoice.repository";
import FindInvoiceUseCase from "../../../modules/invoice/usecase/find/invoice.usercase";

export const invoiceRoute = express.Router();
const productRepository = new InvoiceRepository();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindInvoiceUseCase(productRepository);
  try {
    const result = await usecase.execute({ id: req.params.id });
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
