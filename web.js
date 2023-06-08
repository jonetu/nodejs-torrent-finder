const express = require('express');
const controller = require('./app/controller');
const readline = require('readline');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('search');
});

app.post('/search', (req, res) => {
  const search = req.body.search;

  if (search === '') {
    res.redirect('/'); // Redirecionar de volta à página inicial se a entrada estiver vazia
    return;
  }

  controller.extractTorrents(search)
    .then(data => {
      if (!data.urls.length) {
        res.render('no-results');
        return;
      }

      res.render('results', { data });
    })
    .catch(err => {
      console.log(err);
      res.render('error');
    });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
