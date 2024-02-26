const {getFirestore} = require("firebase-admin/firestore");

const firestore = getFirestore();

/**
 * Fetches user customer data from Firestore.
 *
 * @param {UserInfo} user - The user in Firebase Authentication.
 * @return {Promise<any|null>} The customer information from Firestore
 */
async function fetchCustomer(user) {
  const customer = await firestore.collection("users").doc(user.uid).get();

  return customer.data();
}

/**
 * Synchronizes customer data with external system.
 *
 * @param {Object} customer - The customer object to be synchronized.
 * @return {Promise<void>}
 */
async function syncCustomer(customer) {
  if (customer === null) {
    return;
  }

  await firestore.collection("users").doc(customer.reference_id).set({
    email: customer.email,
    paymentServiceCustomerId: customer.id,
  });
}

module.exports = {fetchCustomer, syncCustomer};
