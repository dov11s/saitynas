const {
  createRiver,
  getRiverByRiverId,
  getRivers,
  updateRiver,
  deleteRiver,
  getRiver,
} = require("./river.service.js");

module.exports = {
  createRiver: (req, res) => {
    if (req.privilege != 2) return res.status(403).send();

    const body = req.body;

    let pranesimas = "";
    if (!body.name) pranesimas += "Name is required ";
    if (!body.lenght) pranesimas += "Lenght is required ";
    if (!body.max_width) pranesimas += "Max width is required ";
    if (!body.min_width) pranesimas += "Min width is required ";
    if (!body.max_depth) pranesimas += "Max depth is required ";
    if (!body.min_depth) pranesimas += "Min depth is required ";

    if (!Number.isInteger(body.lenght) && body.lenght)
      pranesimas += "Length must be an integer ";
    if (!Number.isInteger(body.max_width) && body.max_width)
      pranesimas += "Max width must be an integer ";
    if (!Number.isInteger(body.min_width) && body.min_width)
      pranesimas += "Min width must be an integer ";
    if (!Number.isInteger(body.max_depth) && body.max_depth)
      pranesimas += "Max depth must be an integer ";
    if (!Number.isInteger(body.min_depth) && body.min_depth)
      pranesimas += "Min depth must be an integer ";

    if (pranesimas) return res.status(400).send(pranesimas);

    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    body.createDate = date;
    body.region_id = req.id_region;

    createRiver(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      body.id_river = results.insertId;
      return res.status(201).json(body);
    });
  },
  getRiverByRiverId: (req, res) => {
    const data = Object.assign(req.params, { id_region: req.id_region });
    getRiverByRiverId(data, (err, results) => {
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
  getRivers: (req, res) => {
    getRivers(req.id_region, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      if (results.length === 0) return res.status(204).send();
      return res.json(results);
    });
  },
  updateRiver: (req, res) => {
    if (req.privilege != 2) return res.status(403).send();

    if (Object.keys(req.body).length === 0)
      return res.status(400).send("Nenurodete ka atnaujinti");

    const body = Object.assign(req.body, req.params);
    body.region_id = req.id_region;

    let pranesimas = "";

    if (body.lenght)
      if (!Number.isInteger(body.lenght))
        pranesimas += "Lenght must be an integer ";
    if (body.max_width)
      if (!Number.isInteger(body.max_width))
        pranesimas += "Max width must be an integer ";
    if (body.min_width)
      if (!Number.isInteger(body.min_width))
        pranesimas += "Min width must be an integer ";
    if (body.max_depth)
      if (!Number.isInteger(body.max_depth))
        pranesimas += "Max depth must be an integer ";
    if (body.min_depth)
      if (!Number.isInteger(body.min_depth))
        pranesimas += "Min depth must be an integer ";

    if (pranesimas) return res.status(400).send(pranesimas);

    updateRiver(body, (err, results) => {
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

      getRiver(body.id, (errr, resultss) => {
        if (err) throw err;
        return res.status(200).json(resultss);
      });
    });
  },
  deleteRiver: (req, res) => {
    if (req.privilege != 2) return res.status(403).send();

    const id = req.params.id;
    deleteRiver(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results || results.affectedRows === 0) {
        return res.status(404).send();
      }

      return res.status(200).send();
    });
  },
};
