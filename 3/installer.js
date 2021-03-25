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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/common/pwa/installer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/common/pwa/installer.js":
/*!****************************************!*\
  !*** ./src/js/common/pwa/installer.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Service Worker のバージョンとキャッシュする App Shell を定義する
var NAME = 'fertilizer-order';
var VERSION = '1.0.0';
var CACHE_NAME = NAME + ' ' + VERSION;

// キャッシュするファイルを定義
var urlsToCache = ["fertilizer-order-detail.html", "fertilizer-order-detail.js", "fertilizer-order-detail.js.map", "fertilizer-order-end.html", "fertilizer-order-end.js", "fertilizer-order-end.js.map", "fertilizer-order-list.html", "fertilizer-order-list.js", "fertilizer-order-list.js.map", "./image/JA.png", "./image/icon-192.png", "./image/icon-512.png", "./lib/bootstrap-table-locale-all.min.js", "./lib/bootstrap-table.min.css", "./lib/bootstrap-table.min.js", "./lib/bootstrap.min.css", "./lib/bootstrap.min.js", "./lib/fontawesome-v5.0.6-all.js", "./lib/jquery-3.4.1.slim.min.js", "./lib/popper.min.js"];

// Service Worker へファイルをインストール
self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
    }));
});

// リクエストされたファイルが Service Worker にキャッシュされている場合
// キャッシュからレスポンスを返す
self.addEventListener('fetch', function (event) {
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;
    event.respondWith(caches.match(event.request).then(function (response) {
        if (response) {
            return response;
        }
        return fetch(event.request);
    }));
});

// Cache Storage にキャッシュされているサービスワーカーのkeyに変更があった場合
// 新バージョンをインストール後、旧バージョンのキャッシュを削除する
// (このファイルでは CACHE_NAME をkeyの値とみなし、変更を検知している)
self.addEventListener('activate', function (event) {
    event.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (key) {
            console.log('activate-key:' + key);
            if (!CACHE_NAME.includes(key)) {
                return caches.delete(key);
            }
        }));
    }).then(function () {
        console.log(CACHE_NAME + "activated");
    }));
});

/***/ })

/******/ });
//# sourceMappingURL=installer.js.map