import { z } from "zod";
import ControllerBuilder from "../utils/builders/controllerBuilder";
import { Citas } from "~/db/models";

const citaSchema = z.object({
  idServicio: z.number().nonnegative().min(1),
  cliente: z.union([z.number(), z.string()]).nullable(),
});

export default defineEventHandler(async (event) => {
  const { hooks } = useNitroApp();
  const querys = getQuery(event);
  const controller = new ControllerBuilder();
  const body = await readValidatedBody(event, (body) =>
    citaSchema.safeParse(body)
  );

  if (!body.success) {
    setResponseStatus(event, 400);
    return { msg: "Error al agendar cita" };
  }

  await controller
    .setModel(Citas)
    .setWhereFilters({ idCita: querys.idCita as string })
    .setBody({
      estatus: "por_llegar",
      nombreCliente: body.data.cliente,
      idServicio: body.data.idServicio,
    } as any)
    .getModelResult()
    .update()
    .then(() => {
      return { msg: "correctamtne" };
    })
    .catch((err) => {
      console.log(err);
      return { msg: "errror al eso" };
    });

  hooks.callHook("sse:event", {
    msg: { time: new Date() },
    event: "citaActualizada",
  });
  return { msg: "Cita agendada correctamente" };
});
