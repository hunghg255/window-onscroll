/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/no-this-assignment */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable unicorn/no-null */
// @ts-nocheck

class ScrollManager {
  private instance = null;
  private instancesCount = 0;
  private ticking = false;
  private supportsPassiveEvents = false;
  private supportsCustomEvents = false;
  private eventListenerOptions = null;

  private EVENT_NAME = 'window-onscroll';

  private isWindowDefined: any;

  constructor() {
    this.init();
  }

  private init() {
    this.isWindowDefined = typeof window !== 'undefined';
    this.supportsPassiveEvents = this.detectPassiveEvents();
    this.supportsCustomEvents = this.isWindowDefined && typeof window.CustomEvent === 'function';

    if (typeof window === 'undefined') {
      // Silently return null if it is used on server
      return null;
    }

    // Increase reference count
    this.instancesCount++;

    // If singleton instance exists, return it rather than creating a new one
    if (this.instance) {
      return this.instance;
    }

    // Save singleton instance
    // @ts-ignore
    this.instance = this;

    // Bind handlers
    this.handleScroll = this.handleScroll.bind(this);

    // Use passive listener when supported with fallback to capture option
    // @ts-ignore
    this.eventListenerOptions = this.supportsPassiveEvents ? { passive: true } : true;

    // Add scroll listener
    // @ts-ignore
    window.addEventListener('scroll', this.handleScroll, this.eventListenerOptions);
  }

  public removeListener() {
    this.instancesCount--;

    // There is not components listening to our event
    if (this.instancesCount === 0) {
      this.destroy();
    }
  }

  private destroy() {
    // Remove event listener
    // @ts-ignore
    window.removeEventListener('scroll', this.handleScroll, this.eventListenerOptions);

    // Clear singleton instance and count
    this.instance = null;
    this.instancesCount = 0;
  }

  public getScrollPosition() {
    // Get scroll position, with IE fallback
    let scrollPositionY = window.scrollY || document.documentElement.scrollTop;
    let scrollPositionX = window.scrollX || document.documentElement.scrollLeft;

    // Disable overscrolling in safari
    if (scrollPositionY < 0) {
      scrollPositionY = 0;
    }
    if (scrollPositionX < 0) {
      scrollPositionX = 0;
    }

    return {
      // Alias for scrollPositionY for backwards compatibility
      scrollPosition: scrollPositionY,
      scrollPositionY,
      scrollPositionX,
    };
  }

  private handleScroll() {
    // Fire the event only once per requestAnimationFrame
    const _self = this;
    if (!this.ticking) {
      _self.ticking = true;

      let event;

      if (_self.supportsCustomEvents) {
        event = new CustomEvent(_self.EVENT_NAME, {
          detail: _self.getScrollPosition(),
        });
      } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(_self.EVENT_NAME, false, false, _self.getScrollPosition());
      }

      window.dispatchEvent(event);

      window.requestAnimationFrame(function () {
        _self.ticking = false;
      });
    }
  }

  private detectPassiveEvents() {
    if (this.isWindowDefined && typeof window.addEventListener === 'function') {
      let passive = false;
      const options = Object.defineProperty({}, 'passive', {
        get: function () {
          passive = true;
        },
      });
      // note: have to set and remove a no-op listener instead of null
      // (which was used previously), because Edge v15 throws an error
      // when providing a null callback.
      // https://github.com/rafrex/detect-passive-events/pull/3
      const noop = function () {};
      window.addEventListener('TEST_PASSIVE_EVENT_SUPPORT', noop, options);
      window.removeEventListener('TEST_PASSIVE_EVENT_SUPPORT', noop, options);

      return passive;
    }

    return false;
  }
}

if (typeof window !== 'undefined') {
  window.ScrollManager = ScrollManager;
}

export default ScrollManager;
