;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e0083851-cb2c-43c9-a415-2ee248929149",e._sentryDebugIdIdentifier="sentry-dbid-e0083851-cb2c-43c9-a415-2ee248929149");})();}catch(e){}};
!function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"00ee96a191eaa70b72f3e18304fd7a157fe83a8e"};}();
(self["webpackChunk_hydrooj_ui_default"] = self["webpackChunk_hydrooj_ui_default"] || []).push([["n.react-query"],{

/***/ "../../node_modules/react-query/es/core/focusManager.js":
/*!**************************************************************!*\
  !*** ../../node_modules/react-query/es/core/focusManager.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   focusManager: () => (/* binding */ focusManager)
/* harmony export */ });
/* unused harmony export FocusManager */
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _subscribable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subscribable */ "../../node_modules/react-query/es/core/subscribable.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "../../node_modules/react-query/es/core/utils.js");



var FocusManager = /* @__PURE__ */ function(_Subscribable) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FocusManager2, _Subscribable);
  function FocusManager2() {
    var _this;
    _this = _Subscribable.call(this) || this;
    _this.setup = function(onFocus) {
      var _window;
      if (!_utils__WEBPACK_IMPORTED_MODULE_2__.isServer && ((_window = window) == null ? void 0 : _window.addEventListener)) {
        var listener = function listener2() {
          return onFocus();
        };
        window.addEventListener("visibilitychange", listener, false);
        window.addEventListener("focus", listener, false);
        return function() {
          window.removeEventListener("visibilitychange", listener);
          window.removeEventListener("focus", listener);
        };
      }
    };
    return _this;
  }
  var _proto = FocusManager2.prototype;
  _proto.onSubscribe = function onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  };
  _proto.onUnsubscribe = function onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;
      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = void 0;
    }
  };
  _proto.setEventListener = function setEventListener(setup) {
    var _this$cleanup2, _this2 = this;
    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup(function(focused) {
      if (typeof focused === "boolean") {
        _this2.setFocused(focused);
      } else {
        _this2.onFocus();
      }
    });
  };
  _proto.setFocused = function setFocused(focused) {
    this.focused = focused;
    if (focused) {
      this.onFocus();
    }
  };
  _proto.onFocus = function onFocus() {
    this.listeners.forEach(function(listener) {
      listener();
    });
  };
  _proto.isFocused = function isFocused() {
    if (typeof this.focused === "boolean") {
      return this.focused;
    }
    if (typeof document === "undefined") {
      return true;
    }
    return [void 0, "visible", "prerender"].includes(document.visibilityState);
  };
  return FocusManager2;
}(_subscribable__WEBPACK_IMPORTED_MODULE_1__.Subscribable);
var focusManager = new FocusManager();


/***/ }),

/***/ "../../node_modules/react-query/es/core/index.js":
/*!*******************************************************!*\
  !*** ../../node_modules/react-query/es/core/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClient: () => (/* reexport safe */ _queryClient__WEBPACK_IMPORTED_MODULE_0__.QueryClient)
/* harmony export */ });
/* harmony import */ var _queryClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queryClient */ "../../node_modules/react-query/es/core/queryClient.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../node_modules/react-query/es/core/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_1__, "QueryClientProvider")) __webpack_require__.d(__webpack_exports__, { QueryClientProvider: function() { return _types__WEBPACK_IMPORTED_MODULE_1__.QueryClientProvider; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_1__, "useQuery")) __webpack_require__.d(__webpack_exports__, { useQuery: function() { return _types__WEBPACK_IMPORTED_MODULE_1__.useQuery; } });


















/***/ }),

/***/ "../../node_modules/react-query/es/core/infiniteQueryBehavior.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/react-query/es/core/infiniteQueryBehavior.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   infiniteQueryBehavior: () => (/* binding */ infiniteQueryBehavior)
/* harmony export */ });
/* unused harmony exports getNextPageParam, getPreviousPageParam, hasNextPage, hasPreviousPage */
/* harmony import */ var _retryer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retryer */ "../../node_modules/react-query/es/core/retryer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../node_modules/react-query/es/core/utils.js");


function infiniteQueryBehavior() {
  return {
    onFetch: function onFetch(context) {
      context.fetchFn = function() {
        var _context$fetchOptions, _context$fetchOptions2, _context$fetchOptions3, _context$fetchOptions4, _context$state$data, _context$state$data2;
        var refetchPage = (_context$fetchOptions = context.fetchOptions) == null ? void 0 : (_context$fetchOptions2 = _context$fetchOptions.meta) == null ? void 0 : _context$fetchOptions2.refetchPage;
        var fetchMore = (_context$fetchOptions3 = context.fetchOptions) == null ? void 0 : (_context$fetchOptions4 = _context$fetchOptions3.meta) == null ? void 0 : _context$fetchOptions4.fetchMore;
        var pageParam = fetchMore == null ? void 0 : fetchMore.pageParam;
        var isFetchingNextPage = (fetchMore == null ? void 0 : fetchMore.direction) === "forward";
        var isFetchingPreviousPage = (fetchMore == null ? void 0 : fetchMore.direction) === "backward";
        var oldPages = ((_context$state$data = context.state.data) == null ? void 0 : _context$state$data.pages) || [];
        var oldPageParams = ((_context$state$data2 = context.state.data) == null ? void 0 : _context$state$data2.pageParams) || [];
        var abortController = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getAbortController)();
        var abortSignal = abortController == null ? void 0 : abortController.signal;
        var newPageParams = oldPageParams;
        var cancelled = false;
        var queryFn = context.options.queryFn || function() {
          return Promise.reject("Missing queryFn");
        };
        var buildNewPages = function buildNewPages2(pages, param2, page, previous) {
          newPageParams = previous ? [param2].concat(newPageParams) : [].concat(newPageParams, [param2]);
          return previous ? [page].concat(pages) : [].concat(pages, [page]);
        };
        var fetchPage = function fetchPage2(pages, manual2, param2, previous) {
          if (cancelled) {
            return Promise.reject("Cancelled");
          }
          if (typeof param2 === "undefined" && !manual2 && pages.length) {
            return Promise.resolve(pages);
          }
          var queryFnContext = {
            queryKey: context.queryKey,
            signal: abortSignal,
            pageParam: param2,
            meta: context.meta
          };
          var queryFnResult = queryFn(queryFnContext);
          var promise2 = Promise.resolve(queryFnResult).then(function(page) {
            return buildNewPages(pages, param2, page, previous);
          });
          if ((0,_retryer__WEBPACK_IMPORTED_MODULE_0__.isCancelable)(queryFnResult)) {
            var promiseAsAny = promise2;
            promiseAsAny.cancel = queryFnResult.cancel;
          }
          return promise2;
        };
        var promise;
        if (!oldPages.length) {
          promise = fetchPage([]);
        } else if (isFetchingNextPage) {
          var manual = typeof pageParam !== "undefined";
          var param = manual ? pageParam : getNextPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, manual, param);
        } else if (isFetchingPreviousPage) {
          var _manual = typeof pageParam !== "undefined";
          var _param = _manual ? pageParam : getPreviousPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, _manual, _param, true);
        } else {
          (function() {
            newPageParams = [];
            var manual2 = typeof context.options.getNextPageParam === "undefined";
            var shouldFetchFirstPage = refetchPage && oldPages[0] ? refetchPage(oldPages[0], 0, oldPages) : true;
            promise = shouldFetchFirstPage ? fetchPage([], manual2, oldPageParams[0]) : Promise.resolve(buildNewPages([], oldPageParams[0], oldPages[0]));
            var _loop = function _loop2(i2) {
              promise = promise.then(function(pages) {
                var shouldFetchNextPage = refetchPage && oldPages[i2] ? refetchPage(oldPages[i2], i2, oldPages) : true;
                if (shouldFetchNextPage) {
                  var _param2 = manual2 ? oldPageParams[i2] : getNextPageParam(context.options, pages);
                  return fetchPage(pages, manual2, _param2);
                }
                return Promise.resolve(buildNewPages(pages, oldPageParams[i2], oldPages[i2]));
              });
            };
            for (var i = 1; i < oldPages.length; i++) {
              _loop(i);
            }
          })();
        }
        var finalPromise = promise.then(function(pages) {
          return {
            pages,
            pageParams: newPageParams
          };
        });
        var finalPromiseAsAny = finalPromise;
        finalPromiseAsAny.cancel = function() {
          cancelled = true;
          abortController == null ? void 0 : abortController.abort();
          if ((0,_retryer__WEBPACK_IMPORTED_MODULE_0__.isCancelable)(promise)) {
            promise.cancel();
          }
        };
        return finalPromise;
      };
    }
  };
}
function getNextPageParam(options, pages) {
  return options.getNextPageParam == null ? void 0 : options.getNextPageParam(pages[pages.length - 1], pages);
}
function getPreviousPageParam(options, pages) {
  return options.getPreviousPageParam == null ? void 0 : options.getPreviousPageParam(pages[0], pages);
}
function hasNextPage(options, pages) {
  if (options.getNextPageParam && Array.isArray(pages)) {
    var nextPageParam = getNextPageParam(options, pages);
    return typeof nextPageParam !== "undefined" && nextPageParam !== null && nextPageParam !== false;
  }
}
function hasPreviousPage(options, pages) {
  if (options.getPreviousPageParam && Array.isArray(pages)) {
    var previousPageParam = getPreviousPageParam(options, pages);
    return typeof previousPageParam !== "undefined" && previousPageParam !== null && previousPageParam !== false;
  }
}


/***/ }),

/***/ "../../node_modules/react-query/es/core/logger.js":
/*!********************************************************!*\
  !*** ../../node_modules/react-query/es/core/logger.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLogger: () => (/* binding */ getLogger),
/* harmony export */   setLogger: () => (/* binding */ setLogger)
/* harmony export */ });
var logger = console;
function getLogger() {
  return logger;
}
function setLogger(newLogger) {
  logger = newLogger;
}


/***/ }),

/***/ "../../node_modules/react-query/es/core/mutation.js":
/*!**********************************************************!*\
  !*** ../../node_modules/react-query/es/core/mutation.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mutation: () => (/* binding */ Mutation)
/* harmony export */ });
/* unused harmony export getDefaultState */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "../../node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "../../node_modules/react-query/es/core/logger.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager */ "../../node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _retryer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./retryer */ "../../node_modules/react-query/es/core/retryer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "../../node_modules/react-query/es/core/utils.js");





var Mutation = /* @__PURE__ */ function() {
  function Mutation2(config) {
    this.options = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, config.defaultOptions, config.options);
    this.mutationId = config.mutationId;
    this.mutationCache = config.mutationCache;
    this.observers = [];
    this.state = config.state || getDefaultState();
    this.meta = config.meta;
  }
  var _proto = Mutation2.prototype;
  _proto.setState = function setState(state) {
    this.dispatch({
      type: "setState",
      state
    });
  };
  _proto.addObserver = function addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) {
      this.observers.push(observer);
    }
  };
  _proto.removeObserver = function removeObserver(observer) {
    this.observers = this.observers.filter(function(x) {
      return x !== observer;
    });
  };
  _proto.cancel = function cancel() {
    if (this.retryer) {
      this.retryer.cancel();
      return this.retryer.promise.then(_utils__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils__WEBPACK_IMPORTED_MODULE_4__.noop);
    }
    return Promise.resolve();
  };
  _proto.continue = function _continue() {
    if (this.retryer) {
      this.retryer.continue();
      return this.retryer.promise;
    }
    return this.execute();
  };
  _proto.execute = function execute() {
    var _this = this;
    var data;
    var restored = this.state.status === "loading";
    var promise = Promise.resolve();
    if (!restored) {
      this.dispatch({
        type: "loading",
        variables: this.options.variables
      });
      promise = promise.then(function() {
        _this.mutationCache.config.onMutate == null ? void 0 : _this.mutationCache.config.onMutate(_this.state.variables, _this);
      }).then(function() {
        return _this.options.onMutate == null ? void 0 : _this.options.onMutate(_this.state.variables);
      }).then(function(context) {
        if (context !== _this.state.context) {
          _this.dispatch({
            type: "loading",
            context,
            variables: _this.state.variables
          });
        }
      });
    }
    return promise.then(function() {
      return _this.executeMutation();
    }).then(function(result) {
      data = result;
      _this.mutationCache.config.onSuccess == null ? void 0 : _this.mutationCache.config.onSuccess(data, _this.state.variables, _this.state.context, _this);
    }).then(function() {
      return _this.options.onSuccess == null ? void 0 : _this.options.onSuccess(data, _this.state.variables, _this.state.context);
    }).then(function() {
      return _this.options.onSettled == null ? void 0 : _this.options.onSettled(data, null, _this.state.variables, _this.state.context);
    }).then(function() {
      _this.dispatch({
        type: "success",
        data
      });
      return data;
    }).catch(function(error) {
      _this.mutationCache.config.onError == null ? void 0 : _this.mutationCache.config.onError(error, _this.state.variables, _this.state.context, _this);
      (0,_logger__WEBPACK_IMPORTED_MODULE_1__.getLogger)().error(error);
      return Promise.resolve().then(function() {
        return _this.options.onError == null ? void 0 : _this.options.onError(error, _this.state.variables, _this.state.context);
      }).then(function() {
        return _this.options.onSettled == null ? void 0 : _this.options.onSettled(void 0, error, _this.state.variables, _this.state.context);
      }).then(function() {
        _this.dispatch({
          type: "error",
          error
        });
        throw error;
      });
    });
  };
  _proto.executeMutation = function executeMutation() {
    var _this2 = this, _this$options$retry;
    this.retryer = new _retryer__WEBPACK_IMPORTED_MODULE_3__.Retryer({
      fn: function fn() {
        if (!_this2.options.mutationFn) {
          return Promise.reject("No mutationFn found");
        }
        return _this2.options.mutationFn(_this2.state.variables);
      },
      onFail: function onFail() {
        _this2.dispatch({
          type: "failed"
        });
      },
      onPause: function onPause() {
        _this2.dispatch({
          type: "pause"
        });
      },
      onContinue: function onContinue() {
        _this2.dispatch({
          type: "continue"
        });
      },
      retry: (_this$options$retry = this.options.retry) != null ? _this$options$retry : 0,
      retryDelay: this.options.retryDelay
    });
    return this.retryer.promise;
  };
  _proto.dispatch = function dispatch(action) {
    var _this3 = this;
    this.state = reducer(this.state, action);
    _notifyManager__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(function() {
      _this3.observers.forEach(function(observer) {
        observer.onMutationUpdate(action);
      });
      _this3.mutationCache.notify(_this3);
    });
  };
  return Mutation2;
}();
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    isPaused: false,
    status: "idle",
    variables: void 0
  };
}
function reducer(state, action) {
  switch (action.type) {
    case "failed":
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        failureCount: state.failureCount + 1
      });
    case "pause":
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isPaused: true
      });
    case "continue":
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isPaused: false
      });
    case "loading":
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        context: action.context,
        data: void 0,
        error: null,
        isPaused: false,
        status: "loading",
        variables: action.variables
      });
    case "success":
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        data: action.data,
        error: null,
        status: "success",
        isPaused: false
      });
    case "error":
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        data: void 0,
        error: action.error,
        failureCount: state.failureCount + 1,
        isPaused: false,
        status: "error"
      });
    case "setState":
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, action.state);
    default:
      return state;
  }
}


/***/ }),

/***/ "../../node_modules/react-query/es/core/mutationCache.js":
/*!***************************************************************!*\
  !*** ../../node_modules/react-query/es/core/mutationCache.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MutationCache: () => (/* binding */ MutationCache)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notifyManager */ "../../node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _mutation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mutation */ "../../node_modules/react-query/es/core/mutation.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "../../node_modules/react-query/es/core/utils.js");
/* harmony import */ var _subscribable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subscribable */ "../../node_modules/react-query/es/core/subscribable.js");





var MutationCache = /* @__PURE__ */ function(_Subscribable) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(MutationCache2, _Subscribable);
  function MutationCache2(config) {
    var _this;
    _this = _Subscribable.call(this) || this;
    _this.config = config || {};
    _this.mutations = [];
    _this.mutationId = 0;
    return _this;
  }
  var _proto = MutationCache2.prototype;
  _proto.build = function build(client, options, state) {
    var mutation = new _mutation__WEBPACK_IMPORTED_MODULE_2__.Mutation({
      mutationCache: this,
      mutationId: ++this.mutationId,
      options: client.defaultMutationOptions(options),
      state,
      defaultOptions: options.mutationKey ? client.getMutationDefaults(options.mutationKey) : void 0,
      meta: options.meta
    });
    this.add(mutation);
    return mutation;
  };
  _proto.add = function add(mutation) {
    this.mutations.push(mutation);
    this.notify(mutation);
  };
  _proto.remove = function remove(mutation) {
    this.mutations = this.mutations.filter(function(x) {
      return x !== mutation;
    });
    mutation.cancel();
    this.notify(mutation);
  };
  _proto.clear = function clear() {
    var _this2 = this;
    _notifyManager__WEBPACK_IMPORTED_MODULE_1__.notifyManager.batch(function() {
      _this2.mutations.forEach(function(mutation) {
        _this2.remove(mutation);
      });
    });
  };
  _proto.getAll = function getAll() {
    return this.mutations;
  };
  _proto.find = function find(filters) {
    if (typeof filters.exact === "undefined") {
      filters.exact = true;
    }
    return this.mutations.find(function(mutation) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(filters, mutation);
    });
  };
  _proto.findAll = function findAll(filters) {
    return this.mutations.filter(function(mutation) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(filters, mutation);
    });
  };
  _proto.notify = function notify(mutation) {
    var _this3 = this;
    _notifyManager__WEBPACK_IMPORTED_MODULE_1__.notifyManager.batch(function() {
      _this3.listeners.forEach(function(listener) {
        listener(mutation);
      });
    });
  };
  _proto.onFocus = function onFocus() {
    this.resumePausedMutations();
  };
  _proto.onOnline = function onOnline() {
    this.resumePausedMutations();
  };
  _proto.resumePausedMutations = function resumePausedMutations() {
    var pausedMutations = this.mutations.filter(function(x) {
      return x.state.isPaused;
    });
    return _notifyManager__WEBPACK_IMPORTED_MODULE_1__.notifyManager.batch(function() {
      return pausedMutations.reduce(function(promise, mutation) {
        return promise.then(function() {
          return mutation.continue().catch(_utils__WEBPACK_IMPORTED_MODULE_3__.noop);
        });
      }, Promise.resolve());
    });
  };
  return MutationCache2;
}(_subscribable__WEBPACK_IMPORTED_MODULE_4__.Subscribable);


/***/ }),

/***/ "../../node_modules/react-query/es/core/notifyManager.js":
/*!***************************************************************!*\
  !*** ../../node_modules/react-query/es/core/notifyManager.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   notifyManager: () => (/* binding */ notifyManager)
/* harmony export */ });
/* unused harmony export NotifyManager */
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../../node_modules/react-query/es/core/utils.js");

var NotifyManager = /* @__PURE__ */ function() {
  function NotifyManager2() {
    this.queue = [];
    this.transactions = 0;
    this.notifyFn = function(callback) {
      callback();
    };
    this.batchNotifyFn = function(callback) {
      callback();
    };
  }
  var _proto = NotifyManager2.prototype;
  _proto.batch = function batch(callback) {
    var result;
    this.transactions++;
    try {
      result = callback();
    } finally {
      this.transactions--;
      if (!this.transactions) {
        this.flush();
      }
    }
    return result;
  };
  _proto.schedule = function schedule(callback) {
    var _this = this;
    if (this.transactions) {
      this.queue.push(callback);
    } else {
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.scheduleMicrotask)(function() {
        _this.notifyFn(callback);
      });
    }
  };
  _proto.batchCalls = function batchCalls(callback) {
    var _this2 = this;
    return function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this2.schedule(function() {
        callback.apply(void 0, args);
      });
    };
  };
  _proto.flush = function flush() {
    var _this3 = this;
    var queue = this.queue;
    this.queue = [];
    if (queue.length) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.scheduleMicrotask)(function() {
        _this3.batchNotifyFn(function() {
          queue.forEach(function(callback) {
            _this3.notifyFn(callback);
          });
        });
      });
    }
  };
  _proto.setNotifyFunction = function setNotifyFunction(fn) {
    this.notifyFn = fn;
  };
  _proto.setBatchNotifyFunction = function setBatchNotifyFunction(fn) {
    this.batchNotifyFn = fn;
  };
  return NotifyManager2;
}();
var notifyManager = new NotifyManager();


/***/ }),

/***/ "../../node_modules/react-query/es/core/onlineManager.js":
/*!***************************************************************!*\
  !*** ../../node_modules/react-query/es/core/onlineManager.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onlineManager: () => (/* binding */ onlineManager)
/* harmony export */ });
/* unused harmony export OnlineManager */
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _subscribable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subscribable */ "../../node_modules/react-query/es/core/subscribable.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "../../node_modules/react-query/es/core/utils.js");



var OnlineManager = /* @__PURE__ */ function(_Subscribable) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(OnlineManager2, _Subscribable);
  function OnlineManager2() {
    var _this;
    _this = _Subscribable.call(this) || this;
    _this.setup = function(onOnline) {
      var _window;
      if (!_utils__WEBPACK_IMPORTED_MODULE_2__.isServer && ((_window = window) == null ? void 0 : _window.addEventListener)) {
        var listener = function listener2() {
          return onOnline();
        };
        window.addEventListener("online", listener, false);
        window.addEventListener("offline", listener, false);
        return function() {
          window.removeEventListener("online", listener);
          window.removeEventListener("offline", listener);
        };
      }
    };
    return _this;
  }
  var _proto = OnlineManager2.prototype;
  _proto.onSubscribe = function onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  };
  _proto.onUnsubscribe = function onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;
      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = void 0;
    }
  };
  _proto.setEventListener = function setEventListener(setup) {
    var _this$cleanup2, _this2 = this;
    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup(function(online) {
      if (typeof online === "boolean") {
        _this2.setOnline(online);
      } else {
        _this2.onOnline();
      }
    });
  };
  _proto.setOnline = function setOnline(online) {
    this.online = online;
    if (online) {
      this.onOnline();
    }
  };
  _proto.onOnline = function onOnline() {
    this.listeners.forEach(function(listener) {
      listener();
    });
  };
  _proto.isOnline = function isOnline() {
    if (typeof this.online === "boolean") {
      return this.online;
    }
    if (typeof navigator === "undefined" || typeof navigator.onLine === "undefined") {
      return true;
    }
    return navigator.onLine;
  };
  return OnlineManager2;
}(_subscribable__WEBPACK_IMPORTED_MODULE_1__.Subscribable);
var onlineManager = new OnlineManager();


/***/ }),

/***/ "../../node_modules/react-query/es/core/query.js":
/*!*******************************************************!*\
  !*** ../../node_modules/react-query/es/core/query.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Query: () => (/* binding */ Query)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "../../node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../node_modules/react-query/es/core/utils.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager */ "../../node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logger */ "../../node_modules/react-query/es/core/logger.js");
/* harmony import */ var _retryer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./retryer */ "../../node_modules/react-query/es/core/retryer.js");





