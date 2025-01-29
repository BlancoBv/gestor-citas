import { Lucia, TimeSpan } from "lucia";
import { Mysql2Adapter } from "@lucia-auth/adapter-mysql";
import mysql from "mysql2/promise";

const { HOST_DB, USER_DB, DATABASE, PASSWORD_DB, ...config } =
  useRuntimeConfig();

const pool = mysql.createPool({
  host: HOST_DB,
  user: USER_DB,
  database: DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  password: PASSWORD_DB,
});
const adapter = new Mysql2Adapter(pool, {
  user: "usuarios",
  session: "user_session",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: { secure: !import.meta.dev, sameSite: "strict" },
  },
  sessionExpiresIn: new TimeSpan(12, "h"),
  getUserAttributes: (attributes) => {
    const { nombre, idRol, apellidos } = attributes;
    return {
      nombre_completo: `${nombre} ${apellidos}`,
      idRol,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }

  interface DatabaseUserAttributes {
    idRol: number;
    nombre: string;
    apellidos: string;
  }
}
