const siteQuery = require('../utils/siteQueries');
const root = require('path').dirname(require.main.filename);

const uploadFile = async (req, res, next) => {
  try {
    const filePath = root + '/xlsxfiles/' + req.file.filename;
    await siteQuery.createDatabaseFromCsv(filePath);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile };
