export interface IBaseService<T> {
	getAll(): Promise<T[]>;
	get(id: number): Promise<T>;
	create(entity: T): Promise<T>;
	update(id: number, entity: T): Promise<T>;
	delete(id: number): Promise<T>;
	softDelete(id: number, entity: T): Promise<T>;
}
