import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import Citas from "./Citas";

Citas.init(
  {
    idCita: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idhorario: { type: DataTypes.INTEGER, allowNull: false },
    idCliente: { type: DataTypes.INTEGER },
    fechaCita: { type: DataTypes.DATEONLY, allowNull: false },
    idservicio: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "citas" }
);
export { Citas };
