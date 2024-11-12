/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _dfinity_auth_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dfinity/auth-client */ \"@dfinity/auth-client\");\n/* harmony import */ var _dfinity_auth_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_dfinity_auth_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var styles_global_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styles/global.css */ \"./src/styles/global.css\");\n/* harmony import */ var styles_global_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styles_global_css__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst App = ({ Component, pageProps })=>{\n    const [authClient, setAuthClient] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isAuthenticated, setIsAuthenticated] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const initAuth = async ()=>{\n            const client = await _dfinity_auth_client__WEBPACK_IMPORTED_MODULE_2__.AuthClient.create();\n            setAuthClient(client);\n            const isAuth = await client.isAuthenticated();\n            setIsAuthenticated(isAuth);\n            // Redirect unauthenticated users to login\n            if (!isAuth && router.pathname !== \"/\") {\n                router.push(\"/\");\n            }\n        };\n        initAuth();\n    }, [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps,\n        authClient: authClient,\n        isAuthenticated: isAuthenticated\n    }, void 0, false, {\n        fileName: \"/Users/yashbharti/Desktop/Engineering/core_projects/llm_marketplace/src/pages/_app.tsx\",\n        lineNumber: 29,\n        columnNumber: 10\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ21EO0FBQ0Q7QUFDVjtBQUNiO0FBRTNCLE1BQU1LLE1BQTBCLENBQUMsRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDdkQsTUFBTSxDQUFDQyxZQUFZQyxjQUFjLEdBQUdQLCtDQUFRQSxDQUFvQjtJQUNoRSxNQUFNLENBQUNRLGlCQUFpQkMsbUJBQW1CLEdBQUdULCtDQUFRQSxDQUFVO0lBQ2hFLE1BQU1VLFNBQVNSLHNEQUFTQTtJQUV4QkgsZ0RBQVNBLENBQUM7UUFDUixNQUFNWSxXQUFXO1lBQ2YsTUFBTUMsU0FBUyxNQUFNWCw0REFBVUEsQ0FBQ1ksTUFBTTtZQUN0Q04sY0FBY0s7WUFFZCxNQUFNRSxTQUFTLE1BQU1GLE9BQU9KLGVBQWU7WUFDM0NDLG1CQUFtQks7WUFFbkIsMENBQTBDO1lBQzFDLElBQUksQ0FBQ0EsVUFBVUosT0FBT0ssUUFBUSxLQUFLLEtBQUs7Z0JBQ3RDTCxPQUFPTSxJQUFJLENBQUM7WUFDZDtRQUNGO1FBRUFMO0lBQ0YsR0FBRztRQUFDRDtLQUFPO0lBRVgscUJBQU8sOERBQUNOO1FBQVcsR0FBR0MsU0FBUztRQUFFQyxZQUFZQTtRQUFZRSxpQkFBaUJBOzs7Ozs7QUFDNUU7QUFFQSxpRUFBZUwsR0FBR0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ljLXJ1c3QtbmV4dGpzLy4vc3JjL3BhZ2VzL19hcHAudHN4P2Y5ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUHJvcHMgfSBmcm9tIFwibmV4dC9hcHBcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBdXRoQ2xpZW50IH0gZnJvbSAnQGRmaW5pdHkvYXV0aC1jbGllbnQnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0IFwic3R5bGVzL2dsb2JhbC5jc3NcIjtcblxuY29uc3QgQXBwOiBSZWFjdC5GQzxBcHBQcm9wcz4gPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSA9PiB7XG4gIGNvbnN0IFthdXRoQ2xpZW50LCBzZXRBdXRoQ2xpZW50XSA9IHVzZVN0YXRlPEF1dGhDbGllbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzQXV0aGVudGljYXRlZCwgc2V0SXNBdXRoZW50aWNhdGVkXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBpbml0QXV0aCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IEF1dGhDbGllbnQuY3JlYXRlKCk7XG4gICAgICBzZXRBdXRoQ2xpZW50KGNsaWVudCk7XG4gICAgICBcbiAgICAgIGNvbnN0IGlzQXV0aCA9IGF3YWl0IGNsaWVudC5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgICAgIHNldElzQXV0aGVudGljYXRlZChpc0F1dGgpO1xuXG4gICAgICAvLyBSZWRpcmVjdCB1bmF1dGhlbnRpY2F0ZWQgdXNlcnMgdG8gbG9naW5cbiAgICAgIGlmICghaXNBdXRoICYmIHJvdXRlci5wYXRobmFtZSAhPT0gJy8nKSB7XG4gICAgICAgIHJvdXRlci5wdXNoKCcvJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGluaXRBdXRoKCk7XG4gIH0sIFtyb3V0ZXJdKTtcblxuICByZXR1cm4gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSBhdXRoQ2xpZW50PXthdXRoQ2xpZW50fSBpc0F1dGhlbnRpY2F0ZWQ9e2lzQXV0aGVudGljYXRlZH0gLz47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkF1dGhDbGllbnQiLCJ1c2VSb3V0ZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJhdXRoQ2xpZW50Iiwic2V0QXV0aENsaWVudCIsImlzQXV0aGVudGljYXRlZCIsInNldElzQXV0aGVudGljYXRlZCIsInJvdXRlciIsImluaXRBdXRoIiwiY2xpZW50IiwiY3JlYXRlIiwiaXNBdXRoIiwicGF0aG5hbWUiLCJwdXNoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/global.css":
/*!*******************************!*\
  !*** ./src/styles/global.css ***!
  \*******************************/
/***/ (() => {



/***/ }),

/***/ "@dfinity/auth-client":
/*!***************************************!*\
  !*** external "@dfinity/auth-client" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@dfinity/auth-client");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./src/pages/_app.tsx")));
module.exports = __webpack_exports__;

})();