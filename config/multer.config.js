const multer = require('multer');

const csvFilter = (req, file, cb) => {
	let err = new Error('Not CSV');
	err.statusCode = 400;
	const error = file.mimetype === 'text/csv' ? null : err;
	cb(error, true);
};

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'xlsxfiles');
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});

const upload = multer({ storage: storage, fileFilter: csvFilter });

module.exports = upload;
