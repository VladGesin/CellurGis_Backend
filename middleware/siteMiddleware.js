const siteQuery = require('../utils/siteQueries');
const root = require('path').dirname(require.main.filename);

const insertCsvToDatabase = async (req, res, next) => {
  try {
    const data = req.data;
    await siteQuery.createDatabaseFromCsv(data);
    next();
  } catch (error) {
    next(error);
  }
};

const setHeader = async (req, res, next) => {
  try {
    req.csvHeader = ['Site_name', 'Site_id', 'Latitude', 'Longitude'];
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { insertCsvToDatabase, setHeader };
