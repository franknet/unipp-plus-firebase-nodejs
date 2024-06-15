/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const Repository = require("../../data/respository/ead-repository");
const Builder = require("../builder/ead-builder");

exports.fetchSec = (credentials, loginData, systemsData) => fetchStudent(credentials, loginData, systemsData)
    .then(onFetchStudent)
    .then(fetchContract)
    .then(onFetchContract)
    .then(fetchUser)
    .then(onFetchUser)
    .then(sendResponse);

async function fetchStudent(credentials, loginData, systemsData) {
  const response = await Repository.signIn(credentials);
  return {loginData, systemsData, response};
}

function onFetchStudent({loginData, systemsData, response}) {
  const {data, headers} = response;
  const cookie = headers["set-cookie"];
  const studentId = data["id"];
  const studentRg = data["login"];
  return {cookie, studentId, studentRg, loginData, systemsData};
}

async function fetchContract({cookie, studentId, studentRg, loginData, systemsData}) {
  const response = await Repository.fetchContract(cookie, studentRg);
  return {cookie, studentId, loginData, systemsData, response};
}

function onFetchContract({cookie, studentId, loginData, systemsData, response}) {
  const contractData = response.data;
  return {cookie, studentId, loginData, systemsData, contractData};
}

async function fetchUser({cookie, studentId, loginData, systemsData, contractData}) {
  const response = await Repository.fetchUser(cookie, studentId);
  return {cookie, loginData, systemsData, contractData, response};
}

function onFetchUser({cookie, loginData, systemsData, contractData, response}) {
  const userData = response.data;
  const studentData = Builder.build(loginData, systemsData, contractData, userData);
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
