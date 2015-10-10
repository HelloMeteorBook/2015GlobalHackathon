Meteor.publish('singleInvoice', function(invoiceId){
  // return Lists.find({userId: this.userId});
  return Invoices.find({_id: invoiceId});
});
