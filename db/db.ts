import { Sequelize } from "sequelize";

const { DATABASE, USER_DB, PASSWORD_DB, HOST_DB, PORT_DB } = useRuntimeConfig();

export const sequelize = new Sequelize(DATABASE, USER_DB, PASSWORD_DB, {
  host: HOST_DB,
  dialect: "mysql",
  port: PORT_DB,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: !import.meta.env.PROD,
  timezone: "-06:00",
});

/* sequelize
  .sync({ force: true }) // Solo usar en desarrollo para recrear las tablas
  .then(() => {
    console.log("Tablas sincronizadas");
  })
  .catch((err) => {
    console.error("Error sincronizando tablas:", err);
  });
 */
sequelize
  .authenticate()
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.log("Error", err));
