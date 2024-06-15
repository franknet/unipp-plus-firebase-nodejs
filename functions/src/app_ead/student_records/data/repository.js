/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
const API = require("./api");

exports.fetchRecords = (session) => API.fetchGrades(session);
exports.fetchReleasedRecords = (session) => API.fetchReleasedGrades(session);
exports.fetchAttendanceDetails = (session, data) => API.fetchAttendanceDetails(session, data);
