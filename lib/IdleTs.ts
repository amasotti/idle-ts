import {IdleTsSettings, ThrowOnBadKeys} from "../types";
import {bulkAddEventListener, bulkRemoveEventListener} from "./helper/bulkProcessors";

class IdleTs {
    // Properties
    private readonly defaults: IdleTsSettings
    public settings : IdleTsSettings
    public visibilityEvents: Array<string> = ['visibilitychange', 'webkitvisibilitychange', 'mozvisibilitychange', 'msvisibilitychange']
    public idle: boolean | number = false
    public visible: boolean = true
    public clearTimeout?: Function | null
    public stopListener: EventListenerOrEventListenerObject
    public idlenessEventsHandler: EventListenerOrEventListenerObject
    public visibilityEventsHandler: EventListenerOrEventListenerObject

    constructor(options: any) {
        this.defaults = {
            idle: 10000,
            events: ['mousemove', 'keydown', 'mousedown', 'touchstart'],
            onIdle: () => {},
            onActive: () => {},
            onHide: () => {},
            onShow: () => {},
            keepTracking: true,
            startAtIdle: false,
            recurIdleCall: false,
        }
        // Check that no unknown keys are passed
        this.throwOnBadKey(Object.keys(options), Object.keys(this.defaults))

        // Merge options with defaults
        this.settings = Object.assign({}, this.defaults, options)

        this.clearTimeout = null

        this.reset()

        this.stopListener = () => {
            this.stop()
        }

        // Handle user state : idle or active
        this.idlenessEventsHandler = () => {
            if (this.idle) {
                this.idle = false;
                this.settings.onActive() && this.settings.onActive().call()
            }
            this.resetTimeout()
        }

        // Handle visibility changes
        this.visibilityEventsHandler = () => {
            if (document.visibilityState === 'hidden') {
                this.visible = false;
                this.settings.onHide() && this.settings.onHide().call()
            } else {
                this.visible = true;
                this.settings.onShow() && this.settings.onShow().call()
            }
        }

    }

    resetTimeout (keepTracking : boolean = this.settings.keepTracking) {
        if (this.clearTimeout) {
            this.clearTimeout()
            this.clearTimeout = null
        }
        if (keepTracking) {
            this.timeout()
        }
    }

    timeout () {
        let timer = this.settings.recurIdleCall ? {
            set: setInterval.bind(window),
            clear: clearInterval.bind(window)
        } : {
            set: setTimeout.bind(window),
            clear: clearTimeout.bind(window)
        }

        let id = timer.set(() =>  {
            this.idle = true;
            this.settings.onIdle() && this.settings.onIdle().call()
        }, this.settings.idle)

        this.clearTimeout = () => {timer.clear(id)}
    }

    start () {
        window.addEventListener('idle:stop', this.stopListener)
        this.timeout()

        bulkAddEventListener(window, this.settings.events, this.idlenessEventsHandler);

        if (this.settings.onShow || this.settings.onHide) {
            bulkAddEventListener(window, this.visibilityEvents, this.visibilityEventsHandler);
        }

        return this
    }

    stop () {
        window.removeEventListener('idle:stop', this.stopListener)

        bulkRemoveEventListener(window, this.settings.events, this.idlenessEventsHandler)
        this.resetTimeout(false)

        if (this.settings.onShow || this.settings.onHide) {
            bulkRemoveEventListener(window, this.visibilityEvents, this.visibilityEventsHandler)
        }

        return this
    }

    reset ({ idle = this.settings.startAtIdle, visible = !this.settings.startAtIdle } = {}) {
        this.idle = idle
        this.visible = visible

        return this
    }

    throwOnBadKey: ThrowOnBadKeys = (keys, allowedKeys) => {
        keys.forEach(function (key) {
            if (!allowedKeys.includes(key)) {
                throw `set: Unknown key ${key}`
            }
        })
    }

    set (options : Partial<IdleTsSettings>) {
        this.throwOnBadKey(Object.keys(options), Object.keys(this.defaults))
        this.settings = Object.assign(this.settings, options)
    }
}


export { IdleTs }