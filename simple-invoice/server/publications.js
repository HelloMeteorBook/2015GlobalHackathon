Meteor.publish('singleInvoice', function(invoiceId){
  check(invoiceId, String)
  // return Lists.find({userId: this.userId});
  return Invoices.find({_id: invoiceId});
});
