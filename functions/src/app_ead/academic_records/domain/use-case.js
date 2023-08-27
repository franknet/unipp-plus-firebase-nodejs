

const {onError} = require("../../../utils/https-errors");
const {fetchCourseInfo, fetchDisciplines} = require("../data/repository");
const {buildAcademicRecords} = require("./builder");

exports.fetchAcademicRecords = async (session) => {
  try {
    const responses = await Promise.all([
      fetchCourseInfo(session),
      fetchDisciplines(session),
    ]);
    return {
      "data": buildAcademicRecords(responses[0].data, responses[1].data),
    };
  } catch (error) {
    throw onError(error);
  }
};
