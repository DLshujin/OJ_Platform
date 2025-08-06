;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e34b1e70-dafa-4edc-9610-4bc2c40d9af6",e._sentryDebugIdIdentifier="sentry-dbid-e34b1e70-dafa-4edc-9610-4bc2c40d9af6");})();}catch(e){}};
!function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"00ee96a191eaa70b72f3e18304fd7a157fe83a8e"};}();
(self["webpackChunk_hydrooj_ui_default"] = self["webpackChunk_hydrooj_ui_default"] || []).push([["n.js-yaml"],{

/***/ "../../node_modules/jquery-scroll-lock/jquery-scrollLock.js":
/*!******************************************************************!*\
  !*** ../../node_modules/jquery-scroll-lock/jquery-scrollLock.js ***!
  \******************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Scroll Lock v3.1.3
 * https://github.com/MohammadYounes/jquery-scrollLock
 *
 * Copyright (c) 2017 Mohammad Younes
 * Licensed under GPL 3.
 */
;
(function(factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else // removed by dead control flow
{}
})(function($) {
  "use strict";
  var keys = { space: 32, pageup: 33, pagedown: 34, end: 35, home: 36, up: 38, down: 40 };
  var processScrollEvent = function(event, $element) {
    var scrollTop = $element.scrollTop(), scrollHeight = $element.prop("scrollHeight"), clientHeight = $element.prop("clientHeight"), delta = event.originalEvent.wheelDelta || -1 * event.originalEvent.detail || -1 * event.originalEvent.deltaY, deltaY = 0;
    if (event.type === "wheel") {
      var ratio = $element.height() / $(window).height();
      deltaY = event.originalEvent.deltaY * ratio;
    } else if (this.options.touch && event.type === "touchmove") {
      delta = event.originalEvent.changedTouches[0].clientY - this.startClientY;
    }
    var top, prevent;
    prevent = (top = delta > 0 && scrollTop + deltaY <= 0) || delta < 0 && scrollTop + deltaY >= scrollHeight - clientHeight;
    return { prevent, top, scrollTop, deltaY };
  };
  var processKeyboardEvent = function(event, $element) {
    var scrollTop = $element.scrollTop(), result = { top: false, bottom: false };
    result.top = scrollTop === 0 && (event.keyCode === keys.pageup || event.keyCode === keys.home || event.keyCode === keys.up);
    if (!result.top) {
      var scrollHeight = $element.prop("scrollHeight"), clientHeight = $element.prop("clientHeight");
      result.bottom = scrollHeight === scrollTop + clientHeight && (event.keyCode === keys.space || event.keyCode === keys.pagedown || event.keyCode === keys.end || event.keyCode === keys.down);
    }
    return result;
  };
  var ScrollLock = function($element, options) {
    this.$element = $element;
    this.options = $.extend({}, ScrollLock.DEFAULTS, this.$element.data(), options);
    this.enabled = true;
    this.startClientY = 0;
    if (this.options.unblock) {
      this.$element.on(ScrollLock.CORE.wheelEventName + ScrollLock.NAMESPACE, this.options.unblock, $.proxy(ScrollLock.CORE.unblockHandler, this));
    }
    this.$element.on(ScrollLock.CORE.wheelEventName + ScrollLock.NAMESPACE, this.options.selector, $.proxy(ScrollLock.CORE.handler, this));
    if (this.options.touch) {
      this.$element.on("touchstart" + ScrollLock.NAMESPACE, this.options.selector, $.proxy(ScrollLock.CORE.touchHandler, this));
      this.$element.on("touchmove" + ScrollLock.NAMESPACE, this.options.selector, $.proxy(ScrollLock.CORE.handler, this));
      if (this.options.unblock) {
        this.$element.on("touchmove" + ScrollLock.NAMESPACE, this.options.unblock, $.proxy(ScrollLock.CORE.unblockHandler, this));
      }
    }
    if (this.options.keyboard) {
      this.$element.attr("tabindex", this.options.keyboard.tabindex || 0);
      this.$element.on("keydown" + ScrollLock.NAMESPACE, this.options.selector, $.proxy(ScrollLock.CORE.keyboardHandler, this));
      if (this.options.unblock) {
        this.$element.on("keydown" + ScrollLock.NAMESPACE, this.options.unblock, $.proxy(ScrollLock.CORE.unblockHandler, this));
      }
    }
  };
  ScrollLock.NAME = "ScrollLock";
  ScrollLock.VERSION = "3.1.2";
  ScrollLock.NAMESPACE = ".scrollLock";
  ScrollLock.ANIMATION_NAMESPACE = ScrollLock.NAMESPACE + ".effect";
  ScrollLock.DEFAULTS = {
    strict: false,
    strictFn: function($element) {
      return $element.prop("scrollHeight") > $element.prop("clientHeight");
    },
    selector: false,
    animation: false,
    touch: "ontouchstart" in window,
    keyboard: false,
    unblock: false
  };
  ScrollLock.CORE = {
    wheelEventName: "onwheel" in document.createElement("div") ? "wheel" : (
      // Modern browsers support "wheel"
      document.onmousewheel !== void 0 ? "mousewheel" : (
        // Webkit and IE support at least "mousewheel"
        "DOMMouseScroll"
      )
    ),
    // let's assume that remaining browsers are older Firefox,
    animationEventName: [
      "webkitAnimationEnd",
      "mozAnimationEnd",
      "MSAnimationEnd",
      "oanimationend",
      "animationend"
    ].join(ScrollLock.ANIMATION_NAMESPACE + " ") + ScrollLock.ANIMATION_NAMESPACE,
    unblockHandler: function(event) {
      event.__currentTarget = event.currentTarget;
    },
    handler: function(event) {
      if (this.enabled && !event.ctrlKey) {
        var $this = $(event.currentTarget);
        if (this.options.strict !== true || this.options.strictFn($this)) {
          event.stopPropagation();
          var result = $.proxy(processScrollEvent, this)(event, $this);
          if (event.__currentTarget)
            result.prevent &= $.proxy(processScrollEvent, this)(event, $(event.__currentTarget)).prevent;
          if (result.prevent) {
            event.preventDefault();
            if (result.deltaY) {
              $this.scrollTop(result.scrollTop + result.deltaY);
            }
            var key = result.top ? "top" : "bottom";
            if (this.options.animation) {
              setTimeout(ScrollLock.CORE.animationHandler.bind(this, $this, key), 0);
            }
            $this.trigger($.Event(key + ScrollLock.NAMESPACE));
          }
        }
      }
    },
    touchHandler: function(event) {
      this.startClientY = event.originalEvent.touches[0].clientY;
    },
    animationHandler: function($element, key) {
      var css = this.options.animation[key], all = this.options.animation.top + " " + this.options.animation.bottom;
      $element.off(ScrollLock.ANIMATION_NAMESPACE).removeClass(all).addClass(css).one(
        ScrollLock.CORE.animationEventName,
        function() {
          $element.removeClass(css);
        }
      );
    },
    keyboardHandler: function(event) {
      var $this = $(event.currentTarget), scrollTop = $this.scrollTop(), result = processKeyboardEvent(event, $this);
      if (event.__currentTarget) {
        var result2 = processKeyboardEvent(event, $(event.__currentTarget));
        result.top &= result2.top;
        result.bottom &= result2.bottom;
      }
      if (result.top) {
        $this.trigger($.Event("top" + ScrollLock.NAMESPACE));
        if (this.options.animation) {
          setTimeout(ScrollLock.CORE.animationHandler.bind(this, $this, "top"), 0);
        }
        return false;
      } else if (result.bottom) {
        $this.trigger($.Event("bottom" + ScrollLock.NAMESPACE));
        if (this.options.animation) {
          setTimeout(ScrollLock.CORE.animationHandler.bind(this, $this, "bottom"), 0);
        }
        return false;
      }
    }
  };
  ScrollLock.prototype.toggleStrict = function() {
    this.options.strict = !this.options.strict;
  };
  ScrollLock.prototype.enable = function() {
    this.enabled = true;
  };
  ScrollLock.prototype.disable = function() {
    this.enabled = false;
  };
  ScrollLock.prototype.destroy = function() {
    this.disable();
    this.$element.off(ScrollLock.NAMESPACE);
    this.$element = null;
    this.options = null;
  };
  var old = $.fn.scrollLock;
  $.fn.scrollLock = function(option) {
    return this.each(function() {
      var $this = $(this);
      var options = typeof option == "object" && option;
      var data = $this.data(ScrollLock.NAME);
      if (!data && "destroy" === option) return;
      if (!data) $this.data(ScrollLock.NAME, data = new ScrollLock($this, options));
      if (typeof option == "string") data[option]();
    });
  };
  $.fn.scrollLock.defaults = ScrollLock.DEFAULTS;
  $.fn.scrollLock.noConflict = function() {
    $.fn.scrollLock = old;
    return this;
  };
});


/***/ }),

/***/ "../../node_modules/js-yaml/dist/js-yaml.mjs":
/*!***************************************************!*\
  !*** ../../node_modules/js-yaml/dist/js-yaml.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   dump: () => (/* binding */ dump)
/* harmony export */ });
/* unused harmony exports CORE_SCHEMA, DEFAULT_SCHEMA, FAILSAFE_SCHEMA, JSON_SCHEMA, Schema, Type, YAMLException, load, loadAll, safeDump, safeLoad, safeLoadAll, types */
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];
  return [sequence];
}
function extend(target, source) {
  var index, length, key, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }
  return target;
}
function repeat(string, count) {
  var result = "", cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }
  return result;
}
function isNegativeZero(number) {
  return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
var isNothing_1 = isNothing;
var isObject_1 = isObject;
var toArray_1 = toArray;
var repeat_1 = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1 = extend;
var common = {
  isNothing: isNothing_1,
  isObject: isObject_1,
  toArray: toArray_1,
  repeat: repeat_1,
  isNegativeZero: isNegativeZero_1,
  extend: extend_1
};
function formatError(exception2, compact) {
  var where = "", message = exception2.reason || "(unknown reason)";
  if (!exception2.mark) return message;
  if (exception2.mark.name) {
    where += 'in "' + exception2.mark.name + '" ';
  }
  where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
  if (!compact && exception2.mark.snippet) {
    where += "\n\n" + exception2.mark.snippet;
  }
  return message + " " + where;
}
function YAMLException$1(reason, mark) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;
YAMLException$1.prototype.toString = function toString(compact) {
  return this.name + ": " + formatError(this, compact);
};
var exception = YAMLException$1;
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = "";
  var tail = "";
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
  if (position - lineStart > maxHalfLength) {
    head = " ... ";
    lineStart = position - maxHalfLength + head.length;
  }
  if (lineEnd - position > maxHalfLength) {
    tail = " ...";
    lineEnd = position + maxHalfLength - tail.length;
  }
  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
    pos: position - lineStart + head.length
    // relative position
  };
}
function padStart(string, max) {
  return common.repeat(" ", max - string.length) + string;
}
function makeSnippet(mark, options) {
  options = Object.create(options || null);
  if (!mark.buffer) return null;
  if (!options.maxLength) options.maxLength = 79;
  if (typeof options.indent !== "number") options.indent = 1;
  if (typeof options.linesBefore !== "number") options.linesBefore = 3;
  if (typeof options.linesAfter !== "number") options.linesAfter = 2;
  var re = /\r?\n|\r|\0/g;
  var lineStarts = [0];
  var lineEnds = [];
  var match;
  var foundLineNo = -1;
  while (match = re.exec(mark.buffer)) {
    lineEnds.push(match.index);
    lineStarts.push(match.index + match[0].length);
    if (mark.position <= match.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }
  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
  var result = "", i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
  }
  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  }
  return result.replace(/\n$/, "");
}
var snippet = makeSnippet;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
function Type$1(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.options = options;
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.representName = options["representName"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.multi = options["multi"] || false;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
var type = Type$1;
function compileList(schema2, name) {
  var result = [];
  schema2[name].forEach(function(currentType) {
    var newIndex = result.length;
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
        newIndex = previousIndex;
      }
    });
    result[newIndex] = currentType;
  });
  return result;
}
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, index, length;
  function collectType(type2) {
    if (type2.multi) {
      result.multi[type2.kind].push(type2);
      result.multi["fallback"].push(type2);
    } else {
      result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
    }
  }
  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}
