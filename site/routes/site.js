module.exports = (app) => {

  let api = app.site.api.email;

    app.post('/email', api.send);
    app.get('/', (req, res) => res.render('index.html'));
    //app.get('/blog');
}
