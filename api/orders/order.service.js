const pool = require("../../config/database.js");

module.exports = {
  createOrder: (data, callBack) => {
    pool.query(
      `INSERT INTO orders(id_river, price, orderDate, amount, returnDate, id_region, id_user) VALUES(?,?,'${data.createDate}',?,'${data.returnDate}',?,?)`,
      [data.id_river, data.price, data.amount, data.id_region, data.id_user],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getOrders: (data, callBack) => {
    pool.query(
      `SELECT id_order,price,orderDate,amount,returnDate, id_user from orders WHERE(id_river=? AND id_region=?)`,
      [data.id_river, data.id_region],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getOrderByOrderId: (data, callBack) => {
    pool.query(
      `SELECT id_order,price,orderDate,amount,returnDate, id_user from orders WHERE id_river=? AND id_order=? AND id_region=?`,
      [data.id_river, data.id_order, data.id_region],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateOrder: (data, callBack) => {
    pool.query(
      `UPDATE orders SET price=COALESCE(?, price), amount=COALESCE(?, amount)
       WHERE id_order = ? AND id_region = ? AND id_river = ?`,
      [data.price, data.amount, data.id, data.id_region, data.id_river],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  deleteOrder: (data, callBack) => {
    pool.query(
      `DELETE FROM orders WHERE id_order = ? AND id_river = ? AND id_region = ?`,
      [data.id_order, data.id_river, data.id_region],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getOrder: (id, callBack) => {
    pool.query(
      `SELECT id_order,price,orderDate,amount,returnDate, id_user from orders WHERE id_order = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getRegionId: (id, callBack) => {
    pool.query(
      "SELECT region_id from rivers WHERE id_river = ?",
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
