;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6d0b7ae1-d6a4-4a8d-bfca-1b5878464bcc",e._sentryDebugIdIdentifier="sentry-dbid-6d0b7ae1-d6a4-4a8d-bfca-1b5878464bcc");})();}catch(e){}};
!function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"00ee96a191eaa70b72f3e18304fd7a157fe83a8e"};}();
"use strict";
(self["webpackChunk_hydrooj_ui_default"] = self["webpackChunk_hydrooj_ui_default"] || []).push([["n.md-editor-rt"],{

/***/ "../../node_modules/md-editor-rt/lib/es/chunks/ContentPreview.mjs":
/*!************************************************************************!*\
  !*** ../../node_modules/md-editor-rt/lib/es/chunks/ContentPreview.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ M),
/* harmony export */   a: () => (/* binding */ rr),
/* harmony export */   b: () => (/* binding */ Zt),
/* harmony export */   c: () => (/* binding */ Jt),
/* harmony export */   d: () => (/* binding */ Bt),
/* harmony export */   e: () => (/* binding */ Xt),
/* harmony export */   f: () => (/* binding */ Yt),
/* harmony export */   g: () => (/* binding */ Qt),
/* harmony export */   h: () => (/* binding */ er),
/* harmony export */   u: () => (/* binding */ tr)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event-name.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/event-name.mjs");
/* harmony import */ var _config_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/config.mjs");
/* harmony import */ var _dom_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/dom.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
/* harmony import */ var _context_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/context.mjs");
/* harmony import */ var medium_zoom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! medium-zoom */ "../../node_modules/medium-zoom/dist/medium-zoom.esm.js");
/* harmony import */ var _vavt_copy2clipboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @vavt/copy2clipboard */ "../../node_modules/@vavt/copy2clipboard/index.mjs");
/* harmony import */ var markdown_it__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! markdown-it */ "../../node_modules/markdown-it/index.mjs");
/* harmony import */ var markdown_it_image_figures__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! markdown-it-image-figures */ "../../node_modules/markdown-it-image-figures/dist/markdown-it-images-figures.mjs");
/* harmony import */ var markdown_it_sub__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! markdown-it-sub */ "../../node_modules/markdown-it-sub/index.mjs");
/* harmony import */ var markdown_it_sup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! markdown-it-sup */ "../../node_modules/markdown-it-sup/index.mjs");
/* harmony import */ var _vavt_util__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @vavt/util */ "../../node_modules/@vavt/util/lib/es/index.mjs");
/* harmony import */ var _index3_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./index3.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/index3.mjs");
/* harmony import */ var lru_cache__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lru-cache */ "../../node_modules/lru-cache/dist/esm/index.js");















