const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  db.query('SELECT * FROM outfits', (err, outfits) => {
    if (err) return res.status(500).send('Error fetching outfits');

    let html = '<h1>Outfits</h1>';
    outfits.forEach(outfit => {
      html += `<h3>${outfit.name} (${outfit.outfit_date})</h3><p>${outfit.notes}</p><form method="POST" action="/outfits/${outfit.id}/delete"><button>Delete</button></form>`;
    });
    html += '<a href="/">Back</a>';
    res.send(html);
  });
});

router.post('/add', (req, res) => {
  const { name, outfit_date, notes } = req.body;
  if (!name || !outfit_date) return res.send('Missing fields');
  db.query('INSERT INTO outfits (name, outfit_date, notes) VALUES (?, ?, ?)', [name, outfit_date, notes], (err) => {
    if (err) return res.status(500).send('Insert error');
    res.redirect('/outfits');
  });
});

router.post('/:id/delete', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM outfits WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Delete error');
    res.redirect('/outfits');
  });
});

module.exports = router;