/* eslint-disable max-len */
const Repository = require("../data/repository");
const Builder = require("./builder");
const { Errors } = require("../../../core").Firebase;

exports.signIn = async (data, systems) => {
  try {
    const sessionResponse = await Repository.signIn({
      username: data["id"],
      password: data["password"],
      pagina: "",
    });
    const cookie = sessionResponse.headers["set-cookie"];
    const session = sessionResponse.data;
    const userId = session["id"];
    const userRg = session["login"];
    const contractResponse = await Repository.fetchContract(cookie, userRg);
    const userResponse = await Repository.fetchUser(cookie, userId);
    return {
      data: {
        "cookie": cookie,
        "user": Builder.from(userResponse.data, contractResponse.data, systems),
      },
    };
  } catch (error) {
    throw Errors.onErroronError(error);
  }
};