var Query = /* @__PURE__ */ function() {
  function Query2(config) {
    this.abortSignalConsumed = false;
    this.hadObservers = false;
    this.defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.cache = config.cache;
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.initialState = config.state || this.getDefaultState(this.options);
    this.state = this.initialState;
    this.meta = config.meta;
    this.scheduleGc();
  }
  var _proto = Query2.prototype;
  _proto.setOptions = function setOptions(options) {
    var _this$options$cacheTi;
    this.options = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.defaultOptions, options);
    this.meta = options == null ? void 0 : options.meta;
    this.cacheTime = Math.max(this.cacheTime || 0, (_this$options$cacheTi = this.options.cacheTime) != null ? _this$options$cacheTi : 5 * 60 * 1e3);
  };
  _proto.setDefaultOptions = function setDefaultOptions(options) {
    this.defaultOptions = options;
  };
  _proto.scheduleGc = function scheduleGc() {
    var _this = this;
    this.clearGcTimeout();
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.isValidTimeout)(this.cacheTime)) {
      this.gcTimeout = setTimeout(function() {
        _this.optionalRemove();
      }, this.cacheTime);
    }
  };
  _proto.clearGcTimeout = function clearGcTimeout() {
    if (this.gcTimeout) {
      clearTimeout(this.gcTimeout);
      this.gcTimeout = void 0;
    }
  };
  _proto.optionalRemove = function optionalRemove() {
    if (!this.observers.length) {
      if (this.state.isFetching) {
        if (this.hadObservers) {
          this.scheduleGc();
        }
      } else {
        this.cache.remove(this);
      }
    }
  };
  _proto.setData = function setData(updater, options) {
    var _this$options$isDataE, _this$options;
    var prevData = this.state.data;
    var data = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.functionalUpdate)(updater, prevData);
    if ((_this$options$isDataE = (_this$options = this.options).isDataEqual) == null ? void 0 : _this$options$isDataE.call(_this$options, prevData, data)) {
      data = prevData;
    } else if (this.options.structuralSharing !== false) {
      data = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.replaceEqualDeep)(prevData, data);
    }
    this.dispatch({
      data,
      type: "success",
      dataUpdatedAt: options == null ? void 0 : options.updatedAt
    });
    return data;
  };
  _proto.setState = function setState(state, setStateOptions) {
    this.dispatch({
      type: "setState",
      state,
      setStateOptions
    });
  };
  _proto.cancel = function cancel(options) {
    var _this$retryer;
    var promise = this.promise;
    (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.cancel(options);
    return promise ? promise.then(_utils__WEBPACK_IMPORTED_MODULE_1__.noop).catch(_utils__WEBPACK_IMPORTED_MODULE_1__.noop) : Promise.resolve();
  };
  _proto.destroy = function destroy() {
    this.clearGcTimeout();
    this.cancel({
      silent: true
    });
  };
  _proto.reset = function reset() {
    this.destroy();
    this.setState(this.initialState);
  };
  _proto.isActive = function isActive() {
    return this.observers.some(function(observer) {
      return observer.options.enabled !== false;
    });
  };
  _proto.isFetching = function isFetching() {
    return this.state.isFetching;
  };
  _proto.isStale = function isStale() {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some(function(observer) {
      return observer.getCurrentResult().isStale;
    });
  };
  _proto.isStaleByTime = function isStaleByTime(staleTime) {
    if (staleTime === void 0) {
      staleTime = 0;
    }
    return this.state.isInvalidated || !this.state.dataUpdatedAt || !(0,_utils__WEBPACK_IMPORTED_MODULE_1__.timeUntilStale)(this.state.dataUpdatedAt, staleTime);
  };
  _proto.onFocus = function onFocus() {
    var _this$retryer2;
    var observer = this.observers.find(function(x) {
      return x.shouldFetchOnWindowFocus();
    });
    if (observer) {
      observer.refetch();
    }
    (_this$retryer2 = this.retryer) == null ? void 0 : _this$retryer2.continue();
  };
  _proto.onOnline = function onOnline() {
    var _this$retryer3;
    var observer = this.observers.find(function(x) {
      return x.shouldFetchOnReconnect();
    });
    if (observer) {
      observer.refetch();
    }
    (_this$retryer3 = this.retryer) == null ? void 0 : _this$retryer3.continue();
  };
  _proto.addObserver = function addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) {
      this.observers.push(observer);
      this.hadObservers = true;
      this.clearGcTimeout();
      this.cache.notify({
        type: "observerAdded",
        query: this,
        observer
      });
    }
  };
  _proto.removeObserver = function removeObserver(observer) {
    if (this.observers.indexOf(observer) !== -1) {
      this.observers = this.observers.filter(function(x) {
        return x !== observer;
      });
      if (!this.observers.length) {
        if (this.retryer) {
          if (this.retryer.isTransportCancelable || this.abortSignalConsumed) {
            this.retryer.cancel({
              revert: true
            });
          } else {
            this.retryer.cancelRetry();
          }
        }
        if (this.cacheTime) {
          this.scheduleGc();
        } else {
          this.cache.remove(this);
        }
      }
      this.cache.notify({
        type: "observerRemoved",
        query: this,
        observer
      });
    }
  };
  _proto.getObserversCount = function getObserversCount() {
    return this.observers.length;
  };
  _proto.invalidate = function invalidate() {
    if (!this.state.isInvalidated) {
      this.dispatch({
        type: "invalidate"
      });
    }
  };
  _proto.fetch = function fetch(options, fetchOptions) {
    var _this2 = this, _this$options$behavio, _context$fetchOptions, _abortController$abor;
    if (this.state.isFetching) {
      if (this.state.dataUpdatedAt && (fetchOptions == null ? void 0 : fetchOptions.cancelRefetch)) {
        this.cancel({
          silent: true
        });
      } else if (this.promise) {
        var _this$retryer4;
        (_this$retryer4 = this.retryer) == null ? void 0 : _this$retryer4.continueRetry();
        return this.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      var observer = this.observers.find(function(x) {
        return x.options.queryFn;
      });
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    var queryKey = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.ensureQueryKeyArray)(this.queryKey);
    var abortController = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getAbortController)();
    var queryFnContext = {
      queryKey,
      pageParam: void 0,
      meta: this.meta
    };
    Object.defineProperty(queryFnContext, "signal", {
      enumerable: true,
      get: function get() {
        if (abortController) {
          _this2.abortSignalConsumed = true;
          return abortController.signal;
        }
        return void 0;
      }
    });
    var fetchFn = function fetchFn2() {
      if (!_this2.options.queryFn) {
        return Promise.reject("Missing queryFn");
      }
      _this2.abortSignalConsumed = false;
      return _this2.options.queryFn(queryFnContext);
    };
    var context = {
      fetchOptions,
      options: this.options,
      queryKey,
      state: this.state,
      fetchFn,
      meta: this.meta
    };
    if ((_this$options$behavio = this.options.behavior) == null ? void 0 : _this$options$behavio.onFetch) {
      var _this$options$behavio2;
      (_this$options$behavio2 = this.options.behavior) == null ? void 0 : _this$options$behavio2.onFetch(context);
    }
    this.revertState = this.state;
    if (!this.state.isFetching || this.state.fetchMeta !== ((_context$fetchOptions = context.fetchOptions) == null ? void 0 : _context$fetchOptions.meta)) {
      var _context$fetchOptions2;
      this.dispatch({
        type: "fetch",
        meta: (_context$fetchOptions2 = context.fetchOptions) == null ? void 0 : _context$fetchOptions2.meta
      });
    }
    this.retryer = new _retryer__WEBPACK_IMPORTED_MODULE_4__.Retryer({
      fn: context.fetchFn,
      abort: abortController == null ? void 0 : (_abortController$abor = abortController.abort) == null ? void 0 : _abortController$abor.bind(abortController),
      onSuccess: function onSuccess(data) {
        _this2.setData(data);
        _this2.cache.config.onSuccess == null ? void 0 : _this2.cache.config.onSuccess(data, _this2);
        if (_this2.cacheTime === 0) {
          _this2.optionalRemove();
        }
      },
      onError: function onError(error) {
        if (!((0,_retryer__WEBPACK_IMPORTED_MODULE_4__.isCancelledError)(error) && error.silent)) {
          _this2.dispatch({
            type: "error",
            error
          });
        }
        if (!(0,_retryer__WEBPACK_IMPORTED_MODULE_4__.isCancelledError)(error)) {
          _this2.cache.config.onError == null ? void 0 : _this2.cache.config.onError(error, _this2);
          (0,_logger__WEBPACK_IMPORTED_MODULE_3__.getLogger)().error(error);
        }
        if (_this2.cacheTime === 0) {
          _this2.optionalRemove();
        }
      },
      onFail: function onFail() {
        _this2.dispatch({
          type: "failed"
        });
      },
      onPause: function onPause() {
        _this2.dispatch({
          type: "pause"
        });
      },
      onContinue: function onContinue() {
        _this2.dispatch({
          type: "continue"
        });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay
    });
    this.promise = this.retryer.promise;
    return this.promise;
  };
  _proto.dispatch = function dispatch(action) {
    var _this3 = this;
    this.state = this.reducer(this.state, action);
    _notifyManager__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(function() {
      _this3.observers.forEach(function(observer) {
        observer.onQueryUpdate(action);
      });
      _this3.cache.notify({
        query: _this3,
        type: "queryUpdated",
        action
      });
    });
  };
  _proto.getDefaultState = function getDefaultState(options) {
    var data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
    var hasInitialData = typeof options.initialData !== "undefined";
    var initialDataUpdatedAt = hasInitialData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
    var hasData = typeof data !== "undefined";
    return {
      data,
      dataUpdateCount: 0,
      dataUpdatedAt: hasData ? initialDataUpdatedAt != null ? initialDataUpdatedAt : Date.now() : 0,
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: 0,
      fetchFailureCount: 0,
      fetchMeta: null,
      isFetching: false,
      isInvalidated: false,
      isPaused: false,
      status: hasData ? "success" : "idle"
    };
  };
  _proto.reducer = function reducer(state, action) {
    var _action$meta, _action$dataUpdatedAt;
    switch (action.type) {
      case "failed":
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          fetchFailureCount: state.fetchFailureCount + 1
        });
      case "pause":
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isPaused: true
        });
      case "continue":
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isPaused: false
        });
      case "fetch":
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          fetchFailureCount: 0,
          fetchMeta: (_action$meta = action.meta) != null ? _action$meta : null,
          isFetching: true,
          isPaused: false
        }, !state.dataUpdatedAt && {
          error: null,
          status: "loading"
        });
      case "success":
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          data: action.data,
          dataUpdateCount: state.dataUpdateCount + 1,
          dataUpdatedAt: (_action$dataUpdatedAt = action.dataUpdatedAt) != null ? _action$dataUpdatedAt : Date.now(),
          error: null,
          fetchFailureCount: 0,
          isFetching: false,
          isInvalidated: false,
          isPaused: false,
          status: "success"
        });
      case "error":
        var error = action.error;
        if ((0,_retryer__WEBPACK_IMPORTED_MODULE_4__.isCancelledError)(error) && error.revert && this.revertState) {
          return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.revertState);
        }
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          error,
          errorUpdateCount: state.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: state.fetchFailureCount + 1,
          isFetching: false,
          isPaused: false,
          status: "error"
        });
      case "invalidate":
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isInvalidated: true
        });
      case "setState":
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, action.state);
      default:
        return state;
    }
  };
  return Query2;
}();


/***/ }),

/***/ "../../node_modules/react-query/es/core/queryCache.js":
/*!************************************************************!*\
  !*** ../../node_modules/react-query/es/core/queryCache.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryCache: () => (/* binding */ QueryCache)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../node_modules/react-query/es/core/utils.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query */ "../../node_modules/react-query/es/core/query.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager */ "../../node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _subscribable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subscribable */ "../../node_modules/react-query/es/core/subscribable.js");





var QueryCache = /* @__PURE__ */ function(_Subscribable) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(QueryCache2, _Subscribable);
  function QueryCache2(config) {
    var _this;
    _this = _Subscribable.call(this) || this;
    _this.config = config || {};
    _this.queries = [];
    _this.queriesMap = {};
    return _this;
  }
  var _proto = QueryCache2.prototype;
  _proto.build = function build(client, options, state) {
    var _options$queryHash;
    var queryKey = options.queryKey;
    var queryHash = (_options$queryHash = options.queryHash) != null ? _options$queryHash : (0,_utils__WEBPACK_IMPORTED_MODULE_1__.hashQueryKeyByOptions)(queryKey, options);
    var query = this.get(queryHash);
    if (!query) {
      query = new _query__WEBPACK_IMPORTED_MODULE_2__.Query({
        cache: this,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey),
        meta: options.meta
      });
      this.add(query);
    }
    return query;
  };
  _proto.add = function add(query) {
    if (!this.queriesMap[query.queryHash]) {
      this.queriesMap[query.queryHash] = query;
      this.queries.push(query);
      this.notify({
        type: "queryAdded",
        query
      });
    }
  };
  _proto.remove = function remove(query) {
    var queryInMap = this.queriesMap[query.queryHash];
    if (queryInMap) {
      query.destroy();
      this.queries = this.queries.filter(function(x) {
        return x !== query;
      });
      if (queryInMap === query) {
        delete this.queriesMap[query.queryHash];
      }
      this.notify({
        type: "queryRemoved",
        query
      });
    }
  };
  _proto.clear = function clear() {
    var _this2 = this;
    _notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(function() {
      _this2.queries.forEach(function(query) {
        _this2.remove(query);
      });
    });
  };
  _proto.get = function get(queryHash) {
    return this.queriesMap[queryHash];
  };
  _proto.getAll = function getAll() {
    return this.queries;
  };
  _proto.find = function find(arg1, arg2) {
    var _parseFilterArgs = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseFilterArgs)(arg1, arg2), filters = _parseFilterArgs[0];
    if (typeof filters.exact === "undefined") {
      filters.exact = true;
    }
    return this.queries.find(function(query) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(filters, query);
    });
  };
  _proto.findAll = function findAll(arg1, arg2) {
    var _parseFilterArgs2 = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseFilterArgs)(arg1, arg2), filters = _parseFilterArgs2[0];
    return Object.keys(filters).length > 0 ? this.queries.filter(function(query) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(filters, query);
    }) : this.queries;
  };
  _proto.notify = function notify(event) {
    var _this3 = this;
    _notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(function() {
      _this3.listeners.forEach(function(listener) {
        listener(event);
      });
    });
  };
  _proto.onFocus = function onFocus() {
    var _this4 = this;
    _notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(function() {
      _this4.queries.forEach(function(query) {
        query.onFocus();
      });
    });
  };
  _proto.onOnline = function onOnline() {
    var _this5 = this;
    _notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(function() {
      _this5.queries.forEach(function(query) {
        query.onOnline();
      });
    });
  };
  return QueryCache2;
}(_subscribable__WEBPACK_IMPORTED_MODULE_4__.Subscribable);


/***/ }),

/***/ "../../node_modules/react-query/es/core/queryClient.js":
/*!*************************************************************!*\
  !*** ../../node_modules/react-query/es/core/queryClient.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClient: () => (/* binding */ QueryClient)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "../../node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../node_modules/react-query/es/core/utils.js");
/* harmony import */ var _queryCache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queryCache */ "../../node_modules/react-query/es/core/queryCache.js");
/* harmony import */ var _mutationCache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mutationCache */ "../../node_modules/react-query/es/core/mutationCache.js");
/* harmony import */ var _focusManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./focusManager */ "../../node_modules/react-query/es/core/focusManager.js");
/* harmony import */ var _onlineManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./onlineManager */ "../../node_modules/react-query/es/core/onlineManager.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notifyManager */ "../../node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _infiniteQueryBehavior__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./infiniteQueryBehavior */ "../../node_modules/react-query/es/core/infiniteQueryBehavior.js");








var QueryClient = /* @__PURE__ */ function() {
  function QueryClient2(config) {
    if (config === void 0) {
      config = {};
    }
    this.queryCache = config.queryCache || new _queryCache__WEBPACK_IMPORTED_MODULE_2__.QueryCache();
    this.mutationCache = config.mutationCache || new _mutationCache__WEBPACK_IMPORTED_MODULE_3__.MutationCache();
    this.defaultOptions = config.defaultOptions || {};
    this.queryDefaults = [];
    this.mutationDefaults = [];
  }
  var _proto = QueryClient2.prototype;
  _proto.mount = function mount() {
    var _this = this;
    this.unsubscribeFocus = _focusManager__WEBPACK_IMPORTED_MODULE_4__.focusManager.subscribe(function() {
      if (_focusManager__WEBPACK_IMPORTED_MODULE_4__.focusManager.isFocused() && _onlineManager__WEBPACK_IMPORTED_MODULE_5__.onlineManager.isOnline()) {
        _this.mutationCache.onFocus();
        _this.queryCache.onFocus();
      }
    });
    this.unsubscribeOnline = _onlineManager__WEBPACK_IMPORTED_MODULE_5__.onlineManager.subscribe(function() {
      if (_focusManager__WEBPACK_IMPORTED_MODULE_4__.focusManager.isFocused() && _onlineManager__WEBPACK_IMPORTED_MODULE_5__.onlineManager.isOnline()) {
        _this.mutationCache.onOnline();
        _this.queryCache.onOnline();
      }
    });
  };
  _proto.unmount = function unmount() {
    var _this$unsubscribeFocu, _this$unsubscribeOnli;
    (_this$unsubscribeFocu = this.unsubscribeFocus) == null ? void 0 : _this$unsubscribeFocu.call(this);
    (_this$unsubscribeOnli = this.unsubscribeOnline) == null ? void 0 : _this$unsubscribeOnli.call(this);
  };
  _proto.isFetching = function isFetching(arg1, arg2) {
    var _parseFilterArgs = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseFilterArgs)(arg1, arg2), filters = _parseFilterArgs[0];
    filters.fetching = true;
    return this.queryCache.findAll(filters).length;
  };
  _proto.isMutating = function isMutating(filters) {
    return this.mutationCache.findAll((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, filters, {
      fetching: true
    })).length;
  };
  _proto.getQueryData = function getQueryData(queryKey, filters) {
    var _this$queryCache$find;
    return (_this$queryCache$find = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find.state.data;
  };
  _proto.getQueriesData = function getQueriesData(queryKeyOrFilters) {
    return this.getQueryCache().findAll(queryKeyOrFilters).map(function(_ref) {
      var queryKey = _ref.queryKey, state = _ref.state;
      var data = state.data;
      return [queryKey, data];
    });
  };
  _proto.setQueryData = function setQueryData(queryKey, updater, options) {
    var parsedOptions = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseQueryArgs)(queryKey);
    var defaultedOptions = this.defaultQueryOptions(parsedOptions);
    return this.queryCache.build(this, defaultedOptions).setData(updater, options);
  };
  _proto.setQueriesData = function setQueriesData(queryKeyOrFilters, updater, options) {
    var _this2 = this;
    return _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function() {
      return _this2.getQueryCache().findAll(queryKeyOrFilters).map(function(_ref2) {
        var queryKey = _ref2.queryKey;
        return [queryKey, _this2.setQueryData(queryKey, updater, options)];
      });
    });
  };
  _proto.getQueryState = function getQueryState(queryKey, filters) {
    var _this$queryCache$find2;
    return (_this$queryCache$find2 = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find2.state;
  };
  _proto.removeQueries = function removeQueries(arg1, arg2) {
    var _parseFilterArgs2 = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseFilterArgs)(arg1, arg2), filters = _parseFilterArgs2[0];
    var queryCache = this.queryCache;
    _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function() {
      queryCache.findAll(filters).forEach(function(query) {
        queryCache.remove(query);
      });
    });
  };
  _proto.resetQueries = function resetQueries(arg1, arg2, arg3) {
    var _this3 = this;
    var _parseFilterArgs3 = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseFilterArgs)(arg1, arg2, arg3), filters = _parseFilterArgs3[0], options = _parseFilterArgs3[1];
    var queryCache = this.queryCache;
    var refetchFilters = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, filters, {
      active: true
    });
    return _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function() {
      queryCache.findAll(filters).forEach(function(query) {
        query.reset();
      });
      return _this3.refetchQueries(refetchFilters, options);
    });
  };
  _proto.cancelQueries = function cancelQueries(arg1, arg2, arg3) {
    var _this4 = this;
    var _parseFilterArgs4 = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseFilterArgs)(arg1, arg2, arg3), filters = _parseFilterArgs4[0], _parseFilterArgs4$ = _parseFilterArgs4[1], cancelOptions = _parseFilterArgs4$ === void 0 ? {} : _parseFilterArgs4$;
    if (typeof cancelOptions.revert === "undefined") {
      cancelOptions.revert = true;
    }
    var promises = _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function() {
      return _this4.queryCache.findAll(filters).map(function(query) {
        return query.cancel(cancelOptions);
      });
    });
    return Promise.all(promises).then(_utils__WEBPACK_IMPORTED_MODULE_1__.noop).catch(_utils__WEBPACK_IMPORTED_MODULE_1__.noop);
  };
  _proto.invalidateQueries = function invalidateQueries(arg1, arg2, arg3) {
    var _ref3, _filters$refetchActiv, _filters$refetchInact, _this5 = this;
    var _parseFilterArgs5 = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseFilterArgs)(arg1, arg2, arg3), filters = _parseFilterArgs5[0], options = _parseFilterArgs5[1];
    var refetchFilters = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, filters, {
      // if filters.refetchActive is not provided and filters.active is explicitly false,
      // e.g. invalidateQueries({ active: false }), we don't want to refetch active queries
      active: (_ref3 = (_filters$refetchActiv = filters.refetchActive) != null ? _filters$refetchActiv : filters.active) != null ? _ref3 : true,
      inactive: (_filters$refetchInact = filters.refetchInactive) != null ? _filters$refetchInact : false
    });
    return _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function() {
      _this5.queryCache.findAll(filters).forEach(function(query) {
        query.invalidate();
      });
      return _this5.refetchQueries(refetchFilters, options);
    });
  };
  _proto.refetchQueries = function refetchQueries(arg1, arg2, arg3) {
    var _this6 = this;
    var _parseFilterArgs6 = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseFilterArgs)(arg1, arg2, arg3), filters = _parseFilterArgs6[0], options = _parseFilterArgs6[1];
    var promises = _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function() {
      return _this6.queryCache.findAll(filters).map(function(query) {
        return query.fetch(void 0, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, {
          meta: {
            refetchPage: filters == null ? void 0 : filters.refetchPage
          }
        }));
      });
    });
    var promise = Promise.all(promises).then(_utils__WEBPACK_IMPORTED_MODULE_1__.noop);
    if (!(options == null ? void 0 : options.throwOnError)) {
      promise = promise.catch(_utils__WEBPACK_IMPORTED_MODULE_1__.noop);
    }
    return promise;
  };
  _proto.fetchQuery = function fetchQuery(arg1, arg2, arg3) {
    var parsedOptions = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseQueryArgs)(arg1, arg2, arg3);
    var defaultedOptions = this.defaultQueryOptions(parsedOptions);
    if (typeof defaultedOptions.retry === "undefined") {
      defaultedOptions.retry = false;
    }
    var query = this.queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  };
  _proto.prefetchQuery = function prefetchQuery(arg1, arg2, arg3) {
    return this.fetchQuery(arg1, arg2, arg3).then(_utils__WEBPACK_IMPORTED_MODULE_1__.noop).catch(_utils__WEBPACK_IMPORTED_MODULE_1__.noop);
  };
  _proto.fetchInfiniteQuery = function fetchInfiniteQuery(arg1, arg2, arg3) {
    var parsedOptions = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseQueryArgs)(arg1, arg2, arg3);
    parsedOptions.behavior = (0,_infiniteQueryBehavior__WEBPACK_IMPORTED_MODULE_7__.infiniteQueryBehavior)();
    return this.fetchQuery(parsedOptions);
  };
  _proto.prefetchInfiniteQuery = function prefetchInfiniteQuery(arg1, arg2, arg3) {
    return this.fetchInfiniteQuery(arg1, arg2, arg3).then(_utils__WEBPACK_IMPORTED_MODULE_1__.noop).catch(_utils__WEBPACK_IMPORTED_MODULE_1__.noop);
  };
  _proto.cancelMutations = function cancelMutations() {
    var _this7 = this;
    var promises = _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function() {
      return _this7.mutationCache.getAll().map(function(mutation) {
        return mutation.cancel();
      });
    });
    return Promise.all(promises).then(_utils__WEBPACK_IMPORTED_MODULE_1__.noop).catch(_utils__WEBPACK_IMPORTED_MODULE_1__.noop);
  };
  _proto.resumePausedMutations = function resumePausedMutations() {
    return this.getMutationCache().resumePausedMutations();
  };
  _proto.executeMutation = function executeMutation(options) {
    return this.mutationCache.build(this, options).execute();
  };
  _proto.getQueryCache = function getQueryCache() {
    return this.queryCache;
  };
  _proto.getMutationCache = function getMutationCache() {
    return this.mutationCache;
  };
  _proto.getDefaultOptions = function getDefaultOptions() {
    return this.defaultOptions;
  };
  _proto.setDefaultOptions = function setDefaultOptions(options) {
    this.defaultOptions = options;
  };
  _proto.setQueryDefaults = function setQueryDefaults(queryKey, options) {
    var result = this.queryDefaults.find(function(x) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.hashQueryKey)(queryKey) === (0,_utils__WEBPACK_IMPORTED_MODULE_1__.hashQueryKey)(x.queryKey);
    });
    if (result) {
      result.defaultOptions = options;
    } else {
      this.queryDefaults.push({
        queryKey,
        defaultOptions: options
      });
    }
  };
  _proto.getQueryDefaults = function getQueryDefaults(queryKey) {
    var _this$queryDefaults$f;
    return queryKey ? (_this$queryDefaults$f = this.queryDefaults.find(function(x) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.partialMatchKey)(queryKey, x.queryKey);
    })) == null ? void 0 : _this$queryDefaults$f.defaultOptions : void 0;
  };
  _proto.setMutationDefaults = function setMutationDefaults(mutationKey, options) {
    var result = this.mutationDefaults.find(function(x) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.hashQueryKey)(mutationKey) === (0,_utils__WEBPACK_IMPORTED_MODULE_1__.hashQueryKey)(x.mutationKey);
    });
    if (result) {
      result.defaultOptions = options;
    } else {
      this.mutationDefaults.push({
        mutationKey,
        defaultOptions: options
      });
    }
  };
  _proto.getMutationDefaults = function getMutationDefaults(mutationKey) {
    var _this$mutationDefault;
    return mutationKey ? (_this$mutationDefault = this.mutationDefaults.find(function(x) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.partialMatchKey)(mutationKey, x.mutationKey);
    })) == null ? void 0 : _this$mutationDefault.defaultOptions : void 0;
  };
  _proto.defaultQueryOptions = function defaultQueryOptions(options) {
    if (options == null ? void 0 : options._defaulted) {
      return options;
    }
    var defaultedOptions = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.defaultOptions.queries, this.getQueryDefaults(options == null ? void 0 : options.queryKey), options, {
      _defaulted: true
    });
    if (!defaultedOptions.queryHash && defaultedOptions.queryKey) {
      defaultedOptions.queryHash = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.hashQueryKeyByOptions)(defaultedOptions.queryKey, defaultedOptions);
    }
    return defaultedOptions;
  };
  _proto.defaultQueryObserverOptions = function defaultQueryObserverOptions(options) {
    return this.defaultQueryOptions(options);
  };
  _proto.defaultMutationOptions = function defaultMutationOptions(options) {
    if (options == null ? void 0 : options._defaulted) {
      return options;
    }
    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.defaultOptions.mutations, this.getMutationDefaults(options == null ? void 0 : options.mutationKey), options, {
      _defaulted: true
    });
  };
  _proto.clear = function clear() {
    this.queryCache.clear();
    this.mutationCache.clear();
  };
  return QueryClient2;
}();


