
const {fetchNF, fetchME} = require("../data/repository");
const {buildGrades} = require("./builder");
const {onError} = require("../../../utils/https-errors");

exports.fetchGrades = async (session) => {
  try {
    const nfResponse = await fetchNF(session);
    const meResponse = await fetchME(session);
    return buildGrades(nfResponse.data, meResponse.data);
  } catch (error) {
    throw onError(error);
  }
};
