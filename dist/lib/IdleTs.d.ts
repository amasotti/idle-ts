import { IdleTsSettings, ThrowOnBadKeys } from "../types";
declare class IdleTs {
    private readonly defaults;
    settings: IdleTsSettings;
    idle: boolean | number;
    visible: boolean;
    clearTimeout?: Function | null;
    stopListener: EventListenerOrEventListenerObject;
    idlenessEventsHandler: EventListenerOrEventListenerObject;
    visibilityEventsHandler: EventListenerOrEventListenerObject;
    constructor(options: any);
    resetTimeout(keepTracking?: boolean): void;
    timeout(): void;
    start(): this;
    stop(): this;
    reset({ idle, visible }?: {
        idle?: boolean | undefined;
        visible?: boolean | undefined;
    }): this;
    throwOnBadKey: ThrowOnBadKeys;
    set(options: Partial<IdleTsSettings>): void;
}
export { IdleTs };
//# sourceMappingURL=IdleTs.d.ts.map