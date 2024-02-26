const {syncCustomer} = require("./domain/use-case");

exports.syncCustomer = (event) => syncCustomer(event.data);
