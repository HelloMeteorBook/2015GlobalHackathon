Template.pay.onCreated(function(){
  handlerCreator = function(invoice) {
    handler = StripeCheckout.configure({
      key: Meteor.settings.public.stripePublishableKey,
      token: function(token) {
        stripeToken = token.id;
        customerEmail = token.email;
        Meteor.call('payInvoice', {invoice: invoice, stripeToken: stripeToken, customerEmail: customerEmail}, function(error, result) {
          if (error) {
            console.log("Error submitting form: ", error);
          } else {
            console.log('Paid');
          }
        });
      }
    });
    return handler;
  }
})

Template.pay.helpers({
  isPaid:function() {
    return this.isPaid;
  }
});

Template.pay.events({
  'click button[type="submit"]': function(event, template) {
    event.preventDefault();

    var button = $(event.target).find('button[type="submit"]')
    button.prop('disabled', true);
    button.text('Paying')
    
    var price = this.totalPrice * 100;
    var handler = handlerCreator(this);
    handler.open(
      {
        amount: price,
        currency: 'usd',
        name: this.companyName,
        description: this.projectDescription,
        panelLabel: 'Pay Now',
        allowRememberMe: false,
        closed: function() {
          button.attr('disabled', false);
          button.text('Pay');
        }
      }
    )
  }
})
