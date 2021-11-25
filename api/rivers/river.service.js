const pool = require("../../config/database.js");

module.exports = {
  createRiver: (data, callBack) => {
    pool.query(
      `INSERT INTO rivers(region_id, name, lenght, max_width, min_width, max_depth, min_depth, createdDate) VALUES(?,?,?,?,?,?,?,'${data.createDate}')`,
      [
        data.region_id,
        data.name,
        data.lenght,
        data.max_width,
        data.min_width,
        data.max_depth,
        data.min_depth,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getRivers: (id_region, callBack) => {
    pool.query(
      `SELECT id_river,name,lenght,max_width,min_width,max_depth,min_depth,createdDate from rivers WHERE region_id=?`,
      [id_region],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getRiverByRiverId: (data, callBack) => {
    pool.query(
      `SELECT id_river,name,lenght,max_width,min_width,max_depth,min_depth,createdDate from rivers WHERE(region_id=? AND id_river=?)`,
      [data.id_region, data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateRiver: (data, callBack) => {
    pool.query(
      `UPDATE rivers SET name=COALESCE(?, name), lenght=COALESCE(?, lenght),
       max_width=COALESCE(?, max_width), min_width=COALESCE(?, min_width), 
       max_depth=COALESCE(?, max_depth), min_depth=COALESCE(?, min_depth) WHERE id_river = ?`,
      [
        data.name,
        data.lenght,
        data.max_width,
        data.min_width,
        data.max_depth,
        data.min_depth,
        data.id,
      ],
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
  deleteRiver: (id, callBack) => {
    pool.query(
      `DELETE FROM rivers WHERE id_river = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getRiver: (id, callBack) => {
    pool.query(
      `SELECT id_river,name,lenght,max_width,min_width,max_depth,min_depth,createdDate from rivers WHERE id_river = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
