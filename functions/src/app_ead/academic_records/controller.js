/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */

const UseCase = require("./domain/use-case");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.fetchAcademicRecordsHandler = (request) => UseCase.fetchAcademicRecords(request.data);
