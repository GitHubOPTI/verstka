(() => {
	var e = {
			595: () => {
				document.querySelectorAll(".accordion").forEach((e) => {
					e.addEventListener("click", (e) => {
						const t = e.currentTarget,
							s = t.querySelector(".accordion__control"),
							i = t.querySelector(".accordion__content"),
							a = t.querySelector(".accordion__icon-arrow");
						t.classList.toggle("accordion-open"),
							t.classList.contains("docs-hero__item")
								? i.classList.toggle(
										"accordion__content-open-docs"
								  )
								: i.classList.toggle("accordion__content-open"),
							a.classList.toggle(
								"accordion__icon-arrow-reversed"
							),
							t.classList.contains("accordion-open")
								? (s.setAttribute("aria-expanded", !0),
								  i.setAttribute("aria-hidden", !1),
								  (i.style.maxHeight = i.scrollHeight + "px"))
								: (s.setAttribute("aria-expanded", !1),
								  i.setAttribute("aria-hidden", !0),
								  (i.style.maxHeight = null));
					});
				});
			},
			661: () => {
				document
					.querySelectorAll(".cabinet-hero__label-change")
					.forEach((e) => {
						e.addEventListener("click", () => {
							(input = document.getElementById(
								e.getAttribute("for")
							)),
								"disabled" !== input.getAttribute("disabled")
									? (console.log(input.value),
									  input.setAttribute(
											"disabled",
											"disabled"
									  ),
									  e.classList.remove(
											"cabinet-hero__label-change-active"
									  ))
									: (input.removeAttribute("disabled"),
									  e.classList.add(
											"cabinet-hero__label-change-active"
									  ));
						});
					}),
					document
						.querySelectorAll(".cabinet-hero__button-change")
						.forEach((e) => {
							e.addEventListener("click", () => {
								(currentSection = document.querySelector(
									".cabinet-hero__frame-visible"
								)),
									(targetSection = document.getElementById(
										e.getAttribute("data-frame")
									)),
									currentSection !== targetSection &&
										(currentSection.classList.toggle(
											"cabinet-hero__frame-visible"
										),
										targetSection.classList.toggle(
											"cabinet-hero__frame-visible"
										));
							});
						});
			},
			472: () => {
				const e = document.querySelectorAll(
						".catalog-hero__container-visible .catalog-hero__container-image"
					),
					t = document.querySelector(
						".catalog-hero__container-hidden"
					),
					s = document.querySelector(
						".catalog-hero__container-visible"
					);
				null !== e &&
					null !== t &&
					null !== s &&
					e.forEach((e) => {
						e.addEventListener("click", () => {
							const i = e.getAttribute("data-category");
							document
								.getElementById(i)
								.classList.add(
									"catalog-hero__container-category-first"
								),
								t.classList.remove(
									"catalog-hero__container-hidden"
								),
								s.classList.add(
									"catalog-hero__container-hidden"
								),
								document
									.querySelector(".header")
									.scrollIntoView({
										behavior: "smooth",
										block: "start",
									});
						});
					});
			},
			27: () => {
				ymaps.ready(function () {
					if (null !== document.getElementById("contacts-map"))
						myMap = new ymaps.Map("contacts-map", {
							center: [55.05386257036589, 61.45853671216136],
							zoom: 9,
						});
					else {
						if (null === document.getElementById("main-map"))
							return;
						myMap = new ymaps.Map("main-map", {
							center: [55.05386257036589, 61.45853671216136],
							zoom: 9,
						});
					}
					const e = new ymaps.GeoObject({
							geometry: {
								type: "Point",
								coordinates: [
									55.154938569541265, 61.31335099999995,
								],
							},
						}),
						t = new ymaps.GeoObject({
							geometry: {
								type: "Point",
								coordinates: [
									54.86839356980941, 61.40452099999999,
								],
							},
						});
					myMap.geoObjects.add(e).add(t);
				});
			},
			617: () => {
				const e = document.getElementById("burger"),
					t = document.querySelector(".menu__bg");
				null !== e &&
					null !== t &&
					e.addEventListener("click", () => {
						t.classList.toggle("menu__bg-active"),
							e.classList.toggle("burger--active");
					});
			},
			774: () => {
				const e = document.querySelector(".main-feedback__button-more"),
					t = document.querySelectorAll(".main-feedback__slide");
				null !== e &&
					e.addEventListener("click", () => {
						t.forEach((e) => {
							e.classList.add("main-feedback__slide-visible-480");
						}),
							(e.style.display = "none");
					});
			},
			848: () => {
				document
					.querySelectorAll(".main-design__container-row")
					.forEach((e) => {
						const t = e.querySelectorAll(".main-design__label");
						t.forEach((e) => {
							(input = e.querySelector(".main-design__input")),
								input.addEventListener("change", () => {
									t.forEach((e) => {
										e.classList.remove(
											"main-design__label-active"
										);
									}),
										e.classList.add(
											"main-design__label-active"
										);
								});
						});
					});
			},
			986: () => {
				const e = document.querySelector(".search"),
					t = document.querySelectorAll(".search-icon"),
					s = document.querySelector(".search__content"),
					i = document.getElementById("burger"),
					a = document.querySelector(".menu__bg");
				null !== t &&
					null !== e &&
					null !== s &&
					(t.forEach((t) => {
						t.addEventListener("click", () => {
							e.classList.contains("search-visible")
								? e.classList.remove("search-visible")
								: (null !== i &&
										null !== a &&
										(a.classList.remove("menu__bg-active"),
										i.classList.remove("burger--active")),
								  setTimeout(() => {
										e.classList.add("search-visible");
								  }, 300));
						});
					}),
					e.addEventListener("click", () => {
						e.classList.remove("search-visible");
					}),
					s.addEventListener("click", (e) => {
						e.stopPropagation();
					}));
				const n = document.querySelector(".search__container"),
					r = document.querySelector(".header");
				null !== n &&
					null !== r &&
					(n.style.marginTop = r.offsetHeight + "px");
			},
			290: () => {
				const e = document.querySelector(".up-button__button");
				null !== e &&
					e.addEventListener("click", () => {
						document
							.querySelector(".header")
							.scrollIntoView({
								behavior: "smooth",
								block: "start",
							});
					});
			},
			578: () => {
				document
					.querySelectorAll(".main-feedback__container-video")
					.forEach((e) => {
						const t = e.querySelector(".main-feedback__video");
						let s = 0;
						const i = e.querySelector(
							".main-feedback__button-fullscreen"
						);
						null !== i &&
							i.addEventListener("click", (e) => {
								e.stopPropagation(),
									t.requestFullscreen
										? t.requestFullscreen()
										: t.mozRequestFullScreen
										? t.mozRequestFullScreen()
										: t.webkitRequestFullscreen &&
										  t.webkitRequestFullscreen();
							}),
							t.addEventListener("fullscreenchange", () => {
								s++,
									s > 1 &&
										((s = 0),
										t.load(),
										e.classList.remove(
											"main-feedback__container-video-active"
										));
							}),
							e.addEventListener("click", () => {
								e.classList.contains(
									"main-feedback__container-video-active"
								)
									? (e.classList.remove(
											"main-feedback__container-video-active"
									  ),
									  t.pause(),
									  0 == s && t.load())
									: (t.play(),
									  e.classList.add(
											"main-feedback__container-video-active"
									  ));
							});
					});
			},
		},
		t = {};
	function s(i) {
		var a = t[i];
		if (void 0 !== a) return a.exports;
		var n = (t[i] = { exports: {} });
		return e[i](n, n.exports, s), n.exports;
	}
	(() => {
		"use strict";
		const e = {
			windowEl: window,
			documentEl: document,
			htmlEl: document.documentElement,
			bodyEl: document.body,
		};
		function t(e) {
			return (
				null !== e &&
				"object" == typeof e &&
				"constructor" in e &&
				e.constructor === Object
			);
		}
		function i(e = {}, s = {}) {
			Object.keys(s).forEach((a) => {
				void 0 === e[a]
					? (e[a] = s[a])
					: t(s[a]) &&
					  t(e[a]) &&
					  Object.keys(s[a]).length > 0 &&
					  i(e[a], s[a]);
			});
		}
		s(595), s(848);
		const a = {
			body: {},
			addEventListener() {},
			removeEventListener() {},
			activeElement: { blur() {}, nodeName: "" },
			querySelector: () => null,
			querySelectorAll: () => [],
			getElementById: () => null,
			createEvent: () => ({ initEvent() {} }),
			createElement: () => ({
				children: [],
				childNodes: [],
				style: {},
				setAttribute() {},
				getElementsByTagName: () => [],
			}),
			createElementNS: () => ({}),
			importNode: () => null,
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
		function n() {
			const e = "undefined" != typeof document ? document : {};
			return i(e, a), e;
		}
		const r = {
			document: a,
			navigator: { userAgent: "" },
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
			history: { replaceState() {}, pushState() {}, go() {}, back() {} },
			CustomEvent: function () {
				return this;
			},
			addEventListener() {},
			removeEventListener() {},
			getComputedStyle: () => ({ getPropertyValue: () => "" }),
			Image() {},
			Date() {},
			screen: {},
			setTimeout() {},
			clearTimeout() {},
			matchMedia: () => ({}),
			requestAnimationFrame: (e) =>
				"undefined" == typeof setTimeout
					? (e(), null)
					: setTimeout(e, 0),
			cancelAnimationFrame(e) {
				"undefined" != typeof setTimeout && clearTimeout(e);
			},
		};
		function l() {
			const e = "undefined" != typeof window ? window : {};
			return i(e, r), e;
		}
		function o(e, t = 0) {
			return setTimeout(e, t);
		}
		function d() {
			return Date.now();
		}
		function c(e) {
			return (
				"object" == typeof e &&
				null !== e &&
				e.constructor &&
				"Object" === Object.prototype.toString.call(e).slice(8, -1)
			);
		}
		function p(...e) {
			const t = Object(e[0]),
				s = ["__proto__", "constructor", "prototype"];
			for (let a = 1; a < e.length; a += 1) {
				const n = e[a];
				if (
					null != n &&
					((i = n),
					!("undefined" != typeof window &&
					void 0 !== window.HTMLElement
						? i instanceof HTMLElement
						: i && (1 === i.nodeType || 11 === i.nodeType)))
				) {
					const e = Object.keys(Object(n)).filter(
						(e) => s.indexOf(e) < 0
					);
					for (let s = 0, i = e.length; s < i; s += 1) {
						const i = e[s],
							a = Object.getOwnPropertyDescriptor(n, i);
						void 0 !== a &&
							a.enumerable &&
							(c(t[i]) && c(n[i])
								? n[i].__swiper__
									? (t[i] = n[i])
									: p(t[i], n[i])
								: !c(t[i]) && c(n[i])
								? ((t[i] = {}),
								  n[i].__swiper__
										? (t[i] = n[i])
										: p(t[i], n[i]))
								: (t[i] = n[i]));
					}
				}
			}
			var i;
			return t;
		}
		function u(e, t, s) {
			e.style.setProperty(t, s);
		}
		function m({ swiper: e, targetPosition: t, side: s }) {
			const i = l(),
				a = -e.translate;
			let n,
				r = null;
			const o = e.params.speed;
			(e.wrapperEl.style.scrollSnapType = "none"),
				i.cancelAnimationFrame(e.cssModeFrameID);
			const d = t > a ? "next" : "prev",
				c = (e, t) =>
					("next" === d && e >= t) || ("prev" === d && e <= t),
				p = () => {
					(n = new Date().getTime()), null === r && (r = n);
					const l = Math.max(Math.min((n - r) / o, 1), 0),
						d = 0.5 - Math.cos(l * Math.PI) / 2;
					let u = a + d * (t - a);
					if (
						(c(u, t) && (u = t),
						e.wrapperEl.scrollTo({ [s]: u }),
						c(u, t))
					)
						return (
							(e.wrapperEl.style.overflow = "hidden"),
							(e.wrapperEl.style.scrollSnapType = ""),
							setTimeout(() => {
								(e.wrapperEl.style.overflow = ""),
									e.wrapperEl.scrollTo({ [s]: u });
							}),
							void i.cancelAnimationFrame(e.cssModeFrameID)
						);
					e.cssModeFrameID = i.requestAnimationFrame(p);
				};
			p();
		}
		function h(e) {
			return (
				e.querySelector(".swiper-slide-transform") ||
				(e.shadowEl &&
					e.shadowEl.querySelector(".swiper-slide-transform")) ||
				e
			);
		}
		function f(e, t = "") {
			return [...e.children].filter((e) => e.matches(t));
		}
		function g(e, t = []) {
			const s = document.createElement(e);
			return s.classList.add(...(Array.isArray(t) ? t : [t])), s;
		}
		function v(e, t) {
			return l().getComputedStyle(e, null).getPropertyValue(t);
		}
		function b(e) {
			let t,
				s = e;
			if (s) {
				for (t = 0; null !== (s = s.previousSibling); )
					1 === s.nodeType && (t += 1);
				return t;
			}
		}
		function w(e, t) {
			const s = [];
			let i = e.parentElement;
			for (; i; )
				t ? i.matches(t) && s.push(i) : s.push(i),
					(i = i.parentElement);
			return s;
		}
		function y(e, t, s) {
			const i = l();
			return s
				? e["width" === t ? "offsetWidth" : "offsetHeight"] +
						parseFloat(
							i
								.getComputedStyle(e, null)
								.getPropertyValue(
									"width" === t
										? "margin-right"
										: "margin-top"
								)
						) +
						parseFloat(
							i
								.getComputedStyle(e, null)
								.getPropertyValue(
									"width" === t
										? "margin-left"
										: "margin-bottom"
								)
						)
				: e.offsetWidth;
		}
		let S, E, T;
		function x() {
			return (
				S ||
					(S = (function () {
						const e = l(),
							t = n();
						return {
							smoothScroll:
								t.documentElement &&
								"scrollBehavior" in t.documentElement.style,
							touch: !!(
								"ontouchstart" in e ||
								(e.DocumentTouch &&
									t instanceof e.DocumentTouch)
							),
						};
					})()),
				S
			);
		}
		const C = {
				on(e, t, s) {
					const i = this;
					if (!i.eventsListeners || i.destroyed) return i;
					if ("function" != typeof t) return i;
					const a = s ? "unshift" : "push";
					return (
						e.split(" ").forEach((e) => {
							i.eventsListeners[e] || (i.eventsListeners[e] = []),
								i.eventsListeners[e][a](t);
						}),
						i
					);
				},
				once(e, t, s) {
					const i = this;
					if (!i.eventsListeners || i.destroyed) return i;
					if ("function" != typeof t) return i;
					function a(...s) {
						i.off(e, a),
							a.__emitterProxy && delete a.__emitterProxy,
							t.apply(i, s);
					}
					return (a.__emitterProxy = t), i.on(e, a, s);
				},
				onAny(e, t) {
					const s = this;
					if (!s.eventsListeners || s.destroyed) return s;
					if ("function" != typeof e) return s;
					const i = t ? "unshift" : "push";
					return (
						s.eventsAnyListeners.indexOf(e) < 0 &&
							s.eventsAnyListeners[i](e),
						s
					);
				},
				offAny(e) {
					const t = this;
					if (!t.eventsListeners || t.destroyed) return t;
					if (!t.eventsAnyListeners) return t;
					const s = t.eventsAnyListeners.indexOf(e);
					return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
				},
				off(e, t) {
					const s = this;
					return !s.eventsListeners || s.destroyed
						? s
						: s.eventsListeners
						? (e.split(" ").forEach((e) => {
								void 0 === t
									? (s.eventsListeners[e] = [])
									: s.eventsListeners[e] &&
									  s.eventsListeners[e].forEach((i, a) => {
											(i === t ||
												(i.__emitterProxy &&
													i.__emitterProxy === t)) &&
												s.eventsListeners[e].splice(
													a,
													1
												);
									  });
						  }),
						  s)
						: s;
				},
				emit(...e) {
					const t = this;
					if (!t.eventsListeners || t.destroyed) return t;
					if (!t.eventsListeners) return t;
					let s, i, a;
					return (
						"string" == typeof e[0] || Array.isArray(e[0])
							? ((s = e[0]), (i = e.slice(1, e.length)), (a = t))
							: ((s = e[0].events),
							  (i = e[0].data),
							  (a = e[0].context || t)),
						i.unshift(a),
						(Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
							t.eventsAnyListeners &&
								t.eventsAnyListeners.length &&
								t.eventsAnyListeners.forEach((t) => {
									t.apply(a, [e, ...i]);
								}),
								t.eventsListeners &&
									t.eventsListeners[e] &&
									t.eventsListeners[e].forEach((e) => {
										e.apply(a, i);
									});
						}),
						t
					);
				},
			},
			L = {
				updateSize: function () {
					const e = this;
					let t, s;
					const i = e.el;
					(t =
						void 0 !== e.params.width && null !== e.params.width
							? e.params.width
							: i.clientWidth),
						(s =
							void 0 !== e.params.height &&
							null !== e.params.height
								? e.params.height
								: i.clientHeight),
						(0 === t && e.isHorizontal()) ||
							(0 === s && e.isVertical()) ||
							((t =
								t -
								parseInt(v(i, "padding-left") || 0, 10) -
								parseInt(v(i, "padding-right") || 0, 10)),
							(s =
								s -
								parseInt(v(i, "padding-top") || 0, 10) -
								parseInt(v(i, "padding-bottom") || 0, 10)),
							Number.isNaN(t) && (t = 0),
							Number.isNaN(s) && (s = 0),
							Object.assign(e, {
								width: t,
								height: s,
								size: e.isHorizontal() ? t : s,
							}));
				},
				updateSlides: function () {
					const e = this;
					function t(t) {
						return e.isHorizontal()
							? t
							: {
									width: "height",
									"margin-top": "margin-left",
									"margin-bottom ": "margin-right",
									"margin-left": "margin-top",
									"margin-right": "margin-bottom",
									"padding-left": "padding-top",
									"padding-right": "padding-bottom",
									marginRight: "marginBottom",
							  }[t];
					}
					function s(e, s) {
						return parseFloat(e.getPropertyValue(t(s)) || 0);
					}
					const i = e.params,
						{
							wrapperEl: a,
							slidesEl: n,
							size: r,
							rtlTranslate: l,
							wrongRTL: o,
						} = e,
						d = e.virtual && i.virtual.enabled,
						c = d ? e.virtual.slides.length : e.slides.length,
						p = f(n, `.${e.params.slideClass}, swiper-slide`),
						m = d ? e.virtual.slides.length : p.length;
					let h = [];
					const g = [],
						b = [];
					let w = i.slidesOffsetBefore;
					"function" == typeof w &&
						(w = i.slidesOffsetBefore.call(e));
					let S = i.slidesOffsetAfter;
					"function" == typeof S && (S = i.slidesOffsetAfter.call(e));
					const E = e.snapGrid.length,
						T = e.slidesGrid.length;
					let x = i.spaceBetween,
						C = -w,
						L = 0,
						_ = 0;
					if (void 0 === r) return;
					"string" == typeof x &&
						x.indexOf("%") >= 0 &&
						(x = (parseFloat(x.replace("%", "")) / 100) * r),
						(e.virtualSize = -x),
						p.forEach((e) => {
							l
								? (e.style.marginLeft = "")
								: (e.style.marginRight = ""),
								(e.style.marginBottom = ""),
								(e.style.marginTop = "");
						}),
						i.centeredSlides &&
							i.cssMode &&
							(u(a, "--swiper-centered-offset-before", ""),
							u(a, "--swiper-centered-offset-after", ""));
					const M = i.grid && i.grid.rows > 1 && e.grid;
					let P;
					M && e.grid.initSlides(m);
					const k =
						"auto" === i.slidesPerView &&
						i.breakpoints &&
						Object.keys(i.breakpoints).filter(
							(e) => void 0 !== i.breakpoints[e].slidesPerView
						).length > 0;
					for (let a = 0; a < m; a += 1) {
						let n;
						if (
							((P = 0),
							p[a] && (n = p[a]),
							M && e.grid.updateSlide(a, n, m, t),
							!p[a] || "none" !== v(n, "display"))
						) {
							if ("auto" === i.slidesPerView) {
								k && (p[a].style[t("width")] = "");
								const r = getComputedStyle(n),
									l = n.style.transform,
									o = n.style.webkitTransform;
								if (
									(l && (n.style.transform = "none"),
									o && (n.style.webkitTransform = "none"),
									i.roundLengths)
								)
									P = e.isHorizontal()
										? y(n, "width", !0)
										: y(n, "height", !0);
								else {
									const e = s(r, "width"),
										t = s(r, "padding-left"),
										i = s(r, "padding-right"),
										a = s(r, "margin-left"),
										l = s(r, "margin-right"),
										o = r.getPropertyValue("box-sizing");
									if (o && "border-box" === o) P = e + a + l;
									else {
										const {
											clientWidth: s,
											offsetWidth: r,
										} = n;
										P = e + t + i + a + l + (r - s);
									}
								}
								l && (n.style.transform = l),
									o && (n.style.webkitTransform = o),
									i.roundLengths && (P = Math.floor(P));
							} else
								(P =
									(r - (i.slidesPerView - 1) * x) /
									i.slidesPerView),
									i.roundLengths && (P = Math.floor(P)),
									p[a] && (p[a].style[t("width")] = `${P}px`);
							p[a] && (p[a].swiperSlideSize = P),
								b.push(P),
								i.centeredSlides
									? ((C = C + P / 2 + L / 2 + x),
									  0 === L && 0 !== a && (C = C - r / 2 - x),
									  0 === a && (C = C - r / 2 - x),
									  Math.abs(C) < 0.001 && (C = 0),
									  i.roundLengths && (C = Math.floor(C)),
									  _ % i.slidesPerGroup == 0 && h.push(C),
									  g.push(C))
									: (i.roundLengths && (C = Math.floor(C)),
									  (_ -
											Math.min(
												e.params.slidesPerGroupSkip,
												_
											)) %
											e.params.slidesPerGroup ==
											0 && h.push(C),
									  g.push(C),
									  (C = C + P + x)),
								(e.virtualSize += P + x),
								(L = P),
								(_ += 1);
						}
					}
					if (
						((e.virtualSize = Math.max(e.virtualSize, r) + S),
						l &&
							o &&
							("slide" === i.effect ||
								"coverflow" === i.effect) &&
							(a.style.width = `${
								e.virtualSize + i.spaceBetween
							}px`),
						i.setWrapperSize &&
							(a.style[t("width")] = `${
								e.virtualSize + i.spaceBetween
							}px`),
						M && e.grid.updateWrapperSize(P, h, t),
						!i.centeredSlides)
					) {
						const t = [];
						for (let s = 0; s < h.length; s += 1) {
							let a = h[s];
							i.roundLengths && (a = Math.floor(a)),
								h[s] <= e.virtualSize - r && t.push(a);
						}
						(h = t),
							Math.floor(e.virtualSize - r) -
								Math.floor(h[h.length - 1]) >
								1 && h.push(e.virtualSize - r);
					}
					if (d && i.loop) {
						const t = b[0] + x;
						if (i.slidesPerGroup > 1) {
							const s = Math.ceil(
									(e.virtual.slidesBefore +
										e.virtual.slidesAfter) /
										i.slidesPerGroup
								),
								a = t * i.slidesPerGroup;
							for (let e = 0; e < s; e += 1)
								h.push(h[h.length - 1] + a);
						}
						for (
							let s = 0;
							s < e.virtual.slidesBefore + e.virtual.slidesAfter;
							s += 1
						)
							1 === i.slidesPerGroup &&
								h.push(h[h.length - 1] + t),
								g.push(g[g.length - 1] + t),
								(e.virtualSize += t);
					}
					if ((0 === h.length && (h = [0]), 0 !== i.spaceBetween)) {
						const s =
							e.isHorizontal() && l
								? "marginLeft"
								: t("marginRight");
						p.filter(
							(e, t) =>
								!(i.cssMode && !i.loop) || t !== p.length - 1
						).forEach((e) => {
							e.style[s] = `${x}px`;
						});
					}
					if (i.centeredSlides && i.centeredSlidesBounds) {
						let e = 0;
						b.forEach((t) => {
							e += t + (i.spaceBetween ? i.spaceBetween : 0);
						}),
							(e -= i.spaceBetween);
						const t = e - r;
						h = h.map((e) => (e < 0 ? -w : e > t ? t + S : e));
					}
					if (i.centerInsufficientSlides) {
						let e = 0;
						if (
							(b.forEach((t) => {
								e += t + (i.spaceBetween ? i.spaceBetween : 0);
							}),
							(e -= i.spaceBetween),
							e < r)
						) {
							const t = (r - e) / 2;
							h.forEach((e, s) => {
								h[s] = e - t;
							}),
								g.forEach((e, s) => {
									g[s] = e + t;
								});
						}
					}
					if (
						(Object.assign(e, {
							slides: p,
							snapGrid: h,
							slidesGrid: g,
							slidesSizesGrid: b,
						}),
						i.centeredSlides &&
							i.cssMode &&
							!i.centeredSlidesBounds)
					) {
						u(a, "--swiper-centered-offset-before", -h[0] + "px"),
							u(
								a,
								"--swiper-centered-offset-after",
								e.size / 2 - b[b.length - 1] / 2 + "px"
							);
						const t = -e.snapGrid[0],
							s = -e.slidesGrid[0];
						(e.snapGrid = e.snapGrid.map((e) => e + t)),
							(e.slidesGrid = e.slidesGrid.map((e) => e + s));
					}
					if (
						(m !== c && e.emit("slidesLengthChange"),
						h.length !== E &&
							(e.params.watchOverflow && e.checkOverflow(),
							e.emit("snapGridLengthChange")),
						g.length !== T && e.emit("slidesGridLengthChange"),
						i.watchSlidesProgress && e.updateSlidesOffset(),
						!(
							d ||
							i.cssMode ||
							("slide" !== i.effect && "fade" !== i.effect)
						))
					) {
						const t = `${i.containerModifierClass}backface-hidden`,
							s = e.el.classList.contains(t);
						m <= i.maxBackfaceHiddenSlides
							? s || e.el.classList.add(t)
							: s && e.el.classList.remove(t);
					}
				},
				updateAutoHeight: function (e) {
					const t = this,
						s = [],
						i = t.virtual && t.params.virtual.enabled;
					let a,
						n = 0;
					"number" == typeof e
						? t.setTransition(e)
						: !0 === e && t.setTransition(t.params.speed);
					const r = (e) =>
						i ? t.getSlideIndexByData(e) : t.slides[e];
					if (
						"auto" !== t.params.slidesPerView &&
						t.params.slidesPerView > 1
					)
						if (t.params.centeredSlides)
							(t.visibleSlides || []).forEach((e) => {
								s.push(e);
							});
						else
							for (
								a = 0;
								a < Math.ceil(t.params.slidesPerView);
								a += 1
							) {
								const e = t.activeIndex + a;
								if (e > t.slides.length && !i) break;
								s.push(r(e));
							}
					else s.push(r(t.activeIndex));
					for (a = 0; a < s.length; a += 1)
						if (void 0 !== s[a]) {
							const e = s[a].offsetHeight;
							n = e > n ? e : n;
						}
					(n || 0 === n) && (t.wrapperEl.style.height = `${n}px`);
				},
				updateSlidesOffset: function () {
					const e = this,
						t = e.slides,
						s = e.isElement
							? e.isHorizontal()
								? e.wrapperEl.offsetLeft
								: e.wrapperEl.offsetTop
							: 0;
					for (let i = 0; i < t.length; i += 1)
						t[i].swiperSlideOffset =
							(e.isHorizontal()
								? t[i].offsetLeft
								: t[i].offsetTop) - s;
				},
				updateSlidesProgress: function (
					e = (this && this.translate) || 0
				) {
					const t = this,
						s = t.params,
						{ slides: i, rtlTranslate: a, snapGrid: n } = t;
					if (0 === i.length) return;
					void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
					let r = -e;
					a && (r = e),
						i.forEach((e) => {
							e.classList.remove(s.slideVisibleClass);
						}),
						(t.visibleSlidesIndexes = []),
						(t.visibleSlides = []);
					for (let e = 0; e < i.length; e += 1) {
						const l = i[e];
						let o = l.swiperSlideOffset;
						s.cssMode &&
							s.centeredSlides &&
							(o -= i[0].swiperSlideOffset);
						const d =
								(r +
									(s.centeredSlides ? t.minTranslate() : 0) -
									o) /
								(l.swiperSlideSize + s.spaceBetween),
							c =
								(r -
									n[0] +
									(s.centeredSlides ? t.minTranslate() : 0) -
									o) /
								(l.swiperSlideSize + s.spaceBetween),
							p = -(r - o),
							u = p + t.slidesSizesGrid[e];
						((p >= 0 && p < t.size - 1) ||
							(u > 1 && u <= t.size) ||
							(p <= 0 && u >= t.size)) &&
							(t.visibleSlides.push(l),
							t.visibleSlidesIndexes.push(e),
							i[e].classList.add(s.slideVisibleClass)),
							(l.progress = a ? -d : d),
							(l.originalProgress = a ? -c : c);
					}
				},
				updateProgress: function (e) {
					const t = this;
					if (void 0 === e) {
						const s = t.rtlTranslate ? -1 : 1;
						e = (t && t.translate && t.translate * s) || 0;
					}
					const s = t.params,
						i = t.maxTranslate() - t.minTranslate();
					let {
						progress: a,
						isBeginning: n,
						isEnd: r,
						progressLoop: l,
					} = t;
					const o = n,
						d = r;
					if (0 === i) (a = 0), (n = !0), (r = !0);
					else {
						a = (e - t.minTranslate()) / i;
						const s = Math.abs(e - t.minTranslate()) < 1,
							l = Math.abs(e - t.maxTranslate()) < 1;
						(n = s || a <= 0),
							(r = l || a >= 1),
							s && (a = 0),
							l && (a = 1);
					}
					if (s.loop) {
						const s = t.getSlideIndexByData(0),
							i = t.getSlideIndexByData(t.slides.length - 1),
							a = t.slidesGrid[s],
							n = t.slidesGrid[i],
							r = t.slidesGrid[t.slidesGrid.length - 1],
							o = Math.abs(e);
						(l = o >= a ? (o - a) / r : (o + r - n) / r),
							l > 1 && (l -= 1);
					}
					Object.assign(t, {
						progress: a,
						progressLoop: l,
						isBeginning: n,
						isEnd: r,
					}),
						(s.watchSlidesProgress ||
							(s.centeredSlides && s.autoHeight)) &&
							t.updateSlidesProgress(e),
						n && !o && t.emit("reachBeginning toEdge"),
						r && !d && t.emit("reachEnd toEdge"),
						((o && !n) || (d && !r)) && t.emit("fromEdge"),
						t.emit("progress", a);
				},
				updateSlidesClasses: function () {
					const e = this,
						{
							slides: t,
							params: s,
							slidesEl: i,
							activeIndex: a,
						} = e,
						n = e.virtual && s.virtual.enabled,
						r = (e) =>
							f(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
					let l;
					if (
						(t.forEach((e) => {
							e.classList.remove(
								s.slideActiveClass,
								s.slideNextClass,
								s.slidePrevClass
							);
						}),
						n)
					)
						if (s.loop) {
							let t = a - e.virtual.slidesBefore;
							t < 0 && (t = e.virtual.slides.length + t),
								t >= e.virtual.slides.length &&
									(t -= e.virtual.slides.length),
								(l = r(`[data-swiper-slide-index="${t}"]`));
						} else l = r(`[data-swiper-slide-index="${a}"]`);
					else l = t[a];
					if (l) {
						l.classList.add(s.slideActiveClass);
						let e = (function (e, t) {
							const s = [];
							for (; e.nextElementSibling; ) {
								const i = e.nextElementSibling;
								t ? i.matches(t) && s.push(i) : s.push(i),
									(e = i);
							}
							return s;
						})(l, `.${s.slideClass}, swiper-slide`)[0];
						s.loop && !e && (e = t[0]),
							e && e.classList.add(s.slideNextClass);
						let i = (function (e, t) {
							const s = [];
							for (; e.previousElementSibling; ) {
								const i = e.previousElementSibling;
								t ? i.matches(t) && s.push(i) : s.push(i),
									(e = i);
							}
							return s;
						})(l, `.${s.slideClass}, swiper-slide`)[0];
						s.loop && 0 === !i && (i = t[t.length - 1]),
							i && i.classList.add(s.slidePrevClass);
					}
					e.emitSlidesClasses();
				},
				updateActiveIndex: function (e) {
					const t = this,
						s = t.rtlTranslate ? t.translate : -t.translate,
						{
							snapGrid: i,
							params: a,
							activeIndex: n,
							realIndex: r,
							snapIndex: l,
						} = t;
					let o,
						d = e;
					const c = (e) => {
						let s = e - t.virtual.slidesBefore;
						return (
							s < 0 && (s = t.virtual.slides.length + s),
							s >= t.virtual.slides.length &&
								(s -= t.virtual.slides.length),
							s
						);
					};
					if (
						(void 0 === d &&
							(d = (function (e) {
								const { slidesGrid: t, params: s } = e,
									i = e.rtlTranslate
										? e.translate
										: -e.translate;
								let a;
								for (let e = 0; e < t.length; e += 1)
									void 0 !== t[e + 1]
										? i >= t[e] &&
										  i < t[e + 1] - (t[e + 1] - t[e]) / 2
											? (a = e)
											: i >= t[e] &&
											  i < t[e + 1] &&
											  (a = e + 1)
										: i >= t[e] && (a = e);
								return (
									s.normalizeSlideIndex &&
										(a < 0 || void 0 === a) &&
										(a = 0),
									a
								);
							})(t)),
						i.indexOf(s) >= 0)
					)
						o = i.indexOf(s);
					else {
						const e = Math.min(a.slidesPerGroupSkip, d);
						o = e + Math.floor((d - e) / a.slidesPerGroup);
					}
					if ((o >= i.length && (o = i.length - 1), d === n))
						return (
							o !== l &&
								((t.snapIndex = o), t.emit("snapIndexChange")),
							void (
								t.params.loop &&
								t.virtual &&
								t.params.virtual.enabled &&
								(t.realIndex = c(d))
							)
						);
					let p;
					(p =
						t.virtual && a.virtual.enabled && a.loop
							? c(d)
							: t.slides[d]
							? parseInt(
									t.slides[d].getAttribute(
										"data-swiper-slide-index"
									) || d,
									10
							  )
							: d),
						Object.assign(t, {
							snapIndex: o,
							realIndex: p,
							previousIndex: n,
							activeIndex: d,
						}),
						t.emit("activeIndexChange"),
						t.emit("snapIndexChange"),
						r !== p && t.emit("realIndexChange"),
						(t.initialized || t.params.runCallbacksOnInit) &&
							t.emit("slideChange");
				},
				updateClickedSlide: function (e) {
					const t = this,
						s = t.params,
						i = e.closest(`.${s.slideClass}, swiper-slide`);
					let a,
						n = !1;
					if (i)
						for (let e = 0; e < t.slides.length; e += 1)
							if (t.slides[e] === i) {
								(n = !0), (a = e);
								break;
							}
					if (!i || !n)
						return (
							(t.clickedSlide = void 0),
							void (t.clickedIndex = void 0)
						);
					(t.clickedSlide = i),
						t.virtual && t.params.virtual.enabled
							? (t.clickedIndex = parseInt(
									i.getAttribute("data-swiper-slide-index"),
									10
							  ))
							: (t.clickedIndex = a),
						s.slideToClickedSlide &&
							void 0 !== t.clickedIndex &&
							t.clickedIndex !== t.activeIndex &&
							t.slideToClickedSlide();
				},
			};
		function _({ swiper: e, runCallbacks: t, direction: s, step: i }) {
			const { activeIndex: a, previousIndex: n } = e;
			let r = s;
			if (
				(r || (r = a > n ? "next" : a < n ? "prev" : "reset"),
				e.emit(`transition${i}`),
				t && a !== n)
			) {
				if ("reset" === r)
					return void e.emit(`slideResetTransition${i}`);
				e.emit(`slideChangeTransition${i}`),
					"next" === r
						? e.emit(`slideNextTransition${i}`)
						: e.emit(`slidePrevTransition${i}`);
			}
		}
		const M = {
			slideTo: function (e = 0, t = this.params.speed, s = !0, i, a) {
				"string" == typeof e && (e = parseInt(e, 10));
				const n = this;
				let r = e;
				r < 0 && (r = 0);
				const {
					params: l,
					snapGrid: o,
					slidesGrid: d,
					previousIndex: c,
					activeIndex: p,
					rtlTranslate: u,
					wrapperEl: h,
					enabled: f,
				} = n;
				if (
					(n.animating && l.preventInteractionOnTransition) ||
					(!f && !i && !a)
				)
					return !1;
				const g = Math.min(n.params.slidesPerGroupSkip, r);
				let v = g + Math.floor((r - g) / n.params.slidesPerGroup);
				v >= o.length && (v = o.length - 1);
				const b = -o[v];
				if (l.normalizeSlideIndex)
					for (let e = 0; e < d.length; e += 1) {
						const t = -Math.floor(100 * b),
							s = Math.floor(100 * d[e]),
							i = Math.floor(100 * d[e + 1]);
						void 0 !== d[e + 1]
							? t >= s && t < i - (i - s) / 2
								? (r = e)
								: t >= s && t < i && (r = e + 1)
							: t >= s && (r = e);
					}
				if (n.initialized && r !== p) {
					if (
						!n.allowSlideNext &&
						b < n.translate &&
						b < n.minTranslate()
					)
						return !1;
					if (
						!n.allowSlidePrev &&
						b > n.translate &&
						b > n.maxTranslate() &&
						(p || 0) !== r
					)
						return !1;
				}
				let w;
				if (
					(r !== (c || 0) && s && n.emit("beforeSlideChangeStart"),
					n.updateProgress(b),
					(w = r > p ? "next" : r < p ? "prev" : "reset"),
					(u && -b === n.translate) || (!u && b === n.translate))
				)
					return (
						n.updateActiveIndex(r),
						l.autoHeight && n.updateAutoHeight(),
						n.updateSlidesClasses(),
						"slide" !== l.effect && n.setTranslate(b),
						"reset" !== w &&
							(n.transitionStart(s, w), n.transitionEnd(s, w)),
						!1
					);
				if (l.cssMode) {
					const e = n.isHorizontal(),
						s = u ? b : -b;
					if (0 === t) {
						const t = n.virtual && n.params.virtual.enabled;
						t &&
							((n.wrapperEl.style.scrollSnapType = "none"),
							(n._immediateVirtual = !0)),
							t &&
							!n._cssModeVirtualInitialSet &&
							n.params.initialSlide > 0
								? ((n._cssModeVirtualInitialSet = !0),
								  requestAnimationFrame(() => {
										h[e ? "scrollLeft" : "scrollTop"] = s;
								  }))
								: (h[e ? "scrollLeft" : "scrollTop"] = s),
							t &&
								requestAnimationFrame(() => {
									(n.wrapperEl.style.scrollSnapType = ""),
										(n._immediateVirtual = !1);
								});
					} else {
						if (!n.support.smoothScroll)
							return (
								m({
									swiper: n,
									targetPosition: s,
									side: e ? "left" : "top",
								}),
								!0
							);
						h.scrollTo({
							[e ? "left" : "top"]: s,
							behavior: "smooth",
						});
					}
					return !0;
				}
				return (
					n.setTransition(t),
					n.setTranslate(b),
					n.updateActiveIndex(r),
					n.updateSlidesClasses(),
					n.emit("beforeTransitionStart", t, i),
					n.transitionStart(s, w),
					0 === t
						? n.transitionEnd(s, w)
						: n.animating ||
						  ((n.animating = !0),
						  n.onSlideToWrapperTransitionEnd ||
								(n.onSlideToWrapperTransitionEnd = function (
									e
								) {
									n &&
										!n.destroyed &&
										e.target === this &&
										(n.wrapperEl.removeEventListener(
											"transitionend",
											n.onSlideToWrapperTransitionEnd
										),
										(n.onSlideToWrapperTransitionEnd =
											null),
										delete n.onSlideToWrapperTransitionEnd,
										n.transitionEnd(s, w));
								}),
						  n.wrapperEl.addEventListener(
								"transitionend",
								n.onSlideToWrapperTransitionEnd
						  )),
					!0
				);
			},
			slideToLoop: function (e = 0, t = this.params.speed, s = !0, i) {
				"string" == typeof e && (e = parseInt(e, 10));
				const a = this;
				let n = e;
				return (
					a.params.loop &&
						(a.virtual && a.params.virtual.enabled
							? (n += a.virtual.slidesBefore)
							: (n = a.getSlideIndexByData(n))),
					a.slideTo(n, t, s, i)
				);
			},
			slideNext: function (e = this.params.speed, t = !0, s) {
				const i = this,
					{ enabled: a, params: n, animating: r } = i;
				if (!a) return i;
				let l = n.slidesPerGroup;
				"auto" === n.slidesPerView &&
					1 === n.slidesPerGroup &&
					n.slidesPerGroupAuto &&
					(l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
				const o = i.activeIndex < n.slidesPerGroupSkip ? 1 : l,
					d = i.virtual && n.virtual.enabled;
				if (n.loop) {
					if (r && !d && n.loopPreventsSliding) return !1;
					i.loopFix({ direction: "next" }),
						(i._clientLeft = i.wrapperEl.clientLeft);
				}
				return n.rewind && i.isEnd
					? i.slideTo(0, e, t, s)
					: i.slideTo(i.activeIndex + o, e, t, s);
			},
			slidePrev: function (e = this.params.speed, t = !0, s) {
				const i = this,
					{
						params: a,
						snapGrid: n,
						slidesGrid: r,
						rtlTranslate: l,
						enabled: o,
						animating: d,
					} = i;
				if (!o) return i;
				const c = i.virtual && a.virtual.enabled;
				if (a.loop) {
					if (d && !c && a.loopPreventsSliding) return !1;
					i.loopFix({ direction: "prev" }),
						(i._clientLeft = i.wrapperEl.clientLeft);
				}
				function p(e) {
					return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
				}
				const u = p(l ? i.translate : -i.translate),
					m = n.map((e) => p(e));
				let h = n[m.indexOf(u) - 1];
				if (void 0 === h && a.cssMode) {
					let e;
					n.forEach((t, s) => {
						u >= t && (e = s);
					}),
						void 0 !== e && (h = n[e > 0 ? e - 1 : e]);
				}
				let f = 0;
				if (
					(void 0 !== h &&
						((f = r.indexOf(h)),
						f < 0 && (f = i.activeIndex - 1),
						"auto" === a.slidesPerView &&
							1 === a.slidesPerGroup &&
							a.slidesPerGroupAuto &&
							((f =
								f - i.slidesPerViewDynamic("previous", !0) + 1),
							(f = Math.max(f, 0)))),
					a.rewind && i.isBeginning)
				) {
					const a =
						i.params.virtual &&
						i.params.virtual.enabled &&
						i.virtual
							? i.virtual.slides.length - 1
							: i.slides.length - 1;
					return i.slideTo(a, e, t, s);
				}
				return i.slideTo(f, e, t, s);
			},
			slideReset: function (e = this.params.speed, t = !0, s) {
				return this.slideTo(this.activeIndex, e, t, s);
			},
			slideToClosest: function (
				e = this.params.speed,
				t = !0,
				s,
				i = 0.5
			) {
				const a = this;
				let n = a.activeIndex;
				const r = Math.min(a.params.slidesPerGroupSkip, n),
					l = r + Math.floor((n - r) / a.params.slidesPerGroup),
					o = a.rtlTranslate ? a.translate : -a.translate;
				if (o >= a.snapGrid[l]) {
					const e = a.snapGrid[l];
					o - e > (a.snapGrid[l + 1] - e) * i &&
						(n += a.params.slidesPerGroup);
				} else {
					const e = a.snapGrid[l - 1];
					o - e <= (a.snapGrid[l] - e) * i &&
						(n -= a.params.slidesPerGroup);
				}
				return (
					(n = Math.max(n, 0)),
					(n = Math.min(n, a.slidesGrid.length - 1)),
					a.slideTo(n, e, t, s)
				);
			},
			slideToClickedSlide: function () {
				const e = this,
					{ params: t, slidesEl: s } = e,
					i =
						"auto" === t.slidesPerView
							? e.slidesPerViewDynamic()
							: t.slidesPerView;
				let a,
					n = e.clickedIndex;
				const r = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
				if (t.loop) {
					if (e.animating) return;
					(a = parseInt(
						e.clickedSlide.getAttribute("data-swiper-slide-index"),
						10
					)),
						t.centeredSlides
							? n < e.loopedSlides - i / 2 ||
							  n > e.slides.length - e.loopedSlides + i / 2
								? (e.loopFix(),
								  (n = e.getSlideIndex(
										f(
											s,
											`${r}[data-swiper-slide-index="${a}"]`
										)[0]
								  )),
								  o(() => {
										e.slideTo(n);
								  }))
								: e.slideTo(n)
							: n > e.slides.length - i
							? (e.loopFix(),
							  (n = e.getSlideIndex(
									f(
										s,
										`${r}[data-swiper-slide-index="${a}"]`
									)[0]
							  )),
							  o(() => {
									e.slideTo(n);
							  }))
							: e.slideTo(n);
				} else e.slideTo(n);
			},
		};
		function P(e) {
			const t = this,
				s = n(),
				i = l(),
				a = t.touchEventsData;
			a.evCache.push(e);
			const { params: r, touches: o, enabled: c } = t;
			if (!c) return;
			if (!r.simulateTouch && "mouse" === e.pointerType) return;
			if (t.animating && r.preventInteractionOnTransition) return;
			!t.animating && r.cssMode && r.loop && t.loopFix();
			let p = e;
			p.originalEvent && (p = p.originalEvent);
			let u = p.target;
			if ("wrapper" === r.touchEventsTarget && !t.wrapperEl.contains(u))
				return;
			if ("which" in p && 3 === p.which) return;
			if ("button" in p && p.button > 0) return;
			if (a.isTouched && a.isMoved) return;
			const m = !!r.noSwipingClass && "" !== r.noSwipingClass,
				h = e.composedPath ? e.composedPath() : e.path;
			m && p.target && p.target.shadowRoot && h && (u = h[0]);
			const f = r.noSwipingSelector
					? r.noSwipingSelector
					: `.${r.noSwipingClass}`,
				g = !(!p.target || !p.target.shadowRoot);
			if (
				r.noSwiping &&
				(g
					? (function (e, t = this) {
							return (function t(s) {
								if (!s || s === n() || s === l()) return null;
								s.assignedSlot && (s = s.assignedSlot);
								const i = s.closest(e);
								return i || s.getRootNode
									? i || t(s.getRootNode().host)
									: null;
							})(t);
					  })(f, u)
					: u.closest(f))
			)
				return void (t.allowClick = !0);
			if (r.swipeHandler && !u.closest(r.swipeHandler)) return;
			(o.currentX = p.pageX), (o.currentY = p.pageY);
			const v = o.currentX,
				b = o.currentY,
				w = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
				y = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
			if (w && (v <= y || v >= i.innerWidth - y)) {
				if ("prevent" !== w) return;
				e.preventDefault();
			}
			Object.assign(a, {
				isTouched: !0,
				isMoved: !1,
				allowTouchCallbacks: !0,
				isScrolling: void 0,
				startMoving: void 0,
			}),
				(o.startX = v),
				(o.startY = b),
				(a.touchStartTime = d()),
				(t.allowClick = !0),
				t.updateSize(),
				(t.swipeDirection = void 0),
				r.threshold > 0 && (a.allowThresholdMove = !1);
			let S = !0;
			u.matches(a.focusableElements) &&
				((S = !1), "SELECT" === u.nodeName && (a.isTouched = !1)),
				s.activeElement &&
					s.activeElement.matches(a.focusableElements) &&
					s.activeElement !== u &&
					s.activeElement.blur();
			const E = S && t.allowTouchMove && r.touchStartPreventDefault;
			(!r.touchStartForcePreventDefault && !E) ||
				u.isContentEditable ||
				p.preventDefault(),
				t.params.freeMode &&
					t.params.freeMode.enabled &&
					t.freeMode &&
					t.animating &&
					!r.cssMode &&
					t.freeMode.onTouchStart(),
				t.emit("touchStart", p);
		}
		function k(e) {
			const t = n(),
				s = this,
				i = s.touchEventsData,
				{ params: a, touches: r, rtlTranslate: l, enabled: o } = s;
			if (!o) return;
			if (!a.simulateTouch && "mouse" === e.pointerType) return;
			let c = e;
			if ((c.originalEvent && (c = c.originalEvent), !i.isTouched))
				return void (
					i.startMoving &&
					i.isScrolling &&
					s.emit("touchMoveOpposite", c)
				);
			const p = i.evCache.findIndex((e) => e.pointerId === c.pointerId);
			p >= 0 && (i.evCache[p] = c);
			const u = i.evCache.length > 1 ? i.evCache[0] : c,
				m = u.pageX,
				h = u.pageY;
			if (c.preventedByNestedSwiper)
				return (r.startX = m), void (r.startY = h);
			if (!s.allowTouchMove)
				return (
					c.target.matches(i.focusableElements) ||
						(s.allowClick = !1),
					void (
						i.isTouched &&
						(Object.assign(r, {
							startX: m,
							startY: h,
							prevX: s.touches.currentX,
							prevY: s.touches.currentY,
							currentX: m,
							currentY: h,
						}),
						(i.touchStartTime = d()))
					)
				);
			if (a.touchReleaseOnEdges && !a.loop)
				if (s.isVertical()) {
					if (
						(h < r.startY && s.translate <= s.maxTranslate()) ||
						(h > r.startY && s.translate >= s.minTranslate())
					)
						return (i.isTouched = !1), void (i.isMoved = !1);
				} else if (
					(m < r.startX && s.translate <= s.maxTranslate()) ||
					(m > r.startX && s.translate >= s.minTranslate())
				)
					return;
			if (
				t.activeElement &&
				c.target === t.activeElement &&
				c.target.matches(i.focusableElements)
			)
				return (i.isMoved = !0), void (s.allowClick = !1);
			if (
				(i.allowTouchCallbacks && s.emit("touchMove", c),
				c.targetTouches && c.targetTouches.length > 1)
			)
				return;
			(r.currentX = m), (r.currentY = h);
			const f = r.currentX - r.startX,
				g = r.currentY - r.startY;
			if (
				s.params.threshold &&
				Math.sqrt(f ** 2 + g ** 2) < s.params.threshold
			)
				return;
			if (void 0 === i.isScrolling) {
				let e;
				(s.isHorizontal() && r.currentY === r.startY) ||
				(s.isVertical() && r.currentX === r.startX)
					? (i.isScrolling = !1)
					: f * f + g * g >= 25 &&
					  ((e =
							(180 * Math.atan2(Math.abs(g), Math.abs(f))) /
							Math.PI),
					  (i.isScrolling = s.isHorizontal()
							? e > a.touchAngle
							: 90 - e > a.touchAngle));
			}
			if (
				(i.isScrolling && s.emit("touchMoveOpposite", c),
				void 0 === i.startMoving &&
					((r.currentX === r.startX && r.currentY === r.startY) ||
						(i.startMoving = !0)),
				i.isScrolling ||
					(s.zoom &&
						s.params.zoom &&
						s.params.zoom.enabled &&
						i.evCache.length > 1))
			)
				return void (i.isTouched = !1);
			if (!i.startMoving) return;
			(s.allowClick = !1),
				!a.cssMode && c.cancelable && c.preventDefault(),
				a.touchMoveStopPropagation && !a.nested && c.stopPropagation();
			let v = s.isHorizontal() ? f : g,
				b = s.isHorizontal()
					? r.currentX - r.previousX
					: r.currentY - r.previousY;
			a.oneWayMovement &&
				((v = Math.abs(v) * (l ? 1 : -1)),
				(b = Math.abs(b) * (l ? 1 : -1))),
				(r.diff = v),
				(v *= a.touchRatio),
				l && ((v = -v), (b = -b));
			const w = s.touchesDirection;
			(s.swipeDirection = v > 0 ? "prev" : "next"),
				(s.touchesDirection = b > 0 ? "prev" : "next");
			const y = s.params.loop && !a.cssMode;
			if (!i.isMoved) {
				if (
					(y && s.loopFix({ direction: s.swipeDirection }),
					(i.startTranslate = s.getTranslate()),
					s.setTransition(0),
					s.animating)
				) {
					const e = new window.CustomEvent("transitionend", {
						bubbles: !0,
						cancelable: !0,
					});
					s.wrapperEl.dispatchEvent(e);
				}
				(i.allowMomentumBounce = !1),
					!a.grabCursor ||
						(!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
						s.setGrabCursor(!0),
					s.emit("sliderFirstMove", c);
			}
			let S;
			i.isMoved &&
				w !== s.touchesDirection &&
				y &&
				Math.abs(v) >= 1 &&
				(s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }),
				(S = !0)),
				s.emit("sliderMove", c),
				(i.isMoved = !0),
				(i.currentTranslate = v + i.startTranslate);
			let E = !0,
				T = a.resistanceRatio;
			if (
				(a.touchReleaseOnEdges && (T = 0),
				v > 0
					? (y &&
							!S &&
							i.currentTranslate >
								(a.centeredSlides
									? s.minTranslate() - s.size / 2
									: s.minTranslate()) &&
							s.loopFix({
								direction: "prev",
								setTranslate: !0,
								activeSlideIndex: 0,
							}),
					  i.currentTranslate > s.minTranslate() &&
							((E = !1),
							a.resistance &&
								(i.currentTranslate =
									s.minTranslate() -
									1 +
									(-s.minTranslate() +
										i.startTranslate +
										v) **
										T)))
					: v < 0 &&
					  (y &&
							!S &&
							i.currentTranslate <
								(a.centeredSlides
									? s.maxTranslate() + s.size / 2
									: s.maxTranslate()) &&
							s.loopFix({
								direction: "next",
								setTranslate: !0,
								activeSlideIndex:
									s.slides.length -
									("auto" === a.slidesPerView
										? s.slidesPerViewDynamic()
										: Math.ceil(
												parseFloat(a.slidesPerView, 10)
										  )),
							}),
					  i.currentTranslate < s.maxTranslate() &&
							((E = !1),
							a.resistance &&
								(i.currentTranslate =
									s.maxTranslate() +
									1 -
									(s.maxTranslate() - i.startTranslate - v) **
										T))),
				E && (c.preventedByNestedSwiper = !0),
				!s.allowSlideNext &&
					"next" === s.swipeDirection &&
					i.currentTranslate < i.startTranslate &&
					(i.currentTranslate = i.startTranslate),
				!s.allowSlidePrev &&
					"prev" === s.swipeDirection &&
					i.currentTranslate > i.startTranslate &&
					(i.currentTranslate = i.startTranslate),
				s.allowSlidePrev ||
					s.allowSlideNext ||
					(i.currentTranslate = i.startTranslate),
				a.threshold > 0)
			) {
				if (!(Math.abs(v) > a.threshold || i.allowThresholdMove))
					return void (i.currentTranslate = i.startTranslate);
				if (!i.allowThresholdMove)
					return (
						(i.allowThresholdMove = !0),
						(r.startX = r.currentX),
						(r.startY = r.currentY),
						(i.currentTranslate = i.startTranslate),
						void (r.diff = s.isHorizontal()
							? r.currentX - r.startX
							: r.currentY - r.startY)
					);
			}
			a.followFinger &&
				!a.cssMode &&
				(((a.freeMode && a.freeMode.enabled && s.freeMode) ||
					a.watchSlidesProgress) &&
					(s.updateActiveIndex(), s.updateSlidesClasses()),
				s.params.freeMode &&
					a.freeMode.enabled &&
					s.freeMode &&
					s.freeMode.onTouchMove(),
				s.updateProgress(i.currentTranslate),
				s.setTranslate(i.currentTranslate));
		}
		function A(e) {
			const t = this,
				s = t.touchEventsData,
				i = s.evCache.findIndex((t) => t.pointerId === e.pointerId);
			if (
				(i >= 0 && s.evCache.splice(i, 1),
				["pointercancel", "pointerout", "pointerleave"].includes(
					e.type
				) &&
					("pointercancel" !== e.type ||
						(!t.browser.isSafari && !t.browser.isWebView)))
			)
				return;
			const {
				params: a,
				touches: n,
				rtlTranslate: r,
				slidesGrid: l,
				enabled: c,
			} = t;
			if (!c) return;
			if (!a.simulateTouch && "mouse" === e.pointerType) return;
			let p = e;
			if (
				(p.originalEvent && (p = p.originalEvent),
				s.allowTouchCallbacks && t.emit("touchEnd", p),
				(s.allowTouchCallbacks = !1),
				!s.isTouched)
			)
				return (
					s.isMoved && a.grabCursor && t.setGrabCursor(!1),
					(s.isMoved = !1),
					void (s.startMoving = !1)
				);
			a.grabCursor &&
				s.isMoved &&
				s.isTouched &&
				(!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
				t.setGrabCursor(!1);
			const u = d(),
				m = u - s.touchStartTime;
			if (t.allowClick) {
				const e = p.path || (p.composedPath && p.composedPath());
				t.updateClickedSlide((e && e[0]) || p.target),
					t.emit("tap click", p),
					m < 300 &&
						u - s.lastClickTime < 300 &&
						t.emit("doubleTap doubleClick", p);
			}
			if (
				((s.lastClickTime = d()),
				o(() => {
					t.destroyed || (t.allowClick = !0);
				}),
				!s.isTouched ||
					!s.isMoved ||
					!t.swipeDirection ||
					0 === n.diff ||
					s.currentTranslate === s.startTranslate)
			)
				return (
					(s.isTouched = !1),
					(s.isMoved = !1),
					void (s.startMoving = !1)
				);
			let h;
			if (
				((s.isTouched = !1),
				(s.isMoved = !1),
				(s.startMoving = !1),
				(h = a.followFinger
					? r
						? t.translate
						: -t.translate
					: -s.currentTranslate),
				a.cssMode)
			)
				return;
			if (t.params.freeMode && a.freeMode.enabled)
				return void t.freeMode.onTouchEnd({ currentPos: h });
			let f = 0,
				g = t.slidesSizesGrid[0];
			for (
				let e = 0;
				e < l.length;
				e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
			) {
				const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
				void 0 !== l[e + t]
					? h >= l[e] &&
					  h < l[e + t] &&
					  ((f = e), (g = l[e + t] - l[e]))
					: h >= l[e] &&
					  ((f = e), (g = l[l.length - 1] - l[l.length - 2]));
			}
			let v = null,
				b = null;
			a.rewind &&
				(t.isBeginning
					? (b =
							t.params.virtual &&
							t.params.virtual.enabled &&
							t.virtual
								? t.virtual.slides.length - 1
								: t.slides.length - 1)
					: t.isEnd && (v = 0));
			const w = (h - l[f]) / g,
				y = f < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
			if (m > a.longSwipesMs) {
				if (!a.longSwipes) return void t.slideTo(t.activeIndex);
				"next" === t.swipeDirection &&
					(w >= a.longSwipesRatio
						? t.slideTo(a.rewind && t.isEnd ? v : f + y)
						: t.slideTo(f)),
					"prev" === t.swipeDirection &&
						(w > 1 - a.longSwipesRatio
							? t.slideTo(f + y)
							: null !== b &&
							  w < 0 &&
							  Math.abs(w) > a.longSwipesRatio
							? t.slideTo(b)
							: t.slideTo(f));
			} else {
				if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
				!t.navigation ||
				(p.target !== t.navigation.nextEl &&
					p.target !== t.navigation.prevEl)
					? ("next" === t.swipeDirection &&
							t.slideTo(null !== v ? v : f + y),
					  "prev" === t.swipeDirection &&
							t.slideTo(null !== b ? b : f))
					: p.target === t.navigation.nextEl
					? t.slideTo(f + y)
					: t.slideTo(f);
			}
		}
		let I;
		function O() {
			const e = this,
				{ params: t, el: s } = e;
			if (s && 0 === s.offsetWidth) return;
			t.breakpoints && e.setBreakpoint();
			const { allowSlideNext: i, allowSlidePrev: a, snapGrid: n } = e,
				r = e.virtual && e.params.virtual.enabled;
			(e.allowSlideNext = !0),
				(e.allowSlidePrev = !0),
				e.updateSize(),
				e.updateSlides(),
				e.updateSlidesClasses();
			const l = r && t.loop;
			!("auto" === t.slidesPerView || t.slidesPerView > 1) ||
			!e.isEnd ||
			e.isBeginning ||
			e.params.centeredSlides ||
			l
				? e.params.loop && !r
					? e.slideToLoop(e.realIndex, 0, !1, !0)
					: e.slideTo(e.activeIndex, 0, !1, !0)
				: e.slideTo(e.slides.length - 1, 0, !1, !0),
				e.autoplay &&
					e.autoplay.running &&
					e.autoplay.paused &&
					(clearTimeout(I),
					(I = setTimeout(() => {
						e.autoplay &&
							e.autoplay.running &&
							e.autoplay.paused &&
							e.autoplay.resume();
					}, 500))),
				(e.allowSlidePrev = a),
				(e.allowSlideNext = i),
				e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
		}
		function z(e) {
			const t = this;
			t.enabled &&
				(t.allowClick ||
					(t.params.preventClicks && e.preventDefault(),
					t.params.preventClicksPropagation &&
						t.animating &&
						(e.stopPropagation(), e.stopImmediatePropagation())));
		}
		function q() {
			const e = this,
				{ wrapperEl: t, rtlTranslate: s, enabled: i } = e;
			if (!i) return;
			let a;
			(e.previousTranslate = e.translate),
				e.isHorizontal()
					? (e.translate = -t.scrollLeft)
					: (e.translate = -t.scrollTop),
				0 === e.translate && (e.translate = 0),
				e.updateActiveIndex(),
				e.updateSlidesClasses();
			const n = e.maxTranslate() - e.minTranslate();
			(a = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
				a !== e.progress &&
					e.updateProgress(s ? -e.translate : e.translate),
				e.emit("setTranslate", e.translate, !1);
		}
		const B = (e, t) => {
			if (!e || e.destroyed || !e.params) return;
			const s = t.closest(
				e.isElement ? "swiper-slide" : `.${e.params.slideClass}`
			);
			if (s) {
				const t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
				t && t.remove();
			}
		};
		function $(e) {
			B(this, e.target), this.update();
		}
		let G = !1;
		function D() {}
		const F = (e, t) => {
				const s = n(),
					{ params: i, el: a, wrapperEl: r, device: l } = e,
					o = !!i.nested,
					d = "on" === t ? "addEventListener" : "removeEventListener",
					c = t;
				a[d]("pointerdown", e.onTouchStart, { passive: !1 }),
					s[d]("pointermove", e.onTouchMove, {
						passive: !1,
						capture: o,
					}),
					s[d]("pointerup", e.onTouchEnd, { passive: !0 }),
					s[d]("pointercancel", e.onTouchEnd, { passive: !0 }),
					s[d]("pointerout", e.onTouchEnd, { passive: !0 }),
					s[d]("pointerleave", e.onTouchEnd, { passive: !0 }),
					(i.preventClicks || i.preventClicksPropagation) &&
						a[d]("click", e.onClick, !0),
					i.cssMode && r[d]("scroll", e.onScroll),
					i.updateOnWindowResize
						? e[c](
								l.ios || l.android
									? "resize orientationchange observerUpdate"
									: "resize observerUpdate",
								O,
								!0
						  )
						: e[c]("observerUpdate", O, !0),
					a[d]("load", e.onLoad, { capture: !0 });
			},
			N = (e, t) => e.grid && t.grid && t.grid.rows > 1,
			H = {
				init: !0,
				direction: "horizontal",
				oneWayMovement: !1,
				touchEventsTarget: "wrapper",
				initialSlide: 0,
				speed: 300,
				cssMode: !1,
				updateOnWindowResize: !0,
				resizeObserver: !0,
				nested: !1,
				createElements: !1,
				enabled: !0,
				focusableElements:
					"input, select, option, textarea, button, video, label",
				width: null,
				height: null,
				preventInteractionOnTransition: !1,
				userAgent: null,
				url: null,
				edgeSwipeDetection: !1,
				edgeSwipeThreshold: 20,
				autoHeight: !1,
				setWrapperSize: !1,
				virtualTranslate: !1,
				effect: "slide",
				breakpoints: void 0,
				breakpointsBase: "window",
				spaceBetween: 0,
				slidesPerView: 1,
				slidesPerGroup: 1,
				slidesPerGroupSkip: 0,
				slidesPerGroupAuto: !1,
				centeredSlides: !1,
				centeredSlidesBounds: !1,
				slidesOffsetBefore: 0,
				slidesOffsetAfter: 0,
				normalizeSlideIndex: !0,
				centerInsufficientSlides: !1,
				watchOverflow: !0,
				roundLengths: !1,
				touchRatio: 1,
				touchAngle: 45,
				simulateTouch: !0,
				shortSwipes: !0,
				longSwipes: !0,
				longSwipesRatio: 0.5,
				longSwipesMs: 300,
				followFinger: !0,
				allowTouchMove: !0,
				threshold: 5,
				touchMoveStopPropagation: !1,
				touchStartPreventDefault: !0,
				touchStartForcePreventDefault: !1,
				touchReleaseOnEdges: !1,
				uniqueNavElements: !0,
				resistance: !0,
				resistanceRatio: 0.85,
				watchSlidesProgress: !1,
				grabCursor: !1,
				preventClicks: !0,
				preventClicksPropagation: !0,
				slideToClickedSlide: !1,
				loop: !1,
				loopedSlides: null,
				loopPreventsSliding: !0,
				rewind: !1,
				allowSlidePrev: !0,
				allowSlideNext: !0,
				swipeHandler: null,
				noSwiping: !0,
				noSwipingClass: "swiper-no-swiping",
				noSwipingSelector: null,
				passiveListeners: !0,
				maxBackfaceHiddenSlides: 10,
				containerModifierClass: "swiper-",
				slideClass: "swiper-slide",
				slideActiveClass: "swiper-slide-active",
				slideVisibleClass: "swiper-slide-visible",
				slideNextClass: "swiper-slide-next",
				slidePrevClass: "swiper-slide-prev",
				wrapperClass: "swiper-wrapper",
				lazyPreloaderClass: "swiper-lazy-preloader",
				runCallbacksOnInit: !0,
				_emitClasses: !1,
			};
		function V(e, t) {
			return function (s = {}) {
				const i = Object.keys(s)[0],
					a = s[i];
				"object" == typeof a && null !== a
					? (["navigation", "pagination", "scrollbar"].indexOf(i) >=
							0 &&
							!0 === e[i] &&
							(e[i] = { auto: !0 }),
					  i in e && "enabled" in a
							? (!0 === e[i] && (e[i] = { enabled: !0 }),
							  "object" != typeof e[i] ||
									"enabled" in e[i] ||
									(e[i].enabled = !0),
							  e[i] || (e[i] = { enabled: !1 }),
							  p(t, s))
							: p(t, s))
					: p(t, s);
			};
		}
		const j = {
				eventsEmitter: C,
				update: L,
				translate: {
					getTranslate: function (
						e = this.isHorizontal() ? "x" : "y"
					) {
						const {
							params: t,
							rtlTranslate: s,
							translate: i,
							wrapperEl: a,
						} = this;
						if (t.virtualTranslate) return s ? -i : i;
						if (t.cssMode) return i;
						let n = (function (e, t = "x") {
							const s = l();
							let i, a, n;
							const r = (function (e) {
								const t = l();
								let s;
								return (
									t.getComputedStyle &&
										(s = t.getComputedStyle(e, null)),
									!s &&
										e.currentStyle &&
										(s = e.currentStyle),
									s || (s = e.style),
									s
								);
							})(e);
							return (
								s.WebKitCSSMatrix
									? ((a = r.transform || r.webkitTransform),
									  a.split(",").length > 6 &&
											(a = a
												.split(", ")
												.map((e) => e.replace(",", "."))
												.join(", ")),
									  (n = new s.WebKitCSSMatrix(
											"none" === a ? "" : a
									  )))
									: ((n =
											r.MozTransform ||
											r.OTransform ||
											r.MsTransform ||
											r.msTransform ||
											r.transform ||
											r
												.getPropertyValue("transform")
												.replace(
													"translate(",
													"matrix(1, 0, 0, 1,"
												)),
									  (i = n.toString().split(","))),
								"x" === t &&
									(a = s.WebKitCSSMatrix
										? n.m41
										: 16 === i.length
										? parseFloat(i[12])
										: parseFloat(i[4])),
								"y" === t &&
									(a = s.WebKitCSSMatrix
										? n.m42
										: 16 === i.length
										? parseFloat(i[13])
										: parseFloat(i[5])),
								a || 0
							);
						})(a, e);
						return s && (n = -n), n || 0;
					},
					setTranslate: function (e, t) {
						const s = this,
							{
								rtlTranslate: i,
								params: a,
								wrapperEl: n,
								progress: r,
							} = s;
						let l,
							o = 0,
							d = 0;
						s.isHorizontal() ? (o = i ? -e : e) : (d = e),
							a.roundLengths &&
								((o = Math.floor(o)), (d = Math.floor(d))),
							a.cssMode
								? (n[
										s.isHorizontal()
											? "scrollLeft"
											: "scrollTop"
								  ] = s.isHorizontal() ? -o : -d)
								: a.virtualTranslate ||
								  (n.style.transform = `translate3d(${o}px, ${d}px, 0px)`),
							(s.previousTranslate = s.translate),
							(s.translate = s.isHorizontal() ? o : d);
						const c = s.maxTranslate() - s.minTranslate();
						(l = 0 === c ? 0 : (e - s.minTranslate()) / c),
							l !== r && s.updateProgress(e),
							s.emit("setTranslate", s.translate, t);
					},
					minTranslate: function () {
						return -this.snapGrid[0];
					},
					maxTranslate: function () {
						return -this.snapGrid[this.snapGrid.length - 1];
					},
					translateTo: function (
						e = 0,
						t = this.params.speed,
						s = !0,
						i = !0,
						a
					) {
						const n = this,
							{ params: r, wrapperEl: l } = n;
						if (n.animating && r.preventInteractionOnTransition)
							return !1;
						const o = n.minTranslate(),
							d = n.maxTranslate();
						let c;
						if (
							((c = i && e > o ? o : i && e < d ? d : e),
							n.updateProgress(c),
							r.cssMode)
						) {
							const e = n.isHorizontal();
							if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
							else {
								if (!n.support.smoothScroll)
									return (
										m({
											swiper: n,
											targetPosition: -c,
											side: e ? "left" : "top",
										}),
										!0
									);
								l.scrollTo({
									[e ? "left" : "top"]: -c,
									behavior: "smooth",
								});
							}
							return !0;
						}
						return (
							0 === t
								? (n.setTransition(0),
								  n.setTranslate(c),
								  s &&
										(n.emit("beforeTransitionStart", t, a),
										n.emit("transitionEnd")))
								: (n.setTransition(t),
								  n.setTranslate(c),
								  s &&
										(n.emit("beforeTransitionStart", t, a),
										n.emit("transitionStart")),
								  n.animating ||
										((n.animating = !0),
										n.onTranslateToWrapperTransitionEnd ||
											(n.onTranslateToWrapperTransitionEnd =
												function (e) {
													n &&
														!n.destroyed &&
														e.target === this &&
														(n.wrapperEl.removeEventListener(
															"transitionend",
															n.onTranslateToWrapperTransitionEnd
														),
														(n.onTranslateToWrapperTransitionEnd =
															null),
														delete n.onTranslateToWrapperTransitionEnd,
														s &&
															n.emit(
																"transitionEnd"
															));
												}),
										n.wrapperEl.addEventListener(
											"transitionend",
											n.onTranslateToWrapperTransitionEnd
										))),
							!0
						);
					},
				},
				transition: {
					setTransition: function (e, t) {
						const s = this;
						s.params.cssMode ||
							(s.wrapperEl.style.transitionDuration = `${e}ms`),
							s.emit("setTransition", e, t);
					},
					transitionStart: function (e = !0, t) {
						const s = this,
							{ params: i } = s;
						i.cssMode ||
							(i.autoHeight && s.updateAutoHeight(),
							_({
								swiper: s,
								runCallbacks: e,
								direction: t,
								step: "Start",
							}));
					},
					transitionEnd: function (e = !0, t) {
						const s = this,
							{ params: i } = s;
						(s.animating = !1),
							i.cssMode ||
								(s.setTransition(0),
								_({
									swiper: s,
									runCallbacks: e,
									direction: t,
									step: "End",
								}));
					},
				},
				slide: M,
				loop: {
					loopCreate: function (e) {
						const t = this,
							{ params: s, slidesEl: i } = t;
						!s.loop ||
							(t.virtual && t.params.virtual.enabled) ||
							(f(i, `.${s.slideClass}, swiper-slide`).forEach(
								(e, t) => {
									e.setAttribute(
										"data-swiper-slide-index",
										t
									);
								}
							),
							t.loopFix({
								slideRealIndex: e,
								direction: s.centeredSlides ? void 0 : "next",
							}));
					},
					loopFix: function ({
						slideRealIndex: e,
						slideTo: t = !0,
						direction: s,
						setTranslate: i,
						activeSlideIndex: a,
						byController: n,
						byMousewheel: r,
					} = {}) {
						const l = this;
						if (!l.params.loop) return;
						l.emit("beforeLoopFix");
						const {
							slides: o,
							allowSlidePrev: d,
							allowSlideNext: c,
							slidesEl: p,
							params: u,
						} = l;
						if (
							((l.allowSlidePrev = !0),
							(l.allowSlideNext = !0),
							l.virtual && u.virtual.enabled)
						)
							return (
								t &&
									(u.centeredSlides || 0 !== l.snapIndex
										? u.centeredSlides &&
										  l.snapIndex < u.slidesPerView
											? l.slideTo(
													l.virtual.slides.length +
														l.snapIndex,
													0,
													!1,
													!0
											  )
											: l.snapIndex ===
													l.snapGrid.length - 1 &&
											  l.slideTo(
													l.virtual.slidesBefore,
													0,
													!1,
													!0
											  )
										: l.slideTo(
												l.virtual.slides.length,
												0,
												!1,
												!0
										  )),
								(l.allowSlidePrev = d),
								(l.allowSlideNext = c),
								void l.emit("loopFix")
							);
						const m =
							"auto" === u.slidesPerView
								? l.slidesPerViewDynamic()
								: Math.ceil(parseFloat(u.slidesPerView, 10));
						let h = u.loopedSlides || m;
						h % u.slidesPerGroup != 0 &&
							(h += u.slidesPerGroup - (h % u.slidesPerGroup)),
							(l.loopedSlides = h);
						const f = [],
							g = [];
						let v = l.activeIndex;
						void 0 === a
							? (a = l.getSlideIndex(
									l.slides.filter((e) =>
										e.classList.contains(u.slideActiveClass)
									)[0]
							  ))
							: (v = a);
						const b = "next" === s || !s,
							w = "prev" === s || !s;
						let y = 0,
							S = 0;
						if (a < h) {
							y = Math.max(h - a, u.slidesPerGroup);
							for (let e = 0; e < h - a; e += 1) {
								const t =
									e - Math.floor(e / o.length) * o.length;
								f.push(o.length - t - 1);
							}
						} else if (a > l.slides.length - 2 * h) {
							S = Math.max(
								a - (l.slides.length - 2 * h),
								u.slidesPerGroup
							);
							for (let e = 0; e < S; e += 1) {
								const t =
									e - Math.floor(e / o.length) * o.length;
								g.push(t);
							}
						}
						if (
							(w &&
								f.forEach((e) => {
									p.prepend(l.slides[e]);
								}),
							b &&
								g.forEach((e) => {
									p.append(l.slides[e]);
								}),
							l.recalcSlides(),
							u.watchSlidesProgress && l.updateSlidesOffset(),
							t)
						)
							if (f.length > 0 && w)
								if (void 0 === e) {
									const e = l.slidesGrid[v],
										t = l.slidesGrid[v + y] - e;
									r
										? l.setTranslate(l.translate - t)
										: (l.slideTo(v + y, 0, !1, !0),
										  i &&
												(l.touches[
													l.isHorizontal()
														? "startX"
														: "startY"
												] += t));
								} else i && l.slideToLoop(e, 0, !1, !0);
							else if (g.length > 0 && b)
								if (void 0 === e) {
									const e = l.slidesGrid[v],
										t = l.slidesGrid[v - S] - e;
									r
										? l.setTranslate(l.translate - t)
										: (l.slideTo(v - S, 0, !1, !0),
										  i &&
												(l.touches[
													l.isHorizontal()
														? "startX"
														: "startY"
												] += t));
								} else l.slideToLoop(e, 0, !1, !0);
						if (
							((l.allowSlidePrev = d),
							(l.allowSlideNext = c),
							l.controller && l.controller.control && !n)
						) {
							const t = {
								slideRealIndex: e,
								slideTo: !1,
								direction: s,
								setTranslate: i,
								activeSlideIndex: a,
								byController: !0,
							};
							Array.isArray(l.controller.control)
								? l.controller.control.forEach((e) => {
										!e.destroyed &&
											e.params.loop &&
											e.loopFix(t);
								  })
								: l.controller.control instanceof
										l.constructor &&
								  l.controller.control.params.loop &&
								  l.controller.control.loopFix(t);
						}
						l.emit("loopFix");
					},
					loopDestroy: function () {
						const e = this,
							{ params: t, slidesEl: s } = e;
						if (!t.loop || (e.virtual && e.params.virtual.enabled))
							return;
						e.recalcSlides();
						const i = [];
						e.slides.forEach((e) => {
							const t =
								void 0 === e.swiperSlideIndex
									? 1 *
									  e.getAttribute("data-swiper-slide-index")
									: e.swiperSlideIndex;
							i[t] = e;
						}),
							e.slides.forEach((e) => {
								e.removeAttribute("data-swiper-slide-index");
							}),
							i.forEach((e) => {
								s.append(e);
							}),
							e.recalcSlides(),
							e.slideTo(e.realIndex, 0);
					},
				},
				grabCursor: {
					setGrabCursor: function (e) {
						const t = this;
						if (
							!t.params.simulateTouch ||
							(t.params.watchOverflow && t.isLocked) ||
							t.params.cssMode
						)
							return;
						const s =
							"container" === t.params.touchEventsTarget
								? t.el
								: t.wrapperEl;
						t.isElement && (t.__preventObserver__ = !0),
							(s.style.cursor = "move"),
							(s.style.cursor = e ? "grabbing" : "grab"),
							t.isElement &&
								requestAnimationFrame(() => {
									t.__preventObserver__ = !1;
								});
					},
					unsetGrabCursor: function () {
						const e = this;
						(e.params.watchOverflow && e.isLocked) ||
							e.params.cssMode ||
							(e.isElement && (e.__preventObserver__ = !0),
							(e[
								"container" === e.params.touchEventsTarget
									? "el"
									: "wrapperEl"
							].style.cursor = ""),
							e.isElement &&
								requestAnimationFrame(() => {
									e.__preventObserver__ = !1;
								}));
					},
				},
				events: {
					attachEvents: function () {
						const e = this,
							t = n(),
							{ params: s } = e;
						(e.onTouchStart = P.bind(e)),
							(e.onTouchMove = k.bind(e)),
							(e.onTouchEnd = A.bind(e)),
							s.cssMode && (e.onScroll = q.bind(e)),
							(e.onClick = z.bind(e)),
							(e.onLoad = $.bind(e)),
							G ||
								(t.addEventListener("touchstart", D), (G = !0)),
							F(e, "on");
					},
					detachEvents: function () {
						F(this, "off");
					},
				},
				breakpoints: {
					setBreakpoint: function () {
						const e = this,
							{
								realIndex: t,
								initialized: s,
								params: i,
								el: a,
							} = e,
							n = i.breakpoints;
						if (!n || (n && 0 === Object.keys(n).length)) return;
						const r = e.getBreakpoint(
							n,
							e.params.breakpointsBase,
							e.el
						);
						if (!r || e.currentBreakpoint === r) return;
						const l = (r in n ? n[r] : void 0) || e.originalParams,
							o = N(e, i),
							d = N(e, l),
							c = i.enabled;
						o && !d
							? (a.classList.remove(
									`${i.containerModifierClass}grid`,
									`${i.containerModifierClass}grid-column`
							  ),
							  e.emitContainerClasses())
							: !o &&
							  d &&
							  (a.classList.add(
									`${i.containerModifierClass}grid`
							  ),
							  ((l.grid.fill && "column" === l.grid.fill) ||
									(!l.grid.fill &&
										"column" === i.grid.fill)) &&
									a.classList.add(
										`${i.containerModifierClass}grid-column`
									),
							  e.emitContainerClasses()),
							["navigation", "pagination", "scrollbar"].forEach(
								(t) => {
									const s = i[t] && i[t].enabled,
										a = l[t] && l[t].enabled;
									s && !a && e[t].disable(),
										!s && a && e[t].enable();
								}
							);
						const u = l.direction && l.direction !== i.direction,
							m =
								i.loop &&
								(l.slidesPerView !== i.slidesPerView || u);
						u && s && e.changeDirection(), p(e.params, l);
						const h = e.params.enabled;
						Object.assign(e, {
							allowTouchMove: e.params.allowTouchMove,
							allowSlideNext: e.params.allowSlideNext,
							allowSlidePrev: e.params.allowSlidePrev,
						}),
							c && !h ? e.disable() : !c && h && e.enable(),
							(e.currentBreakpoint = r),
							e.emit("_beforeBreakpoint", l),
							m &&
								s &&
								(e.loopDestroy(),
								e.loopCreate(t),
								e.updateSlides()),
							e.emit("breakpoint", l);
					},
					getBreakpoint: function (e, t = "window", s) {
						if (!e || ("container" === t && !s)) return;
						let i = !1;
						const a = l(),
							n = "window" === t ? a.innerHeight : s.clientHeight,
							r = Object.keys(e).map((e) => {
								if (
									"string" == typeof e &&
									0 === e.indexOf("@")
								) {
									const t = parseFloat(e.substr(1));
									return { value: n * t, point: e };
								}
								return { value: e, point: e };
							});
						r.sort(
							(e, t) =>
								parseInt(e.value, 10) - parseInt(t.value, 10)
						);
						for (let e = 0; e < r.length; e += 1) {
							const { point: n, value: l } = r[e];
							"window" === t
								? a.matchMedia(`(min-width: ${l}px)`).matches &&
								  (i = n)
								: l <= s.clientWidth && (i = n);
						}
						return i || "max";
					},
				},
				checkOverflow: {
					checkOverflow: function () {
						const e = this,
							{ isLocked: t, params: s } = e,
							{ slidesOffsetBefore: i } = s;
						if (i) {
							const t = e.slides.length - 1,
								s =
									e.slidesGrid[t] +
									e.slidesSizesGrid[t] +
									2 * i;
							e.isLocked = e.size > s;
						} else e.isLocked = 1 === e.snapGrid.length;
						!0 === s.allowSlideNext &&
							(e.allowSlideNext = !e.isLocked),
							!0 === s.allowSlidePrev &&
								(e.allowSlidePrev = !e.isLocked),
							t && t !== e.isLocked && (e.isEnd = !1),
							t !== e.isLocked &&
								e.emit(e.isLocked ? "lock" : "unlock");
					},
				},
				classes: {
					addClasses: function () {
						const e = this,
							{
								classNames: t,
								params: s,
								rtl: i,
								el: a,
								device: n,
							} = e,
							r = (function (e, t) {
								const s = [];
								return (
									e.forEach((e) => {
										"object" == typeof e
											? Object.keys(e).forEach((i) => {
													e[i] && s.push(t + i);
											  })
											: "string" == typeof e &&
											  s.push(t + e);
									}),
									s
								);
							})(
								[
									"initialized",
									s.direction,
									{
										"free-mode":
											e.params.freeMode &&
											s.freeMode.enabled,
									},
									{ autoheight: s.autoHeight },
									{ rtl: i },
									{ grid: s.grid && s.grid.rows > 1 },
									{
										"grid-column":
											s.grid &&
											s.grid.rows > 1 &&
											"column" === s.grid.fill,
									},
									{ android: n.android },
									{ ios: n.ios },
									{ "css-mode": s.cssMode },
									{ centered: s.cssMode && s.centeredSlides },
									{ "watch-progress": s.watchSlidesProgress },
								],
								s.containerModifierClass
							);
						t.push(...r),
							a.classList.add(...t),
							e.emitContainerClasses();
					},
					removeClasses: function () {
						const { el: e, classNames: t } = this;
						e.classList.remove(...t), this.emitContainerClasses();
					},
				},
			},
			R = {};
		class W {
			constructor(...e) {
				let t, s;
				1 === e.length &&
				e[0].constructor &&
				"Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
					? (s = e[0])
					: ([t, s] = e),
					s || (s = {}),
					(s = p({}, s)),
					t && !s.el && (s.el = t);
				const i = n();
				if (
					s.el &&
					"string" == typeof s.el &&
					i.querySelectorAll(s.el).length > 1
				) {
					const e = [];
					return (
						i.querySelectorAll(s.el).forEach((t) => {
							const i = p({}, s, { el: t });
							e.push(new W(i));
						}),
						e
					);
				}
				const a = this;
				(a.__swiper__ = !0),
					(a.support = x()),
					(a.device = (function (e = {}) {
						return (
							E ||
								(E = (function ({ userAgent: e } = {}) {
									const t = x(),
										s = l(),
										i = s.navigator.platform,
										a = e || s.navigator.userAgent,
										n = { ios: !1, android: !1 },
										r = s.screen.width,
										o = s.screen.height,
										d = a.match(
											/(Android);?[\s\/]+([\d.]+)?/
										);
									let c = a.match(/(iPad).*OS\s([\d_]+)/);
									const p = a.match(
											/(iPod)(.*OS\s([\d_]+))?/
										),
										u =
											!c &&
											a.match(
												/(iPhone\sOS|iOS)\s([\d_]+)/
											),
										m = "Win32" === i;
									let h = "MacIntel" === i;
									return (
										!c &&
											h &&
											t.touch &&
											[
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
											].indexOf(`${r}x${o}`) >= 0 &&
											((c =
												a.match(/(Version)\/([\d.]+)/)),
											c || (c = [0, 1, "13_0_0"]),
											(h = !1)),
										d &&
											!m &&
											((n.os = "android"),
											(n.android = !0)),
										(c || u || p) &&
											((n.os = "ios"), (n.ios = !0)),
										n
									);
								})(e)),
							E
						);
					})({ userAgent: s.userAgent })),
					(a.browser =
						(T ||
							(T = (function () {
								const e = l();
								let t = !1;
								function s() {
									const t =
										e.navigator.userAgent.toLowerCase();
									return (
										t.indexOf("safari") >= 0 &&
										t.indexOf("chrome") < 0 &&
										t.indexOf("android") < 0
									);
								}
								if (s()) {
									const s = String(e.navigator.userAgent);
									if (s.includes("Version/")) {
										const [e, i] = s
											.split("Version/")[1]
											.split(" ")[0]
											.split(".")
											.map((e) => Number(e));
										t = e < 16 || (16 === e && i < 2);
									}
								}
								return {
									isSafari: t || s(),
									needPerspectiveFix: t,
									isWebView:
										/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
											e.navigator.userAgent
										),
								};
							})()),
						T)),
					(a.eventsListeners = {}),
					(a.eventsAnyListeners = []),
					(a.modules = [...a.__modules__]),
					s.modules &&
						Array.isArray(s.modules) &&
						a.modules.push(...s.modules);
				const r = {};
				a.modules.forEach((e) => {
					e({
						params: s,
						swiper: a,
						extendParams: V(s, r),
						on: a.on.bind(a),
						once: a.once.bind(a),
						off: a.off.bind(a),
						emit: a.emit.bind(a),
					});
				});
				const o = p({}, H, r);
				return (
					(a.params = p({}, o, R, s)),
					(a.originalParams = p({}, a.params)),
					(a.passedParams = p({}, s)),
					a.params &&
						a.params.on &&
						Object.keys(a.params.on).forEach((e) => {
							a.on(e, a.params.on[e]);
						}),
					a.params && a.params.onAny && a.onAny(a.params.onAny),
					Object.assign(a, {
						enabled: a.params.enabled,
						el: t,
						classNames: [],
						slides: [],
						slidesGrid: [],
						snapGrid: [],
						slidesSizesGrid: [],
						isHorizontal: () => "horizontal" === a.params.direction,
						isVertical: () => "vertical" === a.params.direction,
						activeIndex: 0,
						realIndex: 0,
						isBeginning: !0,
						isEnd: !1,
						translate: 0,
						previousTranslate: 0,
						progress: 0,
						velocity: 0,
						animating: !1,
						allowSlideNext: a.params.allowSlideNext,
						allowSlidePrev: a.params.allowSlidePrev,
						touchEventsData: {
							isTouched: void 0,
							isMoved: void 0,
							allowTouchCallbacks: void 0,
							touchStartTime: void 0,
							isScrolling: void 0,
							currentTranslate: void 0,
							startTranslate: void 0,
							allowThresholdMove: void 0,
							focusableElements: a.params.focusableElements,
							lastClickTime: d(),
							clickTimeout: void 0,
							velocities: [],
							allowMomentumBounce: void 0,
							startMoving: void 0,
							evCache: [],
						},
						allowClick: !0,
						allowTouchMove: a.params.allowTouchMove,
						touches: {
							startX: 0,
							startY: 0,
							currentX: 0,
							currentY: 0,
							diff: 0,
						},
						imagesToLoad: [],
						imagesLoaded: 0,
					}),
					a.emit("_swiper"),
					a.params.init && a.init(),
					a
				);
			}
			getSlideIndex(e) {
				const { slidesEl: t, params: s } = this,
					i = b(f(t, `.${s.slideClass}, swiper-slide`)[0]);
				return b(e) - i;
			}
			getSlideIndexByData(e) {
				return this.getSlideIndex(
					this.slides.filter(
						(t) =>
							1 * t.getAttribute("data-swiper-slide-index") === e
					)[0]
				);
			}
			recalcSlides() {
				const { slidesEl: e, params: t } = this;
				this.slides = f(e, `.${t.slideClass}, swiper-slide`);
			}
			enable() {
				const e = this;
				e.enabled ||
					((e.enabled = !0),
					e.params.grabCursor && e.setGrabCursor(),
					e.emit("enable"));
			}
			disable() {
				const e = this;
				e.enabled &&
					((e.enabled = !1),
					e.params.grabCursor && e.unsetGrabCursor(),
					e.emit("disable"));
			}
			setProgress(e, t) {
				const s = this;
				e = Math.min(Math.max(e, 0), 1);
				const i = s.minTranslate(),
					a = (s.maxTranslate() - i) * e + i;
				s.translateTo(a, void 0 === t ? 0 : t),
					s.updateActiveIndex(),
					s.updateSlidesClasses();
			}
			emitContainerClasses() {
				const e = this;
				if (!e.params._emitClasses || !e.el) return;
				const t = e.el.className
					.split(" ")
					.filter(
						(t) =>
							0 === t.indexOf("swiper") ||
							0 === t.indexOf(e.params.containerModifierClass)
					);
				e.emit("_containerClasses", t.join(" "));
			}
			getSlideClasses(e) {
				const t = this;
				return t.destroyed
					? ""
					: e.className
							.split(" ")
							.filter(
								(e) =>
									0 === e.indexOf("swiper-slide") ||
									0 === e.indexOf(t.params.slideClass)
							)
							.join(" ");
			}
			emitSlidesClasses() {
				const e = this;
				if (!e.params._emitClasses || !e.el) return;
				const t = [];
				e.slides.forEach((s) => {
					const i = e.getSlideClasses(s);
					t.push({ slideEl: s, classNames: i }),
						e.emit("_slideClass", s, i);
				}),
					e.emit("_slideClasses", t);
			}
			slidesPerViewDynamic(e = "current", t = !1) {
				const {
					params: s,
					slides: i,
					slidesGrid: a,
					slidesSizesGrid: n,
					size: r,
					activeIndex: l,
				} = this;
				let o = 1;
				if (s.centeredSlides) {
					let e,
						t = i[l].swiperSlideSize;
					for (let s = l + 1; s < i.length; s += 1)
						i[s] &&
							!e &&
							((t += i[s].swiperSlideSize),
							(o += 1),
							t > r && (e = !0));
					for (let s = l - 1; s >= 0; s -= 1)
						i[s] &&
							!e &&
							((t += i[s].swiperSlideSize),
							(o += 1),
							t > r && (e = !0));
				} else if ("current" === e)
					for (let e = l + 1; e < i.length; e += 1)
						(t ? a[e] + n[e] - a[l] < r : a[e] - a[l] < r) &&
							(o += 1);
				else
					for (let e = l - 1; e >= 0; e -= 1)
						a[l] - a[e] < r && (o += 1);
				return o;
			}
			update() {
				const e = this;
				if (!e || e.destroyed) return;
				const { snapGrid: t, params: s } = e;
				function i() {
					const t = e.rtlTranslate ? -1 * e.translate : e.translate,
						s = Math.min(
							Math.max(t, e.maxTranslate()),
							e.minTranslate()
						);
					e.setTranslate(s),
						e.updateActiveIndex(),
						e.updateSlidesClasses();
				}
				let a;
				s.breakpoints && e.setBreakpoint(),
					[...e.el.querySelectorAll('[loading="lazy"]')].forEach(
						(t) => {
							t.complete && B(e, t);
						}
					),
					e.updateSize(),
					e.updateSlides(),
					e.updateProgress(),
					e.updateSlidesClasses(),
					e.params.freeMode && e.params.freeMode.enabled
						? (i(), e.params.autoHeight && e.updateAutoHeight())
						: ((a =
								("auto" === e.params.slidesPerView ||
									e.params.slidesPerView > 1) &&
								e.isEnd &&
								!e.params.centeredSlides
									? e.slideTo(e.slides.length - 1, 0, !1, !0)
									: e.slideTo(e.activeIndex, 0, !1, !0)),
						  a || i()),
					s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
					e.emit("update");
			}
			changeDirection(e, t = !0) {
				const s = this,
					i = s.params.direction;
				return (
					e || (e = "horizontal" === i ? "vertical" : "horizontal"),
					e === i ||
						("horizontal" !== e && "vertical" !== e) ||
						(s.el.classList.remove(
							`${s.params.containerModifierClass}${i}`
						),
						s.el.classList.add(
							`${s.params.containerModifierClass}${e}`
						),
						s.emitContainerClasses(),
						(s.params.direction = e),
						s.slides.forEach((t) => {
							"vertical" === e
								? (t.style.width = "")
								: (t.style.height = "");
						}),
						s.emit("changeDirection"),
						t && s.update()),
					s
				);
			}
			changeLanguageDirection(e) {
				const t = this;
				(t.rtl && "rtl" === e) ||
					(!t.rtl && "ltr" === e) ||
					((t.rtl = "rtl" === e),
					(t.rtlTranslate =
						"horizontal" === t.params.direction && t.rtl),
					t.rtl
						? (t.el.classList.add(
								`${t.params.containerModifierClass}rtl`
						  ),
						  (t.el.dir = "rtl"))
						: (t.el.classList.remove(
								`${t.params.containerModifierClass}rtl`
						  ),
						  (t.el.dir = "ltr")),
					t.update());
			}
			mount(e) {
				const t = this;
				if (t.mounted) return !0;
				let s = e || t.params.el;
				if (
					("string" == typeof s && (s = document.querySelector(s)),
					!s)
				)
					return !1;
				(s.swiper = t), s.shadowEl && (t.isElement = !0);
				const i = () =>
					`.${(t.params.wrapperClass || "")
						.trim()
						.split(" ")
						.join(".")}`;
				let a =
					s && s.shadowRoot && s.shadowRoot.querySelector
						? s.shadowRoot.querySelector(i())
						: f(s, i())[0];
				return (
					!a &&
						t.params.createElements &&
						((a = g("div", t.params.wrapperClass)),
						s.append(a),
						f(s, `.${t.params.slideClass}`).forEach((e) => {
							a.append(e);
						})),
					Object.assign(t, {
						el: s,
						wrapperEl: a,
						slidesEl: t.isElement ? s : a,
						mounted: !0,
						rtl:
							"rtl" === s.dir.toLowerCase() ||
							"rtl" === v(s, "direction"),
						rtlTranslate:
							"horizontal" === t.params.direction &&
							("rtl" === s.dir.toLowerCase() ||
								"rtl" === v(s, "direction")),
						wrongRTL: "-webkit-box" === v(a, "display"),
					}),
					!0
				);
			}
			init(e) {
				const t = this;
				return (
					t.initialized ||
						!1 === t.mount(e) ||
						(t.emit("beforeInit"),
						t.params.breakpoints && t.setBreakpoint(),
						t.addClasses(),
						t.updateSize(),
						t.updateSlides(),
						t.params.watchOverflow && t.checkOverflow(),
						t.params.grabCursor && t.enabled && t.setGrabCursor(),
						t.params.loop && t.virtual && t.params.virtual.enabled
							? t.slideTo(
									t.params.initialSlide +
										t.virtual.slidesBefore,
									0,
									t.params.runCallbacksOnInit,
									!1,
									!0
							  )
							: t.slideTo(
									t.params.initialSlide,
									0,
									t.params.runCallbacksOnInit,
									!1,
									!0
							  ),
						t.params.loop && t.loopCreate(),
						t.attachEvents(),
						[...t.el.querySelectorAll('[loading="lazy"]')].forEach(
							(e) => {
								e.complete
									? B(t, e)
									: e.addEventListener("load", (e) => {
											B(t, e.target);
									  });
							}
						),
						(t.initialized = !0),
						t.emit("init"),
						t.emit("afterInit")),
					t
				);
			}
			destroy(e = !0, t = !0) {
				const s = this,
					{ params: i, el: a, wrapperEl: n, slides: r } = s;
				return (
					void 0 === s.params ||
						s.destroyed ||
						(s.emit("beforeDestroy"),
						(s.initialized = !1),
						s.detachEvents(),
						i.loop && s.loopDestroy(),
						t &&
							(s.removeClasses(),
							a.removeAttribute("style"),
							n.removeAttribute("style"),
							r &&
								r.length &&
								r.forEach((e) => {
									e.classList.remove(
										i.slideVisibleClass,
										i.slideActiveClass,
										i.slideNextClass,
										i.slidePrevClass
									),
										e.removeAttribute("style"),
										e.removeAttribute(
											"data-swiper-slide-index"
										);
								})),
						s.emit("destroy"),
						Object.keys(s.eventsListeners).forEach((e) => {
							s.off(e);
						}),
						!1 !== e &&
							((s.el.swiper = null),
							(function (e) {
								const t = e;
								Object.keys(t).forEach((e) => {
									try {
										t[e] = null;
									} catch (e) {}
									try {
										delete t[e];
									} catch (e) {}
								});
							})(s)),
						(s.destroyed = !0)),
					null
				);
			}
			static extendDefaults(e) {
				p(R, e);
			}
			static get extendedDefaults() {
				return R;
			}
			static get defaults() {
				return H;
			}
			static installModule(e) {
				W.prototype.__modules__ || (W.prototype.__modules__ = []);
				const t = W.prototype.__modules__;
				"function" == typeof e && t.indexOf(e) < 0 && t.push(e);
			}
			static use(e) {
				return Array.isArray(e)
					? (e.forEach((e) => W.installModule(e)), W)
					: (W.installModule(e), W);
			}
		}
		Object.keys(j).forEach((e) => {
			Object.keys(j[e]).forEach((t) => {
				W.prototype[t] = j[e][t];
			});
		}),
			W.use([
				function ({ swiper: e, on: t, emit: s }) {
					const i = l();
					let a = null,
						n = null;
					const r = () => {
							e &&
								!e.destroyed &&
								e.initialized &&
								(s("beforeResize"), s("resize"));
						},
						o = () => {
							e &&
								!e.destroyed &&
								e.initialized &&
								s("orientationchange");
						};
					t("init", () => {
						e.params.resizeObserver && void 0 !== i.ResizeObserver
							? e &&
							  !e.destroyed &&
							  e.initialized &&
							  ((a = new ResizeObserver((t) => {
									n = i.requestAnimationFrame(() => {
										const { width: s, height: i } = e;
										let a = s,
											n = i;
										t.forEach(
											({
												contentBoxSize: t,
												contentRect: s,
												target: i,
											}) => {
												(i && i !== e.el) ||
													((a = s
														? s.width
														: (t[0] || t)
																.inlineSize),
													(n = s
														? s.height
														: (t[0] || t)
																.blockSize));
											}
										),
											(a === s && n === i) || r();
									});
							  })),
							  a.observe(e.el))
							: (i.addEventListener("resize", r),
							  i.addEventListener("orientationchange", o));
					}),
						t("destroy", () => {
							n && i.cancelAnimationFrame(n),
								a &&
									a.unobserve &&
									e.el &&
									(a.unobserve(e.el), (a = null)),
								i.removeEventListener("resize", r),
								i.removeEventListener("orientationchange", o);
						});
				},
				function ({ swiper: e, extendParams: t, on: s, emit: i }) {
					const a = [],
						n = l(),
						r = (t, s = {}) => {
							const r = new (n.MutationObserver ||
								n.WebkitMutationObserver)((t) => {
								if (e.__preventObserver__) return;
								if (1 === t.length)
									return void i("observerUpdate", t[0]);
								const s = function () {
									i("observerUpdate", t[0]);
								};
								n.requestAnimationFrame
									? n.requestAnimationFrame(s)
									: n.setTimeout(s, 0);
							});
							r.observe(t, {
								attributes:
									void 0 === s.attributes || s.attributes,
								childList:
									void 0 === s.childList || s.childList,
								characterData:
									void 0 === s.characterData ||
									s.characterData,
							}),
								a.push(r);
						};
					t({
						observer: !1,
						observeParents: !1,
						observeSlideChildren: !1,
					}),
						s("init", () => {
							if (e.params.observer) {
								if (e.params.observeParents) {
									const t = w(e.el);
									for (let e = 0; e < t.length; e += 1)
										r(t[e]);
								}
								r(e.el, {
									childList: e.params.observeSlideChildren,
								}),
									r(e.wrapperEl, { attributes: !1 });
							}
						}),
						s("destroy", () => {
							a.forEach((e) => {
								e.disconnect();
							}),
								a.splice(0, a.length);
						});
				},
			]);
		const X = W;
		function Y(e, t, s, i) {
			return (
				e.params.createElements &&
					Object.keys(i).forEach((a) => {
						if (!s[a] && !0 === s.auto) {
							let n = f(e.el, `.${i[a]}`)[0];
							n ||
								((n = g("div", i[a])),
								(n.className = i[a]),
								e.el.append(n)),
								(s[a] = n),
								(t[a] = n);
						}
					}),
				s
			);
		}
		function U(e = "") {
			return `.${e
				.trim()
				.replace(/([\.:!+\/])/g, "\\$1")
				.replace(/ /g, ".")}`;
		}
		function K(e) {
			const t = this,
				{ params: s, slidesEl: i } = t;
			s.loop && t.loopDestroy();
			const a = (e) => {
				if ("string" == typeof e) {
					const t = document.createElement("div");
					(t.innerHTML = e),
						i.append(t.children[0]),
						(t.innerHTML = "");
				} else i.append(e);
			};
			if ("object" == typeof e && "length" in e)
				for (let t = 0; t < e.length; t += 1) e[t] && a(e[t]);
			else a(e);
			t.recalcSlides(),
				s.loop && t.loopCreate(),
				(s.observer && !t.isElement) || t.update();
		}
		function Z(e) {
			const t = this,
				{ params: s, activeIndex: i, slidesEl: a } = t;
			s.loop && t.loopDestroy();
			let n = i + 1;
			const r = (e) => {
				if ("string" == typeof e) {
					const t = document.createElement("div");
					(t.innerHTML = e),
						a.prepend(t.children[0]),
						(t.innerHTML = "");
				} else a.prepend(e);
			};
			if ("object" == typeof e && "length" in e) {
				for (let t = 0; t < e.length; t += 1) e[t] && r(e[t]);
				n = i + e.length;
			} else r(e);
			t.recalcSlides(),
				s.loop && t.loopCreate(),
				(s.observer && !t.isElement) || t.update(),
				t.slideTo(n, 0, !1);
		}
		function J(e, t) {
			const s = this,
				{ params: i, activeIndex: a, slidesEl: n } = s;
			let r = a;
			i.loop &&
				((r -= s.loopedSlides), s.loopDestroy(), s.recalcSlides());
			const l = s.slides.length;
			if (e <= 0) return void s.prependSlide(t);
			if (e >= l) return void s.appendSlide(t);
			let o = r > e ? r + 1 : r;
			const d = [];
			for (let t = l - 1; t >= e; t -= 1) {
				const e = s.slides[t];
				e.remove(), d.unshift(e);
			}
			if ("object" == typeof t && "length" in t) {
				for (let e = 0; e < t.length; e += 1) t[e] && n.append(t[e]);
				o = r > e ? r + t.length : r;
			} else n.append(t);
			for (let e = 0; e < d.length; e += 1) n.append(d[e]);
			s.recalcSlides(),
				i.loop && s.loopCreate(),
				(i.observer && !s.isElement) || s.update(),
				i.loop
					? s.slideTo(o + s.loopedSlides, 0, !1)
					: s.slideTo(o, 0, !1);
		}
		function Q(e) {
			const t = this,
				{ params: s, activeIndex: i } = t;
			let a = i;
			s.loop && ((a -= t.loopedSlides), t.loopDestroy());
			let n,
				r = a;
			if ("object" == typeof e && "length" in e) {
				for (let s = 0; s < e.length; s += 1)
					(n = e[s]),
						t.slides[n] && t.slides[n].remove(),
						n < r && (r -= 1);
				r = Math.max(r, 0);
			} else
				(n = e),
					t.slides[n] && t.slides[n].remove(),
					n < r && (r -= 1),
					(r = Math.max(r, 0));
			t.recalcSlides(),
				s.loop && t.loopCreate(),
				(s.observer && !t.isElement) || t.update(),
				s.loop
					? t.slideTo(r + t.loopedSlides, 0, !1)
					: t.slideTo(r, 0, !1);
		}
		function ee() {
			const e = this,
				t = [];
			for (let s = 0; s < e.slides.length; s += 1) t.push(s);
			e.removeSlide(t);
		}
		function te(e, t) {
			const s = h(t);
			return (
				s !== t &&
					((s.style.backfaceVisibility = "hidden"),
					(s.style["-webkit-backface-visibility"] = "hidden")),
				s
			);
		}
		function se(e, t, s) {
			const i = "swiper-slide-shadow" + (s ? `-${s}` : ""),
				a = h(t);
			let n = a.querySelector(`.${i}`);
			return (
				n ||
					((n = g("div", "swiper-slide-shadow" + (s ? `-${s}` : ""))),
					a.append(n)),
				n
			);
		}
		X.use([
			function ({ swiper: e, extendParams: t, on: s, emit: i }) {
				const a = "swiper-pagination";
				let n;
				t({
					pagination: {
						el: null,
						bulletElement: "span",
						clickable: !1,
						hideOnClick: !1,
						renderBullet: null,
						renderProgressbar: null,
						renderFraction: null,
						renderCustom: null,
						progressbarOpposite: !1,
						type: "bullets",
						dynamicBullets: !1,
						dynamicMainBullets: 1,
						formatFractionCurrent: (e) => e,
						formatFractionTotal: (e) => e,
						bulletClass: `${a}-bullet`,
						bulletActiveClass: `${a}-bullet-active`,
						modifierClass: `${a}-`,
						currentClass: `${a}-current`,
						totalClass: `${a}-total`,
						hiddenClass: `${a}-hidden`,
						progressbarFillClass: `${a}-progressbar-fill`,
						progressbarOppositeClass: `${a}-progressbar-opposite`,
						clickableClass: `${a}-clickable`,
						lockClass: `${a}-lock`,
						horizontalClass: `${a}-horizontal`,
						verticalClass: `${a}-vertical`,
						paginationDisabledClass: `${a}-disabled`,
					},
				}),
					(e.pagination = { el: null, bullets: [] });
				let r = 0;
				const l = (e) => (
					Array.isArray(e) || (e = [e].filter((e) => !!e)), e
				);
				function o() {
					return (
						!e.params.pagination.el ||
						!e.pagination.el ||
						(Array.isArray(e.pagination.el) &&
							0 === e.pagination.el.length)
					);
				}
				function d(t, s) {
					const { bulletActiveClass: i } = e.params.pagination;
					t &&
						(t =
							t[
								("prev" === s ? "previous" : "next") +
									"ElementSibling"
							]) &&
						(t.classList.add(`${i}-${s}`),
						(t =
							t[
								("prev" === s ? "previous" : "next") +
									"ElementSibling"
							]) && t.classList.add(`${i}-${s}-${s}`));
				}
				function c(t) {
					const s = t.target.closest(
						U(e.params.pagination.bulletClass)
					);
					if (!s) return;
					t.preventDefault();
					const i = b(s) * e.params.slidesPerGroup;
					if (e.params.loop) {
						if (e.realIndex === i) return;
						(i < e.loopedSlides ||
							i > e.slides.length - e.loopedSlides) &&
							e.loopFix({
								direction: i < e.loopedSlides ? "prev" : "next",
								activeSlideIndex: i,
								slideTo: !1,
							}),
							e.slideToLoop(i);
					} else e.slideTo(i);
				}
				function p() {
					const t = e.rtl,
						s = e.params.pagination;
					if (o()) return;
					let a,
						c = e.pagination.el;
					c = l(c);
					const p =
							e.virtual && e.params.virtual.enabled
								? e.virtual.slides.length
								: e.slides.length,
						u = e.params.loop
							? Math.ceil(p / e.params.slidesPerGroup)
							: e.snapGrid.length;
					if (
						((a = e.params.loop
							? e.params.slidesPerGroup > 1
								? Math.floor(
										e.realIndex / e.params.slidesPerGroup
								  )
								: e.realIndex
							: void 0 !== e.snapIndex
							? e.snapIndex
							: e.activeIndex || 0),
						"bullets" === s.type &&
							e.pagination.bullets &&
							e.pagination.bullets.length > 0)
					) {
						const i = e.pagination.bullets;
						let l, o, p;
						if (
							(s.dynamicBullets &&
								((n = y(
									i[0],
									e.isHorizontal() ? "width" : "height",
									!0
								)),
								c.forEach((t) => {
									t.style[
										e.isHorizontal() ? "width" : "height"
									] = n * (s.dynamicMainBullets + 4) + "px";
								}),
								s.dynamicMainBullets > 1 &&
									void 0 !== e.previousIndex &&
									((r += a - (e.previousIndex || 0)),
									r > s.dynamicMainBullets - 1
										? (r = s.dynamicMainBullets - 1)
										: r < 0 && (r = 0)),
								(l = Math.max(a - r, 0)),
								(o =
									l +
									(Math.min(i.length, s.dynamicMainBullets) -
										1)),
								(p = (o + l) / 2)),
							i.forEach((e) => {
								const t = [
									...[
										"",
										"-next",
										"-next-next",
										"-prev",
										"-prev-prev",
										"-main",
									].map((e) => `${s.bulletActiveClass}${e}`),
								]
									.map((e) =>
										"string" == typeof e && e.includes(" ")
											? e.split(" ")
											: e
									)
									.flat();
								e.classList.remove(...t);
							}),
							c.length > 1)
						)
							i.forEach((e) => {
								const t = b(e);
								t === a &&
									e.classList.add(
										...s.bulletActiveClass.split(" ")
									),
									s.dynamicBullets &&
										(t >= l &&
											t <= o &&
											e.classList.add(
												...`${s.bulletActiveClass}-main`.split(
													" "
												)
											),
										t === l && d(e, "prev"),
										t === o && d(e, "next"));
							});
						else {
							const e = i[a];
							if (
								(e &&
									e.classList.add(
										...s.bulletActiveClass.split(" ")
									),
								s.dynamicBullets)
							) {
								const e = i[l],
									t = i[o];
								for (let e = l; e <= o; e += 1)
									i[e] &&
										i[e].classList.add(
											...`${s.bulletActiveClass}-main`.split(
												" "
											)
										);
								d(e, "prev"), d(t, "next");
							}
						}
						if (s.dynamicBullets) {
							const a = Math.min(
									i.length,
									s.dynamicMainBullets + 4
								),
								r = (n * a - n) / 2 - p * n,
								l = t ? "right" : "left";
							i.forEach((t) => {
								t.style[
									e.isHorizontal() ? l : "top"
								] = `${r}px`;
							});
						}
					}
					c.forEach((t, n) => {
						if (
							("fraction" === s.type &&
								(t
									.querySelectorAll(U(s.currentClass))
									.forEach((e) => {
										e.textContent = s.formatFractionCurrent(
											a + 1
										);
									}),
								t
									.querySelectorAll(U(s.totalClass))
									.forEach((e) => {
										e.textContent =
											s.formatFractionTotal(u);
									})),
							"progressbar" === s.type)
						) {
							let i;
							i = s.progressbarOpposite
								? e.isHorizontal()
									? "vertical"
									: "horizontal"
								: e.isHorizontal()
								? "horizontal"
								: "vertical";
							const n = (a + 1) / u;
							let r = 1,
								l = 1;
							"horizontal" === i ? (r = n) : (l = n),
								t
									.querySelectorAll(U(s.progressbarFillClass))
									.forEach((t) => {
										(t.style.transform = `translate3d(0,0,0) scaleX(${r}) scaleY(${l})`),
											(t.style.transitionDuration = `${e.params.speed}ms`);
									});
						}
						"custom" === s.type && s.renderCustom
							? ((t.innerHTML = s.renderCustom(e, a + 1, u)),
							  0 === n && i("paginationRender", t))
							: (0 === n && i("paginationRender", t),
							  i("paginationUpdate", t)),
							e.params.watchOverflow &&
								e.enabled &&
								t.classList[e.isLocked ? "add" : "remove"](
									s.lockClass
								);
					});
				}
				function u() {
					const t = e.params.pagination;
					if (o()) return;
					const s =
						e.virtual && e.params.virtual.enabled
							? e.virtual.slides.length
							: e.slides.length;
					let a = e.pagination.el;
					a = l(a);
					let n = "";
					if ("bullets" === t.type) {
						let i = e.params.loop
							? Math.ceil(s / e.params.slidesPerGroup)
							: e.snapGrid.length;
						e.params.freeMode &&
							e.params.freeMode.enabled &&
							i > s &&
							(i = s);
						for (let s = 0; s < i; s += 1)
							t.renderBullet
								? (n += t.renderBullet.call(
										e,
										s,
										t.bulletClass
								  ))
								: (n += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
					}
					"fraction" === t.type &&
						(n = t.renderFraction
							? t.renderFraction.call(
									e,
									t.currentClass,
									t.totalClass
							  )
							: `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
						"progressbar" === t.type &&
							(n = t.renderProgressbar
								? t.renderProgressbar.call(
										e,
										t.progressbarFillClass
								  )
								: `<span class="${t.progressbarFillClass}"></span>`),
						(e.pagination.bullets = []),
						a.forEach((s) => {
							"custom" !== t.type && (s.innerHTML = n || ""),
								"bullets" === t.type &&
									e.pagination.bullets.push(
										...s.querySelectorAll(U(t.bulletClass))
									);
						}),
						"custom" !== t.type && i("paginationRender", a[0]);
				}
				function m() {
					e.params.pagination = Y(
						e,
						e.originalParams.pagination,
						e.params.pagination,
						{ el: "swiper-pagination" }
					);
					const t = e.params.pagination;
					if (!t.el) return;
					let s;
					"string" == typeof t.el &&
						e.isElement &&
						(s = e.el.shadowRoot.querySelector(t.el)),
						s ||
							"string" != typeof t.el ||
							(s = [...document.querySelectorAll(t.el)]),
						s || (s = t.el),
						s &&
							0 !== s.length &&
							(e.params.uniqueNavElements &&
								"string" == typeof t.el &&
								Array.isArray(s) &&
								s.length > 1 &&
								((s = [...e.el.querySelectorAll(t.el)]),
								s.length > 1 &&
									(s = s.filter(
										(t) => w(t, ".swiper")[0] === e.el
									)[0])),
							Array.isArray(s) && 1 === s.length && (s = s[0]),
							Object.assign(e.pagination, { el: s }),
							(s = l(s)),
							s.forEach((s) => {
								"bullets" === t.type &&
									t.clickable &&
									s.classList.add(t.clickableClass),
									s.classList.add(t.modifierClass + t.type),
									s.classList.add(
										e.isHorizontal()
											? t.horizontalClass
											: t.verticalClass
									),
									"bullets" === t.type &&
										t.dynamicBullets &&
										(s.classList.add(
											`${t.modifierClass}${t.type}-dynamic`
										),
										(r = 0),
										t.dynamicMainBullets < 1 &&
											(t.dynamicMainBullets = 1)),
									"progressbar" === t.type &&
										t.progressbarOpposite &&
										s.classList.add(
											t.progressbarOppositeClass
										),
									t.clickable &&
										s.addEventListener("click", c),
									e.enabled || s.classList.add(t.lockClass);
							}));
				}
				function h() {
					const t = e.params.pagination;
					if (o()) return;
					let s = e.pagination.el;
					s &&
						((s = l(s)),
						s.forEach((s) => {
							s.classList.remove(t.hiddenClass),
								s.classList.remove(t.modifierClass + t.type),
								s.classList.remove(
									e.isHorizontal()
										? t.horizontalClass
										: t.verticalClass
								),
								t.clickable &&
									s.removeEventListener("click", c);
						})),
						e.pagination.bullets &&
							e.pagination.bullets.forEach((e) =>
								e.classList.remove(
									...t.bulletActiveClass.split(" ")
								)
							);
				}
				s("init", () => {
					!1 === e.params.pagination.enabled ? f() : (m(), u(), p());
				}),
					s("activeIndexChange", () => {
						void 0 === e.snapIndex && p();
					}),
					s("snapIndexChange", () => {
						p();
					}),
					s("snapGridLengthChange", () => {
						u(), p();
					}),
					s("destroy", () => {
						h();
					}),
					s("enable disable", () => {
						let { el: t } = e.pagination;
						t &&
							((t = l(t)),
							t.forEach((t) =>
								t.classList[e.enabled ? "remove" : "add"](
									e.params.pagination.lockClass
								)
							));
					}),
					s("lock unlock", () => {
						p();
					}),
					s("click", (t, s) => {
						const a = s.target;
						let { el: n } = e.pagination;
						if (
							(Array.isArray(n) || (n = [n].filter((e) => !!e)),
							e.params.pagination.el &&
								e.params.pagination.hideOnClick &&
								n &&
								n.length > 0 &&
								!a.classList.contains(
									e.params.pagination.bulletClass
								))
						) {
							if (
								e.navigation &&
								((e.navigation.nextEl &&
									a === e.navigation.nextEl) ||
									(e.navigation.prevEl &&
										a === e.navigation.prevEl))
							)
								return;
							const t = n[0].classList.contains(
								e.params.pagination.hiddenClass
							);
							i(!0 === t ? "paginationShow" : "paginationHide"),
								n.forEach((t) =>
									t.classList.toggle(
										e.params.pagination.hiddenClass
									)
								);
						}
					});
				const f = () => {
					e.el.classList.add(
						e.params.pagination.paginationDisabledClass
					);
					let { el: t } = e.pagination;
					t &&
						((t = l(t)),
						t.forEach((t) =>
							t.classList.add(
								e.params.pagination.paginationDisabledClass
							)
						)),
						h();
				};
				Object.assign(e.pagination, {
					enable: () => {
						e.el.classList.remove(
							e.params.pagination.paginationDisabledClass
						);
						let { el: t } = e.pagination;
						t &&
							((t = l(t)),
							t.forEach((t) =>
								t.classList.remove(
									e.params.pagination.paginationDisabledClass
								)
							)),
							m(),
							u(),
							p();
					},
					disable: f,
					render: u,
					update: p,
					init: m,
					destroy: h,
				});
			},
			function ({ swiper: e, extendParams: t, on: s }) {
				t({
					creativeEffect: {
						limitProgress: 1,
						shadowPerProgress: !1,
						progressMultiplier: 1,
						perspective: !0,
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
				const i = (e) => ("string" == typeof e ? e : `${e}px`);
				!(function (e) {
					const {
						effect: t,
						swiper: s,
						on: i,
						setTranslate: a,
						setTransition: n,
						overwriteParams: r,
						perspective: l,
						recreateShadows: o,
						getEffectParams: d,
					} = e;
					let c;
					i("beforeInit", () => {
						if (s.params.effect !== t) return;
						s.classNames.push(
							`${s.params.containerModifierClass}${t}`
						),
							l &&
								l() &&
								s.classNames.push(
									`${s.params.containerModifierClass}3d`
								);
						const e = r ? r() : {};
						Object.assign(s.params, e),
							Object.assign(s.originalParams, e);
					}),
						i("setTranslate", () => {
							s.params.effect === t && a();
						}),
						i("setTransition", (e, i) => {
							s.params.effect === t && n(i);
						}),
						i("transitionEnd", () => {
							if (s.params.effect === t && o) {
								if (!d || !d().slideShadows) return;
								s.slides.forEach((e) => {
									e.querySelectorAll(
										".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
									).forEach((e) => e.remove());
								}),
									o();
							}
						}),
						i("virtualUpdate", () => {
							s.params.effect === t &&
								(s.slides.length || (c = !0),
								requestAnimationFrame(() => {
									c &&
										s.slides &&
										s.slides.length &&
										(a(), (c = !1));
								}));
						});
				})({
					effect: "creative",
					swiper: e,
					on: s,
					setTranslate: () => {
						const {
								slides: t,
								wrapperEl: s,
								slidesSizesGrid: a,
							} = e,
							n = e.params.creativeEffect,
							{ progressMultiplier: r } = n,
							l = e.params.centeredSlides;
						if (l) {
							const t =
								a[0] / 2 - e.params.slidesOffsetBefore || 0;
							s.style.transform = `translateX(calc(50% - ${t}px))`;
						}
						for (let s = 0; s < t.length; s += 1) {
							const a = t[s],
								o = a.progress,
								d = Math.min(
									Math.max(a.progress, -n.limitProgress),
									n.limitProgress
								);
							let c = d;
							l ||
								(c = Math.min(
									Math.max(
										a.originalProgress,
										-n.limitProgress
									),
									n.limitProgress
								));
							const p = a.swiperSlideOffset,
								u = [
									e.params.cssMode ? -p - e.translate : -p,
									0,
									0,
								],
								m = [0, 0, 0];
							let h = !1;
							e.isHorizontal() || ((u[1] = u[0]), (u[0] = 0));
							let f = {
								translate: [0, 0, 0],
								rotate: [0, 0, 0],
								scale: 1,
								opacity: 1,
							};
							d < 0
								? ((f = n.next), (h = !0))
								: d > 0 && ((f = n.prev), (h = !0)),
								u.forEach((e, t) => {
									u[t] = `calc(${e}px + (${i(
										f.translate[t]
									)} * ${Math.abs(d * r)}))`;
								}),
								m.forEach((e, t) => {
									m[t] = f.rotate[t] * Math.abs(d * r);
								}),
								(a.style.zIndex =
									-Math.abs(Math.round(o)) + t.length);
							const g = u.join(", "),
								v = `rotateX(${m[0]}deg) rotateY(${m[1]}deg) rotateZ(${m[2]}deg)`,
								b =
									c < 0
										? `scale(${1 + (1 - f.scale) * c * r})`
										: `scale(${1 - (1 - f.scale) * c * r})`,
								w =
									c < 0
										? 1 + (1 - f.opacity) * c * r
										: 1 - (1 - f.opacity) * c * r,
								y = `translate3d(${g}) ${v} ${b}`;
							if ((h && f.shadow) || !h) {
								let e = a.querySelector(".swiper-slide-shadow");
								if ((!e && f.shadow && (e = se(0, a)), e)) {
									const t = n.shadowPerProgress
										? d * (1 / n.limitProgress)
										: d;
									e.style.opacity = Math.min(
										Math.max(Math.abs(t), 0),
										1
									);
								}
							}
							const S = te(0, a);
							(S.style.transform = y),
								(S.style.opacity = w),
								f.origin &&
									(S.style.transformOrigin = f.origin);
						}
					},
					setTransition: (t) => {
						const s = e.slides.map((e) => h(e));
						s.forEach((e) => {
							(e.style.transitionDuration = `${t}ms`),
								e
									.querySelectorAll(".swiper-slide-shadow")
									.forEach((e) => {
										e.style.transitionDuration = `${t}ms`;
									});
						}),
							(function ({
								swiper: e,
								duration: t,
								transformElements: s,
								allSlides: i,
							}) {
								const { activeIndex: a } = e;
								if (e.params.virtualTranslate && 0 !== t) {
									let t,
										n = !1;
									(t = i
										? s
										: s.filter((t) => {
												const s = t.classList.contains(
													"swiper-slide-transform"
												)
													? ((t) =>
															t.parentElement
																? t.parentElement
																: e.slides.filter(
																		(e) =>
																			e.shadowEl &&
																			e.shadowEl ===
																				t.parentNode
																  )[0])(t)
													: t;
												return e.getSlideIndex(s) === a;
										  })),
										t.forEach((t) => {
											!(function (e, t) {
												t &&
													e.addEventListener(
														"transitionend",
														function s(i) {
															i.target === e &&
																(t.call(e, i),
																e.removeEventListener(
																	"transitionend",
																	s
																));
														}
													);
											})(t, () => {
												if (n) return;
												if (!e || e.destroyed) return;
												(n = !0), (e.animating = !1);
												const t =
													new window.CustomEvent(
														"transitionend",
														{
															bubbles: !0,
															cancelable: !0,
														}
													);
												e.wrapperEl.dispatchEvent(t);
											});
										});
								}
							})({
								swiper: e,
								duration: t,
								transformElements: s,
								allSlides: !0,
							});
					},
					perspective: () => e.params.creativeEffect.perspective,
					overwriteParams: () => ({
						watchSlidesProgress: !0,
						virtualTranslate: !e.params.cssMode,
					}),
				});
			},
			function ({ swiper: e, extendParams: t, on: s, emit: i }) {
				t({
					navigation: {
						nextEl: null,
						prevEl: null,
						hideOnClick: !1,
						disabledClass: "swiper-button-disabled",
						hiddenClass: "swiper-button-hidden",
						lockClass: "swiper-button-lock",
						navigationDisabledClass: "swiper-navigation-disabled",
					},
				}),
					(e.navigation = { nextEl: null, prevEl: null });
				const a = (e) => (
					Array.isArray(e) || (e = [e].filter((e) => !!e)), e
				);
				function n(t) {
					let s;
					return t &&
						"string" == typeof t &&
						e.isElement &&
						((s = e.el.shadowRoot.querySelector(t)), s)
						? s
						: (t &&
								("string" == typeof t &&
									(s = [...document.querySelectorAll(t)]),
								e.params.uniqueNavElements &&
									"string" == typeof t &&
									s.length > 1 &&
									1 === e.el.querySelectorAll(t).length &&
									(s = e.el.querySelector(t))),
						  t && !s ? t : s);
				}
				function r(t, s) {
					const i = e.params.navigation;
					(t = a(t)).forEach((t) => {
						t &&
							(t.classList[s ? "add" : "remove"](
								...i.disabledClass.split(" ")
							),
							"BUTTON" === t.tagName && (t.disabled = s),
							e.params.watchOverflow &&
								e.enabled &&
								t.classList[e.isLocked ? "add" : "remove"](
									i.lockClass
								));
					});
				}
				function l() {
					const { nextEl: t, prevEl: s } = e.navigation;
					if (e.params.loop) return r(s, !1), void r(t, !1);
					r(s, e.isBeginning && !e.params.rewind),
						r(t, e.isEnd && !e.params.rewind);
				}
				function o(t) {
					t.preventDefault(),
						(!e.isBeginning || e.params.loop || e.params.rewind) &&
							(e.slidePrev(), i("navigationPrev"));
				}
				function d(t) {
					t.preventDefault(),
						(!e.isEnd || e.params.loop || e.params.rewind) &&
							(e.slideNext(), i("navigationNext"));
				}
				function c() {
					const t = e.params.navigation;
					if (
						((e.params.navigation = Y(
							e,
							e.originalParams.navigation,
							e.params.navigation,
							{
								nextEl: "swiper-button-next",
								prevEl: "swiper-button-prev",
							}
						)),
						!t.nextEl && !t.prevEl)
					)
						return;
					let s = n(t.nextEl),
						i = n(t.prevEl);
					Object.assign(e.navigation, { nextEl: s, prevEl: i }),
						(s = a(s)),
						(i = a(i));
					const r = (s, i) => {
						s && s.addEventListener("click", "next" === i ? d : o),
							!e.enabled &&
								s &&
								s.classList.add(...t.lockClass.split(" "));
					};
					s.forEach((e) => r(e, "next")),
						i.forEach((e) => r(e, "prev"));
				}
				function p() {
					let { nextEl: t, prevEl: s } = e.navigation;
					(t = a(t)), (s = a(s));
					const i = (t, s) => {
						t.removeEventListener("click", "next" === s ? d : o),
							t.classList.remove(
								...e.params.navigation.disabledClass.split(" ")
							);
					};
					t.forEach((e) => i(e, "next")),
						s.forEach((e) => i(e, "prev"));
				}
				s("init", () => {
					!1 === e.params.navigation.enabled ? u() : (c(), l());
				}),
					s("toEdge fromEdge lock unlock", () => {
						l();
					}),
					s("destroy", () => {
						p();
					}),
					s("enable disable", () => {
						let { nextEl: t, prevEl: s } = e.navigation;
						(t = a(t)),
							(s = a(s)),
							[...t, ...s]
								.filter((e) => !!e)
								.forEach((t) =>
									t.classList[e.enabled ? "remove" : "add"](
										e.params.navigation.lockClass
									)
								);
					}),
					s("click", (t, s) => {
						let { nextEl: n, prevEl: r } = e.navigation;
						(n = a(n)), (r = a(r));
						const l = s.target;
						if (
							e.params.navigation.hideOnClick &&
							!r.includes(l) &&
							!n.includes(l)
						) {
							if (
								e.pagination &&
								e.params.pagination &&
								e.params.pagination.clickable &&
								(e.pagination.el === l ||
									e.pagination.el.contains(l))
							)
								return;
							let t;
							n.length
								? (t = n[0].classList.contains(
										e.params.navigation.hiddenClass
								  ))
								: r.length &&
								  (t = r[0].classList.contains(
										e.params.navigation.hiddenClass
								  )),
								i(
									!0 === t
										? "navigationShow"
										: "navigationHide"
								),
								[...n, ...r]
									.filter((e) => !!e)
									.forEach((t) =>
										t.classList.toggle(
											e.params.navigation.hiddenClass
										)
									);
						}
					});
				const u = () => {
					e.el.classList.add(
						...e.params.navigation.navigationDisabledClass.split(
							" "
						)
					),
						p();
				};
				Object.assign(e.navigation, {
					enable: () => {
						e.el.classList.remove(
							...e.params.navigation.navigationDisabledClass.split(
								" "
							)
						),
							c(),
							l();
					},
					disable: u,
					update: l,
					init: c,
					destroy: p,
				});
			},
			function ({ swiper: e, extendParams: t, on: s }) {
				t({
					thumbs: {
						swiper: null,
						multipleActiveThumbs: !0,
						autoScrollOffset: 0,
						slideThumbActiveClass: "swiper-slide-thumb-active",
						thumbsContainerClass: "swiper-thumbs",
					},
				});
				let i = !1,
					a = !1;
				function r() {
					const t = e.thumbs.swiper;
					if (!t || t.destroyed) return;
					const s = t.clickedIndex,
						i = t.clickedSlide;
					if (
						i &&
						i.classList.contains(
							e.params.thumbs.slideThumbActiveClass
						)
					)
						return;
					if (null == s) return;
					let a;
					(a = t.params.loop
						? parseInt(
								t.clickedSlide.getAttribute(
									"data-swiper-slide-index"
								),
								10
						  )
						: s),
						e.params.loop ? e.slideToLoop(a) : e.slideTo(a);
				}
				function l() {
					const { thumbs: t } = e.params;
					if (i) return !1;
					i = !0;
					const s = e.constructor;
					if (t.swiper instanceof s)
						(e.thumbs.swiper = t.swiper),
							Object.assign(e.thumbs.swiper.originalParams, {
								watchSlidesProgress: !0,
								slideToClickedSlide: !1,
							}),
							Object.assign(e.thumbs.swiper.params, {
								watchSlidesProgress: !0,
								slideToClickedSlide: !1,
							}),
							e.thumbs.swiper.update();
					else if (c(t.swiper)) {
						const i = Object.assign({}, t.swiper);
						Object.assign(i, {
							watchSlidesProgress: !0,
							slideToClickedSlide: !1,
						}),
							(e.thumbs.swiper = new s(i)),
							(a = !0);
					}
					return (
						e.thumbs.swiper.el.classList.add(
							e.params.thumbs.thumbsContainerClass
						),
						e.thumbs.swiper.on("tap", r),
						!0
					);
				}
				function o(t) {
					const s = e.thumbs.swiper;
					if (!s || s.destroyed) return;
					const i =
						"auto" === s.params.slidesPerView
							? s.slidesPerViewDynamic()
							: s.params.slidesPerView;
					let a = 1;
					const n = e.params.thumbs.slideThumbActiveClass;
					if (
						(e.params.slidesPerView > 1 &&
							!e.params.centeredSlides &&
							(a = e.params.slidesPerView),
						e.params.thumbs.multipleActiveThumbs || (a = 1),
						(a = Math.floor(a)),
						s.slides.forEach((e) => e.classList.remove(n)),
						s.params.loop ||
							(s.params.virtual && s.params.virtual.enabled))
					)
						for (let t = 0; t < a; t += 1)
							f(
								s.slidesEl,
								`[data-swiper-slide-index="${e.realIndex + t}"]`
							).forEach((e) => {
								e.classList.add(n);
							});
					else
						for (let t = 0; t < a; t += 1)
							s.slides[e.realIndex + t] &&
								s.slides[e.realIndex + t].classList.add(n);
					const r = e.params.thumbs.autoScrollOffset,
						l = r && !s.params.loop;
					if (e.realIndex !== s.realIndex || l) {
						const a = s.activeIndex;
						let n, o;
						if (s.params.loop) {
							const t = s.slides.filter(
								(t) =>
									t.getAttribute(
										"data-swiper-slide-index"
									) === `${e.realIndex}`
							)[0];
							(n = s.slides.indexOf(t)),
								(o =
									e.activeIndex > e.previousIndex
										? "next"
										: "prev");
						} else
							(n = e.realIndex),
								(o = n > e.previousIndex ? "next" : "prev");
						l && (n += "next" === o ? r : -1 * r),
							s.visibleSlidesIndexes &&
								s.visibleSlidesIndexes.indexOf(n) < 0 &&
								(s.params.centeredSlides
									? (n =
											n > a
												? n - Math.floor(i / 2) + 1
												: n + Math.floor(i / 2) - 1)
									: n > a && s.params.slidesPerGroup,
								s.slideTo(n, t ? 0 : void 0));
					}
				}
				(e.thumbs = { swiper: null }),
					s("beforeInit", () => {
						const { thumbs: t } = e.params;
						if (t && t.swiper)
							if (
								"string" == typeof t.swiper ||
								t.swiper instanceof HTMLElement
							) {
								const s = n(),
									i = () => {
										const i =
											"string" == typeof t.swiper
												? s.querySelector(t.swiper)
												: t.swiper;
										if (i && i.swiper)
											(t.swiper = i.swiper), l(), o(!0);
										else if (i) {
											const s = (a) => {
												(t.swiper = a.detail[0]),
													i.removeEventListener(
														"init",
														s
													),
													l(),
													o(!0),
													t.swiper.update(),
													e.update();
											};
											i.addEventListener("init", s);
										}
										return i;
									},
									a = () => {
										e.destroyed ||
											i() ||
											requestAnimationFrame(a);
									};
								requestAnimationFrame(a);
							} else l(), o(!0);
					}),
					s("slideChange update resize observerUpdate", () => {
						o();
					}),
					s("setTransition", (t, s) => {
						const i = e.thumbs.swiper;
						i && !i.destroyed && i.setTransition(s);
					}),
					s("beforeDestroy", () => {
						const t = e.thumbs.swiper;
						t && !t.destroyed && a && t.destroy();
					}),
					Object.assign(e.thumbs, { init: l, update: o });
			},
			function ({ swiper: e }) {
				Object.assign(e, {
					appendSlide: K.bind(e),
					prependSlide: Z.bind(e),
					addSlide: J.bind(e),
					removeSlide: Q.bind(e),
					removeAllSlides: ee.bind(e),
				});
			},
			function ({
				swiper: e,
				extendParams: t,
				on: s,
				emit: i,
				params: a,
			}) {
				let r, l;
				(e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
					t({
						autoplay: {
							enabled: !1,
							delay: 3e3,
							waitForTransition: !0,
							disableOnInteraction: !0,
							stopOnLastSlide: !1,
							reverseDirection: !1,
							pauseOnMouseEnter: !1,
						},
					});
				let o,
					d,
					c,
					p,
					u,
					m,
					h,
					f = a && a.autoplay ? a.autoplay.delay : 3e3,
					g = a && a.autoplay ? a.autoplay.delay : 3e3,
					v = new Date().getTime;
				function b(t) {
					e &&
						!e.destroyed &&
						e.wrapperEl &&
						t.target === e.wrapperEl &&
						(e.wrapperEl.removeEventListener("transitionend", b),
						x());
				}
				const w = () => {
						if (e.destroyed || !e.autoplay.running) return;
						e.autoplay.paused ? (d = !0) : d && ((g = o), (d = !1));
						const t = e.autoplay.paused
							? o
							: v + g - new Date().getTime();
						(e.autoplay.timeLeft = t),
							i("autoplayTimeLeft", t, t / f),
							(l = requestAnimationFrame(() => {
								w();
							}));
					},
					y = (t) => {
						if (e.destroyed || !e.autoplay.running) return;
						cancelAnimationFrame(l), w();
						let s = void 0 === t ? e.params.autoplay.delay : t;
						(f = e.params.autoplay.delay),
							(g = e.params.autoplay.delay);
						const a = (() => {
							let t;
							if (
								((t =
									e.virtual && e.params.virtual.enabled
										? e.slides.filter((e) =>
												e.classList.contains(
													"swiper-slide-active"
												)
										  )[0]
										: e.slides[e.activeIndex]),
								t)
							)
								return parseInt(
									t.getAttribute("data-swiper-autoplay"),
									10
								);
						})();
						!Number.isNaN(a) &&
							a > 0 &&
							void 0 === t &&
							((s = a), (f = a), (g = a)),
							(o = s);
						const n = e.params.speed,
							d = () => {
								e &&
									!e.destroyed &&
									(e.params.autoplay.reverseDirection
										? !e.isBeginning ||
										  e.params.loop ||
										  e.params.rewind
											? (e.slidePrev(n, !0, !0),
											  i("autoplay"))
											: e.params.autoplay
													.stopOnLastSlide ||
											  (e.slideTo(
													e.slides.length - 1,
													n,
													!0,
													!0
											  ),
											  i("autoplay"))
										: !e.isEnd ||
										  e.params.loop ||
										  e.params.rewind
										? (e.slideNext(n, !0, !0),
										  i("autoplay"))
										: e.params.autoplay.stopOnLastSlide ||
										  (e.slideTo(0, n, !0, !0),
										  i("autoplay")),
									e.params.cssMode &&
										((v = new Date().getTime()),
										requestAnimationFrame(() => {
											y();
										})));
							};
						return (
							s > 0
								? (clearTimeout(r),
								  (r = setTimeout(() => {
										d();
								  }, s)))
								: requestAnimationFrame(() => {
										d();
								  }),
							s
						);
					},
					S = () => {
						(e.autoplay.running = !0), y(), i("autoplayStart");
					},
					E = () => {
						(e.autoplay.running = !1),
							clearTimeout(r),
							cancelAnimationFrame(l),
							i("autoplayStop");
					},
					T = (t, s) => {
						if (e.destroyed || !e.autoplay.running) return;
						clearTimeout(r), t || (h = !0);
						const a = () => {
							i("autoplayPause"),
								e.params.autoplay.waitForTransition
									? e.wrapperEl.addEventListener(
											"transitionend",
											b
									  )
									: x();
						};
						if (((e.autoplay.paused = !0), s))
							return (
								m && (o = e.params.autoplay.delay),
								(m = !1),
								void a()
							);
						const n = o || e.params.autoplay.delay;
						(o = n - (new Date().getTime() - v)),
							(e.isEnd && o < 0 && !e.params.loop) ||
								(o < 0 && (o = 0), a());
					},
					x = () => {
						(e.isEnd && o < 0 && !e.params.loop) ||
							e.destroyed ||
							!e.autoplay.running ||
							((v = new Date().getTime()),
							h ? ((h = !1), y(o)) : y(),
							(e.autoplay.paused = !1),
							i("autoplayResume"));
					},
					C = () => {
						if (e.destroyed || !e.autoplay.running) return;
						const t = n();
						"hidden" === t.visibilityState && ((h = !0), T(!0)),
							"visible" === t.visibilityState && x();
					},
					L = (e) => {
						"mouse" === e.pointerType && ((h = !0), T(!0));
					},
					_ = (t) => {
						"mouse" === t.pointerType && e.autoplay.paused && x();
					};
				s("init", () => {
					e.params.autoplay.enabled &&
						(e.params.autoplay.pauseOnMouseEnter &&
							(e.el.addEventListener("pointerenter", L),
							e.el.addEventListener("pointerleave", _)),
						n().addEventListener("visibilitychange", C),
						(v = new Date().getTime()),
						S());
				}),
					s("destroy", () => {
						e.el.removeEventListener("pointerenter", L),
							e.el.removeEventListener("pointerleave", _),
							n().removeEventListener("visibilitychange", C),
							e.autoplay.running && E();
					}),
					s("beforeTransitionStart", (t, s, i) => {
						!e.destroyed &&
							e.autoplay.running &&
							(i || !e.params.autoplay.disableOnInteraction
								? T(!0, !0)
								: E());
					}),
					s("sliderFirstMove", () => {
						!e.destroyed &&
							e.autoplay.running &&
							(e.params.autoplay.disableOnInteraction
								? E()
								: ((c = !0),
								  (p = !1),
								  (h = !1),
								  (u = setTimeout(() => {
										(h = !0), (p = !0), T(!0);
								  }, 200))));
					}),
					s("touchEnd", () => {
						if (!e.destroyed && e.autoplay.running && c) {
							if (
								(clearTimeout(u),
								clearTimeout(r),
								e.params.autoplay.disableOnInteraction)
							)
								return (p = !1), void (c = !1);
							p && e.params.cssMode && x(), (p = !1), (c = !1);
						}
					}),
					s("slideChange", () => {
						!e.destroyed && e.autoplay.running && (m = !0);
					}),
					Object.assign(e.autoplay, {
						start: S,
						stop: E,
						pause: T,
						resume: x,
					});
			},
		]),
			new X(document.querySelector(".main-hero__slider"), {
				slidesPerView: "auto",
				spaceBetween: 40,
				resistanceRatio: 0,
				speed: 400,
				grabCursor: !0,
				pagination: {
					el: ".main-hero__pagination",
					type: "progressbar",
				},
				breakpoints: { 481: { enabled: !0 }, 0: { enabled: !1 } },
				loop: !0,
				autoplay: { delay: 5e3, pauseOnMouseEnter: !0 },
			}),
			new X(document.querySelector(".main-feedback__slider"), {
				slidesPerView: 3,
				spaceBetween: 30,
				speed: 400,
				resistanceRatio: 1,
				watchSlidesProgress: !0,
				slideVisibleClass: "main-feedback__slide-visible",
				pagination: {
					el: ".main-feedback__pagination",
					type: "bullets",
					clickable: !0,
					bulletClass: "main-feedback__bullet",
					bulletActiveClass: "main-feedback__bullet-active",
				},
				navigation: {
					nextEl: ".main-feedback__button-next",
					prevEl: ".main-feedback__button-prev",
				},
				breakpoints: {
					481: { enabled: !0 },
					0: { slidesPerView: 1, enabled: !1 },
				},
			});
		const ie = new X(
				".catalog-item-hero__slider-thumbs .swiper-container",
				{
					slidesPerView: 3,
					direction: "vertical",
					navigation: {
						nextEl: ".catalog-item-hero__button-next",
						prevEl: ".catalog-item-hero__button-prev",
					},
					freeMode: !0,
					breakpoints: {
						1025: { spaceBetween: 40 },
						481: { spaceBetween: 10, direction: "vertical" },
						0: { direction: "horizontal" },
					},
				}
			),
			ae =
				(new X(".catalog-item-hero__slider-images .swiper-container", {
					slidesPerView: 1,
					spaceBetween: 30,
					mousewheel: !0,
					navigation: {
						nextEl: ".catalog-item-hero__button-next",
						prevEl: ".catalog-item-hero__button-prev",
					},
					grabCursor: !0,
					thumbs: { swiper: ie },
				}),
				new X(".quiz__slider", {
					slidesPerView: 1,
					speed: 500,
					allowSlideNext: !1,
					allowSlidePrev: !1,
				})),
			ne = document.getElementById("startTestBtn");
		null !== ne &&
			ne.addEventListener("click", () => {
				(ae.allowSlideNext = !0),
					ae.slideNext(),
					(ae.allowSlideNext = !1);
			});
		const re = new X(".quiz__slider-inner", {
				slidesPerView: 1,
				spaceBetween: 15,
				speed: 500,
				navigation: {
					nextEl: ".quiz__button-next",
					prevEl: ".quiz__button-prev",
				},
				pagination: { el: ".quiz__pagination", type: "progressbar" },
			}),
			le = document.querySelector(".quiz__title-current"),
			oe = document.querySelector(".quiz__title-all");
		null !== oe && (oe.innerHTML = re.slides.length),
			re.on("activeIndexChange", () => {
				le.innerHTML = re.activeIndex + 1;
			}),
			re.on("reachEnd", () => {
				const e = document.querySelector(".quiz__button-next");
				setTimeout(() => {
					e.removeAttribute("disabled"),
						e.addEventListener("click", () => {
							(ae.allowSlideNext = !0),
								ae.slideNext(),
								(ae.allowSlideNext = !1);
						});
				}, 0);
			});
		const de = new X(".main-design__slider", {
				slidesPerView: 1,
				speed: 500,
				allowSlideNext: !1,
				allowSlidePrev: !1,
			}),
			ce = document.querySelector(".main-design__slide-tohide"),
			pe = document.querySelector(".main-design__button-next");
		null !== pe &&
			pe.addEventListener("click", (e) => {
				e.preventDefault();
				const t = document.querySelector(".main-design__form"),
					s = t.querySelectorAll(
						".main-design__label-active .main-design__input"
					),
					i = t
						.querySelector(
							".main-design__label-active .main-design__image"
						)
						.getAttribute("src");
				if (null !== s) {
					const e = { img: i };
					s.forEach((t) => {
						e[t.name] = t.value;
					}),
						"под заказ" == e.color && (ce.style.display = "none"),
						document
							.querySelectorAll(".main-degign__image-imported")
							.forEach((t) => {
								t.setAttribute("src", e.img);
							}),
						document
							.querySelectorAll(".main-design__text-shape")
							.forEach((t) => {
								t.innerHTML = `Форма: ${e.shape}`;
							}),
						document
							.querySelectorAll(".main-design__text-color")
							.forEach((t) => {
								t.innerHTML = `Цвет: ${e.color}`;
							}),
						(de.allowSlideNext = !0),
						de.slideNext(),
						(de.allowSlideNext = !1);
				}
			});
		const ue = document.querySelectorAll(".main-design__button-prev");
		null !== ue &&
			ue.forEach((e) => {
				e.addEventListener("click", () => {
					(de.allowSlidePrev = !0),
						de.slidePrev(),
						(de.allowSlidePrev = !1),
						(ce.style.display = "block");
				});
			}),
			s(27);
		class me {
			constructor(e, t) {
				(this.selector = e),
					(this.innerElements = t),
					(this.tabs = document.querySelector(`[data-tabs="${e}"]`)),
					this.tabs &&
						((this.tabList = this.tabs.querySelector("." + t.list)),
						(this.tabsBtns = this.tabList.querySelectorAll(
							"." + t.button
						)),
						(this.tabsPanels = this.tabs.querySelectorAll(
							"." + t.panel
						)),
						this.init(),
						this.events());
			}
			init() {
				this.tabList.setAttribute("role", "tablist"),
					this.tabsBtns.forEach((e, t) => {
						e.setAttribute("role", "tab"),
							e.setAttribute("tabindex", "-1"),
							e.setAttribute("id", `${this.selector}${t + 1}`),
							e.classList.remove(
								this.innerElements.button + "-active"
							);
					}),
					this.tabsPanels.forEach((e, t) => {
						e.setAttribute("role", "tabpanel"),
							e.setAttribute("tabindex", "-1"),
							e.setAttribute(
								"aria-labelledby",
								this.tabsBtns[t].id
							),
							e.classList.remove(
								this.innerElements.panel + "-active"
							);
					}),
					this.tabsBtns[1].classList.add(
						this.innerElements.button + "-active"
					),
					this.tabsBtns[1].removeAttribute("tabindex"),
					this.tabsBtns[1].setAttribute("aria-selected", "true"),
					this.tabsPanels[1].classList.add(
						this.innerElements.panel + "-active"
					);
			}
			events() {
				this.tabsBtns.forEach((e, t) => {
					e.addEventListener("click", (e) => {
						let t = this.tabList.querySelector("[aria-selected]");
						e.currentTarget !== t &&
							this.switchTabs(e.currentTarget, t);
					}),
						e.addEventListener("keydown", (e) => {
							let s = Array.prototype.indexOf.call(
									this.tabsBtns,
									e.currentTarget
								),
								i = null;
							(i =
								37 === e.which
									? s - 1
									: 39 === e.which
									? s + 1
									: 40 === e.which
									? "down"
									: null),
								null !== i &&
									("down" === i
										? this.tabsPanels[t].focus()
										: this.tabsBtns[i] &&
										  this.switchTabs(
												this.tabsBtns[i],
												e.currentTarget
										  ));
						});
				});
			}
			switchTabs(e) {
				let t =
					arguments.length > 1 && void 0 !== arguments[1]
						? arguments[1]
						: this.tabs.querySelector("[aria-selected]");
				e.focus(),
					e.removeAttribute("tabindex"),
					e.setAttribute("aria-selected", "true"),
					t.removeAttribute("aria-selected"),
					t.setAttribute("tabindex", "-1");
				let s = Array.prototype.indexOf.call(this.tabsBtns, e),
					i = Array.prototype.indexOf.call(this.tabsBtns, t);
				this.tabsPanels[i].classList.remove(
					this.innerElements.panel + "-active"
				),
					this.tabsPanels[s].classList.add(
						this.innerElements.panel + "-active"
					),
					this.tabsBtns[i].classList.remove(
						this.innerElements.button + "-active"
					),
					this.tabsBtns[s].classList.add(
						this.innerElements.button + "-active"
					);
			}
		}
		new me("tab", {
			list: "catalog-item-tabs__list",
			button: "catalog-item-tabs__btn",
			panel: "catalog-item-tabs__panel",
		}),
			new me("quizTab", {
				list: "quiz__list-tabs",
				button: "quiz__btn",
				panel: "quiz__panel",
			}),
			s(661),
			s(617),
			s(578),
			s(774),
			s(472),
			s(986);
		const he = () => {
				const t = document?.querySelectorAll(".fixed-block"),
					s =
						(document.body,
						parseInt(e.bodyEl.dataset.position, 10));
				t.forEach((e) => {
					e.style.paddingRight = "0px";
				}),
					(e.bodyEl.style.paddingRight = "0px"),
					(e.bodyEl.style.top = "auto"),
					e.bodyEl.classList.remove("dis-scroll"),
					window.scroll({ top: s, left: 0 }),
					e.bodyEl.removeAttribute("data-position"),
					(e.htmlEl.style.scrollBehavior = "smooth");
			},
			fe = document.querySelector(".forms");
		if (null !== fe) {
			const t = fe.querySelector(".forms__container"),
				s = document.querySelector(".header");
			null !== t &&
				null !== s &&
				(t.style.marginTop = s.offsetHeight + "px"),
				fe.addEventListener("click", () => {
					fe.classList.remove("forms-visible"), he();
				}),
				document.querySelectorAll(".open-form-btn").forEach((t) => {
					t.addEventListener("click", () => {
						fe.classList.contains("forms-visible") ||
							(fe.classList.add("forms-visible"),
							(() => {
								const t =
										document?.querySelectorAll(
											".fixed-block"
										),
									s = window.scrollY,
									i =
										window.innerWidth -
										e.bodyEl.offsetWidth +
										"px";
								(e.htmlEl.style.scrollBehavior = "none"),
									t.forEach((e) => {
										e.style.paddingRight = i;
									}),
									(e.bodyEl.style.paddingRight = i),
									e.bodyEl.classList.add("dis-scroll"),
									(e.bodyEl.dataset.position = s),
									(e.bodyEl.style.top = `-${s}px`);
							})());
					});
				}),
				fe.querySelectorAll(".forms__button-close").forEach((e) => {
					e.addEventListener("click", () => {
						fe.classList.remove("forms-visible"), he();
					});
				});
			const i = fe.querySelectorAll(".forms__container-inner");
			i.forEach((e) => {
				e.addEventListener("click", (e) => {
					e.stopPropagation();
				});
			});
			const a = fe.querySelector(".forms__item-email"),
				n = document.getElementById("emailRegContainer");
			a.addEventListener("click", () => {
				i.forEach((e) => {
					e.classList.add("forms__container-inner-hidden");
				}),
					n.classList.remove("forms__container-inner-hidden");
			});
			const r = fe.querySelectorAll(".login-form-btn"),
				l = document.getElementById("loginFormContainer");
			r.forEach((e) => {
				e.addEventListener("click", () => {
					i.forEach((e) => {
						e.classList.add("forms__container-inner-hidden");
					}),
						l.classList.remove("forms__container-inner-hidden");
				});
			});
			const o = fe.querySelector(".forms__button-recover"),
				d = document.getElementById("recoverFormContainer");
			o.addEventListener("click", () => {
				i.forEach((e) => {
					e.classList.add("forms__container-inner-hidden");
				}),
					d.classList.remove("forms__container-inner-hidden");
			}),
				fe.querySelectorAll(".forms__button-reg").forEach((e) => {
					e.addEventListener("click", () => {
						i.forEach((e) => {
							e.classList.add("forms__container-inner-hidden");
						}),
							n.classList.remove("forms__container-inner-hidden");
					});
				});
			const c = document.querySelectorAll(".main-form-fack-btn"),
				p = document.getElementById("main-form-container");
			c.forEach((e) => {
				e.addEventListener("click", () => {
					i.forEach((e) => {
						e.classList.add("forms__container-inner-hidden");
					}),
						p.classList.remove("forms__container-inner-hidden");
				});
			}),
				document
					.getElementById("login-form-back-btn")
					.addEventListener("click", () => {
						i.forEach((e) => {
							e.classList.add("forms__container-inner-hidden");
						}),
							l.classList.remove("forms__container-inner-hidden");
					});
		}
		s(290);
	})();
})();
