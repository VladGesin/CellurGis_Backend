const dotQ = require('../utils/dotQueries');

const updateGeom = async (req, res, next) => {
  try {
    await dotQ.updateGeomCollum();
    next();
  } catch (error) {
    throw error;
  }
};

const updateDistFromSites = async (req, res, next) => {
  try {
    await dotQ.updateSiteDistCollum(req.project_index);
    next();
  } catch (error) {
    throw error;
  }
};

const updateDistFromRef = async (req, res, next) => {
  try {
    await dotQ.updateRefDistCollum(req.project_index);
    next();
  } catch (error) {
    throw error;
  }
};

const setProjectId = async (req, res, next) => {
  try {
    await dotQ.setProjectId(req.project_index);
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateGeom: updateGeom,
  updateDistFromSites: updateDistFromSites,
  setProjectId,
  setProjectId,
  updateDistFromRef,
  updateDistFromRef,
};
