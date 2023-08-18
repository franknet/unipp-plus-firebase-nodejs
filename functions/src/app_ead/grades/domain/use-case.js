
const {fetchGrades, fetchReleasedGrades, fetchAttendanceDetails} = require("../data/repository");
const {buildGrades} = require("./builder");
const {onError} = require("../../../utils/https-errors");

exports.fetchGrades = async (session) => {
  try {
    const {data} = await fetchGrades(session);
    return data;
  } catch (error) {
    throw onError(error);
  }
};

exports.fetchReleasedGrades = async (session) => {
  try {
    const nfResponse = await fetchNF(session);
    const meResponse = await fetchME(session);
    return buildGrades(nfResponse.data, meResponse.data);
  } catch (error) {
    throw onError(error);
  }
};
