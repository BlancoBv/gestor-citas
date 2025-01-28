import { ControllerBuilder } from "~/builders/controllerBuilder";
import { Citas } from "~/db/models";

export default defineEventHandler(async () => {
  const controller = new ControllerBuilder();
  const response = await controller.setModel(Citas).getModelResult().getAll();
  return response.toRawArray();
});
