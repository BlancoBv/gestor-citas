import ControllerBuilder from "../utils/builders/controllerBuilder";
import { Usuarios } from "~/db/models";
import z from "zod";
import { noEmptyOrBlankSpaces } from "../utils/zodValidations";

const userSchema = z.object({
  nombre: z
    .string()
    .refine(
      noEmptyOrBlankSpaces.callback,
      noEmptyOrBlankSpaces.message("nombre")
    ),
  apellidos: z
    .string()
    .refine(
      noEmptyOrBlankSpaces.callback,
      noEmptyOrBlankSpaces.message("apellido")
    ),
  usuario: z
    .string()
    .refine(
      noEmptyOrBlankSpaces.callback,
      noEmptyOrBlankSpaces.message("usuario")
    ),
  password: z
    .string()
    .refine(
      noEmptyOrBlankSpaces.callback,
      noEmptyOrBlankSpaces.message("contraseña")
    ),
  idRol: z.number().nonnegative(),
});

export default defineEventHandler(async (event) => {
  const controller = new ControllerBuilder();

  console.log(event);

  const body = await readValidatedBody(event, (body) =>
    userSchema.safeParse(body)
  );

  console.log(body);

  if (!body.success) {
    setResponseStatus(event, 400);
    return body.error.issues;
  }

  await controller
    .setModel(Usuarios)
    .setBody(body.data)
    .getModelResult()
    .create();

  return { msg: "Usuario añadido correctamente" };
});
