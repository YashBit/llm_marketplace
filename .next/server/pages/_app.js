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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _dfinity_auth_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dfinity/auth-client */ \"@dfinity/auth-client\");\n/* harmony import */ var _dfinity_auth_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_dfinity_auth_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/global.css */ \"./src/styles/global.css\");\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_global_css__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst App = ({ Component, pageProps })=>{\n    const [authClient, setAuthClient] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isAuthenticated, setIsAuthenticated] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const initAuth = async ()=>{\n            const client = await _dfinity_auth_client__WEBPACK_IMPORTED_MODULE_2__.AuthClient.create();\n            setAuthClient(client);\n            const isAuth = await client.isAuthenticated();\n            setIsAuthenticated(isAuth);\n            if (!isAuth && router.pathname !== \"/\") {\n                router.push(\"/\");\n            }\n        };\n        initAuth();\n    }, [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps,\n        authClient: authClient,\n        isAuthenticated: isAuthenticated\n    }, void 0, false, {\n        fileName: \"/Users/yashbharti/Desktop/Engineering/core_projects/llm_marketplace/src/pages/_app.tsx\",\n        lineNumber: 28,\n        columnNumber: 10\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ21EO0FBQ0Q7QUFDVjtBQUNWO0FBRTlCLE1BQU1LLE1BQTBCLENBQUMsRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDdkQsTUFBTSxDQUFDQyxZQUFZQyxjQUFjLEdBQUdQLCtDQUFRQSxDQUFvQjtJQUNoRSxNQUFNLENBQUNRLGlCQUFpQkMsbUJBQW1CLEdBQUdULCtDQUFRQSxDQUFVO0lBQ2hFLE1BQU1VLFNBQVNSLHNEQUFTQTtJQUV4QkgsZ0RBQVNBLENBQUM7UUFDUixNQUFNWSxXQUFXO1lBQ2YsTUFBTUMsU0FBUyxNQUFNWCw0REFBVUEsQ0FBQ1ksTUFBTTtZQUN0Q04sY0FBY0s7WUFFZCxNQUFNRSxTQUFTLE1BQU1GLE9BQU9KLGVBQWU7WUFDM0NDLG1CQUFtQks7WUFFbkIsSUFBSSxDQUFDQSxVQUFVSixPQUFPSyxRQUFRLEtBQUssS0FBSztnQkFDdENMLE9BQU9NLElBQUksQ0FBQztZQUNkO1FBQ0Y7UUFFQUw7SUFDRixHQUFHO1FBQUNEO0tBQU87SUFFWCxxQkFBTyw4REFBQ047UUFBVyxHQUFHQyxTQUFTO1FBQUVDLFlBQVlBO1FBQVlFLGlCQUFpQkE7Ozs7OztBQUM1RTtBQUVBLGlFQUFlTCxHQUFHQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaWMtcnVzdC1uZXh0anMvLi9zcmMvcGFnZXMvX2FwcC50c3g/ZjlkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXV0aENsaWVudCB9IGZyb20gJ0BkZmluaXR5L2F1dGgtY2xpZW50JztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbC5jc3MnO1xuXG5jb25zdCBBcHA6IFJlYWN0LkZDPEFwcFByb3BzPiA9ICh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pID0+IHtcbiAgY29uc3QgW2F1dGhDbGllbnQsIHNldEF1dGhDbGllbnRdID0gdXNlU3RhdGU8QXV0aENsaWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNBdXRoZW50aWNhdGVkLCBzZXRJc0F1dGhlbnRpY2F0ZWRdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGluaXRBdXRoID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQXV0aENsaWVudC5jcmVhdGUoKTtcbiAgICAgIHNldEF1dGhDbGllbnQoY2xpZW50KTtcblxuICAgICAgY29uc3QgaXNBdXRoID0gYXdhaXQgY2xpZW50LmlzQXV0aGVudGljYXRlZCgpO1xuICAgICAgc2V0SXNBdXRoZW50aWNhdGVkKGlzQXV0aCk7XG5cbiAgICAgIGlmICghaXNBdXRoICYmIHJvdXRlci5wYXRobmFtZSAhPT0gJy8nKSB7XG4gICAgICAgIHJvdXRlci5wdXNoKCcvJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGluaXRBdXRoKCk7XG4gIH0sIFtyb3V0ZXJdKTtcblxuICByZXR1cm4gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSBhdXRoQ2xpZW50PXthdXRoQ2xpZW50fSBpc0F1dGhlbnRpY2F0ZWQ9e2lzQXV0aGVudGljYXRlZH0gLz47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkF1dGhDbGllbnQiLCJ1c2VSb3V0ZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJhdXRoQ2xpZW50Iiwic2V0QXV0aENsaWVudCIsImlzQXV0aGVudGljYXRlZCIsInNldElzQXV0aGVudGljYXRlZCIsInJvdXRlciIsImluaXRBdXRoIiwiY2xpZW50IiwiY3JlYXRlIiwiaXNBdXRoIiwicGF0aG5hbWUiLCJwdXNoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

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