function Schema$1(definition) {
  return this.extend(definition);
}
Schema$1.prototype.extend = function extend2(definition) {
  var implicit = [];
  var explicit = [];
  if (definition instanceof type) {
    explicit.push(definition);
  } else if (Array.isArray(definition)) {
    explicit = explicit.concat(definition);
  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    if (definition.implicit) implicit = implicit.concat(definition.implicit);
    if (definition.explicit) explicit = explicit.concat(definition.explicit);
  } else {
    throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  }
  implicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
    if (type$1.loadKind && type$1.loadKind !== "scalar") {
      throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
    if (type$1.multi) {
      throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }
  });
  explicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
  });
  var result = Object.create(Schema$1.prototype);
  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);
  result.compiledImplicit = compileList(result, "implicit");
  result.compiledExplicit = compileList(result, "explicit");
  result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
  return result;
};
var schema = Schema$1;
var str = new type("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(data) {
    return data !== null ? data : "";
  }
});
var seq = new type("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(data) {
    return data !== null ? data : [];
  }
});
var map = new type("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(data) {
    return data !== null ? data : {};
  }
});
var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});
function resolveYamlNull(data) {
  if (data === null) return true;
  var max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object) {
  return object === null;
}
var _null = new type("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function resolveYamlBoolean(data) {
  if (data === null) return false;
  var max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
var bool = new type("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function(object) {
      return object ? "true" : "false";
    },
    uppercase: function(object) {
      return object ? "TRUE" : "FALSE";
    },
    camelcase: function(object) {
      return object ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  if (data === null) return false;
  var max = data.length, index = 0, hasDigits = false, ch;
  if (!max) return false;
  ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max) return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch !== "0" && ch !== "1") return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "o") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
  }
  if (ch === "_") return false;
  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_") continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_") return false;
  return true;
}
function constructYamlInteger(data) {
  var value = data, sign = 1, ch;
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-") sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0") return 0;
  if (ch === "0") {
    if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
    if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
  }
  return sign * parseInt(value, 10);
}
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
}
var int = new type("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    },
    octal: function(obj) {
      return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
    },
    decimal: function(obj) {
      return obj.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function resolveYamlFloat(data) {
  if (data === null) return false;
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  var value, sign;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
}
var float = new type("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var core = json;
var YAML_DATE_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
);
var YAML_TIMESTAMP_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}
function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null) throw new Error("Date resolve error");
  year = +match[1];
  month = +match[2] - 1;
  day = +match[3];
  if (!match[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match[4];
  minute = +match[5];
  second = +match[6];
  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match[9]) {
    tz_hour = +match[10];
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match[9] === "-") delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta) date.setTime(date.getTime() - delta);
  return date;
}
function representYamlTimestamp(object) {
  return object.toISOString();
}
var timestamp = new type("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge = new type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null) return false;
  var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64) continue;
    if (code < 0) return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Uint8Array(result);
}
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(obj) {
  return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
var binary = new type("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null) return true;
  var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]") return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }
    if (!pairHasKey) return false;
    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
var omap = new type("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null) return true;
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    if (_toString$1.call(pair) !== "[object Object]") return false;
    keys = Object.keys(pair);
    if (keys.length !== 1) return false;
    result[index] = [keys[0], pair[keys[0]]];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null) return [];
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    keys = Object.keys(pair);
    result[index] = [keys[0], pair[keys[0]]];
  }
  return result;
}
var pairs = new type("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null) return true;
  var key, object = data;
  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new type("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var _default = core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
  return c === 10 || c === 13;
}
function is_WHITE_SPACE(c) {
  return c === 9 || c === 32;
}
function is_WS_OR_EOL(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
function is_FLOW_INDICATOR(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromHexCode(c) {
  var lc;
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  lc = c | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
function fromDecimalCode(c) {
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  return -1;
}
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode(
    (c - 65536 >> 10) + 55296,
    (c - 65536 & 1023) + 56320
  );
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || _default;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.firstTabInLine = -1;
  this.documents = [];
}
function generateError(state, message) {
  var mark = {
    name: state.filename,
    buffer: state.input.slice(0, -1),
    // omit trailing \0
    position: state.position,
    line: state.line,
    column: state.position - state.lineStart
  };
  mark.snippet = snippet(mark);
  return new exception(message, mark);
}
function throwError(state, message) {
  throw generateError(state, message);
}
function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}
var directiveHandlers = {
  YAML: function handleYamlDirective(state, name, args) {
    var match, major, minor;
    if (state.version !== null) {
      throwError(state, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      throwError(state, "YAML directive accepts exactly one argument");
    }
    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match === null) {
      throwError(state, "ill-formed argument of the YAML directive");
    }
    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);
    if (major !== 1) {
      throwError(state, "unacceptable YAML version of the document");
    }
    state.version = args[0];
    state.checkLineBreaks = minor < 2;
    if (minor !== 1 && minor !== 2) {
      throwWarning(state, "unsupported YAML version of the document");
    }
  },
  TAG: function handleTagDirective(state, name, args) {
    var handle, prefix;
    if (args.length !== 2) {
      throwError(state, "TAG directive accepts exactly two arguments");
    }
    handle = args[0];
    prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state, "tag prefix is malformed: " + prefix);
    }
    state.tagMap[handle] = prefix;
  }
};
function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;
  if (start < end) {
    _result = state.input.slice(start, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, "the stream contains non-printable characters");
    }
    state.result += _result;
  }
}
function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;
  if (!common.isObject(source)) {
    throwError(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source);
  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];
    if (!_hasOwnProperty$1.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
  var index, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
        keyNode[index] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, "duplicated mapping key");
    }
    if (keyNode === "__proto__") {
      Object.defineProperty(_result, keyNode, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: valueNode
      });
    } else {
      _result[keyNode] = valueNode;
    }
    delete overridableKeys[keyNode];
  }
  return _result;
}
function readLineBreak(state) {
  var ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    throwError(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 9 && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
function testDocumentSeparator(state) {
  var _position = state.position, ch;
  ch = state.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += " ";
  } else if (count > 1) {
    state.result += common.repeat("\n", count - 1);
  }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
  ch = state.input.charCodeAt(state.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  captureStart = captureEnd = state.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state.input.charCodeAt(state.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;
    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);
      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }
    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }
    ch = state.input.charCodeAt(++state.position);
  }
  captureSegment(state, captureStart, captureEnd, false);
  if (state.result) {
    return true;
  }
  state.kind = _kind;
  state.result = _result;
  return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
  var ch, captureStart, captureEnd;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            throwError(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        throwError(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
  var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
    isMapping = true;
    _result = {};
  } else {
    return false;
  }
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(++state.position);
  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, "missed comma between flow collection entries");
    } else if (ch === 44) {
      throwError(state, "expected the node content, but found ','");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    _line = state.line;
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === _line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }
    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }
    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += common.repeat("\n", emptyLines);
      }
    } else {
      state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
function readBlockSequence(state, nodeIndent) {
  var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
  if (state.firstTabInLine !== -1) return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    if (ch !== 45) {
      break;
    }
    following = state.input.charCodeAt(state.position + 1);
    if (!is_WS_OR_EOL(following)) {
      break;
    }
    detected = true;
    state.position++;
    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "sequence";
    state.result = _result;
    return true;
  }
  return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.firstTabInLine !== -1) return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;
      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        break;
      }
      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          throwError(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true;
      }
    }
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "mapping";
    state.result = _result;
  }
  return detected;
}
function readTagProperty(state) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33) return false;
  if (state.tag !== null) {
    throwError(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  _position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(_position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, "tag name cannot contain such characters: " + tagName);
  }
  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, "tag name is malformed: " + tagName);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
function readAnchorProperty(state) {
  var _position, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 38) return false;
  if (state.anchor !== null) {
    throwError(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(_position, state.position);
  return true;
}
function readAlias(state) {
  var _position, alias, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 42) return false;
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an alias node must contain at least one character");
  }
  alias = state.input.slice(_position, state.position);
  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }
  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
  if (state.listener !== null) {
    state.listener("open", state);
  }
  state.tag = null;
  state.anchor = null;
  state.kind = null;
  state.result = null;
  allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;
      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }
    blockIndent = state.position - state.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            throwError(state, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }
  } else if (state.tag === "?") {
    if (state.result !== null && state.kind !== "scalar") {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }
    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type2 = state.implicitTypes[typeIndex];
      if (type2.resolve(state.result)) {
        state.result = type2.construct(state.result);
        state.tag = type2.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== "!") {
    if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
      type2 = state.typeMap[state.kind || "fallback"][state.tag];
    } else {
      type2 = null;
      typeList = state.typeMap.multi[state.kind || "fallback"];
      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type2 = typeList[typeIndex];
          break;
        }
      }
    }
    if (!type2) {
      throwError(state, "unknown tag !<" + state.tag + ">");
    }
    if (state.result !== null && type2.kind !== state.kind) {
      throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
    }
    if (!type2.resolve(state.result, state.tag)) {
      throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
    } else {
      state.result = type2.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }
  if (state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
  var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = /* @__PURE__ */ Object.create(null);
  state.anchorMap = /* @__PURE__ */ Object.create(null);
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      throwError(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch)) break;
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(_position, state.position));
    }
    if (ch !== 0) readLineBreak(state);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    throwError(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    throwError(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, "null byte is not allowed in input");
  }
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
function loadAll$1(input, iterator, options) {
  if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator !== "function") {
    return documents;
  }
  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}
function load$1(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception("expected a single document in the stream, but found more");
}
var loadAll_1 = loadAll$1;
var load_1 = load$1;
var loader = {
  loadAll: loadAll_1,
  load: load_1
};
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_BOM = 65279;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_CARRIAGE_RETURN = 13;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_EQUALS = 61;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function compileStyleMap(schema2, map2) {
  var result, keys, index, length, tag, style, type2;
  if (map2 === null) return {};
  result = {};
  keys = Object.keys(map2);
  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
function encodeHex(character) {
  var string, handle, length;
  string = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle = "x";
    length = 2;
  } else if (character <= 65535) {
    handle = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle = "U";
    length = 8;
  } else {
    throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle + common.repeat("0", length - string.length) + string;
}
var QUOTING_TYPE_SINGLE = 1, QUOTING_TYPE_DOUBLE = 2;
function State(options) {
  this.schema = options["schema"] || _default;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes = options["forceQuotes"] || false;
  this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
function indentString(string, spaces) {
  var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
  while (position < length) {
    next = string.indexOf("\n", position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }
    if (line.length && line !== "\n") result += ind;
    result += line;
  }
  return result;
}
function generateNextLine(state, level) {
  return "\n" + common.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str2) {
  var index, length, type2;
  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type2 = state.implicitTypes[index];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
}
function isNsCharOrWhitespace(c) {
  return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    (inblock ? (
      // c = flow-in
      cIsNsCharOrWhitespace
    ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
  );
}
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
function isPlainSafeLast(c) {
  return !isWhitespace(c) && c !== CHAR_COLON;
}
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}
var STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
  if (singleLineOnly || forceQuotes) {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
          i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = function() {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
      }
    }
    var indent = state.indent * Math.max(1, level);
    var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(string2) {
      return testImplicitResolving(state, string2);
    }
    switch (chooseScalarStyle(
      string,
      singleLineOnly,
      state.indent,
      lineWidth,
      testAmbiguity,
      state.quotingType,
      state.forceQuotes && !iskey,
      inblock
    )) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new exception("impossible error: invalid scalar style");
    }
  }();
}
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
  var clip = string[string.length - 1] === "\n";
  var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
function dropEndingNewline(string) {
  return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
function foldString(string, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = function() {
    var nextLF = string.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }();
  var prevMoreIndented = string[0] === "\n" || string[0] === " ";
  var moreIndented;
  var match;
  while (match = lineRe.exec(string)) {
    var prefix = match[1], line = match[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
function foldLine(line, width) {
  if (line === "" || line[0] === " ") return line;
  var breakRe = / [^ ]/g;
  var match;
  var start = 0, end, curr = 0, next = 0;
  var result = "";
  while (match = breakRe.exec(line)) {
    next = match.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += "\n" + line.slice(start, end);
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
function escapeString(string) {
  var result = "";
  var char = 0;
  var escapeSeq;
  for (var i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
    char = codePointAt(string, i);
    escapeSeq = ESCAPE_SEQUENCES[char];
    if (!escapeSeq && isPrintable(char)) {
      result += string[i];
      if (char >= 65536) result += string[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }
  return result;
}
function writeFlowSequence(state, level, object) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
      if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object, compact) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
      if (!compact || _result !== "") {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (_result !== "") pairBuffer += ", ";
    if (state.condenseFlow) pairBuffer += '"';
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024) pairBuffer += "? ";
    pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object, compact) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new exception("sortKeys must be a boolean or a function");
  }
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (!compact || _result !== "") {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
function detectType(state, object, explicit) {
  var _result, typeList, index, length, type2, style;
  typeList = explicit ? state.explicitTypes : state.implicitTypes;
  for (index = 0, length = typeList.length; index < length; index += 1) {
    type2 = typeList[index];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
      if (explicit) {
        if (type2.multi && type2.representName) {
          state.tag = type2.representName(object);
        } else {
          state.tag = type2.tag;
        }
      } else {
        state.tag = "?";
      }
      if (type2.represent) {
        style = state.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object, style);
        } else {
          throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;
  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }
  var type2 = _toString.call(state.dump);
  var inblock = block;
  var tagStr;
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      if (block && state.dump.length !== 0) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type2 === "[object Undefined]") {
      return false;
    } else {
      if (state.skipInvalid) return false;
      throw new exception("unacceptable kind of an object to dump " + type2);
    }
    if (state.tag !== null && state.tag !== "?") {
      tagStr = encodeURI(
        state.tag[0] === "!" ? state.tag.slice(1) : state.tag
      ).replace(/!/g, "%21");
      if (state.tag[0] === "!") {
        tagStr = "!" + tagStr;
      } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
        tagStr = "!!" + tagStr.slice(18);
      } else {
        tagStr = "!<" + tagStr + ">";
      }
      state.dump = tagStr + " " + state.dump;
    }
  }
  return true;
}
function getDuplicateReferences(object, state) {
  var objects = [], duplicatesIndexes = [], index, length;
  inspectNode(object, objects, duplicatesIndexes);
  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList, index, length;
  if (object !== null && typeof object === "object") {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);
      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);
        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
function dump$1(input, options) {
  options = options || {};
  var state = new State(options);
  if (!state.noRefs) getDuplicateReferences(input, state);
  var value = input;
  if (state.replacer) {
    value = state.replacer.call({ "": value }, "", value);
  }
  if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
  return "";
}
var dump_1 = dump$1;
var dumper = {
  dump: dump_1
};
function renamed(from, to) {
  return function() {
    throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
  };
}
var Type = type;
var Schema = schema;
var FAILSAFE_SCHEMA = failsafe;
var JSON_SCHEMA = json;
var CORE_SCHEMA = core;
var DEFAULT_SCHEMA = _default;
var load = loader.load;
var loadAll = loader.loadAll;
var dump = dumper.dump;
var YAMLException = exception;
var types = {
  binary,
  float,
  map,
  null: _null,
  pairs,
  set,
  timestamp,
  bool,
  int,
  merge,
  omap,
  seq,
  str
};
var safeLoad = renamed("safeLoad", "load");
var safeLoadAll = renamed("safeLoadAll", "loadAll");
var safeDump = renamed("safeDump", "dump");
var jsYaml = {
  Type,
  Schema,
  FAILSAFE_SCHEMA,
  JSON_SCHEMA,
  CORE_SCHEMA,
  DEFAULT_SCHEMA,
  load,
  loadAll,
  dump,
  YAMLException,
  types,
  safeLoad,
  safeLoadAll,
  safeDump
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (jsYaml);



/***/ }),

/***/ "../../node_modules/monaco-editor/esm/vs/editor/common/services sync recursive ^.*$":
/*!*********************************************************************************!*\
  !*** ../../node_modules/monaco-editor/esm/vs/editor/common/services/ sync ^.*$ ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./editorBaseApi": "../../node_modules/monaco-editor/esm/vs/editor/common/services/editorBaseApi.js",
	"./editorBaseApi.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/editorBaseApi.js",
	"./editorSimpleWorker": "../../node_modules/monaco-editor/esm/vs/editor/common/services/editorSimpleWorker.js",
	"./editorSimpleWorker.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/editorSimpleWorker.js",
	"./editorWorker": "../../node_modules/monaco-editor/esm/vs/editor/common/services/editorWorker.js",
	"./editorWorker.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/editorWorker.js",
	"./editorWorkerHost": "../../node_modules/monaco-editor/esm/vs/editor/common/services/editorWorkerHost.js",
	"./editorWorkerHost.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/editorWorkerHost.js",
	"./findSectionHeaders": "../../node_modules/monaco-editor/esm/vs/editor/common/services/findSectionHeaders.js",
	"./findSectionHeaders.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/findSectionHeaders.js",
	"./getIconClasses": "../../node_modules/monaco-editor/esm/vs/editor/common/services/getIconClasses.js",
	"./getIconClasses.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/getIconClasses.js",
	"./languageFeatureDebounce": "../../node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatureDebounce.js",
	"./languageFeatureDebounce.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatureDebounce.js",
	"./languageFeatures": "../../node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatures.js",
	"./languageFeatures.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatures.js",
	"./languageFeaturesService": "../../node_modules/monaco-editor/esm/vs/editor/common/services/languageFeaturesService.js",
	"./languageFeaturesService.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/languageFeaturesService.js",
	"./languageService": "../../node_modules/monaco-editor/esm/vs/editor/common/services/languageService.js",
	"./languageService.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/languageService.js",
	"./languagesAssociations": "../../node_modules/monaco-editor/esm/vs/editor/common/services/languagesAssociations.js",
	"./languagesAssociations.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/languagesAssociations.js",
	"./languagesRegistry": "../../node_modules/monaco-editor/esm/vs/editor/common/services/languagesRegistry.js",
	"./languagesRegistry.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/languagesRegistry.js",
	"./markerDecorations": "../../node_modules/monaco-editor/esm/vs/editor/common/services/markerDecorations.js",
	"./markerDecorations.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/markerDecorations.js",
	"./markerDecorationsService": "../../node_modules/monaco-editor/esm/vs/editor/common/services/markerDecorationsService.js",
	"./markerDecorationsService.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/markerDecorationsService.js",
	"./model": "../../node_modules/monaco-editor/esm/vs/editor/common/services/model.js",
	"./model.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/model.js",
	"./modelService": "../../node_modules/monaco-editor/esm/vs/editor/common/services/modelService.js",
	"./modelService.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/modelService.js",
	"./resolverService": "../../node_modules/monaco-editor/esm/vs/editor/common/services/resolverService.js",
	"./resolverService.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/resolverService.js",
	"./semanticTokensDto": "../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensDto.js",
	"./semanticTokensDto.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensDto.js",
	"./semanticTokensProviderStyling": "../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensProviderStyling.js",
	"./semanticTokensProviderStyling.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensProviderStyling.js",
	"./semanticTokensStyling": "../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensStyling.js",
	"./semanticTokensStyling.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensStyling.js",
	"./semanticTokensStylingService": "../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensStylingService.js",
	"./semanticTokensStylingService.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensStylingService.js",
	"./textModelSync/textModelSync.impl": "../../node_modules/monaco-editor/esm/vs/editor/common/services/textModelSync/textModelSync.impl.js",
	"./textModelSync/textModelSync.impl.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/textModelSync/textModelSync.impl.js",
	"./textModelSync/textModelSync.protocol": "../../node_modules/monaco-editor/esm/vs/editor/common/services/textModelSync/textModelSync.protocol.js",
	"./textModelSync/textModelSync.protocol.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/textModelSync/textModelSync.protocol.js",
	"./textResourceConfiguration": "../../node_modules/monaco-editor/esm/vs/editor/common/services/textResourceConfiguration.js",
	"./textResourceConfiguration.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/textResourceConfiguration.js",
	"./treeSitterParserService": "../../node_modules/monaco-editor/esm/vs/editor/common/services/treeSitterParserService.js",
	"./treeSitterParserService.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/treeSitterParserService.js",
	"./treeViewsDnd": "../../node_modules/monaco-editor/esm/vs/editor/common/services/treeViewsDnd.js",
	"./treeViewsDnd.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/treeViewsDnd.js",
	"./treeViewsDndService": "../../node_modules/monaco-editor/esm/vs/editor/common/services/treeViewsDndService.js",
	"./treeViewsDndService.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/treeViewsDndService.js",
	"./unicodeTextModelHighlighter": "../../node_modules/monaco-editor/esm/vs/editor/common/services/unicodeTextModelHighlighter.js",
	"./unicodeTextModelHighlighter.js": "../../node_modules/monaco-editor/esm/vs/editor/common/services/unicodeTextModelHighlighter.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../node_modules/monaco-editor/esm/vs/editor/common/services sync recursive ^.*$";

/***/ }),

