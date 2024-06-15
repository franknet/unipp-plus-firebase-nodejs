
const _ = require("lodash");

exports.build = (periodsData) => {
  const content = periodsData["dados"];
  return _.flatMap(content, "ano");
};
