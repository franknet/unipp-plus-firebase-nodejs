const repository = require("../data/repository");
const {buildRecords} = require("./builder");

exports.fetchAcademicRecords = async (session) => {
  const data = await repository.fetchAcademicRecords(session);
  return buildRecords(data);
};
