
const {singIn, fetchSystems} = require("../api");
const FBAuth = require("firebase-admin").auth();

exports.signIn = singIn;

exports.fetchSystems = fetchSystems;

exports.fetchFBUserByEmail = FBAuth.getUserByEmail;

exports.createFBUser = ({email, password}) => FBAuth.createUser({
  email,
  password,
  disabled: false,
  emailVerified: true,
});
