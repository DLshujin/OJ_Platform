;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="559cbeee-f92d-4873-9a69-6f8b5be56209",e._sentryDebugIdIdentifier="sentry-dbid-559cbeee-f92d-4873-9a69-6f8b5be56209");})();}catch(e){}};
!function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"00ee96a191eaa70b72f3e18304fd7a157fe83a8e"};}();
(self["webpackChunk_hydrooj_ui_default"] = self["webpackChunk_hydrooj_ui_default"] || []).push([["n.markdown-it"],{

/***/ "../../node_modules/diff-dom/dist/module.js":
/*!**************************************************!*\
  !*** ../../node_modules/diff-dom/dist/module.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiffDOM: () => (/* binding */ DiffDOM),
/* harmony export */   TraceLogger: () => (/* binding */ TraceLogger),
/* harmony export */   nodeToObj: () => (/* binding */ nodeToObj),
/* harmony export */   stringToObj: () => (/* binding */ stringToObj)
/* harmony export */ });
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    var arguments$1 = arguments;
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments$1[i];
      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) {
          t[p] = s[p];
        }
      }
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) {
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) {
          ar = Array.prototype.slice.call(from, 0, i);
        }
        ar[i] = from[i];
      }
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var Diff = (
  /** @class */
  function() {
    function Diff2(options) {
      if (options === void 0) {
        options = {};
      }
      var _this = this;
      Object.entries(options).forEach(function(_a) {
        var key = _a[0], value = _a[1];
        return _this[key] = value;
      });
    }
    Diff2.prototype.toString = function() {
      return JSON.stringify(this);
    };
    Diff2.prototype.setValue = function(aKey, aValue) {
      this[aKey] = aValue;
      return this;
    };
    return Diff2;
  }()
);
function checkElementType(element, simplifiedCheck) {
  var arguments$1 = arguments;
  if (simplifiedCheck === void 0) {
    simplifiedCheck = false;
  }
  var elementTypeNames = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    elementTypeNames[_i - 2] = arguments$1[_i];
  }
  if (typeof element === "undefined" || element === null) {
    return false;
  }
  if (simplifiedCheck) {
    return elementTypeNames.some(function(elementTypeName) {
      if (elementTypeName === "Element") {
        return element.nodeType === 1 || typeof element.nodeName === "string" && element.nodeName !== "#text" && element.nodeName !== "#comment";
      }
      if (elementTypeName === "Text") {
        return element.nodeType === 3 || element.nodeName === "#text";
      }
      if (elementTypeName === "Comment") {
        return element.nodeType === 8 || element.nodeName === "#comment";
      }
      if (elementTypeName.startsWith("HTML") && elementTypeName.endsWith("Element")) {
        var tagName = elementTypeName.slice(4, -7).toLowerCase();
        return element.nodeName && element.nodeName.toLowerCase() === tagName;
      }
      return false;
    });
  }
  return elementTypeNames.some(function(elementTypeName) {
    var _a, _b;
    return typeof ((_b = (_a = element === null || element === void 0 ? void 0 : element.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) === null || _b === void 0 ? void 0 : _b[elementTypeName]) === "function" && element instanceof element.ownerDocument.defaultView[elementTypeName];
  });
}
function objToNode(objNode, insideSvg, options) {
  var node;
  if (objNode.nodeName === "#text") {
    node = options.document.createTextNode(objNode.data);
  } else if (objNode.nodeName === "#comment") {
    node = options.document.createComment(objNode.data);
  } else {
    if (insideSvg) {
      node = options.document.createElementNS("http://www.w3.org/2000/svg", objNode.nodeName);
      if (objNode.nodeName === "foreignObject") {
        insideSvg = false;
      }
    } else if (objNode.nodeName.toLowerCase() === "svg") {
      node = options.document.createElementNS("http://www.w3.org/2000/svg", "svg");
      insideSvg = true;
    } else {
      node = options.document.createElement(objNode.nodeName);
    }
    if (objNode.attributes) {
      Object.entries(objNode.attributes).forEach(function(_a) {
        var key = _a[0], value = _a[1];
        return node.setAttribute(key, value);
      });
    }
    if (objNode.childNodes) {
      node = node;
      objNode.childNodes.forEach(function(childNode) {
        return node.appendChild(objToNode(childNode, insideSvg, options));
      });
    }
    if (options.valueDiffing) {
      if (objNode.value && checkElementType(node, options.simplifiedElementCheck, "HTMLButtonElement", "HTMLDataElement", "HTMLInputElement", "HTMLLIElement", "HTMLMeterElement", "HTMLOptionElement", "HTMLProgressElement", "HTMLParamElement")) {
        node.value = objNode.value;
      }
      if (objNode.checked && checkElementType(node, options.simplifiedElementCheck, "HTMLInputElement")) {
        node.checked = objNode.checked;
      }
      if (objNode.selected && checkElementType(node, options.simplifiedElementCheck, "HTMLOptionElement")) {
        node.selected = objNode.selected;
      }
    }
  }
  return node;
}
var getFromRoute = function(node, route) {
  route = route.slice();
  while (route.length > 0) {
    var c = route.splice(0, 1)[0];
    node = node.childNodes[c];
  }
  return node;
};
function applyDiff(tree, diff, options) {
  var action = diff[options._const.action];
  var route = diff[options._const.route];
  var node;
  if (![options._const.addElement, options._const.addTextElement].includes(action)) {
    node = getFromRoute(tree, route);
  }
  var newNode;
  var reference;
  var nodeArray;
  var info = {
    diff,
    node
  };
  if (options.preDiffApply(info)) {
    return true;
  }
  switch (action) {
    case options._const.addAttribute:
      if (!node || !checkElementType(node, options.simplifiedElementCheck, "Element")) {
        return false;
      }
      node.setAttribute(diff[options._const.name], diff[options._const.value]);
      break;
    case options._const.modifyAttribute:
      if (!node || !checkElementType(node, options.simplifiedElementCheck, "Element")) {
        return false;
      }
      node.setAttribute(diff[options._const.name], diff[options._const.newValue]);
      if (checkElementType(node, options.simplifiedElementCheck, "HTMLInputElement") && diff[options._const.name] === "value") {
        node.value = diff[options._const.newValue];
      }
      break;
    case options._const.removeAttribute:
      if (!node || !checkElementType(node, options.simplifiedElementCheck, "Element")) {
        return false;
      }
      node.removeAttribute(diff[options._const.name]);
      break;
    case options._const.modifyTextElement:
      if (!node || !checkElementType(node, options.simplifiedElementCheck, "Text")) {
        return false;
      }
      options.textDiff(node, node.data, diff[options._const.oldValue], diff[options._const.newValue]);
      if (checkElementType(node.parentNode, options.simplifiedElementCheck, "HTMLTextAreaElement")) {
        node.parentNode.value = diff[options._const.newValue];
      }
      break;
    case options._const.modifyValue:
      if (!node || typeof node.value === "undefined") {
        return false;
      }
      node.value = diff[options._const.newValue];
      break;
    case options._const.modifyComment:
      if (!node || !checkElementType(node, options.simplifiedElementCheck, "Comment")) {
        return false;
      }
      options.textDiff(node, node.data, diff[options._const.oldValue], diff[options._const.newValue]);
      break;
    case options._const.modifyChecked:
      if (!node || typeof node.checked === "undefined") {
        return false;
      }
      node.checked = diff[options._const.newValue];
      break;
    case options._const.modifySelected:
      if (!node || typeof node.selected === "undefined") {
        return false;
      }
      node.selected = diff[options._const.newValue];
      break;
    case options._const.replaceElement: {
      var insideSvg = diff[options._const.newValue].nodeName.toLowerCase() === "svg" || node.parentNode.namespaceURI === "http://www.w3.org/2000/svg";
      node.parentNode.replaceChild(objToNode(diff[options._const.newValue], insideSvg, options), node);
      break;
    }
    case options._const.relocateGroup:
      nodeArray = __spreadArray([], new Array(diff[options._const.groupLength]), true).map(function() {
        return node.removeChild(node.childNodes[diff[options._const.from]]);
      });
      nodeArray.forEach(function(childNode, index) {
        if (index === 0) {
          reference = node.childNodes[diff[options._const.to]];
        }
        node.insertBefore(childNode, reference || null);
      });
      break;
    case options._const.removeElement:
      node.parentNode.removeChild(node);
      break;
    case options._const.addElement: {
      var parentRoute = route.slice();
      var c = parentRoute.splice(parentRoute.length - 1, 1)[0];
      node = getFromRoute(tree, parentRoute);
      if (!checkElementType(node, options.simplifiedElementCheck, "Element")) {
        return false;
      }
      node.insertBefore(objToNode(diff[options._const.element], node.namespaceURI === "http://www.w3.org/2000/svg", options), node.childNodes[c] || null);
      break;
    }
    case options._const.removeTextElement: {
      if (!node || node.nodeType !== 3) {
        return false;
      }
      var parentNode = node.parentNode;
      parentNode.removeChild(node);
      if (checkElementType(parentNode, options.simplifiedElementCheck, "HTMLTextAreaElement")) {
        parentNode.value = "";
      }
      break;
    }
    case options._const.addTextElement: {
      var parentRoute = route.slice();
      var c = parentRoute.splice(parentRoute.length - 1, 1)[0];
      newNode = options.document.createTextNode(diff[options._const.value]);
      node = getFromRoute(tree, parentRoute);
      if (!node.childNodes) {
        return false;
      }
      node.insertBefore(newNode, node.childNodes[c] || null);
      if (checkElementType(node.parentNode, options.simplifiedElementCheck, "HTMLTextAreaElement")) {
        node.parentNode.value = diff[options._const.value];
      }
      break;
    }
    default:
      console.log("unknown action");
  }
  options.postDiffApply({
    diff: info.diff,
    node: info.node,
    newNode
  });
  return true;
}
function applyDOM(tree, diffs, options) {
  return diffs.every(function(diff) {
    return applyDiff(tree, diff, options);
  });
}
function swap(obj, p1, p2) {
  var tmp = obj[p1];
  obj[p1] = obj[p2];
  obj[p2] = tmp;
}
function undoDiff(tree, diff, options) {
  switch (diff[options._const.action]) {
    case options._const.addAttribute:
      diff[options._const.action] = options._const.removeAttribute;
      applyDiff(tree, diff, options);
      break;
    case options._const.modifyAttribute:
      swap(diff, options._const.oldValue, options._const.newValue);
      applyDiff(tree, diff, options);
      break;
    case options._const.removeAttribute:
      diff[options._const.action] = options._const.addAttribute;
      applyDiff(tree, diff, options);
      break;
    case options._const.modifyTextElement:
      swap(diff, options._const.oldValue, options._const.newValue);
      applyDiff(tree, diff, options);
      break;
    case options._const.modifyValue:
      swap(diff, options._const.oldValue, options._const.newValue);
      applyDiff(tree, diff, options);
      break;
    case options._const.modifyComment:
      swap(diff, options._const.oldValue, options._const.newValue);
      applyDiff(tree, diff, options);
      break;
    case options._const.modifyChecked:
      swap(diff, options._const.oldValue, options._const.newValue);
      applyDiff(tree, diff, options);
      break;
    case options._const.modifySelected:
      swap(diff, options._const.oldValue, options._const.newValue);
      applyDiff(tree, diff, options);
      break;
    case options._const.replaceElement:
      swap(diff, options._const.oldValue, options._const.newValue);
      applyDiff(tree, diff, options);
      break;
    case options._const.relocateGroup:
      swap(diff, options._const.from, options._const.to);
      applyDiff(tree, diff, options);
      break;
    case options._const.removeElement:
      diff[options._const.action] = options._const.addElement;
      applyDiff(tree, diff, options);
      break;
    case options._const.addElement:
      diff[options._const.action] = options._const.removeElement;
      applyDiff(tree, diff, options);
      break;
    case options._const.removeTextElement:
      diff[options._const.action] = options._const.addTextElement;
      applyDiff(tree, diff, options);
      break;
    case options._const.addTextElement:
      diff[options._const.action] = options._const.removeTextElement;
      applyDiff(tree, diff, options);
      break;
    default:
      console.log("unknown action");
  }
}
function undoDOM(tree, diffs, options) {
  diffs = diffs.slice();
  diffs.reverse();
  diffs.forEach(function(diff) {
    undoDiff(tree, diff, options);
  });
}
var elementDescriptors = function(el) {
  var output = [];
  output.push(el.nodeName);
  if (el.nodeName !== "#text" && el.nodeName !== "#comment") {
    el = el;
    if (el.attributes) {
      if (el.attributes["class"]) {
        output.push("".concat(el.nodeName, ".").concat(el.attributes["class"].replace(/ /g, ".")));
      }
      if (el.attributes.id) {
        output.push("".concat(el.nodeName, "#").concat(el.attributes.id));
      }
    }
  }
  return output;
};
var findUniqueDescriptors = function(li) {
  var uniqueDescriptors = {};
  var duplicateDescriptors = {};
  li.forEach(function(node) {
    elementDescriptors(node).forEach(function(descriptor) {
      var inUnique = descriptor in uniqueDescriptors;
      var inDupes = descriptor in duplicateDescriptors;
      if (!inUnique && !inDupes) {
        uniqueDescriptors[descriptor] = true;
      } else if (inUnique) {
        delete uniqueDescriptors[descriptor];
        duplicateDescriptors[descriptor] = true;
      }
    });
  });
  return uniqueDescriptors;
};
var uniqueInBoth = function(l1, l2) {
  var l1Unique = findUniqueDescriptors(l1);
  var l2Unique = findUniqueDescriptors(l2);
  var inBoth = {};
  Object.keys(l1Unique).forEach(function(key) {
    if (l2Unique[key]) {
      inBoth[key] = true;
    }
  });
  return inBoth;
};
var removeDone = function(tree) {
  delete tree.outerDone;
  delete tree.innerDone;
  delete tree.valueDone;
  if (tree.childNodes) {
    return tree.childNodes.every(removeDone);
  } else {
    return true;
  }
};
var cleanNode = function(diffNode) {
  if (Object.prototype.hasOwnProperty.call(diffNode, "data")) {
    var textNode = {
      nodeName: diffNode.nodeName === "#text" ? "#text" : "#comment",
      data: diffNode.data
    };
    return textNode;
  } else {
    var elementNode = {
      nodeName: diffNode.nodeName
    };
    diffNode = diffNode;
    if (Object.prototype.hasOwnProperty.call(diffNode, "attributes")) {
      elementNode.attributes = __assign({}, diffNode.attributes);
    }
    if (Object.prototype.hasOwnProperty.call(diffNode, "checked")) {
      elementNode.checked = diffNode.checked;
    }
    if (Object.prototype.hasOwnProperty.call(diffNode, "value")) {
      elementNode.value = diffNode.value;
    }
    if (Object.prototype.hasOwnProperty.call(diffNode, "selected")) {
      elementNode.selected = diffNode.selected;
    }
    if (Object.prototype.hasOwnProperty.call(diffNode, "childNodes")) {
      elementNode.childNodes = diffNode.childNodes.map(function(diffChildNode) {
        return cleanNode(diffChildNode);
      });
    }
    return elementNode;
  }
};
var isEqual = function(e1, e2) {
  if (!["nodeName", "value", "checked", "selected", "data"].every(function(element) {
    if (e1[element] !== e2[element]) {
      return false;
    }
    return true;
  })) {
    return false;
  }
  if (Object.prototype.hasOwnProperty.call(e1, "data")) {
    return true;
  }
  e1 = e1;
  e2 = e2;
  if (Boolean(e1.attributes) !== Boolean(e2.attributes)) {
    return false;
  }
  if (Boolean(e1.childNodes) !== Boolean(e2.childNodes)) {
    return false;
  }
  if (e1.attributes) {
    var e1Attributes = Object.keys(e1.attributes);
    var e2Attributes = Object.keys(e2.attributes);
    if (e1Attributes.length !== e2Attributes.length) {
      return false;
    }
    if (!e1Attributes.every(function(attribute) {
      if (e1.attributes[attribute] !== e2.attributes[attribute]) {
        return false;
      }
      return true;
    })) {
      return false;
    }
  }
  if (e1.childNodes) {
    if (e1.childNodes.length !== e2.childNodes.length) {
      return false;
    }
    if (!e1.childNodes.every(function(childNode, index) {
      return isEqual(childNode, e2.childNodes[index]);
    })) {
      return false;
    }
  }
  return true;
};
var roughlyEqual = function(e1, e2, uniqueDescriptors, sameSiblings, preventRecursion) {
  if (preventRecursion === void 0) {
    preventRecursion = false;
  }
  if (!e1 || !e2) {
    return false;
  }
  if (e1.nodeName !== e2.nodeName) {
    return false;
  }
  if (["#text", "#comment"].includes(e1.nodeName)) {
    return preventRecursion ? true : e1.data === e2.data;
  }
  e1 = e1;
  e2 = e2;
  if (e1.nodeName in uniqueDescriptors) {
    return true;
  }
  if (e1.attributes && e2.attributes) {
    if (e1.attributes.id) {
      if (e1.attributes.id !== e2.attributes.id) {
        return false;
      } else {
        var idDescriptor = "".concat(e1.nodeName, "#").concat(e1.attributes.id);
        if (idDescriptor in uniqueDescriptors) {
          return true;
        }
      }
    }
    if (e1.attributes["class"] && e1.attributes["class"] === e2.attributes["class"]) {
      var classDescriptor = "".concat(e1.nodeName, ".").concat(e1.attributes["class"].replace(/ /g, "."));
      if (classDescriptor in uniqueDescriptors) {
        return true;
      }
    }
  }
  if (sameSiblings) {
    return true;
  }
  var nodeList1 = e1.childNodes ? e1.childNodes.slice().reverse() : [];
  var nodeList2 = e2.childNodes ? e2.childNodes.slice().reverse() : [];
  if (nodeList1.length !== nodeList2.length) {
    return false;
  }
  if (preventRecursion) {
    return nodeList1.every(function(element, index) {
      return element.nodeName === nodeList2[index].nodeName;
    });
  } else {
    var childUniqueDescriptors_1 = uniqueInBoth(nodeList1, nodeList2);
    return nodeList1.every(function(element, index) {
      return roughlyEqual(element, nodeList2[index], childUniqueDescriptors_1, true, true);
    });
  }
};
var findCommonSubsets = function(c1, c2, marked1, marked2) {
  var lcsSize = 0;
  var index = [];
  var c1Length = c1.length;
  var c2Length = c2.length;
  var matches = __spreadArray([], new Array(c1Length + 1), true).map(function() {
    return [];
  });
  var uniqueDescriptors = uniqueInBoth(c1, c2);
  var subsetsSame = c1Length === c2Length;
  if (subsetsSame) {
    c1.some(function(element, i) {
      var c1Desc = elementDescriptors(element);
      var c2Desc = elementDescriptors(c2[i]);
      if (c1Desc.length !== c2Desc.length) {
        subsetsSame = false;
        return true;
      }
      c1Desc.some(function(description, i2) {
        if (description !== c2Desc[i2]) {
          subsetsSame = false;
          return true;
        }
      });
      if (!subsetsSame) {
        return true;
      }
    });
  }
  for (var c1Index = 0; c1Index < c1Length; c1Index++) {
    var c1Element = c1[c1Index];
    for (var c2Index = 0; c2Index < c2Length; c2Index++) {
      var c2Element = c2[c2Index];
      if (!marked1[c1Index] && !marked2[c2Index] && roughlyEqual(c1Element, c2Element, uniqueDescriptors, subsetsSame)) {
        matches[c1Index + 1][c2Index + 1] = matches[c1Index][c2Index] ? matches[c1Index][c2Index] + 1 : 1;
        if (matches[c1Index + 1][c2Index + 1] >= lcsSize) {
          lcsSize = matches[c1Index + 1][c2Index + 1];
          index = [c1Index + 1, c2Index + 1];
        }
      } else {
        matches[c1Index + 1][c2Index + 1] = 0;
      }
    }
  }
  if (lcsSize === 0) {
    return false;
  }
  return {
    oldValue: index[0] - lcsSize,
    newValue: index[1] - lcsSize,
    length: lcsSize
  };
};
var makeBooleanArray = function(n, v) {
  return __spreadArray([], new Array(n), true).map(function() {
    return v;
  });
};
var getGapInformation = function(t1, t2, stable) {
  var gaps1 = t1.childNodes ? makeBooleanArray(t1.childNodes.length, true) : [];
  var gaps2 = t2.childNodes ? makeBooleanArray(t2.childNodes.length, true) : [];
  var group = 0;
  stable.forEach(function(subset) {
    var endOld = subset.oldValue + subset.length;
    var endNew = subset.newValue + subset.length;
    for (var j = subset.oldValue; j < endOld; j += 1) {
      gaps1[j] = group;
    }
    for (var j = subset.newValue; j < endNew; j += 1) {
      gaps2[j] = group;
    }
    group += 1;
  });
  return {
    gaps1,
    gaps2
  };
};
var markBoth = function(marked1, marked2, subset, i) {
  marked1[subset.oldValue + i] = true;
  marked2[subset.newValue + i] = true;
};
var markSubTrees = function(oldTree, newTree) {
  var oldChildren = oldTree.childNodes ? oldTree.childNodes : [];
  var newChildren = newTree.childNodes ? newTree.childNodes : [];
  var marked1 = makeBooleanArray(oldChildren.length, false);
  var marked2 = makeBooleanArray(newChildren.length, false);
  var subsets = [];
  var returnIndex = function() {
    return arguments[1];
  };
  var foundAllSubsets = false;
  var _loop_1 = function() {
    var subset = findCommonSubsets(oldChildren, newChildren, marked1, marked2);
    if (subset) {
      subsets.push(subset);
      var subsetArray = __spreadArray([], new Array(subset.length), true).map(returnIndex);
      subsetArray.forEach(function(item) {
        return markBoth(marked1, marked2, subset, item);
      });
    } else {
      foundAllSubsets = true;
    }
  };
  while (!foundAllSubsets) {
    _loop_1();
  }
  oldTree.subsets = subsets;
  oldTree.subsetsAge = 100;
  return subsets;
};
var DiffTracker = (
  /** @class */
  function() {
    function DiffTracker2() {
      this.list = [];
    }
    DiffTracker2.prototype.add = function(diffs) {
      var _a;
      (_a = this.list).push.apply(_a, diffs);
    };
    DiffTracker2.prototype.forEach = function(fn) {
      this.list.forEach(function(li) {
        return fn(li);
      });
    };
    return DiffTracker2;
  }()
);
function getFromVirtualRoute(tree, route) {
  var node = tree;
  var parentNode;
  var nodeIndex;
  route = route.slice();
  while (route.length > 0) {
    nodeIndex = route.splice(0, 1)[0];
    parentNode = node;
    node = node.childNodes ? node.childNodes[nodeIndex] : void 0;
  }
  return {
    node,
    parentNode,
    nodeIndex
  };
}
function applyVirtualDiff(tree, diff, options) {
  var _a;
  var node, parentNode, nodeIndex;
  if (![options._const.addElement, options._const.addTextElement].includes(diff[options._const.action])) {
    var routeInfo = getFromVirtualRoute(tree, diff[options._const.route]);
    node = routeInfo.node;
    parentNode = routeInfo.parentNode;
    nodeIndex = routeInfo.nodeIndex;
  }
  var newSubsets = [];
  var info = {
    diff,
    node
  };
  if (options.preVirtualDiffApply(info)) {
    return true;
  }
  var newNode;
  var nodeArray;
  var route;
  switch (diff[options._const.action]) {
    case options._const.addAttribute:
      if (!node.attributes) {
        node.attributes = {};
      }
      node.attributes[diff[options._const.name]] = diff[options._const.value];
      if (diff[options._const.name] === "checked") {
        node.checked = true;
      } else if (diff[options._const.name] === "selected") {
        node.selected = true;
      } else if (node.nodeName === "INPUT" && diff[options._const.name] === "value") {
        node.value = diff[options._const.value];
      }
      break;
    case options._const.modifyAttribute:
      node.attributes[diff[options._const.name]] = diff[options._const.newValue];
      break;
    case options._const.removeAttribute:
      delete node.attributes[diff[options._const.name]];
      if (Object.keys(node.attributes).length === 0) {
        delete node.attributes;
      }
      if (diff[options._const.name] === "checked") {
        node.checked = false;
      } else if (diff[options._const.name] === "selected") {
        delete node.selected;
      } else if (node.nodeName === "INPUT" && diff[options._const.name] === "value") {
        delete node.value;
      }
      break;
    case options._const.modifyTextElement:
      node.data = diff[options._const.newValue];
      if (parentNode.nodeName === "TEXTAREA") {
        parentNode.value = diff[options._const.newValue];
      }
      break;
    case options._const.modifyValue:
      node.value = diff[options._const.newValue];
      break;
    case options._const.modifyComment:
      node.data = diff[options._const.newValue];
      break;
    case options._const.modifyChecked:
      node.checked = diff[options._const.newValue];
      break;
    case options._const.modifySelected:
      node.selected = diff[options._const.newValue];
      break;
    case options._const.replaceElement:
      newNode = cleanNode(diff[options._const.newValue]);
      parentNode.childNodes[nodeIndex] = newNode;
      break;
    case options._const.relocateGroup:
      nodeArray = node.childNodes.splice(diff[options._const.from], diff[options._const.groupLength]).reverse();
      nodeArray.forEach(function(movedNode) {
        return node.childNodes.splice(diff[options._const.to], 0, movedNode);
      });
      if (node.subsets) {
        node.subsets.forEach(function(map) {
          if (diff[options._const.from] < diff[options._const.to] && map.oldValue <= diff[options._const.to] && map.oldValue > diff[options._const.from]) {
            map.oldValue -= diff[options._const.groupLength];
            var splitLength = map.oldValue + map.length - diff[options._const.to];
            if (splitLength > 0) {
              newSubsets.push({
                oldValue: diff[options._const.to] + diff[options._const.groupLength],
                newValue: map.newValue + map.length - splitLength,
                length: splitLength
              });
              map.length -= splitLength;
            }
          } else if (diff[options._const.from] > diff[options._const.to] && map.oldValue > diff[options._const.to] && map.oldValue < diff[options._const.from]) {
            map.oldValue += diff[options._const.groupLength];
            var splitLength = map.oldValue + map.length - diff[options._const.to];
            if (splitLength > 0) {
              newSubsets.push({
                oldValue: diff[options._const.to] + diff[options._const.groupLength],
                newValue: map.newValue + map.length - splitLength,
                length: splitLength
              });
              map.length -= splitLength;
            }
          } else if (map.oldValue === diff[options._const.from]) {
            map.oldValue = diff[options._const.to];
          }
        });
      }
      break;
    case options._const.removeElement:
      parentNode.childNodes.splice(nodeIndex, 1);
      if (parentNode.subsets) {
        parentNode.subsets.forEach(function(map) {
          if (map.oldValue > nodeIndex) {
            map.oldValue -= 1;
          } else if (map.oldValue === nodeIndex) {
            map["delete"] = true;
          } else if (map.oldValue < nodeIndex && map.oldValue + map.length > nodeIndex) {
            if (map.oldValue + map.length - 1 === nodeIndex) {
              map.length--;
            } else {
              newSubsets.push({
                newValue: map.newValue + nodeIndex - map.oldValue,
                oldValue: nodeIndex,
                length: map.length - nodeIndex + map.oldValue - 1
              });
              map.length = nodeIndex - map.oldValue;
            }
          }
        });
      }
      node = parentNode;
      break;
    case options._const.addElement: {
      route = diff[options._const.route].slice();
      var c_1 = route.splice(route.length - 1, 1)[0];
      node = (_a = getFromVirtualRoute(tree, route)) === null || _a === void 0 ? void 0 : _a.node;
      newNode = cleanNode(diff[options._const.element]);
      if (!node.childNodes) {
        node.childNodes = [];
      }
      if (c_1 >= node.childNodes.length) {
        node.childNodes.push(newNode);
      } else {
        node.childNodes.splice(c_1, 0, newNode);
      }
      if (node.subsets) {
        node.subsets.forEach(function(map) {
          if (map.oldValue >= c_1) {
            map.oldValue += 1;
          } else if (map.oldValue < c_1 && map.oldValue + map.length > c_1) {
            var splitLength = map.oldValue + map.length - c_1;
            newSubsets.push({
              newValue: map.newValue + map.length - splitLength,
              oldValue: c_1 + 1,
              length: splitLength
            });
            map.length -= splitLength;
          }
        });
      }
      break;
    }
    case options._const.removeTextElement:
      parentNode.childNodes.splice(nodeIndex, 1);
      if (parentNode.nodeName === "TEXTAREA") {
        delete parentNode.value;
      }
      if (parentNode.subsets) {
        parentNode.subsets.forEach(function(map) {
          if (map.oldValue > nodeIndex) {
            map.oldValue -= 1;
          } else if (map.oldValue === nodeIndex) {
            map["delete"] = true;
          } else if (map.oldValue < nodeIndex && map.oldValue + map.length > nodeIndex) {
            if (map.oldValue + map.length - 1 === nodeIndex) {
              map.length--;
            } else {
              newSubsets.push({
                newValue: map.newValue + nodeIndex - map.oldValue,
                oldValue: nodeIndex,
                length: map.length - nodeIndex + map.oldValue - 1
              });
              map.length = nodeIndex - map.oldValue;
            }
          }
        });
      }
      node = parentNode;
      break;
    case options._const.addTextElement: {
      route = diff[options._const.route].slice();
      var c_2 = route.splice(route.length - 1, 1)[0];
      newNode = {
        nodeName: "#text",
        data: diff[options._const.value]
      };
      node = getFromVirtualRoute(tree, route).node;
      if (!node.childNodes) {
        node.childNodes = [];
      }
      if (c_2 >= node.childNodes.length) {
        node.childNodes.push(newNode);
      } else {
        node.childNodes.splice(c_2, 0, newNode);
      }
      if (node.nodeName === "TEXTAREA") {
        node.value = diff[options._const.newValue];
      }
      if (node.subsets) {
        node.subsets.forEach(function(map) {
          if (map.oldValue >= c_2) {
            map.oldValue += 1;
          }
          if (map.oldValue < c_2 && map.oldValue + map.length > c_2) {
            var splitLength = map.oldValue + map.length - c_2;
            newSubsets.push({
              newValue: map.newValue + map.length - splitLength,
              oldValue: c_2 + 1,
              length: splitLength
            });
            map.length -= splitLength;
          }
        });
      }
      break;
    }
    default:
      console.log("unknown action");
  }
  if (node.subsets) {
    node.subsets = node.subsets.filter(function(map) {
      return !map["delete"] && map.oldValue !== map.newValue;
    });
    if (newSubsets.length) {
      node.subsets = node.subsets.concat(newSubsets);
    }
  }
  options.postVirtualDiffApply({
    node: info.node,
    diff: info.diff,
    newNode
  });
  return;
}
function applyVirtual(tree, diffs, options) {
  diffs.forEach(function(diff) {
    applyVirtualDiff(tree, diff, options);
  });
  return true;
}
function nodeToObj(aNode, options) {
  if (options === void 0) {
    options = {
      valueDiffing: true,
      simplifiedElementCheck: true
    };
  }
  var objNode = {
    nodeName: aNode.nodeName
  };
  if (checkElementType(aNode, options.simplifiedElementCheck, "Text", "Comment")) {
    objNode.data = aNode.data;
  } else {
    if (aNode.attributes && aNode.attributes.length > 0) {
      objNode.attributes = {};
      var nodeArray = Array.prototype.slice.call(aNode.attributes);
      nodeArray.forEach(function(attribute) {
        return objNode.attributes[attribute.name] = attribute.value;
      });
    }
    if (aNode.childNodes && aNode.childNodes.length > 0) {
      objNode.childNodes = [];
      var nodeArray = Array.prototype.slice.call(aNode.childNodes);
      nodeArray.forEach(function(childNode) {
        return objNode.childNodes.push(nodeToObj(childNode, options));
      });
    }
    if (options.valueDiffing) {
      if (checkElementType(aNode, options.simplifiedElementCheck, "HTMLTextAreaElement")) {
        objNode.value = aNode.value;
      }
      if (checkElementType(aNode, options.simplifiedElementCheck, "HTMLInputElement") && ["radio", "checkbox"].includes(aNode.type.toLowerCase()) && aNode.checked !== void 0) {
        objNode.checked = aNode.checked;
      } else if (checkElementType(aNode, options.simplifiedElementCheck, "HTMLButtonElement", "HTMLDataElement", "HTMLInputElement", "HTMLLIElement", "HTMLMeterElement", "HTMLOptionElement", "HTMLProgressElement", "HTMLParamElement")) {
        objNode.value = aNode.value;
      }
      if (checkElementType(aNode, options.simplifiedElementCheck, "HTMLOptionElement")) {
        objNode.selected = aNode.selected;
      }
    }
  }
  return objNode;
}
var tagRE = /<\s*\/*[a-zA-Z:_][a-zA-Z0-9:_\-.]*\s*(?:"[^"]*"['"]*|'[^']*'['"]*|[^'"/>])*\/*\s*>|<!--(?:.|\n|\r)*?-->/g;
var attrRE = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
function unescape(string) {
  return string.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
var lookup = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  menuItem: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};
var parseTag = function(tag, caseSensitive) {
  var res = {
    nodeName: "",
    attributes: {}
  };
  var voidElement = false;
  var type = "tag";
  var tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
  if (tagMatch) {
    res.nodeName = caseSensitive || tagMatch[1] === "svg" ? tagMatch[1] : tagMatch[1].toUpperCase();
    if (lookup[tagMatch[1]] || tag.charAt(tag.length - 2) === "/") {
      voidElement = true;
    }
    if (res.nodeName.startsWith("!--")) {
      var endIndex = tag.indexOf("-->");
      return {
        type: "comment",
        node: {
          nodeName: "#comment",
          data: endIndex !== -1 ? tag.slice(4, endIndex) : ""
        },
        voidElement
      };
    }
  }
  var reg = new RegExp(attrRE);
  var result = null;
  var done = false;
  while (!done) {
    result = reg.exec(tag);
    if (result === null) {
      done = true;
    } else if (result[0].trim()) {
      if (result[1]) {
        var attr = result[1].trim();
        var arr = [attr, ""];
        if (attr.indexOf("=") > -1) {
          arr = attr.split("=");
        }
        res.attributes[arr[0]] = arr[1];
        reg.lastIndex--;
      } else if (result[2]) {
        res.attributes[result[2]] = result[3].trim().substring(1, result[3].length - 1);
      }
    }
  }
  return {
    type,
    node: res,
    voidElement
  };
};
var stringToObj = function(html, options) {
  if (options === void 0) {
    options = {
      valueDiffing: true,
      caseSensitive: false
    };
  }
  var result = [];
  var current;
  var level = -1;
  var arr = [];
  var inComponent = false, insideSvg = false;
  if (html.indexOf("<") !== 0) {
    var end = html.indexOf("<");
    result.push({
      nodeName: "#text",
      data: end === -1 ? html : html.substring(0, end)
    });
  }
  html.replace(tagRE, function(tag, index) {
    var isOpen = tag.charAt(1) !== "/";
    var isComment = tag.startsWith("<!--");
    var start = index + tag.length;
    var nextChar = html.charAt(start);
    if (isComment) {
      var comment = parseTag(tag, options.caseSensitive).node;
      if (level < 0) {
        result.push(comment);
        return "";
      }
      var parent_1 = arr[level];
      if (parent_1 && comment.nodeName) {
        if (!parent_1.node.childNodes) {
          parent_1.node.childNodes = [];
        }
        parent_1.node.childNodes.push(comment);
      }
      return "";
    }
    if (isOpen) {
      current = parseTag(tag, options.caseSensitive || insideSvg);
      if (current.node.nodeName === "svg") {
        insideSvg = true;
      }
      level++;
      if (!current.voidElement && !inComponent && nextChar && nextChar !== "<") {
        if (!current.node.childNodes) {
          current.node.childNodes = [];
        }
        var data = unescape(html.slice(start, html.indexOf("<", start)));
        current.node.childNodes.push({
          nodeName: "#text",
          data
        });
        if (options.valueDiffing && current.node.nodeName === "TEXTAREA") {
          current.node.value = data;
        }
      }
      if (level === 0 && current.node.nodeName) {
        result.push(current.node);
      }
      var parent_2 = arr[level - 1];
      if (parent_2 && current.node.nodeName) {
        if (!parent_2.node.childNodes) {
          parent_2.node.childNodes = [];
        }
        parent_2.node.childNodes.push(current.node);
      }
      arr[level] = current;
    }
    if (!isOpen || current.voidElement) {
      if (level > -1 && (current.voidElement || options.caseSensitive && current.node.nodeName === tag.slice(2, -1) || !options.caseSensitive && current.node.nodeName.toUpperCase() === tag.slice(2, -1).toUpperCase())) {
        level--;
        if (level > -1) {
          if (current.node.nodeName === "svg") {
            insideSvg = false;
          }
          current = arr[level];
        }
      }
      if (nextChar !== "<" && nextChar) {
        var childNodes = level === -1 ? result : arr[level].node.childNodes || [];
        var end2 = html.indexOf("<", start);
        var data = unescape(html.slice(start, end2 === -1 ? void 0 : end2));
        childNodes.push({
          nodeName: "#text",
          data
        });
      }
    }
    return "";
  });
  return result[0];
};
var DiffFinder = (
  /** @class */
  function() {
    function DiffFinder2(t1Node, t2Node, options) {
      this.options = options;
      this.t1 = typeof Element !== "undefined" && checkElementType(t1Node, this.options.simplifiedElementCheck, "Element") ? nodeToObj(t1Node, this.options) : typeof t1Node === "string" ? stringToObj(t1Node, this.options) : JSON.parse(JSON.stringify(t1Node));
      this.t2 = typeof Element !== "undefined" && checkElementType(t2Node, this.options.simplifiedElementCheck, "Element") ? nodeToObj(t2Node, this.options) : typeof t2Node === "string" ? stringToObj(t2Node, this.options) : JSON.parse(JSON.stringify(t2Node));
      this.diffcount = 0;
      this.foundAll = false;
      if (this.debug) {
        this.t1Orig = typeof Element !== "undefined" && checkElementType(t1Node, this.options.simplifiedElementCheck, "Element") ? nodeToObj(t1Node, this.options) : typeof t1Node === "string" ? stringToObj(t1Node, this.options) : JSON.parse(JSON.stringify(t1Node));
        this.t2Orig = typeof Element !== "undefined" && checkElementType(t2Node, this.options.simplifiedElementCheck, "Element") ? nodeToObj(t2Node, this.options) : typeof t2Node === "string" ? stringToObj(t2Node, this.options) : JSON.parse(JSON.stringify(t2Node));
      }
      this.tracker = new DiffTracker();
    }
    DiffFinder2.prototype.init = function() {
      return this.findDiffs(this.t1, this.t2);
    };
    DiffFinder2.prototype.findDiffs = function(t1, t2) {
      var diffs;
      do {
        if (this.options.debug) {
          this.diffcount += 1;
          if (this.diffcount > this.options.diffcap) {
            throw new Error("surpassed diffcap:".concat(JSON.stringify(this.t1Orig), " -> ").concat(JSON.stringify(this.t2Orig)));
          }
        }
        diffs = this.findNextDiff(t1, t2, []);
        if (diffs.length === 0) {
          if (!isEqual(t1, t2)) {
            if (this.foundAll) {
              console.error("Could not find remaining diffs!");
            } else {
              this.foundAll = true;
              removeDone(t1);
              diffs = this.findNextDiff(t1, t2, []);
            }
          }
        }
        if (diffs.length > 0) {
          this.foundAll = false;
          this.tracker.add(diffs);
          applyVirtual(t1, diffs, this.options);
        }
      } while (diffs.length > 0);
      return this.tracker.list;
    };
    DiffFinder2.prototype.findNextDiff = function(t1, t2, route) {
      var diffs;
      var fdiffs;
      if (this.options.maxDepth && route.length > this.options.maxDepth) {
        return [];
      }
      if (!t1.outerDone) {
        diffs = this.findOuterDiff(t1, t2, route);
        if (this.options.filterOuterDiff) {
          fdiffs = this.options.filterOuterDiff(t1, t2, diffs);
          if (fdiffs) {
            diffs = fdiffs;
          }
        }
        if (diffs.length > 0) {
          t1.outerDone = true;
          return diffs;
        } else {
          t1.outerDone = true;
        }
      }
      if (Object.prototype.hasOwnProperty.call(t1, "data")) {
        return [];
      }
      t1 = t1;
      t2 = t2;
      if (!t1.innerDone) {
        diffs = this.findInnerDiff(t1, t2, route);
        if (diffs.length > 0) {
          return diffs;
        } else {
          t1.innerDone = true;
        }
      }
      if (this.options.valueDiffing && !t1.valueDone) {
        diffs = this.findValueDiff(t1, t2, route);
        if (diffs.length > 0) {
          t1.valueDone = true;
          return diffs;
        } else {
          t1.valueDone = true;
        }
      }
      return [];
    };
    DiffFinder2.prototype.findOuterDiff = function(t1, t2, route) {
      var diffs = [];
      var attr;
      var attr1;
      var attr2;
      var attrLength;
      var pos;
      var i;
      if (t1.nodeName !== t2.nodeName) {
        if (!route.length) {
          throw new Error("Top level nodes have to be of the same kind.");
        }
        return [
          new Diff().setValue(this.options._const.action, this.options._const.replaceElement).setValue(this.options._const.oldValue, cleanNode(t1)).setValue(this.options._const.newValue, cleanNode(t2)).setValue(this.options._const.route, route)
        ];
      }
      if (route.length && this.options.diffcap < Math.abs((t1.childNodes || []).length - (t2.childNodes || []).length)) {
        return [
          new Diff().setValue(this.options._const.action, this.options._const.replaceElement).setValue(this.options._const.oldValue, cleanNode(t1)).setValue(this.options._const.newValue, cleanNode(t2)).setValue(this.options._const.route, route)
        ];
      }
      if (Object.prototype.hasOwnProperty.call(t1, "data") && t1.data !== t2.data) {
        if (t1.nodeName === "#text") {
          return [
            new Diff().setValue(this.options._const.action, this.options._const.modifyTextElement).setValue(this.options._const.route, route).setValue(this.options._const.oldValue, t1.data).setValue(this.options._const.newValue, t2.data)
          ];
        } else {
          return [
            new Diff().setValue(this.options._const.action, this.options._const.modifyComment).setValue(this.options._const.route, route).setValue(this.options._const.oldValue, t1.data).setValue(this.options._const.newValue, t2.data)
          ];
        }
      }
      t1 = t1;
      t2 = t2;
      attr1 = t1.attributes ? Object.keys(t1.attributes).sort() : [];
      attr2 = t2.attributes ? Object.keys(t2.attributes).sort() : [];
      attrLength = attr1.length;
      for (i = 0; i < attrLength; i++) {
        attr = attr1[i];
        pos = attr2.indexOf(attr);
        if (pos === -1) {
          diffs.push(new Diff().setValue(this.options._const.action, this.options._const.removeAttribute).setValue(this.options._const.route, route).setValue(this.options._const.name, attr).setValue(this.options._const.value, t1.attributes[attr]));
        } else {
          attr2.splice(pos, 1);
          if (t1.attributes[attr] !== t2.attributes[attr]) {
            diffs.push(new Diff().setValue(this.options._const.action, this.options._const.modifyAttribute).setValue(this.options._const.route, route).setValue(this.options._const.name, attr).setValue(this.options._const.oldValue, t1.attributes[attr]).setValue(this.options._const.newValue, t2.attributes[attr]));
          }
        }
      }
      attrLength = attr2.length;
      for (i = 0; i < attrLength; i++) {
        attr = attr2[i];
        diffs.push(new Diff().setValue(this.options._const.action, this.options._const.addAttribute).setValue(this.options._const.route, route).setValue(this.options._const.name, attr).setValue(this.options._const.value, t2.attributes[attr]));
      }
      return diffs;
    };
    DiffFinder2.prototype.findInnerDiff = function(t1, t2, route) {
      var t1ChildNodes = t1.childNodes ? t1.childNodes.slice() : [];
      var t2ChildNodes = t2.childNodes ? t2.childNodes.slice() : [];
      var last = Math.max(t1ChildNodes.length, t2ChildNodes.length);
      var childNodesLengthDifference = Math.abs(t1ChildNodes.length - t2ChildNodes.length);
      var diffs = [];
      var index = 0;
      if (!this.options.maxChildCount || last < this.options.maxChildCount) {
        var cachedSubtrees = Boolean(t1.subsets && t1.subsetsAge--);
        var subtrees = cachedSubtrees ? t1.subsets : t1.childNodes && t2.childNodes ? markSubTrees(t1, t2) : [];
        if (subtrees.length > 0) {
          diffs = this.attemptGroupRelocation(t1, t2, subtrees, route, cachedSubtrees);
          if (diffs.length > 0) {
            return diffs;
          }
        }
      }
      for (var i = 0; i < last; i += 1) {
        var e1 = t1ChildNodes[i];
        var e2 = t2ChildNodes[i];
        if (childNodesLengthDifference) {
          if (e1 && !e2) {
            if (e1.nodeName === "#text") {
              diffs.push(new Diff().setValue(this.options._const.action, this.options._const.removeTextElement).setValue(this.options._const.route, route.concat(index)).setValue(this.options._const.value, e1.data));
              index -= 1;
            } else {
              diffs.push(new Diff().setValue(this.options._const.action, this.options._const.removeElement).setValue(this.options._const.route, route.concat(index)).setValue(this.options._const.element, cleanNode(e1)));
              index -= 1;
            }
          } else if (e2 && !e1) {
            if (e2.nodeName === "#text") {
              diffs.push(new Diff().setValue(this.options._const.action, this.options._const.addTextElement).setValue(this.options._const.route, route.concat(index)).setValue(this.options._const.value, e2.data));
            } else {
              diffs.push(new Diff().setValue(this.options._const.action, this.options._const.addElement).setValue(this.options._const.route, route.concat(index)).setValue(this.options._const.element, cleanNode(e2)));
            }
          }
        }
        if (e1 && e2) {
          if (!this.options.maxChildCount || last < this.options.maxChildCount) {
            diffs = diffs.concat(this.findNextDiff(e1, e2, route.concat(index)));
          } else if (!isEqual(e1, e2)) {
            if (t1ChildNodes.length > t2ChildNodes.length) {
              if (e1.nodeName === "#text") {
                diffs.push(new Diff().setValue(this.options._const.action, this.options._const.removeTextElement).setValue(this.options._const.route, route.concat(index)).setValue(this.options._const.value, e1.data));
              } else {
                diffs.push(new Diff().setValue(this.options._const.action, this.options._const.removeElement).setValue(this.options._const.element, cleanNode(e1)).setValue(this.options._const.route, route.concat(index)));
              }
              t1ChildNodes.splice(i, 1);
              i -= 1;
              index -= 1;
              childNodesLengthDifference -= 1;
            } else if (t1ChildNodes.length < t2ChildNodes.length) {
              diffs = diffs.concat([
                new Diff().setValue(this.options._const.action, this.options._const.addElement).setValue(this.options._const.element, cleanNode(e2)).setValue(this.options._const.route, route.concat(index))
              ]);
              t1ChildNodes.splice(i, 0, cleanNode(e2));
              childNodesLengthDifference -= 1;
            } else {
              diffs = diffs.concat([
                new Diff().setValue(this.options._const.action, this.options._const.replaceElement).setValue(this.options._const.oldValue, cleanNode(e1)).setValue(this.options._const.newValue, cleanNode(e2)).setValue(this.options._const.route, route.concat(index))
              ]);
            }
          }
        }
        index += 1;
      }
      t1.innerDone = true;
      return diffs;
    };
    DiffFinder2.prototype.attemptGroupRelocation = function(t1, t2, subtrees, route, cachedSubtrees) {
      var gapInformation = getGapInformation(t1, t2, subtrees);
      var gaps1 = gapInformation.gaps1;
      var gaps2 = gapInformation.gaps2;
      var t1ChildNodes = t1.childNodes.slice();
      var t2ChildNodes = t2.childNodes.slice();
      var shortest = Math.min(gaps1.length, gaps2.length);
      var destinationDifferent;
      var toGroup;
      var group;
      var node;
      var similarNode;
      var diffs = [];
      for (var index2 = 0, index1 = 0; index2 < shortest; index1 += 1, index2 += 1) {
        if (cachedSubtrees && (gaps1[index2] === true || gaps2[index2] === true)) ;
        else if (gaps1[index1] === true) {
          node = t1ChildNodes[index1];
          if (node.nodeName === "#text") {
            if (t2ChildNodes[index2].nodeName === "#text") {
              if (node.data !== t2ChildNodes[index2].data) {
                var testI = index1;
                while (t1ChildNodes.length > testI + 1 && t1ChildNodes[testI + 1].nodeName === "#text") {
                  testI += 1;
                  if (t2ChildNodes[index2].data === t1ChildNodes[testI].data) {
                    similarNode = true;
                    break;
                  }
                }
                if (!similarNode) {
                  diffs.push(new Diff().setValue(this.options._const.action, this.options._const.modifyTextElement).setValue(this.options._const.route, route.concat(index1)).setValue(this.options._const.oldValue, node.data).setValue(this.options._const.newValue, t2ChildNodes[index2].data));
                }
              }
            } else {
              diffs.push(new Diff().setValue(this.options._const.action, this.options._const.removeTextElement).setValue(this.options._const.route, route.concat(index1)).setValue(this.options._const.value, node.data));
              gaps1.splice(index1, 1);
              t1ChildNodes.splice(index1, 1);
              shortest = Math.min(gaps1.length, gaps2.length);
              index1 -= 1;
              index2 -= 1;
            }
          } else if (gaps2[index2] === true) {
            diffs.push(new Diff().setValue(this.options._const.action, this.options._const.replaceElement).setValue(this.options._const.oldValue, cleanNode(node)).setValue(this.options._const.newValue, cleanNode(t2ChildNodes[index2])).setValue(this.options._const.route, route.concat(index1)));
          } else {
            diffs.push(new Diff().setValue(this.options._const.action, this.options._const.removeElement).setValue(this.options._const.route, route.concat(index1)).setValue(this.options._const.element, cleanNode(node)));
            gaps1.splice(index1, 1);
            t1ChildNodes.splice(index1, 1);
            shortest = Math.min(gaps1.length, gaps2.length);
            index1 -= 1;
            index2 -= 1;
          }
        } else if (gaps2[index2] === true) {
          node = t2ChildNodes[index2];
          if (node.nodeName === "#text") {
            diffs.push(new Diff().setValue(this.options._const.action, this.options._const.addTextElement).setValue(this.options._const.route, route.concat(index1)).setValue(this.options._const.value, node.data));
            gaps1.splice(index1, 0, true);
            t1ChildNodes.splice(index1, 0, {
              nodeName: "#text",
              data: node.data
            });
            shortest = Math.min(gaps1.length, gaps2.length);
          } else {
            diffs.push(new Diff().setValue(this.options._const.action, this.options._const.addElement).setValue(this.options._const.route, route.concat(index1)).setValue(this.options._const.element, cleanNode(node)));
            gaps1.splice(index1, 0, true);
            t1ChildNodes.splice(index1, 0, cleanNode(node));
            shortest = Math.min(gaps1.length, gaps2.length);
          }
        } else if (gaps1[index1] !== gaps2[index2]) {
          if (diffs.length > 0) {
            return diffs;
          }
          group = subtrees[gaps1[index1]];
          toGroup = Math.min(group.newValue, t1ChildNodes.length - group.length);
          if (toGroup !== group.oldValue && toGroup > -1) {
            destinationDifferent = false;
            for (var j = 0; j < group.length; j += 1) {
              if (!roughlyEqual(t1ChildNodes[toGroup + j], t1ChildNodes[group.oldValue + j], {}, false, true)) {
                destinationDifferent = true;
              }
            }
            if (destinationDifferent) {
              return [
                new Diff().setValue(this.options._const.action, this.options._const.relocateGroup).setValue(this.options._const.groupLength, group.length).setValue(this.options._const.from, group.oldValue).setValue(this.options._const.to, toGroup).setValue(this.options._const.route, route)
              ];
            }
          }
        }
      }
      return diffs;
    };
    DiffFinder2.prototype.findValueDiff = function(t1, t2, route) {
      var diffs = [];
      if (t1.selected !== t2.selected) {
        diffs.push(new Diff().setValue(this.options._const.action, this.options._const.modifySelected).setValue(this.options._const.oldValue, t1.selected).setValue(this.options._const.newValue, t2.selected).setValue(this.options._const.route, route));
      }
      if ((t1.value || t2.value) && t1.value !== t2.value && t1.nodeName !== "OPTION") {
        diffs.push(new Diff().setValue(this.options._const.action, this.options._const.modifyValue).setValue(this.options._const.oldValue, t1.value || "").setValue(this.options._const.newValue, t2.value || "").setValue(this.options._const.route, route));
      }
      if (t1.checked !== t2.checked) {
        diffs.push(new Diff().setValue(this.options._const.action, this.options._const.modifyChecked).setValue(this.options._const.oldValue, t1.checked).setValue(this.options._const.newValue, t2.checked).setValue(this.options._const.route, route));
      }
      return diffs;
    };
    return DiffFinder2;
  }()
);
var DEFAULT_OPTIONS = {
  debug: false,
  diffcap: 10,
  maxDepth: false,
  maxChildCount: 50,
  valueDiffing: true,
  simplifiedElementCheck: true,
  // syntax: textDiff: function (node, currentValue, expectedValue, newValue)
  textDiff: function(node, currentValue, expectedValue, newValue) {
    node.data = newValue;
    return;
  },
  // empty functions were benchmarked as running faster than both
  // `f && f()` and `if (f) { f(); }`
  preVirtualDiffApply: function() {
  },
  postVirtualDiffApply: function() {
  },
  preDiffApply: function() {
  },
  postDiffApply: function() {
  },
  filterOuterDiff: null,
  compress: false,
  _const: false,
  document: typeof window !== "undefined" && window.document ? window.document : false,
  components: []
};
var DiffDOM = (
  /** @class */
  function() {
    function DiffDOM2(options) {
      if (options === void 0) {
        options = {};
      }
      Object.entries(DEFAULT_OPTIONS).forEach(function(_a) {
        var key = _a[0], value = _a[1];
        if (!Object.prototype.hasOwnProperty.call(options, key)) {
          options[key] = value;
        }
      });
      if (!options._const) {
        var varNames = [
          "addAttribute",
          "modifyAttribute",
          "removeAttribute",
          "modifyTextElement",
          "relocateGroup",
          "removeElement",
          "addElement",
          "removeTextElement",
          "addTextElement",
          "replaceElement",
          "modifyValue",
          "modifyChecked",
          "modifySelected",
          "modifyComment",
          "action",
          "route",
          "oldValue",
          "newValue",
          "element",
          "group",
          "groupLength",
          "from",
          "to",
          "name",
          "value",
          "data",
          "attributes",
          "nodeName",
          "childNodes",
          "checked",
          "selected"
        ];
        var constNames_1 = {};
        if (options.compress) {
          varNames.forEach(function(varName, index) {
            return constNames_1[varName] = index;
          });
        } else {
          varNames.forEach(function(varName) {
            return constNames_1[varName] = varName;
          });
        }
        options._const = constNames_1;
      }
      this.options = options;
    }
    DiffDOM2.prototype.apply = function(tree, diffs) {
      return applyDOM(tree, diffs, this.options);
    };
    DiffDOM2.prototype.undo = function(tree, diffs) {
      return undoDOM(tree, diffs, this.options);
    };
    DiffDOM2.prototype.diff = function(t1Node, t2Node) {
      var finder = new DiffFinder(t1Node, t2Node, this.options);
      return finder.init();
    };
    return DiffDOM2;
  }()
);
var TraceLogger = (
  /** @class */
  function() {
    function TraceLogger2(obj) {
      if (obj === void 0) {
        obj = {};
      }
      var _this = this;
      this.pad = "\u2502   ";
      this.padding = "";
      this.tick = 1;
      this.messages = [];
      var wrapkey = function(obj2, key2) {
        var oldfn = obj2[key2];
        obj2[key2] = function() {
          var arguments$1 = arguments;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments$1[_i];
          }
          _this.fin(key2, Array.prototype.slice.call(args));
          var result = oldfn.apply(obj2, args);
          _this.fout(key2, result);
          return result;
        };
      };
      for (var key in obj) {
        if (typeof obj[key] === "function") {
          wrapkey(obj, key);
        }
      }
      this.log("\u250C TRACELOG START");
    }
    TraceLogger2.prototype.fin = function(fn, args) {
      this.padding += this.pad;
      this.log("\u251C\u2500> entering ".concat(fn), args);
    };
    TraceLogger2.prototype.fout = function(fn, result) {
      this.log("\u2502<\u2500\u2500\u2518 generated return value", result);
      this.padding = this.padding.substring(0, this.padding.length - this.pad.length);
    };
    TraceLogger2.prototype.format = function(s, tick) {
      var nf = function(t) {
        var tStr = "".concat(t);
        while (tStr.length < 4) {
          tStr = "0".concat(t);
        }
        return tStr;
      };
      return "".concat(nf(tick), "> ").concat(this.padding).concat(s);
    };
    TraceLogger2.prototype.log = function() {
      var arguments$1 = arguments;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments$1[_i];
      }
      var stringCollapse = function(v) {
        if (!v) {
          return "<falsey>";
        }
        if (typeof v === "string") {
          return v;
        }
        if (checkElementType(v, true, "HTMLElement")) {
          return v.outerHTML || "<empty>";
        }
        if (v instanceof Array) {
          return "[".concat(v.map(stringCollapse).join(","), "]");
        }
        return v.toString() || v.valueOf() || "<unknown>";
      };
      var s = args.map(stringCollapse).join(", ");
      this.messages.push(this.format(s, this.tick++));
    };
    TraceLogger2.prototype.toString = function() {
      var cap = "\xD7   ";
      var terminator = "\u2514\u2500\u2500\u2500";
      while (terminator.length <= this.padding.length + this.pad.length) {
        terminator += cap;
      }
      var _ = this.padding;
      this.padding = "";
      terminator = this.format(terminator, this.tick);
      this.padding = _;
      return "".concat(this.messages.join("\n"), "\n").concat(terminator);
    };
    return TraceLogger2;
  }()
);



