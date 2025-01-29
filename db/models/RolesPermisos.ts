import {
  Model,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import type Roles from "./Roles";

export default class RolesPermisos extends Model<
  InferAttributes<RolesPermisos>,
  InferCreationAttributes<Roles>
> {
  declare idRol: ForeignKey<number>;
  declare idPermiso: ForeignKey<number>;
}
