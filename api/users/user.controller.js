const {
  create,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByEmail,
  getOrdersByUserID,
} = require("./user.service.js");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    let token = req.get("authorization");

    let galimaSukurtiUseri = 1;

    if (token) {
      token = token.slice(7);
      verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          galimaSukurtiUseri = 1;
        } else {
          galimaSukurtiUseri = 0;
        }
      });
    }

    if (galimaSukurtiUseri === 0) return res.status(400).send();

    const body = req.body;
    const salt = genSaltSync(10);

    let pranesimas = "";
    if (!body.name) pranesimas += "Name is required ";
    if (!body.password) pranesimas += "Password is required ";
    if (!body.email) pranesimas += "Email is required ";
    if (!body.phoneNumber) pranesimas += "PhoneNumber is required ";
    if (!body.privilege) pranesimas += "Privilege is required ";
    else if (!Number.isInteger(body.privilege))
      pranesimas += "Privilege must be an integer";
    else if (body.privilege > 2 || body.privilege < 0)
      pranesimas += "Privilege must be an integer in range 0 to 2";

    if (pranesimas) return res.status(400).json(pranesimas);

    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY")
          res
            .status(400)
            .json({ message: "User with this email already exists" });

        return res.status(500).send();
      }

      return res.status(201).send();
    });
  },

  getUserByUserId: (req, res) => {
    const id_user = req.params.id;

    if (req.privilege != 2 && req.User_ID != id_user)
      return res.status(403).send();

    console.log(req.privilege);
    console.log(req.User_ID);

    getUserByUserId(id_user, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      if (!results) {
        return res.status(404).send();
      }

      return res.status(200).json(results);
    });
  },

  getUsers: (req, res) => {
    console.log(req.User_ID);
    if (req.privilege != 2) return res.status(403).send();

    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      return res.json(results);
    });
  },
  updateUser: (req, res) => {
    const id_user = req.params.id;

    if (req.privilege != 2 && req.User_ID != id_user)
      return res.status(403).send();

    console.log("Perejau if kai neturejau");

    if (Object.keys(req.body).length === 0)
      return res.status(400).send("Nenurodete ka atnaujinti");

    const body = Object.assign(req.body, req.params);

    if (body.password) {
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
    }

    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      if (results.affectedRows === 0) {
        return res.status(404).send();
      }

      if (!results) {
        return res.status(400).send();
      }

      getUserByUserId(body.id, (errr, resultss) => {
        return res.status(200).json(resultss);
      });
    });
  },
  deleteUser: (req, res) => {
    const id = req.params.id;

    const id_user = req.params.id;

    if (req.privilege != 2 && req.User_ID != id_user)
      return res.status(403).send();

    deleteUser(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      if (!results || results.affectedRows === 0) {
        return res.status(404).send();
      }

      return res.status(200).send();
    });
  },
  loginUser: (req, res) => {
    const body = req.body;
    if (Object.keys(body).length === 0) {
      res.status(400).send();
    }
    getUserByEmail(body.email, (err, result) => {
      console.log("Bandau prisijungrti");

      if (err) {
        console.log(err);
        res.status(500).send();
      }

      if (!result) {
        console.log("Labas rytas");
        return res.status(400).send();
      }

      let comparison = compareSync(body.password, result.password);

      if (comparison) {
        result.password = undefined;
        result.phoneNumber = undefined;
        result.logedIn = 1;
        const jsontoken = sign({ result: result }, "qwe1234", {
          expiresIn: "1h",
        });

        return res.status(201).json({ jsontoken: jsontoken });
      }

      return res.status(404).send();
    });
  },

  userOrders: (req, res) => {
    if (req.privilege < 1) return res.status(403).send();

    const userId = req.User_ID;

    getOrdersByUserID(userId, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      return res.json(result);
    });
  },
};