/***/ }),

/***/ "../../node_modules/echarts/node_modules/tslib/tslib.es6.js":
/*!******************************************************************!*\
  !*** ../../node_modules/echarts/node_modules/tslib/tslib.es6.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __extends: () => (/* binding */ __extends)
/* harmony export */ });
/* unused harmony exports __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get: function() {
    return m[k];
  } });
} : function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  o[k2] = m[k];
};
function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || from);
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function(v) {
      return new Promise(function(a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
};
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}


/***/ }),

/***/ "../../node_modules/markdown-it/index.mjs":
/*!************************************************!*\
  !*** ../../node_modules/markdown-it/index.mjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _lib_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _lib_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/index.mjs */ "../../node_modules/markdown-it/lib/index.mjs");



/***/ }),

/***/ "../../node_modules/markdown-it/lib/common/html_blocks.mjs":
/*!*****************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/common/html_blocks.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
]);


/***/ }),

/***/ "../../node_modules/markdown-it/lib/common/html_re.mjs":
/*!*************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/common/html_re.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTML_OPEN_CLOSE_TAG_RE: () => (/* binding */ HTML_OPEN_CLOSE_TAG_RE),
/* harmony export */   HTML_TAG_RE: () => (/* binding */ HTML_TAG_RE)
/* harmony export */ });
const attr_name = "[a-zA-Z_:][a-zA-Z0-9:._-]*";
const unquoted = "[^\"'=<>`\\x00-\\x20]+";
const single_quoted = "'[^']*'";
const double_quoted = '"[^"]*"';
const attr_value = "(?:" + unquoted + "|" + single_quoted + "|" + double_quoted + ")";
const attribute = "(?:\\s+" + attr_name + "(?:\\s*=\\s*" + attr_value + ")?)";
const open_tag = "<[A-Za-z][A-Za-z0-9\\-]*" + attribute + "*\\s*\\/?>";
const close_tag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
const comment = "<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->";
const processing = "<[?][\\s\\S]*?[?]>";
const declaration = "<![A-Za-z][^>]*>";
const cdata = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
const HTML_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + "|" + comment + "|" + processing + "|" + declaration + "|" + cdata + ")");
const HTML_OPEN_CLOSE_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + ")");



