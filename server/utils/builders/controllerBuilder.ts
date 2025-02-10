import {
  Model as SequelizeModel,
  type Attributes,
  type Includeable,
  type ModelStatic,
  type Order,
  type WhereOptions,
  Op,
  fn,
  col,
  type BindOrReplacements,
  Transaction,
  type FindAttributeOptions,
  type InferAttributes,
  type InferCreationAttributes,
  type Optional,
  where,
} from "sequelize";
import {
  type NullishPropertiesOf,
  type MakeNullishOptional,
} from "sequelize/lib/utils";

interface Builder {
  setWhereFilters(filters: WhereOptions<Attributes<any>> | undefined): this;
  setIncludedModels(models: Includeable | Includeable[] | undefined): this;
  setOrderFilters(filters: Order | undefined): this;
  setModel<M extends SequelizeModel>(
    model: ModelStatic<M>
  ): ControllerBuilder<M>;
  setReplacements(replacements: BindOrReplacements): this;
  setBody(body: { [key in keyof Attributes<any>]: any }): this;
  setTransaction(t: Transaction): this;
  setAttributes(att: FindAttributeOptions): this;
}

type LimitedClass<M> = Omit<
  M,
  | "whereFilters"
  | "includedModels"
  | "orderFilters"
  | "model"
  | "attributes"
  | "replacements"
  | "body"
  | "transaction"
  | "toRawArray"
  | "toRawJSON"
>;

export default class ControllerBuilder<
  T extends SequelizeModel = SequelizeModel
> implements Builder
{
  private modelInstance: InternalModel<T>;

  public get Op() {
    return Op;
  }
  public get Fn() {
    return fn;
  }
  public get Col() {
    return col;
  }
  public get Where() {
    return where;
  }
  constructor() {
    this.modelInstance = new InternalModel<T>();
  }

  reset(): void {
    this.modelInstance = new InternalModel<T>();
  }

  setModel<M extends SequelizeModel>(
    model: ModelStatic<M>
  ): ControllerBuilder<M> {
    this.modelInstance.model = model as unknown as ModelStatic<T>;
    return this as unknown as ControllerBuilder<M>;
  }

  setWhereFilters(filters: WhereOptions<Attributes<T>> | undefined): this {
    this.modelInstance.whereFilters = filters;
    return this;
  }

  setIncludedModels(models: Includeable | Includeable[] | undefined): this {
    this.modelInstance.includedModels = models;
    return this;
  }

  setOrderFilters(filters: Order | undefined): this {
    this.modelInstance.orderFilters = filters;
    return this;
  }

  setReplacements(replacements: BindOrReplacements): this {
    this.modelInstance.replacements = replacements;
    return this;
  }

  setBody(
    body: Optional<
      InferCreationAttributes<T>,
      NullishPropertiesOf<InferCreationAttributes<T>>
    >
  ): this {
    this.modelInstance.body = body;
    return this;
  }

  setTransaction(t: Transaction): this {
    this.modelInstance.transaction = t;
    return this;
  }

  setAttributes(att: FindAttributeOptions): this {
    this.modelInstance.attributes = att;
    return this;
  }

  getModelResult(): LimitedClass<InternalModel<T>> {
    const result = this.modelInstance;
    this.reset();
    return result as LimitedClass<InternalModel<T>>;
  }
}

class InternalModel<T extends SequelizeModel> {
  private _transaction: Transaction | null = null;
  private _attributes: FindAttributeOptions | undefined = undefined;
  private _model!: ModelStatic<T>;
  private _replacements: BindOrReplacements | undefined;
  public whereFilters: WhereOptions<Attributes<T>> | undefined = undefined;
  public includedModels: Includeable[] | undefined | Includeable = undefined;
  public orderFilters: Order | undefined = undefined;
  private _body: { [key in keyof Attributes<T>]: any } | any | undefined =
    undefined;
  private response: T[] | T | null = null;

  public set model(model: ModelStatic<T>) {
    this._model = model;
  }

  public set attributes(att: FindAttributeOptions) {
    this._attributes = att;
  }

  public set replacements(replacements: BindOrReplacements) {
    this._replacements = replacements;
  }

  public set body(body: { [key in keyof Attributes<T>]: any }) {
    this._body = body;
  }

  public set transaction(transaction: Transaction) {
    this._transaction = transaction;
  }

  public async getOne(): Promise<Pick<this, "toRawJSON">> {
    const response = await this._model.findOne({
      where: this.whereFilters,
      include: this.includedModels,
      replacements: this._replacements,
      attributes: this._attributes,
    });

    if (response === null) {
      throw new Error("No encontrado");
    }

    this.response = response;
    return this;
  }

  public async getAll(): Promise<Pick<this, "toRawArray">> {
    const response = await this._model.findAll({
      include: this.includedModels,
      order: this.orderFilters,
      where: this.whereFilters,
      replacements: this._replacements,
      attributes: this._attributes,
    });
    this.response = response;
    return this;
  }

  public async update(): Promise<[affectedCount: number]> {
    return await this._model.update(this._body ?? {}, {
      where: this.whereFilters ?? {},
      transaction: this._transaction ?? undefined,
    });
  }

  public async create(): Promise<T> {
    return await this._model.create(this._body ?? {}, {
      transaction: this._transaction ?? undefined,
    });
  }

  public async bulkCreate(
    callback: MakeNullishOptional<T["_creationAttributes"]>[]
  ): Promise<T[]> {
    return await this._model.bulkCreate(callback, {
      transaction: this._transaction ?? undefined,
    });
  }

  public async delete(): Promise<number> {
    return await this._model.destroy({
      where: this.whereFilters ?? {},
      transaction: this._transaction ?? undefined,
    });
  }
  public toRawArray<
    K extends { [key: string]: SequelizeModel | SequelizeModel[] } | undefined
  >() {
    const res = this.response as T[];
    return res.map((el) => el?.toJSON()) as unknown as (K extends undefined
      ? InferAttributes<T>
      : InferAttributes<T> & {
          [P in keyof K]: K[P] extends SequelizeModel
            ? InferAttributes<K[P]>
            : K[P] extends SequelizeModel[]
            ? InferAttributes<K[P][number]>[]
            : {};
        })[];
  }
  public toRawJSON<
    K extends { [key: string]: SequelizeModel | SequelizeModel[] }
  >() {
    const res = this.response as T;
    return res as unknown as InferAttributes<T> & {
      [P in keyof K]: K[P] extends SequelizeModel
        ? InferAttributes<K[P]>
        : K[P] extends SequelizeModel[]
        ? InferAttributes<K[P][number]>[]
        : {};
    };
  }
}
