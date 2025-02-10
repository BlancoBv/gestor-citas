import { Citas } from "~/db/models";
import ControllerBuilder from "../utils/builders/controllerBuilder";
import momentInstace from "../utils/momentInstace";
import { sequelize } from "~/db/db";
import moment from "moment";

function obtenerFechasDelMes(year: number, month: number): string[] {
  const fechas: string[] = [];
  const inicioMes = moment({ year, month: month - 1, day: 1 }); // Mes en Moment empieza en 0
  const finMes = inicioMes.clone().endOf("month");

  let fecha = inicioMes.clone();
  while (true) {
    fechas.push(fecha.format("YYYY-MM-DD")); // Formato de salida
    fecha.add(1, "day"); // Avanzamos un día

    if (fecha.isAfter(finMes)) break;
  }

  return fechas;
}

export default defineEventHandler(async (event) => {
  const { hooks } = useNitroApp();
  const body = await readBody(event);

  const controller = new ControllerBuilder();

  const citasLista = await controller
    .setModel(Citas)
    .setWhereFilters({
      [controller.Op.and]: [
        controller.Where(
          controller.Fn("YEAR", controller.Col("fechaCita")),
          body.year
        ),
        controller.Where(
          controller.Fn("MONTH", controller.Col("fechaCita")),
          body.mes
        ),
      ],
    })
    .setOrderFilters([["fechaCita", "ASC"]])
    .getModelResult()
    .getAll()
    .then((res) => res.toRawArray());
  /*   const fecha = momentInstace(citasLista[0].fechaCita);
  const fechaInicioMes = fecha.clone().startOf("month");
  const semanaMes = fecha.week() - fechaInicioMes.week(); */

  const fechas: { estatus: string; fechaCita: string; idHorario: number }[] =
    obtenerFechasDelMes(body.year, body.mes)
      .map((el) => {
        return body.horarios.map((idHorario: number) => ({
          estatus: "abierta",
          fechaCita: el,
          idHorario,
        }));
      })
      .flat();

  sequelize.transaction(async (t) => {
    await controller
      .setModel(Citas)
      .setTransaction(t)
      .getModelResult()
      .bulkCreate(fechas.map((el) => el));
  });

  //console.log(body, citasLista, semanaMes);

  hooks.callHook("sse:event", { msg: { time: new Date() }, event: "XD" });
  return { msg: "Citas añadidas correctamente" };
});