/***/ }),

/***/ "../../node_modules/markdown-it/lib/common/utils.mjs":
/*!***********************************************************!*\
  !*** ../../node_modules/markdown-it/lib/common/utils.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayReplaceAt: () => (/* binding */ arrayReplaceAt),
/* harmony export */   assign: () => (/* binding */ assign),
/* harmony export */   escapeHtml: () => (/* binding */ escapeHtml),
/* harmony export */   escapeRE: () => (/* binding */ escapeRE),
/* harmony export */   fromCodePoint: () => (/* binding */ fromCodePoint),
/* harmony export */   has: () => (/* binding */ has),
/* harmony export */   isMdAsciiPunct: () => (/* binding */ isMdAsciiPunct),
/* harmony export */   isPunctChar: () => (/* binding */ isPunctChar),
/* harmony export */   isSpace: () => (/* binding */ isSpace),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isValidEntityCode: () => (/* binding */ isValidEntityCode),
/* harmony export */   isWhiteSpace: () => (/* binding */ isWhiteSpace),
/* harmony export */   lib: () => (/* binding */ lib),
/* harmony export */   normalizeReference: () => (/* binding */ normalizeReference),
/* harmony export */   unescapeAll: () => (/* binding */ unescapeAll),
/* harmony export */   unescapeMd: () => (/* binding */ unescapeMd)
/* harmony export */ });
/* harmony import */ var mdurl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdurl */ "../../node_modules/mdurl/index.mjs");
/* harmony import */ var uc_micro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uc.micro */ "../../node_modules/uc.micro/index.mjs");
/* harmony import */ var entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! entities */ "../../node_modules/entities/lib/esm/index.js");



function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function isString(obj) {
  return _class(obj) === "[object String]";
}
const _hasOwnProperty = Object.prototype.hasOwnProperty;
function has(object, key) {
  return _hasOwnProperty.call(object, key);
}
function assign(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  sources.forEach(function(source) {
    if (!source) {
      return;
    }
    if (typeof source !== "object") {
      throw new TypeError(source + "must be object");
    }
    Object.keys(source).forEach(function(key) {
      obj[key] = source[key];
    });
  });
  return obj;
}
function arrayReplaceAt(src, pos, newElements) {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
}
function isValidEntityCode(c) {
  if (c >= 55296 && c <= 57343) {
    return false;
  }
  if (c >= 64976 && c <= 65007) {
    return false;
  }
  if ((c & 65535) === 65535 || (c & 65535) === 65534) {
    return false;
  }
  if (c >= 0 && c <= 8) {
    return false;
  }
  if (c === 11) {
    return false;
  }
  if (c >= 14 && c <= 31) {
    return false;
  }
  if (c >= 127 && c <= 159) {
    return false;
  }
  if (c > 1114111) {
    return false;
  }
  return true;
}
function fromCodePoint(c) {
  if (c > 65535) {
    c -= 65536;
    const surrogate1 = 55296 + (c >> 10);
    const surrogate2 = 56320 + (c & 1023);
    return String.fromCharCode(surrogate1, surrogate2);
  }
  return String.fromCharCode(c);
}
const UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
const ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
const UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + "|" + ENTITY_RE.source, "gi");
const DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function replaceEntityPattern(match, name) {
  if (name.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name)) {
    const code = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
    if (isValidEntityCode(code)) {
      return fromCodePoint(code);
    }
    return match;
  }
  const decoded = (0,entities__WEBPACK_IMPORTED_MODULE_2__.decodeHTML)(match);
  if (decoded !== match) {
    return decoded;
  }
  return match;
}
function unescapeMd(str) {
  if (str.indexOf("\\") < 0) {
    return str;
  }
  return str.replace(UNESCAPE_MD_RE, "$1");
}
function unescapeAll(str) {
  if (str.indexOf("\\") < 0 && str.indexOf("&") < 0) {
    return str;
  }
  return str.replace(UNESCAPE_ALL_RE, function(match, escaped, entity) {
    if (escaped) {
      return escaped;
    }
    return replaceEntityPattern(match, entity);
  });
}
const HTML_ESCAPE_TEST_RE = /[&<>"]/;
const HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
const HTML_REPLACEMENTS = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}
function escapeHtml(str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
  }
  return str;
}
const REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
function escapeRE(str) {
  return str.replace(REGEXP_ESCAPE_RE, "\\$&");
}
function isSpace(code) {
  switch (code) {
    case 9:
    case 32:
      return true;
  }
  return false;
}
function isWhiteSpace(code) {
  if (code >= 8192 && code <= 8202) {
    return true;
  }
  switch (code) {
    case 9:
    // \t
    case 10:
    // \n
    case 11:
    // \v
    case 12:
    // \f
    case 13:
    // \r
    case 32:
    case 160:
    case 5760:
    case 8239:
    case 8287:
    case 12288:
      return true;
  }
  return false;
}
function isPunctChar(ch) {
  return uc_micro__WEBPACK_IMPORTED_MODULE_1__.P.test(ch) || uc_micro__WEBPACK_IMPORTED_MODULE_1__.S.test(ch);
}
function isMdAsciiPunct(ch) {
  switch (ch) {
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 124:
    case 125:
    case 126:
      return true;
    default:
      return false;
  }
}
function normalizeReference(str) {
  str = str.trim().replace(/\s+/g, " ");
  if ("\u1E9E".toLowerCase() === "\u1E7E") {
    str = str.replace(/ẞ/g, "\xDF");
  }
  return str.toLowerCase().toUpperCase();
}
const lib = { mdurl: mdurl__WEBPACK_IMPORTED_MODULE_0__, ucmicro: uc_micro__WEBPACK_IMPORTED_MODULE_1__ };



/***/ }),

/***/ "../../node_modules/markdown-it/lib/helpers/index.mjs":
/*!************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/helpers/index.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseLinkDestination: () => (/* reexport safe */ _parse_link_destination_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   parseLinkLabel: () => (/* reexport safe */ _parse_link_label_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   parseLinkTitle: () => (/* reexport safe */ _parse_link_title_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _parse_link_label_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse_link_label.mjs */ "../../node_modules/markdown-it/lib/helpers/parse_link_label.mjs");
/* harmony import */ var _parse_link_destination_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse_link_destination.mjs */ "../../node_modules/markdown-it/lib/helpers/parse_link_destination.mjs");
/* harmony import */ var _parse_link_title_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parse_link_title.mjs */ "../../node_modules/markdown-it/lib/helpers/parse_link_title.mjs");






/***/ }),

/***/ "../../node_modules/markdown-it/lib/helpers/parse_link_destination.mjs":
/*!*****************************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/helpers/parse_link_destination.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseLinkDestination)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

function parseLinkDestination(str, start, max) {
  let code;
  let pos = start;
  const result = {
    ok: false,
    pos: 0,
    str: ""
  };
  if (str.charCodeAt(pos) === 60) {
    pos++;
    while (pos < max) {
      code = str.charCodeAt(pos);
      if (code === 10) {
        return result;
      }
      if (code === 60) {
        return result;
      }
      if (code === 62) {
        result.pos = pos + 1;
        result.str = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.unescapeAll)(str.slice(start + 1, pos));
        result.ok = true;
        return result;
      }
      if (code === 92 && pos + 1 < max) {
        pos += 2;
        continue;
      }
      pos++;
    }
    return result;
  }
  let level = 0;
  while (pos < max) {
    code = str.charCodeAt(pos);
    if (code === 32) {
      break;
    }
    if (code < 32 || code === 127) {
      break;
    }
    if (code === 92 && pos + 1 < max) {
      if (str.charCodeAt(pos + 1) === 32) {
        break;
      }
      pos += 2;
      continue;
    }
    if (code === 40) {
      level++;
      if (level > 32) {
        return result;
      }
    }
    if (code === 41) {
      if (level === 0) {
        break;
      }
      level--;
    }
    pos++;
  }
  if (start === pos) {
    return result;
  }
  if (level !== 0) {
    return result;
  }
  result.str = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.unescapeAll)(str.slice(start, pos));
  result.pos = pos;
  result.ok = true;
  return result;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/helpers/parse_link_label.mjs":
/*!***********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/helpers/parse_link_label.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseLinkLabel)
/* harmony export */ });
function parseLinkLabel(state, start, disableNested) {
  let level, found, marker, prevPos;
  const max = state.posMax;
  const oldPos = state.pos;
  state.pos = start + 1;
  level = 1;
  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 93) {
      level--;
      if (level === 0) {
        found = true;
        break;
      }
    }
    prevPos = state.pos;
    state.md.inline.skipToken(state);
    if (marker === 91) {
      if (prevPos === state.pos - 1) {
        level++;
      } else if (disableNested) {
        state.pos = oldPos;
        return -1;
      }
    }
  }
  let labelEnd = -1;
  if (found) {
    labelEnd = state.pos;
  }
  state.pos = oldPos;
  return labelEnd;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/helpers/parse_link_title.mjs":
/*!***********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/helpers/parse_link_title.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseLinkTitle)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

function parseLinkTitle(str, start, max, prev_state) {
  let code;
  let pos = start;
  const state = {
    // if `true`, this is a valid link title
    ok: false,
    // if `true`, this link can be continued on the next line
    can_continue: false,
    // if `ok`, it's the position of the first character after the closing marker
    pos: 0,
    // if `ok`, it's the unescaped title
    str: "",
    // expected closing marker character code
    marker: 0
  };
  if (prev_state) {
    state.str = prev_state.str;
    state.marker = prev_state.marker;
  } else {
    if (pos >= max) {
      return state;
    }
    let marker = str.charCodeAt(pos);
    if (marker !== 34 && marker !== 39 && marker !== 40) {
      return state;
    }
    start++;
    pos++;
    if (marker === 40) {
      marker = 41;
    }
    state.marker = marker;
  }
  while (pos < max) {
    code = str.charCodeAt(pos);
    if (code === state.marker) {
      state.pos = pos + 1;
      state.str += (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.unescapeAll)(str.slice(start, pos));
      state.ok = true;
      return state;
    } else if (code === 40 && state.marker === 41) {
      return state;
    } else if (code === 92 && pos + 1 < max) {
      pos++;
    }
    pos++;
  }
  state.can_continue = true;
  state.str += (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.unescapeAll)(str.slice(start, pos));
  return state;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/index.mjs":
/*!****************************************************!*\
  !*** ../../node_modules/markdown-it/lib/index.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");
/* harmony import */ var _helpers_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/index.mjs */ "../../node_modules/markdown-it/lib/helpers/index.mjs");
/* harmony import */ var _renderer_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderer.mjs */ "../../node_modules/markdown-it/lib/renderer.mjs");
/* harmony import */ var _parser_core_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parser_core.mjs */ "../../node_modules/markdown-it/lib/parser_core.mjs");
/* harmony import */ var _parser_block_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parser_block.mjs */ "../../node_modules/markdown-it/lib/parser_block.mjs");
/* harmony import */ var _parser_inline_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parser_inline.mjs */ "../../node_modules/markdown-it/lib/parser_inline.mjs");
/* harmony import */ var linkify_it__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! linkify-it */ "../../node_modules/linkify-it/index.mjs");
/* harmony import */ var mdurl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mdurl */ "../../node_modules/mdurl/index.mjs");
/* harmony import */ var punycode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! punycode.js */ "../../node_modules/punycode.js/punycode.es6.js");
/* harmony import */ var _presets_default_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./presets/default.mjs */ "../../node_modules/markdown-it/lib/presets/default.mjs");
/* harmony import */ var _presets_zero_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./presets/zero.mjs */ "../../node_modules/markdown-it/lib/presets/zero.mjs");
/* harmony import */ var _presets_commonmark_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./presets/commonmark.mjs */ "../../node_modules/markdown-it/lib/presets/commonmark.mjs");












const config = {
  default: _presets_default_mjs__WEBPACK_IMPORTED_MODULE_9__["default"],
  zero: _presets_zero_mjs__WEBPACK_IMPORTED_MODULE_10__["default"],
  commonmark: _presets_commonmark_mjs__WEBPACK_IMPORTED_MODULE_11__["default"]
};
const BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
const GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
function validateLink(url) {
  const str = url.trim().toLowerCase();
  return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) : true;
}
const RECODE_HOSTNAME_FOR = ["http:", "https:", "mailto:"];
function normalizeLink(url) {
  const parsed = mdurl__WEBPACK_IMPORTED_MODULE_7__.parse(url, true);
  if (parsed.hostname) {
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode_js__WEBPACK_IMPORTED_MODULE_8__["default"].toASCII(parsed.hostname);
      } catch (er) {
      }
    }
  }
  return mdurl__WEBPACK_IMPORTED_MODULE_7__.encode(mdurl__WEBPACK_IMPORTED_MODULE_7__.format(parsed));
}
function normalizeLinkText(url) {
  const parsed = mdurl__WEBPACK_IMPORTED_MODULE_7__.parse(url, true);
  if (parsed.hostname) {
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode_js__WEBPACK_IMPORTED_MODULE_8__["default"].toUnicode(parsed.hostname);
      } catch (er) {
      }
    }
  }
  return mdurl__WEBPACK_IMPORTED_MODULE_7__.decode(mdurl__WEBPACK_IMPORTED_MODULE_7__.format(parsed), mdurl__WEBPACK_IMPORTED_MODULE_7__.decode.defaultChars + "%");
}
function MarkdownIt(presetName, options) {
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options);
  }
  if (!options) {
    if (!_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isString(presetName)) {
      options = presetName || {};
      presetName = "default";
    }
  }
  this.inline = new _parser_inline_mjs__WEBPACK_IMPORTED_MODULE_5__["default"]();
  this.block = new _parser_block_mjs__WEBPACK_IMPORTED_MODULE_4__["default"]();
  this.core = new _parser_core_mjs__WEBPACK_IMPORTED_MODULE_3__["default"]();
  this.renderer = new _renderer_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]();
  this.linkify = new linkify_it__WEBPACK_IMPORTED_MODULE_6__["default"]();
  this.validateLink = validateLink;
  this.normalizeLink = normalizeLink;
  this.normalizeLinkText = normalizeLinkText;
  this.utils = _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__;
  this.helpers = _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.assign({}, _helpers_index_mjs__WEBPACK_IMPORTED_MODULE_1__);
  this.options = {};
  this.configure(presetName);
  if (options) {
    this.set(options);
  }
}
MarkdownIt.prototype.set = function(options) {
  _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.assign(this.options, options);
  return this;
};
MarkdownIt.prototype.configure = function(presets) {
  const self = this;
  if (_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isString(presets)) {
    const presetName = presets;
    presets = config[presetName];
    if (!presets) {
      throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
    }
  }
  if (!presets) {
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  }
  if (presets.options) {
    self.set(presets.options);
  }
  if (presets.components) {
    Object.keys(presets.components).forEach(function(name) {
      if (presets.components[name].rules) {
        self[name].ruler.enableOnly(presets.components[name].rules);
      }
      if (presets.components[name].rules2) {
        self[name].ruler2.enableOnly(presets.components[name].rules2);
      }
    });
  }
  return this;
};
MarkdownIt.prototype.enable = function(list, ignoreInvalid) {
  let result = [];
  if (!Array.isArray(list)) {
    list = [list];
  }
  ["core", "block", "inline"].forEach(function(chain) {
    result = result.concat(this[chain].ruler.enable(list, true));
  }, this);
  result = result.concat(this.inline.ruler2.enable(list, true));
  const missed = list.filter(function(name) {
    return result.indexOf(name) < 0;
  });
  if (missed.length && !ignoreInvalid) {
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + missed);
  }
  return this;
};
MarkdownIt.prototype.disable = function(list, ignoreInvalid) {
  let result = [];
  if (!Array.isArray(list)) {
    list = [list];
  }
  ["core", "block", "inline"].forEach(function(chain) {
    result = result.concat(this[chain].ruler.disable(list, true));
  }, this);
  result = result.concat(this.inline.ruler2.disable(list, true));
  const missed = list.filter(function(name) {
    return result.indexOf(name) < 0;
  });
  if (missed.length && !ignoreInvalid) {
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + missed);
  }
  return this;
};
MarkdownIt.prototype.use = function(plugin) {
  const args = [this].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this;
};
MarkdownIt.prototype.parse = function(src, env) {
  if (typeof src !== "string") {
    throw new Error("Input data should be a String");
  }
  const state = new this.core.State(src, this, env);
  this.core.process(state);
  return state.tokens;
};
MarkdownIt.prototype.render = function(src, env) {
  env = env || {};
  return this.renderer.render(this.parse(src, env), this.options, env);
};
MarkdownIt.prototype.parseInline = function(src, env) {
  const state = new this.core.State(src, this, env);
  state.inlineMode = true;
  this.core.process(state);
  return state.tokens;
};
MarkdownIt.prototype.renderInline = function(src, env) {
  env = env || {};
  return this.renderer.render(this.parseInline(src, env), this.options, env);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MarkdownIt);


/***/ }),

/***/ "../../node_modules/markdown-it/lib/parser_block.mjs":
/*!***********************************************************!*\
  !*** ../../node_modules/markdown-it/lib/parser_block.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ruler_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ruler.mjs */ "../../node_modules/markdown-it/lib/ruler.mjs");
/* harmony import */ var _rules_block_state_block_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rules_block/state_block.mjs */ "../../node_modules/markdown-it/lib/rules_block/state_block.mjs");
/* harmony import */ var _rules_block_table_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rules_block/table.mjs */ "../../node_modules/markdown-it/lib/rules_block/table.mjs");
/* harmony import */ var _rules_block_code_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rules_block/code.mjs */ "../../node_modules/markdown-it/lib/rules_block/code.mjs");
/* harmony import */ var _rules_block_fence_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rules_block/fence.mjs */ "../../node_modules/markdown-it/lib/rules_block/fence.mjs");
/* harmony import */ var _rules_block_blockquote_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rules_block/blockquote.mjs */ "../../node_modules/markdown-it/lib/rules_block/blockquote.mjs");
/* harmony import */ var _rules_block_hr_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rules_block/hr.mjs */ "../../node_modules/markdown-it/lib/rules_block/hr.mjs");
/* harmony import */ var _rules_block_list_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rules_block/list.mjs */ "../../node_modules/markdown-it/lib/rules_block/list.mjs");
/* harmony import */ var _rules_block_reference_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rules_block/reference.mjs */ "../../node_modules/markdown-it/lib/rules_block/reference.mjs");
/* harmony import */ var _rules_block_html_block_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./rules_block/html_block.mjs */ "../../node_modules/markdown-it/lib/rules_block/html_block.mjs");
/* harmony import */ var _rules_block_heading_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./rules_block/heading.mjs */ "../../node_modules/markdown-it/lib/rules_block/heading.mjs");
/* harmony import */ var _rules_block_lheading_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./rules_block/lheading.mjs */ "../../node_modules/markdown-it/lib/rules_block/lheading.mjs");
/* harmony import */ var _rules_block_paragraph_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./rules_block/paragraph.mjs */ "../../node_modules/markdown-it/lib/rules_block/paragraph.mjs");













const _rules = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", _rules_block_table_mjs__WEBPACK_IMPORTED_MODULE_2__["default"], ["paragraph", "reference"]],
  ["code", _rules_block_code_mjs__WEBPACK_IMPORTED_MODULE_3__["default"]],
  ["fence", _rules_block_fence_mjs__WEBPACK_IMPORTED_MODULE_4__["default"], ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", _rules_block_blockquote_mjs__WEBPACK_IMPORTED_MODULE_5__["default"], ["paragraph", "reference", "blockquote", "list"]],
  ["hr", _rules_block_hr_mjs__WEBPACK_IMPORTED_MODULE_6__["default"], ["paragraph", "reference", "blockquote", "list"]],
  ["list", _rules_block_list_mjs__WEBPACK_IMPORTED_MODULE_7__["default"], ["paragraph", "reference", "blockquote"]],
  ["reference", _rules_block_reference_mjs__WEBPACK_IMPORTED_MODULE_8__["default"]],
  ["html_block", _rules_block_html_block_mjs__WEBPACK_IMPORTED_MODULE_9__["default"], ["paragraph", "reference", "blockquote"]],
  ["heading", _rules_block_heading_mjs__WEBPACK_IMPORTED_MODULE_10__["default"], ["paragraph", "reference", "blockquote"]],
  ["lheading", _rules_block_lheading_mjs__WEBPACK_IMPORTED_MODULE_11__["default"]],
  ["paragraph", _rules_block_paragraph_mjs__WEBPACK_IMPORTED_MODULE_12__["default"]]
];
function ParserBlock() {
  this.ruler = new _ruler_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]();
  for (let i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1], { alt: (_rules[i][2] || []).slice() });
  }
}
ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
  const rules = this.ruler.getRules("");
  const len = rules.length;
  const maxNesting = state.md.options.maxNesting;
  let line = startLine;
  let hasEmptyLines = false;
  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) {
      break;
    }
    if (state.sCount[line] < state.blkIndent) {
      break;
    }
    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    }
    const prevLine = state.line;
    let ok = false;
    for (let i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) {
        if (prevLine >= state.line) {
          throw new Error("block rule didn't increment state.line");
        }
        break;
      }
    }
    if (!ok) throw new Error("none of the block rules matched");
    state.tight = !hasEmptyLines;
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }
    line = state.line;
    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      state.line = line;
    }
  }
};
ParserBlock.prototype.parse = function(src, md, env, outTokens) {
  if (!src) {
    return;
  }
  const state = new this.State(src, md, env, outTokens);
  this.tokenize(state, state.line, state.lineMax);
};
ParserBlock.prototype.State = _rules_block_state_block_mjs__WEBPACK_IMPORTED_MODULE_1__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ParserBlock);


