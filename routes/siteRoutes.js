const express = require('express');
const router = express.Router();
const siteController = require('../controllers/sitesController');
const upload = require('../config/multer.config.js');
const fileDelete = require('../utils/file-util');
const siteMiddleware = require('../middleware/siteMiddleware');
const csvWork = require('../middleware/csvMiddleware.js');

//Get All Sites
router.get('/sites', siteController.getAllSites);
//Get Sites of Site id
router.get('/site/:site_id', siteController.getSiteBySiteId);
//Get Sites markers for map
router.get('/apiv2/sites/map',siteController.getSiteMapData);
//Create Site
router.post('/site', siteController.createSite);
//Update site by site_id
router.put('/site/:site_id', siteController.updateSite);
//Delete Row by site name
router.delete('/sites/:site_name', siteController.deleteSite);
//Delete all rows
router.delete('/sites', siteController.deleteAllSites);
//Create DataBase
router.post(
  '/apiv2/csv/sitedatabase',
  upload.single('file'),
  siteMiddleware.setHeader,
  csvWork.uploadFile,
  siteMiddleware.insertCsvToDatabase,
  // fileDelete.deleteFile,
  siteController.databaseCreated
);

module.exports = router;
