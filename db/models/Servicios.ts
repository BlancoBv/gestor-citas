import {
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export default class Servicios extends Model<
  InferAttributes<Servicios>,
  InferCreationAttributes<Servicios>
> {
  declare idServicio: CreationOptional<number>;
  declare nombre: string;
  declare descripcion: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
  declare idPrecio: ForeignKey<number>;
}
