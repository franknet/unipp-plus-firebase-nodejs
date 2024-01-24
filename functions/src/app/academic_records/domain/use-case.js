const Repository = require("../data/repository");
const Builder = require("./builder");
const { Errors } = require("../../../core").Firebase;

exports.fetchAcademicRecords = async (session) => {
  try {
    const {data} = await Repository.fetchAcademicRecords(session);
    return Builder.buildRecords(data);
  } catch (error) {
    throw Errors.onError(error);
  }
};
