import {
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export default class Permisos extends Model<
  InferAttributes<Permisos>,
  InferCreationAttributes<Permisos>
> {
  declare idPermiso: CreationOptional<number>;
  declare tipo: "r" | "w" | "u" | "d";
  declare nombre: string;
  declare descripcion: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}