/***/ }),

/***/ "../../node_modules/markdown-it/lib/parser_core.mjs":
/*!**********************************************************!*\
  !*** ../../node_modules/markdown-it/lib/parser_core.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ruler_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ruler.mjs */ "../../node_modules/markdown-it/lib/ruler.mjs");
/* harmony import */ var _rules_core_state_core_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rules_core/state_core.mjs */ "../../node_modules/markdown-it/lib/rules_core/state_core.mjs");
/* harmony import */ var _rules_core_normalize_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rules_core/normalize.mjs */ "../../node_modules/markdown-it/lib/rules_core/normalize.mjs");
/* harmony import */ var _rules_core_block_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rules_core/block.mjs */ "../../node_modules/markdown-it/lib/rules_core/block.mjs");
/* harmony import */ var _rules_core_inline_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rules_core/inline.mjs */ "../../node_modules/markdown-it/lib/rules_core/inline.mjs");
/* harmony import */ var _rules_core_linkify_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rules_core/linkify.mjs */ "../../node_modules/markdown-it/lib/rules_core/linkify.mjs");
/* harmony import */ var _rules_core_replacements_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rules_core/replacements.mjs */ "../../node_modules/markdown-it/lib/rules_core/replacements.mjs");
/* harmony import */ var _rules_core_smartquotes_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rules_core/smartquotes.mjs */ "../../node_modules/markdown-it/lib/rules_core/smartquotes.mjs");
/* harmony import */ var _rules_core_text_join_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rules_core/text_join.mjs */ "../../node_modules/markdown-it/lib/rules_core/text_join.mjs");









const _rules = [
  ["normalize", _rules_core_normalize_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]],
  ["block", _rules_core_block_mjs__WEBPACK_IMPORTED_MODULE_3__["default"]],
  ["inline", _rules_core_inline_mjs__WEBPACK_IMPORTED_MODULE_4__["default"]],
  ["linkify", _rules_core_linkify_mjs__WEBPACK_IMPORTED_MODULE_5__["default"]],
  ["replacements", _rules_core_replacements_mjs__WEBPACK_IMPORTED_MODULE_6__["default"]],
  ["smartquotes", _rules_core_smartquotes_mjs__WEBPACK_IMPORTED_MODULE_7__["default"]],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ["text_join", _rules_core_text_join_mjs__WEBPACK_IMPORTED_MODULE_8__["default"]]
];
function Core() {
  this.ruler = new _ruler_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]();
  for (let i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
}
Core.prototype.process = function(state) {
  const rules = this.ruler.getRules("");
  for (let i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};
Core.prototype.State = _rules_core_state_core_mjs__WEBPACK_IMPORTED_MODULE_1__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Core);


/***/ }),

/***/ "../../node_modules/markdown-it/lib/parser_inline.mjs":
/*!************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/parser_inline.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ruler_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ruler.mjs */ "../../node_modules/markdown-it/lib/ruler.mjs");
/* harmony import */ var _rules_inline_state_inline_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rules_inline/state_inline.mjs */ "../../node_modules/markdown-it/lib/rules_inline/state_inline.mjs");
/* harmony import */ var _rules_inline_text_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rules_inline/text.mjs */ "../../node_modules/markdown-it/lib/rules_inline/text.mjs");
/* harmony import */ var _rules_inline_linkify_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rules_inline/linkify.mjs */ "../../node_modules/markdown-it/lib/rules_inline/linkify.mjs");
/* harmony import */ var _rules_inline_newline_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rules_inline/newline.mjs */ "../../node_modules/markdown-it/lib/rules_inline/newline.mjs");
/* harmony import */ var _rules_inline_escape_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rules_inline/escape.mjs */ "../../node_modules/markdown-it/lib/rules_inline/escape.mjs");
/* harmony import */ var _rules_inline_backticks_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rules_inline/backticks.mjs */ "../../node_modules/markdown-it/lib/rules_inline/backticks.mjs");
/* harmony import */ var _rules_inline_strikethrough_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rules_inline/strikethrough.mjs */ "../../node_modules/markdown-it/lib/rules_inline/strikethrough.mjs");
/* harmony import */ var _rules_inline_emphasis_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rules_inline/emphasis.mjs */ "../../node_modules/markdown-it/lib/rules_inline/emphasis.mjs");
/* harmony import */ var _rules_inline_link_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./rules_inline/link.mjs */ "../../node_modules/markdown-it/lib/rules_inline/link.mjs");
/* harmony import */ var _rules_inline_image_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./rules_inline/image.mjs */ "../../node_modules/markdown-it/lib/rules_inline/image.mjs");
/* harmony import */ var _rules_inline_autolink_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./rules_inline/autolink.mjs */ "../../node_modules/markdown-it/lib/rules_inline/autolink.mjs");
/* harmony import */ var _rules_inline_html_inline_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./rules_inline/html_inline.mjs */ "../../node_modules/markdown-it/lib/rules_inline/html_inline.mjs");
/* harmony import */ var _rules_inline_entity_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./rules_inline/entity.mjs */ "../../node_modules/markdown-it/lib/rules_inline/entity.mjs");
/* harmony import */ var _rules_inline_balance_pairs_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./rules_inline/balance_pairs.mjs */ "../../node_modules/markdown-it/lib/rules_inline/balance_pairs.mjs");
/* harmony import */ var _rules_inline_fragments_join_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./rules_inline/fragments_join.mjs */ "../../node_modules/markdown-it/lib/rules_inline/fragments_join.mjs");
















const _rules = [
  ["text", _rules_inline_text_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]],
  ["linkify", _rules_inline_linkify_mjs__WEBPACK_IMPORTED_MODULE_3__["default"]],
  ["newline", _rules_inline_newline_mjs__WEBPACK_IMPORTED_MODULE_4__["default"]],
  ["escape", _rules_inline_escape_mjs__WEBPACK_IMPORTED_MODULE_5__["default"]],
  ["backticks", _rules_inline_backticks_mjs__WEBPACK_IMPORTED_MODULE_6__["default"]],
  ["strikethrough", _rules_inline_strikethrough_mjs__WEBPACK_IMPORTED_MODULE_7__["default"].tokenize],
  ["emphasis", _rules_inline_emphasis_mjs__WEBPACK_IMPORTED_MODULE_8__["default"].tokenize],
  ["link", _rules_inline_link_mjs__WEBPACK_IMPORTED_MODULE_9__["default"]],
  ["image", _rules_inline_image_mjs__WEBPACK_IMPORTED_MODULE_10__["default"]],
  ["autolink", _rules_inline_autolink_mjs__WEBPACK_IMPORTED_MODULE_11__["default"]],
  ["html_inline", _rules_inline_html_inline_mjs__WEBPACK_IMPORTED_MODULE_12__["default"]],
  ["entity", _rules_inline_entity_mjs__WEBPACK_IMPORTED_MODULE_13__["default"]]
];
const _rules2 = [
  ["balance_pairs", _rules_inline_balance_pairs_mjs__WEBPACK_IMPORTED_MODULE_14__["default"]],
  ["strikethrough", _rules_inline_strikethrough_mjs__WEBPACK_IMPORTED_MODULE_7__["default"].postProcess],
  ["emphasis", _rules_inline_emphasis_mjs__WEBPACK_IMPORTED_MODULE_8__["default"].postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ["fragments_join", _rules_inline_fragments_join_mjs__WEBPACK_IMPORTED_MODULE_15__["default"]]
];
function ParserInline() {
  this.ruler = new _ruler_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]();
  for (let i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
  this.ruler2 = new _ruler_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]();
  for (let i = 0; i < _rules2.length; i++) {
    this.ruler2.push(_rules2[i][0], _rules2[i][1]);
  }
}
ParserInline.prototype.skipToken = function(state) {
  const pos = state.pos;
  const rules = this.ruler.getRules("");
  const len = rules.length;
  const maxNesting = state.md.options.maxNesting;
  const cache = state.cache;
  if (typeof cache[pos] !== "undefined") {
    state.pos = cache[pos];
    return;
  }
  let ok = false;
  if (state.level < maxNesting) {
    for (let i = 0; i < len; i++) {
      state.level++;
      ok = rules[i](state, true);
      state.level--;
      if (ok) {
        if (pos >= state.pos) {
          throw new Error("inline rule didn't increment state.pos");
        }
        break;
      }
    }
  } else {
    state.pos = state.posMax;
  }
  if (!ok) {
    state.pos++;
  }
  cache[pos] = state.pos;
};
ParserInline.prototype.tokenize = function(state) {
  const rules = this.ruler.getRules("");
  const len = rules.length;
  const end = state.posMax;
  const maxNesting = state.md.options.maxNesting;
  while (state.pos < end) {
    const prevPos = state.pos;
    let ok = false;
    if (state.level < maxNesting) {
      for (let i = 0; i < len; i++) {
        ok = rules[i](state, false);
        if (ok) {
          if (prevPos >= state.pos) {
            throw new Error("inline rule didn't increment state.pos");
          }
          break;
        }
      }
    }
    if (ok) {
      if (state.pos >= end) {
        break;
      }
      continue;
    }
    state.pending += state.src[state.pos++];
  }
  if (state.pending) {
    state.pushPending();
  }
};
ParserInline.prototype.parse = function(str, md, env, outTokens) {
  const state = new this.State(str, md, env, outTokens);
  this.tokenize(state);
  const rules = this.ruler2.getRules("");
  const len = rules.length;
  for (let i = 0; i < len; i++) {
    rules[i](state);
  }
};
ParserInline.prototype.State = _rules_inline_state_inline_mjs__WEBPACK_IMPORTED_MODULE_1__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ParserInline);


/***/ }),

/***/ "../../node_modules/markdown-it/lib/presets/commonmark.mjs":
/*!*****************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/presets/commonmark.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  options: {
    // Enable HTML tags in source
    html: true,
    // Use '/' to close single tags (<br />)
    xhtmlOut: true,
    // Convert '\n' in paragraphs into <br>
    breaks: false,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: false,
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "\u201C\u201D\u2018\u2019",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "fragments_join"
      ]
    }
  }
});


/***/ }),

/***/ "../../node_modules/markdown-it/lib/presets/default.mjs":
/*!**************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/presets/default.mjs ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  options: {
    // Enable HTML tags in source
    html: false,
    // Use '/' to close single tags (<br />)
    xhtmlOut: false,
    // Convert '\n' in paragraphs into <br>
    breaks: false,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: false,
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "\u201C\u201D\u2018\u2019",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 100
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
});


/***/ }),

/***/ "../../node_modules/markdown-it/lib/presets/zero.mjs":
/*!***********************************************************!*\
  !*** ../../node_modules/markdown-it/lib/presets/zero.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  options: {
    // Enable HTML tags in source
    html: false,
    // Use '/' to close single tags (<br />)
    xhtmlOut: false,
    // Convert '\n' in paragraphs into <br>
    breaks: false,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: false,
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "\u201C\u201D\u2018\u2019",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "fragments_join"
      ]
    }
  }
});


/***/ }),

/***/ "../../node_modules/markdown-it/lib/renderer.mjs":
/*!*******************************************************!*\
  !*** ../../node_modules/markdown-it/lib/renderer.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

const default_rules = {};
default_rules.code_inline = function(tokens, idx, options, env, slf) {
  const token = tokens[idx];
  return "<code" + slf.renderAttrs(token) + ">" + (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.escapeHtml)(token.content) + "</code>";
};
default_rules.code_block = function(tokens, idx, options, env, slf) {
  const token = tokens[idx];
  return "<pre" + slf.renderAttrs(token) + "><code>" + (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.escapeHtml)(tokens[idx].content) + "</code></pre>\n";
};
default_rules.fence = function(tokens, idx, options, env, slf) {
  const token = tokens[idx];
  const info = token.info ? (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.unescapeAll)(token.info).trim() : "";
  let langName = "";
  let langAttrs = "";
  if (info) {
    const arr = info.split(/(\s+)/g);
    langName = arr[0];
    langAttrs = arr.slice(2).join("");
  }
  let highlighted;
  if (options.highlight) {
    highlighted = options.highlight(token.content, langName, langAttrs) || (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.escapeHtml)(token.content);
  } else {
    highlighted = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.escapeHtml)(token.content);
  }
  if (highlighted.indexOf("<pre") === 0) {
    return highlighted + "\n";
  }
  if (info) {
    const i = token.attrIndex("class");
    const tmpAttrs = token.attrs ? token.attrs.slice() : [];
    if (i < 0) {
      tmpAttrs.push(["class", options.langPrefix + langName]);
    } else {
      tmpAttrs[i] = tmpAttrs[i].slice();
      tmpAttrs[i][1] += " " + options.langPrefix + langName;
    }
    const tmpToken = {
      attrs: tmpAttrs
    };
    return `<pre><code${slf.renderAttrs(tmpToken)}>${highlighted}</code></pre>
`;
  }
  return `<pre><code${slf.renderAttrs(token)}>${highlighted}</code></pre>
`;
};
default_rules.image = function(tokens, idx, options, env, slf) {
  const token = tokens[idx];
  token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(token.children, options, env);
  return slf.renderToken(tokens, idx, options);
};
default_rules.hardbreak = function(tokens, idx, options) {
  return options.xhtmlOut ? "<br />\n" : "<br>\n";
};
default_rules.softbreak = function(tokens, idx, options) {
  return options.breaks ? options.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
};
default_rules.text = function(tokens, idx) {
  return (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.escapeHtml)(tokens[idx].content);
};
default_rules.html_block = function(tokens, idx) {
  return tokens[idx].content;
};
default_rules.html_inline = function(tokens, idx) {
  return tokens[idx].content;
};
function Renderer() {
  this.rules = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.assign)({}, default_rules);
}
Renderer.prototype.renderAttrs = function renderAttrs(token) {
  let i, l, result;
  if (!token.attrs) {
    return "";
  }
  result = "";
  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += " " + (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.escapeHtml)(token.attrs[i][0]) + '="' + (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.escapeHtml)(token.attrs[i][1]) + '"';
  }
  return result;
};
Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
  const token = tokens[idx];
  let result = "";
  if (token.hidden) {
    return "";
  }
  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += "\n";
  }
  result += (token.nesting === -1 ? "</" : "<") + token.tag;
  result += this.renderAttrs(token);
  if (token.nesting === 0 && options.xhtmlOut) {
    result += " /";
  }
  let needLf = false;
  if (token.block) {
    needLf = true;
    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        const nextToken = tokens[idx + 1];
        if (nextToken.type === "inline" || nextToken.hidden) {
          needLf = false;
        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          needLf = false;
        }
      }
    }
  }
  result += needLf ? ">\n" : ">";
  return result;
};
Renderer.prototype.renderInline = function(tokens, options, env) {
  let result = "";
  const rules = this.rules;
  for (let i = 0, len = tokens.length; i < len; i++) {
    const type = tokens[i].type;
    if (typeof rules[type] !== "undefined") {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options);
    }
  }
  return result;
};
Renderer.prototype.renderInlineAsText = function(tokens, options, env) {
  let result = "";
  for (let i = 0, len = tokens.length; i < len; i++) {
    switch (tokens[i].type) {
      case "text":
        result += tokens[i].content;
        break;
      case "image":
        result += this.renderInlineAsText(tokens[i].children, options, env);
        break;
      case "html_inline":
      case "html_block":
        result += tokens[i].content;
        break;
      case "softbreak":
      case "hardbreak":
        result += "\n";
        break;
      default:
    }
  }
  return result;
};
Renderer.prototype.render = function(tokens, options, env) {
  let result = "";
  const rules = this.rules;
  for (let i = 0, len = tokens.length; i < len; i++) {
    const type = tokens[i].type;
    if (type === "inline") {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rules[type] !== "undefined") {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options, env);
    }
  }
  return result;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Renderer);


/***/ }),

/***/ "../../node_modules/markdown-it/lib/ruler.mjs":
/*!****************************************************!*\
  !*** ../../node_modules/markdown-it/lib/ruler.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Ruler() {
  this.__rules__ = [];
  this.__cache__ = null;
}
Ruler.prototype.__find__ = function(name) {
  for (let i = 0; i < this.__rules__.length; i++) {
    if (this.__rules__[i].name === name) {
      return i;
    }
  }
  return -1;
};
Ruler.prototype.__compile__ = function() {
  const self = this;
  const chains = [""];
  self.__rules__.forEach(function(rule) {
    if (!rule.enabled) {
      return;
    }
    rule.alt.forEach(function(altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });
  self.__cache__ = {};
  chains.forEach(function(chain) {
    self.__cache__[chain] = [];
    self.__rules__.forEach(function(rule) {
      if (!rule.enabled) {
        return;
      }
      if (chain && rule.alt.indexOf(chain) < 0) {
        return;
      }
      self.__cache__[chain].push(rule.fn);
    });
  });
};
Ruler.prototype.at = function(name, fn, options) {
  const index = this.__find__(name);
  const opt = options || {};
  if (index === -1) {
    throw new Error("Parser rule not found: " + name);
  }
  this.__rules__[index].fn = fn;
  this.__rules__[index].alt = opt.alt || [];
  this.__cache__ = null;
};
Ruler.prototype.before = function(beforeName, ruleName, fn, options) {
  const index = this.__find__(beforeName);
  const opt = options || {};
  if (index === -1) {
    throw new Error("Parser rule not found: " + beforeName);
  }
  this.__rules__.splice(index, 0, {
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });
  this.__cache__ = null;
};
Ruler.prototype.after = function(afterName, ruleName, fn, options) {
  const index = this.__find__(afterName);
  const opt = options || {};
  if (index === -1) {
    throw new Error("Parser rule not found: " + afterName);
  }
  this.__rules__.splice(index + 1, 0, {
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });
  this.__cache__ = null;
};
Ruler.prototype.push = function(ruleName, fn, options) {
  const opt = options || {};
  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });
  this.__cache__ = null;
};
Ruler.prototype.enable = function(list, ignoreInvalid) {
  if (!Array.isArray(list)) {
    list = [list];
  }
  const result = [];
  list.forEach(function(name) {
    const idx = this.__find__(name);
    if (idx < 0) {
      if (ignoreInvalid) {
        return;
      }
      throw new Error("Rules manager: invalid rule name " + name);
    }
    this.__rules__[idx].enabled = true;
    result.push(name);
  }, this);
  this.__cache__ = null;
  return result;
};
Ruler.prototype.enableOnly = function(list, ignoreInvalid) {
  if (!Array.isArray(list)) {
    list = [list];
  }
  this.__rules__.forEach(function(rule) {
    rule.enabled = false;
  });
  this.enable(list, ignoreInvalid);
};
Ruler.prototype.disable = function(list, ignoreInvalid) {
  if (!Array.isArray(list)) {
    list = [list];
  }
  const result = [];
  list.forEach(function(name) {
    const idx = this.__find__(name);
    if (idx < 0) {
      if (ignoreInvalid) {
        return;
      }
      throw new Error("Rules manager: invalid rule name " + name);
    }
    this.__rules__[idx].enabled = false;
    result.push(name);
  }, this);
  this.__cache__ = null;
  return result;
};
Ruler.prototype.getRules = function(chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  }
  return this.__cache__[chainName] || [];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ruler);


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_block/blockquote.mjs":
/*!*********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_block/blockquote.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ blockquote)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

function blockquote(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  const oldLineMax = state.lineMax;
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  if (state.src.charCodeAt(pos) !== 62) {
    return false;
  }
  if (silent) {
    return true;
  }
  const oldBMarks = [];
  const oldBSCount = [];
  const oldSCount = [];
  const oldTShift = [];
  const terminatorRules = state.md.block.ruler.getRules("blockquote");
  const oldParentType = state.parentType;
  state.parentType = "blockquote";
  let lastLineEmpty = false;
  let nextLine;
  for (nextLine = startLine; nextLine < endLine; nextLine++) {
    const isOutdented = state.sCount[nextLine] < state.blkIndent;
    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];
    if (pos >= max) {
      break;
    }
    if (state.src.charCodeAt(pos++) === 62 && !isOutdented) {
      let initial = state.sCount[nextLine] + 1;
      let spaceAfterMarker;
      let adjustTab;
      if (state.src.charCodeAt(pos) === 32) {
        pos++;
        initial++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 9) {
        spaceAfterMarker = true;
        if ((state.bsCount[nextLine] + initial) % 4 === 3) {
          pos++;
          initial++;
          adjustTab = false;
        } else {
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }
      let offset = initial;
      oldBMarks.push(state.bMarks[nextLine]);
      state.bMarks[nextLine] = pos;
      while (pos < max) {
        const ch = state.src.charCodeAt(pos);
        if ((0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(ch)) {
          if (ch === 9) {
            offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }
        pos++;
      }
      lastLineEmpty = pos >= max;
      oldBSCount.push(state.bsCount[nextLine]);
      state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = offset - initial;
      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = pos - state.bMarks[nextLine];
      continue;
    }
    if (lastLineEmpty) {
      break;
    }
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      state.lineMax = nextLine;
      if (state.blkIndent !== 0) {
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] -= state.blkIndent;
      }
      break;
    }
    oldBMarks.push(state.bMarks[nextLine]);
    oldBSCount.push(state.bsCount[nextLine]);
    oldTShift.push(state.tShift[nextLine]);
    oldSCount.push(state.sCount[nextLine]);
    state.sCount[nextLine] = -1;
  }
  const oldIndent = state.blkIndent;
  state.blkIndent = 0;
  const token_o = state.push("blockquote_open", "blockquote", 1);
  token_o.markup = ">";
  const lines = [startLine, 0];
  token_o.map = lines;
  state.md.block.tokenize(state, startLine, nextLine);
  const token_c = state.push("blockquote_close", "blockquote", -1);
  token_c.markup = ">";
  state.lineMax = oldLineMax;
  state.parentType = oldParentType;
  lines[1] = state.line;
  for (let i = 0; i < oldTShift.length; i++) {
    state.bMarks[i + startLine] = oldBMarks[i];
    state.tShift[i + startLine] = oldTShift[i];
    state.sCount[i + startLine] = oldSCount[i];
    state.bsCount[i + startLine] = oldBSCount[i];
  }
  state.blkIndent = oldIndent;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_block/code.mjs":
/*!***************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_block/code.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ code)
/* harmony export */ });
function code(state, startLine, endLine) {
  if (state.sCount[startLine] - state.blkIndent < 4) {
    return false;
  }
  let nextLine = startLine + 1;
  let last = nextLine;
  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue;
    }
    break;
  }
  state.line = last;
  const token = state.push("code_block", "code", 0);
  token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + "\n";
  token.map = [startLine, state.line];
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_block/fence.mjs":
/*!****************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_block/fence.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fence)
/* harmony export */ });
function fence(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  if (pos + 3 > max) {
    return false;
  }
  const marker = state.src.charCodeAt(pos);
  if (marker !== 126 && marker !== 96) {
    return false;
  }
  let mem = pos;
  pos = state.skipChars(pos, marker);
  let len = pos - mem;
  if (len < 3) {
    return false;
  }
  const markup = state.src.slice(mem, pos);
  const params = state.src.slice(pos, max);
  if (marker === 96) {
    if (params.indexOf(String.fromCharCode(marker)) >= 0) {
      return false;
    }
  }
  if (silent) {
    return true;
  }
  let nextLine = startLine;
  let haveEndMarker = false;
  for (; ; ) {
    nextLine++;
    if (nextLine >= endLine) {
      break;
    }
    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];
    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      break;
    }
    if (state.src.charCodeAt(pos) !== marker) {
      continue;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      continue;
    }
    pos = state.skipChars(pos, marker);
    if (pos - mem < len) {
      continue;
    }
    pos = state.skipSpaces(pos);
    if (pos < max) {
      continue;
    }
    haveEndMarker = true;
    break;
  }
  len = state.sCount[startLine];
  state.line = nextLine + (haveEndMarker ? 1 : 0);
  const token = state.push("fence", "code", 0);
  token.info = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup = markup;
  token.map = [startLine, state.line];
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_block/heading.mjs":
/*!******************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_block/heading.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ heading)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

function heading(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  let ch = state.src.charCodeAt(pos);
  if (ch !== 35 || pos >= max) {
    return false;
  }
  let level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 35 && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }
  if (level > 6 || pos < max && !(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(ch)) {
    return false;
  }
  if (silent) {
    return true;
  }
  max = state.skipSpacesBack(max, pos);
  const tmp = state.skipCharsBack(max, 35, pos);
  if (tmp > pos && (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(state.src.charCodeAt(tmp - 1))) {
    max = tmp;
  }
  state.line = startLine + 1;
  const token_o = state.push("heading_open", "h" + String(level), 1);
  token_o.markup = "########".slice(0, level);
  token_o.map = [startLine, state.line];
  const token_i = state.push("inline", "", 0);
  token_i.content = state.src.slice(pos, max).trim();
  token_i.map = [startLine, state.line];
  token_i.children = [];
  const token_c = state.push("heading_close", "h" + String(level), -1);
  token_c.markup = "########".slice(0, level);
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_block/hr.mjs":
/*!*************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_block/hr.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hr)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

function hr(state, startLine, endLine, silent) {
  const max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  const marker = state.src.charCodeAt(pos++);
  if (marker !== 42 && marker !== 45 && marker !== 95) {
    return false;
  }
  let cnt = 1;
  while (pos < max) {
    const ch = state.src.charCodeAt(pos++);
    if (ch !== marker && !(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(ch)) {
      return false;
    }
    if (ch === marker) {
      cnt++;
    }
  }
  if (cnt < 3) {
    return false;
  }
  if (silent) {
    return true;
  }
  state.line = startLine + 1;
  const token = state.push("hr", "hr", 0);
  token.map = [startLine, state.line];
  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_block/html_block.mjs":
/*!*********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_block/html_block.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ html_block)
/* harmony export */ });
/* harmony import */ var _common_html_blocks_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/html_blocks.mjs */ "../../node_modules/markdown-it/lib/common/html_blocks.mjs");
/* harmony import */ var _common_html_re_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/html_re.mjs */ "../../node_modules/markdown-it/lib/common/html_re.mjs");


