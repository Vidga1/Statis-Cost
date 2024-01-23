"use strict";(self.webpackChunkstatis_cost=self.webpackChunkstatis_cost||[]).push([[989],{4662:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){eval('/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   l: function() { return /* binding */ Form; }\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\nvar Form = function Form(_ref) {\n  var title = _ref.title,\n    handleClick = _ref.handleClick;\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\'\'),\n    _useState2 = _slicedToArray(_useState, 2),\n    email = _useState2[0],\n    setEmail = _useState2[1];\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\'\'),\n    _useState4 = _slicedToArray(_useState3, 2),\n    pass = _useState4[0],\n    setPass = _useState4[1];\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n    className: "formContainer"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {\n    type: "email",\n    className: "formInput",\n    value: email,\n    onChange: function onChange(e) {\n      return setEmail(e.target.value);\n    },\n    placeholder: "email"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {\n    type: "password",\n    className: "formInput",\n    value: pass,\n    onChange: function onChange(e) {\n      return setPass(e.target.value);\n    },\n    placeholder: "password"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {\n    className: "formButton",\n    onClick: function onClick() {\n      return handleClick(email, pass);\n    }\n  }, title));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDY2Mi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTBCO0FBQ1c7QUFDTjtBQUUvQixJQUFNRSxJQUFtQixHQUFHLFNBQXRCQSxJQUFtQkEsQ0FBQUMsSUFBQSxFQUErQjtFQUFBLElBQXpCQyxLQUFLLEdBQUFELElBQUEsQ0FBTEMsS0FBSztJQUFFQyxXQUFXLEdBQUFGLElBQUEsQ0FBWEUsV0FBVztFQUMvQyxJQUFBQyxTQUFBLEdBQTBCTCwrQ0FBUSxDQUFDLEVBQUUsQ0FBQztJQUFBTSxVQUFBLEdBQUFDLGNBQUEsQ0FBQUYsU0FBQTtJQUEvQkcsS0FBSyxHQUFBRixVQUFBO0lBQUVHLFFBQVEsR0FBQUgsVUFBQTtFQUN0QixJQUFBSSxVQUFBLEdBQXdCViwrQ0FBUSxDQUFDLEVBQUUsQ0FBQztJQUFBVyxVQUFBLEdBQUFKLGNBQUEsQ0FBQUcsVUFBQTtJQUE3QkUsSUFBSSxHQUFBRCxVQUFBO0lBQUVFLE9BQU8sR0FBQUYsVUFBQTtFQUVwQixvQkFDRVosZ0RBQUE7SUFBS2dCLFNBQVMsRUFBQztFQUFlLGdCQUM1QmhCLGdEQUFBO0lBQ0VpQixJQUFJLEVBQUMsT0FBTztJQUNaRCxTQUFTLEVBQUMsV0FBVztJQUNyQkUsS0FBSyxFQUFFVCxLQUFNO0lBQ2JVLFFBQVEsRUFBRSxTQUFBQSxTQUFDQyxDQUFDO01BQUEsT0FBS1YsUUFBUSxDQUFDVSxDQUFDLENBQUNDLE1BQU0sQ0FBQ0gsS0FBSyxDQUFDO0lBQUEsQ0FBQztJQUMxQ0ksV0FBVyxFQUFDO0VBQU8sQ0FDcEIsQ0FBQyxlQUNGdEIsZ0RBQUE7SUFDRWlCLElBQUksRUFBQyxVQUFVO0lBQ2ZELFNBQVMsRUFBQyxXQUFXO0lBQ3JCRSxLQUFLLEVBQUVMLElBQUs7SUFDWk0sUUFBUSxFQUFFLFNBQUFBLFNBQUNDLENBQUM7TUFBQSxPQUFLTixPQUFPLENBQUNNLENBQUMsQ0FBQ0MsTUFBTSxDQUFDSCxLQUFLLENBQUM7SUFBQSxDQUFDO0lBQ3pDSSxXQUFXLEVBQUM7RUFBVSxDQUN2QixDQUFDLGVBQ0Z0QixnREFBQTtJQUFRZ0IsU0FBUyxFQUFDLFlBQVk7SUFBQ08sT0FBTyxFQUFFLFNBQUFBLFFBQUE7TUFBQSxPQUFNbEIsV0FBVyxDQUFDSSxLQUFLLEVBQUVJLElBQUksQ0FBQztJQUFBO0VBQUMsR0FDcEVULEtBQ0ssQ0FDTCxDQUFDO0FBRVYsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpcy1jb3N0Ly4vc3JjL2NvbXBvbmVudHMvYXV0aC9Gb3JtLnRzeD8yNzJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBGQywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4uLy4uL3N0eWxlcy9Gb3JtLmNzcyc7XG5cbmNvbnN0IEZvcm06IEZDPEZvcm1Qcm9wcz4gPSAoeyB0aXRsZSwgaGFuZGxlQ2xpY2sgfSkgPT4ge1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Bhc3MsIHNldFBhc3NdID0gdXNlU3RhdGUoJycpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtQ29udGFpbmVyXCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgY2xhc3NOYW1lPVwiZm9ybUlucHV0XCJcbiAgICAgICAgdmFsdWU9e2VtYWlsfVxuICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVtYWlsKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgcGxhY2Vob2xkZXI9XCJlbWFpbFwiXG4gICAgICAvPlxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm1JbnB1dFwiXG4gICAgICAgIHZhbHVlPXtwYXNzfVxuICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3MoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICBwbGFjZWhvbGRlcj1cInBhc3N3b3JkXCJcbiAgICAgIC8+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImZvcm1CdXR0b25cIiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDbGljayhlbWFpbCwgcGFzcyl9PlxuICAgICAgICB7dGl0bGV9XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCB7IEZvcm0gfTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiRm9ybSIsIl9yZWYiLCJ0aXRsZSIsImhhbmRsZUNsaWNrIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5IiwiZW1haWwiLCJzZXRFbWFpbCIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwicGFzcyIsInNldFBhc3MiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwidHlwZSIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0IiwicGxhY2Vob2xkZXIiLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///4662\n')},8299:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){eval('/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9655);\n\n\n\nvar NavigationBar = function NavigationBar() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", {\n    className: "navbar"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__/* .Link */ .rU, {\n    to: "/",\n    className: "nav-link"\n  }, "\\u0413\\u043B\\u0430\\u0432\\u043D\\u0430\\u044F"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__/* .Link */ .rU, {\n    to: "/about",\n    className: "nav-link"\n  }, "\\u041E \\u043F\\u0440\\u043E\\u0435\\u043A\\u0442\\u0435"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__/* .Link */ .rU, {\n    to: "/login",\n    className: "nav-link"\n  }, "\\u0412\\u0445\\u043E\\u0434"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__/* .Link */ .rU, {\n    to: "/register",\n    className: "nav-link"\n  }, "\\u0420\\u0435\\u0433\\u0438\\u0441\\u0442\\u0440\\u0430\\u0446\\u0438\\u044F"));\n};\n/* harmony default export */ __webpack_exports__.Z = (NavigationBar);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODI5OS5qcyIsIm1hcHBpbmdzIjoiOztBQUEwQjtBQUNjO0FBQ0E7QUFFeEMsSUFBTUUsYUFBYSxHQUFHLFNBQWhCQSxhQUFhQSxDQUFBLEVBQVM7RUFDMUIsb0JBQ0VGLGdEQUFBO0lBQUtJLFNBQVMsRUFBQztFQUFRLGdCQUNyQkosZ0RBQUEsQ0FBQ0MsNERBQUk7SUFBQ0ksRUFBRSxFQUFDLEdBQUc7SUFBQ0QsU0FBUyxFQUFDO0VBQVUsR0FBQyw0Q0FFNUIsQ0FBQyxlQUNQSixnREFBQSxDQUFDQyw0REFBSTtJQUFDSSxFQUFFLEVBQUMsUUFBUTtJQUFDRCxTQUFTLEVBQUM7RUFBVSxHQUFDLG1EQUVqQyxDQUFDLGVBQ1BKLGdEQUFBLENBQUNDLDREQUFJO0lBQUNJLEVBQUUsRUFBQyxRQUFRO0lBQUNELFNBQVMsRUFBQztFQUFVLEdBQUMsMEJBRWpDLENBQUMsZUFDUEosZ0RBQUEsQ0FBQ0MsNERBQUk7SUFBQ0ksRUFBRSxFQUFDLFdBQVc7SUFBQ0QsU0FBUyxFQUFDO0VBQVUsR0FBQyxvRUFFcEMsQ0FDSCxDQUFDO0FBRVYsQ0FBQztBQUVELHNEQUFlRixhQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGlzLWNvc3QvLi9zcmMvY29tcG9uZW50cy9uYXYvTmF2aWdhdGlvbkJhci50c3g/YjMwNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0ICcuLi8uLi9zdHlsZXMvTmF2aWdhdGlvbkJhci5jc3MnO1xuXG5jb25zdCBOYXZpZ2F0aW9uQmFyID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyXCI+XG4gICAgICA8TGluayB0bz1cIi9cIiBjbGFzc05hbWU9XCJuYXYtbGlua1wiPlxuICAgICAgICDQk9C70LDQstC90LDRj1xuICAgICAgPC9MaW5rPlxuICAgICAgPExpbmsgdG89XCIvYWJvdXRcIiBjbGFzc05hbWU9XCJuYXYtbGlua1wiPlxuICAgICAgICDQniDQv9GA0L7QtdC60YLQtVxuICAgICAgPC9MaW5rPlxuICAgICAgPExpbmsgdG89XCIvbG9naW5cIiBjbGFzc05hbWU9XCJuYXYtbGlua1wiPlxuICAgICAgICDQktGF0L7QtFxuICAgICAgPC9MaW5rPlxuICAgICAgPExpbmsgdG89XCIvcmVnaXN0ZXJcIiBjbGFzc05hbWU9XCJuYXYtbGlua1wiPlxuICAgICAgICDQoNC10LPQuNGB0YLRgNCw0YbQuNGPXG4gICAgICA8L0xpbms+XG4gICAgPC9uYXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXZpZ2F0aW9uQmFyO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiTGluayIsIk5hdmlnYXRpb25CYXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwidG8iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///8299\n')},7989:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": function() { return /* binding */ pages_RegisterPage; }\n});\n\n// EXTERNAL MODULE: ./node_modules/react/index.js\nvar react = __webpack_require__(7294);\n// EXTERNAL MODULE: ./node_modules/react-router/dist/index.js\nvar dist = __webpack_require__(9250);\n// EXTERNAL MODULE: ./node_modules/firebase/auth/dist/esm/index.esm.js + 3 modules\nvar index_esm = __webpack_require__(8858);\n// EXTERNAL MODULE: ./src/components/auth/Form.tsx\nvar Form = __webpack_require__(4662);\n// EXTERNAL MODULE: ./src/store/slices/userSlice.ts\nvar userSlice = __webpack_require__(3526);\n// EXTERNAL MODULE: ./src/hooks/redux-hooks.ts\nvar redux_hooks = __webpack_require__(7040);\n// EXTERNAL MODULE: ./src/firebase/firebaseService.ts\nvar firebaseService = __webpack_require__(5163);\n;// CONCATENATED MODULE: ./src/components/auth/SignUp.tsx\n\n\n\n\n\n\n\nvar SignUp = function SignUp() {\n  var dispatch = (0,redux_hooks/* useAppDispatch */.T)();\n  var navigate = (0,dist/* useNavigate */.s0)();\n  var handleRegister = function handleRegister(email, password) {\n    var auth = (0,index_esm/* getAuth */.v0)();\n    (0,index_esm/* createUserWithEmailAndPassword */.Xb)(auth, email, password).then(function (_ref) {\n      var user = _ref.user;\n      var userData = {\n        email: user.email || '',\n        id: user.uid,\n        token: user.refreshToken\n      };\n      dispatch((0,userSlice/* setUser */.av)(userData));\n      (0,firebaseService/* saveUserData */.gt)(userData);\n      navigate('/settings');\n    }).catch(console.error);\n  };\n  return /*#__PURE__*/react.createElement(Form/* Form */.l, {\n    title: \"register\",\n    handleClick: handleRegister\n  });\n};\n\n// EXTERNAL MODULE: ./src/components/nav/NavigationBar.tsx\nvar NavigationBar = __webpack_require__(8299);\n;// CONCATENATED MODULE: ./src/pages/RegisterPage.tsx\n\n\n\nvar RegisterPage = function RegisterPage() {\n  return /*#__PURE__*/react.createElement(\"div\", {\n    style: {\n      height: '100vh',\n      overflow: 'hidden'\n    }\n  }, /*#__PURE__*/react.createElement(NavigationBar/* default */.Z, null), /*#__PURE__*/react.createElement(SignUp, null));\n};\n/* harmony default export */ var pages_RegisterPage = (RegisterPage);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNzk4OS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNxQjtBQUN5QjtBQUMxQztBQUN5QjtBQUNFO0FBQ0s7QUFFOUQsSUFBTVEsTUFBZ0IsR0FBRyxTQUFuQkEsTUFBZ0JBLENBQUEsRUFBUztFQUM3QixJQUFNQyxRQUFRLEdBQUdILHFDQUFjLENBQUMsQ0FBQztFQUNqQyxJQUFNSSxRQUFRLEdBQUdULDRCQUFXLENBQUMsQ0FBQztFQUU5QixJQUFNVSxjQUFjLEdBQUcsU0FBakJBLGNBQWNBLENBQUlDLEtBQWEsRUFBRUMsUUFBZ0IsRUFBSztJQUMxRCxJQUFNQyxJQUFJLEdBQUdaLDZCQUFPLENBQUMsQ0FBQztJQUN0QkMsb0RBQThCLENBQUNXLElBQUksRUFBRUYsS0FBSyxFQUFFQyxRQUFRLENBQUMsQ0FDbERFLElBQUksQ0FBQyxVQUFBQyxJQUFBLEVBQWM7TUFBQSxJQUFYQyxJQUFJLEdBQUFELElBQUEsQ0FBSkMsSUFBSTtNQUNYLElBQU1DLFFBQWtCLEdBQUc7UUFDekJOLEtBQUssRUFBRUssSUFBSSxDQUFDTCxLQUFLLElBQUksRUFBRTtRQUN2Qk8sRUFBRSxFQUFFRixJQUFJLENBQUNHLEdBQUc7UUFDWkMsS0FBSyxFQUFFSixJQUFJLENBQUNLO01BQ2QsQ0FBQztNQUNEYixRQUFRLENBQUNKLDZCQUFPLENBQUNhLFFBQVEsQ0FBQyxDQUFDO01BQzNCWCx3Q0FBWSxDQUFDVyxRQUFRLENBQUM7TUFDdEJSLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQ0RhLEtBQUssQ0FBQ0MsT0FBTyxDQUFDQyxLQUFLLENBQUM7RUFDekIsQ0FBQztFQUVELG9CQUFPekIsbUJBQUEsQ0FBQ0ksZ0JBQUk7SUFBQ3VCLEtBQUssRUFBQyxVQUFVO0lBQUNDLFdBQVcsRUFBRWpCO0VBQWUsQ0FBRSxDQUFDO0FBQy9ELENBQUM7Ozs7O0FDN0J3QztBQUNVO0FBQ1M7QUFFNUQsSUFBTW1CLFlBQVksR0FBRyxTQUFmQSxZQUFZQSxDQUFBLEVBQVM7RUFDekIsb0JBQ0U5QixtQkFBQTtJQUFLK0IsS0FBSyxFQUFFO01BQUVDLE1BQU0sRUFBRSxPQUFPO01BQUVDLFFBQVEsRUFBRTtJQUFTO0VBQUUsZ0JBQ2xEakMsbUJBQUEsQ0FBQzZCLDRCQUFhLE1BQUUsQ0FBQyxlQUNqQjdCLG1CQUFBLENBQUNRLE1BQU0sTUFBRSxDQUNOLENBQUM7QUFFVixDQUFDO0FBRUQsdURBQWVzQixZQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGlzLWNvc3QvLi9zcmMvY29tcG9uZW50cy9hdXRoL1NpZ25VcC50c3g/Y2U5NCIsIndlYnBhY2s6Ly9zdGF0aXMtY29zdC8uL3NyYy9wYWdlcy9SZWdpc3RlclBhZ2UudHN4P2FlNDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBnZXRBdXRoLCBjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQgfSBmcm9tICdmaXJlYmFzZS9hdXRoJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL0Zvcm0nO1xuaW1wb3J0IHsgc2V0VXNlciB9IGZyb20gJy4uLy4uL3N0b3JlL3NsaWNlcy91c2VyU2xpY2UnO1xuaW1wb3J0IHsgdXNlQXBwRGlzcGF0Y2ggfSBmcm9tICcuLi8uLi9ob29rcy9yZWR1eC1ob29rcyc7XG5pbXBvcnQgeyBzYXZlVXNlckRhdGEgfSBmcm9tICcuLi8uLi9maXJlYmFzZS9maXJlYmFzZVNlcnZpY2UnO1xuXG5jb25zdCBTaWduVXA6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZUFwcERpc3BhdGNoKCk7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcblxuICBjb25zdCBoYW5kbGVSZWdpc3RlciA9IChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgYXV0aCA9IGdldEF1dGgoKTtcbiAgICBjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoYXV0aCwgZW1haWwsIHBhc3N3b3JkKVxuICAgICAgLnRoZW4oKHsgdXNlciB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhOiBVc2VyRGF0YSA9IHtcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCB8fCAnJyxcbiAgICAgICAgICBpZDogdXNlci51aWQsXG4gICAgICAgICAgdG9rZW46IHVzZXIucmVmcmVzaFRva2VuLFxuICAgICAgICB9O1xuICAgICAgICBkaXNwYXRjaChzZXRVc2VyKHVzZXJEYXRhKSk7XG4gICAgICAgIHNhdmVVc2VyRGF0YSh1c2VyRGF0YSk7XG4gICAgICAgIG5hdmlnYXRlKCcvc2V0dGluZ3MnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gIH07XG5cbiAgcmV0dXJuIDxGb3JtIHRpdGxlPVwicmVnaXN0ZXJcIiBoYW5kbGVDbGljaz17aGFuZGxlUmVnaXN0ZXJ9IC8+O1xufTtcblxuZXhwb3J0IHsgU2lnblVwIH07XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU2lnblVwIH0gZnJvbSAnLi4vY29tcG9uZW50cy9hdXRoL1NpZ25VcCc7XG5pbXBvcnQgTmF2aWdhdGlvbkJhciBmcm9tICcuLi9jb21wb25lbnRzL25hdi9OYXZpZ2F0aW9uQmFyJztcblxuY29uc3QgUmVnaXN0ZXJQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiAnMTAwdmgnLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICA8TmF2aWdhdGlvbkJhciAvPlxuICAgICAgPFNpZ25VcCAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVnaXN0ZXJQYWdlO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlTmF2aWdhdGUiLCJnZXRBdXRoIiwiY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkIiwiRm9ybSIsInNldFVzZXIiLCJ1c2VBcHBEaXNwYXRjaCIsInNhdmVVc2VyRGF0YSIsIlNpZ25VcCIsImRpc3BhdGNoIiwibmF2aWdhdGUiLCJoYW5kbGVSZWdpc3RlciIsImVtYWlsIiwicGFzc3dvcmQiLCJhdXRoIiwidGhlbiIsIl9yZWYiLCJ1c2VyIiwidXNlckRhdGEiLCJpZCIsInVpZCIsInRva2VuIiwicmVmcmVzaFRva2VuIiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiLCJjcmVhdGVFbGVtZW50IiwidGl0bGUiLCJoYW5kbGVDbGljayIsIk5hdmlnYXRpb25CYXIiLCJSZWdpc3RlclBhZ2UiLCJzdHlsZSIsImhlaWdodCIsIm92ZXJmbG93Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///7989\n")}}]);