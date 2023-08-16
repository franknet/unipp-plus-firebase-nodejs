/* eslint-disable valid-jsdoc */
const {fetchGrades} = require("./domain/use-case");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 * @returns
 */
exports.fetchGradesHandler = (request) => fetchGrades(request.data);