const M = {
  hljs: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-hljs`,
  hlcss: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-hlCss`,
  prettier: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-prettier`,
  prettierMD: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-prettierMD`,
  cropperjs: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-cropper`,
  croppercss: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-cropperCss`,
  screenfull: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-screenfull`,
  mermaidM: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-mermaid-m`,
  mermaid: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-mermaid`,
  katexjs: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-katex`,
  katexcss: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-katexCss`
}, Zt = (t, e) => {
  const { value: s, modelValue: n, onSave: r } = t, { editorId: d } = e, [o, u] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    // 是否已编译成html
    buildFinished: false,
    // 存储当前最新的html
    html: ""
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const i = (m) => {
      u(() => ({
        buildFinished: true,
        html: m
      }));
    };
    return _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(d, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.B,
      callback: i
    }), () => {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.remove(d, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.B, i);
    };
  }, [d]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const i = () => {
      if (r) {
        const m = new Promise((l) => {
          if (o.buildFinished)
            l(o.html);
          else {
            const c = (a) => {
              l(a), _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.remove(d, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.B, c);
            };
            _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(d, {
              name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.B,
              callback: c
            });
          }
        });
        r(s || n || "", m);
      }
    };
    return _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(d, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.c,
      callback: i
    }), () => {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.remove(d, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.c, i);
    };
  }, [d, n, r, o.buildFinished, o.html, s]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    u((i) => ({
      ...i,
      buildFinished: false
    }));
  }, [s, n]);
}, Jt = (t) => {
  const { noPrettier: e, noUploadImg: s } = t;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const { editorExtensions: n, editorExtensionsAttrs: r } = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.g, d = e || !!n.prettier.prettierInstance, o = e || !!n.prettier.parserMarkdownInstance;
    if (!(s || !!n.cropper.instance)) {
      const { js: i = {}, css: m = {} } = r.cropper || {};
      (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.a)("link", {
        ...m,
        rel: "stylesheet",
        href: n.cropper.css,
        id: M.croppercss
      }), (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.a)("script", {
        ...i,
        src: n.cropper.js,
        id: M.cropperjs
      });
    }
    if (!d) {
      const { standaloneJs: i = {} } = r.prettier || {};
      (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.a)("script", {
        ...i,
        src: n.prettier.standaloneJs,
        id: M.prettier
      });
    }
    if (!o) {
      const { parserMarkdownJs: i = {} } = r.prettier || {};
      (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.a)("script", {
        ...i,
        src: n.prettier.parserMarkdownJs,
        id: M.prettierMD
      });
    }
  }, [e, s]);
}, Xt = (t, e) => {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(t, {
    name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.E,
    callback: e
  }), () => {
    _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.remove(t, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.E, e);
  }), [t, e]);
}, Bt = (t, e) => {
  const { editorId: s } = e, { onUploadImg: n } = t;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const r = (d, o) => {
      const u = (i) => {
        _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(s, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.R, "image", {
          desc: "",
          urls: i
        }), o == null || o();
      };
      n == null || n(d, u);
    };
    return _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(s, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.U,
      callback: r
    }), () => {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.remove(s, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.U, r);
    };
  }, [s, n]);
}, Yt = (t, e) => {
  const { editorId: s } = e, [n, r] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const d = (o) => {
      r(o === void 0 ? (u) => !u : o);
    };
    return _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(s, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.a,
      callback: d
    }), () => {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.remove(s, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.a, d);
    };
  }, [s]), n;
};
let _e = "";
const Qt = (t) => {
  const {
    theme: e = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.d.theme,
    preview: s = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.d.preview,
    htmlPreview: n = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.d.htmlPreview,
    pageFullscreen: r = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.d.pageFullscreen,
    previewTheme: d = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.d.previewTheme,
    codeTheme: o = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.d.codeTheme,
    language: u = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.d.language,
    codeStyleReverse: i = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.d.codeStyleReverse,
    codeStyleReverseList: m = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.d.codeStyleReverseList
  } = t, l = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const g = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.g.editorExtensions.highlight, k = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.g.editorExtensionsAttrs.highlight, { js: y } = g, C = {
      ..._config_mjs__WEBPACK_IMPORTED_MODULE_2__.f,
      ...g.css
    }, { js: w, css: x = {} } = k || {}, T = i && m.includes(d) ? "dark" : e, _ = C[o] ? C[o][T] : _config_mjs__WEBPACK_IMPORTED_MODULE_2__.f.atom[T], I = C[o] && x[o] ? x[o][T] : x.atom ? x.atom[T] : {};
    return {
      js: {
        src: y,
        ...w
      },
      css: {
        href: _,
        ...I
      }
    };
  }, [i, m, d, e, o]), c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const g = {
      ..._config_mjs__WEBPACK_IMPORTED_MODULE_2__.s,
      ..._config_mjs__WEBPACK_IMPORTED_MODULE_2__.g.editorConfig.languageUserDefined
    };
    return g[u] ? g[u] : _config_mjs__WEBPACK_IMPORTED_MODULE_2__.s["zh-CN"];
  }, [u]), [a, p] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    pageFullscreen: r,
    fullscreen: false,
    preview: s,
    htmlPreview: s ? false : n,
    previewOnly: false
  }), f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(a), $ = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((g, k) => {
    p((y) => {
      const C = k === void 0 ? !y[g] : k, w = {
        ...y
      };
      switch (g) {
        case "preview": {
          w.htmlPreview = false, w.previewOnly = false;
          break;
        }
        case "htmlPreview": {
          w.preview = false, w.previewOnly = false;
          break;
        }
        case "previewOnly": {
          C ? !w.preview && !w.htmlPreview && (w.preview = true) : (f.current.preview || (w.preview = false), f.current.htmlPreview || (w.htmlPreview = false));
          break;
        }
      }
      return f.current[g] = C, w[g] = C, w;
    });
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _e = document.body.style.overflow;
  }, []), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    a.pageFullscreen || a.fullscreen ? document.body.style.overflow = "hidden" : document.body.style.overflow = _e;
  }, [a.pageFullscreen, a.fullscreen]), [l, c, a, $];
}, er = (t, e, s, n, r, d) => {
  const { editorId: o } = e;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.P, n.pageFullscreen);
  }, [o, n.pageFullscreen]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.F, n.fullscreen);
  }, [o, n.fullscreen]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.h, n.preview);
  }, [o, n.preview]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.i, n.previewOnly);
  }, [o, n.previewOnly]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.H, n.htmlPreview);
  }, [o, n.htmlPreview]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.j, s);
  }, [s, o]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(t, () => ({
    on(i, m) {
      switch (i) {
        case "pageFullscreen": {
          _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(o, {
            name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.P,
            callback(l) {
              m(l);
            }
          });
          break;
        }
        case "fullscreen": {
          _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(o, {
            name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.F,
            callback(l) {
              m(l);
            }
          });
          break;
        }
        case "preview": {
          _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(o, {
            name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.h,
            callback(l) {
              m(l);
            }
          });
          break;
        }
        case "previewOnly": {
          _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(o, {
            name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.i,
            callback(l) {
              m(l);
            }
          });
          break;
        }
        case "htmlPreview": {
          _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(o, {
            name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.H,
            callback(l) {
              m(l);
            }
          });
          break;
        }
        case "catalog": {
          _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(o, {
            name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.j,
            callback(l) {
              m(l);
            }
          });
          break;
        }
      }
    },
    togglePageFullscreen(i) {
      r("pageFullscreen", i);
    },
    toggleFullscreen(i) {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.C, i);
    },
    togglePreview(i) {
      r("preview", i);
    },
    togglePreviewOnly(i) {
      r("previewOnly", i);
    },
    toggleHtmlPreview(i) {
      r("htmlPreview", i);
    },
    toggleCatalog(i) {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.a, i);
    },
    triggerSave() {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.c);
    },
    insert(i) {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.R, "universal", { generate: i });
    },
    focus(i) {
      var m;
      (m = d.current) == null || m.focus(i);
    },
    rerender() {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.g);
    },
    getSelectedText() {
      var i;
      return (i = d.current) == null ? void 0 : i.getSelectedText();
    },
    resetHistory() {
      var i;
      (i = d.current) == null || i.resetHistory();
    },
    domEventHandlers(i) {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.f, i);
    },
    execCommand(i) {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(o, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.R, i);
    },
    getEditorView() {
      var i;
      return (i = d.current) == null ? void 0 : i.getEditorView();
    }
  }), [d, o, r]);
}, tr = (t) => {
  const e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useId)();
  return t.id || t.editorId || _config_mjs__WEBPACK_IMPORTED_MODULE_2__.p + "-" + e.replaceAll(":", "");
}, rt = (t, e) => {
  const { editorId: s } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => t.noImgZoomIn ? void 0 : (() => {
    const r = document.querySelectorAll(
      `#${s}-preview img:not(.not-zoom):not(.medium-zoom-image)`
    ), d = (0,medium_zoom__WEBPACK_IMPORTED_MODULE_6__["default"])(r, {
      background: "#00000073"
    });
    return () => {
      d.detach();
    };
  })(), [s, e, t.noImgZoomIn, t.setting]);
}, nt = (t, e, s) => {
  const { editorId: n, usedLanguageText: r, customIcon: d, rootRef: o } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), { formatCopiedText: u = (i) => i } = t;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var i;
    t.setting.preview && ((i = o.current) == null || i.querySelectorAll(`#${n} .${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-preview .${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-code`).forEach((m) => {
      let l = -1;
      const c = m.querySelector(
        `.${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-copy-button`
      );
      c && (c.onclick = (a) => {
        a.preventDefault(), clearTimeout(l);
        const f = (m.querySelector("input:checked + pre code") || m.querySelector("pre code")).textContent, { text: $, successTips: g, failTips: k } = r.copyCode;
        let y = g;
        (0,_vavt_copy2clipboard__WEBPACK_IMPORTED_MODULE_7__["default"])(u(f)).catch(() => {
          y = k;
        }).finally(() => {
          c.dataset.isIcon ? c.dataset.tips = y : c.innerHTML = y, l = window.setTimeout(() => {
            c.dataset.isIcon ? c.dataset.tips = $ : c.innerHTML = $;
          }, 1500);
        });
      });
    }));
  }, [
    d,
    n,
    u,
    e,
    s,
    t.setting.preview,
    o,
    r.copyCode
  ]);
}, st = (t) => {
  const { highlight: e } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), s = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(_config_mjs__WEBPACK_IMPORTED_MODULE_2__.g.editorExtensions.highlight.instance), [n, r] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!!s.current);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    t.noHighlight || _config_mjs__WEBPACK_IMPORTED_MODULE_2__.g.editorExtensions.highlight.instance || (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.u)("link", {
      ...e.css,
      rel: "stylesheet",
      id: M.hlcss
    });
  }, [e.css, t.noHighlight]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    t.noHighlight || s.current || (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.a)(
      "script",
      {
        ...e.js,
        id: M.hljs,
        onload() {
          s.current = window.hljs, r(true);
        }
      },
      "hljs"
    );
  }, []), { hljsRef: s, hljsInited: n };
}, ne = new lru_cache__WEBPACK_IMPORTED_MODULE_14__.LRUCache({
  max: 1e3,
  // 缓存10分钟
  ttl: 6e5
}), ot = (t) => {
  const { editorId: e, theme: s, rootRef: n } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), { noMermaid: r, sanitizeMermaid: d } = t, o = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(_config_mjs__WEBPACK_IMPORTED_MODULE_2__.g.editorExtensions.mermaid.instance), [u, i] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(-1), m = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    ne.clear();
    const c = o.current;
    !r && c && (c.initialize(
      _config_mjs__WEBPACK_IMPORTED_MODULE_2__.g.mermaidConfig({
        startOnLoad: false,
        theme: s === "dark" ? "dark" : "default"
      })
    ), i((a) => a + 1));
  }, [r, s]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(m, [m]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var f, $;
    const { editorExtensions: c, editorExtensionsAttrs: a } = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.g;
    if (r || o.current)
      return;
    const p = c.mermaid.js;
    /\.mjs/.test(p) ? ((0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.a)("link", {
      ...(f = a.mermaid) == null ? void 0 : f.js,
      rel: "modulepreload",
      href: p,
      id: M.mermaidM
    }), import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      p
    ).then((g) => {
      o.current = g.default, m();
    })) : (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.a)(
      "script",
      {
        ...($ = a.mermaid) == null ? void 0 : $.js,
        src: p,
        id: M.mermaid,
        onload() {
          o.current = window.mermaid, m();
        }
      },
      "mermaid"
    );
  }, [m, r]);
  const l = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    var c;
    if (!r && o.current) {
      const a = ((c = n.current) == null ? void 0 : c.querySelectorAll(`div.${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-mermaid`)) || [], p = document.createElement("div"), f = document.body.offsetWidth > 1366 ? document.body.offsetWidth : 1366, $ = document.body.offsetHeight > 768 ? document.body.offsetHeight : 768;
      p.style.width = f + "px", p.style.height = $ + "px", p.style.position = "fixed", p.style.zIndex = "-10000", p.style.top = "-10000";
      let g = a.length;
      g > 0 && document.body.appendChild(p), await Promise.allSettled(
        Array.from(a).map((k) => (async (C) => {
          var T;
          if (C.dataset.closed === "false")
            return false;
          const w = C.innerText;
          let x = ne.get(w);
          if (!x) {
            const _ = (0,_vavt_util__WEBPACK_IMPORTED_MODULE_12__.randomId)();
            let I = { svg: "" };
            try {
              I = await o.current.render(
                _,
                w,
                p
              ), x = await d(I.svg);
              const S = document.createElement("p");
              S.className = `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-mermaid`, S.setAttribute("data-processed", ""), S.innerHTML = x, (T = S.children[0]) == null || T.removeAttribute("height"), ne.set(w, S.innerHTML), C.dataset.line !== void 0 && (S.dataset.line = C.dataset.line), C.replaceWith(S);
            } catch (S) {
              _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.E, {
                name: "mermaid",
                message: S.message,
                error: S
              });
            }
            --g === 0 && p.remove();
          }
        })(k))
      );
    }
  }, [e, r, n, d]);
  return { reRender: u, replaceMermaid: l };
}, it = (t) => {
  const e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(_config_mjs__WEBPACK_IMPORTED_MODULE_2__.g.editorExtensions.katex.instance), [s, n] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!!e.current);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var o, u;
    if (t.noKatex || e.current)
      return;
    const { editorExtensions: r, editorExtensionsAttrs: d } = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.g;
    (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.a)(
      "script",
      {
        ...(o = d.katex) == null ? void 0 : o.js,
        src: r.katex.js,
        id: M.katexjs,
        onload() {
          e.current = window.katex, n(true);
        }
      },
      "katex"
    ), (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.a)("link", {
      ...(u = d.katex) == null ? void 0 : u.css,
      rel: "stylesheet",
      href: r.katex.css,
      id: M.katexcss
    });
  }, [t.noKatex]), { katexRef: e, katexInited: s };
}, ct = (t, e) => {
  const s = t.renderer.rules.fence.bind(t.renderer.rules);
  t.renderer.rules.fence = (n, r, d, o, u) => {
    var l;
    const i = n[r], m = i.content.trim();
    if (i.info === "mermaid") {
      if (i.attrSet("class", `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-mermaid`), i.attrSet("data-mermaid-theme", e.themeRef.current), i.map && i.level === 0) {
        const a = i.map[1] - 1, p = (l = o.srcLines[a]) == null ? void 0 : l.trim(), f = p == null ? void 0 : p.startsWith("```");
        i.attrSet("data-closed", f), i.attrSet("data-line", String(i.map[0]));
      }
      const c = ne.get(m);
      return c ? (i.attrSet("data-processed", ""), `<p ${u.renderAttrs(i)}>${c}</p>`) : `<div ${u.renderAttrs(i)}>${t.utils.escapeHtml(m)}</div>`;
    }
    return s(n, r, d, o, u);
  };
}, oe = (t, e) => {
  const s = t.attrs ? t.attrs.slice() : [];
  return e.forEach((n) => {
    const r = t.attrIndex(n[0]);
    r < 0 ? s.push(n) : (s[r] = s[r].slice(), s[r][1] += ` ${n[1]}`);
  }), s;
}, Pe = {
  block: [
    { open: "$$", close: "$$" },
    { open: "\\[", close: "\\]" }
  ],
  inline: [
    { open: "$$", close: "$$" },
    { open: "$", close: "$" },
    { open: "\\[", close: "\\]" },
    { open: "\\(", close: "\\)" }
  ]
}, lt = (t) => (e, s) => {
  const n = t.delimiters;
  let r, d, o;
  for (const u of n)
    if (e.src.startsWith(u.open, e.pos)) {
      const i = e.pos + u.open.length;
      for (r = i; (r = e.src.indexOf(u.close, r)) !== -1; ) {
        for (o = r - 1; e.src[o] === "\\"; )
          o -= 1;
        if ((r - o) % 2 === 1)
          break;
        r += u.close.length;
      }
      if (r === -1)
        return s || (e.pending += u.open), e.pos = i, true;
      if (r - i === 0)
        return s || (e.pending += u.open + u.close), e.pos = i + u.close.length, true;
      if (!s) {
        const m = e.src.slice(i, r);
        d = e.push("math_inline", "math", 0), d.markup = u.open, d.content = m;
      }
      return e.pos = r + u.close.length, true;
    }
  return false;
}, at = (t) => (e, s, n, r) => {
  const d = t.delimiters;
  let o, u, i, m, l = false, c = e.bMarks[s] + e.tShift[s], a = e.eMarks[s];
  for (const p of d)
    if (e.src.slice(c, c + p.open.length) === p.open && e.src.slice(a - p.close.length, a) === p.close) {
      if (c += p.open.length, o = e.src.slice(c, a), r)
        return true;
      for (o.trim().slice(-p.close.length) === p.close && (o = o.trim().slice(0, -p.close.length), l = true), i = s; !l && (i++, !(i >= n || (c = e.bMarks[i] + e.tShift[i], a = e.eMarks[i], c < a && e.tShift[i] < e.blkIndent))); )
        e.src.slice(c, a).trim().slice(-p.close.length) === p.close && (m = e.src.slice(0, a).lastIndexOf(p.close), u = e.src.slice(c, m), l = true);
      e.line = i + 1;
      const f = e.push("math_block", "math", 0);
      return f.block = true, f.content = (o && o.trim() ? o + `
` : "") + e.getLines(s + 1, i, e.tShift[s], true) + (u && u.trim() ? u : ""), f.map = [s, e.line], f.markup = p.open, true;
    }
  return false;
}, dt = (t, { katexRef: e, inlineDelimiters: s, blockDelimiters: n }) => {
  const r = (o, u, i, m, l) => {
    const c = o[u], a = {
      attrs: oe(c, [["class", `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-katex-inline`]])
    };
    if (e.current) {
      const p = e.current.renderToString(
        c.content,
        _config_mjs__WEBPACK_IMPORTED_MODULE_2__.g.katexConfig({
          throwOnError: false
        })
      );
      return `<span ${l.renderAttrs(a)} data-processed>${p}</span>`;
    } else
      return `<span ${l.renderAttrs(a)}>${c.content}</span>`;
  }, d = (o, u, i, m, l) => {
    const c = o[u], a = {
      attrs: oe(c, [["class", `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-katex-block`]])
    };
    if (e.current) {
      const p = e.current.renderToString(
        c.content,
        _config_mjs__WEBPACK_IMPORTED_MODULE_2__.g.katexConfig({
          throwOnError: false,
          displayMode: true
        })
      );
      return `<p ${l.renderAttrs(a)} data-processed>${p}</p>`;
    } else
      return `<p ${l.renderAttrs(a)}>${c.content}</p>`;
  };
  t.inline.ruler.before(
    "escape",
    "math_inline",
    lt({
      delimiters: s || Pe.inline
    })
  ), t.block.ruler.after(
    "blockquote",
    "math_block",
    at({
      delimiters: n || Pe.block
    }),
    {
      alt: ["paragraph", "reference", "blockquote", "list"]
    }
  ), t.renderer.rules.math_inline = r, t.renderer.rules.math_block = d;
}, ut = (t, e) => {
  e = e || {};
  const s = 3, n = e.marker || "!", r = n.charCodeAt(0), d = n.length;
  let o = "", u = "";
  const i = (l, c, a, p, f) => {
    const $ = l[c];
    return $.type === "admonition_open" ? l[c].attrPush([
      "class",
      `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-admonition ${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-admonition-${$.info}`
    ]) : $.type === "admonition_title_open" && l[c].attrPush(["class", `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-admonition-title`]), f.renderToken(l, c, a);
  }, m = (l) => {
    const c = l.trim().split(" ", 2);
    u = "", o = c[0], c.length > 1 && (u = l.substring(o.length + 2));
  };
  t.block.ruler.before(
    "code",
    "admonition",
    (l, c, a, p) => {
      let f, $, g, k = false, y = l.bMarks[c] + l.tShift[c], C = l.eMarks[c];
      if (r !== l.src.charCodeAt(y))
        return false;
      for (f = y + 1; f <= C && n[(f - y) % d] === l.src[f]; f++)
        ;
      const w = Math.floor((f - y) / d);
      if (w !== s)
        return false;
      f -= (f - y) % d;
      const x = l.src.slice(y, f), T = l.src.slice(f, C);
      if (m(T), p)
        return true;
      for ($ = c; $++, !($ >= a || (y = l.bMarks[$] + l.tShift[$], C = l.eMarks[$], y < C && l.sCount[$] < l.blkIndent)); )
        if (r === l.src.charCodeAt(y) && !(l.sCount[$] - l.blkIndent >= 4)) {
          for (f = y + 1; f <= C && n[(f - y) % d] === l.src[f]; f++)
            ;
          if (!(Math.floor((f - y) / d) < w) && (f -= (f - y) % d, f = l.skipSpaces(f), !(f < C))) {
            k = true;
            break;
          }
        }
      const _ = l.parentType, I = l.lineMax;
      return l.parentType = "root", l.lineMax = $, g = l.push("admonition_open", "div", 1), g.markup = x, g.block = true, g.info = o, g.map = [c, $], u && (g = l.push("admonition_title_open", "p", 1), g.markup = x + " " + o, g.map = [c, $], g = l.push("inline", "", 0), g.content = u, g.map = [c, l.line - 1], g.children = [], g = l.push("admonition_title_close", "p", -1), g.markup = x + " " + o), l.md.block.tokenize(l, c + 1, $), g = l.push("admonition_close", "div", -1), g.markup = l.src.slice(y, f), g.block = true, l.parentType = _, l.lineMax = I, l.line = $ + (k ? 1 : 0), true;
    },
    {
      alt: ["paragraph", "reference", "blockquote", "list"]
    }
  ), t.renderer.rules.admonition_open = i, t.renderer.rules.admonition_title_open = i, t.renderer.rules.admonition_title_close = i, t.renderer.rules.admonition_close = i;
}, mt = (t, e) => {
  t.renderer.rules.heading_open = (s, n) => {
    var u;
    const r = s[n], d = ((u = s[n + 1].children) == null ? void 0 : u.reduce((i, m) => i + (["text", "code_inline", "math_inline"].includes(m.type) && m.content || ""), "")) || "", o = r.markup.length;
    return e.headsRef.current.push({
      text: d,
      level: o,
      line: r.map[0]
    }), r.map && r.level === 0 && r.attrSet(
      "id",
      e.mdHeadingId(d, o, e.headsRef.current.length)
    ), t.renderer.renderToken(s, n, e);
  }, t.renderer.rules.heading_close = (s, n, r, d, o) => o.renderToken(s, n, r);
}, pt = (t, e) => {
  const s = t.renderer.rules.fence, n = t.utils.unescapeAll, r = /\[(\w*)(?::([\w ]*))?\]/, d = /::(open|close)/, o = (c) => c.info ? n(c.info).trim() : "", u = (c) => {
    const a = o(c), [p = null, f = ""] = (r.exec(a) || []).slice(1);
    return [p, f];
  }, i = (c) => {
    const a = o(c);
    return a ? a.split(/(\s+)/g)[0] : "";
  }, m = (c) => {
    const a = c.info.match(d) || [], p = a[1] === "open" || a[1] !== "close" && e.codeFoldable && c.content.trim().split(`
`).length < e.autoFoldThreshold, f = a[1] || e.codeFoldable ? "details" : "div", $ = a[1] || e.codeFoldable ? "summary" : "div";
    return { open: p, tagContainer: f, tagHeader: $ };
  }, l = (c, a, p, f, $) => {
    if (c[a].hidden)
      return "";
    const g = e.usedLanguageTextRef.current.copyCode.text, k = e.customIconRef.current.copy || g, y = !!e.customIconRef.current.copy, C = `<span class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-collapse-tips">${(0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.S)("collapse-tips", e.customIconRef.current)}</span>`, [w] = u(c[a]);
    if (w === null) {
      const { open: A, tagContainer: P, tagHeader: K } = m(c[a]), te = [["class", `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-code`]];
      A && te.push(["open", ""]);
      const V = {
        attrs: oe(c[a], te)
      };
      c[a].info = c[a].info.replace(d, "");
      const ce = s(c, a, p, f, $);
      return `
        <${P} ${$.renderAttrs(V)}>
          <${K} class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-code-head">
            <div class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-code-flag"><span></span><span></span><span></span></div>
            <div class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-code-action">
              <span class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-code-lang">${t.utils.escapeHtml(c[a].info.trim())}</span>
              <span class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-copy-button" data-tips="${g}"${y ? " data-is-icon=true" : ""}>${k}</span>
              ${e.extraTools instanceof Function ? e.extraTools({ lang: c[a].info.trim() }) : e.extraTools || ""}
              ${P === "details" ? C : ""}
            </div>
          </${K}>
          ${ce}
        </${P}>
      `;
    }
    let x, T, _, I, S = "", Z = "", U = "";
    const { open: q, tagContainer: W, tagHeader: ee } = m(c[a]), J = [["class", `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-code`]];
    q && J.push(["open", ""]);
    const ie = {
      attrs: oe(c[a], J)
    };
    for (let A = a; A < c.length && (x = c[A], [T, _] = u(x), T === w); A++) {
      x.info = x.info.replace(r, "").replace(d, ""), x.hidden = true;
      const P = `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-codetab-${e.editorId}-${a}-${A - a}`;
      I = A - a > 0 ? "" : "checked", S += `
        <li>
          <input
            type="radio"
            id="label-${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-codetab-label-1-${e.editorId}-${a}-${A - a}"
            name="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-codetab-label-${e.editorId}-${a}"
            class="${P}"
            ${I}
          >
          <label
            for="label-${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-codetab-label-1-${e.editorId}-${a}-${A - a}"
            onclick="this.getRootNode().querySelectorAll('.${P}').forEach(e => e.click())"
          >
            ${t.utils.escapeHtml(_ || i(x))}
          </label>
        </li>`, Z += `
        <div role="tabpanel">
          <input
            type="radio"
            name="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-codetab-pre-${e.editorId}-${a}"
            class="${P}"
            ${I}
            role="presentation">
          ${s(c, A, p, f, $)}
        </div>`, U += `
        <input
          type="radio"
          name="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-codetab-lang-${e.editorId}-${a}"
          class="${P}"
          ${I}
          role="presentation">
        <span class=${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-code-lang role="note">${t.utils.escapeHtml(i(x))}</span>`;
    }
    return `
      <${W} ${$.renderAttrs(ie)}>
        <${ee} class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-code-head">
          <div class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-code-flag">
            <ul class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-codetab-label" role="tablist">${S}</ul>
          </div>
          <div class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-code-action">
            <span class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-codetab-lang">${U}</span>
            <span class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-copy-button" data-tips="${g}"${y ? " data-is-icon=true" : ""}>${k}</span>
            ${e.extraTools instanceof Function ? e.extraTools({ lang: c[a].info.trim() }) : e.extraTools || ""}
            ${W === "details" ? C : ""}
          </div>
        </${ee}>
        ${Z}
      </${W}>
    `;
  };
  t.renderer.rules.fence = l, t.renderer.rules.code_block = l;
}, Le = (t, e, s) => {
  const n = t.attrIndex(e), r = [e, s];
  n < 0 ? t.attrPush(r) : (t.attrs = t.attrs || [], t.attrs[n] = r);
}, ht = (t) => t.type === "inline", ft = (t) => t.type === "paragraph_open", gt = (t) => t.type === "list_item_open", bt = (t) => t.content.indexOf("[ ] ") === 0 || t.content.indexOf("[x] ") === 0 || t.content.indexOf("[X] ") === 0, $t = (t, e) => ht(t[e]) && ft(t[e - 1]) && gt(t[e - 2]) && bt(t[e]), vt = (t, e) => {
  const s = t[e].level - 1;
  for (let n = e - 1; n >= 0; n--)
    if (t[n].level === s)
      return n;
  return -1;
}, kt = (t) => {
  const e = new t("html_inline", "", 0);
  return e.content = "<label>", e;
}, yt = (t) => {
  const e = new t("html_inline", "", 0);
  return e.content = "</label>", e;
}, wt = (t, e, s) => {
  const n = new s("html_inline", "", 0);
  return n.content = '<label class="task-list-item-label" for="' + e + '">' + t + "</label>", n.attrs = [{ for: e }], n;
}, Ct = (t, e, s) => {
  const n = new e("html_inline", "", 0), r = s.enabled ? " " : ' disabled="" ';
  return t.content.indexOf("[ ] ") === 0 ? n.content = '<input class="task-list-item-checkbox"' + r + 'type="checkbox">' : (t.content.indexOf("[x] ") === 0 || t.content.indexOf("[X] ") === 0) && (n.content = '<input class="task-list-item-checkbox" checked=""' + r + 'type="checkbox">'), n;
}, xt = (t, e, s) => {
  if (t.children = t.children || [], t.children.unshift(Ct(t, e, s)), t.children[1].content = t.children[1].content.slice(3), t.content = t.content.slice(3), s.label)
    if (s.labelAfter) {
      t.children.pop();
      const n = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
      t.children[0].content = t.children[0].content.slice(0, -1) + ' id="' + n + '">', t.children.push(wt(t.content, n, e));
    } else
      t.children.unshift(kt(e)), t.children.push(yt(e));
}, Et = (t, e = {}) => {
  t.core.ruler.after("inline", "github-task-lists", (s) => {
    const n = s.tokens;
    for (let r = 2; r < n.length; r++)
      $t(n, r) && (xt(n[r], s.Token, e), Le(
        n[r - 2],
        "class",
        "task-list-item" + (e.enabled ? " enabled" : " ")
      ), Le(n[vt(n, r - 2)], "class", "contains-task-list"));
  });
}, It = (t) => {
  t.core.ruler.push("init-line-number", (e) => (e.tokens.forEach((s) => {
    s.map && (s.attrs || (s.attrs = []), s.attrs.push(["data-line", s.map[0].toString()]));
  }), true));
}, Tt = (t, e) => {
  var $e, ve;
  const {
    modelValue: s,
    sanitize: n,
    mdHeadingId: r,
    codeFoldable: d,
    autoFoldThreshold: o,
    noKatex: u,
    noMermaid: i,
    noHighlight: m,
    setting: l,
    onHtmlChanged: c,
    onGetCatalog: a
  } = t, { editorConfig: p, markdownItConfig: f, markdownItPlugins: $, editorExtensions: g } = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.g, {
    editorId: k,
    language: y,
    showCodeRowNumber: C,
    theme: w,
    usedLanguageText: x,
    customIcon: T,
    rootRef: _
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), I = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]), S = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(w);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    S.current = w;
  }, [w]);
  const Z = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(x);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    Z.current = x;
  }, [x]);
  const U = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(T);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    U.current = T;
  }, [T]);
  const { hljsRef: q, hljsInited: W } = st(t), { katexRef: ee, katexInited: J } = it(t), { reRender: ie, replaceMermaid: A } = ot(t), [P] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => {
    const E = (0,markdown_it__WEBPACK_IMPORTED_MODULE_8__["default"])({
      html: true,
      breaks: true,
      linkify: true
    });
    f(E, {
      editorId: k
    });
    const R = [
      {
        type: "image",
        plugin: markdown_it_image_figures__WEBPACK_IMPORTED_MODULE_9__["default"],
        options: { figcaption: true, classes: "md-zoom" }
      },
      {
        type: "admonition",
        plugin: ut,
        options: {}
      },
      {
        type: "taskList",
        plugin: Et,
        options: {}
      },
      {
        type: "heading",
        plugin: mt,
        options: { mdHeadingId: r, headsRef: I }
      },
      {
        type: "code",
        plugin: pt,
        options: {
          editorId: k,
          usedLanguageTextRef: Z,
          // showCodeRowNumber,
          codeFoldable: d,
          autoFoldThreshold: o,
          customIconRef: U
        }
      },
      {
        type: "sub",
        plugin: markdown_it_sub__WEBPACK_IMPORTED_MODULE_10__["default"],
        options: {}
      },
      {
        type: "sup",
        plugin: markdown_it_sup__WEBPACK_IMPORTED_MODULE_11__["default"],
        options: {}
      }
    ];
    u || R.push({
      type: "katex",
      plugin: dt,
      options: { katexRef: ee }
    }), i || R.push({
      type: "mermaid",
      plugin: ct,
      options: { themeRef: S }
    }), $(R, {
      editorId: k
    }).forEach((D) => {
      E.use(D.plugin, D.options);
    });
    const O = E.options.highlight;
    return E.set({
      highlight: (D, X, je) => {
        if (O) {
          const le = O(D, X, je);
          if (le)
            return le;
        }
        let B;
        !m && q.current ? q.current.getLanguage(X) ? B = q.current.highlight(D, {
          language: X,
          ignoreIllegals: true
        }).value : B = q.current.highlightAuto(D).value : B = P.utils.escapeHtml(D);
        const Ne = C ? (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_13__.g)(
          B.replace(/^\n+|\n+$/g, ""),
          D.replace(/^\n+|\n+$/g, "")
        ) : `<span class="${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-code-block">${B.replace(/^\n+|\n+$/g, "")}</span>`;
        return `<pre><code class="language-${X}" language=${X}>${Ne}</code></pre>`;
      }
    }), It(E), E;
  }), [K, te] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(`_article-key_${(0,_vavt_util__WEBPACK_IMPORTED_MODULE_12__.randomId)()}`), [V, ce] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => (I.current = [], n(
    P.render(s, {
      srcLines: s.split(`
`)
    })
  ))), Re = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => (m || W) && (u || J), [W, J, m, u]), be = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true), re = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    I.current = [];
    const E = n(
      P.render(s, {
        srcLines: s.split(`
`)
      })
    );
    ce(E);
  }, [P, s, n]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(k, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.B, V), c == null || c(V), a == null || a(I.current), _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(k, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.k, I.current);
  }, [k, V, K, a, c]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let E = () => {
    };
    return l.preview && (A().then(() => {
      var R, O;
      (R = g.mermaid) != null && R.enableZoom && (E(), E = (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.z)(
        (O = _.current) == null ? void 0 : O.querySelectorAll(
          `#${k} .${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-mermaid:not([data-closed=false])`
        ),
        {
          customIcon: U.current
        }
      ));
    }), _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(k, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.k, I.current)), () => {
      E();
    };
  }, [
    ($e = g.mermaid) == null ? void 0 : $e.enableZoom,
    k,
    A,
    _,
    l.preview
  ]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (be.current) {
      be.current = false;
      return;
    }
    const E = setTimeout(
      () => {
        re();
      },
      e ? 0 : p.renderDelay
    );
    return () => {
      clearTimeout(E);
    };
  }, [Re, w, re, y, e, p.renderDelay]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let E = () => {
    };
    return A().then(() => {
      var R, O;
      (R = g.mermaid) != null && R.enableZoom && (E(), E = (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_3__.z)(
        (O = _.current) == null ? void 0 : O.querySelectorAll(
          `#${k} p.${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-mermaid:not([data-closed=false])`
        ),
        {
          customIcon: U.current
        }
      ));
    }), () => {
      E();
    };
  }, [
    (ve = g.mermaid) == null ? void 0 : ve.enableZoom,
    k,
    V,
    K,
    ie,
    A,
    _
  ]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const E = () => {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(k, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.k, I.current);
    };
    return _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(k, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.l,
      callback: E
    }), () => {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.remove(k, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.l, E);
    };
  }, [k]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const E = () => {
      te(`_article-key_${(0,_vavt_util__WEBPACK_IMPORTED_MODULE_12__.randomId)()}`), re();
    };
    return _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.on(k, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.g,
      callback: E
    }), () => {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.remove(k, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.g, E);
    };
  }, [k, re]), { html: V, key: K };
}, Me = {
  checked: {
    regexp: /- \[x\]/,
    value: "- [ ]"
  },
  unChecked: {
    regexp: /- \[\s\]/,
    value: "- [x]"
  }
}, St = (t, e) => {
  const { editorId: s, rootRef: n } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var o;
    const r = ((o = n.current) == null ? void 0 : o.querySelectorAll(".task-list-item.enabled")) || [], d = (u) => {
      var p;
      u.preventDefault();
      const i = u.target.checked ? "unChecked" : "checked", m = (p = u.target.parentElement) == null ? void 0 : p.dataset.line;
      if (!m)
        return;
      const l = Number(m), c = t.modelValue.split(`
`), a = c[Number(l)].replace(
        Me[i].regexp,
        Me[i].value
      );
      t.previewOnly ? (c[Number(l)] = a, t.onChange(c.join(`
`))) : _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.b.emit(s, _event_name_mjs__WEBPACK_IMPORTED_MODULE_1__.T, l + 1, a);
    };
    return r.forEach((u) => {
      u.addEventListener("click", d);
    }), () => {
      r.forEach((u) => {
        u.removeEventListener("click", d);
      });
    };
  }, [s, e, t, n]);
}, At = (t, e, s) => {
  const { setting: n, onRemount: r } = t;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    r == null || r();
  }, [e, s, r]), (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    (n.preview || n.htmlPreview) && (r == null || r());
  }, [n.preview, n.htmlPreview, r]);
}, Ht = (t) => {
  const s = new DOMParser().parseFromString(t, "text/html");
  return Array.from(s.body.childNodes);
}, _t = (t, e) => {
  const s = [], n = [];
  if (t.forEach((r, d) => {
    const o = e[d];
    if (!o) {
      s.push({ index: d, newNode: r });
      return;
    }
    (r.nodeType !== o.nodeType || r.textContent !== o.textContent || r.nodeType === 1 && r.outerHTML !== o.outerHTML) && s.push({ index: d, newNode: r });
  }), e.length > t.length)
    for (let r = t.length; r < e.length; r++)
      n.push(e[r]);
  return { updates: s, deletes: n };
}, Pt = ({ html: t }) => {
  const { editorId: e, previewTheme: s, showCodeRowNumber: n } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), r = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({ __html: t }), d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!d.current) return;
    const o = Ht(t), u = Array.from(d.current.childNodes || []), { updates: i, deletes: m } = _t(o, u);
    m.forEach((l) => {
      l.remove();
    }), i.forEach(({ index: l, newNode: c }) => {
      const a = d.current.childNodes[l];
      a ? d.current.replaceChild(c.cloneNode(true), a) : d.current.appendChild(c.cloneNode(true));
    });
  }, [t]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
    "div",
    {
      id: `${e}-preview`,
      className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_13__.c)([
        `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-preview`,
        `${s}-theme`,
        n && `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-scrn`
      ]),
      dangerouslySetInnerHTML: r.current,
      ref: d
    }
  );
}, rr = (t) => {
  const { previewOnly: e = false } = t, { editorId: s } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), { html: n, key: r } = Tt(t, !!e);
  return nt(t, n, r), rt(t, n), St(t, n), At(t, n, r), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, { children: [
    t.setting.preview && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
      "div",
      {
        id: `${s}-preview-wrapper`,
        className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-preview-wrapper`,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Pt, { html: n }, r)
      },
      "content-preview-wrapper"
    ),
    !e && t.setting.htmlPreview && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
      "div",
      {
        id: `${s}-html-wrapper`,
        className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-preview-wrapper`,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-html`, children: n })
      },
      "html-preview-wrapper"
    )
  ] });
};



/***/ }),

/***/ "../../node_modules/md-editor-rt/lib/es/chunks/Editor.mjs":
/*!****************************************************************!*\
  !*** ../../node_modules/md-editor-rt/lib/es/chunks/Editor.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ il)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ContentPreview_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ContentPreview.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/ContentPreview.mjs");
/* harmony import */ var _index3_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index3.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/index3.mjs");
/* harmony import */ var _config_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/config.mjs");
/* harmony import */ var _context_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/context.mjs");
/* harmony import */ var _vavt_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @vavt/util */ "../../node_modules/@vavt/util/lib/es/index.mjs");
/* harmony import */ var _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./event-name.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/event-name.mjs");
/* harmony import */ var _index4_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./index4.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/index4.mjs");
/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./index.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/index.mjs");
/* harmony import */ var _dom_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/dom.mjs");
/* harmony import */ var _index2_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./index2.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/index2.mjs");
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @codemirror/view */ "../../node_modules/@codemirror/view/dist/index.js");
/* harmony import */ var _codemirror_language_data__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @codemirror/language-data */ "../../node_modules/@codemirror/language-data/dist/index.js");
/* harmony import */ var _codemirror_lang_markdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @codemirror/lang-markdown */ "../../node_modules/@codemirror/lang-markdown/dist/index.js");
/* harmony import */ var _codemirror_state__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @codemirror/state */ "../../node_modules/@codemirror/state/dist/index.js");
/* harmony import */ var _codemirror_commands__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @codemirror/commands */ "../../node_modules/@codemirror/commands/dist/index.js");
/* harmony import */ var _codemirror_language__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @codemirror/language */ "../../node_modules/@codemirror/language/dist/index.js");
/* harmony import */ var _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @lezer/highlight */ "../../node_modules/@lezer/highlight/dist/index.js");
/* harmony import */ var _codemirror_autocomplete__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @codemirror/autocomplete */ "../../node_modules/@codemirror/autocomplete/dist/index.js");
/* harmony import */ var _codemirror_search__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @codemirror/search */ "../../node_modules/@codemirror/search/dist/index.js");
var Go = Object.defineProperty;
var Zo = (e, l, a) => l in e ? Go(e, l, { enumerable: true, configurable: true, writable: true, value: a }) : e[l] = a;
var J = (e, l, a) => Zo(e, typeof l != "symbol" ? l + "" : l, a);






















const Ma = () => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-divider` }), Ra = (e) => {
  var u, h, k, v, c;
  const { editorId: l, usedLanguageText: a } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), n = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var o, f;
    switch (e.type) {
      case "link":
        return (o = a.linkModalTips) == null ? void 0 : o.linkTitle;
      case "image":
        return (f = a.linkModalTips) == null ? void 0 : f.imageTitle;
      default:
        return "";
    }
  }, [e.type, a]), [s, r] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    desc: "",
    url: ""
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    e.visible || setTimeout(() => {
      r({
        desc: "",
        url: ""
      });
    }, 200);
  }, [e.visible]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var o, f, p, w, b;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.M, { title: n, visible: e.visible, onClose: e.onCancel, children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-form-item`, children: [
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-label`, htmlFor: `link-desc-${l}`, children: (o = a.linkModalTips) == null ? void 0 : o.descLabel }),
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
          "input",
          {
            placeholder: (f = a.linkModalTips) == null ? void 0 : f.descLabelPlaceHolder,
            className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-input`,
            id: `link-desc-${l}`,
            type: "text",
            value: s.desc,
            onChange: (S) => {
              r((m) => ({
                ...m,
                desc: S.target.value
              }));
            }
          }
        )
      ] }),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-form-item`, children: [
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-label`, htmlFor: `link-url-${l}`, children: (p = a.linkModalTips) == null ? void 0 : p.urlLabel }),
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
          "input",
          {
            placeholder: (w = a.linkModalTips) == null ? void 0 : w.urlLabelPlaceHolder,
            className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-input`,
            id: `link-url-${l}`,
            type: "text",
            value: s.url,
            onChange: (S) => {
              r((m) => ({
                ...m,
                url: S.target.value
              }));
            }
          }
        )
      ] }),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-form-item`, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        "button",
        {
          className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-btn ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-btn-row`,
          type: "button",
          onClick: () => {
            e.onOk(s), r((S) => ({
              ...S,
              desc: "",
              url: ""
            }));
          },
          children: (b = a.linkModalTips) == null ? void 0 : b.buttonOK
        }
      ) })
    ] });
  }, [
    n,
    e,
    l,
    (u = a.linkModalTips) == null ? void 0 : u.descLabel,
    (h = a.linkModalTips) == null ? void 0 : h.descLabelPlaceHolder,
    (k = a.linkModalTips) == null ? void 0 : k.urlLabel,
    (v = a.linkModalTips) == null ? void 0 : v.urlLabelPlaceHolder,
    (c = a.linkModalTips) == null ? void 0 : c.buttonOK,
    s
  ]);
};
let Y = null;
const Oa = (e) => {
  var w, b, S;
  const l = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), { editorId: a, usedLanguageText: n, rootRef: s } = l, r = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.g.editorExtensions.cropper.instance, u = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), h = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), k = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), [v, c] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    cropperInited: false,
    imgSelected: false,
    imgSrc: "",
    // 是否全屏
    isFullscreen: false
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    e.visible && !v.cropperInited && (window.Cropper = r || window.Cropper, u.current.onchange = () => {
      if (!window.Cropper) {
        _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.E, {
          name: "Cropper",
          message: "Cropper is undefined"
        });
        return;
      }
      const m = u.current.files || [];
      if ((m == null ? void 0 : m.length) > 0) {
        const C = new FileReader();
        C.onload = (I) => {
          c((L) => ({
            ...L,
            imgSelected: true,
            imgSrc: I.target.result
          }));
        }, C.readAsDataURL(m[0]);
      }
    });
  }, [e.visible, v.cropperInited, r, a]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var m;
    (m = k.current) == null || m.setAttribute("style", "");
  }, [v.imgSelected]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var m, C;
    Y == null || Y.destroy(), (m = k.current) == null || m.setAttribute("style", ""), h.current && v.imgSrc && (Y = new window.Cropper(h.current, {
      viewMode: 2,
      preview: ((C = s.current) == null ? void 0 : C.getRootNode()).querySelector(
        `.${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-clip-preview-target`
      )
    }));
  }, [v.imgSrc, v.isFullscreen, s]);
  const o = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => v.isFullscreen ? {
    width: "100%",
    height: "100%"
  } : {
    width: "668px",
    height: "392px"
  }, [v.isFullscreen]), f = () => {
    Y.clear(), Y.destroy(), Y = null, u.current.value = "", c((m) => ({
      ...m,
      imgSrc: "",
      imgSelected: false
    }));
  }, p = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((m) => {
    c((C) => ({
      ...C,
      isFullscreen: m
    }));
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var m, C, I;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
      _index_mjs__WEBPACK_IMPORTED_MODULE_9__.M,
      {
        className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-modal-clip`,
        title: (m = n.clipModalTips) == null ? void 0 : m.title,
        visible: e.visible,
        onClose: e.onCancel,
        showAdjust: true,
        isFullscreen: v.isFullscreen,
        onAdjust: p,
        ...o,
        children: [
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-form-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-clip`, children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-clip-main`, children: v.imgSelected ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-clip-cropper`, children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "img",
                {
                  src: v.imgSrc,
                  ref: h,
                  style: { display: "none" },
                  alt: ""
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-clip-delete`, onClick: f, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "delete" }) })
            ] }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              "div",
              {
                className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-clip-upload`,
                onClick: () => {
                  u.current.click();
                },
                role: "button",
                tabIndex: 0,
                "aria-label": (C = n.imgTitleItem) == null ? void 0 : C.upload,
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "upload" })
              }
            ) }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-clip-preview`, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-clip-preview-target`, ref: k }) })
          ] }),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-form-item`, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            "button",
            {
              className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-btn`,
              type: "button",
              onClick: () => {
                if (Y) {
                  const L = Y.getCroppedCanvas();
                  _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(
                    a,
                    _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.U,
                    [(0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(L.toDataURL("image/png"))],
                    e.onOk
                  ), f();
                }
              },
              children: (I = n.linkModalTips) == null ? void 0 : I.buttonOK
            }
          ) }),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            "input",
            {
              ref: u,
              accept: "image/*",
              type: "file",
              multiple: false,
              style: { display: "none" },
              "aria-hidden": "true"
            }
          )
        ]
      }
    );
  }, [
    (w = n.clipModalTips) == null ? void 0 : w.title,
    (b = n.linkModalTips) == null ? void 0 : b.buttonOK,
    (S = n.imgTitleItem) == null ? void 0 : S.upload,
    e.visible,
    e.onCancel,
    e.onOk,
    v.isFullscreen,
    v.imgSelected,
    v.imgSrc,
    p,
    o,
    a
  ]);
}, Fa = (e) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    Ra,
    {
      type: e.type,
      visible: e.linkVisible,
      onOk: e.onOk,
      onCancel: e.onCancel
    }
  ),
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    Oa,
    {
      visible: e.clipVisible,
      onOk: e.onOk,
      onCancel: e.onCancel
    }
  )
] }), Pa = (e) => {
  const [l, a] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    x: -1,
    y: -1
  }), n = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => JSON.stringify(e.tableShape), [e.tableShape]), s = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    const h = [...JSON.parse(n)];
    return (!h[2] || h[2] < h[0]) && (h[2] = h[0]), (!h[3] || h[3] < h[3]) && (h[3] = h[1]), h;
  }, [n]), [r, u] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(s);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    u(s), a({
      x: -1,
      y: -1
    });
  }, [s]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "div",
    {
      className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-table-shape`,
      onMouseLeave: () => {
        u(s), a({
          x: -1,
          y: -1
        });
      },
      children: new Array(r[1]).fill("").map((h, k) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-table-shape-row`, children: new Array(r[0]).fill("").map((v, c) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        "div",
        {
          className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-table-shape-col`,
          onMouseEnter: () => {
            a({
              x: k,
              y: c
            }), c + 1 === r[0] && c + 1 < r[2] ? u((o) => {
              const f = [...o];
              return f[0] = o[0] + 1, f;
            }) : c + 2 < r[0] && r[0] > e.tableShape[0] && u((o) => {
              const f = [...o];
              return f[0] = o[0] - 1, f;
            }), k + 1 === r[1] && k + 1 < r[3] ? u((o) => {
              const f = [...o];
              return f[1] = o[1] + 1, f;
            }) : k + 2 < r[1] && r[1] > e.tableShape[1] && u((o) => {
              const f = [...o];
              return f[1] = o[1] - 1, f;
            });
          },
          onClick: () => {
            e.onSelected(l);
          },
          children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            "div",
            {
              className: [
                `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-table-shape-col-default`,
                k <= l.x && c <= l.y && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-table-shape-col-include`
              ].filter((o) => !!o).join(" ")
            }
          )
        },
        `table-shape-col-${c}`
      )) }, `table-shape-row-${k}`))
    }
  );
}, Va = (e) => {
  const { updateSetting: l } = e, { editorId: a } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), n = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(_config_mjs__WEBPACK_IMPORTED_MODULE_4__.g.editorExtensions.screenfull.instance), s = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false), r = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (u) => {
      if (!n.current) {
        _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.E, {
          name: "fullscreen",
          message: "fullscreen is undefined"
        });
        return;
      }
      n.current.isEnabled ? (s.current = !s.current, (u === void 0 ? !n.current.isFullscreen : u) ? n.current.request() : n.current.exit()) : console.error("browser does not support screenfull!");
    },
    [a]
  );
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const u = () => {
      l("fullscreen", s.current);
    };
    let h = -1;
    if (!n.current) {
      const { editorExtensions: k, editorExtensionsAttrs: v } = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.g;
      h = requestAnimationFrame(() => {
        var c;
        (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_10__.a)(
          "script",
          {
            ...(c = v.screenfull) == null ? void 0 : c.js,
            src: k.screenfull.js,
            id: _ContentPreview_mjs__WEBPACK_IMPORTED_MODULE_2__.C.screenfull,
            onload() {
              n.current = window.screenfull, n.current && n.current.isEnabled && n.current.on("change", u);
            }
          },
          "screenfull"
        );
      });
    }
    return n.current && n.current.isEnabled && n.current.on("change", u), () => {
      n.current || cancelAnimationFrame(h), n.current && n.current.isEnabled && n.current.off("change", u);
    };
  }, [l]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.on(a, {
    name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.C,
    callback: r
  }), () => {
    _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.remove(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.C, r);
  }), [a, r]), { fullscreenHandler: r };
}, Ha = (e, l) => {
  const { editorId: a } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), [n, s] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    type: "link",
    linkVisible: false,
    clipVisible: false
  }), r = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    s((h) => ({
      ...h,
      linkVisible: false,
      clipVisible: false
    }));
  }, []), u = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (h) => {
      h && l(n.type, {
        desc: h.desc,
        url: h.url,
        transform: n.type === "image"
      }), r();
    },
    [l, n.type, r]
  );
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.on(a, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.O,
      callback(k) {
        s((v) => ({
          ...v,
          type: k,
          linkVisible: true
        }));
      }
    });
    const h = () => {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(
        a,
        _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.U,
        Array.from(e.current.files || [])
      ), e.current.value = "";
    };
    e.current.addEventListener("change", h);
  }, [a, e]), {
    modalData: n,
    setModalData: s,
    onCancel: r,
    onOk: u
  };
}, Ba = (e) => {
  const [l, a] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    title: false,
    catalog: false,
    // 图片上传下拉
    image: false,
    // 表格预选
    table: false,
    // mermaid
    mermaid: false,
    katex: false
  }), n = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((p) => {
    a((w) => ({
      ...w,
      title: p
    }));
  }, []), s = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    a((p) => ({
      ...p,
      title: false
    }));
  }, []), r = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((p) => {
    a((w) => ({
      ...w,
      image: p
    }));
  }, []), u = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    a((p) => ({
      ...p,
      image: false
    }));
  }, []), h = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((p) => {
    a((w) => ({
      ...w,
      table: p
    }));
  }, []), k = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (p) => {
      e("table", { selectedShape: p });
    },
    [e]
  ), v = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((p) => {
    a((w) => ({
      ...w,
      mermaid: p
    }));
  }, []), c = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    a((p) => ({
      ...p,
      mermaid: false
    }));
  }, []), o = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((p) => {
    a((w) => ({
      ...w,
      katex: p
    }));
  }, []), f = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    a((p) => ({
      ...p,
      katex: false
    }));
  }, []);
  return {
    visible: l,
    onTitleChange: n,
    onTitleClose: s,
    onImageChange: r,
    onImageClose: u,
    onTableChange: h,
    onTableSelected: k,
    onMermaidChange: v,
    onMermaidClose: c,
    onKatexChange: o,
    onKatexClose: f
  };
};
let Ka = 0;
const _a = (e) => {
  var me, ue, Ie, ne, Ee, Le, G, he, De, Ae, Ue, je, Ge, Ze, Xe, Je, Ye, Qe, et, tt, ot, at, rt, lt, nt, it, st, ct, dt, mt, ut, ht, bt, gt, ft, vt, Ct, kt, pt, Tt, $t, wt, yt, Nt, xt, St, It, Et, Lt, Dt;
  const { toolbars: l, toolbarsExclude: a, updateSetting: n, codeTheme: s } = e, { editorId: r, usedLanguageText: u, theme: h, previewTheme: k, language: v, disabled: c } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), o = u, [f] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => `${r}-toolbar-wrapper`), p = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), w = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), b = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (E, R) => {
      if (c)
        return false;
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(r, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, E, R);
    },
    [c, r]
  ), { fullscreenHandler: S } = Va(e), { modalData: m, setModalData: C, onCancel: I, onOk: L } = Ha(w, b), {
    visible: $,
    onTitleChange: O,
    onTitleClose: F,
    onImageChange: q,
    onImageClose: Q,
    onTableChange: Z,
    onTableSelected: ke,
    onMermaidChange: pe,
    onMermaidClose: Te,
    onKatexChange: $e,
    onKatexClose: we
  } = Ba(b), ye = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var E, R, B, K, H, U, ee, te;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      _index4_mjs__WEBPACK_IMPORTED_MODULE_8__.D,
      {
        relative: `#${f}`,
        visible: $.title,
        onChange: O,
        overlay: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          "ul",
          {
            className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu`,
            onClick: F,
            role: "menu",
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-title`,
                  onClick: () => {
                    b("h1");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (E = o.titleItem) == null ? void 0 : E.h1
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-title`,
                  onClick: () => {
                    b("h2");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (R = o.titleItem) == null ? void 0 : R.h2
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-title`,
                  onClick: () => {
                    b("h3");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (B = o.titleItem) == null ? void 0 : B.h3
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-title`,
                  onClick: () => {
                    b("h4");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (K = o.titleItem) == null ? void 0 : K.h4
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-title`,
                  onClick: () => {
                    b("h5");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (H = o.titleItem) == null ? void 0 : H.h5
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-title`,
                  onClick: () => {
                    b("h6");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (U = o.titleItem) == null ? void 0 : U.h6
                }
              )
            ]
          },
          "bar-title-overlay"
        ),
        disabled: c,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          "div",
          {
            className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
              `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
              c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
            ]),
            title: (ee = o.toolbarTips) == null ? void 0 : ee.title,
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "title" }),
              e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (te = o.toolbarTips) == null ? void 0 : te.title })
            ]
          },
          "bar-title-trigger"
        )
      },
      "bar-title"
    );
  }, [
    f,
    $.title,
    O,
    F,
    (me = o.titleItem) == null ? void 0 : me.h1,
    (ue = o.titleItem) == null ? void 0 : ue.h2,
    (Ie = o.titleItem) == null ? void 0 : Ie.h3,
    (ne = o.titleItem) == null ? void 0 : ne.h4,
    (Ee = o.titleItem) == null ? void 0 : Ee.h5,
    (Le = o.titleItem) == null ? void 0 : Le.h6,
    (G = o.toolbarTips) == null ? void 0 : G.title,
    c,
    e.showToolbarName,
    b
  ]), Ne = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var E, R, B, K, H;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      _index4_mjs__WEBPACK_IMPORTED_MODULE_8__.D,
      {
        relative: `#${f}`,
        visible: $.image,
        onChange: q,
        overlay: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          "ul",
          {
            className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu`,
            onClick: Q,
            role: "menu",
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-image`,
                  onClick: () => {
                    e.insertLinkDirect ? b("image") : C((U) => ({
                      ...U,
                      type: "image",
                      linkVisible: true
                    }));
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (E = o.imgTitleItem) == null ? void 0 : E.link
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-image`,
                  onClick: () => {
                    w.current.click();
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (R = o.imgTitleItem) == null ? void 0 : R.upload
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-image`,
                  onClick: () => {
                    C((U) => ({
                      ...U,
                      type: "image",
                      clipVisible: true
                    }));
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (B = o.imgTitleItem) == null ? void 0 : B.clip2upload
                }
              )
            ]
          },
          "bar-image-overlay"
        ),
        disabled: c,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          "div",
          {
            className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
              `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
              c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
            ]),
            title: (K = o.toolbarTips) == null ? void 0 : K.image,
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "image" }),
              e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (H = o.toolbarTips) == null ? void 0 : H.image })
            ]
          },
          "bar-image-trigger"
        )
      },
      "bar-image"
    );
  }, [
    f,
    $.image,
    q,
    Q,
    (he = o.imgTitleItem) == null ? void 0 : he.link,
    (De = o.imgTitleItem) == null ? void 0 : De.upload,
    (Ae = o.imgTitleItem) == null ? void 0 : Ae.clip2upload,
    (Ue = o.toolbarTips) == null ? void 0 : Ue.image,
    c,
    e.showToolbarName,
    e.insertLinkDirect,
    b,
    C
  ]), xe = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var E, R;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      _index4_mjs__WEBPACK_IMPORTED_MODULE_8__.D,
      {
        relative: `#${f}`,
        visible: $.table,
        onChange: Z,
        disabled: c,
        overlay: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
          Pa,
          {
            tableShape: e.tableShape,
            onSelected: ke
          },
          "bar-table-overlay"
        ),
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          "div",
          {
            className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
              `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
              c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
            ]),
            title: (E = o.toolbarTips) == null ? void 0 : E.table,
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "table" }),
              e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (R = o.toolbarTips) == null ? void 0 : R.table })
            ]
          },
          "bar-table-trigger"
        )
      },
      "bar-table"
    );
  }, [
    f,
    $.table,
    Z,
    c,
    e.tableShape,
    e.showToolbarName,
    ke,
    (je = o.toolbarTips) == null ? void 0 : je.table
  ]), Se = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var E, R, B, K, H, U, ee, te, be, ge;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      _index4_mjs__WEBPACK_IMPORTED_MODULE_8__.D,
      {
        relative: `#${f}`,
        visible: $.mermaid,
        onChange: pe,
        overlay: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          "ul",
          {
            className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu`,
            onClick: Te,
            role: "menu",
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-mermaid`,
                  onClick: () => {
                    b("flow");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (E = o.mermaid) == null ? void 0 : E.flow
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-mermaid`,
                  onClick: () => {
                    b("sequence");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (R = o.mermaid) == null ? void 0 : R.sequence
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-mermaid`,
                  onClick: () => {
                    b("gantt");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (B = o.mermaid) == null ? void 0 : B.gantt
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-mermaid`,
                  onClick: () => {
                    b("class");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (K = o.mermaid) == null ? void 0 : K.class
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-mermaid`,
                  onClick: () => {
                    b("state");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (H = o.mermaid) == null ? void 0 : H.state
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-mermaid`,
                  onClick: () => {
                    b("pie");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (U = o.mermaid) == null ? void 0 : U.pie
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-mermaid`,
                  onClick: () => {
                    b("relationship");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (ee = o.mermaid) == null ? void 0 : ee.relationship
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-mermaid`,
                  onClick: () => {
                    b("journey");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (te = o.mermaid) == null ? void 0 : te.journey
                }
              )
            ]
          },
          "bar-mermaid-overlay"
        ),
        disabled: c,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          "div",
          {
            className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
              `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
              c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
            ]),
            title: (be = o.toolbarTips) == null ? void 0 : be.mermaid,
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "mermaid" }),
              e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (ge = o.toolbarTips) == null ? void 0 : ge.mermaid })
            ]
          },
          "bar-mermaid-trigger"
        )
      },
      "bar-mermaid"
    );
  }, [
    f,
    $.mermaid,
    pe,
    Te,
    (Ge = o.mermaid) == null ? void 0 : Ge.flow,
    (Ze = o.mermaid) == null ? void 0 : Ze.sequence,
    (Xe = o.mermaid) == null ? void 0 : Xe.gantt,
    (Je = o.mermaid) == null ? void 0 : Je.class,
    (Ye = o.mermaid) == null ? void 0 : Ye.state,
    (Qe = o.mermaid) == null ? void 0 : Qe.pie,
    (et = o.mermaid) == null ? void 0 : et.relationship,
    (tt = o.mermaid) == null ? void 0 : tt.journey,
    (ot = o.toolbarTips) == null ? void 0 : ot.mermaid,
    c,
    e.showToolbarName,
    b
  ]), P = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var E, R, B, K;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      _index4_mjs__WEBPACK_IMPORTED_MODULE_8__.D,
      {
        relative: `#${f}`,
        visible: $.katex,
        onChange: $e,
        overlay: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          "ul",
          {
            className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu`,
            onClick: we,
            role: "menu",
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-katex`,
                  onClick: () => {
                    b("katexInline");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (E = o.katex) == null ? void 0 : E.inline
                }
              ),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                "li",
                {
                  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-menu-item-katex`,
                  onClick: () => {
                    b("katexBlock");
                  },
                  role: "menuitem",
                  tabIndex: 0,
                  children: (R = o.katex) == null ? void 0 : R.block
                }
              )
            ]
          },
          "bar-katex-overlay"
        ),
        disabled: c,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          "div",
          {
            className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
              `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
              c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
            ]),
            title: (B = o.toolbarTips) == null ? void 0 : B.katex,
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "formula" }),
              e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (K = o.toolbarTips) == null ? void 0 : K.katex })
            ]
          },
          "bar-katex-trigger"
        )
      },
      "bar-katex"
    );
  }, [
    f,
    $.katex,
    $e,
    we,
    (at = o.katex) == null ? void 0 : at.inline,
    (rt = o.katex) == null ? void 0 : rt.block,
    (lt = o.toolbarTips) == null ? void 0 : lt.katex,
    c,
    e.showToolbarName,
    b
  ]), le = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (E) => {
      var R, B, K, H, U, ee, te, be, ge, At, Mt, Rt, Ot, Ft, Pt, Vt, Ht, Bt, Kt, _t, Wt, zt, qt, Ut, jt, Gt, Zt, Xt, Jt, Yt, Qt, eo, to, oo, ao, ro, lo, no, io, so, co, mo, uo, ho, bo, go, fo, vo, Co, ko;
      if (_config_mjs__WEBPACK_IMPORTED_MODULE_4__.a.includes(E))
        switch (E) {
          case "-":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Ma, {}, `bar-${Ka++}`);
          case "bold":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (R = o.toolbarTips) == null ? void 0 : R.bold,
                onClick: () => {
                  b("bold");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "bold" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (B = o.toolbarTips) == null ? void 0 : B.bold })
                ]
              },
              "bar-bold"
            );
          case "underline":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (K = o.toolbarTips) == null ? void 0 : K.underline,
                onClick: () => {
                  b("underline");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "underline" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (H = o.toolbarTips) == null ? void 0 : H.underline })
                ]
              },
              "bar-underline"
            );
          case "italic":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (U = o.toolbarTips) == null ? void 0 : U.italic,
                onClick: () => {
                  b("italic");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "italic" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (ee = o.toolbarTips) == null ? void 0 : ee.italic })
                ]
              },
              "bar-italic"
            );
          case "strikeThrough":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (te = o.toolbarTips) == null ? void 0 : te.strikeThrough,
                onClick: () => {
                  b("strikeThrough");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "strike-through" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (be = o.toolbarTips) == null ? void 0 : be.strikeThrough })
                ]
              },
              "bar-strikeThrough"
            );
          case "title":
            return ye;
          case "sub":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (ge = o.toolbarTips) == null ? void 0 : ge.sub,
                onClick: () => {
                  b("sub");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "sub" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (At = o.toolbarTips) == null ? void 0 : At.sub })
                ]
              },
              "bar-sub"
            );
          case "sup":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (Mt = o.toolbarTips) == null ? void 0 : Mt.sup,
                onClick: () => {
                  b("sup");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "sup" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (Rt = o.toolbarTips) == null ? void 0 : Rt.sup })
                ]
              },
              "bar-sup"
            );
          case "quote":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (Ot = o.toolbarTips) == null ? void 0 : Ot.quote,
                onClick: () => {
                  b("quote");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "quote" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (Ft = o.toolbarTips) == null ? void 0 : Ft.quote })
                ]
              },
              "bar-quote"
            );
          case "unorderedList":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (Pt = o.toolbarTips) == null ? void 0 : Pt.unorderedList,
                onClick: () => {
                  b("unorderedList");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "unordered-list" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (Vt = o.toolbarTips) == null ? void 0 : Vt.unorderedList })
                ]
              },
              "bar-unorderedList"
            );
          case "orderedList":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (Ht = o.toolbarTips) == null ? void 0 : Ht.orderedList,
                onClick: () => {
                  b("orderedList");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "ordered-list" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (Bt = o.toolbarTips) == null ? void 0 : Bt.orderedList })
                ]
              },
              "bar-orderedList"
            );
          case "task":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (Kt = o.toolbarTips) == null ? void 0 : Kt.task,
                onClick: () => {
                  b("task");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "task" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (_t = o.toolbarTips) == null ? void 0 : _t.task })
                ]
              },
              "bar-task"
            );
          case "codeRow":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (Wt = o.toolbarTips) == null ? void 0 : Wt.codeRow,
                onClick: () => {
                  b("codeRow");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "code-row" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (zt = o.toolbarTips) == null ? void 0 : zt.codeRow })
                ]
              },
              "bar-codeRow"
            );
          case "code":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (qt = o.toolbarTips) == null ? void 0 : qt.code,
                onClick: () => {
                  b("code");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "code" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (Ut = o.toolbarTips) == null ? void 0 : Ut.code })
                ]
              },
              "bar-code"
            );
          case "link":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (jt = o.toolbarTips) == null ? void 0 : jt.link,
                onClick: () => {
                  if (c)
                    return false;
                  e.insertLinkDirect ? b("link") : C({
                    ...m,
                    type: "link",
                    linkVisible: true
                  });
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "link" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (Gt = o.toolbarTips) == null ? void 0 : Gt.link })
                ]
              },
              "bar-link"
            );
          case "image":
            return e.noUploadImg ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (Zt = o.toolbarTips) == null ? void 0 : Zt.image,
                onClick: () => {
                  if (c)
                    return false;
                  e.insertLinkDirect ? b("image") : C((X) => ({
                    ...X,
                    type: "image",
                    linkVisible: true
                  }));
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "image" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (Xt = o.toolbarTips) == null ? void 0 : Xt.image })
                ]
              },
              "bar-image-no-upload"
            ) : Ne;
          case "table":
            return xe;
          case "revoke":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (Jt = o.toolbarTips) == null ? void 0 : Jt.revoke,
                onClick: () => {
                  if (c)
                    return false;
                  _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(r, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.e);
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "revoke" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (Yt = o.toolbarTips) == null ? void 0 : Yt.revoke })
                ]
              },
              "bar-revoke"
            );
          case "next":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (Qt = o.toolbarTips) == null ? void 0 : Qt.next,
                onClick: () => {
                  if (c)
                    return false;
                  _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(r, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.d);
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "next" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (eo = o.toolbarTips) == null ? void 0 : eo.next })
                ]
              },
              "bar-next"
            );
          case "save":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (to = o.toolbarTips) == null ? void 0 : to.save,
                onClick: () => {
                  if (c)
                    return false;
                  _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(r, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.c);
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "save" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (oo = o.toolbarTips) == null ? void 0 : oo.save })
                ]
              },
              "bar-save"
            );
          case "prettier":
            return e.noPrettier ? "" : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (ao = o.toolbarTips) == null ? void 0 : ao.prettier,
                onClick: () => {
                  b("prettier");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "prettier" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (ro = o.toolbarTips) == null ? void 0 : ro.prettier })
                ]
              },
              "bar-prettier"
            );
          case "pageFullscreen":
            return !e.setting.fullscreen && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  e.setting.pageFullscreen && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-active`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (lo = o.toolbarTips) == null ? void 0 : lo.pageFullscreen,
                onClick: () => {
                  if (c)
                    return false;
                  n("pageFullscreen");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: e.setting.pageFullscreen ? "minimize" : "maximize" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (no = o.toolbarTips) == null ? void 0 : no.pageFullscreen })
                ]
              },
              "bar-pageFullscreen"
            );
          case "fullscreen":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  e.setting.fullscreen && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-active`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (io = o.toolbarTips) == null ? void 0 : io.fullscreen,
                onClick: () => {
                  if (c)
                    return false;
                  S();
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _index_mjs__WEBPACK_IMPORTED_MODULE_9__.I,
                    {
                      name: e.setting.fullscreen ? "fullscreen-exit" : "fullscreen"
                    }
                  ),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (so = o.toolbarTips) == null ? void 0 : so.fullscreen })
                ]
              },
              "bar-fullscreen"
            );
          case "catalog":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  e.catalogVisible && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-active`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (co = o.toolbarTips) == null ? void 0 : co.catalog,
                onClick: () => {
                  if (c)
                    return false;
                  _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(r, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.a);
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "catalog" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (mo = o.toolbarTips) == null ? void 0 : mo.catalog })
                ]
              },
              "bar-catalog"
            );
          case "preview":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  e.setting.preview && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-active`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (uo = o.toolbarTips) == null ? void 0 : uo.preview,
                onClick: () => {
                  if (c)
                    return false;
                  n("preview");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "preview" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (ho = o.toolbarTips) == null ? void 0 : ho.preview })
                ]
              },
              "bar-preview"
            );
          case "previewOnly":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  e.setting.previewOnly && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-active`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (bo = o.toolbarTips) == null ? void 0 : bo.previewOnly,
                onClick: () => {
                  if (c)
                    return false;
                  n("previewOnly");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "preview-only" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (go = o.toolbarTips) == null ? void 0 : go.previewOnly })
                ]
              },
              "bar-preview-only"
            );
          case "htmlPreview":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  e.setting.htmlPreview && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-active`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (fo = o.toolbarTips) == null ? void 0 : fo.htmlPreview,
                onClick: () => {
                  if (c)
                    return false;
                  n("htmlPreview");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "preview-html" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (vo = o.toolbarTips) == null ? void 0 : vo.htmlPreview })
                ]
              },
              "bar-htmlPreview"
            );
          case "github":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              "div",
              {
                className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
                  `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item`,
                  c && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
                ]),
                title: (Co = o.toolbarTips) == null ? void 0 : Co.github,
                onClick: () => {
                  if (c)
                    return false;
                  (0,_vavt_util__WEBPACK_IMPORTED_MODULE_6__.linkTo)("https://github.com/imzbf/md-editor-rt");
                },
                children: [
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_index_mjs__WEBPACK_IMPORTED_MODULE_9__.I, { name: "github" }),
                  e.showToolbarName && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-item-name`, children: (ko = o.toolbarTips) == null ? void 0 : ko.github })
                ]
              },
              "bar-github"
            );
          case "mermaid":
            return Se;
          case "katex":
            return P;
        }
      else if (e.defToolbars) {
        const X = e.defToolbars[E];
        return X ? (0,react__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(X, {
          theme: X.props.theme || h,
          codeTheme: X.props.codeTheme || s,
          previewTheme: X.props.previewTheme || k,
          language: X.props.language || v,
          disabled: X.props.disabled || c,
          showToolbarName: X.props.showToolbarName || e.showToolbarName,
          insert(jo) {
            _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(r, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "universal", { generate: jo });
          }
        }) : "";
      } else
        return "";
    },
    [
      e,
      c,
      (nt = o.toolbarTips) == null ? void 0 : nt.bold,
      (it = o.toolbarTips) == null ? void 0 : it.underline,
      (st = o.toolbarTips) == null ? void 0 : st.italic,
      (ct = o.toolbarTips) == null ? void 0 : ct.strikeThrough,
      (dt = o.toolbarTips) == null ? void 0 : dt.sub,
      (mt = o.toolbarTips) == null ? void 0 : mt.sup,
      (ut = o.toolbarTips) == null ? void 0 : ut.quote,
      (ht = o.toolbarTips) == null ? void 0 : ht.unorderedList,
      (bt = o.toolbarTips) == null ? void 0 : bt.orderedList,
      (gt = o.toolbarTips) == null ? void 0 : gt.task,
      (ft = o.toolbarTips) == null ? void 0 : ft.codeRow,
      (vt = o.toolbarTips) == null ? void 0 : vt.code,
      (Ct = o.toolbarTips) == null ? void 0 : Ct.link,
      (kt = o.toolbarTips) == null ? void 0 : kt.image,
      (pt = o.toolbarTips) == null ? void 0 : pt.revoke,
      (Tt = o.toolbarTips) == null ? void 0 : Tt.next,
      ($t = o.toolbarTips) == null ? void 0 : $t.save,
      (wt = o.toolbarTips) == null ? void 0 : wt.prettier,
      (yt = o.toolbarTips) == null ? void 0 : yt.pageFullscreen,
      (Nt = o.toolbarTips) == null ? void 0 : Nt.fullscreen,
      (xt = o.toolbarTips) == null ? void 0 : xt.catalog,
      (St = o.toolbarTips) == null ? void 0 : St.preview,
      (It = o.toolbarTips) == null ? void 0 : It.previewOnly,
      (Et = o.toolbarTips) == null ? void 0 : Et.htmlPreview,
      (Lt = o.toolbarTips) == null ? void 0 : Lt.github,
      b,
      ye,
      C,
      m,
      Ne,
      xe,
      r,
      n,
      S,
      Se,
      P,
      h,
      s,
      k,
      v
    ]
  ), de = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const E = l.filter((H) => !a.includes(H)), R = E.indexOf("="), B = R === -1 ? E : E.slice(0, R + 1), K = R === -1 ? [] : E.slice(R, Number.MAX_SAFE_INTEGER);
    return [
      B.map((H) => le(H)),
      K.map((H) => le(H))
    ];
  }, [l, a, le]);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    let E = () => {
    };
    return p.current && (E = (0,_vavt_util__WEBPACK_IMPORTED_MODULE_6__.draggingScroll)(p.current)), () => {
      E();
    };
  }, [l]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [
    l.length > 0 && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-wrapper`, ref: p, id: f, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
      "div",
      {
        className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
          `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar`,
          e.showToolbarName && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-stn`
        ]),
        children: [
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-left`, children: de[0] }),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-toolbar-right`, children: de[1] })
        ]
      }
    ) }),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      "label",
      {
        htmlFor: `${f}_label`,
        style: { display: "none" },
        "aria-label": (Dt = o.imgTitleItem) == null ? void 0 : Dt.upload
      }
    ),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      "input",
      {
        id: `${f}_label`,
        ref: w,
        accept: "image/*",
        type: "file",
        multiple: true,
        style: { display: "none" }
      }
    ),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      Fa,
      {
        linkVisible: m.linkVisible,
        clipVisible: m.clipVisible,
        type: m.type,
        onCancel: I,
        onOk: L
      }
    )
  ] });
}, Wa = (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(_a), za = (e, l, a) => {
  const { editorId: n } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), [s, r] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    clear() {
    },
    init() {
    }
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var c;
    const u = (c = a.current) == null ? void 0 : c.view.contentDOM.getRootNode(), h = u.querySelector(
      `#${n} .cm-scroller`
    ), k = u.querySelector(
      `[id="${n}-preview-wrapper"]`
    ), v = u.querySelector(
      `[id="${n}-html-wrapper"]`
    );
    if (k || v) {
      const o = k ? _index2_mjs__WEBPACK_IMPORTED_MODULE_11__.s : _index2_mjs__WEBPACK_IMPORTED_MODULE_11__.a, f = k || v, [p, w] = o(h, f, a.current);
      r({
        init: p,
        clear: w
      });
    }
  }, [
    l,
    e.setting.fullscreen,
    e.setting.pageFullscreen,
    e.setting.preview,
    e.setting.htmlPreview,
    n,
    a
  ]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => (e.scrollAuto && !e.setting.previewOnly && (e.setting.preview || e.setting.htmlPreview) ? s.init() : s.clear(), () => {
    s.clear();
  }), [
    s,
    e.scrollAuto,
    e.setting.preview,
    e.setting.htmlPreview,
    e.setting.previewOnly
  ]);
}, Fe = async (e, l, a) => {
  if (/^h[1-6]$/.test(e))
    return qa(e, l);
  if (e === "prettier")
    return await Ua(l, a);
  switch (e) {
    case "bold":
    case "underline":
    case "italic":
    case "strikeThrough":
    case "sub":
    case "sup":
    case "codeRow":
    case "katexInline":
    case "katexBlock":
      return Ga(e, l);
    case "quote":
    case "orderedList":
    case "unorderedList":
    case "task":
      return Xa(e, l);
    case "code":
      return Ja(a, l);
    case "table":
      return er(a);
    case "link": {
      const { desc: n = "", url: s = "" } = a, r = `[${n}](${s})`;
      return {
        text: r,
        options: {
          select: s === "",
          deviationStart: r.length - s.length - 1,
          deviationEnd: -1
        }
      };
    }
    case "image":
      return Qa(a);
    case "flow":
    case "sequence":
    case "gantt":
    case "class":
    case "state":
    case "pie":
    case "relationship":
    case "journey":
      return Ya(e);
    case "universal":
      return tr(l.getSelectedText(), a);
    default:
      return { text: "", options: {} };
  }
}, qa = (e, l) => {
  const a = e.slice(1), n = "#".repeat(Number(a)), [s, r, u] = qe(l, {
    wholeLine: true
  });
  return {
    text: `${n} ${s}`,
    options: { deviationStart: n.length + 1, replaceStart: r, replaceEnd: u }
  };
}, Ua = async (e, l) => {
  var s, r, u;
  const a = window.prettier || ((s = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.g.editorExtensions.prettier) == null ? void 0 : s.prettierInstance), n = [
    ((r = window.prettierPlugins) == null ? void 0 : r.markdown) || ((u = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.g.editorExtensions.prettier) == null ? void 0 : u.parserMarkdownInstance)
  ];
  return !a || !n[0] ? (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(l.editorId, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.E, {
    name: "prettier",
    message: "prettier is undefined"
  }), {
    text: e.getValue(),
    options: { select: false, replaceAll: true }
  }) : {
    text: await a.format(e.getValue(), {
      parser: "markdown",
      plugins: n
    }),
    options: { select: false, replaceAll: true }
  };
}, ja = {
  bold: ["**", "**", 2, -2],
  underline: ["<u>", "</u>", 3, -4],
  italic: ["*", "*", 1, -1],
  strikeThrough: ["~~", "~~", 2, -2],
  sub: ["~", "~", 1, -1],
  sup: ["^", "^", 1, -1],
  codeRow: ["`", "`", 1, -1],
  katexInline: ["$", "$", 1, -1],
  katexBlock: [`
$$
`, `
$$
`, 4, -4]
}, Ga = (e, l) => {
  const a = l.getSelectedText(), [n, s, r, u] = ja[e];
  return {
    text: `${n}${a}${s}`,
    options: {
      deviationStart: r,
      deviationEnd: u
      // replaceStart, replaceEnd
    }
  };
}, Za = {
  quote: "> ",
  unorderedList: "- ",
  orderedList: 1,
  task: "- [ ] "
}, Xa = (e, l) => {
  const [a, n, s] = qe(l, {
    wholeLine: true
  }), r = a.split(`
`), u = Za[e], h = e === "orderedList" ? r.map((c, o) => `${u + o}. ${c}`) : r.map((c) => `${u}${c}`), k = e === "orderedList" ? "1. " : u.toString(), v = r.length === 1 ? k.length : 0;
  return {
    text: h.join(`
`),
    options: {
      deviationStart: v,
      replaceStart: n,
      replaceEnd: s
    }
  };
}, Ja = (e, l) => {
  const [a, n, s] = qe(l), r = e.mode || "language", u = `
\`\`\`${r}
${e.text || a || ""}
\`\`\`
`;
  return {
    text: u,
    options: {
      deviationStart: 4,
      deviationEnd: 4 + r.length - u.length,
      replaceStart: n,
      replaceEnd: s
    }
  };
}, Ya = (e) => ({
  text: `
\`\`\`mermaid
${{
    flow: `flowchart TD 
  Start --> Stop`,
    sequence: `sequenceDiagram
  A->>B: hello!
  B-->>A: hi!`,
    gantt: `gantt
title Gantt Chart
dateFormat  YYYY-MM-DD`,
    class: `classDiagram
  class Animal`,
    state: `stateDiagram-v2
  s1 --> s2`,
    pie: `pie
  "Dogs" : 386
  "Cats" : 85
  "Rats" : 15`,
    relationship: `erDiagram
  CAR ||--o{ NAMED-DRIVER : allows`,
    journey: `journey
  title My Journey`,
    ..._config_mjs__WEBPACK_IMPORTED_MODULE_4__.g.editorConfig.mermaidTemplate
  }[e]}
\`\`\`
`,
  options: { deviationStart: 12, deviationEnd: -5 }
}), Qa = (e) => {
  const { desc: l = "", url: a = "", urls: n } = e;
  let s = "";
  const r = a === "" && (!n || n instanceof Array && n.length === 0);
  return n instanceof Array ? s = n.reduce((u, h) => {
    const {
      url: k = "",
      alt: v = "",
      title: c = ""
    } = typeof h == "object" ? h : { url: h };
    return u + `![${v}](${k}${c ? " '" + c + "'" : ""})
`;
  }, "") : s = `![${l}](${a})
`, {
    text: s,
    options: {
      select: a === "",
      deviationStart: r ? s.length - a.length - 2 : s.length,
      deviationEnd: r ? -2 : 0
    }
  };
}, er = (e) => {
  const { selectedShape: l = { x: 1, y: 1 } } = e, { x: a, y: n } = l;
  let s = `
| Column`;
  for (let r = 0; r <= n; r++)
    s += " |";
  s += `
|`;
  for (let r = 0; r <= n; r++)
    s += " - |";
  for (let r = 0; r <= a; r++) {
    s += `
|`;
    for (let u = 0; u <= n; u++)
      s += " |";
  }
  return s += `
`, {
    text: s,
    options: {
      deviationStart: 3,
      deviationEnd: 10 - s.length
    }
  };
}, tr = (e, l) => {
  var _a2;
  const { generate: a } = l, n = a(e);
  return {
    text: n.targetValue,
    options: {
      select: (_a2 = n.select) != null ? _a2 : true,
      deviationStart: n.deviationStart || 0,
      deviationEnd: n.deviationEnd || 0
    }
  };
}, qe = (e, l = {
  wholeLine: false
}) => {
  const a = e.view.state, n = a.selection.main;
  if (n.empty) {
    const s = a.doc.lineAt(n.from);
    return [a.doc.lineAt(n.from).text, s.from, s.to];
  } else if (l.wholeLine) {
    const s = a.doc.lineAt(n.from), r = a.doc.lineAt(n.to);
    return [
      a.doc.sliceString(s.from, r.to),
      s.from,
      r.to
    ];
  }
  return [
    a.doc.sliceString(n.from, n.to),
    n.from,
    n.to
  ];
}, ie = (e) => {
  const l = new _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.Compartment();
  return (n) => (l.get(e.state) ? e.dispatch({ effects: l.reconfigure(n) }) : e.dispatch({
    effects: _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.StateEffect.appendConfig.of(l.of(n))
  }), true);
};
class or {
  constructor(l) {
    J(this, "view");
    J(this, "maxLength", Number.MAX_SAFE_INTEGER);
    J(this, "toggleTabSize");
    J(this, "togglePlaceholder");
    J(this, "setExtensions");
    J(this, "toggleDisabled");
    J(this, "toggleReadOnly");
    J(this, "toggleMaxlength");
    this.view = l, this.toggleTabSize = ie(this.view), this.togglePlaceholder = ie(this.view), this.setExtensions = ie(this.view), this.toggleDisabled = ie(this.view), this.toggleReadOnly = ie(this.view), this.toggleMaxlength = ie(this.view);
  }
  getValue() {
    return this.view.state.doc.toString();
  }
  /**
   * 设置内容
   *
   * @param insert 待插入内容
   * @param from 插入开始位置
   * @param to 插入结束位置
   */
  setValue(l, a = 0, n = this.view.state.doc.length) {
    this.view.dispatch({
      changes: {
        from: a,
        to: n,
        insert: l
      }
    });
  }
  /**
   * 获取选中的文本
   */
  getSelectedText() {
    const { from: l, to: a } = this.view.state.selection.main;
    return this.view.state.sliceDoc(l, a);
  }
  /**
   * 使用新的内容替换选中的内容
   *
   * @param text 待替换内容
   * @param options 替换后是否选中
   */
  replaceSelectedText(l, a, n) {
    const s = {
      // 是否选中
      select: true,
      // 选中时，开始位置的偏移量
      deviationStart: 0,
      // 结束的偏移量
      deviationEnd: 0,
      // 直接替换所有文本
      replaceAll: false,
      // 替换旧文本的开始位置
      replaceStart: -1,
      // 替换旧文本的结束位置
      replaceEnd: -1,
      ...a
    };
    try {
      if (s.replaceAll) {
        if (this.setValue(l), l.length > this.maxLength)
          throw new Error("The input text is too long");
        return;
      }
      if (this.view.state.doc.length - this.getSelectedText().length + l.length > this.maxLength)
        throw new Error("The input text is too long");
      const { from: r } = this.view.state.selection.main;
      s.replaceStart !== -1 ? this.view.dispatch({
        changes: {
          from: s.replaceStart,
          to: s.replaceEnd,
          insert: l
        }
      }) : this.view.dispatch(this.view.state.replaceSelection(l)), s.select && this.view.dispatch({
        selection: {
          anchor: s.replaceStart === -1 ? r + s.deviationStart : s.replaceStart + s.deviationStart,
          head: s.replaceStart === -1 ? r + l.length + s.deviationEnd : s.replaceStart + l.length + s.deviationEnd
        }
      }), this.view.focus();
    } catch (r) {
      if (r.message === "The input text is too long")
        _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(n, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.E, {
          name: "overlength",
          message: r.message,
          data: l
        });
      else
        throw r;
    }
  }
  /**
   * 设置tabSize
   *
   * @param tabSize 需要切换的大小
   */
  setTabSize(l) {
    this.toggleTabSize([
      _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.EditorState.tabSize.of(l),
      _codemirror_language__WEBPACK_IMPORTED_MODULE_17__.indentUnit.of(" ".repeat(l))
    ]);
  }
  /**
   * 设置placeholder
   *
   * @param t 目标内容
   */
  setPlaceholder(l) {
    this.togglePlaceholder((0,codemirror__WEBPACK_IMPORTED_MODULE_12__.placeholder)(l));
  }
  focus(l) {
    if (this.view.focus(), !l)
      return;
    let a = 0, n = 0, s = 0;
    switch (l) {
      case "start":
        break;
      case "end": {
        a = n = s = this.getValue().length;
        break;
      }
      default:
        a = l.rangeAnchor || l.cursorPos, n = l.rangeHead || l.cursorPos, s = l.cursorPos;
    }
    this.view.dispatch({
      scrollIntoView: true,
      selection: _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.EditorSelection.create(
        [_codemirror_state__WEBPACK_IMPORTED_MODULE_15__.EditorSelection.range(a, n), _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.EditorSelection.cursor(s)],
        1
      )
    });
  }
  setDisabled(l) {
    this.toggleDisabled([codemirror__WEBPACK_IMPORTED_MODULE_12__.EditorView.editable.of(!l)]);
  }
  setReadOnly(l) {
    this.toggleReadOnly([_codemirror_state__WEBPACK_IMPORTED_MODULE_15__.EditorState.readOnly.of(l)]);
  }
  setMaxLength(l) {
    this.maxLength = l, this.toggleMaxlength([
      _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.EditorState.changeFilter.of((a) => a.newDoc.length <= l)
    ]);
  }
}
const ar = "#e5c07b", xo = "var(--md-color)", rr = "#56b6c2", lr = "#ffffff", ve = "var(--md-color)", So = "#e5c07b", nr = "#e5c07b", ir = "var(--md-color)", Io = "#d19a66", sr = "#c678dd", cr = "#21252b", dr = "#2c313a", Eo = "var(--md-bk-color)", Pe = "var(--md-bk-color)", mr = "#ceedfa33", Lo = "#528bff", ur = codemirror__WEBPACK_IMPORTED_MODULE_12__.EditorView.theme(
  {
    "&": {
      color: ve,
      backgroundColor: Eo
    },
    ".cm-content": {
      caretColor: Lo
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: Lo },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: mr },
    ".cm-panels": { backgroundColor: cr, color: ve },
    ".cm-panels.cm-panels-top": { borderBottom: "1px solid var(--md-border-color)" },
    ".cm-panels.cm-panels-bottom": { borderTop: "1px solid var(--md-border-color)" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": { backgroundColor: "#ceedfa33" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: Eo,
      color: ve,
      borderRight: "1px solid",
      borderColor: "var(--md-border-color)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: dr
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "1px solid var(--md-border-color)",
      backgroundColor: Pe
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: Pe,
      borderBottomColor: Pe
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        color: ve
      }
    }
  },
  { dark: true }
), hr = _codemirror_language__WEBPACK_IMPORTED_MODULE_17__.HighlightStyle.define([
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.keyword, color: sr },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.name, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.deleted, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.character, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.propertyName, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.macroName], color: xo },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.function(_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.variableName), _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.labelName], color: nr },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.color, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.constant(_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.name), _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.standard(_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.name)], color: Io },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.definition(_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.name), _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.separator], color: ve },
  {
    tag: [
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.typeName,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.className,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.number,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.changed,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.annotation,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.modifier,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.self,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.namespace
    ],
    color: ar
  },
  {
    tag: [
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.operator,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.operatorKeyword,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.url,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.escape,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.regexp,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.link,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.special(_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.string)
    ],
    color: rr
  },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.meta, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.comment], color: So },
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.strong, fontWeight: "bold" },
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.emphasis, fontStyle: "italic" },
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.strikethrough, textDecoration: "line-through" },
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.link, color: So, textDecoration: "underline" },
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.heading, fontWeight: "bold", color: xo },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.atom, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.bool, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.special(_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.variableName)], color: Io },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.processingInstruction, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.string, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.inserted], color: ir },
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.invalid, color: lr }
]), Do = [
  ur,
  (0,_codemirror_language__WEBPACK_IMPORTED_MODULE_17__.syntaxHighlighting)(hr)
], br = "#e5c07b", Ao = "var(--md-color)", gr = "#56b6c2", fr = "#fff", Ce = "#3f4a54", Mo = "#2d8cf0", vr = "#2d8cf0", Cr = "#3f4a54", Ro = "#d19a66", kr = "#c678dd", pr = "#f6f6f6", Tr = "#ceedfa33", Oo = "var(--md-bk-color)", Ve = "var(--md-bk-color)", $r = "#bad5fa", Fo = "#3f4a54", wr = codemirror__WEBPACK_IMPORTED_MODULE_12__.EditorView.theme(
  {
    "&": {
      color: Ce,
      backgroundColor: Oo
    },
    ".cm-content": {
      caretColor: Fo
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: Fo },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: $r },
    ".cm-panels": { backgroundColor: pr, color: Ce },
    ".cm-panels.cm-panels-top": { borderBottom: "1px solid var(--md-border-color)" },
    ".cm-panels.cm-panels-bottom": { borderTop: "1px solid var(--md-border-color)" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": { backgroundColor: "#ceedfa33" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: Oo,
      color: Ce,
      borderRight: "1px solid",
      borderColor: "var(--md-border-color)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: Tr
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "1px solid var(--md-border-color)",
      backgroundColor: Ve
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: Ve,
      borderBottomColor: Ve
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        color: Ce
      }
    }
  }
  // { dark: true }
), yr = _codemirror_language__WEBPACK_IMPORTED_MODULE_17__.HighlightStyle.define([
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.keyword, color: kr },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.name, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.deleted, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.character, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.propertyName, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.macroName], color: Ao },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.function(_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.variableName), _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.labelName], color: vr },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.color, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.constant(_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.name), _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.standard(_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.name)], color: Ro },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.definition(_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.name), _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.separator], color: Ce },
  {
    tag: [
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.typeName,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.className,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.number,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.changed,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.annotation,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.modifier,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.self,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.namespace
    ],
    color: br
  },
  {
    tag: [
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.operator,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.operatorKeyword,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.url,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.escape,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.regexp,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.link,
      _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.special(_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.string)
    ],
    color: gr
  },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.meta, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.comment], color: Mo },
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.strong, fontWeight: "bold" },
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.emphasis, fontStyle: "italic" },
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.strikethrough, textDecoration: "line-through" },
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.link, color: Mo, textDecoration: "underline" },
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.heading, fontWeight: "bold", color: Ao },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.atom, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.bool, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.special(_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.variableName)], color: Ro },
  { tag: [_lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.processingInstruction, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.string, _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.inserted], color: Cr },
  { tag: _lezer_highlight__WEBPACK_IMPORTED_MODULE_18__.tags.invalid, color: fr }
]), Po = [
  wr,
  (0,_codemirror_language__WEBPACK_IMPORTED_MODULE_17__.syntaxHighlighting)(yr)
], Re = (e, l, a, n, s) => (r, u, h, k) => {
  const v = `${e}${l}${a}${n}`, c = h + u.label.length + (s === "title" ? a.length : 0);
  r.dispatch({
    changes: { from: h, to: k, insert: v },
    selection: _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.EditorSelection.create(
      [
        _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.EditorSelection.range(
          h + u.label.length + (s === "title" ? 1 : -l.length),
          c
        ),
        _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.EditorSelection.cursor(c)
      ],
      1
    )
  }), r.focus();
}, Vo = (e) => (l, a, n, s) => {
  const r = e.slice(s - n);
  l.dispatch(l.state.replaceSelection(`${r} `));
}, Ho = (e) => {
  const l = (a) => {
    const n = a.matchBefore(
      /^#+|^-\s*\[*\s*\]*|`+|\[|!\[*|^\|\s?\|?|\$\$?|!+\s*\w*/
    );
    return n === null || n.from == n.to && a.explicit ? null : {
      from: n.from,
      options: [
        // 标题
        ...["h2", "h3", "h4", "h5", "h6"].map((s, r) => {
          const u = new Array(r + 2).fill("#").join("");
          return {
            label: u,
            type: "text",
            apply: Vo(u)
          };
        }),
        // 任务列表
        ...["unchecked", "checked"].map((s) => {
          const r = s === "checked" ? "- [x]" : "- [ ]";
          return {
            label: r,
            type: "text",
            apply: Vo(r)
          };
        }),
        // 代码
        ...[
          ["`", ""],
          ["```", "language"],
          ["```mermaid\n", ""]
        ].map((s) => ({
          label: `${s[0]}${s[1]}`,
          type: "text",
          apply: Re(s[0], s[1], "", s[0] === "`" ? "`" : "\n```", "type")
        })),
        // 链接
        {
          label: "[]()",
          type: "text"
        },
        {
          label: "![]()",
          type: "text"
        },
        // 表格
        {
          label: "| |",
          type: "text",
          detail: "table",
          apply: `| col | col | col |
| - | - | - |
| content | content | content |
| content | content | content |`
        },
        // 公式
        {
          label: "$",
          type: "text",
          apply: Re("$", "", "", "$", "type")
        },
        {
          label: "$$",
          type: "text",
          apply: Re("$$", "", `
`, `
$$`, "title")
        },
        // 那啥？
        ...[
          "note",
          "abstract",
          "info",
          "tip",
          "success",
          "question",
          "warning",
          "failure",
          "danger",
          "bug",
          "example",
          "quote",
          "hint",
          "caution",
          "error",
          "attention"
        ].map((s) => ({
          label: `!!! ${s}`,
          type: "text",
          apply: Re("!!!", ` ${s}`, " Title", `

!!!`, "title")
        }))
      ]
    };
  };
  return (0,_codemirror_autocomplete__WEBPACK_IMPORTED_MODULE_19__.autocompletion)({
    override: e ? [l, ...e] : [l]
  });
}, Nr = (e, l) => [
  {
    key: "Ctrl-b",
    mac: "Cmd-b",
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "bold"), true)
  },
  {
    key: "Ctrl-d",
    mac: "Cmd-d",
    run: _codemirror_commands__WEBPACK_IMPORTED_MODULE_16__.deleteLine,
    preventDefault: true
  },
  {
    key: "Ctrl-s",
    mac: "Cmd-s",
    run: (L) => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.c, L.state.doc.toString()), true),
    shift: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "strikeThrough"), true)
  },
  {
    key: "Ctrl-u",
    mac: "Cmd-u",
    preventDefault: true,
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "underline"), true),
    shift: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "unorderedList"), true)
  },
  {
    key: "Ctrl-i",
    mac: "Cmd-i",
    preventDefault: true,
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "italic"), true),
    shift: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.O, "image"), true)
  },
  {
    key: "Ctrl-1",
    mac: "Cmd-1",
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "h1"), true)
  },
  {
    key: "Ctrl-2",
    mac: "Cmd-2",
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "h2"), true)
  },
  {
    key: "Ctrl-3",
    mac: "Cmd-3",
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "h3"), true)
  },
  {
    key: "Ctrl-4",
    mac: "Cmd-4",
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "h4"), true)
  },
  {
    key: "Ctrl-5",
    mac: "Cmd-5",
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "h5"), true)
  },
  {
    key: "Ctrl-6",
    mac: "Cmd-6",
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "h6"), true)
  },
  {
    key: "Ctrl-ArrowUp",
    mac: "Cmd-ArrowUp",
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "sup"), true)
  },
  {
    key: "Ctrl-ArrowDown",
    mac: "Cmd-ArrowDown",
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "sub"), true)
  },
  {
    key: "Ctrl-o",
    mac: "Cmd-o",
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "orderedList"), true)
  },
  {
    key: "Ctrl-c",
    mac: "Cmd-c",
    shift: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "code"), true),
    any(L, $) {
      return ($.ctrlKey || $.metaKey) && $.altKey && $.code === "KeyC" ? (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "codeRow"), true) : false;
    }
  },
  {
    key: "Ctrl-l",
    mac: "Cmd-l",
    run: () => (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.O, "link"), true)
  },
  {
    key: "Ctrl-f",
    mac: "Cmd-f",
    shift: () => l.noPrettier ? false : (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "prettier"), true)
  },
  {
    any: (L, $) => ($.ctrlKey || $.metaKey) && $.altKey && $.shiftKey && $.code === "KeyT" ? (_event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "table"), true) : false
  },
  ..._codemirror_search__WEBPACK_IMPORTED_MODULE_20__.searchKeymap
], xr = (e, l) => {
  const { editorId: a } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), n = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (r) => {
      r instanceof Promise ? r.then((u) => {
        _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "universal", {
          generate() {
            return {
              targetValue: u
            };
          }
        });
      }).catch((u) => {
        console.error(u);
      }) : _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "universal", {
        generate() {
          return {
            targetValue: r
          };
        }
      });
    },
    [a]
  );
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (r) => {
      var f, p, w;
      if (!r.clipboardData)
        return;
      if (r.clipboardData.files.length > 0) {
        const { files: b } = r.clipboardData;
        _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(
          a,
          _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.U,
          Array.from(b).filter((S) => /image\/.*/.test(S.type))
        ), r.preventDefault();
        return;
      }
      const u = r.clipboardData.getData("text/plain"), h = ((f = l.current) == null ? void 0 : f.view.state.selection.main.to) || 0, k = ((p = l.current) == null ? void 0 : p.view.state.doc.lineAt(h).from) || 0, v = ((w = l.current) == null ? void 0 : w.view.state.doc.sliceString(k, h)) || "", c = /!\[.*\]\(\s*$/.test(v), o = /!\[.*\]\((.*)\s?.*\)/.test(u);
      if (c) {
        const b = e.transformImgUrl(u);
        n(b), r.preventDefault();
        return;
      } else if (o) {
        const b = u.match(
          new RegExp(`(?<=!\\[.*\\]\\()([^)\\s]+)(?=\\s?["']?.*["']?\\))`, "g")
        );
        b ? Promise.all(
          b.map((S) => e.transformImgUrl(S))
        ).then((S) => {
          n(
            S.reduce((m, C, I) => m.replace(b[I], C), u)
          );
        }) : n(u), r.preventDefault();
        return;
      }
      if (e.autoDetectCode && r.clipboardData.types.includes("vscode-editor-data")) {
        const b = JSON.parse(r.clipboardData.getData("vscode-editor-data"));
        _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, "code", {
          mode: b.mode,
          text: r.clipboardData.getData("text/plain")
        }), r.preventDefault();
        return;
      }
      e.maxLength && u.length + e.modelValue.length > e.maxLength && _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.E, {
        name: "overlength",
        message: "The input text is too long",
        data: u
      });
    },
    [l, a, n, e]
  );
};
codemirror__WEBPACK_IMPORTED_MODULE_12__.EditorView.EDIT_CONTEXT = false;
const Sr = (e) => {
  const { tabWidth: l, editorId: a, theme: n } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), s = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), r = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(), u = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(true), [h] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => ({
    language: new _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.Compartment(),
    theme: new _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.Compartment(),
    autocompletion: new _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.Compartment(),
    update: new _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.Compartment(),
    domEvent: new _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.Compartment(),
    history: new _codemirror_state__WEBPACK_IMPORTED_MODULE_15__.Compartment()
  })), [k] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => Nr(a, e)), v = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    () => [...k, ..._codemirror_commands__WEBPACK_IMPORTED_MODULE_16__.defaultKeymap, ..._codemirror_commands__WEBPACK_IMPORTED_MODULE_16__.historyKeymap, _codemirror_commands__WEBPACK_IMPORTED_MODULE_16__.indentWithTab],
    [k]
  ), c = xr(e, r), [o, f] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}), p = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const m = {
      paste: c,
      blur: e.onBlur,
      focus: e.onFocus,
      drop: e.onDrop,
      input: (L) => {
        e.onInput && e.onInput(L);
        const { data: $ } = L;
        e.maxLength && e.modelValue.length + $.length > e.maxLength && _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.E, {
          name: "overlength",
          message: "The input text is too long",
          data: $
        });
      }
    }, C = {
      ...m
    }, I = Object.keys(m);
    for (const L in o) {
      const $ = L;
      I.includes($) ? C[$] = (O, F) => {
        o[$](O, F), O.defaultPrevented || m[$](O, F);
      } : C[$] = o[$];
    }
    return C;
  }, [o, a, c, e]), [w] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => [
    codemirror__WEBPACK_IMPORTED_MODULE_12__.keymap.of(v()),
    h.history.of((0,_codemirror_commands__WEBPACK_IMPORTED_MODULE_16__.history)()),
    h.language.of((0,_codemirror_lang_markdown__WEBPACK_IMPORTED_MODULE_14__.markdown)({ codeLanguages: _codemirror_language_data__WEBPACK_IMPORTED_MODULE_13__.languages })),
    // 横向换行
    codemirror__WEBPACK_IMPORTED_MODULE_12__.EditorView.lineWrapping,
    h.update.of(
      codemirror__WEBPACK_IMPORTED_MODULE_12__.EditorView.updateListener.of((m) => {
        m.docChanged && e.onChange(m.state.doc.toString());
      })
    ),
    h.domEvent.of(codemirror__WEBPACK_IMPORTED_MODULE_12__.EditorView.domEventHandlers(p)),
    // 解决多行placeholder时，光标异常的情况
    (0,codemirror__WEBPACK_IMPORTED_MODULE_12__.drawSelection)()
  ]), [b] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => _config_mjs__WEBPACK_IMPORTED_MODULE_4__.g.codeMirrorExtensions(
    n,
    [
      ...w,
      h.theme.of(n === "light" ? Po : Do),
      h.autocompletion.of(Ho(e.completions))
    ],
    v(),
    { editorId: a }
  )), S = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    var m, C;
    (m = r.current) == null || m.view.dispatch({
      effects: h.history.reconfigure([])
    }), (C = r.current) == null || C.view.dispatch({
      effects: h.history.reconfigure((0,_codemirror_commands__WEBPACK_IMPORTED_MODULE_16__.history)())
    });
  }, [h.history]);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const m = new codemirror__WEBPACK_IMPORTED_MODULE_12__.EditorView({
      doc: e.modelValue,
      parent: s.current,
      extensions: b
    }), C = new or(m);
    r.current = C, setTimeout(() => {
      C.setTabSize(l), C.setDisabled(e.disabled), C.setReadOnly(e.readOnly), e.placeholder && C.setPlaceholder(e.placeholder), typeof e.maxLength == "number" && C.setMaxLength(e.maxLength), e.autoFocus && m.focus(), u.current = false;
    }, 0);
    const I = () => (0,_codemirror_commands__WEBPACK_IMPORTED_MODULE_16__.undo)(m), L = () => (0,_codemirror_commands__WEBPACK_IMPORTED_MODULE_16__.redo)(m), $ = (q) => {
      f(q);
    }, O = (q, Q) => {
      const Z = m.state.doc.line(q);
      m.dispatch(
        m.state.update({
          changes: { from: Z.from, to: Z.to, insert: Q }
        })
      );
    }, F = () => {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.G, m);
    };
    return _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.on(a, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.e,
      callback: I
    }), _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.on(a, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.d,
      callback: L
    }), _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.on(a, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.f,
      callback: $
    }), _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.on(a, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.T,
      callback: O
    }), _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.on(a, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.S,
      callback: F
    }), _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.emit(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.G, m), () => {
      m.destroy(), _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.remove(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.e, I), _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.remove(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.d, L), _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.remove(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.f, $), _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.remove(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.T, O), _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.remove(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.S, F), u.current = true;
    };
  }, []), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const m = async (C, I = {}) => {
      var L, $;
      if (C === "image" && I.transform) {
        const O = e.transformImgUrl(I.url);
        if (O instanceof Promise)
          O.then(async (F) => {
            var Z;
            const { text: q, options: Q } = await Fe(
              C,
              r.current,
              {
                ...I,
                url: F
              }
            );
            (Z = r.current) == null || Z.replaceSelectedText(q, Q, a);
          }).catch((F) => {
            console.error(F);
          });
        else {
          const { text: F, options: q } = await Fe(C, r.current, {
            ...I,
            url: O
          });
          (L = r.current) == null || L.replaceSelectedText(F, q, a);
        }
      } else {
        const { text: O, options: F } = await Fe(
          C,
          r.current,
          I
        );
        ($ = r.current) == null || $.replaceSelectedText(O, F, a);
      }
    };
    return _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.on(a, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R,
      callback: m
    }), () => {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.remove(a, _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.R, m);
    };
  }, [a, e]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setTimeout(() => {
      var m;
      (m = r.current) == null || m.view.dispatch({
        effects: h.theme.reconfigure(n === "light" ? Po : Do)
      });
    }, 0);
  }, [h.theme, n]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setTimeout(() => {
      var m;
      (m = r.current) == null || m.view.dispatch({
        effects: [
          h.update.reconfigure(
            codemirror__WEBPACK_IMPORTED_MODULE_12__.EditorView.updateListener.of((C) => {
              C.docChanged && e.onChange(C.state.doc.toString());
            })
          ),
          h.domEvent.reconfigure(codemirror__WEBPACK_IMPORTED_MODULE_12__.EditorView.domEventHandlers(p)),
          h.autocompletion.reconfigure(Ho(e.completions))
        ]
      });
    }, 0);
  }, [h.autocompletion, h.domEvent, h.update, p, e]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var m, C;
    ((m = r.current) == null ? void 0 : m.getValue()) !== e.modelValue && ((C = r.current) == null || C.setValue(e.modelValue));
  }, [e.modelValue]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var m;
    u.current || (m = r.current) == null || m.setTabSize(l);
  }, [l]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var m;
    u.current || (m = r.current) == null || m.setPlaceholder(e.placeholder);
  }, [e.placeholder]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var m;
    u.current || (m = r.current) == null || m.setDisabled(e.disabled);
  }, [e.disabled]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var m;
    u.current || (m = r.current) == null || m.setDisabled(e.readOnly);
  }, [e.readOnly]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var m;
    u.current || typeof e.maxLength == "number" && ((m = r.current) == null || m.setMaxLength(e.maxLength));
  }, [e.maxLength]), {
    inputWrapperRef: s,
    codeMirrorUt: r,
    resetHistory: S
  };
}, Ir = (e, l, a) => {
  const { inputBoxWidth: n, onInputBoxWidthChange: s } = e, r = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => /px$/.test(`${n}`) ? "50%" : n, [n]), [u, h] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    width: r
  }), [k, v] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    left: r
  }), c = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(r);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const o = (w) => {
      var I, L;
      const b = ((I = l.current) == null ? void 0 : I.offsetWidth) || 0, S = ((L = l.current) == null ? void 0 : L.getBoundingClientRect().x) || 0;
      let m = w.x - S;
      m / b < _config_mjs__WEBPACK_IMPORTED_MODULE_4__.M ? m = b * _config_mjs__WEBPACK_IMPORTED_MODULE_4__.M : m > b - b * _config_mjs__WEBPACK_IMPORTED_MODULE_4__.M && (m = b - b * _config_mjs__WEBPACK_IMPORTED_MODULE_4__.M);
      const C = `${m / b * 100}%`;
      h(($) => ({
        ...$,
        width: C
      })), v(($) => ({
        ...$,
        left: C
      })), c.current = C, s == null || s(C);
    }, f = (w) => {
      w.target === a.current && (v((b) => ({
        ...b
      })), document.addEventListener("mousemove", o));
    }, p = () => {
      v((w) => ({
        ...w
      })), document.removeEventListener("mousemove", o);
    };
    return document.addEventListener("mousedown", f), document.addEventListener("mouseup", p), () => {
      document.removeEventListener("mousedown", f), document.removeEventListener("mouseup", p), document.removeEventListener("mousemove", o);
    };
  }, [l, s, a]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    c.current = r, h((o) => ({
      ...o,
      width: r
    })), v((o) => ({
      ...o,
      left: r
    }));
  }, [r]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const o = e.setting.previewOnly;
    let f = "", p = "";
    o ? (f = "0%", p = "none") : !e.setting.htmlPreview && !e.setting.preview ? (f = "100%", p = "none") : (f = c.current, p = "initial"), h((w) => ({
      ...w,
      width: f
    })), v((w) => ({
      ...w,
      display: p
    }));
  }, [e.setting.htmlPreview, e.setting.preview, e.setting.previewOnly]), {
    inputWrapperStyle: u,
    resizeOperateStyle: k
  };
}, Er = (0,_vavt_util__WEBPACK_IMPORTED_MODULE_6__.createSmoothScroll)(), Lr = (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((e, l) => {
  const { onHtmlChanged: a } = e, { editorId: n } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), [s, r] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(""), u = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), h = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), k = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (b) => {
      r(b), a == null || a(b);
    },
    [a]
  ), { inputWrapperRef: v, codeMirrorUt: c, resetHistory: o } = Sr(e), { inputWrapperStyle: f, resizeOperateStyle: p } = Ir(
    e,
    u,
    h
  );
  za(e, s, c), (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(l, () => ({
    getSelectedText() {
      var b;
      return (b = c.current) == null ? void 0 : b.getSelectedText();
    },
    focus(b) {
      var S;
      (S = c.current) == null || S.focus(b);
    },
    resetHistory: o,
    getEditorView() {
      var b;
      return (b = c.current) == null ? void 0 : b.view;
    }
  }), [c, o]);
  const w = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (b, S) => {
      var m, C;
      if (!e.setting.preview && S.line !== void 0) {
        b.preventDefault();
        const I = (m = c.current) == null ? void 0 : m.view;
        if (I) {
          const L = I.state.doc.line(S.line + 1), $ = (C = I.lineBlockAt(L.from)) == null ? void 0 : C.top, O = I.scrollDOM;
          Er(O, $);
        }
      }
    },
    [c, e.setting.preview]
  );
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-content`, children: [
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-content-wrapper`, ref: u, children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        "div",
        {
          className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-input-wrapper`,
          style: f,
          ref: v
        }
      ),
      (e.setting.htmlPreview || e.setting.preview) && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        "div",
        {
          className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-resize-operate`,
          style: p,
          ref: h
        }
      ),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        _ContentPreview_mjs__WEBPACK_IMPORTED_MODULE_2__.a,
        {
          modelValue: e.modelValue,
          onChange: e.onChange,
          setting: e.setting,
          onHtmlChanged: k,
          onGetCatalog: e.onGetCatalog,
          mdHeadingId: e.mdHeadingId,
          noMermaid: e.noMermaid,
          sanitize: e.sanitize,
          noKatex: e.noKatex,
          formatCopiedText: e.formatCopiedText,
          noHighlight: e.noHighlight,
          noImgZoomIn: e.noImgZoomIn,
          sanitizeMermaid: e.sanitizeMermaid,
          codeFoldable: e.codeFoldable,
          autoFoldThreshold: e.autoFoldThreshold,
          onRemount: e.onRemount
        }
      )
    ] }),
    e.catalogVisible && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      _index2_mjs__WEBPACK_IMPORTED_MODULE_11__.M,
      {
        theme: e.theme,
        className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-catalog-editor ${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-catalog-${e.catalogLayout}`,
        editorId: n,
        mdHeadingId: e.mdHeadingId,
        scrollElementOffsetTop: 2,
        syncWith: e.setting.preview ? "preview" : "editor",
        onClick: w,
        catalogMaxDepth: e.catalogMaxDepth
      },
      "internal-catalog"
    )
  ] });
}), Dr = (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(Lr), Ar = ({ modelValue: e }) => {
  const { usedLanguageText: l } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var a;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-footer-item`, children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-footer-label`, children: `${(a = l.footer) == null ? void 0 : a.markdownTotal}:` }),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: e.length || 0 })
    ] });
  }, [l, e]);
}, Mr = (e) => {
  const l = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    e.disabled || e.onChange(!e.checked);
  }, [e]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "div",
    {
      className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
        `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-checkbox`,
        e.checked && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-checkbox-checked`,
        e.disabled && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
      ]),
      onClick: l
    }
  );
}, Rr = (e) => {
  var n;
  const { usedLanguageText: l, disabled: a } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var s;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
      "div",
      {
        className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
          `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-footer-item`,
          a && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-disabled`
        ]),
        children: [
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            "label",
            {
              className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-footer-label`,
              onClick: () => {
                e.onScrollAutoChange(!e.scrollAuto);
              },
              children: (s = l.footer) == null ? void 0 : s.scrollAuto
            }
          ),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            Mr,
            {
              disabled: a,
              checked: e.scrollAuto,
              onChange: e.onScrollAutoChange
            }
          )
        ]
      }
    );
  }, [(n = l.footer) == null ? void 0 : n.scrollAuto, a, e]);
}, Or = (e) => {
  const { theme: l, language: a, disabled: n } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), s = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (h) => {
      if (_config_mjs__WEBPACK_IMPORTED_MODULE_4__.b.includes(h))
        switch (h) {
          case "markdownTotal":
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Ar, { modelValue: e.modelValue }, "markdown-total");
          case "scrollSwitch":
            return !e.noScrollAuto && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              Rr,
              {
                scrollAuto: e.scrollAuto,
                onScrollAutoChange: e.onScrollAutoChange
              },
              "scroll-auto"
            );
        }
      else {
        const k = e.defFooters[h];
        return typeof k != "string" ? (0,react__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(k, {
          theme: k.props.theme || l,
          language: k.props.language || a,
          disabled: k.props.disabled || n
        }) : k || "";
      }
    },
    [
      e.modelValue,
      e.noScrollAuto,
      e.scrollAuto,
      e.onScrollAutoChange,
      e.defFooters,
      l,
      a,
      n
    ]
  ), [r, u] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const h = e.footers.indexOf("="), k = h === -1 ? e.footers : e.footers.slice(0, h), v = h === -1 ? [] : e.footers.slice(h, Number.MAX_SAFE_INTEGER);
    return [
      k.map((c) => s(c)),
      v.map((c) => s(c))
    ];
  }, [e.footers, s]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-footer`, children: [
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-footer-left`, children: r }),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-footer-right`, children: u })
  ] });
}, Fr = (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(Or), il = (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((e, l) => {
  const {
    value: a = e.modelValue || _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.modelValue,
    theme: n = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.theme,
    codeTheme: s = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.codeTheme,
    className: r = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.className,
    toolbars: u = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.toolbars,
    toolbarsExclude: h = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.toolbarsExclude,
    defToolbars: k = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.defToolbars,
    tabWidth: v = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.tabWidth,
    showCodeRowNumber: c = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.showCodeRowNumber,
    previewTheme: o = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.previewTheme,
    noPrettier: f = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.noPrettier,
    tableShape: p = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.tableShape,
    noMermaid: w = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.noMermaid,
    noKatex: b = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.noKatex,
    placeholder: S = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.placeholder,
    onChange: m = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.onChange,
    onHtmlChanged: C = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.onHtmlChanged,
    onGetCatalog: I = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.onGetCatalog,
    sanitize: L = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.sanitize,
    onError: $ = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.onError,
    mdHeadingId: O = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.mdHeadingId,
    footers: F = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.footers,
    defFooters: q = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.defFooters,
    noUploadImg: Q = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.noUploadImg,
    noHighlight: Z = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.noHighlight,
    noImgZoomIn: ke = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.noImgZoomIn,
    language: pe = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.language,
    inputBoxWidth: Te = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.inputBoxWidth,
    sanitizeMermaid: $e = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.sanitizeMermaid,
    transformImgUrl: we = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.transformImgUrl,
    codeFoldable: ye = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.codeFoldable,
    autoFoldThreshold: Ne = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.autoFoldThreshold,
    catalogLayout: xe = _config_mjs__WEBPACK_IMPORTED_MODULE_4__.d.catalogLayout
  } = e, Se = (0,_ContentPreview_mjs__WEBPACK_IMPORTED_MODULE_2__.u)(e), [P] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => ({
    editorId: Se,
    noKatex: b,
    noMermaid: w,
    noPrettier: f,
    noUploadImg: Q,
    noHighlight: Z
  })), [le, de] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => ({
    scrollAuto: e.scrollAuto === void 0 ? true : e.scrollAuto
  })), me = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), ue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(), Ie = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (De) => {
      de((Ae) => ({
        ...Ae,
        scrollAuto: De
      }));
    },
    [de]
  );
  (0,_ContentPreview_mjs__WEBPACK_IMPORTED_MODULE_2__.b)(e, P), (0,_ContentPreview_mjs__WEBPACK_IMPORTED_MODULE_2__.c)(P), (0,_ContentPreview_mjs__WEBPACK_IMPORTED_MODULE_2__.d)(e, P), (0,_ContentPreview_mjs__WEBPACK_IMPORTED_MODULE_2__.e)(P.editorId, $);
  const ne = (0,_ContentPreview_mjs__WEBPACK_IMPORTED_MODULE_2__.f)(e, P), [Ee, Le, G, he] = (0,_ContentPreview_mjs__WEBPACK_IMPORTED_MODULE_2__.g)(e);
  return (0,_ContentPreview_mjs__WEBPACK_IMPORTED_MODULE_2__.h)(l, P, ne, G, he, ue), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => () => {
    _event_name_mjs__WEBPACK_IMPORTED_MODULE_7__.b.clear(P.editorId);
  }, [P.editorId]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    _context_mjs__WEBPACK_IMPORTED_MODULE_5__.E.Provider,
    {
      value: {
        editorId: P.editorId,
        tabWidth: v,
        theme: n,
        language: pe,
        highlight: Ee,
        showCodeRowNumber: c,
        usedLanguageText: Le,
        previewTheme: o,
        customIcon: e.customIcon || {},
        rootRef: me,
        disabled: e.disabled
      },
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
        "div",
        {
          id: P.editorId,
          className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
            _config_mjs__WEBPACK_IMPORTED_MODULE_4__.p,
            !!r && r,
            n === "dark" && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-dark`,
            (G.fullscreen || G.pageFullscreen) && `${_config_mjs__WEBPACK_IMPORTED_MODULE_4__.p}-fullscreen`
          ]),
          style: e.style,
          ref: me,
          children: [
            u.length > 0 && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              Wa,
              {
                noPrettier: P.noPrettier,
                toolbars: u,
                toolbarsExclude: h,
                setting: G,
                updateSetting: he,
                tableShape: p,
                defToolbars: k,
                noUploadImg: P.noUploadImg,
                showToolbarName: e.showToolbarName,
                catalogVisible: ne,
                codeTheme: s,
                insertLinkDirect: e.insertLinkDirect
              }
            ),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              Dr,
              {
                ref: ue,
                modelValue: a,
                onChange: m,
                setting: G,
                mdHeadingId: O,
                onHtmlChanged: C,
                onGetCatalog: I,
                sanitize: L,
                noMermaid: P.noMermaid,
                noPrettier: P.noPrettier,
                noHighlight: P.noHighlight,
                placeholder: S,
                noKatex: P.noKatex,
                scrollAuto: le.scrollAuto,
                formatCopiedText: e.formatCopiedText,
                autoFocus: e.autoFocus,
                disabled: e.disabled,
                readOnly: e.readOnly,
                maxLength: e.maxLength,
                autoDetectCode: e.autoDetectCode,
                onBlur: e.onBlur,
                onFocus: e.onFocus,
                onInput: e.onInput,
                completions: e.completions,
                catalogVisible: ne,
                theme: e.theme,
                noImgZoomIn: ke,
                onDrop: e.onDrop,
                inputBoxWidth: Te,
                onInputBoxWidthChange: e.onInputBoxWidthChange,
                sanitizeMermaid: $e,
                transformImgUrl: we,
                codeFoldable: ye,
                autoFoldThreshold: Ne,
                onRemount: e.onRemount,
                catalogLayout: xe,
                catalogMaxDepth: e.catalogMaxDepth
              }
            ),
            F.length > 0 && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              Fr,
              {
                modelValue: a,
                footers: F,
                defFooters: q,
                noScrollAuto: !G.preview && !G.htmlPreview || G.previewOnly,
                scrollAuto: le.scrollAuto,
                onScrollAutoChange: Ie
              }
            )
          ]
        }
      )
    }
  );
});



