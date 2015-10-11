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
})
