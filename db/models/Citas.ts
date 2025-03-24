import {
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export default class CitasModel extends Model<
  InferAttributes<CitasModel>,
  InferCreationAttributes<CitasModel>
> {
  declare idCita: CreationOptional<number>;
  declare idHorario: ForeignKey<number>;
  declare idCliente: ForeignKey<number | null>;
  declare fechaCita: string;
  declare idServicio: ForeignKey<number | null>;
  declare estatus: string;
  declare nombreCliente: string | null;
  declare costo: number | null;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}

/* export default sequelize.define<CitasModel>("citas", {
  idCita: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idhorario: { type: DataTypes.INTEGER, allowNull: false },
  idCliente: { type: DataTypes.INTEGER },
  fechaCita: { type: DataTypes.DATEONLY, allowNull: false },
  idservicio: { type: DataTypes.INTEGER },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE },
});
 */