/***/ }),

/***/ "../../node_modules/md-editor-rt/lib/es/chunks/config.mjs":
/*!****************************************************************!*\
  !*** ../../node_modules/md-editor-rt/lib/es/chunks/config.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ v),
/* harmony export */   a: () => (/* binding */ g),
/* harmony export */   b: () => (/* binding */ h),
/* harmony export */   c: () => (/* binding */ f),
/* harmony export */   d: () => (/* binding */ b),
/* harmony export */   f: () => (/* binding */ c),
/* harmony export */   g: () => (/* binding */ m),
/* harmony export */   p: () => (/* binding */ p),
/* harmony export */   s: () => (/* binding */ k)
/* harmony export */ });
/* unused harmony export e */
/* harmony import */ var _vavt_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vavt/util */ "../../node_modules/@vavt/util/lib/es/index.mjs");

const p = "md-editor", e = "https://unpkg.com", a = `${e}/@highlightjs/cdn-assets@11.10.0/highlight.min.js`, t = {
  main: `${e}/prettier@3.3.3/standalone.js`,
  markdown: `${e}/prettier@3.3.3/plugins/markdown.js`
}, o = {
  css: `${e}/cropperjs@1.6.2/dist/cropper.min.css`,
  js: `${e}/cropperjs@1.6.2/dist/cropper.min.js`
}, n = `${e}/screenfull@5.2.0/dist/screenfull.js`, l = `${e}/mermaid@11.9.0/dist/mermaid.min.js`, d = {
  js: `${e}/katex@0.16.22/dist/katex.min.js`,
  css: `${e}/katex@0.16.22/dist/katex.min.css`
}, c = {
  a11y: {
    light: `${e}/@highlightjs/cdn-assets@11.10.0/styles/a11y-light.min.css`,
    dark: `${e}/@highlightjs/cdn-assets@11.10.0/styles/a11y-dark.min.css`
  },
  atom: {
    light: `${e}/@highlightjs/cdn-assets@11.10.0/styles/atom-one-light.min.css`,
    dark: `${e}/@highlightjs/cdn-assets@11.10.0/styles/atom-one-dark.min.css`
  },
  github: {
    light: `${e}/@highlightjs/cdn-assets@11.10.0/styles/github.min.css`,
    dark: `${e}/@highlightjs/cdn-assets@11.10.0/styles/github-dark.min.css`
  },
  gradient: {
    light: `${e}/@highlightjs/cdn-assets@11.10.0/styles/gradient-light.min.css`,
    dark: `${e}/@highlightjs/cdn-assets@11.10.0/styles/gradient-dark.min.css`
  },
  kimbie: {
    light: `${e}/@highlightjs/cdn-assets@11.10.0/styles/kimbie-light.min.css`,
    dark: `${e}/@highlightjs/cdn-assets@11.10.0/styles/kimbie-dark.min.css`
  },
  paraiso: {
    light: `${e}/@highlightjs/cdn-assets@11.10.0/styles/paraiso-light.min.css`,
    dark: `${e}/@highlightjs/cdn-assets@11.10.0/styles/paraiso-dark.min.css`
  },
  qtcreator: {
    light: `${e}/@highlightjs/cdn-assets@11.10.0/styles/qtcreator-light.min.css`,
    dark: `${e}/@highlightjs/cdn-assets@11.10.0/styles/qtcreator-dark.min.css`
  },
  stackoverflow: {
    light: `${e}/@highlightjs/cdn-assets@11.10.0/styles/stackoverflow-light.min.css`,
    dark: `${e}/@highlightjs/cdn-assets@11.10.0/styles/stackoverflow-dark.min.css`
  }
}, y = {
  highlight: {
    js: {
      integrity: "sha384-GdEWAbCjn+ghjX0gLx7/N1hyTVmPAjdC2OvoAA0RyNcAOhqwtT8qnbCxWle2+uJX",
      crossOrigin: "anonymous"
    },
    css: {
      a11y: {
        light: {
          integrity: "sha384-qdZDAN3jffvh670RHw1wxLekabidEFaNRninYgIzBvMbL6WlHdXeHS/Bt+vx33lN",
          crossOrigin: "anonymous"
        },
        dark: {
          integrity: "sha384-2QAAjX8pqaM5azX68KWI2wExF6Q13kY4kEiQFY4b/1zPe6rpgmTByNpDEllH3sb+",
          crossOrigin: "anonymous"
        }
      },
      atom: {
        light: {
          integrity: "sha384-w6Ujm1VWa9HYFqGc89oAPn/DWDi2gUamjNrq9DRvEYm2X3ClItg9Y9xs1ViVo5b5",
          crossOrigin: "anonymous"
        },
        dark: {
          integrity: "sha384-oaMLBGEzBOJx3UHwac0cVndtX5fxGQIfnAeFZ35RTgqPcYlbprH9o9PUV/F8Le07",
          crossOrigin: "anonymous"
        }
      },
      github: {
        light: {
          integrity: "sha384-eFTL69TLRZTkNfYZOLM+G04821K1qZao/4QLJbet1pP4tcF+fdXq/9CdqAbWRl/L",
          crossOrigin: "anonymous"
        },
        dark: {
          integrity: "sha384-wH75j6z1lH97ZOpMOInqhgKzFkAInZPPSPlZpYKYTOqsaizPvhQZmAtLcPKXpLyH",
          crossOrigin: "anonymous"
        }
      },
      gradient: {
        light: {
          integrity: "sha384-yErHBR8aEZPxRl3XmR8dGSRAclMlnSRRw8sXQLcmPWzWUvb56BzQmBw3EWHl7QGI",
          crossOrigin: "anonymous"
        },
        dark: {
          integrity: "sha384-lUCvtSOdvDbp5hLWKgwz/taFu1HxlpqES2OVP5UG2JMTfnU481gXcBhGF9lAGoSr",
          crossOrigin: "anonymous"
        }
      },
      kimbie: {
        light: {
          integrity: "sha384-tloeSLUPczAvoZ48TUz+OxRie0oYLCRwlkadUXovGzzJEIbNQB2TkfUuvJ6SW5Mi",
          crossOrigin: "anonymous"
        },
        dark: {
          integrity: "sha384-o5F1vUaMNOmou1sQrsWiFo4/QUGSV0svqNZW+EesmKxWC8MpFJcveBhAyfvTHbGb",
          crossOrigin: "anonymous"
        }
      },
      paraiso: {
        light: {
          integrity: "sha384-5j6QHU2Hwg1ehtlIQNDebhETDB8bga3/88hzBFsMRaGmgQHCftqIN7GZNDNw0vTL",
          crossOrigin: "anonymous"
        },
        dark: {
          integrity: "sha384-I5vnnMQu0LWDQnHpT61xyoMwKarAB8jpZkB2ioFOlmzUFnIFaV4QbUwlBBOMKhTH",
          crossOrigin: "anonymous"
        }
      },
      qtcreator: {
        light: {
          integrity: "sha384-iEBgHrwi8Hv4dSZBz+MOGvS05rF7I7fGKM2fASQyE9jn2Istg9Qd5dSoK18WyRTB",
          crossOrigin: "anonymous"
        },
        dark: {
          integrity: "sha384-D6LXJGWNR4QV7gnpuP3ccbvOYoR02td3cU0y7lESABPg/tzCSC4m+y+M2TtrmpHc",
          crossOrigin: "anonymous"
        }
      },
      stackoverflow: {
        light: {
          integrity: "sha384-FMwt7cTGo4aLxZnno5k0xTj0W4gmi48Kwept+y/oQmE6cFk36Kr+QJZOKNOQwORe",
          crossOrigin: "anonymous"
        },
        dark: {
          integrity: "sha384-iL+x+BroCyHm/p2c6sMA9umXhdCWp2cKe4QUjPeMzHgwXAk+ZxHyIGP3NZTZensU",
          crossOrigin: "anonymous"
        }
      }
    }
  },
  prettier: {
    standaloneJs: {
      integrity: "sha384-92h6ALm8/lHpNGn6MfGlgZ+I8c/4yn/nSN8dV9ZmDxqbP9L93gk/Jj2i0LtV+AVd",
      crossOrigin: "anonymous"
    },
    parserMarkdownJs: {
      integrity: "sha384-5ufuUgoSsr/2oihBZ5d+c+yt0qaUmzLtUz41VZNJ4txtyJ6mBve3ZwuKoq/IygYX",
      crossOrigin: "anonymous"
    }
  },
  cropper: {
    js: {
      integrity: "sha384-jrOgQzBlDeUNdmQn3rUt/PZD+pdcRBdWd/HWRqRo+n2OR2QtGyjSaJC0GiCeH+ir",
      crossOrigin: "anonymous"
    },
    css: {
      integrity: "sha384-6LFfkTKLRlzFtgx8xsWyBdKGpcMMQTkv+dB7rAbugeJAu1Ym2q1Aji1cjHBG12Xh",
      crossOrigin: "anonymous"
    }
  },
  screenfull: {
    js: {
      integrity: "sha384-Qfbv8upMDu/ikv42M0Jnym2hahbDQ77Nm8PGU0G+iA6UIwt1+scE6P1qKXA0anWU",
      crossOrigin: "anonymous"
    }
  },
  mermaid: {
    js: {
      integrity: "sha384-UzWEhMP22MxNnr2bzqAdmtf1FDy5iKDUq6hLXJFLqC7dfGkc6W/hshbx9m71zyt5",
      crossOrigin: "anonymous"
    }
  },
  katex: {
    js: {
      integrity: "sha384-cMkvdD8LoxVzGF/RPUKAcvmm49FQ0oxwDF3BGKtDXcEc+T1b2N+teh/OJfpU0jr6",
      crossOrigin: "anonymous"
    },
    css: {
      integrity: "sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP",
      crossOrigin: "anonymous"
    }
  }
}, g = [
  "bold",
  "underline",
  "italic",
  "strikeThrough",
  "-",
  "title",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "task",
  "-",
  "codeRow",
  "code",
  "link",
  "image",
  "table",
  "mermaid",
  "katex",
  "-",
  "revoke",
  "next",
  "save",
  "=",
  "prettier",
  "pageFullscreen",
  "fullscreen",
  "preview",
  "previewOnly",
  "htmlPreview",
  "catalog",
  "github"
], h = ["markdownTotal", "=", "scrollSwitch"], k = {
  "zh-CN": {
    toolbarTips: {
      bold: "\u52A0\u7C97",
      underline: "\u4E0B\u5212\u7EBF",
      italic: "\u659C\u4F53",
      strikeThrough: "\u5220\u9664\u7EBF",
      title: "\u6807\u9898",
      sub: "\u4E0B\u6807",
      sup: "\u4E0A\u6807",
      quote: "\u5F15\u7528",
      unorderedList: "\u65E0\u5E8F\u5217\u8868",
      orderedList: "\u6709\u5E8F\u5217\u8868",
      task: "\u4EFB\u52A1\u5217\u8868",
      codeRow: "\u884C\u5185\u4EE3\u7801",
      code: "\u5757\u7EA7\u4EE3\u7801",
      link: "\u94FE\u63A5",
      image: "\u56FE\u7247",
      table: "\u8868\u683C",
      mermaid: "mermaid\u56FE",
      katex: "katex\u516C\u5F0F",
      revoke: "\u540E\u9000",
      next: "\u524D\u8FDB",
      save: "\u4FDD\u5B58",
      prettier: "\u7F8E\u5316",
      pageFullscreen: "\u6D4F\u89C8\u5668\u5168\u5C4F",
      fullscreen: "\u5C4F\u5E55\u5168\u5C4F",
      preview: "\u9884\u89C8",
      previewOnly: "\u4EC5\u9884\u89C8",
      htmlPreview: "html\u4EE3\u7801\u9884\u89C8",
      catalog: "\u76EE\u5F55",
      github: "\u6E90\u7801\u5730\u5740"
    },
    titleItem: {
      h1: "\u4E00\u7EA7\u6807\u9898",
      h2: "\u4E8C\u7EA7\u6807\u9898",
      h3: "\u4E09\u7EA7\u6807\u9898",
      h4: "\u56DB\u7EA7\u6807\u9898",
      h5: "\u4E94\u7EA7\u6807\u9898",
      h6: "\u516D\u7EA7\u6807\u9898"
    },
    imgTitleItem: {
      link: "\u6DFB\u52A0\u94FE\u63A5",
      upload: "\u4E0A\u4F20\u56FE\u7247",
      clip2upload: "\u88C1\u526A\u4E0A\u4F20"
    },
    linkModalTips: {
      linkTitle: "\u6DFB\u52A0\u94FE\u63A5",
      imageTitle: "\u6DFB\u52A0\u56FE\u7247",
      descLabel: "\u94FE\u63A5\u63CF\u8FF0\uFF1A",
      descLabelPlaceHolder: "\u8BF7\u8F93\u5165\u63CF\u8FF0...",
      urlLabel: "\u94FE\u63A5\u5730\u5740\uFF1A",
      urlLabelPlaceHolder: "\u8BF7\u8F93\u5165\u94FE\u63A5...",
      buttonOK: "\u786E\u5B9A"
    },
    clipModalTips: {
      title: "\u88C1\u526A\u56FE\u7247\u4E0A\u4F20",
      buttonUpload: "\u4E0A\u4F20"
    },
    copyCode: {
      text: "\u590D\u5236\u4EE3\u7801",
      successTips: "\u5DF2\u590D\u5236\uFF01",
      failTips: "\u590D\u5236\u5931\u8D25\uFF01"
    },
    mermaid: {
      flow: "\u6D41\u7A0B\u56FE",
      sequence: "\u65F6\u5E8F\u56FE",
      gantt: "\u7518\u7279\u56FE",
      class: "\u7C7B\u56FE",
      state: "\u72B6\u6001\u56FE",
      pie: "\u997C\u56FE",
      relationship: "\u5173\u7CFB\u56FE",
      journey: "\u65C5\u7A0B\u56FE"
    },
    katex: {
      inline: "\u884C\u5185\u516C\u5F0F",
      block: "\u5757\u7EA7\u516C\u5F0F"
    },
    footer: {
      markdownTotal: "\u5B57\u6570",
      scrollAuto: "\u540C\u6B65\u6EDA\u52A8"
    }
  },
  "en-US": {
    toolbarTips: {
      bold: "bold",
      underline: "underline",
      italic: "italic",
      strikeThrough: "strikeThrough",
      title: "title",
      sub: "subscript",
      sup: "superscript",
      quote: "quote",
      unorderedList: "unordered list",
      orderedList: "ordered list",
      task: "task list",
      codeRow: "inline code",
      code: "block-level code",
      link: "link",
      image: "image",
      table: "table",
      mermaid: "mermaid",
      katex: "formula",
      revoke: "revoke",
      next: "undo revoke",
      save: "save",
      prettier: "prettier",
      pageFullscreen: "fullscreen in page",
      fullscreen: "fullscreen",
      preview: "preview",
      previewOnly: "preview only",
      htmlPreview: "html preview",
      catalog: "catalog",
      github: "source code"
    },
    titleItem: {
      h1: "Lv1 Heading",
      h2: "Lv2 Heading",
      h3: "Lv3 Heading",
      h4: "Lv4 Heading",
      h5: "Lv5 Heading",
      h6: "Lv6 Heading"
    },
    imgTitleItem: {
      link: "Add Image Link",
      upload: "Upload Images",
      clip2upload: "Crop And Upload"
    },
    linkModalTips: {
      linkTitle: "Add Link",
      imageTitle: "Add Image",
      descLabel: "Desc:",
      descLabelPlaceHolder: "Enter a description...",
      urlLabel: "Link:",
      urlLabelPlaceHolder: "Enter a link...",
      buttonOK: "OK"
    },
    clipModalTips: {
      title: "Crop Image",
      buttonUpload: "Upload"
    },
    copyCode: {
      text: "Copy",
      successTips: "Copied!",
      failTips: "Copy failed!"
    },
    mermaid: {
      flow: "flow",
      sequence: "sequence",
      gantt: "gantt",
      class: "class",
      state: "state",
      pie: "pie",
      relationship: "relationship",
      journey: "journey"
    },
    katex: {
      inline: "inline",
      block: "block"
    },
    footer: {
      markdownTotal: "Character Count",
      scrollAuto: "Scroll Auto"
    }
  }
}, b = {
  modelValue: "",
  theme: "light",
  className: "",
  onChange: () => {
  },
  pageFullscreen: false,
  preview: true,
  htmlPreview: false,
  language: "zh-CN",
  toolbars: g,
  toolbarsExclude: [],
  noPrettier: false,
  onHtmlChanged: () => {
  },
  onGetCatalog: () => {
  },
  tabWidth: 2,
  showCodeRowNumber: true,
  previewTheme: "default",
  mdHeadingId: (s) => s,
  tableShape: [6, 4],
  noMermaid: false,
  sanitize: (s) => s,
  placeholder: "",
  noKatex: false,
  defToolbars: [],
  onError: () => {
  },
  codeTheme: "atom",
  footers: h,
  defFooters: [],
  noUploadImg: false,
  codeStyleReverse: true,
  codeStyleReverseList: ["default", "mk-cute"],
  noHighlight: false,
  noImgZoomIn: false,
  inputBoxWidth: "50%",
  sanitizeMermaid: (s) => Promise.resolve(s),
  transformImgUrl: (s) => s,
  codeFoldable: true,
  autoFoldThreshold: 30,
  catalogLayout: "fixed"
}, m = {
  editorExtensions: {
    highlight: {
      js: a,
      css: c
    },
    prettier: {
      standaloneJs: t.main,
      parserMarkdownJs: t.markdown
    },
    cropper: {
      ...o
    },
    screenfull: {
      js: n
    },
    mermaid: {
      js: l,
      enableZoom: true
    },
    katex: {
      ...d
    }
  },
  editorExtensionsAttrs: {},
  editorConfig: {
    languageUserDefined: {},
    mermaidTemplate: {},
    renderDelay: 500,
    zIndex: 2e4
  },
  codeMirrorExtensions: (s, i) => i,
  markdownItConfig: () => {
  },
  markdownItPlugins: (s) => s,
  mermaidConfig: (s) => s,
  katexConfig: (s) => s
}, f = (s) => (0,_vavt_util__WEBPACK_IMPORTED_MODULE_0__.deepMerge)(m, s, {
  excludeKeys(i) {
    return /[iI]{1}nstance/.test(i);
  }
}), v = 0.1;



