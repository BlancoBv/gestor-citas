import {
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export default class Clientes extends Model<
  InferAttributes<Clientes>,
  InferCreationAttributes<Clientes>
> {
  declare idCliente: CreationOptional<number>;
  declare nombre: string;
  declare apellidos: string;
  declare numTelefono: string;
  declare edad: number | null;
  declare nombreCompleto: CreationOptional<string>;
  declare createdAt: string;
  declare updatedAt: string;
}
