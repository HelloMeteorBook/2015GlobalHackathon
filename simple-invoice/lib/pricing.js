var stripeFeePercentage = .029;
var stripeFeeInCents = 30;
var simpleInvoiceFeeInCents = 100;
// This function returns all fees and prices necessary to charge a buyer.
// priceInCents: The event price, usually from a list object, in cents
// buyerPaysFees: A boolean that specifies if the buyer pays the fees or if the seller eats them
// return: An object with all pricing and fee components, in cents
eventPriceComponents = function(priceInCents) {
  var components = {};
  // The seller typed in an amount that the BUYER will pay
  // but the seller will get less
  components.applicationFee = applicationFee(priceInCents);
  components.stripeFee = stripeFee(priceInCents);
  components.sellerAmount = sellerReceivesAmountFromEventPrice(priceInCents);
  components.buyerAmount = priceInCents;
  return components;
}

priceInCentsConvert = function(priceInDollars) {
  return priceInDollars * 100;
}

stripeFee = function(priceInCents) {
  return +accounting.toFixed(((priceInCents * stripeFeePercentage) + stripeFeeInCents), 0);
}

applicationFee = function(priceInCents) {
  return +accounting.toFixed((simpleInvoiceFeeInCents + stripeFee(priceInCents)), 0);
}

sellerReceivesAmountFromEventPrice = function(priceInCents) {
  return +accounting.toFixed((priceInCents - applicationFee(priceInCents)), 0);
}
