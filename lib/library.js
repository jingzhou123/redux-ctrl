(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Library", [], factory);
	else if(typeof exports === 'object')
		exports["Library"] = factory();
	else
		root["Library"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIn = __webpack_require__(2);

Object.defineProperty(exports, 'getIn', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getIn).default;
  }
});

var _setIn = __webpack_require__(3);

Object.defineProperty(exports, 'setIn', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_setIn).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = undefined;
exports.default = createBundle;

var _lodash = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"lodash\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _utils = __webpack_require__(0);

var initialState = {};

var ACTION_PREFIX = 'accessor';
var ACTION_NAME_SET = 'set';
var actionTypeCreator = function actionTypeCreator(reducerName, actionTypeName) {
  return reducerName + '.' + ACTION_PREFIX + '/' + actionTypeName;
};

function bindActionCreators(name) {
  var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return (0, _lodash.mapValues)(object, function (fn) {
    return function () {
      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      return fn.apply(undefined, [name].concat(rest));
    };
  });
}
/**
 *
 * @param {String} name 用来区分reducer
 * @param {String} field 用来区分是哪个域
 * @param {String} value
 */
function setActionCreator(name, field, value) {
  return {
    type: actionTypeCreator(name, ACTION_NAME_SET),
    payload: {
      value: value
    },
    meta: {
      field: field
    }
  };
}

var set = exports.set = setActionCreator;

function createBundle(name) {
  if (!name) {
    throw new Error('must provide a name');
  }
  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
      case actionTypeCreator(name, ACTION_NAME_SET):
        return (0, _utils.setIn)(state, '' + action.meta.field, action.payload.value);
      default:
        return state;
    }
  };

  var actions = bindActionCreators(name, {
    set: setActionCreator
  });

  return {
    reducer: reducer,
    actions: actions
  };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"lodash\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var getIn = function getIn(state, field) {
  if (!state) {
    return state;
  }

  var path = (0, _lodash.toPath)(field);
  var length = path.length;
  if (!length) {
    return undefined;
  }

  var result = state;
  for (var i = 0; i < length && !!result; ++i) {
    result = result[path[i]];
  }

  return result;
};

exports.default = getIn;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token (24:4)\n\n\u001b[0m \u001b[90m 22 | \u001b[39m\n \u001b[90m 23 | \u001b[39m  \u001b[36mreturn\u001b[39m {\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 24 | \u001b[39m    \u001b[33m...\u001b[39mstate\u001b[33m,\u001b[39m\n \u001b[90m    | \u001b[39m    \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 25 | \u001b[39m    [first]\u001b[33m:\u001b[39m next\n \u001b[90m 26 | \u001b[39m  }\n \u001b[90m 27 | \u001b[39m}\u001b[0m\n");

/***/ })
/******/ ]);
});
//# sourceMappingURL=Library.js.map