Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

// STATIC pages
Router.route('/', {
  name: 'home',
  //fastRender: true
});

// STATIC pages
Router.route('/about', {
  name: 'aboutPage',
  //fastRender: true
});
