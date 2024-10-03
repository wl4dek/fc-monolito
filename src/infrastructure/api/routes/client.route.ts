import express, { Request, Response } from "express";
import Address from "../../../modules/@shared/domain/value-object/address";
import ClientRepository from "../../../modules/client-adm/repository/client.repository";
import AddClientUseCase from "../../../modules/client-adm/usecase/add-client/add-client.usecase";

export const clientRoute = express.Router();
const clientRepository = new ClientRepository();

clientRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new AddClientUseCase(clientRepository);
  try {
    const clientDto = {
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      address: new Address(
        req.body.address.street,
        req.body.address.number,
        req.body.address.complement,
        req.body.address.city,
        req.body.address.state,
        req.body.address.zipCode,
      ),
    };
    await usecase.execute(clientDto);
    res.status(201).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

