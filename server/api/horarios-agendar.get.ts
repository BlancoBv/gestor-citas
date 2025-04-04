import { Citas, Horarios } from "~/db/models";
import ControllerBuilder from "../utils/builders/controllerBuilder";

export default defineEventHandler(async (event) => {
  const querys: { year: string; mes: string } = getQuery(event);
  const controller = new ControllerBuilder();

  let horariosNoDisponibles: any[] = [];

  const fechaI = momentInstace(
    new Date(Number(querys.year), Number(querys.mes) - 1, 1)
  );
  const fechaF = momentInstace(
    new Date(Number(querys.year), Number(querys.mes), 1)
  );

  const citas = await controller
    .setModel(Citas)
    .setIncludedModels({
      model: Horarios,
      as: "horarioCita",
      attributes: ["horaInicio", "horaTermino"],
    })
    .setWhereFilters({
      fechaCita: { [controller.Op.gte]: fechaI, [controller.Op.lt]: fechaF },
    })
    .setAttributes(["idHorario"])
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
  const horarios = await controller
    .setModel(Horarios)
    .setAttributes(["idHorario", "horaTermino", "horaInicio"])
    .getModelResult()
    .getAll()
    .then((res) => res.toRawArray())
    .catch((err) => {
      throw createError({
        statusCode: 400,
        statusMessage: "Error al obtener horarios",
        fatal: true,
        data: err,
      });
    });

  if (citas.length === 0) {
    return horarios;
  }

  groupArray(citas, "idHorario")
    .values()
    .forEach((el) => {
      if (el.length === fechaI.daysInMonth()) {
        const {
          idHorario,
          horarioCita,
        }: {
          idHorario: string;
          horarioCita: { horaTermino: string; horaInicio: string };
        } = el[0];
        horariosNoDisponibles.push({
          idHorario,
          horaTermino: horarioCita.horaTermino,
          horaInicio: horarioCita.horaInicio,
        });
      }
    });

  const horariosDisponibles = lodashInstance().differenceBy(
    horarios,
    horariosNoDisponibles,
    "idHorario"
  );
  return horariosDisponibles;
});
