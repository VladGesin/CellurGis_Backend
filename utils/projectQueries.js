const db = require('./db');

const newProjectGetFreeIndex = async () => {
  try {
    const index = await db.query(
      'SELECT MIN (projectindex) from free_project_index'
    );
    if (index.rows[0].min)
      await db.query('DELETE FROM free_project_index WHERE projectindex = $1', [
        index.rows[0].min,
      ]);
    return index.rows[0].min;
  } catch (error) {
    console.log(error);
  }
};

const saveProjectId = async (id) => {
  try {
    await db.query('INSERT INTO free_project_index(projectindex)VALUES($1)', [
      id,
    ]);
    return;
  } catch (error) {
    console.log(error);
  }
};

const newProjectInsertToProjectTable = async (
  user_id,
  project_id,
  project_name
) => {
  try {
    const newProject = await db.query(
      'INSERT INTO project_list(user_id , project_id , project_name , created_on) VALUES ($1,$2,$3,CURRENT_TIMESTAMP) RETURNING * ',
      [user_id, project_id, project_name]
    );
    return newProject.rows[0];
  } catch (error) {
    throw error;
  }
};

const getProjectIdMax = async () => {
  try {
    const project_id = await db.query(
      'SELECT MAX(project_id) FROM project_list'
    );
    return project_id.rows[0].max + 1;
  } catch (error) {
    console.log(err.massage);
  }
};

const getProjectsByUserId = async (user_id) => {
  try {
    const projectList = await db.query(
      'select project_id, project_name,created_on from project_list where user_id = $1',
      [user_id]
    );
    return projectList.rows;
  } catch (error) {
    throw error;
  }
};

const getProjectsFileNames = async (project_id) => {
  try {
    const projectList = await db.query(
      'select DISTINCT file_name FROM dots WHERE project_id = $1',
      [project_id]
    );
    return projectList.rows;
  } catch (error) {
    throw error;
  }
};

const deleteProject = async (project_id) => {
  try {
    await db.query('DELETE FROM project_list where project_id =$1', [
      project_id,
    ]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  newProjectGetFreeIndex: newProjectGetFreeIndex,
  saveProjectId: saveProjectId,
  newProjectInsertToProjectTable: newProjectInsertToProjectTable,
  getProjectIdMax: getProjectIdMax,
  getProjectsByUserId: getProjectsByUserId,
  deleteProject: deleteProject,
  getProjectsFileNames: getProjectsFileNames,
};
