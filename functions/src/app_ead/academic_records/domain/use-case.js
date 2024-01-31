

const {Errors} = require("up-core").Firebase;
const Repository = require("../data/repository");
const Builder = require("./builder");

exports.fetchAcademicRecords = async (session) => {
  try {
    const responses = await Promise.all([
      Repository.fetchCourseInfo(session),
      Repository.fetchDisciplines(session),
    ]);
    return {
      // eslint-disable-next-line max-len
      "data": Builder.buildAcademicRecords(responses[0].data, responses[1].data),
    };
  } catch (error) {
    throw Errors.onError(error);
  }
};
