/* eslint-disable max-len */

const API = require("../api/ead-api");

exports.fetchRecords = (session) => API.fetchRecords(session);
exports.fetchReleasedRecords = (session) => API.fetchReleasedRecords(session);
exports.fetchAttendanceDetails = (session, data) => API.fetchAttendanceDetails(session, data);
