const db = require('./db');

//Get All Dots
const getAllDots = async () => {
	try {
		const dots = await db.query('SELECT * FROM dots');
		return dots.rows;
	} catch (error) {
		console.log(error.massage);
	}
};

//Get Dots of Site Name
const getDot = async (site_name) => {
	try {
		const dots = await db.query('SELECT * FROM dots WHERE site_name = $1', [ site_name ]);
		return dots;
	} catch (error) {
		console.log(err.massage);
	}
};

//Create Dot

const createDot = async (longitude, latitude, rsrp, site_name) => {
	try {
		const dot = await db.query(
			'INSERT INTO dots(longitude, latitude, rsrp, site_name) VALUES($1, $2, $3 ,$4) RETURNING *',
			[ longitude, latitude, rsrp, site_name ]
		);
		return dot.rows[0];
	} catch (err) {
		console.error(err.massage);
	}
};

//Update dot by id row

const updateDot = async (id, longitude, latitude, rsrp, site_name) => {
	try {
		const updateDot = await db.query(
			'UPDATE dots SET longitude= $1 ,latitude =$2, rsrp=$3 WHERE (site_name =$4 AND dot_id=$5) ',
			[ longitude, latitude, rsrp, site_name, id ]
		);
		return updateDot.rows;
	} catch (error) {
		console.log(err.massage);
	}
};

//Delete Row

const deleteRow = async (id) => {
	try {
		const dot = await db.query('DELETE FROM dots WHERE dot_id = $1', [ id ]);
		return dot;
	} catch (error) {
		console.log(err.massage);
	}
};

//Delete all rows

const deleteAllRows = async () => {
	try {
		const dot = await db.query('DELETE FROM dots ');
		return 'Todos was Deleted';
	} catch (error) {
		console.log(err.massage);
	}
};

module.exports = {
	getAllDots: getAllDots,
	getDot: getDot,
	createDot: createDot,
	updateDot: updateDot,
	deleteRow: deleteRow,
	deleteAllRows: deleteAllRows
};