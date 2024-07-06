const _ = require("lodash");

exports.build = (signInData, systemsData) => {
  const json = {};
  addUser(json, signInData);
  addCourse(json, signInData);
  addIdCard(json, systemsData);
  return json;
};

const addUser = (json, data) => {
  json["user"] = {
    "name": data["nomeUsuario"],
  };
};

const addCourse = (json, data) => {
  json["course"] = {};
};

const addIdCard = (json, data) => {
  const card = _.find(data, {"id": 325});
  const eadCard = _.find(data, {"id": 153});
  const idCard = _.defaultTo(card, eadCard);

  if (_.isNil(idCard)) {
    return;
  }

  json["idCard"] = {
    "url": idCard["url"],
    "type": _.isNil(eadCard) ? "web" : "pdf",
  };
};
