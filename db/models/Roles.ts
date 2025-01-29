import {
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export default class Roles extends Model<
  InferAttributes<Roles>,
  InferCreationAttributes<Roles>
> {
  declare idRol: CreationOptional<number>;
  declare nombre: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}
