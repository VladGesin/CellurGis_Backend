const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '/xlsxfiles/');
const dotController = require('../utils/dotQueries');

exports.uploadFile = async (req, res, next) => {
	try {
		const filePath = dirPath + req.file.filename;
		dotController.createDotFromCsv(filePath);
		res.json('Sucsess');
	} catch (error) {
		const result = {
			status: 'fail',
			filename: req.file.originalname,
			message: 'Upload Error! message = ' + error.message
		};
		res.json(result);
	}
};
