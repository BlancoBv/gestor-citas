import { z } from "zod";
import { ControllerBuilder } from "~/builders/controllerBuilder";
import { Citas, Clientes, Horarios } from "~/db/models";

interface xd extends Citas {}
const querySchema = z.object({
  estatus: z.enum(["abierta", "por_llegar", "sala_espera"]).optional(),
});

export default defineEventHandler(async (event) => {
  const querys = await getValidatedQuery(event, (body) =>
    querySchema.safeParse(body)
  );

  if (!querys.success) {
    setResponseStatus(event, 400);
    return null;
  }

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
    .setWhereFilters({
      ...(querys.success &&
        querys.data.estatus && { estatus: querys.data.estatus }),
    })
    .setAttributes({ exclude: ["idHorario", "idCliente", "idServicio"] })
    .getModelResult()
    .getAll()
    .then((res) =>
      res.toRawArray<{ clienteCita: Clientes; horarioCita: Horarios }>()
    )
    .catch((err) => {
      console.log(err);
      throw createError({
        statusCode: 400,
        statusMessage: "Error al obtener citas",
        fatal: true,
        data: err,
      });
    });

  const data = {
    toJSON() {
      return { ...response };
    },
  };

  return response;
});
