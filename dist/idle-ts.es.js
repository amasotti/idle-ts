var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const bulkAddEventListener = (window2, events, callback) => {
  events.forEach((event) => {
    window2.addEventListener(event, callback);
  });
};
const bulkRemoveEventListener = (window2, events, callback) => {
  events.forEach((event) => {
    window2.removeEventListener(event, callback);
  });
};
class IdleTs {
  constructor(options) {
    __publicField(this, "defaults");
    __publicField(this, "settings");
    __publicField(this, "visibilityEvents", ["visibilitychange", "webkitvisibilitychange", "mozvisibilitychange", "msvisibilitychange"]);
    __publicField(this, "idle", false);
    __publicField(this, "visible", true);
    __publicField(this, "clearTimeout");
    __publicField(this, "stopListener");
    __publicField(this, "idlenessEventsHandler");
    __publicField(this, "visibilityEventsHandler");
    __publicField(this, "throwOnBadKey", (keys, allowedKeys) => {
      keys.forEach(function(key) {
        if (!allowedKeys.includes(key)) {
          throw `set: Unknown key ${key}`;
        }
      });
    });
    this.defaults = {
      idle: 1e4,
      events: ["mousemove", "keydown", "mousedown", "touchstart"],
      onIdle: () => {
      },
      onActive: () => {
      },
      onHide: () => {
      },
      onShow: () => {
      },
      keepTracking: true,
      startAtIdle: false,
      recurIdleCall: false
    };
    this.throwOnBadKey(Object.keys(options), Object.keys(this.defaults));
    this.settings = Object.assign({}, this.defaults, options);
    this.clearTimeout = null;
    this.reset();
    this.stopListener = () => {
      this.stop();
    };
    this.idlenessEventsHandler = () => {
      if (this.idle) {
        this.idle = false;
        this.settings.onActive() && this.settings.onActive().call();
      }
      this.resetTimeout();
    };
    this.visibilityEventsHandler = () => {
      if (document.visibilityState === "hidden") {
        this.visible = false;
        this.settings.onHide() && this.settings.onHide().call();
      } else {
        this.visible = true;
        this.settings.onShow() && this.settings.onShow().call();
      }
    };
  }
  resetTimeout(keepTracking = this.settings.keepTracking) {
    if (this.clearTimeout) {
      this.clearTimeout();
      this.clearTimeout = null;
    }
    if (keepTracking) {
      this.timeout();
    }
  }
  timeout() {
    let timer = this.settings.recurIdleCall ? {
      set: setInterval.bind(window),
      clear: clearInterval.bind(window)
    } : {
      set: setTimeout.bind(window),
      clear: clearTimeout.bind(window)
    };
    let id = timer.set(() => {
      this.idle = true;
      this.settings.onIdle() && this.settings.onIdle().call();
    }, this.settings.idle);
    this.clearTimeout = () => {
      timer.clear(id);
    };
  }
  start() {
    window.addEventListener("idle:stop", this.stopListener);
    this.timeout();
    bulkAddEventListener(window, this.settings.events, this.idlenessEventsHandler);
    if (this.settings.onShow || this.settings.onHide) {
      bulkAddEventListener(window, this.visibilityEvents, this.visibilityEventsHandler);
    }
    return this;
  }
  stop() {
    window.removeEventListener("idle:stop", this.stopListener);
    bulkRemoveEventListener(window, this.settings.events, this.idlenessEventsHandler);
    this.resetTimeout(false);
    if (this.settings.onShow || this.settings.onHide) {
      bulkRemoveEventListener(window, this.visibilityEvents, this.visibilityEventsHandler);
    }
    return this;
  }
  reset({ idle = this.settings.startAtIdle, visible = !this.settings.startAtIdle } = {}) {
    this.idle = idle;
    this.visible = visible;
    return this;
  }
  set(options) {
    this.throwOnBadKey(Object.keys(options), Object.keys(this.defaults));
    this.settings = Object.assign(this.settings, options);
  }
}
export { IdleTs };
