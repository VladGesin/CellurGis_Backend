const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '/xlsxfiles/');
var stream = require('stream');
const ExcelJS = require('exceljs');
const dotController = require('../utils/dotQueries');

exports.uploadFile = async (req, res, next) => {
	try {
		const filePath = dirPath + req.file.filename;
		const stream = fs.createReadStream(filePath);
		const workbook = new ExcelJS.Workbook();
		const streamWorkBook = await workbook.xlsx.read(stream);
		const sheet = streamWorkBook.getWorksheet(workbook[0]);
		//Get all the rows data [1st and 2nd column]
		sheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
			console.log(row.getCell(1).value, row.getCell(2).value, row.getCell(4).value, row.getCell(5).value);
			dotController.createDotFromXlsx(
				row.getCell(1).value,
				row.getCell(2).value,
				row.getCell(4).value,
				row.getCell(5).value
			);
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
