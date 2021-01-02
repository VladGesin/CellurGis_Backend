const express = require('express');
const dotenv = require('dotenv');
const pool = require('./database/db');
const cors = require('cors');

//Load env vars
dotenv.config({ path: './config/config.env' });
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//ROUTES
//create dots
app.post('/dot', async (req, res) => {
	try {
		const { longitude, latitude, rsrp, site_name } = req.body;
		const dot = await pool.query(
			'INSERT INTO dots(longitude, latitude, rsrp, site_name) VALUES($1, $2, $3 ,$4) RETURNING *',
			[ longitude, latitude, rsrp, site_name ]
		);
		res.json(dot.rows[0]);
	} catch (err) {
		console.error(err.massage);
	}
});
//get all dots

app.get('/dots', async (req, res) => {
	try {
		const dots = await pool.query('SELECT * FROM dots');
		res.json(dots.rows);
	} catch (error) {
		console.log(error.massage);
	}
});

//get dot

app.get('/dots/:site_name', async (req, res) => {
	try {
		const { site_name } = req.params;
		const dots = await pool.query('SELECT * FROM dots WHERE site_name =$1', [ site_name ]);
		res.json(dots.rows);
	} catch (error) {
		console.log(err.massage);
	}
});

//update dots

app.put('/dot/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { longitude, latitude, rsrp, site_name } = req.body;
		console.log(site_name, id, longitude, latitude, rsrp);
		const updateDot = await pool.query(
			'UPDATE dots SET longitude= $1 ,latitude =$2, rsrp=$3 WHERE (site_name =$4 AND dot_id=$5) ',
			[ longitude, latitude, rsrp, site_name, id ]
		);
		res.json(updateDot.rows);
		console.log(updateDot);
	} catch (error) {
		console.log(err.massage);
	}
});

//delete dots

app.get('/', (req, res) => {
	res.status(200).send('hello word');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Lisining on port ${PORT}`));
