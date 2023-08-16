/* eslint-disable valid-jsdoc */
const {fetchExtract, fetchBills} = require("./domain/use-case");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.fetchExtractHandler = (request) => fetchExtract(request.data);

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.fetchBillshandler = (request) => fetchBills(request.data);
