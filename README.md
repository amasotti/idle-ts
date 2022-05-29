# idle-ts
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
[![Node version](https://badgen.net/npm/node/@amasotti/idle-ts)](https://badgen.net/npm/node/@amasotti/idle-ts)
[![Npm package version](https://badgen.net/npm/v/@amasotti/idle-ts)](https://www.npmjs.com/package/@amasotti/idle-ts)
[![Issues](https://badgen.net/github/issues/amasotti/idle-ts)](https://badgen.net/github/issues/amasotti/idle-ts)
[![License](https://badgen.net/github/license/amasotti/idle-ts)](https://badgen.net/github/license/amasotti/idle-ts)

This is a clone of [idle-js](https://github.com/soixantecircuits/idle-js) with added typescript support. It just checks that 
the user has not been interacting with the App for a while (the `idle` parameters in ms) and triggers functions according to the user state.

The activity/inactivity of a user is retrieved by looking at an array of events (`mousedown`, `keydown`, `touchstart` and others).
If any these is fired the user is considered active, otherwise idle.


**Original Documentation**:
A really simple utility module for tracking user activity on a tab. Usefull to change the tab name, or creating micro interaction in your webapp.

- returning to a particular after no activity identified
- display a modal depending on activity
- change things while the user is away
- create anything funny :)

>Warning IE11 is not supported by default anymore. If you want to use it, you might want to add a polyfill for `Object.assign` -> https://www.jsdelivr.com/package/npm/polyfill-object-assign

## Install

`npm i @amasotti/idle-ts`

## Usage in your script

```js
// Those are the default values that can be overwritten when importing and initializing the class `IdleTs`
var idle = new IdleJs({
  idle: 10000, // idle time in ms
  events: ['mousemove', 'keydown', 'mousedown', 'touchstart'], // events that will trigger the idle resetter
  visibilityEvents: ['visibilitychange', 'webkitvisibilitychange', 'mozvisibilitychange', 'msvisibilitychange'], // events that will trigger the idle resetter for visibility
  onIdle: () => {}, // callback function to be executed after idle time
  onActive: () => {}, // callback function to be executed after back form idleness
  onHide: () => {}, // callback function to be executed when window become hidden
  onShow: () => {}, // callback function to be executed when window become visible
  keepTracking: true, // set it to false if you want to be notified only on the first idleness change
  startAtIdle: false // set it to true if you want to start in the idle state
})
```

To start observing the state of the tab:

`idle.start()`

If you need to stop observing:


`idle.stop()`   // stops all tracking

You can then reset and start again:

```
idle.stop()
    .reset()  // reset visible and idle state to initial values
    .start()  // restart
```

Reset to a specific state

```
idle.reset({
  idle: false,
  visible: ! document.hidden,
})
```



## Running example

The project is built using [Vite](https://vitejs.dev/).

> yarn run dev

or 

> yarn run preview
