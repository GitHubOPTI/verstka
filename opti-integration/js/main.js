/******/ (() => {
	// webpackBootstrap
	/******/ var __webpack_modules__ = {
		/***/ 730: /***/ () => {
			const checkboxList = document.querySelector(".hero__list-checkboxes");
			const inputs = checkboxList.querySelectorAll(".hero__input-checkbox");
			const labels = checkboxList.querySelectorAll(".hero__label-checkbox");
			const labelTextElems = checkboxList.querySelectorAll(".hero__text");
			if (checkboxList !== null && inputs.length > 0 && labels.length > 0 && labels.length > 0) {
				inputs.forEach((input, idx) => {
					input.addEventListener("change", () => {
						let label = labels[idx];
						let labelText = labelTextElems[idx];
						label.classList.toggle("hero__label-checkbox-active");
						if (label.classList.contains("hero__label-checkbox-active")) {
							labelText.innerHTML = labelText.getAttribute("data-future-text");
						} else {
							labelText.innerHTML = labelText.getAttribute("data-default-text");
						}
					});
				});
			}

			/***/
		},

		/***/ 160: /***/ () => {
			const select = document.getElementById("custom-select");
			const valueElem = select.querySelector(".hero__text-select");
			if (select !== null && valueElem !== null) {
				select.addEventListener("click", () => {
					select.classList.toggle("hero__container-input-opened");
				});
				valueElem.addEventListener("click", (e) => {
					e.stopPropagation();
					select.classList.toggle("hero__container-input-opened");
				});
				document.addEventListener("click", (e) => {
					if (e.target !== select && e.target !== valueElem) {
						select.classList.remove("hero__container-input-opened");
					}
				});
			}
			const selectItems = select.querySelectorAll(".hero__item-select");
			if (selectItems.length > 0) {
				selectItems.forEach((item) => {
					item.addEventListener("click", () => {
						valueElem.setAttribute("data-value", item.getAttribute("data-value"));
						valueElem.innerHTML = item.innerHTML;
					});
				});
			}

			/***/
		},

		/***/ 863: /***/ () => {
			const plusBtn = document.querySelector(".hero__button-plus");
			const minusBtn = document.querySelector(".hero__button-minus");
			let rowsContainer = document.querySelector(".hero__container-rows");
			if (plusBtn !== null && rowsContainer !== null) {
				plusBtn.addEventListener("click", () => {
					rowsContainer = document.querySelector(".hero__container-rows");
					rows = document.querySelectorAll(".hero__container-row");
					const rowTemplate = rows[rows.length - 1].cloneNode(true);
					const childred = Array.from(rowTemplate.children);
					childred.forEach((child) => {
						if (child.tagName == "INPUT") {
							child.setAttribute("id", childred.length + +child.getAttribute("id"));
							child.setAttribute("name", childred.length + +child.getAttribute("name"));
						} else {
							innerInput = child.querySelector("input");
							child.setAttribute("for", childred.length + +child.getAttribute("for"));
							innerInput.setAttribute("id", childred.length + +innerInput.getAttribute("id"));
							innerInput.setAttribute("name", childred.length + +innerInput.getAttribute("name"));

							// слушатель для появления галочки в инпуте
							innerInput.addEventListener("change", () => {
								child.classList.toggle("hero__label-checkbox-mark-active");
							});
						}
					});
					rowsContainer.appendChild(rowTemplate);
				});
			}
			if (minusBtn !== null && rowsContainer !== null) {
				minusBtn.addEventListener("click", () => {
					rows = document.querySelectorAll(".hero__container-row");
					if (rows.length > 2) {
						rowsContainer.removeChild(rowsContainer.lastElementChild);
					}
				});
			}

			/***/
		},

		/***/ 118: /***/ () => {
			const markLabel = document.querySelectorAll(".hero__label-checkbox-mark");
			if (markLabel.length > 0) {
				markLabel.forEach((label) => {
					input = label.querySelector("input[type=checkbox]");
					input.addEventListener("change", () => {
						label.classList.toggle("hero__label-checkbox-mark-active");
					});
				});
			}

			/***/
		},

		/***/ 514: /***/ () => {
			const mainButton = document.querySelector(".hero__button-main");
			const slideBlock = document.querySelector(".hero__container-slide");
			const integrationBlock = document.querySelector(".hero__container-integration");
			if (mainButton !== null && slideBlock !== null && integrationBlock !== null) {
				mainButton.addEventListener("click", () => {
					slideBlock.classList.add("hero__container-slide-hidden");
					integrationBlock.classList.add("hero__container-integration-visible");
				});
			}

			/***/
		},

		/******/
	};
	/************************************************************************/
	/******/ // The module cache
	/******/ var __webpack_module_cache__ = {};
	/******/
	/******/ // The require function
	/******/ function __webpack_require__(moduleId) {
		/******/ // Check if module is in cache
		/******/ var cachedModule = __webpack_module_cache__[moduleId];
		/******/ if (cachedModule !== undefined) {
			/******/ return cachedModule.exports;
			/******/
		}
		/******/ // Create a new module (and put it into the cache)
		/******/ var module = (__webpack_module_cache__[moduleId] = {
			/******/ // no module.id needed
			/******/ // no module.loaded needed
			/******/ exports: {},
			/******/
		});
		/******/
		/******/ // Execute the module function
		/******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
		/******/
		/******/ // Return the exports of the module
		/******/ return module.exports;
		/******/
	}
	/******/
	/************************************************************************/
	var __webpack_exports__ = {};
	// This entry need to be wrapped in an IIFE because it need to be in strict mode.
	(() => {
		"use strict"; // CONCATENATED MODULE: ./src/js/_vars.js

		/* harmony default export */ const _vars = {
			windowEl: window,
			documentEl: document,
			htmlEl: document.documentElement,
			bodyEl: document.body,
		};
		// EXTERNAL MODULE: ./src/js/components/slide-anim.js
		var slide_anim = __webpack_require__(514);
		// EXTERNAL MODULE: ./src/js/components/checkbox-anim.js
		var checkbox_anim = __webpack_require__(730);
		// EXTERNAL MODULE: ./src/js/components/mark-checkbox-anim.js
		var mark_checkbox_anim = __webpack_require__(118);
		// EXTERNAL MODULE: ./src/js/components/form-buttons.js
		var form_buttons = __webpack_require__(863);
		// EXTERNAL MODULE: ./src/js/components/custom-select.js
		var custom_select = __webpack_require__(160); // CONCATENATED MODULE: ./src/js/_components.js // CONCATENATED MODULE: ./src/js/main.js
	})();

	/******/
})();
