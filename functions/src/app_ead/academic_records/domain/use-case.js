/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const {Errors} = require("up-core").Firebase;
const Repository = require("../data/repository");
const Builder = require("./builder");

exports.fetchAcademicRecords = (session) => fetchAcademicRecords(session)
    .then(onFetchAcademicRecords)
    .catch(Errors.onError);

async function fetchAcademicRecords(session) {
  return Promise.all([Repository.fetchCourseInfo(session), Repository.fetchDisciplines(session)]);
}

function onFetchAcademicRecords(responses) {
  return {
    "data": Builder.buildAcademicRecords(responses[0].data, responses[1].data),
  };
}
