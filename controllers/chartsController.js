const chartQ = require('../utils/chartQueries');

//Set Collum name

const setCollumName = (table) => {
  return table == 'site' ? 'dist_from_site' : 'dist_from_ref';
};

//GET AVG rsrp by site_id
const avgChart = async (req, res, next) => {
  try {
    const { site_id, dist, project_id, filename, table } = req.params;
    const avg = await chartQ.getAVG(
      site_id,
      dist,
      project_id,
      filename,
      setCollumName(table)
    );
    res.json(avg);
  } catch (error) {
    console.log(error);
  }
};

//GET MIN rsrp by site_id
const minChart = async (req, res, next) => {
  try {
    const { site_id, dist, project_id, filename, table } = req.params;
    const min = await chartQ.getMIN(
      site_id,
      dist,
      project_id,
      filename,
      setCollumName(table)
    );
    res.json(min);
  } catch (error) {
    console.log(error);
  }
};

//GET MAX rsrp by site_id
const maxChart = async (req, res, next) => {
  try {
    const { site_id, dist, project_id, filename, table } = req.params;
    const max = await chartQ.getMAX(
      site_id,
      dist,
      project_id,
      filename,
      setCollumName(table)
    );
    res.json(max);
  } catch (error) {
    console.log(error);
  }
};

//Get all the diffrent KM with site_id
const getDistinctBySiteId = async (req, res, next) => {
  try {
    const { site_id, project_id, filename, table } = req.params;
    const distinctKM = await chartQ.getAllDistinctDist(
      site_id,
      project_id,
      filename,
      setCollumName(table)
    );
    res.json(distinctKM);
  } catch (error) {
    console.log(error);
  }
};

const getCountRsrpGreater = async (req, res, next) => {
  try {
    const { site_id, dist, rsrp, project_id, filename, table } = req.params;
    const countPoints = await chartQ.getRsrpInDistGreater(
      site_id,
      dist,
      rsrp,
      project_id,
      filename,
      setCollumName(table)
    );
    res.json(countPoints);
  } catch (error) {
    console.log(error);
  }
};

//Get all the diffrent KM with site_id
const getCountRsrp = async (req, res, next) => {
  try {
    const { site_id, dist, project_id, filename, table } = req.params;
    const countPoints = await chartQ.getRsrpInDist(
      site_id,
      dist,
      project_id,
      filename,
      setCollumName(table)
    );
    res.json(countPoints);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  avgChart,
  maxChart,
  minChart,
  getDistinctBySiteId,
  getCountRsrpGreater,
  getCountRsrp,
};
