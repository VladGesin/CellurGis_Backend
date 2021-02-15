const projectQ = require('../utils/projectQueries');

const addNewProjectToProjectTable = async (req, res) => {
  try {
    const { user_id, project_name } = req.body;
    const newProject = await projectQ.newProjectInsertToProjectTable(
      user_id,
      req.project_index,
      project_name
    );
    res.json(newProject);
  } catch (error) {
    throw error;
  }
};

const getUserProjects = async (req, res) => {
  try {
    const { user_id } = req.params;
    const userProjects = await projectQ.getProjectsByUserId(user_id);
    res.json(userProjects);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addNewProjectToProjectTable: addNewProjectToProjectTable,
  getUserProjects: getUserProjects,
};
