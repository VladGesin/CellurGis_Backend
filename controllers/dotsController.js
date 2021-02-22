const dotQ = require('../utils/dotQueries');

//Get All Dots
const getAllDots = async (req, res, next) => {
	try {
		const allDots = await dotQ.getAllDots();
		res.json(allDots);
	} catch (error) {
		next(error);
	}
};

//Get Dots of Site Name
const getDotsBySiteName = async (req, res, next) => {
	try {
		const { site_id } = req.params;
		const siteDots = await dotQ.getDot(site_id);
		console.log(siteDots.rows);
		res.json(siteDots.rows);
	} catch (error) {
		next(error);
	}
};

//Create Dot
const createDot = async (req, res, next) => {
	try {
		const { longitude, latitude, rsrp, site_name } = req.body;
		const createDot = await dotQ.createDot(longitude, latitude, rsrp, site_name);
		res.json(createDot);
	} catch (error) {
		next(error);
	}
};

//Update dot by id row
const updateDot = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { longitude, latitude, rsrp, site_name } = req.body;
		const newDot = await dotQ.updateDot(id, longitude, latitude, rsrp, site_name);
		res.json('Dot have been updated');
	} catch (error) {
		next(error);
	}
};

//Delete Row
const deleteDot = async (req, res, next) => {
	try {
		const { id } = req.params;
		const dotDeleted = await dotQ.deleteRow(id);
		res.json('Row Deleted');
	} catch (error) {
		next(error);
	}
};

//Delete all rows
const deleteAllRows = async (req, res, next) => {
	try {
		const allRowsDeleted = await dotQ.deleteAllRows();
		res.json('All Rows Deleted');
	} catch (error) {
		next(error);
	}
};

//get all the diffrent sites
const getAllDistinct = async (req, res, next) => {
	try {
		const allDistinct = await dotQ.getAllDistinct();
		res.json(allDistinct);
	} catch (error) {
		console.log(error.massage);
	}
};

module.exports = {
	getAllDots: getAllDots,
	getDotsBySiteName: getDotsBySiteName,
	createDot: createDot,
	updateDot: updateDot,
	deleteDot: deleteDot,
	deleteAllRows: deleteAllRows,
	getAllDistinct: getAllDistinct
};
