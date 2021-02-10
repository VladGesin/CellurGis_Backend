const fs = require('fs');
const path = require('path');
const dotQ = require('../utils/dotQueries');
const chartsQ = require('../utils/chartQueries');
const root = require('path').dirname(require.main.filename);

const uploadFile = async (req, res, next) => {
  try {
    const filePath = root + '/xlsxfiles/' + req.file.filename;
    await dotQ.deleteAllRows();
    await chartsQ.deleteAllChart();
    await dotQ.createDotFromCsv(filePath);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile: uploadFile };
