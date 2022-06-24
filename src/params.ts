import {Changes} from "./changes";

export interface Params<T> {
    createChanges(oldData: T, newData: T): Changes<T>;
    createData(): T;
}