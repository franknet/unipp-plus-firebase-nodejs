
const {fetchFBUserByEmail, createFBUser} = require("../../data/respository");

exports.fetchFBUser = async ({email, password}) => {
  try {
    return await fetchFBUserByEmail(email);
  } catch (error) {
    return await createFBUser({email, password});
  }
};
