const db = require('./db');
const siteDB = require('./siteQueries');

//get all the diffrent sites
const getAllDistinct = async () => {
	try {
		const allDistinct = await db.query('SELECT DISTINCT site_id FROM dots;');
		return allDistinct.rows;
	} catch (error) {
		console.log(error.massage);
	}
};

//Get the Data from MONGOS
const getAllSiteIdData = async (site_id) => {
	try {
		const site = await db.query('SELECT * FROM fakesites WHERE site_id = $1', [ site_id ]);
		return site;
	} catch (error) {
		console.log(error.massage);
	}
};

//Insert JSON to Table
const setJsonToColoms = async (dotsDB) => {
	try {
		await db.query(
			`INSERT INTO charts SELECT * FROM jsonb_populate_recordset(NULL::charts,'${JSON.stringify(dotsDB)}')`
		);
	} catch (error) {
		console.log(error.massage);
	}
};

//Delete all charts data
const deleteAllChart = async () => {
	try {
		await db.query('DELETE FROM charts');
	} catch (error) {
		console.log(error);
	}
};

//Get AVG from charts with site_id
const getAVG = async (site_id, dist) => {
	try {
		const avg = await db.query('select AVG(rsrp) from charts where site_id = $1 AND dist = $2', [ site_id, dist ]);
		return avg.rows;
	} catch (error) {
		console.log(error);
	}
};

//Get MIN from charts with site_id
const getMIN = async (site_id, dist) => {
	try {
		const min = await db.query('select MIN(rsrp) from charts where site_id = ($1) AND dist = ($2)', [
			site_id,
			dist
		]);
		return min.rows;
	} catch (error) {
		console.log(error);
	}
};

//Get MAX from charts with site_id
const getMAX = async (site_id, dist) => {
	try {
		const max = await db.query('select MAX(rsrp) from charts where site_id = $1 AND dist = $2', [ site_id, dist ]);
		return max.rows;
	} catch (error) {
		console.log(error);
	}
};

//Get all the diffrent KM with site_id
const getAllDistinctDist = async (site_id) => {
	try {
		const allDistinct = await db.query('SELECT DISTINCT dist FROM charts where site_id=$1', [ site_id ]);
		return allDistinct.rows;
	} catch (error) {
		console.log(error.massage);
	}
};

module.exports = {
	getAllDistinct: getAllDistinct,
	getAllSiteIdData: getAllSiteIdData,
	setJsonToColoms: setJsonToColoms,
	deleteAllChart: deleteAllChart,
	getAVG: getAVG,
	getMIN: getMIN,
	getMAX: getMAX,
	getAllDistinctDist: getAllDistinctDist
};