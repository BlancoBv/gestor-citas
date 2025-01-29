import {
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export default class Usuarios extends Model<
  InferAttributes<Usuarios>,
  InferCreationAttributes<Usuarios>
> {
  declare id: CreationOptional<number>;
  declare usuario: string;
  declare nombre: string;
  declare apellidos: string;
  declare password: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
  declare idRol: ForeignKey<number>;
}
