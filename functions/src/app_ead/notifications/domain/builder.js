const _ = require("lodash");
const TurndownService = require("turndown");

exports.build = (jsonArray) => _.flatMap(jsonArray, (json) => {
  return {
    "id": json["codAviso"],
    "date": new Date(json["data"]).toLocaleDateString("pt-BR"),
    "title": json["tituloClean"],
    "description": new TurndownService().turndown(json["descricao"]),
    "attachmentId": json["anexoID"],
  };
});
