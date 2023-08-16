/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */

const {fetchAcademicRecords} = require("./domain/use-case");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.fetchAcademicRecordsHandler = (request) => fetchAcademicRecords(request.data);
