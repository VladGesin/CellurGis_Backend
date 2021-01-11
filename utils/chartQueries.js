const db = require('./db');

//Get the Data from MONGOS
const getAllSiteIdData = async (site_id) => {
	try {
		const site = await db.query('SELECT * FROM fakesites WHERE site_id = $1', [ site_id ]);
		return site.rows[0];
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
		console.log('All charts was Deleted');
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

//Get all the diffrent KM with site_id order by dist from min
const getAllDistinctDist = async (site_id) => {
	try {
		const allDistinctDist = await db.query('SELECT DISTINCT dist FROM charts where site_id=$1 order by dist', [
			site_id
		]);
		return allDistinctDist.rows;
	} catch (error) {
		console.log(error.massage);
	}
};

//Count rsrp points stronger then (rsrp) with site id and distance
const getRsrpInDistGreater = async (site_id, dist, rsrp) => {
	try {
		const countRSRP = await db.query('SELECT count(*) FROM charts WHERE site_id = $1 AND rsrp > $2 AND dist = $3', [
			site_id,
			rsrp,
			dist
		]);
		return countRSRP.rows;
	} catch (error) {
		console.log(error.massage);
	}
};

//Count rsrp points stronger then (rsrp) with site id and distance
const getRsrpInDist = async (site_id, dist) => {
	try {
		const countRSRP = await db.query('SELECT count(*) FROM charts WHERE site_id = $1 AND dist = $2', [
			site_id,
			dist
		]);
		return countRSRP.rows;
	} catch (error) {
		console.log(error.massage);
	}
};

module.exports = {
	getAllSiteIdData: getAllSiteIdData,
	setJsonToColoms: setJsonToColoms,
	deleteAllChart: deleteAllChart,
	getAVG: getAVG,
	getMIN: getMIN,
	getMAX: getMAX,
	getAllDistinctDist: getAllDistinctDist,
	getRsrpInDistGreater: getRsrpInDistGreater,
	getRsrpInDist: getRsrpInDist
};
