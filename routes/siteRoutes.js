const express = require('express');
const router = express.Router();
const siteController = require('../controllers/sitesController');

//Get All Sites
router.get('/sites', siteController.getAllSites);
//Get Sites of Site id
router.get('/site/:site_id', siteController.getSiteBySiteId);
//Create Site
router.post('/site', siteController.createSite);
//Create Fake DB Sites
router.post('/fakesite', siteController.createFakeSite);
//Update site by site_id
router.put('/site/:site_id', siteController.updateSite);
//Delete Row by site name
router.delete('/sites/:site_name', siteController.deleteSite);
//Delete all rows
router.delete('/sites', siteController.deleteAllSites);

module.exports = router;
