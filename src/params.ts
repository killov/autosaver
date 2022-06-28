import {Changes} from "./changes";
import {SaveParams} from "./autosaver";

export interface Params<T> {
    createChanges(oldData: T, newData: T): Changes<T>;
    createData(): T;
    save(params: SaveParams<T>): Promise<void>;
}