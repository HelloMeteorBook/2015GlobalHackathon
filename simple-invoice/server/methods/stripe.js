Meteor.methods({
  'getStripeInfo': function(stripeAuthorization, invoiceId) {
    check(stripeAuthorization, String);
    check(invoiceId, String);
    
    console.log("Stripe Auth Code: ", stripeAuthorization);
    
    var invoiceToUpdate = Invoices.find(invoiceId);
    if(invoiceToUpdate.stripe) {
      if((invoiceToUpdate.stripe.authorization_request_code == stripeAuthorization) && invoiceToUpdate.stripe.stripe_id) {
        throw new Meteor.Error("Already performed Stripe OAuth request with this token");
        return;
      }
    }

    var responseContent;

    try {
        // Request an access token
        console.log('Making Stripe Oauth POST request with token: ', stripeAuthorization);
        responseContent = HTTP.post(
            "https://connect.stripe.com/oauth/token", {
                params: {
                    client_id:     Meteor.settings.public.stripeClientId,
                    client_secret: Meteor.settings.stripePrivateKey,
                    code:          stripeAuthorization,
                    grant_type: 	'authorization_code'
                }
            }).content;

    } catch (err) {
        throw _.extend(new Error("Failed to complete OAuth handshake with stripe. " + err.message),
            {response: err.response});
    }
    // Success!  Extract the stripe access token and key
    // from the response
    var parsedResponse = JSON.parse(responseContent);

    var stripe_id = parsedResponse.stripe_user_id;

    if (!stripe_id) {
        throw new Error("Failed to complete OAuth handshake with stripe " +
           "-- can't find access token in HTTP response. " + responseContent);
    }
    
    Invoices.upsert({_id: invoiceId}, {
      $set:{
        'stripe.authorization_request_code': stripeAuthorization,
        'stripe.stripe_id': stripe_id,
        'stripeStatus': 'set'
      }
    });
    
    console.log('Succeeded in updating ' + invoiceId + ' with stripe id: ' + stripe_id + '.');
    
    return {
      result: 'Succeeded in adding stripe account to invoice.'
    };
  }
});
