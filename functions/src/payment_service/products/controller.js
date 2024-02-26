const {syncProduct} = require("./domain/use-case");

exports.syncProduct = (event) => syncProduct(event.params.productId);
