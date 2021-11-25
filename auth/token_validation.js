const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");

    if (token) {
      token = token.slice(7);
      verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          return res.status(401).send();
        } else {
          req.privilege = decoded.result.privilege;
          req.User_ID = decoded.result.id_user;
          req.loggedIn = decoded.result.logedIn;
          next();
        }
      });
    } else {
      return res.status(401).send();
    }
  },
};
