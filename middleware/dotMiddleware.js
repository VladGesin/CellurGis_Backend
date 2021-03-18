const dotQ = require('../utils/dotQueries');

const updateGeom = async (req, res, next) => {
  try {
    const { filename, project_id } = req.body;
    await dotQ.updateGeomCollum(filename, project_id);
    next();
  } catch (error) {
    next(error);
  }
};

const updateDistFromSites = async (req, res, next) => {
  try {
    const { filename, project_id } = req.body;
    await dotQ.updateSiteDistCollum(filename, project_id);
    next();
  } catch (error) {
    next(error);
  }
};

const updateDistFromRef = async (req, res, next) => {
  try {
    const { filename, project_id } = req.body;
    await dotQ.updateRefDistCollum(filename, project_id);
    next();
  } catch (error) {
    next(error);
  }
};

const setProjectId = async (req, res, next) => {
  try {
    const { project_id } = req.body;
    await dotQ.setProjectId(project_id);
    next();
  } catch (error) {
    next(error);
  }
};

const deleteProjectData = async (req, res, next) => {
  try {
    const { project_id } = req.body;
    await dotQ.deleteAllProjectData(project_id);
    next();
  } catch (error) {
    throw error;
  }
};

const updateCsvFileName = async (req, res, next) => {
  try {
    const { filename, project_id } = req.body;
    await dotQ.setFileName(filename, project_id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateGeom,
  updateDistFromSites,
  setProjectId,
  setProjectId,
  updateDistFromRef,
  updateDistFromRef,
  deleteProjectData,
  updateCsvFileName,
};
