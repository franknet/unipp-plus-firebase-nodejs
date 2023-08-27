/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */

const useCase = require("./domain/use-case");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.fetchAcademicRecordsHandler = (request) => useCase.fetchAcademicRecords(request.data);