const HTML_SEQUENCES = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true],
  [/^<!--/, /-->/, true],
  [/^<\?/, /\?>/, true],
  [/^<![A-Z]/, />/, true],
  [/^<!\[CDATA\[/, /\]\]>/, true],
  [new RegExp("^</?(" + _common_html_blocks_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true],
  [new RegExp(_common_html_re_mjs__WEBPACK_IMPORTED_MODULE_1__.HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"), /^$/, false]
];
function html_block(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  if (!state.md.options.html) {
    return false;
  }
  if (state.src.charCodeAt(pos) !== 60) {
    return false;
  }
  let lineText = state.src.slice(pos, max);
  let i = 0;
  for (; i < HTML_SEQUENCES.length; i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) {
      break;
    }
  }
  if (i === HTML_SEQUENCES.length) {
    return false;
  }
  if (silent) {
    return HTML_SEQUENCES[i][2];
  }
  let nextLine = startLine + 1;
  if (!HTML_SEQUENCES[i][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) {
        break;
      }
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      lineText = state.src.slice(pos, max);
      if (HTML_SEQUENCES[i][1].test(lineText)) {
        if (lineText.length !== 0) {
          nextLine++;
        }
        break;
      }
    }
  }
  state.line = nextLine;
  const token = state.push("html_block", "", 0);
  token.map = [startLine, nextLine];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_block/lheading.mjs":
/*!*******************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_block/lheading.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ lheading)
/* harmony export */ });
function lheading(state, startLine, endLine) {
  const terminatorRules = state.md.block.ruler.getRules("paragraph");
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  const oldParentType = state.parentType;
  state.parentType = "paragraph";
  let level = 0;
  let marker;
  let nextLine = startLine + 1;
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    if (state.sCount[nextLine] - state.blkIndent > 3) {
      continue;
    }
    if (state.sCount[nextLine] >= state.blkIndent) {
      let pos = state.bMarks[nextLine] + state.tShift[nextLine];
      const max = state.eMarks[nextLine];
      if (pos < max) {
        marker = state.src.charCodeAt(pos);
        if (marker === 45 || marker === 61) {
          pos = state.skipChars(pos, marker);
          pos = state.skipSpaces(pos);
          if (pos >= max) {
            level = marker === 61 ? 1 : 2;
            break;
          }
        }
      }
    }
    if (state.sCount[nextLine] < 0) {
      continue;
    }
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
  }
  if (!level) {
    return false;
  }
  const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  state.line = nextLine + 1;
  const token_o = state.push("heading_open", "h" + String(level), 1);
  token_o.markup = String.fromCharCode(marker);
  token_o.map = [startLine, state.line];
  const token_i = state.push("inline", "", 0);
  token_i.content = content;
  token_i.map = [startLine, state.line - 1];
  token_i.children = [];
  const token_c = state.push("heading_close", "h" + String(level), -1);
  token_c.markup = String.fromCharCode(marker);
  state.parentType = oldParentType;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_block/list.mjs":
/*!***************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_block/list.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ list)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

function skipBulletListMarker(state, startLine) {
  const max = state.eMarks[startLine];
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  const marker = state.src.charCodeAt(pos++);
  if (marker !== 42 && marker !== 45 && marker !== 43) {
    return -1;
  }
  if (pos < max) {
    const ch = state.src.charCodeAt(pos);
    if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(ch)) {
      return -1;
    }
  }
  return pos;
}
function skipOrderedListMarker(state, startLine) {
  const start = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  let pos = start;
  if (pos + 1 >= max) {
    return -1;
  }
  let ch = state.src.charCodeAt(pos++);
  if (ch < 48 || ch > 57) {
    return -1;
  }
  for (; ; ) {
    if (pos >= max) {
      return -1;
    }
    ch = state.src.charCodeAt(pos++);
    if (ch >= 48 && ch <= 57) {
      if (pos - start >= 10) {
        return -1;
      }
      continue;
    }
    if (ch === 41 || ch === 46) {
      break;
    }
    return -1;
  }
  if (pos < max) {
    ch = state.src.charCodeAt(pos);
    if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(ch)) {
      return -1;
    }
  }
  return pos;
}
function markTightParagraphs(state, idx) {
  const level = state.level + 2;
  for (let i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === "paragraph_open") {
      state.tokens[i + 2].hidden = true;
      state.tokens[i].hidden = true;
      i += 2;
    }
  }
}
function list(state, startLine, endLine, silent) {
  let max, pos, start, token;
  let nextLine = startLine;
  let tight = true;
  if (state.sCount[nextLine] - state.blkIndent >= 4) {
    return false;
  }
  if (state.listIndent >= 0 && state.sCount[nextLine] - state.listIndent >= 4 && state.sCount[nextLine] < state.blkIndent) {
    return false;
  }
  let isTerminatingParagraph = false;
  if (silent && state.parentType === "paragraph") {
    if (state.sCount[nextLine] >= state.blkIndent) {
      isTerminatingParagraph = true;
    }
  }
  let isOrdered;
  let markerValue;
  let posAfterMarker;
  if ((posAfterMarker = skipOrderedListMarker(state, nextLine)) >= 0) {
    isOrdered = true;
    start = state.bMarks[nextLine] + state.tShift[nextLine];
    markerValue = Number(state.src.slice(start, posAfterMarker - 1));
    if (isTerminatingParagraph && markerValue !== 1) return false;
  } else if ((posAfterMarker = skipBulletListMarker(state, nextLine)) >= 0) {
    isOrdered = false;
  } else {
    return false;
  }
  if (isTerminatingParagraph) {
    if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine]) return false;
  }
  if (silent) {
    return true;
  }
  const markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
  const listTokIdx = state.tokens.length;
  if (isOrdered) {
    token = state.push("ordered_list_open", "ol", 1);
    if (markerValue !== 1) {
      token.attrs = [["start", markerValue]];
    }
  } else {
    token = state.push("bullet_list_open", "ul", 1);
  }
  const listLines = [nextLine, 0];
  token.map = listLines;
  token.markup = String.fromCharCode(markerCharCode);
  let prevEmptyEnd = false;
  const terminatorRules = state.md.block.ruler.getRules("list");
  const oldParentType = state.parentType;
  state.parentType = "list";
  while (nextLine < endLine) {
    pos = posAfterMarker;
    max = state.eMarks[nextLine];
    const initial = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine]);
    let offset = initial;
    while (pos < max) {
      const ch = state.src.charCodeAt(pos);
      if (ch === 9) {
        offset += 4 - (offset + state.bsCount[nextLine]) % 4;
      } else if (ch === 32) {
        offset++;
      } else {
        break;
      }
      pos++;
    }
    const contentStart = pos;
    let indentAfterMarker;
    if (contentStart >= max) {
      indentAfterMarker = 1;
    } else {
      indentAfterMarker = offset - initial;
    }
    if (indentAfterMarker > 4) {
      indentAfterMarker = 1;
    }
    const indent = initial + indentAfterMarker;
    token = state.push("list_item_open", "li", 1);
    token.markup = String.fromCharCode(markerCharCode);
    const itemLines = [nextLine, 0];
    token.map = itemLines;
    if (isOrdered) {
      token.info = state.src.slice(start, posAfterMarker - 1);
    }
    const oldTight = state.tight;
    const oldTShift = state.tShift[nextLine];
    const oldSCount = state.sCount[nextLine];
    const oldListIndent = state.listIndent;
    state.listIndent = state.blkIndent;
    state.blkIndent = indent;
    state.tight = true;
    state.tShift[nextLine] = contentStart - state.bMarks[nextLine];
    state.sCount[nextLine] = offset;
    if (contentStart >= max && state.isEmpty(nextLine + 1)) {
      state.line = Math.min(state.line + 2, endLine);
    } else {
      state.md.block.tokenize(state, nextLine, endLine, true);
    }
    if (!state.tight || prevEmptyEnd) {
      tight = false;
    }
    prevEmptyEnd = state.line - nextLine > 1 && state.isEmpty(state.line - 1);
    state.blkIndent = state.listIndent;
    state.listIndent = oldListIndent;
    state.tShift[nextLine] = oldTShift;
    state.sCount[nextLine] = oldSCount;
    state.tight = oldTight;
    token = state.push("list_item_close", "li", -1);
    token.markup = String.fromCharCode(markerCharCode);
    nextLine = state.line;
    itemLines[1] = nextLine;
    if (nextLine >= endLine) {
      break;
    }
    if (state.sCount[nextLine] < state.blkIndent) {
      break;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      break;
    }
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);
      if (posAfterMarker < 0) {
        break;
      }
      start = state.bMarks[nextLine] + state.tShift[nextLine];
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);
      if (posAfterMarker < 0) {
        break;
      }
    }
    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
      break;
    }
  }
  if (isOrdered) {
    token = state.push("ordered_list_close", "ol", -1);
  } else {
    token = state.push("bullet_list_close", "ul", -1);
  }
  token.markup = String.fromCharCode(markerCharCode);
  listLines[1] = nextLine;
  state.line = nextLine;
  state.parentType = oldParentType;
  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_block/paragraph.mjs":
/*!********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_block/paragraph.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ paragraph)
/* harmony export */ });
function paragraph(state, startLine, endLine) {
  const terminatorRules = state.md.block.ruler.getRules("paragraph");
  const oldParentType = state.parentType;
  let nextLine = startLine + 1;
  state.parentType = "paragraph";
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    if (state.sCount[nextLine] - state.blkIndent > 3) {
      continue;
    }
    if (state.sCount[nextLine] < 0) {
      continue;
    }
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
  }
  const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  state.line = nextLine;
  const token_o = state.push("paragraph_open", "p", 1);
  token_o.map = [startLine, state.line];
  const token_i = state.push("inline", "", 0);
  token_i.content = content;
  token_i.map = [startLine, state.line];
  token_i.children = [];
  state.push("paragraph_close", "p", -1);
  state.parentType = oldParentType;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_block/reference.mjs":
/*!********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_block/reference.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ reference)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

function reference(state, startLine, _endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  let nextLine = startLine + 1;
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  if (state.src.charCodeAt(pos) !== 91) {
    return false;
  }
  function getNextLine(nextLine2) {
    const endLine = state.lineMax;
    if (nextLine2 >= endLine || state.isEmpty(nextLine2)) {
      return null;
    }
    let isContinuation = false;
    if (state.sCount[nextLine2] - state.blkIndent > 3) {
      isContinuation = true;
    }
    if (state.sCount[nextLine2] < 0) {
      isContinuation = true;
    }
    if (!isContinuation) {
      const terminatorRules = state.md.block.ruler.getRules("reference");
      const oldParentType = state.parentType;
      state.parentType = "reference";
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine2, endLine, true)) {
          terminate = true;
          break;
        }
      }
      state.parentType = oldParentType;
      if (terminate) {
        return null;
      }
    }
    const pos2 = state.bMarks[nextLine2] + state.tShift[nextLine2];
    const max2 = state.eMarks[nextLine2];
    return state.src.slice(pos2, max2 + 1);
  }
  let str = state.src.slice(pos, max + 1);
  max = str.length;
  let labelEnd = -1;
  for (pos = 1; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 91) {
      return false;
    } else if (ch === 93) {
      labelEnd = pos;
      break;
    } else if (ch === 10) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max = str.length;
        nextLine++;
      }
    } else if (ch === 92) {
      pos++;
      if (pos < max && str.charCodeAt(pos) === 10) {
        const lineContent = getNextLine(nextLine);
        if (lineContent !== null) {
          str += lineContent;
          max = str.length;
          nextLine++;
        }
      }
    }
  }
  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) {
    return false;
  }
  for (pos = labelEnd + 2; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 10) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max = str.length;
        nextLine++;
      }
    } else if ((0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(ch)) {
    } else {
      break;
    }
  }
  const destRes = state.md.helpers.parseLinkDestination(str, pos, max);
  if (!destRes.ok) {
    return false;
  }
  const href = state.md.normalizeLink(destRes.str);
  if (!state.md.validateLink(href)) {
    return false;
  }
  pos = destRes.pos;
  const destEndPos = pos;
  const destEndLineNo = nextLine;
  const start = pos;
  for (; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 10) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max = str.length;
        nextLine++;
      }
    } else if ((0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(ch)) {
    } else {
      break;
    }
  }
  let titleRes = state.md.helpers.parseLinkTitle(str, pos, max);
  while (titleRes.can_continue) {
    const lineContent = getNextLine(nextLine);
    if (lineContent === null) break;
    str += lineContent;
    pos = max;
    max = str.length;
    nextLine++;
    titleRes = state.md.helpers.parseLinkTitle(str, pos, max, titleRes);
  }
  let title;
  if (pos < max && start !== pos && titleRes.ok) {
    title = titleRes.str;
    pos = titleRes.pos;
  } else {
    title = "";
    pos = destEndPos;
    nextLine = destEndLineNo;
  }
  while (pos < max) {
    const ch = str.charCodeAt(pos);
    if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(ch)) {
      break;
    }
    pos++;
  }
  if (pos < max && str.charCodeAt(pos) !== 10) {
    if (title) {
      title = "";
      pos = destEndPos;
      nextLine = destEndLineNo;
      while (pos < max) {
        const ch = str.charCodeAt(pos);
        if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(ch)) {
          break;
        }
        pos++;
      }
    }
  }
  if (pos < max && str.charCodeAt(pos) !== 10) {
    return false;
  }
  const label = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.normalizeReference)(str.slice(1, labelEnd));
  if (!label) {
    return false;
  }
  if (silent) {
    return true;
  }
  if (typeof state.env.references === "undefined") {
    state.env.references = {};
  }
  if (typeof state.env.references[label] === "undefined") {
    state.env.references[label] = { title, href };
  }
  state.line = nextLine;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_block/state_block.mjs":
/*!**********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_block/state_block.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _token_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../token.mjs */ "../../node_modules/markdown-it/lib/token.mjs");
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");


function StateBlock(src, md, env, tokens) {
  this.src = src;
  this.md = md;
  this.env = env;
  this.tokens = tokens;
  this.bMarks = [];
  this.eMarks = [];
  this.tShift = [];
  this.sCount = [];
  this.bsCount = [];
  this.blkIndent = 0;
  this.line = 0;
  this.lineMax = 0;
  this.tight = false;
  this.ddIndent = -1;
  this.listIndent = -1;
  this.parentType = "root";
  this.level = 0;
  const s = this.src;
  for (let start = 0, pos = 0, indent = 0, offset = 0, len = s.length, indent_found = false; pos < len; pos++) {
    const ch = s.charCodeAt(pos);
    if (!indent_found) {
      if ((0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isSpace)(ch)) {
        indent++;
        if (ch === 9) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
        continue;
      } else {
        indent_found = true;
      }
    }
    if (ch === 10 || pos === len - 1) {
      if (ch !== 10) {
        pos++;
      }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);
      this.sCount.push(offset);
      this.bsCount.push(0);
      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  }
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);
  this.lineMax = this.bMarks.length - 1;
}
StateBlock.prototype.push = function(type, tag, nesting) {
  const token = new _token_mjs__WEBPACK_IMPORTED_MODULE_0__["default"](type, tag, nesting);
  token.block = true;
  if (nesting < 0) this.level--;
  token.level = this.level;
  if (nesting > 0) this.level++;
  this.tokens.push(token);
  return token;
};
StateBlock.prototype.isEmpty = function isEmpty(line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};
StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (let max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }
  return from;
};
StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
  for (let max = this.src.length; pos < max; pos++) {
    const ch = this.src.charCodeAt(pos);
    if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isSpace)(ch)) {
      break;
    }
  }
  return pos;
};
StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
  if (pos <= min) {
    return pos;
  }
  while (pos > min) {
    if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isSpace)(this.src.charCodeAt(--pos))) {
      return pos + 1;
    }
  }
  return pos;
};
StateBlock.prototype.skipChars = function skipChars(pos, code) {
  for (let max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code) {
      break;
    }
  }
  return pos;
};
StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
  if (pos <= min) {
    return pos;
  }
  while (pos > min) {
    if (code !== this.src.charCodeAt(--pos)) {
      return pos + 1;
    }
  }
  return pos;
};
StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
  if (begin >= end) {
    return "";
  }
  const queue = new Array(end - begin);
  for (let i = 0, line = begin; line < end; line++, i++) {
    let lineIndent = 0;
    const lineStart = this.bMarks[line];
    let first = lineStart;
    let last;
    if (line + 1 < end || keepLastLF) {
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }
    while (first < last && lineIndent < indent) {
      const ch = this.src.charCodeAt(first);
      if ((0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isSpace)(ch)) {
        if (ch === 9) {
          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
        } else {
          lineIndent++;
        }
      } else if (first - lineStart < this.tShift[line]) {
        lineIndent++;
      } else {
        break;
      }
      first++;
    }
    if (lineIndent > indent) {
      queue[i] = new Array(lineIndent - indent + 1).join(" ") + this.src.slice(first, last);
    } else {
      queue[i] = this.src.slice(first, last);
    }
  }
  return queue.join("");
};
StateBlock.prototype.Token = _token_mjs__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StateBlock);


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_block/table.mjs":
/*!****************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_block/table.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ table)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

const MAX_AUTOCOMPLETED_CELLS = 65536;
function getLine(state, line) {
  const pos = state.bMarks[line] + state.tShift[line];
  const max = state.eMarks[line];
  return state.src.slice(pos, max);
}
function escapedSplit(str) {
  const result = [];
  const max = str.length;
  let pos = 0;
  let ch = str.charCodeAt(pos);
  let isEscaped = false;
  let lastPos = 0;
  let current = "";
  while (pos < max) {
    if (ch === 124) {
      if (!isEscaped) {
        result.push(current + str.substring(lastPos, pos));
        current = "";
        lastPos = pos + 1;
      } else {
        current += str.substring(lastPos, pos - 1);
        lastPos = pos;
      }
    }
    isEscaped = ch === 92;
    pos++;
    ch = str.charCodeAt(pos);
  }
  result.push(current + str.substring(lastPos));
  return result;
}
function table(state, startLine, endLine, silent) {
  if (startLine + 2 > endLine) {
    return false;
  }
  let nextLine = startLine + 1;
  if (state.sCount[nextLine] < state.blkIndent) {
    return false;
  }
  if (state.sCount[nextLine] - state.blkIndent >= 4) {
    return false;
  }
  let pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) {
    return false;
  }
  const firstCh = state.src.charCodeAt(pos++);
  if (firstCh !== 124 && firstCh !== 45 && firstCh !== 58) {
    return false;
  }
  if (pos >= state.eMarks[nextLine]) {
    return false;
  }
  const secondCh = state.src.charCodeAt(pos++);
  if (secondCh !== 124 && secondCh !== 45 && secondCh !== 58 && !(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(secondCh)) {
    return false;
  }
  if (firstCh === 45 && (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(secondCh)) {
    return false;
  }
  while (pos < state.eMarks[nextLine]) {
    const ch = state.src.charCodeAt(pos);
    if (ch !== 124 && ch !== 45 && ch !== 58 && !(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(ch)) {
      return false;
    }
    pos++;
  }
  let lineText = getLine(state, startLine + 1);
  let columns = lineText.split("|");
  const aligns = [];
  for (let i = 0; i < columns.length; i++) {
    const t = columns[i].trim();
    if (!t) {
      if (i === 0 || i === columns.length - 1) {
        continue;
      } else {
        return false;
      }
    }
    if (!/^:?-+:?$/.test(t)) {
      return false;
    }
    if (t.charCodeAt(t.length - 1) === 58) {
      aligns.push(t.charCodeAt(0) === 58 ? "center" : "right");
    } else if (t.charCodeAt(0) === 58) {
      aligns.push("left");
    } else {
      aligns.push("");
    }
  }
  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf("|") === -1) {
    return false;
  }
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  columns = escapedSplit(lineText);
  if (columns.length && columns[0] === "") columns.shift();
  if (columns.length && columns[columns.length - 1] === "") columns.pop();
  const columnCount = columns.length;
  if (columnCount === 0 || columnCount !== aligns.length) {
    return false;
  }
  if (silent) {
    return true;
  }
  const oldParentType = state.parentType;
  state.parentType = "table";
  const terminatorRules = state.md.block.ruler.getRules("blockquote");
  const token_to = state.push("table_open", "table", 1);
  const tableLines = [startLine, 0];
  token_to.map = tableLines;
  const token_tho = state.push("thead_open", "thead", 1);
  token_tho.map = [startLine, startLine + 1];
  const token_htro = state.push("tr_open", "tr", 1);
  token_htro.map = [startLine, startLine + 1];
  for (let i = 0; i < columns.length; i++) {
    const token_ho = state.push("th_open", "th", 1);
    if (aligns[i]) {
      token_ho.attrs = [["style", "text-align:" + aligns[i]]];
    }
    const token_il = state.push("inline", "", 0);
    token_il.content = columns[i].trim();
    token_il.children = [];
    state.push("th_close", "th", -1);
  }
  state.push("tr_close", "tr", -1);
  state.push("thead_close", "thead", -1);
  let tbodyLines;
  let autocompletedCells = 0;
  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) {
      break;
    }
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
    lineText = getLine(state, nextLine).trim();
    if (!lineText) {
      break;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      break;
    }
    columns = escapedSplit(lineText);
    if (columns.length && columns[0] === "") columns.shift();
    if (columns.length && columns[columns.length - 1] === "") columns.pop();
    autocompletedCells += columnCount - columns.length;
    if (autocompletedCells > MAX_AUTOCOMPLETED_CELLS) {
      break;
    }
    if (nextLine === startLine + 2) {
      const token_tbo = state.push("tbody_open", "tbody", 1);
      token_tbo.map = tbodyLines = [startLine + 2, 0];
    }
    const token_tro = state.push("tr_open", "tr", 1);
    token_tro.map = [nextLine, nextLine + 1];
    for (let i = 0; i < columnCount; i++) {
      const token_tdo = state.push("td_open", "td", 1);
      if (aligns[i]) {
        token_tdo.attrs = [["style", "text-align:" + aligns[i]]];
      }
      const token_il = state.push("inline", "", 0);
      token_il.content = columns[i] ? columns[i].trim() : "";
      token_il.children = [];
      state.push("td_close", "td", -1);
    }
    state.push("tr_close", "tr", -1);
  }
  if (tbodyLines) {
    state.push("tbody_close", "tbody", -1);
    tbodyLines[1] = nextLine;
  }
  state.push("table_close", "table", -1);
  tableLines[1] = nextLine;
  state.parentType = oldParentType;
  state.line = nextLine;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_core/block.mjs":
/*!***************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_core/block.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ block)
/* harmony export */ });
function block(state) {
  let token;
  if (state.inlineMode) {
    token = new state.Token("inline", "", 0);
    token.content = state.src;
    token.map = [0, 1];
    token.children = [];
    state.tokens.push(token);
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens);
  }
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_core/inline.mjs":
/*!****************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_core/inline.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ inline)
/* harmony export */ });
function inline(state) {
  const tokens = state.tokens;
  for (let i = 0, l = tokens.length; i < l; i++) {
    const tok = tokens[i];
    if (tok.type === "inline") {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_core/linkify.mjs":
/*!*****************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_core/linkify.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ linkify)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

function isLinkOpen(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose(str) {
  return /^<\/a\s*>/i.test(str);
}
function linkify(state) {
  const blockTokens = state.tokens;
  if (!state.md.options.linkify) {
    return;
  }
  for (let j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== "inline" || !state.md.linkify.pretest(blockTokens[j].content)) {
      continue;
    }
    let tokens = blockTokens[j].children;
    let htmlLinkLevel = 0;
    for (let i = tokens.length - 1; i >= 0; i--) {
      const currentToken = tokens[i];
      if (currentToken.type === "link_close") {
        i--;
        while (tokens[i].level !== currentToken.level && tokens[i].type !== "link_open") {
          i--;
        }
        continue;
      }
      if (currentToken.type === "html_inline") {
        if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }
        if (isLinkClose(currentToken.content)) {
          htmlLinkLevel++;
        }
      }
      if (htmlLinkLevel > 0) {
        continue;
      }
      if (currentToken.type === "text" && state.md.linkify.test(currentToken.content)) {
        const text = currentToken.content;
        let links = state.md.linkify.match(text);
        const nodes = [];
        let level = currentToken.level;
        let lastPos = 0;
        if (links.length > 0 && links[0].index === 0 && i > 0 && tokens[i - 1].type === "text_special") {
          links = links.slice(1);
        }
        for (let ln = 0; ln < links.length; ln++) {
          const url = links[ln].url;
          const fullUrl = state.md.normalizeLink(url);
          if (!state.md.validateLink(fullUrl)) {
            continue;
          }
          let urlText = links[ln].text;
          if (!links[ln].schema) {
            urlText = state.md.normalizeLinkText("http://" + urlText).replace(/^http:\/\//, "");
          } else if (links[ln].schema === "mailto:" && !/^mailto:/i.test(urlText)) {
            urlText = state.md.normalizeLinkText("mailto:" + urlText).replace(/^mailto:/, "");
          } else {
            urlText = state.md.normalizeLinkText(urlText);
          }
          const pos = links[ln].index;
          if (pos > lastPos) {
            const token = new state.Token("text", "", 0);
            token.content = text.slice(lastPos, pos);
            token.level = level;
            nodes.push(token);
          }
          const token_o = new state.Token("link_open", "a", 1);
          token_o.attrs = [["href", fullUrl]];
          token_o.level = level++;
          token_o.markup = "linkify";
          token_o.info = "auto";
          nodes.push(token_o);
          const token_t = new state.Token("text", "", 0);
          token_t.content = urlText;
          token_t.level = level;
          nodes.push(token_t);
          const token_c = new state.Token("link_close", "a", -1);
          token_c.level = --level;
          token_c.markup = "linkify";
          token_c.info = "auto";
          nodes.push(token_c);
          lastPos = links[ln].lastIndex;
        }
        if (lastPos < text.length) {
          const token = new state.Token("text", "", 0);
          token.content = text.slice(lastPos);
          token.level = level;
          nodes.push(token);
        }
        blockTokens[j].children = tokens = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.arrayReplaceAt)(tokens, i, nodes);
      }
    }
  }
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_core/normalize.mjs":
/*!*******************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_core/normalize.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalize)
/* harmony export */ });
const NEWLINES_RE = /\r\n?|\n/g;
const NULL_RE = /\0/g;
function normalize(state) {
  let str;
  str = state.src.replace(NEWLINES_RE, "\n");
  str = str.replace(NULL_RE, "\uFFFD");
  state.src = str;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_core/replacements.mjs":
/*!**********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_core/replacements.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ replace)
/* harmony export */ });
const RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
const SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;
const SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
const SCOPED_ABBR = {
  c: "\xA9",
  r: "\xAE",
  tm: "\u2122"
};
function replaceFn(match, name) {
  return SCOPED_ABBR[name.toLowerCase()];
}
function replace_scoped(inlineTokens) {
  let inside_autolink = 0;
  for (let i = inlineTokens.length - 1; i >= 0; i--) {
    const token = inlineTokens[i];
    if (token.type === "text" && !inside_autolink) {
      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
    }
    if (token.type === "link_open" && token.info === "auto") {
      inside_autolink--;
    }
    if (token.type === "link_close" && token.info === "auto") {
      inside_autolink++;
    }
  }
}
function replace_rare(inlineTokens) {
  let inside_autolink = 0;
  for (let i = inlineTokens.length - 1; i >= 0; i--) {
    const token = inlineTokens[i];
    if (token.type === "text" && !inside_autolink) {
      if (RARE_RE.test(token.content)) {
        token.content = token.content.replace(/\+-/g, "\xB1").replace(/\.{2,}/g, "\u2026").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1\u2014").replace(/(^|\s)--(?=\s|$)/mg, "$1\u2013").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1\u2013");
      }
    }
    if (token.type === "link_open" && token.info === "auto") {
      inside_autolink--;
    }
    if (token.type === "link_close" && token.info === "auto") {
      inside_autolink++;
    }
  }
}
function replace(state) {
  let blkIdx;
  if (!state.md.options.typographer) {
    return;
  }
  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== "inline") {
      continue;
    }
    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
      replace_scoped(state.tokens[blkIdx].children);
    }
    if (RARE_RE.test(state.tokens[blkIdx].content)) {
      replace_rare(state.tokens[blkIdx].children);
    }
  }
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_core/smartquotes.mjs":
/*!*********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_core/smartquotes.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ smartquotes)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

const QUOTE_TEST_RE = /['"]/;
const QUOTE_RE = /['"]/g;
const APOSTROPHE = "\u2019";
function replaceAt(str, index, ch) {
  return str.slice(0, index) + ch + str.slice(index + 1);
}
function process_inlines(tokens, state) {
  let j;
  const stack = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const thisLevel = tokens[i].level;
    for (j = stack.length - 1; j >= 0; j--) {
      if (stack[j].level <= thisLevel) {
        break;
      }
    }
    stack.length = j + 1;
    if (token.type !== "text") {
      continue;
    }
    let text = token.content;
    let pos = 0;
    let max = text.length;
    OUTER:
      while (pos < max) {
        QUOTE_RE.lastIndex = pos;
        const t = QUOTE_RE.exec(text);
        if (!t) {
          break;
        }
        let canOpen = true;
        let canClose = true;
        pos = t.index + 1;
        const isSingle = t[0] === "'";
        let lastChar = 32;
        if (t.index - 1 >= 0) {
          lastChar = text.charCodeAt(t.index - 1);
        } else {
          for (j = i - 1; j >= 0; j--) {
            if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
            if (!tokens[j].content) continue;
            lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
            break;
          }
        }
        let nextChar = 32;
        if (pos < max) {
          nextChar = text.charCodeAt(pos);
        } else {
          for (j = i + 1; j < tokens.length; j++) {
            if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
            if (!tokens[j].content) continue;
            nextChar = tokens[j].content.charCodeAt(0);
            break;
          }
        }
        const isLastPunctChar = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isMdAsciiPunct)(lastChar) || (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isPunctChar)(String.fromCharCode(lastChar));
        const isNextPunctChar = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isMdAsciiPunct)(nextChar) || (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isPunctChar)(String.fromCharCode(nextChar));
        const isLastWhiteSpace = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(lastChar);
        const isNextWhiteSpace = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(nextChar);
        if (isNextWhiteSpace) {
          canOpen = false;
        } else if (isNextPunctChar) {
          if (!(isLastWhiteSpace || isLastPunctChar)) {
            canOpen = false;
          }
        }
        if (isLastWhiteSpace) {
          canClose = false;
        } else if (isLastPunctChar) {
          if (!(isNextWhiteSpace || isNextPunctChar)) {
            canClose = false;
          }
        }
        if (nextChar === 34 && t[0] === '"') {
          if (lastChar >= 48 && lastChar <= 57) {
            canClose = canOpen = false;
          }
        }
        if (canOpen && canClose) {
          canOpen = isLastPunctChar;
          canClose = isNextPunctChar;
        }
        if (!canOpen && !canClose) {
          if (isSingle) {
            token.content = replaceAt(token.content, t.index, APOSTROPHE);
          }
          continue;
        }
        if (canClose) {
          for (j = stack.length - 1; j >= 0; j--) {
            let item = stack[j];
            if (stack[j].level < thisLevel) {
              break;
            }
            if (item.single === isSingle && stack[j].level === thisLevel) {
              item = stack[j];
              let openQuote;
              let closeQuote;
              if (isSingle) {
                openQuote = state.md.options.quotes[2];
                closeQuote = state.md.options.quotes[3];
              } else {
                openQuote = state.md.options.quotes[0];
                closeQuote = state.md.options.quotes[1];
              }
              token.content = replaceAt(token.content, t.index, closeQuote);
              tokens[item.token].content = replaceAt(
                tokens[item.token].content,
                item.pos,
                openQuote
              );
              pos += closeQuote.length - 1;
              if (item.token === i) {
                pos += openQuote.length - 1;
              }
              text = token.content;
              max = text.length;
              stack.length = j;
              continue OUTER;
            }
          }
        }
        if (canOpen) {
          stack.push({
            token: i,
            pos: t.index,
            single: isSingle,
            level: thisLevel
          });
        } else if (canClose && isSingle) {
          token.content = replaceAt(token.content, t.index, APOSTROPHE);
        }
      }
  }
}
function smartquotes(state) {
  if (!state.md.options.typographer) {
    return;
  }
  for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== "inline" || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
      continue;
    }
    process_inlines(state.tokens[blkIdx].children, state);
  }
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_core/state_core.mjs":
/*!********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_core/state_core.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _token_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../token.mjs */ "../../node_modules/markdown-it/lib/token.mjs");

