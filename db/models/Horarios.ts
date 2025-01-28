import {
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export default class Horarios extends Model<
  InferAttributes<Horarios>,
  InferCreationAttributes<Horarios>
> {
  declare idHorario: CreationOptional<number>;
  declare horaInicio: string;
  declare horaTermino: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}
