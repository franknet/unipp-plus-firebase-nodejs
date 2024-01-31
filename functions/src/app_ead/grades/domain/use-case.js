/* eslint-disable max-len */

const {Errors} = require("up-core").Firebase;
const Repository = require("../data/repository");
const Builder = require("./builder");

exports.fetchGrades = async (session) => {
  try {
    const gradesResponse = await Repository.fetchGrades(session);
    const releasedGradesResponse = await Repository.fetchReleasedGrades(session);
    return Builder.buildGrades(gradesResponse.data, releasedGradesResponse.data);
  } catch (error) {
    throw Errors.onError(error);
  }
};

exports.fetchAttendanceDetails = async (session) => {
  try {
    const {data} = await Repository.fetchAttendanceDetails(session);
    return data;
  } catch (error) {
    throw Errors.onError(error);
  }
};
