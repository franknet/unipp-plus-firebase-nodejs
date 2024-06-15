/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const {Errors} = require("up-core").Firebase;
const Repository = require("../data/repository");
const Builder = require("./builder");

exports.fetchStudentRecords = (session) => fetchRecords(session)
    .then(onFetchRecords)
    .then(sendResponse)
    .catch(Errors.onError);

async function fetchRecords(session) {
  return Promise.all([
    Repository.fetchNF(session),
    Repository.fetchME(session),
  ]);
}

function onFetchRecords(responses) {
  const nfHtml = responses[0].data;
  const meHtml = responses[1].data;
  return Builder.build(nfHtml, meHtml);
}

function sendResponse(studentRecords) {
  return {
    "data": studentRecords,
  };
}
