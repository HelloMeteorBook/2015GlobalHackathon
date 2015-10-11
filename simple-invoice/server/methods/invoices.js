Meteor.methods({ 
  createInvoice: function(invoiceData) { 
    check(invoiceData, {
      lineItems: [Object],
      invoiceNumber: String,
      companyName: String,
      clientEmail: String,
      clientName: String,
      projectDescription: String,
      dueDate: Date,
      totalPrice: Number
    });
    
    invoiceData = _.extend(invoiceData, {
      'stripeStatus': 'pending',
      'createdDate': Date.now(),
      'isPersistedCollection': true,
      'isPaid': false
    });
    
    var invoiceId = Invoices.insert(invoiceData);
    return {invoiceId: invoiceId};
  },
  payInvoice: function(paymentData) {
    check(paymentData, {
      stripeToken: String,
      invoice: Object,
      customerEmail: String
    });
    
    var stripeToken = paymentData.stripeToken;
    var invoiceId = paymentData.invoice._id;
    var customerEmail = paymentData.customerEmail;
    
    chargeCard(stripeToken, invoiceId, customerEmail, function(error, result) {
      console.log("Charge result: ", result);
      console.log("Charge error: ", error);
      if (error) {
        console.log(error);
        throw new Meteor.Error('invalid-charge', 'There was a problem processing your submission');
      }
      else {
        console.log('updating invoice');
        var chargeResult = result;
        // Update invoice isPaid
        Invoices.update({_id: invoiceId}, {
          $set: {
            'isPaid': true
          }
        });
      }
    });

    console.log('Returning invoiceId: ', invoiceId);
    return invoiceId;
  }
});

chargeCard = function(stripeToken, invoiceId, customerEmail, callback) {
  check(stripeToken, String);
  check(invoiceId, String);
  check(customerEmail, String);
  var Stripe = StripeAPI(Meteor.settings.stripePrivateKey);

  var invoice = Invoices.findOne(invoiceId);
  if(invoice.stripe) {
    var connectedAccountId = invoice.stripe.stripe_id;
    console.log("Stripe Account ID: " + connectedAccountId);
  } else {
    throw new Meteor.Error('charge-error', 'There is no valid user stripe account for this list.');
  }

  // Change charge price into cents for Stripe API
  var invoiceInCents = priceInCentsConvert(invoice.totalPrice);
  var priceComponents = eventPriceComponents(invoiceInCents);
  
  var totalChargeAmount = priceComponents.buyerAmount;
  var eventApplicationFee = priceComponents.applicationFee;
  console.log("Total Charge Amount: " + totalChargeAmount);
  console.log("EventApplicationFee: " + eventApplicationFee);

  var stripeChargeCreateSync = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);
  // call the sync version of our API func with the parameters from the method call

  console.log('Starting chargeCard process');
  try {
    console.log('Creating charge');
    var charge = stripeChargeCreateSync({
      amount: totalChargeAmount,
      currency: 'usd',
      description: invoice.projectDescription,
      receipt_email: customerEmail,
      application_fee: eventApplicationFee,
      source: stripeToken,
      destination: connectedAccountId
    });
    console.log("charge: ", charge)
  } catch(error) {
    console.log("charge create error", error);
    throw new Meteor.Error('charge-error', 'There was a problem charging your card.');
  }

  console.log('Charge created');
  callback(null, charge);
}
