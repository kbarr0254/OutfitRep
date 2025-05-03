const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const clothesRoutes = require('./routes/clothes');
const outfitsRoutes = require('./routes/outfits');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/clothes', clothesRoutes);
app.use('/outfits', outfitsRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.listen(3000, () => console.log('Outfit Planner running on http://localhost:3000'));
