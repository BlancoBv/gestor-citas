import { Citas, Clientes, Horarios, Servicios } from "~/db/models"
import ControllerBuilder from "~/server/utils/builders/controllerBuilder"
interface response {
    citasTotales: number;
    frecuenciaHorarios: { [key: string]: number };
    frecuenciaServicios: { [key: string]: number };
    recaudacionServicios: { [key: string]: number };
    cliente: { nombreCompleto: string, numTelefono: string };
    recaudacionTotal: number
};

export default defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const frecuenciaHorarios: { [key: string]: number } = {};
    const frecuenciaServicios: { [key: string]: number } = {};
    const recaudacionServicios: { [key: string]: number } = {};
    let recaudacionTotal: number = 0;

    const controller = new ControllerBuilder();

    const citas = await controller.setModel(Citas).setWhereFilters({ idCliente: id as string, estatus: "sala_espera" })
        .setIncludedModels([{ model: Horarios, as: "horarioCita", attributes: ["horaInicio", "horaTermino"] },
        { model: Servicios, as: "servicioCita" }])
        .getModelResult().getAll().then(res => res.toRawArray<{ horarioCita: Horarios, servicioCita: Servicios }>()).catch(err => {
            throw createError({
                statusCode: 400,
                statusMessage: "Error al obtener citas",
                fatal: true,
                data: err,
            });
        });
    const cliente = await controller.setModel(Clientes).setWhereFilters({ idCliente: id as string }).setAttributes(["nombre", "apellidos", "nombreCompleto", "numTelefono"]).getModelResult().getOne().then(res => res.toRawJSON()).catch(err => {
        throw createError({
            statusCode: 400,
            statusMessage: "Error al obtener citas",
            fatal: true,
            data: err,
        });
    })

    citas.forEach(el => {
        const keyHorario = `${el.horarioCita.horaInicio} - ${el.horarioCita.horaTermino}`;
        const keyServicio = el.servicioCita.nombre;

        recaudacionTotal += Number(el.costo ?? 0); //realiza la sumatoria de todos los costos presentes
        //frecuencia de horarios
        if (frecuenciaHorarios[keyHorario]) {
            frecuenciaHorarios[keyHorario] += 1
        } else {
            frecuenciaHorarios[keyHorario] = 1
        }
        //para la frecuencia de servicios y recaudaciones
        if (frecuenciaServicios[keyServicio]) {
            frecuenciaServicios[keyServicio] += 1;
            recaudacionServicios[keyServicio] += Number(el.costo ?? 0);
        } else {
            frecuenciaServicios[keyServicio] = 1;
            recaudacionServicios[keyServicio] = Number(el.costo ?? 0)
        }
    });

    return {
        citasTotales: citas.length,
        frecuenciaHorarios, frecuenciaServicios,
        cliente: { nombreCompleto: cliente.nombreCompleto, numTelefono: cliente.numTelefono },
        recaudacionServicios,
        recaudacionTotal
    } satisfies response;
})