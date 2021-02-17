const db = require('./db');

const getFileSites = async (project_id, filename) => {
  try {
    const siteNames = await db.query(
      'select DISTINCT site_id FROM dots WHERE project_id = $1 and file_name ilike $2 ',
      [project_id, filename]
    );

    return siteNames.rows;
  } catch (error) {
    throw error;
  }
};

const getFileCountPoints = async (project_id, filename) => {
  try {
    const countPoints = await db.query(
      'select count(*) from dots where project_id = $1 and file_name ilike $2 ',
      [project_id, filename]
    );

    return countPoints.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteProjectFile = async (project_id, filename) => {
  try {
    await db.query(
      'DELETE FROM dots where project_id = $1 and file_name ilike $2',
      [project_id, filename]
    );
    return true;
  } catch (error) {
    console.log(err.massage);
  }
};

module.exports = { getFileSites, getFileCountPoints, deleteProjectFile };
