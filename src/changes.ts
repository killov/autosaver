export class Changes<T> {
    constructor(public changes?: T) {}
    hasChanges(): boolean {
        return this.changes !== undefined;
    }
}