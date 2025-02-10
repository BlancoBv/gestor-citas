import { Clientes, Horarios } from "~/db/models";
import ControllerBuilder from "../utils/builders/controllerBuilder";
export default defineEventHandler(async (event) => {
  const controller = new ControllerBuilder();

  const response = await controller
    .setModel(Clientes)
    .getModelResult()
    .getAll()
    .then((res) => res.toRawArray())
    .catch((err) => {
      throw createError({
        statusCode: 400,
        statusMessage: "Error al obtener citas",
        fatal: true,
        data: err,
      });
    });

  return response;
});
