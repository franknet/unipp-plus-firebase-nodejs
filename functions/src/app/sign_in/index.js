/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */

const {parseError} = require("up-core").Http.Errors;
const {signIn} = require("./domain/use_case/sign-in-use-case");
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
    const signInData = await signIn(credentials);

    // Get systems avaliable
    const systemsData = await fetchSystems(signInData["token"]);

    // Get session cookies
    const secResponse = await fetchSec(systemsData, credentials);

    // Create firebase user
    const fbUser = await fetchFBUser({
      email: signInData["email"],
      password: credentials["password"],
    });

    // Return response
    response.header({
      "uid": fbUser.uid,
      "token": signInData["token"],
      "refresh-token": signInData["refreshToken"],
      "user-id": signInData["idPessoaLy"],
      "user-rg": signInData["identificacao"],
      "set-cookie": secResponse.headers["set-cookie"],
    }).sendStatus(200);
  } catch (error) {
    parseError(error).sendTo(response);
  }
};
