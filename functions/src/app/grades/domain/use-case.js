
const {Errors} = require("up-core").Firebase;
const Repository = require("../data/repository");
const Builder = require("./builder");

exports.fetchGrades = (session) => Promise.all([
  Repository.fetchNF(session),
  Repository.fetchME(session),
])
    .then(onFetchGrades)
    .catch(Errors.onError);

// eslint-disable-next-line require-jsdoc
function onFetchGrades(responses) {
  const nfHtml = responses[0].data;
  const meHtml = responses[1].data;
  return Builder.buildGrades(nfHtml, meHtml);
}
