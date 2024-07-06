/* eslint-disable max-len */

const _ = require("lodash");
const {ServiceUnavailableError} = require("up-core").Http.Errors;
const {Cookie} = require("up-core").Utils;
const SecRepository = require("../../data/respository/sec-repository");
const EadRepository = require("../../data/respository/ead-repository");

exports.fetchSec = async (systems, credentials) => {
  const response = await fetchSecRequest(systems, credentials);
  // Format cookie
  const cookie = new Cookie(response.headers["set-cookie"]);
  response.headers["set-cookie"] = cookie.header;

  return response;
};

const fetchSecRequest = (systems, credentials) => {
  const sec = _.find(systems, {"id": 142});
  const secEad = _.find(systems, {"id": 143});

  if (!_.isNil(sec)) {
    return SecRepository.fetchSec(sec["url"]);
  }

  if (!_.isNil(secEad)) {
    return EadRepository.signIn(credentials);
  }

  throw new ServiceUnavailableError();
};
