Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'createAndView'
});

Router.route('/about', {
  name: 'about'
});

Router.route('/stripe/callback', function () {
  var req = this.request;
  var res = this.response;
  
  var stripeAuth = this.params.query.code;
  var invoiceId = this.params.query.state;
  
  Meteor.call("getStripeInfo", stripeAuth, invoiceId, function(error, result){ 
    if(error){ 
      console.log("error", error); 
      res.end();
    } 
    if(result){ 
      res.writeHead(302, {
        'Location': '/invoices/' + invoiceId + '/success'
      });

      res.end();
    } 
  });
}, {where: 'server'});

Router.route('/invoices/:invoiceId/success', {
  name: 'success',
  waitOn: function() {
    return Meteor.subscribe('singleInvoice', this.params.invoiceId);
  },
  data: function() {
    return {invoice: Invoices.findOne(this.params.invoiceId)};
  },
  fastRender: true
})

Router.route('invoices/:invoiceId/pay', {
  name: 'pay'
});
