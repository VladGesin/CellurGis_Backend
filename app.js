const express = require('express');
const dotenv = require('dotenv');
const pool = require('./utils/db');
const cors = require('cors');
const dotRoutes = require('./routes/dotsRoutes');

//Load env vars
dotenv.config({ path: './config/config.env' });
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//ROUTES
app.use(dotRoutes);

app.get('/', (req, res) => {
	res.status(200).send('hello word');
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Lisining on port ${PORT}`));
