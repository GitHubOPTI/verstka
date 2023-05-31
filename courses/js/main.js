/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 242:
/***/ (() => {

const persentage = document.querySelector(".module-grades__persentage");
const values = document.querySelectorAll(".module-grades__value");
console.log(values);
if (persentage !== null && values !== null) {
  const minHeight = persentage.scrollHeight / values.length;
  for (let i = 0; i < values.length; i++) {
    j = i + 1;
    values[i].style.height = minHeight * j + "px";
  }
}

/***/ }),

/***/ 54:
/***/ (() => {

const items = document.querySelectorAll(".course__item-contents");
if (items !== null) {
  let activeItem = document.querySelector(".course__item-contents-active");
  items.forEach(item => {
    item.addEventListener("click", () => {
      activeItem.classList.remove("course__item-contents-active");
      item.classList.add("course__item-contents-active");
      activeItem = item;
    });
  });
}

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
;// CONCATENATED MODULE: ./src/js/components/tabs.js
class Tabs {
  constructor(selector, innerElems, starterId) {
    this.selector = selector;
    this.innerElements = innerElems;
    this.starterId = starterId;
    this.tabs = document.querySelector(`[data-tabs="${selector}"]`);
    if (this.tabs) {
      this.tabList = this.tabs.querySelector("." + innerElems.list);
      this.tabsBtns = this.tabList.querySelectorAll("." + innerElems.button);
      this.tabsPanels = this.tabs.querySelectorAll("." + innerElems.panel);
    } else {
      return;
    }
    this.init();
    this.events();
  }
  init() {
    this.tabList.setAttribute("role", "tablist");
    this.tabsBtns.forEach((el, i) => {
      el.setAttribute("role", "tab");
      el.setAttribute("tabindex", "-1");
      el.setAttribute("id", `${this.selector}${i + 1}`);
      el.classList.remove(this.innerElements.button + "-active");
    });
    this.tabsPanels.forEach((el, i) => {
      el.setAttribute("role", "tabpanel");
      el.setAttribute("tabindex", "-1");
      el.setAttribute("aria-labelledby", this.tabsBtns[i].id);
      el.classList.remove(this.innerElements.panel + "-active");
    });
    this.tabsBtns[this.starterId].classList.add(this.innerElements.button + "-active");
    this.tabsBtns[this.starterId].removeAttribute("tabindex");
    this.tabsBtns[this.starterId].setAttribute("aria-selected", "true");
    this.tabsPanels[this.starterId].classList.add(this.innerElements.panel + "-active");
  }
  events() {
    this.tabsBtns.forEach((el, i) => {
      el.addEventListener("click", e => {
        let currentTab = this.tabList.querySelector("[aria-selected]");
        if (e.currentTarget !== currentTab) {
          this.switchTabs(e.currentTarget, currentTab);
        }
      });
      el.addEventListener("keydown", e => {
        let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);
        let dir = null;
        if (e.which === 37) {
          dir = index - 1;
        } else if (e.which === 39) {
          dir = index + 1;
        } else if (e.which === 40) {
          dir = "down";
        } else {
          dir = null;
        }
        if (dir !== null) {
          if (dir === "down") {
            this.tabsPanels[i].focus();
          } else if (this.tabsBtns[dir]) {
            this.switchTabs(this.tabsBtns[dir], e.currentTarget);
          }
        }
      });
    });
  }
  switchTabs(newTab) {
    let oldTab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tabs.querySelector("[aria-selected]");
    newTab.focus();
    newTab.removeAttribute("tabindex");
    newTab.setAttribute("aria-selected", "true");
    oldTab.removeAttribute("aria-selected");
    oldTab.setAttribute("tabindex", "-1");
    let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
    let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);
    this.tabsPanels[oldIndex].classList.remove(this.innerElements.panel + "-active");
    this.tabsPanels[index].classList.add(this.innerElements.panel + "-active");
    this.tabsBtns[oldIndex].classList.remove(this.innerElements.button + "-active");
    this.tabsBtns[index].classList.add(this.innerElements.button + "-active");
  }
}
const quizTabs = new Tabs("hero__tabs", {
  list: "hero__list-tabs",
  button: "hero__button-tabs",
  panel: "hero__panel"
}, 0);
// EXTERNAL MODULE: ./src/js/components/menu-test.js
var menu_test = __webpack_require__(54);
// EXTERNAL MODULE: ./src/js/components/graph.js
var graph = __webpack_require__(242);
;// CONCATENATED MODULE: ./src/js/_components.js



;// CONCATENATED MODULE: ./src/js/main.js




})();

/******/ })()
;