import { ControllerBuilder } from "~/builders/controllerBuilder";
import { Citas, Clientes, Horarios } from "~/db/models";

export default defineEventHandler(async (event) => {
  const controller = new ControllerBuilder();
  const response = await controller
    .setModel(Citas)
    .setIncludedModels([
      {
        model: Clientes,
        as: "clienteCita",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: Horarios,
        as: "horarioCita",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ])
    .setAttributes({ exclude: ["idHorario", "idCliente", "idServicio"] })
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
  console.log(event.context.user);

  return response;
});