/***/ }),

/***/ "../../node_modules/md-editor-rt/lib/es/chunks/context.mjs":
/*!*****************************************************************!*\
  !*** ../../node_modules/md-editor-rt/lib/es/chunks/context.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/config.mjs");


const s = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  editorId: "",
  tabWidth: 2,
  theme: "light",
  language: "zh-CN",
  highlight: {
    css: "",
    js: ""
  },
  showCodeRowNumber: false,
  usedLanguageText: _config_mjs__WEBPACK_IMPORTED_MODULE_1__.s["zh-CN"],
  previewTheme: "default",
  customIcon: {},
  rootRef: null,
  disabled: void 0
});



/***/ }),

/***/ "../../node_modules/md-editor-rt/lib/es/chunks/dom.mjs":
/*!*************************************************************!*\
  !*** ../../node_modules/md-editor-rt/lib/es/chunks/dom.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ x),
/* harmony export */   a: () => (/* binding */ S),
/* harmony export */   k: () => (/* binding */ I),
/* harmony export */   u: () => (/* binding */ V),
/* harmony export */   z: () => (/* binding */ z)
/* harmony export */ });
/* harmony import */ var _config_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/config.mjs");

const B = {
  copy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy ${_config_mjs__WEBPACK_IMPORTED_MODULE_0__.p}-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
  "collapse-tips": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-chevron-left ${_config_mjs__WEBPACK_IMPORTED_MODULE_0__.p}-icon"><circle cx="12" cy="12" r="10"/><path d="m14 16-4-4 4-4"/></svg>`,
  pin: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pin"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>',
  "pin-off": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pin-off"><path d="M12 17v5"/><path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89"/><path d="m2 2 20 20"/><path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11"/></svg>'
}, x = (d, c) => typeof c[d] == "string" ? c[d] : B[d], I = (d, c) => {
  const e = (l) => {
    const s = d.parentElement || document.body, o = s.offsetWidth, n = s.offsetHeight, { clientWidth: r, clientHeight: i } = document.documentElement, h = l.offsetX, E = l.offsetY, m = (w) => {
      let a = w.x + document.body.scrollLeft - document.body.clientLeft - h, u = w.y + document.body.scrollTop - document.body.clientTop - E;
      a = a < 1 ? 1 : a < r - o - 1 ? a : r - o - 1, u = u < 1 ? 1 : u < i - n - 1 ? u : i - n - 1, c ? c(a, u) : (s.style.left = a + "px", s.style.top = u + "px");
    };
    document.addEventListener("mousemove", m);
    const p = () => {
      document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", p);
    };
    document.addEventListener("mouseup", p);
  };
  return d.addEventListener("mousedown", e), () => {
    d.removeEventListener("mousedown", e);
  };
}, S = (d, c, e = "") => {
  var s;
  const l = document.getElementById(c.id);
  if (l)
    e !== "" && (Reflect.get(window, e) ? (s = c.onload) == null || s.call(l, new Event("load")) : c.onload && l.addEventListener("load", c.onload));
  else {
    const o = { ...c };
    o.onload = null;
    const n = A(d, o);
    c.onload && n.addEventListener("load", c.onload), document.head.appendChild(n);
  }
}, V = (d, c) => {
  const e = document.getElementById(c.id);
  e == null || e.remove(), S(d, c);
}, A = (d, c) => {
  const e = document.createElement(d);
  return Object.keys(c).forEach((l) => {
    c[l] !== void 0 && (e[l] = c[l]);
  }), e;
}, z = /* @__PURE__ */ (() => {
  const d = (e) => {
    if (!e)
      return () => {
      };
    const l = e.firstChild;
    let s = 1, o = 0, n = 0, r = false, i, h, E, m = 1;
    const p = () => {
      l.style.transform = `translate(${o}px, ${n}px) scale(${s})`;
    }, w = (t) => {
      t.touches.length === 1 ? (r = true, i = t.touches[0].clientX - o, h = t.touches[0].clientY - n) : t.touches.length === 2 && (E = Math.hypot(
        t.touches[0].clientX - t.touches[1].clientX,
        t.touches[0].clientY - t.touches[1].clientY
      ), m = s);
    }, a = (t) => {
      if (t.preventDefault(), r && t.touches.length === 1)
        o = t.touches[0].clientX - i, n = t.touches[0].clientY - h, p();
      else if (t.touches.length === 2) {
        const f = Math.hypot(
          t.touches[0].clientX - t.touches[1].clientX,
          t.touches[0].clientY - t.touches[1].clientY
        ) / E, v = s;
        s = m * (1 + (f - 1));
        const M = (t.touches[0].clientX + t.touches[1].clientX) / 2, y = (t.touches[0].clientY + t.touches[1].clientY) / 2, T = l.getBoundingClientRect(), D = (M - T.left) / v, $ = (y - T.top) / v;
        o -= D * (s - v), n -= $ * (s - v), p();
      }
    }, u = () => {
      r = false;
    }, k = (t) => {
      t.preventDefault();
      const L = 0.02, f = s;
      t.deltaY < 0 ? s += L : s = Math.max(0.1, s - L);
      const v = l.getBoundingClientRect(), M = t.clientX - v.left, y = t.clientY - v.top;
      o -= M / f * (s - f), n -= y / f * (s - f), p();
    }, Y = (t) => {
      r = true, i = t.clientX - o, h = t.clientY - n;
    }, X = (t) => {
      r && (o = t.clientX - i, n = t.clientY - h, p());
    }, C = () => {
      r = false;
    }, H = () => {
      r = false;
    };
    return e.addEventListener("touchstart", w, { passive: false }), e.addEventListener("touchmove", a, { passive: false }), e.addEventListener("touchend", u), e.addEventListener("wheel", k, { passive: false }), e.addEventListener("mousedown", Y), e.addEventListener("mousemove", X), e.addEventListener("mouseup", C), e.addEventListener("mouseleave", H), () => {
      e.removeEventListener("touchstart", w), e.removeEventListener("touchmove", a), e.removeEventListener("touchend", u), e.removeEventListener("wheel", k), e.removeEventListener("mousedown", Y), e.removeEventListener("mousemove", X), e.removeEventListener("mouseup", C), e.removeEventListener("mouseleave", H);
    };
  };
  return (e, l) => {
    const s = /* @__PURE__ */ new Map();
    return e == null || e.forEach((o) => {
      let n = o.querySelector(`.${_config_mjs__WEBPACK_IMPORTED_MODULE_0__.p}-mermaid-action`);
      n || (o.insertAdjacentHTML(
        "beforeend",
        `<div class="${_config_mjs__WEBPACK_IMPORTED_MODULE_0__.p}-mermaid-action">${x("pin-off", l.customIcon)}</div>`
      ), n = o.querySelector(`.${_config_mjs__WEBPACK_IMPORTED_MODULE_0__.p}-mermaid-action`));
      const r = () => {
        const i = s.get(o);
        if (i != null && i.removeEvent)
          i.removeEvent(), o.removeAttribute("data-grab"), s.set(o, { removeClick: i.removeClick }), n.innerHTML = x("pin-off", l.customIcon);
        else {
          const h = d(o);
          o.setAttribute("data-grab", ""), s.set(o, { removeEvent: h, removeClick: i == null ? void 0 : i.removeClick }), n.innerHTML = x("pin", l.customIcon);
        }
      };
      n.addEventListener("click", r), s.set(o, {
        removeClick: () => n.removeEventListener("click", r)
      });
    }), () => {
      s.forEach(({ removeEvent: o, removeClick: n }) => {
        o == null || o(), n == null || n();
      }), s.clear();
    };
  };
})();



