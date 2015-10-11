Invoices = new Mongo.Collection('invoices');

Invoices.deny({
  update: function() {
    return true;
  },
  insert: function() {
    return true;
  }, 
  remove: function() {
    return true;
  }
});
