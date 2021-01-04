const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'controllers/xlsxfiles');
	},
	filename: function(req, file, cb) {
		const parts = file.mimetype.split('/');
		cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
	}
});

function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /xlsx/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb('Error: Xlsx Only!');
	}
}

const upload = multer({ storage: storage, checkFileType: checkFileType });

module.exports = upload;
