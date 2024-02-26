const Repository = require("../data/repository");
const {Errors} = require("up-core").Firebase;

exports.syncProduct = (id) => Repository.fetchProduct(id)
    .then((product) => Repository.syncProduct(product))
    .then(onProductSynced)
    .catch(Errors.onError);

/**
 * This method is called when a product is synced.
 *
 * @return {string} - The status of the product synchronization
 */
function onProductSynced() {
  return "OK";
}
