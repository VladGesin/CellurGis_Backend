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

const getFileNmaes = async (req, res) => {
  try {
    const { project_id } = req.params;
    const fileNames = await projectQ.getProjectsFileNames(project_id);
    res.json(fileNames);
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

const deleteProject = async (req, res) => {
  try {
    const { project_id } = req.body;
    await projectQ.deleteProject(project_id);
    res.json('Project Deleted');
  } catch (error) {
    throw error;
  }
};

const fileUpload = async (req, res) => {
  try {
    res.json('file Uploaded');
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addNewProjectToProjectTable: addNewProjectToProjectTable,
  getUserProjects: getUserProjects,
  deleteProject: deleteProject,
  fileUpload: fileUpload,
  getFileNmaes: getFileNmaes,
};
