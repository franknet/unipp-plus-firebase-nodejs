const repository = require("../data/repository");
const {buildRecords} = require("./builder");
const {onError} = require("../../../utils/https-errors");

exports.fetchAcademicRecords = async (session) => {
  try {
    const {data} = await repository.fetchAcademicRecords(session);
    return buildRecords(data);
  } catch (error) {
    throw onError(error);
  }
};
