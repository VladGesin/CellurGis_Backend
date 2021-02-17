const express = require('express');
const dotenv = require('dotenv');
const pool = require('./utils/db');
const cors = require('cors');
const dotRoutes = require('./routes/dotsRoutes');
const projectRoutes = require('./routes/projectRoutes');
const path = require('path');
const sitesRoutes = require('./routes/siteRoutes');
const charts = require('./routes/chartRoutes');
const users = require('./routes/usersRoutes');
const tabelRoutes = require('./routes/tableRoutes');

//Load env vars
dotenv.config({ path: './config/config.env' });
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//ROUTES
app.use(dotRoutes);
app.use(projectRoutes);
app.use(sitesRoutes);
app.use(charts);
app.use(users);
app.use(tabelRoutes);
app.get('/', (req, res) => {
  res.status(200).send('hello word');
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;

  res.status(status).json({ message: message });
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Lisining on port ${PORT}`));
