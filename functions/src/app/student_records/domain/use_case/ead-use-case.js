/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const Repository = require("../../data/repository/ead-repository");
const Builder = require("../builder/ead-builder");

exports.fetchRecords = (session) => fetchStudentRecords(session)
    .then(onFetchStudentRecords)
    .then(fetchReleasedStudentRecords)
    .then(onFetchReleasedStudentRecords)
    .then(sendResponse);

async function fetchStudentRecords(session) {
  const response = await Repository.fetchRecords(session);
  return {session, response};
}

function onFetchStudentRecords({session, response}) {
  const recordsData = response.data;
  return {session, recordsData};
}

async function fetchReleasedStudentRecords({session, recordsData}) {
  const response = await Repository.fetchReleasedRecords(session);
  return {recordsData, response};
}

function onFetchReleasedStudentRecords({recordsData, response}) {
  const releasedStudentRecordsData = response.data;
  return Builder.build(recordsData, releasedStudentRecordsData);
}

function sendResponse(studentRecords) {
  return {
    "data": studentRecords,
  };
}
