/******/ (() => {
	// webpackBootstrap
	/******/ "use strict";
	var __webpack_exports__ = {}; // CONCATENATED MODULE: ./src/js/_vars.js

	/* harmony default export */ const _vars = {
		windowEl: window,
		documentEl: document,
		htmlEl: document.documentElement,
		bodyEl: document.body,
	}; // CONCATENATED MODULE: ./node_modules/gsap/gsap-core.js
	function _assertThisInitialized(self) {
		if (self === void 0) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}
		return self;
	}

	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		subClass.__proto__ = superClass;
	}

	/*!
	 * GSAP 3.11.5
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2023, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	 */

	/* eslint-disable */
	var _config = {
			autoSleep: 120,
			force3D: "auto",
			nullTargetWarn: 1,
			units: {
				lineHeight: "",
			},
		},
		_defaults = {
			duration: 0.5,
			overwrite: false,
			delay: 0,
		},
		_suppressOverwrites,
		_reverting,
		_context,
		_bigNum = 1e8,
		_tinyNum = 1 / _bigNum,
		_2PI = Math.PI * 2,
		_HALF_PI = _2PI / 4,
		_gsID = 0,
		_sqrt = Math.sqrt,
		_cos = Math.cos,
		_sin = Math.sin,
		_isString = function _isString(value) {
			return typeof value === "string";
		},
		_isFunction = function _isFunction(value) {
			return typeof value === "function";
		},
		_isNumber = function _isNumber(value) {
			return typeof value === "number";
		},
		_isUndefined = function _isUndefined(value) {
			return typeof value === "undefined";
		},
		_isObject = function _isObject(value) {
			return typeof value === "object";
		},
		_isNotFalse = function _isNotFalse(value) {
			return value !== false;
		},
		_windowExists = function _windowExists() {
			return typeof window !== "undefined";
		},
		_isFuncOrString = function _isFuncOrString(value) {
			return _isFunction(value) || _isString(value);
		},
		_isTypedArray = (typeof ArrayBuffer === "function" && ArrayBuffer.isView) || function () {},
		// note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
		_isArray = Array.isArray,
		_strictNumExp = /(?:-?\.?\d|\.)+/gi,
		//only numbers (including negatives and decimals) but NOT relative values.
		_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
		//finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
		_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
		_complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
		//duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
		_relExp = /[+-]=-?[.\d]+/,
		_delimitedValueExp = /[^,'"\[\]\s]+/gi,
		// previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
		_unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
		_globalTimeline,
		_win,
		_coreInitted,
		_doc,
		_globals = {},
		_installScope = {},
		_coreReady,
		_install = function _install(scope) {
			return (_installScope = _merge(scope, _globals)) && gsap;
		},
		_missingPlugin = function _missingPlugin(property, value) {
			return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
		},
		_warn = function _warn(message, suppress) {
			return !suppress && console.warn(message);
		},
		_addGlobal = function _addGlobal(name, obj) {
			return (name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj)) || _globals;
		},
		_emptyFunc = function _emptyFunc() {
			return 0;
		},
		_startAtRevertConfig = {
			suppressEvents: true,
			isStart: true,
			kill: false,
		},
		_revertConfigNoKill = {
			suppressEvents: true,
			kill: false,
		},
		_revertConfig = {
			suppressEvents: true,
		},
		_reservedProps = {},
		_lazyTweens = [],
		_lazyLookup = {},
		_lastRenderedFrame,
		_plugins = {},
		_effects = {},
		_nextGCFrame = 30,
		_harnessPlugins = [],
		_callbackNames = "",
		_harness = function _harness(targets) {
			var target = targets[0],
				harnessPlugin,
				i;
			_isObject(target) || _isFunction(target) || (targets = [targets]);

			if (!(harnessPlugin = (target._gsap || {}).harness)) {
				// find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
				i = _harnessPlugins.length;

				while (i-- && !_harnessPlugins[i].targetTest(target)) {}

				harnessPlugin = _harnessPlugins[i];
			}

			i = targets.length;

			while (i--) {
				(targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin)))) ||
					targets.splice(i, 1);
			}

			return targets;
		},
		_getCache = function _getCache(target) {
			return target._gsap || _harness(toArray(target))[0]._gsap;
		},
		_getProperty = function _getProperty(target, property, v) {
			return (v = target[property]) && _isFunction(v)
				? target[property]()
				: (_isUndefined(v) && target.getAttribute && target.getAttribute(property)) || v;
		},
		_forEachName = function _forEachName(names, func) {
			return (names = names.split(",")).forEach(func) || names;
		},
		//split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
		_round = function _round(value) {
			return Math.round(value * 100000) / 100000 || 0;
		},
		_roundPrecise = function _roundPrecise(value) {
			return Math.round(value * 10000000) / 10000000 || 0;
		},
		// increased precision mostly for timing values.
		_parseRelative = function _parseRelative(start, value) {
			var operator = value.charAt(0),
				end = parseFloat(value.substr(2));
			start = parseFloat(start);
			return operator === "+"
				? start + end
				: operator === "-"
				? start - end
				: operator === "*"
				? start * end
				: start / end;
		},
		_arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
			//searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
			var l = toFind.length,
				i = 0;

			for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) {}

			return i < l;
		},
		_lazyRender = function _lazyRender() {
			var l = _lazyTweens.length,
				a = _lazyTweens.slice(0),
				i,
				tween;

			_lazyLookup = {};
			_lazyTweens.length = 0;

			for (i = 0; i < l; i++) {
				tween = a[i];
				tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
			}
		},
		_lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
			_lazyTweens.length && !_reverting && _lazyRender();
			animation.render(
				time,
				suppressEvents,
				force || (_reverting && time < 0 && (animation._initted || animation._startAt))
			);
			_lazyTweens.length && !_reverting && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
		},
		_numericIfPossible = function _numericIfPossible(value) {
			var n = parseFloat(value);
			return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2
				? n
				: _isString(value)
				? value.trim()
				: value;
		},
		_passThrough = function _passThrough(p) {
			return p;
		},
		_setDefaults = function _setDefaults(obj, defaults) {
			for (var p in defaults) {
				p in obj || (obj[p] = defaults[p]);
			}

			return obj;
		},
		_setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
			return function (obj, defaults) {
				for (var p in defaults) {
					p in obj || (p === "duration" && excludeDuration) || p === "ease" || (obj[p] = defaults[p]);
				}
			};
		},
		_merge = function _merge(base, toMerge) {
			for (var p in toMerge) {
				base[p] = toMerge[p];
			}

			return base;
		},
		_mergeDeep = function _mergeDeep(base, toMerge) {
			for (var p in toMerge) {
				p !== "__proto__" &&
					p !== "constructor" &&
					p !== "prototype" &&
					(base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
			}

			return base;
		},
		_copyExcluding = function _copyExcluding(obj, excluding) {
			var copy = {},
				p;

			for (p in obj) {
				p in excluding || (copy[p] = obj[p]);
			}

			return copy;
		},
		_inheritDefaults = function _inheritDefaults(vars) {
			var parent = vars.parent || _globalTimeline,
				func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;

			if (_isNotFalse(vars.inherit)) {
				while (parent) {
					func(vars, parent.vars.defaults);
					parent = parent.parent || parent._dp;
				}
			}

			return vars;
		},
		_arraysMatch = function _arraysMatch(a1, a2) {
			var i = a1.length,
				match = i === a2.length;

			while (match && i-- && a1[i] === a2[i]) {}

			return i < 0;
		},
		_addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
			if (firstProp === void 0) {
				firstProp = "_first";
			}

			if (lastProp === void 0) {
				lastProp = "_last";
			}

			var prev = parent[lastProp],
				t;

			if (sortBy) {
				t = child[sortBy];

				while (prev && prev[sortBy] > t) {
					prev = prev._prev;
				}
			}

			if (prev) {
				child._next = prev._next;
				prev._next = child;
			} else {
				child._next = parent[firstProp];
				parent[firstProp] = child;
			}

			if (child._next) {
				child._next._prev = child;
			} else {
				parent[lastProp] = child;
			}

			child._prev = prev;
			child.parent = child._dp = parent;
			return child;
		},
		_removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
			if (firstProp === void 0) {
				firstProp = "_first";
			}

			if (lastProp === void 0) {
				lastProp = "_last";
			}

			var prev = child._prev,
				next = child._next;

			if (prev) {
				prev._next = next;
			} else if (parent[firstProp] === child) {
				parent[firstProp] = next;
			}

			if (next) {
				next._prev = prev;
			} else if (parent[lastProp] === child) {
				parent[lastProp] = prev;
			}

			child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
		},
		_removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
			child.parent &&
				(!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) &&
				child.parent.remove(child);
			child._act = 0;
		},
		_uncache = function _uncache(animation, child) {
			if (animation && (!child || child._end > animation._dur || child._start < 0)) {
				// performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
				var a = animation;

				while (a) {
					a._dirty = 1;
					a = a.parent;
				}
			}

			return animation;
		},
		_recacheAncestors = function _recacheAncestors(animation) {
			var parent = animation.parent;

			while (parent && parent.parent) {
				//sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
				parent._dirty = 1;
				parent.totalDuration();
				parent = parent.parent;
			}

			return animation;
		},
		_rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
			return (
				tween._startAt &&
				(_reverting
					? tween._startAt.revert(_revertConfigNoKill)
					: (tween.vars.immediateRender && !tween.vars.autoRevert) ||
					  tween._startAt.render(totalTime, true, force))
			);
		},
		_hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
			return !animation || (animation._ts && _hasNoPausedAncestors(animation.parent));
		},
		_elapsedCycleDuration = function _elapsedCycleDuration(animation) {
			return animation._repeat
				? _animationCycle(animation._tTime, (animation = animation.duration() + animation._rDelay)) * animation
				: 0;
		},
		// feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
		_animationCycle = function _animationCycle(tTime, cycleDuration) {
			var whole = Math.floor((tTime /= cycleDuration));
			return tTime && whole === tTime ? whole - 1 : whole;
		},
		_parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
			return (
				(parentTime - child._start) * child._ts +
				(child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur)
			);
		},
		_setEnd = function _setEnd(animation) {
			return (animation._end = _roundPrecise(
				animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0)
			));
		},
		_alignPlayhead = function _alignPlayhead(animation, totalTime) {
			// adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
			var parent = animation._dp;

			if (parent && parent.smoothChildTiming && animation._ts) {
				animation._start = _roundPrecise(
					parent._time -
						(animation._ts > 0
							? totalTime / animation._ts
							: ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) /
							  -animation._ts)
				);

				_setEnd(animation);

				parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
			}

			return animation;
		},
		/*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/
		_postAddChecks = function _postAddChecks(timeline, child) {
			var t;

			if (child._time || (child._initted && !child._dur)) {
				//in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
				t = _parentToChildTotalTime(timeline.rawTime(), child);

				if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
					child.render(t, true);
				}
			} //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.

			if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
				//in case any of the ancestors had completed but should now be enabled...
				if (timeline._dur < timeline.duration()) {
					t = timeline;

					while (t._dp) {
						t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

						t = t._dp;
					}
				}

				timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
			}
		},
		_addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
			child.parent && _removeFromParent(child);
			child._start = _roundPrecise(
				(_isNumber(position)
					? position
					: position || timeline !== _globalTimeline
					? _parsePosition(timeline, position, child)
					: timeline._time) + child._delay
			);
			child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

			_addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

			_isFromOrFromStart(child) || (timeline._recent = child);
			skipChecks || _postAddChecks(timeline, child);
			timeline._ts < 0 && _alignPlayhead(timeline, timeline._tTime); // if the timeline is reversed and the new child makes it longer, we may need to adjust the parent's _start (push it back)

			return timeline;
		},
		_scrollTrigger = function _scrollTrigger(animation, trigger) {
			return (
				(_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) &&
				_globals.ScrollTrigger.create(trigger, animation)
			);
		},
		_attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
			_initTween(tween, time, tTime);

			if (!tween._initted) {
				return 1;
			}

			if (
				!force &&
				tween._pt &&
				!_reverting &&
				((tween._dur && tween.vars.lazy !== false) || (!tween._dur && tween.vars.lazy)) &&
				_lastRenderedFrame !== _ticker.frame
			) {
				_lazyTweens.push(tween);

				tween._lazy = [tTime, suppressEvents];
				return 1;
			}
		},
		_parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
			var parent = _ref.parent;
			return (
				parent &&
				parent._ts &&
				parent._initted &&
				!parent._lock &&
				(parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent))
			);
		},
		// check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
		_isFromOrFromStart = function _isFromOrFromStart(_ref2) {
			var data = _ref2.data;
			return data === "isFromStart" || data === "isStart";
		},
		_renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
			var prevRatio = tween.ratio,
				ratio =
					totalTime < 0 ||
					(!totalTime &&
						((!tween._start &&
							_parentPlayheadIsBeforeStart(tween) &&
							!(!tween._initted && _isFromOrFromStart(tween))) ||
							((tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween))))
						? 0
						: 1,
				// if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
				repeatDelay = tween._rDelay,
				tTime = 0,
				pt,
				iteration,
				prevIteration;

			if (repeatDelay && tween._repeat) {
				// in case there's a zero-duration tween that has a repeat with a repeatDelay
				tTime = _clamp(0, tween._tDur, totalTime);
				iteration = _animationCycle(tTime, repeatDelay);
				tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

				if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
					// if iteration changed
					prevRatio = 1 - ratio;
					tween.vars.repeatRefresh && tween._initted && tween.invalidate();
				}
			}

			if (
				ratio !== prevRatio ||
				_reverting ||
				force ||
				tween._zTime === _tinyNum ||
				(!totalTime && tween._zTime)
			) {
				if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
					// if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					return;
				}

				prevIteration = tween._zTime;
				tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

				suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

				tween.ratio = ratio;
				tween._from && (ratio = 1 - ratio);
				tween._time = 0;
				tween._tTime = tTime;
				pt = tween._pt;

				while (pt) {
					pt.r(ratio, pt.d);
					pt = pt._next;
				}

				totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
				tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
				tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

				if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
					ratio && _removeFromParent(tween, 1);

					if (!suppressEvents && !_reverting) {
						_callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

						tween._prom && tween._prom();
					}
				}
			} else if (!tween._zTime) {
				tween._zTime = totalTime;
			}
		},
		_findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
			var child;

			if (time > prevTime) {
				child = animation._first;

				while (child && child._start <= time) {
					if (child.data === "isPause" && child._start > prevTime) {
						return child;
					}

					child = child._next;
				}
			} else {
				child = animation._last;

				while (child && child._start >= time) {
					if (child.data === "isPause" && child._start < prevTime) {
						return child;
					}

					child = child._prev;
				}
			}
		},
		_setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
			var repeat = animation._repeat,
				dur = _roundPrecise(duration) || 0,
				totalProgress = animation._tTime / animation._tDur;
			totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
			animation._dur = dur;
			animation._tDur = !repeat
				? dur
				: repeat < 0
				? 1e10
				: _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
			totalProgress > 0 &&
				!leavePlayhead &&
				_alignPlayhead(animation, (animation._tTime = animation._tDur * totalProgress));
			animation.parent && _setEnd(animation);
			skipUncache || _uncache(animation.parent, animation);
			return animation;
		},
		_onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
			return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
		},
		_zeroPosition = {
			_start: 0,
			endTime: _emptyFunc,
			totalDuration: _emptyFunc,
		},
		_parsePosition = function _parsePosition(animation, position, percentAnimation) {
			var labels = animation.labels,
				recent = animation._recent || _zeroPosition,
				clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
				//in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
				i,
				offset,
				isPercent;

			if (_isString(position) && (isNaN(position) || position in labels)) {
				//if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				offset = position.charAt(0);
				isPercent = position.substr(-1) === "%";
				i = position.indexOf("=");

				if (offset === "<" || offset === ">") {
					i >= 0 && (position = position.replace(/=/, ""));
					return (
						(offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) +
						(parseFloat(position.substr(1)) || 0) *
							(isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1)
					);
				}

				if (i < 0) {
					position in labels || (labels[position] = clippedDuration);
					return labels[position];
				}

				offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));

				if (isPercent && percentAnimation) {
					offset =
						(offset / 100) *
						(_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
				}

				return i > 1
					? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset
					: clippedDuration + offset;
			}

			return position == null ? clippedDuration : +position;
		},
		_createTweenType = function _createTweenType(type, params, timeline) {
			var isLegacy = _isNumber(params[1]),
				varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
				vars = params[varsIndex],
				irVars,
				parent;

			isLegacy && (vars.duration = params[1]);
			vars.parent = timeline;

			if (type) {
				irVars = vars;
				parent = timeline;

				while (parent && !("immediateRender" in irVars)) {
					// inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
					irVars = parent.vars.defaults || {};
					parent = _isNotFalse(parent.vars.inherit) && parent.parent;
				}

				vars.immediateRender = _isNotFalse(irVars.immediateRender);
				type < 2 ? (vars.runBackwards = 1) : (vars.startAt = params[varsIndex - 1]); // "from" vars
			}

			return new Tween(params[0], vars, params[varsIndex + 1]);
		},
		_conditionalReturn = function _conditionalReturn(value, func) {
			return value || value === 0 ? func(value) : func;
		},
		_clamp = function _clamp(min, max, value) {
			return value < min ? min : value > max ? max : value;
		},
		getUnit = function getUnit(value, v) {
			return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
		},
		// note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
		clamp = function clamp(min, max, value) {
			return _conditionalReturn(value, function (v) {
				return _clamp(min, max, v);
			});
		},
		_slice = [].slice,
		_isArrayLike = function _isArrayLike(value, nonEmpty) {
			return (
				value &&
				_isObject(value) &&
				"length" in value &&
				((!nonEmpty && !value.length) || (value.length - 1 in value && _isObject(value[0]))) &&
				!value.nodeType &&
				value !== _win
			);
		},
		_flatten = function _flatten(ar, leaveStrings, accumulator) {
			if (accumulator === void 0) {
				accumulator = [];
			}

			return (
				ar.forEach(function (value) {
					var _accumulator;

					return (_isString(value) && !leaveStrings) || _isArrayLike(value, 1)
						? (_accumulator = accumulator).push.apply(_accumulator, toArray(value))
						: accumulator.push(value);
				}) || accumulator
			);
		},
		//takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
		toArray = function toArray(value, scope, leaveStrings) {
			return _context && !scope && _context.selector
				? _context.selector(value)
				: _isString(value) && !leaveStrings && (_coreInitted || !_wake())
				? _slice.call((scope || _doc).querySelectorAll(value), 0)
				: _isArray(value)
				? _flatten(value, leaveStrings)
				: _isArrayLike(value)
				? _slice.call(value, 0)
				: value
				? [value]
				: [];
		},
		selector = function selector(value) {
			value = toArray(value)[0] || _warn("Invalid scope") || {};
			return function (v) {
				var el = value.current || value.nativeElement || value;
				return toArray(
					v,
					el.querySelectorAll
						? el
						: el === value
						? _warn("Invalid scope") || _doc.createElement("div")
						: value
				);
			};
		},
		shuffle = function shuffle(a) {
			return a.sort(function () {
				return 0.5 - Math.random();
			});
		},
		// alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
		//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
		distribute = function distribute(v) {
			if (_isFunction(v)) {
				return v;
			}

			var vars = _isObject(v)
					? v
					: {
							each: v,
					  },
				//n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
				ease = _parseEase(vars.ease),
				from = vars.from || 0,
				base = parseFloat(vars.base) || 0,
				cache = {},
				isDecimal = from > 0 && from < 1,
				ratios = isNaN(from) || isDecimal,
				axis = vars.axis,
				ratioX = from,
				ratioY = from;

			if (_isString(from)) {
				ratioX = ratioY =
					{
						center: 0.5,
						edges: 0.5,
						end: 1,
					}[from] || 0;
			} else if (!isDecimal && ratios) {
				ratioX = from[0];
				ratioY = from[1];
			}

			return function (i, target, a) {
				var l = (a || vars).length,
					distances = cache[l],
					originX,
					originY,
					x,
					y,
					d,
					j,
					max,
					min,
					wrapAt;

				if (!distances) {
					wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

					if (!wrapAt) {
						max = -_bigNum;

						while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

						wrapAt--;
					}

					distances = cache[l] = [];
					originX = ratios ? Math.min(wrapAt, l) * ratioX - 0.5 : from % wrapAt;
					originY = wrapAt === _bigNum ? 0 : ratios ? (l * ratioY) / wrapAt - 0.5 : (from / wrapAt) | 0;
					max = 0;
					min = _bigNum;

					for (j = 0; j < l; j++) {
						x = (j % wrapAt) - originX;
						y = originY - ((j / wrapAt) | 0);
						distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
						d > max && (max = d);
						d < min && (min = d);
					}

					from === "random" && shuffle(distances);
					distances.max = max - min;
					distances.min = min;
					distances.v = l =
						(parseFloat(vars.amount) ||
							parseFloat(vars.each) *
								(wrapAt > l
									? l - 1
									: !axis
									? Math.max(wrapAt, l / wrapAt)
									: axis === "y"
									? l / wrapAt
									: wrapAt) ||
							0) * (from === "edges" ? -1 : 1);
					distances.b = l < 0 ? base - l : base;
					distances.u = getUnit(vars.amount || vars.each) || 0; //unit

					ease = ease && l < 0 ? _invertEase(ease) : ease;
				}

				l = (distances[i] - distances.min) / distances.max || 0;
				return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
			};
		},
		_roundModifier = function _roundModifier(v) {
			//pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
			var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

			return function (raw) {
				var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);

				return (n - (n % 1)) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
			};
		},
		snap = function snap(snapTo, value) {
			var isArray = _isArray(snapTo),
				radius,
				is2D;

			if (!isArray && _isObject(snapTo)) {
				radius = isArray = snapTo.radius || _bigNum;

				if (snapTo.values) {
					snapTo = toArray(snapTo.values);

					if ((is2D = !_isNumber(snapTo[0]))) {
						radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
					}
				} else {
					snapTo = _roundModifier(snapTo.increment);
				}
			}

			return _conditionalReturn(
				value,
				!isArray
					? _roundModifier(snapTo)
					: _isFunction(snapTo)
					? function (raw) {
							is2D = snapTo(raw);
							return Math.abs(is2D - raw) <= radius ? is2D : raw;
					  }
					: function (raw) {
							var x = parseFloat(is2D ? raw.x : raw),
								y = parseFloat(is2D ? raw.y : 0),
								min = _bigNum,
								closest = 0,
								i = snapTo.length,
								dx,
								dy;

							while (i--) {
								if (is2D) {
									dx = snapTo[i].x - x;
									dy = snapTo[i].y - y;
									dx = dx * dx + dy * dy;
								} else {
									dx = Math.abs(snapTo[i] - x);
								}

								if (dx < min) {
									min = dx;
									closest = i;
								}
							}

							closest = !radius || min <= radius ? snapTo[closest] : raw;
							return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
					  }
			);
		},
		random = function random(min, max, roundingIncrement, returnFunction) {
			return _conditionalReturn(
				_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction,
				function () {
					return _isArray(min)
						? min[~~(Math.random() * min.length)]
						: (roundingIncrement = roundingIncrement || 1e-5) &&
								(returnFunction =
									roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) &&
								Math.floor(
									Math.round(
										(min -
											roundingIncrement / 2 +
											Math.random() * (max - min + roundingIncrement * 0.99)) /
											roundingIncrement
									) *
										roundingIncrement *
										returnFunction
								) / returnFunction;
				}
			);
		},
		pipe = function pipe() {
			for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
				functions[_key] = arguments[_key];
			}

			return function (value) {
				return functions.reduce(function (v, f) {
					return f(v);
				}, value);
			};
		},
		unitize = function unitize(func, unit) {
			return function (value) {
				return func(parseFloat(value)) + (unit || getUnit(value));
			};
		},
		normalize = function normalize(min, max, value) {
			return mapRange(min, max, 0, 1, value);
		},
		_wrapArray = function _wrapArray(a, wrapper, value) {
			return _conditionalReturn(value, function (index) {
				return a[~~wrapper(index)];
			});
		},
		wrap = function wrap(min, max, value) {
			// NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
			var range = max - min;
			return _isArray(min)
				? _wrapArray(min, wrap(0, min.length), max)
				: _conditionalReturn(value, function (value) {
						return ((range + ((value - min) % range)) % range) + min;
				  });
		},
		wrapYoyo = function wrapYoyo(min, max, value) {
			var range = max - min,
				total = range * 2;
			return _isArray(min)
				? _wrapArray(min, wrapYoyo(0, min.length - 1), max)
				: _conditionalReturn(value, function (value) {
						value = (total + ((value - min) % total)) % total || 0;
						return min + (value > range ? total - value : value);
				  });
		},
		_replaceRandom = function _replaceRandom(value) {
			//replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
			var prev = 0,
				s = "",
				i,
				nums,
				end,
				isArray;

			while (~(i = value.indexOf("random(", prev))) {
				end = value.indexOf(")", i);
				isArray = value.charAt(i + 7) === "[";
				nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
				s +=
					value.substr(prev, i - prev) +
					random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
				prev = end + 1;
			}

			return s + value.substr(prev, value.length - prev);
		},
		mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
			var inRange = inMax - inMin,
				outRange = outMax - outMin;
			return _conditionalReturn(value, function (value) {
				return outMin + (((value - inMin) / inRange) * outRange || 0);
			});
		},
		interpolate = function interpolate(start, end, progress, mutate) {
			var func = isNaN(start + end)
				? 0
				: function (p) {
						return (1 - p) * start + p * end;
				  };

			if (!func) {
				var isString = _isString(start),
					master = {},
					p,
					i,
					interpolators,
					l,
					il;

				progress === true && (mutate = 1) && (progress = null);

				if (isString) {
					start = {
						p: start,
					};
					end = {
						p: end,
					};
				} else if (_isArray(start) && !_isArray(end)) {
					interpolators = [];
					l = start.length;
					il = l - 2;

					for (i = 1; i < l; i++) {
						interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
					}

					l--;

					func = function func(p) {
						p *= l;
						var i = Math.min(il, ~~p);
						return interpolators[i](p - i);
					};

					progress = end;
				} else if (!mutate) {
					start = _merge(_isArray(start) ? [] : {}, start);
				}

				if (!interpolators) {
					for (p in end) {
						_addPropTween.call(master, start, p, "get", end[p]);
					}

					func = function func(p) {
						return _renderPropTweens(p, master) || (isString ? start.p : start);
					};
				}
			}

			return _conditionalReturn(progress, func);
		},
		_getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
			//used for nextLabel() and previousLabel()
			var labels = timeline.labels,
				min = _bigNum,
				p,
				distance,
				label;

			for (p in labels) {
				distance = labels[p] - fromTime;

				if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
					label = p;
					min = distance;
				}
			}

			return label;
		},
		_callback = function _callback(animation, type, executeLazyFirst) {
			var v = animation.vars,
				callback = v[type],
				prevContext = _context,
				context = animation._ctx,
				params,
				scope,
				result;

			if (!callback) {
				return;
			}

			params = v[type + "Params"];
			scope = v.callbackScope || animation;
			executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

			context && (_context = context);
			result = params ? callback.apply(scope, params) : callback.call(scope);
			_context = prevContext;
			return result;
		},
		_interrupt = function _interrupt(animation) {
			_removeFromParent(animation);

			animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
			animation.progress() < 1 && _callback(animation, "onInterrupt");
			return animation;
		},
		_quickTween,
		_registerPluginQueue = [],
		_createPlugin = function _createPlugin(config) {
			if (!_windowExists()) {
				_registerPluginQueue.push(config);

				return;
			}

			config = (!config.name && config["default"]) || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

			var name = config.name,
				isFunc = _isFunction(config),
				Plugin =
					name && !isFunc && config.init
						? function () {
								this._props = [];
						  }
						: config,
				//in case someone passes in an object that's not a plugin, like CustomEase
				instanceDefaults = {
					init: _emptyFunc,
					render: _renderPropTweens,
					add: _addPropTween,
					kill: _killPropTweensOf,
					modifier: _addPluginModifier,
					rawVars: 0,
				},
				statics = {
					targetTest: 0,
					get: 0,
					getSetter: _getSetter,
					aliases: {},
					register: 0,
				};

			_wake();

			if (config !== Plugin) {
				if (_plugins[name]) {
					return;
				}

				_setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods

				_merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods

				_plugins[(Plugin.prop = name)] = Plugin;

				if (config.targetTest) {
					_harnessPlugins.push(Plugin);

					_reservedProps[name] = 1;
				}

				name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
			}

			_addGlobal(name, Plugin);

			config.register && config.register(gsap, Plugin, PropTween);
		},
		/*
		 * --------------------------------------------------------------------------------------
		 * COLORS
		 * --------------------------------------------------------------------------------------
		 */
		_255 = 255,
		_colorLookup = {
			aqua: [0, _255, _255],
			lime: [0, _255, 0],
			silver: [192, 192, 192],
			black: [0, 0, 0],
			maroon: [128, 0, 0],
			teal: [0, 128, 128],
			blue: [0, 0, _255],
			navy: [0, 0, 128],
			white: [_255, _255, _255],
			olive: [128, 128, 0],
			yellow: [_255, _255, 0],
			orange: [_255, 165, 0],
			gray: [128, 128, 128],
			purple: [128, 0, 128],
			green: [0, 128, 0],
			red: [_255, 0, 0],
			pink: [_255, 192, 203],
			cyan: [0, _255, _255],
			transparent: [_255, _255, _255, 0],
		},
		// possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
		// let ctx = _doc.createElement("canvas").getContext("2d");
		// _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
		_hue = function _hue(h, m1, m2) {
			h += h < 0 ? 1 : h > 1 ? -1 : 0;
			return (
				((h * 6 < 1
					? m1 + (m2 - m1) * h * 6
					: h < 0.5
					? m2
					: h * 3 < 2
					? m1 + (m2 - m1) * (2 / 3 - h) * 6
					: m1) *
					_255 +
					0.5) |
				0
			);
		},
		splitColor = function splitColor(v, toHSL, forceAlpha) {
			var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, (v >> 8) & _255, v & _255] : 0,
				r,
				g,
				b,
				h,
				s,
				l,
				max,
				min,
				d,
				wasHSL;

			if (!a) {
				if (v.substr(-1) === ",") {
					//sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
					v = v.substr(0, v.length - 1);
				}

				if (_colorLookup[v]) {
					a = _colorLookup[v];
				} else if (v.charAt(0) === "#") {
					if (v.length < 6) {
						//for shorthand like #9F0 or #9F0F (could have alpha)
						r = v.charAt(1);
						g = v.charAt(2);
						b = v.charAt(3);
						v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
					}

					if (v.length === 9) {
						// hex with alpha, like #fd5e53ff
						a = parseInt(v.substr(1, 6), 16);
						return [a >> 16, (a >> 8) & _255, a & _255, parseInt(v.substr(7), 16) / 255];
					}

					v = parseInt(v.substr(1), 16);
					a = [v >> 16, (v >> 8) & _255, v & _255];
				} else if (v.substr(0, 3) === "hsl") {
					a = wasHSL = v.match(_strictNumExp);

					if (!toHSL) {
						h = (+a[0] % 360) / 360;
						s = +a[1] / 100;
						l = +a[2] / 100;
						g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
						r = l * 2 - g;
						a.length > 3 && (a[3] *= 1); //cast as number

						a[0] = _hue(h + 1 / 3, r, g);
						a[1] = _hue(h, r, g);
						a[2] = _hue(h - 1 / 3, r, g);
					} else if (~v.indexOf("=")) {
						//if relative values are found, just return the raw strings with the relative prefixes in place.
						a = v.match(_numExp);
						forceAlpha && a.length < 4 && (a[3] = 1);
						return a;
					}
				} else {
					a = v.match(_strictNumExp) || _colorLookup.transparent;
				}

				a = a.map(Number);
			}

			if (toHSL && !wasHSL) {
				r = a[0] / _255;
				g = a[1] / _255;
				b = a[2] / _255;
				max = Math.max(r, g, b);
				min = Math.min(r, g, b);
				l = (max + min) / 2;

				if (max === min) {
					h = s = 0;
				} else {
					d = max - min;
					s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
					h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
					h *= 60;
				}

				a[0] = ~~(h + 0.5);
				a[1] = ~~(s * 100 + 0.5);
				a[2] = ~~(l * 100 + 0.5);
			}

			forceAlpha && a.length < 4 && (a[3] = 1);
			return a;
		},
		_colorOrderData = function _colorOrderData(v) {
			// strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
			var values = [],
				c = [],
				i = -1;
			v.split(_colorExp).forEach(function (v) {
				var a = v.match(_numWithUnitExp) || [];
				values.push.apply(values, a);
				c.push((i += a.length + 1));
			});
			values.c = c;
			return values;
		},
		_formatColors = function _formatColors(s, toHSL, orderMatchData) {
			var result = "",
				colors = (s + result).match(_colorExp),
				type = toHSL ? "hsla(" : "rgba(",
				i = 0,
				c,
				shell,
				d,
				l;

			if (!colors) {
				return s;
			}

			colors = colors.map(function (color) {
				return (
					(color = splitColor(color, toHSL, 1)) &&
					type +
						(toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) +
						")"
				);
			});

			if (orderMatchData) {
				d = _colorOrderData(s);
				c = orderMatchData.c;

				if (c.join(result) !== d.c.join(result)) {
					shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
					l = shell.length - 1;

					for (; i < l; i++) {
						result +=
							shell[i] +
							(~c.indexOf(i)
								? colors.shift() || type + "0,0,0,0)"
								: (d.length ? d : colors.length ? colors : orderMatchData).shift());
					}
				}
			}

			if (!shell) {
				shell = s.split(_colorExp);
				l = shell.length - 1;

				for (; i < l; i++) {
					result += shell[i] + colors[i];
				}
			}

			return result + shell[l];
		},
		_colorExp = (function () {
			var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
				//we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
				p;

			for (p in _colorLookup) {
				s += "|" + p + "\\b";
			}

			return new RegExp(s + ")", "gi");
		})(),
		_hslExp = /hsl[a]?\(/,
		_colorStringFilter = function _colorStringFilter(a) {
			var combined = a.join(" "),
				toHSL;
			_colorExp.lastIndex = 0;

			if (_colorExp.test(combined)) {
				toHSL = _hslExp.test(combined);
				a[1] = _formatColors(a[1], toHSL);
				a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

				return true;
			}
		},
		/*
		 * --------------------------------------------------------------------------------------
		 * TICKER
		 * --------------------------------------------------------------------------------------
		 */
		_tickerActive,
		_ticker = (function () {
			var _getTime = Date.now,
				_lagThreshold = 500,
				_adjustedLag = 33,
				_startTime = _getTime(),
				_lastUpdate = _startTime,
				_gap = 1000 / 240,
				_nextTime = _gap,
				_listeners = [],
				_id,
				_req,
				_raf,
				_self,
				_delta,
				_i,
				_tick = function _tick(v) {
					var elapsed = _getTime() - _lastUpdate,
						manual = v === true,
						overlap,
						dispatch,
						time,
						frame;

					elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
					_lastUpdate += elapsed;
					time = _lastUpdate - _startTime;
					overlap = time - _nextTime;

					if (overlap > 0 || manual) {
						frame = ++_self.frame;
						_delta = time - _self.time * 1000;
						_self.time = time = time / 1000;
						_nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
						dispatch = 1;
					}

					manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

					if (dispatch) {
						for (_i = 0; _i < _listeners.length; _i++) {
							// use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
							_listeners[_i](time, _delta, frame, v);
						}
					}
				};

			_self = {
				time: 0,
				frame: 0,
				tick: function tick() {
					_tick(true);
				},
				deltaRatio: function deltaRatio(fps) {
					return _delta / (1000 / (fps || 60));
				},
				wake: function wake() {
					if (_coreReady) {
						if (!_coreInitted && _windowExists()) {
							_win = _coreInitted = window;
							_doc = _win.document || {};
							_globals.gsap = gsap;
							(_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

							_install(_installScope || _win.GreenSockGlobals || (!_win.gsap && _win) || {});

							_raf = _win.requestAnimationFrame;

							_registerPluginQueue.forEach(_createPlugin);
						}

						_id && _self.sleep();

						_req =
							_raf ||
							function (f) {
								return setTimeout(f, (_nextTime - _self.time * 1000 + 1) | 0);
							};

						_tickerActive = 1;

						_tick(2);
					}
				},
				sleep: function sleep() {
					(_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
					_tickerActive = 0;
					_req = _emptyFunc;
				},
				lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
					_lagThreshold = threshold || Infinity; // zero should be interpreted as basically unlimited

					_adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
				},
				fps: function fps(_fps) {
					_gap = 1000 / (_fps || 240);
					_nextTime = _self.time * 1000 + _gap;
				},
				add: function add(callback, once, prioritize) {
					var func = once
						? function (t, d, f, v) {
								callback(t, d, f, v);

								_self.remove(func);
						  }
						: callback;

					_self.remove(callback);

					_listeners[prioritize ? "unshift" : "push"](func);

					_wake();

					return func;
				},
				remove: function remove(callback, i) {
					~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
				},
				_listeners: _listeners,
			};
			return _self;
		})(),
		_wake = function _wake() {
			return !_tickerActive && _ticker.wake();
		},
		//also ensures the core classes are initialized.

		/*
		 * -------------------------------------------------
		 * EASING
		 * -------------------------------------------------
		 */
		_easeMap = {},
		_customEaseExp = /^[\d.\-M][\d.\-,\s]/,
		_quotesExp = /["']/g,
		_parseObjectInString = function _parseObjectInString(value) {
			//takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
			var obj = {},
				split = value.substr(1, value.length - 3).split(":"),
				key = split[0],
				i = 1,
				l = split.length,
				index,
				val,
				parsedVal;

			for (; i < l; i++) {
				val = split[i];
				index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
				parsedVal = val.substr(0, index);
				obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
				key = val.substr(index + 1).trim();
			}

			return obj;
		},
		_valueInParentheses = function _valueInParentheses(value) {
			var open = value.indexOf("(") + 1,
				close = value.indexOf(")"),
				nested = value.indexOf("(", open);
			return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
		},
		_configEaseFromString = function _configEaseFromString(name) {
			//name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
			var split = (name + "").split("("),
				ease = _easeMap[split[0]];
			return ease && split.length > 1 && ease.config
				? ease.config.apply(
						null,
						~name.indexOf("{")
							? [_parseObjectInString(split[1])]
							: _valueInParentheses(name).split(",").map(_numericIfPossible)
				  )
				: _easeMap._CE && _customEaseExp.test(name)
				? _easeMap._CE("", name)
				: ease;
		},
		_invertEase = function _invertEase(ease) {
			return function (p) {
				return 1 - ease(1 - p);
			};
		},
		// allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
		_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
			var child = timeline._first,
				ease;

			while (child) {
				if (child instanceof Timeline) {
					_propagateYoyoEase(child, isYoyo);
				} else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
					if (child.timeline) {
						_propagateYoyoEase(child.timeline, isYoyo);
					} else {
						ease = child._ease;
						child._ease = child._yEase;
						child._yEase = ease;
						child._yoyo = isYoyo;
					}
				}

				child = child._next;
			}
		},
		_parseEase = function _parseEase(ease, defaultEase) {
			return !ease
				? defaultEase
				: (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
		},
		_insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
			if (easeOut === void 0) {
				easeOut = function easeOut(p) {
					return 1 - easeIn(1 - p);
				};
			}

			if (easeInOut === void 0) {
				easeInOut = function easeInOut(p) {
					return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
				};
			}

			var ease = {
					easeIn: easeIn,
					easeOut: easeOut,
					easeInOut: easeInOut,
				},
				lowercaseName;

			_forEachName(names, function (name) {
				_easeMap[name] = _globals[name] = ease;
				_easeMap[(lowercaseName = name.toLowerCase())] = easeOut;

				for (var p in ease) {
					_easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[
						name + "." + p
					] = ease[p];
				}
			});

			return ease;
		},
		_easeInOutFromOut = function _easeInOutFromOut(easeOut) {
			return function (p) {
				return p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2;
			};
		},
		_configElastic = function _configElastic(type, amplitude, period) {
			var p1 = amplitude >= 1 ? amplitude : 1,
				//note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
				p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1),
				p3 = (p2 / _2PI) * (Math.asin(1 / p1) || 0),
				easeOut = function easeOut(p) {
					return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
				},
				ease =
					type === "out"
						? easeOut
						: type === "in"
						? function (p) {
								return 1 - easeOut(1 - p);
						  }
						: _easeInOutFromOut(easeOut);

			p2 = _2PI / p2; //precalculate to optimize

			ease.config = function (amplitude, period) {
				return _configElastic(type, amplitude, period);
			};

			return ease;
		},
		_configBack = function _configBack(type, overshoot) {
			if (overshoot === void 0) {
				overshoot = 1.70158;
			}

			var easeOut = function easeOut(p) {
					return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
				},
				ease =
					type === "out"
						? easeOut
						: type === "in"
						? function (p) {
								return 1 - easeOut(1 - p);
						  }
						: _easeInOutFromOut(easeOut);

			ease.config = function (overshoot) {
				return _configBack(type, overshoot);
			};

			return ease;
		}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
	// _weightedEase = ratio => {
	// 	let y = 0.5 + ratio / 2;
	// 	return p => (2 * (1 - p) * p * y + p * p);
	// },
	// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
	// _weightedEaseStrong = ratio => {
	// 	ratio = .5 + ratio / 2;
	// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
	// 		b = ratio - o,
	// 		c = ratio + o;
	// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
	// };

	_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
		var power = i < 5 ? i + 1 : i;

		_insertEase(
			name + ",Power" + (power - 1),
			i
				? function (p) {
						return Math.pow(p, power);
				  }
				: function (p) {
						return p;
				  },
			function (p) {
				return 1 - Math.pow(1 - p, power);
			},
			function (p) {
				return p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
			}
		);
	});

	_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

	_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

	(function (n, c) {
		var n1 = 1 / c,
			n2 = 2 * n1,
			n3 = 2.5 * n1,
			easeOut = function easeOut(p) {
				return p < n1
					? n * p * p
					: p < n2
					? n * Math.pow(p - 1.5 / c, 2) + 0.75
					: p < n3
					? n * (p -= 2.25 / c) * p + 0.9375
					: n * Math.pow(p - 2.625 / c, 2) + 0.984375;
			};

		_insertEase(
			"Bounce",
			function (p) {
				return 1 - easeOut(1 - p);
			},
			easeOut
		);
	})(7.5625, 2.75);

	_insertEase("Expo", function (p) {
		return p ? Math.pow(2, 10 * (p - 1)) : 0;
	});

	_insertEase("Circ", function (p) {
		return -(_sqrt(1 - p * p) - 1);
	});

	_insertEase("Sine", function (p) {
		return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
	});

	_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

	_easeMap.SteppedEase =
		_easeMap.steps =
		_globals.SteppedEase =
			{
				config: function config(steps, immediateStart) {
					if (steps === void 0) {
						steps = 1;
					}

					var p1 = 1 / steps,
						p2 = steps + (immediateStart ? 0 : 1),
						p3 = immediateStart ? 1 : 0,
						max = 1 - _tinyNum;
					return function (p) {
						return (((p2 * _clamp(0, max, p)) | 0) + p3) * p1;
					};
				},
			};
	_defaults.ease = _easeMap["quad.out"];

	_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
		return (_callbackNames += name + "," + name + "Params,");
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * CACHE
	 * --------------------------------------------------------------------------------------
	 */

	var GSCache = function GSCache(target, harness) {
		this.id = _gsID++;
		target._gsap = this;
		this.target = target;
		this.harness = harness;
		this.get = harness ? harness.get : _getProperty;
		this.set = harness ? harness.getSetter : _getSetter;
	};
	/*
	 * --------------------------------------------------------------------------------------
	 * ANIMATION
	 * --------------------------------------------------------------------------------------
	 */

	var Animation = /*#__PURE__*/ (function () {
		function Animation(vars) {
			this.vars = vars;
			this._delay = +vars.delay || 0;

			if ((this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0)) {
				// TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
				this._rDelay = vars.repeatDelay || 0;
				this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
			}

			this._ts = 1;

			_setDuration(this, +vars.duration, 1, 1);

			this.data = vars.data;

			if (_context) {
				this._ctx = _context;

				_context.data.push(this);
			}

			_tickerActive || _ticker.wake();
		}

		var _proto = Animation.prototype;

		_proto.delay = function delay(value) {
			if (value || value === 0) {
				this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
				this._delay = value;
				return this;
			}

			return this._delay;
		};

		_proto.duration = function duration(value) {
			return arguments.length
				? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value)
				: this.totalDuration() && this._dur;
		};

		_proto.totalDuration = function totalDuration(value) {
			if (!arguments.length) {
				return this._tDur;
			}

			this._dirty = 0;
			return _setDuration(
				this,
				this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1)
			);
		};

		_proto.totalTime = function totalTime(_totalTime, suppressEvents) {
			_wake();

			if (!arguments.length) {
				return this._tTime;
			}

			var parent = this._dp;

			if (parent && parent.smoothChildTiming && this._ts) {
				_alignPlayhead(this, _totalTime);

				!parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
				//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

				while (parent && parent.parent) {
					if (
						parent.parent._time !==
						parent._start +
							(parent._ts >= 0
								? parent._tTime / parent._ts
								: (parent.totalDuration() - parent._tTime) / -parent._ts)
					) {
						parent.totalTime(parent._tTime, true);
					}

					parent = parent.parent;
				}

				if (
					!this.parent &&
					this._dp.autoRemoveChildren &&
					((this._ts > 0 && _totalTime < this._tDur) ||
						(this._ts < 0 && _totalTime > 0) ||
						(!this._tDur && !_totalTime))
				) {
					//if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
					_addToTimeline(this._dp, this, this._start - this._delay);
				}
			}

			if (
				this._tTime !== _totalTime ||
				(!this._dur && !suppressEvents) ||
				(this._initted && Math.abs(this._zTime) === _tinyNum) ||
				(!_totalTime && !this._initted && (this.add || this._ptLookup))
			) {
				// check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
				this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
				//if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
				//   this._lock = 1;

				_lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
				//}
			}

			return this;
		};

		_proto.time = function time(value, suppressEvents) {
			return arguments.length
				? this.totalTime(
						Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) %
							(this._dur + this._rDelay) || (value ? this._dur : 0),
						suppressEvents
				  )
				: this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
		};

		_proto.totalProgress = function totalProgress(value, suppressEvents) {
			return arguments.length
				? this.totalTime(this.totalDuration() * value, suppressEvents)
				: this.totalDuration()
				? Math.min(1, this._tTime / this._tDur)
				: this.ratio;
		};

		_proto.progress = function progress(value, suppressEvents) {
			return arguments.length
				? this.totalTime(
						this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) +
							_elapsedCycleDuration(this),
						suppressEvents
				  )
				: this.duration()
				? Math.min(1, this._time / this._dur)
				: this.ratio;
		};

		_proto.iteration = function iteration(value, suppressEvents) {
			var cycleDuration = this.duration() + this._rDelay;

			return arguments.length
				? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents)
				: this._repeat
				? _animationCycle(this._tTime, cycleDuration) + 1
				: 1;
		}; // potential future addition:
		// isPlayingBackwards() {
		// 	let animation = this,
		// 		orientation = 1; // 1 = forward, -1 = backward
		// 	while (animation) {
		// 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
		// 		animation = animation.parent;
		// 	}
		// 	return orientation < 0;
		// }

		_proto.timeScale = function timeScale(value) {
			if (!arguments.length) {
				return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
			}

			if (this._rts === value) {
				return this;
			}

			var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
			// future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
			//(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
			// prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

			this._rts = +value || 0;
			this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

			this.totalTime(_clamp(-Math.abs(this._delay), this._tDur, tTime), true);

			_setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.

			return _recacheAncestors(this);
		};

		_proto.paused = function paused(value) {
			if (!arguments.length) {
				return this._ps;
			}

			if (this._ps !== value) {
				this._ps = value;

				if (value) {
					this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

					this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
				} else {
					_wake();

					this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

					this.totalTime(
						this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime,
						this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)
					); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
				}
			}

			return this;
		};

		_proto.startTime = function startTime(value) {
			if (arguments.length) {
				this._start = value;
				var parent = this.parent || this._dp;
				parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
				return this;
			}

			return this._start;
		};

		_proto.endTime = function endTime(includeRepeats) {
			return (
				this._start +
				(_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
			);
		};

		_proto.rawTime = function rawTime(wrapRepeats) {
			var parent = this.parent || this._dp; // _dp = detached parent

			return !parent
				? this._tTime
				: wrapRepeats && (!this._ts || (this._repeat && this._time && this.totalProgress() < 1))
				? this._tTime % (this._dur + this._rDelay)
				: !this._ts
				? this._tTime
				: _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
		};

		_proto.revert = function revert(config) {
			if (config === void 0) {
				config = _revertConfig;
			}

			var prevIsReverting = _reverting;
			_reverting = config;

			if (this._initted || this._startAt) {
				this.timeline && this.timeline.revert(config);
				this.totalTime(-0.01, config.suppressEvents);
			}

			this.data !== "nested" && config.kill !== false && this.kill();
			_reverting = prevIsReverting;
			return this;
		};

		_proto.globalTime = function globalTime(rawTime) {
			var animation = this,
				time = arguments.length ? rawTime : animation.rawTime();

			while (animation) {
				time = animation._start + time / (animation._ts || 1);
				animation = animation._dp;
			}

			return !this.parent && this._sat
				? this._sat.vars.immediateRender
					? -1
					: this._sat.globalTime(rawTime)
				: time; // the _startAt tweens for .fromTo() and .from() that have immediateRender should always be FIRST in the timeline (important for context.revert()). "_sat" stands for _startAtTween, referring to the parent tween that created the _startAt. We must discern if that tween had immediateRender so that we can know whether or not to prioritize it in revert().
		};

		_proto.repeat = function repeat(value) {
			if (arguments.length) {
				this._repeat = value === Infinity ? -2 : value;
				return _onUpdateTotalDuration(this);
			}

			return this._repeat === -2 ? Infinity : this._repeat;
		};

		_proto.repeatDelay = function repeatDelay(value) {
			if (arguments.length) {
				var time = this._time;
				this._rDelay = value;

				_onUpdateTotalDuration(this);

				return time ? this.time(time) : this;
			}

			return this._rDelay;
		};

		_proto.yoyo = function yoyo(value) {
			if (arguments.length) {
				this._yoyo = value;
				return this;
			}

			return this._yoyo;
		};

		_proto.seek = function seek(position, suppressEvents) {
			return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
		};

		_proto.restart = function restart(includeDelay, suppressEvents) {
			return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
		};

		_proto.play = function play(from, suppressEvents) {
			from != null && this.seek(from, suppressEvents);
			return this.reversed(false).paused(false);
		};

		_proto.reverse = function reverse(from, suppressEvents) {
			from != null && this.seek(from || this.totalDuration(), suppressEvents);
			return this.reversed(true).paused(false);
		};

		_proto.pause = function pause(atTime, suppressEvents) {
			atTime != null && this.seek(atTime, suppressEvents);
			return this.paused(true);
		};

		_proto.resume = function resume() {
			return this.paused(false);
		};

		_proto.reversed = function reversed(value) {
			if (arguments.length) {
				!!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

				return this;
			}

			return this._rts < 0;
		};

		_proto.invalidate = function invalidate() {
			this._initted = this._act = 0;
			this._zTime = -_tinyNum;
			return this;
		};

		_proto.isActive = function isActive() {
			var parent = this.parent || this._dp,
				start = this._start,
				rawTime;
			return !!(
				!parent ||
				(this._ts &&
					this._initted &&
					parent.isActive() &&
					(rawTime = parent.rawTime(true)) >= start &&
					rawTime < this.endTime(true) - _tinyNum)
			);
		};

		_proto.eventCallback = function eventCallback(type, callback, params) {
			var vars = this.vars;

			if (arguments.length > 1) {
				if (!callback) {
					delete vars[type];
				} else {
					vars[type] = callback;
					params && (vars[type + "Params"] = params);
					type === "onUpdate" && (this._onUpdate = callback);
				}

				return this;
			}

			return vars[type];
		};

		_proto.then = function then(onFulfilled) {
			var self = this;
			return new Promise(function (resolve) {
				var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
					_resolve = function _resolve() {
						var _then = self.then;
						self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

						_isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
						resolve(f);
						self.then = _then;
					};

				if ((self._initted && self.totalProgress() === 1 && self._ts >= 0) || (!self._tTime && self._ts < 0)) {
					_resolve();
				} else {
					self._prom = _resolve;
				}
			});
		};

		_proto.kill = function kill() {
			_interrupt(this);
		};

		return Animation;
	})();

	_setDefaults(Animation.prototype, {
		_time: 0,
		_start: 0,
		_end: 0,
		_tTime: 0,
		_tDur: 0,
		_dirty: 0,
		_repeat: 0,
		_yoyo: false,
		parent: null,
		_initted: false,
		_rDelay: 0,
		_ts: 1,
		_dp: 0,
		ratio: 0,
		_zTime: -_tinyNum,
		_prom: 0,
		_ps: false,
		_rts: 1,
	});
	/*
	 * -------------------------------------------------
	 * TIMELINE
	 * -------------------------------------------------
	 */

	var Timeline = /*#__PURE__*/ (function (_Animation) {
		_inheritsLoose(Timeline, _Animation);

		function Timeline(vars, position) {
			var _this;

			if (vars === void 0) {
				vars = {};
			}

			_this = _Animation.call(this, vars) || this;
			_this.labels = {};
			_this.smoothChildTiming = !!vars.smoothChildTiming;
			_this.autoRemoveChildren = !!vars.autoRemoveChildren;
			_this._sort = _isNotFalse(vars.sortChildren);
			_globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
			vars.reversed && _this.reverse();
			vars.paused && _this.paused(true);
			vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
			return _this;
		}

		var _proto2 = Timeline.prototype;

		_proto2.to = function to(targets, vars, position) {
			_createTweenType(0, arguments, this);

			return this;
		};

		_proto2.from = function from(targets, vars, position) {
			_createTweenType(1, arguments, this);

			return this;
		};

		_proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
			_createTweenType(2, arguments, this);

			return this;
		};

		_proto2.set = function set(targets, vars, position) {
			vars.duration = 0;
			vars.parent = this;
			_inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
			vars.immediateRender = !!vars.immediateRender;
			new Tween(targets, vars, _parsePosition(this, position), 1);
			return this;
		};

		_proto2.call = function call(callback, params, position) {
			return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
		}; //ONLY for backward compatibility! Maybe delete?

		_proto2.staggerTo = function staggerTo(
			targets,
			duration,
			vars,
			stagger,
			position,
			onCompleteAll,
			onCompleteAllParams
		) {
			vars.duration = duration;
			vars.stagger = vars.stagger || stagger;
			vars.onComplete = onCompleteAll;
			vars.onCompleteParams = onCompleteAllParams;
			vars.parent = this;
			new Tween(targets, vars, _parsePosition(this, position));
			return this;
		};

		_proto2.staggerFrom = function staggerFrom(
			targets,
			duration,
			vars,
			stagger,
			position,
			onCompleteAll,
			onCompleteAllParams
		) {
			vars.runBackwards = 1;
			_inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
		};

		_proto2.staggerFromTo = function staggerFromTo(
			targets,
			duration,
			fromVars,
			toVars,
			stagger,
			position,
			onCompleteAll,
			onCompleteAllParams
		) {
			toVars.startAt = fromVars;
			_inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
		};

		_proto2.render = function render(totalTime, suppressEvents, force) {
			var prevTime = this._time,
				tDur = this._dirty ? this.totalDuration() : this._tDur,
				dur = this._dur,
				tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
				// if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
				crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
				time,
				child,
				next,
				iteration,
				cycleDuration,
				prevPaused,
				pauseTween,
				timeScale,
				prevStart,
				prevIteration,
				yoyo,
				isYoyo;
			this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);

			if (tTime !== this._tTime || force || crossingStart) {
				if (prevTime !== this._time && dur) {
					//if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
					tTime += this._time - prevTime;
					totalTime += this._time - prevTime;
				}

				time = tTime;
				prevStart = this._start;
				timeScale = this._ts;
				prevPaused = !timeScale;

				if (crossingStart) {
					dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

					(totalTime || !suppressEvents) && (this._zTime = totalTime);
				}

				if (this._repeat) {
					//adjust the time for repeats and yoyos
					yoyo = this._yoyo;
					cycleDuration = dur + this._rDelay;

					if (this._repeat < -1 && totalTime < 0) {
						return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
					}

					time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

					if (tTime === tDur) {
						// the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
						iteration = this._repeat;
						time = dur;
					} else {
						iteration = ~~(tTime / cycleDuration);

						if (iteration && iteration === tTime / cycleDuration) {
							time = dur;
							iteration--;
						}

						time > dur && (time = dur);
					}

					prevIteration = _animationCycle(this._tTime, cycleDuration);
					!prevTime &&
						this._tTime &&
						prevIteration !== iteration &&
						this._tTime - prevIteration * cycleDuration - this._dur <= 0 &&
						(prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005 also, this._tTime - prevIteration * cycleDuration - this._dur <= 0 just checks to make sure it wasn't previously in the "repeatDelay" portion

					if (yoyo && iteration & 1) {
						time = dur - time;
						isYoyo = 1;
					}
					/*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */

					if (iteration !== prevIteration && !this._lock) {
						var rewinding = yoyo && prevIteration & 1,
							doesWrap = rewinding === (yoyo && iteration & 1);
						iteration < prevIteration && (rewinding = !rewinding);
						prevTime = rewinding ? 0 : dur;
						this._lock = 1;
						this.render(
							prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)),
							suppressEvents,
							!dur
						)._lock = 0;
						this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

						!suppressEvents && this.parent && _callback(this, "onRepeat");
						this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

						if (
							(prevTime && prevTime !== this._time) ||
							prevPaused !== !this._ts ||
							(this.vars.onRepeat && !this.parent && !this._act)
						) {
							// if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
							return this;
						}

						dur = this._dur; // in case the duration changed in the onRepeat

						tDur = this._tDur;

						if (doesWrap) {
							this._lock = 2;
							prevTime = rewinding ? dur : -0.0001;
							this.render(prevTime, true);
							this.vars.repeatRefresh && !isYoyo && this.invalidate();
						}

						this._lock = 0;

						if (!this._ts && !prevPaused) {
							return this;
						} //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.

						_propagateYoyoEase(this, isYoyo);
					}
				}

				if (this._hasPause && !this._forcing && this._lock < 2) {
					pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));

					if (pauseTween) {
						tTime -= time - (time = pauseTween._start);
					}
				}

				this._tTime = tTime;
				this._time = time;
				this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

				if (!this._initted) {
					this._onUpdate = this.vars.onUpdate;
					this._initted = 1;
					this._zTime = totalTime;
					prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
				}

				if (!prevTime && time && !suppressEvents && !iteration) {
					_callback(this, "onStart");

					if (this._tTime !== tTime) {
						// in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
						return this;
					}
				}

				if (time >= prevTime && totalTime >= 0) {
					child = this._first;

					while (child) {
						next = child._next;

						if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
							if (child.parent !== this) {
								// an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
								return this.render(totalTime, suppressEvents, force);
							}

							child.render(
								child._ts > 0
									? (time - child._start) * child._ts
									: (child._dirty ? child.totalDuration() : child._tDur) +
											(time - child._start) * child._ts,
								suppressEvents,
								force
							);

							if (time !== this._time || (!this._ts && !prevPaused)) {
								//in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
								pauseTween = 0;
								next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

								break;
							}
						}

						child = next;
					}
				} else {
					child = this._last;
					var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

					while (child) {
						next = child._prev;

						if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
							if (child.parent !== this) {
								// an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
								return this.render(totalTime, suppressEvents, force);
							}

							child.render(
								child._ts > 0
									? (adjustedTime - child._start) * child._ts
									: (child._dirty ? child.totalDuration() : child._tDur) +
											(adjustedTime - child._start) * child._ts,
								suppressEvents,
								force || (_reverting && (child._initted || child._startAt))
							); // if reverting, we should always force renders of initted tweens (but remember that .fromTo() or .from() may have a _startAt but not _initted yet). If, for example, a .fromTo() tween with a stagger (which creates an internal timeline) gets reverted BEFORE some of its child tweens render for the first time, it may not properly trigger them to revert.

							if (time !== this._time || (!this._ts && !prevPaused)) {
								//in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
								pauseTween = 0;
								next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

								break;
							}
						}

						child = next;
					}
				}

				if (pauseTween && !suppressEvents) {
					this.pause();
					pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

					if (this._ts) {
						//the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
						this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

						_setEnd(this);

						return this.render(totalTime, suppressEvents, force);
					}
				}

				this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
				if ((tTime === tDur && this._tTime >= this.totalDuration()) || (!tTime && prevTime))
					if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts))
						if (!this._lock) {
							// remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
							(totalTime || !dur) &&
								((tTime === tDur && this._ts > 0) || (!tTime && this._ts < 0)) &&
								_removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

							if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
								_callback(
									this,
									tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete",
									true
								);

								this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
							}
						}
			}

			return this;
		};

		_proto2.add = function add(child, position) {
			var _this2 = this;

			_isNumber(position) || (position = _parsePosition(this, position, child));

			if (!(child instanceof Animation)) {
				if (_isArray(child)) {
					child.forEach(function (obj) {
						return _this2.add(obj, position);
					});
					return this;
				}

				if (_isString(child)) {
					return this.addLabel(child, position);
				}

				if (_isFunction(child)) {
					child = Tween.delayedCall(0, child);
				} else {
					return this;
				}
			}

			return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
		};

		_proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
			if (nested === void 0) {
				nested = true;
			}

			if (tweens === void 0) {
				tweens = true;
			}

			if (timelines === void 0) {
				timelines = true;
			}

			if (ignoreBeforeTime === void 0) {
				ignoreBeforeTime = -_bigNum;
			}

			var a = [],
				child = this._first;

			while (child) {
				if (child._start >= ignoreBeforeTime) {
					if (child instanceof Tween) {
						tweens && a.push(child);
					} else {
						timelines && a.push(child);
						nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
					}
				}

				child = child._next;
			}

			return a;
		};

		_proto2.getById = function getById(id) {
			var animations = this.getChildren(1, 1, 1),
				i = animations.length;

			while (i--) {
				if (animations[i].vars.id === id) {
					return animations[i];
				}
			}
		};

		_proto2.remove = function remove(child) {
			if (_isString(child)) {
				return this.removeLabel(child);
			}

			if (_isFunction(child)) {
				return this.killTweensOf(child);
			}

			_removeLinkedListItem(this, child);

			if (child === this._recent) {
				this._recent = this._last;
			}

			return _uncache(this);
		};

		_proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
			if (!arguments.length) {
				return this._tTime;
			}

			this._forcing = 1;

			if (!this._dp && this._ts) {
				//special case for the global timeline (or any other that has no parent or detached parent).
				this._start = _roundPrecise(
					_ticker.time -
						(this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts)
				);
			}

			_Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

			this._forcing = 0;
			return this;
		};

		_proto2.addLabel = function addLabel(label, position) {
			this.labels[label] = _parsePosition(this, position);
			return this;
		};

		_proto2.removeLabel = function removeLabel(label) {
			delete this.labels[label];
			return this;
		};

		_proto2.addPause = function addPause(position, callback, params) {
			var t = Tween.delayedCall(0, callback || _emptyFunc, params);
			t.data = "isPause";
			this._hasPause = 1;
			return _addToTimeline(this, t, _parsePosition(this, position));
		};

		_proto2.removePause = function removePause(position) {
			var child = this._first;
			position = _parsePosition(this, position);

			while (child) {
				if (child._start === position && child.data === "isPause") {
					_removeFromParent(child);
				}

				child = child._next;
			}
		};

		_proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
			var tweens = this.getTweensOf(targets, onlyActive),
				i = tweens.length;

			while (i--) {
				_overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
			}

			return this;
		};

		_proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
			var a = [],
				parsedTargets = toArray(targets),
				child = this._first,
				isGlobalTime = _isNumber(onlyActive),
				// a number is interpreted as a global time. If the animation spans
				children;

			while (child) {
				if (child instanceof Tween) {
					if (
						_arrayContainsAny(child._targets, parsedTargets) &&
						(isGlobalTime
							? (!_overwritingTween || (child._initted && child._ts)) &&
							  child.globalTime(0) <= onlyActive &&
							  child.globalTime(child.totalDuration()) > onlyActive
							: !onlyActive || child.isActive())
					) {
						// note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
						a.push(child);
					}
				} else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
					a.push.apply(a, children);
				}

				child = child._next;
			}

			return a;
		}; // potential future feature - targets() on timelines
		// targets() {
		// 	let result = [];
		// 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
		// 	return result.filter((v, i) => result.indexOf(v) === i);
		// }

		_proto2.tweenTo = function tweenTo(position, vars) {
			vars = vars || {};

			var tl = this,
				endTime = _parsePosition(tl, position),
				_vars = vars,
				startAt = _vars.startAt,
				_onStart = _vars.onStart,
				onStartParams = _vars.onStartParams,
				immediateRender = _vars.immediateRender,
				initted,
				tween = Tween.to(
					tl,
					_setDefaults(
						{
							ease: vars.ease || "none",
							lazy: false,
							immediateRender: false,
							time: endTime,
							overwrite: "auto",
							duration:
								vars.duration ||
								Math.abs(
									(endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) /
										tl.timeScale()
								) ||
								_tinyNum,
							onStart: function onStart() {
								tl.pause();

								if (!initted) {
									var duration =
										vars.duration ||
										Math.abs(
											(endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) /
												tl.timeScale()
										);
									tween._dur !== duration &&
										_setDuration(tween, duration, 0, 1).render(tween._time, true, true);
									initted = 1;
								}

								_onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
							},
						},
						vars
					)
				);

			return immediateRender ? tween.render(0) : tween;
		};

		_proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
			return this.tweenTo(
				toPosition,
				_setDefaults(
					{
						startAt: {
							time: _parsePosition(this, fromPosition),
						},
					},
					vars
				)
			);
		};

		_proto2.recent = function recent() {
			return this._recent;
		};

		_proto2.nextLabel = function nextLabel(afterTime) {
			if (afterTime === void 0) {
				afterTime = this._time;
			}

			return _getLabelInDirection(this, _parsePosition(this, afterTime));
		};

		_proto2.previousLabel = function previousLabel(beforeTime) {
			if (beforeTime === void 0) {
				beforeTime = this._time;
			}

			return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
		};

		_proto2.currentLabel = function currentLabel(value) {
			return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
		};

		_proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
			if (ignoreBeforeTime === void 0) {
				ignoreBeforeTime = 0;
			}

			var child = this._first,
				labels = this.labels,
				p;

			while (child) {
				if (child._start >= ignoreBeforeTime) {
					child._start += amount;
					child._end += amount;
				}

				child = child._next;
			}

			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}

			return _uncache(this);
		};

		_proto2.invalidate = function invalidate(soft) {
			var child = this._first;
			this._lock = 0;

			while (child) {
				child.invalidate(soft);
				child = child._next;
			}

			return _Animation.prototype.invalidate.call(this, soft);
		};

		_proto2.clear = function clear(includeLabels) {
			if (includeLabels === void 0) {
				includeLabels = true;
			}

			var child = this._first,
				next;

			while (child) {
				next = child._next;
				this.remove(child);
				child = next;
			}

			this._dp && (this._time = this._tTime = this._pTime = 0);
			includeLabels && (this.labels = {});
			return _uncache(this);
		};

		_proto2.totalDuration = function totalDuration(value) {
			var max = 0,
				self = this,
				child = self._last,
				prevStart = _bigNum,
				prev,
				start,
				parent;

			if (arguments.length) {
				return self.timeScale(
					(self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value)
				);
			}

			if (self._dirty) {
				parent = self.parent;

				while (child) {
					prev = child._prev; //record it here in case the tween changes position in the sequence...

					child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

					start = child._start;

					if (start > prevStart && self._sort && child._ts && !self._lock) {
						//in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
						self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

						_addToTimeline(self, child, start - child._delay, 1)._lock = 0;
					} else {
						prevStart = start;
					}

					if (start < 0 && child._ts) {
						//children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
						max -= start;

						if ((!parent && !self._dp) || (parent && parent.smoothChildTiming)) {
							self._start += start / self._ts;
							self._time -= start;
							self._tTime -= start;
						}

						self.shiftChildren(-start, false, -1e999);
						prevStart = 0;
					}

					child._end > max && child._ts && (max = child._end);
					child = prev;
				}

				_setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

				self._dirty = 0;
			}

			return self._tDur;
		};

		Timeline.updateRoot = function updateRoot(time) {
			if (_globalTimeline._ts) {
				_lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

				_lastRenderedFrame = _ticker.frame;
			}

			if (_ticker.frame >= _nextGCFrame) {
				_nextGCFrame += _config.autoSleep || 120;
				var child = _globalTimeline._first;
				if (!child || !child._ts)
					if (_config.autoSleep && _ticker._listeners.length < 2) {
						while (child && !child._ts) {
							child = child._next;
						}

						child || _ticker.sleep();
					}
			}
		};

		return Timeline;
	})(Animation);

	_setDefaults(Timeline.prototype, {
		_lock: 0,
		_hasPause: 0,
		_forcing: 0,
	});

	var _addComplexStringPropTween = function _addComplexStringPropTween(
			target,
			prop,
			start,
			end,
			setter,
			stringFilter,
			funcParam
		) {
			//note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
			var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
				index = 0,
				matchIndex = 0,
				result,
				startNums,
				color,
				endNum,
				chunk,
				startNum,
				hasRandom,
				a;
			pt.b = start;
			pt.e = end;
			start += ""; //ensure values are strings

			end += "";

			if ((hasRandom = ~end.indexOf("random("))) {
				end = _replaceRandom(end);
			}

			if (stringFilter) {
				a = [start, end];
				stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

				start = a[0];
				end = a[1];
			}

			startNums = start.match(_complexStringNumExp) || [];

			while ((result = _complexStringNumExp.exec(end))) {
				endNum = result[0];
				chunk = end.substring(index, result.index);

				if (color) {
					color = (color + 1) % 5;
				} else if (chunk.substr(-5) === "rgba(") {
					color = 1;
				}

				if (endNum !== startNums[matchIndex++]) {
					startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

					pt._pt = {
						_next: pt._pt,
						p: chunk || matchIndex === 1 ? chunk : ",",
						//note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
						s: startNum,
						c:
							endNum.charAt(1) === "="
								? _parseRelative(startNum, endNum) - startNum
								: parseFloat(endNum) - startNum,
						m: color && color < 4 ? Math.round : 0,
					};
					index = _complexStringNumExp.lastIndex;
				}
			}

			pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

			pt.fp = funcParam;

			if (_relExp.test(end) || hasRandom) {
				pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
			}

			this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

			return pt;
		},
		_addPropTween = function _addPropTween(
			target,
			prop,
			start,
			end,
			index,
			targets,
			modifier,
			stringFilter,
			funcParam,
			optional
		) {
			_isFunction(end) && (end = end(index || 0, target, targets));
			var currentValue = target[prop],
				parsedStart =
					start !== "get"
						? start
						: !_isFunction(currentValue)
						? currentValue
						: funcParam
						? target[
								prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)])
									? prop
									: "get" + prop.substr(3)
						  ](funcParam)
						: target[prop](),
				setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
				pt;

			if (_isString(end)) {
				if (~end.indexOf("random(")) {
					end = _replaceRandom(end);
				}

				if (end.charAt(1) === "=") {
					pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);

					if (pt || pt === 0) {
						// to avoid isNaN, like if someone passes in a value like "!= whatever"
						end = pt;
					}
				}
			}

			if (!optional || parsedStart !== end || _forceAllPropTweens) {
				if (!isNaN(parsedStart * end) && end !== "") {
					// fun fact: any number multiplied by "" is evaluated as the number 0!
					pt = new PropTween(
						this._pt,
						target,
						prop,
						+parsedStart || 0,
						end - (parsedStart || 0),
						typeof currentValue === "boolean" ? _renderBoolean : _renderPlain,
						0,
						setter
					);
					funcParam && (pt.fp = funcParam);
					modifier && pt.modifier(modifier, this, target);
					return (this._pt = pt);
				}

				!currentValue && !(prop in target) && _missingPlugin(prop, end);
				return _addComplexStringPropTween.call(
					this,
					target,
					prop,
					parsedStart,
					end,
					setter,
					stringFilter || _config.stringFilter,
					funcParam
				);
			}
		},
		//creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
		_processVars = function _processVars(vars, index, target, targets, tween) {
			_isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

			if (!_isObject(vars) || (vars.style && vars.nodeType) || _isArray(vars) || _isTypedArray(vars)) {
				return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
			}

			var copy = {},
				p;

			for (p in vars) {
				copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
			}

			return copy;
		},
		_checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
			var plugin, pt, ptLookup, i;

			if (
				_plugins[property] &&
				(plugin = new _plugins[property]()).init(
					target,
					plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween),
					tween,
					index,
					targets
				) !== false
			) {
				tween._pt = pt = new PropTween(
					tween._pt,
					target,
					property,
					0,
					1,
					plugin.render,
					plugin,
					0,
					plugin.priority
				);

				if (tween !== _quickTween) {
					ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

					i = plugin._props.length;

					while (i--) {
						ptLookup[plugin._props[i]] = pt;
					}
				}
			}

			return plugin;
		},
		_overwritingTween,
		//store a reference temporarily so we can avoid overwriting itself.
		_forceAllPropTweens,
		_initTween = function _initTween(tween, time, tTime) {
			var vars = tween.vars,
				ease = vars.ease,
				startAt = vars.startAt,
				immediateRender = vars.immediateRender,
				lazy = vars.lazy,
				onUpdate = vars.onUpdate,
				onUpdateParams = vars.onUpdateParams,
				callbackScope = vars.callbackScope,
				runBackwards = vars.runBackwards,
				yoyoEase = vars.yoyoEase,
				keyframes = vars.keyframes,
				autoRevert = vars.autoRevert,
				dur = tween._dur,
				prevStartAt = tween._startAt,
				targets = tween._targets,
				parent = tween.parent,
				fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets,
				autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
				tl = tween.timeline,
				cleanVars,
				i,
				p,
				pt,
				target,
				hasPriority,
				gsData,
				harness,
				plugin,
				ptLookup,
				index,
				harnessVars,
				overwritten;
			tl && (!keyframes || !ease) && (ease = "none");
			tween._ease = _parseEase(ease, _defaults.ease);
			tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

			if (yoyoEase && tween._yoyo && !tween._repeat) {
				//there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
				yoyoEase = tween._yEase;
				tween._yEase = tween._ease;
				tween._ease = yoyoEase;
			}

			tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

			if (!tl || (keyframes && !vars.stagger)) {
				//if there's an internal timeline, skip all the parsing because we passed that task down the chain.
				harness = targets[0] ? _getCache(targets[0]).harness : 0;
				harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

				cleanVars = _copyExcluding(vars, _reservedProps);

				if (prevStartAt) {
					prevStartAt._zTime < 0 && prevStartAt.progress(1); // in case it's a lazy startAt that hasn't rendered yet.

					time < 0 && runBackwards && immediateRender && !autoRevert
						? prevStartAt.render(-1, true)
						: prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig); // if it's a "startAt" (not "from()" or runBackwards: true), we only need to do a shallow revert (keep transforms cached in CSSPlugin)
					// don't just _removeFromParent(prevStartAt.render(-1, true)) because that'll leave inline styles. We're creating a new _startAt for "startAt" tweens that re-capture things to ensure that if the pre-tween values changed since the tween was created, they're recorded.

					prevStartAt._lazy = 0;
				}

				if (startAt) {
					_removeFromParent(
						(tween._startAt = Tween.set(
							targets,
							_setDefaults(
								{
									data: "isStart",
									overwrite: false,
									parent: parent,
									immediateRender: true,
									lazy: !prevStartAt && _isNotFalse(lazy),
									startAt: null,
									delay: 0,
									onUpdate: onUpdate,
									onUpdateParams: onUpdateParams,
									callbackScope: callbackScope,
									stagger: 0,
								},
								startAt
							)
						))
					); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);

					tween._startAt._dp = 0; // don't allow it to get put back into root timeline! Like when revert() is called and totalTime() gets set.

					tween._startAt._sat = tween; // used in globalTime(). _sat stands for _startAtTween

					time < 0 &&
						(_reverting || (!immediateRender && !autoRevert)) &&
						tween._startAt.revert(_revertConfigNoKill); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

					if (immediateRender) {
						if (dur && time <= 0 && tTime <= 0) {
							// check tTime here because in the case of a yoyo tween whose playhead gets pushed to the end like tween.progress(1), we should allow it through so that the onComplete gets fired properly.
							time && (tween._zTime = time);
							return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
						}
					}
				} else if (runBackwards && dur) {
					//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
					if (!prevStartAt) {
						time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

						p = _setDefaults(
							{
								overwrite: false,
								data: "isFromStart",
								//we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
								lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
								immediateRender: immediateRender,
								//zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
								stagger: 0,
								parent: parent, //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})
							},
							cleanVars
						);
						harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

						_removeFromParent((tween._startAt = Tween.set(targets, p)));

						tween._startAt._dp = 0; // don't allow it to get put back into root timeline!

						tween._startAt._sat = tween; // used in globalTime()

						time < 0 &&
							(_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
						tween._zTime = time;

						if (!immediateRender) {
							_initTween(tween._startAt, _tinyNum, _tinyNum); //ensures that the initial values are recorded
						} else if (!time) {
							return;
						}
					}
				}

				tween._pt = tween._ptCache = 0;
				lazy = (dur && _isNotFalse(lazy)) || (lazy && !dur);

				for (i = 0; i < targets.length; i++) {
					target = targets[i];
					gsData = target._gsap || _harness(targets)[i]._gsap;
					tween._ptLookup[i] = ptLookup = {};
					_lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

					index = fullTargets === targets ? i : fullTargets.indexOf(target);

					if (
						harness &&
						(plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !==
							false
					) {
						tween._pt = pt = new PropTween(
							tween._pt,
							target,
							plugin.name,
							0,
							1,
							plugin.render,
							plugin,
							0,
							plugin.priority
						);

						plugin._props.forEach(function (name) {
							ptLookup[name] = pt;
						});

						plugin.priority && (hasPriority = 1);
					}

					if (!harness || harnessVars) {
						for (p in cleanVars) {
							if (
								_plugins[p] &&
								(plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))
							) {
								plugin.priority && (hasPriority = 1);
							} else {
								ptLookup[p] = pt = _addPropTween.call(
									tween,
									target,
									p,
									"get",
									cleanVars[p],
									index,
									fullTargets,
									0,
									vars.stringFilter
								);
							}
						}
					}

					tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

					if (autoOverwrite && tween._pt) {
						_overwritingTween = tween;

						_globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!

						overwritten = !tween.parent;
						_overwritingTween = 0;
					}

					tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
				}

				hasPriority && _sortPropTweensByPriority(tween);
				tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
			}

			tween._onUpdate = onUpdate;
			tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.

			keyframes && time <= 0 && tl.render(_bigNum, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
		},
		_updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
			var ptCache = ((tween._pt && tween._ptCache) || (tween._ptCache = {}))[property],
				pt,
				rootPT,
				lookup,
				i;

			if (!ptCache) {
				ptCache = tween._ptCache[property] = [];
				lookup = tween._ptLookup;
				i = tween._targets.length;

				while (i--) {
					pt = lookup[i][property];

					if (pt && pt.d && pt.d._pt) {
						// it's a plugin, so find the nested PropTween
						pt = pt.d._pt;

						while (pt && pt.p !== property && pt.fp !== property) {
							// "fp" is functionParam for things like setting CSS variables which require .setProperty("--var-name", value)
							pt = pt._next;
						}
					}

					if (!pt) {
						// there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
						// if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
						_forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.

						tween.vars[property] = "+=0";

						_initTween(tween, time);

						_forceAllPropTweens = 0;
						return 1;
					}

					ptCache.push(pt);
				}
			}

			i = ptCache.length;

			while (i--) {
				rootPT = ptCache[i];
				pt = rootPT._pt || rootPT; // complex values may have nested PropTweens. We only accommodate the FIRST value.

				pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
				pt.c = value - pt.s;
				rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e)); // mainly for CSSPlugin (end value)

				rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b)); // (beginning value)
			}
		},
		_addAliasesToVars = function _addAliasesToVars(targets, vars) {
			var harness = targets[0] ? _getCache(targets[0]).harness : 0,
				propertyAliases = harness && harness.aliases,
				copy,
				p,
				i,
				aliases;

			if (!propertyAliases) {
				return vars;
			}

			copy = _merge({}, vars);

			for (p in propertyAliases) {
				if (p in copy) {
					aliases = propertyAliases[p].split(",");
					i = aliases.length;

					while (i--) {
						copy[aliases[i]] = copy[p];
					}
				}
			}

			return copy;
		},
		// parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
		_parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
			var ease = obj.ease || easeEach || "power1.inOut",
				p,
				a;

			if (_isArray(obj)) {
				a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease

				obj.forEach(function (value, i) {
					return a.push({
						t: (i / (obj.length - 1)) * 100,
						v: value,
						e: ease,
					});
				});
			} else {
				for (p in obj) {
					a = allProps[p] || (allProps[p] = []);
					p === "ease" ||
						a.push({
							t: parseFloat(prop),
							v: obj[p],
							e: ease,
						});
				}
			}
		},
		_parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
			return _isFunction(value)
				? value.call(tween, i, target, targets)
				: _isString(value) && ~value.indexOf("random(")
				? _replaceRandom(value)
				: value;
		},
		_staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
		_staggerPropsToSkip = {};

	_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
		return (_staggerPropsToSkip[name] = 1);
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * TWEEN
	 * --------------------------------------------------------------------------------------
	 */

	var Tween = /*#__PURE__*/ (function (_Animation2) {
		_inheritsLoose(Tween, _Animation2);

		function Tween(targets, vars, position, skipInherit) {
			var _this3;

			if (typeof vars === "number") {
				position.duration = vars;
				vars = position;
				position = null;
			}

			_this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
			var _this3$vars = _this3.vars,
				duration = _this3$vars.duration,
				delay = _this3$vars.delay,
				immediateRender = _this3$vars.immediateRender,
				stagger = _this3$vars.stagger,
				overwrite = _this3$vars.overwrite,
				keyframes = _this3$vars.keyframes,
				defaults = _this3$vars.defaults,
				scrollTrigger = _this3$vars.scrollTrigger,
				yoyoEase = _this3$vars.yoyoEase,
				parent = vars.parent || _globalTimeline,
				parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars)
					? [targets]
					: toArray(targets),
				tl,
				i,
				copy,
				l,
				p,
				curTarget,
				staggerFunc,
				staggerVarsToMerge;
			_this3._targets = parsedTargets.length
				? _harness(parsedTargets)
				: _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
			_this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

			_this3._overwrite = overwrite;

			if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
				vars = _this3.vars;
				tl = _this3.timeline = new Timeline({
					data: "nested",
					defaults: defaults || {},
					targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets,
				}); // we need to store the targets because for staggers and keyframes, we end up creating an individual tween for each but function-based values need to know the index and the whole Array of targets.

				tl.kill();
				tl.parent = tl._dp = _assertThisInitialized(_this3);
				tl._start = 0;

				if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
					l = parsedTargets.length;
					staggerFunc = stagger && distribute(stagger);

					if (_isObject(stagger)) {
						//users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
						for (p in stagger) {
							if (~_staggerTweenProps.indexOf(p)) {
								staggerVarsToMerge || (staggerVarsToMerge = {});
								staggerVarsToMerge[p] = stagger[p];
							}
						}
					}

					for (i = 0; i < l; i++) {
						copy = _copyExcluding(vars, _staggerPropsToSkip);
						copy.stagger = 0;
						yoyoEase && (copy.yoyoEase = yoyoEase);
						staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
						curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

						copy.duration = +_parseFuncOrString(
							duration,
							_assertThisInitialized(_this3),
							i,
							curTarget,
							parsedTargets
						);
						copy.delay =
							(+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) ||
								0) - _this3._delay;

						if (!stagger && l === 1 && copy.delay) {
							// if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
							_this3._delay = delay = copy.delay;
							_this3._start += delay;
							copy.delay = 0;
						}

						tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
						tl._ease = _easeMap.none;
					}

					tl.duration() ? (duration = delay = 0) : (_this3.timeline = 0); // if the timeline's duration is 0, we don't need a timeline internally!
				} else if (keyframes) {
					_inheritDefaults(
						_setDefaults(tl.vars.defaults, {
							ease: "none",
						})
					);

					tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
					var time = 0,
						a,
						kf,
						v;

					if (_isArray(keyframes)) {
						keyframes.forEach(function (frame) {
							return tl.to(parsedTargets, frame, ">");
						});
						tl.duration(); // to ensure tl._dur is cached because we tap into it for performance purposes in the render() method.
					} else {
						copy = {};

						for (p in keyframes) {
							p === "ease" ||
								p === "easeEach" ||
								_parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
						}

						for (p in copy) {
							a = copy[p].sort(function (a, b) {
								return a.t - b.t;
							});
							time = 0;

							for (i = 0; i < a.length; i++) {
								kf = a[i];
								v = {
									ease: kf.e,
									duration: ((kf.t - (i ? a[i - 1].t : 0)) / 100) * duration,
								};
								v[p] = kf.v;
								tl.to(parsedTargets, v, time);
								time += v.duration;
							}
						}

						tl.duration() < duration &&
							tl.to(
								{},
								{
									duration: duration - tl.duration(),
								}
							); // in case keyframes didn't go to 100%
					}
				}

				duration || _this3.duration((duration = tl.duration()));
			} else {
				_this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
			}

			if (overwrite === true && !_suppressOverwrites) {
				_overwritingTween = _assertThisInitialized(_this3);

				_globalTimeline.killTweensOf(parsedTargets);

				_overwritingTween = 0;
			}

			_addToTimeline(parent, _assertThisInitialized(_this3), position);

			vars.reversed && _this3.reverse();
			vars.paused && _this3.paused(true);

			if (
				immediateRender ||
				(!duration &&
					!keyframes &&
					_this3._start === _roundPrecise(parent._time) &&
					_isNotFalse(immediateRender) &&
					_hasNoPausedAncestors(_assertThisInitialized(_this3)) &&
					parent.data !== "nested")
			) {
				_this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

				_this3.render(Math.max(0, -delay) || 0); //in case delay is negative
			}

			scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
			return _this3;
		}

		var _proto3 = Tween.prototype;

		_proto3.render = function render(totalTime, suppressEvents, force) {
			var prevTime = this._time,
				tDur = this._tDur,
				dur = this._dur,
				isNegative = totalTime < 0,
				tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime,
				time,
				pt,
				iteration,
				cycleDuration,
				prevIteration,
				isYoyo,
				ratio,
				timeline,
				yoyoEase;

			if (!dur) {
				_renderZeroDurationTween(this, totalTime, suppressEvents, force);
			} else if (
				tTime !== this._tTime ||
				!totalTime ||
				force ||
				(!this._initted && this._tTime) ||
				(this._startAt && this._zTime < 0 !== isNegative)
			) {
				//this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
				time = tTime;
				timeline = this.timeline;

				if (this._repeat) {
					//adjust the time for repeats and yoyos
					cycleDuration = dur + this._rDelay;

					if (this._repeat < -1 && isNegative) {
						return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
					}

					time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

					if (tTime === tDur) {
						// the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
						iteration = this._repeat;
						time = dur;
					} else {
						iteration = ~~(tTime / cycleDuration);

						if (iteration && iteration === tTime / cycleDuration) {
							time = dur;
							iteration--;
						}

						time > dur && (time = dur);
					}

					isYoyo = this._yoyo && iteration & 1;

					if (isYoyo) {
						yoyoEase = this._yEase;
						time = dur - time;
					}

					prevIteration = _animationCycle(this._tTime, cycleDuration);

					if (time === prevTime && !force && this._initted) {
						//could be during the repeatDelay part. No need to render and fire callbacks.
						this._tTime = tTime;
						return this;
					}

					if (iteration !== prevIteration) {
						timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

						if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
							this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

							this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
						}
					}
				}

				if (!this._initted) {
					if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
						this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

						return this;
					}

					if (prevTime !== this._time) {
						// rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values.
						return this;
					}

					if (dur !== this._dur) {
						// while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
						return this.render(totalTime, suppressEvents, force);
					}
				}

				this._tTime = tTime;
				this._time = time;

				if (!this._act && this._ts) {
					this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

					this._lazy = 0;
				}

				this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

				if (this._from) {
					this.ratio = ratio = 1 - ratio;
				}

				if (time && !prevTime && !suppressEvents && !iteration) {
					_callback(this, "onStart");

					if (this._tTime !== tTime) {
						// in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
						return this;
					}
				}

				pt = this._pt;

				while (pt) {
					pt.r(ratio, pt.d);
					pt = pt._next;
				}

				(timeline &&
					timeline.render(
						totalTime < 0
							? totalTime
							: !time && isYoyo
							? -_tinyNum
							: timeline._dur * timeline._ease(time / this._dur),
						suppressEvents,
						force
					)) ||
					(this._startAt && (this._zTime = totalTime));

				if (this._onUpdate && !suppressEvents) {
					isNegative && _rewindStartAt(this, totalTime, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

					_callback(this, "onUpdate");
				}

				this._repeat &&
					iteration !== prevIteration &&
					this.vars.onRepeat &&
					!suppressEvents &&
					this.parent &&
					_callback(this, "onRepeat");

				if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
					isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
					(totalTime || !dur) &&
						((tTime === this._tDur && this._ts > 0) || (!tTime && this._ts < 0)) &&
						_removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

					if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
						// if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
						_callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

						this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
					}
				}
			}

			return this;
		};

		_proto3.targets = function targets() {
			return this._targets;
		};

		_proto3.invalidate = function invalidate(soft) {
			// "soft" gives us a way to clear out everything EXCEPT the recorded pre-"from" portion of from() tweens. Otherwise, for example, if you tween.progress(1).render(0, true true).invalidate(), the "from" values would persist and then on the next render, the from() tweens would initialize and the current value would match the "from" values, thus animate from the same value to the same value (no animation). We tap into this in ScrollTrigger's refresh() where we must push a tween to completion and then back again but honor its init state in case the tween is dependent on another tween further up on the page.
			(!soft || !this.vars.runBackwards) && (this._startAt = 0);
			this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
			this._ptLookup = [];
			this.timeline && this.timeline.invalidate(soft);
			return _Animation2.prototype.invalidate.call(this, soft);
		};

		_proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
			_tickerActive || _ticker.wake();
			this._ts || this.play();
			var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
				ratio;
			this._initted || _initTween(this, time);
			ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
			// possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
			// if (_isObject(property)) { // performance optimization
			// 	for (p in property) {
			// 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
			// 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
			// 		}
			// 	}
			// } else {

			if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) {
				return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
			} //}

			_alignPlayhead(this, 0);

			this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
			return this.render(0);
		};

		_proto3.kill = function kill(targets, vars) {
			if (vars === void 0) {
				vars = "all";
			}

			if (!targets && (!vars || vars === "all")) {
				this._lazy = this._pt = 0;
				return this.parent ? _interrupt(this) : this;
			}

			if (this.timeline) {
				var tDur = this.timeline.totalDuration();
				this.timeline.killTweensOf(
					targets,
					vars,
					_overwritingTween && _overwritingTween.vars.overwrite !== true
				)._first || _interrupt(this); // if nothing is left tweening, interrupt.

				this.parent &&
					tDur !== this.timeline.totalDuration() &&
					_setDuration(this, (this._dur * this.timeline._tDur) / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

				return this;
			}

			var parsedTargets = this._targets,
				killingTargets = targets ? toArray(targets) : parsedTargets,
				propTweenLookup = this._ptLookup,
				firstPT = this._pt,
				overwrittenProps,
				curLookup,
				curOverwriteProps,
				props,
				p,
				pt,
				i;

			if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
				vars === "all" && (this._pt = 0);
				return _interrupt(this);
			}

			overwrittenProps = this._op = this._op || [];

			if (vars !== "all") {
				//so people can pass in a comma-delimited list of property names
				if (_isString(vars)) {
					p = {};

					_forEachName(vars, function (name) {
						return (p[name] = 1);
					});

					vars = p;
				}

				vars = _addAliasesToVars(parsedTargets, vars);
			}

			i = parsedTargets.length;

			while (i--) {
				if (~killingTargets.indexOf(parsedTargets[i])) {
					curLookup = propTweenLookup[i];

					if (vars === "all") {
						overwrittenProps[i] = vars;
						props = curLookup;
						curOverwriteProps = {};
					} else {
						curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
						props = vars;
					}

					for (p in props) {
						pt = curLookup && curLookup[p];

						if (pt) {
							if (!("kill" in pt.d) || pt.d.kill(p) === true) {
								_removeLinkedListItem(this, pt, "_pt");
							}

							delete curLookup[p];
						}

						if (curOverwriteProps !== "all") {
							curOverwriteProps[p] = 1;
						}
					}
				}
			}

			this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

			return this;
		};

		Tween.to = function to(targets, vars) {
			return new Tween(targets, vars, arguments[2]);
		};

		Tween.from = function from(targets, vars) {
			return _createTweenType(1, arguments);
		};

		Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
			return new Tween(callback, 0, {
				immediateRender: false,
				lazy: false,
				overwrite: false,
				delay: delay,
				onComplete: callback,
				onReverseComplete: callback,
				onCompleteParams: params,
				onReverseCompleteParams: params,
				callbackScope: scope,
			}); // we must use onReverseComplete too for things like timeline.add(() => {...}) which should be triggered in BOTH directions (forward and reverse)
		};

		Tween.fromTo = function fromTo(targets, fromVars, toVars) {
			return _createTweenType(2, arguments);
		};

		Tween.set = function set(targets, vars) {
			vars.duration = 0;
			vars.repeatDelay || (vars.repeat = 0);
			return new Tween(targets, vars);
		};

		Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
			return _globalTimeline.killTweensOf(targets, props, onlyActive);
		};

		return Tween;
	})(Animation);

	_setDefaults(Tween.prototype, {
		_targets: [],
		_lazy: 0,
		_startAt: 0,
		_op: 0,
		_onInit: 0,
	}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
	// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
	// 	Tween.prototype[name] = function() {
	// 		let tl = new Timeline();
	// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
	// 	}
	// });
	//for backward compatibility. Leverage the timeline calls.

	_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
		Tween[name] = function () {
			var tl = new Timeline(),
				params = _slice.call(arguments, 0);

			params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
			return tl[name].apply(tl, params);
		};
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * PROPTWEEN
	 * --------------------------------------------------------------------------------------
	 */

	var _setterPlain = function _setterPlain(target, property, value) {
			return (target[property] = value);
		},
		_setterFunc = function _setterFunc(target, property, value) {
			return target[property](value);
		},
		_setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
			return target[property](data.fp, value);
		},
		_setterAttribute = function _setterAttribute(target, property, value) {
			return target.setAttribute(property, value);
		},
		_getSetter = function _getSetter(target, property) {
			return _isFunction(target[property])
				? _setterFunc
				: _isUndefined(target[property]) && target.setAttribute
				? _setterAttribute
				: _setterPlain;
		},
		_renderPlain = function _renderPlain(ratio, data) {
			return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
		},
		_renderBoolean = function _renderBoolean(ratio, data) {
			return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
		},
		_renderComplexString = function _renderComplexString(ratio, data) {
			var pt = data._pt,
				s = "";

			if (!ratio && data.b) {
				//b = beginning string
				s = data.b;
			} else if (ratio === 1 && data.e) {
				//e = ending string
				s = data.e;
			} else {
				while (pt) {
					s =
						pt.p +
						(pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) +
						s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

					pt = pt._next;
				}

				s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
			}

			data.set(data.t, data.p, s, data);
		},
		_renderPropTweens = function _renderPropTweens(ratio, data) {
			var pt = data._pt;

			while (pt) {
				pt.r(ratio, pt.d);
				pt = pt._next;
			}
		},
		_addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
			var pt = this._pt,
				next;

			while (pt) {
				next = pt._next;
				pt.p === property && pt.modifier(modifier, tween, target);
				pt = next;
			}
		},
		_killPropTweensOf = function _killPropTweensOf(property) {
			var pt = this._pt,
				hasNonDependentRemaining,
				next;

			while (pt) {
				next = pt._next;

				if ((pt.p === property && !pt.op) || pt.op === property) {
					_removeLinkedListItem(this, pt, "_pt");
				} else if (!pt.dep) {
					hasNonDependentRemaining = 1;
				}

				pt = next;
			}

			return !hasNonDependentRemaining;
		},
		_setterWithModifier = function _setterWithModifier(target, property, value, data) {
			data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
		},
		_sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
			var pt = parent._pt,
				next,
				pt2,
				first,
				last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

			while (pt) {
				next = pt._next;
				pt2 = first;

				while (pt2 && pt2.pr > pt.pr) {
					pt2 = pt2._next;
				}

				if ((pt._prev = pt2 ? pt2._prev : last)) {
					pt._prev._next = pt;
				} else {
					first = pt;
				}

				if ((pt._next = pt2)) {
					pt2._prev = pt;
				} else {
					last = pt;
				}

				pt = next;
			}

			parent._pt = first;
		}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)

	var PropTween = /*#__PURE__*/ (function () {
		function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
			this.t = target;
			this.s = start;
			this.c = change;
			this.p = prop;
			this.r = renderer || _renderPlain;
			this.d = data || this;
			this.set = setter || _setterPlain;
			this.pr = priority || 0;
			this._next = next;

			if (next) {
				next._prev = this;
			}
		}

		var _proto4 = PropTween.prototype;

		_proto4.modifier = function modifier(func, tween, target) {
			this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

			this.set = _setterWithModifier;
			this.m = func;
			this.mt = target; //modifier target

			this.tween = tween;
		};

		return PropTween;
	})(); //Initialization tasks

	_forEachName(
		_callbackNames +
			"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
		function (name) {
			return (_reservedProps[name] = 1);
		}
	);

	_globals.TweenMax = _globals.TweenLite = Tween;
	_globals.TimelineLite = _globals.TimelineMax = Timeline;
	_globalTimeline = new Timeline({
		sortChildren: false,
		defaults: _defaults,
		autoRemoveChildren: true,
		id: "root",
		smoothChildTiming: true,
	});
	_config.stringFilter = _colorStringFilter;

	var _media = [],
		_listeners = {},
		_emptyArray = [],
		_lastMediaTime = 0,
		_dispatch = function _dispatch(type) {
			return (_listeners[type] || _emptyArray).map(function (f) {
				return f();
			});
		},
		_onMediaChange = function _onMediaChange() {
			var time = Date.now(),
				matches = [];

			if (time - _lastMediaTime > 2) {
				_dispatch("matchMediaInit");

				_media.forEach(function (c) {
					var queries = c.queries,
						conditions = c.conditions,
						match,
						p,
						anyMatch,
						toggled;

					for (p in queries) {
						match = _win.matchMedia(queries[p]).matches; // Firefox doesn't update the "matches" property of the MediaQueryList object correctly - it only does so as it calls its change handler - so we must re-create a media query here to ensure it's accurate.

						match && (anyMatch = 1);

						if (match !== conditions[p]) {
							conditions[p] = match;
							toggled = 1;
						}
					}

					if (toggled) {
						c.revert();
						anyMatch && matches.push(c);
					}
				});

				_dispatch("matchMediaRevert");

				matches.forEach(function (c) {
					return c.onMatch(c);
				});
				_lastMediaTime = time;

				_dispatch("matchMedia");
			}
		};

	var Context = /*#__PURE__*/ (function () {
		function Context(func, scope) {
			this.selector = scope && selector(scope);
			this.data = [];
			this._r = []; // returned/cleanup functions

			this.isReverted = false;
			func && this.add(func);
		}

		var _proto5 = Context.prototype;

		_proto5.add = function add(name, func, scope) {
			// possible future addition if we need the ability to add() an animation to a context and for whatever reason cannot create that animation inside of a context.add(() => {...}) function.
			// if (name && _isFunction(name.revert)) {
			// 	this.data.push(name);
			// 	return (name._ctx = this);
			// }
			if (_isFunction(name)) {
				scope = func;
				func = name;
				name = _isFunction;
			}

			var self = this,
				f = function f() {
					var prev = _context,
						prevSelector = self.selector,
						result;
					prev && prev !== self && prev.data.push(self);
					scope && (self.selector = selector(scope));
					_context = self;
					result = func.apply(self, arguments);
					_isFunction(result) && self._r.push(result);
					_context = prev;
					self.selector = prevSelector;
					self.isReverted = false;
					return result;
				};

			self.last = f;
			return name === _isFunction ? f(self) : name ? (self[name] = f) : f;
		};

		_proto5.ignore = function ignore(func) {
			var prev = _context;
			_context = null;
			func(this);
			_context = prev;
		};

		_proto5.getTweens = function getTweens() {
			var a = [];
			this.data.forEach(function (e) {
				return e instanceof Context
					? a.push.apply(a, e.getTweens())
					: e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
			});
			return a;
		};

		_proto5.clear = function clear() {
			this._r.length = this.data.length = 0;
		};

		_proto5.kill = function kill(revert, matchMedia) {
			var _this4 = this;

			if (revert) {
				var tweens = this.getTweens();
				this.data.forEach(function (t) {
					// Flip plugin tweens are very different in that they should actually be pushed to their end. The plugin replaces the timeline's .revert() method to do exactly that. But we also need to remove any of those nested tweens inside the flip timeline so that they don't get individually reverted.
					if (t.data === "isFlip") {
						t.revert();
						t.getChildren(true, true, false).forEach(function (tween) {
							return tweens.splice(tweens.indexOf(tween), 1);
						});
					}
				}); // save as an object so that we can cache the globalTime for each tween to optimize performance during the sort

				tweens
					.map(function (t) {
						return {
							g: t.globalTime(0),
							t: t,
						};
					})
					.sort(function (a, b) {
						return b.g - a.g || -1;
					})
					.forEach(function (o) {
						return o.t.revert(revert);
					}); // note: all of the _startAt tweens should be reverted in reverse order that they were created, and they'll all have the same globalTime (-1) so the " || -1" in the sort keeps the order properly.

				this.data.forEach(function (e) {
					return !(e instanceof Animation) && e.revert && e.revert(revert);
				});

				this._r.forEach(function (f) {
					return f(revert, _this4);
				});

				this.isReverted = true;
			} else {
				this.data.forEach(function (e) {
					return e.kill && e.kill();
				});
			}

			this.clear();

			if (matchMedia) {
				var i = _media.indexOf(this);

				!!~i && _media.splice(i, 1);
			}
		};

		_proto5.revert = function revert(config) {
			this.kill(config || {});
		};

		return Context;
	})();

	var MatchMedia = /*#__PURE__*/ (function () {
		function MatchMedia(scope) {
			this.contexts = [];
			this.scope = scope;
		}

		var _proto6 = MatchMedia.prototype;

		_proto6.add = function add(conditions, func, scope) {
			_isObject(conditions) ||
				(conditions = {
					matches: conditions,
				});
			var context = new Context(0, scope || this.scope),
				cond = (context.conditions = {}),
				mq,
				p,
				active;
			this.contexts.push(context);
			func = context.add("onMatch", func);
			context.queries = conditions;

			for (p in conditions) {
				if (p === "all") {
					active = 1;
				} else {
					mq = _win.matchMedia(conditions[p]);

					if (mq) {
						_media.indexOf(context) < 0 && _media.push(context);
						(cond[p] = mq.matches) && (active = 1);
						mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
					}
				}
			}

			active && func(context);
			return this;
		}; // refresh() {
		// 	let time = _lastMediaTime,
		// 		media = _media;
		// 	_lastMediaTime = -1;
		// 	_media = this.contexts;
		// 	_onMediaChange();
		// 	_lastMediaTime = time;
		// 	_media = media;
		// }

		_proto6.revert = function revert(config) {
			this.kill(config || {});
		};

		_proto6.kill = function kill(revert) {
			this.contexts.forEach(function (c) {
				return c.kill(revert, true);
			});
		};

		return MatchMedia;
	})();
	/*
	 * --------------------------------------------------------------------------------------
	 * GSAP
	 * --------------------------------------------------------------------------------------
	 */

	var _gsap = {
		registerPlugin: function registerPlugin() {
			for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			args.forEach(function (config) {
				return _createPlugin(config);
			});
		},
		timeline: function timeline(vars) {
			return new Timeline(vars);
		},
		getTweensOf: function getTweensOf(targets, onlyActive) {
			return _globalTimeline.getTweensOf(targets, onlyActive);
		},
		getProperty: function getProperty(target, property, unit, uncache) {
			_isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

			var getter = _getCache(target || {}).get,
				format = unit ? _passThrough : _numericIfPossible;

			unit === "native" && (unit = "");
			return !target
				? target
				: !property
				? function (property, unit, uncache) {
						return format(
							((_plugins[property] && _plugins[property].get) || getter)(target, property, unit, uncache)
						);
				  }
				: format(((_plugins[property] && _plugins[property].get) || getter)(target, property, unit, uncache));
		},
		quickSetter: function quickSetter(target, property, unit) {
			target = toArray(target);

			if (target.length > 1) {
				var setters = target.map(function (t) {
						return gsap.quickSetter(t, property, unit);
					}),
					l = setters.length;
				return function (value) {
					var i = l;

					while (i--) {
						setters[i](value);
					}
				};
			}

			target = target[0] || {};

			var Plugin = _plugins[property],
				cache = _getCache(target),
				p = (cache.harness && (cache.harness.aliases || {})[property]) || property,
				// in case it's an alias, like "rotate" for "rotation".
				setter = Plugin
					? function (value) {
							var p = new Plugin();
							_quickTween._pt = 0;
							p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
							p.render(1, p);
							_quickTween._pt && _renderPropTweens(1, _quickTween);
					  }
					: cache.set(target, p);

			return Plugin
				? setter
				: function (value) {
						return setter(target, p, unit ? value + unit : value, cache, 1);
				  };
		},
		quickTo: function quickTo(target, property, vars) {
			var _merge2;

			var tween = gsap.to(
					target,
					_merge(
						((_merge2 = {}), (_merge2[property] = "+=0.1"), (_merge2.paused = true), _merge2),
						vars || {}
					)
				),
				func = function func(value, start, startIsRelative) {
					return tween.resetTo(property, value, start, startIsRelative);
				};

			func.tween = tween;
			return func;
		},
		isTweening: function isTweening(targets) {
			return _globalTimeline.getTweensOf(targets, true).length > 0;
		},
		defaults: function defaults(value) {
			value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
			return _mergeDeep(_defaults, value || {});
		},
		config: function config(value) {
			return _mergeDeep(_config, value || {});
		},
		registerEffect: function registerEffect(_ref3) {
			var name = _ref3.name,
				effect = _ref3.effect,
				plugins = _ref3.plugins,
				defaults = _ref3.defaults,
				extendTimeline = _ref3.extendTimeline;
			(plugins || "").split(",").forEach(function (pluginName) {
				return (
					pluginName &&
					!_plugins[pluginName] &&
					!_globals[pluginName] &&
					_warn(name + " effect requires " + pluginName + " plugin.")
				);
			});

			_effects[name] = function (targets, vars, tl) {
				return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
			};

			if (extendTimeline) {
				Timeline.prototype[name] = function (targets, vars, position) {
					return this.add(
						_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this),
						position
					);
				};
			}
		},
		registerEase: function registerEase(name, ease) {
			_easeMap[name] = _parseEase(ease);
		},
		parseEase: function parseEase(ease, defaultEase) {
			return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
		},
		getById: function getById(id) {
			return _globalTimeline.getById(id);
		},
		exportRoot: function exportRoot(vars, includeDelayedCalls) {
			if (vars === void 0) {
				vars = {};
			}

			var tl = new Timeline(vars),
				child,
				next;
			tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

			_globalTimeline.remove(tl);

			tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

			tl._time = tl._tTime = _globalTimeline._time;
			child = _globalTimeline._first;

			while (child) {
				next = child._next;

				if (
					includeDelayedCalls ||
					!(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])
				) {
					_addToTimeline(tl, child, child._start - child._delay);
				}

				child = next;
			}

			_addToTimeline(_globalTimeline, tl, 0);

			return tl;
		},
		context: function context(func, scope) {
			return func ? new Context(func, scope) : _context;
		},
		matchMedia: function matchMedia(scope) {
			return new MatchMedia(scope);
		},
		matchMediaRefresh: function matchMediaRefresh() {
			return (
				_media.forEach(function (c) {
					var cond = c.conditions,
						found,
						p;

					for (p in cond) {
						if (cond[p]) {
							cond[p] = false;
							found = 1;
						}
					}

					found && c.revert();
				}) || _onMediaChange()
			);
		},
		addEventListener: function addEventListener(type, callback) {
			var a = _listeners[type] || (_listeners[type] = []);
			~a.indexOf(callback) || a.push(callback);
		},
		removeEventListener: function removeEventListener(type, callback) {
			var a = _listeners[type],
				i = a && a.indexOf(callback);
			i >= 0 && a.splice(i, 1);
		},
		utils: {
			wrap: wrap,
			wrapYoyo: wrapYoyo,
			distribute: distribute,
			random: random,
			snap: snap,
			normalize: normalize,
			getUnit: getUnit,
			clamp: clamp,
			splitColor: splitColor,
			toArray: toArray,
			selector: selector,
			mapRange: mapRange,
			pipe: pipe,
			unitize: unitize,
			interpolate: interpolate,
			shuffle: shuffle,
		},
		install: _install,
		effects: _effects,
		ticker: _ticker,
		updateRoot: Timeline.updateRoot,
		plugins: _plugins,
		globalTimeline: _globalTimeline,
		core: {
			PropTween: PropTween,
			globals: _addGlobal,
			Tween: Tween,
			Timeline: Timeline,
			Animation: Animation,
			getCache: _getCache,
			_removeLinkedListItem: _removeLinkedListItem,
			reverting: function reverting() {
				return _reverting;
			},
			context: function context(toAdd) {
				if (toAdd && _context) {
					_context.data.push(toAdd);

					toAdd._ctx = _context;
				}

				return _context;
			},
			suppressOverwrites: function suppressOverwrites(value) {
				return (_suppressOverwrites = value);
			},
		},
	};

	_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
		return (_gsap[name] = Tween[name]);
	});

	_ticker.add(Timeline.updateRoot);

	_quickTween = _gsap.to(
		{},
		{
			duration: 0,
		}
	); // ---- EXTRA PLUGINS --------------------------------------------------------

	var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
			var pt = plugin._pt;

			while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
				pt = pt._next;
			}

			return pt;
		},
		_addModifiers = function _addModifiers(tween, modifiers) {
			var targets = tween._targets,
				p,
				i,
				pt;

			for (p in modifiers) {
				i = targets.length;

				while (i--) {
					pt = tween._ptLookup[i][p];

					if (pt && (pt = pt.d)) {
						if (pt._pt) {
							// is a plugin
							pt = _getPluginPropTween(pt, p);
						}

						pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
					}
				}
			}
		},
		_buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
			return {
				name: name,
				rawVars: 1,
				//don't pre-process function-based values or "random()" strings.
				init: function init(target, vars, tween) {
					tween._onInit = function (tween) {
						var temp, p;

						if (_isString(vars)) {
							temp = {};

							_forEachName(vars, function (name) {
								return (temp[name] = 1);
							}); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.

							vars = temp;
						}

						if (modifier) {
							temp = {};

							for (p in vars) {
								temp[p] = modifier(vars[p]);
							}

							vars = temp;
						}

						_addModifiers(tween, vars);
					};
				},
			};
		}; //register core plugins

	var gsap =
		_gsap.registerPlugin(
			{
				name: "attr",
				init: function init(target, vars, tween, index, targets) {
					var p, pt, v;
					this.tween = tween;

					for (p in vars) {
						v = target.getAttribute(p) || "";
						pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
						pt.op = p;
						pt.b = v; // record the beginning value so we can revert()

						this._props.push(p);
					}
				},
				render: function render(ratio, data) {
					var pt = data._pt;

					while (pt) {
						_reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d); // if reverting, go back to the original (pt.b)

						pt = pt._next;
					}
				},
			},
			{
				name: "endArray",
				init: function init(target, value) {
					var i = value.length;

					while (i--) {
						this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
					}
				},
			},
			_buildModifierPlugin("roundProps", _roundModifier),
			_buildModifierPlugin("modifiers"),
			_buildModifierPlugin("snap", snap)
		) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

	Tween.version = Timeline.version = gsap.version = "3.11.5";
	_coreReady = 1;
	_windowExists() && _wake();
	var Power0 = _easeMap.Power0,
		Power1 = _easeMap.Power1,
		Power2 = _easeMap.Power2,
		Power3 = _easeMap.Power3,
		Power4 = _easeMap.Power4,
		Linear = _easeMap.Linear,
		Quad = _easeMap.Quad,
		Cubic = _easeMap.Cubic,
		Quart = _easeMap.Quart,
		Quint = _easeMap.Quint,
		Strong = _easeMap.Strong,
		Elastic = _easeMap.Elastic,
		Back = _easeMap.Back,
		SteppedEase = _easeMap.SteppedEase,
		Bounce = _easeMap.Bounce,
		Sine = _easeMap.Sine,
		Expo = _easeMap.Expo,
		Circ = _easeMap.Circ; // CONCATENATED MODULE: ./node_modules/gsap/CSSPlugin.js

	//export some internal methods/orojects for use in CSSPlugin so that we can externalize that file and allow custom builds that exclude it.

	/*!
	 * CSSPlugin 3.11.5
	 * https://greensock.com
	 *
	 * Copyright 2008-2023, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	 */

	/* eslint-disable */

	var CSSPlugin_win,
		CSSPlugin_doc,
		_docElement,
		_pluginInitted,
		_tempDiv,
		_tempDivStyler,
		_recentSetterPlugin,
		CSSPlugin_reverting,
		CSSPlugin_windowExists = function _windowExists() {
			return typeof window !== "undefined";
		},
		_transformProps = {},
		_RAD2DEG = 180 / Math.PI,
		_DEG2RAD = Math.PI / 180,
		_atan2 = Math.atan2,
		CSSPlugin_bigNum = 1e8,
		_capsExp = /([A-Z])/g,
		_horizontalExp = /(left|right|width|margin|padding|x)/i,
		_complexExp = /[\s,\(]\S/,
		_propertyAliases = {
			autoAlpha: "opacity,visibility",
			scale: "scaleX,scaleY",
			alpha: "opacity",
		},
		_renderCSSProp = function _renderCSSProp(ratio, data) {
			return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
		},
		_renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
			return data.set(
				data.t,
				data.p,
				ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u,
				data
			);
		},
		_renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
			return data.set(
				data.t,
				data.p,
				ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b,
				data
			);
		},
		//if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
		_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
			var value = data.s + data.c * ratio;
			data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
		},
		_renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
			return data.set(data.t, data.p, ratio ? data.e : data.b, data);
		},
		_renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
			return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
		},
		_setterCSSStyle = function _setterCSSStyle(target, property, value) {
			return (target.style[property] = value);
		},
		_setterCSSProp = function _setterCSSProp(target, property, value) {
			return target.style.setProperty(property, value);
		},
		_setterTransform = function _setterTransform(target, property, value) {
			return (target._gsap[property] = value);
		},
		_setterScale = function _setterScale(target, property, value) {
			return (target._gsap.scaleX = target._gsap.scaleY = value);
		},
		_setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
			var cache = target._gsap;
			cache.scaleX = cache.scaleY = value;
			cache.renderTransform(ratio, cache);
		},
		_setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
			var cache = target._gsap;
			cache[property] = value;
			cache.renderTransform(ratio, cache);
		},
		_transformProp = "transform",
		_transformOriginProp = _transformProp + "Origin",
		_saveStyle = function _saveStyle(property, isNotCSS) {
			var _this = this;

			var target = this.target,
				style = target.style;

			if (property in _transformProps) {
				this.tfm = this.tfm || {};

				if (property !== "transform") {
					property = _propertyAliases[property] || property;
					~property.indexOf(",")
						? property.split(",").forEach(function (a) {
								return (_this.tfm[a] = _get(target, a));
						  })
						: (this.tfm[property] = target._gsap.x ? target._gsap[property] : _get(target, property)); // note: scale would map to "scaleX,scaleY", thus we loop and apply them both.
				} else {
					return _propertyAliases.transform.split(",").forEach(function (p) {
						return _saveStyle.call(_this, p, isNotCSS);
					});
				}

				if (this.props.indexOf(_transformProp) >= 0) {
					return;
				}

				if (target._gsap.svg) {
					this.svgo = target.getAttribute("data-svg-origin");
					this.props.push(_transformOriginProp, isNotCSS, "");
				}

				property = _transformProp;
			}

			(style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
		},
		_removeIndependentTransforms = function _removeIndependentTransforms(style) {
			if (style.translate) {
				style.removeProperty("translate");
				style.removeProperty("scale");
				style.removeProperty("rotate");
			}
		},
		_revertStyle = function _revertStyle() {
			var props = this.props,
				target = this.target,
				style = target.style,
				cache = target._gsap,
				i,
				p;

			for (i = 0; i < props.length; i += 3) {
				// stored like this: property, isNotCSS, value
				props[i + 1]
					? (target[props[i]] = props[i + 2])
					: props[i + 2]
					? (style[props[i]] = props[i + 2])
					: style.removeProperty(
							props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase()
					  );
			}

			if (this.tfm) {
				for (p in this.tfm) {
					cache[p] = this.tfm[p];
				}

				if (cache.svg) {
					cache.renderTransform();
					target.setAttribute("data-svg-origin", this.svgo || "");
				}

				i = CSSPlugin_reverting();

				if ((!i || !i.isStart) && !style[_transformProp]) {
					_removeIndependentTransforms(style);

					cache.uncache = 1; // if it's a startAt that's being reverted in the _initTween() of the core, we don't need to uncache transforms. This is purely a performance optimization.
				}
			}
		},
		_getStyleSaver = function _getStyleSaver(target, properties) {
			var saver = {
				target: target,
				props: [],
				revert: _revertStyle,
				save: _saveStyle,
			};
			target._gsap || gsap.core.getCache(target); // just make sure there's a _gsap cache defined because we read from it in _saveStyle() and it's more efficient to just check it here once.

			properties &&
				properties.split(",").forEach(function (p) {
					return saver.save(p);
				});
			return saver;
		},
		_supports3D,
		_createElement = function _createElement(type, ns) {
			var e = CSSPlugin_doc.createElementNS
				? CSSPlugin_doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type)
				: CSSPlugin_doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

			return e.style ? e : CSSPlugin_doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
		},
		_getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
			var cs = getComputedStyle(target);
			return (
				cs[property] ||
				cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) ||
				cs.getPropertyValue(property) ||
				(!skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1)) ||
				""
			); //css variables may not need caps swapped out for dashes and lowercase.
		},
		_prefixes = "O,Moz,ms,Ms,Webkit".split(","),
		_checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
			var e = element || _tempDiv,
				s = e.style,
				i = 5;

			if (property in s && !preferPrefix) {
				return property;
			}

			property = property.charAt(0).toUpperCase() + property.substr(1);

			while (i-- && !(_prefixes[i] + property in s)) {}

			return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
		},
		_initCore = function _initCore() {
			if (CSSPlugin_windowExists() && window.document) {
				CSSPlugin_win = window;
				CSSPlugin_doc = CSSPlugin_win.document;
				_docElement = CSSPlugin_doc.documentElement;
				_tempDiv = _createElement("div") || {
					style: {},
				};
				_tempDivStyler = _createElement("div");
				_transformProp = _checkPropPrefix(_transformProp);
				_transformOriginProp = _transformProp + "Origin";
				_tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

				_supports3D = !!_checkPropPrefix("perspective");
				CSSPlugin_reverting = gsap.core.reverting;
				_pluginInitted = 1;
			}
		},
		_getBBoxHack = function _getBBoxHack(swapIfPossible) {
			//works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
			var svg = _createElement(
					"svg",
					(this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"
				),
				oldParent = this.parentNode,
				oldSibling = this.nextSibling,
				oldCSS = this.style.cssText,
				bbox;

			_docElement.appendChild(svg);

			svg.appendChild(this);
			this.style.display = "block";

			if (swapIfPossible) {
				try {
					bbox = this.getBBox();
					this._gsapBBox = this.getBBox; //store the original

					this.getBBox = _getBBoxHack;
				} catch (e) {}
			} else if (this._gsapBBox) {
				bbox = this._gsapBBox();
			}

			if (oldParent) {
				if (oldSibling) {
					oldParent.insertBefore(this, oldSibling);
				} else {
					oldParent.appendChild(this);
				}
			}

			_docElement.removeChild(svg);

			this.style.cssText = oldCSS;
			return bbox;
		},
		_getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
			var i = attributesArray.length;

			while (i--) {
				if (target.hasAttribute(attributesArray[i])) {
					return target.getAttribute(attributesArray[i]);
				}
			}
		},
		_getBBox = function _getBBox(target) {
			var bounds;

			try {
				bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
			} catch (error) {
				bounds = _getBBoxHack.call(target, true);
			}

			(bounds && (bounds.width || bounds.height)) ||
				target.getBBox === _getBBoxHack ||
				(bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

			return bounds && !bounds.width && !bounds.x && !bounds.y
				? {
						x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
						y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
						width: 0,
						height: 0,
				  }
				: bounds;
		},
		_isSVG = function _isSVG(e) {
			return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
		},
		//reports if the element is an SVG on which getBBox() actually works
		_removeProperty = function _removeProperty(target, property) {
			if (property) {
				var style = target.style;

				if (property in _transformProps && property !== _transformOriginProp) {
					property = _transformProp;
				}

				if (style.removeProperty) {
					if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
						//Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
						property = "-" + property;
					}

					style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
				} else {
					//note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
					style.removeAttribute(property);
				}
			}
		},
		_addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
			var pt = new PropTween(
				plugin._pt,
				target,
				property,
				0,
				1,
				onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue
			);
			plugin._pt = pt;
			pt.b = beginning;
			pt.e = end;

			plugin._props.push(property);

			return pt;
		},
		_nonConvertibleUnits = {
			deg: 1,
			rad: 1,
			turn: 1,
		},
		_nonStandardLayouts = {
			grid: 1,
			flex: 1,
		},
		//takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
		_convertToUnit = function _convertToUnit(target, property, value, unit) {
			var curValue = parseFloat(value) || 0,
				curUnit = (value + "").trim().substr((curValue + "").length) || "px",
				// some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
				style = _tempDiv.style,
				horizontal = _horizontalExp.test(property),
				isRootSVG = target.tagName.toLowerCase() === "svg",
				measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
				amount = 100,
				toPixels = unit === "px",
				toPercent = unit === "%",
				px,
				parent,
				cache,
				isSVG;

			if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
				return curValue;
			}

			curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
			isSVG = target.getCTM && _isSVG(target);

			if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
				px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
				return _round(toPercent ? (curValue / px) * amount : (curValue / 100) * px);
			}

			style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
			parent =
				~property.indexOf("adius") || (unit === "em" && target.appendChild && !isRootSVG)
					? target
					: target.parentNode;

			if (isSVG) {
				parent = (target.ownerSVGElement || {}).parentNode;
			}

			if (!parent || parent === CSSPlugin_doc || !parent.appendChild) {
				parent = CSSPlugin_doc.body;
			}

			cache = parent._gsap;

			if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) {
				return _round((curValue / cache.width) * amount);
			} else {
				(toPercent || curUnit === "%") &&
					!_nonStandardLayouts[_getComputedProperty(parent, "display")] &&
					(style.position = _getComputedProperty(target, "position"));
				parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

				parent.appendChild(_tempDiv);
				px = _tempDiv[measureProperty];
				parent.removeChild(_tempDiv);
				style.position = "absolute";

				if (horizontal && toPercent) {
					cache = _getCache(parent);
					cache.time = _ticker.time;
					cache.width = parent[measureProperty];
				}
			}

			return _round(toPixels ? (px * curValue) / amount : px && curValue ? (amount / px) * curValue : 0);
		},
		_get = function _get(target, property, unit, uncache) {
			var value;
			_pluginInitted || _initCore();

			if (property in _propertyAliases && property !== "transform") {
				property = _propertyAliases[property];

				if (~property.indexOf(",")) {
					property = property.split(",")[0];
				}
			}

			if (_transformProps[property] && property !== "transform") {
				value = _parseTransform(target, uncache);
				value =
					property !== "transformOrigin"
						? value[property]
						: value.svg
						? value.origin
						: _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) +
						  " " +
						  value.zOrigin +
						  "px";
			} else {
				value = target.style[property];

				if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
					value =
						(_specialProps[property] && _specialProps[property](target, property, unit)) ||
						_getComputedProperty(target, property) ||
						_getProperty(target, property) ||
						(property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
				}
			}

			return unit && !~(value + "").trim().indexOf(" ")
				? _convertToUnit(target, property, value, unit) + unit
				: value;
		},
		_tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
			// note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
			if (!start || start === "none") {
				// some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
				var p = _checkPropPrefix(prop, target, 1),
					s = p && _getComputedProperty(target, p, 1);

				if (s && s !== start) {
					prop = p;
					start = s;
				} else if (prop === "borderColor") {
					start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
				}
			}

			var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
				index = 0,
				matchIndex = 0,
				a,
				result,
				startValues,
				startNum,
				color,
				startValue,
				endValue,
				endNum,
				chunk,
				endUnit,
				startUnit,
				endValues;
			pt.b = start;
			pt.e = end;
			start += ""; // ensure values are strings

			end += "";

			if (end === "auto") {
				target.style[prop] = end;
				end = _getComputedProperty(target, prop) || end;
				target.style[prop] = start;
			}

			a = [start, end];

			_colorStringFilter(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().

			start = a[0];
			end = a[1];
			startValues = start.match(_numWithUnitExp) || [];
			endValues = end.match(_numWithUnitExp) || [];

			if (endValues.length) {
				while ((result = _numWithUnitExp.exec(end))) {
					endValue = result[0];
					chunk = end.substring(index, result.index);

					if (color) {
						color = (color + 1) % 5;
					} else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
						color = 1;
					}

					if (endValue !== (startValue = startValues[matchIndex++] || "")) {
						startNum = parseFloat(startValue) || 0;
						startUnit = startValue.substr((startNum + "").length);
						endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
						endNum = parseFloat(endValue);
						endUnit = endValue.substr((endNum + "").length);
						index = _numWithUnitExp.lastIndex - endUnit.length;

						if (!endUnit) {
							//if something like "perspective:300" is passed in and we must add a unit to the end
							endUnit = endUnit || _config.units[prop] || startUnit;

							if (index === end.length) {
								end += endUnit;
								pt.e += endUnit;
							}
						}

						if (startUnit !== endUnit) {
							startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
						} // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

						pt._pt = {
							_next: pt._pt,
							p: chunk || matchIndex === 1 ? chunk : ",",
							//note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
							s: startNum,
							c: endNum - startNum,
							m: (color && color < 4) || prop === "zIndex" ? Math.round : 0,
						};
					}
				}

				pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
			} else {
				pt.r =
					prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
			}

			_relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

			this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

			return pt;
		},
		_keywordToPercent = {
			top: "0%",
			bottom: "100%",
			left: "0%",
			right: "100%",
			center: "50%",
		},
		_convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
			var split = value.split(" "),
				x = split[0],
				y = split[1] || "50%";

			if (x === "top" || x === "bottom" || y === "left" || y === "right") {
				//the user provided them in the wrong order, so flip them
				value = x;
				x = y;
				y = value;
			}

			split[0] = _keywordToPercent[x] || x;
			split[1] = _keywordToPercent[y] || y;
			return split.join(" ");
		},
		_renderClearProps = function _renderClearProps(ratio, data) {
			if (data.tween && data.tween._time === data.tween._dur) {
				var target = data.t,
					style = target.style,
					props = data.u,
					cache = target._gsap,
					prop,
					clearTransforms,
					i;

				if (props === "all" || props === true) {
					style.cssText = "";
					clearTransforms = 1;
				} else {
					props = props.split(",");
					i = props.length;

					while (--i > -1) {
						prop = props[i];

						if (_transformProps[prop]) {
							clearTransforms = 1;
							prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
						}

						_removeProperty(target, prop);
					}
				}

				if (clearTransforms) {
					_removeProperty(target, _transformProp);

					if (cache) {
						cache.svg && target.removeAttribute("transform");

						_parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.

						cache.uncache = 1;

						_removeIndependentTransforms(style);
					}
				}
			}
		},
		// note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
		_specialProps = {
			clearProps: function clearProps(plugin, target, property, endValue, tween) {
				if (tween.data !== "isFromStart") {
					var pt = (plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps));
					pt.u = endValue;
					pt.pr = -10;
					pt.tween = tween;

					plugin._props.push(property);

					return 1;
				}
			},
			/* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
		},
		/*
		 * --------------------------------------------------------------------------------------
		 * TRANSFORMS
		 * --------------------------------------------------------------------------------------
		 */
		_identity2DMatrix = [1, 0, 0, 1, 0, 0],
		_rotationalProperties = {},
		_isNullTransform = function _isNullTransform(value) {
			return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
		},
		_getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
			var matrixString = _getComputedProperty(target, _transformProp);

			return _isNullTransform(matrixString)
				? _identity2DMatrix
				: matrixString.substr(7).match(_numExp).map(_round);
		},
		_getMatrix = function _getMatrix(target, force2D) {
			var cache = target._gsap || _getCache(target),
				style = target.style,
				matrix = _getComputedTransformMatrixAsArray(target),
				parent,
				nextSibling,
				temp,
				addedToDOM;

			if (cache.svg && target.getAttribute("transform")) {
				temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

				matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
				return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
			} else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
				//note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
				//browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
				temp = style.display;
				style.display = "block";
				parent = target.parentNode;

				if (!parent || !target.offsetParent) {
					// note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
					addedToDOM = 1; //flag

					nextSibling = target.nextElementSibling;

					_docElement.appendChild(target); //we must add it to the DOM in order to get values properly
				}

				matrix = _getComputedTransformMatrixAsArray(target);
				temp ? (style.display = temp) : _removeProperty(target, "display");

				if (addedToDOM) {
					nextSibling
						? parent.insertBefore(target, nextSibling)
						: parent
						? parent.appendChild(target)
						: _docElement.removeChild(target);
				}
			}

			return force2D && matrix.length > 6
				? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]]
				: matrix;
		},
		_applySVGOrigin = function _applySVGOrigin(
			target,
			origin,
			originIsAbsolute,
			smooth,
			matrixArray,
			pluginToAddPropTweensTo
		) {
			var cache = target._gsap,
				matrix = matrixArray || _getMatrix(target, true),
				xOriginOld = cache.xOrigin || 0,
				yOriginOld = cache.yOrigin || 0,
				xOffsetOld = cache.xOffset || 0,
				yOffsetOld = cache.yOffset || 0,
				a = matrix[0],
				b = matrix[1],
				c = matrix[2],
				d = matrix[3],
				tx = matrix[4],
				ty = matrix[5],
				originSplit = origin.split(" "),
				xOrigin = parseFloat(originSplit[0]) || 0,
				yOrigin = parseFloat(originSplit[1]) || 0,
				bounds,
				determinant,
				x,
				y;

			if (!originIsAbsolute) {
				bounds = _getBBox(target);
				xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? (xOrigin / 100) * bounds.width : xOrigin);
				yOrigin =
					bounds.y +
					(~(originSplit[1] || originSplit[0]).indexOf("%") ? (yOrigin / 100) * bounds.height : yOrigin);
			} else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
				//if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
				x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
				y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
				xOrigin = x;
				yOrigin = y;
			}

			if (smooth || (smooth !== false && cache.smooth)) {
				tx = xOrigin - xOriginOld;
				ty = yOrigin - yOriginOld;
				cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
				cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
			} else {
				cache.xOffset = cache.yOffset = 0;
			}

			cache.xOrigin = xOrigin;
			cache.yOrigin = yOrigin;
			cache.smooth = !!smooth;
			cache.origin = origin;
			cache.originIsAbsolute = !!originIsAbsolute;
			target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

			if (pluginToAddPropTweensTo) {
				_addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

				_addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

				_addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

				_addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
			}

			target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
		},
		_parseTransform = function _parseTransform(target, uncache) {
			var cache = target._gsap || new GSCache(target);

			if ("x" in cache && !uncache && !cache.uncache) {
				return cache;
			}

			var style = target.style,
				invertedScaleX = cache.scaleX < 0,
				px = "px",
				deg = "deg",
				cs = getComputedStyle(target),
				origin = _getComputedProperty(target, _transformOriginProp) || "0",
				x,
				y,
				z,
				scaleX,
				scaleY,
				rotation,
				rotationX,
				rotationY,
				skewX,
				skewY,
				perspective,
				xOrigin,
				yOrigin,
				matrix,
				angle,
				cos,
				sin,
				a,
				b,
				c,
				d,
				a12,
				a22,
				t1,
				t2,
				t3,
				a13,
				a23,
				a33,
				a42,
				a43,
				a32;
			x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
			scaleX = scaleY = 1;
			cache.svg = !!(target.getCTM && _isSVG(target));

			if (cs.translate) {
				// accommodate independent transforms by combining them into normal ones.
				if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
					style[_transformProp] =
						(cs.translate !== "none"
							? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") "
							: "") +
						(cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") +
						(cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") +
						(cs[_transformProp] !== "none" ? cs[_transformProp] : "");
				}

				style.scale = style.rotate = style.translate = "none";
			}

			matrix = _getMatrix(target, cache.svg);

			if (cache.svg) {
				if (cache.uncache) {
					// if cache.uncache is true (and maybe if origin is 0,0), we need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Previously we let the data-svg-origin stay instead, but when introducing revert(), it complicated things.
					t2 = target.getBBox();
					origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
					t1 = "";
				} else {
					t1 = !uncache && target.getAttribute("data-svg-origin"); //  Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.
				}

				_applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
			}

			xOrigin = cache.xOrigin || 0;
			yOrigin = cache.yOrigin || 0;

			if (matrix !== _identity2DMatrix) {
				a = matrix[0]; //a11

				b = matrix[1]; //a21

				c = matrix[2]; //a31

				d = matrix[3]; //a41

				x = a12 = matrix[4];
				y = a22 = matrix[5]; //2D matrix

				if (matrix.length === 6) {
					scaleX = Math.sqrt(a * a + b * b);
					scaleY = Math.sqrt(d * d + c * c);
					rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

					skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
					skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));

					if (cache.svg) {
						x -= xOrigin - (xOrigin * a + yOrigin * c);
						y -= yOrigin - (xOrigin * b + yOrigin * d);
					} //3D matrix
				} else {
					a32 = matrix[6];
					a42 = matrix[7];
					a13 = matrix[8];
					a23 = matrix[9];
					a33 = matrix[10];
					a43 = matrix[11];
					x = matrix[12];
					y = matrix[13];
					z = matrix[14];
					angle = _atan2(a32, a33);
					rotationX = angle * _RAD2DEG; //rotationX

					if (angle) {
						cos = Math.cos(-angle);
						sin = Math.sin(-angle);
						t1 = a12 * cos + a13 * sin;
						t2 = a22 * cos + a23 * sin;
						t3 = a32 * cos + a33 * sin;
						a13 = a12 * -sin + a13 * cos;
						a23 = a22 * -sin + a23 * cos;
						a33 = a32 * -sin + a33 * cos;
						a43 = a42 * -sin + a43 * cos;
						a12 = t1;
						a22 = t2;
						a32 = t3;
					} //rotationY

					angle = _atan2(-c, a33);
					rotationY = angle * _RAD2DEG;

					if (angle) {
						cos = Math.cos(-angle);
						sin = Math.sin(-angle);
						t1 = a * cos - a13 * sin;
						t2 = b * cos - a23 * sin;
						t3 = c * cos - a33 * sin;
						a43 = d * sin + a43 * cos;
						a = t1;
						b = t2;
						c = t3;
					} //rotationZ

					angle = _atan2(b, a);
					rotation = angle * _RAD2DEG;

					if (angle) {
						cos = Math.cos(angle);
						sin = Math.sin(angle);
						t1 = a * cos + b * sin;
						t2 = a12 * cos + a22 * sin;
						b = b * cos - a * sin;
						a22 = a22 * cos - a12 * sin;
						a = t1;
						a12 = t2;
					}

					if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
						//when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
						rotationX = rotation = 0;
						rotationY = 180 - rotationY;
					}

					scaleX = _round(Math.sqrt(a * a + b * b + c * c));
					scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
					angle = _atan2(a12, a22);
					skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
					perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
				}

				if (cache.svg) {
					//sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
					t1 = target.getAttribute("transform");
					cache.forceCSS =
						target.setAttribute("transform", "") ||
						!_isNullTransform(_getComputedProperty(target, _transformProp));
					t1 && target.setAttribute("transform", t1);
				}
			}

			if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
				if (invertedScaleX) {
					scaleX *= -1;
					skewX += rotation <= 0 ? 180 : -180;
					rotation += rotation <= 0 ? 180 : -180;
				} else {
					scaleY *= -1;
					skewX += skewX <= 0 ? 180 : -180;
				}
			}

			uncache = uncache || cache.uncache;
			cache.x =
				x -
				((cache.xPercent =
					x &&
					((!uncache && cache.xPercent) || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0)))
					? (target.offsetWidth * cache.xPercent) / 100
					: 0) +
				px;
			cache.y =
				y -
				((cache.yPercent =
					y &&
					((!uncache && cache.yPercent) ||
						(Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0)))
					? (target.offsetHeight * cache.yPercent) / 100
					: 0) +
				px;
			cache.z = z + px;
			cache.scaleX = _round(scaleX);
			cache.scaleY = _round(scaleY);
			cache.rotation = _round(rotation) + deg;
			cache.rotationX = _round(rotationX) + deg;
			cache.rotationY = _round(rotationY) + deg;
			cache.skewX = skewX + deg;
			cache.skewY = skewY + deg;
			cache.transformPerspective = perspective + px;

			if ((cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0)) {
				style[_transformOriginProp] = _firstTwoOnly(origin);
			}

			cache.xOffset = cache.yOffset = 0;
			cache.force3D = _config.force3D;
			cache.renderTransform = cache.svg
				? _renderSVGTransforms
				: _supports3D
				? _renderCSSTransforms
				: _renderNon3DTransforms;
			cache.uncache = 0;
			return cache;
		},
		_firstTwoOnly = function _firstTwoOnly(value) {
			return (value = value.split(" "))[0] + " " + value[1];
		},
		//for handling transformOrigin values, stripping out the 3rd dimension
		_addPxTranslate = function _addPxTranslate(target, start, value) {
			var unit = getUnit(start);
			return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
		},
		_renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
			cache.z = "0px";
			cache.rotationY = cache.rotationX = "0deg";
			cache.force3D = 0;

			_renderCSSTransforms(ratio, cache);
		},
		_zeroDeg = "0deg",
		_zeroPx = "0px",
		_endParenthesis = ") ",
		_renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
			var _ref = cache || this,
				xPercent = _ref.xPercent,
				yPercent = _ref.yPercent,
				x = _ref.x,
				y = _ref.y,
				z = _ref.z,
				rotation = _ref.rotation,
				rotationY = _ref.rotationY,
				rotationX = _ref.rotationX,
				skewX = _ref.skewX,
				skewY = _ref.skewY,
				scaleX = _ref.scaleX,
				scaleY = _ref.scaleY,
				transformPerspective = _ref.transformPerspective,
				force3D = _ref.force3D,
				target = _ref.target,
				zOrigin = _ref.zOrigin,
				transforms = "",
				use3D = (force3D === "auto" && ratio && ratio !== 1) || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)

			if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
				var angle = parseFloat(rotationY) * _DEG2RAD,
					a13 = Math.sin(angle),
					a33 = Math.cos(angle),
					cos;

				angle = parseFloat(rotationX) * _DEG2RAD;
				cos = Math.cos(angle);
				x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
				y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
				z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
			}

			if (transformPerspective !== _zeroPx) {
				transforms += "perspective(" + transformPerspective + _endParenthesis;
			}

			if (xPercent || yPercent) {
				transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
			}

			if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
				transforms +=
					z !== _zeroPx || use3D
						? "translate3d(" + x + ", " + y + ", " + z + ") "
						: "translate(" + x + ", " + y + _endParenthesis;
			}

			if (rotation !== _zeroDeg) {
				transforms += "rotate(" + rotation + _endParenthesis;
			}

			if (rotationY !== _zeroDeg) {
				transforms += "rotateY(" + rotationY + _endParenthesis;
			}

			if (rotationX !== _zeroDeg) {
				transforms += "rotateX(" + rotationX + _endParenthesis;
			}

			if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
				transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
			}

			if (scaleX !== 1 || scaleY !== 1) {
				transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
			}

			target.style[_transformProp] = transforms || "translate(0, 0)";
		},
		_renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
			var _ref2 = cache || this,
				xPercent = _ref2.xPercent,
				yPercent = _ref2.yPercent,
				x = _ref2.x,
				y = _ref2.y,
				rotation = _ref2.rotation,
				skewX = _ref2.skewX,
				skewY = _ref2.skewY,
				scaleX = _ref2.scaleX,
				scaleY = _ref2.scaleY,
				target = _ref2.target,
				xOrigin = _ref2.xOrigin,
				yOrigin = _ref2.yOrigin,
				xOffset = _ref2.xOffset,
				yOffset = _ref2.yOffset,
				forceCSS = _ref2.forceCSS,
				tx = parseFloat(x),
				ty = parseFloat(y),
				a11,
				a21,
				a12,
				a22,
				temp;

			rotation = parseFloat(rotation);
			skewX = parseFloat(skewX);
			skewY = parseFloat(skewY);

			if (skewY) {
				//for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
				skewY = parseFloat(skewY);
				skewX += skewY;
				rotation += skewY;
			}

			if (rotation || skewX) {
				rotation *= _DEG2RAD;
				skewX *= _DEG2RAD;
				a11 = Math.cos(rotation) * scaleX;
				a21 = Math.sin(rotation) * scaleX;
				a12 = Math.sin(rotation - skewX) * -scaleY;
				a22 = Math.cos(rotation - skewX) * scaleY;

				if (skewX) {
					skewY *= _DEG2RAD;
					temp = Math.tan(skewX - skewY);
					temp = Math.sqrt(1 + temp * temp);
					a12 *= temp;
					a22 *= temp;

					if (skewY) {
						temp = Math.tan(skewY);
						temp = Math.sqrt(1 + temp * temp);
						a11 *= temp;
						a21 *= temp;
					}
				}

				a11 = _round(a11);
				a21 = _round(a21);
				a12 = _round(a12);
				a22 = _round(a22);
			} else {
				a11 = scaleX;
				a22 = scaleY;
				a21 = a12 = 0;
			}

			if ((tx && !~(x + "").indexOf("px")) || (ty && !~(y + "").indexOf("px"))) {
				tx = _convertToUnit(target, "x", x, "px");
				ty = _convertToUnit(target, "y", y, "px");
			}

			if (xOrigin || yOrigin || xOffset || yOffset) {
				tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
				ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
			}

			if (xPercent || yPercent) {
				//The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
				temp = target.getBBox();
				tx = _round(tx + (xPercent / 100) * temp.width);
				ty = _round(ty + (yPercent / 100) * temp.height);
			}

			temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
			target.setAttribute("transform", temp);
			forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the transform attribute changes!)
		},
		_addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
			var cap = 360,
				isString = _isString(endValue),
				endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
				change = endNum - startNum,
				finalValue = startNum + change + "deg",
				direction,
				pt;

			if (isString) {
				direction = endValue.split("_")[1];

				if (direction === "short") {
					change %= cap;

					if (change !== change % (cap / 2)) {
						change += change < 0 ? cap : -cap;
					}
				}

				if (direction === "cw" && change < 0) {
					change = ((change + cap * CSSPlugin_bigNum) % cap) - ~~(change / cap) * cap;
				} else if (direction === "ccw" && change > 0) {
					change = ((change - cap * CSSPlugin_bigNum) % cap) - ~~(change / cap) * cap;
				}
			}

			plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
			pt.e = finalValue;
			pt.u = "deg";

			plugin._props.push(property);

			return pt;
		},
		_assign = function _assign(target, source) {
			// Internet Explorer doesn't have Object.assign(), so we recreate it here.
			for (var p in source) {
				target[p] = source[p];
			}

			return target;
		},
		_addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
			//for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
			var startCache = _assign({}, target._gsap),
				exclude = "perspective,force3D,transformOrigin,svgOrigin",
				style = target.style,
				endCache,
				p,
				startValue,
				endValue,
				startNum,
				endNum,
				startUnit,
				endUnit;

			if (startCache.svg) {
				startValue = target.getAttribute("transform");
				target.setAttribute("transform", "");
				style[_transformProp] = transforms;
				endCache = _parseTransform(target, 1);

				_removeProperty(target, _transformProp);

				target.setAttribute("transform", startValue);
			} else {
				startValue = getComputedStyle(target)[_transformProp];
				style[_transformProp] = transforms;
				endCache = _parseTransform(target, 1);
				style[_transformProp] = startValue;
			}

			for (p in _transformProps) {
				startValue = startCache[p];
				endValue = endCache[p];

				if (startValue !== endValue && exclude.indexOf(p) < 0) {
					//tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
					startUnit = getUnit(startValue);
					endUnit = getUnit(endValue);
					startNum =
						startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
					endNum = parseFloat(endValue);
					plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
					plugin._pt.u = endUnit || 0;

					plugin._props.push(p);
				}
			}

			_assign(endCache, startCache);
		}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.

	_forEachName("padding,margin,Width,Radius", function (name, index) {
		var t = "Top",
			r = "Right",
			b = "Bottom",
			l = "Left",
			props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
				return index < 2 ? name + side : "border" + side + name;
			});

		_specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
			var a, vars;

			if (arguments.length < 4) {
				// getter, passed target, property, and unit (from _get())
				a = props.map(function (prop) {
					return _get(plugin, prop, property);
				});
				vars = a.join(" ");
				return vars.split(a[0]).length === 5 ? a[0] : vars;
			}

			a = (endValue + "").split(" ");
			vars = {};
			props.forEach(function (prop, i) {
				return (vars[prop] = a[i] = a[i] || a[((i - 1) / 2) | 0]);
			});
			plugin.init(target, vars, tween);
		};
	});

	var CSSPlugin = {
		name: "css",
		register: _initCore,
		targetTest: function targetTest(target) {
			return target.style && target.nodeType;
		},
		init: function init(target, vars, tween, index, targets) {
			var props = this._props,
				style = target.style,
				startAt = tween.vars.startAt,
				startValue,
				endValue,
				endNum,
				startNum,
				type,
				specialProp,
				p,
				startUnit,
				endUnit,
				relative,
				isTransformRelated,
				transformPropTween,
				cache,
				smooth,
				hasPriority,
				inlineProps;
			_pluginInitted || _initCore(); // we may call init() multiple times on the same plugin instance, like when adding special properties, so make sure we don't overwrite the revert data or inlineProps

			this.styles = this.styles || _getStyleSaver(target);
			inlineProps = this.styles.props;
			this.tween = tween;

			for (p in vars) {
				if (p === "autoRound") {
					continue;
				}

				endValue = vars[p];

				if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
					// plugins
					continue;
				}

				type = typeof endValue;
				specialProp = _specialProps[p];

				if (type === "function") {
					endValue = endValue.call(tween, index, target, targets);
					type = typeof endValue;
				}

				if (type === "string" && ~endValue.indexOf("random(")) {
					endValue = _replaceRandom(endValue);
				}

				if (specialProp) {
					specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
				} else if (p.substr(0, 2) === "--") {
					//CSS variable
					startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
					endValue += "";
					_colorExp.lastIndex = 0;

					if (!_colorExp.test(startValue)) {
						// colors don't have units
						startUnit = getUnit(startValue);
						endUnit = getUnit(endValue);
					}

					endUnit
						? startUnit !== endUnit &&
						  (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit)
						: startUnit && (endValue += startUnit);
					this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
					props.push(p);
					inlineProps.push(p, 0, style[p]);
				} else if (type !== "undefined") {
					if (startAt && p in startAt) {
						// in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
						startValue =
							typeof startAt[p] === "function"
								? startAt[p].call(tween, index, target, targets)
								: startAt[p];
						_isString(startValue) &&
							~startValue.indexOf("random(") &&
							(startValue = _replaceRandom(startValue));
						getUnit(startValue + "") || (startValue += _config.units[p] || getUnit(_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

						(startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
					} else {
						startValue = _get(target, p);
					}

					startNum = parseFloat(startValue);
					relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
					relative && (endValue = endValue.substr(2));
					endNum = parseFloat(endValue);

					if (p in _propertyAliases) {
						if (p === "autoAlpha") {
							//special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
							if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
								//if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
								startNum = 0;
							}

							inlineProps.push("visibility", 0, style.visibility);

							_addNonTweeningPT(
								this,
								style,
								"visibility",
								startNum ? "inherit" : "hidden",
								endNum ? "inherit" : "hidden",
								!endNum
							);
						}

						if (p !== "scale" && p !== "transform") {
							p = _propertyAliases[p];
							~p.indexOf(",") && (p = p.split(",")[0]);
						}
					}

					isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

					if (isTransformRelated) {
						this.styles.save(p);

						if (!transformPropTween) {
							cache = target._gsap;
							(cache.renderTransform && !vars.parseTransform) ||
								_parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

							smooth = vars.smoothOrigin !== false && cache.smooth;
							transformPropTween = this._pt = new PropTween(
								this._pt,
								style,
								_transformProp,
								0,
								1,
								cache.renderTransform,
								cache,
								0,
								-1
							); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

							transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
						}

						if (p === "scale") {
							this._pt = new PropTween(
								this._pt,
								cache,
								"scaleY",
								cache.scaleY,
								(relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY ||
									0,
								_renderCSSProp
							);
							this._pt.u = 0;
							props.push("scaleY", p);
							p += "X";
						} else if (p === "transformOrigin") {
							inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
							endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

							if (cache.svg) {
								_applySVGOrigin(target, endValue, 0, smooth, 0, this);
							} else {
								endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

								endUnit !== cache.zOrigin &&
									_addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

								_addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
							}

							continue;
						} else if (p === "svgOrigin") {
							_applySVGOrigin(target, endValue, 1, smooth, 0, this);

							continue;
						} else if (p in _rotationalProperties) {
							_addRotationalPropTween(
								this,
								cache,
								p,
								startNum,
								relative ? _parseRelative(startNum, relative + endValue) : endValue
							);

							continue;
						} else if (p === "smoothOrigin") {
							_addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

							continue;
						} else if (p === "force3D") {
							cache[p] = endValue;
							continue;
						} else if (p === "transform") {
							_addRawTransformPTs(this, endValue, target);

							continue;
						}
					} else if (!(p in style)) {
						p = _checkPropPrefix(p) || p;
					}

					if (
						isTransformRelated ||
						((endNum || endNum === 0) &&
							(startNum || startNum === 0) &&
							!_complexExp.test(endValue) &&
							p in style)
					) {
						startUnit = (startValue + "").substr((startNum + "").length);
						endNum || (endNum = 0); // protect against NaN

						endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
						startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
						this._pt = new PropTween(
							this._pt,
							isTransformRelated ? cache : style,
							p,
							startNum,
							(relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum,
							!isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false
								? _renderRoundedCSSProp
								: _renderCSSProp
						);
						this._pt.u = endUnit || 0;

						if (startUnit !== endUnit && endUnit !== "%") {
							//when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
							this._pt.b = startValue;
							this._pt.r = _renderCSSPropWithBeginning;
						}
					} else if (!(p in style)) {
						if (p in target) {
							//maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
							this.add(
								target,
								p,
								startValue || target[p],
								relative ? relative + endValue : endValue,
								index,
								targets
							);
						} else if (p !== "parseTransform") {
							_missingPlugin(p, endValue);

							continue;
						}
					} else {
						_tweenComplexCSSString.call(
							this,
							target,
							p,
							startValue,
							relative ? relative + endValue : endValue
						);
					}

					isTransformRelated ||
						(p in style
							? inlineProps.push(p, 0, style[p])
							: inlineProps.push(p, 1, startValue || target[p]));
					props.push(p);
				}
			}

			hasPriority && _sortPropTweensByPriority(this);
		},
		render: function render(ratio, data) {
			if (data.tween._time || !CSSPlugin_reverting()) {
				var pt = data._pt;

				while (pt) {
					pt.r(ratio, pt.d);
					pt = pt._next;
				}
			} else {
				data.styles.revert();
			}
		},
		get: _get,
		aliases: _propertyAliases,
		getSetter: function getSetter(target, property, plugin) {
			//returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
			var p = _propertyAliases[property];
			p && p.indexOf(",") < 0 && (property = p);
			return property in _transformProps &&
				property !== _transformOriginProp &&
				(target._gsap.x || _get(target, "x"))
				? plugin && _recentSetterPlugin === plugin
					? property === "scale"
						? _setterScale
						: _setterTransform
					: (_recentSetterPlugin = plugin || {}) &&
					  (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender)
				: target.style && !_isUndefined(target.style[property])
				? _setterCSSStyle
				: ~property.indexOf("-")
				? _setterCSSProp
				: _getSetter(target, property);
		},
		core: {
			_removeProperty: _removeProperty,
			_getMatrix: _getMatrix,
		},
	};
	gsap.utils.checkPrefix = _checkPropPrefix;
	gsap.core.getStyleSaver = _getStyleSaver;

	(function (positionAndScale, rotation, others, aliases) {
		var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
			_transformProps[name] = 1;
		});

		_forEachName(rotation, function (name) {
			_config.units[name] = "deg";
			_rotationalProperties[name] = 1;
		});

		_propertyAliases[all[13]] = positionAndScale + "," + rotation;

		_forEachName(aliases, function (name) {
			var split = name.split(":");
			_propertyAliases[split[1]] = all[split[0]];
		});
	})(
		"x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
		"rotation,rotationX,rotationY,skewX,skewY",
		"transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
		"0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"
	);

	_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
		_config.units[name] = "px";
	});

	gsap.registerPlugin(CSSPlugin); // CONCATENATED MODULE: ./node_modules/gsap/index.js

	var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap,
		// to protect from tree shaking
		TweenMaxWithCSS = gsapWithCSS.core.Tween; // CONCATENATED MODULE: ./node_modules/ssr-window/ssr-window.esm.js

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
	function extend(target = {}, src = {}) {
		Object.keys(src).forEach((key) => {
			if (typeof target[key] === "undefined") target[key] = src[key];
			else if (
				ssr_window_esm_isObject(src[key]) &&
				ssr_window_esm_isObject(target[key]) &&
				Object.keys(src[key]).length > 0
			) {
				extend(target[key], src[key]);
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
		extend(doc, ssrDocument);
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
		extend(win, ssrWindow);
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
	function toCamelCase(string) {
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
					dataset[toCamelCase(attr.name.split("data-")[1])] = attr.value;
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
						initialFullValue = window.getComputedStyle(el, null).getPropertyValue(prop).replace(",", ".");
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
			touch: !!("ontouchstart" in window || (window.DocumentTouch && document instanceof window.DocumentTouch)),
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

	let browser;

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
		if (!browser) {
			browser = calcBrowser();
		}

		return browser;
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
							width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
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
				if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0)
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
						`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr(
							"data-swiper-slide-index"
						)}"]`
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
						`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr(
							"data-swiper-slide-index"
						)}"]`
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

		const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
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
				swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
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
				throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
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
		const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
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

		if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
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
		const targetTouch = e.type === "touchmove" && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
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
					swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
		}

		if (disableParentSwiper) {
			e.preventedByNestedSwiper = true;
		} // Directions locks

		if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
			data.currentTranslate = data.startTranslate;
		}

		if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
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
				swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);

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
	/* harmony default export */ const defaults = {
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

			const swiperParams = utils_extend({}, defaults, allModulesParams); // Extend defaults with passed params

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
					className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0
				);
			});
			swiper.emit("_containerClasses", cls.join(" "));
		}

		getSlideClasses(slideEl) {
			const swiper = this;
			return slideEl.className
				.split(" ")
				.filter((className) => {
					return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
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
				const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
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

			if (newDirection === currentDirection || (newDirection !== "horizontal" && newDirection !== "vertical")) {
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
			return defaults;
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
						swiper.$wrapperEl.find(`.${swiper.params.slideClass}[data-swiper-slide-index="${i}"]`).remove();
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

				if (((isPageDown || isArrowRight) && !rtl) || ((isPageUp || isArrowLeft) && rtl)) swiper.slideNext();
				if (((isPageUp || isArrowLeft) && !rtl) || ((isPageDown || isArrowRight) && rtl)) swiper.slidePrev();
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
		const window = ssr_window_esm_getWindow();
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
		let lastScrollTime = utils_now();
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
			if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
				// Prevent if delta of wheel scroll delta is below configured threshold
				return false;
			}

			if (
				swiper.params.mousewheel.thresholdTime &&
				utils_now() - lastScrollTime < swiper.params.mousewheel.thresholdTime
			) {
				// Prevent if time between scrolls is below configured threshold
				return false;
			} // If the movement is NOT big enough and
			// if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
			//   Don't go any further (avoid insignificant scroll movement).

			if (newEvent.delta >= 6 && utils_now() - lastScrollTime < 60) {
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
				target = dom(swiper.params.mousewheel.eventsTarget);
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
					time: utils_now(),
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
					time: utils_now(),
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
							timeout = utils_nextTick(() => {
								swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
							}, 0); // no delay; move on next tick
						}

						if (!timeout) {
							// if we get here, then we haven't detected the end of a momentum scroll, so
							// we'll consider a scroll "complete" when there haven't been any wheel events
							// for 500ms.
							timeout = utils_nextTick(() => {
								const snapToThreshold = 0.5;
								lastEventBeforeSnap = newEvent;
								recentWheelEvents.splice(0);
								swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
							}, 500);
						}
					} // Emit event

					if (!ignoreWheelEvents) emit("scroll", e); // Stop autoplay

					if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop(); // Return page scroll on edge positions

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
				target = dom(swiper.params.mousewheel.eventsTarget);
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
				swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
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
					const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
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
				swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
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

			const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
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
					? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? "left" : "top"]
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
				swiper.touchEvents.start === "touchstart" && support.passiveListener && swiper.params.passiveListeners
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
			if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
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
					if ($wrapperEl.children(`.${swiperParams.slideClass}[data-swiper-slide-index="${index}"]`).length) {
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

			if (lazy.enabled && (cssMode || (watchSlidesProgress && (touchReleaseOnEdges || resistanceRatio === 0)))) {
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
				const slideIndex = swiper.params.loop ? parseInt($slideEl.attr("data-swiper-slide-index"), 10) : index;
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
			timeout = utils_nextTick(() => {
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
			const document = ssr_window_esm_getDocument();

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
				const document = ssr_window_esm_getDocument();
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

			const document = ssr_window_esm_getDocument();
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
			if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
			if (typeof clickedIndex === "undefined" || clickedIndex === null) return;
			let slideToIndex;

			if (thumbsSwiper.params.loop) {
				slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr("data-swiper-slide-index"), 10);
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
			} else if (isObject(thumbsParams.swiper)) {
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
					if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
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
						newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;
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
						Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) ||
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
						shadowBefore = $(`<div class="swiper-slide-shadow-${isHorizontal ? "left" : "top"}"></div>`);
						$slideEl.append(shadowBefore);
					}

					if (shadowAfter.length === 0) {
						shadowAfter = $(`<div class="swiper-slide-shadow-${isHorizontal ? "right" : "bottom"}"></div>`);
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
				const progress = Math.min(Math.max($slideEl[0].progress, -params.limitProgress), params.limitProgress);
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

				const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
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
	} // CONCATENATED MODULE: ./node_modules/swiper/swiper.esm.js // CONCATENATED MODULE: ./src/js/components/sliders.js
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

	// функция разделения текста на буквы и слова
	function splitText(el) {
		el.innerHTML = el.innerText.replace(/(\S*)/g, (m) => {
			return (
				`<div style="display: inline-block" class="word">` +
				m.replace(/(#|@)?\S(#|@)?/g, "<div style='display: inline-block' class='letter'>$&</div>") +
				`</div>`
			);
		});
		return el;
	}

	core.use([Navigation, Pagination, Autoplay, Mousewheel]);
	const mediaQuery840 = window.matchMedia("(max-width: 840px)");
	const clientSection = document.querySelector(".client-1c");
	const contactsSection = document.querySelector(".contacts-1c");
	const paginationEl = contactsSection.querySelector(".contacts-1c__pagination");
	paginationEl.setAttribute("data-max-slides", contactsSection.querySelectorAll(".swiper-slide").length);
	const swiper = new core(".contacts-1c__slider", {
		slidesPerView: 1,
		speed: 400,
		navigation: {
			nextEl: ".contacts-1c__button-next",
			prevEl: ".contacts-1c__button-prev",
		},
		pagination: {
			el: paginationEl,
			type: "progressbar",
		},
		loop: true,
	});
	let contactsPlayCounter = 0;
	let clientPlayCounter = 0;
	const mainSwiper = new core(".main-1c", {
		slidesPerView: 1,
		speed: 500,
		direction: "vertical",
		mousewheel: true,
		navigation: {
			nextEl: ".main-1c__button-next",
			prevEl: ".main-1c__button-prev",
			disabledClass: "main-1c__button-disabled",
		},
		breakpoints: {
			841: {
				enabled: true,
			},
			0: {
				mousewheel: false,
				enabled: false,
			},
		},
		on: {
			activeIndexChange: () => {
				if (!mediaQuery840.matches) {
					if (mainSwiper.activeIndex == 1) {
						if (clientPlayCounter == 0) {
							if (clientSection !== null) {
								clientPlayCounter++;
								const clientTl = gsapWithCSS.timeline();
								const clientTitle = clientSection.querySelector(".client-1c__title");
								let clientSplitArray = Array.from(splitText(clientTitle).querySelectorAll(".letter"));
								clientSplitArray.forEach((letter) => {
									clientTl.fromTo(
										letter,
										{
											opacity: 0,
										},
										{
											opacity: 1,
											duration: 1 / clientSplitArray.length,
										}
									);
								});
								const clientSubTitle = clientSection.querySelector(".client-1c__subtitle");
								clientSplitArray = Array.from(splitText(clientSubTitle).querySelectorAll(".letter"));
								clientSplitArray.forEach((letter) => {
									clientTl.fromTo(
										letter,
										{
											opacity: 0,
										},
										{
											opacity: 1,
											duration: 1 / clientSplitArray.length,
										}
									);
								});
								const client1cItems = clientSection.querySelectorAll(".client-1c__item");
								client1cItems.forEach((item, idx) => {
									clientTl.fromTo(
										item.querySelector(".line-horizontal-top"),
										{
											width: 0,
										},
										{
											width: "100%",
											duration: 0.3,
										},
										`-=${idx * 0.6}`
									);
									let verticalRightLine = item.querySelector(".line-vertical-right");
									if (verticalRightLine !== null) {
										clientTl.fromTo(
											verticalRightLine,
											{
												height: 0,
											},
											{
												height: "100%",
												duration: 0.3,
											}
										);
									}
									clientTl.fromTo(
										item.querySelector(".client-1c__container-image"),
										{
											opacity: 0,
											y: 5,
											x: 5,
										},
										{
											opacity: 1,
											y: 0,
											x: 0,
											duration: 0.3,
										},
										`-=${idx * 0.4}`
									);
									clientSplitArray = Array.from(
										splitText(item.querySelector(".client-1c__text")).querySelectorAll(".letter")
									);
									clientSplitArray.forEach((el) => {
										clientTl.fromTo(
											el,
											{
												opacity: 0,
											},
											{
												opacity: 1,
												duration: 0.3 / clientSplitArray.length,
											}
										);
									});
								});
							}
						}
					} else if (mainSwiper.activeIndex == 2) {
						if (contactsPlayCounter == 0) {
							contactsPlayCounter++;
							if (contactsSection) {
								const contactsTl = gsapWithCSS.timeline();
								const address = contactsSection.querySelector(
									".swiper-slide-active .contacts-1c__address-first"
								);
								let contactsSplitArray = Array.from(splitText(address).querySelectorAll(".letter"));
								contactsSplitArray.forEach((letter) => {
									contactsTl.fromTo(
										letter,
										{
											opacity: 0,
										},
										{
											opacity: 1,
											duration: 0.9 / contactsSplitArray.length,
										}
									);
								});
								contactsTl.fromTo(
									".swiper-slide-active .contacts-1c__name",
									{
										opacity: 0,
										y: 5,
										x: 5,
									},
									{
										opacity: 1,
										y: 0,
										x: 0,
										duration: 0.5,
									},
									`-=0.2`
								);
								contactsTl.fromTo(
									".swiper-slide-active .contacts-1c__job",
									{
										opacity: 0,
										y: 5,
										x: -5,
									},
									{
										opacity: 1,
										y: 0,
										x: 0,
										duration: 0.3,
									},
									`-=0.1`
								);
								contactsTl.fromTo(
									".swiper-slide-active .contacts-1c__tel",
									{
										opacity: 0,
										y: 5,
										x: 5,
									},
									{
										opacity: 1,
										y: 0,
										x: 0,
										duration: 0.3,
									},
									`-=0.1`
								);
								contactsTl.fromTo(
									".swiper-slide-active .contacts-1c__descr",
									{
										opacity: 0,
									},
									{
										opacity: 1,
										y: 0,
										x: 0,
										duration: 0.5,
									}
								);
								const addressSecond = contactsSection.querySelector(
									".swiper-slide-active .contacts-1c__address-second"
								);
								contactsSplitArray = Array.from(splitText(addressSecond).querySelectorAll(".letter"));
								contactsSplitArray.forEach((letter) => {
									contactsTl.fromTo(
										letter,
										{
											opacity: 0,
										},
										{
											opacity: 1,
											duration: 0.4 / contactsSplitArray.length,
										}
									);
								});
								contactsTl.fromTo(
									".contacts-1c__navigation",
									{
										opacity: 0,
									},
									{
										opacity: 1,
										duration: 0.5,
									}
								);
								contactsTl.fromTo(
									".contacts-1c__container-pagination",
									{
										opacity: 0,
									},
									{
										opacity: 1,
										duration: 0.5,
									}
								);
								contactsTl.fromTo(
									".contacts-1c__button-faq",
									{
										opacity: 0,
										x: 40,
									},
									{
										opacity: 1,
										x: 0,
										duration: 0.5,
									}
								);
							}
						}
					}
				}
			},
		},
	});
	if (mediaQuery840.matches) {
		mainSwiper.destroy(true, true);
	} // CONCATENATED MODULE: ./node_modules/gsap/Observer.js
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}

	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		return Constructor;
	}

	/*!
	 * Observer 3.11.5
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2023, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	 */

	/* eslint-disable */
	var Observer_gsap,
		Observer_coreInitted,
		Observer_clamp,
		Observer_win,
		Observer_doc,
		_docEl,
		_body,
		_isTouch,
		_pointerType,
		ScrollTrigger,
		_root,
		_normalizer,
		_eventTypes,
		Observer_context,
		_getGSAP = function _getGSAP() {
			return (
				Observer_gsap ||
				(typeof window !== "undefined" &&
					(Observer_gsap = window.gsap) &&
					Observer_gsap.registerPlugin &&
					Observer_gsap)
			);
		},
		Observer_passThrough = function _passThrough(p) {
			return p;
		},
		_startup = 1,
		_observers = [],
		_scrollers = [],
		_proxies = [],
		_getTime = Date.now,
		_bridge = function _bridge(name, value) {
			return value;
		},
		_integrate = function _integrate() {
			var core = ScrollTrigger.core,
				data = core.bridge || {},
				scrollers = core._scrollers,
				proxies = core._proxies;
			scrollers.push.apply(scrollers, _scrollers);
			proxies.push.apply(proxies, _proxies);
			_scrollers = scrollers;
			_proxies = proxies;

			_bridge = function _bridge(name, value) {
				return data[name](value);
			};
		},
		_getProxyProp = function _getProxyProp(element, property) {
			return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
		},
		_isViewport = function _isViewport(el) {
			return !!~_root.indexOf(el);
		},
		_addListener = function _addListener(element, type, func, nonPassive, capture) {
			return element.addEventListener(type, func, {
				passive: !nonPassive,
				capture: !!capture,
			});
		},
		_removeListener = function _removeListener(element, type, func, capture) {
			return element.removeEventListener(type, func, !!capture);
		},
		_scrollLeft = "scrollLeft",
		_scrollTop = "scrollTop",
		_onScroll = function _onScroll() {
			return (_normalizer && _normalizer.isPressed) || _scrollers.cache++;
		},
		_scrollCacheFunc = function _scrollCacheFunc(f, doNotCache) {
			var cachingFunc = function cachingFunc(value) {
				// since reading the scrollTop/scrollLeft/pageOffsetY/pageOffsetX can trigger a layout, this function allows us to cache the value so it only gets read fresh after a "scroll" event fires (or while we're refreshing because that can lengthen the page and alter the scroll position). when "soft" is true, that means don't actually set the scroll, but cache the new value instead (useful in ScrollSmoother)
				if (value || value === 0) {
					_startup && (Observer_win.history.scrollRestoration = "manual"); // otherwise the new position will get overwritten by the browser onload.

					var isNormalizing = _normalizer && _normalizer.isPressed;
					value = cachingFunc.v = Math.round(value) || (_normalizer && _normalizer.iOS ? 1 : 0); //TODO: iOS Bug: if you allow it to go to 0, Safari can start to report super strange (wildly inaccurate) touch positions!

					f(value);
					cachingFunc.cacheID = _scrollers.cache;
					isNormalizing && _bridge("ss", value); // set scroll (notify ScrollTrigger so it can dispatch a "scrollStart" event if necessary
				} else if (doNotCache || _scrollers.cache !== cachingFunc.cacheID || _bridge("ref")) {
					cachingFunc.cacheID = _scrollers.cache;
					cachingFunc.v = f();
				}

				return cachingFunc.v + cachingFunc.offset;
			};

			cachingFunc.offset = 0;
			return f && cachingFunc;
		},
		_horizontal = {
			s: _scrollLeft,
			p: "left",
			p2: "Left",
			os: "right",
			os2: "Right",
			d: "width",
			d2: "Width",
			a: "x",
			sc: _scrollCacheFunc(function (value) {
				return arguments.length
					? Observer_win.scrollTo(value, _vertical.sc())
					: Observer_win.pageXOffset ||
							Observer_doc[_scrollLeft] ||
							_docEl[_scrollLeft] ||
							_body[_scrollLeft] ||
							0;
			}),
		},
		_vertical = {
			s: _scrollTop,
			p: "top",
			p2: "Top",
			os: "bottom",
			os2: "Bottom",
			d: "height",
			d2: "Height",
			a: "y",
			op: _horizontal,
			sc: _scrollCacheFunc(function (value) {
				return arguments.length
					? Observer_win.scrollTo(_horizontal.sc(), value)
					: Observer_win.pageYOffset ||
							Observer_doc[_scrollTop] ||
							_docEl[_scrollTop] ||
							_body[_scrollTop] ||
							0;
			}),
		},
		_getTarget = function _getTarget(t) {
			return (
				Observer_gsap.utils.toArray(t)[0] ||
				(typeof t === "string" && Observer_gsap.config().nullTargetWarn !== false
					? console.warn("Element not found:", t)
					: null)
			);
		},
		_getScrollFunc = function _getScrollFunc(element, _ref) {
			var s = _ref.s,
				sc = _ref.sc;
			// we store the scroller functions in an alternating sequenced Array like [element, verticalScrollFunc, horizontalScrollFunc, ...] so that we can minimize memory, maximize performance, and we also record the last position as a ".rec" property in order to revert to that after refreshing to ensure things don't shift around.
			_isViewport(element) && (element = Observer_doc.scrollingElement || _docEl);

			var i = _scrollers.indexOf(element),
				offset = sc === _vertical.sc ? 1 : 2;

			!~i && (i = _scrollers.push(element) - 1);
			_scrollers[i + offset] || element.addEventListener("scroll", _onScroll); // clear the cache when a scroll occurs

			var prev = _scrollers[i + offset],
				func =
					prev ||
					(_scrollers[i + offset] =
						_scrollCacheFunc(_getProxyProp(element, s), true) ||
						(_isViewport(element)
							? sc
							: _scrollCacheFunc(function (value) {
									return arguments.length ? (element[s] = value) : element[s];
							  })));
			func.target = element;
			prev || (func.smooth = Observer_gsap.getProperty(element, "scrollBehavior") === "smooth"); // only set it the first time (don't reset every time a scrollFunc is requested because perhaps it happens during a refresh() when it's disabled in ScrollTrigger.

			return func;
		},
		_getVelocityProp = function _getVelocityProp(value, minTimeRefresh, useDelta) {
			var v1 = value,
				v2 = value,
				t1 = _getTime(),
				t2 = t1,
				min = minTimeRefresh || 50,
				dropToZeroTime = Math.max(500, min * 3),
				update = function update(value, force) {
					var t = _getTime();

					if (force || t - t1 > min) {
						v2 = v1;
						v1 = value;
						t2 = t1;
						t1 = t;
					} else if (useDelta) {
						v1 += value;
					} else {
						// not totally necessary, but makes it a bit more accurate by adjusting the v1 value according to the new slope. This way we're not just ignoring the incoming data. Removing for now because it doesn't seem to make much practical difference and it's probably not worth the kb.
						v1 = v2 + ((value - v2) / (t - t2)) * (t1 - t2);
					}
				},
				reset = function reset() {
					v2 = v1 = useDelta ? 0 : v1;
					t2 = t1 = 0;
				},
				getVelocity = function getVelocity(latestValue) {
					var tOld = t2,
						vOld = v2,
						t = _getTime();

					(latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
					return t1 === t2 || t - t2 > dropToZeroTime
						? 0
						: ((v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld)) * 1000;
				};

			return {
				update: update,
				reset: reset,
				getVelocity: getVelocity,
			};
		},
		_getEvent = function _getEvent(e, preventDefault) {
			preventDefault && !e._gsapAllow && e.preventDefault();
			return e.changedTouches ? e.changedTouches[0] : e;
		},
		_getAbsoluteMax = function _getAbsoluteMax(a) {
			var max = Math.max.apply(Math, a),
				min = Math.min.apply(Math, a);
			return Math.abs(max) >= Math.abs(min) ? max : min;
		},
		_setScrollTrigger = function _setScrollTrigger() {
			ScrollTrigger = Observer_gsap.core.globals().ScrollTrigger;
			ScrollTrigger && ScrollTrigger.core && _integrate();
		},
		Observer_initCore = function _initCore(core) {
			Observer_gsap = core || _getGSAP();

			if (Observer_gsap && typeof document !== "undefined" && document.body) {
				Observer_win = window;
				Observer_doc = document;
				_docEl = Observer_doc.documentElement;
				_body = Observer_doc.body;
				_root = [Observer_win, Observer_doc, _docEl, _body];
				Observer_clamp = Observer_gsap.utils.clamp;

				Observer_context = Observer_gsap.core.context || function () {};

				_pointerType = "onpointerenter" in _body ? "pointer" : "mouse"; // isTouch is 0 if no touch, 1 if ONLY touch, and 2 if it can accommodate touch but also other types like mouse/pointer.

				_isTouch = Observer_Observer.isTouch =
					Observer_win.matchMedia && Observer_win.matchMedia("(hover: none), (pointer: coarse)").matches
						? 1
						: "ontouchstart" in Observer_win ||
						  navigator.maxTouchPoints > 0 ||
						  navigator.msMaxTouchPoints > 0
						? 2
						: 0;
				_eventTypes = Observer_Observer.eventTypes = (
					"ontouchstart" in _docEl
						? "touchstart,touchmove,touchcancel,touchend"
						: !("onpointerdown" in _docEl)
						? "mousedown,mousemove,mouseup,mouseup"
						: "pointerdown,pointermove,pointercancel,pointerup"
				).split(",");
				setTimeout(function () {
					return (_startup = 0);
				}, 500);

				_setScrollTrigger();

				Observer_coreInitted = 1;
			}

			return Observer_coreInitted;
		};

	_horizontal.op = _vertical;
	_scrollers.cache = 0;
	var Observer_Observer = /*#__PURE__*/ (function () {
		function Observer(vars) {
			this.init(vars);
		}

		var _proto = Observer.prototype;

		_proto.init = function init(vars) {
			Observer_coreInitted ||
				Observer_initCore(Observer_gsap) ||
				console.warn("Please gsap.registerPlugin(Observer)");
			ScrollTrigger || _setScrollTrigger();
			var tolerance = vars.tolerance,
				dragMinimum = vars.dragMinimum,
				type = vars.type,
				target = vars.target,
				lineHeight = vars.lineHeight,
				debounce = vars.debounce,
				preventDefault = vars.preventDefault,
				onStop = vars.onStop,
				onStopDelay = vars.onStopDelay,
				ignore = vars.ignore,
				wheelSpeed = vars.wheelSpeed,
				event = vars.event,
				onDragStart = vars.onDragStart,
				onDragEnd = vars.onDragEnd,
				onDrag = vars.onDrag,
				onPress = vars.onPress,
				onRelease = vars.onRelease,
				onRight = vars.onRight,
				onLeft = vars.onLeft,
				onUp = vars.onUp,
				onDown = vars.onDown,
				onChangeX = vars.onChangeX,
				onChangeY = vars.onChangeY,
				onChange = vars.onChange,
				onToggleX = vars.onToggleX,
				onToggleY = vars.onToggleY,
				onHover = vars.onHover,
				onHoverEnd = vars.onHoverEnd,
				onMove = vars.onMove,
				ignoreCheck = vars.ignoreCheck,
				isNormalizer = vars.isNormalizer,
				onGestureStart = vars.onGestureStart,
				onGestureEnd = vars.onGestureEnd,
				onWheel = vars.onWheel,
				onEnable = vars.onEnable,
				onDisable = vars.onDisable,
				onClick = vars.onClick,
				scrollSpeed = vars.scrollSpeed,
				capture = vars.capture,
				allowClicks = vars.allowClicks,
				lockAxis = vars.lockAxis,
				onLockAxis = vars.onLockAxis;
			this.target = target = _getTarget(target) || _docEl;
			this.vars = vars;
			ignore && (ignore = Observer_gsap.utils.toArray(ignore));
			tolerance = tolerance || 1e-9;
			dragMinimum = dragMinimum || 0;
			wheelSpeed = wheelSpeed || 1;
			scrollSpeed = scrollSpeed || 1;
			type = type || "wheel,touch,pointer";
			debounce = debounce !== false;
			lineHeight || (lineHeight = parseFloat(Observer_win.getComputedStyle(_body).lineHeight) || 22); // note: browser may report "normal", so default to 22.

			var id,
				onStopDelayedCall,
				dragged,
				moved,
				wheeled,
				locked,
				axis,
				self = this,
				prevDeltaX = 0,
				prevDeltaY = 0,
				scrollFuncX = _getScrollFunc(target, _horizontal),
				scrollFuncY = _getScrollFunc(target, _vertical),
				scrollX = scrollFuncX(),
				scrollY = scrollFuncY(),
				limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown",
				// for devices that accommodate mouse events and touch events, we need to distinguish.
				isViewport = _isViewport(target),
				ownerDoc = target.ownerDocument || Observer_doc,
				deltaX = [0, 0, 0],
				// wheel, scroll, pointer/touch
				deltaY = [0, 0, 0],
				onClickTime = 0,
				clickCapture = function clickCapture() {
					return (onClickTime = _getTime());
				},
				_ignoreCheck = function _ignoreCheck(e, isPointerOrTouch) {
					return (
						((self.event = e) && ignore && ~ignore.indexOf(e.target)) ||
						(isPointerOrTouch && limitToTouch && e.pointerType !== "touch") ||
						(ignoreCheck && ignoreCheck(e, isPointerOrTouch))
					);
				},
				onStopFunc = function onStopFunc() {
					self._vx.reset();

					self._vy.reset();

					onStopDelayedCall.pause();
					onStop && onStop(self);
				},
				update = function update() {
					var dx = (self.deltaX = _getAbsoluteMax(deltaX)),
						dy = (self.deltaY = _getAbsoluteMax(deltaY)),
						changedX = Math.abs(dx) >= tolerance,
						changedY = Math.abs(dy) >= tolerance;

					onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY); // in ScrollTrigger.normalizeScroll(), we need to know if it was touch/pointer so we need access to the deltaX/deltaY Arrays before we clear them out.

					if (changedX) {
						onRight && self.deltaX > 0 && onRight(self);
						onLeft && self.deltaX < 0 && onLeft(self);
						onChangeX && onChangeX(self);
						onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
						prevDeltaX = self.deltaX;
						deltaX[0] = deltaX[1] = deltaX[2] = 0;
					}

					if (changedY) {
						onDown && self.deltaY > 0 && onDown(self);
						onUp && self.deltaY < 0 && onUp(self);
						onChangeY && onChangeY(self);
						onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
						prevDeltaY = self.deltaY;
						deltaY[0] = deltaY[1] = deltaY[2] = 0;
					}

					if (moved || dragged) {
						onMove && onMove(self);

						if (dragged) {
							onDrag(self);
							dragged = false;
						}

						moved = false;
					}

					locked && !(locked = false) && onLockAxis && onLockAxis(self);

					if (wheeled) {
						onWheel(self);
						wheeled = false;
					}

					id = 0;
				},
				onDelta = function onDelta(x, y, index) {
					deltaX[index] += x;
					deltaY[index] += y;

					self._vx.update(x);

					self._vy.update(y);

					debounce ? id || (id = requestAnimationFrame(update)) : update();
				},
				onTouchOrPointerDelta = function onTouchOrPointerDelta(x, y) {
					if (lockAxis && !axis) {
						self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
						locked = true;
					}

					if (axis !== "y") {
						deltaX[2] += x;

						self._vx.update(x, true); // update the velocity as frequently as possible instead of in the debounced function so that very quick touch-scrolls (flicks) feel natural. If it's the mouse/touch/pointer, force it so that we get snappy/accurate momentum scroll.
					}

					if (axis !== "x") {
						deltaY[2] += y;

						self._vy.update(y, true);
					}

					debounce ? id || (id = requestAnimationFrame(update)) : update();
				},
				_onDrag = function _onDrag(e) {
					if (_ignoreCheck(e, 1)) {
						return;
					}

					e = _getEvent(e, preventDefault);
					var x = e.clientX,
						y = e.clientY,
						dx = x - self.x,
						dy = y - self.y,
						isDragging = self.isDragging;
					self.x = x;
					self.y = y;

					if (
						isDragging ||
						Math.abs(self.startX - x) >= dragMinimum ||
						Math.abs(self.startY - y) >= dragMinimum
					) {
						onDrag && (dragged = true);
						isDragging || (self.isDragging = true);
						onTouchOrPointerDelta(dx, dy);
						isDragging || (onDragStart && onDragStart(self));
					}
				},
				_onPress = (self.onPress = function (e) {
					if (_ignoreCheck(e, 1) || (e && e.button)) {
						return;
					}

					self.axis = axis = null;
					onStopDelayedCall.pause();
					self.isPressed = true;
					e = _getEvent(e); // note: may need to preventDefault(?) Won't side-scroll on iOS Safari if we do, though.

					prevDeltaX = prevDeltaY = 0;
					self.startX = self.x = e.clientX;
					self.startY = self.y = e.clientY;

					self._vx.reset(); // otherwise the t2 may be stale if the user touches and flicks super fast and releases in less than 2 requestAnimationFrame ticks, causing velocity to be 0.

					self._vy.reset();

					_addListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, preventDefault, true);

					self.deltaX = self.deltaY = 0;
					onPress && onPress(self);
				}),
				_onRelease = (self.onRelease = function (e) {
					if (_ignoreCheck(e, 1)) {
						return;
					}

					_removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);

					var isTrackingDrag = !isNaN(self.y - self.startY),
						wasDragging =
							self.isDragging &&
							(Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3),
						// some touch devices need some wiggle room in terms of sensing clicks - the finger may move a few pixels.
						eventData = _getEvent(e);

					if (!wasDragging && isTrackingDrag) {
						self._vx.reset();

						self._vy.reset();

						if (preventDefault && allowClicks) {
							Observer_gsap.delayedCall(0.08, function () {
								// some browsers (like Firefox) won't trust script-generated clicks, so if the user tries to click on a video to play it, for example, it simply won't work. Since a regular "click" event will most likely be generated anyway (one that has its isTrusted flag set to true), we must slightly delay our script-generated click so that the "real"/trusted one is prioritized. Remember, when there are duplicate events in quick succession, we suppress all but the first one. Some browsers don't even trigger the "real" one at all, so our synthetic one is a safety valve that ensures that no matter what, a click event does get dispatched.
								if (_getTime() - onClickTime > 300 && !e.defaultPrevented) {
									if (e.target.click) {
										//some browsers (like mobile Safari) don't properly trigger the click event
										e.target.click();
									} else if (ownerDoc.createEvent) {
										var syntheticEvent = ownerDoc.createEvent("MouseEvents");
										syntheticEvent.initMouseEvent(
											"click",
											true,
											true,
											Observer_win,
											1,
											eventData.screenX,
											eventData.screenY,
											eventData.clientX,
											eventData.clientY,
											false,
											false,
											false,
											false,
											0,
											null
										);
										e.target.dispatchEvent(syntheticEvent);
									}
								}
							});
						}
					}

					self.isDragging = self.isGesturing = self.isPressed = false;
					onStop && !isNormalizer && onStopDelayedCall.restart(true);
					onDragEnd && wasDragging && onDragEnd(self);
					onRelease && onRelease(self, wasDragging);
				}),
				_onGestureStart = function _onGestureStart(e) {
					return (
						e.touches &&
						e.touches.length > 1 &&
						(self.isGesturing = true) &&
						onGestureStart(e, self.isDragging)
					);
				},
				_onGestureEnd = function _onGestureEnd() {
					return (self.isGesturing = false) || onGestureEnd(self);
				},
				onScroll = function onScroll(e) {
					if (_ignoreCheck(e)) {
						return;
					}

					var x = scrollFuncX(),
						y = scrollFuncY();
					onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
					scrollX = x;
					scrollY = y;
					onStop && onStopDelayedCall.restart(true);
				},
				_onWheel = function _onWheel(e) {
					if (_ignoreCheck(e)) {
						return;
					}

					e = _getEvent(e, preventDefault);
					onWheel && (wheeled = true);
					var multiplier =
						(e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? Observer_win.innerHeight : 1) *
						wheelSpeed;
					onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
					onStop && !isNormalizer && onStopDelayedCall.restart(true);
				},
				_onMove = function _onMove(e) {
					if (_ignoreCheck(e)) {
						return;
					}

					var x = e.clientX,
						y = e.clientY,
						dx = x - self.x,
						dy = y - self.y;
					self.x = x;
					self.y = y;
					moved = true;
					(dx || dy) && onTouchOrPointerDelta(dx, dy);
				},
				_onHover = function _onHover(e) {
					self.event = e;
					onHover(self);
				},
				_onHoverEnd = function _onHoverEnd(e) {
					self.event = e;
					onHoverEnd(self);
				},
				_onClick = function _onClick(e) {
					return _ignoreCheck(e) || (_getEvent(e, preventDefault) && onClick(self));
				};

			onStopDelayedCall = self._dc = Observer_gsap.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
			self.deltaX = self.deltaY = 0;
			self._vx = _getVelocityProp(0, 50, true);
			self._vy = _getVelocityProp(0, 50, true);
			self.scrollX = scrollFuncX;
			self.scrollY = scrollFuncY;
			self.isDragging = self.isGesturing = self.isPressed = false;

			Observer_context(this);

			self.enable = function (e) {
				if (!self.isEnabled) {
					_addListener(isViewport ? ownerDoc : target, "scroll", _onScroll);

					type.indexOf("scroll") >= 0 &&
						_addListener(isViewport ? ownerDoc : target, "scroll", onScroll, preventDefault, capture);
					type.indexOf("wheel") >= 0 && _addListener(target, "wheel", _onWheel, preventDefault, capture);

					if ((type.indexOf("touch") >= 0 && _isTouch) || type.indexOf("pointer") >= 0) {
						_addListener(target, _eventTypes[0], _onPress, preventDefault, capture);

						_addListener(ownerDoc, _eventTypes[2], _onRelease);

						_addListener(ownerDoc, _eventTypes[3], _onRelease);

						allowClicks && _addListener(target, "click", clickCapture, false, true);
						onClick && _addListener(target, "click", _onClick);
						onGestureStart && _addListener(ownerDoc, "gesturestart", _onGestureStart);
						onGestureEnd && _addListener(ownerDoc, "gestureend", _onGestureEnd);
						onHover && _addListener(target, _pointerType + "enter", _onHover);
						onHoverEnd && _addListener(target, _pointerType + "leave", _onHoverEnd);
						onMove && _addListener(target, _pointerType + "move", _onMove);
					}

					self.isEnabled = true;
					e && e.type && _onPress(e);
					onEnable && onEnable(self);
				}

				return self;
			};

			self.disable = function () {
				if (self.isEnabled) {
					// only remove the _onScroll listener if there aren't any others that rely on the functionality.
					_observers.filter(function (o) {
						return o !== self && _isViewport(o.target);
					}).length || _removeListener(isViewport ? ownerDoc : target, "scroll", _onScroll);

					if (self.isPressed) {
						self._vx.reset();

						self._vy.reset();

						_removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
					}

					_removeListener(isViewport ? ownerDoc : target, "scroll", onScroll, capture);

					_removeListener(target, "wheel", _onWheel, capture);

					_removeListener(target, _eventTypes[0], _onPress, capture);

					_removeListener(ownerDoc, _eventTypes[2], _onRelease);

					_removeListener(ownerDoc, _eventTypes[3], _onRelease);

					_removeListener(target, "click", clickCapture, true);

					_removeListener(target, "click", _onClick);

					_removeListener(ownerDoc, "gesturestart", _onGestureStart);

					_removeListener(ownerDoc, "gestureend", _onGestureEnd);

					_removeListener(target, _pointerType + "enter", _onHover);

					_removeListener(target, _pointerType + "leave", _onHoverEnd);

					_removeListener(target, _pointerType + "move", _onMove);

					self.isEnabled = self.isPressed = self.isDragging = false;
					onDisable && onDisable(self);
				}
			};

			self.kill = self.revert = function () {
				self.disable();

				var i = _observers.indexOf(self);

				i >= 0 && _observers.splice(i, 1);
				_normalizer === self && (_normalizer = 0);
			};

			_observers.push(self);

			isNormalizer && _isViewport(target) && (_normalizer = self);
			self.enable(event);
		};

		_createClass(Observer, [
			{
				key: "velocityX",
				get: function get() {
					return this._vx.getVelocity();
				},
			},
			{
				key: "velocityY",
				get: function get() {
					return this._vy.getVelocity();
				},
			},
		]);

		return Observer;
	})();
	Observer_Observer.version = "3.11.5";

	Observer_Observer.create = function (vars) {
		return new Observer_Observer(vars);
	};

	Observer_Observer.register = Observer_initCore;

	Observer_Observer.getAll = function () {
		return _observers.slice();
	};

	Observer_Observer.getById = function (id) {
		return _observers.filter(function (o) {
			return o.vars.id === id;
		})[0];
	};

	_getGSAP() && Observer_gsap.registerPlugin(Observer_Observer); // CONCATENATED MODULE: ./node_modules/gsap/ScrollTrigger.js

	/*!
	 * ScrollTrigger 3.11.5
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2023, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	 */

	/* eslint-disable */

	var ScrollTrigger_gsap,
		ScrollTrigger_coreInitted,
		ScrollTrigger_win,
		ScrollTrigger_doc,
		ScrollTrigger_docEl,
		ScrollTrigger_body,
		ScrollTrigger_root,
		_resizeDelay,
		_toArray,
		ScrollTrigger_clamp,
		_time2,
		_syncInterval,
		_refreshing,
		_pointerIsDown,
		ScrollTrigger_transformProp,
		_i,
		_prevWidth,
		_prevHeight,
		_autoRefresh,
		_sort,
		ScrollTrigger_suppressOverwrites,
		_ignoreResize,
		ScrollTrigger_normalizer,
		_ignoreMobileResize,
		_baseScreenHeight,
		_baseScreenWidth,
		_fixIOSBug,
		ScrollTrigger_context,
		_scrollRestoration,
		_limitCallbacks,
		// if true, we'll only trigger callbacks if the active state toggles, so if you scroll immediately past both the start and end positions of a ScrollTrigger (thus inactive to inactive), neither its onEnter nor onLeave will be called. This is useful during startup.
		ScrollTrigger_startup = 1,
		ScrollTrigger_getTime = Date.now,
		_time1 = ScrollTrigger_getTime(),
		_lastScrollTime = 0,
		_enabled = 0,
		_rafBugFix = function _rafBugFix() {
			return _enabled && requestAnimationFrame(_rafBugFix);
		},
		// in some browsers (like Firefox), screen repaints weren't consistent unless we had SOMETHING queued up in requestAnimationFrame()! So this just creates a super simple loop to keep it alive and smooth out repaints.
		_pointerDownHandler = function _pointerDownHandler() {
			return (_pointerIsDown = 1);
		},
		_pointerUpHandler = function _pointerUpHandler() {
			return (_pointerIsDown = 0);
		},
		ScrollTrigger_passThrough = function _passThrough(v) {
			return v;
		},
		ScrollTrigger_round = function _round(value) {
			return Math.round(value * 100000) / 100000 || 0;
		},
		ScrollTrigger_windowExists = function _windowExists() {
			return typeof window !== "undefined";
		},
		ScrollTrigger_getGSAP = function _getGSAP() {
			return (
				ScrollTrigger_gsap ||
				(ScrollTrigger_windowExists() &&
					(ScrollTrigger_gsap = window.gsap) &&
					ScrollTrigger_gsap.registerPlugin &&
					ScrollTrigger_gsap)
			);
		},
		ScrollTrigger_isViewport = function _isViewport(e) {
			return !!~ScrollTrigger_root.indexOf(e);
		},
		_getBoundsFunc = function _getBoundsFunc(element) {
			return (
				_getProxyProp(element, "getBoundingClientRect") ||
				(ScrollTrigger_isViewport(element)
					? function () {
							_winOffsets.width = ScrollTrigger_win.innerWidth;
							_winOffsets.height = ScrollTrigger_win.innerHeight;
							return _winOffsets;
					  }
					: function () {
							return _getBounds(element);
					  })
			);
		},
		_getSizeFunc = function _getSizeFunc(scroller, isViewport, _ref) {
			var d = _ref.d,
				d2 = _ref.d2,
				a = _ref.a;
			return (a = _getProxyProp(scroller, "getBoundingClientRect"))
				? function () {
						return a()[d];
				  }
				: function () {
						return (isViewport ? ScrollTrigger_win["inner" + d2] : scroller["client" + d2]) || 0;
				  };
		},
		_getOffsetsFunc = function _getOffsetsFunc(element, isViewport) {
			return !isViewport || ~_proxies.indexOf(element)
				? _getBoundsFunc(element)
				: function () {
						return _winOffsets;
				  };
		},
		_maxScroll = function _maxScroll(element, _ref2) {
			var s = _ref2.s,
				d2 = _ref2.d2,
				d = _ref2.d,
				a = _ref2.a;
			return Math.max(
				0,
				(s = "scroll" + d2) && (a = _getProxyProp(element, s))
					? a() - _getBoundsFunc(element)()[d]
					: ScrollTrigger_isViewport(element)
					? (ScrollTrigger_docEl[s] || ScrollTrigger_body[s]) -
					  (ScrollTrigger_win["inner" + d2] ||
							ScrollTrigger_docEl["client" + d2] ||
							ScrollTrigger_body["client" + d2])
					: element[s] - element["offset" + d2]
			);
		},
		_iterateAutoRefresh = function _iterateAutoRefresh(func, events) {
			for (var i = 0; i < _autoRefresh.length; i += 3) {
				(!events || ~events.indexOf(_autoRefresh[i + 1])) &&
					func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
			}
		},
		ScrollTrigger_isString = function _isString(value) {
			return typeof value === "string";
		},
		ScrollTrigger_isFunction = function _isFunction(value) {
			return typeof value === "function";
		},
		ScrollTrigger_isNumber = function _isNumber(value) {
			return typeof value === "number";
		},
		ScrollTrigger_isObject = function _isObject(value) {
			return typeof value === "object";
		},
		_callIfFunc = function _callIfFunc(value) {
			return ScrollTrigger_isFunction(value) && value();
		},
		_combineFunc = function _combineFunc(f1, f2) {
			return function () {
				var result1 = _callIfFunc(f1),
					result2 = _callIfFunc(f2);

				return function () {
					_callIfFunc(result1);

					_callIfFunc(result2);
				};
			};
		},
		_endAnimation = function _endAnimation(animation, reversed, pause) {
			return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
		},
		ScrollTrigger_callback = function _callback(self, func) {
			if (self.enabled) {
				var result = func(self);
				result && result.totalTime && (self.callbackAnimation = result);
			}
		},
		_abs = Math.abs,
		ScrollTrigger_scrollLeft = "scrollLeft",
		ScrollTrigger_scrollTop = "scrollTop",
		_left = "left",
		_top = "top",
		_right = "right",
		_bottom = "bottom",
		_width = "width",
		_height = "height",
		_Right = "Right",
		_Left = "Left",
		_Top = "Top",
		_Bottom = "Bottom",
		_padding = "padding",
		_margin = "margin",
		_Width = "Width",
		_Height = "Height",
		_px = "px",
		_getComputedStyle = function _getComputedStyle(element) {
			return ScrollTrigger_win.getComputedStyle(element);
		},
		_makePositionable = function _makePositionable(element) {
			// if the element already has position: absolute or fixed, leave that, otherwise make it position: relative
			var position = _getComputedStyle(element).position;

			element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
		},
		ScrollTrigger_setDefaults = function _setDefaults(obj, defaults) {
			for (var p in defaults) {
				p in obj || (obj[p] = defaults[p]);
			}

			return obj;
		},
		_getBounds = function _getBounds(element, withoutTransforms) {
			var tween =
					withoutTransforms &&
					_getComputedStyle(element)[ScrollTrigger_transformProp] !== "matrix(1, 0, 0, 1, 0, 0)" &&
					ScrollTrigger_gsap.to(element, {
						x: 0,
						y: 0,
						xPercent: 0,
						yPercent: 0,
						rotation: 0,
						rotationX: 0,
						rotationY: 0,
						scale: 1,
						skewX: 0,
						skewY: 0,
					}).progress(1),
				bounds = element.getBoundingClientRect();
			tween && tween.progress(0).kill();
			return bounds;
		},
		_getSize = function _getSize(element, _ref3) {
			var d2 = _ref3.d2;
			return element["offset" + d2] || element["client" + d2] || 0;
		},
		_getLabelRatioArray = function _getLabelRatioArray(timeline) {
			var a = [],
				labels = timeline.labels,
				duration = timeline.duration(),
				p;

			for (p in labels) {
				a.push(labels[p] / duration);
			}

			return a;
		},
		_getClosestLabel = function _getClosestLabel(animation) {
			return function (value) {
				return ScrollTrigger_gsap.utils.snap(_getLabelRatioArray(animation), value);
			};
		},
		_snapDirectional = function _snapDirectional(snapIncrementOrArray) {
			var snap = ScrollTrigger_gsap.utils.snap(snapIncrementOrArray),
				a =
					Array.isArray(snapIncrementOrArray) &&
					snapIncrementOrArray.slice(0).sort(function (a, b) {
						return a - b;
					});
			return a
				? function (value, direction, threshold) {
						if (threshold === void 0) {
							threshold = 1e-3;
						}

						var i;

						if (!direction) {
							return snap(value);
						}

						if (direction > 0) {
							value -= threshold; // to avoid rounding errors. If we're too strict, it might snap forward, then immediately again, and again.

							for (i = 0; i < a.length; i++) {
								if (a[i] >= value) {
									return a[i];
								}
							}

							return a[i - 1];
						} else {
							i = a.length;
							value += threshold;

							while (i--) {
								if (a[i] <= value) {
									return a[i];
								}
							}
						}

						return a[0];
				  }
				: function (value, direction, threshold) {
						if (threshold === void 0) {
							threshold = 1e-3;
						}

						var snapped = snap(value);
						return !direction ||
							Math.abs(snapped - value) < threshold ||
							snapped - value < 0 === direction < 0
							? snapped
							: snap(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
				  };
		},
		_getLabelAtDirection = function _getLabelAtDirection(timeline) {
			return function (value, st) {
				return _snapDirectional(_getLabelRatioArray(timeline))(value, st.direction);
			};
		},
		_multiListener = function _multiListener(func, element, types, callback) {
			return types.split(",").forEach(function (type) {
				return func(element, type, callback);
			});
		},
		ScrollTrigger_addListener = function _addListener(element, type, func, nonPassive, capture) {
			return element.addEventListener(type, func, {
				passive: !nonPassive,
				capture: !!capture,
			});
		},
		ScrollTrigger_removeListener = function _removeListener(element, type, func, capture) {
			return element.removeEventListener(type, func, !!capture);
		},
		_wheelListener = function _wheelListener(func, el, scrollFunc) {
			scrollFunc = scrollFunc && scrollFunc.wheelHandler;

			if (scrollFunc) {
				func(el, "wheel", scrollFunc);
				func(el, "touchmove", scrollFunc);
			}
		},
		_markerDefaults = {
			startColor: "green",
			endColor: "red",
			indent: 0,
			fontSize: "16px",
			fontWeight: "normal",
		},
		ScrollTrigger_defaults = {
			toggleActions: "play",
			anticipatePin: 0,
		},
		_keywords = {
			top: 0,
			left: 0,
			center: 0.5,
			bottom: 1,
			right: 1,
		},
		_offsetToPx = function _offsetToPx(value, size) {
			if (ScrollTrigger_isString(value)) {
				var eqIndex = value.indexOf("="),
					relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;

				if (~eqIndex) {
					value.indexOf("%") > eqIndex && (relative *= size / 100);
					value = value.substr(0, eqIndex - 1);
				}

				value =
					relative +
					(value in _keywords
						? _keywords[value] * size
						: ~value.indexOf("%")
						? (parseFloat(value) * size) / 100
						: parseFloat(value) || 0);
			}

			return value;
		},
		_createMarker = function _createMarker(
			type,
			name,
			container,
			direction,
			_ref4,
			offset,
			matchWidthEl,
			containerAnimation
		) {
			var startColor = _ref4.startColor,
				endColor = _ref4.endColor,
				fontSize = _ref4.fontSize,
				indent = _ref4.indent,
				fontWeight = _ref4.fontWeight;

			var e = ScrollTrigger_doc.createElement("div"),
				useFixedPosition =
					ScrollTrigger_isViewport(container) || _getProxyProp(container, "pinType") === "fixed",
				isScroller = type.indexOf("scroller") !== -1,
				parent = useFixedPosition ? ScrollTrigger_body : container,
				isStart = type.indexOf("start") !== -1,
				color = isStart ? startColor : endColor,
				css =
					"border-color:" +
					color +
					";font-size:" +
					fontSize +
					";color:" +
					color +
					";font-weight:" +
					fontWeight +
					";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";

			css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
			(isScroller || containerAnimation || !useFixedPosition) &&
				(css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
			matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
			e._isStart = isStart;
			e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
			e.style.cssText = css;
			e.innerText = name || name === 0 ? type + "-" + name : type;
			parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
			e._offset = e["offset" + direction.op.d2];

			_positionMarker(e, 0, direction, isStart);

			return e;
		},
		_positionMarker = function _positionMarker(marker, start, direction, flipped) {
			var vars = {
					display: "block",
				},
				side = direction[flipped ? "os2" : "p2"],
				oppositeSide = direction[flipped ? "p2" : "os2"];
			marker._isFlipped = flipped;
			vars[direction.a + "Percent"] = flipped ? -100 : 0;
			vars[direction.a] = flipped ? "1px" : 0;
			vars["border" + side + _Width] = 1;
			vars["border" + oppositeSide + _Width] = 0;
			vars[direction.p] = start + "px";
			ScrollTrigger_gsap.set(marker, vars);
		},
		_triggers = [],
		_ids = {},
		_rafID,
		_sync = function _sync() {
			return (
				ScrollTrigger_getTime() - _lastScrollTime > 34 &&
				(_rafID || (_rafID = requestAnimationFrame(_updateAll)))
			);
		},
		ScrollTrigger_onScroll = function _onScroll() {
			// previously, we tried to optimize performance by batching/deferring to the next requestAnimationFrame(), but discovered that Safari has a few bugs that make this unworkable (especially on iOS). See https://codepen.io/GreenSock/pen/16c435b12ef09c38125204818e7b45fc?editors=0010 and https://codepen.io/GreenSock/pen/JjOxYpQ/3dd65ccec5a60f1d862c355d84d14562?editors=0010 and https://codepen.io/GreenSock/pen/ExbrPNa/087cef197dc35445a0951e8935c41503?editors=0010
			if (
				!ScrollTrigger_normalizer ||
				!ScrollTrigger_normalizer.isPressed ||
				ScrollTrigger_normalizer.startX > ScrollTrigger_body.clientWidth
			) {
				// if the user is dragging the scrollbar, allow it.
				_scrollers.cache++;

				if (ScrollTrigger_normalizer) {
					_rafID || (_rafID = requestAnimationFrame(_updateAll));
				} else {
					_updateAll(); // Safari in particular (on desktop) NEEDS the immediate update rather than waiting for a requestAnimationFrame() whereas iOS seems to benefit from waiting for the requestAnimationFrame() tick, at least when normalizing. See https://codepen.io/GreenSock/pen/qBYozqO?editors=0110
				}

				_lastScrollTime || ScrollTrigger_dispatch("scrollStart");
				_lastScrollTime = ScrollTrigger_getTime();
			}
		},
		_setBaseDimensions = function _setBaseDimensions() {
			_baseScreenWidth = ScrollTrigger_win.innerWidth;
			_baseScreenHeight = ScrollTrigger_win.innerHeight;
		},
		_onResize = function _onResize() {
			_scrollers.cache++;
			!_refreshing &&
				!_ignoreResize &&
				!ScrollTrigger_doc.fullscreenElement &&
				!ScrollTrigger_doc.webkitFullscreenElement &&
				(!_ignoreMobileResize ||
					_baseScreenWidth !== ScrollTrigger_win.innerWidth ||
					Math.abs(ScrollTrigger_win.innerHeight - _baseScreenHeight) >
						ScrollTrigger_win.innerHeight * 0.25) &&
				_resizeDelay.restart(true);
		},
		// ignore resizes triggered by refresh()
		ScrollTrigger_listeners = {},
		ScrollTrigger_emptyArray = [],
		_softRefresh = function _softRefresh() {
			return (
				ScrollTrigger_removeListener(ScrollTrigger_ScrollTrigger, "scrollEnd", _softRefresh) ||
				_refreshAll(true)
			);
		},
		ScrollTrigger_dispatch = function _dispatch(type) {
			return (
				(ScrollTrigger_listeners[type] &&
					ScrollTrigger_listeners[type].map(function (f) {
						return f();
					})) ||
				ScrollTrigger_emptyArray
			);
		},
		_savedStyles = [],
		// when ScrollTrigger.saveStyles() is called, the inline styles are recorded in this Array in a sequential format like [element, cssText, gsCache, media]. This keeps it very memory-efficient and fast to iterate through.
		_revertRecorded = function _revertRecorded(media) {
			for (var i = 0; i < _savedStyles.length; i += 5) {
				if (!media || (_savedStyles[i + 4] && _savedStyles[i + 4].query === media)) {
					_savedStyles[i].style.cssText = _savedStyles[i + 1];
					_savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
					_savedStyles[i + 3].uncache = 1;
				}
			}
		},
		_revertAll = function _revertAll(kill, media) {
			var trigger;

			for (_i = 0; _i < _triggers.length; _i++) {
				trigger = _triggers[_i];

				if (trigger && (!media || trigger._ctx === media)) {
					if (kill) {
						trigger.kill(1);
					} else {
						trigger.revert(true, true);
					}
				}
			}

			media && _revertRecorded(media);
			media || ScrollTrigger_dispatch("revert");
		},
		_clearScrollMemory = function _clearScrollMemory(scrollRestoration, force) {
			// zero-out all the recorded scroll positions. Don't use _triggers because if, for example, .matchMedia() is used to create some ScrollTriggers and then the user resizes and it removes ALL ScrollTriggers, and then go back to a size where there are ScrollTriggers, it would have kept the position(s) saved from the initial state.
			_scrollers.cache++;
			(force || !_refreshingAll) &&
				_scrollers.forEach(function (obj) {
					return ScrollTrigger_isFunction(obj) && obj.cacheID++ && (obj.rec = 0);
				});
			ScrollTrigger_isString(scrollRestoration) &&
				(ScrollTrigger_win.history.scrollRestoration = _scrollRestoration = scrollRestoration);
		},
		_refreshingAll,
		_refreshID = 0,
		_queueRefreshID,
		_queueRefreshAll = function _queueRefreshAll() {
			// we don't want to call _refreshAll() every time we create a new ScrollTrigger (for performance reasons) - it's better to batch them. Some frameworks dynamically load content and we can't rely on the window's "load" or "DOMContentLoaded" events to trigger it.
			if (_queueRefreshID !== _refreshID) {
				var id = (_queueRefreshID = _refreshID);
				requestAnimationFrame(function () {
					return id === _refreshID && _refreshAll(true);
				});
			}
		},
		_refreshAll = function _refreshAll(force, skipRevert) {
			if (_lastScrollTime && !force) {
				ScrollTrigger_addListener(ScrollTrigger_ScrollTrigger, "scrollEnd", _softRefresh);

				return;
			}

			_refreshingAll = ScrollTrigger_ScrollTrigger.isRefreshing = true;

			_scrollers.forEach(function (obj) {
				return ScrollTrigger_isFunction(obj) && obj.cacheID++ && (obj.rec = obj());
			}); // force the clearing of the cache because some browsers take a little while to dispatch the "scroll" event and the user may have changed the scroll position and then called ScrollTrigger.refresh() right away

			var refreshInits = ScrollTrigger_dispatch("refreshInit");

			_sort && ScrollTrigger_ScrollTrigger.sort();
			skipRevert || _revertAll();

			_scrollers.forEach(function (obj) {
				if (ScrollTrigger_isFunction(obj)) {
					obj.smooth && (obj.target.style.scrollBehavior = "auto"); // smooth scrolling interferes

					obj(0);
				}
			});

			_triggers.slice(0).forEach(function (t) {
				return t.refresh();
			}); // don't loop with _i because during a refresh() someone could call ScrollTrigger.update() which would iterate through _i resulting in a skip.

			_triggers.forEach(function (t, i) {
				// nested pins (pinnedContainer) with pinSpacing may expand the container, so we must accommodate that here.
				if (t._subPinOffset && t.pin) {
					var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight",
						original = t.pin[prop];
					t.revert(true, 1);
					t.adjustPinSpacing(t.pin[prop] - original);
					t.refresh();
				}
			});

			_triggers.forEach(function (t) {
				return (
					t.vars.end === "max" &&
					t.setPositions(t.start, Math.max(t.start + 1, _maxScroll(t.scroller, t._dir)))
				);
			}); // the scroller's max scroll position may change after all the ScrollTriggers refreshed (like pinning could push it down), so we need to loop back and correct any with end: "max".

			refreshInits.forEach(function (result) {
				return result && result.render && result.render(-1);
			}); // if the onRefreshInit() returns an animation (typically a gsap.set()), revert it. This makes it easy to put things in a certain spot before refreshing for measurement purposes, and then put things back.

			_scrollers.forEach(function (obj) {
				if (ScrollTrigger_isFunction(obj)) {
					obj.smooth &&
						requestAnimationFrame(function () {
							return (obj.target.style.scrollBehavior = "smooth");
						});
					obj.rec && obj(obj.rec);
				}
			});

			_clearScrollMemory(_scrollRestoration, 1);

			_resizeDelay.pause();

			_refreshID++;
			_refreshingAll = 2;

			_updateAll(2);

			_triggers.forEach(function (t) {
				return ScrollTrigger_isFunction(t.vars.onRefresh) && t.vars.onRefresh(t);
			});

			_refreshingAll = ScrollTrigger_ScrollTrigger.isRefreshing = false;

			ScrollTrigger_dispatch("refresh");
		},
		_lastScroll = 0,
		_direction = 1,
		_primary,
		_updateAll = function _updateAll(force) {
			if (!_refreshingAll || force === 2) {
				ScrollTrigger_ScrollTrigger.isUpdating = true;
				_primary && _primary.update(0); // ScrollSmoother uses refreshPriority -9999 to become the primary that gets updated before all others because it affects the scroll position.

				var l = _triggers.length,
					time = ScrollTrigger_getTime(),
					recordVelocity = time - _time1 >= 50,
					scroll = l && _triggers[0].scroll();

				_direction = _lastScroll > scroll ? -1 : 1;
				_refreshingAll || (_lastScroll = scroll);

				if (recordVelocity) {
					if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
						_lastScrollTime = 0;

						ScrollTrigger_dispatch("scrollEnd");
					}

					_time2 = _time1;
					_time1 = time;
				}

				if (_direction < 0) {
					_i = l;

					while (_i-- > 0) {
						_triggers[_i] && _triggers[_i].update(0, recordVelocity);
					}

					_direction = 1;
				} else {
					for (_i = 0; _i < l; _i++) {
						_triggers[_i] && _triggers[_i].update(0, recordVelocity);
					}
				}

				ScrollTrigger_ScrollTrigger.isUpdating = false;
			}

			_rafID = 0;
		},
		_propNamesToCopy = [
			_left,
			_top,
			_bottom,
			_right,
			_margin + _Bottom,
			_margin + _Right,
			_margin + _Top,
			_margin + _Left,
			"display",
			"flexShrink",
			"float",
			"zIndex",
			"gridColumnStart",
			"gridColumnEnd",
			"gridRowStart",
			"gridRowEnd",
			"gridArea",
			"justifySelf",
			"alignSelf",
			"placeSelf",
			"order",
		],
		_stateProps = _propNamesToCopy.concat([
			_width,
			_height,
			"boxSizing",
			"max" + _Width,
			"max" + _Height,
			"position",
			_margin,
			_padding,
			_padding + _Top,
			_padding + _Right,
			_padding + _Bottom,
			_padding + _Left,
		]),
		_swapPinOut = function _swapPinOut(pin, spacer, state) {
			_setState(state);

			var cache = pin._gsap;

			if (cache.spacerIsNative) {
				_setState(cache.spacerState);
			} else if (pin._gsap.swappedIn) {
				var parent = spacer.parentNode;

				if (parent) {
					parent.insertBefore(pin, spacer);
					parent.removeChild(spacer);
				}
			}

			pin._gsap.swappedIn = false;
		},
		_swapPinIn = function _swapPinIn(pin, spacer, cs, spacerState) {
			if (!pin._gsap.swappedIn) {
				var i = _propNamesToCopy.length,
					spacerStyle = spacer.style,
					pinStyle = pin.style,
					p;

				while (i--) {
					p = _propNamesToCopy[i];
					spacerStyle[p] = cs[p];
				}

				spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
				cs.display === "inline" && (spacerStyle.display = "inline-block");
				pinStyle[_bottom] = pinStyle[_right] = "auto";
				spacerStyle.flexBasis = cs.flexBasis || "auto";
				spacerStyle.overflow = "visible";
				spacerStyle.boxSizing = "border-box";
				spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
				spacerStyle[_height] = _getSize(pin, _vertical) + _px;
				spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";

				_setState(spacerState);

				pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
				pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
				pinStyle[_padding] = cs[_padding];

				if (pin.parentNode !== spacer) {
					pin.parentNode.insertBefore(spacer, pin);
					spacer.appendChild(pin);
				}

				pin._gsap.swappedIn = true;
			}
		},
		ScrollTrigger_capsExp = /([A-Z])/g,
		_setState = function _setState(state) {
			if (state) {
				var style = state.t.style,
					l = state.length,
					i = 0,
					p,
					value;
				(state.t._gsap || ScrollTrigger_gsap.core.getCache(state.t)).uncache = 1; // otherwise transforms may be off

				for (; i < l; i += 2) {
					value = state[i + 1];
					p = state[i];

					if (value) {
						style[p] = value;
					} else if (style[p]) {
						style.removeProperty(p.replace(ScrollTrigger_capsExp, "-$1").toLowerCase());
					}
				}
			}
		},
		_getState = function _getState(element) {
			// returns an Array with alternating values like [property, value, property, value] and a "t" property pointing to the target (element). Makes it fast and cheap.
			var l = _stateProps.length,
				style = element.style,
				state = [],
				i = 0;

			for (; i < l; i++) {
				state.push(_stateProps[i], style[_stateProps[i]]);
			}

			state.t = element;
			return state;
		},
		_copyState = function _copyState(state, override, omitOffsets) {
			var result = [],
				l = state.length,
				i = omitOffsets ? 8 : 0,
				// skip top, left, right, bottom if omitOffsets is true
				p;

			for (; i < l; i += 2) {
				p = state[i];
				result.push(p, p in override ? override[p] : state[i + 1]);
			}

			result.t = state.t;
			return result;
		},
		_winOffsets = {
			left: 0,
			top: 0,
		},
		// // potential future feature (?) Allow users to calculate where a trigger hits (scroll position) like getScrollPosition("#id", "top bottom")
		// _getScrollPosition = (trigger, position, {scroller, containerAnimation, horizontal}) => {
		// 	scroller = _getTarget(scroller || _win);
		// 	let direction = horizontal ? _horizontal : _vertical,
		// 		isViewport = _isViewport(scroller);
		// 	_getSizeFunc(scroller, isViewport, direction);
		// 	return _parsePosition(position, _getTarget(trigger), _getSizeFunc(scroller, isViewport, direction)(), direction, _getScrollFunc(scroller, direction)(), 0, 0, 0, _getOffsetsFunc(scroller, isViewport)(), isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, 0, containerAnimation ? containerAnimation.duration() : _maxScroll(scroller), containerAnimation);
		// },
		ScrollTrigger_parsePosition = function _parsePosition(
			value,
			trigger,
			scrollerSize,
			direction,
			scroll,
			marker,
			markerScroller,
			self,
			scrollerBounds,
			borderWidth,
			useFixedPosition,
			scrollerMax,
			containerAnimation
		) {
			ScrollTrigger_isFunction(value) && (value = value(self));

			if (ScrollTrigger_isString(value) && value.substr(0, 3) === "max") {
				value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
			}

			var time = containerAnimation ? containerAnimation.time() : 0,
				p1,
				p2,
				element;
			containerAnimation && containerAnimation.seek(0);

			if (!ScrollTrigger_isNumber(value)) {
				ScrollTrigger_isFunction(trigger) && (trigger = trigger(self));
				var offsets = (value || "0").split(" "),
					bounds,
					localOffset,
					globalOffset,
					display;
				element = _getTarget(trigger) || ScrollTrigger_body;
				bounds = _getBounds(element) || {};

				if ((!bounds || (!bounds.left && !bounds.top)) && _getComputedStyle(element).display === "none") {
					// if display is "none", it won't report getBoundingClientRect() properly
					display = element.style.display;
					element.style.display = "block";
					bounds = _getBounds(element);
					display ? (element.style.display = display) : element.style.removeProperty("display");
				}

				localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
				globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
				value =
					bounds[direction.p] -
					scrollerBounds[direction.p] -
					borderWidth +
					localOffset +
					scroll -
					globalOffset;
				markerScroller &&
					_positionMarker(
						markerScroller,
						globalOffset,
						direction,
						scrollerSize - globalOffset < 20 || (markerScroller._isStart && globalOffset > 20)
					);
				scrollerSize -= scrollerSize - globalOffset; // adjust for the marker
			} else {
				containerAnimation &&
					(value = ScrollTrigger_gsap.utils.mapRange(
						containerAnimation.scrollTrigger.start,
						containerAnimation.scrollTrigger.end,
						0,
						scrollerMax,
						value
					));
				markerScroller && _positionMarker(markerScroller, scrollerSize, direction, true);
			}

			if (marker) {
				var position = value + scrollerSize,
					isStart = marker._isStart;
				p1 = "scroll" + direction.d2;

				_positionMarker(
					marker,
					position,
					direction,
					(isStart && position > 20) ||
						(!isStart &&
							(useFixedPosition
								? Math.max(ScrollTrigger_body[p1], ScrollTrigger_docEl[p1])
								: marker.parentNode[p1]) <=
								position + 1)
				);

				if (useFixedPosition) {
					scrollerBounds = _getBounds(markerScroller);
					useFixedPosition &&
						(marker.style[direction.op.p] =
							scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
				}
			}

			if (containerAnimation && element) {
				p1 = _getBounds(element);
				containerAnimation.seek(scrollerMax);
				p2 = _getBounds(element);
				containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
				value = (value / containerAnimation._caScrollDist) * scrollerMax;
			}

			containerAnimation && containerAnimation.seek(time);
			return containerAnimation ? value : Math.round(value);
		},
		_prefixExp = /(webkit|moz|length|cssText|inset)/i,
		_reparent = function _reparent(element, parent, top, left) {
			if (element.parentNode !== parent) {
				var style = element.style,
					p,
					cs;

				if (parent === ScrollTrigger_body) {
					element._stOrig = style.cssText; // record original inline styles so we can revert them later

					cs = _getComputedStyle(element);

					for (p in cs) {
						// must copy all relevant styles to ensure that nothing changes visually when we reparent to the <body>. Skip the vendor prefixed ones.
						if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
							style[p] = cs[p];
						}
					}

					style.top = top;
					style.left = left;
				} else {
					style.cssText = element._stOrig;
				}

				ScrollTrigger_gsap.core.getCache(element).uncache = 1;
				parent.appendChild(element);
			}
		},
		_interruptionTracker = function _interruptionTracker(getValueFunc, initialValue, onInterrupt) {
			var last1 = initialValue,
				last2 = last1;
			return function (value) {
				var current = Math.round(getValueFunc()); // round because in some [very uncommon] Windows environments, scroll can get reported with decimals even though it was set without.

				if (
					current !== last1 &&
					current !== last2 &&
					Math.abs(current - last1) > 3 &&
					Math.abs(current - last2) > 3
				) {
					// if the user scrolls, kill the tween. iOS Safari intermittently misreports the scroll position, it may be the most recently-set one or the one before that! When Safari is zoomed (CMD-+), it often misreports as 1 pixel off too! So if we set the scroll position to 125, for example, it'll actually report it as 124.
					value = current;
					onInterrupt && onInterrupt();
				}

				last2 = last1;
				last1 = value;
				return value;
			};
		},
		// _mergeAnimations = animations => {
		// 	let tl = gsap.timeline({smoothChildTiming: true}).startTime(Math.min(...animations.map(a => a.globalTime(0))));
		// 	animations.forEach(a => {let time = a.totalTime(); tl.add(a); a.totalTime(time); });
		// 	tl.smoothChildTiming = false;
		// 	return tl;
		// },
		// returns a function that can be used to tween the scroll position in the direction provided, and when doing so it'll add a .tween property to the FUNCTION itself, and remove it when the tween completes or gets killed. This gives us a way to have multiple ScrollTriggers use a central function for any given scroller and see if there's a scroll tween running (which would affect if/how things get updated)
		_getTweenCreator = function _getTweenCreator(scroller, direction) {
			var getScroll = _getScrollFunc(scroller, direction),
				prop = "_scroll" + direction.p2,
				// add a tweenable property to the scroller that's a getter/setter function, like _scrollTop or _scrollLeft. This way, if someone does gsap.killTweensOf(scroller) it'll kill the scroll tween.
				lastScroll1,
				lastScroll2,
				getTween = function getTween(scrollTo, vars, initialValue, change1, change2) {
					var tween = getTween.tween,
						onComplete = vars.onComplete,
						modifiers = {};
					initialValue = initialValue || getScroll();

					var checkForInterruption = _interruptionTracker(getScroll, initialValue, function () {
						tween.kill();
						getTween.tween = 0;
					});

					change2 = (change1 && change2) || 0; // if change1 is 0, we set that to the difference and ignore change2. Otherwise, there would be a compound effect.

					change1 = change1 || scrollTo - initialValue;
					tween && tween.kill();
					lastScroll1 = Math.round(initialValue);
					vars[prop] = scrollTo;
					vars.modifiers = modifiers;

					modifiers[prop] = function () {
						return checkForInterruption(
							initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio
						);
					};

					vars.onUpdate = function () {
						_scrollers.cache++;

						_updateAll();
					};

					vars.onComplete = function () {
						getTween.tween = 0;
						onComplete && onComplete.call(tween);
					};

					tween = getTween.tween = ScrollTrigger_gsap.to(scroller, vars);
					return tween;
				};

			scroller[prop] = getScroll;

			getScroll.wheelHandler = function () {
				return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
			};

			ScrollTrigger_addListener(scroller, "wheel", getScroll.wheelHandler); // Windows machines handle mousewheel scrolling in chunks (like "3 lines per scroll") meaning the typical strategy for cancelling the scroll isn't as sensitive. It's much more likely to match one of the previous 2 scroll event positions. So we kill any snapping as soon as there's a wheel event.

			ScrollTrigger_ScrollTrigger.isTouch &&
				ScrollTrigger_addListener(scroller, "touchmove", getScroll.wheelHandler);
			return getTween;
		};

	var ScrollTrigger_ScrollTrigger = /*#__PURE__*/ (function () {
		function ScrollTrigger(vars, animation) {
			ScrollTrigger_coreInitted ||
				ScrollTrigger.register(ScrollTrigger_gsap) ||
				console.warn("Please gsap.registerPlugin(ScrollTrigger)");
			this.init(vars, animation);
		}

		var _proto = ScrollTrigger.prototype;

		_proto.init = function init(vars, animation) {
			this.progress = this.start = 0;
			this.vars && this.kill(true, true); // in case it's being initted again

			if (!_enabled) {
				this.update = this.refresh = this.kill = ScrollTrigger_passThrough;
				return;
			}

			vars = ScrollTrigger_setDefaults(
				ScrollTrigger_isString(vars) || ScrollTrigger_isNumber(vars) || vars.nodeType
					? {
							trigger: vars,
					  }
					: vars,
				ScrollTrigger_defaults
			);

			var _vars = vars,
				onUpdate = _vars.onUpdate,
				toggleClass = _vars.toggleClass,
				id = _vars.id,
				onToggle = _vars.onToggle,
				onRefresh = _vars.onRefresh,
				scrub = _vars.scrub,
				trigger = _vars.trigger,
				pin = _vars.pin,
				pinSpacing = _vars.pinSpacing,
				invalidateOnRefresh = _vars.invalidateOnRefresh,
				anticipatePin = _vars.anticipatePin,
				onScrubComplete = _vars.onScrubComplete,
				onSnapComplete = _vars.onSnapComplete,
				once = _vars.once,
				snap = _vars.snap,
				pinReparent = _vars.pinReparent,
				pinSpacer = _vars.pinSpacer,
				containerAnimation = _vars.containerAnimation,
				fastScrollEnd = _vars.fastScrollEnd,
				preventOverlaps = _vars.preventOverlaps,
				direction =
					vars.horizontal || (vars.containerAnimation && vars.horizontal !== false) ? _horizontal : _vertical,
				isToggle = !scrub && scrub !== 0,
				scroller = _getTarget(vars.scroller || ScrollTrigger_win),
				scrollerCache = ScrollTrigger_gsap.core.getCache(scroller),
				isViewport = ScrollTrigger_isViewport(scroller),
				useFixedPosition =
					("pinType" in vars
						? vars.pinType
						: _getProxyProp(scroller, "pinType") || (isViewport && "fixed")) === "fixed",
				callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack],
				toggleActions = isToggle && vars.toggleActions.split(" "),
				markers = "markers" in vars ? vars.markers : ScrollTrigger_defaults.markers,
				borderWidth = isViewport
					? 0
					: parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0,
				self = this,
				onRefreshInit =
					vars.onRefreshInit &&
					function () {
						return vars.onRefreshInit(self);
					},
				getScrollerSize = _getSizeFunc(scroller, isViewport, direction),
				getScrollerOffsets = _getOffsetsFunc(scroller, isViewport),
				lastSnap = 0,
				lastRefresh = 0,
				scrollFunc = _getScrollFunc(scroller, direction),
				tweenTo,
				pinCache,
				snapFunc,
				scroll1,
				scroll2,
				start,
				end,
				markerStart,
				markerEnd,
				markerStartTrigger,
				markerEndTrigger,
				markerVars,
				change,
				pinOriginalState,
				pinActiveState,
				pinState,
				spacer,
				offset,
				pinGetter,
				pinSetter,
				pinStart,
				pinChange,
				spacingStart,
				spacerState,
				markerStartSetter,
				pinMoves,
				markerEndSetter,
				cs,
				snap1,
				snap2,
				scrubTween,
				scrubSmooth,
				snapDurClamp,
				snapDelayedCall,
				prevProgress,
				prevScroll,
				prevAnimProgress,
				caMarkerSetter,
				customRevertReturn;

			ScrollTrigger_context(self);

			self._dir = direction;
			anticipatePin *= 45;
			self.scroller = scroller;
			self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
			scroll1 = scrollFunc();
			self.vars = vars;
			animation = animation || vars.animation;

			if ("refreshPriority" in vars) {
				_sort = 1;
				vars.refreshPriority === -9999 && (_primary = self); // used by ScrollSmoother
			}

			scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
				top: _getTweenCreator(scroller, _vertical),
				left: _getTweenCreator(scroller, _horizontal),
			};
			self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];

			self.scrubDuration = function (value) {
				scrubSmooth = ScrollTrigger_isNumber(value) && value;

				if (!scrubSmooth) {
					scrubTween && scrubTween.progress(1).kill();
					scrubTween = 0;
				} else {
					scrubTween
						? scrubTween.duration(value)
						: (scrubTween = ScrollTrigger_gsap.to(animation, {
								ease: "expo",
								totalProgress: "+=0.001",
								duration: scrubSmooth,
								paused: true,
								onComplete: function onComplete() {
									return onScrubComplete && onScrubComplete(self);
								},
						  }));
				}
			};

			if (animation) {
				animation.vars.lazy = false;
				animation._initted ||
					(animation.vars.immediateRender !== false &&
						vars.immediateRender !== false &&
						animation.duration() &&
						animation.render(0, true, true));
				self.animation = animation.pause();
				animation.scrollTrigger = self;
				self.scrubDuration(scrub);
				scrubTween && scrubTween.resetTo && scrubTween.resetTo("totalProgress", 0); // otherwise the initial scrub progress value would start at 0.001 which normally is no big deal, but for containerAnimation it can be noticeable since the range is so tiny.

				snap1 = 0;
				id || (id = animation.vars.id);
			}

			_triggers.push(self);

			if (snap) {
				// TODO: potential idea: use legitimate CSS scroll snapping by pushing invisible elements into the DOM that serve as snap positions, and toggle the document.scrollingElement.style.scrollSnapType onToggle. See https://codepen.io/GreenSock/pen/JjLrgWM for a quick proof of concept.
				if (!ScrollTrigger_isObject(snap) || snap.push) {
					snap = {
						snapTo: snap,
					};
				}

				"scrollBehavior" in ScrollTrigger_body.style &&
					ScrollTrigger_gsap.set(isViewport ? [ScrollTrigger_body, ScrollTrigger_docEl] : scroller, {
						scrollBehavior: "auto",
					}); // smooth scrolling doesn't work with snap.

				_scrollers.forEach(function (o) {
					return (
						ScrollTrigger_isFunction(o) &&
						o.target ===
							(isViewport ? ScrollTrigger_doc.scrollingElement || ScrollTrigger_docEl : scroller) &&
						(o.smooth = false)
					);
				}); // note: set smooth to false on both the vertical and horizontal scroll getters/setters

				snapFunc = ScrollTrigger_isFunction(snap.snapTo)
					? snap.snapTo
					: snap.snapTo === "labels"
					? _getClosestLabel(animation)
					: snap.snapTo === "labelsDirectional"
					? _getLabelAtDirection(animation)
					: snap.directional !== false
					? function (value, st) {
							return _snapDirectional(snap.snapTo)(
								value,
								ScrollTrigger_getTime() - lastRefresh < 500 ? 0 : st.direction
							);
					  }
					: ScrollTrigger_gsap.utils.snap(snap.snapTo);
				snapDurClamp = snap.duration || {
					min: 0.1,
					max: 2,
				};
				snapDurClamp = ScrollTrigger_isObject(snapDurClamp)
					? ScrollTrigger_clamp(snapDurClamp.min, snapDurClamp.max)
					: ScrollTrigger_clamp(snapDurClamp, snapDurClamp);
				snapDelayedCall = ScrollTrigger_gsap.delayedCall(snap.delay || scrubSmooth / 2 || 0.1, function () {
					var scroll = scrollFunc(),
						refreshedRecently = ScrollTrigger_getTime() - lastRefresh < 500,
						tween = tweenTo.tween;

					if (
						(refreshedRecently || Math.abs(self.getVelocity()) < 10) &&
						!tween &&
						!_pointerIsDown &&
						lastSnap !== scroll
					) {
						var progress = (scroll - start) / change,
							totalProgress = animation && !isToggle ? animation.totalProgress() : progress,
							velocity = refreshedRecently
								? 0
								: ((totalProgress - snap2) / (ScrollTrigger_getTime() - _time2)) * 1000 || 0,
							change1 = ScrollTrigger_gsap.utils.clamp(
								-progress,
								1 - progress,
								(_abs(velocity / 2) * velocity) / 0.185
							),
							naturalEnd = progress + (snap.inertia === false ? 0 : change1),
							endValue = ScrollTrigger_clamp(0, 1, snapFunc(naturalEnd, self)),
							endScroll = Math.round(start + endValue * change),
							_snap = snap,
							onStart = _snap.onStart,
							_onInterrupt = _snap.onInterrupt,
							_onComplete = _snap.onComplete;

						if (scroll <= end && scroll >= start && endScroll !== scroll) {
							if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
								// there's an overlapping snap! So we must figure out which one is closer and let that tween live.
								return;
							}

							if (snap.inertia === false) {
								change1 = endValue - progress;
							}

							tweenTo(
								endScroll,
								{
									duration: snapDurClamp(
										_abs(
											(Math.max(
												_abs(naturalEnd - totalProgress),
												_abs(endValue - totalProgress)
											) *
												0.185) /
												velocity /
												0.05 || 0
										)
									),
									ease: snap.ease || "power3",
									data: _abs(endScroll - scroll),
									// record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
									onInterrupt: function onInterrupt() {
										return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
									},
									onComplete: function onComplete() {
										self.update();
										lastSnap = scrollFunc();
										snap1 = snap2 =
											animation && !isToggle ? animation.totalProgress() : self.progress;
										onSnapComplete && onSnapComplete(self);
										_onComplete && _onComplete(self);
									},
								},
								scroll,
								change1 * change,
								endScroll - scroll - change1 * change
							);
							onStart && onStart(self, tweenTo.tween);
						}
					} else if (self.isActive && lastSnap !== scroll) {
						snapDelayedCall.restart(true);
					}
				}).pause();
			}

			id && (_ids[id] = self);
			trigger = self.trigger = _getTarget(trigger || pin); // if a trigger has some kind of scroll-related effect applied that could contaminate the "y" or "x" position (like a ScrollSmoother effect), we needed a way to temporarily revert it, so we use the stRevert property of the gsCache. It can return another function that we'll call at the end so it can return to its normal state.

			customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
			customRevertReturn && (customRevertReturn = customRevertReturn(self));
			pin = pin === true ? trigger : _getTarget(pin);
			ScrollTrigger_isString(toggleClass) &&
				(toggleClass = {
					targets: trigger,
					className: toggleClass,
				});

			if (pin) {
				pinSpacing === false ||
					pinSpacing === _margin ||
					(pinSpacing =
						!pinSpacing &&
						pin.parentNode &&
						pin.parentNode.style &&
						_getComputedStyle(pin.parentNode).display === "flex"
							? false
							: _padding); // if the parent is display: flex, don't apply pinSpacing by default. We should check that pin.parentNode is an element (not shadow dom window)

				self.pin = pin;
				pinCache = ScrollTrigger_gsap.core.getCache(pin);

				if (!pinCache.spacer) {
					// record the spacer and pinOriginalState on the cache in case someone tries pinning the same element with MULTIPLE ScrollTriggers - we don't want to have multiple spacers or record the "original" pin state after it has already been affected by another ScrollTrigger.
					if (pinSpacer) {
						pinSpacer = _getTarget(pinSpacer);
						pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement); // for React & Angular

						pinCache.spacerIsNative = !!pinSpacer;
						pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
					}

					pinCache.spacer = spacer = pinSpacer || ScrollTrigger_doc.createElement("div");
					spacer.classList.add("pin-spacer");
					id && spacer.classList.add("pin-spacer-" + id);
					pinCache.pinState = pinOriginalState = _getState(pin);
				} else {
					pinOriginalState = pinCache.pinState;
				}

				vars.force3D !== false &&
					ScrollTrigger_gsap.set(pin, {
						force3D: true,
					});
				self.spacer = spacer = pinCache.spacer;
				cs = _getComputedStyle(pin);
				spacingStart = cs[pinSpacing + direction.os2];
				pinGetter = ScrollTrigger_gsap.getProperty(pin);
				pinSetter = ScrollTrigger_gsap.quickSetter(pin, direction.a, _px); // pin.firstChild && !_maxScroll(pin, direction) && (pin.style.overflow = "hidden"); // protects from collapsing margins, but can have unintended consequences as demonstrated here: https://codepen.io/GreenSock/pen/1e42c7a73bfa409d2cf1e184e7a4248d so it was removed in favor of just telling people to set up their CSS to avoid the collapsing margins (overflow: hidden | auto is just one option. Another is border-top: 1px solid transparent).

				_swapPinIn(pin, spacer, cs);

				pinState = _getState(pin);
			}

			if (markers) {
				markerVars = ScrollTrigger_isObject(markers)
					? ScrollTrigger_setDefaults(markers, _markerDefaults)
					: _markerDefaults;
				markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
				markerEndTrigger = _createMarker(
					"scroller-end",
					id,
					scroller,
					direction,
					markerVars,
					0,
					markerStartTrigger
				);
				offset = markerStartTrigger["offset" + direction.op.d2];

				var content = _getTarget(_getProxyProp(scroller, "content") || scroller);

				markerStart = this.markerStart = _createMarker(
					"start",
					id,
					content,
					direction,
					markerVars,
					offset,
					0,
					containerAnimation
				);
				markerEnd = this.markerEnd = _createMarker(
					"end",
					id,
					content,
					direction,
					markerVars,
					offset,
					0,
					containerAnimation
				);
				containerAnimation &&
					(caMarkerSetter = ScrollTrigger_gsap.quickSetter([markerStart, markerEnd], direction.a, _px));

				if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
					_makePositionable(isViewport ? ScrollTrigger_body : scroller);

					ScrollTrigger_gsap.set([markerStartTrigger, markerEndTrigger], {
						force3D: true,
					});
					markerStartSetter = ScrollTrigger_gsap.quickSetter(markerStartTrigger, direction.a, _px);
					markerEndSetter = ScrollTrigger_gsap.quickSetter(markerEndTrigger, direction.a, _px);
				}
			}

			if (containerAnimation) {
				var oldOnUpdate = containerAnimation.vars.onUpdate,
					oldParams = containerAnimation.vars.onUpdateParams;
				containerAnimation.eventCallback("onUpdate", function () {
					self.update(0, 0, 1);
					oldOnUpdate && oldOnUpdate.apply(containerAnimation, oldParams || []);
				});
			}

			self.previous = function () {
				return _triggers[_triggers.indexOf(self) - 1];
			};

			self.next = function () {
				return _triggers[_triggers.indexOf(self) + 1];
			};

			self.revert = function (revert, temp) {
				if (!temp) {
					return self.kill(true);
				} // for compatibility with gsap.context() and gsap.matchMedia() which call revert()

				var r = revert !== false || !self.enabled,
					prevRefreshing = _refreshing;

				if (r !== self.isReverted) {
					if (r) {
						// if (!self.scroll.rec && (_refreshing || _refreshingAll)) {
						// 	self.scroll.rec = scrollFunc();
						// 	_refreshingAll && scrollFunc(0);
						// }
						prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0); // record the scroll so we can revert later (repositioning/pinning things can affect scroll position). In the static refresh() method, we first record all the scroll positions as a reference.

						prevProgress = self.progress;
						prevAnimProgress = animation && animation.progress();
					}

					markerStart &&
						[markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
							return (m.style.display = r ? "none" : "block");
						});

					if (r) {
						_refreshing = self;
						self.update(r); // make sure the pin is back in its original position so that all the measurements are correct. do this BEFORE swapping the pin out
					}

					if (pin && (!pinReparent || !self.isActive)) {
						if (r) {
							_swapPinOut(pin, spacer, pinOriginalState);
						} else {
							_swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
						}
					}

					r || self.update(r); // when we're restoring, the update should run AFTER swapping the pin into its pin-spacer.

					_refreshing = prevRefreshing; // restore. We set it to true during the update() so that things fire properly in there.

					self.isReverted = r;
				}
			};

			self.refresh = function (soft, force) {
				if ((_refreshing || !self.enabled) && !force) {
					return;
				}

				if (pin && soft && _lastScrollTime) {
					ScrollTrigger_addListener(ScrollTrigger, "scrollEnd", _softRefresh);

					return;
				}

				!_refreshingAll && onRefreshInit && onRefreshInit(self);
				_refreshing = self;
				lastRefresh = ScrollTrigger_getTime();

				if (tweenTo.tween) {
					tweenTo.tween.kill();
					tweenTo.tween = 0;
				}

				scrubTween && scrubTween.pause();
				invalidateOnRefresh &&
					animation &&
					animation
						.revert({
							kill: false,
						})
						.invalidate();
				self.isReverted || self.revert(true, true);
				self._subPinOffset = false; // we'll set this to true in the sub-pins if we find any

				var size = getScrollerSize(),
					scrollerBounds = getScrollerOffsets(),
					max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction),
					isFirstRefresh = change <= 0.01,
					offset = 0,
					otherPinOffset = 0,
					parsedEnd = vars.end,
					parsedEndTrigger = vars.endTrigger || trigger,
					parsedStart = vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"),
					pinnedContainer = (self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer)),
					triggerIndex = (trigger && Math.max(0, _triggers.indexOf(self))) || 0,
					i = triggerIndex,
					cs,
					bounds,
					scroll,
					isVertical,
					override,
					curTrigger,
					curPin,
					oppositeScroll,
					initted,
					revertedPins,
					forcedOverflow;

				while (i--) {
					// user might try to pin the same element more than once, so we must find any prior triggers with the same pin, revert them, and determine how long they're pinning so that we can offset things appropriately. Make sure we revert from last to first so that things "rewind" properly.
					curTrigger = _triggers[i];
					curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self); // if it's a timeline-based trigger that hasn't been fully initialized yet because it's waiting for 1 tick, just force the refresh() here, otherwise if it contains a pin that's supposed to affect other ScrollTriggers further down the page, they won't be adjusted properly.

					curPin = curTrigger.pin;

					if (
						curPin &&
						(curPin === trigger || curPin === pin || curPin === pinnedContainer) &&
						!curTrigger.isReverted
					) {
						revertedPins || (revertedPins = []);
						revertedPins.unshift(curTrigger); // we'll revert from first to last to make sure things reach their end state properly

						curTrigger.revert(true, true);
					}

					if (curTrigger !== _triggers[i]) {
						// in case it got removed.
						triggerIndex--;
						i--;
					}
				}

				ScrollTrigger_isFunction(parsedStart) && (parsedStart = parsedStart(self));
				start =
					ScrollTrigger_parsePosition(
						parsedStart,
						trigger,
						size,
						direction,
						scrollFunc(),
						markerStart,
						markerStartTrigger,
						self,
						scrollerBounds,
						borderWidth,
						useFixedPosition,
						max,
						containerAnimation
					) || (pin ? -0.001 : 0);
				ScrollTrigger_isFunction(parsedEnd) && (parsedEnd = parsedEnd(self));

				if (ScrollTrigger_isString(parsedEnd) && !parsedEnd.indexOf("+=")) {
					if (~parsedEnd.indexOf(" ")) {
						parsedEnd = (ScrollTrigger_isString(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
					} else {
						offset = _offsetToPx(parsedEnd.substr(2), size);
						parsedEnd = ScrollTrigger_isString(parsedStart)
							? parsedStart
							: (containerAnimation
									? ScrollTrigger_gsap.utils.mapRange(
											0,
											containerAnimation.duration(),
											containerAnimation.scrollTrigger.start,
											containerAnimation.scrollTrigger.end,
											start
									  )
									: start) + offset; // _parsePosition won't factor in the offset if the start is a number, so do it here.

						parsedEndTrigger = trigger;
					}
				}

				end =
					Math.max(
						start,
						ScrollTrigger_parsePosition(
							parsedEnd || (parsedEndTrigger ? "100% 0" : max),
							parsedEndTrigger,
							size,
							direction,
							scrollFunc() + offset,
							markerEnd,
							markerEndTrigger,
							self,
							scrollerBounds,
							borderWidth,
							useFixedPosition,
							max,
							containerAnimation
						)
					) || -0.001;
				change = end - start || ((start -= 0.01) && 0.001);
				offset = 0;
				i = triggerIndex;

				while (i--) {
					curTrigger = _triggers[i];
					curPin = curTrigger.pin;

					if (
						curPin &&
						curTrigger.start - curTrigger._pinPush <= start &&
						!containerAnimation &&
						curTrigger.end > 0
					) {
						cs = curTrigger.end - curTrigger.start;

						if (
							((curPin === trigger && curTrigger.start - curTrigger._pinPush < start) ||
								curPin === pinnedContainer) &&
							!ScrollTrigger_isNumber(parsedStart)
						) {
							// numeric start values shouldn't be offset at all - treat them as absolute
							offset += cs * (1 - curTrigger.progress);
						}

						curPin === pin && (otherPinOffset += cs);
					}
				}

				start += offset;
				end += offset;

				if (isFirstRefresh) {
					// on the very first refresh(), the prevProgress couldn't have been accurate yet because the start/end were never calculated, so we set it here. Before 3.11.5, it could lead to an inaccurate scroll position restoration with snapping.
					prevProgress = ScrollTrigger_gsap.utils.clamp(
						0,
						1,
						ScrollTrigger_gsap.utils.normalize(start, end, prevScroll)
					);
				}

				self._pinPush = otherPinOffset;

				if (markerStart && offset) {
					// offset the markers if necessary
					cs = {};
					cs[direction.a] = "+=" + offset;
					pinnedContainer && (cs[direction.p] = "-=" + scrollFunc());
					ScrollTrigger_gsap.set([markerStart, markerEnd], cs);
				}

				if (pin) {
					cs = _getComputedStyle(pin);
					isVertical = direction === _vertical;
					scroll = scrollFunc(); // recalculate because the triggers can affect the scroll

					pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;

					if (!max && end > 1) {
						// makes sure the scroller has a scrollbar, otherwise if something has width: 100%, for example, it would be too big (exclude the scrollbar). See https://greensock.com/forums/topic/25182-scrolltrigger-width-of-page-increase-where-markers-are-set-to-false/
						forcedOverflow = (
							isViewport ? ScrollTrigger_doc.scrollingElement || ScrollTrigger_docEl : scroller
						).style;
						forcedOverflow = {
							style: forcedOverflow,
							value: forcedOverflow["overflow" + direction.a.toUpperCase()],
						};
						forcedOverflow.style["overflow" + direction.a.toUpperCase()] = "scroll";
					}

					_swapPinIn(pin, spacer, cs);

					pinState = _getState(pin); // transforms will interfere with the top/left/right/bottom placement, so remove them temporarily. getBoundingClientRect() factors in transforms.

					bounds = _getBounds(pin, true);
					oppositeScroll =
						useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();

					if (pinSpacing) {
						spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
						spacerState.t = spacer;
						i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
						i && spacerState.push(direction.d, i + _px); // for box-sizing: border-box (must include padding).

						_setState(spacerState);

						if (pinnedContainer) {
							// in ScrollTrigger.refresh(), we need to re-evaluate the pinContainer's size because this pinSpacing may stretch it out, but we can't just add the exact distance because depending on layout, it may not push things down or it may only do so partially.
							_triggers.forEach(function (t) {
								if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) {
									t._subPinOffset = true;
								}
							});
						}

						useFixedPosition && scrollFunc(prevScroll);
					}

					if (useFixedPosition) {
						override = {
							top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
							left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
							boxSizing: "border-box",
							position: "fixed",
						};
						override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
						override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
						override[_margin] =
							override[_margin + _Top] =
							override[_margin + _Right] =
							override[_margin + _Bottom] =
							override[_margin + _Left] =
								"0";
						override[_padding] = cs[_padding];
						override[_padding + _Top] = cs[_padding + _Top];
						override[_padding + _Right] = cs[_padding + _Right];
						override[_padding + _Bottom] = cs[_padding + _Bottom];
						override[_padding + _Left] = cs[_padding + _Left];
						pinActiveState = _copyState(pinOriginalState, override, pinReparent);
						_refreshingAll && scrollFunc(0);
					}

					if (animation) {
						// the animation might be affecting the transform, so we must jump to the end, check the value, and compensate accordingly. Otherwise, when it becomes unpinned, the pinSetter() will get set to a value that doesn't include whatever the animation did.
						initted = animation._initted; // if not, we must invalidate() after this step, otherwise it could lock in starting values prematurely.

						ScrollTrigger_suppressOverwrites(1);

						animation.render(animation.duration(), true, true);
						pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
						pinMoves = Math.abs(change - pinChange) > 1;
						useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2); // transform is the last property/value set in the state Array. Since the animation is controlling that, we should omit it.

						animation.render(0, true, true);
						initted || animation.invalidate(true);
						animation.parent || animation.totalTime(animation.totalTime()); // if, for example, a toggleAction called play() and then refresh() happens and when we render(1) above, it would cause the animation to complete and get removed from its parent, so this makes sure it gets put back in.

						ScrollTrigger_suppressOverwrites(0);
					} else {
						pinChange = change;
					}

					forcedOverflow &&
						(forcedOverflow.value
							? (forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value)
							: forcedOverflow.style.removeProperty("overflow-" + direction.a));
				} else if (trigger && scrollFunc() && !containerAnimation) {
					// it may be INSIDE a pinned element, so walk up the tree and look for any elements with _pinOffset to compensate because anything with pinSpacing that's already scrolled would throw off the measurements in getBoundingClientRect()
					bounds = trigger.parentNode;

					while (bounds && bounds !== ScrollTrigger_body) {
						if (bounds._pinOffset) {
							start -= bounds._pinOffset;
							end -= bounds._pinOffset;
						}

						bounds = bounds.parentNode;
					}
				}

				revertedPins &&
					revertedPins.forEach(function (t) {
						return t.revert(false, true);
					});
				self.start = start;
				self.end = end;
				scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc(); // reset velocity

				if (!containerAnimation && !_refreshingAll) {
					scroll1 < prevScroll && scrollFunc(prevScroll);
					self.scroll.rec = 0;
				}

				self.revert(false, true);

				if (snapDelayedCall) {
					lastSnap = -1;
					self.isActive && scrollFunc(start + change * prevProgress); // just so snapping gets re-enabled, clear out any recorded last value

					snapDelayedCall.restart(true);
				}

				_refreshing = 0;
				animation &&
					isToggle &&
					(animation._initted || prevAnimProgress) &&
					animation.progress() !== prevAnimProgress &&
					animation.progress(prevAnimProgress, true).render(animation.time(), true, true); // must force a re-render because if saveStyles() was used on the target(s), the styles could have been wiped out during the refresh().

				if (isFirstRefresh || prevProgress !== self.progress || containerAnimation) {
					// ensures that the direction is set properly (when refreshing, progress is set back to 0 initially, then back again to wherever it needs to be) and that callbacks are triggered.
					animation &&
						!isToggle &&
						animation.totalProgress(
							containerAnimation && start < -0.001 && !prevProgress
								? ScrollTrigger_gsap.utils.normalize(start, end, 0)
								: prevProgress,
							true
						); // to avoid issues where animation callbacks like onStart aren't triggered.

					self.progress = (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
				}

				pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
				scrubTween && scrubTween.invalidate();
				onRefresh && !_refreshingAll && onRefresh(self); // when refreshing all, we do extra work to correct pinnedContainer sizes and ensure things don't exceed the maxScroll, so we should do all the refreshes at the end after all that work so that the start/end values are corrected.
			};

			self.getVelocity = function () {
				return ((scrollFunc() - scroll2) / (ScrollTrigger_getTime() - _time2)) * 1000 || 0;
			};

			self.endAnimation = function () {
				_endAnimation(self.callbackAnimation);

				if (animation) {
					scrubTween
						? scrubTween.progress(1)
						: !animation.paused()
						? _endAnimation(animation, animation.reversed())
						: isToggle || _endAnimation(animation, self.direction < 0, 1);
				}
			};

			self.labelToScroll = function (label) {
				return (
					(animation &&
						animation.labels &&
						(start || self.refresh() || start) +
							(animation.labels[label] / animation.duration()) * change) ||
					0
				);
			};

			self.getTrailing = function (name) {
				var i = _triggers.indexOf(self),
					a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);

				return (
					ScrollTrigger_isString(name)
						? a.filter(function (t) {
								return t.vars.preventOverlaps === name;
						  })
						: a
				).filter(function (t) {
					return self.direction > 0 ? t.end <= start : t.start >= end;
				});
			};

			self.update = function (reset, recordVelocity, forceFake) {
				if (containerAnimation && !forceFake && !reset) {
					return;
				}

				var scroll = _refreshingAll === true ? prevScroll : self.scroll(),
					p = reset ? 0 : (scroll - start) / change,
					clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0,
					prevProgress = self.progress,
					isActive,
					wasActive,
					toggleState,
					action,
					stateChanged,
					toggled,
					isAtMax,
					isTakingAction;

				if (recordVelocity) {
					scroll2 = scroll1;
					scroll1 = containerAnimation ? scrollFunc() : scroll;

					if (snap) {
						snap2 = snap1;
						snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
					}
				} // anticipate the pinning a few ticks ahead of time based on velocity to avoid a visual glitch due to the fact that most browsers do scrolling on a separate thread (not synced with requestAnimationFrame).

				anticipatePin &&
					!clipped &&
					pin &&
					!_refreshing &&
					!ScrollTrigger_startup &&
					_lastScrollTime &&
					start < scroll + ((scroll - scroll2) / (ScrollTrigger_getTime() - _time2)) * anticipatePin &&
					(clipped = 0.0001);

				if (clipped !== prevProgress && self.enabled) {
					isActive = self.isActive = !!clipped && clipped < 1;
					wasActive = !!prevProgress && prevProgress < 1;
					toggled = isActive !== wasActive;
					stateChanged = toggled || !!clipped !== !!prevProgress; // could go from start all the way to end, thus it didn't toggle but it did change state in a sense (may need to fire a callback)

					self.direction = clipped > prevProgress ? 1 : -1;
					self.progress = clipped;

					if (stateChanged && !_refreshing) {
						toggleState = clipped && !prevProgress ? 0 : clipped === 1 ? 1 : prevProgress === 1 ? 2 : 3; // 0 = enter, 1 = leave, 2 = enterBack, 3 = leaveBack (we prioritize the FIRST encounter, thus if you scroll really fast past the onEnter and onLeave in one tick, it'd prioritize onEnter.

						if (isToggle) {
							action =
								(!toggled &&
									toggleActions[toggleState + 1] !== "none" &&
									toggleActions[toggleState + 1]) ||
								toggleActions[toggleState]; // if it didn't toggle, that means it shot right past and since we prioritize the "enter" action, we should switch to the "leave" in this case (but only if one is defined)

							isTakingAction =
								animation && (action === "complete" || action === "reset" || action in animation);
						}
					}

					preventOverlaps &&
						(toggled || isTakingAction) &&
						(isTakingAction || scrub || !animation) &&
						(ScrollTrigger_isFunction(preventOverlaps)
							? preventOverlaps(self)
							: self.getTrailing(preventOverlaps).forEach(function (t) {
									return t.endAnimation();
							  }));

					if (!isToggle) {
						if (scrubTween && !_refreshing && !ScrollTrigger_startup) {
							scrubTween._dp._time - scrubTween._start !== scrubTween._time &&
								scrubTween.render(scrubTween._dp._time - scrubTween._start); // if there's a scrub on both the container animation and this one (or a ScrollSmoother), the update order would cause this one not to have rendered yet, so it wouldn't make any progress before we .restart() it heading toward the new progress so it'd appear stuck thus we force a render here.

							if (scrubTween.resetTo) {
								scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
							} else {
								// legacy support (courtesy), before 3.10.0
								scrubTween.vars.totalProgress = clipped;
								scrubTween.invalidate().restart();
							}
						} else if (animation) {
							animation.totalProgress(clipped, !!_refreshing);
						}
					}

					if (pin) {
						reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);

						if (!useFixedPosition) {
							pinSetter(ScrollTrigger_round(pinStart + pinChange * clipped));
						} else if (stateChanged) {
							isAtMax =
								!reset &&
								clipped > prevProgress &&
								end + 1 > scroll &&
								scroll + 1 >= _maxScroll(scroller, direction); // if it's at the VERY end of the page, don't switch away from position: fixed because it's pointless and it could cause a brief flash when the user scrolls back up (when it gets pinned again)

							if (pinReparent) {
								if (!reset && (isActive || isAtMax)) {
									var bounds = _getBounds(pin, true),
										_offset = scroll - start;

									_reparent(
										pin,
										ScrollTrigger_body,
										bounds.top + (direction === _vertical ? _offset : 0) + _px,
										bounds.left + (direction === _vertical ? 0 : _offset) + _px
									);
								} else {
									_reparent(pin, spacer);
								}
							}

							_setState(isActive || isAtMax ? pinActiveState : pinState);

							(pinMoves && clipped < 1 && isActive) ||
								pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
						}
					}

					snap && !tweenTo.tween && !_refreshing && !ScrollTrigger_startup && snapDelayedCall.restart(true);
					toggleClass &&
						(toggled || (once && clipped && (clipped < 1 || !_limitCallbacks))) &&
						_toArray(toggleClass.targets).forEach(function (el) {
							return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
						}); // classes could affect positioning, so do it even if reset or refreshing is true.

					onUpdate && !isToggle && !reset && onUpdate(self);

					if (stateChanged && !_refreshing) {
						if (isToggle) {
							if (isTakingAction) {
								if (action === "complete") {
									animation.pause().totalProgress(1);
								} else if (action === "reset") {
									animation.restart(true).pause();
								} else if (action === "restart") {
									animation.restart(true);
								} else {
									animation[action]();
								}
							}

							onUpdate && onUpdate(self);
						}

						if (toggled || !_limitCallbacks) {
							// on startup, the page could be scrolled and we don't want to fire callbacks that didn't toggle. For example onEnter shouldn't fire if the ScrollTrigger isn't actually entered.
							onToggle && toggled && ScrollTrigger_callback(self, onToggle);
							callbacks[toggleState] && ScrollTrigger_callback(self, callbacks[toggleState]);
							once && (clipped === 1 ? self.kill(false, 1) : (callbacks[toggleState] = 0)); // a callback shouldn't be called again if once is true.

							if (!toggled) {
								// it's possible to go completely past, like from before the start to after the end (or vice-versa) in which case BOTH callbacks should be fired in that order
								toggleState = clipped === 1 ? 1 : 3;
								callbacks[toggleState] && ScrollTrigger_callback(self, callbacks[toggleState]);
							}
						}

						if (
							fastScrollEnd &&
							!isActive &&
							Math.abs(self.getVelocity()) >
								(ScrollTrigger_isNumber(fastScrollEnd) ? fastScrollEnd : 2500)
						) {
							_endAnimation(self.callbackAnimation);

							scrubTween
								? scrubTween.progress(1)
								: _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
						}
					} else if (isToggle && onUpdate && !_refreshing) {
						onUpdate(self);
					}
				} // update absolutely-positioned markers (only if the scroller isn't the viewport)

				if (markerEndSetter) {
					var n = containerAnimation
						? (scroll / containerAnimation.duration()) * (containerAnimation._caScrollDist || 0)
						: scroll;
					markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
					markerEndSetter(n);
				}

				caMarkerSetter &&
					caMarkerSetter((-scroll / containerAnimation.duration()) * (containerAnimation._caScrollDist || 0));
			};

			self.enable = function (reset, refresh) {
				if (!self.enabled) {
					self.enabled = true;

					ScrollTrigger_addListener(scroller, "resize", _onResize);

					ScrollTrigger_addListener(
						isViewport ? ScrollTrigger_doc : scroller,
						"scroll",
						ScrollTrigger_onScroll
					);

					onRefreshInit && ScrollTrigger_addListener(ScrollTrigger, "refreshInit", onRefreshInit);

					if (reset !== false) {
						self.progress = prevProgress = 0;
						scroll1 = scroll2 = lastSnap = scrollFunc();
					}

					refresh !== false && self.refresh();
				}
			};

			self.getTween = function (snap) {
				return snap && tweenTo ? tweenTo.tween : scrubTween;
			};

			self.setPositions = function (newStart, newEnd) {
				// doesn't persist after refresh()! Intended to be a way to override values that were set during refresh(), like you could set it in onRefresh()
				if (pin) {
					pinStart += newStart - start;
					pinChange += newEnd - newStart - change;
					pinSpacing === _padding && self.adjustPinSpacing(newEnd - newStart - change);
				}

				self.start = start = newStart;
				self.end = end = newEnd;
				change = newEnd - newStart;
				self.update();
			};

			self.adjustPinSpacing = function (amount) {
				if (spacerState && amount) {
					var i = spacerState.indexOf(direction.d) + 1;
					spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
					spacerState[1] = parseFloat(spacerState[1]) + amount + _px;

					_setState(spacerState);
				}
			};

			self.disable = function (reset, allowAnimation) {
				if (self.enabled) {
					reset !== false && self.revert(true, true);
					self.enabled = self.isActive = false;
					allowAnimation || (scrubTween && scrubTween.pause());
					prevScroll = 0;
					pinCache && (pinCache.uncache = 1);
					onRefreshInit && ScrollTrigger_removeListener(ScrollTrigger, "refreshInit", onRefreshInit);

					if (snapDelayedCall) {
						snapDelayedCall.pause();
						tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
					}

					if (!isViewport) {
						var i = _triggers.length;

						while (i--) {
							if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
								return; //don't remove the listeners if there are still other triggers referencing it.
							}
						}

						ScrollTrigger_removeListener(scroller, "resize", _onResize);

						ScrollTrigger_removeListener(scroller, "scroll", ScrollTrigger_onScroll);
					}
				}
			};

			self.kill = function (revert, allowAnimation) {
				self.disable(revert, allowAnimation);
				scrubTween && !allowAnimation && scrubTween.kill();
				id && delete _ids[id];

				var i = _triggers.indexOf(self);

				i >= 0 && _triggers.splice(i, 1);
				i === _i && _direction > 0 && _i--; // if we're in the middle of a refresh() or update(), splicing would cause skips in the index, so adjust...
				// if no other ScrollTrigger instances of the same scroller are found, wipe out any recorded scroll position. Otherwise, in a single page application, for example, it could maintain scroll position when it really shouldn't.

				i = 0;

				_triggers.forEach(function (t) {
					return t.scroller === self.scroller && (i = 1);
				});

				i || _refreshingAll || (self.scroll.rec = 0);

				if (animation) {
					animation.scrollTrigger = null;
					revert &&
						animation.revert({
							kill: false,
						});
					allowAnimation || animation.kill();
				}

				markerStart &&
					[markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
						return m.parentNode && m.parentNode.removeChild(m);
					});
				_primary === self && (_primary = 0);

				if (pin) {
					pinCache && (pinCache.uncache = 1);
					i = 0;

					_triggers.forEach(function (t) {
						return t.pin === pin && i++;
					});

					i || (pinCache.spacer = 0); // if there aren't any more ScrollTriggers with the same pin, remove the spacer, otherwise it could be contaminated with old/stale values if the user re-creates a ScrollTrigger for the same element.
				}

				vars.onKill && vars.onKill(self);
			};

			self.enable(false, false);
			customRevertReturn && customRevertReturn(self);
			!animation || !animation.add || change
				? self.refresh()
				: ScrollTrigger_gsap.delayedCall(0.01, function () {
						return start || end || self.refresh();
				  }) &&
				  (change = 0.01) &&
				  (start = end = 0); // if the animation is a timeline, it may not have been populated yet, so it wouldn't render at the proper place on the first refresh(), thus we should schedule one for the next tick. If "change" is defined, we know it must be re-enabling, thus we can refresh() right away.

			pin && _queueRefreshAll(); // pinning could affect the positions of other things, so make sure we queue a full refresh()
		};

		ScrollTrigger.register = function register(core) {
			if (!ScrollTrigger_coreInitted) {
				ScrollTrigger_gsap = core || ScrollTrigger_getGSAP();
				ScrollTrigger_windowExists() && window.document && ScrollTrigger.enable();
				ScrollTrigger_coreInitted = _enabled;
			}

			return ScrollTrigger_coreInitted;
		};

		ScrollTrigger.defaults = function defaults(config) {
			if (config) {
				for (var p in config) {
					ScrollTrigger_defaults[p] = config[p];
				}
			}

			return ScrollTrigger_defaults;
		};

		ScrollTrigger.disable = function disable(reset, kill) {
			_enabled = 0;

			_triggers.forEach(function (trigger) {
				return trigger[kill ? "kill" : "disable"](reset);
			});

			ScrollTrigger_removeListener(ScrollTrigger_win, "wheel", ScrollTrigger_onScroll);

			ScrollTrigger_removeListener(ScrollTrigger_doc, "scroll", ScrollTrigger_onScroll);

			clearInterval(_syncInterval);

			ScrollTrigger_removeListener(ScrollTrigger_doc, "touchcancel", ScrollTrigger_passThrough);

			ScrollTrigger_removeListener(ScrollTrigger_body, "touchstart", ScrollTrigger_passThrough);

			_multiListener(
				ScrollTrigger_removeListener,
				ScrollTrigger_doc,
				"pointerdown,touchstart,mousedown",
				_pointerDownHandler
			);

			_multiListener(
				ScrollTrigger_removeListener,
				ScrollTrigger_doc,
				"pointerup,touchend,mouseup",
				_pointerUpHandler
			);

			_resizeDelay.kill();

			_iterateAutoRefresh(ScrollTrigger_removeListener);

			for (var i = 0; i < _scrollers.length; i += 3) {
				_wheelListener(ScrollTrigger_removeListener, _scrollers[i], _scrollers[i + 1]);

				_wheelListener(ScrollTrigger_removeListener, _scrollers[i], _scrollers[i + 2]);
			}
		};

		ScrollTrigger.enable = function enable() {
			ScrollTrigger_win = window;
			ScrollTrigger_doc = document;
			ScrollTrigger_docEl = ScrollTrigger_doc.documentElement;
			ScrollTrigger_body = ScrollTrigger_doc.body;

			if (ScrollTrigger_gsap) {
				_toArray = ScrollTrigger_gsap.utils.toArray;
				ScrollTrigger_clamp = ScrollTrigger_gsap.utils.clamp;
				ScrollTrigger_context = ScrollTrigger_gsap.core.context || ScrollTrigger_passThrough;
				ScrollTrigger_suppressOverwrites =
					ScrollTrigger_gsap.core.suppressOverwrites || ScrollTrigger_passThrough;
				_scrollRestoration = ScrollTrigger_win.history.scrollRestoration || "auto";
				_lastScroll = ScrollTrigger_win.pageYOffset;
				ScrollTrigger_gsap.core.globals("ScrollTrigger", ScrollTrigger); // must register the global manually because in Internet Explorer, functions (classes) don't have a "name" property.

				if (ScrollTrigger_body) {
					_enabled = 1;

					_rafBugFix();

					Observer_Observer.register(ScrollTrigger_gsap); // isTouch is 0 if no touch, 1 if ONLY touch, and 2 if it can accommodate touch but also other types like mouse/pointer.

					ScrollTrigger.isTouch = Observer_Observer.isTouch;
					_fixIOSBug = Observer_Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent); // since 2017, iOS has had a bug that causes event.clientX/Y to be inaccurate when a scroll occurs, thus we must alternate ignoring every other touchmove event to work around it. See https://bugs.webkit.org/show_bug.cgi?id=181954 and https://codepen.io/GreenSock/pen/ExbrPNa/087cef197dc35445a0951e8935c41503

					ScrollTrigger_addListener(ScrollTrigger_win, "wheel", ScrollTrigger_onScroll); // mostly for 3rd party smooth scrolling libraries.

					ScrollTrigger_root = [
						ScrollTrigger_win,
						ScrollTrigger_doc,
						ScrollTrigger_docEl,
						ScrollTrigger_body,
					];

					if (ScrollTrigger_gsap.matchMedia) {
						ScrollTrigger.matchMedia = function (vars) {
							var mm = ScrollTrigger_gsap.matchMedia(),
								p;

							for (p in vars) {
								mm.add(p, vars[p]);
							}

							return mm;
						};

						ScrollTrigger_gsap.addEventListener("matchMediaInit", function () {
							return _revertAll();
						});
						ScrollTrigger_gsap.addEventListener("matchMediaRevert", function () {
							return _revertRecorded();
						});
						ScrollTrigger_gsap.addEventListener("matchMedia", function () {
							_refreshAll(0, 1);

							ScrollTrigger_dispatch("matchMedia");
						});
						ScrollTrigger_gsap.matchMedia("(orientation: portrait)", function () {
							// when orientation changes, we should take new base measurements for the ignoreMobileResize feature.
							_setBaseDimensions();

							return _setBaseDimensions;
						});
					} else {
						console.warn("Requires GSAP 3.11.0 or later");
					}

					_setBaseDimensions();

					ScrollTrigger_addListener(ScrollTrigger_doc, "scroll", ScrollTrigger_onScroll); // some browsers (like Chrome), the window stops dispatching scroll events on the window if you scroll really fast, but it's consistent on the document!

					var bodyStyle = ScrollTrigger_body.style,
						border = bodyStyle.borderTopStyle,
						AnimationProto = ScrollTrigger_gsap.core.Animation.prototype,
						bounds,
						i;
					AnimationProto.revert ||
						Object.defineProperty(AnimationProto, "revert", {
							value: function value() {
								return this.time(-0.01, true);
							},
						}); // only for backwards compatibility (Animation.revert() was added after 3.10.4)

					bodyStyle.borderTopStyle = "solid"; // works around an issue where a margin of a child element could throw off the bounds of the _body, making it seem like there's a margin when there actually isn't. The border ensures that the bounds are accurate.

					bounds = _getBounds(ScrollTrigger_body);
					_vertical.m = Math.round(bounds.top + _vertical.sc()) || 0; // accommodate the offset of the <body> caused by margins and/or padding

					_horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
					border ? (bodyStyle.borderTopStyle = border) : bodyStyle.removeProperty("border-top-style"); // TODO: (?) maybe move to leveraging the velocity mechanism in Observer and skip intervals.

					_syncInterval = setInterval(_sync, 250);
					ScrollTrigger_gsap.delayedCall(0.5, function () {
						return (ScrollTrigger_startup = 0);
					});

					ScrollTrigger_addListener(ScrollTrigger_doc, "touchcancel", ScrollTrigger_passThrough); // some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document.

					ScrollTrigger_addListener(ScrollTrigger_body, "touchstart", ScrollTrigger_passThrough); //works around Safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/

					_multiListener(
						ScrollTrigger_addListener,
						ScrollTrigger_doc,
						"pointerdown,touchstart,mousedown",
						_pointerDownHandler
					);

					_multiListener(
						ScrollTrigger_addListener,
						ScrollTrigger_doc,
						"pointerup,touchend,mouseup",
						_pointerUpHandler
					);

					ScrollTrigger_transformProp = ScrollTrigger_gsap.utils.checkPrefix("transform");

					_stateProps.push(ScrollTrigger_transformProp);

					ScrollTrigger_coreInitted = ScrollTrigger_getTime();
					_resizeDelay = ScrollTrigger_gsap.delayedCall(0.2, _refreshAll).pause();
					_autoRefresh = [
						ScrollTrigger_doc,
						"visibilitychange",
						function () {
							var w = ScrollTrigger_win.innerWidth,
								h = ScrollTrigger_win.innerHeight;

							if (ScrollTrigger_doc.hidden) {
								_prevWidth = w;
								_prevHeight = h;
							} else if (_prevWidth !== w || _prevHeight !== h) {
								_onResize();
							}
						},
						ScrollTrigger_doc,
						"DOMContentLoaded",
						_refreshAll,
						ScrollTrigger_win,
						"load",
						_refreshAll,
						ScrollTrigger_win,
						"resize",
						_onResize,
					];

					_iterateAutoRefresh(ScrollTrigger_addListener);

					_triggers.forEach(function (trigger) {
						return trigger.enable(0, 1);
					});

					for (i = 0; i < _scrollers.length; i += 3) {
						_wheelListener(ScrollTrigger_removeListener, _scrollers[i], _scrollers[i + 1]);

						_wheelListener(ScrollTrigger_removeListener, _scrollers[i], _scrollers[i + 2]);
					}
				}
			}
		};

		ScrollTrigger.config = function config(vars) {
			"limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
			var ms = vars.syncInterval;
			(ms && clearInterval(_syncInterval)) || ((_syncInterval = ms) && setInterval(_sync, ms));
			"ignoreMobileResize" in vars &&
				(_ignoreMobileResize = ScrollTrigger.isTouch === 1 && vars.ignoreMobileResize);

			if ("autoRefreshEvents" in vars) {
				_iterateAutoRefresh(ScrollTrigger_removeListener) ||
					_iterateAutoRefresh(ScrollTrigger_addListener, vars.autoRefreshEvents || "none");
				_ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
			}
		};

		ScrollTrigger.scrollerProxy = function scrollerProxy(target, vars) {
			var t = _getTarget(target),
				i = _scrollers.indexOf(t),
				isViewport = ScrollTrigger_isViewport(t);

			if (~i) {
				_scrollers.splice(i, isViewport ? 6 : 2);
			}

			if (vars) {
				isViewport
					? _proxies.unshift(ScrollTrigger_win, vars, ScrollTrigger_body, vars, ScrollTrigger_docEl, vars)
					: _proxies.unshift(t, vars);
			}
		};

		ScrollTrigger.clearMatchMedia = function clearMatchMedia(query) {
			_triggers.forEach(function (t) {
				return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
			});
		};

		ScrollTrigger.isInViewport = function isInViewport(element, ratio, horizontal) {
			var bounds = (ScrollTrigger_isString(element) ? _getTarget(element) : element).getBoundingClientRect(),
				offset = bounds[horizontal ? _width : _height] * ratio || 0;
			return horizontal
				? bounds.right - offset > 0 && bounds.left + offset < ScrollTrigger_win.innerWidth
				: bounds.bottom - offset > 0 && bounds.top + offset < ScrollTrigger_win.innerHeight;
		};

		ScrollTrigger.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
			ScrollTrigger_isString(element) && (element = _getTarget(element));
			var bounds = element.getBoundingClientRect(),
				size = bounds[horizontal ? _width : _height],
				offset =
					referencePoint == null
						? size / 2
						: referencePoint in _keywords
						? _keywords[referencePoint] * size
						: ~referencePoint.indexOf("%")
						? (parseFloat(referencePoint) * size) / 100
						: parseFloat(referencePoint) || 0;
			return horizontal
				? (bounds.left + offset) / ScrollTrigger_win.innerWidth
				: (bounds.top + offset) / ScrollTrigger_win.innerHeight;
		};

		ScrollTrigger.killAll = function killAll(allowListeners) {
			_triggers.slice(0).forEach(function (t) {
				return t.vars.id !== "ScrollSmoother" && t.kill();
			});

			if (allowListeners !== true) {
				var listeners = ScrollTrigger_listeners.killAll || [];
				ScrollTrigger_listeners = {};
				listeners.forEach(function (f) {
					return f();
				});
			}
		};

		return ScrollTrigger;
	})();
	ScrollTrigger_ScrollTrigger.version = "3.11.5";

	ScrollTrigger_ScrollTrigger.saveStyles = function (targets) {
		return targets
			? _toArray(targets).forEach(function (target) {
					// saved styles are recorded in a consecutive alternating Array, like [element, cssText, transform attribute, cache, matchMedia, ...]
					if (target && target.style) {
						var i = _savedStyles.indexOf(target);

						i >= 0 && _savedStyles.splice(i, 5);

						_savedStyles.push(
							target,
							target.style.cssText,
							target.getBBox && target.getAttribute("transform"),
							ScrollTrigger_gsap.core.getCache(target),
							ScrollTrigger_context()
						);
					}
			  })
			: _savedStyles;
	};

	ScrollTrigger_ScrollTrigger.revert = function (soft, media) {
		return _revertAll(!soft, media);
	};

	ScrollTrigger_ScrollTrigger.create = function (vars, animation) {
		return new ScrollTrigger_ScrollTrigger(vars, animation);
	};

	ScrollTrigger_ScrollTrigger.refresh = function (safe) {
		return safe
			? _onResize()
			: (ScrollTrigger_coreInitted || ScrollTrigger_ScrollTrigger.register()) && _refreshAll(true);
	};

	ScrollTrigger_ScrollTrigger.update = function (force) {
		return ++_scrollers.cache && _updateAll(force === true ? 2 : 0);
	};

	ScrollTrigger_ScrollTrigger.clearScrollMemory = _clearScrollMemory;

	ScrollTrigger_ScrollTrigger.maxScroll = function (element, horizontal) {
		return _maxScroll(element, horizontal ? _horizontal : _vertical);
	};

	ScrollTrigger_ScrollTrigger.getScrollFunc = function (element, horizontal) {
		return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
	};

	ScrollTrigger_ScrollTrigger.getById = function (id) {
		return _ids[id];
	};

	ScrollTrigger_ScrollTrigger.getAll = function () {
		return _triggers.filter(function (t) {
			return t.vars.id !== "ScrollSmoother";
		});
	}; // it's common for people to ScrollTrigger.getAll(t => t.kill()) on page routes, for example, and we don't want it to ruin smooth scrolling by killing the main ScrollSmoother one.

	ScrollTrigger_ScrollTrigger.isScrolling = function () {
		return !!_lastScrollTime;
	};

	ScrollTrigger_ScrollTrigger.snapDirectional = _snapDirectional;

	ScrollTrigger_ScrollTrigger.addEventListener = function (type, callback) {
		var a = ScrollTrigger_listeners[type] || (ScrollTrigger_listeners[type] = []);
		~a.indexOf(callback) || a.push(callback);
	};

	ScrollTrigger_ScrollTrigger.removeEventListener = function (type, callback) {
		var a = ScrollTrigger_listeners[type],
			i = a && a.indexOf(callback);
		i >= 0 && a.splice(i, 1);
	};

	ScrollTrigger_ScrollTrigger.batch = function (targets, vars) {
		var result = [],
			varsCopy = {},
			interval = vars.interval || 0.016,
			batchMax = vars.batchMax || 1e9,
			proxyCallback = function proxyCallback(type, callback) {
				var elements = [],
					triggers = [],
					delay = ScrollTrigger_gsap.delayedCall(interval, function () {
						callback(elements, triggers);
						elements = [];
						triggers = [];
					}).pause();
				return function (self) {
					elements.length || delay.restart(true);
					elements.push(self.trigger);
					triggers.push(self);
					batchMax <= elements.length && delay.progress(1);
				};
			},
			p;

		for (p in vars) {
			varsCopy[p] =
				p.substr(0, 2) === "on" && ScrollTrigger_isFunction(vars[p]) && p !== "onRefreshInit"
					? proxyCallback(p, vars[p])
					: vars[p];
		}

		if (ScrollTrigger_isFunction(batchMax)) {
			batchMax = batchMax();

			ScrollTrigger_addListener(ScrollTrigger_ScrollTrigger, "refresh", function () {
				return (batchMax = vars.batchMax());
			});
		}

		_toArray(targets).forEach(function (target) {
			var config = {};

			for (p in varsCopy) {
				config[p] = varsCopy[p];
			}

			config.trigger = target;
			result.push(ScrollTrigger_ScrollTrigger.create(config));
		});

		return result;
	}; // to reduce file size. clamps the scroll and also returns a duration multiplier so that if the scroll gets chopped shorter, the duration gets curtailed as well (otherwise if you're very close to the top of the page, for example, and swipe up really fast, it'll suddenly slow down and take a long time to reach the top).

	var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier(
			scrollFunc,
			current,
			end,
			max
		) {
			current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
			return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
		},
		_allowNativePanning = function _allowNativePanning(target, direction) {
			if (direction === true) {
				target.style.removeProperty("touch-action");
			} else {
				target.style.touchAction =
					direction === true
						? "auto"
						: direction
						? "pan-" + direction + (Observer_Observer.isTouch ? " pinch-zoom" : "")
						: "none"; // note: Firefox doesn't support it pinch-zoom properly, at least in addition to a pan-x or pan-y.
			}

			target === ScrollTrigger_docEl && _allowNativePanning(ScrollTrigger_body, direction);
		},
		_overflow = {
			auto: 1,
			scroll: 1,
		},
		_nestedScroll = function _nestedScroll(_ref5) {
			var event = _ref5.event,
				target = _ref5.target,
				axis = _ref5.axis;

			var node = (event.changedTouches ? event.changedTouches[0] : event).target,
				cache = node._gsap || ScrollTrigger_gsap.core.getCache(node),
				time = ScrollTrigger_getTime(),
				cs;

			if (!cache._isScrollT || time - cache._isScrollT > 2000) {
				// cache for 2 seconds to improve performance.
				while (
					node &&
					node !== ScrollTrigger_body &&
					((node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth) ||
						!(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))
				) {
					node = node.parentNode;
				}

				cache._isScroll =
					node &&
					node !== target &&
					!ScrollTrigger_isViewport(node) &&
					(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
				cache._isScrollT = time;
			}

			if (cache._isScroll || axis === "x") {
				event.stopPropagation();
				event._gsapAllow = true;
			}
		},
		// capture events on scrollable elements INSIDE the <body> and allow those by calling stopPropagation() when we find a scrollable ancestor
		_inputObserver = function _inputObserver(target, type, inputs, nested) {
			return Observer_Observer.create({
				target: target,
				capture: true,
				debounce: false,
				lockAxis: true,
				type: type,
				onWheel: (nested = nested && _nestedScroll),
				onPress: nested,
				onDrag: nested,
				onScroll: nested,
				onEnable: function onEnable() {
					return (
						inputs &&
						ScrollTrigger_addListener(
							ScrollTrigger_doc,
							Observer_Observer.eventTypes[0],
							_captureInputs,
							false,
							true
						)
					);
				},
				onDisable: function onDisable() {
					return ScrollTrigger_removeListener(
						ScrollTrigger_doc,
						Observer_Observer.eventTypes[0],
						_captureInputs,
						true
					);
				},
			});
		},
		_inputExp = /(input|label|select|textarea)/i,
		_inputIsFocused,
		_captureInputs = function _captureInputs(e) {
			var isInput = _inputExp.test(e.target.tagName);

			if (isInput || _inputIsFocused) {
				e._gsapAllow = true;
				_inputIsFocused = isInput;
			}
		},
		_getScrollNormalizer = function _getScrollNormalizer(vars) {
			ScrollTrigger_isObject(vars) || (vars = {});
			vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
			vars.type || (vars.type = "wheel,touch");
			vars.debounce = !!vars.debounce;
			vars.id = vars.id || "normalizer";

			var _vars2 = vars,
				normalizeScrollX = _vars2.normalizeScrollX,
				momentum = _vars2.momentum,
				allowNestedScroll = _vars2.allowNestedScroll,
				onRelease = _vars2.onRelease,
				self,
				maxY,
				target = _getTarget(vars.target) || ScrollTrigger_docEl,
				smoother = ScrollTrigger_gsap.core.globals().ScrollSmoother,
				smootherInstance = smoother && smoother.get(),
				content =
					_fixIOSBug &&
					((vars.content && _getTarget(vars.content)) ||
						(smootherInstance &&
							vars.content !== false &&
							!smootherInstance.smooth() &&
							smootherInstance.content())),
				scrollFuncY = _getScrollFunc(target, _vertical),
				scrollFuncX = _getScrollFunc(target, _horizontal),
				scale = 1,
				initialScale =
					(Observer_Observer.isTouch && ScrollTrigger_win.visualViewport
						? ScrollTrigger_win.visualViewport.scale * ScrollTrigger_win.visualViewport.width
						: ScrollTrigger_win.outerWidth) / ScrollTrigger_win.innerWidth,
				wheelRefresh = 0,
				resolveMomentumDuration = ScrollTrigger_isFunction(momentum)
					? function () {
							return momentum(self);
					  }
					: function () {
							return momentum || 2.8;
					  },
				lastRefreshID,
				skipTouchMove,
				inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll),
				resumeTouchMove = function resumeTouchMove() {
					return (skipTouchMove = false);
				},
				scrollClampX = ScrollTrigger_passThrough,
				scrollClampY = ScrollTrigger_passThrough,
				updateClamps = function updateClamps() {
					maxY = _maxScroll(target, _vertical);
					scrollClampY = ScrollTrigger_clamp(_fixIOSBug ? 1 : 0, maxY);
					normalizeScrollX && (scrollClampX = ScrollTrigger_clamp(0, _maxScroll(target, _horizontal)));
					lastRefreshID = _refreshID;
				},
				removeContentOffset = function removeContentOffset() {
					content._gsap.y = ScrollTrigger_round(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
					content.style.transform =
						"matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
					scrollFuncY.offset = scrollFuncY.cacheID = 0;
				},
				ignoreDrag = function ignoreDrag() {
					if (skipTouchMove) {
						requestAnimationFrame(resumeTouchMove);

						var offset = ScrollTrigger_round(self.deltaY / 2),
							scroll = scrollClampY(scrollFuncY.v - offset);

						if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
							scrollFuncY.offset = scroll - scrollFuncY.v;

							var y = ScrollTrigger_round(
								(parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset
							);

							content.style.transform =
								"matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
							content._gsap.y = y + "px";
							scrollFuncY.cacheID = _scrollers.cache;

							_updateAll();
						}

						return true;
					}

					scrollFuncY.offset && removeContentOffset();
					skipTouchMove = true;
				},
				tween,
				startScrollX,
				startScrollY,
				onStopDelayedCall,
				onResize = function onResize() {
					// if the window resizes, like on an iPhone which Apple FORCES the address bar to show/hide even if we event.preventDefault(), it may be scrolling too far now that the address bar is showing, so we must dynamically adjust the momentum tween.
					updateClamps();

					if (tween.isActive() && tween.vars.scrollY > maxY) {
						scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
					}
				};

			content &&
				ScrollTrigger_gsap.set(content, {
					y: "+=0",
				}); // to ensure there's a cache (element._gsap)

			vars.ignoreCheck = function (e) {
				return (
					(_fixIOSBug && e.type === "touchmove" && ignoreDrag(e)) ||
					(scale > 1.05 && e.type !== "touchstart") ||
					self.isGesturing ||
					(e.touches && e.touches.length > 1)
				);
			};

			vars.onPress = function () {
				skipTouchMove = false;
				var prevScale = scale;
				scale = ScrollTrigger_round(
					((ScrollTrigger_win.visualViewport && ScrollTrigger_win.visualViewport.scale) || 1) / initialScale
				);
				tween.pause();
				prevScale !== scale &&
					_allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
				startScrollX = scrollFuncX();
				startScrollY = scrollFuncY();
				updateClamps();
				lastRefreshID = _refreshID;
			};

			vars.onRelease = vars.onGestureStart = function (self, wasDragging) {
				scrollFuncY.offset && removeContentOffset();

				if (!wasDragging) {
					onStopDelayedCall.restart(true);
				} else {
					_scrollers.cache++; // make sure we're pulling the non-cached value
					// alternate algorithm: durX = Math.min(6, Math.abs(self.velocityX / 800)),	dur = Math.max(durX, Math.min(6, Math.abs(self.velocityY / 800))); dur = dur * (0.4 + (1 - _power4In(dur / 6)) * 0.6)) * (momentumSpeed || 1)

					var dur = resolveMomentumDuration(),
						currentScroll,
						endScroll;

					if (normalizeScrollX) {
						currentScroll = scrollFuncX();
						endScroll = currentScroll + (dur * 0.05 * -self.velocityX) / 0.227; // the constant .227 is from power4(0.05). velocity is inverted because scrolling goes in the opposite direction.

						dur *= _clampScrollAndGetDurationMultiplier(
							scrollFuncX,
							currentScroll,
							endScroll,
							_maxScroll(target, _horizontal)
						);
						tween.vars.scrollX = scrollClampX(endScroll);
					}

					currentScroll = scrollFuncY();
					endScroll = currentScroll + (dur * 0.05 * -self.velocityY) / 0.227; // the constant .227 is from power4(0.05)

					dur *= _clampScrollAndGetDurationMultiplier(
						scrollFuncY,
						currentScroll,
						endScroll,
						_maxScroll(target, _vertical)
					);
					tween.vars.scrollY = scrollClampY(endScroll);
					tween.invalidate().duration(dur).play(0.01);

					if ((_fixIOSBug && tween.vars.scrollY >= maxY) || currentScroll >= maxY - 1) {
						// iOS bug: it'll show the address bar but NOT fire the window "resize" event until the animation is done but we must protect against overshoot so we leverage an onUpdate to do so.
						ScrollTrigger_gsap.to(
							{},
							{
								onUpdate: onResize,
								duration: dur,
							}
						);
					}
				}

				onRelease && onRelease(self);
			};

			vars.onWheel = function () {
				tween._ts && tween.pause();

				if (ScrollTrigger_getTime() - wheelRefresh > 1000) {
					// after 1 second, refresh the clamps otherwise that'll only happen when ScrollTrigger.refresh() is called or for touch-scrolling.
					lastRefreshID = 0;
					wheelRefresh = ScrollTrigger_getTime();
				}
			};

			vars.onChange = function (self, dx, dy, xArray, yArray) {
				_refreshID !== lastRefreshID && updateClamps();
				dx &&
					normalizeScrollX &&
					scrollFuncX(
						scrollClampX(
							xArray[2] === dx ? startScrollX + (self.startX - self.x) : scrollFuncX() + dx - xArray[1]
						)
					); // for more precision, we track pointer/touch movement from the start, otherwise it'll drift.

				if (dy) {
					scrollFuncY.offset && removeContentOffset();
					var isTouch = yArray[2] === dy,
						y = isTouch ? startScrollY + self.startY - self.y : scrollFuncY() + dy - yArray[1],
						yClamped = scrollClampY(y);
					isTouch && y !== yClamped && (startScrollY += yClamped - y);
					scrollFuncY(yClamped);
				}

				(dy || dx) && _updateAll();
			};

			vars.onEnable = function () {
				_allowNativePanning(target, normalizeScrollX ? false : "x");

				ScrollTrigger_ScrollTrigger.addEventListener("refresh", onResize);

				ScrollTrigger_addListener(ScrollTrigger_win, "resize", onResize);

				if (scrollFuncY.smooth) {
					scrollFuncY.target.style.scrollBehavior = "auto";
					scrollFuncY.smooth = scrollFuncX.smooth = false;
				}

				inputObserver.enable();
			};

			vars.onDisable = function () {
				_allowNativePanning(target, true);

				ScrollTrigger_removeListener(ScrollTrigger_win, "resize", onResize);

				ScrollTrigger_ScrollTrigger.removeEventListener("refresh", onResize);
				inputObserver.kill();
			};

			vars.lockAxis = vars.lockAxis !== false;
			self = new Observer_Observer(vars);
			self.iOS = _fixIOSBug; // used in the Observer getCachedScroll() function to work around an iOS bug that wreaks havoc with TouchEvent.clientY if we allow scroll to go all the way back to 0.

			_fixIOSBug && !scrollFuncY() && scrollFuncY(1); // iOS bug causes event.clientY values to freak out (wildly inaccurate) if the scroll position is exactly 0.

			_fixIOSBug && ScrollTrigger_gsap.ticker.add(ScrollTrigger_passThrough); // prevent the ticker from sleeping

			onStopDelayedCall = self._dc;
			tween = ScrollTrigger_gsap.to(self, {
				ease: "power4",
				paused: true,
				scrollX: normalizeScrollX ? "+=0.1" : "+=0",
				scrollY: "+=0.1",
				modifiers: {
					scrollY: _interruptionTracker(scrollFuncY, scrollFuncY(), function () {
						return tween.pause();
					}),
				},
				onUpdate: _updateAll,
				onComplete: onStopDelayedCall.vars.onComplete,
			}); // we need the modifier to sense if the scroll position is altered outside of the momentum tween (like with a scrollTo tween) so we can pause() it to prevent conflicts.

			return self;
		};

	ScrollTrigger_ScrollTrigger.sort = function (func) {
		return _triggers.sort(
			func ||
				function (a, b) {
					return (
						(a.vars.refreshPriority || 0) * -1e6 +
						a.start -
						(b.start + (b.vars.refreshPriority || 0) * -1e6)
					);
				}
		);
	};

	ScrollTrigger_ScrollTrigger.observe = function (vars) {
		return new Observer_Observer(vars);
	};

	ScrollTrigger_ScrollTrigger.normalizeScroll = function (vars) {
		if (typeof vars === "undefined") {
			return ScrollTrigger_normalizer;
		}

		if (vars === true && ScrollTrigger_normalizer) {
			return ScrollTrigger_normalizer.enable();
		}

		if (vars === false) {
			return ScrollTrigger_normalizer && ScrollTrigger_normalizer.kill();
		}

		var normalizer = vars instanceof Observer_Observer ? vars : _getScrollNormalizer(vars);
		ScrollTrigger_normalizer &&
			ScrollTrigger_normalizer.target === normalizer.target &&
			ScrollTrigger_normalizer.kill();
		ScrollTrigger_isViewport(normalizer.target) && (ScrollTrigger_normalizer = normalizer);
		return normalizer;
	};

	ScrollTrigger_ScrollTrigger.core = {
		// smaller file size way to leverage in ScrollSmoother and Observer
		_getVelocityProp: _getVelocityProp,
		_inputObserver: _inputObserver,
		_scrollers: _scrollers,
		_proxies: _proxies,
		bridge: {
			// when normalizeScroll sets the scroll position (ss = setScroll)
			ss: function ss() {
				_lastScrollTime || ScrollTrigger_dispatch("scrollStart");
				_lastScrollTime = ScrollTrigger_getTime();
			},
			// a way to get the _refreshing value in Observer
			ref: function ref() {
				return _refreshing;
			},
		},
	};
	ScrollTrigger_getGSAP() && ScrollTrigger_gsap.registerPlugin(ScrollTrigger_ScrollTrigger); // CONCATENATED MODULE: ./src/js/components/animation.js

	gsapWithCSS.registerPlugin(ScrollTrigger_ScrollTrigger);

	// функция разделения текста на буквы и слова
	function animation_splitText(el) {
		el.innerHTML = el.innerText.replace(/(\S*)/g, (m) => {
			return (
				`<div style="display: inline-block" class="word">` +
				m.replace(/(#|@)?\S(#|@)?/g, "<div style='display: inline-block' class='letter'>$&</div>") +
				`</div>`
			);
		});
		return el;
	}
	const animation_clientSection = document.querySelector(".client-1c");
	const animation_contactsSection = document.querySelector(".contacts-1c");

	// таймлайн первой секции
	const hero1c = document.querySelector(".hero-1c");
	hero1c.style.opacity = "1";
	if (hero1c !== null) {
		const heroTl = gsapWithCSS.timeline();
		const heroTitle = hero1c.querySelector(".hero-1c__title");
		const heroSubTitle = hero1c.querySelector(".hero-1c__subtitle");
		let heroSplitArray = Array.from(animation_splitText(heroTitle).querySelectorAll(".letter"));
		heroSplitArray.forEach((el) => {
			heroTl.fromTo(
				el,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.7 / heroSplitArray.length,
				}
			);
		});
		heroSplitArray = Array.from(animation_splitText(heroSubTitle).querySelectorAll(".letter"));
		heroSplitArray.forEach((el) => {
			heroTl.fromTo(
				el,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.7 / heroSplitArray.length,
				}
			);
		});
		const hero1cItems = hero1c.querySelectorAll(".hero-1c__item");
		hero1cItems.forEach((item, idx) => {
			heroTl.fromTo(
				item.querySelector(".line-horizontal-top"),
				{
					width: 0,
				},
				{
					width: "100%",
					duration: 0.3,
				},
				`-=${idx * 0.6}`
			);
			let verticalRightLine = item.querySelector(".line-vertical-right");
			if (verticalRightLine !== null) {
				heroTl.fromTo(
					verticalRightLine,
					{
						height: 0,
					},
					{
						height: "100%",
						duration: 0.3,
					}
				);
			}
			heroTl.fromTo(
				item.querySelector(".hero-1c__icon"),
				{
					opacity: 0,
					y: 5,
					x: 5,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.3,
				},
				`-=${idx * 0.4}`
			);
			heroSplitArray = Array.from(
				animation_splitText(item.querySelector(".hero-1c__title-item")).querySelectorAll(".letter")
			);
			heroSplitArray.forEach((el) => {
				heroTl.fromTo(
					el,
					{
						opacity: 0,
					},
					{
						opacity: 1,
						duration: 0.3 / heroSplitArray.length,
					}
				);
			});
			heroTl.fromTo(
				item.querySelector(".hero-1c__text"),
				{
					opacity: 0,
					y: 5,
					x: 5,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.3,
				}
			);
		});
		heroTl.fromTo(
			hero1c.querySelector(".hero-1c__form"),
			{
				opacity: 0,
				y: 10,
				x: 10,
			},
			{
				opacity: 1,
				y: 0,
				x: 0,
				duration: 0.3,
			}
		);
	}
	const animation_mediaQuery840 = window.matchMedia("(max-width: 840px)");
	if (animation_mediaQuery840.matches) {
		// client Tl
		const clientTl = gsapWithCSS.timeline();
		ScrollTrigger_ScrollTrigger.create({
			trigger: ".client-1c",
			start: "top 80%",
			toggleActions: "play pause resume none",
			animation: clientTl,
		});
		const clientTitle = animation_clientSection.querySelector(".client-1c__title");
		let clientSplitArray = Array.from(animation_splitText(clientTitle).querySelectorAll(".letter"));
		clientSplitArray.forEach((letter) => {
			clientTl.fromTo(
				letter,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.5 / clientSplitArray.length,
				}
			);
		});
		const clientSubTitle = animation_clientSection.querySelector(".client-1c__subtitle");
		clientSplitArray = Array.from(animation_splitText(clientSubTitle).querySelectorAll(".letter"));
		clientSplitArray.forEach((letter) => {
			clientTl.fromTo(
				letter,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.4 / clientSplitArray.length,
				}
			);
		});
		const client1cItems = animation_clientSection.querySelectorAll(".client-1c__item");
		client1cItems.forEach((item, idx) => {
			clientTl.fromTo(
				item.querySelector(".line-horizontal-top"),
				{
					width: 0,
				},
				{
					width: "100%",
					duration: 0.3,
				},
				`-=${idx * 0.6}`
			);
			let verticalRightLine = item.querySelector(".line-vertical-right");
			if (verticalRightLine !== null) {
				clientTl.fromTo(
					verticalRightLine,
					{
						height: 0,
					},
					{
						height: "100%",
						duration: 0.3,
					}
				);
			}
			clientTl.fromTo(
				item.querySelector(".client-1c__container-image"),
				{
					opacity: 0,
					y: 5,
					x: 5,
				},
				{
					opacity: 1,
					y: 0,
					x: 0,
					duration: 0.3,
				},
				`-=${idx * 0.4}`
			);
			clientSplitArray = Array.from(
				animation_splitText(item.querySelector(".client-1c__text")).querySelectorAll(".letter")
			);
			clientSplitArray.forEach((el) => {
				clientTl.fromTo(
					el,
					{
						opacity: 0,
					},
					{
						opacity: 1,
						duration: 0.3 / clientSplitArray.length,
					}
				);
			});
		});

		// contacts tl
		const contactsTl = gsapWithCSS.timeline();
		ScrollTrigger_ScrollTrigger.create({
			trigger: ".contacts-1c",
			start: "top 80%",
			toggleActions: "play pause resume none",
			animation: contactsTl,
		});
		const address = animation_contactsSection.querySelector(".swiper-slide-active .contacts-1c__address-first");
		let contactsSplitArray = Array.from(animation_splitText(address).querySelectorAll(".letter"));
		contactsSplitArray.forEach((letter) => {
			contactsTl.fromTo(
				letter,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.9 / contactsSplitArray.length,
				}
			);
		});
		contactsTl.fromTo(
			".swiper-slide-active .contacts-1c__name",
			{
				opacity: 0,
				y: 5,
				x: 5,
			},
			{
				opacity: 1,
				y: 0,
				x: 0,
				duration: 0.5,
			},
			`-=0.2`
		);
		contactsTl.fromTo(
			".swiper-slide-active .contacts-1c__job",
			{
				opacity: 0,
				y: 5,
				x: -5,
			},
			{
				opacity: 1,
				y: 0,
				x: 0,
				duration: 0.3,
			},
			`-=0.1`
		);
		contactsTl.fromTo(
			".swiper-slide-active .contacts-1c__tel",
			{
				opacity: 0,
				y: 5,
				x: 5,
			},
			{
				opacity: 1,
				y: 0,
				x: 0,
				duration: 0.3,
			},
			`-=0.1`
		);
		contactsTl.fromTo(
			".swiper-slide-active .contacts-1c__descr",
			{
				opacity: 0,
			},
			{
				opacity: 1,
				y: 0,
				x: 0,
				duration: 0.5,
			}
		);
		const addressSecond = animation_contactsSection.querySelector(
			".swiper-slide-active .contacts-1c__address-second"
		);
		contactsSplitArray = Array.from(animation_splitText(addressSecond).querySelectorAll(".letter"));
		contactsSplitArray.forEach((letter) => {
			contactsTl.fromTo(
				letter,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.4 / contactsSplitArray.length,
				}
			);
		});
		contactsTl.fromTo(
			".contacts-1c__navigation",
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 0.5,
			}
		);
		contactsTl.fromTo(
			".contacts-1c__container-pagination",
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 0.5,
			}
		);
		contactsTl.fromTo(
			".contacts-1c__button-faq",
			{
				opacity: 0,
				x: 40,
			},
			{
				opacity: 1,
				x: 0,
				duration: 0.5,
			}
		);
	} // CONCATENATED MODULE: ./src/js/components/popup.js
	const popupSection = document.querySelector(".popup-1c");
	const popupButton = document.getElementById("popupButton");
	const popupTl = gsapWithCSS.timeline();
	popupTl.pause();
	popupTl
		.to(".popup-1c", {
			opacity: 1,
			visibility: "visible",
			duration: 0.2,
		})
		.fromTo(
			".popup-1c__form",
			{
				opacity: 0,
				y: -50,
				visibility: "hidden",
			},
			{
				opacity: 1,
				y: 0,
				visibility: "visible",
				duration: 0.4,
			}
		);
	popupButton.addEventListener("click", () => {
		popupTl.play();
	});
	popupSection.addEventListener("click", () => {
		popupTl.reverse();
	}); // CONCATENATED MODULE: ./src/js/_components.js // CONCATENATED MODULE: ./src/js/main.js

	/******/
})();
