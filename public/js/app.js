/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
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
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
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
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
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
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
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
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

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
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/axios/node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

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
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

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
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

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
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/axios/node_modules/is-buffer/index.js":
/*!************************************************************!*\
  !*** ./node_modules/axios/node_modules/is-buffer/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Flashs/ContentFlashs.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Content/Flashs/ContentFlashs.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../store/store */ "./resources/js/store/store.js");
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  store: _store_store__WEBPACK_IMPORTED_MODULE_0__["default"],
  props: ['flashsData'],
  data: function data() {
    return {};
  },
  computed: {
    flashs: function flashs() {
      return JSON.parse(this.flashsData);
    }
  },
  created: function created() {
    this.$store.watch(function (state, getters) {
      return getters.ready;
    }, function (newValue, oldValue) {// Manage translations.
    });
  },
  methods: {
    label: function label(type) {
      switch (type) {
        case 'errors':
          return "Error";
          break;

        case 'successes':
        case 'success':
          return "Success";
          break;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Header/Breadcrumb.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Content/Header/Breadcrumb.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../store/store */ "./resources/js/store/store.js");
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  store: _store_store__WEBPACK_IMPORTED_MODULE_0__["default"],
  props: ['breadcrumbData'],
  data: function data() {
    return {};
  },
  computed: {
    breadcrumb: function breadcrumb() {
      return this.breadcrumbData;
    },
    counter: function counter() {
      return this.breadcrumb.length;
    }
  },
  created: function created() {
    this.$store.watch(function (state, getters) {
      return getters.ready;
    }, function (newValue, oldValue) {// Manage translations.
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Header/ContentHeader.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Content/Header/ContentHeader.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Breadcrumb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Breadcrumb */ "./resources/js/components/Content/Header/Breadcrumb.vue");
/* harmony import */ var _ContentHeaderButtons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContentHeaderButtons */ "./resources/js/components/Content/Header/ContentHeaderButtons.vue");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/store */ "./resources/js/store/store.js");
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    ContentHeaderButtons: _ContentHeaderButtons__WEBPACK_IMPORTED_MODULE_1__["default"],
    Breadcrumb: _Breadcrumb__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  store: _store_store__WEBPACK_IMPORTED_MODULE_2__["default"],
  props: ['headerData'],
  data: function data() {
    return {};
  },
  computed: {
    header: function header() {
      return JSON.parse(this.headerData);
    },
    title: function title() {
      return this.header.title;
    },
    subtitle: function subtitle() {
      return this.header.subtitle;
    },
    description: function description() {
      return this.header.description;
    },
    breadcrumb: function breadcrumb() {
      return this.header.breadcrumb;
    },
    buttons: function buttons() {
      return this.header.buttons;
    },
    theme: function theme() {
      return this.header.theme;
    }
  },
  created: function created() {
    this.$store.watch(function (state, getters) {
      return getters.ready;
    }, function (newValue, oldValue) {// Manage translations.
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Header/ContentHeaderButtons.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Content/Header/ContentHeaderButtons.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../store/store */ "./resources/js/store/store.js");
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  store: _store_store__WEBPACK_IMPORTED_MODULE_0__["default"],
  props: ['buttonsData'],
  data: function data() {
    return {};
  },
  computed: {
    buttons: function buttons() {
      return this.buttonsData;
    }
  },
  created: function created() {
    this.$store.watch(function (state, getters) {
      return getters.ready;
    }, function (newValue, oldValue) {// Manage translations.
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Footer/BaseFooter.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Footer/BaseFooter.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/store */ "./resources/js/store/store.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  store: _store_store__WEBPACK_IMPORTED_MODULE_0__["default"],
  props: [],
  data: function data() {
    return {
      neededTranslations: {
        "app_contact": "Contact",
        "common_privacy_policy": "Privacy policy"
      }
    };
  },
  computed: {},
  created: function created() {
    var _this = this;

    this.$store.watch(function (state, getters) {
      return getters.ready;
    }, function (newValue, oldValue) {
      _this.neededTranslations.app_contact = _this.$store.getters.translationByKey('app_contact');
      _this.neededTranslations.common_privacy_policy = _this.$store.getters.translationByKey('common_privacy_policy');
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Form/CompositeTestCreate.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Form/CompositeTestCreate.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/store */ "./resources/js/store/store.js");
/* harmony import */ var vue_multiselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-multiselect */ "./node_modules/vue-multiselect/dist/vue-multiselect.min.js");
/* harmony import */ var vue_multiselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_multiselect__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  store: _store_store__WEBPACK_IMPORTED_MODULE_0__["default"],
  components: {
    Multiselect: vue_multiselect__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  props: ['exercises'],
  data: function data() {
    return {
      csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      values: {
        name: '',
        version: '',
        visibility: 0,
        readingDuration: 0,
        exercises: []
      },
      neededTranslations: {
        "common_name": "Name",
        "common_version": "Version",
        "common_visibility": "Visibility",
        "common_visibility_explanation": "1 for public, 0 for private.",
        "common_reading_duration": "Reading duration",
        "composite_tests_composition": "Composition du composite test",
        "composite_tests_composition_explanation": "The listening exercises must all be added before the reading exercises. The timer will start with the audio files when a students starts a test."
      }
    };
  },
  computed: {
    options: function options() {
      var obj = [];
      JSON.parse(this.exercises).forEach(function (el) {
        obj.push({
          id: el.id,
          name: el.name
        });
      });
      console.log(obj);
      return obj;
    }
  },
  created: function created() {
    var _this = this;

    this.$store.watch(function (state, getters) {
      return getters.ready;
    }, function (newValue, oldValue) {
      _this.neededTranslations.common_name = _this.$store.getters.translationByKey('common_name');
      _this.neededTranslations.common_version = _this.$store.getters.translationByKey('common_version');
      _this.neededTranslations.common_visibility = _this.$store.getters.translationByKey('common_visibility');
      _this.neededTranslations.common_visibility_explanation = _this.$store.getters.translationByKey('common_visibility_explanation');
      _this.neededTranslations.common_reading_duration = _this.$store.getters.translationByKey('common_reading_duration');
      _this.neededTranslations.composite_tests_composition = _this.$store.getters.translationByKey('composite_tests_composition');
      _this.neededTranslations.composite_tests_composition_explanation = _this.$store.getters.translationByKey('composite_tests_composition_explanation');
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Header/BaseHeader.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Header/BaseHeader.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_country_flag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-country-flag */ "./node_modules/vue-country-flag/dist/country-flag.esm.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/store */ "./resources/js/store/store.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  store: _store_store__WEBPACK_IMPORTED_MODULE_1__["default"],
  components: {
    CountryFlag: vue_country_flag__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: ['currentUserData', 'activeTrailData', 'lang'],
  data: function data() {
    return {
      'isOpened': null,
      'isActive': null,
      neededTranslations: {
        "common_student": "Student",
        "common_teacher": "Teacher",
        "common_admin": "Admin",
        "users_manage": "Manage users",
        "exercises_manage": "Manage exercises",
        "app_see_results": "Show results",
        "common_login": "Login",
        "common_logout": "Logout",
        "app_profile": "Profile",
        "users_list": "Users list",
        "students_list": "Students list",
        "groups_list": "Groups list",
        "lessons_list": "Lessons list",
        "messages_list": "Messages list",
        "exercises_list": "Exercises list",
        "composite_tests_list": "Composite tests list",
        "parts_list": "Parts list",
        "questions_list": "Questions list",
        "documents_list": "Documents list",
        "explanations_list": "Explanations list",
        "exercises_results": "Exercises results",
        // @TODO : change wording.
        "composite_tests_results": "Composite tests results",
        // @TODO : change wording.
        "games_results": "Challenges results",
        // @TODO : change wording.
        "app_exercises": "Exercises",
        "app_composite_tests": "Composite tests",
        "app_games": "Challenges"
      }
    };
  },
  created: function created() {
    var _this = this;

    this.$store.watch(function (state, getters) {
      return getters.ready;
    }, function (newValue, oldValue) {
      // Manage translations.
      _this.neededTranslations.common_student = _this.$store.getters.translationByKey('common_student');
      _this.neededTranslations.common_teacher = _this.$store.getters.translationByKey('common_teacher');
      _this.neededTranslations.common_admin = _this.$store.getters.translationByKey('common_admin');
      _this.neededTranslations.exercises_manage = _this.$store.getters.translationByKey('exercises_manage');
      _this.neededTranslations.users_manage = _this.$store.getters.translationByKey('users_manage');
      _this.neededTranslations.app_see_results = _this.$store.getters.translationByKey('app_see_results');
      _this.neededTranslations.users_list = _this.$store.getters.translationByKey('users_list');
      _this.neededTranslations.students_list = _this.$store.getters.translationByKey('students_list');
      _this.neededTranslations.groups_list = _this.$store.getters.translationByKey('groups_list');
      _this.neededTranslations.lessons_list = _this.$store.getters.translationByKey('lessons_list');
      _this.neededTranslations.messages_list = _this.$store.getters.translationByKey('messages_list');
      _this.neededTranslations.exercises_list = _this.$store.getters.translationByKey('exercises_list');
      _this.neededTranslations.composite_tests_list = _this.$store.getters.translationByKey('composite_tests_list');
      _this.neededTranslations.parts_list = _this.$store.getters.translationByKey('parts_list');
      _this.neededTranslations.questions_list = _this.$store.getters.translationByKey('questions_list');
      _this.neededTranslations.documents_list = _this.$store.getters.translationByKey('documents_list');
      _this.neededTranslations.explanations_list = _this.$store.getters.translationByKey('explanations_list');
      _this.neededTranslations.exercises_results = _this.$store.getters.translationByKey('exercises_results');
      _this.neededTranslations.composite_tests_results = _this.$store.getters.translationByKey('composite_tests_results');
      _this.neededTranslations.games_results = _this.$store.getters.translationByKey('games_results');
      _this.neededTranslations.games_results = _this.$store.getters.translationByKey('app_exercises');
      _this.neededTranslations.games_results = _this.$store.getters.translationByKey('app_composite_tests');
      _this.neededTranslations.games_results = _this.$store.getters.translationByKey('app_games');
    });
  },
  beforeMount: function beforeMount() {
    if (this.currentUser) {
      this.$store.commit('setLang', this.lang);
      this.$store.commit('setCurrentUser', this.currentUser);
      this.$store.commit('setApiToken', this.currentUser.api_token);
      this.$store.commit('setActiveTrail', this.activeTrailData);
      this.$store.dispatch('loadTranslations');
    }
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapState"])(['ready']), {
    currentUser: function currentUser() {
      return JSON.parse(this.currentUserData);
    }
  }),
  methods: {
    toggleSubmenu: function toggleSubmenu(id) {
      if (id === null) {
        if (this.isOpened !== null) {
          document.getElementById(this.isOpened).classList.remove('opened');
          document.getElementById(this.isOpened).previousElementSibling.classList.toggle('submenu-opened');
          document.getElementById(id).parentElement.classList.toggle('submenu-opened');
        }

        this.isOpened = null;
      } else {
        if (this.isOpened === id) {
          this.isOpened = null;
        } else {
          if (this.isOpened !== null) {
            document.getElementById(this.isOpened).classList.remove('opened');
            document.getElementById(this.isOpened).previousElementSibling.classList.toggle('submenu-opened');
            document.getElementById(id).parentElement.classList.toggle('submenu-opened');
          }

          this.isOpened = id;
        }

        document.getElementById(id).classList.toggle('opened');
        document.getElementById(id).previousElementSibling.classList.toggle('submenu-opened');
        document.getElementById(id).parentElement.classList.toggle('submenu-opened');
      }
    },
    closeSubmenu: function closeSubmenu() {
      if (this.isOpened !== null) {
        document.getElementById(this.isOpened).classList.remove('opened');
        document.getElementById(this.isOpened).previousElementSibling.classList.remove('submenu-opened');
        document.getElementById(this.isOpened).parentElement.classList.remove('submenu-opened');
        this.isOpened = null;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Pages/LoginPage.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Pages/LoginPage.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/store */ "./resources/js/store/store.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  store: _store_store__WEBPACK_IMPORTED_MODULE_0__["default"],
  props: ['background', 'errors'],
  data: function data() {
    return {
      csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      neededTranslations: {
        "common_login": "Login",
        "common_email": "E-mail",
        "common_password": "Password",
        "common_error": "Error",
        "common_forgot_password": "Forgot your password?"
      }
    };
  },
  computed: {
    loginClasses: function loginClasses() {
      var data = JSON.parse(this.background);
      return data.type + ' login';
    },
    cssVars: function cssVars() {
      var data = JSON.parse(this.background);
      return {
        '--bg-image': 'url(\'/storage/' + data.url + '\')',
        '--color': data.color
      };
    },
    hasErrors: function hasErrors() {
      var errors = JSON.parse(this.errors);

      if (errors.length > 0) {
        return true;
      }

      return false;
    }
  },
  created: function created() {
    var _this = this;

    this.$store.watch(function (state, getters) {
      return getters.ready;
    }, function (newValue, oldValue) {
      _this.neededTranslations.common_login = _this.$store.getters.translationByKey('common_login');
      _this.neededTranslations.common_email = _this.$store.getters.translationByKey('common_email');
      _this.neededTranslations.common_password = _this.$store.getters.translationByKey('common_password');
      _this.neededTranslations.common_error = _this.$store.getters.translationByKey('common_error');
      _this.neededTranslations.common_forgot_password = _this.$store.getters.translationByKey('common_forgot_password');
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Paginations/BasePagination.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Paginations/BasePagination.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['currentPage', 'pagesNumber'],
  computed: {
    pagination: function pagination() {
      var paginationObject = {};
      paginationObject.first = 1;
      paginationObject.last = this.pagesNumber;
      paginationObject.current = this.currentPage;

      if (this.pagesNumber < 6) {
        paginationObject.type = 'full';
        paginationObject.second = false;
        paginationObject.beforeLast = false;
        paginationObject.hiddenFirst = false;
        paginationObject.hiddenSecond = false;
        paginationObject.hiddenCentered = false;
        paginationObject.middle = false;
      } else if (this.currentPage < 3 || this.currentPage > this.pagesNumber - 2) {
        paginationObject.type = 'partial';
        paginationObject.second = true;
        paginationObject.beforeLast = true;
        paginationObject.hiddenFirst = false;
        paginationObject.hiddenSecond = false;
        paginationObject.hiddenCentered = true;
        paginationObject.middle = false;
      } else {
        paginationObject.type = 'partial';
        paginationObject.hiddenFirst = true;
        paginationObject.hiddenSecond = true;

        if (this.currentPage == 3) {
          // 3 = 1 + 2
          paginationObject.hiddenFirst = false;
        }

        if (this.currentPage == this.pagesNumber - 2) {
          paginationObject.hiddenSecond = false;
        }

        paginationObject.second = false;
        paginationObject.beforeLast = false;
        paginationObject.hiddenCentered = false;
        paginationObject.middle = true;
      }

      return paginationObject;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tables/BaseTable.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Tables/BaseTable.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Paginations_BasePagination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Paginations/BasePagination */ "./resources/js/components/Paginations/BasePagination.vue");
/* harmony import */ var _BaseTableActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseTableActions */ "./resources/js/components/Tables/BaseTableActions.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/store */ "./resources/js/store/store.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    BasePagination: _Paginations_BasePagination__WEBPACK_IMPORTED_MODULE_0__["default"],
    BaseTableActions: _BaseTableActions__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  store: _store_store__WEBPACK_IMPORTED_MODULE_3__["default"],
  // Enable store in component.
  props: ['currentUserData', 'currentPageData'],
  data: function data() {
    return {
      users: [],
      usersNb: 0,
      pagesNumber: 1,
      currentPage: 1,
      userActionsData: null,
      refreshActions: 0,
      search: "",
      sorts: [{
        'name': 'name',
        'active': false,
        'type': 'desc'
      }],
      neededTranslations: {
        "users_list": "Users list",
        "common_search": "Search",
        "common_name": "Name",
        "common_email": "E-mail",
        "common_matricule": "Matricule",
        "common_role": "Role",
        "common_actions": "Actions",
        "common_no_result": "No result."
      }
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_4__["mapState"])(['ready']), {
    currentUser: function currentUser() {
      return JSON.parse(this.currentUserData);
    }
  }),
  created: function created() {
    var _this = this;

    this.$store.watch(function (state, getters) {
      return getters.ready;
    }, function (newValue, oldValue) {
      _this.neededTranslations.users_list = _this.$store.getters.translationByKey('users_list');
      _this.neededTranslations.common_search = _this.$store.getters.translationByKey('common_search');
      _this.neededTranslations.common_name = _this.$store.getters.translationByKey('common_name');
      _this.neededTranslations.common_email = _this.$store.getters.translationByKey('common_email');
      _this.neededTranslations.common_matricule = _this.$store.getters.translationByKey('common_matricule');
      _this.neededTranslations.common_role = _this.$store.getters.translationByKey('common_role');
      _this.neededTranslations.common_actions = _this.$store.getters.translationByKey('common_actions');
      _this.neededTranslations.common_no_result = _this.$store.getters.translationByKey('common_no_result');
    });
  },
  beforeMount: function beforeMount() {
    this.currentPage = parseInt(this.currentPageData);
    this.list();
    this.$store.commit('setApiToken', this.currentUser.api_token);
    this.$store.dispatch('loadTranslations');
  },
  methods: {
    list: function list() {
      var GETParams = this.getGETParameters();

      if (GETParams.search !== 'undefined') {
        this.search = GETParams.search;
      }

      this.reloadUsers();
      var url = window.location.href.replace(/\/$/, "");
      var lastParam = url.substring(url.lastIndexOf("/") + 1, url.length);

      if (parseInt(lastParam) !== this.currentPage) {
        window.history.pushState("", "", url + '/' + this.currentPage);
      }
    },
    changePage: function changePage(page) {
      if (this.currentPage !== page) {
        this.currentPage = page;
        this.buildUrl();
      }
    },
    userActions: function userActions(user) {
      if (this.userActionsData == user) {
        this.refreshActions++;
      } else {
        this.userActionsData = user;
      }
    },
    reloadUsers: function reloadUsers() {
      var _this2 = this;

      var get_url = "";
      var gets = [];

      if (this.search !== '' && this.search !== undefined) {
        gets.push({
          'search': this.search
        });
      }

      this.sorts.forEach(function (el) {
        if (el.active) {
          gets.push({
            'sortBy': el.name
          });
          gets.push({
            'orderBy': el.type
          });
        }
      });

      if (gets.length !== 0) {
        gets.forEach(function (el) {
          get_url += Object.keys(el)[0] + "=" + Object.values(el)[0] + "&";
        });
      }

      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/api/users/' + this.currentPage + '?api_token=' + this.$store.state.apiToken + '&' + get_url).then(function (response) {
        return _this2.users = response.data.users, _this2.usersNb = response.data.users_nb, _this2.pagesNumber = Math.ceil(response.data.users_nb / 30);
      });
    },
    searchUsers: function searchUsers() {
      this.buildUrl();
    },
    sortBy: function sortBy(filter) {
      this.sorts.forEach(function (el) {
        if (el.name === filter) {
          el.active = true;
          el.type = el.type == 'asc' ? 'desc' : 'asc';
        } else {
          el.active = false;
        }
      });
      this.buildUrl();
    },
    buildUrl: function buildUrl() {
      var url = window.location.href.replace(/\/$/, "");
      var base_url = url.substring(0, url.lastIndexOf("/"));
      var gets = [];
      base_url += '/' + this.currentPage;

      if (this.search !== '' && this.search !== undefined) {
        gets.push({
          'search': this.search
        });
      }

      this.sorts.forEach(function (el) {
        if (el.active) {
          gets.push({
            'sortBy': el.name
          });
          gets.push({
            'orderBy': el.type
          });
        }
      });

      if (gets.length !== 0) {
        base_url = base_url + "?";
        gets.forEach(function (el) {
          base_url += Object.keys(el)[0] + "=" + Object.values(el)[0] + "&";
        });
      }

      window.history.pushState("", "", base_url);
      this.reloadUsers(gets);
    },
    getGETParameters: function getGETParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? this.transformToAssocArray(prmstr) : {};
    },
    transformToAssocArray: function transformToAssocArray(prmstr) {
      var params = {};
      var prmarr = prmstr.split("&");

      for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
      }

      return params;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tables/BaseTableActions.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Tables/BaseTableActions.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/store */ "./resources/js/store/store.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  store: _store_store__WEBPACK_IMPORTED_MODULE_0__["default"],
  props: ['user', 'refresh'],
  data: function data() {
    return {
      displayed: false,
      isStudent: false,
      neededTranslations: {
        "common_actions": "Actions",
        "users_show": "User show",
        "users_edit": "User edit",
        "users_delete": "User delete",
        "common_close": "Close"
      }
    };
  },
  computed: {
    baseUrl: function baseUrl() {
      return window.location.origin;
    }
  },
  watch: {
    user: function user(_user) {
      if (_user) {
        this.isStudent = false;

        if (_user.roles.length === 1 && _user.roles[0].name === 'student') {
          this.isStudent = true;
        }

        this.displayActions();
      }
    },
    refresh: function refresh() {
      this.displayActions();
    }
  },
  created: function created() {
    var _this = this;

    this.$store.watch(function (state, getters) {
      return getters.ready;
    }, function (newValue, oldValue) {
      _this.neededTranslations.common_actions = _this.$store.getters.translationByKey('common_actions');
      _this.neededTranslations.users_show = _this.$store.getters.translationByKey('users_show');
      _this.neededTranslations.users_edit = _this.$store.getters.translationByKey('users_edit');
      _this.neededTranslations.users_delete = _this.$store.getters.translationByKey('users_delete');
      _this.neededTranslations.common_close = _this.$store.getters.translationByKey('common_close');
    });
  },
  methods: {
    hideActions: function hideActions() {
      this.displayed = false;
    },
    displayActions: function displayActions() {
      this.displayed = true;

      if (document.getElementById('actions--btn-close')) {
        document.getElementById('actions--btn-close').focus();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Form/CompositeTestCreate.vue?vue&type=style&index=1&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Form/CompositeTestCreate.vue?vue&type=style&index=1&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\nform {\n    -webkit-box-flex: 1;\n            flex-grow: 1;\n}\n.multiselect__tag {\n    background: #66a810;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Header/BaseHeader.vue?vue&type=style&index=0&id=ca495a76&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Header/BaseHeader.vue?vue&type=style&index=0&id=ca495a76&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.main-header[data-v-ca495a76] {\n    position: relative;\n}\n.header--menu-item[data-v-ca495a76] {\n    position: relative;\n    width: 100%;\n    text-align: center;\n}\n.header--menu-item button[data-v-ca495a76] {\n    padding: .5rem 0;\n}\n.submenu[data-v-ca495a76] {\n    display: none;\n}\n.submenu.opened[data-v-ca495a76] {\n    display: block;\n    position: initial;\n    width: 100%;\n    z-index: 1;\n    text-align: left;\n}\n.submenu--item[data-v-ca495a76] {\n    display: block;\n    margin: 0;\n    padding: 0;\n}\n.submenu--item a[data-v-ca495a76] {\n    display: block;\n    padding: .75rem 1rem;\n    color: #fff;\n    font-size: .8rem;\n}\n@media screen and (min-width: 1020px) {\n.header--menu-item[data-v-ca495a76] {\n        padding: 0;\n        border: 0;\n        width: 14rem;\n}\n.header--menu-item button[data-v-ca495a76] {\n        padding: 0;\n}\n.submenu.opened[data-v-ca495a76] {\n        position: absolute;\n        top: 3rem;\n        width: 14rem;\n}\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Pages/LoginPage.vue?vue&type=style&index=0&id=ce00b25c&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Pages/LoginPage.vue?vue&type=style&index=0&id=ce00b25c&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\nmain[data-v-ce00b25c] {\n    color: var(--color);\n    background-image: var(--bg-image);\n    background-size: cover;\n}\nmain *[data-v-ce00b25c] {\n    font-family: 'Montserrat' !important;\n}\n.container[data-v-ce00b25c] {\n    background: none;\n}\n@media screen and (min-width: 1020px) {\n.login.right[data-v-ce00b25c] {\n        -webkit-box-pack: end;\n                justify-content: flex-end;\n}\n.login.left[data-v-ce00b25c] {\n        -webkit-box-pack: start;\n                justify-content: flex-start;\n}\n.login.center[data-v-ce00b25c] {\n        -webkit-box-pack: center;\n                justify-content: center;\n}\n}\n.login .form-container[data-v-ce00b25c] {\n    border-color: var(--color);\n}\n.field-container label[data-v-ce00b25c],\n.field-container input[data-v-ce00b25c],\n.field-container select[data-v-ce00b25c],\n.field-container textarea[data-v-ce00b25c] {\n    color: var(--color);\n}\n.btn[data-v-ce00b25c] {\n    background-color: var(--color);\n}\n.btn[data-v-ce00b25c]:hover {\n    -webkit-filter: brightness(85%);\n            filter: brightness(85%);\n}\na[data-v-ce00b25c] {\n    color: var(--color);\n}\na[data-v-ce00b25c]:hover {\n    -webkit-filter: brightness(85%);\n            filter: brightness(85%);\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "fieldset[disabled] .multiselect{pointer-events:none}.multiselect__spinner{position:absolute;right:1px;top:1px;width:48px;height:35px;background:#fff;display:block}.multiselect__spinner:after,.multiselect__spinner:before{position:absolute;content:\"\";top:50%;left:50%;margin:-8px 0 0 -8px;width:16px;height:16px;border-radius:100%;border:2px solid transparent;border-top-color:#41b883;box-shadow:0 0 0 1px transparent}.multiselect__spinner:before{-webkit-animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.multiselect__spinner:after{-webkit-animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.multiselect__loading-enter-active,.multiselect__loading-leave-active{-webkit-transition:opacity .4s ease-in-out;transition:opacity .4s ease-in-out;opacity:1}.multiselect__loading-enter,.multiselect__loading-leave-active{opacity:0}.multiselect,.multiselect__input,.multiselect__single{font-family:inherit;font-size:16px;touch-action:manipulation}.multiselect{box-sizing:content-box;display:block;position:relative;width:100%;min-height:40px;text-align:left;color:#35495e}.multiselect *{box-sizing:border-box}.multiselect:focus{outline:none}.multiselect--disabled{background:#ededed;pointer-events:none;opacity:.6}.multiselect--active{z-index:50}.multiselect--active:not(.multiselect--above) .multiselect__current,.multiselect--active:not(.multiselect--above) .multiselect__input,.multiselect--active:not(.multiselect--above) .multiselect__tags{border-bottom-left-radius:0;border-bottom-right-radius:0}.multiselect--active .multiselect__select{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.multiselect--above.multiselect--active .multiselect__current,.multiselect--above.multiselect--active .multiselect__input,.multiselect--above.multiselect--active .multiselect__tags{border-top-left-radius:0;border-top-right-radius:0}.multiselect__input,.multiselect__single{position:relative;display:inline-block;min-height:20px;line-height:20px;border:none;border-radius:5px;background:#fff;padding:0 0 0 5px;width:100%;-webkit-transition:border .1s ease;transition:border .1s ease;box-sizing:border-box;margin-bottom:8px;vertical-align:top}.multiselect__input:-ms-input-placeholder{color:#35495e}.multiselect__input::-webkit-input-placeholder{color:#35495e}.multiselect__input::-moz-placeholder{color:#35495e}.multiselect__input::-ms-input-placeholder{color:#35495e}.multiselect__input::placeholder{color:#35495e}.multiselect__tag~.multiselect__input,.multiselect__tag~.multiselect__single{width:auto}.multiselect__input:hover,.multiselect__single:hover{border-color:#cfcfcf}.multiselect__input:focus,.multiselect__single:focus{border-color:#a8a8a8;outline:none}.multiselect__single{padding-left:5px;margin-bottom:8px}.multiselect__tags-wrap{display:inline}.multiselect__tags{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:5px;border:1px solid #e8e8e8;background:#fff;font-size:14px}.multiselect__tag{position:relative;display:inline-block;padding:4px 26px 4px 10px;border-radius:5px;margin-right:10px;color:#fff;line-height:1;background:#41b883;margin-bottom:5px;white-space:nowrap;overflow:hidden;max-width:100%;text-overflow:ellipsis}.multiselect__tag-icon{cursor:pointer;margin-left:7px;position:absolute;right:0;top:0;bottom:0;font-weight:700;font-style:normal;width:22px;text-align:center;line-height:22px;-webkit-transition:all .2s ease;transition:all .2s ease;border-radius:5px}.multiselect__tag-icon:after{content:\"\\D7\";color:#266d4d;font-size:14px}.multiselect__tag-icon:focus,.multiselect__tag-icon:hover{background:#369a6e}.multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after{color:#fff}.multiselect__current{min-height:40px;overflow:hidden;padding:8px 30px 0 12px;white-space:nowrap;border-radius:5px;border:1px solid #e8e8e8}.multiselect__current,.multiselect__select{line-height:16px;box-sizing:border-box;display:block;margin:0;text-decoration:none;cursor:pointer}.multiselect__select{position:absolute;width:40px;height:38px;right:1px;top:1px;padding:4px 8px;text-align:center;-webkit-transition:-webkit-transform .2s ease;transition:-webkit-transform .2s ease;transition:transform .2s ease;transition:transform .2s ease, -webkit-transform .2s ease}.multiselect__select:before{position:relative;right:0;top:65%;color:#999;margin-top:4px;border-color:#999 transparent transparent;border-style:solid;border-width:5px 5px 0;content:\"\"}.multiselect__placeholder{color:#adadad;display:inline-block;margin-bottom:10px;padding-top:2px}.multiselect--active .multiselect__placeholder{display:none}.multiselect__content-wrapper{position:absolute;display:block;background:#fff;width:100%;max-height:240px;overflow:auto;border:1px solid #e8e8e8;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;z-index:50;-webkit-overflow-scrolling:touch}.multiselect__content{list-style:none;display:inline-block;padding:0;margin:0;min-width:100%;vertical-align:top}.multiselect--above .multiselect__content-wrapper{bottom:100%;border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:none;border-top:1px solid #e8e8e8}.multiselect__content::webkit-scrollbar{display:none}.multiselect__element{display:block}.multiselect__option{display:block;padding:12px;min-height:40px;line-height:16px;text-decoration:none;text-transform:none;vertical-align:middle;position:relative;cursor:pointer;white-space:nowrap}.multiselect__option:after{top:0;right:0;position:absolute;line-height:40px;padding-right:12px;padding-left:20px;font-size:13px}.multiselect__option--highlight{background:#41b883;outline:none;color:#fff}.multiselect__option--highlight:after{content:attr(data-select);background:#41b883;color:#fff}.multiselect__option--selected{background:#f3f3f3;color:#35495e;font-weight:700}.multiselect__option--selected:after{content:attr(data-selected);color:silver}.multiselect__option--selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect--disabled .multiselect__current,.multiselect--disabled .multiselect__select{background:#ededed;color:#a6a6a6}.multiselect__option--disabled{background:#ededed!important;color:#a6a6a6!important;cursor:text;pointer-events:none}.multiselect__option--group{background:#ededed;color:#35495e}.multiselect__option--group.multiselect__option--highlight{background:#35495e;color:#fff}.multiselect__option--group.multiselect__option--highlight:after{background:#35495e}.multiselect__option--disabled.multiselect__option--highlight{background:#dedede}.multiselect__option--group-selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--group-selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect-enter-active,.multiselect-leave-active{-webkit-transition:all .15s ease;transition:all .15s ease}.multiselect-enter,.multiselect-leave-active{opacity:0}.multiselect__strong{margin-bottom:8px;line-height:20px;display:inline-block;vertical-align:top}[dir=rtl] .multiselect{text-align:right}[dir=rtl] .multiselect__select{right:auto;left:1px}[dir=rtl] .multiselect__tags{padding:8px 8px 0 40px}[dir=rtl] .multiselect__content{text-align:right}[dir=rtl] .multiselect__option:after{right:auto;left:0}[dir=rtl] .multiselect__clear{right:auto;left:12px}[dir=rtl] .multiselect__spinner{right:auto;left:1px}@-webkit-keyframes spinning{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(2turn);transform:rotate(2turn)}}@keyframes spinning{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(2turn);transform:rotate(2turn)}}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/es6-promise/auto.js":
/*!******************************************!*\
  !*** ./node_modules/es6-promise/auto.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// This file can be required in Browserify and Node.js for automatic polyfill
// To use it:  require('es6-promise/auto');

module.exports = __webpack_require__(/*! ./ */ "./node_modules/es6-promise/dist/es6-promise.js").polyfill();


/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Form/CompositeTestCreate.vue?vue&type=style&index=1&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Form/CompositeTestCreate.vue?vue&type=style&index=1&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./CompositeTestCreate.vue?vue&type=style&index=1&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Form/CompositeTestCreate.vue?vue&type=style&index=1&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Header/BaseHeader.vue?vue&type=style&index=0&id=ca495a76&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Header/BaseHeader.vue?vue&type=style&index=0&id=ca495a76&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./BaseHeader.vue?vue&type=style&index=0&id=ca495a76&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Header/BaseHeader.vue?vue&type=style&index=0&id=ca495a76&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Pages/LoginPage.vue?vue&type=style&index=0&id=ce00b25c&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Pages/LoginPage.vue?vue&type=style&index=0&id=ce00b25c&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./LoginPage.vue?vue&type=style&index=0&id=ce00b25c&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Pages/LoginPage.vue?vue&type=style&index=0&id=ce00b25c&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader??ref--6-1!../../vue-loader/lib/loaders/stylePostLoader.js!../../postcss-loader/src??ref--6-2!./vue-multiselect.min.css?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-country-flag/dist/country-flag.esm.js":
/*!****************************************************************!*\
  !*** ./node_modules/vue-country-flag/dist/country-flag.esm.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {!function(A,g){void 0===g&&(g={});var n=g.insertAt;if(A&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],B=document.createElement("style");B.type="text/css","top"===n&&r.firstChild?r.insertBefore(B,r.firstChild):r.appendChild(B),B.styleSheet?B.styleSheet.cssText=A:B.appendChild(document.createTextNode(A))}}(".flag {\r\n    display: inline-block;\r\n    width: 64px;\r\n    height: 64px;\r\n    background: url(data:image/png;base64,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) no-repeat\r\n}\r\n\r\n.flag-and,\r\n.flag.flag-ad {\r\n    background-position: -64px 0\r\n}\r\n\r\n.flag-are,\r\n.flag.flag-ae {\r\n    background-position: -128px 0\r\n}\r\n\r\n.flag-afg,\r\n.flag.flag-af {\r\n    background-position: -192px 0\r\n}\r\n\r\n.flag-atg,\r\n.flag.flag-ag {\r\n    background-position: -256px 0\r\n}\r\n\r\n.flag-aia,\r\n.flag.flag-ai {\r\n    background-position: -320px 0\r\n}\r\n\r\n.flag-alb,\r\n.flag.flag-al {\r\n    background-position: -384px 0\r\n}\r\n\r\n.flag-arm,\r\n.flag.flag-am {\r\n    background-position: -448px 0\r\n}\r\n\r\n.flag-ant,\r\n.flag.flag-an {\r\n    background-position: -512px 0\r\n}\r\n\r\n.flag-ago,\r\n.flag.flag-ao {\r\n    background-position: -576px 0\r\n}\r\n\r\n.flag-arg,\r\n.flag.flag-ar {\r\n    background-position: -640px 0\r\n}\r\n\r\n.flag-asm,\r\n.flag.flag-as {\r\n    background-position: -704px 0\r\n}\r\n\r\n.flag-aut,\r\n.flag.flag-at {\r\n    background-position: -768px 0\r\n}\r\n\r\n.flag-aus,\r\n.flag.flag-au {\r\n    background-position: -832px 0\r\n}\r\n\r\n.flag-abw,\r\n.flag.flag-aw {\r\n    background-position: -896px 0\r\n}\r\n\r\n.flag-ala,\r\n.flag.flag-ax {\r\n    background-position: -960px 0\r\n}\r\n\r\n.flag-aze,\r\n.flag.flag-az {\r\n    background-position: 0 -64px\r\n}\r\n\r\n.flag-bih,\r\n.flag.flag-ba {\r\n    background-position: -64px -64px\r\n}\r\n\r\n.flag-brb,\r\n.flag.flag-bb {\r\n    background-position: -128px -64px\r\n}\r\n\r\n.flag-bgd,\r\n.flag.flag-bd {\r\n    background-position: -192px -64px\r\n}\r\n\r\n.flag-bel,\r\n.flag.flag-be {\r\n    background-position: -256px -64px\r\n}\r\n\r\n.flag-bfa,\r\n.flag.flag-bf {\r\n    background-position: -320px -64px\r\n}\r\n\r\n.flag-bgr,\r\n.flag.flag-bg {\r\n    background-position: -384px -64px\r\n}\r\n\r\n.flag-bhr,\r\n.flag.flag-bh {\r\n    background-position: -448px -64px\r\n}\r\n\r\n.flag-bdi,\r\n.flag.flag-bi {\r\n    background-position: -512px -64px\r\n}\r\n\r\n.flag-ben,\r\n.flag.flag-bj {\r\n    background-position: -576px -64px\r\n}\r\n\r\n.flag-blm,\r\n.flag.flag-bl {\r\n    background-position: -640px -64px\r\n}\r\n\r\n.flag-bmu,\r\n.flag.flag-bm {\r\n    background-position: -704px -64px\r\n}\r\n\r\n.flag-brn,\r\n.flag.flag-bn {\r\n    background-position: -768px -64px\r\n}\r\n\r\n.flag-bol,\r\n.flag.flag-bo {\r\n    background-position: -832px -64px\r\n}\r\n\r\n.flag-bra,\r\n.flag.flag-br {\r\n    background-position: -896px -64px\r\n}\r\n\r\n.flag-bhs,\r\n.flag.flag-bs {\r\n    background-position: -960px -64px\r\n}\r\n\r\n.flag-btn,\r\n.flag.flag-bt {\r\n    background-position: 0 -128px\r\n}\r\n\r\n.flag-bwa,\r\n.flag.flag-bw {\r\n    background-position: -64px -128px\r\n}\r\n\r\n.flag-blr,\r\n.flag.flag-by {\r\n    background-position: -128px -128px\r\n}\r\n\r\n.flag-blz,\r\n.flag.flag-bz {\r\n    background-position: -192px -128px\r\n}\r\n\r\n.flag-can,\r\n.flag.flag-ca {\r\n    background-position: -256px -128px\r\n}\r\n\r\n.flag-cod,\r\n.flag.flag-cd {\r\n    background-position: -320px -128px\r\n}\r\n\r\n.flag-caf,\r\n.flag.flag-cf {\r\n    background-position: -384px -128px\r\n}\r\n\r\n.flag-cog,\r\n.flag.flag-cg {\r\n    background-position: -448px -128px\r\n}\r\n\r\n.flag-che,\r\n.flag.flag-ch {\r\n    background-position: -512px -128px\r\n}\r\n\r\n.flag-civ,\r\n.flag.flag-ci {\r\n    background-position: -576px -128px\r\n}\r\n\r\n.flag-cok,\r\n.flag.flag-ck {\r\n    background-position: -640px -128px\r\n}\r\n\r\n.flag-chl,\r\n.flag.flag-cl {\r\n    background-position: -704px -128px\r\n}\r\n\r\n.flag-cmr,\r\n.flag.flag-cm {\r\n    background-position: -768px -128px\r\n}\r\n\r\n.flag-chn,\r\n.flag.flag-cn {\r\n    background-position: -832px -128px\r\n}\r\n\r\n.flag-col,\r\n.flag.flag-co {\r\n    background-position: -896px -128px\r\n}\r\n\r\n.flag-cri,\r\n.flag.flag-cr {\r\n    background-position: -960px -128px\r\n}\r\n\r\n.flag-cub,\r\n.flag.flag-cu {\r\n    background-position: 0 -192px\r\n}\r\n\r\n.flag-cpv,\r\n.flag.flag-cv {\r\n    background-position: -64px -192px\r\n}\r\n\r\n.flag-cuw,\r\n.flag.flag-cw {\r\n    background-position: -128px -192px\r\n}\r\n\r\n.flag-cyp,\r\n.flag.flag-cy {\r\n    background-position: -192px -192px\r\n}\r\n\r\n.flag-cze,\r\n.flag.flag-cz {\r\n    background-position: -256px -192px\r\n}\r\n\r\n.flag-deu,\r\n.flag.flag-de {\r\n    background-position: -320px -192px\r\n}\r\n\r\n.flag-dji,\r\n.flag.flag-dj {\r\n    background-position: -384px -192px\r\n}\r\n\r\n.flag-dnk,\r\n.flag.flag-dk {\r\n    background-position: -448px -192px\r\n}\r\n\r\n.flag-dma,\r\n.flag.flag-dm {\r\n    background-position: -512px -192px\r\n}\r\n\r\n.flag-dom,\r\n.flag.flag-do {\r\n    background-position: -576px -192px\r\n}\r\n\r\n.flag-dza,\r\n.flag.flag-dz {\r\n    background-position: -640px -192px\r\n}\r\n\r\n.flag-ecu,\r\n.flag.flag-ec {\r\n    background-position: -704px -192px\r\n}\r\n\r\n.flag-est,\r\n.flag.flag-ee {\r\n    background-position: -768px -192px\r\n}\r\n\r\n.flag-egy,\r\n.flag.flag-eg {\r\n    background-position: -832px -192px\r\n}\r\n\r\n.flag-esh,\r\n.flag.flag-eh {\r\n    background-position: -896px -192px\r\n}\r\n\r\n.flag-eri,\r\n.flag.flag-er {\r\n    background-position: -960px -192px\r\n}\r\n\r\n.flag-esp,\r\n.flag.flag-es {\r\n    background-position: 0 -256px\r\n}\r\n\r\n.flag-eth,\r\n.flag.flag-et {\r\n    background-position: -64px -256px\r\n}\r\n\r\n.flag.flag-eu {\r\n    background-position: -128px -256px\r\n}\r\n\r\n.flag-fin,\r\n.flag.flag-fi {\r\n    background-position: -192px -256px\r\n}\r\n\r\n.flag-fji,\r\n.flag.flag-fj {\r\n    background-position: -256px -256px\r\n}\r\n\r\n.flag-flk,\r\n.flag.flag-fk {\r\n    background-position: -320px -256px\r\n}\r\n\r\n.flag-fsm,\r\n.flag.flag-fm {\r\n    background-position: -384px -256px\r\n}\r\n\r\n.flag-fro,\r\n.flag.flag-fo {\r\n    background-position: -448px -256px\r\n}\r\n\r\n.flag-fra,\r\n.flag.flag-fr {\r\n    background-position: -512px -256px\r\n}\r\n\r\n.flag-gab,\r\n.flag.flag-ga {\r\n    background-position: -576px -256px\r\n}\r\n\r\n.flag-gbr,\r\n.flag.flag-gb {\r\n    background-position: -640px -256px\r\n}\r\n\r\n.flag-grd,\r\n.flag.flag-gd {\r\n    background-position: -704px -256px\r\n}\r\n\r\n.flag-geo,\r\n.flag.flag-ge {\r\n    background-position: -768px -256px\r\n}\r\n\r\n.flag-ggy,\r\n.flag.flag-gg {\r\n    background-position: -832px -256px\r\n}\r\n\r\n.flag-gha,\r\n.flag.flag-gh {\r\n    background-position: -896px -256px\r\n}\r\n\r\n.flag-gib,\r\n.flag.flag-gi {\r\n    background-position: -960px -256px\r\n}\r\n\r\n.flag-grl,\r\n.flag.flag-gl {\r\n    background-position: 0 -320px\r\n}\r\n\r\n.flag-gmb,\r\n.flag.flag-gm {\r\n    background-position: -64px -320px\r\n}\r\n\r\n.flag-gin,\r\n.flag.flag-gn {\r\n    background-position: -128px -320px\r\n}\r\n\r\n.flag-gnq,\r\n.flag.flag-gq {\r\n    background-position: -192px -320px\r\n}\r\n\r\n.flag-grc,\r\n.flag.flag-gr {\r\n    background-position: -256px -320px\r\n}\r\n\r\n.flag-sgs,\r\n.flag.flag-gs {\r\n    background-position: -320px -320px\r\n}\r\n\r\n.flag-gtm,\r\n.flag.flag-gt {\r\n    background-position: -384px -320px\r\n}\r\n\r\n.flag-gum,\r\n.flag.flag-gu {\r\n    background-position: -448px -320px\r\n}\r\n\r\n.flag-gnb,\r\n.flag.flag-gw {\r\n    background-position: -512px -320px\r\n}\r\n\r\n.flag-guy,\r\n.flag.flag-gy {\r\n    background-position: -576px -320px\r\n}\r\n\r\n.flag-hkg,\r\n.flag.flag-hk {\r\n    background-position: -640px -320px\r\n}\r\n\r\n.flag-hnd,\r\n.flag.flag-hn {\r\n    background-position: -704px -320px\r\n}\r\n\r\n.flag-hrv,\r\n.flag.flag-hr {\r\n    background-position: -768px -320px\r\n}\r\n\r\n.flag-hti,\r\n.flag.flag-ht {\r\n    background-position: -832px -320px\r\n}\r\n\r\n.flag-hun,\r\n.flag.flag-hu {\r\n    background-position: -896px -320px\r\n}\r\n\r\n.flag.flag-ic {\r\n    background-position: -960px -320px\r\n}\r\n\r\n.flag-idn,\r\n.flag.flag-id {\r\n    background-position: 0 -384px\r\n}\r\n\r\n.flag-irl,\r\n.flag.flag-ie {\r\n    background-position: -64px -384px\r\n}\r\n\r\n.flag-isr,\r\n.flag.flag-il {\r\n    background-position: -128px -384px\r\n}\r\n\r\n.flag-imn,\r\n.flag.flag-im {\r\n    background-position: -192px -384px\r\n}\r\n\r\n.flag-ind,\r\n.flag.flag-in {\r\n    background-position: -256px -384px\r\n}\r\n\r\n.flag-irq,\r\n.flag.flag-iq {\r\n    background-position: -320px -384px\r\n}\r\n\r\n.flag-irn,\r\n.flag.flag-ir {\r\n    background-position: -384px -384px\r\n}\r\n\r\n.flag-isl,\r\n.flag.flag-is {\r\n    background-position: -448px -384px\r\n}\r\n\r\n.flag-ita,\r\n.flag.flag-it {\r\n    background-position: -512px -384px\r\n}\r\n\r\n.flag-jey,\r\n.flag.flag-je {\r\n    background-position: -576px -384px\r\n}\r\n\r\n.flag-jam,\r\n.flag.flag-jm {\r\n    background-position: -640px -384px\r\n}\r\n\r\n.flag-jor,\r\n.flag.flag-jo {\r\n    background-position: -704px -384px\r\n}\r\n\r\n.flag-jpn,\r\n.flag.flag-jp {\r\n    background-position: -768px -384px\r\n}\r\n\r\n.flag-ken,\r\n.flag.flag-ke {\r\n    background-position: -832px -384px\r\n}\r\n\r\n.flag-kgz,\r\n.flag.flag-kg {\r\n    background-position: -896px -384px\r\n}\r\n\r\n.flag-khm,\r\n.flag.flag-kh {\r\n    background-position: -960px -384px\r\n}\r\n\r\n.flag-kir,\r\n.flag.flag-ki {\r\n    background-position: 0 -448px\r\n}\r\n\r\n.flag-com,\r\n.flag.flag-km {\r\n    background-position: -64px -448px\r\n}\r\n\r\n.flag-kna,\r\n.flag.flag-kn {\r\n    background-position: -128px -448px\r\n}\r\n\r\n.flag-prk,\r\n.flag.flag-kp {\r\n    background-position: -192px -448px\r\n}\r\n\r\n.flag-kor,\r\n.flag.flag-kr {\r\n    background-position: -256px -448px\r\n}\r\n\r\n.flag-kwt,\r\n.flag.flag-kw {\r\n    background-position: -320px -448px\r\n}\r\n\r\n.flag-cym,\r\n.flag.flag-ky {\r\n    background-position: -384px -448px\r\n}\r\n\r\n.flag-kaz,\r\n.flag.flag-kz {\r\n    background-position: -448px -448px\r\n}\r\n\r\n.flag-lao,\r\n.flag.flag-la {\r\n    background-position: -512px -448px\r\n}\r\n\r\n.flag-lbn,\r\n.flag.flag-lb {\r\n    background-position: -576px -448px\r\n}\r\n\r\n.flag-lca,\r\n.flag.flag-lc {\r\n    background-position: -640px -448px\r\n}\r\n\r\n.flag-lie,\r\n.flag.flag-li {\r\n    background-position: -704px -448px\r\n}\r\n\r\n.flag-lka,\r\n.flag.flag-lk {\r\n    background-position: -768px -448px\r\n}\r\n\r\n.flag-lbr,\r\n.flag.flag-lr {\r\n    background-position: -832px -448px\r\n}\r\n\r\n.flag-lso,\r\n.flag.flag-ls {\r\n    background-position: -896px -448px\r\n}\r\n\r\n.flag-ltu,\r\n.flag.flag-lt {\r\n    background-position: -960px -448px\r\n}\r\n\r\n.flag-lux,\r\n.flag.flag-lu {\r\n    background-position: 0 -512px\r\n}\r\n\r\n.flag-lva,\r\n.flag.flag-lv {\r\n    background-position: -64px -512px\r\n}\r\n\r\n.flag-lby,\r\n.flag.flag-ly {\r\n    background-position: -128px -512px\r\n}\r\n\r\n.flag-mar,\r\n.flag.flag-ma {\r\n    background-position: -192px -512px\r\n}\r\n\r\n.flag-mco,\r\n.flag.flag-mc {\r\n    background-position: -256px -512px\r\n}\r\n\r\n.flag-mda,\r\n.flag.flag-md {\r\n    background-position: -320px -512px\r\n}\r\n\r\n.flag-mne,\r\n.flag.flag-me {\r\n    background-position: -384px -512px\r\n}\r\n\r\n.flag-maf,\r\n.flag.flag-mf {\r\n    background-position: -448px -512px\r\n}\r\n\r\n.flag-mdg,\r\n.flag.flag-mg {\r\n    background-position: -512px -512px\r\n}\r\n\r\n.flag-mhl,\r\n.flag.flag-mh {\r\n    background-position: -576px -512px\r\n}\r\n\r\n.flag-mkd,\r\n.flag.flag-mk {\r\n    background-position: -640px -512px\r\n}\r\n\r\n.flag-mli,\r\n.flag.flag-ml {\r\n    background-position: -704px -512px\r\n}\r\n\r\n.flag-mmr,\r\n.flag.flag-mm {\r\n    background-position: -768px -512px\r\n}\r\n\r\n.flag-mng,\r\n.flag.flag-mn {\r\n    background-position: -832px -512px\r\n}\r\n\r\n.flag-mac,\r\n.flag.flag-mo {\r\n    background-position: -896px -512px\r\n}\r\n\r\n.flag-mnp,\r\n.flag.flag-mp {\r\n    background-position: -960px -512px\r\n}\r\n\r\n.flag-mtq,\r\n.flag.flag-mq {\r\n    background-position: 0 -576px\r\n}\r\n\r\n.flag-mrt,\r\n.flag.flag-mr {\r\n    background-position: -64px -576px\r\n}\r\n\r\n.flag-msr,\r\n.flag.flag-ms {\r\n    background-position: -128px -576px\r\n}\r\n\r\n.flag-mlt,\r\n.flag.flag-mt {\r\n    background-position: -192px -576px\r\n}\r\n\r\n.flag-mus,\r\n.flag.flag-mu {\r\n    background-position: -256px -576px\r\n}\r\n\r\n.flag-mdv,\r\n.flag.flag-mv {\r\n    background-position: -320px -576px\r\n}\r\n\r\n.flag-mwi,\r\n.flag.flag-mw {\r\n    background-position: -384px -576px\r\n}\r\n\r\n.flag-mex,\r\n.flag.flag-mx {\r\n    background-position: -448px -576px\r\n}\r\n\r\n.flag-mys,\r\n.flag.flag-my {\r\n    background-position: -512px -576px\r\n}\r\n\r\n.flag-moz,\r\n.flag.flag-mz {\r\n    background-position: -576px -576px\r\n}\r\n\r\n.flag-nam,\r\n.flag.flag-na {\r\n    background-position: -640px -576px\r\n}\r\n\r\n.flag-ncl,\r\n.flag.flag-nc {\r\n    background-position: -704px -576px\r\n}\r\n\r\n.flag-ner,\r\n.flag.flag-ne {\r\n    background-position: -768px -576px\r\n}\r\n\r\n.flag-nfk,\r\n.flag.flag-nf {\r\n    background-position: -832px -576px\r\n}\r\n\r\n.flag-nga,\r\n.flag.flag-ng {\r\n    background-position: -896px -576px\r\n}\r\n\r\n.flag-nic,\r\n.flag.flag-ni {\r\n    background-position: -960px -576px\r\n}\r\n\r\n.flag-nld,\r\n.flag.flag-nl {\r\n    background-position: 0 -640px\r\n}\r\n\r\n.flag-nor,\r\n.flag.flag-no {\r\n    background-position: -64px -640px\r\n}\r\n\r\n.flag-npl,\r\n.flag.flag-np {\r\n    background-position: -128px -640px\r\n}\r\n\r\n.flag-nru,\r\n.flag.flag-nr {\r\n    background-position: -192px -640px\r\n}\r\n\r\n.flag-niu,\r\n.flag.flag-nu {\r\n    background-position: -256px -640px\r\n}\r\n\r\n.flag-nzl,\r\n.flag.flag-nz {\r\n    background-position: -320px -640px\r\n}\r\n\r\n.flag-omn,\r\n.flag.flag-om {\r\n    background-position: -384px -640px\r\n}\r\n\r\n.flag-pan,\r\n.flag.flag-pa {\r\n    background-position: -448px -640px\r\n}\r\n\r\n.flag-per,\r\n.flag.flag-pe {\r\n    background-position: -512px -640px\r\n}\r\n\r\n.flag-pyf,\r\n.flag.flag-pf {\r\n    background-position: -576px -640px\r\n}\r\n\r\n.flag-png,\r\n.flag.flag-pg {\r\n    background-position: -640px -640px\r\n}\r\n\r\n.flag-phl,\r\n.flag.flag-ph {\r\n    background-position: -704px -640px\r\n}\r\n\r\n.flag-pak,\r\n.flag.flag-pk {\r\n    background-position: -768px -640px\r\n}\r\n\r\n.flag-pol,\r\n.flag.flag-pl {\r\n    background-position: -832px -640px\r\n}\r\n\r\n.flag-pcn,\r\n.flag.flag-pn {\r\n    background-position: -896px -640px\r\n}\r\n\r\n.flag-pri,\r\n.flag.flag-pr {\r\n    background-position: -960px -640px\r\n}\r\n\r\n.flag-pse,\r\n.flag.flag-ps {\r\n    background-position: 0 -704px\r\n}\r\n\r\n.flag-prt,\r\n.flag.flag-pt {\r\n    background-position: -64px -704px\r\n}\r\n\r\n.flag-plw,\r\n.flag.flag-pw {\r\n    background-position: -128px -704px\r\n}\r\n\r\n.flag-pry,\r\n.flag.flag-py {\r\n    background-position: -192px -704px\r\n}\r\n\r\n.flag-qat,\r\n.flag.flag-qa {\r\n    background-position: -256px -704px\r\n}\r\n\r\n.flag-rou,\r\n.flag.flag-ro {\r\n    background-position: -320px -704px\r\n}\r\n\r\n.flag-srb,\r\n.flag.flag-rs {\r\n    background-position: -384px -704px\r\n}\r\n\r\n.flag-rus,\r\n.flag.flag-ru {\r\n    background-position: -448px -704px\r\n}\r\n\r\n.flag-rwa,\r\n.flag.flag-rw {\r\n    background-position: -512px -704px\r\n}\r\n\r\n.flag-sau,\r\n.flag.flag-sa {\r\n    background-position: -576px -704px\r\n}\r\n\r\n.flag-slb,\r\n.flag.flag-sb {\r\n    background-position: -640px -704px\r\n}\r\n\r\n.flag-syc,\r\n.flag.flag-sc {\r\n    background-position: -704px -704px\r\n}\r\n\r\n.flag-sdn,\r\n.flag.flag-sd {\r\n    background-position: -768px -704px\r\n}\r\n\r\n.flag-swe,\r\n.flag.flag-se {\r\n    background-position: -832px -704px\r\n}\r\n\r\n.flag-sgp,\r\n.flag.flag-sg {\r\n    background-position: -896px -704px\r\n}\r\n\r\n.flag-shn,\r\n.flag.flag-sh {\r\n    background-position: -960px -704px\r\n}\r\n\r\n.flag-svn,\r\n.flag.flag-si {\r\n    background-position: 0 -768px\r\n}\r\n\r\n.flag-svk,\r\n.flag.flag-sk {\r\n    background-position: -64px -768px\r\n}\r\n\r\n.flag-sle,\r\n.flag.flag-sl {\r\n    background-position: -128px -768px\r\n}\r\n\r\n.flag-smr,\r\n.flag.flag-sm {\r\n    background-position: -192px -768px\r\n}\r\n\r\n.flag-sen,\r\n.flag.flag-sn {\r\n    background-position: -256px -768px\r\n}\r\n\r\n.flag-som,\r\n.flag.flag-so {\r\n    background-position: -320px -768px\r\n}\r\n\r\n.flag-sur,\r\n.flag.flag-sr {\r\n    background-position: -384px -768px\r\n}\r\n\r\n.flag-ssd,\r\n.flag.flag-ss {\r\n    background-position: -448px -768px\r\n}\r\n\r\n.flag-stp,\r\n.flag.flag-st {\r\n    background-position: -512px -768px\r\n}\r\n\r\n.flag-slv,\r\n.flag.flag-sv {\r\n    background-position: -576px -768px\r\n}\r\n\r\n.flag-syr,\r\n.flag.flag-sy {\r\n    background-position: -640px -768px\r\n}\r\n\r\n.flag-swz,\r\n.flag.flag-sz {\r\n    background-position: -704px -768px\r\n}\r\n\r\n.flag-tca,\r\n.flag.flag-tc {\r\n    background-position: -768px -768px\r\n}\r\n\r\n.flag-tcd,\r\n.flag.flag-td {\r\n    background-position: -832px -768px\r\n}\r\n\r\n.flag-atf,\r\n.flag.flag-tf {\r\n    background-position: -896px -768px\r\n}\r\n\r\n.flag-tgo,\r\n.flag.flag-tg {\r\n    background-position: -960px -768px\r\n}\r\n\r\n.flag-tha,\r\n.flag.flag-th {\r\n    background-position: 0 -832px\r\n}\r\n\r\n.flag-tjk,\r\n.flag.flag-tj {\r\n    background-position: -64px -832px\r\n}\r\n\r\n.flag-tkl,\r\n.flag.flag-tk {\r\n    background-position: -128px -832px\r\n}\r\n\r\n.flag-tls,\r\n.flag.flag-tl {\r\n    background-position: -192px -832px\r\n}\r\n\r\n.flag-tkm,\r\n.flag.flag-tm {\r\n    background-position: -256px -832px\r\n}\r\n\r\n.flag-tun,\r\n.flag.flag-tn {\r\n    background-position: -320px -832px\r\n}\r\n\r\n.flag-ton,\r\n.flag.flag-to {\r\n    background-position: -384px -832px\r\n}\r\n\r\n.flag-tur,\r\n.flag.flag-tr {\r\n    background-position: -448px -832px\r\n}\r\n\r\n.flag-tto,\r\n.flag.flag-tt {\r\n    background-position: -512px -832px\r\n}\r\n\r\n.flag-tuv,\r\n.flag.flag-tv {\r\n    background-position: -576px -832px\r\n}\r\n\r\n.flag-twn,\r\n.flag.flag-tw {\r\n    background-position: -640px -832px\r\n}\r\n\r\n.flag-tza,\r\n.flag.flag-tz {\r\n    background-position: -704px -832px\r\n}\r\n\r\n.flag-ukr,\r\n.flag.flag-ua {\r\n    background-position: -768px -832px\r\n}\r\n\r\n.flag-uga,\r\n.flag.flag-ug {\r\n    background-position: -832px -832px\r\n}\r\n\r\n.flag-usa,\r\n.flag.flag-us {\r\n    background-position: -896px -832px\r\n}\r\n\r\n.flag-ury,\r\n.flag.flag-uy {\r\n    background-position: -960px -832px\r\n}\r\n\r\n.flag-uzb,\r\n.flag.flag-uz {\r\n    background-position: 0 -896px\r\n}\r\n\r\n.flag-vat,\r\n.flag.flag-va {\r\n    background-position: -64px -896px\r\n}\r\n\r\n.flag-vct,\r\n.flag.flag-vc {\r\n    background-position: -128px -896px\r\n}\r\n\r\n.flag-ven,\r\n.flag.flag-ve {\r\n    background-position: -192px -896px\r\n}\r\n\r\n.flag-vgb,\r\n.flag.flag-vg {\r\n    background-position: -256px -896px\r\n}\r\n\r\n.flag-vir,\r\n.flag.flag-vi {\r\n    background-position: -320px -896px\r\n}\r\n\r\n.flag-vnm,\r\n.flag.flag-vn {\r\n    background-position: -384px -896px\r\n}\r\n\r\n.flag-vut,\r\n.flag.flag-vu {\r\n    background-position: -448px -896px\r\n}\r\n\r\n.flag-wlf,\r\n.flag.flag-wf {\r\n    background-position: -512px -896px\r\n}\r\n\r\n.flag-wsm,\r\n.flag.flag-ws {\r\n    background-position: -576px -896px\r\n}\r\n\r\n.flag-yem,\r\n.flag.flag-ye {\r\n    background-position: -640px -896px\r\n}\r\n\r\n.flag-myt,\r\n.flag.flag-yt {\r\n    background-position: -704px -896px\r\n}\r\n\r\n.flag-zaf,\r\n.flag.flag-za {\r\n    background-position: -768px -896px\r\n}\r\n\r\n.flag-zmb,\r\n.flag.flag-zm {\r\n    background-position: -832px -896px\r\n}\r\n\r\n.flag-zwe,\r\n.flag.flag-zw {\r\n    background-position: -896px -896px\r\n}");var A={name:"CountryFlag",props:{country:{type:String,required:!0,validator:function(A){return 2===A.length||3===A.length}},size:{type:String,validator:function(A){return"small"===A||"normal"===A||"big"===A},default:"normal"}},computed:{flagIconClass:function(){var A;return(A={})["flag "+this.flagIconCountry]=!0,A[this.flagMargin]=!0,A},flagIconCountry:function(){return"flag-"+this.country.toLowerCase()},flagMargin:function(){switch(this.size){case"small":return"small-flag";case"normal":return"normal-flag";case"big":return"big-flag";default:return"normal-flag"}}}};var g,n=function(A,g,n,r,B,Q,C,o,a,f){"boolean"!=typeof C&&(a=o,o=C,C=!1);var w,D="function"==typeof n?n.options:n;if(A&&A.render&&(D.render=A.render,D.staticRenderFns=A.staticRenderFns,D._compiled=!0,B&&(D.functional=!0)),r&&(D._scopeId=r),Q?(w=function(A){(A=A||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(A=__VUE_SSR_CONTEXT__),g&&g.call(this,a(A)),A&&A._registeredComponents&&A._registeredComponents.add(Q)},D._ssrRegister=w):g&&(w=C?function(){g.call(this,f(this.$root.$options.shadowRoot))}:function(A){g.call(this,o(A))}),w)if(D.functional){var l=D.render;D.render=function(A,g){return w.call(g),l(A,g)}}else{var E=D.beforeCreate;D.beforeCreate=E?[].concat(E,w):[w]}return n},r="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());var B={};var Q=n({render:function(){var A=this.$createElement,g=this._self._c||A;return this.country?g("span",{class:this.flagIconClass}):this._e()},staticRenderFns:[]},function(A){A&&A("data-v-05fb4d45_0",{source:".small-flag[data-v-05fb4d45]{margin:-24px;transform:scale(.25);-ms-transform:scale(.25);-webkit-transform:scale(.25);-moz-transform:scale(.25)}.normal-flag[data-v-05fb4d45]{margin:-16px;transform:scale(.5);-ms-transform:scale(.5);-webkit-transform:scale(.5);-moz-transform:scale(.5)}.big-flag[data-v-05fb4d45]{margin:0;transform:scale(1);-ms-transform:scale(1);-webkit-transform:scale(1);-moz-transform:scale(1)}",map:void 0,media:void 0})},A,"data-v-05fb4d45",!1,void 0,function(A){return function(A,n){return function(A,n){var Q=r?n.media||"default":A,C=B[Q]||(B[Q]={ids:new Set,styles:[]});if(!C.ids.has(A)){C.ids.add(A);var o=n.source;if(n.map&&(o+="\n/*# sourceURL="+n.map.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n.map))))+" */"),C.element||(C.element=document.createElement("style"),C.element.type="text/css",n.media&&C.element.setAttribute("media",n.media),void 0===g&&(g=document.head||document.getElementsByTagName("head")[0]),g.appendChild(C.element)),"styleSheet"in C.element)C.styles.push(o),C.element.styleSheet.cssText=C.styles.filter(Boolean).join("\n");else{var a=C.ids.size-1,f=document.createTextNode(o),w=C.element.childNodes;w[a]&&C.element.removeChild(w[a]),w.length?C.element.insertBefore(f,w[a]):C.element.appendChild(f)}}}(A,n)}},void 0);function C(A){C.installed||(C.installed=!0,A.component("CountryFlag",Q))}var o={install:C},a=null;"undefined"!=typeof window?a=window.Vue:"undefined"!=typeof global&&(a=global.Vue),a&&a.use(o),Q.install=C;/* harmony default export */ __webpack_exports__["default"] = (Q);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Flashs/ContentFlashs.vue?vue&type=template&id=41754491&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Content/Flashs/ContentFlashs.vue?vue&type=template&id=41754491& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content-flashs" },
    _vm._l(this.flashs, function(messages, type) {
      return _c(
        "ul",
        { class: "alert alert-" + type },
        _vm._l(messages, function(message) {
          return _c("li", [
            _c("span", { staticClass: "important" }, [
              _vm._v(_vm._s(_vm.label(type)) + "!")
            ]),
            _vm._v(" "),
            _c("span", { domProps: { innerHTML: _vm._s(message) } })
          ])
        }),
        0
      )
    }),
    0
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Header/Breadcrumb.vue?vue&type=template&id=6836fd54&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Content/Header/Breadcrumb.vue?vue&type=template&id=6836fd54& ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ol",
    { staticClass: "breadcrumb" },
    _vm._l(this.breadcrumb, function(item, index) {
      return _c("li", { staticClass: "breadcrumb-item" }, [
        index < _vm.counter - 1
          ? _c("a", { attrs: { href: item.url } }, [_vm._v(_vm._s(item.title))])
          : _c("p", [_vm._v(_vm._s(item.title))])
      ])
    }),
    0
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Header/ContentHeader.vue?vue&type=template&id=a6beadb6&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Content/Header/ContentHeader.vue?vue&type=template&id=a6beadb6& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class:
        "content-header " +
        this.theme +
        " theme-" +
        this.$store.state.activeTheme
    },
    [
      this.breadcrumb
        ? _c("breadcrumb", { attrs: { breadcrumbData: this.breadcrumb } })
        : _vm._e(),
      _vm._v(" "),
      _c("h1", [_vm._v(_vm._s(this.title))]),
      _vm._v(" "),
      _c("p", { staticClass: "subtitle" }, [_vm._v(_vm._s(this.subtitle))]),
      _vm._v(" "),
      this.description ? _c("p", [_vm._v(_vm._s(this.description))]) : _vm._e(),
      _vm._v(" "),
      this.buttons
        ? _c("content-header-buttons", { attrs: { buttonsData: this.buttons } })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Header/ContentHeaderButtons.vue?vue&type=template&id=6b00724c&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Content/Header/ContentHeaderButtons.vue?vue&type=template&id=6b00724c& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ul",
    { staticClass: "content-header--buttons" },
    _vm._l(_vm.buttons, function(button) {
      return _c("li", { staticClass: "content-header--buttons--item" }, [
        _c(
          "a",
          {
            class: button.theme ? "btn " + button.theme : "btn",
            attrs: { href: button.url }
          },
          [_vm._v(_vm._s(button.title))]
        )
      ])
    }),
    0
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Footer/BaseFooter.vue?vue&type=template&id=158e43f6&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Footer/BaseFooter.vue?vue&type=template&id=158e43f6& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "footer",
    { class: "footer theme-" + this.$store.state.activeTheme },
    [
      _c("ul", [
        _c("li", [
          _c(
            "a",
            { staticClass: "footer--link", attrs: { href: "/contact" } },
            [_vm._v(_vm._s(this.neededTranslations.app_contact))]
          )
        ]),
        _vm._v(" "),
        _c("li", [
          _c(
            "a",
            {
              staticClass: "footer--link",
              attrs: { href: "/files/gdpr.pdf", target: "_blank" }
            },
            [
              _vm._v(
                "\n                " +
                  _vm._s(this.neededTranslations.common_privacy_policy) +
                  " "
              ),
              _c("i", {
                staticClass: "footer--ico fas fa-external-link-alt fa-xs",
                attrs: { "aria-hidden": "true" }
              })
            ]
          )
        ]),
        _vm._v(" "),
        _vm._m(0)
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", [_c("p", [_vm._v("2019")])])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Form/CompositeTestCreate.vue?vue&type=template&id=3b9482d6&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Form/CompositeTestCreate.vue?vue&type=template&id=3b9482d6& ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: "theme-" + this.$store.state.activeTheme }, [
    _c(
      "form",
      { attrs: { method: "POST", action: "/teacher/composite-tests" } },
      [
        _c("input", {
          attrs: { type: "hidden", name: "_token" },
          domProps: { value: _vm.csrf }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "field-container" }, [
          _c("label", { attrs: { for: "name" } }, [
            _vm._v(_vm._s(this.neededTranslations.common_name) + " "),
            _c("span", { staticClass: "required" }, [_vm._v("*")])
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.values.name,
                expression: "values.name"
              }
            ],
            attrs: { type: "text", name: "name", id: "name", required: "" },
            domProps: { value: _vm.values.name },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.values, "name", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field-container" }, [
          _c("label", { attrs: { for: "version" } }, [
            _vm._v(_vm._s(this.neededTranslations.common_version) + " "),
            _c("span", { staticClass: "required" }, [_vm._v("*")])
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.values.version,
                expression: "values.version"
              }
            ],
            attrs: {
              type: "number",
              name: "version",
              id: "version",
              required: ""
            },
            domProps: { value: _vm.values.version },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.values, "version", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field-container" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.values.visibility,
                expression: "values.visibility"
              }
            ],
            attrs: {
              type: "checkbox",
              id: "visibility",
              name: "visible",
              "aria-describedby": "visibility-description"
            },
            domProps: {
              checked: Array.isArray(_vm.values.visibility)
                ? _vm._i(_vm.values.visibility, null) > -1
                : _vm.values.visibility
            },
            on: {
              change: function($event) {
                var $$a = _vm.values.visibility,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false
                if (Array.isArray($$a)) {
                  var $$v = null,
                    $$i = _vm._i($$a, $$v)
                  if ($$el.checked) {
                    $$i < 0 &&
                      _vm.$set(_vm.values, "visibility", $$a.concat([$$v]))
                  } else {
                    $$i > -1 &&
                      _vm.$set(
                        _vm.values,
                        "visibility",
                        $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                      )
                  }
                } else {
                  _vm.$set(_vm.values, "visibility", $$c)
                }
              }
            }
          }),
          _vm._v(" "),
          _c("label", { attrs: { for: "visibility" } }, [
            _vm._v(_vm._s(this.neededTranslations.common_visibility))
          ]),
          _vm._v(" "),
          _c("p", { attrs: { id: "visibility-description" } }, [
            _vm._v(
              _vm._s(this.neededTranslations.common_visibility_explanation)
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field-container" }, [
          _c("label", { attrs: { for: "reading-duration" } }, [
            _vm._v(_vm._s(this.neededTranslations.common_reading_duration))
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.values.readingDuration,
                expression: "values.readingDuration"
              }
            ],
            attrs: {
              type: "number",
              name: "reading-duration",
              id: "reading-duration"
            },
            domProps: { value: _vm.values.readingDuration },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.values, "readingDuration", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c(
          "fieldset",
          [
            _c("legend", [
              _vm._v(
                _vm._s(this.neededTranslations.composite_tests_composition)
              )
            ]),
            _vm._v(" "),
            _c("p", [
              _vm._v(
                _vm._s(
                  this.neededTranslations
                    .composite_tests_composition_explanation
                )
              )
            ]),
            _vm._v(" "),
            _vm._l(7, function(n) {
              return _c(
                "div",
                [
                  _c(
                    "label",
                    {
                      staticClass: "typo__label",
                      attrs: { for: "exercise_" + n }
                    },
                    [_vm._v("Exercise " + _vm._s(n))]
                  ),
                  _vm._v(" "),
                  _c("multiselect", {
                    attrs: {
                      id: "exercise_" + n,
                      placeholder: "Search",
                      label: "name",
                      "track-by": "id",
                      options: _vm.options,
                      multiple: true,
                      taggable: true
                    },
                    model: {
                      value: _vm.values.exercises[n],
                      callback: function($$v) {
                        _vm.$set(_vm.values.exercises, n, $$v)
                      },
                      expression: "values.exercises[n]"
                    }
                  })
                ],
                1
              )
            })
          ],
          2
        ),
        _vm._v(" "),
        _c("input", {
          attrs: { type: "hidden", name: "exercises" },
          domProps: { value: JSON.stringify(_vm.values.exercises) }
        }),
        _vm._v(" "),
        _c("button", { staticClass: "btn", attrs: { type: "submit" } }, [
          _vm._v("\n            Validate\n        ")
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Header/BaseHeader.vue?vue&type=template&id=ca495a76&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Header/BaseHeader.vue?vue&type=template&id=ca495a76&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "main-header" }, [
    this.$store.getters.getRolesNumber > 1
      ? _c("div", { staticClass: "profile--menu" }, [
          _c("ul", { staticClass: "profile--menu-list" }, [
            this.$store.getters.hasRole("student")
              ? _c("li", { staticClass: "profile--menu-item student--item" }, [
                  _c(
                    "a",
                    {
                      staticClass: "profile--menu-link",
                      attrs: { href: "/profile" }
                    },
                    [
                      _c(
                        "span",
                        {
                          class: {
                            important:
                              this.$store.state.activeProfile === "student"
                          }
                        },
                        [_vm._v(_vm._s(this.neededTranslations.common_student))]
                      )
                    ]
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            this.$store.getters.hasRole("teacher")
              ? _c("li", { staticClass: "profile--menu-item teacher--item" }, [
                  _c(
                    "a",
                    {
                      staticClass: "profile--menu-link",
                      attrs: { href: "/teacher" }
                    },
                    [
                      _c(
                        "span",
                        {
                          class: {
                            important:
                              this.$store.state.activeProfile === "teacher"
                          }
                        },
                        [_vm._v(_vm._s(this.neededTranslations.common_teacher))]
                      )
                    ]
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            this.$store.getters.hasRole("admin")
              ? _c("li", { staticClass: "profile--menu-item admin--item" }, [
                  _c(
                    "a",
                    {
                      staticClass: "profile--menu-link",
                      attrs: { href: "/admin" }
                    },
                    [
                      _c(
                        "span",
                        {
                          class: {
                            important:
                              this.$store.state.activeProfile === "admin"
                          }
                        },
                        [_vm._v(_vm._s(this.neededTranslations.common_admin))]
                      )
                    ]
                  )
                ])
              : _vm._e()
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _c("header", { class: "header theme-" + this.$store.state.activeTheme }, [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "click-outside",
              rawName: "v-click-outside",
              value: _vm.closeSubmenu,
              expression: "closeSubmenu"
            }
          ],
          staticClass: "header--part header--menu"
        },
        [
          Object.keys(this.$store.state.currentUser).length !== 0
            ? _c("nav", [
                this.$store.state.activeProfile === "admin"
                  ? _c("ul", [
                      _c(
                        "li",
                        {
                          staticClass: "header--menu-item",
                          attrs: { id: "adminMenu" }
                        },
                        [
                          _c(
                            "a",
                            {
                              class:
                                this.$store.state.activeTrail == "admin"
                                  ? "active"
                                  : "",
                              attrs: { href: "/admin" }
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(this.neededTranslations.common_admin) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : this.$store.state.activeProfile === "teacher"
                  ? _c("ul", [
                      _c(
                        "li",
                        {
                          staticClass: "header--menu-item",
                          attrs: { id: "teacherUsersMenu" }
                        },
                        [
                          _c(
                            "button",
                            {
                              class:
                                this.$store.state.activeTrail == "teacher-users"
                                  ? "active"
                                  : "",
                              on: {
                                click: function($event) {
                                  return _vm.toggleSubmenu(
                                    "teacherUsersSubmenu"
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(this.neededTranslations.users_manage) +
                                  "\n                        "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "ul",
                            {
                              staticClass: "submenu",
                              attrs: { id: "teacherUsersSubmenu" }
                            },
                            [
                              _c("li", { staticClass: "submenu--item" }, [
                                _c("a", { attrs: { href: "/teacher/users" } }, [
                                  _vm._v(
                                    _vm._s(this.neededTranslations.users_list)
                                  )
                                ])
                              ]),
                              _vm._v(" "),
                              _c("li", { staticClass: "submenu--item" }, [
                                _c(
                                  "a",
                                  { attrs: { href: "/teacher/students" } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        this.neededTranslations.students_list
                                      )
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("li", { staticClass: "submenu--item" }, [
                                _c(
                                  "a",
                                  { attrs: { href: "/teacher/groups" } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        this.neededTranslations.groups_list
                                      )
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("li", { staticClass: "submenu--item" }, [
                                _c(
                                  "a",
                                  { attrs: { href: "/teacher/lessons" } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        this.neededTranslations.lessons_list
                                      )
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("li", { staticClass: "submenu--item" }, [
                                _c(
                                  "a",
                                  { attrs: { href: "/teacher/messages" } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        this.neededTranslations.messages_list
                                      )
                                    )
                                  ]
                                )
                              ])
                            ]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        {
                          staticClass: "header--menu-item",
                          attrs: { id: "teacherExercisesMenu" }
                        },
                        [
                          _c(
                            "button",
                            {
                              class:
                                this.$store.state.activeTrail ==
                                "teacher-exercises"
                                  ? "active"
                                  : "",
                              on: {
                                click: function($event) {
                                  return _vm.toggleSubmenu(
                                    "teacherExercisesSubmenu"
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    this.neededTranslations.exercises_manage
                                  ) +
                                  "\n                        "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "ul",
                            {
                              staticClass: "submenu",
                              attrs: { id: "teacherExercisesSubmenu" }
                            },
                            [
                              _c("li", { staticClass: "submenu--item" }, [
                                _c(
                                  "a",
                                  { attrs: { href: "/teacher/exercises" } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        this.neededTranslations.exercises_list
                                      )
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("li", { staticClass: "submenu--item" }, [
                                _c(
                                  "a",
                                  {
                                    attrs: { href: "/teacher/composite-tests" }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        this.neededTranslations
                                          .composite_tests_list
                                      )
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("li", { staticClass: "submenu--item" }, [
                                _c("a", { attrs: { href: "/teacher/parts" } }, [
                                  _vm._v(
                                    _vm._s(this.neededTranslations.parts_list)
                                  )
                                ])
                              ]),
                              _vm._v(" "),
                              _c("li", { staticClass: "submenu--item" }, [
                                _c(
                                  "a",
                                  { attrs: { href: "/teacher/questions" } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        this.neededTranslations.questions_list
                                      )
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("li", { staticClass: "submenu--item" }, [
                                _c(
                                  "a",
                                  { attrs: { href: "/teacher/documents" } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        this.neededTranslations.documents_list
                                      )
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("li", { staticClass: "submenu--item" }, [
                                _c(
                                  "a",
                                  { attrs: { href: "/teacher/explanations" } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        this.neededTranslations
                                          .explanations_list
                                      )
                                    )
                                  ]
                                )
                              ])
                            ]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        {
                          staticClass: "header--menu-item",
                          attrs: { id: "teacherResultsMenu" }
                        },
                        [
                          _c(
                            "button",
                            {
                              class:
                                this.$store.state.activeTrail ==
                                "teacher-results"
                                  ? "active"
                                  : "",
                              on: {
                                click: function($event) {
                                  return _vm.toggleSubmenu(
                                    "teacherResultsSubmenu"
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    this.neededTranslations.app_see_results
                                  ) +
                                  "\n                        "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "ul",
                            {
                              staticClass: "submenu",
                              attrs: { id: "teacherResultsSubmenu" }
                            },
                            [
                              _c("li", { staticClass: "submenu--item" }, [
                                _c(
                                  "a",
                                  {
                                    attrs: {
                                      href: "/teacher/results/exercises"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        this.neededTranslations
                                          .exercises_results
                                      )
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("li", { staticClass: "submenu--item" }, [
                                _c(
                                  "a",
                                  {
                                    attrs: {
                                      href: "/teacher/results/composite-tests"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        this.neededTranslations
                                          .composite_tests_results
                                      )
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("li", { staticClass: "submenu--item" }, [
                                _c(
                                  "a",
                                  { attrs: { href: "/teacher/results/games" } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        this.neededTranslations.games_results
                                      )
                                    )
                                  ]
                                )
                              ])
                            ]
                          )
                        ]
                      )
                    ])
                  : _c("ul", [
                      _c(
                        "li",
                        {
                          staticClass: "header--menu-item",
                          attrs: { id: "studentCompositeTestsMenu" }
                        },
                        [
                          _c(
                            "a",
                            {
                              class:
                                this.$store.state.activeTrail ==
                                "student-composite-tests"
                                  ? "active"
                                  : "",
                              attrs: { href: "/composite-tests" }
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    this.neededTranslations.app_composite_tests
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        {
                          staticClass: "header--menu-item",
                          attrs: { id: "studentExercisesMenu" }
                        },
                        [
                          _c(
                            "a",
                            {
                              class:
                                this.$store.state.activeTrail ==
                                "student-exercises"
                                  ? "active"
                                  : "",
                              attrs: { href: "/exercises" }
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    this.neededTranslations.app_exercises
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        {
                          staticClass: "header--menu-item",
                          attrs: { id: "studentChallengesMenu" }
                        },
                        [
                          _c(
                            "a",
                            {
                              class:
                                this.$store.state.activeTrail ==
                                "student-challenges"
                                  ? "active"
                                  : "",
                              attrs: { href: "/games" }
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(this.neededTranslations.app_games) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      )
                    ])
              ])
            : _vm._e()
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "header--part" }, [
        _c("ul", { staticClass: "header--actions-list" }, [
          Object.keys(this.$store.state.currentUser).length === 0
            ? _c("li", { staticClass: "header--actions-list-item" }, [
                _c("a", { attrs: { href: "/login" } }, [
                  _c("span", [
                    _vm._v(_vm._s(this.neededTranslations.common_login))
                  ])
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          Object.keys(this.$store.state.currentUser).length !== 0
            ? _c("li", { staticClass: "header--actions-list-item" }, [
                _c(
                  "a",
                  {
                    attrs: {
                      href: "/teacher/users/" + this.$store.state.currentUser.id
                    }
                  },
                  [
                    this.$store.state.currentUser.picture
                      ? _c(
                          "div",
                          {
                            staticClass:
                              "user-picture--container user-picture--header"
                          },
                          [
                            _c("img", {
                              staticClass: "user-picture",
                              attrs: {
                                src: this.$store.state.currentUser.picture,
                                alt: ""
                              }
                            })
                          ]
                        )
                      : _c("i", {
                          staticClass: "user-ico fas fa-user-circle fa-lg"
                        }),
                    _vm._v(" "),
                    _c("span", { staticClass: "legend-ico" }, [
                      _vm._v(_vm._s(this.neededTranslations.app_profile))
                    ])
                  ]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          Object.keys(this.$store.state.currentUser).length !== 0
            ? _c("li", { staticClass: "header--actions-list-item" }, [
                _c("a", { attrs: { href: "/logout" } }, [
                  _c("i", { staticClass: "fas fa-power-off fa-lg" }),
                  _vm._v(" "),
                  _c("span", { staticClass: "legend-ico" }, [
                    _vm._v(_vm._s(this.neededTranslations.common_logout))
                  ])
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("li", { staticClass: "header--actions-list-item" }, [
            _vm.lang == "fr"
              ? _c(
                  "a",
                  { attrs: { href: "/locale/en" } },
                  [
                    _c("country-flag", { attrs: { country: "gb" } }),
                    _vm._v(" "),
                    _c("span", { staticClass: "legend-ico" }, [
                      _vm._v("English")
                    ])
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.lang == "en"
              ? _c(
                  "a",
                  { attrs: { href: "/locale/fr" } },
                  [
                    _c("country-flag", { attrs: { country: "fr" } }),
                    _vm._v(" "),
                    _c("span", { staticClass: "legend-ico" }, [
                      _vm._v("Français")
                    ])
                  ],
                  1
                )
              : _vm._e()
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "header--part header--logo" }, [
      _c("a", { attrs: { href: "/profile" } }, [
        _c("img", { attrs: { src: "/svg/hello-toeic-small.svg", alt: "" } }),
        _vm._v("\n                Hello Toeic\n            ")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Pages/LoginPage.vue?vue&type=template&id=ce00b25c&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Pages/LoginPage.vue?vue&type=template&id=ce00b25c&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("main", { staticClass: "login-page", style: _vm.cssVars }, [
    _c("div", { staticClass: "container login-container" }, [
      _c("div", { class: [_vm.loginClasses] }, [
        _c("div", { staticClass: "form-container" }, [
          _c("h1", [_vm._v(_vm._s(this.neededTranslations.common_login))]),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.hasErrors,
                  expression: "hasErrors"
                }
              ],
              staticClass: "alert alert-error"
            },
            [
              _c(
                "ul",
                _vm._l(JSON.parse(this.errors), function(error) {
                  return _c("li", [
                    _c("span", { staticClass: "important" }, [
                      _vm._v(_vm._s(this.neededTranslations.common_error) + "!")
                    ]),
                    _vm._v(" " + _vm._s(error) + "\n                        ")
                  ])
                }),
                0
              )
            ]
          ),
          _vm._v(" "),
          _c("form", { attrs: { method: "POST", action: "/login" } }, [
            _c("input", {
              attrs: { type: "hidden", name: "_token" },
              domProps: { value: _vm.csrf }
            }),
            _vm._v(" "),
            _c("div", { staticClass: "field-container" }, [
              _c("label", { attrs: { for: "email" } }, [
                _vm._v(_vm._s(this.neededTranslations.common_email) + " "),
                _c("span", { staticClass: "required" }, [_vm._v("*")])
              ]),
              _vm._v(" "),
              _c("input", {
                directives: [{ name: "focus", rawName: "v-focus" }],
                attrs: {
                  type: "email",
                  id: "email",
                  name: "email",
                  required: "",
                  autofocus: ""
                }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field-container" }, [
              _c("label", { attrs: { for: "password" } }, [
                _vm._v(_vm._s(this.neededTranslations.common_password) + " "),
                _c("span", { staticClass: "required" }, [_vm._v("*")])
              ]),
              _vm._v(" "),
              _c("input", {
                attrs: {
                  type: "password",
                  id: "password",
                  name: "password",
                  required: ""
                }
              })
            ]),
            _vm._v(" "),
            _c(
              "button",
              { staticClass: "btn btn-primary", attrs: { type: "submit" } },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(this.neededTranslations.common_login) +
                    "\n                    "
                )
              ]
            )
          ]),
          _vm._v(" "),
          _c(
            "a",
            {
              staticClass: "forgot-password",
              attrs: { href: "/password/reset" }
            },
            [_vm._v(_vm._s(this.neededTranslations.common_forgot_password))]
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Paginations/BasePagination.vue?vue&type=template&id=017f744c&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Paginations/BasePagination.vue?vue&type=template&id=017f744c& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "pagination paginationv2" }, [
    _vm.pagination.type === "full"
      ? _c(
          "ol",
          _vm._l(this.pagesNumber, function(n) {
            return _c("li", [
              _vm.pagination.current !== n
                ? _c(
                    "button",
                    {
                      on: {
                        click: function($event) {
                          return _vm.$emit("changePage", n)
                        }
                      }
                    },
                    [_vm._v(_vm._s(n))]
                  )
                : _c("span", [_vm._v(_vm._s(n))])
            ])
          }),
          0
        )
      : _c("ol", [
          _vm.pagination.current !== 1
            ? _c("li", [
                _c(
                  "button",
                  {
                    on: {
                      click: function($event) {
                        return _vm.$emit("changePage", 1)
                      }
                    }
                  },
                  [_c("i", { staticClass: "fas fa-step-backward" })]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.pagination.current !== 1
            ? _c("li", [
                _c(
                  "button",
                  {
                    on: {
                      click: function($event) {
                        return _vm.$emit(
                          "changePage",
                          _vm.pagination.current - 1
                        )
                      }
                    }
                  },
                  [_c("i", { staticClass: "fas fa-chevron-left" })]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("li", [
            _vm.pagination.current !== 1
              ? _c(
                  "button",
                  {
                    on: {
                      click: function($event) {
                        return _vm.$emit("changePage", 1)
                      }
                    }
                  },
                  [_vm._v("1")]
                )
              : _c("span", [_vm._v("1")])
          ]),
          _vm._v(" "),
          _c(
            "li",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.pagination.second,
                  expression: "pagination.second"
                }
              ]
            },
            [
              _vm.pagination.current !== 2
                ? _c(
                    "button",
                    {
                      on: {
                        click: function($event) {
                          return _vm.$emit("changePage", 2)
                        }
                      }
                    },
                    [_vm._v("2")]
                  )
                : _c("span", [_vm._v("2")])
            ]
          ),
          _vm._v(" "),
          _vm.pagination.current == 2 && _vm.pagination.second
            ? _c("li", [
                _c(
                  "button",
                  {
                    on: {
                      click: function($event) {
                        return _vm.$emit("changePage", 3)
                      }
                    }
                  },
                  [_vm._v("3")]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _c(
            "li",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.pagination.hiddenFirst,
                  expression: "pagination.hiddenFirst"
                }
              ]
            },
            [_c("i", { staticClass: "fas fa-ellipsis-h" })]
          ),
          _vm._v(" "),
          _c(
            "li",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.pagination.hiddenCentered,
                  expression: "pagination.hiddenCentered"
                }
              ]
            },
            [_c("i", { staticClass: "fas fa-ellipsis-h" })]
          ),
          _vm._v(" "),
          _c(
            "li",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.pagination.middle,
                  expression: "pagination.middle"
                }
              ]
            },
            [
              _c(
                "button",
                {
                  on: {
                    click: function($event) {
                      return _vm.$emit("changePage", _vm.pagination.current - 1)
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.pagination.current - 1))]
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "li",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.pagination.middle,
                  expression: "pagination.middle"
                }
              ]
            },
            [_c("span", [_vm._v(_vm._s(_vm.pagination.current))])]
          ),
          _vm._v(" "),
          _c(
            "li",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.pagination.middle,
                  expression: "pagination.middle"
                }
              ]
            },
            [
              _c(
                "button",
                {
                  on: {
                    click: function($event) {
                      return _vm.$emit("changePage", _vm.pagination.current + 1)
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.pagination.current + 1))]
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "li",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.pagination.hiddenSecond,
                  expression: "pagination.hiddenSecond"
                }
              ]
            },
            [_c("i", { staticClass: "fas fa-ellipsis-h" })]
          ),
          _vm._v(" "),
          _vm.pagination.current == _vm.pagination.last - 1 &&
          _vm.pagination.beforeLast
            ? _c("li", [
                _c(
                  "button",
                  {
                    on: {
                      click: function($event) {
                        return _vm.$emit("changePage", _vm.pagination.last - 2)
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.pagination.last - 2))]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _c(
            "li",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.pagination.beforeLast,
                  expression: "pagination.beforeLast"
                }
              ]
            },
            [
              _vm.pagination.current !== _vm.pagination.last - 1
                ? _c(
                    "button",
                    {
                      on: {
                        click: function($event) {
                          return _vm.$emit(
                            "changePage",
                            _vm.pagination.last - 1
                          )
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.pagination.last - 1))]
                  )
                : _c("span", [_vm._v(_vm._s(_vm.pagination.last - 1))])
            ]
          ),
          _vm._v(" "),
          _c("li", [
            _vm.pagination.current !== _vm.pagination.last
              ? _c(
                  "button",
                  {
                    on: {
                      click: function($event) {
                        return _vm.$emit("changePage", _vm.pagination.last)
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.pagination.last))]
                )
              : _c("span", [_vm._v(_vm._s(_vm.pagination.last))])
          ]),
          _vm._v(" "),
          _vm.pagination.current !== _vm.pagination.last
            ? _c("li", [
                _c(
                  "button",
                  {
                    on: {
                      click: function($event) {
                        return _vm.$emit(
                          "changePage",
                          _vm.pagination.current + 1
                        )
                      }
                    }
                  },
                  [_c("i", { staticClass: "fas fa-chevron-right" })]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.pagination.current !== _vm.pagination.last
            ? _c("li", [
                _c(
                  "button",
                  {
                    on: {
                      click: function($event) {
                        return _vm.$emit("changePage", _vm.pagination.last)
                      }
                    }
                  },
                  [_c("i", { staticClass: "fas fa-step-forward" })]
                )
              ])
            : _vm._e()
        ]),
    _vm._v(" "),
    _c("div", [
      _vm._v(
        "\n        " +
          _vm._s(_vm.currentPage) +
          " of " +
          _vm._s(_vm.pagesNumber) +
          "\n    "
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tables/BaseTable.vue?vue&type=template&id=27ed6dc4&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Tables/BaseTable.vue?vue&type=template&id=27ed6dc4& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { class: "table tablev2 theme-" + this.$store.state.activeTheme },
    [
      _c("div", { staticClass: "table--filters" }, [
        _c("div", { staticClass: "field-container" }, [
          _c("label", { attrs: { for: "search" } }, [
            _vm._v(_vm._s(this.neededTranslations.common_search))
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.search,
                expression: "search"
              }
            ],
            staticClass: "search",
            attrs: { type: "text", id: "search", name: "search" },
            domProps: { value: _vm.search },
            on: {
              keyup: _vm.searchUsers,
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.search = $event.target.value
              }
            }
          })
        ])
      ]),
      _vm._v(" "),
      _vm.users.length !== 0
        ? _c("div", [
            _c("div", { staticClass: "table-container is-visible" }, [
              _c("table", [
                _c("caption", { staticClass: "sr-only" }, [
                  _vm._v(_vm._s(this.neededTranslations.users_list))
                ]),
                _vm._v(" "),
                _c("thead", [
                  _c("th", [
                    _c(
                      "button",
                      {
                        staticClass: "sort",
                        on: {
                          click: function($event) {
                            return _vm.sortBy("name")
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(this.neededTranslations.common_name) +
                            " "
                        ),
                        _c("i", { staticClass: "fas fa-arrows-alt-v" })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("th", [
                    _vm._v(_vm._s(this.neededTranslations.common_email))
                  ]),
                  _vm._v(" "),
                  _c("th", { staticClass: "numeric-column" }, [
                    _vm._v(_vm._s(this.neededTranslations.common_matricule))
                  ]),
                  _vm._v(" "),
                  _c("th", [
                    _vm._v(_vm._s(this.neededTranslations.common_role))
                  ]),
                  _vm._v(" "),
                  _c("th", { staticClass: "actions-column" }, [
                    _vm._v(_vm._s(this.neededTranslations.common_actions))
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.users, function(user) {
                    return _c("tr", [
                      _c("td", { staticClass: "important" }, [
                        _vm._v(_vm._s(user.name))
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c("a", { attrs: { href: "mailto:" + user.email } }, [
                          _vm._v(_vm._s(user.email))
                        ])
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "numeric-column" }, [
                        _vm._v(_vm._s(user.matricule))
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "ul",
                          _vm._l(user.roles, function(role) {
                            return _c("li", [
                              _c("span", {
                                class: "role role-" + role.name,
                                attrs: { title: role.name }
                              })
                            ])
                          }),
                          0
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "actions-column" }, [
                        _c(
                          "button",
                          {
                            staticClass: "actions-btn",
                            on: {
                              click: function($event) {
                                return _vm.userActions(user)
                              }
                            }
                          },
                          [
                            _c("i", {
                              staticClass: "actions-ico fas fa-ellipsis-h fa-lg"
                            })
                          ]
                        )
                      ])
                    ])
                  }),
                  0
                )
              ])
            ])
          ])
        : _c("div", [
            _c("p", [_vm._v(_vm._s(this.neededTranslations.common_no_result))])
          ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "pagination-container" },
        [
          _c("base-pagination", {
            attrs: {
              "current-page": this.currentPage,
              "pages-number": this.pagesNumber
            },
            on: { changePage: _vm.changePage }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("base-table-actions", {
        attrs: { user: this.userActionsData, refresh: this.refreshActions }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tables/BaseTableActions.vue?vue&type=template&id=32c003af&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Tables/BaseTableActions.vue?vue&type=template&id=32c003af& ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "actions--fade" } }, [
    this.displayed
      ? _c("div", { staticClass: "table--actions" }, [
          _c(
            "button",
            {
              directives: [{ name: "focus", rawName: "v-focus" }],
              staticClass: "btn-close",
              attrs: {
                title: this.neededTranslations.common_close,
                id: "actions--btn-close"
              },
              on: { click: _vm.hideActions }
            },
            [_c("i", { staticClass: "fas fa-times fa-2x" })]
          ),
          _vm._v(" "),
          _c("h3", [_vm._v(_vm._s(this.neededTranslations.common_actions))]),
          _vm._v(" "),
          _c("div", { staticClass: "actions--content" }, [
            _c("div", { staticClass: "actions--details" }, [
              _c("p", [
                _c("span", { staticClass: "important" }, [
                  _vm._v(_vm._s(_vm.user.name))
                ]),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    class: "actions--email",
                    attrs: { href: "mailto:" + _vm.user.email }
                  },
                  [_vm._v(_vm._s(_vm.user.email))]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "actions--list" }, [
              _c("ul", [
                _c("li", [
                  _c(
                    "a",
                    {
                      attrs: {
                        href: this.baseUrl + "/teacher/users/" + _vm.user.id
                      }
                    },
                    [
                      _c("i", { staticClass: "fas fa-eye" }),
                      _vm._v(
                        " " +
                          _vm._s(this.neededTranslations.users_show) +
                          "\n                        "
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                this.isStudent
                  ? _c("li", [
                      _c(
                        "a",
                        {
                          attrs: {
                            href:
                              this.baseUrl +
                              "/teacher/users/" +
                              _vm.user.id +
                              "/edit"
                          }
                        },
                        [
                          _c("i", { staticClass: "fas fa-pencil-alt" }),
                          _vm._v(
                            " " +
                              _vm._s(this.neededTranslations.users_edit) +
                              "\n                        "
                          )
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                this.isStudent
                  ? _c("li", [
                      _c(
                        "a",
                        {
                          attrs: {
                            href:
                              this.baseUrl +
                              "/teacher/users/delete/" +
                              _vm.user.id
                          }
                        },
                        [
                          _c("i", { staticClass: "fas fa-trash" }),
                          _vm._v(
                            " " +
                              _vm._s(this.neededTranslations.users_delete) +
                              "\n                        "
                          )
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ])
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************************!*\
  !*** ./node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_loader_index_js_css_loader_index_js_ref_6_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_2_vue_multiselect_min_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../style-loader!../../css-loader??ref--6-1!../../vue-loader/lib/loaders/stylePostLoader.js!../../postcss-loader/src??ref--6-2!./vue-multiselect.min.css?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&");
/* harmony import */ var _style_loader_index_js_css_loader_index_js_ref_6_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_2_vue_multiselect_min_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_index_js_css_loader_index_js_ref_6_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_2_vue_multiselect_min_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _style_loader_index_js_css_loader_index_js_ref_6_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_2_vue_multiselect_min_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _style_loader_index_js_css_loader_index_js_ref_6_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_2_vue_multiselect_min_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_style_loader_index_js_css_loader_index_js_ref_6_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_6_2_vue_multiselect_min_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./node_modules/vue-multiselect/dist/vue-multiselect.min.js":
/*!******************************************************************!*\
  !*** ./node_modules/vue-multiselect/dist/vue-multiselect.min.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=60)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var i=n(49)("wks"),r=n(30),o=n(0).Symbol,s="function"==typeof o;(t.exports=function(t){return i[t]||(i[t]=s&&o[t]||(s?o:r)("Symbol."+t))}).store=i},function(t,e,n){var i=n(5);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var i=n(0),r=n(10),o=n(8),s=n(6),u=n(11),a=function(t,e,n){var l,c,f,p,h=t&a.F,d=t&a.G,v=t&a.S,g=t&a.P,y=t&a.B,m=d?i:v?i[e]||(i[e]={}):(i[e]||{}).prototype,b=d?r:r[e]||(r[e]={}),_=b.prototype||(b.prototype={});d&&(n=e);for(l in n)c=!h&&m&&void 0!==m[l],f=(c?m:n)[l],p=y&&c?u(f,i):g&&"function"==typeof f?u(Function.call,f):f,m&&s(m,l,f,t&a.U),b[l]!=f&&o(b,l,p),g&&_[l]!=f&&(_[l]=f)};i.core=r,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){t.exports=!n(7)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var i=n(0),r=n(8),o=n(12),s=n(30)("src"),u=Function.toString,a=(""+u).split("toString");n(10).inspectSource=function(t){return u.call(t)},(t.exports=function(t,e,n,u){var l="function"==typeof n;l&&(o(n,"name")||r(n,"name",e)),t[e]!==n&&(l&&(o(n,s)||r(n,s,t[e]?""+t[e]:a.join(String(e)))),t===i?t[e]=n:u?t[e]?t[e]=n:r(t,e,n):(delete t[e],r(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[s]||u.call(this)})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var i=n(13),r=n(25);t.exports=n(4)?function(t,e,n){return i.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},function(t,e,n){var i=n(14);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var i=n(2),r=n(41),o=n(29),s=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(i(t),e=o(e,!0),i(n),r)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports={}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){"use strict";var i=n(7);t.exports=function(t,e){return!!t&&i(function(){e?t.call(null,function(){},1):t.call(null)})}},function(t,e,n){var i=n(23),r=n(16);t.exports=function(t){return i(r(t))}},function(t,e,n){var i=n(53),r=Math.min;t.exports=function(t){return t>0?r(i(t),9007199254740991):0}},function(t,e,n){var i=n(11),r=n(23),o=n(28),s=n(19),u=n(64);t.exports=function(t,e){var n=1==t,a=2==t,l=3==t,c=4==t,f=6==t,p=5==t||f,h=e||u;return function(e,u,d){for(var v,g,y=o(e),m=r(y),b=i(u,d,3),_=s(m.length),x=0,w=n?h(e,_):a?h(e,0):void 0;_>x;x++)if((p||x in m)&&(v=m[x],g=b(v,x,y),t))if(n)w[x]=g;else if(g)switch(t){case 3:return!0;case 5:return v;case 6:return x;case 2:w.push(v)}else if(c)return!1;return f?-1:l||c?c:w}}},function(t,e,n){var i=n(5),r=n(0).document,o=i(r)&&i(r.createElement);t.exports=function(t){return o?r.createElement(t):{}}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var i=n(9);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e){t.exports=!1},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var i=n(13).f,r=n(12),o=n(1)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,o)&&i(t,o,{configurable:!0,value:e})}},function(t,e,n){var i=n(49)("keys"),r=n(30);t.exports=function(t){return i[t]||(i[t]=r(t))}},function(t,e,n){var i=n(16);t.exports=function(t){return Object(i(t))}},function(t,e,n){var i=n(5);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e,n){"use strict";var i=n(0),r=n(12),o=n(9),s=n(67),u=n(29),a=n(7),l=n(77).f,c=n(45).f,f=n(13).f,p=n(51).trim,h=i.Number,d=h,v=h.prototype,g="Number"==o(n(44)(v)),y="trim"in String.prototype,m=function(t){var e=u(t,!1);if("string"==typeof e&&e.length>2){e=y?e.trim():p(e,3);var n,i,r,o=e.charCodeAt(0);if(43===o||45===o){if(88===(n=e.charCodeAt(2))||120===n)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+e}for(var s,a=e.slice(2),l=0,c=a.length;l<c;l++)if((s=a.charCodeAt(l))<48||s>r)return NaN;return parseInt(a,i)}}return+e};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof h&&(g?a(function(){v.valueOf.call(n)}):"Number"!=o(n))?s(new d(m(e)),n,h):m(e)};for(var b,_=n(4)?l(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;_.length>x;x++)r(d,b=_[x])&&!r(h,b)&&f(h,b,c(d,b));h.prototype=v,v.constructor=h,n(6)(i,"Number",h)}},function(t,e,n){"use strict";function i(t){return 0!==t&&(!(!Array.isArray(t)||0!==t.length)||!t)}function r(t){return function(){return!t.apply(void 0,arguments)}}function o(t,e){return void 0===t&&(t="undefined"),null===t&&(t="null"),!1===t&&(t="false"),-1!==t.toString().toLowerCase().indexOf(e.trim())}function s(t,e,n,i){return t.filter(function(t){return o(i(t,n),e)})}function u(t){return t.filter(function(t){return!t.$isLabel})}function a(t,e){return function(n){return n.reduce(function(n,i){return i[t]&&i[t].length?(n.push({$groupLabel:i[e],$isLabel:!0}),n.concat(i[t])):n},[])}}function l(t,e,i,r,o){return function(u){return u.map(function(u){var a;if(!u[i])return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."),[];var l=s(u[i],t,e,o);return l.length?(a={},n.i(d.a)(a,r,u[r]),n.i(d.a)(a,i,l),a):[]})}}var c=n(59),f=n(54),p=(n.n(f),n(95)),h=(n.n(p),n(31)),d=(n.n(h),n(58)),v=n(91),g=(n.n(v),n(98)),y=(n.n(g),n(92)),m=(n.n(y),n(88)),b=(n.n(m),n(97)),_=(n.n(b),n(89)),x=(n.n(_),n(96)),w=(n.n(x),n(93)),S=(n.n(w),n(90)),O=(n.n(S),function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.reduce(function(t,e){return e(t)},t)}});e.a={data:function(){return{search:"",isOpen:!1,preferredOpenDirection:"below",optimizedHeight:this.maxHeight}},props:{internalSearch:{type:Boolean,default:!0},options:{type:Array,required:!0},multiple:{type:Boolean,default:!1},value:{type:null,default:function(){return[]}},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,default:!0},clearOnSelect:{type:Boolean,default:!0},hideSelected:{type:Boolean,default:!1},placeholder:{type:String,default:"Select option"},allowEmpty:{type:Boolean,default:!0},resetAfter:{type:Boolean,default:!1},closeOnSelect:{type:Boolean,default:!0},customLabel:{type:Function,default:function(t,e){return i(t)?"":e?t[e]:t}},taggable:{type:Boolean,default:!1},tagPlaceholder:{type:String,default:"Press enter to create a tag"},tagPosition:{type:String,default:"top"},max:{type:[Number,Boolean],default:!1},id:{default:null},optionsLimit:{type:Number,default:1e3},groupValues:{type:String},groupLabel:{type:String},groupSelect:{type:Boolean,default:!1},blockKeys:{type:Array,default:function(){return[]}},preserveSearch:{type:Boolean,default:!1},preselectFirst:{type:Boolean,default:!1}},mounted:function(){!this.multiple&&this.max&&console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."),this.preselectFirst&&!this.internalValue.length&&this.options.length&&this.select(this.filteredOptions[0])},computed:{internalValue:function(){return this.value||0===this.value?Array.isArray(this.value)?this.value:[this.value]:[]},filteredOptions:function(){var t=this.search||"",e=t.toLowerCase().trim(),n=this.options.concat();return n=this.internalSearch?this.groupValues?this.filterAndFlat(n,e,this.label):s(n,e,this.label,this.customLabel):this.groupValues?a(this.groupValues,this.groupLabel)(n):n,n=this.hideSelected?n.filter(r(this.isSelected)):n,this.taggable&&e.length&&!this.isExistingOption(e)&&("bottom"===this.tagPosition?n.push({isTag:!0,label:t}):n.unshift({isTag:!0,label:t})),n.slice(0,this.optionsLimit)},valueKeys:function(){var t=this;return this.trackBy?this.internalValue.map(function(e){return e[t.trackBy]}):this.internalValue},optionKeys:function(){var t=this;return(this.groupValues?this.flatAndStrip(this.options):this.options).map(function(e){return t.customLabel(e,t.label).toString().toLowerCase()})},currentOptionLabel:function(){return this.multiple?this.searchable?"":this.placeholder:this.internalValue.length?this.getOptionLabel(this.internalValue[0]):this.searchable?"":this.placeholder}},watch:{internalValue:function(){this.resetAfter&&this.internalValue.length&&(this.search="",this.$emit("input",this.multiple?[]:null))},search:function(){this.$emit("search-change",this.search,this.id)}},methods:{getValue:function(){return this.multiple?this.internalValue:0===this.internalValue.length?null:this.internalValue[0]},filterAndFlat:function(t,e,n){return O(l(e,n,this.groupValues,this.groupLabel,this.customLabel),a(this.groupValues,this.groupLabel))(t)},flatAndStrip:function(t){return O(a(this.groupValues,this.groupLabel),u)(t)},updateSearch:function(t){this.search=t},isExistingOption:function(t){return!!this.options&&this.optionKeys.indexOf(t)>-1},isSelected:function(t){var e=this.trackBy?t[this.trackBy]:t;return this.valueKeys.indexOf(e)>-1},isOptionDisabled:function(t){return!!t.$isDisabled},getOptionLabel:function(t){if(i(t))return"";if(t.isTag)return t.label;if(t.$isLabel)return t.$groupLabel;var e=this.customLabel(t,this.label);return i(e)?"":e},select:function(t,e){if(t.$isLabel&&this.groupSelect)return void this.selectGroup(t);if(!(-1!==this.blockKeys.indexOf(e)||this.disabled||t.$isDisabled||t.$isLabel)&&(!this.max||!this.multiple||this.internalValue.length!==this.max)&&("Tab"!==e||this.pointerDirty)){if(t.isTag)this.$emit("tag",t.label,this.id),this.search="",this.closeOnSelect&&!this.multiple&&this.deactivate();else{if(this.isSelected(t))return void("Tab"!==e&&this.removeElement(t));this.$emit("select",t,this.id),this.multiple?this.$emit("input",this.internalValue.concat([t]),this.id):this.$emit("input",t,this.id),this.clearOnSelect&&(this.search="")}this.closeOnSelect&&this.deactivate()}},selectGroup:function(t){var e=this,n=this.options.find(function(n){return n[e.groupLabel]===t.$groupLabel});if(n)if(this.wholeGroupSelected(n)){this.$emit("remove",n[this.groupValues],this.id);var i=this.internalValue.filter(function(t){return-1===n[e.groupValues].indexOf(t)});this.$emit("input",i,this.id)}else{var r=n[this.groupValues].filter(function(t){return!(e.isOptionDisabled(t)||e.isSelected(t))});this.$emit("select",r,this.id),this.$emit("input",this.internalValue.concat(r),this.id)}},wholeGroupSelected:function(t){var e=this;return t[this.groupValues].every(function(t){return e.isSelected(t)||e.isOptionDisabled(t)})},wholeGroupDisabled:function(t){return t[this.groupValues].every(this.isOptionDisabled)},removeElement:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!this.disabled&&!t.$isDisabled){if(!this.allowEmpty&&this.internalValue.length<=1)return void this.deactivate();var i="object"===n.i(c.a)(t)?this.valueKeys.indexOf(t[this.trackBy]):this.valueKeys.indexOf(t);if(this.$emit("remove",t,this.id),this.multiple){var r=this.internalValue.slice(0,i).concat(this.internalValue.slice(i+1));this.$emit("input",r,this.id)}else this.$emit("input",null,this.id);this.closeOnSelect&&e&&this.deactivate()}},removeLastElement:function(){-1===this.blockKeys.indexOf("Delete")&&0===this.search.length&&Array.isArray(this.internalValue)&&this.internalValue.length&&this.removeElement(this.internalValue[this.internalValue.length-1],!1)},activate:function(){var t=this;this.isOpen||this.disabled||(this.adjustPosition(),this.groupValues&&0===this.pointer&&this.filteredOptions.length&&(this.pointer=1),this.isOpen=!0,this.searchable?(this.preserveSearch||(this.search=""),this.$nextTick(function(){return t.$refs.search.focus()})):this.$el.focus(),this.$emit("open",this.id))},deactivate:function(){this.isOpen&&(this.isOpen=!1,this.searchable?this.$refs.search.blur():this.$el.blur(),this.preserveSearch||(this.search=""),this.$emit("close",this.getValue(),this.id))},toggle:function(){this.isOpen?this.deactivate():this.activate()},adjustPosition:function(){if("undefined"!=typeof window){var t=this.$el.getBoundingClientRect().top,e=window.innerHeight-this.$el.getBoundingClientRect().bottom;e>this.maxHeight||e>t||"below"===this.openDirection||"bottom"===this.openDirection?(this.preferredOpenDirection="below",this.optimizedHeight=Math.min(e-40,this.maxHeight)):(this.preferredOpenDirection="above",this.optimizedHeight=Math.min(t-40,this.maxHeight))}}}}},function(t,e,n){"use strict";var i=n(54),r=(n.n(i),n(31));n.n(r);e.a={data:function(){return{pointer:0,pointerDirty:!1}},props:{showPointer:{type:Boolean,default:!0},optionHeight:{type:Number,default:40}},computed:{pointerPosition:function(){return this.pointer*this.optionHeight},visibleElements:function(){return this.optimizedHeight/this.optionHeight}},watch:{filteredOptions:function(){this.pointerAdjust()},isOpen:function(){this.pointerDirty=!1}},methods:{optionHighlight:function(t,e){return{"multiselect__option--highlight":t===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(e)}},groupHighlight:function(t,e){var n=this;if(!this.groupSelect)return["multiselect__option--group","multiselect__option--disabled"];var i=this.options.find(function(t){return t[n.groupLabel]===e.$groupLabel});return i&&!this.wholeGroupDisabled(i)?["multiselect__option--group",{"multiselect__option--highlight":t===this.pointer&&this.showPointer},{"multiselect__option--group-selected":this.wholeGroupSelected(i)}]:"multiselect__option--disabled"},addPointerElement:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Enter",e=t.key;this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer],e),this.pointerReset()},pointerForward:function(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-(this.visibleElements-1)*this.optionHeight&&(this.$refs.list.scrollTop=this.pointerPosition-(this.visibleElements-1)*this.optionHeight),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()),this.pointerDirty=!0},pointerBackward:function(){this.pointer>0?(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerBackward()):this.filteredOptions[this.pointer]&&this.filteredOptions[0].$isLabel&&!this.groupSelect&&this.pointerForward(),this.pointerDirty=!0},pointerReset:function(){this.closeOnSelect&&(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0))},pointerAdjust:function(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0),this.filteredOptions.length>0&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()},pointerSet:function(t){this.pointer=t,this.pointerDirty=!0}}}},function(t,e,n){"use strict";var i=n(36),r=n(74),o=n(15),s=n(18);t.exports=n(72)(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,r(1)):"keys"==e?r(0,n):"values"==e?r(0,t[n]):r(0,[n,t[n]])},"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries")},function(t,e,n){"use strict";var i=n(31),r=(n.n(i),n(32)),o=n(33);e.a={name:"vue-multiselect",mixins:[r.a,o.a],props:{name:{type:String,default:""},selectLabel:{type:String,default:"Press enter to select"},selectGroupLabel:{type:String,default:"Press enter to select group"},selectedLabel:{type:String,default:"Selected"},deselectLabel:{type:String,default:"Press enter to remove"},deselectGroupLabel:{type:String,default:"Press enter to deselect group"},showLabels:{type:Boolean,default:!0},limit:{type:Number,default:99999},maxHeight:{type:Number,default:300},limitText:{type:Function,default:function(t){return"and ".concat(t," more")}},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},openDirection:{type:String,default:""},showNoOptions:{type:Boolean,default:!0},showNoResults:{type:Boolean,default:!0},tabindex:{type:Number,default:0}},computed:{isSingleLabelVisible:function(){return(this.singleValue||0===this.singleValue)&&(!this.isOpen||!this.searchable)&&!this.visibleValues.length},isPlaceholderVisible:function(){return!(this.internalValue.length||this.searchable&&this.isOpen)},visibleValues:function(){return this.multiple?this.internalValue.slice(0,this.limit):[]},singleValue:function(){return this.internalValue[0]},deselectLabelText:function(){return this.showLabels?this.deselectLabel:""},deselectGroupLabelText:function(){return this.showLabels?this.deselectGroupLabel:""},selectLabelText:function(){return this.showLabels?this.selectLabel:""},selectGroupLabelText:function(){return this.showLabels?this.selectGroupLabel:""},selectedLabelText:function(){return this.showLabels?this.selectedLabel:""},inputStyle:function(){if(this.searchable||this.multiple&&this.value&&this.value.length)return this.isOpen?{width:"100%"}:{width:"0",position:"absolute",padding:"0"}},contentStyle:function(){return this.options.length?{display:"inline-block"}:{display:"block"}},isAbove:function(){return"above"===this.openDirection||"top"===this.openDirection||"below"!==this.openDirection&&"bottom"!==this.openDirection&&"above"===this.preferredOpenDirection},showSearchInput:function(){return this.searchable&&(!this.hasSingleSelectedSlot||!this.visibleSingleValue&&0!==this.visibleSingleValue||this.isOpen)}}}},function(t,e,n){var i=n(1)("unscopables"),r=Array.prototype;void 0==r[i]&&n(8)(r,i,{}),t.exports=function(t){r[i][t]=!0}},function(t,e,n){var i=n(18),r=n(19),o=n(85);t.exports=function(t){return function(e,n,s){var u,a=i(e),l=r(a.length),c=o(s,l);if(t&&n!=n){for(;l>c;)if((u=a[c++])!=u)return!0}else for(;l>c;c++)if((t||c in a)&&a[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var i=n(9),r=n(1)("toStringTag"),o="Arguments"==i(function(){return arguments}()),s=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=s(e=Object(t),r))?n:o?i(e):"Object"==(u=i(e))&&"function"==typeof e.callee?"Arguments":u}},function(t,e,n){"use strict";var i=n(2);t.exports=function(){var t=i(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},function(t,e,n){var i=n(0).document;t.exports=i&&i.documentElement},function(t,e,n){t.exports=!n(4)&&!n(7)(function(){return 7!=Object.defineProperty(n(21)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var i=n(9);t.exports=Array.isArray||function(t){return"Array"==i(t)}},function(t,e,n){"use strict";function i(t){var e,n;this.promise=new t(function(t,i){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=i}),this.resolve=r(e),this.reject=r(n)}var r=n(14);t.exports.f=function(t){return new i(t)}},function(t,e,n){var i=n(2),r=n(76),o=n(22),s=n(27)("IE_PROTO"),u=function(){},a=function(){var t,e=n(21)("iframe"),i=o.length;for(e.style.display="none",n(40).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;i--;)delete a.prototype[o[i]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(u.prototype=i(t),n=new u,u.prototype=null,n[s]=t):n=a(),void 0===e?n:r(n,e)}},function(t,e,n){var i=n(79),r=n(25),o=n(18),s=n(29),u=n(12),a=n(41),l=Object.getOwnPropertyDescriptor;e.f=n(4)?l:function(t,e){if(t=o(t),e=s(e,!0),a)try{return l(t,e)}catch(t){}if(u(t,e))return r(!i.f.call(t,e),t[e])}},function(t,e,n){var i=n(12),r=n(18),o=n(37)(!1),s=n(27)("IE_PROTO");t.exports=function(t,e){var n,u=r(t),a=0,l=[];for(n in u)n!=s&&i(u,n)&&l.push(n);for(;e.length>a;)i(u,n=e[a++])&&(~o(l,n)||l.push(n));return l}},function(t,e,n){var i=n(46),r=n(22);t.exports=Object.keys||function(t){return i(t,r)}},function(t,e,n){var i=n(2),r=n(5),o=n(43);t.exports=function(t,e){if(i(t),r(e)&&e.constructor===t)return e;var n=o.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){var i=n(10),r=n(0),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:i.version,mode:n(24)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e,n){var i=n(2),r=n(14),o=n(1)("species");t.exports=function(t,e){var n,s=i(t).constructor;return void 0===s||void 0==(n=i(s)[o])?e:r(n)}},function(t,e,n){var i=n(3),r=n(16),o=n(7),s=n(84),u="["+s+"]",a="​",l=RegExp("^"+u+u+"*"),c=RegExp(u+u+"*$"),f=function(t,e,n){var r={},u=o(function(){return!!s[t]()||a[t]()!=a}),l=r[t]=u?e(p):s[t];n&&(r[n]=l),i(i.P+i.F*u,"String",r)},p=f.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(c,"")),t};t.exports=f},function(t,e,n){var i,r,o,s=n(11),u=n(68),a=n(40),l=n(21),c=n(0),f=c.process,p=c.setImmediate,h=c.clearImmediate,d=c.MessageChannel,v=c.Dispatch,g=0,y={},m=function(){var t=+this;if(y.hasOwnProperty(t)){var e=y[t];delete y[t],e()}},b=function(t){m.call(t.data)};p&&h||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return y[++g]=function(){u("function"==typeof t?t:Function(t),e)},i(g),g},h=function(t){delete y[t]},"process"==n(9)(f)?i=function(t){f.nextTick(s(m,t,1))}:v&&v.now?i=function(t){v.now(s(m,t,1))}:d?(r=new d,o=r.port2,r.port1.onmessage=b,i=s(o.postMessage,o,1)):c.addEventListener&&"function"==typeof postMessage&&!c.importScripts?(i=function(t){c.postMessage(t+"","*")},c.addEventListener("message",b,!1)):i="onreadystatechange"in l("script")?function(t){a.appendChild(l("script")).onreadystatechange=function(){a.removeChild(this),m.call(t)}}:function(t){setTimeout(s(m,t,1),0)}),t.exports={set:p,clear:h}},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e,n){"use strict";var i=n(3),r=n(20)(5),o=!0;"find"in[]&&Array(1).find(function(){o=!1}),i(i.P+i.F*o,"Array",{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n(36)("find")},function(t,e,n){"use strict";var i,r,o,s,u=n(24),a=n(0),l=n(11),c=n(38),f=n(3),p=n(5),h=n(14),d=n(61),v=n(66),g=n(50),y=n(52).set,m=n(75)(),b=n(43),_=n(80),x=n(86),w=n(48),S=a.TypeError,O=a.process,L=O&&O.versions,k=L&&L.v8||"",P=a.Promise,T="process"==c(O),V=function(){},E=r=b.f,A=!!function(){try{var t=P.resolve(1),e=(t.constructor={})[n(1)("species")]=function(t){t(V,V)};return(T||"function"==typeof PromiseRejectionEvent)&&t.then(V)instanceof e&&0!==k.indexOf("6.6")&&-1===x.indexOf("Chrome/66")}catch(t){}}(),C=function(t){var e;return!(!p(t)||"function"!=typeof(e=t.then))&&e},D=function(t,e){if(!t._n){t._n=!0;var n=t._c;m(function(){for(var i=t._v,r=1==t._s,o=0;n.length>o;)!function(e){var n,o,s,u=r?e.ok:e.fail,a=e.resolve,l=e.reject,c=e.domain;try{u?(r||(2==t._h&&$(t),t._h=1),!0===u?n=i:(c&&c.enter(),n=u(i),c&&(c.exit(),s=!0)),n===e.promise?l(S("Promise-chain cycle")):(o=C(n))?o.call(n,a,l):a(n)):l(i)}catch(t){c&&!s&&c.exit(),l(t)}}(n[o++]);t._c=[],t._n=!1,e&&!t._h&&j(t)})}},j=function(t){y.call(a,function(){var e,n,i,r=t._v,o=N(t);if(o&&(e=_(function(){T?O.emit("unhandledRejection",r,t):(n=a.onunhandledrejection)?n({promise:t,reason:r}):(i=a.console)&&i.error&&i.error("Unhandled promise rejection",r)}),t._h=T||N(t)?2:1),t._a=void 0,o&&e.e)throw e.v})},N=function(t){return 1!==t._h&&0===(t._a||t._c).length},$=function(t){y.call(a,function(){var e;T?O.emit("rejectionHandled",t):(e=a.onrejectionhandled)&&e({promise:t,reason:t._v})})},F=function(t){var e=this;e._d||(e._d=!0,e=e._w||e,e._v=t,e._s=2,e._a||(e._a=e._c.slice()),D(e,!0))},M=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw S("Promise can't be resolved itself");(e=C(t))?m(function(){var i={_w:n,_d:!1};try{e.call(t,l(M,i,1),l(F,i,1))}catch(t){F.call(i,t)}}):(n._v=t,n._s=1,D(n,!1))}catch(t){F.call({_w:n,_d:!1},t)}}};A||(P=function(t){d(this,P,"Promise","_h"),h(t),i.call(this);try{t(l(M,this,1),l(F,this,1))}catch(t){F.call(this,t)}},i=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},i.prototype=n(81)(P.prototype,{then:function(t,e){var n=E(g(this,P));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=T?O.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&D(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),o=function(){var t=new i;this.promise=t,this.resolve=l(M,t,1),this.reject=l(F,t,1)},b.f=E=function(t){return t===P||t===s?new o(t):r(t)}),f(f.G+f.W+f.F*!A,{Promise:P}),n(26)(P,"Promise"),n(83)("Promise"),s=n(10).Promise,f(f.S+f.F*!A,"Promise",{reject:function(t){var e=E(this);return(0,e.reject)(t),e.promise}}),f(f.S+f.F*(u||!A),"Promise",{resolve:function(t){return w(u&&this===s?P:this,t)}}),f(f.S+f.F*!(A&&n(73)(function(t){P.all(t).catch(V)})),"Promise",{all:function(t){var e=this,n=E(e),i=n.resolve,r=n.reject,o=_(function(){var n=[],o=0,s=1;v(t,!1,function(t){var u=o++,a=!1;n.push(void 0),s++,e.resolve(t).then(function(t){a||(a=!0,n[u]=t,--s||i(n))},r)}),--s||i(n)});return o.e&&r(o.v),n.promise},race:function(t){var e=this,n=E(e),i=n.reject,r=_(function(){v(t,!1,function(t){e.resolve(t).then(n.resolve,i)})});return r.e&&i(r.v),n.promise}})},function(t,e,n){"use strict";var i=n(3),r=n(10),o=n(0),s=n(50),u=n(48);i(i.P+i.R,"Promise",{finally:function(t){var e=s(this,r.Promise||o.Promise),n="function"==typeof t;return this.then(n?function(n){return u(e,t()).then(function(){return n})}:t,n?function(n){return u(e,t()).then(function(){throw n})}:t)}})},function(t,e,n){"use strict";function i(t){n(99)}var r=n(35),o=n(101),s=n(100),u=i,a=s(r.a,o.a,!1,u,null,null);e.a=a.exports},function(t,e,n){"use strict";function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.a=i},function(t,e,n){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t){return(r="function"==typeof Symbol&&"symbol"===i(Symbol.iterator)?function(t){return i(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":i(t)})(t)}e.a=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(34),r=(n.n(i),n(55)),o=(n.n(r),n(56)),s=(n.n(o),n(57)),u=n(32),a=n(33);n.d(e,"Multiselect",function(){return s.a}),n.d(e,"multiselectMixin",function(){return u.a}),n.d(e,"pointerMixin",function(){return a.a}),e.default=s.a},function(t,e){t.exports=function(t,e,n,i){if(!(t instanceof e)||void 0!==i&&i in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var i=n(14),r=n(28),o=n(23),s=n(19);t.exports=function(t,e,n,u,a){i(e);var l=r(t),c=o(l),f=s(l.length),p=a?f-1:0,h=a?-1:1;if(n<2)for(;;){if(p in c){u=c[p],p+=h;break}if(p+=h,a?p<0:f<=p)throw TypeError("Reduce of empty array with no initial value")}for(;a?p>=0:f>p;p+=h)p in c&&(u=e(u,c[p],p,l));return u}},function(t,e,n){var i=n(5),r=n(42),o=n(1)("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),i(e)&&null===(e=e[o])&&(e=void 0)),void 0===e?Array:e}},function(t,e,n){var i=n(63);t.exports=function(t,e){return new(i(t))(e)}},function(t,e,n){"use strict";var i=n(8),r=n(6),o=n(7),s=n(16),u=n(1);t.exports=function(t,e,n){var a=u(t),l=n(s,a,""[t]),c=l[0],f=l[1];o(function(){var e={};return e[a]=function(){return 7},7!=""[t](e)})&&(r(String.prototype,t,c),i(RegExp.prototype,a,2==e?function(t,e){return f.call(t,this,e)}:function(t){return f.call(t,this)}))}},function(t,e,n){var i=n(11),r=n(70),o=n(69),s=n(2),u=n(19),a=n(87),l={},c={},e=t.exports=function(t,e,n,f,p){var h,d,v,g,y=p?function(){return t}:a(t),m=i(n,f,e?2:1),b=0;if("function"!=typeof y)throw TypeError(t+" is not iterable!");if(o(y)){for(h=u(t.length);h>b;b++)if((g=e?m(s(d=t[b])[0],d[1]):m(t[b]))===l||g===c)return g}else for(v=y.call(t);!(d=v.next()).done;)if((g=r(v,m,d.value,e))===l||g===c)return g};e.BREAK=l,e.RETURN=c},function(t,e,n){var i=n(5),r=n(82).set;t.exports=function(t,e,n){var o,s=e.constructor;return s!==n&&"function"==typeof s&&(o=s.prototype)!==n.prototype&&i(o)&&r&&r(t,o),t}},function(t,e){t.exports=function(t,e,n){var i=void 0===n;switch(e.length){case 0:return i?t():t.call(n);case 1:return i?t(e[0]):t.call(n,e[0]);case 2:return i?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return i?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return i?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){var i=n(15),r=n(1)("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(i.Array===t||o[r]===t)}},function(t,e,n){var i=n(2);t.exports=function(t,e,n,r){try{return r?e(i(n)[0],n[1]):e(n)}catch(e){var o=t.return;throw void 0!==o&&i(o.call(t)),e}}},function(t,e,n){"use strict";var i=n(44),r=n(25),o=n(26),s={};n(8)(s,n(1)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(s,{next:r(1,n)}),o(t,e+" Iterator")}},function(t,e,n){"use strict";var i=n(24),r=n(3),o=n(6),s=n(8),u=n(15),a=n(71),l=n(26),c=n(78),f=n(1)("iterator"),p=!([].keys&&"next"in[].keys()),h=function(){return this};t.exports=function(t,e,n,d,v,g,y){a(n,e,d);var m,b,_,x=function(t){if(!p&&t in L)return L[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},w=e+" Iterator",S="values"==v,O=!1,L=t.prototype,k=L[f]||L["@@iterator"]||v&&L[v],P=k||x(v),T=v?S?x("entries"):P:void 0,V="Array"==e?L.entries||k:k;if(V&&(_=c(V.call(new t)))!==Object.prototype&&_.next&&(l(_,w,!0),i||"function"==typeof _[f]||s(_,f,h)),S&&k&&"values"!==k.name&&(O=!0,P=function(){return k.call(this)}),i&&!y||!p&&!O&&L[f]||s(L,f,P),u[e]=P,u[w]=h,v)if(m={values:S?P:x("values"),keys:g?P:x("keys"),entries:T},y)for(b in m)b in L||o(L,b,m[b]);else r(r.P+r.F*(p||O),e,m);return m}},function(t,e,n){var i=n(1)("iterator"),r=!1;try{var o=[7][i]();o.return=function(){r=!0},Array.from(o,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!r)return!1;var n=!1;try{var o=[7],s=o[i]();s.next=function(){return{done:n=!0}},o[i]=function(){return s},t(o)}catch(t){}return n}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var i=n(0),r=n(52).set,o=i.MutationObserver||i.WebKitMutationObserver,s=i.process,u=i.Promise,a="process"==n(9)(s);t.exports=function(){var t,e,n,l=function(){var i,r;for(a&&(i=s.domain)&&i.exit();t;){r=t.fn,t=t.next;try{r()}catch(i){throw t?n():e=void 0,i}}e=void 0,i&&i.enter()};if(a)n=function(){s.nextTick(l)};else if(!o||i.navigator&&i.navigator.standalone)if(u&&u.resolve){var c=u.resolve(void 0);n=function(){c.then(l)}}else n=function(){r.call(i,l)};else{var f=!0,p=document.createTextNode("");new o(l).observe(p,{characterData:!0}),n=function(){p.data=f=!f}}return function(i){var r={fn:i,next:void 0};e&&(e.next=r),t||(t=r,n()),e=r}}},function(t,e,n){var i=n(13),r=n(2),o=n(47);t.exports=n(4)?Object.defineProperties:function(t,e){r(t);for(var n,s=o(e),u=s.length,a=0;u>a;)i.f(t,n=s[a++],e[n]);return t}},function(t,e,n){var i=n(46),r=n(22).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,r)}},function(t,e,n){var i=n(12),r=n(28),o=n(27)("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),i(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,e,n){var i=n(6);t.exports=function(t,e,n){for(var r in e)i(t,r,e[r],n);return t}},function(t,e,n){var i=n(5),r=n(2),o=function(t,e){if(r(t),!i(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,i){try{i=n(11)(Function.call,n(45).f(Object.prototype,"__proto__").set,2),i(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return o(t,n),e?t.__proto__=n:i(t,n),t}}({},!1):void 0),check:o}},function(t,e,n){"use strict";var i=n(0),r=n(13),o=n(4),s=n(1)("species");t.exports=function(t){var e=i[t];o&&e&&!e[s]&&r.f(e,s,{configurable:!0,get:function(){return this}})}},function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},function(t,e,n){var i=n(53),r=Math.max,o=Math.min;t.exports=function(t,e){return t=i(t),t<0?r(t+e,0):o(t,e)}},function(t,e,n){var i=n(0),r=i.navigator;t.exports=r&&r.userAgent||""},function(t,e,n){var i=n(38),r=n(1)("iterator"),o=n(15);t.exports=n(10).getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||o[i(t)]}},function(t,e,n){"use strict";var i=n(3),r=n(20)(2);i(i.P+i.F*!n(17)([].filter,!0),"Array",{filter:function(t){return r(this,t,arguments[1])}})},function(t,e,n){"use strict";var i=n(3),r=n(37)(!1),o=[].indexOf,s=!!o&&1/[1].indexOf(1,-0)<0;i(i.P+i.F*(s||!n(17)(o)),"Array",{indexOf:function(t){return s?o.apply(this,arguments)||0:r(this,t,arguments[1])}})},function(t,e,n){var i=n(3);i(i.S,"Array",{isArray:n(42)})},function(t,e,n){"use strict";var i=n(3),r=n(20)(1);i(i.P+i.F*!n(17)([].map,!0),"Array",{map:function(t){return r(this,t,arguments[1])}})},function(t,e,n){"use strict";var i=n(3),r=n(62);i(i.P+i.F*!n(17)([].reduce,!0),"Array",{reduce:function(t){return r(this,t,arguments.length,arguments[1],!1)}})},function(t,e,n){var i=Date.prototype,r=i.toString,o=i.getTime;new Date(NaN)+""!="Invalid Date"&&n(6)(i,"toString",function(){var t=o.call(this);return t===t?r.call(this):"Invalid Date"})},function(t,e,n){n(4)&&"g"!=/./g.flags&&n(13).f(RegExp.prototype,"flags",{configurable:!0,get:n(39)})},function(t,e,n){n(65)("search",1,function(t,e,n){return[function(n){"use strict";var i=t(this),r=void 0==n?void 0:n[e];return void 0!==r?r.call(n,i):new RegExp(n)[e](String(i))},n]})},function(t,e,n){"use strict";n(94);var i=n(2),r=n(39),o=n(4),s=/./.toString,u=function(t){n(6)(RegExp.prototype,"toString",t,!0)};n(7)(function(){return"/a/b"!=s.call({source:"a",flags:"b"})})?u(function(){var t=i(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?r.call(t):void 0)}):"toString"!=s.name&&u(function(){return s.call(this)})},function(t,e,n){"use strict";n(51)("trim",function(t){return function(){return t(this,3)}})},function(t,e,n){for(var i=n(34),r=n(47),o=n(6),s=n(0),u=n(8),a=n(15),l=n(1),c=l("iterator"),f=l("toStringTag"),p=a.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=r(h),v=0;v<d.length;v++){var g,y=d[v],m=h[y],b=s[y],_=b&&b.prototype;if(_&&(_[c]||u(_,c,p),_[f]||u(_,f,y),a[y]=p,m))for(g in i)_[g]||o(_,g,i[g],!0)}},function(t,e){},function(t,e){t.exports=function(t,e,n,i,r,o){var s,u=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(s=t,u=t.default);var l="function"==typeof u?u.options:u;e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),r&&(l._scopeId=r);var c;if(o?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},l._ssrRegister=c):i&&(c=i),c){var f=l.functional,p=f?l.render:l.beforeCreate;f?(l._injectStyles=c,l.render=function(t,e){return c.call(e),p(t,e)}):l.beforeCreate=p?[].concat(p,c):[c]}return{esModule:s,exports:u,options:l}}},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"multiselect",class:{"multiselect--active":t.isOpen,"multiselect--disabled":t.disabled,"multiselect--above":t.isAbove},attrs:{tabindex:t.searchable?-1:t.tabindex},on:{focus:function(e){t.activate()},blur:function(e){!t.searchable&&t.deactivate()},keydown:[function(e){return"button"in e||!t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerForward()):null},function(e){return"button"in e||!t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerBackward()):null}],keypress:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")||!t._k(e.keyCode,"tab",9,e.key,"Tab")?(e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate()}}},[t._t("caret",[n("div",{staticClass:"multiselect__select",on:{mousedown:function(e){e.preventDefault(),e.stopPropagation(),t.toggle()}}})],{toggle:t.toggle}),t._v(" "),t._t("clear",null,{search:t.search}),t._v(" "),n("div",{ref:"tags",staticClass:"multiselect__tags"},[t._t("selection",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visibleValues.length>0,expression:"visibleValues.length > 0"}],staticClass:"multiselect__tags-wrap"},[t._l(t.visibleValues,function(e,i){return[t._t("tag",[n("span",{key:i,staticClass:"multiselect__tag"},[n("span",{domProps:{textContent:t._s(t.getOptionLabel(e))}}),t._v(" "),n("i",{staticClass:"multiselect__tag-icon",attrs:{"aria-hidden":"true",tabindex:"1"},on:{keypress:function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13,n.key,"Enter"))return null;n.preventDefault(),t.removeElement(e)},mousedown:function(n){n.preventDefault(),t.removeElement(e)}}})])],{option:e,search:t.search,remove:t.removeElement})]})],2),t._v(" "),t.internalValue&&t.internalValue.length>t.limit?[t._t("limit",[n("strong",{staticClass:"multiselect__strong",domProps:{textContent:t._s(t.limitText(t.internalValue.length-t.limit))}})])]:t._e()],{search:t.search,remove:t.removeElement,values:t.visibleValues,isOpen:t.isOpen}),t._v(" "),n("transition",{attrs:{name:"multiselect__loading"}},[t._t("loading",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"multiselect__spinner"})])],2),t._v(" "),t.searchable?n("input",{ref:"search",staticClass:"multiselect__input",style:t.inputStyle,attrs:{name:t.name,id:t.id,type:"text",autocomplete:"nope",placeholder:t.placeholder,disabled:t.disabled,tabindex:t.tabindex},domProps:{value:t.search},on:{input:function(e){t.updateSearch(e.target.value)},focus:function(e){e.preventDefault(),t.activate()},blur:function(e){e.preventDefault(),t.deactivate()},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate()},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"]))return null;e.preventDefault(),t.pointerForward()},function(e){if(!("button"in e)&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"]))return null;e.preventDefault(),t.pointerBackward()},function(e){if(!("button"in e)&&t._k(e.keyCode,"delete",[8,46],e.key,["Backspace","Delete"]))return null;e.stopPropagation(),t.removeLastElement()}],keypress:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?(e.preventDefault(),e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null}}}):t._e(),t._v(" "),t.isSingleLabelVisible?n("span",{staticClass:"multiselect__single",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("singleLabel",[[t._v(t._s(t.currentOptionLabel))]],{option:t.singleValue})],2):t._e(),t._v(" "),t.isPlaceholderVisible?n("span",{staticClass:"multiselect__placeholder",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("placeholder",[t._v("\n          "+t._s(t.placeholder)+"\n        ")])],2):t._e()],2),t._v(" "),n("transition",{attrs:{name:"multiselect"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],ref:"list",staticClass:"multiselect__content-wrapper",style:{maxHeight:t.optimizedHeight+"px"},attrs:{tabindex:"-1"},on:{focus:t.activate,mousedown:function(t){t.preventDefault()}}},[n("ul",{staticClass:"multiselect__content",style:t.contentStyle},[t._t("beforeList"),t._v(" "),t.multiple&&t.max===t.internalValue.length?n("li",[n("span",{staticClass:"multiselect__option"},[t._t("maxElements",[t._v("Maximum of "+t._s(t.max)+" options selected. First remove a selected option to select another.")])],2)]):t._e(),t._v(" "),!t.max||t.internalValue.length<t.max?t._l(t.filteredOptions,function(e,i){return n("li",{key:i,staticClass:"multiselect__element"},[e&&(e.$isLabel||e.$isDisabled)?t._e():n("span",{staticClass:"multiselect__option",class:t.optionHighlight(i,e),attrs:{"data-select":e&&e.isTag?t.tagPlaceholder:t.selectLabelText,"data-selected":t.selectedLabelText,"data-deselect":t.deselectLabelText},on:{click:function(n){n.stopPropagation(),t.select(e)},mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.pointerSet(i)}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2),t._v(" "),e&&(e.$isLabel||e.$isDisabled)?n("span",{staticClass:"multiselect__option",class:t.groupHighlight(i,e),attrs:{"data-select":t.groupSelect&&t.selectGroupLabelText,"data-deselect":t.groupSelect&&t.deselectGroupLabelText},on:{mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.groupSelect&&t.pointerSet(i)},mousedown:function(n){n.preventDefault(),t.selectGroup(e)}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2):t._e()])}):t._e(),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoResults&&0===t.filteredOptions.length&&t.search&&!t.loading,expression:"showNoResults && (filteredOptions.length === 0 && search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noResult",[t._v("No elements found. Consider changing the search query.")],{search:t.search})],2)]),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoOptions&&0===t.options.length&&!t.search&&!t.loading,expression:"showNoOptions && (options.length === 0 && !search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noOptions",[t._v("List is empty.")])],2)]),t._v(" "),t._t("afterList")],2)])])],2)},r=[],o={render:i,staticRenderFns:r};e.a=o}])});

/***/ }),

/***/ "./node_modules/vue/dist/vue.common.dev.js":
/*!*************************************************!*\
  !*** ./node_modules/vue/dist/vue.common.dev.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (!config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (!isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
      warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (!config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (!(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead.",
        el.rawAttrsMap['v-model']
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.',
          el.rawAttrsMap['style']
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (!stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (i > pos || !tagName &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag."),
            { start: stack[i].start, end: stack[i].end }
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        {
          checkRootConstraints(element);
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else {
        warnOnce(
          "Component template should contain exactly one root element. " +
          "If you are using v-if on multiple elements, " +
          "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated
          }, {});
        }
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(
              "Invalid dynamic argument expression: attribute names cannot contain " +
              "spaces, quotes, <, >, / or =.",
              {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              }
            );
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.',
          { start: element.start }
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (options.outputSourceRange) {
        element.end = end$1;
      }
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    {
      if (el.tag === 'template') {
        warn$2(
          "<template> cannot be keyed. Place the key on real elements instead.",
          getRawBindingAttr(el, 'key')
        );
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys.",
            getRawBindingAttr(el, 'key'),
            true /* tip */
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$2(
        ("Invalid v-for expression: " + exp),
        el.rawAttrsMap['v-for']
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if.",
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored.",
          children[i]
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (slotScope) {
      warn$2(
        "the \"scope\" attribute for scoped slots have been deprecated and " +
        "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
        "can also be used on plain elements in addition to <template> to " +
        "denote scoped slots.",
        el.rawAttrsMap['scope'],
        true
      );
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (el.attrsMap['v-for']) {
      warn$2(
        "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
        "(v-for takes higher priority). Use a wrapper <template> for the " +
        "scoped slot to make it clearer.",
        el.rawAttrsMap['slot-scope'],
        true
      );
    }
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        {
          if (el.slotTarget || el.slotScope) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(
              "<template v-slot> can only appear at the root level inside " +
              "the receiving the component",
              el
            );
          }
        }
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        {
          if (!maybeComponent(el)) {
            warn$2(
              "v-slot can only be used on components or <template>.",
              slotBinding$1
            );
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.scopedSlots) {
            warn$2(
              "To avoid scope ambiguity, the default slot should also use " +
              "<template> syntax when there are other named slots.",
              slotBinding$1
            );
          }
        }
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else {
      warn$2(
        "v-slot shorthand syntax requires a slot name.",
        binding
      );
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead.",
        getRawBindingAttr(el, 'key')
      );
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          value.trim().length === 0
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          );
        }
      }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*(?:[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap['v-once']
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (el.children.length !== 1 || ast.type !== 1) {
    state.warn(
      'Inline-template components must have exactly one child element.',
      { start: el.start }
    );
  }
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1(
              "Error compiling template:\n\n" + (e.msg) + "\n\n" +
              generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn$$1(
            "Error compiling template:\n\n" + template + "\n\n" +
            compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (options.outputSourceRange) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = { msg: msg };
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (!template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/vue/dist/vue.common.js":
/*!*********************************************!*\
  !*** ./node_modules/vue/dist/vue.common.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (false) {} else {
  module.exports = __webpack_require__(/*! ./vue.common.dev.js */ "./node_modules/vue/dist/vue.common.dev.js")
}


/***/ }),

/***/ "./node_modules/vuex/dist/vuex.esm.js":
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.1.2
 * (c) 2019 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if (true) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if (true) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return result.then(function (res) {
    try {
      this$1._actionSubscribers
        .filter(function (sub) { return sub.after; })
        .forEach(function (sub) { return sub.after(action, this$1.state); });
    } catch (e) {
      if (true) {
        console.warn("[vuex] error in after action subscribers: ");
        console.error(e);
      }
    }
    return res
  })
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && "development" !== 'production') {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if (true) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if ( true && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if ( true && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if ( true && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if ( true && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.1.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var es6_promise_auto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! es6-promise/auto */ "./node_modules/es6-promise/auto.js");
/* harmony import */ var es6_promise_auto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(es6_promise_auto__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store/store */ "./resources/js/store/store.js");
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */



/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('base-footer', __webpack_require__(/*! ./components/Footer/BaseFooter.vue */ "./resources/js/components/Footer/BaseFooter.vue")["default"]);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('base-header', __webpack_require__(/*! ./components/Header/BaseHeader.vue */ "./resources/js/components/Header/BaseHeader.vue")["default"]);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('content-flashs', __webpack_require__(/*! ./components/Content/Flashs/ContentFlashs */ "./resources/js/components/Content/Flashs/ContentFlashs.vue")["default"]);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('content-header', __webpack_require__(/*! ./components/Content/Header/ContentHeader */ "./resources/js/components/Content/Header/ContentHeader.vue")["default"]);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('content-header-buttons', __webpack_require__(/*! ./components/Content/Header/ContentHeaderButtons */ "./resources/js/components/Content/Header/ContentHeaderButtons.vue")["default"]);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('breadcrumb', __webpack_require__(/*! ./components/Content/Header/Breadcrumb */ "./resources/js/components/Content/Header/Breadcrumb.vue")["default"]);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('login-page', __webpack_require__(/*! ./components/Pages/LoginPage.vue */ "./resources/js/components/Pages/LoginPage.vue")["default"]);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('base-table', __webpack_require__(/*! ./components/Tables/BaseTable.vue */ "./resources/js/components/Tables/BaseTable.vue")["default"]);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('composite-test-create', __webpack_require__(/*! ./components/Form/CompositeTestCreate.vue */ "./resources/js/components/Form/CompositeTestCreate.vue")["default"]);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.directive('focus', {
  inserted: function inserted(el) {
    el.focus();
  }
});
vue__WEBPACK_IMPORTED_MODULE_0___default.a.directive('click-outside', {
  bind: function bind(el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };

    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind: function unbind(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
});
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

var app = new vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  el: '#app',
  store: _store_store__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./resources/js/components/Content/Flashs/ContentFlashs.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/Content/Flashs/ContentFlashs.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ContentFlashs_vue_vue_type_template_id_41754491___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContentFlashs.vue?vue&type=template&id=41754491& */ "./resources/js/components/Content/Flashs/ContentFlashs.vue?vue&type=template&id=41754491&");
/* harmony import */ var _ContentFlashs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContentFlashs.vue?vue&type=script&lang=js& */ "./resources/js/components/Content/Flashs/ContentFlashs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ContentFlashs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ContentFlashs_vue_vue_type_template_id_41754491___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ContentFlashs_vue_vue_type_template_id_41754491___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Content/Flashs/ContentFlashs.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Content/Flashs/ContentFlashs.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/Content/Flashs/ContentFlashs.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFlashs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ContentFlashs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Flashs/ContentFlashs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFlashs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Content/Flashs/ContentFlashs.vue?vue&type=template&id=41754491&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/Content/Flashs/ContentFlashs.vue?vue&type=template&id=41754491& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFlashs_vue_vue_type_template_id_41754491___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ContentFlashs.vue?vue&type=template&id=41754491& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Flashs/ContentFlashs.vue?vue&type=template&id=41754491&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFlashs_vue_vue_type_template_id_41754491___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentFlashs_vue_vue_type_template_id_41754491___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Content/Header/Breadcrumb.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/Content/Header/Breadcrumb.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Breadcrumb_vue_vue_type_template_id_6836fd54___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Breadcrumb.vue?vue&type=template&id=6836fd54& */ "./resources/js/components/Content/Header/Breadcrumb.vue?vue&type=template&id=6836fd54&");
/* harmony import */ var _Breadcrumb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Breadcrumb.vue?vue&type=script&lang=js& */ "./resources/js/components/Content/Header/Breadcrumb.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Breadcrumb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Breadcrumb_vue_vue_type_template_id_6836fd54___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Breadcrumb_vue_vue_type_template_id_6836fd54___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Content/Header/Breadcrumb.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Content/Header/Breadcrumb.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Content/Header/Breadcrumb.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Breadcrumb.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Header/Breadcrumb.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Content/Header/Breadcrumb.vue?vue&type=template&id=6836fd54&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Content/Header/Breadcrumb.vue?vue&type=template&id=6836fd54& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_template_id_6836fd54___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Breadcrumb.vue?vue&type=template&id=6836fd54& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Header/Breadcrumb.vue?vue&type=template&id=6836fd54&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_template_id_6836fd54___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_template_id_6836fd54___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Content/Header/ContentHeader.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/Content/Header/ContentHeader.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ContentHeader_vue_vue_type_template_id_a6beadb6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContentHeader.vue?vue&type=template&id=a6beadb6& */ "./resources/js/components/Content/Header/ContentHeader.vue?vue&type=template&id=a6beadb6&");
/* harmony import */ var _ContentHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContentHeader.vue?vue&type=script&lang=js& */ "./resources/js/components/Content/Header/ContentHeader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ContentHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ContentHeader_vue_vue_type_template_id_a6beadb6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ContentHeader_vue_vue_type_template_id_a6beadb6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Content/Header/ContentHeader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Content/Header/ContentHeader.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/Content/Header/ContentHeader.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ContentHeader.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Header/ContentHeader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Content/Header/ContentHeader.vue?vue&type=template&id=a6beadb6&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/Content/Header/ContentHeader.vue?vue&type=template&id=a6beadb6& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeader_vue_vue_type_template_id_a6beadb6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ContentHeader.vue?vue&type=template&id=a6beadb6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Header/ContentHeader.vue?vue&type=template&id=a6beadb6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeader_vue_vue_type_template_id_a6beadb6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeader_vue_vue_type_template_id_a6beadb6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Content/Header/ContentHeaderButtons.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/components/Content/Header/ContentHeaderButtons.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ContentHeaderButtons_vue_vue_type_template_id_6b00724c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContentHeaderButtons.vue?vue&type=template&id=6b00724c& */ "./resources/js/components/Content/Header/ContentHeaderButtons.vue?vue&type=template&id=6b00724c&");
/* harmony import */ var _ContentHeaderButtons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContentHeaderButtons.vue?vue&type=script&lang=js& */ "./resources/js/components/Content/Header/ContentHeaderButtons.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ContentHeaderButtons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ContentHeaderButtons_vue_vue_type_template_id_6b00724c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ContentHeaderButtons_vue_vue_type_template_id_6b00724c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Content/Header/ContentHeaderButtons.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Content/Header/ContentHeaderButtons.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/Content/Header/ContentHeaderButtons.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeaderButtons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ContentHeaderButtons.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Header/ContentHeaderButtons.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeaderButtons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Content/Header/ContentHeaderButtons.vue?vue&type=template&id=6b00724c&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/Content/Header/ContentHeaderButtons.vue?vue&type=template&id=6b00724c& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeaderButtons_vue_vue_type_template_id_6b00724c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ContentHeaderButtons.vue?vue&type=template&id=6b00724c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Content/Header/ContentHeaderButtons.vue?vue&type=template&id=6b00724c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeaderButtons_vue_vue_type_template_id_6b00724c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeaderButtons_vue_vue_type_template_id_6b00724c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Footer/BaseFooter.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/Footer/BaseFooter.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseFooter_vue_vue_type_template_id_158e43f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseFooter.vue?vue&type=template&id=158e43f6& */ "./resources/js/components/Footer/BaseFooter.vue?vue&type=template&id=158e43f6&");
/* harmony import */ var _BaseFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseFooter.vue?vue&type=script&lang=js& */ "./resources/js/components/Footer/BaseFooter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BaseFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BaseFooter_vue_vue_type_template_id_158e43f6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BaseFooter_vue_vue_type_template_id_158e43f6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Footer/BaseFooter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Footer/BaseFooter.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/Footer/BaseFooter.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./BaseFooter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Footer/BaseFooter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Footer/BaseFooter.vue?vue&type=template&id=158e43f6&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/Footer/BaseFooter.vue?vue&type=template&id=158e43f6& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseFooter_vue_vue_type_template_id_158e43f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./BaseFooter.vue?vue&type=template&id=158e43f6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Footer/BaseFooter.vue?vue&type=template&id=158e43f6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseFooter_vue_vue_type_template_id_158e43f6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseFooter_vue_vue_type_template_id_158e43f6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Form/CompositeTestCreate.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/Form/CompositeTestCreate.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CompositeTestCreate_vue_vue_type_template_id_3b9482d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CompositeTestCreate.vue?vue&type=template&id=3b9482d6& */ "./resources/js/components/Form/CompositeTestCreate.vue?vue&type=template&id=3b9482d6&");
/* harmony import */ var _CompositeTestCreate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CompositeTestCreate.vue?vue&type=script&lang=js& */ "./resources/js/components/Form/CompositeTestCreate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var vue_multiselect_dist_vue_multiselect_min_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css& */ "./node_modules/vue-multiselect/dist/vue-multiselect.min.css?vue&type=style&index=0&lang=css&");
/* harmony import */ var _CompositeTestCreate_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CompositeTestCreate.vue?vue&type=style&index=1&lang=css& */ "./resources/js/components/Form/CompositeTestCreate.vue?vue&type=style&index=1&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _CompositeTestCreate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CompositeTestCreate_vue_vue_type_template_id_3b9482d6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CompositeTestCreate_vue_vue_type_template_id_3b9482d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Form/CompositeTestCreate.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Form/CompositeTestCreate.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/Form/CompositeTestCreate.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CompositeTestCreate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CompositeTestCreate.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Form/CompositeTestCreate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CompositeTestCreate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Form/CompositeTestCreate.vue?vue&type=style&index=1&lang=css&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/Form/CompositeTestCreate.vue?vue&type=style&index=1&lang=css& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CompositeTestCreate_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./CompositeTestCreate.vue?vue&type=style&index=1&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Form/CompositeTestCreate.vue?vue&type=style&index=1&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CompositeTestCreate_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CompositeTestCreate_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CompositeTestCreate_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CompositeTestCreate_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CompositeTestCreate_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/Form/CompositeTestCreate.vue?vue&type=template&id=3b9482d6&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/Form/CompositeTestCreate.vue?vue&type=template&id=3b9482d6& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CompositeTestCreate_vue_vue_type_template_id_3b9482d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./CompositeTestCreate.vue?vue&type=template&id=3b9482d6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Form/CompositeTestCreate.vue?vue&type=template&id=3b9482d6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CompositeTestCreate_vue_vue_type_template_id_3b9482d6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CompositeTestCreate_vue_vue_type_template_id_3b9482d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Header/BaseHeader.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/Header/BaseHeader.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseHeader_vue_vue_type_template_id_ca495a76_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseHeader.vue?vue&type=template&id=ca495a76&scoped=true& */ "./resources/js/components/Header/BaseHeader.vue?vue&type=template&id=ca495a76&scoped=true&");
/* harmony import */ var _BaseHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseHeader.vue?vue&type=script&lang=js& */ "./resources/js/components/Header/BaseHeader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _BaseHeader_vue_vue_type_style_index_0_id_ca495a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseHeader.vue?vue&type=style&index=0&id=ca495a76&scoped=true&lang=css& */ "./resources/js/components/Header/BaseHeader.vue?vue&type=style&index=0&id=ca495a76&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BaseHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BaseHeader_vue_vue_type_template_id_ca495a76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BaseHeader_vue_vue_type_template_id_ca495a76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ca495a76",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Header/BaseHeader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Header/BaseHeader.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/Header/BaseHeader.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./BaseHeader.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Header/BaseHeader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Header/BaseHeader.vue?vue&type=style&index=0&id=ca495a76&scoped=true&lang=css&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/Header/BaseHeader.vue?vue&type=style&index=0&id=ca495a76&scoped=true&lang=css& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseHeader_vue_vue_type_style_index_0_id_ca495a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./BaseHeader.vue?vue&type=style&index=0&id=ca495a76&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Header/BaseHeader.vue?vue&type=style&index=0&id=ca495a76&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseHeader_vue_vue_type_style_index_0_id_ca495a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseHeader_vue_vue_type_style_index_0_id_ca495a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseHeader_vue_vue_type_style_index_0_id_ca495a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseHeader_vue_vue_type_style_index_0_id_ca495a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseHeader_vue_vue_type_style_index_0_id_ca495a76_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/Header/BaseHeader.vue?vue&type=template&id=ca495a76&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/Header/BaseHeader.vue?vue&type=template&id=ca495a76&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseHeader_vue_vue_type_template_id_ca495a76_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./BaseHeader.vue?vue&type=template&id=ca495a76&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Header/BaseHeader.vue?vue&type=template&id=ca495a76&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseHeader_vue_vue_type_template_id_ca495a76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseHeader_vue_vue_type_template_id_ca495a76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Pages/LoginPage.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/Pages/LoginPage.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoginPage_vue_vue_type_template_id_ce00b25c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoginPage.vue?vue&type=template&id=ce00b25c&scoped=true& */ "./resources/js/components/Pages/LoginPage.vue?vue&type=template&id=ce00b25c&scoped=true&");
/* harmony import */ var _LoginPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoginPage.vue?vue&type=script&lang=js& */ "./resources/js/components/Pages/LoginPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _LoginPage_vue_vue_type_style_index_0_id_ce00b25c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LoginPage.vue?vue&type=style&index=0&id=ce00b25c&scoped=true&lang=css& */ "./resources/js/components/Pages/LoginPage.vue?vue&type=style&index=0&id=ce00b25c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _LoginPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LoginPage_vue_vue_type_template_id_ce00b25c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LoginPage_vue_vue_type_template_id_ce00b25c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ce00b25c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Pages/LoginPage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Pages/LoginPage.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/Pages/LoginPage.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./LoginPage.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Pages/LoginPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Pages/LoginPage.vue?vue&type=style&index=0&id=ce00b25c&scoped=true&lang=css&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/Pages/LoginPage.vue?vue&type=style&index=0&id=ce00b25c&scoped=true&lang=css& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_style_index_0_id_ce00b25c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./LoginPage.vue?vue&type=style&index=0&id=ce00b25c&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Pages/LoginPage.vue?vue&type=style&index=0&id=ce00b25c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_style_index_0_id_ce00b25c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_style_index_0_id_ce00b25c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_style_index_0_id_ce00b25c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_style_index_0_id_ce00b25c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_style_index_0_id_ce00b25c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/Pages/LoginPage.vue?vue&type=template&id=ce00b25c&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/Pages/LoginPage.vue?vue&type=template&id=ce00b25c&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_template_id_ce00b25c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./LoginPage.vue?vue&type=template&id=ce00b25c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Pages/LoginPage.vue?vue&type=template&id=ce00b25c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_template_id_ce00b25c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_template_id_ce00b25c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Paginations/BasePagination.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/Paginations/BasePagination.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BasePagination_vue_vue_type_template_id_017f744c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasePagination.vue?vue&type=template&id=017f744c& */ "./resources/js/components/Paginations/BasePagination.vue?vue&type=template&id=017f744c&");
/* harmony import */ var _BasePagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasePagination.vue?vue&type=script&lang=js& */ "./resources/js/components/Paginations/BasePagination.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BasePagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BasePagination_vue_vue_type_template_id_017f744c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BasePagination_vue_vue_type_template_id_017f744c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Paginations/BasePagination.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Paginations/BasePagination.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/Paginations/BasePagination.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./BasePagination.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Paginations/BasePagination.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Paginations/BasePagination.vue?vue&type=template&id=017f744c&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/Paginations/BasePagination.vue?vue&type=template&id=017f744c& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePagination_vue_vue_type_template_id_017f744c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./BasePagination.vue?vue&type=template&id=017f744c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Paginations/BasePagination.vue?vue&type=template&id=017f744c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePagination_vue_vue_type_template_id_017f744c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePagination_vue_vue_type_template_id_017f744c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Tables/BaseTable.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/Tables/BaseTable.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseTable_vue_vue_type_template_id_27ed6dc4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTable.vue?vue&type=template&id=27ed6dc4& */ "./resources/js/components/Tables/BaseTable.vue?vue&type=template&id=27ed6dc4&");
/* harmony import */ var _BaseTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseTable.vue?vue&type=script&lang=js& */ "./resources/js/components/Tables/BaseTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BaseTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BaseTable_vue_vue_type_template_id_27ed6dc4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BaseTable_vue_vue_type_template_id_27ed6dc4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Tables/BaseTable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Tables/BaseTable.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/Tables/BaseTable.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./BaseTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tables/BaseTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Tables/BaseTable.vue?vue&type=template&id=27ed6dc4&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/Tables/BaseTable.vue?vue&type=template&id=27ed6dc4& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseTable_vue_vue_type_template_id_27ed6dc4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./BaseTable.vue?vue&type=template&id=27ed6dc4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tables/BaseTable.vue?vue&type=template&id=27ed6dc4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseTable_vue_vue_type_template_id_27ed6dc4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseTable_vue_vue_type_template_id_27ed6dc4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Tables/BaseTableActions.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/Tables/BaseTableActions.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseTableActions_vue_vue_type_template_id_32c003af___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTableActions.vue?vue&type=template&id=32c003af& */ "./resources/js/components/Tables/BaseTableActions.vue?vue&type=template&id=32c003af&");
/* harmony import */ var _BaseTableActions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseTableActions.vue?vue&type=script&lang=js& */ "./resources/js/components/Tables/BaseTableActions.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BaseTableActions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BaseTableActions_vue_vue_type_template_id_32c003af___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BaseTableActions_vue_vue_type_template_id_32c003af___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Tables/BaseTableActions.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Tables/BaseTableActions.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/Tables/BaseTableActions.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseTableActions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./BaseTableActions.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tables/BaseTableActions.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseTableActions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Tables/BaseTableActions.vue?vue&type=template&id=32c003af&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/Tables/BaseTableActions.vue?vue&type=template&id=32c003af& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseTableActions_vue_vue_type_template_id_32c003af___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./BaseTableActions.vue?vue&type=template&id=32c003af& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Tables/BaseTableActions.vue?vue&type=template&id=32c003af&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseTableActions_vue_vue_type_template_id_32c003af___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseTableActions_vue_vue_type_template_id_32c003af___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/store/store.js":
/*!*************************************!*\
  !*** ./resources/js/store/store.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);



vue__WEBPACK_IMPORTED_MODULE_1___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (new vuex__WEBPACK_IMPORTED_MODULE_0__["default"].Store({
  state: {
    lang: 'en',
    translations_keys: [],
    translations_values: [],
    apiToken: '',
    roles: [],
    ready: false,
    currentUser: {},
    authenticated: false,
    activeProfile: 'student',
    activeTrail: '',
    activeTheme: 'student'
  },
  mutations: {
    translations: function translations(state, _translations) {
      state.translations = _translations;
    },
    setLang: function setLang(state, lang) {
      state.lang = lang;
    },
    setApiToken: function setApiToken(state, apiToken) {
      state.apiToken = apiToken;
    },
    setCurrentUser: function setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;

      if (state.currentUser !== {}) {
        state.authenticated = true;
        state.currentUser.roles.forEach(function (el) {
          state.roles.push(el.name);
        }); // Manage active menu item.

        var activeProfile = window.location.pathname.split('/')[1];

        if ((activeProfile === 'teacher' || activeProfile === 'admin') && state.roles.includes(activeProfile)) {
          state.activeProfile = activeProfile;
          state.activeTheme = activeProfile;
        } else if (activeProfile === 'admin' && states.roles.includes('teacher')) {
          state.activeProfile = 'teacher';
          state.activeTheme = 'teacher';
        }
      }
    },
    setActiveTrail: function setActiveTrail(state, activeTrail) {
      state.activeTrail = activeTrail;
    },
    MUTATE_TRANS: function MUTATE_TRANS(state, data) {
      state.translations_keys = Object.keys(data);
      state.translations_keys.forEach(function (el) {
        return el.replace('-', '_');
      });
      state.translations_values = Object.values(data);
      state.ready = true;
    }
  },
  actions: {
    loadTranslations: function loadTranslations(_ref) {
      var commit = _ref.commit,
          state = _ref.state;
      return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/api/translations?api_token=' + state.apiToken).then(function (response) {
        return commit('MUTATE_TRANS', response.data);
      });
    }
  },
  getters: {
    ready: function ready(state) {
      return state.ready;
    },
    translationByKey: function translationByKey(state) {
      return function (key) {
        var index = state.translations_keys.indexOf(key);
        return state.translations_values[index];
      };
    },
    hasRole: function hasRole(state) {
      return function (role) {
        return state.roles.includes(role);
      };
    },
    getRolesNumber: function getRolesNumber(state) {
      return state.roles.length;
    }
  }
}));

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/chloecorfmat/Documents/HelloToeic/Src/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /Users/chloecorfmat/Documents/HelloToeic/Src/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });