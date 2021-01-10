const chartQ = require('../utils/chartQueries');
const siteQ = require('../utils/siteQueries');
const dotsQ = require('../utils/dotQueries');

const toRadians = (val) => {
	var PI = 3.1415926535;
	return val / 180.0 * PI;
};

//Calc Distance
const CalcDist = (lat1, lon1, lat2, lon2) => {
	if (lat1 == lat2 && lon1 == lon2) {
		return 0;
	} else {
		var R = 6371e3; // R is earth’s radius
		var lat1radians = toRadians(lat1);
		var lat2radians = toRadians(lat2);

		var latRadians = toRadians(lat2 - lat1);
		var lonRadians = toRadians(lon2 - lon1);

		var a =
			Math.sin(latRadians / 2) * Math.sin(latRadians / 2) +
			Math.cos(lat1radians) * Math.cos(lat2radians) * Math.sin(lonRadians / 2) * Math.sin(lonRadians / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		var d = R * c;

		return d / 1000; // return km
	}
};

//Set Chart table
const setChartTable = async (req, res, next) => {
	try {
		const allDistinct = await chartQ.getAllDistinct();
		allDistinct.forEach(async (row) => {
			const { longitude, latitude, site_name, site_id } = await chartQ.getAllSiteIdData(row.site_id);
			if (
				!await siteQ.checkDB(Object.entries(row)[0][1]) //check if in POSTGRES DB
			) {
				await siteQ.createSite(longitude, latitude, site_name, site_id); // add to db from mongo
			}
		});
		let dotsDB = await dotsQ.getAllDots();
		let site = await siteQ.getAllSites();
		dotsDB.forEach((row) => {
			//	Here we make iteration on rows
			let i = [];
			site.forEach((site) => {
				if (site.site_id === row.site_id) {
					i.push(site.latitude);
					i.push(site.longitude);
				}
			});
			//Calc Distances
			let calcDist = CalcDist(i[0], i[1], row.latitude, row.longitude);
			row.dist = parseInt(calcDist.toFixed(0));
		});
		await chartQ.setJsonToColoms(dotsDB);
		res.json('Charts Created');
	} catch (error) {
		next(error);
	}
};

//Delete all charts data
const deleteCharts = async (req, res, next) => {
	try {
		await chartQ.deleteAllChart();
		res.json('All Charts Deleted');
	} catch (error) {
		console.log(error);
	}
};

//GET AVG rsrp by site_id
const avgChart = async (req, res, next) => {
	try {
		const { site_id, dist } = req.body;
		const avg = await chartQ.getAVG(site_id, dist);
		res.json(avg);
	} catch (error) {
		console.log(error);
	}
};

//GET MIN rsrp by site_id
const minChart = async (req, res, next) => {
	try {
		const { site_id, dist } = req.body;
		const min = await chartQ.getMIN(site_id, dist);
		res.json(min);
	} catch (error) {
		console.log(error);
	}
};

//GET MAX rsrp by site_id
const maxChart = async (req, res, next) => {
	try {
		const { site_id, dist } = req.body;
		const max = await chartQ.getMAX(site_id, dist);
		res.json(max);
	} catch (error) {
		console.log(error);
	}
};

//Get all the diffrent KM with site_id
const getDistinctBySiteId = async (req, res, next) => {
	try {
		const { site_id } = req.body;
		const distinctKM = await chartQ.getAllDistinctDist(site_id);
		res.json(distinctKM);
	} catch (error) {
		console.log(error);
	}
};

//Get all the diffrent KM with site_id
const getCountRsrpGreater = async (req, res, next) => {
	try {
		const { site_id, dist, rsrp } = req.body;
		const countPoints = await chartQ.getRsrpInDistGreater(site_id, dist, rsrp);
		res.json(countPoints);
	} catch (error) {
		console.log(error);
	}
};

//Get all the diffrent KM with site_id
const getCountRsrp = async (req, res, next) => {
	try {
		const { site_id, dist } = req.body;
		const countPoints = await chartQ.getRsrpInDist(site_id, dist);
		res.json(countPoints);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	setChartTable: setChartTable,
	deleteCharts: deleteCharts,
	avgChart: avgChart,
	maxChart: maxChart,
	minChart: minChart,
	getDistinctBySiteId: getDistinctBySiteId,
	getCountRsrpGreater: getCountRsrpGreater,
	getCountRsrp: getCountRsrp
};
