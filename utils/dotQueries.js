const db = require('./db');

//Get All Dots Need Fix
const getAllDots = async () => {
  try {
    const dots = await db.query('SELECT * FROM dots');
    return dots.rows;
  } catch (error) {
    console.log(error.massage);
  }
};

//Get Dots of Site Name
const getDot = async (site_id) => {
  try {
    const dots = await db.query('SELECT * FROM dots WHERE site_id = $1', [
      site_id,
    ]);
    return dots;
  } catch (error) {
    console.log(err.massage);
  }
};

//Create Dot

const createDot = async (longitude, latitude, rsrp, site_id) => {
  try {
    const dot = await db.query(
      "INSERT INTO dots(longitude, latitude, rsrp, site_id ,dot_id) VALUES($1, $2, $3 ,$4,nextval('dot_id_seq')) RETURNING *",
      [longitude, latitude, rsrp, site_id]
    );
    return dot.rows[0];
  } catch (err) {
    console.error(err.massage);
  }
};

//Create Dot from XLSX file

const createDotFromXlsx = async (longitude, latitude, rsrp, site_id) => {
  try {
    const dot = await db.query(
      "INSERT INTO dots(longitude, latitude, rsrp, site_id ,dot_id) VALUES($1, $2, $3 ,$4,nextval('dot_id_seq'))",
      [longitude, latitude, rsrp, site_id]
    );
    return true;
  } catch (err) {
    console.error(err.massage);
  }
};

//Create Dot from csv file

const createDotFromCsv = async (path) => {
  try {
    await db.query('ALTER SEQUENCE dot_id_seq RESTART WITH 1;');
    await db.query(
      `COPY dots(latitude, longitude, rsrp, site_id ) FROM '${path}' DELIMITER ',' CSV HEADER `
    );
  } catch (err) {
    throw error;
  }
};

//Update Geom collum

const updateGeomCollum = async () => {
  try {
    await db.query(
      `UPDATE dots 
      SET geom = ST_GeomFromText('POINT(' || longitude || ' ' || latitude || ')',4326) 
      WHERE geom is NULL`
    );
  } catch (err) {
    throw error;
  }
};

//Update dist_from_site collum

const updateSiteDistCollum = async (project_id) => {
  try {
    await db.query(
      `UPDATE dots d
      SET dist_from_site =  ROUND(100*ST_Distance(d.geom, s.geom))
      FROM sites s
      WHERE d.site_id = s.site_id
      AND d.dist_from_site is NULL
      AND project_id = $1`,
      [project_id]
    );
  } catch (err) {
    throw error;
  }
};

//Update dist_from_ref_layer collum

const updateRefDistCollum = async (project_id) => {
  try {
    await db.query(
      `UPDATE dots d SET dist_from_ref = 
        (SELECT min(100* ROUND(1000*ST_Distance(d.geom, r.geom))) 
         FROM green_line r
         WHERE r.id = 1
        )
         WHERE d.dist_from_ref is NULL AND project_id = $1`,
      [project_id]
    );
  } catch (err) {
    throw error;
  }
};

//Get ProjectID Max
const getProjectIdMax = async () => {
  try {
    const project_id = await db.query('SELECT MAX(project_id) FROM dots ');
    return project_id.rows[0].max + 1;
  } catch (error) {
    console.log(err.massage);
  }
};

//Set ProjectID
const setProjectId = async (project_id) => {
  try {
    await db.query(
      'UPDATE dots SET project_id =$1 WHERE (project_id is NULL)',
      [project_id]
    );
    return true;
  } catch (error) {
    console.log(err.massage);
  }
};

//Set ProjectID
const setFileName = async (filename, project_id) => {
  try {
    await db.query(
      'UPDATE dots SET file_name =$1 WHERE (file_name is NULL AND project_id =$2) ',
      [filename, project_id]
    );
    return true;
  } catch (error) {
    console.log(err.massage);
  }
};
//Update dot by id row

const updateDot = async (id, longitude, latitude, rsrp, site_id) => {
  try {
    const updateDot = await db.query(
      'UPDATE dots SET longitude= $1 ,latitude =$2, rsrp=$3 WHERE (site_id =$4 AND dot_id=$5) ',
      [longitude, latitude, rsrp, site_id, id]
    );
    return updateDot.rows;
  } catch (error) {
    console.log(err.massage);
  }
};

//Delete Row

const deleteRow = async (id) => {
  try {
    const dot = await db.query('DELETE FROM dots WHERE dot_id = $1', [id]);
    return dot;
  } catch (error) {
    console.log(err.massage);
  }
};

//Delete all rows

const deleteAllRows = async () => {
  try {
    const dot = await db.query('DELETE FROM dots');
    return true;
  } catch (error) {
    console.log(err.massage);
  }
};

//Delete all rows where project_id

const deleteAllProjectData = async (project_id) => {
  try {
    const dot = await db.query('DELETE FROM dots where project_id=$1', [
      project_id,
    ]);
    return true;
  } catch (error) {
    console.log(err.massage);
  }
};

//get all the diffrent sites
const getAllDistinct = async () => {
  try {
    const allDistinct = await db.query('SELECT DISTINCT site_id FROM dots;');
    // console.log(allDistinct.rows);
    return allDistinct.rows;
  } catch (error) {
    console.log(error.massage);
  }
};

module.exports = {
  getAllDots,
  getDot,
  createDot,
  updateDot,
  deleteRow,
  deleteAllRows,
  createDotFromXlsx,
  createDotFromCsv,
  getAllDistinct,
  updateGeomCollum,
  updateSiteDistCollum,
  getProjectIdMax,
  setProjectId,
  updateRefDistCollum,
  deleteAllProjectData,
  setFileName,
};
