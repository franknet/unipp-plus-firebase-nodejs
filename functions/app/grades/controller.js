const Error = require("../../utils/https-errors");
const {fetchGrades} = require("./domain/use-case");

/**
 *
 * @param {import("firebase-functions/v2/https").CallableRequest} request
 * @returns
 */

exports.fetchGradesHandler = async function(request) {
  try {
    return await fetchGrades(request.data);
  } catch (error) {
    throw Error.internalError(error);
  }
};
