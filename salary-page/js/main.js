/******/ (() => {
	// webpackBootstrap
	/******/ var __webpack_modules__ = {
		/***/ 1973: /***/ () => {
			const accordions = document.querySelectorAll(".accordion");
			if (accordions) {
				accordions.forEach((el) => {
					const control = el.querySelector(".accordion__control");
					const content = el.querySelector(".accordion__content");
					control.addEventListener("click", () => {
						const self = control.closest(".accordion");
						self.classList.toggle("accordion-open");
						if (self.classList.contains("docs-hero__item")) {
							content.classList.toggle("accordion__content-open-docs");
						} else {
							content.classList.toggle("accordion__content-open");
						}
						if (self.classList.contains("accordion-open")) {
							control.setAttribute("aria-expanded", true);
							content.setAttribute("aria-hidden", false);
							content.style.maxHeight = content.scrollHeight + "px";
						} else {
							control.setAttribute("aria-expanded", false);
							content.setAttribute("aria-hidden", true);
							content.style.maxHeight = null;
						}
					});
				});
			}

			/***/
		},

		/***/ 49: /***/ () => {
			const defaltActiveRow = 5;
			const panels = document.querySelectorAll(".employee__panel");
			if (panels.length > 0) {
				panels.forEach((panel, idx) => {
					const rows = panel.querySelectorAll(".accordion__content .employee__row");
					rows.forEach((row) => {
						// по умолчанию активный столбец
						row.querySelector(`.employee__col-${defaltActiveRow}`).classList.add(
							"employee__col-mark-active"
						);
						let markCells = row.querySelectorAll(".employee__col-mark");
						let activeCell = row.querySelector(".employee__col-mark-active");
						markCells.forEach((cell) => {
							cell.addEventListener("click", () => {
								activeCell.classList.remove("employee__col-mark-active");
								cell.classList.add("employee__col-mark-active");
								activeCell = cell;
							});
						});
					});
				});
			}

			/***/
		},

		/***/ 1458: /***/ () => {
			const track = document.querySelector(".employee__track");
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
						this.nextButton = document.querySelector("." + innerElems.nextButton);
						this.currentId = 0;
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
						el.addEventListener("click", (e) => {
							this.currentTab = this.tabList.querySelector("[aria-selected]");
							if (e.currentTarget !== this.currentTab) {
								this.switchTabs(e.currentTarget, this.currentTab);
							}
						});
						el.addEventListener("keydown", (e) => {
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
					if (this.nextButton !== null) {
						this.nextButton.addEventListener("click", () => {
							let nextId = +this.currentId + 1 == 3 ? 0 : (this.currentId = +this.currentId + 1);
							document.querySelector(`[data-id="${nextId}"]`).click();
						});
					}
				}
				switchTabs(newTab) {
					let oldTab =
						arguments.length > 1 && arguments[1] !== undefined
							? arguments[1]
							: this.tabs.querySelector("[aria-selected]");
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
					this.currentId = newTab.getAttribute("data-id");
					// track anim
					track.style.transform = `translateX(${newTab.getAttribute("data-id") * 100}%)`;
				}
			}
			const employeeTabs = new Tabs(
				"employeeTabs",
				{
					list: "employee__nav",
					button: "employee__button-tab",
					panel: "employee__panel",
					nextButton: "employee__button",
				},
				0
			);

			/***/
		},

		/***/ 7854: /***/ () => {
			const selects = document.querySelectorAll(".select");
			selects.forEach((select) => {
				select.addEventListener("change", () => {
					let url = new URL(window.location.href);
					if (url.searchParams.get("chunkSize") !== select.value) {
						url.searchParams.set("chunkSize", select.value);
						window.location.href = url.href;
					}
				});
			});

			/***/
		},

		/***/ 1278: /***/ () => {
			const filterBtns = document.querySelectorAll(".team__filter");
			filterBtns.forEach((button) => {
				button.addEventListener("click", () => {
					button.classList.toggle("team__filter-reversed");
				});
			});

			/***/
		},

		/***/ 1807: /***/ (module) => {
			var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

			module.exports = canUseDOM;

			/***/
		},

		/***/ 9662: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var isCallable = __webpack_require__(614);
			var tryToString = __webpack_require__(6330);

			var $TypeError = TypeError;

			// `Assert: IsCallable(argument) is true`
			module.exports = function (argument) {
				if (isCallable(argument)) return argument;
				throw $TypeError(tryToString(argument) + " is not a function");
			};

			/***/
		},

		/***/ 6077: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var isCallable = __webpack_require__(614);

			var $String = String;
			var $TypeError = TypeError;

			module.exports = function (argument) {
				if (typeof argument == "object" || isCallable(argument)) return argument;
				throw $TypeError("Can't set " + $String(argument) + " as a prototype");
			};

			/***/
		},

		/***/ 1223: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var wellKnownSymbol = __webpack_require__(5112);
			var create = __webpack_require__(30);
			var defineProperty = __webpack_require__(3070).f;

			var UNSCOPABLES = wellKnownSymbol("unscopables");
			var ArrayPrototype = Array.prototype;

			// Array.prototype[@@unscopables]
			// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
			if (ArrayPrototype[UNSCOPABLES] === undefined) {
				defineProperty(ArrayPrototype, UNSCOPABLES, {
					configurable: true,
					value: create(null),
				});
			}

			// add a key to Array.prototype[@@unscopables]
			module.exports = function (key) {
				ArrayPrototype[UNSCOPABLES][key] = true;
			};

			/***/
		},

		/***/ 1530: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var charAt = __webpack_require__(8710).charAt;

			// `AdvanceStringIndex` abstract operation
			// https://tc39.es/ecma262/#sec-advancestringindex
			module.exports = function (S, index, unicode) {
				return index + (unicode ? charAt(S, index).length : 1);
			};

			/***/
		},

		/***/ 5787: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var isPrototypeOf = __webpack_require__(7976);

			var $TypeError = TypeError;

			module.exports = function (it, Prototype) {
				if (isPrototypeOf(Prototype, it)) return it;
				throw $TypeError("Incorrect invocation");
			};

			/***/
		},

		/***/ 9670: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var isObject = __webpack_require__(111);

			var $String = String;
			var $TypeError = TypeError;

			// `Assert: Type(argument) is Object`
			module.exports = function (argument) {
				if (isObject(argument)) return argument;
				throw $TypeError($String(argument) + " is not an object");
			};

			/***/
		},

		/***/ 7556: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
			var fails = __webpack_require__(7293);

			module.exports = fails(function () {
				if (typeof ArrayBuffer == "function") {
					var buffer = new ArrayBuffer(8);
					// eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
					if (Object.isExtensible(buffer)) Object.defineProperty(buffer, "a", { value: 8 });
				}
			});

			/***/
		},

		/***/ 8533: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var $forEach = __webpack_require__(2092).forEach;
			var arrayMethodIsStrict = __webpack_require__(9341);

			var STRICT_METHOD = arrayMethodIsStrict("forEach");

			// `Array.prototype.forEach` method implementation
			// https://tc39.es/ecma262/#sec-array.prototype.foreach
			module.exports = !STRICT_METHOD
				? function forEach(callbackfn /* , thisArg */) {
						return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
						// eslint-disable-next-line es/no-array-prototype-foreach -- safe
				  }
				: [].forEach;

			/***/
		},

		/***/ 1318: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var toIndexedObject = __webpack_require__(5656);
			var toAbsoluteIndex = __webpack_require__(1400);
			var lengthOfArrayLike = __webpack_require__(6244);

			// `Array.prototype.{ indexOf, includes }` methods implementation
			var createMethod = function (IS_INCLUDES) {
				return function ($this, el, fromIndex) {
					var O = toIndexedObject($this);
					var length = lengthOfArrayLike(O);
					var index = toAbsoluteIndex(fromIndex, length);
					var value;
					// Array#includes uses SameValueZero equality algorithm
					// eslint-disable-next-line no-self-compare -- NaN check
					if (IS_INCLUDES && el !== el)
						while (length > index) {
							value = O[index++];
							// eslint-disable-next-line no-self-compare -- NaN check
							if (value !== value) return true;
							// Array#indexOf ignores holes, Array#includes - not
						}
					else
						for (; length > index; index++) {
							if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
						}
					return !IS_INCLUDES && -1;
				};
			};

			module.exports = {
				// `Array.prototype.includes` method
				// https://tc39.es/ecma262/#sec-array.prototype.includes
				includes: createMethod(true),
				// `Array.prototype.indexOf` method
				// https://tc39.es/ecma262/#sec-array.prototype.indexof
				indexOf: createMethod(false),
			};

			/***/
		},

		/***/ 2092: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var bind = __webpack_require__(9974);
			var uncurryThis = __webpack_require__(1702);
			var IndexedObject = __webpack_require__(8361);
			var toObject = __webpack_require__(7908);
			var lengthOfArrayLike = __webpack_require__(6244);
			var arraySpeciesCreate = __webpack_require__(5417);

			var push = uncurryThis([].push);

			// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
			var createMethod = function (TYPE) {
				var IS_MAP = TYPE === 1;
				var IS_FILTER = TYPE === 2;
				var IS_SOME = TYPE === 3;
				var IS_EVERY = TYPE === 4;
				var IS_FIND_INDEX = TYPE === 6;
				var IS_FILTER_REJECT = TYPE === 7;
				var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
				return function ($this, callbackfn, that, specificCreate) {
					var O = toObject($this);
					var self = IndexedObject(O);
					var boundFunction = bind(callbackfn, that);
					var length = lengthOfArrayLike(self);
					var index = 0;
					var create = specificCreate || arraySpeciesCreate;
					var target = IS_MAP
						? create($this, length)
						: IS_FILTER || IS_FILTER_REJECT
						? create($this, 0)
						: undefined;
					var value, result;
					for (; length > index; index++)
						if (NO_HOLES || index in self) {
							value = self[index];
							result = boundFunction(value, index, O);
							if (TYPE) {
								if (IS_MAP) target[index] = result; // map
								else if (result)
									switch (TYPE) {
										case 3:
											return true; // some
										case 5:
											return value; // find
										case 6:
											return index; // findIndex
										case 2:
											push(target, value); // filter
									}
								else
									switch (TYPE) {
										case 4:
											return false; // every
										case 7:
											push(target, value); // filterReject
									}
							}
						}
					return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
				};
			};

			module.exports = {
				// `Array.prototype.forEach` method
				// https://tc39.es/ecma262/#sec-array.prototype.foreach
				forEach: createMethod(0),
				// `Array.prototype.map` method
				// https://tc39.es/ecma262/#sec-array.prototype.map
				map: createMethod(1),
				// `Array.prototype.filter` method
				// https://tc39.es/ecma262/#sec-array.prototype.filter
				filter: createMethod(2),
				// `Array.prototype.some` method
				// https://tc39.es/ecma262/#sec-array.prototype.some
				some: createMethod(3),
				// `Array.prototype.every` method
				// https://tc39.es/ecma262/#sec-array.prototype.every
				every: createMethod(4),
				// `Array.prototype.find` method
				// https://tc39.es/ecma262/#sec-array.prototype.find
				find: createMethod(5),
				// `Array.prototype.findIndex` method
				// https://tc39.es/ecma262/#sec-array.prototype.findIndex
				findIndex: createMethod(6),
				// `Array.prototype.filterReject` method
				// https://github.com/tc39/proposal-array-filtering
				filterReject: createMethod(7),
			};

			/***/
		},

		/***/ 1194: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var fails = __webpack_require__(7293);
			var wellKnownSymbol = __webpack_require__(5112);
			var V8_VERSION = __webpack_require__(7392);

			var SPECIES = wellKnownSymbol("species");

			module.exports = function (METHOD_NAME) {
				// We can't use this feature detection in V8 since it causes
				// deoptimization and serious performance degradation
				// https://github.com/zloirock/core-js/issues/677
				return (
					V8_VERSION >= 51 ||
					!fails(function () {
						var array = [];
						var constructor = (array.constructor = {});
						constructor[SPECIES] = function () {
							return { foo: 1 };
						};
						return array[METHOD_NAME](Boolean).foo !== 1;
					})
				);
			};

			/***/
		},

		/***/ 9341: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var fails = __webpack_require__(7293);

			module.exports = function (METHOD_NAME, argument) {
				var method = [][METHOD_NAME];
				return (
					!!method &&
					fails(function () {
						// eslint-disable-next-line no-useless-call -- required for testing
						method.call(
							null,
							argument ||
								function () {
									return 1;
								},
							1
						);
					})
				);
			};

			/***/
		},

		/***/ 3671: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var aCallable = __webpack_require__(9662);
			var toObject = __webpack_require__(7908);
			var IndexedObject = __webpack_require__(8361);
			var lengthOfArrayLike = __webpack_require__(6244);

			var $TypeError = TypeError;

			// `Array.prototype.{ reduce, reduceRight }` methods implementation
			var createMethod = function (IS_RIGHT) {
				return function (that, callbackfn, argumentsLength, memo) {
					aCallable(callbackfn);
					var O = toObject(that);
					var self = IndexedObject(O);
					var length = lengthOfArrayLike(O);
					var index = IS_RIGHT ? length - 1 : 0;
					var i = IS_RIGHT ? -1 : 1;
					if (argumentsLength < 2)
						while (true) {
							if (index in self) {
								memo = self[index];
								index += i;
								break;
							}
							index += i;
							if (IS_RIGHT ? index < 0 : length <= index) {
								throw $TypeError("Reduce of empty array with no initial value");
							}
						}
					for (; IS_RIGHT ? index >= 0 : length > index; index += i)
						if (index in self) {
							memo = callbackfn(memo, self[index], index, O);
						}
					return memo;
				};
			};

			module.exports = {
				// `Array.prototype.reduce` method
				// https://tc39.es/ecma262/#sec-array.prototype.reduce
				left: createMethod(false),
				// `Array.prototype.reduceRight` method
				// https://tc39.es/ecma262/#sec-array.prototype.reduceright
				right: createMethod(true),
			};

			/***/
		},

		/***/ 1589: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var toAbsoluteIndex = __webpack_require__(1400);
			var lengthOfArrayLike = __webpack_require__(6244);
			var createProperty = __webpack_require__(6135);

			var $Array = Array;
			var max = Math.max;

			module.exports = function (O, start, end) {
				var length = lengthOfArrayLike(O);
				var k = toAbsoluteIndex(start, length);
				var fin = toAbsoluteIndex(end === undefined ? length : end, length);
				var result = $Array(max(fin - k, 0));
				var n = 0;
				for (; k < fin; k++, n++) createProperty(result, n, O[k]);
				result.length = n;
				return result;
			};

			/***/
		},

		/***/ 7475: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var isArray = __webpack_require__(3157);
			var isConstructor = __webpack_require__(4411);
			var isObject = __webpack_require__(111);
			var wellKnownSymbol = __webpack_require__(5112);

			var SPECIES = wellKnownSymbol("species");
			var $Array = Array;

			// a part of `ArraySpeciesCreate` abstract operation
			// https://tc39.es/ecma262/#sec-arrayspeciescreate
			module.exports = function (originalArray) {
				var C;
				if (isArray(originalArray)) {
					C = originalArray.constructor;
					// cross-realm fallback
					if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
					else if (isObject(C)) {
						C = C[SPECIES];
						if (C === null) C = undefined;
					}
				}
				return C === undefined ? $Array : C;
			};

			/***/
		},

		/***/ 5417: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var arraySpeciesConstructor = __webpack_require__(7475);

			// `ArraySpeciesCreate` abstract operation
			// https://tc39.es/ecma262/#sec-arrayspeciescreate
			module.exports = function (originalArray, length) {
				return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
			};

			/***/
		},

		/***/ 7072: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var wellKnownSymbol = __webpack_require__(5112);

			var ITERATOR = wellKnownSymbol("iterator");
			var SAFE_CLOSING = false;

			try {
				var called = 0;
				var iteratorWithReturn = {
					next: function () {
						return { done: !!called++ };
					},
					return: function () {
						SAFE_CLOSING = true;
					},
				};
				iteratorWithReturn[ITERATOR] = function () {
					return this;
				};
				// eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
				Array.from(iteratorWithReturn, function () {
					throw 2;
				});
			} catch (error) {
				/* empty */
			}

			module.exports = function (exec, SKIP_CLOSING) {
				if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
				var ITERATION_SUPPORT = false;
				try {
					var object = {};
					object[ITERATOR] = function () {
						return {
							next: function () {
								return { done: (ITERATION_SUPPORT = true) };
							},
						};
					};
					exec(object);
				} catch (error) {
					/* empty */
				}
				return ITERATION_SUPPORT;
			};

			/***/
		},

		/***/ 4326: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);

			var toString = uncurryThis({}.toString);
			var stringSlice = uncurryThis("".slice);

			module.exports = function (it) {
				return stringSlice(toString(it), 8, -1);
			};

			/***/
		},

		/***/ 648: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
			var isCallable = __webpack_require__(614);
			var classofRaw = __webpack_require__(4326);
			var wellKnownSymbol = __webpack_require__(5112);

			var TO_STRING_TAG = wellKnownSymbol("toStringTag");
			var $Object = Object;

			// ES3 wrong here
			var CORRECT_ARGUMENTS =
				classofRaw(
					(function () {
						return arguments;
					})()
				) === "Arguments";

			// fallback for IE11 Script Access Denied error
			var tryGet = function (it, key) {
				try {
					return it[key];
				} catch (error) {
					/* empty */
				}
			};

			// getting tag from ES6+ `Object.prototype.toString`
			module.exports = TO_STRING_TAG_SUPPORT
				? classofRaw
				: function (it) {
						var O, tag, result;
						return it === undefined
							? "Undefined"
							: it === null
							? "Null"
							: // @@toStringTag case
							typeof (tag = tryGet((O = $Object(it)), TO_STRING_TAG)) == "string"
							? tag
							: // builtinTag case
							CORRECT_ARGUMENTS
							? classofRaw(O)
							: // ES3 arguments fallback
							(result = classofRaw(O)) === "Object" && isCallable(O.callee)
							? "Arguments"
							: result;
				  };

			/***/
		},

		/***/ 9320: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);
			var defineBuiltIns = __webpack_require__(9190);
			var getWeakData = __webpack_require__(2423).getWeakData;
			var anInstance = __webpack_require__(5787);
			var anObject = __webpack_require__(9670);
			var isNullOrUndefined = __webpack_require__(8554);
			var isObject = __webpack_require__(111);
			var iterate = __webpack_require__(408);
			var ArrayIterationModule = __webpack_require__(2092);
			var hasOwn = __webpack_require__(2597);
			var InternalStateModule = __webpack_require__(9909);

			var setInternalState = InternalStateModule.set;
			var internalStateGetterFor = InternalStateModule.getterFor;
			var find = ArrayIterationModule.find;
			var findIndex = ArrayIterationModule.findIndex;
			var splice = uncurryThis([].splice);
			var id = 0;

			// fallback for uncaught frozen keys
			var uncaughtFrozenStore = function (state) {
				return state.frozen || (state.frozen = new UncaughtFrozenStore());
			};

			var UncaughtFrozenStore = function () {
				this.entries = [];
			};

			var findUncaughtFrozen = function (store, key) {
				return find(store.entries, function (it) {
					return it[0] === key;
				});
			};

			UncaughtFrozenStore.prototype = {
				get: function (key) {
					var entry = findUncaughtFrozen(this, key);
					if (entry) return entry[1];
				},
				has: function (key) {
					return !!findUncaughtFrozen(this, key);
				},
				set: function (key, value) {
					var entry = findUncaughtFrozen(this, key);
					if (entry) entry[1] = value;
					else this.entries.push([key, value]);
				},
				delete: function (key) {
					var index = findIndex(this.entries, function (it) {
						return it[0] === key;
					});
					if (~index) splice(this.entries, index, 1);
					return !!~index;
				},
			};

			module.exports = {
				getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
					var Constructor = wrapper(function (that, iterable) {
						anInstance(that, Prototype);
						setInternalState(that, {
							type: CONSTRUCTOR_NAME,
							id: id++,
							frozen: undefined,
						});
						if (!isNullOrUndefined(iterable))
							iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
					});

					var Prototype = Constructor.prototype;

					var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

					var define = function (that, key, value) {
						var state = getInternalState(that);
						var data = getWeakData(anObject(key), true);
						if (data === true) uncaughtFrozenStore(state).set(key, value);
						else data[state.id] = value;
						return that;
					};

					defineBuiltIns(Prototype, {
						// `{ WeakMap, WeakSet }.prototype.delete(key)` methods
						// https://tc39.es/ecma262/#sec-weakmap.prototype.delete
						// https://tc39.es/ecma262/#sec-weakset.prototype.delete
						delete: function (key) {
							var state = getInternalState(this);
							if (!isObject(key)) return false;
							var data = getWeakData(key);
							if (data === true) return uncaughtFrozenStore(state)["delete"](key);
							return data && hasOwn(data, state.id) && delete data[state.id];
						},
						// `{ WeakMap, WeakSet }.prototype.has(key)` methods
						// https://tc39.es/ecma262/#sec-weakmap.prototype.has
						// https://tc39.es/ecma262/#sec-weakset.prototype.has
						has: function has(key) {
							var state = getInternalState(this);
							if (!isObject(key)) return false;
							var data = getWeakData(key);
							if (data === true) return uncaughtFrozenStore(state).has(key);
							return data && hasOwn(data, state.id);
						},
					});

					defineBuiltIns(
						Prototype,
						IS_MAP
							? {
									// `WeakMap.prototype.get(key)` method
									// https://tc39.es/ecma262/#sec-weakmap.prototype.get
									get: function get(key) {
										var state = getInternalState(this);
										if (isObject(key)) {
											var data = getWeakData(key);
											if (data === true) return uncaughtFrozenStore(state).get(key);
											return data ? data[state.id] : undefined;
										}
									},
									// `WeakMap.prototype.set(key, value)` method
									// https://tc39.es/ecma262/#sec-weakmap.prototype.set
									set: function set(key, value) {
										return define(this, key, value);
									},
							  }
							: {
									// `WeakSet.prototype.add(value)` method
									// https://tc39.es/ecma262/#sec-weakset.prototype.add
									add: function add(value) {
										return define(this, value, true);
									},
							  }
					);

					return Constructor;
				},
			};

			/***/
		},

		/***/ 7710: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var $ = __webpack_require__(2109);
			var global = __webpack_require__(2474);
			var uncurryThis = __webpack_require__(1702);
			var isForced = __webpack_require__(4705);
			var defineBuiltIn = __webpack_require__(8052);
			var InternalMetadataModule = __webpack_require__(2423);
			var iterate = __webpack_require__(408);
			var anInstance = __webpack_require__(5787);
			var isCallable = __webpack_require__(614);
			var isNullOrUndefined = __webpack_require__(8554);
			var isObject = __webpack_require__(111);
			var fails = __webpack_require__(7293);
			var checkCorrectnessOfIteration = __webpack_require__(7072);
			var setToStringTag = __webpack_require__(8003);
			var inheritIfRequired = __webpack_require__(9587);

			module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
				var IS_MAP = CONSTRUCTOR_NAME.indexOf("Map") !== -1;
				var IS_WEAK = CONSTRUCTOR_NAME.indexOf("Weak") !== -1;
				var ADDER = IS_MAP ? "set" : "add";
				var NativeConstructor = global[CONSTRUCTOR_NAME];
				var NativePrototype = NativeConstructor && NativeConstructor.prototype;
				var Constructor = NativeConstructor;
				var exported = {};

				var fixMethod = function (KEY) {
					var uncurriedNativeMethod = uncurryThis(NativePrototype[KEY]);
					defineBuiltIn(
						NativePrototype,
						KEY,
						KEY === "add"
							? function add(value) {
									uncurriedNativeMethod(this, value === 0 ? 0 : value);
									return this;
							  }
							: KEY === "delete"
							? function (key) {
									return IS_WEAK && !isObject(key)
										? false
										: uncurriedNativeMethod(this, key === 0 ? 0 : key);
							  }
							: KEY === "get"
							? function get(key) {
									return IS_WEAK && !isObject(key)
										? undefined
										: uncurriedNativeMethod(this, key === 0 ? 0 : key);
							  }
							: KEY === "has"
							? function has(key) {
									return IS_WEAK && !isObject(key)
										? false
										: uncurriedNativeMethod(this, key === 0 ? 0 : key);
							  }
							: function set(key, value) {
									uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
									return this;
							  }
					);
				};

				var REPLACE = isForced(
					CONSTRUCTOR_NAME,
					!isCallable(NativeConstructor) ||
						!(
							IS_WEAK ||
							(NativePrototype.forEach &&
								!fails(function () {
									new NativeConstructor().entries().next();
								}))
						)
				);

				if (REPLACE) {
					// create collection constructor
					Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
					InternalMetadataModule.enable();
				} else if (isForced(CONSTRUCTOR_NAME, true)) {
					var instance = new Constructor();
					// early implementations not supports chaining
					var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance;
					// V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
					var THROWS_ON_PRIMITIVES = fails(function () {
						instance.has(1);
					});
					// most early implementations doesn't supports iterables, most modern - not close it correctly
					// eslint-disable-next-line no-new -- required for testing
					var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
						new NativeConstructor(iterable);
					});
					// for early implementations -0 and +0 not the same
					var BUGGY_ZERO =
						!IS_WEAK &&
						fails(function () {
							// V8 ~ Chromium 42- fails only with 5+ elements
							var $instance = new NativeConstructor();
							var index = 5;
							while (index--) $instance[ADDER](index, index);
							return !$instance.has(-0);
						});

					if (!ACCEPT_ITERABLES) {
						Constructor = wrapper(function (dummy, iterable) {
							anInstance(dummy, NativePrototype);
							var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
							if (!isNullOrUndefined(iterable))
								iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
							return that;
						});
						Constructor.prototype = NativePrototype;
						NativePrototype.constructor = Constructor;
					}

					if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
						fixMethod("delete");
						fixMethod("has");
						IS_MAP && fixMethod("get");
					}

					if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

					// weak collections should not contains .clear method
					if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
				}

				exported[CONSTRUCTOR_NAME] = Constructor;
				$({ global: true, constructor: true, forced: Constructor !== NativeConstructor }, exported);

				setToStringTag(Constructor, CONSTRUCTOR_NAME);

				if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

				return Constructor;
			};

			/***/
		},

		/***/ 9920: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var hasOwn = __webpack_require__(2597);
			var ownKeys = __webpack_require__(3887);
			var getOwnPropertyDescriptorModule = __webpack_require__(1236);
			var definePropertyModule = __webpack_require__(3070);

			module.exports = function (target, source, exceptions) {
				var keys = ownKeys(source);
				var defineProperty = definePropertyModule.f;
				var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i];
					if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
						defineProperty(target, key, getOwnPropertyDescriptor(source, key));
					}
				}
			};

			/***/
		},

		/***/ 8544: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var fails = __webpack_require__(7293);

			module.exports = !fails(function () {
				function F() {
					/* empty */
				}
				F.prototype.constructor = null;
				// eslint-disable-next-line es/no-object-getprototypeof -- required for testing
				return Object.getPrototypeOf(new F()) !== F.prototype;
			});

			/***/
		},

		/***/ 6178: /***/ (module) => {
			"use strict";

			// `CreateIterResultObject` abstract operation
			// https://tc39.es/ecma262/#sec-createiterresultobject
			module.exports = function (value, done) {
				return { value: value, done: done };
			};

			/***/
		},

		/***/ 8880: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var DESCRIPTORS = __webpack_require__(9781);
			var definePropertyModule = __webpack_require__(3070);
			var createPropertyDescriptor = __webpack_require__(9114);

			module.exports = DESCRIPTORS
				? function (object, key, value) {
						return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
				  }
				: function (object, key, value) {
						object[key] = value;
						return object;
				  };

			/***/
		},

		/***/ 9114: /***/ (module) => {
			"use strict";

			module.exports = function (bitmap, value) {
				return {
					enumerable: !(bitmap & 1),
					configurable: !(bitmap & 2),
					writable: !(bitmap & 4),
					value: value,
				};
			};

			/***/
		},

		/***/ 6135: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var toPropertyKey = __webpack_require__(4948);
			var definePropertyModule = __webpack_require__(3070);
			var createPropertyDescriptor = __webpack_require__(9114);

			module.exports = function (object, key, value) {
				var propertyKey = toPropertyKey(key);
				if (propertyKey in object)
					definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
				else object[propertyKey] = value;
			};

			/***/
		},

		/***/ 7045: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var makeBuiltIn = __webpack_require__(6339);
			var defineProperty = __webpack_require__(3070);

			module.exports = function (target, name, descriptor) {
				if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
				if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
				return defineProperty.f(target, name, descriptor);
			};

			/***/
		},

		/***/ 8052: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var isCallable = __webpack_require__(614);
			var definePropertyModule = __webpack_require__(3070);
			var makeBuiltIn = __webpack_require__(6339);
			var defineGlobalProperty = __webpack_require__(3072);

			module.exports = function (O, key, value, options) {
				if (!options) options = {};
				var simple = options.enumerable;
				var name = options.name !== undefined ? options.name : key;
				if (isCallable(value)) makeBuiltIn(value, name, options);
				if (options.global) {
					if (simple) O[key] = value;
					else defineGlobalProperty(key, value);
				} else {
					try {
						if (!options.unsafe) delete O[key];
						else if (O[key]) simple = true;
					} catch (error) {
						/* empty */
					}
					if (simple) O[key] = value;
					else
						definePropertyModule.f(O, key, {
							value: value,
							enumerable: false,
							configurable: !options.nonConfigurable,
							writable: !options.nonWritable,
						});
				}
				return O;
			};

			/***/
		},

		/***/ 9190: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var defineBuiltIn = __webpack_require__(8052);

			module.exports = function (target, src, options) {
				for (var key in src) defineBuiltIn(target, key, src[key], options);
				return target;
			};

			/***/
		},

		/***/ 3072: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var global = __webpack_require__(2474);

			// eslint-disable-next-line es/no-object-defineproperty -- safe
			var defineProperty = Object.defineProperty;

			module.exports = function (key, value) {
				try {
					defineProperty(global, key, { value: value, configurable: true, writable: true });
				} catch (error) {
					global[key] = value;
				}
				return value;
			};

			/***/
		},

		/***/ 9781: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var fails = __webpack_require__(7293);

			// Detect IE8's incomplete defineProperty implementation
			module.exports = !fails(function () {
				// eslint-disable-next-line es/no-object-defineproperty -- required for testing
				return (
					Object.defineProperty({}, 1, {
						get: function () {
							return 7;
						},
					})[1] !== 7
				);
			});

			/***/
		},

		/***/ 4154: /***/ (module) => {
			"use strict";

			var documentAll = typeof document == "object" && document.all;

			// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
			// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
			var IS_HTMLDDA = typeof documentAll == "undefined" && documentAll !== undefined;

			module.exports = {
				all: documentAll,
				IS_HTMLDDA: IS_HTMLDDA,
			};

			/***/
		},

		/***/ 317: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var global = __webpack_require__(2474);
			var isObject = __webpack_require__(111);

			var document = global.document;
			// typeof document.createElement is 'object' in old IE
			var EXISTS = isObject(document) && isObject(document.createElement);

			module.exports = function (it) {
				return EXISTS ? document.createElement(it) : {};
			};

			/***/
		},

		/***/ 8324: /***/ (module) => {
			"use strict";

			// iterable DOM collections
			// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
			module.exports = {
				CSSRuleList: 0,
				CSSStyleDeclaration: 0,
				CSSValueList: 0,
				ClientRectList: 0,
				DOMRectList: 0,
				DOMStringList: 0,
				DOMTokenList: 1,
				DataTransferItemList: 0,
				FileList: 0,
				HTMLAllCollection: 0,
				HTMLCollection: 0,
				HTMLFormElement: 0,
				HTMLSelectElement: 0,
				MediaList: 0,
				MimeTypeArray: 0,
				NamedNodeMap: 0,
				NodeList: 1,
				PaintRequestList: 0,
				Plugin: 0,
				PluginArray: 0,
				SVGLengthList: 0,
				SVGNumberList: 0,
				SVGPathSegList: 0,
				SVGPointList: 0,
				SVGStringList: 0,
				SVGTransformList: 0,
				SourceBufferList: 0,
				StyleSheetList: 0,
				TextTrackCueList: 0,
				TextTrackList: 0,
				TouchList: 0,
			};

			/***/
		},

		/***/ 8509: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
			var documentCreateElement = __webpack_require__(317);

			var classList = documentCreateElement("span").classList;
			var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

			module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

			/***/
		},

		/***/ 5268: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var global = __webpack_require__(2474);
			var classof = __webpack_require__(4326);

			module.exports = classof(global.process) === "process";

			/***/
		},

		/***/ 8113: /***/ (module) => {
			"use strict";

			module.exports = (typeof navigator != "undefined" && String(navigator.userAgent)) || "";

			/***/
		},

		/***/ 7392: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var global = __webpack_require__(2474);
			var userAgent = __webpack_require__(8113);

			var process = global.process;
			var Deno = global.Deno;
			var versions = (process && process.versions) || (Deno && Deno.version);
			var v8 = versions && versions.v8;
			var match, version;

			if (v8) {
				match = v8.split(".");
				// in old Chrome, versions of V8 isn't V8 = Chrome / 10
				// but their correct versions are not interesting for us
				version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
			}

			// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
			// so check `userAgent` even if `.v8` exists, but 0
			if (!version && userAgent) {
				match = userAgent.match(/Edge\/(\d+)/);
				if (!match || match[1] >= 74) {
					match = userAgent.match(/Chrome\/(\d+)/);
					if (match) version = +match[1];
				}
			}

			module.exports = version;

			/***/
		},

		/***/ 748: /***/ (module) => {
			"use strict";

			// IE8- don't enum bug keys
			module.exports = [
				"constructor",
				"hasOwnProperty",
				"isPrototypeOf",
				"propertyIsEnumerable",
				"toLocaleString",
				"toString",
				"valueOf",
			];

			/***/
		},

		/***/ 2109: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var global = __webpack_require__(2474);
			var getOwnPropertyDescriptor = __webpack_require__(1236).f;
			var createNonEnumerableProperty = __webpack_require__(8880);
			var defineBuiltIn = __webpack_require__(8052);
			var defineGlobalProperty = __webpack_require__(3072);
			var copyConstructorProperties = __webpack_require__(9920);
			var isForced = __webpack_require__(4705);

			/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
			module.exports = function (options, source) {
				var TARGET = options.target;
				var GLOBAL = options.global;
				var STATIC = options.stat;
				var FORCED, target, key, targetProperty, sourceProperty, descriptor;
				if (GLOBAL) {
					target = global;
				} else if (STATIC) {
					target = global[TARGET] || defineGlobalProperty(TARGET, {});
				} else {
					target = (global[TARGET] || {}).prototype;
				}
				if (target)
					for (key in source) {
						sourceProperty = source[key];
						if (options.dontCallGetSet) {
							descriptor = getOwnPropertyDescriptor(target, key);
							targetProperty = descriptor && descriptor.value;
						} else targetProperty = target[key];
						FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
						// contained in target
						if (!FORCED && targetProperty !== undefined) {
							if (typeof sourceProperty == typeof targetProperty) continue;
							copyConstructorProperties(sourceProperty, targetProperty);
						}
						// add a flag to not completely full polyfills
						if (options.sham || (targetProperty && targetProperty.sham)) {
							createNonEnumerableProperty(sourceProperty, "sham", true);
						}
						defineBuiltIn(target, key, sourceProperty, options);
					}
			};

			/***/
		},

		/***/ 7293: /***/ (module) => {
			"use strict";

			module.exports = function (exec) {
				try {
					return !!exec();
				} catch (error) {
					return true;
				}
			};

			/***/
		},

		/***/ 7007: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			// TODO: Remove from `core-js@4` since it's moved to entry points
			__webpack_require__(4916);
			var uncurryThis = __webpack_require__(1470);
			var defineBuiltIn = __webpack_require__(8052);
			var regexpExec = __webpack_require__(2261);
			var fails = __webpack_require__(7293);
			var wellKnownSymbol = __webpack_require__(5112);
			var createNonEnumerableProperty = __webpack_require__(8880);

			var SPECIES = wellKnownSymbol("species");
			var RegExpPrototype = RegExp.prototype;

			module.exports = function (KEY, exec, FORCED, SHAM) {
				var SYMBOL = wellKnownSymbol(KEY);

				var DELEGATES_TO_SYMBOL = !fails(function () {
					// String methods call symbol-named RegEp methods
					var O = {};
					O[SYMBOL] = function () {
						return 7;
					};
					return ""[KEY](O) !== 7;
				});

				var DELEGATES_TO_EXEC =
					DELEGATES_TO_SYMBOL &&
					!fails(function () {
						// Symbol-named RegExp methods call .exec
						var execCalled = false;
						var re = /a/;

						if (KEY === "split") {
							// We can't use real regex here since it causes deoptimization
							// and serious performance degradation in V8
							// https://github.com/zloirock/core-js/issues/306
							re = {};
							// RegExp[@@split] doesn't call the regex's exec method, but first creates
							// a new one. We need to return the patched regex when creating the new one.
							re.constructor = {};
							re.constructor[SPECIES] = function () {
								return re;
							};
							re.flags = "";
							re[SYMBOL] = /./[SYMBOL];
						}

						re.exec = function () {
							execCalled = true;
							return null;
						};

						re[SYMBOL]("");
						return !execCalled;
					});

				if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
					var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
					var methods = exec(SYMBOL, ""[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
						var uncurriedNativeMethod = uncurryThis(nativeMethod);
						var $exec = regexp.exec;
						if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
							if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
								// The native String method already delegates to @@method (this
								// polyfilled function), leasing to infinite recursion.
								// We avoid it by directly calling the native @@method method.
								return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
							}
							return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
						}
						return { done: false };
					});

					defineBuiltIn(String.prototype, KEY, methods[0]);
					defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
				}

				if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], "sham", true);
			};

			/***/
		},

		/***/ 6677: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var fails = __webpack_require__(7293);

			module.exports = !fails(function () {
				// eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
				return Object.isExtensible(Object.preventExtensions({}));
			});

			/***/
		},

		/***/ 2104: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var NATIVE_BIND = __webpack_require__(4374);

			var FunctionPrototype = Function.prototype;
			var apply = FunctionPrototype.apply;
			var call = FunctionPrototype.call;

			// eslint-disable-next-line es/no-reflect -- safe
			module.exports =
				(typeof Reflect == "object" && Reflect.apply) ||
				(NATIVE_BIND
					? call.bind(apply)
					: function () {
							return call.apply(apply, arguments);
					  });

			/***/
		},

		/***/ 9974: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1470);
			var aCallable = __webpack_require__(9662);
			var NATIVE_BIND = __webpack_require__(4374);

			var bind = uncurryThis(uncurryThis.bind);

			// optional / simple context binding
			module.exports = function (fn, that) {
				aCallable(fn);
				return that === undefined
					? fn
					: NATIVE_BIND
					? bind(fn, that)
					: function (/* ...args */) {
							return fn.apply(that, arguments);
					  };
			};

			/***/
		},

		/***/ 4374: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var fails = __webpack_require__(7293);

			module.exports = !fails(function () {
				// eslint-disable-next-line es/no-function-prototype-bind -- safe
				var test = function () {
					/* empty */
				}.bind();
				// eslint-disable-next-line no-prototype-builtins -- safe
				return typeof test != "function" || test.hasOwnProperty("prototype");
			});

			/***/
		},

		/***/ 6916: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var NATIVE_BIND = __webpack_require__(4374);

			var call = Function.prototype.call;

			module.exports = NATIVE_BIND
				? call.bind(call)
				: function () {
						return call.apply(call, arguments);
				  };

			/***/
		},

		/***/ 6530: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var DESCRIPTORS = __webpack_require__(9781);
			var hasOwn = __webpack_require__(2597);

			var FunctionPrototype = Function.prototype;
			// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
			var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

			var EXISTS = hasOwn(FunctionPrototype, "name");
			// additional protection from minified / mangled / dropped function names
			var PROPER =
				EXISTS &&
				function something() {
					/* empty */
				}.name === "something";
			var CONFIGURABLE =
				EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable));

			module.exports = {
				EXISTS: EXISTS,
				PROPER: PROPER,
				CONFIGURABLE: CONFIGURABLE,
			};

			/***/
		},

		/***/ 5668: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);
			var aCallable = __webpack_require__(9662);

			module.exports = function (object, key, method) {
				try {
					// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
					return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
				} catch (error) {
					/* empty */
				}
			};

			/***/
		},

		/***/ 1470: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var classofRaw = __webpack_require__(4326);
			var uncurryThis = __webpack_require__(1702);

			module.exports = function (fn) {
				// Nashorn bug:
				//   https://github.com/zloirock/core-js/issues/1128
				//   https://github.com/zloirock/core-js/issues/1130
				if (classofRaw(fn) === "Function") return uncurryThis(fn);
			};

			/***/
		},

		/***/ 1702: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var NATIVE_BIND = __webpack_require__(4374);

			var FunctionPrototype = Function.prototype;
			var call = FunctionPrototype.call;
			var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

			module.exports = NATIVE_BIND
				? uncurryThisWithBind
				: function (fn) {
						return function () {
							return call.apply(fn, arguments);
						};
				  };

			/***/
		},

		/***/ 5005: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var global = __webpack_require__(2474);
			var isCallable = __webpack_require__(614);

			var aFunction = function (argument) {
				return isCallable(argument) ? argument : undefined;
			};

			module.exports = function (namespace, method) {
				return arguments.length < 2
					? aFunction(global[namespace])
					: global[namespace] && global[namespace][method];
			};

			/***/
		},

		/***/ 1246: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var classof = __webpack_require__(648);
			var getMethod = __webpack_require__(8173);
			var isNullOrUndefined = __webpack_require__(8554);
			var Iterators = __webpack_require__(7497);
			var wellKnownSymbol = __webpack_require__(5112);

			var ITERATOR = wellKnownSymbol("iterator");

			module.exports = function (it) {
				if (!isNullOrUndefined(it))
					return getMethod(it, ITERATOR) || getMethod(it, "@@iterator") || Iterators[classof(it)];
			};

			/***/
		},

		/***/ 4121: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var call = __webpack_require__(6916);
			var aCallable = __webpack_require__(9662);
			var anObject = __webpack_require__(9670);
			var tryToString = __webpack_require__(6330);
			var getIteratorMethod = __webpack_require__(1246);

			var $TypeError = TypeError;

			module.exports = function (argument, usingIterator) {
				var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
				if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
				throw $TypeError(tryToString(argument) + " is not iterable");
			};

			/***/
		},

		/***/ 8173: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var aCallable = __webpack_require__(9662);
			var isNullOrUndefined = __webpack_require__(8554);

			// `GetMethod` abstract operation
			// https://tc39.es/ecma262/#sec-getmethod
			module.exports = function (V, P) {
				var func = V[P];
				return isNullOrUndefined(func) ? undefined : aCallable(func);
			};

			/***/
		},

		/***/ 647: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);
			var toObject = __webpack_require__(7908);

			var floor = Math.floor;
			var charAt = uncurryThis("".charAt);
			var replace = uncurryThis("".replace);
			var stringSlice = uncurryThis("".slice);
			// eslint-disable-next-line redos/no-vulnerable -- safe
			var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
			var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

			// `GetSubstitution` abstract operation
			// https://tc39.es/ecma262/#sec-getsubstitution
			module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
				var tailPos = position + matched.length;
				var m = captures.length;
				var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
				if (namedCaptures !== undefined) {
					namedCaptures = toObject(namedCaptures);
					symbols = SUBSTITUTION_SYMBOLS;
				}
				return replace(replacement, symbols, function (match, ch) {
					var capture;
					switch (charAt(ch, 0)) {
						case "$":
							return "$";
						case "&":
							return matched;
						case "`":
							return stringSlice(str, 0, position);
						case "'":
							return stringSlice(str, tailPos);
						case "<":
							capture = namedCaptures[stringSlice(ch, 1, -1)];
							break;
						default: // \d\d?
							var n = +ch;
							if (n === 0) return match;
							if (n > m) {
								var f = floor(n / 10);
								if (f === 0) return match;
								if (f <= m)
									return captures[f - 1] === undefined
										? charAt(ch, 1)
										: captures[f - 1] + charAt(ch, 1);
								return match;
							}
							capture = captures[n - 1];
					}
					return capture === undefined ? "" : capture;
				});
			};

			/***/
		},

		/***/ 2474: /***/ function (module, __unused_webpack_exports, __webpack_require__) {
			"use strict";

			var check = function (it) {
				return it && it.Math === Math && it;
			};

			// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
			module.exports =
				// eslint-disable-next-line es/no-global-this -- safe
				check(typeof globalThis == "object" && globalThis) ||
				check(typeof window == "object" && window) ||
				// eslint-disable-next-line no-restricted-globals -- safe
				check(typeof self == "object" && self) ||
				check(typeof __webpack_require__.g == "object" && __webpack_require__.g) ||
				// eslint-disable-next-line no-new-func -- fallback
				(function () {
					return this;
				})() ||
				this ||
				Function("return this")();

			/***/
		},

		/***/ 2597: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);
			var toObject = __webpack_require__(7908);

			var hasOwnProperty = uncurryThis({}.hasOwnProperty);

			// `HasOwnProperty` abstract operation
			// https://tc39.es/ecma262/#sec-hasownproperty
			// eslint-disable-next-line es/no-object-hasown -- safe
			module.exports =
				Object.hasOwn ||
				function hasOwn(it, key) {
					return hasOwnProperty(toObject(it), key);
				};

			/***/
		},

		/***/ 3501: /***/ (module) => {
			"use strict";

			module.exports = {};

			/***/
		},

		/***/ 490: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var getBuiltIn = __webpack_require__(5005);

			module.exports = getBuiltIn("document", "documentElement");

			/***/
		},

		/***/ 4664: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var DESCRIPTORS = __webpack_require__(9781);
			var fails = __webpack_require__(7293);
			var createElement = __webpack_require__(317);

			// Thanks to IE8 for its funny defineProperty
			module.exports =
				!DESCRIPTORS &&
				!fails(function () {
					// eslint-disable-next-line es/no-object-defineproperty -- required for testing
					return (
						Object.defineProperty(createElement("div"), "a", {
							get: function () {
								return 7;
							},
						}).a !== 7
					);
				});

			/***/
		},

		/***/ 8361: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);
			var fails = __webpack_require__(7293);
			var classof = __webpack_require__(4326);

			var $Object = Object;
			var split = uncurryThis("".split);

			// fallback for non-array-like ES3 and non-enumerable old V8 strings
			module.exports = fails(function () {
				// throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
				// eslint-disable-next-line no-prototype-builtins -- safe
				return !$Object("z").propertyIsEnumerable(0);
			})
				? function (it) {
						return classof(it) === "String" ? split(it, "") : $Object(it);
				  }
				: $Object;

			/***/
		},

		/***/ 9587: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var isCallable = __webpack_require__(614);
			var isObject = __webpack_require__(111);
			var setPrototypeOf = __webpack_require__(7674);

			// makes subclassing work correct for wrapped built-ins
			module.exports = function ($this, dummy, Wrapper) {
				var NewTarget, NewTargetPrototype;
				if (
					// it can work only with native `setPrototypeOf`
					setPrototypeOf &&
					// we haven't completely correct pre-ES6 way for getting `new.target`, so use this
					isCallable((NewTarget = dummy.constructor)) &&
					NewTarget !== Wrapper &&
					isObject((NewTargetPrototype = NewTarget.prototype)) &&
					NewTargetPrototype !== Wrapper.prototype
				)
					setPrototypeOf($this, NewTargetPrototype);
				return $this;
			};

			/***/
		},

		/***/ 2788: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);
			var isCallable = __webpack_require__(614);
			var store = __webpack_require__(5465);

			var functionToString = uncurryThis(Function.toString);

			// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
			if (!isCallable(store.inspectSource)) {
				store.inspectSource = function (it) {
					return functionToString(it);
				};
			}

			module.exports = store.inspectSource;

			/***/
		},

		/***/ 2423: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var $ = __webpack_require__(2109);
			var uncurryThis = __webpack_require__(1702);
			var hiddenKeys = __webpack_require__(3501);
			var isObject = __webpack_require__(111);
			var hasOwn = __webpack_require__(2597);
			var defineProperty = __webpack_require__(3070).f;
			var getOwnPropertyNamesModule = __webpack_require__(8006);
			var getOwnPropertyNamesExternalModule = __webpack_require__(1156);
			var isExtensible = __webpack_require__(2050);
			var uid = __webpack_require__(9711);
			var FREEZING = __webpack_require__(6677);

			var REQUIRED = false;
			var METADATA = uid("meta");
			var id = 0;

			var setMetadata = function (it) {
				defineProperty(it, METADATA, {
					value: {
						objectID: "O" + id++, // object ID
						weakData: {}, // weak collections IDs
					},
				});
			};

			var fastKey = function (it, create) {
				// return a primitive with prefix
				if (!isObject(it)) return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
				if (!hasOwn(it, METADATA)) {
					// can't set metadata to uncaught frozen object
					if (!isExtensible(it)) return "F";
					// not necessary to add metadata
					if (!create) return "E";
					// add missing metadata
					setMetadata(it);
					// return object ID
				}
				return it[METADATA].objectID;
			};

			var getWeakData = function (it, create) {
				if (!hasOwn(it, METADATA)) {
					// can't set metadata to uncaught frozen object
					if (!isExtensible(it)) return true;
					// not necessary to add metadata
					if (!create) return false;
					// add missing metadata
					setMetadata(it);
					// return the store of weak collections IDs
				}
				return it[METADATA].weakData;
			};

			// add metadata on freeze-family methods calling
			var onFreeze = function (it) {
				if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
				return it;
			};

			var enable = function () {
				meta.enable = function () {
					/* empty */
				};
				REQUIRED = true;
				var getOwnPropertyNames = getOwnPropertyNamesModule.f;
				var splice = uncurryThis([].splice);
				var test = {};
				test[METADATA] = 1;

				// prevent exposing of metadata key
				if (getOwnPropertyNames(test).length) {
					getOwnPropertyNamesModule.f = function (it) {
						var result = getOwnPropertyNames(it);
						for (var i = 0, length = result.length; i < length; i++) {
							if (result[i] === METADATA) {
								splice(result, i, 1);
								break;
							}
						}
						return result;
					};

					$(
						{ target: "Object", stat: true, forced: true },
						{
							getOwnPropertyNames: getOwnPropertyNamesExternalModule.f,
						}
					);
				}
			};

			var meta = (module.exports = {
				enable: enable,
				fastKey: fastKey,
				getWeakData: getWeakData,
				onFreeze: onFreeze,
			});

			hiddenKeys[METADATA] = true;

			/***/
		},

		/***/ 9909: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var NATIVE_WEAK_MAP = __webpack_require__(4811);
			var global = __webpack_require__(2474);
			var isObject = __webpack_require__(111);
			var createNonEnumerableProperty = __webpack_require__(8880);
			var hasOwn = __webpack_require__(2597);
			var shared = __webpack_require__(5465);
			var sharedKey = __webpack_require__(6200);
			var hiddenKeys = __webpack_require__(3501);

			var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
			var TypeError = global.TypeError;
			var WeakMap = global.WeakMap;
			var set, get, has;

			var enforce = function (it) {
				return has(it) ? get(it) : set(it, {});
			};

			var getterFor = function (TYPE) {
				return function (it) {
					var state;
					if (!isObject(it) || (state = get(it)).type !== TYPE) {
						throw TypeError("Incompatible receiver, " + TYPE + " required");
					}
					return state;
				};
			};

			if (NATIVE_WEAK_MAP || shared.state) {
				var store = shared.state || (shared.state = new WeakMap());
				/* eslint-disable no-self-assign -- prototype methods protection */
				store.get = store.get;
				store.has = store.has;
				store.set = store.set;
				/* eslint-enable no-self-assign -- prototype methods protection */
				set = function (it, metadata) {
					if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
					metadata.facade = it;
					store.set(it, metadata);
					return metadata;
				};
				get = function (it) {
					return store.get(it) || {};
				};
				has = function (it) {
					return store.has(it);
				};
			} else {
				var STATE = sharedKey("state");
				hiddenKeys[STATE] = true;
				set = function (it, metadata) {
					if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
					metadata.facade = it;
					createNonEnumerableProperty(it, STATE, metadata);
					return metadata;
				};
				get = function (it) {
					return hasOwn(it, STATE) ? it[STATE] : {};
				};
				has = function (it) {
					return hasOwn(it, STATE);
				};
			}

			module.exports = {
				set: set,
				get: get,
				has: has,
				enforce: enforce,
				getterFor: getterFor,
			};

			/***/
		},

		/***/ 7659: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var wellKnownSymbol = __webpack_require__(5112);
			var Iterators = __webpack_require__(7497);

			var ITERATOR = wellKnownSymbol("iterator");
			var ArrayPrototype = Array.prototype;

			// check on default Array iterator
			module.exports = function (it) {
				return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
			};

			/***/
		},

		/***/ 3157: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var classof = __webpack_require__(4326);

			// `IsArray` abstract operation
			// https://tc39.es/ecma262/#sec-isarray
			// eslint-disable-next-line es/no-array-isarray -- safe
			module.exports =
				Array.isArray ||
				function isArray(argument) {
					return classof(argument) === "Array";
				};

			/***/
		},

		/***/ 614: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var $documentAll = __webpack_require__(4154);

			var documentAll = $documentAll.all;

			// `IsCallable` abstract operation
			// https://tc39.es/ecma262/#sec-iscallable
			module.exports = $documentAll.IS_HTMLDDA
				? function (argument) {
						return typeof argument == "function" || argument === documentAll;
				  }
				: function (argument) {
						return typeof argument == "function";
				  };

			/***/
		},

		/***/ 4411: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);
			var fails = __webpack_require__(7293);
			var isCallable = __webpack_require__(614);
			var classof = __webpack_require__(648);
			var getBuiltIn = __webpack_require__(5005);
			var inspectSource = __webpack_require__(2788);

			var noop = function () {
				/* empty */
			};
			var empty = [];
			var construct = getBuiltIn("Reflect", "construct");
			var constructorRegExp = /^\s*(?:class|function)\b/;
			var exec = uncurryThis(constructorRegExp.exec);
			var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

			var isConstructorModern = function isConstructor(argument) {
				if (!isCallable(argument)) return false;
				try {
					construct(noop, empty, argument);
					return true;
				} catch (error) {
					return false;
				}
			};

			var isConstructorLegacy = function isConstructor(argument) {
				if (!isCallable(argument)) return false;
				switch (classof(argument)) {
					case "AsyncFunction":
					case "GeneratorFunction":
					case "AsyncGeneratorFunction":
						return false;
				}
				try {
					// we can't check .prototype since constructors produced by .bind haven't it
					// `Function#toString` throws on some built-it function in some legacy engines
					// (for example, `DOMQuad` and similar in FF41-)
					return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
				} catch (error) {
					return true;
				}
			};

			isConstructorLegacy.sham = true;

			// `IsConstructor` abstract operation
			// https://tc39.es/ecma262/#sec-isconstructor
			module.exports =
				!construct ||
				fails(function () {
					var called;
					return (
						isConstructorModern(isConstructorModern.call) ||
						!isConstructorModern(Object) ||
						!isConstructorModern(function () {
							called = true;
						}) ||
						called
					);
				})
					? isConstructorLegacy
					: isConstructorModern;

			/***/
		},

		/***/ 4705: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var fails = __webpack_require__(7293);
			var isCallable = __webpack_require__(614);

			var replacement = /#|\.prototype\./;

			var isForced = function (feature, detection) {
				var value = data[normalize(feature)];
				return value === POLYFILL
					? true
					: value === NATIVE
					? false
					: isCallable(detection)
					? fails(detection)
					: !!detection;
			};

			var normalize = (isForced.normalize = function (string) {
				return String(string).replace(replacement, ".").toLowerCase();
			});

			var data = (isForced.data = {});
			var NATIVE = (isForced.NATIVE = "N");
			var POLYFILL = (isForced.POLYFILL = "P");

			module.exports = isForced;

			/***/
		},

		/***/ 8554: /***/ (module) => {
			"use strict";

			// we can't use just `it == null` since of `document.all` special case
			// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
			module.exports = function (it) {
				return it === null || it === undefined;
			};

			/***/
		},

		/***/ 111: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var isCallable = __webpack_require__(614);
			var $documentAll = __webpack_require__(4154);

			var documentAll = $documentAll.all;

			module.exports = $documentAll.IS_HTMLDDA
				? function (it) {
						return typeof it == "object" ? it !== null : isCallable(it) || it === documentAll;
				  }
				: function (it) {
						return typeof it == "object" ? it !== null : isCallable(it);
				  };

			/***/
		},

		/***/ 1913: /***/ (module) => {
			"use strict";

			module.exports = false;

			/***/
		},

		/***/ 2190: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var getBuiltIn = __webpack_require__(5005);
			var isCallable = __webpack_require__(614);
			var isPrototypeOf = __webpack_require__(7976);
			var USE_SYMBOL_AS_UID = __webpack_require__(3307);

			var $Object = Object;

			module.exports = USE_SYMBOL_AS_UID
				? function (it) {
						return typeof it == "symbol";
				  }
				: function (it) {
						var $Symbol = getBuiltIn("Symbol");
						return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
				  };

			/***/
		},

		/***/ 408: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var bind = __webpack_require__(9974);
			var call = __webpack_require__(6916);
			var anObject = __webpack_require__(9670);
			var tryToString = __webpack_require__(6330);
			var isArrayIteratorMethod = __webpack_require__(7659);
			var lengthOfArrayLike = __webpack_require__(6244);
			var isPrototypeOf = __webpack_require__(7976);
			var getIterator = __webpack_require__(4121);
			var getIteratorMethod = __webpack_require__(1246);
			var iteratorClose = __webpack_require__(9212);

			var $TypeError = TypeError;

			var Result = function (stopped, result) {
				this.stopped = stopped;
				this.result = result;
			};

			var ResultPrototype = Result.prototype;

			module.exports = function (iterable, unboundFunction, options) {
				var that = options && options.that;
				var AS_ENTRIES = !!(options && options.AS_ENTRIES);
				var IS_RECORD = !!(options && options.IS_RECORD);
				var IS_ITERATOR = !!(options && options.IS_ITERATOR);
				var INTERRUPTED = !!(options && options.INTERRUPTED);
				var fn = bind(unboundFunction, that);
				var iterator, iterFn, index, length, result, next, step;

				var stop = function (condition) {
					if (iterator) iteratorClose(iterator, "normal", condition);
					return new Result(true, condition);
				};

				var callFn = function (value) {
					if (AS_ENTRIES) {
						anObject(value);
						return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
					}
					return INTERRUPTED ? fn(value, stop) : fn(value);
				};

				if (IS_RECORD) {
					iterator = iterable.iterator;
				} else if (IS_ITERATOR) {
					iterator = iterable;
				} else {
					iterFn = getIteratorMethod(iterable);
					if (!iterFn) throw $TypeError(tryToString(iterable) + " is not iterable");
					// optimisation for array iterators
					if (isArrayIteratorMethod(iterFn)) {
						for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
							result = callFn(iterable[index]);
							if (result && isPrototypeOf(ResultPrototype, result)) return result;
						}
						return new Result(false);
					}
					iterator = getIterator(iterable, iterFn);
				}

				next = IS_RECORD ? iterable.next : iterator.next;
				while (!(step = call(next, iterator)).done) {
					try {
						result = callFn(step.value);
					} catch (error) {
						iteratorClose(iterator, "throw", error);
					}
					if (typeof result == "object" && result && isPrototypeOf(ResultPrototype, result)) return result;
				}
				return new Result(false);
			};

			/***/
		},

		/***/ 9212: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var call = __webpack_require__(6916);
			var anObject = __webpack_require__(9670);
			var getMethod = __webpack_require__(8173);

			module.exports = function (iterator, kind, value) {
				var innerResult, innerError;
				anObject(iterator);
				try {
					innerResult = getMethod(iterator, "return");
					if (!innerResult) {
						if (kind === "throw") throw value;
						return value;
					}
					innerResult = call(innerResult, iterator);
				} catch (error) {
					innerError = true;
					innerResult = error;
				}
				if (kind === "throw") throw value;
				if (innerError) throw innerResult;
				anObject(innerResult);
				return value;
			};

			/***/
		},

		/***/ 3061: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var IteratorPrototype = __webpack_require__(3383).IteratorPrototype;
			var create = __webpack_require__(30);
			var createPropertyDescriptor = __webpack_require__(9114);
			var setToStringTag = __webpack_require__(8003);
			var Iterators = __webpack_require__(7497);

			var returnThis = function () {
				return this;
			};

			module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
				var TO_STRING_TAG = NAME + " Iterator";
				IteratorConstructor.prototype = create(IteratorPrototype, {
					next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next),
				});
				setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
				Iterators[TO_STRING_TAG] = returnThis;
				return IteratorConstructor;
			};

			/***/
		},

		/***/ 1656: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var $ = __webpack_require__(2109);
			var call = __webpack_require__(6916);
			var IS_PURE = __webpack_require__(1913);
			var FunctionName = __webpack_require__(6530);
			var isCallable = __webpack_require__(614);
			var createIteratorConstructor = __webpack_require__(3061);
			var getPrototypeOf = __webpack_require__(9518);
			var setPrototypeOf = __webpack_require__(7674);
			var setToStringTag = __webpack_require__(8003);
			var createNonEnumerableProperty = __webpack_require__(8880);
			var defineBuiltIn = __webpack_require__(8052);
			var wellKnownSymbol = __webpack_require__(5112);
			var Iterators = __webpack_require__(7497);
			var IteratorsCore = __webpack_require__(3383);

			var PROPER_FUNCTION_NAME = FunctionName.PROPER;
			var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
			var IteratorPrototype = IteratorsCore.IteratorPrototype;
			var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
			var ITERATOR = wellKnownSymbol("iterator");
			var KEYS = "keys";
			var VALUES = "values";
			var ENTRIES = "entries";

			var returnThis = function () {
				return this;
			};

			module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
				createIteratorConstructor(IteratorConstructor, NAME, next);

				var getIterationMethod = function (KIND) {
					if (KIND === DEFAULT && defaultIterator) return defaultIterator;
					if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
					switch (KIND) {
						case KEYS:
							return function keys() {
								return new IteratorConstructor(this, KIND);
							};
						case VALUES:
							return function values() {
								return new IteratorConstructor(this, KIND);
							};
						case ENTRIES:
							return function entries() {
								return new IteratorConstructor(this, KIND);
							};
					}
					return function () {
						return new IteratorConstructor(this);
					};
				};

				var TO_STRING_TAG = NAME + " Iterator";
				var INCORRECT_VALUES_NAME = false;
				var IterablePrototype = Iterable.prototype;
				var nativeIterator =
					IterablePrototype[ITERATOR] ||
					IterablePrototype["@@iterator"] ||
					(DEFAULT && IterablePrototype[DEFAULT]);
				var defaultIterator = (!BUGGY_SAFARI_ITERATORS && nativeIterator) || getIterationMethod(DEFAULT);
				var anyNativeIterator = NAME === "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
				var CurrentIteratorPrototype, methods, KEY;

				// fix native
				if (anyNativeIterator) {
					CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
					if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
						if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
							if (setPrototypeOf) {
								setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
							} else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
								defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
							}
						}
						// Set @@toStringTag to native iterators
						setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
						if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
					}
				}

				// fix Array.prototype.{ values, @@iterator }.name in V8 / FF
				if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
					if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
						createNonEnumerableProperty(IterablePrototype, "name", VALUES);
					} else {
						INCORRECT_VALUES_NAME = true;
						defaultIterator = function values() {
							return call(nativeIterator, this);
						};
					}
				}

				// export additional methods
				if (DEFAULT) {
					methods = {
						values: getIterationMethod(VALUES),
						keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
						entries: getIterationMethod(ENTRIES),
					};
					if (FORCED)
						for (KEY in methods) {
							if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
								defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
							}
						}
					else
						$(
							{ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME },
							methods
						);
				}

				// define iterator
				if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
					defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
				}
				Iterators[NAME] = defaultIterator;

				return methods;
			};

			/***/
		},

		/***/ 3383: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var fails = __webpack_require__(7293);
			var isCallable = __webpack_require__(614);
			var isObject = __webpack_require__(111);
			var create = __webpack_require__(30);
			var getPrototypeOf = __webpack_require__(9518);
			var defineBuiltIn = __webpack_require__(8052);
			var wellKnownSymbol = __webpack_require__(5112);
			var IS_PURE = __webpack_require__(1913);

			var ITERATOR = wellKnownSymbol("iterator");
			var BUGGY_SAFARI_ITERATORS = false;

			// `%IteratorPrototype%` object
			// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
			var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

			/* eslint-disable es/no-array-prototype-keys -- safe */
			if ([].keys) {
				arrayIterator = [].keys();
				// Safari 8 has buggy iterators w/o `next`
				if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
				else {
					PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
					if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
						IteratorPrototype = PrototypeOfArrayIteratorPrototype;
				}
			}

			var NEW_ITERATOR_PROTOTYPE =
				!isObject(IteratorPrototype) ||
				fails(function () {
					var test = {};
					// FF44- legacy iterators case
					return IteratorPrototype[ITERATOR].call(test) !== test;
				});

			if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
			else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

			// `%IteratorPrototype%[@@iterator]()` method
			// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
			if (!isCallable(IteratorPrototype[ITERATOR])) {
				defineBuiltIn(IteratorPrototype, ITERATOR, function () {
					return this;
				});
			}

			module.exports = {
				IteratorPrototype: IteratorPrototype,
				BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS,
			};

			/***/
		},

		/***/ 7497: /***/ (module) => {
			"use strict";

			module.exports = {};

			/***/
		},

		/***/ 6244: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var toLength = __webpack_require__(7466);

			// `LengthOfArrayLike` abstract operation
			// https://tc39.es/ecma262/#sec-lengthofarraylike
			module.exports = function (obj) {
				return toLength(obj.length);
			};

			/***/
		},

		/***/ 6339: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);
			var fails = __webpack_require__(7293);
			var isCallable = __webpack_require__(614);
			var hasOwn = __webpack_require__(2597);
			var DESCRIPTORS = __webpack_require__(9781);
			var CONFIGURABLE_FUNCTION_NAME = __webpack_require__(6530).CONFIGURABLE;
			var inspectSource = __webpack_require__(2788);
			var InternalStateModule = __webpack_require__(9909);

			var enforceInternalState = InternalStateModule.enforce;
			var getInternalState = InternalStateModule.get;
			var $String = String;
			// eslint-disable-next-line es/no-object-defineproperty -- safe
			var defineProperty = Object.defineProperty;
			var stringSlice = uncurryThis("".slice);
			var replace = uncurryThis("".replace);
			var join = uncurryThis([].join);

			var CONFIGURABLE_LENGTH =
				DESCRIPTORS &&
				!fails(function () {
					return (
						defineProperty(
							function () {
								/* empty */
							},
							"length",
							{ value: 8 }
						).length !== 8
					);
				});

			var TEMPLATE = String(String).split("String");

			var makeBuiltIn = (module.exports = function (value, name, options) {
				if (stringSlice($String(name), 0, 7) === "Symbol(") {
					name = "[" + replace($String(name), /^Symbol\(([^)]*)\)/, "$1") + "]";
				}
				if (options && options.getter) name = "get " + name;
				if (options && options.setter) name = "set " + name;
				if (!hasOwn(value, "name") || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
					if (DESCRIPTORS) defineProperty(value, "name", { value: name, configurable: true });
					else value.name = name;
				}
				if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) {
					defineProperty(value, "length", { value: options.arity });
				}
				try {
					if (options && hasOwn(options, "constructor") && options.constructor) {
						if (DESCRIPTORS) defineProperty(value, "prototype", { writable: false });
						// in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
					} else if (value.prototype) value.prototype = undefined;
				} catch (error) {
					/* empty */
				}
				var state = enforceInternalState(value);
				if (!hasOwn(state, "source")) {
					state.source = join(TEMPLATE, typeof name == "string" ? name : "");
				}
				return value;
			});

			// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
			// eslint-disable-next-line no-extend-native -- required
			Function.prototype.toString = makeBuiltIn(function toString() {
				return (isCallable(this) && getInternalState(this).source) || inspectSource(this);
			}, "toString");

			/***/
		},

		/***/ 4758: /***/ (module) => {
			"use strict";

			var ceil = Math.ceil;
			var floor = Math.floor;

			// `Math.trunc` method
			// https://tc39.es/ecma262/#sec-math.trunc
			// eslint-disable-next-line es/no-math-trunc -- safe
			module.exports =
				Math.trunc ||
				function trunc(x) {
					var n = +x;
					return (n > 0 ? floor : ceil)(n);
				};

			/***/
		},

		/***/ 3009: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var global = __webpack_require__(2474);
			var fails = __webpack_require__(7293);
			var uncurryThis = __webpack_require__(1702);
			var toString = __webpack_require__(1340);
			var trim = __webpack_require__(3111).trim;
			var whitespaces = __webpack_require__(1361);

			var $parseInt = global.parseInt;
			var Symbol = global.Symbol;
			var ITERATOR = Symbol && Symbol.iterator;
			var hex = /^[+-]?0x/i;
			var exec = uncurryThis(hex.exec);
			var FORCED =
				$parseInt(whitespaces + "08") !== 8 ||
				$parseInt(whitespaces + "0x16") !== 22 ||
				// MS Edge 18- broken with boxed symbols
				(ITERATOR &&
					!fails(function () {
						$parseInt(Object(ITERATOR));
					}));

			// `parseInt` method
			// https://tc39.es/ecma262/#sec-parseint-string-radix
			module.exports = FORCED
				? function parseInt(string, radix) {
						var S = trim(toString(string));
						return $parseInt(S, radix >>> 0 || (exec(hex, S) ? 16 : 10));
				  }
				: $parseInt;

			/***/
		},

		/***/ 1574: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var DESCRIPTORS = __webpack_require__(9781);
			var uncurryThis = __webpack_require__(1702);
			var call = __webpack_require__(6916);
			var fails = __webpack_require__(7293);
			var objectKeys = __webpack_require__(1956);
			var getOwnPropertySymbolsModule = __webpack_require__(5181);
			var propertyIsEnumerableModule = __webpack_require__(5296);
			var toObject = __webpack_require__(7908);
			var IndexedObject = __webpack_require__(8361);

			// eslint-disable-next-line es/no-object-assign -- safe
			var $assign = Object.assign;
			// eslint-disable-next-line es/no-object-defineproperty -- required for testing
			var defineProperty = Object.defineProperty;
			var concat = uncurryThis([].concat);

			// `Object.assign` method
			// https://tc39.es/ecma262/#sec-object.assign
			module.exports =
				!$assign ||
				fails(function () {
					// should have correct order of operations (Edge bug)
					if (
						DESCRIPTORS &&
						$assign(
							{ b: 1 },
							$assign(
								defineProperty({}, "a", {
									enumerable: true,
									get: function () {
										defineProperty(this, "b", {
											value: 3,
											enumerable: false,
										});
									},
								}),
								{ b: 2 }
							)
						).b !== 1
					)
						return true;
					// should work with symbols and should have deterministic property order (V8 bug)
					var A = {};
					var B = {};
					// eslint-disable-next-line es/no-symbol -- safe
					var symbol = Symbol("assign detection");
					var alphabet = "abcdefghijklmnopqrst";
					A[symbol] = 7;
					alphabet.split("").forEach(function (chr) {
						B[chr] = chr;
					});
					return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join("") !== alphabet;
				})
					? function assign(target, source) {
							// eslint-disable-line no-unused-vars -- required for `.length`
							var T = toObject(target);
							var argumentsLength = arguments.length;
							var index = 1;
							var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
							var propertyIsEnumerable = propertyIsEnumerableModule.f;
							while (argumentsLength > index) {
								var S = IndexedObject(arguments[index++]);
								var keys = getOwnPropertySymbols
									? concat(objectKeys(S), getOwnPropertySymbols(S))
									: objectKeys(S);
								var length = keys.length;
								var j = 0;
								var key;
								while (length > j) {
									key = keys[j++];
									if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
								}
							}
							return T;
					  }
					: $assign;

			/***/
		},

		/***/ 30: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			/* global ActiveXObject -- old IE, WSH */
			var anObject = __webpack_require__(9670);
			var definePropertiesModule = __webpack_require__(6048);
			var enumBugKeys = __webpack_require__(748);
			var hiddenKeys = __webpack_require__(3501);
			var html = __webpack_require__(490);
			var documentCreateElement = __webpack_require__(317);
			var sharedKey = __webpack_require__(6200);

			var GT = ">";
			var LT = "<";
			var PROTOTYPE = "prototype";
			var SCRIPT = "script";
			var IE_PROTO = sharedKey("IE_PROTO");

			var EmptyConstructor = function () {
				/* empty */
			};

			var scriptTag = function (content) {
				return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
			};

			// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
			var NullProtoObjectViaActiveX = function (activeXDocument) {
				activeXDocument.write(scriptTag(""));
				activeXDocument.close();
				var temp = activeXDocument.parentWindow.Object;
				activeXDocument = null; // avoid memory leak
				return temp;
			};

			// Create object with fake `null` prototype: use iframe Object with cleared prototype
			var NullProtoObjectViaIFrame = function () {
				// Thrash, waste and sodomy: IE GC bug
				var iframe = documentCreateElement("iframe");
				var JS = "java" + SCRIPT + ":";
				var iframeDocument;
				iframe.style.display = "none";
				html.appendChild(iframe);
				// https://github.com/zloirock/core-js/issues/475
				iframe.src = String(JS);
				iframeDocument = iframe.contentWindow.document;
				iframeDocument.open();
				iframeDocument.write(scriptTag("document.F=Object"));
				iframeDocument.close();
				return iframeDocument.F;
			};

			// Check for document.domain and active x support
			// No need to use active x approach when document.domain is not set
			// see https://github.com/es-shims/es5-shim/issues/150
			// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
			// avoid IE GC bug
			var activeXDocument;
			var NullProtoObject = function () {
				try {
					activeXDocument = new ActiveXObject("htmlfile");
				} catch (error) {
					/* ignore */
				}
				NullProtoObject =
					typeof document != "undefined"
						? document.domain && activeXDocument
							? NullProtoObjectViaActiveX(activeXDocument) // old IE
							: NullProtoObjectViaIFrame()
						: NullProtoObjectViaActiveX(activeXDocument); // WSH
				var length = enumBugKeys.length;
				while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
				return NullProtoObject();
			};

			hiddenKeys[IE_PROTO] = true;

			// `Object.create` method
			// https://tc39.es/ecma262/#sec-object.create
			// eslint-disable-next-line es/no-object-create -- safe
			module.exports =
				Object.create ||
				function create(O, Properties) {
					var result;
					if (O !== null) {
						EmptyConstructor[PROTOTYPE] = anObject(O);
						result = new EmptyConstructor();
						EmptyConstructor[PROTOTYPE] = null;
						// add "__proto__" for Object.getPrototypeOf polyfill
						result[IE_PROTO] = O;
					} else result = NullProtoObject();
					return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
				};

			/***/
		},

		/***/ 6048: /***/ (__unused_webpack_module, exports, __webpack_require__) => {
			"use strict";

			var DESCRIPTORS = __webpack_require__(9781);
			var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
			var definePropertyModule = __webpack_require__(3070);
			var anObject = __webpack_require__(9670);
			var toIndexedObject = __webpack_require__(5656);
			var objectKeys = __webpack_require__(1956);

			// `Object.defineProperties` method
			// https://tc39.es/ecma262/#sec-object.defineproperties
			// eslint-disable-next-line es/no-object-defineproperties -- safe
			exports.f =
				DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG
					? Object.defineProperties
					: function defineProperties(O, Properties) {
							anObject(O);
							var props = toIndexedObject(Properties);
							var keys = objectKeys(Properties);
							var length = keys.length;
							var index = 0;
							var key;
							while (length > index) definePropertyModule.f(O, (key = keys[index++]), props[key]);
							return O;
					  };

			/***/
		},

		/***/ 3070: /***/ (__unused_webpack_module, exports, __webpack_require__) => {
			"use strict";

			var DESCRIPTORS = __webpack_require__(9781);
			var IE8_DOM_DEFINE = __webpack_require__(4664);
			var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
			var anObject = __webpack_require__(9670);
			var toPropertyKey = __webpack_require__(4948);

			var $TypeError = TypeError;
			// eslint-disable-next-line es/no-object-defineproperty -- safe
			var $defineProperty = Object.defineProperty;
			// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
			var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
			var ENUMERABLE = "enumerable";
			var CONFIGURABLE = "configurable";
			var WRITABLE = "writable";

			// `Object.defineProperty` method
			// https://tc39.es/ecma262/#sec-object.defineproperty
			exports.f = DESCRIPTORS
				? V8_PROTOTYPE_DEFINE_BUG
					? function defineProperty(O, P, Attributes) {
							anObject(O);
							P = toPropertyKey(P);
							anObject(Attributes);
							if (
								typeof O === "function" &&
								P === "prototype" &&
								"value" in Attributes &&
								WRITABLE in Attributes &&
								!Attributes[WRITABLE]
							) {
								var current = $getOwnPropertyDescriptor(O, P);
								if (current && current[WRITABLE]) {
									O[P] = Attributes.value;
									Attributes = {
										configurable:
											CONFIGURABLE in Attributes
												? Attributes[CONFIGURABLE]
												: current[CONFIGURABLE],
										enumerable:
											ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
										writable: false,
									};
								}
							}
							return $defineProperty(O, P, Attributes);
					  }
					: $defineProperty
				: function defineProperty(O, P, Attributes) {
						anObject(O);
						P = toPropertyKey(P);
						anObject(Attributes);
						if (IE8_DOM_DEFINE)
							try {
								return $defineProperty(O, P, Attributes);
							} catch (error) {
								/* empty */
							}
						if ("get" in Attributes || "set" in Attributes) throw $TypeError("Accessors not supported");
						if ("value" in Attributes) O[P] = Attributes.value;
						return O;
				  };

			/***/
		},

		/***/ 1236: /***/ (__unused_webpack_module, exports, __webpack_require__) => {
			"use strict";

			var DESCRIPTORS = __webpack_require__(9781);
			var call = __webpack_require__(6916);
			var propertyIsEnumerableModule = __webpack_require__(5296);
			var createPropertyDescriptor = __webpack_require__(9114);
			var toIndexedObject = __webpack_require__(5656);
			var toPropertyKey = __webpack_require__(4948);
			var hasOwn = __webpack_require__(2597);
			var IE8_DOM_DEFINE = __webpack_require__(4664);

			// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
			var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

			// `Object.getOwnPropertyDescriptor` method
			// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
			exports.f = DESCRIPTORS
				? $getOwnPropertyDescriptor
				: function getOwnPropertyDescriptor(O, P) {
						O = toIndexedObject(O);
						P = toPropertyKey(P);
						if (IE8_DOM_DEFINE)
							try {
								return $getOwnPropertyDescriptor(O, P);
							} catch (error) {
								/* empty */
							}
						if (hasOwn(O, P))
							return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
				  };

			/***/
		},

		/***/ 1156: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			/* eslint-disable es/no-object-getownpropertynames -- safe */
			var classof = __webpack_require__(4326);
			var toIndexedObject = __webpack_require__(5656);
			var $getOwnPropertyNames = __webpack_require__(8006).f;
			var arraySlice = __webpack_require__(1589);

			var windowNames =
				typeof window == "object" && window && Object.getOwnPropertyNames
					? Object.getOwnPropertyNames(window)
					: [];

			var getWindowNames = function (it) {
				try {
					return $getOwnPropertyNames(it);
				} catch (error) {
					return arraySlice(windowNames);
				}
			};

			// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
			module.exports.f = function getOwnPropertyNames(it) {
				return windowNames && classof(it) === "Window"
					? getWindowNames(it)
					: $getOwnPropertyNames(toIndexedObject(it));
			};

			/***/
		},

		/***/ 8006: /***/ (__unused_webpack_module, exports, __webpack_require__) => {
			"use strict";

			var internalObjectKeys = __webpack_require__(6324);
			var enumBugKeys = __webpack_require__(748);

			var hiddenKeys = enumBugKeys.concat("length", "prototype");

			// `Object.getOwnPropertyNames` method
			// https://tc39.es/ecma262/#sec-object.getownpropertynames
			// eslint-disable-next-line es/no-object-getownpropertynames -- safe
			exports.f =
				Object.getOwnPropertyNames ||
				function getOwnPropertyNames(O) {
					return internalObjectKeys(O, hiddenKeys);
				};

			/***/
		},

		/***/ 5181: /***/ (__unused_webpack_module, exports) => {
			"use strict";

			// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
			exports.f = Object.getOwnPropertySymbols;

			/***/
		},

		/***/ 9518: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var hasOwn = __webpack_require__(2597);
			var isCallable = __webpack_require__(614);
			var toObject = __webpack_require__(7908);
			var sharedKey = __webpack_require__(6200);
			var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

			var IE_PROTO = sharedKey("IE_PROTO");
			var $Object = Object;
			var ObjectPrototype = $Object.prototype;

			// `Object.getPrototypeOf` method
			// https://tc39.es/ecma262/#sec-object.getprototypeof
			// eslint-disable-next-line es/no-object-getprototypeof -- safe
			module.exports = CORRECT_PROTOTYPE_GETTER
				? $Object.getPrototypeOf
				: function (O) {
						var object = toObject(O);
						if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
						var constructor = object.constructor;
						if (isCallable(constructor) && object instanceof constructor) {
							return constructor.prototype;
						}
						return object instanceof $Object ? ObjectPrototype : null;
				  };

			/***/
		},

		/***/ 2050: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var fails = __webpack_require__(7293);
			var isObject = __webpack_require__(111);
			var classof = __webpack_require__(4326);
			var ARRAY_BUFFER_NON_EXTENSIBLE = __webpack_require__(7556);

			// eslint-disable-next-line es/no-object-isextensible -- safe
			var $isExtensible = Object.isExtensible;
			var FAILS_ON_PRIMITIVES = fails(function () {
				$isExtensible(1);
			});

			// `Object.isExtensible` method
			// https://tc39.es/ecma262/#sec-object.isextensible
			module.exports =
				FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE
					? function isExtensible(it) {
							if (!isObject(it)) return false;
							if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === "ArrayBuffer") return false;
							return $isExtensible ? $isExtensible(it) : true;
					  }
					: $isExtensible;

			/***/
		},

		/***/ 7976: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);

			module.exports = uncurryThis({}.isPrototypeOf);

			/***/
		},

		/***/ 6324: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);
			var hasOwn = __webpack_require__(2597);
			var toIndexedObject = __webpack_require__(5656);
			var indexOf = __webpack_require__(1318).indexOf;
			var hiddenKeys = __webpack_require__(3501);

			var push = uncurryThis([].push);

			module.exports = function (object, names) {
				var O = toIndexedObject(object);
				var i = 0;
				var result = [];
				var key;
				for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
				// Don't enum bug & hidden keys
				while (names.length > i)
					if (hasOwn(O, (key = names[i++]))) {
						~indexOf(result, key) || push(result, key);
					}
				return result;
			};

			/***/
		},

		/***/ 1956: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var internalObjectKeys = __webpack_require__(6324);
			var enumBugKeys = __webpack_require__(748);

			// `Object.keys` method
			// https://tc39.es/ecma262/#sec-object.keys
			// eslint-disable-next-line es/no-object-keys -- safe
			module.exports =
				Object.keys ||
				function keys(O) {
					return internalObjectKeys(O, enumBugKeys);
				};

			/***/
		},

		/***/ 5296: /***/ (__unused_webpack_module, exports) => {
			"use strict";

			var $propertyIsEnumerable = {}.propertyIsEnumerable;
			// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
			var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

			// Nashorn ~ JDK8 bug
			var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

			// `Object.prototype.propertyIsEnumerable` method implementation
			// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
			exports.f = NASHORN_BUG
				? function propertyIsEnumerable(V) {
						var descriptor = getOwnPropertyDescriptor(this, V);
						return !!descriptor && descriptor.enumerable;
				  }
				: $propertyIsEnumerable;

			/***/
		},

		/***/ 7674: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			/* eslint-disable no-proto -- safe */
			var uncurryThisAccessor = __webpack_require__(5668);
			var anObject = __webpack_require__(9670);
			var aPossiblePrototype = __webpack_require__(6077);

			// `Object.setPrototypeOf` method
			// https://tc39.es/ecma262/#sec-object.setprototypeof
			// Works with __proto__ only. Old v8 can't work with null proto objects.
			// eslint-disable-next-line es/no-object-setprototypeof -- safe
			module.exports =
				Object.setPrototypeOf ||
				("__proto__" in {}
					? (function () {
							var CORRECT_SETTER = false;
							var test = {};
							var setter;
							try {
								setter = uncurryThisAccessor(Object.prototype, "__proto__", "set");
								setter(test, []);
								CORRECT_SETTER = test instanceof Array;
							} catch (error) {
								/* empty */
							}
							return function setPrototypeOf(O, proto) {
								anObject(O);
								aPossiblePrototype(proto);
								if (CORRECT_SETTER) setter(O, proto);
								else O.__proto__ = proto;
								return O;
							};
					  })()
					: undefined);

			/***/
		},

		/***/ 288: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
			var classof = __webpack_require__(648);

			// `Object.prototype.toString` method implementation
			// https://tc39.es/ecma262/#sec-object.prototype.tostring
			module.exports = TO_STRING_TAG_SUPPORT
				? {}.toString
				: function toString() {
						return "[object " + classof(this) + "]";
				  };

			/***/
		},

		/***/ 2140: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var call = __webpack_require__(6916);
			var isCallable = __webpack_require__(614);
			var isObject = __webpack_require__(111);

			var $TypeError = TypeError;

			// `OrdinaryToPrimitive` abstract operation
			// https://tc39.es/ecma262/#sec-ordinarytoprimitive
			module.exports = function (input, pref) {
				var fn, val;
				if (pref === "string" && isCallable((fn = input.toString)) && !isObject((val = call(fn, input))))
					return val;
				if (isCallable((fn = input.valueOf)) && !isObject((val = call(fn, input)))) return val;
				if (pref !== "string" && isCallable((fn = input.toString)) && !isObject((val = call(fn, input))))
					return val;
				throw $TypeError("Can't convert object to primitive value");
			};

			/***/
		},

		/***/ 3887: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var getBuiltIn = __webpack_require__(5005);
			var uncurryThis = __webpack_require__(1702);
			var getOwnPropertyNamesModule = __webpack_require__(8006);
			var getOwnPropertySymbolsModule = __webpack_require__(5181);
			var anObject = __webpack_require__(9670);

			var concat = uncurryThis([].concat);

			// all object keys, includes non-enumerable and symbols
			module.exports =
				getBuiltIn("Reflect", "ownKeys") ||
				function ownKeys(it) {
					var keys = getOwnPropertyNamesModule.f(anObject(it));
					var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
					return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
				};

			/***/
		},

		/***/ 7651: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var call = __webpack_require__(6916);
			var anObject = __webpack_require__(9670);
			var isCallable = __webpack_require__(614);
			var classof = __webpack_require__(4326);
			var regexpExec = __webpack_require__(2261);

			var $TypeError = TypeError;

			// `RegExpExec` abstract operation
			// https://tc39.es/ecma262/#sec-regexpexec
			module.exports = function (R, S) {
				var exec = R.exec;
				if (isCallable(exec)) {
					var result = call(exec, R, S);
					if (result !== null) anObject(result);
					return result;
				}
				if (classof(R) === "RegExp") return call(regexpExec, R, S);
				throw $TypeError("RegExp#exec called on incompatible receiver");
			};

			/***/
		},

		/***/ 2261: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
			/* eslint-disable regexp/no-useless-quantifier -- testing */
			var call = __webpack_require__(6916);
			var uncurryThis = __webpack_require__(1702);
			var toString = __webpack_require__(1340);
			var regexpFlags = __webpack_require__(7066);
			var stickyHelpers = __webpack_require__(2999);
			var shared = __webpack_require__(2309);
			var create = __webpack_require__(30);
			var getInternalState = __webpack_require__(9909).get;
			var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
			var UNSUPPORTED_NCG = __webpack_require__(7168);

			var nativeReplace = shared("native-string-replace", String.prototype.replace);
			var nativeExec = RegExp.prototype.exec;
			var patchedExec = nativeExec;
			var charAt = uncurryThis("".charAt);
			var indexOf = uncurryThis("".indexOf);
			var replace = uncurryThis("".replace);
			var stringSlice = uncurryThis("".slice);

			var UPDATES_LAST_INDEX_WRONG = (function () {
				var re1 = /a/;
				var re2 = /b*/g;
				call(nativeExec, re1, "a");
				call(nativeExec, re2, "a");
				return re1.lastIndex !== 0 || re2.lastIndex !== 0;
			})();

			var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

			// nonparticipating capturing group, copied from es5-shim's String#split patch.
			var NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;

			var PATCH =
				UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

			if (PATCH) {
				patchedExec = function exec(string) {
					var re = this;
					var state = getInternalState(re);
					var str = toString(string);
					var raw = state.raw;
					var result, reCopy, lastIndex, match, i, object, group;

					if (raw) {
						raw.lastIndex = re.lastIndex;
						result = call(patchedExec, raw, str);
						re.lastIndex = raw.lastIndex;
						return result;
					}

					var groups = state.groups;
					var sticky = UNSUPPORTED_Y && re.sticky;
					var flags = call(regexpFlags, re);
					var source = re.source;
					var charsAdded = 0;
					var strCopy = str;

					if (sticky) {
						flags = replace(flags, "y", "");
						if (indexOf(flags, "g") === -1) {
							flags += "g";
						}

						strCopy = stringSlice(str, re.lastIndex);
						// Support anchored sticky behavior.
						if (
							re.lastIndex > 0 &&
							(!re.multiline || (re.multiline && charAt(str, re.lastIndex - 1) !== "\n"))
						) {
							source = "(?: " + source + ")";
							strCopy = " " + strCopy;
							charsAdded++;
						}
						// ^(? + rx + ) is needed, in combination with some str slicing, to
						// simulate the 'y' flag.
						reCopy = new RegExp("^(?:" + source + ")", flags);
					}

					if (NPCG_INCLUDED) {
						reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
					}
					if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

					match = call(nativeExec, sticky ? reCopy : re, strCopy);

					if (sticky) {
						if (match) {
							match.input = stringSlice(match.input, charsAdded);
							match[0] = stringSlice(match[0], charsAdded);
							match.index = re.lastIndex;
							re.lastIndex += match[0].length;
						} else re.lastIndex = 0;
					} else if (UPDATES_LAST_INDEX_WRONG && match) {
						re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
					}
					if (NPCG_INCLUDED && match && match.length > 1) {
						// Fix browsers whose `exec` methods don't consistently return `undefined`
						// for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
						call(nativeReplace, match[0], reCopy, function () {
							for (i = 1; i < arguments.length - 2; i++) {
								if (arguments[i] === undefined) match[i] = undefined;
							}
						});
					}

					if (match && groups) {
						match.groups = object = create(null);
						for (i = 0; i < groups.length; i++) {
							group = groups[i];
							object[group[0]] = match[group[1]];
						}
					}

					return match;
				};
			}

			module.exports = patchedExec;

			/***/
		},

		/***/ 7066: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var anObject = __webpack_require__(9670);

			// `RegExp.prototype.flags` getter implementation
			// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
			module.exports = function () {
				var that = anObject(this);
				var result = "";
				if (that.hasIndices) result += "d";
				if (that.global) result += "g";
				if (that.ignoreCase) result += "i";
				if (that.multiline) result += "m";
				if (that.dotAll) result += "s";
				if (that.unicode) result += "u";
				if (that.unicodeSets) result += "v";
				if (that.sticky) result += "y";
				return result;
			};

			/***/
		},

		/***/ 2999: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var fails = __webpack_require__(7293);
			var global = __webpack_require__(2474);

			// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
			var $RegExp = global.RegExp;

			var UNSUPPORTED_Y = fails(function () {
				var re = $RegExp("a", "y");
				re.lastIndex = 2;
				return re.exec("abcd") !== null;
			});

			// UC Browser bug
			// https://github.com/zloirock/core-js/issues/1008
			var MISSED_STICKY =
				UNSUPPORTED_Y ||
				fails(function () {
					return !$RegExp("a", "y").sticky;
				});

			var BROKEN_CARET =
				UNSUPPORTED_Y ||
				fails(function () {
					// https://bugzilla.mozilla.org/show_bug.cgi?id=773687
					var re = $RegExp("^r", "gy");
					re.lastIndex = 2;
					return re.exec("str") !== null;
				});

			module.exports = {
				BROKEN_CARET: BROKEN_CARET,
				MISSED_STICKY: MISSED_STICKY,
				UNSUPPORTED_Y: UNSUPPORTED_Y,
			};

			/***/
		},

		/***/ 9441: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var fails = __webpack_require__(7293);
			var global = __webpack_require__(2474);

			// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
			var $RegExp = global.RegExp;

			module.exports = fails(function () {
				var re = $RegExp(".", "s");
				return !(re.dotAll && re.exec("\n") && re.flags === "s");
			});

			/***/
		},

		/***/ 7168: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var fails = __webpack_require__(7293);
			var global = __webpack_require__(2474);

			// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
			var $RegExp = global.RegExp;

			module.exports = fails(function () {
				var re = $RegExp("(?<a>b)", "g");
				return re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc";
			});

			/***/
		},

		/***/ 4488: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var isNullOrUndefined = __webpack_require__(8554);

			var $TypeError = TypeError;

			// `RequireObjectCoercible` abstract operation
			// https://tc39.es/ecma262/#sec-requireobjectcoercible
			module.exports = function (it) {
				if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
				return it;
			};

			/***/
		},

		/***/ 8003: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var defineProperty = __webpack_require__(3070).f;
			var hasOwn = __webpack_require__(2597);
			var wellKnownSymbol = __webpack_require__(5112);

			var TO_STRING_TAG = wellKnownSymbol("toStringTag");

			module.exports = function (target, TAG, STATIC) {
				if (target && !STATIC) target = target.prototype;
				if (target && !hasOwn(target, TO_STRING_TAG)) {
					defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
				}
			};

			/***/
		},

		/***/ 6200: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var shared = __webpack_require__(2309);
			var uid = __webpack_require__(9711);

			var keys = shared("keys");

			module.exports = function (key) {
				return keys[key] || (keys[key] = uid(key));
			};

			/***/
		},

		/***/ 5465: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var global = __webpack_require__(2474);
			var defineGlobalProperty = __webpack_require__(3072);

			var SHARED = "__core-js_shared__";
			var store = global[SHARED] || defineGlobalProperty(SHARED, {});

			module.exports = store;

			/***/
		},

		/***/ 2309: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var IS_PURE = __webpack_require__(1913);
			var store = __webpack_require__(5465);

			(module.exports = function (key, value) {
				return store[key] || (store[key] = value !== undefined ? value : {});
			})("versions", []).push({
				version: "3.32.1",
				mode: IS_PURE ? "pure" : "global",
				copyright: "© 2014-2023 Denis Pushkarev (zloirock.ru)",
				license: "https://github.com/zloirock/core-js/blob/v3.32.1/LICENSE",
				source: "https://github.com/zloirock/core-js",
			});

			/***/
		},

		/***/ 8710: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);
			var toIntegerOrInfinity = __webpack_require__(9303);
			var toString = __webpack_require__(1340);
			var requireObjectCoercible = __webpack_require__(4488);

			var charAt = uncurryThis("".charAt);
			var charCodeAt = uncurryThis("".charCodeAt);
			var stringSlice = uncurryThis("".slice);

			var createMethod = function (CONVERT_TO_STRING) {
				return function ($this, pos) {
					var S = toString(requireObjectCoercible($this));
					var position = toIntegerOrInfinity(pos);
					var size = S.length;
					var first, second;
					if (position < 0 || position >= size) return CONVERT_TO_STRING ? "" : undefined;
					first = charCodeAt(S, position);
					return first < 0xd800 ||
						first > 0xdbff ||
						position + 1 === size ||
						(second = charCodeAt(S, position + 1)) < 0xdc00 ||
						second > 0xdfff
						? CONVERT_TO_STRING
							? charAt(S, position)
							: first
						: CONVERT_TO_STRING
						? stringSlice(S, position, position + 2)
						: ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
				};
			};

			module.exports = {
				// `String.prototype.codePointAt` method
				// https://tc39.es/ecma262/#sec-string.prototype.codepointat
				codeAt: createMethod(false),
				// `String.prototype.at` method
				// https://github.com/mathiasbynens/String.prototype.at
				charAt: createMethod(true),
			};

			/***/
		},

		/***/ 3111: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);
			var requireObjectCoercible = __webpack_require__(4488);
			var toString = __webpack_require__(1340);
			var whitespaces = __webpack_require__(1361);

			var replace = uncurryThis("".replace);
			var ltrim = RegExp("^[" + whitespaces + "]+");
			var rtrim = RegExp("(^|[^" + whitespaces + "])[" + whitespaces + "]+$");

			// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
			var createMethod = function (TYPE) {
				return function ($this) {
					var string = toString(requireObjectCoercible($this));
					if (TYPE & 1) string = replace(string, ltrim, "");
					if (TYPE & 2) string = replace(string, rtrim, "$1");
					return string;
				};
			};

			module.exports = {
				// `String.prototype.{ trimLeft, trimStart }` methods
				// https://tc39.es/ecma262/#sec-string.prototype.trimstart
				start: createMethod(1),
				// `String.prototype.{ trimRight, trimEnd }` methods
				// https://tc39.es/ecma262/#sec-string.prototype.trimend
				end: createMethod(2),
				// `String.prototype.trim` method
				// https://tc39.es/ecma262/#sec-string.prototype.trim
				trim: createMethod(3),
			};

			/***/
		},

		/***/ 6293: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			/* eslint-disable es/no-symbol -- required for testing */
			var V8_VERSION = __webpack_require__(7392);
			var fails = __webpack_require__(7293);
			var global = __webpack_require__(2474);

			var $String = global.String;

			// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
			module.exports =
				!!Object.getOwnPropertySymbols &&
				!fails(function () {
					var symbol = Symbol("symbol detection");
					// Chrome 38 Symbol has incorrect toString conversion
					// `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
					// nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
					// of course, fail.
					return (
						!$String(symbol) ||
						!(Object(symbol) instanceof Symbol) ||
						// Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
						(!Symbol.sham && V8_VERSION && V8_VERSION < 41)
					);
				});

			/***/
		},

		/***/ 1400: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var toIntegerOrInfinity = __webpack_require__(9303);

			var max = Math.max;
			var min = Math.min;

			// Helper for a popular repeating case of the spec:
			// Let integer be ? ToInteger(index).
			// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
			module.exports = function (index, length) {
				var integer = toIntegerOrInfinity(index);
				return integer < 0 ? max(integer + length, 0) : min(integer, length);
			};

			/***/
		},

		/***/ 5656: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			// toObject with fallback for non-array-like ES3 strings
			var IndexedObject = __webpack_require__(8361);
			var requireObjectCoercible = __webpack_require__(4488);

			module.exports = function (it) {
				return IndexedObject(requireObjectCoercible(it));
			};

			/***/
		},

		/***/ 9303: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var trunc = __webpack_require__(4758);

			// `ToIntegerOrInfinity` abstract operation
			// https://tc39.es/ecma262/#sec-tointegerorinfinity
			module.exports = function (argument) {
				var number = +argument;
				// eslint-disable-next-line no-self-compare -- NaN check
				return number !== number || number === 0 ? 0 : trunc(number);
			};

			/***/
		},

		/***/ 7466: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var toIntegerOrInfinity = __webpack_require__(9303);

			var min = Math.min;

			// `ToLength` abstract operation
			// https://tc39.es/ecma262/#sec-tolength
			module.exports = function (argument) {
				return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1fffffffffffff) : 0; // 2 ** 53 - 1 == 9007199254740991
			};

			/***/
		},

		/***/ 7908: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var requireObjectCoercible = __webpack_require__(4488);

			var $Object = Object;

			// `ToObject` abstract operation
			// https://tc39.es/ecma262/#sec-toobject
			module.exports = function (argument) {
				return $Object(requireObjectCoercible(argument));
			};

			/***/
		},

		/***/ 7593: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var call = __webpack_require__(6916);
			var isObject = __webpack_require__(111);
			var isSymbol = __webpack_require__(2190);
			var getMethod = __webpack_require__(8173);
			var ordinaryToPrimitive = __webpack_require__(2140);
			var wellKnownSymbol = __webpack_require__(5112);

			var $TypeError = TypeError;
			var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");

			// `ToPrimitive` abstract operation
			// https://tc39.es/ecma262/#sec-toprimitive
			module.exports = function (input, pref) {
				if (!isObject(input) || isSymbol(input)) return input;
				var exoticToPrim = getMethod(input, TO_PRIMITIVE);
				var result;
				if (exoticToPrim) {
					if (pref === undefined) pref = "default";
					result = call(exoticToPrim, input, pref);
					if (!isObject(result) || isSymbol(result)) return result;
					throw $TypeError("Can't convert object to primitive value");
				}
				if (pref === undefined) pref = "number";
				return ordinaryToPrimitive(input, pref);
			};

			/***/
		},

		/***/ 4948: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var toPrimitive = __webpack_require__(7593);
			var isSymbol = __webpack_require__(2190);

			// `ToPropertyKey` abstract operation
			// https://tc39.es/ecma262/#sec-topropertykey
			module.exports = function (argument) {
				var key = toPrimitive(argument, "string");
				return isSymbol(key) ? key : key + "";
			};

			/***/
		},

		/***/ 1694: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var wellKnownSymbol = __webpack_require__(5112);

			var TO_STRING_TAG = wellKnownSymbol("toStringTag");
			var test = {};

			test[TO_STRING_TAG] = "z";

			module.exports = String(test) === "[object z]";

			/***/
		},

		/***/ 1340: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var classof = __webpack_require__(648);

			var $String = String;

			module.exports = function (argument) {
				if (classof(argument) === "Symbol") throw TypeError("Cannot convert a Symbol value to a string");
				return $String(argument);
			};

			/***/
		},

		/***/ 6330: /***/ (module) => {
			"use strict";

			var $String = String;

			module.exports = function (argument) {
				try {
					return $String(argument);
				} catch (error) {
					return "Object";
				}
			};

			/***/
		},

		/***/ 9711: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var uncurryThis = __webpack_require__(1702);

			var id = 0;
			var postfix = Math.random();
			var toString = uncurryThis((1.0).toString);

			module.exports = function (key) {
				return "Symbol(" + (key === undefined ? "" : key) + ")_" + toString(++id + postfix, 36);
			};

			/***/
		},

		/***/ 3307: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			/* eslint-disable es/no-symbol -- required for testing */
			var NATIVE_SYMBOL = __webpack_require__(6293);

			module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";

			/***/
		},

		/***/ 3353: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var DESCRIPTORS = __webpack_require__(9781);
			var fails = __webpack_require__(7293);

			// V8 ~ Chrome 36-
			// https://bugs.chromium.org/p/v8/issues/detail?id=3334
			module.exports =
				DESCRIPTORS &&
				fails(function () {
					// eslint-disable-next-line es/no-object-defineproperty -- required for testing
					return (
						Object.defineProperty(
							function () {
								/* empty */
							},
							"prototype",
							{
								value: 42,
								writable: false,
							}
						).prototype !== 42
					);
				});

			/***/
		},

		/***/ 4811: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var global = __webpack_require__(2474);
			var isCallable = __webpack_require__(614);

			var WeakMap = global.WeakMap;

			module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

			/***/
		},

		/***/ 5112: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var global = __webpack_require__(2474);
			var shared = __webpack_require__(2309);
			var hasOwn = __webpack_require__(2597);
			var uid = __webpack_require__(9711);
			var NATIVE_SYMBOL = __webpack_require__(6293);
			var USE_SYMBOL_AS_UID = __webpack_require__(3307);

			var Symbol = global.Symbol;
			var WellKnownSymbolsStore = shared("wks");
			var createWellKnownSymbol = USE_SYMBOL_AS_UID
				? Symbol["for"] || Symbol
				: (Symbol && Symbol.withoutSetter) || uid;

			module.exports = function (name) {
				if (!hasOwn(WellKnownSymbolsStore, name)) {
					WellKnownSymbolsStore[name] =
						NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol("Symbol." + name);
				}
				return WellKnownSymbolsStore[name];
			};

			/***/
		},

		/***/ 1361: /***/ (module) => {
			"use strict";

			// a string of all valid unicode whitespaces
			module.exports =
				"\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002" +
				"\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

			/***/
		},

		/***/ 7327: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var $ = __webpack_require__(2109);
			var $filter = __webpack_require__(2092).filter;
			var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

			var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");

			// `Array.prototype.filter` method
			// https://tc39.es/ecma262/#sec-array.prototype.filter
			// with adding support of @@species
			$(
				{ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT },
				{
					filter: function filter(callbackfn /* , thisArg */) {
						return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
					},
				}
			);

			/***/
		},

		/***/ 6992: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var toIndexedObject = __webpack_require__(5656);
			var addToUnscopables = __webpack_require__(1223);
			var Iterators = __webpack_require__(7497);
			var InternalStateModule = __webpack_require__(9909);
			var defineProperty = __webpack_require__(3070).f;
			var defineIterator = __webpack_require__(1656);
			var createIterResultObject = __webpack_require__(6178);
			var IS_PURE = __webpack_require__(1913);
			var DESCRIPTORS = __webpack_require__(9781);

			var ARRAY_ITERATOR = "Array Iterator";
			var setInternalState = InternalStateModule.set;
			var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

			// `Array.prototype.entries` method
			// https://tc39.es/ecma262/#sec-array.prototype.entries
			// `Array.prototype.keys` method
			// https://tc39.es/ecma262/#sec-array.prototype.keys
			// `Array.prototype.values` method
			// https://tc39.es/ecma262/#sec-array.prototype.values
			// `Array.prototype[@@iterator]` method
			// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
			// `CreateArrayIterator` internal method
			// https://tc39.es/ecma262/#sec-createarrayiterator
			module.exports = defineIterator(
				Array,
				"Array",
				function (iterated, kind) {
					setInternalState(this, {
						type: ARRAY_ITERATOR,
						target: toIndexedObject(iterated), // target
						index: 0, // next index
						kind: kind, // kind
					});
					// `%ArrayIteratorPrototype%.next` method
					// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
				},
				function () {
					var state = getInternalState(this);
					var target = state.target;
					var kind = state.kind;
					var index = state.index++;
					if (!target || index >= target.length) {
						state.target = undefined;
						return createIterResultObject(undefined, true);
					}
					switch (kind) {
						case "keys":
							return createIterResultObject(index, false);
						case "values":
							return createIterResultObject(target[index], false);
					}
					return createIterResultObject([index, target[index]], false);
				},
				"values"
			);

			// argumentsList[@@iterator] is %ArrayProto_values%
			// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
			// https://tc39.es/ecma262/#sec-createmappedargumentsobject
			var values = (Iterators.Arguments = Iterators.Array);

			// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
			addToUnscopables("keys");
			addToUnscopables("values");
			addToUnscopables("entries");

			// V8 ~ Chrome 45- bug
			if (!IS_PURE && DESCRIPTORS && values.name !== "values")
				try {
					defineProperty(values, "name", { value: "values" });
				} catch (error) {
					/* empty */
				}

			/***/
		},

		/***/ 5827: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var $ = __webpack_require__(2109);
			var $reduce = __webpack_require__(3671).left;
			var arrayMethodIsStrict = __webpack_require__(9341);
			var CHROME_VERSION = __webpack_require__(7392);
			var IS_NODE = __webpack_require__(5268);

			// Chrome 80-82 has a critical bug
			// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
			var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
			var FORCED = CHROME_BUG || !arrayMethodIsStrict("reduce");

			// `Array.prototype.reduce` method
			// https://tc39.es/ecma262/#sec-array.prototype.reduce
			$(
				{ target: "Array", proto: true, forced: FORCED },
				{
					reduce: function reduce(callbackfn /* , initialValue */) {
						var length = arguments.length;
						return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
					},
				}
			);

			/***/
		},

		/***/ 8309: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var DESCRIPTORS = __webpack_require__(9781);
			var FUNCTION_NAME_EXISTS = __webpack_require__(6530).EXISTS;
			var uncurryThis = __webpack_require__(1702);
			var defineBuiltInAccessor = __webpack_require__(7045);

			var FunctionPrototype = Function.prototype;
			var functionToString = uncurryThis(FunctionPrototype.toString);
			var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
			var regExpExec = uncurryThis(nameRE.exec);
			var NAME = "name";

			// Function instances `.name` property
			// https://tc39.es/ecma262/#sec-function-instances-name
			if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
				defineBuiltInAccessor(FunctionPrototype, NAME, {
					configurable: true,
					get: function () {
						try {
							return regExpExec(nameRE, functionToString(this))[1];
						} catch (error) {
							return "";
						}
					},
				});
			}

			/***/
		},

		/***/ 9601: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var $ = __webpack_require__(2109);
			var assign = __webpack_require__(1574);

			// `Object.assign` method
			// https://tc39.es/ecma262/#sec-object.assign
			// eslint-disable-next-line es/no-object-assign -- required for testing
			$(
				{ target: "Object", stat: true, arity: 2, forced: Object.assign !== assign },
				{
					assign: assign,
				}
			);

			/***/
		},

		/***/ 1539: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
			var defineBuiltIn = __webpack_require__(8052);
			var toString = __webpack_require__(288);

			// `Object.prototype.toString` method
			// https://tc39.es/ecma262/#sec-object.prototype.tostring
			if (!TO_STRING_TAG_SUPPORT) {
				defineBuiltIn(Object.prototype, "toString", toString, { unsafe: true });
			}

			/***/
		},

		/***/ 1058: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var $ = __webpack_require__(2109);
			var $parseInt = __webpack_require__(3009);

			// `parseInt` method
			// https://tc39.es/ecma262/#sec-parseint-string-radix
			$(
				{ global: true, forced: parseInt !== $parseInt },
				{
					parseInt: $parseInt,
				}
			);

			/***/
		},

		/***/ 4916: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var $ = __webpack_require__(2109);
			var exec = __webpack_require__(2261);

			// `RegExp.prototype.exec` method
			// https://tc39.es/ecma262/#sec-regexp.prototype.exec
			$(
				{ target: "RegExp", proto: true, forced: /./.exec !== exec },
				{
					exec: exec,
				}
			);

			/***/
		},

		/***/ 8783: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var charAt = __webpack_require__(8710).charAt;
			var toString = __webpack_require__(1340);
			var InternalStateModule = __webpack_require__(9909);
			var defineIterator = __webpack_require__(1656);
			var createIterResultObject = __webpack_require__(6178);

			var STRING_ITERATOR = "String Iterator";
			var setInternalState = InternalStateModule.set;
			var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

			// `String.prototype[@@iterator]` method
			// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
			defineIterator(
				String,
				"String",
				function (iterated) {
					setInternalState(this, {
						type: STRING_ITERATOR,
						string: toString(iterated),
						index: 0,
					});
					// `%StringIteratorPrototype%.next` method
					// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
				},
				function next() {
					var state = getInternalState(this);
					var string = state.string;
					var index = state.index;
					var point;
					if (index >= string.length) return createIterResultObject(undefined, true);
					point = charAt(string, index);
					state.index += point.length;
					return createIterResultObject(point, false);
				}
			);

			/***/
		},

		/***/ 4723: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var call = __webpack_require__(6916);
			var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
			var anObject = __webpack_require__(9670);
			var isNullOrUndefined = __webpack_require__(8554);
			var toLength = __webpack_require__(7466);
			var toString = __webpack_require__(1340);
			var requireObjectCoercible = __webpack_require__(4488);
			var getMethod = __webpack_require__(8173);
			var advanceStringIndex = __webpack_require__(1530);
			var regExpExec = __webpack_require__(7651);

			// @@match logic
			fixRegExpWellKnownSymbolLogic("match", function (MATCH, nativeMatch, maybeCallNative) {
				return [
					// `String.prototype.match` method
					// https://tc39.es/ecma262/#sec-string.prototype.match
					function match(regexp) {
						var O = requireObjectCoercible(this);
						var matcher = isNullOrUndefined(regexp) ? undefined : getMethod(regexp, MATCH);
						return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
					},
					// `RegExp.prototype[@@match]` method
					// https://tc39.es/ecma262/#sec-regexp.prototype-@@match
					function (string) {
						var rx = anObject(this);
						var S = toString(string);
						var res = maybeCallNative(nativeMatch, rx, S);

						if (res.done) return res.value;

						if (!rx.global) return regExpExec(rx, S);

						var fullUnicode = rx.unicode;
						rx.lastIndex = 0;
						var A = [];
						var n = 0;
						var result;
						while ((result = regExpExec(rx, S)) !== null) {
							var matchStr = toString(result[0]);
							A[n] = matchStr;
							if (matchStr === "")
								rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
							n++;
						}
						return n === 0 ? null : A;
					},
				];
			});

			/***/
		},

		/***/ 5306: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var apply = __webpack_require__(2104);
			var call = __webpack_require__(6916);
			var uncurryThis = __webpack_require__(1702);
			var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
			var fails = __webpack_require__(7293);
			var anObject = __webpack_require__(9670);
			var isCallable = __webpack_require__(614);
			var isNullOrUndefined = __webpack_require__(8554);
			var toIntegerOrInfinity = __webpack_require__(9303);
			var toLength = __webpack_require__(7466);
			var toString = __webpack_require__(1340);
			var requireObjectCoercible = __webpack_require__(4488);
			var advanceStringIndex = __webpack_require__(1530);
			var getMethod = __webpack_require__(8173);
			var getSubstitution = __webpack_require__(647);
			var regExpExec = __webpack_require__(7651);
			var wellKnownSymbol = __webpack_require__(5112);

			var REPLACE = wellKnownSymbol("replace");
			var max = Math.max;
			var min = Math.min;
			var concat = uncurryThis([].concat);
			var push = uncurryThis([].push);
			var stringIndexOf = uncurryThis("".indexOf);
			var stringSlice = uncurryThis("".slice);

			var maybeToString = function (it) {
				return it === undefined ? it : String(it);
			};

			// IE <= 11 replaces $0 with the whole match, as if it was $&
			// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
			var REPLACE_KEEPS_$0 = (function () {
				// eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
				return "a".replace(/./, "$0") === "$0";
			})();

			// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
			var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
				if (/./[REPLACE]) {
					return /./[REPLACE]("a", "$0") === "";
				}
				return false;
			})();

			var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
				var re = /./;
				re.exec = function () {
					var result = [];
					result.groups = { a: "7" };
					return result;
				};
				// eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
				return "".replace(re, "$<a>") !== "7";
			});

			// @@replace logic
			fixRegExpWellKnownSymbolLogic(
				"replace",
				function (_, nativeReplace, maybeCallNative) {
					var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";

					return [
						// `String.prototype.replace` method
						// https://tc39.es/ecma262/#sec-string.prototype.replace
						function replace(searchValue, replaceValue) {
							var O = requireObjectCoercible(this);
							var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
							return replacer
								? call(replacer, searchValue, O, replaceValue)
								: call(nativeReplace, toString(O), searchValue, replaceValue);
						},
						// `RegExp.prototype[@@replace]` method
						// https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
						function (string, replaceValue) {
							var rx = anObject(this);
							var S = toString(string);

							if (
								typeof replaceValue == "string" &&
								stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
								stringIndexOf(replaceValue, "$<") === -1
							) {
								var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
								if (res.done) return res.value;
							}

							var functionalReplace = isCallable(replaceValue);
							if (!functionalReplace) replaceValue = toString(replaceValue);

							var global = rx.global;
							var fullUnicode;
							if (global) {
								fullUnicode = rx.unicode;
								rx.lastIndex = 0;
							}

							var results = [];
							var result;
							while (true) {
								result = regExpExec(rx, S);
								if (result === null) break;

								push(results, result);
								if (!global) break;

								var matchStr = toString(result[0]);
								if (matchStr === "")
									rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
							}

							var accumulatedResult = "";
							var nextSourcePosition = 0;
							for (var i = 0; i < results.length; i++) {
								result = results[i];

								var matched = toString(result[0]);
								var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
								var captures = [];
								var replacement;
								// NOTE: This is equivalent to
								//   captures = result.slice(1).map(maybeToString)
								// but for some reason `nativeSlice.call(result, 1, result.length)` (called in
								// the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
								// causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
								for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
								var namedCaptures = result.groups;
								if (functionalReplace) {
									var replacerArgs = concat([matched], captures, position, S);
									if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
									replacement = toString(apply(replaceValue, undefined, replacerArgs));
								} else {
									replacement = getSubstitution(
										matched,
										S,
										position,
										captures,
										namedCaptures,
										replaceValue
									);
								}
								if (position >= nextSourcePosition) {
									accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
									nextSourcePosition = position + matched.length;
								}
							}

							return accumulatedResult + stringSlice(S, nextSourcePosition);
						},
					];
				},
				!REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
			);

			/***/
		},

		/***/ 1202: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var FREEZING = __webpack_require__(6677);
			var global = __webpack_require__(2474);
			var uncurryThis = __webpack_require__(1702);
			var defineBuiltIns = __webpack_require__(9190);
			var InternalMetadataModule = __webpack_require__(2423);
			var collection = __webpack_require__(7710);
			var collectionWeak = __webpack_require__(9320);
			var isObject = __webpack_require__(111);
			var enforceInternalState = __webpack_require__(9909).enforce;
			var fails = __webpack_require__(7293);
			var NATIVE_WEAK_MAP = __webpack_require__(4811);

			var $Object = Object;
			// eslint-disable-next-line es/no-array-isarray -- safe
			var isArray = Array.isArray;
			// eslint-disable-next-line es/no-object-isextensible -- safe
			var isExtensible = $Object.isExtensible;
			// eslint-disable-next-line es/no-object-isfrozen -- safe
			var isFrozen = $Object.isFrozen;
			// eslint-disable-next-line es/no-object-issealed -- safe
			var isSealed = $Object.isSealed;
			// eslint-disable-next-line es/no-object-freeze -- safe
			var freeze = $Object.freeze;
			// eslint-disable-next-line es/no-object-seal -- safe
			var seal = $Object.seal;

			var FROZEN = {};
			var SEALED = {};
			var IS_IE11 = !global.ActiveXObject && "ActiveXObject" in global;
			var InternalWeakMap;

			var wrapper = function (init) {
				return function WeakMap() {
					return init(this, arguments.length ? arguments[0] : undefined);
				};
			};

			// `WeakMap` constructor
			// https://tc39.es/ecma262/#sec-weakmap-constructor
			var $WeakMap = collection("WeakMap", wrapper, collectionWeak);
			var WeakMapPrototype = $WeakMap.prototype;
			var nativeSet = uncurryThis(WeakMapPrototype.set);

			// Chakra Edge bug: adding frozen arrays to WeakMap unfreeze them
			var hasMSEdgeFreezingBug = function () {
				return (
					FREEZING &&
					fails(function () {
						var frozenArray = freeze([]);
						nativeSet(new $WeakMap(), frozenArray, 1);
						return !isFrozen(frozenArray);
					})
				);
			};

			// IE11 WeakMap frozen keys fix
			// We can't use feature detection because it crash some old IE builds
			// https://github.com/zloirock/core-js/issues/485
			if (NATIVE_WEAK_MAP)
				if (IS_IE11) {
					InternalWeakMap = collectionWeak.getConstructor(wrapper, "WeakMap", true);
					InternalMetadataModule.enable();
					var nativeDelete = uncurryThis(WeakMapPrototype["delete"]);
					var nativeHas = uncurryThis(WeakMapPrototype.has);
					var nativeGet = uncurryThis(WeakMapPrototype.get);
					defineBuiltIns(WeakMapPrototype, {
						delete: function (key) {
							if (isObject(key) && !isExtensible(key)) {
								var state = enforceInternalState(this);
								if (!state.frozen) state.frozen = new InternalWeakMap();
								return nativeDelete(this, key) || state.frozen["delete"](key);
							}
							return nativeDelete(this, key);
						},
						has: function has(key) {
							if (isObject(key) && !isExtensible(key)) {
								var state = enforceInternalState(this);
								if (!state.frozen) state.frozen = new InternalWeakMap();
								return nativeHas(this, key) || state.frozen.has(key);
							}
							return nativeHas(this, key);
						},
						get: function get(key) {
							if (isObject(key) && !isExtensible(key)) {
								var state = enforceInternalState(this);
								if (!state.frozen) state.frozen = new InternalWeakMap();
								return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
							}
							return nativeGet(this, key);
						},
						set: function set(key, value) {
							if (isObject(key) && !isExtensible(key)) {
								var state = enforceInternalState(this);
								if (!state.frozen) state.frozen = new InternalWeakMap();
								nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
							} else nativeSet(this, key, value);
							return this;
						},
					});
					// Chakra Edge frozen keys fix
				} else if (hasMSEdgeFreezingBug()) {
					defineBuiltIns(WeakMapPrototype, {
						set: function set(key, value) {
							var arrayIntegrityLevel;
							if (isArray(key)) {
								if (isFrozen(key)) arrayIntegrityLevel = FROZEN;
								else if (isSealed(key)) arrayIntegrityLevel = SEALED;
							}
							nativeSet(this, key, value);
							if (arrayIntegrityLevel === FROZEN) freeze(key);
							if (arrayIntegrityLevel === SEALED) seal(key);
							return this;
						},
					});
				}

			/***/
		},

		/***/ 4129: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			// TODO: Remove this module from `core-js@4` since it's replaced to module below
			__webpack_require__(1202);

			/***/
		},

		/***/ 4747: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var global = __webpack_require__(2474);
			var DOMIterables = __webpack_require__(8324);
			var DOMTokenListPrototype = __webpack_require__(8509);
			var forEach = __webpack_require__(8533);
			var createNonEnumerableProperty = __webpack_require__(8880);

			var handlePrototype = function (CollectionPrototype) {
				// some Chrome versions have non-configurable methods on DOMTokenList
				if (CollectionPrototype && CollectionPrototype.forEach !== forEach)
					try {
						createNonEnumerableProperty(CollectionPrototype, "forEach", forEach);
					} catch (error) {
						CollectionPrototype.forEach = forEach;
					}
			};

			for (var COLLECTION_NAME in DOMIterables) {
				if (DOMIterables[COLLECTION_NAME]) {
					handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
				}
			}

			handlePrototype(DOMTokenListPrototype);

			/***/
		},

		/***/ 3948: /***/ (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			"use strict";

			var global = __webpack_require__(2474);
			var DOMIterables = __webpack_require__(8324);
			var DOMTokenListPrototype = __webpack_require__(8509);
			var ArrayIteratorMethods = __webpack_require__(6992);
			var createNonEnumerableProperty = __webpack_require__(8880);
			var wellKnownSymbol = __webpack_require__(5112);

			var ITERATOR = wellKnownSymbol("iterator");
			var TO_STRING_TAG = wellKnownSymbol("toStringTag");
			var ArrayValues = ArrayIteratorMethods.values;

			var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
				if (CollectionPrototype) {
					// some Chrome versions have non-configurable methods on DOMTokenList
					if (CollectionPrototype[ITERATOR] !== ArrayValues)
						try {
							createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
						} catch (error) {
							CollectionPrototype[ITERATOR] = ArrayValues;
						}
					if (!CollectionPrototype[TO_STRING_TAG]) {
						createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
					}
					if (DOMIterables[COLLECTION_NAME])
						for (var METHOD_NAME in ArrayIteratorMethods) {
							// some Chrome versions have non-configurable methods on DOMTokenList
							if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
								try {
									createNonEnumerableProperty(
										CollectionPrototype,
										METHOD_NAME,
										ArrayIteratorMethods[METHOD_NAME]
									);
								} catch (error) {
									CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
								}
						}
				}
			};

			for (var COLLECTION_NAME in DOMIterables) {
				handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
			}

			handlePrototype(DOMTokenListPrototype, "DOMTokenList");

			/***/
		},

		/***/ 1296: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			/**
			 * lodash (Custom Build) <https://lodash.com/>
			 * Build: `lodash modularize exports="npm" -o ./`
			 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
			 * Released under MIT license <https://lodash.com/license>
			 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
			 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
			 */

			/** Used as the `TypeError` message for "Functions" methods. */
			var FUNC_ERROR_TEXT = "Expected a function";

			/** Used as references for various `Number` constants. */
			var NAN = 0 / 0;

			/** `Object#toString` result references. */
			var symbolTag = "[object Symbol]";

			/** Used to match leading and trailing whitespace. */
			var reTrim = /^\s+|\s+$/g;

			/** Used to detect bad signed hexadecimal string values. */
			var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

			/** Used to detect binary string values. */
			var reIsBinary = /^0b[01]+$/i;

			/** Used to detect octal string values. */
			var reIsOctal = /^0o[0-7]+$/i;

			/** Built-in method references without a dependency on `root`. */
			var freeParseInt = parseInt;

			/** Detect free variable `global` from Node.js. */
			var freeGlobal =
				typeof __webpack_require__.g == "object" &&
				__webpack_require__.g &&
				__webpack_require__.g.Object === Object &&
				__webpack_require__.g;

			/** Detect free variable `self`. */
			var freeSelf = typeof self == "object" && self && self.Object === Object && self;

			/** Used as a reference to the global object. */
			var root = freeGlobal || freeSelf || Function("return this")();

			/** Used for built-in method references. */
			var objectProto = Object.prototype;

			/**
			 * Used to resolve the
			 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
			 * of values.
			 */
			var objectToString = objectProto.toString;

			/* Built-in method references for those with the same name as other `lodash` methods. */
			var nativeMax = Math.max,
				nativeMin = Math.min;

			/**
			 * Gets the timestamp of the number of milliseconds that have elapsed since
			 * the Unix epoch (1 January 1970 00:00:00 UTC).
			 *
			 * @static
			 * @memberOf _
			 * @since 2.4.0
			 * @category Date
			 * @returns {number} Returns the timestamp.
			 * @example
			 *
			 * _.defer(function(stamp) {
			 *   console.log(_.now() - stamp);
			 * }, _.now());
			 * // => Logs the number of milliseconds it took for the deferred invocation.
			 */
			var now = function () {
				return root.Date.now();
			};

			/**
			 * Creates a debounced function that delays invoking `func` until after `wait`
			 * milliseconds have elapsed since the last time the debounced function was
			 * invoked. The debounced function comes with a `cancel` method to cancel
			 * delayed `func` invocations and a `flush` method to immediately invoke them.
			 * Provide `options` to indicate whether `func` should be invoked on the
			 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
			 * with the last arguments provided to the debounced function. Subsequent
			 * calls to the debounced function return the result of the last `func`
			 * invocation.
			 *
			 * **Note:** If `leading` and `trailing` options are `true`, `func` is
			 * invoked on the trailing edge of the timeout only if the debounced function
			 * is invoked more than once during the `wait` timeout.
			 *
			 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
			 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
			 *
			 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
			 * for details over the differences between `_.debounce` and `_.throttle`.
			 *
			 * @static
			 * @memberOf _
			 * @since 0.1.0
			 * @category Function
			 * @param {Function} func The function to debounce.
			 * @param {number} [wait=0] The number of milliseconds to delay.
			 * @param {Object} [options={}] The options object.
			 * @param {boolean} [options.leading=false]
			 *  Specify invoking on the leading edge of the timeout.
			 * @param {number} [options.maxWait]
			 *  The maximum time `func` is allowed to be delayed before it's invoked.
			 * @param {boolean} [options.trailing=true]
			 *  Specify invoking on the trailing edge of the timeout.
			 * @returns {Function} Returns the new debounced function.
			 * @example
			 *
			 * // Avoid costly calculations while the window size is in flux.
			 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
			 *
			 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
			 * jQuery(element).on('click', _.debounce(sendMail, 300, {
			 *   'leading': true,
			 *   'trailing': false
			 * }));
			 *
			 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
			 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
			 * var source = new EventSource('/stream');
			 * jQuery(source).on('message', debounced);
			 *
			 * // Cancel the trailing debounced invocation.
			 * jQuery(window).on('popstate', debounced.cancel);
			 */
			function debounce(func, wait, options) {
				var lastArgs,
					lastThis,
					maxWait,
					result,
					timerId,
					lastCallTime,
					lastInvokeTime = 0,
					leading = false,
					maxing = false,
					trailing = true;

				if (typeof func != "function") {
					throw new TypeError(FUNC_ERROR_TEXT);
				}
				wait = toNumber(wait) || 0;
				if (isObject(options)) {
					leading = !!options.leading;
					maxing = "maxWait" in options;
					maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
					trailing = "trailing" in options ? !!options.trailing : trailing;
				}

				function invokeFunc(time) {
					var args = lastArgs,
						thisArg = lastThis;

					lastArgs = lastThis = undefined;
					lastInvokeTime = time;
					result = func.apply(thisArg, args);
					return result;
				}

				function leadingEdge(time) {
					// Reset any `maxWait` timer.
					lastInvokeTime = time;
					// Start the timer for the trailing edge.
					timerId = setTimeout(timerExpired, wait);
					// Invoke the leading edge.
					return leading ? invokeFunc(time) : result;
				}

				function remainingWait(time) {
					var timeSinceLastCall = time - lastCallTime,
						timeSinceLastInvoke = time - lastInvokeTime,
						result = wait - timeSinceLastCall;

					return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
				}

				function shouldInvoke(time) {
					var timeSinceLastCall = time - lastCallTime,
						timeSinceLastInvoke = time - lastInvokeTime;

					// Either this is the first call, activity has stopped and we're at the
					// trailing edge, the system time has gone backwards and we're treating
					// it as the trailing edge, or we've hit the `maxWait` limit.
					return (
						lastCallTime === undefined ||
						timeSinceLastCall >= wait ||
						timeSinceLastCall < 0 ||
						(maxing && timeSinceLastInvoke >= maxWait)
					);
				}

				function timerExpired() {
					var time = now();
					if (shouldInvoke(time)) {
						return trailingEdge(time);
					}
					// Restart the timer.
					timerId = setTimeout(timerExpired, remainingWait(time));
				}

				function trailingEdge(time) {
					timerId = undefined;

					// Only invoke if we have `lastArgs` which means `func` has been
					// debounced at least once.
					if (trailing && lastArgs) {
						return invokeFunc(time);
					}
					lastArgs = lastThis = undefined;
					return result;
				}

				function cancel() {
					if (timerId !== undefined) {
						clearTimeout(timerId);
					}
					lastInvokeTime = 0;
					lastArgs = lastCallTime = lastThis = timerId = undefined;
				}

				function flush() {
					return timerId === undefined ? result : trailingEdge(now());
				}

				function debounced() {
					var time = now(),
						isInvoking = shouldInvoke(time);

					lastArgs = arguments;
					lastThis = this;
					lastCallTime = time;

					if (isInvoking) {
						if (timerId === undefined) {
							return leadingEdge(lastCallTime);
						}
						if (maxing) {
							// Handle invocations in a tight loop.
							timerId = setTimeout(timerExpired, wait);
							return invokeFunc(lastCallTime);
						}
					}
					if (timerId === undefined) {
						timerId = setTimeout(timerExpired, wait);
					}
					return result;
				}
				debounced.cancel = cancel;
				debounced.flush = flush;
				return debounced;
			}

			/**
			 * Checks if `value` is the
			 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
			 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
			 *
			 * @static
			 * @memberOf _
			 * @since 0.1.0
			 * @category Lang
			 * @param {*} value The value to check.
			 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
			 * @example
			 *
			 * _.isObject({});
			 * // => true
			 *
			 * _.isObject([1, 2, 3]);
			 * // => true
			 *
			 * _.isObject(_.noop);
			 * // => true
			 *
			 * _.isObject(null);
			 * // => false
			 */
			function isObject(value) {
				var type = typeof value;
				return !!value && (type == "object" || type == "function");
			}

			/**
			 * Checks if `value` is object-like. A value is object-like if it's not `null`
			 * and has a `typeof` result of "object".
			 *
			 * @static
			 * @memberOf _
			 * @since 4.0.0
			 * @category Lang
			 * @param {*} value The value to check.
			 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
			 * @example
			 *
			 * _.isObjectLike({});
			 * // => true
			 *
			 * _.isObjectLike([1, 2, 3]);
			 * // => true
			 *
			 * _.isObjectLike(_.noop);
			 * // => false
			 *
			 * _.isObjectLike(null);
			 * // => false
			 */
			function isObjectLike(value) {
				return !!value && typeof value == "object";
			}

			/**
			 * Checks if `value` is classified as a `Symbol` primitive or object.
			 *
			 * @static
			 * @memberOf _
			 * @since 4.0.0
			 * @category Lang
			 * @param {*} value The value to check.
			 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
			 * @example
			 *
			 * _.isSymbol(Symbol.iterator);
			 * // => true
			 *
			 * _.isSymbol('abc');
			 * // => false
			 */
			function isSymbol(value) {
				return typeof value == "symbol" || (isObjectLike(value) && objectToString.call(value) == symbolTag);
			}

			/**
			 * Converts `value` to a number.
			 *
			 * @static
			 * @memberOf _
			 * @since 4.0.0
			 * @category Lang
			 * @param {*} value The value to process.
			 * @returns {number} Returns the number.
			 * @example
			 *
			 * _.toNumber(3.2);
			 * // => 3.2
			 *
			 * _.toNumber(Number.MIN_VALUE);
			 * // => 5e-324
			 *
			 * _.toNumber(Infinity);
			 * // => Infinity
			 *
			 * _.toNumber('3.2');
			 * // => 3.2
			 */
			function toNumber(value) {
				if (typeof value == "number") {
					return value;
				}
				if (isSymbol(value)) {
					return NAN;
				}
				if (isObject(value)) {
					var other = typeof value.valueOf == "function" ? value.valueOf() : value;
					value = isObject(other) ? other + "" : other;
				}
				if (typeof value != "string") {
					return value === 0 ? value : +value;
				}
				value = value.replace(reTrim, "");
				var isBinary = reIsBinary.test(value);
				return isBinary || reIsOctal.test(value)
					? freeParseInt(value.slice(2), isBinary ? 2 : 8)
					: reIsBadHex.test(value)
					? NAN
					: +value;
			}

			module.exports = debounce;

			/***/
		},

		/***/ 773: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			/**
			 * lodash (Custom Build) <https://lodash.com/>
			 * Build: `lodash modularize exports="npm" -o ./`
			 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
			 * Released under MIT license <https://lodash.com/license>
			 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
			 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
			 */

			/** Used as the `TypeError` message for "Functions" methods. */
			var FUNC_ERROR_TEXT = "Expected a function";

			/** Used to stand-in for `undefined` hash values. */
			var HASH_UNDEFINED = "__lodash_hash_undefined__";

			/** `Object#toString` result references. */
			var funcTag = "[object Function]",
				genTag = "[object GeneratorFunction]";

			/**
			 * Used to match `RegExp`
			 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
			 */
			var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

			/** Used to detect host constructors (Safari). */
			var reIsHostCtor = /^\[object .+?Constructor\]$/;

			/** Detect free variable `global` from Node.js. */
			var freeGlobal =
				typeof __webpack_require__.g == "object" &&
				__webpack_require__.g &&
				__webpack_require__.g.Object === Object &&
				__webpack_require__.g;

			/** Detect free variable `self`. */
			var freeSelf = typeof self == "object" && self && self.Object === Object && self;

			/** Used as a reference to the global object. */
			var root = freeGlobal || freeSelf || Function("return this")();

			/**
			 * Gets the value at `key` of `object`.
			 *
			 * @private
			 * @param {Object} [object] The object to query.
			 * @param {string} key The key of the property to get.
			 * @returns {*} Returns the property value.
			 */
			function getValue(object, key) {
				return object == null ? undefined : object[key];
			}

			/**
			 * Checks if `value` is a host object in IE < 9.
			 *
			 * @private
			 * @param {*} value The value to check.
			 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
			 */
			function isHostObject(value) {
				// Many host objects are `Object` objects that can coerce to strings
				// despite having improperly defined `toString` methods.
				var result = false;
				if (value != null && typeof value.toString != "function") {
					try {
						result = !!(value + "");
					} catch (e) {}
				}
				return result;
			}

			/** Used for built-in method references. */
			var arrayProto = Array.prototype,
				funcProto = Function.prototype,
				objectProto = Object.prototype;

			/** Used to detect overreaching core-js shims. */
			var coreJsData = root["__core-js_shared__"];

			/** Used to detect methods masquerading as native. */
			var maskSrcKey = (function () {
				var uid = /[^.]+$/.exec((coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || "");
				return uid ? "Symbol(src)_1." + uid : "";
			})();

			/** Used to resolve the decompiled source of functions. */
			var funcToString = funcProto.toString;

			/** Used to check objects for own properties. */
			var hasOwnProperty = objectProto.hasOwnProperty;

			/**
			 * Used to resolve the
			 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
			 * of values.
			 */
			var objectToString = objectProto.toString;

			/** Used to detect if a method is native. */
			var reIsNative = RegExp(
				"^" +
					funcToString
						.call(hasOwnProperty)
						.replace(reRegExpChar, "\\$&")
						.replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
					"$"
			);

			/** Built-in value references. */
			var splice = arrayProto.splice;

			/* Built-in method references that are verified to be native. */
			var Map = getNative(root, "Map"),
				nativeCreate = getNative(Object, "create");

			/**
			 * Creates a hash object.
			 *
			 * @private
			 * @constructor
			 * @param {Array} [entries] The key-value pairs to cache.
			 */
			function Hash(entries) {
				var index = -1,
					length = entries ? entries.length : 0;

				this.clear();
				while (++index < length) {
					var entry = entries[index];
					this.set(entry[0], entry[1]);
				}
			}

			/**
			 * Removes all key-value entries from the hash.
			 *
			 * @private
			 * @name clear
			 * @memberOf Hash
			 */
			function hashClear() {
				this.__data__ = nativeCreate ? nativeCreate(null) : {};
			}

			/**
			 * Removes `key` and its value from the hash.
			 *
			 * @private
			 * @name delete
			 * @memberOf Hash
			 * @param {Object} hash The hash to modify.
			 * @param {string} key The key of the value to remove.
			 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
			 */
			function hashDelete(key) {
				return this.has(key) && delete this.__data__[key];
			}

			/**
			 * Gets the hash value for `key`.
			 *
			 * @private
			 * @name get
			 * @memberOf Hash
			 * @param {string} key The key of the value to get.
			 * @returns {*} Returns the entry value.
			 */
			function hashGet(key) {
				var data = this.__data__;
				if (nativeCreate) {
					var result = data[key];
					return result === HASH_UNDEFINED ? undefined : result;
				}
				return hasOwnProperty.call(data, key) ? data[key] : undefined;
			}

			/**
			 * Checks if a hash value for `key` exists.
			 *
			 * @private
			 * @name has
			 * @memberOf Hash
			 * @param {string} key The key of the entry to check.
			 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
			 */
			function hashHas(key) {
				var data = this.__data__;
				return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
			}

			/**
			 * Sets the hash `key` to `value`.
			 *
			 * @private
			 * @name set
			 * @memberOf Hash
			 * @param {string} key The key of the value to set.
			 * @param {*} value The value to set.
			 * @returns {Object} Returns the hash instance.
			 */
			function hashSet(key, value) {
				var data = this.__data__;
				data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
				return this;
			}

			// Add methods to `Hash`.
			Hash.prototype.clear = hashClear;
			Hash.prototype["delete"] = hashDelete;
			Hash.prototype.get = hashGet;
			Hash.prototype.has = hashHas;
			Hash.prototype.set = hashSet;

			/**
			 * Creates an list cache object.
			 *
			 * @private
			 * @constructor
			 * @param {Array} [entries] The key-value pairs to cache.
			 */
			function ListCache(entries) {
				var index = -1,
					length = entries ? entries.length : 0;

				this.clear();
				while (++index < length) {
					var entry = entries[index];
					this.set(entry[0], entry[1]);
				}
			}

			/**
			 * Removes all key-value entries from the list cache.
			 *
			 * @private
			 * @name clear
			 * @memberOf ListCache
			 */
			function listCacheClear() {
				this.__data__ = [];
			}

			/**
			 * Removes `key` and its value from the list cache.
			 *
			 * @private
			 * @name delete
			 * @memberOf ListCache
			 * @param {string} key The key of the value to remove.
			 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
			 */
			function listCacheDelete(key) {
				var data = this.__data__,
					index = assocIndexOf(data, key);

				if (index < 0) {
					return false;
				}
				var lastIndex = data.length - 1;
				if (index == lastIndex) {
					data.pop();
				} else {
					splice.call(data, index, 1);
				}
				return true;
			}

			/**
			 * Gets the list cache value for `key`.
			 *
			 * @private
			 * @name get
			 * @memberOf ListCache
			 * @param {string} key The key of the value to get.
			 * @returns {*} Returns the entry value.
			 */
			function listCacheGet(key) {
				var data = this.__data__,
					index = assocIndexOf(data, key);

				return index < 0 ? undefined : data[index][1];
			}

			/**
			 * Checks if a list cache value for `key` exists.
			 *
			 * @private
			 * @name has
			 * @memberOf ListCache
			 * @param {string} key The key of the entry to check.
			 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
			 */
			function listCacheHas(key) {
				return assocIndexOf(this.__data__, key) > -1;
			}

			/**
			 * Sets the list cache `key` to `value`.
			 *
			 * @private
			 * @name set
			 * @memberOf ListCache
			 * @param {string} key The key of the value to set.
			 * @param {*} value The value to set.
			 * @returns {Object} Returns the list cache instance.
			 */
			function listCacheSet(key, value) {
				var data = this.__data__,
					index = assocIndexOf(data, key);

				if (index < 0) {
					data.push([key, value]);
				} else {
					data[index][1] = value;
				}
				return this;
			}

			// Add methods to `ListCache`.
			ListCache.prototype.clear = listCacheClear;
			ListCache.prototype["delete"] = listCacheDelete;
			ListCache.prototype.get = listCacheGet;
			ListCache.prototype.has = listCacheHas;
			ListCache.prototype.set = listCacheSet;

			/**
			 * Creates a map cache object to store key-value pairs.
			 *
			 * @private
			 * @constructor
			 * @param {Array} [entries] The key-value pairs to cache.
			 */
			function MapCache(entries) {
				var index = -1,
					length = entries ? entries.length : 0;

				this.clear();
				while (++index < length) {
					var entry = entries[index];
					this.set(entry[0], entry[1]);
				}
			}

			/**
			 * Removes all key-value entries from the map.
			 *
			 * @private
			 * @name clear
			 * @memberOf MapCache
			 */
			function mapCacheClear() {
				this.__data__ = {
					hash: new Hash(),
					map: new (Map || ListCache)(),
					string: new Hash(),
				};
			}

			/**
			 * Removes `key` and its value from the map.
			 *
			 * @private
			 * @name delete
			 * @memberOf MapCache
			 * @param {string} key The key of the value to remove.
			 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
			 */
			function mapCacheDelete(key) {
				return getMapData(this, key)["delete"](key);
			}

			/**
			 * Gets the map value for `key`.
			 *
			 * @private
			 * @name get
			 * @memberOf MapCache
			 * @param {string} key The key of the value to get.
			 * @returns {*} Returns the entry value.
			 */
			function mapCacheGet(key) {
				return getMapData(this, key).get(key);
			}

			/**
			 * Checks if a map value for `key` exists.
			 *
			 * @private
			 * @name has
			 * @memberOf MapCache
			 * @param {string} key The key of the entry to check.
			 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
			 */
			function mapCacheHas(key) {
				return getMapData(this, key).has(key);
			}

			/**
			 * Sets the map `key` to `value`.
			 *
			 * @private
			 * @name set
			 * @memberOf MapCache
			 * @param {string} key The key of the value to set.
			 * @param {*} value The value to set.
			 * @returns {Object} Returns the map cache instance.
			 */
			function mapCacheSet(key, value) {
				getMapData(this, key).set(key, value);
				return this;
			}

			// Add methods to `MapCache`.
			MapCache.prototype.clear = mapCacheClear;
			MapCache.prototype["delete"] = mapCacheDelete;
			MapCache.prototype.get = mapCacheGet;
			MapCache.prototype.has = mapCacheHas;
			MapCache.prototype.set = mapCacheSet;

			/**
			 * Gets the index at which the `key` is found in `array` of key-value pairs.
			 *
			 * @private
			 * @param {Array} array The array to inspect.
			 * @param {*} key The key to search for.
			 * @returns {number} Returns the index of the matched value, else `-1`.
			 */
			function assocIndexOf(array, key) {
				var length = array.length;
				while (length--) {
					if (eq(array[length][0], key)) {
						return length;
					}
				}
				return -1;
			}

			/**
			 * The base implementation of `_.isNative` without bad shim checks.
			 *
			 * @private
			 * @param {*} value The value to check.
			 * @returns {boolean} Returns `true` if `value` is a native function,
			 *  else `false`.
			 */
			function baseIsNative(value) {
				if (!isObject(value) || isMasked(value)) {
					return false;
				}
				var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
				return pattern.test(toSource(value));
			}

			/**
			 * Gets the data for `map`.
			 *
			 * @private
			 * @param {Object} map The map to query.
			 * @param {string} key The reference key.
			 * @returns {*} Returns the map data.
			 */
			function getMapData(map, key) {
				var data = map.__data__;
				return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
			}

			/**
			 * Gets the native function at `key` of `object`.
			 *
			 * @private
			 * @param {Object} object The object to query.
			 * @param {string} key The key of the method to get.
			 * @returns {*} Returns the function if it's native, else `undefined`.
			 */
			function getNative(object, key) {
				var value = getValue(object, key);
				return baseIsNative(value) ? value : undefined;
			}

			/**
			 * Checks if `value` is suitable for use as unique object key.
			 *
			 * @private
			 * @param {*} value The value to check.
			 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
			 */
			function isKeyable(value) {
				var type = typeof value;
				return type == "string" || type == "number" || type == "symbol" || type == "boolean"
					? value !== "__proto__"
					: value === null;
			}

			/**
			 * Checks if `func` has its source masked.
			 *
			 * @private
			 * @param {Function} func The function to check.
			 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
			 */
			function isMasked(func) {
				return !!maskSrcKey && maskSrcKey in func;
			}

			/**
			 * Converts `func` to its source code.
			 *
			 * @private
			 * @param {Function} func The function to process.
			 * @returns {string} Returns the source code.
			 */
			function toSource(func) {
				if (func != null) {
					try {
						return funcToString.call(func);
					} catch (e) {}
					try {
						return func + "";
					} catch (e) {}
				}
				return "";
			}

			/**
			 * Creates a function that memoizes the result of `func`. If `resolver` is
			 * provided, it determines the cache key for storing the result based on the
			 * arguments provided to the memoized function. By default, the first argument
			 * provided to the memoized function is used as the map cache key. The `func`
			 * is invoked with the `this` binding of the memoized function.
			 *
			 * **Note:** The cache is exposed as the `cache` property on the memoized
			 * function. Its creation may be customized by replacing the `_.memoize.Cache`
			 * constructor with one whose instances implement the
			 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
			 * method interface of `delete`, `get`, `has`, and `set`.
			 *
			 * @static
			 * @memberOf _
			 * @since 0.1.0
			 * @category Function
			 * @param {Function} func The function to have its output memoized.
			 * @param {Function} [resolver] The function to resolve the cache key.
			 * @returns {Function} Returns the new memoized function.
			 * @example
			 *
			 * var object = { 'a': 1, 'b': 2 };
			 * var other = { 'c': 3, 'd': 4 };
			 *
			 * var values = _.memoize(_.values);
			 * values(object);
			 * // => [1, 2]
			 *
			 * values(other);
			 * // => [3, 4]
			 *
			 * object.a = 2;
			 * values(object);
			 * // => [1, 2]
			 *
			 * // Modify the result cache.
			 * values.cache.set(object, ['a', 'b']);
			 * values(object);
			 * // => ['a', 'b']
			 *
			 * // Replace `_.memoize.Cache`.
			 * _.memoize.Cache = WeakMap;
			 */
			function memoize(func, resolver) {
				if (typeof func != "function" || (resolver && typeof resolver != "function")) {
					throw new TypeError(FUNC_ERROR_TEXT);
				}
				var memoized = function () {
					var args = arguments,
						key = resolver ? resolver.apply(this, args) : args[0],
						cache = memoized.cache;

					if (cache.has(key)) {
						return cache.get(key);
					}
					var result = func.apply(this, args);
					memoized.cache = cache.set(key, result);
					return result;
				};
				memoized.cache = new (memoize.Cache || MapCache)();
				return memoized;
			}

			// Assign cache to `_.memoize`.
			memoize.Cache = MapCache;

			/**
			 * Performs a
			 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
			 * comparison between two values to determine if they are equivalent.
			 *
			 * @static
			 * @memberOf _
			 * @since 4.0.0
			 * @category Lang
			 * @param {*} value The value to compare.
			 * @param {*} other The other value to compare.
			 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
			 * @example
			 *
			 * var object = { 'a': 1 };
			 * var other = { 'a': 1 };
			 *
			 * _.eq(object, object);
			 * // => true
			 *
			 * _.eq(object, other);
			 * // => false
			 *
			 * _.eq('a', 'a');
			 * // => true
			 *
			 * _.eq('a', Object('a'));
			 * // => false
			 *
			 * _.eq(NaN, NaN);
			 * // => true
			 */
			function eq(value, other) {
				return value === other || (value !== value && other !== other);
			}

			/**
			 * Checks if `value` is classified as a `Function` object.
			 *
			 * @static
			 * @memberOf _
			 * @since 0.1.0
			 * @category Lang
			 * @param {*} value The value to check.
			 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
			 * @example
			 *
			 * _.isFunction(_);
			 * // => true
			 *
			 * _.isFunction(/abc/);
			 * // => false
			 */
			function isFunction(value) {
				// The use of `Object#toString` avoids issues with the `typeof` operator
				// in Safari 8-9 which returns 'object' for typed array and other constructors.
				var tag = isObject(value) ? objectToString.call(value) : "";
				return tag == funcTag || tag == genTag;
			}

			/**
			 * Checks if `value` is the
			 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
			 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
			 *
			 * @static
			 * @memberOf _
			 * @since 0.1.0
			 * @category Lang
			 * @param {*} value The value to check.
			 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
			 * @example
			 *
			 * _.isObject({});
			 * // => true
			 *
			 * _.isObject([1, 2, 3]);
			 * // => true
			 *
			 * _.isObject(_.noop);
			 * // => true
			 *
			 * _.isObject(null);
			 * // => false
			 */
			function isObject(value) {
				var type = typeof value;
				return !!value && (type == "object" || type == "function");
			}

			module.exports = memoize;

			/***/
		},

		/***/ 3096: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
			/**
			 * lodash (Custom Build) <https://lodash.com/>
			 * Build: `lodash modularize exports="npm" -o ./`
			 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
			 * Released under MIT license <https://lodash.com/license>
			 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
			 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
			 */

			/** Used as the `TypeError` message for "Functions" methods. */
			var FUNC_ERROR_TEXT = "Expected a function";

			/** Used as references for various `Number` constants. */
			var NAN = 0 / 0;

			/** `Object#toString` result references. */
			var symbolTag = "[object Symbol]";

			/** Used to match leading and trailing whitespace. */
			var reTrim = /^\s+|\s+$/g;

			/** Used to detect bad signed hexadecimal string values. */
			var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

			/** Used to detect binary string values. */
			var reIsBinary = /^0b[01]+$/i;

			/** Used to detect octal string values. */
			var reIsOctal = /^0o[0-7]+$/i;

			/** Built-in method references without a dependency on `root`. */
			var freeParseInt = parseInt;

			/** Detect free variable `global` from Node.js. */
			var freeGlobal =
				typeof __webpack_require__.g == "object" &&
				__webpack_require__.g &&
				__webpack_require__.g.Object === Object &&
				__webpack_require__.g;

			/** Detect free variable `self`. */
			var freeSelf = typeof self == "object" && self && self.Object === Object && self;

			/** Used as a reference to the global object. */
			var root = freeGlobal || freeSelf || Function("return this")();

			/** Used for built-in method references. */
			var objectProto = Object.prototype;

			/**
			 * Used to resolve the
			 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
			 * of values.
			 */
			var objectToString = objectProto.toString;

			/* Built-in method references for those with the same name as other `lodash` methods. */
			var nativeMax = Math.max,
				nativeMin = Math.min;

			/**
			 * Gets the timestamp of the number of milliseconds that have elapsed since
			 * the Unix epoch (1 January 1970 00:00:00 UTC).
			 *
			 * @static
			 * @memberOf _
			 * @since 2.4.0
			 * @category Date
			 * @returns {number} Returns the timestamp.
			 * @example
			 *
			 * _.defer(function(stamp) {
			 *   console.log(_.now() - stamp);
			 * }, _.now());
			 * // => Logs the number of milliseconds it took for the deferred invocation.
			 */
			var now = function () {
				return root.Date.now();
			};

			/**
			 * Creates a debounced function that delays invoking `func` until after `wait`
			 * milliseconds have elapsed since the last time the debounced function was
			 * invoked. The debounced function comes with a `cancel` method to cancel
			 * delayed `func` invocations and a `flush` method to immediately invoke them.
			 * Provide `options` to indicate whether `func` should be invoked on the
			 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
			 * with the last arguments provided to the debounced function. Subsequent
			 * calls to the debounced function return the result of the last `func`
			 * invocation.
			 *
			 * **Note:** If `leading` and `trailing` options are `true`, `func` is
			 * invoked on the trailing edge of the timeout only if the debounced function
			 * is invoked more than once during the `wait` timeout.
			 *
			 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
			 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
			 *
			 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
			 * for details over the differences between `_.debounce` and `_.throttle`.
			 *
			 * @static
			 * @memberOf _
			 * @since 0.1.0
			 * @category Function
			 * @param {Function} func The function to debounce.
			 * @param {number} [wait=0] The number of milliseconds to delay.
			 * @param {Object} [options={}] The options object.
			 * @param {boolean} [options.leading=false]
			 *  Specify invoking on the leading edge of the timeout.
			 * @param {number} [options.maxWait]
			 *  The maximum time `func` is allowed to be delayed before it's invoked.
			 * @param {boolean} [options.trailing=true]
			 *  Specify invoking on the trailing edge of the timeout.
			 * @returns {Function} Returns the new debounced function.
			 * @example
			 *
			 * // Avoid costly calculations while the window size is in flux.
			 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
			 *
			 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
			 * jQuery(element).on('click', _.debounce(sendMail, 300, {
			 *   'leading': true,
			 *   'trailing': false
			 * }));
			 *
			 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
			 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
			 * var source = new EventSource('/stream');
			 * jQuery(source).on('message', debounced);
			 *
			 * // Cancel the trailing debounced invocation.
			 * jQuery(window).on('popstate', debounced.cancel);
			 */
			function debounce(func, wait, options) {
				var lastArgs,
					lastThis,
					maxWait,
					result,
					timerId,
					lastCallTime,
					lastInvokeTime = 0,
					leading = false,
					maxing = false,
					trailing = true;

				if (typeof func != "function") {
					throw new TypeError(FUNC_ERROR_TEXT);
				}
				wait = toNumber(wait) || 0;
				if (isObject(options)) {
					leading = !!options.leading;
					maxing = "maxWait" in options;
					maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
					trailing = "trailing" in options ? !!options.trailing : trailing;
				}

				function invokeFunc(time) {
					var args = lastArgs,
						thisArg = lastThis;

					lastArgs = lastThis = undefined;
					lastInvokeTime = time;
					result = func.apply(thisArg, args);
					return result;
				}

				function leadingEdge(time) {
					// Reset any `maxWait` timer.
					lastInvokeTime = time;
					// Start the timer for the trailing edge.
					timerId = setTimeout(timerExpired, wait);
					// Invoke the leading edge.
					return leading ? invokeFunc(time) : result;
				}

				function remainingWait(time) {
					var timeSinceLastCall = time - lastCallTime,
						timeSinceLastInvoke = time - lastInvokeTime,
						result = wait - timeSinceLastCall;

					return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
				}

				function shouldInvoke(time) {
					var timeSinceLastCall = time - lastCallTime,
						timeSinceLastInvoke = time - lastInvokeTime;

					// Either this is the first call, activity has stopped and we're at the
					// trailing edge, the system time has gone backwards and we're treating
					// it as the trailing edge, or we've hit the `maxWait` limit.
					return (
						lastCallTime === undefined ||
						timeSinceLastCall >= wait ||
						timeSinceLastCall < 0 ||
						(maxing && timeSinceLastInvoke >= maxWait)
					);
				}

				function timerExpired() {
					var time = now();
					if (shouldInvoke(time)) {
						return trailingEdge(time);
					}
					// Restart the timer.
					timerId = setTimeout(timerExpired, remainingWait(time));
				}

				function trailingEdge(time) {
					timerId = undefined;

					// Only invoke if we have `lastArgs` which means `func` has been
					// debounced at least once.
					if (trailing && lastArgs) {
						return invokeFunc(time);
					}
					lastArgs = lastThis = undefined;
					return result;
				}

				function cancel() {
					if (timerId !== undefined) {
						clearTimeout(timerId);
					}
					lastInvokeTime = 0;
					lastArgs = lastCallTime = lastThis = timerId = undefined;
				}

				function flush() {
					return timerId === undefined ? result : trailingEdge(now());
				}

				function debounced() {
					var time = now(),
						isInvoking = shouldInvoke(time);

					lastArgs = arguments;
					lastThis = this;
					lastCallTime = time;

					if (isInvoking) {
						if (timerId === undefined) {
							return leadingEdge(lastCallTime);
						}
						if (maxing) {
							// Handle invocations in a tight loop.
							timerId = setTimeout(timerExpired, wait);
							return invokeFunc(lastCallTime);
						}
					}
					if (timerId === undefined) {
						timerId = setTimeout(timerExpired, wait);
					}
					return result;
				}
				debounced.cancel = cancel;
				debounced.flush = flush;
				return debounced;
			}

			/**
			 * Creates a throttled function that only invokes `func` at most once per
			 * every `wait` milliseconds. The throttled function comes with a `cancel`
			 * method to cancel delayed `func` invocations and a `flush` method to
			 * immediately invoke them. Provide `options` to indicate whether `func`
			 * should be invoked on the leading and/or trailing edge of the `wait`
			 * timeout. The `func` is invoked with the last arguments provided to the
			 * throttled function. Subsequent calls to the throttled function return the
			 * result of the last `func` invocation.
			 *
			 * **Note:** If `leading` and `trailing` options are `true`, `func` is
			 * invoked on the trailing edge of the timeout only if the throttled function
			 * is invoked more than once during the `wait` timeout.
			 *
			 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
			 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
			 *
			 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
			 * for details over the differences between `_.throttle` and `_.debounce`.
			 *
			 * @static
			 * @memberOf _
			 * @since 0.1.0
			 * @category Function
			 * @param {Function} func The function to throttle.
			 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
			 * @param {Object} [options={}] The options object.
			 * @param {boolean} [options.leading=true]
			 *  Specify invoking on the leading edge of the timeout.
			 * @param {boolean} [options.trailing=true]
			 *  Specify invoking on the trailing edge of the timeout.
			 * @returns {Function} Returns the new throttled function.
			 * @example
			 *
			 * // Avoid excessively updating the position while scrolling.
			 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
			 *
			 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
			 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
			 * jQuery(element).on('click', throttled);
			 *
			 * // Cancel the trailing throttled invocation.
			 * jQuery(window).on('popstate', throttled.cancel);
			 */
			function throttle(func, wait, options) {
				var leading = true,
					trailing = true;

				if (typeof func != "function") {
					throw new TypeError(FUNC_ERROR_TEXT);
				}
				if (isObject(options)) {
					leading = "leading" in options ? !!options.leading : leading;
					trailing = "trailing" in options ? !!options.trailing : trailing;
				}
				return debounce(func, wait, {
					leading: leading,
					maxWait: wait,
					trailing: trailing,
				});
			}

			/**
			 * Checks if `value` is the
			 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
			 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
			 *
			 * @static
			 * @memberOf _
			 * @since 0.1.0
			 * @category Lang
			 * @param {*} value The value to check.
			 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
			 * @example
			 *
			 * _.isObject({});
			 * // => true
			 *
			 * _.isObject([1, 2, 3]);
			 * // => true
			 *
			 * _.isObject(_.noop);
			 * // => true
			 *
			 * _.isObject(null);
			 * // => false
			 */
			function isObject(value) {
				var type = typeof value;
				return !!value && (type == "object" || type == "function");
			}

			/**
			 * Checks if `value` is object-like. A value is object-like if it's not `null`
			 * and has a `typeof` result of "object".
			 *
			 * @static
			 * @memberOf _
			 * @since 4.0.0
			 * @category Lang
			 * @param {*} value The value to check.
			 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
			 * @example
			 *
			 * _.isObjectLike({});
			 * // => true
			 *
			 * _.isObjectLike([1, 2, 3]);
			 * // => true
			 *
			 * _.isObjectLike(_.noop);
			 * // => false
			 *
			 * _.isObjectLike(null);
			 * // => false
			 */
			function isObjectLike(value) {
				return !!value && typeof value == "object";
			}

			/**
			 * Checks if `value` is classified as a `Symbol` primitive or object.
			 *
			 * @static
			 * @memberOf _
			 * @since 4.0.0
			 * @category Lang
			 * @param {*} value The value to check.
			 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
			 * @example
			 *
			 * _.isSymbol(Symbol.iterator);
			 * // => true
			 *
			 * _.isSymbol('abc');
			 * // => false
			 */
			function isSymbol(value) {
				return typeof value == "symbol" || (isObjectLike(value) && objectToString.call(value) == symbolTag);
			}

			/**
			 * Converts `value` to a number.
			 *
			 * @static
			 * @memberOf _
			 * @since 4.0.0
			 * @category Lang
			 * @param {*} value The value to process.
			 * @returns {number} Returns the number.
			 * @example
			 *
			 * _.toNumber(3.2);
			 * // => 3.2
			 *
			 * _.toNumber(Number.MIN_VALUE);
			 * // => 5e-324
			 *
			 * _.toNumber(Infinity);
			 * // => Infinity
			 *
			 * _.toNumber('3.2');
			 * // => 3.2
			 */
			function toNumber(value) {
				if (typeof value == "number") {
					return value;
				}
				if (isSymbol(value)) {
					return NAN;
				}
				if (isObject(value)) {
					var other = typeof value.valueOf == "function" ? value.valueOf() : value;
					value = isObject(other) ? other + "" : other;
				}
				if (typeof value != "string") {
					return value === 0 ? value : +value;
				}
				value = value.replace(reTrim, "");
				var isBinary = reIsBinary.test(value);
				return isBinary || reIsOctal.test(value)
					? freeParseInt(value.slice(2), isBinary ? 2 : 8)
					: reIsBadHex.test(value)
					? NAN
					: +value;
			}

			module.exports = throttle;

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
		/******/ __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		/******/
		/******/ // Return the exports of the module
		/******/ return module.exports;
		/******/
	}
	/******/
	/************************************************************************/
	/******/ /* webpack/runtime/compat get default export */
	/******/ (() => {
		/******/ // getDefaultExport function for compatibility with non-harmony modules
		/******/ __webpack_require__.n = (module) => {
			/******/ var getter =
				module && module.__esModule ? /******/ () => module["default"] : /******/ () => module;
			/******/ __webpack_require__.d(getter, { a: getter });
			/******/ return getter;
			/******/
		};
		/******/
	})();
	/******/
	/******/ /* webpack/runtime/define property getters */
	/******/ (() => {
		/******/ // define getter functions for harmony exports
		/******/ __webpack_require__.d = (exports, definition) => {
			/******/ for (var key in definition) {
				/******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
					/******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
					/******/
				}
				/******/
			}
			/******/
		};
		/******/
	})();
	/******/
	/******/ /* webpack/runtime/global */
	/******/ (() => {
		/******/ __webpack_require__.g = (function () {
			/******/ if (typeof globalThis === "object") return globalThis;
			/******/ try {
				/******/ return this || new Function("return this")();
				/******/
			} catch (e) {
				/******/ if (typeof window === "object") return window;
				/******/
			}
			/******/
		})();
		/******/
	})();
	/******/
	/******/ /* webpack/runtime/hasOwnProperty shorthand */
	/******/ (() => {
		/******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
		/******/
	})();
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
		// EXTERNAL MODULE: ./src/js/components/index-select.js
		var index_select = __webpack_require__(7854); // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/bind.js
		function bind(fn, thisArg) {
			return function wrap() {
				return fn.apply(thisArg, arguments);
			};
		} // CONCATENATED MODULE: ./node_modules/axios/lib/utils.js

		// utils is a library of generic helper functions non-specific to axios

		const { toString: utils_toString } = Object.prototype;
		const { getPrototypeOf } = Object;

		const kindOf = ((cache) => (thing) => {
			const str = utils_toString.call(thing);
			return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
		})(Object.create(null));

		const kindOfTest = (type) => {
			type = type.toLowerCase();
			return (thing) => kindOf(thing) === type;
		};

		const typeOfTest = (type) => (thing) => typeof thing === type;

		/**
		 * Determine if a value is an Array
		 *
		 * @param {Object} val The value to test
		 *
		 * @returns {boolean} True if value is an Array, otherwise false
		 */
		const { isArray } = Array;

		/**
		 * Determine if a value is undefined
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if the value is undefined, otherwise false
		 */
		const isUndefined = typeOfTest("undefined");

		/**
		 * Determine if a value is a Buffer
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is a Buffer, otherwise false
		 */
		function isBuffer(val) {
			return (
				val !== null &&
				!isUndefined(val) &&
				val.constructor !== null &&
				!isUndefined(val.constructor) &&
				isFunction(val.constructor.isBuffer) &&
				val.constructor.isBuffer(val)
			);
		}

		/**
		 * Determine if a value is an ArrayBuffer
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
		 */
		const isArrayBuffer = kindOfTest("ArrayBuffer");

		/**
		 * Determine if a value is a view on an ArrayBuffer
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
		 */
		function isArrayBufferView(val) {
			let result;
			if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
				result = ArrayBuffer.isView(val);
			} else {
				result = val && val.buffer && isArrayBuffer(val.buffer);
			}
			return result;
		}

		/**
		 * Determine if a value is a String
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is a String, otherwise false
		 */
		const isString = typeOfTest("string");

		/**
		 * Determine if a value is a Function
		 *
		 * @param {*} val The value to test
		 * @returns {boolean} True if value is a Function, otherwise false
		 */
		const isFunction = typeOfTest("function");

		/**
		 * Determine if a value is a Number
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is a Number, otherwise false
		 */
		const isNumber = typeOfTest("number");

		/**
		 * Determine if a value is an Object
		 *
		 * @param {*} thing The value to test
		 *
		 * @returns {boolean} True if value is an Object, otherwise false
		 */
		const isObject = (thing) => thing !== null && typeof thing === "object";

		/**
		 * Determine if a value is a Boolean
		 *
		 * @param {*} thing The value to test
		 * @returns {boolean} True if value is a Boolean, otherwise false
		 */
		const isBoolean = (thing) => thing === true || thing === false;

		/**
		 * Determine if a value is a plain Object
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is a plain Object, otherwise false
		 */
		const isPlainObject = (val) => {
			if (kindOf(val) !== "object") {
				return false;
			}

			const prototype = getPrototypeOf(val);
			return (
				(prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) &&
				!(Symbol.toStringTag in val) &&
				!(Symbol.iterator in val)
			);
		};

		/**
		 * Determine if a value is a Date
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is a Date, otherwise false
		 */
		const isDate = kindOfTest("Date");

		/**
		 * Determine if a value is a File
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is a File, otherwise false
		 */
		const isFile = kindOfTest("File");

		/**
		 * Determine if a value is a Blob
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is a Blob, otherwise false
		 */
		const isBlob = kindOfTest("Blob");

		/**
		 * Determine if a value is a FileList
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is a File, otherwise false
		 */
		const isFileList = kindOfTest("FileList");

		/**
		 * Determine if a value is a Stream
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is a Stream, otherwise false
		 */
		const isStream = (val) => isObject(val) && isFunction(val.pipe);

		/**
		 * Determine if a value is a FormData
		 *
		 * @param {*} thing The value to test
		 *
		 * @returns {boolean} True if value is an FormData, otherwise false
		 */
		const isFormData = (thing) => {
			let kind;
			return (
				thing &&
				((typeof FormData === "function" && thing instanceof FormData) ||
					(isFunction(thing.append) &&
						((kind = kindOf(thing)) === "formdata" ||
							// detect form-data instance
							(kind === "object" &&
								isFunction(thing.toString) &&
								thing.toString() === "[object FormData]"))))
			);
		};

		/**
		 * Determine if a value is a URLSearchParams object
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
		 */
		const isURLSearchParams = kindOfTest("URLSearchParams");

		/**
		 * Trim excess whitespace off the beginning and end of a string
		 *
		 * @param {String} str The String to trim
		 *
		 * @returns {String} The String freed of excess whitespace
		 */
		const trim = (str) => (str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""));

		/**
		 * Iterate over an Array or an Object invoking a function for each item.
		 *
		 * If `obj` is an Array callback will be called passing
		 * the value, index, and complete array for each item.
		 *
		 * If 'obj' is an Object callback will be called passing
		 * the value, key, and complete object for each property.
		 *
		 * @param {Object|Array} obj The object to iterate
		 * @param {Function} fn The callback to invoke for each item
		 *
		 * @param {Boolean} [allOwnKeys = false]
		 * @returns {any}
		 */
		function forEach(obj, fn, { allOwnKeys = false } = {}) {
			// Don't bother if no value provided
			if (obj === null || typeof obj === "undefined") {
				return;
			}

			let i;
			let l;

			// Force an array if not already something iterable
			if (typeof obj !== "object") {
				/*eslint no-param-reassign:0*/
				obj = [obj];
			}

			if (isArray(obj)) {
				// Iterate over array values
				for (i = 0, l = obj.length; i < l; i++) {
					fn.call(null, obj[i], i, obj);
				}
			} else {
				// Iterate over object keys
				const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
				const len = keys.length;
				let key;

				for (i = 0; i < len; i++) {
					key = keys[i];
					fn.call(null, obj[key], key, obj);
				}
			}
		}

		function findKey(obj, key) {
			key = key.toLowerCase();
			const keys = Object.keys(obj);
			let i = keys.length;
			let _key;
			while (i-- > 0) {
				_key = keys[i];
				if (key === _key.toLowerCase()) {
					return _key;
				}
			}
			return null;
		}

		const _global = (() => {
			/*eslint no-undef:0*/
			if (typeof globalThis !== "undefined") return globalThis;
			return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
		})();

		const isContextDefined = (context) => !isUndefined(context) && context !== _global;

		/**
		 * Accepts varargs expecting each argument to be an object, then
		 * immutably merges the properties of each object and returns result.
		 *
		 * When multiple objects contain the same key the later object in
		 * the arguments list will take precedence.
		 *
		 * Example:
		 *
		 * ```js
		 * var result = merge({foo: 123}, {foo: 456});
		 * console.log(result.foo); // outputs 456
		 * ```
		 *
		 * @param {Object} obj1 Object to merge
		 *
		 * @returns {Object} Result of all merge properties
		 */
		function merge(/* obj1, obj2, obj3, ... */) {
			const { caseless } = (isContextDefined(this) && this) || {};
			const result = {};
			const assignValue = (val, key) => {
				const targetKey = (caseless && findKey(result, key)) || key;
				if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
					result[targetKey] = merge(result[targetKey], val);
				} else if (isPlainObject(val)) {
					result[targetKey] = merge({}, val);
				} else if (isArray(val)) {
					result[targetKey] = val.slice();
				} else {
					result[targetKey] = val;
				}
			};

			for (let i = 0, l = arguments.length; i < l; i++) {
				arguments[i] && forEach(arguments[i], assignValue);
			}
			return result;
		}

		/**
		 * Extends object a by mutably adding to it the properties of object b.
		 *
		 * @param {Object} a The object to be extended
		 * @param {Object} b The object to copy properties from
		 * @param {Object} thisArg The object to bind function to
		 *
		 * @param {Boolean} [allOwnKeys]
		 * @returns {Object} The resulting value of object a
		 */
		const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
			forEach(
				b,
				(val, key) => {
					if (thisArg && isFunction(val)) {
						a[key] = bind(val, thisArg);
					} else {
						a[key] = val;
					}
				},
				{ allOwnKeys }
			);
			return a;
		};

		/**
		 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
		 *
		 * @param {string} content with BOM
		 *
		 * @returns {string} content value without BOM
		 */
		const stripBOM = (content) => {
			if (content.charCodeAt(0) === 0xfeff) {
				content = content.slice(1);
			}
			return content;
		};

		/**
		 * Inherit the prototype methods from one constructor into another
		 * @param {function} constructor
		 * @param {function} superConstructor
		 * @param {object} [props]
		 * @param {object} [descriptors]
		 *
		 * @returns {void}
		 */
		const inherits = (constructor, superConstructor, props, descriptors) => {
			constructor.prototype = Object.create(superConstructor.prototype, descriptors);
			constructor.prototype.constructor = constructor;
			Object.defineProperty(constructor, "super", {
				value: superConstructor.prototype,
			});
			props && Object.assign(constructor.prototype, props);
		};

		/**
		 * Resolve object with deep prototype chain to a flat object
		 * @param {Object} sourceObj source object
		 * @param {Object} [destObj]
		 * @param {Function|Boolean} [filter]
		 * @param {Function} [propFilter]
		 *
		 * @returns {Object}
		 */
		const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
			let props;
			let i;
			let prop;
			const merged = {};

			destObj = destObj || {};
			// eslint-disable-next-line no-eq-null,eqeqeq
			if (sourceObj == null) return destObj;

			do {
				props = Object.getOwnPropertyNames(sourceObj);
				i = props.length;
				while (i-- > 0) {
					prop = props[i];
					if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
						destObj[prop] = sourceObj[prop];
						merged[prop] = true;
					}
				}
				sourceObj = filter !== false && getPrototypeOf(sourceObj);
			} while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

			return destObj;
		};

		/**
		 * Determines whether a string ends with the characters of a specified string
		 *
		 * @param {String} str
		 * @param {String} searchString
		 * @param {Number} [position= 0]
		 *
		 * @returns {boolean}
		 */
		const endsWith = (str, searchString, position) => {
			str = String(str);
			if (position === undefined || position > str.length) {
				position = str.length;
			}
			position -= searchString.length;
			const lastIndex = str.indexOf(searchString, position);
			return lastIndex !== -1 && lastIndex === position;
		};

		/**
		 * Returns new array from array like object or null if failed
		 *
		 * @param {*} [thing]
		 *
		 * @returns {?Array}
		 */
		const toArray = (thing) => {
			if (!thing) return null;
			if (isArray(thing)) return thing;
			let i = thing.length;
			if (!isNumber(i)) return null;
			const arr = new Array(i);
			while (i-- > 0) {
				arr[i] = thing[i];
			}
			return arr;
		};

		/**
		 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
		 * thing passed in is an instance of Uint8Array
		 *
		 * @param {TypedArray}
		 *
		 * @returns {Array}
		 */
		// eslint-disable-next-line func-names
		const isTypedArray = ((TypedArray) => {
			// eslint-disable-next-line func-names
			return (thing) => {
				return TypedArray && thing instanceof TypedArray;
			};
		})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));

		/**
		 * For each entry in the object, call the function with the key and value.
		 *
		 * @param {Object<any, any>} obj - The object to iterate over.
		 * @param {Function} fn - The function to call for each entry.
		 *
		 * @returns {void}
		 */
		const forEachEntry = (obj, fn) => {
			const generator = obj && obj[Symbol.iterator];

			const iterator = generator.call(obj);

			let result;

			while ((result = iterator.next()) && !result.done) {
				const pair = result.value;
				fn.call(obj, pair[0], pair[1]);
			}
		};

		/**
		 * It takes a regular expression and a string, and returns an array of all the matches
		 *
		 * @param {string} regExp - The regular expression to match against.
		 * @param {string} str - The string to search.
		 *
		 * @returns {Array<boolean>}
		 */
		const matchAll = (regExp, str) => {
			let matches;
			const arr = [];

			while ((matches = regExp.exec(str)) !== null) {
				arr.push(matches);
			}

			return arr;
		};

		/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
		const isHTMLForm = kindOfTest("HTMLFormElement");

		const toCamelCase = (str) => {
			return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
				return p1.toUpperCase() + p2;
			});
		};

		/* Creating a function that will check if an object has a property. */
		const utils_hasOwnProperty = (
			({ hasOwnProperty }) =>
			(obj, prop) =>
				hasOwnProperty.call(obj, prop)
		)(Object.prototype);

		/**
		 * Determine if a value is a RegExp object
		 *
		 * @param {*} val The value to test
		 *
		 * @returns {boolean} True if value is a RegExp object, otherwise false
		 */
		const isRegExp = kindOfTest("RegExp");

		const reduceDescriptors = (obj, reducer) => {
			const descriptors = Object.getOwnPropertyDescriptors(obj);
			const reducedDescriptors = {};

			forEach(descriptors, (descriptor, name) => {
				let ret;
				if ((ret = reducer(descriptor, name, obj)) !== false) {
					reducedDescriptors[name] = ret || descriptor;
				}
			});

			Object.defineProperties(obj, reducedDescriptors);
		};

		/**
		 * Makes all methods read-only
		 * @param {Object} obj
		 */

		const freezeMethods = (obj) => {
			reduceDescriptors(obj, (descriptor, name) => {
				// skip restricted props in strict mode
				if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
					return false;
				}

				const value = obj[name];

				if (!isFunction(value)) return;

				descriptor.enumerable = false;

				if ("writable" in descriptor) {
					descriptor.writable = false;
					return;
				}

				if (!descriptor.set) {
					descriptor.set = () => {
						throw Error("Can not rewrite read-only method '" + name + "'");
					};
				}
			});
		};

		const toObjectSet = (arrayOrString, delimiter) => {
			const obj = {};

			const define = (arr) => {
				arr.forEach((value) => {
					obj[value] = true;
				});
			};

			isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

			return obj;
		};

		const noop = () => {};

		const toFiniteNumber = (value, defaultValue) => {
			value = +value;
			return Number.isFinite(value) ? value : defaultValue;
		};

		const ALPHA = "abcdefghijklmnopqrstuvwxyz";

		const DIGIT = "0123456789";

		const ALPHABET = {
			DIGIT,
			ALPHA,
			ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT,
		};

		const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
			let str = "";
			const { length } = alphabet;
			while (size--) {
				str += alphabet[(Math.random() * length) | 0];
			}

			return str;
		};

		/**
		 * If the thing is a FormData object, return true, otherwise return false.
		 *
		 * @param {unknown} thing - The thing to check.
		 *
		 * @returns {boolean}
		 */
		function isSpecCompliantForm(thing) {
			return !!(
				thing &&
				isFunction(thing.append) &&
				thing[Symbol.toStringTag] === "FormData" &&
				thing[Symbol.iterator]
			);
		}

		const toJSONObject = (obj) => {
			const stack = new Array(10);

			const visit = (source, i) => {
				if (isObject(source)) {
					if (stack.indexOf(source) >= 0) {
						return;
					}

					if (!("toJSON" in source)) {
						stack[i] = source;
						const target = isArray(source) ? [] : {};

						forEach(source, (value, key) => {
							const reducedValue = visit(value, i + 1);
							!isUndefined(reducedValue) && (target[key] = reducedValue);
						});

						stack[i] = undefined;

						return target;
					}
				}

				return source;
			};

			return visit(obj, 0);
		};

		const isAsyncFn = kindOfTest("AsyncFunction");

		const isThenable = (thing) =>
			thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

		/* harmony default export */ const utils = {
			isArray,
			isArrayBuffer,
			isBuffer,
			isFormData,
			isArrayBufferView,
			isString,
			isNumber,
			isBoolean,
			isObject,
			isPlainObject,
			isUndefined,
			isDate,
			isFile,
			isBlob,
			isRegExp,
			isFunction,
			isStream,
			isURLSearchParams,
			isTypedArray,
			isFileList,
			forEach,
			merge,
			extend,
			trim,
			stripBOM,
			inherits,
			toFlatObject,
			kindOf,
			kindOfTest,
			endsWith,
			toArray,
			forEachEntry,
			matchAll,
			isHTMLForm,
			hasOwnProperty: utils_hasOwnProperty,
			hasOwnProp: utils_hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
			reduceDescriptors,
			freezeMethods,
			toObjectSet,
			toCamelCase,
			noop,
			toFiniteNumber,
			findKey,
			global: _global,
			isContextDefined,
			ALPHABET,
			generateString,
			isSpecCompliantForm,
			toJSONObject,
			isAsyncFn,
			isThenable,
		}; // CONCATENATED MODULE: ./node_modules/axios/lib/core/AxiosError.js

		/**
		 * Create an Error with the specified message, config, error code, request and response.
		 *
		 * @param {string} message The error message.
		 * @param {string} [code] The error code (for example, 'ECONNABORTED').
		 * @param {Object} [config] The config.
		 * @param {Object} [request] The request.
		 * @param {Object} [response] The response.
		 *
		 * @returns {Error} The created error.
		 */
		function AxiosError(message, code, config, request, response) {
			Error.call(this);

			if (Error.captureStackTrace) {
				Error.captureStackTrace(this, this.constructor);
			} else {
				this.stack = new Error().stack;
			}

			this.message = message;
			this.name = "AxiosError";
			code && (this.code = code);
			config && (this.config = config);
			request && (this.request = request);
			response && (this.response = response);
		}

		utils.inherits(AxiosError, Error, {
			toJSON: function toJSON() {
				return {
					// Standard
					message: this.message,
					name: this.name,
					// Microsoft
					description: this.description,
					number: this.number,
					// Mozilla
					fileName: this.fileName,
					lineNumber: this.lineNumber,
					columnNumber: this.columnNumber,
					stack: this.stack,
					// Axios
					config: utils.toJSONObject(this.config),
					code: this.code,
					status: this.response && this.response.status ? this.response.status : null,
				};
			},
		});

		const AxiosError_prototype = AxiosError.prototype;
		const descriptors = {};

		[
			"ERR_BAD_OPTION_VALUE",
			"ERR_BAD_OPTION",
			"ECONNABORTED",
			"ETIMEDOUT",
			"ERR_NETWORK",
			"ERR_FR_TOO_MANY_REDIRECTS",
			"ERR_DEPRECATED",
			"ERR_BAD_RESPONSE",
			"ERR_BAD_REQUEST",
			"ERR_CANCELED",
			"ERR_NOT_SUPPORT",
			"ERR_INVALID_URL",
			// eslint-disable-next-line func-names
		].forEach((code) => {
			descriptors[code] = { value: code };
		});

		Object.defineProperties(AxiosError, descriptors);
		Object.defineProperty(AxiosError_prototype, "isAxiosError", { value: true });

		// eslint-disable-next-line func-names
		AxiosError.from = (error, code, config, request, response, customProps) => {
			const axiosError = Object.create(AxiosError_prototype);

			utils.toFlatObject(
				error,
				axiosError,
				function filter(obj) {
					return obj !== Error.prototype;
				},
				(prop) => {
					return prop !== "isAxiosError";
				}
			);

			AxiosError.call(axiosError, error.message, code, config, request, response);

			axiosError.cause = error;

			axiosError.name = error.name;

			customProps && Object.assign(axiosError, customProps);

			return axiosError;
		};

		/* harmony default export */ const core_AxiosError = AxiosError; // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/null.js

		// eslint-disable-next-line strict
		/* harmony default export */ const helpers_null = null; // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/toFormData.js

		// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored

		/**
		 * Determines if the given thing is a array or js object.
		 *
		 * @param {string} thing - The object or array to be visited.
		 *
		 * @returns {boolean}
		 */
		function isVisitable(thing) {
			return utils.isPlainObject(thing) || utils.isArray(thing);
		}

		/**
		 * It removes the brackets from the end of a string
		 *
		 * @param {string} key - The key of the parameter.
		 *
		 * @returns {string} the key without the brackets.
		 */
		function removeBrackets(key) {
			return utils.endsWith(key, "[]") ? key.slice(0, -2) : key;
		}

		/**
		 * It takes a path, a key, and a boolean, and returns a string
		 *
		 * @param {string} path - The path to the current key.
		 * @param {string} key - The key of the current object being iterated over.
		 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
		 *
		 * @returns {string} The path to the current key.
		 */
		function renderKey(path, key, dots) {
			if (!path) return key;
			return path
				.concat(key)
				.map(function each(token, i) {
					// eslint-disable-next-line no-param-reassign
					token = removeBrackets(token);
					return !dots && i ? "[" + token + "]" : token;
				})
				.join(dots ? "." : "");
		}

		/**
		 * If the array is an array and none of its elements are visitable, then it's a flat array.
		 *
		 * @param {Array<any>} arr - The array to check
		 *
		 * @returns {boolean}
		 */
		function isFlatArray(arr) {
			return utils.isArray(arr) && !arr.some(isVisitable);
		}

		const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
			return /^is[A-Z]/.test(prop);
		});

		/**
		 * Convert a data object to FormData
		 *
		 * @param {Object} obj
		 * @param {?Object} [formData]
		 * @param {?Object} [options]
		 * @param {Function} [options.visitor]
		 * @param {Boolean} [options.metaTokens = true]
		 * @param {Boolean} [options.dots = false]
		 * @param {?Boolean} [options.indexes = false]
		 *
		 * @returns {Object}
		 **/

		/**
		 * It converts an object into a FormData object
		 *
		 * @param {Object<any, any>} obj - The object to convert to form data.
		 * @param {string} formData - The FormData object to append to.
		 * @param {Object<string, any>} options
		 *
		 * @returns
		 */
		function toFormData(obj, formData, options) {
			if (!utils.isObject(obj)) {
				throw new TypeError("target must be an object");
			}

			// eslint-disable-next-line no-param-reassign
			formData = formData || new (helpers_null || FormData)();

			// eslint-disable-next-line no-param-reassign
			options = utils.toFlatObject(
				options,
				{
					metaTokens: true,
					dots: false,
					indexes: false,
				},
				false,
				function defined(option, source) {
					// eslint-disable-next-line no-eq-null,eqeqeq
					return !utils.isUndefined(source[option]);
				}
			);

			const metaTokens = options.metaTokens;
			// eslint-disable-next-line no-use-before-define
			const visitor = options.visitor || defaultVisitor;
			const dots = options.dots;
			const indexes = options.indexes;
			const _Blob = options.Blob || (typeof Blob !== "undefined" && Blob);
			const useBlob = _Blob && utils.isSpecCompliantForm(formData);

			if (!utils.isFunction(visitor)) {
				throw new TypeError("visitor must be a function");
			}

			function convertValue(value) {
				if (value === null) return "";

				if (utils.isDate(value)) {
					return value.toISOString();
				}

				if (!useBlob && utils.isBlob(value)) {
					throw new core_AxiosError("Blob is not supported. Use a Buffer instead.");
				}

				if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
					return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
				}

				return value;
			}

			/**
			 * Default visitor.
			 *
			 * @param {*} value
			 * @param {String|Number} key
			 * @param {Array<String|Number>} path
			 * @this {FormData}
			 *
			 * @returns {boolean} return true to visit the each prop of the value recursively
			 */
			function defaultVisitor(value, key, path) {
				let arr = value;

				if (value && !path && typeof value === "object") {
					if (utils.endsWith(key, "{}")) {
						// eslint-disable-next-line no-param-reassign
						key = metaTokens ? key : key.slice(0, -2);
						// eslint-disable-next-line no-param-reassign
						value = JSON.stringify(value);
					} else if (
						(utils.isArray(value) && isFlatArray(value)) ||
						((utils.isFileList(value) || utils.endsWith(key, "[]")) && (arr = utils.toArray(value)))
					) {
						// eslint-disable-next-line no-param-reassign
						key = removeBrackets(key);

						arr.forEach(function each(el, index) {
							!(utils.isUndefined(el) || el === null) &&
								formData.append(
									// eslint-disable-next-line no-nested-ternary
									indexes === true
										? renderKey([key], index, dots)
										: indexes === null
										? key
										: key + "[]",
									convertValue(el)
								);
						});
						return false;
					}
				}

				if (isVisitable(value)) {
					return true;
				}

				formData.append(renderKey(path, key, dots), convertValue(value));

				return false;
			}

			const stack = [];

			const exposedHelpers = Object.assign(predicates, {
				defaultVisitor,
				convertValue,
				isVisitable,
			});

			function build(value, path) {
				if (utils.isUndefined(value)) return;

				if (stack.indexOf(value) !== -1) {
					throw Error("Circular reference detected in " + path.join("."));
				}

				stack.push(value);

				utils.forEach(value, function each(el, key) {
					const result =
						!(utils.isUndefined(el) || el === null) &&
						visitor.call(formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers);

					if (result === true) {
						build(el, path ? path.concat(key) : [key]);
					}
				});

				stack.pop();
			}

			if (!utils.isObject(obj)) {
				throw new TypeError("data must be an object");
			}

			build(obj);

			return formData;
		}

		/* harmony default export */ const helpers_toFormData = toFormData; // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/AxiosURLSearchParams.js

		/**
		 * It encodes a string by replacing all characters that are not in the unreserved set with
		 * their percent-encoded equivalents
		 *
		 * @param {string} str - The string to encode.
		 *
		 * @returns {string} The encoded string.
		 */
		function encode(str) {
			const charMap = {
				"!": "%21",
				"'": "%27",
				"(": "%28",
				")": "%29",
				"~": "%7E",
				"%20": "+",
				"%00": "\x00",
			};
			return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
				return charMap[match];
			});
		}

		/**
		 * It takes a params object and converts it to a FormData object
		 *
		 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
		 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
		 *
		 * @returns {void}
		 */
		function AxiosURLSearchParams(params, options) {
			this._pairs = [];

			params && helpers_toFormData(params, this, options);
		}

		const AxiosURLSearchParams_prototype = AxiosURLSearchParams.prototype;

		AxiosURLSearchParams_prototype.append = function append(name, value) {
			this._pairs.push([name, value]);
		};

		AxiosURLSearchParams_prototype.toString = function toString(encoder) {
			const _encode = encoder
				? function (value) {
						return encoder.call(this, value, encode);
				  }
				: encode;

			return this._pairs
				.map(function each(pair) {
					return _encode(pair[0]) + "=" + _encode(pair[1]);
				}, "")
				.join("&");
		};

		/* harmony default export */ const helpers_AxiosURLSearchParams = AxiosURLSearchParams; // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/buildURL.js

		/**
		 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
		 * URI encoded counterparts
		 *
		 * @param {string} val The value to be encoded.
		 *
		 * @returns {string} The encoded value.
		 */
		function buildURL_encode(val) {
			return encodeURIComponent(val)
				.replace(/%3A/gi, ":")
				.replace(/%24/g, "$")
				.replace(/%2C/gi, ",")
				.replace(/%20/g, "+")
				.replace(/%5B/gi, "[")
				.replace(/%5D/gi, "]");
		}

		/**
		 * Build a URL by appending params to the end
		 *
		 * @param {string} url The base of the url (e.g., http://www.google.com)
		 * @param {object} [params] The params to be appended
		 * @param {?object} options
		 *
		 * @returns {string} The formatted url
		 */
		function buildURL(url, params, options) {
			/*eslint no-param-reassign:0*/
			if (!params) {
				return url;
			}

			const _encode = (options && options.encode) || buildURL_encode;

			const serializeFn = options && options.serialize;

			let serializedParams;

			if (serializeFn) {
				serializedParams = serializeFn(params, options);
			} else {
				serializedParams = utils.isURLSearchParams(params)
					? params.toString()
					: new helpers_AxiosURLSearchParams(params, options).toString(_encode);
			}

			if (serializedParams) {
				const hashmarkIndex = url.indexOf("#");

				if (hashmarkIndex !== -1) {
					url = url.slice(0, hashmarkIndex);
				}
				url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
			}

			return url;
		} // CONCATENATED MODULE: ./node_modules/axios/lib/core/InterceptorManager.js

		class InterceptorManager {
			constructor() {
				this.handlers = [];
			}

			/**
			 * Add a new interceptor to the stack
			 *
			 * @param {Function} fulfilled The function to handle `then` for a `Promise`
			 * @param {Function} rejected The function to handle `reject` for a `Promise`
			 *
			 * @return {Number} An ID used to remove interceptor later
			 */
			use(fulfilled, rejected, options) {
				this.handlers.push({
					fulfilled,
					rejected,
					synchronous: options ? options.synchronous : false,
					runWhen: options ? options.runWhen : null,
				});
				return this.handlers.length - 1;
			}

			/**
			 * Remove an interceptor from the stack
			 *
			 * @param {Number} id The ID that was returned by `use`
			 *
			 * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
			 */
			eject(id) {
				if (this.handlers[id]) {
					this.handlers[id] = null;
				}
			}

			/**
			 * Clear all interceptors from the stack
			 *
			 * @returns {void}
			 */
			clear() {
				if (this.handlers) {
					this.handlers = [];
				}
			}

			/**
			 * Iterate over all the registered interceptors
			 *
			 * This method is particularly useful for skipping over any
			 * interceptors that may have become `null` calling `eject`.
			 *
			 * @param {Function} fn The function to call for each interceptor
			 *
			 * @returns {void}
			 */
			forEach(fn) {
				utils.forEach(this.handlers, function forEachHandler(h) {
					if (h !== null) {
						fn(h);
					}
				});
			}
		}

		/* harmony default export */ const core_InterceptorManager = InterceptorManager; // CONCATENATED MODULE: ./node_modules/axios/lib/defaults/transitional.js

		/* harmony default export */ const defaults_transitional = {
			silentJSONParsing: true,
			forcedJSONParsing: true,
			clarifyTimeoutError: false,
		}; // CONCATENATED MODULE: ./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js

		/* harmony default export */ const classes_URLSearchParams =
			typeof URLSearchParams !== "undefined" ? URLSearchParams : helpers_AxiosURLSearchParams; // CONCATENATED MODULE: ./node_modules/axios/lib/platform/browser/classes/FormData.js

		/* harmony default export */ const classes_FormData = typeof FormData !== "undefined" ? FormData : null; // CONCATENATED MODULE: ./node_modules/axios/lib/platform/browser/classes/Blob.js

		/* harmony default export */ const classes_Blob = typeof Blob !== "undefined" ? Blob : null; // CONCATENATED MODULE: ./node_modules/axios/lib/platform/browser/index.js

		/**
		 * Determine if we're running in a standard browser environment
		 *
		 * This allows axios to run in a web worker, and react-native.
		 * Both environments support XMLHttpRequest, but not fully standard globals.
		 *
		 * web workers:
		 *  typeof window -> undefined
		 *  typeof document -> undefined
		 *
		 * react-native:
		 *  navigator.product -> 'ReactNative'
		 * nativescript
		 *  navigator.product -> 'NativeScript' or 'NS'
		 *
		 * @returns {boolean}
		 */
		const isStandardBrowserEnv = (() => {
			let product;
			if (
				typeof navigator !== "undefined" &&
				((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")
			) {
				return false;
			}

			return typeof window !== "undefined" && typeof document !== "undefined";
		})();

		/**
		 * Determine if we're running in a standard browser webWorker environment
		 *
		 * Although the `isStandardBrowserEnv` method indicates that
		 * `allows axios to run in a web worker`, the WebWorker will still be
		 * filtered out due to its judgment standard
		 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
		 * This leads to a problem when axios post `FormData` in webWorker
		 */
		const isStandardBrowserWebWorkerEnv = (() => {
			return (
				typeof WorkerGlobalScope !== "undefined" &&
				// eslint-disable-next-line no-undef
				self instanceof WorkerGlobalScope &&
				typeof self.importScripts === "function"
			);
		})();

		/* harmony default export */ const browser = {
			isBrowser: true,
			classes: {
				URLSearchParams: classes_URLSearchParams,
				FormData: classes_FormData,
				Blob: classes_Blob,
			},
			isStandardBrowserEnv,
			isStandardBrowserWebWorkerEnv,
			protocols: ["http", "https", "file", "blob", "url", "data"],
		}; // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/toURLEncodedForm.js

		function toURLEncodedForm(data, options) {
			return helpers_toFormData(
				data,
				new browser.classes.URLSearchParams(),
				Object.assign(
					{
						visitor: function (value, key, path, helpers) {
							if (browser.isNode && utils.isBuffer(value)) {
								this.append(key, value.toString("base64"));
								return false;
							}

							return helpers.defaultVisitor.apply(this, arguments);
						},
					},
					options
				)
			);
		} // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/formDataToJSON.js

		/**
		 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
		 *
		 * @param {string} name - The name of the property to get.
		 *
		 * @returns An array of strings.
		 */
		function parsePropPath(name) {
			// foo[x][y][z]
			// foo.x.y.z
			// foo-x-y-z
			// foo x y z
			return utils.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
				return match[0] === "[]" ? "" : match[1] || match[0];
			});
		}

		/**
		 * Convert an array to an object.
		 *
		 * @param {Array<any>} arr - The array to convert to an object.
		 *
		 * @returns An object with the same keys and values as the array.
		 */
		function arrayToObject(arr) {
			const obj = {};
			const keys = Object.keys(arr);
			let i;
			const len = keys.length;
			let key;
			for (i = 0; i < len; i++) {
				key = keys[i];
				obj[key] = arr[key];
			}
			return obj;
		}

		/**
		 * It takes a FormData object and returns a JavaScript object
		 *
		 * @param {string} formData The FormData object to convert to JSON.
		 *
		 * @returns {Object<string, any> | null} The converted object.
		 */
		function formDataToJSON(formData) {
			function buildPath(path, value, target, index) {
				let name = path[index++];
				const isNumericKey = Number.isFinite(+name);
				const isLast = index >= path.length;
				name = !name && utils.isArray(target) ? target.length : name;

				if (isLast) {
					if (utils.hasOwnProp(target, name)) {
						target[name] = [target[name], value];
					} else {
						target[name] = value;
					}

					return !isNumericKey;
				}

				if (!target[name] || !utils.isObject(target[name])) {
					target[name] = [];
				}

				const result = buildPath(path, value, target[name], index);

				if (result && utils.isArray(target[name])) {
					target[name] = arrayToObject(target[name]);
				}

				return !isNumericKey;
			}

			if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
				const obj = {};

				utils.forEachEntry(formData, (name, value) => {
					buildPath(parsePropPath(name), value, obj, 0);
				});

				return obj;
			}

			return null;
		}

		/* harmony default export */ const helpers_formDataToJSON = formDataToJSON; // CONCATENATED MODULE: ./node_modules/axios/lib/defaults/index.js

		/**
		 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
		 * of the input
		 *
		 * @param {any} rawValue - The value to be stringified.
		 * @param {Function} parser - A function that parses a string into a JavaScript object.
		 * @param {Function} encoder - A function that takes a value and returns a string.
		 *
		 * @returns {string} A stringified version of the rawValue.
		 */
		function stringifySafely(rawValue, parser, encoder) {
			if (utils.isString(rawValue)) {
				try {
					(parser || JSON.parse)(rawValue);
					return utils.trim(rawValue);
				} catch (e) {
					if (e.name !== "SyntaxError") {
						throw e;
					}
				}
			}

			return (encoder || JSON.stringify)(rawValue);
		}

		const defaults = {
			transitional: defaults_transitional,

			adapter: browser.isNode ? "http" : "xhr",

			transformRequest: [
				function transformRequest(data, headers) {
					const contentType = headers.getContentType() || "";
					const hasJSONContentType = contentType.indexOf("application/json") > -1;
					const isObjectPayload = utils.isObject(data);

					if (isObjectPayload && utils.isHTMLForm(data)) {
						data = new FormData(data);
					}

					const isFormData = utils.isFormData(data);

					if (isFormData) {
						if (!hasJSONContentType) {
							return data;
						}
						return hasJSONContentType ? JSON.stringify(helpers_formDataToJSON(data)) : data;
					}

					if (
						utils.isArrayBuffer(data) ||
						utils.isBuffer(data) ||
						utils.isStream(data) ||
						utils.isFile(data) ||
						utils.isBlob(data)
					) {
						return data;
					}
					if (utils.isArrayBufferView(data)) {
						return data.buffer;
					}
					if (utils.isURLSearchParams(data)) {
						headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
						return data.toString();
					}

					let isFileList;

					if (isObjectPayload) {
						if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
							return toURLEncodedForm(data, this.formSerializer).toString();
						}

						if ((isFileList = utils.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
							const _FormData = this.env && this.env.FormData;

							return helpers_toFormData(
								isFileList ? { "files[]": data } : data,
								_FormData && new _FormData(),
								this.formSerializer
							);
						}
					}

					if (isObjectPayload || hasJSONContentType) {
						headers.setContentType("application/json", false);
						return stringifySafely(data);
					}

					return data;
				},
			],

			transformResponse: [
				function transformResponse(data) {
					const transitional = this.transitional || defaults.transitional;
					const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
					const JSONRequested = this.responseType === "json";

					if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
						const silentJSONParsing = transitional && transitional.silentJSONParsing;
						const strictJSONParsing = !silentJSONParsing && JSONRequested;

						try {
							return JSON.parse(data);
						} catch (e) {
							if (strictJSONParsing) {
								if (e.name === "SyntaxError") {
									throw core_AxiosError.from(
										e,
										core_AxiosError.ERR_BAD_RESPONSE,
										this,
										null,
										this.response
									);
								}
								throw e;
							}
						}
					}

					return data;
				},
			],

			/**
			 * A timeout in milliseconds to abort a request. If set to 0 (default) a
			 * timeout is not created.
			 */
			timeout: 0,

			xsrfCookieName: "XSRF-TOKEN",
			xsrfHeaderName: "X-XSRF-TOKEN",

			maxContentLength: -1,
			maxBodyLength: -1,

			env: {
				FormData: browser.classes.FormData,
				Blob: browser.classes.Blob,
			},

			validateStatus: function validateStatus(status) {
				return status >= 200 && status < 300;
			},

			headers: {
				common: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": undefined,
				},
			},
		};

		utils.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
			defaults.headers[method] = {};
		});

		/* harmony default export */ const lib_defaults = defaults; // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/parseHeaders.js

		// RawAxiosHeaders whose duplicates are ignored by node
		// c.f. https://nodejs.org/api/http.html#http_message_headers
		const ignoreDuplicateOf = utils.toObjectSet([
			"age",
			"authorization",
			"content-length",
			"content-type",
			"etag",
			"expires",
			"from",
			"host",
			"if-modified-since",
			"if-unmodified-since",
			"last-modified",
			"location",
			"max-forwards",
			"proxy-authorization",
			"referer",
			"retry-after",
			"user-agent",
		]);

		/**
		 * Parse headers into an object
		 *
		 * ```
		 * Date: Wed, 27 Aug 2014 08:58:49 GMT
		 * Content-Type: application/json
		 * Connection: keep-alive
		 * Transfer-Encoding: chunked
		 * ```
		 *
		 * @param {String} rawHeaders Headers needing to be parsed
		 *
		 * @returns {Object} Headers parsed into an object
		 */
		/* harmony default export */ const parseHeaders = (rawHeaders) => {
			const parsed = {};
			let key;
			let val;
			let i;

			rawHeaders &&
				rawHeaders.split("\n").forEach(function parser(line) {
					i = line.indexOf(":");
					key = line.substring(0, i).trim().toLowerCase();
					val = line.substring(i + 1).trim();

					if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
						return;
					}

					if (key === "set-cookie") {
						if (parsed[key]) {
							parsed[key].push(val);
						} else {
							parsed[key] = [val];
						}
					} else {
						parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
					}
				});

			return parsed;
		}; // CONCATENATED MODULE: ./node_modules/axios/lib/core/AxiosHeaders.js

		const $internals = Symbol("internals");

		function normalizeHeader(header) {
			return header && String(header).trim().toLowerCase();
		}

		function normalizeValue(value) {
			if (value === false || value == null) {
				return value;
			}

			return utils.isArray(value) ? value.map(normalizeValue) : String(value);
		}

		function parseTokens(str) {
			const tokens = Object.create(null);
			const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
			let match;

			while ((match = tokensRE.exec(str))) {
				tokens[match[1]] = match[2];
			}

			return tokens;
		}

		const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

		function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
			if (utils.isFunction(filter)) {
				return filter.call(this, value, header);
			}

			if (isHeaderNameFilter) {
				value = header;
			}

			if (!utils.isString(value)) return;

			if (utils.isString(filter)) {
				return value.indexOf(filter) !== -1;
			}

			if (utils.isRegExp(filter)) {
				return filter.test(value);
			}
		}

		function formatHeader(header) {
			return header
				.trim()
				.toLowerCase()
				.replace(/([a-z\d])(\w*)/g, (w, char, str) => {
					return char.toUpperCase() + str;
				});
		}

		function buildAccessors(obj, header) {
			const accessorName = utils.toCamelCase(" " + header);

			["get", "set", "has"].forEach((methodName) => {
				Object.defineProperty(obj, methodName + accessorName, {
					value: function (arg1, arg2, arg3) {
						return this[methodName].call(this, header, arg1, arg2, arg3);
					},
					configurable: true,
				});
			});
		}

		class AxiosHeaders {
			constructor(headers) {
				headers && this.set(headers);
			}

			set(header, valueOrRewrite, rewrite) {
				const self = this;

				function setHeader(_value, _header, _rewrite) {
					const lHeader = normalizeHeader(_header);

					if (!lHeader) {
						throw new Error("header name must be a non-empty string");
					}

					const key = utils.findKey(self, lHeader);

					if (
						!key ||
						self[key] === undefined ||
						_rewrite === true ||
						(_rewrite === undefined && self[key] !== false)
					) {
						self[key || _header] = normalizeValue(_value);
					}
				}

				const setHeaders = (headers, _rewrite) =>
					utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

				if (utils.isPlainObject(header) || header instanceof this.constructor) {
					setHeaders(header, valueOrRewrite);
				} else if (utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
					setHeaders(parseHeaders(header), valueOrRewrite);
				} else {
					header != null && setHeader(valueOrRewrite, header, rewrite);
				}

				return this;
			}

			get(header, parser) {
				header = normalizeHeader(header);

				if (header) {
					const key = utils.findKey(this, header);

					if (key) {
						const value = this[key];

						if (!parser) {
							return value;
						}

						if (parser === true) {
							return parseTokens(value);
						}

						if (utils.isFunction(parser)) {
							return parser.call(this, value, key);
						}

						if (utils.isRegExp(parser)) {
							return parser.exec(value);
						}

						throw new TypeError("parser must be boolean|regexp|function");
					}
				}
			}

			has(header, matcher) {
				header = normalizeHeader(header);

				if (header) {
					const key = utils.findKey(this, header);

					return !!(
						key &&
						this[key] !== undefined &&
						(!matcher || matchHeaderValue(this, this[key], key, matcher))
					);
				}

				return false;
			}

			delete(header, matcher) {
				const self = this;
				let deleted = false;

				function deleteHeader(_header) {
					_header = normalizeHeader(_header);

					if (_header) {
						const key = utils.findKey(self, _header);

						if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
							delete self[key];

							deleted = true;
						}
					}
				}

				if (utils.isArray(header)) {
					header.forEach(deleteHeader);
				} else {
					deleteHeader(header);
				}

				return deleted;
			}

			clear(matcher) {
				const keys = Object.keys(this);
				let i = keys.length;
				let deleted = false;

				while (i--) {
					const key = keys[i];
					if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
						delete this[key];
						deleted = true;
					}
				}

				return deleted;
			}

			normalize(format) {
				const self = this;
				const headers = {};

				utils.forEach(this, (value, header) => {
					const key = utils.findKey(headers, header);

					if (key) {
						self[key] = normalizeValue(value);
						delete self[header];
						return;
					}

					const normalized = format ? formatHeader(header) : String(header).trim();

					if (normalized !== header) {
						delete self[header];
					}

					self[normalized] = normalizeValue(value);

					headers[normalized] = true;
				});

				return this;
			}

			concat(...targets) {
				return this.constructor.concat(this, ...targets);
			}

			toJSON(asStrings) {
				const obj = Object.create(null);

				utils.forEach(this, (value, header) => {
					value != null &&
						value !== false &&
						(obj[header] = asStrings && utils.isArray(value) ? value.join(", ") : value);
				});

				return obj;
			}

			[Symbol.iterator]() {
				return Object.entries(this.toJSON())[Symbol.iterator]();
			}

			toString() {
				return Object.entries(this.toJSON())
					.map(([header, value]) => header + ": " + value)
					.join("\n");
			}

			get [Symbol.toStringTag]() {
				return "AxiosHeaders";
			}

			static from(thing) {
				return thing instanceof this ? thing : new this(thing);
			}

			static concat(first, ...targets) {
				const computed = new this(first);

				targets.forEach((target) => computed.set(target));

				return computed;
			}

			static accessor(header) {
				const internals =
					(this[$internals] =
					this[$internals] =
						{
							accessors: {},
						});

				const accessors = internals.accessors;
				const prototype = this.prototype;

				function defineAccessor(_header) {
					const lHeader = normalizeHeader(_header);

					if (!accessors[lHeader]) {
						buildAccessors(prototype, _header);
						accessors[lHeader] = true;
					}
				}

				utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

				return this;
			}
		}

		AxiosHeaders.accessor([
			"Content-Type",
			"Content-Length",
			"Accept",
			"Accept-Encoding",
			"User-Agent",
			"Authorization",
		]);

		// reserved names hotfix
		utils.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
			let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
			return {
				get: () => value,
				set(headerValue) {
					this[mapped] = headerValue;
				},
			};
		});

		utils.freezeMethods(AxiosHeaders);

		/* harmony default export */ const core_AxiosHeaders = AxiosHeaders; // CONCATENATED MODULE: ./node_modules/axios/lib/core/transformData.js

		/**
		 * Transform the data for a request or a response
		 *
		 * @param {Array|Function} fns A single function or Array of functions
		 * @param {?Object} response The response object
		 *
		 * @returns {*} The resulting transformed data
		 */
		function transformData(fns, response) {
			const config = this || lib_defaults;
			const context = response || config;
			const headers = core_AxiosHeaders.from(context.headers);
			let data = context.data;

			utils.forEach(fns, function transform(fn) {
				data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
			});

			headers.normalize();

			return data;
		} // CONCATENATED MODULE: ./node_modules/axios/lib/cancel/isCancel.js

		function isCancel(value) {
			return !!(value && value.__CANCEL__);
		} // CONCATENATED MODULE: ./node_modules/axios/lib/cancel/CanceledError.js

		/**
		 * A `CanceledError` is an object that is thrown when an operation is canceled.
		 *
		 * @param {string=} message The message.
		 * @param {Object=} config The config.
		 * @param {Object=} request The request.
		 *
		 * @returns {CanceledError} The created error.
		 */
		function CanceledError(message, config, request) {
			// eslint-disable-next-line no-eq-null,eqeqeq
			core_AxiosError.call(
				this,
				message == null ? "canceled" : message,
				core_AxiosError.ERR_CANCELED,
				config,
				request
			);
			this.name = "CanceledError";
		}

		utils.inherits(CanceledError, core_AxiosError, {
			__CANCEL__: true,
		});

		/* harmony default export */ const cancel_CanceledError = CanceledError; // CONCATENATED MODULE: ./node_modules/axios/lib/core/settle.js

		/**
		 * Resolve or reject a Promise based on response status.
		 *
		 * @param {Function} resolve A function that resolves the promise.
		 * @param {Function} reject A function that rejects the promise.
		 * @param {object} response The response.
		 *
		 * @returns {object} The response.
		 */
		function settle(resolve, reject, response) {
			const validateStatus = response.config.validateStatus;
			if (!response.status || !validateStatus || validateStatus(response.status)) {
				resolve(response);
			} else {
				reject(
					new core_AxiosError(
						"Request failed with status code " + response.status,
						[core_AxiosError.ERR_BAD_REQUEST, core_AxiosError.ERR_BAD_RESPONSE][
							Math.floor(response.status / 100) - 4
						],
						response.config,
						response.request,
						response
					)
				);
			}
		} // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/cookies.js

		/* harmony default export */ const cookies = browser.isStandardBrowserEnv
			? // Standard browser envs support document.cookie
			  (function standardBrowserEnv() {
					return {
						write: function write(name, value, expires, path, domain, secure) {
							const cookie = [];
							cookie.push(name + "=" + encodeURIComponent(value));

							if (utils.isNumber(expires)) {
								cookie.push("expires=" + new Date(expires).toGMTString());
							}

							if (utils.isString(path)) {
								cookie.push("path=" + path);
							}

							if (utils.isString(domain)) {
								cookie.push("domain=" + domain);
							}

							if (secure === true) {
								cookie.push("secure");
							}

							document.cookie = cookie.join("; ");
						},

						read: function read(name) {
							const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
							return match ? decodeURIComponent(match[3]) : null;
						},

						remove: function remove(name) {
							this.write(name, "", Date.now() - 86400000);
						},
					};
			  })()
			: // Non standard browser env (web workers, react-native) lack needed support.
			  (function nonStandardBrowserEnv() {
					return {
						write: function write() {},
						read: function read() {
							return null;
						},
						remove: function remove() {},
					};
			  })(); // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/isAbsoluteURL.js

		/**
		 * Determines whether the specified URL is absolute
		 *
		 * @param {string} url The URL to test
		 *
		 * @returns {boolean} True if the specified URL is absolute, otherwise false
		 */
		function isAbsoluteURL(url) {
			// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
			// RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
			// by any combination of letters, digits, plus, period, or hyphen.
			return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
		} // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/combineURLs.js

		/**
		 * Creates a new URL by combining the specified URLs
		 *
		 * @param {string} baseURL The base URL
		 * @param {string} relativeURL The relative URL
		 *
		 * @returns {string} The combined URL
		 */
		function combineURLs(baseURL, relativeURL) {
			return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
		} // CONCATENATED MODULE: ./node_modules/axios/lib/core/buildFullPath.js

		/**
		 * Creates a new URL by combining the baseURL with the requestedURL,
		 * only when the requestedURL is not already an absolute URL.
		 * If the requestURL is absolute, this function returns the requestedURL untouched.
		 *
		 * @param {string} baseURL The base URL
		 * @param {string} requestedURL Absolute or relative URL to combine
		 *
		 * @returns {string} The combined full path
		 */
		function buildFullPath(baseURL, requestedURL) {
			if (baseURL && !isAbsoluteURL(requestedURL)) {
				return combineURLs(baseURL, requestedURL);
			}
			return requestedURL;
		} // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/isURLSameOrigin.js

		/* harmony default export */ const isURLSameOrigin = browser.isStandardBrowserEnv
			? // Standard browser envs have full support of the APIs needed to test
			  // whether the request URL is of the same origin as current location.
			  (function standardBrowserEnv() {
					const msie = /(msie|trident)/i.test(navigator.userAgent);
					const urlParsingNode = document.createElement("a");
					let originURL;

					/**
					 * Parse a URL to discover it's components
					 *
					 * @param {String} url The URL to be parsed
					 * @returns {Object}
					 */
					function resolveURL(url) {
						let href = url;

						if (msie) {
							// IE needs attribute set twice to normalize properties
							urlParsingNode.setAttribute("href", href);
							href = urlParsingNode.href;
						}

						urlParsingNode.setAttribute("href", href);

						// urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
						return {
							href: urlParsingNode.href,
							protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
							host: urlParsingNode.host,
							search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
							hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
							hostname: urlParsingNode.hostname,
							port: urlParsingNode.port,
							pathname:
								urlParsingNode.pathname.charAt(0) === "/"
									? urlParsingNode.pathname
									: "/" + urlParsingNode.pathname,
						};
					}

					originURL = resolveURL(window.location.href);

					/**
					 * Determine if a URL shares the same origin as the current location
					 *
					 * @param {String} requestURL The URL to test
					 * @returns {boolean} True if URL shares the same origin, otherwise false
					 */
					return function isURLSameOrigin(requestURL) {
						const parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
						return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
					};
			  })()
			: // Non standard browser envs (web workers, react-native) lack needed support.
			  (function nonStandardBrowserEnv() {
					return function isURLSameOrigin() {
						return true;
					};
			  })(); // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/parseProtocol.js

		function parseProtocol(url) {
			const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
			return (match && match[1]) || "";
		} // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/speedometer.js

		/**
		 * Calculate data maxRate
		 * @param {Number} [samplesCount= 10]
		 * @param {Number} [min= 1000]
		 * @returns {Function}
		 */
		function speedometer(samplesCount, min) {
			samplesCount = samplesCount || 10;
			const bytes = new Array(samplesCount);
			const timestamps = new Array(samplesCount);
			let head = 0;
			let tail = 0;
			let firstSampleTS;

			min = min !== undefined ? min : 1000;

			return function push(chunkLength) {
				const now = Date.now();

				const startedAt = timestamps[tail];

				if (!firstSampleTS) {
					firstSampleTS = now;
				}

				bytes[head] = chunkLength;
				timestamps[head] = now;

				let i = tail;
				let bytesCount = 0;

				while (i !== head) {
					bytesCount += bytes[i++];
					i = i % samplesCount;
				}

				head = (head + 1) % samplesCount;

				if (head === tail) {
					tail = (tail + 1) % samplesCount;
				}

				if (now - firstSampleTS < min) {
					return;
				}

				const passed = startedAt && now - startedAt;

				return passed ? Math.round((bytesCount * 1000) / passed) : undefined;
			};
		}

		/* harmony default export */ const helpers_speedometer = speedometer; // CONCATENATED MODULE: ./node_modules/axios/lib/adapters/xhr.js

		function progressEventReducer(listener, isDownloadStream) {
			let bytesNotified = 0;
			const _speedometer = helpers_speedometer(50, 250);

			return (e) => {
				const loaded = e.loaded;
				const total = e.lengthComputable ? e.total : undefined;
				const progressBytes = loaded - bytesNotified;
				const rate = _speedometer(progressBytes);
				const inRange = loaded <= total;

				bytesNotified = loaded;

				const data = {
					loaded,
					total,
					progress: total ? loaded / total : undefined,
					bytes: progressBytes,
					rate: rate ? rate : undefined,
					estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
					event: e,
				};

				data[isDownloadStream ? "download" : "upload"] = true;

				listener(data);
			};
		}

		const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";

		/* harmony default export */ const xhr =
			isXHRAdapterSupported &&
			function (config) {
				return new Promise(function dispatchXhrRequest(resolve, reject) {
					let requestData = config.data;
					const requestHeaders = core_AxiosHeaders.from(config.headers).normalize();
					const responseType = config.responseType;
					let onCanceled;
					function done() {
						if (config.cancelToken) {
							config.cancelToken.unsubscribe(onCanceled);
						}

						if (config.signal) {
							config.signal.removeEventListener("abort", onCanceled);
						}
					}

					if (utils.isFormData(requestData)) {
						if (browser.isStandardBrowserEnv || browser.isStandardBrowserWebWorkerEnv) {
							requestHeaders.setContentType(false); // Let the browser set it
						} else {
							requestHeaders.setContentType("multipart/form-data;", false); // mobile/desktop app frameworks
						}
					}

					let request = new XMLHttpRequest();

					// HTTP basic authentication
					if (config.auth) {
						const username = config.auth.username || "";
						const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
						requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
					}

					const fullPath = buildFullPath(config.baseURL, config.url);

					request.open(
						config.method.toUpperCase(),
						buildURL(fullPath, config.params, config.paramsSerializer),
						true
					);

					// Set the request timeout in MS
					request.timeout = config.timeout;

					function onloadend() {
						if (!request) {
							return;
						}
						// Prepare the response
						const responseHeaders = core_AxiosHeaders.from(
							"getAllResponseHeaders" in request && request.getAllResponseHeaders()
						);
						const responseData =
							!responseType || responseType === "text" || responseType === "json"
								? request.responseText
								: request.response;
						const response = {
							data: responseData,
							status: request.status,
							statusText: request.statusText,
							headers: responseHeaders,
							config,
							request,
						};

						settle(
							function _resolve(value) {
								resolve(value);
								done();
							},
							function _reject(err) {
								reject(err);
								done();
							},
							response
						);

						// Clean up request
						request = null;
					}

					if ("onloadend" in request) {
						// Use onloadend if available
						request.onloadend = onloadend;
					} else {
						// Listen for ready state to emulate onloadend
						request.onreadystatechange = function handleLoad() {
							if (!request || request.readyState !== 4) {
								return;
							}

							// The request errored out and we didn't get a response, this will be
							// handled by onerror instead
							// With one exception: request that using file: protocol, most browsers
							// will return status as 0 even though it's a successful request
							if (
								request.status === 0 &&
								!(request.responseURL && request.responseURL.indexOf("file:") === 0)
							) {
								return;
							}
							// readystate handler is calling before onerror or ontimeout handlers,
							// so we should call onloadend on the next 'tick'
							setTimeout(onloadend);
						};
					}

					// Handle browser request cancellation (as opposed to a manual cancellation)
					request.onabort = function handleAbort() {
						if (!request) {
							return;
						}

						reject(new core_AxiosError("Request aborted", core_AxiosError.ECONNABORTED, config, request));

						// Clean up request
						request = null;
					};

					// Handle low level network errors
					request.onerror = function handleError() {
						// Real errors are hidden from us by the browser
						// onerror should only fire if it's a network error
						reject(new core_AxiosError("Network Error", core_AxiosError.ERR_NETWORK, config, request));

						// Clean up request
						request = null;
					};

					// Handle timeout
					request.ontimeout = function handleTimeout() {
						let timeoutErrorMessage = config.timeout
							? "timeout of " + config.timeout + "ms exceeded"
							: "timeout exceeded";
						const transitional = config.transitional || defaults_transitional;
						if (config.timeoutErrorMessage) {
							timeoutErrorMessage = config.timeoutErrorMessage;
						}
						reject(
							new core_AxiosError(
								timeoutErrorMessage,
								transitional.clarifyTimeoutError
									? core_AxiosError.ETIMEDOUT
									: core_AxiosError.ECONNABORTED,
								config,
								request
							)
						);

						// Clean up request
						request = null;
					};

					// Add xsrf header
					// This is only done if running in a standard browser environment.
					// Specifically not if we're in a web worker, or react-native.
					if (browser.isStandardBrowserEnv) {
						// Add xsrf header
						const xsrfValue =
							(config.withCredentials || isURLSameOrigin(fullPath)) &&
							config.xsrfCookieName &&
							cookies.read(config.xsrfCookieName);

						if (xsrfValue) {
							requestHeaders.set(config.xsrfHeaderName, xsrfValue);
						}
					}

					// Remove Content-Type if data is undefined
					requestData === undefined && requestHeaders.setContentType(null);

					// Add headers to the request
					if ("setRequestHeader" in request) {
						utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
							request.setRequestHeader(key, val);
						});
					}

					// Add withCredentials to request if needed
					if (!utils.isUndefined(config.withCredentials)) {
						request.withCredentials = !!config.withCredentials;
					}

					// Add responseType to request if needed
					if (responseType && responseType !== "json") {
						request.responseType = config.responseType;
					}

					// Handle progress if needed
					if (typeof config.onDownloadProgress === "function") {
						request.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
					}

					// Not all browsers support upload events
					if (typeof config.onUploadProgress === "function" && request.upload) {
						request.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
					}

					if (config.cancelToken || config.signal) {
						// Handle cancellation
						// eslint-disable-next-line func-names
						onCanceled = (cancel) => {
							if (!request) {
								return;
							}
							reject(!cancel || cancel.type ? new cancel_CanceledError(null, config, request) : cancel);
							request.abort();
							request = null;
						};

						config.cancelToken && config.cancelToken.subscribe(onCanceled);
						if (config.signal) {
							config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
						}
					}

					const protocol = parseProtocol(fullPath);

					if (protocol && browser.protocols.indexOf(protocol) === -1) {
						reject(
							new core_AxiosError(
								"Unsupported protocol " + protocol + ":",
								core_AxiosError.ERR_BAD_REQUEST,
								config
							)
						);
						return;
					}

					// Send the request
					request.send(requestData || null);
				});
			}; // CONCATENATED MODULE: ./node_modules/axios/lib/adapters/adapters.js

		const knownAdapters = {
			http: helpers_null,
			xhr: xhr,
		};

		utils.forEach(knownAdapters, (fn, value) => {
			if (fn) {
				try {
					Object.defineProperty(fn, "name", { value });
				} catch (e) {
					// eslint-disable-next-line no-empty
				}
				Object.defineProperty(fn, "adapterName", { value });
			}
		});

		/* harmony default export */ const adapters = {
			getAdapter: (adapters) => {
				adapters = utils.isArray(adapters) ? adapters : [adapters];

				const { length } = adapters;
				let nameOrAdapter;
				let adapter;

				for (let i = 0; i < length; i++) {
					nameOrAdapter = adapters[i];
					if (
						(adapter = utils.isString(nameOrAdapter)
							? knownAdapters[nameOrAdapter.toLowerCase()]
							: nameOrAdapter)
					) {
						break;
					}
				}

				if (!adapter) {
					if (adapter === false) {
						throw new core_AxiosError(
							`Adapter ${nameOrAdapter} is not supported by the environment`,
							"ERR_NOT_SUPPORT"
						);
					}

					throw new Error(
						utils.hasOwnProp(knownAdapters, nameOrAdapter)
							? `Adapter '${nameOrAdapter}' is not available in the build`
							: `Unknown adapter '${nameOrAdapter}'`
					);
				}

				if (!utils.isFunction(adapter)) {
					throw new TypeError("adapter is not a function");
				}

				return adapter;
			},
			adapters: knownAdapters,
		}; // CONCATENATED MODULE: ./node_modules/axios/lib/core/dispatchRequest.js

		/**
		 * Throws a `CanceledError` if cancellation has been requested.
		 *
		 * @param {Object} config The config that is to be used for the request
		 *
		 * @returns {void}
		 */
		function throwIfCancellationRequested(config) {
			if (config.cancelToken) {
				config.cancelToken.throwIfRequested();
			}

			if (config.signal && config.signal.aborted) {
				throw new cancel_CanceledError(null, config);
			}
		}

		/**
		 * Dispatch a request to the server using the configured adapter.
		 *
		 * @param {object} config The config that is to be used for the request
		 *
		 * @returns {Promise} The Promise to be fulfilled
		 */
		function dispatchRequest(config) {
			throwIfCancellationRequested(config);

			config.headers = core_AxiosHeaders.from(config.headers);

			// Transform request data
			config.data = transformData.call(config, config.transformRequest);

			if (["post", "put", "patch"].indexOf(config.method) !== -1) {
				config.headers.setContentType("application/x-www-form-urlencoded", false);
			}

			const adapter = adapters.getAdapter(config.adapter || lib_defaults.adapter);

			return adapter(config).then(
				function onAdapterResolution(response) {
					throwIfCancellationRequested(config);

					// Transform response data
					response.data = transformData.call(config, config.transformResponse, response);

					response.headers = core_AxiosHeaders.from(response.headers);

					return response;
				},
				function onAdapterRejection(reason) {
					if (!isCancel(reason)) {
						throwIfCancellationRequested(config);

						// Transform response data
						if (reason && reason.response) {
							reason.response.data = transformData.call(
								config,
								config.transformResponse,
								reason.response
							);
							reason.response.headers = core_AxiosHeaders.from(reason.response.headers);
						}
					}

					return Promise.reject(reason);
				}
			);
		} // CONCATENATED MODULE: ./node_modules/axios/lib/core/mergeConfig.js

		const headersToObject = (thing) => (thing instanceof core_AxiosHeaders ? thing.toJSON() : thing);

		/**
		 * Config-specific merge-function which creates a new config-object
		 * by merging two configuration objects together.
		 *
		 * @param {Object} config1
		 * @param {Object} config2
		 *
		 * @returns {Object} New object resulting from merging config2 to config1
		 */
		function mergeConfig(config1, config2) {
			// eslint-disable-next-line no-param-reassign
			config2 = config2 || {};
			const config = {};

			function getMergedValue(target, source, caseless) {
				if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
					return utils.merge.call({ caseless }, target, source);
				} else if (utils.isPlainObject(source)) {
					return utils.merge({}, source);
				} else if (utils.isArray(source)) {
					return source.slice();
				}
				return source;
			}

			// eslint-disable-next-line consistent-return
			function mergeDeepProperties(a, b, caseless) {
				if (!utils.isUndefined(b)) {
					return getMergedValue(a, b, caseless);
				} else if (!utils.isUndefined(a)) {
					return getMergedValue(undefined, a, caseless);
				}
			}

			// eslint-disable-next-line consistent-return
			function valueFromConfig2(a, b) {
				if (!utils.isUndefined(b)) {
					return getMergedValue(undefined, b);
				}
			}

			// eslint-disable-next-line consistent-return
			function defaultToConfig2(a, b) {
				if (!utils.isUndefined(b)) {
					return getMergedValue(undefined, b);
				} else if (!utils.isUndefined(a)) {
					return getMergedValue(undefined, a);
				}
			}

			// eslint-disable-next-line consistent-return
			function mergeDirectKeys(a, b, prop) {
				if (prop in config2) {
					return getMergedValue(a, b);
				} else if (prop in config1) {
					return getMergedValue(undefined, a);
				}
			}

			const mergeMap = {
				url: valueFromConfig2,
				method: valueFromConfig2,
				data: valueFromConfig2,
				baseURL: defaultToConfig2,
				transformRequest: defaultToConfig2,
				transformResponse: defaultToConfig2,
				paramsSerializer: defaultToConfig2,
				timeout: defaultToConfig2,
				timeoutMessage: defaultToConfig2,
				withCredentials: defaultToConfig2,
				adapter: defaultToConfig2,
				responseType: defaultToConfig2,
				xsrfCookieName: defaultToConfig2,
				xsrfHeaderName: defaultToConfig2,
				onUploadProgress: defaultToConfig2,
				onDownloadProgress: defaultToConfig2,
				decompress: defaultToConfig2,
				maxContentLength: defaultToConfig2,
				maxBodyLength: defaultToConfig2,
				beforeRedirect: defaultToConfig2,
				transport: defaultToConfig2,
				httpAgent: defaultToConfig2,
				httpsAgent: defaultToConfig2,
				cancelToken: defaultToConfig2,
				socketPath: defaultToConfig2,
				responseEncoding: defaultToConfig2,
				validateStatus: mergeDirectKeys,
				headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true),
			};

			utils.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
				const merge = mergeMap[prop] || mergeDeepProperties;
				const configValue = merge(config1[prop], config2[prop], prop);
				(utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
			});

			return config;
		} // CONCATENATED MODULE: ./node_modules/axios/lib/env/data.js

		const VERSION = "1.5.0"; // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/validator.js
		const validators = {};

		// eslint-disable-next-line func-names
		["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
			validators[type] = function validator(thing) {
				return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
			};
		});

		const deprecatedWarnings = {};

		/**
		 * Transitional option validator
		 *
		 * @param {function|boolean?} validator - set to false if the transitional option has been removed
		 * @param {string?} version - deprecated version / removed since version
		 * @param {string?} message - some message with additional info
		 *
		 * @returns {function}
		 */
		validators.transitional = function transitional(validator, version, message) {
			function formatMessage(opt, desc) {
				return (
					"[Axios v" +
					VERSION +
					"] Transitional option '" +
					opt +
					"'" +
					desc +
					(message ? ". " + message : "")
				);
			}

			// eslint-disable-next-line func-names
			return (value, opt, opts) => {
				if (validator === false) {
					throw new core_AxiosError(
						formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
						core_AxiosError.ERR_DEPRECATED
					);
				}

				if (version && !deprecatedWarnings[opt]) {
					deprecatedWarnings[opt] = true;
					// eslint-disable-next-line no-console
					console.warn(
						formatMessage(
							opt,
							" has been deprecated since v" + version + " and will be removed in the near future"
						)
					);
				}

				return validator ? validator(value, opt, opts) : true;
			};
		};

		/**
		 * Assert object's properties type
		 *
		 * @param {object} options
		 * @param {object} schema
		 * @param {boolean?} allowUnknown
		 *
		 * @returns {object}
		 */

		function assertOptions(options, schema, allowUnknown) {
			if (typeof options !== "object") {
				throw new core_AxiosError("options must be an object", core_AxiosError.ERR_BAD_OPTION_VALUE);
			}
			const keys = Object.keys(options);
			let i = keys.length;
			while (i-- > 0) {
				const opt = keys[i];
				const validator = schema[opt];
				if (validator) {
					const value = options[opt];
					const result = value === undefined || validator(value, opt, options);
					if (result !== true) {
						throw new core_AxiosError(
							"option " + opt + " must be " + result,
							core_AxiosError.ERR_BAD_OPTION_VALUE
						);
					}
					continue;
				}
				if (allowUnknown !== true) {
					throw new core_AxiosError("Unknown option " + opt, core_AxiosError.ERR_BAD_OPTION);
				}
			}
		}

		/* harmony default export */ const validator = {
			assertOptions,
			validators,
		}; // CONCATENATED MODULE: ./node_modules/axios/lib/core/Axios.js

		const Axios_validators = validator.validators;

		/**
		 * Create a new instance of Axios
		 *
		 * @param {Object} instanceConfig The default config for the instance
		 *
		 * @return {Axios} A new instance of Axios
		 */
		class Axios {
			constructor(instanceConfig) {
				this.defaults = instanceConfig;
				this.interceptors = {
					request: new core_InterceptorManager(),
					response: new core_InterceptorManager(),
				};
			}

			/**
			 * Dispatch a request
			 *
			 * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
			 * @param {?Object} config
			 *
			 * @returns {Promise} The Promise to be fulfilled
			 */
			request(configOrUrl, config) {
				/*eslint no-param-reassign:0*/
				// Allow for axios('example/url'[, config]) a la fetch API
				if (typeof configOrUrl === "string") {
					config = config || {};
					config.url = configOrUrl;
				} else {
					config = configOrUrl || {};
				}

				config = mergeConfig(this.defaults, config);

				const { transitional, paramsSerializer, headers } = config;

				if (transitional !== undefined) {
					validator.assertOptions(
						transitional,
						{
							silentJSONParsing: Axios_validators.transitional(Axios_validators.boolean),
							forcedJSONParsing: Axios_validators.transitional(Axios_validators.boolean),
							clarifyTimeoutError: Axios_validators.transitional(Axios_validators.boolean),
						},
						false
					);
				}

				if (paramsSerializer != null) {
					if (utils.isFunction(paramsSerializer)) {
						config.paramsSerializer = {
							serialize: paramsSerializer,
						};
					} else {
						validator.assertOptions(
							paramsSerializer,
							{
								encode: Axios_validators.function,
								serialize: Axios_validators.function,
							},
							true
						);
					}
				}

				// Set config.method
				config.method = (config.method || this.defaults.method || "get").toLowerCase();

				// Flatten headers
				let contextHeaders = headers && utils.merge(headers.common, headers[config.method]);

				headers &&
					utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (method) => {
						delete headers[method];
					});

				config.headers = core_AxiosHeaders.concat(contextHeaders, headers);

				// filter out skipped interceptors
				const requestInterceptorChain = [];
				let synchronousRequestInterceptors = true;
				this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
					if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
						return;
					}

					synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

					requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
				});

				const responseInterceptorChain = [];
				this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
					responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
				});

				let promise;
				let i = 0;
				let len;

				if (!synchronousRequestInterceptors) {
					const chain = [dispatchRequest.bind(this), undefined];
					chain.unshift.apply(chain, requestInterceptorChain);
					chain.push.apply(chain, responseInterceptorChain);
					len = chain.length;

					promise = Promise.resolve(config);

					while (i < len) {
						promise = promise.then(chain[i++], chain[i++]);
					}

					return promise;
				}

				len = requestInterceptorChain.length;

				let newConfig = config;

				i = 0;

				while (i < len) {
					const onFulfilled = requestInterceptorChain[i++];
					const onRejected = requestInterceptorChain[i++];
					try {
						newConfig = onFulfilled(newConfig);
					} catch (error) {
						onRejected.call(this, error);
						break;
					}
				}

				try {
					promise = dispatchRequest.call(this, newConfig);
				} catch (error) {
					return Promise.reject(error);
				}

				i = 0;
				len = responseInterceptorChain.length;

				while (i < len) {
					promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
				}

				return promise;
			}

			getUri(config) {
				config = mergeConfig(this.defaults, config);
				const fullPath = buildFullPath(config.baseURL, config.url);
				return buildURL(fullPath, config.params, config.paramsSerializer);
			}
		}

		// Provide aliases for supported request methods
		utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
			/*eslint func-names:0*/
			Axios.prototype[method] = function (url, config) {
				return this.request(
					mergeConfig(config || {}, {
						method,
						url,
						data: (config || {}).data,
					})
				);
			};
		});

		utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
			/*eslint func-names:0*/

			function generateHTTPMethod(isForm) {
				return function httpMethod(url, data, config) {
					return this.request(
						mergeConfig(config || {}, {
							method,
							headers: isForm
								? {
										"Content-Type": "multipart/form-data",
								  }
								: {},
							url,
							data,
						})
					);
				};
			}

			Axios.prototype[method] = generateHTTPMethod();

			Axios.prototype[method + "Form"] = generateHTTPMethod(true);
		});

		/* harmony default export */ const core_Axios = Axios; // CONCATENATED MODULE: ./node_modules/axios/lib/cancel/CancelToken.js

		/**
		 * A `CancelToken` is an object that can be used to request cancellation of an operation.
		 *
		 * @param {Function} executor The executor function.
		 *
		 * @returns {CancelToken}
		 */
		class CancelToken {
			constructor(executor) {
				if (typeof executor !== "function") {
					throw new TypeError("executor must be a function.");
				}

				let resolvePromise;

				this.promise = new Promise(function promiseExecutor(resolve) {
					resolvePromise = resolve;
				});

				const token = this;

				// eslint-disable-next-line func-names
				this.promise.then((cancel) => {
					if (!token._listeners) return;

					let i = token._listeners.length;

					while (i-- > 0) {
						token._listeners[i](cancel);
					}
					token._listeners = null;
				});

				// eslint-disable-next-line func-names
				this.promise.then = (onfulfilled) => {
					let _resolve;
					// eslint-disable-next-line func-names
					const promise = new Promise((resolve) => {
						token.subscribe(resolve);
						_resolve = resolve;
					}).then(onfulfilled);

					promise.cancel = function reject() {
						token.unsubscribe(_resolve);
					};

					return promise;
				};

				executor(function cancel(message, config, request) {
					if (token.reason) {
						// Cancellation has already been requested
						return;
					}

					token.reason = new cancel_CanceledError(message, config, request);
					resolvePromise(token.reason);
				});
			}

			/**
			 * Throws a `CanceledError` if cancellation has been requested.
			 */
			throwIfRequested() {
				if (this.reason) {
					throw this.reason;
				}
			}

			/**
			 * Subscribe to the cancel signal
			 */

			subscribe(listener) {
				if (this.reason) {
					listener(this.reason);
					return;
				}

				if (this._listeners) {
					this._listeners.push(listener);
				} else {
					this._listeners = [listener];
				}
			}

			/**
			 * Unsubscribe from the cancel signal
			 */

			unsubscribe(listener) {
				if (!this._listeners) {
					return;
				}
				const index = this._listeners.indexOf(listener);
				if (index !== -1) {
					this._listeners.splice(index, 1);
				}
			}

			/**
			 * Returns an object that contains a new `CancelToken` and a function that, when called,
			 * cancels the `CancelToken`.
			 */
			static source() {
				let cancel;
				const token = new CancelToken(function executor(c) {
					cancel = c;
				});
				return {
					token,
					cancel,
				};
			}
		}

		/* harmony default export */ const cancel_CancelToken = CancelToken; // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/spread.js

		/**
		 * Syntactic sugar for invoking a function and expanding an array for arguments.
		 *
		 * Common use case would be to use `Function.prototype.apply`.
		 *
		 *  ```js
		 *  function f(x, y, z) {}
		 *  var args = [1, 2, 3];
		 *  f.apply(null, args);
		 *  ```
		 *
		 * With `spread` this example can be re-written.
		 *
		 *  ```js
		 *  spread(function(x, y, z) {})([1, 2, 3]);
		 *  ```
		 *
		 * @param {Function} callback
		 *
		 * @returns {Function}
		 */
		function spread(callback) {
			return function wrap(arr) {
				return callback.apply(null, arr);
			};
		} // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/isAxiosError.js

		/**
		 * Determines whether the payload is an error thrown by Axios
		 *
		 * @param {*} payload The value to test
		 *
		 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
		 */
		function isAxiosError(payload) {
			return utils.isObject(payload) && payload.isAxiosError === true;
		} // CONCATENATED MODULE: ./node_modules/axios/lib/helpers/HttpStatusCode.js

		const HttpStatusCode = {
			Continue: 100,
			SwitchingProtocols: 101,
			Processing: 102,
			EarlyHints: 103,
			Ok: 200,
			Created: 201,
			Accepted: 202,
			NonAuthoritativeInformation: 203,
			NoContent: 204,
			ResetContent: 205,
			PartialContent: 206,
			MultiStatus: 207,
			AlreadyReported: 208,
			ImUsed: 226,
			MultipleChoices: 300,
			MovedPermanently: 301,
			Found: 302,
			SeeOther: 303,
			NotModified: 304,
			UseProxy: 305,
			Unused: 306,
			TemporaryRedirect: 307,
			PermanentRedirect: 308,
			BadRequest: 400,
			Unauthorized: 401,
			PaymentRequired: 402,
			Forbidden: 403,
			NotFound: 404,
			MethodNotAllowed: 405,
			NotAcceptable: 406,
			ProxyAuthenticationRequired: 407,
			RequestTimeout: 408,
			Conflict: 409,
			Gone: 410,
			LengthRequired: 411,
			PreconditionFailed: 412,
			PayloadTooLarge: 413,
			UriTooLong: 414,
			UnsupportedMediaType: 415,
			RangeNotSatisfiable: 416,
			ExpectationFailed: 417,
			ImATeapot: 418,
			MisdirectedRequest: 421,
			UnprocessableEntity: 422,
			Locked: 423,
			FailedDependency: 424,
			TooEarly: 425,
			UpgradeRequired: 426,
			PreconditionRequired: 428,
			TooManyRequests: 429,
			RequestHeaderFieldsTooLarge: 431,
			UnavailableForLegalReasons: 451,
			InternalServerError: 500,
			NotImplemented: 501,
			BadGateway: 502,
			ServiceUnavailable: 503,
			GatewayTimeout: 504,
			HttpVersionNotSupported: 505,
			VariantAlsoNegotiates: 506,
			InsufficientStorage: 507,
			LoopDetected: 508,
			NotExtended: 510,
			NetworkAuthenticationRequired: 511,
		};

		Object.entries(HttpStatusCode).forEach(([key, value]) => {
			HttpStatusCode[value] = key;
		});

		/* harmony default export */ const helpers_HttpStatusCode = HttpStatusCode; // CONCATENATED MODULE: ./node_modules/axios/lib/axios.js

		/**
		 * Create an instance of Axios
		 *
		 * @param {Object} defaultConfig The default config for the instance
		 *
		 * @returns {Axios} A new instance of Axios
		 */
		function createInstance(defaultConfig) {
			const context = new core_Axios(defaultConfig);
			const instance = bind(core_Axios.prototype.request, context);

			// Copy axios.prototype to instance
			utils.extend(instance, core_Axios.prototype, context, { allOwnKeys: true });

			// Copy context to instance
			utils.extend(instance, context, null, { allOwnKeys: true });

			// Factory for creating new instances
			instance.create = function create(instanceConfig) {
				return createInstance(mergeConfig(defaultConfig, instanceConfig));
			};

			return instance;
		}

		// Create the default instance to be exported
		const axios = createInstance(lib_defaults);

		// Expose Axios class to allow class inheritance
		axios.Axios = core_Axios;

		// Expose Cancel & CancelToken
		axios.CanceledError = cancel_CanceledError;
		axios.CancelToken = cancel_CancelToken;
		axios.isCancel = isCancel;
		axios.VERSION = VERSION;
		axios.toFormData = helpers_toFormData;

		// Expose AxiosError class
		axios.AxiosError = core_AxiosError;

		// alias for CanceledError for backward compatibility
		axios.Cancel = axios.CanceledError;

		// Expose all/spread
		axios.all = function all(promises) {
			return Promise.all(promises);
		};

		axios.spread = spread;

		// Expose isAxiosError
		axios.isAxiosError = isAxiosError;

		// Expose mergeConfig
		axios.mergeConfig = mergeConfig;

		axios.AxiosHeaders = core_AxiosHeaders;

		axios.formToJSON = (thing) => helpers_formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);

		axios.getAdapter = adapters.getAdapter;

		axios.HttpStatusCode = helpers_HttpStatusCode;

		axios.default = axios;

		// this module should only have a default export
		/* harmony default export */ const lib_axios = axios; // CONCATENATED MODULE: ./node_modules/ssr-window/ssr-window.esm.js

		/**
		 * SSR Window 4.0.2
		 * Better handling for window object in SSR environment
		 * https://github.com/nolimits4web/ssr-window
		 *
		 * Copyright 2021, Vladimir Kharlampidi
		 *
		 * Licensed under MIT
		 *
		 * Released on: December 13, 2021
		 */
		/* eslint-disable no-param-reassign */
		function ssr_window_esm_isObject(obj) {
			return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
		}
		function ssr_window_esm_extend(target = {}, src = {}) {
			Object.keys(src).forEach((key) => {
				if (typeof target[key] === "undefined") target[key] = src[key];
				else if (
					ssr_window_esm_isObject(src[key]) &&
					ssr_window_esm_isObject(target[key]) &&
					Object.keys(src[key]).length > 0
				) {
					ssr_window_esm_extend(target[key], src[key]);
				}
			});
		}

		const ssrDocument = {
			body: {},
			addEventListener() {},
			removeEventListener() {},
			activeElement: {
				blur() {},
				nodeName: "",
			},
			querySelector() {
				return null;
			},
			querySelectorAll() {
				return [];
			},
			getElementById() {
				return null;
			},
			createEvent() {
				return {
					initEvent() {},
				};
			},
			createElement() {
				return {
					children: [],
					childNodes: [],
					style: {},
					setAttribute() {},
					getElementsByTagName() {
						return [];
					},
				};
			},
			createElementNS() {
				return {};
			},
			importNode() {
				return null;
			},
			location: {
				hash: "",
				host: "",
				hostname: "",
				href: "",
				origin: "",
				pathname: "",
				protocol: "",
				search: "",
			},
		};
		function ssr_window_esm_getDocument() {
			const doc = typeof document !== "undefined" ? document : {};
			ssr_window_esm_extend(doc, ssrDocument);
			return doc;
		}

		const ssrWindow = {
			document: ssrDocument,
			navigator: {
				userAgent: "",
			},
			location: {
				hash: "",
				host: "",
				hostname: "",
				href: "",
				origin: "",
				pathname: "",
				protocol: "",
				search: "",
			},
			history: {
				replaceState() {},
				pushState() {},
				go() {},
				back() {},
			},
			CustomEvent: function CustomEvent() {
				return this;
			},
			addEventListener() {},
			removeEventListener() {},
			getComputedStyle() {
				return {
					getPropertyValue() {
						return "";
					},
				};
			},
			Image() {},
			Date() {},
			screen: {},
			setTimeout() {},
			clearTimeout() {},
			matchMedia() {
				return {};
			},
			requestAnimationFrame(callback) {
				if (typeof setTimeout === "undefined") {
					callback();
					return null;
				}
				return setTimeout(callback, 0);
			},
			cancelAnimationFrame(id) {
				if (typeof setTimeout === "undefined") {
					return;
				}
				clearTimeout(id);
			},
		};
		function ssr_window_esm_getWindow() {
			const win = typeof window !== "undefined" ? window : {};
			ssr_window_esm_extend(win, ssrWindow);
			return win;
		} // CONCATENATED MODULE: ./node_modules/dom7/dom7.esm.js

		/**
		 * Dom7 4.0.6
		 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
		 * https://framework7.io/docs/dom7.html
		 *
		 * Copyright 2023, Vladimir Kharlampidi
		 *
		 * Licensed under MIT
		 *
		 * Released on: February 2, 2023
		 */

		/* eslint-disable no-proto */
		function makeReactive(obj) {
			const proto = obj.__proto__;
			Object.defineProperty(obj, "__proto__", {
				get() {
					return proto;
				},

				set(value) {
					proto.__proto__ = value;
				},
			});
		}

		class Dom7 extends Array {
			constructor(items) {
				if (typeof items === "number") {
					super(items);
				} else {
					super(...(items || []));
					makeReactive(this);
				}
			}
		}

		function arrayFlat(arr = []) {
			const res = [];
			arr.forEach((el) => {
				if (Array.isArray(el)) {
					res.push(...arrayFlat(el));
				} else {
					res.push(el);
				}
			});
			return res;
		}
		function arrayFilter(arr, callback) {
			return Array.prototype.filter.call(arr, callback);
		}
		function arrayUnique(arr) {
			const uniqueArray = [];

			for (let i = 0; i < arr.length; i += 1) {
				if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
			}

			return uniqueArray;
		}
		function dom7_esm_toCamelCase(string) {
			return string.toLowerCase().replace(/-(.)/g, (match, group) => group.toUpperCase());
		}

		// eslint-disable-next-line

		function qsa(selector, context) {
			if (typeof selector !== "string") {
				return [selector];
			}

			const a = [];
			const res = context.querySelectorAll(selector);

			for (let i = 0; i < res.length; i += 1) {
				a.push(res[i]);
			}

			return a;
		}

		function dom7_esm_$(selector, context) {
			const window = ssr_window_esm_getWindow();
			const document = ssr_window_esm_getDocument();
			let arr = [];

			if (!context && selector instanceof Dom7) {
				return selector;
			}

			if (!selector) {
				return new Dom7(arr);
			}

			if (typeof selector === "string") {
				const html = selector.trim();

				if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
					let toCreate = "div";
					if (html.indexOf("<li") === 0) toCreate = "ul";
					if (html.indexOf("<tr") === 0) toCreate = "tbody";
					if (html.indexOf("<td") === 0 || html.indexOf("<th") === 0) toCreate = "tr";
					if (html.indexOf("<tbody") === 0) toCreate = "table";
					if (html.indexOf("<option") === 0) toCreate = "select";
					const tempParent = document.createElement(toCreate);
					tempParent.innerHTML = html;

					for (let i = 0; i < tempParent.childNodes.length; i += 1) {
						arr.push(tempParent.childNodes[i]);
					}
				} else {
					arr = qsa(selector.trim(), context || document);
				} // arr = qsa(selector, document);
			} else if (selector.nodeType || selector === window || selector === document) {
				arr.push(selector);
			} else if (Array.isArray(selector)) {
				if (selector instanceof Dom7) return selector;
				arr = selector;
			}

			return new Dom7(arrayUnique(arr));
		}

		dom7_esm_$.fn = Dom7.prototype;

		// eslint-disable-next-line

		function addClass(...classes) {
			const classNames = arrayFlat(classes.map((c) => c.split(" ")));
			this.forEach((el) => {
				el.classList.add(...classNames);
			});
			return this;
		}

		function removeClass(...classes) {
			const classNames = arrayFlat(classes.map((c) => c.split(" ")));
			this.forEach((el) => {
				el.classList.remove(...classNames);
			});
			return this;
		}

		function toggleClass(...classes) {
			const classNames = arrayFlat(classes.map((c) => c.split(" ")));
			this.forEach((el) => {
				classNames.forEach((className) => {
					el.classList.toggle(className);
				});
			});
		}

		function hasClass(...classes) {
			const classNames = arrayFlat(classes.map((c) => c.split(" ")));
			return (
				arrayFilter(this, (el) => {
					return classNames.filter((className) => el.classList.contains(className)).length > 0;
				}).length > 0
			);
		}

		function attr(attrs, value) {
			if (arguments.length === 1 && typeof attrs === "string") {
				// Get attr
				if (this[0]) return this[0].getAttribute(attrs);
				return undefined;
			} // Set attrs

			for (let i = 0; i < this.length; i += 1) {
				if (arguments.length === 2) {
					// String
					this[i].setAttribute(attrs, value);
				} else {
					// Object
					for (const attrName in attrs) {
						this[i][attrName] = attrs[attrName];
						this[i].setAttribute(attrName, attrs[attrName]);
					}
				}
			}

			return this;
		}

		function removeAttr(attr) {
			for (let i = 0; i < this.length; i += 1) {
				this[i].removeAttribute(attr);
			}

			return this;
		}

		function prop(props, value) {
			if (arguments.length === 1 && typeof props === "string") {
				// Get prop
				if (this[0]) return this[0][props];
			} else {
				// Set props
				for (let i = 0; i < this.length; i += 1) {
					if (arguments.length === 2) {
						// String
						this[i][props] = value;
					} else {
						// Object
						for (const propName in props) {
							this[i][propName] = props[propName];
						}
					}
				}

				return this;
			}

			return this;
		}

		function data(key, value) {
			let el;

			if (typeof value === "undefined") {
				el = this[0];
				if (!el) return undefined; // Get value

				if (el.dom7ElementDataStorage && key in el.dom7ElementDataStorage) {
					return el.dom7ElementDataStorage[key];
				}

				const dataKey = el.getAttribute(`data-${key}`);

				if (dataKey) {
					return dataKey;
				}

				return undefined;
			} // Set value

			for (let i = 0; i < this.length; i += 1) {
				el = this[i];
				if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
				el.dom7ElementDataStorage[key] = value;
			}

			return this;
		}

		function removeData(key) {
			for (let i = 0; i < this.length; i += 1) {
				const el = this[i];

				if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
					el.dom7ElementDataStorage[key] = null;
					delete el.dom7ElementDataStorage[key];
				}
			}
		}

		function dataset() {
			const el = this[0];
			if (!el) return undefined;
			const dataset = {}; // eslint-disable-line

			if (el.dataset) {
				for (const dataKey in el.dataset) {
					dataset[dataKey] = el.dataset[dataKey];
				}
			} else {
				for (let i = 0; i < el.attributes.length; i += 1) {
					const attr = el.attributes[i];

					if (attr.name.indexOf("data-") >= 0) {
						dataset[dom7_esm_toCamelCase(attr.name.split("data-")[1])] = attr.value;
					}
				}
			}

			for (const key in dataset) {
				if (dataset[key] === "false") dataset[key] = false;
				else if (dataset[key] === "true") dataset[key] = true;
				else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] *= 1;
			}

			return dataset;
		}

		function val(value) {
			if (typeof value === "undefined") {
				// get value
				const el = this[0];
				if (!el) return undefined;

				if (el.multiple && el.nodeName.toLowerCase() === "select") {
					const values = [];

					for (let i = 0; i < el.selectedOptions.length; i += 1) {
						values.push(el.selectedOptions[i].value);
					}

					return values;
				}

				return el.value;
			} // set value

			for (let i = 0; i < this.length; i += 1) {
				const el = this[i];

				if (Array.isArray(value) && el.multiple && el.nodeName.toLowerCase() === "select") {
					for (let j = 0; j < el.options.length; j += 1) {
						el.options[j].selected = value.indexOf(el.options[j].value) >= 0;
					}
				} else {
					el.value = value;
				}
			}

			return this;
		}

		function value(value) {
			return this.val(value);
		}

		function transform(transform) {
			for (let i = 0; i < this.length; i += 1) {
				this[i].style.transform = transform;
			}

			return this;
		}

		function transition(duration) {
			for (let i = 0; i < this.length; i += 1) {
				this[i].style.transitionDuration = typeof duration !== "string" ? `${duration}ms` : duration;
			}

			return this;
		}

		function on(...args) {
			let [eventType, targetSelector, listener, capture] = args;

			if (typeof args[1] === "function") {
				[eventType, listener, capture] = args;
				targetSelector = undefined;
			}

			if (!capture) capture = false;

			function handleLiveEvent(e) {
				const target = e.target;
				if (!target) return;
				const eventData = e.target.dom7EventData || [];

				if (eventData.indexOf(e) < 0) {
					eventData.unshift(e);
				}

				if (dom7_esm_$(target).is(targetSelector)) listener.apply(target, eventData);
				else {
					const parents = dom7_esm_$(target).parents(); // eslint-disable-line

					for (let k = 0; k < parents.length; k += 1) {
						if (dom7_esm_$(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
					}
				}
			}

			function handleEvent(e) {
				const eventData = e && e.target ? e.target.dom7EventData || [] : [];

				if (eventData.indexOf(e) < 0) {
					eventData.unshift(e);
				}

				listener.apply(this, eventData);
			}

			const events = eventType.split(" ");
			let j;

			for (let i = 0; i < this.length; i += 1) {
				const el = this[i];

				if (!targetSelector) {
					for (j = 0; j < events.length; j += 1) {
						const event = events[j];
						if (!el.dom7Listeners) el.dom7Listeners = {};
						if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
						el.dom7Listeners[event].push({
							listener,
							proxyListener: handleEvent,
						});
						el.addEventListener(event, handleEvent, capture);
					}
				} else {
					// Live events
					for (j = 0; j < events.length; j += 1) {
						const event = events[j];
						if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
						if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
						el.dom7LiveListeners[event].push({
							listener,
							proxyListener: handleLiveEvent,
						});
						el.addEventListener(event, handleLiveEvent, capture);
					}
				}
			}

			return this;
		}

		function off(...args) {
			let [eventType, targetSelector, listener, capture] = args;

			if (typeof args[1] === "function") {
				[eventType, listener, capture] = args;
				targetSelector = undefined;
			}

			if (!capture) capture = false;
			const events = eventType.split(" ");

			for (let i = 0; i < events.length; i += 1) {
				const event = events[i];

				for (let j = 0; j < this.length; j += 1) {
					const el = this[j];
					let handlers;

					if (!targetSelector && el.dom7Listeners) {
						handlers = el.dom7Listeners[event];
					} else if (targetSelector && el.dom7LiveListeners) {
						handlers = el.dom7LiveListeners[event];
					}

					if (handlers && handlers.length) {
						for (let k = handlers.length - 1; k >= 0; k -= 1) {
							const handler = handlers[k];

							if (listener && handler.listener === listener) {
								el.removeEventListener(event, handler.proxyListener, capture);
								handlers.splice(k, 1);
							} else if (
								listener &&
								handler.listener &&
								handler.listener.dom7proxy &&
								handler.listener.dom7proxy === listener
							) {
								el.removeEventListener(event, handler.proxyListener, capture);
								handlers.splice(k, 1);
							} else if (!listener) {
								el.removeEventListener(event, handler.proxyListener, capture);
								handlers.splice(k, 1);
							}
						}
					}
				}
			}

			return this;
		}

		function once(...args) {
			const dom = this;
			let [eventName, targetSelector, listener, capture] = args;

			if (typeof args[1] === "function") {
				[eventName, listener, capture] = args;
				targetSelector = undefined;
			}

			function onceHandler(...eventArgs) {
				listener.apply(this, eventArgs);
				dom.off(eventName, targetSelector, onceHandler, capture);

				if (onceHandler.dom7proxy) {
					delete onceHandler.dom7proxy;
				}
			}

			onceHandler.dom7proxy = listener;
			return dom.on(eventName, targetSelector, onceHandler, capture);
		}

		function trigger(...args) {
			const window = ssr_window_esm_getWindow();
			const events = args[0].split(" ");
			const eventData = args[1];

			for (let i = 0; i < events.length; i += 1) {
				const event = events[i];

				for (let j = 0; j < this.length; j += 1) {
					const el = this[j];

					if (window.CustomEvent) {
						const evt = new window.CustomEvent(event, {
							detail: eventData,
							bubbles: true,
							cancelable: true,
						});
						el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
						el.dispatchEvent(evt);
						el.dom7EventData = [];
						delete el.dom7EventData;
					}
				}
			}

			return this;
		}

		function transitionStart(callback) {
			const dom = this;

			function fireCallBack(e) {
				if (e.target !== this) return;
				callback.call(this, e);
				dom.off("transitionstart", fireCallBack);
			}

			if (callback) {
				dom.on("transitionstart", fireCallBack);
			}

			return this;
		}

		function transitionEnd(callback) {
			const dom = this;

			function fireCallBack(e) {
				if (e.target !== this) return;
				callback.call(this, e);
				dom.off("transitionend", fireCallBack);
			}

			if (callback) {
				dom.on("transitionend", fireCallBack);
			}

			return this;
		}

		function animationEnd(callback) {
			const dom = this;

			function fireCallBack(e) {
				if (e.target !== this) return;
				callback.call(this, e);
				dom.off("animationend", fireCallBack);
			}

			if (callback) {
				dom.on("animationend", fireCallBack);
			}

			return this;
		}

		function width() {
			const window = getWindow();

			if (this[0] === window) {
				return window.innerWidth;
			}

			if (this.length > 0) {
				return parseFloat(this.css("width"));
			}

			return null;
		}

		function dom7_esm_outerWidth(includeMargins) {
			if (this.length > 0) {
				if (includeMargins) {
					const styles = this.styles();
					return (
						this[0].offsetWidth +
						parseFloat(styles.getPropertyValue("margin-right")) +
						parseFloat(styles.getPropertyValue("margin-left"))
					);
				}

				return this[0].offsetWidth;
			}

			return null;
		}

		function height() {
			const window = getWindow();

			if (this[0] === window) {
				return window.innerHeight;
			}

			if (this.length > 0) {
				return parseFloat(this.css("height"));
			}

			return null;
		}

		function dom7_esm_outerHeight(includeMargins) {
			if (this.length > 0) {
				if (includeMargins) {
					const styles = this.styles();
					return (
						this[0].offsetHeight +
						parseFloat(styles.getPropertyValue("margin-top")) +
						parseFloat(styles.getPropertyValue("margin-bottom"))
					);
				}

				return this[0].offsetHeight;
			}

			return null;
		}

		function offset() {
			if (this.length > 0) {
				const window = ssr_window_esm_getWindow();
				const document = ssr_window_esm_getDocument();
				const el = this[0];
				const box = el.getBoundingClientRect();
				const body = document.body;
				const clientTop = el.clientTop || body.clientTop || 0;
				const clientLeft = el.clientLeft || body.clientLeft || 0;
				const scrollTop = el === window ? window.scrollY : el.scrollTop;
				const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
				return {
					top: box.top + scrollTop - clientTop,
					left: box.left + scrollLeft - clientLeft,
				};
			}

			return null;
		}

		function hide() {
			for (let i = 0; i < this.length; i += 1) {
				this[i].style.display = "none";
			}

			return this;
		}

		function show() {
			const window = getWindow();

			for (let i = 0; i < this.length; i += 1) {
				const el = this[i];

				if (el.style.display === "none") {
					el.style.display = "";
				}

				if (window.getComputedStyle(el, null).getPropertyValue("display") === "none") {
					// Still not visible
					el.style.display = "block";
				}
			}

			return this;
		}

		function styles() {
			const window = ssr_window_esm_getWindow();
			if (this[0]) return window.getComputedStyle(this[0], null);
			return {};
		}

		function css(props, value) {
			const window = ssr_window_esm_getWindow();
			let i;

			if (arguments.length === 1) {
				if (typeof props === "string") {
					// .css('width')
					if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
				} else {
					// .css({ width: '100px' })
					for (i = 0; i < this.length; i += 1) {
						for (const prop in props) {
							this[i].style[prop] = props[prop];
						}
					}

					return this;
				}
			}

			if (arguments.length === 2 && typeof props === "string") {
				// .css('width', '100px')
				for (i = 0; i < this.length; i += 1) {
					this[i].style[props] = value;
				}

				return this;
			}

			return this;
		}

		function each(callback) {
			if (!callback) return this;
			this.forEach((el, index) => {
				callback.apply(el, [el, index]);
			});
			return this;
		}

		function filter(callback) {
			const result = arrayFilter(this, callback);
			return dom7_esm_$(result);
		}

		function html(html) {
			if (typeof html === "undefined") {
				return this[0] ? this[0].innerHTML : null;
			}

			for (let i = 0; i < this.length; i += 1) {
				this[i].innerHTML = html;
			}

			return this;
		}

		function dom7_esm_text(text) {
			if (typeof text === "undefined") {
				return this[0] ? this[0].textContent.trim() : null;
			}

			for (let i = 0; i < this.length; i += 1) {
				this[i].textContent = text;
			}

			return this;
		}

		function is(selector) {
			const window = ssr_window_esm_getWindow();
			const document = ssr_window_esm_getDocument();
			const el = this[0];
			let compareWith;
			let i;
			if (!el || typeof selector === "undefined") return false;

			if (typeof selector === "string") {
				if (el.matches) return el.matches(selector);
				if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
				if (el.msMatchesSelector) return el.msMatchesSelector(selector);
				compareWith = dom7_esm_$(selector);

				for (i = 0; i < compareWith.length; i += 1) {
					if (compareWith[i] === el) return true;
				}

				return false;
			}

			if (selector === document) {
				return el === document;
			}

			if (selector === window) {
				return el === window;
			}

			if (selector.nodeType || selector instanceof Dom7) {
				compareWith = selector.nodeType ? [selector] : selector;

				for (i = 0; i < compareWith.length; i += 1) {
					if (compareWith[i] === el) return true;
				}

				return false;
			}

			return false;
		}

		function index() {
			let child = this[0];
			let i;

			if (child) {
				i = 0; // eslint-disable-next-line

				while ((child = child.previousSibling) !== null) {
					if (child.nodeType === 1) i += 1;
				}

				return i;
			}

			return undefined;
		}

		function eq(index) {
			if (typeof index === "undefined") return this;
			const length = this.length;

			if (index > length - 1) {
				return dom7_esm_$([]);
			}

			if (index < 0) {
				const returnIndex = length + index;
				if (returnIndex < 0) return dom7_esm_$([]);
				return dom7_esm_$([this[returnIndex]]);
			}

			return dom7_esm_$([this[index]]);
		}

		function append(...els) {
			let newChild;
			const document = ssr_window_esm_getDocument();

			for (let k = 0; k < els.length; k += 1) {
				newChild = els[k];

				for (let i = 0; i < this.length; i += 1) {
					if (typeof newChild === "string") {
						const tempDiv = document.createElement("div");
						tempDiv.innerHTML = newChild;

						while (tempDiv.firstChild) {
							this[i].appendChild(tempDiv.firstChild);
						}
					} else if (newChild instanceof Dom7) {
						for (let j = 0; j < newChild.length; j += 1) {
							this[i].appendChild(newChild[j]);
						}
					} else {
						this[i].appendChild(newChild);
					}
				}
			}

			return this;
		}

		function appendTo(parent) {
			dom7_esm_$(parent).append(this);
			return this;
		}

		function prepend(newChild) {
			const document = ssr_window_esm_getDocument();
			let i;
			let j;

			for (i = 0; i < this.length; i += 1) {
				if (typeof newChild === "string") {
					const tempDiv = document.createElement("div");
					tempDiv.innerHTML = newChild;

					for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
						this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
					}
				} else if (newChild instanceof Dom7) {
					for (j = 0; j < newChild.length; j += 1) {
						this[i].insertBefore(newChild[j], this[i].childNodes[0]);
					}
				} else {
					this[i].insertBefore(newChild, this[i].childNodes[0]);
				}
			}

			return this;
		}

		function prependTo(parent) {
			dom7_esm_$(parent).prepend(this);
			return this;
		}

		function insertBefore(selector) {
			const before = dom7_esm_$(selector);

			for (let i = 0; i < this.length; i += 1) {
				if (before.length === 1) {
					before[0].parentNode.insertBefore(this[i], before[0]);
				} else if (before.length > 1) {
					for (let j = 0; j < before.length; j += 1) {
						before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
					}
				}
			}
		}

		function insertAfter(selector) {
			const after = dom7_esm_$(selector);

			for (let i = 0; i < this.length; i += 1) {
				if (after.length === 1) {
					after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
				} else if (after.length > 1) {
					for (let j = 0; j < after.length; j += 1) {
						after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
					}
				}
			}
		}

		function next(selector) {
			if (this.length > 0) {
				if (selector) {
					if (this[0].nextElementSibling && dom7_esm_$(this[0].nextElementSibling).is(selector)) {
						return dom7_esm_$([this[0].nextElementSibling]);
					}

					return dom7_esm_$([]);
				}

				if (this[0].nextElementSibling) return dom7_esm_$([this[0].nextElementSibling]);
				return dom7_esm_$([]);
			}

			return dom7_esm_$([]);
		}

		function nextAll(selector) {
			const nextEls = [];
			let el = this[0];
			if (!el) return dom7_esm_$([]);

			while (el.nextElementSibling) {
				const next = el.nextElementSibling; // eslint-disable-line

				if (selector) {
					if (dom7_esm_$(next).is(selector)) nextEls.push(next);
				} else nextEls.push(next);

				el = next;
			}

			return dom7_esm_$(nextEls);
		}

		function prev(selector) {
			if (this.length > 0) {
				const el = this[0];

				if (selector) {
					if (el.previousElementSibling && dom7_esm_$(el.previousElementSibling).is(selector)) {
						return dom7_esm_$([el.previousElementSibling]);
					}

					return dom7_esm_$([]);
				}

				if (el.previousElementSibling) return dom7_esm_$([el.previousElementSibling]);
				return dom7_esm_$([]);
			}

			return dom7_esm_$([]);
		}

		function prevAll(selector) {
			const prevEls = [];
			let el = this[0];
			if (!el) return dom7_esm_$([]);

			while (el.previousElementSibling) {
				const prev = el.previousElementSibling; // eslint-disable-line

				if (selector) {
					if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
				} else prevEls.push(prev);

				el = prev;
			}

			return dom7_esm_$(prevEls);
		}

		function siblings(selector) {
			return this.nextAll(selector).add(this.prevAll(selector));
		}

		function dom7_esm_parent(selector) {
			const parents = []; // eslint-disable-line

			for (let i = 0; i < this.length; i += 1) {
				if (this[i].parentNode !== null) {
					if (selector) {
						if (dom7_esm_$(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
					} else {
						parents.push(this[i].parentNode);
					}
				}
			}

			return dom7_esm_$(parents);
		}

		function parents(selector) {
			const parents = []; // eslint-disable-line

			for (let i = 0; i < this.length; i += 1) {
				let parent = this[i].parentNode; // eslint-disable-line

				while (parent) {
					if (selector) {
						if (dom7_esm_$(parent).is(selector)) parents.push(parent);
					} else {
						parents.push(parent);
					}

					parent = parent.parentNode;
				}
			}

			return dom7_esm_$(parents);
		}

		function closest(selector) {
			let closest = this; // eslint-disable-line

			if (typeof selector === "undefined") {
				return dom7_esm_$([]);
			}

			if (!closest.is(selector)) {
				closest = closest.parents(selector).eq(0);
			}

			return closest;
		}

		function find(selector) {
			const foundElements = [];

			for (let i = 0; i < this.length; i += 1) {
				const found = this[i].querySelectorAll(selector);

				for (let j = 0; j < found.length; j += 1) {
					foundElements.push(found[j]);
				}
			}

			return dom7_esm_$(foundElements);
		}

		function children(selector) {
			const children = []; // eslint-disable-line

			for (let i = 0; i < this.length; i += 1) {
				const childNodes = this[i].children;

				for (let j = 0; j < childNodes.length; j += 1) {
					if (!selector || dom7_esm_$(childNodes[j]).is(selector)) {
						children.push(childNodes[j]);
					}
				}
			}

			return dom7_esm_$(children);
		}

		function remove() {
			for (let i = 0; i < this.length; i += 1) {
				if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
			}

			return this;
		}

		function detach() {
			return this.remove();
		}

		function add(...els) {
			const dom = this;
			let i;
			let j;

			for (i = 0; i < els.length; i += 1) {
				const toAdd = dom7_esm_$(els[i]);

				for (j = 0; j < toAdd.length; j += 1) {
					dom.push(toAdd[j]);
				}
			}

			return dom;
		}

		function empty() {
			for (let i = 0; i < this.length; i += 1) {
				const el = this[i];

				if (el.nodeType === 1) {
					for (let j = 0; j < el.childNodes.length; j += 1) {
						if (el.childNodes[j].parentNode) {
							el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
						}
					}

					el.textContent = "";
				}
			}

			return this;
		}

		// eslint-disable-next-line

		function scrollTo(...args) {
			const window = getWindow();
			let [left, top, duration, easing, callback] = args;

			if (args.length === 4 && typeof easing === "function") {
				callback = easing;
				[left, top, duration, callback, easing] = args;
			}

			if (typeof easing === "undefined") easing = "swing";
			return this.each(function animate() {
				const el = this;
				let currentTop;
				let currentLeft;
				let maxTop;
				let maxLeft;
				let newTop;
				let newLeft;
				let scrollTop; // eslint-disable-line

				let scrollLeft; // eslint-disable-line

				let animateTop = top > 0 || top === 0;
				let animateLeft = left > 0 || left === 0;

				if (typeof easing === "undefined") {
					easing = "swing";
				}

				if (animateTop) {
					currentTop = el.scrollTop;

					if (!duration) {
						el.scrollTop = top;
					}
				}

				if (animateLeft) {
					currentLeft = el.scrollLeft;

					if (!duration) {
						el.scrollLeft = left;
					}
				}

				if (!duration) return;

				if (animateTop) {
					maxTop = el.scrollHeight - el.offsetHeight;
					newTop = Math.max(Math.min(top, maxTop), 0);
				}

				if (animateLeft) {
					maxLeft = el.scrollWidth - el.offsetWidth;
					newLeft = Math.max(Math.min(left, maxLeft), 0);
				}

				let startTime = null;
				if (animateTop && newTop === currentTop) animateTop = false;
				if (animateLeft && newLeft === currentLeft) animateLeft = false;

				function render(time = new Date().getTime()) {
					if (startTime === null) {
						startTime = time;
					}

					const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
					const easeProgress = easing === "linear" ? progress : 0.5 - Math.cos(progress * Math.PI) / 2;
					let done;
					if (animateTop) scrollTop = currentTop + easeProgress * (newTop - currentTop);
					if (animateLeft) scrollLeft = currentLeft + easeProgress * (newLeft - currentLeft);

					if (animateTop && newTop > currentTop && scrollTop >= newTop) {
						el.scrollTop = newTop;
						done = true;
					}

					if (animateTop && newTop < currentTop && scrollTop <= newTop) {
						el.scrollTop = newTop;
						done = true;
					}

					if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
						el.scrollLeft = newLeft;
						done = true;
					}

					if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
						el.scrollLeft = newLeft;
						done = true;
					}

					if (done) {
						if (callback) callback();
						return;
					}

					if (animateTop) el.scrollTop = scrollTop;
					if (animateLeft) el.scrollLeft = scrollLeft;
					window.requestAnimationFrame(render);
				}

				window.requestAnimationFrame(render);
			});
		} // scrollTop(top, duration, easing, callback) {

		function scrollTop(...args) {
			let [top, duration, easing, callback] = args;

			if (args.length === 3 && typeof easing === "function") {
				[top, duration, callback, easing] = args;
			}

			const dom = this;

			if (typeof top === "undefined") {
				if (dom.length > 0) return dom[0].scrollTop;
				return null;
			}

			return dom.scrollTo(undefined, top, duration, easing, callback);
		}

		function scrollLeft(...args) {
			let [left, duration, easing, callback] = args;

			if (args.length === 3 && typeof easing === "function") {
				[left, duration, callback, easing] = args;
			}

			const dom = this;

			if (typeof left === "undefined") {
				if (dom.length > 0) return dom[0].scrollLeft;
				return null;
			}

			return dom.scrollTo(left, undefined, duration, easing, callback);
		}

		// eslint-disable-next-line

		function animate(initialProps, initialParams) {
			const window = getWindow();
			const els = this;
			const a = {
				props: Object.assign({}, initialProps),
				params: Object.assign(
					{
						duration: 300,
						easing: "swing", // or 'linear'

						/* Callbacks
      begin(elements)
      complete(elements)
      progress(elements, complete, remaining, start, tweenValue)
      */
					},
					initialParams
				),
				elements: els,
				animating: false,
				que: [],

				easingProgress(easing, progress) {
					if (easing === "swing") {
						return 0.5 - Math.cos(progress * Math.PI) / 2;
					}

					if (typeof easing === "function") {
						return easing(progress);
					}

					return progress;
				},

				stop() {
					if (a.frameId) {
						window.cancelAnimationFrame(a.frameId);
					}

					a.animating = false;
					a.elements.each((el) => {
						const element = el;
						delete element.dom7AnimateInstance;
					});
					a.que = [];
				},

				done(complete) {
					a.animating = false;
					a.elements.each((el) => {
						const element = el;
						delete element.dom7AnimateInstance;
					});
					if (complete) complete(els);

					if (a.que.length > 0) {
						const que = a.que.shift();
						a.animate(que[0], que[1]);
					}
				},

				animate(props, params) {
					if (a.animating) {
						a.que.push([props, params]);
						return a;
					}

					const elements = []; // Define & Cache Initials & Units

					a.elements.each((el, index) => {
						let initialFullValue;
						let initialValue;
						let unit;
						let finalValue;
						let finalFullValue;
						if (!el.dom7AnimateInstance) a.elements[index].dom7AnimateInstance = a;
						elements[index] = {
							container: el,
						};
						Object.keys(props).forEach((prop) => {
							initialFullValue = window
								.getComputedStyle(el, null)
								.getPropertyValue(prop)
								.replace(",", ".");
							initialValue = parseFloat(initialFullValue);
							unit = initialFullValue.replace(initialValue, "");
							finalValue = parseFloat(props[prop]);
							finalFullValue = props[prop] + unit;
							elements[index][prop] = {
								initialFullValue,
								initialValue,
								unit,
								finalValue,
								finalFullValue,
								currentValue: initialValue,
							};
						});
					});
					let startTime = null;
					let time;
					let elementsDone = 0;
					let propsDone = 0;
					let done;
					let began = false;
					a.animating = true;

					function render() {
						time = new Date().getTime();
						let progress;
						let easeProgress; // let el;

						if (!began) {
							began = true;
							if (params.begin) params.begin(els);
						}

						if (startTime === null) {
							startTime = time;
						}

						if (params.progress) {
							// eslint-disable-next-line
							params.progress(
								els,
								Math.max(Math.min((time - startTime) / params.duration, 1), 0),
								startTime + params.duration - time < 0 ? 0 : startTime + params.duration - time,
								startTime
							);
						}

						elements.forEach((element) => {
							const el = element;
							if (done || el.done) return;
							Object.keys(props).forEach((prop) => {
								if (done || el.done) return;
								progress = Math.max(Math.min((time - startTime) / params.duration, 1), 0);
								easeProgress = a.easingProgress(params.easing, progress);
								const { initialValue, finalValue, unit } = el[prop];
								el[prop].currentValue = initialValue + easeProgress * (finalValue - initialValue);
								const currentValue = el[prop].currentValue;

								if (
									(finalValue > initialValue && currentValue >= finalValue) ||
									(finalValue < initialValue && currentValue <= finalValue)
								) {
									el.container.style[prop] = finalValue + unit;
									propsDone += 1;

									if (propsDone === Object.keys(props).length) {
										el.done = true;
										elementsDone += 1;
									}

									if (elementsDone === elements.length) {
										done = true;
									}
								}

								if (done) {
									a.done(params.complete);
									return;
								}

								el.container.style[prop] = currentValue + unit;
							});
						});
						if (done) return; // Then call

						a.frameId = window.requestAnimationFrame(render);
					}

					a.frameId = window.requestAnimationFrame(render);
					return a;
				},
			};

			if (a.elements.length === 0) {
				return els;
			}

			let animateInstance;

			for (let i = 0; i < a.elements.length; i += 1) {
				if (a.elements[i].dom7AnimateInstance) {
					animateInstance = a.elements[i].dom7AnimateInstance;
				} else a.elements[i].dom7AnimateInstance = a;
			}

			if (!animateInstance) {
				animateInstance = a;
			}

			if (initialProps === "stop") {
				animateInstance.stop();
			} else {
				animateInstance.animate(a.props, a.params);
			}

			return els;
		}

		function stop() {
			const els = this;

			for (let i = 0; i < els.length; i += 1) {
				if (els[i].dom7AnimateInstance) {
					els[i].dom7AnimateInstance.stop();
				}
			}
		}

		const noTrigger = "resize scroll".split(" ");

		function shortcut(name) {
			function eventHandler(...args) {
				if (typeof args[0] === "undefined") {
					for (let i = 0; i < this.length; i += 1) {
						if (noTrigger.indexOf(name) < 0) {
							if (name in this[i]) this[i][name]();
							else {
								dom7_esm_$(this[i]).trigger(name);
							}
						}
					}

					return this;
				}

				return this.on(name, ...args);
			}

			return eventHandler;
		}

		const click = shortcut("click");
		const dom7_esm_blur = shortcut("blur");
		const dom7_esm_focus = shortcut("focus");
		const focusin = shortcut("focusin");
		const focusout = shortcut("focusout");
		const keyup = shortcut("keyup");
		const keydown = shortcut("keydown");
		const keypress = shortcut("keypress");
		const dom7_esm_submit = shortcut("submit");
		const change = shortcut("change");
		const mousedown = shortcut("mousedown");
		const mousemove = shortcut("mousemove");
		const mouseup = shortcut("mouseup");
		const mouseenter = shortcut("mouseenter");
		const mouseleave = shortcut("mouseleave");
		const mouseout = shortcut("mouseout");
		const mouseover = shortcut("mouseover");
		const touchstart = shortcut("touchstart");
		const touchend = shortcut("touchend");
		const touchmove = shortcut("touchmove");
		const resize = shortcut("resize");
		const dom7_esm_scroll = shortcut("scroll");

		/* harmony default export */ const dom7_esm = /* unused pure expression or super */ null && dom7_esm_$; // CONCATENATED MODULE: ./node_modules/swiper/shared/dom.js

		const Methods = {
			addClass: addClass,
			removeClass: removeClass,
			hasClass: hasClass,
			toggleClass: toggleClass,
			attr: attr,
			removeAttr: removeAttr,
			transform: transform,
			transition: transition,
			on: on,
			off: off,
			trigger: trigger,
			transitionEnd: transitionEnd,
			outerWidth: dom7_esm_outerWidth,
			outerHeight: dom7_esm_outerHeight,
			styles: styles,
			offset: offset,
			css: css,
			each: each,
			html: html,
			text: dom7_esm_text,
			is: is,
			index: index,
			eq: eq,
			append: append,
			prepend: prepend,
			next: next,
			nextAll: nextAll,
			prev: prev,
			prevAll: prevAll,
			parent: dom7_esm_parent,
			parents: parents,
			closest: closest,
			find: find,
			children: children,
			filter: filter,
			remove: remove,
		};
		Object.keys(Methods).forEach((methodName) => {
			Object.defineProperty(dom7_esm_$.fn, methodName, {
				value: Methods[methodName],
				writable: true,
			});
		});
		/* harmony default export */ const dom = dom7_esm_$; // CONCATENATED MODULE: ./node_modules/swiper/shared/utils.js
		function deleteProps(obj) {
			const object = obj;
			Object.keys(object).forEach((key) => {
				try {
					object[key] = null;
				} catch (e) {
					// no getter for object
				}

				try {
					delete object[key];
				} catch (e) {
					// something got wrong
				}
			});
		}

		function utils_nextTick(callback, delay = 0) {
			return setTimeout(callback, delay);
		}

		function utils_now() {
			return Date.now();
		}

		function utils_getComputedStyle(el) {
			const window = ssr_window_esm_getWindow();
			let style;

			if (window.getComputedStyle) {
				style = window.getComputedStyle(el, null);
			}

			if (!style && el.currentStyle) {
				style = el.currentStyle;
			}

			if (!style) {
				style = el.style;
			}

			return style;
		}

		function utils_getTranslate(el, axis = "x") {
			const window = ssr_window_esm_getWindow();
			let matrix;
			let curTransform;
			let transformMatrix;
			const curStyle = utils_getComputedStyle(el, null);

			if (window.WebKitCSSMatrix) {
				curTransform = curStyle.transform || curStyle.webkitTransform;

				if (curTransform.split(",").length > 6) {
					curTransform = curTransform
						.split(", ")
						.map((a) => a.replace(",", "."))
						.join(", ");
				} // Some old versions of Webkit choke when 'none' is passed; pass
				// empty string instead in this case

				transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
			} else {
				transformMatrix =
					curStyle.MozTransform ||
					curStyle.OTransform ||
					curStyle.MsTransform ||
					curStyle.msTransform ||
					curStyle.transform ||
					curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
				matrix = transformMatrix.toString().split(",");
			}

			if (axis === "x") {
				// Latest Chrome and webkits Fix
				if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
				else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers
				else curTransform = parseFloat(matrix[4]);
			}

			if (axis === "y") {
				// Latest Chrome and webkits Fix
				if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
				else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers
				else curTransform = parseFloat(matrix[5]);
			}

			return curTransform || 0;
		}

		function utils_isObject(o) {
			return (
				typeof o === "object" &&
				o !== null &&
				o.constructor &&
				Object.prototype.toString.call(o).slice(8, -1) === "Object"
			);
		}

		function isNode(node) {
			// eslint-disable-next-line
			if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
				return node instanceof HTMLElement;
			}

			return node && (node.nodeType === 1 || node.nodeType === 11);
		}

		function utils_extend(...args) {
			const to = Object(args[0]);
			const noExtend = ["__proto__", "constructor", "prototype"];

			for (let i = 1; i < args.length; i += 1) {
				const nextSource = args[i];

				if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
					const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);

					for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
						const nextKey = keysArray[nextIndex];
						const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

						if (desc !== undefined && desc.enumerable) {
							if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
								if (nextSource[nextKey].__swiper__) {
									to[nextKey] = nextSource[nextKey];
								} else {
									utils_extend(to[nextKey], nextSource[nextKey]);
								}
							} else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
								to[nextKey] = {};

								if (nextSource[nextKey].__swiper__) {
									to[nextKey] = nextSource[nextKey];
								} else {
									utils_extend(to[nextKey], nextSource[nextKey]);
								}
							} else {
								to[nextKey] = nextSource[nextKey];
							}
						}
					}
				}
			}

			return to;
		}

		function utils_setCSSProperty(el, varName, varValue) {
			el.style.setProperty(varName, varValue);
		}

		function animateCSSModeScroll({ swiper, targetPosition, side }) {
			const window = ssr_window_esm_getWindow();
			const startPosition = -swiper.translate;
			let startTime = null;
			let time;
			const duration = swiper.params.speed;
			swiper.wrapperEl.style.scrollSnapType = "none";
			window.cancelAnimationFrame(swiper.cssModeFrameID);
			const dir = targetPosition > startPosition ? "next" : "prev";

			const isOutOfBound = (current, target) => {
				return (dir === "next" && current >= target) || (dir === "prev" && current <= target);
			};

			const animate = () => {
				time = new Date().getTime();

				if (startTime === null) {
					startTime = time;
				}

				const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
				const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
				let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);

				if (isOutOfBound(currentPosition, targetPosition)) {
					currentPosition = targetPosition;
				}

				swiper.wrapperEl.scrollTo({
					[side]: currentPosition,
				});

				if (isOutOfBound(currentPosition, targetPosition)) {
					swiper.wrapperEl.style.overflow = "hidden";
					swiper.wrapperEl.style.scrollSnapType = "";
					setTimeout(() => {
						swiper.wrapperEl.style.overflow = "";
						swiper.wrapperEl.scrollTo({
							[side]: currentPosition,
						});
					});
					window.cancelAnimationFrame(swiper.cssModeFrameID);
					return;
				}

				swiper.cssModeFrameID = window.requestAnimationFrame(animate);
			};

			animate();
		} // CONCATENATED MODULE: ./node_modules/swiper/shared/get-support.js

		let support;

		function calcSupport() {
			const window = ssr_window_esm_getWindow();
			const document = ssr_window_esm_getDocument();
			return {
				smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
				touch: !!(
					"ontouchstart" in window ||
					(window.DocumentTouch && document instanceof window.DocumentTouch)
				),
				passiveListener: (function checkPassiveListener() {
					let supportsPassive = false;

					try {
						const opts = Object.defineProperty({}, "passive", {
							// eslint-disable-next-line
							get() {
								supportsPassive = true;
							},
						});
						window.addEventListener("testPassiveListener", null, opts);
					} catch (e) {
						// No support
					}

					return supportsPassive;
				})(),
				gestures: (function checkGestures() {
					return "ongesturestart" in window;
				})(),
			};
		}

		function getSupport() {
			if (!support) {
				support = calcSupport();
			}

			return support;
		} // CONCATENATED MODULE: ./node_modules/swiper/shared/get-device.js

		let deviceCached;

		function calcDevice({ userAgent } = {}) {
			const support = getSupport();
			const window = ssr_window_esm_getWindow();
			const platform = window.navigator.platform;
			const ua = userAgent || window.navigator.userAgent;
			const device = {
				ios: false,
				android: false,
			};
			const screenWidth = window.screen.width;
			const screenHeight = window.screen.height;
			const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

			let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
			const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
			const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
			const windows = platform === "Win32";
			let macos = platform === "MacIntel"; // iPadOs 13 fix

			const iPadScreens = [
				"1024x1366",
				"1366x1024",
				"834x1194",
				"1194x834",
				"834x1112",
				"1112x834",
				"768x1024",
				"1024x768",
				"820x1180",
				"1180x820",
				"810x1080",
				"1080x810",
			];

			if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
				ipad = ua.match(/(Version)\/([\d.]+)/);
				if (!ipad) ipad = [0, 1, "13_0_0"];
				macos = false;
			} // Android

			if (android && !windows) {
				device.os = "android";
				device.android = true;
			}

			if (ipad || iphone || ipod) {
				device.os = "ios";
				device.ios = true;
			} // Export object

			return device;
		}

		function getDevice(overrides = {}) {
			if (!deviceCached) {
				deviceCached = calcDevice(overrides);
			}

			return deviceCached;
		} // CONCATENATED MODULE: ./node_modules/swiper/shared/get-browser.js

		let get_browser_browser;

		function calcBrowser() {
			const window = ssr_window_esm_getWindow();

			function isSafari() {
				const ua = window.navigator.userAgent.toLowerCase();
				return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
			}

			return {
				isSafari: isSafari(),
				isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
			};
		}

		function getBrowser() {
			if (!get_browser_browser) {
				get_browser_browser = calcBrowser();
			}

			return get_browser_browser;
		} // CONCATENATED MODULE: ./node_modules/swiper/core/modules/resize/resize.js

		function Resize({ swiper, on, emit }) {
			const window = ssr_window_esm_getWindow();
			let observer = null;

			const resizeHandler = () => {
				if (!swiper || swiper.destroyed || !swiper.initialized) return;
				emit("beforeResize");
				emit("resize");
			};

			const createObserver = () => {
				if (!swiper || swiper.destroyed || !swiper.initialized) return;
				observer = new ResizeObserver((entries) => {
					const { width, height } = swiper;
					let newWidth = width;
					let newHeight = height;
					entries.forEach(({ contentBoxSize, contentRect, target }) => {
						if (target && target !== swiper.el) return;
						newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
						newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
					});

					if (newWidth !== width || newHeight !== height) {
						resizeHandler();
					}
				});
				observer.observe(swiper.el);
			};

			const removeObserver = () => {
				if (observer && observer.unobserve && swiper.el) {
					observer.unobserve(swiper.el);
					observer = null;
				}
			};

			const orientationChangeHandler = () => {
				if (!swiper || swiper.destroyed || !swiper.initialized) return;
				emit("orientationchange");
			};

			on("init", () => {
				if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
					createObserver();
					return;
				}

				window.addEventListener("resize", resizeHandler);
				window.addEventListener("orientationchange", orientationChangeHandler);
			});
			on("destroy", () => {
				removeObserver();
				window.removeEventListener("resize", resizeHandler);
				window.removeEventListener("orientationchange", orientationChangeHandler);
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/core/modules/observer/observer.js
		function Observer({ swiper, extendParams, on, emit }) {
			const observers = [];
			const window = ssr_window_esm_getWindow();

			const attach = (target, options = {}) => {
				const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
				const observer = new ObserverFunc((mutations) => {
					// The observerUpdate event should only be triggered
					// once despite the number of mutations.  Additional
					// triggers are redundant and are very costly
					if (mutations.length === 1) {
						emit("observerUpdate", mutations[0]);
						return;
					}

					const observerUpdate = function observerUpdate() {
						emit("observerUpdate", mutations[0]);
					};

					if (window.requestAnimationFrame) {
						window.requestAnimationFrame(observerUpdate);
					} else {
						window.setTimeout(observerUpdate, 0);
					}
				});
				observer.observe(target, {
					attributes: typeof options.attributes === "undefined" ? true : options.attributes,
					childList: typeof options.childList === "undefined" ? true : options.childList,
					characterData: typeof options.characterData === "undefined" ? true : options.characterData,
				});
				observers.push(observer);
			};

			const init = () => {
				if (!swiper.params.observer) return;

				if (swiper.params.observeParents) {
					const containerParents = swiper.$el.parents();

					for (let i = 0; i < containerParents.length; i += 1) {
						attach(containerParents[i]);
					}
				} // Observe container

				attach(swiper.$el[0], {
					childList: swiper.params.observeSlideChildren,
				}); // Observe wrapper

				attach(swiper.$wrapperEl[0], {
					attributes: false,
				});
			};

			const destroy = () => {
				observers.forEach((observer) => {
					observer.disconnect();
				});
				observers.splice(0, observers.length);
			};

			extendParams({
				observer: false,
				observeParents: false,
				observeSlideChildren: false,
			});
			on("init", init);
			on("destroy", destroy);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/events-emitter.js
		/* eslint-disable no-underscore-dangle */
		/* harmony default export */ const events_emitter = {
			on(events, handler, priority) {
				const self = this;
				if (typeof handler !== "function") return self;
				const method = priority ? "unshift" : "push";
				events.split(" ").forEach((event) => {
					if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
					self.eventsListeners[event][method](handler);
				});
				return self;
			},

			once(events, handler, priority) {
				const self = this;
				if (typeof handler !== "function") return self;

				function onceHandler(...args) {
					self.off(events, onceHandler);

					if (onceHandler.__emitterProxy) {
						delete onceHandler.__emitterProxy;
					}

					handler.apply(self, args);
				}

				onceHandler.__emitterProxy = handler;
				return self.on(events, onceHandler, priority);
			},

			onAny(handler, priority) {
				const self = this;
				if (typeof handler !== "function") return self;
				const method = priority ? "unshift" : "push";

				if (self.eventsAnyListeners.indexOf(handler) < 0) {
					self.eventsAnyListeners[method](handler);
				}

				return self;
			},

			offAny(handler) {
				const self = this;
				if (!self.eventsAnyListeners) return self;
				const index = self.eventsAnyListeners.indexOf(handler);

				if (index >= 0) {
					self.eventsAnyListeners.splice(index, 1);
				}

				return self;
			},

			off(events, handler) {
				const self = this;
				if (!self.eventsListeners) return self;
				events.split(" ").forEach((event) => {
					if (typeof handler === "undefined") {
						self.eventsListeners[event] = [];
					} else if (self.eventsListeners[event]) {
						self.eventsListeners[event].forEach((eventHandler, index) => {
							if (
								eventHandler === handler ||
								(eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler)
							) {
								self.eventsListeners[event].splice(index, 1);
							}
						});
					}
				});
				return self;
			},

			emit(...args) {
				const self = this;
				if (!self.eventsListeners) return self;
				let events;
				let data;
				let context;

				if (typeof args[0] === "string" || Array.isArray(args[0])) {
					events = args[0];
					data = args.slice(1, args.length);
					context = self;
				} else {
					events = args[0].events;
					data = args[0].data;
					context = args[0].context || self;
				}

				data.unshift(context);
				const eventsArray = Array.isArray(events) ? events : events.split(" ");
				eventsArray.forEach((event) => {
					if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
						self.eventsAnyListeners.forEach((eventHandler) => {
							eventHandler.apply(context, [event, ...data]);
						});
					}

					if (self.eventsListeners && self.eventsListeners[event]) {
						self.eventsListeners[event].forEach((eventHandler) => {
							eventHandler.apply(context, data);
						});
					}
				});
				return self;
			},
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateSize.js
		function updateSize() {
			const swiper = this;
			let width;
			let height;
			const $el = swiper.$el;

			if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
				width = swiper.params.width;
			} else {
				width = $el[0].clientWidth;
			}

			if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
				height = swiper.params.height;
			} else {
				height = $el[0].clientHeight;
			}

			if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
				return;
			} // Subtract paddings

			width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
			height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
			if (Number.isNaN(width)) width = 0;
			if (Number.isNaN(height)) height = 0;
			Object.assign(swiper, {
				width,
				height,
				size: swiper.isHorizontal() ? width : height,
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateSlides.js
		function updateSlides() {
			const swiper = this;

			function getDirectionLabel(property) {
				if (swiper.isHorizontal()) {
      return property;
    } // prettier-ignore

				return {
					width: "height",
					"margin-top": "margin-left",
					"margin-bottom ": "margin-right",
					"margin-left": "margin-top",
					"margin-right": "margin-bottom",
					"padding-left": "padding-top",
					"padding-right": "padding-bottom",
					marginRight: "marginBottom",
				}[property];
			}

			function getDirectionPropertyValue(node, label) {
				return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
			}

			const params = swiper.params;
			const { $wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL } = swiper;
			const isVirtual = swiper.virtual && params.virtual.enabled;
			const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
			const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
			const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
			let snapGrid = [];
			const slidesGrid = [];
			const slidesSizesGrid = [];
			let offsetBefore = params.slidesOffsetBefore;

			if (typeof offsetBefore === "function") {
				offsetBefore = params.slidesOffsetBefore.call(swiper);
			}

			let offsetAfter = params.slidesOffsetAfter;

			if (typeof offsetAfter === "function") {
				offsetAfter = params.slidesOffsetAfter.call(swiper);
			}

			const previousSnapGridLength = swiper.snapGrid.length;
			const previousSlidesGridLength = swiper.slidesGrid.length;
			let spaceBetween = params.spaceBetween;
			let slidePosition = -offsetBefore;
			let prevSlideSize = 0;
			let index = 0;

			if (typeof swiperSize === "undefined") {
				return;
			}

			if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
				spaceBetween = (parseFloat(spaceBetween.replace("%", "")) / 100) * swiperSize;
			}

			swiper.virtualSize = -spaceBetween; // reset margins

			if (rtl)
				slides.css({
					marginLeft: "",
					marginBottom: "",
					marginTop: "",
				});
			else
				slides.css({
					marginRight: "",
					marginBottom: "",
					marginTop: "",
				}); // reset cssMode offsets

			if (params.centeredSlides && params.cssMode) {
				utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
				utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
			}

			const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;

			if (gridEnabled) {
				swiper.grid.initSlides(slidesLength);
			} // Calc slides

			let slideSize;
			const shouldResetSlideSize =
				params.slidesPerView === "auto" &&
				params.breakpoints &&
				Object.keys(params.breakpoints).filter((key) => {
					return typeof params.breakpoints[key].slidesPerView !== "undefined";
				}).length > 0;

			for (let i = 0; i < slidesLength; i += 1) {
				slideSize = 0;
				const slide = slides.eq(i);

				if (gridEnabled) {
					swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
				}

				if (slide.css("display") === "none") continue; // eslint-disable-line

				if (params.slidesPerView === "auto") {
					if (shouldResetSlideSize) {
						slides[i].style[getDirectionLabel("width")] = ``;
					}

					const slideStyles = getComputedStyle(slide[0]);
					const currentTransform = slide[0].style.transform;
					const currentWebKitTransform = slide[0].style.webkitTransform;

					if (currentTransform) {
						slide[0].style.transform = "none";
					}

					if (currentWebKitTransform) {
						slide[0].style.webkitTransform = "none";
					}

					if (params.roundLengths) {
						slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
					} else {
						// eslint-disable-next-line
						const width = getDirectionPropertyValue(slideStyles, "width");
						const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
						const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
						const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
						const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
						const boxSizing = slideStyles.getPropertyValue("box-sizing");

						if (boxSizing && boxSizing === "border-box") {
							slideSize = width + marginLeft + marginRight;
						} else {
							const { clientWidth, offsetWidth } = slide[0];
							slideSize =
								width +
								paddingLeft +
								paddingRight +
								marginLeft +
								marginRight +
								(offsetWidth - clientWidth);
						}
					}

					if (currentTransform) {
						slide[0].style.transform = currentTransform;
					}

					if (currentWebKitTransform) {
						slide[0].style.webkitTransform = currentWebKitTransform;
					}

					if (params.roundLengths) slideSize = Math.floor(slideSize);
				} else {
					slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
					if (params.roundLengths) slideSize = Math.floor(slideSize);

					if (slides[i]) {
						slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
					}
				}

				if (slides[i]) {
					slides[i].swiperSlideSize = slideSize;
				}

				slidesSizesGrid.push(slideSize);

				if (params.centeredSlides) {
					slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
					if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
					if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
					if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
					if (params.roundLengths) slidePosition = Math.floor(slidePosition);
					if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
					slidesGrid.push(slidePosition);
				} else {
					if (params.roundLengths) slidePosition = Math.floor(slidePosition);
					if (
						(index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup ===
						0
					)
						snapGrid.push(slidePosition);
					slidesGrid.push(slidePosition);
					slidePosition = slidePosition + slideSize + spaceBetween;
				}

				swiper.virtualSize += slideSize + spaceBetween;
				prevSlideSize = slideSize;
				index += 1;
			}

			swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;

			if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
				$wrapperEl.css({
					width: `${swiper.virtualSize + params.spaceBetween}px`,
				});
			}

			if (params.setWrapperSize) {
				$wrapperEl.css({
					[getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`,
				});
			}

			if (gridEnabled) {
				swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
			} // Remove last grid elements depending on width

			if (!params.centeredSlides) {
				const newSlidesGrid = [];

				for (let i = 0; i < snapGrid.length; i += 1) {
					let slidesGridItem = snapGrid[i];
					if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);

					if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
						newSlidesGrid.push(slidesGridItem);
					}
				}

				snapGrid = newSlidesGrid;

				if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
					snapGrid.push(swiper.virtualSize - swiperSize);
				}
			}

			if (snapGrid.length === 0) snapGrid = [0];

			if (params.spaceBetween !== 0) {
				const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
				slides
					.filter((_, slideIndex) => {
						if (!params.cssMode) return true;

						if (slideIndex === slides.length - 1) {
							return false;
						}

						return true;
					})
					.css({
						[key]: `${spaceBetween}px`,
					});
			}

			if (params.centeredSlides && params.centeredSlidesBounds) {
				let allSlidesSize = 0;
				slidesSizesGrid.forEach((slideSizeValue) => {
					allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
				});
				allSlidesSize -= params.spaceBetween;
				const maxSnap = allSlidesSize - swiperSize;
				snapGrid = snapGrid.map((snap) => {
					if (snap < 0) return -offsetBefore;
					if (snap > maxSnap) return maxSnap + offsetAfter;
					return snap;
				});
			}

			if (params.centerInsufficientSlides) {
				let allSlidesSize = 0;
				slidesSizesGrid.forEach((slideSizeValue) => {
					allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
				});
				allSlidesSize -= params.spaceBetween;

				if (allSlidesSize < swiperSize) {
					const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
					snapGrid.forEach((snap, snapIndex) => {
						snapGrid[snapIndex] = snap - allSlidesOffset;
					});
					slidesGrid.forEach((snap, snapIndex) => {
						slidesGrid[snapIndex] = snap + allSlidesOffset;
					});
				}
			}

			Object.assign(swiper, {
				slides,
				snapGrid,
				slidesGrid,
				slidesSizesGrid,
			});

			if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
				utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
				utils_setCSSProperty(
					swiper.wrapperEl,
					"--swiper-centered-offset-after",
					`${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`
				);
				const addToSnapGrid = -swiper.snapGrid[0];
				const addToSlidesGrid = -swiper.slidesGrid[0];
				swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
				swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
			}

			if (slidesLength !== previousSlidesLength) {
				swiper.emit("slidesLengthChange");
			}

			if (snapGrid.length !== previousSnapGridLength) {
				if (swiper.params.watchOverflow) swiper.checkOverflow();
				swiper.emit("snapGridLengthChange");
			}

			if (slidesGrid.length !== previousSlidesGridLength) {
				swiper.emit("slidesGridLengthChange");
			}

			if (params.watchSlidesProgress) {
				swiper.updateSlidesOffset();
			}
		} // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateAutoHeight.js
		function updateAutoHeight(speed) {
			const swiper = this;
			const activeSlides = [];
			const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
			let newHeight = 0;
			let i;

			if (typeof speed === "number") {
				swiper.setTransition(speed);
			} else if (speed === true) {
				swiper.setTransition(swiper.params.speed);
			}

			const getSlideByIndex = (index) => {
				if (isVirtual) {
					return swiper.slides.filter(
						(el) => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index
					)[0];
				}

				return swiper.slides.eq(index)[0];
			}; // Find slides currently in view

			if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
				if (swiper.params.centeredSlides) {
					swiper.visibleSlides.each((slide) => {
						activeSlides.push(slide);
					});
				} else {
					for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
						const index = swiper.activeIndex + i;
						if (index > swiper.slides.length && !isVirtual) break;
						activeSlides.push(getSlideByIndex(index));
					}
				}
			} else {
				activeSlides.push(getSlideByIndex(swiper.activeIndex));
			} // Find new height from highest slide in view

			for (i = 0; i < activeSlides.length; i += 1) {
				if (typeof activeSlides[i] !== "undefined") {
					const height = activeSlides[i].offsetHeight;
					newHeight = height > newHeight ? height : newHeight;
				}
			} // Update Height

			if (newHeight || newHeight === 0) swiper.$wrapperEl.css("height", `${newHeight}px`);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateSlidesOffset.js
		function updateSlidesOffset() {
			const swiper = this;
			const slides = swiper.slides;

			for (let i = 0; i < slides.length; i += 1) {
				slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
			}
		} // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateSlidesProgress.js
		function updateSlidesProgress(translate = (this && this.translate) || 0) {
			const swiper = this;
			const params = swiper.params;
			const { slides, rtlTranslate: rtl, snapGrid } = swiper;
			if (slides.length === 0) return;
			if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
			let offsetCenter = -translate;
			if (rtl) offsetCenter = translate; // Visible Slides

			slides.removeClass(params.slideVisibleClass);
			swiper.visibleSlidesIndexes = [];
			swiper.visibleSlides = [];

			for (let i = 0; i < slides.length; i += 1) {
				const slide = slides[i];
				let slideOffset = slide.swiperSlideOffset;

				if (params.cssMode && params.centeredSlides) {
					slideOffset -= slides[0].swiperSlideOffset;
				}

				const slideProgress =
					(offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) /
					(slide.swiperSlideSize + params.spaceBetween);
				const originalSlideProgress =
					(offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) /
					(slide.swiperSlideSize + params.spaceBetween);
				const slideBefore = -(offsetCenter - slideOffset);
				const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
				const isVisible =
					(slideBefore >= 0 && slideBefore < swiper.size - 1) ||
					(slideAfter > 1 && slideAfter <= swiper.size) ||
					(slideBefore <= 0 && slideAfter >= swiper.size);

				if (isVisible) {
					swiper.visibleSlides.push(slide);
					swiper.visibleSlidesIndexes.push(i);
					slides.eq(i).addClass(params.slideVisibleClass);
				}

				slide.progress = rtl ? -slideProgress : slideProgress;
				slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
			}

			swiper.visibleSlides = dom(swiper.visibleSlides);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateProgress.js
		function updateProgress(translate) {
			const swiper = this;

			if (typeof translate === "undefined") {
				const multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

				translate = (swiper && swiper.translate && swiper.translate * multiplier) || 0;
			}

			const params = swiper.params;
			const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
			let { progress, isBeginning, isEnd } = swiper;
			const wasBeginning = isBeginning;
			const wasEnd = isEnd;

			if (translatesDiff === 0) {
				progress = 0;
				isBeginning = true;
				isEnd = true;
			} else {
				progress = (translate - swiper.minTranslate()) / translatesDiff;
				isBeginning = progress <= 0;
				isEnd = progress >= 1;
			}

			Object.assign(swiper, {
				progress,
				isBeginning,
				isEnd,
			});
			if (params.watchSlidesProgress || (params.centeredSlides && params.autoHeight))
				swiper.updateSlidesProgress(translate);

			if (isBeginning && !wasBeginning) {
				swiper.emit("reachBeginning toEdge");
			}

			if (isEnd && !wasEnd) {
				swiper.emit("reachEnd toEdge");
			}

			if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
				swiper.emit("fromEdge");
			}

			swiper.emit("progress", progress);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateSlidesClasses.js
		function updateSlidesClasses() {
			const swiper = this;
			const { slides, params, $wrapperEl, activeIndex, realIndex } = swiper;
			const isVirtual = swiper.virtual && params.virtual.enabled;
			slides.removeClass(
				`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`
			);
			let activeSlide;

			if (isVirtual) {
				activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
			} else {
				activeSlide = slides.eq(activeIndex);
			} // Active classes

			activeSlide.addClass(params.slideActiveClass);

			if (params.loop) {
				// Duplicate to all looped slides
				if (activeSlide.hasClass(params.slideDuplicateClass)) {
					$wrapperEl
						.children(
							`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`
						)
						.addClass(params.slideDuplicateActiveClass);
				} else {
					$wrapperEl
						.children(
							`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`
						)
						.addClass(params.slideDuplicateActiveClass);
				}
			} // Next Slide

			let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);

			if (params.loop && nextSlide.length === 0) {
				nextSlide = slides.eq(0);
				nextSlide.addClass(params.slideNextClass);
			} // Prev Slide

			let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);

			if (params.loop && prevSlide.length === 0) {
				prevSlide = slides.eq(-1);
				prevSlide.addClass(params.slidePrevClass);
			}

			if (params.loop) {
				// Duplicate to all looped slides
				if (nextSlide.hasClass(params.slideDuplicateClass)) {
					$wrapperEl
						.children(
							`.${params.slideClass}:not(.${
								params.slideDuplicateClass
							})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`
						)
						.addClass(params.slideDuplicateNextClass);
				} else {
					$wrapperEl
						.children(
							`.${params.slideClass}.${
								params.slideDuplicateClass
							}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`
						)
						.addClass(params.slideDuplicateNextClass);
				}

				if (prevSlide.hasClass(params.slideDuplicateClass)) {
					$wrapperEl
						.children(
							`.${params.slideClass}:not(.${
								params.slideDuplicateClass
							})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`
						)
						.addClass(params.slideDuplicatePrevClass);
				} else {
					$wrapperEl
						.children(
							`.${params.slideClass}.${
								params.slideDuplicateClass
							}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`
						)
						.addClass(params.slideDuplicatePrevClass);
				}
			}

			swiper.emitSlidesClasses();
		} // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateActiveIndex.js
		function updateActiveIndex(newActiveIndex) {
			const swiper = this;
			const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
			const {
				slidesGrid,
				snapGrid,
				params,
				activeIndex: previousIndex,
				realIndex: previousRealIndex,
				snapIndex: previousSnapIndex,
			} = swiper;
			let activeIndex = newActiveIndex;
			let snapIndex;

			if (typeof activeIndex === "undefined") {
				for (let i = 0; i < slidesGrid.length; i += 1) {
					if (typeof slidesGrid[i + 1] !== "undefined") {
						if (
							translate >= slidesGrid[i] &&
							translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2
						) {
							activeIndex = i;
						} else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
							activeIndex = i + 1;
						}
					} else if (translate >= slidesGrid[i]) {
						activeIndex = i;
					}
				} // Normalize slideIndex

				if (params.normalizeSlideIndex) {
					if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
				}
			}

			if (snapGrid.indexOf(translate) >= 0) {
				snapIndex = snapGrid.indexOf(translate);
			} else {
				const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
				snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
			}

			if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

			if (activeIndex === previousIndex) {
				if (snapIndex !== previousSnapIndex) {
					swiper.snapIndex = snapIndex;
					swiper.emit("snapIndexChange");
				}

				return;
			} // Get real index

			const realIndex = parseInt(
				swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex,
				10
			);
			Object.assign(swiper, {
				snapIndex,
				realIndex,
				previousIndex,
				activeIndex,
			});
			swiper.emit("activeIndexChange");
			swiper.emit("snapIndexChange");

			if (previousRealIndex !== realIndex) {
				swiper.emit("realIndexChange");
			}

			if (swiper.initialized || swiper.params.runCallbacksOnInit) {
				swiper.emit("slideChange");
			}
		} // CONCATENATED MODULE: ./node_modules/swiper/core/update/updateClickedSlide.js
		function updateClickedSlide(e) {
			const swiper = this;
			const params = swiper.params;
			const slide = dom(e).closest(`.${params.slideClass}`)[0];
			let slideFound = false;
			let slideIndex;

			if (slide) {
				for (let i = 0; i < swiper.slides.length; i += 1) {
					if (swiper.slides[i] === slide) {
						slideFound = true;
						slideIndex = i;
						break;
					}
				}
			}

			if (slide && slideFound) {
				swiper.clickedSlide = slide;

				if (swiper.virtual && swiper.params.virtual.enabled) {
					swiper.clickedIndex = parseInt(dom(slide).attr("data-swiper-slide-index"), 10);
				} else {
					swiper.clickedIndex = slideIndex;
				}
			} else {
				swiper.clickedSlide = undefined;
				swiper.clickedIndex = undefined;
				return;
			}

			if (
				params.slideToClickedSlide &&
				swiper.clickedIndex !== undefined &&
				swiper.clickedIndex !== swiper.activeIndex
			) {
				swiper.slideToClickedSlide();
			}
		} // CONCATENATED MODULE: ./node_modules/swiper/core/update/index.js
		/* harmony default export */ const update = {
			updateSize: updateSize,
			updateSlides: updateSlides,
			updateAutoHeight: updateAutoHeight,
			updateSlidesOffset: updateSlidesOffset,
			updateSlidesProgress: updateSlidesProgress,
			updateProgress: updateProgress,
			updateSlidesClasses: updateSlidesClasses,
			updateActiveIndex: updateActiveIndex,
			updateClickedSlide: updateClickedSlide,
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/translate/getTranslate.js
		function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
			const swiper = this;
			const { params, rtlTranslate: rtl, translate, $wrapperEl } = swiper;

			if (params.virtualTranslate) {
				return rtl ? -translate : translate;
			}

			if (params.cssMode) {
				return translate;
			}

			let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
			if (rtl) currentTranslate = -currentTranslate;
			return currentTranslate || 0;
		} // CONCATENATED MODULE: ./node_modules/swiper/core/translate/setTranslate.js
		function setTranslate(translate, byController) {
			const swiper = this;
			const { rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress } = swiper;
			let x = 0;
			let y = 0;
			const z = 0;

			if (swiper.isHorizontal()) {
				x = rtl ? -translate : translate;
			} else {
				y = translate;
			}

			if (params.roundLengths) {
				x = Math.floor(x);
				y = Math.floor(y);
			}

			if (params.cssMode) {
				wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y;
			} else if (!params.virtualTranslate) {
				$wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
			}

			swiper.previousTranslate = swiper.translate;
			swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

			let newProgress;
			const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

			if (translatesDiff === 0) {
				newProgress = 0;
			} else {
				newProgress = (translate - swiper.minTranslate()) / translatesDiff;
			}

			if (newProgress !== progress) {
				swiper.updateProgress(translate);
			}

			swiper.emit("setTranslate", swiper.translate, byController);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/translate/minTranslate.js
		function minTranslate() {
			return -this.snapGrid[0];
		} // CONCATENATED MODULE: ./node_modules/swiper/core/translate/maxTranslate.js
		function maxTranslate() {
			return -this.snapGrid[this.snapGrid.length - 1];
		} // CONCATENATED MODULE: ./node_modules/swiper/core/translate/translateTo.js
		function translateTo(
			translate = 0,
			speed = this.params.speed,
			runCallbacks = true,
			translateBounds = true,
			internal
		) {
			const swiper = this;
			const { params, wrapperEl } = swiper;

			if (swiper.animating && params.preventInteractionOnTransition) {
				return false;
			}

			const minTranslate = swiper.minTranslate();
			const maxTranslate = swiper.maxTranslate();
			let newTranslate;
			if (translateBounds && translate > minTranslate) newTranslate = minTranslate;
			else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;
			else newTranslate = translate; // Update progress

			swiper.updateProgress(newTranslate);

			if (params.cssMode) {
				const isH = swiper.isHorizontal();

				if (speed === 0) {
					wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
				} else {
					if (!swiper.support.smoothScroll) {
						animateCSSModeScroll({
							swiper,
							targetPosition: -newTranslate,
							side: isH ? "left" : "top",
						});
						return true;
					}

					wrapperEl.scrollTo({
						[isH ? "left" : "top"]: -newTranslate,
						behavior: "smooth",
					});
				}

				return true;
			}

			if (speed === 0) {
				swiper.setTransition(0);
				swiper.setTranslate(newTranslate);

				if (runCallbacks) {
					swiper.emit("beforeTransitionStart", speed, internal);
					swiper.emit("transitionEnd");
				}
			} else {
				swiper.setTransition(speed);
				swiper.setTranslate(newTranslate);

				if (runCallbacks) {
					swiper.emit("beforeTransitionStart", speed, internal);
					swiper.emit("transitionStart");
				}

				if (!swiper.animating) {
					swiper.animating = true;

					if (!swiper.onTranslateToWrapperTransitionEnd) {
						swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
							if (!swiper || swiper.destroyed) return;
							if (e.target !== this) return;
							swiper.$wrapperEl[0].removeEventListener(
								"transitionend",
								swiper.onTranslateToWrapperTransitionEnd
							);
							swiper.$wrapperEl[0].removeEventListener(
								"webkitTransitionEnd",
								swiper.onTranslateToWrapperTransitionEnd
							);
							swiper.onTranslateToWrapperTransitionEnd = null;
							delete swiper.onTranslateToWrapperTransitionEnd;

							if (runCallbacks) {
								swiper.emit("transitionEnd");
							}
						};
					}

					swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
					swiper.$wrapperEl[0].addEventListener(
						"webkitTransitionEnd",
						swiper.onTranslateToWrapperTransitionEnd
					);
				}
			}

			return true;
		} // CONCATENATED MODULE: ./node_modules/swiper/core/translate/index.js
		/* harmony default export */ const translate = {
			getTranslate: getSwiperTranslate,
			setTranslate: setTranslate,
			minTranslate: minTranslate,
			maxTranslate: maxTranslate,
			translateTo: translateTo,
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/transition/setTransition.js
		function setTransition(duration, byController) {
			const swiper = this;

			if (!swiper.params.cssMode) {
				swiper.$wrapperEl.transition(duration);
			}

			swiper.emit("setTransition", duration, byController);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/transition/transitionEmit.js
		function transitionEmit({ swiper, runCallbacks, direction, step }) {
			const { activeIndex, previousIndex } = swiper;
			let dir = direction;

			if (!dir) {
				if (activeIndex > previousIndex) dir = "next";
				else if (activeIndex < previousIndex) dir = "prev";
				else dir = "reset";
			}

			swiper.emit(`transition${step}`);

			if (runCallbacks && activeIndex !== previousIndex) {
				if (dir === "reset") {
					swiper.emit(`slideResetTransition${step}`);
					return;
				}

				swiper.emit(`slideChangeTransition${step}`);

				if (dir === "next") {
					swiper.emit(`slideNextTransition${step}`);
				} else {
					swiper.emit(`slidePrevTransition${step}`);
				}
			}
		} // CONCATENATED MODULE: ./node_modules/swiper/core/transition/transitionStart.js
		function transitionStart_transitionStart(runCallbacks = true, direction) {
			const swiper = this;
			const { params } = swiper;
			if (params.cssMode) return;

			if (params.autoHeight) {
				swiper.updateAutoHeight();
			}

			transitionEmit({
				swiper,
				runCallbacks,
				direction,
				step: "Start",
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/core/transition/transitionEnd.js
		function transitionEnd_transitionEnd(runCallbacks = true, direction) {
			const swiper = this;
			const { params } = swiper;
			swiper.animating = false;
			if (params.cssMode) return;
			swiper.setTransition(0);
			transitionEmit({
				swiper,
				runCallbacks,
				direction,
				step: "End",
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/core/transition/index.js
		/* harmony default export */ const core_transition = {
			setTransition: setTransition,
			transitionStart: transitionStart_transitionStart,
			transitionEnd: transitionEnd_transitionEnd,
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slideTo.js
		function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
			if (typeof index !== "number" && typeof index !== "string") {
				throw new Error(
					`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`
				);
			}

			if (typeof index === "string") {
				/**
				 * The `index` argument converted from `string` to `number`.
				 * @type {number}
				 */
				const indexAsNumber = parseInt(index, 10);
				/**
				 * Determines whether the `index` argument is a valid `number`
				 * after being converted from the `string` type.
				 * @type {boolean}
				 */

				const isValidNumber = isFinite(indexAsNumber);

				if (!isValidNumber) {
					throw new Error(
						`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`
					);
				} // Knowing that the converted `index` is a valid number,
				// we can update the original argument's value.

				index = indexAsNumber;
			}

			const swiper = this;
			let slideIndex = index;
			if (slideIndex < 0) slideIndex = 0;
			const {
				params,
				snapGrid,
				slidesGrid,
				previousIndex,
				activeIndex,
				rtlTranslate: rtl,
				wrapperEl,
				enabled,
			} = swiper;

			if ((swiper.animating && params.preventInteractionOnTransition) || (!enabled && !internal && !initial)) {
				return false;
			}

			const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
			let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
			if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

			if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
				swiper.emit("beforeSlideChangeStart");
			}

			const translate = -snapGrid[snapIndex]; // Update progress

			swiper.updateProgress(translate); // Normalize slideIndex

			if (params.normalizeSlideIndex) {
				for (let i = 0; i < slidesGrid.length; i += 1) {
					const normalizedTranslate = -Math.floor(translate * 100);
					const normalizedGrid = Math.floor(slidesGrid[i] * 100);
					const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);

					if (typeof slidesGrid[i + 1] !== "undefined") {
						if (
							normalizedTranslate >= normalizedGrid &&
							normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2
						) {
							slideIndex = i;
						} else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
							slideIndex = i + 1;
						}
					} else if (normalizedTranslate >= normalizedGrid) {
						slideIndex = i;
					}
				}
			} // Directions locks

			if (swiper.initialized && slideIndex !== activeIndex) {
				if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
					return false;
				}

				if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
					if ((activeIndex || 0) !== slideIndex) return false;
				}
			}

			let direction;
			if (slideIndex > activeIndex) direction = "next";
			else if (slideIndex < activeIndex) direction = "prev";
			else direction = "reset"; // Update Index

			if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
				swiper.updateActiveIndex(slideIndex); // Update Height

				if (params.autoHeight) {
					swiper.updateAutoHeight();
				}

				swiper.updateSlidesClasses();

				if (params.effect !== "slide") {
					swiper.setTranslate(translate);
				}

				if (direction !== "reset") {
					swiper.transitionStart(runCallbacks, direction);
					swiper.transitionEnd(runCallbacks, direction);
				}

				return false;
			}

			if (params.cssMode) {
				const isH = swiper.isHorizontal();
				const t = rtl ? translate : -translate;

				if (speed === 0) {
					const isVirtual = swiper.virtual && swiper.params.virtual.enabled;

					if (isVirtual) {
						swiper.wrapperEl.style.scrollSnapType = "none";
						swiper._immediateVirtual = true;
					}

					wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;

					if (isVirtual) {
						requestAnimationFrame(() => {
							swiper.wrapperEl.style.scrollSnapType = "";
							swiper._swiperImmediateVirtual = false;
						});
					}
				} else {
					if (!swiper.support.smoothScroll) {
						animateCSSModeScroll({
							swiper,
							targetPosition: t,
							side: isH ? "left" : "top",
						});
						return true;
					}

					wrapperEl.scrollTo({
						[isH ? "left" : "top"]: t,
						behavior: "smooth",
					});
				}

				return true;
			}

			swiper.setTransition(speed);
			swiper.setTranslate(translate);
			swiper.updateActiveIndex(slideIndex);
			swiper.updateSlidesClasses();
			swiper.emit("beforeTransitionStart", speed, internal);
			swiper.transitionStart(runCallbacks, direction);

			if (speed === 0) {
				swiper.transitionEnd(runCallbacks, direction);
			} else if (!swiper.animating) {
				swiper.animating = true;

				if (!swiper.onSlideToWrapperTransitionEnd) {
					swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
						if (!swiper || swiper.destroyed) return;
						if (e.target !== this) return;
						swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
						swiper.$wrapperEl[0].removeEventListener(
							"webkitTransitionEnd",
							swiper.onSlideToWrapperTransitionEnd
						);
						swiper.onSlideToWrapperTransitionEnd = null;
						delete swiper.onSlideToWrapperTransitionEnd;
						swiper.transitionEnd(runCallbacks, direction);
					};
				}

				swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
				swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
			}

			return true;
		} // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slideToLoop.js
		function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
			const swiper = this;
			let newIndex = index;

			if (swiper.params.loop) {
				newIndex += swiper.loopedSlides;
			}

			return swiper.slideTo(newIndex, speed, runCallbacks, internal);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slideNext.js
		/* eslint no-unused-vars: "off" */
		function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
			const swiper = this;
			const { animating, enabled, params } = swiper;
			if (!enabled) return swiper;
			let perGroup = params.slidesPerGroup;

			if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
				perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
			}

			const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;

			if (params.loop) {
				if (animating && params.loopPreventsSlide) return false;
				swiper.loopFix(); // eslint-disable-next-line

				swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
			}

			if (params.rewind && swiper.isEnd) {
				return swiper.slideTo(0, speed, runCallbacks, internal);
			}

			return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slidePrev.js
		/* eslint no-unused-vars: "off" */
		function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
			const swiper = this;
			const { params, animating, snapGrid, slidesGrid, rtlTranslate, enabled } = swiper;
			if (!enabled) return swiper;

			if (params.loop) {
				if (animating && params.loopPreventsSlide) return false;
				swiper.loopFix(); // eslint-disable-next-line

				swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
			}

			const translate = rtlTranslate ? swiper.translate : -swiper.translate;

			function normalize(val) {
				if (val < 0) return -Math.floor(Math.abs(val));
				return Math.floor(val);
			}

			const normalizedTranslate = normalize(translate);
			const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
			let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];

			if (typeof prevSnap === "undefined" && params.cssMode) {
				let prevSnapIndex;
				snapGrid.forEach((snap, snapIndex) => {
					if (normalizedTranslate >= snap) {
						// prevSnap = snap;
						prevSnapIndex = snapIndex;
					}
				});

				if (typeof prevSnapIndex !== "undefined") {
					prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
				}
			}

			let prevIndex = 0;

			if (typeof prevSnap !== "undefined") {
				prevIndex = slidesGrid.indexOf(prevSnap);
				if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;

				if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
					prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
					prevIndex = Math.max(prevIndex, 0);
				}
			}

			if (params.rewind && swiper.isBeginning) {
				return swiper.slideTo(swiper.slides.length - 1, speed, runCallbacks, internal);
			}

			return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slideReset.js
		/* eslint no-unused-vars: "off" */
		function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
			const swiper = this;
			return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slideToClosest.js
		/* eslint no-unused-vars: "off" */
		function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = 0.5) {
			const swiper = this;
			let index = swiper.activeIndex;
			const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
			const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
			const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

			if (translate >= swiper.snapGrid[snapIndex]) {
				// The current translate is on or after the current snap index, so the choice
				// is between the current index and the one after it.
				const currentSnap = swiper.snapGrid[snapIndex];
				const nextSnap = swiper.snapGrid[snapIndex + 1];

				if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
					index += swiper.params.slidesPerGroup;
				}
			} else {
				// The current translate is before the current snap index, so the choice
				// is between the current index and the one before it.
				const prevSnap = swiper.snapGrid[snapIndex - 1];
				const currentSnap = swiper.snapGrid[snapIndex];

				if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
					index -= swiper.params.slidesPerGroup;
				}
			}

			index = Math.max(index, 0);
			index = Math.min(index, swiper.slidesGrid.length - 1);
			return swiper.slideTo(index, speed, runCallbacks, internal);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/slide/slideToClickedSlide.js
		function slideToClickedSlide() {
			const swiper = this;
			const { params, $wrapperEl } = swiper;
			const slidesPerView =
				params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
			let slideToIndex = swiper.clickedIndex;
			let realIndex;

			if (params.loop) {
				if (swiper.animating) return;
				realIndex = parseInt(dom(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);

				if (params.centeredSlides) {
					if (
						slideToIndex < swiper.loopedSlides - slidesPerView / 2 ||
						slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2
					) {
						swiper.loopFix();
						slideToIndex = $wrapperEl
							.children(
								`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`
							)
							.eq(0)
							.index();
						utils_nextTick(() => {
							swiper.slideTo(slideToIndex);
						});
					} else {
						swiper.slideTo(slideToIndex);
					}
				} else if (slideToIndex > swiper.slides.length - slidesPerView) {
					swiper.loopFix();
					slideToIndex = $wrapperEl
						.children(
							`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`
						)
						.eq(0)
						.index();
					utils_nextTick(() => {
						swiper.slideTo(slideToIndex);
					});
				} else {
					swiper.slideTo(slideToIndex);
				}
			} else {
				swiper.slideTo(slideToIndex);
			}
		} // CONCATENATED MODULE: ./node_modules/swiper/core/slide/index.js
		/* harmony default export */ const slide = {
			slideTo: slideTo,
			slideToLoop: slideToLoop,
			slideNext: slideNext,
			slidePrev: slidePrev,
			slideReset: slideReset,
			slideToClosest: slideToClosest,
			slideToClickedSlide: slideToClickedSlide,
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/loop/loopCreate.js
		function loopCreate() {
			const swiper = this;
			const document = ssr_window_esm_getDocument();
			const { params, $wrapperEl } = swiper; // Remove duplicated slides

			const $selector = $wrapperEl.children().length > 0 ? dom($wrapperEl.children()[0].parentNode) : $wrapperEl;
			$selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
			let slides = $selector.children(`.${params.slideClass}`);

			if (params.loopFillGroupWithBlank) {
				const blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);

				if (blankSlidesNum !== params.slidesPerGroup) {
					for (let i = 0; i < blankSlidesNum; i += 1) {
						const blankNode = dom(document.createElement("div")).addClass(
							`${params.slideClass} ${params.slideBlankClass}`
						);
						$selector.append(blankNode);
					}

					slides = $selector.children(`.${params.slideClass}`);
				}
			}

			if (params.slidesPerView === "auto" && !params.loopedSlides) params.loopedSlides = slides.length;
			swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
			swiper.loopedSlides += params.loopAdditionalSlides;

			if (swiper.loopedSlides > slides.length) {
				swiper.loopedSlides = slides.length;
			}

			const prependSlides = [];
			const appendSlides = [];
			slides.each((el, index) => {
				const slide = dom(el);

				if (index < swiper.loopedSlides) {
					appendSlides.push(el);
				}

				if (index < slides.length && index >= slides.length - swiper.loopedSlides) {
					prependSlides.push(el);
				}

				slide.attr("data-swiper-slide-index", index);
			});

			for (let i = 0; i < appendSlides.length; i += 1) {
				$selector.append(dom(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
			}

			for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
				$selector.prepend(dom(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
			}
		} // CONCATENATED MODULE: ./node_modules/swiper/core/loop/loopFix.js
		function loopFix() {
			const swiper = this;
			swiper.emit("beforeLoopFix");
			const {
				activeIndex,
				slides,
				loopedSlides,
				allowSlidePrev,
				allowSlideNext,
				snapGrid,
				rtlTranslate: rtl,
			} = swiper;
			let newIndex;
			swiper.allowSlidePrev = true;
			swiper.allowSlideNext = true;
			const snapTranslate = -snapGrid[activeIndex];
			const diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

			if (activeIndex < loopedSlides) {
				newIndex = slides.length - loopedSlides * 3 + activeIndex;
				newIndex += loopedSlides;
				const slideChanged = swiper.slideTo(newIndex, 0, false, true);

				if (slideChanged && diff !== 0) {
					swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
				}
			} else if (activeIndex >= slides.length - loopedSlides) {
				// Fix For Positive Oversliding
				newIndex = -slides.length + activeIndex + loopedSlides;
				newIndex += loopedSlides;
				const slideChanged = swiper.slideTo(newIndex, 0, false, true);

				if (slideChanged && diff !== 0) {
					swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
				}
			}

			swiper.allowSlidePrev = allowSlidePrev;
			swiper.allowSlideNext = allowSlideNext;
			swiper.emit("loopFix");
		} // CONCATENATED MODULE: ./node_modules/swiper/core/loop/loopDestroy.js
		function loopDestroy() {
			const swiper = this;
			const { $wrapperEl, params, slides } = swiper;
			$wrapperEl
				.children(
					`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`
				)
				.remove();
			slides.removeAttr("data-swiper-slide-index");
		} // CONCATENATED MODULE: ./node_modules/swiper/core/loop/index.js
		/* harmony default export */ const loop = {
			loopCreate: loopCreate,
			loopFix: loopFix,
			loopDestroy: loopDestroy,
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/grab-cursor/setGrabCursor.js
		function setGrabCursor(moving) {
			const swiper = this;
			if (
				swiper.support.touch ||
				!swiper.params.simulateTouch ||
				(swiper.params.watchOverflow && swiper.isLocked) ||
				swiper.params.cssMode
			)
				return;
			const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
			el.style.cursor = "move";
			el.style.cursor = moving ? "-webkit-grabbing" : "-webkit-grab";
			el.style.cursor = moving ? "-moz-grabbin" : "-moz-grab";
			el.style.cursor = moving ? "grabbing" : "grab";
		} // CONCATENATED MODULE: ./node_modules/swiper/core/grab-cursor/unsetGrabCursor.js
		function unsetGrabCursor() {
			const swiper = this;

			if (swiper.support.touch || (swiper.params.watchOverflow && swiper.isLocked) || swiper.params.cssMode) {
				return;
			}

			swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
		} // CONCATENATED MODULE: ./node_modules/swiper/core/grab-cursor/index.js
		/* harmony default export */ const grab_cursor = {
			setGrabCursor: setGrabCursor,
			unsetGrabCursor: unsetGrabCursor,
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/events/onTouchStart.js
		// Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd

		function closestElement(selector, base = this) {
			function __closestFrom(el) {
				if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
				if (el.assignedSlot) el = el.assignedSlot;
				const found = el.closest(selector);
				return found || __closestFrom(el.getRootNode().host);
			}

			return __closestFrom(base);
		}

		function onTouchStart(event) {
			const swiper = this;
			const document = ssr_window_esm_getDocument();
			const window = ssr_window_esm_getWindow();
			const data = swiper.touchEventsData;
			const { params, touches, enabled } = swiper;
			if (!enabled) return;

			if (swiper.animating && params.preventInteractionOnTransition) {
				return;
			}

			if (!swiper.animating && params.cssMode && params.loop) {
				swiper.loopFix();
			}

			let e = event;
			if (e.originalEvent) e = e.originalEvent;
			let $targetEl = dom(e.target);

			if (params.touchEventsTarget === "wrapper") {
				if (!$targetEl.closest(swiper.wrapperEl).length) return;
			}

			data.isTouchEvent = e.type === "touchstart";
			if (!data.isTouchEvent && "which" in e && e.which === 3) return;
			if (!data.isTouchEvent && "button" in e && e.button > 0) return;
			if (data.isTouched && data.isMoved) return; // change target el for shadow root component

			const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";

			if (swipingClassHasValue && e.target && e.target.shadowRoot && event.path && event.path[0]) {
				$targetEl = dom(event.path[0]);
			}

			const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
			const isTargetShadow = !!(e.target && e.target.shadowRoot); // use closestElement for shadow root element to get the actual closest for nested shadow root element

			if (
				params.noSwiping &&
				(isTargetShadow ? closestElement(noSwipingSelector, e.target) : $targetEl.closest(noSwipingSelector)[0])
			) {
				swiper.allowClick = true;
				return;
			}

			if (params.swipeHandler) {
				if (!$targetEl.closest(params.swipeHandler)[0]) return;
			}

			touches.currentX = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
			touches.currentY = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;
			const startX = touches.currentX;
			const startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

			const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
			const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

			if (
				edgeSwipeDetection &&
				(startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)
			) {
				if (edgeSwipeDetection === "prevent") {
					event.preventDefault();
				} else {
					return;
				}
			}

			Object.assign(data, {
				isTouched: true,
				isMoved: false,
				allowTouchCallbacks: true,
				isScrolling: undefined,
				startMoving: undefined,
			});
			touches.startX = startX;
			touches.startY = startY;
			data.touchStartTime = utils_now();
			swiper.allowClick = true;
			swiper.updateSize();
			swiper.swipeDirection = undefined;
			if (params.threshold > 0) data.allowThresholdMove = false;

			if (e.type !== "touchstart") {
				let preventDefault = true;
				if ($targetEl.is(data.focusableElements)) preventDefault = false;

				if (
					document.activeElement &&
					dom(document.activeElement).is(data.focusableElements) &&
					document.activeElement !== $targetEl[0]
				) {
					document.activeElement.blur();
				}

				const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

				if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
					e.preventDefault();
				}
			}

			swiper.emit("touchStart", e);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/events/onTouchMove.js
		function onTouchMove(event) {
			const document = ssr_window_esm_getDocument();
			const swiper = this;
			const data = swiper.touchEventsData;
			const { params, touches, rtlTranslate: rtl, enabled } = swiper;
			if (!enabled) return;
			let e = event;
			if (e.originalEvent) e = e.originalEvent;

			if (!data.isTouched) {
				if (data.startMoving && data.isScrolling) {
					swiper.emit("touchMoveOpposite", e);
				}

				return;
			}

			if (data.isTouchEvent && e.type !== "touchmove") return;
			const targetTouch =
				e.type === "touchmove" && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
			const pageX = e.type === "touchmove" ? targetTouch.pageX : e.pageX;
			const pageY = e.type === "touchmove" ? targetTouch.pageY : e.pageY;

			if (e.preventedByNestedSwiper) {
				touches.startX = pageX;
				touches.startY = pageY;
				return;
			}

			if (!swiper.allowTouchMove) {
				// isMoved = true;
				swiper.allowClick = false;

				if (data.isTouched) {
					Object.assign(touches, {
						startX: pageX,
						startY: pageY,
						currentX: pageX,
						currentY: pageY,
					});
					data.touchStartTime = utils_now();
				}

				return;
			}

			if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
				if (swiper.isVertical()) {
					// Vertical
					if (
						(pageY < touches.startY && swiper.translate <= swiper.maxTranslate()) ||
						(pageY > touches.startY && swiper.translate >= swiper.minTranslate())
					) {
						data.isTouched = false;
						data.isMoved = false;
						return;
					}
				} else if (
					(pageX < touches.startX && swiper.translate <= swiper.maxTranslate()) ||
					(pageX > touches.startX && swiper.translate >= swiper.minTranslate())
				) {
					return;
				}
			}

			if (data.isTouchEvent && document.activeElement) {
				if (e.target === document.activeElement && dom(e.target).is(data.focusableElements)) {
					data.isMoved = true;
					swiper.allowClick = false;
					return;
				}
			}

			if (data.allowTouchCallbacks) {
				swiper.emit("touchMove", e);
			}

			if (e.targetTouches && e.targetTouches.length > 1) return;
			touches.currentX = pageX;
			touches.currentY = pageY;
			const diffX = touches.currentX - touches.startX;
			const diffY = touches.currentY - touches.startY;
			if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;

			if (typeof data.isScrolling === "undefined") {
				let touchAngle;

				if (
					(swiper.isHorizontal() && touches.currentY === touches.startY) ||
					(swiper.isVertical() && touches.currentX === touches.startX)
				) {
					data.isScrolling = false;
				} else {
					// eslint-disable-next-line
					if (diffX * diffX + diffY * diffY >= 25) {
						touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
						data.isScrolling = swiper.isHorizontal()
							? touchAngle > params.touchAngle
							: 90 - touchAngle > params.touchAngle;
					}
				}
			}

			if (data.isScrolling) {
				swiper.emit("touchMoveOpposite", e);
			}

			if (typeof data.startMoving === "undefined") {
				if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
					data.startMoving = true;
				}
			}

			if (data.isScrolling) {
				data.isTouched = false;
				return;
			}

			if (!data.startMoving) {
				return;
			}

			swiper.allowClick = false;

			if (!params.cssMode && e.cancelable) {
				e.preventDefault();
			}

			if (params.touchMoveStopPropagation && !params.nested) {
				e.stopPropagation();
			}

			if (!data.isMoved) {
				if (params.loop && !params.cssMode) {
					swiper.loopFix();
				}

				data.startTranslate = swiper.getTranslate();
				swiper.setTransition(0);

				if (swiper.animating) {
					swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
				}

				data.allowMomentumBounce = false; // Grab Cursor

				if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
					swiper.setGrabCursor(true);
				}

				swiper.emit("sliderFirstMove", e);
			}

			swiper.emit("sliderMove", e);
			data.isMoved = true;
			let diff = swiper.isHorizontal() ? diffX : diffY;
			touches.diff = diff;
			diff *= params.touchRatio;
			if (rtl) diff = -diff;
			swiper.swipeDirection = diff > 0 ? "prev" : "next";
			data.currentTranslate = diff + data.startTranslate;
			let disableParentSwiper = true;
			let resistanceRatio = params.resistanceRatio;

			if (params.touchReleaseOnEdges) {
				resistanceRatio = 0;
			}

			if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
				disableParentSwiper = false;
				if (params.resistance)
					data.currentTranslate =
						swiper.minTranslate() -
						1 +
						(-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
			} else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
				disableParentSwiper = false;
				if (params.resistance)
					data.currentTranslate =
						swiper.maxTranslate() +
						1 -
						(swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
			}

			if (disableParentSwiper) {
				e.preventedByNestedSwiper = true;
			} // Directions locks

			if (
				!swiper.allowSlideNext &&
				swiper.swipeDirection === "next" &&
				data.currentTranslate < data.startTranslate
			) {
				data.currentTranslate = data.startTranslate;
			}

			if (
				!swiper.allowSlidePrev &&
				swiper.swipeDirection === "prev" &&
				data.currentTranslate > data.startTranslate
			) {
				data.currentTranslate = data.startTranslate;
			}

			if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
				data.currentTranslate = data.startTranslate;
			} // Threshold

			if (params.threshold > 0) {
				if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
					if (!data.allowThresholdMove) {
						data.allowThresholdMove = true;
						touches.startX = touches.currentX;
						touches.startY = touches.currentY;
						data.currentTranslate = data.startTranslate;
						touches.diff = swiper.isHorizontal()
							? touches.currentX - touches.startX
							: touches.currentY - touches.startY;
						return;
					}
				} else {
					data.currentTranslate = data.startTranslate;
					return;
				}
			}

			if (!params.followFinger || params.cssMode) return; // Update active index in free mode

			if ((params.freeMode && params.freeMode.enabled && swiper.freeMode) || params.watchSlidesProgress) {
				swiper.updateActiveIndex();
				swiper.updateSlidesClasses();
			}

			if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
				swiper.freeMode.onTouchMove();
			} // Update progress

			swiper.updateProgress(data.currentTranslate); // Update translate

			swiper.setTranslate(data.currentTranslate);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/events/onTouchEnd.js
		function onTouchEnd(event) {
			const swiper = this;
			const data = swiper.touchEventsData;
			const { params, touches, rtlTranslate: rtl, slidesGrid, enabled } = swiper;
			if (!enabled) return;
			let e = event;
			if (e.originalEvent) e = e.originalEvent;

			if (data.allowTouchCallbacks) {
				swiper.emit("touchEnd", e);
			}

			data.allowTouchCallbacks = false;

			if (!data.isTouched) {
				if (data.isMoved && params.grabCursor) {
					swiper.setGrabCursor(false);
				}

				data.isMoved = false;
				data.startMoving = false;
				return;
			} // Return Grab Cursor

			if (
				params.grabCursor &&
				data.isMoved &&
				data.isTouched &&
				(swiper.allowSlideNext === true || swiper.allowSlidePrev === true)
			) {
				swiper.setGrabCursor(false);
			} // Time diff

			const touchEndTime = utils_now();
			const timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

			if (swiper.allowClick) {
				const pathTree = e.path || (e.composedPath && e.composedPath());
				swiper.updateClickedSlide((pathTree && pathTree[0]) || e.target);
				swiper.emit("tap click", e);

				if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
					swiper.emit("doubleTap doubleClick", e);
				}
			}

			data.lastClickTime = utils_now();
			utils_nextTick(() => {
				if (!swiper.destroyed) swiper.allowClick = true;
			});

			if (
				!data.isTouched ||
				!data.isMoved ||
				!swiper.swipeDirection ||
				touches.diff === 0 ||
				data.currentTranslate === data.startTranslate
			) {
				data.isTouched = false;
				data.isMoved = false;
				data.startMoving = false;
				return;
			}

			data.isTouched = false;
			data.isMoved = false;
			data.startMoving = false;
			let currentPos;

			if (params.followFinger) {
				currentPos = rtl ? swiper.translate : -swiper.translate;
			} else {
				currentPos = -data.currentTranslate;
			}

			if (params.cssMode) {
				return;
			}

			if (swiper.params.freeMode && params.freeMode.enabled) {
				swiper.freeMode.onTouchEnd({
					currentPos,
				});
				return;
			} // Find current slide

			let stopIndex = 0;
			let groupSize = swiper.slidesSizesGrid[0];

			for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
				const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

				if (typeof slidesGrid[i + increment] !== "undefined") {
					if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
						stopIndex = i;
						groupSize = slidesGrid[i + increment] - slidesGrid[i];
					}
				} else if (currentPos >= slidesGrid[i]) {
					stopIndex = i;
					groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
				}
			} // Find current slide size

			const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
			const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

			if (timeDiff > params.longSwipesMs) {
				// Long touches
				if (!params.longSwipes) {
					swiper.slideTo(swiper.activeIndex);
					return;
				}

				if (swiper.swipeDirection === "next") {
					if (ratio >= params.longSwipesRatio) swiper.slideTo(stopIndex + increment);
					else swiper.slideTo(stopIndex);
				}

				if (swiper.swipeDirection === "prev") {
					if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment);
					else swiper.slideTo(stopIndex);
				}
			} else {
				// Short swipes
				if (!params.shortSwipes) {
					swiper.slideTo(swiper.activeIndex);
					return;
				}

				const isNavButtonTarget =
					swiper.navigation &&
					(e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);

				if (!isNavButtonTarget) {
					if (swiper.swipeDirection === "next") {
						swiper.slideTo(stopIndex + increment);
					}

					if (swiper.swipeDirection === "prev") {
						swiper.slideTo(stopIndex);
					}
				} else if (e.target === swiper.navigation.nextEl) {
					swiper.slideTo(stopIndex + increment);
				} else {
					swiper.slideTo(stopIndex);
				}
			}
		} // CONCATENATED MODULE: ./node_modules/swiper/core/events/onResize.js
		function onResize() {
			const swiper = this;
			const { params, el } = swiper;
			if (el && el.offsetWidth === 0) return; // Breakpoints

			if (params.breakpoints) {
				swiper.setBreakpoint();
			} // Save locks

			const { allowSlideNext, allowSlidePrev, snapGrid } = swiper; // Disable locks on resize

			swiper.allowSlideNext = true;
			swiper.allowSlidePrev = true;
			swiper.updateSize();
			swiper.updateSlides();
			swiper.updateSlidesClasses();

			if (
				(params.slidesPerView === "auto" || params.slidesPerView > 1) &&
				swiper.isEnd &&
				!swiper.isBeginning &&
				!swiper.params.centeredSlides
			) {
				swiper.slideTo(swiper.slides.length - 1, 0, false, true);
			} else {
				swiper.slideTo(swiper.activeIndex, 0, false, true);
			}

			if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
				swiper.autoplay.run();
			} // Return locks after resize

			swiper.allowSlidePrev = allowSlidePrev;
			swiper.allowSlideNext = allowSlideNext;

			if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
				swiper.checkOverflow();
			}
		} // CONCATENATED MODULE: ./node_modules/swiper/core/events/onClick.js
		function onClick(e) {
			const swiper = this;
			if (!swiper.enabled) return;

			if (!swiper.allowClick) {
				if (swiper.params.preventClicks) e.preventDefault();

				if (swiper.params.preventClicksPropagation && swiper.animating) {
					e.stopPropagation();
					e.stopImmediatePropagation();
				}
			}
		} // CONCATENATED MODULE: ./node_modules/swiper/core/events/onScroll.js
		function onScroll() {
			const swiper = this;
			const { wrapperEl, rtlTranslate, enabled } = swiper;
			if (!enabled) return;
			swiper.previousTranslate = swiper.translate;

			if (swiper.isHorizontal()) {
				swiper.translate = -wrapperEl.scrollLeft;
			} else {
				swiper.translate = -wrapperEl.scrollTop;
			} // eslint-disable-next-line

			if (swiper.translate === -0) swiper.translate = 0;
			swiper.updateActiveIndex();
			swiper.updateSlidesClasses();
			let newProgress;
			const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

			if (translatesDiff === 0) {
				newProgress = 0;
			} else {
				newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
			}

			if (newProgress !== swiper.progress) {
				swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
			}

			swiper.emit("setTranslate", swiper.translate, false);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/events/index.js
		let dummyEventAttached = false;

		function dummyEventListener() {}

		const events = (swiper, method) => {
			const document = ssr_window_esm_getDocument();
			const { params, touchEvents, el, wrapperEl, device, support } = swiper;
			const capture = !!params.nested;
			const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
			const swiperMethod = method; // Touch Events

			if (!support.touch) {
				el[domMethod](touchEvents.start, swiper.onTouchStart, false);
				document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
				document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
			} else {
				const passiveListener =
					touchEvents.start === "touchstart" && support.passiveListener && params.passiveListeners
						? {
								passive: true,
								capture: false,
						  }
						: false;
				el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
				el[domMethod](
					touchEvents.move,
					swiper.onTouchMove,
					support.passiveListener
						? {
								passive: false,
								capture,
						  }
						: capture
				);
				el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);

				if (touchEvents.cancel) {
					el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
				}
			} // Prevent Links Clicks

			if (params.preventClicks || params.preventClicksPropagation) {
				el[domMethod]("click", swiper.onClick, true);
			}

			if (params.cssMode) {
				wrapperEl[domMethod]("scroll", swiper.onScroll);
			} // Resize handler

			if (params.updateOnWindowResize) {
				swiper[swiperMethod](
					device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate",
					onResize,
					true
				);
			} else {
				swiper[swiperMethod]("observerUpdate", onResize, true);
			}
		};

		function attachEvents() {
			const swiper = this;
			const document = ssr_window_esm_getDocument();
			const { params, support } = swiper;
			swiper.onTouchStart = onTouchStart.bind(swiper);
			swiper.onTouchMove = onTouchMove.bind(swiper);
			swiper.onTouchEnd = onTouchEnd.bind(swiper);

			if (params.cssMode) {
				swiper.onScroll = onScroll.bind(swiper);
			}

			swiper.onClick = onClick.bind(swiper);

			if (support.touch && !dummyEventAttached) {
				document.addEventListener("touchstart", dummyEventListener);
				dummyEventAttached = true;
			}

			events(swiper, "on");
		}

		function detachEvents() {
			const swiper = this;
			events(swiper, "off");
		}

		/* harmony default export */ const core_events = {
			attachEvents,
			detachEvents,
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/breakpoints/setBreakpoint.js
		const isGridEnabled = (swiper, params) => {
			return swiper.grid && params.grid && params.grid.rows > 1;
		};

		function setBreakpoint() {
			const swiper = this;
			const { activeIndex, initialized, loopedSlides = 0, params, $el } = swiper;
			const breakpoints = params.breakpoints;
			if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) return; // Get breakpoint for window width and update parameters

			const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
			if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
			const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
			const breakpointParams = breakpointOnlyParams || swiper.originalParams;
			const wasMultiRow = isGridEnabled(swiper, params);
			const isMultiRow = isGridEnabled(swiper, breakpointParams);
			const wasEnabled = params.enabled;

			if (wasMultiRow && !isMultiRow) {
				$el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
				swiper.emitContainerClasses();
			} else if (!wasMultiRow && isMultiRow) {
				$el.addClass(`${params.containerModifierClass}grid`);

				if (
					(breakpointParams.grid.fill && breakpointParams.grid.fill === "column") ||
					(!breakpointParams.grid.fill && params.grid.fill === "column")
				) {
					$el.addClass(`${params.containerModifierClass}grid-column`);
				}

				swiper.emitContainerClasses();
			}

			const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
			const needsReLoop =
				params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

			if (directionChanged && initialized) {
				swiper.changeDirection();
			}

			utils_extend(swiper.params, breakpointParams);
			const isEnabled = swiper.params.enabled;
			Object.assign(swiper, {
				allowTouchMove: swiper.params.allowTouchMove,
				allowSlideNext: swiper.params.allowSlideNext,
				allowSlidePrev: swiper.params.allowSlidePrev,
			});

			if (wasEnabled && !isEnabled) {
				swiper.disable();
			} else if (!wasEnabled && isEnabled) {
				swiper.enable();
			}

			swiper.currentBreakpoint = breakpoint;
			swiper.emit("_beforeBreakpoint", breakpointParams);

			if (needsReLoop && initialized) {
				swiper.loopDestroy();
				swiper.loopCreate();
				swiper.updateSlides();
				swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
			}

			swiper.emit("breakpoint", breakpointParams);
		} // CONCATENATED MODULE: ./node_modules/swiper/core/breakpoints/getBreakpoint.js
		function getBreakpoint(breakpoints, base = "window", containerEl) {
			if (!breakpoints || (base === "container" && !containerEl)) return undefined;
			let breakpoint = false;
			const window = ssr_window_esm_getWindow();
			const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
			const points = Object.keys(breakpoints).map((point) => {
				if (typeof point === "string" && point.indexOf("@") === 0) {
					const minRatio = parseFloat(point.substr(1));
					const value = currentHeight * minRatio;
					return {
						value,
						point,
					};
				}

				return {
					value: point,
					point,
				};
			});
			points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));

			for (let i = 0; i < points.length; i += 1) {
				const { point, value } = points[i];

				if (base === "window") {
					if (window.matchMedia(`(min-width: ${value}px)`).matches) {
						breakpoint = point;
					}
				} else if (value <= containerEl.clientWidth) {
					breakpoint = point;
				}
			}

			return breakpoint || "max";
		} // CONCATENATED MODULE: ./node_modules/swiper/core/breakpoints/index.js
		/* harmony default export */ const breakpoints = {
			setBreakpoint: setBreakpoint,
			getBreakpoint: getBreakpoint,
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/classes/addClasses.js
		function prepareClasses(entries, prefix) {
			const resultClasses = [];
			entries.forEach((item) => {
				if (typeof item === "object") {
					Object.keys(item).forEach((classNames) => {
						if (item[classNames]) {
							resultClasses.push(prefix + classNames);
						}
					});
				} else if (typeof item === "string") {
					resultClasses.push(prefix + item);
				}
			});
			return resultClasses;
		}

		function addClasses() {
			const swiper = this;
			const {
    classNames,
    params,
    rtl,
    $el,
    device,
    support
  } = swiper; // prettier-ignore

			const suffixes = prepareClasses(
				[
					"initialized",
					params.direction,
					{
						"pointer-events": !support.touch,
					},
					{
						"free-mode": swiper.params.freeMode && params.freeMode.enabled,
					},
					{
						autoheight: params.autoHeight,
					},
					{
						rtl: rtl,
					},
					{
						grid: params.grid && params.grid.rows > 1,
					},
					{
						"grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column",
					},
					{
						android: device.android,
					},
					{
						ios: device.ios,
					},
					{
						"css-mode": params.cssMode,
					},
					{
						centered: params.cssMode && params.centeredSlides,
					},
				],
				params.containerModifierClass
			);
			classNames.push(...suffixes);
			$el.addClass([...classNames].join(" "));
			swiper.emitContainerClasses();
		} // CONCATENATED MODULE: ./node_modules/swiper/core/classes/removeClasses.js
		function removeClasses() {
			const swiper = this;
			const { $el, classNames } = swiper;
			$el.removeClass(classNames.join(" "));
			swiper.emitContainerClasses();
		} // CONCATENATED MODULE: ./node_modules/swiper/core/classes/index.js
		/* harmony default export */ const classes = {
			addClasses: addClasses,
			removeClasses: removeClasses,
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/images/loadImage.js
		function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
			const window = ssr_window_esm_getWindow();
			let image;

			function onReady() {
				if (callback) callback();
			}

			const isPicture = dom(imageEl).parent("picture")[0];

			if (!isPicture && (!imageEl.complete || !checkForComplete)) {
				if (src) {
					image = new window.Image();
					image.onload = onReady;
					image.onerror = onReady;

					if (sizes) {
						image.sizes = sizes;
					}

					if (srcset) {
						image.srcset = srcset;
					}

					if (src) {
						image.src = src;
					}
				} else {
					onReady();
				}
			} else {
				// image already loaded...
				onReady();
			}
		} // CONCATENATED MODULE: ./node_modules/swiper/core/images/preloadImages.js
		function preloadImages() {
			const swiper = this;
			swiper.imagesToLoad = swiper.$el.find("img");

			function onReady() {
				if (typeof swiper === "undefined" || swiper === null || !swiper || swiper.destroyed) return;
				if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;

				if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
					if (swiper.params.updateOnImagesReady) swiper.update();
					swiper.emit("imagesReady");
				}
			}

			for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
				const imageEl = swiper.imagesToLoad[i];
				swiper.loadImage(
					imageEl,
					imageEl.currentSrc || imageEl.getAttribute("src"),
					imageEl.srcset || imageEl.getAttribute("srcset"),
					imageEl.sizes || imageEl.getAttribute("sizes"),
					true,
					onReady
				);
			}
		} // CONCATENATED MODULE: ./node_modules/swiper/core/images/index.js
		/* harmony default export */ const core_images = {
			loadImage: loadImage,
			preloadImages: preloadImages,
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/check-overflow/index.js
		function checkOverflow() {
			const swiper = this;
			const { isLocked: wasLocked, params } = swiper;
			const { slidesOffsetBefore } = params;

			if (slidesOffsetBefore) {
				const lastSlideIndex = swiper.slides.length - 1;
				const lastSlideRightEdge =
					swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
				swiper.isLocked = swiper.size > lastSlideRightEdge;
			} else {
				swiper.isLocked = swiper.snapGrid.length === 1;
			}

			if (params.allowSlideNext === true) {
				swiper.allowSlideNext = !swiper.isLocked;
			}

			if (params.allowSlidePrev === true) {
				swiper.allowSlidePrev = !swiper.isLocked;
			}

			if (wasLocked && wasLocked !== swiper.isLocked) {
				swiper.isEnd = false;
			}

			if (wasLocked !== swiper.isLocked) {
				swiper.emit(swiper.isLocked ? "lock" : "unlock");
			}
		}

		/* harmony default export */ const check_overflow = {
			checkOverflow,
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/defaults.js
		/* harmony default export */ const core_defaults = {
			init: true,
			direction: "horizontal",
			touchEventsTarget: "wrapper",
			initialSlide: 0,
			speed: 300,
			cssMode: false,
			updateOnWindowResize: true,
			resizeObserver: true,
			nested: false,
			createElements: false,
			enabled: true,
			focusableElements: "input, select, option, textarea, button, video, label",
			// Overrides
			width: null,
			height: null,
			//
			preventInteractionOnTransition: false,
			// ssr
			userAgent: null,
			url: null,
			// To support iOS's swipe-to-go-back gesture (when being used in-app).
			edgeSwipeDetection: false,
			edgeSwipeThreshold: 20,
			// Autoheight
			autoHeight: false,
			// Set wrapper width
			setWrapperSize: false,
			// Virtual Translate
			virtualTranslate: false,
			// Effects
			effect: "slide",
			// 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
			// Breakpoints
			breakpoints: undefined,
			breakpointsBase: "window",
			// Slides grid
			spaceBetween: 0,
			slidesPerView: 1,
			slidesPerGroup: 1,
			slidesPerGroupSkip: 0,
			slidesPerGroupAuto: false,
			centeredSlides: false,
			centeredSlidesBounds: false,
			slidesOffsetBefore: 0,
			// in px
			slidesOffsetAfter: 0,
			// in px
			normalizeSlideIndex: true,
			centerInsufficientSlides: false,
			// Disable swiper and hide navigation when container not overflow
			watchOverflow: true,
			// Round length
			roundLengths: false,
			// Touches
			touchRatio: 1,
			touchAngle: 45,
			simulateTouch: true,
			shortSwipes: true,
			longSwipes: true,
			longSwipesRatio: 0.5,
			longSwipesMs: 300,
			followFinger: true,
			allowTouchMove: true,
			threshold: 0,
			touchMoveStopPropagation: false,
			touchStartPreventDefault: true,
			touchStartForcePreventDefault: false,
			touchReleaseOnEdges: false,
			// Unique Navigation Elements
			uniqueNavElements: true,
			// Resistance
			resistance: true,
			resistanceRatio: 0.85,
			// Progress
			watchSlidesProgress: false,
			// Cursor
			grabCursor: false,
			// Clicks
			preventClicks: true,
			preventClicksPropagation: true,
			slideToClickedSlide: false,
			// Images
			preloadImages: true,
			updateOnImagesReady: true,
			// loop
			loop: false,
			loopAdditionalSlides: 0,
			loopedSlides: null,
			loopFillGroupWithBlank: false,
			loopPreventsSlide: true,
			// rewind
			rewind: false,
			// Swiping/no swiping
			allowSlidePrev: true,
			allowSlideNext: true,
			swipeHandler: null,
			// '.swipe-handler',
			noSwiping: true,
			noSwipingClass: "swiper-no-swiping",
			noSwipingSelector: null,
			// Passive Listeners
			passiveListeners: true,
			// NS
			containerModifierClass: "swiper-",
			// NEW
			slideClass: "swiper-slide",
			slideBlankClass: "swiper-slide-invisible-blank",
			slideActiveClass: "swiper-slide-active",
			slideDuplicateActiveClass: "swiper-slide-duplicate-active",
			slideVisibleClass: "swiper-slide-visible",
			slideDuplicateClass: "swiper-slide-duplicate",
			slideNextClass: "swiper-slide-next",
			slideDuplicateNextClass: "swiper-slide-duplicate-next",
			slidePrevClass: "swiper-slide-prev",
			slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
			wrapperClass: "swiper-wrapper",
			// Callbacks
			runCallbacksOnInit: true,
			// Internals
			_emitClasses: false,
		}; // CONCATENATED MODULE: ./node_modules/swiper/core/moduleExtendParams.js
		function moduleExtendParams(params, allModulesParams) {
			return function extendParams(obj = {}) {
				const moduleParamName = Object.keys(obj)[0];
				const moduleParams = obj[moduleParamName];

				if (typeof moduleParams !== "object" || moduleParams === null) {
					utils_extend(allModulesParams, obj);
					return;
				}

				if (
					["navigation", "pagination", "scrollbar"].indexOf(moduleParamName) >= 0 &&
					params[moduleParamName] === true
				) {
					params[moduleParamName] = {
						auto: true,
					};
				}

				if (!(moduleParamName in params && "enabled" in moduleParams)) {
					utils_extend(allModulesParams, obj);
					return;
				}

				if (params[moduleParamName] === true) {
					params[moduleParamName] = {
						enabled: true,
					};
				}

				if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
					params[moduleParamName].enabled = true;
				}

				if (!params[moduleParamName])
					params[moduleParamName] = {
						enabled: false,
					};
				utils_extend(allModulesParams, obj);
			};
		} // CONCATENATED MODULE: ./node_modules/swiper/core/core.js
		/* eslint no-param-reassign: "off" */

		const prototypes = {
			eventsEmitter: events_emitter,
			update: update,
			translate: translate,
			transition: core_transition,
			slide: slide,
			loop: loop,
			grabCursor: grab_cursor,
			events: core_events,
			breakpoints: breakpoints,
			checkOverflow: check_overflow,
			classes: classes,
			images: core_images,
		};
		const extendedDefaults = {};

		class Swiper {
			constructor(...args) {
				let el;
				let params;

				if (
					args.length === 1 &&
					args[0].constructor &&
					Object.prototype.toString.call(args[0]).slice(8, -1) === "Object"
				) {
					params = args[0];
				} else {
					[el, params] = args;
				}

				if (!params) params = {};
				params = utils_extend({}, params);
				if (el && !params.el) params.el = el;

				if (params.el && dom(params.el).length > 1) {
					const swipers = [];
					dom(params.el).each((containerEl) => {
						const newParams = utils_extend({}, params, {
							el: containerEl,
						});
						swipers.push(new Swiper(newParams));
					});
					return swipers;
				} // Swiper Instance

				const swiper = this;
				swiper.__swiper__ = true;
				swiper.support = getSupport();
				swiper.device = getDevice({
					userAgent: params.userAgent,
				});
				swiper.browser = getBrowser();
				swiper.eventsListeners = {};
				swiper.eventsAnyListeners = [];
				swiper.modules = [...swiper.__modules__];

				if (params.modules && Array.isArray(params.modules)) {
					swiper.modules.push(...params.modules);
				}

				const allModulesParams = {};
				swiper.modules.forEach((mod) => {
					mod({
						swiper,
						extendParams: moduleExtendParams(params, allModulesParams),
						on: swiper.on.bind(swiper),
						once: swiper.once.bind(swiper),
						off: swiper.off.bind(swiper),
						emit: swiper.emit.bind(swiper),
					});
				}); // Extend defaults with modules params

				const swiperParams = utils_extend({}, core_defaults, allModulesParams); // Extend defaults with passed params

				swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
				swiper.originalParams = utils_extend({}, swiper.params);
				swiper.passedParams = utils_extend({}, params); // add event listeners

				if (swiper.params && swiper.params.on) {
					Object.keys(swiper.params.on).forEach((eventName) => {
						swiper.on(eventName, swiper.params.on[eventName]);
					});
				}

				if (swiper.params && swiper.params.onAny) {
					swiper.onAny(swiper.params.onAny);
				} // Save Dom lib

				swiper.$ = dom; // Extend Swiper

				Object.assign(swiper, {
					enabled: swiper.params.enabled,
					el,
					// Classes
					classNames: [],
					// Slides
					slides: dom(),
					slidesGrid: [],
					snapGrid: [],
					slidesSizesGrid: [],

					// isDirection
					isHorizontal() {
						return swiper.params.direction === "horizontal";
					},

					isVertical() {
						return swiper.params.direction === "vertical";
					},

					// Indexes
					activeIndex: 0,
					realIndex: 0,
					//
					isBeginning: true,
					isEnd: false,
					// Props
					translate: 0,
					previousTranslate: 0,
					progress: 0,
					velocity: 0,
					animating: false,
					// Locks
					allowSlideNext: swiper.params.allowSlideNext,
					allowSlidePrev: swiper.params.allowSlidePrev,
					// Touch Events
					touchEvents: (function touchEvents() {
						const touch = ["touchstart", "touchmove", "touchend", "touchcancel"];
						const desktop = ["pointerdown", "pointermove", "pointerup"];
						swiper.touchEventsTouch = {
							start: touch[0],
							move: touch[1],
							end: touch[2],
							cancel: touch[3],
						};
						swiper.touchEventsDesktop = {
							start: desktop[0],
							move: desktop[1],
							end: desktop[2],
						};
						return swiper.support.touch || !swiper.params.simulateTouch
							? swiper.touchEventsTouch
							: swiper.touchEventsDesktop;
					})(),
					touchEventsData: {
						isTouched: undefined,
						isMoved: undefined,
						allowTouchCallbacks: undefined,
						touchStartTime: undefined,
						isScrolling: undefined,
						currentTranslate: undefined,
						startTranslate: undefined,
						allowThresholdMove: undefined,
						// Form elements to match
						focusableElements: swiper.params.focusableElements,
						// Last click time
						lastClickTime: utils_now(),
						clickTimeout: undefined,
						// Velocities
						velocities: [],
						allowMomentumBounce: undefined,
						isTouchEvent: undefined,
						startMoving: undefined,
					},
					// Clicks
					allowClick: true,
					// Touches
					allowTouchMove: swiper.params.allowTouchMove,
					touches: {
						startX: 0,
						startY: 0,
						currentX: 0,
						currentY: 0,
						diff: 0,
					},
					// Images
					imagesToLoad: [],
					imagesLoaded: 0,
				});
				swiper.emit("_swiper"); // Init

				if (swiper.params.init) {
					swiper.init();
				} // Return app instance

				return swiper;
			}

			enable() {
				const swiper = this;
				if (swiper.enabled) return;
				swiper.enabled = true;

				if (swiper.params.grabCursor) {
					swiper.setGrabCursor();
				}

				swiper.emit("enable");
			}

			disable() {
				const swiper = this;
				if (!swiper.enabled) return;
				swiper.enabled = false;

				if (swiper.params.grabCursor) {
					swiper.unsetGrabCursor();
				}

				swiper.emit("disable");
			}

			setProgress(progress, speed) {
				const swiper = this;
				progress = Math.min(Math.max(progress, 0), 1);
				const min = swiper.minTranslate();
				const max = swiper.maxTranslate();
				const current = (max - min) * progress + min;
				swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
				swiper.updateActiveIndex();
				swiper.updateSlidesClasses();
			}

			emitContainerClasses() {
				const swiper = this;
				if (!swiper.params._emitClasses || !swiper.el) return;
				const cls = swiper.el.className.split(" ").filter((className) => {
					return (
						className.indexOf("swiper") === 0 ||
						className.indexOf(swiper.params.containerModifierClass) === 0
					);
				});
				swiper.emit("_containerClasses", cls.join(" "));
			}

			getSlideClasses(slideEl) {
				const swiper = this;
				return slideEl.className
					.split(" ")
					.filter((className) => {
						return (
							className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0
						);
					})
					.join(" ");
			}

			emitSlidesClasses() {
				const swiper = this;
				if (!swiper.params._emitClasses || !swiper.el) return;
				const updates = [];
				swiper.slides.each((slideEl) => {
					const classNames = swiper.getSlideClasses(slideEl);
					updates.push({
						slideEl,
						classNames,
					});
					swiper.emit("_slideClass", slideEl, classNames);
				});
				swiper.emit("_slideClasses", updates);
			}

			slidesPerViewDynamic(view = "current", exact = false) {
				const swiper = this;
				const { params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex } = swiper;
				let spv = 1;

				if (params.centeredSlides) {
					let slideSize = slides[activeIndex].swiperSlideSize;
					let breakLoop;

					for (let i = activeIndex + 1; i < slides.length; i += 1) {
						if (slides[i] && !breakLoop) {
							slideSize += slides[i].swiperSlideSize;
							spv += 1;
							if (slideSize > swiperSize) breakLoop = true;
						}
					}

					for (let i = activeIndex - 1; i >= 0; i -= 1) {
						if (slides[i] && !breakLoop) {
							slideSize += slides[i].swiperSlideSize;
							spv += 1;
							if (slideSize > swiperSize) breakLoop = true;
						}
					}
				} else {
					// eslint-disable-next-line
					if (view === "current") {
						for (let i = activeIndex + 1; i < slides.length; i += 1) {
							const slideInView = exact
								? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize
								: slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;

							if (slideInView) {
								spv += 1;
							}
						}
					} else {
						// previous
						for (let i = activeIndex - 1; i >= 0; i -= 1) {
							const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;

							if (slideInView) {
								spv += 1;
							}
						}
					}
				}

				return spv;
			}

			update() {
				const swiper = this;
				if (!swiper || swiper.destroyed) return;
				const { snapGrid, params } = swiper; // Breakpoints

				if (params.breakpoints) {
					swiper.setBreakpoint();
				}

				swiper.updateSize();
				swiper.updateSlides();
				swiper.updateProgress();
				swiper.updateSlidesClasses();

				function setTranslate() {
					const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
					const newTranslate = Math.min(
						Math.max(translateValue, swiper.maxTranslate()),
						swiper.minTranslate()
					);
					swiper.setTranslate(newTranslate);
					swiper.updateActiveIndex();
					swiper.updateSlidesClasses();
				}

				let translated;

				if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
					setTranslate();

					if (swiper.params.autoHeight) {
						swiper.updateAutoHeight();
					}
				} else {
					if (
						(swiper.params.slidesPerView === "auto" || swiper.params.slidesPerView > 1) &&
						swiper.isEnd &&
						!swiper.params.centeredSlides
					) {
						translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
					} else {
						translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
					}

					if (!translated) {
						setTranslate();
					}
				}

				if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
					swiper.checkOverflow();
				}

				swiper.emit("update");
			}

			changeDirection(newDirection, needUpdate = true) {
				const swiper = this;
				const currentDirection = swiper.params.direction;

				if (!newDirection) {
					// eslint-disable-next-line
					newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
				}

				if (
					newDirection === currentDirection ||
					(newDirection !== "horizontal" && newDirection !== "vertical")
				) {
					return swiper;
				}

				swiper.$el
					.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`)
					.addClass(`${swiper.params.containerModifierClass}${newDirection}`);
				swiper.emitContainerClasses();
				swiper.params.direction = newDirection;
				swiper.slides.each((slideEl) => {
					if (newDirection === "vertical") {
						slideEl.style.width = "";
					} else {
						slideEl.style.height = "";
					}
				});
				swiper.emit("changeDirection");
				if (needUpdate) swiper.update();
				return swiper;
			}

			mount(el) {
				const swiper = this;
				if (swiper.mounted) return true; // Find el

				const $el = dom(el || swiper.params.el);
				el = $el[0];

				if (!el) {
					return false;
				}

				el.swiper = swiper;

				const getWrapperSelector = () => {
					return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
				};

				const getWrapper = () => {
					if (el && el.shadowRoot && el.shadowRoot.querySelector) {
						const res = dom(el.shadowRoot.querySelector(getWrapperSelector())); // Children needs to return slot items

						res.children = (options) => $el.children(options);

						return res;
					}

					return $el.children(getWrapperSelector());
				}; // Find Wrapper

				let $wrapperEl = getWrapper();

				if ($wrapperEl.length === 0 && swiper.params.createElements) {
					const document = ssr_window_esm_getDocument();
					const wrapper = document.createElement("div");
					$wrapperEl = dom(wrapper);
					wrapper.className = swiper.params.wrapperClass;
					$el.append(wrapper);
					$el.children(`.${swiper.params.slideClass}`).each((slideEl) => {
						$wrapperEl.append(slideEl);
					});
				}

				Object.assign(swiper, {
					$el,
					el,
					$wrapperEl,
					wrapperEl: $wrapperEl[0],
					mounted: true,
					// RTL
					rtl: el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl",
					rtlTranslate:
						swiper.params.direction === "horizontal" &&
						(el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl"),
					wrongRTL: $wrapperEl.css("display") === "-webkit-box",
				});
				return true;
			}

			init(el) {
				const swiper = this;
				if (swiper.initialized) return swiper;
				const mounted = swiper.mount(el);
				if (mounted === false) return swiper;
				swiper.emit("beforeInit"); // Set breakpoint

				if (swiper.params.breakpoints) {
					swiper.setBreakpoint();
				} // Add Classes

				swiper.addClasses(); // Create loop

				if (swiper.params.loop) {
					swiper.loopCreate();
				} // Update size

				swiper.updateSize(); // Update slides

				swiper.updateSlides();

				if (swiper.params.watchOverflow) {
					swiper.checkOverflow();
				} // Set Grab Cursor

				if (swiper.params.grabCursor && swiper.enabled) {
					swiper.setGrabCursor();
				}

				if (swiper.params.preloadImages) {
					swiper.preloadImages();
				} // Slide To Initial Slide

				if (swiper.params.loop) {
					swiper.slideTo(
						swiper.params.initialSlide + swiper.loopedSlides,
						0,
						swiper.params.runCallbacksOnInit,
						false,
						true
					);
				} else {
					swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
				} // Attach events

				swiper.attachEvents(); // Init Flag

				swiper.initialized = true; // Emit

				swiper.emit("init");
				swiper.emit("afterInit");
				return swiper;
			}

			destroy(deleteInstance = true, cleanStyles = true) {
				const swiper = this;
				const { params, $el, $wrapperEl, slides } = swiper;

				if (typeof swiper.params === "undefined" || swiper.destroyed) {
					return null;
				}

				swiper.emit("beforeDestroy"); // Init Flag

				swiper.initialized = false; // Detach events

				swiper.detachEvents(); // Destroy loop

				if (params.loop) {
					swiper.loopDestroy();
				} // Cleanup styles

				if (cleanStyles) {
					swiper.removeClasses();
					$el.removeAttr("style");
					$wrapperEl.removeAttr("style");

					if (slides && slides.length) {
						slides
							.removeClass(
								[
									params.slideVisibleClass,
									params.slideActiveClass,
									params.slideNextClass,
									params.slidePrevClass,
								].join(" ")
							)
							.removeAttr("style")
							.removeAttr("data-swiper-slide-index");
					}
				}

				swiper.emit("destroy"); // Detach emitter events

				Object.keys(swiper.eventsListeners).forEach((eventName) => {
					swiper.off(eventName);
				});

				if (deleteInstance !== false) {
					swiper.$el[0].swiper = null;
					deleteProps(swiper);
				}

				swiper.destroyed = true;
				return null;
			}

			static extendDefaults(newDefaults) {
				utils_extend(extendedDefaults, newDefaults);
			}

			static get extendedDefaults() {
				return extendedDefaults;
			}

			static get defaults() {
				return core_defaults;
			}

			static installModule(mod) {
				if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
				const modules = Swiper.prototype.__modules__;

				if (typeof mod === "function" && modules.indexOf(mod) < 0) {
					modules.push(mod);
				}
			}

			static use(module) {
				if (Array.isArray(module)) {
					module.forEach((m) => Swiper.installModule(m));
					return Swiper;
				}

				Swiper.installModule(module);
				return Swiper;
			}
		}

		Object.keys(prototypes).forEach((prototypeGroup) => {
			Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
				Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
			});
		});
		Swiper.use([Resize, Observer]);
		/* harmony default export */ const core = Swiper; // CONCATENATED MODULE: ./node_modules/swiper/modules/virtual/virtual.js
		function Virtual({ swiper, extendParams, on }) {
			extendParams({
				virtual: {
					enabled: false,
					slides: [],
					cache: true,
					renderSlide: null,
					renderExternal: null,
					renderExternalUpdate: true,
					addSlidesBefore: 0,
					addSlidesAfter: 0,
				},
			});
			let cssModeTimeout;
			swiper.virtual = {
				cache: {},
				from: undefined,
				to: undefined,
				slides: [],
				offset: 0,
				slidesGrid: [],
			};

			function renderSlide(slide, index) {
				const params = swiper.params.virtual;

				if (params.cache && swiper.virtual.cache[index]) {
					return swiper.virtual.cache[index];
				}

				const $slideEl = params.renderSlide
					? $(params.renderSlide.call(swiper, slide, index))
					: $(`<div class="${swiper.params.slideClass}" data-swiper-slide-index="${index}">${slide}</div>`);
				if (!$slideEl.attr("data-swiper-slide-index")) $slideEl.attr("data-swiper-slide-index", index);
				if (params.cache) swiper.virtual.cache[index] = $slideEl;
				return $slideEl;
			}

			function update(force) {
				const { slidesPerView, slidesPerGroup, centeredSlides } = swiper.params;
				const { addSlidesBefore, addSlidesAfter } = swiper.params.virtual;
				const {
					from: previousFrom,
					to: previousTo,
					slides,
					slidesGrid: previousSlidesGrid,
					offset: previousOffset,
				} = swiper.virtual;

				if (!swiper.params.cssMode) {
					swiper.updateActiveIndex();
				}

				const activeIndex = swiper.activeIndex || 0;
				let offsetProp;
				if (swiper.rtlTranslate) offsetProp = "right";
				else offsetProp = swiper.isHorizontal() ? "left" : "top";
				let slidesAfter;
				let slidesBefore;

				if (centeredSlides) {
					slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
					slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
				} else {
					slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
					slidesBefore = slidesPerGroup + addSlidesBefore;
				}

				const from = Math.max((activeIndex || 0) - slidesBefore, 0);
				const to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
				const offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
				Object.assign(swiper.virtual, {
					from,
					to,
					offset,
					slidesGrid: swiper.slidesGrid,
				});

				function onRendered() {
					swiper.updateSlides();
					swiper.updateProgress();
					swiper.updateSlidesClasses();

					if (swiper.lazy && swiper.params.lazy.enabled) {
						swiper.lazy.load();
					}
				}

				if (previousFrom === from && previousTo === to && !force) {
					if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
						swiper.slides.css(offsetProp, `${offset}px`);
					}

					swiper.updateProgress();
					return;
				}

				if (swiper.params.virtual.renderExternal) {
					swiper.params.virtual.renderExternal.call(swiper, {
						offset,
						from,
						to,
						slides: (function getSlides() {
							const slidesToRender = [];

							for (let i = from; i <= to; i += 1) {
								slidesToRender.push(slides[i]);
							}

							return slidesToRender;
						})(),
					});

					if (swiper.params.virtual.renderExternalUpdate) {
						onRendered();
					}

					return;
				}

				const prependIndexes = [];
				const appendIndexes = [];

				if (force) {
					swiper.$wrapperEl.find(`.${swiper.params.slideClass}`).remove();
				} else {
					for (let i = previousFrom; i <= previousTo; i += 1) {
						if (i < from || i > to) {
							swiper.$wrapperEl
								.find(`.${swiper.params.slideClass}[data-swiper-slide-index="${i}"]`)
								.remove();
						}
					}
				}

				for (let i = 0; i < slides.length; i += 1) {
					if (i >= from && i <= to) {
						if (typeof previousTo === "undefined" || force) {
							appendIndexes.push(i);
						} else {
							if (i > previousTo) appendIndexes.push(i);
							if (i < previousFrom) prependIndexes.push(i);
						}
					}
				}

				appendIndexes.forEach((index) => {
					swiper.$wrapperEl.append(renderSlide(slides[index], index));
				});
				prependIndexes
					.sort((a, b) => b - a)
					.forEach((index) => {
						swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
					});
				swiper.$wrapperEl.children(".swiper-slide").css(offsetProp, `${offset}px`);
				onRendered();
			}

			function appendSlide(slides) {
				if (typeof slides === "object" && "length" in slides) {
					for (let i = 0; i < slides.length; i += 1) {
						if (slides[i]) swiper.virtual.slides.push(slides[i]);
					}
				} else {
					swiper.virtual.slides.push(slides);
				}

				update(true);
			}

			function prependSlide(slides) {
				const activeIndex = swiper.activeIndex;
				let newActiveIndex = activeIndex + 1;
				let numberOfNewSlides = 1;

				if (Array.isArray(slides)) {
					for (let i = 0; i < slides.length; i += 1) {
						if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
					}

					newActiveIndex = activeIndex + slides.length;
					numberOfNewSlides = slides.length;
				} else {
					swiper.virtual.slides.unshift(slides);
				}

				if (swiper.params.virtual.cache) {
					const cache = swiper.virtual.cache;
					const newCache = {};
					Object.keys(cache).forEach((cachedIndex) => {
						const $cachedEl = cache[cachedIndex];
						const cachedElIndex = $cachedEl.attr("data-swiper-slide-index");

						if (cachedElIndex) {
							$cachedEl.attr("data-swiper-slide-index", parseInt(cachedElIndex, 10) + numberOfNewSlides);
						}

						newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
					});
					swiper.virtual.cache = newCache;
				}

				update(true);
				swiper.slideTo(newActiveIndex, 0);
			}

			function removeSlide(slidesIndexes) {
				if (typeof slidesIndexes === "undefined" || slidesIndexes === null) return;
				let activeIndex = swiper.activeIndex;

				if (Array.isArray(slidesIndexes)) {
					for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
						swiper.virtual.slides.splice(slidesIndexes[i], 1);

						if (swiper.params.virtual.cache) {
							delete swiper.virtual.cache[slidesIndexes[i]];
						}

						if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
						activeIndex = Math.max(activeIndex, 0);
					}
				} else {
					swiper.virtual.slides.splice(slidesIndexes, 1);

					if (swiper.params.virtual.cache) {
						delete swiper.virtual.cache[slidesIndexes];
					}

					if (slidesIndexes < activeIndex) activeIndex -= 1;
					activeIndex = Math.max(activeIndex, 0);
				}

				update(true);
				swiper.slideTo(activeIndex, 0);
			}

			function removeAllSlides() {
				swiper.virtual.slides = [];

				if (swiper.params.virtual.cache) {
					swiper.virtual.cache = {};
				}

				update(true);
				swiper.slideTo(0, 0);
			}

			on("beforeInit", () => {
				if (!swiper.params.virtual.enabled) return;
				swiper.virtual.slides = swiper.params.virtual.slides;
				swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
				swiper.params.watchSlidesProgress = true;
				swiper.originalParams.watchSlidesProgress = true;

				if (!swiper.params.initialSlide) {
					update();
				}
			});
			on("setTranslate", () => {
				if (!swiper.params.virtual.enabled) return;

				if (swiper.params.cssMode && !swiper._immediateVirtual) {
					clearTimeout(cssModeTimeout);
					cssModeTimeout = setTimeout(() => {
						update();
					}, 100);
				} else {
					update();
				}
			});
			on("init update resize", () => {
				if (!swiper.params.virtual.enabled) return;

				if (swiper.params.cssMode) {
					setCSSProperty(swiper.wrapperEl, "--swiper-virtual-size", `${swiper.virtualSize}px`);
				}
			});
			Object.assign(swiper.virtual, {
				appendSlide,
				prependSlide,
				removeSlide,
				removeAllSlides,
				update,
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/keyboard/keyboard.js
		/* eslint-disable consistent-return */

		function Keyboard({ swiper, extendParams, on, emit }) {
			const document = getDocument();
			const window = getWindow();
			swiper.keyboard = {
				enabled: false,
			};
			extendParams({
				keyboard: {
					enabled: false,
					onlyInViewport: true,
					pageUpDown: true,
				},
			});

			function handle(event) {
				if (!swiper.enabled) return;
				const { rtlTranslate: rtl } = swiper;
				let e = event;
				if (e.originalEvent) e = e.originalEvent; // jquery fix

				const kc = e.keyCode || e.charCode;
				const pageUpDown = swiper.params.keyboard.pageUpDown;
				const isPageUp = pageUpDown && kc === 33;
				const isPageDown = pageUpDown && kc === 34;
				const isArrowLeft = kc === 37;
				const isArrowRight = kc === 39;
				const isArrowUp = kc === 38;
				const isArrowDown = kc === 40; // Directions locks

				if (
					!swiper.allowSlideNext &&
					((swiper.isHorizontal() && isArrowRight) || (swiper.isVertical() && isArrowDown) || isPageDown)
				) {
					return false;
				}

				if (
					!swiper.allowSlidePrev &&
					((swiper.isHorizontal() && isArrowLeft) || (swiper.isVertical() && isArrowUp) || isPageUp)
				) {
					return false;
				}

				if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
					return undefined;
				}

				if (
					document.activeElement &&
					document.activeElement.nodeName &&
					(document.activeElement.nodeName.toLowerCase() === "input" ||
						document.activeElement.nodeName.toLowerCase() === "textarea")
				) {
					return undefined;
				}

				if (
					swiper.params.keyboard.onlyInViewport &&
					(isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)
				) {
					let inView = false; // Check that swiper should be inside of visible area of window

					if (
						swiper.$el.parents(`.${swiper.params.slideClass}`).length > 0 &&
						swiper.$el.parents(`.${swiper.params.slideActiveClass}`).length === 0
					) {
						return undefined;
					}

					const $el = swiper.$el;
					const swiperWidth = $el[0].clientWidth;
					const swiperHeight = $el[0].clientHeight;
					const windowWidth = window.innerWidth;
					const windowHeight = window.innerHeight;
					const swiperOffset = swiper.$el.offset();
					if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
					const swiperCoord = [
						[swiperOffset.left, swiperOffset.top],
						[swiperOffset.left + swiperWidth, swiperOffset.top],
						[swiperOffset.left, swiperOffset.top + swiperHeight],
						[swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight],
					];

					for (let i = 0; i < swiperCoord.length; i += 1) {
						const point = swiperCoord[i];

						if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
							if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

							inView = true;
						}
					}

					if (!inView) return undefined;
				}

				if (swiper.isHorizontal()) {
					if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
						if (e.preventDefault) e.preventDefault();
						else e.returnValue = false;
					}

					if (((isPageDown || isArrowRight) && !rtl) || ((isPageUp || isArrowLeft) && rtl))
						swiper.slideNext();
					if (((isPageUp || isArrowLeft) && !rtl) || ((isPageDown || isArrowRight) && rtl))
						swiper.slidePrev();
				} else {
					if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
						if (e.preventDefault) e.preventDefault();
						else e.returnValue = false;
					}

					if (isPageDown || isArrowDown) swiper.slideNext();
					if (isPageUp || isArrowUp) swiper.slidePrev();
				}

				emit("keyPress", kc);
				return undefined;
			}

			function enable() {
				if (swiper.keyboard.enabled) return;
				$(document).on("keydown", handle);
				swiper.keyboard.enabled = true;
			}

			function disable() {
				if (!swiper.keyboard.enabled) return;
				$(document).off("keydown", handle);
				swiper.keyboard.enabled = false;
			}

			on("init", () => {
				if (swiper.params.keyboard.enabled) {
					enable();
				}
			});
			on("destroy", () => {
				if (swiper.keyboard.enabled) {
					disable();
				}
			});
			Object.assign(swiper.keyboard, {
				enable,
				disable,
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/mousewheel/mousewheel.js
		/* eslint-disable consistent-return */

		function Mousewheel({ swiper, extendParams, on, emit }) {
			const window = getWindow();
			extendParams({
				mousewheel: {
					enabled: false,
					releaseOnEdges: false,
					invert: false,
					forceToAxis: false,
					sensitivity: 1,
					eventsTarget: "container",
					thresholdDelta: null,
					thresholdTime: null,
				},
			});
			swiper.mousewheel = {
				enabled: false,
			};
			let timeout;
			let lastScrollTime = now();
			let lastEventBeforeSnap;
			const recentWheelEvents = [];

			function normalize(e) {
				// Reasonable defaults
				const PIXEL_STEP = 10;
				const LINE_HEIGHT = 40;
				const PAGE_HEIGHT = 800;
				let sX = 0;
				let sY = 0; // spinX, spinY

				let pX = 0;
				let pY = 0; // pixelX, pixelY
				// Legacy

				if ("detail" in e) {
					sY = e.detail;
				}

				if ("wheelDelta" in e) {
					sY = -e.wheelDelta / 120;
				}

				if ("wheelDeltaY" in e) {
					sY = -e.wheelDeltaY / 120;
				}

				if ("wheelDeltaX" in e) {
					sX = -e.wheelDeltaX / 120;
				} // side scrolling on FF with DOMMouseScroll

				if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
					sX = sY;
					sY = 0;
				}

				pX = sX * PIXEL_STEP;
				pY = sY * PIXEL_STEP;

				if ("deltaY" in e) {
					pY = e.deltaY;
				}

				if ("deltaX" in e) {
					pX = e.deltaX;
				}

				if (e.shiftKey && !pX) {
					// if user scrolls with shift he wants horizontal scroll
					pX = pY;
					pY = 0;
				}

				if ((pX || pY) && e.deltaMode) {
					if (e.deltaMode === 1) {
						// delta in LINE units
						pX *= LINE_HEIGHT;
						pY *= LINE_HEIGHT;
					} else {
						// delta in PAGE units
						pX *= PAGE_HEIGHT;
						pY *= PAGE_HEIGHT;
					}
				} // Fall-back if spin cannot be determined

				if (pX && !sX) {
					sX = pX < 1 ? -1 : 1;
				}

				if (pY && !sY) {
					sY = pY < 1 ? -1 : 1;
				}

				return {
					spinX: sX,
					spinY: sY,
					pixelX: pX,
					pixelY: pY,
				};
			}

			function handleMouseEnter() {
				if (!swiper.enabled) return;
				swiper.mouseEntered = true;
			}

			function handleMouseLeave() {
				if (!swiper.enabled) return;
				swiper.mouseEntered = false;
			}

			function animateSlider(newEvent) {
				if (
					swiper.params.mousewheel.thresholdDelta &&
					newEvent.delta < swiper.params.mousewheel.thresholdDelta
				) {
					// Prevent if delta of wheel scroll delta is below configured threshold
					return false;
				}

				if (
					swiper.params.mousewheel.thresholdTime &&
					now() - lastScrollTime < swiper.params.mousewheel.thresholdTime
				) {
					// Prevent if time between scrolls is below configured threshold
					return false;
				} // If the movement is NOT big enough and
				// if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
				//   Don't go any further (avoid insignificant scroll movement).

				if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
					// Return false as a default
					return true;
				} // If user is scrolling towards the end:
				//   If the slider hasn't hit the latest slide or
				//   if the slider is a loop and
				//   if the slider isn't moving right now:
				//     Go to next slide and
				//     emit a scroll event.
				// Else (the user is scrolling towards the beginning) and
				// if the slider hasn't hit the first slide or
				// if the slider is a loop and
				// if the slider isn't moving right now:
				//   Go to prev slide and
				//   emit a scroll event.

				if (newEvent.direction < 0) {
					if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
						swiper.slideNext();
						emit("scroll", newEvent.raw);
					}
				} else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
					swiper.slidePrev();
					emit("scroll", newEvent.raw);
				} // If you got here is because an animation has been triggered so store the current time

				lastScrollTime = new window.Date().getTime(); // Return false as a default

				return false;
			}

			function releaseScroll(newEvent) {
				const params = swiper.params.mousewheel;

				if (newEvent.direction < 0) {
					if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
						// Return true to animate scroll on edges
						return true;
					}
				} else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
					// Return true to animate scroll on edges
					return true;
				}

				return false;
			}

			function handle(event) {
				let e = event;
				let disableParentSwiper = true;
				if (!swiper.enabled) return;
				const params = swiper.params.mousewheel;

				if (swiper.params.cssMode) {
					e.preventDefault();
				}

				let target = swiper.$el;

				if (swiper.params.mousewheel.eventsTarget !== "container") {
					target = $(swiper.params.mousewheel.eventsTarget);
				}

				if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) return true;
				if (e.originalEvent) e = e.originalEvent; // jquery fix

				let delta = 0;
				const rtlFactor = swiper.rtlTranslate ? -1 : 1;
				const data = normalize(e);

				if (params.forceToAxis) {
					if (swiper.isHorizontal()) {
						if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;
						else return true;
					} else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;
					else return true;
				} else {
					delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
				}

				if (delta === 0) return true;
				if (params.invert) delta = -delta; // Get the scroll positions

				let positions = swiper.getTranslate() + delta * params.sensitivity;
				if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
				if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate(); // When loop is true:
				//     the disableParentSwiper will be true.
				// When loop is false:
				//     if the scroll positions is not on edge,
				//     then the disableParentSwiper will be true.
				//     if the scroll on edge positions,
				//     then the disableParentSwiper will be false.

				disableParentSwiper = swiper.params.loop
					? true
					: !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
				if (disableParentSwiper && swiper.params.nested) e.stopPropagation();

				if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
					// Register the new event in a variable which stores the relevant data
					const newEvent = {
						time: now(),
						delta: Math.abs(delta),
						direction: Math.sign(delta),
						raw: event,
					}; // Keep the most recent events

					if (recentWheelEvents.length >= 2) {
						recentWheelEvents.shift(); // only store the last N events
					}

					const prevEvent = recentWheelEvents.length
						? recentWheelEvents[recentWheelEvents.length - 1]
						: undefined;
					recentWheelEvents.push(newEvent); // If there is at least one previous recorded event:
					//   If direction has changed or
					//   if the scroll is quicker than the previous one:
					//     Animate the slider.
					// Else (this is the first time the wheel is moved):
					//     Animate the slider.

					if (prevEvent) {
						if (
							newEvent.direction !== prevEvent.direction ||
							newEvent.delta > prevEvent.delta ||
							newEvent.time > prevEvent.time + 150
						) {
							animateSlider(newEvent);
						}
					} else {
						animateSlider(newEvent);
					} // If it's time to release the scroll:
					//   Return now so you don't hit the preventDefault.

					if (releaseScroll(newEvent)) {
						return true;
					}
				} else {
					// Freemode or scrollContainer:
					// If we recently snapped after a momentum scroll, then ignore wheel events
					// to give time for the deceleration to finish. Stop ignoring after 500 msecs
					// or if it's a new scroll (larger delta or inverse sign as last event before
					// an end-of-momentum snap).
					const newEvent = {
						time: now(),
						delta: Math.abs(delta),
						direction: Math.sign(delta),
					};
					const ignoreWheelEvents =
						lastEventBeforeSnap &&
						newEvent.time < lastEventBeforeSnap.time + 500 &&
						newEvent.delta <= lastEventBeforeSnap.delta &&
						newEvent.direction === lastEventBeforeSnap.direction;

					if (!ignoreWheelEvents) {
						lastEventBeforeSnap = undefined;

						if (swiper.params.loop) {
							swiper.loopFix();
						}

						let position = swiper.getTranslate() + delta * params.sensitivity;
						const wasBeginning = swiper.isBeginning;
						const wasEnd = swiper.isEnd;
						if (position >= swiper.minTranslate()) position = swiper.minTranslate();
						if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
						swiper.setTransition(0);
						swiper.setTranslate(position);
						swiper.updateProgress();
						swiper.updateActiveIndex();
						swiper.updateSlidesClasses();

						if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
							swiper.updateSlidesClasses();
						}

						if (swiper.params.freeMode.sticky) {
							// When wheel scrolling starts with sticky (aka snap) enabled, then detect
							// the end of a momentum scroll by storing recent (N=15?) wheel events.
							// 1. do all N events have decreasing or same (absolute value) delta?
							// 2. did all N events arrive in the last M (M=500?) msecs?
							// 3. does the earliest event have an (absolute value) delta that's
							//    at least P (P=1?) larger than the most recent event's delta?
							// 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
							// If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
							// Snap immediately and ignore remaining wheel events in this scroll.
							// See comment above for "remaining wheel events in this scroll" determination.
							// If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
							clearTimeout(timeout);
							timeout = undefined;

							if (recentWheelEvents.length >= 15) {
								recentWheelEvents.shift(); // only store the last N events
							}

							const prevEvent = recentWheelEvents.length
								? recentWheelEvents[recentWheelEvents.length - 1]
								: undefined;
							const firstEvent = recentWheelEvents[0];
							recentWheelEvents.push(newEvent);

							if (
								prevEvent &&
								(newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)
							) {
								// Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
								recentWheelEvents.splice(0);
							} else if (
								recentWheelEvents.length >= 15 &&
								newEvent.time - firstEvent.time < 500 &&
								firstEvent.delta - newEvent.delta >= 1 &&
								newEvent.delta <= 6
							) {
								// We're at the end of the deceleration of a momentum scroll, so there's no need
								// to wait for more events. Snap ASAP on the next tick.
								// Also, because there's some remaining momentum we'll bias the snap in the
								// direction of the ongoing scroll because it's better UX for the scroll to snap
								// in the same direction as the scroll instead of reversing to snap.  Therefore,
								// if it's already scrolled more than 20% in the current direction, keep going.
								const snapToThreshold = delta > 0 ? 0.8 : 0.2;
								lastEventBeforeSnap = newEvent;
								recentWheelEvents.splice(0);
								timeout = nextTick(() => {
									swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
								}, 0); // no delay; move on next tick
							}

							if (!timeout) {
								// if we get here, then we haven't detected the end of a momentum scroll, so
								// we'll consider a scroll "complete" when there haven't been any wheel events
								// for 500ms.
								timeout = nextTick(() => {
									const snapToThreshold = 0.5;
									lastEventBeforeSnap = newEvent;
									recentWheelEvents.splice(0);
									swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
								}, 500);
							}
						} // Emit event

						if (!ignoreWheelEvents) emit("scroll", e); // Stop autoplay

						if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction)
							swiper.autoplay.stop(); // Return page scroll on edge positions

						if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
					}
				}

				if (e.preventDefault) e.preventDefault();
				else e.returnValue = false;
				return false;
			}

			function events(method) {
				let target = swiper.$el;

				if (swiper.params.mousewheel.eventsTarget !== "container") {
					target = $(swiper.params.mousewheel.eventsTarget);
				}

				target[method]("mouseenter", handleMouseEnter);
				target[method]("mouseleave", handleMouseLeave);
				target[method]("wheel", handle);
			}

			function enable() {
				if (swiper.params.cssMode) {
					swiper.wrapperEl.removeEventListener("wheel", handle);
					return true;
				}

				if (swiper.mousewheel.enabled) return false;
				events("on");
				swiper.mousewheel.enabled = true;
				return true;
			}

			function disable() {
				if (swiper.params.cssMode) {
					swiper.wrapperEl.addEventListener(event, handle);
					return true;
				}

				if (!swiper.mousewheel.enabled) return false;
				events("off");
				swiper.mousewheel.enabled = false;
				return true;
			}

			on("init", () => {
				if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
					disable();
				}

				if (swiper.params.mousewheel.enabled) enable();
			});
			on("destroy", () => {
				if (swiper.params.cssMode) {
					enable();
				}

				if (swiper.mousewheel.enabled) disable();
			});
			Object.assign(swiper.mousewheel, {
				enable,
				disable,
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/shared/create-element-if-not-defined.js
		function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
			const document = ssr_window_esm_getDocument();

			if (swiper.params.createElements) {
				Object.keys(checkProps).forEach((key) => {
					if (!params[key] && params.auto === true) {
						let element = swiper.$el.children(`.${checkProps[key]}`)[0];

						if (!element) {
							element = document.createElement("div");
							element.className = checkProps[key];
							swiper.$el.append(element);
						}

						params[key] = element;
						originalParams[key] = element;
					}
				});
			}

			return params;
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/navigation/navigation.js
		function Navigation({ swiper, extendParams, on, emit }) {
			extendParams({
				navigation: {
					nextEl: null,
					prevEl: null,
					hideOnClick: false,
					disabledClass: "swiper-button-disabled",
					hiddenClass: "swiper-button-hidden",
					lockClass: "swiper-button-lock",
				},
			});
			swiper.navigation = {
				nextEl: null,
				$nextEl: null,
				prevEl: null,
				$prevEl: null,
			};

			function getEl(el) {
				let $el;

				if (el) {
					$el = dom(el);

					if (
						swiper.params.uniqueNavElements &&
						typeof el === "string" &&
						$el.length > 1 &&
						swiper.$el.find(el).length === 1
					) {
						$el = swiper.$el.find(el);
					}
				}

				return $el;
			}

			function toggleEl($el, disabled) {
				const params = swiper.params.navigation;

				if ($el && $el.length > 0) {
					$el[disabled ? "addClass" : "removeClass"](params.disabledClass);
					if ($el[0] && $el[0].tagName === "BUTTON") $el[0].disabled = disabled;

					if (swiper.params.watchOverflow && swiper.enabled) {
						$el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
					}
				}
			}

			function update() {
				// Update Navigation Buttons
				if (swiper.params.loop) return;
				const { $nextEl, $prevEl } = swiper.navigation;
				toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
				toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
			}

			function onPrevClick(e) {
				e.preventDefault();
				if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
				swiper.slidePrev();
			}

			function onNextClick(e) {
				e.preventDefault();
				if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
				swiper.slideNext();
			}

			function init() {
				const params = swiper.params.navigation;
				swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(
					swiper,
					swiper.originalParams.navigation,
					swiper.params.navigation,
					{
						nextEl: "swiper-button-next",
						prevEl: "swiper-button-prev",
					}
				);
				if (!(params.nextEl || params.prevEl)) return;
				const $nextEl = getEl(params.nextEl);
				const $prevEl = getEl(params.prevEl);

				if ($nextEl && $nextEl.length > 0) {
					$nextEl.on("click", onNextClick);
				}

				if ($prevEl && $prevEl.length > 0) {
					$prevEl.on("click", onPrevClick);
				}

				Object.assign(swiper.navigation, {
					$nextEl,
					nextEl: $nextEl && $nextEl[0],
					$prevEl,
					prevEl: $prevEl && $prevEl[0],
				});

				if (!swiper.enabled) {
					if ($nextEl) $nextEl.addClass(params.lockClass);
					if ($prevEl) $prevEl.addClass(params.lockClass);
				}
			}

			function destroy() {
				const { $nextEl, $prevEl } = swiper.navigation;

				if ($nextEl && $nextEl.length) {
					$nextEl.off("click", onNextClick);
					$nextEl.removeClass(swiper.params.navigation.disabledClass);
				}

				if ($prevEl && $prevEl.length) {
					$prevEl.off("click", onPrevClick);
					$prevEl.removeClass(swiper.params.navigation.disabledClass);
				}
			}

			on("init", () => {
				init();
				update();
			});
			on("toEdge fromEdge lock unlock", () => {
				update();
			});
			on("destroy", () => {
				destroy();
			});
			on("enable disable", () => {
				const { $nextEl, $prevEl } = swiper.navigation;

				if ($nextEl) {
					$nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
				}

				if ($prevEl) {
					$prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
				}
			});
			on("click", (_s, e) => {
				const { $nextEl, $prevEl } = swiper.navigation;
				const targetEl = e.target;

				if (swiper.params.navigation.hideOnClick && !dom(targetEl).is($prevEl) && !dom(targetEl).is($nextEl)) {
					if (
						swiper.pagination &&
						swiper.params.pagination &&
						swiper.params.pagination.clickable &&
						(swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))
					)
						return;
					let isHidden;

					if ($nextEl) {
						isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
					} else if ($prevEl) {
						isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
					}

					if (isHidden === true) {
						emit("navigationShow");
					} else {
						emit("navigationHide");
					}

					if ($nextEl) {
						$nextEl.toggleClass(swiper.params.navigation.hiddenClass);
					}

					if ($prevEl) {
						$prevEl.toggleClass(swiper.params.navigation.hiddenClass);
					}
				}
			});
			Object.assign(swiper.navigation, {
				update,
				init,
				destroy,
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/shared/classes-to-selector.js
		function classes_to_selector_classesToSelector(classes = "") {
			return `.${classes
				.trim()
				.replace(/([\.:!\/])/g, "\\$1") // eslint-disable-line
				.replace(/ /g, ".")}`;
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/pagination/pagination.js
		function Pagination({ swiper, extendParams, on, emit }) {
			const pfx = "swiper-pagination";
			extendParams({
				pagination: {
					el: null,
					bulletElement: "span",
					clickable: false,
					hideOnClick: false,
					renderBullet: null,
					renderProgressbar: null,
					renderFraction: null,
					renderCustom: null,
					progressbarOpposite: false,
					type: "bullets",
					// 'bullets' or 'progressbar' or 'fraction' or 'custom'
					dynamicBullets: false,
					dynamicMainBullets: 1,
					formatFractionCurrent: (number) => number,
					formatFractionTotal: (number) => number,
					bulletClass: `${pfx}-bullet`,
					bulletActiveClass: `${pfx}-bullet-active`,
					modifierClass: `${pfx}-`,
					currentClass: `${pfx}-current`,
					totalClass: `${pfx}-total`,
					hiddenClass: `${pfx}-hidden`,
					progressbarFillClass: `${pfx}-progressbar-fill`,
					progressbarOppositeClass: `${pfx}-progressbar-opposite`,
					clickableClass: `${pfx}-clickable`,
					lockClass: `${pfx}-lock`,
					horizontalClass: `${pfx}-horizontal`,
					verticalClass: `${pfx}-vertical`,
				},
			});
			swiper.pagination = {
				el: null,
				$el: null,
				bullets: [],
			};
			let bulletSize;
			let dynamicBulletIndex = 0;

			function isPaginationDisabled() {
				return (
					!swiper.params.pagination.el ||
					!swiper.pagination.el ||
					!swiper.pagination.$el ||
					swiper.pagination.$el.length === 0
				);
			}

			function setSideBullets($bulletEl, position) {
				const { bulletActiveClass } = swiper.params.pagination;
				$bulletEl[position]()
					.addClass(`${bulletActiveClass}-${position}`)
					[position]()
					.addClass(`${bulletActiveClass}-${position}-${position}`);
			}

			function update() {
				// Render || Update Pagination bullets/items
				const rtl = swiper.rtl;
				const params = swiper.params.pagination;
				if (isPaginationDisabled()) return;
				const slidesLength =
					swiper.virtual && swiper.params.virtual.enabled
						? swiper.virtual.slides.length
						: swiper.slides.length;
				const $el = swiper.pagination.$el; // Current/Total

				let current;
				const total = swiper.params.loop
					? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup)
					: swiper.snapGrid.length;

				if (swiper.params.loop) {
					current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);

					if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
						current -= slidesLength - swiper.loopedSlides * 2;
					}

					if (current > total - 1) current -= total;
					if (current < 0 && swiper.params.paginationType !== "bullets") current = total + current;
				} else if (typeof swiper.snapIndex !== "undefined") {
					current = swiper.snapIndex;
				} else {
					current = swiper.activeIndex || 0;
				} // Types

				if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
					const bullets = swiper.pagination.bullets;
					let firstIndex;
					let lastIndex;
					let midIndex;

					if (params.dynamicBullets) {
						bulletSize = bullets.eq(0)[swiper.isHorizontal() ? "outerWidth" : "outerHeight"](true);
						$el.css(
							swiper.isHorizontal() ? "width" : "height",
							`${bulletSize * (params.dynamicMainBullets + 4)}px`
						);

						if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
							dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);

							if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
								dynamicBulletIndex = params.dynamicMainBullets - 1;
							} else if (dynamicBulletIndex < 0) {
								dynamicBulletIndex = 0;
							}
						}

						firstIndex = Math.max(current - dynamicBulletIndex, 0);
						lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
						midIndex = (lastIndex + firstIndex) / 2;
					}

					bullets.removeClass(
						["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
							.map((suffix) => `${params.bulletActiveClass}${suffix}`)
							.join(" ")
					);

					if ($el.length > 1) {
						bullets.each((bullet) => {
							const $bullet = dom(bullet);
							const bulletIndex = $bullet.index();

							if (bulletIndex === current) {
								$bullet.addClass(params.bulletActiveClass);
							}

							if (params.dynamicBullets) {
								if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
									$bullet.addClass(`${params.bulletActiveClass}-main`);
								}

								if (bulletIndex === firstIndex) {
									setSideBullets($bullet, "prev");
								}

								if (bulletIndex === lastIndex) {
									setSideBullets($bullet, "next");
								}
							}
						});
					} else {
						const $bullet = bullets.eq(current);
						const bulletIndex = $bullet.index();
						$bullet.addClass(params.bulletActiveClass);

						if (params.dynamicBullets) {
							const $firstDisplayedBullet = bullets.eq(firstIndex);
							const $lastDisplayedBullet = bullets.eq(lastIndex);

							for (let i = firstIndex; i <= lastIndex; i += 1) {
								bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
							}

							if (swiper.params.loop) {
								if (bulletIndex >= bullets.length) {
									for (let i = params.dynamicMainBullets; i >= 0; i -= 1) {
										bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
									}

									bullets
										.eq(bullets.length - params.dynamicMainBullets - 1)
										.addClass(`${params.bulletActiveClass}-prev`);
								} else {
									setSideBullets($firstDisplayedBullet, "prev");
									setSideBullets($lastDisplayedBullet, "next");
								}
							} else {
								setSideBullets($firstDisplayedBullet, "prev");
								setSideBullets($lastDisplayedBullet, "next");
							}
						}
					}

					if (params.dynamicBullets) {
						const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
						const bulletsOffset =
							(bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
						const offsetProp = rtl ? "right" : "left";
						bullets.css(swiper.isHorizontal() ? offsetProp : "top", `${bulletsOffset}px`);
					}
				}

				if (params.type === "fraction") {
					$el.find(classes_to_selector_classesToSelector(params.currentClass)).text(
						params.formatFractionCurrent(current + 1)
					);
					$el.find(classes_to_selector_classesToSelector(params.totalClass)).text(
						params.formatFractionTotal(total)
					);
				}

				if (params.type === "progressbar") {
					let progressbarDirection;

					if (params.progressbarOpposite) {
						progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal";
					} else {
						progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
					}

					const scale = (current + 1) / total;
					let scaleX = 1;
					let scaleY = 1;

					if (progressbarDirection === "horizontal") {
						scaleX = scale;
					} else {
						scaleY = scale;
					}

					$el.find(classes_to_selector_classesToSelector(params.progressbarFillClass))
						.transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`)
						.transition(swiper.params.speed);
				}

				if (params.type === "custom" && params.renderCustom) {
					$el.html(params.renderCustom(swiper, current + 1, total));
					emit("paginationRender", $el[0]);
				} else {
					emit("paginationUpdate", $el[0]);
				}

				if (swiper.params.watchOverflow && swiper.enabled) {
					$el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
				}
			}

			function render() {
				// Render Container
				const params = swiper.params.pagination;
				if (isPaginationDisabled()) return;
				const slidesLength =
					swiper.virtual && swiper.params.virtual.enabled
						? swiper.virtual.slides.length
						: swiper.slides.length;
				const $el = swiper.pagination.$el;
				let paginationHTML = "";

				if (params.type === "bullets") {
					let numberOfBullets = swiper.params.loop
						? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup)
						: swiper.snapGrid.length;

					if (
						swiper.params.freeMode &&
						swiper.params.freeMode.enabled &&
						!swiper.params.loop &&
						numberOfBullets > slidesLength
					) {
						numberOfBullets = slidesLength;
					}

					for (let i = 0; i < numberOfBullets; i += 1) {
						if (params.renderBullet) {
							paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
						} else {
							paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
						}
					}

					$el.html(paginationHTML);
					swiper.pagination.bullets = $el.find(classes_to_selector_classesToSelector(params.bulletClass));
				}

				if (params.type === "fraction") {
					if (params.renderFraction) {
						paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
					} else {
						paginationHTML =
							`<span class="${params.currentClass}"></span>` +
							" / " +
							`<span class="${params.totalClass}"></span>`;
					}

					$el.html(paginationHTML);
				}

				if (params.type === "progressbar") {
					if (params.renderProgressbar) {
						paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
					} else {
						paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
					}

					$el.html(paginationHTML);
				}

				if (params.type !== "custom") {
					emit("paginationRender", swiper.pagination.$el[0]);
				}
			}

			function init() {
				swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(
					swiper,
					swiper.originalParams.pagination,
					swiper.params.pagination,
					{
						el: "swiper-pagination",
					}
				);
				const params = swiper.params.pagination;
				if (!params.el) return;
				let $el = dom(params.el);
				if ($el.length === 0) return;

				if (swiper.params.uniqueNavElements && typeof params.el === "string" && $el.length > 1) {
					$el = swiper.$el.find(params.el); // check if it belongs to another nested Swiper

					if ($el.length > 1) {
						$el = $el.filter((el) => {
							if (dom(el).parents(".swiper")[0] !== swiper.el) return false;
							return true;
						});
					}
				}

				if (params.type === "bullets" && params.clickable) {
					$el.addClass(params.clickableClass);
				}

				$el.addClass(params.modifierClass + params.type);
				$el.addClass(params.modifierClass + swiper.params.direction);

				if (params.type === "bullets" && params.dynamicBullets) {
					$el.addClass(`${params.modifierClass}${params.type}-dynamic`);
					dynamicBulletIndex = 0;

					if (params.dynamicMainBullets < 1) {
						params.dynamicMainBullets = 1;
					}
				}

				if (params.type === "progressbar" && params.progressbarOpposite) {
					$el.addClass(params.progressbarOppositeClass);
				}

				if (params.clickable) {
					$el.on("click", classes_to_selector_classesToSelector(params.bulletClass), function onClick(e) {
						e.preventDefault();
						let index = dom(this).index() * swiper.params.slidesPerGroup;
						if (swiper.params.loop) index += swiper.loopedSlides;
						swiper.slideTo(index);
					});
				}

				Object.assign(swiper.pagination, {
					$el,
					el: $el[0],
				});

				if (!swiper.enabled) {
					$el.addClass(params.lockClass);
				}
			}

			function destroy() {
				const params = swiper.params.pagination;
				if (isPaginationDisabled()) return;
				const $el = swiper.pagination.$el;
				$el.removeClass(params.hiddenClass);
				$el.removeClass(params.modifierClass + params.type);
				$el.removeClass(params.modifierClass + swiper.params.direction);
				if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass)
					swiper.pagination.bullets.removeClass(params.bulletActiveClass);

				if (params.clickable) {
					$el.off("click", classes_to_selector_classesToSelector(params.bulletClass));
				}
			}

			on("init", () => {
				init();
				render();
				update();
			});
			on("activeIndexChange", () => {
				if (swiper.params.loop) {
					update();
				} else if (typeof swiper.snapIndex === "undefined") {
					update();
				}
			});
			on("snapIndexChange", () => {
				if (!swiper.params.loop) {
					update();
				}
			});
			on("slidesLengthChange", () => {
				if (swiper.params.loop) {
					render();
					update();
				}
			});
			on("snapGridLengthChange", () => {
				if (!swiper.params.loop) {
					render();
					update();
				}
			});
			on("destroy", () => {
				destroy();
			});
			on("enable disable", () => {
				const { $el } = swiper.pagination;

				if ($el) {
					$el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.pagination.lockClass);
				}
			});
			on("lock unlock", () => {
				update();
			});
			on("click", (_s, e) => {
				const targetEl = e.target;
				const { $el } = swiper.pagination;

				if (
					swiper.params.pagination.el &&
					swiper.params.pagination.hideOnClick &&
					$el.length > 0 &&
					!dom(targetEl).hasClass(swiper.params.pagination.bulletClass)
				) {
					if (
						swiper.navigation &&
						((swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl) ||
							(swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
					)
						return;
					const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);

					if (isHidden === true) {
						emit("paginationShow");
					} else {
						emit("paginationHide");
					}

					$el.toggleClass(swiper.params.pagination.hiddenClass);
				}
			});
			Object.assign(swiper.pagination, {
				render,
				update,
				init,
				destroy,
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/scrollbar/scrollbar.js
		function Scrollbar({ swiper, extendParams, on, emit }) {
			const document = getDocument();
			let isTouched = false;
			let timeout = null;
			let dragTimeout = null;
			let dragStartPos;
			let dragSize;
			let trackSize;
			let divider;
			extendParams({
				scrollbar: {
					el: null,
					dragSize: "auto",
					hide: false,
					draggable: false,
					snapOnRelease: true,
					lockClass: "swiper-scrollbar-lock",
					dragClass: "swiper-scrollbar-drag",
				},
			});
			swiper.scrollbar = {
				el: null,
				dragEl: null,
				$el: null,
				$dragEl: null,
			};

			function setTranslate() {
				if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
				const { scrollbar, rtlTranslate: rtl, progress } = swiper;
				const { $dragEl, $el } = scrollbar;
				const params = swiper.params.scrollbar;
				let newSize = dragSize;
				let newPos = (trackSize - dragSize) * progress;

				if (rtl) {
					newPos = -newPos;

					if (newPos > 0) {
						newSize = dragSize - newPos;
						newPos = 0;
					} else if (-newPos + dragSize > trackSize) {
						newSize = trackSize + newPos;
					}
				} else if (newPos < 0) {
					newSize = dragSize + newPos;
					newPos = 0;
				} else if (newPos + dragSize > trackSize) {
					newSize = trackSize - newPos;
				}

				if (swiper.isHorizontal()) {
					$dragEl.transform(`translate3d(${newPos}px, 0, 0)`);
					$dragEl[0].style.width = `${newSize}px`;
				} else {
					$dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);
					$dragEl[0].style.height = `${newSize}px`;
				}

				if (params.hide) {
					clearTimeout(timeout);
					$el[0].style.opacity = 1;
					timeout = setTimeout(() => {
						$el[0].style.opacity = 0;
						$el.transition(400);
					}, 1000);
				}
			}

			function setTransition(duration) {
				if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
				swiper.scrollbar.$dragEl.transition(duration);
			}

			function updateSize() {
				if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
				const { scrollbar } = swiper;
				const { $dragEl, $el } = scrollbar;
				$dragEl[0].style.width = "";
				$dragEl[0].style.height = "";
				trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;
				divider =
					swiper.size /
					(swiper.virtualSize +
						swiper.params.slidesOffsetBefore -
						(swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));

				if (swiper.params.scrollbar.dragSize === "auto") {
					dragSize = trackSize * divider;
				} else {
					dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
				}

				if (swiper.isHorizontal()) {
					$dragEl[0].style.width = `${dragSize}px`;
				} else {
					$dragEl[0].style.height = `${dragSize}px`;
				}

				if (divider >= 1) {
					$el[0].style.display = "none";
				} else {
					$el[0].style.display = "";
				}

				if (swiper.params.scrollbar.hide) {
					$el[0].style.opacity = 0;
				}

				if (swiper.params.watchOverflow && swiper.enabled) {
					scrollbar.$el[swiper.isLocked ? "addClass" : "removeClass"](swiper.params.scrollbar.lockClass);
				}
			}

			function getPointerPosition(e) {
				if (swiper.isHorizontal()) {
					return e.type === "touchstart" || e.type === "touchmove" ? e.targetTouches[0].clientX : e.clientX;
				}

				return e.type === "touchstart" || e.type === "touchmove" ? e.targetTouches[0].clientY : e.clientY;
			}

			function setDragPosition(e) {
				const { scrollbar, rtlTranslate: rtl } = swiper;
				const { $el } = scrollbar;
				let positionRatio;
				positionRatio =
					(getPointerPosition(e) -
						$el.offset()[swiper.isHorizontal() ? "left" : "top"] -
						(dragStartPos !== null ? dragStartPos : dragSize / 2)) /
					(trackSize - dragSize);
				positionRatio = Math.max(Math.min(positionRatio, 1), 0);

				if (rtl) {
					positionRatio = 1 - positionRatio;
				}

				const position =
					swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
				swiper.updateProgress(position);
				swiper.setTranslate(position);
				swiper.updateActiveIndex();
				swiper.updateSlidesClasses();
			}

			function onDragStart(e) {
				const params = swiper.params.scrollbar;
				const { scrollbar, $wrapperEl } = swiper;
				const { $el, $dragEl } = scrollbar;
				isTouched = true;
				dragStartPos =
					e.target === $dragEl[0] || e.target === $dragEl
						? getPointerPosition(e) -
						  e.target.getBoundingClientRect()[swiper.isHorizontal() ? "left" : "top"]
						: null;
				e.preventDefault();
				e.stopPropagation();
				$wrapperEl.transition(100);
				$dragEl.transition(100);
				setDragPosition(e);
				clearTimeout(dragTimeout);
				$el.transition(0);

				if (params.hide) {
					$el.css("opacity", 1);
				}

				if (swiper.params.cssMode) {
					swiper.$wrapperEl.css("scroll-snap-type", "none");
				}

				emit("scrollbarDragStart", e);
			}

			function onDragMove(e) {
				const { scrollbar, $wrapperEl } = swiper;
				const { $el, $dragEl } = scrollbar;
				if (!isTouched) return;
				if (e.preventDefault) e.preventDefault();
				else e.returnValue = false;
				setDragPosition(e);
				$wrapperEl.transition(0);
				$el.transition(0);
				$dragEl.transition(0);
				emit("scrollbarDragMove", e);
			}

			function onDragEnd(e) {
				const params = swiper.params.scrollbar;
				const { scrollbar, $wrapperEl } = swiper;
				const { $el } = scrollbar;
				if (!isTouched) return;
				isTouched = false;

				if (swiper.params.cssMode) {
					swiper.$wrapperEl.css("scroll-snap-type", "");
					$wrapperEl.transition("");
				}

				if (params.hide) {
					clearTimeout(dragTimeout);
					dragTimeout = nextTick(() => {
						$el.css("opacity", 0);
						$el.transition(400);
					}, 1000);
				}

				emit("scrollbarDragEnd", e);

				if (params.snapOnRelease) {
					swiper.slideToClosest();
				}
			}

			function events(method) {
				const { scrollbar, touchEventsTouch, touchEventsDesktop, params, support } = swiper;
				const $el = scrollbar.$el;
				const target = $el[0];
				const activeListener =
					support.passiveListener && params.passiveListeners
						? {
								passive: false,
								capture: false,
						  }
						: false;
				const passiveListener =
					support.passiveListener && params.passiveListeners
						? {
								passive: true,
								capture: false,
						  }
						: false;
				if (!target) return;
				const eventMethod = method === "on" ? "addEventListener" : "removeEventListener";

				if (!support.touch) {
					target[eventMethod](touchEventsDesktop.start, onDragStart, activeListener);
					document[eventMethod](touchEventsDesktop.move, onDragMove, activeListener);
					document[eventMethod](touchEventsDesktop.end, onDragEnd, passiveListener);
				} else {
					target[eventMethod](touchEventsTouch.start, onDragStart, activeListener);
					target[eventMethod](touchEventsTouch.move, onDragMove, activeListener);
					target[eventMethod](touchEventsTouch.end, onDragEnd, passiveListener);
				}
			}

			function enableDraggable() {
				if (!swiper.params.scrollbar.el) return;
				events("on");
			}

			function disableDraggable() {
				if (!swiper.params.scrollbar.el) return;
				events("off");
			}

			function init() {
				const { scrollbar, $el: $swiperEl } = swiper;
				swiper.params.scrollbar = createElementIfNotDefined(
					swiper,
					swiper.originalParams.scrollbar,
					swiper.params.scrollbar,
					{
						el: "swiper-scrollbar",
					}
				);
				const params = swiper.params.scrollbar;
				if (!params.el) return;
				let $el = $(params.el);

				if (
					swiper.params.uniqueNavElements &&
					typeof params.el === "string" &&
					$el.length > 1 &&
					$swiperEl.find(params.el).length === 1
				) {
					$el = $swiperEl.find(params.el);
				}

				let $dragEl = $el.find(`.${swiper.params.scrollbar.dragClass}`);

				if ($dragEl.length === 0) {
					$dragEl = $(`<div class="${swiper.params.scrollbar.dragClass}"></div>`);
					$el.append($dragEl);
				}

				Object.assign(scrollbar, {
					$el,
					el: $el[0],
					$dragEl,
					dragEl: $dragEl[0],
				});

				if (params.draggable) {
					enableDraggable();
				}

				if ($el) {
					$el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.scrollbar.lockClass);
				}
			}

			function destroy() {
				disableDraggable();
			}

			on("init", () => {
				init();
				updateSize();
				setTranslate();
			});
			on("update resize observerUpdate lock unlock", () => {
				updateSize();
			});
			on("setTranslate", () => {
				setTranslate();
			});
			on("setTransition", (_s, duration) => {
				setTransition(duration);
			});
			on("enable disable", () => {
				const { $el } = swiper.scrollbar;

				if ($el) {
					$el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.scrollbar.lockClass);
				}
			});
			on("destroy", () => {
				destroy();
			});
			Object.assign(swiper.scrollbar, {
				updateSize,
				setTranslate,
				init,
				destroy,
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/parallax/parallax.js
		function Parallax({ swiper, extendParams, on }) {
			extendParams({
				parallax: {
					enabled: false,
				},
			});

			const setTransform = (el, progress) => {
				const { rtl } = swiper;
				const $el = $(el);
				const rtlFactor = rtl ? -1 : 1;
				const p = $el.attr("data-swiper-parallax") || "0";
				let x = $el.attr("data-swiper-parallax-x");
				let y = $el.attr("data-swiper-parallax-y");
				const scale = $el.attr("data-swiper-parallax-scale");
				const opacity = $el.attr("data-swiper-parallax-opacity");

				if (x || y) {
					x = x || "0";
					y = y || "0";
				} else if (swiper.isHorizontal()) {
					x = p;
					y = "0";
				} else {
					y = p;
					x = "0";
				}

				if (x.indexOf("%") >= 0) {
					x = `${parseInt(x, 10) * progress * rtlFactor}%`;
				} else {
					x = `${x * progress * rtlFactor}px`;
				}

				if (y.indexOf("%") >= 0) {
					y = `${parseInt(y, 10) * progress}%`;
				} else {
					y = `${y * progress}px`;
				}

				if (typeof opacity !== "undefined" && opacity !== null) {
					const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
					$el[0].style.opacity = currentOpacity;
				}

				if (typeof scale === "undefined" || scale === null) {
					$el.transform(`translate3d(${x}, ${y}, 0px)`);
				} else {
					const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
					$el.transform(`translate3d(${x}, ${y}, 0px) scale(${currentScale})`);
				}
			};

			const setTranslate = () => {
				const { $el, slides, progress, snapGrid } = swiper;
				$el.children(
					"[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
				).each((el) => {
					setTransform(el, progress);
				});
				slides.each((slideEl, slideIndex) => {
					let slideProgress = slideEl.progress;

					if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== "auto") {
						slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
					}

					slideProgress = Math.min(Math.max(slideProgress, -1), 1);
					$(slideEl)
						.find(
							"[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
						)
						.each((el) => {
							setTransform(el, slideProgress);
						});
				});
			};

			const setTransition = (duration = swiper.params.speed) => {
				const { $el } = swiper;
				$el.find(
					"[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
				).each((parallaxEl) => {
					const $parallaxEl = $(parallaxEl);
					let parallaxDuration = parseInt($parallaxEl.attr("data-swiper-parallax-duration"), 10) || duration;
					if (duration === 0) parallaxDuration = 0;
					$parallaxEl.transition(parallaxDuration);
				});
			};

			on("beforeInit", () => {
				if (!swiper.params.parallax.enabled) return;
				swiper.params.watchSlidesProgress = true;
				swiper.originalParams.watchSlidesProgress = true;
			});
			on("init", () => {
				if (!swiper.params.parallax.enabled) return;
				setTranslate();
			});
			on("setTranslate", () => {
				if (!swiper.params.parallax.enabled) return;
				setTranslate();
			});
			on("setTransition", (_swiper, duration) => {
				if (!swiper.params.parallax.enabled) return;
				setTransition(duration);
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/zoom/zoom.js
		function Zoom({ swiper, extendParams, on, emit }) {
			const window = getWindow();
			extendParams({
				zoom: {
					enabled: false,
					maxRatio: 3,
					minRatio: 1,
					toggle: true,
					containerClass: "swiper-zoom-container",
					zoomedSlideClass: "swiper-slide-zoomed",
				},
			});
			swiper.zoom = {
				enabled: false,
			};
			let currentScale = 1;
			let isScaling = false;
			let gesturesEnabled;
			let fakeGestureTouched;
			let fakeGestureMoved;
			const gesture = {
				$slideEl: undefined,
				slideWidth: undefined,
				slideHeight: undefined,
				$imageEl: undefined,
				$imageWrapEl: undefined,
				maxRatio: 3,
			};
			const image = {
				isTouched: undefined,
				isMoved: undefined,
				currentX: undefined,
				currentY: undefined,
				minX: undefined,
				minY: undefined,
				maxX: undefined,
				maxY: undefined,
				width: undefined,
				height: undefined,
				startX: undefined,
				startY: undefined,
				touchesStart: {},
				touchesCurrent: {},
			};
			const velocity = {
				x: undefined,
				y: undefined,
				prevPositionX: undefined,
				prevPositionY: undefined,
				prevTime: undefined,
			};
			let scale = 1;
			Object.defineProperty(swiper.zoom, "scale", {
				get() {
					return scale;
				},

				set(value) {
					if (scale !== value) {
						const imageEl = gesture.$imageEl ? gesture.$imageEl[0] : undefined;
						const slideEl = gesture.$slideEl ? gesture.$slideEl[0] : undefined;
						emit("zoomChange", value, imageEl, slideEl);
					}

					scale = value;
				},
			});

			function getDistanceBetweenTouches(e) {
				if (e.targetTouches.length < 2) return 1;
				const x1 = e.targetTouches[0].pageX;
				const y1 = e.targetTouches[0].pageY;
				const x2 = e.targetTouches[1].pageX;
				const y2 = e.targetTouches[1].pageY;
				const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
				return distance;
			} // Events

			function onGestureStart(e) {
				const support = swiper.support;
				const params = swiper.params.zoom;
				fakeGestureTouched = false;
				fakeGestureMoved = false;

				if (!support.gestures) {
					if (e.type !== "touchstart" || (e.type === "touchstart" && e.targetTouches.length < 2)) {
						return;
					}

					fakeGestureTouched = true;
					gesture.scaleStart = getDistanceBetweenTouches(e);
				}

				if (!gesture.$slideEl || !gesture.$slideEl.length) {
					gesture.$slideEl = $(e.target).closest(`.${swiper.params.slideClass}`);
					if (gesture.$slideEl.length === 0) gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
					gesture.$imageEl = gesture.$slideEl
						.find(`.${params.containerClass}`)
						.eq(0)
						.find("picture, img, svg, canvas, .swiper-zoom-target")
						.eq(0);
					gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
					gesture.maxRatio = gesture.$imageWrapEl.attr("data-swiper-zoom") || params.maxRatio;

					if (gesture.$imageWrapEl.length === 0) {
						gesture.$imageEl = undefined;
						return;
					}
				}

				if (gesture.$imageEl) {
					gesture.$imageEl.transition(0);
				}

				isScaling = true;
			}

			function onGestureChange(e) {
				const support = swiper.support;
				const params = swiper.params.zoom;
				const zoom = swiper.zoom;

				if (!support.gestures) {
					if (e.type !== "touchmove" || (e.type === "touchmove" && e.targetTouches.length < 2)) {
						return;
					}

					fakeGestureMoved = true;
					gesture.scaleMove = getDistanceBetweenTouches(e);
				}

				if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
					if (e.type === "gesturechange") onGestureStart(e);
					return;
				}

				if (support.gestures) {
					zoom.scale = e.scale * currentScale;
				} else {
					zoom.scale = (gesture.scaleMove / gesture.scaleStart) * currentScale;
				}

				if (zoom.scale > gesture.maxRatio) {
					zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
				}

				if (zoom.scale < params.minRatio) {
					zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
				}

				gesture.$imageEl.transform(`translate3d(0,0,0) scale(${zoom.scale})`);
			}

			function onGestureEnd(e) {
				const device = swiper.device;
				const support = swiper.support;
				const params = swiper.params.zoom;
				const zoom = swiper.zoom;

				if (!support.gestures) {
					if (!fakeGestureTouched || !fakeGestureMoved) {
						return;
					}

					if (
						e.type !== "touchend" ||
						(e.type === "touchend" && e.changedTouches.length < 2 && !device.android)
					) {
						return;
					}

					fakeGestureTouched = false;
					fakeGestureMoved = false;
				}

				if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
				zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
				gesture.$imageEl.transition(swiper.params.speed).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
				currentScale = zoom.scale;
				isScaling = false;
				if (zoom.scale === 1) gesture.$slideEl = undefined;
			}

			function onTouchStart(e) {
				const device = swiper.device;
				if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
				if (image.isTouched) return;
				if (device.android && e.cancelable) e.preventDefault();
				image.isTouched = true;
				image.touchesStart.x = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
				image.touchesStart.y = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;
			}

			function onTouchMove(e) {
				const zoom = swiper.zoom;
				if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
				swiper.allowClick = false;
				if (!image.isTouched || !gesture.$slideEl) return;

				if (!image.isMoved) {
					image.width = gesture.$imageEl[0].offsetWidth;
					image.height = gesture.$imageEl[0].offsetHeight;
					image.startX = getTranslate(gesture.$imageWrapEl[0], "x") || 0;
					image.startY = getTranslate(gesture.$imageWrapEl[0], "y") || 0;
					gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
					gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
					gesture.$imageWrapEl.transition(0);
				} // Define if we need image drag

				const scaledWidth = image.width * zoom.scale;
				const scaledHeight = image.height * zoom.scale;
				if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
				image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
				image.maxX = -image.minX;
				image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
				image.maxY = -image.minY;
				image.touchesCurrent.x = e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX;
				image.touchesCurrent.y = e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;

				if (!image.isMoved && !isScaling) {
					if (
						swiper.isHorizontal() &&
						((Math.floor(image.minX) === Math.floor(image.startX) &&
							image.touchesCurrent.x < image.touchesStart.x) ||
							(Math.floor(image.maxX) === Math.floor(image.startX) &&
								image.touchesCurrent.x > image.touchesStart.x))
					) {
						image.isTouched = false;
						return;
					}

					if (
						!swiper.isHorizontal() &&
						((Math.floor(image.minY) === Math.floor(image.startY) &&
							image.touchesCurrent.y < image.touchesStart.y) ||
							(Math.floor(image.maxY) === Math.floor(image.startY) &&
								image.touchesCurrent.y > image.touchesStart.y))
					) {
						image.isTouched = false;
						return;
					}
				}

				if (e.cancelable) {
					e.preventDefault();
				}

				e.stopPropagation();
				image.isMoved = true;
				image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
				image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;

				if (image.currentX < image.minX) {
					image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
				}

				if (image.currentX > image.maxX) {
					image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
				}

				if (image.currentY < image.minY) {
					image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
				}

				if (image.currentY > image.maxY) {
					image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
				} // Velocity

				if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
				if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
				if (!velocity.prevTime) velocity.prevTime = Date.now();
				velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
				velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
				if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
				if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
				velocity.prevPositionX = image.touchesCurrent.x;
				velocity.prevPositionY = image.touchesCurrent.y;
				velocity.prevTime = Date.now();
				gesture.$imageWrapEl.transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
			}

			function onTouchEnd() {
				const zoom = swiper.zoom;
				if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;

				if (!image.isTouched || !image.isMoved) {
					image.isTouched = false;
					image.isMoved = false;
					return;
				}

				image.isTouched = false;
				image.isMoved = false;
				let momentumDurationX = 300;
				let momentumDurationY = 300;
				const momentumDistanceX = velocity.x * momentumDurationX;
				const newPositionX = image.currentX + momentumDistanceX;
				const momentumDistanceY = velocity.y * momentumDurationY;
				const newPositionY = image.currentY + momentumDistanceY; // Fix duration

				if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
				if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
				const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
				image.currentX = newPositionX;
				image.currentY = newPositionY; // Define if we need image drag

				const scaledWidth = image.width * zoom.scale;
				const scaledHeight = image.height * zoom.scale;
				image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
				image.maxX = -image.minX;
				image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
				image.maxY = -image.minY;
				image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
				image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
				gesture.$imageWrapEl
					.transition(momentumDuration)
					.transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
			}

			function onTransitionEnd() {
				const zoom = swiper.zoom;

				if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
					if (gesture.$imageEl) {
						gesture.$imageEl.transform("translate3d(0,0,0) scale(1)");
					}

					if (gesture.$imageWrapEl) {
						gesture.$imageWrapEl.transform("translate3d(0,0,0)");
					}

					zoom.scale = 1;
					currentScale = 1;
					gesture.$slideEl = undefined;
					gesture.$imageEl = undefined;
					gesture.$imageWrapEl = undefined;
				}
			}

			function zoomIn(e) {
				const zoom = swiper.zoom;
				const params = swiper.params.zoom;

				if (!gesture.$slideEl) {
					if (e && e.target) {
						gesture.$slideEl = $(e.target).closest(`.${swiper.params.slideClass}`);
					}

					if (!gesture.$slideEl) {
						if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
							gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
						} else {
							gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
						}
					}

					gesture.$imageEl = gesture.$slideEl
						.find(`.${params.containerClass}`)
						.eq(0)
						.find("picture, img, svg, canvas, .swiper-zoom-target")
						.eq(0);
					gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
				}

				if (
					!gesture.$imageEl ||
					gesture.$imageEl.length === 0 ||
					!gesture.$imageWrapEl ||
					gesture.$imageWrapEl.length === 0
				)
					return;

				if (swiper.params.cssMode) {
					swiper.wrapperEl.style.overflow = "hidden";
					swiper.wrapperEl.style.touchAction = "none";
				}

				gesture.$slideEl.addClass(`${params.zoomedSlideClass}`);
				let touchX;
				let touchY;
				let offsetX;
				let offsetY;
				let diffX;
				let diffY;
				let translateX;
				let translateY;
				let imageWidth;
				let imageHeight;
				let scaledWidth;
				let scaledHeight;
				let translateMinX;
				let translateMinY;
				let translateMaxX;
				let translateMaxY;
				let slideWidth;
				let slideHeight;

				if (typeof image.touchesStart.x === "undefined" && e) {
					touchX = e.type === "touchend" ? e.changedTouches[0].pageX : e.pageX;
					touchY = e.type === "touchend" ? e.changedTouches[0].pageY : e.pageY;
				} else {
					touchX = image.touchesStart.x;
					touchY = image.touchesStart.y;
				}

				zoom.scale = gesture.$imageWrapEl.attr("data-swiper-zoom") || params.maxRatio;
				currentScale = gesture.$imageWrapEl.attr("data-swiper-zoom") || params.maxRatio;

				if (e) {
					slideWidth = gesture.$slideEl[0].offsetWidth;
					slideHeight = gesture.$slideEl[0].offsetHeight;
					offsetX = gesture.$slideEl.offset().left + window.scrollX;
					offsetY = gesture.$slideEl.offset().top + window.scrollY;
					diffX = offsetX + slideWidth / 2 - touchX;
					diffY = offsetY + slideHeight / 2 - touchY;
					imageWidth = gesture.$imageEl[0].offsetWidth;
					imageHeight = gesture.$imageEl[0].offsetHeight;
					scaledWidth = imageWidth * zoom.scale;
					scaledHeight = imageHeight * zoom.scale;
					translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
					translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
					translateMaxX = -translateMinX;
					translateMaxY = -translateMinY;
					translateX = diffX * zoom.scale;
					translateY = diffY * zoom.scale;

					if (translateX < translateMinX) {
						translateX = translateMinX;
					}

					if (translateX > translateMaxX) {
						translateX = translateMaxX;
					}

					if (translateY < translateMinY) {
						translateY = translateMinY;
					}

					if (translateY > translateMaxY) {
						translateY = translateMaxY;
					}
				} else {
					translateX = 0;
					translateY = 0;
				}

				gesture.$imageWrapEl.transition(300).transform(`translate3d(${translateX}px, ${translateY}px,0)`);
				gesture.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
			}

			function zoomOut() {
				const zoom = swiper.zoom;
				const params = swiper.params.zoom;

				if (!gesture.$slideEl) {
					if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
						gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
					} else {
						gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
					}

					gesture.$imageEl = gesture.$slideEl
						.find(`.${params.containerClass}`)
						.eq(0)
						.find("picture, img, svg, canvas, .swiper-zoom-target")
						.eq(0);
					gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
				}

				if (
					!gesture.$imageEl ||
					gesture.$imageEl.length === 0 ||
					!gesture.$imageWrapEl ||
					gesture.$imageWrapEl.length === 0
				)
					return;

				if (swiper.params.cssMode) {
					swiper.wrapperEl.style.overflow = "";
					swiper.wrapperEl.style.touchAction = "";
				}

				zoom.scale = 1;
				currentScale = 1;
				gesture.$imageWrapEl.transition(300).transform("translate3d(0,0,0)");
				gesture.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)");
				gesture.$slideEl.removeClass(`${params.zoomedSlideClass}`);
				gesture.$slideEl = undefined;
			} // Toggle Zoom

			function zoomToggle(e) {
				const zoom = swiper.zoom;

				if (zoom.scale && zoom.scale !== 1) {
					// Zoom Out
					zoomOut();
				} else {
					// Zoom In
					zoomIn(e);
				}
			}

			function getListeners() {
				const support = swiper.support;
				const passiveListener =
					swiper.touchEvents.start === "touchstart" &&
					support.passiveListener &&
					swiper.params.passiveListeners
						? {
								passive: true,
								capture: false,
						  }
						: false;
				const activeListenerWithCapture = support.passiveListener
					? {
							passive: false,
							capture: true,
					  }
					: true;
				return {
					passiveListener,
					activeListenerWithCapture,
				};
			}

			function getSlideSelector() {
				return `.${swiper.params.slideClass}`;
			}

			function toggleGestures(method) {
				const { passiveListener } = getListeners();
				const slideSelector = getSlideSelector();
				swiper.$wrapperEl[method]("gesturestart", slideSelector, onGestureStart, passiveListener);
				swiper.$wrapperEl[method]("gesturechange", slideSelector, onGestureChange, passiveListener);
				swiper.$wrapperEl[method]("gestureend", slideSelector, onGestureEnd, passiveListener);
			}

			function enableGestures() {
				if (gesturesEnabled) return;
				gesturesEnabled = true;
				toggleGestures("on");
			}

			function disableGestures() {
				if (!gesturesEnabled) return;
				gesturesEnabled = false;
				toggleGestures("off");
			} // Attach/Detach Events

			function enable() {
				const zoom = swiper.zoom;
				if (zoom.enabled) return;
				zoom.enabled = true;
				const support = swiper.support;
				const { passiveListener, activeListenerWithCapture } = getListeners();
				const slideSelector = getSlideSelector(); // Scale image

				if (support.gestures) {
					swiper.$wrapperEl.on(swiper.touchEvents.start, enableGestures, passiveListener);
					swiper.$wrapperEl.on(swiper.touchEvents.end, disableGestures, passiveListener);
				} else if (swiper.touchEvents.start === "touchstart") {
					swiper.$wrapperEl.on(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);
					swiper.$wrapperEl.on(
						swiper.touchEvents.move,
						slideSelector,
						onGestureChange,
						activeListenerWithCapture
					);
					swiper.$wrapperEl.on(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);

					if (swiper.touchEvents.cancel) {
						swiper.$wrapperEl.on(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);
					}
				} // Move image

				swiper.$wrapperEl.on(
					swiper.touchEvents.move,
					`.${swiper.params.zoom.containerClass}`,
					onTouchMove,
					activeListenerWithCapture
				);
			}

			function disable() {
				const zoom = swiper.zoom;
				if (!zoom.enabled) return;
				const support = swiper.support;
				zoom.enabled = false;
				const { passiveListener, activeListenerWithCapture } = getListeners();
				const slideSelector = getSlideSelector(); // Scale image

				if (support.gestures) {
					swiper.$wrapperEl.off(swiper.touchEvents.start, enableGestures, passiveListener);
					swiper.$wrapperEl.off(swiper.touchEvents.end, disableGestures, passiveListener);
				} else if (swiper.touchEvents.start === "touchstart") {
					swiper.$wrapperEl.off(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);
					swiper.$wrapperEl.off(
						swiper.touchEvents.move,
						slideSelector,
						onGestureChange,
						activeListenerWithCapture
					);
					swiper.$wrapperEl.off(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);

					if (swiper.touchEvents.cancel) {
						swiper.$wrapperEl.off(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);
					}
				} // Move image

				swiper.$wrapperEl.off(
					swiper.touchEvents.move,
					`.${swiper.params.zoom.containerClass}`,
					onTouchMove,
					activeListenerWithCapture
				);
			}

			on("init", () => {
				if (swiper.params.zoom.enabled) {
					enable();
				}
			});
			on("destroy", () => {
				disable();
			});
			on("touchStart", (_s, e) => {
				if (!swiper.zoom.enabled) return;
				onTouchStart(e);
			});
			on("touchEnd", (_s, e) => {
				if (!swiper.zoom.enabled) return;
				onTouchEnd(e);
			});
			on("doubleTap", (_s, e) => {
				if (
					!swiper.animating &&
					swiper.params.zoom.enabled &&
					swiper.zoom.enabled &&
					swiper.params.zoom.toggle
				) {
					zoomToggle(e);
				}
			});
			on("transitionEnd", () => {
				if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
					onTransitionEnd();
				}
			});
			on("slideChange", () => {
				if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
					onTransitionEnd();
				}
			});
			Object.assign(swiper.zoom, {
				enable,
				disable,
				in: zoomIn,
				out: zoomOut,
				toggle: zoomToggle,
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/lazy/lazy.js
		function Lazy({ swiper, extendParams, on, emit }) {
			extendParams({
				lazy: {
					checkInView: false,
					enabled: false,
					loadPrevNext: false,
					loadPrevNextAmount: 1,
					loadOnTransitionStart: false,
					scrollingElement: "",
					elementClass: "swiper-lazy",
					loadingClass: "swiper-lazy-loading",
					loadedClass: "swiper-lazy-loaded",
					preloaderClass: "swiper-lazy-preloader",
				},
			});
			swiper.lazy = {};
			let scrollHandlerAttached = false;
			let initialImageLoaded = false;

			function loadInSlide(index, loadInDuplicate = true) {
				const params = swiper.params.lazy;
				if (typeof index === "undefined") return;
				if (swiper.slides.length === 0) return;
				const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
				const $slideEl = isVirtual
					? swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-swiper-slide-index="${index}"]`)
					: swiper.slides.eq(index);
				const $images = $slideEl.find(
					`.${params.elementClass}:not(.${params.loadedClass}):not(.${params.loadingClass})`
				);

				if (
					$slideEl.hasClass(params.elementClass) &&
					!$slideEl.hasClass(params.loadedClass) &&
					!$slideEl.hasClass(params.loadingClass)
				) {
					$images.push($slideEl[0]);
				}

				if ($images.length === 0) return;
				$images.each((imageEl) => {
					const $imageEl = $(imageEl);
					$imageEl.addClass(params.loadingClass);
					const background = $imageEl.attr("data-background");
					const src = $imageEl.attr("data-src");
					const srcset = $imageEl.attr("data-srcset");
					const sizes = $imageEl.attr("data-sizes");
					const $pictureEl = $imageEl.parent("picture");
					swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, () => {
						if (
							typeof swiper === "undefined" ||
							swiper === null ||
							!swiper ||
							(swiper && !swiper.params) ||
							swiper.destroyed
						)
							return;

						if (background) {
							$imageEl.css("background-image", `url("${background}")`);
							$imageEl.removeAttr("data-background");
						} else {
							if (srcset) {
								$imageEl.attr("srcset", srcset);
								$imageEl.removeAttr("data-srcset");
							}

							if (sizes) {
								$imageEl.attr("sizes", sizes);
								$imageEl.removeAttr("data-sizes");
							}

							if ($pictureEl.length) {
								$pictureEl.children("source").each((sourceEl) => {
									const $source = $(sourceEl);

									if ($source.attr("data-srcset")) {
										$source.attr("srcset", $source.attr("data-srcset"));
										$source.removeAttr("data-srcset");
									}
								});
							}

							if (src) {
								$imageEl.attr("src", src);
								$imageEl.removeAttr("data-src");
							}
						}

						$imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
						$slideEl.find(`.${params.preloaderClass}`).remove();

						if (swiper.params.loop && loadInDuplicate) {
							const slideOriginalIndex = $slideEl.attr("data-swiper-slide-index");

							if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
								const originalSlide = swiper.$wrapperEl.children(
									`[data-swiper-slide-index="${slideOriginalIndex}"]:not(.${swiper.params.slideDuplicateClass})`
								);
								loadInSlide(originalSlide.index(), false);
							} else {
								const duplicatedSlide = swiper.$wrapperEl.children(
									`.${swiper.params.slideDuplicateClass}[data-swiper-slide-index="${slideOriginalIndex}"]`
								);
								loadInSlide(duplicatedSlide.index(), false);
							}
						}

						emit("lazyImageReady", $slideEl[0], $imageEl[0]);

						if (swiper.params.autoHeight) {
							swiper.updateAutoHeight();
						}
					});
					emit("lazyImageLoad", $slideEl[0], $imageEl[0]);
				});
			}

			function load() {
				const { $wrapperEl, params: swiperParams, slides, activeIndex } = swiper;
				const isVirtual = swiper.virtual && swiperParams.virtual.enabled;
				const params = swiperParams.lazy;
				let slidesPerView = swiperParams.slidesPerView;

				if (slidesPerView === "auto") {
					slidesPerView = 0;
				}

				function slideExist(index) {
					if (isVirtual) {
						if (
							$wrapperEl.children(`.${swiperParams.slideClass}[data-swiper-slide-index="${index}"]`)
								.length
						) {
							return true;
						}
					} else if (slides[index]) return true;

					return false;
				}

				function slideIndex(slideEl) {
					if (isVirtual) {
						return $(slideEl).attr("data-swiper-slide-index");
					}

					return $(slideEl).index();
				}

				if (!initialImageLoaded) initialImageLoaded = true;

				if (swiper.params.watchSlidesProgress) {
					$wrapperEl.children(`.${swiperParams.slideVisibleClass}`).each((slideEl) => {
						const index = isVirtual ? $(slideEl).attr("data-swiper-slide-index") : $(slideEl).index();
						loadInSlide(index);
					});
				} else if (slidesPerView > 1) {
					for (let i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
						if (slideExist(i)) loadInSlide(i);
					}
				} else {
					loadInSlide(activeIndex);
				}

				if (params.loadPrevNext) {
					if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
						const amount = params.loadPrevNextAmount;
						const spv = slidesPerView;
						const maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
						const minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides

						for (let i = activeIndex + slidesPerView; i < maxIndex; i += 1) {
							if (slideExist(i)) loadInSlide(i);
						} // Prev Slides

						for (let i = minIndex; i < activeIndex; i += 1) {
							if (slideExist(i)) loadInSlide(i);
						}
					} else {
						const nextSlide = $wrapperEl.children(`.${swiperParams.slideNextClass}`);
						if (nextSlide.length > 0) loadInSlide(slideIndex(nextSlide));
						const prevSlide = $wrapperEl.children(`.${swiperParams.slidePrevClass}`);
						if (prevSlide.length > 0) loadInSlide(slideIndex(prevSlide));
					}
				}
			}

			function checkInViewOnLoad() {
				const window = getWindow();
				if (!swiper || swiper.destroyed) return;
				const $scrollElement = swiper.params.lazy.scrollingElement
					? $(swiper.params.lazy.scrollingElement)
					: $(window);
				const isWindow = $scrollElement[0] === window;
				const scrollElementWidth = isWindow ? window.innerWidth : $scrollElement[0].offsetWidth;
				const scrollElementHeight = isWindow ? window.innerHeight : $scrollElement[0].offsetHeight;
				const swiperOffset = swiper.$el.offset();
				const { rtlTranslate: rtl } = swiper;
				let inView = false;
				if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
				const swiperCoord = [
					[swiperOffset.left, swiperOffset.top],
					[swiperOffset.left + swiper.width, swiperOffset.top],
					[swiperOffset.left, swiperOffset.top + swiper.height],
					[swiperOffset.left + swiper.width, swiperOffset.top + swiper.height],
				];

				for (let i = 0; i < swiperCoord.length; i += 1) {
					const point = swiperCoord[i];

					if (
						point[0] >= 0 &&
						point[0] <= scrollElementWidth &&
						point[1] >= 0 &&
						point[1] <= scrollElementHeight
					) {
						if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

						inView = true;
					}
				}

				const passiveListener =
					swiper.touchEvents.start === "touchstart" &&
					swiper.support.passiveListener &&
					swiper.params.passiveListeners
						? {
								passive: true,
								capture: false,
						  }
						: false;

				if (inView) {
					load();
					$scrollElement.off("scroll", checkInViewOnLoad, passiveListener);
				} else if (!scrollHandlerAttached) {
					scrollHandlerAttached = true;
					$scrollElement.on("scroll", checkInViewOnLoad, passiveListener);
				}
			}

			on("beforeInit", () => {
				if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
					swiper.params.preloadImages = false;
				}
			});
			on("init", () => {
				if (swiper.params.lazy.enabled) {
					if (swiper.params.lazy.checkInView) {
						checkInViewOnLoad();
					} else {
						load();
					}
				}
			});
			on("scroll", () => {
				if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.freeMode.sticky) {
					load();
				}
			});
			on("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
				if (swiper.params.lazy.enabled) {
					if (swiper.params.lazy.checkInView) {
						checkInViewOnLoad();
					} else {
						load();
					}
				}
			});
			on("transitionStart", () => {
				if (swiper.params.lazy.enabled) {
					if (
						swiper.params.lazy.loadOnTransitionStart ||
						(!swiper.params.lazy.loadOnTransitionStart && !initialImageLoaded)
					) {
						if (swiper.params.lazy.checkInView) {
							checkInViewOnLoad();
						} else {
							load();
						}
					}
				}
			});
			on("transitionEnd", () => {
				if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
					if (swiper.params.lazy.checkInView) {
						checkInViewOnLoad();
					} else {
						load();
					}
				}
			});
			on("slideChange", () => {
				const { lazy, cssMode, watchSlidesProgress, touchReleaseOnEdges, resistanceRatio } = swiper.params;

				if (
					lazy.enabled &&
					(cssMode || (watchSlidesProgress && (touchReleaseOnEdges || resistanceRatio === 0)))
				) {
					load();
				}
			});
			Object.assign(swiper.lazy, {
				load,
				loadInSlide,
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/controller/controller.js
		/* eslint no-bitwise: ["error", { "allow": [">>"] }] */

		function Controller({ swiper, extendParams, on }) {
			extendParams({
				controller: {
					control: undefined,
					inverse: false,
					by: "slide", // or 'container'
				},
			});
			swiper.controller = {
				control: undefined,
			};

			function LinearSpline(x, y) {
				const binarySearch = (function search() {
					let maxIndex;
					let minIndex;
					let guess;
					return (array, val) => {
						minIndex = -1;
						maxIndex = array.length;

						while (maxIndex - minIndex > 1) {
							guess = (maxIndex + minIndex) >> 1;

							if (array[guess] <= val) {
								minIndex = guess;
							} else {
								maxIndex = guess;
							}
						}

						return maxIndex;
					};
				})();

				this.x = x;
				this.y = y;
				this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:
				// (x1,y1) is the known point before given value,
				// (x3,y3) is the known point after given value.

				let i1;
				let i3;

				this.interpolate = function interpolate(x2) {
					if (!x2) return 0; // Get the indexes of x1 and x3 (the array indexes before and after given x2):

					i3 = binarySearch(this.x, x2);
					i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:
					// y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1

					return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
				};

				return this;
			} // xxx: for now i will just save one spline function to to

			function getInterpolateFunction(c) {
				if (!swiper.controller.spline) {
					swiper.controller.spline = swiper.params.loop
						? new LinearSpline(swiper.slidesGrid, c.slidesGrid)
						: new LinearSpline(swiper.snapGrid, c.snapGrid);
				}
			}

			function setTranslate(_t, byController) {
				const controlled = swiper.controller.control;
				let multiplier;
				let controlledTranslate;
				const Swiper = swiper.constructor;

				function setControlledTranslate(c) {
					// this will create an Interpolate function based on the snapGrids
					// x is the Grid of the scrolled scroller and y will be the controlled scroller
					// it makes sense to create this only once and recall it for the interpolation
					// the function does a lot of value caching for performance
					const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;

					if (swiper.params.controller.by === "slide") {
						getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
						// but it did not work out

						controlledTranslate = -swiper.controller.spline.interpolate(-translate);
					}

					if (!controlledTranslate || swiper.params.controller.by === "container") {
						multiplier =
							(c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
						controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
					}

					if (swiper.params.controller.inverse) {
						controlledTranslate = c.maxTranslate() - controlledTranslate;
					}

					c.updateProgress(controlledTranslate);
					c.setTranslate(controlledTranslate, swiper);
					c.updateActiveIndex();
					c.updateSlidesClasses();
				}

				if (Array.isArray(controlled)) {
					for (let i = 0; i < controlled.length; i += 1) {
						if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
							setControlledTranslate(controlled[i]);
						}
					}
				} else if (controlled instanceof Swiper && byController !== controlled) {
					setControlledTranslate(controlled);
				}
			}

			function setTransition(duration, byController) {
				const Swiper = swiper.constructor;
				const controlled = swiper.controller.control;
				let i;

				function setControlledTransition(c) {
					c.setTransition(duration, swiper);

					if (duration !== 0) {
						c.transitionStart();

						if (c.params.autoHeight) {
							nextTick(() => {
								c.updateAutoHeight();
							});
						}

						c.$wrapperEl.transitionEnd(() => {
							if (!controlled) return;

							if (c.params.loop && swiper.params.controller.by === "slide") {
								c.loopFix();
							}

							c.transitionEnd();
						});
					}
				}

				if (Array.isArray(controlled)) {
					for (i = 0; i < controlled.length; i += 1) {
						if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
							setControlledTransition(controlled[i]);
						}
					}
				} else if (controlled instanceof Swiper && byController !== controlled) {
					setControlledTransition(controlled);
				}
			}

			function removeSpline() {
				if (!swiper.controller.control) return;

				if (swiper.controller.spline) {
					swiper.controller.spline = undefined;
					delete swiper.controller.spline;
				}
			}

			on("beforeInit", () => {
				swiper.controller.control = swiper.params.controller.control;
			});
			on("update", () => {
				removeSpline();
			});
			on("resize", () => {
				removeSpline();
			});
			on("observerUpdate", () => {
				removeSpline();
			});
			on("setTranslate", (_s, translate, byController) => {
				if (!swiper.controller.control) return;
				swiper.controller.setTranslate(translate, byController);
			});
			on("setTransition", (_s, duration, byController) => {
				if (!swiper.controller.control) return;
				swiper.controller.setTransition(duration, byController);
			});
			Object.assign(swiper.controller, {
				setTranslate,
				setTransition,
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/a11y/a11y.js
		function A11y({ swiper, extendParams, on }) {
			extendParams({
				a11y: {
					enabled: true,
					notificationClass: "swiper-notification",
					prevSlideMessage: "Previous slide",
					nextSlideMessage: "Next slide",
					firstSlideMessage: "This is the first slide",
					lastSlideMessage: "This is the last slide",
					paginationBulletMessage: "Go to slide {{index}}",
					slideLabelMessage: "{{index}} / {{slidesLength}}",
					containerMessage: null,
					containerRoleDescriptionMessage: null,
					itemRoleDescriptionMessage: null,
					slideRole: "group",
				},
			});
			let liveRegion = null;

			function notify(message) {
				const notification = liveRegion;
				if (notification.length === 0) return;
				notification.html("");
				notification.html(message);
			}

			function getRandomNumber(size = 16) {
				const randomChar = () => Math.round(16 * Math.random()).toString(16);

				return "x".repeat(size).replace(/x/g, randomChar);
			}

			function makeElFocusable($el) {
				$el.attr("tabIndex", "0");
			}

			function makeElNotFocusable($el) {
				$el.attr("tabIndex", "-1");
			}

			function addElRole($el, role) {
				$el.attr("role", role);
			}

			function addElRoleDescription($el, description) {
				$el.attr("aria-roledescription", description);
			}

			function addElControls($el, controls) {
				$el.attr("aria-controls", controls);
			}

			function addElLabel($el, label) {
				$el.attr("aria-label", label);
			}

			function addElId($el, id) {
				$el.attr("id", id);
			}

			function addElLive($el, live) {
				$el.attr("aria-live", live);
			}

			function disableEl($el) {
				$el.attr("aria-disabled", true);
			}

			function enableEl($el) {
				$el.attr("aria-disabled", false);
			}

			function onEnterOrSpaceKey(e) {
				if (e.keyCode !== 13 && e.keyCode !== 32) return;
				const params = swiper.params.a11y;
				const $targetEl = $(e.target);

				if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
					if (!(swiper.isEnd && !swiper.params.loop)) {
						swiper.slideNext();
					}

					if (swiper.isEnd) {
						notify(params.lastSlideMessage);
					} else {
						notify(params.nextSlideMessage);
					}
				}

				if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
					if (!(swiper.isBeginning && !swiper.params.loop)) {
						swiper.slidePrev();
					}

					if (swiper.isBeginning) {
						notify(params.firstSlideMessage);
					} else {
						notify(params.prevSlideMessage);
					}
				}

				if (swiper.pagination && $targetEl.is(classesToSelector(swiper.params.pagination.bulletClass))) {
					$targetEl[0].click();
				}
			}

			function updateNavigation() {
				if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
				const { $nextEl, $prevEl } = swiper.navigation;

				if ($prevEl && $prevEl.length > 0) {
					if (swiper.isBeginning) {
						disableEl($prevEl);
						makeElNotFocusable($prevEl);
					} else {
						enableEl($prevEl);
						makeElFocusable($prevEl);
					}
				}

				if ($nextEl && $nextEl.length > 0) {
					if (swiper.isEnd) {
						disableEl($nextEl);
						makeElNotFocusable($nextEl);
					} else {
						enableEl($nextEl);
						makeElFocusable($nextEl);
					}
				}
			}

			function hasPagination() {
				return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
			}

			function hasClickablePagination() {
				return hasPagination() && swiper.params.pagination.clickable;
			}

			function updatePagination() {
				const params = swiper.params.a11y;
				if (!hasPagination()) return;
				swiper.pagination.bullets.each((bulletEl) => {
					const $bulletEl = $(bulletEl);

					if (swiper.params.pagination.clickable) {
						makeElFocusable($bulletEl);

						if (!swiper.params.pagination.renderBullet) {
							addElRole($bulletEl, "button");
							addElLabel(
								$bulletEl,
								params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1)
							);
						}
					}

					if ($bulletEl.is(`.${swiper.params.pagination.bulletActiveClass}`)) {
						$bulletEl.attr("aria-current", "true");
					} else {
						$bulletEl.removeAttr("aria-current");
					}
				});
			}

			const initNavEl = ($el, wrapperId, message) => {
				makeElFocusable($el);

				if ($el[0].tagName !== "BUTTON") {
					addElRole($el, "button");
					$el.on("keydown", onEnterOrSpaceKey);
				}

				addElLabel($el, message);
				addElControls($el, wrapperId);
			};

			function init() {
				const params = swiper.params.a11y;
				swiper.$el.append(liveRegion); // Container

				const $containerEl = swiper.$el;

				if (params.containerRoleDescriptionMessage) {
					addElRoleDescription($containerEl, params.containerRoleDescriptionMessage);
				}

				if (params.containerMessage) {
					addElLabel($containerEl, params.containerMessage);
				} // Wrapper

				const $wrapperEl = swiper.$wrapperEl;
				const wrapperId = $wrapperEl.attr("id") || `swiper-wrapper-${getRandomNumber(16)}`;
				const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? "off" : "polite";
				addElId($wrapperEl, wrapperId);
				addElLive($wrapperEl, live); // Slide

				if (params.itemRoleDescriptionMessage) {
					addElRoleDescription($(swiper.slides), params.itemRoleDescriptionMessage);
				}

				addElRole($(swiper.slides), params.slideRole);
				const slidesLength = swiper.params.loop
					? swiper.slides.filter((el) => !el.classList.contains(swiper.params.slideDuplicateClass)).length
					: swiper.slides.length;
				swiper.slides.each((slideEl, index) => {
					const $slideEl = $(slideEl);
					const slideIndex = swiper.params.loop
						? parseInt($slideEl.attr("data-swiper-slide-index"), 10)
						: index;
					const ariaLabelMessage = params.slideLabelMessage
						.replace(/\{\{index\}\}/, slideIndex + 1)
						.replace(/\{\{slidesLength\}\}/, slidesLength);
					addElLabel($slideEl, ariaLabelMessage);
				}); // Navigation

				let $nextEl;
				let $prevEl;

				if (swiper.navigation && swiper.navigation.$nextEl) {
					$nextEl = swiper.navigation.$nextEl;
				}

				if (swiper.navigation && swiper.navigation.$prevEl) {
					$prevEl = swiper.navigation.$prevEl;
				}

				if ($nextEl && $nextEl.length) {
					initNavEl($nextEl, wrapperId, params.nextSlideMessage);
				}

				if ($prevEl && $prevEl.length) {
					initNavEl($prevEl, wrapperId, params.prevSlideMessage);
				} // Pagination

				if (hasClickablePagination()) {
					swiper.pagination.$el.on(
						"keydown",
						classesToSelector(swiper.params.pagination.bulletClass),
						onEnterOrSpaceKey
					);
				}
			}

			function destroy() {
				if (liveRegion && liveRegion.length > 0) liveRegion.remove();
				let $nextEl;
				let $prevEl;

				if (swiper.navigation && swiper.navigation.$nextEl) {
					$nextEl = swiper.navigation.$nextEl;
				}

				if (swiper.navigation && swiper.navigation.$prevEl) {
					$prevEl = swiper.navigation.$prevEl;
				}

				if ($nextEl) {
					$nextEl.off("keydown", onEnterOrSpaceKey);
				}

				if ($prevEl) {
					$prevEl.off("keydown", onEnterOrSpaceKey);
				} // Pagination

				if (hasClickablePagination()) {
					swiper.pagination.$el.off(
						"keydown",
						classesToSelector(swiper.params.pagination.bulletClass),
						onEnterOrSpaceKey
					);
				}
			}

			on("beforeInit", () => {
				liveRegion = $(
					`<span class="${swiper.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`
				);
			});
			on("afterInit", () => {
				if (!swiper.params.a11y.enabled) return;
				init();
				updateNavigation();
			});
			on("toEdge", () => {
				if (!swiper.params.a11y.enabled) return;
				updateNavigation();
			});
			on("fromEdge", () => {
				if (!swiper.params.a11y.enabled) return;
				updateNavigation();
			});
			on("paginationUpdate", () => {
				if (!swiper.params.a11y.enabled) return;
				updatePagination();
			});
			on("destroy", () => {
				if (!swiper.params.a11y.enabled) return;
				destroy();
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/history/history.js
		function History({ swiper, extendParams, on }) {
			extendParams({
				history: {
					enabled: false,
					root: "",
					replaceState: false,
					key: "slides",
				},
			});
			let initialized = false;
			let paths = {};

			const slugify = (text) => {
				return text
					.toString()
					.replace(/\s+/g, "-")
					.replace(/[^\w-]+/g, "")
					.replace(/--+/g, "-")
					.replace(/^-+/, "")
					.replace(/-+$/, "");
			};

			const getPathValues = (urlOverride) => {
				const window = getWindow();
				let location;

				if (urlOverride) {
					location = new URL(urlOverride);
				} else {
					location = window.location;
				}

				const pathArray = location.pathname
					.slice(1)
					.split("/")
					.filter((part) => part !== "");
				const total = pathArray.length;
				const key = pathArray[total - 2];
				const value = pathArray[total - 1];
				return {
					key,
					value,
				};
			};

			const setHistory = (key, index) => {
				const window = getWindow();
				if (!initialized || !swiper.params.history.enabled) return;
				let location;

				if (swiper.params.url) {
					location = new URL(swiper.params.url);
				} else {
					location = window.location;
				}

				const slide = swiper.slides.eq(index);
				let value = slugify(slide.attr("data-history"));

				if (swiper.params.history.root.length > 0) {
					let root = swiper.params.history.root;
					if (root[root.length - 1] === "/") root = root.slice(0, root.length - 1);
					value = `${root}/${key}/${value}`;
				} else if (!location.pathname.includes(key)) {
					value = `${key}/${value}`;
				}

				const currentState = window.history.state;

				if (currentState && currentState.value === value) {
					return;
				}

				if (swiper.params.history.replaceState) {
					window.history.replaceState(
						{
							value,
						},
						null,
						value
					);
				} else {
					window.history.pushState(
						{
							value,
						},
						null,
						value
					);
				}
			};

			const scrollToSlide = (speed, value, runCallbacks) => {
				if (value) {
					for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
						const slide = swiper.slides.eq(i);
						const slideHistory = slugify(slide.attr("data-history"));

						if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
							const index = slide.index();
							swiper.slideTo(index, speed, runCallbacks);
						}
					}
				} else {
					swiper.slideTo(0, speed, runCallbacks);
				}
			};

			const setHistoryPopState = () => {
				paths = getPathValues(swiper.params.url);
				scrollToSlide(swiper.params.speed, swiper.paths.value, false);
			};

			const init = () => {
				const window = getWindow();
				if (!swiper.params.history) return;

				if (!window.history || !window.history.pushState) {
					swiper.params.history.enabled = false;
					swiper.params.hashNavigation.enabled = true;
					return;
				}

				initialized = true;
				paths = getPathValues(swiper.params.url);
				if (!paths.key && !paths.value) return;
				scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);

				if (!swiper.params.history.replaceState) {
					window.addEventListener("popstate", setHistoryPopState);
				}
			};

			const destroy = () => {
				const window = getWindow();

				if (!swiper.params.history.replaceState) {
					window.removeEventListener("popstate", setHistoryPopState);
				}
			};

			on("init", () => {
				if (swiper.params.history.enabled) {
					init();
				}
			});
			on("destroy", () => {
				if (swiper.params.history.enabled) {
					destroy();
				}
			});
			on("transitionEnd _freeModeNoMomentumRelease", () => {
				if (initialized) {
					setHistory(swiper.params.history.key, swiper.activeIndex);
				}
			});
			on("slideChange", () => {
				if (initialized && swiper.params.cssMode) {
					setHistory(swiper.params.history.key, swiper.activeIndex);
				}
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/hash-navigation/hash-navigation.js
		function HashNavigation({ swiper, extendParams, emit, on }) {
			let initialized = false;
			const document = getDocument();
			const window = getWindow();
			extendParams({
				hashNavigation: {
					enabled: false,
					replaceState: false,
					watchState: false,
				},
			});

			const onHashChange = () => {
				emit("hashChange");
				const newHash = document.location.hash.replace("#", "");
				const activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr("data-hash");

				if (newHash !== activeSlideHash) {
					const newIndex = swiper.$wrapperEl
						.children(`.${swiper.params.slideClass}[data-hash="${newHash}"]`)
						.index();
					if (typeof newIndex === "undefined") return;
					swiper.slideTo(newIndex);
				}
			};

			const setHash = () => {
				if (!initialized || !swiper.params.hashNavigation.enabled) return;

				if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
					window.history.replaceState(
						null,
						null,
						`#${swiper.slides.eq(swiper.activeIndex).attr("data-hash")}` || ""
					);
					emit("hashSet");
				} else {
					const slide = swiper.slides.eq(swiper.activeIndex);
					const hash = slide.attr("data-hash") || slide.attr("data-history");
					document.location.hash = hash || "";
					emit("hashSet");
				}
			};

			const init = () => {
				if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled))
					return;
				initialized = true;
				const hash = document.location.hash.replace("#", "");

				if (hash) {
					const speed = 0;

					for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
						const slide = swiper.slides.eq(i);
						const slideHash = slide.attr("data-hash") || slide.attr("data-history");

						if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
							const index = slide.index();
							swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
						}
					}
				}

				if (swiper.params.hashNavigation.watchState) {
					$(window).on("hashchange", onHashChange);
				}
			};

			const destroy = () => {
				if (swiper.params.hashNavigation.watchState) {
					$(window).off("hashchange", onHashChange);
				}
			};

			on("init", () => {
				if (swiper.params.hashNavigation.enabled) {
					init();
				}
			});
			on("destroy", () => {
				if (swiper.params.hashNavigation.enabled) {
					destroy();
				}
			});
			on("transitionEnd _freeModeNoMomentumRelease", () => {
				if (initialized) {
					setHash();
				}
			});
			on("slideChange", () => {
				if (initialized && swiper.params.cssMode) {
					setHash();
				}
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/autoplay/autoplay.js
		/* eslint no-underscore-dangle: "off" */

		/* eslint no-use-before-define: "off" */

		function Autoplay({ swiper, extendParams, on, emit }) {
			let timeout;
			swiper.autoplay = {
				running: false,
				paused: false,
			};
			extendParams({
				autoplay: {
					enabled: false,
					delay: 3000,
					waitForTransition: true,
					disableOnInteraction: true,
					stopOnLastSlide: false,
					reverseDirection: false,
					pauseOnMouseEnter: false,
				},
			});

			function run() {
				const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
				let delay = swiper.params.autoplay.delay;

				if ($activeSlideEl.attr("data-swiper-autoplay")) {
					delay = $activeSlideEl.attr("data-swiper-autoplay") || swiper.params.autoplay.delay;
				}

				clearTimeout(timeout);
				timeout = nextTick(() => {
					let autoplayResult;

					if (swiper.params.autoplay.reverseDirection) {
						if (swiper.params.loop) {
							swiper.loopFix();
							autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
							emit("autoplay");
						} else if (!swiper.isBeginning) {
							autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
							emit("autoplay");
						} else if (!swiper.params.autoplay.stopOnLastSlide) {
							autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
							emit("autoplay");
						} else {
							stop();
						}
					} else if (swiper.params.loop) {
						swiper.loopFix();
						autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
						emit("autoplay");
					} else if (!swiper.isEnd) {
						autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
						emit("autoplay");
					} else if (!swiper.params.autoplay.stopOnLastSlide) {
						autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
						emit("autoplay");
					} else {
						stop();
					}

					if (swiper.params.cssMode && swiper.autoplay.running) run();
					else if (autoplayResult === false) {
						run();
					}
				}, delay);
			}

			function start() {
				if (typeof timeout !== "undefined") return false;
				if (swiper.autoplay.running) return false;
				swiper.autoplay.running = true;
				emit("autoplayStart");
				run();
				return true;
			}

			function stop() {
				if (!swiper.autoplay.running) return false;
				if (typeof timeout === "undefined") return false;

				if (timeout) {
					clearTimeout(timeout);
					timeout = undefined;
				}

				swiper.autoplay.running = false;
				emit("autoplayStop");
				return true;
			}

			function pause(speed) {
				if (!swiper.autoplay.running) return;
				if (swiper.autoplay.paused) return;
				if (timeout) clearTimeout(timeout);
				swiper.autoplay.paused = true;

				if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
					swiper.autoplay.paused = false;
					run();
				} else {
					["transitionend", "webkitTransitionEnd"].forEach((event) => {
						swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
					});
				}
			}

			function onVisibilityChange() {
				const document = getDocument();

				if (document.visibilityState === "hidden" && swiper.autoplay.running) {
					pause();
				}

				if (document.visibilityState === "visible" && swiper.autoplay.paused) {
					run();
					swiper.autoplay.paused = false;
				}
			}

			function onTransitionEnd(e) {
				if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
				if (e.target !== swiper.$wrapperEl[0]) return;
				["transitionend", "webkitTransitionEnd"].forEach((event) => {
					swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
				});
				swiper.autoplay.paused = false;

				if (!swiper.autoplay.running) {
					stop();
				} else {
					run();
				}
			}

			function onMouseEnter() {
				if (swiper.params.autoplay.disableOnInteraction) {
					stop();
				} else {
					pause();
				}

				["transitionend", "webkitTransitionEnd"].forEach((event) => {
					swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
				});
			}

			function onMouseLeave() {
				if (swiper.params.autoplay.disableOnInteraction) {
					return;
				}

				swiper.autoplay.paused = false;
				run();
			}

			function attachMouseEvents() {
				if (swiper.params.autoplay.pauseOnMouseEnter) {
					swiper.$el.on("mouseenter", onMouseEnter);
					swiper.$el.on("mouseleave", onMouseLeave);
				}
			}

			function detachMouseEvents() {
				swiper.$el.off("mouseenter", onMouseEnter);
				swiper.$el.off("mouseleave", onMouseLeave);
			}

			on("init", () => {
				if (swiper.params.autoplay.enabled) {
					start();
					const document = getDocument();
					document.addEventListener("visibilitychange", onVisibilityChange);
					attachMouseEvents();
				}
			});
			on("beforeTransitionStart", (_s, speed, internal) => {
				if (swiper.autoplay.running) {
					if (internal || !swiper.params.autoplay.disableOnInteraction) {
						swiper.autoplay.pause(speed);
					} else {
						stop();
					}
				}
			});
			on("sliderFirstMove", () => {
				if (swiper.autoplay.running) {
					if (swiper.params.autoplay.disableOnInteraction) {
						stop();
					} else {
						pause();
					}
				}
			});
			on("touchEnd", () => {
				if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
					run();
				}
			});
			on("destroy", () => {
				detachMouseEvents();

				if (swiper.autoplay.running) {
					stop();
				}

				const document = getDocument();
				document.removeEventListener("visibilitychange", onVisibilityChange);
			});
			Object.assign(swiper.autoplay, {
				pause,
				run,
				start,
				stop,
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/thumbs/thumbs.js
		function Thumb({ swiper, extendParams, on }) {
			extendParams({
				thumbs: {
					swiper: null,
					multipleActiveThumbs: true,
					autoScrollOffset: 0,
					slideThumbActiveClass: "swiper-slide-thumb-active",
					thumbsContainerClass: "swiper-thumbs",
				},
			});
			let initialized = false;
			let swiperCreated = false;
			swiper.thumbs = {
				swiper: null,
			};

			function onThumbClick() {
				const thumbsSwiper = swiper.thumbs.swiper;
				if (!thumbsSwiper) return;
				const clickedIndex = thumbsSwiper.clickedIndex;
				const clickedSlide = thumbsSwiper.clickedSlide;
				if (clickedSlide && dom(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
				if (typeof clickedIndex === "undefined" || clickedIndex === null) return;
				let slideToIndex;

				if (thumbsSwiper.params.loop) {
					slideToIndex = parseInt(dom(thumbsSwiper.clickedSlide).attr("data-swiper-slide-index"), 10);
				} else {
					slideToIndex = clickedIndex;
				}

				if (swiper.params.loop) {
					let currentIndex = swiper.activeIndex;

					if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
						swiper.loopFix(); // eslint-disable-next-line

						swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
						currentIndex = swiper.activeIndex;
					}

					const prevIndex = swiper.slides
						.eq(currentIndex)
						.prevAll(`[data-swiper-slide-index="${slideToIndex}"]`)
						.eq(0)
						.index();
					const nextIndex = swiper.slides
						.eq(currentIndex)
						.nextAll(`[data-swiper-slide-index="${slideToIndex}"]`)
						.eq(0)
						.index();
					if (typeof prevIndex === "undefined") slideToIndex = nextIndex;
					else if (typeof nextIndex === "undefined") slideToIndex = prevIndex;
					else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;
					else slideToIndex = prevIndex;
				}

				swiper.slideTo(slideToIndex);
			}

			function init() {
				const { thumbs: thumbsParams } = swiper.params;
				if (initialized) return false;
				initialized = true;
				const SwiperClass = swiper.constructor;

				if (thumbsParams.swiper instanceof SwiperClass) {
					swiper.thumbs.swiper = thumbsParams.swiper;
					Object.assign(swiper.thumbs.swiper.originalParams, {
						watchSlidesProgress: true,
						slideToClickedSlide: false,
					});
					Object.assign(swiper.thumbs.swiper.params, {
						watchSlidesProgress: true,
						slideToClickedSlide: false,
					});
				} else if (utils_isObject(thumbsParams.swiper)) {
					const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
					Object.assign(thumbsSwiperParams, {
						watchSlidesProgress: true,
						slideToClickedSlide: false,
					});
					swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
					swiperCreated = true;
				}

				swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
				swiper.thumbs.swiper.on("tap", onThumbClick);
				return true;
			}

			function update(initial) {
				const thumbsSwiper = swiper.thumbs.swiper;
				if (!thumbsSwiper) return;
				const slidesPerView =
					thumbsSwiper.params.slidesPerView === "auto"
						? thumbsSwiper.slidesPerViewDynamic()
						: thumbsSwiper.params.slidesPerView;
				const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
				const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;

				if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
					let currentThumbsIndex = thumbsSwiper.activeIndex;
					let newThumbsIndex;
					let direction;

					if (thumbsSwiper.params.loop) {
						if (
							thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)
						) {
							thumbsSwiper.loopFix(); // eslint-disable-next-line

							thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
							currentThumbsIndex = thumbsSwiper.activeIndex;
						} // Find actual thumbs index to slide to

						const prevThumbsIndex = thumbsSwiper.slides
							.eq(currentThumbsIndex)
							.prevAll(`[data-swiper-slide-index="${swiper.realIndex}"]`)
							.eq(0)
							.index();
						const nextThumbsIndex = thumbsSwiper.slides
							.eq(currentThumbsIndex)
							.nextAll(`[data-swiper-slide-index="${swiper.realIndex}"]`)
							.eq(0)
							.index();

						if (typeof prevThumbsIndex === "undefined") {
							newThumbsIndex = nextThumbsIndex;
						} else if (typeof nextThumbsIndex === "undefined") {
							newThumbsIndex = prevThumbsIndex;
						} else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {
							newThumbsIndex =
								thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;
						} else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {
							newThumbsIndex = nextThumbsIndex;
						} else {
							newThumbsIndex = prevThumbsIndex;
						}

						direction = swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
					} else {
						newThumbsIndex = swiper.realIndex;
						direction = newThumbsIndex > swiper.previousIndex ? "next" : "prev";
					}

					if (useOffset) {
						newThumbsIndex += direction === "next" ? autoScrollOffset : -1 * autoScrollOffset;
					}

					if (
						thumbsSwiper.visibleSlidesIndexes &&
						thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0
					) {
						if (thumbsSwiper.params.centeredSlides) {
							if (newThumbsIndex > currentThumbsIndex) {
								newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
							} else {
								newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
							}
						} else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) {
							// newThumbsIndex = newThumbsIndex - slidesPerView + 1;
						}

						thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
					}
				} // Activate thumbs

				let thumbsToActivate = 1;
				const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

				if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
					thumbsToActivate = swiper.params.slidesPerView;
				}

				if (!swiper.params.thumbs.multipleActiveThumbs) {
					thumbsToActivate = 1;
				}

				thumbsToActivate = Math.floor(thumbsToActivate);
				thumbsSwiper.slides.removeClass(thumbActiveClass);

				if (thumbsSwiper.params.loop || (thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled)) {
					for (let i = 0; i < thumbsToActivate; i += 1) {
						thumbsSwiper.$wrapperEl
							.children(`[data-swiper-slide-index="${swiper.realIndex + i}"]`)
							.addClass(thumbActiveClass);
					}
				} else {
					for (let i = 0; i < thumbsToActivate; i += 1) {
						thumbsSwiper.slides.eq(swiper.realIndex + i).addClass(thumbActiveClass);
					}
				}
			}

			on("beforeInit", () => {
				const { thumbs } = swiper.params;
				if (!thumbs || !thumbs.swiper) return;
				init();
				update(true);
			});
			on("slideChange update resize observerUpdate", () => {
				if (!swiper.thumbs.swiper) return;
				update();
			});
			on("setTransition", (_s, duration) => {
				const thumbsSwiper = swiper.thumbs.swiper;
				if (!thumbsSwiper) return;
				thumbsSwiper.setTransition(duration);
			});
			on("beforeDestroy", () => {
				const thumbsSwiper = swiper.thumbs.swiper;
				if (!thumbsSwiper) return;

				if (swiperCreated && thumbsSwiper) {
					thumbsSwiper.destroy();
				}
			});
			Object.assign(swiper.thumbs, {
				init,
				update,
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/free-mode/free-mode.js
		function freeMode({ swiper, extendParams, emit, once }) {
			extendParams({
				freeMode: {
					enabled: false,
					momentum: true,
					momentumRatio: 1,
					momentumBounce: true,
					momentumBounceRatio: 1,
					momentumVelocityRatio: 1,
					sticky: false,
					minimumVelocity: 0.02,
				},
			});

			function onTouchMove() {
				const { touchEventsData: data, touches } = swiper; // Velocity

				if (data.velocities.length === 0) {
					data.velocities.push({
						position: touches[swiper.isHorizontal() ? "startX" : "startY"],
						time: data.touchStartTime,
					});
				}

				data.velocities.push({
					position: touches[swiper.isHorizontal() ? "currentX" : "currentY"],
					time: now(),
				});
			}

			function onTouchEnd({ currentPos }) {
				const { params, $wrapperEl, rtlTranslate: rtl, snapGrid, touchEventsData: data } = swiper; // Time diff

				const touchEndTime = now();
				const timeDiff = touchEndTime - data.touchStartTime;

				if (currentPos < -swiper.minTranslate()) {
					swiper.slideTo(swiper.activeIndex);
					return;
				}

				if (currentPos > -swiper.maxTranslate()) {
					if (swiper.slides.length < snapGrid.length) {
						swiper.slideTo(snapGrid.length - 1);
					} else {
						swiper.slideTo(swiper.slides.length - 1);
					}

					return;
				}

				if (params.freeMode.momentum) {
					if (data.velocities.length > 1) {
						const lastMoveEvent = data.velocities.pop();
						const velocityEvent = data.velocities.pop();
						const distance = lastMoveEvent.position - velocityEvent.position;
						const time = lastMoveEvent.time - velocityEvent.time;
						swiper.velocity = distance / time;
						swiper.velocity /= 2;

						if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
							swiper.velocity = 0;
						} // this implies that the user stopped moving a finger then released.
						// There would be no events with distance zero, so the last event is stale.

						if (time > 150 || now() - lastMoveEvent.time > 300) {
							swiper.velocity = 0;
						}
					} else {
						swiper.velocity = 0;
					}

					swiper.velocity *= params.freeMode.momentumVelocityRatio;
					data.velocities.length = 0;
					let momentumDuration = 1000 * params.freeMode.momentumRatio;
					const momentumDistance = swiper.velocity * momentumDuration;
					let newPosition = swiper.translate + momentumDistance;
					if (rtl) newPosition = -newPosition;
					let doBounce = false;
					let afterBouncePosition;
					const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
					let needsLoopFix;

					if (newPosition < swiper.maxTranslate()) {
						if (params.freeMode.momentumBounce) {
							if (newPosition + swiper.maxTranslate() < -bounceAmount) {
								newPosition = swiper.maxTranslate() - bounceAmount;
							}

							afterBouncePosition = swiper.maxTranslate();
							doBounce = true;
							data.allowMomentumBounce = true;
						} else {
							newPosition = swiper.maxTranslate();
						}

						if (params.loop && params.centeredSlides) needsLoopFix = true;
					} else if (newPosition > swiper.minTranslate()) {
						if (params.freeMode.momentumBounce) {
							if (newPosition - swiper.minTranslate() > bounceAmount) {
								newPosition = swiper.minTranslate() + bounceAmount;
							}

							afterBouncePosition = swiper.minTranslate();
							doBounce = true;
							data.allowMomentumBounce = true;
						} else {
							newPosition = swiper.minTranslate();
						}

						if (params.loop && params.centeredSlides) needsLoopFix = true;
					} else if (params.freeMode.sticky) {
						let nextSlide;

						for (let j = 0; j < snapGrid.length; j += 1) {
							if (snapGrid[j] > -newPosition) {
								nextSlide = j;
								break;
							}
						}

						if (
							Math.abs(snapGrid[nextSlide] - newPosition) <
								Math.abs(snapGrid[nextSlide - 1] - newPosition) ||
							swiper.swipeDirection === "next"
						) {
							newPosition = snapGrid[nextSlide];
						} else {
							newPosition = snapGrid[nextSlide - 1];
						}

						newPosition = -newPosition;
					}

					if (needsLoopFix) {
						once("transitionEnd", () => {
							swiper.loopFix();
						});
					} // Fix duration

					if (swiper.velocity !== 0) {
						if (rtl) {
							momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
						} else {
							momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
						}

						if (params.freeMode.sticky) {
							// If freeMode.sticky is active and the user ends a swipe with a slow-velocity
							// event, then durations can be 20+ seconds to slide one (or zero!) slides.
							// It's easy to see this when simulating touch with mouse events. To fix this,
							// limit single-slide swipes to the default slide duration. This also has the
							// nice side effect of matching slide speed if the user stopped moving before
							// lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
							// For faster swipes, also apply limits (albeit higher ones).
							const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
							const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];

							if (moveDistance < currentSlideSize) {
								momentumDuration = params.speed;
							} else if (moveDistance < 2 * currentSlideSize) {
								momentumDuration = params.speed * 1.5;
							} else {
								momentumDuration = params.speed * 2.5;
							}
						}
					} else if (params.freeMode.sticky) {
						swiper.slideToClosest();
						return;
					}

					if (params.freeMode.momentumBounce && doBounce) {
						swiper.updateProgress(afterBouncePosition);
						swiper.setTransition(momentumDuration);
						swiper.setTranslate(newPosition);
						swiper.transitionStart(true, swiper.swipeDirection);
						swiper.animating = true;
						$wrapperEl.transitionEnd(() => {
							if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
							emit("momentumBounce");
							swiper.setTransition(params.speed);
							setTimeout(() => {
								swiper.setTranslate(afterBouncePosition);
								$wrapperEl.transitionEnd(() => {
									if (!swiper || swiper.destroyed) return;
									swiper.transitionEnd();
								});
							}, 0);
						});
					} else if (swiper.velocity) {
						emit("_freeModeNoMomentumRelease");
						swiper.updateProgress(newPosition);
						swiper.setTransition(momentumDuration);
						swiper.setTranslate(newPosition);
						swiper.transitionStart(true, swiper.swipeDirection);

						if (!swiper.animating) {
							swiper.animating = true;
							$wrapperEl.transitionEnd(() => {
								if (!swiper || swiper.destroyed) return;
								swiper.transitionEnd();
							});
						}
					} else {
						swiper.updateProgress(newPosition);
					}

					swiper.updateActiveIndex();
					swiper.updateSlidesClasses();
				} else if (params.freeMode.sticky) {
					swiper.slideToClosest();
					return;
				} else if (params.freeMode) {
					emit("_freeModeNoMomentumRelease");
				}

				if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
					swiper.updateProgress();
					swiper.updateActiveIndex();
					swiper.updateSlidesClasses();
				}
			}

			Object.assign(swiper, {
				freeMode: {
					onTouchMove,
					onTouchEnd,
				},
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/effect-cube/effect-cube.js
		function EffectCube({ swiper, extendParams, on }) {
			extendParams({
				cubeEffect: {
					slideShadows: true,
					shadow: true,
					shadowOffset: 20,
					shadowScale: 0.94,
				},
			});

			const setTranslate = () => {
				const {
					$el,
					$wrapperEl,
					slides,
					width: swiperWidth,
					height: swiperHeight,
					rtlTranslate: rtl,
					size: swiperSize,
					browser,
				} = swiper;
				const params = swiper.params.cubeEffect;
				const isHorizontal = swiper.isHorizontal();
				const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
				let wrapperRotate = 0;
				let $cubeShadowEl;

				if (params.shadow) {
					if (isHorizontal) {
						$cubeShadowEl = $wrapperEl.find(".swiper-cube-shadow");

						if ($cubeShadowEl.length === 0) {
							$cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
							$wrapperEl.append($cubeShadowEl);
						}

						$cubeShadowEl.css({
							height: `${swiperWidth}px`,
						});
					} else {
						$cubeShadowEl = $el.find(".swiper-cube-shadow");

						if ($cubeShadowEl.length === 0) {
							$cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
							$el.append($cubeShadowEl);
						}
					}
				}

				for (let i = 0; i < slides.length; i += 1) {
					const $slideEl = slides.eq(i);
					let slideIndex = i;

					if (isVirtual) {
						slideIndex = parseInt($slideEl.attr("data-swiper-slide-index"), 10);
					}

					let slideAngle = slideIndex * 90;
					let round = Math.floor(slideAngle / 360);

					if (rtl) {
						slideAngle = -slideAngle;
						round = Math.floor(-slideAngle / 360);
					}

					const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
					let tx = 0;
					let ty = 0;
					let tz = 0;

					if (slideIndex % 4 === 0) {
						tx = -round * 4 * swiperSize;
						tz = 0;
					} else if ((slideIndex - 1) % 4 === 0) {
						tx = 0;
						tz = -round * 4 * swiperSize;
					} else if ((slideIndex - 2) % 4 === 0) {
						tx = swiperSize + round * 4 * swiperSize;
						tz = swiperSize;
					} else if ((slideIndex - 3) % 4 === 0) {
						tx = -swiperSize;
						tz = 3 * swiperSize + swiperSize * 4 * round;
					}

					if (rtl) {
						tx = -tx;
					}

					if (!isHorizontal) {
						ty = tx;
						tx = 0;
					}

					const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${
						isHorizontal ? slideAngle : 0
					}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;

					if (progress <= 1 && progress > -1) {
						wrapperRotate = slideIndex * 90 + progress * 90;
						if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
					}

					$slideEl.transform(transform);

					if (params.slideShadows) {
						// Set shadows
						let shadowBefore = isHorizontal
							? $slideEl.find(".swiper-slide-shadow-left")
							: $slideEl.find(".swiper-slide-shadow-top");
						let shadowAfter = isHorizontal
							? $slideEl.find(".swiper-slide-shadow-right")
							: $slideEl.find(".swiper-slide-shadow-bottom");

						if (shadowBefore.length === 0) {
							shadowBefore = $(
								`<div class="swiper-slide-shadow-${isHorizontal ? "left" : "top"}"></div>`
							);
							$slideEl.append(shadowBefore);
						}

						if (shadowAfter.length === 0) {
							shadowAfter = $(
								`<div class="swiper-slide-shadow-${isHorizontal ? "right" : "bottom"}"></div>`
							);
							$slideEl.append(shadowAfter);
						}

						if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
						if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
					}
				}

				$wrapperEl.css({
					"-webkit-transform-origin": `50% 50% -${swiperSize / 2}px`,
					"transform-origin": `50% 50% -${swiperSize / 2}px`,
				});

				if (params.shadow) {
					if (isHorizontal) {
						$cubeShadowEl.transform(
							`translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${
								-swiperWidth / 2
							}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`
						);
					} else {
						const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
						const multiplier =
							1.5 -
							(Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2 +
								Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2);
						const scale1 = params.shadowScale;
						const scale2 = params.shadowScale / multiplier;
						const offset = params.shadowOffset;
						$cubeShadowEl.transform(
							`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${
								-swiperHeight / 2 / scale2
							}px) rotateX(-90deg)`
						);
					}
				}

				const zFactor = browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;
				$wrapperEl.transform(
					`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${
						swiper.isHorizontal() ? -wrapperRotate : 0
					}deg)`
				);
			};

			const setTransition = (duration) => {
				const { $el, slides } = swiper;
				slides
					.transition(duration)
					.find(
						".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
					)
					.transition(duration);

				if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
					$el.find(".swiper-cube-shadow").transition(duration);
				}
			};

			effectInit({
				effect: "cube",
				swiper,
				on,
				setTranslate,
				setTransition,
				perspective: () => true,
				overwriteParams: () => ({
					slidesPerView: 1,
					slidesPerGroup: 1,
					watchSlidesProgress: true,
					resistanceRatio: 0,
					spaceBetween: 0,
					centeredSlides: false,
					virtualTranslate: true,
				}),
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/shared/create-shadow.js
		function create_shadow_createShadow(params, $slideEl, side) {
			const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ""}`;
			const $shadowContainer = params.transformEl ? $slideEl.find(params.transformEl) : $slideEl;
			let $shadowEl = $shadowContainer.children(`.${shadowClass}`);

			if (!$shadowEl.length) {
				$shadowEl = $(`<div class="swiper-slide-shadow${side ? `-${side}` : ""}"></div>`);
				$shadowContainer.append($shadowEl);
			}

			return $shadowEl;
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/effect-flip/effect-flip.js
		function EffectFlip({ swiper, extendParams, on }) {
			extendParams({
				flipEffect: {
					slideShadows: true,
					limitRotation: true,
					transformEl: null,
				},
			});

			const setTranslate = () => {
				const { slides, rtlTranslate: rtl } = swiper;
				const params = swiper.params.flipEffect;

				for (let i = 0; i < slides.length; i += 1) {
					const $slideEl = slides.eq(i);
					let progress = $slideEl[0].progress;

					if (swiper.params.flipEffect.limitRotation) {
						progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
					}

					const offset = $slideEl[0].swiperSlideOffset;
					const rotate = -180 * progress;
					let rotateY = rotate;
					let rotateX = 0;
					let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
					let ty = 0;

					if (!swiper.isHorizontal()) {
						ty = tx;
						tx = 0;
						rotateX = -rotateY;
						rotateY = 0;
					} else if (rtl) {
						rotateY = -rotateY;
					}

					$slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

					if (params.slideShadows) {
						// Set shadows
						let shadowBefore = swiper.isHorizontal()
							? $slideEl.find(".swiper-slide-shadow-left")
							: $slideEl.find(".swiper-slide-shadow-top");
						let shadowAfter = swiper.isHorizontal()
							? $slideEl.find(".swiper-slide-shadow-right")
							: $slideEl.find(".swiper-slide-shadow-bottom");

						if (shadowBefore.length === 0) {
							shadowBefore = createShadow(params, $slideEl, swiper.isHorizontal() ? "left" : "top");
						}

						if (shadowAfter.length === 0) {
							shadowAfter = createShadow(params, $slideEl, swiper.isHorizontal() ? "right" : "bottom");
						}

						if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
						if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
					}

					const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
					const $targetEl = effectTarget(params, $slideEl);
					$targetEl.transform(transform);
				}
			};

			const setTransition = (duration) => {
				const { transformEl } = swiper.params.flipEffect;
				const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
				$transitionElements
					.transition(duration)
					.find(
						".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
					)
					.transition(duration);
				effectVirtualTransitionEnd({
					swiper,
					duration,
					transformEl,
				});
			};

			effectInit({
				effect: "flip",
				swiper,
				on,
				setTranslate,
				setTransition,
				perspective: () => true,
				overwriteParams: () => ({
					slidesPerView: 1,
					slidesPerGroup: 1,
					watchSlidesProgress: true,
					spaceBetween: 0,
					virtualTranslate: !swiper.params.cssMode,
				}),
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/effect-coverflow/effect-coverflow.js
		function EffectCoverflow({ swiper, extendParams, on }) {
			extendParams({
				coverflowEffect: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					scale: 1,
					modifier: 1,
					slideShadows: true,
					transformEl: null,
				},
			});

			const setTranslate = () => {
				const { width: swiperWidth, height: swiperHeight, slides, slidesSizesGrid } = swiper;
				const params = swiper.params.coverflowEffect;
				const isHorizontal = swiper.isHorizontal();
				const transform = swiper.translate;
				const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
				const rotate = isHorizontal ? params.rotate : -params.rotate;
				const translate = params.depth; // Each slide offset from center

				for (let i = 0, length = slides.length; i < length; i += 1) {
					const $slideEl = slides.eq(i);
					const slideSize = slidesSizesGrid[i];
					const slideOffset = $slideEl[0].swiperSlideOffset;
					const offsetMultiplier = ((center - slideOffset - slideSize / 2) / slideSize) * params.modifier;
					let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
					let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

					let translateZ = -translate * Math.abs(offsetMultiplier);
					let stretch = params.stretch; // Allow percentage to make a relative stretch for responsive sliders

					if (typeof stretch === "string" && stretch.indexOf("%") !== -1) {
						stretch = (parseFloat(params.stretch) / 100) * slideSize;
					}

					let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
					let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
					let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier); // Fix for ultra small values

					if (Math.abs(translateX) < 0.001) translateX = 0;
					if (Math.abs(translateY) < 0.001) translateY = 0;
					if (Math.abs(translateZ) < 0.001) translateZ = 0;
					if (Math.abs(rotateY) < 0.001) rotateY = 0;
					if (Math.abs(rotateX) < 0.001) rotateX = 0;
					if (Math.abs(scale) < 0.001) scale = 0;
					const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
					const $targetEl = effectTarget(params, $slideEl);
					$targetEl.transform(slideTransform);
					$slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

					if (params.slideShadows) {
						// Set shadows
						let $shadowBeforeEl = isHorizontal
							? $slideEl.find(".swiper-slide-shadow-left")
							: $slideEl.find(".swiper-slide-shadow-top");
						let $shadowAfterEl = isHorizontal
							? $slideEl.find(".swiper-slide-shadow-right")
							: $slideEl.find(".swiper-slide-shadow-bottom");

						if ($shadowBeforeEl.length === 0) {
							$shadowBeforeEl = createShadow(params, $slideEl, isHorizontal ? "left" : "top");
						}

						if ($shadowAfterEl.length === 0) {
							$shadowAfterEl = createShadow(params, $slideEl, isHorizontal ? "right" : "bottom");
						}

						if ($shadowBeforeEl.length)
							$shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
						if ($shadowAfterEl.length)
							$shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
					}
				}
			};

			const setTransition = (duration) => {
				const { transformEl } = swiper.params.coverflowEffect;
				const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
				$transitionElements
					.transition(duration)
					.find(
						".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
					)
					.transition(duration);
			};

			effectInit({
				effect: "coverflow",
				swiper,
				on,
				setTranslate,
				setTransition,
				perspective: () => true,
				overwriteParams: () => ({
					watchSlidesProgress: true,
				}),
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/effect-creative/effect-creative.js
		function EffectCreative({ swiper, extendParams, on }) {
			extendParams({
				creativeEffect: {
					transformEl: null,
					limitProgress: 1,
					shadowPerProgress: false,
					progressMultiplier: 1,
					perspective: true,
					prev: {
						translate: [0, 0, 0],
						rotate: [0, 0, 0],
						opacity: 1,
						scale: 1,
					},
					next: {
						translate: [0, 0, 0],
						rotate: [0, 0, 0],
						opacity: 1,
						scale: 1,
					},
				},
			});

			const getTranslateValue = (value) => {
				if (typeof value === "string") return value;
				return `${value}px`;
			};

			const setTranslate = () => {
				const { slides, $wrapperEl, slidesSizesGrid } = swiper;
				const params = swiper.params.creativeEffect;
				const { progressMultiplier: multiplier } = params;
				const isCenteredSlides = swiper.params.centeredSlides;

				if (isCenteredSlides) {
					const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
					$wrapperEl.transform(`translateX(calc(50% - ${margin}px))`);
				}

				for (let i = 0; i < slides.length; i += 1) {
					const $slideEl = slides.eq(i);
					const slideProgress = $slideEl[0].progress;
					const progress = Math.min(
						Math.max($slideEl[0].progress, -params.limitProgress),
						params.limitProgress
					);
					let originalProgress = progress;

					if (!isCenteredSlides) {
						originalProgress = Math.min(
							Math.max($slideEl[0].originalProgress, -params.limitProgress),
							params.limitProgress
						);
					}

					const offset = $slideEl[0].swiperSlideOffset;
					const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
					const r = [0, 0, 0];
					let custom = false;

					if (!swiper.isHorizontal()) {
						t[1] = t[0];
						t[0] = 0;
					}

					let data = {
						translate: [0, 0, 0],
						rotate: [0, 0, 0],
						scale: 1,
						opacity: 1,
					};

					if (progress < 0) {
						data = params.next;
						custom = true;
					} else if (progress > 0) {
						data = params.prev;
						custom = true;
					} // set translate

					t.forEach((value, index) => {
						t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(
							progress * multiplier
						)}))`;
					}); // set rotates

					r.forEach((value, index) => {
						r[index] = data.rotate[index] * Math.abs(progress * multiplier);
					});
					$slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
					const translateString = t.join(", ");
					const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
					const scaleString =
						originalProgress < 0
							? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})`
							: `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
					const opacityString =
						originalProgress < 0
							? 1 + (1 - data.opacity) * originalProgress * multiplier
							: 1 - (1 - data.opacity) * originalProgress * multiplier;
					const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`; // Set shadows

					if ((custom && data.shadow) || !custom) {
						let $shadowEl = $slideEl.children(".swiper-slide-shadow");

						if ($shadowEl.length === 0 && data.shadow) {
							$shadowEl = createShadow(params, $slideEl);
						}

						if ($shadowEl.length) {
							const shadowOpacity = params.shadowPerProgress
								? progress * (1 / params.limitProgress)
								: progress;
							$shadowEl[0].style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
						}
					}

					const $targetEl = effectTarget(params, $slideEl);
					$targetEl.transform(transform).css({
						opacity: opacityString,
					});

					if (data.origin) {
						$targetEl.css("transform-origin", data.origin);
					}
				}
			};

			const setTransition = (duration) => {
				const { transformEl } = swiper.params.creativeEffect;
				const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
				$transitionElements.transition(duration).find(".swiper-slide-shadow").transition(duration);
				effectVirtualTransitionEnd({
					swiper,
					duration,
					transformEl,
					allSlides: true,
				});
			};

			effectInit({
				effect: "creative",
				swiper,
				on,
				setTranslate,
				setTransition,
				perspective: () => swiper.params.creativeEffect.perspective,
				overwriteParams: () => ({
					watchSlidesProgress: true,
					virtualTranslate: !swiper.params.cssMode,
				}),
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/modules/effect-cards/effect-cards.js
		function EffectCards({ swiper, extendParams, on }) {
			extendParams({
				cardsEffect: {
					slideShadows: true,
					transformEl: null,
				},
			});

			const setTranslate = () => {
				const { slides, activeIndex } = swiper;
				const params = swiper.params.cardsEffect;
				const { startTranslate, isTouched } = swiper.touchEventsData;
				const currentTranslate = swiper.translate;

				for (let i = 0; i < slides.length; i += 1) {
					const $slideEl = slides.eq(i);
					const slideProgress = $slideEl[0].progress;
					const progress = Math.min(Math.max(slideProgress, -4), 4);
					let offset = $slideEl[0].swiperSlideOffset;

					if (swiper.params.centeredSlides && !swiper.params.cssMode) {
						swiper.$wrapperEl.transform(`translateX(${swiper.minTranslate()}px)`);
					}

					if (swiper.params.centeredSlides && swiper.params.cssMode) {
						offset -= slides[0].swiperSlideOffset;
					}

					let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
					let tY = 0;
					const tZ = -100 * Math.abs(progress);
					let scale = 1;
					let rotate = -2 * progress;
					let tXAdd = 8 - Math.abs(progress) * 0.75;
					const isSwipeToNext =
						(i === activeIndex || i === activeIndex - 1) &&
						progress > 0 &&
						progress < 1 &&
						(isTouched || swiper.params.cssMode) &&
						currentTranslate < startTranslate;
					const isSwipeToPrev =
						(i === activeIndex || i === activeIndex + 1) &&
						progress < 0 &&
						progress > -1 &&
						(isTouched || swiper.params.cssMode) &&
						currentTranslate > startTranslate;

					if (isSwipeToNext || isSwipeToPrev) {
						const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
						rotate += -28 * progress * subProgress;
						scale += -0.5 * subProgress;
						tXAdd += 96 * subProgress;
						tY = `${-25 * subProgress * Math.abs(progress)}%`;
					}

					if (progress < 0) {
						// next
						tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`;
					} else if (progress > 0) {
						// prev
						tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`;
					} else {
						tX = `${tX}px`;
					}

					if (!swiper.isHorizontal()) {
						const prevY = tY;
						tY = tX;
						tX = prevY;
					}

					const scaleString =
						progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
					const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${rotate}deg)
        scale(${scaleString})
      `;

					if (params.slideShadows) {
						// Set shadows
						let $shadowEl = $slideEl.find(".swiper-slide-shadow");

						if ($shadowEl.length === 0) {
							$shadowEl = createShadow(params, $slideEl);
						}

						if ($shadowEl.length)
							$shadowEl[0].style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
					}

					$slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
					const $targetEl = effectTarget(params, $slideEl);
					$targetEl.transform(transform);
				}
			};

			const setTransition = (duration) => {
				const { transformEl } = swiper.params.cardsEffect;
				const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
				$transitionElements.transition(duration).find(".swiper-slide-shadow").transition(duration);
				effectVirtualTransitionEnd({
					swiper,
					duration,
					transformEl,
				});
			};

			effectInit({
				effect: "cards",
				swiper,
				on,
				setTranslate,
				setTransition,
				perspective: () => true,
				overwriteParams: () => ({
					watchSlidesProgress: true,
					virtualTranslate: !swiper.params.cssMode,
				}),
			});
		} // CONCATENATED MODULE: ./node_modules/swiper/swiper.esm.js // CONCATENATED MODULE: ./src/js/components/index-hovers.js
		/**
		 * Swiper 7.4.1
		 * Most modern mobile touch slider and framework with hardware accelerated transitions
		 * https://swiperjs.com
		 *
		 * Copyright 2014-2021 Vladimir Kharlampidi
		 *
		 * Released under the MIT License
		 *
		 * Released on: December 24, 2021
		 */

		function makeHovers() {
			const employee = document.querySelectorAll(".hero__col-employee");
			const salary = document.querySelectorAll(".hero__col-salary");
			const salaryOfficial = document.querySelectorAll(".hero__col-salary-official");
			const stopped = document.querySelectorAll(".hero__col-stopped");
			const prepaid = document.querySelectorAll(".hero__col-prepaid");
			const toBePaid = document.querySelectorAll(".hero__col-toBePaid");
			const bonus = document.querySelectorAll(".hero__col-bonus");
			const summ = document.querySelectorAll(".hero__col-summ");
			const medical = document.querySelectorAll(".hero__col-medical");
			const vacation = document.querySelectorAll(".hero__col-vacation");
			const date = document.querySelectorAll(".hero__col-date");
			const cols = [
				employee,
				salary,
				salaryOfficial,
				stopped,
				prepaid,
				toBePaid,
				bonus,
				summ,
				medical,
				vacation,
				date,
			];
			for (let i = 0; i < cols.length; i++) {
				cols[i].forEach((hoverElement) => {
					hoverElement.onmouseenter = () => {
						cols[i].forEach((el) => {
							el.classList.add("hero__cell-hovered");
						});
						if (cols[i - 1]) {
							cols[i - 1][0].classList.add("hero__cell-header-hide-after");
						}
						if (cols[i]) {
							cols[i][0].classList.add("hero__cell-header-hide-after");
						}
					};
					hoverElement.onmouseleave = () => {
						cols[i].forEach((el) => {
							el.classList.remove("hero__cell-hovered");
						});
						if (cols[i - 1]) {
							cols[i - 1][0].classList.remove("hero__cell-header-hide-after");
						}
						if (cols[i]) {
							cols[i][0].classList.remove("hero__cell-header-hide-after");
						}
					};
				});
			}
		} // CONCATENATED MODULE: ./src/js/components/index-table-slider.js
		core.use([Navigation, Pagination, Thumb]);

		let sliderData = [];
		if (document.querySelector(".hero")) {
			lib_axios
				.get("http://localhost:3000/salaryData")
				.then((r) => {
					sliderData = r.data;
					makeSlider();
					makeHovers();
					hideLoader();
				})
				.catch((e) => {
					console.log(e);
					showError(e.message);
				});
		}
		function makeSlider() {
			// верстка внутреннего элемента списка
			const heroItemInner = `
		<div class="hero__cell hero__cell-employee hero__col-employee">
		<div class="hero__container-employee">
			<img
				src="./img/hero-avatar.png"
				class="image hero__avatar"
				width="35"
				height="35"
				alt="Аватар"
			/>
			<div class="hero__column">
				<h4 class="hero__name">Саночкин Олег / вн 249</h4>
				<h5 class="hero__job">Менеджер проектов</h5>
			</div>
		</div>
		<div class="hero__container-status">
			<div class="hero__status hero__status-green"></div>
			<div class="hero__status hero__status-blue"></div>
		</div>
		</div>
		<div class="hero__cell hero__col-salary">30 000</div>
		<div class="hero__cell hero__col-salary-official">30 000</div>
		<div class="hero__cell hero__col-stopped">5 500</div>
		<div class="hero__cell hero__col-prepaid">12 500</div>
		<div class="hero__cell hero__col-toBePaid">35 500</div>
		<div class="hero__cell hero__col-bonus">20 000</div>
		<div class="hero__cell hero__col-summ">55 550</div>
		<div class="hero__cell hero__col-medical">55 550</div>
		<div class="hero__cell hero__col-vacation">55 550</div>
		<div class="hero__cell hero__cell-date hero__col-date">
			<button class="btn-reset hero__button-date hero__button-date-save">Сохранить</button>
			<button class="btn-reset hero__button-date hero__button-date-auto">Авто</button>
			<button class="btn-reset hero__button-date hero__button-date-red">О</button>
		</div>
	`;
			const sliderWrapper = document.querySelector(`.hero__wrapper`);
			const formattedData = [];

			// получаем гет параметр
			const urlParams = new URLSearchParams(window.location.search);
			let chunkSize = 8;
			if (urlParams.get("chunkSize") !== null) {
				chunkSize = +urlParams.get("chunkSize");
			}
			const select = document.querySelector(".hero__select");
			let selectOptions = [5, 8, 10, 15];
			if (!selectOptions.includes(chunkSize)) {
				selectOptions.push(chunkSize);
				selectOptions.sort((a, b) => a - b);
			}
			[...new Set(selectOptions)].forEach((option) => {
				let optionEl = document.createElement("option");
				optionEl.setAttribute("value", option);
				optionEl.innerHTML = option;
				select.appendChild(optionEl);
			});
			select.value = chunkSize;
			for (let i = 0; i < sliderData.length; i += chunkSize) {
				const chunk = sliderData.slice(i, i + chunkSize);
				formattedData.push(chunk);
			}
			formattedData.forEach((array) => {
				// создаем новый слайд
				let heroSlide = document.createElement("div");
				heroSlide.classList = `swiper-slide hero__slide`;
				array.forEach((row) => {
					// создем новый айтем
					let heroItem = document.createElement("div");
					heroItem.classList = "hero__row";
					heroItem.innerHTML = heroItemInner;

					// изменяем контент внутри
					heroItem.querySelector(".hero__avatar").setAttribute("src", row.user.avatar);
					heroItem.querySelector(".hero__name").innerHTML = row.user.name;
					heroItem.querySelector(".hero__job").innerHTML = row.user.job;
					if (row.statuses.grade) {
						heroItem.querySelector(".hero__status-green").innerHTML = row.statuses.grade;
						heroItem.querySelector(".hero__status-blue").remove();
					} else {
						heroItem.querySelector(".hero__status-blue").innerHTML = row.statuses.employment;
						heroItem.querySelector(".hero__status-green").remove();
					}
					heroItem.querySelector(".hero__col-salary").innerHTML = row.money.salary;
					heroItem.querySelector(".hero__col-salary-official").innerHTML = row.money.salaryOfficial;
					heroItem.querySelector(".hero__col-stopped").innerHTML = row.money.stopped;
					heroItem.querySelector(".hero__col-prepaid").innerHTML = row.money.prepaid;
					heroItem.querySelector(".hero__col-toBePaid").innerHTML = row.money.toBePaid;
					heroItem.querySelector(".hero__col-bonus").innerHTML = row.money.bonus;
					heroItem.querySelector(".hero__col-summ").innerHTML = row.money.summ;
					heroItem.querySelector(".hero__col-medical").innerHTML = row.money.medical;
					heroItem.querySelector(".hero__col-vacation").innerHTML = row.money.vacation;

					// засовываем в лист
					heroSlide.appendChild(heroItem);
				});
				sliderWrapper.appendChild(heroSlide);
			});
			const sliderBullets = new core(document.querySelector(`.hero__container-slider-bullets`), {
				slidesPerView: 3,
				speed: 500,
				spaceBetween: 0,
			});
			const slider = new core(document.querySelector(`.hero__slider`), {
				slidesPerView: 1,
				spaceBetween: 30,
				speed: 500,
				pagination: {
					el: ".hero__pagination",
					clickable: true,
					bulletActiveClass: "hero__bullet-active",
					renderBullet: function (index, className) {
						return `<span class="swiper-slide hero__bullet ${className}">${index + 1}</span>`;
					},
				},
				navigation: {
					nextEl: ".hero__button-next",
					prevEl: ".hero__button-prev",
				},
				thumbs: {
					swiper: sliderBullets,
				},
			});

			// общее количество
			// const allCountSpan = document.querySelector(".hero__text-all-value");
			// allCountSpan.innerHTML = sliderData.length;

			// 1 page span
			const textContainer = document.querySelector(".hero__text-page");
			const onePageSpan = document.querySelector(".hero__text-page-1");
			const footerButtons = document.querySelectorAll(".hero__button-control");
			if (formattedData.length == 1) {
				footerButtons.forEach((btn) => {
					btn.style.display = "none";
				});
				onePageSpan.style.marginRight = "0";
				onePageSpan.classList.remove("hero__text-page-hidden");
				textContainer.style.marginRight = "0";
			}

			// проверка на наличие последнего ряда без нижней границы
			let lastSlideRows = document.querySelectorAll(".hero__slide:last-child .hero__row");
			if (lastSlideRows.length !== chunkSize) {
				lastSlideRows[lastSlideRows.length - 1].style.boxShadow =
					"0 -1px 0 var(--hero-border-color), 0 1px 0 var(--hero-border-color)";
			}

			// обработчик кнопки "последняя"
			const lastButton = document.querySelector(".hero__button-last");
			lastButton.addEventListener("click", () => {
				slider.slideTo(formattedData.length - 1, 1000);
			});
		}

		// loader
		const loader = document.querySelector(".loader");
		const loaderTitle = document.querySelector(".loader__title");
		const loaderSpinner = document.querySelector(".loader__spinner");
		const loaderButton = document.querySelector(".loader__button");
		function hideLoader() {
			loader.classList.add("loader-hidden");
		}
		function showError(errorText) {
			loaderTitle.innerHTML = errorText;
			loaderSpinner.style.animationPlayState = "paused";
			loaderButton.classList.add("loader__button-visible");
		}
		if (loaderButton) {
			loaderButton.addEventListener("click", () => {
				hideLoader();
			});
		}
		// EXTERNAL MODULE: ./src/js/components/employee-tabs.js
		var employee_tabs = __webpack_require__(1458);
		// EXTERNAL MODULE: ./src/js/components/employee-accordion.js
		var employee_accordion = __webpack_require__(1973);
		// EXTERNAL MODULE: ./src/js/components/employee-rows.js
		var employee_rows = __webpack_require__(49);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
		var es_object_to_string = __webpack_require__(1539);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
		var web_dom_collections_for_each = __webpack_require__(4747);
		// EXTERNAL MODULE: ./node_modules/can-use-dom/index.js
		var can_use_dom = __webpack_require__(1807);
		var can_use_dom_default = /*#__PURE__*/ __webpack_require__.n(can_use_dom);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/es.parse-int.js
		var es_parse_int = __webpack_require__(1058);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
		var es_object_assign = __webpack_require__(9601);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
		var es_array_filter = __webpack_require__(7327);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
		var es_array_iterator = __webpack_require__(6992);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
		var es_string_iterator = __webpack_require__(8783);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/es.weak-map.js
		var es_weak_map = __webpack_require__(4129);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
		var web_dom_collections_iterator = __webpack_require__(3948);
		// EXTERNAL MODULE: ./node_modules/lodash.throttle/index.js
		var lodash_throttle = __webpack_require__(3096);
		var lodash_throttle_default = /*#__PURE__*/ __webpack_require__.n(lodash_throttle);
		// EXTERNAL MODULE: ./node_modules/lodash.debounce/index.js
		var lodash_debounce = __webpack_require__(1296);
		var lodash_debounce_default = /*#__PURE__*/ __webpack_require__.n(lodash_debounce);
		// EXTERNAL MODULE: ./node_modules/lodash.memoize/index.js
		var lodash_memoize = __webpack_require__(773);
		var lodash_memoize_default = /*#__PURE__*/ __webpack_require__.n(lodash_memoize); // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js
		var resizeObservers = []; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/algorithms/hasActiveObservations.js

		var hasActiveObservations = function () {
			return resizeObservers.some(function (ro) {
				return ro.activeTargets.length > 0;
			});
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/algorithms/hasSkippedObservations.js

		var hasSkippedObservations = function () {
			return resizeObservers.some(function (ro) {
				return ro.skippedTargets.length > 0;
			});
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/algorithms/deliverResizeLoopError.js

		var msg = "ResizeObserver loop completed with undelivered notifications.";
		var deliverResizeLoopError = function () {
			var event;
			if (typeof ErrorEvent === "function") {
				event = new ErrorEvent("error", {
					message: msg,
				});
			} else {
				event = document.createEvent("Event");
				event.initEvent("error", false, false);
				event.message = msg;
			}
			window.dispatchEvent(event);
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/ResizeObserverBoxOptions.js

		var ResizeObserverBoxOptions;
		(function (ResizeObserverBoxOptions) {
			ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
			ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
			ResizeObserverBoxOptions["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
		})(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {})); // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/utils/freeze.js

		var freeze = function (obj) {
			return Object.freeze(obj);
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/ResizeObserverSize.js

		var ResizeObserverSize = (function () {
			function ResizeObserverSize(inlineSize, blockSize) {
				this.inlineSize = inlineSize;
				this.blockSize = blockSize;
				freeze(this);
			}
			return ResizeObserverSize;
		})(); // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/DOMRectReadOnly.js

		var DOMRectReadOnly_DOMRectReadOnly = (function () {
			function DOMRectReadOnly(x, y, width, height) {
				this.x = x;
				this.y = y;
				this.width = width;
				this.height = height;
				this.top = this.y;
				this.left = this.x;
				this.bottom = this.top + this.height;
				this.right = this.left + this.width;
				return freeze(this);
			}
			DOMRectReadOnly.prototype.toJSON = function () {
				var _a = this,
					x = _a.x,
					y = _a.y,
					top = _a.top,
					right = _a.right,
					bottom = _a.bottom,
					left = _a.left,
					width = _a.width,
					height = _a.height;
				return { x: x, y: y, top: top, right: right, bottom: bottom, left: left, width: width, height: height };
			};
			DOMRectReadOnly.fromRect = function (rectangle) {
				return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
			};
			return DOMRectReadOnly;
		})(); // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/utils/element.js

		var isSVG = function (target) {
			return target instanceof SVGElement && "getBBox" in target;
		};
		var isHidden = function (target) {
			if (isSVG(target)) {
				var _a = target.getBBox(),
					width = _a.width,
					height = _a.height;
				return !width && !height;
			}
			var _b = target,
				offsetWidth = _b.offsetWidth,
				offsetHeight = _b.offsetHeight;
			return !(offsetWidth || offsetHeight || target.getClientRects().length);
		};
		var isElement = function (obj) {
			var _a;
			if (obj instanceof Element) {
				return true;
			}
			var scope =
				(_a = obj === null || obj === void 0 ? void 0 : obj.ownerDocument) === null || _a === void 0
					? void 0
					: _a.defaultView;
			return !!(scope && obj instanceof scope.Element);
		};
		var isReplacedElement = function (target) {
			switch (target.tagName) {
				case "INPUT":
					if (target.type !== "image") {
						break;
					}
				case "VIDEO":
				case "AUDIO":
				case "EMBED":
				case "OBJECT":
				case "CANVAS":
				case "IFRAME":
				case "IMG":
					return true;
			}
			return false;
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/utils/global.js

		var global_global = typeof window !== "undefined" ? window : {}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/algorithms/calculateBoxSize.js

		var cache = new WeakMap();
		var scrollRegexp = /auto|scroll/;
		var verticalRegexp = /^tb|vertical/;
		var IE = /msie|trident/i.test(global_global.navigator && global_global.navigator.userAgent);
		var parseDimension = function (pixel) {
			return parseFloat(pixel || "0");
		};
		var size = function (inlineSize, blockSize, switchSizes) {
			if (inlineSize === void 0) {
				inlineSize = 0;
			}
			if (blockSize === void 0) {
				blockSize = 0;
			}
			if (switchSizes === void 0) {
				switchSizes = false;
			}
			return new ResizeObserverSize(
				(switchSizes ? blockSize : inlineSize) || 0,
				(switchSizes ? inlineSize : blockSize) || 0
			);
		};
		var zeroBoxes = freeze({
			devicePixelContentBoxSize: size(),
			borderBoxSize: size(),
			contentBoxSize: size(),
			contentRect: new DOMRectReadOnly_DOMRectReadOnly(0, 0, 0, 0),
		});
		var calculateBoxSizes = function (target, forceRecalculation) {
			if (forceRecalculation === void 0) {
				forceRecalculation = false;
			}
			if (cache.has(target) && !forceRecalculation) {
				return cache.get(target);
			}
			if (isHidden(target)) {
				cache.set(target, zeroBoxes);
				return zeroBoxes;
			}
			var cs = getComputedStyle(target);
			var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
			var removePadding = !IE && cs.boxSizing === "border-box";
			var switchSizes = verticalRegexp.test(cs.writingMode || "");
			var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || "");
			var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || "");
			var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
			var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
			var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
			var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
			var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
			var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
			var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
			var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
			var horizontalPadding = paddingLeft + paddingRight;
			var verticalPadding = paddingTop + paddingBottom;
			var horizontalBorderArea = borderLeft + borderRight;
			var verticalBorderArea = borderTop + borderBottom;
			var horizontalScrollbarThickness = !canScrollHorizontally
				? 0
				: target.offsetHeight - verticalBorderArea - target.clientHeight;
			var verticalScrollbarThickness = !canScrollVertically
				? 0
				: target.offsetWidth - horizontalBorderArea - target.clientWidth;
			var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
			var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
			var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
			var contentHeight = svg
				? svg.height
				: parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
			var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
			var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
			var boxes = freeze({
				devicePixelContentBoxSize: size(
					Math.round(contentWidth * devicePixelRatio),
					Math.round(contentHeight * devicePixelRatio),
					switchSizes
				),
				borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
				contentBoxSize: size(contentWidth, contentHeight, switchSizes),
				contentRect: new DOMRectReadOnly_DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight),
			});
			cache.set(target, boxes);
			return boxes;
		};
		var calculateBoxSize = function (target, observedBox, forceRecalculation) {
			var _a = calculateBoxSizes(target, forceRecalculation),
				borderBoxSize = _a.borderBoxSize,
				contentBoxSize = _a.contentBoxSize,
				devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
			switch (observedBox) {
				case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
					return devicePixelContentBoxSize;
				case ResizeObserverBoxOptions.BORDER_BOX:
					return borderBoxSize;
				default:
					return contentBoxSize;
			}
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/ResizeObserverEntry.js

		var ResizeObserverEntry = (function () {
			function ResizeObserverEntry(target) {
				var boxes = calculateBoxSizes(target);
				this.target = target;
				this.contentRect = boxes.contentRect;
				this.borderBoxSize = freeze([boxes.borderBoxSize]);
				this.contentBoxSize = freeze([boxes.contentBoxSize]);
				this.devicePixelContentBoxSize = freeze([boxes.devicePixelContentBoxSize]);
			}
			return ResizeObserverEntry;
		})(); // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/algorithms/calculateDepthForNode.js

		var calculateDepthForNode = function (node) {
			if (isHidden(node)) {
				return Infinity;
			}
			var depth = 0;
			var parent = node.parentNode;
			while (parent) {
				depth += 1;
				parent = parent.parentNode;
			}
			return depth;
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/algorithms/broadcastActiveObservations.js

		var broadcastActiveObservations = function () {
			var shallowestDepth = Infinity;
			var callbacks = [];
			resizeObservers.forEach(function processObserver(ro) {
				if (ro.activeTargets.length === 0) {
					return;
				}
				var entries = [];
				ro.activeTargets.forEach(function processTarget(ot) {
					var entry = new ResizeObserverEntry(ot.target);
					var targetDepth = calculateDepthForNode(ot.target);
					entries.push(entry);
					ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
					if (targetDepth < shallowestDepth) {
						shallowestDepth = targetDepth;
					}
				});
				callbacks.push(function resizeObserverCallback() {
					ro.callback.call(ro.observer, entries, ro.observer);
				});
				ro.activeTargets.splice(0, ro.activeTargets.length);
			});
			for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
				var callback = callbacks_1[_i];
				callback();
			}
			return shallowestDepth;
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/algorithms/gatherActiveObservationsAtDepth.js

		var gatherActiveObservationsAtDepth = function (depth) {
			resizeObservers.forEach(function processObserver(ro) {
				ro.activeTargets.splice(0, ro.activeTargets.length);
				ro.skippedTargets.splice(0, ro.skippedTargets.length);
				ro.observationTargets.forEach(function processTarget(ot) {
					if (ot.isActive()) {
						if (calculateDepthForNode(ot.target) > depth) {
							ro.activeTargets.push(ot);
						} else {
							ro.skippedTargets.push(ot);
						}
					}
				});
			});
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/utils/process.js

		var process = function () {
			var depth = 0;
			gatherActiveObservationsAtDepth(depth);
			while (hasActiveObservations()) {
				depth = broadcastActiveObservations();
				gatherActiveObservationsAtDepth(depth);
			}
			if (hasSkippedObservations()) {
				deliverResizeLoopError();
			}
			return depth > 0;
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/utils/queueMicroTask.js

		var queueMicroTask_trigger;
		var callbacks = [];
		var notify = function () {
			return callbacks.splice(0).forEach(function (cb) {
				return cb();
			});
		};
		var queueMicroTask = function (callback) {
			if (!queueMicroTask_trigger) {
				var toggle_1 = 0;
				var el_1 = document.createTextNode("");
				var config = { characterData: true };
				new MutationObserver(function () {
					return notify();
				}).observe(el_1, config);
				queueMicroTask_trigger = function () {
					el_1.textContent = "".concat(toggle_1 ? toggle_1-- : toggle_1++);
				};
			}
			callbacks.push(callback);
			queueMicroTask_trigger();
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/utils/queueResizeObserver.js

		var queueResizeObserver = function (cb) {
			queueMicroTask(function ResizeObserver() {
				requestAnimationFrame(cb);
			});
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/utils/scheduler.js

		var watching = 0;
		var isWatching = function () {
			return !!watching;
		};
		var CATCH_PERIOD = 250;
		var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
		var scheduler_events = [
			"resize",
			"load",
			"transitionend",
			"animationend",
			"animationstart",
			"animationiteration",
			"keyup",
			"keydown",
			"mouseup",
			"mousedown",
			"mouseover",
			"mouseout",
			"blur",
			"focus",
		];
		var time = function (timeout) {
			if (timeout === void 0) {
				timeout = 0;
			}
			return Date.now() + timeout;
		};
		var scheduled = false;
		var Scheduler = (function () {
			function Scheduler() {
				var _this = this;
				this.stopped = true;
				this.listener = function () {
					return _this.schedule();
				};
			}
			Scheduler.prototype.run = function (timeout) {
				var _this = this;
				if (timeout === void 0) {
					timeout = CATCH_PERIOD;
				}
				if (scheduled) {
					return;
				}
				scheduled = true;
				var until = time(timeout);
				queueResizeObserver(function () {
					var elementsHaveResized = false;
					try {
						elementsHaveResized = process();
					} finally {
						scheduled = false;
						timeout = until - time();
						if (!isWatching()) {
							return;
						}
						if (elementsHaveResized) {
							_this.run(1000);
						} else if (timeout > 0) {
							_this.run(timeout);
						} else {
							_this.start();
						}
					}
				});
			};
			Scheduler.prototype.schedule = function () {
				this.stop();
				this.run();
			};
			Scheduler.prototype.observe = function () {
				var _this = this;
				var cb = function () {
					return _this.observer && _this.observer.observe(document.body, observerConfig);
				};
				document.body ? cb() : global_global.addEventListener("DOMContentLoaded", cb);
			};
			Scheduler.prototype.start = function () {
				var _this = this;
				if (this.stopped) {
					this.stopped = false;
					this.observer = new MutationObserver(this.listener);
					this.observe();
					scheduler_events.forEach(function (name) {
						return global_global.addEventListener(name, _this.listener, true);
					});
				}
			};
			Scheduler.prototype.stop = function () {
				var _this = this;
				if (!this.stopped) {
					this.observer && this.observer.disconnect();
					scheduler_events.forEach(function (name) {
						return global_global.removeEventListener(name, _this.listener, true);
					});
					this.stopped = true;
				}
			};
			return Scheduler;
		})();
		var scheduler = new Scheduler();
		var updateCount = function (n) {
			!watching && n > 0 && scheduler.start();
			watching += n;
			!watching && scheduler.stop();
		}; // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/ResizeObservation.js

		var skipNotifyOnElement = function (target) {
			return !isSVG(target) && !isReplacedElement(target) && getComputedStyle(target).display === "inline";
		};
		var ResizeObservation = (function () {
			function ResizeObservation(target, observedBox) {
				this.target = target;
				this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
				this.lastReportedSize = {
					inlineSize: 0,
					blockSize: 0,
				};
			}
			ResizeObservation.prototype.isActive = function () {
				var size = calculateBoxSize(this.target, this.observedBox, true);
				if (skipNotifyOnElement(this.target)) {
					this.lastReportedSize = size;
				}
				if (
					this.lastReportedSize.inlineSize !== size.inlineSize ||
					this.lastReportedSize.blockSize !== size.blockSize
				) {
					return true;
				}
				return false;
			};
			return ResizeObservation;
		})(); // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/ResizeObserverDetail.js

		var ResizeObserverDetail = (function () {
			function ResizeObserverDetail(resizeObserver, callback) {
				this.activeTargets = [];
				this.skippedTargets = [];
				this.observationTargets = [];
				this.observer = resizeObserver;
				this.callback = callback;
			}
			return ResizeObserverDetail;
		})(); // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/ResizeObserverController.js

		var observerMap = new WeakMap();
		var getObservationIndex = function (observationTargets, target) {
			for (var i = 0; i < observationTargets.length; i += 1) {
				if (observationTargets[i].target === target) {
					return i;
				}
			}
			return -1;
		};
		var ResizeObserverController = (function () {
			function ResizeObserverController() {}
			ResizeObserverController.connect = function (resizeObserver, callback) {
				var detail = new ResizeObserverDetail(resizeObserver, callback);
				observerMap.set(resizeObserver, detail);
			};
			ResizeObserverController.observe = function (resizeObserver, target, options) {
				var detail = observerMap.get(resizeObserver);
				var firstObservation = detail.observationTargets.length === 0;
				if (getObservationIndex(detail.observationTargets, target) < 0) {
					firstObservation && resizeObservers.push(detail);
					detail.observationTargets.push(new ResizeObservation(target, options && options.box));
					updateCount(1);
					scheduler.schedule();
				}
			};
			ResizeObserverController.unobserve = function (resizeObserver, target) {
				var detail = observerMap.get(resizeObserver);
				var index = getObservationIndex(detail.observationTargets, target);
				var lastObservation = detail.observationTargets.length === 1;
				if (index >= 0) {
					lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
					detail.observationTargets.splice(index, 1);
					updateCount(-1);
				}
			};
			ResizeObserverController.disconnect = function (resizeObserver) {
				var _this = this;
				var detail = observerMap.get(resizeObserver);
				detail.observationTargets.slice().forEach(function (ot) {
					return _this.unobserve(resizeObserver, ot.target);
				});
				detail.activeTargets.splice(0, detail.activeTargets.length);
			};
			return ResizeObserverController;
		})(); // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/ResizeObserver.js

		var ResizeObserver_ResizeObserver = (function () {
			function ResizeObserver(callback) {
				if (arguments.length === 0) {
					throw new TypeError(
						"Failed to construct 'ResizeObserver': 1 argument required, but only 0 present."
					);
				}
				if (typeof callback !== "function") {
					throw new TypeError(
						"Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function."
					);
				}
				ResizeObserverController.connect(this, callback);
			}
			ResizeObserver.prototype.observe = function (target, options) {
				if (arguments.length === 0) {
					throw new TypeError(
						"Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present."
					);
				}
				if (!isElement(target)) {
					throw new TypeError(
						"Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element"
					);
				}
				ResizeObserverController.observe(this, target, options);
			};
			ResizeObserver.prototype.unobserve = function (target) {
				if (arguments.length === 0) {
					throw new TypeError(
						"Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present."
					);
				}
				if (!isElement(target)) {
					throw new TypeError(
						"Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element"
					);
				}
				ResizeObserverController.unobserve(this, target);
			};
			ResizeObserver.prototype.disconnect = function () {
				ResizeObserverController.disconnect(this);
			};
			ResizeObserver.toString = function () {
				return "function ResizeObserver () { [polyfill code] }";
			};
			return ResizeObserver;
		})(); // CONCATENATED MODULE: ./node_modules/@juggle/resize-observer/lib/exports/resize-observer.js

		// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
		var es_array_reduce = __webpack_require__(5827);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
		var es_regexp_exec = __webpack_require__(4916);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
		var es_string_match = __webpack_require__(4723);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
		var es_function_name = __webpack_require__(8309);
		// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
		var es_string_replace = __webpack_require__(5306); // CONCATENATED MODULE: ./node_modules/simplebar/dist/simplebar.esm.js
		/**
		 * SimpleBar.js - v5.3.9
		 * Scrollbars, simpler.
		 * https://grsmto.github.io/simplebar/
		 *
		 * Made by Adrien Denat from a fork by Jonathan Nicol
		 * Under MIT License
		 */

		// Helper function to retrieve options from element attributes
		var getOptions = function getOptions(obj) {
			var options = Array.prototype.reduce.call(
				obj,
				function (acc, attribute) {
					var option = attribute.name.match(/data-simplebar-(.+)/);

					if (option) {
						var key = option[1].replace(/\W+(.)/g, function (x, chr) {
							return chr.toUpperCase();
						});

						switch (attribute.value) {
							case "true":
								acc[key] = true;
								break;

							case "false":
								acc[key] = false;
								break;

							case undefined:
								acc[key] = true;
								break;

							default:
								acc[key] = attribute.value;
						}
					}

					return acc;
				},
				{}
			);
			return options;
		};
		function getElementWindow(element) {
			if (!element || !element.ownerDocument || !element.ownerDocument.defaultView) {
				return window;
			}

			return element.ownerDocument.defaultView;
		}
		function getElementDocument(element) {
			if (!element || !element.ownerDocument) {
				return document;
			}

			return element.ownerDocument;
		}

		var cachedScrollbarWidth = null;
		var cachedDevicePixelRatio = null;

		if (can_use_dom_default()) {
			window.addEventListener("resize", function () {
				if (cachedDevicePixelRatio !== window.devicePixelRatio) {
					cachedDevicePixelRatio = window.devicePixelRatio;
					cachedScrollbarWidth = null;
				}
			});
		}

		function scrollbarWidth(el) {
			if (cachedScrollbarWidth === null) {
				var document = getElementDocument(el);

				if (typeof document === "undefined") {
					cachedScrollbarWidth = 0;
					return cachedScrollbarWidth;
				}

				var body = document.body;
				var box = document.createElement("div");
				box.classList.add("simplebar-hide-scrollbar");
				body.appendChild(box);
				var width = box.getBoundingClientRect().right;
				body.removeChild(box);
				cachedScrollbarWidth = width;
			}

			return cachedScrollbarWidth;
		}

		var SimpleBar = /*#__PURE__*/ (function () {
			function SimpleBar(element, options) {
				var _this = this;

				this.onScroll = function () {
					var elWindow = getElementWindow(_this.el);

					if (!_this.scrollXTicking) {
						elWindow.requestAnimationFrame(_this.scrollX);
						_this.scrollXTicking = true;
					}

					if (!_this.scrollYTicking) {
						elWindow.requestAnimationFrame(_this.scrollY);
						_this.scrollYTicking = true;
					}
				};

				this.scrollX = function () {
					if (_this.axis.x.isOverflowing) {
						_this.showScrollbar("x");

						_this.positionScrollbar("x");
					}

					_this.scrollXTicking = false;
				};

				this.scrollY = function () {
					if (_this.axis.y.isOverflowing) {
						_this.showScrollbar("y");

						_this.positionScrollbar("y");
					}

					_this.scrollYTicking = false;
				};

				this.onMouseEnter = function () {
					_this.showScrollbar("x");

					_this.showScrollbar("y");
				};

				this.onMouseMove = function (e) {
					_this.mouseX = e.clientX;
					_this.mouseY = e.clientY;

					if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
						_this.onMouseMoveForAxis("x");
					}

					if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
						_this.onMouseMoveForAxis("y");
					}
				};

				this.onMouseLeave = function () {
					_this.onMouseMove.cancel();

					if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
						_this.onMouseLeaveForAxis("x");
					}

					if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
						_this.onMouseLeaveForAxis("y");
					}

					_this.mouseX = -1;
					_this.mouseY = -1;
				};

				this.onWindowResize = function () {
					// Recalculate scrollbarWidth in case it's a zoom
					_this.scrollbarWidth = _this.getScrollbarWidth();

					_this.hideNativeScrollbar();
				};

				this.hideScrollbars = function () {
					_this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
					_this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();

					if (!_this.isWithinBounds(_this.axis.y.track.rect)) {
						_this.axis.y.scrollbar.el.classList.remove(_this.classNames.visible);

						_this.axis.y.isVisible = false;
					}

					if (!_this.isWithinBounds(_this.axis.x.track.rect)) {
						_this.axis.x.scrollbar.el.classList.remove(_this.classNames.visible);

						_this.axis.x.isVisible = false;
					}
				};

				this.onPointerEvent = function (e) {
					var isWithinTrackXBounds, isWithinTrackYBounds;
					_this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
					_this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();

					if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
						isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect);
					}

					if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
						isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect);
					} // If any pointer event is called on the scrollbar

					if (isWithinTrackXBounds || isWithinTrackYBounds) {
						// Preventing the event's default action stops text being
						// selectable during the drag.
						e.preventDefault(); // Prevent event leaking

						e.stopPropagation();

						if (e.type === "mousedown") {
							if (isWithinTrackXBounds) {
								_this.axis.x.scrollbar.rect = _this.axis.x.scrollbar.el.getBoundingClientRect();

								if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) {
									_this.onDragStart(e, "x");
								} else {
									_this.onTrackClick(e, "x");
								}
							}

							if (isWithinTrackYBounds) {
								_this.axis.y.scrollbar.rect = _this.axis.y.scrollbar.el.getBoundingClientRect();

								if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) {
									_this.onDragStart(e, "y");
								} else {
									_this.onTrackClick(e, "y");
								}
							}
						}
					}
				};

				this.drag = function (e) {
					var eventOffset;
					var track = _this.axis[_this.draggedAxis].track;
					var trackSize = track.rect[_this.axis[_this.draggedAxis].sizeAttr];
					var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
					var contentSize = _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollSizeAttr];
					var hostSize = parseInt(_this.elStyles[_this.axis[_this.draggedAxis].sizeAttr], 10);
					e.preventDefault();
					e.stopPropagation();

					if (_this.draggedAxis === "y") {
						eventOffset = e.pageY;
					} else {
						eventOffset = e.pageX;
					} // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).

					var dragPos =
						eventOffset -
						track.rect[_this.axis[_this.draggedAxis].offsetAttr] -
						_this.axis[_this.draggedAxis].dragOffset; // Convert the mouse position into a percentage of the scrollbar height/width.

					var dragPerc = dragPos / (trackSize - scrollbar.size); // Scroll the content by the same percentage.

					var scrollPos = dragPerc * (contentSize - hostSize); // Fix browsers inconsistency on RTL

					if (_this.draggedAxis === "x") {
						scrollPos =
							_this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted
								? scrollPos - (trackSize + scrollbar.size)
								: scrollPos;
						scrollPos =
							_this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted ? -scrollPos : scrollPos;
					}

					_this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] = scrollPos;
				};

				this.onEndDrag = function (e) {
					var elDocument = getElementDocument(_this.el);
					var elWindow = getElementWindow(_this.el);
					e.preventDefault();
					e.stopPropagation();

					_this.el.classList.remove(_this.classNames.dragging);

					elDocument.removeEventListener("mousemove", _this.drag, true);
					elDocument.removeEventListener("mouseup", _this.onEndDrag, true);
					_this.removePreventClickId = elWindow.setTimeout(function () {
						// Remove these asynchronously so we still suppress click events
						// generated simultaneously with mouseup.
						elDocument.removeEventListener("click", _this.preventClick, true);
						elDocument.removeEventListener("dblclick", _this.preventClick, true);
						_this.removePreventClickId = null;
					});
				};

				this.preventClick = function (e) {
					e.preventDefault();
					e.stopPropagation();
				};

				this.el = element;
				this.minScrollbarWidth = 20;
				this.options = Object.assign({}, SimpleBar.defaultOptions, options);
				this.classNames = Object.assign({}, SimpleBar.defaultOptions.classNames, this.options.classNames);
				this.axis = {
					x: {
						scrollOffsetAttr: "scrollLeft",
						sizeAttr: "width",
						scrollSizeAttr: "scrollWidth",
						offsetSizeAttr: "offsetWidth",
						offsetAttr: "left",
						overflowAttr: "overflowX",
						dragOffset: 0,
						isOverflowing: true,
						isVisible: false,
						forceVisible: false,
						track: {},
						scrollbar: {},
					},
					y: {
						scrollOffsetAttr: "scrollTop",
						sizeAttr: "height",
						scrollSizeAttr: "scrollHeight",
						offsetSizeAttr: "offsetHeight",
						offsetAttr: "top",
						overflowAttr: "overflowY",
						dragOffset: 0,
						isOverflowing: true,
						isVisible: false,
						forceVisible: false,
						track: {},
						scrollbar: {},
					},
				};
				this.removePreventClickId = null; // Don't re-instantiate over an existing one

				if (SimpleBar.instances.has(this.el)) {
					return;
				}

				this.recalculate = lodash_throttle_default()(this.recalculate.bind(this), 64);
				this.onMouseMove = lodash_throttle_default()(this.onMouseMove.bind(this), 64);
				this.hideScrollbars = lodash_debounce_default()(this.hideScrollbars.bind(this), this.options.timeout);
				this.onWindowResize = lodash_debounce_default()(this.onWindowResize.bind(this), 64, {
					leading: true,
				});
				SimpleBar.getRtlHelpers = lodash_memoize_default()(SimpleBar.getRtlHelpers);
				this.init();
			}
			/**
			 * Static properties
			 */

			/**
			 * Helper to fix browsers inconsistency on RTL:
			 *  - Firefox inverts the scrollbar initial position
			 *  - IE11 inverts both scrollbar position and scrolling offset
			 * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
			 */

			SimpleBar.getRtlHelpers = function getRtlHelpers() {
				var dummyDiv = document.createElement("div");
				dummyDiv.innerHTML =
					'<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
				var scrollbarDummyEl = dummyDiv.firstElementChild;
				document.body.appendChild(scrollbarDummyEl);
				var dummyContainerChild = scrollbarDummyEl.firstElementChild;
				scrollbarDummyEl.scrollLeft = 0;
				var dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
				var dummyContainerChildOffset = SimpleBar.getOffset(dummyContainerChild);
				scrollbarDummyEl.scrollLeft = 999;
				var dummyContainerScrollOffsetAfterScroll = SimpleBar.getOffset(dummyContainerChild);
				return {
					// determines if the scrolling is responding with negative values
					isRtlScrollingInverted:
						dummyContainerOffset.left !== dummyContainerChildOffset.left &&
						dummyContainerChildOffset.left - dummyContainerScrollOffsetAfterScroll.left !== 0,
					// determines if the origin scrollbar position is inverted or not (positioned on left or right)
					isRtlScrollbarInverted: dummyContainerOffset.left !== dummyContainerChildOffset.left,
				};
			};

			SimpleBar.getOffset = function getOffset(el) {
				var rect = el.getBoundingClientRect();
				var elDocument = getElementDocument(el);
				var elWindow = getElementWindow(el);
				return {
					top: rect.top + (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
					left: rect.left + (elWindow.pageXOffset || elDocument.documentElement.scrollLeft),
				};
			};

			var _proto = SimpleBar.prototype;

			_proto.init = function init() {
				// Save a reference to the instance, so we know this DOM node has already been instancied
				SimpleBar.instances.set(this.el, this); // We stop here on server-side

				if (can_use_dom_default()) {
					this.initDOM();
					this.setAccessibilityAttributes();
					this.scrollbarWidth = this.getScrollbarWidth();
					this.recalculate();
					this.initListeners();
				}
			};

			_proto.initDOM = function initDOM() {
				var _this2 = this;

				// make sure this element doesn't have the elements yet
				if (
					Array.prototype.filter.call(this.el.children, function (child) {
						return child.classList.contains(_this2.classNames.wrapper);
					}).length
				) {
					// assume that element has his DOM already initiated
					this.wrapperEl = this.el.querySelector("." + this.classNames.wrapper);
					this.contentWrapperEl =
						this.options.scrollableNode || this.el.querySelector("." + this.classNames.contentWrapper);
					this.contentEl = this.options.contentNode || this.el.querySelector("." + this.classNames.contentEl);
					this.offsetEl = this.el.querySelector("." + this.classNames.offset);
					this.maskEl = this.el.querySelector("." + this.classNames.mask);
					this.placeholderEl = this.findChild(this.wrapperEl, "." + this.classNames.placeholder);
					this.heightAutoObserverWrapperEl = this.el.querySelector(
						"." + this.classNames.heightAutoObserverWrapperEl
					);
					this.heightAutoObserverEl = this.el.querySelector("." + this.classNames.heightAutoObserverEl);
					this.axis.x.track.el = this.findChild(
						this.el,
						"." + this.classNames.track + "." + this.classNames.horizontal
					);
					this.axis.y.track.el = this.findChild(
						this.el,
						"." + this.classNames.track + "." + this.classNames.vertical
					);
				} else {
					// Prepare DOM
					this.wrapperEl = document.createElement("div");
					this.contentWrapperEl = document.createElement("div");
					this.offsetEl = document.createElement("div");
					this.maskEl = document.createElement("div");
					this.contentEl = document.createElement("div");
					this.placeholderEl = document.createElement("div");
					this.heightAutoObserverWrapperEl = document.createElement("div");
					this.heightAutoObserverEl = document.createElement("div");
					this.wrapperEl.classList.add(this.classNames.wrapper);
					this.contentWrapperEl.classList.add(this.classNames.contentWrapper);
					this.offsetEl.classList.add(this.classNames.offset);
					this.maskEl.classList.add(this.classNames.mask);
					this.contentEl.classList.add(this.classNames.contentEl);
					this.placeholderEl.classList.add(this.classNames.placeholder);
					this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl);
					this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl);

					while (this.el.firstChild) {
						this.contentEl.appendChild(this.el.firstChild);
					}

					this.contentWrapperEl.appendChild(this.contentEl);
					this.offsetEl.appendChild(this.contentWrapperEl);
					this.maskEl.appendChild(this.offsetEl);
					this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
					this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
					this.wrapperEl.appendChild(this.maskEl);
					this.wrapperEl.appendChild(this.placeholderEl);
					this.el.appendChild(this.wrapperEl);
				}

				if (!this.axis.x.track.el || !this.axis.y.track.el) {
					var track = document.createElement("div");
					var scrollbar = document.createElement("div");
					track.classList.add(this.classNames.track);
					scrollbar.classList.add(this.classNames.scrollbar);
					track.appendChild(scrollbar);
					this.axis.x.track.el = track.cloneNode(true);
					this.axis.x.track.el.classList.add(this.classNames.horizontal);
					this.axis.y.track.el = track.cloneNode(true);
					this.axis.y.track.el.classList.add(this.classNames.vertical);
					this.el.appendChild(this.axis.x.track.el);
					this.el.appendChild(this.axis.y.track.el);
				}

				this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector("." + this.classNames.scrollbar);
				this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector("." + this.classNames.scrollbar);

				if (!this.options.autoHide) {
					this.axis.x.scrollbar.el.classList.add(this.classNames.visible);
					this.axis.y.scrollbar.el.classList.add(this.classNames.visible);
				}

				this.el.setAttribute("data-simplebar", "init");
			};

			_proto.setAccessibilityAttributes = function setAccessibilityAttributes() {
				var ariaLabel = this.options.ariaLabel || "scrollable content";
				this.contentWrapperEl.setAttribute("tabindex", "0");
				this.contentWrapperEl.setAttribute("role", "region");
				this.contentWrapperEl.setAttribute("aria-label", ariaLabel);
			};

			_proto.initListeners = function initListeners() {
				var _this3 = this;

				var elWindow = getElementWindow(this.el); // Event listeners

				if (this.options.autoHide) {
					this.el.addEventListener("mouseenter", this.onMouseEnter);
				}

				["mousedown", "click", "dblclick"].forEach(function (e) {
					_this3.el.addEventListener(e, _this3.onPointerEvent, true);
				});
				["touchstart", "touchend", "touchmove"].forEach(function (e) {
					_this3.el.addEventListener(e, _this3.onPointerEvent, {
						capture: true,
						passive: true,
					});
				});
				this.el.addEventListener("mousemove", this.onMouseMove);
				this.el.addEventListener("mouseleave", this.onMouseLeave);
				this.contentWrapperEl.addEventListener("scroll", this.onScroll); // Browser zoom triggers a window resize

				elWindow.addEventListener("resize", this.onWindowResize); // Hack for https://github.com/WICG/ResizeObserver/issues/38

				var resizeObserverStarted = false;
				var resizeAnimationFrameId = null;
				var resizeObserver = elWindow.ResizeObserver || ResizeObserver_ResizeObserver;
				this.resizeObserver = new resizeObserver(function () {
					if (!resizeObserverStarted || resizeAnimationFrameId !== null) return;
					resizeAnimationFrameId = elWindow.requestAnimationFrame(function () {
						_this3.recalculate();

						resizeAnimationFrameId = null;
					});
				});
				this.resizeObserver.observe(this.el);
				this.resizeObserver.observe(this.contentEl);
				elWindow.requestAnimationFrame(function () {
					resizeObserverStarted = true;
				}); // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.

				this.mutationObserver = new elWindow.MutationObserver(this.recalculate);
				this.mutationObserver.observe(this.contentEl, {
					childList: true,
					subtree: true,
					characterData: true,
				});
			};

			_proto.recalculate = function recalculate() {
				var elWindow = getElementWindow(this.el);
				this.elStyles = elWindow.getComputedStyle(this.el);
				this.isRtl = this.elStyles.direction === "rtl";
				var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
				var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1;
				var contentElOffsetWidth = this.contentEl.offsetWidth;
				var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
				var elOverflowX = this.elStyles.overflowX;
				var elOverflowY = this.elStyles.overflowY;
				this.contentEl.style.padding =
					this.elStyles.paddingTop +
					" " +
					this.elStyles.paddingRight +
					" " +
					this.elStyles.paddingBottom +
					" " +
					this.elStyles.paddingLeft;
				this.wrapperEl.style.margin =
					"-" +
					this.elStyles.paddingTop +
					" -" +
					this.elStyles.paddingRight +
					" -" +
					this.elStyles.paddingBottom +
					" -" +
					this.elStyles.paddingLeft;
				var contentElScrollHeight = this.contentEl.scrollHeight;
				var contentElScrollWidth = this.contentEl.scrollWidth;
				this.contentWrapperEl.style.height = isHeightAuto ? "auto" : "100%"; // Determine placeholder size

				this.placeholderEl.style.width = isWidthAuto ? contentElOffsetWidth + "px" : "auto";
				this.placeholderEl.style.height = contentElScrollHeight + "px";
				var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
				this.axis.x.isOverflowing = contentElScrollWidth > contentElOffsetWidth;
				this.axis.y.isOverflowing = contentElScrollHeight > contentWrapperElOffsetHeight; // Set isOverflowing to false if user explicitely set hidden overflow

				this.axis.x.isOverflowing = elOverflowX === "hidden" ? false : this.axis.x.isOverflowing;
				this.axis.y.isOverflowing = elOverflowY === "hidden" ? false : this.axis.y.isOverflowing;
				this.axis.x.forceVisible = this.options.forceVisible === "x" || this.options.forceVisible === true;
				this.axis.y.forceVisible = this.options.forceVisible === "y" || this.options.forceVisible === true;
				this.hideNativeScrollbar(); // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)

				var offsetForXScrollbar = this.axis.x.isOverflowing ? this.scrollbarWidth : 0;
				var offsetForYScrollbar = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
				this.axis.x.isOverflowing =
					this.axis.x.isOverflowing &&
					contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
				this.axis.y.isOverflowing =
					this.axis.y.isOverflowing &&
					contentElScrollHeight > contentWrapperElOffsetHeight - offsetForXScrollbar;
				this.axis.x.scrollbar.size = this.getScrollbarSize("x");
				this.axis.y.scrollbar.size = this.getScrollbarSize("y");
				this.axis.x.scrollbar.el.style.width = this.axis.x.scrollbar.size + "px";
				this.axis.y.scrollbar.el.style.height = this.axis.y.scrollbar.size + "px";
				this.positionScrollbar("x");
				this.positionScrollbar("y");
				this.toggleTrackVisibility("x");
				this.toggleTrackVisibility("y");
			};
			/**
			 * Calculate scrollbar size
			 */

			_proto.getScrollbarSize = function getScrollbarSize(axis) {
				if (axis === void 0) {
					axis = "y";
				}

				if (!this.axis[axis].isOverflowing) {
					return 0;
				}

				var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
				var trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
				var scrollbarSize;
				var scrollbarRatio = trackSize / contentSize; // Calculate new height/position of drag handle.

				scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);

				if (this.options.scrollbarMaxSize) {
					scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
				}

				return scrollbarSize;
			};

			_proto.positionScrollbar = function positionScrollbar(axis) {
				if (axis === void 0) {
					axis = "y";
				}

				if (!this.axis[axis].isOverflowing) {
					return;
				}

				var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
				var trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
				var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
				var scrollbar = this.axis[axis].scrollbar;
				var scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
				scrollOffset =
					axis === "x" && this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted
						? -scrollOffset
						: scrollOffset;
				var scrollPourcent = scrollOffset / (contentSize - hostSize);
				var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
				handleOffset =
					axis === "x" && this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted
						? handleOffset + (trackSize - scrollbar.size)
						: handleOffset;
				scrollbar.el.style.transform =
					axis === "x"
						? "translate3d(" + handleOffset + "px, 0, 0)"
						: "translate3d(0, " + handleOffset + "px, 0)";
			};

			_proto.toggleTrackVisibility = function toggleTrackVisibility(axis) {
				if (axis === void 0) {
					axis = "y";
				}

				var track = this.axis[axis].track.el;
				var scrollbar = this.axis[axis].scrollbar.el;

				if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
					track.style.visibility = "visible";
					this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "scroll";
				} else {
					track.style.visibility = "hidden";
					this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "hidden";
				} // Even if forceVisible is enabled, scrollbar itself should be hidden

				if (this.axis[axis].isOverflowing) {
					scrollbar.style.display = "block";
				} else {
					scrollbar.style.display = "none";
				}
			};

			_proto.hideNativeScrollbar = function hideNativeScrollbar() {
				this.offsetEl.style[this.isRtl ? "left" : "right"] =
					this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-" + this.scrollbarWidth + "px" : 0;
				this.offsetEl.style.bottom =
					this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-" + this.scrollbarWidth + "px" : 0;
			};
			/**
			 * On scroll event handling
			 */

			_proto.onMouseMoveForAxis = function onMouseMoveForAxis(axis) {
				if (axis === void 0) {
					axis = "y";
				}

				this.axis[axis].track.rect = this.axis[axis].track.el.getBoundingClientRect();
				this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
				var isWithinScrollbarBoundsX = this.isWithinBounds(this.axis[axis].scrollbar.rect);

				if (isWithinScrollbarBoundsX) {
					this.axis[axis].scrollbar.el.classList.add(this.classNames.hover);
				} else {
					this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
				}

				if (this.isWithinBounds(this.axis[axis].track.rect)) {
					this.showScrollbar(axis);
					this.axis[axis].track.el.classList.add(this.classNames.hover);
				} else {
					this.axis[axis].track.el.classList.remove(this.classNames.hover);
				}
			};

			_proto.onMouseLeaveForAxis = function onMouseLeaveForAxis(axis) {
				if (axis === void 0) {
					axis = "y";
				}

				this.axis[axis].track.el.classList.remove(this.classNames.hover);
				this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
			};

			/**
			 * Show scrollbar
			 */
			_proto.showScrollbar = function showScrollbar(axis) {
				if (axis === void 0) {
					axis = "y";
				}

				var scrollbar = this.axis[axis].scrollbar.el;

				if (!this.axis[axis].isVisible) {
					scrollbar.classList.add(this.classNames.visible);
					this.axis[axis].isVisible = true;
				}

				if (this.options.autoHide) {
					this.hideScrollbars();
				}
			};
			/**
			 * Hide Scrollbar
			 */

			/**
			 * on scrollbar handle drag movement starts
			 */
			_proto.onDragStart = function onDragStart(e, axis) {
				if (axis === void 0) {
					axis = "y";
				}

				var elDocument = getElementDocument(this.el);
				var elWindow = getElementWindow(this.el);
				var scrollbar = this.axis[axis].scrollbar; // Measure how far the user's mouse is from the top of the scrollbar drag handle.

				var eventOffset = axis === "y" ? e.pageY : e.pageX;
				this.axis[axis].dragOffset = eventOffset - scrollbar.rect[this.axis[axis].offsetAttr];
				this.draggedAxis = axis;
				this.el.classList.add(this.classNames.dragging);
				elDocument.addEventListener("mousemove", this.drag, true);
				elDocument.addEventListener("mouseup", this.onEndDrag, true);

				if (this.removePreventClickId === null) {
					elDocument.addEventListener("click", this.preventClick, true);
					elDocument.addEventListener("dblclick", this.preventClick, true);
				} else {
					elWindow.clearTimeout(this.removePreventClickId);
					this.removePreventClickId = null;
				}
			};
			/**
			 * Drag scrollbar handle
			 */

			_proto.onTrackClick = function onTrackClick(e, axis) {
				var _this4 = this;

				if (axis === void 0) {
					axis = "y";
				}

				if (!this.options.clickOnTrack) return;
				var elWindow = getElementWindow(this.el);
				this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
				var scrollbar = this.axis[axis].scrollbar;
				var scrollbarOffset = scrollbar.rect[this.axis[axis].offsetAttr];
				var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
				var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
				var t = axis === "y" ? this.mouseY - scrollbarOffset : this.mouseX - scrollbarOffset;
				var dir = t < 0 ? -1 : 1;
				var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;

				var scrollTo = function scrollTo() {
					if (dir === -1) {
						if (scrolled > scrollSize) {
							var _this4$contentWrapper;

							scrolled -= _this4.options.clickOnTrackSpeed;

							_this4.contentWrapperEl.scrollTo(
								((_this4$contentWrapper = {}),
								(_this4$contentWrapper[_this4.axis[axis].offsetAttr] = scrolled),
								_this4$contentWrapper)
							);

							elWindow.requestAnimationFrame(scrollTo);
						}
					} else {
						if (scrolled < scrollSize) {
							var _this4$contentWrapper2;

							scrolled += _this4.options.clickOnTrackSpeed;

							_this4.contentWrapperEl.scrollTo(
								((_this4$contentWrapper2 = {}),
								(_this4$contentWrapper2[_this4.axis[axis].offsetAttr] = scrolled),
								_this4$contentWrapper2)
							);

							elWindow.requestAnimationFrame(scrollTo);
						}
					}
				};

				scrollTo();
			};
			/**
			 * Getter for content element
			 */

			_proto.getContentElement = function getContentElement() {
				return this.contentEl;
			};
			/**
			 * Getter for original scrolling element
			 */

			_proto.getScrollElement = function getScrollElement() {
				return this.contentWrapperEl;
			};

			_proto.getScrollbarWidth = function getScrollbarWidth() {
				// Try/catch for FF 56 throwing on undefined computedStyles
				try {
					// Detect browsers supporting CSS scrollbar styling and do not calculate
					if (
						getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display === "none" ||
						"scrollbarWidth" in document.documentElement.style ||
						"-ms-overflow-style" in document.documentElement.style
					) {
						return 0;
					} else {
						return scrollbarWidth(this.el);
					}
				} catch (e) {
					return scrollbarWidth(this.el);
				}
			};

			_proto.removeListeners = function removeListeners() {
				var _this5 = this;

				var elWindow = getElementWindow(this.el); // Event listeners

				if (this.options.autoHide) {
					this.el.removeEventListener("mouseenter", this.onMouseEnter);
				}

				["mousedown", "click", "dblclick"].forEach(function (e) {
					_this5.el.removeEventListener(e, _this5.onPointerEvent, true);
				});
				["touchstart", "touchend", "touchmove"].forEach(function (e) {
					_this5.el.removeEventListener(e, _this5.onPointerEvent, {
						capture: true,
						passive: true,
					});
				});
				this.el.removeEventListener("mousemove", this.onMouseMove);
				this.el.removeEventListener("mouseleave", this.onMouseLeave);

				if (this.contentWrapperEl) {
					this.contentWrapperEl.removeEventListener("scroll", this.onScroll);
				}

				elWindow.removeEventListener("resize", this.onWindowResize);

				if (this.mutationObserver) {
					this.mutationObserver.disconnect();
				}

				if (this.resizeObserver) {
					this.resizeObserver.disconnect();
				} // Cancel all debounced functions

				this.recalculate.cancel();
				this.onMouseMove.cancel();
				this.hideScrollbars.cancel();
				this.onWindowResize.cancel();
			};
			/**
			 * UnMount mutation observer and delete SimpleBar instance from DOM element
			 */

			_proto.unMount = function unMount() {
				this.removeListeners();
				SimpleBar.instances.delete(this.el);
			};
			/**
			 * Check if mouse is within bounds
			 */

			_proto.isWithinBounds = function isWithinBounds(bbox) {
				return (
					this.mouseX >= bbox.left &&
					this.mouseX <= bbox.left + bbox.width &&
					this.mouseY >= bbox.top &&
					this.mouseY <= bbox.top + bbox.height
				);
			};
			/**
			 * Find element children matches query
			 */

			_proto.findChild = function findChild(el, query) {
				var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
				return Array.prototype.filter.call(el.children, function (child) {
					return matches.call(child, query);
				})[0];
			};

			return SimpleBar;
		})();

		SimpleBar.defaultOptions = {
			autoHide: true,
			forceVisible: false,
			clickOnTrack: true,
			clickOnTrackSpeed: 40,
			classNames: {
				contentEl: "simplebar-content",
				contentWrapper: "simplebar-content-wrapper",
				offset: "simplebar-offset",
				mask: "simplebar-mask",
				wrapper: "simplebar-wrapper",
				placeholder: "simplebar-placeholder",
				scrollbar: "simplebar-scrollbar",
				track: "simplebar-track",
				heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
				heightAutoObserverEl: "simplebar-height-auto-observer",
				visible: "simplebar-visible",
				horizontal: "simplebar-horizontal",
				vertical: "simplebar-vertical",
				hover: "simplebar-hover",
				dragging: "simplebar-dragging",
			},
			scrollbarMinSize: 25,
			scrollbarMaxSize: 0,
			timeout: 1000,
		};
		SimpleBar.instances = new WeakMap();

		SimpleBar.initDOMLoadedElements = function () {
			document.removeEventListener("DOMContentLoaded", this.initDOMLoadedElements);
			window.removeEventListener("load", this.initDOMLoadedElements);
			Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"), function (el) {
				if (el.getAttribute("data-simplebar") !== "init" && !SimpleBar.instances.has(el))
					new SimpleBar(el, getOptions(el.attributes));
			});
		};

		SimpleBar.removeObserver = function () {
			this.globalObserver.disconnect();
		};

		SimpleBar.initHtmlApi = function () {
			this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this); // MutationObserver is IE11+

			if (typeof MutationObserver !== "undefined") {
				// Mutation observer to observe dynamically added elements
				this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
				this.globalObserver.observe(document, {
					childList: true,
					subtree: true,
				});
			} // Taken from jQuery `ready` function
			// Instantiate elements already present on the page

			if (
				document.readyState === "complete" ||
				(document.readyState !== "loading" && !document.documentElement.doScroll)
			) {
				// Handle it asynchronously to allow scripts the opportunity to delay init
				window.setTimeout(this.initDOMLoadedElements);
			} else {
				document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements);
				window.addEventListener("load", this.initDOMLoadedElements);
			}
		};

		SimpleBar.handleMutations = function (mutations) {
			mutations.forEach(function (mutation) {
				Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
					if (addedNode.nodeType === 1) {
						if (addedNode.hasAttribute("data-simplebar")) {
							!SimpleBar.instances.has(addedNode) &&
								document.documentElement.contains(addedNode) &&
								new SimpleBar(addedNode, getOptions(addedNode.attributes));
						} else {
							Array.prototype.forEach.call(addedNode.querySelectorAll("[data-simplebar]"), function (el) {
								if (
									el.getAttribute("data-simplebar") !== "init" &&
									!SimpleBar.instances.has(el) &&
									document.documentElement.contains(el)
								)
									new SimpleBar(el, getOptions(el.attributes));
							});
						}
					}
				});
				Array.prototype.forEach.call(mutation.removedNodes, function (removedNode) {
					if (removedNode.nodeType === 1) {
						if (removedNode.getAttribute("data-simplebar") === "init") {
							SimpleBar.instances.has(removedNode) &&
								!document.documentElement.contains(removedNode) &&
								SimpleBar.instances.get(removedNode).unMount();
						} else {
							Array.prototype.forEach.call(
								removedNode.querySelectorAll('[data-simplebar="init"]'),
								function (el) {
									SimpleBar.instances.has(el) &&
										!document.documentElement.contains(el) &&
										SimpleBar.instances.get(el).unMount();
								}
							);
						}
					}
				});
			});
		};

		SimpleBar.getOptions = getOptions;
		/**
		 * HTML API
		 * Called only in a browser env.
		 */

		if (can_use_dom_default()) {
			SimpleBar.initHtmlApi();
		}

		/* harmony default export */ const simplebar_esm = /* unused pure expression or super */ null && SimpleBar; // CONCATENATED MODULE: ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
		//# sourceMappingURL=simplebar.esm.js.map

		/**
		 * A collection of shims that provide minimal functionality of the ES6 collections.
		 *
		 * These implementations are not meant to be used outside of the ResizeObserver
		 * modules as they cover only a limited range of use cases.
		 */
		/* eslint-disable require-jsdoc, valid-jsdoc */
		var MapShim = (function () {
			if (typeof Map !== "undefined") {
				return Map;
			}
			/**
			 * Returns index in provided array that matches the specified key.
			 *
			 * @param {Array<Array>} arr
			 * @param {*} key
			 * @returns {number}
			 */
			function getIndex(arr, key) {
				var result = -1;
				arr.some(function (entry, index) {
					if (entry[0] === key) {
						result = index;
						return true;
					}
					return false;
				});
				return result;
			}
			return /** @class */ (function () {
				function class_1() {
					this.__entries__ = [];
				}
				Object.defineProperty(class_1.prototype, "size", {
					/**
					 * @returns {boolean}
					 */
					get: function () {
						return this.__entries__.length;
					},
					enumerable: true,
					configurable: true,
				});
				/**
				 * @param {*} key
				 * @returns {*}
				 */
				class_1.prototype.get = function (key) {
					var index = getIndex(this.__entries__, key);
					var entry = this.__entries__[index];
					return entry && entry[1];
				};
				/**
				 * @param {*} key
				 * @param {*} value
				 * @returns {void}
				 */
				class_1.prototype.set = function (key, value) {
					var index = getIndex(this.__entries__, key);
					if (~index) {
						this.__entries__[index][1] = value;
					} else {
						this.__entries__.push([key, value]);
					}
				};
				/**
				 * @param {*} key
				 * @returns {void}
				 */
				class_1.prototype.delete = function (key) {
					var entries = this.__entries__;
					var index = getIndex(entries, key);
					if (~index) {
						entries.splice(index, 1);
					}
				};
				/**
				 * @param {*} key
				 * @returns {void}
				 */
				class_1.prototype.has = function (key) {
					return !!~getIndex(this.__entries__, key);
				};
				/**
				 * @returns {void}
				 */
				class_1.prototype.clear = function () {
					this.__entries__.splice(0);
				};
				/**
				 * @param {Function} callback
				 * @param {*} [ctx=null]
				 * @returns {void}
				 */
				class_1.prototype.forEach = function (callback, ctx) {
					if (ctx === void 0) {
						ctx = null;
					}
					for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
						var entry = _a[_i];
						callback.call(ctx, entry[1], entry[0]);
					}
				};
				return class_1;
			})();
		})();

		/**
		 * Detects whether window and document objects are available in current environment.
		 */
		var isBrowser =
			typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;

		// Returns global object of a current environment.
		var global$1 = (function () {
			if (typeof __webpack_require__.g !== "undefined" && __webpack_require__.g.Math === Math) {
				return __webpack_require__.g;
			}
			if (typeof self !== "undefined" && self.Math === Math) {
				return self;
			}
			if (typeof window !== "undefined" && window.Math === Math) {
				return window;
			}
			// eslint-disable-next-line no-new-func
			return Function("return this")();
		})();

		/**
		 * A shim for the requestAnimationFrame which falls back to the setTimeout if
		 * first one is not supported.
		 *
		 * @returns {number} Requests' identifier.
		 */
		var requestAnimationFrame$1 = (function () {
			if (typeof requestAnimationFrame === "function") {
				// It's required to use a bounded function because IE sometimes throws
				// an "Invalid calling object" error if rAF is invoked without the global
				// object on the left hand side.
				return requestAnimationFrame.bind(global$1);
			}
			return function (callback) {
				return setTimeout(function () {
					return callback(Date.now());
				}, 1000 / 60);
			};
		})();

		// Defines minimum timeout before adding a trailing call.
		var trailingTimeout = 2;
		/**
		 * Creates a wrapper function which ensures that provided callback will be
		 * invoked only once during the specified delay period.
		 *
		 * @param {Function} callback - Function to be invoked after the delay period.
		 * @param {number} delay - Delay after which to invoke callback.
		 * @returns {Function}
		 */
		function throttle(callback, delay) {
			var leadingCall = false,
				trailingCall = false,
				lastCallTime = 0;
			/**
			 * Invokes the original callback function and schedules new invocation if
			 * the "proxy" was called during current request.
			 *
			 * @returns {void}
			 */
			function resolvePending() {
				if (leadingCall) {
					leadingCall = false;
					callback();
				}
				if (trailingCall) {
					proxy();
				}
			}
			/**
			 * Callback invoked after the specified delay. It will further postpone
			 * invocation of the original function delegating it to the
			 * requestAnimationFrame.
			 *
			 * @returns {void}
			 */
			function timeoutCallback() {
				requestAnimationFrame$1(resolvePending);
			}
			/**
			 * Schedules invocation of the original function.
			 *
			 * @returns {void}
			 */
			function proxy() {
				var timeStamp = Date.now();
				if (leadingCall) {
					// Reject immediately following calls.
					if (timeStamp - lastCallTime < trailingTimeout) {
						return;
					}
					// Schedule new call to be in invoked when the pending one is resolved.
					// This is important for "transitions" which never actually start
					// immediately so there is a chance that we might miss one if change
					// happens amids the pending invocation.
					trailingCall = true;
				} else {
					leadingCall = true;
					trailingCall = false;
					setTimeout(timeoutCallback, delay);
				}
				lastCallTime = timeStamp;
			}
			return proxy;
		}

		// Minimum delay before invoking the update of observers.
		var REFRESH_DELAY = 20;
		// A list of substrings of CSS properties used to find transition events that
		// might affect dimensions of observed elements.
		var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
		// Check if MutationObserver is available.
		var mutationObserverSupported = typeof MutationObserver !== "undefined";
		/**
		 * Singleton controller class which handles updates of ResizeObserver instances.
		 */
		var ResizeObserver_es_ResizeObserverController = /** @class */ (function () {
			/**
			 * Creates a new instance of ResizeObserverController.
			 *
			 * @private
			 */
			function ResizeObserverController() {
				/**
				 * Indicates whether DOM listeners have been added.
				 *
				 * @private {boolean}
				 */
				this.connected_ = false;
				/**
				 * Tells that controller has subscribed for Mutation Events.
				 *
				 * @private {boolean}
				 */
				this.mutationEventsAdded_ = false;
				/**
				 * Keeps reference to the instance of MutationObserver.
				 *
				 * @private {MutationObserver}
				 */
				this.mutationsObserver_ = null;
				/**
				 * A list of connected observers.
				 *
				 * @private {Array<ResizeObserverSPI>}
				 */
				this.observers_ = [];
				this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
				this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
			}
			/**
			 * Adds observer to observers list.
			 *
			 * @param {ResizeObserverSPI} observer - Observer to be added.
			 * @returns {void}
			 */
			ResizeObserverController.prototype.addObserver = function (observer) {
				if (!~this.observers_.indexOf(observer)) {
					this.observers_.push(observer);
				}
				// Add listeners if they haven't been added yet.
				if (!this.connected_) {
					this.connect_();
				}
			};
			/**
			 * Removes observer from observers list.
			 *
			 * @param {ResizeObserverSPI} observer - Observer to be removed.
			 * @returns {void}
			 */
			ResizeObserverController.prototype.removeObserver = function (observer) {
				var observers = this.observers_;
				var index = observers.indexOf(observer);
				// Remove observer if it's present in registry.
				if (~index) {
					observers.splice(index, 1);
				}
				// Remove listeners if controller has no connected observers.
				if (!observers.length && this.connected_) {
					this.disconnect_();
				}
			};
			/**
			 * Invokes the update of observers. It will continue running updates insofar
			 * it detects changes.
			 *
			 * @returns {void}
			 */
			ResizeObserverController.prototype.refresh = function () {
				var changesDetected = this.updateObservers_();
				// Continue running updates if changes have been detected as there might
				// be future ones caused by CSS transitions.
				if (changesDetected) {
					this.refresh();
				}
			};
			/**
			 * Updates every observer from observers list and notifies them of queued
			 * entries.
			 *
			 * @private
			 * @returns {boolean} Returns "true" if any observer has detected changes in
			 *      dimensions of it's elements.
			 */
			ResizeObserverController.prototype.updateObservers_ = function () {
				// Collect observers that have active observations.
				var activeObservers = this.observers_.filter(function (observer) {
					return observer.gatherActive(), observer.hasActive();
				});
				// Deliver notifications in a separate cycle in order to avoid any
				// collisions between observers, e.g. when multiple instances of
				// ResizeObserver are tracking the same element and the callback of one
				// of them changes content dimensions of the observed target. Sometimes
				// this may result in notifications being blocked for the rest of observers.
				activeObservers.forEach(function (observer) {
					return observer.broadcastActive();
				});
				return activeObservers.length > 0;
			};
			/**
			 * Initializes DOM listeners.
			 *
			 * @private
			 * @returns {void}
			 */
			ResizeObserverController.prototype.connect_ = function () {
				// Do nothing if running in a non-browser environment or if listeners
				// have been already added.
				if (!isBrowser || this.connected_) {
					return;
				}
				// Subscription to the "Transitionend" event is used as a workaround for
				// delayed transitions. This way it's possible to capture at least the
				// final state of an element.
				document.addEventListener("transitionend", this.onTransitionEnd_);
				window.addEventListener("resize", this.refresh);
				if (mutationObserverSupported) {
					this.mutationsObserver_ = new MutationObserver(this.refresh);
					this.mutationsObserver_.observe(document, {
						attributes: true,
						childList: true,
						characterData: true,
						subtree: true,
					});
				} else {
					document.addEventListener("DOMSubtreeModified", this.refresh);
					this.mutationEventsAdded_ = true;
				}
				this.connected_ = true;
			};
			/**
			 * Removes DOM listeners.
			 *
			 * @private
			 * @returns {void}
			 */
			ResizeObserverController.prototype.disconnect_ = function () {
				// Do nothing if running in a non-browser environment or if listeners
				// have been already removed.
				if (!isBrowser || !this.connected_) {
					return;
				}
				document.removeEventListener("transitionend", this.onTransitionEnd_);
				window.removeEventListener("resize", this.refresh);
				if (this.mutationsObserver_) {
					this.mutationsObserver_.disconnect();
				}
				if (this.mutationEventsAdded_) {
					document.removeEventListener("DOMSubtreeModified", this.refresh);
				}
				this.mutationsObserver_ = null;
				this.mutationEventsAdded_ = false;
				this.connected_ = false;
			};
			/**
			 * "Transitionend" event handler.
			 *
			 * @private
			 * @param {TransitionEvent} event
			 * @returns {void}
			 */
			ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
				var _b = _a.propertyName,
					propertyName = _b === void 0 ? "" : _b;
				// Detect whether transition may affect dimensions of an element.
				var isReflowProperty = transitionKeys.some(function (key) {
					return !!~propertyName.indexOf(key);
				});
				if (isReflowProperty) {
					this.refresh();
				}
			};
			/**
			 * Returns instance of the ResizeObserverController.
			 *
			 * @returns {ResizeObserverController}
			 */
			ResizeObserverController.getInstance = function () {
				if (!this.instance_) {
					this.instance_ = new ResizeObserverController();
				}
				return this.instance_;
			};
			/**
			 * Holds reference to the controller's instance.
			 *
			 * @private {ResizeObserverController}
			 */
			ResizeObserverController.instance_ = null;
			return ResizeObserverController;
		})();

		/**
		 * Defines non-writable/enumerable properties of the provided target object.
		 *
		 * @param {Object} target - Object for which to define properties.
		 * @param {Object} props - Properties to be defined.
		 * @returns {Object} Target object.
		 */
		var defineConfigurable = function (target, props) {
			for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
				var key = _a[_i];
				Object.defineProperty(target, key, {
					value: props[key],
					enumerable: false,
					writable: false,
					configurable: true,
				});
			}
			return target;
		};

		/**
		 * Returns the global object associated with provided element.
		 *
		 * @param {Object} target
		 * @returns {Object}
		 */
		var getWindowOf = function (target) {
			// Assume that the element is an instance of Node, which means that it
			// has the "ownerDocument" property from which we can retrieve a
			// corresponding global object.
			var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
			// Return the local global object if it's not possible extract one from
			// provided element.
			return ownerGlobal || global$1;
		};

		// Placeholder of an empty content rectangle.
		var emptyRect = createRectInit(0, 0, 0, 0);
		/**
		 * Converts provided string to a number.
		 *
		 * @param {number|string} value
		 * @returns {number}
		 */
		function toFloat(value) {
			return parseFloat(value) || 0;
		}
		/**
		 * Extracts borders size from provided styles.
		 *
		 * @param {CSSStyleDeclaration} styles
		 * @param {...string} positions - Borders positions (top, right, ...)
		 * @returns {number}
		 */
		function getBordersSize(styles) {
			var positions = [];
			for (var _i = 1; _i < arguments.length; _i++) {
				positions[_i - 1] = arguments[_i];
			}
			return positions.reduce(function (size, position) {
				var value = styles["border-" + position + "-width"];
				return size + toFloat(value);
			}, 0);
		}
		/**
		 * Extracts paddings sizes from provided styles.
		 *
		 * @param {CSSStyleDeclaration} styles
		 * @returns {Object} Paddings box.
		 */
		function getPaddings(styles) {
			var positions = ["top", "right", "bottom", "left"];
			var paddings = {};
			for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
				var position = positions_1[_i];
				var value = styles["padding-" + position];
				paddings[position] = toFloat(value);
			}
			return paddings;
		}
		/**
		 * Calculates content rectangle of provided SVG element.
		 *
		 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
		 *      to be calculated.
		 * @returns {DOMRectInit}
		 */
		function getSVGContentRect(target) {
			var bbox = target.getBBox();
			return createRectInit(0, 0, bbox.width, bbox.height);
		}
		/**
		 * Calculates content rectangle of provided HTMLElement.
		 *
		 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
		 * @returns {DOMRectInit}
		 */
		function getHTMLElementContentRect(target) {
			// Client width & height properties can't be
			// used exclusively as they provide rounded values.
			var clientWidth = target.clientWidth,
				clientHeight = target.clientHeight;
			// By this condition we can catch all non-replaced inline, hidden and
			// detached elements. Though elements with width & height properties less
			// than 0.5 will be discarded as well.
			//
			// Without it we would need to implement separate methods for each of
			// those cases and it's not possible to perform a precise and performance
			// effective test for hidden elements. E.g. even jQuery's ':visible' filter
			// gives wrong results for elements with width & height less than 0.5.
			if (!clientWidth && !clientHeight) {
				return emptyRect;
			}
			var styles = getWindowOf(target).getComputedStyle(target);
			var paddings = getPaddings(styles);
			var horizPad = paddings.left + paddings.right;
			var vertPad = paddings.top + paddings.bottom;
			// Computed styles of width & height are being used because they are the
			// only dimensions available to JS that contain non-rounded values. It could
			// be possible to utilize the getBoundingClientRect if only it's data wasn't
			// affected by CSS transformations let alone paddings, borders and scroll bars.
			var width = toFloat(styles.width),
				height = toFloat(styles.height);
			// Width & height include paddings and borders when the 'border-box' box
			// model is applied (except for IE).
			if (styles.boxSizing === "border-box") {
				// Following conditions are required to handle Internet Explorer which
				// doesn't include paddings and borders to computed CSS dimensions.
				//
				// We can say that if CSS dimensions + paddings are equal to the "client"
				// properties then it's either IE, and thus we don't need to subtract
				// anything, or an element merely doesn't have paddings/borders styles.
				if (Math.round(width + horizPad) !== clientWidth) {
					width -= getBordersSize(styles, "left", "right") + horizPad;
				}
				if (Math.round(height + vertPad) !== clientHeight) {
					height -= getBordersSize(styles, "top", "bottom") + vertPad;
				}
			}
			// Following steps can't be applied to the document's root element as its
			// client[Width/Height] properties represent viewport area of the window.
			// Besides, it's as well not necessary as the <html> itself neither has
			// rendered scroll bars nor it can be clipped.
			if (!isDocumentElement(target)) {
				// In some browsers (only in Firefox, actually) CSS width & height
				// include scroll bars size which can be removed at this step as scroll
				// bars are the only difference between rounded dimensions + paddings
				// and "client" properties, though that is not always true in Chrome.
				var vertScrollbar = Math.round(width + horizPad) - clientWidth;
				var horizScrollbar = Math.round(height + vertPad) - clientHeight;
				// Chrome has a rather weird rounding of "client" properties.
				// E.g. for an element with content width of 314.2px it sometimes gives
				// the client width of 315px and for the width of 314.7px it may give
				// 314px. And it doesn't happen all the time. So just ignore this delta
				// as a non-relevant.
				if (Math.abs(vertScrollbar) !== 1) {
					width -= vertScrollbar;
				}
				if (Math.abs(horizScrollbar) !== 1) {
					height -= horizScrollbar;
				}
			}
			return createRectInit(paddings.left, paddings.top, width, height);
		}
		/**
		 * Checks whether provided element is an instance of the SVGGraphicsElement.
		 *
		 * @param {Element} target - Element to be checked.
		 * @returns {boolean}
		 */
		var isSVGGraphicsElement = (function () {
			// Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
			// interface.
			if (typeof SVGGraphicsElement !== "undefined") {
				return function (target) {
					return target instanceof getWindowOf(target).SVGGraphicsElement;
				};
			}
			// If it's so, then check that element is at least an instance of the
			// SVGElement and that it has the "getBBox" method.
			// eslint-disable-next-line no-extra-parens
			return function (target) {
				return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
			};
		})();
		/**
		 * Checks whether provided element is a document element (<html>).
		 *
		 * @param {Element} target - Element to be checked.
		 * @returns {boolean}
		 */
		function isDocumentElement(target) {
			return target === getWindowOf(target).document.documentElement;
		}
		/**
		 * Calculates an appropriate content rectangle for provided html or svg element.
		 *
		 * @param {Element} target - Element content rectangle of which needs to be calculated.
		 * @returns {DOMRectInit}
		 */
		function getContentRect(target) {
			if (!isBrowser) {
				return emptyRect;
			}
			if (isSVGGraphicsElement(target)) {
				return getSVGContentRect(target);
			}
			return getHTMLElementContentRect(target);
		}
		/**
		 * Creates rectangle with an interface of the DOMRectReadOnly.
		 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
		 *
		 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
		 * @returns {DOMRectReadOnly}
		 */
		function createReadOnlyRect(_a) {
			var x = _a.x,
				y = _a.y,
				width = _a.width,
				height = _a.height;
			// If DOMRectReadOnly is available use it as a prototype for the rectangle.
			var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
			var rect = Object.create(Constr.prototype);
			// Rectangle's properties are not writable and non-enumerable.
			defineConfigurable(rect, {
				x: x,
				y: y,
				width: width,
				height: height,
				top: y,
				right: x + width,
				bottom: height + y,
				left: x,
			});
			return rect;
		}
		/**
		 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
		 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
		 *
		 * @param {number} x - X coordinate.
		 * @param {number} y - Y coordinate.
		 * @param {number} width - Rectangle's width.
		 * @param {number} height - Rectangle's height.
		 * @returns {DOMRectInit}
		 */
		function createRectInit(x, y, width, height) {
			return { x: x, y: y, width: width, height: height };
		}

		/**
		 * Class that is responsible for computations of the content rectangle of
		 * provided DOM element and for keeping track of it's changes.
		 */
		var ResizeObserver_es_ResizeObservation = /** @class */ (function () {
			/**
			 * Creates an instance of ResizeObservation.
			 *
			 * @param {Element} target - Element to be observed.
			 */
			function ResizeObservation(target) {
				/**
				 * Broadcasted width of content rectangle.
				 *
				 * @type {number}
				 */
				this.broadcastWidth = 0;
				/**
				 * Broadcasted height of content rectangle.
				 *
				 * @type {number}
				 */
				this.broadcastHeight = 0;
				/**
				 * Reference to the last observed content rectangle.
				 *
				 * @private {DOMRectInit}
				 */
				this.contentRect_ = createRectInit(0, 0, 0, 0);
				this.target = target;
			}
			/**
			 * Updates content rectangle and tells whether it's width or height properties
			 * have changed since the last broadcast.
			 *
			 * @returns {boolean}
			 */
			ResizeObservation.prototype.isActive = function () {
				var rect = getContentRect(this.target);
				this.contentRect_ = rect;
				return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
			};
			/**
			 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
			 * from the corresponding properties of the last observed content rectangle.
			 *
			 * @returns {DOMRectInit} Last observed content rectangle.
			 */
			ResizeObservation.prototype.broadcastRect = function () {
				var rect = this.contentRect_;
				this.broadcastWidth = rect.width;
				this.broadcastHeight = rect.height;
				return rect;
			};
			return ResizeObservation;
		})();

		var ResizeObserver_es_ResizeObserverEntry = /** @class */ (function () {
			/**
			 * Creates an instance of ResizeObserverEntry.
			 *
			 * @param {Element} target - Element that is being observed.
			 * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
			 */
			function ResizeObserverEntry(target, rectInit) {
				var contentRect = createReadOnlyRect(rectInit);
				// According to the specification following properties are not writable
				// and are also not enumerable in the native implementation.
				//
				// Property accessors are not being used as they'd require to define a
				// private WeakMap storage which may cause memory leaks in browsers that
				// don't support this type of collections.
				defineConfigurable(this, { target: target, contentRect: contentRect });
			}
			return ResizeObserverEntry;
		})();

		var ResizeObserverSPI = /** @class */ (function () {
			/**
			 * Creates a new instance of ResizeObserver.
			 *
			 * @param {ResizeObserverCallback} callback - Callback function that is invoked
			 *      when one of the observed elements changes it's content dimensions.
			 * @param {ResizeObserverController} controller - Controller instance which
			 *      is responsible for the updates of observer.
			 * @param {ResizeObserver} callbackCtx - Reference to the public
			 *      ResizeObserver instance which will be passed to callback function.
			 */
			function ResizeObserverSPI(callback, controller, callbackCtx) {
				/**
				 * Collection of resize observations that have detected changes in dimensions
				 * of elements.
				 *
				 * @private {Array<ResizeObservation>}
				 */
				this.activeObservations_ = [];
				/**
				 * Registry of the ResizeObservation instances.
				 *
				 * @private {Map<Element, ResizeObservation>}
				 */
				this.observations_ = new MapShim();
				if (typeof callback !== "function") {
					throw new TypeError("The callback provided as parameter 1 is not a function.");
				}
				this.callback_ = callback;
				this.controller_ = controller;
				this.callbackCtx_ = callbackCtx;
			}
			/**
			 * Starts observing provided element.
			 *
			 * @param {Element} target - Element to be observed.
			 * @returns {void}
			 */
			ResizeObserverSPI.prototype.observe = function (target) {
				if (!arguments.length) {
					throw new TypeError("1 argument required, but only 0 present.");
				}
				// Do nothing if current environment doesn't have the Element interface.
				if (typeof Element === "undefined" || !(Element instanceof Object)) {
					return;
				}
				if (!(target instanceof getWindowOf(target).Element)) {
					throw new TypeError('parameter 1 is not of type "Element".');
				}
				var observations = this.observations_;
				// Do nothing if element is already being observed.
				if (observations.has(target)) {
					return;
				}
				observations.set(target, new ResizeObserver_es_ResizeObservation(target));
				this.controller_.addObserver(this);
				// Force the update of observations.
				this.controller_.refresh();
			};
			/**
			 * Stops observing provided element.
			 *
			 * @param {Element} target - Element to stop observing.
			 * @returns {void}
			 */
			ResizeObserverSPI.prototype.unobserve = function (target) {
				if (!arguments.length) {
					throw new TypeError("1 argument required, but only 0 present.");
				}
				// Do nothing if current environment doesn't have the Element interface.
				if (typeof Element === "undefined" || !(Element instanceof Object)) {
					return;
				}
				if (!(target instanceof getWindowOf(target).Element)) {
					throw new TypeError('parameter 1 is not of type "Element".');
				}
				var observations = this.observations_;
				// Do nothing if element is not being observed.
				if (!observations.has(target)) {
					return;
				}
				observations.delete(target);
				if (!observations.size) {
					this.controller_.removeObserver(this);
				}
			};
			/**
			 * Stops observing all elements.
			 *
			 * @returns {void}
			 */
			ResizeObserverSPI.prototype.disconnect = function () {
				this.clearActive();
				this.observations_.clear();
				this.controller_.removeObserver(this);
			};
			/**
			 * Collects observation instances the associated element of which has changed
			 * it's content rectangle.
			 *
			 * @returns {void}
			 */
			ResizeObserverSPI.prototype.gatherActive = function () {
				var _this = this;
				this.clearActive();
				this.observations_.forEach(function (observation) {
					if (observation.isActive()) {
						_this.activeObservations_.push(observation);
					}
				});
			};
			/**
			 * Invokes initial callback function with a list of ResizeObserverEntry
			 * instances collected from active resize observations.
			 *
			 * @returns {void}
			 */
			ResizeObserverSPI.prototype.broadcastActive = function () {
				// Do nothing if observer doesn't have active observations.
				if (!this.hasActive()) {
					return;
				}
				var ctx = this.callbackCtx_;
				// Create ResizeObserverEntry instance for every active observation.
				var entries = this.activeObservations_.map(function (observation) {
					return new ResizeObserver_es_ResizeObserverEntry(observation.target, observation.broadcastRect());
				});
				this.callback_.call(ctx, entries, ctx);
				this.clearActive();
			};
			/**
			 * Clears the collection of active observations.
			 *
			 * @returns {void}
			 */
			ResizeObserverSPI.prototype.clearActive = function () {
				this.activeObservations_.splice(0);
			};
			/**
			 * Tells whether observer has active observations.
			 *
			 * @returns {boolean}
			 */
			ResizeObserverSPI.prototype.hasActive = function () {
				return this.activeObservations_.length > 0;
			};
			return ResizeObserverSPI;
		})();

		// Registry of internal observers. If WeakMap is not available use current shim
		// for the Map collection as it has all required methods and because WeakMap
		// can't be fully polyfilled anyway.
		var observers = typeof WeakMap !== "undefined" ? new WeakMap() : new MapShim();
		/**
		 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
		 * exposing only those methods and properties that are defined in the spec.
		 */
		var ResizeObserver_es_ResizeObserver = /** @class */ (function () {
			/**
			 * Creates a new instance of ResizeObserver.
			 *
			 * @param {ResizeObserverCallback} callback - Callback that is invoked when
			 *      dimensions of the observed elements change.
			 */
			function ResizeObserver(callback) {
				if (!(this instanceof ResizeObserver)) {
					throw new TypeError("Cannot call a class as a function.");
				}
				if (!arguments.length) {
					throw new TypeError("1 argument required, but only 0 present.");
				}
				var controller = ResizeObserver_es_ResizeObserverController.getInstance();
				var observer = new ResizeObserverSPI(callback, controller, this);
				observers.set(this, observer);
			}
			return ResizeObserver;
		})();
		// Expose public methods of ResizeObserver.
		["observe", "unobserve", "disconnect"].forEach(function (method) {
			ResizeObserver_es_ResizeObserver.prototype[method] = function () {
				var _a;
				return (_a = observers.get(this))[method].apply(_a, arguments);
			};
		});

		var ResizeObserver_es_index = (function () {
			// Export existing implementation if available.
			if (typeof global$1.ResizeObserver !== "undefined") {
				return global$1.ResizeObserver;
			}
			return ResizeObserver_es_ResizeObserver;
		})();

		/* harmony default export */ const ResizeObserver_es = ResizeObserver_es_index; // CONCATENATED MODULE: ./src/js/components/employee-scrollbar.js

		// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)

		window.ResizeObserver = ResizeObserver_es;
		// EXTERNAL MODULE: ./src/js/components/team-filter.js
		var team_filter = __webpack_require__(1278); // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/lib/utils.js
		function lastItemOf(arr) {
			return arr[arr.length - 1];
		}

		// push only the items not included in the array
		function pushUnique(arr, ...items) {
			items.forEach((item) => {
				if (arr.includes(item)) {
					return;
				}
				arr.push(item);
			});
			return arr;
		}

		function stringToArray(str, separator) {
			// convert empty string to an empty array
			return str ? str.split(separator) : [];
		}

		function isInRange(testVal, min, max) {
			const minOK = min === undefined || testVal >= min;
			const maxOK = max === undefined || testVal <= max;
			return minOK && maxOK;
		}

		function limitToRange(val, min, max) {
			if (val < min) {
				return min;
			}
			if (val > max) {
				return max;
			}
			return val;
		}

		function createTagRepeat(tagName, repeat, attributes = {}, index = 0, html = "") {
			const openTagSrc = Object.keys(attributes).reduce((src, attr) => {
				let val = attributes[attr];
				if (typeof val === "function") {
					val = val(index);
				}
				return `${src} ${attr}="${val}"`;
			}, tagName);
			html += `<${openTagSrc}></${tagName}>`;

			const next = index + 1;
			return next < repeat ? createTagRepeat(tagName, repeat, attributes, next, html) : html;
		}

		// Remove the spacing surrounding tags for HTML parser not to create text nodes
		// before/after elements
		function optimizeTemplateHTML(html) {
			return html.replace(/>\s+/g, ">").replace(/\s+</, "<");
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/lib/date.js

		function stripTime(timeValue) {
			return new Date(timeValue).setHours(0, 0, 0, 0);
		}

		function today() {
			return new Date().setHours(0, 0, 0, 0);
		}

		// Get the time value of the start of given date or year, month and day
		function dateValue(...args) {
			switch (args.length) {
				case 0:
					return today();
				case 1:
					return stripTime(args[0]);
			}

			// use setFullYear() to keep 2-digit year from being mapped to 1900-1999
			const newDate = new Date(0);
			newDate.setFullYear(...args);
			return newDate.setHours(0, 0, 0, 0);
		}

		function addDays(date, amount) {
			const newDate = new Date(date);
			return newDate.setDate(newDate.getDate() + amount);
		}

		function addWeeks(date, amount) {
			return addDays(date, amount * 7);
		}

		function addMonths(date, amount) {
			// If the day of the date is not in the new month, the last day of the new
			// month will be returned. e.g. Jan 31 + 1 month → Feb 28 (not Mar 03)
			const newDate = new Date(date);
			const monthsToSet = newDate.getMonth() + amount;
			let expectedMonth = monthsToSet % 12;
			if (expectedMonth < 0) {
				expectedMonth += 12;
			}

			const time = newDate.setMonth(monthsToSet);
			return newDate.getMonth() !== expectedMonth ? newDate.setDate(0) : time;
		}

		function addYears(date, amount) {
			// If the date is Feb 29 and the new year is not a leap year, Feb 28 of the
			// new year will be returned.
			const newDate = new Date(date);
			const expectedMonth = newDate.getMonth();
			const time = newDate.setFullYear(newDate.getFullYear() + amount);
			return expectedMonth === 1 && newDate.getMonth() === 2 ? newDate.setDate(0) : time;
		}

		// Calculate the distance bettwen 2 days of the week
		function dayDiff(day, from) {
			return (day - from + 7) % 7;
		}

		// Get the date of the specified day of the week of given base date
		function dayOfTheWeekOf(baseDate, dayOfWeek, weekStart = 0) {
			const baseDay = new Date(baseDate).getDay();
			return addDays(baseDate, dayDiff(dayOfWeek, weekStart) - dayDiff(baseDay, weekStart));
		}

		function calcWeekNum(dayOfTheWeek, sameDayOfFirstWeek) {
			return Math.round((dayOfTheWeek - sameDayOfFirstWeek) / 604800000) + 1;
		}

		// Get the ISO week number of a date
		function getIsoWeek(date) {
			// - Start of ISO week is Monday
			// - Use Thursday for culculation because the first Thursday of ISO week is
			//   always in January
			const thuOfTheWeek = dayOfTheWeekOf(date, 4, 1);
			// - Week 1 in ISO week is the week including Jan 04
			// - Use the Thu of given date's week (instead of given date itself) to
			//   calculate week 1 of the year so that Jan 01 - 03 won't be miscalculated
			//   as week 0 when Jan 04 is Mon - Wed
			const firstThu = dayOfTheWeekOf(new Date(thuOfTheWeek).setMonth(0, 4), 4, 1);
			// return Math.round((thuOfTheWeek - firstThu) / 604800000) + 1;
			return calcWeekNum(thuOfTheWeek, firstThu);
		}

		// Calculate week number in traditional week number system
		// @see https://en.wikipedia.org/wiki/Week#Other_week_numbering_systems
		function calcTraditionalWeekNumber(date, weekStart) {
			// - Week 1 of traditional week is the week including the Jan 01
			// - Use Jan 01 of given date's year to calculate the start of week 1
			const startOfFirstWeek = dayOfTheWeekOf(new Date(date).setMonth(0, 1), weekStart, weekStart);
			const startOfTheWeek = dayOfTheWeekOf(date, weekStart, weekStart);
			const weekNum = calcWeekNum(startOfTheWeek, startOfFirstWeek);
			if (weekNum < 53) {
				return weekNum;
			}
			// If the 53rd week includes Jan 01, it's actually next year's week 1
			const weekOneOfNextYear = dayOfTheWeekOf(new Date(date).setDate(32), weekStart, weekStart);
			return startOfTheWeek === weekOneOfNextYear ? 1 : weekNum;
		}

		// Get the Western traditional week number of a date
		function getWesternTradWeek(date) {
			// Start of Western traditionl week is Sunday
			return calcTraditionalWeekNumber(date, 0);
		}

		// Get the Middle Eastern week number of a date
		function getMidEasternWeek(date) {
			// Start of Middle Eastern week is Saturday
			return calcTraditionalWeekNumber(date, 6);
		}

		// Get the start year of the period of years that includes given date
		// years: length of the year period
		function startOfYearPeriod(date, years) {
			/* @see https://en.wikipedia.org/wiki/Year_zero#ISO_8601 */
			const year = new Date(date).getFullYear();
			return Math.floor(year / years) * years;
		}

		// Convert date to the first/last date of the month/year of the date
		function regularizeDate(date, timeSpan, useLastDate) {
			if (timeSpan !== 1 && timeSpan !== 2) {
				return date;
			}
			const newDate = new Date(date);
			if (timeSpan === 1) {
				useLastDate ? newDate.setMonth(newDate.getMonth() + 1, 0) : newDate.setDate(1);
			} else {
				useLastDate ? newDate.setFullYear(newDate.getFullYear() + 1, 0, 0) : newDate.setMonth(0, 1);
			}
			return newDate.setHours(0, 0, 0, 0);
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/lib/date-format.js

		// pattern for format parts
		const reFormatTokens = /dd?|DD?|mm?|MM?|yy?(?:yy)?/;
		// pattern for non date parts
		const reNonDateParts = /[\s!-/:-@[-`{-~年月日]+/;
		// cache for persed formats
		let knownFormats = {};
		// parse funtions for date parts
		const parseFns = {
			y(date, year) {
				return new Date(date).setFullYear(parseInt(year, 10));
			},
			m(date, month, locale) {
				const newDate = new Date(date);
				let monthIndex = parseInt(month, 10) - 1;

				if (isNaN(monthIndex)) {
					if (!month) {
						return NaN;
					}

					const monthName = month.toLowerCase();
					const compareNames = (name) => name.toLowerCase().startsWith(monthName);
					// compare with both short and full names because some locales have periods
					// in the short names (not equal to the first X letters of the full names)
					monthIndex = locale.monthsShort.findIndex(compareNames);
					if (monthIndex < 0) {
						monthIndex = locale.months.findIndex(compareNames);
					}
					if (monthIndex < 0) {
						return NaN;
					}
				}

				newDate.setMonth(monthIndex);
				return newDate.getMonth() !== normalizeMonth(monthIndex) ? newDate.setDate(0) : newDate.getTime();
			},
			d(date, day) {
				return new Date(date).setDate(parseInt(day, 10));
			},
		};
		// format functions for date parts
		const formatFns = {
			d(date) {
				return date.getDate();
			},
			dd(date) {
				return padZero(date.getDate(), 2);
			},
			D(date, locale) {
				return locale.daysShort[date.getDay()];
			},
			DD(date, locale) {
				return locale.days[date.getDay()];
			},
			m(date) {
				return date.getMonth() + 1;
			},
			mm(date) {
				return padZero(date.getMonth() + 1, 2);
			},
			M(date, locale) {
				return locale.monthsShort[date.getMonth()];
			},
			MM(date, locale) {
				return locale.months[date.getMonth()];
			},
			y(date) {
				return date.getFullYear();
			},
			yy(date) {
				return padZero(date.getFullYear(), 2).slice(-2);
			},
			yyyy(date) {
				return padZero(date.getFullYear(), 4);
			},
		};

		// get month index in normal range (0 - 11) from any number
		function normalizeMonth(monthIndex) {
			return monthIndex > -1 ? monthIndex % 12 : normalizeMonth(monthIndex + 12);
		}

		function padZero(num, length) {
			return num.toString().padStart(length, "0");
		}

		function parseFormatString(format) {
			if (typeof format !== "string") {
				throw new Error("Invalid date format.");
			}
			if (format in knownFormats) {
				return knownFormats[format];
			}

			// sprit the format string into parts and seprators
			const separators = format.split(reFormatTokens);
			const parts = format.match(new RegExp(reFormatTokens, "g"));
			if (separators.length === 0 || !parts) {
				throw new Error("Invalid date format.");
			}

			// collect format functions used in the format
			const partFormatters = parts.map((token) => formatFns[token]);

			// collect parse function keys used in the format
			// iterate over parseFns' keys in order to keep the order of the keys.
			const partParserKeys = Object.keys(parseFns).reduce((keys, key) => {
				const token = parts.find((part) => part[0] !== "D" && part[0].toLowerCase() === key);
				if (token) {
					keys.push(key);
				}
				return keys;
			}, []);

			return (knownFormats[format] = {
				parser(dateStr, locale) {
					const dateParts = dateStr.split(reNonDateParts).reduce((dtParts, part, index) => {
						if (part.length > 0 && parts[index]) {
							const token = parts[index][0];
							if (token === "M") {
								dtParts.m = part;
							} else if (token !== "D") {
								dtParts[token] = part;
							}
						}
						return dtParts;
					}, {});

					// iterate over partParserkeys so that the parsing is made in the oder
					// of year, month and day to prevent the day parser from correcting last
					// day of month wrongly
					return partParserKeys.reduce((origDate, key) => {
						const newDate = parseFns[key](origDate, dateParts[key], locale);
						// ingnore the part failed to parse
						return isNaN(newDate) ? origDate : newDate;
					}, today());
				},
				formatter(date, locale) {
					let dateStr = partFormatters.reduce((str, fn, index) => {
						return (str += `${separators[index]}${fn(date, locale)}`);
					}, "");
					// separators' length is always parts' length + 1,
					return (dateStr += lastItemOf(separators));
				},
			});
		}

		function parseDate(dateStr, format, locale) {
			if (dateStr instanceof Date || typeof dateStr === "number") {
				const date = stripTime(dateStr);
				return isNaN(date) ? undefined : date;
			}
			if (!dateStr) {
				return undefined;
			}
			if (dateStr === "today") {
				return today();
			}

			if (format && format.toValue) {
				const date = format.toValue(dateStr, format, locale);
				return isNaN(date) ? undefined : stripTime(date);
			}

			return parseFormatString(format).parser(dateStr, locale);
		}

		function date_format_formatDate(date, format, locale) {
			if (isNaN(date) || (!date && date !== 0)) {
				return "";
			}

			const dateObj = typeof date === "number" ? new Date(date) : date;

			if (format.toDisplay) {
				return format.toDisplay(dateObj, format, locale);
			}

			return parseFormatString(format).formatter(dateObj, locale);
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/lib/dom.js

		const range = document.createRange();

		function parseHTML(html) {
			return range.createContextualFragment(html);
		}

		function getParent(el) {
			return el.parentElement || (el.parentNode instanceof ShadowRoot ? el.parentNode.host : undefined);
		}

		function isActiveElement(el) {
			return el.getRootNode().activeElement === el;
		}

		// equivalent to jQuery's :visble
		function isVisible(el) {
			return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
		}

		function hideElement(el) {
			if (el.style.display === "none") {
				return;
			}
			// back up the existing display setting in data-style-display
			if (el.style.display) {
				el.dataset.styleDisplay = el.style.display;
			}
			el.style.display = "none";
		}

		function showElement(el) {
			if (el.style.display !== "none") {
				return;
			}
			if (el.dataset.styleDisplay) {
				// restore backed-up dispay property
				el.style.display = el.dataset.styleDisplay;
				delete el.dataset.styleDisplay;
			} else {
				el.style.display = "";
			}
		}

		function emptyChildNodes(el) {
			if (el.firstChild) {
				el.removeChild(el.firstChild);
				emptyChildNodes(el);
			}
		}

		function replaceChildNodes(el, newChildNodes) {
			emptyChildNodes(el);
			if (newChildNodes instanceof DocumentFragment) {
				el.appendChild(newChildNodes);
			} else if (typeof newChildNodes === "string") {
				el.appendChild(parseHTML(newChildNodes));
			} else if (typeof newChildNodes.forEach === "function") {
				newChildNodes.forEach((node) => {
					el.appendChild(node);
				});
			}
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/lib/event.js

		const listenerRegistry = new WeakMap();
		const { addEventListener, removeEventListener } = EventTarget.prototype;

		// Register event listeners to a key object
		// listeners: array of listener definitions;
		//   - each definition must be a flat array of event target and the arguments
		//     used to call addEventListener() on the target
		function event_registerListeners(keyObj, listeners) {
			let registered = listenerRegistry.get(keyObj);
			if (!registered) {
				registered = [];
				listenerRegistry.set(keyObj, registered);
			}
			listeners.forEach((listener) => {
				addEventListener.call(...listener);
				registered.push(listener);
			});
		}

		function event_unregisterListeners(keyObj) {
			let listeners = listenerRegistry.get(keyObj);
			if (!listeners) {
				return;
			}
			listeners.forEach((listener) => {
				removeEventListener.call(...listener);
			});
			listenerRegistry.delete(keyObj);
		}

		// Event.composedPath() polyfill for Edge
		// based on https://gist.github.com/kleinfreund/e9787d73776c0e3750dcfcdc89f100ec
		if (!Event.prototype.composedPath) {
			const getComposedPath = (node, path = []) => {
				path.push(node);

				let parent;
				if (node.parentNode) {
					parent = node.parentNode;
				} else if (node.host) {
					// ShadowRoot
					parent = node.host;
				} else if (node.defaultView) {
					// Document
					parent = node.defaultView;
				}
				return parent ? getComposedPath(parent, path) : path;
			};

			Event.prototype.composedPath = function () {
				return getComposedPath(this.target);
			};
		}

		function findFromPath(path, criteria, currentTarget) {
			const [node, ...rest] = path;
			if (criteria(node)) {
				return node;
			}
			if (node === currentTarget || node.tagName === "HTML" || rest.length === 0) {
				// stop when reaching currentTarget or <html>
				return;
			}
			return findFromPath(rest, criteria, currentTarget);
		}

		// Search for the actual target of a delegated event
		function findElementInEventPath(ev, selector) {
			const criteria =
				typeof selector === "function" ? selector : (el) => el instanceof Element && el.matches(selector);
			return findFromPath(ev.composedPath(), criteria, ev.currentTarget);
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/i18n/base-locales.js

		// default locales
		/* harmony default export */ const base_locales = {
			en: {
				days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
				months: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				today: "Today",
				clear: "Clear",
				titleFormat: "MM y",
			},
		}; // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/options/defaultOptions.js

		// config options updatable by setOptions() and their default values
		/* harmony default export */ const defaultOptions = {
			autohide: false,
			beforeShowDay: null,
			beforeShowDecade: null,
			beforeShowMonth: null,
			beforeShowYear: null,
			clearButton: false,
			dateDelimiter: ",",
			datesDisabled: [],
			daysOfWeekDisabled: [],
			daysOfWeekHighlighted: [],
			defaultViewDate: undefined, // placeholder, defaults to today() by the program
			disableTouchKeyboard: false,
			enableOnReadonly: true,
			format: "mm/dd/yyyy",
			language: "en",
			maxDate: null,
			maxNumberOfDates: 1,
			maxView: 3,
			minDate: null,
			nextArrow: "»",
			orientation: "auto",
			pickLevel: 0,
			prevArrow: "«",
			showDaysOfWeek: true,
			showOnClick: true,
			showOnFocus: true,
			startView: 0,
			title: "",
			todayButton: false,
			todayButtonMode: 0,
			todayHighlight: false,
			updateOnBlur: true,
			weekNumbers: 0,
			weekStart: 0,
		}; // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/options/processOptions.js

		const { language: defaultLang, format: defaultFormat, weekStart: defaultWeekStart } = defaultOptions;

		// Reducer function to filter out invalid day-of-week from the input
		function sanitizeDOW(dow, day) {
			return dow.length < 6 && day >= 0 && day < 7 ? pushUnique(dow, day) : dow;
		}

		function determineGetWeekMethod(numberingMode, weekStart) {
			const methodId = numberingMode === 4 ? (weekStart === 6 ? 3 : !weekStart + 1) : numberingMode;
			switch (methodId) {
				case 1:
					return getIsoWeek;
				case 2:
					return getWesternTradWeek;
				case 3:
					return getMidEasternWeek;
			}
		}

		function updateWeekStart(newValue, config, weekNumbers) {
			config.weekStart = newValue;
			config.weekEnd = (newValue + 6) % 7;
			if (weekNumbers === 4) {
				config.getWeekNumber = determineGetWeekMethod(4, newValue);
			}
			return newValue;
		}

		// validate input date. if invalid, fallback to the original value
		function validateDate(value, format, locale, origValue) {
			const date = parseDate(value, format, locale);
			return date !== undefined ? date : origValue;
		}

		// Validate viewId. if invalid, fallback to the original value
		function validateViewId(value, origValue, max = 3) {
			const viewId = parseInt(value, 10);
			return viewId >= 0 && viewId <= max ? viewId : origValue;
		}

		function replaceOptions(options, from, to, convert = undefined) {
			if (from in options) {
				if (!(to in options)) {
					options[to] = convert ? convert(options[from]) : options[from];
				}
				delete options[from];
			}
		}

		// Create Datepicker configuration to set
		function processOptions(options, datepicker) {
			const inOpts = Object.assign({}, options);
			const config = {};
			const locales = datepicker.constructor.locales;
			const rangeEnd = !!datepicker.rangeSideIndex;
			let {
				datesDisabled,
				format,
				language,
				locale,
				maxDate,
				maxView,
				minDate,
				pickLevel,
				startView,
				weekNumbers,
				weekStart,
			} = datepicker.config || {};

			// for backword compatibility
			replaceOptions(inOpts, "calendarWeeks", "weekNumbers", (val) => (val ? 1 : 0));
			replaceOptions(inOpts, "clearBtn", "clearButton");
			replaceOptions(inOpts, "todayBtn", "todayButton");
			replaceOptions(inOpts, "todayBtnMode", "todayButtonMode");

			if (inOpts.language) {
				let lang;
				if (inOpts.language !== language) {
					if (locales[inOpts.language]) {
						lang = inOpts.language;
					} else {
						// Check if langauge + region tag can fallback to the one without
						// region (e.g. fr-CA → fr)
						lang = inOpts.language.split("-")[0];
						if (!locales[lang]) {
							lang = false;
						}
					}
				}
				delete inOpts.language;
				if (lang) {
					language = config.language = lang;

					// update locale as well when updating language
					const origLocale = locale || locales[defaultLang];
					// use default language's properties for the fallback
					locale = Object.assign(
						{
							format: defaultFormat,
							weekStart: defaultWeekStart,
						},
						locales[defaultLang]
					);
					if (language !== defaultLang) {
						Object.assign(locale, locales[language]);
					}
					config.locale = locale;
					// if format and/or weekStart are the same as old locale's defaults,
					// update them to new locale's defaults
					if (format === origLocale.format) {
						format = config.format = locale.format;
					}
					if (weekStart === origLocale.weekStart) {
						weekStart = updateWeekStart(locale.weekStart, config, weekNumbers);
					}
				}
			}

			if (inOpts.format) {
				const hasToDisplay = typeof inOpts.format.toDisplay === "function";
				const hasToValue = typeof inOpts.format.toValue === "function";
				const validFormatString = reFormatTokens.test(inOpts.format);
				if ((hasToDisplay && hasToValue) || validFormatString) {
					format = config.format = inOpts.format;
				}
				delete inOpts.format;
			}

			//*** pick level ***//
			let newPickLevel = pickLevel;
			if ("pickLevel" in inOpts) {
				newPickLevel = validateViewId(inOpts.pickLevel, pickLevel, 2);
				delete inOpts.pickLevel;
			}
			if (newPickLevel !== pickLevel) {
				if (newPickLevel > pickLevel) {
					// complement current minDate/madDate so that the existing range will be
					// expanded to fit the new level later
					if (!("minDate" in inOpts)) {
						inOpts.minDate = minDate;
					}
					if (!("maxDate" in inOpts)) {
						inOpts.maxDate = maxDate;
					}
				}
				// complement datesDisabled so that it will be reset later
				if (datesDisabled && !inOpts.datesDisabled) {
					inOpts.datesDisabled = [];
				}
				pickLevel = config.pickLevel = newPickLevel;
			}

			//*** dates ***//
			// while min and maxDate for "no limit" in the options are better to be null
			// (especially when updating), the ones in the config have to be undefined
			// because null is treated as 0 (= unix epoch) when comparing with time value
			let minDt = minDate;
			let maxDt = maxDate;
			if ("minDate" in inOpts) {
				const defaultMinDt = dateValue(0, 0, 1);
				minDt =
					inOpts.minDate === null
						? defaultMinDt // set 0000-01-01 to prevent negative values for year
						: validateDate(inOpts.minDate, format, locale, minDt);
				if (minDt !== defaultMinDt) {
					minDt = regularizeDate(minDt, pickLevel, false);
				}
				delete inOpts.minDate;
			}
			if ("maxDate" in inOpts) {
				maxDt = inOpts.maxDate === null ? undefined : validateDate(inOpts.maxDate, format, locale, maxDt);
				if (maxDt !== undefined) {
					maxDt = regularizeDate(maxDt, pickLevel, true);
				}
				delete inOpts.maxDate;
			}
			if (maxDt < minDt) {
				minDate = config.minDate = maxDt;
				maxDate = config.maxDate = minDt;
			} else {
				if (minDate !== minDt) {
					minDate = config.minDate = minDt;
				}
				if (maxDate !== maxDt) {
					maxDate = config.maxDate = maxDt;
				}
			}

			if (inOpts.datesDisabled) {
				const dtsDisabled = inOpts.datesDisabled;
				if (typeof dtsDisabled === "function") {
					config.datesDisabled = null;
					config.checkDisabled = (timeValue, viewId) => dtsDisabled(new Date(timeValue), viewId, rangeEnd);
				} else {
					const disabled = (config.datesDisabled = dtsDisabled.reduce((dates, dt) => {
						const date = parseDate(dt, format, locale);
						return date !== undefined
							? pushUnique(dates, regularizeDate(date, pickLevel, rangeEnd))
							: dates;
					}, []));
					config.checkDisabled = (timeValue) => disabled.includes(timeValue);
				}
				delete inOpts.datesDisabled;
			}
			if ("defaultViewDate" in inOpts) {
				const viewDate = parseDate(inOpts.defaultViewDate, format, locale);
				if (viewDate !== undefined) {
					config.defaultViewDate = viewDate;
				}
				delete inOpts.defaultViewDate;
			}

			//*** days of week ***//
			if ("weekStart" in inOpts) {
				const wkStart = Number(inOpts.weekStart) % 7;
				if (!isNaN(wkStart)) {
					weekStart = updateWeekStart(wkStart, config, weekNumbers);
				}
				delete inOpts.weekStart;
			}
			if (inOpts.daysOfWeekDisabled) {
				config.daysOfWeekDisabled = inOpts.daysOfWeekDisabled.reduce(sanitizeDOW, []);
				delete inOpts.daysOfWeekDisabled;
			}
			if (inOpts.daysOfWeekHighlighted) {
				config.daysOfWeekHighlighted = inOpts.daysOfWeekHighlighted.reduce(sanitizeDOW, []);
				delete inOpts.daysOfWeekHighlighted;
			}

			//*** week numbers ***//
			if ("weekNumbers" in inOpts) {
				let method = inOpts.weekNumbers;
				if (method) {
					const getWeekNumber =
						typeof method === "function"
							? (timeValue, startOfWeek) => method(new Date(timeValue), startOfWeek)
							: determineGetWeekMethod((method = parseInt(method, 10)), weekStart);
					if (getWeekNumber) {
						weekNumbers = config.weekNumbers = method;
						config.getWeekNumber = getWeekNumber;
					}
				} else {
					weekNumbers = config.weekNumbers = 0;
					config.getWeekNumber = null;
				}
				delete inOpts.weekNumbers;
			}

			//*** multi date ***//
			if ("maxNumberOfDates" in inOpts) {
				const maxNumberOfDates = parseInt(inOpts.maxNumberOfDates, 10);
				if (maxNumberOfDates >= 0) {
					config.maxNumberOfDates = maxNumberOfDates;
					config.multidate = maxNumberOfDates !== 1;
				}
				delete inOpts.maxNumberOfDates;
			}
			if (inOpts.dateDelimiter) {
				config.dateDelimiter = String(inOpts.dateDelimiter);
				delete inOpts.dateDelimiter;
			}

			//*** view ***//
			let newMaxView = maxView;
			if ("maxView" in inOpts) {
				newMaxView = validateViewId(inOpts.maxView, maxView);
				delete inOpts.maxView;
			}
			// ensure max view >= pick level
			newMaxView = pickLevel > newMaxView ? pickLevel : newMaxView;
			if (newMaxView !== maxView) {
				maxView = config.maxView = newMaxView;
			}

			let newStartView = startView;
			if ("startView" in inOpts) {
				newStartView = validateViewId(inOpts.startView, newStartView);
				delete inOpts.startView;
			}
			// ensure pick level <= start view <= max view
			if (newStartView < pickLevel) {
				newStartView = pickLevel;
			} else if (newStartView > maxView) {
				newStartView = maxView;
			}
			if (newStartView !== startView) {
				config.startView = newStartView;
			}

			//*** template ***//
			if (inOpts.prevArrow) {
				const prevArrow = parseHTML(inOpts.prevArrow);
				if (prevArrow.childNodes.length > 0) {
					config.prevArrow = prevArrow.childNodes;
				}
				delete inOpts.prevArrow;
			}
			if (inOpts.nextArrow) {
				const nextArrow = parseHTML(inOpts.nextArrow);
				if (nextArrow.childNodes.length > 0) {
					config.nextArrow = nextArrow.childNodes;
				}
				delete inOpts.nextArrow;
			}

			//*** misc ***//
			if ("disableTouchKeyboard" in inOpts) {
				config.disableTouchKeyboard = "ontouchstart" in document && !!inOpts.disableTouchKeyboard;
				delete inOpts.disableTouchKeyboard;
			}
			if (inOpts.orientation) {
				const orientation = inOpts.orientation.toLowerCase().split(/\s+/g);
				config.orientation = {
					x: orientation.find((x) => x === "left" || x === "right") || "auto",
					y: orientation.find((y) => y === "top" || y === "bottom") || "auto",
				};
				delete inOpts.orientation;
			}
			if ("todayButtonMode" in inOpts) {
				switch (inOpts.todayButtonMode) {
					case 0:
					case 1:
						config.todayButtonMode = inOpts.todayButtonMode;
				}
				delete inOpts.todayButtonMode;
			}

			//*** copy the rest ***//
			Object.entries(inOpts).forEach(([key, value]) => {
				if (value !== undefined && key in defaultOptions) {
					config[key] = value;
				}
			});

			return config;
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/options/shortcutKeys.js

		const defaultShortcutKeys = {
			show: { key: "ArrowDown" },
			hide: null,
			toggle: { key: "Escape" },
			prevButton: { key: "ArrowLeft", ctrlOrMetaKey: true },
			nextButton: { key: "ArrowRight", ctrlOrMetaKey: true },
			viewSwitch: { key: "ArrowUp", ctrlOrMetaKey: true },
			clearButton: { key: "Backspace", ctrlOrMetaKey: true },
			todayButton: { key: ".", ctrlOrMetaKey: true },
			exitEditMode: { key: "ArrowDown", ctrlOrMetaKey: true },
		};

		function createShortcutKeyConfig(options) {
			return Object.keys(defaultShortcutKeys).reduce((keyDefs, shortcut) => {
				const keyDef = options[shortcut] === undefined ? defaultShortcutKeys[shortcut] : options[shortcut];
				const key = keyDef && keyDef.key;
				if (!key || typeof key !== "string") {
					return keyDefs;
				}

				const normalizedDef = {
					key,
					ctrlOrMetaKey: !!(keyDef.ctrlOrMetaKey || keyDef.ctrlKey || keyDef.metaKey),
				};
				if (key.length > 1) {
					normalizedDef.altKey = !!keyDef.altKey;
					normalizedDef.shiftKey = !!keyDef.shiftKey;
				}
				keyDefs[shortcut] = normalizedDef;
				return keyDefs;
			}, {});
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/picker/templates/pickerTemplate.js

		const getButtons = (buttonList) =>
			buttonList
				.map((classes) => `<button type="button" class="%buttonClass% ${classes}" tabindex="-1"></button>`)
				.join("");

		/* harmony default export */ const pickerTemplate = optimizeTemplateHTML(`<div class="datepicker">
  <div class="datepicker-picker">
    <div class="datepicker-header">
      <div class="datepicker-title"></div>
      <div class="datepicker-controls">
        ${getButtons(["prev-button prev-btn", "view-switch", "next-button next-btn"])}
      </div>
    </div>
    <div class="datepicker-main"></div>
    <div class="datepicker-footer">
      <div class="datepicker-controls">
        ${getButtons(["today-button today-btn", "clear-button clear-btn"])}
      </div>
    </div>
  </div>
</div>`); // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/picker/templates/daysTemplate.js

		/* harmony default export */ const daysTemplate = optimizeTemplateHTML(`<div class="days">
  <div class="days-of-week">${createTagRepeat("span", 7, { class: "dow" })}</div>
  <div class="datepicker-grid">${createTagRepeat("span", 42)}</div>
</div>`); // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/picker/templates/weekNumbersTemplate.js

		/* harmony default export */ const weekNumbersTemplate =
			optimizeTemplateHTML(`<div class="week-numbers calendar-weeks">
  <div class="days-of-week"><span class="dow"></span></div>
  <div class="weeks">${createTagRepeat("span", 6, { class: "week" })}</div>
</div>`); // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/picker/views/View.js

		// Base class of the view classes
		class View {
			constructor(picker, config) {
				Object.assign(this, config, {
					picker,
					element: parseHTML(`<div class="datepicker-view"></div>`).firstChild,
					selected: [],
					isRangeEnd: !!picker.datepicker.rangeSideIndex,
				});
				this.init(this.picker.datepicker.config);
			}

			init(options) {
				if ("pickLevel" in options) {
					this.isMinView = this.id === options.pickLevel;
				}
				this.setOptions(options);
				this.updateFocus();
				this.updateSelection();
			}

			prepareForRender(switchLabel, prevButtonDisabled, nextButtonDisabled) {
				// refresh disabled years on every render in order to clear the ones added
				// by beforeShow hook at previous render
				this.disabled = [];

				const picker = this.picker;
				picker.setViewSwitchLabel(switchLabel);
				picker.setPrevButtonDisabled(prevButtonDisabled);
				picker.setNextButtonDisabled(nextButtonDisabled);
			}

			setDisabled(date, classList) {
				classList.add("disabled");
				pushUnique(this.disabled, date);
			}

			// Execute beforeShow() callback and apply the result to the element
			// args:
			performBeforeHook(el, timeValue) {
				let result = this.beforeShow(new Date(timeValue));
				switch (typeof result) {
					case "boolean":
						result = { enabled: result };
						break;
					case "string":
						result = { classes: result };
				}

				if (result) {
					const classList = el.classList;
					if (result.enabled === false) {
						this.setDisabled(timeValue, classList);
					}
					if (result.classes) {
						const extraClasses = result.classes.split(/\s+/);
						classList.add(...extraClasses);
						if (extraClasses.includes("disabled")) {
							this.setDisabled(timeValue, classList);
						}
					}
					if (result.content) {
						replaceChildNodes(el, result.content);
					}
				}
			}

			renderCell(el, content, cellVal, date, { selected, range }, outOfScope, extraClasses = []) {
				el.textContent = content;
				if (this.isMinView) {
					el.dataset.date = date;
				}

				const classList = el.classList;
				el.className = `datepicker-cell ${this.cellClass}`;
				if (cellVal < this.first) {
					classList.add("prev");
				} else if (cellVal > this.last) {
					classList.add("next");
				}
				classList.add(...extraClasses);
				if (outOfScope || this.checkDisabled(date, this.id)) {
					this.setDisabled(date, classList);
				}
				if (range) {
					const [rangeStart, rangeEnd] = range;
					if (cellVal > rangeStart && cellVal < rangeEnd) {
						classList.add("range");
					}
					if (cellVal === rangeStart) {
						classList.add("range-start");
					}
					if (cellVal === rangeEnd) {
						classList.add("range-end");
					}
				}
				if (selected.includes(cellVal)) {
					classList.add("selected");
				}
				if (cellVal === this.focused) {
					classList.add("focused");
				}

				if (this.beforeShow) {
					this.performBeforeHook(el, date);
				}
			}

			refreshCell(el, cellVal, selected, [rangeStart, rangeEnd]) {
				const classList = el.classList;
				classList.remove("range", "range-start", "range-end", "selected", "focused");
				if (cellVal > rangeStart && cellVal < rangeEnd) {
					classList.add("range");
				}
				if (cellVal === rangeStart) {
					classList.add("range-start");
				}
				if (cellVal === rangeEnd) {
					classList.add("range-end");
				}
				if (selected.includes(cellVal)) {
					classList.add("selected");
				}
				if (cellVal === this.focused) {
					classList.add("focused");
				}
			}

			changeFocusedCell(cellIndex) {
				this.grid.querySelectorAll(".focused").forEach((el) => {
					el.classList.remove("focused");
				});
				this.grid.children[cellIndex].classList.add("focused");
			}
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/picker/views/DaysView.js

		class DaysView extends View {
			constructor(picker) {
				super(picker, {
					id: 0,
					name: "days",
					cellClass: "day",
				});
			}

			init(options, onConstruction = true) {
				if (onConstruction) {
					const inner = parseHTML(daysTemplate).firstChild;
					this.dow = inner.firstChild;
					this.grid = inner.lastChild;
					this.element.appendChild(inner);
				}
				super.init(options);
			}

			setOptions(options) {
				let updateDOW;

				if ("minDate" in options) {
					this.minDate = options.minDate;
				}
				if ("maxDate" in options) {
					this.maxDate = options.maxDate;
				}
				if (options.checkDisabled) {
					this.checkDisabled = options.checkDisabled;
				}
				if (options.daysOfWeekDisabled) {
					this.daysOfWeekDisabled = options.daysOfWeekDisabled;
					updateDOW = true;
				}
				if (options.daysOfWeekHighlighted) {
					this.daysOfWeekHighlighted = options.daysOfWeekHighlighted;
				}
				if ("todayHighlight" in options) {
					this.todayHighlight = options.todayHighlight;
				}
				if ("weekStart" in options) {
					this.weekStart = options.weekStart;
					this.weekEnd = options.weekEnd;
					updateDOW = true;
				}
				if (options.locale) {
					const locale = (this.locale = options.locale);
					this.dayNames = locale.daysMin;
					this.switchLabelFormat = locale.titleFormat;
					updateDOW = true;
				}
				if ("beforeShowDay" in options) {
					this.beforeShow = typeof options.beforeShowDay === "function" ? options.beforeShowDay : undefined;
				}

				if ("weekNumbers" in options) {
					if (options.weekNumbers && !this.weekNumbers) {
						const weeksElem = parseHTML(weekNumbersTemplate).firstChild;
						this.weekNumbers = {
							element: weeksElem,
							dow: weeksElem.firstChild,
							weeks: weeksElem.lastChild,
						};
						this.element.insertBefore(weeksElem, this.element.firstChild);
					} else if (this.weekNumbers && !options.weekNumbers) {
						this.element.removeChild(this.weekNumbers.element);
						this.weekNumbers = null;
					}
				}

				if ("getWeekNumber" in options) {
					this.getWeekNumber = options.getWeekNumber;
				}

				if ("showDaysOfWeek" in options) {
					if (options.showDaysOfWeek) {
						showElement(this.dow);
						if (this.weekNumbers) {
							showElement(this.weekNumbers.dow);
						}
					} else {
						hideElement(this.dow);
						if (this.weekNumbers) {
							hideElement(this.weekNumbers.dow);
						}
					}
				}

				// update days-of-week when locale, daysOfweekDisabled or weekStart is changed
				if (updateDOW) {
					Array.from(this.dow.children).forEach((el, index) => {
						const dow = (this.weekStart + index) % 7;
						el.textContent = this.dayNames[dow];
						el.className = this.daysOfWeekDisabled.includes(dow) ? "dow disabled" : "dow";
					});
				}
			}

			// Apply update on the focused date to view's settings
			updateFocus() {
				const viewDate = new Date(this.picker.viewDate);
				const viewYear = viewDate.getFullYear();
				const viewMonth = viewDate.getMonth();
				const firstOfMonth = dateValue(viewYear, viewMonth, 1);
				const start = dayOfTheWeekOf(firstOfMonth, this.weekStart, this.weekStart);

				this.first = firstOfMonth;
				this.last = dateValue(viewYear, viewMonth + 1, 0);
				this.start = start;
				this.focused = this.picker.viewDate;
			}

			// Apply update on the selected dates to view's settings
			updateSelection() {
				const { dates, rangepicker } = this.picker.datepicker;
				this.selected = dates;
				if (rangepicker) {
					this.range = rangepicker.dates;
				}
			}

			// Update the entire view UI
			render() {
				// update today marker on ever render
				this.today = this.todayHighlight ? today() : undefined;

				this.prepareForRender(
					date_format_formatDate(this.focused, this.switchLabelFormat, this.locale),
					this.first <= this.minDate,
					this.last >= this.maxDate
				);

				if (this.weekNumbers) {
					const weekStart = this.weekStart;
					const startOfWeek = dayOfTheWeekOf(this.first, weekStart, weekStart);
					Array.from(this.weekNumbers.weeks.children).forEach((el, index) => {
						const dateOfWeekStart = addWeeks(startOfWeek, index);
						el.textContent = this.getWeekNumber(dateOfWeekStart, weekStart);
						if (index > 3) {
							el.classList[dateOfWeekStart > this.last ? "add" : "remove"]("next");
						}
					});
				}
				Array.from(this.grid.children).forEach((el, index) => {
					const current = addDays(this.start, index);
					const dateObj = new Date(current);
					const day = dateObj.getDay();
					const extraClasses = [];

					if (this.today === current) {
						extraClasses.push("today");
					}
					if (this.daysOfWeekHighlighted.includes(day)) {
						extraClasses.push("highlighted");
					}

					this.renderCell(
						el,
						dateObj.getDate(),
						current,
						current,
						this,
						current < this.minDate || current > this.maxDate || this.daysOfWeekDisabled.includes(day),
						extraClasses
					);
				});
			}

			// Update the view UI by applying the changes of selected and focused items
			refresh() {
				const range = this.range || [];
				Array.from(this.grid.children).forEach((el) => {
					this.refreshCell(el, Number(el.dataset.date), this.selected, range);
				});
			}

			// Update the view UI by applying the change of focused item
			refreshFocus() {
				this.changeFocusedCell(Math.round((this.focused - this.start) / 86400000));
			}
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/picker/views/MonthsView.js

		function computeMonthRange(range, thisYear) {
			if (!range || !range[0] || !range[1]) {
				return;
			}

			const [[startY, startM], [endY, endM]] = range;
			if (startY > thisYear || endY < thisYear) {
				return;
			}
			return [startY === thisYear ? startM : -1, endY === thisYear ? endM : 12];
		}

		class MonthsView extends View {
			constructor(picker) {
				super(picker, {
					id: 1,
					name: "months",
					cellClass: "month",
				});
			}

			init(options, onConstruction = true) {
				if (onConstruction) {
					this.grid = this.element;
					this.element.classList.add("months", "datepicker-grid");
					this.grid.appendChild(parseHTML(createTagRepeat("span", 12, { "data-month": (ix) => ix })));
					this.first = 0;
					this.last = 11;
				}
				super.init(options);
			}

			setOptions(options) {
				if (options.locale) {
					this.monthNames = options.locale.monthsShort;
				}
				if ("minDate" in options) {
					if (options.minDate === undefined) {
						this.minYear = this.minMonth = this.minDate = undefined;
					} else {
						const minDateObj = new Date(options.minDate);
						this.minYear = minDateObj.getFullYear();
						this.minMonth = minDateObj.getMonth();
						this.minDate = minDateObj.setDate(1);
					}
				}
				if ("maxDate" in options) {
					if (options.maxDate === undefined) {
						this.maxYear = this.maxMonth = this.maxDate = undefined;
					} else {
						const maxDateObj = new Date(options.maxDate);
						this.maxYear = maxDateObj.getFullYear();
						this.maxMonth = maxDateObj.getMonth();
						this.maxDate = dateValue(this.maxYear, this.maxMonth + 1, 0);
					}
				}
				if (options.checkDisabled) {
					this.checkDisabled =
						this.isMinView || options.datesDisabled === null ? options.checkDisabled : () => false;
				}
				if ("beforeShowMonth" in options) {
					this.beforeShow =
						typeof options.beforeShowMonth === "function" ? options.beforeShowMonth : undefined;
				}
			}

			// Update view's settings to reflect the viewDate set on the picker
			updateFocus() {
				const viewDate = new Date(this.picker.viewDate);
				this.year = viewDate.getFullYear();
				this.focused = viewDate.getMonth();
			}

			// Update view's settings to reflect the selected dates
			updateSelection() {
				const { dates, rangepicker } = this.picker.datepicker;
				this.selected = dates.reduce((selected, timeValue) => {
					const date = new Date(timeValue);
					const year = date.getFullYear();
					const month = date.getMonth();
					if (selected[year] === undefined) {
						selected[year] = [month];
					} else {
						pushUnique(selected[year], month);
					}
					return selected;
				}, {});
				if (rangepicker && rangepicker.dates) {
					this.range = rangepicker.dates.map((timeValue) => {
						const date = new Date(timeValue);
						return isNaN(date) ? undefined : [date.getFullYear(), date.getMonth()];
					});
				}
			}

			// Update the entire view UI
			render() {
				this.prepareForRender(this.year, this.year <= this.minYear, this.year >= this.maxYear);

				const selected = this.selected[this.year] || [];
				const yrOutOfRange = this.year < this.minYear || this.year > this.maxYear;
				const isMinYear = this.year === this.minYear;
				const isMaxYear = this.year === this.maxYear;
				const range = computeMonthRange(this.range, this.year);

				Array.from(this.grid.children).forEach((el, index) => {
					const date = regularizeDate(new Date(this.year, index, 1), 1, this.isRangeEnd);

					this.renderCell(
						el,
						this.monthNames[index],
						index,
						date,
						{ selected, range },
						yrOutOfRange || (isMinYear && index < this.minMonth) || (isMaxYear && index > this.maxMonth)
					);
				});
			}

			// Update the view UI by applying the changes of selected and focused items
			refresh() {
				const selected = this.selected[this.year] || [];
				const range = computeMonthRange(this.range, this.year) || [];
				Array.from(this.grid.children).forEach((el, index) => {
					this.refreshCell(el, index, selected, range);
				});
			}

			// Update the view UI by applying the change of focused item
			refreshFocus() {
				this.changeFocusedCell(this.focused);
			}
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/picker/views/YearsView.js
		function toTitleCase(word) {
			return [...word].reduce((str, ch, ix) => (str += ix ? ch : ch.toUpperCase()), "");
		}

		// Class representing the years and decades view elements
		class YearsView extends View {
			constructor(picker, config) {
				super(picker, config);
			}

			init(options, onConstruction = true) {
				if (onConstruction) {
					this.navStep = this.step * 10;
					this.beforeShowOption = `beforeShow${toTitleCase(this.cellClass)}`;
					this.grid = this.element;
					this.element.classList.add(this.name, "datepicker-grid");
					this.grid.appendChild(parseHTML(createTagRepeat("span", 12)));
				}
				super.init(options);
			}

			setOptions(options) {
				if ("minDate" in options) {
					if (options.minDate === undefined) {
						this.minYear = this.minDate = undefined;
					} else {
						this.minYear = startOfYearPeriod(options.minDate, this.step);
						this.minDate = dateValue(this.minYear, 0, 1);
					}
				}
				if ("maxDate" in options) {
					if (options.maxDate === undefined) {
						this.maxYear = this.maxDate = undefined;
					} else {
						this.maxYear = startOfYearPeriod(options.maxDate, this.step);
						this.maxDate = dateValue(this.maxYear, 11, 31);
					}
				}
				if (options.checkDisabled) {
					this.checkDisabled =
						this.isMinView || options.datesDisabled === null ? options.checkDisabled : () => false;
				}
				if (this.beforeShowOption in options) {
					const beforeShow = options[this.beforeShowOption];
					this.beforeShow = typeof beforeShow === "function" ? beforeShow : undefined;
				}
			}

			// Update view's settings to reflect the viewDate set on the picker
			updateFocus() {
				const viewDate = new Date(this.picker.viewDate);
				const first = startOfYearPeriod(viewDate, this.navStep);
				const last = first + 9 * this.step;

				this.first = first;
				this.last = last;
				this.start = first - this.step;
				this.focused = startOfYearPeriod(viewDate, this.step);
			}

			// Update view's settings to reflect the selected dates
			updateSelection() {
				const { dates, rangepicker } = this.picker.datepicker;
				this.selected = dates.reduce((years, timeValue) => {
					return pushUnique(years, startOfYearPeriod(timeValue, this.step));
				}, []);
				if (rangepicker && rangepicker.dates) {
					this.range = rangepicker.dates.map((timeValue) => {
						if (timeValue !== undefined) {
							return startOfYearPeriod(timeValue, this.step);
						}
					});
				}
			}

			// Update the entire view UI
			render() {
				this.prepareForRender(
					`${this.first}-${this.last}`,
					this.first <= this.minYear,
					this.last >= this.maxYear
				);

				Array.from(this.grid.children).forEach((el, index) => {
					const current = this.start + index * this.step;
					const date = regularizeDate(new Date(current, 0, 1), 2, this.isRangeEnd);

					el.dataset.year = current;
					this.renderCell(el, current, current, date, this, current < this.minYear || current > this.maxYear);
				});
			}

			// Update the view UI by applying the changes of selected and focused items
			refresh() {
				const range = this.range || [];
				Array.from(this.grid.children).forEach((el) => {
					this.refreshCell(el, Number(el.textContent), this.selected, range);
				});
			}

			// Update the view UI by applying the change of focused item
			refreshFocus() {
				this.changeFocusedCell(Math.round((this.focused - this.start) / this.step));
			}
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/events/functions.js

		function triggerDatepickerEvent(datepicker, type) {
			const options = {
				bubbles: true,
				cancelable: true,
				detail: {
					date: datepicker.getDate(),
					viewDate: new Date(datepicker.picker.viewDate),
					viewId: datepicker.picker.currentView.id,
					datepicker,
				},
			};
			datepicker.element.dispatchEvent(new CustomEvent(type, options));
		}

		// direction: -1 (to previous), 1 (to next)
		function goToPrevOrNext(datepicker, direction) {
			const { config, picker } = datepicker;
			const { currentView, viewDate } = picker;
			let newViewDate;
			switch (currentView.id) {
				case 0:
					newViewDate = addMonths(viewDate, direction);
					break;
				case 1:
					newViewDate = addYears(viewDate, direction);
					break;
				default:
					newViewDate = addYears(viewDate, direction * currentView.navStep);
			}
			newViewDate = limitToRange(newViewDate, config.minDate, config.maxDate);
			picker.changeFocus(newViewDate).render();
		}

		function switchView(datepicker) {
			const viewId = datepicker.picker.currentView.id;
			if (viewId === datepicker.config.maxView) {
				return;
			}
			datepicker.picker.changeView(viewId + 1).render();
		}

		function clearSelection(datepicker) {
			datepicker.setDate({ clear: true });
		}

		function goToOrSelectToday(datepicker) {
			const currentDate = today();
			if (datepicker.config.todayButtonMode === 1) {
				datepicker.setDate(currentDate, { forceRefresh: true, viewDate: currentDate });
			} else {
				datepicker.setFocusedDate(currentDate, true);
			}
		}

		function unfocus(datepicker) {
			const onBlur = () => {
				if (datepicker.config.updateOnBlur) {
					datepicker.update({ revert: true });
				} else {
					datepicker.refresh("input");
				}
				datepicker.hide();
			};
			const element = datepicker.element;

			if (isActiveElement(element)) {
				element.addEventListener("blur", onBlur, { once: true });
			} else {
				onBlur();
			}
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/events/pickerListeners.js

		function goToSelectedMonthOrYear(datepicker, selection) {
			const picker = datepicker.picker;
			const viewDate = new Date(picker.viewDate);
			const viewId = picker.currentView.id;
			const newDate =
				viewId === 1
					? addMonths(viewDate, selection - viewDate.getMonth())
					: addYears(viewDate, selection - viewDate.getFullYear());

			picker
				.changeFocus(newDate)
				.changeView(viewId - 1)
				.render();
		}

		function onClickViewSwitch(datepicker) {
			switchView(datepicker);
		}

		function onClickPrevButton(datepicker) {
			goToPrevOrNext(datepicker, -1);
		}

		function onClickNextButton(datepicker) {
			goToPrevOrNext(datepicker, 1);
		}

		// For the picker's main block to delegete the events from `datepicker-cell`s
		function onClickView(datepicker, ev) {
			const target = findElementInEventPath(ev, ".datepicker-cell");
			if (!target || target.classList.contains("disabled")) {
				return;
			}

			const { id, isMinView } = datepicker.picker.currentView;
			const data = target.dataset;
			if (isMinView) {
				datepicker.setDate(Number(data.date));
			} else if (id === 1) {
				goToSelectedMonthOrYear(datepicker, Number(data.month));
			} else {
				goToSelectedMonthOrYear(datepicker, Number(data.year));
			}
		}

		function onMousedownPicker(ev) {
			ev.preventDefault();
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/picker/Picker.js

		const orientClasses = ["left", "top", "right", "bottom"].reduce((obj, key) => {
			obj[key] = `datepicker-orient-${key}`;
			return obj;
		}, {});
		const toPx = (num) => (num ? `${num}px` : num);

		function processPickerOptions(picker, options) {
			if ("title" in options) {
				if (options.title) {
					picker.controls.title.textContent = options.title;
					showElement(picker.controls.title);
				} else {
					picker.controls.title.textContent = "";
					hideElement(picker.controls.title);
				}
			}
			if (options.prevArrow) {
				const prevButton = picker.controls.prevButton;
				emptyChildNodes(prevButton);
				options.prevArrow.forEach((node) => {
					prevButton.appendChild(node.cloneNode(true));
				});
			}
			if (options.nextArrow) {
				const nextButton = picker.controls.nextButton;
				emptyChildNodes(nextButton);
				options.nextArrow.forEach((node) => {
					nextButton.appendChild(node.cloneNode(true));
				});
			}
			if (options.locale) {
				picker.controls.todayButton.textContent = options.locale.today;
				picker.controls.clearButton.textContent = options.locale.clear;
			}
			if ("todayButton" in options) {
				if (options.todayButton) {
					showElement(picker.controls.todayButton);
				} else {
					hideElement(picker.controls.todayButton);
				}
			}
			if ("minDate" in options || "maxDate" in options) {
				const { minDate, maxDate } = picker.datepicker.config;
				picker.controls.todayButton.disabled = !isInRange(today(), minDate, maxDate);
			}
			if ("clearButton" in options) {
				if (options.clearButton) {
					showElement(picker.controls.clearButton);
				} else {
					hideElement(picker.controls.clearButton);
				}
			}
		}

		// Compute view date to reset, which will be...
		// - the last item of the selected dates or defaultViewDate if no selection
		// - limitted to minDate or maxDate if it exceeds the range
		function computeResetViewDate(datepicker) {
			const { dates, config, rangeSideIndex } = datepicker;
			const viewDate =
				dates.length > 0
					? lastItemOf(dates)
					: regularizeDate(config.defaultViewDate, config.pickLevel, rangeSideIndex);
			return limitToRange(viewDate, config.minDate, config.maxDate);
		}

		// Change current view's view date
		function setViewDate(picker, newDate) {
			if (!("_oldViewDate" in picker) && newDate !== picker.viewDate) {
				picker._oldViewDate = picker.viewDate;
			}
			picker.viewDate = newDate;

			// return whether the new date is in different period on time from the one
			// displayed in the current view
			// when true, the view needs to be re-rendered on the next UI refresh.
			const { id, year, first, last } = picker.currentView;
			const viewYear = new Date(newDate).getFullYear();
			switch (id) {
				case 0:
					return newDate < first || newDate > last;
				case 1:
					return viewYear !== year;
				default:
					return viewYear < first || viewYear > last;
			}
		}

		function getTextDirection(el) {
			return window.getComputedStyle(el).direction;
		}

		// find the closet scrollable ancestor elemnt under the body
		function findScrollParents(el) {
			const parent = getParent(el);
			if (parent === document.body || !parent) {
				return;
			}

			// checking overflow only is enough because computed overflow cannot be
			// visible or a combination of visible and other when either axis is set
			// to other than visible.
			// (Setting one axis to other than 'visible' while the other is 'visible'
			// results in the other axis turning to 'auto')
			return window.getComputedStyle(parent).overflow !== "visible" ? parent : findScrollParents(parent);
		}

		// Class representing the picker UI
		class Picker {
			constructor(datepicker) {
				const { config, inputField } = (this.datepicker = datepicker);

				const template = pickerTemplate.replace(/%buttonClass%/g, config.buttonClass);
				const element = (this.element = parseHTML(template).firstChild);
				const [header, main, footer] = element.firstChild.children;
				const title = header.firstElementChild;
				const [prevButton, viewSwitch, nextButton] = header.lastElementChild.children;
				const [todayButton, clearButton] = footer.firstChild.children;
				const controls = {
					title,
					prevButton,
					viewSwitch,
					nextButton,
					todayButton,
					clearButton,
				};
				this.main = main;
				this.controls = controls;

				const elementClass = inputField ? "dropdown" : "inline";
				element.classList.add(`datepicker-${elementClass}`);

				processPickerOptions(this, config);
				this.viewDate = computeResetViewDate(datepicker);

				// set up event listeners
				event_registerListeners(datepicker, [
					[element, "mousedown", onMousedownPicker],
					[main, "click", onClickView.bind(null, datepicker)],
					[controls.viewSwitch, "click", onClickViewSwitch.bind(null, datepicker)],
					[controls.prevButton, "click", onClickPrevButton.bind(null, datepicker)],
					[controls.nextButton, "click", onClickNextButton.bind(null, datepicker)],
					[controls.todayButton, "click", goToOrSelectToday.bind(null, datepicker)],
					[controls.clearButton, "click", clearSelection.bind(null, datepicker)],
				]);

				// set up views
				this.views = [
					new DaysView(this),
					new MonthsView(this),
					new YearsView(this, { id: 2, name: "years", cellClass: "year", step: 1 }),
					new YearsView(this, { id: 3, name: "decades", cellClass: "decade", step: 10 }),
				];
				this.currentView = this.views[config.startView];

				this.currentView.render();
				this.main.appendChild(this.currentView.element);
				if (config.container) {
					config.container.appendChild(this.element);
				} else {
					inputField.after(this.element);
				}
			}

			setOptions(options) {
				processPickerOptions(this, options);
				this.views.forEach((view) => {
					view.init(options, false);
				});
				this.currentView.render();
			}

			detach() {
				this.element.remove();
			}

			show() {
				if (this.active) {
					return;
				}

				const { datepicker, element } = this;
				const inputField = datepicker.inputField;
				if (inputField) {
					// ensure picker's direction matches input's
					const inputDirection = getTextDirection(inputField);
					if (inputDirection !== getTextDirection(getParent(element))) {
						element.dir = inputDirection;
					} else if (element.dir) {
						element.removeAttribute("dir");
					}

					// Determine the picker's position first to prevent `orientation: 'auto'`
					// from being miscalculated to 'bottom' after the picker temporarily
					// shown below the input field expands the document height if the field
					// is at the bottom edge of the document
					this.place();
					element.classList.add("active");

					if (datepicker.config.disableTouchKeyboard) {
						inputField.blur();
					}
				} else {
					element.classList.add("active");
				}
				this.active = true;
				triggerDatepickerEvent(datepicker, "show");
			}

			hide() {
				if (!this.active) {
					return;
				}
				this.datepicker.exitEditMode();
				this.element.classList.remove("active");
				this.active = false;
				triggerDatepickerEvent(this.datepicker, "hide");
			}

			place() {
				const { classList, style } = this.element;
				// temporarily display the picker to get its size and offset parent
				style.display = "block";

				const { width: calendarWidth, height: calendarHeight } = this.element.getBoundingClientRect();
				const offsetParent = this.element.offsetParent;
				// turn the picker back to hidden so that the position is determined with
				// the state before it is shown.
				style.display = "";

				const { config, inputField } = this.datepicker;
				const {
					left: inputLeft,
					top: inputTop,
					right: inputRight,
					bottom: inputBottom,
					width: inputWidth,
					height: inputHeight,
				} = inputField.getBoundingClientRect();
				let { x: orientX, y: orientY } = config.orientation;
				let left = inputLeft;
				let top = inputTop;

				// caliculate offsetLeft/Top of inputField
				if (offsetParent === document.body || !offsetParent) {
					left += window.scrollX;
					top += window.scrollY;
				} else {
					const offsetParentRect = offsetParent.getBoundingClientRect();
					left -= offsetParentRect.left - offsetParent.scrollLeft;
					top -= offsetParentRect.top - offsetParent.scrollTop;
				}

				// caliculate the boundaries of the visible area that contains inputField
				const scrollParent = findScrollParents(inputField);
				let scrollAreaLeft = 0;
				let scrollAreaTop = 0;
				let { clientWidth: scrollAreaRight, clientHeight: scrollAreaBottom } = document.documentElement;

				if (scrollParent) {
					const scrollParentRect = scrollParent.getBoundingClientRect();
					if (scrollParentRect.top > 0) {
						scrollAreaTop = scrollParentRect.top;
					}
					if (scrollParentRect.left > 0) {
						scrollAreaLeft = scrollParentRect.left;
					}
					if (scrollParentRect.right < scrollAreaRight) {
						scrollAreaRight = scrollParentRect.right;
					}
					if (scrollParentRect.bottom < scrollAreaBottom) {
						scrollAreaBottom = scrollParentRect.bottom;
					}
				}

				// determine the horizontal orientation and left position
				let adjustment = 0;
				if (orientX === "auto") {
					if (inputLeft < scrollAreaLeft) {
						orientX = "left";
						adjustment = scrollAreaLeft - inputLeft;
					} else if (inputLeft + calendarWidth > scrollAreaRight) {
						orientX = "right";
						if (scrollAreaRight < inputRight) {
							adjustment = scrollAreaRight - inputRight;
						}
					} else if (getTextDirection(inputField) === "rtl") {
						orientX = inputRight - calendarWidth < scrollAreaLeft ? "left" : "right";
					} else {
						orientX = "left";
					}
				}
				if (orientX === "right") {
					left += inputWidth - calendarWidth;
				}
				left += adjustment;

				// determine the vertical orientation and top position
				if (orientY === "auto") {
					if (inputTop - calendarHeight > scrollAreaTop) {
						orientY = inputBottom + calendarHeight > scrollAreaBottom ? "top" : "bottom";
					} else {
						orientY = "bottom";
					}
				}
				if (orientY === "top") {
					top -= calendarHeight;
				} else {
					top += inputHeight;
				}

				classList.remove(...Object.values(orientClasses));
				classList.add(orientClasses[orientX], orientClasses[orientY]);

				style.left = toPx(left);
				style.top = toPx(top);
			}

			setViewSwitchLabel(labelText) {
				this.controls.viewSwitch.textContent = labelText;
			}

			setPrevButtonDisabled(disabled) {
				this.controls.prevButton.disabled = disabled;
			}

			setNextButtonDisabled(disabled) {
				this.controls.nextButton.disabled = disabled;
			}

			changeView(viewId) {
				const currentView = this.currentView;
				if (viewId !== currentView.id) {
					if (!this._oldView) {
						this._oldView = currentView;
					}
					this.currentView = this.views[viewId];
					this._renderMethod = "render";
				}
				return this;
			}

			// Change the focused date (view date)
			changeFocus(newViewDate) {
				this._renderMethod = setViewDate(this, newViewDate) ? "render" : "refreshFocus";
				this.views.forEach((view) => {
					view.updateFocus();
				});
				return this;
			}

			// Apply the change of the selected dates
			update(viewDate = undefined) {
				const newViewDate = viewDate === undefined ? computeResetViewDate(this.datepicker) : viewDate;
				this._renderMethod = setViewDate(this, newViewDate) ? "render" : "refresh";
				this.views.forEach((view) => {
					view.updateFocus();
					view.updateSelection();
				});
				return this;
			}

			// Refresh the picker UI
			render(quickRender = true) {
				const { currentView, datepicker, _oldView: oldView } = this;
				const oldViewDate = new Date(this._oldViewDate);
				const renderMethod = (quickRender && this._renderMethod) || "render";
				delete this._oldView;
				delete this._oldViewDate;
				delete this._renderMethod;

				currentView[renderMethod]();
				if (oldView) {
					this.main.replaceChild(currentView.element, oldView.element);
					triggerDatepickerEvent(datepicker, "changeView");
				}
				if (!isNaN(oldViewDate)) {
					const newViewDate = new Date(this.viewDate);
					if (newViewDate.getFullYear() !== oldViewDate.getFullYear()) {
						triggerDatepickerEvent(datepicker, "changeYear");
					}
					if (newViewDate.getMonth() !== oldViewDate.getMonth()) {
						triggerDatepickerEvent(datepicker, "changeMonth");
					}
				}
			}
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/events/elementListeners.js

		// Find the closest date that doesn't meet the condition for unavailable date
		// Returns undefined if no available date is found
		// addFn: function to calculate the next date
		//   - args: time value, amount
		// increase: amount to pass to addFn
		// testFn: function to test the unavailability of the date
		//   - args: time value; return: true if unavailable
		function findNextAvailableOne(date, addFn, increase, testFn, min, max) {
			if (!isInRange(date, min, max)) {
				return;
			}
			if (testFn(date)) {
				const newDate = addFn(date, increase);
				return findNextAvailableOne(newDate, addFn, increase, testFn, min, max);
			}
			return date;
		}

		// direction: -1 (left/up), 1 (right/down)
		// vertical: true for up/down, false for left/right
		function moveByArrowKey(datepicker, direction, vertical) {
			const picker = datepicker.picker;
			const currentView = picker.currentView;
			const step = currentView.step || 1;
			let viewDate = picker.viewDate;
			let addFn;
			switch (currentView.id) {
				case 0:
					viewDate = addDays(viewDate, vertical ? direction * 7 : direction);
					addFn = addDays;
					break;
				case 1:
					viewDate = addMonths(viewDate, vertical ? direction * 4 : direction);
					addFn = addMonths;
					break;
				default:
					viewDate = addYears(viewDate, direction * (vertical ? 4 : 1) * step);
					addFn = addYears;
			}
			viewDate = findNextAvailableOne(
				viewDate,
				addFn,
				direction < 0 ? -step : step,
				(date) => currentView.disabled.includes(date),
				currentView.minDate,
				currentView.maxDate
			);
			if (viewDate !== undefined) {
				picker.changeFocus(viewDate).render();
			}
		}

		function onKeydown(datepicker, ev) {
			const { config, picker, editMode } = datepicker;
			const active = picker.active;
			const { key, altKey, shiftKey } = ev;
			const ctrlOrMetaKey = ev.ctrlKey || ev.metaKey;
			const cancelEvent = () => {
				ev.preventDefault();
				ev.stopPropagation();
			};

			// tab/enter keys should not be taken by shortcut keys
			if (key === "Tab") {
				unfocus(datepicker);
				return;
			}
			if (key === "Enter") {
				if (!active) {
					datepicker.update();
				} else if (editMode) {
					datepicker.exitEditMode({ update: true, autohide: config.autohide });
				} else {
					const currentView = picker.currentView;
					if (currentView.isMinView) {
						datepicker.setDate(picker.viewDate);
					} else {
						picker.changeView(currentView.id - 1).render();
						cancelEvent();
					}
				}
				return;
			}

			const shortcutKeys = config.shortcutKeys;
			const keyInfo = { key, ctrlOrMetaKey, altKey, shiftKey };
			const shortcut = Object.keys(shortcutKeys).find((item) => {
				const keyDef = shortcutKeys[item];
				return !Object.keys(keyDef).find((prop) => keyDef[prop] !== keyInfo[prop]);
			});
			if (shortcut) {
				let action;
				if (shortcut === "toggle") {
					action = shortcut;
				} else if (editMode) {
					if (shortcut === "exitEditMode") {
						action = shortcut;
					}
				} else if (active) {
					if (shortcut === "hide") {
						action = shortcut;
					} else if (shortcut === "prevButton") {
						action = [goToPrevOrNext, [datepicker, -1]];
					} else if (shortcut === "nextButton") {
						action = [goToPrevOrNext, [datepicker, 1]];
					} else if (shortcut === "viewSwitch") {
						action = [switchView, [datepicker]];
					} else if (config.clearButton && shortcut === "clearButton") {
						action = [clearSelection, [datepicker]];
					} else if (config.todayButton && shortcut === "todayButton") {
						action = [goToOrSelectToday, [datepicker]];
					}
				} else if (shortcut === "show") {
					action = shortcut;
				}
				if (action) {
					if (Array.isArray(action)) {
						action[0].apply(null, action[1]);
					} else {
						datepicker[action]();
					}
					cancelEvent();
					return;
				}
			}

			// perform as a regular <input> when picker in hidden or in edit mode
			if (!active || editMode) {
				return;
			}

			const handleArrowKeyPress = (direction, vertical) => {
				if (shiftKey || ctrlOrMetaKey || altKey) {
					datepicker.enterEditMode();
				} else {
					moveByArrowKey(datepicker, direction, vertical);
					ev.preventDefault();
				}
			};

			if (key === "ArrowLeft") {
				handleArrowKeyPress(-1, false);
			} else if (key === "ArrowRight") {
				handleArrowKeyPress(1, false);
			} else if (key === "ArrowUp") {
				handleArrowKeyPress(-1, true);
			} else if (key === "ArrowDown") {
				handleArrowKeyPress(1, true);
			} else if (
				key === "Backspace" ||
				key === "Delete" ||
				// When autofill is performed, Chromium-based browsers trigger fake
				// keydown/keyup events that don't have the `key` property (on Edge,
				// keyup only) in addition to the input event. Therefore, we need to
				// check the existence of `key`'s value before checking the length.
				// (issue #144)
				(key && key.length === 1 && !ctrlOrMetaKey)
			) {
				datepicker.enterEditMode();
			}
		}

		function onFocus(datepicker) {
			if (datepicker.config.showOnFocus && !datepicker._showing) {
				datepicker.show();
			}
		}

		// for the prevention for entering edit mode while getting focus on click
		function onMousedown(datepicker, ev) {
			const el = ev.target;
			if (datepicker.picker.active || datepicker.config.showOnClick) {
				el._active = isActiveElement(el);
				el._clicking = setTimeout(() => {
					delete el._active;
					delete el._clicking;
				}, 2000);
			}
		}

		function onClickInput(datepicker, ev) {
			const el = ev.target;
			if (!el._clicking) {
				return;
			}
			clearTimeout(el._clicking);
			delete el._clicking;

			if (el._active) {
				datepicker.enterEditMode();
			}
			delete el._active;

			if (datepicker.config.showOnClick) {
				datepicker.show();
			}
		}

		function onPaste(datepicker, ev) {
			if (ev.clipboardData.types.includes("text/plain")) {
				datepicker.enterEditMode();
			}
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/events/otherListeners.js

		// for the `document` to delegate the events from outside the picker/input field
		function onClickOutside(datepicker, ev) {
			const { element, picker } = datepicker;
			// check both picker's and input's activeness to make updateOnBlur work in
			// the cases where...
			// - picker is hidden by ESC key press → input stays focused
			// - input is unfocused by closing mobile keyboard → piker is kept shown
			if (!picker.active && !isActiveElement(element)) {
				return;
			}
			const pickerElem = picker.element;
			if (findElementInEventPath(ev, (el) => el === element || el === pickerElem)) {
				return;
			}
			unfocus(datepicker);
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/Datepicker.js

		function stringifyDates(dates, config) {
			return dates
				.map((dt) => date_format_formatDate(dt, config.format, config.locale))
				.join(config.dateDelimiter);
		}

		// parse input dates and create an array of time values for selection
		// returns undefined if there are no valid dates in inputDates
		// when origDates (current selection) is passed, the function works to mix
		// the input dates into the current selection
		function processInputDates(datepicker, inputDates, clear = false) {
			if (inputDates.length === 0) {
				// empty input is considered valid unless origiDates is passed
				return clear ? [] : undefined;
			}

			const { config, dates: origDates, rangeSideIndex } = datepicker;
			const { pickLevel, maxNumberOfDates } = config;
			let newDates = inputDates.reduce((dates, dt) => {
				let date = parseDate(dt, config.format, config.locale);
				if (date === undefined) {
					return dates;
				}
				// adjust to 1st of the month/Jan 1st of the year
				// or to the last day of the monh/Dec 31st of the year if the datepicker
				// is the range-end picker of a rangepicker
				date = regularizeDate(date, pickLevel, rangeSideIndex);
				if (
					isInRange(date, config.minDate, config.maxDate) &&
					!dates.includes(date) &&
					!config.checkDisabled(date, pickLevel) &&
					(pickLevel > 0 || !config.daysOfWeekDisabled.includes(new Date(date).getDay()))
				) {
					dates.push(date);
				}
				return dates;
			}, []);
			if (newDates.length === 0) {
				return;
			}
			if (config.multidate && !clear) {
				// get the synmetric difference between origDates and newDates
				newDates = newDates.reduce(
					(dates, date) => {
						if (!origDates.includes(date)) {
							dates.push(date);
						}
						return dates;
					},
					origDates.filter((date) => !newDates.includes(date))
				);
			}
			// do length check always because user can input multiple dates regardless of the mode
			return maxNumberOfDates && newDates.length > maxNumberOfDates
				? newDates.slice(maxNumberOfDates * -1)
				: newDates;
		}

		// refresh the UI elements
		// modes: 1: input only, 2, picker only, 3 both
		function refreshUI(datepicker, mode = 3, quickRender = true, viewDate = undefined) {
			const { config, picker, inputField } = datepicker;
			if (mode & 2) {
				const newView = picker.active ? config.pickLevel : config.startView;
				picker.update(viewDate).changeView(newView).render(quickRender);
			}
			if (mode & 1 && inputField) {
				inputField.value = stringifyDates(datepicker.dates, config);
			}
		}

		function setDate(datepicker, inputDates, options) {
			const config = datepicker.config;
			let { clear, render, autohide, revert, forceRefresh, viewDate } = options;
			if (render === undefined) {
				render = true;
			}
			if (!render) {
				autohide = forceRefresh = false;
			} else if (autohide === undefined) {
				autohide = config.autohide;
			}
			viewDate = parseDate(viewDate, config.format, config.locale);

			const newDates = processInputDates(datepicker, inputDates, clear);
			if (!newDates && !revert) {
				return;
			}
			if (newDates && newDates.toString() !== datepicker.dates.toString()) {
				datepicker.dates = newDates;
				refreshUI(datepicker, render ? 3 : 1, true, viewDate);
				triggerDatepickerEvent(datepicker, "changeDate");
			} else {
				refreshUI(datepicker, forceRefresh ? 3 : 1, true, viewDate);
			}

			if (autohide) {
				datepicker.hide();
			}
		}

		function getOutputConverter(datepicker, format) {
			return format
				? (date) => date_format_formatDate(date, format, datepicker.config.locale)
				: (date) => new Date(date);
		}

		/**
		 * Class representing a date picker
		 */
		class Datepicker_Datepicker {
			/**
			 * Create a date picker
			 * @param  {Element} element - element to bind a date picker
			 * @param  {Object} [options] - config options
			 * @param  {DateRangePicker} [rangepicker] - DateRangePicker instance the
			 * date picker belongs to. Use this only when creating date picker as a part
			 * of date range picker
			 */
			constructor(element, options = {}, rangepicker = undefined) {
				element.datepicker = this;
				this.element = element;
				this.dates = [];

				// initialize config
				const config = (this.config = Object.assign(
					{
						buttonClass: (options.buttonClass && String(options.buttonClass)) || "button",
						container: null,
						defaultViewDate: today(),
						maxDate: undefined,
						minDate: undefined,
					},
					processOptions(defaultOptions, this)
				));

				// configure by type
				let inputField;
				if (element.tagName === "INPUT") {
					inputField = this.inputField = element;
					inputField.classList.add("datepicker-input");
					if (options.container) {
						// omit string type check because it doesn't guarantee to avoid errors
						// (invalid selector string causes abend with sytax error)
						config.container =
							options.container instanceof HTMLElement
								? options.container
								: document.querySelector(options.container);
					}
				} else {
					config.container = element;
				}
				if (rangepicker) {
					// check validiry
					const index = rangepicker.inputs.indexOf(inputField);
					const datepickers = rangepicker.datepickers;
					if (index < 0 || index > 1 || !Array.isArray(datepickers)) {
						throw Error("Invalid rangepicker object.");
					}
					// attach itaelf to the rangepicker here so that processInputDates() can
					// determine if this is the range-end picker of the rangepicker while
					// setting inital values when pickLevel > 0
					datepickers[index] = this;
					this.rangepicker = rangepicker;
					this.rangeSideIndex = index;
				}

				// set up config
				this._options = options;
				Object.assign(config, processOptions(options, this));
				config.shortcutKeys = createShortcutKeyConfig(options.shortcutKeys || {});

				// process initial value
				const initialDates = stringToArray(element.value || element.dataset.date, config.dateDelimiter);
				delete element.dataset.date;
				const inputDateValues = processInputDates(this, initialDates);
				if (inputDateValues && inputDateValues.length > 0) {
					this.dates = inputDateValues;
				}
				if (inputField) {
					inputField.value = stringifyDates(this.dates, config);
				}

				// set up picekr element
				const picker = (this.picker = new Picker(this));

				const keydownListener = [element, "keydown", onKeydown.bind(null, this)];
				if (inputField) {
					event_registerListeners(this, [
						keydownListener,
						[inputField, "focus", onFocus.bind(null, this)],
						[inputField, "mousedown", onMousedown.bind(null, this)],
						[inputField, "click", onClickInput.bind(null, this)],
						[inputField, "paste", onPaste.bind(null, this)],
						// To detect a click on outside, just listening to mousedown is enough,
						// no need to listen to touchstart.
						// Actually, listening to touchstart can be a problem because, while
						// mousedown is fired only on tapping but not on swiping/pinching,
						// touchstart is fired on swiping/pinching as well.
						// (issue #95)
						[document, "mousedown", onClickOutside.bind(null, this)],
						[window, "resize", picker.place.bind(picker)],
					]);
				} else {
					event_registerListeners(this, [keydownListener]);
					this.show();
				}
			}

			/**
			 * Format Date object or time value in given format and language
			 * @param  {Date|Number} date - date or time value to format
			 * @param  {String|Object} format - format string or object that contains
			 * toDisplay() custom formatter, whose signature is
			 * - args:
			 *   - date: {Date} - Date instance of the date passed to the method
			 *   - format: {Object} - the format object passed to the method
			 *   - locale: {Object} - locale for the language specified by `lang`
			 * - return:
			 *     {String} formatted date
			 * @param  {String} [lang=en] - language code for the locale to use
			 * @return {String} formatted date
			 */
			static formatDate(date, format, lang) {
				return date_format_formatDate(date, format, (lang && base_locales[lang]) || base_locales.en);
			}

			/**
			 * Parse date string
			 * @param  {String|Date|Number} dateStr - date string, Date object or time
			 * value to parse
			 * @param  {String|Object} format - format string or object that contains
			 * toValue() custom parser, whose signature is
			 * - args:
			 *   - dateStr: {String|Date|Number} - the dateStr passed to the method
			 *   - format: {Object} - the format object passed to the method
			 *   - locale: {Object} - locale for the language specified by `lang`
			 * - return:
			 *     {Date|Number} parsed date or its time value
			 * @param  {String} [lang=en] - language code for the locale to use
			 * @return {Number} time value of parsed date
			 */
			static parseDate(dateStr, format, lang) {
				return parseDate(dateStr, format, (lang && base_locales[lang]) || base_locales.en);
			}

			/**
			 * @type {Object} - Installed locales in `[languageCode]: localeObject` format
			 * en`:_English (US)_ is pre-installed.
			 */
			static get locales() {
				return base_locales;
			}

			/**
			 * @type {Boolean} - Whether the picker element is shown. `true` whne shown
			 */
			get active() {
				return !!(this.picker && this.picker.active);
			}

			/**
			 * @type {HTMLDivElement} - DOM object of picker element
			 */
			get pickerElement() {
				return this.picker ? this.picker.element : undefined;
			}

			/**
			 * Set new values to the config options
			 * @param {Object} options - config options to update
			 */
			setOptions(options) {
				const newOptions = processOptions(options, this);
				Object.assign(this._options, options);
				Object.assign(this.config, newOptions);
				this.picker.setOptions(newOptions);

				refreshUI(this, 3);
			}

			/**
			 * Show the picker element
			 */
			show() {
				if (this.inputField) {
					const { config, inputField } = this;
					if (inputField.disabled || (inputField.readOnly && !config.enableOnReadonly)) {
						return;
					}
					if (!isActiveElement(inputField) && !config.disableTouchKeyboard) {
						this._showing = true;
						inputField.focus();
						delete this._showing;
					}
				}
				this.picker.show();
			}

			/**
			 * Hide the picker element
			 * Not available on inline picker
			 */
			hide() {
				if (!this.inputField) {
					return;
				}
				this.picker.hide();
				this.picker.update().changeView(this.config.startView).render();
			}

			/**
			 * Toggle the display of the picker element
			 * Not available on inline picker
			 *
			 * Unlike hide(), the picker does not return to the start view when hiding.
			 */
			toggle() {
				if (!this.picker.active) {
					this.show();
				} else if (this.inputField) {
					this.picker.hide();
				}
			}

			/**
			 * Destroy the Datepicker instance
			 * @return {Detepicker} - the instance destroyed
			 */
			destroy() {
				this.hide();
				event_unregisterListeners(this);
				this.picker.detach();
				const element = this.element;
				element.classList.remove("datepicker-input");
				delete element.datepicker;
				return this;
			}

			/**
			 * Get the selected date(s)
			 *
			 * The method returns a Date object of selected date by default, and returns
			 * an array of selected dates in multidate mode. If format string is passed,
			 * it returns date string(s) formatted in given format.
			 *
			 * @param  {String} [format] - format string to stringify the date(s)
			 * @return {Date|String|Date[]|String[]} - selected date(s), or if none is
			 * selected, empty array in multidate mode and undefined in sigledate mode
			 */
			getDate(format = undefined) {
				const callback = getOutputConverter(this, format);

				if (this.config.multidate) {
					return this.dates.map(callback);
				}
				if (this.dates.length > 0) {
					return callback(this.dates[0]);
				}
			}

			/**
			 * Set selected date(s)
			 *
			 * In multidate mode, you can pass multiple dates as a series of arguments
			 * or an array. (Since each date is parsed individually, the type of the
			 * dates doesn't have to be the same.)
			 * The given dates are used to toggle the select status of each date. The
			 * number of selected dates is kept from exceeding the length set to
			 * maxNumberOfDates.
			 *
			 * With clear: true option, the method can be used to clear the selection
			 * and to replace the selection instead of toggling in multidate mode.
			 * If the option is passed with no date arguments or an empty dates array,
			 * it works as "clear" (clear the selection then set nothing), and if the
			 * option is passed with new dates to select, it works as "replace" (clear
			 * the selection then set the given dates)
			 *
			 * When render: false option is used, the method omits re-rendering the
			 * picker element. In this case, you need to call refresh() method later in
			 * order for the picker element to reflect the changes. The input field is
			 * refreshed always regardless of this option.
			 *
			 * When invalid (unparsable, repeated, disabled or out-of-range) dates are
			 * passed, the method ignores them and applies only valid ones. In the case
			 * that all the given dates are invalid, which is distinguished from passing
			 * no dates, the method considers it as an error and leaves the selection
			 * untouched. (The input field also remains untouched unless revert: true
			 * option is used.)
			 * Replacing the selection with the same date(s) also causes a similar
			 * situation. In both cases, the method does not refresh the picker element
			 * unless forceRefresh: true option is used.
			 *
			 * If viewDate option is used, the method changes the focused date to the
			 * specified date instead of the last item of the selection.
			 *
			 * @param {...(Date|Number|String)|Array} [dates] - Date strings, Date
			 * objects, time values or mix of those for new selection
			 * @param {Object} [options] - function options
			 * - clear: {boolean} - Whether to clear the existing selection
			 *     defualt: false
			 * - render: {boolean} - Whether to re-render the picker element
			 *     default: true
			 * - autohide: {boolean} - Whether to hide the picker element after re-render
			 *     Ignored when used with render: false
			 *     default: config.autohide
			 * - revert: {boolean} - Whether to refresh the input field when all the
			 *     passed dates are invalid
			 *     default: false
			 * - forceRefresh: {boolean} - Whether to refresh the picker element when
			 *     passed dates don't change the existing selection
			 *     default: false
			 * - viewDate: {Date|Number|String} - Date to be focused after setiing date(s)
			 *     default: The last item of the resulting selection, or defaultViewDate
			 *     config option if none is selected
			 */
			setDate(...args) {
				const dates = [...args];
				const opts = {};
				const lastArg = lastItemOf(args);
				if (lastArg && typeof lastArg === "object" && !Array.isArray(lastArg) && !(lastArg instanceof Date)) {
					Object.assign(opts, dates.pop());
				}

				const inputDates = Array.isArray(dates[0]) ? dates[0] : dates;
				setDate(this, inputDates, opts);
			}

			/**
			 * Update the selected date(s) with input field's value
			 * Not available on inline picker
			 *
			 * The input field will be refreshed with properly formatted date string.
			 *
			 * In the case that all the entered dates are invalid (unparsable, repeated,
			 * disabled or out-of-range), which is distinguished from empty input field,
			 * the method leaves the input field untouched as well as the selection by
			 * default. If revert: true option is used in this case, the input field is
			 * refreshed with the existing selection.
			 * The method also doesn't refresh the picker element in this case and when
			 * the entered dates are the same as the existing selection. If
			 * forceRefresh: true option is used, the picker element is refreshed in
			 * these cases too.
			 *
			 * @param  {Object} [options] - function options
			 * - autohide: {boolean} - whether to hide the picker element after refresh
			 *     default: false
			 * - revert: {boolean} - Whether to refresh the input field when all the
			 *     passed dates are invalid
			 *     default: false
			 * - forceRefresh: {boolean} - Whether to refresh the picer element when
			 *     input field's value doesn't change the existing selection
			 *     default: false
			 */
			update(options = undefined) {
				if (!this.inputField) {
					return;
				}

				const opts = Object.assign(options || {}, { clear: true, render: true, viewDate: undefined });
				const inputDates = stringToArray(this.inputField.value, this.config.dateDelimiter);
				setDate(this, inputDates, opts);
			}

			/**
			 * Get the focused date
			 *
			 * The method returns a Date object of focused date by default. If format
			 * string is passed, it returns date string formatted in given format.
			 *
			 * @param  {String} [format] - format string to stringify the date
			 * @return {Date|String} - focused date (viewDate)
			 */
			getFocusedDate(format = undefined) {
				return getOutputConverter(this, format)(this.picker.viewDate);
			}

			/**
			 * Set focused date
			 *
			 * By default, the method updates the focus on the view shown at the time,
			 * or the one set to the startView config option if the picker is hidden.
			 * When resetView: true is passed, the view displayed is changed to the
			 * pickLevel config option's if the picker is shown.
			 *
			 * @param {Date|Number|String} viewDate - date string, Date object, time
			 * values of the date to focus
			 * @param {Boolean} [resetView] - whether to change the view to pickLevel
			 * config option's when the picker is shown. Ignored when the picker is
			 * hidden
			 */
			setFocusedDate(viewDate, resetView = false) {
				const { config, picker, active, rangeSideIndex } = this;
				const pickLevel = config.pickLevel;
				const newViewDate = parseDate(viewDate, config.format, config.locale);
				if (newViewDate === undefined) {
					return;
				}

				picker.changeFocus(regularizeDate(newViewDate, pickLevel, rangeSideIndex));
				if (active && resetView) {
					picker.changeView(pickLevel);
				}
				picker.render();
			}

			/**
			 * Refresh the picker element and the associated input field
			 * @param {String} [target] - target item when refreshing one item only
			 * 'picker' or 'input'
			 * @param {Boolean} [forceRender] - whether to re-render the picker element
			 * regardless of its state instead of optimized refresh
			 */
			refresh(target = undefined, forceRender = false) {
				if (target && typeof target !== "string") {
					forceRender = target;
					target = undefined;
				}

				let mode;
				if (target === "picker") {
					mode = 2;
				} else if (target === "input") {
					mode = 1;
				} else {
					mode = 3;
				}
				refreshUI(this, mode, !forceRender);
			}

			/**
			 * Enter edit mode
			 * Not available on inline picker or when the picker element is hidden
			 */
			enterEditMode() {
				const inputField = this.inputField;
				if (!inputField || inputField.readOnly || !this.picker.active || this.editMode) {
					return;
				}
				this.editMode = true;
				inputField.classList.add("in-edit");
			}

			/**
			 * Exit from edit mode
			 * Not available on inline picker
			 * @param  {Object} [options] - function options
			 * - update: {boolean} - whether to call update() after exiting
			 *     If false, input field is revert to the existing selection
			 *     default: false
			 */
			exitEditMode(options = undefined) {
				if (!this.inputField || !this.editMode) {
					return;
				}
				const opts = Object.assign({ update: false }, options);
				delete this.editMode;
				this.inputField.classList.remove("in-edit");
				if (opts.update) {
					this.update(opts);
				}
			}
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/DateRangePicker.js

		// filter out the config options inapproprite to pass to Datepicker
		function filterOptions(options) {
			const newOpts = Object.assign({}, options);

			delete newOpts.inputs;
			delete newOpts.allowOneSidedRange;
			delete newOpts.maxNumberOfDates; // to ensure each datepicker handles a single date

			return newOpts;
		}

		function setupDatepicker(rangepicker, changeDateListener, el, options) {
			registerListeners(rangepicker, [[el, "changeDate", changeDateListener]]);
			new Datepicker(el, options, rangepicker);
		}

		function onChangeDate(rangepicker, ev) {
			// to prevent both datepickers trigger the other side's update each other
			if (rangepicker._updating) {
				return;
			}
			rangepicker._updating = true;

			const target = ev.target;
			if (target.datepicker === undefined) {
				return;
			}

			const datepickers = rangepicker.datepickers;
			const [datepicker0, datepicker1] = datepickers;
			const setDateOptions = { render: false };
			const changedSide = rangepicker.inputs.indexOf(target);
			const otherSide = changedSide === 0 ? 1 : 0;
			const changedDate = datepickers[changedSide].dates[0];
			const otherDate = datepickers[otherSide].dates[0];

			if (changedDate !== undefined && otherDate !== undefined) {
				// if the start of the range > the end, swap them
				if (changedSide === 0 && changedDate > otherDate) {
					datepicker0.setDate(otherDate, setDateOptions);
					datepicker1.setDate(changedDate, setDateOptions);
				} else if (changedSide === 1 && changedDate < otherDate) {
					datepicker0.setDate(changedDate, setDateOptions);
					datepicker1.setDate(otherDate, setDateOptions);
				}
			} else if (!rangepicker.allowOneSidedRange) {
				// to prevent the range from becoming one-sided, copy changed side's
				// selection (no matter if it's empty) to the other side
				if (changedDate !== undefined || otherDate !== undefined) {
					setDateOptions.clear = true;
					datepickers[otherSide].setDate(datepickers[changedSide].dates, setDateOptions);
				}
			}
			datepickers.forEach((datepicker) => {
				datepicker.picker.update().render();
			});
			delete rangepicker._updating;
		}

		/**
		 * Class representing a date range picker
		 */
		class DateRangePicker {
			/**
			 * Create a date range picker
			 * @param  {Element} element - element to bind a date range picker
			 * @param  {Object} [options] - config options
			 */
			constructor(element, options = {}) {
				let inputs = Array.isArray(options.inputs)
					? options.inputs
					: Array.from(element.querySelectorAll("input"));
				if (inputs.length < 2) {
					return;
				}

				element.rangepicker = this;
				this.element = element;
				this.inputs = inputs = inputs.slice(0, 2);
				Object.freeze(inputs);
				this.allowOneSidedRange = !!options.allowOneSidedRange;

				const changeDateListener = onChangeDate.bind(null, this);
				const cleanOptions = filterOptions(options);
				// in order for initial date setup to work right when pcicLvel > 0,
				// let Datepicker constructor add the instance to the rangepicker
				const datepickers = (this.datepickers = []);
				inputs.forEach((input) => {
					setupDatepicker(this, changeDateListener, input, cleanOptions);
				});
				Object.freeze(datepickers);
				Object.defineProperty(this, "dates", {
					get() {
						return datepickers.map((datepicker) => datepicker.dates[0]);
					},
				});
				// normalize the range if inital dates are given
				if (datepickers[0].dates.length > 0) {
					onChangeDate(this, { target: inputs[0] });
				} else if (datepickers[1].dates.length > 0) {
					onChangeDate(this, { target: inputs[1] });
				}
			}

			/**
			 * Set new values to the config options
			 * @param {Object} options - config options to update
			 */
			setOptions(options) {
				this.allowOneSidedRange = !!options.allowOneSidedRange;

				const cleanOptions = filterOptions(options);
				this.datepickers.forEach((datepicker) => {
					datepicker.setOptions(cleanOptions);
				});
			}

			/**
			 * Destroy the DateRangePicker instance
			 * @return {DateRangePicker} - the instance destroyed
			 */
			destroy() {
				this.datepickers.forEach((datepicker) => {
					datepicker.destroy();
				});
				unregisterListeners(this);
				delete this.element.rangepicker;
			}

			/**
			 * Get the start and end dates of the date range
			 *
			 * The method returns Date objects by default. If format string is passed,
			 * it returns date strings formatted in given format.
			 * The result array always contains 2 items (start date/end date) and
			 * undefined is used for unselected side. (e.g. If none is selected,
			 * the result will be [undefined, undefined]. If only the end date is set
			 * when allowOneSidedRange config option is true, [undefined, endDate] will
			 * be returned.)
			 *
			 * @param  {String} [format] - Format string to stringify the dates
			 * @return {Array} - Start and end dates
			 */
			getDates(format = undefined) {
				const callback = format
					? (date) => formatDate(date, format, this.datepickers[0].config.locale)
					: (date) => new Date(date);

				return this.dates.map((date) => (date === undefined ? date : callback(date)));
			}

			/**
			 * Set the start and end dates of the date range
			 *
			 * The method calls datepicker.setDate() internally using each of the
			 * arguments in start→end order.
			 *
			 * When a clear: true option object is passed instead of a date, the method
			 * clears the date.
			 *
			 * If an invalid date, the same date as the current one or an option object
			 * without clear: true is passed, the method considers that argument as an
			 * "ineffective" argument because calling datepicker.setDate() with those
			 * values makes no changes to the date selection.
			 *
			 * When the allowOneSidedRange config option is false, passing {clear: true}
			 * to clear the range works only when it is done to the last effective
			 * argument (in other words, passed to rangeEnd or to rangeStart along with
			 * ineffective rangeEnd). This is because when the date range is changed,
			 * it gets normalized based on the last change at the end of the changing
			 * process.
			 *
			 * @param {Date|Number|String|Object} rangeStart - Start date of the range
			 * or {clear: true} to clear the date
			 * @param {Date|Number|String|Object} rangeEnd - End date of the range
			 * or {clear: true} to clear the date
			 */
			setDates(rangeStart, rangeEnd) {
				const {
					datepickers: [datepicker0, datepicker1],
					inputs: [input0, input1],
					dates: [origDate0, origDate1],
				} = this;

				// If range normalization runs on every change, we can't set a new range
				// that starts after the end of the current range correctly because the
				// normalization process swaps start↔︎end right after setting the new start
				// date. To prevent this, the normalization process needs to run once after
				// both of the new dates are set.
				this._updating = true;
				datepicker0.setDate(rangeStart);
				datepicker1.setDate(rangeEnd);
				delete this._updating;

				if (datepicker1.dates[0] !== origDate1) {
					onChangeDate(this, { target: input1 });
				} else if (datepicker0.dates[0] !== origDate0) {
					onChangeDate(this, { target: input0 });
				}
			}
		} // CONCATENATED MODULE: ./node_modules/vanillajs-datepicker/js/main.js // CONCATENATED MODULE: ./src/js/components/menu.js

		// datepicker global settings
		(function () {
			Datepicker_Datepicker.locales.en = {
				days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
				daysShort: ["Вск", "Пон", "Втр", "Ср", "Чт", "Птн", "Сбт"],
				daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
				months: [
					"Январь",
					"Февраль",
					"Март",
					"Апрель",
					"Май",
					"Июнь",
					"Июль",
					"Август",
					"Сентябрь",
					"Октябрь",
					"Ноябрь",
					"Декабрь",
				],
				monthsShort: [
					"Январь",
					"Февраль",
					"Март",
					"Апрель",
					"Май",
					"Июнь",
					"Июль",
					"Август",
					"Сентябрь",
					"Октябрь",
					"Ноябрь",
					"Декабрь",
				],
				today: "Сегодня",
				clear: "Очистить",
				titleFormat: "MM yy",
				format: "dd.mm.yyyy",
				weekStart: 0,
			};
		})();
		const dateInput = document.querySelector(".menu__input-date");
		const datePicker = new Datepicker_Datepicker(dateInput, {
			format: "dd.mm.yyyy",
			pickLevel: 1,
		});
		const navButton = document.querySelector(".menu__button-nav");
		const navList = document.querySelector(".menu__list");
		if (navButton && navList) {
			navButton.addEventListener("click", (e) => {
				e.stopPropagation();
				navList.classList.toggle("menu__list-visible");
			});
		}
		document.addEventListener("click", () => {
			if (navList) {
				navList.classList.remove("menu__list-visible");
			}
		}); // CONCATENATED MODULE: ./src/js/_components.js // CONCATENATED MODULE: ./src/js/main.js
	})();

	/******/
})();