/***/ "../../node_modules/redux-promise-middleware/dist/es/index.js":
/*!********************************************************************!*\
  !*** ../../node_modules/redux-promise-middleware/dist/es/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionType: () => (/* binding */ ActionType),
/* harmony export */   createPromise: () => (/* binding */ createPromise),
/* harmony export */   "default": () => (/* binding */ middleware)
/* harmony export */ });
/* harmony import */ var _isPromise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isPromise.js */ "../../node_modules/redux-promise-middleware/dist/es/isPromise.js");
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = void 0;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

var ActionType = {
  Pending: "PENDING",
  Fulfilled: "FULFILLED",
  Rejected: "REJECTED"
};
function createPromise() {
  var config = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var defaultTypes = [ActionType.Pending, ActionType.Fulfilled, ActionType.Rejected];
  var PROMISE_TYPE_SUFFIXES = config.promiseTypeSuffixes || defaultTypes;
  var PROMISE_TYPE_DELIMITER = config.promiseTypeDelimiter === void 0 ? "_" : config.promiseTypeDelimiter;
  return function(ref) {
    var dispatch = ref.dispatch;
    return function(next) {
      return function(action) {
        var promise;
        var data;
        if (action.payload) {
          var PAYLOAD = action.payload;
          if ((0,_isPromise_js__WEBPACK_IMPORTED_MODULE_0__["default"])(PAYLOAD)) {
            promise = PAYLOAD;
          } else if ((0,_isPromise_js__WEBPACK_IMPORTED_MODULE_0__["default"])(PAYLOAD.promise)) {
            promise = PAYLOAD.promise;
            data = PAYLOAD.data;
          } else if (typeof PAYLOAD === "function" || typeof PAYLOAD.promise === "function") {
            promise = PAYLOAD.promise ? PAYLOAD.promise() : PAYLOAD();
            data = PAYLOAD.promise ? PAYLOAD.data : void 0;
            if (!(0,_isPromise_js__WEBPACK_IMPORTED_MODULE_0__["default"])(promise)) {
              return next(_objectSpread({}, action, {
                payload: promise
              }));
            }
          } else {
            return next(action);
          }
        } else {
          return next(action);
        }
        var TYPE = action.type;
        var META = action.meta;
        var _PROMISE_TYPE_SUFFIXE = _slicedToArray(PROMISE_TYPE_SUFFIXES, 3), PENDING = _PROMISE_TYPE_SUFFIXE[0], FULFILLED = _PROMISE_TYPE_SUFFIXE[1], REJECTED = _PROMISE_TYPE_SUFFIXE[2];
        var getAction = function getAction2(newPayload, isRejected) {
          return _objectSpread({
            // Concatenate the type string property.
            type: [TYPE, isRejected ? REJECTED : FULFILLED].join(PROMISE_TYPE_DELIMITER)
          }, newPayload === null || typeof newPayload === "undefined" ? {} : {
            payload: newPayload
          }, {}, META !== void 0 ? {
            meta: META
          } : {}, {}, isRejected ? {
            error: true
          } : {});
        };
        var handleReject = function handleReject2(reason) {
          var rejectedAction = getAction(reason, true);
          dispatch(rejectedAction);
          throw reason;
        };
        var handleFulfill = function handleFulfill2() {
          var value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
          var resolvedAction = getAction(value, false);
          dispatch(resolvedAction);
          return {
            value,
            action: resolvedAction
          };
        };
        next(_objectSpread({
          // Concatenate the type string.
          type: [TYPE, PENDING].join(PROMISE_TYPE_DELIMITER)
        }, data !== void 0 ? {
          payload: data
        } : {}, {}, META !== void 0 ? {
          meta: META
        } : {}));
        return promise.then(handleFulfill, handleReject);
      };
    };
  };
}
function middleware() {
  var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, dispatch = _ref.dispatch;
  if (typeof dispatch === "function") {
    return createPromise()({
      dispatch
    });
  }
  if (process && process.env && "development" !== "production") {
    console.warn(`Redux Promise Middleware: As of version 6.0.0, the middleware library supports both preconfigured and custom configured middleware. To use a custom configuration, use the "createPromise" export and call this function with your configuration property. To use a preconfiguration, use the default export. For more help, check the upgrading guide: https://docs.psb.design/redux-promise-middleware/upgrade-guides/v6

For custom configuration:
import { createPromise } from 'redux-promise-middleware';
const promise = createPromise({ promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'] });
applyMiddleware(promise);

For preconfiguration:
import promise from 'redux-promise-middleware';
applyMiddleware(promise);
    `);
  }
  return null;
}


/***/ }),

/***/ "../../node_modules/redux-promise-middleware/dist/es/isPromise.js":
/*!************************************************************************!*\
  !*** ../../node_modules/redux-promise-middleware/dist/es/isPromise.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isPromise)
/* harmony export */ });
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function isPromise(value) {
  if (value !== null && _typeof(value) === "object") {
    return value && typeof value.then === "function";
  }
  return false;
}


/***/ }),

/***/ "../../node_modules/redux-thunk/dist/redux-thunk.mjs":
/*!***********************************************************!*\
  !*** ../../node_modules/redux-thunk/dist/redux-thunk.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   thunk: () => (/* binding */ thunk),
/* harmony export */   withExtraArgument: () => (/* binding */ withExtraArgument)
/* harmony export */ });
function createThunkMiddleware(extraArgument) {
  const middleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
  return middleware;
}
var thunk = createThunkMiddleware();
var withExtraArgument = createThunkMiddleware;



/***/ }),

/***/ "../components/frontend/ConfigEditor.tsx":
/*!***********************************************!*\
  !*** ../components/frontend/ConfigEditor.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConfigEditor)
/* harmony export */ });
/* harmony import */ var schemastery_react_lib_schemastery_react_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! schemastery-react/lib/schemastery-react.css */ "../../node_modules/schemastery-react/lib/schemastery-react.css");
/* harmony import */ var allotment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! allotment */ "../../node_modules/allotment/dist/modern.mjs");
/* harmony import */ var diff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! diff */ "../../node_modules/diff/libesm/diff/line.js");
/* harmony import */ var js_yaml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! js-yaml */ "../../node_modules/js-yaml/dist/js-yaml.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var schemastery_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! schemastery-react */ "../../node_modules/schemastery-react/lib/schemastery-react.esm.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./provider */ "../components/frontend/provider.tsx");







const locales = {
  zh: "zh-CN",
  en: "en-US"
};
function MonacoContainer({
  config,
  setValue,
  setError,
  monaco,
  schema,
  editorCallback,
  size,
  dark
}) {
  const [editor, setEditor] = react__WEBPACK_IMPORTED_MODULE_4___default().useState(null);
  const [model, setModel] = react__WEBPACK_IMPORTED_MODULE_4___default().useState(null);
  const [initialized, setInitialized] = react__WEBPACK_IMPORTED_MODULE_4___default().useState(false);
  const { codeFontFamily } = react__WEBPACK_IMPORTED_MODULE_4___default().useContext(_provider__WEBPACK_IMPORTED_MODULE_6__.ComponentsContext);
  react__WEBPACK_IMPORTED_MODULE_4___default().useEffect(() => {
    if (!monaco) return;
    const interval = setInterval(() => {
      monaco.editor.remeasureFonts();
    }, 1e3);
    return () => clearInterval(interval);
  }, [monaco]);
  react__WEBPACK_IMPORTED_MODULE_4___default().useEffect(() => {
    const listener = () => {
      if (!editor) return;
      editor.layout();
    };
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [editor]);
  react__WEBPACK_IMPORTED_MODULE_4___default().useEffect(() => {
    if (!editor) return;
    editor.layout();
  }, [size]);
  react__WEBPACK_IMPORTED_MODULE_4___default().useEffect(() => {
    if (!editor || !model) return;
    const decoration = editor.createDecorationsCollection();
    const updateDecoration = () => {
      const found = model.findMatches("'[hidden]'", true, false, true, "", true).map((i) => i.range);
      decoration.set(found.map((range) => ({ range, options: { inlineClassName: "decoration-hide" } })));
    };
    updateDecoration();
    const disposable = editor.onDidChangeModelContent(() => {
      const val = editor.getValue({ lineEnding: "\n", preserveBOM: false });
      updateDecoration();
      try {
        const loaded = js_yaml__WEBPACK_IMPORTED_MODULE_3__["default"].load(val);
        schema(loaded);
        setValue(val);
        setError("");
      } catch (err) {
        setError(err.message);
      }
    });
    return () => disposable.dispose();
  }, [editor, model, setValue, setError, schema]);
  const initializeEditor = react__WEBPACK_IMPORTED_MODULE_4___default().useCallback((element) => {
    if (!element || initialized) return;
    setInitialized(true);
    const model2 = monaco.editor.createModel(config, "yaml", monaco.Uri.parse("hydro://system/setting.yaml"));
    setModel(model2);
    const e = monaco.editor.create(element, {
      theme: dark ? "vs-dark" : "vs-light",
      lineNumbers: "off",
      glyphMargin: true,
      lightbulb: { enabled: monaco.editor.ShowLightbulbIconMode.On },
      model: model2,
      minimap: { enabled: false },
      hideCursorInOverviewRuler: true,
      overviewRulerLanes: 0,
      overviewRulerBorder: false,
      fontFamily: codeFontFamily,
      fontLigatures: "",
      unicodeHighlight: {
        ambiguousCharacters: true
      }
    });
    editorCallback(e, model2, element);
    setEditor(e);
  }, [config, monaco, editorCallback, codeFontFamily, initialized]);
  react__WEBPACK_IMPORTED_MODULE_4___default().useEffect(() => {
    if (!editor) return;
    const current = editor.getValue({ lineEnding: "\n", preserveBOM: false });
    const diff = (0,diff__WEBPACK_IMPORTED_MODULE_2__.diffLines)(current, config);
    const ops = [];
    let cursor = 1;
    for (const line of diff) {
      if (line.added) {
        let range = model.getFullModelRange();
        range = range.setStartPosition(cursor, 0);
        range = range.setEndPosition(cursor, 0);
        ops.push({ range, text: line.value });
      } else if (line.removed) {
        let range = model.getFullModelRange();
        range = range.setStartPosition(cursor, 0);
        cursor += line.count;
        range = range.setEndPosition(cursor, 0);
        ops.push({ range, text: "" });
      } else cursor += line.count;
    }
    model.pushEditOperations([], ops, void 0);
  }, [editor, config]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", { ref: initializeEditor, style: {
    width: "100%",
    height: "500px"
  } });
}
function ConfigEditor({
  schema,
  config,
  monaco,
  Markdown,
  onSave,
  registerAction,
  sidebar,
  dynamic
}) {
  const getValue = () => {
    try {
      return js_yaml__WEBPACK_IMPORTED_MODULE_3__["default"].load(config);
    } catch (e) {
      return {};
    }
  };
  const [value, setValue] = react__WEBPACK_IMPORTED_MODULE_4___default().useState(getValue);
  const [info, setInfo] = react__WEBPACK_IMPORTED_MODULE_4___default().useState("");
  const [stringConfig, setStringConfig] = react__WEBPACK_IMPORTED_MODULE_4___default().useState(config);
  const initial = react__WEBPACK_IMPORTED_MODULE_4___default().useMemo(getValue, []);
  const { i18n } = react__WEBPACK_IMPORTED_MODULE_4___default().useContext(_provider__WEBPACK_IMPORTED_MODULE_6__.ComponentsContext);
  const Form = react__WEBPACK_IMPORTED_MODULE_4___default().useMemo(() => (0,schemastery_react__WEBPACK_IMPORTED_MODULE_5__.createSchemasteryReact)({
    locale: locales[i18n("__id")] || "en-US",
    Markdown
  }), []);
  const updateFromForm = react__WEBPACK_IMPORTED_MODULE_4___default().useCallback((v) => {
    const newDump = js_yaml__WEBPACK_IMPORTED_MODULE_3__["default"].dump(v);
    if (newDump === stringConfig) return;
    setStringConfig(newDump);
    setValue(v);
  }, [stringConfig]);
  const updateFromMonaco = react__WEBPACK_IMPORTED_MODULE_4___default().useCallback((v) => {
    if (v === stringConfig) return;
    setStringConfig(v);
    setValue(js_yaml__WEBPACK_IMPORTED_MODULE_3__["default"].load(v));
  }, [stringConfig]);
  react__WEBPACK_IMPORTED_MODULE_4___default().useEffect(() => {
    setTimeout(() => {
      updateFromMonaco(`${stringConfig}

dummy: 1`);
      setTimeout(() => {
        setStringConfig(stringConfig);
        setValue(js_yaml__WEBPACK_IMPORTED_MODULE_3__["default"].load(stringConfig));
      }, 300);
    }, 300);
  }, []);
  const [size, setSize] = react__WEBPACK_IMPORTED_MODULE_4___default().useState([50, 50]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", { className: "fullscreen-content", style: { zIndex: 10 } }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement(allotment__WEBPACK_IMPORTED_MODULE_1__.Allotment, { onChange: setSize }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement(allotment__WEBPACK_IMPORTED_MODULE_1__.Allotment.Pane, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement(
    MonacoContainer,
    {
      editorCallback: registerAction,
      schema,
      monaco,
      config: stringConfig,
      setValue: updateFromMonaco,
      setError: setInfo,
      size: size[0],
      dark: document.documentElement.className.includes("theme--dark")
    }
  ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement("pre", { className: "help-text" }, info), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement("button", { onClick: () => onSave(stringConfig), className: "rounded primary button" }, i18n("Save All Changes"))), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement(allotment__WEBPACK_IMPORTED_MODULE_1__.Allotment.Pane, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", { style: {
    overflowY: "scroll",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    marginLeft: 10
  } }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Form, { schema, initial, value, onChange: updateFromForm, dynamic }))), sidebar && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement(allotment__WEBPACK_IMPORTED_MODULE_1__.Allotment.Pane, { maxSize: 220 }, sidebar)));
}


