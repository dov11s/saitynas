const pool = require("../../config/database.js");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO users(name, password, email, phoneNumber, privilege) VALUES(?,?,?,?,?)`,
      [data.name, data.password, data.email, data.phoneNumber, data.privilege],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `SELECT id_user,name,password,email,phoneNumber,privilege from users`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUserByUserId: (id, callBack) => {
    pool.query(
      `SELECT id_user,name,password,email,phoneNumber,privilege from users WHERE id_user = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `UPDATE users SET name=COALESCE(?, name), password=COALESCE(?, password), email=COALESCE(?, email), phoneNumber=COALESCE(?, phoneNumber) WHERE id_user = ?`,
      [data.name, data.password, data.email, data.phoneNumber, data.id],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  deleteUser: (id, callBack) => {
    pool.query(
      `DELETE FROM users WHERE id_user = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByEmail: (email, callBack) => {
    pool.query(
      `Select * from users where email = ?`,
      [email],
      (error, results, fileds) => {
        if (error) {
          callBack(error);
        }

        console.log(results);

        return callBack(null, results[0]);
      }
    );
  },
  getOrdersByUserID: (id, callBack) => {
    pool.query(
      `SELECT id_order,price,orderDate,amount,returnDate, id_user from orders WHERE id_user=?`,
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
