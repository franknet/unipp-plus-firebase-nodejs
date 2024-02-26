const {getFirestore} = require("firebase-admin/firestore");

const firestore = getFirestore();

/**
 * Retrieves a product from the Firestore database based on the given ID.
 *
 * @param {string} id - The ID of the product to retrieve.
 * @return {Promise<DocumentData|null>} - The retrieved product data
 */
async function getProduct(id) {
  const docSnapshot = await firestore.collection("products").doc(id).get();
  if (docSnapshot.exists) {
    return {id, ...docSnapshot.data()};
  } else {
    return null;
  }
}

/**
 * Updates the paymentServiceProductId of a product in Firestore.
 *
 * @param {Object} product - The product to be updated.
 * @param {string} product.reference_id - The reference ID of the product document in Firestore.
 * @param {string} product.id - The new paymentServiceProductId to be set for the product.
 * @return {Promise<void>} - A promise that resolves when the product has been updated successfully.
 */
async function updateProduct(product) {
  await firestore.collection("products")
      .doc(product.reference_id)
      .update({paymentServiceProductId: product.id});
}

module.exports = {getProduct, updateProduct};
