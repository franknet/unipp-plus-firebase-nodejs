/* eslint-disable no-extend-native */
/* eslint-disable new-cap */
/* eslint-disable max-len */

const _ = require("lodash");
// const {logObject} = require("../utils/logger");

exports.toNumber = (value) => {
  if (value == "AP") {
    return 10;
  }
  if (_.isNil(value)) {
    return 0;
  }
  const formatedValue = value.replace(".", "").replace(",", ".");
  const valueFlt = _.toNumber(formatedValue);
  if (_.isNaN(valueFlt)) {
    return 0;
  }
  return valueFlt;
};

exports.inRange = (num, max, min) => num <= max && num >= min;

exports.isNumber = (text) => {
  if (_.isNil(text)) {
    return false;
  }
  const formatedValue = text.replace(".", "").replace(",", ".");
  return !_.isNaN(_.toNumber(formatedValue));
};

exports.toCurrency = (number) => Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(number);


exports.test = String.prototype.test = () => "Hello";
