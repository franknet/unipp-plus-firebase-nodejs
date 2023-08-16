/* eslint-disable max-len */
const repository = require("../data/repository");
const userBuilder = require("./builder");
const {onError} = require("../../../utils/https-errors");

exports.signIn = async (data, systems) => {
  try {
    const sessionResponse = await repository.signIn({
      username: data["id"],
      password: data["password"],
      pagina: "",
    });
    const cookie = sessionResponse["cookie"];
    const session = sessionResponse["data"];
    const userId = session["id"];
    const userCode = session["login"];
    const contractResponse = await repository.fetchContract(cookie, userCode);
    const userResponse = await repository.fetchUser(cookie, userId);
    return {
      "cookie": cookie,
      "user": userBuilder.from(userResponse.data, contractResponse.data, systems),
    };
  } catch (error) {
    throw onError(error);
  }
};
