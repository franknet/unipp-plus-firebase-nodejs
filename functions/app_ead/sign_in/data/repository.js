const api = require("./api");

exports.signIn = async (credentials) => {
  const {headers, data} = await api.singIn(credentials);
  return {
    data: data,
    cookie: headers["set-cookie"],
  };
};

exports.fetchContract = async (cookie, userCode) => {
  return (await api.fetchContract(cookie, userCode)).data;
};

exports.fetchUser = async (cookie, userId) => {
  return (await api.fetchUser(cookie, userId)).data;
};
