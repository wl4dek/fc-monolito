import express, { Request, Response } from "express";
import AddProductUseCase from "../../../modules/product-adm/usecase/add-product/add-product.usecase";
import ProductRepository from "../../../modules/product-adm/repository/product.repository";

export const productRoute = express.Router();
const productRepository = new ProductRepository();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new AddProductUseCase(productRepository);

  try {
    const productDTO = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };
    await usecase.execute(productDTO);
    res.status(201).send();
  } catch (err) {
    res.status(500).send(err);
  }
});
