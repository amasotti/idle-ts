
export interface IdleTsSettings {
    idle: number, // idle time in ms
    events: Array<string>, // events that will trigger the idle resetter
    onIdle: Function, // callback function to be executed after idle time
    onActive: Function, // callback function to be executed after back form idleness
    onHide: Function, // callback function to be executed when window become hidden
    onShow: Function, // callback function to be executed when window become visible
    keepTracking: boolean, // set it to false of you want to track only once
    startAtIdle: boolean, // set it to true if you want to start in the idle state
    recurIdleCall: boolean
}

/**
 * Interface for the IdleTs class method which checks if the passed parameters are allowed.
 */
export interface ThrowOnBadKeys {
    (keys: Array<string>, allowedKeys: Array<string>): never | void
}