function StateCore(src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md;
}
StateCore.prototype.Token = _token_mjs__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StateCore);


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_core/text_join.mjs":
/*!*******************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_core/text_join.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ text_join)
/* harmony export */ });
function text_join(state) {
  let curr, last;
  const blockTokens = state.tokens;
  const l = blockTokens.length;
  for (let j = 0; j < l; j++) {
    if (blockTokens[j].type !== "inline") continue;
    const tokens = blockTokens[j].children;
    const max = tokens.length;
    for (curr = 0; curr < max; curr++) {
      if (tokens[curr].type === "text_special") {
        tokens[curr].type = "text";
      }
    }
    for (curr = last = 0; curr < max; curr++) {
      if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
        tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
      } else {
        if (curr !== last) {
          tokens[last] = tokens[curr];
        }
        last++;
      }
    }
    if (curr !== last) {
      tokens.length = last;
    }
  }
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/autolink.mjs":
/*!********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/autolink.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ autolink)
/* harmony export */ });
const EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
const AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function autolink(state, silent) {
  let pos = state.pos;
  if (state.src.charCodeAt(pos) !== 60) {
    return false;
  }
  const start = state.pos;
  const max = state.posMax;
  for (; ; ) {
    if (++pos >= max) return false;
    const ch = state.src.charCodeAt(pos);
    if (ch === 60) return false;
    if (ch === 62) break;
  }
  const url = state.src.slice(start + 1, pos);
  if (AUTOLINK_RE.test(url)) {
    const fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) {
      return false;
    }
    if (!silent) {
      const token_o = state.push("link_open", "a", 1);
      token_o.attrs = [["href", fullUrl]];
      token_o.markup = "autolink";
      token_o.info = "auto";
      const token_t = state.push("text", "", 0);
      token_t.content = state.md.normalizeLinkText(url);
      const token_c = state.push("link_close", "a", -1);
      token_c.markup = "autolink";
      token_c.info = "auto";
    }
    state.pos += url.length + 2;
    return true;
  }
  if (EMAIL_RE.test(url)) {
    const fullUrl = state.md.normalizeLink("mailto:" + url);
    if (!state.md.validateLink(fullUrl)) {
      return false;
    }
    if (!silent) {
      const token_o = state.push("link_open", "a", 1);
      token_o.attrs = [["href", fullUrl]];
      token_o.markup = "autolink";
      token_o.info = "auto";
      const token_t = state.push("text", "", 0);
      token_t.content = state.md.normalizeLinkText(url);
      const token_c = state.push("link_close", "a", -1);
      token_c.markup = "autolink";
      token_c.info = "auto";
    }
    state.pos += url.length + 2;
    return true;
  }
  return false;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/backticks.mjs":
/*!*********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/backticks.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ backtick)
/* harmony export */ });
function backtick(state, silent) {
  let pos = state.pos;
  const ch = state.src.charCodeAt(pos);
  if (ch !== 96) {
    return false;
  }
  const start = pos;
  pos++;
  const max = state.posMax;
  while (pos < max && state.src.charCodeAt(pos) === 96) {
    pos++;
  }
  const marker = state.src.slice(start, pos);
  const openerLength = marker.length;
  if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
    if (!silent) state.pending += marker;
    state.pos += openerLength;
    return true;
  }
  let matchEnd = pos;
  let matchStart;
  while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
    matchEnd = matchStart + 1;
    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) {
      matchEnd++;
    }
    const closerLength = matchEnd - matchStart;
    if (closerLength === openerLength) {
      if (!silent) {
        const token = state.push("code_inline", "code", 0);
        token.markup = marker;
        token.content = state.src.slice(pos, matchStart).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
      }
      state.pos = matchEnd;
      return true;
    }
    state.backticks[closerLength] = matchStart;
  }
  state.backticksScanned = true;
  if (!silent) state.pending += marker;
  state.pos += openerLength;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/balance_pairs.mjs":
/*!*************************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/balance_pairs.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ link_pairs)
/* harmony export */ });
function processDelimiters(delimiters) {
  const openersBottom = {};
  const max = delimiters.length;
  if (!max) return;
  let headerIdx = 0;
  let lastTokenIdx = -2;
  const jumps = [];
  for (let closerIdx = 0; closerIdx < max; closerIdx++) {
    const closer = delimiters[closerIdx];
    jumps.push(0);
    if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
      headerIdx = closerIdx;
    }
    lastTokenIdx = closer.token;
    closer.length = closer.length || 0;
    if (!closer.close) continue;
    if (!openersBottom.hasOwnProperty(closer.marker)) {
      openersBottom[closer.marker] = [-1, -1, -1, -1, -1, -1];
    }
    const minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
    let openerIdx = headerIdx - jumps[headerIdx] - 1;
    let newMinOpenerIdx = openerIdx;
    for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
      const opener = delimiters[openerIdx];
      if (opener.marker !== closer.marker) continue;
      if (opener.open && opener.end < 0) {
        let isOddMatch = false;
        if (opener.close || closer.open) {
          if ((opener.length + closer.length) % 3 === 0) {
            if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
              isOddMatch = true;
            }
          }
        }
        if (!isOddMatch) {
          const lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
          jumps[closerIdx] = closerIdx - openerIdx + lastJump;
          jumps[openerIdx] = lastJump;
          closer.open = false;
          opener.end = closerIdx;
          opener.close = false;
          newMinOpenerIdx = -1;
          lastTokenIdx = -2;
          break;
        }
      }
    }
    if (newMinOpenerIdx !== -1) {
      openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
    }
  }
}
function link_pairs(state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;
  processDelimiters(state.delimiters);
  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      processDelimiters(tokens_meta[curr].delimiters);
    }
  }
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/emphasis.mjs":
/*!********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/emphasis.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function emphasis_tokenize(state, silent) {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);
  if (silent) {
    return false;
  }
  if (marker !== 95 && marker !== 42) {
    return false;
  }
  const scanned = state.scanDelims(state.pos, marker === 42);
  for (let i = 0; i < scanned.length; i++) {
    const token = state.push("text", "", 0);
    token.content = String.fromCharCode(marker);
    state.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker,
      // Total length of these series of delimiters.
      //
      length: scanned.length,
      // A position of the token this delimiter corresponds to.
      //
      token: state.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: scanned.can_open,
      close: scanned.can_close
    });
  }
  state.pos += scanned.length;
  return true;
}
function postProcess(state, delimiters) {
  const max = delimiters.length;
  for (let i = max - 1; i >= 0; i--) {
    const startDelim = delimiters[i];
    if (startDelim.marker !== 95 && startDelim.marker !== 42) {
      continue;
    }
    if (startDelim.end === -1) {
      continue;
    }
    const endDelim = delimiters[startDelim.end];
    const isStrong = i > 0 && delimiters[i - 1].end === startDelim.end + 1 && // check that first two markers match and adjacent
    delimiters[i - 1].marker === startDelim.marker && delimiters[i - 1].token === startDelim.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    delimiters[startDelim.end + 1].token === endDelim.token + 1;
    const ch = String.fromCharCode(startDelim.marker);
    const token_o = state.tokens[startDelim.token];
    token_o.type = isStrong ? "strong_open" : "em_open";
    token_o.tag = isStrong ? "strong" : "em";
    token_o.nesting = 1;
    token_o.markup = isStrong ? ch + ch : ch;
    token_o.content = "";
    const token_c = state.tokens[endDelim.token];
    token_c.type = isStrong ? "strong_close" : "em_close";
    token_c.tag = isStrong ? "strong" : "em";
    token_c.nesting = -1;
    token_c.markup = isStrong ? ch + ch : ch;
    token_c.content = "";
    if (isStrong) {
      state.tokens[delimiters[i - 1].token].content = "";
      state.tokens[delimiters[startDelim.end + 1].token].content = "";
      i--;
    }
  }
}
function emphasis_post_process(state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;
  postProcess(state, state.delimiters);
  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess(state, tokens_meta[curr].delimiters);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  tokenize: emphasis_tokenize,
  postProcess: emphasis_post_process
});


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/entity.mjs":
/*!******************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/entity.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ entity)
/* harmony export */ });
/* harmony import */ var entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! entities */ "../../node_modules/entities/lib/esm/index.js");
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");


const DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
const NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
function entity(state, silent) {
  const pos = state.pos;
  const max = state.posMax;
  if (state.src.charCodeAt(pos) !== 38) return false;
  if (pos + 1 >= max) return false;
  const ch = state.src.charCodeAt(pos + 1);
  if (ch === 35) {
    const match = state.src.slice(pos).match(DIGITAL_RE);
    if (match) {
      if (!silent) {
        const code = match[1][0].toLowerCase() === "x" ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
        const token = state.push("text_special", "", 0);
        token.content = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isValidEntityCode)(code) ? (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.fromCodePoint)(code) : (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.fromCodePoint)(65533);
        token.markup = match[0];
        token.info = "entity";
      }
      state.pos += match[0].length;
      return true;
    }
  } else {
    const match = state.src.slice(pos).match(NAMED_RE);
    if (match) {
      const decoded = (0,entities__WEBPACK_IMPORTED_MODULE_0__.decodeHTML)(match[0]);
      if (decoded !== match[0]) {
        if (!silent) {
          const token = state.push("text_special", "", 0);
          token.content = decoded;
          token.markup = match[0];
          token.info = "entity";
        }
        state.pos += match[0].length;
        return true;
      }
    }
  }
  return false;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/escape.mjs":
/*!******************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/escape.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ escape)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

const ESCAPED = [];
for (let i = 0; i < 256; i++) {
  ESCAPED.push(0);
}
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
  ESCAPED[ch.charCodeAt(0)] = 1;
});
function escape(state, silent) {
  let pos = state.pos;
  const max = state.posMax;
  if (state.src.charCodeAt(pos) !== 92) return false;
  pos++;
  if (pos >= max) return false;
  let ch1 = state.src.charCodeAt(pos);
  if (ch1 === 10) {
    if (!silent) {
      state.push("hardbreak", "br", 0);
    }
    pos++;
    while (pos < max) {
      ch1 = state.src.charCodeAt(pos);
      if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(ch1)) break;
      pos++;
    }
    state.pos = pos;
    return true;
  }
  let escapedStr = state.src[pos];
  if (ch1 >= 55296 && ch1 <= 56319 && pos + 1 < max) {
    const ch2 = state.src.charCodeAt(pos + 1);
    if (ch2 >= 56320 && ch2 <= 57343) {
      escapedStr += state.src[pos + 1];
      pos++;
    }
  }
  const origStr = "\\" + escapedStr;
  if (!silent) {
    const token = state.push("text_special", "", 0);
    if (ch1 < 256 && ESCAPED[ch1] !== 0) {
      token.content = escapedStr;
    } else {
      token.content = origStr;
    }
    token.markup = origStr;
    token.info = "escape";
  }
  state.pos = pos + 1;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/fragments_join.mjs":
/*!**************************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/fragments_join.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fragments_join)
/* harmony export */ });
function fragments_join(state) {
  let curr, last;
  let level = 0;
  const tokens = state.tokens;
  const max = state.tokens.length;
  for (curr = last = 0; curr < max; curr++) {
    if (tokens[curr].nesting < 0) level--;
    tokens[curr].level = level;
    if (tokens[curr].nesting > 0) level++;
    if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
      tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
    } else {
      if (curr !== last) {
        tokens[last] = tokens[curr];
      }
      last++;
    }
  }
  if (curr !== last) {
    tokens.length = last;
  }
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/html_inline.mjs":
/*!***********************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/html_inline.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ html_inline)
/* harmony export */ });
/* harmony import */ var _common_html_re_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/html_re.mjs */ "../../node_modules/markdown-it/lib/common/html_re.mjs");

function isLinkOpen(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose(str) {
  return /^<\/a\s*>/i.test(str);
}
function isLetter(ch) {
  const lc = ch | 32;
  return lc >= 97 && lc <= 122;
}
function html_inline(state, silent) {
  if (!state.md.options.html) {
    return false;
  }
  const max = state.posMax;
  const pos = state.pos;
  if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) {
    return false;
  }
  const ch = state.src.charCodeAt(pos + 1);
  if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter(ch)) {
    return false;
  }
  const match = state.src.slice(pos).match(_common_html_re_mjs__WEBPACK_IMPORTED_MODULE_0__.HTML_TAG_RE);
  if (!match) {
    return false;
  }
  if (!silent) {
    const token = state.push("html_inline", "", 0);
    token.content = match[0];
    if (isLinkOpen(token.content)) state.linkLevel++;
    if (isLinkClose(token.content)) state.linkLevel--;
  }
  state.pos += match[0].length;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/image.mjs":
/*!*****************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/image.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ image)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

function image(state, silent) {
  let code, content, label, pos, ref, res, title, start;
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
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
  if (labelEnd < 0) {
    return false;
  }
  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 40) {
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(code) && code !== 10) {
        break;
      }
    }
    if (pos >= max) {
      return false;
    }
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
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
      if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(code) && code !== 10) {
        break;
      }
    }
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(code) && code !== 10) {
          break;
        }
      }
    } else {
      title = "";
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
    if (pos < max && state.src.charCodeAt(pos) === 91) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }
    if (!label) {
      label = state.src.slice(labelStart, labelEnd);
    }
    ref = state.env.references[(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.normalizeReference)(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }
  if (!silent) {
    content = state.src.slice(labelStart, labelEnd);
    const tokens = [];
    state.md.inline.parse(
      content,
      state.md,
      state.env,
      tokens
    );
    const token = state.push("image", "img", 0);
    const attrs = [["src", href], ["alt", ""]];
    token.attrs = attrs;
    token.children = tokens;
    token.content = content;
    if (title) {
      attrs.push(["title", title]);
    }
  }
  state.pos = pos;
  state.posMax = max;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/link.mjs":
/*!****************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/link.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ link)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

function link(state, silent) {
  let code, label, res, ref;
  let href = "";
  let title = "";
  let start = state.pos;
  let parseReference = true;
  if (state.src.charCodeAt(state.pos) !== 91) {
    return false;
  }
  const oldPos = state.pos;
  const max = state.posMax;
  const labelStart = state.pos + 1;
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
  if (labelEnd < 0) {
    return false;
  }
  let pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 40) {
    parseReference = false;
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(code) && code !== 10) {
        break;
      }
    }
    if (pos >= max) {
      return false;
    }
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = "";
      }
      start = pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(code) && code !== 10) {
          break;
        }
      }
      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(code) && code !== 10) {
            break;
          }
        }
      }
    }
    if (pos >= max || state.src.charCodeAt(pos) !== 41) {
      parseReference = true;
    }
    pos++;
  }
  if (parseReference) {
    if (typeof state.env.references === "undefined") {
      return false;
    }
    if (pos < max && state.src.charCodeAt(pos) === 91) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }
    if (!label) {
      label = state.src.slice(labelStart, labelEnd);
    }
    ref = state.env.references[(0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.normalizeReference)(label)];
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
    const token_o = state.push("link_open", "a", 1);
    const attrs = [["href", href]];
    token_o.attrs = attrs;
    if (title) {
      attrs.push(["title", title]);
    }
    state.linkLevel++;
    state.md.inline.tokenize(state);
    state.linkLevel--;
    state.push("link_close", "a", -1);
  }
  state.pos = pos;
  state.posMax = max;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/linkify.mjs":
/*!*******************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/linkify.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ linkify)
/* harmony export */ });
const SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
function linkify(state, silent) {
  if (!state.md.options.linkify) return false;
  if (state.linkLevel > 0) return false;
  const pos = state.pos;
  const max = state.posMax;
  if (pos + 3 > max) return false;
  if (state.src.charCodeAt(pos) !== 58) return false;
  if (state.src.charCodeAt(pos + 1) !== 47) return false;
  if (state.src.charCodeAt(pos + 2) !== 47) return false;
  const match = state.pending.match(SCHEME_RE);
  if (!match) return false;
  const proto = match[1];
  const link = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
  if (!link) return false;
  let url = link.url;
  if (url.length <= proto.length) return false;
  url = url.replace(/\*+$/, "");
  const fullUrl = state.md.normalizeLink(url);
  if (!state.md.validateLink(fullUrl)) return false;
  if (!silent) {
    state.pending = state.pending.slice(0, -proto.length);
    const token_o = state.push("link_open", "a", 1);
    token_o.attrs = [["href", fullUrl]];
    token_o.markup = "linkify";
    token_o.info = "auto";
    const token_t = state.push("text", "", 0);
    token_t.content = state.md.normalizeLinkText(url);
    const token_c = state.push("link_close", "a", -1);
    token_c.markup = "linkify";
    token_c.info = "auto";
  }
  state.pos += url.length - proto.length;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/newline.mjs":
/*!*******************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/newline.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ newline)
/* harmony export */ });
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");

function newline(state, silent) {
  let pos = state.pos;
  if (state.src.charCodeAt(pos) !== 10) {
    return false;
  }
  const pmax = state.pending.length - 1;
  const max = state.posMax;
  if (!silent) {
    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
        let ws = pmax - 1;
        while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 32) ws--;
        state.pending = state.pending.slice(0, ws);
        state.push("hardbreak", "br", 0);
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push("softbreak", "br", 0);
      }
    } else {
      state.push("softbreak", "br", 0);
    }
  }
  pos++;
  while (pos < max && (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpace)(state.src.charCodeAt(pos))) {
    pos++;
  }
  state.pos = pos;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/state_inline.mjs":
/*!************************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/state_inline.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _token_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../token.mjs */ "../../node_modules/markdown-it/lib/token.mjs");
/* harmony import */ var _common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils.mjs */ "../../node_modules/markdown-it/lib/common/utils.mjs");


function StateInline(src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;
  this.tokens_meta = Array(outTokens.length);
  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = "";
  this.pendingLevel = 0;
  this.cache = {};
  this.delimiters = [];
  this._prev_delimiters = [];
  this.backticks = {};
  this.backticksScanned = false;
  this.linkLevel = 0;
}
StateInline.prototype.pushPending = function() {
  const token = new _token_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]("text", "", 0);
  token.content = this.pending;
  token.level = this.pendingLevel;
  this.tokens.push(token);
  this.pending = "";
  return token;
};
StateInline.prototype.push = function(type, tag, nesting) {
  if (this.pending) {
    this.pushPending();
  }
  const token = new _token_mjs__WEBPACK_IMPORTED_MODULE_0__["default"](type, tag, nesting);
  let token_meta = null;
  if (nesting < 0) {
    this.level--;
    this.delimiters = this._prev_delimiters.pop();
  }
  token.level = this.level;
  if (nesting > 0) {
    this.level++;
    this._prev_delimiters.push(this.delimiters);
    this.delimiters = [];
    token_meta = { delimiters: this.delimiters };
  }
  this.pendingLevel = this.level;
  this.tokens.push(token);
  this.tokens_meta.push(token_meta);
  return token;
};
StateInline.prototype.scanDelims = function(start, canSplitWord) {
  const max = this.posMax;
  const marker = this.src.charCodeAt(start);
  const lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 32;
  let pos = start;
  while (pos < max && this.src.charCodeAt(pos) === marker) {
    pos++;
  }
  const count = pos - start;
  const nextChar = pos < max ? this.src.charCodeAt(pos) : 32;
  const isLastPunctChar = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isMdAsciiPunct)(lastChar) || (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isPunctChar)(String.fromCharCode(lastChar));
  const isNextPunctChar = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isMdAsciiPunct)(nextChar) || (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isPunctChar)(String.fromCharCode(nextChar));
  const isLastWhiteSpace = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isWhiteSpace)(lastChar);
  const isNextWhiteSpace = (0,_common_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isWhiteSpace)(nextChar);
  const left_flanking = !isNextWhiteSpace && (!isNextPunctChar || isLastWhiteSpace || isLastPunctChar);
  const right_flanking = !isLastWhiteSpace && (!isLastPunctChar || isNextWhiteSpace || isNextPunctChar);
  const can_open = left_flanking && (canSplitWord || !right_flanking || isLastPunctChar);
  const can_close = right_flanking && (canSplitWord || !left_flanking || isNextPunctChar);
  return { can_open, can_close, length: count };
};
StateInline.prototype.Token = _token_mjs__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StateInline);


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/strikethrough.mjs":
/*!*************************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/strikethrough.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function strikethrough_tokenize(state, silent) {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);
  if (silent) {
    return false;
  }
  if (marker !== 126) {
    return false;
  }
  const scanned = state.scanDelims(state.pos, true);
  let len = scanned.length;
  const ch = String.fromCharCode(marker);
  if (len < 2) {
    return false;
  }
  let token;
  if (len % 2) {
    token = state.push("text", "", 0);
    token.content = ch;
    len--;
  }
  for (let i = 0; i < len; i += 2) {
    token = state.push("text", "", 0);
    token.content = ch + ch;
    state.delimiters.push({
      marker,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: state.tokens.length - 1,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close
    });
  }
  state.pos += scanned.length;
  return true;
}
function postProcess(state, delimiters) {
  let token;
  const loneMarkers = [];
  const max = delimiters.length;
  for (let i = 0; i < max; i++) {
    const startDelim = delimiters[i];
    if (startDelim.marker !== 126) {
      continue;
    }
    if (startDelim.end === -1) {
      continue;
    }
    const endDelim = delimiters[startDelim.end];
    token = state.tokens[startDelim.token];
    token.type = "s_open";
    token.tag = "s";
    token.nesting = 1;
    token.markup = "~~";
    token.content = "";
    token = state.tokens[endDelim.token];
    token.type = "s_close";
    token.tag = "s";
    token.nesting = -1;
    token.markup = "~~";
    token.content = "";
    if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "~") {
      loneMarkers.push(endDelim.token - 1);
    }
  }
  while (loneMarkers.length) {
    const i = loneMarkers.pop();
    let j = i + 1;
    while (j < state.tokens.length && state.tokens[j].type === "s_close") {
      j++;
    }
    j--;
    if (i !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i];
      state.tokens[i] = token;
    }
  }
}
function strikethrough_postProcess(state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;
  postProcess(state, state.delimiters);
  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess(state, tokens_meta[curr].delimiters);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  tokenize: strikethrough_tokenize,
  postProcess: strikethrough_postProcess
});


/***/ }),

