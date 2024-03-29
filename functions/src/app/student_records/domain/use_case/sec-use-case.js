/* eslint-disable require-jsdoc */


const Repository = require("../../data/repository/sec-repository");
const Builder = require("../builder/sec-builder");

exports.fetchRecords = (session) => Promise.all([
  Repository.fetchNF(session),
  Repository.fetchME(session),
]).then(onFetchRecords).then(sendResponse);

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