/***/ }),

/***/ "../../node_modules/md-editor-rt/lib/es/chunks/event-name.mjs":
/*!********************************************************************!*\
  !*** ../../node_modules/md-editor-rt/lib/es/chunks/event-name.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ S),
/* harmony export */   C: () => (/* binding */ R),
/* harmony export */   E: () => (/* binding */ T),
/* harmony export */   F: () => (/* binding */ L),
/* harmony export */   G: () => (/* binding */ w),
/* harmony export */   H: () => (/* binding */ G),
/* harmony export */   O: () => (/* binding */ O),
/* harmony export */   P: () => (/* binding */ g),
/* harmony export */   R: () => (/* binding */ D),
/* harmony export */   S: () => (/* binding */ U),
/* harmony export */   T: () => (/* binding */ m),
/* harmony export */   U: () => (/* binding */ H),
/* harmony export */   a: () => (/* binding */ p),
/* harmony export */   b: () => (/* binding */ r),
/* harmony export */   c: () => (/* binding */ A),
/* harmony export */   d: () => (/* binding */ u),
/* harmony export */   e: () => (/* binding */ V),
/* harmony export */   f: () => (/* binding */ b),
/* harmony export */   g: () => (/* binding */ F),
/* harmony export */   h: () => (/* binding */ N),
/* harmony export */   i: () => (/* binding */ d),
/* harmony export */   j: () => (/* binding */ I),
/* harmony export */   k: () => (/* binding */ f),
/* harmony export */   l: () => (/* binding */ P)
/* harmony export */ });
var i = Object.defineProperty;
var C = (t, s, o) => s in t ? i(t, s, { enumerable: true, configurable: true, writable: true, value: o }) : t[s] = o;
var E = (t, s, o) => C(t, typeof s != "symbol" ? s + "" : s, o);
class _ {
  constructor() {
    E(this, "pools", {});
  }
  // 移除事件监听
  remove(s, o, e) {
    const a = this.pools[s] && this.pools[s][o];
    a && (this.pools[s][o] = a.filter((n) => n !== e));
  }
  // 清空全部事件，由于单一实例，多次注册会被共享内容
  clear(s) {
    this.pools[s] = {};
  }
  // 注册事件监听
  on(s, o) {
    return this.pools[s] || (this.pools[s] = {}), this.pools[s][o.name] || (this.pools[s][o.name] = []), this.pools[s][o.name].push(o.callback), this.pools[s][o.name].includes(o.callback);
  }
  // 触发事件
  emit(s, o, ...e) {
    this.pools[s] || (this.pools[s] = {});
    const a = this.pools[s][o];
    a && a.forEach((n) => {
      try {
        n(...e);
      } catch (l) {
        console.error(`${o} monitor event exception\uFF01`, l);
      }
    });
  }
}
const r = new _(), A = "onSave", p = "changeCatalogVisible", R = "changeFullscreen", g = "pageFullscreenChanged", L = "fullscreenChanged", N = "previewChanged", d = "previewOnlyChanged", G = "htmlPreviewChanged", I = "catalogVisibleChanged", S = "buildFinished", T = "errorCatcher", D = "replace", H = "uploadImage", O = "openModals", V = "ctrlZ", u = "ctrlShiftZ", f = "catalogChanged", P = "pushCatalog", F = "rerender", b = "eventListener", m = "taskStateChanged", U = "sendEditorView", w = "getEditorView";



