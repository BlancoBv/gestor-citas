import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import Citas from "./Citas";
import Clientes from "./Clientes";
import Horarios from "./Horarios";

Citas.init(
  {
    idCita: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idHorario: { type: DataTypes.INTEGER, allowNull: false },
    idCliente: { type: DataTypes.INTEGER },
    fechaCita: { type: DataTypes.DATEONLY, allowNull: false },
    idServicio: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "citas" }
);

Clientes.init(
  {
    idCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING(20), allowNull: false },
    apellidos: { type: DataTypes.STRING(40), allowNull: false },
    numTelefono: { type: DataTypes.STRING(10), allowNull: false },
    edad: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "clientes" }
);

Horarios.init(
  {
    idHorario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    horaInicio: { type: DataTypes.TIME, allowNull: false },
    horaTermino: { type: DataTypes.TIME, allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "horarios" }
);

Clientes.hasMany(Citas, { foreignKey: "idCliente" });
Citas.belongsTo(Clientes, { foreignKey: "idCliente", as: "clienteCita" });

Horarios.hasOne(Citas, { foreignKey: "idHorario" });
Citas.belongsTo(Horarios, { foreignKey: "idHorario", as: "horarioCita" });

export { Citas, Clientes, Horarios };
