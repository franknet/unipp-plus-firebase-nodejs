/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
const {fetchGrades} = require("./domain/use-case");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.fetchGradesHandler = (request) => fetchGrades(request.data);
