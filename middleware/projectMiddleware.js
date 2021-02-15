const projectQ = require('../utils/projectQueries');

const createProjectIndex = async (req, res, next) => {
  try {
    req.project_index = await projectQ.newProjectGetFreeIndex();
    if (!req.project_index)
      req.project_index = await projectQ.getProjectIdMax();
    if (!req.project_index) req.project_index = 1;
    next();
  } catch (error) {
    console.log(error);
  }
};

const saveIndex = async (req, res, next) => {
  try {
    const { id } = req.params;
    project.saveProjectId(id);
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProjectIndex: createProjectIndex,
  saveIndex: saveIndex,
};
