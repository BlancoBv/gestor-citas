import { Servicios } from "~/db/models"
import ControllerBuilder from "../utils/builders/controllerBuilder"

export default defineEventHandler(async (event) => {
    const controller = new ControllerBuilder();
    const response = await controller.setModel(Servicios).getModelResult().getAll().then(res => res.toRawArray()).catch(() => {
        setResponseStatus(event, 400)
    });

    return response;
})