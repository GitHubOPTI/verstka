/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 98:
/***/ (() => {

const topCircle = document.querySelector(".cashback__ellipse-moving-top");
const bottomCircle = document.querySelector(".cashback__ellipse-moving-bottom");
topCircle.classList.add("cashback__ellipse-moving-top-anim");
bottomCircle.classList.add("cashback__ellipse-moving-bottom-anim");

/***/ }),

/***/ 750:
/***/ (() => {

const observer = new IntersectionObserver(entries => {
  // перебор записей
  entries.forEach(entry => {
    // если элемент появился
    if (entry.isIntersecting) {
      // добавить ему CSS-класс
      entry.target.classList.add("license__image-anim");
    }
  });
});
// элемент за которым следить
observer.observe(document.querySelector(".license__image"));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/js/_vars.js
/* harmony default export */ const _vars = ({
  windowEl: window,
  documentEl: document,
  htmlEl: document.documentElement,
  bodyEl: document.body
});
// EXTERNAL MODULE: ./src/js/components/scroll-anim.js
var scroll_anim = __webpack_require__(750);
// EXTERNAL MODULE: ./src/js/components/circles-anim.js
var circles_anim = __webpack_require__(98);
;// CONCATENATED MODULE: ./src/js/_components.js


// import "./components/vidget";
;// CONCATENATED MODULE: ./src/js/main.js




})();

/******/ })()
;