/***/ }),

/***/ "../components/frontend/Notification.tsx":
/*!***********************************************!*\
  !*** ../components/frontend/Notification.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Notification)
/* harmony export */ });
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-toastify */ "../../node_modules/react-toastify/dist/index.mjs");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

class Notification {
  constructor() {
    __publicField(this, "type");
    __publicField(this, "action");
    __publicField(this, "$dom");
    __publicField(this, "$n");
    __publicField(this, "duration");
    __publicField(this, "autoHideTimer");
  }
  static async success(message, duration) {
    return react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.success(message, { autoClose: duration });
  }
  static async info(message, duration) {
    return react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.info(message, { autoClose: duration });
  }
  static async warn(message, duration) {
    return react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.warning(message, { autoClose: duration });
  }
  static async error(message, duration) {
    return react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.error(message, { autoClose: duration });
  }
}


/***/ }),

/***/ "../components/frontend/index.ts":
/*!***************************************!*\
  !*** ../components/frontend/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutoComplete: () => (/* reexport safe */ _autocomplete_AutoComplete__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   ComponentsProvider: () => (/* reexport safe */ _provider__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   ConfigEditor: () => (/* reexport safe */ _ConfigEditor__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   CustomSelectAutoComplete: () => (/* reexport safe */ _autocomplete_CustomSelectAutoComplete__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   Icon: () => (/* reexport safe */ _Icon__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   Notification: () => (/* reexport safe */ _Notification__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./provider */ "../components/frontend/provider.tsx");
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigEditor */ "../components/frontend/ConfigEditor.tsx");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon */ "../components/frontend/Icon.tsx");
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Notification */ "../components/frontend/Notification.tsx");
/* harmony import */ var _autocomplete_AutoComplete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./autocomplete/AutoComplete */ "../components/frontend/autocomplete/AutoComplete.tsx");
/* harmony import */ var _autocomplete_CustomSelectAutoComplete__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./autocomplete/CustomSelectAutoComplete */ "../components/frontend/autocomplete/CustomSelectAutoComplete.tsx");








/***/ }),

/***/ "../components/frontend/provider.tsx":
/*!*******************************************!*\
  !*** ../components/frontend/provider.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentsContext: () => (/* binding */ ComponentsContext),
/* harmony export */   "default": () => (/* binding */ ComponentsProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "../../node_modules/react-toastify/dist/index.mjs");


const ComponentsContext = react__WEBPACK_IMPORTED_MODULE_0___default().createContext({
  i18n: (key) => key,
  theme: "light",
  codeFontFamily: "monospace"
});
function ComponentsProvider(props) {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ComponentsContext.Provider, { value: props }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
    react_toastify__WEBPACK_IMPORTED_MODULE_1__.ToastContainer,
    {
      position: "bottom-left",
      autoClose: 5e3,
      hideProgressBar: true,
      newestOnTop: false,
      closeOnClick: false,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "colored",
      transition: react_toastify__WEBPACK_IMPORTED_MODULE_1__.Slide
    }
  ), props.children);
}


/***/ }),

/***/ "./backendlib/markdown-it-imsize.ts":
/*!******************************************!*\
  !*** ./backendlib/markdown-it-imsize.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ plugin)
/* harmony export */ });
function parseNextNumber(str, pos, max) {
  const start = pos;
  const result = {
    ok: false,
    pos,
    value: ""
  };
  let code = str.charCodeAt(pos);
  while (pos < max && (code >= 48 && code <= 57) || code === 37) {
    code = str.charCodeAt(++pos);
  }
  result.ok = true;
  result.pos = pos;
  result.value = str.slice(start, pos);
  return result;
}
function parseImageSize(str, pos, max) {
  const result = {
    ok: false,
    pos: 0,
    width: "",
    height: ""
  };
  if (pos >= max) {
    return result;
  }
  let code = str.charCodeAt(pos);
  if (code !== 61) {
    return result;
  }
  pos++;
  code = str.charCodeAt(pos);
  if (code !== 120 && (code < 48 || code > 57)) {
    return result;
  }
  const resultW = parseNextNumber(str, pos, max);
  pos = resultW.pos;
  code = str.charCodeAt(pos);
  if (code !== 120) {
    return result;
  }
  pos++;
  const resultH = parseNextNumber(str, pos, max);
  pos = resultH.pos;
  result.width = resultW.value;
  result.height = resultH.value;
  result.pos = pos;
  result.ok = true;
  return result;
}
function plugin(md) {
  md.inline.ruler.before("emphasis", "image", (state, silent) => {
    let attrs;
    let code;
    let label;
    let pos;
    let ref;
    let res;
    let title;
    let width = "";
    let height = "";
    let token;
    let tokens;
    let start;
    let href = "";
    const oldPos = state.pos;
    const max = state.posMax;
    if (state.src.charCodeAt(state.pos) !== 33) {
      return false;
    }
    if (state.src.charCodeAt(state.pos + 1) !== 91) {
      return false;
    }
    const labelStart = state.pos + 2;
    const labelEnd = md.helpers.parseLinkLabel(state, state.pos + 1, false);
    if (labelEnd < 0) {
      return false;
    }
    pos = labelEnd + 1;
    if (pos < max && state.src.charCodeAt(pos) === 40) {
      pos++;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 32 && code !== 10) {
          break;
        }
      }
      if (pos >= max) {
        return false;
      }
      start = pos;
      res = md.helpers.parseLinkDestination(state.src, pos, state.posMax);
      if (res.ok) {
        href = state.md.normalizeLink(res.str);
        if (state.md.validateLink(href)) {
          pos = res.pos;
        } else {
          href = "";
        }
      }
      start = pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 32 && code !== 10) {
          break;
        }
      }
      res = md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (code !== 32 && code !== 10) {
            break;
          }
        }
      } else {
        title = "";
      }
      if (pos - 1 >= 0) {
        code = state.src.charCodeAt(pos - 1);
        if (code === 32) {
          res = parseImageSize(state.src, pos, state.posMax);
          if (res.ok) {
            width = res.width;
            height = res.height;
            pos = res.pos;
            for (; pos < max; pos++) {
              code = state.src.charCodeAt(pos);
              if (code !== 32 && code !== 10) {
                break;
              }
            }
          }
        }
      }
      if (pos >= max || state.src.charCodeAt(pos) !== 41) {
        state.pos = oldPos;
        return false;
      }
      pos++;
    } else {
      if (typeof state.env.references === "undefined") {
        return false;
      }
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 32 && code !== 10) {
          break;
        }
      }
      if (pos < max && state.src.charCodeAt(pos) === 91) {
        start = pos + 1;
        pos = md.helpers.parseLinkLabel(state, pos);
        if (pos >= 0) {
          label = state.src.slice(start, pos++);
        } else {
          pos = labelEnd + 1;
        }
      } else {
        pos = labelEnd + 1;
      }
      label || (label = state.src.slice(labelStart, labelEnd));
      ref = state.env.references[md.utils.normalizeReference(label)];
      if (!ref) {
        state.pos = oldPos;
        return false;
      }
      href = ref.href;
      title = ref.title;
    }
    if (!silent) {
      state.pos = labelStart;
      state.posMax = labelEnd;
      const newState = new state.md.inline.State(
        state.src.slice(labelStart, labelEnd),
        state.md,
        state.env,
        tokens = []
      );
      newState.md.inline.tokenize(newState);
      token = state.push("image", "img", 0);
      token.attrs = attrs = [
        ["src", href],
        ["alt", ""]
      ];
      token.children = tokens;
      if (title) {
        attrs.push(["title", title]);
      }
      if (width !== "") {
        attrs.push(["width", width]);
      }
      if (height !== "") {
        attrs.push(["height", height]);
      }
    }
    state.pos = pos;
    state.posMax = max;
    return true;
  });
}


/***/ }),

/***/ "./backendlib/markdown-it-katex.ts":
/*!*****************************************!*\
  !*** ./backendlib/markdown-it-katex.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ plugin)
/* harmony export */ });
/* harmony import */ var katex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! katex */ "../../node_modules/katex/dist/katex.mjs");

function isValidDelim(state, pos) {
  const max = state.posMax;
  const prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
  const nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1;
  let canOpen = true;
  let canClose = true;
  if (prevChar === 9 || /* \t */
  nextChar >= 48 && nextChar <= 57) canClose = false;
  if (nextChar === 9) canOpen = false;
  return {
    canOpen,
    canClose
  };
}
function inline(state, silent) {
  let pos;
  if (state.src[state.pos] !== "$") return false;
  let res = isValidDelim(state, state.pos);
  if (!res.canOpen) {
    if (!silent) state.pending += "$";
    state.pos += 1;
    return true;
  }
  const start = state.pos + 1;
  let match = start;
  while ((match = state.src.indexOf("$", match)) !== -1) {
    pos = match - 1;
    while (state.src[pos] === "\\") pos -= 1;
    if ((match - pos) % 2) break;
    match += 1;
  }
  if (match === -1) {
    if (!silent) state.pending += "$";
    state.pos = start;
    return true;
  }
  if (match - start === 0) {
    if (!silent) state.pending += "$$";
    state.pos = start + 1;
    return true;
  }
  res = isValidDelim(state, match);
  if (!res.canClose) {
    if (!silent) state.pending += "$";
    state.pos = start;
    return true;
  }
  if (!silent) {
    const token = state.push("math_inline", "math", 0);
    token.markup = "$";
    token.content = state.src.slice(start, match);
  }
  state.pos = match + 1;
  return true;
}
function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function block(state, start, end, silent) {
  let lastLine;
  let lastPos;
  let found = false;
  let pos = state.bMarks[start] + state.tShift[start];
  let max = state.eMarks[start];
  if (pos + 2 > max) return false;
  if (state.src.slice(pos, pos + 2) !== "$$") return false;
  pos += 2;
  let firstLine = state.src.slice(pos, max);
  if (silent) return true;
  if (firstLine.trim().slice(-2) === "$$") {
    firstLine = firstLine.trim().slice(0, -2);
    found = true;
  }
  let next = start;
  while (!found) {
    next++;
    if (next >= end) break;
    pos = state.bMarks[next] + state.tShift[next];
    max = state.eMarks[next];
    if (pos < max && state.tShift[next] < state.blkIndent) break;
    if (state.src.slice(pos, max).trim().slice(-2) === "$$") {
      lastPos = state.src.slice(0, max).lastIndexOf("$$");
      lastLine = state.src.slice(pos, lastPos);
      found = true;
    }
  }
  state.line = next + 1;
  const token = state.push("math_block", "math", 0);
  token.block = true;
  token.content = (firstLine && firstLine.trim() ? `${firstLine}
` : "") + state.getLines(start + 1, next, state.tShift[start], true) + (lastLine && lastLine.trim() ? lastLine : "");
  token.map = [start, state.line];
  token.markup = "$$";
  return true;
}
function plugin(md) {
  const options = { throwOnError: false, strict: "ignore", displayMode: false };
  const render = (latex, displayMode = false) => {
    options.displayMode = displayMode;
    try {
      latex = latex.replace(/\\def{\\([a-zA-Z0-9]+)}/g, "\\def\\$1");
      return katex__WEBPACK_IMPORTED_MODULE_0__["default"].renderToString(latex, options);
    } catch (error) {
      if (options.throwOnError) console.error(error);
      return `<p class='${displayMode ? "katex-block " : ""}katex-error' title='${escapeHtml(error.toString())}'>${escapeHtml(latex)}</p>`;
    }
  };
  const inlineRenderer = function(tokens, idx) {
    if (tokens[idx].content.length > 50) return `$${tokens[idx].content}$`;
    return render(tokens[idx].content);
  };
  const blockRenderer = function(tokens, idx) {
    if (tokens[idx].content.length > 50) return `$$${tokens[idx].content}$$`;
    return `${render(tokens[idx].content, true)}
`;
  };
  md.inline.ruler.after("escape", "math_inline", inline);
  md.block.ruler.after("blockquote", "math_block", block, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });
  md.renderer.rules.math_inline = inlineRenderer;
  md.renderer.rules.math_block = blockRenderer;
}


/***/ }),

/***/ "./backendlib/markdown-it-media.ts":
/*!*****************************************!*\
  !*** ./backendlib/markdown-it-media.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Media: () => (/* binding */ Media)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/v4.js");

