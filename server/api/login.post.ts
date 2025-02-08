import ControllerBuilder from "../utils/builders/controllerBuilder";
import { Usuarios } from "~/db/models";
import validatePassword from "../utils/validatePassword";

export default defineEventHandler(async (event) => {
  const body: { user: string; password: string } = await readBody(event);
  const controller = new ControllerBuilder();
  const foundUser = await controller
    .setModel(Usuarios)
    .setWhereFilters({ usuario: body.user })
    .setAttributes(["password", "id", "usuario"])
    .getModelResult()
    .getOne()
    .then((res) => res.toRawJSON())
    .catch(() => null);

  if (!foundUser) {
    setResponseStatus(event, 400);
    return { msg: "Usuario no encontrado" };
  }

  const validPassword = await validatePassword(
    foundUser.password,
    body.password
  );

  if (!validPassword) {
    setResponseStatus(event, 400);
    return { msg: "Contraseña invalida" };
  }

  if (validPassword) {
    const { id } = await lucia.createSession(String(foundUser.id), {});
    const { name, attributes, value } = lucia.createSessionCookie(id);
    setCookie(event, name, value, attributes);
    return { msg: "Usuario verificado" };
  }
});
