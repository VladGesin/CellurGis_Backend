const root = require('path').dirname(require.main.filename);
const fs = require('fs');
const csv = require('csv-parser');

// const es = require('event-stream');
const errHandler = require('../utils/error');

//Cheack CSV Headlines
const checkHeader = (row, tamplateHeaders) => {
  if (
    row.length == tamplateHeaders.length &&
    row.every(function (u, i) {
      u = u.replace(/\s+/g, '');
      return u == tamplateHeaders[i];
    })
  ) {
    return false;
  } else {
    return true;
  }
};
//Check rows
const checkRow = (c) => {
  if (c.includes('')) {
    return true;
  }
};

const uploadFile = async (req, res, next) => {
  const { filename, project_id } = req.body;
  const filePath = root + '/xlsxfiles/' + req.file.filename;
  try {
    let result = [];
    const stream = fs.createReadStream(filePath);
    stream
      .pipe(csv())
      .on('error', (err) => {
        // console.log('error');
        next(err);
      })
      .on('headers', (header) => {
        if (checkHeader(header, req.csvHeader))
          next(errHandler(`Wrong collum position`, 400));
      })
      .on('data', (data) => {
        if (checkRow(Object.values(data)))
          next(errHandler(`There Spacing in box File Uploud Stop`, 400));
        if (req.path === '/apiv1/csv/newdtfile')
          result.push(Object.values(data).concat(filename, project_id));
        else result.push(Object.values(data));
      })
      .on('end', async () => {
        req.data = result;
        // console.log('end');
        next();
      })
      .on('close', () => {
        // console.log('close');
        next();
      });
  } catch (error) {
    next(error);
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

module.exports = { uploadFile };
