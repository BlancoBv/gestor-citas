import bcrypt from "bcrypt";

export default async function (passwordDB: string, password: string) {
  return await bcrypt.compare(password, passwordDB);
}
