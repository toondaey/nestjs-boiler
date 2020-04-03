import {
    Repository,
    DeepPartial,
    FindOneOptions,
    SaveOptions,
    FindManyOptions,
    FindConditions,
    UpdateResult,
    RemoveOptions
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

/**
 * Abstract base service
 */
export class BaseService<T extends BaseEntity> {
    /**
     * Base Service constructor.
     * @param {Repository<T>} entity Repository entity
     */
    constructor(
        private readonly entity: Repository<T>
    ) {
        this.entity = entity;
    }

    /**
     * Create a db entity.
     * @param {DeepPartial<T>>} body Partial or full body.
     * @returns {T}
     */
    create<U extends DeepPartial<T>>(body: U)
    create<U extends DeepPartial<T>>(body: U[])
    create<U extends DeepPartial<T>>(body: U|U[]): T|T[] {
        return this.entity.create(body as any);
    }

    /**
     * Find entity by id
     * @param {String} id ID
     * @param {FindOneOptions<T>|FindConditions<T>} options
     * @returns {Promise<T>}
     */
    findById(id: string, options?: FindOneOptions<T>|FindConditions<T>): Promise<T | undefined> {
        return this.entity.findOne(id, options as any);
    }

    /**
     * Find one entity
     * @param {FindConditions<T> | FindOneOptions<T>} findOptionsOrConditions
     * @param {FindOneOptions<T>} options
     * @returns {Promise<T>}
     */
    findOne(findConditions?: FindConditions<T>, findOptions?: FindOneOptions<T>): Promise<T>
    findOne(findOptions?: FindOneOptions<T>): Promise<T>
    findOne(findOptionsOrConditions?: FindConditions<T> | FindOneOptions<T>, findOptions?: FindOneOptions<T>): Promise<T> {
        return this.entity.findOne(findOptionsOrConditions as any, findOptions);
    }

    /**
     * Find entities
     * @param {FindConditions<T> | FindOneOptions<T>} findOptions
     * @returns {Promise<T[]>}
     */
    find(findOptions?: FindManyOptions<T> | FindConditions<T>): Promise<T[]> {
        return this.entity.find(findOptions as any);
    }

    /**
     * Update entitie(s).
     * @param {id: string | FindConditions<T>} id
     * @param {QueryDeepPartialEntity<T>} partialEntity
     * @returns {Promise<UpdateResult>}
     */
    update(id: string[] | FindConditions<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
        return this.entity.update(id, partialEntity);
    }

    /**
     * Save entitie(s).
     * @param {DeepPartial<T>|DeepPartial<T>[]} entity
     * @param {SaveOptions} options
     * @returns {DeepPartial<T>|DeepPartial<T>[]}
     */
    save<U extends DeepPartial<T>>(entity: U, options?: SaveOptions): Promise<U>
    save<U extends DeepPartial<T>>(entities: U[], options?: SaveOptions): Promise<U[]>
    save<U extends DeepPartial<T>>(entity: U | U[], options?: SaveOptions): Promise<U|U[]> {
        return this.entity.save(entity as any, options);
    }

    /**
     * Remove entitie(s).
     * @param {T|T[]} entity
     * @param {RemoveOptions} options
     * @returns {Promise<T|T[]>}
     */
    remove(entity: T, removeOptions?: RemoveOptions): Promise<T>
    remove(entities: T[], removeOptions?: RemoveOptions): Promise<T[]>
    remove(entity: T|T[], removeOptions?: RemoveOptions): Promise<T|T[]> {
        return this.entity.remove(entity as any, removeOptions);
    }
}
