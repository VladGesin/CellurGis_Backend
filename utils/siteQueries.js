const db = require('./db');
const format = require('pg-format');

//Get All sites
const getAllSites = async () => {
  try {
    const sites = await db.query('SELECT * FROM sites');
    return sites.rows;
  } catch (error) {
    console.log(error.massage);
  }
};

//Get site name of Site id
const getSite = async (site_id) => {
  try {
    const site = await db.query('SELECT * FROM sites WHERE site_id = $1', [
      site_id,
    ]);
    return site.rows[0];
  } catch (error) {
    console.log(err.massage);
  }
};

//Create Site

const createSite = async (longitude, latitude, site_name, site_id) => {
  try {
    const site = await db.query(
      'INSERT INTO sites(longitude, latitude, site_name, site_id ) VALUES($1, $2, $3 ,$4)',
      [longitude, latitude, site_name, site_id]
    );
    return true;
  } catch (err) {
    console.log(err.massage);
  }
};

//Update site by site id row

const updateSite = async (longitude, latitude, site_name, site_id) => {
  try {
    await db.query(
      'UPDATE sites SET longitude= $1 ,latitude =$2, site_name=$3 WHERE (site_id =$4) ',
      [longitude, latitude, site_name, site_id]
    );
    return true;
  } catch (error) {
    console.log(err.massage);
  }
};

//Delete Row site_name
const deleteSite = async (site_name) => {
  try {
    await db.query('DELETE FROM sites WHERE site_name = $1', [site_name]);
  } catch (error) {
    console.log(err.massage);
  }
};

//Delete all sites

const deleteAllSites = async () => {
  try {
    await db.query('DELETE FROM sites;');
    return 'Sites was Deleted';
  } catch (error) {
    console.log(err.massage);
  }
};

//Create Database from csv file

const createDatabaseFromCsv = async (data) => {
  try {
    await db.query('DELETE FROM sites');
    const bigQuery = format(
      'INSERT INTO sites(site_name, site_id, latitude, longitude) VALUES %L',
      data
    );
    await db.query(bigQuery);

    return true;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllSites,
  getSite,
  createSite,
  updateSite,
  deleteSite,
  deleteAllSites,
  createDatabaseFromCsv,
};
