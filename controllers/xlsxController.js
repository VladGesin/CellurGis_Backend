const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '/xlsxfiles/');
var stream = require('stream');
const ExcelJS = require('exceljs');

exports.uploadFile = async (req, res, next) => {
	try {
		console.log(dirPath);
		const filePath = dirPath + req.file.filename;

		const stream = fs.createReadStream(filePath);
		const workbook = new ExcelJS.Workbook();
		const streamWorkBook = await workbook.xlsx.read(stream);
		const sheet = streamWorkBook.getWorksheet(workbook[0]);
		console.log('Test');
		//Get all the rows data [1st and 2nd column]
		let data = sheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
			console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
			return JSON.stringify(row.values);
		});

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
