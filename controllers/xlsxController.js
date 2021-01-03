const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '/xlsxfiles/');
const XLSX = require('xlsx');

exports.uploadFile = async (req, res, next) => {
	try {
		console.log(dirPath);
		const filePath = dirPath + req.file.filename;
		readXlsxFile(filePath).then((rows) => {
			// `rows` is an array of rows
			// each row being an array of cells.
			console.log(rows);

			// Remove Header ROW
			rows.shift();

			const dots = [];

			let length = rows.length;

			for (let i = 0; i < length; i++) {
				let dot = {
					latitude: rows[i][0],
					longitude: rows[i][1],
					rsrp: rows[i][3],
					site_id: rows[i][4]
				};

				dots.push(dot);
			}

			// Customer.bulkCreate(customers)
			// .then(() => {
			const result = {
				status: 'ok',
				filename: req.file.originalname,
				message: 'Upload Successfully!'
			};

			res.json('result');
			// });
		});
	} catch (error) {
		const result = {
			status: 'fail',
			filename: req.file.originalname,
			message: 'Upload Error! message = ' + error.message
		};
		res.json(result);
	}
};