const allowFullScreen = " webkitallowfullscreen mozallowfullscreen allowfullscreen";
const ytRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
function youtubeParser(url) {
  const match = url.match(ytRegex);
  return match && match[7].length === 11 ? match[7] : url;
}
const vimeoRegex = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
function vimeoParser(url) {
  const match = url.match(vimeoRegex);
  return match && typeof match[3] === "string" ? match[3] : url;
}
const vineRegex = /^http(?:s?):\/\/(?:www\.)?vine\.co\/v\/([a-zA-Z0-9]{1,13}).*/;
function vineParser(url) {
  const match = url.match(vineRegex);
  return match && match[1].length === 11 ? match[1] : url;
}
const preziRegex = /^https:\/\/prezi.com\/(.[^/]+)/;
function preziParser(url) {
  const match = url.match(preziRegex);
  return match ? match[1] : url;
}
const EMBED_REGEX = /@\[([a-zA-Z].+?)]\((.*?)[)]/im;
function extractVideoParameters(url) {
  const parameterMap = /* @__PURE__ */ new Map();
  const params = url.replace(/&amp;/gi, "&").split(/[#?&]/);
  if (params.length > 1) {
    for (let i = 1; i < params.length; i += 1) {
      const keyValue = params[i].split("=");
      if (keyValue.length > 1) parameterMap.set(keyValue[0], keyValue[1]);
    }
  }
  return parameterMap;
}
function resourceUrl(service, src, url) {
  if (service === "youtube") {
    const parameters = extractVideoParameters(url);
    const timeParameter = parameters.get("t");
    if (timeParameter !== void 0) {
      let startTime = 0;
      const timeParts = timeParameter.match(/[0-9]+/g);
      let j = 0;
      while (timeParts.length > 0) {
        startTime += Number(timeParts.pop()) * 60 ** j;
        j += 1;
      }
      parameters.set("start", startTime);
      parameters.delete("t");
    }
    parameters.delete("v");
    parameters.delete("feature");
    parameters.delete("origin");
    const parameterArray = Array.from(parameters, (p) => p.join("="));
    const parameterPos = src.indexOf("?");
    let finalUrl = `https://www.youtube.com/embed/${parameterPos > -1 ? src.substring(0, parameterPos) : src}`;
    if (parameterArray.length > 0) finalUrl += `?${parameterArray.join("&")}`;
    return finalUrl;
  }
  if (service === "bilibili") {
    if (src.startsWith("http")) src = src.split("/").pop();
    if (src.toLowerCase().startsWith("av")) src = src.toLowerCase().split("av")[1];
    src = src.split("?")[0];
    return `//player.bilibili.com/player.html?${src.startsWith("BV") ? "bvid" : "aid"}=${src}&autoplay=0`;
  }
  if (service === "msoffice") return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(src)}`;
  if (service === "youku") return `https://player.youku.com/embed/${src}`;
  if (service === "vimeo") return `https://player.vimeo.com/video/${src}`;
  if (service === "vine") return `https://vine.co/v/${src}/embed/simple`;
  if (service === "prezi") {
    return `https://prezi.com/embed/${src}/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0&amp;landing_data=bHVZZmNaNDBIWnNjdEVENDRhZDFNZGNIUE43MHdLNWpsdFJLb2ZHanI5N1lQVHkxSHFxazZ0UUNCRHloSXZROHh3PT0&amp;landing_sign=1kD6c0N6aYpMUS0wxnQjxzSqZlEB8qNFdxtdjYhwSuI`;
  }
  return src;
}
function Media(md) {
  const supported = ["youtube", "vimeo", "vine", "prezi", "bilibili", "youku", "msoffice"];
  md.renderer.rules.video = function tokenizeReturn(tokens, idx) {
    var _a, _b, _c;
    let src = md.utils.escapeHtml(tokens[idx].attrGet("src"));
    const service = md.utils.escapeHtml(tokens[idx].attrGet("service")).toLowerCase();
    if ((_b = (_a = Hydro == null ? void 0 : Hydro.module) == null ? void 0 : _a.richmedia) == null ? void 0 : _b[service]) {
      const result = (_c = Hydro == null ? void 0 : Hydro.module) == null ? void 0 : _c.richmedia[service].get(service, src, md);
      if (result) return result;
    }
    if (service === "pdf") {
      if (src.startsWith("file://") || src.startsWith("./")) src += src.includes("?") ? "&noDisposition=1" : "?noDisposition=1";
      return `        <object classid="clsid:${(0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])().toUpperCase()}">
          <param name="SRC" value="${src}" >
          <embed width="100%" style="min-height: 100vh;border: none;" fullscreen="yes" src="${src}">
            <noembed></noembed>
          </embed>
        </object>`;
    }
    if (["url", "video"].includes(service)) {
      return `        <video width="100%" controls>
          <source src="${src}" type="${src.endsWith("ogg") ? "video/ogg" : "video/mp4"}">
          Your browser doesn't support video tag.
        </video>`;
    }
    if (supported.includes(service)) {
      return `      <iframe class="embed-responsive-item ${service}-player" type="text/html"         width="100%" style="min-height: 500px" ${allowFullScreen}         src="${resourceUrl(service, src, tokens[idx].attrGet("url"))}"
        scrolling="no" border="0" frameborder="no" framespacing="0"></iframe>`;
    }
    return `<div data-${service}>${md.utils.escapeHtml(src)}</div>`;
  };
  md.inline.ruler.before("emphasis", "video", (state, silent) => {
    const theState = state;
    const oldPos = state.pos;
    if (state.src.charCodeAt(oldPos) !== 64 || /* @ */
    state.src.charCodeAt(oldPos + 1) !== 91) {
      return false;
    }
    const match = EMBED_REGEX.exec(state.src.slice(state.pos, state.src.length));
    if (!match || match.length < 3) return false;
    let [, service, src] = match;
    service = service.toLowerCase();
    if (service === "youtube") src = youtubeParser(src);
    else if (service === "vimeo") src = vimeoParser(src);
    else if (service === "vine") src = vineParser(src);
    else if (service === "prezi") src = preziParser(src);
    if (src === ")") src = "";
    const serviceStart = oldPos + 2;
    if (!silent) {
      theState.pos = serviceStart;
      const newState = new theState.md.inline.State(service, theState.md, theState.env, []);
      newState.md.inline.tokenize(newState);
      const token = theState.push("video", "", void 0);
      token.attrPush(["src", src]);
      token.attrPush(["service", service]);
      token.attrPush(["url", match[2]]);
      token.level = theState.level;
    }
    theState.pos += theState.src.indexOf(")", theState.pos);
    return true;
  });
}


/***/ }),

/***/ "./backendlib/markdown-it-xss.ts":
/*!***************************************!*\
  !*** ./backendlib/markdown-it-xss.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   xssProtector: () => (/* binding */ xssProtector)
/* harmony export */ });
/* unused harmony exports xss, xssInline, ensureTag */
/* harmony import */ var cssfilter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cssfilter */ "../../node_modules/cssfilter/lib/index.js");
/* harmony import */ var cssfilter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cssfilter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var xss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xss */ "../../node_modules/xss/lib/index.js");
/* harmony import */ var xss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(xss__WEBPACK_IMPORTED_MODULE_1__);


const stack = [];
const voidTags = ["br", "hr", "input", "img", "link", "source", "col", "area", "base", "meta", "embed", "param", "track", "wbr"];
const depedentTags = {
  li: ["ul", "ol"],
  tr: ["table"],
  td: ["tr"],
  th: ["tr"],
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  colgroup: ["table"],
  col: ["colgroup"],
  caption: ["table"],
  option: ["select"],
  optgroup: ["select"],
  dt: ["dl"],
  dd: ["dl"]
};
const whitelistClasses = ["row", "columns", "typo", "note", "warn"].concat(new Array(12).fill(0).map((_, i) => `medium-${i + 1}`));
const tagCheck = new xss__WEBPACK_IMPORTED_MODULE_1__.FilterXSS({
  css: false,
  whiteList: {},
  onIgnoreTag(tag, html, options) {
    if (html.endsWith("/>") || voidTags.includes(tag)) return html;
    if (!options.isClosing) {
      if (depedentTags[tag] && !stack.find((i) => depedentTags[tag].includes(i))) {
        return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      stack.push(tag);
      return html;
    }
    if (stack.length === 0) {
      return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    if (stack[stack.length - 1] === tag) {
      stack.pop();
      return html;
    }
    if (stack.length - 2 >= 0 && stack[stack.length - 2] === tag) {
      html = `</${stack[stack.length - 1]}>${html}`;
      stack.pop();
      stack.pop();
      return html;
    }
    return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  },
  onIgnoreTagAttr(tag, name, value) {
    return value;
  }
});
const cssFilterOptions = {
  whiteList: {
    "font-size": true,
    "font-family": true,
    "text-align": true,
    "text-indent": true,
    "margin-left": true,
    position: /relative/,
    padding: true,
    height: true,
    width: true,
    color: true
  }
};
const CssFilter = new cssfilter__WEBPACK_IMPORTED_MODULE_0__.FilterCSS(cssFilterOptions);
const commonRules = {
  whiteList: {
    a: ["target", "href", "title"],
    abbr: ["title"],
    address: [],
    aside: [],
    b: [],
    bdi: ["dir"],
    bdo: ["dir"],
    big: [],
    blockquote: ["cite", "class"],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: ["class"],
    del: ["datetime"],
    div: ["id", "class"],
    dl: [],
    em: [],
    font: ["color", "size", "face"],
    header: [],
    i: [],
    ins: ["datetime"],
    mark: [],
    ol: [],
    p: ["align", "style"],
    pre: [],
    s: [],
    small: [],
    span: ["class", "style"],
    sub: [],
    sup: [],
    strong: ["id"],
    tt: [],
    u: [],
    var: []
  },
  css: false,
  allowCommentTag: false,
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "semantics"]
};
const xss = new xss__WEBPACK_IMPORTED_MODULE_1__.FilterXSS({
  ...commonRules,
  whiteList: {
    ...commonRules.whiteList,
    area: ["shape", "coords", "href", "alt"],
    article: [],
    audio: ["controls", "loop", "preload", "src"],
    col: ["align", "valign", "span", "width"],
    colgroup: ["align", "valign", "span", "width"],
    dd: [],
    details: ["open"],
    dt: [],
    h1: ["id"],
    h2: ["id", "class"],
    h3: ["id"],
    h4: ["id"],
    h5: ["id"],
    h6: ["id"],
    hr: [],
    img: ["src", "alt", "title", "width", "height"],
    li: [],
    section: [],
    summary: [],
    table: ["width", "border", "align", "valign"],
    tbody: ["align", "valign"],
    td: ["width", "rowspan", "colspan", "align", "valign", "bgcolor"],
    tfoot: ["align", "valign"],
    th: ["width", "rowspan", "colspan", "align", "valign"],
    thead: ["align", "valign"],
    tr: ["rowspan", "align", "valign"],
    ul: [],
    video: ["controls", "loop", "preload", "src", "height", "width"]
  },
  css: cssFilterOptions,
  safeAttrValue(tag, name, value) {
    if (name === "id") return (0,xss__WEBPACK_IMPORTED_MODULE_1__.escapeAttrValue)(`xss-id-${value}`);
    if (name === "class") return value.split(" ").filter((i) => whitelistClasses.includes(i) || i.startsWith("language-")).join(" ");
    return (0,xss__WEBPACK_IMPORTED_MODULE_1__.safeAttrValue)(tag, name, value, CssFilter);
  }
});
const inlineCssFilter = new cssfilter__WEBPACK_IMPORTED_MODULE_0__.FilterCSS({
  whiteList: {
    color: true
  }
});
const xssInline = new xss__WEBPACK_IMPORTED_MODULE_1__.FilterXSS({
  ...commonRules,
  safeAttrValue(tag, name, value) {
    if (name === "id") return (0,xss__WEBPACK_IMPORTED_MODULE_1__.escapeAttrValue)(`xss-id-${value}`);
    if (name === "class") return value.split(" ").filter((i) => whitelistClasses.includes(i)).join(" ");
    return (0,xss__WEBPACK_IMPORTED_MODULE_1__.safeAttrValue)(tag, name, value, inlineCssFilter);
  }
});
function ensureTag(html) {
  stack.length = 0;
  const res = tagCheck.process(html);
  return res + stack.map((i) => `</${i}>`).join("");
}
function xssProtector(md) {
  function protector(state) {
    const processor = state.inlineMode ? xssInline : xss;
    for (let i = 0; i < state.tokens.length; i++) {
      const cur = state.tokens[i];
      if (cur.type === "html_block") {
        cur.content = processor.process(cur.content);
      }
      if (cur.type === "inline") {
        const inlineTokens = cur.children;
        for (let ii = 0; ii < inlineTokens.length; ii++) {
          if (inlineTokens[ii].type === "html_inline") {
            inlineTokens[ii].content = processor.process(inlineTokens[ii].content);
          }
        }
      }
    }
  }
  md.core.ruler.after("linkify", "xss", protector);
}


/***/ }),

/***/ "./components/editor/mdeditor.ts":
/*!***************************************!*\
  !*** ./components/editor/mdeditor.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MdEditor: () => (/* reexport safe */ md_editor_rt__WEBPACK_IMPORTED_MODULE_6__.E)
/* harmony export */ });
/* harmony import */ var md_editor_rt_lib_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! md-editor-rt/lib/style.css */ "../../node_modules/md-editor-rt/lib/style.css");
/* harmony import */ var markdown_it_anchor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! markdown-it-anchor */ "../../node_modules/markdown-it-anchor/dist/markdownItAnchor.mjs");
/* harmony import */ var markdown_it_footnote__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! markdown-it-footnote */ "../../node_modules/markdown-it-footnote/index.mjs");
/* harmony import */ var markdown_it_mark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! markdown-it-mark */ "../../node_modules/markdown-it-mark/index.mjs");
/* harmony import */ var markdown_it_merge_cells__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! markdown-it-merge-cells */ "../../node_modules/markdown-it-merge-cells/src/index.js");
/* harmony import */ var markdown_it_merge_cells__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(markdown_it_merge_cells__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var markdown_it_table_of_contents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! markdown-it-table-of-contents */ "../../node_modules/markdown-it-table-of-contents/index.js");
/* harmony import */ var markdown_it_table_of_contents__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(markdown_it_table_of_contents__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var md_editor_rt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! md-editor-rt */ "../../node_modules/md-editor-rt/lib/es/chunks/Editor.mjs");
/* harmony import */ var md_editor_rt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! md-editor-rt */ "../../node_modules/md-editor-rt/lib/es/chunks/config.mjs");
/* harmony import */ var _backendlib_markdown_it_imsize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../backendlib/markdown-it-imsize */ "./backendlib/markdown-it-imsize.ts");
/* harmony import */ var _backendlib_markdown_it_katex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../backendlib/markdown-it-katex */ "./backendlib/markdown-it-katex.ts");
/* harmony import */ var _backendlib_markdown_it_media__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../backendlib/markdown-it-media */ "./backendlib/markdown-it-media.ts");
/* harmony import */ var _backendlib_markdown_it_xss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../backendlib/markdown-it-xss */ "./backendlib/markdown-it-xss.ts");











const pagename = document.documentElement.getAttribute("data-page");
const isProblemPage = ["problem_create", "problem_edit"].includes(pagename);
(0,md_editor_rt__WEBPACK_IMPORTED_MODULE_7__.c)({
  markdownItConfig(mdit) {
    mdit.options.html = true;
    mdit.options.linkify = true;
    mdit.linkify.tlds(".py", false);
    mdit.linkify.tlds(".zip", false);
    mdit.linkify.tlds(".mov", false);
    mdit.use(_backendlib_markdown_it_media__WEBPACK_IMPORTED_MODULE_10__.Media);
    mdit.use(markdown_it_footnote__WEBPACK_IMPORTED_MODULE_2__["default"]);
    mdit.use(markdown_it_mark__WEBPACK_IMPORTED_MODULE_3__["default"]);
    mdit.use(_backendlib_markdown_it_imsize__WEBPACK_IMPORTED_MODULE_8__["default"]);
    mdit.use(markdown_it_anchor__WEBPACK_IMPORTED_MODULE_1__["default"]);
    mdit.use((markdown_it_table_of_contents__WEBPACK_IMPORTED_MODULE_5___default()));
    mdit.use((markdown_it_merge_cells__WEBPACK_IMPORTED_MODULE_4___default()));
    mdit.use(_backendlib_markdown_it_xss__WEBPACK_IMPORTED_MODULE_11__.xssProtector);
    mdit.use(_backendlib_markdown_it_katex__WEBPACK_IMPORTED_MODULE_9__["default"]);
    if (isProblemPage) {
      mdit.core.ruler.before("normalize", "xss", (state) => {
        state.src = state.src.replace(/file:\/\//g, pagename === "problem_create" ? `/file/${UserContext._id}/` : "./file/");
      });
    }
  },
  markdownItPlugins(plugins) {
    console.log("Active builtin mdit plugins", plugins);
    return plugins.filter((plugin) => ["sub", "sup"].includes(plugin.type));
  }
});



/***/ }),

/***/ "./components/messagepad/DialogueListItemComponent.jsx":
/*!*************************************************************!*\
  !*** ./components/messagepad/DialogueListItemComponent.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DialogueListItemComponent)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");


function DialogueListItemComponent(props) {
  const {
    userName,
    summary,
    faceUrl,
    active,
    onClick,
    className,
    ...rest
  } = props;
  const cn = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, "messagepad__list-item media", {
    active
  });
  return /* @__PURE__ */ React.createElement("li", { ...rest }, /* @__PURE__ */ React.createElement("a", { className: cn, onClick }, /* @__PURE__ */ React.createElement("div", { className: "media__left middle" }, /* @__PURE__ */ React.createElement("img", { src: faceUrl, alt: "avatar", width: "50", height: "50", className: "medium user-profile-avatar" })), /* @__PURE__ */ React.createElement("div", { className: "media__body middle" }, /* @__PURE__ */ React.createElement("h3", { className: "messagepad__username" }, userName), /* @__PURE__ */ React.createElement("div", { className: "messagepad__desc" }, summary))));
}
DialogueListItemComponent.propTypes = {
  userName: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  summary: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  faceUrl: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  active: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};