/***/ "../../node_modules/markdown-it/lib/rules_inline/text.mjs":
/*!****************************************************************!*\
  !*** ../../node_modules/markdown-it/lib/rules_inline/text.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ text)
/* harmony export */ });
function isTerminatorChar(ch) {
  switch (ch) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return true;
    default:
      return false;
  }
}
function text(state, silent) {
  let pos = state.pos;
  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }
  if (pos === state.pos) {
    return false;
  }
  if (!silent) {
    state.pending += state.src.slice(state.pos, pos);
  }
  state.pos = pos;
  return true;
}


/***/ }),

/***/ "../../node_modules/markdown-it/lib/token.mjs":
/*!****************************************************!*\
  !*** ../../node_modules/markdown-it/lib/token.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Token(type, tag, nesting) {
  this.type = type;
  this.tag = tag;
  this.attrs = null;
  this.map = null;
  this.nesting = nesting;
  this.level = 0;
  this.children = null;
  this.content = "";
  this.markup = "";
  this.info = "";
  this.meta = null;
  this.block = false;
  this.hidden = false;
}
Token.prototype.attrIndex = function attrIndex(name) {
  if (!this.attrs) {
    return -1;
  }
  const attrs = this.attrs;
  for (let i = 0, len = attrs.length; i < len; i++) {
    if (attrs[i][0] === name) {
      return i;
    }
  }
  return -1;
};
Token.prototype.attrPush = function attrPush(attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [attrData];
  }
};
Token.prototype.attrSet = function attrSet(name, value) {
  const idx = this.attrIndex(name);
  const attrData = [name, value];
  if (idx < 0) {
    this.attrPush(attrData);
  } else {
    this.attrs[idx] = attrData;
  }
};
Token.prototype.attrGet = function attrGet(name) {
  const idx = this.attrIndex(name);
  let value = null;
  if (idx >= 0) {
    value = this.attrs[idx][1];
  }
  return value;
};
Token.prototype.attrJoin = function attrJoin(name, value) {
  const idx = this.attrIndex(name);
  if (idx < 0) {
    this.attrPush([name, value]);
  } else {
    this.attrs[idx][1] = this.attrs[idx][1] + " " + value;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Token);


/***/ }),

/***/ "../../node_modules/prismjs/components sync recursive prism-[a-z0-9-]+\\.js":
/*!************************************************************************!*\
  !*** ../../node_modules/prismjs/components/ sync prism-[a-z0-9-]+\.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./prism-abap.js": "../../node_modules/prismjs/components/prism-abap.js",
	"./prism-abnf.js": "../../node_modules/prismjs/components/prism-abnf.js",
	"./prism-actionscript.js": "../../node_modules/prismjs/components/prism-actionscript.js",
	"./prism-ada.js": "../../node_modules/prismjs/components/prism-ada.js",
	"./prism-agda.js": "../../node_modules/prismjs/components/prism-agda.js",
	"./prism-al.js": "../../node_modules/prismjs/components/prism-al.js",
	"./prism-antlr4.js": "../../node_modules/prismjs/components/prism-antlr4.js",
	"./prism-apacheconf.js": "../../node_modules/prismjs/components/prism-apacheconf.js",
	"./prism-apex.js": "../../node_modules/prismjs/components/prism-apex.js",
	"./prism-apl.js": "../../node_modules/prismjs/components/prism-apl.js",
	"./prism-applescript.js": "../../node_modules/prismjs/components/prism-applescript.js",
	"./prism-aql.js": "../../node_modules/prismjs/components/prism-aql.js",
	"./prism-arduino.js": "../../node_modules/prismjs/components/prism-arduino.js",
	"./prism-arff.js": "../../node_modules/prismjs/components/prism-arff.js",
	"./prism-armasm.js": "../../node_modules/prismjs/components/prism-armasm.js",
	"./prism-arturo.js": "../../node_modules/prismjs/components/prism-arturo.js",
	"./prism-asciidoc.js": "../../node_modules/prismjs/components/prism-asciidoc.js",
	"./prism-asm6502.js": "../../node_modules/prismjs/components/prism-asm6502.js",
	"./prism-asmatmel.js": "../../node_modules/prismjs/components/prism-asmatmel.js",
	"./prism-aspnet.js": "../../node_modules/prismjs/components/prism-aspnet.js",
	"./prism-autohotkey.js": "../../node_modules/prismjs/components/prism-autohotkey.js",
	"./prism-autoit.js": "../../node_modules/prismjs/components/prism-autoit.js",
	"./prism-avisynth.js": "../../node_modules/prismjs/components/prism-avisynth.js",
	"./prism-avro-idl.js": "../../node_modules/prismjs/components/prism-avro-idl.js",
	"./prism-awk.js": "../../node_modules/prismjs/components/prism-awk.js",
	"./prism-bash.js": "../../node_modules/prismjs/components/prism-bash.js",
	"./prism-basic.js": "../../node_modules/prismjs/components/prism-basic.js",
	"./prism-batch.js": "../../node_modules/prismjs/components/prism-batch.js",
	"./prism-bbcode.js": "../../node_modules/prismjs/components/prism-bbcode.js",
	"./prism-bbj.js": "../../node_modules/prismjs/components/prism-bbj.js",
	"./prism-bicep.js": "../../node_modules/prismjs/components/prism-bicep.js",
	"./prism-birb.js": "../../node_modules/prismjs/components/prism-birb.js",
	"./prism-bison.js": "../../node_modules/prismjs/components/prism-bison.js",
	"./prism-bnf.js": "../../node_modules/prismjs/components/prism-bnf.js",
	"./prism-bqn.js": "../../node_modules/prismjs/components/prism-bqn.js",
	"./prism-brainfuck.js": "../../node_modules/prismjs/components/prism-brainfuck.js",
	"./prism-brightscript.js": "../../node_modules/prismjs/components/prism-brightscript.js",
	"./prism-bro.js": "../../node_modules/prismjs/components/prism-bro.js",
	"./prism-bsl.js": "../../node_modules/prismjs/components/prism-bsl.js",
	"./prism-c.js": "../../node_modules/prismjs/components/prism-c.js",
	"./prism-cfscript.js": "../../node_modules/prismjs/components/prism-cfscript.js",
	"./prism-chaiscript.js": "../../node_modules/prismjs/components/prism-chaiscript.js",
	"./prism-cil.js": "../../node_modules/prismjs/components/prism-cil.js",
	"./prism-cilkc.js": "../../node_modules/prismjs/components/prism-cilkc.js",
	"./prism-cilkcpp.js": "../../node_modules/prismjs/components/prism-cilkcpp.js",
	"./prism-clike.js": "../../node_modules/prismjs/components/prism-clike.js",
	"./prism-clojure.js": "../../node_modules/prismjs/components/prism-clojure.js",
	"./prism-cmake.js": "../../node_modules/prismjs/components/prism-cmake.js",
	"./prism-cobol.js": "../../node_modules/prismjs/components/prism-cobol.js",
	"./prism-coffeescript.js": "../../node_modules/prismjs/components/prism-coffeescript.js",
	"./prism-concurnas.js": "../../node_modules/prismjs/components/prism-concurnas.js",
	"./prism-cooklang.js": "../../node_modules/prismjs/components/prism-cooklang.js",
	"./prism-coq.js": "../../node_modules/prismjs/components/prism-coq.js",
	"./prism-core.js": "../../node_modules/prismjs/components/prism-core.js",
	"./prism-cpp.js": "../../node_modules/prismjs/components/prism-cpp.js",
	"./prism-crystal.js": "../../node_modules/prismjs/components/prism-crystal.js",
	"./prism-csharp.js": "../../node_modules/prismjs/components/prism-csharp.js",
	"./prism-cshtml.js": "../../node_modules/prismjs/components/prism-cshtml.js",
	"./prism-csp.js": "../../node_modules/prismjs/components/prism-csp.js",
	"./prism-css-extras.js": "../../node_modules/prismjs/components/prism-css-extras.js",
	"./prism-css.js": "../../node_modules/prismjs/components/prism-css.js",
	"./prism-csv.js": "../../node_modules/prismjs/components/prism-csv.js",
	"./prism-cue.js": "../../node_modules/prismjs/components/prism-cue.js",
	"./prism-cypher.js": "../../node_modules/prismjs/components/prism-cypher.js",
	"./prism-d.js": "../../node_modules/prismjs/components/prism-d.js",
	"./prism-dart.js": "../../node_modules/prismjs/components/prism-dart.js",
	"./prism-dataweave.js": "../../node_modules/prismjs/components/prism-dataweave.js",
	"./prism-dax.js": "../../node_modules/prismjs/components/prism-dax.js",
	"./prism-dhall.js": "../../node_modules/prismjs/components/prism-dhall.js",
	"./prism-diff.js": "../../node_modules/prismjs/components/prism-diff.js",
	"./prism-django.js": "../../node_modules/prismjs/components/prism-django.js",
	"./prism-dns-zone-file.js": "../../node_modules/prismjs/components/prism-dns-zone-file.js",
	"./prism-docker.js": "../../node_modules/prismjs/components/prism-docker.js",
	"./prism-dot.js": "../../node_modules/prismjs/components/prism-dot.js",
	"./prism-ebnf.js": "../../node_modules/prismjs/components/prism-ebnf.js",
	"./prism-editorconfig.js": "../../node_modules/prismjs/components/prism-editorconfig.js",
	"./prism-eiffel.js": "../../node_modules/prismjs/components/prism-eiffel.js",
	"./prism-ejs.js": "../../node_modules/prismjs/components/prism-ejs.js",
	"./prism-elixir.js": "../../node_modules/prismjs/components/prism-elixir.js",
	"./prism-elm.js": "../../node_modules/prismjs/components/prism-elm.js",
	"./prism-erb.js": "../../node_modules/prismjs/components/prism-erb.js",
	"./prism-erlang.js": "../../node_modules/prismjs/components/prism-erlang.js",
	"./prism-etlua.js": "../../node_modules/prismjs/components/prism-etlua.js",
	"./prism-excel-formula.js": "../../node_modules/prismjs/components/prism-excel-formula.js",
	"./prism-factor.js": "../../node_modules/prismjs/components/prism-factor.js",
	"./prism-false.js": "../../node_modules/prismjs/components/prism-false.js",
	"./prism-firestore-security-rules.js": "../../node_modules/prismjs/components/prism-firestore-security-rules.js",
	"./prism-flow.js": "../../node_modules/prismjs/components/prism-flow.js",
	"./prism-fortran.js": "../../node_modules/prismjs/components/prism-fortran.js",
	"./prism-fsharp.js": "../../node_modules/prismjs/components/prism-fsharp.js",
	"./prism-ftl.js": "../../node_modules/prismjs/components/prism-ftl.js",
	"./prism-gap.js": "../../node_modules/prismjs/components/prism-gap.js",
	"./prism-gcode.js": "../../node_modules/prismjs/components/prism-gcode.js",
	"./prism-gdscript.js": "../../node_modules/prismjs/components/prism-gdscript.js",
	"./prism-gedcom.js": "../../node_modules/prismjs/components/prism-gedcom.js",
	"./prism-gettext.js": "../../node_modules/prismjs/components/prism-gettext.js",
	"./prism-gherkin.js": "../../node_modules/prismjs/components/prism-gherkin.js",
	"./prism-git.js": "../../node_modules/prismjs/components/prism-git.js",
	"./prism-glsl.js": "../../node_modules/prismjs/components/prism-glsl.js",
	"./prism-gml.js": "../../node_modules/prismjs/components/prism-gml.js",
	"./prism-gn.js": "../../node_modules/prismjs/components/prism-gn.js",
	"./prism-go-module.js": "../../node_modules/prismjs/components/prism-go-module.js",
	"./prism-go.js": "../../node_modules/prismjs/components/prism-go.js",
	"./prism-gradle.js": "../../node_modules/prismjs/components/prism-gradle.js",
	"./prism-graphql.js": "../../node_modules/prismjs/components/prism-graphql.js",
	"./prism-groovy.js": "../../node_modules/prismjs/components/prism-groovy.js",
	"./prism-haml.js": "../../node_modules/prismjs/components/prism-haml.js",
	"./prism-handlebars.js": "../../node_modules/prismjs/components/prism-handlebars.js",
	"./prism-haskell.js": "../../node_modules/prismjs/components/prism-haskell.js",
	"./prism-haxe.js": "../../node_modules/prismjs/components/prism-haxe.js",
	"./prism-hcl.js": "../../node_modules/prismjs/components/prism-hcl.js",
	"./prism-hlsl.js": "../../node_modules/prismjs/components/prism-hlsl.js",
	"./prism-hoon.js": "../../node_modules/prismjs/components/prism-hoon.js",
	"./prism-hpkp.js": "../../node_modules/prismjs/components/prism-hpkp.js",
	"./prism-hsts.js": "../../node_modules/prismjs/components/prism-hsts.js",
	"./prism-http.js": "../../node_modules/prismjs/components/prism-http.js",
	"./prism-ichigojam.js": "../../node_modules/prismjs/components/prism-ichigojam.js",
	"./prism-icon.js": "../../node_modules/prismjs/components/prism-icon.js",
	"./prism-icu-message-format.js": "../../node_modules/prismjs/components/prism-icu-message-format.js",
	"./prism-idris.js": "../../node_modules/prismjs/components/prism-idris.js",
	"./prism-iecst.js": "../../node_modules/prismjs/components/prism-iecst.js",
	"./prism-ignore.js": "../../node_modules/prismjs/components/prism-ignore.js",
	"./prism-inform7.js": "../../node_modules/prismjs/components/prism-inform7.js",
	"./prism-ini.js": "../../node_modules/prismjs/components/prism-ini.js",
	"./prism-io.js": "../../node_modules/prismjs/components/prism-io.js",
	"./prism-j.js": "../../node_modules/prismjs/components/prism-j.js",
	"./prism-java.js": "../../node_modules/prismjs/components/prism-java.js",
	"./prism-javadoc.js": "../../node_modules/prismjs/components/prism-javadoc.js",
	"./prism-javadoclike.js": "../../node_modules/prismjs/components/prism-javadoclike.js",
	"./prism-javascript.js": "../../node_modules/prismjs/components/prism-javascript.js",
	"./prism-javastacktrace.js": "../../node_modules/prismjs/components/prism-javastacktrace.js",
	"./prism-jexl.js": "../../node_modules/prismjs/components/prism-jexl.js",
	"./prism-jolie.js": "../../node_modules/prismjs/components/prism-jolie.js",
	"./prism-jq.js": "../../node_modules/prismjs/components/prism-jq.js",
	"./prism-js-extras.js": "../../node_modules/prismjs/components/prism-js-extras.js",
	"./prism-js-templates.js": "../../node_modules/prismjs/components/prism-js-templates.js",
	"./prism-jsdoc.js": "../../node_modules/prismjs/components/prism-jsdoc.js",
	"./prism-json.js": "../../node_modules/prismjs/components/prism-json.js",
	"./prism-json5.js": "../../node_modules/prismjs/components/prism-json5.js",
	"./prism-jsonp.js": "../../node_modules/prismjs/components/prism-jsonp.js",
	"./prism-jsstacktrace.js": "../../node_modules/prismjs/components/prism-jsstacktrace.js",
	"./prism-jsx.js": "../../node_modules/prismjs/components/prism-jsx.js",
	"./prism-julia.js": "../../node_modules/prismjs/components/prism-julia.js",
	"./prism-keepalived.js": "../../node_modules/prismjs/components/prism-keepalived.js",
	"./prism-keyman.js": "../../node_modules/prismjs/components/prism-keyman.js",
	"./prism-kotlin.js": "../../node_modules/prismjs/components/prism-kotlin.js",
	"./prism-kumir.js": "../../node_modules/prismjs/components/prism-kumir.js",
	"./prism-kusto.js": "../../node_modules/prismjs/components/prism-kusto.js",
	"./prism-latex.js": "../../node_modules/prismjs/components/prism-latex.js",
	"./prism-latte.js": "../../node_modules/prismjs/components/prism-latte.js",
	"./prism-less.js": "../../node_modules/prismjs/components/prism-less.js",
	"./prism-lilypond.js": "../../node_modules/prismjs/components/prism-lilypond.js",
	"./prism-linker-script.js": "../../node_modules/prismjs/components/prism-linker-script.js",
	"./prism-liquid.js": "../../node_modules/prismjs/components/prism-liquid.js",
	"./prism-lisp.js": "../../node_modules/prismjs/components/prism-lisp.js",
	"./prism-livescript.js": "../../node_modules/prismjs/components/prism-livescript.js",
	"./prism-llvm.js": "../../node_modules/prismjs/components/prism-llvm.js",
	"./prism-log.js": "../../node_modules/prismjs/components/prism-log.js",
	"./prism-lolcode.js": "../../node_modules/prismjs/components/prism-lolcode.js",
	"./prism-lua.js": "../../node_modules/prismjs/components/prism-lua.js",
	"./prism-magma.js": "../../node_modules/prismjs/components/prism-magma.js",
	"./prism-makefile.js": "../../node_modules/prismjs/components/prism-makefile.js",
	"./prism-markdown.js": "../../node_modules/prismjs/components/prism-markdown.js",
	"./prism-markup-templating.js": "../../node_modules/prismjs/components/prism-markup-templating.js",
	"./prism-markup.js": "../../node_modules/prismjs/components/prism-markup.js",
	"./prism-mata.js": "../../node_modules/prismjs/components/prism-mata.js",
	"./prism-matlab.js": "../../node_modules/prismjs/components/prism-matlab.js",
	"./prism-maxscript.js": "../../node_modules/prismjs/components/prism-maxscript.js",
	"./prism-mel.js": "../../node_modules/prismjs/components/prism-mel.js",
	"./prism-mermaid.js": "../../node_modules/prismjs/components/prism-mermaid.js",
	"./prism-metafont.js": "../../node_modules/prismjs/components/prism-metafont.js",
	"./prism-mizar.js": "../../node_modules/prismjs/components/prism-mizar.js",
	"./prism-mongodb.js": "../../node_modules/prismjs/components/prism-mongodb.js",
	"./prism-monkey.js": "../../node_modules/prismjs/components/prism-monkey.js",
	"./prism-moonscript.js": "../../node_modules/prismjs/components/prism-moonscript.js",
	"./prism-n1ql.js": "../../node_modules/prismjs/components/prism-n1ql.js",
	"./prism-n4js.js": "../../node_modules/prismjs/components/prism-n4js.js",
	"./prism-nand2tetris-hdl.js": "../../node_modules/prismjs/components/prism-nand2tetris-hdl.js",
	"./prism-naniscript.js": "../../node_modules/prismjs/components/prism-naniscript.js",
	"./prism-nasm.js": "../../node_modules/prismjs/components/prism-nasm.js",
	"./prism-neon.js": "../../node_modules/prismjs/components/prism-neon.js",
	"./prism-nevod.js": "../../node_modules/prismjs/components/prism-nevod.js",
	"./prism-nginx.js": "../../node_modules/prismjs/components/prism-nginx.js",
	"./prism-nim.js": "../../node_modules/prismjs/components/prism-nim.js",
	"./prism-nix.js": "../../node_modules/prismjs/components/prism-nix.js",
	"./prism-nsis.js": "../../node_modules/prismjs/components/prism-nsis.js",
	"./prism-objectivec.js": "../../node_modules/prismjs/components/prism-objectivec.js",
	"./prism-ocaml.js": "../../node_modules/prismjs/components/prism-ocaml.js",
	"./prism-odin.js": "../../node_modules/prismjs/components/prism-odin.js",
	"./prism-opencl.js": "../../node_modules/prismjs/components/prism-opencl.js",
	"./prism-openqasm.js": "../../node_modules/prismjs/components/prism-openqasm.js",
	"./prism-oz.js": "../../node_modules/prismjs/components/prism-oz.js",
	"./prism-parigp.js": "../../node_modules/prismjs/components/prism-parigp.js",
	"./prism-parser.js": "../../node_modules/prismjs/components/prism-parser.js",
	"./prism-pascal.js": "../../node_modules/prismjs/components/prism-pascal.js",
	"./prism-pascaligo.js": "../../node_modules/prismjs/components/prism-pascaligo.js",
	"./prism-pcaxis.js": "../../node_modules/prismjs/components/prism-pcaxis.js",
	"./prism-peoplecode.js": "../../node_modules/prismjs/components/prism-peoplecode.js",
	"./prism-perl.js": "../../node_modules/prismjs/components/prism-perl.js",
	"./prism-php-extras.js": "../../node_modules/prismjs/components/prism-php-extras.js",
	"./prism-php.js": "../../node_modules/prismjs/components/prism-php.js",
	"./prism-phpdoc.js": "../../node_modules/prismjs/components/prism-phpdoc.js",
	"./prism-plant-uml.js": "../../node_modules/prismjs/components/prism-plant-uml.js",
	"./prism-plsql.js": "../../node_modules/prismjs/components/prism-plsql.js",
	"./prism-powerquery.js": "../../node_modules/prismjs/components/prism-powerquery.js",
	"./prism-powershell.js": "../../node_modules/prismjs/components/prism-powershell.js",
	"./prism-processing.js": "../../node_modules/prismjs/components/prism-processing.js",
	"./prism-prolog.js": "../../node_modules/prismjs/components/prism-prolog.js",
	"./prism-promql.js": "../../node_modules/prismjs/components/prism-promql.js",
	"./prism-properties.js": "../../node_modules/prismjs/components/prism-properties.js",
	"./prism-protobuf.js": "../../node_modules/prismjs/components/prism-protobuf.js",
	"./prism-psl.js": "../../node_modules/prismjs/components/prism-psl.js",
	"./prism-pug.js": "../../node_modules/prismjs/components/prism-pug.js",
	"./prism-puppet.js": "../../node_modules/prismjs/components/prism-puppet.js",
	"./prism-pure.js": "../../node_modules/prismjs/components/prism-pure.js",
	"./prism-purebasic.js": "../../node_modules/prismjs/components/prism-purebasic.js",
	"./prism-purescript.js": "../../node_modules/prismjs/components/prism-purescript.js",
	"./prism-python.js": "../../node_modules/prismjs/components/prism-python.js",
	"./prism-q.js": "../../node_modules/prismjs/components/prism-q.js",
	"./prism-qml.js": "../../node_modules/prismjs/components/prism-qml.js",
	"./prism-qore.js": "../../node_modules/prismjs/components/prism-qore.js",
	"./prism-qsharp.js": "../../node_modules/prismjs/components/prism-qsharp.js",
	"./prism-r.js": "../../node_modules/prismjs/components/prism-r.js",
	"./prism-racket.js": "../../node_modules/prismjs/components/prism-racket.js",
	"./prism-reason.js": "../../node_modules/prismjs/components/prism-reason.js",
	"./prism-regex.js": "../../node_modules/prismjs/components/prism-regex.js",
	"./prism-rego.js": "../../node_modules/prismjs/components/prism-rego.js",
	"./prism-renpy.js": "../../node_modules/prismjs/components/prism-renpy.js",
	"./prism-rescript.js": "../../node_modules/prismjs/components/prism-rescript.js",
	"./prism-rest.js": "../../node_modules/prismjs/components/prism-rest.js",
	"./prism-rip.js": "../../node_modules/prismjs/components/prism-rip.js",
	"./prism-roboconf.js": "../../node_modules/prismjs/components/prism-roboconf.js",
	"./prism-robotframework.js": "../../node_modules/prismjs/components/prism-robotframework.js",
	"./prism-ruby.js": "../../node_modules/prismjs/components/prism-ruby.js",
	"./prism-rust.js": "../../node_modules/prismjs/components/prism-rust.js",
	"./prism-sas.js": "../../node_modules/prismjs/components/prism-sas.js",
	"./prism-sass.js": "../../node_modules/prismjs/components/prism-sass.js",
	"./prism-scala.js": "../../node_modules/prismjs/components/prism-scala.js",
	"./prism-scheme.js": "../../node_modules/prismjs/components/prism-scheme.js",
	"./prism-scss.js": "../../node_modules/prismjs/components/prism-scss.js",
	"./prism-shell-session.js": "../../node_modules/prismjs/components/prism-shell-session.js",
	"./prism-smali.js": "../../node_modules/prismjs/components/prism-smali.js",
	"./prism-smalltalk.js": "../../node_modules/prismjs/components/prism-smalltalk.js",
	"./prism-smarty.js": "../../node_modules/prismjs/components/prism-smarty.js",
	"./prism-sml.js": "../../node_modules/prismjs/components/prism-sml.js",
	"./prism-solidity.js": "../../node_modules/prismjs/components/prism-solidity.js",
	"./prism-solution-file.js": "../../node_modules/prismjs/components/prism-solution-file.js",
	"./prism-soy.js": "../../node_modules/prismjs/components/prism-soy.js",
	"./prism-sparql.js": "../../node_modules/prismjs/components/prism-sparql.js",
	"./prism-splunk-spl.js": "../../node_modules/prismjs/components/prism-splunk-spl.js",
	"./prism-sqf.js": "../../node_modules/prismjs/components/prism-sqf.js",
	"./prism-sql.js": "../../node_modules/prismjs/components/prism-sql.js",
	"./prism-squirrel.js": "../../node_modules/prismjs/components/prism-squirrel.js",
	"./prism-stan.js": "../../node_modules/prismjs/components/prism-stan.js",
	"./prism-stata.js": "../../node_modules/prismjs/components/prism-stata.js",
	"./prism-stylus.js": "../../node_modules/prismjs/components/prism-stylus.js",
	"./prism-supercollider.js": "../../node_modules/prismjs/components/prism-supercollider.js",
	"./prism-swift.js": "../../node_modules/prismjs/components/prism-swift.js",
	"./prism-systemd.js": "../../node_modules/prismjs/components/prism-systemd.js",
	"./prism-t4-cs.js": "../../node_modules/prismjs/components/prism-t4-cs.js",
	"./prism-t4-templating.js": "../../node_modules/prismjs/components/prism-t4-templating.js",
	"./prism-t4-vb.js": "../../node_modules/prismjs/components/prism-t4-vb.js",
	"./prism-tap.js": "../../node_modules/prismjs/components/prism-tap.js",
	"./prism-tcl.js": "../../node_modules/prismjs/components/prism-tcl.js",
	"./prism-textile.js": "../../node_modules/prismjs/components/prism-textile.js",
	"./prism-toml.js": "../../node_modules/prismjs/components/prism-toml.js",
	"./prism-tremor.js": "../../node_modules/prismjs/components/prism-tremor.js",
	"./prism-tsx.js": "../../node_modules/prismjs/components/prism-tsx.js",
	"./prism-tt2.js": "../../node_modules/prismjs/components/prism-tt2.js",
	"./prism-turtle.js": "../../node_modules/prismjs/components/prism-turtle.js",
	"./prism-twig.js": "../../node_modules/prismjs/components/prism-twig.js",
	"./prism-typescript.js": "../../node_modules/prismjs/components/prism-typescript.js",
	"./prism-typoscript.js": "../../node_modules/prismjs/components/prism-typoscript.js",
	"./prism-unrealscript.js": "../../node_modules/prismjs/components/prism-unrealscript.js",
	"./prism-uorazor.js": "../../node_modules/prismjs/components/prism-uorazor.js",
	"./prism-uri.js": "../../node_modules/prismjs/components/prism-uri.js",
	"./prism-v.js": "../../node_modules/prismjs/components/prism-v.js",
	"./prism-vala.js": "../../node_modules/prismjs/components/prism-vala.js",
	"./prism-vbnet.js": "../../node_modules/prismjs/components/prism-vbnet.js",
	"./prism-velocity.js": "../../node_modules/prismjs/components/prism-velocity.js",
	"./prism-verilog.js": "../../node_modules/prismjs/components/prism-verilog.js",
	"./prism-vhdl.js": "../../node_modules/prismjs/components/prism-vhdl.js",
	"./prism-vim.js": "../../node_modules/prismjs/components/prism-vim.js",
	"./prism-visual-basic.js": "../../node_modules/prismjs/components/prism-visual-basic.js",
	"./prism-warpscript.js": "../../node_modules/prismjs/components/prism-warpscript.js",
	"./prism-wasm.js": "../../node_modules/prismjs/components/prism-wasm.js",
	"./prism-web-idl.js": "../../node_modules/prismjs/components/prism-web-idl.js",
	"./prism-wgsl.js": "../../node_modules/prismjs/components/prism-wgsl.js",
	"./prism-wiki.js": "../../node_modules/prismjs/components/prism-wiki.js",
	"./prism-wolfram.js": "../../node_modules/prismjs/components/prism-wolfram.js",
	"./prism-wren.js": "../../node_modules/prismjs/components/prism-wren.js",
	"./prism-xeora.js": "../../node_modules/prismjs/components/prism-xeora.js",
	"./prism-xml-doc.js": "../../node_modules/prismjs/components/prism-xml-doc.js",
	"./prism-xojo.js": "../../node_modules/prismjs/components/prism-xojo.js",
	"./prism-xquery.js": "../../node_modules/prismjs/components/prism-xquery.js",
	"./prism-yaml.js": "../../node_modules/prismjs/components/prism-yaml.js",
	"./prism-yang.js": "../../node_modules/prismjs/components/prism-yang.js",
	"./prism-zig.js": "../../node_modules/prismjs/components/prism-zig.js"
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
webpackContext.id = "../../node_modules/prismjs/components sync recursive prism-[a-z0-9-]+\\.js";

/***/ }),

