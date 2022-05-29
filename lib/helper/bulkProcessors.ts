/**
 * It takes an array of events and add listeners to them in tha current window.
 * @param window
 * @param events
 * @param callback
 */
import {BulkProcessor} from "../../types";

const bulkAddEventListener : BulkProcessor = (window , events, callback) => {
  events.forEach((event : string) => {
    window.addEventListener(event, callback);
  });
};


/**
 * @param window
 * @param events
 * @param callback
 */
const bulkRemoveEventListener : BulkProcessor = (window, events, callback) => {
  events.forEach((event: string) => {
    window.removeEventListener(event, callback);
  });
};

export {
  bulkAddEventListener,
  bulkRemoveEventListener,
};