/***/ }),

/***/ "./components/messagepad/MessageComponent.jsx":
/*!****************************************************!*\
  !*** ./components/messagepad/MessageComponent.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MessageComponent)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");


function MessageComponent(props) {
  const {
    faceUrl,
    isSelf,
    className,
    children,
    ...rest
  } = props;
  const cn = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, "messagepad__message", {
    "side--self": isSelf,
    "side--other": !isSelf
  });
  return /* @__PURE__ */ React.createElement("li", { ...rest, className: cn }, /* @__PURE__ */ React.createElement("div", { className: "messagepad__message__avatar" }, /* @__PURE__ */ React.createElement("img", { src: faceUrl, alt: "avatar", width: "50", height: "50", className: "medium user-profile-avatar" })), /* @__PURE__ */ React.createElement("div", { className: "messagepad__message__body" }, children));
}
MessageComponent.propTypes = {
  isSelf: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  faceUrl: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node)
};


/***/ }),

/***/ "./components/messagepad/MessagePadDialogueContentContainer.jsx":
/*!**********************************************************************!*\
  !*** ./components/messagepad/MessagePadDialogueContentContainer.jsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery_scroll_lock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery-scroll-lock */ "../../node_modules/jquery-scroll-lock/jquery-scrollLock.js");
/* harmony import */ var jquery_scroll_lock__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery_scroll_lock__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery_easing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery.easing */ "../../node_modules/jquery.easing/jquery.easing.js");
/* harmony import */ var jquery_easing__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_easing__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "../../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var timeago_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! timeago-react */ "../../node_modules/timeago-react/esm/timeago-react.js");
/* harmony import */ var vj_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vj/utils */ "./utils/index.ts");
/* harmony import */ var _MessageComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MessageComponent */ "./components/messagepad/MessageComponent.jsx");









const mapStateToProps = (state) => ({
  activeId: state.activeId,
  item: state.activeId !== null ? state.dialogues[state.activeId] : null
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_5__.connect)(mapStateToProps)(class MessagePadDialogueContentContainer extends (react__WEBPACK_IMPORTED_MODULE_4___default().PureComponent) {
  componentDidMount() {
    jquery__WEBPACK_IMPORTED_MODULE_2___default()(this.refs.list).scrollLock({ strict: true });
  }
  componentDidUpdate(prevProps) {
    const node = this.refs.list;
    if (this.props.activeId !== prevProps.activeId) {
      this.scrollToBottom = true;
      this.scrollWithAnimation = false;
    } else if (node.scrollTop + node.offsetHeight === node.scrollHeight) {
      this.scrollToBottom = true;
      this.scrollWithAnimation = true;
    } else this.scrollToBottom = false;
    if (this.scrollToBottom) {
      const targetScrollTop = node.scrollHeight - node.offsetHeight;
      if (this.scrollWithAnimation) {
        jquery__WEBPACK_IMPORTED_MODULE_2___default()(node).stop().animate({ scrollTop: targetScrollTop }, 200, "easeOutCubic");
      } else {
        node.scrollTop = targetScrollTop;
      }
    }
  }
  renderContent(msg) {
    if (msg.from === 1) {
      try {
        const data = JSON.parse(msg.content);
        const str = (0,vj_utils__WEBPACK_IMPORTED_MODULE_7__.i18n)(data.message).replace(/\{([^{}]+)\}/g, (match, key) => `%placeholder%${key}%placeholder%`);
        const arr = str.split("%placeholder%");
        data.params || (data.params = {});
        for (let i = 1; i < arr.length; i += 2) {
          if (arr[i].endsWith(":link")) {
            const link = data.params[arr[i].split(":link")[0]];
            if (!link) continue;
            arr[i] = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement("a", { style: { color: "wheat" }, href: link, key: i, target: "_blank", rel: "noreferrer" }, link);
          } else {
            arr[i] = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement("span", { style: { color: "wheat" }, key: i }, data.params[arr[i]]);
          }
        }
        return arr;
      } catch (e) {
      }
      return (0,vj_utils__WEBPACK_IMPORTED_MODULE_7__.i18n)(msg.content);
    }
    return msg.content;
  }
  renderInner() {
    if (this.props.activeId === null) return [];
    const sorted = this.props.item.messages.sort((msg1, msg2) => (0,vj_utils__WEBPACK_IMPORTED_MODULE_7__.mongoId)(msg1._id).timestamp - (0,vj_utils__WEBPACK_IMPORTED_MODULE_7__.mongoId)(msg2._id).timestamp);
    return sorted.map((msg) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement(
      _MessageComponent__WEBPACK_IMPORTED_MODULE_8__["default"],
      {
        key: msg._id,
        isSelf: msg.from === UserContext._id,
        faceUrl: msg.from === UserContext._id ? UserContext.avatarUrl : this.props.item.udoc.avatarUrl
      },
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, this.renderContent(msg)),
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement("time", { "data-tooltip": moment__WEBPACK_IMPORTED_MODULE_3___default()((0,vj_utils__WEBPACK_IMPORTED_MODULE_7__.mongoId)(msg._id).timestamp * 1e3).format("YYYY-MM-DD HH:mm:ss") }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement(timeago_react__WEBPACK_IMPORTED_MODULE_6__["default"], { datetime: (0,vj_utils__WEBPACK_IMPORTED_MODULE_7__.mongoId)(msg._id).timestamp * 1e3, locale: (0,vj_utils__WEBPACK_IMPORTED_MODULE_7__.i18n)("timeago_locale") }))
    ));
  }
  render() {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react__WEBPACK_IMPORTED_MODULE_4___default().Fragment), null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", { className: "messagepad__header" }, this.props.item && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement("a", { className: "messagepad__content__header__title", href: `/user/${this.props.item.udoc._id}` }, `${this.props.item.udoc.uname}(UID: ${this.props.item.udoc._id})`)), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_4___default().createElement("ol", { className: "messagepad__content", ref: "list" }, this.renderInner()));
  }
}));


/***/ }),

/***/ "./components/messagepad/MessagePadDialogueListContainer.jsx":
/*!*******************************************************************!*\
  !*** ./components/messagepad/MessagePadDialogueListContainer.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery_scroll_lock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery-scroll-lock */ "../../node_modules/jquery-scroll-lock/jquery-scrollLock.js");
/* harmony import */ var jquery_scroll_lock__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery_scroll_lock__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var vj_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vj/utils */ "./utils/index.ts");
/* harmony import */ var _DialogueListItemComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DialogueListItemComponent */ "./components/messagepad/DialogueListItemComponent.jsx");







const mapStateToProps = (state) => ({
  activeId: state.activeId,
  dialogues: state.dialogues
});
const mapDispatchToProps = (dispatch) => ({
  handleClick(id) {
    dispatch({
      type: "DIALOGUES_SWITCH_TO",
      payload: id
    });
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_4__.connect)(mapStateToProps, mapDispatchToProps)(class MessagePadDialogueListContainer extends (react__WEBPACK_IMPORTED_MODULE_3___default().PureComponent) {
  componentDidMount() {
    jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.refs.list).scrollLock({ strict: true });
  }
  render() {
    const orderedDialogues = lodash__WEBPACK_IMPORTED_MODULE_2___default().orderBy(
      lodash__WEBPACK_IMPORTED_MODULE_2___default().values(this.props.dialogues),
      (dialogue) => lodash__WEBPACK_IMPORTED_MODULE_2___default().maxBy(dialogue.messages, "_id") ? lodash__WEBPACK_IMPORTED_MODULE_2___default().maxBy(dialogue.messages, "_id")._id : Number.POSITIVE_INFINITY,
      "desc"
    );
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement("ol", { className: "messagepad__list", ref: "list" }, lodash__WEBPACK_IMPORTED_MODULE_2___default().map(orderedDialogues, (dialogue) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement(
      _DialogueListItemComponent__WEBPACK_IMPORTED_MODULE_6__["default"],
      {
        key: dialogue._id,
        userName: dialogue.udoc.uname,
        summary: dialogue.messages.length ? lodash__WEBPACK_IMPORTED_MODULE_2___default().maxBy(dialogue.messages, "_id").flag & 4 ? (0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("[Richtext message]") : lodash__WEBPACK_IMPORTED_MODULE_2___default().maxBy(dialogue.messages, "_id").content : "",
        faceUrl: dialogue.udoc.avatarUrl,
        active: dialogue._id === this.props.activeId,
        onClick: () => this.props.handleClick(dialogue._id)
      }
    )));
  }
}));


/***/ }),

/***/ "./components/messagepad/MessagePadInputContainer.jsx":
/*!************************************************************!*\
  !*** ./components/messagepad/MessagePadInputContainer.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vj/components/react/IconComponent */ "./components/react/IconComponent.tsx");
/* harmony import */ var vj_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vj/utils */ "./utils/index.ts");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;






const mapStateToProps = (state) => ({
  activeId: state.activeId,
  isPosting: state.activeId !== null ? state.isPosting[state.activeId] : false,
  inputValue: state.activeId !== null ? state.inputs[state.activeId] : ""
});
const mapDispatchToProps = (dispatch) => ({
  handleChange(id, value) {
    if (id === null) return;
    dispatch({
      type: "DIALOGUES_INPUT_CHANGED",
      payload: value,
      meta: {
        dialogueId: id
      }
    });
  },
  postSend(uid, value) {
    const req = vj_utils__WEBPACK_IMPORTED_MODULE_5__.request.post("", {
      operation: "send",
      uid,
      content: value
    });
    dispatch({
      type: "DIALOGUES_POST_SEND",
      payload: req,
      meta: {
        dialogueId: uid
      }
    });
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(mapStateToProps, mapDispatchToProps)((_a = class extends (react__WEBPACK_IMPORTED_MODULE_2___default().PureComponent) {
  componentDidUpdate(prevProps) {
    this.focusInput = this.props.activeId !== prevProps.activeId || prevProps.isPosting !== this.props.isPosting && this.props.isPosting === false;
    if (this.focusInput) {
      const { scrollX, scrollY } = window;
      this.refs.input.focus();
      window.scrollTo(scrollX, scrollY);
    }
  }
  handleKeyDown(ev) {
    if (ev.keyCode === 13 && (ev.ctrlKey || ev.metaKey)) {
      this.submit();
    }
  }
  submit() {
    this.props.postSend(
      this.props.activeId,
      this.props.inputValue
    );
  }
  render() {
    const cn = classnames__WEBPACK_IMPORTED_MODULE_0___default()("messagepad__input", {
      visible: this.props.activeId !== null
    });
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: cn }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: "messagepad__textarea-container" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(
      "textarea",
      {
        ref: "input",
        "data-markdown": true,
        disabled: this.props.isPosting,
        value: this.props.inputValue,
        onKeyDown: (ev) => this.handleKeyDown(ev),
        onChange: (ev) => this.props.handleChange(this.props.activeId, ev.target.value)
      }
    )), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(
      "button",
      {
        disabled: !this.props.inputValue.trim().length || this.props.isPosting,
        onClick: () => this.submit()
      },
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_4__["default"], { name: "send" })
    ));
  }
}, __publicField(_a, "contextTypes", {
  store: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)
}), _a)));


/***/ }),

/***/ "./components/messagepad/index.jsx":
/*!*****************************************!*\
  !*** ./components/messagepad/index.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vj/components/react/IconComponent */ "./components/react/IconComponent.tsx");
/* harmony import */ var vj_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vj/utils */ "./utils/index.ts");
/* harmony import */ var _MessagePadDialogueContentContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MessagePadDialogueContentContainer */ "./components/messagepad/MessagePadDialogueContentContainer.jsx");
/* harmony import */ var _MessagePadDialogueListContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MessagePadDialogueListContainer */ "./components/messagepad/MessagePadDialogueListContainer.jsx");
/* harmony import */ var _MessagePadInputContainer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MessagePadInputContainer */ "./components/messagepad/MessagePadInputContainer.jsx");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;








const mapDispatchToProps = (dispatch) => ({
  loadDialogues() {
    dispatch({
      type: "DIALOGUES_LOAD_DIALOGUES",
      payload: vj_utils__WEBPACK_IMPORTED_MODULE_4__.request.get("", { _: Date.now() })
    });
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_2__.connect)(null, mapDispatchToProps)((_a = class extends (react__WEBPACK_IMPORTED_MODULE_1___default().PureComponent) {
  componentDidMount() {
    this.props.loadDialogues();
  }
  render() {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "messagepad clearfix" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "messagepad__sidebar" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "section__header" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(
      "button",
      {
        onClick: () => this.props.onAdd(),
        className: "primary rounded button"
      },
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_3__["default"], { name: "add" }),
      " ",
      (0,vj_utils__WEBPACK_IMPORTED_MODULE_4__.i18n)("New")
    )), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_MessagePadDialogueListContainer__WEBPACK_IMPORTED_MODULE_6__["default"], null)), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_MessagePadDialogueContentContainer__WEBPACK_IMPORTED_MODULE_5__["default"], null), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_MessagePadInputContainer__WEBPACK_IMPORTED_MODULE_7__["default"], null));
  }
}, __publicField(_a, "propTypes", {
  onAdd: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().func).isRequired
}), _a)));


/***/ }),

/***/ "./components/react/IconComponent.tsx":
/*!********************************************!*\
  !*** ./components/react/IconComponent.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IconComponent)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



function IconComponent(props) {
  const {
    name,
    className,
    ...rest
  } = props;
  const cn = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, `icon icon-${name}`);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", { ...rest, className: cn });
}
IconComponent.propTypes = {
  name: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};


/***/ }),

/***/ "./components/scratchpad/DataInputComponent.jsx":
/*!******************************************************!*\
  !*** ./components/scratchpad/DataInputComponent.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataInputComponent)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");

function DataInputComponent(props) {
  const {
    html,
    title,
    value,
    onChange,
    className,
    ...rest
  } = props;
  return /* @__PURE__ */ React.createElement("div", { ...rest, className, style: { height: "100%", width: "100%" } }, html ? /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "scratchpad__data-input",
      style: { overflowY: "scroll" },
      wrap: "off",
      spellCheck: "false"
    },
    /* @__PURE__ */ React.createElement("pre", { dangerouslySetInnerHTML: { __html: value }, contentEditable: true })
  ) : /* @__PURE__ */ React.createElement(
    "textarea",
    {
      className: "scratchpad__data-input",
      wrap: "off",
      spellCheck: "false",
      value,
      onChange: (ev) => {
        ev.stopPropagation();
        onChange(ev.target.value);
      },
      placeholder: title
    }
  ));
}
DataInputComponent.propTypes = {
  title: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().node),
  value: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().func),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
};


/***/ }),

/***/ "./components/scratchpad/PanelComponent.jsx":
/*!**************************************************!*\
  !*** ./components/scratchpad/PanelComponent.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PanelComponent)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



function PanelComponent(props) {
  const {
    title,
    className,
    children,
    ...rest
  } = props;
  const cn = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, "flex-col");
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { ...rest, className: `${cn} splitpane-fill` }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: "scratchpad__panel-title" }, title), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: "flex-col flex-fill" }, children));
}
PanelComponent.propTypes = {
  title: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node)
};


/***/ }),

