
const Repository = require("../../data/respository/repository");
const {parseError} = require("up-core").Http.Errors;

module.exports.fetchFBUser = async ({email, password}) => {
  try {
    const fbUser = await Repository.fetchFBUserByEmail(email);
    return fbUser.uid;
  } catch (error) {
    return createFbUser({email, password});
  }
};

const createFbUser = async ({email, password}) => {
  try {
    const fbUser = await Repository.createUser(email, password);
    return fbUser.uid;
  } catch (error) {
    const apiError = parseError(error);
    throw apiError;
  }
};
