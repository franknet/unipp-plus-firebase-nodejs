/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
const API = require("./api");

exports.fetchGrades = (session) => API.fetchGrades(session);
exports.fetchReleasedGrades = (session) => API.fetchReleasedGrades(session);

exports.fetchAttendanceDetails = (session, data) => API.fetchAttendanceDetails(session, data);
