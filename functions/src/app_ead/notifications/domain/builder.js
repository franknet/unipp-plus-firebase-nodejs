const _ = require("lodash");

exports.build = (jsonArray) => _.flatMap(jsonArray, (json) => {
  return {
    "id": json["codAviso"],
    "timestamp": json["data"],
    "title": json["tituloClean"],
    "attachmentId": json["anexoID"],
  };
});
