const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '/xlsxfiles/');
const dotQ = require('../utils/dotQueries');
const chartsQ = require('../utils/chartQueries');

const uploadFile = async (req, res, next) => {
	try {
		const filePath = dirPath + req.file.filename;
		await dotQ.deleteAllRows();
		await chartsQ.deleteAllChart();
		await dotQ.createDotFromCsv(filePath);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = { uploadFile: uploadFile };
