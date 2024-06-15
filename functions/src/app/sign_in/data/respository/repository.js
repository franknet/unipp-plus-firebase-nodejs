
const API = require("../api/api");
const FBAuth = require("firebase-admin").auth();

exports.signIn = (credentials) => API.singIn(credentials);
exports.fetchSystems = (token) => API.fetchSystems(token);

exports.createUser = (email, password) => FBAuth.createUser({
  email,
  password,
  disabled: false,
  emailVerified: true,
});
exports.fetchFBUserByEmail = (email) => FBAuth.getUserByEmail(email);
exports.fetchFBUserByUID = (uid) => FBAuth.getUser(uid);
