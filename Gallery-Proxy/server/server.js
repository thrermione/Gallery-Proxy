const express = require('express');
const compression = require('compression');

const app = express();
const path = require('path');

const port = 3005;
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, '../public/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/images/:id', (req, res) => {
  axios
    .get(`http://54.176.112.170:3001/api/images/${req.params.id}`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/product/:id', (req, res) => {
  axios.get(`http://54.219.31.175:3002/product/${req.params.id}`)
    .then((response) => res.status(200).send(response.data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/product/:id/find-store', (req, res) => {
  axios.get(`http://54.219.31.175:3002/product/${req.params.id}/find-store/?q=${req.query.q}`)
    .then((response) => res.status(200).send(response.data))
    .catch((error) => res.status(500).send(error));
});

app.get('/api/products/:product_id/reviews', (req, res) => {
  axios
    .get(`http://52.9.106.137:8080/api/products/${req.params.product_id}/reviews`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/api/products/:product_id/reviews/:review_id', (req, res) => {
  axios
    .get(
      `http://52.9.106.137:8080/api/products/${req.params.product_id}/reviews/${req.params.review_id}`,
    )
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put('/api/products/:product_id/reviews/:review_id', (req, res) => {
  axios({
    method: 'PUT',
    url: `http://52.9.106.137:8080/api/products/${req.params.product_id}/reviews/${req.params.review_id}`,
    data: req.body,
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.listen(port, () => console.log(`Proxy server: ----- http://localhost:${port}`));
