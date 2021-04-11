const mapQ = require('../utils/mapQueries');

const getMapPoints = async (req, res, next) => {
  try {
    const { site_id, project_id, filename } = req.params;
    const mapPoints = await mapQ.getMapPoints(site_id, project_id, filename);
    res.status(200).json(mapPoints);
  } catch (error) {
    next(error);
  }
};
module.exports = { getMapPoints };
