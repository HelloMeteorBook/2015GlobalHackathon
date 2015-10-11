Template.create.onCreated(function() {
  LineItems = new Meteor.Collection(null);
  LineItems.insert({});
});

Template.create.onRendered(function() {
  //Plugin Activation
  $('.date-picker').datepicker({
    todayBtn: "linked",
    todayHighlight: true
  });
  $('[name=dueDate]').attr('placeholder', moment(Date.now()).add(1, 'week').format('MM/DD/YYYY'));
  $('form').parsley({
    trigger: 'change',
    errorClass: 'has-error',
    successClass: 'has-success',
    classHandler: function (ParsleyField) {
      return ParsleyField.$element.parents('.form-group');
    },
    errorsWrapper: '<div class="help-block with-errors"></div>'
  });
});

Template.create.helpers({ 
  lineItems: function() {
    return LineItems.find({});
  },
  totalPrice: function() {
    var total = 0;
    LineItems.find({}).map(function(doc) {
      if(doc.price && doc.quantity)
        total += doc.price * doc.quantity;
    });
    LocalInvoices.update(this._id, {$set: {'totalPrice': total}});
    return accounting.formatMoney(total);
  }
});

Template.create.events({ 
  "keyup input, keyup textarea": function(event, template) {
    var key = event.target.name;
    var value = event.target.value;
    var set = {};
    set[key] = value;
    LocalInvoices.update(this._id, {
      $set: set
    });
  },
  "changeDate .date-picker": function(event, template) {
    var date = event.date;
    LocalInvoices.update(this._id, {$set: {'dueDate': date}})
  },
  'submit form': function(event, template) {
    event.preventDefault();
    
    var invoiceData = _.omit(this, '_id');
    
    var lineItems = _.filter(LineItems.find().fetch(), function(item) {return item.description && item.quantity && item.price})
    
    invoiceData = _.extend(invoiceData, {
      lineItems: lineItems
    })
    
    Meteor.call("createInvoice", invoiceData, function(error, result){ 
      if(error){ 
        console.log("error", error); 
      } 
      if(result){ 
         console.log(result);
      } 
    });
  }
}); 
