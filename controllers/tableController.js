const tableQ = require('../utils/tableQueries');

const getFileSites = async (req, res) => {
  try {
    const { project_id, filename } = req.params;
    const fileSites = await tableQ.getFileSites(project_id, filename);
    res.status(200).json(fileSites);
  } catch (error) {
    throw error;
  }
};

const getFileCountPoints = async (req, res) => {
  try {
    const { project_id, filename } = req.params;
    const fileCount = await tableQ.getFileCountPoints(project_id, filename);
    res.status(200).json(fileCount);
  } catch (error) {
    throw error;
  }
};

const deleteTable = async (req, res) => {
  try {
    const { project_id, filename } = req.body;
    await tableQ.deleteProjectFile(project_id, filename);
    res.status(200).json('File Deleted');
  } catch (error) {
    throw error;
  }
};

const getFileData = async (req, res) => {
  try {
    const { project_id, filename } = req.params;
    const fileSites = await tableQ.getFileSites(project_id, filename);
    const fileCount = await tableQ.getFileCountPoints(project_id, filename);
    res.status(200).json({
      fileSites,
      fileCount,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { getFileSites, getFileCountPoints, deleteTable, getFileData };
