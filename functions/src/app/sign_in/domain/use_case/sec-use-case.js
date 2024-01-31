/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const Repository = require("../../data/respository/sec-repository");
const Builder = require("../builder/sec-builder");

exports.fetchSec = async (secUrl, loginData, systemsData) => fetchSecHome(secUrl, loginData, systemsData)
    .then(onFetchSecHome)
    .then(fetchStudentProfile)
    .then(onFetchStudentProfile);

async function fetchSecHome(secUrl, loginData, systemsData) {
  const response = await Repository.fetchSec(secUrl);
  return {loginData, systemsData, response};
}

function onFetchSecHome({loginData, systemsData, response}) {
  const cookie = response.headers["set-cookie"];
  return {cookie, loginData, systemsData};
}

async function fetchStudentProfile({cookie, loginData, systemsData}) {
  const response = await Repository.fetchStudentProfile(cookie);
  return {cookie, loginData, systemsData, response};
}

function onFetchStudentProfile({cookie, loginData, systemsData, response}) {
  const photoUrl = Builder.findPhotoSrc(response.data);
  return {
    "cookie": {
      "host": "",
      "value": cookie,
    },
    "student": Builder.buildUser(loginData, systemsData, photoUrl),
  };
}

