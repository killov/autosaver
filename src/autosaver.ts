import {Debounce} from "./debounce";
import {Changes} from "./changes";
import {Params} from "./Params";
import AwaitLock from "await-lock";

interface Listenable {
    listen(change: () => void);
}

export class Autosaver<TData> {
    private debounce: Debounce;
    private _isChanged = false;
    private currentData?: TData;
    private isDirty = false;
    private lock: AwaitLock = new AwaitLock();

    constructor(private params: Params<TData>) {
        this.debounce = new Debounce(1000, () => this.save())
    }

    public init(changeListener: Listenable) {
        changeListener.listen(() => this.debounce.invoke());
    }

    public immediateSave(): Promise<void> {
        return this.save();
    }

    public isChanged(): boolean {
        if (this._isChanged) {
            return true;
        }

        this._isChanged = this.createChanges(this.createData()).hasChanges();

        return this._isChanged;
    }

    private createData(): TData {
        return this.params.createData();
    }

    private createChanges(data: TData): Changes<TData> {
        return this.params.createChanges(this.currentData, data);
    }

    private async save(): Promise<void> {
        this.isDirty = true;
        await this.lock.acquireAsync();
        if (!this.isDirty) {
            this.lock.release();
            return;
        }
        //todo
    }
}