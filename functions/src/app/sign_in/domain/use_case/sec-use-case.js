/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const Repository = require("../../data/respository/sec-repository");
const Builder = require("../builder/sec-builder");

exports.fetchSec = (secUrl, loginData, systemsData) => fetchSecHome(secUrl, loginData, systemsData)
    .then(onFetchSecHome)
    .then(fetchStudentProfile)
    .then(onFetchStudentProfile)
    .then(sendResponse);

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
  const studentData = Builder.buildUser(loginData, systemsData, photoUrl);
  return {cookie, studentData};
}

function sendResponse({cookie, studentData}) {
  return {
    "data": {
      "cookie": {
        "host": "https://sec2.unip.br",
        "value": cookie,
      },
      "student": studentData,
    },
  };
}