/***/ }),

/***/ "../../node_modules/md-editor-rt/lib/es/chunks/index.mjs":
/*!***************************************************************!*\
  !*** ../../node_modules/md-editor-rt/lib/es/chunks/index.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ N),
/* harmony export */   M: () => (/* binding */ $e)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "../../node_modules/react-dom/index.js");
/* harmony import */ var _config_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/config.mjs");
/* harmony import */ var _dom_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/dom.mjs");
/* harmony import */ var _context_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/context.mjs");
/* harmony import */ var _index3_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./index3.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/index3.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/bold.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/code.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/expand.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/eye.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/forward.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/heading.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/image.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/italic.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/link.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/list-ordered.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/list-todo.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/list-tree.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/list.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/maximize-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/minimize-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/quote.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/reply.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/save.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/shrink.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/strikethrough.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/subscript.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/superscript.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/table.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/trash-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/underline.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/upload.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/view.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/chart-area.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/code-xml.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/square-code.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! lucide-react */ "../../node_modules/lucide-react/dist/esm/icons/square-sigma.js");








const ve = (e) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: `lucide lucide-github-icon ${e.className}`,
    children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" }),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M9 18c-4.51 2-5-2-7-2" })
    ]
  }
), ye = {
  bold: lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"],
  underline: lucide_react__WEBPACK_IMPORTED_MODULE_31__["default"],
  italic: lucide_react__WEBPACK_IMPORTED_MODULE_14__["default"],
  "strike-through": lucide_react__WEBPACK_IMPORTED_MODULE_26__["default"],
  title: lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"],
  sub: lucide_react__WEBPACK_IMPORTED_MODULE_27__["default"],
  sup: lucide_react__WEBPACK_IMPORTED_MODULE_28__["default"],
  quote: lucide_react__WEBPACK_IMPORTED_MODULE_22__["default"],
  "unordered-list": lucide_react__WEBPACK_IMPORTED_MODULE_19__["default"],
  "ordered-list": lucide_react__WEBPACK_IMPORTED_MODULE_16__["default"],
  task: lucide_react__WEBPACK_IMPORTED_MODULE_17__["default"],
  "code-row": lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"],
  code: lucide_react__WEBPACK_IMPORTED_MODULE_37__["default"],
  link: lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"],
  image: lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"],
  table: lucide_react__WEBPACK_IMPORTED_MODULE_29__["default"],
  revoke: lucide_react__WEBPACK_IMPORTED_MODULE_23__["default"],
  next: lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"],
  save: lucide_react__WEBPACK_IMPORTED_MODULE_24__["default"],
  prettier: lucide_react__WEBPACK_IMPORTED_MODULE_37__["default"],
  minimize: lucide_react__WEBPACK_IMPORTED_MODULE_21__["default"],
  maximize: lucide_react__WEBPACK_IMPORTED_MODULE_20__["default"],
  "fullscreen-exit": lucide_react__WEBPACK_IMPORTED_MODULE_25__["default"],
  fullscreen: lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"],
  "preview-only": lucide_react__WEBPACK_IMPORTED_MODULE_33__["default"],
  preview: lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"],
  "preview-html": lucide_react__WEBPACK_IMPORTED_MODULE_36__["default"],
  catalog: lucide_react__WEBPACK_IMPORTED_MODULE_18__["default"],
  github: ve,
  mermaid: lucide_react__WEBPACK_IMPORTED_MODULE_35__["default"],
  formula: lucide_react__WEBPACK_IMPORTED_MODULE_38__["default"],
  close: lucide_react__WEBPACK_IMPORTED_MODULE_34__["default"],
  delete: lucide_react__WEBPACK_IMPORTED_MODULE_30__["default"],
  upload: lucide_react__WEBPACK_IMPORTED_MODULE_32__["default"]
}, Ce = (e) => (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(ye[e.name], {
  className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_3__.p}-icon`
}), N = (e) => {
  const { customIcon: u } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), l = u[e.name];
  if (typeof l == "object") {
    const s = l.component;
    return typeof s == "function" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(s, { ...l.props }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      "span",
      {
        dangerouslySetInnerHTML: {
          __html: l.component
        }
      }
    );
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Ce, { name: e.name });
}, ke = `${_config_mjs__WEBPACK_IMPORTED_MODULE_3__.p}-modal-container`, $e = (e) => {
  const { theme: u, rootRef: l } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_mjs__WEBPACK_IMPORTED_MODULE_5__.E), { onClose: s = () => {
  }, onAdjust: C = () => {
  }, style: $ = {}, showMask: F = true } = e, [h, k] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(e.visible), [j, b] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([`${_config_mjs__WEBPACK_IMPORTED_MODULE_3__.p}-modal`]), f = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), S = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), a = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(), E = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), [g, r] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    maskStyle: {
      zIndex: -1
    },
    modalStyle: {
      zIndex: -1
    },
    initPos: {
      left: "0px",
      top: "0px"
    },
    historyPos: {
      left: "0px",
      top: "0px"
    }
  }), L = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => e.isFullscreen ? {
    width: "100%",
    height: "100%"
  } : {
    width: e.width,
    height: e.height
  }, [e.height, e.isFullscreen, e.width]);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var i;
    const t = (i = l.current) == null ? void 0 : i.getRootNode();
    return a.current = t instanceof Document ? document.body : t, () => {
      a.current = void 0;
    };
  }, [l]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    let t = () => {
    };
    return !e.isFullscreen && e.visible && (t = (0,_dom_mjs__WEBPACK_IMPORTED_MODULE_4__.k)(
      S.current,
      (i, x) => {
        r((v) => ({
          ...v,
          initPos: {
            left: i + "px",
            top: x + "px"
          }
        }));
      }
    )), t;
  }, [e.isFullscreen, e.visible]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (h) {
      const t = f.current.offsetWidth / 2, i = f.current.offsetHeight / 2, x = document.documentElement.clientWidth / 2, v = document.documentElement.clientHeight / 2;
      r((R) => ({
        ...R,
        maskStyle: {
          zIndex: _config_mjs__WEBPACK_IMPORTED_MODULE_3__.g.editorConfig.zIndex + (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_6__.d)()
        },
        modalStyle: {
          zIndex: _config_mjs__WEBPACK_IMPORTED_MODULE_3__.g.editorConfig.zIndex + (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_6__.d)()
        },
        initPos: {
          left: x - t + "px",
          top: v - i + "px"
        }
      }));
    }
  }, [h]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const t = e.visible;
    t ? (b(() => [`${_config_mjs__WEBPACK_IMPORTED_MODULE_3__.p}-modal`, "zoom-in"]), k(t)) : (b(() => [`${_config_mjs__WEBPACK_IMPORTED_MODULE_3__.p}-modal`, "zoom-out"]), setTimeout(() => {
      k(t);
    }, 150));
  }, [e.visible]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: a.current && (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { ref: E, className: ke, "data-theme": u, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
      "div",
      {
        className: e.className,
        style: { ...$, display: h ? "block" : "none" },
        children: [
          F && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            "div",
            {
              className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_3__.p}-modal-mask`,
              style: g.maskStyle,
              onClick: s
            }
          ),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            "div",
            {
              className: j.join(" "),
              style: {
                ...g.modalStyle,
                ...g.initPos,
                ...L
              },
              ref: f,
              children: [
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_3__.p}-modal-header`, ref: S, children: e.title || "" }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_3__.p}-modal-func`, children: [
                  e.showAdjust && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    "div",
                    {
                      className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_3__.p}-modal-adjust`,
                      onClick: (t) => {
                        t.stopPropagation(), e.isFullscreen ? r((i) => ({
                          ...i,
                          initPos: i.historyPos
                        })) : r((i) => ({
                          ...i,
                          historyPos: i.initPos,
                          initPos: {
                            left: "0",
                            top: "0"
                          }
                        })), C instanceof Function && C(!e.isFullscreen);
                      },
                      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(N, { name: e.isFullscreen ? "minimize" : "maximize" })
                    }
                  ),
                  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    "div",
                    {
                      className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_3__.p}-modal-close`,
                      onClick: (t) => {
                        t.stopPropagation(), e.onClose && e.onClose();
                      },
                      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(N, { name: "close" })
                    }
                  )
                ] }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_3__.p}-modal-body`, children: e.children })
              ]
            }
          )
        ]
      }
    ) }),
    a.current
  ) });
};



/***/ }),

/***/ "../../node_modules/md-editor-rt/lib/es/chunks/index2.mjs":
/*!****************************************************************!*\
  !*** ../../node_modules/md-editor-rt/lib/es/chunks/index2.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ Ce),
/* harmony export */   a: () => (/* binding */ Le),
/* harmony export */   s: () => (/* binding */ Se)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/config.mjs");
/* harmony import */ var _index3_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index3.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/index3.mjs");
/* harmony import */ var _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./event-name.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/event-name.mjs");
/* harmony import */ var _vavt_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vavt/util */ "../../node_modules/@vavt/util/lib/es/index.mjs");






const me = `.${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-preview > [data-line]`, V = (t, e) => +getComputedStyle(t).getPropertyValue(e).replace("px", ""), Le = (t, e) => {
  const b = (0,_vavt_util__WEBPACK_IMPORTED_MODULE_5__.debounce)(() => {
    t.removeEventListener("scroll", n), t.addEventListener("scroll", n), e.removeEventListener("scroll", n), e.addEventListener("scroll", n);
  }, 50), n = (A) => {
    const L = t.clientHeight, $ = e.clientHeight, g = t.scrollHeight, s = e.scrollHeight, u = (g - L) / (s - $);
    A.target === t ? (e.removeEventListener("scroll", n), e.scrollTo({
      top: t.scrollTop / u
      // behavior: 'smooth'
    }), b()) : (t.removeEventListener("scroll", n), t.scrollTo({
      top: e.scrollTop * u
      // behavior: 'smooth'
    }), b());
  };
  return [
    () => {
      b().finally(() => {
        t.dispatchEvent(new Event("scroll"));
      });
    },
    () => {
      t.removeEventListener("scroll", n), e.removeEventListener("scroll", n);
    }
  ];
}, Se = (t, e, b) => {
  const { view: n } = b, A = (0,_vavt_util__WEBPACK_IMPORTED_MODULE_5__.createSmoothScroll)(), L = (c) => n.lineBlockAt(n.state.doc.line(c + 1).from).top, $ = (c) => n.lineBlockAt(n.state.doc.line(c + 1).from).bottom;
  let g = [], s = [], u = [];
  const w = () => {
    g = [], s = Array.from(
      e.querySelectorAll(me)
    ), u = s.map((a) => Number(a.dataset.line));
    const c = [...u], { lines: v } = n.state.doc;
    let T = c.shift() || 0, o = c.shift() || v;
    for (let a = 0; a < v; a++)
      a === o && (T = a, o = c.shift() || v), g.push({
        start: T,
        end: o - 1
      });
  }, x = (c, v) => {
    let T = 1;
    for (let o = s.length - 1; o - 1 >= 0; o--) {
      const a = s[o], f = s[o - 1];
      if (a.offsetTop + a.offsetHeight > v && f.offsetTop < v) {
        T = Number(f.dataset.line);
        break;
      }
    }
    for (let o = g.length - 1; o >= 0; o--) {
      const a = $(g[o].end), f = L(g[o].start);
      if (a > c && f <= c) {
        T = T < g[o].start ? T : g[o].start;
        break;
      }
    }
    return T;
  };
  let p = 0, y = 0;
  const P = () => {
    var D, _, W;
    if (y !== 0)
      return false;
    p++;
    const { scrollDOM: c, contentHeight: v } = n;
    let T = V(e, "padding-top");
    const o = n.lineBlockAtHeight(c.scrollTop), { number: a } = n.state.doc.lineAt(o.from), f = g[a - 1];
    if (!f)
      return false;
    let l = 1;
    const i = e.querySelector(`[data-line="${f.start}"]`) || ((D = e.firstElementChild) == null ? void 0 : D.firstElementChild), m = e.querySelector(`[data-line="${f.end + 1}"]`) || ((_ = e.lastElementChild) == null ? void 0 : _.lastElementChild), N = c.scrollHeight - c.clientHeight, h = e.scrollHeight - e.clientHeight;
    let H = L(f.start), d = $(f.end), r = i.offsetTop, S = m.offsetTop - r;
    H === 0 && (r = 0, i === m ? (T = 0, d = v - c.offsetHeight, S = h) : S = m.offsetTop), l = (c.scrollTop - H) / (d - H);
    const C = m == ((W = e.lastElementChild) == null ? void 0 : W.lastElementChild) ? m.offsetTop + m.clientHeight : m.offsetTop;
    if (d >= N || C > h) {
      const j = x(N, h);
      H = L(j), l = (c.scrollTop - H) / (N - H);
      const O = e.querySelector(`[data-line="${j}"]`);
      H > 0 && O && (r = O.offsetTop), S = h - r + V(e, "padding-top");
    }
    const I = r - T + S * l;
    A(e, I, () => {
      p--;
    });
  }, k = () => {
    var C, I, D, _, W, j;
    if (p !== 0)
      return;
    y++;
    const { scrollDOM: c } = n, v = e.scrollTop, T = e.scrollHeight, o = c.scrollHeight - c.clientHeight, a = e.scrollHeight - e.clientHeight;
    let f = (C = e.firstElementChild) == null ? void 0 : C.firstElementChild, l = (I = e.firstElementChild) == null ? void 0 : I.lastElementChild;
    if (u.length > 0) {
      let O = Math.ceil(
        u[u.length - 1] * (v / T)
      ), E = u.findLastIndex((M) => M <= O);
      E = E === -1 ? 0 : E, O = u[E];
      for (let M = E; M >= 0 && M < u.length; )
        if (s[M].offsetTop > v) {
          if (M - 1 >= 0) {
            M--;
            continue;
          }
          O = -1, E = M;
          break;
        } else {
          if (M + 1 < u.length && s[M + 1].offsetTop < v) {
            M++;
            continue;
          }
          O = u[M], E = M;
          break;
        }
      switch (E) {
        case -1: {
          f = (D = e.firstElementChild) == null ? void 0 : D.firstElementChild, l = s[E];
          break;
        }
        case u.length - 1: {
          f = s[E], l = (_ = e.firstElementChild) == null ? void 0 : _.lastElementChild;
          break;
        }
        default:
          f = s[E], l = s[E + 1 === s.length ? E : E + 1];
      }
    }
    let i = f === ((W = e.firstElementChild) == null ? void 0 : W.firstElementChild) ? 0 : f.offsetTop - V(f, "margin-top"), m = l.offsetTop, N = 0;
    const { start: h, end: H } = g[Number(f.dataset.line || 0)];
    let d = L(h);
    const r = L(
      H + 1 === n.state.doc.lines ? H : H + 1
    );
    let S = 0;
    if (r > o || l.offsetTop + l.offsetHeight > a) {
      const O = x(o, a), E = e.querySelector(`[data-line="${O}"]`);
      i = E ? E.offsetTop - V(E, "margin-top") : i, d = L(O), N = (v - i) / (a - i), S = o - d;
    } else f === ((j = e.firstElementChild) == null ? void 0 : j.firstElementChild) ? (f === l && (m = l.offsetTop + l.offsetHeight + +getComputedStyle(l).marginBottom.replace("px", "")), S = r, N = Math.max(v / m, 0)) : (N = Math.max(
      (v - i) / (m - i),
      0
    ), S = r - d);
    A(t, d + S * N, () => {
      y--;
    });
  }, q = (c) => {
    var a;
    const { scrollDOM: v, contentHeight: T } = n, o = v.clientHeight;
    if (T <= o || e.firstElementChild.clientHeight <= e.clientHeight || n.state.doc.lines <= ((a = g[g.length - 1]) == null ? void 0 : a.end))
      return false;
    c.target === t ? P() : k();
  };
  return [
    () => {
      w(), t.addEventListener("scroll", q), e.addEventListener("scroll", q), t.dispatchEvent(new Event("scroll"));
    },
    () => {
      t.removeEventListener("scroll", q), e.removeEventListener("scroll", q);
    }
  ];
}, ee = (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  scrollElementRef: void 0,
  rootNodeRef: void 0
}), te = ({
  tocItem: t,
  mdHeadingId: e,
  onActive: b,
  onClick: n,
  scrollElementOffsetTop: A = 0
}) => {
  const { scrollElementRef: L, rootNodeRef: $ } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ee), g = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    t.active && b(t, g.current);
  }, [b, t, t.active]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
    "div",
    {
      ref: g,
      className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
        `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-catalog-link`,
        t.active && `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-catalog-active`
      ]),
      onClick: (s) => {
        if (s.stopPropagation(), n == null || n(s, t), s.defaultPrevented)
          return;
        const u = e(t.text, t.level, t.index), w = $ == null ? void 0 : $.current.getElementById(u), x = L == null ? void 0 : L.current;
        if (w && x) {
          let p = w.offsetParent, y = w.offsetTop;
          if (x.contains(p))
            for (; p && x != p; )
              y += p == null ? void 0 : p.offsetTop, p = p == null ? void 0 : p.offsetParent;
          const P = w.previousElementSibling;
          let k = 0;
          P || (k = V(w, "margin-top")), x == null || x.scrollTo({
            top: y - A - k,
            behavior: "smooth"
          });
        }
      },
      children: [
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { title: t.text, children: t.text }),
        t.children && t.children.length > 0 && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-catalog-wrapper`, children: t.children.map((s) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
          te,
          {
            mdHeadingId: e,
            tocItem: s,
            onActive: b,
            onClick: n,
            scrollElementOffsetTop: A
          },
          `${t.text}-link-${s.level}-${s.text}`
        )) })
      ]
    }
  );
}, he = (t) => {
  const {
    editorId: e,
    mdHeadingId: b = _config_mjs__WEBPACK_IMPORTED_MODULE_2__.d.mdHeadingId,
    theme: n = "light",
    offsetTop: A = 20,
    syncWith: L = "preview"
  } = t, $ = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => `#${e}-preview-wrapper`, [e]), [g, s] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), [u, w] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(), x = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), p = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(), y = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(), P = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(), [k, q] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(), [c, v] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}), T = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const l = [];
    return g.forEach((i, m) => {
      if (t.catalogMaxDepth && i.level > t.catalogMaxDepth)
        return;
      const { text: N, level: h, line: H } = i, d = {
        level: h,
        text: N,
        line: H,
        index: m + 1,
        active: u === i
      };
      if (l.length === 0)
        l.push(d);
      else {
        let r = l[l.length - 1];
        if (d.level > r.level)
          for (let S = r.level + 1; S <= 6; S++) {
            const { children: C } = r;
            if (!C) {
              r.children = [d];
              break;
            }
            if (r = C[C.length - 1], d.level <= r.level) {
              C.push(d);
              break;
            }
          }
        else
          l.push(d);
      }
    }), l;
  }, [u, g, t.catalogMaxDepth]), [o] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => t.scrollElement || `#${e}-preview-wrapper`), a = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    var i;
    if (o instanceof HTMLElement)
      return o;
    let l = document;
    return (o === $ || t.isScrollElementInShadow) && (l = (i = x.current) == null ? void 0 : i.getRootNode()), l.querySelector(o);
  }, [$, t.isScrollElementInShadow, o]), f = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (l, i) => {
      var m;
      v({
        top: i.offsetTop + V(i, "padding-top") + "px"
      }), (m = t.onActive) == null || m.call(t, l, i);
    },
    [t]
  );
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    P.current = x.current.getRootNode();
  }, []), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    let l = [];
    const i = (h) => {
      if (h.length === 0)
        return w(void 0), s([]), l = h, false;
      const { activeHead: H } = h.reduce(
        (d, r, S) => {
          var I;
          let C = 0;
          if (L === "preview") {
            const D = (I = P.current) == null ? void 0 : I.getElementById(
              b(r.text, r.level, S + 1)
            );
            D instanceof HTMLElement && (C = (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.a)(D, p.current));
          } else if (k) {
            const D = k.lineBlockAt(
              k.state.doc.line(r.line + 1).from
            ).top, _ = k.scrollDOM.scrollTop;
            C = D - _;
          }
          return C < A && C > d.minTop ? {
            activeHead: r,
            minTop: C
          } : d;
        },
        {
          activeHead: h[0],
          minTop: Number.MIN_SAFE_INTEGER
        }
      );
      w(H), s(h), l = h;
    }, m = () => {
      i(l);
    }, N = (h) => {
      var H, d;
      if ((H = y.current) == null || H.removeEventListener("scroll", m), L === "editor")
        y.current = k == null ? void 0 : k.scrollDOM;
      else {
        const r = a();
        p.current = r, y.current = r === document.documentElement ? document : r;
      }
      i(h), (d = y.current) == null || d.addEventListener("scroll", m);
    };
    return _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__.b.on(e, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__.k,
      callback: N
    }), _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__.l), () => {
      var h;
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__.b.remove(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__.k, N), (h = y.current) == null || h.removeEventListener("scroll", m);
    };
  }, [A, b, a, e, L, k]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const l = (i) => {
      q(i);
    };
    return _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__.b.on(e, {
      name: _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__.G,
      callback: l
    }), _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__.b.emit(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__.S), () => {
      _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__.b.remove(e, _event_name_mjs__WEBPACK_IMPORTED_MODULE_4__.G, l);
    };
  }, [e]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    ee.Provider,
    {
      value: {
        scrollElementRef: p,
        rootNodeRef: P
      },
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        "div",
        {
          className: (0,_index3_mjs__WEBPACK_IMPORTED_MODULE_3__.c)([
            `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-catalog`,
            n === "dark" && `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-catalog-dark`,
            t.className || ""
          ]),
          style: t.style,
          ref: x,
          children: T.length > 0 && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-catalog-indicator`, style: c }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-catalog-container`, children: T.map((l) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              te,
              {
                mdHeadingId: b,
                tocItem: l,
                onActive: f,
                onClick: t.onClick,
                scrollElementOffsetTop: t.scrollElementOffsetTop
              },
              `link-${l.level}-${l.text}`
            )) })
          ] })
        }
      )
    }
  );
}, Ce = (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(he);



/***/ }),

