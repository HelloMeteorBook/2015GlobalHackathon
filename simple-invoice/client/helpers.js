Template.registerHelper("formatAsCurrency", function(field){
  if(field && field > 0)
    return accounting.formatMoney(field);
});
