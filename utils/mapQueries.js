const db = require('./db');

const getMapPoints = async (site_id, project_id, filename) => {
  try {
    const mapPoints = await db.query(
      `select latitude,longitude,rsrp,dist_from_site,dist_from_ref 
      from dots 
      where lower(file_name) like lower($3) and site_id = $1 and project_id = $2`,
      [site_id, project_id, filename]
    );
    return mapPoints.rows;
  } catch (error) {
    console.log(error.massage);
  }
};

module.exports = {
  getMapPoints,
};
