
const {fetchAcademicRecords} = require("./domain/use-case");
const Error = require("../../utils/https-errors");

/**
 *
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 * @returns
 */

exports.fetchAcademicRecordsHandler = async function(request) {
  try {
    return await fetchAcademicRecords(request.data);
  } catch (error) {
    throw Error.internalError(error);
  }
};