/***/ }),

/***/ "../../node_modules/react-query/es/core/queryObserver.js":
/*!***************************************************************!*\
  !*** ../../node_modules/react-query/es/core/queryObserver.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryObserver: () => (/* binding */ QueryObserver)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "../../node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "../../node_modules/react-query/es/core/utils.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager */ "../../node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _focusManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./focusManager */ "../../node_modules/react-query/es/core/focusManager.js");
/* harmony import */ var _subscribable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./subscribable */ "../../node_modules/react-query/es/core/subscribable.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logger */ "../../node_modules/react-query/es/core/logger.js");
/* harmony import */ var _retryer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./retryer */ "../../node_modules/react-query/es/core/retryer.js");








var QueryObserver = /* @__PURE__ */ function(_Subscribable) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(QueryObserver2, _Subscribable);
  function QueryObserver2(client, options) {
    var _this;
    _this = _Subscribable.call(this) || this;
    _this.client = client;
    _this.options = options;
    _this.trackedProps = [];
    _this.selectError = null;
    _this.bindMethods();
    _this.setOptions(options);
    return _this;
  }
  var _proto = QueryObserver2.prototype;
  _proto.bindMethods = function bindMethods() {
    this.remove = this.remove.bind(this);
    this.refetch = this.refetch.bind(this);
  };
  _proto.onSubscribe = function onSubscribe() {
    if (this.listeners.length === 1) {
      this.currentQuery.addObserver(this);
      if (shouldFetchOnMount(this.currentQuery, this.options)) {
        this.executeFetch();
      }
      this.updateTimers();
    }
  };
  _proto.onUnsubscribe = function onUnsubscribe() {
    if (!this.listeners.length) {
      this.destroy();
    }
  };
  _proto.shouldFetchOnReconnect = function shouldFetchOnReconnect() {
    return shouldFetchOn(this.currentQuery, this.options, this.options.refetchOnReconnect);
  };
  _proto.shouldFetchOnWindowFocus = function shouldFetchOnWindowFocus() {
    return shouldFetchOn(this.currentQuery, this.options, this.options.refetchOnWindowFocus);
  };
  _proto.destroy = function destroy() {
    this.listeners = [];
    this.clearTimers();
    this.currentQuery.removeObserver(this);
  };
  _proto.setOptions = function setOptions(options, notifyOptions) {
    var prevOptions = this.options;
    var prevQuery = this.currentQuery;
    this.options = this.client.defaultQueryObserverOptions(options);
    if (typeof this.options.enabled !== "undefined" && typeof this.options.enabled !== "boolean") {
      throw new Error("Expected enabled to be a boolean");
    }
    if (!this.options.queryKey) {
      this.options.queryKey = prevOptions.queryKey;
    }
    this.updateQuery();
    var mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(this.currentQuery, prevQuery, this.options, prevOptions)) {
      this.executeFetch();
    }
    this.updateResult(notifyOptions);
    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || this.options.staleTime !== prevOptions.staleTime)) {
      this.updateStaleTimeout();
    }
    var nextRefetchInterval = this.computeRefetchInterval();
    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || nextRefetchInterval !== this.currentRefetchInterval)) {
      this.updateRefetchInterval(nextRefetchInterval);
    }
  };
  _proto.getOptimisticResult = function getOptimisticResult(options) {
    var defaultedOptions = this.client.defaultQueryObserverOptions(options);
    var query = this.client.getQueryCache().build(this.client, defaultedOptions);
    return this.createResult(query, defaultedOptions);
  };
  _proto.getCurrentResult = function getCurrentResult() {
    return this.currentResult;
  };
  _proto.trackResult = function trackResult(result, defaultedOptions) {
    var _this2 = this;
    var trackedResult = {};
    var trackProp = function trackProp2(key) {
      if (!_this2.trackedProps.includes(key)) {
        _this2.trackedProps.push(key);
      }
    };
    Object.keys(result).forEach(function(key) {
      Object.defineProperty(trackedResult, key, {
        configurable: false,
        enumerable: true,
        get: function get() {
          trackProp(key);
          return result[key];
        }
      });
    });
    if (defaultedOptions.useErrorBoundary || defaultedOptions.suspense) {
      trackProp("error");
    }
    return trackedResult;
  };
  _proto.getNextResult = function getNextResult(options) {
    var _this3 = this;
    return new Promise(function(resolve, reject) {
      var unsubscribe = _this3.subscribe(function(result) {
        if (!result.isFetching) {
          unsubscribe();
          if (result.isError && (options == null ? void 0 : options.throwOnError)) {
            reject(result.error);
          } else {
            resolve(result);
          }
        }
      });
    });
  };
  _proto.getCurrentQuery = function getCurrentQuery() {
    return this.currentQuery;
  };
  _proto.remove = function remove() {
    this.client.getQueryCache().remove(this.currentQuery);
  };
  _proto.refetch = function refetch(options) {
    return this.fetch((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, {
      meta: {
        refetchPage: options == null ? void 0 : options.refetchPage
      }
    }));
  };
  _proto.fetchOptimistic = function fetchOptimistic(options) {
    var _this4 = this;
    var defaultedOptions = this.client.defaultQueryObserverOptions(options);
    var query = this.client.getQueryCache().build(this.client, defaultedOptions);
    return query.fetch().then(function() {
      return _this4.createResult(query, defaultedOptions);
    });
  };
  _proto.fetch = function fetch(fetchOptions) {
    var _this5 = this;
    return this.executeFetch(fetchOptions).then(function() {
      _this5.updateResult();
      return _this5.currentResult;
    });
  };
  _proto.executeFetch = function executeFetch(fetchOptions) {
    this.updateQuery();
    var promise = this.currentQuery.fetch(this.options, fetchOptions);
    if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
      promise = promise.catch(_utils__WEBPACK_IMPORTED_MODULE_2__.noop);
    }
    return promise;
  };
  _proto.updateStaleTimeout = function updateStaleTimeout() {
    var _this6 = this;
    this.clearStaleTimeout();
    if (_utils__WEBPACK_IMPORTED_MODULE_2__.isServer || this.currentResult.isStale || !(0,_utils__WEBPACK_IMPORTED_MODULE_2__.isValidTimeout)(this.options.staleTime)) {
      return;
    }
    var time = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.timeUntilStale)(this.currentResult.dataUpdatedAt, this.options.staleTime);
    var timeout = time + 1;
    this.staleTimeoutId = setTimeout(function() {
      if (!_this6.currentResult.isStale) {
        _this6.updateResult();
      }
    }, timeout);
  };
  _proto.computeRefetchInterval = function computeRefetchInterval() {
    var _this$options$refetch;
    return typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.currentResult.data, this.currentQuery) : (_this$options$refetch = this.options.refetchInterval) != null ? _this$options$refetch : false;
  };
  _proto.updateRefetchInterval = function updateRefetchInterval(nextInterval) {
    var _this7 = this;
    this.clearRefetchInterval();
    this.currentRefetchInterval = nextInterval;
    if (_utils__WEBPACK_IMPORTED_MODULE_2__.isServer || this.options.enabled === false || !(0,_utils__WEBPACK_IMPORTED_MODULE_2__.isValidTimeout)(this.currentRefetchInterval) || this.currentRefetchInterval === 0) {
      return;
    }
    this.refetchIntervalId = setInterval(function() {
      if (_this7.options.refetchIntervalInBackground || _focusManager__WEBPACK_IMPORTED_MODULE_4__.focusManager.isFocused()) {
        _this7.executeFetch();
      }
    }, this.currentRefetchInterval);
  };
  _proto.updateTimers = function updateTimers() {
    this.updateStaleTimeout();
    this.updateRefetchInterval(this.computeRefetchInterval());
  };
  _proto.clearTimers = function clearTimers() {
    this.clearStaleTimeout();
    this.clearRefetchInterval();
  };
  _proto.clearStaleTimeout = function clearStaleTimeout() {
    if (this.staleTimeoutId) {
      clearTimeout(this.staleTimeoutId);
      this.staleTimeoutId = void 0;
    }
  };
  _proto.clearRefetchInterval = function clearRefetchInterval() {
    if (this.refetchIntervalId) {
      clearInterval(this.refetchIntervalId);
      this.refetchIntervalId = void 0;
    }
  };
  _proto.createResult = function createResult(query, options) {
    var prevQuery = this.currentQuery;
    var prevOptions = this.options;
    var prevResult = this.currentResult;
    var prevResultState = this.currentResultState;
    var prevResultOptions = this.currentResultOptions;
    var queryChange = query !== prevQuery;
    var queryInitialState = queryChange ? query.state : this.currentQueryInitialState;
    var prevQueryResult = queryChange ? this.currentResult : this.previousQueryResult;
    var state = query.state;
    var dataUpdatedAt = state.dataUpdatedAt, error = state.error, errorUpdatedAt = state.errorUpdatedAt, isFetching = state.isFetching, status = state.status;
    var isPreviousData = false;
    var isPlaceholderData = false;
    var data;
    if (options.optimisticResults) {
      var mounted = this.hasListeners();
      var fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      var fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        isFetching = true;
        if (!dataUpdatedAt) {
          status = "loading";
        }
      }
    }
    if (options.keepPreviousData && !state.dataUpdateCount && (prevQueryResult == null ? void 0 : prevQueryResult.isSuccess) && status !== "error") {
      data = prevQueryResult.data;
      dataUpdatedAt = prevQueryResult.dataUpdatedAt;
      status = prevQueryResult.status;
      isPreviousData = true;
    } else if (options.select && typeof state.data !== "undefined") {
      if (prevResult && state.data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === this.selectFn) {
        data = this.selectResult;
      } else {
        try {
          this.selectFn = options.select;
          data = options.select(state.data);
          if (options.structuralSharing !== false) {
            data = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.replaceEqualDeep)(prevResult == null ? void 0 : prevResult.data, data);
          }
          this.selectResult = data;
          this.selectError = null;
        } catch (selectError) {
          (0,_logger__WEBPACK_IMPORTED_MODULE_6__.getLogger)().error(selectError);
          this.selectError = selectError;
        }
      }
    } else {
      data = state.data;
    }
    if (typeof options.placeholderData !== "undefined" && typeof data === "undefined" && (status === "loading" || status === "idle")) {
      var placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData() : options.placeholderData;
        if (options.select && typeof placeholderData !== "undefined") {
          try {
            placeholderData = options.select(placeholderData);
            if (options.structuralSharing !== false) {
              placeholderData = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.replaceEqualDeep)(prevResult == null ? void 0 : prevResult.data, placeholderData);
            }
            this.selectError = null;
          } catch (selectError) {
            (0,_logger__WEBPACK_IMPORTED_MODULE_6__.getLogger)().error(selectError);
            this.selectError = selectError;
          }
        }
      }
      if (typeof placeholderData !== "undefined") {
        status = "success";
        data = placeholderData;
        isPlaceholderData = true;
      }
    }
    if (this.selectError) {
      error = this.selectError;
      data = this.selectResult;
      errorUpdatedAt = Date.now();
      status = "error";
    }
    var result = {
      status,
      isLoading: status === "loading",
      isSuccess: status === "success",
      isError: status === "error",
      isIdle: status === "idle",
      data,
      dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: state.fetchFailureCount,
      errorUpdateCount: state.errorUpdateCount,
      isFetched: state.dataUpdateCount > 0 || state.errorUpdateCount > 0,
      isFetchedAfterMount: state.dataUpdateCount > queryInitialState.dataUpdateCount || state.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && status !== "loading",
      isLoadingError: status === "error" && state.dataUpdatedAt === 0,
      isPlaceholderData,
      isPreviousData,
      isRefetchError: status === "error" && state.dataUpdatedAt !== 0,
      isStale: isStale(query, options),
      refetch: this.refetch,
      remove: this.remove
    };
    return result;
  };
  _proto.shouldNotifyListeners = function shouldNotifyListeners(result, prevResult) {
    if (!prevResult) {
      return true;
    }
    var _this$options = this.options, notifyOnChangeProps = _this$options.notifyOnChangeProps, notifyOnChangePropsExclusions = _this$options.notifyOnChangePropsExclusions;
    if (!notifyOnChangeProps && !notifyOnChangePropsExclusions) {
      return true;
    }
    if (notifyOnChangeProps === "tracked" && !this.trackedProps.length) {
      return true;
    }
    var includedProps = notifyOnChangeProps === "tracked" ? this.trackedProps : notifyOnChangeProps;
    return Object.keys(result).some(function(key) {
      var typedKey = key;
      var changed = result[typedKey] !== prevResult[typedKey];
      var isIncluded = includedProps == null ? void 0 : includedProps.some(function(x) {
        return x === key;
      });
      var isExcluded = notifyOnChangePropsExclusions == null ? void 0 : notifyOnChangePropsExclusions.some(function(x) {
        return x === key;
      });
      return changed && !isExcluded && (!includedProps || isIncluded);
    });
  };
  _proto.updateResult = function updateResult(notifyOptions) {
    var prevResult = this.currentResult;
    this.currentResult = this.createResult(this.currentQuery, this.options);
    this.currentResultState = this.currentQuery.state;
    this.currentResultOptions = this.options;
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.shallowEqualObjects)(this.currentResult, prevResult)) {
      return;
    }
    var defaultNotifyOptions = {
      cache: true
    };
    if ((notifyOptions == null ? void 0 : notifyOptions.listeners) !== false && this.shouldNotifyListeners(this.currentResult, prevResult)) {
      defaultNotifyOptions.listeners = true;
    }
    this.notify((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, defaultNotifyOptions, notifyOptions));
  };
  _proto.updateQuery = function updateQuery() {
    var query = this.client.getQueryCache().build(this.client, this.options);
    if (query === this.currentQuery) {
      return;
    }
    var prevQuery = this.currentQuery;
    this.currentQuery = query;
    this.currentQueryInitialState = query.state;
    this.previousQueryResult = this.currentResult;
    if (this.hasListeners()) {
      prevQuery == null ? void 0 : prevQuery.removeObserver(this);
      query.addObserver(this);
    }
  };
  _proto.onQueryUpdate = function onQueryUpdate(action) {
    var notifyOptions = {};
    if (action.type === "success") {
      notifyOptions.onSuccess = true;
    } else if (action.type === "error" && !(0,_retryer__WEBPACK_IMPORTED_MODULE_7__.isCancelledError)(action.error)) {
      notifyOptions.onError = true;
    }
    this.updateResult(notifyOptions);
    if (this.hasListeners()) {
      this.updateTimers();
    }
  };
  _proto.notify = function notify(notifyOptions) {
    var _this8 = this;
    _notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(function() {
      if (notifyOptions.onSuccess) {
        _this8.options.onSuccess == null ? void 0 : _this8.options.onSuccess(_this8.currentResult.data);
        _this8.options.onSettled == null ? void 0 : _this8.options.onSettled(_this8.currentResult.data, null);
      } else if (notifyOptions.onError) {
        _this8.options.onError == null ? void 0 : _this8.options.onError(_this8.currentResult.error);
        _this8.options.onSettled == null ? void 0 : _this8.options.onSettled(void 0, _this8.currentResult.error);
      }
      if (notifyOptions.listeners) {
        _this8.listeners.forEach(function(listener) {
          listener(_this8.currentResult);
        });
      }
      if (notifyOptions.cache) {
        _this8.client.getQueryCache().notify({
          query: _this8.currentQuery,
          type: "observerResultsUpdated"
        });
      }
    });
  };
  return QueryObserver2;
}(_subscribable__WEBPACK_IMPORTED_MODULE_5__.Subscribable);
function shouldLoadOnMount(query, options) {
  return options.enabled !== false && !query.state.dataUpdatedAt && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.dataUpdatedAt > 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (options.enabled !== false) {
    var value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return options.enabled !== false && (query !== prevQuery || prevOptions.enabled === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return query.isStaleByTime(options.staleTime);
}


/***/ }),

/***/ "../../node_modules/react-query/es/core/retryer.js":
/*!*********************************************************!*\
  !*** ../../node_modules/react-query/es/core/retryer.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Retryer: () => (/* binding */ Retryer),
/* harmony export */   isCancelable: () => (/* binding */ isCancelable),
/* harmony export */   isCancelledError: () => (/* binding */ isCancelledError)
/* harmony export */ });
/* unused harmony export CancelledError */
/* harmony import */ var _focusManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./focusManager */ "../../node_modules/react-query/es/core/focusManager.js");
/* harmony import */ var _onlineManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./onlineManager */ "../../node_modules/react-query/es/core/onlineManager.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "../../node_modules/react-query/es/core/utils.js");