/***/ "./components/scratchpad/ScratchpadEditorContainer.tsx":
/*!*************************************************************!*\
  !*** ./components/scratchpad/ScratchpadEditorContainer.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var vj_components_monaco_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vj/components/monaco/loader */ "./components/monaco/loader.ts");
/* harmony import */ var vj_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vj/context */ "./context.ts");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)((state) => {
  var _a;
  return {
    value: state.editor.code,
    language: (_a = window.LANGS[state.editor.lang]) == null ? void 0 : _a.monaco,
    settings: state.ui.settings.config,
    pendingCommand: state.ui.pendingCommand
  };
}, (dispatch) => ({
  handleUpdateCode: (code) => {
    dispatch({
      type: "SCRATCHPAD_EDITOR_UPDATE_CODE",
      payload: code
    });
  },
  commandDone: () => {
    dispatch({
      type: "SCRATCHPAD_TRIGGER_EDITOR_COMMAND",
      payload: { command: "" }
    });
  }
}))(class MonacoEditor extends (react__WEBPACK_IMPORTED_MODULE_0___default().PureComponent) {
  constructor() {
    super(...arguments);
    __publicField(this, "disposable", []);
    __publicField(this, "__prevent_trigger_change_event", false);
    __publicField(this, "model");
    __publicField(this, "editor");
    __publicField(this, "containerElement");
    __publicField(this, "assignRef", (component) => {
      this.containerElement = component;
    });
  }
  async componentDidMount() {
    const value = this.props.value || "";
    const { language } = this.props;
    const { monaco, registerAction, customOptions } = await (0,vj_components_monaco_loader__WEBPACK_IMPORTED_MODULE_2__.load)([language]);
    const uri = monaco.Uri.parse(`hydro:${UiContext.pdoc.pid || UiContext.pdoc.docId}.${language}`);
    this.model = monaco.editor.getModel(uri) || monaco.editor.createModel(value, language, uri);
    if (this.containerElement) {
      const config = {
        theme: "vs-light",
        fontFamily: UserContext.codeFontFamily,
        ...customOptions,
        lineNumbers: "on",
        glyphMargin: true,
        lightbulb: { enabled: monaco.editor.ShowLightbulbIconMode.On },
        model: this.model,
        fontLigatures: ""
      };
      this.editor = monaco.editor.create(this.containerElement, config);
      registerAction(this.editor, this.model);
      this.disposable.push(
        this.editor.onDidChangeModelContent((event) => {
          var _a, _b;
          if (!this.__prevent_trigger_change_event) {
            (_b = (_a = this.props).handleUpdateCode) == null ? void 0 : _b.call(_a, this.editor.getValue({ lineEnding: "\n", preserveBOM: false }), event);
          }
        })
      );
      window.editor = this.editor;
      window.monaco = monaco;
      vj_context__WEBPACK_IMPORTED_MODULE_3__.ctx.scratchpad.init(this.editor, monaco);
    }
  }
  async componentDidUpdate(prevProps) {
    var _a;
    const {
      value,
      language
    } = this.props;
    const { monaco } = await (0,vj_components_monaco_loader__WEBPACK_IMPORTED_MODULE_2__.load)([language]);
    const { editor, model } = this;
    const { LF } = monaco.editor.EndOfLinePreference;
    if (model && editor && this.props.value != null && this.props.value !== model.getValue(LF, false)) {
      this.__prevent_trigger_change_event = true;
      editor.pushUndoStop();
      model.pushEditOperations(
        [],
        [
          {
            range: model.getFullModelRange(),
            text: value
          }
        ],
        () => null
      );
      editor.pushUndoStop();
      this.__prevent_trigger_change_event = false;
    }
    if (model && editor && prevProps.language !== language) {
      const val = model.getValue(LF, false);
      model.dispose();
      const uri = monaco.Uri.parse(`hydro:${UiContext.pdoc.pid || UiContext.pdoc.docId}.${language}`);
      this.model = monaco.editor.getModel(uri) || monaco.editor.createModel(val, language, uri);
      editor.setModel(this.model);
    }
    if (editor && this.props.settings) {
      editor.updateOptions(this.props.settings);
    }
    if (this.props.pendingCommand) {
      editor.focus();
      (_a = editor.getAction(this.props.pendingCommand)) == null ? void 0 : _a.run();
      this.props.commandDone();
    }
  }
  componentWillUnmount() {
    if (this.editor) this.editor.dispose();
    if (this.model) this.model.dispose();
    this.disposable.map((i) => i.dispose());
  }
  render() {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
      "div",
      {
        ref: this.assignRef,
        style: {
          height: "100%",
          width: "100%"
        },
        className: "ScratchpadMonacoEditor"
      },
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "loader-container" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "loader" }))
    );
  }
}));


/***/ }),

/***/ "./components/scratchpad/ScratchpadPretestContainer.jsx":
/*!**************************************************************!*\
  !*** ./components/scratchpad/ScratchpadPretestContainer.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var allotment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! allotment */ "../../node_modules/allotment/dist/modern.mjs");
/* harmony import */ var ansi_up__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ansi_up */ "../../node_modules/ansi_up/ansi_up.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vj/components/react/IconComponent */ "./components/react/IconComponent.tsx");
/* harmony import */ var vj_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vj/utils */ "./utils/index.ts");
/* harmony import */ var _DataInputComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DataInputComponent */ "./components/scratchpad/DataInputComponent.jsx");
/* harmony import */ var _PanelComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PanelComponent */ "./components/scratchpad/PanelComponent.jsx");








const AU = new ansi_up__WEBPACK_IMPORTED_MODULE_1__.AnsiUp();
const mapStateToProps = (state) => ({
  input: state.pretest.input,
  output: state.pretest.output,
  rid: state.pretest.rid
});
const mapDispatchToProps = (dispatch) => ({
  handleDataChange(type, value) {
    dispatch({
      type: "SCRATCHPAD_PRETEST_DATA_CHANGE",
      payload: {
        type,
        value
      }
    });
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(mapStateToProps, mapDispatchToProps)(class ScratchpadPretestContainer extends (react__WEBPACK_IMPORTED_MODULE_2___default().PureComponent) {
  render() {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(
      _PanelComponent__WEBPACK_IMPORTED_MODULE_7__["default"],
      {
        title: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_4__["default"], { name: "edit" }), " ", (0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Pretest"))
      },
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(allotment__WEBPACK_IMPORTED_MODULE_0__.Allotment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(
        _DataInputComponent__WEBPACK_IMPORTED_MODULE_6__["default"],
        {
          title: (0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Input"),
          value: this.props.input,
          onChange: (v) => this.props.handleDataChange("input", v)
        }
      ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(
        _DataInputComponent__WEBPACK_IMPORTED_MODULE_6__["default"],
        {
          title: (0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Output"),
          value: AU.ansi_to_html(this.props.output),
          html: true
        }
      ))
    );
  }
}));


/***/ }),

/***/ "./components/scratchpad/ScratchpadRecordsContainer.jsx":
/*!**************************************************************!*\
  !*** ./components/scratchpad/ScratchpadRecordsContainer.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vj/components/react/IconComponent */ "./components/react/IconComponent.tsx");
/* harmony import */ var vj_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vj/utils */ "./utils/index.ts");
/* harmony import */ var _PanelComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PanelComponent */ "./components/scratchpad/PanelComponent.jsx");
/* harmony import */ var _ScratchpadRecordsRowContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ScratchpadRecordsRowContainer */ "./components/scratchpad/ScratchpadRecordsRowContainer.jsx");







const mapStateToProps = (state) => ({
  rows: state.records.rows,
  isLoading: state.ui.records.isLoading
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_2__.connect)(mapStateToProps)(class ScratchpadRecordsContainer extends (react__WEBPACK_IMPORTED_MODULE_1___default().PureComponent) {
  render() {
    const cn = classnames__WEBPACK_IMPORTED_MODULE_0___default()("data-table is--full-row scratchpad__records__table", {
      loading: this.props.isLoading
    });
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(
      _PanelComponent__WEBPACK_IMPORTED_MODULE_5__["default"],
      {
        title: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_3__["default"], { name: "flag" }), " ", (0,vj_utils__WEBPACK_IMPORTED_MODULE_4__.i18n)("Records"))
      },
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("table", { className: cn }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("colgroup", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("col", { className: "col--detail" }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("col", { className: "col--memory" }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("col", { className: "col--time" }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("col", { className: "col--at" })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("tbody", null, this.props.rows.map((rowId) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ScratchpadRecordsRowContainer__WEBPACK_IMPORTED_MODULE_6__["default"], { key: rowId, id: rowId }))))
    );
  }
}));


/***/ }),

/***/ "./components/scratchpad/ScratchpadRecordsRowContainer.jsx":
/*!*****************************************************************!*\
  !*** ./components/scratchpad/ScratchpadRecordsRowContainer.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "../../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var timeago_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! timeago-react */ "../../node_modules/timeago-react/esm/timeago-react.js");
/* harmony import */ var vj_constant_record__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vj/constant/record */ "./constant/record.js");
/* harmony import */ var vj_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vj/utils */ "./utils/index.ts");








const shouldShowDetail = (data) => {
  var _a;
  return vj_constant_record__WEBPACK_IMPORTED_MODULE_6__.STATUS_SCRATCHPAD_SHOW_DETAIL_FLAGS[data.status] && ((_a = data.testCases) == null ? void 0 : _a.length);
};
const getRecordDetail = (data) => {
  if (!shouldShowDetail(data)) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement("span", { className: `record-status--text ${vj_constant_record__WEBPACK_IMPORTED_MODULE_6__.STATUS_CODES[data.status]}` }, vj_constant_record__WEBPACK_IMPORTED_MODULE_6__.STATUS_TEXTS[data.status]);
  }
  const stat = lodash__WEBPACK_IMPORTED_MODULE_1___default().pick(
    lodash__WEBPACK_IMPORTED_MODULE_1___default().groupBy(data.testCases || [], "status"),
    lodash__WEBPACK_IMPORTED_MODULE_1___default().keys(vj_constant_record__WEBPACK_IMPORTED_MODULE_6__.STATUS_SCRATCHPAD_SHORT_TEXTS)
  );
  return lodash__WEBPACK_IMPORTED_MODULE_1___default().map(vj_constant_record__WEBPACK_IMPORTED_MODULE_6__.STATUS_SCRATCHPAD_SHORT_TEXTS, (text, status) => {
    const count = stat[status] && stat[status].length || 0;
    const cn = classnames__WEBPACK_IMPORTED_MODULE_0___default()("icol icol--stat", {
      "record-status--text": count > 0,
      [vj_constant_record__WEBPACK_IMPORTED_MODULE_6__.STATUS_CODES[data.status]]: count > 0
    });
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement("span", { key: text, className: cn }, text, ": ", count);
  });
};
const mapStateToProps = (state) => ({
  items: state.records.items
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  data: stateProps.items[ownProps.id]
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_4__.connect)(mapStateToProps, null, mergeProps)(class ScratchpadRecordsRowContainer extends (react__WEBPACK_IMPORTED_MODULE_3___default().PureComponent) {
  handleRowClick(ev, id) {
    const url = (0,vj_utils__WEBPACK_IMPORTED_MODULE_7__.substitute)(
      decodeURIComponent(UiContext.getRecordDetailUrl),
      { rid: id }
    );
    (0,vj_utils__WEBPACK_IMPORTED_MODULE_7__.emulateAnchorClick)(ev, url, true);
  }
  render() {
    var _a;
    const { data } = this.props;
    const submitAt = (0,vj_utils__WEBPACK_IMPORTED_MODULE_7__.mongoId)(data._id).timestamp * 1e3;
    return ((_a = data.contest) == null ? void 0 : _a.toString()) === "000000000000000000000000" ? null : /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement("tr", { onClick: (ev) => this.handleRowClick(ev, data._id) }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement("td", { className: `col--detail record-status--border ${vj_constant_record__WEBPACK_IMPORTED_MODULE_6__.STATUS_CODES[data.status]}` }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement("span", { className: `icon record-status--icon ${vj_constant_record__WEBPACK_IMPORTED_MODULE_6__.STATUS_CODES[data.status]}` }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement("span", { className: "icol icol--pretest" }), getRecordDetail(data)), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement("td", { className: "col--memory" }, shouldShowDetail(data) ? `${Math.ceil(data.memory / 1e3)} MB` : "-"), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement("td", { className: "col--time" }, shouldShowDetail(data) ? `${(data.time / 1e3).toFixed(1)}s` : "-"), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement("td", { className: "col--at" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement("time", { "data-tooltip": moment__WEBPACK_IMPORTED_MODULE_2___default()(submitAt).format("YYYY-MM-DD HH:mm:ss") }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_3___default().createElement(timeago_react__WEBPACK_IMPORTED_MODULE_5__["default"], { datetime: submitAt, locale: (0,vj_utils__WEBPACK_IMPORTED_MODULE_7__.i18n)("timeago_locale") }))));
  }
}));


/***/ }),

/***/ "./components/scratchpad/ScratchpadSettings.tsx":
/*!******************************************************!*\
  !*** ./components/scratchpad/ScratchpadSettings.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScratchpadSettings)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var vj_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vj/utils */ "./utils/index.ts");



function ScratchpadSettings() {
  const config = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)((state) => state.ui.settings.config);
  const parsed = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(() => {
    const settings = { fontSize: 14, tabSize: 4 };
    try {
      Object.assign(settings, config);
    } catch (e) {
    }
    return settings;
  }, [config]);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  function dispatcher(setting, numeric = false) {
    return (ev) => {
      var _a;
      const val = ((_a = ev == null ? void 0 : ev.target) == null ? void 0 : _a.value) || ev;
      dispatch({ type: "SCRATCHPAD_SETTING_UPDATE", payload: { setting, value: numeric ? +val : val } });
    };
  }
  function openThemeSelect() {
    dispatch({ type: "SCRATCHPAD_TRIGGER_EDITOR_COMMAND", payload: { command: "hydro.changeEditorTheme" } });
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "row" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "medium-6 columns" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,vj_utils__WEBPACK_IMPORTED_MODULE_2__.i18n)("Font size"), ":", /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "textbox-container" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "number", step: "1", value: parsed.fontSize, onChange: dispatcher("fontSize", true), className: "textbox" }))))), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "row" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "medium-6 columns" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, (0,vj_utils__WEBPACK_IMPORTED_MODULE_2__.i18n)("Tab size"), ":", /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "textbox-container" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "number", step: "1", value: parsed.tabSize, onChange: dispatcher("tabSize", true), className: "textbox" }))))), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "row" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "columns" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, (0,vj_utils__WEBPACK_IMPORTED_MODULE_2__.i18n)("Theme"), ": "), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "rounded primary button", onClick: openThemeSelect }, (0,vj_utils__WEBPACK_IMPORTED_MODULE_2__.i18n)("Open theme select")))));
}


/***/ }),

/***/ "./components/scratchpad/ScratchpadToolbarContainer.jsx":
/*!**************************************************************!*\
  !*** ./components/scratchpad/ScratchpadToolbarContainer.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vj/components/react/IconComponent */ "./components/react/IconComponent.tsx");