/***/ "../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css":
/*!******************************************************************************!*\
  !*** ../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css ***!
  \******************************************************************************/
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../node_modules/prismjs/plugins/toolbar/prism-toolbar.css":
/*!********************************************************************!*\
  !*** ../../node_modules/prismjs/plugins/toolbar/prism-toolbar.css ***!
  \********************************************************************/
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../node_modules/redux-logger/dist/redux-logger.js":
/*!************************************************************!*\
  !*** ../../node_modules/redux-logger/dist/redux-logger.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

!function(e, t) {
   true ? t(exports) : 0;
}(this, function(e) {
  "use strict";
  function t(e2, t2) {
    e2.super_ = t2, e2.prototype = Object.create(t2.prototype, { constructor: { value: e2, enumerable: false, writable: true, configurable: true } });
  }
  function r(e2, t2) {
    Object.defineProperty(this, "kind", { value: e2, enumerable: true }), t2 && t2.length && Object.defineProperty(this, "path", { value: t2, enumerable: true });
  }
  function n(e2, t2, r2) {
    n.super_.call(this, "E", e2), Object.defineProperty(this, "lhs", { value: t2, enumerable: true }), Object.defineProperty(this, "rhs", { value: r2, enumerable: true });
  }
  function o(e2, t2) {
    o.super_.call(this, "N", e2), Object.defineProperty(this, "rhs", { value: t2, enumerable: true });
  }
  function i(e2, t2) {
    i.super_.call(this, "D", e2), Object.defineProperty(this, "lhs", { value: t2, enumerable: true });
  }
  function a(e2, t2, r2) {
    a.super_.call(this, "A", e2), Object.defineProperty(this, "index", { value: t2, enumerable: true }), Object.defineProperty(this, "item", { value: r2, enumerable: true });
  }
  function f(e2, t2, r2) {
    var n2 = e2.slice((r2 || t2) + 1 || e2.length);
    return e2.length = t2 < 0 ? e2.length + t2 : t2, e2.push.apply(e2, n2), e2;
  }
  function u(e2) {
    var t2 = "undefined" == typeof e2 ? "undefined" : N(e2);
    return "object" !== t2 ? t2 : e2 === Math ? "math" : null === e2 ? "null" : Array.isArray(e2) ? "array" : "[object Date]" === Object.prototype.toString.call(e2) ? "date" : "function" == typeof e2.toString && /^\/.*\//.test(e2.toString()) ? "regexp" : "object";
  }
  function l(e2, t2, r2, c2, s2, d2, p2) {
    s2 = s2 || [], p2 = p2 || [];
    var g2 = s2.slice(0);
    if ("undefined" != typeof d2) {
      if (c2) {
        if ("function" == typeof c2 && c2(g2, d2)) return;
        if ("object" === ("undefined" == typeof c2 ? "undefined" : N(c2))) {
          if (c2.prefilter && c2.prefilter(g2, d2)) return;
          if (c2.normalize) {
            var h2 = c2.normalize(g2, d2, e2, t2);
            h2 && (e2 = h2[0], t2 = h2[1]);
          }
        }
      }
      g2.push(d2);
    }
    "regexp" === u(e2) && "regexp" === u(t2) && (e2 = e2.toString(), t2 = t2.toString());
    var y2 = "undefined" == typeof e2 ? "undefined" : N(e2), v2 = "undefined" == typeof t2 ? "undefined" : N(t2), b2 = "undefined" !== y2 || p2 && p2[p2.length - 1].lhs && p2[p2.length - 1].lhs.hasOwnProperty(d2), m2 = "undefined" !== v2 || p2 && p2[p2.length - 1].rhs && p2[p2.length - 1].rhs.hasOwnProperty(d2);
    if (!b2 && m2) r2(new o(g2, t2));
    else if (!m2 && b2) r2(new i(g2, e2));
    else if (u(e2) !== u(t2)) r2(new n(g2, e2, t2));
    else if ("date" === u(e2) && e2 - t2 !== 0) r2(new n(g2, e2, t2));
    else if ("object" === y2 && null !== e2 && null !== t2) if (p2.filter(function(t3) {
      return t3.lhs === e2;
    }).length) e2 !== t2 && r2(new n(g2, e2, t2));
    else {
      if (p2.push({ lhs: e2, rhs: t2 }), Array.isArray(e2)) {
        var w2;
        e2.length;
        for (w2 = 0; w2 < e2.length; w2++) w2 >= t2.length ? r2(new a(g2, w2, new i(void 0, e2[w2]))) : l(e2[w2], t2[w2], r2, c2, g2, w2, p2);
        for (; w2 < t2.length; ) r2(new a(g2, w2, new o(void 0, t2[w2++])));
      } else {
        var x2 = Object.keys(e2), S2 = Object.keys(t2);
        x2.forEach(function(n2, o2) {
          var i2 = S2.indexOf(n2);
          i2 >= 0 ? (l(e2[n2], t2[n2], r2, c2, g2, n2, p2), S2 = f(S2, i2)) : l(e2[n2], void 0, r2, c2, g2, n2, p2);
        }), S2.forEach(function(e3) {
          l(void 0, t2[e3], r2, c2, g2, e3, p2);
        });
      }
      p2.length = p2.length - 1;
    }
    else e2 !== t2 && ("number" === y2 && isNaN(e2) && isNaN(t2) || r2(new n(g2, e2, t2)));
  }
  function c(e2, t2, r2, n2) {
    return n2 = n2 || [], l(e2, t2, function(e3) {
      e3 && n2.push(e3);
    }, r2), n2.length ? n2 : void 0;
  }
  function s(e2, t2, r2) {
    if (r2.path && r2.path.length) {
      var n2, o2 = e2[t2], i2 = r2.path.length - 1;
      for (n2 = 0; n2 < i2; n2++) o2 = o2[r2.path[n2]];
      switch (r2.kind) {
        case "A":
          s(o2[r2.path[n2]], r2.index, r2.item);
          break;
        case "D":
          delete o2[r2.path[n2]];
          break;
        case "E":
        case "N":
          o2[r2.path[n2]] = r2.rhs;
      }
    } else switch (r2.kind) {
      case "A":
        s(e2[t2], r2.index, r2.item);
        break;
      case "D":
        e2 = f(e2, t2);
        break;
      case "E":
      case "N":
        e2[t2] = r2.rhs;
    }
    return e2;
  }
  function d(e2, t2, r2) {
    if (e2 && t2 && r2 && r2.kind) {
      for (var n2 = e2, o2 = -1, i2 = r2.path ? r2.path.length - 1 : 0; ++o2 < i2; ) "undefined" == typeof n2[r2.path[o2]] && (n2[r2.path[o2]] = "number" == typeof r2.path[o2] ? [] : {}), n2 = n2[r2.path[o2]];
      switch (r2.kind) {
        case "A":
          s(r2.path ? n2[r2.path[o2]] : n2, r2.index, r2.item);
          break;
        case "D":
          delete n2[r2.path[o2]];
          break;
        case "E":
        case "N":
          n2[r2.path[o2]] = r2.rhs;
      }
    }
  }
  function p(e2, t2, r2) {
    if (r2.path && r2.path.length) {
      var n2, o2 = e2[t2], i2 = r2.path.length - 1;
      for (n2 = 0; n2 < i2; n2++) o2 = o2[r2.path[n2]];
      switch (r2.kind) {
        case "A":
          p(o2[r2.path[n2]], r2.index, r2.item);
          break;
        case "D":
          o2[r2.path[n2]] = r2.lhs;
          break;
        case "E":
          o2[r2.path[n2]] = r2.lhs;
          break;
        case "N":
          delete o2[r2.path[n2]];
      }
    } else switch (r2.kind) {
      case "A":
        p(e2[t2], r2.index, r2.item);
        break;
      case "D":
        e2[t2] = r2.lhs;
        break;
      case "E":
        e2[t2] = r2.lhs;
        break;
      case "N":
        e2 = f(e2, t2);
    }
    return e2;
  }
  function g(e2, t2, r2) {
    if (e2 && t2 && r2 && r2.kind) {
      var n2, o2, i2 = e2;
      for (o2 = r2.path.length - 1, n2 = 0; n2 < o2; n2++) "undefined" == typeof i2[r2.path[n2]] && (i2[r2.path[n2]] = {}), i2 = i2[r2.path[n2]];
      switch (r2.kind) {
        case "A":
          p(i2[r2.path[n2]], r2.index, r2.item);
          break;
        case "D":
          i2[r2.path[n2]] = r2.lhs;
          break;
        case "E":
          i2[r2.path[n2]] = r2.lhs;
          break;
        case "N":
          delete i2[r2.path[n2]];
      }
    }
  }
  function h(e2, t2, r2) {
    if (e2 && t2) {
      var n2 = function(n3) {
        r2 && !r2(e2, t2, n3) || d(e2, t2, n3);
      };
      l(e2, t2, n2);
    }
  }
  function y(e2) {
    return "color: " + F[e2].color + "; font-weight: bold";
  }
  function v(e2) {
    var t2 = e2.kind, r2 = e2.path, n2 = e2.lhs, o2 = e2.rhs, i2 = e2.index, a2 = e2.item;
    switch (t2) {
      case "E":
        return [r2.join("."), n2, "\u2192", o2];
      case "N":
        return [r2.join("."), o2];
      case "D":
        return [r2.join(".")];
      case "A":
        return [r2.join(".") + "[" + i2 + "]", a2];
      default:
        return [];
    }
  }
  function b(e2, t2, r2, n2) {
    var o2 = c(e2, t2);
    try {
      n2 ? r2.groupCollapsed("diff") : r2.group("diff");
    } catch (e3) {
      r2.log("diff");
    }
    o2 ? o2.forEach(function(e3) {
      var t3 = e3.kind, n3 = v(e3);
      r2.log.apply(r2, ["%c " + F[t3].text, y(t3)].concat(P(n3)));
    }) : r2.log("\u2014\u2014 no diff \u2014\u2014");
    try {
      r2.groupEnd();
    } catch (e3) {
      r2.log("\u2014\u2014 diff end \u2014\u2014 ");
    }
  }
  function m(e2, t2, r2, n2) {
    switch ("undefined" == typeof e2 ? "undefined" : N(e2)) {
      case "object":
        return "function" == typeof e2[n2] ? e2[n2].apply(e2, P(r2)) : e2[n2];
      case "function":
        return e2(t2);
      default:
        return e2;
    }
  }
  function w(e2) {
    var t2 = e2.timestamp, r2 = e2.duration;
    return function(e3, n2, o2) {
      var i2 = ["action"];
      return i2.push("%c" + String(e3.type)), t2 && i2.push("%c@ " + n2), r2 && i2.push("%c(in " + o2.toFixed(2) + " ms)"), i2.join(" ");
    };
  }
  function x(e2, t2) {
    var r2 = t2.logger, n2 = t2.actionTransformer, o2 = t2.titleFormatter, i2 = void 0 === o2 ? w(t2) : o2, a2 = t2.collapsed, f2 = t2.colors, u2 = t2.level, l2 = t2.diff, c2 = "undefined" == typeof t2.titleFormatter;
    e2.forEach(function(o3, s2) {
      var d2 = o3.started, p2 = o3.startedTime, g2 = o3.action, h2 = o3.prevState, y2 = o3.error, v2 = o3.took, w2 = o3.nextState, x2 = e2[s2 + 1];
      x2 && (w2 = x2.prevState, v2 = x2.started - d2);
      var S2 = n2(g2), k2 = "function" == typeof a2 ? a2(function() {
        return w2;
      }, g2, o3) : a2, j2 = D(p2), E2 = f2.title ? "color: " + f2.title(S2) + ";" : "", A2 = ["color: gray; font-weight: lighter;"];
      A2.push(E2), t2.timestamp && A2.push("color: gray; font-weight: lighter;"), t2.duration && A2.push("color: gray; font-weight: lighter;");
      var O2 = i2(S2, j2, v2);
      try {
        k2 ? f2.title && c2 ? r2.groupCollapsed.apply(r2, ["%c " + O2].concat(A2)) : r2.groupCollapsed(O2) : f2.title && c2 ? r2.group.apply(r2, ["%c " + O2].concat(A2)) : r2.group(O2);
      } catch (e3) {
        r2.log(O2);
      }
      var N2 = m(u2, S2, [h2], "prevState"), P2 = m(u2, S2, [S2], "action"), C2 = m(u2, S2, [y2, h2], "error"), F2 = m(u2, S2, [w2], "nextState");
      if (N2) if (f2.prevState) {
        var L2 = "color: " + f2.prevState(h2) + "; font-weight: bold";
        r2[N2]("%c prev state", L2, h2);
      } else r2[N2]("prev state", h2);
      if (P2) if (f2.action) {
        var T2 = "color: " + f2.action(S2) + "; font-weight: bold";
        r2[P2]("%c action    ", T2, S2);
      } else r2[P2]("action    ", S2);
      if (y2 && C2) if (f2.error) {
        var M = "color: " + f2.error(y2, h2) + "; font-weight: bold;";
        r2[C2]("%c error     ", M, y2);
      } else r2[C2]("error     ", y2);
      if (F2) if (f2.nextState) {
        var _ = "color: " + f2.nextState(w2) + "; font-weight: bold";
        r2[F2]("%c next state", _, w2);
      } else r2[F2]("next state", w2);
      l2 && b(h2, w2, r2, k2);
      try {
        r2.groupEnd();
      } catch (e3) {
        r2.log("\u2014\u2014 log end \u2014\u2014");
      }
    });
  }
  function S() {
    var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = Object.assign({}, L, e2), r2 = t2.logger, n2 = t2.stateTransformer, o2 = t2.errorTransformer, i2 = t2.predicate, a2 = t2.logErrors, f2 = t2.diffPredicate;
    if ("undefined" == typeof r2) return function() {
      return function(e3) {
        return function(t3) {
          return e3(t3);
        };
      };
    };
    if (e2.getState && e2.dispatch) return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"), function() {
      return function(e3) {
        return function(t3) {
          return e3(t3);
        };
      };
    };
    var u2 = [];
    return function(e3) {
      var r3 = e3.getState;
      return function(e4) {
        return function(l2) {
          if ("function" == typeof i2 && !i2(r3, l2)) return e4(l2);
          var c2 = {};
          u2.push(c2), c2.started = O.now(), c2.startedTime = /* @__PURE__ */ new Date(), c2.prevState = n2(r3()), c2.action = l2;
          var s2 = void 0;
          if (a2) try {
            s2 = e4(l2);
          } catch (e5) {
            c2.error = o2(e5);
          }
          else s2 = e4(l2);
          c2.took = O.now() - c2.started, c2.nextState = n2(r3());
          var d2 = t2.diff && "function" == typeof f2 ? f2(r3, l2) : t2.diff;
          if (x(u2, Object.assign({}, t2, { diff: d2 })), u2.length = 0, c2.error) throw c2.error;
          return s2;
        };
      };
    };
  }
  var k, j, E = function(e2, t2) {
    return new Array(t2 + 1).join(e2);
  }, A = function(e2, t2) {
    return E("0", t2 - e2.toString().length) + e2;
  }, D = function(e2) {
    return A(e2.getHours(), 2) + ":" + A(e2.getMinutes(), 2) + ":" + A(e2.getSeconds(), 2) + "." + A(e2.getMilliseconds(), 3);
  }, O = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance : Date, N = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e2) {
    return typeof e2;
  } : function(e2) {
    return e2 && "function" == typeof Symbol && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
  }, P = function(e2) {
    if (Array.isArray(e2)) {
      for (var t2 = 0, r2 = Array(e2.length); t2 < e2.length; t2++) r2[t2] = e2[t2];
      return r2;
    }
    return Array.from(e2);
  }, C = [];
  k = "object" === ("undefined" == typeof __webpack_require__.g ? "undefined" : N(__webpack_require__.g)) && __webpack_require__.g ? __webpack_require__.g : "undefined" != typeof window ? window : {}, j = k.DeepDiff, j && C.push(function() {
    "undefined" != typeof j && k.DeepDiff === c && (k.DeepDiff = j, j = void 0);
  }), t(n, r), t(o, r), t(i, r), t(a, r), Object.defineProperties(c, { diff: { value: c, enumerable: true }, observableDiff: { value: l, enumerable: true }, applyDiff: { value: h, enumerable: true }, applyChange: { value: d, enumerable: true }, revertChange: { value: g, enumerable: true }, isConflict: { value: function() {
    return "undefined" != typeof j;
  }, enumerable: true }, noConflict: { value: function() {
    return C && (C.forEach(function(e2) {
      e2();
    }), C = null), c;
  }, enumerable: true } });
  var F = { E: { color: "#2196F3", text: "CHANGED:" }, N: { color: "#4CAF50", text: "ADDED:" }, D: { color: "#F44336", text: "DELETED:" }, A: { color: "#2196F3", text: "ARRAY:" } }, L = { level: "log", logger: console, logErrors: true, collapsed: void 0, predicate: void 0, duration: false, timestamp: true, stateTransformer: function(e2) {
    return e2;
  }, actionTransformer: function(e2) {
    return e2;
  }, errorTransformer: function(e2) {
    return e2;
  }, colors: { title: function() {
    return "inherit";
  }, prevState: function() {
    return "#9E9E9E";
  }, action: function() {
    return "#03A9F4";
  }, nextState: function() {
    return "#4CAF50";
  }, error: function() {
    return "#F20404";
  } }, diff: false, diffPredicate: void 0, transformer: void 0 }, T = function() {
    var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = e2.dispatch, r2 = e2.getState;
    return "function" == typeof t2 || "function" == typeof r2 ? S()({ dispatch: t2, getState: r2 }) : void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n");
  };
  e.defaults = L, e.createLogger = S, e.logger = T, e.default = T, Object.defineProperty(e, "__esModule", { value: true });
});


/***/ }),

/***/ "../../node_modules/zrender/node_modules/tslib/tslib.es6.js":
/*!******************************************************************!*\
  !*** ../../node_modules/zrender/node_modules/tslib/tslib.es6.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __extends: () => (/* binding */ __extends)
/* harmony export */ });
/* unused harmony exports __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get: function() {
    return m[k];
  } });
} : function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  o[k2] = m[k];
};
function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || from);
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function(v) {
      return new Promise(function(a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
};
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}


/***/ }),

/***/ "./components/highlighter/meta.js":
/*!****************************************!*\
  !*** ./components/highlighter/meta.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
  { name: "C", ext: ["c", "h"] },
  { name: "C++", ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"] },
  { name: "Go", ext: ["go"] },
  { name: "Haskell", ext: ["hs"] },
  { name: "Java", ext: ["java"] },
  { name: "JavaScript", ext: ["js"] },
  { name: "Pascal", ext: ["p", "pas"] },
  { name: "PHP", ext: ["php", "php3", "php4", "php5", "php7", "phtml"] },
  { name: "Python", ext: ["BUILD", "bzl", "py", "pyw"] },
  { name: "Rust", ext: ["rs"] }
]);


/***/ }),

/***/ "./components/highlighter/prismjs.js":
/*!*******************************************!*\
  !*** ./components/highlighter/prismjs.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prismjs */ "../../node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs/plugins/toolbar/prism-toolbar */ "../../node_modules/prismjs/plugins/toolbar/prism-toolbar.js");
/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_toolbar_prism_toolbar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prismjs/plugins/toolbar/prism-toolbar.css */ "../../node_modules/prismjs/plugins/toolbar/prism-toolbar.css");
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prismjs/plugins/line-numbers/prism-line-numbers */ "../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js");
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prismjs/plugins/line-numbers/prism-line-numbers.css */ "../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css");
/* harmony import */ var prismjs_plugins_line_highlight_prism_line_highlight__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prismjs/plugins/line-highlight/prism-line-highlight */ "../../node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js");
/* harmony import */ var prismjs_plugins_line_highlight_prism_line_highlight__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_line_highlight_prism_line_highlight__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! clipboard */ "../../node_modules/clipboard/dist/clipboard.js");
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(clipboard__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prismjs_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prismjs/components */ "../../node_modules/prismjs/components.js");
/* harmony import */ var prismjs_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prismjs_components__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prismjs_dependencies__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prismjs/dependencies */ "../../node_modules/prismjs/dependencies.js");
/* harmony import */ var prismjs_dependencies__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prismjs_dependencies__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var vj_components_notification_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vj/components/notification/index */ "./components/notification/index.ts");
/* harmony import */ var vj_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vj/utils */ "./utils/index.ts");
/* harmony import */ var _meta__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./meta */ "./components/highlighter/meta.js");













const files = __webpack_require__("../../node_modules/prismjs/components sync recursive prism-[a-z0-9-]+\\.js");
const loadedLanguages = /* @__PURE__ */ new Set();
function loadLanguages() {
  const languages = Object.keys((prismjs_components__WEBPACK_IMPORTED_MODULE_8___default().languages)).filter((l) => l !== "meta");
  const loaded = [...loadedLanguages, ...Object.keys((prismjs__WEBPACK_IMPORTED_MODULE_0___default().languages))];
  prismjs_dependencies__WEBPACK_IMPORTED_MODULE_9___default()((prismjs_components__WEBPACK_IMPORTED_MODULE_8___default()), languages, loaded).load((lang) => {
    files(`./prism-${lang}.js`);
    loadedLanguages.add(lang);
  });
}
const languageExtMap = {};
loadLanguages();
_meta__WEBPACK_IMPORTED_MODULE_12__["default"].forEach((meta) => {
  for (let i = 0; i < meta.ext.length; ++i) {
    if ((prismjs__WEBPACK_IMPORTED_MODULE_0___default().languages)[meta.ext[i]] !== void 0) {
      meta.target = meta.ext[i];
      break;
    }
  }
  meta.ext.forEach((ext) => {
    languageExtMap[ext] = meta.target;
  });
});
prismjs__WEBPACK_IMPORTED_MODULE_0___default().plugins.toolbar.registerButton("copy-to-clipboard", (env) => {
  const linkCopy = document.createElement("a");
  linkCopy.href = "javascript:;";
  linkCopy.textContent = "Copy";
  const clip = new (clipboard__WEBPACK_IMPORTED_MODULE_6___default())(linkCopy, { text: () => env.code });
  clip.on("success", () => {
    vj_components_notification_index__WEBPACK_IMPORTED_MODULE_10__["default"].success((0,vj_utils__WEBPACK_IMPORTED_MODULE_11__.i18n)("Content copied to clipboard!"), 1e3);
  });
  clip.on("error", () => {
    vj_components_notification_index__WEBPACK_IMPORTED_MODULE_10__["default"].error((0,vj_utils__WEBPACK_IMPORTED_MODULE_11__.i18n)("Copy failed :("));
  });
  return linkCopy;
});
const invisibles = {
  tab: /\t/,
  crlf: /\r\n/,
  lf: /\n/,
  cr: /\r/,
  space: / /
};
function addInvisibles(grammar) {
  if (!grammar || grammar.tab) return;
  for (const name in invisibles) {
    if (Object.prototype.hasOwnProperty.call(invisibles, name)) {
      grammar[name] = invisibles[name];
    }
  }
  for (const name in grammar) {
    if (Object.prototype.hasOwnProperty.call(grammar, name) && !invisibles[name]) {
      if (name === "rest") addInvisibles(grammar.rest);
      else handlerInvisiblesToken(grammar, name);
    }
  }
}
function handlerInvisiblesToken(tokens, name) {
  const value = tokens[name];
  const type = prismjs__WEBPACK_IMPORTED_MODULE_0___default().util.type(value);
  if (type === "RegExp") {
    const inside = {};
    tokens[name] = { pattern: value, inside };
    addInvisibles(inside);
  } else if (type === "Array") {
    for (let i = 0, l = value.length; i < l; i++) handlerInvisiblesToken(value, i);
  } else {
    value.inside || (value.inside = {});
    addInvisibles(value.inside);
  }
}
prismjs__WEBPACK_IMPORTED_MODULE_0___default().hooks.add("before-highlight", (env) => {
  if (UserContext.showInvisibleChar) addInvisibles(env.grammar);
});
const prismjsApiWrap = {
  highlightBlocks: ($dom) => {
    $dom.find("pre code").get().forEach((code) => {
      const $code = jquery__WEBPACK_IMPORTED_MODULE_7___default()(code);
      const $pre = $code.parent();
      $pre.addClass("syntax-hl");
      const language = (jquery__WEBPACK_IMPORTED_MODULE_7___default()(code).attr("class") || "").trim();
      const m = language.match(/language-([a-z]+)/);
      if (m && m[1]) {
        const languageName = m[1].toLowerCase();
        if (languageExtMap[languageName]) {
          jquery__WEBPACK_IMPORTED_MODULE_7___default()(code).attr("class", `language-${languageExtMap[languageName]}`);
        }
      }
      prismjs__WEBPACK_IMPORTED_MODULE_0___default().highlightElement(code);
    });
  },
  highlight: (text, grammar, language) => prismjs__WEBPACK_IMPORTED_MODULE_0___default().highlight(text, grammar, language),
  Prism: (prismjs__WEBPACK_IMPORTED_MODULE_0___default())
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prismjsApiWrap);


/***/ })

}]);