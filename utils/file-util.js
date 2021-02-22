const fs = require('fs');
const root = require('path').dirname(require.main.filename);

const deleteFile = async (req, res, next) => {
  const filePath = root + '/xlsxfiles/' + req.file.filename;
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
  next();
};

module.exports = {
  deleteFile,
};
