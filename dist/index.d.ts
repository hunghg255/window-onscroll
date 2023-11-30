declare class ScrollManager {
    private instance;
    private instancesCount;
    private ticking;
    private supportsPassiveEvents;
    private supportsCustomEvents;
    private eventListenerOptions;
    private EVENT_NAME;
    private isWindowDefined;
    constructor();
    private init;
    removeListener(): void;
    private destroy;
    getScrollPosition(): {
        scrollPosition: number;
        scrollPositionY: number;
        scrollPositionX: number;
    };
    private handleScroll;
    private detectPassiveEvents;
}

export { ScrollManager as default };
