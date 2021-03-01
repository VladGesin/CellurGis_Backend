const db = require('./db');

//Get AVG from charts with site_id
const getAVG = async (site_id, dist, project_id, filename, table) => {
  try {
    const avg = await db.query(
      `select ROUND(AVG(rsrp)::numeric,2) FROM dots where site_id=$1 and ${table}=$2 and project_id = $3 and lower(file_name) like lower($4)`,
      [site_id, dist, project_id, filename]
    );
    return avg.rows;
  } catch (error) {
    console.log(error);
  }
};

//Get MIN from charts with site_id
const getMIN = async (site_id, dist, project_id, filename, table) => {
  try {
    const min = await db.query(
      `select ROUND(MIN(rsrp)::numeric,2) FROM dots where site_id=$1 and ${table} = $2 and project_id = $3 and lower(file_name) like lower($4)`,
      [site_id, dist, project_id, filename]
    );
    return min.rows;
  } catch (error) {
    console.log(error);
  }
};

//Get MAX from charts with site_id
const getMAX = async (site_id, dist, project_id, filename, table) => {
  try {
    const max = await db.query(
      `select ROUND(MAX(rsrp)::numeric,2)FROM dots where site_id=$1 and ${table}=$2 and project_id = $3 and lower(file_name) like lower($4)`,
      [site_id, dist, project_id, filename]
    );
    return max.rows;
  } catch (error) {
    throw error;
  }
};

//Get all the diffrent KM with site_id order by dist from min
const getAllDistinctDist = async (site_id, project_id, filename, table) => {
  try {
    const allDistinctDist = await db.query(
      `SELECT DISTINCT (${table}) FROM dots where site_id=$1 and project_id = $2 and lower(file_name) like lower($3) order by ${table}`,
      [site_id, project_id, filename]
    );
    return allDistinctDist.rows;
  } catch (error) {
    console.log(error.massage);
  }
};

//Count rsrp points stronger then (rsrp) with site id and distance
const getRsrpInDistGreater = async (
  site_id,
  dist,
  rsrp,
  project_id,
  filename,
  table
) => {
  try {
    const countRSRP = await db.query(
      `SELECT count(rsrp) FROM dots WHERE site_id = $1 AND rsrp > $2 AND ${table} = $3 and project_id = $4 and lower(file_name) like lower($5)`,
      [site_id, rsrp, dist, project_id, filename]
    );
    return countRSRP.rows;
  } catch (error) {
    console.log(error.massage);
  }
};

//Count rsrp points stronger then (rsrp) with site id and distance
const getRsrpInDist = async (site_id, dist, project_id, filename, table) => {
  try {
    const countRSRP = await db.query(
      `SELECT count(*) FROM dots WHERE site_id = $1 AND ${table} = $2 AND project_id = $3 AND lower(file_name) like lower($4)`,
      [site_id, dist, project_id, filename]
    );
    return countRSRP.rows;
  } catch (error) {
    console.log(error.massage);
  }
};

module.exports = {
  getAVG,
  getMIN,
  getMAX,
  getAllDistinctDist,
  getRsrpInDistGreater,
  getRsrpInDist,
};
