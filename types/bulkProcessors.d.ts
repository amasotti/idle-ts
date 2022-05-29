/**
 * Interface for bulkAdder and bulkRemover.
 * Given an array of event strings, it will add to the window the passed callback for those events.
 */
export interface BulkProcessor {
    (window: Window, events: Array<string>, callback: EventListenerOrEventListenerObject) : void
}