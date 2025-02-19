import { Citas } from "~/db/models"
import ControllerBuilder from "../utils/builders/controllerBuilder"
import { z } from "zod"

const querySchema = z.object({ idCliente: z.string() })

export default defineEventHandler(async (event) => {
    const controller = new ControllerBuilder()
    const querys = await getValidatedQuery(event, (querys) =>
        querySchema.safeParse(querys)
    )

    const response = await controller.setModel(Citas).setWhereFilters({ idCliente: querys.data?.idCliente, estatus: { [controller.Op.or]: ["sala_espera", "por_llegar"] } }).getModelResult().getAll().then(res => res.toRawArray()).catch(err => console.log(err))

    return response
})