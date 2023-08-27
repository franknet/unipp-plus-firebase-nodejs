/* eslint-disable max-len */

const {
  fetchGrades,
  fetchReleasedGrades,
  fetchAttendanceDetails,
} = require("../data/repository");
const {onError} = require("../../../utils/https-errors");
const builder = require("./builder");

exports.fetchGrades = async (session) => {
  try {
    const gradesResponse = await fetchGrades(session);
    const releasedGradesResponse = await fetchReleasedGrades(session);
    return builder.buildGrades(gradesResponse.data, releasedGradesResponse.data);
  } catch (error) {
    throw onError(error);
  }
};

exports.fetchAttendanceDetails = async (session) => {
  try {
    const {data} = await fetchAttendanceDetails(session);
    return data;
  } catch (error) {
    throw onError(error);
  }
};
