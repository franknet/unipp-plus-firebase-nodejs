/* eslint-disable valid-jsdoc */
const Error = require("../../utils/https-errors");
const {fetchExtract, fetchBills} = require("./domain/use-case");

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.fetchExtractHandler = async function(request) {
  try {
    return await fetchExtract(request.data);
  } catch (error) {
    throw Error.internalError(error);
  }
};

/**
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 */
exports.fetchBillshandler = async function(request) {
  try {
    return await fetchBills(request.data);
  } catch (error) {
    throw Error.internalError(error);
  }
};
