/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
const UserCase = require("./domain/use-case");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.fetchSudentRecordsHandler = (request) => UserCase.fetchStudentRecords(request.data);
