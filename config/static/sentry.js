;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b98f1a9c-e8cf-4ff5-8db3-8b66dac5c856",e._sentryDebugIdIdentifier="sentry-dbid-b98f1a9c-e8cf-4ff5-8db3-8b66dac5c856");})();}catch(e){}};
!function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"00ee96a191eaa70b72f3e18304fd7a157fe83a8e"};}();
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/debug-build.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/debug-build.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEBUG_BUILD: () => (/* binding */ DEBUG_BUILD)
/* harmony export */ });
const DEBUG_BUILD = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/getNativeImplementation.js":
/*!**********************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/getNativeImplementation.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearCachedImplementation: () => (/* binding */ clearCachedImplementation),
/* harmony export */   getNativeImplementation: () => (/* binding */ getNativeImplementation),
/* harmony export */   setTimeout: () => (/* binding */ setTimeout)
/* harmony export */ });
/* unused harmony export fetch */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/supports.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./debug-build.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/debug-build.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");



const cachedImplementations = {};
function getNativeImplementation(name) {
  const cached = cachedImplementations[name];
  if (cached) {
    return cached;
  }
  let impl = _types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW[name];
  if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isNativeFunction)(impl)) {
    return cachedImplementations[name] = impl.bind(_types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW);
  }
  const document = _types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.document;
  if (document && typeof document.createElement === "function") {
    try {
      const sandbox = document.createElement("iframe");
      sandbox.hidden = true;
      document.head.appendChild(sandbox);
      const contentWindow = sandbox.contentWindow;
      if (contentWindow == null ? void 0 : contentWindow[name]) {
        impl = contentWindow[name];
      }
      document.head.removeChild(sandbox);
    } catch (e) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_2__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_0__.debug.warn(`Could not create sandbox iframe for ${name} check, bailing to window.${name}: `, e);
    }
  }
  if (!impl) {
    return impl;
  }
  return cachedImplementations[name] = impl.bind(_types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW);
}
function clearCachedImplementation(name) {
  cachedImplementations[name] = void 0;
}
function fetch(...rest) {
  return getNativeImplementation("fetch")(...rest);
}
function setTimeout(...rest) {
  return getNativeImplementation("setTimeout")(...rest);
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/dom.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/dom.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClickKeypressInstrumentationHandler: () => (/* binding */ addClickKeypressInstrumentationHandler)
/* harmony export */ });
/* unused harmony export instrumentDOM */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/instrument/handlers.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/misc.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/object.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");


const DEBOUNCE_DURATION = 1e3;
let debounceTimerID;
let lastCapturedEventType;
let lastCapturedEventTargetId;
function addClickKeypressInstrumentationHandler(handler) {
  const type = "dom";
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.addHandler)(type, handler);
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.maybeInstrument)(type, instrumentDOM);
}
function instrumentDOM() {
  if (!_types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.document) {
    return;
  }
  const triggerDOMHandler = _sentry_core__WEBPACK_IMPORTED_MODULE_0__.triggerHandlers.bind(null, "dom");
  const globalDOMEventHandler = makeDOMEventHandler(triggerDOMHandler, true);
  _types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.document.addEventListener("click", globalDOMEventHandler, false);
  _types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.document.addEventListener("keypress", globalDOMEventHandler, false);
  ["EventTarget", "Node"].forEach((target) => {
    var _a, _b;
    const globalObject = _types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW;
    const proto = (_a = globalObject[target]) == null ? void 0 : _a.prototype;
    if (!((_b = proto == null ? void 0 : proto.hasOwnProperty) == null ? void 0 : _b.call(proto, "addEventListener"))) {
      return;
    }
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.fill)(proto, "addEventListener", function(originalAddEventListener) {
      return function(type, listener, options) {
        if (type === "click" || type == "keypress") {
          try {
            const handlers = this.__sentry_instrumentation_handlers__ = this.__sentry_instrumentation_handlers__ || {};
            const handlerForType = handlers[type] = handlers[type] || { refCount: 0 };
            if (!handlerForType.handler) {
              const handler = makeDOMEventHandler(triggerDOMHandler);
              handlerForType.handler = handler;
              originalAddEventListener.call(this, type, handler, options);
            }
            handlerForType.refCount++;
          } catch {
          }
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    });
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.fill)(
      proto,
      "removeEventListener",
      function(originalRemoveEventListener) {
        return function(type, listener, options) {
          if (type === "click" || type == "keypress") {
            try {
              const handlers = this.__sentry_instrumentation_handlers__ || {};
              const handlerForType = handlers[type];
              if (handlerForType) {
                handlerForType.refCount--;
                if (handlerForType.refCount <= 0) {
                  originalRemoveEventListener.call(this, type, handlerForType.handler, options);
                  handlerForType.handler = void 0;
                  delete handlers[type];
                }
                if (Object.keys(handlers).length === 0) {
                  delete this.__sentry_instrumentation_handlers__;
                }
              }
            } catch {
            }
          }
          return originalRemoveEventListener.call(this, type, listener, options);
        };
      }
    );
  });
}
function isSimilarToLastCapturedEvent(event) {
  if (event.type !== lastCapturedEventType) {
    return false;
  }
  try {
    if (!event.target || event.target._sentryId !== lastCapturedEventTargetId) {
      return false;
    }
  } catch {
  }
  return true;
}
function shouldSkipDOMEvent(eventType, target) {
  if (eventType !== "keypress") {
    return false;
  }
  if (!(target == null ? void 0 : target.tagName)) {
    return true;
  }
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
    return false;
  }
  return true;
}
function makeDOMEventHandler(handler, globalListener = false) {
  return (event) => {
    if (!event || event["_sentryCaptured"]) {
      return;
    }
    const target = getEventTarget(event);
    if (shouldSkipDOMEvent(event.type, target)) {
      return;
    }
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addNonEnumerableProperty)(event, "_sentryCaptured", true);
    if (target && !target._sentryId) {
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addNonEnumerableProperty)(target, "_sentryId", (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.uuid4)());
    }
    const name = event.type === "keypress" ? "input" : event.type;
    if (!isSimilarToLastCapturedEvent(event)) {
      const handlerData = { event, name, global: globalListener };
      handler(handlerData);
      lastCapturedEventType = event.type;
      lastCapturedEventTargetId = target ? target._sentryId : void 0;
    }
    clearTimeout(debounceTimerID);
    debounceTimerID = _types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.setTimeout(() => {
      lastCapturedEventTargetId = void 0;
      lastCapturedEventType = void 0;
    }, DEBOUNCE_DURATION);
  };
}
function getEventTarget(event) {
  try {
    return event.target;
  } catch {
    return null;
  }
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/history.js":
/*!*****************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/history.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addHistoryInstrumentationHandler: () => (/* binding */ addHistoryInstrumentationHandler)
/* harmony export */ });
/* unused harmony export instrumentHistory */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/instrument/handlers.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/object.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/supports.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");


let lastHref;
function addHistoryInstrumentationHandler(handler) {
  const type = "history";
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.addHandler)(type, handler);
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.maybeInstrument)(type, instrumentHistory);
}
function instrumentHistory() {
  _types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.addEventListener("popstate", () => {
    const to = _types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.location.href;
    const from = lastHref;
    lastHref = to;
    if (from === to) {
      return;
    }
    const handlerData = { from, to };
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.triggerHandlers)("history", handlerData);
  });
  if (!(0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.supportsHistory)()) {
    return;
  }
  function historyReplacementFunction(originalHistoryFunction) {
    return function(...args) {
      const url = args.length > 2 ? args[2] : void 0;
      if (url) {
        const from = lastHref;
        const to = getAbsoluteUrl(String(url));
        lastHref = to;
        if (from === to) {
          return originalHistoryFunction.apply(this, args);
        }
        const handlerData = { from, to };
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.triggerHandlers)("history", handlerData);
      }
      return originalHistoryFunction.apply(this, args);
    };
  }
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.fill)(_types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.history, "pushState", historyReplacementFunction);
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.fill)(_types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.history, "replaceState", historyReplacementFunction);
}
function getAbsoluteUrl(urlOrPath) {
  try {
    const url = new URL(urlOrPath, _types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.location.origin);
    return url.toString();
  } catch {
    return urlOrPath;
  }
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/xhr.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/xhr.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SENTRY_XHR_DATA_KEY: () => (/* binding */ SENTRY_XHR_DATA_KEY),
/* harmony export */   addXhrInstrumentationHandler: () => (/* binding */ addXhrInstrumentationHandler)
/* harmony export */ });
/* unused harmony export instrumentXHR */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/instrument/handlers.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");


const SENTRY_XHR_DATA_KEY = "__sentry_xhr_v3__";
function addXhrInstrumentationHandler(handler) {
  const type = "xhr";
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.addHandler)(type, handler);
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.maybeInstrument)(type, instrumentXHR);
}
function instrumentXHR() {
  if (!_types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.XMLHttpRequest) {
    return;
  }
  const xhrproto = XMLHttpRequest.prototype;
  xhrproto.open = new Proxy(xhrproto.open, {
    apply(originalOpen, xhrOpenThisArg, xhrOpenArgArray) {
      const virtualError = new Error();
      const startTimestamp = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.timestampInSeconds)() * 1e3;
      const method = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isString)(xhrOpenArgArray[0]) ? xhrOpenArgArray[0].toUpperCase() : void 0;
      const url = parseXhrUrlArg(xhrOpenArgArray[1]);
      if (!method || !url) {
        return originalOpen.apply(xhrOpenThisArg, xhrOpenArgArray);
      }
      xhrOpenThisArg[SENTRY_XHR_DATA_KEY] = {
        method,
        url,
        request_headers: {}
      };
      if (method === "POST" && url.match(/sentry_key/)) {
        xhrOpenThisArg.__sentry_own_request__ = true;
      }
      const onreadystatechangeHandler = () => {
        const xhrInfo = xhrOpenThisArg[SENTRY_XHR_DATA_KEY];
        if (!xhrInfo) {
          return;
        }
        if (xhrOpenThisArg.readyState === 4) {
          try {
            xhrInfo.status_code = xhrOpenThisArg.status;
          } catch {
          }
          const handlerData = {
            endTimestamp: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.timestampInSeconds)() * 1e3,
            startTimestamp,
            xhr: xhrOpenThisArg,
            virtualError
          };
          (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.triggerHandlers)("xhr", handlerData);
        }
      };
      if ("onreadystatechange" in xhrOpenThisArg && typeof xhrOpenThisArg.onreadystatechange === "function") {
        xhrOpenThisArg.onreadystatechange = new Proxy(xhrOpenThisArg.onreadystatechange, {
          apply(originalOnreadystatechange, onreadystatechangeThisArg, onreadystatechangeArgArray) {
            onreadystatechangeHandler();
            return originalOnreadystatechange.apply(onreadystatechangeThisArg, onreadystatechangeArgArray);
          }
        });
      } else {
        xhrOpenThisArg.addEventListener("readystatechange", onreadystatechangeHandler);
      }
      xhrOpenThisArg.setRequestHeader = new Proxy(xhrOpenThisArg.setRequestHeader, {
        apply(originalSetRequestHeader, setRequestHeaderThisArg, setRequestHeaderArgArray) {
          const [header, value] = setRequestHeaderArgArray;
          const xhrInfo = setRequestHeaderThisArg[SENTRY_XHR_DATA_KEY];
          if (xhrInfo && (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isString)(header) && (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isString)(value)) {
            xhrInfo.request_headers[header.toLowerCase()] = value;
          }
          return originalSetRequestHeader.apply(setRequestHeaderThisArg, setRequestHeaderArgArray);
        }
      });
      return originalOpen.apply(xhrOpenThisArg, xhrOpenArgArray);
    }
  });
  xhrproto.send = new Proxy(xhrproto.send, {
    apply(originalSend, sendThisArg, sendArgArray) {
      const sentryXhrData = sendThisArg[SENTRY_XHR_DATA_KEY];
      if (!sentryXhrData) {
        return originalSend.apply(sendThisArg, sendArgArray);
      }
      if (sendArgArray[0] !== void 0) {
        sentryXhrData.body = sendArgArray[0];
      }
      const handlerData = {
        startTimestamp: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.timestampInSeconds)() * 1e3,
        xhr: sendThisArg
      };
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.triggerHandlers)("xhr", handlerData);
      return originalSend.apply(sendThisArg, sendArgArray);
    }
  });
}
function parseXhrUrlArg(url) {
  if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isString)(url)) {
    return url;
  }
  try {
    return url.toString();
  } catch {
  }
  return void 0;
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/browserMetrics.js":
/*!*********************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/browserMetrics.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addPerformanceEntries: () => (/* binding */ addPerformanceEntries),
/* harmony export */   startTrackingInteractions: () => (/* binding */ startTrackingInteractions),
/* harmony export */   startTrackingLongAnimationFrames: () => (/* binding */ startTrackingLongAnimationFrames),
/* harmony export */   startTrackingLongTasks: () => (/* binding */ startTrackingLongTasks),
/* harmony export */   startTrackingWebVitals: () => (/* binding */ startTrackingWebVitals)
/* harmony export */ });
/* unused harmony exports _addMeasureSpans, _addNavigationSpans, _addResourceSpans */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/tracing/measurement.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/browser.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/string.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/url.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");
/* harmony import */ var _cls_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cls.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/cls.js");
/* harmony import */ var _instrument_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./instrument.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/instrument.js");
/* harmony import */ var _lcp_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lcp.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/lcp.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/utils.js");
/* harmony import */ var _web_vitals_lib_getActivationStart_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./web-vitals/lib/getActivationStart.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getActivationStart.js");
/* harmony import */ var _web_vitals_lib_getNavigationEntry_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./web-vitals/lib/getNavigationEntry.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getNavigationEntry.js");
/* harmony import */ var _web_vitals_lib_getVisibilityWatcher_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./web-vitals/lib/getVisibilityWatcher.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getVisibilityWatcher.js");









const MAX_INT_AS_BYTES = 2147483647;
let _performanceCursor = 0;
let _measurements = {};
let _lcpEntry;
let _clsEntry;
function startTrackingWebVitals({
  recordClsStandaloneSpans,
  recordLcpStandaloneSpans,
  client
}) {
  const performance = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.getBrowserPerformanceAPI)();
  if (performance && (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.browserPerformanceTimeOrigin)()) {
    if (performance.mark) {
      _types_js__WEBPACK_IMPORTED_MODULE_8__.WINDOW.performance.mark("sentry-tracing-init");
    }
    const lcpCleanupCallback = recordLcpStandaloneSpans ? (0,_lcp_js__WEBPACK_IMPORTED_MODULE_11__.trackLcpAsStandaloneSpan)(client) : _trackLCP();
    const ttfbCleanupCallback = _trackTtfb();
    const clsCleanupCallback = recordClsStandaloneSpans ? (0,_cls_js__WEBPACK_IMPORTED_MODULE_9__.trackClsAsStandaloneSpan)(client) : _trackCLS();
    return () => {
      lcpCleanupCallback == null ? void 0 : lcpCleanupCallback();
      ttfbCleanupCallback();
      clsCleanupCallback == null ? void 0 : clsCleanupCallback();
    };
  }
  return () => void 0;
}
function startTrackingLongTasks() {
  (0,_instrument_js__WEBPACK_IMPORTED_MODULE_10__.addPerformanceInstrumentationHandler)("longtask", ({ entries }) => {
    const parent = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getActiveSpan)();
    if (!parent) {
      return;
    }
    const { op: parentOp, start_timestamp: parentStartTimestamp } = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.spanToJSON)(parent);
    for (const entry of entries) {
      const startTime = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)((0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.browserPerformanceTimeOrigin)() + entry.startTime);
      const duration = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)(entry.duration);
      if (parentOp === "navigation" && parentStartTimestamp && startTime < parentStartTimestamp) {
        continue;
      }
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.startAndEndSpan)(parent, startTime, startTime + duration, {
        name: "Main UI thread blocked",
        op: "ui.long-task",
        attributes: {
          [_sentry_core__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics"
        }
      });
    }
  });
}
function startTrackingLongAnimationFrames() {
  const observer = new PerformanceObserver((list) => {
    const parent = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getActiveSpan)();
    if (!parent) {
      return;
    }
    for (const entry of list.getEntries()) {
      if (!entry.scripts[0]) {
        continue;
      }
      const startTime = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)((0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.browserPerformanceTimeOrigin)() + entry.startTime);
      const { start_timestamp: parentStartTimestamp, op: parentOp } = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.spanToJSON)(parent);
      if (parentOp === "navigation" && parentStartTimestamp && startTime < parentStartTimestamp) {
        continue;
      }
      const duration = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)(entry.duration);
      const attributes = {
        [_sentry_core__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics"
      };
      const initialScript = entry.scripts[0];
      const { invoker, invokerType, sourceURL, sourceFunctionName, sourceCharPosition } = initialScript;
      attributes["browser.script.invoker"] = invoker;
      attributes["browser.script.invoker_type"] = invokerType;
      if (sourceURL) {
        attributes["code.filepath"] = sourceURL;
      }
      if (sourceFunctionName) {
        attributes["code.function"] = sourceFunctionName;
      }
      if (sourceCharPosition !== -1) {
        attributes["browser.script.source_char_position"] = sourceCharPosition;
      }
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.startAndEndSpan)(parent, startTime, startTime + duration, {
        name: "Main UI thread blocked",
        op: "ui.long-animation-frame",
        attributes
      });
    }
  });
  observer.observe({ type: "long-animation-frame", buffered: true });
}
function startTrackingInteractions() {
  (0,_instrument_js__WEBPACK_IMPORTED_MODULE_10__.addPerformanceInstrumentationHandler)("event", ({ entries }) => {
    const parent = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getActiveSpan)();
    if (!parent) {
      return;
    }
    for (const entry of entries) {
      if (entry.name === "click") {
        const startTime = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)((0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.browserPerformanceTimeOrigin)() + entry.startTime);
        const duration = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)(entry.duration);
        const spanOptions = {
          name: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.htmlTreeAsString)(entry.target),
          op: `ui.interaction.${entry.name}`,
          startTime,
          attributes: {
            [_sentry_core__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics"
          }
        };
        const componentName = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getComponentName)(entry.target);
        if (componentName) {
          spanOptions.attributes["ui.component_name"] = componentName;
        }
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.startAndEndSpan)(parent, startTime, startTime + duration, spanOptions);
      }
    }
  });
}
function _trackCLS() {
  return (0,_instrument_js__WEBPACK_IMPORTED_MODULE_10__.addClsInstrumentationHandler)(({ metric }) => {
    const entry = metric.entries[metric.entries.length - 1];
    if (!entry) {
      return;
    }
    _measurements["cls"] = { value: metric.value, unit: "" };
    _clsEntry = entry;
  }, true);
}
function _trackLCP() {
  return (0,_instrument_js__WEBPACK_IMPORTED_MODULE_10__.addLcpInstrumentationHandler)(({ metric }) => {
    const entry = metric.entries[metric.entries.length - 1];
    if (!entry) {
      return;
    }
    _measurements["lcp"] = { value: metric.value, unit: "millisecond" };
    _lcpEntry = entry;
  }, true);
}
function _trackTtfb() {
  return (0,_instrument_js__WEBPACK_IMPORTED_MODULE_10__.addTtfbInstrumentationHandler)(({ metric }) => {
    const entry = metric.entries[metric.entries.length - 1];
    if (!entry) {
      return;
    }
    _measurements["ttfb"] = { value: metric.value, unit: "millisecond" };
  });
}
function addPerformanceEntries(span, options) {
  const performance = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.getBrowserPerformanceAPI)();
  const origin = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.browserPerformanceTimeOrigin)();
  if (!(performance == null ? void 0 : performance.getEntries) || !origin) {
    return;
  }
  const timeOrigin = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)(origin);
  const performanceEntries = performance.getEntries();
  const { op, start_timestamp: transactionStartTime } = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.spanToJSON)(span);
  performanceEntries.slice(_performanceCursor).forEach((entry) => {
    const startTime = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)(entry.startTime);
    const duration = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)(
      // Inexplicably, Chrome sometimes emits a negative duration. We need to work around this.
      // There is a SO post attempting to explain this, but it leaves one with open questions: https://stackoverflow.com/questions/23191918/peformance-getentries-and-negative-duration-display
      // The way we clamp the value is probably not accurate, since we have observed this happen for things that may take a while to load, like for example the replay worker.
      // TODO: Investigate why this happens and how to properly mitigate. For now, this is a workaround to prevent transactions being dropped due to negative duration spans.
      Math.max(0, entry.duration)
    );
    if (op === "navigation" && transactionStartTime && timeOrigin + startTime < transactionStartTime) {
      return;
    }
    switch (entry.entryType) {
      case "navigation": {
        _addNavigationSpans(span, entry, timeOrigin);
        break;
      }
      case "mark":
      case "paint":
      case "measure": {
        _addMeasureSpans(span, entry, startTime, duration, timeOrigin, options.ignorePerformanceApiSpans);
        const firstHidden = (0,_web_vitals_lib_getVisibilityWatcher_js__WEBPACK_IMPORTED_MODULE_15__.getVisibilityWatcher)();
        const shouldRecord = entry.startTime < firstHidden.firstHiddenTime;
        if (entry.name === "first-paint" && shouldRecord) {
          _measurements["fp"] = { value: entry.startTime, unit: "millisecond" };
        }
        if (entry.name === "first-contentful-paint" && shouldRecord) {
          _measurements["fcp"] = { value: entry.startTime, unit: "millisecond" };
        }
        break;
      }
      case "resource": {
        _addResourceSpans(
          span,
          entry,
          entry.name,
          startTime,
          duration,
          timeOrigin,
          options.ignoreResourceSpans
        );
        break;
      }
    }
  });
  _performanceCursor = Math.max(performanceEntries.length - 1, 0);
  _trackNavigator(span);
  if (op === "pageload") {
    _addTtfbRequestTimeToMeasurements(_measurements);
    if (!options.recordClsOnPageloadSpan) {
      delete _measurements.cls;
    }
    if (!options.recordLcpOnPageloadSpan) {
      delete _measurements.lcp;
    }
    Object.entries(_measurements).forEach(([measurementName, measurement]) => {
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.setMeasurement)(measurementName, measurement.value, measurement.unit);
    });
    span.setAttribute("performance.timeOrigin", timeOrigin);
    span.setAttribute("performance.activationStart", (0,_web_vitals_lib_getActivationStart_js__WEBPACK_IMPORTED_MODULE_13__.getActivationStart)());
    _setWebVitalAttributes(span, options);
  }
  _lcpEntry = void 0;
  _clsEntry = void 0;
  _measurements = {};
}
function _addMeasureSpans(span, entry, startTime, duration, timeOrigin, ignorePerformanceApiSpans) {
  if (["mark", "measure"].includes(entry.entryType) && (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.stringMatchesSomePattern)(entry.name, ignorePerformanceApiSpans)) {
    return;
  }
  const navEntry = (0,_web_vitals_lib_getNavigationEntry_js__WEBPACK_IMPORTED_MODULE_14__.getNavigationEntry)(false);
  const requestTime = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)(navEntry ? navEntry.requestStart : 0);
  const measureStartTimestamp = timeOrigin + Math.max(startTime, requestTime);
  const startTimeStamp = timeOrigin + startTime;
  const measureEndTimestamp = startTimeStamp + duration;
  const attributes = {
    [_sentry_core__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.resource.browser.metrics"
  };
  if (measureStartTimestamp !== startTimeStamp) {
    attributes["sentry.browser.measure_happened_before_request"] = true;
    attributes["sentry.browser.measure_start_time"] = measureStartTimestamp;
  }
  _addDetailToSpanAttributes(attributes, entry);
  if (measureStartTimestamp <= measureEndTimestamp) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.startAndEndSpan)(span, measureStartTimestamp, measureEndTimestamp, {
      name: entry.name,
      op: entry.entryType,
      attributes
    });
  }
}
function _addDetailToSpanAttributes(attributes, performanceMeasure) {
  try {
    const detail = performanceMeasure.detail;
    if (!detail) {
      return;
    }
    if (typeof detail === "object") {
      for (const [key, value] of Object.entries(detail)) {
        if (value && (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.isPrimitive)(value)) {
          attributes[`sentry.browser.measure.detail.${key}`] = value;
        } else if (value !== void 0) {
          try {
            attributes[`sentry.browser.measure.detail.${key}`] = JSON.stringify(value);
          } catch {
          }
        }
      }
      return;
    }
    if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.isPrimitive)(detail)) {
      attributes["sentry.browser.measure.detail"] = detail;
      return;
    }
    try {
      attributes["sentry.browser.measure.detail"] = JSON.stringify(detail);
    } catch {
    }
  } catch {
  }
}
function _addNavigationSpans(span, entry, timeOrigin) {
  ["unloadEvent", "redirect", "domContentLoadedEvent", "loadEvent", "connect"].forEach((event) => {
    _addPerformanceNavigationTiming(span, entry, event, timeOrigin);
  });
  _addPerformanceNavigationTiming(span, entry, "secureConnection", timeOrigin, "TLS/SSL");
  _addPerformanceNavigationTiming(span, entry, "fetch", timeOrigin, "cache");
  _addPerformanceNavigationTiming(span, entry, "domainLookup", timeOrigin, "DNS");
  _addRequest(span, entry, timeOrigin);
}
function _addPerformanceNavigationTiming(span, entry, event, timeOrigin, name = event) {
  const eventEnd = _getEndPropertyNameForNavigationTiming(event);
  const end = entry[eventEnd];
  const start = entry[`${event}Start`];
  if (!start || !end) {
    return;
  }
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.startAndEndSpan)(span, timeOrigin + (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)(start), timeOrigin + (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)(end), {
    op: `browser.${name}`,
    name: entry.name,
    attributes: {
      [_sentry_core__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics",
      ...event === "redirect" && entry.redirectCount != null ? { "http.redirect_count": entry.redirectCount } : {}
    }
  });
}
function _getEndPropertyNameForNavigationTiming(event) {
  if (event === "secureConnection") {
    return "connectEnd";
  }
  if (event === "fetch") {
    return "domainLookupStart";
  }
  return `${event}End`;
}
function _addRequest(span, entry, timeOrigin) {
  const requestStartTimestamp = timeOrigin + (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)(entry.requestStart);
  const responseEndTimestamp = timeOrigin + (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)(entry.responseEnd);
  const responseStartTimestamp = timeOrigin + (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.msToSec)(entry.responseStart);
  if (entry.responseEnd) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.startAndEndSpan)(span, requestStartTimestamp, responseEndTimestamp, {
      op: "browser.request",
      name: entry.name,
      attributes: {
        [_sentry_core__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics"
      }
    });
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.startAndEndSpan)(span, responseStartTimestamp, responseEndTimestamp, {
      op: "browser.response",
      name: entry.name,
      attributes: {
        [_sentry_core__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.metrics"
      }
    });
  }
}
function _addResourceSpans(span, entry, resourceUrl, startTime, duration, timeOrigin, ignoreResourceSpans) {
  if (entry.initiatorType === "xmlhttprequest" || entry.initiatorType === "fetch") {
    return;
  }
  const op = entry.initiatorType ? `resource.${entry.initiatorType}` : "resource.other";
  if (ignoreResourceSpans == null ? void 0 : ignoreResourceSpans.includes(op)) {
    return;
  }
  const parsedUrl = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_7__.parseUrl)(resourceUrl);
  const attributes = {
    [_sentry_core__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.resource.browser.metrics"
  };
  setResourceEntrySizeData(attributes, entry, "transferSize", "http.response_transfer_size");
  setResourceEntrySizeData(attributes, entry, "encodedBodySize", "http.response_content_length");
  setResourceEntrySizeData(attributes, entry, "decodedBodySize", "http.decoded_response_content_length");
  const deliveryType = entry.deliveryType;
  if (deliveryType != null) {
    attributes["http.response_delivery_type"] = deliveryType;
  }
  const renderBlockingStatus = entry.renderBlockingStatus;
  if (renderBlockingStatus) {
    attributes["resource.render_blocking_status"] = renderBlockingStatus;
  }
  if (parsedUrl.protocol) {
    attributes["url.scheme"] = parsedUrl.protocol.split(":").pop();
  }
  if (parsedUrl.host) {
    attributes["server.address"] = parsedUrl.host;
  }
  attributes["url.same_origin"] = resourceUrl.includes(_types_js__WEBPACK_IMPORTED_MODULE_8__.WINDOW.location.origin);
  if (entry.nextHopProtocol != null) {
    const { name, version } = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.extractNetworkProtocol)(entry.nextHopProtocol);
    attributes["network.protocol.name"] = name;
    attributes["network.protocol.version"] = version;
  }
  const startTimestamp = timeOrigin + startTime;
  const endTimestamp = startTimestamp + duration;
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.startAndEndSpan)(span, startTimestamp, endTimestamp, {
    name: resourceUrl.replace(_types_js__WEBPACK_IMPORTED_MODULE_8__.WINDOW.location.origin, ""),
    op,
    attributes
  });
}
function _trackNavigator(span) {
  const navigator = _types_js__WEBPACK_IMPORTED_MODULE_8__.WINDOW.navigator;
  if (!navigator) {
    return;
  }
  const connection = navigator.connection;
  if (connection) {
    if (connection.effectiveType) {
      span.setAttribute("effectiveConnectionType", connection.effectiveType);
    }
    if (connection.type) {
      span.setAttribute("connectionType", connection.type);
    }
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.isMeasurementValue)(connection.rtt)) {
      _measurements["connection.rtt"] = { value: connection.rtt, unit: "millisecond" };
    }
  }
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.isMeasurementValue)(navigator.deviceMemory)) {
    span.setAttribute("deviceMemory", `${navigator.deviceMemory} GB`);
  }
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.isMeasurementValue)(navigator.hardwareConcurrency)) {
    span.setAttribute("hardwareConcurrency", String(navigator.hardwareConcurrency));
  }
}
function _setWebVitalAttributes(span, options) {
  if (_lcpEntry && options.recordLcpOnPageloadSpan) {
    if (_lcpEntry.element) {
      span.setAttribute("lcp.element", (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.htmlTreeAsString)(_lcpEntry.element));
    }
    if (_lcpEntry.id) {
      span.setAttribute("lcp.id", _lcpEntry.id);
    }
    if (_lcpEntry.url) {
      span.setAttribute("lcp.url", _lcpEntry.url.trim().slice(0, 200));
    }
    if (_lcpEntry.loadTime != null) {
      span.setAttribute("lcp.loadTime", _lcpEntry.loadTime);
    }
    if (_lcpEntry.renderTime != null) {
      span.setAttribute("lcp.renderTime", _lcpEntry.renderTime);
    }
    span.setAttribute("lcp.size", _lcpEntry.size);
  }
  if ((_clsEntry == null ? void 0 : _clsEntry.sources) && options.recordClsOnPageloadSpan) {
    _clsEntry.sources.forEach(
      (source, index) => span.setAttribute(`cls.source.${index + 1}`, (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.htmlTreeAsString)(source.node))
    );
  }
}
function setResourceEntrySizeData(attributes, entry, key, dataKey) {
  const entryVal = entry[key];
  if (entryVal != null && entryVal < MAX_INT_AS_BYTES) {
    attributes[dataKey] = entryVal;
  }
}
function _addTtfbRequestTimeToMeasurements(_measurements2) {
  const navEntry = (0,_web_vitals_lib_getNavigationEntry_js__WEBPACK_IMPORTED_MODULE_14__.getNavigationEntry)(false);
  if (!navEntry) {
    return;
  }
  const { responseStart, requestStart } = navEntry;
  if (requestStart <= responseStart) {
    _measurements2["ttfb.requestTime"] = {
      value: responseStart - requestStart,
      unit: "millisecond"
    };
  }
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/cls.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/cls.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   trackClsAsStandaloneSpan: () => (/* binding */ trackClsAsStandaloneSpan)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/browser.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/debug-build.js");
/* harmony import */ var _instrument_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./instrument.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/instrument.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/utils.js");




function trackClsAsStandaloneSpan(client) {
  let standaloneCLsValue = 0;
  let standaloneClsEntry;
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_7__.supportsWebVital)("layout-shift")) {
    return;
  }
  const cleanupClsHandler = (0,_instrument_js__WEBPACK_IMPORTED_MODULE_6__.addClsInstrumentationHandler)(({ metric }) => {
    const entry = metric.entries[metric.entries.length - 1];
    if (!entry) {
      return;
    }
    standaloneCLsValue = metric.value;
    standaloneClsEntry = entry;
  }, true);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_7__.listenForWebVitalReportEvents)(client, (reportEvent, pageloadSpanId) => {
    sendStandaloneClsSpan(standaloneCLsValue, standaloneClsEntry, pageloadSpanId, reportEvent);
    cleanupClsHandler();
  });
}
function sendStandaloneClsSpan(clsValue, entry, pageloadSpanId, reportEvent) {
  var _a;
  _debug_build_js__WEBPACK_IMPORTED_MODULE_5__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_3__.debug.log(`Sending CLS span (${clsValue})`);
  const startTime = (0,_utils_js__WEBPACK_IMPORTED_MODULE_7__.msToSec)(((0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.browserPerformanceTimeOrigin)() || 0) + ((entry == null ? void 0 : entry.startTime) || 0));
  const routeName = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getCurrentScope)().getScopeData().transactionName;
  const name = entry ? (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.htmlTreeAsString)((_a = entry.sources[0]) == null ? void 0 : _a.node) : "Layout shift";
  const attributes = {
    [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.browser.cls",
    [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_OP]: "ui.webvital.cls",
    [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME]: (entry == null ? void 0 : entry.duration) || 0,
    // attach the pageload span id to the CLS span so that we can link them in the UI
    "sentry.pageload.span_id": pageloadSpanId,
    // describes what triggered the web vital to be reported
    "sentry.report_event": reportEvent
  };
  if (entry == null ? void 0 : entry.sources) {
    entry.sources.forEach((source, index) => {
      attributes[`cls.source.${index + 1}`] = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.htmlTreeAsString)(source.node);
    });
  }
  const span = (0,_utils_js__WEBPACK_IMPORTED_MODULE_7__.startStandaloneWebVitalSpan)({
    name,
    transaction: routeName,
    attributes,
    startTime
  });
  if (span) {
    span.addEvent("cls", {
      [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT]: "",
      [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE]: clsValue
    });
    span.end(startTime);
  }
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/elementTiming.js":
/*!********************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/elementTiming.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startTrackingElementTiming: () => (/* binding */ startTrackingElementTiming)
/* harmony export */ });
/* unused harmony export _onElementTiming */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/tracing/trace.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _instrument_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./instrument.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/instrument.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/utils.js");



function startTrackingElementTiming() {
  const performance = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.getBrowserPerformanceAPI)();
  if (performance && (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.browserPerformanceTimeOrigin)()) {
    return (0,_instrument_js__WEBPACK_IMPORTED_MODULE_5__.addPerformanceInstrumentationHandler)("element", _onElementTiming);
  }
  return () => void 0;
}
const _onElementTiming = ({ entries }) => {
  const activeSpan = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getActiveSpan)();
  const rootSpan = activeSpan ? (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getRootSpan)(activeSpan) : void 0;
  const transactionName = rootSpan ? (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.spanToJSON)(rootSpan).description : (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getCurrentScope)().getScopeData().transactionName;
  entries.forEach((entry) => {
    var _a, _b;
    const elementEntry = entry;
    if (!elementEntry.identifier) {
      return;
    }
    const paintType = elementEntry.name;
    const renderTime = elementEntry.renderTime;
    const loadTime = elementEntry.loadTime;
    const [spanStartTime, spanStartTimeSource] = loadTime ? [(0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.msToSec)(loadTime), "load-time"] : renderTime ? [(0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.msToSec)(renderTime), "render-time"] : [(0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.timestampInSeconds)(), "entry-emission"];
    const duration = paintType === "image-paint" ? (
      // for image paints, we can acually get a duration because image-paint entries also have a `loadTime`
      // and `renderTime`. `loadTime` is the time when the image finished loading and `renderTime` is the
      // time when the image finished rendering.
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.msToSec)(Math.max(0, (renderTime != null ? renderTime : 0) - (loadTime != null ? loadTime : 0)))
    ) : (
      // for `'text-paint'` entries, we can't get a duration because the `loadTime` is always zero.
      0
    );
    const attributes = {
      [_sentry_core__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.browser.elementtiming",
      [_sentry_core__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_OP]: "ui.elementtiming",
      // name must be user-entered, so we can assume low cardinality
      [_sentry_core__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "component",
      // recording the source of the span start time, as it varies depending on available data
      "sentry.span_start_time_source": spanStartTimeSource,
      "sentry.transaction_name": transactionName,
      "element.id": elementEntry.id,
      "element.type": ((_b = (_a = elementEntry.element) == null ? void 0 : _a.tagName) == null ? void 0 : _b.toLowerCase()) || "unknown",
      "element.size": elementEntry.naturalWidth && elementEntry.naturalHeight ? `${elementEntry.naturalWidth}x${elementEntry.naturalHeight}` : void 0,
      "element.render_time": renderTime,
      "element.load_time": loadTime,
      // `url` is `0`(number) for text paints (hence we fall back to undefined)
      "element.url": elementEntry.url || void 0,
      "element.identifier": elementEntry.identifier,
      "element.paint_type": paintType
    };
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.startSpan)(
      {
        name: `element[${elementEntry.identifier}]`,
        attributes,
        startTime: spanStartTime,
        onlyIfParent: true
      },
      (span) => {
        span.end(spanStartTime + duration);
      }
    );
  });
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/inp.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/inp.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerInpInteractionListener: () => (/* binding */ registerInpInteractionListener),
/* harmony export */   startTrackingINP: () => (/* binding */ startTrackingINP)
/* harmony export */ });
/* unused harmony exports _onInp, _trackINP */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/browser.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _instrument_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./instrument.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/instrument.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/utils.js");



const LAST_INTERACTIONS = [];
const INTERACTIONS_SPAN_MAP = /* @__PURE__ */ new Map();
const MAX_PLAUSIBLE_INP_DURATION = 60;
function startTrackingINP() {
  const performance = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.getBrowserPerformanceAPI)();
  if (performance && (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.browserPerformanceTimeOrigin)()) {
    const inpCallback = _trackINP();
    return () => {
      inpCallback();
    };
  }
  return () => void 0;
}
const INP_ENTRY_MAP = {
  click: "click",
  pointerdown: "click",
  pointerup: "click",
  mousedown: "click",
  mouseup: "click",
  touchstart: "click",
  touchend: "click",
  mouseover: "hover",
  mouseout: "hover",
  mouseenter: "hover",
  mouseleave: "hover",
  pointerover: "hover",
  pointerout: "hover",
  pointerenter: "hover",
  pointerleave: "hover",
  dragstart: "drag",
  dragend: "drag",
  drag: "drag",
  dragenter: "drag",
  dragleave: "drag",
  dragover: "drag",
  drop: "drag",
  keydown: "press",
  keyup: "press",
  keypress: "press",
  input: "press"
};
function _trackINP() {
  return (0,_instrument_js__WEBPACK_IMPORTED_MODULE_5__.addInpInstrumentationHandler)(_onInp);
}
const _onInp = ({ metric }) => {
  if (metric.value == void 0) {
    return;
  }
  const duration = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.msToSec)(metric.value);
  if (duration > MAX_PLAUSIBLE_INP_DURATION) {
    return;
  }
  const entry = metric.entries.find((entry2) => entry2.duration === metric.value && INP_ENTRY_MAP[entry2.name]);
  if (!entry) {
    return;
  }
  const { interactionId } = entry;
  const interactionType = INP_ENTRY_MAP[entry.name];
  const startTime = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.msToSec)((0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.browserPerformanceTimeOrigin)() + entry.startTime);
  const activeSpan = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getActiveSpan)();
  const rootSpan = activeSpan ? (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getRootSpan)(activeSpan) : void 0;
  const cachedSpan = interactionId != null ? INTERACTIONS_SPAN_MAP.get(interactionId) : void 0;
  const spanToUse = cachedSpan || rootSpan;
  const routeName = spanToUse ? (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.spanToJSON)(spanToUse).description : (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getCurrentScope)().getScopeData().transactionName;
  const name = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.htmlTreeAsString)(entry.target);
  const attributes = {
    [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.browser.inp",
    [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_OP]: `ui.interaction.${interactionType}`,
    [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME]: entry.duration
  };
  const span = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.startStandaloneWebVitalSpan)({
    name,
    transaction: routeName,
    attributes,
    startTime
  });
  if (span) {
    span.addEvent("inp", {
      [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT]: "millisecond",
      [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE]: metric.value
    });
    span.end(startTime + duration);
  }
};
function registerInpInteractionListener() {
  const handleEntries = ({ entries }) => {
    const activeSpan = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getActiveSpan)();
    const activeRootSpan = activeSpan && (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getRootSpan)(activeSpan);
    entries.forEach((entry) => {
      if (!(0,_instrument_js__WEBPACK_IMPORTED_MODULE_5__.isPerformanceEventTiming)(entry) || !activeRootSpan) {
        return;
      }
      const interactionId = entry.interactionId;
      if (interactionId == null) {
        return;
      }
      if (INTERACTIONS_SPAN_MAP.has(interactionId)) {
        return;
      }
      if (LAST_INTERACTIONS.length > 10) {
        const last = LAST_INTERACTIONS.shift();
        INTERACTIONS_SPAN_MAP.delete(last);
      }
      LAST_INTERACTIONS.push(interactionId);
      INTERACTIONS_SPAN_MAP.set(interactionId, activeRootSpan);
    });
  };
  (0,_instrument_js__WEBPACK_IMPORTED_MODULE_5__.addPerformanceInstrumentationHandler)("event", handleEntries);
  (0,_instrument_js__WEBPACK_IMPORTED_MODULE_5__.addPerformanceInstrumentationHandler)("first-input", handleEntries);
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/instrument.js":
/*!*****************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/instrument.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClsInstrumentationHandler: () => (/* binding */ addClsInstrumentationHandler),
/* harmony export */   addInpInstrumentationHandler: () => (/* binding */ addInpInstrumentationHandler),
/* harmony export */   addLcpInstrumentationHandler: () => (/* binding */ addLcpInstrumentationHandler),
/* harmony export */   addPerformanceInstrumentationHandler: () => (/* binding */ addPerformanceInstrumentationHandler),
/* harmony export */   addTtfbInstrumentationHandler: () => (/* binding */ addTtfbInstrumentationHandler),
/* harmony export */   isPerformanceEventTiming: () => (/* binding */ isPerformanceEventTiming)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/stacktrace.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/debug-build.js");
/* harmony import */ var _web_vitals_getCLS_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-vitals/getCLS.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/getCLS.js");
/* harmony import */ var _web_vitals_getINP_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-vitals/getINP.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/getINP.js");
/* harmony import */ var _web_vitals_getLCP_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./web-vitals/getLCP.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/getLCP.js");
/* harmony import */ var _web_vitals_lib_observe_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./web-vitals/lib/observe.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/observe.js");
/* harmony import */ var _web_vitals_onTTFB_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./web-vitals/onTTFB.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/onTTFB.js");







const handlers = {};
const instrumented = {};
let _previousCls;
let _previousLcp;
let _previousTtfb;
let _previousInp;
function addClsInstrumentationHandler(callback, stopOnCallback = false) {
  return addMetricObserver("cls", callback, instrumentCls, _previousCls, stopOnCallback);
}
function addLcpInstrumentationHandler(callback, stopOnCallback = false) {
  return addMetricObserver("lcp", callback, instrumentLcp, _previousLcp, stopOnCallback);
}
function addTtfbInstrumentationHandler(callback) {
  return addMetricObserver("ttfb", callback, instrumentTtfb, _previousTtfb);
}
function addInpInstrumentationHandler(callback) {
  return addMetricObserver("inp", callback, instrumentInp, _previousInp);
}
function addPerformanceInstrumentationHandler(type, callback) {
  addHandler(type, callback);
  if (!instrumented[type]) {
    instrumentPerformanceObserver(type);
    instrumented[type] = true;
  }
  return getCleanupCallback(type, callback);
}
function triggerHandlers(type, data) {
  const typeHandlers = handlers[type];
  if (!(typeHandlers == null ? void 0 : typeHandlers.length)) {
    return;
  }
  for (const handler of typeHandlers) {
    try {
      handler(data);
    } catch (e) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_2__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_0__.debug.error(
        `Error while triggering instrumentation handler.
Type: ${type}
Name: ${(0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(handler)}
Error:`,
        e
      );
    }
  }
}
function instrumentCls() {
  return (0,_web_vitals_getCLS_js__WEBPACK_IMPORTED_MODULE_3__.onCLS)(
    (metric) => {
      triggerHandlers("cls", {
        metric
      });
      _previousCls = metric;
    },
    // We want the callback to be called whenever the CLS value updates.
    // By default, the callback is only called when the tab goes to the background.
    { reportAllChanges: true }
  );
}
function instrumentLcp() {
  return (0,_web_vitals_getLCP_js__WEBPACK_IMPORTED_MODULE_5__.onLCP)(
    (metric) => {
      triggerHandlers("lcp", {
        metric
      });
      _previousLcp = metric;
    },
    // We want the callback to be called whenever the LCP value updates.
    // By default, the callback is only called when the tab goes to the background.
    { reportAllChanges: true }
  );
}
function instrumentTtfb() {
  return (0,_web_vitals_onTTFB_js__WEBPACK_IMPORTED_MODULE_7__.onTTFB)((metric) => {
    triggerHandlers("ttfb", {
      metric
    });
    _previousTtfb = metric;
  });
}
function instrumentInp() {
  return (0,_web_vitals_getINP_js__WEBPACK_IMPORTED_MODULE_4__.onINP)((metric) => {
    triggerHandlers("inp", {
      metric
    });
    _previousInp = metric;
  });
}
function addMetricObserver(type, callback, instrumentFn, previousValue, stopOnCallback = false) {
  addHandler(type, callback);
  let stopListening;
  if (!instrumented[type]) {
    stopListening = instrumentFn();
    instrumented[type] = true;
  }
  if (previousValue) {
    callback({ metric: previousValue });
  }
  return getCleanupCallback(type, callback, stopOnCallback ? stopListening : void 0);
}
function instrumentPerformanceObserver(type) {
  const options = {};
  if (type === "event") {
    options.durationThreshold = 0;
  }
  (0,_web_vitals_lib_observe_js__WEBPACK_IMPORTED_MODULE_6__.observe)(
    type,
    (entries) => {
      triggerHandlers(type, { entries });
    },
    options
  );
}
function addHandler(type, handler) {
  handlers[type] = handlers[type] || [];
  handlers[type].push(handler);
}
function getCleanupCallback(type, callback, stopListening) {
  return () => {
    if (stopListening) {
      stopListening();
    }
    const typeHandlers = handlers[type];
    if (!typeHandlers) {
      return;
    }
    const index = typeHandlers.indexOf(callback);
    if (index !== -1) {
      typeHandlers.splice(index, 1);
    }
  };
}
function isPerformanceEventTiming(entry) {
  return "duration" in entry;
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/lcp.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/lcp.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   trackLcpAsStandaloneSpan: () => (/* binding */ trackLcpAsStandaloneSpan)
/* harmony export */ });
/* unused harmony export _sendStandaloneLcpSpan */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/browser.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/debug-build.js");
/* harmony import */ var _instrument_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./instrument.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/instrument.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/utils.js");




function trackLcpAsStandaloneSpan(client) {
  let standaloneLcpValue = 0;
  let standaloneLcpEntry;
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_7__.supportsWebVital)("largest-contentful-paint")) {
    return;
  }
  const cleanupLcpHandler = (0,_instrument_js__WEBPACK_IMPORTED_MODULE_6__.addLcpInstrumentationHandler)(({ metric }) => {
    const entry = metric.entries[metric.entries.length - 1];
    if (!entry) {
      return;
    }
    standaloneLcpValue = metric.value;
    standaloneLcpEntry = entry;
  }, true);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_7__.listenForWebVitalReportEvents)(client, (reportEvent, pageloadSpanId) => {
    _sendStandaloneLcpSpan(standaloneLcpValue, standaloneLcpEntry, pageloadSpanId, reportEvent);
    cleanupLcpHandler();
  });
}
function _sendStandaloneLcpSpan(lcpValue, entry, pageloadSpanId, reportEvent) {
  _debug_build_js__WEBPACK_IMPORTED_MODULE_5__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_3__.debug.log(`Sending LCP span (${lcpValue})`);
  const startTime = (0,_utils_js__WEBPACK_IMPORTED_MODULE_7__.msToSec)(((0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.browserPerformanceTimeOrigin)() || 0) + ((entry == null ? void 0 : entry.startTime) || 0));
  const routeName = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getCurrentScope)().getScopeData().transactionName;
  const name = entry ? (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.htmlTreeAsString)(entry.element) : "Largest contentful paint";
  const attributes = {
    [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.browser.lcp",
    [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_OP]: "ui.webvital.lcp",
    [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME]: 0,
    // LCP is a point-in-time metric
    // attach the pageload span id to the LCP span so that we can link them in the UI
    "sentry.pageload.span_id": pageloadSpanId,
    // describes what triggered the web vital to be reported
    "sentry.report_event": reportEvent
  };
  if (entry) {
    entry.element && (attributes["lcp.element"] = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.htmlTreeAsString)(entry.element));
    entry.id && (attributes["lcp.id"] = entry.id);
    entry.url && (attributes["lcp.url"] = entry.url.trim().slice(0, 200));
    entry.loadTime != null && (attributes["lcp.loadTime"] = entry.loadTime);
    entry.renderTime != null && (attributes["lcp.renderTime"] = entry.renderTime);
    entry.size != null && (attributes["lcp.size"] = entry.size);
  }
  const span = (0,_utils_js__WEBPACK_IMPORTED_MODULE_7__.startStandaloneWebVitalSpan)({
    name,
    transaction: routeName,
    attributes,
    startTime
  });
  if (span) {
    span.addEvent("lcp", {
      [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT]: "millisecond",
      [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE]: lcpValue
    });
    span.end(startTime);
  }
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/utils.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/utils.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractNetworkProtocol: () => (/* binding */ extractNetworkProtocol),
/* harmony export */   getBrowserPerformanceAPI: () => (/* binding */ getBrowserPerformanceAPI),
/* harmony export */   isMeasurementValue: () => (/* binding */ isMeasurementValue),
/* harmony export */   listenForWebVitalReportEvents: () => (/* binding */ listenForWebVitalReportEvents),
/* harmony export */   msToSec: () => (/* binding */ msToSec),
/* harmony export */   startAndEndSpan: () => (/* binding */ startAndEndSpan),
/* harmony export */   startStandaloneWebVitalSpan: () => (/* binding */ startStandaloneWebVitalSpan),
/* harmony export */   supportsWebVital: () => (/* binding */ supportsWebVital)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/tracing/trace.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");
/* harmony import */ var _web_vitals_lib_onHidden_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-vitals/lib/onHidden.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/onHidden.js");



function isMeasurementValue(value) {
  return typeof value === "number" && isFinite(value);
}
function startAndEndSpan(parentSpan, startTimeInSeconds, endTime, { ...ctx }) {
  const parentStartTime = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.spanToJSON)(parentSpan).start_timestamp;
  if (parentStartTime && parentStartTime > startTimeInSeconds) {
    if (typeof parentSpan.updateStartTime === "function") {
      parentSpan.updateStartTime(startTimeInSeconds);
    }
  }
  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.withActiveSpan)(parentSpan, () => {
    const span = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.startInactiveSpan)({
      startTime: startTimeInSeconds,
      ...ctx
    });
    if (span) {
      span.end(endTime);
    }
    return span;
  });
}
function startStandaloneWebVitalSpan(options) {
  var _a;
  const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getClient)();
  if (!client) {
    return;
  }
  const { name, transaction, attributes: passedAttributes, startTime } = options;
  const { release, environment, sendDefaultPii } = client.getOptions();
  const replay = client.getIntegrationByName("Replay");
  const replayId = replay == null ? void 0 : replay.getReplayId();
  const scope = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getCurrentScope)();
  const user = scope.getUser();
  const userDisplay = user !== void 0 ? user.email || user.id || user.ip_address : void 0;
  let profileId;
  try {
    profileId = scope.getScopeData().contexts.profile.profile_id;
  } catch {
  }
  const attributes = {
    release,
    environment,
    user: userDisplay || void 0,
    profile_id: profileId || void 0,
    replay_id: replayId || void 0,
    transaction,
    // Web vital score calculation relies on the user agent to account for different
    // browsers setting different thresholds for what is considered a good/meh/bad value.
    // For example: Chrome vs. Chrome Mobile
    "user_agent.original": (_a = _types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.navigator) == null ? void 0 : _a.userAgent,
    // This tells Sentry to infer the IP address from the request
    "client.address": sendDefaultPii ? "{{auto}}" : void 0,
    ...passedAttributes
  };
  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.startInactiveSpan)({
    name,
    attributes,
    startTime,
    experimental: {
      standalone: true
    }
  });
}
function getBrowserPerformanceAPI() {
  return _types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.addEventListener && _types_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.performance;
}
function msToSec(time) {
  return time / 1e3;
}
function extractNetworkProtocol(nextHopProtocol) {
  let name = "unknown";
  let version = "unknown";
  let _name = "";
  for (const char of nextHopProtocol) {
    if (char === "/") {
      [name, version] = nextHopProtocol.split("/");
      break;
    }
    if (!isNaN(Number(char))) {
      name = _name === "h" ? "http" : _name;
      version = nextHopProtocol.split(_name)[1];
      break;
    }
    _name += char;
  }
  if (_name === nextHopProtocol) {
    name = _name;
  }
  return { name, version };
}
function supportsWebVital(entryType) {
  try {
    return PerformanceObserver.supportedEntryTypes.includes(entryType);
  } catch {
    return false;
  }
}
function listenForWebVitalReportEvents(client, collectorCallback) {
  let pageloadSpanId;
  let collected = false;
  function _runCollectorCallbackOnce(event) {
    if (!collected && pageloadSpanId) {
      collectorCallback(event, pageloadSpanId);
    }
    collected = true;
  }
  (0,_web_vitals_lib_onHidden_js__WEBPACK_IMPORTED_MODULE_4__.onHidden)(() => {
    _runCollectorCallbackOnce("pagehide");
  });
  const unsubscribeStartNavigation = client.on("beforeStartNavigationSpan", (_, options) => {
    if (!(options == null ? void 0 : options.isRedirect)) {
      _runCollectorCallbackOnce("navigation");
      unsubscribeStartNavigation == null ? void 0 : unsubscribeStartNavigation();
      unsubscribeAfterStartPageLoadSpan == null ? void 0 : unsubscribeAfterStartPageLoadSpan();
    }
  });
  const unsubscribeAfterStartPageLoadSpan = client.on("afterStartPageLoadSpan", (span) => {
    pageloadSpanId = span.spanContext().spanId;
    unsubscribeAfterStartPageLoadSpan == null ? void 0 : unsubscribeAfterStartPageLoadSpan();
  });
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/getCLS.js":
/*!************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/getCLS.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onCLS: () => (/* binding */ onCLS)
/* harmony export */ });
/* unused harmony export CLSThresholds */
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");
/* harmony import */ var _lib_bindReporter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/bindReporter.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/bindReporter.js");
/* harmony import */ var _lib_initMetric_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/initMetric.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/initMetric.js");
/* harmony import */ var _lib_initUnique_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/initUnique.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/initUnique.js");
/* harmony import */ var _lib_LayoutShiftManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/LayoutShiftManager.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/LayoutShiftManager.js");
/* harmony import */ var _lib_observe_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/observe.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/observe.js");
/* harmony import */ var _lib_runOnce_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/runOnce.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/runOnce.js");
/* harmony import */ var _onFCP_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./onFCP.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/onFCP.js");








const CLSThresholds = [0.1, 0.25];
const onCLS = (onReport, opts = {}) => {
  (0,_onFCP_js__WEBPACK_IMPORTED_MODULE_7__.onFCP)(
    (0,_lib_runOnce_js__WEBPACK_IMPORTED_MODULE_6__.runOnce)(() => {
      var _a, _b, _c;
      const metric = (0,_lib_initMetric_js__WEBPACK_IMPORTED_MODULE_2__.initMetric)("CLS", 0);
      let report;
      const layoutShiftManager = (0,_lib_initUnique_js__WEBPACK_IMPORTED_MODULE_3__.initUnique)(opts, _lib_LayoutShiftManager_js__WEBPACK_IMPORTED_MODULE_4__.LayoutShiftManager);
      const handleEntries = (entries) => {
        for (const entry of entries) {
          layoutShiftManager._processEntry(entry);
        }
        if (layoutShiftManager._sessionValue > metric.value) {
          metric.value = layoutShiftManager._sessionValue;
          metric.entries = layoutShiftManager._sessionEntries;
          report();
        }
      };
      const po = (0,_lib_observe_js__WEBPACK_IMPORTED_MODULE_5__.observe)("layout-shift", handleEntries);
      if (po) {
        report = (0,_lib_bindReporter_js__WEBPACK_IMPORTED_MODULE_1__.bindReporter)(onReport, metric, CLSThresholds, opts.reportAllChanges);
        (_a = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) == null ? void 0 : _a.addEventListener("visibilitychange", () => {
          var _a2;
          if (((_a2 = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) == null ? void 0 : _a2.visibilityState) === "hidden") {
            handleEntries(po.takeRecords());
            report(true);
          }
        });
        (_c = (_b = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW) == null ? void 0 : _b.setTimeout) == null ? void 0 : _c.call(_b, report);
      }
    })
  );
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/getINP.js":
/*!************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/getINP.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onINP: () => (/* binding */ onINP)
/* harmony export */ });
/* unused harmony export INPThresholds */
/* harmony import */ var _lib_bindReporter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/bindReporter.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/bindReporter.js");
/* harmony import */ var _lib_initMetric_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/initMetric.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/initMetric.js");
/* harmony import */ var _lib_initUnique_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/initUnique.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/initUnique.js");
/* harmony import */ var _lib_InteractionManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/InteractionManager.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/InteractionManager.js");
/* harmony import */ var _lib_observe_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/observe.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/observe.js");
/* harmony import */ var _lib_onHidden_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/onHidden.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/onHidden.js");
/* harmony import */ var _lib_polyfills_interactionCountPolyfill_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/polyfills/interactionCountPolyfill.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/polyfills/interactionCountPolyfill.js");
/* harmony import */ var _lib_whenActivated_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/whenActivated.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/whenActivated.js");
/* harmony import */ var _lib_whenIdleOrHidden_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/whenIdleOrHidden.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/whenIdleOrHidden.js");









const INPThresholds = [200, 500];
const DEFAULT_DURATION_THRESHOLD = 40;
const onINP = (onReport, opts = {}) => {
  if (!(globalThis.PerformanceEventTiming && "interactionId" in PerformanceEventTiming.prototype)) {
    return;
  }
  (0,_lib_whenActivated_js__WEBPACK_IMPORTED_MODULE_7__.whenActivated)(() => {
    var _a;
    (0,_lib_polyfills_interactionCountPolyfill_js__WEBPACK_IMPORTED_MODULE_6__.initInteractionCountPolyfill)();
    const metric = (0,_lib_initMetric_js__WEBPACK_IMPORTED_MODULE_1__.initMetric)("INP");
    let report;
    const interactionManager = (0,_lib_initUnique_js__WEBPACK_IMPORTED_MODULE_2__.initUnique)(opts, _lib_InteractionManager_js__WEBPACK_IMPORTED_MODULE_3__.InteractionManager);
    const handleEntries = (entries) => {
      (0,_lib_whenIdleOrHidden_js__WEBPACK_IMPORTED_MODULE_8__.whenIdleOrHidden)(() => {
        for (const entry of entries) {
          interactionManager._processEntry(entry);
        }
        const inp = interactionManager._estimateP98LongestInteraction();
        if (inp && inp._latency !== metric.value) {
          metric.value = inp._latency;
          metric.entries = inp.entries;
          report();
        }
      });
    };
    const po = (0,_lib_observe_js__WEBPACK_IMPORTED_MODULE_4__.observe)("event", handleEntries, {
      // Event Timing entries have their durations rounded to the nearest 8ms,
      // so a duration of 40ms would be any event that spans 2.5 or more frames
      // at 60Hz. This threshold is chosen to strike a balance between usefulness
      // and performance. Running this callback for any interaction that spans
      // just one or two frames is likely not worth the insight that could be
      // gained.
      durationThreshold: (_a = opts.durationThreshold) != null ? _a : DEFAULT_DURATION_THRESHOLD
    });
    report = (0,_lib_bindReporter_js__WEBPACK_IMPORTED_MODULE_0__.bindReporter)(onReport, metric, INPThresholds, opts.reportAllChanges);
    if (po) {
      po.observe({ type: "first-input", buffered: true });
      (0,_lib_onHidden_js__WEBPACK_IMPORTED_MODULE_5__.onHidden)(() => {
        handleEntries(po.takeRecords());
        report(true);
      });
    }
  });
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/getLCP.js":
/*!************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/getLCP.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onLCP: () => (/* binding */ onLCP)
/* harmony export */ });
/* unused harmony export LCPThresholds */
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");
/* harmony import */ var _lib_bindReporter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/bindReporter.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/bindReporter.js");
/* harmony import */ var _lib_getActivationStart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/getActivationStart.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getActivationStart.js");
/* harmony import */ var _lib_getVisibilityWatcher_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/getVisibilityWatcher.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getVisibilityWatcher.js");
/* harmony import */ var _lib_initMetric_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/initMetric.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/initMetric.js");
/* harmony import */ var _lib_initUnique_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/initUnique.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/initUnique.js");
/* harmony import */ var _lib_LCPEntryManager_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/LCPEntryManager.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/LCPEntryManager.js");
/* harmony import */ var _lib_observe_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/observe.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/observe.js");
/* harmony import */ var _lib_runOnce_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/runOnce.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/runOnce.js");
/* harmony import */ var _lib_whenActivated_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/whenActivated.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/whenActivated.js");
/* harmony import */ var _lib_whenIdleOrHidden_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/whenIdleOrHidden.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/whenIdleOrHidden.js");











const LCPThresholds = [2500, 4e3];
const onLCP = (onReport, opts = {}) => {
  (0,_lib_whenActivated_js__WEBPACK_IMPORTED_MODULE_9__.whenActivated)(() => {
    const visibilityWatcher = (0,_lib_getVisibilityWatcher_js__WEBPACK_IMPORTED_MODULE_3__.getVisibilityWatcher)();
    const metric = (0,_lib_initMetric_js__WEBPACK_IMPORTED_MODULE_4__.initMetric)("LCP");
    let report;
    const lcpEntryManager = (0,_lib_initUnique_js__WEBPACK_IMPORTED_MODULE_5__.initUnique)(opts, _lib_LCPEntryManager_js__WEBPACK_IMPORTED_MODULE_6__.LCPEntryManager);
    const handleEntries = (entries) => {
      if (!opts.reportAllChanges) {
        entries = entries.slice(-1);
      }
      for (const entry of entries) {
        lcpEntryManager._processEntry(entry);
        if (entry.startTime < visibilityWatcher.firstHiddenTime) {
          metric.value = Math.max(entry.startTime - (0,_lib_getActivationStart_js__WEBPACK_IMPORTED_MODULE_2__.getActivationStart)(), 0);
          metric.entries = [entry];
          report();
        }
      }
    };
    const po = (0,_lib_observe_js__WEBPACK_IMPORTED_MODULE_7__.observe)("largest-contentful-paint", handleEntries);
    if (po) {
      report = (0,_lib_bindReporter_js__WEBPACK_IMPORTED_MODULE_1__.bindReporter)(onReport, metric, LCPThresholds, opts.reportAllChanges);
      const stopListening = (0,_lib_runOnce_js__WEBPACK_IMPORTED_MODULE_8__.runOnce)(() => {
        handleEntries(po.takeRecords());
        po.disconnect();
        report(true);
      });
      for (const type of ["keydown", "click", "visibilitychange"]) {
        if (_types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) {
          addEventListener(type, () => (0,_lib_whenIdleOrHidden_js__WEBPACK_IMPORTED_MODULE_10__.whenIdleOrHidden)(stopListening), {
            capture: true,
            once: true
          });
        }
      }
    }
  });
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/InteractionManager.js":
/*!****************************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/InteractionManager.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InteractionManager: () => (/* binding */ InteractionManager)
/* harmony export */ });
/* harmony import */ var _polyfills_interactionCountPolyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills/interactionCountPolyfill.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/polyfills/interactionCountPolyfill.js");

const MAX_INTERACTIONS_TO_CONSIDER = 10;
let prevInteractionCount = 0;
const getInteractionCountForNavigation = () => {
  return (0,_polyfills_interactionCountPolyfill_js__WEBPACK_IMPORTED_MODULE_0__.getInteractionCount)() - prevInteractionCount;
};
class InteractionManager {
  constructor() {
    InteractionManager.prototype.__init.call(this);
    InteractionManager.prototype.__init2.call(this);
  }
  /**
   * A list of longest interactions on the page (by latency) sorted so the
   * longest one is first. The list is at most MAX_INTERACTIONS_TO_CONSIDER
   * long.
   */
  // eslint-disable-next-line @sentry-internal/sdk/no-class-field-initializers, @typescript-eslint/explicit-member-accessibility
  __init() {
    this._longestInteractionList = [];
  }
  /**
   * A mapping of longest interactions by their interaction ID.
   * This is used for faster lookup.
   */
  // eslint-disable-next-line @sentry-internal/sdk/no-class-field-initializers, @typescript-eslint/explicit-member-accessibility
  __init2() {
    this._longestInteractionMap = /* @__PURE__ */ new Map();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility, jsdoc/require-jsdoc
  _resetInteractions() {
    prevInteractionCount = (0,_polyfills_interactionCountPolyfill_js__WEBPACK_IMPORTED_MODULE_0__.getInteractionCount)();
    this._longestInteractionList.length = 0;
    this._longestInteractionMap.clear();
  }
  /**
   * Returns the estimated p98 longest interaction based on the stored
   * interaction candidates and the interaction count for the current page.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  _estimateP98LongestInteraction() {
    const candidateInteractionIndex = Math.min(
      this._longestInteractionList.length - 1,
      Math.floor(getInteractionCountForNavigation() / 50)
    );
    return this._longestInteractionList[candidateInteractionIndex];
  }
  /**
   * Takes a performance entry and adds it to the list of worst interactions
   * if its duration is long enough to make it among the worst. If the
   * entry is part of an existing interaction, it is merged and the latency
   * and entries list is updated as needed.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  _processEntry(entry) {
    var _a, _b;
    (_a = this._onBeforeProcessingEntry) == null ? void 0 : _a.call(this, entry);
    if (!(entry.interactionId || entry.entryType === "first-input")) return;
    const minLongestInteraction = this._longestInteractionList.at(-1);
    let interaction = this._longestInteractionMap.get(entry.interactionId);
    if (interaction || this._longestInteractionList.length < MAX_INTERACTIONS_TO_CONSIDER || // If the above conditions are false, `minLongestInteraction` will be set.
    entry.duration > minLongestInteraction._latency) {
      if (interaction) {
        if (entry.duration > interaction._latency) {
          interaction.entries = [entry];
          interaction._latency = entry.duration;
        } else if (entry.duration === interaction._latency && entry.startTime === interaction.entries[0].startTime) {
          interaction.entries.push(entry);
        }
      } else {
        interaction = {
          id: entry.interactionId,
          entries: [entry],
          _latency: entry.duration
        };
        this._longestInteractionMap.set(interaction.id, interaction);
        this._longestInteractionList.push(interaction);
      }
      this._longestInteractionList.sort((a, b) => b._latency - a._latency);
      if (this._longestInteractionList.length > MAX_INTERACTIONS_TO_CONSIDER) {
        const removedInteractions = this._longestInteractionList.splice(MAX_INTERACTIONS_TO_CONSIDER);
        for (const interaction2 of removedInteractions) {
          this._longestInteractionMap.delete(interaction2.id);
        }
      }
      (_b = this._onAfterProcessingINPCandidate) == null ? void 0 : _b.call(this, interaction);
    }
  }
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/LCPEntryManager.js":
/*!*************************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/LCPEntryManager.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LCPEntryManager: () => (/* binding */ LCPEntryManager)
/* harmony export */ });
class LCPEntryManager {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility, jsdoc/require-jsdoc
  _processEntry(entry) {
    var _a;
    (_a = this._onBeforeProcessingEntry) == null ? void 0 : _a.call(this, entry);
  }
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/LayoutShiftManager.js":
/*!****************************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/LayoutShiftManager.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayoutShiftManager: () => (/* binding */ LayoutShiftManager)
/* harmony export */ });
class LayoutShiftManager {
  constructor() {
    LayoutShiftManager.prototype.__init.call(this);
    LayoutShiftManager.prototype.__init2.call(this);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  // eslint-disable-next-line @sentry-internal/sdk/no-class-field-initializers, @typescript-eslint/explicit-member-accessibility
  __init() {
    this._sessionValue = 0;
  }
  // eslint-disable-next-line @sentry-internal/sdk/no-class-field-initializers, @typescript-eslint/explicit-member-accessibility
  __init2() {
    this._sessionEntries = [];
  }
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  _processEntry(entry) {
    var _a;
    if (entry.hadRecentInput) return;
    const firstSessionEntry = this._sessionEntries[0];
    const lastSessionEntry = this._sessionEntries[this._sessionEntries.length - 1];
    if (this._sessionValue && firstSessionEntry && lastSessionEntry && entry.startTime - lastSessionEntry.startTime < 1e3 && entry.startTime - firstSessionEntry.startTime < 5e3) {
      this._sessionValue += entry.value;
      this._sessionEntries.push(entry);
    } else {
      this._sessionValue = entry.value;
      this._sessionEntries = [entry];
    }
    (_a = this._onAfterProcessingUnexpectedShift) == null ? void 0 : _a.call(this, entry);
  }
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/bindReporter.js":
/*!**********************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/bindReporter.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindReporter: () => (/* binding */ bindReporter)
/* harmony export */ });
const getRating = (value, thresholds) => {
  if (value > thresholds[1]) {
    return "poor";
  }
  if (value > thresholds[0]) {
    return "needs-improvement";
  }
  return "good";
};
const bindReporter = (callback, metric, thresholds, reportAllChanges) => {
  let prevValue;
  let delta;
  return (forceReport) => {
    if (metric.value >= 0) {
      if (forceReport || reportAllChanges) {
        delta = metric.value - (prevValue != null ? prevValue : 0);
        if (delta || prevValue === void 0) {
          prevValue = metric.value;
          metric.delta = delta;
          metric.rating = getRating(metric.value, thresholds);
          callback(metric);
        }
      }
    }
  };
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/generateUniqueID.js":
/*!**************************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/generateUniqueID.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateUniqueID: () => (/* binding */ generateUniqueID)
/* harmony export */ });
const generateUniqueID = () => {
  return `v5-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getActivationStart.js":
/*!****************************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getActivationStart.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getActivationStart: () => (/* binding */ getActivationStart)
/* harmony export */ });
/* harmony import */ var _getNavigationEntry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNavigationEntry.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getNavigationEntry.js");

const getActivationStart = () => {
  var _a;
  const navEntry = (0,_getNavigationEntry_js__WEBPACK_IMPORTED_MODULE_0__.getNavigationEntry)();
  return (_a = navEntry == null ? void 0 : navEntry.activationStart) != null ? _a : 0;
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getNavigationEntry.js":
/*!****************************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getNavigationEntry.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNavigationEntry: () => (/* binding */ getNavigationEntry)
/* harmony export */ });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");

const getNavigationEntry = (checkResponseStart = true) => {
  var _a, _b;
  const navigationEntry = (_b = (_a = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.performance) == null ? void 0 : _a.getEntriesByType) == null ? void 0 : _b.call(_a, "navigation")[0];
  if (
    // sentry-specific change:
    // We don't want to check for responseStart for our own use of `getNavigationEntry`
    !checkResponseStart || navigationEntry && navigationEntry.responseStart > 0 && navigationEntry.responseStart < performance.now()
  ) {
    return navigationEntry;
  }
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getVisibilityWatcher.js":
/*!******************************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getVisibilityWatcher.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getVisibilityWatcher: () => (/* binding */ getVisibilityWatcher)
/* harmony export */ });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");
/* harmony import */ var _getActivationStart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getActivationStart.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getActivationStart.js");


let firstHiddenTime = -1;
const initHiddenTime = () => {
  var _a, _b;
  return ((_a = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) == null ? void 0 : _a.visibilityState) === "hidden" && !((_b = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) == null ? void 0 : _b.prerendering) ? 0 : Infinity;
};
const onVisibilityUpdate = (event) => {
  if (_types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document.visibilityState === "hidden" && firstHiddenTime > -1) {
    firstHiddenTime = event.type === "visibilitychange" ? event.timeStamp : 0;
    removeChangeListeners();
  }
};
const addChangeListeners = () => {
  addEventListener("visibilitychange", onVisibilityUpdate, true);
  addEventListener("prerenderingchange", onVisibilityUpdate, true);
};
const removeChangeListeners = () => {
  removeEventListener("visibilitychange", onVisibilityUpdate, true);
  removeEventListener("prerenderingchange", onVisibilityUpdate, true);
};
const getVisibilityWatcher = () => {
  var _a;
  if (_types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document && firstHiddenTime < 0) {
    const activationStart = (0,_getActivationStart_js__WEBPACK_IMPORTED_MODULE_1__.getActivationStart)();
    const firstVisibilityStateHiddenTime = !_types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document.prerendering ? (_a = globalThis.performance.getEntriesByType("visibility-state").filter((e) => e.name === "hidden" && e.startTime > activationStart)[0]) == null ? void 0 : _a.startTime : void 0;
    firstHiddenTime = firstVisibilityStateHiddenTime != null ? firstVisibilityStateHiddenTime : initHiddenTime();
    addChangeListeners();
  }
  return {
    get firstHiddenTime() {
      return firstHiddenTime;
    }
  };
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/initMetric.js":
/*!********************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/initMetric.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initMetric: () => (/* binding */ initMetric)
/* harmony export */ });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");
/* harmony import */ var _generateUniqueID_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generateUniqueID.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/generateUniqueID.js");
/* harmony import */ var _getActivationStart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getActivationStart.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getActivationStart.js");
/* harmony import */ var _getNavigationEntry_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getNavigationEntry.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getNavigationEntry.js");




const initMetric = (name, value = -1) => {
  var _a, _b;
  const navEntry = (0,_getNavigationEntry_js__WEBPACK_IMPORTED_MODULE_3__.getNavigationEntry)();
  let navigationType = "navigate";
  if (navEntry) {
    if (((_a = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) == null ? void 0 : _a.prerendering) || (0,_getActivationStart_js__WEBPACK_IMPORTED_MODULE_2__.getActivationStart)() > 0) {
      navigationType = "prerender";
    } else if ((_b = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) == null ? void 0 : _b.wasDiscarded) {
      navigationType = "restore";
    } else if (navEntry.type) {
      navigationType = navEntry.type.replace(/_/g, "-");
    }
  }
  const entries = [];
  return {
    name,
    value,
    rating: "good",
    // If needed, will be updated when reported. `const` to keep the type from widening to `string`.
    delta: 0,
    entries,
    id: (0,_generateUniqueID_js__WEBPACK_IMPORTED_MODULE_1__.generateUniqueID)(),
    navigationType
  };
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/initUnique.js":
/*!********************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/initUnique.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initUnique: () => (/* binding */ initUnique)
/* harmony export */ });
const instanceMap = /* @__PURE__ */ new WeakMap();
function initUnique(identityObj, ClassObj) {
  if (!instanceMap.get(identityObj)) {
    instanceMap.set(identityObj, new ClassObj());
  }
  return instanceMap.get(identityObj);
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/observe.js":
/*!*****************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/observe.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observe: () => (/* binding */ observe)
/* harmony export */ });
const observe = (type, callback, opts = {}) => {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(type)) {
      const po = new PerformanceObserver((list) => {
        Promise.resolve().then(() => {
          callback(list.getEntries());
        });
      });
      po.observe({ type, buffered: true, ...opts });
      return po;
    }
  } catch {
  }
  return;
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/onHidden.js":
/*!******************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/onHidden.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onHidden: () => (/* binding */ onHidden)
/* harmony export */ });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");

const onHidden = (cb) => {
  const onHiddenOrPageHide = (event) => {
    var _a;
    if (event.type === "pagehide" || ((_a = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) == null ? void 0 : _a.visibilityState) === "hidden") {
      cb(event);
    }
  };
  if (_types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) {
    addEventListener("visibilitychange", onHiddenOrPageHide, true);
    addEventListener("pagehide", onHiddenOrPageHide, true);
  }
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/polyfills/interactionCountPolyfill.js":
/*!********************************************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/polyfills/interactionCountPolyfill.js ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getInteractionCount: () => (/* binding */ getInteractionCount),
/* harmony export */   initInteractionCountPolyfill: () => (/* binding */ initInteractionCountPolyfill)
/* harmony export */ });
/* harmony import */ var _observe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observe.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/observe.js");

let interactionCountEstimate = 0;
let minKnownInteractionId = Infinity;
let maxKnownInteractionId = 0;
const updateEstimate = (entries) => {
  entries.forEach((e) => {
    if (e.interactionId) {
      minKnownInteractionId = Math.min(minKnownInteractionId, e.interactionId);
      maxKnownInteractionId = Math.max(maxKnownInteractionId, e.interactionId);
      interactionCountEstimate = maxKnownInteractionId ? (maxKnownInteractionId - minKnownInteractionId) / 7 + 1 : 0;
    }
  });
};
let po;
const getInteractionCount = () => {
  return po ? interactionCountEstimate : performance.interactionCount || 0;
};
const initInteractionCountPolyfill = () => {
  if ("interactionCount" in performance || po) return;
  po = (0,_observe_js__WEBPACK_IMPORTED_MODULE_0__.observe)("event", updateEstimate, {
    type: "event",
    buffered: true,
    durationThreshold: 0
  });
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/runOnce.js":
/*!*****************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/runOnce.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runOnce: () => (/* binding */ runOnce)
/* harmony export */ });
const runOnce = (cb) => {
  let called = false;
  return () => {
    if (!called) {
      cb();
      called = true;
    }
  };
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/whenActivated.js":
/*!***********************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/whenActivated.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   whenActivated: () => (/* binding */ whenActivated)
/* harmony export */ });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");

const whenActivated = (callback) => {
  var _a;
  if ((_a = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) == null ? void 0 : _a.prerendering) {
    addEventListener("prerenderingchange", () => callback(), true);
  } else {
    callback();
  }
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/whenIdleOrHidden.js":
/*!**************************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/whenIdleOrHidden.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   whenIdleOrHidden: () => (/* binding */ whenIdleOrHidden)
/* harmony export */ });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");
/* harmony import */ var _onHidden_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./onHidden.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/onHidden.js");
/* harmony import */ var _runOnce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./runOnce.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/runOnce.js");



const whenIdleOrHidden = (cb) => {
  var _a;
  const rIC = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.requestIdleCallback || _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.setTimeout;
  if (((_a = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) == null ? void 0 : _a.visibilityState) === "hidden") {
    cb();
  } else {
    cb = (0,_runOnce_js__WEBPACK_IMPORTED_MODULE_2__.runOnce)(cb);
    rIC(cb);
    (0,_onHidden_js__WEBPACK_IMPORTED_MODULE_1__.onHidden)(cb);
  }
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/onFCP.js":
/*!***********************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/onFCP.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onFCP: () => (/* binding */ onFCP)
/* harmony export */ });
/* unused harmony export FCPThresholds */
/* harmony import */ var _lib_bindReporter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/bindReporter.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/bindReporter.js");
/* harmony import */ var _lib_getActivationStart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/getActivationStart.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getActivationStart.js");
/* harmony import */ var _lib_getVisibilityWatcher_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/getVisibilityWatcher.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getVisibilityWatcher.js");
/* harmony import */ var _lib_initMetric_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/initMetric.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/initMetric.js");
/* harmony import */ var _lib_observe_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/observe.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/observe.js");
/* harmony import */ var _lib_whenActivated_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/whenActivated.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/whenActivated.js");






const FCPThresholds = [1800, 3e3];
const onFCP = (onReport, opts = {}) => {
  (0,_lib_whenActivated_js__WEBPACK_IMPORTED_MODULE_5__.whenActivated)(() => {
    const visibilityWatcher = (0,_lib_getVisibilityWatcher_js__WEBPACK_IMPORTED_MODULE_2__.getVisibilityWatcher)();
    const metric = (0,_lib_initMetric_js__WEBPACK_IMPORTED_MODULE_3__.initMetric)("FCP");
    let report;
    const handleEntries = (entries) => {
      for (const entry of entries) {
        if (entry.name === "first-contentful-paint") {
          po.disconnect();
          if (entry.startTime < visibilityWatcher.firstHiddenTime) {
            metric.value = Math.max(entry.startTime - (0,_lib_getActivationStart_js__WEBPACK_IMPORTED_MODULE_1__.getActivationStart)(), 0);
            metric.entries.push(entry);
            report(true);
          }
        }
      }
    };
    const po = (0,_lib_observe_js__WEBPACK_IMPORTED_MODULE_4__.observe)("paint", handleEntries);
    if (po) {
      report = (0,_lib_bindReporter_js__WEBPACK_IMPORTED_MODULE_0__.bindReporter)(onReport, metric, FCPThresholds, opts.reportAllChanges);
    }
  });
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/onTTFB.js":
/*!************************************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/onTTFB.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onTTFB: () => (/* binding */ onTTFB)
/* harmony export */ });
/* unused harmony export TTFBThresholds */
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js");
/* harmony import */ var _lib_bindReporter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/bindReporter.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/bindReporter.js");
/* harmony import */ var _lib_getActivationStart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/getActivationStart.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getActivationStart.js");
/* harmony import */ var _lib_getNavigationEntry_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/getNavigationEntry.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/getNavigationEntry.js");
/* harmony import */ var _lib_initMetric_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/initMetric.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/initMetric.js");
/* harmony import */ var _lib_whenActivated_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/whenActivated.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/web-vitals/lib/whenActivated.js");






const TTFBThresholds = [800, 1800];
const whenReady = (callback) => {
  var _a, _b;
  if ((_a = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) == null ? void 0 : _a.prerendering) {
    (0,_lib_whenActivated_js__WEBPACK_IMPORTED_MODULE_5__.whenActivated)(() => whenReady(callback));
  } else if (((_b = _types_js__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document) == null ? void 0 : _b.readyState) !== "complete") {
    addEventListener("load", () => whenReady(callback), true);
  } else {
    setTimeout(callback);
  }
};
const onTTFB = (onReport, opts = {}) => {
  const metric = (0,_lib_initMetric_js__WEBPACK_IMPORTED_MODULE_4__.initMetric)("TTFB");
  const report = (0,_lib_bindReporter_js__WEBPACK_IMPORTED_MODULE_1__.bindReporter)(onReport, metric, TTFBThresholds, opts.reportAllChanges);
  whenReady(() => {
    const navigationEntry = (0,_lib_getNavigationEntry_js__WEBPACK_IMPORTED_MODULE_3__.getNavigationEntry)();
    if (navigationEntry) {
      metric.value = Math.max(navigationEntry.responseStart - (0,_lib_getActivationStart_js__WEBPACK_IMPORTED_MODULE_2__.getActivationStart)(), 0);
      metric.entries = [navigationEntry];
      report(true);
    }
  });
};



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/networkUtils.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/networkUtils.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBodyString: () => (/* binding */ getBodyString),
/* harmony export */   getFetchRequestArgBody: () => (/* binding */ getFetchRequestArgBody),
/* harmony export */   serializeFormData: () => (/* binding */ serializeFormData)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug-build.js */ "../../node_modules/@sentry-internal/browser-utils/build/esm/debug-build.js");


function serializeFormData(formData) {
  return new URLSearchParams(formData).toString();
}
function getBodyString(body, _debug = _sentry_core__WEBPACK_IMPORTED_MODULE_0__.debug) {
  try {
    if (typeof body === "string") {
      return [body];
    }
    if (body instanceof URLSearchParams) {
      return [body.toString()];
    }
    if (body instanceof FormData) {
      return [serializeFormData(body)];
    }
    if (!body) {
      return [void 0];
    }
  } catch (error) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _debug.error(error, "Failed to serialize body", body);
    return [void 0, "BODY_PARSE_ERROR"];
  }
  _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _debug.log("Skipping network body because of body type", body);
  return [void 0, "UNPARSEABLE_BODY_TYPE"];
}
function getFetchRequestArgBody(fetchArgs = []) {
  if (fetchArgs.length !== 2 || typeof fetchArgs[1] !== "object") {
    return void 0;
  }
  return fetchArgs[1].body;
}



/***/ }),

/***/ "../../node_modules/@sentry-internal/browser-utils/build/esm/types.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/browser-utils/build/esm/types.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WINDOW: () => (/* binding */ WINDOW)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");

const WINDOW = _sentry_core__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ;



/***/ }),

/***/ "../../node_modules/@sentry-internal/replay/build/npm/esm/index.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@sentry-internal/replay/build/npm/esm/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   replayIntegration: () => (/* binding */ replayIntegration)
/* harmony export */ });
/* unused harmony export getReplay */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/exports.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/prepareEvent.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/isSentryRequestUrl.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/parseSampleRate.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debounce.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/breadcrumbs.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/browser.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/isBrowser.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/misc.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/normalize.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/object.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/severity.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/string.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/syncpromise.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/envelope.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/ratelimit.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/instrument.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/dom.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/history.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/getNativeImplementation.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/xhr.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/networkUtils.js");
var _a;


const WINDOW = _sentry_core__WEBPACK_IMPORTED_MODULE_11__.GLOBAL_OBJ;
const REPLAY_SESSION_KEY = "sentryReplaySession";
const REPLAY_EVENT_NAME = "replay_event";
const UNABLE_TO_SEND_REPLAY = "Unable to send Replay";
const SESSION_IDLE_PAUSE_DURATION = 3e5;
const SESSION_IDLE_EXPIRE_DURATION = 9e5;
const DEFAULT_FLUSH_MIN_DELAY = 5e3;
const DEFAULT_FLUSH_MAX_DELAY = 5500;
const BUFFER_CHECKOUT_TIME = 6e4;
const RETRY_BASE_INTERVAL = 5e3;
const RETRY_MAX_COUNT = 3;
const NETWORK_BODY_MAX_SIZE = 15e4;
const CONSOLE_ARG_MAX_SIZE = 5e3;
const SLOW_CLICK_THRESHOLD = 3e3;
const SLOW_CLICK_SCROLL_TIMEOUT = 300;
const REPLAY_MAX_EVENT_BUFFER_SIZE = 2e7;
const MIN_REPLAY_DURATION = 4999;
const MIN_REPLAY_DURATION_LIMIT = 15e3;
const MAX_REPLAY_DURATION = 36e5;
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
var NodeType$2 = /* @__PURE__ */ ((NodeType2) => {
  NodeType2[NodeType2["Document"] = 0] = "Document";
  NodeType2[NodeType2["DocumentType"] = 1] = "DocumentType";
  NodeType2[NodeType2["Element"] = 2] = "Element";
  NodeType2[NodeType2["Text"] = 3] = "Text";
  NodeType2[NodeType2["CDATA"] = 4] = "CDATA";
  NodeType2[NodeType2["Comment"] = 5] = "Comment";
  return NodeType2;
})(NodeType$2 || {});
function isElement$1(n2) {
  return n2.nodeType === n2.ELEMENT_NODE;
}
function isShadowRoot(n2) {
  const host = n2 == null ? void 0 : n2.host;
  return Boolean((host == null ? void 0 : host.shadowRoot) === n2);
}
function isNativeShadowDom(shadowRoot) {
  return Object.prototype.toString.call(shadowRoot) === "[object ShadowRoot]";
}
function fixBrowserCompatibilityIssuesInCSS(cssText) {
  if (cssText.includes(" background-clip: text;") && !cssText.includes(" -webkit-background-clip: text;")) {
    cssText = cssText.replace(
      /\sbackground-clip:\s*text;/g,
      " -webkit-background-clip: text; background-clip: text;"
    );
  }
  return cssText;
}
function escapeImportStatement(rule) {
  const { cssText } = rule;
  if (cssText.split('"').length < 3) return cssText;
  const statement = ["@import", `url(${JSON.stringify(rule.href)})`];
  if (rule.layerName === "") {
    statement.push(`layer`);
  } else if (rule.layerName) {
    statement.push(`layer(${rule.layerName})`);
  }
  if (rule.supportsText) {
    statement.push(`supports(${rule.supportsText})`);
  }
  if (rule.media.length) {
    statement.push(rule.media.mediaText);
  }
  return statement.join(" ") + ";";
}
function stringifyStylesheet(s2) {
  try {
    const rules2 = s2.rules || s2.cssRules;
    return rules2 ? fixBrowserCompatibilityIssuesInCSS(
      Array.from(rules2, stringifyRule).join("")
    ) : null;
  } catch (error) {
    return null;
  }
}
function fixAllCssProperty(rule) {
  let styles = "";
  for (let i2 = 0; i2 < rule.style.length; i2++) {
    const styleDeclaration = rule.style;
    const attribute = styleDeclaration[i2];
    const isImportant = styleDeclaration.getPropertyPriority(attribute);
    styles += `${attribute}:${styleDeclaration.getPropertyValue(attribute)}${isImportant ? ` !important` : ""};`;
  }
  return `${rule.selectorText} { ${styles} }`;
}
function stringifyRule(rule) {
  let importStringified;
  if (isCSSImportRule(rule)) {
    try {
      importStringified = // for same-origin stylesheets,
      // we can access the imported stylesheet rules directly
      stringifyStylesheet(rule.styleSheet) || // work around browser issues with the raw string `@import url(...)` statement
      escapeImportStatement(rule);
    } catch (error) {
    }
  } else if (isCSSStyleRule(rule)) {
    let cssText = rule.cssText;
    const needsSafariColonFix = rule.selectorText.includes(":");
    const needsAllFix = typeof rule.style["all"] === "string" && rule.style["all"];
    if (needsAllFix) {
      cssText = fixAllCssProperty(rule);
    }
    if (needsSafariColonFix) {
      cssText = fixSafariColons(cssText);
    }
    if (needsSafariColonFix || needsAllFix) {
      return cssText;
    }
  }
  return importStringified || rule.cssText;
}
function fixSafariColons(cssStringified) {
  const regex = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm;
  return cssStringified.replace(regex, "$1\\$2");
}
function isCSSImportRule(rule) {
  return "styleSheet" in rule;
}
function isCSSStyleRule(rule) {
  return "selectorText" in rule;
}
class Mirror {
  constructor() {
    __publicField$1(this, "idNodeMap", /* @__PURE__ */ new Map());
    __publicField$1(this, "nodeMetaMap", /* @__PURE__ */ new WeakMap());
  }
  getId(n2) {
    var _a2;
    if (!n2) return -1;
    const id = (_a2 = this.getMeta(n2)) == null ? void 0 : _a2.id;
    return id != null ? id : -1;
  }
  getNode(id) {
    return this.idNodeMap.get(id) || null;
  }
  getIds() {
    return Array.from(this.idNodeMap.keys());
  }
  getMeta(n2) {
    return this.nodeMetaMap.get(n2) || null;
  }
  // removes the node from idNodeMap
  // doesn't remove the node from nodeMetaMap
  removeNodeFromMap(n2) {
    const id = this.getId(n2);
    this.idNodeMap.delete(id);
    if (n2.childNodes) {
      n2.childNodes.forEach(
        (childNode) => this.removeNodeFromMap(childNode)
      );
    }
  }
  has(id) {
    return this.idNodeMap.has(id);
  }
  hasNode(node) {
    return this.nodeMetaMap.has(node);
  }
  add(n2, meta) {
    const id = meta.id;
    this.idNodeMap.set(id, n2);
    this.nodeMetaMap.set(n2, meta);
  }
  replace(id, n2) {
    const oldNode = this.getNode(id);
    if (oldNode) {
      const meta = this.nodeMetaMap.get(oldNode);
      if (meta) this.nodeMetaMap.set(n2, meta);
    }
    this.idNodeMap.set(id, n2);
  }
  reset() {
    this.idNodeMap = /* @__PURE__ */ new Map();
    this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }
}
function createMirror$2() {
  return new Mirror();
}
function shouldMaskInput({
  maskInputOptions,
  tagName,
  type
}) {
  if (tagName === "OPTION") {
    tagName = "SELECT";
  }
  return Boolean(
    maskInputOptions[tagName.toLowerCase()] || type && maskInputOptions[type] || type === "password" || // Default to "text" option for inputs without a "type" attribute defined
    tagName === "INPUT" && !type && maskInputOptions["text"]
  );
}
function maskInputValue({
  isMasked,
  element,
  value,
  maskInputFn
}) {
  let text = value || "";
  if (!isMasked) {
    return text;
  }
  if (maskInputFn) {
    text = maskInputFn(text, element);
  }
  return "*".repeat(text.length);
}
function toLowerCase(str) {
  return str.toLowerCase();
}
function toUpperCase(str) {
  return str.toUpperCase();
}
const ORIGINAL_ATTRIBUTE_NAME = "__rrweb_original__";
function is2DCanvasBlank(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return true;
  const chunkSize = 50;
  for (let x = 0; x < canvas.width; x += chunkSize) {
    for (let y = 0; y < canvas.height; y += chunkSize) {
      const getImageData = ctx.getImageData;
      const originalGetImageData = ORIGINAL_ATTRIBUTE_NAME in getImageData ? getImageData[ORIGINAL_ATTRIBUTE_NAME] : getImageData;
      const pixelBuffer = new Uint32Array(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        originalGetImageData.call(
          ctx,
          x,
          y,
          Math.min(chunkSize, canvas.width - x),
          Math.min(chunkSize, canvas.height - y)
        ).data.buffer
      );
      if (pixelBuffer.some((pixel) => pixel !== 0)) return false;
    }
  }
  return true;
}
function getInputType(element) {
  const type = element.type;
  return element.hasAttribute("data-rr-is-password") ? "password" : type ? (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    toLowerCase(type)
  ) : null;
}
function getInputValue(el, tagName, type) {
  if (tagName === "INPUT" && (type === "radio" || type === "checkbox")) {
    return el.getAttribute("value") || "";
  }
  return el.value;
}
function extractFileExtension(path, baseURL) {
  var _a2;
  let url;
  try {
    url = new URL(path, baseURL != null ? baseURL : window.location.href);
  } catch (err) {
    return null;
  }
  const regex = /\.([0-9a-z]+)(?:$)/i;
  const match = url.pathname.match(regex);
  return (_a2 = match == null ? void 0 : match[1]) != null ? _a2 : null;
}
const cachedImplementations$1 = {};
function getImplementation$1(name) {
  const cached = cachedImplementations$1[name];
  if (cached) {
    return cached;
  }
  const document2 = window.document;
  let impl = window[name];
  if (document2 && typeof document2.createElement === "function") {
    try {
      const sandbox = document2.createElement("iframe");
      sandbox.hidden = true;
      document2.head.appendChild(sandbox);
      const contentWindow = sandbox.contentWindow;
      if (contentWindow && contentWindow[name]) {
        impl = // eslint-disable-next-line @typescript-eslint/unbound-method
        contentWindow[name];
      }
      document2.head.removeChild(sandbox);
    } catch (e2) {
    }
  }
  return cachedImplementations$1[name] = impl.bind(
    window
  );
}
function setTimeout$2(...rest) {
  return getImplementation$1("setTimeout")(...rest);
}
function clearTimeout$1(...rest) {
  return getImplementation$1("clearTimeout")(...rest);
}
function getIframeContentDocument(iframe) {
  try {
    return iframe.contentDocument;
  } catch (e2) {
  }
}
let _id = 1;
const tagNameRegex = new RegExp("[^a-z0-9-_:]");
const IGNORED_NODE = -2;
function genId() {
  return _id++;
}
function getValidTagName$1(element) {
  if (element instanceof HTMLFormElement) {
    return "form";
  }
  const processedTagName = toLowerCase(element.tagName);
  if (tagNameRegex.test(processedTagName)) {
    return "div";
  }
  return processedTagName;
}
function extractOrigin(url) {
  let origin = "";
  if (url.indexOf("//") > -1) {
    origin = url.split("/").slice(0, 3).join("/");
  } else {
    origin = url.split("/")[0];
  }
  origin = origin.split("?")[0];
  return origin;
}
let canvasService;
let canvasCtx;
const URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm;
const URL_PROTOCOL_MATCH = /^(?:[a-z+]+:)?\/\//i;
const URL_WWW_MATCH = /^www\..*/i;
const DATA_URI = /^(data:)([^,]*),(.*)/i;
function absoluteToStylesheet(cssText, href) {
  return (cssText || "").replace(
    URL_IN_CSS_REF,
    (origin, quote1, path1, quote2, path2, path3) => {
      const filePath = path1 || path2 || path3;
      const maybeQuote = quote1 || quote2 || "";
      if (!filePath) {
        return origin;
      }
      if (URL_PROTOCOL_MATCH.test(filePath) || URL_WWW_MATCH.test(filePath)) {
        return `url(${maybeQuote}${filePath}${maybeQuote})`;
      }
      if (DATA_URI.test(filePath)) {
        return `url(${maybeQuote}${filePath}${maybeQuote})`;
      }
      if (filePath[0] === "/") {
        return `url(${maybeQuote}${extractOrigin(href) + filePath}${maybeQuote})`;
      }
      const stack = href.split("/");
      const parts = filePath.split("/");
      stack.pop();
      for (const part of parts) {
        if (part === ".") {
          continue;
        } else if (part === "..") {
          stack.pop();
        } else {
          stack.push(part);
        }
      }
      return `url(${maybeQuote}${stack.join("/")}${maybeQuote})`;
    }
  );
}
const SRCSET_NOT_SPACES = /^[^ \t\n\r\u000c]+/;
const SRCSET_COMMAS_OR_SPACES = /^[, \t\n\r\u000c]+/;
function getAbsoluteSrcsetString(doc, attributeValue) {
  if (attributeValue.trim() === "") {
    return attributeValue;
  }
  let pos = 0;
  function collectCharacters(regEx) {
    let chars2;
    const match = regEx.exec(attributeValue.substring(pos));
    if (match) {
      chars2 = match[0];
      pos += chars2.length;
      return chars2;
    }
    return "";
  }
  const output = [];
  while (true) {
    collectCharacters(SRCSET_COMMAS_OR_SPACES);
    if (pos >= attributeValue.length) {
      break;
    }
    let url = collectCharacters(SRCSET_NOT_SPACES);
    if (url.slice(-1) === ",") {
      url = absoluteToDoc(doc, url.substring(0, url.length - 1));
      output.push(url);
    } else {
      let descriptorsStr = "";
      url = absoluteToDoc(doc, url);
      let inParens = false;
      while (true) {
        const c2 = attributeValue.charAt(pos);
        if (c2 === "") {
          output.push((url + descriptorsStr).trim());
          break;
        } else if (!inParens) {
          if (c2 === ",") {
            pos += 1;
            output.push((url + descriptorsStr).trim());
            break;
          } else if (c2 === "(") {
            inParens = true;
          }
        } else {
          if (c2 === ")") {
            inParens = false;
          }
        }
        descriptorsStr += c2;
        pos += 1;
      }
    }
  }
  return output.join(", ");
}
const cachedDocument = /* @__PURE__ */ new WeakMap();
function absoluteToDoc(doc, attributeValue) {
  if (!attributeValue || attributeValue.trim() === "") {
    return attributeValue;
  }
  return getHref(doc, attributeValue);
}
function isSVGElement(el) {
  return Boolean(el.tagName === "svg" || el.ownerSVGElement);
}
function getHref(doc, customHref) {
  let a2 = cachedDocument.get(doc);
  if (!a2) {
    a2 = doc.createElement("a");
    cachedDocument.set(doc, a2);
  }
  if (!customHref) {
    customHref = "";
  } else if (customHref.startsWith("blob:") || customHref.startsWith("data:")) {
    return customHref;
  }
  a2.setAttribute("href", customHref);
  return a2.href;
}
function transformAttribute(doc, tagName, name, value, element, maskAttributeFn) {
  if (!value) {
    return value;
  }
  if (name === "src" || name === "href" && !(tagName === "use" && value[0] === "#")) {
    return absoluteToDoc(doc, value);
  } else if (name === "xlink:href" && value[0] !== "#") {
    return absoluteToDoc(doc, value);
  } else if (name === "background" && (tagName === "table" || tagName === "td" || tagName === "th")) {
    return absoluteToDoc(doc, value);
  } else if (name === "srcset") {
    return getAbsoluteSrcsetString(doc, value);
  } else if (name === "style") {
    return absoluteToStylesheet(value, getHref(doc));
  } else if (tagName === "object" && name === "data") {
    return absoluteToDoc(doc, value);
  }
  if (typeof maskAttributeFn === "function") {
    return maskAttributeFn(name, value, element);
  }
  return value;
}
function ignoreAttribute(tagName, name, _value) {
  return (tagName === "video" || tagName === "audio") && name === "autoplay";
}
function _isBlockedElement(element, blockClass, blockSelector, unblockSelector) {
  try {
    if (unblockSelector && element.matches(unblockSelector)) {
      return false;
    }
    if (typeof blockClass === "string") {
      if (element.classList.contains(blockClass)) {
        return true;
      }
    } else {
      for (let eIndex = element.classList.length; eIndex--; ) {
        const className = element.classList[eIndex];
        if (blockClass.test(className)) {
          return true;
        }
      }
    }
    if (blockSelector) {
      return element.matches(blockSelector);
    }
  } catch (e2) {
  }
  return false;
}
function elementClassMatchesRegex(el, regex) {
  for (let eIndex = el.classList.length; eIndex--; ) {
    const className = el.classList[eIndex];
    if (regex.test(className)) {
      return true;
    }
  }
  return false;
}
function distanceToMatch(node, matchPredicate, limit = Infinity, distance = 0) {
  if (!node) return -1;
  if (node.nodeType !== node.ELEMENT_NODE) return -1;
  if (distance > limit) return -1;
  if (matchPredicate(node)) return distance;
  return distanceToMatch(node.parentNode, matchPredicate, limit, distance + 1);
}
function createMatchPredicate(className, selector) {
  return (node) => {
    const el = node;
    if (el === null) return false;
    try {
      if (className) {
        if (typeof className === "string") {
          if (el.matches(`.${className}`)) return true;
        } else if (elementClassMatchesRegex(el, className)) {
          return true;
        }
      }
      if (selector && el.matches(selector)) return true;
      return false;
    } catch {
      return false;
    }
  };
}
function needMaskingText(node, maskTextClass, maskTextSelector, unmaskTextClass, unmaskTextSelector, maskAllText) {
  try {
    const el = node.nodeType === node.ELEMENT_NODE ? node : node.parentElement;
    if (el === null) return false;
    if (el.tagName === "INPUT") {
      const autocomplete = el.getAttribute("autocomplete");
      const disallowedAutocompleteValues = [
        "current-password",
        "new-password",
        "cc-number",
        "cc-exp",
        "cc-exp-month",
        "cc-exp-year",
        "cc-csc"
      ];
      if (disallowedAutocompleteValues.includes(autocomplete)) {
        return true;
      }
    }
    let maskDistance = -1;
    let unmaskDistance = -1;
    if (maskAllText) {
      unmaskDistance = distanceToMatch(
        el,
        createMatchPredicate(unmaskTextClass, unmaskTextSelector)
      );
      if (unmaskDistance < 0) {
        return true;
      }
      maskDistance = distanceToMatch(
        el,
        createMatchPredicate(maskTextClass, maskTextSelector),
        unmaskDistance >= 0 ? unmaskDistance : Infinity
      );
    } else {
      maskDistance = distanceToMatch(
        el,
        createMatchPredicate(maskTextClass, maskTextSelector)
      );
      if (maskDistance < 0) {
        return false;
      }
      unmaskDistance = distanceToMatch(
        el,
        createMatchPredicate(unmaskTextClass, unmaskTextSelector),
        maskDistance >= 0 ? maskDistance : Infinity
      );
    }
    return maskDistance >= 0 ? unmaskDistance >= 0 ? maskDistance <= unmaskDistance : true : unmaskDistance >= 0 ? false : !!maskAllText;
  } catch (e2) {
  }
  return !!maskAllText;
}
function onceIframeLoaded(iframeEl, listener, iframeLoadTimeout) {
  const win = iframeEl.contentWindow;
  if (!win) {
    return;
  }
  let fired = false;
  let readyState;
  try {
    readyState = win.document.readyState;
  } catch (error) {
    return;
  }
  if (readyState !== "complete") {
    const timer = setTimeout$2(() => {
      if (!fired) {
        listener();
        fired = true;
      }
    }, iframeLoadTimeout);
    iframeEl.addEventListener("load", () => {
      clearTimeout$1(timer);
      fired = true;
      listener();
    });
    return;
  }
  const blankUrl = "about:blank";
  if (win.location.href !== blankUrl || iframeEl.src === blankUrl || iframeEl.src === "") {
    setTimeout$2(listener, 0);
    return iframeEl.addEventListener("load", listener);
  }
  iframeEl.addEventListener("load", listener);
}
function onceStylesheetLoaded(link, listener, styleSheetLoadTimeout) {
  let fired = false;
  let styleSheetLoaded;
  try {
    styleSheetLoaded = link.sheet;
  } catch (error) {
    return;
  }
  if (styleSheetLoaded) return;
  const timer = setTimeout$2(() => {
    if (!fired) {
      listener();
      fired = true;
    }
  }, styleSheetLoadTimeout);
  link.addEventListener("load", () => {
    clearTimeout$1(timer);
    fired = true;
    listener();
  });
}
function serializeNode(n2, options) {
  const {
    doc,
    mirror: mirror2,
    blockClass,
    blockSelector,
    unblockSelector,
    maskAllText,
    maskAttributeFn,
    maskTextClass,
    unmaskTextClass,
    maskTextSelector,
    unmaskTextSelector,
    inlineStylesheet,
    maskInputOptions = {},
    maskTextFn,
    maskInputFn,
    dataURLOptions = {},
    inlineImages,
    recordCanvas,
    keepIframeSrcFn,
    newlyAddedElement = false
  } = options;
  const rootId = getRootId(doc, mirror2);
  switch (n2.nodeType) {
    case n2.DOCUMENT_NODE:
      if (n2.compatMode !== "CSS1Compat") {
        return {
          type: NodeType$2.Document,
          childNodes: [],
          compatMode: n2.compatMode
          // probably "BackCompat"
        };
      } else {
        return {
          type: NodeType$2.Document,
          childNodes: []
        };
      }
    case n2.DOCUMENT_TYPE_NODE:
      return {
        type: NodeType$2.DocumentType,
        name: n2.name,
        publicId: n2.publicId,
        systemId: n2.systemId,
        rootId
      };
    case n2.ELEMENT_NODE:
      return serializeElementNode(n2, {
        doc,
        blockClass,
        blockSelector,
        unblockSelector,
        inlineStylesheet,
        maskAttributeFn,
        maskInputOptions,
        maskInputFn,
        dataURLOptions,
        inlineImages,
        recordCanvas,
        keepIframeSrcFn,
        newlyAddedElement,
        rootId,
        maskTextClass,
        unmaskTextClass,
        maskTextSelector,
        unmaskTextSelector
      });
    case n2.TEXT_NODE:
      return serializeTextNode(n2, {
        doc,
        maskAllText,
        maskTextClass,
        unmaskTextClass,
        maskTextSelector,
        unmaskTextSelector,
        maskTextFn,
        maskInputOptions,
        maskInputFn,
        rootId
      });
    case n2.CDATA_SECTION_NODE:
      return {
        type: NodeType$2.CDATA,
        textContent: "",
        rootId
      };
    case n2.COMMENT_NODE:
      return {
        type: NodeType$2.Comment,
        textContent: n2.textContent || "",
        rootId
      };
    default:
      return false;
  }
}
function getRootId(doc, mirror2) {
  if (!mirror2.hasNode(doc)) return void 0;
  const docId = mirror2.getId(doc);
  return docId === 1 ? void 0 : docId;
}
function serializeTextNode(n2, options) {
  var _a2;
  const {
    maskAllText,
    maskTextClass,
    unmaskTextClass,
    maskTextSelector,
    unmaskTextSelector,
    maskTextFn,
    maskInputOptions,
    maskInputFn,
    rootId
  } = options;
  const parentTagName = n2.parentNode && n2.parentNode.tagName;
  let textContent = n2.textContent;
  const isStyle = parentTagName === "STYLE" ? true : void 0;
  const isScript = parentTagName === "SCRIPT" ? true : void 0;
  const isTextarea = parentTagName === "TEXTAREA" ? true : void 0;
  if (isStyle && textContent) {
    try {
      if (n2.nextSibling || n2.previousSibling) {
      } else if ((_a2 = n2.parentNode.sheet) == null ? void 0 : _a2.cssRules) {
        textContent = stringifyStylesheet(
          n2.parentNode.sheet
        );
      }
    } catch (err) {
      console.warn(
        `Cannot get CSS styles from text's parentNode. Error: ${err}`,
        n2
      );
    }
    textContent = absoluteToStylesheet(textContent, getHref(options.doc));
  }
  if (isScript) {
    textContent = "SCRIPT_PLACEHOLDER";
  }
  const forceMask = needMaskingText(
    n2,
    maskTextClass,
    maskTextSelector,
    unmaskTextClass,
    unmaskTextSelector,
    maskAllText
  );
  if (!isStyle && !isScript && !isTextarea && textContent && forceMask) {
    textContent = maskTextFn ? maskTextFn(textContent, n2.parentElement) : textContent.replace(/[\S]/g, "*");
  }
  if (isTextarea && textContent && (maskInputOptions.textarea || forceMask)) {
    textContent = maskInputFn ? maskInputFn(textContent, n2.parentNode) : textContent.replace(/[\S]/g, "*");
  }
  if (parentTagName === "OPTION" && textContent) {
    const isInputMasked = shouldMaskInput({
      type: null,
      tagName: parentTagName,
      maskInputOptions
    });
    textContent = maskInputValue({
      isMasked: needMaskingText(
        n2,
        maskTextClass,
        maskTextSelector,
        unmaskTextClass,
        unmaskTextSelector,
        isInputMasked
      ),
      element: n2,
      value: textContent,
      maskInputFn
    });
  }
  return {
    type: NodeType$2.Text,
    textContent: textContent || "",
    isStyle,
    rootId
  };
}
function serializeElementNode(n2, options) {
  const {
    doc,
    blockClass,
    blockSelector,
    unblockSelector,
    inlineStylesheet,
    maskInputOptions = {},
    maskAttributeFn,
    maskInputFn,
    dataURLOptions = {},
    inlineImages,
    recordCanvas,
    keepIframeSrcFn,
    newlyAddedElement = false,
    rootId,
    maskTextClass,
    unmaskTextClass,
    maskTextSelector,
    unmaskTextSelector
  } = options;
  const needBlock = _isBlockedElement(
    n2,
    blockClass,
    blockSelector,
    unblockSelector
  );
  const tagName = getValidTagName$1(n2);
  let attributes2 = {};
  const len = n2.attributes.length;
  for (let i2 = 0; i2 < len; i2++) {
    const attr = n2.attributes[i2];
    if (attr.name && !ignoreAttribute(tagName, attr.name, attr.value)) {
      attributes2[attr.name] = transformAttribute(
        doc,
        tagName,
        toLowerCase(attr.name),
        attr.value,
        n2,
        maskAttributeFn
      );
    }
  }
  if (tagName === "link" && inlineStylesheet) {
    const stylesheet = Array.from(doc.styleSheets).find((s2) => {
      return s2.href === n2.href;
    });
    let cssText = null;
    if (stylesheet) {
      cssText = stringifyStylesheet(stylesheet);
    }
    if (cssText) {
      attributes2.rel = null;
      attributes2.href = null;
      attributes2.crossorigin = null;
      attributes2._cssText = absoluteToStylesheet(cssText, stylesheet.href);
    }
  }
  if (tagName === "style" && n2.sheet && // TODO: Currently we only try to get dynamic stylesheet when it is an empty style element
  !(n2.innerText || n2.textContent || "").trim().length) {
    const cssText = stringifyStylesheet(
      n2.sheet
    );
    if (cssText) {
      attributes2._cssText = absoluteToStylesheet(cssText, getHref(doc));
    }
  }
  if (tagName === "input" || tagName === "textarea" || tagName === "select" || tagName === "option") {
    const el = n2;
    const type = getInputType(el);
    const value = getInputValue(el, toUpperCase(tagName), type);
    const checked = el.checked;
    if (type !== "submit" && type !== "button" && value) {
      const forceMask = needMaskingText(
        el,
        maskTextClass,
        maskTextSelector,
        unmaskTextClass,
        unmaskTextSelector,
        shouldMaskInput({
          type,
          tagName: toUpperCase(tagName),
          maskInputOptions
        })
      );
      attributes2.value = maskInputValue({
        isMasked: forceMask,
        element: el,
        value,
        maskInputFn
      });
    }
    if (checked) {
      attributes2.checked = checked;
    }
  }
  if (tagName === "option") {
    if (n2.selected && !maskInputOptions["select"]) {
      attributes2.selected = true;
    } else {
      delete attributes2.selected;
    }
  }
  if (tagName === "canvas" && recordCanvas) {
    if (n2.__context === "2d") {
      if (!is2DCanvasBlank(n2)) {
        attributes2.rr_dataURL = n2.toDataURL(
          dataURLOptions.type,
          dataURLOptions.quality
        );
      }
    } else if (!("__context" in n2)) {
      const canvasDataURL = n2.toDataURL(
        dataURLOptions.type,
        dataURLOptions.quality
      );
      const blankCanvas = doc.createElement("canvas");
      blankCanvas.width = n2.width;
      blankCanvas.height = n2.height;
      const blankCanvasDataURL = blankCanvas.toDataURL(
        dataURLOptions.type,
        dataURLOptions.quality
      );
      if (canvasDataURL !== blankCanvasDataURL) {
        attributes2.rr_dataURL = canvasDataURL;
      }
    }
  }
  if (tagName === "img" && inlineImages) {
    if (!canvasService) {
      canvasService = doc.createElement("canvas");
      canvasCtx = canvasService.getContext("2d");
    }
    const image = n2;
    const imageSrc = image.currentSrc || image.getAttribute("src") || "<unknown-src>";
    const priorCrossOrigin = image.crossOrigin;
    const recordInlineImage = () => {
      image.removeEventListener("load", recordInlineImage);
      try {
        canvasService.width = image.naturalWidth;
        canvasService.height = image.naturalHeight;
        canvasCtx.drawImage(image, 0, 0);
        attributes2.rr_dataURL = canvasService.toDataURL(
          dataURLOptions.type,
          dataURLOptions.quality
        );
      } catch (err) {
        if (image.crossOrigin !== "anonymous") {
          image.crossOrigin = "anonymous";
          if (image.complete && image.naturalWidth !== 0)
            recordInlineImage();
          else image.addEventListener("load", recordInlineImage);
          return;
        } else {
          console.warn(
            `Cannot inline img src=${imageSrc}! Error: ${err}`
          );
        }
      }
      if (image.crossOrigin === "anonymous") {
        priorCrossOrigin ? attributes2.crossOrigin = priorCrossOrigin : image.removeAttribute("crossorigin");
      }
    };
    if (image.complete && image.naturalWidth !== 0) recordInlineImage();
    else image.addEventListener("load", recordInlineImage);
  }
  if (tagName === "audio" || tagName === "video") {
    attributes2.rr_mediaState = n2.paused ? "paused" : "played";
    attributes2.rr_mediaCurrentTime = n2.currentTime;
  }
  if (!newlyAddedElement) {
    if (n2.scrollLeft) {
      attributes2.rr_scrollLeft = n2.scrollLeft;
    }
    if (n2.scrollTop) {
      attributes2.rr_scrollTop = n2.scrollTop;
    }
  }
  if (needBlock) {
    const { width, height } = n2.getBoundingClientRect();
    attributes2 = {
      class: attributes2.class,
      rr_width: `${width}px`,
      rr_height: `${height}px`
    };
  }
  if (tagName === "iframe" && !keepIframeSrcFn(attributes2.src)) {
    if (!needBlock && !getIframeContentDocument(n2)) {
      attributes2.rr_src = attributes2.src;
    }
    delete attributes2.src;
  }
  let isCustomElement;
  try {
    if (customElements.get(tagName)) isCustomElement = true;
  } catch (e2) {
  }
  return {
    type: NodeType$2.Element,
    tagName,
    attributes: attributes2,
    childNodes: [],
    isSVG: isSVGElement(n2) || void 0,
    needBlock,
    rootId,
    isCustom: isCustomElement
  };
}
function lowerIfExists(maybeAttr) {
  if (maybeAttr === void 0 || maybeAttr === null) {
    return "";
  } else {
    return maybeAttr.toLowerCase();
  }
}
function slimDOMExcluded(sn, slimDOMOptions) {
  if (slimDOMOptions.comment && sn.type === NodeType$2.Comment) {
    return true;
  } else if (sn.type === NodeType$2.Element) {
    if (slimDOMOptions.script && // script tag
    (sn.tagName === "script" || // (module)preload link
    sn.tagName === "link" && (sn.attributes.rel === "preload" || sn.attributes.rel === "modulepreload") || // prefetch link
    sn.tagName === "link" && sn.attributes.rel === "prefetch" && typeof sn.attributes.href === "string" && extractFileExtension(sn.attributes.href) === "js")) {
      return true;
    } else if (slimDOMOptions.headFavicon && (sn.tagName === "link" && sn.attributes.rel === "shortcut icon" || sn.tagName === "meta" && (lowerIfExists(sn.attributes.name).match(
      /^msapplication-tile(image|color)$/
    ) || lowerIfExists(sn.attributes.name) === "application-name" || lowerIfExists(sn.attributes.rel) === "icon" || lowerIfExists(sn.attributes.rel) === "apple-touch-icon" || lowerIfExists(sn.attributes.rel) === "shortcut icon"))) {
      return true;
    } else if (sn.tagName === "meta") {
      if (slimDOMOptions.headMetaDescKeywords && lowerIfExists(sn.attributes.name).match(/^description|keywords$/)) {
        return true;
      } else if (slimDOMOptions.headMetaSocial && (lowerIfExists(sn.attributes.property).match(/^(og|twitter|fb):/) || // og = opengraph (facebook)
      lowerIfExists(sn.attributes.name).match(/^(og|twitter):/) || lowerIfExists(sn.attributes.name) === "pinterest")) {
        return true;
      } else if (slimDOMOptions.headMetaRobots && (lowerIfExists(sn.attributes.name) === "robots" || lowerIfExists(sn.attributes.name) === "googlebot" || lowerIfExists(sn.attributes.name) === "bingbot")) {
        return true;
      } else if (slimDOMOptions.headMetaHttpEquiv && sn.attributes["http-equiv"] !== void 0) {
        return true;
      } else if (slimDOMOptions.headMetaAuthorship && (lowerIfExists(sn.attributes.name) === "author" || lowerIfExists(sn.attributes.name) === "generator" || lowerIfExists(sn.attributes.name) === "framework" || lowerIfExists(sn.attributes.name) === "publisher" || lowerIfExists(sn.attributes.name) === "progid" || lowerIfExists(sn.attributes.property).match(/^article:/) || lowerIfExists(sn.attributes.property).match(/^product:/))) {
        return true;
      } else if (slimDOMOptions.headMetaVerification && (lowerIfExists(sn.attributes.name) === "google-site-verification" || lowerIfExists(sn.attributes.name) === "yandex-verification" || lowerIfExists(sn.attributes.name) === "csrf-token" || lowerIfExists(sn.attributes.name) === "p:domain_verify" || lowerIfExists(sn.attributes.name) === "verify-v1" || lowerIfExists(sn.attributes.name) === "verification" || lowerIfExists(sn.attributes.name) === "shopify-checkout-api-token")) {
        return true;
      }
    }
  }
  return false;
}
function serializeNodeWithId(n2, options) {
  const {
    doc,
    mirror: mirror2,
    blockClass,
    blockSelector,
    unblockSelector,
    maskAllText,
    maskTextClass,
    unmaskTextClass,
    maskTextSelector,
    unmaskTextSelector,
    skipChild = false,
    inlineStylesheet = true,
    maskInputOptions = {},
    maskAttributeFn,
    maskTextFn,
    maskInputFn,
    slimDOMOptions,
    dataURLOptions = {},
    inlineImages = false,
    recordCanvas = false,
    onSerialize,
    onIframeLoad,
    iframeLoadTimeout = 5e3,
    onStylesheetLoad,
    stylesheetLoadTimeout = 5e3,
    keepIframeSrcFn = () => false,
    newlyAddedElement = false
  } = options;
  let { preserveWhiteSpace = true } = options;
  const _serializedNode = serializeNode(n2, {
    doc,
    mirror: mirror2,
    blockClass,
    blockSelector,
    maskAllText,
    unblockSelector,
    maskTextClass,
    unmaskTextClass,
    maskTextSelector,
    unmaskTextSelector,
    inlineStylesheet,
    maskInputOptions,
    maskAttributeFn,
    maskTextFn,
    maskInputFn,
    dataURLOptions,
    inlineImages,
    recordCanvas,
    keepIframeSrcFn,
    newlyAddedElement
  });
  if (!_serializedNode) {
    console.warn(n2, "not serialized");
    return null;
  }
  let id;
  if (mirror2.hasNode(n2)) {
    id = mirror2.getId(n2);
  } else if (slimDOMExcluded(_serializedNode, slimDOMOptions) || !preserveWhiteSpace && _serializedNode.type === NodeType$2.Text && !_serializedNode.isStyle && !_serializedNode.textContent.replace(/^\s+|\s+$/gm, "").length) {
    id = IGNORED_NODE;
  } else {
    id = genId();
  }
  const serializedNode2 = Object.assign(_serializedNode, { id });
  mirror2.add(n2, serializedNode2);
  if (id === IGNORED_NODE) {
    return null;
  }
  if (onSerialize) {
    onSerialize(n2);
  }
  let recordChild = !skipChild;
  if (serializedNode2.type === NodeType$2.Element) {
    recordChild = recordChild && !serializedNode2.needBlock;
    delete serializedNode2.needBlock;
    const shadowRoot = n2.shadowRoot;
    if (shadowRoot && isNativeShadowDom(shadowRoot))
      serializedNode2.isShadowHost = true;
  }
  if ((serializedNode2.type === NodeType$2.Document || serializedNode2.type === NodeType$2.Element) && recordChild) {
    if (slimDOMOptions.headWhitespace && serializedNode2.type === NodeType$2.Element && serializedNode2.tagName === "head") {
      preserveWhiteSpace = false;
    }
    const bypassOptions = {
      doc,
      mirror: mirror2,
      blockClass,
      blockSelector,
      maskAllText,
      unblockSelector,
      maskTextClass,
      unmaskTextClass,
      maskTextSelector,
      unmaskTextSelector,
      skipChild,
      inlineStylesheet,
      maskInputOptions,
      maskAttributeFn,
      maskTextFn,
      maskInputFn,
      slimDOMOptions,
      dataURLOptions,
      inlineImages,
      recordCanvas,
      preserveWhiteSpace,
      onSerialize,
      onIframeLoad,
      iframeLoadTimeout,
      onStylesheetLoad,
      stylesheetLoadTimeout,
      keepIframeSrcFn
    };
    for (const childN of Array.from(n2.childNodes)) {
      const serializedChildNode = serializeNodeWithId(childN, bypassOptions);
      if (serializedChildNode) {
        serializedNode2.childNodes.push(serializedChildNode);
      }
    }
    if (isElement$1(n2) && n2.shadowRoot) {
      for (const childN of Array.from(n2.shadowRoot.childNodes)) {
        const serializedChildNode = serializeNodeWithId(childN, bypassOptions);
        if (serializedChildNode) {
          isNativeShadowDom(n2.shadowRoot) && (serializedChildNode.isShadow = true);
          serializedNode2.childNodes.push(serializedChildNode);
        }
      }
    }
  }
  if (n2.parentNode && isShadowRoot(n2.parentNode) && isNativeShadowDom(n2.parentNode)) {
    serializedNode2.isShadow = true;
  }
  if (serializedNode2.type === NodeType$2.Element && serializedNode2.tagName === "iframe" && !_isBlockedElement(
    n2,
    blockClass,
    blockSelector,
    unblockSelector
  )) {
    onceIframeLoaded(
      n2,
      () => {
        const iframeDoc = getIframeContentDocument(n2);
        if (iframeDoc && onIframeLoad) {
          const serializedIframeNode = serializeNodeWithId(iframeDoc, {
            doc: iframeDoc,
            mirror: mirror2,
            blockClass,
            blockSelector,
            unblockSelector,
            maskAllText,
            maskTextClass,
            unmaskTextClass,
            maskTextSelector,
            unmaskTextSelector,
            skipChild: false,
            inlineStylesheet,
            maskInputOptions,
            maskAttributeFn,
            maskTextFn,
            maskInputFn,
            slimDOMOptions,
            dataURLOptions,
            inlineImages,
            recordCanvas,
            preserveWhiteSpace,
            onSerialize,
            onIframeLoad,
            iframeLoadTimeout,
            onStylesheetLoad,
            stylesheetLoadTimeout,
            keepIframeSrcFn
          });
          if (serializedIframeNode) {
            onIframeLoad(
              n2,
              serializedIframeNode
            );
          }
        }
      },
      iframeLoadTimeout
    );
  }
  if (serializedNode2.type === NodeType$2.Element && serializedNode2.tagName === "link" && typeof serializedNode2.attributes.rel === "string" && (serializedNode2.attributes.rel === "stylesheet" || serializedNode2.attributes.rel === "preload" && typeof serializedNode2.attributes.href === "string" && extractFileExtension(serializedNode2.attributes.href) === "css")) {
    onceStylesheetLoaded(
      n2,
      () => {
        if (onStylesheetLoad) {
          const serializedLinkNode = serializeNodeWithId(n2, {
            doc,
            mirror: mirror2,
            blockClass,
            blockSelector,
            unblockSelector,
            maskAllText,
            maskTextClass,
            unmaskTextClass,
            maskTextSelector,
            unmaskTextSelector,
            skipChild: false,
            inlineStylesheet,
            maskInputOptions,
            maskAttributeFn,
            maskTextFn,
            maskInputFn,
            slimDOMOptions,
            dataURLOptions,
            inlineImages,
            recordCanvas,
            preserveWhiteSpace,
            onSerialize,
            onIframeLoad,
            iframeLoadTimeout,
            onStylesheetLoad,
            stylesheetLoadTimeout,
            keepIframeSrcFn
          });
          if (serializedLinkNode) {
            onStylesheetLoad(
              n2,
              serializedLinkNode
            );
          }
        }
      },
      stylesheetLoadTimeout
    );
  }
  return serializedNode2;
}
function snapshot(n2, options) {
  const {
    mirror: mirror2 = new Mirror(),
    blockClass = "rr-block",
    blockSelector = null,
    unblockSelector = null,
    maskAllText = false,
    maskTextClass = "rr-mask",
    unmaskTextClass = null,
    maskTextSelector = null,
    unmaskTextSelector = null,
    inlineStylesheet = true,
    inlineImages = false,
    recordCanvas = false,
    maskAllInputs = false,
    maskAttributeFn,
    maskTextFn,
    maskInputFn,
    slimDOM = false,
    dataURLOptions,
    preserveWhiteSpace,
    onSerialize,
    onIframeLoad,
    iframeLoadTimeout,
    onStylesheetLoad,
    stylesheetLoadTimeout,
    keepIframeSrcFn = () => false
  } = options || {};
  const maskInputOptions = maskAllInputs === true ? {
    color: true,
    date: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true,
    textarea: true,
    select: true
  } : maskAllInputs === false ? {} : maskAllInputs;
  const slimDOMOptions = slimDOM === true || slimDOM === "all" ? (
    // if true: set of sensible options that should not throw away any information
    {
      script: true,
      comment: true,
      headFavicon: true,
      headWhitespace: true,
      headMetaDescKeywords: slimDOM === "all",
      // destructive
      headMetaSocial: true,
      headMetaRobots: true,
      headMetaHttpEquiv: true,
      headMetaAuthorship: true,
      headMetaVerification: true
    }
  ) : slimDOM === false ? {} : slimDOM;
  return serializeNodeWithId(n2, {
    doc: n2,
    mirror: mirror2,
    blockClass,
    blockSelector,
    unblockSelector,
    maskAllText,
    maskTextClass,
    unmaskTextClass,
    maskTextSelector,
    unmaskTextSelector,
    skipChild: false,
    inlineStylesheet,
    maskInputOptions,
    maskAttributeFn,
    maskTextFn,
    maskInputFn,
    slimDOMOptions,
    dataURLOptions,
    inlineImages,
    recordCanvas,
    preserveWhiteSpace,
    onSerialize,
    onIframeLoad,
    iframeLoadTimeout,
    onStylesheetLoad,
    stylesheetLoadTimeout,
    keepIframeSrcFn,
    newlyAddedElement: false
  });
}
function on(type, fn, target = document) {
  const options = { capture: true, passive: true };
  target.addEventListener(type, fn, options);
  return () => target.removeEventListener(type, fn, options);
}
const DEPARTED_MIRROR_ACCESS_WARNING = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";
let _mirror = {
  map: {},
  getId() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    return -1;
  },
  getNode() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    return null;
  },
  removeNodeFromMap() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
  },
  has() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    return false;
  },
  reset() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
  }
};
if (typeof window !== "undefined" && window.Proxy && window.Reflect) {
  _mirror = new Proxy(_mirror, {
    get(target, prop, receiver) {
      if (prop === "map") {
        console.error(DEPARTED_MIRROR_ACCESS_WARNING);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function throttle$1(func, wait, options = {}) {
  let timeout = null;
  let previous = 0;
  return function(...args) {
    const now = Date.now();
    if (!previous && options.leading === false) {
      previous = now;
    }
    const remaining = wait - (now - previous);
    const context = this;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout$2(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout$1(() => {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}
function hookSetter(target, key, d, isRevoked, win = window) {
  const original = win.Object.getOwnPropertyDescriptor(target, key);
  win.Object.defineProperty(
    target,
    key,
    isRevoked ? d : {
      set(value) {
        setTimeout$1(() => {
          d.set.call(this, value);
        }, 0);
        if (original && original.set) {
          original.set.call(this, value);
        }
      }
    }
  );
  return () => hookSetter(target, key, original || {}, true);
}
function patch(source, name, replacement) {
  try {
    if (!(name in source)) {
      return () => {
      };
    }
    const original = source[name];
    const wrapped = replacement(original);
    if (typeof wrapped === "function") {
      wrapped.prototype = wrapped.prototype || {};
      Object.defineProperties(wrapped, {
        __rrweb_original__: {
          enumerable: false,
          value: original
        }
      });
    }
    source[name] = wrapped;
    return () => {
      source[name] = original;
    };
  } catch {
    return () => {
    };
  }
}
let nowTimestamp = Date.now;
if (!/* @__PURE__ */ /[1-9][0-9]{12}/.test(Date.now().toString())) {
  nowTimestamp = () => (/* @__PURE__ */ new Date()).getTime();
}
function getWindowScroll(win) {
  var _a2, _b, _c, _d, _e, _f;
  const doc = win.document;
  return {
    left: doc.scrollingElement ? doc.scrollingElement.scrollLeft : win.pageXOffset !== void 0 ? win.pageXOffset : (doc == null ? void 0 : doc.documentElement.scrollLeft) || ((_b = (_a2 = doc == null ? void 0 : doc.body) == null ? void 0 : _a2.parentElement) == null ? void 0 : _b.scrollLeft) || ((_c = doc == null ? void 0 : doc.body) == null ? void 0 : _c.scrollLeft) || 0,
    top: doc.scrollingElement ? doc.scrollingElement.scrollTop : win.pageYOffset !== void 0 ? win.pageYOffset : (doc == null ? void 0 : doc.documentElement.scrollTop) || ((_e = (_d = doc == null ? void 0 : doc.body) == null ? void 0 : _d.parentElement) == null ? void 0 : _e.scrollTop) || ((_f = doc == null ? void 0 : doc.body) == null ? void 0 : _f.scrollTop) || 0
  };
}
function getWindowHeight() {
  return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight;
}
function getWindowWidth() {
  return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
}
function closestElementOfNode$1(node) {
  if (!node) {
    return null;
  }
  try {
    const el = node.nodeType === node.ELEMENT_NODE ? node : node.parentElement;
    return el;
  } catch (error) {
    return null;
  }
}
function isBlocked(node, blockClass, blockSelector, unblockSelector, checkAncestors) {
  if (!node) {
    return false;
  }
  const el = closestElementOfNode$1(node);
  if (!el) {
    return false;
  }
  const blockedPredicate = createMatchPredicate(blockClass, blockSelector);
  if (!checkAncestors) {
    const isUnblocked = unblockSelector && el.matches(unblockSelector);
    return blockedPredicate(el) && !isUnblocked;
  }
  const blockDistance = distanceToMatch(el, blockedPredicate);
  let unblockDistance = -1;
  if (blockDistance < 0) {
    return false;
  }
  if (unblockSelector) {
    unblockDistance = distanceToMatch(
      el,
      createMatchPredicate(null, unblockSelector)
    );
  }
  if (blockDistance > -1 && unblockDistance < 0) {
    return true;
  }
  return blockDistance < unblockDistance;
}
function isSerialized(n2, mirror2) {
  return mirror2.getId(n2) !== -1;
}
function isIgnored(n2, mirror2) {
  return mirror2.getId(n2) === IGNORED_NODE;
}
function isAncestorRemoved(target, mirror2) {
  if (isShadowRoot(target)) {
    return false;
  }
  const id = mirror2.getId(target);
  if (!mirror2.has(id)) {
    return true;
  }
  if (target.parentNode && target.parentNode.nodeType === target.DOCUMENT_NODE) {
    return false;
  }
  if (!target.parentNode) {
    return true;
  }
  return isAncestorRemoved(target.parentNode, mirror2);
}
function legacy_isTouchEvent(event) {
  return Boolean(event.changedTouches);
}
function polyfill$1(win = window) {
  if ("NodeList" in win && !win.NodeList.prototype.forEach) {
    win.NodeList.prototype.forEach = Array.prototype.forEach;
  }
  if ("DOMTokenList" in win && !win.DOMTokenList.prototype.forEach) {
    win.DOMTokenList.prototype.forEach = Array.prototype.forEach;
  }
  if (!Node.prototype.contains) {
    Node.prototype.contains = (...args) => {
      let node = args[0];
      if (!(0 in args)) {
        throw new TypeError("1 argument is required");
      }
      do {
        if (this === node) {
          return true;
        }
      } while (node = node && node.parentNode);
      return false;
    };
  }
}
function isSerializedIframe(n2, mirror2) {
  return Boolean(n2.nodeName === "IFRAME" && mirror2.getMeta(n2));
}
function isSerializedStylesheet(n2, mirror2) {
  return Boolean(
    n2.nodeName === "LINK" && n2.nodeType === n2.ELEMENT_NODE && n2.getAttribute && n2.getAttribute("rel") === "stylesheet" && mirror2.getMeta(n2)
  );
}
function hasShadowRoot(n2) {
  return Boolean(n2 == null ? void 0 : n2.shadowRoot);
}
class StyleSheetMirror {
  constructor() {
    this.id = 1;
    this.styleIDMap = /* @__PURE__ */ new WeakMap();
    this.idStyleMap = /* @__PURE__ */ new Map();
  }
  getId(stylesheet) {
    var _a2;
    return (_a2 = this.styleIDMap.get(stylesheet)) != null ? _a2 : -1;
  }
  has(stylesheet) {
    return this.styleIDMap.has(stylesheet);
  }
  /**
   * @returns If the stylesheet is in the mirror, returns the id of the stylesheet. If not, return the new assigned id.
   */
  add(stylesheet, id) {
    if (this.has(stylesheet)) return this.getId(stylesheet);
    let newId;
    if (id === void 0) {
      newId = this.id++;
    } else newId = id;
    this.styleIDMap.set(stylesheet, newId);
    this.idStyleMap.set(newId, stylesheet);
    return newId;
  }
  getStyle(id) {
    return this.idStyleMap.get(id) || null;
  }
  reset() {
    this.styleIDMap = /* @__PURE__ */ new WeakMap();
    this.idStyleMap = /* @__PURE__ */ new Map();
    this.id = 1;
  }
  generateId() {
    return this.id++;
  }
}
function getShadowHost(n2) {
  var _a2, _b;
  let shadowHost = null;
  if (((_b = (_a2 = n2.getRootNode) == null ? void 0 : _a2.call(n2)) == null ? void 0 : _b.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && n2.getRootNode().host)
    shadowHost = n2.getRootNode().host;
  return shadowHost;
}
function getRootShadowHost(n2) {
  let rootShadowHost = n2;
  let shadowHost;
  while (shadowHost = getShadowHost(rootShadowHost))
    rootShadowHost = shadowHost;
  return rootShadowHost;
}
function shadowHostInDom(n2) {
  const doc = n2.ownerDocument;
  if (!doc) return false;
  const shadowHost = getRootShadowHost(n2);
  return doc.contains(shadowHost);
}
function inDom(n2) {
  const doc = n2.ownerDocument;
  if (!doc) return false;
  return doc.contains(n2) || shadowHostInDom(n2);
}
const cachedImplementations = {};
function getImplementation(name) {
  const cached = cachedImplementations[name];
  if (cached) {
    return cached;
  }
  const document2 = window.document;
  let impl = window[name];
  if (document2 && typeof document2.createElement === "function") {
    try {
      const sandbox = document2.createElement("iframe");
      sandbox.hidden = true;
      document2.head.appendChild(sandbox);
      const contentWindow = sandbox.contentWindow;
      if (contentWindow && contentWindow[name]) {
        impl = // eslint-disable-next-line @typescript-eslint/unbound-method
        contentWindow[name];
      }
      document2.head.removeChild(sandbox);
    } catch (e2) {
    }
  }
  return cachedImplementations[name] = impl.bind(
    window
  );
}
function onRequestAnimationFrame(...rest) {
  return getImplementation("requestAnimationFrame")(...rest);
}
function setTimeout$1(...rest) {
  return getImplementation("setTimeout")(...rest);
}
function clearTimeout$2(...rest) {
  return getImplementation("clearTimeout")(...rest);
}
var EventType = /* @__PURE__ */ ((EventType2) => {
  EventType2[EventType2["DomContentLoaded"] = 0] = "DomContentLoaded";
  EventType2[EventType2["Load"] = 1] = "Load";
  EventType2[EventType2["FullSnapshot"] = 2] = "FullSnapshot";
  EventType2[EventType2["IncrementalSnapshot"] = 3] = "IncrementalSnapshot";
  EventType2[EventType2["Meta"] = 4] = "Meta";
  EventType2[EventType2["Custom"] = 5] = "Custom";
  EventType2[EventType2["Plugin"] = 6] = "Plugin";
  return EventType2;
})(EventType || {});
var IncrementalSource = /* @__PURE__ */ ((IncrementalSource2) => {
  IncrementalSource2[IncrementalSource2["Mutation"] = 0] = "Mutation";
  IncrementalSource2[IncrementalSource2["MouseMove"] = 1] = "MouseMove";
  IncrementalSource2[IncrementalSource2["MouseInteraction"] = 2] = "MouseInteraction";
  IncrementalSource2[IncrementalSource2["Scroll"] = 3] = "Scroll";
  IncrementalSource2[IncrementalSource2["ViewportResize"] = 4] = "ViewportResize";
  IncrementalSource2[IncrementalSource2["Input"] = 5] = "Input";
  IncrementalSource2[IncrementalSource2["TouchMove"] = 6] = "TouchMove";
  IncrementalSource2[IncrementalSource2["MediaInteraction"] = 7] = "MediaInteraction";
  IncrementalSource2[IncrementalSource2["StyleSheetRule"] = 8] = "StyleSheetRule";
  IncrementalSource2[IncrementalSource2["CanvasMutation"] = 9] = "CanvasMutation";
  IncrementalSource2[IncrementalSource2["Font"] = 10] = "Font";
  IncrementalSource2[IncrementalSource2["Log"] = 11] = "Log";
  IncrementalSource2[IncrementalSource2["Drag"] = 12] = "Drag";
  IncrementalSource2[IncrementalSource2["StyleDeclaration"] = 13] = "StyleDeclaration";
  IncrementalSource2[IncrementalSource2["Selection"] = 14] = "Selection";
  IncrementalSource2[IncrementalSource2["AdoptedStyleSheet"] = 15] = "AdoptedStyleSheet";
  IncrementalSource2[IncrementalSource2["CustomElement"] = 16] = "CustomElement";
  return IncrementalSource2;
})(IncrementalSource || {});
var MouseInteractions = /* @__PURE__ */ ((MouseInteractions2) => {
  MouseInteractions2[MouseInteractions2["MouseUp"] = 0] = "MouseUp";
  MouseInteractions2[MouseInteractions2["MouseDown"] = 1] = "MouseDown";
  MouseInteractions2[MouseInteractions2["Click"] = 2] = "Click";
  MouseInteractions2[MouseInteractions2["ContextMenu"] = 3] = "ContextMenu";
  MouseInteractions2[MouseInteractions2["DblClick"] = 4] = "DblClick";
  MouseInteractions2[MouseInteractions2["Focus"] = 5] = "Focus";
  MouseInteractions2[MouseInteractions2["Blur"] = 6] = "Blur";
  MouseInteractions2[MouseInteractions2["TouchStart"] = 7] = "TouchStart";
  MouseInteractions2[MouseInteractions2["TouchMove_Departed"] = 8] = "TouchMove_Departed";
  MouseInteractions2[MouseInteractions2["TouchEnd"] = 9] = "TouchEnd";
  MouseInteractions2[MouseInteractions2["TouchCancel"] = 10] = "TouchCancel";
  return MouseInteractions2;
})(MouseInteractions || {});
var PointerTypes = /* @__PURE__ */ ((PointerTypes2) => {
  PointerTypes2[PointerTypes2["Mouse"] = 0] = "Mouse";
  PointerTypes2[PointerTypes2["Pen"] = 1] = "Pen";
  PointerTypes2[PointerTypes2["Touch"] = 2] = "Touch";
  return PointerTypes2;
})(PointerTypes || {});
var MediaInteractions = /* @__PURE__ */ ((MediaInteractions2) => {
  MediaInteractions2[MediaInteractions2["Play"] = 0] = "Play";
  MediaInteractions2[MediaInteractions2["Pause"] = 1] = "Pause";
  MediaInteractions2[MediaInteractions2["Seeked"] = 2] = "Seeked";
  MediaInteractions2[MediaInteractions2["VolumeChange"] = 3] = "VolumeChange";
  MediaInteractions2[MediaInteractions2["RateChange"] = 4] = "RateChange";
  return MediaInteractions2;
})(MediaInteractions || {});
function getIFrameContentDocument(iframe) {
  try {
    return iframe.contentDocument;
  } catch (e2) {
  }
}
function getIFrameContentWindow(iframe) {
  try {
    return iframe.contentWindow;
  } catch (e2) {
  }
}
function isNodeInLinkedList(n2) {
  return "__ln" in n2;
}
class DoubleLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  get(position) {
    if (position >= this.length) {
      throw new Error("Position outside of list range");
    }
    let current = this.head;
    for (let index = 0; index < position; index++) {
      current = (current == null ? void 0 : current.next) || null;
    }
    return current;
  }
  addNode(n2) {
    const node = {
      value: n2,
      previous: null,
      next: null
    };
    n2.__ln = node;
    if (n2.previousSibling && isNodeInLinkedList(n2.previousSibling)) {
      const current = n2.previousSibling.__ln.next;
      node.next = current;
      node.previous = n2.previousSibling.__ln;
      n2.previousSibling.__ln.next = node;
      if (current) {
        current.previous = node;
      }
    } else if (n2.nextSibling && isNodeInLinkedList(n2.nextSibling) && n2.nextSibling.__ln.previous) {
      const current = n2.nextSibling.__ln.previous;
      node.previous = current;
      node.next = n2.nextSibling.__ln;
      n2.nextSibling.__ln.previous = node;
      if (current) {
        current.next = node;
      }
    } else {
      if (this.head) {
        this.head.previous = node;
      }
      node.next = this.head;
      this.head = node;
    }
    if (node.next === null) {
      this.tail = node;
    }
    this.length++;
  }
  removeNode(n2) {
    const current = n2.__ln;
    if (!this.head) {
      return;
    }
    if (!current.previous) {
      this.head = current.next;
      if (this.head) {
        this.head.previous = null;
      } else {
        this.tail = null;
      }
    } else {
      current.previous.next = current.next;
      if (current.next) {
        current.next.previous = current.previous;
      } else {
        this.tail = current.previous;
      }
    }
    if (n2.__ln) {
      delete n2.__ln;
    }
    this.length--;
  }
}
const moveKey = (id, parentId) => `${id}@${parentId}`;
class MutationBuffer {
  constructor() {
    this.frozen = false;
    this.locked = false;
    this.texts = [];
    this.attributes = [];
    this.attributeMap = /* @__PURE__ */ new WeakMap();
    this.removes = [];
    this.mapRemoves = [];
    this.movedMap = {};
    this.addedSet = /* @__PURE__ */ new Set();
    this.movedSet = /* @__PURE__ */ new Set();
    this.droppedSet = /* @__PURE__ */ new Set();
    this.processMutations = (mutations) => {
      mutations.forEach(this.processMutation);
      this.emit();
    };
    this.emit = () => {
      if (this.frozen || this.locked) {
        return;
      }
      const adds = [];
      const addedIds = /* @__PURE__ */ new Set();
      const addList = new DoubleLinkedList();
      const getNextId = (n2) => {
        let ns = n2;
        let nextId = IGNORED_NODE;
        while (nextId === IGNORED_NODE) {
          ns = ns && ns.nextSibling;
          nextId = ns && this.mirror.getId(ns);
        }
        return nextId;
      };
      const pushAdd = (n2) => {
        if (!n2.parentNode || !inDom(n2)) {
          return;
        }
        const parentId = isShadowRoot(n2.parentNode) ? this.mirror.getId(getShadowHost(n2)) : this.mirror.getId(n2.parentNode);
        const nextId = getNextId(n2);
        if (parentId === -1 || nextId === -1) {
          return addList.addNode(n2);
        }
        const sn = serializeNodeWithId(n2, {
          doc: this.doc,
          mirror: this.mirror,
          blockClass: this.blockClass,
          blockSelector: this.blockSelector,
          maskAllText: this.maskAllText,
          unblockSelector: this.unblockSelector,
          maskTextClass: this.maskTextClass,
          unmaskTextClass: this.unmaskTextClass,
          maskTextSelector: this.maskTextSelector,
          unmaskTextSelector: this.unmaskTextSelector,
          skipChild: true,
          newlyAddedElement: true,
          inlineStylesheet: this.inlineStylesheet,
          maskInputOptions: this.maskInputOptions,
          maskAttributeFn: this.maskAttributeFn,
          maskTextFn: this.maskTextFn,
          maskInputFn: this.maskInputFn,
          slimDOMOptions: this.slimDOMOptions,
          dataURLOptions: this.dataURLOptions,
          recordCanvas: this.recordCanvas,
          inlineImages: this.inlineImages,
          onSerialize: (currentN) => {
            if (isSerializedIframe(currentN, this.mirror) && !isBlocked(
              currentN,
              this.blockClass,
              this.blockSelector,
              this.unblockSelector,
              false
            )) {
              this.iframeManager.addIframe(currentN);
            }
            if (isSerializedStylesheet(currentN, this.mirror)) {
              this.stylesheetManager.trackLinkElement(
                currentN
              );
            }
            if (hasShadowRoot(n2)) {
              this.shadowDomManager.addShadowRoot(n2.shadowRoot, this.doc);
            }
          },
          onIframeLoad: (iframe, childSn) => {
            if (isBlocked(
              iframe,
              this.blockClass,
              this.blockSelector,
              this.unblockSelector,
              false
            )) {
              return;
            }
            this.iframeManager.attachIframe(iframe, childSn);
            if (iframe.contentWindow) {
              this.canvasManager.addWindow(iframe.contentWindow);
            }
            this.shadowDomManager.observeAttachShadow(iframe);
          },
          onStylesheetLoad: (link, childSn) => {
            this.stylesheetManager.attachLinkElement(link, childSn);
          }
        });
        if (sn) {
          adds.push({
            parentId,
            nextId,
            node: sn
          });
          addedIds.add(sn.id);
        }
      };
      while (this.mapRemoves.length) {
        this.mirror.removeNodeFromMap(this.mapRemoves.shift());
      }
      for (const n2 of this.movedSet) {
        if (isParentRemoved(this.removes, n2, this.mirror) && !this.movedSet.has(n2.parentNode)) {
          continue;
        }
        pushAdd(n2);
      }
      for (const n2 of this.addedSet) {
        if (!isAncestorInSet(this.droppedSet, n2) && !isParentRemoved(this.removes, n2, this.mirror)) {
          pushAdd(n2);
        } else if (isAncestorInSet(this.movedSet, n2)) {
          pushAdd(n2);
        } else {
          this.droppedSet.add(n2);
        }
      }
      let candidate = null;
      while (addList.length) {
        let node = null;
        if (candidate) {
          const parentId = this.mirror.getId(candidate.value.parentNode);
          const nextId = getNextId(candidate.value);
          if (parentId !== -1 && nextId !== -1) {
            node = candidate;
          }
        }
        if (!node) {
          let tailNode = addList.tail;
          while (tailNode) {
            const _node = tailNode;
            tailNode = tailNode.previous;
            if (_node) {
              const parentId = this.mirror.getId(_node.value.parentNode);
              const nextId = getNextId(_node.value);
              if (nextId === -1) continue;
              else if (parentId !== -1) {
                node = _node;
                break;
              } else {
                const unhandledNode = _node.value;
                if (unhandledNode.parentNode && unhandledNode.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                  const shadowHost = unhandledNode.parentNode.host;
                  const parentId2 = this.mirror.getId(shadowHost);
                  if (parentId2 !== -1) {
                    node = _node;
                    break;
                  }
                }
              }
            }
          }
        }
        if (!node) {
          while (addList.head) {
            addList.removeNode(addList.head.value);
          }
          break;
        }
        candidate = node.previous;
        addList.removeNode(node.value);
        pushAdd(node.value);
      }
      const payload = {
        texts: this.texts.map((text) => ({
          id: this.mirror.getId(text.node),
          value: text.value
        })).filter((text) => !addedIds.has(text.id)).filter((text) => this.mirror.has(text.id)),
        attributes: this.attributes.map((attribute) => {
          const { attributes } = attribute;
          if (typeof attributes.style === "string") {
            const diffAsStr = JSON.stringify(attribute.styleDiff);
            const unchangedAsStr = JSON.stringify(attribute._unchangedStyles);
            if (diffAsStr.length < attributes.style.length) {
              if ((diffAsStr + unchangedAsStr).split("var(").length === attributes.style.split("var(").length) {
                attributes.style = attribute.styleDiff;
              }
            }
          }
          return {
            id: this.mirror.getId(attribute.node),
            attributes
          };
        }).filter((attribute) => !addedIds.has(attribute.id)).filter((attribute) => this.mirror.has(attribute.id)),
        removes: this.removes,
        adds
      };
      if (!payload.texts.length && !payload.attributes.length && !payload.removes.length && !payload.adds.length) {
        return;
      }
      this.texts = [];
      this.attributes = [];
      this.attributeMap = /* @__PURE__ */ new WeakMap();
      this.removes = [];
      this.addedSet = /* @__PURE__ */ new Set();
      this.movedSet = /* @__PURE__ */ new Set();
      this.droppedSet = /* @__PURE__ */ new Set();
      this.movedMap = {};
      this.mutationCb(payload);
    };
    this.processMutation = (m) => {
      if (isIgnored(m.target, this.mirror)) {
        return;
      }
      switch (m.type) {
        case "characterData": {
          const value = m.target.textContent;
          if (!isBlocked(
            m.target,
            this.blockClass,
            this.blockSelector,
            this.unblockSelector,
            false
          ) && value !== m.oldValue) {
            this.texts.push({
              value: needMaskingText(
                m.target,
                this.maskTextClass,
                this.maskTextSelector,
                this.unmaskTextClass,
                this.unmaskTextSelector,
                this.maskAllText
              ) && value ? this.maskTextFn ? this.maskTextFn(value, closestElementOfNode$1(m.target)) : value.replace(/[\S]/g, "*") : value,
              node: m.target
            });
          }
          break;
        }
        case "attributes": {
          const target = m.target;
          let attributeName = m.attributeName;
          let value = m.target.getAttribute(attributeName);
          if (attributeName === "value") {
            const type = getInputType(target);
            const tagName = target.tagName;
            value = getInputValue(target, tagName, type);
            const isInputMasked = shouldMaskInput({
              maskInputOptions: this.maskInputOptions,
              tagName,
              type
            });
            const forceMask = needMaskingText(
              m.target,
              this.maskTextClass,
              this.maskTextSelector,
              this.unmaskTextClass,
              this.unmaskTextSelector,
              isInputMasked
            );
            value = maskInputValue({
              isMasked: forceMask,
              element: target,
              value,
              maskInputFn: this.maskInputFn
            });
          }
          if (isBlocked(
            m.target,
            this.blockClass,
            this.blockSelector,
            this.unblockSelector,
            false
          ) || value === m.oldValue) {
            return;
          }
          let item = this.attributeMap.get(m.target);
          if (target.tagName === "IFRAME" && attributeName === "src" && !this.keepIframeSrcFn(value)) {
            const iframeDoc = getIFrameContentDocument(
              target
            );
            if (!iframeDoc) {
              attributeName = "rr_src";
            } else {
              return;
            }
          }
          if (!item) {
            item = {
              node: m.target,
              attributes: {},
              styleDiff: {},
              _unchangedStyles: {}
            };
            this.attributes.push(item);
            this.attributeMap.set(m.target, item);
          }
          if (attributeName === "type" && target.tagName === "INPUT" && (m.oldValue || "").toLowerCase() === "password") {
            target.setAttribute("data-rr-is-password", "true");
          }
          if (!ignoreAttribute(target.tagName, attributeName)) {
            item.attributes[attributeName] = transformAttribute(
              this.doc,
              toLowerCase(target.tagName),
              toLowerCase(attributeName),
              value,
              target,
              this.maskAttributeFn
            );
            if (attributeName === "style") {
              if (!this.unattachedDoc) {
                try {
                  this.unattachedDoc = document.implementation.createHTMLDocument();
                } catch (e2) {
                  this.unattachedDoc = this.doc;
                }
              }
              const old = this.unattachedDoc.createElement("span");
              if (m.oldValue) {
                old.setAttribute("style", m.oldValue);
              }
              for (const pname of Array.from(target.style)) {
                const newValue = target.style.getPropertyValue(pname);
                const newPriority = target.style.getPropertyPriority(pname);
                if (newValue !== old.style.getPropertyValue(pname) || newPriority !== old.style.getPropertyPriority(pname)) {
                  if (newPriority === "") {
                    item.styleDiff[pname] = newValue;
                  } else {
                    item.styleDiff[pname] = [newValue, newPriority];
                  }
                } else {
                  item._unchangedStyles[pname] = [newValue, newPriority];
                }
              }
              for (const pname of Array.from(old.style)) {
                if (target.style.getPropertyValue(pname) === "") {
                  item.styleDiff[pname] = false;
                }
              }
            }
          }
          break;
        }
        case "childList": {
          if (isBlocked(
            m.target,
            this.blockClass,
            this.blockSelector,
            this.unblockSelector,
            true
          )) {
            return;
          }
          m.addedNodes.forEach((n2) => this.genAdds(n2, m.target));
          m.removedNodes.forEach((n2) => {
            const nodeId = this.mirror.getId(n2);
            const parentId = isShadowRoot(m.target) ? this.mirror.getId(m.target.host) : this.mirror.getId(m.target);
            if (isBlocked(
              m.target,
              this.blockClass,
              this.blockSelector,
              this.unblockSelector,
              false
            ) || isIgnored(n2, this.mirror) || !isSerialized(n2, this.mirror)) {
              return;
            }
            if (this.addedSet.has(n2)) {
              deepDelete(this.addedSet, n2);
              this.droppedSet.add(n2);
            } else if (this.addedSet.has(m.target) && nodeId === -1) ;
            else if (isAncestorRemoved(m.target, this.mirror)) ;
            else if (this.movedSet.has(n2) && this.movedMap[moveKey(nodeId, parentId)]) {
              deepDelete(this.movedSet, n2);
            } else {
              this.removes.push({
                parentId,
                id: nodeId,
                isShadow: isShadowRoot(m.target) && isNativeShadowDom(m.target) ? true : void 0
              });
            }
            this.mapRemoves.push(n2);
          });
          break;
        }
      }
    };
    this.genAdds = (n2, target) => {
      if (this.processedNodeManager.inOtherBuffer(n2, this)) return;
      if (this.addedSet.has(n2) || this.movedSet.has(n2)) return;
      if (this.mirror.hasNode(n2)) {
        if (isIgnored(n2, this.mirror)) {
          return;
        }
        this.movedSet.add(n2);
        let targetId = null;
        if (target && this.mirror.hasNode(target)) {
          targetId = this.mirror.getId(target);
        }
        if (targetId && targetId !== -1) {
          this.movedMap[moveKey(this.mirror.getId(n2), targetId)] = true;
        }
      } else {
        this.addedSet.add(n2);
        this.droppedSet.delete(n2);
      }
      if (!isBlocked(
        n2,
        this.blockClass,
        this.blockSelector,
        this.unblockSelector,
        false
      )) {
        n2.childNodes.forEach((childN) => this.genAdds(childN));
        if (hasShadowRoot(n2)) {
          n2.shadowRoot.childNodes.forEach((childN) => {
            this.processedNodeManager.add(childN, this);
            this.genAdds(childN, n2);
          });
        }
      }
    };
  }
  init(options) {
    [
      "mutationCb",
      "blockClass",
      "blockSelector",
      "unblockSelector",
      "maskAllText",
      "maskTextClass",
      "unmaskTextClass",
      "maskTextSelector",
      "unmaskTextSelector",
      "inlineStylesheet",
      "maskInputOptions",
      "maskAttributeFn",
      "maskTextFn",
      "maskInputFn",
      "keepIframeSrcFn",
      "recordCanvas",
      "inlineImages",
      "slimDOMOptions",
      "dataURLOptions",
      "doc",
      "mirror",
      "iframeManager",
      "stylesheetManager",
      "shadowDomManager",
      "canvasManager",
      "processedNodeManager"
    ].forEach((key) => {
      this[key] = options[key];
    });
  }
  freeze() {
    this.frozen = true;
    this.canvasManager.freeze();
  }
  unfreeze() {
    this.frozen = false;
    this.canvasManager.unfreeze();
    this.emit();
  }
  isFrozen() {
    return this.frozen;
  }
  lock() {
    this.locked = true;
    this.canvasManager.lock();
  }
  unlock() {
    this.locked = false;
    this.canvasManager.unlock();
    this.emit();
  }
  reset() {
    this.shadowDomManager.reset();
    this.canvasManager.reset();
  }
}
function deepDelete(addsSet, n2) {
  addsSet.delete(n2);
  n2.childNodes.forEach((childN) => deepDelete(addsSet, childN));
}
function isParentRemoved(removes, n2, mirror2) {
  if (removes.length === 0) return false;
  return _isParentRemoved(removes, n2, mirror2);
}
function _isParentRemoved(removes, n2, mirror2) {
  let node = n2.parentNode;
  while (node) {
    const parentId = mirror2.getId(node);
    if (removes.some((r2) => r2.id === parentId)) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
function isAncestorInSet(set, n2) {
  if (set.size === 0) return false;
  return _isAncestorInSet(set, n2);
}
function _isAncestorInSet(set, n2) {
  const { parentNode } = n2;
  if (!parentNode) {
    return false;
  }
  if (set.has(parentNode)) {
    return true;
  }
  return _isAncestorInSet(set, parentNode);
}
let errorHandler;
function registerErrorHandler(handler) {
  errorHandler = handler;
}
function unregisterErrorHandler() {
  errorHandler = void 0;
}
const callbackWrapper = (cb) => {
  if (!errorHandler) {
    return cb;
  }
  const rrwebWrapped = (...rest) => {
    try {
      return cb(...rest);
    } catch (error) {
      if (errorHandler && errorHandler(error) === true) {
        return () => {
        };
      }
      throw error;
    }
  };
  return rrwebWrapped;
};
const mutationBuffers = [];
function getEventTarget(event) {
  try {
    if ("composedPath" in event) {
      const path = event.composedPath();
      if (path.length) {
        return path[0];
      }
    } else if ("path" in event && event.path.length) {
      return event.path[0];
    }
  } catch {
  }
  return event && event.target;
}
function initMutationObserver(options, rootEl) {
  var _a2, _b;
  const mutationBuffer = new MutationBuffer();
  mutationBuffers.push(mutationBuffer);
  mutationBuffer.init(options);
  let mutationObserverCtor = window.MutationObserver || /**
  * Some websites may disable MutationObserver by removing it from the window object.
  * If someone is using rrweb to build a browser extention or things like it, they
  * could not change the website's code but can have an opportunity to inject some
  * code before the website executing its JS logic.
  * Then they can do this to store the native MutationObserver:
  * window.__rrMutationObserver = MutationObserver
  */
  window.__rrMutationObserver;
  const angularZoneSymbol = (_b = (_a2 = window == null ? void 0 : window.Zone) == null ? void 0 : _a2.__symbol__) == null ? void 0 : _b.call(_a2, "MutationObserver");
  if (angularZoneSymbol && window[angularZoneSymbol]) {
    mutationObserverCtor = window[angularZoneSymbol];
  }
  const observer = new mutationObserverCtor(
    callbackWrapper((mutations) => {
      if (options.onMutation && options.onMutation(mutations) === false) {
        return;
      }
      mutationBuffer.processMutations.bind(mutationBuffer)(mutations);
    })
  );
  observer.observe(rootEl, {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true
  });
  return observer;
}
function initMoveObserver({
  mousemoveCb,
  sampling,
  doc,
  mirror: mirror2
}) {
  if (sampling.mousemove === false) {
    return () => {
    };
  }
  const threshold = typeof sampling.mousemove === "number" ? sampling.mousemove : 50;
  const callbackThreshold = typeof sampling.mousemoveCallback === "number" ? sampling.mousemoveCallback : 500;
  let positions = [];
  let timeBaseline;
  const wrappedCb = throttle$1(
    callbackWrapper(
      (source) => {
        const totalOffset = Date.now() - timeBaseline;
        mousemoveCb(
          positions.map((p) => {
            p.timeOffset -= totalOffset;
            return p;
          }),
          source
        );
        positions = [];
        timeBaseline = null;
      }
    ),
    callbackThreshold
  );
  const updatePosition = callbackWrapper(
    throttle$1(
      callbackWrapper((evt) => {
        const target = getEventTarget(evt);
        const { clientX, clientY } = legacy_isTouchEvent(evt) ? evt.changedTouches[0] : evt;
        if (!timeBaseline) {
          timeBaseline = nowTimestamp();
        }
        positions.push({
          x: clientX,
          y: clientY,
          id: mirror2.getId(target),
          timeOffset: nowTimestamp() - timeBaseline
        });
        wrappedCb(
          typeof DragEvent !== "undefined" && evt instanceof DragEvent ? IncrementalSource.Drag : evt instanceof MouseEvent ? IncrementalSource.MouseMove : IncrementalSource.TouchMove
        );
      }),
      threshold,
      {
        trailing: false
      }
    )
  );
  const handlers2 = [
    on("mousemove", updatePosition, doc),
    on("touchmove", updatePosition, doc),
    on("drag", updatePosition, doc)
  ];
  return callbackWrapper(() => {
    handlers2.forEach((h) => h());
  });
}
function initMouseInteractionObserver({
  mouseInteractionCb,
  doc,
  mirror: mirror2,
  blockClass,
  blockSelector,
  unblockSelector,
  sampling
}) {
  if (sampling.mouseInteraction === false) {
    return () => {
    };
  }
  const disableMap = sampling.mouseInteraction === true || sampling.mouseInteraction === void 0 ? {} : sampling.mouseInteraction;
  const handlers2 = [];
  let currentPointerType = null;
  const getHandler = (eventKey) => {
    return (event) => {
      const target = getEventTarget(event);
      if (isBlocked(target, blockClass, blockSelector, unblockSelector, true)) {
        return;
      }
      let pointerType = null;
      let thisEventKey = eventKey;
      if ("pointerType" in event) {
        switch (event.pointerType) {
          case "mouse":
            pointerType = PointerTypes.Mouse;
            break;
          case "touch":
            pointerType = PointerTypes.Touch;
            break;
          case "pen":
            pointerType = PointerTypes.Pen;
            break;
        }
        if (pointerType === PointerTypes.Touch) {
          if (MouseInteractions[eventKey] === MouseInteractions.MouseDown) {
            thisEventKey = "TouchStart";
          } else if (MouseInteractions[eventKey] === MouseInteractions.MouseUp) {
            thisEventKey = "TouchEnd";
          }
        } else if (pointerType === PointerTypes.Pen) ;
      } else if (legacy_isTouchEvent(event)) {
        pointerType = PointerTypes.Touch;
      }
      if (pointerType !== null) {
        currentPointerType = pointerType;
        if (thisEventKey.startsWith("Touch") && pointerType === PointerTypes.Touch || thisEventKey.startsWith("Mouse") && pointerType === PointerTypes.Mouse) {
          pointerType = null;
        }
      } else if (MouseInteractions[eventKey] === MouseInteractions.Click) {
        pointerType = currentPointerType;
        currentPointerType = null;
      }
      const e2 = legacy_isTouchEvent(event) ? event.changedTouches[0] : event;
      if (!e2) {
        return;
      }
      const id = mirror2.getId(target);
      const { clientX, clientY } = e2;
      callbackWrapper(mouseInteractionCb)({
        type: MouseInteractions[thisEventKey],
        id,
        x: clientX,
        y: clientY,
        ...pointerType !== null && { pointerType }
      });
    };
  };
  Object.keys(MouseInteractions).filter(
    (key) => Number.isNaN(Number(key)) && !key.endsWith("_Departed") && disableMap[key] !== false
  ).forEach((eventKey) => {
    let eventName = toLowerCase(eventKey);
    const handler = getHandler(eventKey);
    if (window.PointerEvent) {
      switch (MouseInteractions[eventKey]) {
        case MouseInteractions.MouseDown:
        case MouseInteractions.MouseUp:
          eventName = eventName.replace(
            "mouse",
            "pointer"
          );
          break;
        case MouseInteractions.TouchStart:
        case MouseInteractions.TouchEnd:
          return;
      }
    }
    handlers2.push(on(eventName, handler, doc));
  });
  return callbackWrapper(() => {
    handlers2.forEach((h) => h());
  });
}
function initScrollObserver({
  scrollCb,
  doc,
  mirror: mirror2,
  blockClass,
  blockSelector,
  unblockSelector,
  sampling
}) {
  const updatePosition = callbackWrapper(
    throttle$1(
      callbackWrapper((evt) => {
        const target = getEventTarget(evt);
        if (!target || isBlocked(
          target,
          blockClass,
          blockSelector,
          unblockSelector,
          true
        )) {
          return;
        }
        const id = mirror2.getId(target);
        if (target === doc && doc.defaultView) {
          const scrollLeftTop = getWindowScroll(doc.defaultView);
          scrollCb({
            id,
            x: scrollLeftTop.left,
            y: scrollLeftTop.top
          });
        } else {
          scrollCb({
            id,
            x: target.scrollLeft,
            y: target.scrollTop
          });
        }
      }),
      sampling.scroll || 100
    )
  );
  return on("scroll", updatePosition, doc);
}
function initViewportResizeObserver({ viewportResizeCb }, { win }) {
  let lastH = -1;
  let lastW = -1;
  const updateDimension = callbackWrapper(
    throttle$1(
      callbackWrapper(() => {
        const height = getWindowHeight();
        const width = getWindowWidth();
        if (lastH !== height || lastW !== width) {
          viewportResizeCb({
            width: Number(width),
            height: Number(height)
          });
          lastH = height;
          lastW = width;
        }
      }),
      200
    )
  );
  return on("resize", updateDimension, win);
}
const INPUT_TAGS = ["INPUT", "TEXTAREA", "SELECT"];
const lastInputValueMap = /* @__PURE__ */ new WeakMap();
function initInputObserver({
  inputCb,
  doc,
  mirror: mirror2,
  blockClass,
  blockSelector,
  unblockSelector,
  ignoreClass,
  ignoreSelector,
  maskInputOptions,
  maskInputFn,
  sampling,
  userTriggeredOnInput,
  maskTextClass,
  unmaskTextClass,
  maskTextSelector,
  unmaskTextSelector
}) {
  function eventHandler(event) {
    let target = getEventTarget(event);
    const userTriggered = event.isTrusted;
    const tagName = target && toUpperCase(target.tagName);
    if (tagName === "OPTION") target = target.parentElement;
    if (!target || !tagName || INPUT_TAGS.indexOf(tagName) < 0 || isBlocked(
      target,
      blockClass,
      blockSelector,
      unblockSelector,
      true
    )) {
      return;
    }
    const el = target;
    if (el.classList.contains(ignoreClass) || ignoreSelector && el.matches(ignoreSelector)) {
      return;
    }
    const type = getInputType(target);
    let text = getInputValue(el, tagName, type);
    let isChecked = false;
    const isInputMasked = shouldMaskInput({
      maskInputOptions,
      tagName,
      type
    });
    const forceMask = needMaskingText(
      target,
      maskTextClass,
      maskTextSelector,
      unmaskTextClass,
      unmaskTextSelector,
      isInputMasked
    );
    if (type === "radio" || type === "checkbox") {
      isChecked = target.checked;
    }
    text = maskInputValue({
      isMasked: forceMask,
      element: target,
      value: text,
      maskInputFn
    });
    cbWithDedup(
      target,
      userTriggeredOnInput ? { text, isChecked, userTriggered } : { text, isChecked }
    );
    const name = target.name;
    if (type === "radio" && name && isChecked) {
      doc.querySelectorAll(`input[type="radio"][name="${name}"]`).forEach((el2) => {
        if (el2 !== target) {
          const text2 = maskInputValue({
            // share mask behavior of `target`
            isMasked: forceMask,
            element: el2,
            value: getInputValue(el2, tagName, type),
            maskInputFn
          });
          cbWithDedup(
            el2,
            userTriggeredOnInput ? { text: text2, isChecked: !isChecked, userTriggered: false } : { text: text2, isChecked: !isChecked }
          );
        }
      });
    }
  }
  function cbWithDedup(target, v2) {
    const lastInputValue = lastInputValueMap.get(target);
    if (!lastInputValue || lastInputValue.text !== v2.text || lastInputValue.isChecked !== v2.isChecked) {
      lastInputValueMap.set(target, v2);
      const id = mirror2.getId(target);
      callbackWrapper(inputCb)({
        ...v2,
        id
      });
    }
  }
  const events = sampling.input === "last" ? ["change"] : ["input", "change"];
  const handlers2 = events.map(
    (eventName) => on(eventName, callbackWrapper(eventHandler), doc)
  );
  const currentWindow = doc.defaultView;
  if (!currentWindow) {
    return () => {
      handlers2.forEach((h) => h());
    };
  }
  const propertyDescriptor = currentWindow.Object.getOwnPropertyDescriptor(
    currentWindow.HTMLInputElement.prototype,
    "value"
  );
  const hookProperties = [
    [currentWindow.HTMLInputElement.prototype, "value"],
    [currentWindow.HTMLInputElement.prototype, "checked"],
    [currentWindow.HTMLSelectElement.prototype, "value"],
    [currentWindow.HTMLTextAreaElement.prototype, "value"],
    // Some UI library use selectedIndex to set select value
    [currentWindow.HTMLSelectElement.prototype, "selectedIndex"],
    [currentWindow.HTMLOptionElement.prototype, "selected"]
  ];
  if (propertyDescriptor && propertyDescriptor.set) {
    handlers2.push(
      ...hookProperties.map(
        (p) => hookSetter(
          p[0],
          p[1],
          {
            set() {
              callbackWrapper(eventHandler)({
                target: this,
                isTrusted: false
                // userTriggered to false as this could well be programmatic
              });
            }
          },
          false,
          currentWindow
        )
      )
    );
  }
  return callbackWrapper(() => {
    handlers2.forEach((h) => h());
  });
}
function getNestedCSSRulePositions(rule) {
  const positions = [];
  function recurse(childRule, pos) {
    if (hasNestedCSSRule("CSSGroupingRule") && childRule.parentRule instanceof CSSGroupingRule || hasNestedCSSRule("CSSMediaRule") && childRule.parentRule instanceof CSSMediaRule || hasNestedCSSRule("CSSSupportsRule") && childRule.parentRule instanceof CSSSupportsRule || hasNestedCSSRule("CSSConditionRule") && childRule.parentRule instanceof CSSConditionRule) {
      const rules2 = Array.from(
        childRule.parentRule.cssRules
      );
      const index = rules2.indexOf(childRule);
      pos.unshift(index);
    } else if (childRule.parentStyleSheet) {
      const rules2 = Array.from(childRule.parentStyleSheet.cssRules);
      const index = rules2.indexOf(childRule);
      pos.unshift(index);
    }
    return pos;
  }
  return recurse(rule, positions);
}
function getIdAndStyleId(sheet, mirror2, styleMirror) {
  let id, styleId;
  if (!sheet) return {};
  if (sheet.ownerNode) id = mirror2.getId(sheet.ownerNode);
  else styleId = styleMirror.getId(sheet);
  return {
    styleId,
    id
  };
}
function initStyleSheetObserver({ styleSheetRuleCb, mirror: mirror2, stylesheetManager }, { win }) {
  if (!win.CSSStyleSheet || !win.CSSStyleSheet.prototype) {
    return () => {
    };
  }
  const insertRule = win.CSSStyleSheet.prototype.insertRule;
  win.CSSStyleSheet.prototype.insertRule = new Proxy(insertRule, {
    apply: callbackWrapper(
      (target, thisArg, argumentsList) => {
        const [rule, index] = argumentsList;
        const { id, styleId } = getIdAndStyleId(
          thisArg,
          mirror2,
          stylesheetManager.styleMirror
        );
        if (id && id !== -1 || styleId && styleId !== -1) {
          styleSheetRuleCb({
            id,
            styleId,
            adds: [{ rule, index }]
          });
        }
        return target.apply(thisArg, argumentsList);
      }
    )
  });
  const deleteRule = win.CSSStyleSheet.prototype.deleteRule;
  win.CSSStyleSheet.prototype.deleteRule = new Proxy(deleteRule, {
    apply: callbackWrapper(
      (target, thisArg, argumentsList) => {
        const [index] = argumentsList;
        const { id, styleId } = getIdAndStyleId(
          thisArg,
          mirror2,
          stylesheetManager.styleMirror
        );
        if (id && id !== -1 || styleId && styleId !== -1) {
          styleSheetRuleCb({
            id,
            styleId,
            removes: [{ index }]
          });
        }
        return target.apply(thisArg, argumentsList);
      }
    )
  });
  let replace;
  if (win.CSSStyleSheet.prototype.replace) {
    replace = win.CSSStyleSheet.prototype.replace;
    win.CSSStyleSheet.prototype.replace = new Proxy(replace, {
      apply: callbackWrapper(
        (target, thisArg, argumentsList) => {
          const [text] = argumentsList;
          const { id, styleId } = getIdAndStyleId(
            thisArg,
            mirror2,
            stylesheetManager.styleMirror
          );
          if (id && id !== -1 || styleId && styleId !== -1) {
            styleSheetRuleCb({
              id,
              styleId,
              replace: text
            });
          }
          return target.apply(thisArg, argumentsList);
        }
      )
    });
  }
  let replaceSync;
  if (win.CSSStyleSheet.prototype.replaceSync) {
    replaceSync = win.CSSStyleSheet.prototype.replaceSync;
    win.CSSStyleSheet.prototype.replaceSync = new Proxy(replaceSync, {
      apply: callbackWrapper(
        (target, thisArg, argumentsList) => {
          const [text] = argumentsList;
          const { id, styleId } = getIdAndStyleId(
            thisArg,
            mirror2,
            stylesheetManager.styleMirror
          );
          if (id && id !== -1 || styleId && styleId !== -1) {
            styleSheetRuleCb({
              id,
              styleId,
              replaceSync: text
            });
          }
          return target.apply(thisArg, argumentsList);
        }
      )
    });
  }
  const supportedNestedCSSRuleTypes = {};
  if (canMonkeyPatchNestedCSSRule("CSSGroupingRule")) {
    supportedNestedCSSRuleTypes.CSSGroupingRule = win.CSSGroupingRule;
  } else {
    if (canMonkeyPatchNestedCSSRule("CSSMediaRule")) {
      supportedNestedCSSRuleTypes.CSSMediaRule = win.CSSMediaRule;
    }
    if (canMonkeyPatchNestedCSSRule("CSSConditionRule")) {
      supportedNestedCSSRuleTypes.CSSConditionRule = win.CSSConditionRule;
    }
    if (canMonkeyPatchNestedCSSRule("CSSSupportsRule")) {
      supportedNestedCSSRuleTypes.CSSSupportsRule = win.CSSSupportsRule;
    }
  }
  const unmodifiedFunctions = {};
  Object.entries(supportedNestedCSSRuleTypes).forEach(([typeKey, type]) => {
    unmodifiedFunctions[typeKey] = {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      insertRule: type.prototype.insertRule,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deleteRule: type.prototype.deleteRule
    };
    type.prototype.insertRule = new Proxy(
      unmodifiedFunctions[typeKey].insertRule,
      {
        apply: callbackWrapper(
          (target, thisArg, argumentsList) => {
            const [rule, index] = argumentsList;
            const { id, styleId } = getIdAndStyleId(
              thisArg.parentStyleSheet,
              mirror2,
              stylesheetManager.styleMirror
            );
            if (id && id !== -1 || styleId && styleId !== -1) {
              styleSheetRuleCb({
                id,
                styleId,
                adds: [
                  {
                    rule,
                    index: [
                      ...getNestedCSSRulePositions(thisArg),
                      index || 0
                      // defaults to 0
                    ]
                  }
                ]
              });
            }
            return target.apply(thisArg, argumentsList);
          }
        )
      }
    );
    type.prototype.deleteRule = new Proxy(
      unmodifiedFunctions[typeKey].deleteRule,
      {
        apply: callbackWrapper(
          (target, thisArg, argumentsList) => {
            const [index] = argumentsList;
            const { id, styleId } = getIdAndStyleId(
              thisArg.parentStyleSheet,
              mirror2,
              stylesheetManager.styleMirror
            );
            if (id && id !== -1 || styleId && styleId !== -1) {
              styleSheetRuleCb({
                id,
                styleId,
                removes: [
                  { index: [...getNestedCSSRulePositions(thisArg), index] }
                ]
              });
            }
            return target.apply(thisArg, argumentsList);
          }
        )
      }
    );
  });
  return callbackWrapper(() => {
    win.CSSStyleSheet.prototype.insertRule = insertRule;
    win.CSSStyleSheet.prototype.deleteRule = deleteRule;
    replace && (win.CSSStyleSheet.prototype.replace = replace);
    replaceSync && (win.CSSStyleSheet.prototype.replaceSync = replaceSync);
    Object.entries(supportedNestedCSSRuleTypes).forEach(([typeKey, type]) => {
      type.prototype.insertRule = unmodifiedFunctions[typeKey].insertRule;
      type.prototype.deleteRule = unmodifiedFunctions[typeKey].deleteRule;
    });
  });
}
function initAdoptedStyleSheetObserver({
  mirror: mirror2,
  stylesheetManager
}, host) {
  var _a2, _b, _c;
  let hostId = null;
  if (host.nodeName === "#document") hostId = mirror2.getId(host);
  else hostId = mirror2.getId(host.host);
  const patchTarget = host.nodeName === "#document" ? (_a2 = host.defaultView) == null ? void 0 : _a2.Document : (_c = (_b = host.ownerDocument) == null ? void 0 : _b.defaultView) == null ? void 0 : _c.ShadowRoot;
  const originalPropertyDescriptor = (patchTarget == null ? void 0 : patchTarget.prototype) ? Object.getOwnPropertyDescriptor(
    patchTarget == null ? void 0 : patchTarget.prototype,
    "adoptedStyleSheets"
  ) : void 0;
  if (hostId === null || hostId === -1 || !patchTarget || !originalPropertyDescriptor)
    return () => {
    };
  Object.defineProperty(host, "adoptedStyleSheets", {
    configurable: originalPropertyDescriptor.configurable,
    enumerable: originalPropertyDescriptor.enumerable,
    get() {
      var _a3;
      return (_a3 = originalPropertyDescriptor.get) == null ? void 0 : _a3.call(this);
    },
    set(sheets) {
      var _a3;
      const result = (_a3 = originalPropertyDescriptor.set) == null ? void 0 : _a3.call(this, sheets);
      if (hostId !== null && hostId !== -1) {
        try {
          stylesheetManager.adoptStyleSheets(sheets, hostId);
        } catch (e2) {
        }
      }
      return result;
    }
  });
  return callbackWrapper(() => {
    Object.defineProperty(host, "adoptedStyleSheets", {
      configurable: originalPropertyDescriptor.configurable,
      enumerable: originalPropertyDescriptor.enumerable,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      get: originalPropertyDescriptor.get,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      set: originalPropertyDescriptor.set
    });
  });
}
function initStyleDeclarationObserver({
  styleDeclarationCb,
  mirror: mirror2,
  ignoreCSSAttributes,
  stylesheetManager
}, { win }) {
  const setProperty = win.CSSStyleDeclaration.prototype.setProperty;
  win.CSSStyleDeclaration.prototype.setProperty = new Proxy(setProperty, {
    apply: callbackWrapper(
      (target, thisArg, argumentsList) => {
        var _a2;
        const [property, value, priority] = argumentsList;
        if (ignoreCSSAttributes.has(property)) {
          return setProperty.apply(thisArg, [property, value, priority]);
        }
        const { id, styleId } = getIdAndStyleId(
          (_a2 = thisArg.parentRule) == null ? void 0 : _a2.parentStyleSheet,
          mirror2,
          stylesheetManager.styleMirror
        );
        if (id && id !== -1 || styleId && styleId !== -1) {
          styleDeclarationCb({
            id,
            styleId,
            set: {
              property,
              value,
              priority
            },
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            index: getNestedCSSRulePositions(thisArg.parentRule)
          });
        }
        return target.apply(thisArg, argumentsList);
      }
    )
  });
  const removeProperty = win.CSSStyleDeclaration.prototype.removeProperty;
  win.CSSStyleDeclaration.prototype.removeProperty = new Proxy(removeProperty, {
    apply: callbackWrapper(
      (target, thisArg, argumentsList) => {
        var _a2;
        const [property] = argumentsList;
        if (ignoreCSSAttributes.has(property)) {
          return removeProperty.apply(thisArg, [property]);
        }
        const { id, styleId } = getIdAndStyleId(
          (_a2 = thisArg.parentRule) == null ? void 0 : _a2.parentStyleSheet,
          mirror2,
          stylesheetManager.styleMirror
        );
        if (id && id !== -1 || styleId && styleId !== -1) {
          styleDeclarationCb({
            id,
            styleId,
            remove: {
              property
            },
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            index: getNestedCSSRulePositions(thisArg.parentRule)
          });
        }
        return target.apply(thisArg, argumentsList);
      }
    )
  });
  return callbackWrapper(() => {
    win.CSSStyleDeclaration.prototype.setProperty = setProperty;
    win.CSSStyleDeclaration.prototype.removeProperty = removeProperty;
  });
}
function initMediaInteractionObserver({
  mediaInteractionCb,
  blockClass,
  blockSelector,
  unblockSelector,
  mirror: mirror2,
  sampling,
  doc
}) {
  const handler = callbackWrapper(
    (type) => throttle$1(
      callbackWrapper((event) => {
        const target = getEventTarget(event);
        if (!target || isBlocked(
          target,
          blockClass,
          blockSelector,
          unblockSelector,
          true
        )) {
          return;
        }
        const { currentTime, volume, muted, playbackRate } = target;
        mediaInteractionCb({
          type,
          id: mirror2.getId(target),
          currentTime,
          volume,
          muted,
          playbackRate
        });
      }),
      sampling.media || 500
    )
  );
  const handlers2 = [
    on("play", handler(MediaInteractions.Play), doc),
    on("pause", handler(MediaInteractions.Pause), doc),
    on("seeked", handler(MediaInteractions.Seeked), doc),
    on("volumechange", handler(MediaInteractions.VolumeChange), doc),
    on("ratechange", handler(MediaInteractions.RateChange), doc)
  ];
  return callbackWrapper(() => {
    handlers2.forEach((h) => h());
  });
}
function initFontObserver({ fontCb, doc }) {
  const win = doc.defaultView;
  if (!win) {
    return () => {
    };
  }
  const handlers2 = [];
  const fontMap = /* @__PURE__ */ new WeakMap();
  const originalFontFace = win.FontFace;
  win.FontFace = function FontFace2(family, source, descriptors) {
    const fontFace = new originalFontFace(family, source, descriptors);
    fontMap.set(fontFace, {
      family,
      buffer: typeof source !== "string",
      descriptors,
      fontSource: typeof source === "string" ? source : JSON.stringify(Array.from(new Uint8Array(source)))
    });
    return fontFace;
  };
  const restoreHandler = patch(
    doc.fonts,
    "add",
    function(original) {
      return function(fontFace) {
        setTimeout$1(
          callbackWrapper(() => {
            const p = fontMap.get(fontFace);
            if (p) {
              fontCb(p);
              fontMap.delete(fontFace);
            }
          }),
          0
        );
        return original.apply(this, [fontFace]);
      };
    }
  );
  handlers2.push(() => {
    win.FontFace = originalFontFace;
  });
  handlers2.push(restoreHandler);
  return callbackWrapper(() => {
    handlers2.forEach((h) => h());
  });
}
function initSelectionObserver(param) {
  const {
    doc,
    mirror: mirror2,
    blockClass,
    blockSelector,
    unblockSelector,
    selectionCb
  } = param;
  let collapsed = true;
  const updateSelection = callbackWrapper(() => {
    const selection = doc.getSelection();
    if (!selection || collapsed && (selection == null ? void 0 : selection.isCollapsed)) return;
    collapsed = selection.isCollapsed || false;
    const ranges = [];
    const count = selection.rangeCount || 0;
    for (let i2 = 0; i2 < count; i2++) {
      const range = selection.getRangeAt(i2);
      const { startContainer, startOffset, endContainer, endOffset } = range;
      const blocked = isBlocked(
        startContainer,
        blockClass,
        blockSelector,
        unblockSelector,
        true
      ) || isBlocked(
        endContainer,
        blockClass,
        blockSelector,
        unblockSelector,
        true
      );
      if (blocked) continue;
      ranges.push({
        start: mirror2.getId(startContainer),
        startOffset,
        end: mirror2.getId(endContainer),
        endOffset
      });
    }
    selectionCb({ ranges });
  });
  updateSelection();
  return on("selectionchange", updateSelection);
}
function initCustomElementObserver({
  doc,
  customElementCb
}) {
  const win = doc.defaultView;
  if (!win || !win.customElements) return () => {
  };
  const restoreHandler = patch(
    win.customElements,
    "define",
    function(original) {
      return function(name, constructor, options) {
        try {
          customElementCb({
            define: {
              name
            }
          });
        } catch (e2) {
        }
        return original.apply(this, [name, constructor, options]);
      };
    }
  );
  return restoreHandler;
}
function initObservers(o2, _hooks = {}) {
  const currentWindow = o2.doc.defaultView;
  if (!currentWindow) {
    return () => {
    };
  }
  let mutationObserver;
  if (o2.recordDOM) {
    mutationObserver = initMutationObserver(o2, o2.doc);
  }
  const mousemoveHandler = initMoveObserver(o2);
  const mouseInteractionHandler = initMouseInteractionObserver(o2);
  const scrollHandler = initScrollObserver(o2);
  const viewportResizeHandler = initViewportResizeObserver(o2, {
    win: currentWindow
  });
  const inputHandler = initInputObserver(o2);
  const mediaInteractionHandler = initMediaInteractionObserver(o2);
  let styleSheetObserver = () => {
  };
  let adoptedStyleSheetObserver = () => {
  };
  let styleDeclarationObserver = () => {
  };
  let fontObserver = () => {
  };
  if (o2.recordDOM) {
    styleSheetObserver = initStyleSheetObserver(o2, { win: currentWindow });
    adoptedStyleSheetObserver = initAdoptedStyleSheetObserver(o2, o2.doc);
    styleDeclarationObserver = initStyleDeclarationObserver(o2, {
      win: currentWindow
    });
    if (o2.collectFonts) {
      fontObserver = initFontObserver(o2);
    }
  }
  const selectionObserver = initSelectionObserver(o2);
  const customElementObserver = initCustomElementObserver(o2);
  const pluginHandlers = [];
  for (const plugin of o2.plugins) {
    pluginHandlers.push(
      plugin.observer(plugin.callback, currentWindow, plugin.options)
    );
  }
  return callbackWrapper(() => {
    mutationBuffers.forEach((b) => b.reset());
    mutationObserver == null ? void 0 : mutationObserver.disconnect();
    mousemoveHandler();
    mouseInteractionHandler();
    scrollHandler();
    viewportResizeHandler();
    inputHandler();
    mediaInteractionHandler();
    styleSheetObserver();
    adoptedStyleSheetObserver();
    styleDeclarationObserver();
    fontObserver();
    selectionObserver();
    customElementObserver();
    pluginHandlers.forEach((h) => h());
  });
}
function hasNestedCSSRule(prop) {
  return typeof window[prop] !== "undefined";
}
function canMonkeyPatchNestedCSSRule(prop) {
  return Boolean(
    typeof window[prop] !== "undefined" && // Note: Generally, this check _shouldn't_ be necessary
    // However, in some scenarios (e.g. jsdom) this can sometimes fail, so we check for it here
    window[prop].prototype && "insertRule" in window[prop].prototype && "deleteRule" in window[prop].prototype
  );
}
class CrossOriginIframeMirror {
  constructor(generateIdFn) {
    this.generateIdFn = generateIdFn;
    this.iframeIdToRemoteIdMap = /* @__PURE__ */ new WeakMap();
    this.iframeRemoteIdToIdMap = /* @__PURE__ */ new WeakMap();
  }
  getId(iframe, remoteId, idToRemoteMap, remoteToIdMap) {
    const idToRemoteIdMap = idToRemoteMap || this.getIdToRemoteIdMap(iframe);
    const remoteIdToIdMap = remoteToIdMap || this.getRemoteIdToIdMap(iframe);
    let id = idToRemoteIdMap.get(remoteId);
    if (!id) {
      id = this.generateIdFn();
      idToRemoteIdMap.set(remoteId, id);
      remoteIdToIdMap.set(id, remoteId);
    }
    return id;
  }
  getIds(iframe, remoteId) {
    const idToRemoteIdMap = this.getIdToRemoteIdMap(iframe);
    const remoteIdToIdMap = this.getRemoteIdToIdMap(iframe);
    return remoteId.map(
      (id) => this.getId(iframe, id, idToRemoteIdMap, remoteIdToIdMap)
    );
  }
  getRemoteId(iframe, id, map) {
    const remoteIdToIdMap = map || this.getRemoteIdToIdMap(iframe);
    if (typeof id !== "number") return id;
    const remoteId = remoteIdToIdMap.get(id);
    if (!remoteId) return -1;
    return remoteId;
  }
  getRemoteIds(iframe, ids) {
    const remoteIdToIdMap = this.getRemoteIdToIdMap(iframe);
    return ids.map((id) => this.getRemoteId(iframe, id, remoteIdToIdMap));
  }
  reset(iframe) {
    if (!iframe) {
      this.iframeIdToRemoteIdMap = /* @__PURE__ */ new WeakMap();
      this.iframeRemoteIdToIdMap = /* @__PURE__ */ new WeakMap();
      return;
    }
    this.iframeIdToRemoteIdMap.delete(iframe);
    this.iframeRemoteIdToIdMap.delete(iframe);
  }
  getIdToRemoteIdMap(iframe) {
    let idToRemoteIdMap = this.iframeIdToRemoteIdMap.get(iframe);
    if (!idToRemoteIdMap) {
      idToRemoteIdMap = /* @__PURE__ */ new Map();
      this.iframeIdToRemoteIdMap.set(iframe, idToRemoteIdMap);
    }
    return idToRemoteIdMap;
  }
  getRemoteIdToIdMap(iframe) {
    let remoteIdToIdMap = this.iframeRemoteIdToIdMap.get(iframe);
    if (!remoteIdToIdMap) {
      remoteIdToIdMap = /* @__PURE__ */ new Map();
      this.iframeRemoteIdToIdMap.set(iframe, remoteIdToIdMap);
    }
    return remoteIdToIdMap;
  }
}
class IframeManagerNoop {
  constructor() {
    this.crossOriginIframeMirror = new CrossOriginIframeMirror(genId);
    this.crossOriginIframeRootIdMap = /* @__PURE__ */ new WeakMap();
  }
  addIframe() {
  }
  addLoadListener() {
  }
  attachIframe() {
  }
}
class IframeManager {
  constructor(options) {
    this.iframes = /* @__PURE__ */ new WeakMap();
    this.crossOriginIframeMap = /* @__PURE__ */ new WeakMap();
    this.crossOriginIframeMirror = new CrossOriginIframeMirror(genId);
    this.crossOriginIframeRootIdMap = /* @__PURE__ */ new WeakMap();
    this.mutationCb = options.mutationCb;
    this.wrappedEmit = options.wrappedEmit;
    this.stylesheetManager = options.stylesheetManager;
    this.recordCrossOriginIframes = options.recordCrossOriginIframes;
    this.crossOriginIframeStyleMirror = new CrossOriginIframeMirror(
      this.stylesheetManager.styleMirror.generateId.bind(
        this.stylesheetManager.styleMirror
      )
    );
    this.mirror = options.mirror;
    if (this.recordCrossOriginIframes) {
      window.addEventListener("message", this.handleMessage.bind(this));
    }
  }
  addIframe(iframeEl) {
    this.iframes.set(iframeEl, true);
    if (iframeEl.contentWindow)
      this.crossOriginIframeMap.set(iframeEl.contentWindow, iframeEl);
  }
  addLoadListener(cb) {
    this.loadListener = cb;
  }
  attachIframe(iframeEl, childSn) {
    var _a2, _b;
    this.mutationCb({
      adds: [
        {
          parentId: this.mirror.getId(iframeEl),
          nextId: null,
          node: childSn
        }
      ],
      removes: [],
      texts: [],
      attributes: [],
      isAttachIframe: true
    });
    if (this.recordCrossOriginIframes)
      (_a2 = iframeEl.contentWindow) == null ? void 0 : _a2.addEventListener(
        "message",
        this.handleMessage.bind(this)
      );
    (_b = this.loadListener) == null ? void 0 : _b.call(this, iframeEl);
    const iframeDoc = getIFrameContentDocument(iframeEl);
    if (iframeDoc && iframeDoc.adoptedStyleSheets && iframeDoc.adoptedStyleSheets.length > 0)
      this.stylesheetManager.adoptStyleSheets(
        iframeDoc.adoptedStyleSheets,
        this.mirror.getId(iframeDoc)
      );
  }
  handleMessage(message) {
    const crossOriginMessageEvent = message;
    if (crossOriginMessageEvent.data.type !== "rrweb" || // To filter out the rrweb messages which are forwarded by some sites.
    crossOriginMessageEvent.origin !== crossOriginMessageEvent.data.origin)
      return;
    const iframeSourceWindow = message.source;
    if (!iframeSourceWindow) return;
    const iframeEl = this.crossOriginIframeMap.get(message.source);
    if (!iframeEl) return;
    const transformedEvent = this.transformCrossOriginEvent(
      iframeEl,
      crossOriginMessageEvent.data.event
    );
    if (transformedEvent)
      this.wrappedEmit(
        transformedEvent,
        crossOriginMessageEvent.data.isCheckout
      );
  }
  transformCrossOriginEvent(iframeEl, e2) {
    var _a2;
    switch (e2.type) {
      case EventType.FullSnapshot: {
        this.crossOriginIframeMirror.reset(iframeEl);
        this.crossOriginIframeStyleMirror.reset(iframeEl);
        this.replaceIdOnNode(e2.data.node, iframeEl);
        const rootId = e2.data.node.id;
        this.crossOriginIframeRootIdMap.set(iframeEl, rootId);
        this.patchRootIdOnNode(e2.data.node, rootId);
        return {
          timestamp: e2.timestamp,
          type: EventType.IncrementalSnapshot,
          data: {
            source: IncrementalSource.Mutation,
            adds: [
              {
                parentId: this.mirror.getId(iframeEl),
                nextId: null,
                node: e2.data.node
              }
            ],
            removes: [],
            texts: [],
            attributes: [],
            isAttachIframe: true
          }
        };
      }
      case EventType.Meta:
      case EventType.Load:
      case EventType.DomContentLoaded: {
        return false;
      }
      case EventType.Plugin: {
        return e2;
      }
      case EventType.Custom: {
        this.replaceIds(
          e2.data.payload,
          iframeEl,
          ["id", "parentId", "previousId", "nextId"]
        );
        return e2;
      }
      case EventType.IncrementalSnapshot: {
        switch (e2.data.source) {
          case IncrementalSource.Mutation: {
            e2.data.adds.forEach((n2) => {
              this.replaceIds(n2, iframeEl, [
                "parentId",
                "nextId",
                "previousId"
              ]);
              this.replaceIdOnNode(n2.node, iframeEl);
              const rootId = this.crossOriginIframeRootIdMap.get(iframeEl);
              rootId && this.patchRootIdOnNode(n2.node, rootId);
            });
            e2.data.removes.forEach((n2) => {
              this.replaceIds(n2, iframeEl, ["parentId", "id"]);
            });
            e2.data.attributes.forEach((n2) => {
              this.replaceIds(n2, iframeEl, ["id"]);
            });
            e2.data.texts.forEach((n2) => {
              this.replaceIds(n2, iframeEl, ["id"]);
            });
            return e2;
          }
          case IncrementalSource.Drag:
          case IncrementalSource.TouchMove:
          case IncrementalSource.MouseMove: {
            e2.data.positions.forEach((p) => {
              this.replaceIds(p, iframeEl, ["id"]);
            });
            return e2;
          }
          case IncrementalSource.ViewportResize: {
            return false;
          }
          case IncrementalSource.MediaInteraction:
          case IncrementalSource.MouseInteraction:
          case IncrementalSource.Scroll:
          case IncrementalSource.CanvasMutation:
          case IncrementalSource.Input: {
            this.replaceIds(e2.data, iframeEl, ["id"]);
            return e2;
          }
          case IncrementalSource.StyleSheetRule:
          case IncrementalSource.StyleDeclaration: {
            this.replaceIds(e2.data, iframeEl, ["id"]);
            this.replaceStyleIds(e2.data, iframeEl, ["styleId"]);
            return e2;
          }
          case IncrementalSource.Font: {
            return e2;
          }
          case IncrementalSource.Selection: {
            e2.data.ranges.forEach((range) => {
              this.replaceIds(range, iframeEl, ["start", "end"]);
            });
            return e2;
          }
          case IncrementalSource.AdoptedStyleSheet: {
            this.replaceIds(e2.data, iframeEl, ["id"]);
            this.replaceStyleIds(e2.data, iframeEl, ["styleIds"]);
            (_a2 = e2.data.styles) == null ? void 0 : _a2.forEach((style) => {
              this.replaceStyleIds(style, iframeEl, ["styleId"]);
            });
            return e2;
          }
        }
      }
    }
    return false;
  }
  replace(iframeMirror, obj, iframeEl, keys) {
    for (const key of keys) {
      if (!Array.isArray(obj[key]) && typeof obj[key] !== "number") continue;
      if (Array.isArray(obj[key])) {
        obj[key] = iframeMirror.getIds(
          iframeEl,
          obj[key]
        );
      } else {
        obj[key] = iframeMirror.getId(iframeEl, obj[key]);
      }
    }
    return obj;
  }
  replaceIds(obj, iframeEl, keys) {
    return this.replace(this.crossOriginIframeMirror, obj, iframeEl, keys);
  }
  replaceStyleIds(obj, iframeEl, keys) {
    return this.replace(this.crossOriginIframeStyleMirror, obj, iframeEl, keys);
  }
  replaceIdOnNode(node, iframeEl) {
    this.replaceIds(node, iframeEl, ["id", "rootId"]);
    if ("childNodes" in node) {
      node.childNodes.forEach((child) => {
        this.replaceIdOnNode(child, iframeEl);
      });
    }
  }
  patchRootIdOnNode(node, rootId) {
    if (node.type !== NodeType$2.Document && !node.rootId) node.rootId = rootId;
    if ("childNodes" in node) {
      node.childNodes.forEach((child) => {
        this.patchRootIdOnNode(child, rootId);
      });
    }
  }
}
class ShadowDomManagerNoop {
  init() {
  }
  addShadowRoot() {
  }
  observeAttachShadow() {
  }
  reset() {
  }
}
class ShadowDomManager {
  constructor(options) {
    this.shadowDoms = /* @__PURE__ */ new WeakSet();
    this.restoreHandlers = [];
    this.mutationCb = options.mutationCb;
    this.scrollCb = options.scrollCb;
    this.bypassOptions = options.bypassOptions;
    this.mirror = options.mirror;
    this.init();
  }
  init() {
    this.reset();
    this.patchAttachShadow(Element, document);
  }
  addShadowRoot(shadowRoot, doc) {
    if (!isNativeShadowDom(shadowRoot)) return;
    if (this.shadowDoms.has(shadowRoot)) return;
    this.shadowDoms.add(shadowRoot);
    this.bypassOptions.canvasManager.addShadowRoot(shadowRoot);
    const observer = initMutationObserver(
      {
        ...this.bypassOptions,
        doc,
        mutationCb: this.mutationCb,
        mirror: this.mirror,
        shadowDomManager: this
      },
      shadowRoot
    );
    this.restoreHandlers.push(() => observer.disconnect());
    this.restoreHandlers.push(
      initScrollObserver({
        ...this.bypassOptions,
        scrollCb: this.scrollCb,
        // https://gist.github.com/praveenpuglia/0832da687ed5a5d7a0907046c9ef1813
        // scroll is not allowed to pass the boundary, so we need to listen the shadow document
        doc: shadowRoot,
        mirror: this.mirror
      })
    );
    setTimeout$1(() => {
      if (shadowRoot.adoptedStyleSheets && shadowRoot.adoptedStyleSheets.length > 0)
        this.bypassOptions.stylesheetManager.adoptStyleSheets(
          shadowRoot.adoptedStyleSheets,
          this.mirror.getId(shadowRoot.host)
        );
      this.restoreHandlers.push(
        initAdoptedStyleSheetObserver(
          {
            mirror: this.mirror,
            stylesheetManager: this.bypassOptions.stylesheetManager
          },
          shadowRoot
        )
      );
    }, 0);
  }
  /**
   * Monkey patch 'attachShadow' of an IFrameElement to observe newly added shadow doms.
   */
  observeAttachShadow(iframeElement) {
    const iframeDoc = getIFrameContentDocument(iframeElement);
    const iframeWindow = getIFrameContentWindow(iframeElement);
    if (!iframeDoc || !iframeWindow) return;
    this.patchAttachShadow(
      iframeWindow.Element,
      iframeDoc
    );
  }
  /**
   * Patch 'attachShadow' to observe newly added shadow doms.
   */
  patchAttachShadow(element, doc) {
    const manager = this;
    this.restoreHandlers.push(
      patch(
        element.prototype,
        "attachShadow",
        function(original) {
          return function(option) {
            const shadowRoot = original.call(this, option);
            if (this.shadowRoot && inDom(this))
              manager.addShadowRoot(this.shadowRoot, doc);
            return shadowRoot;
          };
        }
      )
    );
  }
  reset() {
    this.restoreHandlers.forEach((handler) => {
      try {
        handler();
      } catch (e2) {
      }
    });
    this.restoreHandlers = [];
    this.shadowDoms = /* @__PURE__ */ new WeakSet();
    this.bypassOptions.canvasManager.resetShadowRoots();
  }
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (var i$1 = 0; i$1 < chars.length; i$1++) {
  lookup[chars.charCodeAt(i$1)] = i$1;
}
class CanvasManagerNoop {
  reset() {
  }
  freeze() {
  }
  unfreeze() {
  }
  lock() {
  }
  unlock() {
  }
  snapshot() {
  }
  addWindow() {
  }
  addShadowRoot() {
  }
  resetShadowRoots() {
  }
}
class StylesheetManager {
  constructor(options) {
    this.trackedLinkElements = /* @__PURE__ */ new WeakSet();
    this.styleMirror = new StyleSheetMirror();
    this.mutationCb = options.mutationCb;
    this.adoptedStyleSheetCb = options.adoptedStyleSheetCb;
  }
  attachLinkElement(linkEl, childSn) {
    if ("_cssText" in childSn.attributes)
      this.mutationCb({
        adds: [],
        removes: [],
        texts: [],
        attributes: [
          {
            id: childSn.id,
            attributes: childSn.attributes
          }
        ]
      });
    this.trackLinkElement(linkEl);
  }
  trackLinkElement(linkEl) {
    if (this.trackedLinkElements.has(linkEl)) return;
    this.trackedLinkElements.add(linkEl);
    this.trackStylesheetInLinkElement(linkEl);
  }
  adoptStyleSheets(sheets, hostId) {
    if (sheets.length === 0) return;
    const adoptedStyleSheetData = {
      id: hostId,
      styleIds: []
    };
    const styles = [];
    for (const sheet of sheets) {
      let styleId;
      if (!this.styleMirror.has(sheet)) {
        styleId = this.styleMirror.add(sheet);
        styles.push({
          styleId,
          rules: Array.from(sheet.rules || CSSRule, (r2, index) => ({
            rule: stringifyRule(r2),
            index
          }))
        });
      } else styleId = this.styleMirror.getId(sheet);
      adoptedStyleSheetData.styleIds.push(styleId);
    }
    if (styles.length > 0) adoptedStyleSheetData.styles = styles;
    this.adoptedStyleSheetCb(adoptedStyleSheetData);
  }
  reset() {
    this.styleMirror.reset();
    this.trackedLinkElements = /* @__PURE__ */ new WeakSet();
  }
  // TODO: take snapshot on stylesheet reload by applying event listener
  trackStylesheetInLinkElement(_linkEl) {
  }
}
class ProcessedNodeManager {
  constructor() {
    this.nodeMap = /* @__PURE__ */ new WeakMap();
    this.active = false;
  }
  inOtherBuffer(node, thisBuffer) {
    const buffers = this.nodeMap.get(node);
    return buffers && Array.from(buffers).some((buffer) => buffer !== thisBuffer);
  }
  add(node, buffer) {
    if (!this.active) {
      this.active = true;
      onRequestAnimationFrame(() => {
        this.nodeMap = /* @__PURE__ */ new WeakMap();
        this.active = false;
      });
    }
    this.nodeMap.set(node, (this.nodeMap.get(node) || /* @__PURE__ */ new Set()).add(buffer));
  }
  destroy() {
  }
}
let wrappedEmit;
let _takeFullSnapshot;
try {
  if (Array.from([1], (x) => x * 2)[0] !== 2) {
    const cleanFrame = document.createElement("iframe");
    document.body.appendChild(cleanFrame);
    Array.from = ((_a = cleanFrame.contentWindow) == null ? void 0 : _a.Array.from) || Array.from;
    document.body.removeChild(cleanFrame);
  }
} catch (err) {
  console.debug("Unable to override Array.from", err);
}
const mirror = createMirror$2();
function record(options = {}) {
  const {
    emit,
    checkoutEveryNms,
    checkoutEveryNth,
    blockClass = "rr-block",
    blockSelector = null,
    unblockSelector = null,
    ignoreClass = "rr-ignore",
    ignoreSelector = null,
    maskAllText = false,
    maskTextClass = "rr-mask",
    unmaskTextClass = null,
    maskTextSelector = null,
    unmaskTextSelector = null,
    inlineStylesheet = true,
    maskAllInputs,
    maskInputOptions: _maskInputOptions,
    slimDOMOptions: _slimDOMOptions,
    maskAttributeFn,
    maskInputFn,
    maskTextFn,
    maxCanvasSize = null,
    packFn,
    sampling = {},
    dataURLOptions = {},
    mousemoveWait,
    recordDOM = true,
    recordCanvas = false,
    recordCrossOriginIframes = false,
    recordAfter = options.recordAfter === "DOMContentLoaded" ? options.recordAfter : "load",
    userTriggeredOnInput = false,
    collectFonts = false,
    inlineImages = false,
    plugins,
    keepIframeSrcFn = () => false,
    ignoreCSSAttributes = /* @__PURE__ */ new Set([]),
    errorHandler: errorHandler2,
    onMutation,
    getCanvasManager
  } = options;
  registerErrorHandler(errorHandler2);
  const inEmittingFrame = recordCrossOriginIframes ? window.parent === window : true;
  let passEmitsToParent = false;
  if (!inEmittingFrame) {
    try {
      if (window.parent.document) {
        passEmitsToParent = false;
      }
    } catch (e2) {
      passEmitsToParent = true;
    }
  }
  if (inEmittingFrame && !emit) {
    throw new Error("emit function is required");
  }
  if (!inEmittingFrame && !passEmitsToParent) {
    return () => {
    };
  }
  if (mousemoveWait !== void 0 && sampling.mousemove === void 0) {
    sampling.mousemove = mousemoveWait;
  }
  mirror.reset();
  const maskInputOptions = maskAllInputs === true ? {
    color: true,
    date: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true,
    textarea: true,
    select: true,
    radio: true,
    checkbox: true
  } : _maskInputOptions !== void 0 ? _maskInputOptions : {};
  const slimDOMOptions = _slimDOMOptions === true || _slimDOMOptions === "all" ? {
    script: true,
    comment: true,
    headFavicon: true,
    headWhitespace: true,
    headMetaSocial: true,
    headMetaRobots: true,
    headMetaHttpEquiv: true,
    headMetaVerification: true,
    // the following are off for slimDOMOptions === true,
    // as they destroy some (hidden) info:
    headMetaAuthorship: _slimDOMOptions === "all",
    headMetaDescKeywords: _slimDOMOptions === "all"
  } : _slimDOMOptions ? _slimDOMOptions : {};
  polyfill$1();
  let lastFullSnapshotEvent;
  let incrementalSnapshotCount = 0;
  const eventProcessor = (e2) => {
    for (const plugin of plugins || []) {
      if (plugin.eventProcessor) {
        e2 = plugin.eventProcessor(e2);
      }
    }
    if (packFn && // Disable packing events which will be emitted to parent frames.
    !passEmitsToParent) {
      e2 = packFn(e2);
    }
    return e2;
  };
  wrappedEmit = (r2, isCheckout) => {
    var _a2;
    const e2 = r2;
    e2.timestamp = nowTimestamp();
    if (((_a2 = mutationBuffers[0]) == null ? void 0 : _a2.isFrozen()) && e2.type !== EventType.FullSnapshot && !(e2.type === EventType.IncrementalSnapshot && e2.data.source === IncrementalSource.Mutation)) {
      mutationBuffers.forEach((buf) => buf.unfreeze());
    }
    if (inEmittingFrame) {
      emit == null ? void 0 : emit(eventProcessor(e2), isCheckout);
    } else if (passEmitsToParent) {
      const message = {
        type: "rrweb",
        event: eventProcessor(e2),
        origin: window.location.origin,
        isCheckout
      };
      window.parent.postMessage(message, "*");
    }
    if (e2.type === EventType.FullSnapshot) {
      lastFullSnapshotEvent = e2;
      incrementalSnapshotCount = 0;
    } else if (e2.type === EventType.IncrementalSnapshot) {
      if (e2.data.source === IncrementalSource.Mutation && e2.data.isAttachIframe) {
        return;
      }
      incrementalSnapshotCount++;
      const exceedCount = checkoutEveryNth && incrementalSnapshotCount >= checkoutEveryNth;
      const exceedTime = checkoutEveryNms && lastFullSnapshotEvent && e2.timestamp - lastFullSnapshotEvent.timestamp > checkoutEveryNms;
      if (exceedCount || exceedTime) {
        takeFullSnapshot2(true);
      }
    }
  };
  const wrappedMutationEmit = (m) => {
    wrappedEmit({
      type: EventType.IncrementalSnapshot,
      data: {
        source: IncrementalSource.Mutation,
        ...m
      }
    });
  };
  const wrappedScrollEmit = (p) => wrappedEmit({
    type: EventType.IncrementalSnapshot,
    data: {
      source: IncrementalSource.Scroll,
      ...p
    }
  });
  const wrappedCanvasMutationEmit = (p) => wrappedEmit({
    type: EventType.IncrementalSnapshot,
    data: {
      source: IncrementalSource.CanvasMutation,
      ...p
    }
  });
  const wrappedAdoptedStyleSheetEmit = (a2) => wrappedEmit({
    type: EventType.IncrementalSnapshot,
    data: {
      source: IncrementalSource.AdoptedStyleSheet,
      ...a2
    }
  });
  const stylesheetManager = new StylesheetManager({
    mutationCb: wrappedMutationEmit,
    adoptedStyleSheetCb: wrappedAdoptedStyleSheetEmit
  });
  const iframeManager = typeof __RRWEB_EXCLUDE_IFRAME__ === "boolean" && __RRWEB_EXCLUDE_IFRAME__ ? new IframeManagerNoop() : new IframeManager({
    mirror,
    mutationCb: wrappedMutationEmit,
    stylesheetManager,
    recordCrossOriginIframes,
    wrappedEmit
  });
  for (const plugin of plugins || []) {
    if (plugin.getMirror)
      plugin.getMirror({
        nodeMirror: mirror,
        crossOriginIframeMirror: iframeManager.crossOriginIframeMirror,
        crossOriginIframeStyleMirror: iframeManager.crossOriginIframeStyleMirror
      });
  }
  const processedNodeManager = new ProcessedNodeManager();
  const canvasManager = _getCanvasManager(
    getCanvasManager,
    {
      mirror,
      win: window,
      mutationCb: (p) => wrappedEmit({
        type: EventType.IncrementalSnapshot,
        data: {
          source: IncrementalSource.CanvasMutation,
          ...p
        }
      }),
      recordCanvas,
      blockClass,
      blockSelector,
      unblockSelector,
      maxCanvasSize,
      sampling: sampling["canvas"],
      dataURLOptions,
      errorHandler: errorHandler2
    }
  );
  const shadowDomManager = typeof __RRWEB_EXCLUDE_SHADOW_DOM__ === "boolean" && __RRWEB_EXCLUDE_SHADOW_DOM__ ? new ShadowDomManagerNoop() : new ShadowDomManager({
    mutationCb: wrappedMutationEmit,
    scrollCb: wrappedScrollEmit,
    bypassOptions: {
      onMutation,
      blockClass,
      blockSelector,
      unblockSelector,
      maskAllText,
      maskTextClass,
      unmaskTextClass,
      maskTextSelector,
      unmaskTextSelector,
      inlineStylesheet,
      maskInputOptions,
      dataURLOptions,
      maskAttributeFn,
      maskTextFn,
      maskInputFn,
      recordCanvas,
      inlineImages,
      sampling,
      slimDOMOptions,
      iframeManager,
      stylesheetManager,
      canvasManager,
      keepIframeSrcFn,
      processedNodeManager
    },
    mirror
  });
  const takeFullSnapshot2 = (isCheckout = false) => {
    if (!recordDOM) {
      return;
    }
    wrappedEmit(
      {
        type: EventType.Meta,
        data: {
          href: window.location.href,
          width: getWindowWidth(),
          height: getWindowHeight()
        }
      },
      isCheckout
    );
    stylesheetManager.reset();
    shadowDomManager.init();
    mutationBuffers.forEach((buf) => buf.lock());
    const node = snapshot(document, {
      mirror,
      blockClass,
      blockSelector,
      unblockSelector,
      maskAllText,
      maskTextClass,
      unmaskTextClass,
      maskTextSelector,
      unmaskTextSelector,
      inlineStylesheet,
      maskAllInputs: maskInputOptions,
      maskAttributeFn,
      maskInputFn,
      maskTextFn,
      slimDOM: slimDOMOptions,
      dataURLOptions,
      recordCanvas,
      inlineImages,
      onSerialize: (n2) => {
        if (isSerializedIframe(n2, mirror)) {
          iframeManager.addIframe(n2);
        }
        if (isSerializedStylesheet(n2, mirror)) {
          stylesheetManager.trackLinkElement(n2);
        }
        if (hasShadowRoot(n2)) {
          shadowDomManager.addShadowRoot(n2.shadowRoot, document);
        }
      },
      onIframeLoad: (iframe, childSn) => {
        iframeManager.attachIframe(iframe, childSn);
        if (iframe.contentWindow) {
          canvasManager.addWindow(iframe.contentWindow);
        }
        shadowDomManager.observeAttachShadow(iframe);
      },
      onStylesheetLoad: (linkEl, childSn) => {
        stylesheetManager.attachLinkElement(linkEl, childSn);
      },
      keepIframeSrcFn
    });
    if (!node) {
      return console.warn("Failed to snapshot the document");
    }
    wrappedEmit({
      type: EventType.FullSnapshot,
      data: {
        node,
        initialOffset: getWindowScroll(window)
      }
    });
    mutationBuffers.forEach((buf) => buf.unlock());
    if (document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0)
      stylesheetManager.adoptStyleSheets(
        document.adoptedStyleSheets,
        mirror.getId(document)
      );
  };
  _takeFullSnapshot = takeFullSnapshot2;
  try {
    const handlers2 = [];
    const observe = (doc) => {
      var _a2;
      return callbackWrapper(initObservers)(
        {
          onMutation,
          mutationCb: wrappedMutationEmit,
          mousemoveCb: (positions, source) => wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: {
              source,
              positions
            }
          }),
          mouseInteractionCb: (d) => wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: {
              source: IncrementalSource.MouseInteraction,
              ...d
            }
          }),
          scrollCb: wrappedScrollEmit,
          viewportResizeCb: (d) => wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: {
              source: IncrementalSource.ViewportResize,
              ...d
            }
          }),
          inputCb: (v2) => wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: {
              source: IncrementalSource.Input,
              ...v2
            }
          }),
          mediaInteractionCb: (p) => wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: {
              source: IncrementalSource.MediaInteraction,
              ...p
            }
          }),
          styleSheetRuleCb: (r2) => wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: {
              source: IncrementalSource.StyleSheetRule,
              ...r2
            }
          }),
          styleDeclarationCb: (r2) => wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: {
              source: IncrementalSource.StyleDeclaration,
              ...r2
            }
          }),
          canvasMutationCb: wrappedCanvasMutationEmit,
          fontCb: (p) => wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: {
              source: IncrementalSource.Font,
              ...p
            }
          }),
          selectionCb: (p) => {
            wrappedEmit({
              type: EventType.IncrementalSnapshot,
              data: {
                source: IncrementalSource.Selection,
                ...p
              }
            });
          },
          customElementCb: (c2) => {
            wrappedEmit({
              type: EventType.IncrementalSnapshot,
              data: {
                source: IncrementalSource.CustomElement,
                ...c2
              }
            });
          },
          blockClass,
          ignoreClass,
          ignoreSelector,
          maskAllText,
          maskTextClass,
          unmaskTextClass,
          maskTextSelector,
          unmaskTextSelector,
          maskInputOptions,
          inlineStylesheet,
          sampling,
          recordDOM,
          recordCanvas,
          inlineImages,
          userTriggeredOnInput,
          collectFonts,
          doc,
          maskAttributeFn,
          maskInputFn,
          maskTextFn,
          keepIframeSrcFn,
          blockSelector,
          unblockSelector,
          slimDOMOptions,
          dataURLOptions,
          mirror,
          iframeManager,
          stylesheetManager,
          shadowDomManager,
          processedNodeManager,
          canvasManager,
          ignoreCSSAttributes,
          plugins: ((_a2 = plugins == null ? void 0 : plugins.filter((p) => p.observer)) == null ? void 0 : _a2.map((p) => ({
            observer: p.observer,
            options: p.options,
            callback: (payload) => wrappedEmit({
              type: EventType.Plugin,
              data: {
                plugin: p.name,
                payload
              }
            })
          }))) || []
        },
        {}
      );
    };
    iframeManager.addLoadListener((iframeEl) => {
      try {
        handlers2.push(observe(iframeEl.contentDocument));
      } catch (error) {
        console.warn(error);
      }
    });
    const init = () => {
      takeFullSnapshot2();
      handlers2.push(observe(document));
    };
    if (document.readyState === "interactive" || document.readyState === "complete") {
      init();
    } else {
      handlers2.push(
        on("DOMContentLoaded", () => {
          wrappedEmit({
            type: EventType.DomContentLoaded,
            data: {}
          });
          if (recordAfter === "DOMContentLoaded") init();
        })
      );
      handlers2.push(
        on(
          "load",
          () => {
            wrappedEmit({
              type: EventType.Load,
              data: {}
            });
            if (recordAfter === "load") init();
          },
          window
        )
      );
    }
    return () => {
      handlers2.forEach((h) => h());
      processedNodeManager.destroy();
      _takeFullSnapshot = void 0;
      unregisterErrorHandler();
    };
  } catch (error) {
    console.warn(error);
  }
}
function takeFullSnapshot(isCheckout) {
  if (!_takeFullSnapshot) {
    throw new Error("please take full snapshot after start recording");
  }
  _takeFullSnapshot(isCheckout);
}
record.mirror = mirror;
record.takeFullSnapshot = takeFullSnapshot;
function _getCanvasManager(getCanvasManagerFn, options) {
  try {
    return getCanvasManagerFn ? getCanvasManagerFn(options) : new CanvasManagerNoop();
  } catch {
    console.warn("Unable to initialize CanvasManager");
    return new CanvasManagerNoop();
  }
}
var n;
!function(t2) {
  t2[t2.NotStarted = 0] = "NotStarted", t2[t2.Running = 1] = "Running", t2[t2.Stopped = 2] = "Stopped";
}(n || (n = {}));
const ReplayEventTypeIncrementalSnapshot = 3;
const ReplayEventTypeCustom = 5;
function timestampToMs(timestamp) {
  const isMs = timestamp > 9999999999;
  return isMs ? timestamp : timestamp * 1e3;
}
function timestampToS(timestamp) {
  const isMs = timestamp > 9999999999;
  return isMs ? timestamp / 1e3 : timestamp;
}
function addBreadcrumbEvent(replay, breadcrumb) {
  if (breadcrumb.category === "sentry.transaction") {
    return;
  }
  if (["ui.click", "ui.input"].includes(breadcrumb.category)) {
    replay.triggerUserActivity();
  } else {
    replay.checkAndHandleExpiredSession();
  }
  replay.addUpdate(() => {
    replay.throttledAddEvent({
      type: EventType.Custom,
      // TODO: We were converting from ms to seconds for breadcrumbs, spans,
      // but maybe we should just keep them as milliseconds
      timestamp: (breadcrumb.timestamp || 0) * 1e3,
      data: {
        tag: "breadcrumb",
        // normalize to max. 10 depth and 1_000 properties per object
        payload: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_15__.normalize)(breadcrumb, 10, 1e3)
      }
    });
    return breadcrumb.category === "console";
  });
}
const INTERACTIVE_SELECTOR = "button,a";
function getClosestInteractive(element) {
  const closestInteractive = element.closest(INTERACTIVE_SELECTOR);
  return closestInteractive || element;
}
function getClickTargetNode(event) {
  const target = getTargetNode(event);
  if (!target || !(target instanceof Element)) {
    return target;
  }
  return getClosestInteractive(target);
}
function getTargetNode(event) {
  if (isEventWithTarget(event)) {
    return event.target;
  }
  return event;
}
function isEventWithTarget(event) {
  return typeof event === "object" && !!event && "target" in event;
}
let handlers;
function onWindowOpen(cb) {
  if (!handlers) {
    handlers = [];
    monkeyPatchWindowOpen();
  }
  handlers.push(cb);
  return () => {
    const pos = handlers ? handlers.indexOf(cb) : -1;
    if (pos > -1) {
      handlers.splice(pos, 1);
    }
  };
}
function monkeyPatchWindowOpen() {
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_16__.fill)(WINDOW, "open", function(originalWindowOpen) {
    return function(...args) {
      if (handlers) {
        try {
          handlers.forEach((handler) => handler());
        } catch {
        }
      }
      return originalWindowOpen.apply(WINDOW, args);
    };
  });
}
const IncrementalMutationSources = /* @__PURE__ */ new Set([
  IncrementalSource.Mutation,
  IncrementalSource.StyleSheetRule,
  IncrementalSource.StyleDeclaration,
  IncrementalSource.AdoptedStyleSheet,
  IncrementalSource.CanvasMutation,
  IncrementalSource.Selection,
  IncrementalSource.MediaInteraction
]);
function handleClick(clickDetector, clickBreadcrumb, node) {
  clickDetector.handleClick(clickBreadcrumb, node);
}
class ClickDetector {
  // protected for testing
  constructor(replay, slowClickConfig, _addBreadcrumbEvent = addBreadcrumbEvent) {
    this._lastMutation = 0;
    this._lastScroll = 0;
    this._clicks = [];
    this._timeout = slowClickConfig.timeout / 1e3;
    this._threshold = slowClickConfig.threshold / 1e3;
    this._scrollTimeout = slowClickConfig.scrollTimeout / 1e3;
    this._replay = replay;
    this._ignoreSelector = slowClickConfig.ignoreSelector;
    this._addBreadcrumbEvent = _addBreadcrumbEvent;
  }
  /** Register click detection handlers on mutation or scroll. */
  addListeners() {
    const cleanupWindowOpen = onWindowOpen(() => {
      this._lastMutation = nowInSeconds();
    });
    this._teardown = () => {
      cleanupWindowOpen();
      this._clicks = [];
      this._lastMutation = 0;
      this._lastScroll = 0;
    };
  }
  /** Clean up listeners. */
  removeListeners() {
    if (this._teardown) {
      this._teardown();
    }
    if (this._checkClickTimeout) {
      clearTimeout(this._checkClickTimeout);
    }
  }
  /** @inheritDoc */
  handleClick(breadcrumb, node) {
    if (ignoreElement(node, this._ignoreSelector) || !isClickBreadcrumb(breadcrumb)) {
      return;
    }
    const newClick = {
      timestamp: timestampToS(breadcrumb.timestamp),
      clickBreadcrumb: breadcrumb,
      // Set this to 0 so we know it originates from the click breadcrumb
      clickCount: 0,
      node
    };
    if (this._clicks.some((click) => click.node === newClick.node && Math.abs(click.timestamp - newClick.timestamp) < 1)) {
      return;
    }
    this._clicks.push(newClick);
    if (this._clicks.length === 1) {
      this._scheduleCheckClicks();
    }
  }
  /** @inheritDoc */
  registerMutation(timestamp = Date.now()) {
    this._lastMutation = timestampToS(timestamp);
  }
  /** @inheritDoc */
  registerScroll(timestamp = Date.now()) {
    this._lastScroll = timestampToS(timestamp);
  }
  /** @inheritDoc */
  registerClick(element) {
    const node = getClosestInteractive(element);
    this._handleMultiClick(node);
  }
  /** Count multiple clicks on elements. */
  _handleMultiClick(node) {
    this._getClicks(node).forEach((click) => {
      click.clickCount++;
    });
  }
  /** Get all pending clicks for a given node. */
  _getClicks(node) {
    return this._clicks.filter((click) => click.node === node);
  }
  /** Check the clicks that happened. */
  _checkClicks() {
    const timedOutClicks = [];
    const now = nowInSeconds();
    this._clicks.forEach((click) => {
      if (!click.mutationAfter && this._lastMutation) {
        click.mutationAfter = click.timestamp <= this._lastMutation ? this._lastMutation - click.timestamp : void 0;
      }
      if (!click.scrollAfter && this._lastScroll) {
        click.scrollAfter = click.timestamp <= this._lastScroll ? this._lastScroll - click.timestamp : void 0;
      }
      if (click.timestamp + this._timeout <= now) {
        timedOutClicks.push(click);
      }
    });
    for (const click of timedOutClicks) {
      const pos = this._clicks.indexOf(click);
      if (pos > -1) {
        this._generateBreadcrumbs(click);
        this._clicks.splice(pos, 1);
      }
    }
    if (this._clicks.length) {
      this._scheduleCheckClicks();
    }
  }
  /** Generate matching breadcrumb(s) for the click. */
  _generateBreadcrumbs(click) {
    const replay = this._replay;
    const hadScroll = click.scrollAfter && click.scrollAfter <= this._scrollTimeout;
    const hadMutation = click.mutationAfter && click.mutationAfter <= this._threshold;
    const isSlowClick = !hadScroll && !hadMutation;
    const { clickCount, clickBreadcrumb } = click;
    if (isSlowClick) {
      const timeAfterClickMs = Math.min(click.mutationAfter || this._timeout, this._timeout) * 1e3;
      const endReason = timeAfterClickMs < this._timeout * 1e3 ? "mutation" : "timeout";
      const breadcrumb = {
        type: "default",
        message: clickBreadcrumb.message,
        timestamp: clickBreadcrumb.timestamp,
        category: "ui.slowClickDetected",
        data: {
          ...clickBreadcrumb.data,
          url: WINDOW.location.href,
          route: replay.getCurrentRoute(),
          timeAfterClickMs,
          endReason,
          // If clickCount === 0, it means multiClick was not correctly captured here
          // - we still want to send 1 in this case
          clickCount: clickCount || 1
        }
      };
      this._addBreadcrumbEvent(replay, breadcrumb);
      return;
    }
    if (clickCount > 1) {
      const breadcrumb = {
        type: "default",
        message: clickBreadcrumb.message,
        timestamp: clickBreadcrumb.timestamp,
        category: "ui.multiClick",
        data: {
          ...clickBreadcrumb.data,
          url: WINDOW.location.href,
          route: replay.getCurrentRoute(),
          clickCount,
          metric: true
        }
      };
      this._addBreadcrumbEvent(replay, breadcrumb);
    }
  }
  /** Schedule to check current clicks. */
  _scheduleCheckClicks() {
    if (this._checkClickTimeout) {
      clearTimeout(this._checkClickTimeout);
    }
    this._checkClickTimeout = (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_26__.setTimeout)(() => this._checkClicks(), 1e3);
  }
}
const SLOW_CLICK_TAGS = ["A", "BUTTON", "INPUT"];
function ignoreElement(node, ignoreSelector) {
  if (!SLOW_CLICK_TAGS.includes(node.tagName)) {
    return true;
  }
  if (node.tagName === "INPUT" && !["submit", "button"].includes(node.getAttribute("type") || "")) {
    return true;
  }
  if (node.tagName === "A" && (node.hasAttribute("download") || node.hasAttribute("target") && node.getAttribute("target") !== "_self")) {
    return true;
  }
  if (ignoreSelector && node.matches(ignoreSelector)) {
    return true;
  }
  return false;
}
function isClickBreadcrumb(breadcrumb) {
  return !!(breadcrumb.data && typeof breadcrumb.data.nodeId === "number" && breadcrumb.timestamp);
}
function nowInSeconds() {
  return Date.now() / 1e3;
}
function updateClickDetectorForRecordingEvent(clickDetector, event) {
  try {
    if (!isIncrementalEvent(event)) {
      return;
    }
    const { source } = event.data;
    if (IncrementalMutationSources.has(source)) {
      clickDetector.registerMutation(event.timestamp);
    }
    if (source === IncrementalSource.Scroll) {
      clickDetector.registerScroll(event.timestamp);
    }
    if (isIncrementalMouseInteraction(event)) {
      const { type, id } = event.data;
      const node = record.mirror.getNode(id);
      if (node instanceof HTMLElement && type === MouseInteractions.Click) {
        clickDetector.registerClick(node);
      }
    }
  } catch {
  }
}
function isIncrementalEvent(event) {
  return event.type === ReplayEventTypeIncrementalSnapshot;
}
function isIncrementalMouseInteraction(event) {
  return event.data.source === IncrementalSource.MouseInteraction;
}
function createBreadcrumb(breadcrumb) {
  return {
    timestamp: Date.now() / 1e3,
    type: "default",
    ...breadcrumb
  };
}
var NodeType = /* @__PURE__ */ ((NodeType2) => {
  NodeType2[NodeType2["Document"] = 0] = "Document";
  NodeType2[NodeType2["DocumentType"] = 1] = "DocumentType";
  NodeType2[NodeType2["Element"] = 2] = "Element";
  NodeType2[NodeType2["Text"] = 3] = "Text";
  NodeType2[NodeType2["CDATA"] = 4] = "CDATA";
  NodeType2[NodeType2["Comment"] = 5] = "Comment";
  return NodeType2;
})(NodeType || {});
const ATTRIBUTES_TO_RECORD = /* @__PURE__ */ new Set([
  "id",
  "class",
  "aria-label",
  "role",
  "name",
  "alt",
  "title",
  "data-test-id",
  "data-testid",
  "disabled",
  "aria-disabled",
  "data-sentry-component"
]);
function getAttributesToRecord(attributes) {
  const obj = {};
  if (!attributes["data-sentry-component"] && attributes["data-sentry-element"]) {
    attributes["data-sentry-component"] = attributes["data-sentry-element"];
  }
  for (const key in attributes) {
    if (ATTRIBUTES_TO_RECORD.has(key)) {
      let normalizedKey = key;
      if (key === "data-testid" || key === "data-test-id") {
        normalizedKey = "testId";
      }
      obj[normalizedKey] = attributes[key];
    }
  }
  return obj;
}
const handleDomListener = (replay) => {
  return (handlerData) => {
    if (!replay.isEnabled()) {
      return;
    }
    const result = handleDom(handlerData);
    if (!result) {
      return;
    }
    const isClick = handlerData.name === "click";
    const event = isClick ? handlerData.event : void 0;
    if (isClick && replay.clickDetector && (event == null ? void 0 : event.target) && !event.altKey && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
      handleClick(
        replay.clickDetector,
        result,
        getClickTargetNode(handlerData.event)
      );
    }
    addBreadcrumbEvent(replay, result);
  };
};
function getBaseDomBreadcrumb(target, message) {
  const nodeId = record.mirror.getId(target);
  const node = nodeId && record.mirror.getNode(nodeId);
  const meta = node && record.mirror.getMeta(node);
  const element = meta && isElement(meta) ? meta : null;
  return {
    message,
    data: element ? {
      nodeId,
      node: {
        id: nodeId,
        tagName: element.tagName,
        textContent: Array.from(element.childNodes).map((node2) => node2.type === NodeType.Text && node2.textContent).filter(Boolean).map((text) => text.trim()).join(""),
        attributes: getAttributesToRecord(element.attributes)
      }
    } : {}
  };
}
function handleDom(handlerData) {
  const { target, message } = getDomTarget(handlerData);
  return createBreadcrumb({
    category: `ui.${handlerData.name}`,
    ...getBaseDomBreadcrumb(target, message)
  });
}
function getDomTarget(handlerData) {
  const isClick = handlerData.name === "click";
  let message;
  let target = null;
  try {
    target = isClick ? getClickTargetNode(handlerData.event) : getTargetNode(handlerData.event);
    message = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.htmlTreeAsString)(target, { maxStringLength: 200 }) || "<unknown>";
  } catch {
    message = "<unknown>";
  }
  return { target, message };
}
function isElement(node) {
  return node.type === NodeType.Element;
}
function handleKeyboardEvent(replay, event) {
  if (!replay.isEnabled()) {
    return;
  }
  replay.updateUserActivity();
  const breadcrumb = getKeyboardBreadcrumb(event);
  if (!breadcrumb) {
    return;
  }
  addBreadcrumbEvent(replay, breadcrumb);
}
function getKeyboardBreadcrumb(event) {
  const { metaKey, shiftKey, ctrlKey, altKey, key, target } = event;
  if (!target || isInputElement(target) || !key) {
    return null;
  }
  const hasModifierKey = metaKey || ctrlKey || altKey;
  const isCharacterKey = key.length === 1;
  if (!hasModifierKey && isCharacterKey) {
    return null;
  }
  const message = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.htmlTreeAsString)(target, { maxStringLength: 200 }) || "<unknown>";
  const baseBreadcrumb = getBaseDomBreadcrumb(target, message);
  return createBreadcrumb({
    category: "ui.keyDown",
    message,
    data: {
      ...baseBreadcrumb.data,
      metaKey,
      shiftKey,
      ctrlKey,
      altKey,
      key
    }
  });
}
function isInputElement(target) {
  return target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
}
const ENTRY_TYPES = {
  // @ts-expect-error TODO: entry type does not fit the create* functions entry type
  resource: createResourceEntry,
  paint: createPaintEntry,
  // @ts-expect-error TODO: entry type does not fit the create* functions entry type
  navigation: createNavigationEntry
};
function webVitalHandler(getter, replay) {
  return ({ metric }) => void replay.replayPerformanceEntries.push(getter(metric));
}
function createPerformanceEntries(entries) {
  return entries.map(createPerformanceEntry).filter(Boolean);
}
function createPerformanceEntry(entry) {
  const entryType = ENTRY_TYPES[entry.entryType];
  if (!entryType) {
    return null;
  }
  return entryType(entry);
}
function getAbsoluteTime(time) {
  return (((0,_sentry_core__WEBPACK_IMPORTED_MODULE_20__.browserPerformanceTimeOrigin)() || WINDOW.performance.timeOrigin) + time) / 1e3;
}
function createPaintEntry(entry) {
  const { duration, entryType, name, startTime } = entry;
  const start = getAbsoluteTime(startTime);
  return {
    type: entryType,
    name,
    start,
    end: start + duration,
    data: void 0
  };
}
function createNavigationEntry(entry) {
  const {
    entryType,
    name,
    decodedBodySize,
    duration,
    domComplete,
    encodedBodySize,
    domContentLoadedEventStart,
    domContentLoadedEventEnd,
    domInteractive,
    loadEventStart,
    loadEventEnd,
    redirectCount,
    startTime,
    transferSize,
    type
  } = entry;
  if (duration === 0) {
    return null;
  }
  return {
    type: `${entryType}.${type}`,
    start: getAbsoluteTime(startTime),
    end: getAbsoluteTime(domComplete),
    name,
    data: {
      size: transferSize,
      decodedBodySize,
      encodedBodySize,
      duration,
      domInteractive,
      domContentLoadedEventStart,
      domContentLoadedEventEnd,
      loadEventStart,
      loadEventEnd,
      domComplete,
      redirectCount
    }
  };
}
function createResourceEntry(entry) {
  const {
    entryType,
    initiatorType,
    name,
    responseEnd,
    startTime,
    decodedBodySize,
    encodedBodySize,
    responseStatus,
    transferSize
  } = entry;
  if (["fetch", "xmlhttprequest"].includes(initiatorType)) {
    return null;
  }
  return {
    type: `${entryType}.${initiatorType}`,
    start: getAbsoluteTime(startTime),
    end: getAbsoluteTime(responseEnd),
    name,
    data: {
      size: transferSize,
      statusCode: responseStatus,
      decodedBodySize,
      encodedBodySize
    }
  };
}
function getLargestContentfulPaint(metric) {
  const lastEntry = metric.entries[metric.entries.length - 1];
  const node = (lastEntry == null ? void 0 : lastEntry.element) ? [lastEntry.element] : void 0;
  return getWebVital(metric, "largest-contentful-paint", node);
}
function isLayoutShift(entry) {
  return entry.sources !== void 0;
}
function getCumulativeLayoutShift(metric) {
  const layoutShifts = [];
  const nodes = [];
  for (const entry of metric.entries) {
    if (isLayoutShift(entry)) {
      const nodeIds = [];
      for (const source of entry.sources) {
        if (source.node) {
          nodes.push(source.node);
          const nodeId = record.mirror.getId(source.node);
          if (nodeId) {
            nodeIds.push(nodeId);
          }
        }
      }
      layoutShifts.push({ value: entry.value, nodeIds: nodeIds.length ? nodeIds : void 0 });
    }
  }
  return getWebVital(metric, "cumulative-layout-shift", nodes, layoutShifts);
}
function getInteractionToNextPaint(metric) {
  const lastEntry = metric.entries[metric.entries.length - 1];
  const node = (lastEntry == null ? void 0 : lastEntry.target) ? [lastEntry.target] : void 0;
  return getWebVital(metric, "interaction-to-next-paint", node);
}
function getWebVital(metric, name, nodes, attributions) {
  const value = metric.value;
  const rating = metric.rating;
  const end = getAbsoluteTime(value);
  return {
    type: "web-vital",
    name,
    start: end,
    end,
    data: {
      value,
      size: value,
      rating,
      nodeIds: nodes ? nodes.map((node) => record.mirror.getId(node)) : void 0,
      attributions
    }
  };
}
function setupPerformanceObserver(replay) {
  function addPerformanceEntry(entry) {
    if (!replay.performanceEntries.includes(entry)) {
      replay.performanceEntries.push(entry);
    }
  }
  function onEntries({ entries }) {
    entries.forEach(addPerformanceEntry);
  }
  const clearCallbacks = [];
  ["navigation", "paint", "resource"].forEach((type) => {
    clearCallbacks.push((0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_23__.addPerformanceInstrumentationHandler)(type, onEntries));
  });
  clearCallbacks.push(
    (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_23__.addLcpInstrumentationHandler)(webVitalHandler(getLargestContentfulPaint, replay)),
    (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_23__.addClsInstrumentationHandler)(webVitalHandler(getCumulativeLayoutShift, replay)),
    (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_23__.addInpInstrumentationHandler)(webVitalHandler(getInteractionToNextPaint, replay))
  );
  return () => {
    clearCallbacks.forEach((clearCallback) => clearCallback());
  };
}
const DEBUG_BUILD = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
const r = `var t=Uint8Array,n=Uint16Array,r=Int32Array,e=new t([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),i=new t([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),s=new t([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(t,e){for(var i=new n(31),s=0;s<31;++s)i[s]=e+=1<<t[s-1];var a=new r(i[30]);for(s=1;s<30;++s)for(var o=i[s];o<i[s+1];++o)a[o]=o-i[s]<<5|s;return{b:i,r:a}},o=a(e,2),h=o.b,f=o.r;h[28]=258,f[258]=28;for(var l=a(i,0).r,u=new n(32768),c=0;c<32768;++c){var v=(43690&c)>>1|(21845&c)<<1;v=(61680&(v=(52428&v)>>2|(13107&v)<<2))>>4|(3855&v)<<4,u[c]=((65280&v)>>8|(255&v)<<8)>>1}var d=function(t,r,e){for(var i=t.length,s=0,a=new n(r);s<i;++s)t[s]&&++a[t[s]-1];var o,h=new n(r);for(s=1;s<r;++s)h[s]=h[s-1]+a[s-1]<<1;if(e){o=new n(1<<r);var f=15-r;for(s=0;s<i;++s)if(t[s])for(var l=s<<4|t[s],c=r-t[s],v=h[t[s]-1]++<<c,d=v|(1<<c)-1;v<=d;++v)o[u[v]>>f]=l}else for(o=new n(i),s=0;s<i;++s)t[s]&&(o[s]=u[h[t[s]-1]++]>>15-t[s]);return o},p=new t(288);for(c=0;c<144;++c)p[c]=8;for(c=144;c<256;++c)p[c]=9;for(c=256;c<280;++c)p[c]=7;for(c=280;c<288;++c)p[c]=8;var g=new t(32);for(c=0;c<32;++c)g[c]=5;var w=d(p,9,0),y=d(g,5,0),m=function(t){return(t+7)/8|0},b=function(n,r,e){return(null==e||e>n.length)&&(e=n.length),new t(n.subarray(r,e))},M=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],E=function(t,n,r){var e=new Error(n||M[t]);if(e.code=t,Error.captureStackTrace&&Error.captureStackTrace(e,E),!r)throw e;return e},z=function(t,n,r){r<<=7&n;var e=n/8|0;t[e]|=r,t[e+1]|=r>>8},_=function(t,n,r){r<<=7&n;var e=n/8|0;t[e]|=r,t[e+1]|=r>>8,t[e+2]|=r>>16},x=function(r,e){for(var i=[],s=0;s<r.length;++s)r[s]&&i.push({s:s,f:r[s]});var a=i.length,o=i.slice();if(!a)return{t:F,l:0};if(1==a){var h=new t(i[0].s+1);return h[i[0].s]=1,{t:h,l:1}}i.sort(function(t,n){return t.f-n.f}),i.push({s:-1,f:25001});var f=i[0],l=i[1],u=0,c=1,v=2;for(i[0]={s:-1,f:f.f+l.f,l:f,r:l};c!=a-1;)f=i[i[u].f<i[v].f?u++:v++],l=i[u!=c&&i[u].f<i[v].f?u++:v++],i[c++]={s:-1,f:f.f+l.f,l:f,r:l};var d=o[0].s;for(s=1;s<a;++s)o[s].s>d&&(d=o[s].s);var p=new n(d+1),g=A(i[c-1],p,0);if(g>e){s=0;var w=0,y=g-e,m=1<<y;for(o.sort(function(t,n){return p[n.s]-p[t.s]||t.f-n.f});s<a;++s){var b=o[s].s;if(!(p[b]>e))break;w+=m-(1<<g-p[b]),p[b]=e}for(w>>=y;w>0;){var M=o[s].s;p[M]<e?w-=1<<e-p[M]++-1:++s}for(;s>=0&&w;--s){var E=o[s].s;p[E]==e&&(--p[E],++w)}g=e}return{t:new t(p),l:g}},A=function(t,n,r){return-1==t.s?Math.max(A(t.l,n,r+1),A(t.r,n,r+1)):n[t.s]=r},D=function(t){for(var r=t.length;r&&!t[--r];);for(var e=new n(++r),i=0,s=t[0],a=1,o=function(t){e[i++]=t},h=1;h<=r;++h)if(t[h]==s&&h!=r)++a;else{if(!s&&a>2){for(;a>138;a-=138)o(32754);a>2&&(o(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(o(s),--a;a>6;a-=6)o(8304);a>2&&(o(a-3<<5|8208),a=0)}for(;a--;)o(s);a=1,s=t[h]}return{c:e.subarray(0,i),n:r}},T=function(t,n){for(var r=0,e=0;e<n.length;++e)r+=t[e]*n[e];return r},k=function(t,n,r){var e=r.length,i=m(n+2);t[i]=255&e,t[i+1]=e>>8,t[i+2]=255^t[i],t[i+3]=255^t[i+1];for(var s=0;s<e;++s)t[i+s+4]=r[s];return 8*(i+4+e)},U=function(t,r,a,o,h,f,l,u,c,v,m){z(r,m++,a),++h[256];for(var b=x(h,15),M=b.t,E=b.l,A=x(f,15),U=A.t,C=A.l,F=D(M),I=F.c,S=F.n,L=D(U),O=L.c,j=L.n,q=new n(19),B=0;B<I.length;++B)++q[31&I[B]];for(B=0;B<O.length;++B)++q[31&O[B]];for(var G=x(q,7),H=G.t,J=G.l,K=19;K>4&&!H[s[K-1]];--K);var N,P,Q,R,V=v+5<<3,W=T(h,p)+T(f,g)+l,X=T(h,M)+T(f,U)+l+14+3*K+T(q,H)+2*q[16]+3*q[17]+7*q[18];if(c>=0&&V<=W&&V<=X)return k(r,m,t.subarray(c,c+v));if(z(r,m,1+(X<W)),m+=2,X<W){N=d(M,E,0),P=M,Q=d(U,C,0),R=U;var Y=d(H,J,0);z(r,m,S-257),z(r,m+5,j-1),z(r,m+10,K-4),m+=14;for(B=0;B<K;++B)z(r,m+3*B,H[s[B]]);m+=3*K;for(var Z=[I,O],$=0;$<2;++$){var tt=Z[$];for(B=0;B<tt.length;++B){var nt=31&tt[B];z(r,m,Y[nt]),m+=H[nt],nt>15&&(z(r,m,tt[B]>>5&127),m+=tt[B]>>12)}}}else N=w,P=p,Q=y,R=g;for(B=0;B<u;++B){var rt=o[B];if(rt>255){_(r,m,N[(nt=rt>>18&31)+257]),m+=P[nt+257],nt>7&&(z(r,m,rt>>23&31),m+=e[nt]);var et=31&rt;_(r,m,Q[et]),m+=R[et],et>3&&(_(r,m,rt>>5&8191),m+=i[et])}else _(r,m,N[rt]),m+=P[rt]}return _(r,m,N[256]),m+P[256]},C=new r([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),F=new t(0),I=function(){for(var t=new Int32Array(256),n=0;n<256;++n){for(var r=n,e=9;--e;)r=(1&r&&-306674912)^r>>>1;t[n]=r}return t}(),S=function(){var t=1,n=0;return{p:function(r){for(var e=t,i=n,s=0|r.length,a=0;a!=s;){for(var o=Math.min(a+2655,s);a<o;++a)i+=e+=r[a];e=(65535&e)+15*(e>>16),i=(65535&i)+15*(i>>16)}t=e,n=i},d:function(){return(255&(t%=65521))<<24|(65280&t)<<8|(255&(n%=65521))<<8|n>>8}}},L=function(s,a,o,h,u){if(!u&&(u={l:1},a.dictionary)){var c=a.dictionary.subarray(-32768),v=new t(c.length+s.length);v.set(c),v.set(s,c.length),s=v,u.w=c.length}return function(s,a,o,h,u,c){var v=c.z||s.length,d=new t(h+v+5*(1+Math.ceil(v/7e3))+u),p=d.subarray(h,d.length-u),g=c.l,w=7&(c.r||0);if(a){w&&(p[0]=c.r>>3);for(var y=C[a-1],M=y>>13,E=8191&y,z=(1<<o)-1,_=c.p||new n(32768),x=c.h||new n(z+1),A=Math.ceil(o/3),D=2*A,T=function(t){return(s[t]^s[t+1]<<A^s[t+2]<<D)&z},F=new r(25e3),I=new n(288),S=new n(32),L=0,O=0,j=c.i||0,q=0,B=c.w||0,G=0;j+2<v;++j){var H=T(j),J=32767&j,K=x[H];if(_[J]=K,x[H]=J,B<=j){var N=v-j;if((L>7e3||q>24576)&&(N>423||!g)){w=U(s,p,0,F,I,S,O,q,G,j-G,w),q=L=O=0,G=j;for(var P=0;P<286;++P)I[P]=0;for(P=0;P<30;++P)S[P]=0}var Q=2,R=0,V=E,W=J-K&32767;if(N>2&&H==T(j-W))for(var X=Math.min(M,N)-1,Y=Math.min(32767,j),Z=Math.min(258,N);W<=Y&&--V&&J!=K;){if(s[j+Q]==s[j+Q-W]){for(var $=0;$<Z&&s[j+$]==s[j+$-W];++$);if($>Q){if(Q=$,R=W,$>X)break;var tt=Math.min(W,$-2),nt=0;for(P=0;P<tt;++P){var rt=j-W+P&32767,et=rt-_[rt]&32767;et>nt&&(nt=et,K=rt)}}}W+=(J=K)-(K=_[J])&32767}if(R){F[q++]=268435456|f[Q]<<18|l[R];var it=31&f[Q],st=31&l[R];O+=e[it]+i[st],++I[257+it],++S[st],B=j+Q,++L}else F[q++]=s[j],++I[s[j]]}}for(j=Math.max(j,B);j<v;++j)F[q++]=s[j],++I[s[j]];w=U(s,p,g,F,I,S,O,q,G,j-G,w),g||(c.r=7&w|p[w/8|0]<<3,w-=7,c.h=x,c.p=_,c.i=j,c.w=B)}else{for(j=c.w||0;j<v+g;j+=65535){var at=j+65535;at>=v&&(p[w/8|0]=g,at=v),w=k(p,w+1,s.subarray(j,at))}c.i=v}return b(d,0,h+m(w)+u)}(s,null==a.level?6:a.level,null==a.mem?u.l?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(s.length)))):20:12+a.mem,o,h,u)},O=function(t,n,r){for(;r;++n)t[n]=r,r>>>=8},j=function(){function n(n,r){if("function"==typeof n&&(r=n,n={}),this.ondata=r,this.o=n||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new t(98304),this.o.dictionary){var e=this.o.dictionary.subarray(-32768);this.b.set(e,32768-e.length),this.s.i=32768-e.length}}return n.prototype.p=function(t,n){this.ondata(L(t,this.o,0,0,this.s),n)},n.prototype.push=function(n,r){this.ondata||E(5),this.s.l&&E(4);var e=n.length+this.s.z;if(e>this.b.length){if(e>2*this.b.length-32768){var i=new t(-32768&e);i.set(this.b.subarray(0,this.s.z)),this.b=i}var s=this.b.length-this.s.z;this.b.set(n.subarray(0,s),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(n.subarray(s),32768),this.s.z=n.length-s+32768,this.s.i=32766,this.s.w=32768}else this.b.set(n,this.s.z),this.s.z+=n.length;this.s.l=1&r,(this.s.z>this.s.w+8191||r)&&(this.p(this.b,r||!1),this.s.w=this.s.i,this.s.i-=2)},n.prototype.flush=function(){this.ondata||E(5),this.s.l&&E(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2},n}();function q(t,n){n||(n={});var r=function(){var t=-1;return{p:function(n){for(var r=t,e=0;e<n.length;++e)r=I[255&r^n[e]]^r>>>8;t=r},d:function(){return~t}}}(),e=t.length;r.p(t);var i,s=L(t,n,10+((i=n).filename?i.filename.length+1:0),8),a=s.length;return function(t,n){var r=n.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=n.level<2?4:9==n.level?2:0,t[9]=3,0!=n.mtime&&O(t,4,Math.floor(new Date(n.mtime||Date.now())/1e3)),r){t[3]=8;for(var e=0;e<=r.length;++e)t[e+10]=r.charCodeAt(e)}}(s,n),O(s,a-8,r.d()),O(s,a-4,e),s}var B=function(){function t(t,n){this.c=S(),this.v=1,j.call(this,t,n)}return t.prototype.push=function(t,n){this.c.p(t),j.prototype.push.call(this,t,n)},t.prototype.p=function(t,n){var r=L(t,this.o,this.v&&(this.o.dictionary?6:2),n&&4,this.s);this.v&&(function(t,n){var r=n.level,e=0==r?0:r<6?1:9==r?3:2;if(t[0]=120,t[1]=e<<6|(n.dictionary&&32),t[1]|=31-(t[0]<<8|t[1])%31,n.dictionary){var i=S();i.p(n.dictionary),O(t,2,i.d())}}(r,this.o),this.v=0),n&&O(r,r.length-4,this.c.d()),this.ondata(r,n)},t.prototype.flush=function(){j.prototype.flush.call(this)},t}(),G="undefined"!=typeof TextEncoder&&new TextEncoder,H="undefined"!=typeof TextDecoder&&new TextDecoder;try{H.decode(F,{stream:!0})}catch(t){}var J=function(){function t(t){this.ondata=t}return t.prototype.push=function(t,n){this.ondata||E(5),this.d&&E(4),this.ondata(K(t),this.d=n||!1)},t}();function K(n,r){if(G)return G.encode(n);for(var e=n.length,i=new t(n.length+(n.length>>1)),s=0,a=function(t){i[s++]=t},o=0;o<e;++o){if(s+5>i.length){var h=new t(s+8+(e-o<<1));h.set(i),i=h}var f=n.charCodeAt(o);f<128||r?a(f):f<2048?(a(192|f>>6),a(128|63&f)):f>55295&&f<57344?(a(240|(f=65536+(1047552&f)|1023&n.charCodeAt(++o))>>18),a(128|f>>12&63),a(128|f>>6&63),a(128|63&f)):(a(224|f>>12),a(128|f>>6&63),a(128|63&f))}return b(i,0,s)}const N=new class{constructor(){this._init()}clear(){this._init()}addEvent(t){if(!t)throw new Error("Adding invalid event");const n=this._hasEvents?",":"";this.stream.push(n+t),this._hasEvents=!0}finish(){this.stream.push("]",!0);const t=function(t){let n=0;for(const r of t)n+=r.length;const r=new Uint8Array(n);for(let n=0,e=0,i=t.length;n<i;n++){const i=t[n];r.set(i,e),e+=i.length}return r}(this._deflatedData);return this._init(),t}_init(){this._hasEvents=!1,this._deflatedData=[],this.deflate=new B,this.deflate.ondata=(t,n)=>{this._deflatedData.push(t)},this.stream=new J((t,n)=>{this.deflate.push(t,n)}),this.stream.push("[")}},P={clear:()=>{N.clear()},addEvent:t=>N.addEvent(t),finish:()=>N.finish(),compress:t=>function(t){return q(K(t))}(t)};addEventListener("message",function(t){const n=t.data.method,r=t.data.id,e=t.data.arg;if(n in P&&"function"==typeof P[n])try{const t=P[n](e);postMessage({id:r,method:n,success:!0,response:t})}catch(t){postMessage({id:r,method:n,success:!1,response:t.message}),console.error(t)}}),postMessage({id:void 0,method:"init",success:!0,response:void 0});`;
function e() {
  const e2 = new Blob([r]);
  return URL.createObjectURL(e2);
}
const CONSOLE_LEVELS = ["log", "warn", "error"];
const PREFIX = "[Replay] ";
function _addBreadcrumb(message, level = "info") {
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_9__.addBreadcrumb)(
    {
      category: "console",
      data: {
        logger: "replay"
      },
      level,
      message: `${PREFIX}${message}`
    },
    { level }
  );
}
function makeReplayDebugLogger() {
  let _capture = false;
  let _trace = false;
  const _debug = {
    exception: () => void 0,
    infoTick: () => void 0,
    setConfig: (opts) => {
      _capture = !!opts.captureExceptions;
      _trace = !!opts.traceInternals;
    }
  };
  if (DEBUG_BUILD) {
    CONSOLE_LEVELS.forEach((name) => {
      _debug[name] = (...args) => {
        _sentry_core__WEBPACK_IMPORTED_MODULE_13__.debug[name](PREFIX, ...args);
        if (_trace) {
          _addBreadcrumb(args.join(""), (0,_sentry_core__WEBPACK_IMPORTED_MODULE_17__.severityLevelFromString)(name));
        }
      };
    });
    _debug.exception = (error, ...message) => {
      if (message.length && _debug.error) {
        _debug.error(...message);
      }
      _sentry_core__WEBPACK_IMPORTED_MODULE_13__.debug.error(PREFIX, error);
      if (_capture) {
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.captureException)(error);
      } else if (_trace) {
        _addBreadcrumb(error, "error");
      }
    };
    _debug.infoTick = (...args) => {
      _sentry_core__WEBPACK_IMPORTED_MODULE_13__.debug.log(PREFIX, ...args);
      if (_trace) {
        setTimeout(() => _addBreadcrumb(args[0]), 0);
      }
    };
  } else {
    CONSOLE_LEVELS.forEach((name) => {
      _debug[name] = () => void 0;
    });
  }
  return _debug;
}
const debug = makeReplayDebugLogger();
class EventBufferSizeExceededError extends Error {
  constructor() {
    super(`Event buffer exceeded maximum size of ${REPLAY_MAX_EVENT_BUFFER_SIZE}.`);
  }
}
class EventBufferArray {
  /** All the events that are buffered to be sent. */
  /** @inheritdoc */
  /** @inheritdoc */
  constructor() {
    this.events = [];
    this._totalSize = 0;
    this.hasCheckout = false;
    this.waitForCheckout = false;
  }
  /** @inheritdoc */
  get hasEvents() {
    return this.events.length > 0;
  }
  /** @inheritdoc */
  get type() {
    return "sync";
  }
  /** @inheritdoc */
  destroy() {
    this.events = [];
  }
  /** @inheritdoc */
  async addEvent(event) {
    const eventSize = JSON.stringify(event).length;
    this._totalSize += eventSize;
    if (this._totalSize > REPLAY_MAX_EVENT_BUFFER_SIZE) {
      throw new EventBufferSizeExceededError();
    }
    this.events.push(event);
  }
  /** @inheritdoc */
  finish() {
    return new Promise((resolve) => {
      const eventsRet = this.events;
      this.clear();
      resolve(JSON.stringify(eventsRet));
    });
  }
  /** @inheritdoc */
  clear() {
    this.events = [];
    this._totalSize = 0;
    this.hasCheckout = false;
  }
  /** @inheritdoc */
  getEarliestTimestamp() {
    const timestamp = this.events.map((event) => event.timestamp).sort()[0];
    if (!timestamp) {
      return null;
    }
    return timestampToMs(timestamp);
  }
}
class WorkerHandler {
  constructor(worker) {
    this._worker = worker;
    this._id = 0;
  }
  /**
   * Ensure the worker is ready (or not).
   * This will either resolve when the worker is ready, or reject if an error occurred.
   */
  ensureReady() {
    if (this._ensureReadyPromise) {
      return this._ensureReadyPromise;
    }
    this._ensureReadyPromise = new Promise((resolve, reject) => {
      this._worker.addEventListener(
        "message",
        ({ data }) => {
          if (data.success) {
            resolve();
          } else {
            reject();
          }
        },
        { once: true }
      );
      this._worker.addEventListener(
        "error",
        (error) => {
          reject(error);
        },
        { once: true }
      );
    });
    return this._ensureReadyPromise;
  }
  /**
   * Destroy the worker.
   */
  destroy() {
    DEBUG_BUILD && debug.log("Destroying compression worker");
    this._worker.terminate();
  }
  /**
   * Post message to worker and wait for response before resolving promise.
   */
  postMessage(method, arg) {
    const id = this._getAndIncrementId();
    return new Promise((resolve, reject) => {
      const listener = ({ data }) => {
        const response = data;
        if (response.method !== method) {
          return;
        }
        if (response.id !== id) {
          return;
        }
        this._worker.removeEventListener("message", listener);
        if (!response.success) {
          DEBUG_BUILD && debug.error("Error in compression worker: ", response.response);
          reject(new Error("Error in compression worker"));
          return;
        }
        resolve(response.response);
      };
      this._worker.addEventListener("message", listener);
      this._worker.postMessage({ id, method, arg });
    });
  }
  /** Get the current ID and increment it for the next call. */
  _getAndIncrementId() {
    return this._id++;
  }
}
class EventBufferCompressionWorker {
  /** @inheritdoc */
  /** @inheritdoc */
  constructor(worker) {
    this._worker = new WorkerHandler(worker);
    this._earliestTimestamp = null;
    this._totalSize = 0;
    this.hasCheckout = false;
    this.waitForCheckout = false;
  }
  /** @inheritdoc */
  get hasEvents() {
    return !!this._earliestTimestamp;
  }
  /** @inheritdoc */
  get type() {
    return "worker";
  }
  /**
   * Ensure the worker is ready (or not).
   * This will either resolve when the worker is ready, or reject if an error occurred.
   */
  ensureReady() {
    return this._worker.ensureReady();
  }
  /**
   * Destroy the event buffer.
   */
  destroy() {
    this._worker.destroy();
  }
  /**
   * Add an event to the event buffer.
   *
   * Returns true if event was successfully received and processed by worker.
   */
  addEvent(event) {
    const timestamp = timestampToMs(event.timestamp);
    if (!this._earliestTimestamp || timestamp < this._earliestTimestamp) {
      this._earliestTimestamp = timestamp;
    }
    const data = JSON.stringify(event);
    this._totalSize += data.length;
    if (this._totalSize > REPLAY_MAX_EVENT_BUFFER_SIZE) {
      return Promise.reject(new EventBufferSizeExceededError());
    }
    return this._sendEventToWorker(data);
  }
  /**
   * Finish the event buffer and return the compressed data.
   */
  finish() {
    return this._finishRequest();
  }
  /** @inheritdoc */
  clear() {
    this._earliestTimestamp = null;
    this._totalSize = 0;
    this.hasCheckout = false;
    this._worker.postMessage("clear").then(null, (e2) => {
      DEBUG_BUILD && debug.exception(e2, 'Sending "clear" message to worker failed', e2);
    });
  }
  /** @inheritdoc */
  getEarliestTimestamp() {
    return this._earliestTimestamp;
  }
  /**
   * Send the event to the worker.
   */
  _sendEventToWorker(data) {
    return this._worker.postMessage("addEvent", data);
  }
  /**
   * Finish the request and return the compressed data from the worker.
   */
  async _finishRequest() {
    const response = await this._worker.postMessage("finish");
    this._earliestTimestamp = null;
    this._totalSize = 0;
    return response;
  }
}
class EventBufferProxy {
  constructor(worker) {
    this._fallback = new EventBufferArray();
    this._compression = new EventBufferCompressionWorker(worker);
    this._used = this._fallback;
    this._ensureWorkerIsLoadedPromise = this._ensureWorkerIsLoaded();
  }
  /** @inheritdoc */
  get waitForCheckout() {
    return this._used.waitForCheckout;
  }
  /** @inheritdoc */
  get type() {
    return this._used.type;
  }
  /** @inheritDoc */
  get hasEvents() {
    return this._used.hasEvents;
  }
  /** @inheritdoc */
  get hasCheckout() {
    return this._used.hasCheckout;
  }
  /** @inheritdoc */
  set hasCheckout(value) {
    this._used.hasCheckout = value;
  }
  /** @inheritdoc */
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  set waitForCheckout(value) {
    this._used.waitForCheckout = value;
  }
  /** @inheritDoc */
  destroy() {
    this._fallback.destroy();
    this._compression.destroy();
  }
  /** @inheritdoc */
  clear() {
    return this._used.clear();
  }
  /** @inheritdoc */
  getEarliestTimestamp() {
    return this._used.getEarliestTimestamp();
  }
  /**
   * Add an event to the event buffer.
   *
   * Returns true if event was successfully added.
   */
  addEvent(event) {
    return this._used.addEvent(event);
  }
  /** @inheritDoc */
  async finish() {
    await this.ensureWorkerIsLoaded();
    return this._used.finish();
  }
  /** Ensure the worker has loaded. */
  ensureWorkerIsLoaded() {
    return this._ensureWorkerIsLoadedPromise;
  }
  /** Actually check if the worker has been loaded. */
  async _ensureWorkerIsLoaded() {
    try {
      await this._compression.ensureReady();
    } catch (error) {
      DEBUG_BUILD && debug.exception(error, "Failed to load the compression worker, falling back to simple buffer");
      return;
    }
    await this._switchToCompressionWorker();
  }
  /** Switch the used buffer to the compression worker. */
  async _switchToCompressionWorker() {
    const { events, hasCheckout, waitForCheckout } = this._fallback;
    const addEventPromises = [];
    for (const event of events) {
      addEventPromises.push(this._compression.addEvent(event));
    }
    this._compression.hasCheckout = hasCheckout;
    this._compression.waitForCheckout = waitForCheckout;
    this._used = this._compression;
    try {
      await Promise.all(addEventPromises);
      this._fallback.clear();
    } catch (error) {
      DEBUG_BUILD && debug.exception(error, "Failed to add events when switching buffers.");
    }
  }
}
function createEventBuffer({
  useCompression,
  workerUrl: customWorkerUrl
}) {
  if (useCompression && // eslint-disable-next-line no-restricted-globals
  window.Worker) {
    const worker = _loadWorker(customWorkerUrl);
    if (worker) {
      return worker;
    }
  }
  DEBUG_BUILD && debug.log("Using simple buffer");
  return new EventBufferArray();
}
function _loadWorker(customWorkerUrl) {
  try {
    const workerUrl = customWorkerUrl || _getWorkerUrl();
    if (!workerUrl) {
      return;
    }
    DEBUG_BUILD && debug.log(`Using compression worker${customWorkerUrl ? ` from ${customWorkerUrl}` : ""}`);
    const worker = new Worker(workerUrl);
    return new EventBufferProxy(worker);
  } catch (error) {
    DEBUG_BUILD && debug.exception(error, "Failed to create compression worker");
  }
}
function _getWorkerUrl() {
  if (typeof __SENTRY_EXCLUDE_REPLAY_WORKER__ === "undefined" || !__SENTRY_EXCLUDE_REPLAY_WORKER__) {
    return e();
  }
  return "";
}
function hasSessionStorage() {
  try {
    return "sessionStorage" in WINDOW && !!WINDOW.sessionStorage;
  } catch {
    return false;
  }
}
function clearSession(replay) {
  deleteSession();
  replay.session = void 0;
}
function deleteSession() {
  if (!hasSessionStorage()) {
    return;
  }
  try {
    WINDOW.sessionStorage.removeItem(REPLAY_SESSION_KEY);
  } catch {
  }
}
function isSampled(sampleRate) {
  if (sampleRate === void 0) {
    return false;
  }
  return Math.random() < sampleRate;
}
function saveSession(session) {
  if (!hasSessionStorage()) {
    return;
  }
  try {
    WINDOW.sessionStorage.setItem(REPLAY_SESSION_KEY, JSON.stringify(session));
  } catch {
  }
}
function makeSession(session) {
  const now = Date.now();
  const id = session.id || (0,_sentry_core__WEBPACK_IMPORTED_MODULE_14__.uuid4)();
  const started = session.started || now;
  const lastActivity = session.lastActivity || now;
  const segmentId = session.segmentId || 0;
  const sampled = session.sampled;
  const previousSessionId = session.previousSessionId;
  return {
    id,
    started,
    lastActivity,
    segmentId,
    sampled,
    previousSessionId
  };
}
function getSessionSampleType(sessionSampleRate, allowBuffering) {
  return isSampled(sessionSampleRate) ? "session" : allowBuffering ? "buffer" : false;
}
function createSession({ sessionSampleRate, allowBuffering, stickySession = false }, { previousSessionId } = {}) {
  const sampled = getSessionSampleType(sessionSampleRate, allowBuffering);
  const session = makeSession({
    sampled,
    previousSessionId
  });
  if (stickySession) {
    saveSession(session);
  }
  return session;
}
function fetchSession() {
  if (!hasSessionStorage()) {
    return null;
  }
  try {
    const sessionStringFromStorage = WINDOW.sessionStorage.getItem(REPLAY_SESSION_KEY);
    if (!sessionStringFromStorage) {
      return null;
    }
    const sessionObj = JSON.parse(sessionStringFromStorage);
    DEBUG_BUILD && debug.infoTick("Loading existing session");
    return makeSession(sessionObj);
  } catch {
    return null;
  }
}
function isExpired(initialTime, expiry, targetTime = +/* @__PURE__ */ new Date()) {
  if (initialTime === null || expiry === void 0 || expiry < 0) {
    return true;
  }
  if (expiry === 0) {
    return false;
  }
  return initialTime + expiry <= targetTime;
}
function isSessionExpired(session, {
  maxReplayDuration,
  sessionIdleExpire,
  targetTime = Date.now()
}) {
  return (
    // First, check that maximum session length has not been exceeded
    isExpired(session.started, maxReplayDuration, targetTime) || // check that the idle timeout has not been exceeded (i.e. user has
    // performed an action within the last `sessionIdleExpire` ms)
    isExpired(session.lastActivity, sessionIdleExpire, targetTime)
  );
}
function shouldRefreshSession(session, { sessionIdleExpire, maxReplayDuration }) {
  if (!isSessionExpired(session, { sessionIdleExpire, maxReplayDuration })) {
    return false;
  }
  if (session.sampled === "buffer" && session.segmentId === 0) {
    return false;
  }
  return true;
}
function loadOrCreateSession({
  sessionIdleExpire,
  maxReplayDuration,
  previousSessionId
}, sessionOptions) {
  const existingSession = sessionOptions.stickySession && fetchSession();
  if (!existingSession) {
    DEBUG_BUILD && debug.infoTick("Creating new session");
    return createSession(sessionOptions, { previousSessionId });
  }
  if (!shouldRefreshSession(existingSession, { sessionIdleExpire, maxReplayDuration })) {
    return existingSession;
  }
  DEBUG_BUILD && debug.infoTick("Session in sessionStorage is expired, creating new one...");
  return createSession(sessionOptions, { previousSessionId: existingSession.id });
}
function isCustomEvent(event) {
  return event.type === EventType.Custom;
}
function addEventSync(replay, event, isCheckout) {
  if (!shouldAddEvent(replay, event)) {
    return false;
  }
  _addEvent(replay, event, isCheckout);
  return true;
}
function addEvent(replay, event, isCheckout) {
  if (!shouldAddEvent(replay, event)) {
    return Promise.resolve(null);
  }
  return _addEvent(replay, event, isCheckout);
}
async function _addEvent(replay, event, isCheckout) {
  const { eventBuffer } = replay;
  if (!eventBuffer || eventBuffer.waitForCheckout && !isCheckout) {
    return null;
  }
  const isBufferMode = replay.recordingMode === "buffer";
  try {
    if (isCheckout && isBufferMode) {
      eventBuffer.clear();
    }
    if (isCheckout) {
      eventBuffer.hasCheckout = true;
      eventBuffer.waitForCheckout = false;
    }
    const replayOptions = replay.getOptions();
    const eventAfterPossibleCallback = maybeApplyCallback(event, replayOptions.beforeAddRecordingEvent);
    if (!eventAfterPossibleCallback) {
      return;
    }
    return await eventBuffer.addEvent(eventAfterPossibleCallback);
  } catch (error) {
    const isExceeded = error && error instanceof EventBufferSizeExceededError;
    const reason = isExceeded ? "addEventSizeExceeded" : "addEvent";
    if (isExceeded && isBufferMode) {
      eventBuffer.clear();
      eventBuffer.waitForCheckout = true;
      return null;
    }
    replay.handleException(error);
    await replay.stop({ reason });
    const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getClient)();
    if (client) {
      client.recordDroppedEvent("internal_sdk_error", "replay");
    }
  }
}
function shouldAddEvent(replay, event) {
  if (!replay.eventBuffer || replay.isPaused() || !replay.isEnabled()) {
    return false;
  }
  const timestampInMs = timestampToMs(event.timestamp);
  if (timestampInMs + replay.timeouts.sessionIdlePause < Date.now()) {
    return false;
  }
  if (timestampInMs > replay.getContext().initialTimestamp + replay.getOptions().maxReplayDuration) {
    DEBUG_BUILD && debug.infoTick(`Skipping event with timestamp ${timestampInMs} because it is after maxReplayDuration`);
    return false;
  }
  return true;
}
function maybeApplyCallback(event, callback) {
  try {
    if (typeof callback === "function" && isCustomEvent(event)) {
      return callback(event);
    }
  } catch (error) {
    DEBUG_BUILD && debug.exception(error, "An error occurred in the `beforeAddRecordingEvent` callback, skipping the event...");
    return null;
  }
  return event;
}
function isErrorEvent(event) {
  return !event.type;
}
function isTransactionEvent(event) {
  return event.type === "transaction";
}
function isReplayEvent(event) {
  return event.type === "replay_event";
}
function isFeedbackEvent(event) {
  return event.type === "feedback";
}
function handleAfterSendEvent(replay) {
  return (event, sendResponse) => {
    if (!replay.isEnabled() || !isErrorEvent(event) && !isTransactionEvent(event)) {
      return;
    }
    const statusCode = sendResponse == null ? void 0 : sendResponse.statusCode;
    if (!statusCode || statusCode < 200 || statusCode >= 300) {
      return;
    }
    if (isTransactionEvent(event)) {
      handleTransactionEvent(replay, event);
      return;
    }
    handleErrorEvent(replay, event);
  };
}
function handleTransactionEvent(replay, event) {
  var _a2, _b;
  const replayContext = replay.getContext();
  if (((_b = (_a2 = event.contexts) == null ? void 0 : _a2.trace) == null ? void 0 : _b.trace_id) && replayContext.traceIds.size < 100) {
    replayContext.traceIds.add(event.contexts.trace.trace_id);
  }
}
function handleErrorEvent(replay, event) {
  const replayContext = replay.getContext();
  if (event.event_id && replayContext.errorIds.size < 100) {
    replayContext.errorIds.add(event.event_id);
  }
  if (replay.recordingMode !== "buffer" || !event.tags || !event.tags.replayId) {
    return;
  }
  const { beforeErrorSampling } = replay.getOptions();
  if (typeof beforeErrorSampling === "function" && !beforeErrorSampling(event)) {
    return;
  }
  (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_26__.setTimeout)(async () => {
    try {
      await replay.sendBufferedReplayOrFlush();
    } catch (err) {
      replay.handleException(err);
    }
  });
}
function handleBeforeSendEvent(replay) {
  return (event) => {
    if (!replay.isEnabled() || !isErrorEvent(event)) {
      return;
    }
    handleHydrationError(replay, event);
  };
}
function handleHydrationError(replay, event) {
  var _a2, _b, _c;
  const exceptionValue = (_c = (_b = (_a2 = event.exception) == null ? void 0 : _a2.values) == null ? void 0 : _b[0]) == null ? void 0 : _c.value;
  if (typeof exceptionValue !== "string") {
    return;
  }
  if (
    // Only matches errors in production builds of react-dom
    // Example https://reactjs.org/docs/error-decoder.html?invariant=423
    // With newer React versions, the messages changed to a different website https://react.dev/errors/418
    exceptionValue.match(
      /(reactjs\.org\/docs\/error-decoder\.html\?invariant=|react\.dev\/errors\/)(418|419|422|423|425)/
    ) || // Development builds of react-dom
    // Error 1: Hydration failed because the initial UI does not match what was rendered on the server.
    // Error 2: Text content does not match server-rendered HTML. Warning: Text content did not match.
    exceptionValue.match(/(does not match server-rendered HTML|Hydration failed because)/i)
  ) {
    const breadcrumb = createBreadcrumb({
      category: "replay.hydrate-error",
      data: {
        url: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.getLocationHref)()
      }
    });
    addBreadcrumbEvent(replay, breadcrumb);
  }
}
function handleBreadcrumbs(replay) {
  const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getClient)();
  if (!client) {
    return;
  }
  client.on("beforeAddBreadcrumb", (breadcrumb) => beforeAddBreadcrumb(replay, breadcrumb));
}
function beforeAddBreadcrumb(replay, breadcrumb) {
  if (!replay.isEnabled() || !isBreadcrumbWithCategory(breadcrumb)) {
    return;
  }
  const result = normalizeBreadcrumb(breadcrumb);
  if (result) {
    addBreadcrumbEvent(replay, result);
  }
}
function normalizeBreadcrumb(breadcrumb) {
  if (!isBreadcrumbWithCategory(breadcrumb) || [
    // fetch & xhr are handled separately,in handleNetworkBreadcrumbs
    "fetch",
    "xhr",
    // These two are breadcrumbs for emitted sentry events, we don't care about them
    "sentry.event",
    "sentry.transaction"
  ].includes(breadcrumb.category) || // We capture UI breadcrumbs separately
  breadcrumb.category.startsWith("ui.")) {
    return null;
  }
  if (breadcrumb.category === "console") {
    return normalizeConsoleBreadcrumb(breadcrumb);
  }
  return createBreadcrumb(breadcrumb);
}
function normalizeConsoleBreadcrumb(breadcrumb) {
  var _a2;
  const args = (_a2 = breadcrumb.data) == null ? void 0 : _a2.arguments;
  if (!Array.isArray(args) || args.length === 0) {
    return createBreadcrumb(breadcrumb);
  }
  let isTruncated = false;
  const normalizedArgs = args.map((arg) => {
    if (!arg) {
      return arg;
    }
    if (typeof arg === "string") {
      if (arg.length > CONSOLE_ARG_MAX_SIZE) {
        isTruncated = true;
        return `${arg.slice(0, CONSOLE_ARG_MAX_SIZE)}\u2026`;
      }
      return arg;
    }
    if (typeof arg === "object") {
      try {
        const normalizedArg = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_15__.normalize)(arg, 7);
        const stringified = JSON.stringify(normalizedArg);
        if (stringified.length > CONSOLE_ARG_MAX_SIZE) {
          isTruncated = true;
          return `${JSON.stringify(normalizedArg, null, 2).slice(0, CONSOLE_ARG_MAX_SIZE)}\u2026`;
        }
        return normalizedArg;
      } catch {
      }
    }
    return arg;
  });
  return createBreadcrumb({
    ...breadcrumb,
    data: {
      ...breadcrumb.data,
      arguments: normalizedArgs,
      ...isTruncated ? { _meta: { warnings: ["CONSOLE_ARG_TRUNCATED"] } } : {}
    }
  });
}
function isBreadcrumbWithCategory(breadcrumb) {
  return !!breadcrumb.category;
}
function isRrwebError(event, hint) {
  var _a2, _b, _c;
  if (event.type || !((_b = (_a2 = event.exception) == null ? void 0 : _a2.values) == null ? void 0 : _b.length)) {
    return false;
  }
  if ((_c = hint.originalException) == null ? void 0 : _c.__rrweb__) {
    return true;
  }
  return false;
}
function resetReplayIdOnDynamicSamplingContext() {
  const dsc = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getCurrentScope)().getPropagationContext().dsc;
  if (dsc) {
    delete dsc.replay_id;
  }
  const activeSpan = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.getActiveSpan)();
  if (activeSpan) {
    const dsc2 = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.getDynamicSamplingContextFromSpan)(activeSpan);
    delete dsc2.replay_id;
  }
}
function addFeedbackBreadcrumb(replay, event) {
  replay.triggerUserActivity();
  replay.addUpdate(() => {
    if (!event.timestamp) {
      return true;
    }
    replay.throttledAddEvent({
      type: EventType.Custom,
      timestamp: event.timestamp * 1e3,
      data: {
        tag: "breadcrumb",
        payload: {
          timestamp: event.timestamp,
          type: "default",
          category: "sentry.feedback",
          data: {
            feedbackId: event.event_id
          }
        }
      }
    });
    return false;
  });
}
function shouldSampleForBufferEvent(replay, event) {
  if (replay.recordingMode !== "buffer") {
    return false;
  }
  if (event.message === UNABLE_TO_SEND_REPLAY) {
    return false;
  }
  if (!event.exception || event.type) {
    return false;
  }
  return isSampled(replay.getOptions().errorSampleRate);
}
function handleGlobalEventListener(replay) {
  return Object.assign(
    (event, hint) => {
      if (!replay.isEnabled() || replay.isPaused()) {
        return event;
      }
      if (isReplayEvent(event)) {
        delete event.breadcrumbs;
        return event;
      }
      if (!isErrorEvent(event) && !isTransactionEvent(event) && !isFeedbackEvent(event)) {
        return event;
      }
      const isSessionActive = replay.checkAndHandleExpiredSession();
      if (!isSessionActive) {
        resetReplayIdOnDynamicSamplingContext();
        return event;
      }
      if (isFeedbackEvent(event)) {
        replay.flush();
        event.contexts.feedback.replay_id = replay.getSessionId();
        addFeedbackBreadcrumb(replay, event);
        return event;
      }
      if (isRrwebError(event, hint) && !replay.getOptions()._experiments.captureExceptions) {
        DEBUG_BUILD && debug.log("Ignoring error from rrweb internals", event);
        return null;
      }
      const isErrorEventSampled = shouldSampleForBufferEvent(replay, event);
      const shouldTagReplayId = isErrorEventSampled || replay.recordingMode === "session";
      if (shouldTagReplayId) {
        event.tags = { ...event.tags, replayId: replay.getSessionId() };
      }
      return event;
    },
    { id: "Replay" }
  );
}
function createPerformanceSpans(replay, entries) {
  return entries.map(({ type, start, end, name, data }) => {
    const response = replay.throttledAddEvent({
      type: EventType.Custom,
      timestamp: start,
      data: {
        tag: "performanceSpan",
        payload: {
          op: type,
          description: name,
          startTimestamp: start,
          endTimestamp: end,
          data
        }
      }
    });
    return typeof response === "string" ? Promise.resolve(null) : response;
  });
}
function handleHistory(handlerData) {
  const { from, to } = handlerData;
  const now = Date.now() / 1e3;
  return {
    type: "navigation.push",
    start: now,
    end: now,
    name: to,
    data: {
      previous: from
    }
  };
}
function handleHistorySpanListener(replay) {
  return (handlerData) => {
    if (!replay.isEnabled()) {
      return;
    }
    const result = handleHistory(handlerData);
    if (result === null) {
      return;
    }
    replay.getContext().urls.push(result.name);
    replay.triggerUserActivity();
    replay.addUpdate(() => {
      createPerformanceSpans(replay, [result]);
      return false;
    });
  };
}
function shouldFilterRequest(replay, url) {
  if (DEBUG_BUILD && replay.getOptions()._experiments.traceInternals) {
    return false;
  }
  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.isSentryRequestUrl)(url, (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getClient)());
}
function addNetworkBreadcrumb(replay, result) {
  if (!replay.isEnabled()) {
    return;
  }
  if (result === null) {
    return;
  }
  if (shouldFilterRequest(replay, result.name)) {
    return;
  }
  replay.addUpdate(() => {
    createPerformanceSpans(replay, [result]);
    return true;
  });
}
function getBodySize(body) {
  if (!body) {
    return void 0;
  }
  const textEncoder = new TextEncoder();
  try {
    if (typeof body === "string") {
      return textEncoder.encode(body).length;
    }
    if (body instanceof URLSearchParams) {
      return textEncoder.encode(body.toString()).length;
    }
    if (body instanceof FormData) {
      const formDataStr = (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_28__.serializeFormData)(body);
      return textEncoder.encode(formDataStr).length;
    }
    if (body instanceof Blob) {
      return body.size;
    }
    if (body instanceof ArrayBuffer) {
      return body.byteLength;
    }
  } catch {
  }
  return void 0;
}
function parseContentLengthHeader(header) {
  if (!header) {
    return void 0;
  }
  const size = parseInt(header, 10);
  return isNaN(size) ? void 0 : size;
}
function mergeWarning(info, warning) {
  if (!info) {
    return {
      headers: {},
      size: void 0,
      _meta: {
        warnings: [warning]
      }
    };
  }
  const newMeta = { ...info._meta };
  const existingWarnings = newMeta.warnings || [];
  newMeta.warnings = [...existingWarnings, warning];
  info._meta = newMeta;
  return info;
}
function makeNetworkReplayBreadcrumb(type, data) {
  if (!data) {
    return null;
  }
  const { startTimestamp, endTimestamp, url, method, statusCode, request, response } = data;
  const result = {
    type,
    start: startTimestamp / 1e3,
    end: endTimestamp / 1e3,
    name: url,
    data: {
      method,
      statusCode,
      request,
      response
    }
  };
  return result;
}
function buildSkippedNetworkRequestOrResponse(bodySize) {
  return {
    headers: {},
    size: bodySize,
    _meta: {
      warnings: ["URL_SKIPPED"]
    }
  };
}
function buildNetworkRequestOrResponse(headers, bodySize, body) {
  if (!bodySize && Object.keys(headers).length === 0) {
    return void 0;
  }
  if (!bodySize) {
    return {
      headers
    };
  }
  if (!body) {
    return {
      headers,
      size: bodySize
    };
  }
  const info = {
    headers,
    size: bodySize
  };
  const { body: normalizedBody, warnings } = normalizeNetworkBody(body);
  info.body = normalizedBody;
  if (warnings == null ? void 0 : warnings.length) {
    info._meta = {
      warnings
    };
  }
  return info;
}
function getAllowedHeaders(headers, allowedHeaders) {
  return Object.entries(headers).reduce((filteredHeaders, [key, value]) => {
    const normalizedKey = key.toLowerCase();
    if (allowedHeaders.includes(normalizedKey) && headers[key]) {
      filteredHeaders[normalizedKey] = value;
    }
    return filteredHeaders;
  }, {});
}
function normalizeNetworkBody(body) {
  if (!body || typeof body !== "string") {
    return {
      body
    };
  }
  const exceedsSizeLimit = body.length > NETWORK_BODY_MAX_SIZE;
  const isProbablyJson = _strIsProbablyJson(body);
  if (exceedsSizeLimit) {
    const truncatedBody = body.slice(0, NETWORK_BODY_MAX_SIZE);
    if (isProbablyJson) {
      return {
        body: truncatedBody,
        warnings: ["MAYBE_JSON_TRUNCATED"]
      };
    }
    return {
      body: `${truncatedBody}\u2026`,
      warnings: ["TEXT_TRUNCATED"]
    };
  }
  if (isProbablyJson) {
    try {
      const jsonBody = JSON.parse(body);
      return {
        body: jsonBody
      };
    } catch {
    }
  }
  return {
    body
  };
}
function _strIsProbablyJson(str) {
  const first = str[0];
  const last = str[str.length - 1];
  return first === "[" && last === "]" || first === "{" && last === "}";
}
function urlMatches(url, urls) {
  const fullUrl = getFullUrl(url);
  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_18__.stringMatchesSomePattern)(fullUrl, urls);
}
function getFullUrl(url, baseURI = WINDOW.document.baseURI) {
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith(WINDOW.location.origin)) {
    return url;
  }
  const fixedUrl = new URL(url, baseURI);
  if (fixedUrl.origin !== new URL(baseURI).origin) {
    return url;
  }
  const fullUrl = fixedUrl.href;
  if (!url.endsWith("/") && fullUrl.endsWith("/")) {
    return fullUrl.slice(0, -1);
  }
  return fullUrl;
}
async function captureFetchBreadcrumbToReplay(breadcrumb, hint, options) {
  try {
    const data = await _prepareFetchData(breadcrumb, hint, options);
    const result = makeNetworkReplayBreadcrumb("resource.fetch", data);
    addNetworkBreadcrumb(options.replay, result);
  } catch (error) {
    DEBUG_BUILD && debug.exception(error, "Failed to capture fetch breadcrumb");
  }
}
function enrichFetchBreadcrumb(breadcrumb, hint) {
  const { input, response } = hint;
  const body = input ? (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_28__.getFetchRequestArgBody)(input) : void 0;
  const reqSize = getBodySize(body);
  const resSize = response ? parseContentLengthHeader(response.headers.get("content-length")) : void 0;
  if (reqSize !== void 0) {
    breadcrumb.data.request_body_size = reqSize;
  }
  if (resSize !== void 0) {
    breadcrumb.data.response_body_size = resSize;
  }
}
async function _prepareFetchData(breadcrumb, hint, options) {
  const now = Date.now();
  const { startTimestamp = now, endTimestamp = now } = hint;
  const {
    url,
    method,
    status_code: statusCode = 0,
    request_body_size: requestBodySize,
    response_body_size: responseBodySize
  } = breadcrumb.data;
  const captureDetails = urlMatches(url, options.networkDetailAllowUrls) && !urlMatches(url, options.networkDetailDenyUrls);
  const request = captureDetails ? _getRequestInfo(options, hint.input, requestBodySize) : buildSkippedNetworkRequestOrResponse(requestBodySize);
  const response = await _getResponseInfo(captureDetails, options, hint.response, responseBodySize);
  return {
    startTimestamp,
    endTimestamp,
    url,
    method,
    statusCode,
    request,
    response
  };
}
function _getRequestInfo({ networkCaptureBodies, networkRequestHeaders }, input, requestBodySize) {
  const headers = input ? getRequestHeaders(input, networkRequestHeaders) : {};
  if (!networkCaptureBodies) {
    return buildNetworkRequestOrResponse(headers, requestBodySize, void 0);
  }
  const requestBody = (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_28__.getFetchRequestArgBody)(input);
  const [bodyStr, warning] = (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_28__.getBodyString)(requestBody, debug);
  const data = buildNetworkRequestOrResponse(headers, requestBodySize, bodyStr);
  if (warning) {
    return mergeWarning(data, warning);
  }
  return data;
}
async function _getResponseInfo(captureDetails, {
  networkCaptureBodies,
  networkResponseHeaders
}, response, responseBodySize) {
  if (!captureDetails && responseBodySize !== void 0) {
    return buildSkippedNetworkRequestOrResponse(responseBodySize);
  }
  const headers = response ? getAllHeaders(response.headers, networkResponseHeaders) : {};
  if (!response || !networkCaptureBodies && responseBodySize !== void 0) {
    return buildNetworkRequestOrResponse(headers, responseBodySize, void 0);
  }
  const [bodyText, warning] = await _parseFetchResponseBody(response);
  const result = getResponseData(bodyText, {
    networkCaptureBodies,
    responseBodySize,
    captureDetails,
    headers
  });
  if (warning) {
    return mergeWarning(result, warning);
  }
  return result;
}
function getResponseData(bodyText, {
  networkCaptureBodies,
  responseBodySize,
  captureDetails,
  headers
}) {
  try {
    const size = (bodyText == null ? void 0 : bodyText.length) && responseBodySize === void 0 ? getBodySize(bodyText) : responseBodySize;
    if (!captureDetails) {
      return buildSkippedNetworkRequestOrResponse(size);
    }
    if (networkCaptureBodies) {
      return buildNetworkRequestOrResponse(headers, size, bodyText);
    }
    return buildNetworkRequestOrResponse(headers, size, void 0);
  } catch (error) {
    DEBUG_BUILD && debug.exception(error, "Failed to serialize response body");
    return buildNetworkRequestOrResponse(headers, responseBodySize, void 0);
  }
}
async function _parseFetchResponseBody(response) {
  const res = _tryCloneResponse(response);
  if (!res) {
    return [void 0, "BODY_PARSE_ERROR"];
  }
  try {
    const text = await _tryGetResponseText(res);
    return [text];
  } catch (error) {
    if (error instanceof Error && error.message.indexOf("Timeout") > -1) {
      DEBUG_BUILD && debug.warn("Parsing text body from response timed out");
      return [void 0, "BODY_PARSE_TIMEOUT"];
    }
    DEBUG_BUILD && debug.exception(error, "Failed to get text body from response");
    return [void 0, "BODY_PARSE_ERROR"];
  }
}
function getAllHeaders(headers, allowedHeaders) {
  const allHeaders = {};
  allowedHeaders.forEach((header) => {
    if (headers.get(header)) {
      allHeaders[header] = headers.get(header);
    }
  });
  return allHeaders;
}
function getRequestHeaders(fetchArgs, allowedHeaders) {
  if (fetchArgs.length === 1 && typeof fetchArgs[0] !== "string") {
    return getHeadersFromOptions(fetchArgs[0], allowedHeaders);
  }
  if (fetchArgs.length === 2) {
    return getHeadersFromOptions(fetchArgs[1], allowedHeaders);
  }
  return {};
}
function getHeadersFromOptions(input, allowedHeaders) {
  if (!input) {
    return {};
  }
  const headers = input.headers;
  if (!headers) {
    return {};
  }
  if (headers instanceof Headers) {
    return getAllHeaders(headers, allowedHeaders);
  }
  if (Array.isArray(headers)) {
    return {};
  }
  return getAllowedHeaders(headers, allowedHeaders);
}
function _tryCloneResponse(response) {
  try {
    return response.clone();
  } catch (error) {
    DEBUG_BUILD && debug.exception(error, "Failed to clone response body");
  }
}
function _tryGetResponseText(response) {
  return new Promise((resolve, reject) => {
    const timeout = (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_26__.setTimeout)(() => reject(new Error("Timeout while trying to read response body")), 500);
    _getResponseText(response).then(
      (txt) => resolve(txt),
      (reason) => reject(reason)
    ).finally(() => clearTimeout(timeout));
  });
}
async function _getResponseText(response) {
  return await response.text();
}
async function captureXhrBreadcrumbToReplay(breadcrumb, hint, options) {
  try {
    const data = _prepareXhrData(breadcrumb, hint, options);
    const result = makeNetworkReplayBreadcrumb("resource.xhr", data);
    addNetworkBreadcrumb(options.replay, result);
  } catch (error) {
    DEBUG_BUILD && debug.exception(error, "Failed to capture xhr breadcrumb");
  }
}
function enrichXhrBreadcrumb(breadcrumb, hint) {
  const { xhr, input } = hint;
  if (!xhr) {
    return;
  }
  const reqSize = getBodySize(input);
  const resSize = xhr.getResponseHeader("content-length") ? parseContentLengthHeader(xhr.getResponseHeader("content-length")) : _getBodySize(xhr.response, xhr.responseType);
  if (reqSize !== void 0) {
    breadcrumb.data.request_body_size = reqSize;
  }
  if (resSize !== void 0) {
    breadcrumb.data.response_body_size = resSize;
  }
}
function _prepareXhrData(breadcrumb, hint, options) {
  const now = Date.now();
  const { startTimestamp = now, endTimestamp = now, input, xhr } = hint;
  const {
    url,
    method,
    status_code: statusCode = 0,
    request_body_size: requestBodySize,
    response_body_size: responseBodySize
  } = breadcrumb.data;
  if (!url) {
    return null;
  }
  if (!xhr || !urlMatches(url, options.networkDetailAllowUrls) || urlMatches(url, options.networkDetailDenyUrls)) {
    const request2 = buildSkippedNetworkRequestOrResponse(requestBodySize);
    const response2 = buildSkippedNetworkRequestOrResponse(responseBodySize);
    return {
      startTimestamp,
      endTimestamp,
      url,
      method,
      statusCode,
      request: request2,
      response: response2
    };
  }
  const xhrInfo = xhr[_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_27__.SENTRY_XHR_DATA_KEY];
  const networkRequestHeaders = xhrInfo ? getAllowedHeaders(xhrInfo.request_headers, options.networkRequestHeaders) : {};
  const networkResponseHeaders = getAllowedHeaders(getResponseHeaders(xhr), options.networkResponseHeaders);
  const [requestBody, requestWarning] = options.networkCaptureBodies ? (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_28__.getBodyString)(input, debug) : [void 0];
  const [responseBody, responseWarning] = options.networkCaptureBodies ? _getXhrResponseBody(xhr) : [void 0];
  const request = buildNetworkRequestOrResponse(networkRequestHeaders, requestBodySize, requestBody);
  const response = buildNetworkRequestOrResponse(networkResponseHeaders, responseBodySize, responseBody);
  return {
    startTimestamp,
    endTimestamp,
    url,
    method,
    statusCode,
    request: requestWarning ? mergeWarning(request, requestWarning) : request,
    response: responseWarning ? mergeWarning(response, responseWarning) : response
  };
}
function getResponseHeaders(xhr) {
  const headers = xhr.getAllResponseHeaders();
  if (!headers) {
    return {};
  }
  return headers.split("\r\n").reduce((acc, line) => {
    const [key, value] = line.split(": ");
    if (value) {
      acc[key.toLowerCase()] = value;
    }
    return acc;
  }, {});
}
function _getXhrResponseBody(xhr) {
  const errors = [];
  try {
    return [xhr.responseText];
  } catch (e2) {
    errors.push(e2);
  }
  try {
    return _parseXhrResponse(xhr.response, xhr.responseType);
  } catch (e2) {
    errors.push(e2);
  }
  DEBUG_BUILD && debug.warn("Failed to get xhr response body", ...errors);
  return [void 0];
}
function _parseXhrResponse(body, responseType) {
  try {
    if (typeof body === "string") {
      return [body];
    }
    if (body instanceof Document) {
      return [body.body.outerHTML];
    }
    if (responseType === "json" && body && typeof body === "object") {
      return [JSON.stringify(body)];
    }
    if (!body) {
      return [void 0];
    }
  } catch (error) {
    DEBUG_BUILD && debug.exception(error, "Failed to serialize body", body);
    return [void 0, "BODY_PARSE_ERROR"];
  }
  DEBUG_BUILD && debug.log("Skipping network body because of body type", body);
  return [void 0, "UNPARSEABLE_BODY_TYPE"];
}
function _getBodySize(body, responseType) {
  try {
    const bodyStr = responseType === "json" && body && typeof body === "object" ? JSON.stringify(body) : body;
    return getBodySize(bodyStr);
  } catch {
    return void 0;
  }
}
function handleNetworkBreadcrumbs(replay) {
  const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getClient)();
  try {
    const {
      networkDetailAllowUrls,
      networkDetailDenyUrls,
      networkCaptureBodies,
      networkRequestHeaders,
      networkResponseHeaders
    } = replay.getOptions();
    const options = {
      replay,
      networkDetailAllowUrls,
      networkDetailDenyUrls,
      networkCaptureBodies,
      networkRequestHeaders,
      networkResponseHeaders
    };
    if (client) {
      client.on("beforeAddBreadcrumb", (breadcrumb, hint) => beforeAddNetworkBreadcrumb(options, breadcrumb, hint));
    }
  } catch {
  }
}
function beforeAddNetworkBreadcrumb(options, breadcrumb, hint) {
  if (!breadcrumb.data) {
    return;
  }
  try {
    if (_isXhrBreadcrumb(breadcrumb) && _isXhrHint(hint)) {
      enrichXhrBreadcrumb(breadcrumb, hint);
      captureXhrBreadcrumbToReplay(breadcrumb, hint, options);
    }
    if (_isFetchBreadcrumb(breadcrumb) && _isFetchHint(hint)) {
      enrichFetchBreadcrumb(breadcrumb, hint);
      captureFetchBreadcrumbToReplay(breadcrumb, hint, options);
    }
  } catch (e2) {
    DEBUG_BUILD && debug.exception(e2, "Error when enriching network breadcrumb");
  }
}
function _isXhrBreadcrumb(breadcrumb) {
  return breadcrumb.category === "xhr";
}
function _isFetchBreadcrumb(breadcrumb) {
  return breadcrumb.category === "fetch";
}
function _isXhrHint(hint) {
  return hint == null ? void 0 : hint.xhr;
}
function _isFetchHint(hint) {
  return hint == null ? void 0 : hint.response;
}
function addGlobalListeners(replay) {
  const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getClient)();
  (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_24__.addClickKeypressInstrumentationHandler)(handleDomListener(replay));
  (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_25__.addHistoryInstrumentationHandler)(handleHistorySpanListener(replay));
  handleBreadcrumbs(replay);
  handleNetworkBreadcrumbs(replay);
  const eventProcessor = handleGlobalEventListener(replay);
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addEventProcessor)(eventProcessor);
  if (client) {
    client.on("beforeSendEvent", handleBeforeSendEvent(replay));
    client.on("afterSendEvent", handleAfterSendEvent(replay));
    client.on("createDsc", (dsc) => {
      const replayId = replay.getSessionId();
      if (replayId && replay.isEnabled() && replay.recordingMode === "session") {
        const isSessionActive = replay.checkAndHandleExpiredSession();
        if (isSessionActive) {
          dsc.replay_id = replayId;
        }
      }
    });
    client.on("spanStart", (span) => {
      replay.lastActiveSpan = span;
    });
    client.on("spanEnd", (span) => {
      replay.lastActiveSpan = span;
    });
    client.on("beforeSendFeedback", async (feedbackEvent, options) => {
      var _a2;
      const replayId = replay.getSessionId();
      if ((options == null ? void 0 : options.includeReplay) && replay.isEnabled() && replayId && ((_a2 = feedbackEvent.contexts) == null ? void 0 : _a2.feedback)) {
        if (feedbackEvent.contexts.feedback.source === "api") {
          await replay.flush();
        }
        feedbackEvent.contexts.feedback.replay_id = replayId;
      }
    });
    client.on("openFeedbackWidget", async () => {
      await replay.flush();
    });
  }
}
async function addMemoryEntry(replay) {
  try {
    return Promise.all(
      createPerformanceSpans(replay, [
        // @ts-expect-error memory doesn't exist on type Performance as the API is non-standard (we check that it exists above)
        createMemoryEntry(WINDOW.performance.memory)
      ])
    );
  } catch {
    return [];
  }
}
function createMemoryEntry(memoryEntry) {
  const { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize } = memoryEntry;
  const time = Date.now() / 1e3;
  return {
    type: "memory",
    name: "memory",
    start: time,
    end: time,
    data: {
      memory: {
        jsHeapSizeLimit,
        totalJSHeapSize,
        usedJSHeapSize
      }
    }
  };
}
function debounce(func, wait, options) {
  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_8__.debounce)(func, wait, {
    ...options,
    // @ts-expect-error - Not quite sure why these types do not match, but this is fine
    setTimeoutImpl: _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_26__.setTimeout
  });
}
const NAVIGATOR = _sentry_core__WEBPACK_IMPORTED_MODULE_11__.GLOBAL_OBJ.navigator;
function getRecordingSamplingOptions() {
  var _a2, _b;
  if (/iPhone|iPad|iPod/i.test((_a2 = NAVIGATOR == null ? void 0 : NAVIGATOR.userAgent) != null ? _a2 : "") || /Macintosh/i.test((_b = NAVIGATOR == null ? void 0 : NAVIGATOR.userAgent) != null ? _b : "") && (NAVIGATOR == null ? void 0 : NAVIGATOR.maxTouchPoints) && (NAVIGATOR == null ? void 0 : NAVIGATOR.maxTouchPoints) > 1) {
    return {
      sampling: {
        mousemove: false
      }
    };
  }
  return {};
}
function getHandleRecordingEmit(replay) {
  let hadFirstEvent = false;
  return (event, _isCheckout) => {
    if (!replay.checkAndHandleExpiredSession()) {
      DEBUG_BUILD && debug.warn("Received replay event after session expired.");
      return;
    }
    const isCheckout = _isCheckout || !hadFirstEvent;
    hadFirstEvent = true;
    if (replay.clickDetector) {
      updateClickDetectorForRecordingEvent(replay.clickDetector, event);
    }
    replay.addUpdate(() => {
      if (replay.recordingMode === "buffer" && isCheckout) {
        replay.setInitialState();
      }
      if (!addEventSync(replay, event, isCheckout)) {
        return true;
      }
      if (!isCheckout) {
        return false;
      }
      const session = replay.session;
      addSettingsEvent(replay, isCheckout);
      if (replay.recordingMode === "buffer" && session && replay.eventBuffer) {
        const earliestEvent = replay.eventBuffer.getEarliestTimestamp();
        if (earliestEvent) {
          DEBUG_BUILD && debug.log(`Updating session start time to earliest event in buffer to ${new Date(earliestEvent)}`);
          session.started = earliestEvent;
          if (replay.getOptions().stickySession) {
            saveSession(session);
          }
        }
      }
      if (session == null ? void 0 : session.previousSessionId) {
        return true;
      }
      if (replay.recordingMode === "session") {
        void replay.flush();
      }
      return true;
    });
  };
}
function createOptionsEvent(replay) {
  const options = replay.getOptions();
  return {
    type: EventType.Custom,
    timestamp: Date.now(),
    data: {
      tag: "options",
      payload: {
        shouldRecordCanvas: replay.isRecordingCanvas(),
        sessionSampleRate: options.sessionSampleRate,
        errorSampleRate: options.errorSampleRate,
        useCompressionOption: options.useCompression,
        blockAllMedia: options.blockAllMedia,
        maskAllText: options.maskAllText,
        maskAllInputs: options.maskAllInputs,
        useCompression: replay.eventBuffer ? replay.eventBuffer.type === "worker" : false,
        networkDetailHasUrls: options.networkDetailAllowUrls.length > 0,
        networkCaptureBodies: options.networkCaptureBodies,
        networkRequestHasHeaders: options.networkRequestHeaders.length > 0,
        networkResponseHasHeaders: options.networkResponseHeaders.length > 0
      }
    }
  };
}
function addSettingsEvent(replay, isCheckout) {
  if (!isCheckout || !replay.session || replay.session.segmentId !== 0) {
    return;
  }
  addEventSync(replay, createOptionsEvent(replay), false);
}
function closestElementOfNode(node) {
  if (!node) {
    return null;
  }
  try {
    const el = node.nodeType === node.ELEMENT_NODE ? node : node.parentElement;
    return el;
  } catch {
    return null;
  }
}
function createReplayEnvelope(replayEvent, recordingData, dsn, tunnel) {
  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_21__.createEnvelope)(
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_21__.createEventEnvelopeHeaders)(replayEvent, (0,_sentry_core__WEBPACK_IMPORTED_MODULE_21__.getSdkMetadataForEnvelopeHeader)(replayEvent), tunnel, dsn),
    [
      [{ type: "replay_event" }, replayEvent],
      [
        {
          type: "replay_recording",
          // If string then we need to encode to UTF8, otherwise will have
          // wrong size. TextEncoder has similar browser support to
          // MutationObserver, although it does not accept IE11.
          length: typeof recordingData === "string" ? new TextEncoder().encode(recordingData).length : recordingData.length
        },
        recordingData
      ]
    ]
  );
}
function prepareRecordingData({
  recordingData,
  headers
}) {
  let payloadWithSequence;
  const replayHeaders = `${JSON.stringify(headers)}
`;
  if (typeof recordingData === "string") {
    payloadWithSequence = `${replayHeaders}${recordingData}`;
  } else {
    const enc = new TextEncoder();
    const sequence = enc.encode(replayHeaders);
    payloadWithSequence = new Uint8Array(sequence.length + recordingData.length);
    payloadWithSequence.set(sequence);
    payloadWithSequence.set(recordingData, sequence.length);
  }
  return payloadWithSequence;
}
async function prepareReplayEvent({
  client,
  scope,
  replayId: event_id,
  event
}) {
  const integrations = typeof client["_integrations"] === "object" && client["_integrations"] !== null && !Array.isArray(client["_integrations"]) ? Object.keys(client["_integrations"]) : void 0;
  const eventHint = { event_id, integrations };
  client.emit("preprocessEvent", event, eventHint);
  const preparedEvent = await (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.prepareEvent)(
    client.getOptions(),
    event,
    eventHint,
    scope,
    client,
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getIsolationScope)()
  );
  if (!preparedEvent) {
    return null;
  }
  client.emit("postprocessEvent", preparedEvent, eventHint);
  preparedEvent.platform = preparedEvent.platform || "javascript";
  const metadata = client.getSdkMetadata();
  const { name, version } = (metadata == null ? void 0 : metadata.sdk) || {};
  preparedEvent.sdk = {
    ...preparedEvent.sdk,
    name: name || "sentry.javascript.unknown",
    version: version || "0.0.0"
  };
  return preparedEvent;
}
async function sendReplayRequest({
  recordingData,
  replayId,
  segmentId: segment_id,
  eventContext,
  timestamp,
  session
}) {
  const preparedRecordingData = prepareRecordingData({
    recordingData,
    headers: {
      segment_id
    }
  });
  const { urls, errorIds, traceIds, initialTimestamp } = eventContext;
  const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getClient)();
  const scope = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getCurrentScope)();
  const transport = client == null ? void 0 : client.getTransport();
  const dsn = client == null ? void 0 : client.getDsn();
  if (!client || !transport || !dsn || !session.sampled) {
    return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_19__.resolvedSyncPromise)({});
  }
  const baseEvent = {
    type: REPLAY_EVENT_NAME,
    replay_start_timestamp: initialTimestamp / 1e3,
    timestamp: timestamp / 1e3,
    error_ids: errorIds,
    trace_ids: traceIds,
    urls,
    replay_id: replayId,
    segment_id,
    replay_type: session.sampled
  };
  const replayEvent = await prepareReplayEvent({ scope, client, replayId, event: baseEvent });
  if (!replayEvent) {
    client.recordDroppedEvent("event_processor", "replay");
    DEBUG_BUILD && debug.log("An event processor returned `null`, will not send event.");
    return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_19__.resolvedSyncPromise)({});
  }
  delete replayEvent.sdkProcessingMetadata;
  const envelope = createReplayEnvelope(replayEvent, preparedRecordingData, dsn, client.getOptions().tunnel);
  let response;
  try {
    response = await transport.send(envelope);
  } catch (err) {
    const error = new Error(UNABLE_TO_SEND_REPLAY);
    try {
      error.cause = err;
    } catch {
    }
    throw error;
  }
  if (typeof response.statusCode === "number" && (response.statusCode < 200 || response.statusCode >= 300)) {
    throw new TransportStatusCodeError(response.statusCode);
  }
  const rateLimits = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_22__.updateRateLimits)({}, response);
  if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_22__.isRateLimited)(rateLimits, "replay")) {
    throw new RateLimitError(rateLimits);
  }
  return response;
}
class TransportStatusCodeError extends Error {
  constructor(statusCode) {
    super(`Transport returned status code ${statusCode}`);
  }
}
class RateLimitError extends Error {
  constructor(rateLimits) {
    super("Rate limit hit");
    this.rateLimits = rateLimits;
  }
}
async function sendReplay(replayData, retryConfig = {
  count: 0,
  interval: RETRY_BASE_INTERVAL
}) {
  const { recordingData, onError } = replayData;
  if (!recordingData.length) {
    return;
  }
  try {
    await sendReplayRequest(replayData);
    return true;
  } catch (err) {
    if (err instanceof TransportStatusCodeError || err instanceof RateLimitError) {
      throw err;
    }
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.setContext)("Replays", {
      _retryCount: retryConfig.count
    });
    if (onError) {
      onError(err);
    }
    if (retryConfig.count >= RETRY_MAX_COUNT) {
      const error = new Error(`${UNABLE_TO_SEND_REPLAY} - max retries exceeded`);
      try {
        error.cause = err;
      } catch {
      }
      throw error;
    }
    retryConfig.interval *= ++retryConfig.count;
    return new Promise((resolve, reject) => {
      (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_26__.setTimeout)(async () => {
        try {
          await sendReplay(replayData, retryConfig);
          resolve(true);
        } catch (err2) {
          reject(err2);
        }
      }, retryConfig.interval);
    });
  }
}
const THROTTLED = "__THROTTLED";
const SKIPPED = "__SKIPPED";
function throttle(fn, maxCount, durationSeconds) {
  const counter = /* @__PURE__ */ new Map();
  const _cleanup = (now) => {
    const threshold = now - durationSeconds;
    counter.forEach((_value, key) => {
      if (key < threshold) {
        counter.delete(key);
      }
    });
  };
  const _getTotalCount = () => {
    return [...counter.values()].reduce((a, b) => a + b, 0);
  };
  let isThrottled = false;
  return (...rest) => {
    const now = Math.floor(Date.now() / 1e3);
    _cleanup(now);
    if (_getTotalCount() >= maxCount) {
      const wasThrottled = isThrottled;
      isThrottled = true;
      return wasThrottled ? SKIPPED : THROTTLED;
    }
    isThrottled = false;
    const count = counter.get(now) || 0;
    counter.set(now, count + 1);
    return fn(...rest);
  };
}
class ReplayContainer {
  /**
   * Recording can happen in one of two modes:
   *   - session: Record the whole session, sending it continuously
   *   - buffer: Always keep the last 60s of recording, requires:
   *     - having replaysOnErrorSampleRate > 0 to capture replay when an error occurs
   *     - or calling `flush()` to send the replay
   */
  /**
   * The current or last active span.
   * This is only available when performance is enabled.
   */
  /**
   * These are here so we can overwrite them in tests etc.
   * @hidden
   */
  /** The replay has to be manually started, because no sample rate (neither session or error) was provided. */
  /**
   * Options to pass to `rrweb.record()`
   */
  /**
   * Timestamp of the last user activity. This lives across sessions.
   */
  /**
   * Is the integration currently active?
   */
  /**
   * Paused is a state where:
   * - DOM Recording is not listening at all
   * - Nothing will be added to event buffer (e.g. core SDK events)
   */
  /**
   * Have we attached listeners to the core SDK?
   * Note we have to track this as there is no way to remove instrumentation handlers.
   */
  /**
   * Function to stop recording
   */
  /**
   * Internal use for canvas recording options
   */
  /**
   * Handle when visibility of the page content changes. Opening a new tab will
   * cause the state to change to hidden because of content of current page will
   * be hidden. Likewise, moving a different window to cover the contents of the
   * page will also trigger a change to a hidden state.
   */
  /**
   * Handle when page is blurred
   */
  /**
   * Handle when page is focused
   */
  /** Ensure page remains active when a key is pressed. */
  constructor({
    options,
    recordingOptions
  }) {
    this.eventBuffer = null;
    this.performanceEntries = [];
    this.replayPerformanceEntries = [];
    this.recordingMode = "session";
    this.timeouts = {
      sessionIdlePause: SESSION_IDLE_PAUSE_DURATION,
      sessionIdleExpire: SESSION_IDLE_EXPIRE_DURATION
    };
    this._lastActivity = Date.now();
    this._isEnabled = false;
    this._isPaused = false;
    this._requiresManualStart = false;
    this._hasInitializedCoreListeners = false;
    this._context = {
      errorIds: /* @__PURE__ */ new Set(),
      traceIds: /* @__PURE__ */ new Set(),
      urls: [],
      initialTimestamp: Date.now(),
      initialUrl: ""
    };
    this._recordingOptions = recordingOptions;
    this._options = options;
    this._debouncedFlush = debounce(() => this._flush(), this._options.flushMinDelay, {
      maxWait: this._options.flushMaxDelay
    });
    this._throttledAddEvent = throttle(
      (event, isCheckout) => addEvent(this, event, isCheckout),
      // Max 300 events...
      300,
      // ... per 5s
      5
    );
    const { slowClickTimeout, slowClickIgnoreSelectors } = this.getOptions();
    const slowClickConfig = slowClickTimeout ? {
      threshold: Math.min(SLOW_CLICK_THRESHOLD, slowClickTimeout),
      timeout: slowClickTimeout,
      scrollTimeout: SLOW_CLICK_SCROLL_TIMEOUT,
      ignoreSelector: slowClickIgnoreSelectors ? slowClickIgnoreSelectors.join(",") : ""
    } : void 0;
    if (slowClickConfig) {
      this.clickDetector = new ClickDetector(this, slowClickConfig);
    }
    if (DEBUG_BUILD) {
      const experiments = options._experiments;
      debug.setConfig({
        captureExceptions: !!experiments.captureExceptions,
        traceInternals: !!experiments.traceInternals
      });
    }
    this._handleVisibilityChange = () => {
      if (WINDOW.document.visibilityState === "visible") {
        this._doChangeToForegroundTasks();
      } else {
        this._doChangeToBackgroundTasks();
      }
    };
    this._handleWindowBlur = () => {
      const breadcrumb = createBreadcrumb({
        category: "ui.blur"
      });
      this._doChangeToBackgroundTasks(breadcrumb);
    };
    this._handleWindowFocus = () => {
      const breadcrumb = createBreadcrumb({
        category: "ui.focus"
      });
      this._doChangeToForegroundTasks(breadcrumb);
    };
    this._handleKeyboardEvent = (event) => {
      handleKeyboardEvent(this, event);
    };
  }
  /** Get the event context. */
  getContext() {
    return this._context;
  }
  /** If recording is currently enabled. */
  isEnabled() {
    return this._isEnabled;
  }
  /** If recording is currently paused. */
  isPaused() {
    return this._isPaused;
  }
  /**
   * Determine if canvas recording is enabled
   */
  isRecordingCanvas() {
    return Boolean(this._canvas);
  }
  /** Get the replay integration options. */
  getOptions() {
    return this._options;
  }
  /** A wrapper to conditionally capture exceptions. */
  handleException(error) {
    DEBUG_BUILD && debug.exception(error);
    if (this._options.onError) {
      this._options.onError(error);
    }
  }
  /**
   * Initializes the plugin based on sampling configuration. Should not be
   * called outside of constructor.
   */
  initializeSampling(previousSessionId) {
    const { errorSampleRate, sessionSampleRate } = this._options;
    const requiresManualStart = errorSampleRate <= 0 && sessionSampleRate <= 0;
    this._requiresManualStart = requiresManualStart;
    if (requiresManualStart) {
      return;
    }
    this._initializeSessionForSampling(previousSessionId);
    if (!this.session) {
      DEBUG_BUILD && debug.exception(new Error("Unable to initialize and create session"));
      return;
    }
    if (this.session.sampled === false) {
      return;
    }
    this.recordingMode = this.session.sampled === "buffer" && this.session.segmentId === 0 ? "buffer" : "session";
    DEBUG_BUILD && debug.infoTick(`Starting replay in ${this.recordingMode} mode`);
    this._initializeRecording();
  }
  /**
   * Start a replay regardless of sampling rate. Calling this will always
   * create a new session. Will log a message if replay is already in progress.
   *
   * Creates or loads a session, attaches listeners to varying events (DOM,
   * _performanceObserver, Recording, Sentry SDK, etc)
   */
  start() {
    if (this._isEnabled && this.recordingMode === "session") {
      DEBUG_BUILD && debug.log("Recording is already in progress");
      return;
    }
    if (this._isEnabled && this.recordingMode === "buffer") {
      DEBUG_BUILD && debug.log("Buffering is in progress, call `flush()` to save the replay");
      return;
    }
    DEBUG_BUILD && debug.infoTick("Starting replay in session mode");
    this._updateUserActivity();
    const session = loadOrCreateSession(
      {
        maxReplayDuration: this._options.maxReplayDuration,
        sessionIdleExpire: this.timeouts.sessionIdleExpire
      },
      {
        stickySession: this._options.stickySession,
        // This is intentional: create a new session-based replay when calling `start()`
        sessionSampleRate: 1,
        allowBuffering: false
      }
    );
    this.session = session;
    this.recordingMode = "session";
    this._initializeRecording();
  }
  /**
   * Start replay buffering. Buffers until `flush()` is called or, if
   * `replaysOnErrorSampleRate` > 0, an error occurs.
   */
  startBuffering() {
    if (this._isEnabled) {
      DEBUG_BUILD && debug.log("Buffering is in progress, call `flush()` to save the replay");
      return;
    }
    DEBUG_BUILD && debug.infoTick("Starting replay in buffer mode");
    const session = loadOrCreateSession(
      {
        sessionIdleExpire: this.timeouts.sessionIdleExpire,
        maxReplayDuration: this._options.maxReplayDuration
      },
      {
        stickySession: this._options.stickySession,
        sessionSampleRate: 0,
        allowBuffering: true
      }
    );
    this.session = session;
    this.recordingMode = "buffer";
    this._initializeRecording();
  }
  /**
   * Start recording.
   *
   * Note that this will cause a new DOM checkout
   */
  startRecording() {
    try {
      const canvasOptions = this._canvas;
      this._stopRecording = record({
        ...this._recordingOptions,
        // When running in error sampling mode, we need to overwrite `checkoutEveryNms`
        // Without this, it would record forever, until an error happens, which we don't want
        // instead, we'll always keep the last 60 seconds of replay before an error happened
        ...this.recordingMode === "buffer" ? { checkoutEveryNms: BUFFER_CHECKOUT_TIME } : (
          // Otherwise, use experimental option w/ min checkout time of 6 minutes
          // This is to improve playback seeking as there could potentially be
          // less mutations to process in the worse cases.
          //
          // checkout by "N" events is probably ideal, but means we have less
          // control about the number of checkouts we make (which generally
          // increases replay size)
          this._options._experiments.continuousCheckout && {
            // Minimum checkout time is 6 minutes
            checkoutEveryNms: Math.max(36e4, this._options._experiments.continuousCheckout)
          }
        ),
        emit: getHandleRecordingEmit(this),
        ...getRecordingSamplingOptions(),
        onMutation: this._onMutationHandler.bind(this),
        ...canvasOptions ? {
          recordCanvas: canvasOptions.recordCanvas,
          getCanvasManager: canvasOptions.getCanvasManager,
          sampling: canvasOptions.sampling,
          dataURLOptions: canvasOptions.dataURLOptions
        } : {}
      });
    } catch (err) {
      this.handleException(err);
    }
  }
  /**
   * Stops the recording, if it was running.
   *
   * Returns true if it was previously stopped, or is now stopped,
   * otherwise false.
   */
  stopRecording() {
    try {
      if (this._stopRecording) {
        this._stopRecording();
        this._stopRecording = void 0;
      }
      return true;
    } catch (err) {
      this.handleException(err);
      return false;
    }
  }
  /**
   * Currently, this needs to be manually called (e.g. for tests). Sentry SDK
   * does not support a teardown
   */
  async stop({ forceFlush = false, reason } = {}) {
    var _a2;
    if (!this._isEnabled) {
      return;
    }
    this._isEnabled = false;
    this.recordingMode = "buffer";
    try {
      DEBUG_BUILD && debug.log(`Stopping Replay${reason ? ` triggered by ${reason}` : ""}`);
      resetReplayIdOnDynamicSamplingContext();
      this._removeListeners();
      this.stopRecording();
      this._debouncedFlush.cancel();
      if (forceFlush) {
        await this._flush({ force: true });
      }
      (_a2 = this.eventBuffer) == null ? void 0 : _a2.destroy();
      this.eventBuffer = null;
      clearSession(this);
    } catch (err) {
      this.handleException(err);
    }
  }
  /**
   * Pause some replay functionality. See comments for `_isPaused`.
   * This differs from stop as this only stops DOM recording, it is
   * not as thorough of a shutdown as `stop()`.
   */
  pause() {
    if (this._isPaused) {
      return;
    }
    this._isPaused = true;
    this.stopRecording();
    DEBUG_BUILD && debug.log("Pausing replay");
  }
  /**
   * Resumes recording, see notes for `pause().
   *
   * Note that calling `startRecording()` here will cause a
   * new DOM checkout.`
   */
  resume() {
    if (!this._isPaused || !this._checkSession()) {
      return;
    }
    this._isPaused = false;
    this.startRecording();
    DEBUG_BUILD && debug.log("Resuming replay");
  }
  /**
   * If not in "session" recording mode, flush event buffer which will create a new replay.
   * Unless `continueRecording` is false, the replay will continue to record and
   * behave as a "session"-based replay.
   *
   * Otherwise, queue up a flush.
   */
  async sendBufferedReplayOrFlush({ continueRecording = true } = {}) {
    if (this.recordingMode === "session") {
      return this.flushImmediate();
    }
    const activityTime = Date.now();
    DEBUG_BUILD && debug.log("Converting buffer to session");
    await this.flushImmediate();
    const hasStoppedRecording = this.stopRecording();
    if (!continueRecording || !hasStoppedRecording) {
      return;
    }
    if (this.recordingMode === "session") {
      return;
    }
    this.recordingMode = "session";
    if (this.session) {
      this._updateUserActivity(activityTime);
      this._updateSessionActivity(activityTime);
      this._maybeSaveSession();
    }
    this.startRecording();
  }
  /**
   * We want to batch uploads of replay events. Save events only if
   * `<flushMinDelay>` milliseconds have elapsed since the last event
   * *OR* if `<flushMaxDelay>` milliseconds have elapsed.
   *
   * Accepts a callback to perform side-effects and returns true to stop batch
   * processing and hand back control to caller.
   */
  addUpdate(cb) {
    const cbResult = cb();
    if (this.recordingMode === "buffer" || !this._isEnabled) {
      return;
    }
    if (cbResult === true) {
      return;
    }
    this._debouncedFlush();
  }
  /**
   * Updates the user activity timestamp and resumes recording. This should be
   * called in an event handler for a user action that we consider as the user
   * being "active" (e.g. a mouse click).
   */
  triggerUserActivity() {
    this._updateUserActivity();
    if (!this._stopRecording) {
      if (!this._checkSession()) {
        return;
      }
      this.resume();
      return;
    }
    this.checkAndHandleExpiredSession();
    this._updateSessionActivity();
  }
  /**
   * Updates the user activity timestamp *without* resuming
   * recording. Some user events (e.g. keydown) can be create
   * low-value replays that only contain the keypress as a
   * breadcrumb. Instead this would require other events to
   * create a new replay after a session has expired.
   */
  updateUserActivity() {
    this._updateUserActivity();
    this._updateSessionActivity();
  }
  /**
   * Only flush if `this.recordingMode === 'session'`
   */
  conditionalFlush() {
    if (this.recordingMode === "buffer") {
      return Promise.resolve();
    }
    return this.flushImmediate();
  }
  /**
   * Flush using debounce flush
   */
  flush() {
    return this._debouncedFlush();
  }
  /**
   * Always flush via `_debouncedFlush` so that we do not have flushes triggered
   * from calling both `flush` and `_debouncedFlush`. Otherwise, there could be
   * cases of multiple flushes happening closely together.
   */
  flushImmediate() {
    this._debouncedFlush();
    return this._debouncedFlush.flush();
  }
  /**
   * Cancels queued up flushes.
   */
  cancelFlush() {
    this._debouncedFlush.cancel();
  }
  /** Get the current session (=replay) ID */
  getSessionId() {
    var _a2;
    return (_a2 = this.session) == null ? void 0 : _a2.id;
  }
  /**
   * Checks if recording should be stopped due to user inactivity. Otherwise
   * check if session is expired and create a new session if so. Triggers a new
   * full snapshot on new session.
   *
   * Returns true if session is not expired, false otherwise.
   * @hidden
   */
  checkAndHandleExpiredSession() {
    if (this._lastActivity && isExpired(this._lastActivity, this.timeouts.sessionIdlePause) && this.session && this.session.sampled === "session") {
      this.pause();
      return;
    }
    if (!this._checkSession()) {
      return false;
    }
    return true;
  }
  /**
   * Capture some initial state that can change throughout the lifespan of the
   * replay. This is required because otherwise they would be captured at the
   * first flush.
   */
  setInitialState() {
    const urlPath = `${WINDOW.location.pathname}${WINDOW.location.hash}${WINDOW.location.search}`;
    const url = `${WINDOW.location.origin}${urlPath}`;
    this.performanceEntries = [];
    this.replayPerformanceEntries = [];
    this._clearContext();
    this._context.initialUrl = url;
    this._context.initialTimestamp = Date.now();
    this._context.urls.push(url);
  }
  /**
   * Add a breadcrumb event, that may be throttled.
   * If it was throttled, we add a custom breadcrumb to indicate that.
   */
  throttledAddEvent(event, isCheckout) {
    const res = this._throttledAddEvent(event, isCheckout);
    if (res === THROTTLED) {
      const breadcrumb = createBreadcrumb({
        category: "replay.throttled"
      });
      this.addUpdate(() => {
        return !addEventSync(this, {
          type: ReplayEventTypeCustom,
          timestamp: breadcrumb.timestamp || 0,
          data: {
            tag: "breadcrumb",
            payload: breadcrumb,
            metric: true
          }
        });
      });
    }
    return res;
  }
  /**
   * This will get the parametrized route name of the current page.
   * This is only available if performance is enabled, and if an instrumented router is used.
   */
  getCurrentRoute() {
    const lastActiveSpan = this.lastActiveSpan || (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.getActiveSpan)();
    const lastRootSpan = lastActiveSpan && (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.getRootSpan)(lastActiveSpan);
    const attributes = lastRootSpan && (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(lastRootSpan).data || {};
    const source = attributes[_sentry_core__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
    if (!lastRootSpan || !source || !["route", "custom"].includes(source)) {
      return void 0;
    }
    return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(lastRootSpan).description;
  }
  /**
   * Initialize and start all listeners to varying events (DOM,
   * Performance Observer, Recording, Sentry SDK, etc)
   */
  _initializeRecording() {
    this.setInitialState();
    this._updateSessionActivity();
    this.eventBuffer = createEventBuffer({
      useCompression: this._options.useCompression,
      workerUrl: this._options.workerUrl
    });
    this._removeListeners();
    this._addListeners();
    this._isEnabled = true;
    this._isPaused = false;
    this.startRecording();
  }
  /**
   * Loads (or refreshes) the current session.
   */
  _initializeSessionForSampling(previousSessionId) {
    const allowBuffering = this._options.errorSampleRate > 0;
    const session = loadOrCreateSession(
      {
        sessionIdleExpire: this.timeouts.sessionIdleExpire,
        maxReplayDuration: this._options.maxReplayDuration,
        previousSessionId
      },
      {
        stickySession: this._options.stickySession,
        sessionSampleRate: this._options.sessionSampleRate,
        allowBuffering
      }
    );
    this.session = session;
  }
  /**
   * Checks and potentially refreshes the current session.
   * Returns false if session is not recorded.
   */
  _checkSession() {
    if (!this.session) {
      return false;
    }
    const currentSession = this.session;
    if (shouldRefreshSession(currentSession, {
      sessionIdleExpire: this.timeouts.sessionIdleExpire,
      maxReplayDuration: this._options.maxReplayDuration
    })) {
      this._refreshSession(currentSession);
      return false;
    }
    return true;
  }
  /**
   * Refresh a session with a new one.
   * This stops the current session (without forcing a flush, as that would never work since we are expired),
   * and then does a new sampling based on the refreshed session.
   */
  async _refreshSession(session) {
    if (!this._isEnabled) {
      return;
    }
    await this.stop({ reason: "refresh session" });
    this.initializeSampling(session.id);
  }
  /**
   * Adds listeners to record events for the replay
   */
  _addListeners() {
    try {
      WINDOW.document.addEventListener("visibilitychange", this._handleVisibilityChange);
      WINDOW.addEventListener("blur", this._handleWindowBlur);
      WINDOW.addEventListener("focus", this._handleWindowFocus);
      WINDOW.addEventListener("keydown", this._handleKeyboardEvent);
      if (this.clickDetector) {
        this.clickDetector.addListeners();
      }
      if (!this._hasInitializedCoreListeners) {
        addGlobalListeners(this);
        this._hasInitializedCoreListeners = true;
      }
    } catch (err) {
      this.handleException(err);
    }
    this._performanceCleanupCallback = setupPerformanceObserver(this);
  }
  /**
   * Cleans up listeners that were created in `_addListeners`
   */
  _removeListeners() {
    try {
      WINDOW.document.removeEventListener("visibilitychange", this._handleVisibilityChange);
      WINDOW.removeEventListener("blur", this._handleWindowBlur);
      WINDOW.removeEventListener("focus", this._handleWindowFocus);
      WINDOW.removeEventListener("keydown", this._handleKeyboardEvent);
      if (this.clickDetector) {
        this.clickDetector.removeListeners();
      }
      if (this._performanceCleanupCallback) {
        this._performanceCleanupCallback();
      }
    } catch (err) {
      this.handleException(err);
    }
  }
  /**
   * Tasks to run when we consider a page to be hidden (via blurring and/or visibility)
   */
  _doChangeToBackgroundTasks(breadcrumb) {
    if (!this.session) {
      return;
    }
    const expired = isSessionExpired(this.session, {
      maxReplayDuration: this._options.maxReplayDuration,
      sessionIdleExpire: this.timeouts.sessionIdleExpire
    });
    if (expired) {
      return;
    }
    if (breadcrumb) {
      this._createCustomBreadcrumb(breadcrumb);
    }
    void this.conditionalFlush();
  }
  /**
   * Tasks to run when we consider a page to be visible (via focus and/or visibility)
   */
  _doChangeToForegroundTasks(breadcrumb) {
    if (!this.session) {
      return;
    }
    const isSessionActive = this.checkAndHandleExpiredSession();
    if (!isSessionActive) {
      DEBUG_BUILD && debug.log("Document has become active, but session has expired");
      return;
    }
    if (breadcrumb) {
      this._createCustomBreadcrumb(breadcrumb);
    }
  }
  /**
   * Update user activity (across session lifespans)
   */
  _updateUserActivity(_lastActivity = Date.now()) {
    this._lastActivity = _lastActivity;
  }
  /**
   * Updates the session's last activity timestamp
   */
  _updateSessionActivity(_lastActivity = Date.now()) {
    if (this.session) {
      this.session.lastActivity = _lastActivity;
      this._maybeSaveSession();
    }
  }
  /**
   * Helper to create (and buffer) a replay breadcrumb from a core SDK breadcrumb
   */
  _createCustomBreadcrumb(breadcrumb) {
    this.addUpdate(() => {
      this.throttledAddEvent({
        type: EventType.Custom,
        timestamp: breadcrumb.timestamp || 0,
        data: {
          tag: "breadcrumb",
          payload: breadcrumb
        }
      });
    });
  }
  /**
   * Observed performance events are added to `this.performanceEntries`. These
   * are included in the replay event before it is finished and sent to Sentry.
   */
  _addPerformanceEntries() {
    let performanceEntries = createPerformanceEntries(this.performanceEntries).concat(this.replayPerformanceEntries);
    this.performanceEntries = [];
    this.replayPerformanceEntries = [];
    if (this._requiresManualStart) {
      const initialTimestampInSeconds = this._context.initialTimestamp / 1e3;
      performanceEntries = performanceEntries.filter((entry) => entry.start >= initialTimestampInSeconds);
    }
    return Promise.all(createPerformanceSpans(this, performanceEntries));
  }
  /**
   * Clear _context
   */
  _clearContext() {
    this._context.errorIds.clear();
    this._context.traceIds.clear();
    this._context.urls = [];
  }
  /** Update the initial timestamp based on the buffer content. */
  _updateInitialTimestampFromEventBuffer() {
    const { session, eventBuffer } = this;
    if (!session || !eventBuffer || this._requiresManualStart) {
      return;
    }
    if (session.segmentId) {
      return;
    }
    const earliestEvent = eventBuffer.getEarliestTimestamp();
    if (earliestEvent && earliestEvent < this._context.initialTimestamp) {
      this._context.initialTimestamp = earliestEvent;
    }
  }
  /**
   * Return and clear _context
   */
  _popEventContext() {
    const _context = {
      initialTimestamp: this._context.initialTimestamp,
      initialUrl: this._context.initialUrl,
      errorIds: Array.from(this._context.errorIds),
      traceIds: Array.from(this._context.traceIds),
      urls: this._context.urls
    };
    this._clearContext();
    return _context;
  }
  /**
   * Flushes replay event buffer to Sentry.
   *
   * Performance events are only added right before flushing - this is
   * due to the buffered performance observer events.
   *
   * Should never be called directly, only by `flush`
   */
  async _runFlush() {
    var _a2;
    const replayId = this.getSessionId();
    if (!this.session || !this.eventBuffer || !replayId) {
      DEBUG_BUILD && debug.error("No session or eventBuffer found to flush.");
      return;
    }
    await this._addPerformanceEntries();
    if (!((_a2 = this.eventBuffer) == null ? void 0 : _a2.hasEvents)) {
      return;
    }
    await addMemoryEntry(this);
    if (!this.eventBuffer) {
      return;
    }
    if (replayId !== this.getSessionId()) {
      return;
    }
    try {
      this._updateInitialTimestampFromEventBuffer();
      const timestamp = Date.now();
      if (timestamp - this._context.initialTimestamp > this._options.maxReplayDuration + 3e4) {
        throw new Error("Session is too long, not sending replay");
      }
      const eventContext = this._popEventContext();
      const segmentId = this.session.segmentId++;
      this._maybeSaveSession();
      const recordingData = await this.eventBuffer.finish();
      await sendReplay({
        replayId,
        recordingData,
        segmentId,
        eventContext,
        session: this.session,
        timestamp,
        onError: (err) => this.handleException(err)
      });
    } catch (err) {
      this.handleException(err);
      this.stop({ reason: "sendReplay" });
      const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getClient)();
      if (client) {
        const dropReason = err instanceof RateLimitError ? "ratelimit_backoff" : "send_error";
        client.recordDroppedEvent(dropReason, "replay");
      }
    }
  }
  /**
   * Flush recording data to Sentry. Creates a lock so that only a single flush
   * can be active at a time. Do not call this directly.
   */
  async _flush({
    force = false
  } = {}) {
    if (!this._isEnabled && !force) {
      return;
    }
    if (!this.checkAndHandleExpiredSession()) {
      DEBUG_BUILD && debug.error("Attempting to finish replay event after session expired.");
      return;
    }
    if (!this.session) {
      return;
    }
    const start = this.session.started;
    const now = Date.now();
    const duration = now - start;
    this._debouncedFlush.cancel();
    const tooShort = duration < this._options.minReplayDuration;
    const tooLong = duration > this._options.maxReplayDuration + 5e3;
    if (tooShort || tooLong) {
      DEBUG_BUILD && debug.log(
        `Session duration (${Math.floor(duration / 1e3)}s) is too ${tooShort ? "short" : "long"}, not sending replay.`
      );
      if (tooShort) {
        this._debouncedFlush();
      }
      return;
    }
    const eventBuffer = this.eventBuffer;
    if (eventBuffer && this.session.segmentId === 0 && !eventBuffer.hasCheckout) {
      DEBUG_BUILD && debug.log("Flushing initial segment without checkout.");
    }
    const _flushInProgress = !!this._flushLock;
    if (!this._flushLock) {
      this._flushLock = this._runFlush();
    }
    try {
      await this._flushLock;
    } catch (err) {
      this.handleException(err);
    } finally {
      this._flushLock = void 0;
      if (_flushInProgress) {
        this._debouncedFlush();
      }
    }
  }
  /** Save the session, if it is sticky */
  _maybeSaveSession() {
    if (this.session && this._options.stickySession) {
      saveSession(this.session);
    }
  }
  /** Handler for rrweb.record.onMutation */
  _onMutationHandler(mutations) {
    const { ignoreMutations } = this._options._experiments;
    if (ignoreMutations == null ? void 0 : ignoreMutations.length) {
      if (mutations.some((mutation) => {
        const el = closestElementOfNode(mutation.target);
        const selector = ignoreMutations.join(",");
        return el == null ? void 0 : el.matches(selector);
      })) {
        return false;
      }
    }
    const count = mutations.length;
    const mutationLimit = this._options.mutationLimit;
    const mutationBreadcrumbLimit = this._options.mutationBreadcrumbLimit;
    const overMutationLimit = mutationLimit && count > mutationLimit;
    if (count > mutationBreadcrumbLimit || overMutationLimit) {
      const breadcrumb = createBreadcrumb({
        category: "replay.mutations",
        data: {
          count,
          limit: overMutationLimit
        }
      });
      this._createCustomBreadcrumb(breadcrumb);
    }
    if (overMutationLimit) {
      this.stop({ reason: "mutationLimit", forceFlush: this.recordingMode === "session" });
      return false;
    }
    return true;
  }
}
function getOption(selectors, defaultSelectors) {
  return [
    ...selectors,
    // sentry defaults
    ...defaultSelectors
  ].join(",");
}
function getPrivacyOptions({ mask, unmask, block, unblock, ignore }) {
  const defaultBlockedElements = ["base", "iframe[srcdoc]:not([src])"];
  const maskSelector = getOption(mask, [".sentry-mask", "[data-sentry-mask]"]);
  const unmaskSelector = getOption(unmask, []);
  const options = {
    // We are making the decision to make text and input selectors the same
    maskTextSelector: maskSelector,
    unmaskTextSelector: unmaskSelector,
    blockSelector: getOption(block, [".sentry-block", "[data-sentry-block]", ...defaultBlockedElements]),
    unblockSelector: getOption(unblock, []),
    ignoreSelector: getOption(ignore, [".sentry-ignore", "[data-sentry-ignore]", 'input[type="file"]'])
  };
  return options;
}
function maskAttribute({
  el,
  key,
  maskAttributes,
  maskAllText,
  privacyOptions,
  value
}) {
  if (!maskAllText) {
    return value;
  }
  if (privacyOptions.unmaskTextSelector && el.matches(privacyOptions.unmaskTextSelector)) {
    return value;
  }
  if (maskAttributes.includes(key) || // Need to mask `value` attribute for `<input>` if it's a button-like
  // type
  key === "value" && el.tagName === "INPUT" && ["submit", "button"].includes(el.getAttribute("type") || "")) {
    return value.replace(/[\S]/g, "*");
  }
  return value;
}
const MEDIA_SELECTORS = 'img,image,svg,video,object,picture,embed,map,audio,link[rel="icon"],link[rel="apple-touch-icon"]';
const DEFAULT_NETWORK_HEADERS = ["content-length", "content-type", "accept"];
let _initialized = false;
const replayIntegration = (options) => {
  return new Replay(options);
};
class Replay {
  /**
   * @inheritDoc
   */
  /**
   * Options to pass to `rrweb.record()`
   */
  /**
   * Initial options passed to the replay integration, merged with default values.
   * Note: `sessionSampleRate` and `errorSampleRate` are not required here, as they
   * can only be finally set when setupOnce() is called.
   *
   * @private
   */
  constructor({
    flushMinDelay = DEFAULT_FLUSH_MIN_DELAY,
    flushMaxDelay = DEFAULT_FLUSH_MAX_DELAY,
    minReplayDuration = MIN_REPLAY_DURATION,
    maxReplayDuration = MAX_REPLAY_DURATION,
    stickySession = true,
    useCompression = true,
    workerUrl,
    _experiments = {},
    maskAllText = true,
    maskAllInputs = true,
    blockAllMedia = true,
    mutationBreadcrumbLimit = 750,
    mutationLimit = 1e4,
    slowClickTimeout = 7e3,
    slowClickIgnoreSelectors = [],
    networkDetailAllowUrls = [],
    networkDetailDenyUrls = [],
    networkCaptureBodies = true,
    networkRequestHeaders = [],
    networkResponseHeaders = [],
    mask = [],
    maskAttributes = ["title", "placeholder", "aria-label"],
    unmask = [],
    block = [],
    unblock = [],
    ignore = [],
    maskFn,
    beforeAddRecordingEvent,
    beforeErrorSampling,
    onError
  } = {}) {
    this.name = "Replay";
    const privacyOptions = getPrivacyOptions({
      mask,
      unmask,
      block,
      unblock,
      ignore
    });
    this._recordingOptions = {
      maskAllInputs,
      maskAllText,
      maskInputOptions: { password: true },
      maskTextFn: maskFn,
      maskInputFn: maskFn,
      maskAttributeFn: (key, value, el) => maskAttribute({
        maskAttributes,
        maskAllText,
        privacyOptions,
        key,
        value,
        el
      }),
      ...privacyOptions,
      // Our defaults
      slimDOMOptions: "all",
      inlineStylesheet: true,
      // Disable inline images as it will increase segment/replay size
      inlineImages: false,
      // collect fonts, but be aware that `sentry.io` needs to be an allowed
      // origin for playback
      collectFonts: true,
      errorHandler: (err) => {
        try {
          err.__rrweb__ = true;
        } catch {
        }
      },
      // experimental support for recording iframes from different origins
      recordCrossOriginIframes: Boolean(_experiments.recordCrossOriginIframes)
    };
    this._initialOptions = {
      flushMinDelay,
      flushMaxDelay,
      minReplayDuration: Math.min(minReplayDuration, MIN_REPLAY_DURATION_LIMIT),
      maxReplayDuration: Math.min(maxReplayDuration, MAX_REPLAY_DURATION),
      stickySession,
      useCompression,
      workerUrl,
      blockAllMedia,
      maskAllInputs,
      maskAllText,
      mutationBreadcrumbLimit,
      mutationLimit,
      slowClickTimeout,
      slowClickIgnoreSelectors,
      networkDetailAllowUrls,
      networkDetailDenyUrls,
      networkCaptureBodies,
      networkRequestHeaders: _getMergedNetworkHeaders(networkRequestHeaders),
      networkResponseHeaders: _getMergedNetworkHeaders(networkResponseHeaders),
      beforeAddRecordingEvent,
      beforeErrorSampling,
      onError,
      _experiments
    };
    if (this._initialOptions.blockAllMedia) {
      this._recordingOptions.blockSelector = !this._recordingOptions.blockSelector ? MEDIA_SELECTORS : `${this._recordingOptions.blockSelector},${MEDIA_SELECTORS}`;
    }
    if (this._isInitialized && (0,_sentry_core__WEBPACK_IMPORTED_MODULE_12__.isBrowser)()) {
      throw new Error("Multiple Sentry Session Replay instances are not supported");
    }
    this._isInitialized = true;
  }
  /** If replay has already been initialized */
  get _isInitialized() {
    return _initialized;
  }
  /** Update _isInitialized */
  set _isInitialized(value) {
    _initialized = value;
  }
  /**
   * Setup and initialize replay container
   */
  afterAllSetup(client) {
    if (!(0,_sentry_core__WEBPACK_IMPORTED_MODULE_12__.isBrowser)() || this._replay) {
      return;
    }
    this._setup(client);
    this._initialize(client);
  }
  /**
   * Start a replay regardless of sampling rate. Calling this will always
   * create a new session. Will log a message if replay is already in progress.
   *
   * Creates or loads a session, attaches listeners to varying events (DOM,
   * PerformanceObserver, Recording, Sentry SDK, etc)
   */
  start() {
    if (!this._replay) {
      return;
    }
    this._replay.start();
  }
  /**
   * Start replay buffering. Buffers until `flush()` is called or, if
   * `replaysOnErrorSampleRate` > 0, until an error occurs.
   */
  startBuffering() {
    if (!this._replay) {
      return;
    }
    this._replay.startBuffering();
  }
  /**
   * Currently, this needs to be manually called (e.g. for tests). Sentry SDK
   * does not support a teardown
   */
  stop() {
    if (!this._replay) {
      return Promise.resolve();
    }
    return this._replay.stop({ forceFlush: this._replay.recordingMode === "session" });
  }
  /**
   * If not in "session" recording mode, flush event buffer which will create a new replay.
   * If replay is not enabled, a new session replay is started.
   * Unless `continueRecording` is false, the replay will continue to record and
   * behave as a "session"-based replay.
   *
   * Otherwise, queue up a flush.
   */
  flush(options) {
    if (!this._replay) {
      return Promise.resolve();
    }
    if (!this._replay.isEnabled()) {
      this._replay.start();
      return Promise.resolve();
    }
    return this._replay.sendBufferedReplayOrFlush(options);
  }
  /**
   * Get the current session ID.
   */
  getReplayId() {
    var _a2;
    if (!((_a2 = this._replay) == null ? void 0 : _a2.isEnabled())) {
      return;
    }
    return this._replay.getSessionId();
  }
  /**
   * Get the current recording mode. This can be either `session` or `buffer`.
   *
   * `session`: Recording the whole session, sending it continuously
   * `buffer`: Always keeping the last 60s of recording, requires:
   *   - having replaysOnErrorSampleRate > 0 to capture replay when an error occurs
   *   - or calling `flush()` to send the replay
   */
  getRecordingMode() {
    var _a2;
    if (!((_a2 = this._replay) == null ? void 0 : _a2.isEnabled())) {
      return;
    }
    return this._replay.recordingMode;
  }
  /**
   * Initializes replay.
   */
  _initialize(client) {
    if (!this._replay) {
      return;
    }
    this._maybeLoadFromReplayCanvasIntegration(client);
    this._replay.initializeSampling();
  }
  /** Setup the integration. */
  _setup(client) {
    const finalOptions = loadReplayOptionsFromClient(this._initialOptions, client);
    this._replay = new ReplayContainer({
      options: finalOptions,
      recordingOptions: this._recordingOptions
    });
  }
  /** Get canvas options from ReplayCanvas integration, if it is also added. */
  _maybeLoadFromReplayCanvasIntegration(client) {
    try {
      const canvasIntegration = client.getIntegrationByName("ReplayCanvas");
      if (!canvasIntegration) {
        return;
      }
      this._replay["_canvas"] = canvasIntegration.getOptions();
    } catch {
    }
  }
}
function loadReplayOptionsFromClient(initialOptions, client) {
  const opt = client.getOptions();
  const finalOptions = {
    sessionSampleRate: 0,
    errorSampleRate: 0,
    ...initialOptions
  };
  const replaysSessionSampleRate = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_7__.parseSampleRate)(opt.replaysSessionSampleRate);
  const replaysOnErrorSampleRate = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_7__.parseSampleRate)(opt.replaysOnErrorSampleRate);
  if (replaysSessionSampleRate == null && replaysOnErrorSampleRate == null) {
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_13__.consoleSandbox)(() => {
      console.warn(
        "Replay is disabled because neither `replaysSessionSampleRate` nor `replaysOnErrorSampleRate` are set."
      );
    });
  }
  if (replaysSessionSampleRate != null) {
    finalOptions.sessionSampleRate = replaysSessionSampleRate;
  }
  if (replaysOnErrorSampleRate != null) {
    finalOptions.errorSampleRate = replaysOnErrorSampleRate;
  }
  return finalOptions;
}
function _getMergedNetworkHeaders(headers) {
  return [...DEFAULT_NETWORK_HEADERS, ...headers.map((header) => header.toLowerCase())];
}
function getReplay() {
  const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getClient)();
  return client == null ? void 0 : client.getIntegrationByName("Replay");
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/client.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/client.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrowserClient: () => (/* binding */ BrowserClient)
/* harmony export */ });
/* unused harmony export applyDefaultOptions */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/client.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/ipAddress.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/sdkMetadata.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/logs/exports.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/env.js");
/* harmony import */ var _eventbuilder_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./eventbuilder.js */ "../../node_modules/@sentry/browser/build/npm/esm/eventbuilder.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers.js */ "../../node_modules/@sentry/browser/build/npm/esm/helpers.js");



const DEFAULT_FLUSH_INTERVAL = 5e3;
class BrowserClient extends _sentry_core__WEBPACK_IMPORTED_MODULE_0__.Client {
  /**
   * Creates a new Browser SDK instance.
   *
   * @param options Configuration options for this SDK.
   */
  constructor(options) {
    const opts = applyDefaultOptions(options);
    const sdkSource = _helpers_js__WEBPACK_IMPORTED_MODULE_6__.WINDOW.SENTRY_SDK_SOURCE || (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getSDKSource)();
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.applySdkMetadata)(opts, "browser", ["browser"], sdkSource);
    super(opts);
    const { sendDefaultPii, sendClientReports, enableLogs } = this._options;
    if (_helpers_js__WEBPACK_IMPORTED_MODULE_6__.WINDOW.document && (sendClientReports || enableLogs)) {
      _helpers_js__WEBPACK_IMPORTED_MODULE_6__.WINDOW.document.addEventListener("visibilitychange", () => {
        if (_helpers_js__WEBPACK_IMPORTED_MODULE_6__.WINDOW.document.visibilityState === "hidden") {
          if (sendClientReports) {
            this._flushOutcomes();
          }
          if (enableLogs) {
            (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__._INTERNAL_flushLogsBuffer)(this);
          }
        }
      });
    }
    if (enableLogs) {
      this.on("flush", () => {
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__._INTERNAL_flushLogsBuffer)(this);
      });
      this.on("afterCaptureLog", () => {
        if (this._logFlushIdleTimeout) {
          clearTimeout(this._logFlushIdleTimeout);
        }
        this._logFlushIdleTimeout = setTimeout(() => {
          (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__._INTERNAL_flushLogsBuffer)(this);
        }, DEFAULT_FLUSH_INTERVAL);
      });
    }
    if (sendDefaultPii) {
      this.on("postprocessEvent", _sentry_core__WEBPACK_IMPORTED_MODULE_1__.addAutoIpAddressToUser);
      this.on("beforeSendSession", _sentry_core__WEBPACK_IMPORTED_MODULE_1__.addAutoIpAddressToSession);
    }
  }
  /**
   * @inheritDoc
   */
  eventFromException(exception, hint) {
    return (0,_eventbuilder_js__WEBPACK_IMPORTED_MODULE_5__.eventFromException)(this._options.stackParser, exception, hint, this._options.attachStacktrace);
  }
  /**
   * @inheritDoc
   */
  eventFromMessage(message, level = "info", hint) {
    return (0,_eventbuilder_js__WEBPACK_IMPORTED_MODULE_5__.eventFromMessage)(this._options.stackParser, message, level, hint, this._options.attachStacktrace);
  }
  /**
   * @inheritDoc
   */
  _prepareEvent(event, hint, currentScope, isolationScope) {
    event.platform = event.platform || "javascript";
    return super._prepareEvent(event, hint, currentScope, isolationScope);
  }
}
function applyDefaultOptions(optionsArg) {
  var _a;
  return {
    release: typeof __SENTRY_RELEASE__ === "string" ? __SENTRY_RELEASE__ : (_a = _helpers_js__WEBPACK_IMPORTED_MODULE_6__.WINDOW.SENTRY_RELEASE) == null ? void 0 : _a.id,
    // This supports the variable that sentry-webpack-plugin injects
    sendClientReports: true,
    // We default this to true, as it is the safer scenario
    parentSpanIsAlwaysRootSpan: true,
    ...optionsArg
  };
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/debug-build.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/debug-build.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEBUG_BUILD: () => (/* binding */ DEBUG_BUILD)
/* harmony export */ });
const DEBUG_BUILD = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/eventbuilder.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/eventbuilder.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventFromException: () => (/* binding */ eventFromException),
/* harmony export */   eventFromMessage: () => (/* binding */ eventFromMessage),
/* harmony export */   eventFromUnknownInput: () => (/* binding */ eventFromUnknownInput),
/* harmony export */   exceptionFromError: () => (/* binding */ exceptionFromError)
/* harmony export */ });
/* unused harmony exports extractMessage, extractType */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/misc.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/normalize.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/object.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/syncpromise.js");

function exceptionFromError(stackParser, ex) {
  const frames = parseStackFrames(stackParser, ex);
  const exception = {
    type: extractType(ex),
    value: extractMessage(ex)
  };
  if (frames.length) {
    exception.stacktrace = { frames };
  }
  if (exception.type === void 0 && exception.value === "") {
    exception.value = "Unrecoverable error caught";
  }
  return exception;
}
function eventFromPlainObject(stackParser, exception, syntheticException, isUnhandledRejection) {
  const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.getClient)();
  const normalizeDepth = client == null ? void 0 : client.getOptions().normalizeDepth;
  const errorFromProp = getErrorPropertyFromObject(exception);
  const extra = {
    __serialized__: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.normalizeToSize)(exception, normalizeDepth)
  };
  if (errorFromProp) {
    return {
      exception: {
        values: [exceptionFromError(stackParser, errorFromProp)]
      },
      extra
    };
  }
  const event = {
    exception: {
      values: [
        {
          type: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isEvent)(exception) ? exception.constructor.name : isUnhandledRejection ? "UnhandledRejection" : "Error",
          value: getNonErrorObjectExceptionValue(exception, { isUnhandledRejection })
        }
      ]
    },
    extra
  };
  if (syntheticException) {
    const frames = parseStackFrames(stackParser, syntheticException);
    if (frames.length) {
      event.exception.values[0].stacktrace = { frames };
    }
  }
  return event;
}
function eventFromError(stackParser, ex) {
  return {
    exception: {
      values: [exceptionFromError(stackParser, ex)]
    }
  };
}
function parseStackFrames(stackParser, ex) {
  const stacktrace = ex.stacktrace || ex.stack || "";
  const skipLines = getSkipFirstStackStringLines(ex);
  const framesToPop = getPopFirstTopFrames(ex);
  try {
    return stackParser(stacktrace, skipLines, framesToPop);
  } catch {
  }
  return [];
}
const reactMinifiedRegexp = /Minified React error #\d+;/i;
function getSkipFirstStackStringLines(ex) {
  if (ex && reactMinifiedRegexp.test(ex.message)) {
    return 1;
  }
  return 0;
}
function getPopFirstTopFrames(ex) {
  if (typeof ex.framesToPop === "number") {
    return ex.framesToPop;
  }
  return 0;
}
function isWebAssemblyException(exception) {
  if (typeof WebAssembly !== "undefined" && typeof WebAssembly.Exception !== "undefined") {
    return exception instanceof WebAssembly.Exception;
  } else {
    return false;
  }
}
function extractType(ex) {
  const name = ex == null ? void 0 : ex.name;
  if (!name && isWebAssemblyException(ex)) {
    const hasTypeInMessage = ex.message && Array.isArray(ex.message) && ex.message.length == 2;
    return hasTypeInMessage ? ex.message[0] : "WebAssembly.Exception";
  }
  return name;
}
function extractMessage(ex) {
  const message = ex == null ? void 0 : ex.message;
  if (isWebAssemblyException(ex)) {
    if (Array.isArray(ex.message) && ex.message.length == 2) {
      return ex.message[1];
    }
    return "wasm exception";
  }
  if (!message) {
    return "No error message";
  }
  if (message.error && typeof message.error.message === "string") {
    return message.error.message;
  }
  return message;
}
function eventFromException(stackParser, exception, hint, attachStacktrace) {
  const syntheticException = (hint == null ? void 0 : hint.syntheticException) || void 0;
  const event = eventFromUnknownInput(stackParser, exception, syntheticException, attachStacktrace);
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addExceptionMechanism)(event);
  event.level = "error";
  if (hint == null ? void 0 : hint.event_id) {
    event.event_id = hint.event_id;
  }
  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.resolvedSyncPromise)(event);
}
function eventFromMessage(stackParser, message, level = "info", hint, attachStacktrace) {
  const syntheticException = (hint == null ? void 0 : hint.syntheticException) || void 0;
  const event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
  event.level = level;
  if (hint == null ? void 0 : hint.event_id) {
    event.event_id = hint.event_id;
  }
  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.resolvedSyncPromise)(event);
}
function eventFromUnknownInput(stackParser, exception, syntheticException, attachStacktrace, isUnhandledRejection) {
  let event;
  if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isErrorEvent)(exception) && exception.error) {
    const errorEvent = exception;
    return eventFromError(stackParser, errorEvent.error);
  }
  if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isDOMError)(exception) || (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isDOMException)(exception)) {
    const domException = exception;
    if ("stack" in exception) {
      event = eventFromError(stackParser, exception);
    } else {
      const name = domException.name || ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isDOMError)(domException) ? "DOMError" : "DOMException");
      const message = domException.message ? `${name}: ${domException.message}` : name;
      event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addExceptionTypeValue)(event, message);
    }
    if ("code" in domException) {
      event.tags = { ...event.tags, "DOMException.code": `${domException.code}` };
    }
    return event;
  }
  if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isError)(exception)) {
    return eventFromError(stackParser, exception);
  }
  if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(exception) || (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isEvent)(exception)) {
    const objectException = exception;
    event = eventFromPlainObject(stackParser, objectException, syntheticException, isUnhandledRejection);
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addExceptionMechanism)(event, {
      synthetic: true
    });
    return event;
  }
  event = eventFromString(stackParser, exception, syntheticException, attachStacktrace);
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addExceptionTypeValue)(event, `${exception}`, void 0);
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addExceptionMechanism)(event, {
    synthetic: true
  });
  return event;
}
function eventFromString(stackParser, message, syntheticException, attachStacktrace) {
  const event = {};
  if (attachStacktrace && syntheticException) {
    const frames = parseStackFrames(stackParser, syntheticException);
    if (frames.length) {
      event.exception = {
        values: [{ value: message, stacktrace: { frames } }]
      };
    }
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addExceptionMechanism)(event, { synthetic: true });
  }
  if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isParameterizedString)(message)) {
    const { __sentry_template_string__, __sentry_template_values__ } = message;
    event.logentry = {
      message: __sentry_template_string__,
      params: __sentry_template_values__
    };
    return event;
  }
  event.message = message;
  return event;
}
function getNonErrorObjectExceptionValue(exception, { isUnhandledRejection }) {
  const keys = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.extractExceptionKeysForMessage)(exception);
  const captureType = isUnhandledRejection ? "promise rejection" : "exception";
  if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isErrorEvent)(exception)) {
    return `Event \`ErrorEvent\` captured as ${captureType} with message \`${exception.message}\``;
  }
  if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.isEvent)(exception)) {
    const className = getObjectClassName(exception);
    return `Event \`${className}\` (type=${exception.type}) captured as ${captureType}`;
  }
  return `Object captured as ${captureType} with keys: ${keys}`;
}
function getObjectClassName(obj) {
  try {
    const prototype = Object.getPrototypeOf(obj);
    return prototype ? prototype.constructor.name : void 0;
  } catch {
  }
}
function getErrorPropertyFromObject(obj) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      const value = obj[prop];
      if (value instanceof Error) {
        return value;
      }
    }
  }
  return void 0;
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/helpers.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/helpers.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WINDOW: () => (/* binding */ WINDOW),
/* harmony export */   getHttpRequestData: () => (/* binding */ getHttpRequestData),
/* harmony export */   shouldIgnoreOnError: () => (/* binding */ shouldIgnoreOnError),
/* harmony export */   wrap: () => (/* binding */ wrap)
/* harmony export */ });
/* unused harmony export ignoreNextOnError */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/exports.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/browser.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/misc.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/object.js");

const WINDOW = _sentry_core__WEBPACK_IMPORTED_MODULE_3__.GLOBAL_OBJ;
let ignoreOnError = 0;
function shouldIgnoreOnError() {
  return ignoreOnError > 0;
}
function ignoreNextOnError() {
  ignoreOnError++;
  setTimeout(() => {
    ignoreOnError--;
  });
}
function wrap(fn, options = {}) {
  function isFunction(fn2) {
    return typeof fn2 === "function";
  }
  if (!isFunction(fn)) {
    return fn;
  }
  try {
    const wrapper = fn.__sentry_wrapped__;
    if (wrapper) {
      if (typeof wrapper === "function") {
        return wrapper;
      } else {
        return fn;
      }
    }
    if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.getOriginalFunction)(fn)) {
      return fn;
    }
  } catch {
    return fn;
  }
  const sentryWrapped = function(...args) {
    try {
      const wrappedArguments = args.map((arg) => wrap(arg, options));
      return fn.apply(this, wrappedArguments);
    } catch (ex) {
      ignoreNextOnError();
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.withScope)((scope) => {
        scope.addEventProcessor((event) => {
          if (options.mechanism) {
            (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.addExceptionTypeValue)(event, void 0, void 0);
            (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.addExceptionMechanism)(event, options.mechanism);
          }
          event.extra = {
            ...event.extra,
            arguments: args
          };
          return event;
        });
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.captureException)(ex);
      });
      throw ex;
    }
  };
  try {
    for (const property in fn) {
      if (Object.prototype.hasOwnProperty.call(fn, property)) {
        sentryWrapped[property] = fn[property];
      }
    }
  } catch {
  }
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.markFunctionWrapped)(sentryWrapped, fn);
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.addNonEnumerableProperty)(fn, "__sentry_wrapped__", sentryWrapped);
  try {
    const descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, "name");
    if (descriptor.configurable) {
      Object.defineProperty(sentryWrapped, "name", {
        get() {
          return fn.name;
        }
      });
    }
  } catch {
  }
  return sentryWrapped;
}
function getHttpRequestData() {
  const url = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getLocationHref)();
  const { referrer } = WINDOW.document || {};
  const { userAgent } = WINDOW.navigator || {};
  const headers = {
    ...referrer && { Referer: referrer },
    ...userAgent && { "User-Agent": userAgent }
  };
  const request = {
    url,
    headers
  };
  return request;
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/integrations/breadcrumbs.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/integrations/breadcrumbs.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   breadcrumbsIntegration: () => (/* binding */ breadcrumbsIntegration)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/integration.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/breadcrumbs.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/breadcrumb-log-level.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/browser.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/instrument/console.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/instrument/fetch.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/misc.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/severity.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/string.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/url.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/dom.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/history.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/xhr.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/browser/build/npm/esm/debug-build.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../helpers.js */ "../../node_modules/@sentry/browser/build/npm/esm/helpers.js");




const MAX_ALLOWED_STRING_LENGTH = 1024;
const INTEGRATION_NAME = "Breadcrumbs";
const _breadcrumbsIntegration = (options = {}) => {
  const _options = {
    console: true,
    dom: true,
    fetch: true,
    history: true,
    sentry: true,
    xhr: true,
    ...options
  };
  return {
    name: INTEGRATION_NAME,
    setup(client) {
      if (_options.console) {
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.addConsoleInstrumentationHandler)(_getConsoleBreadcrumbHandler(client));
      }
      if (_options.dom) {
        (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_12__.addClickKeypressInstrumentationHandler)(_getDomBreadcrumbHandler(client, _options.dom));
      }
      if (_options.xhr) {
        (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_14__.addXhrInstrumentationHandler)(_getXhrBreadcrumbHandler(client));
      }
      if (_options.fetch) {
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.addFetchInstrumentationHandler)(_getFetchBreadcrumbHandler(client));
      }
      if (_options.history) {
        (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_13__.addHistoryInstrumentationHandler)(_getHistoryBreadcrumbHandler(client));
      }
      if (_options.sentry) {
        client.on("beforeSendEvent", _getSentryBreadcrumbHandler(client));
      }
    }
  };
};
const breadcrumbsIntegration = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.defineIntegration)(_breadcrumbsIntegration);
function _getSentryBreadcrumbHandler(client) {
  return function addSentryBreadcrumb(event) {
    if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.getClient)() !== client) {
      return;
    }
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addBreadcrumb)(
      {
        category: `sentry.${event.type === "transaction" ? "transaction" : "event"}`,
        event_id: event.event_id,
        level: event.level,
        message: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_8__.getEventDescription)(event)
      },
      {
        event
      }
    );
  };
}
function _getDomBreadcrumbHandler(client, dom) {
  return function _innerDomBreadcrumb(handlerData) {
    if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.getClient)() !== client) {
      return;
    }
    let target;
    let componentName;
    let keyAttrs = typeof dom === "object" ? dom.serializeAttribute : void 0;
    let maxStringLength = typeof dom === "object" && typeof dom.maxStringLength === "number" ? dom.maxStringLength : void 0;
    if (maxStringLength && maxStringLength > MAX_ALLOWED_STRING_LENGTH) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_15__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_7__.debug.warn(
        `\`dom.maxStringLength\` cannot exceed ${MAX_ALLOWED_STRING_LENGTH}, but a value of ${maxStringLength} was configured. Sentry will use ${MAX_ALLOWED_STRING_LENGTH} instead.`
      );
      maxStringLength = MAX_ALLOWED_STRING_LENGTH;
    }
    if (typeof keyAttrs === "string") {
      keyAttrs = [keyAttrs];
    }
    try {
      const event = handlerData.event;
      const element = _isEvent(event) ? event.target : event;
      target = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.htmlTreeAsString)(element, { keyAttrs, maxStringLength });
      componentName = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getComponentName)(element);
    } catch {
      target = "<unknown>";
    }
    if (target.length === 0) {
      return;
    }
    const breadcrumb = {
      category: `ui.${handlerData.name}`,
      message: target
    };
    if (componentName) {
      breadcrumb.data = { "ui.component_name": componentName };
    }
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addBreadcrumb)(breadcrumb, {
      event: handlerData.event,
      name: handlerData.name,
      global: handlerData.global
    });
  };
}
function _getConsoleBreadcrumbHandler(client) {
  return function _consoleBreadcrumb(handlerData) {
    if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.getClient)() !== client) {
      return;
    }
    const breadcrumb = {
      category: "console",
      data: {
        arguments: handlerData.args,
        logger: "console"
      },
      level: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_9__.severityLevelFromString)(handlerData.level),
      message: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.safeJoin)(handlerData.args, " ")
    };
    if (handlerData.level === "assert") {
      if (handlerData.args[0] === false) {
        breadcrumb.message = `Assertion failed: ${(0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.safeJoin)(handlerData.args.slice(1), " ") || "console.assert"}`;
        breadcrumb.data.arguments = handlerData.args.slice(1);
      } else {
        return;
      }
    }
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addBreadcrumb)(breadcrumb, {
      input: handlerData.args,
      level: handlerData.level
    });
  };
}
function _getXhrBreadcrumbHandler(client) {
  return function _xhrBreadcrumb(handlerData) {
    if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.getClient)() !== client) {
      return;
    }
    const { startTimestamp, endTimestamp } = handlerData;
    const sentryXhrData = handlerData.xhr[_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_14__.SENTRY_XHR_DATA_KEY];
    if (!startTimestamp || !endTimestamp || !sentryXhrData) {
      return;
    }
    const { method, url, status_code, body } = sentryXhrData;
    const data = {
      method,
      url,
      status_code
    };
    const hint = {
      xhr: handlerData.xhr,
      input: body,
      startTimestamp,
      endTimestamp
    };
    const breadcrumb = {
      category: "xhr",
      data,
      type: "http",
      level: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getBreadcrumbLogLevelFromHttpStatusCode)(status_code)
    };
    client.emit("beforeOutgoingRequestBreadcrumb", breadcrumb, hint);
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addBreadcrumb)(breadcrumb, hint);
  };
}
function _getFetchBreadcrumbHandler(client) {
  return function _fetchBreadcrumb(handlerData) {
    if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.getClient)() !== client) {
      return;
    }
    const { startTimestamp, endTimestamp } = handlerData;
    if (!endTimestamp) {
      return;
    }
    if (handlerData.fetchData.url.match(/sentry_key/) && handlerData.fetchData.method === "POST") {
      return;
    }
    ({
      method: handlerData.fetchData.method,
      url: handlerData.fetchData.url
    });
    if (handlerData.error) {
      const data = handlerData.fetchData;
      const hint = {
        data: handlerData.error,
        input: handlerData.args,
        startTimestamp,
        endTimestamp
      };
      const breadcrumb = {
        category: "fetch",
        data,
        level: "error",
        type: "http"
      };
      client.emit("beforeOutgoingRequestBreadcrumb", breadcrumb, hint);
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addBreadcrumb)(breadcrumb, hint);
    } else {
      const response = handlerData.response;
      const data = {
        ...handlerData.fetchData,
        status_code: response == null ? void 0 : response.status
      };
      handlerData.fetchData.request_body_size;
      handlerData.fetchData.response_body_size;
      response == null ? void 0 : response.status;
      const hint = {
        input: handlerData.args,
        response,
        startTimestamp,
        endTimestamp
      };
      const breadcrumb = {
        category: "fetch",
        data,
        type: "http",
        level: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getBreadcrumbLogLevelFromHttpStatusCode)(data.status_code)
      };
      client.emit("beforeOutgoingRequestBreadcrumb", breadcrumb, hint);
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addBreadcrumb)(breadcrumb, hint);
    }
  };
}
function _getHistoryBreadcrumbHandler(client) {
  return function _historyBreadcrumb(handlerData) {
    if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.getClient)() !== client) {
      return;
    }
    let from = handlerData.from;
    let to = handlerData.to;
    const parsedLoc = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_11__.parseUrl)(_helpers_js__WEBPACK_IMPORTED_MODULE_16__.WINDOW.location.href);
    let parsedFrom = from ? (0,_sentry_core__WEBPACK_IMPORTED_MODULE_11__.parseUrl)(from) : void 0;
    const parsedTo = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_11__.parseUrl)(to);
    if (!(parsedFrom == null ? void 0 : parsedFrom.path)) {
      parsedFrom = parsedLoc;
    }
    if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
      to = parsedTo.relative;
    }
    if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
      from = parsedFrom.relative;
    }
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addBreadcrumb)({
      category: "navigation",
      data: {
        from,
        to
      }
    });
  };
}
function _isEvent(event) {
  return !!event && !!event.target;
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/integrations/browserapierrors.js":
/*!*****************************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/integrations/browserapierrors.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   browserApiErrorsIntegration: () => (/* binding */ browserApiErrorsIntegration)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/integration.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/object.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/stacktrace.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers.js */ "../../node_modules/@sentry/browser/build/npm/esm/helpers.js");


const DEFAULT_EVENT_TARGET = [
  "EventTarget",
  "Window",
  "Node",
  "ApplicationCache",
  "AudioTrackList",
  "BroadcastChannel",
  "ChannelMergerNode",
  "CryptoOperation",
  "EventSource",
  "FileReader",
  "HTMLUnknownElement",
  "IDBDatabase",
  "IDBRequest",
  "IDBTransaction",
  "KeyOperation",
  "MediaController",
  "MessagePort",
  "ModalWindow",
  "Notification",
  "SVGElementInstance",
  "Screen",
  "SharedWorker",
  "TextTrack",
  "TextTrackCue",
  "TextTrackList",
  "WebSocket",
  "WebSocketWorker",
  "Worker",
  "XMLHttpRequest",
  "XMLHttpRequestEventTarget",
  "XMLHttpRequestUpload"
];
const INTEGRATION_NAME = "BrowserApiErrors";
const _browserApiErrorsIntegration = (options = {}) => {
  const _options = {
    XMLHttpRequest: true,
    eventTarget: true,
    requestAnimationFrame: true,
    setInterval: true,
    setTimeout: true,
    unregisterOriginalCallbacks: false,
    ...options
  };
  return {
    name: INTEGRATION_NAME,
    // TODO: This currently only works for the first client this is setup
    // We may want to adjust this to check for client etc.
    setupOnce() {
      if (_options.setTimeout) {
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.fill)(_helpers_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW, "setTimeout", _wrapTimeFunction);
      }
      if (_options.setInterval) {
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.fill)(_helpers_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW, "setInterval", _wrapTimeFunction);
      }
      if (_options.requestAnimationFrame) {
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.fill)(_helpers_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW, "requestAnimationFrame", _wrapRAF);
      }
      if (_options.XMLHttpRequest && "XMLHttpRequest" in _helpers_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW) {
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.fill)(XMLHttpRequest.prototype, "send", _wrapXHR);
      }
      const eventTargetOption = _options.eventTarget;
      if (eventTargetOption) {
        const eventTarget = Array.isArray(eventTargetOption) ? eventTargetOption : DEFAULT_EVENT_TARGET;
        eventTarget.forEach((target) => _wrapEventTarget(target, _options));
      }
    }
  };
};
const browserApiErrorsIntegration = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.defineIntegration)(_browserApiErrorsIntegration);
function _wrapTimeFunction(original) {
  return function(...args) {
    const originalCallback = args[0];
    args[0] = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.wrap)(originalCallback, {
      mechanism: {
        data: { function: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(original) },
        handled: false,
        type: "instrument"
      }
    });
    return original.apply(this, args);
  };
}
function _wrapRAF(original) {
  return function(callback) {
    return original.apply(this, [
      (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.wrap)(callback, {
        mechanism: {
          data: {
            function: "requestAnimationFrame",
            handler: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(original)
          },
          handled: false,
          type: "instrument"
        }
      })
    ]);
  };
}
function _wrapXHR(originalSend) {
  return function(...args) {
    const xhr = this;
    const xmlHttpRequestProps = ["onload", "onerror", "onprogress", "onreadystatechange"];
    xmlHttpRequestProps.forEach((prop) => {
      if (prop in xhr && typeof xhr[prop] === "function") {
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.fill)(xhr, prop, function(original) {
          const wrapOptions = {
            mechanism: {
              data: {
                function: prop,
                handler: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(original)
              },
              handled: false,
              type: "instrument"
            }
          };
          const originalFunction = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getOriginalFunction)(original);
          if (originalFunction) {
            wrapOptions.mechanism.data.handler = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(originalFunction);
          }
          return (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.wrap)(original, wrapOptions);
        });
      }
    });
    return originalSend.apply(this, args);
  };
}
function _wrapEventTarget(target, integrationOptions) {
  var _a, _b;
  const globalObject = _helpers_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW;
  const proto = (_a = globalObject[target]) == null ? void 0 : _a.prototype;
  if (!((_b = proto == null ? void 0 : proto.hasOwnProperty) == null ? void 0 : _b.call(proto, "addEventListener"))) {
    return;
  }
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.fill)(proto, "addEventListener", function(original) {
    return function(eventName, fn, options) {
      try {
        if (isEventListenerObject(fn)) {
          fn.handleEvent = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.wrap)(fn.handleEvent, {
            mechanism: {
              data: {
                function: "handleEvent",
                handler: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(fn),
                target
              },
              handled: false,
              type: "instrument"
            }
          });
        }
      } catch {
      }
      if (integrationOptions.unregisterOriginalCallbacks) {
        unregisterOriginalCallback(this, eventName, fn);
      }
      return original.apply(this, [
        eventName,
        (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.wrap)(fn, {
          mechanism: {
            data: {
              function: "addEventListener",
              handler: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(fn),
              target
            },
            handled: false,
            type: "instrument"
          }
        }),
        options
      ]);
    };
  });
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.fill)(proto, "removeEventListener", function(originalRemoveEventListener) {
    return function(eventName, fn, options) {
      try {
        const originalEventHandler = fn.__sentry_wrapped__;
        if (originalEventHandler) {
          originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
        }
      } catch {
      }
      return originalRemoveEventListener.call(this, eventName, fn, options);
    };
  });
}
function isEventListenerObject(obj) {
  return typeof obj.handleEvent === "function";
}
function unregisterOriginalCallback(target, eventName, fn) {
  if (target && typeof target === "object" && "removeEventListener" in target && typeof target.removeEventListener === "function") {
    target.removeEventListener(eventName, fn);
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/integrations/browsersession.js":
/*!***************************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/integrations/browsersession.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   browserSessionIntegration: () => (/* binding */ browserSessionIntegration)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/exports.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/integration.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/history.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/browser/build/npm/esm/debug-build.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers.js */ "../../node_modules/@sentry/browser/build/npm/esm/helpers.js");




const browserSessionIntegration = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.defineIntegration)(() => {
  return {
    name: "BrowserSession",
    setupOnce() {
      if (typeof _helpers_js__WEBPACK_IMPORTED_MODULE_5__.WINDOW.document === "undefined") {
        _debug_build_js__WEBPACK_IMPORTED_MODULE_4__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_2__.debug.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");
        return;
      }
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.startSession)({ ignoreDuration: true });
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.captureSession)();
      (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_3__.addHistoryInstrumentationHandler)(({ from, to }) => {
        if (from !== void 0 && from !== to) {
          (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.startSession)({ ignoreDuration: true });
          (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.captureSession)();
        }
      });
    }
  };
});



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/integrations/globalhandlers.js":
/*!***************************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/integrations/globalhandlers.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   globalHandlersIntegration: () => (/* binding */ globalHandlersIntegration)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/exports.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/integration.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/browser.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/instrument/globalError.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/instrument/globalUnhandledRejection.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/stacktrace.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/browser/build/npm/esm/debug-build.js");
/* harmony import */ var _eventbuilder_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../eventbuilder.js */ "../../node_modules/@sentry/browser/build/npm/esm/eventbuilder.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../helpers.js */ "../../node_modules/@sentry/browser/build/npm/esm/helpers.js");




const INTEGRATION_NAME = "GlobalHandlers";
const _globalHandlersIntegration = (options = {}) => {
  const _options = {
    onerror: true,
    onunhandledrejection: true,
    ...options
  };
  return {
    name: INTEGRATION_NAME,
    setupOnce() {
      Error.stackTraceLimit = 50;
    },
    setup(client) {
      if (_options.onerror) {
        _installGlobalOnErrorHandler(client);
        globalHandlerLog("onerror");
      }
      if (_options.onunhandledrejection) {
        _installGlobalOnUnhandledRejectionHandler(client);
        globalHandlerLog("onunhandledrejection");
      }
    }
  };
};
const globalHandlersIntegration = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.defineIntegration)(_globalHandlersIntegration);
function _installGlobalOnErrorHandler(client) {
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.addGlobalErrorInstrumentationHandler)((data) => {
    const { stackParser, attachStacktrace } = getOptions();
    if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getClient)() !== client || (0,_helpers_js__WEBPACK_IMPORTED_MODULE_11__.shouldIgnoreOnError)()) {
      return;
    }
    const { msg, url, line, column, error } = data;
    const event = _enhanceEventWithInitialFrame(
      (0,_eventbuilder_js__WEBPACK_IMPORTED_MODULE_10__.eventFromUnknownInput)(stackParser, error || msg, void 0, attachStacktrace, false),
      url,
      line,
      column
    );
    event.level = "error";
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.captureEvent)(event, {
      originalException: error,
      mechanism: {
        handled: false,
        type: "onerror"
      }
    });
  });
}
function _installGlobalOnUnhandledRejectionHandler(client) {
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.addGlobalUnhandledRejectionInstrumentationHandler)((e) => {
    const { stackParser, attachStacktrace } = getOptions();
    if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getClient)() !== client || (0,_helpers_js__WEBPACK_IMPORTED_MODULE_11__.shouldIgnoreOnError)()) {
      return;
    }
    const error = _getUnhandledRejectionError(e);
    const event = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.isPrimitive)(error) ? _eventFromRejectionWithPrimitive(error) : (0,_eventbuilder_js__WEBPACK_IMPORTED_MODULE_10__.eventFromUnknownInput)(stackParser, error, void 0, attachStacktrace, true);
    event.level = "error";
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.captureEvent)(event, {
      originalException: error,
      mechanism: {
        handled: false,
        type: "onunhandledrejection"
      }
    });
  });
}
function _getUnhandledRejectionError(error) {
  if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.isPrimitive)(error)) {
    return error;
  }
  try {
    if ("reason" in error) {
      return error.reason;
    }
    if ("detail" in error && "reason" in error.detail) {
      return error.detail.reason;
    }
  } catch {
  }
  return error;
}
function _eventFromRejectionWithPrimitive(reason) {
  return {
    exception: {
      values: [
        {
          type: "UnhandledRejection",
          // String() is needed because the Primitive type includes symbols (which can't be automatically stringified)
          value: `Non-Error promise rejection captured with value: ${String(reason)}`
        }
      ]
    }
  };
}
function _enhanceEventWithInitialFrame(event, url, line, column) {
  const e = event.exception = event.exception || {};
  const ev = e.values = e.values || [];
  const ev0 = ev[0] = ev[0] || {};
  const ev0s = ev0.stacktrace = ev0.stacktrace || {};
  const ev0sf = ev0s.frames = ev0s.frames || [];
  const colno = column;
  const lineno = line;
  const filename = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.isString)(url) && url.length > 0 ? url : (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getLocationHref)();
  if (ev0sf.length === 0) {
    ev0sf.push({
      colno,
      filename,
      function: _sentry_core__WEBPACK_IMPORTED_MODULE_8__.UNKNOWN_FUNCTION,
      in_app: true,
      lineno
    });
  }
  return event;
}
function globalHandlerLog(type) {
  _debug_build_js__WEBPACK_IMPORTED_MODULE_9__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_7__.debug.log(`Global Handler attached: ${type}`);
}
function getOptions() {
  const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getClient)();
  const options = (client == null ? void 0 : client.getOptions()) || {
    stackParser: () => [],
    attachStacktrace: false
  };
  return options;
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/integrations/httpcontext.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/integrations/httpcontext.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   httpContextIntegration: () => (/* binding */ httpContextIntegration)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/integration.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers.js */ "../../node_modules/@sentry/browser/build/npm/esm/helpers.js");


const httpContextIntegration = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.defineIntegration)(() => {
  return {
    name: "HttpContext",
    preprocessEvent(event) {
      var _a;
      if (!_helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW.navigator && !_helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW.location && !_helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW.document) {
        return;
      }
      const reqData = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getHttpRequestData)();
      const headers = {
        ...reqData.headers,
        ...(_a = event.request) == null ? void 0 : _a.headers
      };
      event.request = {
        ...reqData,
        ...event.request,
        headers
      };
    }
  };
});



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/integrations/linkederrors.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/integrations/linkederrors.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   linkedErrorsIntegration: () => (/* binding */ linkedErrorsIntegration)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/integration.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/aggregate-errors.js");
/* harmony import */ var _eventbuilder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../eventbuilder.js */ "../../node_modules/@sentry/browser/build/npm/esm/eventbuilder.js");


const DEFAULT_KEY = "cause";
const DEFAULT_LIMIT = 5;
const INTEGRATION_NAME = "LinkedErrors";
const _linkedErrorsIntegration = (options = {}) => {
  const limit = options.limit || DEFAULT_LIMIT;
  const key = options.key || DEFAULT_KEY;
  return {
    name: INTEGRATION_NAME,
    preprocessEvent(event, hint, client) {
      const options2 = client.getOptions();
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.applyAggregateErrorsToEvent)(
        // This differs from the LinkedErrors integration in core by using a different exceptionFromError function
        _eventbuilder_js__WEBPACK_IMPORTED_MODULE_2__.exceptionFromError,
        options2.stackParser,
        key,
        limit,
        event,
        hint
      );
    }
  };
};
const linkedErrorsIntegration = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.defineIntegration)(_linkedErrorsIntegration);



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/sdk.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/sdk.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* unused harmony exports forceLoad, getDefaultIntegrations, onLoad */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/sdk.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/integration.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/integrations/functiontostring.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/integrations/eventFilters.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/integrations/dedupe.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/stacktrace.js");
/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./client.js */ "../../node_modules/@sentry/browser/build/npm/esm/client.js");
/* harmony import */ var _integrations_breadcrumbs_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./integrations/breadcrumbs.js */ "../../node_modules/@sentry/browser/build/npm/esm/integrations/breadcrumbs.js");
/* harmony import */ var _integrations_browserapierrors_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./integrations/browserapierrors.js */ "../../node_modules/@sentry/browser/build/npm/esm/integrations/browserapierrors.js");
/* harmony import */ var _integrations_browsersession_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./integrations/browsersession.js */ "../../node_modules/@sentry/browser/build/npm/esm/integrations/browsersession.js");
/* harmony import */ var _integrations_globalhandlers_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./integrations/globalhandlers.js */ "../../node_modules/@sentry/browser/build/npm/esm/integrations/globalhandlers.js");
/* harmony import */ var _integrations_httpcontext_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./integrations/httpcontext.js */ "../../node_modules/@sentry/browser/build/npm/esm/integrations/httpcontext.js");
/* harmony import */ var _integrations_linkederrors_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./integrations/linkederrors.js */ "../../node_modules/@sentry/browser/build/npm/esm/integrations/linkederrors.js");
/* harmony import */ var _stack_parsers_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./stack-parsers.js */ "../../node_modules/@sentry/browser/build/npm/esm/stack-parsers.js");
/* harmony import */ var _transports_fetch_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./transports/fetch.js */ "../../node_modules/@sentry/browser/build/npm/esm/transports/fetch.js");
/* harmony import */ var _utils_detectBrowserExtension_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils/detectBrowserExtension.js */ "../../node_modules/@sentry/browser/build/npm/esm/utils/detectBrowserExtension.js");











function getDefaultIntegrations(_options) {
  return [
    // TODO(v10): Replace with `eventFiltersIntegration` once we remove the deprecated `inboundFiltersIntegration`
    // eslint-disable-next-line deprecation/deprecation
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.inboundFiltersIntegration)(),
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.functionToStringIntegration)(),
    (0,_integrations_browserapierrors_js__WEBPACK_IMPORTED_MODULE_8__.browserApiErrorsIntegration)(),
    (0,_integrations_breadcrumbs_js__WEBPACK_IMPORTED_MODULE_7__.breadcrumbsIntegration)(),
    (0,_integrations_globalhandlers_js__WEBPACK_IMPORTED_MODULE_10__.globalHandlersIntegration)(),
    (0,_integrations_linkederrors_js__WEBPACK_IMPORTED_MODULE_12__.linkedErrorsIntegration)(),
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.dedupeIntegration)(),
    (0,_integrations_httpcontext_js__WEBPACK_IMPORTED_MODULE_11__.httpContextIntegration)(),
    (0,_integrations_browsersession_js__WEBPACK_IMPORTED_MODULE_9__.browserSessionIntegration)()
  ];
}
function init(options = {}) {
  const shouldDisableBecauseIsBrowserExtenstion = !options.skipBrowserExtensionCheck && (0,_utils_detectBrowserExtension_js__WEBPACK_IMPORTED_MODULE_15__.checkAndWarnIfIsEmbeddedBrowserExtension)();
  const clientOptions = {
    ...options,
    enabled: shouldDisableBecauseIsBrowserExtenstion ? false : options.enabled,
    stackParser: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.stackParserFromStackParserOptions)(options.stackParser || _stack_parsers_js__WEBPACK_IMPORTED_MODULE_13__.defaultStackParser),
    integrations: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getIntegrationsToSetup)({
      integrations: options.integrations,
      defaultIntegrations: options.defaultIntegrations == null ? getDefaultIntegrations() : options.defaultIntegrations
    }),
    transport: options.transport || _transports_fetch_js__WEBPACK_IMPORTED_MODULE_14__.makeFetchTransport
  };
  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.initAndBind)(_client_js__WEBPACK_IMPORTED_MODULE_6__.BrowserClient, clientOptions);
}
function forceLoad() {
}
function onLoad(callback) {
  callback();
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/stack-parsers.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/stack-parsers.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultStackParser: () => (/* binding */ defaultStackParser)
/* harmony export */ });
/* unused harmony exports chromeStackLineParser, defaultStackLineParsers, geckoStackLineParser, opera10StackLineParser, opera11StackLineParser, winjsStackLineParser */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/stacktrace.js");

const OPERA10_PRIORITY = 10;
const OPERA11_PRIORITY = 20;
const CHROME_PRIORITY = 30;
const WINJS_PRIORITY = 40;
const GECKO_PRIORITY = 50;
function createFrame(filename, func, lineno, colno) {
  const frame = {
    filename,
    function: func === "<anonymous>" ? _sentry_core__WEBPACK_IMPORTED_MODULE_0__.UNKNOWN_FUNCTION : func,
    in_app: true
    // All browser frames are considered in_app
  };
  if (lineno !== void 0) {
    frame.lineno = lineno;
  }
  if (colno !== void 0) {
    frame.colno = colno;
  }
  return frame;
}
const chromeRegexNoFnName = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;
const chromeRegex = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
const chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;
const chromeStackParserFn = (line) => {
  const noFnParts = chromeRegexNoFnName.exec(line);
  if (noFnParts) {
    const [, filename, line2, col] = noFnParts;
    return createFrame(filename, _sentry_core__WEBPACK_IMPORTED_MODULE_0__.UNKNOWN_FUNCTION, +line2, +col);
  }
  const parts = chromeRegex.exec(line);
  if (parts) {
    const isEval = parts[2] && parts[2].indexOf("eval") === 0;
    if (isEval) {
      const subMatch = chromeEvalRegex.exec(parts[2]);
      if (subMatch) {
        parts[2] = subMatch[1];
        parts[3] = subMatch[2];
        parts[4] = subMatch[3];
      }
    }
    const [func, filename] = extractSafariExtensionDetails(parts[1] || _sentry_core__WEBPACK_IMPORTED_MODULE_0__.UNKNOWN_FUNCTION, parts[2]);
    return createFrame(filename, func, parts[3] ? +parts[3] : void 0, parts[4] ? +parts[4] : void 0);
  }
  return;
};
const chromeStackLineParser = [CHROME_PRIORITY, chromeStackParserFn];
const geckoREgex = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
const geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
const gecko = (line) => {
  const parts = geckoREgex.exec(line);
  if (parts) {
    const isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
    if (isEval) {
      const subMatch = geckoEvalRegex.exec(parts[3]);
      if (subMatch) {
        parts[1] = parts[1] || "eval";
        parts[3] = subMatch[1];
        parts[4] = subMatch[2];
        parts[5] = "";
      }
    }
    let filename = parts[3];
    let func = parts[1] || _sentry_core__WEBPACK_IMPORTED_MODULE_0__.UNKNOWN_FUNCTION;
    [func, filename] = extractSafariExtensionDetails(func, filename);
    return createFrame(filename, func, parts[4] ? +parts[4] : void 0, parts[5] ? +parts[5] : void 0);
  }
  return;
};
const geckoStackLineParser = [GECKO_PRIORITY, gecko];
const winjsRegex = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:[-a-z]+):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
const winjs = (line) => {
  const parts = winjsRegex.exec(line);
  return parts ? createFrame(parts[2], parts[1] || _sentry_core__WEBPACK_IMPORTED_MODULE_0__.UNKNOWN_FUNCTION, +parts[3], parts[4] ? +parts[4] : void 0) : void 0;
};
const winjsStackLineParser = [WINJS_PRIORITY, winjs];
const opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
const opera10 = (line) => {
  const parts = opera10Regex.exec(line);
  return parts ? createFrame(parts[2], parts[3] || _sentry_core__WEBPACK_IMPORTED_MODULE_0__.UNKNOWN_FUNCTION, +parts[1]) : void 0;
};
const opera10StackLineParser = [OPERA10_PRIORITY, opera10];
const opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i;
const opera11 = (line) => {
  const parts = opera11Regex.exec(line);
  return parts ? createFrame(parts[5], parts[3] || parts[4] || _sentry_core__WEBPACK_IMPORTED_MODULE_0__.UNKNOWN_FUNCTION, +parts[1], +parts[2]) : void 0;
};
const opera11StackLineParser = [OPERA11_PRIORITY, opera11];
const defaultStackLineParsers = [chromeStackLineParser, geckoStackLineParser];
const defaultStackParser = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.createStackParser)(...defaultStackLineParsers);
const extractSafariExtensionDetails = (func, filename) => {
  const isSafariExtension = func.indexOf("safari-extension") !== -1;
  const isSafariWebExtension = func.indexOf("safari-web-extension") !== -1;
  return isSafariExtension || isSafariWebExtension ? [
    func.indexOf("@") !== -1 ? func.split("@")[0] : _sentry_core__WEBPACK_IMPORTED_MODULE_0__.UNKNOWN_FUNCTION,
    isSafariExtension ? `safari-extension:${filename}` : `safari-web-extension:${filename}`
  ] : [func, filename];
};



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/tracing/backgroundtab.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/tracing/backgroundtab.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerBackgroundTabDetection: () => (/* binding */ registerBackgroundTabDetection)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/tracing/spanstatus.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/browser/build/npm/esm/debug-build.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers.js */ "../../node_modules/@sentry/browser/build/npm/esm/helpers.js");



function registerBackgroundTabDetection() {
  if (_helpers_js__WEBPACK_IMPORTED_MODULE_4__.WINDOW.document) {
    _helpers_js__WEBPACK_IMPORTED_MODULE_4__.WINDOW.document.addEventListener("visibilitychange", () => {
      const activeSpan = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getActiveSpan)();
      if (!activeSpan) {
        return;
      }
      const rootSpan = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getRootSpan)(activeSpan);
      if (_helpers_js__WEBPACK_IMPORTED_MODULE_4__.WINDOW.document.hidden && rootSpan) {
        const cancelledStatus = "cancelled";
        const { op, status } = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.spanToJSON)(rootSpan);
        if (_debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD) {
          _sentry_core__WEBPACK_IMPORTED_MODULE_2__.debug.log(`[Tracing] Transaction: ${cancelledStatus} -> since tab moved to the background, op: ${op}`);
        }
        if (!status) {
          rootSpan.setStatus({ code: _sentry_core__WEBPACK_IMPORTED_MODULE_0__.SPAN_STATUS_ERROR, message: cancelledStatus });
        }
        rootSpan.setAttribute("sentry.cancellation_reason", "document.hidden");
        rootSpan.end();
      }
    });
  } else {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_2__.debug.warn("[Tracing] Could not set up background tab detection due to lack of global document");
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/tracing/browserTracingIntegration.js":
/*!*********************************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/tracing/browserTracingIntegration.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   browserTracingIntegration: () => (/* binding */ browserTracingIntegration)
/* harmony export */ });
/* unused harmony exports BROWSER_TRACING_INTEGRATION_ID, getMetaContent, startBrowserTracingNavigationSpan, startBrowserTracingPageLoadSpan */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/tracing/errors.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/tracing/idleSpan.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/tracing/trace.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/browser.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/object.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/tracing.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/url.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/propagationContext.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/browserMetrics.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/elementTiming.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/history.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/inp.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/browser/build/npm/esm/debug-build.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../helpers.js */ "../../node_modules/@sentry/browser/build/npm/esm/helpers.js");
/* harmony import */ var _backgroundtab_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./backgroundtab.js */ "../../node_modules/@sentry/browser/build/npm/esm/tracing/backgroundtab.js");
/* harmony import */ var _linkedTraces_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./linkedTraces.js */ "../../node_modules/@sentry/browser/build/npm/esm/tracing/linkedTraces.js");
/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./request.js */ "../../node_modules/@sentry/browser/build/npm/esm/tracing/request.js");







const BROWSER_TRACING_INTEGRATION_ID = "BrowserTracing";
const DEFAULT_BROWSER_TRACING_OPTIONS = {
  ..._sentry_core__WEBPACK_IMPORTED_MODULE_1__.TRACING_DEFAULTS,
  instrumentNavigation: true,
  instrumentPageLoad: true,
  markBackgroundSpan: true,
  enableLongTask: true,
  enableLongAnimationFrame: true,
  enableInp: true,
  enableElementTiming: true,
  ignoreResourceSpans: [],
  ignorePerformanceApiSpans: [],
  detectRedirects: true,
  linkPreviousTrace: "in-memory",
  consistentTraceSampling: false,
  _experiments: {},
  ..._request_js__WEBPACK_IMPORTED_MODULE_23__.defaultRequestInstrumentationOptions
};
const browserTracingIntegration = (_options = {}) => {
  const latestRoute = {
    name: void 0,
    source: void 0
  };
  const optionalWindowDocument = _helpers_js__WEBPACK_IMPORTED_MODULE_20__.WINDOW.document;
  const {
    enableInp,
    enableElementTiming,
    enableLongTask,
    enableLongAnimationFrame,
    _experiments: { enableInteractions, enableStandaloneClsSpans, enableStandaloneLcpSpans },
    beforeStartSpan,
    idleTimeout,
    finalTimeout,
    childSpanTimeout,
    markBackgroundSpan,
    traceFetch,
    traceXHR,
    trackFetchStreamPerformance,
    shouldCreateSpanForRequest,
    enableHTTPTimings,
    ignoreResourceSpans,
    ignorePerformanceApiSpans,
    instrumentPageLoad,
    instrumentNavigation,
    detectRedirects,
    linkPreviousTrace,
    consistentTraceSampling,
    onRequestSpanStart
  } = {
    ...DEFAULT_BROWSER_TRACING_OPTIONS,
    ..._options
  };
  let _collectWebVitals;
  let lastInteractionTimestamp;
  function _createRouteSpan(client, startSpanOptions, makeActive = true) {
    const isPageloadTransaction = startSpanOptions.op === "pageload";
    const finalStartSpanOptions = beforeStartSpan ? beforeStartSpan(startSpanOptions) : startSpanOptions;
    const attributes = finalStartSpanOptions.attributes || {};
    if (startSpanOptions.name !== finalStartSpanOptions.name) {
      attributes[_sentry_core__WEBPACK_IMPORTED_MODULE_4__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] = "custom";
      finalStartSpanOptions.attributes = attributes;
    }
    if (!makeActive) {
      const now = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_11__.dateTimestampInSeconds)();
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.startInactiveSpan)({
        ...finalStartSpanOptions,
        startTime: now
      }).end(now);
      return;
    }
    latestRoute.name = finalStartSpanOptions.name;
    latestRoute.source = attributes[_sentry_core__WEBPACK_IMPORTED_MODULE_4__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
    const idleSpan = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.startIdleSpan)(finalStartSpanOptions, {
      idleTimeout,
      finalTimeout,
      childSpanTimeout,
      // should wait for finish signal if it's a pageload transaction
      disableAutoFinish: isPageloadTransaction,
      beforeSpanEnd: (span) => {
        _collectWebVitals == null ? void 0 : _collectWebVitals();
        (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_15__.addPerformanceEntries)(span, {
          recordClsOnPageloadSpan: !enableStandaloneClsSpans,
          recordLcpOnPageloadSpan: !enableStandaloneLcpSpans,
          ignoreResourceSpans,
          ignorePerformanceApiSpans
        });
        setActiveIdleSpan(client, void 0);
        const scope = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.getCurrentScope)();
        const oldPropagationContext = scope.getPropagationContext();
        scope.setPropagationContext({
          ...oldPropagationContext,
          traceId: idleSpan.spanContext().traceId,
          sampled: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.spanIsSampled)(idleSpan),
          dsc: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getDynamicSamplingContextFromSpan)(span)
        });
      }
    });
    setActiveIdleSpan(client, idleSpan);
    function emitFinish() {
      if (optionalWindowDocument && ["interactive", "complete"].includes(optionalWindowDocument.readyState)) {
        client.emit("idleSpanEnableAutoFinish", idleSpan);
      }
    }
    if (isPageloadTransaction && optionalWindowDocument) {
      optionalWindowDocument.addEventListener("readystatechange", () => {
        emitFinish();
      });
      emitFinish();
    }
  }
  return {
    name: BROWSER_TRACING_INTEGRATION_ID,
    setup(client) {
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.registerSpanErrorInstrumentation)();
      _collectWebVitals = (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_15__.startTrackingWebVitals)({
        recordClsStandaloneSpans: enableStandaloneClsSpans || false,
        recordLcpStandaloneSpans: enableStandaloneLcpSpans || false,
        client
      });
      if (enableInp) {
        (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_18__.startTrackingINP)();
      }
      if (enableElementTiming) {
        (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_16__.startTrackingElementTiming)();
      }
      if (enableLongAnimationFrame && _sentry_core__WEBPACK_IMPORTED_MODULE_8__.GLOBAL_OBJ.PerformanceObserver && PerformanceObserver.supportedEntryTypes && PerformanceObserver.supportedEntryTypes.includes("long-animation-frame")) {
        (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_15__.startTrackingLongAnimationFrames)();
      } else if (enableLongTask) {
        (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_15__.startTrackingLongTasks)();
      }
      if (enableInteractions) {
        (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_15__.startTrackingInteractions)();
      }
      if (detectRedirects && optionalWindowDocument) {
        const interactionHandler = () => {
          lastInteractionTimestamp = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_11__.timestampInSeconds)();
        };
        addEventListener("click", interactionHandler, { capture: true });
        addEventListener("keydown", interactionHandler, { capture: true, passive: true });
      }
      function maybeEndActiveSpan() {
        const activeSpan = getActiveIdleSpan(client);
        if (activeSpan && !(0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(activeSpan).timestamp) {
          _debug_build_js__WEBPACK_IMPORTED_MODULE_19__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_9__.debug.log(`[Tracing] Finishing current active span with op: ${(0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(activeSpan).op}`);
          activeSpan.setAttribute(_sentry_core__WEBPACK_IMPORTED_MODULE_4__.SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON, "cancelled");
          activeSpan.end();
        }
      }
      client.on("startNavigationSpan", (startSpanOptions, navigationOptions) => {
        if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.getClient)() !== client) {
          return;
        }
        if (navigationOptions == null ? void 0 : navigationOptions.isRedirect) {
          _debug_build_js__WEBPACK_IMPORTED_MODULE_19__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_9__.debug.warn("[Tracing] Detected redirect, navigation span will not be the root span, but a child span.");
          _createRouteSpan(
            client,
            {
              op: "navigation.redirect",
              ...startSpanOptions
            },
            false
          );
          return;
        }
        maybeEndActiveSpan();
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.getIsolationScope)().setPropagationContext({ traceId: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_14__.generateTraceId)(), sampleRand: Math.random() });
        const scope = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.getCurrentScope)();
        scope.setPropagationContext({ traceId: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_14__.generateTraceId)(), sampleRand: Math.random() });
        scope.setSDKProcessingMetadata({
          normalizedRequest: void 0
        });
        _createRouteSpan(client, {
          op: "navigation",
          ...startSpanOptions
        });
      });
      client.on("startPageLoadSpan", (startSpanOptions, traceOptions = {}) => {
        if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.getClient)() !== client) {
          return;
        }
        maybeEndActiveSpan();
        const sentryTrace = traceOptions.sentryTrace || getMetaContent("sentry-trace");
        const baggage = traceOptions.baggage || getMetaContent("baggage");
        const propagationContext = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_12__.propagationContextFromHeaders)(sentryTrace, baggage);
        const scope = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.getCurrentScope)();
        scope.setPropagationContext(propagationContext);
        scope.setSDKProcessingMetadata({
          normalizedRequest: (0,_helpers_js__WEBPACK_IMPORTED_MODULE_20__.getHttpRequestData)()
        });
        _createRouteSpan(client, {
          op: "pageload",
          ...startSpanOptions
        });
      });
    },
    afterAllSetup(client) {
      let startingUrl = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_7__.getLocationHref)();
      if (linkPreviousTrace !== "off") {
        (0,_linkedTraces_js__WEBPACK_IMPORTED_MODULE_22__.linkTraces)(client, { linkPreviousTrace, consistentTraceSampling });
      }
      if (_helpers_js__WEBPACK_IMPORTED_MODULE_20__.WINDOW.location) {
        if (instrumentPageLoad) {
          const origin = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_11__.browserPerformanceTimeOrigin)();
          startBrowserTracingPageLoadSpan(client, {
            name: _helpers_js__WEBPACK_IMPORTED_MODULE_20__.WINDOW.location.pathname,
            // pageload should always start at timeOrigin (and needs to be in s, not ms)
            startTime: origin ? origin / 1e3 : void 0,
            attributes: {
              [_sentry_core__WEBPACK_IMPORTED_MODULE_4__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url",
              [_sentry_core__WEBPACK_IMPORTED_MODULE_4__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.pageload.browser"
            }
          });
        }
        if (instrumentNavigation) {
          (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_17__.addHistoryInstrumentationHandler)(({ to, from }) => {
            if (from === void 0 && (startingUrl == null ? void 0 : startingUrl.indexOf(to)) !== -1) {
              startingUrl = void 0;
              return;
            }
            startingUrl = void 0;
            const parsed = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_13__.parseStringToURLObject)(to);
            const activeSpan = getActiveIdleSpan(client);
            const navigationIsRedirect = activeSpan && detectRedirects && isRedirect(activeSpan, lastInteractionTimestamp);
            startBrowserTracingNavigationSpan(
              client,
              {
                name: (parsed == null ? void 0 : parsed.pathname) || _helpers_js__WEBPACK_IMPORTED_MODULE_20__.WINDOW.location.pathname,
                attributes: {
                  [_sentry_core__WEBPACK_IMPORTED_MODULE_4__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url",
                  [_sentry_core__WEBPACK_IMPORTED_MODULE_4__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.navigation.browser"
                }
              },
              { url: to, isRedirect: navigationIsRedirect }
            );
          });
        }
      }
      if (markBackgroundSpan) {
        (0,_backgroundtab_js__WEBPACK_IMPORTED_MODULE_21__.registerBackgroundTabDetection)();
      }
      if (enableInteractions) {
        registerInteractionListener(client, idleTimeout, finalTimeout, childSpanTimeout, latestRoute);
      }
      if (enableInp) {
        (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_18__.registerInpInteractionListener)();
      }
      (0,_request_js__WEBPACK_IMPORTED_MODULE_23__.instrumentOutgoingRequests)(client, {
        traceFetch,
        traceXHR,
        trackFetchStreamPerformance,
        tracePropagationTargets: client.getOptions().tracePropagationTargets,
        shouldCreateSpanForRequest,
        enableHTTPTimings,
        onRequestSpanStart
      });
    }
  };
};
function startBrowserTracingPageLoadSpan(client, spanOptions, traceOptions) {
  client.emit("startPageLoadSpan", spanOptions, traceOptions);
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.getCurrentScope)().setTransactionName(spanOptions.name);
  const pageloadSpan = getActiveIdleSpan(client);
  if (pageloadSpan) {
    client.emit("afterStartPageLoadSpan", pageloadSpan);
  }
  return pageloadSpan;
}
function startBrowserTracingNavigationSpan(client, spanOptions, options) {
  const { url, isRedirect: isRedirect2 } = options || {};
  client.emit("beforeStartNavigationSpan", spanOptions, { isRedirect: isRedirect2 });
  client.emit("startNavigationSpan", spanOptions, { isRedirect: isRedirect2 });
  const scope = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.getCurrentScope)();
  scope.setTransactionName(spanOptions.name);
  if (url && !isRedirect2) {
    scope.setSDKProcessingMetadata({
      normalizedRequest: {
        ...(0,_helpers_js__WEBPACK_IMPORTED_MODULE_20__.getHttpRequestData)(),
        url
      }
    });
  }
  return getActiveIdleSpan(client);
}
function getMetaContent(metaName) {
  const optionalWindowDocument = _helpers_js__WEBPACK_IMPORTED_MODULE_20__.WINDOW.document;
  const metaTag = optionalWindowDocument == null ? void 0 : optionalWindowDocument.querySelector(`meta[name=${metaName}]`);
  return (metaTag == null ? void 0 : metaTag.getAttribute("content")) || void 0;
}
function registerInteractionListener(client, idleTimeout, finalTimeout, childSpanTimeout, latestRoute) {
  const optionalWindowDocument = _helpers_js__WEBPACK_IMPORTED_MODULE_20__.WINDOW.document;
  let inflightInteractionSpan;
  const registerInteractionTransaction = () => {
    const op = "ui.action.click";
    const activeIdleSpan = getActiveIdleSpan(client);
    if (activeIdleSpan) {
      const currentRootSpanOp = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(activeIdleSpan).op;
      if (["navigation", "pageload"].includes(currentRootSpanOp)) {
        _debug_build_js__WEBPACK_IMPORTED_MODULE_19__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_9__.debug.warn(`[Tracing] Did not create ${op} span because a pageload or navigation span is in progress.`);
        return void 0;
      }
    }
    if (inflightInteractionSpan) {
      inflightInteractionSpan.setAttribute(_sentry_core__WEBPACK_IMPORTED_MODULE_4__.SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON, "interactionInterrupted");
      inflightInteractionSpan.end();
      inflightInteractionSpan = void 0;
    }
    if (!latestRoute.name) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_19__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_9__.debug.warn(`[Tracing] Did not create ${op} transaction because _latestRouteName is missing.`);
      return void 0;
    }
    inflightInteractionSpan = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.startIdleSpan)(
      {
        name: latestRoute.name,
        op,
        attributes: {
          [_sentry_core__WEBPACK_IMPORTED_MODULE_4__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: latestRoute.source || "url"
        }
      },
      {
        idleTimeout,
        finalTimeout,
        childSpanTimeout
      }
    );
  };
  if (optionalWindowDocument) {
    addEventListener("click", registerInteractionTransaction, { capture: true });
  }
}
const ACTIVE_IDLE_SPAN_PROPERTY = "_sentry_idleSpan";
function getActiveIdleSpan(client) {
  return client[ACTIVE_IDLE_SPAN_PROPERTY];
}
function setActiveIdleSpan(client, span) {
  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.addNonEnumerableProperty)(client, ACTIVE_IDLE_SPAN_PROPERTY, span);
}
const REDIRECT_THRESHOLD = 0.3;
function isRedirect(activeSpan, lastInteractionTimestamp) {
  const spanData = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(activeSpan);
  const now = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_11__.dateTimestampInSeconds)();
  const startTimestamp = spanData.start_timestamp;
  if (now - startTimestamp > REDIRECT_THRESHOLD) {
    return false;
  }
  if (lastInteractionTimestamp && now - lastInteractionTimestamp <= REDIRECT_THRESHOLD) {
    return false;
  }
  return true;
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/tracing/linkedTraces.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/tracing/linkedTraces.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   linkTraces: () => (/* binding */ linkTraces)
/* harmony export */ });
/* unused harmony exports PREVIOUS_TRACE_KEY, PREVIOUS_TRACE_MAX_DURATION, PREVIOUS_TRACE_TMP_SPAN_ATTRIBUTE, addPreviousTraceSpanLink, getPreviousTraceFromSessionStorage, spanContextSampled, storePreviousTraceInSessionStorage */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/browser/build/npm/esm/debug-build.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers.js */ "../../node_modules/@sentry/browser/build/npm/esm/helpers.js");











const PREVIOUS_TRACE_MAX_DURATION = 3600;
const PREVIOUS_TRACE_KEY = "sentry_previous_trace";
const PREVIOUS_TRACE_TMP_SPAN_ATTRIBUTE = "sentry.previous_trace";
function linkTraces(client, {
  linkPreviousTrace,
  consistentTraceSampling
}) {
  const useSessionStorage = linkPreviousTrace === "session-storage";
  let inMemoryPreviousTraceInfo = useSessionStorage ? getPreviousTraceFromSessionStorage() : void 0;
  client.on("spanStart", (span) => {
    if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getRootSpan)(span) !== span) {
      return;
    }
    const oldPropagationContext = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getCurrentScope)().getPropagationContext();
    inMemoryPreviousTraceInfo = addPreviousTraceSpanLink(inMemoryPreviousTraceInfo, span, oldPropagationContext);
    if (useSessionStorage) {
      storePreviousTraceInSessionStorage(inMemoryPreviousTraceInfo);
    }
  });
  let isFirstTraceOnPageload = true;
  if (consistentTraceSampling) {
    client.on("beforeSampling", (mutableSamplingContextData) => {
      if (!inMemoryPreviousTraceInfo) {
        return;
      }
      const scope = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getCurrentScope)();
      const currentPropagationContext = scope.getPropagationContext();
      if (isFirstTraceOnPageload && currentPropagationContext.parentSpanId) {
        isFirstTraceOnPageload = false;
        return;
      }
      scope.setPropagationContext({
        ...currentPropagationContext,
        dsc: {
          ...currentPropagationContext.dsc,
          sample_rate: String(inMemoryPreviousTraceInfo.sampleRate),
          sampled: String(spanContextSampled(inMemoryPreviousTraceInfo.spanContext))
        },
        sampleRand: inMemoryPreviousTraceInfo.sampleRand
      });
      mutableSamplingContextData.parentSampled = spanContextSampled(inMemoryPreviousTraceInfo.spanContext);
      mutableSamplingContextData.parentSampleRate = inMemoryPreviousTraceInfo.sampleRate;
      mutableSamplingContextData.spanAttributes = {
        ...mutableSamplingContextData.spanAttributes,
        [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_PREVIOUS_TRACE_SAMPLE_RATE]: inMemoryPreviousTraceInfo.sampleRate
      };
    });
  }
}
function addPreviousTraceSpanLink(previousTraceInfo, span, oldPropagationContext) {
  const spanJson = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.spanToJSON)(span);
  function getSampleRate() {
    var _a, _b, _c;
    try {
      return (_c = Number((_a = oldPropagationContext.dsc) == null ? void 0 : _a.sample_rate)) != null ? _c : Number((_b = spanJson.data) == null ? void 0 : _b[_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]);
    } catch {
      return 0;
    }
  }
  const updatedPreviousTraceInfo = {
    spanContext: span.spanContext(),
    startTimestamp: spanJson.start_timestamp,
    sampleRate: getSampleRate(),
    sampleRand: oldPropagationContext.sampleRand
  };
  if (!previousTraceInfo) {
    return updatedPreviousTraceInfo;
  }
  const previousTraceSpanCtx = previousTraceInfo.spanContext;
  if (previousTraceSpanCtx.traceId === spanJson.trace_id) {
    return previousTraceInfo;
  }
  if (Date.now() / 1e3 - previousTraceInfo.startTimestamp <= PREVIOUS_TRACE_MAX_DURATION) {
    if (_debug_build_js__WEBPACK_IMPORTED_MODULE_4__.DEBUG_BUILD) {
      _sentry_core__WEBPACK_IMPORTED_MODULE_3__.debug.log(
        `Adding previous_trace ${previousTraceSpanCtx} link to span ${{
          op: spanJson.op,
          ...span.spanContext()
        }}`
      );
    }
    span.addLink({
      context: previousTraceSpanCtx,
      attributes: {
        [_sentry_core__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_LINK_ATTRIBUTE_LINK_TYPE]: "previous_trace"
      }
    });
    span.setAttribute(
      PREVIOUS_TRACE_TMP_SPAN_ATTRIBUTE,
      `${previousTraceSpanCtx.traceId}-${previousTraceSpanCtx.spanId}-${spanContextSampled(previousTraceSpanCtx) ? 1 : 0}`
    );
  }
  return updatedPreviousTraceInfo;
}
function storePreviousTraceInSessionStorage(previousTraceInfo) {
  try {
    _helpers_js__WEBPACK_IMPORTED_MODULE_5__.WINDOW.sessionStorage.setItem(PREVIOUS_TRACE_KEY, JSON.stringify(previousTraceInfo));
  } catch (e) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_4__.DEBUG_BUILD && _sentry_core__WEBPACK_IMPORTED_MODULE_3__.debug.warn("Could not store previous trace in sessionStorage", e);
  }
}
function getPreviousTraceFromSessionStorage() {
  var _a;
  try {
    const previousTraceInfo = (_a = _helpers_js__WEBPACK_IMPORTED_MODULE_5__.WINDOW.sessionStorage) == null ? void 0 : _a.getItem(PREVIOUS_TRACE_KEY);
    return JSON.parse(previousTraceInfo);
  } catch {
    return void 0;
  }
}
function spanContextSampled(ctx) {
  return ctx.traceFlags === 1;
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/tracing/request.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/tracing/request.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultRequestInstrumentationOptions: () => (/* binding */ defaultRequestInstrumentationOptions),
/* harmony export */   instrumentOutgoingRequests: () => (/* binding */ instrumentOutgoingRequests)
/* harmony export */ });
/* unused harmony exports shouldAttachHeaders, xhrCallback */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/tracing/sentryNonRecordingSpan.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/tracing/spanstatus.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/tracing/trace.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/traceData.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/fetch.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/browser.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/instrument/fetch.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/string.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/url.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/instrument.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/instrument/xhr.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../helpers.js */ "../../node_modules/@sentry/browser/build/npm/esm/helpers.js");
/* harmony import */ var _resource_timing_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./resource-timing.js */ "../../node_modules/@sentry/browser/build/npm/esm/tracing/resource-timing.js");




const responseToSpanId = /* @__PURE__ */ new WeakMap();
const spanIdToEndTimestamp = /* @__PURE__ */ new Map();
const defaultRequestInstrumentationOptions = {
  traceFetch: true,
  traceXHR: true,
  enableHTTPTimings: true,
  trackFetchStreamPerformance: false
};
function instrumentOutgoingRequests(client, _options) {
  const {
    traceFetch,
    traceXHR,
    trackFetchStreamPerformance,
    shouldCreateSpanForRequest,
    enableHTTPTimings,
    tracePropagationTargets,
    onRequestSpanStart
  } = {
    ...defaultRequestInstrumentationOptions,
    ..._options
  };
  const shouldCreateSpan = typeof shouldCreateSpanForRequest === "function" ? shouldCreateSpanForRequest : (_) => true;
  const shouldAttachHeadersWithTargets = (url) => shouldAttachHeaders(url, tracePropagationTargets);
  const spans = {};
  if (traceFetch) {
    client.addEventProcessor((event) => {
      if (event.type === "transaction" && event.spans) {
        event.spans.forEach((span) => {
          if (span.op === "http.client") {
            const updatedTimestamp = spanIdToEndTimestamp.get(span.span_id);
            if (updatedTimestamp) {
              span.timestamp = updatedTimestamp / 1e3;
              spanIdToEndTimestamp.delete(span.span_id);
            }
          }
        });
      }
      return event;
    });
    if (trackFetchStreamPerformance) {
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.addFetchEndInstrumentationHandler)((handlerData) => {
        if (handlerData.response) {
          const span = responseToSpanId.get(handlerData.response);
          if (span && handlerData.endTimestamp) {
            spanIdToEndTimestamp.set(span, handlerData.endTimestamp);
          }
        }
      });
    }
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.addFetchInstrumentationHandler)((handlerData) => {
      const createdSpan = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_8__.instrumentFetchRequest)(handlerData, shouldCreateSpan, shouldAttachHeadersWithTargets, spans);
      if (handlerData.response && handlerData.fetchData.__span) {
        responseToSpanId.set(handlerData.response, handlerData.fetchData.__span);
      }
      if (createdSpan) {
        const fullUrl = getFullURL(handlerData.fetchData.url);
        const host = fullUrl ? (0,_sentry_core__WEBPACK_IMPORTED_MODULE_12__.parseUrl)(fullUrl).host : void 0;
        createdSpan.setAttributes({
          "http.url": fullUrl,
          "server.address": host
        });
        if (enableHTTPTimings) {
          addHTTPTimings(createdSpan);
        }
        onRequestSpanStart == null ? void 0 : onRequestSpanStart(createdSpan, { headers: handlerData.headers });
      }
    });
  }
  if (traceXHR) {
    (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_14__.addXhrInstrumentationHandler)((handlerData) => {
      var _a;
      const createdSpan = xhrCallback(handlerData, shouldCreateSpan, shouldAttachHeadersWithTargets, spans);
      if (createdSpan) {
        if (enableHTTPTimings) {
          addHTTPTimings(createdSpan);
        }
        let headers;
        try {
          headers = new Headers((_a = handlerData.xhr.__sentry_xhr_v3__) == null ? void 0 : _a.request_headers);
        } catch {
        }
        onRequestSpanStart == null ? void 0 : onRequestSpanStart(createdSpan, { headers });
      }
    });
  }
}
function isPerformanceResourceTiming(entry) {
  return entry.entryType === "resource" && "initiatorType" in entry && typeof entry.nextHopProtocol === "string" && (entry.initiatorType === "fetch" || entry.initiatorType === "xmlhttprequest");
}
function addHTTPTimings(span) {
  const { url } = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(span).data;
  if (!url || typeof url !== "string") {
    return;
  }
  const cleanup = (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_13__.addPerformanceInstrumentationHandler)("resource", ({ entries }) => {
    entries.forEach((entry) => {
      if (isPerformanceResourceTiming(entry) && entry.name.endsWith(url)) {
        const spanAttributes = (0,_resource_timing_js__WEBPACK_IMPORTED_MODULE_16__.resourceTimingToSpanAttributes)(entry);
        spanAttributes.forEach((attributeArray) => span.setAttribute(...attributeArray));
        setTimeout(cleanup);
      }
    });
  });
}
function shouldAttachHeaders(targetUrl, tracePropagationTargets) {
  const href = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_9__.getLocationHref)();
  if (!href) {
    const isRelativeSameOriginRequest = !!targetUrl.match(/^\/(?!\/)/);
    if (!tracePropagationTargets) {
      return isRelativeSameOriginRequest;
    } else {
      return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_11__.stringMatchesSomePattern)(targetUrl, tracePropagationTargets);
    }
  } else {
    let resolvedUrl;
    let currentOrigin;
    try {
      resolvedUrl = new URL(targetUrl, href);
      currentOrigin = new URL(href).origin;
    } catch {
      return false;
    }
    const isSameOriginRequest = resolvedUrl.origin === currentOrigin;
    if (!tracePropagationTargets) {
      return isSameOriginRequest;
    } else {
      return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_11__.stringMatchesSomePattern)(resolvedUrl.toString(), tracePropagationTargets) || isSameOriginRequest && (0,_sentry_core__WEBPACK_IMPORTED_MODULE_11__.stringMatchesSomePattern)(resolvedUrl.pathname, tracePropagationTargets);
    }
  }
}
function xhrCallback(handlerData, shouldCreateSpan, shouldAttachHeaders2, spans) {
  const xhr = handlerData.xhr;
  const sentryXhrData = xhr == null ? void 0 : xhr[_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_14__.SENTRY_XHR_DATA_KEY];
  if (!xhr || xhr.__sentry_own_request__ || !sentryXhrData) {
    return void 0;
  }
  const { url, method } = sentryXhrData;
  const shouldCreateSpanResult = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.hasSpansEnabled)() && shouldCreateSpan(url);
  if (handlerData.endTimestamp && shouldCreateSpanResult) {
    const spanId = xhr.__sentry_xhr_span_id__;
    if (!spanId) return;
    const span2 = spans[spanId];
    if (span2 && sentryXhrData.status_code !== void 0) {
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.setHttpStatus)(span2, sentryXhrData.status_code);
      span2.end();
      delete spans[spanId];
    }
    return void 0;
  }
  const fullUrl = getFullURL(url);
  const parsedUrl = fullUrl ? (0,_sentry_core__WEBPACK_IMPORTED_MODULE_12__.parseUrl)(fullUrl) : (0,_sentry_core__WEBPACK_IMPORTED_MODULE_12__.parseUrl)(url);
  const urlForSpanName = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_12__.stripUrlQueryAndFragment)(url);
  const hasParent = !!(0,_sentry_core__WEBPACK_IMPORTED_MODULE_6__.getActiveSpan)();
  const span = shouldCreateSpanResult && hasParent ? (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.startInactiveSpan)({
    name: `${method} ${urlForSpanName}`,
    attributes: {
      url,
      type: "xhr",
      "http.method": method,
      "http.url": fullUrl,
      "server.address": parsedUrl == null ? void 0 : parsedUrl.host,
      [_sentry_core__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.browser",
      [_sentry_core__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_OP]: "http.client",
      ...(parsedUrl == null ? void 0 : parsedUrl.search) && { "http.query": parsedUrl == null ? void 0 : parsedUrl.search },
      ...(parsedUrl == null ? void 0 : parsedUrl.hash) && { "http.fragment": parsedUrl == null ? void 0 : parsedUrl.hash }
    }
  }) : new _sentry_core__WEBPACK_IMPORTED_MODULE_0__.SentryNonRecordingSpan();
  xhr.__sentry_xhr_span_id__ = span.spanContext().spanId;
  spans[xhr.__sentry_xhr_span_id__] = span;
  if (shouldAttachHeaders2(url)) {
    addTracingHeadersToXhrRequest(
      xhr,
      // If performance is disabled (TWP) or there's no active root span (pageload/navigation/interaction),
      // we do not want to use the span as base for the trace headers,
      // which means that the headers will be generated from the scope and the sampling decision is deferred
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.hasSpansEnabled)() && hasParent ? span : void 0
    );
  }
  const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getClient)();
  if (client) {
    client.emit("beforeOutgoingRequestSpan", span, handlerData);
  }
  return span;
}
function addTracingHeadersToXhrRequest(xhr, span) {
  const { "sentry-trace": sentryTrace, baggage } = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_7__.getTraceData)({ span });
  if (sentryTrace) {
    setHeaderOnXhr(xhr, sentryTrace, baggage);
  }
}
function setHeaderOnXhr(xhr, sentryTraceHeader, sentryBaggageHeader) {
  var _a;
  const originalHeaders = (_a = xhr.__sentry_xhr_v3__) == null ? void 0 : _a.request_headers;
  if (originalHeaders == null ? void 0 : originalHeaders["sentry-trace"]) {
    return;
  }
  try {
    xhr.setRequestHeader("sentry-trace", sentryTraceHeader);
    if (sentryBaggageHeader) {
      const originalBaggageHeader = originalHeaders == null ? void 0 : originalHeaders["baggage"];
      if (!originalBaggageHeader || !baggageHeaderHasSentryValues(originalBaggageHeader)) {
        xhr.setRequestHeader("baggage", sentryBaggageHeader);
      }
    }
  } catch {
  }
}
function baggageHeaderHasSentryValues(baggageHeader) {
  return baggageHeader.split(",").some((value) => value.trim().startsWith("sentry-"));
}
function getFullURL(url) {
  try {
    const parsed = new URL(url, _helpers_js__WEBPACK_IMPORTED_MODULE_15__.WINDOW.location.origin);
    return parsed.href;
  } catch {
    return void 0;
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/tracing/resource-timing.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/tracing/resource-timing.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resourceTimingToSpanAttributes: () => (/* binding */ resourceTimingToSpanAttributes)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/metrics/utils.js");


function getAbsoluteTime(time = 0) {
  return (((0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.browserPerformanceTimeOrigin)() || performance.timeOrigin) + time) / 1e3;
}
function resourceTimingToSpanAttributes(resourceTiming) {
  const timingSpanData = [];
  if (resourceTiming.nextHopProtocol != void 0) {
    const { name, version } = (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_1__.extractNetworkProtocol)(resourceTiming.nextHopProtocol);
    timingSpanData.push(["network.protocol.version", version], ["network.protocol.name", name]);
  }
  if (!(0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.browserPerformanceTimeOrigin)()) {
    return timingSpanData;
  }
  return [
    ...timingSpanData,
    ["http.request.redirect_start", getAbsoluteTime(resourceTiming.redirectStart)],
    ["http.request.fetch_start", getAbsoluteTime(resourceTiming.fetchStart)],
    ["http.request.domain_lookup_start", getAbsoluteTime(resourceTiming.domainLookupStart)],
    ["http.request.domain_lookup_end", getAbsoluteTime(resourceTiming.domainLookupEnd)],
    ["http.request.connect_start", getAbsoluteTime(resourceTiming.connectStart)],
    ["http.request.secure_connection_start", getAbsoluteTime(resourceTiming.secureConnectionStart)],
    ["http.request.connection_end", getAbsoluteTime(resourceTiming.connectEnd)],
    ["http.request.request_start", getAbsoluteTime(resourceTiming.requestStart)],
    ["http.request.response_start", getAbsoluteTime(resourceTiming.responseStart)],
    ["http.request.response_end", getAbsoluteTime(resourceTiming.responseEnd)]
  ];
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/transports/fetch.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/transports/fetch.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeFetchTransport: () => (/* binding */ makeFetchTransport)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/transports/base.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/syncpromise.js");
/* harmony import */ var _sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry-internal/browser-utils */ "../../node_modules/@sentry-internal/browser-utils/build/esm/getNativeImplementation.js");


function makeFetchTransport(options, nativeFetch = (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_2__.getNativeImplementation)("fetch")) {
  let pendingBodySize = 0;
  let pendingCount = 0;
  function makeRequest(request) {
    const requestSize = request.body.length;
    pendingBodySize += requestSize;
    pendingCount++;
    const requestOptions = {
      body: request.body,
      method: "POST",
      referrerPolicy: "strict-origin",
      headers: options.headers,
      // Outgoing requests are usually cancelled when navigating to a different page, causing a "TypeError: Failed to
      // fetch" error and sending a "network_error" client-outcome - in Chrome, the request status shows "(cancelled)".
      // The `keepalive` flag keeps outgoing requests alive, even when switching pages. We want this since we're
      // frequently sending events right before the user is switching pages (eg. when finishing navigation transactions).
      // Gotchas:
      // - `keepalive` isn't supported by Firefox
      // - As per spec (https://fetch.spec.whatwg.org/#http-network-or-cache-fetch):
      //   If the sum of contentLength and inflightKeepaliveBytes is greater than 64 kibibytes, then return a network error.
      //   We will therefore only activate the flag when we're below that limit.
      // There is also a limit of requests that can be open at the same time, so we also limit this to 15
      // See https://github.com/getsentry/sentry-javascript/pull/7553 for details
      keepalive: pendingBodySize <= 6e4 && pendingCount < 15,
      ...options.fetchOptions
    };
    if (!nativeFetch) {
      (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_2__.clearCachedImplementation)("fetch");
      return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.rejectedSyncPromise)("No fetch implementation available");
    }
    try {
      return nativeFetch(options.url, requestOptions).then((response) => {
        pendingBodySize -= requestSize;
        pendingCount--;
        return {
          statusCode: response.status,
          headers: {
            "x-sentry-rate-limits": response.headers.get("X-Sentry-Rate-Limits"),
            "retry-after": response.headers.get("Retry-After")
          }
        };
      });
    } catch (e) {
      (0,_sentry_internal_browser_utils__WEBPACK_IMPORTED_MODULE_2__.clearCachedImplementation)("fetch");
      pendingBodySize -= requestSize;
      pendingCount--;
      return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.rejectedSyncPromise)(e);
    }
  }
  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.createTransport)(options, makeRequest);
}



/***/ }),

/***/ "../../node_modules/@sentry/browser/build/npm/esm/utils/detectBrowserExtension.js":
/*!****************************************************************************************!*\
  !*** ../../node_modules/@sentry/browser/build/npm/esm/utils/detectBrowserExtension.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkAndWarnIfIsEmbeddedBrowserExtension: () => (/* binding */ checkAndWarnIfIsEmbeddedBrowserExtension)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/browser.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/browser/build/npm/esm/debug-build.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers.js */ "../../node_modules/@sentry/browser/build/npm/esm/helpers.js");



function checkAndWarnIfIsEmbeddedBrowserExtension() {
  if (_isEmbeddedBrowserExtension()) {
    if (_debug_build_js__WEBPACK_IMPORTED_MODULE_2__.DEBUG_BUILD) {
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.consoleSandbox)(() => {
        console.error(
          "[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/"
        );
      });
    }
    return true;
  }
  return false;
}
function _isEmbeddedBrowserExtension() {
  var _a;
  if (typeof _helpers_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.window === "undefined") {
    return false;
  }
  const _window = _helpers_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW;
  if (_window.nw) {
    return false;
  }
  const extensionObject = _window["chrome"] || _window["browser"];
  if (!((_a = extensionObject == null ? void 0 : extensionObject.runtime) == null ? void 0 : _a.id)) {
    return false;
  }
  const href = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.getLocationHref)();
  const extensionProtocols = ["chrome-extension", "moz-extension", "ms-browser-extension", "safari-web-extension"];
  const isDedicatedExtensionPage = _helpers_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW === _helpers_js__WEBPACK_IMPORTED_MODULE_3__.WINDOW.top && extensionProtocols.some((protocol) => href.startsWith(`${protocol}://`));
  return !isDedicatedExtensionPage;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/api.js":
/*!********************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/api.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEnvelopeEndpointWithUrlEncodedAuth: () => (/* binding */ getEnvelopeEndpointWithUrlEncodedAuth)
/* harmony export */ });
/* unused harmony export getReportDialogEndpoint */
/* harmony import */ var _utils_dsn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/dsn.js */ "../../node_modules/@sentry/core/build/esm/utils/dsn.js");

const SENTRY_API_VERSION = "7";
function getBaseApiEndpoint(dsn) {
  const protocol = dsn.protocol ? `${dsn.protocol}:` : "";
  const port = dsn.port ? `:${dsn.port}` : "";
  return `${protocol}//${dsn.host}${port}${dsn.path ? `/${dsn.path}` : ""}/api/`;
}
function _getIngestEndpoint(dsn) {
  return `${getBaseApiEndpoint(dsn)}${dsn.projectId}/envelope/`;
}
function _encodedAuth(dsn, sdkInfo) {
  const params = {
    sentry_version: SENTRY_API_VERSION
  };
  if (dsn.publicKey) {
    params.sentry_key = dsn.publicKey;
  }
  if (sdkInfo) {
    params.sentry_client = `${sdkInfo.name}/${sdkInfo.version}`;
  }
  return new URLSearchParams(params).toString();
}
function getEnvelopeEndpointWithUrlEncodedAuth(dsn, tunnel, sdkInfo) {
  return tunnel ? tunnel : `${_getIngestEndpoint(dsn)}?${_encodedAuth(dsn, sdkInfo)}`;
}
function getReportDialogEndpoint(dsnLike, dialogOptions) {
  const dsn = (0,_utils_dsn_js__WEBPACK_IMPORTED_MODULE_0__.makeDsn)(dsnLike);
  if (!dsn) {
    return "";
  }
  const endpoint = `${getBaseApiEndpoint(dsn)}embed/error-page/`;
  let encodedOptions = `dsn=${(0,_utils_dsn_js__WEBPACK_IMPORTED_MODULE_0__.dsnToString)(dsn)}`;
  for (const key in dialogOptions) {
    if (key === "dsn") {
      continue;
    }
    if (key === "onClose") {
      continue;
    }
    if (key === "user") {
      const user = dialogOptions.user;
      if (!user) {
        continue;
      }
      if (user.name) {
        encodedOptions += `&name=${encodeURIComponent(user.name)}`;
      }
      if (user.email) {
        encodedOptions += `&email=${encodeURIComponent(user.email)}`;
      }
    } else {
      encodedOptions += `&${encodeURIComponent(key)}=${encodeURIComponent(dialogOptions[key])}`;
    }
  }
  return `${endpoint}?${encodedOptions}`;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/asyncContext/index.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/asyncContext/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAsyncContextStrategy: () => (/* binding */ getAsyncContextStrategy)
/* harmony export */ });
/* unused harmony export setAsyncContextStrategy */
/* harmony import */ var _carrier_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../carrier.js */ "../../node_modules/@sentry/core/build/esm/carrier.js");
/* harmony import */ var _stackStrategy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stackStrategy.js */ "../../node_modules/@sentry/core/build/esm/asyncContext/stackStrategy.js");


function setAsyncContextStrategy(strategy) {
  const registry = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_0__.getMainCarrier)();
  const sentry = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_0__.getSentryCarrier)(registry);
  sentry.acs = strategy;
}
function getAsyncContextStrategy(carrier) {
  const sentry = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_0__.getSentryCarrier)(carrier);
  if (sentry.acs) {
    return sentry.acs;
  }
  return (0,_stackStrategy_js__WEBPACK_IMPORTED_MODULE_1__.getStackAsyncContextStrategy)();
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/asyncContext/stackStrategy.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/asyncContext/stackStrategy.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getStackAsyncContextStrategy: () => (/* binding */ getStackAsyncContextStrategy)
/* harmony export */ });
/* unused harmony export AsyncContextStack */
/* harmony import */ var _defaultScopes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../defaultScopes.js */ "../../node_modules/@sentry/core/build/esm/defaultScopes.js");
/* harmony import */ var _scope_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scope.js */ "../../node_modules/@sentry/core/build/esm/scope.js");
/* harmony import */ var _utils_is_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _carrier_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../carrier.js */ "../../node_modules/@sentry/core/build/esm/carrier.js");




class AsyncContextStack {
  constructor(scope, isolationScope) {
    let assignedScope;
    if (!scope) {
      assignedScope = new _scope_js__WEBPACK_IMPORTED_MODULE_1__.Scope();
    } else {
      assignedScope = scope;
    }
    let assignedIsolationScope;
    if (!isolationScope) {
      assignedIsolationScope = new _scope_js__WEBPACK_IMPORTED_MODULE_1__.Scope();
    } else {
      assignedIsolationScope = isolationScope;
    }
    this._stack = [{ scope: assignedScope }];
    this._isolationScope = assignedIsolationScope;
  }
  /**
   * Fork a scope for the stack.
   */
  withScope(callback) {
    const scope = this._pushScope();
    let maybePromiseResult;
    try {
      maybePromiseResult = callback(scope);
    } catch (e) {
      this._popScope();
      throw e;
    }
    if ((0,_utils_is_js__WEBPACK_IMPORTED_MODULE_2__.isThenable)(maybePromiseResult)) {
      return maybePromiseResult.then(
        (res) => {
          this._popScope();
          return res;
        },
        (e) => {
          this._popScope();
          throw e;
        }
      );
    }
    this._popScope();
    return maybePromiseResult;
  }
  /**
   * Get the client of the stack.
   */
  getClient() {
    return this.getStackTop().client;
  }
  /**
   * Returns the scope of the top stack.
   */
  getScope() {
    return this.getStackTop().scope;
  }
  /**
   * Get the isolation scope for the stack.
   */
  getIsolationScope() {
    return this._isolationScope;
  }
  /**
   * Returns the topmost scope layer in the order domain > local > process.
   */
  getStackTop() {
    return this._stack[this._stack.length - 1];
  }
  /**
   * Push a scope to the stack.
   */
  _pushScope() {
    const scope = this.getScope().clone();
    this._stack.push({
      client: this.getClient(),
      scope
    });
    return scope;
  }
  /**
   * Pop a scope from the stack.
   */
  _popScope() {
    if (this._stack.length <= 1) return false;
    return !!this._stack.pop();
  }
}
function getAsyncContextStack() {
  const registry = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_3__.getMainCarrier)();
  const sentry = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_3__.getSentryCarrier)(registry);
  return sentry.stack = sentry.stack || new AsyncContextStack((0,_defaultScopes_js__WEBPACK_IMPORTED_MODULE_0__.getDefaultCurrentScope)(), (0,_defaultScopes_js__WEBPACK_IMPORTED_MODULE_0__.getDefaultIsolationScope)());
}
function withScope(callback) {
  return getAsyncContextStack().withScope(callback);
}
function withSetScope(scope, callback) {
  const stack = getAsyncContextStack();
  return stack.withScope(() => {
    stack.getStackTop().scope = scope;
    return callback(scope);
  });
}
function withIsolationScope(callback) {
  return getAsyncContextStack().withScope(() => {
    return callback(getAsyncContextStack().getIsolationScope());
  });
}
function getStackAsyncContextStrategy() {
  return {
    withIsolationScope,
    withScope,
    withSetScope,
    withSetIsolationScope: (_isolationScope, callback) => {
      return withIsolationScope(callback);
    },
    getCurrentScope: () => getAsyncContextStack().getScope(),
    getIsolationScope: () => getAsyncContextStack().getIsolationScope()
  };
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/breadcrumbs.js":
/*!****************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/breadcrumbs.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addBreadcrumb: () => (/* binding */ addBreadcrumb)
/* harmony export */ });
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_time_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/time.js */ "../../node_modules/@sentry/core/build/esm/utils/time.js");



const DEFAULT_BREADCRUMBS = 100;
function addBreadcrumb(breadcrumb, hint) {
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)();
  const isolationScope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getIsolationScope)();
  if (!client) return;
  const { beforeBreadcrumb = null, maxBreadcrumbs = DEFAULT_BREADCRUMBS } = client.getOptions();
  if (maxBreadcrumbs <= 0) return;
  const timestamp = (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_2__.dateTimestampInSeconds)();
  const mergedBreadcrumb = { timestamp, ...breadcrumb };
  const finalBreadcrumb = beforeBreadcrumb ? (0,_utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.consoleSandbox)(() => beforeBreadcrumb(mergedBreadcrumb, hint)) : mergedBreadcrumb;
  if (finalBreadcrumb === null) return;
  if (client.emit) {
    client.emit("beforeAddBreadcrumb", finalBreadcrumb, hint);
  }
  isolationScope.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/carrier.js":
/*!************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/carrier.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getGlobalSingleton: () => (/* binding */ getGlobalSingleton),
/* harmony export */   getMainCarrier: () => (/* binding */ getMainCarrier),
/* harmony export */   getSentryCarrier: () => (/* binding */ getSentryCarrier)
/* harmony export */ });
/* harmony import */ var _utils_version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/version.js */ "../../node_modules/@sentry/core/build/esm/utils/version.js");
/* harmony import */ var _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");


function getMainCarrier() {
  getSentryCarrier(_utils_worldwide_js__WEBPACK_IMPORTED_MODULE_1__.GLOBAL_OBJ);
  return _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_1__.GLOBAL_OBJ;
}
function getSentryCarrier(carrier) {
  const __SENTRY__ = carrier.__SENTRY__ = carrier.__SENTRY__ || {};
  __SENTRY__.version = __SENTRY__.version || _utils_version_js__WEBPACK_IMPORTED_MODULE_0__.SDK_VERSION;
  return __SENTRY__[_utils_version_js__WEBPACK_IMPORTED_MODULE_0__.SDK_VERSION] = __SENTRY__[_utils_version_js__WEBPACK_IMPORTED_MODULE_0__.SDK_VERSION] || {};
}
function getGlobalSingleton(name, creator, obj = _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_1__.GLOBAL_OBJ) {
  const __SENTRY__ = obj.__SENTRY__ = obj.__SENTRY__ || {};
  const carrier = __SENTRY__[_utils_version_js__WEBPACK_IMPORTED_MODULE_0__.SDK_VERSION] = __SENTRY__[_utils_version_js__WEBPACK_IMPORTED_MODULE_0__.SDK_VERSION] || {};
  return carrier[name] || (carrier[name] = creator());
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/client.js":
/*!***********************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/client.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Client: () => (/* binding */ Client),
/* harmony export */   _getTraceInfoFromScope: () => (/* binding */ _getTraceInfoFromScope)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "../../node_modules/@sentry/core/build/esm/api.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "../../node_modules/@sentry/core/build/esm/constants.js");
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _envelope_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./envelope.js */ "../../node_modules/@sentry/core/build/esm/envelope.js");
/* harmony import */ var _integration_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./integration.js */ "../../node_modules/@sentry/core/build/esm/integration.js");
/* harmony import */ var _session_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./session.js */ "../../node_modules/@sentry/core/build/esm/session.js");
/* harmony import */ var _tracing_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tracing/dynamicSamplingContext.js */ "../../node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js");
/* harmony import */ var _utils_clientreport_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/clientreport.js */ "../../node_modules/@sentry/core/build/esm/utils/clientreport.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_dsn_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/dsn.js */ "../../node_modules/@sentry/core/build/esm/utils/dsn.js");
/* harmony import */ var _utils_envelope_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/envelope.js */ "../../node_modules/@sentry/core/build/esm/utils/envelope.js");
/* harmony import */ var _utils_eventUtils_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/eventUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/eventUtils.js");
/* harmony import */ var _utils_is_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _utils_merge_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils/merge.js */ "../../node_modules/@sentry/core/build/esm/utils/merge.js");
/* harmony import */ var _utils_misc_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils/misc.js */ "../../node_modules/@sentry/core/build/esm/utils/misc.js");
/* harmony import */ var _utils_parseSampleRate_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils/parseSampleRate.js */ "../../node_modules/@sentry/core/build/esm/utils/parseSampleRate.js");
/* harmony import */ var _utils_prepareEvent_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./utils/prepareEvent.js */ "../../node_modules/@sentry/core/build/esm/utils/prepareEvent.js");
/* harmony import */ var _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./utils/spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _utils_syncpromise_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./utils/syncpromise.js */ "../../node_modules/@sentry/core/build/esm/utils/syncpromise.js");
/* harmony import */ var _utils_transactionEvent_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./utils/transactionEvent.js */ "../../node_modules/@sentry/core/build/esm/utils/transactionEvent.js");





















const ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.";
const MISSING_RELEASE_FOR_SESSION_ERROR = "Discarded session because of missing or non-string release";
const INTERNAL_ERROR_SYMBOL = Symbol.for("SentryInternalError");
const DO_NOT_SEND_EVENT_SYMBOL = Symbol.for("SentryDoNotSendEventError");
function _makeInternalError(message) {
  return {
    message,
    [INTERNAL_ERROR_SYMBOL]: true
  };
}
function _makeDoNotSendEventError(message) {
  return {
    message,
    [DO_NOT_SEND_EVENT_SYMBOL]: true
  };
}
function _isInternalError(error) {
  return !!error && typeof error === "object" && INTERNAL_ERROR_SYMBOL in error;
}
function _isDoNotSendEventError(error) {
  return !!error && typeof error === "object" && DO_NOT_SEND_EVENT_SYMBOL in error;
}
class Client {
  /** Options passed to the SDK. */
  /** The client Dsn, if specified in options. Without this Dsn, the SDK will be disabled. */
  /** Array of set up integrations. */
  /** Number of calls being processed */
  /** Holds flushable  */
  // eslint-disable-next-line @typescript-eslint/ban-types
  /**
   * Initializes this client instance.
   *
   * @param options Options for the client.
   */
  constructor(options) {
    this._options = options;
    this._integrations = {};
    this._numProcessing = 0;
    this._outcomes = {};
    this._hooks = {};
    this._eventProcessors = [];
    if (options.dsn) {
      this._dsn = (0,_utils_dsn_js__WEBPACK_IMPORTED_MODULE_10__.makeDsn)(options.dsn);
    } else {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.warn("No DSN provided, client will not send events.");
    }
    if (this._dsn) {
      const url = (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getEnvelopeEndpointWithUrlEncodedAuth)(
        this._dsn,
        options.tunnel,
        options._metadata ? options._metadata.sdk : void 0
      );
      this._transport = options.transport({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this),
        ...options.transportOptions,
        url
      });
    }
  }
  /**
   * Captures an exception event and sends it to Sentry.
   *
   * Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureException(exception, hint, scope) {
    const eventId = (0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_15__.uuid4)();
    if ((0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_15__.checkOrSetAlreadyCaught)(exception)) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.log(ALREADY_SEEN_ERROR);
      return eventId;
    }
    const hintWithEventId = {
      event_id: eventId,
      ...hint
    };
    this._process(
      this.eventFromException(exception, hintWithEventId).then(
        (event) => this._captureEvent(event, hintWithEventId, scope)
      )
    );
    return hintWithEventId.event_id;
  }
  /**
   * Captures a message event and sends it to Sentry.
   *
   * Unlike `captureMessage` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureMessage(message, level, hint, currentScope) {
    const hintWithEventId = {
      event_id: (0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_15__.uuid4)(),
      ...hint
    };
    const eventMessage = (0,_utils_is_js__WEBPACK_IMPORTED_MODULE_13__.isParameterizedString)(message) ? message : String(message);
    const promisedEvent = (0,_utils_is_js__WEBPACK_IMPORTED_MODULE_13__.isPrimitive)(message) ? this.eventFromMessage(eventMessage, level, hintWithEventId) : this.eventFromException(message, hintWithEventId);
    this._process(promisedEvent.then((event) => this._captureEvent(event, hintWithEventId, currentScope)));
    return hintWithEventId.event_id;
  }
  /**
   * Captures a manually created event and sends it to Sentry.
   *
   * Unlike `captureEvent` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureEvent(event, hint, currentScope) {
    const eventId = (0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_15__.uuid4)();
    if ((hint == null ? void 0 : hint.originalException) && (0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_15__.checkOrSetAlreadyCaught)(hint.originalException)) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.log(ALREADY_SEEN_ERROR);
      return eventId;
    }
    const hintWithEventId = {
      event_id: eventId,
      ...hint
    };
    const sdkProcessingMetadata = event.sdkProcessingMetadata || {};
    const capturedSpanScope = sdkProcessingMetadata.capturedSpanScope;
    const capturedSpanIsolationScope = sdkProcessingMetadata.capturedSpanIsolationScope;
    this._process(
      this._captureEvent(event, hintWithEventId, capturedSpanScope || currentScope, capturedSpanIsolationScope)
    );
    return hintWithEventId.event_id;
  }
  /**
   * Captures a session.
   */
  captureSession(session) {
    this.sendSession(session);
    (0,_session_js__WEBPACK_IMPORTED_MODULE_6__.updateSession)(session, { init: false });
  }
  /**
   * Create a cron monitor check in and send it to Sentry. This method is not available on all clients.
   *
   * @param checkIn An object that describes a check in.
   * @param upsertMonitorConfig An optional object that describes a monitor config. Use this if you want
   * to create a monitor automatically when sending a check in.
   * @param scope An optional scope containing event metadata.
   * @returns A string representing the id of the check in.
   */
  /**
   * Get the current Dsn.
   */
  getDsn() {
    return this._dsn;
  }
  /**
   * Get the current options.
   */
  getOptions() {
    return this._options;
  }
  /**
   * Get the SDK metadata.
   * @see SdkMetadata
   */
  getSdkMetadata() {
    return this._options._metadata;
  }
  /**
   * Returns the transport that is used by the client.
   * Please note that the transport gets lazy initialized so it will only be there once the first event has been sent.
   */
  getTransport() {
    return this._transport;
  }
  /**
   * Wait for all events to be sent or the timeout to expire, whichever comes first.
   *
   * @param timeout Maximum time in ms the client should wait for events to be flushed. Omitting this parameter will
   *   cause the client to wait until all events are sent before resolving the promise.
   * @returns A promise that will resolve with `true` if all events are sent before the timeout, or `false` if there are
   * still events in the queue when the timeout is reached.
   */
  flush(timeout) {
    const transport = this._transport;
    if (transport) {
      this.emit("flush");
      return this._isClientDoneProcessing(timeout).then((clientFinished) => {
        return transport.flush(timeout).then((transportFlushed) => clientFinished && transportFlushed);
      });
    } else {
      return (0,_utils_syncpromise_js__WEBPACK_IMPORTED_MODULE_19__.resolvedSyncPromise)(true);
    }
  }
  /**
   * Flush the event queue and set the client to `enabled = false`. See {@link Client.flush}.
   *
   * @param {number} timeout Maximum time in ms the client should wait before shutting down. Omitting this parameter will cause
   *   the client to wait until all events are sent before disabling itself.
   * @returns {Promise<boolean>} A promise which resolves to `true` if the flush completes successfully before the timeout, or `false` if
   * it doesn't.
   */
  close(timeout) {
    return this.flush(timeout).then((result) => {
      this.getOptions().enabled = false;
      this.emit("close");
      return result;
    });
  }
  /**
   * Get all installed event processors.
   */
  getEventProcessors() {
    return this._eventProcessors;
  }
  /**
   * Adds an event processor that applies to any event processed by this client.
   */
  addEventProcessor(eventProcessor) {
    this._eventProcessors.push(eventProcessor);
  }
  /**
   * Initialize this client.
   * Call this after the client was set on a scope.
   */
  init() {
    if (this._isEnabled() || // Force integrations to be setup even if no DSN was set when we have
    // Spotlight enabled. This is particularly important for browser as we
    // don't support the `spotlight` option there and rely on the users
    // adding the `spotlightBrowserIntegration()` to their integrations which
    // wouldn't get initialized with the check below when there's no DSN set.
    this._options.integrations.some(({ name }) => name.startsWith("Spotlight"))) {
      this._setupIntegrations();
    }
  }
  /**
   * Gets an installed integration by its name.
   *
   * @returns {Integration|undefined} The installed integration or `undefined` if no integration with that `name` was installed.
   */
  getIntegrationByName(integrationName) {
    return this._integrations[integrationName];
  }
  /**
   * Add an integration to the client.
   * This can be used to e.g. lazy load integrations.
   * In most cases, this should not be necessary,
   * and you're better off just passing the integrations via `integrations: []` at initialization time.
   * However, if you find the need to conditionally load & add an integration, you can use `addIntegration` to do so.
   */
  addIntegration(integration) {
    const isAlreadyInstalled = this._integrations[integration.name];
    (0,_integration_js__WEBPACK_IMPORTED_MODULE_5__.setupIntegration)(this, integration, this._integrations);
    if (!isAlreadyInstalled) {
      (0,_integration_js__WEBPACK_IMPORTED_MODULE_5__.afterSetupIntegrations)(this, [integration]);
    }
  }
  /**
   * Send a fully prepared event to Sentry.
   */
  sendEvent(event, hint = {}) {
    this.emit("beforeSendEvent", event, hint);
    let env = (0,_envelope_js__WEBPACK_IMPORTED_MODULE_4__.createEventEnvelope)(event, this._dsn, this._options._metadata, this._options.tunnel);
    for (const attachment of hint.attachments || []) {
      env = (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_11__.addItemToEnvelope)(env, (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_11__.createAttachmentEnvelopeItem)(attachment));
    }
    const promise = this.sendEnvelope(env);
    if (promise) {
      promise.then((sendResponse) => this.emit("afterSendEvent", event, sendResponse), null);
    }
  }
  /**
   * Send a session or session aggregrates to Sentry.
   */
  sendSession(session) {
    const { release: clientReleaseOption, environment: clientEnvironmentOption = _constants_js__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_ENVIRONMENT } = this._options;
    if ("aggregates" in session) {
      const sessionAttrs = session.attrs || {};
      if (!sessionAttrs.release && !clientReleaseOption) {
        _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.warn(MISSING_RELEASE_FOR_SESSION_ERROR);
        return;
      }
      sessionAttrs.release = sessionAttrs.release || clientReleaseOption;
      sessionAttrs.environment = sessionAttrs.environment || clientEnvironmentOption;
      session.attrs = sessionAttrs;
    } else {
      if (!session.release && !clientReleaseOption) {
        _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.warn(MISSING_RELEASE_FOR_SESSION_ERROR);
        return;
      }
      session.release = session.release || clientReleaseOption;
      session.environment = session.environment || clientEnvironmentOption;
    }
    this.emit("beforeSendSession", session);
    const env = (0,_envelope_js__WEBPACK_IMPORTED_MODULE_4__.createSessionEnvelope)(session, this._dsn, this._options._metadata, this._options.tunnel);
    this.sendEnvelope(env);
  }
  /**
   * Record on the client that an event got dropped (ie, an event that will not be sent to Sentry).
   */
  recordDroppedEvent(reason, category, count = 1) {
    if (this._options.sendClientReports) {
      const key = `${reason}:${category}`;
      _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.log(`Recording outcome: "${key}"${count > 1 ? ` (${count} times)` : ""}`);
      this._outcomes[key] = (this._outcomes[key] || 0) + count;
    }
  }
  /* eslint-disable @typescript-eslint/unified-signatures */
  /**
   * Register a callback for whenever a span is started.
   * Receives the span as argument.
   * @returns {() => void} A function that, when executed, removes the registered callback.
   */
  /**
   * Register a hook on this client.
   */
  on(hook, callback) {
    const hooks = this._hooks[hook] = this._hooks[hook] || [];
    hooks.push(callback);
    return () => {
      const cbIndex = hooks.indexOf(callback);
      if (cbIndex > -1) {
        hooks.splice(cbIndex, 1);
      }
    };
  }
  /** Fire a hook whenever a span starts. */
  /**
   * Emit a hook that was previously registered via `on()`.
   */
  emit(hook, ...rest) {
    const callbacks = this._hooks[hook];
    if (callbacks) {
      callbacks.forEach((callback) => callback(...rest));
    }
  }
  /**
   * Send an envelope to Sentry.
   */
  sendEnvelope(envelope) {
    this.emit("beforeEnvelope", envelope);
    if (this._isEnabled() && this._transport) {
      return this._transport.send(envelope).then(null, (reason) => {
        _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.error("Error while sending envelope:", reason);
        return reason;
      });
    }
    _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.error("Transport disabled");
    return (0,_utils_syncpromise_js__WEBPACK_IMPORTED_MODULE_19__.resolvedSyncPromise)({});
  }
  /* eslint-enable @typescript-eslint/unified-signatures */
  /** Setup integrations for this client. */
  _setupIntegrations() {
    const { integrations } = this._options;
    this._integrations = (0,_integration_js__WEBPACK_IMPORTED_MODULE_5__.setupIntegrations)(this, integrations);
    (0,_integration_js__WEBPACK_IMPORTED_MODULE_5__.afterSetupIntegrations)(this, integrations);
  }
  /** Updates existing session based on the provided event */
  _updateSessionFromEvent(session, event) {
    var _a;
    let crashed = event.level === "fatal";
    let errored = false;
    const exceptions = (_a = event.exception) == null ? void 0 : _a.values;
    if (exceptions) {
      errored = true;
      for (const ex of exceptions) {
        const mechanism = ex.mechanism;
        if ((mechanism == null ? void 0 : mechanism.handled) === false) {
          crashed = true;
          break;
        }
      }
    }
    const sessionNonTerminal = session.status === "ok";
    const shouldUpdateAndSend = sessionNonTerminal && session.errors === 0 || sessionNonTerminal && crashed;
    if (shouldUpdateAndSend) {
      (0,_session_js__WEBPACK_IMPORTED_MODULE_6__.updateSession)(session, {
        ...crashed && { status: "crashed" },
        errors: session.errors || Number(errored || crashed)
      });
      this.captureSession(session);
    }
  }
  /**
   * Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
   * "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
   *
   * @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
   * passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
   * `true`.
   * @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
   * `false` otherwise
   */
  _isClientDoneProcessing(timeout) {
    return new _utils_syncpromise_js__WEBPACK_IMPORTED_MODULE_19__.SyncPromise((resolve) => {
      let ticked = 0;
      const tick = 1;
      const interval = setInterval(() => {
        if (this._numProcessing == 0) {
          clearInterval(interval);
          resolve(true);
        } else {
          ticked += tick;
          if (timeout && ticked >= timeout) {
            clearInterval(interval);
            resolve(false);
          }
        }
      }, tick);
    });
  }
  /** Determines whether this SDK is enabled and a transport is present. */
  _isEnabled() {
    return this.getOptions().enabled !== false && this._transport !== void 0;
  }
  /**
   * Adds common information to events.
   *
   * The information includes release and environment from `options`,
   * breadcrumbs and context (extra, tags and user) from the scope.
   *
   * Information that is already present in the event is never overwritten. For
   * nested objects, such as the context, keys are merged.
   *
   * @param event The original event.
   * @param hint May contain additional information about the original exception.
   * @param currentScope A scope containing event metadata.
   * @returns A new event with more information.
   */
  _prepareEvent(event, hint, currentScope, isolationScope) {
    const options = this.getOptions();
    const integrations = Object.keys(this._integrations);
    if (!hint.integrations && (integrations == null ? void 0 : integrations.length)) {
      hint.integrations = integrations;
    }
    this.emit("preprocessEvent", event, hint);
    if (!event.type) {
      isolationScope.setLastEventId(event.event_id || hint.event_id);
    }
    return (0,_utils_prepareEvent_js__WEBPACK_IMPORTED_MODULE_17__.prepareEvent)(options, event, hint, currentScope, this, isolationScope).then((evt) => {
      if (evt === null) {
        return evt;
      }
      this.emit("postprocessEvent", evt, hint);
      evt.contexts = {
        trace: (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getTraceContextFromScope)(currentScope),
        ...evt.contexts
      };
      const dynamicSamplingContext = (0,_tracing_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_7__.getDynamicSamplingContextFromScope)(this, currentScope);
      evt.sdkProcessingMetadata = {
        dynamicSamplingContext,
        ...evt.sdkProcessingMetadata
      };
      return evt;
    });
  }
  /**
   * Processes the event and logs an error in case of rejection
   * @param event
   * @param hint
   * @param scope
   */
  _captureEvent(event, hint = {}, currentScope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getCurrentScope)(), isolationScope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getIsolationScope)()) {
    if (_debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && isErrorEvent(event)) {
      _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.log(`Captured error event \`${(0,_utils_eventUtils_js__WEBPACK_IMPORTED_MODULE_12__.getPossibleEventMessages)(event)[0] || "<unknown>"}\``);
    }
    return this._processEvent(event, hint, currentScope, isolationScope).then(
      (finalEvent) => {
        return finalEvent.event_id;
      },
      (reason) => {
        if (_debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD) {
          if (_isDoNotSendEventError(reason)) {
            _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.log(reason.message);
          } else if (_isInternalError(reason)) {
            _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.warn(reason.message);
          } else {
            _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.warn(reason);
          }
        }
        return void 0;
      }
    );
  }
  /**
   * Processes an event (either error or message) and sends it to Sentry.
   *
   * This also adds breadcrumbs and context information to the event. However,
   * platform specific meta data (such as the User's IP address) must be added
   * by the SDK implementor.
   *
   *
   * @param event The event to send to Sentry.
   * @param hint May contain additional information about the original exception.
   * @param currentScope A scope containing event metadata.
   * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
   */
  _processEvent(event, hint, currentScope, isolationScope) {
    const options = this.getOptions();
    const { sampleRate } = options;
    const isTransaction = isTransactionEvent(event);
    const isError = isErrorEvent(event);
    const eventType = event.type || "error";
    const beforeSendLabel = `before send for type \`${eventType}\``;
    const parsedSampleRate = typeof sampleRate === "undefined" ? void 0 : (0,_utils_parseSampleRate_js__WEBPACK_IMPORTED_MODULE_16__.parseSampleRate)(sampleRate);
    if (isError && typeof parsedSampleRate === "number" && Math.random() > parsedSampleRate) {
      this.recordDroppedEvent("sample_rate", "error");
      return (0,_utils_syncpromise_js__WEBPACK_IMPORTED_MODULE_19__.rejectedSyncPromise)(
        _makeDoNotSendEventError(
          `Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`
        )
      );
    }
    const dataCategory = eventType === "replay_event" ? "replay" : eventType;
    return this._prepareEvent(event, hint, currentScope, isolationScope).then((prepared) => {
      if (prepared === null) {
        this.recordDroppedEvent("event_processor", dataCategory);
        throw _makeDoNotSendEventError("An event processor returned `null`, will not send event.");
      }
      const isInternalException = hint.data && hint.data.__sentry__ === true;
      if (isInternalException) {
        return prepared;
      }
      const result = processBeforeSend(this, options, prepared, hint);
      return _validateBeforeSendResult(result, beforeSendLabel);
    }).then((processedEvent) => {
      var _a;
      if (processedEvent === null) {
        this.recordDroppedEvent("before_send", dataCategory);
        if (isTransaction) {
          const spans = event.spans || [];
          const spanCount = 1 + spans.length;
          this.recordDroppedEvent("before_send", "span", spanCount);
        }
        throw _makeDoNotSendEventError(`${beforeSendLabel} returned \`null\`, will not send event.`);
      }
      const session = currentScope.getSession() || isolationScope.getSession();
      if (isError && session) {
        this._updateSessionFromEvent(session, processedEvent);
      }
      if (isTransaction) {
        const spanCountBefore = ((_a = processedEvent.sdkProcessingMetadata) == null ? void 0 : _a.spanCountBeforeProcessing) || 0;
        const spanCountAfter = processedEvent.spans ? processedEvent.spans.length : 0;
        const droppedSpanCount = spanCountBefore - spanCountAfter;
        if (droppedSpanCount > 0) {
          this.recordDroppedEvent("before_send", "span", droppedSpanCount);
        }
      }
      const transactionInfo = processedEvent.transaction_info;
      if (isTransaction && transactionInfo && processedEvent.transaction !== event.transaction) {
        const source = "custom";
        processedEvent.transaction_info = {
          ...transactionInfo,
          source
        };
      }
      this.sendEvent(processedEvent, hint);
      return processedEvent;
    }).then(null, (reason) => {
      if (_isDoNotSendEventError(reason) || _isInternalError(reason)) {
        throw reason;
      }
      this.captureException(reason, {
        data: {
          __sentry__: true
        },
        originalException: reason
      });
      throw _makeInternalError(
        `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${reason}`
      );
    });
  }
  /**
   * Occupies the client with processing and event
   */
  _process(promise) {
    this._numProcessing++;
    void promise.then(
      (value) => {
        this._numProcessing--;
        return value;
      },
      (reason) => {
        this._numProcessing--;
        return reason;
      }
    );
  }
  /**
   * Clears outcomes on this client and returns them.
   */
  _clearOutcomes() {
    const outcomes = this._outcomes;
    this._outcomes = {};
    return Object.entries(outcomes).map(([key, quantity]) => {
      const [reason, category] = key.split(":");
      return {
        reason,
        category,
        quantity
      };
    });
  }
  /**
   * Sends client reports as an envelope.
   */
  _flushOutcomes() {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.log("Flushing outcomes...");
    const outcomes = this._clearOutcomes();
    if (outcomes.length === 0) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.log("No dsn provided, will not send outcomes");
      return;
    }
    _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_9__.debug.log("Sending outcomes:", outcomes);
    const envelope = (0,_utils_clientreport_js__WEBPACK_IMPORTED_MODULE_8__.createClientReportEnvelope)(outcomes, this._options.tunnel && (0,_utils_dsn_js__WEBPACK_IMPORTED_MODULE_10__.dsnToString)(this._dsn));
    this.sendEnvelope(envelope);
  }
  /**
   * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
   */
}
function _validateBeforeSendResult(beforeSendResult, beforeSendLabel) {
  const invalidValueError = `${beforeSendLabel} must return \`null\` or a valid event.`;
  if ((0,_utils_is_js__WEBPACK_IMPORTED_MODULE_13__.isThenable)(beforeSendResult)) {
    return beforeSendResult.then(
      (event) => {
        if (!(0,_utils_is_js__WEBPACK_IMPORTED_MODULE_13__.isPlainObject)(event) && event !== null) {
          throw _makeInternalError(invalidValueError);
        }
        return event;
      },
      (e) => {
        throw _makeInternalError(`${beforeSendLabel} rejected with ${e}`);
      }
    );
  } else if (!(0,_utils_is_js__WEBPACK_IMPORTED_MODULE_13__.isPlainObject)(beforeSendResult) && beforeSendResult !== null) {
    throw _makeInternalError(invalidValueError);
  }
  return beforeSendResult;
}
function processBeforeSend(client, options, event, hint) {
  const { beforeSend, beforeSendTransaction, beforeSendSpan } = options;
  let processedEvent = event;
  if (isErrorEvent(processedEvent) && beforeSend) {
    return beforeSend(processedEvent, hint);
  }
  if (isTransactionEvent(processedEvent)) {
    if (beforeSendSpan) {
      const processedRootSpanJson = beforeSendSpan((0,_utils_transactionEvent_js__WEBPACK_IMPORTED_MODULE_20__.convertTransactionEventToSpanJson)(processedEvent));
      if (!processedRootSpanJson) {
        (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_18__.showSpanDropWarning)();
      } else {
        processedEvent = (0,_utils_merge_js__WEBPACK_IMPORTED_MODULE_14__.merge)(event, (0,_utils_transactionEvent_js__WEBPACK_IMPORTED_MODULE_20__.convertSpanJsonToTransactionEvent)(processedRootSpanJson));
      }
      if (processedEvent.spans) {
        const processedSpans = [];
        for (const span of processedEvent.spans) {
          const processedSpan = beforeSendSpan(span);
          if (!processedSpan) {
            (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_18__.showSpanDropWarning)();
            processedSpans.push(span);
          } else {
            processedSpans.push(processedSpan);
          }
        }
        processedEvent.spans = processedSpans;
      }
    }
    if (beforeSendTransaction) {
      if (processedEvent.spans) {
        const spanCountBefore = processedEvent.spans.length;
        processedEvent.sdkProcessingMetadata = {
          ...event.sdkProcessingMetadata,
          spanCountBeforeProcessing: spanCountBefore
        };
      }
      return beforeSendTransaction(processedEvent, hint);
    }
  }
  return processedEvent;
}
function isErrorEvent(event) {
  return event.type === void 0;
}
function isTransactionEvent(event) {
  return event.type === "transaction";
}
function _getTraceInfoFromScope(client, scope) {
  if (!scope) {
    return [void 0, void 0];
  }
  return (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.withScope)(scope, () => {
    const span = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_18__.getActiveSpan)();
    const traceContext = span ? (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_18__.spanToTraceContext)(span) : (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getTraceContextFromScope)(scope);
    const dynamicSamplingContext = span ? (0,_tracing_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_7__.getDynamicSamplingContextFromSpan)(span) : (0,_tracing_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_7__.getDynamicSamplingContextFromScope)(client, scope);
    return [dynamicSamplingContext, traceContext];
  });
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/constants.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/constants.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_ENVIRONMENT: () => (/* binding */ DEFAULT_ENVIRONMENT)
/* harmony export */ });
const DEFAULT_ENVIRONMENT = "production";



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/currentScopes.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/currentScopes.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getClient: () => (/* binding */ getClient),
/* harmony export */   getCurrentScope: () => (/* binding */ getCurrentScope),
/* harmony export */   getGlobalScope: () => (/* binding */ getGlobalScope),
/* harmony export */   getIsolationScope: () => (/* binding */ getIsolationScope),
/* harmony export */   getTraceContextFromScope: () => (/* binding */ getTraceContextFromScope),
/* harmony export */   withIsolationScope: () => (/* binding */ withIsolationScope),
/* harmony export */   withScope: () => (/* binding */ withScope)
/* harmony export */ });
/* harmony import */ var _asyncContext_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asyncContext/index.js */ "../../node_modules/@sentry/core/build/esm/asyncContext/index.js");
/* harmony import */ var _carrier_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carrier.js */ "../../node_modules/@sentry/core/build/esm/carrier.js");
/* harmony import */ var _scope_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scope.js */ "../../node_modules/@sentry/core/build/esm/scope.js");
/* harmony import */ var _utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/propagationContext.js */ "../../node_modules/@sentry/core/build/esm/utils/propagationContext.js");




function getCurrentScope() {
  const carrier = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_1__.getMainCarrier)();
  const acs = (0,_asyncContext_index_js__WEBPACK_IMPORTED_MODULE_0__.getAsyncContextStrategy)(carrier);
  return acs.getCurrentScope();
}
function getIsolationScope() {
  const carrier = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_1__.getMainCarrier)();
  const acs = (0,_asyncContext_index_js__WEBPACK_IMPORTED_MODULE_0__.getAsyncContextStrategy)(carrier);
  return acs.getIsolationScope();
}
function getGlobalScope() {
  return (0,_carrier_js__WEBPACK_IMPORTED_MODULE_1__.getGlobalSingleton)("globalScope", () => new _scope_js__WEBPACK_IMPORTED_MODULE_2__.Scope());
}
function withScope(...rest) {
  const carrier = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_1__.getMainCarrier)();
  const acs = (0,_asyncContext_index_js__WEBPACK_IMPORTED_MODULE_0__.getAsyncContextStrategy)(carrier);
  if (rest.length === 2) {
    const [scope, callback] = rest;
    if (!scope) {
      return acs.withScope(callback);
    }
    return acs.withSetScope(scope, callback);
  }
  return acs.withScope(rest[0]);
}
function withIsolationScope(...rest) {
  const carrier = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_1__.getMainCarrier)();
  const acs = (0,_asyncContext_index_js__WEBPACK_IMPORTED_MODULE_0__.getAsyncContextStrategy)(carrier);
  if (rest.length === 2) {
    const [isolationScope, callback] = rest;
    if (!isolationScope) {
      return acs.withIsolationScope(callback);
    }
    return acs.withSetIsolationScope(isolationScope, callback);
  }
  return acs.withIsolationScope(rest[0]);
}
function getClient() {
  return getCurrentScope().getClient();
}
function getTraceContextFromScope(scope) {
  const propagationContext = scope.getPropagationContext();
  const { traceId, parentSpanId, propagationSpanId } = propagationContext;
  const traceContext = {
    trace_id: traceId,
    span_id: propagationSpanId || (0,_utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_3__.generateSpanId)()
  };
  if (parentSpanId) {
    traceContext.parent_span_id = parentSpanId;
  }
  return traceContext;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/debug-build.js":
/*!****************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/debug-build.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEBUG_BUILD: () => (/* binding */ DEBUG_BUILD)
/* harmony export */ });
const DEBUG_BUILD = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/defaultScopes.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/defaultScopes.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultCurrentScope: () => (/* binding */ getDefaultCurrentScope),
/* harmony export */   getDefaultIsolationScope: () => (/* binding */ getDefaultIsolationScope)
/* harmony export */ });
/* harmony import */ var _carrier_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carrier.js */ "../../node_modules/@sentry/core/build/esm/carrier.js");
/* harmony import */ var _scope_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scope.js */ "../../node_modules/@sentry/core/build/esm/scope.js");


function getDefaultCurrentScope() {
  return (0,_carrier_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalSingleton)("defaultCurrentScope", () => new _scope_js__WEBPACK_IMPORTED_MODULE_1__.Scope());
}
function getDefaultIsolationScope() {
  return (0,_carrier_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalSingleton)("defaultIsolationScope", () => new _scope_js__WEBPACK_IMPORTED_MODULE_1__.Scope());
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/envelope.js":
/*!*************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/envelope.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createEventEnvelope: () => (/* binding */ createEventEnvelope),
/* harmony export */   createSessionEnvelope: () => (/* binding */ createSessionEnvelope),
/* harmony export */   createSpanEnvelope: () => (/* binding */ createSpanEnvelope)
/* harmony export */ });
/* harmony import */ var _tracing_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tracing/dynamicSamplingContext.js */ "../../node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js");
/* harmony import */ var _utils_dsn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/dsn.js */ "../../node_modules/@sentry/core/build/esm/utils/dsn.js");
/* harmony import */ var _utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/envelope.js */ "../../node_modules/@sentry/core/build/esm/utils/envelope.js");
/* harmony import */ var _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");




function enhanceEventWithSdkInfo(event, sdkInfo) {
  if (!sdkInfo) {
    return event;
  }
  event.sdk = event.sdk || {};
  event.sdk.name = event.sdk.name || sdkInfo.name;
  event.sdk.version = event.sdk.version || sdkInfo.version;
  event.sdk.integrations = [...event.sdk.integrations || [], ...sdkInfo.integrations || []];
  event.sdk.packages = [...event.sdk.packages || [], ...sdkInfo.packages || []];
  return event;
}
function createSessionEnvelope(session, dsn, metadata, tunnel) {
  const sdkInfo = (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.getSdkMetadataForEnvelopeHeader)(metadata);
  const envelopeHeaders = {
    sent_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...sdkInfo && { sdk: sdkInfo },
    ...!!tunnel && dsn && { dsn: (0,_utils_dsn_js__WEBPACK_IMPORTED_MODULE_1__.dsnToString)(dsn) }
  };
  const envelopeItem = "aggregates" in session ? [{ type: "sessions" }, session] : [{ type: "session" }, session.toJSON()];
  return (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.createEnvelope)(envelopeHeaders, [envelopeItem]);
}
function createEventEnvelope(event, dsn, metadata, tunnel) {
  const sdkInfo = (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.getSdkMetadataForEnvelopeHeader)(metadata);
  const eventType = event.type && event.type !== "replay_event" ? event.type : "event";
  enhanceEventWithSdkInfo(event, metadata == null ? void 0 : metadata.sdk);
  const envelopeHeaders = (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.createEventEnvelopeHeaders)(event, sdkInfo, tunnel, dsn);
  delete event.sdkProcessingMetadata;
  const eventItem = [{ type: eventType }, event];
  return (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.createEnvelope)(envelopeHeaders, [eventItem]);
}
function createSpanEnvelope(spans, client) {
  function dscHasRequiredProps(dsc2) {
    return !!dsc2.trace_id && !!dsc2.public_key;
  }
  const dsc = (0,_tracing_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_0__.getDynamicSamplingContextFromSpan)(spans[0]);
  const dsn = client == null ? void 0 : client.getDsn();
  const tunnel = client == null ? void 0 : client.getOptions().tunnel;
  const headers = {
    sent_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...dscHasRequiredProps(dsc) && { trace: dsc },
    ...!!tunnel && dsn && { dsn: (0,_utils_dsn_js__WEBPACK_IMPORTED_MODULE_1__.dsnToString)(dsn) }
  };
  const beforeSendSpan = client == null ? void 0 : client.getOptions().beforeSendSpan;
  const convertToSpanJSON = beforeSendSpan ? (span) => {
    const spanJson = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_3__.spanToJSON)(span);
    const processedSpan = beforeSendSpan(spanJson);
    if (!processedSpan) {
      (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_3__.showSpanDropWarning)();
      return spanJson;
    }
    return processedSpan;
  } : _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_3__.spanToJSON;
  const items = [];
  for (const span of spans) {
    const spanJson = convertToSpanJSON(span);
    if (spanJson) {
      items.push((0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.createSpanEnvelopeItem)(spanJson));
    }
  }
  return (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.createEnvelope)(headers, items);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/eventProcessors.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/eventProcessors.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   notifyEventProcessors: () => (/* binding */ notifyEventProcessors)
/* harmony export */ });
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_is_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _utils_syncpromise_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/syncpromise.js */ "../../node_modules/@sentry/core/build/esm/utils/syncpromise.js");




function notifyEventProcessors(processors, event, hint, index = 0) {
  return new _utils_syncpromise_js__WEBPACK_IMPORTED_MODULE_3__.SyncPromise((resolve, reject) => {
    const processor = processors[index];
    if (event === null || typeof processor !== "function") {
      resolve(event);
    } else {
      const result = processor({ ...event }, hint);
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && processor.id && result === null && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.log(`Event processor "${processor.id}" dropped event`);
      if ((0,_utils_is_js__WEBPACK_IMPORTED_MODULE_2__.isThenable)(result)) {
        void result.then((final) => notifyEventProcessors(processors, final, hint, index + 1).then(resolve)).then(null, reject);
      } else {
        void notifyEventProcessors(processors, result, hint, index + 1).then(resolve).then(null, reject);
      }
    }
  });
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/exports.js":
/*!************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/exports.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addEventProcessor: () => (/* binding */ addEventProcessor),
/* harmony export */   captureEvent: () => (/* binding */ captureEvent),
/* harmony export */   captureException: () => (/* binding */ captureException),
/* harmony export */   captureSession: () => (/* binding */ captureSession),
/* harmony export */   isEnabled: () => (/* binding */ isEnabled),
/* harmony export */   setContext: () => (/* binding */ setContext),
/* harmony export */   setTag: () => (/* binding */ setTag),
/* harmony export */   startSession: () => (/* binding */ startSession)
/* harmony export */ });
/* unused harmony exports captureCheckIn, captureMessage, close, endSession, flush, isInitialized, lastEventId, setExtra, setExtras, setTags, setUser, withMonitor */
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _session_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./session.js */ "../../node_modules/@sentry/core/build/esm/session.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_is_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _utils_misc_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/misc.js */ "../../node_modules/@sentry/core/build/esm/utils/misc.js");
/* harmony import */ var _utils_prepareEvent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/prepareEvent.js */ "../../node_modules/@sentry/core/build/esm/utils/prepareEvent.js");
/* harmony import */ var _utils_time_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/time.js */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");









function captureException(exception, hint) {
  return (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)().captureException(exception, (0,_utils_prepareEvent_js__WEBPACK_IMPORTED_MODULE_6__.parseEventHintOrCaptureContext)(hint));
}
function captureMessage(message, captureContext) {
  const level = typeof captureContext === "string" ? captureContext : void 0;
  const context = typeof captureContext !== "string" ? { captureContext } : void 0;
  return (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)().captureMessage(message, level, context);
}
function captureEvent(event, hint) {
  return (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)().captureEvent(event, hint);
}
function setContext(name, context) {
  (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getIsolationScope)().setContext(name, context);
}
function setExtras(extras) {
  (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getIsolationScope)().setExtras(extras);
}
function setExtra(key, extra) {
  (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getIsolationScope)().setExtra(key, extra);
}
function setTags(tags) {
  (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getIsolationScope)().setTags(tags);
}
function setTag(key, value) {
  (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getIsolationScope)().setTag(key, value);
}
function setUser(user) {
  (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getIsolationScope)().setUser(user);
}
function lastEventId() {
  return (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getIsolationScope)().lastEventId();
}
function captureCheckIn(checkIn, upsertMonitorConfig) {
  const scope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)();
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)();
  if (!client) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__.debug.warn("Cannot capture check-in. No client defined.");
  } else if (!client.captureCheckIn) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__.debug.warn("Cannot capture check-in. Client does not support sending check-ins.");
  } else {
    return client.captureCheckIn(checkIn, upsertMonitorConfig, scope);
  }
  return (0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_5__.uuid4)();
}
function withMonitor(monitorSlug, callback, upsertMonitorConfig) {
  const checkInId = captureCheckIn({ monitorSlug, status: "in_progress" }, upsertMonitorConfig);
  const now = (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_7__.timestampInSeconds)();
  function finishCheckIn(status) {
    captureCheckIn({ monitorSlug, status, checkInId, duration: (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_7__.timestampInSeconds)() - now });
  }
  return (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.withIsolationScope)(() => {
    let maybePromiseResult;
    try {
      maybePromiseResult = callback();
    } catch (e) {
      finishCheckIn("error");
      throw e;
    }
    if ((0,_utils_is_js__WEBPACK_IMPORTED_MODULE_4__.isThenable)(maybePromiseResult)) {
      return maybePromiseResult.then(
        (r) => {
          finishCheckIn("ok");
          return r;
        },
        (e) => {
          finishCheckIn("error");
          throw e;
        }
      );
    }
    finishCheckIn("ok");
    return maybePromiseResult;
  });
}
async function flush(timeout) {
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)();
  if (client) {
    return client.flush(timeout);
  }
  _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__.debug.warn("Cannot flush events. No client defined.");
  return Promise.resolve(false);
}
async function close(timeout) {
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)();
  if (client) {
    return client.close(timeout);
  }
  _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__.debug.warn("Cannot flush events and disable SDK. No client defined.");
  return Promise.resolve(false);
}
function isInitialized() {
  return !!(0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)();
}
function isEnabled() {
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)();
  return (client == null ? void 0 : client.getOptions().enabled) !== false && !!(client == null ? void 0 : client.getTransport());
}
function addEventProcessor(callback) {
  (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getIsolationScope)().addEventProcessor(callback);
}
function startSession(context) {
  const isolationScope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getIsolationScope)();
  const currentScope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)();
  const { userAgent } = _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_8__.GLOBAL_OBJ.navigator || {};
  const session = (0,_session_js__WEBPACK_IMPORTED_MODULE_2__.makeSession)({
    user: currentScope.getUser() || isolationScope.getUser(),
    ...userAgent && { userAgent },
    ...context
  });
  const currentSession = isolationScope.getSession();
  if ((currentSession == null ? void 0 : currentSession.status) === "ok") {
    (0,_session_js__WEBPACK_IMPORTED_MODULE_2__.updateSession)(currentSession, { status: "exited" });
  }
  endSession();
  isolationScope.setSession(session);
  return session;
}
function endSession() {
  const isolationScope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getIsolationScope)();
  const currentScope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)();
  const session = currentScope.getSession() || isolationScope.getSession();
  if (session) {
    (0,_session_js__WEBPACK_IMPORTED_MODULE_2__.closeSession)(session);
  }
  _sendSessionUpdate();
  isolationScope.setSession();
}
function _sendSessionUpdate() {
  const isolationScope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getIsolationScope)();
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)();
  const session = isolationScope.getSession();
  if (session && client) {
    client.captureSession(session);
  }
}
function captureSession(end = false) {
  if (end) {
    endSession();
    return;
  }
  _sendSessionUpdate();
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/fetch.js":
/*!**********************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/fetch.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   instrumentFetchRequest: () => (/* binding */ instrumentFetchRequest)
/* harmony export */ });
/* unused harmony export _addTracingHeadersToFetchRequest */
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _semanticAttributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./semanticAttributes.js */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _tracing_spanstatus_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tracing/spanstatus.js */ "../../node_modules/@sentry/core/build/esm/tracing/spanstatus.js");
/* harmony import */ var _utils_is_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _utils_hasSpansEnabled_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/hasSpansEnabled.js */ "../../node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js");
/* harmony import */ var _utils_baggage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/baggage.js */ "../../node_modules/@sentry/core/build/esm/utils/baggage.js");
/* harmony import */ var _tracing_sentryNonRecordingSpan_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tracing/sentryNonRecordingSpan.js */ "../../node_modules/@sentry/core/build/esm/tracing/sentryNonRecordingSpan.js");
/* harmony import */ var _tracing_trace_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tracing/trace.js */ "../../node_modules/@sentry/core/build/esm/tracing/trace.js");
/* harmony import */ var _utils_traceData_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/traceData.js */ "../../node_modules/@sentry/core/build/esm/utils/traceData.js");
/* harmony import */ var _utils_url_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/url.js */ "../../node_modules/@sentry/core/build/esm/utils/url.js");











function instrumentFetchRequest(handlerData, shouldCreateSpan, shouldAttachHeaders, spans, spanOrigin = "auto.http.browser") {
  if (!handlerData.fetchData) {
    return void 0;
  }
  const { method, url } = handlerData.fetchData;
  const shouldCreateSpanResult = (0,_utils_hasSpansEnabled_js__WEBPACK_IMPORTED_MODULE_5__.hasSpansEnabled)() && shouldCreateSpan(url);
  if (handlerData.endTimestamp && shouldCreateSpanResult) {
    const spanId = handlerData.fetchData.__span;
    if (!spanId) return;
    const span2 = spans[spanId];
    if (span2) {
      endSpan(span2, handlerData);
      delete spans[spanId];
    }
    return void 0;
  }
  const hasParent = !!(0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_2__.getActiveSpan)();
  const span = shouldCreateSpanResult && hasParent ? (0,_tracing_trace_js__WEBPACK_IMPORTED_MODULE_8__.startInactiveSpan)(getSpanStartOptions(url, method, spanOrigin)) : new _tracing_sentryNonRecordingSpan_js__WEBPACK_IMPORTED_MODULE_7__.SentryNonRecordingSpan();
  handlerData.fetchData.__span = span.spanContext().spanId;
  spans[span.spanContext().spanId] = span;
  if (shouldAttachHeaders(handlerData.fetchData.url)) {
    const request = handlerData.args[0];
    const options = handlerData.args[1] || {};
    const headers = _addTracingHeadersToFetchRequest(
      request,
      options,
      // If performance is disabled (TWP) or there's no active root span (pageload/navigation/interaction),
      // we do not want to use the span as base for the trace headers,
      // which means that the headers will be generated from the scope and the sampling decision is deferred
      (0,_utils_hasSpansEnabled_js__WEBPACK_IMPORTED_MODULE_5__.hasSpansEnabled)() && hasParent ? span : void 0
    );
    if (headers) {
      handlerData.args[1] = options;
      options.headers = headers;
    }
  }
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)();
  if (client) {
    const fetchHint = {
      input: handlerData.args,
      response: handlerData.response,
      startTimestamp: handlerData.startTimestamp,
      endTimestamp: handlerData.endTimestamp
    };
    client.emit("beforeOutgoingRequestSpan", span, fetchHint);
  }
  return span;
}
function _addTracingHeadersToFetchRequest(request, fetchOptionsObj, span) {
  const traceHeaders = (0,_utils_traceData_js__WEBPACK_IMPORTED_MODULE_9__.getTraceData)({ span });
  const sentryTrace = traceHeaders["sentry-trace"];
  const baggage = traceHeaders.baggage;
  if (!sentryTrace) {
    return void 0;
  }
  const originalHeaders = fetchOptionsObj.headers || ((0,_utils_is_js__WEBPACK_IMPORTED_MODULE_4__.isRequest)(request) ? request.headers : void 0);
  if (!originalHeaders) {
    return { ...traceHeaders };
  } else if (isHeaders(originalHeaders)) {
    const newHeaders = new Headers(originalHeaders);
    if (!newHeaders.get("sentry-trace")) {
      newHeaders.set("sentry-trace", sentryTrace);
    }
    if (baggage) {
      const prevBaggageHeader = newHeaders.get("baggage");
      if (!prevBaggageHeader) {
        newHeaders.set("baggage", baggage);
      } else if (!baggageHeaderHasSentryBaggageValues(prevBaggageHeader)) {
        newHeaders.set("baggage", `${prevBaggageHeader},${baggage}`);
      }
    }
    return newHeaders;
  } else if (Array.isArray(originalHeaders)) {
    const newHeaders = [...originalHeaders];
    if (!originalHeaders.find((header) => header[0] === "sentry-trace")) {
      newHeaders.push(["sentry-trace", sentryTrace]);
    }
    const prevBaggageHeaderWithSentryValues = originalHeaders.find(
      (header) => header[0] === "baggage" && baggageHeaderHasSentryBaggageValues(header[1])
    );
    if (baggage && !prevBaggageHeaderWithSentryValues) {
      newHeaders.push(["baggage", baggage]);
    }
    return newHeaders;
  } else {
    const existingSentryTraceHeader = "sentry-trace" in originalHeaders ? originalHeaders["sentry-trace"] : void 0;
    const existingBaggageHeader = "baggage" in originalHeaders ? originalHeaders.baggage : void 0;
    const newBaggageHeaders = existingBaggageHeader ? Array.isArray(existingBaggageHeader) ? [...existingBaggageHeader] : [existingBaggageHeader] : [];
    const prevBaggageHeaderWithSentryValues = existingBaggageHeader && (Array.isArray(existingBaggageHeader) ? existingBaggageHeader.find((headerItem) => baggageHeaderHasSentryBaggageValues(headerItem)) : baggageHeaderHasSentryBaggageValues(existingBaggageHeader));
    if (baggage && !prevBaggageHeaderWithSentryValues) {
      newBaggageHeaders.push(baggage);
    }
    return {
      ...originalHeaders,
      "sentry-trace": existingSentryTraceHeader != null ? existingSentryTraceHeader : sentryTrace,
      baggage: newBaggageHeaders.length > 0 ? newBaggageHeaders.join(",") : void 0
    };
  }
}
function endSpan(span, handlerData) {
  var _a, _b;
  if (handlerData.response) {
    (0,_tracing_spanstatus_js__WEBPACK_IMPORTED_MODULE_3__.setHttpStatus)(span, handlerData.response.status);
    const contentLength = (_b = (_a = handlerData.response) == null ? void 0 : _a.headers) == null ? void 0 : _b.get("content-length");
    if (contentLength) {
      const contentLengthNum = parseInt(contentLength);
      if (contentLengthNum > 0) {
        span.setAttribute("http.response_content_length", contentLengthNum);
      }
    }
  } else if (handlerData.error) {
    span.setStatus({ code: _tracing_spanstatus_js__WEBPACK_IMPORTED_MODULE_3__.SPAN_STATUS_ERROR, message: "internal_error" });
  }
  span.end();
}
function baggageHeaderHasSentryBaggageValues(baggageHeader) {
  return baggageHeader.split(",").some((baggageEntry) => baggageEntry.trim().startsWith(_utils_baggage_js__WEBPACK_IMPORTED_MODULE_6__.SENTRY_BAGGAGE_KEY_PREFIX));
}
function isHeaders(headers) {
  return typeof Headers !== "undefined" && (0,_utils_is_js__WEBPACK_IMPORTED_MODULE_4__.isInstanceOf)(headers, Headers);
}
function getSpanStartOptions(url, method, spanOrigin) {
  const parsedUrl = (0,_utils_url_js__WEBPACK_IMPORTED_MODULE_10__.parseStringToURLObject)(url);
  return {
    name: parsedUrl ? `${method} ${(0,_utils_url_js__WEBPACK_IMPORTED_MODULE_10__.getSanitizedUrlStringFromUrlObject)(parsedUrl)}` : method,
    attributes: getFetchSpanAttributes(url, parsedUrl, method, spanOrigin)
  };
}
function getFetchSpanAttributes(url, parsedUrl, method, spanOrigin) {
  const attributes = {
    url,
    type: "fetch",
    "http.method": method,
    [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: spanOrigin,
    [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_OP]: "http.client"
  };
  if (parsedUrl) {
    if (!(0,_utils_url_js__WEBPACK_IMPORTED_MODULE_10__.isURLObjectRelative)(parsedUrl)) {
      attributes["http.url"] = parsedUrl.href;
      attributes["server.address"] = parsedUrl.host;
    }
    if (parsedUrl.search) {
      attributes["http.query"] = parsedUrl.search;
    }
    if (parsedUrl.hash) {
      attributes["http.fragment"] = parsedUrl.hash;
    }
  }
  return attributes;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/instrument/console.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/instrument/console.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addConsoleInstrumentationHandler: () => (/* binding */ addConsoleInstrumentationHandler)
/* harmony export */ });
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/object.js */ "../../node_modules/@sentry/core/build/esm/utils/object.js");
/* harmony import */ var _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");
/* harmony import */ var _handlers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handlers.js */ "../../node_modules/@sentry/core/build/esm/instrument/handlers.js");




function addConsoleInstrumentationHandler(handler) {
  const type = "console";
  (0,_handlers_js__WEBPACK_IMPORTED_MODULE_3__.addHandler)(type, handler);
  (0,_handlers_js__WEBPACK_IMPORTED_MODULE_3__.maybeInstrument)(type, instrumentConsole);
}
function instrumentConsole() {
  if (!("console" in _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_2__.GLOBAL_OBJ)) {
    return;
  }
  _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_0__.CONSOLE_LEVELS.forEach(function(level) {
    if (!(level in _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_2__.GLOBAL_OBJ.console)) {
      return;
    }
    (0,_utils_object_js__WEBPACK_IMPORTED_MODULE_1__.fill)(_utils_worldwide_js__WEBPACK_IMPORTED_MODULE_2__.GLOBAL_OBJ.console, level, function(originalConsoleMethod) {
      _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_0__.originalConsoleMethods[level] = originalConsoleMethod;
      return function(...args) {
        const handlerData = { args, level };
        (0,_handlers_js__WEBPACK_IMPORTED_MODULE_3__.triggerHandlers)("console", handlerData);
        const log = _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_0__.originalConsoleMethods[level];
        log == null ? void 0 : log.apply(_utils_worldwide_js__WEBPACK_IMPORTED_MODULE_2__.GLOBAL_OBJ.console, args);
      };
    });
  });
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/instrument/fetch.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/instrument/fetch.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addFetchEndInstrumentationHandler: () => (/* binding */ addFetchEndInstrumentationHandler),
/* harmony export */   addFetchInstrumentationHandler: () => (/* binding */ addFetchInstrumentationHandler)
/* harmony export */ });
/* unused harmony export parseFetchArgs */
/* harmony import */ var _utils_is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _utils_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/object.js */ "../../node_modules/@sentry/core/build/esm/utils/object.js");
/* harmony import */ var _utils_supports_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/supports.js */ "../../node_modules/@sentry/core/build/esm/utils/supports.js");
/* harmony import */ var _utils_time_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/time.js */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");
/* harmony import */ var _handlers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handlers.js */ "../../node_modules/@sentry/core/build/esm/instrument/handlers.js");






function addFetchInstrumentationHandler(handler, skipNativeFetchCheck) {
  const type = "fetch";
  (0,_handlers_js__WEBPACK_IMPORTED_MODULE_5__.addHandler)(type, handler);
  (0,_handlers_js__WEBPACK_IMPORTED_MODULE_5__.maybeInstrument)(type, () => instrumentFetch(void 0, skipNativeFetchCheck));
}
function addFetchEndInstrumentationHandler(handler) {
  const type = "fetch-body-resolved";
  (0,_handlers_js__WEBPACK_IMPORTED_MODULE_5__.addHandler)(type, handler);
  (0,_handlers_js__WEBPACK_IMPORTED_MODULE_5__.maybeInstrument)(type, () => instrumentFetch(streamHandler));
}
function instrumentFetch(onFetchResolved, skipNativeFetchCheck = false) {
  if (skipNativeFetchCheck && !(0,_utils_supports_js__WEBPACK_IMPORTED_MODULE_2__.supportsNativeFetch)()) {
    return;
  }
  (0,_utils_object_js__WEBPACK_IMPORTED_MODULE_1__.fill)(_utils_worldwide_js__WEBPACK_IMPORTED_MODULE_4__.GLOBAL_OBJ, "fetch", function(originalFetch) {
    return function(...args) {
      const virtualError = new Error();
      const { method, url } = parseFetchArgs(args);
      const handlerData = {
        args,
        fetchData: {
          method,
          url
        },
        startTimestamp: (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_3__.timestampInSeconds)() * 1e3,
        // // Adding the error to be able to fingerprint the failed fetch event in HttpClient instrumentation
        virtualError,
        headers: getHeadersFromFetchArgs(args)
      };
      if (!onFetchResolved) {
        (0,_handlers_js__WEBPACK_IMPORTED_MODULE_5__.triggerHandlers)("fetch", {
          ...handlerData
        });
      }
      return originalFetch.apply(_utils_worldwide_js__WEBPACK_IMPORTED_MODULE_4__.GLOBAL_OBJ, args).then(
        async (response) => {
          if (onFetchResolved) {
            onFetchResolved(response);
          } else {
            (0,_handlers_js__WEBPACK_IMPORTED_MODULE_5__.triggerHandlers)("fetch", {
              ...handlerData,
              endTimestamp: (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_3__.timestampInSeconds)() * 1e3,
              response
            });
          }
          return response;
        },
        (error) => {
          (0,_handlers_js__WEBPACK_IMPORTED_MODULE_5__.triggerHandlers)("fetch", {
            ...handlerData,
            endTimestamp: (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_3__.timestampInSeconds)() * 1e3,
            error
          });
          if ((0,_utils_is_js__WEBPACK_IMPORTED_MODULE_0__.isError)(error) && error.stack === void 0) {
            error.stack = virtualError.stack;
            (0,_utils_object_js__WEBPACK_IMPORTED_MODULE_1__.addNonEnumerableProperty)(error, "framesToPop", 1);
          }
          if (error instanceof TypeError && (error.message === "Failed to fetch" || error.message === "Load failed" || error.message === "NetworkError when attempting to fetch resource.")) {
            try {
              const url2 = new URL(handlerData.fetchData.url);
              error.message = `${error.message} (${url2.host})`;
            } catch {
            }
          }
          throw error;
        }
      );
    };
  });
}
async function resolveResponse(res, onFinishedResolving) {
  if (res == null ? void 0 : res.body) {
    const body = res.body;
    const responseReader = body.getReader();
    const maxFetchDurationTimeout = setTimeout(
      () => {
        body.cancel().then(null, () => {
        });
      },
      90 * 1e3
      // 90s
    );
    let readingActive = true;
    while (readingActive) {
      let chunkTimeout;
      try {
        chunkTimeout = setTimeout(() => {
          body.cancel().then(null, () => {
          });
        }, 5e3);
        const { done } = await responseReader.read();
        clearTimeout(chunkTimeout);
        if (done) {
          onFinishedResolving();
          readingActive = false;
        }
      } catch {
        readingActive = false;
      } finally {
        clearTimeout(chunkTimeout);
      }
    }
    clearTimeout(maxFetchDurationTimeout);
    responseReader.releaseLock();
    body.cancel().then(null, () => {
    });
  }
}
function streamHandler(response) {
  let clonedResponseForResolving;
  try {
    clonedResponseForResolving = response.clone();
  } catch {
    return;
  }
  resolveResponse(clonedResponseForResolving, () => {
    (0,_handlers_js__WEBPACK_IMPORTED_MODULE_5__.triggerHandlers)("fetch-body-resolved", {
      endTimestamp: (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_3__.timestampInSeconds)() * 1e3,
      response
    });
  });
}
function hasProp(obj, prop) {
  return !!obj && typeof obj === "object" && !!obj[prop];
}
function getUrlFromResource(resource) {
  if (typeof resource === "string") {
    return resource;
  }
  if (!resource) {
    return "";
  }
  if (hasProp(resource, "url")) {
    return resource.url;
  }
  if (resource.toString) {
    return resource.toString();
  }
  return "";
}
function parseFetchArgs(fetchArgs) {
  if (fetchArgs.length === 0) {
    return { method: "GET", url: "" };
  }
  if (fetchArgs.length === 2) {
    const [url, options] = fetchArgs;
    return {
      url: getUrlFromResource(url),
      method: hasProp(options, "method") ? String(options.method).toUpperCase() : "GET"
    };
  }
  const arg = fetchArgs[0];
  return {
    url: getUrlFromResource(arg),
    method: hasProp(arg, "method") ? String(arg.method).toUpperCase() : "GET"
  };
}
function getHeadersFromFetchArgs(fetchArgs) {
  const [requestArgument, optionsArgument] = fetchArgs;
  try {
    if (typeof optionsArgument === "object" && optionsArgument !== null && "headers" in optionsArgument && optionsArgument.headers) {
      return new Headers(optionsArgument.headers);
    }
    if ((0,_utils_is_js__WEBPACK_IMPORTED_MODULE_0__.isRequest)(requestArgument)) {
      return new Headers(requestArgument.headers);
    }
  } catch {
  }
  return;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/instrument/globalError.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/instrument/globalError.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addGlobalErrorInstrumentationHandler: () => (/* binding */ addGlobalErrorInstrumentationHandler)
/* harmony export */ });
/* harmony import */ var _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");
/* harmony import */ var _handlers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers.js */ "../../node_modules/@sentry/core/build/esm/instrument/handlers.js");


let _oldOnErrorHandler = null;
function addGlobalErrorInstrumentationHandler(handler) {
  const type = "error";
  (0,_handlers_js__WEBPACK_IMPORTED_MODULE_1__.addHandler)(type, handler);
  (0,_handlers_js__WEBPACK_IMPORTED_MODULE_1__.maybeInstrument)(type, instrumentError);
}
function instrumentError() {
  _oldOnErrorHandler = _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ.onerror;
  _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ.onerror = function(msg, url, line, column, error) {
    const handlerData = {
      column,
      error,
      line,
      msg,
      url
    };
    (0,_handlers_js__WEBPACK_IMPORTED_MODULE_1__.triggerHandlers)("error", handlerData);
    if (_oldOnErrorHandler) {
      return _oldOnErrorHandler.apply(this, arguments);
    }
    return false;
  };
  _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ.onerror.__SENTRY_INSTRUMENTED__ = true;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/instrument/globalUnhandledRejection.js":
/*!****************************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/instrument/globalUnhandledRejection.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addGlobalUnhandledRejectionInstrumentationHandler: () => (/* binding */ addGlobalUnhandledRejectionInstrumentationHandler)
/* harmony export */ });
/* harmony import */ var _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");
/* harmony import */ var _handlers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers.js */ "../../node_modules/@sentry/core/build/esm/instrument/handlers.js");


let _oldOnUnhandledRejectionHandler = null;
function addGlobalUnhandledRejectionInstrumentationHandler(handler) {
  const type = "unhandledrejection";
  (0,_handlers_js__WEBPACK_IMPORTED_MODULE_1__.addHandler)(type, handler);
  (0,_handlers_js__WEBPACK_IMPORTED_MODULE_1__.maybeInstrument)(type, instrumentUnhandledRejection);
}
function instrumentUnhandledRejection() {
  _oldOnUnhandledRejectionHandler = _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ.onunhandledrejection;
  _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ.onunhandledrejection = function(e) {
    const handlerData = e;
    (0,_handlers_js__WEBPACK_IMPORTED_MODULE_1__.triggerHandlers)("unhandledrejection", handlerData);
    if (_oldOnUnhandledRejectionHandler) {
      return _oldOnUnhandledRejectionHandler.apply(this, arguments);
    }
    return true;
  };
  _utils_worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/instrument/handlers.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/instrument/handlers.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addHandler: () => (/* binding */ addHandler),
/* harmony export */   maybeInstrument: () => (/* binding */ maybeInstrument),
/* harmony export */   triggerHandlers: () => (/* binding */ triggerHandlers)
/* harmony export */ });
/* unused harmony export resetInstrumentationHandlers */
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_stacktrace_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/stacktrace.js */ "../../node_modules/@sentry/core/build/esm/utils/stacktrace.js");



const handlers = {};
const instrumented = {};
function addHandler(type, handler) {
  handlers[type] = handlers[type] || [];
  handlers[type].push(handler);
}
function resetInstrumentationHandlers() {
  Object.keys(handlers).forEach((key) => {
    handlers[key] = void 0;
  });
}
function maybeInstrument(type, instrumentFn) {
  if (!instrumented[type]) {
    instrumented[type] = true;
    try {
      instrumentFn();
    } catch (e) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.error(`Error while instrumenting ${type}`, e);
    }
  }
}
function triggerHandlers(type, data) {
  const typeHandlers = type && handlers[type];
  if (!typeHandlers) {
    return;
  }
  for (const handler of typeHandlers) {
    try {
      handler(data);
    } catch (e) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.error(
        `Error while triggering instrumentation handler.
Type: ${type}
Name: ${(0,_utils_stacktrace_js__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(handler)}
Error:`,
        e
      );
    }
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/integration.js":
/*!****************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/integration.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterSetupIntegrations: () => (/* binding */ afterSetupIntegrations),
/* harmony export */   defineIntegration: () => (/* binding */ defineIntegration),
/* harmony export */   getIntegrationsToSetup: () => (/* binding */ getIntegrationsToSetup),
/* harmony export */   setupIntegration: () => (/* binding */ setupIntegration),
/* harmony export */   setupIntegrations: () => (/* binding */ setupIntegrations)
/* harmony export */ });
/* unused harmony exports addIntegration, installedIntegrations */
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");



const installedIntegrations = [];
function filterDuplicates(integrations) {
  const integrationsByName = {};
  integrations.forEach((currentInstance) => {
    const { name } = currentInstance;
    const existingInstance = integrationsByName[name];
    if (existingInstance && !existingInstance.isDefaultInstance && currentInstance.isDefaultInstance) {
      return;
    }
    integrationsByName[name] = currentInstance;
  });
  return Object.values(integrationsByName);
}
function getIntegrationsToSetup(options) {
  const defaultIntegrations = options.defaultIntegrations || [];
  const userIntegrations = options.integrations;
  defaultIntegrations.forEach((integration) => {
    integration.isDefaultInstance = true;
  });
  let integrations;
  if (Array.isArray(userIntegrations)) {
    integrations = [...defaultIntegrations, ...userIntegrations];
  } else if (typeof userIntegrations === "function") {
    const resolvedUserIntegrations = userIntegrations(defaultIntegrations);
    integrations = Array.isArray(resolvedUserIntegrations) ? resolvedUserIntegrations : [resolvedUserIntegrations];
  } else {
    integrations = defaultIntegrations;
  }
  return filterDuplicates(integrations);
}
function setupIntegrations(client, integrations) {
  const integrationIndex = {};
  integrations.forEach((integration) => {
    if (integration) {
      setupIntegration(client, integration, integrationIndex);
    }
  });
  return integrationIndex;
}
function afterSetupIntegrations(client, integrations) {
  for (const integration of integrations) {
    if (integration == null ? void 0 : integration.afterAllSetup) {
      integration.afterAllSetup(client);
    }
  }
}
function setupIntegration(client, integration, integrationIndex) {
  if (integrationIndex[integration.name]) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.log(`Integration skipped because it was already installed: ${integration.name}`);
    return;
  }
  integrationIndex[integration.name] = integration;
  if (installedIntegrations.indexOf(integration.name) === -1 && typeof integration.setupOnce === "function") {
    integration.setupOnce();
    installedIntegrations.push(integration.name);
  }
  if (integration.setup && typeof integration.setup === "function") {
    integration.setup(client);
  }
  if (typeof integration.preprocessEvent === "function") {
    const callback = integration.preprocessEvent.bind(integration);
    client.on("preprocessEvent", (event, hint) => callback(event, hint, client));
  }
  if (typeof integration.processEvent === "function") {
    const callback = integration.processEvent.bind(integration);
    const processor = Object.assign((event, hint) => callback(event, hint, client), {
      id: integration.name
    });
    client.addEventProcessor(processor);
  }
  _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.log(`Integration installed: ${integration.name}`);
}
function addIntegration(integration) {
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)();
  if (!client) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.warn(`Cannot add integration "${integration.name}" because no SDK Client is available.`);
    return;
  }
  client.addIntegration(integration);
}
function defineIntegration(fn) {
  return fn;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/integrations/dedupe.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/integrations/dedupe.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dedupeIntegration: () => (/* binding */ dedupeIntegration)
/* harmony export */ });
/* unused harmony export _shouldDropEvent */
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _integration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../integration.js */ "../../node_modules/@sentry/core/build/esm/integration.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_stacktrace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/stacktrace.js */ "../../node_modules/@sentry/core/build/esm/utils/stacktrace.js");




const INTEGRATION_NAME = "Dedupe";
const _dedupeIntegration = () => {
  let previousEvent;
  return {
    name: INTEGRATION_NAME,
    processEvent(currentEvent) {
      if (currentEvent.type) {
        return currentEvent;
      }
      try {
        if (_shouldDropEvent(currentEvent, previousEvent)) {
          _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.warn("Event dropped due to being a duplicate of previously captured event.");
          return null;
        }
      } catch {
      }
      return previousEvent = currentEvent;
    }
  };
};
const dedupeIntegration = (0,_integration_js__WEBPACK_IMPORTED_MODULE_1__.defineIntegration)(_dedupeIntegration);
function _shouldDropEvent(currentEvent, previousEvent) {
  if (!previousEvent) {
    return false;
  }
  if (_isSameMessageEvent(currentEvent, previousEvent)) {
    return true;
  }
  if (_isSameExceptionEvent(currentEvent, previousEvent)) {
    return true;
  }
  return false;
}
function _isSameMessageEvent(currentEvent, previousEvent) {
  const currentMessage = currentEvent.message;
  const previousMessage = previousEvent.message;
  if (!currentMessage && !previousMessage) {
    return false;
  }
  if (currentMessage && !previousMessage || !currentMessage && previousMessage) {
    return false;
  }
  if (currentMessage !== previousMessage) {
    return false;
  }
  if (!_isSameFingerprint(currentEvent, previousEvent)) {
    return false;
  }
  if (!_isSameStacktrace(currentEvent, previousEvent)) {
    return false;
  }
  return true;
}
function _isSameExceptionEvent(currentEvent, previousEvent) {
  const previousException = _getExceptionFromEvent(previousEvent);
  const currentException = _getExceptionFromEvent(currentEvent);
  if (!previousException || !currentException) {
    return false;
  }
  if (previousException.type !== currentException.type || previousException.value !== currentException.value) {
    return false;
  }
  if (!_isSameFingerprint(currentEvent, previousEvent)) {
    return false;
  }
  if (!_isSameStacktrace(currentEvent, previousEvent)) {
    return false;
  }
  return true;
}
function _isSameStacktrace(currentEvent, previousEvent) {
  let currentFrames = (0,_utils_stacktrace_js__WEBPACK_IMPORTED_MODULE_3__.getFramesFromEvent)(currentEvent);
  let previousFrames = (0,_utils_stacktrace_js__WEBPACK_IMPORTED_MODULE_3__.getFramesFromEvent)(previousEvent);
  if (!currentFrames && !previousFrames) {
    return true;
  }
  if (currentFrames && !previousFrames || !currentFrames && previousFrames) {
    return false;
  }
  currentFrames = currentFrames;
  previousFrames = previousFrames;
  if (previousFrames.length !== currentFrames.length) {
    return false;
  }
  for (let i = 0; i < previousFrames.length; i++) {
    const frameA = previousFrames[i];
    const frameB = currentFrames[i];
    if (frameA.filename !== frameB.filename || frameA.lineno !== frameB.lineno || frameA.colno !== frameB.colno || frameA.function !== frameB.function) {
      return false;
    }
  }
  return true;
}
function _isSameFingerprint(currentEvent, previousEvent) {
  let currentFingerprint = currentEvent.fingerprint;
  let previousFingerprint = previousEvent.fingerprint;
  if (!currentFingerprint && !previousFingerprint) {
    return true;
  }
  if (currentFingerprint && !previousFingerprint || !currentFingerprint && previousFingerprint) {
    return false;
  }
  currentFingerprint = currentFingerprint;
  previousFingerprint = previousFingerprint;
  try {
    return !!(currentFingerprint.join("") === previousFingerprint.join(""));
  } catch {
    return false;
  }
}
function _getExceptionFromEvent(event) {
  var _a, _b;
  return (_b = (_a = event.exception) == null ? void 0 : _a.values) == null ? void 0 : _b[0];
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/integrations/eventFilters.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/integrations/eventFilters.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inboundFiltersIntegration: () => (/* binding */ inboundFiltersIntegration)
/* harmony export */ });
/* unused harmony export eventFiltersIntegration */
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _integration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../integration.js */ "../../node_modules/@sentry/core/build/esm/integration.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_eventUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/eventUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/eventUtils.js");
/* harmony import */ var _utils_misc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/misc.js */ "../../node_modules/@sentry/core/build/esm/utils/misc.js");
/* harmony import */ var _utils_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/string.js */ "../../node_modules/@sentry/core/build/esm/utils/string.js");






const DEFAULT_IGNORE_ERRORS = [
  /^Script error\.?$/,
  /^Javascript error: Script error\.? on line 0$/,
  /^ResizeObserver loop completed with undelivered notifications.$/,
  // The browser logs this when a ResizeObserver handler takes a bit longer. Usually this is not an actual issue though. It indicates slowness.
  /^Cannot redefine property: googletag$/,
  // This is thrown when google tag manager is used in combination with an ad blocker
  /^Can't find variable: gmo$/,
  // Error from Google Search App https://issuetracker.google.com/issues/396043331
  /^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,
  // Random error that happens but not actionable or noticeable to end-users.
  `can't redefine non-configurable property "solana"`,
  // Probably a browser extension or custom browser (Brave) throwing this error
  "vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)",
  // Error thrown by GTM, seemingly not affecting end-users
  "Can't find variable: _AutofillCallbackHandler",
  // Unactionable error in instagram webview https://developers.facebook.com/community/threads/320013549791141/
  /^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,
  // unactionable error from CEFSharp, a .NET library that embeds chromium in .NET apps
  /^Java exception was raised during method invocation$/
  // error from Facebook Mobile browser (https://github.com/getsentry/sentry-javascript/issues/15065)
];
const INTEGRATION_NAME = "EventFilters";
const eventFiltersIntegration = (0,_integration_js__WEBPACK_IMPORTED_MODULE_1__.defineIntegration)((options = {}) => {
  let mergedOptions;
  return {
    name: INTEGRATION_NAME,
    setup(client) {
      const clientOptions = client.getOptions();
      mergedOptions = _mergeOptions(options, clientOptions);
    },
    processEvent(event, _hint, client) {
      if (!mergedOptions) {
        const clientOptions = client.getOptions();
        mergedOptions = _mergeOptions(options, clientOptions);
      }
      return _shouldDropEvent(event, mergedOptions) ? null : event;
    }
  };
});
const inboundFiltersIntegration = (0,_integration_js__WEBPACK_IMPORTED_MODULE_1__.defineIntegration)((options = {}) => {
  return {
    ...eventFiltersIntegration(options),
    name: "InboundFilters"
  };
});
function _mergeOptions(internalOptions = {}, clientOptions = {}) {
  return {
    allowUrls: [...internalOptions.allowUrls || [], ...clientOptions.allowUrls || []],
    denyUrls: [...internalOptions.denyUrls || [], ...clientOptions.denyUrls || []],
    ignoreErrors: [
      ...internalOptions.ignoreErrors || [],
      ...clientOptions.ignoreErrors || [],
      ...internalOptions.disableErrorDefaults ? [] : DEFAULT_IGNORE_ERRORS
    ],
    ignoreTransactions: [...internalOptions.ignoreTransactions || [], ...clientOptions.ignoreTransactions || []]
  };
}
function _shouldDropEvent(event, options) {
  if (!event.type) {
    if (_isIgnoredError(event, options.ignoreErrors)) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${(0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event)}`
      );
      return true;
    }
    if (_isUselessError(event)) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.warn(
        `Event dropped due to not having an error message, error type or stacktrace.
Event: ${(0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(
          event
        )}`
      );
      return true;
    }
    if (_isDeniedUrl(event, options.denyUrls)) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.warn(
        `Event dropped due to being matched by \`denyUrls\` option.
Event: ${(0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(
          event
        )}.
Url: ${_getEventFilterUrl(event)}`
      );
      return true;
    }
    if (!_isAllowedUrl(event, options.allowUrls)) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${(0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(
          event
        )}.
Url: ${_getEventFilterUrl(event)}`
      );
      return true;
    }
  } else if (event.type === "transaction") {
    if (_isIgnoredTransaction(event, options.ignoreTransactions)) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.warn(
        `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${(0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event)}`
      );
      return true;
    }
  }
  return false;
}
function _isIgnoredError(event, ignoreErrors) {
  if (!(ignoreErrors == null ? void 0 : ignoreErrors.length)) {
    return false;
  }
  return (0,_utils_eventUtils_js__WEBPACK_IMPORTED_MODULE_3__.getPossibleEventMessages)(event).some((message) => (0,_utils_string_js__WEBPACK_IMPORTED_MODULE_5__.stringMatchesSomePattern)(message, ignoreErrors));
}
function _isIgnoredTransaction(event, ignoreTransactions) {
  if (!(ignoreTransactions == null ? void 0 : ignoreTransactions.length)) {
    return false;
  }
  const name = event.transaction;
  return name ? (0,_utils_string_js__WEBPACK_IMPORTED_MODULE_5__.stringMatchesSomePattern)(name, ignoreTransactions) : false;
}
function _isDeniedUrl(event, denyUrls) {
  if (!(denyUrls == null ? void 0 : denyUrls.length)) {
    return false;
  }
  const url = _getEventFilterUrl(event);
  return !url ? false : (0,_utils_string_js__WEBPACK_IMPORTED_MODULE_5__.stringMatchesSomePattern)(url, denyUrls);
}
function _isAllowedUrl(event, allowUrls) {
  if (!(allowUrls == null ? void 0 : allowUrls.length)) {
    return true;
  }
  const url = _getEventFilterUrl(event);
  return !url ? true : (0,_utils_string_js__WEBPACK_IMPORTED_MODULE_5__.stringMatchesSomePattern)(url, allowUrls);
}
function _getLastValidUrl(frames = []) {
  for (let i = frames.length - 1; i >= 0; i--) {
    const frame = frames[i];
    if (frame && frame.filename !== "<anonymous>" && frame.filename !== "[native code]") {
      return frame.filename || null;
    }
  }
  return null;
}
function _getEventFilterUrl(event) {
  var _a, _b, _c;
  try {
    const rootException = [...(_b = (_a = event.exception) == null ? void 0 : _a.values) != null ? _b : []].reverse().find((value) => {
      var _a2, _b2, _c2;
      return ((_a2 = value.mechanism) == null ? void 0 : _a2.parent_id) === void 0 && ((_c2 = (_b2 = value.stacktrace) == null ? void 0 : _b2.frames) == null ? void 0 : _c2.length);
    });
    const frames = (_c = rootException == null ? void 0 : rootException.stacktrace) == null ? void 0 : _c.frames;
    return frames ? _getLastValidUrl(frames) : null;
  } catch {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.error(`Cannot extract url for event ${(0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event)}`);
    return null;
  }
}
function _isUselessError(event) {
  var _a, _b;
  if (!((_b = (_a = event.exception) == null ? void 0 : _a.values) == null ? void 0 : _b.length)) {
    return false;
  }
  return (
    // No top-level message
    !event.message && // There are no exception values that have a stacktrace, a non-generic-Error type or value
    !event.exception.values.some((value) => value.stacktrace || value.type && value.type !== "Error" || value.value)
  );
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/integrations/functiontostring.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/integrations/functiontostring.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   functionToStringIntegration: () => (/* binding */ functionToStringIntegration)
/* harmony export */ });
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _integration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../integration.js */ "../../node_modules/@sentry/core/build/esm/integration.js");
/* harmony import */ var _utils_object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/object.js */ "../../node_modules/@sentry/core/build/esm/utils/object.js");



let originalFunctionToString;
const INTEGRATION_NAME = "FunctionToString";
const SETUP_CLIENTS = /* @__PURE__ */ new WeakMap();
const _functionToStringIntegration = () => {
  return {
    name: INTEGRATION_NAME,
    setupOnce() {
      originalFunctionToString = Function.prototype.toString;
      try {
        Function.prototype.toString = function(...args) {
          const originalFunction = (0,_utils_object_js__WEBPACK_IMPORTED_MODULE_2__.getOriginalFunction)(this);
          const context = SETUP_CLIENTS.has((0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)()) && originalFunction !== void 0 ? originalFunction : this;
          return originalFunctionToString.apply(context, args);
        };
      } catch {
      }
    },
    setup(client) {
      SETUP_CLIENTS.set(client, true);
    }
  };
};
const functionToStringIntegration = (0,_integration_js__WEBPACK_IMPORTED_MODULE_1__.defineIntegration)(_functionToStringIntegration);



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/logs/constants.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/logs/constants.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SEVERITY_TEXT_TO_SEVERITY_NUMBER: () => (/* binding */ SEVERITY_TEXT_TO_SEVERITY_NUMBER)
/* harmony export */ });
const SEVERITY_TEXT_TO_SEVERITY_NUMBER = {
  trace: 1,
  debug: 5,
  info: 9,
  warn: 13,
  error: 17,
  fatal: 21
};



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/logs/envelope.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/logs/envelope.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createLogEnvelope: () => (/* binding */ createLogEnvelope)
/* harmony export */ });
/* unused harmony export createLogContainerEnvelopeItem */
/* harmony import */ var _utils_dsn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dsn.js */ "../../node_modules/@sentry/core/build/esm/utils/dsn.js");
/* harmony import */ var _utils_envelope_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/envelope.js */ "../../node_modules/@sentry/core/build/esm/utils/envelope.js");


function createLogContainerEnvelopeItem(items) {
  return [
    {
      type: "log",
      item_count: items.length,
      content_type: "application/vnd.sentry.items.log+json"
    },
    {
      items
    }
  ];
}
function createLogEnvelope(logs, metadata, tunnel, dsn) {
  const headers = {};
  if (metadata == null ? void 0 : metadata.sdk) {
    headers.sdk = {
      name: metadata.sdk.name,
      version: metadata.sdk.version
    };
  }
  if (!!tunnel && !!dsn) {
    headers.dsn = (0,_utils_dsn_js__WEBPACK_IMPORTED_MODULE_0__.dsnToString)(dsn);
  }
  return (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_1__.createEnvelope)(headers, [createLogContainerEnvelopeItem(logs)]);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/logs/exports.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/logs/exports.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _INTERNAL_flushLogsBuffer: () => (/* binding */ _INTERNAL_flushLogsBuffer)
/* harmony export */ });
/* unused harmony exports _INTERNAL_captureLog, _INTERNAL_captureSerializedLog, _INTERNAL_getLogBuffer, logAttributeToSerializedLogAttribute */
/* harmony import */ var _carrier_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../carrier.js */ "../../node_modules/@sentry/core/build/esm/carrier.js");
/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../client.js */ "../../node_modules/@sentry/core/build/esm/client.js");
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _utils_applyScopeDataToEvent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/applyScopeDataToEvent.js */ "../../node_modules/@sentry/core/build/esm/utils/applyScopeDataToEvent.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_is_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/spanOnScope.js */ "../../node_modules/@sentry/core/build/esm/utils/spanOnScope.js");
/* harmony import */ var _utils_time_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/time.js */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./constants.js */ "../../node_modules/@sentry/core/build/esm/logs/constants.js");
/* harmony import */ var _envelope_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./envelope.js */ "../../node_modules/@sentry/core/build/esm/logs/envelope.js");











const MAX_LOG_BUFFER_SIZE = 100;
function logAttributeToSerializedLogAttribute(value) {
  var _a;
  switch (typeof value) {
    case "number":
      if (Number.isInteger(value)) {
        return {
          value,
          type: "integer"
        };
      }
      return {
        value,
        type: "double"
      };
    case "boolean":
      return {
        value,
        type: "boolean"
      };
    case "string":
      return {
        value,
        type: "string"
      };
    default: {
      let stringValue = "";
      try {
        stringValue = (_a = JSON.stringify(value)) != null ? _a : "";
      } catch {
      }
      return {
        value: stringValue,
        type: "string"
      };
    }
  }
}
function setLogAttribute(logAttributes, key, value, setEvenIfPresent = true) {
  if (value && (!logAttributes[key] || setEvenIfPresent)) {
    logAttributes[key] = value;
  }
}
function _INTERNAL_captureSerializedLog(client, serializedLog) {
  const bufferMap = _getBufferMap();
  const logBuffer = _INTERNAL_getLogBuffer(client);
  if (logBuffer === void 0) {
    bufferMap.set(client, [serializedLog]);
  } else {
    bufferMap.set(client, [...logBuffer, serializedLog]);
    if (logBuffer.length >= MAX_LOG_BUFFER_SIZE) {
      _INTERNAL_flushLogsBuffer(client, logBuffer);
    }
  }
}
function _INTERNAL_captureLog(beforeLog, client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getClient)(), currentScope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getCurrentScope)(), captureSerializedLog = _INTERNAL_captureSerializedLog) {
  var _a, _b;
  if (!client) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_5__.debug.warn("No client available to capture log.");
    return;
  }
  const { release, environment, enableLogs = false, beforeSendLog } = client.getOptions();
  if (!enableLogs) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_5__.debug.warn("logging option not enabled, log will not be captured.");
    return;
  }
  const [, traceContext] = (0,_client_js__WEBPACK_IMPORTED_MODULE_1__._getTraceInfoFromScope)(client, currentScope);
  const processedLogAttributes = {
    ...beforeLog.attributes
  };
  const {
    user: { id, email, username }
  } = getMergedScopeData(currentScope);
  setLogAttribute(processedLogAttributes, "user.id", id, false);
  setLogAttribute(processedLogAttributes, "user.email", email, false);
  setLogAttribute(processedLogAttributes, "user.name", username, false);
  setLogAttribute(processedLogAttributes, "sentry.release", release);
  setLogAttribute(processedLogAttributes, "sentry.environment", environment);
  const { name, version } = (_b = (_a = client.getSdkMetadata()) == null ? void 0 : _a.sdk) != null ? _b : {};
  setLogAttribute(processedLogAttributes, "sentry.sdk.name", name);
  setLogAttribute(processedLogAttributes, "sentry.sdk.version", version);
  const beforeLogMessage = beforeLog.message;
  if ((0,_utils_is_js__WEBPACK_IMPORTED_MODULE_6__.isParameterizedString)(beforeLogMessage)) {
    const { __sentry_template_string__, __sentry_template_values__ = [] } = beforeLogMessage;
    processedLogAttributes["sentry.message.template"] = __sentry_template_string__;
    __sentry_template_values__.forEach((param, index) => {
      processedLogAttributes[`sentry.message.parameter.${index}`] = param;
    });
  }
  const span = (0,_utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_7__._getSpanForScope)(currentScope);
  setLogAttribute(processedLogAttributes, "sentry.trace.parent_span_id", span == null ? void 0 : span.spanContext().spanId);
  const processedLog = { ...beforeLog, attributes: processedLogAttributes };
  client.emit("beforeCaptureLog", processedLog);
  const log = beforeSendLog ? (0,_utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_5__.consoleSandbox)(() => beforeSendLog(processedLog)) : processedLog;
  if (!log) {
    client.recordDroppedEvent("before_send", "log_item", 1);
    _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_5__.debug.warn("beforeSendLog returned null, log will not be captured.");
    return;
  }
  const { level, message, attributes = {}, severityNumber } = log;
  const serializedLog = {
    timestamp: (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_8__.timestampInSeconds)(),
    level,
    body: message,
    trace_id: traceContext == null ? void 0 : traceContext.trace_id,
    severity_number: severityNumber != null ? severityNumber : _constants_js__WEBPACK_IMPORTED_MODULE_9__.SEVERITY_TEXT_TO_SEVERITY_NUMBER[level],
    attributes: Object.keys(attributes).reduce(
      (acc, key) => {
        acc[key] = logAttributeToSerializedLogAttribute(attributes[key]);
        return acc;
      },
      {}
    )
  };
  captureSerializedLog(client, serializedLog);
  client.emit("afterCaptureLog", log);
}
function _INTERNAL_flushLogsBuffer(client, maybeLogBuffer) {
  var _a;
  const logBuffer = (_a = maybeLogBuffer != null ? maybeLogBuffer : _INTERNAL_getLogBuffer(client)) != null ? _a : [];
  if (logBuffer.length === 0) {
    return;
  }
  const clientOptions = client.getOptions();
  const envelope = (0,_envelope_js__WEBPACK_IMPORTED_MODULE_10__.createLogEnvelope)(logBuffer, clientOptions._metadata, clientOptions.tunnel, client.getDsn());
  _getBufferMap().set(client, []);
  client.emit("flushLogs");
  client.sendEnvelope(envelope);
}
function _INTERNAL_getLogBuffer(client) {
  return _getBufferMap().get(client);
}
function getMergedScopeData(currentScope) {
  const scopeData = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getGlobalScope)().getScopeData();
  (0,_utils_applyScopeDataToEvent_js__WEBPACK_IMPORTED_MODULE_4__.mergeScopeData)(scopeData, (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getIsolationScope)().getScopeData());
  (0,_utils_applyScopeDataToEvent_js__WEBPACK_IMPORTED_MODULE_4__.mergeScopeData)(scopeData, currentScope.getScopeData());
  return scopeData;
}
function _getBufferMap() {
  return (0,_carrier_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalSingleton)("clientToLogBufferMap", () => /* @__PURE__ */ new WeakMap());
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/scope.js":
/*!**********************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/scope.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Scope: () => (/* binding */ Scope)
/* harmony export */ });
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _session_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./session.js */ "../../node_modules/@sentry/core/build/esm/session.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_is_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _utils_merge_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/merge.js */ "../../node_modules/@sentry/core/build/esm/utils/merge.js");
/* harmony import */ var _utils_misc_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/misc.js */ "../../node_modules/@sentry/core/build/esm/utils/misc.js");
/* harmony import */ var _utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/propagationContext.js */ "../../node_modules/@sentry/core/build/esm/utils/propagationContext.js");
/* harmony import */ var _utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/spanOnScope.js */ "../../node_modules/@sentry/core/build/esm/utils/spanOnScope.js");
/* harmony import */ var _utils_string_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/string.js */ "../../node_modules/@sentry/core/build/esm/utils/string.js");
/* harmony import */ var _utils_time_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/time.js */ "../../node_modules/@sentry/core/build/esm/utils/time.js");










const DEFAULT_MAX_BREADCRUMBS = 100;
class Scope {
  /** Flag if notifying is happening. */
  /** Callback for client to receive scope changes. */
  /** Callback list that will be called during event processing. */
  /** Array of breadcrumbs. */
  /** User */
  /** Tags */
  /** Extra */
  /** Contexts */
  /** Attachments */
  /** Propagation Context for distributed tracing */
  /**
   * A place to stash data which is needed at some point in the SDK's event processing pipeline but which shouldn't get
   * sent to Sentry
   */
  /** Fingerprint */
  /** Severity */
  /**
   * Transaction Name
   *
   * IMPORTANT: The transaction name on the scope has nothing to do with root spans/transaction objects.
   * It's purpose is to assign a transaction to the scope that's added to non-transaction events.
   */
  /** Session */
  /** The client on this scope */
  /** Contains the last event id of a captured event.  */
  // NOTE: Any field which gets added here should get added not only to the constructor but also to the `clone` method.
  constructor() {
    this._notifyingListeners = false;
    this._scopeListeners = [];
    this._eventProcessors = [];
    this._breadcrumbs = [];
    this._attachments = [];
    this._user = {};
    this._tags = {};
    this._extra = {};
    this._contexts = {};
    this._sdkProcessingMetadata = {};
    this._propagationContext = {
      traceId: (0,_utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_6__.generateTraceId)(),
      sampleRand: Math.random()
    };
  }
  /**
   * Clone all data from this scope into a new scope.
   */
  clone() {
    const newScope = new Scope();
    newScope._breadcrumbs = [...this._breadcrumbs];
    newScope._tags = { ...this._tags };
    newScope._extra = { ...this._extra };
    newScope._contexts = { ...this._contexts };
    if (this._contexts.flags) {
      newScope._contexts.flags = {
        values: [...this._contexts.flags.values]
      };
    }
    newScope._user = this._user;
    newScope._level = this._level;
    newScope._session = this._session;
    newScope._transactionName = this._transactionName;
    newScope._fingerprint = this._fingerprint;
    newScope._eventProcessors = [...this._eventProcessors];
    newScope._attachments = [...this._attachments];
    newScope._sdkProcessingMetadata = { ...this._sdkProcessingMetadata };
    newScope._propagationContext = { ...this._propagationContext };
    newScope._client = this._client;
    newScope._lastEventId = this._lastEventId;
    (0,_utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_7__._setSpanForScope)(newScope, (0,_utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_7__._getSpanForScope)(this));
    return newScope;
  }
  /**
   * Update the client assigned to this scope.
   * Note that not every scope will have a client assigned - isolation scopes & the global scope will generally not have a client,
   * as well as manually created scopes.
   */
  setClient(client) {
    this._client = client;
  }
  /**
   * Set the ID of the last captured error event.
   * This is generally only captured on the isolation scope.
   */
  setLastEventId(lastEventId) {
    this._lastEventId = lastEventId;
  }
  /**
   * Get the client assigned to this scope.
   */
  getClient() {
    return this._client;
  }
  /**
   * Get the ID of the last captured error event.
   * This is generally only available on the isolation scope.
   */
  lastEventId() {
    return this._lastEventId;
  }
  /**
   * @inheritDoc
   */
  addScopeListener(callback) {
    this._scopeListeners.push(callback);
  }
  /**
   * Add an event processor that will be called before an event is sent.
   */
  addEventProcessor(callback) {
    this._eventProcessors.push(callback);
    return this;
  }
  /**
   * Set the user for this scope.
   * Set to `null` to unset the user.
   */
  setUser(user) {
    this._user = user || {
      email: void 0,
      id: void 0,
      ip_address: void 0,
      username: void 0
    };
    if (this._session) {
      (0,_session_js__WEBPACK_IMPORTED_MODULE_1__.updateSession)(this._session, { user });
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Get the user from this scope.
   */
  getUser() {
    return this._user;
  }
  /**
   * Set an object that will be merged into existing tags on the scope,
   * and will be sent as tags data with the event.
   */
  setTags(tags) {
    this._tags = {
      ...this._tags,
      ...tags
    };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Set a single tag that will be sent as tags data with the event.
   */
  setTag(key, value) {
    this._tags = { ...this._tags, [key]: value };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Set an object that will be merged into existing extra on the scope,
   * and will be sent as extra data with the event.
   */
  setExtras(extras) {
    this._extra = {
      ...this._extra,
      ...extras
    };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Set a single key:value extra entry that will be sent as extra data with the event.
   */
  setExtra(key, extra) {
    this._extra = { ...this._extra, [key]: extra };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Sets the fingerprint on the scope to send with the events.
   * @param {string[]} fingerprint Fingerprint to group events in Sentry.
   */
  setFingerprint(fingerprint) {
    this._fingerprint = fingerprint;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Sets the level on the scope for future events.
   */
  setLevel(level) {
    this._level = level;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Sets the transaction name on the scope so that the name of e.g. taken server route or
   * the page location is attached to future events.
   *
   * IMPORTANT: Calling this function does NOT change the name of the currently active
   * root span. If you want to change the name of the active root span, use
   * `Sentry.updateSpanName(rootSpan, 'new name')` instead.
   *
   * By default, the SDK updates the scope's transaction name automatically on sensible
   * occasions, such as a page navigation or when handling a new request on the server.
   */
  setTransactionName(name) {
    this._transactionName = name;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Sets context data with the given name.
   * Data passed as context will be normalized. You can also pass `null` to unset the context.
   * Note that context data will not be merged - calling `setContext` will overwrite an existing context with the same key.
   */
  setContext(key, context) {
    if (context === null) {
      delete this._contexts[key];
    } else {
      this._contexts[key] = context;
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Set the session for the scope.
   */
  setSession(session) {
    if (!session) {
      delete this._session;
    } else {
      this._session = session;
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Get the session from the scope.
   */
  getSession() {
    return this._session;
  }
  /**
   * Updates the scope with provided data. Can work in three variations:
   * - plain object containing updatable attributes
   * - Scope instance that'll extract the attributes from
   * - callback function that'll receive the current scope as an argument and allow for modifications
   */
  update(captureContext) {
    if (!captureContext) {
      return this;
    }
    const scopeToMerge = typeof captureContext === "function" ? captureContext(this) : captureContext;
    const scopeInstance = scopeToMerge instanceof Scope ? scopeToMerge.getScopeData() : (0,_utils_is_js__WEBPACK_IMPORTED_MODULE_3__.isPlainObject)(scopeToMerge) ? captureContext : void 0;
    const { tags, extra, user, contexts, level, fingerprint = [], propagationContext } = scopeInstance || {};
    this._tags = { ...this._tags, ...tags };
    this._extra = { ...this._extra, ...extra };
    this._contexts = { ...this._contexts, ...contexts };
    if (user && Object.keys(user).length) {
      this._user = user;
    }
    if (level) {
      this._level = level;
    }
    if (fingerprint.length) {
      this._fingerprint = fingerprint;
    }
    if (propagationContext) {
      this._propagationContext = propagationContext;
    }
    return this;
  }
  /**
   * Clears the current scope and resets its properties.
   * Note: The client will not be cleared.
   */
  clear() {
    this._breadcrumbs = [];
    this._tags = {};
    this._extra = {};
    this._user = {};
    this._contexts = {};
    this._level = void 0;
    this._transactionName = void 0;
    this._fingerprint = void 0;
    this._session = void 0;
    (0,_utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_7__._setSpanForScope)(this, void 0);
    this._attachments = [];
    this.setPropagationContext({ traceId: (0,_utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_6__.generateTraceId)(), sampleRand: Math.random() });
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Adds a breadcrumb to the scope.
   * By default, the last 100 breadcrumbs are kept.
   */
  addBreadcrumb(breadcrumb, maxBreadcrumbs) {
    var _a;
    const maxCrumbs = typeof maxBreadcrumbs === "number" ? maxBreadcrumbs : DEFAULT_MAX_BREADCRUMBS;
    if (maxCrumbs <= 0) {
      return this;
    }
    const mergedBreadcrumb = {
      timestamp: (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_9__.dateTimestampInSeconds)(),
      ...breadcrumb,
      // Breadcrumb messages can theoretically be infinitely large and they're held in memory so we truncate them not to leak (too much) memory
      message: breadcrumb.message ? (0,_utils_string_js__WEBPACK_IMPORTED_MODULE_8__.truncate)(breadcrumb.message, 2048) : breadcrumb.message
    };
    this._breadcrumbs.push(mergedBreadcrumb);
    if (this._breadcrumbs.length > maxCrumbs) {
      this._breadcrumbs = this._breadcrumbs.slice(-maxCrumbs);
      (_a = this._client) == null ? void 0 : _a.recordDroppedEvent("buffer_overflow", "log_item");
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Get the last breadcrumb of the scope.
   */
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  /**
   * Clear all breadcrumbs from the scope.
   */
  clearBreadcrumbs() {
    this._breadcrumbs = [];
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Add an attachment to the scope.
   */
  addAttachment(attachment) {
    this._attachments.push(attachment);
    return this;
  }
  /**
   * Clear all attachments from the scope.
   */
  clearAttachments() {
    this._attachments = [];
    return this;
  }
  /**
   * Get the data of this scope, which should be applied to an event during processing.
   */
  getScopeData() {
    return {
      breadcrumbs: this._breadcrumbs,
      attachments: this._attachments,
      contexts: this._contexts,
      tags: this._tags,
      extra: this._extra,
      user: this._user,
      level: this._level,
      fingerprint: this._fingerprint || [],
      eventProcessors: this._eventProcessors,
      propagationContext: this._propagationContext,
      sdkProcessingMetadata: this._sdkProcessingMetadata,
      transactionName: this._transactionName,
      span: (0,_utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_7__._getSpanForScope)(this)
    };
  }
  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry.
   */
  setSDKProcessingMetadata(newData) {
    this._sdkProcessingMetadata = (0,_utils_merge_js__WEBPACK_IMPORTED_MODULE_4__.merge)(this._sdkProcessingMetadata, newData, 2);
    return this;
  }
  /**
   * Add propagation context to the scope, used for distributed tracing
   */
  setPropagationContext(context) {
    this._propagationContext = context;
    return this;
  }
  /**
   * Get propagation context from the scope, used for distributed tracing
   */
  getPropagationContext() {
    return this._propagationContext;
  }
  /**
   * Capture an exception for this scope.
   *
   * @returns {string} The id of the captured Sentry event.
   */
  captureException(exception, hint) {
    const eventId = (hint == null ? void 0 : hint.event_id) || (0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_5__.uuid4)();
    if (!this._client) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.warn("No client configured on scope - will not capture exception!");
      return eventId;
    }
    const syntheticException = new Error("Sentry syntheticException");
    this._client.captureException(
      exception,
      {
        originalException: exception,
        syntheticException,
        ...hint,
        event_id: eventId
      },
      this
    );
    return eventId;
  }
  /**
   * Capture a message for this scope.
   *
   * @returns {string} The id of the captured message.
   */
  captureMessage(message, level, hint) {
    const eventId = (hint == null ? void 0 : hint.event_id) || (0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_5__.uuid4)();
    if (!this._client) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.warn("No client configured on scope - will not capture message!");
      return eventId;
    }
    const syntheticException = new Error(message);
    this._client.captureMessage(
      message,
      level,
      {
        originalException: message,
        syntheticException,
        ...hint,
        event_id: eventId
      },
      this
    );
    return eventId;
  }
  /**
   * Capture a Sentry event for this scope.
   *
   * @returns {string} The id of the captured event.
   */
  captureEvent(event, hint) {
    const eventId = (hint == null ? void 0 : hint.event_id) || (0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_5__.uuid4)();
    if (!this._client) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.warn("No client configured on scope - will not capture event!");
      return eventId;
    }
    this._client.captureEvent(event, { ...hint, event_id: eventId }, this);
    return eventId;
  }
  /**
   * This will be called on every set call.
   */
  _notifyScopeListeners() {
    if (!this._notifyingListeners) {
      this._notifyingListeners = true;
      this._scopeListeners.forEach((callback) => {
        callback(this);
      });
      this._notifyingListeners = false;
    }
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/sdk.js":
/*!********************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/sdk.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initAndBind: () => (/* binding */ initAndBind)
/* harmony export */ });
/* unused harmony export setCurrentClient */
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");



function initAndBind(clientClass, options) {
  if (options.debug === true) {
    if (_debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD) {
      _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.enable();
    } else {
      (0,_utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.consoleSandbox)(() => {
        console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
      });
    }
  }
  const scope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)();
  scope.update(options.initialScope);
  const client = new clientClass(options);
  setCurrentClient(client);
  client.init();
  return client;
}
function setCurrentClient(client) {
  (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)().setClient(client);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/semanticAttributes.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME: () => (/* binding */ SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME),
/* harmony export */   SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD: () => (/* binding */ SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD),
/* harmony export */   SEMANTIC_ATTRIBUTE_PROFILE_ID: () => (/* binding */ SEMANTIC_ATTRIBUTE_PROFILE_ID),
/* harmony export */   SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME: () => (/* binding */ SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME),
/* harmony export */   SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON: () => (/* binding */ SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON),
/* harmony export */   SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT: () => (/* binding */ SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT),
/* harmony export */   SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE: () => (/* binding */ SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE),
/* harmony export */   SEMANTIC_ATTRIBUTE_SENTRY_OP: () => (/* binding */ SEMANTIC_ATTRIBUTE_SENTRY_OP),
/* harmony export */   SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN: () => (/* binding */ SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN),
/* harmony export */   SEMANTIC_ATTRIBUTE_SENTRY_PREVIOUS_TRACE_SAMPLE_RATE: () => (/* binding */ SEMANTIC_ATTRIBUTE_SENTRY_PREVIOUS_TRACE_SAMPLE_RATE),
/* harmony export */   SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE: () => (/* binding */ SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE),
/* harmony export */   SEMANTIC_ATTRIBUTE_SENTRY_SOURCE: () => (/* binding */ SEMANTIC_ATTRIBUTE_SENTRY_SOURCE),
/* harmony export */   SEMANTIC_ATTRIBUTE_URL_FULL: () => (/* binding */ SEMANTIC_ATTRIBUTE_URL_FULL),
/* harmony export */   SEMANTIC_LINK_ATTRIBUTE_LINK_TYPE: () => (/* binding */ SEMANTIC_LINK_ATTRIBUTE_LINK_TYPE)
/* harmony export */ });
/* unused harmony exports SEMANTIC_ATTRIBUTE_CACHE_HIT, SEMANTIC_ATTRIBUTE_CACHE_ITEM_SIZE, SEMANTIC_ATTRIBUTE_CACHE_KEY */
const SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = "sentry.source";
const SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = "sentry.sample_rate";
const SEMANTIC_ATTRIBUTE_SENTRY_PREVIOUS_TRACE_SAMPLE_RATE = "sentry.previous_trace_sample_rate";
const SEMANTIC_ATTRIBUTE_SENTRY_OP = "sentry.op";
const SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = "sentry.origin";
const SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON = "sentry.idle_span_finish_reason";
const SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT = "sentry.measurement_unit";
const SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE = "sentry.measurement_value";
const SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME = "sentry.custom_span_name";
const SEMANTIC_ATTRIBUTE_PROFILE_ID = "sentry.profile_id";
const SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME = "sentry.exclusive_time";
const SEMANTIC_ATTRIBUTE_CACHE_HIT = "cache.hit";
const SEMANTIC_ATTRIBUTE_CACHE_KEY = "cache.key";
const SEMANTIC_ATTRIBUTE_CACHE_ITEM_SIZE = "cache.item_size";
const SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD = "http.request.method";
const SEMANTIC_ATTRIBUTE_URL_FULL = "url.full";
const SEMANTIC_LINK_ATTRIBUTE_LINK_TYPE = "sentry.link.type";



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/session.js":
/*!************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/session.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeSession: () => (/* binding */ closeSession),
/* harmony export */   makeSession: () => (/* binding */ makeSession),
/* harmony export */   updateSession: () => (/* binding */ updateSession)
/* harmony export */ });
/* harmony import */ var _utils_misc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/misc.js */ "../../node_modules/@sentry/core/build/esm/utils/misc.js");
/* harmony import */ var _utils_time_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/time.js */ "../../node_modules/@sentry/core/build/esm/utils/time.js");


function makeSession(context) {
  const startingTime = (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_1__.timestampInSeconds)();
  const session = {
    sid: (0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_0__.uuid4)(),
    init: true,
    timestamp: startingTime,
    started: startingTime,
    duration: 0,
    status: "ok",
    errors: 0,
    ignoreDuration: false,
    toJSON: () => sessionToJSON(session)
  };
  if (context) {
    updateSession(session, context);
  }
  return session;
}
function updateSession(session, context = {}) {
  if (context.user) {
    if (!session.ipAddress && context.user.ip_address) {
      session.ipAddress = context.user.ip_address;
    }
    if (!session.did && !context.did) {
      session.did = context.user.id || context.user.email || context.user.username;
    }
  }
  session.timestamp = context.timestamp || (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_1__.timestampInSeconds)();
  if (context.abnormal_mechanism) {
    session.abnormal_mechanism = context.abnormal_mechanism;
  }
  if (context.ignoreDuration) {
    session.ignoreDuration = context.ignoreDuration;
  }
  if (context.sid) {
    session.sid = context.sid.length === 32 ? context.sid : (0,_utils_misc_js__WEBPACK_IMPORTED_MODULE_0__.uuid4)();
  }
  if (context.init !== void 0) {
    session.init = context.init;
  }
  if (!session.did && context.did) {
    session.did = `${context.did}`;
  }
  if (typeof context.started === "number") {
    session.started = context.started;
  }
  if (session.ignoreDuration) {
    session.duration = void 0;
  } else if (typeof context.duration === "number") {
    session.duration = context.duration;
  } else {
    const duration = session.timestamp - session.started;
    session.duration = duration >= 0 ? duration : 0;
  }
  if (context.release) {
    session.release = context.release;
  }
  if (context.environment) {
    session.environment = context.environment;
  }
  if (!session.ipAddress && context.ipAddress) {
    session.ipAddress = context.ipAddress;
  }
  if (!session.userAgent && context.userAgent) {
    session.userAgent = context.userAgent;
  }
  if (typeof context.errors === "number") {
    session.errors = context.errors;
  }
  if (context.status) {
    session.status = context.status;
  }
}
function closeSession(session, status) {
  let context = {};
  if (status) {
    context = { status };
  } else if (session.status === "ok") {
    context = { status: "exited" };
  }
  updateSession(session, context);
}
function sessionToJSON(session) {
  return {
    sid: `${session.sid}`,
    init: session.init,
    // Make sure that sec is converted to ms for date constructor
    started: new Date(session.started * 1e3).toISOString(),
    timestamp: new Date(session.timestamp * 1e3).toISOString(),
    status: session.status,
    errors: session.errors,
    did: typeof session.did === "number" || typeof session.did === "string" ? `${session.did}` : void 0,
    duration: session.duration,
    abnormal_mechanism: session.abnormal_mechanism,
    attrs: {
      release: session.release,
      environment: session.environment,
      ip_address: session.ipAddress,
      user_agent: session.userAgent
    }
  };
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   freezeDscOnSpan: () => (/* binding */ freezeDscOnSpan),
/* harmony export */   getDynamicSamplingContextFromScope: () => (/* binding */ getDynamicSamplingContextFromScope),
/* harmony export */   getDynamicSamplingContextFromSpan: () => (/* binding */ getDynamicSamplingContextFromSpan)
/* harmony export */ });
/* unused harmony exports getDynamicSamplingContextFromClient, spanToBaggageHeader */
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "../../node_modules/@sentry/core/build/esm/constants.js");
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _semanticAttributes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../semanticAttributes.js */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _utils_baggage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/baggage.js */ "../../node_modules/@sentry/core/build/esm/utils/baggage.js");
/* harmony import */ var _utils_dsn_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/dsn.js */ "../../node_modules/@sentry/core/build/esm/utils/dsn.js");
/* harmony import */ var _utils_hasSpansEnabled_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/hasSpansEnabled.js */ "../../node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js");
/* harmony import */ var _utils_object_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/object.js */ "../../node_modules/@sentry/core/build/esm/utils/object.js");
/* harmony import */ var _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/@sentry/core/build/esm/tracing/utils.js");









const FROZEN_DSC_FIELD = "_frozenDsc";
function freezeDscOnSpan(span, dsc) {
  const spanWithMaybeDsc = span;
  (0,_utils_object_js__WEBPACK_IMPORTED_MODULE_6__.addNonEnumerableProperty)(spanWithMaybeDsc, FROZEN_DSC_FIELD, dsc);
}
function getDynamicSamplingContextFromClient(trace_id, client) {
  const options = client.getOptions();
  const { publicKey: public_key } = client.getDsn() || {};
  const dsc = {
    environment: options.environment || _constants_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_ENVIRONMENT,
    release: options.release,
    public_key,
    trace_id,
    org_id: (0,_utils_dsn_js__WEBPACK_IMPORTED_MODULE_4__.extractOrgIdFromClient)(client)
  };
  client.emit("createDsc", dsc);
  return dsc;
}
function getDynamicSamplingContextFromScope(client, scope) {
  const propagationContext = scope.getPropagationContext();
  return propagationContext.dsc || getDynamicSamplingContextFromClient(propagationContext.traceId, client);
}
function getDynamicSamplingContextFromSpan(span) {
  var _a, _b, _c, _d;
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_1__.getClient)();
  if (!client) {
    return {};
  }
  const rootSpan = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_7__.getRootSpan)(span);
  const rootSpanJson = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_7__.spanToJSON)(rootSpan);
  const rootSpanAttributes = rootSpanJson.data;
  const traceState = rootSpan.spanContext().traceState;
  const rootSpanSampleRate = (_b = (_a = traceState == null ? void 0 : traceState.get("sentry.sample_rate")) != null ? _a : rootSpanAttributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_2__.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]) != null ? _b : rootSpanAttributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_2__.SEMANTIC_ATTRIBUTE_SENTRY_PREVIOUS_TRACE_SAMPLE_RATE];
  function applyLocalSampleRateToDsc(dsc2) {
    if (typeof rootSpanSampleRate === "number" || typeof rootSpanSampleRate === "string") {
      dsc2.sample_rate = `${rootSpanSampleRate}`;
    }
    return dsc2;
  }
  const frozenDsc = rootSpan[FROZEN_DSC_FIELD];
  if (frozenDsc) {
    return applyLocalSampleRateToDsc(frozenDsc);
  }
  const traceStateDsc = traceState == null ? void 0 : traceState.get("sentry.dsc");
  const dscOnTraceState = traceStateDsc && (0,_utils_baggage_js__WEBPACK_IMPORTED_MODULE_3__.baggageHeaderToDynamicSamplingContext)(traceStateDsc);
  if (dscOnTraceState) {
    return applyLocalSampleRateToDsc(dscOnTraceState);
  }
  const dsc = getDynamicSamplingContextFromClient(span.spanContext().traceId, client);
  const source = rootSpanAttributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_2__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
  const name = rootSpanJson.description;
  if (source !== "url" && name) {
    dsc.transaction = name;
  }
  if ((0,_utils_hasSpansEnabled_js__WEBPACK_IMPORTED_MODULE_5__.hasSpansEnabled)()) {
    dsc.sampled = String((0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_7__.spanIsSampled)(rootSpan));
    dsc.sample_rand = // In OTEL we store the sample rand on the trace state because we cannot access scopes for NonRecordingSpans
    // The Sentry OTEL SpanSampler takes care of writing the sample rand on the root span
    (_d = traceState == null ? void 0 : traceState.get("sentry.sample_rand")) != null ? _d : (
      // On all other platforms we can actually get the scopes from a root span (we use this as a fallback)
      (_c = (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.getCapturedScopesOnSpan)(rootSpan).scope) == null ? void 0 : _c.getPropagationContext().sampleRand.toString()
    );
  }
  applyLocalSampleRateToDsc(dsc);
  client.emit("createDsc", dsc, rootSpan);
  return dsc;
}
function spanToBaggageHeader(span) {
  const dsc = getDynamicSamplingContextFromSpan(span);
  return (0,_utils_baggage_js__WEBPACK_IMPORTED_MODULE_3__.dynamicSamplingContextToSentryBaggageHeader)(dsc);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/tracing/errors.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/tracing/errors.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerSpanErrorInstrumentation: () => (/* binding */ registerSpanErrorInstrumentation)
/* harmony export */ });
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _instrument_globalError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../instrument/globalError.js */ "../../node_modules/@sentry/core/build/esm/instrument/globalError.js");
/* harmony import */ var _instrument_globalUnhandledRejection_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../instrument/globalUnhandledRejection.js */ "../../node_modules/@sentry/core/build/esm/instrument/globalUnhandledRejection.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _spanstatus_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./spanstatus.js */ "../../node_modules/@sentry/core/build/esm/tracing/spanstatus.js");






let errorsInstrumented = false;
function registerSpanErrorInstrumentation() {
  if (errorsInstrumented) {
    return;
  }
  function errorCallback() {
    const activeSpan = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_4__.getActiveSpan)();
    const rootSpan = activeSpan && (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_4__.getRootSpan)(activeSpan);
    if (rootSpan) {
      const message = "internal_error";
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__.debug.log(`[Tracing] Root span: ${message} -> Global error occurred`);
      rootSpan.setStatus({ code: _spanstatus_js__WEBPACK_IMPORTED_MODULE_5__.SPAN_STATUS_ERROR, message });
    }
  }
  errorCallback.tag = "sentry_tracingErrorCallback";
  errorsInstrumented = true;
  (0,_instrument_globalError_js__WEBPACK_IMPORTED_MODULE_1__.addGlobalErrorInstrumentationHandler)(errorCallback);
  (0,_instrument_globalUnhandledRejection_js__WEBPACK_IMPORTED_MODULE_2__.addGlobalUnhandledRejectionInstrumentationHandler)(errorCallback);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/tracing/idleSpan.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/tracing/idleSpan.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TRACING_DEFAULTS: () => (/* binding */ TRACING_DEFAULTS),
/* harmony export */   startIdleSpan: () => (/* binding */ startIdleSpan)
/* harmony export */ });
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _semanticAttributes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../semanticAttributes.js */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_hasSpansEnabled_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/hasSpansEnabled.js */ "../../node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js");
/* harmony import */ var _utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/spanOnScope.js */ "../../node_modules/@sentry/core/build/esm/utils/spanOnScope.js");
/* harmony import */ var _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _utils_time_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/time.js */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dynamicSamplingContext.js */ "../../node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js");
/* harmony import */ var _sentryNonRecordingSpan_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sentryNonRecordingSpan.js */ "../../node_modules/@sentry/core/build/esm/tracing/sentryNonRecordingSpan.js");
/* harmony import */ var _sentrySpan_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sentrySpan.js */ "../../node_modules/@sentry/core/build/esm/tracing/sentrySpan.js");
/* harmony import */ var _spanstatus_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./spanstatus.js */ "../../node_modules/@sentry/core/build/esm/tracing/spanstatus.js");
/* harmony import */ var _trace_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./trace.js */ "../../node_modules/@sentry/core/build/esm/tracing/trace.js");













const TRACING_DEFAULTS = {
  idleTimeout: 1e3,
  finalTimeout: 3e4,
  childSpanTimeout: 15e3
};
const FINISH_REASON_HEARTBEAT_FAILED = "heartbeatFailed";
const FINISH_REASON_IDLE_TIMEOUT = "idleTimeout";
const FINISH_REASON_FINAL_TIMEOUT = "finalTimeout";
const FINISH_REASON_EXTERNAL_FINISH = "externalFinish";
function startIdleSpan(startSpanOptions, options = {}) {
  const activities = /* @__PURE__ */ new Map();
  let _finished = false;
  let _idleTimeoutID;
  let _finishReason = FINISH_REASON_EXTERNAL_FINISH;
  let _autoFinishAllowed = !options.disableAutoFinish;
  const _cleanupHooks = [];
  const {
    idleTimeout = TRACING_DEFAULTS.idleTimeout,
    finalTimeout = TRACING_DEFAULTS.finalTimeout,
    childSpanTimeout = TRACING_DEFAULTS.childSpanTimeout,
    beforeSpanEnd
  } = options;
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)();
  if (!client || !(0,_utils_hasSpansEnabled_js__WEBPACK_IMPORTED_MODULE_4__.hasSpansEnabled)()) {
    const span2 = new _sentryNonRecordingSpan_js__WEBPACK_IMPORTED_MODULE_9__.SentryNonRecordingSpan();
    const dsc = {
      sample_rate: "0",
      sampled: "false",
      ...(0,_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_8__.getDynamicSamplingContextFromSpan)(span2)
    };
    (0,_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_8__.freezeDscOnSpan)(span2, dsc);
    return span2;
  }
  const scope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)();
  const previousActiveSpan = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.getActiveSpan)();
  const span = _startIdleSpan(startSpanOptions);
  span.end = new Proxy(span.end, {
    apply(target, thisArg, args) {
      if (beforeSpanEnd) {
        beforeSpanEnd(span);
      }
      if (thisArg instanceof _sentryNonRecordingSpan_js__WEBPACK_IMPORTED_MODULE_9__.SentryNonRecordingSpan) {
        return;
      }
      const [definedEndTimestamp, ...rest] = args;
      const timestamp = definedEndTimestamp || (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_7__.timestampInSeconds)();
      const spanEndTimestamp = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.spanTimeInputToSeconds)(timestamp);
      const spans = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.getSpanDescendants)(span).filter((child) => child !== span);
      if (!spans.length) {
        onIdleSpanEnded(spanEndTimestamp);
        return Reflect.apply(target, thisArg, [spanEndTimestamp, ...rest]);
      }
      const childEndTimestamps = spans.map((span2) => (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(span2).timestamp).filter((timestamp2) => !!timestamp2);
      const latestSpanEndTimestamp = childEndTimestamps.length ? Math.max(...childEndTimestamps) : void 0;
      const spanStartTimestamp = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(span).start_timestamp;
      const endTimestamp = Math.min(
        spanStartTimestamp ? spanStartTimestamp + finalTimeout / 1e3 : Infinity,
        Math.max(spanStartTimestamp || -Infinity, Math.min(spanEndTimestamp, latestSpanEndTimestamp || Infinity))
      );
      onIdleSpanEnded(endTimestamp);
      return Reflect.apply(target, thisArg, [endTimestamp, ...rest]);
    }
  });
  function _cancelIdleTimeout() {
    if (_idleTimeoutID) {
      clearTimeout(_idleTimeoutID);
      _idleTimeoutID = void 0;
    }
  }
  function _restartIdleTimeout(endTimestamp) {
    _cancelIdleTimeout();
    _idleTimeoutID = setTimeout(() => {
      if (!_finished && activities.size === 0 && _autoFinishAllowed) {
        _finishReason = FINISH_REASON_IDLE_TIMEOUT;
        span.end(endTimestamp);
      }
    }, idleTimeout);
  }
  function _restartChildSpanTimeout(endTimestamp) {
    _idleTimeoutID = setTimeout(() => {
      if (!_finished && _autoFinishAllowed) {
        _finishReason = FINISH_REASON_HEARTBEAT_FAILED;
        span.end(endTimestamp);
      }
    }, childSpanTimeout);
  }
  function _pushActivity(spanId) {
    _cancelIdleTimeout();
    activities.set(spanId, true);
    const endTimestamp = (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_7__.timestampInSeconds)();
    _restartChildSpanTimeout(endTimestamp + childSpanTimeout / 1e3);
  }
  function _popActivity(spanId) {
    if (activities.has(spanId)) {
      activities.delete(spanId);
    }
    if (activities.size === 0) {
      const endTimestamp = (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_7__.timestampInSeconds)();
      _restartIdleTimeout(endTimestamp + idleTimeout / 1e3);
    }
  }
  function onIdleSpanEnded(endTimestamp) {
    _finished = true;
    activities.clear();
    _cleanupHooks.forEach((cleanup) => cleanup());
    (0,_utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_5__._setSpanForScope)(scope, previousActiveSpan);
    const spanJSON = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(span);
    const { start_timestamp: startTimestamp } = spanJSON;
    if (!startTimestamp) {
      return;
    }
    const attributes = spanJSON.data;
    if (!attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_2__.SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON]) {
      span.setAttribute(_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_2__.SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON, _finishReason);
    }
    _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__.debug.log(`[Tracing] Idle span "${spanJSON.op}" finished`);
    const childSpans = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.getSpanDescendants)(span).filter((child) => child !== span);
    let discardedSpans = 0;
    childSpans.forEach((childSpan) => {
      if (childSpan.isRecording()) {
        childSpan.setStatus({ code: _spanstatus_js__WEBPACK_IMPORTED_MODULE_11__.SPAN_STATUS_ERROR, message: "cancelled" });
        childSpan.end(endTimestamp);
        _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__.debug.log("[Tracing] Cancelling span since span ended early", JSON.stringify(childSpan, void 0, 2));
      }
      const childSpanJSON = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(childSpan);
      const { timestamp: childEndTimestamp = 0, start_timestamp: childStartTimestamp = 0 } = childSpanJSON;
      const spanStartedBeforeIdleSpanEnd = childStartTimestamp <= endTimestamp;
      const timeoutWithMarginOfError = (finalTimeout + idleTimeout) / 1e3;
      const spanEndedBeforeFinalTimeout = childEndTimestamp - childStartTimestamp <= timeoutWithMarginOfError;
      if (_debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD) {
        const stringifiedSpan = JSON.stringify(childSpan, void 0, 2);
        if (!spanStartedBeforeIdleSpanEnd) {
          _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__.debug.log("[Tracing] Discarding span since it happened after idle span was finished", stringifiedSpan);
        } else if (!spanEndedBeforeFinalTimeout) {
          _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__.debug.log("[Tracing] Discarding span since it finished after idle span final timeout", stringifiedSpan);
        }
      }
      if (!spanEndedBeforeFinalTimeout || !spanStartedBeforeIdleSpanEnd) {
        (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.removeChildSpanFromSpan)(span, childSpan);
        discardedSpans++;
      }
    });
    if (discardedSpans > 0) {
      span.setAttribute("sentry.idle_span_discarded_spans", discardedSpans);
    }
  }
  _cleanupHooks.push(
    client.on("spanStart", (startedSpan) => {
      if (_finished || startedSpan === span || !!(0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(startedSpan).timestamp || startedSpan instanceof _sentrySpan_js__WEBPACK_IMPORTED_MODULE_10__.SentrySpan && startedSpan.isStandaloneSpan()) {
        return;
      }
      const allSpans = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.getSpanDescendants)(span);
      if (allSpans.includes(startedSpan)) {
        _pushActivity(startedSpan.spanContext().spanId);
      }
    })
  );
  _cleanupHooks.push(
    client.on("spanEnd", (endedSpan) => {
      if (_finished) {
        return;
      }
      _popActivity(endedSpan.spanContext().spanId);
    })
  );
  _cleanupHooks.push(
    client.on("idleSpanEnableAutoFinish", (spanToAllowAutoFinish) => {
      if (spanToAllowAutoFinish === span) {
        _autoFinishAllowed = true;
        _restartIdleTimeout();
        if (activities.size) {
          _restartChildSpanTimeout();
        }
      }
    })
  );
  if (!options.disableAutoFinish) {
    _restartIdleTimeout();
  }
  setTimeout(() => {
    if (!_finished) {
      span.setStatus({ code: _spanstatus_js__WEBPACK_IMPORTED_MODULE_11__.SPAN_STATUS_ERROR, message: "deadline_exceeded" });
      _finishReason = FINISH_REASON_FINAL_TIMEOUT;
      span.end();
    }
  }, finalTimeout);
  return span;
}
function _startIdleSpan(options) {
  const span = (0,_trace_js__WEBPACK_IMPORTED_MODULE_12__.startInactiveSpan)(options);
  (0,_utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_5__._setSpanForScope)((0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)(), span);
  _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_3__.debug.log("[Tracing] Started span is an idle span");
  return span;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/tracing/logSpans.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/tracing/logSpans.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   logSpanEnd: () => (/* binding */ logSpanEnd),
/* harmony export */   logSpanStart: () => (/* binding */ logSpanStart)
/* harmony export */ });
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");



function logSpanStart(span) {
  if (!_debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD) return;
  const { description = "< unknown name >", op = "< unknown op >", parent_span_id: parentSpanId } = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_2__.spanToJSON)(span);
  const { spanId } = span.spanContext();
  const sampled = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_2__.spanIsSampled)(span);
  const rootSpan = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_2__.getRootSpan)(span);
  const isRootSpan = rootSpan === span;
  const header = `[Tracing] Starting ${sampled ? "sampled" : "unsampled"} ${isRootSpan ? "root " : ""}span`;
  const infoParts = [`op: ${op}`, `name: ${description}`, `ID: ${spanId}`];
  if (parentSpanId) {
    infoParts.push(`parent ID: ${parentSpanId}`);
  }
  if (!isRootSpan) {
    const { op: op2, description: description2 } = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_2__.spanToJSON)(rootSpan);
    infoParts.push(`root ID: ${rootSpan.spanContext().spanId}`);
    if (op2) {
      infoParts.push(`root op: ${op2}`);
    }
    if (description2) {
      infoParts.push(`root description: ${description2}`);
    }
  }
  _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.log(`${header}
  ${infoParts.join("\n  ")}`);
}
function logSpanEnd(span) {
  if (!_debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD) return;
  const { description = "< unknown name >", op = "< unknown op >" } = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_2__.spanToJSON)(span);
  const { spanId } = span.spanContext();
  const rootSpan = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_2__.getRootSpan)(span);
  const isRootSpan = rootSpan === span;
  const msg = `[Tracing] Finishing "${op}" ${isRootSpan ? "root " : ""}span "${description}" with ID ${spanId}`;
  _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.log(msg);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/tracing/measurement.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/tracing/measurement.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setMeasurement: () => (/* binding */ setMeasurement),
/* harmony export */   timedEventsToMeasurements: () => (/* binding */ timedEventsToMeasurements)
/* harmony export */ });
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _semanticAttributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../semanticAttributes.js */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");




function setMeasurement(name, value, unit, activeSpan = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_3__.getActiveSpan)()) {
  const rootSpan = activeSpan && (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_3__.getRootSpan)(activeSpan);
  if (rootSpan) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.log(`[Measurement] Setting measurement on root span: ${name} = ${value} ${unit}`);
    rootSpan.addEvent(name, {
      [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE]: value,
      [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT]: unit
    });
  }
}
function timedEventsToMeasurements(events) {
  if (!events || events.length === 0) {
    return void 0;
  }
  const measurements = {};
  events.forEach((event) => {
    const attributes = event.attributes || {};
    const unit = attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT];
    const value = attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_1__.SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE];
    if (typeof unit === "string" && typeof value === "number") {
      measurements[event.name] = { value, unit };
    }
  });
  return measurements;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/tracing/sampling.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/tracing/sampling.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sampleSpan: () => (/* binding */ sampleSpan)
/* harmony export */ });
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_hasSpansEnabled_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/hasSpansEnabled.js */ "../../node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js");
/* harmony import */ var _utils_parseSampleRate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/parseSampleRate.js */ "../../node_modules/@sentry/core/build/esm/utils/parseSampleRate.js");




function sampleSpan(options, samplingContext, sampleRand) {
  if (!(0,_utils_hasSpansEnabled_js__WEBPACK_IMPORTED_MODULE_2__.hasSpansEnabled)(options)) {
    return [false];
  }
  let localSampleRateWasApplied = void 0;
  let sampleRate;
  if (typeof options.tracesSampler === "function") {
    sampleRate = options.tracesSampler({
      ...samplingContext,
      inheritOrSampleWith: (fallbackSampleRate) => {
        if (typeof samplingContext.parentSampleRate === "number") {
          return samplingContext.parentSampleRate;
        }
        if (typeof samplingContext.parentSampled === "boolean") {
          return Number(samplingContext.parentSampled);
        }
        return fallbackSampleRate;
      }
    });
    localSampleRateWasApplied = true;
  } else if (samplingContext.parentSampled !== void 0) {
    sampleRate = samplingContext.parentSampled;
  } else if (typeof options.tracesSampleRate !== "undefined") {
    sampleRate = options.tracesSampleRate;
    localSampleRateWasApplied = true;
  }
  const parsedSampleRate = (0,_utils_parseSampleRate_js__WEBPACK_IMPORTED_MODULE_3__.parseSampleRate)(sampleRate);
  if (parsedSampleRate === void 0) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.warn(
      `[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
        sampleRate
      )} of type ${JSON.stringify(typeof sampleRate)}.`
    );
    return [false];
  }
  if (!parsedSampleRate) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.log(
      `[Tracing] Discarding transaction because ${typeof options.tracesSampler === "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`
    );
    return [false, parsedSampleRate, localSampleRateWasApplied];
  }
  const shouldSample = sampleRand < parsedSampleRate;
  if (!shouldSample) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.log(
      `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
        sampleRate
      )})`
    );
  }
  return [shouldSample, parsedSampleRate, localSampleRateWasApplied];
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/tracing/sentryNonRecordingSpan.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/tracing/sentryNonRecordingSpan.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SentryNonRecordingSpan: () => (/* binding */ SentryNonRecordingSpan)
/* harmony export */ });
/* harmony import */ var _utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/propagationContext.js */ "../../node_modules/@sentry/core/build/esm/utils/propagationContext.js");
/* harmony import */ var _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");


class SentryNonRecordingSpan {
  constructor(spanContext = {}) {
    this._traceId = spanContext.traceId || (0,_utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_0__.generateTraceId)();
    this._spanId = spanContext.spanId || (0,_utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_0__.generateSpanId)();
  }
  /** @inheritdoc */
  spanContext() {
    return {
      spanId: this._spanId,
      traceId: this._traceId,
      traceFlags: _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_1__.TRACE_FLAG_NONE
    };
  }
  /** @inheritdoc */
  end(_timestamp) {
  }
  /** @inheritdoc */
  setAttribute(_key, _value) {
    return this;
  }
  /** @inheritdoc */
  setAttributes(_values) {
    return this;
  }
  /** @inheritdoc */
  setStatus(_status) {
    return this;
  }
  /** @inheritdoc */
  updateName(_name) {
    return this;
  }
  /** @inheritdoc */
  isRecording() {
    return false;
  }
  /** @inheritdoc */
  addEvent(_name, _attributesOrStartTime, _startTime) {
    return this;
  }
  /** @inheritDoc */
  addLink(_link) {
    return this;
  }
  /** @inheritDoc */
  addLinks(_links) {
    return this;
  }
  /**
   * This should generally not be used,
   * but we need it for being compliant with the OTEL Span interface.
   *
   * @hidden
   * @internal
   */
  recordException(_exception, _time) {
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/tracing/sentrySpan.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/tracing/sentrySpan.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SentrySpan: () => (/* binding */ SentrySpan)
/* harmony export */ });
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _envelope_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../envelope.js */ "../../node_modules/@sentry/core/build/esm/envelope.js");
/* harmony import */ var _semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../semanticAttributes.js */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/propagationContext.js */ "../../node_modules/@sentry/core/build/esm/utils/propagationContext.js");
/* harmony import */ var _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _utils_time_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/time.js */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dynamicSamplingContext.js */ "../../node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js");
/* harmony import */ var _logSpans_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./logSpans.js */ "../../node_modules/@sentry/core/build/esm/tracing/logSpans.js");
/* harmony import */ var _measurement_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./measurement.js */ "../../node_modules/@sentry/core/build/esm/tracing/measurement.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/@sentry/core/build/esm/tracing/utils.js");












const MAX_SPAN_COUNT = 1e3;
class SentrySpan {
  /** Epoch timestamp in seconds when the span started. */
  /** Epoch timestamp in seconds when the span ended. */
  /** Internal keeper of the status */
  /** The timed events added to this span. */
  /** if true, treat span as a standalone span (not part of a transaction) */
  /**
   * You should never call the constructor manually, always use `Sentry.startSpan()`
   * or other span methods.
   * @internal
   * @hideconstructor
   * @hidden
   */
  constructor(spanContext = {}) {
    this._traceId = spanContext.traceId || (0,_utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_5__.generateTraceId)();
    this._spanId = spanContext.spanId || (0,_utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_5__.generateSpanId)();
    this._startTime = spanContext.startTimestamp || (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_7__.timestampInSeconds)();
    this._links = spanContext.links;
    this._attributes = {};
    this.setAttributes({
      [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "manual",
      [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_OP]: spanContext.op,
      ...spanContext.attributes
    });
    this._name = spanContext.name;
    if (spanContext.parentSpanId) {
      this._parentSpanId = spanContext.parentSpanId;
    }
    if ("sampled" in spanContext) {
      this._sampled = spanContext.sampled;
    }
    if (spanContext.endTimestamp) {
      this._endTime = spanContext.endTimestamp;
    }
    this._events = [];
    this._isStandaloneSpan = spanContext.isStandalone;
    if (this._endTime) {
      this._onSpanEnded();
    }
  }
  /** @inheritDoc */
  addLink(link) {
    if (this._links) {
      this._links.push(link);
    } else {
      this._links = [link];
    }
    return this;
  }
  /** @inheritDoc */
  addLinks(links) {
    if (this._links) {
      this._links.push(...links);
    } else {
      this._links = links;
    }
    return this;
  }
  /**
   * This should generally not be used,
   * but it is needed for being compliant with the OTEL Span interface.
   *
   * @hidden
   * @internal
   */
  recordException(_exception, _time) {
  }
  /** @inheritdoc */
  spanContext() {
    const { _spanId: spanId, _traceId: traceId, _sampled: sampled } = this;
    return {
      spanId,
      traceId,
      traceFlags: sampled ? _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.TRACE_FLAG_SAMPLED : _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.TRACE_FLAG_NONE
    };
  }
  /** @inheritdoc */
  setAttribute(key, value) {
    if (value === void 0) {
      delete this._attributes[key];
    } else {
      this._attributes[key] = value;
    }
    return this;
  }
  /** @inheritdoc */
  setAttributes(attributes) {
    Object.keys(attributes).forEach((key) => this.setAttribute(key, attributes[key]));
    return this;
  }
  /**
   * This should generally not be used,
   * but we need it for browser tracing where we want to adjust the start time afterwards.
   * USE THIS WITH CAUTION!
   *
   * @hidden
   * @internal
   */
  updateStartTime(timeInput) {
    this._startTime = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.spanTimeInputToSeconds)(timeInput);
  }
  /**
   * @inheritDoc
   */
  setStatus(value) {
    this._status = value;
    return this;
  }
  /**
   * @inheritDoc
   */
  updateName(name) {
    this._name = name;
    this.setAttribute(_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "custom");
    return this;
  }
  /** @inheritdoc */
  end(endTimestamp) {
    if (this._endTime) {
      return;
    }
    this._endTime = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.spanTimeInputToSeconds)(endTimestamp);
    (0,_logSpans_js__WEBPACK_IMPORTED_MODULE_9__.logSpanEnd)(this);
    this._onSpanEnded();
  }
  /**
   * Get JSON representation of this span.
   *
   * @hidden
   * @internal This method is purely for internal purposes and should not be used outside
   * of SDK code. If you need to get a JSON representation of a span,
   * use `spanToJSON(span)` instead.
   */
  getSpanJSON() {
    return {
      data: this._attributes,
      description: this._name,
      op: this._attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_OP],
      parent_span_id: this._parentSpanId,
      span_id: this._spanId,
      start_timestamp: this._startTime,
      status: (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.getStatusMessage)(this._status),
      timestamp: this._endTime,
      trace_id: this._traceId,
      origin: this._attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
      profile_id: this._attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_PROFILE_ID],
      exclusive_time: this._attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME],
      measurements: (0,_measurement_js__WEBPACK_IMPORTED_MODULE_10__.timedEventsToMeasurements)(this._events),
      is_segment: this._isStandaloneSpan && (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.getRootSpan)(this) === this || void 0,
      segment_id: this._isStandaloneSpan ? (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.getRootSpan)(this).spanContext().spanId : void 0,
      links: (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.convertSpanLinksForEnvelope)(this._links)
    };
  }
  /** @inheritdoc */
  isRecording() {
    return !this._endTime && !!this._sampled;
  }
  /**
   * @inheritdoc
   */
  addEvent(name, attributesOrStartTime, startTime) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_4__.debug.log("[Tracing] Adding an event to span:", name);
    const time = isSpanTimeInput(attributesOrStartTime) ? attributesOrStartTime : startTime || (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_7__.timestampInSeconds)();
    const attributes = isSpanTimeInput(attributesOrStartTime) ? {} : attributesOrStartTime || {};
    const event = {
      name,
      time: (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.spanTimeInputToSeconds)(time),
      attributes
    };
    this._events.push(event);
    return this;
  }
  /**
   * This method should generally not be used,
   * but for now we need a way to publicly check if the `_isStandaloneSpan` flag is set.
   * USE THIS WITH CAUTION!
   * @internal
   * @hidden
   * @experimental
   */
  isStandaloneSpan() {
    return !!this._isStandaloneSpan;
  }
  /** Emit `spanEnd` when the span is ended. */
  _onSpanEnded() {
    const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)();
    if (client) {
      client.emit("spanEnd", this);
    }
    const isSegmentSpan = this._isStandaloneSpan || this === (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.getRootSpan)(this);
    if (!isSegmentSpan) {
      return;
    }
    if (this._isStandaloneSpan) {
      if (this._sampled) {
        sendSpanEnvelope((0,_envelope_js__WEBPACK_IMPORTED_MODULE_2__.createSpanEnvelope)([this], client));
      } else {
        _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_4__.debug.log("[Tracing] Discarding standalone span because its trace was not chosen to be sampled.");
        if (client) {
          client.recordDroppedEvent("sample_rate", "span");
        }
      }
      return;
    }
    const transactionEvent = this._convertSpanToTransaction();
    if (transactionEvent) {
      const scope = (0,_utils_js__WEBPACK_IMPORTED_MODULE_11__.getCapturedScopesOnSpan)(this).scope || (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)();
      scope.captureEvent(transactionEvent);
    }
  }
  /**
   * Finish the transaction & prepare the event to send to Sentry.
   */
  _convertSpanToTransaction() {
    var _a;
    if (!isFullFinishedSpan((0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(this))) {
      return void 0;
    }
    if (!this._name) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_4__.debug.warn("Transaction has no name, falling back to `<unlabeled transaction>`.");
      this._name = "<unlabeled transaction>";
    }
    const { scope: capturedSpanScope, isolationScope: capturedSpanIsolationScope } = (0,_utils_js__WEBPACK_IMPORTED_MODULE_11__.getCapturedScopesOnSpan)(this);
    const normalizedRequest = (_a = capturedSpanScope == null ? void 0 : capturedSpanScope.getScopeData().sdkProcessingMetadata) == null ? void 0 : _a.normalizedRequest;
    if (this._sampled !== true) {
      return void 0;
    }
    const finishedSpans = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.getSpanDescendants)(this).filter((span) => span !== this && !isStandaloneSpan(span));
    const spans = finishedSpans.map((span) => (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.spanToJSON)(span)).filter(isFullFinishedSpan);
    const source = this._attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
    delete this._attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
    spans.forEach((span) => {
      delete span.data[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
    });
    const transaction = {
      contexts: {
        trace: (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_6__.spanToTransactionTraceContext)(this)
      },
      spans: (
        // spans.sort() mutates the array, but `spans` is already a copy so we can safely do this here
        // we do not use spans anymore after this point
        spans.length > MAX_SPAN_COUNT ? spans.sort((a, b) => a.start_timestamp - b.start_timestamp).slice(0, MAX_SPAN_COUNT) : spans
      ),
      start_timestamp: this._startTime,
      timestamp: this._endTime,
      transaction: this._name,
      type: "transaction",
      sdkProcessingMetadata: {
        capturedSpanScope,
        capturedSpanIsolationScope,
        dynamicSamplingContext: (0,_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_8__.getDynamicSamplingContextFromSpan)(this)
      },
      request: normalizedRequest,
      ...source && {
        transaction_info: {
          source
        }
      }
    };
    const measurements = (0,_measurement_js__WEBPACK_IMPORTED_MODULE_10__.timedEventsToMeasurements)(this._events);
    const hasMeasurements = measurements && Object.keys(measurements).length;
    if (hasMeasurements) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_4__.debug.log(
        "[Measurements] Adding measurements to transaction event",
        JSON.stringify(measurements, void 0, 2)
      );
      transaction.measurements = measurements;
    }
    return transaction;
  }
}
function isSpanTimeInput(value) {
  return value && typeof value === "number" || value instanceof Date || Array.isArray(value);
}
function isFullFinishedSpan(input) {
  return !!input.start_timestamp && !!input.timestamp && !!input.span_id && !!input.trace_id;
}
function isStandaloneSpan(span) {
  return span instanceof SentrySpan && span.isStandaloneSpan();
}
function sendSpanEnvelope(envelope) {
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)();
  if (!client) {
    return;
  }
  const spanItems = envelope[1];
  if (!spanItems || spanItems.length === 0) {
    client.recordDroppedEvent("before_send", "span");
    return;
  }
  client.sendEnvelope(envelope);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/tracing/spanstatus.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/tracing/spanstatus.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SPAN_STATUS_ERROR: () => (/* binding */ SPAN_STATUS_ERROR),
/* harmony export */   SPAN_STATUS_OK: () => (/* binding */ SPAN_STATUS_OK),
/* harmony export */   SPAN_STATUS_UNSET: () => (/* binding */ SPAN_STATUS_UNSET),
/* harmony export */   setHttpStatus: () => (/* binding */ setHttpStatus)
/* harmony export */ });
/* unused harmony export getSpanStatusFromHttpCode */
const SPAN_STATUS_UNSET = 0;
const SPAN_STATUS_OK = 1;
const SPAN_STATUS_ERROR = 2;
function getSpanStatusFromHttpCode(httpStatus) {
  if (httpStatus < 400 && httpStatus >= 100) {
    return { code: SPAN_STATUS_OK };
  }
  if (httpStatus >= 400 && httpStatus < 500) {
    switch (httpStatus) {
      case 401:
        return { code: SPAN_STATUS_ERROR, message: "unauthenticated" };
      case 403:
        return { code: SPAN_STATUS_ERROR, message: "permission_denied" };
      case 404:
        return { code: SPAN_STATUS_ERROR, message: "not_found" };
      case 409:
        return { code: SPAN_STATUS_ERROR, message: "already_exists" };
      case 413:
        return { code: SPAN_STATUS_ERROR, message: "failed_precondition" };
      case 429:
        return { code: SPAN_STATUS_ERROR, message: "resource_exhausted" };
      case 499:
        return { code: SPAN_STATUS_ERROR, message: "cancelled" };
      default:
        return { code: SPAN_STATUS_ERROR, message: "invalid_argument" };
    }
  }
  if (httpStatus >= 500 && httpStatus < 600) {
    switch (httpStatus) {
      case 501:
        return { code: SPAN_STATUS_ERROR, message: "unimplemented" };
      case 503:
        return { code: SPAN_STATUS_ERROR, message: "unavailable" };
      case 504:
        return { code: SPAN_STATUS_ERROR, message: "deadline_exceeded" };
      default:
        return { code: SPAN_STATUS_ERROR, message: "internal_error" };
    }
  }
  return { code: SPAN_STATUS_ERROR, message: "unknown_error" };
}
function setHttpStatus(span, httpStatus) {
  span.setAttribute("http.response.status_code", httpStatus);
  const spanStatus = getSpanStatusFromHttpCode(httpStatus);
  if (spanStatus.message !== "unknown_error") {
    span.setStatus(spanStatus);
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/tracing/trace.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/tracing/trace.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startInactiveSpan: () => (/* binding */ startInactiveSpan),
/* harmony export */   startSpan: () => (/* binding */ startSpan),
/* harmony export */   withActiveSpan: () => (/* binding */ withActiveSpan)
/* harmony export */ });
/* unused harmony exports continueTrace, startNewTrace, startSpanManual, suppressTracing */
/* harmony import */ var _asyncContext_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../asyncContext/index.js */ "../../node_modules/@sentry/core/build/esm/asyncContext/index.js");
/* harmony import */ var _carrier_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../carrier.js */ "../../node_modules/@sentry/core/build/esm/carrier.js");
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _semanticAttributes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../semanticAttributes.js */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _utils_baggage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/baggage.js */ "../../node_modules/@sentry/core/build/esm/utils/baggage.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_handleCallbackErrors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/handleCallbackErrors.js */ "../../node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js");
/* harmony import */ var _utils_hasSpansEnabled_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/hasSpansEnabled.js */ "../../node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js");
/* harmony import */ var _utils_parseSampleRate_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/parseSampleRate.js */ "../../node_modules/@sentry/core/build/esm/utils/parseSampleRate.js");
/* harmony import */ var _utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/propagationContext.js */ "../../node_modules/@sentry/core/build/esm/utils/propagationContext.js");
/* harmony import */ var _utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/spanOnScope.js */ "../../node_modules/@sentry/core/build/esm/utils/spanOnScope.js");
/* harmony import */ var _utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _utils_tracing_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/tracing.js */ "../../node_modules/@sentry/core/build/esm/utils/tracing.js");
/* harmony import */ var _dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dynamicSamplingContext.js */ "../../node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js");
/* harmony import */ var _logSpans_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./logSpans.js */ "../../node_modules/@sentry/core/build/esm/tracing/logSpans.js");
/* harmony import */ var _sampling_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./sampling.js */ "../../node_modules/@sentry/core/build/esm/tracing/sampling.js");
/* harmony import */ var _sentryNonRecordingSpan_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./sentryNonRecordingSpan.js */ "../../node_modules/@sentry/core/build/esm/tracing/sentryNonRecordingSpan.js");
/* harmony import */ var _sentrySpan_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./sentrySpan.js */ "../../node_modules/@sentry/core/build/esm/tracing/sentrySpan.js");
/* harmony import */ var _spanstatus_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./spanstatus.js */ "../../node_modules/@sentry/core/build/esm/tracing/spanstatus.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./utils.js */ "../../node_modules/@sentry/core/build/esm/tracing/utils.js");





















const SUPPRESS_TRACING_KEY = "__SENTRY_SUPPRESS_TRACING__";
function startSpan(options, callback) {
  const acs = getAcs();
  if (acs.startSpan) {
    return acs.startSpan(options, callback);
  }
  const spanArguments = parseSentrySpanArguments(options);
  const { forceTransaction, parentSpan: customParentSpan, scope: customScope } = options;
  const customForkedScope = customScope == null ? void 0 : customScope.clone();
  return (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.withScope)(customForkedScope, () => {
    const wrapper = getActiveSpanWrapper(customParentSpan);
    return wrapper(() => {
      const scope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getCurrentScope)();
      const parentSpan = getParentSpan(scope, customParentSpan);
      const shouldSkipSpan = options.onlyIfParent && !parentSpan;
      const activeSpan = shouldSkipSpan ? new _sentryNonRecordingSpan_js__WEBPACK_IMPORTED_MODULE_17__.SentryNonRecordingSpan() : createChildOrRootSpan({
        parentSpan,
        spanArguments,
        forceTransaction,
        scope
      });
      (0,_utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_11__._setSpanForScope)(scope, activeSpan);
      return (0,_utils_handleCallbackErrors_js__WEBPACK_IMPORTED_MODULE_7__.handleCallbackErrors)(
        () => callback(activeSpan),
        () => {
          const { status } = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_12__.spanToJSON)(activeSpan);
          if (activeSpan.isRecording() && (!status || status === "ok")) {
            activeSpan.setStatus({ code: _spanstatus_js__WEBPACK_IMPORTED_MODULE_19__.SPAN_STATUS_ERROR, message: "internal_error" });
          }
        },
        () => {
          activeSpan.end();
        }
      );
    });
  });
}
function startSpanManual(options, callback) {
  const acs = getAcs();
  if (acs.startSpanManual) {
    return acs.startSpanManual(options, callback);
  }
  const spanArguments = parseSentrySpanArguments(options);
  const { forceTransaction, parentSpan: customParentSpan, scope: customScope } = options;
  const customForkedScope = customScope == null ? void 0 : customScope.clone();
  return (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.withScope)(customForkedScope, () => {
    const wrapper = getActiveSpanWrapper(customParentSpan);
    return wrapper(() => {
      const scope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getCurrentScope)();
      const parentSpan = getParentSpan(scope, customParentSpan);
      const shouldSkipSpan = options.onlyIfParent && !parentSpan;
      const activeSpan = shouldSkipSpan ? new _sentryNonRecordingSpan_js__WEBPACK_IMPORTED_MODULE_17__.SentryNonRecordingSpan() : createChildOrRootSpan({
        parentSpan,
        spanArguments,
        forceTransaction,
        scope
      });
      (0,_utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_11__._setSpanForScope)(scope, activeSpan);
      return (0,_utils_handleCallbackErrors_js__WEBPACK_IMPORTED_MODULE_7__.handleCallbackErrors)(
        // We pass the `finish` function to the callback, so the user can finish the span manually
        // this is mainly here for historic purposes because previously, we instructed users to call
        // `finish` instead of `span.end()` to also clean up the scope. Nowadays, calling `span.end()`
        // or `finish` has the same effect and we simply leave it here to avoid breaking user code.
        () => callback(activeSpan, () => activeSpan.end()),
        () => {
          const { status } = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_12__.spanToJSON)(activeSpan);
          if (activeSpan.isRecording() && (!status || status === "ok")) {
            activeSpan.setStatus({ code: _spanstatus_js__WEBPACK_IMPORTED_MODULE_19__.SPAN_STATUS_ERROR, message: "internal_error" });
          }
        }
      );
    });
  });
}
function startInactiveSpan(options) {
  const acs = getAcs();
  if (acs.startInactiveSpan) {
    return acs.startInactiveSpan(options);
  }
  const spanArguments = parseSentrySpanArguments(options);
  const { forceTransaction, parentSpan: customParentSpan } = options;
  const wrapper = options.scope ? (callback) => (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.withScope)(options.scope, callback) : customParentSpan !== void 0 ? (callback) => withActiveSpan(customParentSpan, callback) : (callback) => callback();
  return wrapper(() => {
    const scope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getCurrentScope)();
    const parentSpan = getParentSpan(scope, customParentSpan);
    const shouldSkipSpan = options.onlyIfParent && !parentSpan;
    if (shouldSkipSpan) {
      return new _sentryNonRecordingSpan_js__WEBPACK_IMPORTED_MODULE_17__.SentryNonRecordingSpan();
    }
    return createChildOrRootSpan({
      parentSpan,
      spanArguments,
      forceTransaction,
      scope
    });
  });
}
const continueTrace = (options, callback) => {
  const carrier = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_1__.getMainCarrier)();
  const acs = (0,_asyncContext_index_js__WEBPACK_IMPORTED_MODULE_0__.getAsyncContextStrategy)(carrier);
  if (acs.continueTrace) {
    return acs.continueTrace(options, callback);
  }
  const { sentryTrace, baggage } = options;
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getClient)();
  const incomingDsc = (0,_utils_baggage_js__WEBPACK_IMPORTED_MODULE_5__.baggageHeaderToDynamicSamplingContext)(baggage);
  if (client && !(0,_utils_tracing_js__WEBPACK_IMPORTED_MODULE_13__.shouldContinueTrace)(client, incomingDsc == null ? void 0 : incomingDsc.org_id)) {
    return startNewTrace(callback);
  }
  return (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.withScope)((scope) => {
    const propagationContext = (0,_utils_tracing_js__WEBPACK_IMPORTED_MODULE_13__.propagationContextFromHeaders)(sentryTrace, baggage);
    scope.setPropagationContext(propagationContext);
    return callback();
  });
};
function withActiveSpan(span, callback) {
  const acs = getAcs();
  if (acs.withActiveSpan) {
    return acs.withActiveSpan(span, callback);
  }
  return (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.withScope)((scope) => {
    (0,_utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_11__._setSpanForScope)(scope, span || void 0);
    return callback(scope);
  });
}
function suppressTracing(callback) {
  const acs = getAcs();
  if (acs.suppressTracing) {
    return acs.suppressTracing(callback);
  }
  return (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.withScope)((scope) => {
    scope.setSDKProcessingMetadata({ [SUPPRESS_TRACING_KEY]: true });
    const res = callback();
    scope.setSDKProcessingMetadata({ [SUPPRESS_TRACING_KEY]: void 0 });
    return res;
  });
}
function startNewTrace(callback) {
  return (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.withScope)((scope) => {
    scope.setPropagationContext({
      traceId: (0,_utils_propagationContext_js__WEBPACK_IMPORTED_MODULE_10__.generateTraceId)(),
      sampleRand: Math.random()
    });
    _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_6__.debug.log(`Starting a new trace with id ${scope.getPropagationContext().traceId}`);
    return withActiveSpan(null, callback);
  });
}
function createChildOrRootSpan({
  parentSpan,
  spanArguments,
  forceTransaction,
  scope
}) {
  if (!(0,_utils_hasSpansEnabled_js__WEBPACK_IMPORTED_MODULE_8__.hasSpansEnabled)()) {
    const span2 = new _sentryNonRecordingSpan_js__WEBPACK_IMPORTED_MODULE_17__.SentryNonRecordingSpan();
    if (forceTransaction || !parentSpan) {
      const dsc = {
        sampled: "false",
        sample_rate: "0",
        transaction: spanArguments.name,
        ...(0,_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_14__.getDynamicSamplingContextFromSpan)(span2)
      };
      (0,_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_14__.freezeDscOnSpan)(span2, dsc);
    }
    return span2;
  }
  const isolationScope = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getIsolationScope)();
  let span;
  if (parentSpan && !forceTransaction) {
    span = _startChildSpan(parentSpan, scope, spanArguments);
    (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_12__.addChildSpanToSpan)(parentSpan, span);
  } else if (parentSpan) {
    const dsc = (0,_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_14__.getDynamicSamplingContextFromSpan)(parentSpan);
    const { traceId, spanId: parentSpanId } = parentSpan.spanContext();
    const parentSampled = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_12__.spanIsSampled)(parentSpan);
    span = _startRootSpan(
      {
        traceId,
        parentSpanId,
        ...spanArguments
      },
      scope,
      parentSampled
    );
    (0,_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_14__.freezeDscOnSpan)(span, dsc);
  } else {
    const {
      traceId,
      dsc,
      parentSpanId,
      sampled: parentSampled
    } = {
      ...isolationScope.getPropagationContext(),
      ...scope.getPropagationContext()
    };
    span = _startRootSpan(
      {
        traceId,
        parentSpanId,
        ...spanArguments
      },
      scope,
      parentSampled
    );
    if (dsc) {
      (0,_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_14__.freezeDscOnSpan)(span, dsc);
    }
  }
  (0,_logSpans_js__WEBPACK_IMPORTED_MODULE_15__.logSpanStart)(span);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_20__.setCapturedScopesOnSpan)(span, scope, isolationScope);
  return span;
}
function parseSentrySpanArguments(options) {
  const exp = options.experimental || {};
  const initialCtx = {
    isStandalone: exp.standalone,
    ...options
  };
  if (options.startTime) {
    const ctx = { ...initialCtx };
    ctx.startTimestamp = (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_12__.spanTimeInputToSeconds)(options.startTime);
    delete ctx.startTime;
    return ctx;
  }
  return initialCtx;
}
function getAcs() {
  const carrier = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_1__.getMainCarrier)();
  return (0,_asyncContext_index_js__WEBPACK_IMPORTED_MODULE_0__.getAsyncContextStrategy)(carrier);
}
function _startRootSpan(spanArguments, scope, parentSampled) {
  var _a, _b;
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getClient)();
  const options = (client == null ? void 0 : client.getOptions()) || {};
  const { name = "" } = spanArguments;
  const mutableSpanSamplingData = { spanAttributes: { ...spanArguments.attributes }, spanName: name, parentSampled };
  client == null ? void 0 : client.emit("beforeSampling", mutableSpanSamplingData, { decision: false });
  const finalParentSampled = (_a = mutableSpanSamplingData.parentSampled) != null ? _a : parentSampled;
  const finalAttributes = mutableSpanSamplingData.spanAttributes;
  const currentPropagationContext = scope.getPropagationContext();
  const [sampled, sampleRate, localSampleRateWasApplied] = scope.getScopeData().sdkProcessingMetadata[SUPPRESS_TRACING_KEY] ? [false] : (0,_sampling_js__WEBPACK_IMPORTED_MODULE_16__.sampleSpan)(
    options,
    {
      name,
      parentSampled: finalParentSampled,
      attributes: finalAttributes,
      parentSampleRate: (0,_utils_parseSampleRate_js__WEBPACK_IMPORTED_MODULE_9__.parseSampleRate)((_b = currentPropagationContext.dsc) == null ? void 0 : _b.sample_rate)
    },
    currentPropagationContext.sampleRand
  );
  const rootSpan = new _sentrySpan_js__WEBPACK_IMPORTED_MODULE_18__.SentrySpan({
    ...spanArguments,
    attributes: {
      [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_4__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "custom",
      [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_4__.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]: sampleRate !== void 0 && localSampleRateWasApplied ? sampleRate : void 0,
      ...finalAttributes
    },
    sampled
  });
  if (!sampled && client) {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_6__.debug.log("[Tracing] Discarding root span because its trace was not chosen to be sampled.");
    client.recordDroppedEvent("sample_rate", "transaction");
  }
  if (client) {
    client.emit("spanStart", rootSpan);
  }
  return rootSpan;
}
function _startChildSpan(parentSpan, scope, spanArguments) {
  const { spanId, traceId } = parentSpan.spanContext();
  const sampled = scope.getScopeData().sdkProcessingMetadata[SUPPRESS_TRACING_KEY] ? false : (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_12__.spanIsSampled)(parentSpan);
  const childSpan = sampled ? new _sentrySpan_js__WEBPACK_IMPORTED_MODULE_18__.SentrySpan({
    ...spanArguments,
    parentSpanId: spanId,
    traceId,
    sampled
  }) : new _sentryNonRecordingSpan_js__WEBPACK_IMPORTED_MODULE_17__.SentryNonRecordingSpan({ traceId });
  (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_12__.addChildSpanToSpan)(parentSpan, childSpan);
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getClient)();
  if (client) {
    client.emit("spanStart", childSpan);
    if (spanArguments.endTimestamp) {
      client.emit("spanEnd", childSpan);
    }
  }
  return childSpan;
}
function getParentSpan(scope, customParentSpan) {
  if (customParentSpan) {
    return customParentSpan;
  }
  if (customParentSpan === null) {
    return void 0;
  }
  const span = (0,_utils_spanOnScope_js__WEBPACK_IMPORTED_MODULE_11__._getSpanForScope)(scope);
  if (!span) {
    return void 0;
  }
  const client = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getClient)();
  const options = client ? client.getOptions() : {};
  if (options.parentSpanIsAlwaysRootSpan) {
    return (0,_utils_spanUtils_js__WEBPACK_IMPORTED_MODULE_12__.getRootSpan)(span);
  }
  return span;
}
function getActiveSpanWrapper(parentSpan) {
  return parentSpan !== void 0 ? (callback) => {
    return withActiveSpan(parentSpan, callback);
  } : (callback) => callback();
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/tracing/utils.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/tracing/utils.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCapturedScopesOnSpan: () => (/* binding */ getCapturedScopesOnSpan),
/* harmony export */   setCapturedScopesOnSpan: () => (/* binding */ setCapturedScopesOnSpan)
/* harmony export */ });
/* harmony import */ var _utils_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/object.js */ "../../node_modules/@sentry/core/build/esm/utils/object.js");

const SCOPE_ON_START_SPAN_FIELD = "_sentryScope";
const ISOLATION_SCOPE_ON_START_SPAN_FIELD = "_sentryIsolationScope";
function setCapturedScopesOnSpan(span, scope, isolationScope) {
  if (span) {
    (0,_utils_object_js__WEBPACK_IMPORTED_MODULE_0__.addNonEnumerableProperty)(span, ISOLATION_SCOPE_ON_START_SPAN_FIELD, isolationScope);
    (0,_utils_object_js__WEBPACK_IMPORTED_MODULE_0__.addNonEnumerableProperty)(span, SCOPE_ON_START_SPAN_FIELD, scope);
  }
}
function getCapturedScopesOnSpan(span) {
  return {
    scope: span[SCOPE_ON_START_SPAN_FIELD],
    isolationScope: span[ISOLATION_SCOPE_ON_START_SPAN_FIELD]
  };
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/transports/base.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/transports/base.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTransport: () => (/* binding */ createTransport)
/* harmony export */ });
/* unused harmony export DEFAULT_TRANSPORT_BUFFER_SIZE */
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/envelope.js */ "../../node_modules/@sentry/core/build/esm/utils/envelope.js");
/* harmony import */ var _utils_promisebuffer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/promisebuffer.js */ "../../node_modules/@sentry/core/build/esm/utils/promisebuffer.js");
/* harmony import */ var _utils_ratelimit_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/ratelimit.js */ "../../node_modules/@sentry/core/build/esm/utils/ratelimit.js");
/* harmony import */ var _utils_syncpromise_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/syncpromise.js */ "../../node_modules/@sentry/core/build/esm/utils/syncpromise.js");






const DEFAULT_TRANSPORT_BUFFER_SIZE = 64;
function createTransport(options, makeRequest, buffer = (0,_utils_promisebuffer_js__WEBPACK_IMPORTED_MODULE_3__.makePromiseBuffer)(
  options.bufferSize || DEFAULT_TRANSPORT_BUFFER_SIZE
)) {
  let rateLimits = {};
  const flush = (timeout) => buffer.drain(timeout);
  function send(envelope) {
    const filteredEnvelopeItems = [];
    (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.forEachEnvelopeItem)(envelope, (item, type) => {
      const dataCategory = (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.envelopeItemTypeToDataCategory)(type);
      if ((0,_utils_ratelimit_js__WEBPACK_IMPORTED_MODULE_4__.isRateLimited)(rateLimits, dataCategory)) {
        options.recordDroppedEvent("ratelimit_backoff", dataCategory);
      } else {
        filteredEnvelopeItems.push(item);
      }
    });
    if (filteredEnvelopeItems.length === 0) {
      return (0,_utils_syncpromise_js__WEBPACK_IMPORTED_MODULE_5__.resolvedSyncPromise)({});
    }
    const filteredEnvelope = (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.createEnvelope)(envelope[0], filteredEnvelopeItems);
    const recordEnvelopeLoss = (reason) => {
      (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.forEachEnvelopeItem)(filteredEnvelope, (item, type) => {
        options.recordDroppedEvent(reason, (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.envelopeItemTypeToDataCategory)(type));
      });
    };
    const requestTask = () => makeRequest({ body: (0,_utils_envelope_js__WEBPACK_IMPORTED_MODULE_2__.serializeEnvelope)(filteredEnvelope) }).then(
      (response) => {
        if (response.statusCode !== void 0 && (response.statusCode < 200 || response.statusCode >= 300)) {
          _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.warn(`Sentry responded with status code ${response.statusCode} to sent event.`);
        }
        rateLimits = (0,_utils_ratelimit_js__WEBPACK_IMPORTED_MODULE_4__.updateRateLimits)(rateLimits, response);
        return response;
      },
      (error) => {
        recordEnvelopeLoss("network_error");
        _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.error("Encountered error running transport request:", error);
        throw error;
      }
    );
    return buffer.add(requestTask).then(
      (result) => result,
      (error) => {
        if (error === _utils_promisebuffer_js__WEBPACK_IMPORTED_MODULE_3__.SENTRY_BUFFER_FULL_ERROR) {
          _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _utils_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.error("Skipped sending event because buffer is full.");
          recordEnvelopeLoss("queue_overflow");
          return (0,_utils_syncpromise_js__WEBPACK_IMPORTED_MODULE_5__.resolvedSyncPromise)({});
        } else {
          throw error;
        }
      }
    );
  }
  return {
    send,
    flush
  };
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/aggregate-errors.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/aggregate-errors.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyAggregateErrorsToEvent: () => (/* binding */ applyAggregateErrorsToEvent)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");

function applyAggregateErrorsToEvent(exceptionFromErrorImplementation, parser, key, limit, event, hint) {
  var _a;
  if (!((_a = event.exception) == null ? void 0 : _a.values) || !hint || !(0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isInstanceOf)(hint.originalException, Error)) {
    return;
  }
  const originalException = event.exception.values.length > 0 ? event.exception.values[event.exception.values.length - 1] : void 0;
  if (originalException) {
    event.exception.values = aggregateExceptionsFromError(
      exceptionFromErrorImplementation,
      parser,
      limit,
      hint.originalException,
      key,
      event.exception.values,
      originalException,
      0
    );
  }
}
function aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, error, key, prevExceptions, exception, exceptionId) {
  if (prevExceptions.length >= limit + 1) {
    return prevExceptions;
  }
  let newExceptions = [...prevExceptions];
  if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isInstanceOf)(error[key], Error)) {
    applyExceptionGroupFieldsForParentException(exception, exceptionId);
    const newException = exceptionFromErrorImplementation(parser, error[key]);
    const newExceptionId = newExceptions.length;
    applyExceptionGroupFieldsForChildException(newException, key, newExceptionId, exceptionId);
    newExceptions = aggregateExceptionsFromError(
      exceptionFromErrorImplementation,
      parser,
      limit,
      error[key],
      key,
      [newException, ...newExceptions],
      newException,
      newExceptionId
    );
  }
  if (Array.isArray(error.errors)) {
    error.errors.forEach((childError, i) => {
      if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isInstanceOf)(childError, Error)) {
        applyExceptionGroupFieldsForParentException(exception, exceptionId);
        const newException = exceptionFromErrorImplementation(parser, childError);
        const newExceptionId = newExceptions.length;
        applyExceptionGroupFieldsForChildException(newException, `errors[${i}]`, newExceptionId, exceptionId);
        newExceptions = aggregateExceptionsFromError(
          exceptionFromErrorImplementation,
          parser,
          limit,
          childError,
          key,
          [newException, ...newExceptions],
          newException,
          newExceptionId
        );
      }
    });
  }
  return newExceptions;
}
function applyExceptionGroupFieldsForParentException(exception, exceptionId) {
  exception.mechanism = exception.mechanism || { type: "generic", handled: true };
  exception.mechanism = {
    ...exception.mechanism,
    ...exception.type === "AggregateError" && { is_exception_group: true },
    exception_id: exceptionId
  };
}
function applyExceptionGroupFieldsForChildException(exception, source, exceptionId, parentId) {
  exception.mechanism = exception.mechanism || { type: "generic", handled: true };
  exception.mechanism = {
    ...exception.mechanism,
    type: "chained",
    source,
    exception_id: exceptionId,
    parent_id: parentId
  };
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/applyScopeDataToEvent.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/applyScopeDataToEvent.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyScopeDataToEvent: () => (/* binding */ applyScopeDataToEvent),
/* harmony export */   mergeScopeData: () => (/* binding */ mergeScopeData)
/* harmony export */ });
/* unused harmony export mergeAndOverwriteScopeData */
/* harmony import */ var _tracing_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tracing/dynamicSamplingContext.js */ "../../node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js");
/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./merge.js */ "../../node_modules/@sentry/core/build/esm/utils/merge.js");
/* harmony import */ var _spanUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");



function applyScopeDataToEvent(event, data) {
  const { fingerprint, span, breadcrumbs, sdkProcessingMetadata } = data;
  applyDataToEvent(event, data);
  if (span) {
    applySpanToEvent(event, span);
  }
  applyFingerprintToEvent(event, fingerprint);
  applyBreadcrumbsToEvent(event, breadcrumbs);
  applySdkMetadataToEvent(event, sdkProcessingMetadata);
}
function mergeScopeData(data, mergeData) {
  const {
    extra,
    tags,
    user,
    contexts,
    level,
    sdkProcessingMetadata,
    breadcrumbs,
    fingerprint,
    eventProcessors,
    attachments,
    propagationContext,
    transactionName,
    span
  } = mergeData;
  mergeAndOverwriteScopeData(data, "extra", extra);
  mergeAndOverwriteScopeData(data, "tags", tags);
  mergeAndOverwriteScopeData(data, "user", user);
  mergeAndOverwriteScopeData(data, "contexts", contexts);
  data.sdkProcessingMetadata = (0,_merge_js__WEBPACK_IMPORTED_MODULE_1__.merge)(data.sdkProcessingMetadata, sdkProcessingMetadata, 2);
  if (level) {
    data.level = level;
  }
  if (transactionName) {
    data.transactionName = transactionName;
  }
  if (span) {
    data.span = span;
  }
  if (breadcrumbs.length) {
    data.breadcrumbs = [...data.breadcrumbs, ...breadcrumbs];
  }
  if (fingerprint.length) {
    data.fingerprint = [...data.fingerprint, ...fingerprint];
  }
  if (eventProcessors.length) {
    data.eventProcessors = [...data.eventProcessors, ...eventProcessors];
  }
  if (attachments.length) {
    data.attachments = [...data.attachments, ...attachments];
  }
  data.propagationContext = { ...data.propagationContext, ...propagationContext };
}
function mergeAndOverwriteScopeData(data, prop, mergeVal) {
  data[prop] = (0,_merge_js__WEBPACK_IMPORTED_MODULE_1__.merge)(data[prop], mergeVal, 1);
}
function applyDataToEvent(event, data) {
  const { extra, tags, user, contexts, level, transactionName } = data;
  if (Object.keys(extra).length) {
    event.extra = { ...extra, ...event.extra };
  }
  if (Object.keys(tags).length) {
    event.tags = { ...tags, ...event.tags };
  }
  if (Object.keys(user).length) {
    event.user = { ...user, ...event.user };
  }
  if (Object.keys(contexts).length) {
    event.contexts = { ...contexts, ...event.contexts };
  }
  if (level) {
    event.level = level;
  }
  if (transactionName && event.type !== "transaction") {
    event.transaction = transactionName;
  }
}
function applyBreadcrumbsToEvent(event, breadcrumbs) {
  const mergedBreadcrumbs = [...event.breadcrumbs || [], ...breadcrumbs];
  event.breadcrumbs = mergedBreadcrumbs.length ? mergedBreadcrumbs : void 0;
}
function applySdkMetadataToEvent(event, sdkProcessingMetadata) {
  event.sdkProcessingMetadata = {
    ...event.sdkProcessingMetadata,
    ...sdkProcessingMetadata
  };
}
function applySpanToEvent(event, span) {
  event.contexts = {
    trace: (0,_spanUtils_js__WEBPACK_IMPORTED_MODULE_2__.spanToTraceContext)(span),
    ...event.contexts
  };
  event.sdkProcessingMetadata = {
    dynamicSamplingContext: (0,_tracing_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_0__.getDynamicSamplingContextFromSpan)(span),
    ...event.sdkProcessingMetadata
  };
  const rootSpan = (0,_spanUtils_js__WEBPACK_IMPORTED_MODULE_2__.getRootSpan)(span);
  const transactionName = (0,_spanUtils_js__WEBPACK_IMPORTED_MODULE_2__.spanToJSON)(rootSpan).description;
  if (transactionName && !event.transaction && event.type === "transaction") {
    event.transaction = transactionName;
  }
}
function applyFingerprintToEvent(event, fingerprint) {
  event.fingerprint = event.fingerprint ? Array.isArray(event.fingerprint) ? event.fingerprint : [event.fingerprint] : [];
  if (fingerprint) {
    event.fingerprint = event.fingerprint.concat(fingerprint);
  }
  if (!event.fingerprint.length) {
    delete event.fingerprint;
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/baggage.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/baggage.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SENTRY_BAGGAGE_KEY_PREFIX: () => (/* binding */ SENTRY_BAGGAGE_KEY_PREFIX),
/* harmony export */   baggageHeaderToDynamicSamplingContext: () => (/* binding */ baggageHeaderToDynamicSamplingContext),
/* harmony export */   dynamicSamplingContextToSentryBaggageHeader: () => (/* binding */ dynamicSamplingContextToSentryBaggageHeader)
/* harmony export */ });
/* unused harmony exports MAX_BAGGAGE_STRING_LENGTH, SENTRY_BAGGAGE_KEY_PREFIX_REGEX, objectToBaggageHeader, parseBaggageHeader */
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _debug_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");



const SENTRY_BAGGAGE_KEY_PREFIX = "sentry-";
const SENTRY_BAGGAGE_KEY_PREFIX_REGEX = /^sentry-/;
const MAX_BAGGAGE_STRING_LENGTH = 8192;
function baggageHeaderToDynamicSamplingContext(baggageHeader) {
  const baggageObject = parseBaggageHeader(baggageHeader);
  if (!baggageObject) {
    return void 0;
  }
  const dynamicSamplingContext = Object.entries(baggageObject).reduce((acc, [key, value]) => {
    if (key.match(SENTRY_BAGGAGE_KEY_PREFIX_REGEX)) {
      const nonPrefixedKey = key.slice(SENTRY_BAGGAGE_KEY_PREFIX.length);
      acc[nonPrefixedKey] = value;
    }
    return acc;
  }, {});
  if (Object.keys(dynamicSamplingContext).length > 0) {
    return dynamicSamplingContext;
  } else {
    return void 0;
  }
}
function dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext) {
  if (!dynamicSamplingContext) {
    return void 0;
  }
  const sentryPrefixedDSC = Object.entries(dynamicSamplingContext).reduce(
    (acc, [dscKey, dscValue]) => {
      if (dscValue) {
        acc[`${SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`] = dscValue;
      }
      return acc;
    },
    {}
  );
  return objectToBaggageHeader(sentryPrefixedDSC);
}
function parseBaggageHeader(baggageHeader) {
  if (!baggageHeader || !(0,_is_js__WEBPACK_IMPORTED_MODULE_2__.isString)(baggageHeader) && !Array.isArray(baggageHeader)) {
    return void 0;
  }
  if (Array.isArray(baggageHeader)) {
    return baggageHeader.reduce((acc, curr) => {
      const currBaggageObject = baggageHeaderToObject(curr);
      Object.entries(currBaggageObject).forEach(([key, value]) => {
        acc[key] = value;
      });
      return acc;
    }, {});
  }
  return baggageHeaderToObject(baggageHeader);
}
function baggageHeaderToObject(baggageHeader) {
  return baggageHeader.split(",").map(
    (baggageEntry) => baggageEntry.split("=").map((keyOrValue) => {
      try {
        return decodeURIComponent(keyOrValue.trim());
      } catch {
        return;
      }
    })
  ).reduce((acc, [key, value]) => {
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});
}
function objectToBaggageHeader(object) {
  if (Object.keys(object).length === 0) {
    return void 0;
  }
  return Object.entries(object).reduce((baggageHeader, [objectKey, objectValue], currentIndex) => {
    const baggageEntry = `${encodeURIComponent(objectKey)}=${encodeURIComponent(objectValue)}`;
    const newBaggageHeader = currentIndex === 0 ? baggageEntry : `${baggageHeader},${baggageEntry}`;
    if (newBaggageHeader.length > MAX_BAGGAGE_STRING_LENGTH) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.warn(
        `Not adding key: ${objectKey} with val: ${objectValue} to baggage header due to exceeding baggage size limits.`
      );
      return baggageHeader;
    } else {
      return newBaggageHeader;
    }
  }, "");
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/breadcrumb-log-level.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/breadcrumb-log-level.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBreadcrumbLogLevelFromHttpStatusCode: () => (/* binding */ getBreadcrumbLogLevelFromHttpStatusCode)
/* harmony export */ });
function getBreadcrumbLogLevelFromHttpStatusCode(statusCode) {
  if (statusCode === void 0) {
    return void 0;
  } else if (statusCode >= 400 && statusCode < 500) {
    return "warning";
  } else if (statusCode >= 500) {
    return "error";
  } else {
    return void 0;
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/browser.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/browser.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getComponentName: () => (/* binding */ getComponentName),
/* harmony export */   getLocationHref: () => (/* binding */ getLocationHref),
/* harmony export */   htmlTreeAsString: () => (/* binding */ htmlTreeAsString)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");


const WINDOW = _worldwide_js__WEBPACK_IMPORTED_MODULE_1__.GLOBAL_OBJ;
const DEFAULT_MAX_STRING_LENGTH = 80;
function htmlTreeAsString(elem, options = {}) {
  if (!elem) {
    return "<unknown>";
  }
  try {
    let currentElem = elem;
    const MAX_TRAVERSE_HEIGHT = 5;
    const out = [];
    let height = 0;
    let len = 0;
    const separator = " > ";
    const sepLength = separator.length;
    let nextStr;
    const keyAttrs = Array.isArray(options) ? options : options.keyAttrs;
    const maxStringLength = !Array.isArray(options) && options.maxStringLength || DEFAULT_MAX_STRING_LENGTH;
    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
      nextStr = _htmlElementAsString(currentElem, keyAttrs);
      if (nextStr === "html" || height > 1 && len + out.length * sepLength + nextStr.length >= maxStringLength) {
        break;
      }
      out.push(nextStr);
      len += nextStr.length;
      currentElem = currentElem.parentNode;
    }
    return out.reverse().join(separator);
  } catch {
    return "<unknown>";
  }
}
function _htmlElementAsString(el, keyAttrs) {
  const elem = el;
  const out = [];
  if (!(elem == null ? void 0 : elem.tagName)) {
    return "";
  }
  if (WINDOW.HTMLElement) {
    if (elem instanceof HTMLElement && elem.dataset) {
      if (elem.dataset["sentryComponent"]) {
        return elem.dataset["sentryComponent"];
      }
      if (elem.dataset["sentryElement"]) {
        return elem.dataset["sentryElement"];
      }
    }
  }
  out.push(elem.tagName.toLowerCase());
  const keyAttrPairs = (keyAttrs == null ? void 0 : keyAttrs.length) ? keyAttrs.filter((keyAttr) => elem.getAttribute(keyAttr)).map((keyAttr) => [keyAttr, elem.getAttribute(keyAttr)]) : null;
  if (keyAttrPairs == null ? void 0 : keyAttrPairs.length) {
    keyAttrPairs.forEach((keyAttrPair) => {
      out.push(`[${keyAttrPair[0]}="${keyAttrPair[1]}"]`);
    });
  } else {
    if (elem.id) {
      out.push(`#${elem.id}`);
    }
    const className = elem.className;
    if (className && (0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isString)(className)) {
      const classes = className.split(/\s+/);
      for (const c of classes) {
        out.push(`.${c}`);
      }
    }
  }
  const allowedAttrs = ["aria-label", "type", "name", "title", "alt"];
  for (const k of allowedAttrs) {
    const attr = elem.getAttribute(k);
    if (attr) {
      out.push(`[${k}="${attr}"]`);
    }
  }
  return out.join("");
}
function getLocationHref() {
  try {
    return WINDOW.document.location.href;
  } catch {
    return "";
  }
}
function getComponentName(elem) {
  if (!WINDOW.HTMLElement) {
    return null;
  }
  let currentElem = elem;
  const MAX_TRAVERSE_HEIGHT = 5;
  for (let i = 0; i < MAX_TRAVERSE_HEIGHT; i++) {
    if (!currentElem) {
      return null;
    }
    if (currentElem instanceof HTMLElement) {
      if (currentElem.dataset["sentryComponent"]) {
        return currentElem.dataset["sentryComponent"];
      }
      if (currentElem.dataset["sentryElement"]) {
        return currentElem.dataset["sentryElement"];
      }
    }
    currentElem = currentElem.parentNode;
  }
  return null;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/clientreport.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/clientreport.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createClientReportEnvelope: () => (/* binding */ createClientReportEnvelope)
/* harmony export */ });
/* harmony import */ var _envelope_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./envelope.js */ "../../node_modules/@sentry/core/build/esm/utils/envelope.js");
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time.js */ "../../node_modules/@sentry/core/build/esm/utils/time.js");


function createClientReportEnvelope(discarded_events, dsn, timestamp) {
  const clientReportItem = [
    { type: "client_report" },
    {
      timestamp: timestamp || (0,_time_js__WEBPACK_IMPORTED_MODULE_1__.dateTimestampInSeconds)(),
      discarded_events
    }
  ];
  return (0,_envelope_js__WEBPACK_IMPORTED_MODULE_0__.createEnvelope)(dsn ? { dsn } : {}, [clientReportItem]);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/debounce.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/debounce.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce)
/* harmony export */ });
function debounce(func, wait, options) {
  let callbackReturnValue;
  let timerId;
  let maxTimerId;
  const maxWait = (options == null ? void 0 : options.maxWait) ? Math.max(options.maxWait, wait) : 0;
  const setTimeoutImpl = (options == null ? void 0 : options.setTimeoutImpl) || setTimeout;
  function invokeFunc() {
    cancelTimers();
    callbackReturnValue = func();
    return callbackReturnValue;
  }
  function cancelTimers() {
    timerId !== void 0 && clearTimeout(timerId);
    maxTimerId !== void 0 && clearTimeout(maxTimerId);
    timerId = maxTimerId = void 0;
  }
  function flush() {
    if (timerId !== void 0 || maxTimerId !== void 0) {
      return invokeFunc();
    }
    return callbackReturnValue;
  }
  function debounced() {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeoutImpl(invokeFunc, wait);
    if (maxWait && maxTimerId === void 0) {
      maxTimerId = setTimeoutImpl(invokeFunc, maxWait);
    }
    return callbackReturnValue;
  }
  debounced.cancel = cancelTimers;
  debounced.flush = flush;
  return debounced;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/debug-ids.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/debug-ids.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFilenameToDebugIdMap: () => (/* binding */ getFilenameToDebugIdMap)
/* harmony export */ });
/* unused harmony export getDebugImagesForResources */
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");

let parsedStackResults;
let lastKeysCount;
let cachedFilenameDebugIds;
function getFilenameToDebugIdMap(stackParser) {
  const debugIdMap = _worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ._sentryDebugIds;
  if (!debugIdMap) {
    return {};
  }
  const debugIdKeys = Object.keys(debugIdMap);
  if (cachedFilenameDebugIds && debugIdKeys.length === lastKeysCount) {
    return cachedFilenameDebugIds;
  }
  lastKeysCount = debugIdKeys.length;
  cachedFilenameDebugIds = debugIdKeys.reduce((acc, stackKey) => {
    if (!parsedStackResults) {
      parsedStackResults = {};
    }
    const result = parsedStackResults[stackKey];
    if (result) {
      acc[result[0]] = result[1];
    } else {
      const parsedStack = stackParser(stackKey);
      for (let i = parsedStack.length - 1; i >= 0; i--) {
        const stackFrame = parsedStack[i];
        const filename = stackFrame == null ? void 0 : stackFrame.filename;
        const debugId = debugIdMap[stackKey];
        if (filename && debugId) {
          acc[filename] = debugId;
          parsedStackResults[stackKey] = [filename, debugId];
          break;
        }
      }
    }
    return acc;
  }, {});
  return cachedFilenameDebugIds;
}
function getDebugImagesForResources(stackParser, resource_paths) {
  const filenameDebugIdMap = getFilenameToDebugIdMap(stackParser);
  if (!filenameDebugIdMap) {
    return [];
  }
  const images = [];
  for (const path of resource_paths) {
    if (path && filenameDebugIdMap[path]) {
      images.push({
        type: "sourcemap",
        code_file: path,
        debug_id: filenameDebugIdMap[path]
      });
    }
  }
  return images;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/debug-logger.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONSOLE_LEVELS: () => (/* binding */ CONSOLE_LEVELS),
/* harmony export */   consoleSandbox: () => (/* binding */ consoleSandbox),
/* harmony export */   debug: () => (/* binding */ debug),
/* harmony export */   originalConsoleMethods: () => (/* binding */ originalConsoleMethods)
/* harmony export */ });
/* harmony import */ var _carrier_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../carrier.js */ "../../node_modules/@sentry/core/build/esm/carrier.js");
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");



const CONSOLE_LEVELS = [
  "debug",
  "info",
  "warn",
  "error",
  "log",
  "assert",
  "trace"
];
const PREFIX = "Sentry Logger ";
const originalConsoleMethods = {};
function consoleSandbox(callback) {
  if (!("console" in _worldwide_js__WEBPACK_IMPORTED_MODULE_2__.GLOBAL_OBJ)) {
    return callback();
  }
  const console = _worldwide_js__WEBPACK_IMPORTED_MODULE_2__.GLOBAL_OBJ.console;
  const wrappedFuncs = {};
  const wrappedLevels = Object.keys(originalConsoleMethods);
  wrappedLevels.forEach((level) => {
    const originalConsoleMethod = originalConsoleMethods[level];
    wrappedFuncs[level] = console[level];
    console[level] = originalConsoleMethod;
  });
  try {
    return callback();
  } finally {
    wrappedLevels.forEach((level) => {
      console[level] = wrappedFuncs[level];
    });
  }
}
function enable() {
  _getLoggerSettings().enabled = true;
}
function disable() {
  _getLoggerSettings().enabled = false;
}
function isEnabled() {
  return _getLoggerSettings().enabled;
}
function log(...args) {
  _maybeLog("log", ...args);
}
function warn(...args) {
  _maybeLog("warn", ...args);
}
function error(...args) {
  _maybeLog("error", ...args);
}
function _maybeLog(level, ...args) {
  if (!_debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD) {
    return;
  }
  if (isEnabled()) {
    consoleSandbox(() => {
      _worldwide_js__WEBPACK_IMPORTED_MODULE_2__.GLOBAL_OBJ.console[level](`${PREFIX}[${level}]:`, ...args);
    });
  }
}
function _getLoggerSettings() {
  if (!_debug_build_js__WEBPACK_IMPORTED_MODULE_1__.DEBUG_BUILD) {
    return { enabled: false };
  }
  return (0,_carrier_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalSingleton)("loggerSettings", () => ({ enabled: false }));
}
const debug = {
  /** Enable logging. */
  enable,
  /** Disable logging. */
  disable,
  /** Check if logging is enabled. */
  isEnabled,
  /** Log a message. */
  log,
  /** Log a warning. */
  warn,
  /** Log an error. */
  error
};



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/dsn.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/dsn.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dsnToString: () => (/* binding */ dsnToString),
/* harmony export */   extractOrgIdFromClient: () => (/* binding */ extractOrgIdFromClient),
/* harmony export */   makeDsn: () => (/* binding */ makeDsn)
/* harmony export */ });
/* unused harmony exports dsnFromString, extractOrgIdFromDsnHost */
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _debug_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");


const ORG_ID_REGEX = /^o(\d+)\./;
const DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function isValidProtocol(protocol) {
  return protocol === "http" || protocol === "https";
}
function dsnToString(dsn, withPassword = false) {
  const { host, path, pass, port, projectId, protocol, publicKey } = dsn;
  return `${protocol}://${publicKey}${withPassword && pass ? `:${pass}` : ""}@${host}${port ? `:${port}` : ""}/${path ? `${path}/` : path}${projectId}`;
}
function dsnFromString(str) {
  const match = DSN_REGEX.exec(str);
  if (!match) {
    (0,_debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.consoleSandbox)(() => {
      console.error(`Invalid Sentry Dsn: ${str}`);
    });
    return void 0;
  }
  const [protocol, publicKey, pass = "", host = "", port = "", lastPath = ""] = match.slice(1);
  let path = "";
  let projectId = lastPath;
  const split = projectId.split("/");
  if (split.length > 1) {
    path = split.slice(0, -1).join("/");
    projectId = split.pop();
  }
  if (projectId) {
    const projectMatch = projectId.match(/^\d+/);
    if (projectMatch) {
      projectId = projectMatch[0];
    }
  }
  return dsnFromComponents({ host, pass, path, projectId, port, protocol, publicKey });
}
function dsnFromComponents(components) {
  return {
    protocol: components.protocol,
    publicKey: components.publicKey || "",
    pass: components.pass || "",
    host: components.host,
    port: components.port || "",
    path: components.path || "",
    projectId: components.projectId
  };
}
function validateDsn(dsn) {
  if (!_debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD) {
    return true;
  }
  const { port, projectId, protocol } = dsn;
  const requiredComponents = ["protocol", "publicKey", "host", "projectId"];
  const hasMissingRequiredComponent = requiredComponents.find((component) => {
    if (!dsn[component]) {
      _debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.error(`Invalid Sentry Dsn: ${component} missing`);
      return true;
    }
    return false;
  });
  if (hasMissingRequiredComponent) {
    return false;
  }
  if (!projectId.match(/^\d+$/)) {
    _debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`);
    return false;
  }
  if (!isValidProtocol(protocol)) {
    _debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`);
    return false;
  }
  if (port && isNaN(parseInt(port, 10))) {
    _debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.error(`Invalid Sentry Dsn: Invalid port ${port}`);
    return false;
  }
  return true;
}
function extractOrgIdFromDsnHost(host) {
  const match = host.match(ORG_ID_REGEX);
  return match == null ? void 0 : match[1];
}
function extractOrgIdFromClient(client) {
  const options = client.getOptions();
  const { host } = client.getDsn() || {};
  let org_id;
  if (options.orgId) {
    org_id = String(options.orgId);
  } else if (host) {
    org_id = extractOrgIdFromDsnHost(host);
  }
  return org_id;
}
function makeDsn(from) {
  const components = typeof from === "string" ? dsnFromString(from) : dsnFromComponents(from);
  if (!components || !validateDsn(components)) {
    return void 0;
  }
  return components;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/env.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/env.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSDKSource: () => (/* binding */ getSDKSource),
/* harmony export */   isBrowserBundle: () => (/* binding */ isBrowserBundle)
/* harmony export */ });
function isBrowserBundle() {
  return typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" && !!__SENTRY_BROWSER_BUNDLE__;
}
function getSDKSource() {
  return "npm";
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/envelope.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/envelope.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addItemToEnvelope: () => (/* binding */ addItemToEnvelope),
/* harmony export */   createAttachmentEnvelopeItem: () => (/* binding */ createAttachmentEnvelopeItem),
/* harmony export */   createEnvelope: () => (/* binding */ createEnvelope),
/* harmony export */   createEventEnvelopeHeaders: () => (/* binding */ createEventEnvelopeHeaders),
/* harmony export */   createSpanEnvelopeItem: () => (/* binding */ createSpanEnvelopeItem),
/* harmony export */   envelopeItemTypeToDataCategory: () => (/* binding */ envelopeItemTypeToDataCategory),
/* harmony export */   forEachEnvelopeItem: () => (/* binding */ forEachEnvelopeItem),
/* harmony export */   getSdkMetadataForEnvelopeHeader: () => (/* binding */ getSdkMetadataForEnvelopeHeader),
/* harmony export */   serializeEnvelope: () => (/* binding */ serializeEnvelope)
/* harmony export */ });
/* unused harmony exports envelopeContainsItemType, parseEnvelope */
/* harmony import */ var _carrier_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../carrier.js */ "../../node_modules/@sentry/core/build/esm/carrier.js");
/* harmony import */ var _dsn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dsn.js */ "../../node_modules/@sentry/core/build/esm/utils/dsn.js");
/* harmony import */ var _normalize_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./normalize.js */ "../../node_modules/@sentry/core/build/esm/utils/normalize.js");
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");




function createEnvelope(headers, items = []) {
  return [headers, items];
}
function addItemToEnvelope(envelope, newItem) {
  const [headers, items] = envelope;
  return [headers, [...items, newItem]];
}
function forEachEnvelopeItem(envelope, callback) {
  const envelopeItems = envelope[1];
  for (const envelopeItem of envelopeItems) {
    const envelopeItemType = envelopeItem[0].type;
    const result = callback(envelopeItem, envelopeItemType);
    if (result) {
      return true;
    }
  }
  return false;
}
function envelopeContainsItemType(envelope, types) {
  return forEachEnvelopeItem(envelope, (_, type) => types.includes(type));
}
function encodeUTF8(input) {
  const carrier = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_0__.getSentryCarrier)(_worldwide_js__WEBPACK_IMPORTED_MODULE_3__.GLOBAL_OBJ);
  return carrier.encodePolyfill ? carrier.encodePolyfill(input) : new TextEncoder().encode(input);
}
function decodeUTF8(input) {
  const carrier = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_0__.getSentryCarrier)(_worldwide_js__WEBPACK_IMPORTED_MODULE_3__.GLOBAL_OBJ);
  return carrier.decodePolyfill ? carrier.decodePolyfill(input) : new TextDecoder().decode(input);
}
function serializeEnvelope(envelope) {
  const [envHeaders, items] = envelope;
  let parts = JSON.stringify(envHeaders);
  function append(next) {
    if (typeof parts === "string") {
      parts = typeof next === "string" ? parts + next : [encodeUTF8(parts), next];
    } else {
      parts.push(typeof next === "string" ? encodeUTF8(next) : next);
    }
  }
  for (const item of items) {
    const [itemHeaders, payload] = item;
    append(`
${JSON.stringify(itemHeaders)}
`);
    if (typeof payload === "string" || payload instanceof Uint8Array) {
      append(payload);
    } else {
      let stringifiedPayload;
      try {
        stringifiedPayload = JSON.stringify(payload);
      } catch {
        stringifiedPayload = JSON.stringify((0,_normalize_js__WEBPACK_IMPORTED_MODULE_2__.normalize)(payload));
      }
      append(stringifiedPayload);
    }
  }
  return typeof parts === "string" ? parts : concatBuffers(parts);
}
function concatBuffers(buffers) {
  const totalLength = buffers.reduce((acc, buf) => acc + buf.length, 0);
  const merged = new Uint8Array(totalLength);
  let offset = 0;
  for (const buffer of buffers) {
    merged.set(buffer, offset);
    offset += buffer.length;
  }
  return merged;
}
function parseEnvelope(env) {
  let buffer = typeof env === "string" ? encodeUTF8(env) : env;
  function readBinary(length) {
    const bin = buffer.subarray(0, length);
    buffer = buffer.subarray(length + 1);
    return bin;
  }
  function readJson() {
    let i = buffer.indexOf(10);
    if (i < 0) {
      i = buffer.length;
    }
    return JSON.parse(decodeUTF8(readBinary(i)));
  }
  const envelopeHeader = readJson();
  const items = [];
  while (buffer.length) {
    const itemHeader = readJson();
    const binaryLength = typeof itemHeader.length === "number" ? itemHeader.length : void 0;
    items.push([itemHeader, binaryLength ? readBinary(binaryLength) : readJson()]);
  }
  return [envelopeHeader, items];
}
function createSpanEnvelopeItem(spanJson) {
  const spanHeaders = {
    type: "span"
  };
  return [spanHeaders, spanJson];
}
function createAttachmentEnvelopeItem(attachment) {
  const buffer = typeof attachment.data === "string" ? encodeUTF8(attachment.data) : attachment.data;
  return [
    {
      type: "attachment",
      length: buffer.length,
      filename: attachment.filename,
      content_type: attachment.contentType,
      attachment_type: attachment.attachmentType
    },
    buffer
  ];
}
const ITEM_TYPE_TO_DATA_CATEGORY_MAP = {
  session: "session",
  sessions: "session",
  attachment: "attachment",
  transaction: "transaction",
  event: "error",
  client_report: "internal",
  user_report: "default",
  profile: "profile",
  profile_chunk: "profile",
  replay_event: "replay",
  replay_recording: "replay",
  check_in: "monitor",
  feedback: "feedback",
  span: "span",
  raw_security: "security",
  log: "log_item"
};
function envelopeItemTypeToDataCategory(type) {
  return ITEM_TYPE_TO_DATA_CATEGORY_MAP[type];
}
function getSdkMetadataForEnvelopeHeader(metadataOrEvent) {
  if (!(metadataOrEvent == null ? void 0 : metadataOrEvent.sdk)) {
    return;
  }
  const { name, version } = metadataOrEvent.sdk;
  return { name, version };
}
function createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn) {
  var _a;
  const dynamicSamplingContext = (_a = event.sdkProcessingMetadata) == null ? void 0 : _a.dynamicSamplingContext;
  return {
    event_id: event.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...sdkInfo && { sdk: sdkInfo },
    ...!!tunnel && dsn && { dsn: (0,_dsn_js__WEBPACK_IMPORTED_MODULE_1__.dsnToString)(dsn) },
    ...dynamicSamplingContext && {
      trace: dynamicSamplingContext
    }
  };
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/eventUtils.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/eventUtils.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPossibleEventMessages: () => (/* binding */ getPossibleEventMessages)
/* harmony export */ });
function getPossibleEventMessages(event) {
  const possibleMessages = [];
  if (event.message) {
    possibleMessages.push(event.message);
  }
  try {
    const lastException = event.exception.values[event.exception.values.length - 1];
    if (lastException == null ? void 0 : lastException.value) {
      possibleMessages.push(lastException.value);
      if (lastException.type) {
        possibleMessages.push(`${lastException.type}: ${lastException.value}`);
      }
    }
  } catch {
  }
  return possibleMessages;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleCallbackErrors: () => (/* binding */ handleCallbackErrors)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");

function handleCallbackErrors(fn, onError, onFinally = () => {
}) {
  let maybePromiseResult;
  try {
    maybePromiseResult = fn();
  } catch (e) {
    onError(e);
    onFinally();
    throw e;
  }
  return maybeHandlePromiseRejection(maybePromiseResult, onError, onFinally);
}
function maybeHandlePromiseRejection(value, onError, onFinally) {
  if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isThenable)(value)) {
    return value.then(
      (res) => {
        onFinally();
        return res;
      },
      (e) => {
        onError(e);
        onFinally();
        throw e;
      }
    );
  }
  onFinally();
  return value;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasSpansEnabled: () => (/* binding */ hasSpansEnabled)
/* harmony export */ });
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");

function hasSpansEnabled(maybeOptions) {
  var _a;
  if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) {
    return false;
  }
  const options = maybeOptions || ((_a = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_0__.getClient)()) == null ? void 0 : _a.getOptions());
  return !!options && // Note: This check is `!= null`, meaning "nullish". `0` is not "nullish", `undefined` and `null` are. (This comment was brought to you by 15 minutes of questioning life)
  (options.tracesSampleRate != null || !!options.tracesSampler);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/ipAddress.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/ipAddress.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAutoIpAddressToSession: () => (/* binding */ addAutoIpAddressToSession),
/* harmony export */   addAutoIpAddressToUser: () => (/* binding */ addAutoIpAddressToUser)
/* harmony export */ });
function addAutoIpAddressToUser(objWithMaybeUser) {
  var _a;
  if (((_a = objWithMaybeUser.user) == null ? void 0 : _a.ip_address) === void 0) {
    objWithMaybeUser.user = {
      ...objWithMaybeUser.user,
      ip_address: "{{auto}}"
    };
  }
}
function addAutoIpAddressToSession(session) {
  var _a;
  if ("aggregates" in session) {
    if (((_a = session.attrs) == null ? void 0 : _a["ip_address"]) === void 0) {
      session.attrs = {
        ...session.attrs,
        ip_address: "{{auto}}"
      };
    }
  } else {
    if (session.ipAddress === void 0) {
      session.ipAddress = "{{auto}}";
    }
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/is.js":
/*!*************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/is.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isDOMError: () => (/* binding */ isDOMError),
/* harmony export */   isDOMException: () => (/* binding */ isDOMException),
/* harmony export */   isElement: () => (/* binding */ isElement),
/* harmony export */   isError: () => (/* binding */ isError),
/* harmony export */   isErrorEvent: () => (/* binding */ isErrorEvent),
/* harmony export */   isEvent: () => (/* binding */ isEvent),
/* harmony export */   isInstanceOf: () => (/* binding */ isInstanceOf),
/* harmony export */   isParameterizedString: () => (/* binding */ isParameterizedString),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   isPrimitive: () => (/* binding */ isPrimitive),
/* harmony export */   isRegExp: () => (/* binding */ isRegExp),
/* harmony export */   isRequest: () => (/* binding */ isRequest),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isSyntheticEvent: () => (/* binding */ isSyntheticEvent),
/* harmony export */   isThenable: () => (/* binding */ isThenable),
/* harmony export */   isVueViewModel: () => (/* binding */ isVueViewModel)
/* harmony export */ });
const objectToString = Object.prototype.toString;
function isError(wat) {
  switch (objectToString.call(wat)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return true;
    default:
      return isInstanceOf(wat, Error);
  }
}
function isBuiltin(wat, className) {
  return objectToString.call(wat) === `[object ${className}]`;
}
function isErrorEvent(wat) {
  return isBuiltin(wat, "ErrorEvent");
}
function isDOMError(wat) {
  return isBuiltin(wat, "DOMError");
}
function isDOMException(wat) {
  return isBuiltin(wat, "DOMException");
}
function isString(wat) {
  return isBuiltin(wat, "String");
}
function isParameterizedString(wat) {
  return typeof wat === "object" && wat !== null && "__sentry_template_string__" in wat && "__sentry_template_values__" in wat;
}
function isPrimitive(wat) {
  return wat === null || isParameterizedString(wat) || typeof wat !== "object" && typeof wat !== "function";
}
function isPlainObject(wat) {
  return isBuiltin(wat, "Object");
}
function isEvent(wat) {
  return typeof Event !== "undefined" && isInstanceOf(wat, Event);
}
function isElement(wat) {
  return typeof Element !== "undefined" && isInstanceOf(wat, Element);
}
function isRegExp(wat) {
  return isBuiltin(wat, "RegExp");
}
function isThenable(wat) {
  return Boolean((wat == null ? void 0 : wat.then) && typeof wat.then === "function");
}
function isSyntheticEvent(wat) {
  return isPlainObject(wat) && "nativeEvent" in wat && "preventDefault" in wat && "stopPropagation" in wat;
}
function isInstanceOf(wat, base) {
  try {
    return wat instanceof base;
  } catch {
    return false;
  }
}
function isVueViewModel(wat) {
  return !!(typeof wat === "object" && wat !== null && (wat.__isVue || wat._isVue));
}
function isRequest(request) {
  return typeof Request !== "undefined" && isInstanceOf(request, Request);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/isBrowser.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/isBrowser.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBrowser: () => (/* binding */ isBrowser)
/* harmony export */ });
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node.js */ "../../node_modules/@sentry/core/build/esm/utils/node.js");
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");


function isBrowser() {
  return typeof window !== "undefined" && (!(0,_node_js__WEBPACK_IMPORTED_MODULE_0__.isNodeEnv)() || isElectronNodeRenderer());
}
function isElectronNodeRenderer() {
  const process = _worldwide_js__WEBPACK_IMPORTED_MODULE_1__.GLOBAL_OBJ.process;
  return (process == null ? void 0 : process.type) === "renderer";
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/isSentryRequestUrl.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/isSentryRequestUrl.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSentryRequestUrl: () => (/* binding */ isSentryRequestUrl)
/* harmony export */ });
function isSentryRequestUrl(url, client) {
  const dsn = client == null ? void 0 : client.getDsn();
  const tunnel = client == null ? void 0 : client.getOptions().tunnel;
  return checkDsn(url, dsn) || checkTunnel(url, tunnel);
}
function checkTunnel(url, tunnel) {
  if (!tunnel) {
    return false;
  }
  return removeTrailingSlash(url) === removeTrailingSlash(tunnel);
}
function checkDsn(url, dsn) {
  return dsn ? url.includes(dsn.host) : false;
}
function removeTrailingSlash(str) {
  return str[str.length - 1] === "/" ? str.slice(0, -1) : str;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/merge.js":
/*!****************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/merge.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   merge: () => (/* binding */ merge)
/* harmony export */ });
function merge(initialObj, mergeObj, levels = 2) {
  if (!mergeObj || typeof mergeObj !== "object" || levels <= 0) {
    return mergeObj;
  }
  if (initialObj && Object.keys(mergeObj).length === 0) {
    return initialObj;
  }
  const output = { ...initialObj };
  for (const key in mergeObj) {
    if (Object.prototype.hasOwnProperty.call(mergeObj, key)) {
      output[key] = merge(output[key], mergeObj[key], levels - 1);
    }
  }
  return output;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/misc.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/misc.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addExceptionMechanism: () => (/* binding */ addExceptionMechanism),
/* harmony export */   addExceptionTypeValue: () => (/* binding */ addExceptionTypeValue),
/* harmony export */   checkOrSetAlreadyCaught: () => (/* binding */ checkOrSetAlreadyCaught),
/* harmony export */   getEventDescription: () => (/* binding */ getEventDescription),
/* harmony export */   uuid4: () => (/* binding */ uuid4)
/* harmony export */ });
/* unused harmony exports addContextToFrame, parseSemver */
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object.js */ "../../node_modules/@sentry/core/build/esm/utils/object.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./string.js */ "../../node_modules/@sentry/core/build/esm/utils/string.js");
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");



function getCrypto() {
  const gbl = _worldwide_js__WEBPACK_IMPORTED_MODULE_2__.GLOBAL_OBJ;
  return gbl.crypto || gbl.msCrypto;
}
function uuid4(crypto = getCrypto()) {
  let getRandomByte = () => Math.random() * 16;
  try {
    if (crypto == null ? void 0 : crypto.randomUUID) {
      return crypto.randomUUID().replace(/-/g, "");
    }
    if (crypto == null ? void 0 : crypto.getRandomValues) {
      getRandomByte = () => {
        const typedArray = new Uint8Array(1);
        crypto.getRandomValues(typedArray);
        return typedArray[0];
      };
    }
  } catch {
  }
  return ("10000000100040008000" + 1e11).replace(
    /[018]/g,
    (c) => (
      // eslint-disable-next-line no-bitwise
      (c ^ (getRandomByte() & 15) >> c / 4).toString(16)
    )
  );
}
function getFirstException(event) {
  var _a, _b;
  return (_b = (_a = event.exception) == null ? void 0 : _a.values) == null ? void 0 : _b[0];
}
function getEventDescription(event) {
  const { message, event_id: eventId } = event;
  if (message) {
    return message;
  }
  const firstException = getFirstException(event);
  if (firstException) {
    if (firstException.type && firstException.value) {
      return `${firstException.type}: ${firstException.value}`;
    }
    return firstException.type || firstException.value || eventId || "<unknown>";
  }
  return eventId || "<unknown>";
}
function addExceptionTypeValue(event, value, type) {
  const exception = event.exception = event.exception || {};
  const values = exception.values = exception.values || [];
  const firstException = values[0] = values[0] || {};
  if (!firstException.value) {
    firstException.value = value || "";
  }
  if (!firstException.type) {
    firstException.type = type || "Error";
  }
}
function addExceptionMechanism(event, newMechanism) {
  const firstException = getFirstException(event);
  if (!firstException) {
    return;
  }
  const defaultMechanism = { type: "generic", handled: true };
  const currentMechanism = firstException.mechanism;
  firstException.mechanism = { ...defaultMechanism, ...currentMechanism, ...newMechanism };
  if (newMechanism && "data" in newMechanism) {
    const mergedData = { ...currentMechanism == null ? void 0 : currentMechanism.data, ...newMechanism.data };
    firstException.mechanism.data = mergedData;
  }
}
const SEMVER_REGEXP = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
function _parseInt(input) {
  return parseInt(input || "", 10);
}
function parseSemver(input) {
  const match = input.match(SEMVER_REGEXP) || [];
  const major = _parseInt(match[1]);
  const minor = _parseInt(match[2]);
  const patch = _parseInt(match[3]);
  return {
    buildmetadata: match[5],
    major: isNaN(major) ? void 0 : major,
    minor: isNaN(minor) ? void 0 : minor,
    patch: isNaN(patch) ? void 0 : patch,
    prerelease: match[4]
  };
}
function addContextToFrame(lines, frame, linesOfContext = 5) {
  if (frame.lineno === void 0) {
    return;
  }
  const maxLines = lines.length;
  const sourceLine = Math.max(Math.min(maxLines - 1, frame.lineno - 1), 0);
  frame.pre_context = lines.slice(Math.max(0, sourceLine - linesOfContext), sourceLine).map((line) => (0,_string_js__WEBPACK_IMPORTED_MODULE_1__.snipLine)(line, 0));
  const lineIndex = Math.min(maxLines - 1, sourceLine);
  frame.context_line = (0,_string_js__WEBPACK_IMPORTED_MODULE_1__.snipLine)(lines[lineIndex], frame.colno || 0);
  frame.post_context = lines.slice(Math.min(sourceLine + 1, maxLines), sourceLine + 1 + linesOfContext).map((line) => (0,_string_js__WEBPACK_IMPORTED_MODULE_1__.snipLine)(line, 0));
}
function checkOrSetAlreadyCaught(exception) {
  if (isAlreadyCaptured(exception)) {
    return true;
  }
  try {
    (0,_object_js__WEBPACK_IMPORTED_MODULE_0__.addNonEnumerableProperty)(exception, "__sentry_captured__", true);
  } catch {
  }
  return false;
}
function isAlreadyCaptured(exception) {
  try {
    return exception.__sentry_captured__;
  } catch {
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/node.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/node.js ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNodeEnv: () => (/* binding */ isNodeEnv)
/* harmony export */ });
/* unused harmony export loadModule */
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env.js */ "../../node_modules/@sentry/core/build/esm/utils/env.js");
/* module decorator */ module = __webpack_require__.hmd(module);

function isNodeEnv() {
  return !(0,_env_js__WEBPACK_IMPORTED_MODULE_0__.isBrowserBundle)() && Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
}
function dynamicRequire(mod, request) {
  return mod.require(request);
}
function loadModule(moduleName, existingModule = module) {
  let mod;
  try {
    mod = dynamicRequire(existingModule, moduleName);
  } catch {
  }
  if (!mod) {
    try {
      const { cwd } = dynamicRequire(existingModule, "process");
      mod = dynamicRequire(existingModule, `${cwd()}/node_modules/${moduleName}`);
    } catch {
    }
  }
  return mod;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/normalize.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/normalize.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalize: () => (/* binding */ normalize),
/* harmony export */   normalizeToSize: () => (/* binding */ normalizeToSize)
/* harmony export */ });
/* unused harmony export normalizeUrlToBase */
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object.js */ "../../node_modules/@sentry/core/build/esm/utils/object.js");
/* harmony import */ var _stacktrace_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stacktrace.js */ "../../node_modules/@sentry/core/build/esm/utils/stacktrace.js");



function normalize(input, depth = 100, maxProperties = Infinity) {
  try {
    return visit("", input, depth, maxProperties);
  } catch (err) {
    return { ERROR: `**non-serializable** (${err})` };
  }
}
function normalizeToSize(object, depth = 3, maxSize = 100 * 1024) {
  const normalized = normalize(object, depth);
  if (jsonSize(normalized) > maxSize) {
    return normalizeToSize(object, depth - 1, maxSize);
  }
  return normalized;
}
function visit(key, value, depth = Infinity, maxProperties = Infinity, memo = memoBuilder()) {
  const [memoize, unmemoize] = memo;
  if (value == null || // this matches null and undefined -> eqeq not eqeqeq
  ["boolean", "string"].includes(typeof value) || typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  const stringified = stringifyValue(key, value);
  if (!stringified.startsWith("[object ")) {
    return stringified;
  }
  if (value["__sentry_skip_normalization__"]) {
    return value;
  }
  const remainingDepth = typeof value["__sentry_override_normalization_depth__"] === "number" ? value["__sentry_override_normalization_depth__"] : depth;
  if (remainingDepth === 0) {
    return stringified.replace("object ", "");
  }
  if (memoize(value)) {
    return "[Circular ~]";
  }
  const valueWithToJSON = value;
  if (valueWithToJSON && typeof valueWithToJSON.toJSON === "function") {
    try {
      const jsonValue = valueWithToJSON.toJSON();
      return visit("", jsonValue, remainingDepth - 1, maxProperties, memo);
    } catch {
    }
  }
  const normalized = Array.isArray(value) ? [] : {};
  let numAdded = 0;
  const visitable = (0,_object_js__WEBPACK_IMPORTED_MODULE_1__.convertToPlainObject)(value);
  for (const visitKey in visitable) {
    if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) {
      continue;
    }
    if (numAdded >= maxProperties) {
      normalized[visitKey] = "[MaxProperties ~]";
      break;
    }
    const visitValue = visitable[visitKey];
    normalized[visitKey] = visit(visitKey, visitValue, remainingDepth - 1, maxProperties, memo);
    numAdded++;
  }
  unmemoize(value);
  return normalized;
}
function stringifyValue(key, value) {
  try {
    if (key === "domain" && value && typeof value === "object" && value._events) {
      return "[Domain]";
    }
    if (key === "domainEmitter") {
      return "[DomainEmitter]";
    }
    if (typeof __webpack_require__.g !== "undefined" && value === __webpack_require__.g) {
      return "[Global]";
    }
    if (typeof window !== "undefined" && value === window) {
      return "[Window]";
    }
    if (typeof document !== "undefined" && value === document) {
      return "[Document]";
    }
    if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isVueViewModel)(value)) {
      return "[VueViewModel]";
    }
    if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isSyntheticEvent)(value)) {
      return "[SyntheticEvent]";
    }
    if (typeof value === "number" && !Number.isFinite(value)) {
      return `[${value}]`;
    }
    if (typeof value === "function") {
      return `[Function: ${(0,_stacktrace_js__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(value)}]`;
    }
    if (typeof value === "symbol") {
      return `[${String(value)}]`;
    }
    if (typeof value === "bigint") {
      return `[BigInt: ${String(value)}]`;
    }
    const objName = getConstructorName(value);
    if (/^HTML(\w*)Element$/.test(objName)) {
      return `[HTMLElement: ${objName}]`;
    }
    return `[object ${objName}]`;
  } catch (err) {
    return `**non-serializable** (${err})`;
  }
}
function getConstructorName(value) {
  const prototype = Object.getPrototypeOf(value);
  return (prototype == null ? void 0 : prototype.constructor) ? prototype.constructor.name : "null prototype";
}
function utf8Length(value) {
  return ~-encodeURI(value).split(/%..|./).length;
}
function jsonSize(value) {
  return utf8Length(JSON.stringify(value));
}
function normalizeUrlToBase(url, basePath) {
  const escapedBase = basePath.replace(/\\/g, "/").replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
  let newUrl = url;
  try {
    newUrl = decodeURI(url);
  } catch {
  }
  return newUrl.replace(/\\/g, "/").replace(/webpack:\/?/g, "").replace(new RegExp(`(file://)?/*${escapedBase}/*`, "ig"), "app:///");
}
function memoBuilder() {
  const inner = /* @__PURE__ */ new WeakSet();
  function memoize(obj) {
    if (inner.has(obj)) {
      return true;
    }
    inner.add(obj);
    return false;
  }
  function unmemoize(obj) {
    inner.delete(obj);
  }
  return [memoize, unmemoize];
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/object.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/object.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addNonEnumerableProperty: () => (/* binding */ addNonEnumerableProperty),
/* harmony export */   convertToPlainObject: () => (/* binding */ convertToPlainObject),
/* harmony export */   extractExceptionKeysForMessage: () => (/* binding */ extractExceptionKeysForMessage),
/* harmony export */   fill: () => (/* binding */ fill),
/* harmony export */   getOriginalFunction: () => (/* binding */ getOriginalFunction),
/* harmony export */   markFunctionWrapped: () => (/* binding */ markFunctionWrapped)
/* harmony export */ });
/* unused harmony exports dropUndefinedKeys, objectify */
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _browser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browser.js */ "../../node_modules/@sentry/core/build/esm/utils/browser.js");
/* harmony import */ var _debug_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./string.js */ "../../node_modules/@sentry/core/build/esm/utils/string.js");





function fill(source, name, replacementFactory) {
  if (!(name in source)) {
    return;
  }
  const original = source[name];
  if (typeof original !== "function") {
    return;
  }
  const wrapped = replacementFactory(original);
  if (typeof wrapped === "function") {
    markFunctionWrapped(wrapped, original);
  }
  try {
    source[name] = wrapped;
  } catch {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.log(`Failed to replace method "${name}" in object`, source);
  }
}
function addNonEnumerableProperty(obj, name, value) {
  try {
    Object.defineProperty(obj, name, {
      // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
      value,
      writable: true,
      configurable: true
    });
  } catch {
    _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _debug_logger_js__WEBPACK_IMPORTED_MODULE_2__.debug.log(`Failed to add non-enumerable property "${name}" to object`, obj);
  }
}
function markFunctionWrapped(wrapped, original) {
  try {
    const proto = original.prototype || {};
    wrapped.prototype = original.prototype = proto;
    addNonEnumerableProperty(wrapped, "__sentry_original__", original);
  } catch {
  }
}
function getOriginalFunction(func) {
  return func.__sentry_original__;
}
function convertToPlainObject(value) {
  if ((0,_is_js__WEBPACK_IMPORTED_MODULE_3__.isError)(value)) {
    return {
      message: value.message,
      name: value.name,
      stack: value.stack,
      ...getOwnProperties(value)
    };
  } else if ((0,_is_js__WEBPACK_IMPORTED_MODULE_3__.isEvent)(value)) {
    const newObj = {
      type: value.type,
      target: serializeEventTarget(value.target),
      currentTarget: serializeEventTarget(value.currentTarget),
      ...getOwnProperties(value)
    };
    if (typeof CustomEvent !== "undefined" && (0,_is_js__WEBPACK_IMPORTED_MODULE_3__.isInstanceOf)(value, CustomEvent)) {
      newObj.detail = value.detail;
    }
    return newObj;
  } else {
    return value;
  }
}
function serializeEventTarget(target) {
  try {
    return (0,_is_js__WEBPACK_IMPORTED_MODULE_3__.isElement)(target) ? (0,_browser_js__WEBPACK_IMPORTED_MODULE_1__.htmlTreeAsString)(target) : Object.prototype.toString.call(target);
  } catch {
    return "<unknown>";
  }
}
function getOwnProperties(obj) {
  if (typeof obj === "object" && obj !== null) {
    const extractedProps = {};
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        extractedProps[property] = obj[property];
      }
    }
    return extractedProps;
  } else {
    return {};
  }
}
function extractExceptionKeysForMessage(exception, maxLength = 40) {
  const keys = Object.keys(convertToPlainObject(exception));
  keys.sort();
  const firstKey = keys[0];
  if (!firstKey) {
    return "[object has no keys]";
  }
  if (firstKey.length >= maxLength) {
    return (0,_string_js__WEBPACK_IMPORTED_MODULE_4__.truncate)(firstKey, maxLength);
  }
  for (let includedKeys = keys.length; includedKeys > 0; includedKeys--) {
    const serialized = keys.slice(0, includedKeys).join(", ");
    if (serialized.length > maxLength) {
      continue;
    }
    if (includedKeys === keys.length) {
      return serialized;
    }
    return (0,_string_js__WEBPACK_IMPORTED_MODULE_4__.truncate)(serialized, maxLength);
  }
  return "";
}
function dropUndefinedKeys(inputValue) {
  const memoizationMap = /* @__PURE__ */ new Map();
  return _dropUndefinedKeys(inputValue, memoizationMap);
}
function _dropUndefinedKeys(inputValue, memoizationMap) {
  if (inputValue === null || typeof inputValue !== "object") {
    return inputValue;
  }
  const memoVal = memoizationMap.get(inputValue);
  if (memoVal !== void 0) {
    return memoVal;
  }
  if (Array.isArray(inputValue)) {
    const returnValue = [];
    memoizationMap.set(inputValue, returnValue);
    inputValue.forEach((value) => {
      returnValue.push(_dropUndefinedKeys(value, memoizationMap));
    });
    return returnValue;
  }
  if (isPojo(inputValue)) {
    const returnValue = {};
    memoizationMap.set(inputValue, returnValue);
    const keys = Object.keys(inputValue);
    keys.forEach((key) => {
      const val = inputValue[key];
      if (val !== void 0) {
        returnValue[key] = _dropUndefinedKeys(val, memoizationMap);
      }
    });
    return returnValue;
  }
  return inputValue;
}
function isPojo(input) {
  const constructor = input.constructor;
  return constructor === Object || constructor === void 0;
}
function objectify(wat) {
  let objectified;
  switch (true) {
    // this will catch both undefined and null
    case wat == void 0:
      objectified = new String(wat);
      break;
    // Though symbols and bigints do have wrapper classes (`Symbol` and `BigInt`, respectively), for whatever reason
    // those classes don't have constructors which can be used with the `new` keyword. We therefore need to cast each as
    // an object in order to wrap it.
    case (typeof wat === "symbol" || typeof wat === "bigint"):
      objectified = Object(wat);
      break;
    // this will catch the remaining primitives: `String`, `Number`, and `Boolean`
    case (0,_is_js__WEBPACK_IMPORTED_MODULE_3__.isPrimitive)(wat):
      objectified = new wat.constructor(wat);
      break;
    // by process of elimination, at this point we know that `wat` must already be an object
    default:
      objectified = wat;
      break;
  }
  return objectified;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/parseSampleRate.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/parseSampleRate.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseSampleRate: () => (/* binding */ parseSampleRate)
/* harmony export */ });
function parseSampleRate(sampleRate) {
  if (typeof sampleRate === "boolean") {
    return Number(sampleRate);
  }
  const rate = typeof sampleRate === "string" ? parseFloat(sampleRate) : sampleRate;
  if (typeof rate !== "number" || isNaN(rate) || rate < 0 || rate > 1) {
    return void 0;
  }
  return rate;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/prepareEvent.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/prepareEvent.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseEventHintOrCaptureContext: () => (/* binding */ parseEventHintOrCaptureContext),
/* harmony export */   prepareEvent: () => (/* binding */ prepareEvent)
/* harmony export */ });
/* unused harmony exports applyClientOptions, applyDebugIds, applyDebugMeta */
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "../../node_modules/@sentry/core/build/esm/constants.js");
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _eventProcessors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../eventProcessors.js */ "../../node_modules/@sentry/core/build/esm/eventProcessors.js");
/* harmony import */ var _scope_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scope.js */ "../../node_modules/@sentry/core/build/esm/scope.js");
/* harmony import */ var _applyScopeDataToEvent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./applyScopeDataToEvent.js */ "../../node_modules/@sentry/core/build/esm/utils/applyScopeDataToEvent.js");
/* harmony import */ var _debug_ids_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./debug-ids.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-ids.js");
/* harmony import */ var _misc_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./misc.js */ "../../node_modules/@sentry/core/build/esm/utils/misc.js");
/* harmony import */ var _normalize_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./normalize.js */ "../../node_modules/@sentry/core/build/esm/utils/normalize.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./string.js */ "../../node_modules/@sentry/core/build/esm/utils/string.js");
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./time.js */ "../../node_modules/@sentry/core/build/esm/utils/time.js");










function prepareEvent(options, event, hint, scope, client, isolationScope) {
  const { normalizeDepth = 3, normalizeMaxBreadth = 1e3 } = options;
  const prepared = {
    ...event,
    event_id: event.event_id || hint.event_id || (0,_misc_js__WEBPACK_IMPORTED_MODULE_6__.uuid4)(),
    timestamp: event.timestamp || (0,_time_js__WEBPACK_IMPORTED_MODULE_9__.dateTimestampInSeconds)()
  };
  const integrations = hint.integrations || options.integrations.map((i) => i.name);
  applyClientOptions(prepared, options);
  applyIntegrationsMetadata(prepared, integrations);
  if (client) {
    client.emit("applyFrameMetadata", event);
  }
  if (event.type === void 0) {
    applyDebugIds(prepared, options.stackParser);
  }
  const finalScope = getFinalScope(scope, hint.captureContext);
  if (hint.mechanism) {
    (0,_misc_js__WEBPACK_IMPORTED_MODULE_6__.addExceptionMechanism)(prepared, hint.mechanism);
  }
  const clientEventProcessors = client ? client.getEventProcessors() : [];
  const data = (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_1__.getGlobalScope)().getScopeData();
  if (isolationScope) {
    const isolationData = isolationScope.getScopeData();
    (0,_applyScopeDataToEvent_js__WEBPACK_IMPORTED_MODULE_4__.mergeScopeData)(data, isolationData);
  }
  if (finalScope) {
    const finalScopeData = finalScope.getScopeData();
    (0,_applyScopeDataToEvent_js__WEBPACK_IMPORTED_MODULE_4__.mergeScopeData)(data, finalScopeData);
  }
  const attachments = [...hint.attachments || [], ...data.attachments];
  if (attachments.length) {
    hint.attachments = attachments;
  }
  (0,_applyScopeDataToEvent_js__WEBPACK_IMPORTED_MODULE_4__.applyScopeDataToEvent)(prepared, data);
  const eventProcessors = [
    ...clientEventProcessors,
    // Run scope event processors _after_ all other processors
    ...data.eventProcessors
  ];
  const result = (0,_eventProcessors_js__WEBPACK_IMPORTED_MODULE_2__.notifyEventProcessors)(eventProcessors, prepared, hint);
  return result.then((evt) => {
    if (evt) {
      applyDebugMeta(evt);
    }
    if (typeof normalizeDepth === "number" && normalizeDepth > 0) {
      return normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
    }
    return evt;
  });
}
function applyClientOptions(event, options) {
  const { environment, release, dist, maxValueLength = 250 } = options;
  event.environment = event.environment || environment || _constants_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_ENVIRONMENT;
  if (!event.release && release) {
    event.release = release;
  }
  if (!event.dist && dist) {
    event.dist = dist;
  }
  const request = event.request;
  if (request == null ? void 0 : request.url) {
    request.url = (0,_string_js__WEBPACK_IMPORTED_MODULE_8__.truncate)(request.url, maxValueLength);
  }
}
function applyDebugIds(event, stackParser) {
  var _a, _b;
  const filenameDebugIdMap = (0,_debug_ids_js__WEBPACK_IMPORTED_MODULE_5__.getFilenameToDebugIdMap)(stackParser);
  (_b = (_a = event.exception) == null ? void 0 : _a.values) == null ? void 0 : _b.forEach((exception) => {
    var _a2, _b2;
    (_b2 = (_a2 = exception.stacktrace) == null ? void 0 : _a2.frames) == null ? void 0 : _b2.forEach((frame) => {
      if (frame.filename) {
        frame.debug_id = filenameDebugIdMap[frame.filename];
      }
    });
  });
}
function applyDebugMeta(event) {
  var _a, _b;
  const filenameDebugIdMap = {};
  (_b = (_a = event.exception) == null ? void 0 : _a.values) == null ? void 0 : _b.forEach((exception) => {
    var _a2, _b2;
    (_b2 = (_a2 = exception.stacktrace) == null ? void 0 : _a2.frames) == null ? void 0 : _b2.forEach((frame) => {
      if (frame.debug_id) {
        if (frame.abs_path) {
          filenameDebugIdMap[frame.abs_path] = frame.debug_id;
        } else if (frame.filename) {
          filenameDebugIdMap[frame.filename] = frame.debug_id;
        }
        delete frame.debug_id;
      }
    });
  });
  if (Object.keys(filenameDebugIdMap).length === 0) {
    return;
  }
  event.debug_meta = event.debug_meta || {};
  event.debug_meta.images = event.debug_meta.images || [];
  const images = event.debug_meta.images;
  Object.entries(filenameDebugIdMap).forEach(([filename, debug_id]) => {
    images.push({
      type: "sourcemap",
      code_file: filename,
      debug_id
    });
  });
}
function applyIntegrationsMetadata(event, integrationNames) {
  if (integrationNames.length > 0) {
    event.sdk = event.sdk || {};
    event.sdk.integrations = [...event.sdk.integrations || [], ...integrationNames];
  }
}
function normalizeEvent(event, depth, maxBreadth) {
  var _a, _b;
  if (!event) {
    return null;
  }
  const normalized = {
    ...event,
    ...event.breadcrumbs && {
      breadcrumbs: event.breadcrumbs.map((b) => ({
        ...b,
        ...b.data && {
          data: (0,_normalize_js__WEBPACK_IMPORTED_MODULE_7__.normalize)(b.data, depth, maxBreadth)
        }
      }))
    },
    ...event.user && {
      user: (0,_normalize_js__WEBPACK_IMPORTED_MODULE_7__.normalize)(event.user, depth, maxBreadth)
    },
    ...event.contexts && {
      contexts: (0,_normalize_js__WEBPACK_IMPORTED_MODULE_7__.normalize)(event.contexts, depth, maxBreadth)
    },
    ...event.extra && {
      extra: (0,_normalize_js__WEBPACK_IMPORTED_MODULE_7__.normalize)(event.extra, depth, maxBreadth)
    }
  };
  if (((_a = event.contexts) == null ? void 0 : _a.trace) && normalized.contexts) {
    normalized.contexts.trace = event.contexts.trace;
    if (event.contexts.trace.data) {
      normalized.contexts.trace.data = (0,_normalize_js__WEBPACK_IMPORTED_MODULE_7__.normalize)(event.contexts.trace.data, depth, maxBreadth);
    }
  }
  if (event.spans) {
    normalized.spans = event.spans.map((span) => {
      return {
        ...span,
        ...span.data && {
          data: (0,_normalize_js__WEBPACK_IMPORTED_MODULE_7__.normalize)(span.data, depth, maxBreadth)
        }
      };
    });
  }
  if (((_b = event.contexts) == null ? void 0 : _b.flags) && normalized.contexts) {
    normalized.contexts.flags = (0,_normalize_js__WEBPACK_IMPORTED_MODULE_7__.normalize)(event.contexts.flags, 3, maxBreadth);
  }
  return normalized;
}
function getFinalScope(scope, captureContext) {
  if (!captureContext) {
    return scope;
  }
  const finalScope = scope ? scope.clone() : new _scope_js__WEBPACK_IMPORTED_MODULE_3__.Scope();
  finalScope.update(captureContext);
  return finalScope;
}
function parseEventHintOrCaptureContext(hint) {
  if (!hint) {
    return void 0;
  }
  if (hintIsScopeOrFunction(hint)) {
    return { captureContext: hint };
  }
  if (hintIsScopeContext(hint)) {
    return {
      captureContext: hint
    };
  }
  return hint;
}
function hintIsScopeOrFunction(hint) {
  return hint instanceof _scope_js__WEBPACK_IMPORTED_MODULE_3__.Scope || typeof hint === "function";
}
const captureContextKeys = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "propagationContext"
];
function hintIsScopeContext(hint) {
  return Object.keys(hint).some((key) => captureContextKeys.includes(key));
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/promisebuffer.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/promisebuffer.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SENTRY_BUFFER_FULL_ERROR: () => (/* binding */ SENTRY_BUFFER_FULL_ERROR),
/* harmony export */   makePromiseBuffer: () => (/* binding */ makePromiseBuffer)
/* harmony export */ });
/* harmony import */ var _syncpromise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./syncpromise.js */ "../../node_modules/@sentry/core/build/esm/utils/syncpromise.js");

const SENTRY_BUFFER_FULL_ERROR = Symbol.for("SentryBufferFullError");
function makePromiseBuffer(limit) {
  const buffer = [];
  function isReady() {
    return limit === void 0 || buffer.length < limit;
  }
  function remove(task) {
    return buffer.splice(buffer.indexOf(task), 1)[0] || Promise.resolve(void 0);
  }
  function add(taskProducer) {
    if (!isReady()) {
      return (0,_syncpromise_js__WEBPACK_IMPORTED_MODULE_0__.rejectedSyncPromise)(SENTRY_BUFFER_FULL_ERROR);
    }
    const task = taskProducer();
    if (buffer.indexOf(task) === -1) {
      buffer.push(task);
    }
    void task.then(() => remove(task)).then(
      null,
      () => remove(task).then(null, () => {
      })
    );
    return task;
  }
  function drain(timeout) {
    return new _syncpromise_js__WEBPACK_IMPORTED_MODULE_0__.SyncPromise((resolve, reject) => {
      let counter = buffer.length;
      if (!counter) {
        return resolve(true);
      }
      const capturedSetTimeout = setTimeout(() => {
        if (timeout && timeout > 0) {
          resolve(false);
        }
      }, timeout);
      buffer.forEach((item) => {
        void (0,_syncpromise_js__WEBPACK_IMPORTED_MODULE_0__.resolvedSyncPromise)(item).then(() => {
          if (!--counter) {
            clearTimeout(capturedSetTimeout);
            resolve(true);
          }
        }, reject);
      });
    });
  }
  return {
    $: buffer,
    add,
    drain
  };
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/propagationContext.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/propagationContext.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateSpanId: () => (/* binding */ generateSpanId),
/* harmony export */   generateTraceId: () => (/* binding */ generateTraceId)
/* harmony export */ });
/* harmony import */ var _misc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc.js */ "../../node_modules/@sentry/core/build/esm/utils/misc.js");

function generateTraceId() {
  return (0,_misc_js__WEBPACK_IMPORTED_MODULE_0__.uuid4)();
}
function generateSpanId() {
  return (0,_misc_js__WEBPACK_IMPORTED_MODULE_0__.uuid4)().substring(16);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/ratelimit.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/ratelimit.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isRateLimited: () => (/* binding */ isRateLimited),
/* harmony export */   updateRateLimits: () => (/* binding */ updateRateLimits)
/* harmony export */ });
/* unused harmony exports DEFAULT_RETRY_AFTER, disabledUntil, parseRetryAfterHeader */
const DEFAULT_RETRY_AFTER = 60 * 1e3;
function parseRetryAfterHeader(header, now = Date.now()) {
  const headerDelay = parseInt(`${header}`, 10);
  if (!isNaN(headerDelay)) {
    return headerDelay * 1e3;
  }
  const headerDate = Date.parse(`${header}`);
  if (!isNaN(headerDate)) {
    return headerDate - now;
  }
  return DEFAULT_RETRY_AFTER;
}
function disabledUntil(limits, dataCategory) {
  return limits[dataCategory] || limits.all || 0;
}
function isRateLimited(limits, dataCategory, now = Date.now()) {
  return disabledUntil(limits, dataCategory) > now;
}
function updateRateLimits(limits, { statusCode, headers }, now = Date.now()) {
  const updatedRateLimits = {
    ...limits
  };
  const rateLimitHeader = headers == null ? void 0 : headers["x-sentry-rate-limits"];
  const retryAfterHeader = headers == null ? void 0 : headers["retry-after"];
  if (rateLimitHeader) {
    for (const limit of rateLimitHeader.trim().split(",")) {
      const [retryAfter, categories, , , namespaces] = limit.split(":", 5);
      const headerDelay = parseInt(retryAfter, 10);
      const delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1e3;
      if (!categories) {
        updatedRateLimits.all = now + delay;
      } else {
        for (const category of categories.split(";")) {
          if (category === "metric_bucket") {
            if (!namespaces || namespaces.split(";").includes("custom")) {
              updatedRateLimits[category] = now + delay;
            }
          } else {
            updatedRateLimits[category] = now + delay;
          }
        }
      }
    }
  } else if (retryAfterHeader) {
    updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now);
  } else if (statusCode === 429) {
    updatedRateLimits.all = now + 60 * 1e3;
  }
  return updatedRateLimits;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/sdkMetadata.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/sdkMetadata.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applySdkMetadata: () => (/* binding */ applySdkMetadata)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version.js */ "../../node_modules/@sentry/core/build/esm/utils/version.js");

function applySdkMetadata(options, name, names = [name], source = "npm") {
  const metadata = options._metadata || {};
  if (!metadata.sdk) {
    metadata.sdk = {
      name: `sentry.javascript.${name}`,
      packages: names.map((name2) => ({
        name: `${source}:@sentry/${name2}`,
        version: _version_js__WEBPACK_IMPORTED_MODULE_0__.SDK_VERSION
      })),
      version: _version_js__WEBPACK_IMPORTED_MODULE_0__.SDK_VERSION
    };
  }
  options._metadata = metadata;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/severity.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/severity.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   severityLevelFromString: () => (/* binding */ severityLevelFromString)
/* harmony export */ });
function severityLevelFromString(level) {
  return level === "warn" ? "warning" : ["fatal", "error", "warning", "log", "info", "debug"].includes(level) ? level : "log";
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/spanOnScope.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/spanOnScope.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _getSpanForScope: () => (/* binding */ _getSpanForScope),
/* harmony export */   _setSpanForScope: () => (/* binding */ _setSpanForScope)
/* harmony export */ });
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object.js */ "../../node_modules/@sentry/core/build/esm/utils/object.js");

const SCOPE_SPAN_FIELD = "_sentrySpan";
function _setSpanForScope(scope, span) {
  if (span) {
    (0,_object_js__WEBPACK_IMPORTED_MODULE_0__.addNonEnumerableProperty)(scope, SCOPE_SPAN_FIELD, span);
  } else {
    delete scope[SCOPE_SPAN_FIELD];
  }
}
function _getSpanForScope(scope) {
  return scope[SCOPE_SPAN_FIELD];
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/spanUtils.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TRACE_FLAG_NONE: () => (/* binding */ TRACE_FLAG_NONE),
/* harmony export */   TRACE_FLAG_SAMPLED: () => (/* binding */ TRACE_FLAG_SAMPLED),
/* harmony export */   addChildSpanToSpan: () => (/* binding */ addChildSpanToSpan),
/* harmony export */   convertSpanLinksForEnvelope: () => (/* binding */ convertSpanLinksForEnvelope),
/* harmony export */   getActiveSpan: () => (/* binding */ getActiveSpan),
/* harmony export */   getRootSpan: () => (/* binding */ getRootSpan),
/* harmony export */   getSpanDescendants: () => (/* binding */ getSpanDescendants),
/* harmony export */   getStatusMessage: () => (/* binding */ getStatusMessage),
/* harmony export */   removeChildSpanFromSpan: () => (/* binding */ removeChildSpanFromSpan),
/* harmony export */   showSpanDropWarning: () => (/* binding */ showSpanDropWarning),
/* harmony export */   spanIsSampled: () => (/* binding */ spanIsSampled),
/* harmony export */   spanTimeInputToSeconds: () => (/* binding */ spanTimeInputToSeconds),
/* harmony export */   spanToJSON: () => (/* binding */ spanToJSON),
/* harmony export */   spanToTraceContext: () => (/* binding */ spanToTraceContext),
/* harmony export */   spanToTraceHeader: () => (/* binding */ spanToTraceHeader),
/* harmony export */   spanToTransactionTraceContext: () => (/* binding */ spanToTransactionTraceContext)
/* harmony export */ });
/* unused harmony export updateSpanName */
/* harmony import */ var _asyncContext_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../asyncContext/index.js */ "../../node_modules/@sentry/core/build/esm/asyncContext/index.js");
/* harmony import */ var _carrier_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../carrier.js */ "../../node_modules/@sentry/core/build/esm/carrier.js");
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../semanticAttributes.js */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");
/* harmony import */ var _tracing_spanstatus_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tracing/spanstatus.js */ "../../node_modules/@sentry/core/build/esm/tracing/spanstatus.js");
/* harmony import */ var _tracing_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tracing/utils.js */ "../../node_modules/@sentry/core/build/esm/tracing/utils.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./object.js */ "../../node_modules/@sentry/core/build/esm/utils/object.js");
/* harmony import */ var _propagationContext_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./propagationContext.js */ "../../node_modules/@sentry/core/build/esm/utils/propagationContext.js");
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./time.js */ "../../node_modules/@sentry/core/build/esm/utils/time.js");
/* harmony import */ var _tracing_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tracing.js */ "../../node_modules/@sentry/core/build/esm/utils/tracing.js");
/* harmony import */ var _debug_logger_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _spanOnScope_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./spanOnScope.js */ "../../node_modules/@sentry/core/build/esm/utils/spanOnScope.js");












const TRACE_FLAG_NONE = 0;
const TRACE_FLAG_SAMPLED = 1;
let hasShownSpanDropWarning = false;
function spanToTransactionTraceContext(span) {
  const { spanId: span_id, traceId: trace_id } = span.spanContext();
  const { data, op, parent_span_id, status, origin, links } = spanToJSON(span);
  return {
    parent_span_id,
    span_id,
    trace_id,
    data,
    op,
    status,
    origin,
    links
  };
}
function spanToTraceContext(span) {
  const { spanId, traceId: trace_id, isRemote } = span.spanContext();
  const parent_span_id = isRemote ? spanId : spanToJSON(span).parent_span_id;
  const scope = (0,_tracing_utils_js__WEBPACK_IMPORTED_MODULE_5__.getCapturedScopesOnSpan)(span).scope;
  const span_id = isRemote ? (scope == null ? void 0 : scope.getPropagationContext().propagationSpanId) || (0,_propagationContext_js__WEBPACK_IMPORTED_MODULE_7__.generateSpanId)() : spanId;
  return {
    parent_span_id,
    span_id,
    trace_id
  };
}
function spanToTraceHeader(span) {
  const { traceId, spanId } = span.spanContext();
  const sampled = spanIsSampled(span);
  return (0,_tracing_js__WEBPACK_IMPORTED_MODULE_9__.generateSentryTraceHeader)(traceId, spanId, sampled);
}
function convertSpanLinksForEnvelope(links) {
  if (links && links.length > 0) {
    return links.map(({ context: { spanId, traceId, traceFlags, ...restContext }, attributes }) => ({
      span_id: spanId,
      trace_id: traceId,
      sampled: traceFlags === TRACE_FLAG_SAMPLED,
      attributes,
      ...restContext
    }));
  } else {
    return void 0;
  }
}
function spanTimeInputToSeconds(input) {
  if (typeof input === "number") {
    return ensureTimestampInSeconds(input);
  }
  if (Array.isArray(input)) {
    return input[0] + input[1] / 1e9;
  }
  if (input instanceof Date) {
    return ensureTimestampInSeconds(input.getTime());
  }
  return (0,_time_js__WEBPACK_IMPORTED_MODULE_8__.timestampInSeconds)();
}
function ensureTimestampInSeconds(timestamp) {
  const isMs = timestamp > 9999999999;
  return isMs ? timestamp / 1e3 : timestamp;
}
function spanToJSON(span) {
  var _a;
  if (spanIsSentrySpan(span)) {
    return span.getSpanJSON();
  }
  const { spanId: span_id, traceId: trace_id } = span.spanContext();
  if (spanIsOpenTelemetrySdkTraceBaseSpan(span)) {
    const { attributes, startTime, name, endTime, status, links } = span;
    const parentSpanId = "parentSpanId" in span ? span.parentSpanId : "parentSpanContext" in span ? (_a = span.parentSpanContext) == null ? void 0 : _a.spanId : void 0;
    return {
      span_id,
      trace_id,
      data: attributes,
      description: name,
      parent_span_id: parentSpanId,
      start_timestamp: spanTimeInputToSeconds(startTime),
      // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
      timestamp: spanTimeInputToSeconds(endTime) || void 0,
      status: getStatusMessage(status),
      op: attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_OP],
      origin: attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
      links: convertSpanLinksForEnvelope(links)
    };
  }
  return {
    span_id,
    trace_id,
    start_timestamp: 0,
    data: {}
  };
}
function spanIsOpenTelemetrySdkTraceBaseSpan(span) {
  const castSpan = span;
  return !!castSpan.attributes && !!castSpan.startTime && !!castSpan.name && !!castSpan.endTime && !!castSpan.status;
}
function spanIsSentrySpan(span) {
  return typeof span.getSpanJSON === "function";
}
function spanIsSampled(span) {
  const { traceFlags } = span.spanContext();
  return traceFlags === TRACE_FLAG_SAMPLED;
}
function getStatusMessage(status) {
  if (!status || status.code === _tracing_spanstatus_js__WEBPACK_IMPORTED_MODULE_4__.SPAN_STATUS_UNSET) {
    return void 0;
  }
  if (status.code === _tracing_spanstatus_js__WEBPACK_IMPORTED_MODULE_4__.SPAN_STATUS_OK) {
    return "ok";
  }
  return status.message || "unknown_error";
}
const CHILD_SPANS_FIELD = "_sentryChildSpans";
const ROOT_SPAN_FIELD = "_sentryRootSpan";
function addChildSpanToSpan(span, childSpan) {
  const rootSpan = span[ROOT_SPAN_FIELD] || span;
  (0,_object_js__WEBPACK_IMPORTED_MODULE_6__.addNonEnumerableProperty)(childSpan, ROOT_SPAN_FIELD, rootSpan);
  if (span[CHILD_SPANS_FIELD]) {
    span[CHILD_SPANS_FIELD].add(childSpan);
  } else {
    (0,_object_js__WEBPACK_IMPORTED_MODULE_6__.addNonEnumerableProperty)(span, CHILD_SPANS_FIELD, /* @__PURE__ */ new Set([childSpan]));
  }
}
function removeChildSpanFromSpan(span, childSpan) {
  if (span[CHILD_SPANS_FIELD]) {
    span[CHILD_SPANS_FIELD].delete(childSpan);
  }
}
function getSpanDescendants(span) {
  const resultSet = /* @__PURE__ */ new Set();
  function addSpanChildren(span2) {
    if (resultSet.has(span2)) {
      return;
    } else if (spanIsSampled(span2)) {
      resultSet.add(span2);
      const childSpans = span2[CHILD_SPANS_FIELD] ? Array.from(span2[CHILD_SPANS_FIELD]) : [];
      for (const childSpan of childSpans) {
        addSpanChildren(childSpan);
      }
    }
  }
  addSpanChildren(span);
  return Array.from(resultSet);
}
function getRootSpan(span) {
  return span[ROOT_SPAN_FIELD] || span;
}
function getActiveSpan() {
  const carrier = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_1__.getMainCarrier)();
  const acs = (0,_asyncContext_index_js__WEBPACK_IMPORTED_MODULE_0__.getAsyncContextStrategy)(carrier);
  if (acs.getActiveSpan) {
    return acs.getActiveSpan();
  }
  return (0,_spanOnScope_js__WEBPACK_IMPORTED_MODULE_11__._getSpanForScope)((0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getCurrentScope)());
}
function showSpanDropWarning() {
  if (!hasShownSpanDropWarning) {
    (0,_debug_logger_js__WEBPACK_IMPORTED_MODULE_10__.consoleSandbox)(() => {
      console.warn(
        "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly."
      );
    });
    hasShownSpanDropWarning = true;
  }
}
function updateSpanName(span, name) {
  span.updateName(name);
  span.setAttributes({
    [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "custom",
    [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_3__.SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME]: name
  });
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/stacktrace.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/stacktrace.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UNKNOWN_FUNCTION: () => (/* binding */ UNKNOWN_FUNCTION),
/* harmony export */   createStackParser: () => (/* binding */ createStackParser),
/* harmony export */   getFramesFromEvent: () => (/* binding */ getFramesFromEvent),
/* harmony export */   getFunctionName: () => (/* binding */ getFunctionName),
/* harmony export */   stackParserFromStackParserOptions: () => (/* binding */ stackParserFromStackParserOptions)
/* harmony export */ });
/* unused harmony export stripSentryFramesAndReverse */
const STACKTRACE_FRAME_LIMIT = 50;
const UNKNOWN_FUNCTION = "?";
const WEBPACK_ERROR_REGEXP = /\(error: (.*)\)/;
const STRIP_FRAME_REGEXP = /captureMessage|captureException/;
function createStackParser(...parsers) {
  const sortedParsers = parsers.sort((a, b) => a[0] - b[0]).map((p) => p[1]);
  return (stack, skipFirstLines = 0, framesToPop = 0) => {
    const frames = [];
    const lines = stack.split("\n");
    for (let i = skipFirstLines; i < lines.length; i++) {
      let line = lines[i];
      if (line.length > 1024) {
        line = line.slice(0, 1024);
      }
      const cleanedLine = WEBPACK_ERROR_REGEXP.test(line) ? line.replace(WEBPACK_ERROR_REGEXP, "$1") : line;
      if (cleanedLine.match(/\S*Error: /)) {
        continue;
      }
      for (const parser of sortedParsers) {
        const frame = parser(cleanedLine);
        if (frame) {
          frames.push(frame);
          break;
        }
      }
      if (frames.length >= STACKTRACE_FRAME_LIMIT + framesToPop) {
        break;
      }
    }
    return stripSentryFramesAndReverse(frames.slice(framesToPop));
  };
}
function stackParserFromStackParserOptions(stackParser) {
  if (Array.isArray(stackParser)) {
    return createStackParser(...stackParser);
  }
  return stackParser;
}
function stripSentryFramesAndReverse(stack) {
  if (!stack.length) {
    return [];
  }
  const localStack = Array.from(stack);
  if (/sentryWrapped/.test(getLastStackFrame(localStack).function || "")) {
    localStack.pop();
  }
  localStack.reverse();
  if (STRIP_FRAME_REGEXP.test(getLastStackFrame(localStack).function || "")) {
    localStack.pop();
    if (STRIP_FRAME_REGEXP.test(getLastStackFrame(localStack).function || "")) {
      localStack.pop();
    }
  }
  return localStack.slice(0, STACKTRACE_FRAME_LIMIT).map((frame) => ({
    ...frame,
    filename: frame.filename || getLastStackFrame(localStack).filename,
    function: frame.function || UNKNOWN_FUNCTION
  }));
}
function getLastStackFrame(arr) {
  return arr[arr.length - 1] || {};
}
const defaultFunctionName = "<anonymous>";
function getFunctionName(fn) {
  try {
    if (!fn || typeof fn !== "function") {
      return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
  } catch {
    return defaultFunctionName;
  }
}
function getFramesFromEvent(event) {
  const exception = event.exception;
  if (exception) {
    const frames = [];
    try {
      exception.values.forEach((value) => {
        if (value.stacktrace.frames) {
          frames.push(...value.stacktrace.frames);
        }
      });
      return frames;
    } catch {
      return void 0;
    }
  }
  return void 0;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/string.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/string.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   safeJoin: () => (/* binding */ safeJoin),
/* harmony export */   snipLine: () => (/* binding */ snipLine),
/* harmony export */   stringMatchesSomePattern: () => (/* binding */ stringMatchesSomePattern),
/* harmony export */   truncate: () => (/* binding */ truncate)
/* harmony export */ });
/* unused harmony export isMatchingPattern */
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");

function truncate(str, max = 0) {
  if (typeof str !== "string" || max === 0) {
    return str;
  }
  return str.length <= max ? str : `${str.slice(0, max)}...`;
}
function snipLine(line, colno) {
  let newLine = line;
  const lineLength = newLine.length;
  if (lineLength <= 150) {
    return newLine;
  }
  if (colno > lineLength) {
    colno = lineLength;
  }
  let start = Math.max(colno - 60, 0);
  if (start < 5) {
    start = 0;
  }
  let end = Math.min(start + 140, lineLength);
  if (end > lineLength - 5) {
    end = lineLength;
  }
  if (end === lineLength) {
    start = Math.max(end - 140, 0);
  }
  newLine = newLine.slice(start, end);
  if (start > 0) {
    newLine = `'{snip} ${newLine}`;
  }
  if (end < lineLength) {
    newLine += " {snip}";
  }
  return newLine;
}
function safeJoin(input, delimiter) {
  if (!Array.isArray(input)) {
    return "";
  }
  const output = [];
  for (let i = 0; i < input.length; i++) {
    const value = input[i];
    try {
      if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isVueViewModel)(value)) {
        output.push("[VueViewModel]");
      } else {
        output.push(String(value));
      }
    } catch {
      output.push("[value cannot be serialized]");
    }
  }
  return output.join(delimiter);
}
function isMatchingPattern(value, pattern, requireExactStringMatch = false) {
  if (!(0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isString)(value)) {
    return false;
  }
  if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isRegExp)(pattern)) {
    return pattern.test(value);
  }
  if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isString)(pattern)) {
    return requireExactStringMatch ? value === pattern : value.includes(pattern);
  }
  return false;
}
function stringMatchesSomePattern(testString, patterns = [], requireExactStringMatch = false) {
  return patterns.some((pattern) => isMatchingPattern(testString, pattern, requireExactStringMatch));
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/supports.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/supports.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNativeFunction: () => (/* binding */ isNativeFunction),
/* harmony export */   supportsHistory: () => (/* binding */ supportsHistory),
/* harmony export */   supportsNativeFetch: () => (/* binding */ supportsNativeFetch)
/* harmony export */ });
/* unused harmony exports supportsDOMError, supportsDOMException, supportsErrorEvent, supportsFetch, supportsReferrerPolicy, supportsReportingObserver */
/* harmony import */ var _debug_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug-build.js */ "../../node_modules/@sentry/core/build/esm/debug-build.js");
/* harmony import */ var _debug_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");



const WINDOW = _worldwide_js__WEBPACK_IMPORTED_MODULE_2__.GLOBAL_OBJ;
function supportsErrorEvent() {
  try {
    new ErrorEvent("");
    return true;
  } catch {
    return false;
  }
}
function supportsDOMError() {
  try {
    new DOMError("");
    return true;
  } catch {
    return false;
  }
}
function supportsDOMException() {
  try {
    new DOMException("");
    return true;
  } catch {
    return false;
  }
}
function supportsHistory() {
  return "history" in WINDOW && !!WINDOW.history;
}
const supportsFetch = _isFetchSupported;
function _isFetchSupported() {
  if (!("fetch" in WINDOW)) {
    return false;
  }
  try {
    new Headers();
    new Request("http://www.example.com");
    new Response();
    return true;
  } catch {
    return false;
  }
}
function isNativeFunction(func) {
  return func && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
}
function supportsNativeFetch() {
  var _a;
  if (typeof EdgeRuntime === "string") {
    return true;
  }
  if (!_isFetchSupported()) {
    return false;
  }
  if (isNativeFunction(WINDOW.fetch)) {
    return true;
  }
  let result = false;
  const doc = WINDOW.document;
  if (doc && typeof doc.createElement === "function") {
    try {
      const sandbox = doc.createElement("iframe");
      sandbox.hidden = true;
      doc.head.appendChild(sandbox);
      if ((_a = sandbox.contentWindow) == null ? void 0 : _a.fetch) {
        result = isNativeFunction(sandbox.contentWindow.fetch);
      }
      doc.head.removeChild(sandbox);
    } catch (err) {
      _debug_build_js__WEBPACK_IMPORTED_MODULE_0__.DEBUG_BUILD && _debug_logger_js__WEBPACK_IMPORTED_MODULE_1__.debug.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", err);
    }
  }
  return result;
}
function supportsReportingObserver() {
  return "ReportingObserver" in WINDOW;
}
function supportsReferrerPolicy() {
  if (!_isFetchSupported()) {
    return false;
  }
  try {
    new Request("_", {
      referrerPolicy: "origin"
    });
    return true;
  } catch {
    return false;
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/syncpromise.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/syncpromise.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SyncPromise: () => (/* binding */ SyncPromise),
/* harmony export */   rejectedSyncPromise: () => (/* binding */ rejectedSyncPromise),
/* harmony export */   resolvedSyncPromise: () => (/* binding */ resolvedSyncPromise)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is.js */ "../../node_modules/@sentry/core/build/esm/utils/is.js");

const STATE_PENDING = 0;
const STATE_RESOLVED = 1;
const STATE_REJECTED = 2;
function resolvedSyncPromise(value) {
  return new SyncPromise((resolve) => {
    resolve(value);
  });
}
function rejectedSyncPromise(reason) {
  return new SyncPromise((_, reject) => {
    reject(reason);
  });
}
class SyncPromise {
  constructor(executor) {
    this._state = STATE_PENDING;
    this._handlers = [];
    this._runExecutor(executor);
  }
  /** @inheritdoc */
  then(onfulfilled, onrejected) {
    return new SyncPromise((resolve, reject) => {
      this._handlers.push([
        false,
        (result) => {
          if (!onfulfilled) {
            resolve(result);
          } else {
            try {
              resolve(onfulfilled(result));
            } catch (e) {
              reject(e);
            }
          }
        },
        (reason) => {
          if (!onrejected) {
            reject(reason);
          } else {
            try {
              resolve(onrejected(reason));
            } catch (e) {
              reject(e);
            }
          }
        }
      ]);
      this._executeHandlers();
    });
  }
  /** @inheritdoc */
  catch(onrejected) {
    return this.then((val) => val, onrejected);
  }
  /** @inheritdoc */
  finally(onfinally) {
    return new SyncPromise((resolve, reject) => {
      let val;
      let isRejected;
      return this.then(
        (value) => {
          isRejected = false;
          val = value;
          if (onfinally) {
            onfinally();
          }
        },
        (reason) => {
          isRejected = true;
          val = reason;
          if (onfinally) {
            onfinally();
          }
        }
      ).then(() => {
        if (isRejected) {
          reject(val);
          return;
        }
        resolve(val);
      });
    });
  }
  /** Excute the resolve/reject handlers. */
  _executeHandlers() {
    if (this._state === STATE_PENDING) {
      return;
    }
    const cachedHandlers = this._handlers.slice();
    this._handlers = [];
    cachedHandlers.forEach((handler) => {
      if (handler[0]) {
        return;
      }
      if (this._state === STATE_RESOLVED) {
        handler[1](this._value);
      }
      if (this._state === STATE_REJECTED) {
        handler[2](this._value);
      }
      handler[0] = true;
    });
  }
  /** Run the executor for the SyncPromise. */
  _runExecutor(executor) {
    const setResult = (state, value) => {
      if (this._state !== STATE_PENDING) {
        return;
      }
      if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isThenable)(value)) {
        void value.then(resolve, reject);
        return;
      }
      this._state = state;
      this._value = value;
      this._executeHandlers();
    };
    const resolve = (value) => {
      setResult(STATE_RESOLVED, value);
    };
    const reject = (reason) => {
      setResult(STATE_REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/time.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/time.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   browserPerformanceTimeOrigin: () => (/* binding */ browserPerformanceTimeOrigin),
/* harmony export */   dateTimestampInSeconds: () => (/* binding */ dateTimestampInSeconds),
/* harmony export */   timestampInSeconds: () => (/* binding */ timestampInSeconds)
/* harmony export */ });
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worldwide.js */ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js");

const ONE_SECOND_IN_MS = 1e3;
function dateTimestampInSeconds() {
  return Date.now() / ONE_SECOND_IN_MS;
}
function createUnixTimestampInSecondsFunc() {
  const { performance } = _worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ;
  if (!(performance == null ? void 0 : performance.now) || !performance.timeOrigin) {
    return dateTimestampInSeconds;
  }
  const timeOrigin = performance.timeOrigin;
  return () => {
    return (timeOrigin + performance.now()) / ONE_SECOND_IN_MS;
  };
}
let _cachedTimestampInSeconds;
function timestampInSeconds() {
  const func = _cachedTimestampInSeconds != null ? _cachedTimestampInSeconds : _cachedTimestampInSeconds = createUnixTimestampInSecondsFunc();
  return func();
}
let cachedTimeOrigin;
function getBrowserTimeOrigin() {
  var _a;
  const { performance } = _worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ;
  if (!(performance == null ? void 0 : performance.now)) {
    return [void 0, "none"];
  }
  const threshold = 3600 * 1e3;
  const performanceNow = performance.now();
  const dateNow = Date.now();
  const timeOriginDelta = performance.timeOrigin ? Math.abs(performance.timeOrigin + performanceNow - dateNow) : threshold;
  const timeOriginIsReliable = timeOriginDelta < threshold;
  const navigationStart = (_a = performance.timing) == null ? void 0 : _a.navigationStart;
  const hasNavigationStart = typeof navigationStart === "number";
  const navigationStartDelta = hasNavigationStart ? Math.abs(navigationStart + performanceNow - dateNow) : threshold;
  const navigationStartIsReliable = navigationStartDelta < threshold;
  if (timeOriginIsReliable || navigationStartIsReliable) {
    if (timeOriginDelta <= navigationStartDelta) {
      return [performance.timeOrigin, "timeOrigin"];
    } else {
      return [navigationStart, "navigationStart"];
    }
  }
  return [dateNow, "dateNow"];
}
function browserPerformanceTimeOrigin() {
  if (!cachedTimeOrigin) {
    cachedTimeOrigin = getBrowserTimeOrigin();
  }
  return cachedTimeOrigin[0];
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/traceData.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/traceData.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTraceData: () => (/* binding */ getTraceData)
/* harmony export */ });
/* harmony import */ var _asyncContext_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../asyncContext/index.js */ "../../node_modules/@sentry/core/build/esm/asyncContext/index.js");
/* harmony import */ var _carrier_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../carrier.js */ "../../node_modules/@sentry/core/build/esm/carrier.js");
/* harmony import */ var _currentScopes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../currentScopes.js */ "../../node_modules/@sentry/core/build/esm/currentScopes.js");
/* harmony import */ var _exports_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../exports.js */ "../../node_modules/@sentry/core/build/esm/exports.js");
/* harmony import */ var _debug_logger_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _spanUtils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./spanUtils.js */ "../../node_modules/@sentry/core/build/esm/utils/spanUtils.js");
/* harmony import */ var _tracing_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tracing/dynamicSamplingContext.js */ "../../node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js");
/* harmony import */ var _baggage_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./baggage.js */ "../../node_modules/@sentry/core/build/esm/utils/baggage.js");
/* harmony import */ var _tracing_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tracing.js */ "../../node_modules/@sentry/core/build/esm/utils/tracing.js");









function getTraceData(options = {}) {
  const client = options.client || (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getClient)();
  if (!(0,_exports_js__WEBPACK_IMPORTED_MODULE_3__.isEnabled)() || !client) {
    return {};
  }
  const carrier = (0,_carrier_js__WEBPACK_IMPORTED_MODULE_1__.getMainCarrier)();
  const acs = (0,_asyncContext_index_js__WEBPACK_IMPORTED_MODULE_0__.getAsyncContextStrategy)(carrier);
  if (acs.getTraceData) {
    return acs.getTraceData(options);
  }
  const scope = options.scope || (0,_currentScopes_js__WEBPACK_IMPORTED_MODULE_2__.getCurrentScope)();
  const span = options.span || (0,_spanUtils_js__WEBPACK_IMPORTED_MODULE_5__.getActiveSpan)();
  const sentryTrace = span ? (0,_spanUtils_js__WEBPACK_IMPORTED_MODULE_5__.spanToTraceHeader)(span) : scopeToTraceHeader(scope);
  const dsc = span ? (0,_tracing_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_6__.getDynamicSamplingContextFromSpan)(span) : (0,_tracing_dynamicSamplingContext_js__WEBPACK_IMPORTED_MODULE_6__.getDynamicSamplingContextFromScope)(client, scope);
  const baggage = (0,_baggage_js__WEBPACK_IMPORTED_MODULE_7__.dynamicSamplingContextToSentryBaggageHeader)(dsc);
  const isValidSentryTraceHeader = _tracing_js__WEBPACK_IMPORTED_MODULE_8__.TRACEPARENT_REGEXP.test(sentryTrace);
  if (!isValidSentryTraceHeader) {
    _debug_logger_js__WEBPACK_IMPORTED_MODULE_4__.debug.warn("Invalid sentry-trace data. Cannot generate trace data");
    return {};
  }
  return {
    "sentry-trace": sentryTrace,
    baggage
  };
}
function scopeToTraceHeader(scope) {
  const { traceId, sampled, propagationSpanId } = scope.getPropagationContext();
  return (0,_tracing_js__WEBPACK_IMPORTED_MODULE_8__.generateSentryTraceHeader)(traceId, propagationSpanId, sampled);
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/tracing.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/tracing.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TRACEPARENT_REGEXP: () => (/* binding */ TRACEPARENT_REGEXP),
/* harmony export */   generateSentryTraceHeader: () => (/* binding */ generateSentryTraceHeader),
/* harmony export */   propagationContextFromHeaders: () => (/* binding */ propagationContextFromHeaders),
/* harmony export */   shouldContinueTrace: () => (/* binding */ shouldContinueTrace)
/* harmony export */ });
/* unused harmony export extractTraceparentData */
/* harmony import */ var _debug_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debug-logger.js */ "../../node_modules/@sentry/core/build/esm/utils/debug-logger.js");
/* harmony import */ var _baggage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./baggage.js */ "../../node_modules/@sentry/core/build/esm/utils/baggage.js");
/* harmony import */ var _dsn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dsn.js */ "../../node_modules/@sentry/core/build/esm/utils/dsn.js");
/* harmony import */ var _parseSampleRate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parseSampleRate.js */ "../../node_modules/@sentry/core/build/esm/utils/parseSampleRate.js");
/* harmony import */ var _propagationContext_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./propagationContext.js */ "../../node_modules/@sentry/core/build/esm/utils/propagationContext.js");





const TRACEPARENT_REGEXP = new RegExp(
  "^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$"
  // whitespace
);
function extractTraceparentData(traceparent) {
  if (!traceparent) {
    return void 0;
  }
  const matches = traceparent.match(TRACEPARENT_REGEXP);
  if (!matches) {
    return void 0;
  }
  let parentSampled;
  if (matches[3] === "1") {
    parentSampled = true;
  } else if (matches[3] === "0") {
    parentSampled = false;
  }
  return {
    traceId: matches[1],
    parentSampled,
    parentSpanId: matches[2]
  };
}
function propagationContextFromHeaders(sentryTrace, baggage) {
  const traceparentData = extractTraceparentData(sentryTrace);
  const dynamicSamplingContext = (0,_baggage_js__WEBPACK_IMPORTED_MODULE_1__.baggageHeaderToDynamicSamplingContext)(baggage);
  if (!(traceparentData == null ? void 0 : traceparentData.traceId)) {
    return {
      traceId: (0,_propagationContext_js__WEBPACK_IMPORTED_MODULE_4__.generateTraceId)(),
      sampleRand: Math.random()
    };
  }
  const sampleRand = getSampleRandFromTraceparentAndDsc(traceparentData, dynamicSamplingContext);
  if (dynamicSamplingContext) {
    dynamicSamplingContext.sample_rand = sampleRand.toString();
  }
  const { traceId, parentSpanId, parentSampled } = traceparentData;
  return {
    traceId,
    parentSpanId,
    sampled: parentSampled,
    dsc: dynamicSamplingContext || {},
    // If we have traceparent data but no DSC it means we are not head of trace and we must freeze it
    sampleRand
  };
}
function generateSentryTraceHeader(traceId = (0,_propagationContext_js__WEBPACK_IMPORTED_MODULE_4__.generateTraceId)(), spanId = (0,_propagationContext_js__WEBPACK_IMPORTED_MODULE_4__.generateSpanId)(), sampled) {
  let sampledString = "";
  if (sampled !== void 0) {
    sampledString = sampled ? "-1" : "-0";
  }
  return `${traceId}-${spanId}${sampledString}`;
}
function getSampleRandFromTraceparentAndDsc(traceparentData, dsc) {
  const parsedSampleRand = (0,_parseSampleRate_js__WEBPACK_IMPORTED_MODULE_3__.parseSampleRate)(dsc == null ? void 0 : dsc.sample_rand);
  if (parsedSampleRand !== void 0) {
    return parsedSampleRand;
  }
  const parsedSampleRate = (0,_parseSampleRate_js__WEBPACK_IMPORTED_MODULE_3__.parseSampleRate)(dsc == null ? void 0 : dsc.sample_rate);
  if (parsedSampleRate && (traceparentData == null ? void 0 : traceparentData.parentSampled) !== void 0) {
    return traceparentData.parentSampled ? (
      // Returns a sample rand with positive sampling decision [0, sampleRate)
      Math.random() * parsedSampleRate
    ) : (
      // Returns a sample rand with negative sampling decision [sampleRate, 1)
      parsedSampleRate + Math.random() * (1 - parsedSampleRate)
    );
  } else {
    return Math.random();
  }
}
function shouldContinueTrace(client, baggageOrgId) {
  const clientOrgId = (0,_dsn_js__WEBPACK_IMPORTED_MODULE_2__.extractOrgIdFromClient)(client);
  if (baggageOrgId && clientOrgId && baggageOrgId !== clientOrgId) {
    _debug_logger_js__WEBPACK_IMPORTED_MODULE_0__.debug.log(
      `Won't continue trace because org IDs don't match (incoming baggage: ${baggageOrgId}, SDK options: ${clientOrgId})`
    );
    return false;
  }
  const strictTraceContinuation = client.getOptions().strictTraceContinuation || false;
  if (strictTraceContinuation) {
    if (baggageOrgId && !clientOrgId || !baggageOrgId && clientOrgId) {
      _debug_logger_js__WEBPACK_IMPORTED_MODULE_0__.debug.log(
        `Starting a new trace because strict trace continuation is enabled but one org ID is missing (incoming baggage: ${baggageOrgId}, Sentry client: ${clientOrgId})`
      );
      return false;
    }
  }
  return true;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/transactionEvent.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/transactionEvent.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertSpanJsonToTransactionEvent: () => (/* binding */ convertSpanJsonToTransactionEvent),
/* harmony export */   convertTransactionEventToSpanJson: () => (/* binding */ convertTransactionEventToSpanJson)
/* harmony export */ });
/* harmony import */ var _semanticAttributes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../semanticAttributes.js */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");

function convertTransactionEventToSpanJson(event) {
  var _a, _b, _c;
  const { trace_id, parent_span_id, span_id, status, origin, data, op } = (_b = (_a = event.contexts) == null ? void 0 : _a.trace) != null ? _b : {};
  return {
    data: data != null ? data : {},
    description: event.transaction,
    op,
    parent_span_id,
    span_id: span_id != null ? span_id : "",
    start_timestamp: (_c = event.start_timestamp) != null ? _c : 0,
    status,
    timestamp: event.timestamp,
    trace_id: trace_id != null ? trace_id : "",
    origin,
    profile_id: data == null ? void 0 : data[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_PROFILE_ID],
    exclusive_time: data == null ? void 0 : data[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME],
    measurements: event.measurements,
    is_segment: true
  };
}
function convertSpanJsonToTransactionEvent(span) {
  return {
    type: "transaction",
    timestamp: span.timestamp,
    start_timestamp: span.start_timestamp,
    transaction: span.description,
    contexts: {
      trace: {
        trace_id: span.trace_id,
        span_id: span.span_id,
        parent_span_id: span.parent_span_id,
        op: span.op,
        status: span.status,
        origin: span.origin,
        data: {
          ...span.data,
          ...span.profile_id && { [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_PROFILE_ID]: span.profile_id },
          ...span.exclusive_time && { [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME]: span.exclusive_time }
        }
      }
    },
    measurements: span.measurements
  };
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/url.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/url.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSanitizedUrlStringFromUrlObject: () => (/* binding */ getSanitizedUrlStringFromUrlObject),
/* harmony export */   isURLObjectRelative: () => (/* binding */ isURLObjectRelative),
/* harmony export */   parseStringToURLObject: () => (/* binding */ parseStringToURLObject),
/* harmony export */   parseUrl: () => (/* binding */ parseUrl),
/* harmony export */   stripUrlQueryAndFragment: () => (/* binding */ stripUrlQueryAndFragment)
/* harmony export */ });
/* unused harmony exports getHttpSpanDetailsFromUrlObject, getSanitizedUrlString */
/* harmony import */ var _semanticAttributes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../semanticAttributes.js */ "../../node_modules/@sentry/core/build/esm/semanticAttributes.js");

const DEFAULT_BASE_URL = "thismessage:/";
function isURLObjectRelative(url) {
  return "isRelative" in url;
}
function parseStringToURLObject(url, urlBase) {
  const isRelative = url.indexOf("://") <= 0 && url.indexOf("//") !== 0;
  const base = urlBase != null ? urlBase : isRelative ? DEFAULT_BASE_URL : void 0;
  try {
    if ("canParse" in URL && !URL.canParse(url, base)) {
      return void 0;
    }
    const fullUrlObject = new URL(url, base);
    if (isRelative) {
      return {
        isRelative,
        pathname: fullUrlObject.pathname,
        search: fullUrlObject.search,
        hash: fullUrlObject.hash
      };
    }
    return fullUrlObject;
  } catch {
  }
  return void 0;
}
function getSanitizedUrlStringFromUrlObject(url) {
  if (isURLObjectRelative(url)) {
    return url.pathname;
  }
  const newUrl = new URL(url);
  newUrl.search = "";
  newUrl.hash = "";
  if (["80", "443"].includes(newUrl.port)) {
    newUrl.port = "";
  }
  if (newUrl.password) {
    newUrl.password = "%filtered%";
  }
  if (newUrl.username) {
    newUrl.username = "%filtered%";
  }
  return newUrl.toString();
}
function getHttpSpanNameFromUrlObject(urlObject, kind, request, routeName) {
  var _a, _b;
  const method = (_b = (_a = request == null ? void 0 : request.method) == null ? void 0 : _a.toUpperCase()) != null ? _b : "GET";
  const route = routeName ? routeName : urlObject ? kind === "client" ? getSanitizedUrlStringFromUrlObject(urlObject) : urlObject.pathname : "/";
  return `${method} ${route}`;
}
function getHttpSpanDetailsFromUrlObject(urlObject, kind, spanOrigin, request, routeName) {
  const attributes = {
    [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: spanOrigin,
    [_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url"
  };
  if (routeName) {
    attributes[kind === "server" ? "http.route" : "url.template"] = routeName;
    attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] = "route";
  }
  if (request == null ? void 0 : request.method) {
    attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD] = request.method.toUpperCase();
  }
  if (urlObject) {
    if (urlObject.search) {
      attributes["url.query"] = urlObject.search;
    }
    if (urlObject.hash) {
      attributes["url.fragment"] = urlObject.hash;
    }
    if (urlObject.pathname) {
      attributes["url.path"] = urlObject.pathname;
      if (urlObject.pathname === "/") {
        attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] = "route";
      }
    }
    if (!isURLObjectRelative(urlObject)) {
      attributes[_semanticAttributes_js__WEBPACK_IMPORTED_MODULE_0__.SEMANTIC_ATTRIBUTE_URL_FULL] = urlObject.href;
      if (urlObject.port) {
        attributes["url.port"] = urlObject.port;
      }
      if (urlObject.protocol) {
        attributes["url.scheme"] = urlObject.protocol;
      }
      if (urlObject.hostname) {
        attributes[kind === "server" ? "server.address" : "url.domain"] = urlObject.hostname;
      }
    }
  }
  return [getHttpSpanNameFromUrlObject(urlObject, kind, request, routeName), attributes];
}
function parseUrl(url) {
  if (!url) {
    return {};
  }
  const match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
  if (!match) {
    return {};
  }
  const query = match[6] || "";
  const fragment = match[8] || "";
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    search: query,
    hash: fragment,
    relative: match[5] + query + fragment
    // everything minus origin
  };
}
function stripUrlQueryAndFragment(urlPath) {
  return urlPath.split(/[?#]/, 1)[0];
}
function getSanitizedUrlString(url) {
  const { protocol, host, path } = url;
  const filteredHost = (host == null ? void 0 : host.replace(/^.*@/, "[filtered]:[filtered]@").replace(/(:80)$/, "").replace(/(:443)$/, "")) || "";
  return `${protocol ? `${protocol}://` : ""}${filteredHost}${path}`;
}



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/version.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/version.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SDK_VERSION: () => (/* binding */ SDK_VERSION)
/* harmony export */ });
const SDK_VERSION = "10.0.0";



/***/ }),

/***/ "../../node_modules/@sentry/core/build/esm/utils/worldwide.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@sentry/core/build/esm/utils/worldwide.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLOBAL_OBJ: () => (/* binding */ GLOBAL_OBJ)
/* harmony export */ });
const GLOBAL_OBJ = globalThis;



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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./sentry.ts ***!
  \*******************/
/* harmony import */ var _sentry_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/browser */ "../../node_modules/@sentry/browser/build/npm/esm/sdk.js");
/* harmony import */ var _sentry_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/browser */ "../../node_modules/@sentry/core/build/esm/exports.js");
/* harmony import */ var _sentry_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/browser */ "../../node_modules/@sentry/browser/build/npm/esm/integrations/browserapierrors.js");
/* harmony import */ var _sentry_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/browser */ "../../node_modules/@sentry-internal/replay/build/npm/esm/index.js");
/* harmony import */ var _sentry_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/browser */ "../../node_modules/@sentry/browser/build/npm/esm/tracing/browserTracingIntegration.js");

(0,_sentry_browser__WEBPACK_IMPORTED_MODULE_0__.init)({
  dsn: UiContext.sentry_dsn,
  release: `hydro-web@${"4.58.0-beta.7"}`,
  integrations: [
    (0,_sentry_browser__WEBPACK_IMPORTED_MODULE_4__.browserTracingIntegration)(),
    (0,_sentry_browser__WEBPACK_IMPORTED_MODULE_2__.browserApiErrorsIntegration)(),
    (0,_sentry_browser__WEBPACK_IMPORTED_MODULE_3__.replayIntegration)({
      networkRequestHeaders: ["Content-Type"],
      networkResponseHeaders: ["Content-Type", "Location"]
    })
  ],
  tracesSampleRate: 0.1,
  tracePropagationTargets: ["localhost", /^\//, window.location.host],
  replaysSessionSampleRate: 0.01,
  replaysOnErrorSampleRate: 0.1
});
(0,_sentry_browser__WEBPACK_IMPORTED_MODULE_1__.setTag)("host", window.location.host);
(0,_sentry_browser__WEBPACK_IMPORTED_MODULE_1__.setTag)("page_name", document.documentElement.getAttribute("data-page"));
window.captureException = (e) => {
  if (!e.isUserFacingError) (0,_sentry_browser__WEBPACK_IMPORTED_MODULE_1__.captureException)(e);
};
window._sentryEvents.forEach(_sentry_browser__WEBPACK_IMPORTED_MODULE_1__.captureException);

})();

/******/ })()
;