function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * Math.pow(2, failureCount), 3e4);
}
function isCancelable(value) {
  return typeof (value == null ? void 0 : value.cancel) === "function";
}
var CancelledError = function CancelledError2(options) {
  this.revert = options == null ? void 0 : options.revert;
  this.silent = options == null ? void 0 : options.silent;
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
var Retryer = function Retryer2(config) {
  var _this = this;
  var cancelRetry = false;
  var cancelFn;
  var continueFn;
  var promiseResolve;
  var promiseReject;
  this.abort = config.abort;
  this.cancel = function(cancelOptions) {
    return cancelFn == null ? void 0 : cancelFn(cancelOptions);
  };
  this.cancelRetry = function() {
    cancelRetry = true;
  };
  this.continueRetry = function() {
    cancelRetry = false;
  };
  this.continue = function() {
    return continueFn == null ? void 0 : continueFn();
  };
  this.failureCount = 0;
  this.isPaused = false;
  this.isResolved = false;
  this.isTransportCancelable = false;
  this.promise = new Promise(function(outerResolve, outerReject) {
    promiseResolve = outerResolve;
    promiseReject = outerReject;
  });
  var resolve = function resolve2(value) {
    if (!_this.isResolved) {
      _this.isResolved = true;
      config.onSuccess == null ? void 0 : config.onSuccess(value);
      continueFn == null ? void 0 : continueFn();
      promiseResolve(value);
    }
  };
  var reject = function reject2(value) {
    if (!_this.isResolved) {
      _this.isResolved = true;
      config.onError == null ? void 0 : config.onError(value);
      continueFn == null ? void 0 : continueFn();
      promiseReject(value);
    }
  };
  var pause = function pause2() {
    return new Promise(function(continueResolve) {
      continueFn = continueResolve;
      _this.isPaused = true;
      config.onPause == null ? void 0 : config.onPause();
    }).then(function() {
      continueFn = void 0;
      _this.isPaused = false;
      config.onContinue == null ? void 0 : config.onContinue();
    });
  };
  var run = function run2() {
    if (_this.isResolved) {
      return;
    }
    var promiseOrValue;
    try {
      promiseOrValue = config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    cancelFn = function cancelFn2(cancelOptions) {
      if (!_this.isResolved) {
        reject(new CancelledError(cancelOptions));
        _this.abort == null ? void 0 : _this.abort();
        if (isCancelable(promiseOrValue)) {
          try {
            promiseOrValue.cancel();
          } catch (_unused) {
          }
        }
      }
    };
    _this.isTransportCancelable = isCancelable(promiseOrValue);
    Promise.resolve(promiseOrValue).then(resolve).catch(function(error) {
      var _config$retry, _config$retryDelay;
      if (_this.isResolved) {
        return;
      }
      var retry = (_config$retry = config.retry) != null ? _config$retry : 3;
      var retryDelay = (_config$retryDelay = config.retryDelay) != null ? _config$retryDelay : defaultRetryDelay;
      var delay = typeof retryDelay === "function" ? retryDelay(_this.failureCount, error) : retryDelay;
      var shouldRetry = retry === true || typeof retry === "number" && _this.failureCount < retry || typeof retry === "function" && retry(_this.failureCount, error);
      if (cancelRetry || !shouldRetry) {
        reject(error);
        return;
      }
      _this.failureCount++;
      config.onFail == null ? void 0 : config.onFail(_this.failureCount, error);
      (0,_utils__WEBPACK_IMPORTED_MODULE_2__.sleep)(delay).then(function() {
        if (!_focusManager__WEBPACK_IMPORTED_MODULE_0__.focusManager.isFocused() || !_onlineManager__WEBPACK_IMPORTED_MODULE_1__.onlineManager.isOnline()) {
          return pause();
        }
      }).then(function() {
        if (cancelRetry) {
          reject(error);
        } else {
          run2();
        }
      });
    });
  };
  run();
};


/***/ }),

/***/ "../../node_modules/react-query/es/core/subscribable.js":
/*!**************************************************************!*\
  !*** ../../node_modules/react-query/es/core/subscribable.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Subscribable: () => (/* binding */ Subscribable)
/* harmony export */ });
var Subscribable = /* @__PURE__ */ function() {
  function Subscribable2() {
    this.listeners = [];
  }
  var _proto = Subscribable2.prototype;
  _proto.subscribe = function subscribe(listener) {
    var _this = this;
    var callback = listener || function() {
      return void 0;
    };
    this.listeners.push(callback);
    this.onSubscribe();
    return function() {
      _this.listeners = _this.listeners.filter(function(x) {
        return x !== callback;
      });
      _this.onUnsubscribe();
    };
  };
  _proto.hasListeners = function hasListeners() {
    return this.listeners.length > 0;
  };
  _proto.onSubscribe = function onSubscribe() {
  };
  _proto.onUnsubscribe = function onUnsubscribe() {
  };
  return Subscribable2;
}();


/***/ }),

/***/ "../../node_modules/react-query/es/core/types.js":
/*!*******************************************************!*\
  !*** ../../node_modules/react-query/es/core/types.js ***!
  \*******************************************************/
/***/ (() => {



/***/ }),

/***/ "../../node_modules/react-query/es/core/utils.js":
/*!*******************************************************!*\
  !*** ../../node_modules/react-query/es/core/utils.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ensureQueryKeyArray: () => (/* binding */ ensureQueryKeyArray),
/* harmony export */   functionalUpdate: () => (/* binding */ functionalUpdate),
/* harmony export */   getAbortController: () => (/* binding */ getAbortController),
/* harmony export */   hashQueryKey: () => (/* binding */ hashQueryKey),
/* harmony export */   hashQueryKeyByOptions: () => (/* binding */ hashQueryKeyByOptions),
/* harmony export */   isServer: () => (/* binding */ isServer),
/* harmony export */   isValidTimeout: () => (/* binding */ isValidTimeout),
/* harmony export */   matchMutation: () => (/* binding */ matchMutation),
/* harmony export */   matchQuery: () => (/* binding */ matchQuery),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   parseFilterArgs: () => (/* binding */ parseFilterArgs),
/* harmony export */   parseQueryArgs: () => (/* binding */ parseQueryArgs),
/* harmony export */   partialMatchKey: () => (/* binding */ partialMatchKey),
/* harmony export */   replaceEqualDeep: () => (/* binding */ replaceEqualDeep),
/* harmony export */   scheduleMicrotask: () => (/* binding */ scheduleMicrotask),
/* harmony export */   shallowEqualObjects: () => (/* binding */ shallowEqualObjects),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   timeUntilStale: () => (/* binding */ timeUntilStale)
/* harmony export */ });
/* unused harmony exports difference, replaceAt, parseMutationArgs, parseMutationFilterArgs, mapQueryStatusFilter, stableValueHash, partialDeepEqual, isPlainObject, isQueryKey, isError */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "../../node_modules/@babel/runtime/helpers/esm/extends.js");

var isServer = typeof window === "undefined";
function noop() {
  return void 0;
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function ensureQueryKeyArray(value) {
  return Array.isArray(value) ? value : [value];
}
function difference(array1, array2) {
  return array1.filter(function(x) {
    return array2.indexOf(x) === -1;
  });
}
function replaceAt(array, index, value) {
  var copy = array.slice(0);
  copy[index] = value;
  return copy;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }
  if (typeof arg2 === "function") {
    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg3, {
      queryKey: arg1,
      queryFn: arg2
    });
  }
  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg2, {
    queryKey: arg1
  });
}
function parseMutationArgs(arg1, arg2, arg3) {
  if (isQueryKey(arg1)) {
    if (typeof arg2 === "function") {
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg3, {
        mutationKey: arg1,
        mutationFn: arg2
      });
    }
    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg2, {
      mutationKey: arg1
    });
  }
  if (typeof arg1 === "function") {
    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg2, {
      mutationFn: arg1
    });
  }
  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg1);
}
function parseFilterArgs(arg1, arg2, arg3) {
  return isQueryKey(arg1) ? [(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg2, {
    queryKey: arg1
  }), arg3] : [arg1 || {}, arg2];
}
function parseMutationFilterArgs(arg1, arg2) {
  return isQueryKey(arg1) ? (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg2, {
    mutationKey: arg1
  }) : arg1;
}
function mapQueryStatusFilter(active, inactive) {
  if (active === true && inactive === true || active == null && inactive == null) {
    return "all";
  } else if (active === false && inactive === false) {
    return "none";
  } else {
    var isActive = active != null ? active : !inactive;
    return isActive ? "active" : "inactive";
  }
}
function matchQuery(filters, query) {
  var active = filters.active, exact = filters.exact, fetching = filters.fetching, inactive = filters.inactive, predicate = filters.predicate, queryKey = filters.queryKey, stale = filters.stale;
  if (isQueryKey(queryKey)) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  var queryStatusFilter = mapQueryStatusFilter(active, inactive);
  if (queryStatusFilter === "none") {
    return false;
  } else if (queryStatusFilter !== "all") {
    var isActive = query.isActive();
    if (queryStatusFilter === "active" && !isActive) {
      return false;
    }
    if (queryStatusFilter === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (typeof fetching === "boolean" && query.isFetching() !== fetching) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  var exact = filters.exact, fetching = filters.fetching, predicate = filters.predicate, mutationKey = filters.mutationKey;
  if (isQueryKey(mutationKey)) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (typeof fetching === "boolean" && mutation.state.status === "loading" !== fetching) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  var hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashQueryKey;
  return hashFn(queryKey);
}
function hashQueryKey(queryKey) {
  var asArray = ensureQueryKeyArray(queryKey);
  return stableValueHash(asArray);
}
function stableValueHash(value) {
  return JSON.stringify(value, function(_, val) {
    return isPlainObject(val) ? Object.keys(val).sort().reduce(function(result, key) {
      result[key] = val[key];
      return result;
    }, {}) : val;
  });
}
function partialMatchKey(a, b) {
  return partialDeepEqual(ensureQueryKeyArray(a), ensureQueryKeyArray(b));
}
function partialDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some(function(key) {
      return !partialDeepEqual(a[key], b[key]);
    });
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  var array = Array.isArray(a) && Array.isArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    var aSize = array ? a.length : Object.keys(a).length;
    var bItems = array ? b : Object.keys(b);
    var bSize = bItems.length;
    var copy = array ? [] : {};
    var equalItems = 0;
    for (var i = 0; i < bSize; i++) {
      var key = array ? i : bItems[i];
      copy[key] = replaceEqualDeep(a[key], b[key]);
      if (copy[key] === a[key]) {
        equalItems++;
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (a && !b || b && !a) {
    return false;
  }
  for (var key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  var ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  var prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isQueryKey(value) {
  return typeof value === "string" || Array.isArray(value);
}
function isError(value) {
  return value instanceof Error;
}
function sleep(timeout) {
  return new Promise(function(resolve) {
    setTimeout(resolve, timeout);
  });
}
function scheduleMicrotask(callback) {
  Promise.resolve().then(callback).catch(function(error) {
    return setTimeout(function() {
      throw error;
    });
  });
}
function getAbortController() {
  if (typeof AbortController === "function") {
    return new AbortController();
  }
}


/***/ }),

/***/ "../../node_modules/react-query/es/index.js":
/*!**************************************************!*\
  !*** ../../node_modules/react-query/es/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClient: () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_0__.QueryClient),
/* harmony export */   QueryClientProvider: () => (/* reexport safe */ _react__WEBPACK_IMPORTED_MODULE_1__.QueryClientProvider),
/* harmony export */   useQuery: () => (/* reexport safe */ _react__WEBPACK_IMPORTED_MODULE_1__.useQuery)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "../../node_modules/react-query/es/core/index.js");
/* harmony reexport (checked) */ if(__webpack_require__.o(_core__WEBPACK_IMPORTED_MODULE_0__, "QueryClientProvider")) __webpack_require__.d(__webpack_exports__, { QueryClientProvider: function() { return _core__WEBPACK_IMPORTED_MODULE_0__.QueryClientProvider; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_core__WEBPACK_IMPORTED_MODULE_0__, "useQuery")) __webpack_require__.d(__webpack_exports__, { useQuery: function() { return _core__WEBPACK_IMPORTED_MODULE_0__.useQuery; } });
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react */ "../../node_modules/react-query/es/react/index.js");




/***/ }),

/***/ "../../node_modules/react-query/es/react/QueryClientProvider.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/react-query/es/react/QueryClientProvider.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClientProvider: () => (/* binding */ QueryClientProvider),
/* harmony export */   useQueryClient: () => (/* binding */ useQueryClient)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var defaultContext = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createContext(void 0);
var QueryClientSharingContext = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createContext(false);
function getQueryClientContext(contextSharing) {
  if (contextSharing && typeof window !== "undefined") {
    if (!window.ReactQueryClientContext) {
      window.ReactQueryClientContext = defaultContext;
    }
    return window.ReactQueryClientContext;
  }
  return defaultContext;
}
var useQueryClient = function useQueryClient2() {
  var queryClient = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(getQueryClientContext(react__WEBPACK_IMPORTED_MODULE_0___default().useContext(QueryClientSharingContext)));
  if (!queryClient) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return queryClient;
};
var QueryClientProvider = function QueryClientProvider2(_ref) {
  var client = _ref.client, _ref$contextSharing = _ref.contextSharing, contextSharing = _ref$contextSharing === void 0 ? false : _ref$contextSharing, children = _ref.children;
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function() {
    client.mount();
    return function() {
      client.unmount();
    };
  }, [client]);
  var Context = getQueryClientContext(contextSharing);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(QueryClientSharingContext.Provider, {
    value: contextSharing
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Context.Provider, {
    value: client
  }, children));
};


/***/ }),

/***/ "../../node_modules/react-query/es/react/QueryErrorResetBoundary.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/react-query/es/react/QueryErrorResetBoundary.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useQueryErrorResetBoundary: () => (/* binding */ useQueryErrorResetBoundary)
/* harmony export */ });
/* unused harmony export QueryErrorResetBoundary */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function createValue() {
  var _isReset = false;
  return {
    clearReset: function clearReset() {
      _isReset = false;
    },
    reset: function reset() {
      _isReset = true;
    },
    isReset: function isReset() {
      return _isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createContext(createValue());
var useQueryErrorResetBoundary = function useQueryErrorResetBoundary2() {
  return react__WEBPACK_IMPORTED_MODULE_0___default().useContext(QueryErrorResetBoundaryContext);
};
var QueryErrorResetBoundary = function QueryErrorResetBoundary2(_ref) {
  var children = _ref.children;
  var value = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(function() {
    return createValue();
  }, []);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(QueryErrorResetBoundaryContext.Provider, {
    value
  }, typeof children === "function" ? children(value) : children);
};


/***/ }),

/***/ "../../node_modules/react-query/es/react/index.js":
/*!********************************************************!*\
  !*** ../../node_modules/react-query/es/react/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClientProvider: () => (/* reexport safe */ _QueryClientProvider__WEBPACK_IMPORTED_MODULE_2__.QueryClientProvider),
/* harmony export */   useQuery: () => (/* reexport safe */ _useQuery__WEBPACK_IMPORTED_MODULE_3__.useQuery)
/* harmony export */ });
/* harmony import */ var _setBatchUpdatesFn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setBatchUpdatesFn */ "../../node_modules/react-query/es/react/setBatchUpdatesFn.js");
/* harmony import */ var _setLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setLogger */ "../../node_modules/react-query/es/react/setLogger.js");
/* harmony import */ var _QueryClientProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryClientProvider */ "../../node_modules/react-query/es/react/QueryClientProvider.js");
/* harmony import */ var _useQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useQuery */ "../../node_modules/react-query/es/react/useQuery.js");














/***/ }),

/***/ "../../node_modules/react-query/es/react/logger.js":
/*!*********************************************************!*\
  !*** ../../node_modules/react-query/es/react/logger.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   logger: () => (/* binding */ logger)
/* harmony export */ });
var logger = console;


/***/ }),

/***/ "../../node_modules/react-query/es/react/reactBatchedUpdates.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/react-query/es/react/reactBatchedUpdates.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unstable_batchedUpdates: () => (/* binding */ unstable_batchedUpdates)
/* harmony export */ });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "../../node_modules/react-dom/index.js");

var unstable_batchedUpdates = react_dom__WEBPACK_IMPORTED_MODULE_0__.unstable_batchedUpdates;


/***/ }),

/***/ "../../node_modules/react-query/es/react/setBatchUpdatesFn.js":
/*!********************************************************************!*\
  !*** ../../node_modules/react-query/es/react/setBatchUpdatesFn.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "../../node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _reactBatchedUpdates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reactBatchedUpdates */ "../../node_modules/react-query/es/react/reactBatchedUpdates.js");


_core__WEBPACK_IMPORTED_MODULE_0__.notifyManager.setBatchNotifyFunction(_reactBatchedUpdates__WEBPACK_IMPORTED_MODULE_1__.unstable_batchedUpdates);


/***/ }),

/***/ "../../node_modules/react-query/es/react/setLogger.js":
/*!************************************************************!*\
  !*** ../../node_modules/react-query/es/react/setLogger.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "../../node_modules/react-query/es/core/logger.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "../../node_modules/react-query/es/react/logger.js");


(0,_core__WEBPACK_IMPORTED_MODULE_0__.setLogger)(_logger__WEBPACK_IMPORTED_MODULE_1__.logger);


/***/ }),

/***/ "../../node_modules/react-query/es/react/useBaseQuery.js":
/*!***************************************************************!*\
  !*** ../../node_modules/react-query/es/react/useBaseQuery.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useBaseQuery: () => (/* binding */ useBaseQuery)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_notifyManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/notifyManager */ "../../node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _QueryErrorResetBoundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryErrorResetBoundary */ "../../node_modules/react-query/es/react/QueryErrorResetBoundary.js");
/* harmony import */ var _QueryClientProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QueryClientProvider */ "../../node_modules/react-query/es/react/QueryClientProvider.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "../../node_modules/react-query/es/react/utils.js");





function useBaseQuery(options, Observer) {
  var mountedRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(false);
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(0), forceUpdate = _React$useState[1];
  var queryClient = (0,_QueryClientProvider__WEBPACK_IMPORTED_MODULE_3__.useQueryClient)();
  var errorResetBoundary = (0,_QueryErrorResetBoundary__WEBPACK_IMPORTED_MODULE_2__.useQueryErrorResetBoundary)();
  var defaultedOptions = queryClient.defaultQueryObserverOptions(options);
  defaultedOptions.optimisticResults = true;
  if (defaultedOptions.onError) {
    defaultedOptions.onError = _core_notifyManager__WEBPACK_IMPORTED_MODULE_1__.notifyManager.batchCalls(defaultedOptions.onError);
  }
  if (defaultedOptions.onSuccess) {
    defaultedOptions.onSuccess = _core_notifyManager__WEBPACK_IMPORTED_MODULE_1__.notifyManager.batchCalls(defaultedOptions.onSuccess);
  }
  if (defaultedOptions.onSettled) {
    defaultedOptions.onSettled = _core_notifyManager__WEBPACK_IMPORTED_MODULE_1__.notifyManager.batchCalls(defaultedOptions.onSettled);
  }
  if (defaultedOptions.suspense) {
    if (typeof defaultedOptions.staleTime !== "number") {
      defaultedOptions.staleTime = 1e3;
    }
    if (defaultedOptions.cacheTime === 0) {
      defaultedOptions.cacheTime = 1;
    }
  }
  if (defaultedOptions.suspense || defaultedOptions.useErrorBoundary) {
    if (!errorResetBoundary.isReset()) {
      defaultedOptions.retryOnMount = false;
    }
  }
  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(function() {
    return new Observer(queryClient, defaultedOptions);
  }), observer = _React$useState2[0];
  var result = observer.getOptimisticResult(defaultedOptions);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function() {
    mountedRef.current = true;
    errorResetBoundary.clearReset();
    var unsubscribe = observer.subscribe(_core_notifyManager__WEBPACK_IMPORTED_MODULE_1__.notifyManager.batchCalls(function() {
      if (mountedRef.current) {
        forceUpdate(function(x) {
          return x + 1;
        });
      }
    }));
    observer.updateResult();
    return function() {
      mountedRef.current = false;
      unsubscribe();
    };
  }, [errorResetBoundary, observer]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function() {
    observer.setOptions(defaultedOptions, {
      listeners: false
    });
  }, [defaultedOptions, observer]);
  if (defaultedOptions.suspense && result.isLoading) {
    throw observer.fetchOptimistic(defaultedOptions).then(function(_ref) {
      var data = _ref.data;
      defaultedOptions.onSuccess == null ? void 0 : defaultedOptions.onSuccess(data);
      defaultedOptions.onSettled == null ? void 0 : defaultedOptions.onSettled(data, null);
    }).catch(function(error) {
      errorResetBoundary.clearReset();
      defaultedOptions.onError == null ? void 0 : defaultedOptions.onError(error);
      defaultedOptions.onSettled == null ? void 0 : defaultedOptions.onSettled(void 0, error);
    });
  }
  if (result.isError && !errorResetBoundary.isReset() && !result.isFetching && (0,_utils__WEBPACK_IMPORTED_MODULE_4__.shouldThrowError)(defaultedOptions.suspense, defaultedOptions.useErrorBoundary, [result.error, observer.getCurrentQuery()])) {
    throw result.error;
  }
  if (defaultedOptions.notifyOnChangeProps === "tracked") {
    result = observer.trackResult(result, defaultedOptions);
  }
  return result;
}


/***/ }),

/***/ "../../node_modules/react-query/es/react/useQuery.js":
/*!***********************************************************!*\
  !*** ../../node_modules/react-query/es/react/useQuery.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useQuery: () => (/* binding */ useQuery)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "../../node_modules/react-query/es/core/queryObserver.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils */ "../../node_modules/react-query/es/core/utils.js");
/* harmony import */ var _useBaseQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useBaseQuery */ "../../node_modules/react-query/es/react/useBaseQuery.js");



function useQuery(arg1, arg2, arg3) {
  var parsedOptions = (0,_core_utils__WEBPACK_IMPORTED_MODULE_1__.parseQueryArgs)(arg1, arg2, arg3);
  return (0,_useBaseQuery__WEBPACK_IMPORTED_MODULE_2__.useBaseQuery)(parsedOptions, _core__WEBPACK_IMPORTED_MODULE_0__.QueryObserver);
}


/***/ }),

/***/ "../../node_modules/react-query/es/react/utils.js":
/*!********************************************************!*\
  !*** ../../node_modules/react-query/es/react/utils.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shouldThrowError: () => (/* binding */ shouldThrowError)
/* harmony export */ });
function shouldThrowError(suspense, _useErrorBoundary, params) {
  if (typeof _useErrorBoundary === "function") {
    return _useErrorBoundary.apply(void 0, params);
  }
  if (typeof _useErrorBoundary === "boolean") return _useErrorBoundary;
  return !!suspense;
}


/***/ }),

/***/ "../../node_modules/web-streams-polyfill/dist/ponyfill.mjs":
/*!*****************************************************************!*\
  !*** ../../node_modules/web-streams-polyfill/dist/ponyfill.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ByteLengthQueuingStrategy: () => (/* binding */ ByteLengthQueuingStrategy),
/* harmony export */   CountQueuingStrategy: () => (/* binding */ CountQueuingStrategy),
/* harmony export */   ReadableByteStreamController: () => (/* binding */ ReadableByteStreamController),
/* harmony export */   ReadableStream: () => (/* binding */ ReadableStream),
/* harmony export */   ReadableStreamBYOBReader: () => (/* binding */ ReadableStreamBYOBReader),
/* harmony export */   ReadableStreamBYOBRequest: () => (/* binding */ ReadableStreamBYOBRequest),
/* harmony export */   ReadableStreamDefaultController: () => (/* binding */ ReadableStreamDefaultController),
/* harmony export */   ReadableStreamDefaultReader: () => (/* binding */ ReadableStreamDefaultReader),
/* harmony export */   TransformStream: () => (/* binding */ TransformStream),
/* harmony export */   TransformStreamDefaultController: () => (/* binding */ TransformStreamDefaultController),
/* harmony export */   WritableStream: () => (/* binding */ WritableStream),
/* harmony export */   WritableStreamDefaultController: () => (/* binding */ WritableStreamDefaultController),
/* harmony export */   WritableStreamDefaultWriter: () => (/* binding */ WritableStreamDefaultWriter)
/* harmony export */ });
/**
 * @license
 * web-streams-polyfill v4.1.0
 * Copyright 2024 Mattias Buelens, Diwank Singh Tomer and other contributors.
 * This code is released under the MIT license.
 * SPDX-License-Identifier: MIT
 */
