const {Errors} = require("up-core").Firebase;
const Repository = require("../data/repository");

exports.syncCustomer = (user) => Repository.createCustomer(user)
    .then((customer) => Repository.syncCustomer(customer))
    .then(onCustomerSynced)
    .catch(Errors.onError);

/**
 * Retrieves the status of customer synchronization.
 *
 * @return {string} The status of the customer synchronization.
 */
function onCustomerSynced() {
  return "OK";
}
