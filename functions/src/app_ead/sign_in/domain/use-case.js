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
    const cookie = sessionResponse.headers["set-cookie"];
    const session = sessionResponse.data;
    const userId = session["id"];
    const userRg = session["login"];
    const contractResponse = await repository.fetchContract(cookie, userRg);
    const userResponse = await repository.fetchUser(cookie, userId);
    return {
      data: {
        "cookie": cookie,
        "user": userBuilder.from(userResponse.data, contractResponse.data, systems),
      },
    };
  } catch (error) {
    throw onError(error);
  }
};
