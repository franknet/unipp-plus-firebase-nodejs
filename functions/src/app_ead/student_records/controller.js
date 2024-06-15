/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
const {fetchStudentRecords: fetchGrades} = require("./domain/use-case");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.fetchStudentRecordsHandler = (request) => fetchGrades(request.data);
