const repository = require("../data/repository");
const userBuilder = require("./builder");

exports.signIn = async (data, systems) => {
  const sessionResponse = await repository.signIn({
    "username": data["id"],
    "password": data["password"],
    "pagina": "",
  });
  const cookie = sessionResponse["cookie"];
  const session = sessionResponse["data"];
  const userId = session["id"];
  const userCode = session["login"];
  const contract = await repository.fetchContract(cookie, userCode);
  const userData = await repository.fetchUser(cookie, userId);
  return {
    "cookie": cookie,
    "user": userBuilder.from(userData, contract, systems),
  };
};
