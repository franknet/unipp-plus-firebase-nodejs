
const {fetchNF, fetchME} = require("../data/repository");
const {buildGrades} = require("./builder");

exports.fetchGrades = async (session) => {
  const nf = await fetchNF(session);
  const me = await fetchME(session);
  return buildGrades(nf, me);
};
