type DebouncedFunction = () => void;

export class Debounce {
    private timeoutHandlerId?: number;

    constructor(
        private delay: number,
        private debouncedFunction: DebouncedFunction
    ) {}

    public invoke(): void {
        window.clearTimeout(this.timeoutHandlerId);
        this.timeoutHandlerId = window.setTimeout(this.debouncedFunction, this.delay);
    }

    public dispose(): void {
        window.clearTimeout(this.timeoutHandlerId);
    }
}