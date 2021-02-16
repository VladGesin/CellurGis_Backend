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
    const { project_id } = req.body;
    await dotQ.updateSiteDistCollum(project_id);
    next();
  } catch (error) {
    throw error;
  }
};

const updateDistFromRef = async (req, res, next) => {
  try {
    const { project_id } = req.body;
    await dotQ.updateRefDistCollum(project_id);
    next();
  } catch (error) {
    throw error;
  }
};

const setProjectId = async (req, res, next) => {
  try {
    const { project_id } = req.body;
    await dotQ.setProjectId(project_id);
    next();
  } catch (error) {
    console.log(error);
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
    throw error;
  }
};

module.exports = {
  updateGeom: updateGeom,
  updateDistFromSites: updateDistFromSites,
  setProjectId,
  setProjectId,
  updateDistFromRef,
  updateDistFromRef,
  deleteProjectData: deleteProjectData,
  updateCsvFileName: updateCsvFileName,
};
