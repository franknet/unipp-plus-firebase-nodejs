
const {Errors} = require("up-core").Firebase;
const Repository = require("../data/repository");
const Builder = require("./builder");

// eslint-disable-next-line max-len
exports.fetchAcademicRecords = (session) => Repository.fetchAcademicRecords(session)
    .then(onFetchAcademicRecords)
    .catch(Errors.onError);

// eslint-disable-next-line require-jsdoc
function onFetchAcademicRecords(data) {
  return {
    "data": Builder.buildRecords(data),
  };
}
