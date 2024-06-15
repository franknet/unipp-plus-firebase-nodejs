/* eslint-disable max-len */

const _ = require("lodash");
const {ServiceUnavailableError} = require("up-core").Http.Errors;
const SecRepository = require("../../data/respository/sec-repository");
const EadRepository = require("../../data/respository/ead-repository");

module.exports.fetchSec = async (systems, credentials) => {
  return await fetchSecRequest(systems, credentials);
};

const fetchSecRequest = (systems, credentials) => {
  const sec = _.find(systems, {"id": 142});
  const secEad = _.find(systems, {"id": 143});

  if (!_.isNil(sec)) {
    const url = sec["url"];
    return fetchOnSiteSec(url);
  }

  if (!_.isNil(secEad)) {
    return fetchEadSec(credentials);
  }

  throw new ServiceUnavailableError();
};

const fetchOnSiteSec = async (url) => {
  const response = await SecRepository.fetchSec(url);
  const cookie = response.headers["set-cookie"];
  await SecRepository.fetchSec2({url, cookie});
  return response;
};

const fetchEadSec = async (credentials) => {
  return await EadRepository.signIn(credentials);
};


