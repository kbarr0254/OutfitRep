const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const path = require('path');

router.get('/', (req, res) => {
  db.query('SELECT * FROM clothing_items', (err, results) => {
    if (err) return res.status(500).send('Database error');
    let html = '<h1>Clothing Items</h1><ul>';
    results.forEach(item => {
      html += `<li>${item.type} - ${item.color}: ${item.description}</li>`;
    });
    html += '</ul><a href="/">Back</a>';
    res.send(html);
  });
});

router.post('/add', (req, res) => {
  const { type, color, description } = req.body;
  if (!type || !color) return res.send('Missing fields');
  db.query('INSERT INTO clothing_items (type, color, description) VALUES (?, ?, ?)', [type, color, description], (err) => {
    if (err) return res.status(500).send('Insert error');
    res.redirect('/clothes');
  });
});

module.exports = router;