function e() {
}
function t(e2) {
  return "object" == typeof e2 && null !== e2 || "function" == typeof e2;
}
const r = e;
function o(e2, t2) {
  try {
    Object.defineProperty(e2, "name", { value: t2, configurable: true });
  } catch (e3) {
  }
}
const n = Promise, a = Promise.resolve.bind(n), i = Promise.prototype.then, l = Promise.reject.bind(n), s = a;
function u(e2) {
  return new n(e2);
}
function c(e2) {
  return u((t2) => t2(e2));
}
function d(e2) {
  return l(e2);
}
function f(e2, t2, r2) {
  return i.call(e2, t2, r2);
}
function b(e2, t2, o2) {
  f(f(e2, t2, o2), void 0, r);
}
function h(e2, t2) {
  b(e2, t2);
}
function m(e2, t2) {
  b(e2, void 0, t2);
}
function _(e2, t2, r2) {
  return f(e2, t2, r2);
}
function p(e2) {
  f(e2, void 0, r);
}
let y = (e2) => {
  if ("function" == typeof queueMicrotask) y = queueMicrotask;
  else {
    const e3 = c(void 0);
    y = (t2) => f(e3, t2);
  }
  return y(e2);
};
function S(e2, t2, r2) {
  if ("function" != typeof e2) throw new TypeError("Argument is not a function");
  return Function.prototype.apply.call(e2, t2, r2);
}
function g(e2, t2, r2) {
  try {
    return c(S(e2, t2, r2));
  } catch (e3) {
    return d(e3);
  }
}
class v {
  constructor() {
    this._cursor = 0, this._size = 0, this._front = { _elements: [], _next: void 0 }, this._back = this._front, this._cursor = 0, this._size = 0;
  }
  get length() {
    return this._size;
  }
  push(e2) {
    const t2 = this._back;
    let r2 = t2;
    16383 === t2._elements.length && (r2 = { _elements: [], _next: void 0 }), t2._elements.push(e2), r2 !== t2 && (this._back = r2, t2._next = r2), ++this._size;
  }
  shift() {
    const e2 = this._front;
    let t2 = e2;
    const r2 = this._cursor;
    let o2 = r2 + 1;
    const n2 = e2._elements, a2 = n2[r2];
    return 16384 === o2 && (t2 = e2._next, o2 = 0), --this._size, this._cursor = o2, e2 !== t2 && (this._front = t2), n2[r2] = void 0, a2;
  }
  forEach(e2) {
    let t2 = this._cursor, r2 = this._front, o2 = r2._elements;
    for (; !(t2 === o2.length && void 0 === r2._next || t2 === o2.length && (r2 = r2._next, o2 = r2._elements, t2 = 0, 0 === o2.length)); ) e2(o2[t2]), ++t2;
  }
  peek() {
    const e2 = this._front, t2 = this._cursor;
    return e2._elements[t2];
  }
}
const w = Symbol("[[AbortSteps]]"), R = Symbol("[[ErrorSteps]]"), T = Symbol("[[CancelSteps]]"), C = Symbol("[[PullSteps]]"), P = Symbol("[[ReleaseSteps]]");
function q(e2, t2) {
  e2._ownerReadableStream = t2, t2._reader = e2, "readable" === t2._state ? B(e2) : "closed" === t2._state ? function(e3) {
    B(e3), A(e3);
  }(e2) : k(e2, t2._storedError);
}
function E(e2, t2) {
  return Or(e2._ownerReadableStream, t2);
}
function W(e2) {
  const t2 = e2._ownerReadableStream;
  "readable" === t2._state ? j(e2, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : function(e3, t3) {
    k(e3, t3);
  }(e2, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), t2._readableStreamController[P](), t2._reader = void 0, e2._ownerReadableStream = void 0;
}
function O(e2) {
  return new TypeError("Cannot " + e2 + " a stream using a released reader");
}
function B(e2) {
  e2._closedPromise = u((t2, r2) => {
    e2._closedPromise_resolve = t2, e2._closedPromise_reject = r2;
  });
}
function k(e2, t2) {
  B(e2), j(e2, t2);
}
function j(e2, t2) {
  void 0 !== e2._closedPromise_reject && (p(e2._closedPromise), e2._closedPromise_reject(t2), e2._closedPromise_resolve = void 0, e2._closedPromise_reject = void 0);
}
function A(e2) {
  void 0 !== e2._closedPromise_resolve && (e2._closedPromise_resolve(void 0), e2._closedPromise_resolve = void 0, e2._closedPromise_reject = void 0);
}
const z = Number.isFinite || function(e2) {
  return "number" == typeof e2 && isFinite(e2);
}, D = Math.trunc || function(e2) {
  return e2 < 0 ? Math.ceil(e2) : Math.floor(e2);
};
function L(e2, t2) {
  if (void 0 !== e2 && ("object" != typeof (r2 = e2) && "function" != typeof r2)) throw new TypeError(`${t2} is not an object.`);
  var r2;
}
function F(e2, t2) {
  if ("function" != typeof e2) throw new TypeError(`${t2} is not a function.`);
}
function I(e2, t2) {
  if (!/* @__PURE__ */ function(e3) {
    return "object" == typeof e3 && null !== e3 || "function" == typeof e3;
  }(e2)) throw new TypeError(`${t2} is not an object.`);
}
function $(e2, t2, r2) {
  if (void 0 === e2) throw new TypeError(`Parameter ${t2} is required in '${r2}'.`);
}
function M(e2, t2, r2) {
  if (void 0 === e2) throw new TypeError(`${t2} is required in '${r2}'.`);
}
function Y(e2) {
  return Number(e2);
}
function x(e2) {
  return 0 === e2 ? 0 : e2;
}
function Q(e2, t2) {
  const r2 = Number.MAX_SAFE_INTEGER;
  let o2 = Number(e2);
  if (o2 = x(o2), !z(o2)) throw new TypeError(`${t2} is not a finite number`);
  if (o2 = function(e3) {
    return x(D(e3));
  }(o2), o2 < 0 || o2 > r2) throw new TypeError(`${t2} is outside the accepted range of 0 to ${r2}, inclusive`);
  return z(o2) && 0 !== o2 ? o2 : 0;
}
function N(e2, t2) {
  if (!Er(e2)) throw new TypeError(`${t2} is not a ReadableStream.`);
}
function H(e2) {
  return new ReadableStreamDefaultReader(e2);
}
function V(e2, t2) {
  e2._reader._readRequests.push(t2);
}
function U(e2, t2, r2) {
  const o2 = e2._reader._readRequests.shift();
  r2 ? o2._closeSteps() : o2._chunkSteps(t2);
}
function G(e2) {
  return e2._reader._readRequests.length;
}
function X(e2) {
  const t2 = e2._reader;
  return void 0 !== t2 && !!J(t2);
}
class ReadableStreamDefaultReader {
  constructor(e2) {
    if ($(e2, 1, "ReadableStreamDefaultReader"), N(e2, "First parameter"), Wr(e2)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
    q(this, e2), this._readRequests = new v();
  }
  get closed() {
    return J(this) ? this._closedPromise : d(ee("closed"));
  }
  cancel(e2 = void 0) {
    return J(this) ? void 0 === this._ownerReadableStream ? d(O("cancel")) : E(this, e2) : d(ee("cancel"));
  }
  read() {
    if (!J(this)) return d(ee("read"));
    if (void 0 === this._ownerReadableStream) return d(O("read from"));
    let e2, t2;
    const r2 = u((r3, o2) => {
      e2 = r3, t2 = o2;
    });
    return K(this, { _chunkSteps: (t3) => e2({ value: t3, done: false }), _closeSteps: () => e2({ value: void 0, done: true }), _errorSteps: (e3) => t2(e3) }), r2;
  }
  releaseLock() {
    if (!J(this)) throw ee("releaseLock");
    void 0 !== this._ownerReadableStream && function(e2) {
      W(e2);
      const t2 = new TypeError("Reader was released");
      Z(e2, t2);
    }(this);
  }
}
function J(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_readRequests") && e2 instanceof ReadableStreamDefaultReader);
}
function K(e2, t2) {
  const r2 = e2._ownerReadableStream;
  r2._disturbed = true, "closed" === r2._state ? t2._closeSteps() : "errored" === r2._state ? t2._errorSteps(r2._storedError) : r2._readableStreamController[C](t2);
}
function Z(e2, t2) {
  const r2 = e2._readRequests;
  e2._readRequests = new v(), r2.forEach((e3) => {
    e3._errorSteps(t2);
  });
}
function ee(e2) {
  return new TypeError(`ReadableStreamDefaultReader.prototype.${e2} can only be used on a ReadableStreamDefaultReader`);
}
var te, re, oe;
function ne(e2) {
  return e2.slice();
}
function ae(e2, t2, r2, o2, n2) {
  new Uint8Array(e2).set(new Uint8Array(r2, o2, n2), t2);
}
Object.defineProperties(ReadableStreamDefaultReader.prototype, { cancel: { enumerable: true }, read: { enumerable: true }, releaseLock: { enumerable: true }, closed: { enumerable: true } }), o(ReadableStreamDefaultReader.prototype.cancel, "cancel"), o(ReadableStreamDefaultReader.prototype.read, "read"), o(ReadableStreamDefaultReader.prototype.releaseLock, "releaseLock"), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(ReadableStreamDefaultReader.prototype, Symbol.toStringTag, { value: "ReadableStreamDefaultReader", configurable: true });
let ie = (e2) => (ie = "function" == typeof e2.transfer ? (e3) => e3.transfer() : "function" == typeof structuredClone ? (e3) => structuredClone(e3, { transfer: [e3] }) : (e3) => e3, ie(e2)), le = (e2) => (le = "boolean" == typeof e2.detached ? (e3) => e3.detached : (e3) => 0 === e3.byteLength, le(e2));
function se(e2, t2, r2) {
  if (e2.slice) return e2.slice(t2, r2);
  const o2 = r2 - t2, n2 = new ArrayBuffer(o2);
  return ae(n2, 0, e2, t2, o2), n2;
}
function ue(e2, t2) {
  const r2 = e2[t2];
  if (null != r2) {
    if ("function" != typeof r2) throw new TypeError(`${String(t2)} is not a function`);
    return r2;
  }
}
function ce(e2) {
  try {
    const t2 = e2.done, r2 = e2.value;
    return f(s(r2), (e3) => ({ done: t2, value: e3 }));
  } catch (e3) {
    return d(e3);
  }
}
const de = null !== (oe = null !== (te = Symbol.asyncIterator) && void 0 !== te ? te : null === (re = Symbol.for) || void 0 === re ? void 0 : re.call(Symbol, "Symbol.asyncIterator")) && void 0 !== oe ? oe : "@@asyncIterator";
function fe(e2, r2 = "sync", o2) {
  if (void 0 === o2) if ("async" === r2) {
    if (void 0 === (o2 = ue(e2, de))) {
      return function(e3) {
        const r3 = { next() {
          let t2;
          try {
            t2 = be(e3);
          } catch (e4) {
            return d(e4);
          }
          return ce(t2);
        }, return(r4) {
          let o3;
          try {
            const t2 = ue(e3.iterator, "return");
            if (void 0 === t2) return c({ done: true, value: r4 });
            o3 = S(t2, e3.iterator, [r4]);
          } catch (e4) {
            return d(e4);
          }
          return t(o3) ? ce(o3) : d(new TypeError("The iterator.return() method must return an object"));
        } };
        return { iterator: r3, nextMethod: r3.next, done: false };
      }(fe(e2, "sync", ue(e2, Symbol.iterator)));
    }
  } else o2 = ue(e2, Symbol.iterator);
  if (void 0 === o2) throw new TypeError("The object is not iterable");
  const n2 = S(o2, e2, []);
  if (!t(n2)) throw new TypeError("The iterator method must return an object");
  return { iterator: n2, nextMethod: n2.next, done: false };
}
function be(e2) {
  const r2 = S(e2.nextMethod, e2.iterator, []);
  if (!t(r2)) throw new TypeError("The iterator.next() method must return an object");
  return r2;
}
class he {
  constructor(e2, t2) {
    this._ongoingPromise = void 0, this._isFinished = false, this._reader = e2, this._preventCancel = t2;
  }
  next() {
    const e2 = () => this._nextSteps();
    return this._ongoingPromise = this._ongoingPromise ? _(this._ongoingPromise, e2, e2) : e2(), this._ongoingPromise;
  }
  return(e2) {
    const t2 = () => this._returnSteps(e2);
    return this._ongoingPromise = this._ongoingPromise ? _(this._ongoingPromise, t2, t2) : t2(), this._ongoingPromise;
  }
  _nextSteps() {
    if (this._isFinished) return Promise.resolve({ value: void 0, done: true });
    const e2 = this._reader;
    let t2, r2;
    const o2 = u((e3, o3) => {
      t2 = e3, r2 = o3;
    });
    return K(e2, { _chunkSteps: (e3) => {
      this._ongoingPromise = void 0, y(() => t2({ value: e3, done: false }));
    }, _closeSteps: () => {
      this._ongoingPromise = void 0, this._isFinished = true, W(e2), t2({ value: void 0, done: true });
    }, _errorSteps: (t3) => {
      this._ongoingPromise = void 0, this._isFinished = true, W(e2), r2(t3);
    } }), o2;
  }
  _returnSteps(e2) {
    if (this._isFinished) return Promise.resolve({ value: e2, done: true });
    this._isFinished = true;
    const t2 = this._reader;
    if (!this._preventCancel) {
      const r2 = E(t2, e2);
      return W(t2), _(r2, () => ({ value: e2, done: true }));
    }
    return W(t2), c({ value: e2, done: true });
  }
}
const me = { next() {
  return _e(this) ? this._asyncIteratorImpl.next() : d(pe("next"));
}, return(e2) {
  return _e(this) ? this._asyncIteratorImpl.return(e2) : d(pe("return"));
}, [de]() {
  return this;
} };
function _e(e2) {
  if (!t(e2)) return false;
  if (!Object.prototype.hasOwnProperty.call(e2, "_asyncIteratorImpl")) return false;
  try {
    return e2._asyncIteratorImpl instanceof he;
  } catch (e3) {
    return false;
  }
}
function pe(e2) {
  return new TypeError(`ReadableStreamAsyncIterator.${e2} can only be used on a ReadableSteamAsyncIterator`);
}
Object.defineProperty(me, de, { enumerable: false });
const ye = Number.isNaN || function(e2) {
  return e2 != e2;
};
function Se(e2) {
  const t2 = se(e2.buffer, e2.byteOffset, e2.byteOffset + e2.byteLength);
  return new Uint8Array(t2);
}
function ge(e2) {
  const t2 = e2._queue.shift();
  return e2._queueTotalSize -= t2.size, e2._queueTotalSize < 0 && (e2._queueTotalSize = 0), t2.value;
}
function ve(e2, t2, r2) {
  if ("number" != typeof (o2 = r2) || ye(o2) || o2 < 0 || r2 === 1 / 0) throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
  var o2;
  e2._queue.push({ value: t2, size: r2 }), e2._queueTotalSize += r2;
}
function we(e2) {
  e2._queue = new v(), e2._queueTotalSize = 0;
}
function Re(e2) {
  return e2 === DataView;
}
class ReadableStreamBYOBRequest {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
  get view() {
    if (!Ce(this)) throw Ke("view");
    return this._view;
  }
  respond(e2) {
    if (!Ce(this)) throw Ke("respond");
    if ($(e2, 1, "respond"), e2 = Q(e2, "First parameter"), void 0 === this._associatedReadableByteStreamController) throw new TypeError("This BYOB request has been invalidated");
    if (le(this._view.buffer)) throw new TypeError("The BYOB request's buffer has been detached and so cannot be used as a response");
    Ge(this._associatedReadableByteStreamController, e2);
  }
  respondWithNewView(e2) {
    if (!Ce(this)) throw Ke("respondWithNewView");
    if ($(e2, 1, "respondWithNewView"), !ArrayBuffer.isView(e2)) throw new TypeError("You can only respond with array buffer views");
    if (void 0 === this._associatedReadableByteStreamController) throw new TypeError("This BYOB request has been invalidated");
    if (le(e2.buffer)) throw new TypeError("The given view's buffer has been detached and so cannot be used as a response");
    Xe(this._associatedReadableByteStreamController, e2);
  }
}
Object.defineProperties(ReadableStreamBYOBRequest.prototype, { respond: { enumerable: true }, respondWithNewView: { enumerable: true }, view: { enumerable: true } }), o(ReadableStreamBYOBRequest.prototype.respond, "respond"), o(ReadableStreamBYOBRequest.prototype.respondWithNewView, "respondWithNewView"), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(ReadableStreamBYOBRequest.prototype, Symbol.toStringTag, { value: "ReadableStreamBYOBRequest", configurable: true });
class ReadableByteStreamController {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
  get byobRequest() {
    if (!Te(this)) throw Ze("byobRequest");
    return Ve(this);
  }
  get desiredSize() {
    if (!Te(this)) throw Ze("desiredSize");
    return Ue(this);
  }
  close() {
    if (!Te(this)) throw Ze("close");
    if (this._closeRequested) throw new TypeError("The stream has already been closed; do not close it again!");
    const e2 = this._controlledReadableByteStream._state;
    if ("readable" !== e2) throw new TypeError(`The stream (in ${e2} state) is not in the readable state and cannot be closed`);
    xe(this);
  }
  enqueue(e2) {
    if (!Te(this)) throw Ze("enqueue");
    if ($(e2, 1, "enqueue"), !ArrayBuffer.isView(e2)) throw new TypeError("chunk must be an array buffer view");
    if (0 === e2.byteLength) throw new TypeError("chunk must have non-zero byteLength");
    if (0 === e2.buffer.byteLength) throw new TypeError("chunk's buffer must have non-zero byteLength");
    if (this._closeRequested) throw new TypeError("stream is closed or draining");
    const t2 = this._controlledReadableByteStream._state;
    if ("readable" !== t2) throw new TypeError(`The stream (in ${t2} state) is not in the readable state and cannot be enqueued to`);
    Qe(this, e2);
  }
  error(e2 = void 0) {
    if (!Te(this)) throw Ze("error");
    Ne(this, e2);
  }
  [T](e2) {
    qe(this), we(this);
    const t2 = this._cancelAlgorithm(e2);
    return Ye(this), t2;
  }
  [C](e2) {
    const t2 = this._controlledReadableByteStream;
    if (this._queueTotalSize > 0) return void He(this, e2);
    const r2 = this._autoAllocateChunkSize;
    if (void 0 !== r2) {
      let t3;
      try {
        t3 = new ArrayBuffer(r2);
      } catch (t4) {
        return void e2._errorSteps(t4);
      }
      const o2 = { buffer: t3, bufferByteLength: r2, byteOffset: 0, byteLength: r2, bytesFilled: 0, minimumFill: 1, elementSize: 1, viewConstructor: Uint8Array, readerType: "default" };
      this._pendingPullIntos.push(o2);
    }
    V(t2, e2), Pe(this);
  }
  [P]() {
    if (this._pendingPullIntos.length > 0) {
      const e2 = this._pendingPullIntos.peek();
      e2.readerType = "none", this._pendingPullIntos = new v(), this._pendingPullIntos.push(e2);
    }
  }
}
function Te(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_controlledReadableByteStream") && e2 instanceof ReadableByteStreamController);
}
function Ce(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_associatedReadableByteStreamController") && e2 instanceof ReadableStreamBYOBRequest);
}
function Pe(e2) {
  const t2 = function(e3) {
    const t3 = e3._controlledReadableByteStream;
    if ("readable" !== t3._state) return false;
    if (e3._closeRequested) return false;
    if (!e3._started) return false;
    if (X(t3) && G(t3) > 0) return true;
    if (nt(t3) && ot(t3) > 0) return true;
    const r2 = Ue(e3);
    if (r2 > 0) return true;
    return false;
  }(e2);
  if (!t2) return;
  if (e2._pulling) return void (e2._pullAgain = true);
  e2._pulling = true;
  b(e2._pullAlgorithm(), () => (e2._pulling = false, e2._pullAgain && (e2._pullAgain = false, Pe(e2)), null), (t3) => (Ne(e2, t3), null));
}
function qe(e2) {
  Le(e2), e2._pendingPullIntos = new v();
}
function Ee(e2, t2) {
  let r2 = false;
  "closed" === e2._state && (r2 = true);
  const o2 = Oe(t2);
  "default" === t2.readerType ? U(e2, o2, r2) : function(e3, t3, r3) {
    const o3 = e3._reader, n2 = o3._readIntoRequests.shift();
    r3 ? n2._closeSteps(t3) : n2._chunkSteps(t3);
  }(e2, o2, r2);
}
function We(e2, t2) {
  for (let r2 = 0; r2 < t2.length; ++r2) Ee(e2, t2[r2]);
}
function Oe(e2) {
  const t2 = e2.bytesFilled, r2 = e2.elementSize;
  return new e2.viewConstructor(e2.buffer, e2.byteOffset, t2 / r2);
}
function Be(e2, t2, r2, o2) {
  e2._queue.push({ buffer: t2, byteOffset: r2, byteLength: o2 }), e2._queueTotalSize += o2;
}
function ke(e2, t2, r2, o2) {
  let n2;
  try {
    n2 = se(t2, r2, r2 + o2);
  } catch (t3) {
    throw Ne(e2, t3), t3;
  }
  Be(e2, n2, 0, o2);
}
function je(e2, t2) {
  t2.bytesFilled > 0 && ke(e2, t2.buffer, t2.byteOffset, t2.bytesFilled), Me(e2);
}
function Ae(e2, t2) {
  const r2 = Math.min(e2._queueTotalSize, t2.byteLength - t2.bytesFilled), o2 = t2.bytesFilled + r2;
  let n2 = r2, a2 = false;
  const i2 = o2 - o2 % t2.elementSize;
  i2 >= t2.minimumFill && (n2 = i2 - t2.bytesFilled, a2 = true);
  const l2 = e2._queue;
  for (; n2 > 0; ) {
    const r3 = l2.peek(), o3 = Math.min(n2, r3.byteLength), a3 = t2.byteOffset + t2.bytesFilled;
    ae(t2.buffer, a3, r3.buffer, r3.byteOffset, o3), r3.byteLength === o3 ? l2.shift() : (r3.byteOffset += o3, r3.byteLength -= o3), e2._queueTotalSize -= o3, ze(e2, o3, t2), n2 -= o3;
  }
  return a2;
}
function ze(e2, t2, r2) {
  r2.bytesFilled += t2;
}
function De(e2) {
  0 === e2._queueTotalSize && e2._closeRequested ? (Ye(e2), Br(e2._controlledReadableByteStream)) : Pe(e2);
}
function Le(e2) {
  null !== e2._byobRequest && (e2._byobRequest._associatedReadableByteStreamController = void 0, e2._byobRequest._view = null, e2._byobRequest = null);
}
function Fe(e2) {
  const t2 = [];
  for (; e2._pendingPullIntos.length > 0 && 0 !== e2._queueTotalSize; ) {
    const r2 = e2._pendingPullIntos.peek();
    Ae(e2, r2) && (Me(e2), t2.push(r2));
  }
  return t2;
}
function Ie(e2, t2, r2, o2) {
  const n2 = e2._controlledReadableByteStream, a2 = t2.constructor, i2 = function(e3) {
    return Re(e3) ? 1 : e3.BYTES_PER_ELEMENT;
  }(a2), { byteOffset: l2, byteLength: s2 } = t2, u2 = r2 * i2;
  let c2;
  try {
    c2 = ie(t2.buffer);
  } catch (e3) {
    return void o2._errorSteps(e3);
  }
  const d2 = { buffer: c2, bufferByteLength: c2.byteLength, byteOffset: l2, byteLength: s2, bytesFilled: 0, minimumFill: u2, elementSize: i2, viewConstructor: a2, readerType: "byob" };
  if (e2._pendingPullIntos.length > 0) return e2._pendingPullIntos.push(d2), void rt(n2, o2);
  if ("closed" !== n2._state) {
    if (e2._queueTotalSize > 0) {
      if (Ae(e2, d2)) {
        const t3 = Oe(d2);
        return De(e2), void o2._chunkSteps(t3);
      }
      if (e2._closeRequested) {
        const t3 = new TypeError("Insufficient bytes to fill elements in the given buffer");
        return Ne(e2, t3), void o2._errorSteps(t3);
      }
    }
    e2._pendingPullIntos.push(d2), rt(n2, o2), Pe(e2);
  } else {
    const e3 = new a2(d2.buffer, d2.byteOffset, 0);
    o2._closeSteps(e3);
  }
}
function $e(e2, t2) {
  const r2 = e2._pendingPullIntos.peek();
  Le(e2);
  "closed" === e2._controlledReadableByteStream._state ? function(e3, t3) {
    "none" === t3.readerType && Me(e3);
    const r3 = e3._controlledReadableByteStream;
    if (nt(r3)) {
      const t4 = [];
      for (let o2 = 0; o2 < ot(r3); ++o2) t4.push(Me(e3));
      We(r3, t4);
    }
  }(e2, r2) : function(e3, t3, r3) {
    if (ze(0, t3, r3), "none" === r3.readerType) {
      je(e3, r3);
      const t4 = Fe(e3);
      return void We(e3._controlledReadableByteStream, t4);
    }
    if (r3.bytesFilled < r3.minimumFill) return;
    Me(e3);
    const o2 = r3.bytesFilled % r3.elementSize;
    if (o2 > 0) {
      const t4 = r3.byteOffset + r3.bytesFilled;
      ke(e3, r3.buffer, t4 - o2, o2);
    }
    r3.bytesFilled -= o2;
    const n2 = Fe(e3);
    Ee(e3._controlledReadableByteStream, r3), We(e3._controlledReadableByteStream, n2);
  }(e2, t2, r2), Pe(e2);
}
function Me(e2) {
  return e2._pendingPullIntos.shift();
}
function Ye(e2) {
  e2._pullAlgorithm = void 0, e2._cancelAlgorithm = void 0;
}
function xe(e2) {
  const t2 = e2._controlledReadableByteStream;
  if (!e2._closeRequested && "readable" === t2._state) if (e2._queueTotalSize > 0) e2._closeRequested = true;
  else {
    if (e2._pendingPullIntos.length > 0) {
      const t3 = e2._pendingPullIntos.peek();
      if (t3.bytesFilled % t3.elementSize != 0) {
        const t4 = new TypeError("Insufficient bytes to fill elements in the given buffer");
        throw Ne(e2, t4), t4;
      }
    }
    Ye(e2), Br(t2);
  }
}
function Qe(e2, t2) {
  const r2 = e2._controlledReadableByteStream;
  if (e2._closeRequested || "readable" !== r2._state) return;
  const { buffer: o2, byteOffset: n2, byteLength: a2 } = t2;
  if (le(o2)) throw new TypeError("chunk's buffer is detached and so cannot be enqueued");
  const i2 = ie(o2);
  if (e2._pendingPullIntos.length > 0) {
    const t3 = e2._pendingPullIntos.peek();
    if (le(t3.buffer)) throw new TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");
    Le(e2), t3.buffer = ie(t3.buffer), "none" === t3.readerType && je(e2, t3);
  }
  if (X(r2)) if (function(e3) {
    const t3 = e3._controlledReadableByteStream._reader;
    for (; t3._readRequests.length > 0; ) {
      if (0 === e3._queueTotalSize) return;
      He(e3, t3._readRequests.shift());
    }
  }(e2), 0 === G(r2)) Be(e2, i2, n2, a2);
  else {
    e2._pendingPullIntos.length > 0 && Me(e2);
    U(r2, new Uint8Array(i2, n2, a2), false);
  }
  else if (nt(r2)) {
    Be(e2, i2, n2, a2);
    const t3 = Fe(e2);
    We(e2._controlledReadableByteStream, t3);
  } else Be(e2, i2, n2, a2);
  Pe(e2);
}
function Ne(e2, t2) {
  const r2 = e2._controlledReadableByteStream;
  "readable" === r2._state && (qe(e2), we(e2), Ye(e2), kr(r2, t2));
}
function He(e2, t2) {
  const r2 = e2._queue.shift();
  e2._queueTotalSize -= r2.byteLength, De(e2);
  const o2 = new Uint8Array(r2.buffer, r2.byteOffset, r2.byteLength);
  t2._chunkSteps(o2);
}
function Ve(e2) {
  if (null === e2._byobRequest && e2._pendingPullIntos.length > 0) {
    const t2 = e2._pendingPullIntos.peek(), r2 = new Uint8Array(t2.buffer, t2.byteOffset + t2.bytesFilled, t2.byteLength - t2.bytesFilled), o2 = Object.create(ReadableStreamBYOBRequest.prototype);
    !function(e3, t3, r3) {
      e3._associatedReadableByteStreamController = t3, e3._view = r3;
    }(o2, e2, r2), e2._byobRequest = o2;
  }
  return e2._byobRequest;
}
function Ue(e2) {
  const t2 = e2._controlledReadableByteStream._state;
  return "errored" === t2 ? null : "closed" === t2 ? 0 : e2._strategyHWM - e2._queueTotalSize;
}
function Ge(e2, t2) {
  const r2 = e2._pendingPullIntos.peek();
  if ("closed" === e2._controlledReadableByteStream._state) {
    if (0 !== t2) throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
  } else {
    if (0 === t2) throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
    if (r2.bytesFilled + t2 > r2.byteLength) throw new RangeError("bytesWritten out of range");
  }
  r2.buffer = ie(r2.buffer), $e(e2, t2);
}
function Xe(e2, t2) {
  const r2 = e2._pendingPullIntos.peek();
  if ("closed" === e2._controlledReadableByteStream._state) {
    if (0 !== t2.byteLength) throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
  } else if (0 === t2.byteLength) throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
  if (r2.byteOffset + r2.bytesFilled !== t2.byteOffset) throw new RangeError("The region specified by view does not match byobRequest");
  if (r2.bufferByteLength !== t2.buffer.byteLength) throw new RangeError("The buffer of view has different capacity than byobRequest");
  if (r2.bytesFilled + t2.byteLength > r2.byteLength) throw new RangeError("The region specified by view is larger than byobRequest");
  const o2 = t2.byteLength;
  r2.buffer = ie(t2.buffer), $e(e2, o2);
}
function Je(e2, t2, r2, o2, n2, a2, i2) {
  t2._controlledReadableByteStream = e2, t2._pullAgain = false, t2._pulling = false, t2._byobRequest = null, t2._queue = t2._queueTotalSize = void 0, we(t2), t2._closeRequested = false, t2._started = false, t2._strategyHWM = a2, t2._pullAlgorithm = o2, t2._cancelAlgorithm = n2, t2._autoAllocateChunkSize = i2, t2._pendingPullIntos = new v(), e2._readableStreamController = t2;
  b(c(r2()), () => (t2._started = true, Pe(t2), null), (e3) => (Ne(t2, e3), null));
}
function Ke(e2) {
  return new TypeError(`ReadableStreamBYOBRequest.prototype.${e2} can only be used on a ReadableStreamBYOBRequest`);
}
function Ze(e2) {
  return new TypeError(`ReadableByteStreamController.prototype.${e2} can only be used on a ReadableByteStreamController`);
}
function et(e2, t2) {
  if ("byob" !== (e2 = `${e2}`)) throw new TypeError(`${t2} '${e2}' is not a valid enumeration value for ReadableStreamReaderMode`);
  return e2;
}
function tt(e2) {
  return new ReadableStreamBYOBReader(e2);
}
function rt(e2, t2) {
  e2._reader._readIntoRequests.push(t2);
}
function ot(e2) {
  return e2._reader._readIntoRequests.length;
}
function nt(e2) {
  const t2 = e2._reader;
  return void 0 !== t2 && !!at(t2);
}
Object.defineProperties(ReadableByteStreamController.prototype, { close: { enumerable: true }, enqueue: { enumerable: true }, error: { enumerable: true }, byobRequest: { enumerable: true }, desiredSize: { enumerable: true } }), o(ReadableByteStreamController.prototype.close, "close"), o(ReadableByteStreamController.prototype.enqueue, "enqueue"), o(ReadableByteStreamController.prototype.error, "error"), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(ReadableByteStreamController.prototype, Symbol.toStringTag, { value: "ReadableByteStreamController", configurable: true });
class ReadableStreamBYOBReader {
  constructor(e2) {
    if ($(e2, 1, "ReadableStreamBYOBReader"), N(e2, "First parameter"), Wr(e2)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
    if (!Te(e2._readableStreamController)) throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
    q(this, e2), this._readIntoRequests = new v();
  }
  get closed() {
    return at(this) ? this._closedPromise : d(st("closed"));
  }
  cancel(e2 = void 0) {
    return at(this) ? void 0 === this._ownerReadableStream ? d(O("cancel")) : E(this, e2) : d(st("cancel"));
  }
  read(e2, t2 = {}) {
    if (!at(this)) return d(st("read"));
    if (!ArrayBuffer.isView(e2)) return d(new TypeError("view must be an array buffer view"));
    if (0 === e2.byteLength) return d(new TypeError("view must have non-zero byteLength"));
    if (0 === e2.buffer.byteLength) return d(new TypeError("view's buffer must have non-zero byteLength"));
    if (le(e2.buffer)) return d(new TypeError("view's buffer has been detached"));
    let r2;
    try {
      r2 = function(e3, t3) {
        var r3;
        return L(e3, t3), { min: Q(null !== (r3 = null == e3 ? void 0 : e3.min) && void 0 !== r3 ? r3 : 1, `${t3} has member 'min' that`) };
      }(t2, "options");
    } catch (e3) {
      return d(e3);
    }
    const o2 = r2.min;
    if (0 === o2) return d(new TypeError("options.min must be greater than 0"));
    if (function(e3) {
      return Re(e3.constructor);
    }(e2)) {
      if (o2 > e2.byteLength) return d(new RangeError("options.min must be less than or equal to view's byteLength"));
    } else if (o2 > e2.length) return d(new RangeError("options.min must be less than or equal to view's length"));
    if (void 0 === this._ownerReadableStream) return d(O("read from"));
    let n2, a2;
    const i2 = u((e3, t3) => {
      n2 = e3, a2 = t3;
    });
    return it(this, e2, o2, { _chunkSteps: (e3) => n2({ value: e3, done: false }), _closeSteps: (e3) => n2({ value: e3, done: true }), _errorSteps: (e3) => a2(e3) }), i2;
  }
  releaseLock() {
    if (!at(this)) throw st("releaseLock");
    void 0 !== this._ownerReadableStream && function(e2) {
      W(e2);
      const t2 = new TypeError("Reader was released");
      lt(e2, t2);
    }(this);
  }
}
function at(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_readIntoRequests") && e2 instanceof ReadableStreamBYOBReader);
}
function it(e2, t2, r2, o2) {
  const n2 = e2._ownerReadableStream;
  n2._disturbed = true, "errored" === n2._state ? o2._errorSteps(n2._storedError) : Ie(n2._readableStreamController, t2, r2, o2);
}
function lt(e2, t2) {
  const r2 = e2._readIntoRequests;
  e2._readIntoRequests = new v(), r2.forEach((e3) => {
    e3._errorSteps(t2);
  });
}
function st(e2) {
  return new TypeError(`ReadableStreamBYOBReader.prototype.${e2} can only be used on a ReadableStreamBYOBReader`);
}
function ut(e2, t2) {
  const { highWaterMark: r2 } = e2;
  if (void 0 === r2) return t2;
  if (ye(r2) || r2 < 0) throw new RangeError("Invalid highWaterMark");
  return r2;
}
function ct(e2) {
  const { size: t2 } = e2;
  return t2 || (() => 1);
}
function dt(e2, t2) {
  L(e2, t2);
  const r2 = null == e2 ? void 0 : e2.highWaterMark, o2 = null == e2 ? void 0 : e2.size;
  return { highWaterMark: void 0 === r2 ? void 0 : Y(r2), size: void 0 === o2 ? void 0 : ft(o2, `${t2} has member 'size' that`) };
}
function ft(e2, t2) {
  return F(e2, t2), (t3) => Y(e2(t3));
}
function bt(e2, t2, r2) {
  return F(e2, r2), (r3) => g(e2, t2, [r3]);
}
function ht(e2, t2, r2) {
  return F(e2, r2), () => g(e2, t2, []);
}
function mt(e2, t2, r2) {
  return F(e2, r2), (r3) => S(e2, t2, [r3]);
}
function _t(e2, t2, r2) {
  return F(e2, r2), (r3, o2) => g(e2, t2, [r3, o2]);
}
function pt(e2, t2) {
  if (!gt(e2)) throw new TypeError(`${t2} is not a WritableStream.`);
}
Object.defineProperties(ReadableStreamBYOBReader.prototype, { cancel: { enumerable: true }, read: { enumerable: true }, releaseLock: { enumerable: true }, closed: { enumerable: true } }), o(ReadableStreamBYOBReader.prototype.cancel, "cancel"), o(ReadableStreamBYOBReader.prototype.read, "read"), o(ReadableStreamBYOBReader.prototype.releaseLock, "releaseLock"), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(ReadableStreamBYOBReader.prototype, Symbol.toStringTag, { value: "ReadableStreamBYOBReader", configurable: true });
class WritableStream {
  constructor(e2 = {}, t2 = {}) {
    void 0 === e2 ? e2 = null : I(e2, "First parameter");
    const r2 = dt(t2, "Second parameter"), o2 = function(e3, t3) {
      L(e3, t3);
      const r3 = null == e3 ? void 0 : e3.abort, o3 = null == e3 ? void 0 : e3.close, n3 = null == e3 ? void 0 : e3.start, a2 = null == e3 ? void 0 : e3.type, i2 = null == e3 ? void 0 : e3.write;
      return { abort: void 0 === r3 ? void 0 : bt(r3, e3, `${t3} has member 'abort' that`), close: void 0 === o3 ? void 0 : ht(o3, e3, `${t3} has member 'close' that`), start: void 0 === n3 ? void 0 : mt(n3, e3, `${t3} has member 'start' that`), write: void 0 === i2 ? void 0 : _t(i2, e3, `${t3} has member 'write' that`), type: a2 };
    }(e2, "First parameter");
    St(this);
    if (void 0 !== o2.type) throw new RangeError("Invalid type is specified");
    const n2 = ct(r2);
    !function(e3, t3, r3, o3) {
      const n3 = Object.create(WritableStreamDefaultController.prototype);
      let a2, i2, l2, s2;
      a2 = void 0 !== t3.start ? () => t3.start(n3) : () => {
      };
      i2 = void 0 !== t3.write ? (e4) => t3.write(e4, n3) : () => c(void 0);
      l2 = void 0 !== t3.close ? () => t3.close() : () => c(void 0);
      s2 = void 0 !== t3.abort ? (e4) => t3.abort(e4) : () => c(void 0);
      Ft(e3, n3, a2, i2, l2, s2, r3, o3);
    }(this, o2, ut(r2, 1), n2);
  }
  get locked() {
    if (!gt(this)) throw Nt("locked");
    return vt(this);
  }
  abort(e2 = void 0) {
    return gt(this) ? vt(this) ? d(new TypeError("Cannot abort a stream that already has a writer")) : wt(this, e2) : d(Nt("abort"));
  }
  close() {
    return gt(this) ? vt(this) ? d(new TypeError("Cannot close a stream that already has a writer")) : qt(this) ? d(new TypeError("Cannot close an already-closing stream")) : Rt(this) : d(Nt("close"));
  }
  getWriter() {
    if (!gt(this)) throw Nt("getWriter");
    return yt(this);
  }
}
function yt(e2) {
  return new WritableStreamDefaultWriter(e2);
}
function St(e2) {
  e2._state = "writable", e2._storedError = void 0, e2._writer = void 0, e2._writableStreamController = void 0, e2._writeRequests = new v(), e2._inFlightWriteRequest = void 0, e2._closeRequest = void 0, e2._inFlightCloseRequest = void 0, e2._pendingAbortRequest = void 0, e2._backpressure = false;
}
function gt(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_writableStreamController") && e2 instanceof WritableStream);
}
function vt(e2) {
  return void 0 !== e2._writer;
}
function wt(e2, t2) {
  var r2;
  if ("closed" === e2._state || "errored" === e2._state) return c(void 0);
  e2._writableStreamController._abortReason = t2, null === (r2 = e2._writableStreamController._abortController) || void 0 === r2 || r2.abort(t2);
  const o2 = e2._state;
  if ("closed" === o2 || "errored" === o2) return c(void 0);
  if (void 0 !== e2._pendingAbortRequest) return e2._pendingAbortRequest._promise;
  let n2 = false;
  "erroring" === o2 && (n2 = true, t2 = void 0);
  const a2 = u((r3, o3) => {
    e2._pendingAbortRequest = { _promise: void 0, _resolve: r3, _reject: o3, _reason: t2, _wasAlreadyErroring: n2 };
  });
  return e2._pendingAbortRequest._promise = a2, n2 || Ct(e2, t2), a2;
}
function Rt(e2) {
  const t2 = e2._state;
  if ("closed" === t2 || "errored" === t2) return d(new TypeError(`The stream (in ${t2} state) is not in the writable state and cannot be closed`));
  const r2 = u((t3, r3) => {
    const o3 = { _resolve: t3, _reject: r3 };
    e2._closeRequest = o3;
  }), o2 = e2._writer;
  var n2;
  return void 0 !== o2 && e2._backpressure && "writable" === t2 && or(o2), ve(n2 = e2._writableStreamController, Dt, 0), Mt(n2), r2;
}
function Tt(e2, t2) {
  "writable" !== e2._state ? Pt(e2) : Ct(e2, t2);
}
function Ct(e2, t2) {
  const r2 = e2._writableStreamController;
  e2._state = "erroring", e2._storedError = t2;
  const o2 = e2._writer;
  void 0 !== o2 && jt(o2, t2), !function(e3) {
    if (void 0 === e3._inFlightWriteRequest && void 0 === e3._inFlightCloseRequest) return false;
    return true;
  }(e2) && r2._started && Pt(e2);
}
function Pt(e2) {
  e2._state = "errored", e2._writableStreamController[R]();
  const t2 = e2._storedError;
  if (e2._writeRequests.forEach((e3) => {
    e3._reject(t2);
  }), e2._writeRequests = new v(), void 0 === e2._pendingAbortRequest) return void Et(e2);
  const r2 = e2._pendingAbortRequest;
  if (e2._pendingAbortRequest = void 0, r2._wasAlreadyErroring) return r2._reject(t2), void Et(e2);
  b(e2._writableStreamController[w](r2._reason), () => (r2._resolve(), Et(e2), null), (t3) => (r2._reject(t3), Et(e2), null));
}
function qt(e2) {
  return void 0 !== e2._closeRequest || void 0 !== e2._inFlightCloseRequest;
}
function Et(e2) {
  void 0 !== e2._closeRequest && (e2._closeRequest._reject(e2._storedError), e2._closeRequest = void 0);
  const t2 = e2._writer;
  void 0 !== t2 && Jt(t2, e2._storedError);
}
function Wt(e2, t2) {
  const r2 = e2._writer;
  void 0 !== r2 && t2 !== e2._backpressure && (t2 ? function(e3) {
    Zt(e3);
  }(r2) : or(r2)), e2._backpressure = t2;
}
Object.defineProperties(WritableStream.prototype, { abort: { enumerable: true }, close: { enumerable: true }, getWriter: { enumerable: true }, locked: { enumerable: true } }), o(WritableStream.prototype.abort, "abort"), o(WritableStream.prototype.close, "close"), o(WritableStream.prototype.getWriter, "getWriter"), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(WritableStream.prototype, Symbol.toStringTag, { value: "WritableStream", configurable: true });
class WritableStreamDefaultWriter {
  constructor(e2) {
    if ($(e2, 1, "WritableStreamDefaultWriter"), pt(e2, "First parameter"), vt(e2)) throw new TypeError("This stream has already been locked for exclusive writing by another writer");
    this._ownerWritableStream = e2, e2._writer = this;
    const t2 = e2._state;
    if ("writable" === t2) !qt(e2) && e2._backpressure ? Zt(this) : tr(this), Gt(this);
    else if ("erroring" === t2) er(this, e2._storedError), Gt(this);
    else if ("closed" === t2) tr(this), Gt(r2 = this), Kt(r2);
    else {
      const t3 = e2._storedError;
      er(this, t3), Xt(this, t3);
    }
    var r2;
  }
  get closed() {
    return Ot(this) ? this._closedPromise : d(Vt("closed"));
  }
  get desiredSize() {
    if (!Ot(this)) throw Vt("desiredSize");
    if (void 0 === this._ownerWritableStream) throw Ut("desiredSize");
    return function(e2) {
      const t2 = e2._ownerWritableStream, r2 = t2._state;
      if ("errored" === r2 || "erroring" === r2) return null;
      if ("closed" === r2) return 0;
      return $t(t2._writableStreamController);
    }(this);
  }
  get ready() {
    return Ot(this) ? this._readyPromise : d(Vt("ready"));
  }
  abort(e2 = void 0) {
    return Ot(this) ? void 0 === this._ownerWritableStream ? d(Ut("abort")) : function(e3, t2) {
      return wt(e3._ownerWritableStream, t2);
    }(this, e2) : d(Vt("abort"));
  }
  close() {
    if (!Ot(this)) return d(Vt("close"));
    const e2 = this._ownerWritableStream;
    return void 0 === e2 ? d(Ut("close")) : qt(e2) ? d(new TypeError("Cannot close an already-closing stream")) : Bt(this);
  }
  releaseLock() {
    if (!Ot(this)) throw Vt("releaseLock");
    void 0 !== this._ownerWritableStream && At(this);
  }
  write(e2 = void 0) {
    return Ot(this) ? void 0 === this._ownerWritableStream ? d(Ut("write to")) : zt(this, e2) : d(Vt("write"));
  }
}
function Ot(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_ownerWritableStream") && e2 instanceof WritableStreamDefaultWriter);
}
function Bt(e2) {
  return Rt(e2._ownerWritableStream);
}
function kt(e2, t2) {
  "pending" === e2._closedPromiseState ? Jt(e2, t2) : function(e3, t3) {
    Xt(e3, t3);
  }(e2, t2);
}
function jt(e2, t2) {
  "pending" === e2._readyPromiseState ? rr(e2, t2) : function(e3, t3) {
    er(e3, t3);
  }(e2, t2);
}
function At(e2) {
  const t2 = e2._ownerWritableStream, r2 = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
  jt(e2, r2), kt(e2, r2), t2._writer = void 0, e2._ownerWritableStream = void 0;
}
function zt(e2, t2) {
  const r2 = e2._ownerWritableStream, o2 = r2._writableStreamController, n2 = function(e3, t3) {
    if (void 0 === e3._strategySizeAlgorithm) return 1;
    try {
      return e3._strategySizeAlgorithm(t3);
    } catch (t4) {
      return Yt(e3, t4), 1;
    }
  }(o2, t2);
  if (r2 !== e2._ownerWritableStream) return d(Ut("write to"));
  const a2 = r2._state;
  if ("errored" === a2) return d(r2._storedError);
  if (qt(r2) || "closed" === a2) return d(new TypeError("The stream is closing or closed and cannot be written to"));
  if ("erroring" === a2) return d(r2._storedError);
  const i2 = function(e3) {
    return u((t3, r3) => {
      const o3 = { _resolve: t3, _reject: r3 };
      e3._writeRequests.push(o3);
    });
  }(r2);
  return function(e3, t3, r3) {
    try {
      ve(e3, t3, r3);
    } catch (t4) {
      return void Yt(e3, t4);
    }
    const o3 = e3._controlledWritableStream;
    if (!qt(o3) && "writable" === o3._state) {
      Wt(o3, xt(e3));
    }
    Mt(e3);
  }(o2, t2, n2), i2;
}
Object.defineProperties(WritableStreamDefaultWriter.prototype, { abort: { enumerable: true }, close: { enumerable: true }, releaseLock: { enumerable: true }, write: { enumerable: true }, closed: { enumerable: true }, desiredSize: { enumerable: true }, ready: { enumerable: true } }), o(WritableStreamDefaultWriter.prototype.abort, "abort"), o(WritableStreamDefaultWriter.prototype.close, "close"), o(WritableStreamDefaultWriter.prototype.releaseLock, "releaseLock"), o(WritableStreamDefaultWriter.prototype.write, "write"), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(WritableStreamDefaultWriter.prototype, Symbol.toStringTag, { value: "WritableStreamDefaultWriter", configurable: true });
const Dt = {};
class WritableStreamDefaultController {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
  get abortReason() {
    if (!Lt(this)) throw Ht("abortReason");
    return this._abortReason;
  }
  get signal() {
    if (!Lt(this)) throw Ht("signal");
    if (void 0 === this._abortController) throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
    return this._abortController.signal;
  }
  error(e2 = void 0) {
    if (!Lt(this)) throw Ht("error");
    "writable" === this._controlledWritableStream._state && Qt(this, e2);
  }
  [w](e2) {
    const t2 = this._abortAlgorithm(e2);
    return It(this), t2;
  }
  [R]() {
    we(this);
  }
}
function Lt(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_controlledWritableStream") && e2 instanceof WritableStreamDefaultController);
}
function Ft(e2, t2, r2, o2, n2, a2, i2, l2) {
  t2._controlledWritableStream = e2, e2._writableStreamController = t2, t2._queue = void 0, t2._queueTotalSize = void 0, we(t2), t2._abortReason = void 0, t2._abortController = function() {
    if ("function" == typeof AbortController) return new AbortController();
  }(), t2._started = false, t2._strategySizeAlgorithm = l2, t2._strategyHWM = i2, t2._writeAlgorithm = o2, t2._closeAlgorithm = n2, t2._abortAlgorithm = a2;
  const s2 = xt(t2);
  Wt(e2, s2);
  b(c(r2()), () => (t2._started = true, Mt(t2), null), (r3) => (t2._started = true, Tt(e2, r3), null));
}
function It(e2) {
  e2._writeAlgorithm = void 0, e2._closeAlgorithm = void 0, e2._abortAlgorithm = void 0, e2._strategySizeAlgorithm = void 0;
}
function $t(e2) {
  return e2._strategyHWM - e2._queueTotalSize;
}
function Mt(e2) {
  const t2 = e2._controlledWritableStream;
  if (!e2._started) return;
  if (void 0 !== t2._inFlightWriteRequest) return;
  if ("erroring" === t2._state) return void Pt(t2);
  if (0 === e2._queue.length) return;
  const r2 = e2._queue.peek().value;
  r2 === Dt ? function(e3) {
    const t3 = e3._controlledWritableStream;
    (function(e4) {
      e4._inFlightCloseRequest = e4._closeRequest, e4._closeRequest = void 0;
    })(t3), ge(e3);
    const r3 = e3._closeAlgorithm();
    It(e3), b(r3, () => (function(e4) {
      e4._inFlightCloseRequest._resolve(void 0), e4._inFlightCloseRequest = void 0, "erroring" === e4._state && (e4._storedError = void 0, void 0 !== e4._pendingAbortRequest && (e4._pendingAbortRequest._resolve(), e4._pendingAbortRequest = void 0)), e4._state = "closed";
      const t4 = e4._writer;
      void 0 !== t4 && Kt(t4);
    }(t3), null), (e4) => (function(e5, t4) {
      e5._inFlightCloseRequest._reject(t4), e5._inFlightCloseRequest = void 0, void 0 !== e5._pendingAbortRequest && (e5._pendingAbortRequest._reject(t4), e5._pendingAbortRequest = void 0), Tt(e5, t4);
    }(t3, e4), null));
  }(e2) : function(e3, t3) {
    const r3 = e3._controlledWritableStream;
    !function(e4) {
      e4._inFlightWriteRequest = e4._writeRequests.shift();
    }(r3);
    const o2 = e3._writeAlgorithm(t3);
    b(o2, () => {
      !function(e4) {
        e4._inFlightWriteRequest._resolve(void 0), e4._inFlightWriteRequest = void 0;
      }(r3);
      const t4 = r3._state;
      if (ge(e3), !qt(r3) && "writable" === t4) {
        const t5 = xt(e3);
        Wt(r3, t5);
      }
      return Mt(e3), null;
    }, (t4) => ("writable" === r3._state && It(e3), function(e4, t5) {
      e4._inFlightWriteRequest._reject(t5), e4._inFlightWriteRequest = void 0, Tt(e4, t5);
    }(r3, t4), null));
  }(e2, r2);
}
function Yt(e2, t2) {
  "writable" === e2._controlledWritableStream._state && Qt(e2, t2);
}
function xt(e2) {
  return $t(e2) <= 0;
}
function Qt(e2, t2) {
  const r2 = e2._controlledWritableStream;
  It(e2), Ct(r2, t2);
}
function Nt(e2) {
  return new TypeError(`WritableStream.prototype.${e2} can only be used on a WritableStream`);
}
function Ht(e2) {
  return new TypeError(`WritableStreamDefaultController.prototype.${e2} can only be used on a WritableStreamDefaultController`);
}
function Vt(e2) {
  return new TypeError(`WritableStreamDefaultWriter.prototype.${e2} can only be used on a WritableStreamDefaultWriter`);
}
function Ut(e2) {
  return new TypeError("Cannot " + e2 + " a stream using a released writer");
}
function Gt(e2) {
  e2._closedPromise = u((t2, r2) => {
    e2._closedPromise_resolve = t2, e2._closedPromise_reject = r2, e2._closedPromiseState = "pending";
  });
}
function Xt(e2, t2) {
  Gt(e2), Jt(e2, t2);
}
function Jt(e2, t2) {
  void 0 !== e2._closedPromise_reject && (p(e2._closedPromise), e2._closedPromise_reject(t2), e2._closedPromise_resolve = void 0, e2._closedPromise_reject = void 0, e2._closedPromiseState = "rejected");
}
function Kt(e2) {
  void 0 !== e2._closedPromise_resolve && (e2._closedPromise_resolve(void 0), e2._closedPromise_resolve = void 0, e2._closedPromise_reject = void 0, e2._closedPromiseState = "resolved");
}
function Zt(e2) {
  e2._readyPromise = u((t2, r2) => {
    e2._readyPromise_resolve = t2, e2._readyPromise_reject = r2;
  }), e2._readyPromiseState = "pending";
}
function er(e2, t2) {
  Zt(e2), rr(e2, t2);
}
function tr(e2) {
  Zt(e2), or(e2);
}
function rr(e2, t2) {
  void 0 !== e2._readyPromise_reject && (p(e2._readyPromise), e2._readyPromise_reject(t2), e2._readyPromise_resolve = void 0, e2._readyPromise_reject = void 0, e2._readyPromiseState = "rejected");
}
function or(e2) {
  void 0 !== e2._readyPromise_resolve && (e2._readyPromise_resolve(void 0), e2._readyPromise_resolve = void 0, e2._readyPromise_reject = void 0, e2._readyPromiseState = "fulfilled");
}
Object.defineProperties(WritableStreamDefaultController.prototype, { abortReason: { enumerable: true }, signal: { enumerable: true }, error: { enumerable: true } }), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(WritableStreamDefaultController.prototype, Symbol.toStringTag, { value: "WritableStreamDefaultController", configurable: true });
const nr = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof __webpack_require__.g ? __webpack_require__.g : void 0;
const ar = function() {
  const e2 = null == nr ? void 0 : nr.DOMException;
  return function(e3) {
    if ("function" != typeof e3 && "object" != typeof e3) return false;
    if ("DOMException" !== e3.name) return false;
    try {
      return new e3(), true;
    } catch (e4) {
      return false;
    }
  }(e2) ? e2 : void 0;
}() || function() {
  const e2 = function(e3, t2) {
    this.message = e3 || "", this.name = t2 || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  };
  return o(e2, "DOMException"), e2.prototype = Object.create(Error.prototype), Object.defineProperty(e2.prototype, "constructor", { value: e2, writable: true, configurable: true }), e2;
}();
function ir(t2, r2, o2, n2, a2, i2) {
  const l2 = H(t2), s2 = yt(r2);
  t2._disturbed = true;
  let _2 = false, y2 = c(void 0);
  return u((S2, g2) => {
    let v2;
    if (void 0 !== i2) {
      if (v2 = () => {
        const e2 = void 0 !== i2.reason ? i2.reason : new ar("Aborted", "AbortError"), o3 = [];
        n2 || o3.push(() => "writable" === r2._state ? wt(r2, e2) : c(void 0)), a2 || o3.push(() => "readable" === t2._state ? Or(t2, e2) : c(void 0)), q2(() => Promise.all(o3.map((e3) => e3())), true, e2);
      }, i2.aborted) return void v2();
      i2.addEventListener("abort", v2);
    }
    var w2, R2, T2;
    if (P2(t2, l2._closedPromise, (e2) => (n2 ? E2(true, e2) : q2(() => wt(r2, e2), true, e2), null)), P2(r2, s2._closedPromise, (e2) => (a2 ? E2(true, e2) : q2(() => Or(t2, e2), true, e2), null)), w2 = t2, R2 = l2._closedPromise, T2 = () => (o2 ? E2() : q2(() => function(e2) {
      const t3 = e2._ownerWritableStream, r3 = t3._state;
      return qt(t3) || "closed" === r3 ? c(void 0) : "errored" === r3 ? d(t3._storedError) : Bt(e2);
    }(s2)), null), "closed" === w2._state ? T2() : h(R2, T2), qt(r2) || "closed" === r2._state) {
      const e2 = new TypeError("the destination writable stream closed before all data could be piped to it");
      a2 ? E2(true, e2) : q2(() => Or(t2, e2), true, e2);
    }
    function C2() {
      const e2 = y2;
      return f(y2, () => e2 !== y2 ? C2() : void 0);
    }
    function P2(e2, t3, r3) {
      "errored" === e2._state ? r3(e2._storedError) : m(t3, r3);
    }
    function q2(e2, t3, o3) {
      function n3() {
        return b(e2(), () => O2(t3, o3), (e3) => O2(true, e3)), null;
      }
      _2 || (_2 = true, "writable" !== r2._state || qt(r2) ? n3() : h(C2(), n3));
    }
    function E2(e2, t3) {
      _2 || (_2 = true, "writable" !== r2._state || qt(r2) ? O2(e2, t3) : h(C2(), () => O2(e2, t3)));
    }
    function O2(e2, t3) {
      return At(s2), W(l2), void 0 !== i2 && i2.removeEventListener("abort", v2), e2 ? g2(t3) : S2(void 0), null;
    }
    p(u((t3, r3) => {
      !function o3(n3) {
        n3 ? t3() : f(_2 ? c(true) : f(s2._readyPromise, () => u((t4, r4) => {
          K(l2, { _chunkSteps: (r5) => {
            y2 = f(zt(s2, r5), void 0, e), t4(false);
          }, _closeSteps: () => t4(true), _errorSteps: r4 });
        })), o3, r3);
      }(false);
    }));
  });
}
class ReadableStreamDefaultController {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
  get desiredSize() {
    if (!lr(this)) throw pr("desiredSize");
    return hr(this);
  }
  close() {
    if (!lr(this)) throw pr("close");
    if (!mr(this)) throw new TypeError("The stream is not in a state that permits close");
    dr(this);
  }
  enqueue(e2 = void 0) {
    if (!lr(this)) throw pr("enqueue");
    if (!mr(this)) throw new TypeError("The stream is not in a state that permits enqueue");
    return fr(this, e2);
  }
  error(e2 = void 0) {
    if (!lr(this)) throw pr("error");
    br(this, e2);
  }
  [T](e2) {
    we(this);
    const t2 = this._cancelAlgorithm(e2);
    return cr(this), t2;
  }
  [C](e2) {
    const t2 = this._controlledReadableStream;
    if (this._queue.length > 0) {
      const r2 = ge(this);
      this._closeRequested && 0 === this._queue.length ? (cr(this), Br(t2)) : sr(this), e2._chunkSteps(r2);
    } else V(t2, e2), sr(this);
  }
  [P]() {
  }
}
function lr(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_controlledReadableStream") && e2 instanceof ReadableStreamDefaultController);
}
function sr(e2) {
  if (!ur(e2)) return;
  if (e2._pulling) return void (e2._pullAgain = true);
  e2._pulling = true;
  b(e2._pullAlgorithm(), () => (e2._pulling = false, e2._pullAgain && (e2._pullAgain = false, sr(e2)), null), (t2) => (br(e2, t2), null));
}
function ur(e2) {
  const t2 = e2._controlledReadableStream;
  if (!mr(e2)) return false;
  if (!e2._started) return false;
  if (Wr(t2) && G(t2) > 0) return true;
  return hr(e2) > 0;
}
function cr(e2) {
  e2._pullAlgorithm = void 0, e2._cancelAlgorithm = void 0, e2._strategySizeAlgorithm = void 0;
}
function dr(e2) {
  if (!mr(e2)) return;
  const t2 = e2._controlledReadableStream;
  e2._closeRequested = true, 0 === e2._queue.length && (cr(e2), Br(t2));
}
function fr(e2, t2) {
  if (!mr(e2)) return;
  const r2 = e2._controlledReadableStream;
  if (Wr(r2) && G(r2) > 0) U(r2, t2, false);
  else {
    let r3;
    try {
      r3 = e2._strategySizeAlgorithm(t2);
    } catch (t3) {
      throw br(e2, t3), t3;
    }
    try {
      ve(e2, t2, r3);
    } catch (t3) {
      throw br(e2, t3), t3;
    }
  }
  sr(e2);
}
function br(e2, t2) {
  const r2 = e2._controlledReadableStream;
  "readable" === r2._state && (we(e2), cr(e2), kr(r2, t2));
}
function hr(e2) {
  const t2 = e2._controlledReadableStream._state;
  return "errored" === t2 ? null : "closed" === t2 ? 0 : e2._strategyHWM - e2._queueTotalSize;
}
function mr(e2) {
  const t2 = e2._controlledReadableStream._state;
  return !e2._closeRequested && "readable" === t2;
}
function _r(e2, t2, r2, o2, n2, a2, i2) {
  t2._controlledReadableStream = e2, t2._queue = void 0, t2._queueTotalSize = void 0, we(t2), t2._started = false, t2._closeRequested = false, t2._pullAgain = false, t2._pulling = false, t2._strategySizeAlgorithm = i2, t2._strategyHWM = a2, t2._pullAlgorithm = o2, t2._cancelAlgorithm = n2, e2._readableStreamController = t2;
  b(c(r2()), () => (t2._started = true, sr(t2), null), (e3) => (br(t2, e3), null));
}
function pr(e2) {
  return new TypeError(`ReadableStreamDefaultController.prototype.${e2} can only be used on a ReadableStreamDefaultController`);
}
function yr(e2, t2) {
  return Te(e2._readableStreamController) ? function(e3) {
    let t3, r2, o2, n2, a2, i2 = H(e3), l2 = false, s2 = false, d2 = false, f2 = false, b2 = false;
    const h2 = u((e4) => {
      a2 = e4;
    });
    function _2(e4) {
      m(e4._closedPromise, (t4) => (e4 !== i2 || (Ne(o2._readableStreamController, t4), Ne(n2._readableStreamController, t4), f2 && b2 || a2(void 0)), null));
    }
    function p2() {
      at(i2) && (W(i2), i2 = H(e3), _2(i2));
      K(i2, { _chunkSteps: (t4) => {
        y(() => {
          s2 = false, d2 = false;
          const r3 = t4;
          let i3 = t4;
          if (!f2 && !b2) try {
            i3 = Se(t4);
          } catch (t5) {
            return Ne(o2._readableStreamController, t5), Ne(n2._readableStreamController, t5), void a2(Or(e3, t5));
          }
          f2 || Qe(o2._readableStreamController, r3), b2 || Qe(n2._readableStreamController, i3), l2 = false, s2 ? g2() : d2 && v2();
        });
      }, _closeSteps: () => {
        l2 = false, f2 || xe(o2._readableStreamController), b2 || xe(n2._readableStreamController), o2._readableStreamController._pendingPullIntos.length > 0 && Ge(o2._readableStreamController, 0), n2._readableStreamController._pendingPullIntos.length > 0 && Ge(n2._readableStreamController, 0), f2 && b2 || a2(void 0);
      }, _errorSteps: () => {
        l2 = false;
      } });
    }
    function S2(t4, r3) {
      J(i2) && (W(i2), i2 = tt(e3), _2(i2));
      const u2 = r3 ? n2 : o2, c2 = r3 ? o2 : n2;
      it(i2, t4, 1, { _chunkSteps: (t5) => {
        y(() => {
          s2 = false, d2 = false;
          const o3 = r3 ? b2 : f2;
          if (r3 ? f2 : b2) o3 || Xe(u2._readableStreamController, t5);
          else {
            let r4;
            try {
              r4 = Se(t5);
            } catch (t6) {
              return Ne(u2._readableStreamController, t6), Ne(c2._readableStreamController, t6), void a2(Or(e3, t6));
            }
            o3 || Xe(u2._readableStreamController, t5), Qe(c2._readableStreamController, r4);
          }
          l2 = false, s2 ? g2() : d2 && v2();
        });
      }, _closeSteps: (e4) => {
        l2 = false;
        const t5 = r3 ? b2 : f2, o3 = r3 ? f2 : b2;
        t5 || xe(u2._readableStreamController), o3 || xe(c2._readableStreamController), void 0 !== e4 && (t5 || Xe(u2._readableStreamController, e4), !o3 && c2._readableStreamController._pendingPullIntos.length > 0 && Ge(c2._readableStreamController, 0)), t5 && o3 || a2(void 0);
      }, _errorSteps: () => {
        l2 = false;
      } });
    }
    function g2() {
      if (l2) return s2 = true, c(void 0);
      l2 = true;
      const e4 = Ve(o2._readableStreamController);
      return null === e4 ? p2() : S2(e4._view, false), c(void 0);
    }
    function v2() {
      if (l2) return d2 = true, c(void 0);
      l2 = true;
      const e4 = Ve(n2._readableStreamController);
      return null === e4 ? p2() : S2(e4._view, true), c(void 0);
    }
    function w2(o3) {
      if (f2 = true, t3 = o3, b2) {
        const o4 = ne([t3, r2]), n3 = Or(e3, o4);
        a2(n3);
      }
      return h2;
    }
    function R2(o3) {
      if (b2 = true, r2 = o3, f2) {
        const o4 = ne([t3, r2]), n3 = Or(e3, o4);
        a2(n3);
      }
      return h2;
    }
    function T2() {
    }
    return o2 = Pr(T2, g2, w2), n2 = Pr(T2, v2, R2), _2(i2), [o2, n2];
  }(e2) : function(e3, t3) {
    const r2 = H(e3);
    let o2, n2, a2, i2, l2, s2 = false, d2 = false, f2 = false, b2 = false;
    const h2 = u((e4) => {
      l2 = e4;
    });
    function _2() {
      if (s2) return d2 = true, c(void 0);
      s2 = true;
      return K(r2, { _chunkSteps: (e4) => {
        y(() => {
          d2 = false;
          const t4 = e4, r3 = e4;
          f2 || fr(a2._readableStreamController, t4), b2 || fr(i2._readableStreamController, r3), s2 = false, d2 && _2();
        });
      }, _closeSteps: () => {
        s2 = false, f2 || dr(a2._readableStreamController), b2 || dr(i2._readableStreamController), f2 && b2 || l2(void 0);
      }, _errorSteps: () => {
        s2 = false;
      } }), c(void 0);
    }
    function p2(t4) {
      if (f2 = true, o2 = t4, b2) {
        const t5 = ne([o2, n2]), r3 = Or(e3, t5);
        l2(r3);
      }
      return h2;
    }
    function S2(t4) {
      if (b2 = true, n2 = t4, f2) {
        const t5 = ne([o2, n2]), r3 = Or(e3, t5);
        l2(r3);
      }
      return h2;
    }
    function g2() {
    }
    return a2 = Cr(g2, _2, p2), i2 = Cr(g2, _2, S2), m(r2._closedPromise, (e4) => (br(a2._readableStreamController, e4), br(i2._readableStreamController, e4), f2 && b2 || l2(void 0), null)), [a2, i2];
  }(e2);
}
function Sr(r2) {
  return t(o2 = r2) && void 0 !== o2.getReader ? function(r3) {
    let o3;
    function n2() {
      let e2;
      try {
        e2 = r3.read();
      } catch (e3) {
        return d(e3);
      }
      return _(e2, (e3) => {
        if (!t(e3)) throw new TypeError("The promise returned by the reader.read() method must fulfill with an object");
        if (e3.done) dr(o3._readableStreamController);
        else {
          const t2 = e3.value;
          fr(o3._readableStreamController, t2);
        }
      });
    }
    function a2(e2) {
      try {
        return c(r3.cancel(e2));
      } catch (e3) {
        return d(e3);
      }
    }
    return o3 = Cr(e, n2, a2, 0), o3;
  }(r2.getReader()) : function(r3) {
    let o3;
    const n2 = fe(r3, "async");
    function a2() {
      let e2;
      try {
        e2 = be(n2);
      } catch (e3) {
        return d(e3);
      }
      return _(c(e2), (e3) => {
        if (!t(e3)) throw new TypeError("The promise returned by the iterator.next() method must fulfill with an object");
        if (e3.done) dr(o3._readableStreamController);
        else {
          const t2 = e3.value;
          fr(o3._readableStreamController, t2);
        }
      });
    }
    function i2(e2) {
      const r4 = n2.iterator;
      let o4;
      try {
        o4 = ue(r4, "return");
      } catch (e3) {
        return d(e3);
      }
      if (void 0 === o4) return c(void 0);
      return _(g(o4, r4, [e2]), (e3) => {
        if (!t(e3)) throw new TypeError("The promise returned by the iterator.return() method must fulfill with an object");
      });
    }
    return o3 = Cr(e, a2, i2, 0), o3;
  }(r2);
  // removed by dead control flow
{ var o2; }
}
function gr(e2, t2, r2) {
  return F(e2, r2), (r3) => g(e2, t2, [r3]);
}
function vr(e2, t2, r2) {
  return F(e2, r2), (r3) => g(e2, t2, [r3]);
}
function wr(e2, t2, r2) {
  return F(e2, r2), (r3) => S(e2, t2, [r3]);
}
function Rr(e2, t2) {
  if ("bytes" !== (e2 = `${e2}`)) throw new TypeError(`${t2} '${e2}' is not a valid enumeration value for ReadableStreamType`);
  return e2;
}
function Tr(e2, t2) {
  L(e2, t2);
  const r2 = null == e2 ? void 0 : e2.preventAbort, o2 = null == e2 ? void 0 : e2.preventCancel, n2 = null == e2 ? void 0 : e2.preventClose, a2 = null == e2 ? void 0 : e2.signal;
  return void 0 !== a2 && function(e3, t3) {
    if (!function(e4) {
      if ("object" != typeof e4 || null === e4) return false;
      try {
        return "boolean" == typeof e4.aborted;
      } catch (e5) {
        return false;
      }
    }(e3)) throw new TypeError(`${t3} is not an AbortSignal.`);
  }(a2, `${t2} has member 'signal' that`), { preventAbort: Boolean(r2), preventCancel: Boolean(o2), preventClose: Boolean(n2), signal: a2 };
}
Object.defineProperties(ReadableStreamDefaultController.prototype, { close: { enumerable: true }, enqueue: { enumerable: true }, error: { enumerable: true }, desiredSize: { enumerable: true } }), o(ReadableStreamDefaultController.prototype.close, "close"), o(ReadableStreamDefaultController.prototype.enqueue, "enqueue"), o(ReadableStreamDefaultController.prototype.error, "error"), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(ReadableStreamDefaultController.prototype, Symbol.toStringTag, { value: "ReadableStreamDefaultController", configurable: true });
class ReadableStream {
  constructor(e2 = {}, t2 = {}) {
    void 0 === e2 ? e2 = null : I(e2, "First parameter");
    const r2 = dt(t2, "Second parameter"), o2 = function(e3, t3) {
      L(e3, t3);
      const r3 = e3, o3 = null == r3 ? void 0 : r3.autoAllocateChunkSize, n2 = null == r3 ? void 0 : r3.cancel, a2 = null == r3 ? void 0 : r3.pull, i2 = null == r3 ? void 0 : r3.start, l2 = null == r3 ? void 0 : r3.type;
      return { autoAllocateChunkSize: void 0 === o3 ? void 0 : Q(o3, `${t3} has member 'autoAllocateChunkSize' that`), cancel: void 0 === n2 ? void 0 : gr(n2, r3, `${t3} has member 'cancel' that`), pull: void 0 === a2 ? void 0 : vr(a2, r3, `${t3} has member 'pull' that`), start: void 0 === i2 ? void 0 : wr(i2, r3, `${t3} has member 'start' that`), type: void 0 === l2 ? void 0 : Rr(l2, `${t3} has member 'type' that`) };
    }(e2, "First parameter");
    if (qr(this), "bytes" === o2.type) {
      if (void 0 !== r2.size) throw new RangeError("The strategy for a byte stream cannot have a size function");
      !function(e3, t3, r3) {
        const o3 = Object.create(ReadableByteStreamController.prototype);
        let n2, a2, i2;
        n2 = void 0 !== t3.start ? () => t3.start(o3) : () => {
        }, a2 = void 0 !== t3.pull ? () => t3.pull(o3) : () => c(void 0), i2 = void 0 !== t3.cancel ? (e4) => t3.cancel(e4) : () => c(void 0);
        const l2 = t3.autoAllocateChunkSize;
        if (0 === l2) throw new TypeError("autoAllocateChunkSize must be greater than 0");
        Je(e3, o3, n2, a2, i2, r3, l2);
      }(this, o2, ut(r2, 0));
    } else {
      const e3 = ct(r2);
      !function(e4, t3, r3, o3) {
        const n2 = Object.create(ReadableStreamDefaultController.prototype);
        let a2, i2, l2;
        a2 = void 0 !== t3.start ? () => t3.start(n2) : () => {
        }, i2 = void 0 !== t3.pull ? () => t3.pull(n2) : () => c(void 0), l2 = void 0 !== t3.cancel ? (e5) => t3.cancel(e5) : () => c(void 0), _r(e4, n2, a2, i2, l2, r3, o3);
      }(this, o2, ut(r2, 1), e3);
    }
  }
  get locked() {
    if (!Er(this)) throw jr("locked");
    return Wr(this);
  }
  cancel(e2 = void 0) {
    return Er(this) ? Wr(this) ? d(new TypeError("Cannot cancel a stream that already has a reader")) : Or(this, e2) : d(jr("cancel"));
  }
  getReader(e2 = void 0) {
    if (!Er(this)) throw jr("getReader");
    return void 0 === function(e3, t2) {
      L(e3, t2);
      const r2 = null == e3 ? void 0 : e3.mode;
      return { mode: void 0 === r2 ? void 0 : et(r2, `${t2} has member 'mode' that`) };
    }(e2, "First parameter").mode ? H(this) : tt(this);
  }
  pipeThrough(e2, t2 = {}) {
    if (!Er(this)) throw jr("pipeThrough");
    $(e2, 1, "pipeThrough");
    const r2 = function(e3, t3) {
      L(e3, t3);
      const r3 = null == e3 ? void 0 : e3.readable;
      M(r3, "readable", "ReadableWritablePair"), N(r3, `${t3} has member 'readable' that`);
      const o3 = null == e3 ? void 0 : e3.writable;
      return M(o3, "writable", "ReadableWritablePair"), pt(o3, `${t3} has member 'writable' that`), { readable: r3, writable: o3 };
    }(e2, "First parameter"), o2 = Tr(t2, "Second parameter");
    if (Wr(this)) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
    if (vt(r2.writable)) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
    return p(ir(this, r2.writable, o2.preventClose, o2.preventAbort, o2.preventCancel, o2.signal)), r2.readable;
  }
  pipeTo(e2, t2 = {}) {
    if (!Er(this)) return d(jr("pipeTo"));
    if (void 0 === e2) return d("Parameter 1 is required in 'pipeTo'.");
    if (!gt(e2)) return d(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
    let r2;
    try {
      r2 = Tr(t2, "Second parameter");
    } catch (e3) {
      return d(e3);
    }
    return Wr(this) ? d(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : vt(e2) ? d(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : ir(this, e2, r2.preventClose, r2.preventAbort, r2.preventCancel, r2.signal);
  }
  tee() {
    if (!Er(this)) throw jr("tee");
    return ne(yr(this));
  }
  values(e2 = void 0) {
    if (!Er(this)) throw jr("values");
    return function(e3, t2) {
      const r2 = H(e3), o2 = new he(r2, t2), n2 = Object.create(me);
      return n2._asyncIteratorImpl = o2, n2;
    }(this, function(e3, t2) {
      L(e3, t2);
      const r2 = null == e3 ? void 0 : e3.preventCancel;
      return { preventCancel: Boolean(r2) };
    }(e2, "First parameter").preventCancel);
  }
  [de](e2) {
    return this.values(e2);
  }
  static from(e2) {
    return Sr(e2);
  }
}
function Cr(e2, t2, r2, o2 = 1, n2 = () => 1) {
  const a2 = Object.create(ReadableStream.prototype);
  qr(a2);
  return _r(a2, Object.create(ReadableStreamDefaultController.prototype), e2, t2, r2, o2, n2), a2;
}
function Pr(e2, t2, r2) {
  const o2 = Object.create(ReadableStream.prototype);
  qr(o2);
  return Je(o2, Object.create(ReadableByteStreamController.prototype), e2, t2, r2, 0, void 0), o2;
}
function qr(e2) {
  e2._state = "readable", e2._reader = void 0, e2._storedError = void 0, e2._disturbed = false;
}
function Er(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_readableStreamController") && e2 instanceof ReadableStream);
}
function Wr(e2) {
  return void 0 !== e2._reader;
}
function Or(t2, r2) {
  if (t2._disturbed = true, "closed" === t2._state) return c(void 0);
  if ("errored" === t2._state) return d(t2._storedError);
  Br(t2);
  const o2 = t2._reader;
  if (void 0 !== o2 && at(o2)) {
    const e2 = o2._readIntoRequests;
    o2._readIntoRequests = new v(), e2.forEach((e3) => {
      e3._closeSteps(void 0);
    });
  }
  return _(t2._readableStreamController[T](r2), e);
}
function Br(e2) {
  e2._state = "closed";
  const t2 = e2._reader;
  if (void 0 !== t2 && (A(t2), J(t2))) {
    const e3 = t2._readRequests;
    t2._readRequests = new v(), e3.forEach((e4) => {
      e4._closeSteps();
    });
  }
}
function kr(e2, t2) {
  e2._state = "errored", e2._storedError = t2;
  const r2 = e2._reader;
  void 0 !== r2 && (j(r2, t2), J(r2) ? Z(r2, t2) : lt(r2, t2));
}
function jr(e2) {
  return new TypeError(`ReadableStream.prototype.${e2} can only be used on a ReadableStream`);
}
function Ar(e2, t2) {
  L(e2, t2);
  const r2 = null == e2 ? void 0 : e2.highWaterMark;
  return M(r2, "highWaterMark", "QueuingStrategyInit"), { highWaterMark: Y(r2) };
}
Object.defineProperties(ReadableStream, { from: { enumerable: true } }), Object.defineProperties(ReadableStream.prototype, { cancel: { enumerable: true }, getReader: { enumerable: true }, pipeThrough: { enumerable: true }, pipeTo: { enumerable: true }, tee: { enumerable: true }, values: { enumerable: true }, locked: { enumerable: true } }), o(ReadableStream.from, "from"), o(ReadableStream.prototype.cancel, "cancel"), o(ReadableStream.prototype.getReader, "getReader"), o(ReadableStream.prototype.pipeThrough, "pipeThrough"), o(ReadableStream.prototype.pipeTo, "pipeTo"), o(ReadableStream.prototype.tee, "tee"), o(ReadableStream.prototype.values, "values"), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(ReadableStream.prototype, Symbol.toStringTag, { value: "ReadableStream", configurable: true }), Object.defineProperty(ReadableStream.prototype, de, { value: ReadableStream.prototype.values, writable: true, configurable: true });
const zr = (e2) => e2.byteLength;
o(zr, "size");
class ByteLengthQueuingStrategy {
  constructor(e2) {
    $(e2, 1, "ByteLengthQueuingStrategy"), e2 = Ar(e2, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = e2.highWaterMark;
  }
  get highWaterMark() {
    if (!Lr(this)) throw Dr("highWaterMark");
    return this._byteLengthQueuingStrategyHighWaterMark;
  }
  get size() {
    if (!Lr(this)) throw Dr("size");
    return zr;
  }
}
function Dr(e2) {
  return new TypeError(`ByteLengthQueuingStrategy.prototype.${e2} can only be used on a ByteLengthQueuingStrategy`);
}
function Lr(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_byteLengthQueuingStrategyHighWaterMark") && e2 instanceof ByteLengthQueuingStrategy);
}
Object.defineProperties(ByteLengthQueuingStrategy.prototype, { highWaterMark: { enumerable: true }, size: { enumerable: true } }), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(ByteLengthQueuingStrategy.prototype, Symbol.toStringTag, { value: "ByteLengthQueuingStrategy", configurable: true });
const Fr = () => 1;
o(Fr, "size");
class CountQueuingStrategy {
  constructor(e2) {
    $(e2, 1, "CountQueuingStrategy"), e2 = Ar(e2, "First parameter"), this._countQueuingStrategyHighWaterMark = e2.highWaterMark;
  }
  get highWaterMark() {
    if (!$r(this)) throw Ir("highWaterMark");
    return this._countQueuingStrategyHighWaterMark;
  }
  get size() {
    if (!$r(this)) throw Ir("size");
    return Fr;
  }
}
function Ir(e2) {
  return new TypeError(`CountQueuingStrategy.prototype.${e2} can only be used on a CountQueuingStrategy`);
}
function $r(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_countQueuingStrategyHighWaterMark") && e2 instanceof CountQueuingStrategy);
}
function Mr(e2, t2, r2) {
  return F(e2, r2), (r3) => g(e2, t2, [r3]);
}
function Yr(e2, t2, r2) {
  return F(e2, r2), (r3) => S(e2, t2, [r3]);
}
function xr(e2, t2, r2) {
  return F(e2, r2), (r3, o2) => g(e2, t2, [r3, o2]);
}
function Qr(e2, t2, r2) {
  return F(e2, r2), (r3) => g(e2, t2, [r3]);
}
Object.defineProperties(CountQueuingStrategy.prototype, { highWaterMark: { enumerable: true }, size: { enumerable: true } }), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(CountQueuingStrategy.prototype, Symbol.toStringTag, { value: "CountQueuingStrategy", configurable: true });
class TransformStream {
  constructor(e2 = {}, t2 = {}, r2 = {}) {
    void 0 === e2 && (e2 = null);
    const o2 = dt(t2, "Second parameter"), n2 = dt(r2, "Third parameter"), a2 = function(e3, t3) {
      L(e3, t3);
      const r3 = null == e3 ? void 0 : e3.cancel, o3 = null == e3 ? void 0 : e3.flush, n3 = null == e3 ? void 0 : e3.readableType, a3 = null == e3 ? void 0 : e3.start, i3 = null == e3 ? void 0 : e3.transform, l3 = null == e3 ? void 0 : e3.writableType;
      return { cancel: void 0 === r3 ? void 0 : Qr(r3, e3, `${t3} has member 'cancel' that`), flush: void 0 === o3 ? void 0 : Mr(o3, e3, `${t3} has member 'flush' that`), readableType: n3, start: void 0 === a3 ? void 0 : Yr(a3, e3, `${t3} has member 'start' that`), transform: void 0 === i3 ? void 0 : xr(i3, e3, `${t3} has member 'transform' that`), writableType: l3 };
    }(e2, "First parameter");
    if (void 0 !== a2.readableType) throw new RangeError("Invalid readableType specified");
    if (void 0 !== a2.writableType) throw new RangeError("Invalid writableType specified");
    const i2 = ut(n2, 0), l2 = ct(n2), s2 = ut(o2, 1), f2 = ct(o2);
    let h2;
    !function(e3, t3, r3, o3, n3, a3) {
      function i3() {
        return t3;
      }
      function l3(t4) {
        return function(e4, t5) {
          const r4 = e4._transformStreamController;
          if (e4._backpressure) {
            return _(e4._backpressureChangePromise, () => {
              const o4 = e4._writable;
              if ("erroring" === o4._state) throw o4._storedError;
              return Zr(r4, t5);
            });
          }
          return Zr(r4, t5);
        }(e3, t4);
      }
      function s3(t4) {
        return function(e4, t5) {
          const r4 = e4._transformStreamController;
          if (void 0 !== r4._finishPromise) return r4._finishPromise;
          const o4 = e4._readable;
          r4._finishPromise = u((e5, t6) => {
            r4._finishPromise_resolve = e5, r4._finishPromise_reject = t6;
          });
          const n4 = r4._cancelAlgorithm(t5);
          return Jr(r4), b(n4, () => ("errored" === o4._state ? ro(r4, o4._storedError) : (br(o4._readableStreamController, t5), to(r4)), null), (e5) => (br(o4._readableStreamController, e5), ro(r4, e5), null)), r4._finishPromise;
        }(e3, t4);
      }
      function c2() {
        return function(e4) {
          const t4 = e4._transformStreamController;
          if (void 0 !== t4._finishPromise) return t4._finishPromise;
          const r4 = e4._readable;
          t4._finishPromise = u((e5, r5) => {
            t4._finishPromise_resolve = e5, t4._finishPromise_reject = r5;
          });
          const o4 = t4._flushAlgorithm();
          return Jr(t4), b(o4, () => ("errored" === r4._state ? ro(t4, r4._storedError) : (dr(r4._readableStreamController), to(t4)), null), (e5) => (br(r4._readableStreamController, e5), ro(t4, e5), null)), t4._finishPromise;
        }(e3);
      }
      function d2() {
        return function(e4) {
          return Gr(e4, false), e4._backpressureChangePromise;
        }(e3);
      }
      function f3(t4) {
        return function(e4, t5) {
          const r4 = e4._transformStreamController;
          if (void 0 !== r4._finishPromise) return r4._finishPromise;
          const o4 = e4._writable;
          r4._finishPromise = u((e5, t6) => {
            r4._finishPromise_resolve = e5, r4._finishPromise_reject = t6;
          });
          const n4 = r4._cancelAlgorithm(t5);
          return Jr(r4), b(n4, () => ("errored" === o4._state ? ro(r4, o4._storedError) : (Yt(o4._writableStreamController, t5), Ur(e4), to(r4)), null), (t6) => (Yt(o4._writableStreamController, t6), Ur(e4), ro(r4, t6), null)), r4._finishPromise;
        }(e3, t4);
      }
      e3._writable = function(e4, t4, r4, o4, n4 = 1, a4 = () => 1) {
        const i4 = Object.create(WritableStream.prototype);
        return St(i4), Ft(i4, Object.create(WritableStreamDefaultController.prototype), e4, t4, r4, o4, n4, a4), i4;
      }(i3, l3, c2, s3, r3, o3), e3._readable = Cr(i3, d2, f3, n3, a3), e3._backpressure = void 0, e3._backpressureChangePromise = void 0, e3._backpressureChangePromise_resolve = void 0, Gr(e3, true), e3._transformStreamController = void 0;
    }(this, u((e3) => {
      h2 = e3;
    }), s2, f2, i2, l2), function(e3, t3) {
      const r3 = Object.create(TransformStreamDefaultController.prototype);
      let o3, n3, a3;
      o3 = void 0 !== t3.transform ? (e4) => t3.transform(e4, r3) : (e4) => {
        try {
          return Kr(r3, e4), c(void 0);
        } catch (e5) {
          return d(e5);
        }
      };
      n3 = void 0 !== t3.flush ? () => t3.flush(r3) : () => c(void 0);
      a3 = void 0 !== t3.cancel ? (e4) => t3.cancel(e4) : () => c(void 0);
      !function(e4, t4, r4, o4, n4) {
        t4._controlledTransformStream = e4, e4._transformStreamController = t4, t4._transformAlgorithm = r4, t4._flushAlgorithm = o4, t4._cancelAlgorithm = n4, t4._finishPromise = void 0, t4._finishPromise_resolve = void 0, t4._finishPromise_reject = void 0;
      }(e3, r3, o3, n3, a3);
    }(this, a2), void 0 !== a2.start ? h2(a2.start(this._transformStreamController)) : h2(void 0);
  }
  get readable() {
    if (!Nr(this)) throw oo("readable");
    return this._readable;
  }
  get writable() {
    if (!Nr(this)) throw oo("writable");
    return this._writable;
  }
}
function Nr(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_transformStreamController") && e2 instanceof TransformStream);
}
function Hr(e2, t2) {
  br(e2._readable._readableStreamController, t2), Vr(e2, t2);
}
function Vr(e2, t2) {
  Jr(e2._transformStreamController), Yt(e2._writable._writableStreamController, t2), Ur(e2);
}
function Ur(e2) {
  e2._backpressure && Gr(e2, false);
}
function Gr(e2, t2) {
  void 0 !== e2._backpressureChangePromise && e2._backpressureChangePromise_resolve(), e2._backpressureChangePromise = u((t3) => {
    e2._backpressureChangePromise_resolve = t3;
  }), e2._backpressure = t2;
}
Object.defineProperties(TransformStream.prototype, { readable: { enumerable: true }, writable: { enumerable: true } }), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(TransformStream.prototype, Symbol.toStringTag, { value: "TransformStream", configurable: true });
class TransformStreamDefaultController {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
  get desiredSize() {
    if (!Xr(this)) throw eo("desiredSize");
    return hr(this._controlledTransformStream._readable._readableStreamController);
  }
  enqueue(e2 = void 0) {
    if (!Xr(this)) throw eo("enqueue");
    Kr(this, e2);
  }
  error(e2 = void 0) {
    if (!Xr(this)) throw eo("error");
    var t2;
    t2 = e2, Hr(this._controlledTransformStream, t2);
  }
  terminate() {
    if (!Xr(this)) throw eo("terminate");
    !function(e2) {
      const t2 = e2._controlledTransformStream;
      dr(t2._readable._readableStreamController);
      const r2 = new TypeError("TransformStream terminated");
      Vr(t2, r2);
    }(this);
  }
}
function Xr(e2) {
  return !!t(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_controlledTransformStream") && e2 instanceof TransformStreamDefaultController);
}
function Jr(e2) {
  e2._transformAlgorithm = void 0, e2._flushAlgorithm = void 0, e2._cancelAlgorithm = void 0;
}
function Kr(e2, t2) {
  const r2 = e2._controlledTransformStream, o2 = r2._readable._readableStreamController;
  if (!mr(o2)) throw new TypeError("Readable side is not in a state that permits enqueue");
  try {
    fr(o2, t2);
  } catch (e3) {
    throw Vr(r2, e3), r2._readable._storedError;
  }
  const n2 = function(e3) {
    return !ur(e3);
  }(o2);
  n2 !== r2._backpressure && Gr(r2, true);
}
function Zr(e2, t2) {
  return _(e2._transformAlgorithm(t2), void 0, (t3) => {
    throw Hr(e2._controlledTransformStream, t3), t3;
  });
}
function eo(e2) {
  return new TypeError(`TransformStreamDefaultController.prototype.${e2} can only be used on a TransformStreamDefaultController`);
}
function to(e2) {
  void 0 !== e2._finishPromise_resolve && (e2._finishPromise_resolve(), e2._finishPromise_resolve = void 0, e2._finishPromise_reject = void 0);
}
function ro(e2, t2) {
  void 0 !== e2._finishPromise_reject && (p(e2._finishPromise), e2._finishPromise_reject(t2), e2._finishPromise_resolve = void 0, e2._finishPromise_reject = void 0);
}
function oo(e2) {
  return new TypeError(`TransformStream.prototype.${e2} can only be used on a TransformStream`);
}
Object.defineProperties(TransformStreamDefaultController.prototype, { enqueue: { enumerable: true }, error: { enumerable: true }, terminate: { enumerable: true }, desiredSize: { enumerable: true } }), o(TransformStreamDefaultController.prototype.enqueue, "enqueue"), o(TransformStreamDefaultController.prototype.error, "error"), o(TransformStreamDefaultController.prototype.terminate, "terminate"), "symbol" == typeof Symbol.toStringTag && Object.defineProperty(TransformStreamDefaultController.prototype, Symbol.toStringTag, { value: "TransformStreamDefaultController", configurable: true });



/***/ })

}]);