const pool = require("../../config/database.js");

module.exports = {
  createRegion: (data, callBack) => {
    pool.query(
      `INSERT INTO regions(name, createdDate, size) VALUES(?,'${data.createDate}', ?)`,
      [data.name, data.size],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getRegions: (callBack) => {
    pool.query(
      `SELECT id_region,name,createdDate,size from regions`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getRegionByRegionId: (id, callBack) => {
    pool.query(
      `SELECT id_region,name,createdDate,size from regions WHERE id_region = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateRegion: (data, callBack) => {
    pool.query(
      `UPDATE regions SET name=COALESCE(?, name), size=COALESCE(?, size) WHERE id_region = ?`,
      [data.name, data.size, data.id],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callBack(error);
        }

        console.log(results);

        return callBack(null, results);
      }
    );
  },
  deleteRegion: (id, callBack) => {
    pool.query(
      `DELETE FROM regions WHERE id_region = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
