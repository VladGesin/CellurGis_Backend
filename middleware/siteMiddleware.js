const siteQuery = require('../utils/siteQueries');
const dotQeury = require('../utils/dotQueries');
const chartQeury = require('../utils/chartQueries');

// Update DB from mongoos as site id
const UpdateDataBaseFromMongoos = async (req, res, next) => {
  try {
    //Get all the Site id from csv
    const allDistinct = await dotQeury.getAllDistinct();
    //Update Local pg db
    allDistinct.forEach(async (row) => {
      const {
        longitude,
        latitude,
        site_name,
        site_id,
      } = await chartQeury.getAllSiteIdData(row.site_id);
      if (
        !(await siteQuery.checkDB(Object.entries(row)[0][1])) //check if in POSTGRES DB
      ) {
        await siteQuery.createSite(longitude, latitude, site_name, site_id); // add to db from mongo
      } else {
        await siteQuery.updateSite(longitude, latitude, site_name, site_id);
      }
    });

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { UpdateDataBaseFromMongoos: UpdateDataBaseFromMongoos };
