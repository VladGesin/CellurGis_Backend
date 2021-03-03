const dotQ = require('../utils/dotQueries');
const root = require('path').dirname(require.main.filename);

const uploadFile = async (req, res, next) => {
  try {
    const filePath = root + '/xlsxfiles/' + req.file.filename;
    await dotQ.createDotFromCsv(filePath);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile: uploadFile };
