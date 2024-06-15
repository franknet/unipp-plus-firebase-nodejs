/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */

const {parseError} = require("up-core").Http.Errors;
const {fetchStudent} = require("./domain/use_case/fetch-student-use-case");
const {fetchSystems} = require("./domain/use_case/fetch-systems-use-case");
const {fetchSec} = require("./domain/use_case/fetch-sec-use-case");
const {fetchFBUser} = require("./domain/use_case/fetch-fb-user-use-case");

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
exports.signInHandler = async (request, response) => {
  try {
    const credentials = request.body;

    // Perform signIn
    const loginData = await fetchStudent(credentials);

    // Get systems avaliable
    const systemsData = await fetchSystems(loginData["token"]);

    // Get session cookies
    const secResponse = await fetchSec(systemsData, credentials);

    // Create firebase user
    await fetchFBUser({
      email: loginData["email"],
      password: credentials["password"],
    });

    // Return response
    response.status(200).header({
      "set-cookie": secResponse.headers["set-cookie"],
    }).send({
      "message": "OK",
    });
  } catch (error) {
    parseError(error).sendTo(response);
  }
};
