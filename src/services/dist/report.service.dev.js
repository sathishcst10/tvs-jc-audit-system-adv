"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _BackendAccess = require("../BackendAccess");

var _authHeader = _interopRequireDefault(require("./auth-header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getRegionDetails = function getRegionDetails() {
  return _axios["default"].get(_BackendAccess.APP_API_URL + "/State/RegionDropdown", {
    headers: (0, _authHeader["default"])()
  });
};

var getYear = function getYear() {
  return _axios["default"].post(_BackendAccess.APP_API_URL + "/Report/GetYearDropdown", true, {
    headers: (0, _authHeader["default"])()
  });
};

var getMonth = function getMonth() {
  return _axios["default"].post(_BackendAccess.APP_API_URL + "/Report/GetMonthDropdown", true, {
    headers: (0, _authHeader["default"])()
  });
};

var getJobcardAuditReport = function getJobcardAuditReport(argItems) {
  return _axios["default"].post(_BackendAccess.APP_API_URL + "/Report/AuditReport", argItems, {
    headers: (0, _authHeader["default"])()
  });
};

var getJobcardComplaintReport = function getJobcardComplaintReport(argItems) {
  return _axios["default"].post(_BackendAccess.APP_API_URL + "/Report/ComplaintReport", argItems, {
    headers: (0, _authHeader["default"])()
  });
};

var getMonthlyReport = function getMonthlyReport(argItems) {
  return _axios["default"].post(_BackendAccess.APP_API_URL + "/Report/MonthlyReport", argItems, {
    headers: (0, _authHeader["default"])()
  });
};

var _default = {
  getRegionDetails: getRegionDetails,
  getYear: getYear,
  getMonth: getMonth,
  getJobcardAuditReport: getJobcardAuditReport,
  getJobcardComplaintReport: getJobcardComplaintReport,
  getMonthlyReport: getMonthlyReport
};
exports["default"] = _default;