const API = require("./api");
const Firestore = require("./firestore");

exports.createCustomer = (user) => API.createCustomer(user);
exports.syncCustomer = (customer) => Firestore.syncCustomer(customer);
