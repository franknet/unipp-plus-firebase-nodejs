/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const {Errors} = require("up-core").Firebase;
const Repository = require("../data/repository");
const Builder = require("./builder");

exports.fetchStudentRecords = (session) => fetchRecords(session)
    .then(onFetchRecords)
    .then(fetchReleasedRecords)
    .then(onFetchReleasedRecords)
    .then(sendResponse)
    .catch(Errors.onError);

async function fetchRecords(session) {
  const response = Repository.fetchRecords(session);
  return {session, response};
}

function onFetchRecords({session, response}) {
  const recordsData = response.data;
  return {session, recordsData};
}

async function fetchReleasedRecords({session, recordsData}) {
  const response = Repository.fetchReleasedRecords(session);
  return {recordsData, response};
}

function onFetchReleasedRecords({recordsData, response}) {
  const releasedRecordsData = response.data;
  return {recordsData, releasedRecordsData};
}

function sendResponse({recordsData, releasedRecordsData}) {
  return {
    "data": Builder.build(recordsData, releasedRecordsData),
  };
}

exports.fetchAttendanceDetails = async (session) => {
  try {
    const {data} = await Repository.fetchAttendanceDetails(session);
    return data;
  } catch (error) {
    throw Errors.onError(error);
  }
};