/* harmony import */ var vj_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vj/utils */ "./utils/index.ts");
/* harmony import */ var _ToolbarComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ToolbarComponent */ "./components/scratchpad/ToolbarComponent.jsx");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;







const mapStateToProps = (state) => ({
  pretestVisible: state.ui.pretest.visible,
  recordsVisible: state.ui.records.visible,
  isPosting: state.ui.isPosting,
  isRunning: state.pretest.isRunning,
  pretestWaitSec: state.ui.pretestWaitSec,
  submitWaitSec: state.ui.submitWaitSec,
  editorLang: state.editor.lang,
  editorCode: state.editor.code,
  pretestInput: state.pretest.input
});
const mapDispatchToProps = (dispatch) => ({
  togglePanel(uiElement) {
    dispatch({
      type: "SCRATCHPAD_UI_TOGGLE_VISIBILITY",
      payload: { uiElement }
    });
  },
  setEditorLanguage(lang) {
    dispatch({
      type: "SCRATCHPAD_EDITOR_SET_LANG",
      payload: lang
    });
  },
  postPretest(props) {
    const req = vj_utils__WEBPACK_IMPORTED_MODULE_5__.request.post(UiContext.postSubmitUrl, {
      lang: props.editorLang,
      code: props.editorCode,
      input: props.pretestInput,
      pretest: true
    });
    dispatch({
      type: "SCRATCHPAD_POST_PRETEST",
      payload: req
    });
  },
  postSubmit(props) {
    const req = vj_utils__WEBPACK_IMPORTED_MODULE_5__.request.post(UiContext.postSubmitUrl, {
      lang: props.editorLang,
      code: props.editorCode
    });
    dispatch({
      type: "SCRATCHPAD_POST_SUBMIT",
      payload: req
    });
  },
  loadSubmissions() {
    dispatch({
      type: "SCRATCHPAD_RECORDS_LOAD_SUBMISSIONS",
      payload: vj_utils__WEBPACK_IMPORTED_MODULE_5__.request.get(UiContext.getSubmissionsUrl)
    });
  },
  tick() {
    dispatch({
      type: "SCRATCHPAD_WAITING_TICK"
    });
  }
});
const availableLangs = (0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.getAvailableLangs)(UiContext.pdoc.config.langs);
const keys = Object.keys(availableLangs);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(mapStateToProps, mapDispatchToProps)((_a = class extends (react__WEBPACK_IMPORTED_MODULE_2___default().PureComponent) {
  constructor(props) {
    super(props);
    if (!availableLangs[this.props.editorLang]) {
      const key = this.props.editorLang ? keys.filter((i) => availableLangs[i].pretest).find((i) => availableLangs[i].pretest.split(".")[0] === this.props.editorLang.split(".")[0]) : "";
      this.props.setEditorLanguage(key || keys[0]);
    }
  }
  componentDidMount() {
    if (this.props.recordsVisible) this.props.loadSubmissions();
  }
  componentDidUpdate() {
    if (this.props.pretestWaitSec > 0 || this.props.submitWaitSec > 0) {
      setTimeout(() => this.props.tick(), 1e3);
    }
  }
  render() {
    var _a2, _b;
    let canUsePretest = ((_a2 = UiContext.pdoc.config) == null ? void 0 : _a2.type) === "default";
    const langInfo = availableLangs[this.props.editorLang];
    if (((_b = UiContext.pdoc.config) == null ? void 0 : _b.type) === "remote_judge" && langInfo) {
      if (langInfo.pretest) canUsePretest = true;
      if (langInfo.validAs && !langInfo.hidden) canUsePretest = true;
    }
    if ((langInfo == null ? void 0 : langInfo.pretest) === false) canUsePretest = false;
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ToolbarComponent__WEBPACK_IMPORTED_MODULE_6__["default"], null, canUsePretest && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(
      _ToolbarComponent__WEBPACK_IMPORTED_MODULE_6__.ToolbarButtonComponent,
      {
        disabled: this.props.isPosting || this.props.isRunning || !!this.props.pretestWaitSec,
        className: "scratchpad__toolbar__pretest",
        onClick: () => this.props.postPretest(this.props),
        "data-global-hotkey": "f9",
        "data-tooltip": `${(0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Pretest Your Code")} (F9)`
      },
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_4__["default"], { name: "debug" }),
      " ",
      (0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Run Pretest"),
      " ",
      this.props.pretestWaitSec ? `(${this.props.pretestWaitSec}s)` : "(F9)"
    ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(
      _ToolbarComponent__WEBPACK_IMPORTED_MODULE_6__.ToolbarButtonComponent,
      {
        disabled: this.props.isPosting || !!this.props.submitWaitSec,
        className: "scratchpad__toolbar__submit",
        onClick: () => this.props.postSubmit(this.props),
        "data-global-hotkey": "f10",
        "data-tooltip": `${(0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Submit Your Code")} (F10)`
      },
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_4__["default"], { name: "play" }),
      " ",
      (0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Submit Solution"),
      " ",
      this.props.submitWaitSec ? `(${this.props.submitWaitSec}s)` : "(F10)"
    ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(
      _ToolbarComponent__WEBPACK_IMPORTED_MODULE_6__.ToolbarButtonComponent,
      {
        "data-global-hotkey": "alt+q",
        "data-tooltip": `${(0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Quit Scratchpad")} (Alt+Q)`,
        name: "problem-sidebar__quit-scratchpad"
      },
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_4__["default"], { name: "close" }),
      " ",
      (0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Exit"),
      " ",
      "(Alt+Q)"
    ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ToolbarComponent__WEBPACK_IMPORTED_MODULE_6__.ToolbarItemComponent, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(
      "select",
      {
        className: "select",
        disabled: this.props.isPosting,
        value: this.props.editorLang,
        onChange: (ev) => this.props.setEditorLanguage(ev.target.value)
      },
      lodash__WEBPACK_IMPORTED_MODULE_0___default().map(availableLangs, (val, key) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement("option", { value: key, key }, val.display))
    )), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ToolbarComponent__WEBPACK_IMPORTED_MODULE_6__.ToolbarSplitComponent, null), canUsePretest && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(
      _ToolbarComponent__WEBPACK_IMPORTED_MODULE_6__.ToolbarButtonComponent,
      {
        activated: this.props.pretestVisible,
        onClick: () => this.props.togglePanel("pretest"),
        "data-global-hotkey": "alt+p",
        "data-tooltip": `${(0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Toggle Pretest Panel")} (Alt+P)`
      },
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_4__["default"], { name: "edit" }),
      " ",
      (0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Pretest")
    ), UiContext.canViewRecord && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(
      _ToolbarComponent__WEBPACK_IMPORTED_MODULE_6__.ToolbarButtonComponent,
      {
        activated: this.props.recordsVisible,
        onClick: () => this.props.togglePanel("records"),
        "data-global-hotkey": "alt+r",
        "data-tooltip": `${(0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Toggle Records Panel")} (Alt+R)`
      },
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_2___default().createElement(vj_components_react_IconComponent__WEBPACK_IMPORTED_MODULE_4__["default"], { name: "flag" }),
      " ",
      (0,vj_utils__WEBPACK_IMPORTED_MODULE_5__.i18n)("Records")
    ));
  }
}, __publicField(_a, "contextTypes", {
  store: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)
}), _a)));


/***/ }),

/***/ "./components/scratchpad/ToolbarComponent.jsx":
/*!****************************************************!*\
  !*** ./components/scratchpad/ToolbarComponent.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolbarButtonComponent: () => (/* binding */ ToolbarButtonComponent),
/* harmony export */   ToolbarItemComponent: () => (/* binding */ ToolbarItemComponent),
/* harmony export */   ToolbarSplitComponent: () => (/* binding */ ToolbarSplitComponent),
/* harmony export */   "default": () => (/* binding */ ToolbarComponent)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");


function ToolbarComponent(props) {
  const {
    className,
    children,
    ...rest
  } = props;
  const cn = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, "scratchpad__toolbar flex-row flex-cross-center");
  return /* @__PURE__ */ React.createElement("div", { ...rest, className: cn }, children);
}
ToolbarComponent.propTypes = {
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node)
};
function ToolbarButtonComponent(props) {
  const {
    activated = false,
    disabled = false,
    onClick,
    className,
    children,
    ...rest
  } = props;
  const cn = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, "scratchpad__toolbar__item scratchpad__toolbar__button", {
    activated,
    disabled,
    enabled: !disabled
  });
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      ...rest,
      tabIndex: "-1",
      className: cn,
      onClick: () => !disabled && onClick && onClick()
    },
    /* @__PURE__ */ React.createElement("div", null, children)
  );
}
ToolbarButtonComponent.propTypes = {
  activated: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node)
};
function ToolbarSplitComponent(props) {
  const {
    className,
    ...rest
  } = props;
  const cn = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, "scratchpad__toolbar__item scratchpad__toolbar__split");
  return /* @__PURE__ */ React.createElement("div", { ...rest, className: cn });
}
ToolbarSplitComponent.propTypes = {
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
function ToolbarItemComponent(props) {
  const {
    className,
    children,
    ...rest
  } = props;
  const cn = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, "scratchpad__toolbar__item");
  return /* @__PURE__ */ React.createElement("div", { ...rest, className: cn }, children);
}
ToolbarItemComponent.propTypes = {
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node)
};


/***/ }),

/***/ "./components/scratchpad/index.tsx":
/*!*****************************************!*\
  !*** ./components/scratchpad/index.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScratchpadContainer)
/* harmony export */ });
/* harmony import */ var _vscode_codicons_src_icons_file_svg_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vscode/codicons/src/icons/file.svg?react */ "../../node_modules/@vscode/codicons/src/icons/file.svg?react");
/* harmony import */ var _vscode_codicons_src_icons_settings_gear_svg_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vscode/codicons/src/icons/settings-gear.svg?react */ "../../node_modules/@vscode/codicons/src/icons/settings-gear.svg?react");
/* harmony import */ var allotment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! allotment */ "../../node_modules/allotment/dist/modern.mjs");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var vj_components_react_DomComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vj/components/react/DomComponent */ "./components/react/DomComponent.tsx");
/* harmony import */ var vj_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vj/context */ "./context.ts");
/* harmony import */ var _ScratchpadEditorContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ScratchpadEditorContainer */ "./components/scratchpad/ScratchpadEditorContainer.tsx");
/* harmony import */ var _ScratchpadPretestContainer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ScratchpadPretestContainer */ "./components/scratchpad/ScratchpadPretestContainer.jsx");
/* harmony import */ var _ScratchpadRecordsContainer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ScratchpadRecordsContainer */ "./components/scratchpad/ScratchpadRecordsContainer.jsx");
/* harmony import */ var _ScratchpadSettings__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ScratchpadSettings */ "./components/scratchpad/ScratchpadSettings.tsx");
/* harmony import */ var _ScratchpadToolbarContainer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ScratchpadToolbarContainer */ "./components/scratchpad/ScratchpadToolbarContainer.jsx");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);














const pages = {
  problem: {
    icon: () => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_vscode_codicons_src_icons_file_svg_react__WEBPACK_IMPORTED_MODULE_0__["default"], null),
    component: () => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(vj_components_react_DomComponent__WEBPACK_IMPORTED_MODULE_7__["default"], { childDom: jquery__WEBPACK_IMPORTED_MODULE_3___default()(".problem-content").get(0) })
  },
  settings: {
    icon: () => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_vscode_codicons_src_icons_settings_gear_svg_react__WEBPACK_IMPORTED_MODULE_1__["default"], null),
    component: () => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_ScratchpadSettings__WEBPACK_IMPORTED_MODULE_12__["default"], null)
  }
};
let rerenderCallback = null;
class ScratchpadService extends vj_context__WEBPACK_IMPORTED_MODULE_8__.Service {
  constructor(store) {
    super(vj_context__WEBPACK_IMPORTED_MODULE_8__.ctx, "scratchpad");
    this.store = store;
    __publicField(this, "pages", pages);
    __publicField(this, "load");
    __publicField(this, "loadCallback");
    __publicField(this, "editor");
    __publicField(this, "monaco");
    this.load = new Promise((resolve) => {
      this.loadCallback = resolve;
    });
  }
  init(editor, monaco) {
    this.editor = editor;
    this.monaco = monaco;
    this.loadCallback();
  }
  addPage(key, icon, component) {
    pages[key] = {
      icon,
      component
    };
    rerenderCallback == null ? void 0 : rerenderCallback();
  }
}
let scratchpad;
function ScratchpadContainer() {
  const store = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useStore)();
  scratchpad || (scratchpad = new ScratchpadService(store));
  const [, updateState] = react__WEBPACK_IMPORTED_MODULE_5___default().useState();
  const forceUpdate = react__WEBPACK_IMPORTED_MODULE_5___default().useCallback(() => updateState({}), []);
  react__WEBPACK_IMPORTED_MODULE_5___default().useEffect(() => {
    rerenderCallback = forceUpdate;
  }, []);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useDispatch)();
  const ui = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)((state) => state.ui, (lodash__WEBPACK_IMPORTED_MODULE_4___default().isEqual));
  const handleChangeSize = lodash__WEBPACK_IMPORTED_MODULE_4___default().debounce(() => {
    var _a, _b;
    (_b = (_a = vj_context__WEBPACK_IMPORTED_MODULE_8__.ctx.scratchpad.editor) == null ? void 0 : _a.layout) == null ? void 0 : _b.call(_a);
    jquery__WEBPACK_IMPORTED_MODULE_3___default()("#scratchpad").trigger("vjScratchpadRelayout");
    forceUpdate();
  }, 500);
  const switchToPage = (target) => {
    dispatch({
      type: "SCRATCHPAD_SWITCH_TO_PAGE",
      payload: target
    });
  };
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(allotment__WEBPACK_IMPORTED_MODULE_2__.Allotment, { onChange: handleChangeSize }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(allotment__WEBPACK_IMPORTED_MODULE_2__.Allotment.Pane, { visible: Object.keys(pages).length > 1, minSize: 50, maxSize: 50 }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { className: "scratchpad__tablist" }, Object.keys(pages).map((key) => {
    const Component = pages[key].icon;
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(
      "div",
      {
        key,
        className: `scratchpad__tabicon-${key}${key === ui.activePage ? " scratchpad__tab-active" : ""}`,
        onClick: () => switchToPage(key)
      },
      /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(Component, null)
    );
  }))), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(allotment__WEBPACK_IMPORTED_MODULE_2__.Allotment.Pane, { visible: !!ui.activePage }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { className: "scratchpad__problem" }, Object.keys(pages).map((key) => {
    const Component = pages[key].component;
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { key, style: { display: key === ui.activePage ? "block" : "none" } }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(Component, null));
  }))), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(allotment__WEBPACK_IMPORTED_MODULE_2__.Allotment, { vertical: true, onChange: handleChangeSize }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { key: "editor", className: "flex-col splitpane-fill" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_ScratchpadToolbarContainer__WEBPACK_IMPORTED_MODULE_13__["default"], null), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_ScratchpadEditorContainer__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(allotment__WEBPACK_IMPORTED_MODULE_2__.Allotment.Pane, { visible: ui.pretest.visible }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_ScratchpadPretestContainer__WEBPACK_IMPORTED_MODULE_10__["default"], { key: "pretest" })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(allotment__WEBPACK_IMPORTED_MODULE_2__.Allotment.Pane, { visible: ui.records.visible }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_ScratchpadRecordsContainer__WEBPACK_IMPORTED_MODULE_11__["default"], { key: "records" }))));
}


/***/ })

}]);