/***/ "../../node_modules/md-editor-rt/lib/es/chunks/index3.mjs":
/*!****************************************************************!*\
  !*** ../../node_modules/md-editor-rt/lib/es/chunks/index3.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ d),
/* harmony export */   b: () => (/* binding */ i),
/* harmony export */   c: () => (/* binding */ g),
/* harmony export */   d: () => (/* binding */ f),
/* harmony export */   g: () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var _config_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/config.mjs");

const i = (t, s = "image.png") => {
  const r = t.split(","), n = r[0].match(/:(.*?);/);
  if (n) {
    const p = n[1], o = atob(r[1]);
    let e = o.length;
    const a = new Uint8Array(e);
    for (; e--; )
      a[e] = o.charCodeAt(e);
    return new File([a], s, { type: p });
  }
  return null;
}, l = (t, s) => {
  if (!t)
    return t;
  const r = s.split(`
`), n = ['<span rn-wrapper aria-hidden="true">'];
  return r.forEach(() => {
    n.push("<span></span>");
  }), n.push("</span>"), `<span class="${_config_mjs__WEBPACK_IMPORTED_MODULE_0__.p}-code-block">${t}</span>${n.join("")}`;
}, g = (t) => t.filter((s) => s !== false && s !== void 0).join(" "), d = (t, s) => {
  if (!t || !s)
    return 0;
  const r = t == null ? void 0 : t.getBoundingClientRect();
  if (s === document.documentElement)
    return r.top - s.clientTop;
  const n = s == null ? void 0 : s.getBoundingClientRect();
  return r.top - n.top;
}, f = /* @__PURE__ */ (() => {
  let t = 0;
  return () => ++t;
})();



