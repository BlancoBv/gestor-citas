import { z } from "zod";
import ControllerBuilder from "../utils/builders/controllerBuilder";
import { Citas, Horarios } from "~/db/models";

const querySchema = z.object({
  fecha: z.string().date(),
});

export default defineEventHandler(async (event) => {
  const { hooks } = useNitroApp();

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
    .setWhereFilters({
      ...(querys.success && {
        fechaCita: querys.data.fecha,
      }),
    })
    .setIncludedModels([
      {
        model: Horarios,
        as: "horarioCita",
        attributes: ["horaInicio", "horaTermino"],
      },
    ])
    .setAttributes({
      exclude: [
        "idHorario",
        "idCliente",
        "idServicio",
        "createdAt",
        "updatedAt",
        "nombreCliente",
      ],
    })
    .getModelResult()
    .getAll()
    .then((res) => res.toRawArray<{ horarioCita: Horarios }>())
    .catch((err) => {
      console.log(err);
      throw createError({
        statusCode: 400,
        statusMessage: "Error al obtener citas",
        fatal: true,
        data: err,
      });
    });

  return response;
});
