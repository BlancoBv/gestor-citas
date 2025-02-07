//import { z } from "zod";
import { ControllerBuilder } from "~/builders/controllerBuilder";
import { Horarios } from "~/db/models";

/* const querySchema = z.object({
  estatus: z.enum(["abierta", "por_llegar", "sala_espera", "todas"]).optional(),
});
 */
export default defineEventHandler(async (event) => {
  /*   const querys = await getValidatedQuery(event, (body) =>
    querySchema.safeParse(body)
  );

  if (!querys.success) {
    setResponseStatus(event, 400);
    return null;
  } */

  const controller = new ControllerBuilder();
  const response = await controller
    .setModel(Horarios)
    .setAttributes({ exclude: ["createdAt", "updatedAt"] })
    .getModelResult()
    .getAll()
    .then((res) => res.toRawArray<{}>())
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
