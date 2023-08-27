/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
const API = require("./api");

exports.fetchCourseInfo = (session) => API.fetchCourseInfo(session);
exports.fetchDisciplines = (session) => API.fetchDisciplines(session);
