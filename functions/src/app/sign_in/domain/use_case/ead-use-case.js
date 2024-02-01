/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const Repository = require("../../data/respository/ead-repository");
const Builder = require("../builder/ead-builder");

exports.fetchSec = (credentials, systemsData) => fetchStudent(credentials, systemsData)
    .then(onFetchStudent)
    .then(fetchContract)
    .then(onFetchContract)
    .then(fetchUser)
    .then(onFetchUser)
    .then(sendResponse);

async function fetchStudent(credentials, systemsData) {
  const response = await Repository.signIn(credentials);
  return {systemsData, response};
}

function onFetchStudent({systemsData, response}) {
  const {data, headers} = response;
  const cookie = headers["set-cookie"];
  const studentId = data["id"];
  const studentRg = data["login"];
  return {cookie, studentId, studentRg, systemsData};
}

async function fetchContract({cookie, studentId, studentRg, systemsData}) {
  const response = await Repository.fetchContract(cookie, studentRg);
  return {cookie, studentId, systemsData, response};
}

function onFetchContract({cookie, studentId, systemsData, response}) {
  const contractData = response.data;
  return {cookie, studentId, systemsData, contractData};
}

async function fetchUser({cookie, studentId, systemsData, contractData}) {
  const response = await Repository.fetchUser(cookie, studentId);
  return {cookie, systemsData, contractData, response};
}

function onFetchUser({cookie, systemsData, contractData, response}) {
  const userData = response.data;
  const studentData = Builder.build(userData, contractData, systemsData);
  return {cookie, studentData};
}

function sendResponse({cookie, studentData}) {
  return {
    "data": {
      "cookie": {
        "host": "https://gfa.unip.br",
        "value": cookie,
      },
      "student": studentData,
    },
  };
}
