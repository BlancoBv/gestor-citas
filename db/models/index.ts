import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import Citas from "./Citas";
import Clientes from "./Clientes";
import Horarios from "./Horarios";
import Usuarios from "./Usuarios";
import Permisos from "./Permisos";
import Roles from "./Roles";
import RolesPermisos from "./RolesPermisos";
import Servicios from "./Servicios";
import bcrypt from "bcrypt";

Usuarios.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: { type: DataTypes.STRING(45), allowNull: false },
    nombre: { type: DataTypes.STRING(20), allowNull: false },
    apellidos: { type: DataTypes.STRING(40), allowNull: false },
    password: { type: DataTypes.TEXT("tiny"), allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    idRol: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: "usuarios",
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

Citas.init(
  {
    idCita: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idHorario: { type: DataTypes.INTEGER, allowNull: false },
    idCliente: { type: DataTypes.INTEGER },
    fechaCita: { type: DataTypes.DATEONLY, allowNull: false },
    idServicio: { type: DataTypes.INTEGER },
    estatus: {
      type: DataTypes.ENUM("abierta", "por_llegar", "sala_espera", "cancelada"),
      allowNull: false,
    },
    nombreCliente: { type: DataTypes.STRING(100) },
    costo: { type: DataTypes.DECIMAL(6, 2) },
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
    nombreCompleto: {
      type: DataTypes.VIRTUAL,
      get() {
        const { nombre, apellidos } = this;
        return `${nombre} ${apellidos}`;
      },
    },
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

Servicios.init(
  {
    idServicio: { type: DataTypes.NUMBER, primaryKey: true, allowNull: false },
    nombre: { type: DataTypes.STRING(20), allowNull: false },
    descripcion: { type: DataTypes.TEXT("tiny"), allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    idPrecio: { type: DataTypes.NUMBER },
  },
  { sequelize, tableName: "servicios" }
);

Clientes.hasMany(Citas, { foreignKey: "idCliente" });
Citas.belongsTo(Clientes, { foreignKey: "idCliente", as: "clienteCita" });

Horarios.hasOne(Citas, { foreignKey: "idHorario" });
Citas.belongsTo(Horarios, { foreignKey: "idHorario", as: "horarioCita" });

Servicios.hasMany(Citas, { foreignKey: "idServicio" });
Citas.belongsTo(Servicios, { foreignKey: "idServicio", as: "servicioCita" });

export { Citas, Clientes, Horarios, Usuarios, Servicios };
