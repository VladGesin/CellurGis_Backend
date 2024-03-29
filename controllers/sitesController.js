const siteQuery = require("../utils/siteQueries");

//Get All sites
const getAllSites = async (req, res, next) => {
  try {
    const allSites = await siteQuery.getAllSites();
    if (allSites) res.json(allSites);
    else res.json([]);
  } catch (error) {
    next(error);
  }
};

//Get Sites of Site_id
const getSiteBySiteId = async (req, res, next) => {
  try {
    const { site_id } = req.params;
    const site = await siteQuery.getSite(site_id);
    res.json(site);
  } catch (error) {
    next(error);
  }
};

//Create Site
const createSite = async (req, res, next) => {
  try {
    const { longitude, latitude, site_name, site_id } = req.body;
    const createSite = await siteQuery.createSite(
      longitude,
      latitude,
      site_name,
      site_id
    );
    res.json(createSite);
  } catch (error) {
    next(error);
  }
};

//Update site by site id
const updateSite = async (req, res, next) => {
  try {
    const { site_id } = req.params;
    const { longitude, latitude, site_name } = req.body;
    await siteQuery.updateSite(longitude, latitude, site_name, site_id);
    res.json("Dot have been updated");
  } catch (error) {
    next(error);
  }
};

//Delete Site
const deleteSite = async (req, res, next) => {
  try {
    const { site_name } = req.params;
    await siteQuery.deleteSite(site_name);
    res.json("Row Deleted");
  } catch (error) {
    next(error);
  }
};

//Delete all rows
const deleteAllSites = async (req, res, next) => {
  try {
    await siteQuery.deleteAllSites();
    res.json("All Rows Deleted");
  } catch (error) {
    next(error);
  }
};

//Database created
const databaseCreated = async (req, res, next) => {
  try {
    res.status(200).json("Database created");
  } catch (error) {
    next(error);
  }
};

//Get Site Map Data
const getSiteMapData = async (req, res, next) => {
  try {
    sitesMapPoints = await siteQuery.getSiteMapData();
    res.status(200).json(sitesMapPoints);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSites,
  getSiteBySiteId,
  createSite,
  updateSite,
  deleteSite,
  deleteAllSites,
  databaseCreated,
  getSiteMapData,
};
