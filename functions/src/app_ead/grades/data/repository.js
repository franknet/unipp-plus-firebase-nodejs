/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
const API = require("./api");

exports.fetchGrades = (session) => API.fetchGrades(session);
exports.fetchReleasedGrades = (session) => API.fetchReleasedGrades(session);
/**
 * @param {{ano: number, codAluno: string, codPessoa: string, codTurma: string, semestre: number}} config
 */
exports.fetchAttendanceDetails = (session, config) => API.fetchAttendanceDetails(session, config);
