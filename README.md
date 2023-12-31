<p align="center">
<a href="https://www.npmjs.com/package/window-onscroll" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/mdi:mouse-scroll-wheel.svg?color=%237da0f2" alt="logo" width='100'/></a>
</p>

<p align="center">
  A library make window scroll smooth and easy to use
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/window-onscroll" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/csvs-parsers.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/window-onscroll" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/csvs-parsers.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=window-onscroll" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/window-onscroll" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/window-onscroll/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/window-onscroll/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/window-onscroll" alt="License" /></a>
</p>

## Usage

Get it from [npm](https://www.npmjs.com/package/window-onscroll):

```sh
npm install window-onscroll
```

## Import it and use it:

```js
import ScrollManager from 'window-onscroll';

const sm = new ScrollManager();

console.log(sm.getScrollPosition());
// -> { scrollPositionX: 0, scrollPositionY: 0 }

window.addEventListener('window-scroll', function (e) {
  console.log('Vertical scroll position is: ' + e.detail.scrollPositionY);
  console.log('Horizontal scroll position is: ' + e.detail.scrollPositionX);

  requestAnimationFrame(function () {
    // repaint logic goes here
    // example:
    // rotateDiv.style.transform = 'rotate(' + e.detail.scrollPositionY / 2 + 'deg)';
  });
});
```

## Browser support

```js
<script src="https://unpkg.com/window-onscroll/dist/esm/index.js"></script>
<script>
  var sm = new ScrollManager();

  var valueDiv = document.querySelector('.ScrollPosition-value');
  var rotateDiv = document.querySelector('.ScrollPosition-rotate');

  window.addEventListener('window-onscroll', function (e) {
    requestAnimationFrame(function () {
      valueDiv.innerHTML = parseInt(e.detail.scrollPositionY, 10);
      rotateDiv.style.transform = 'rotate(' + e.detail.scrollPositionY / 2 + 'deg)';
    });
  });
</script>
```

## API

- `getScrollPosition()` - returns current window scroll position object.
  ```js
  {
    scrollPositionX: 0,
    scrollPositionY: 100,
  }
  ```
- `removeListener()` - reduces internal reference counter by one, and if it reaches 0 destroys the instance. Reference counter is increased every time `new ScrollManager` is called. For example, this is useful when scroll manager is used in React high order component (to track if any component is still using it). Use with caution.
- `destroy()` - destroys the singleton instance and removes `scroll` listener. Use with caution, call `removeListener` do this for you.