/***/ }),

/***/ "../../node_modules/md-editor-rt/lib/es/chunks/index4.mjs":
/*!****************************************************************!*\
  !*** ../../node_modules/md-editor-rt/lib/es/chunks/index4.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ K)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config.mjs */ "../../node_modules/md-editor-rt/lib/es/chunks/config.mjs");



const N = `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-dropdown-hidden`, K = (o) => {
  const { relative: f = "html", onChange: i, disabled: r } = o, [H, u] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    overlayClass: N,
    overlayStyle: {}
  }), n = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({
    triggerHover: false,
    overlayHover: false
  }), c = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), d = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null), v = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    var S, x;
    if (r)
      return false;
    n.current.triggerHover = true;
    const e = c.current, t = d.current;
    if (!e || !t)
      return;
    const C = e.getBoundingClientRect(), $ = e.offsetTop, j = e.offsetLeft, k = C.height, q = C.width, p = e.getRootNode(), y = ((S = p.querySelector(f)) == null ? void 0 : S.scrollLeft) || 0, w = ((x = p.querySelector(f)) == null ? void 0 : x.clientWidth) || 0;
    let l = j - t.offsetWidth / 2 + q / 2 - y;
    l + t.offsetWidth > y + w && (l = y + w - t.offsetWidth), l < 0 && (l = 0), u((A) => ({
      ...A,
      overlayStyle: {
        top: $ + k + "px",
        left: l + "px"
      }
    })), i(true);
  }, [r, i, f]), m = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    if (r)
      return false;
    n.current.overlayHover = true;
  }, [r]), L = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(-1), s = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (e) => {
      var t;
      if (r)
        return false;
      (t = c.current) != null && t.contains(e.target) ? n.current.triggerHover = false : n.current.overlayHover = false, clearTimeout(L.current), L.current = window.setTimeout(() => {
        !n.current.overlayHover && !n.current.triggerHover && i(false);
      }, 10);
    },
    [r, i]
  ), R = o.children, g = o.overlay, T = (0,react__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(R, {
    ref: c,
    key: "cloned-dropdown-trigger"
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    o.visible ? u((e) => ({
      ...e,
      overlayClass: ""
    })) : u((e) => ({
      ...e,
      overlayClass: N
    }));
  }, [o.visible]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const e = c.current, t = d.current;
    return e == null || e.addEventListener("mouseenter", v), e == null || e.addEventListener("mouseleave", s), t == null || t.addEventListener("mouseenter", m), t == null || t.addEventListener("mouseleave", s), () => {
      e == null || e.removeEventListener("mouseenter", v), e == null || e.removeEventListener("mouseleave", s), t == null || t.removeEventListener("mouseenter", m), t == null || t.removeEventListener("mouseleave", s);
    };
  }, [s, m, v]);
  const b = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "div",
    {
      className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-dropdown ${H.overlayClass}`,
      style: H.overlayStyle,
      ref: d,
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${_config_mjs__WEBPACK_IMPORTED_MODULE_2__.p}-dropdown-overlay`, children: g instanceof Array ? g[0] : g })
    }
  );
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [
    T,
    b
  ] });
};



/***/ })

}]);