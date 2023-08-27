

const {onError} = require("../../utils/https-errors");
const repository = require("../data/repository");

exports.fetch = async (session) => {
  try {
    const {data} = await repository.fetch(session);
    return {
      "data": data,
    };
  } catch (error) {
    throw onError(error);
  }
};
