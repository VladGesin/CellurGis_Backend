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

const saveDeletedIndex = async (req, res, next) => {
  try {
    const { project_id } = req.body;
    await projectQ.saveProjectId(project_id);
    next();
  } catch (error) {
    console.log(error);
  }
};

const insertCsv = async (req, res, next) => {
  try {
    const data = req.data;
    await projectQ.insertToDotsTableNewFile(data);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProjectIndex,
  saveDeletedIndex,
  insertCsv,
};
