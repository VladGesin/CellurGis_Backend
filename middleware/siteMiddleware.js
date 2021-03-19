const siteQuery = require('../utils/siteQueries');
const root = require('path').dirname(require.main.filename);
const fs = require('fs');

const uploadFile = async (req, res, next) => {
  const filePath = root + '/xlsxfiles/' + req.file.filename;
  try {
    await siteQuery.createDatabaseFromCsv(filePath);
    next();
  } catch (error) {
    fs.unlink(filePath, (err) => {
      if (err) {
        throw err;
      }
    });
    next(errHandler(`Wrong collum position , Old Database deleted`, 400));
  }
};

module.exports = { uploadFile };
