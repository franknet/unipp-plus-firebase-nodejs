const API = require("./api");
const Firestore = require("./firestore");

/**
 * Fetches a product from Firestore based on the provided id.
 *
 * @param {string} id - The id of the product to fetch.
 * @return {Promise<any>} - The product that was fetched, null otherwise
 */
function fetchProduct(id) {
  return Firestore.getProduct(id);
}

/**
 * Syncs the given product to Payment Service.
 *
 * @param {object} product - The product object to be synced.
 * @return {Promise<void>}
 */
async function syncProduct(product) {
  const response = await API.createProduct(product);

  return response.data;
}

module.exports = {fetchProduct, syncProduct};
