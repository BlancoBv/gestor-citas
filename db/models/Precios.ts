import {
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export default class Precios extends Model<
  InferAttributes<Precios>,
  InferCreationAttributes<Precios>
> {
  declare idPrecio: CreationOptional<number>;
  declare monto: number;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}
