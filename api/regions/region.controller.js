const {
  createRegion,
  getRegionByRegionId,
  getRegions,
  updateRegion,
  deleteRegion,
} = require("./region.service.js");

module.exports = {
  createRegion: (req, res) => {
    if (req.privilege != 2) return res.status(403).send();

    const body = req.body;

    let pranesimas = "";
    if (!body.name) pranesimas += "Name is required ";
    if (!body.size) pranesimas += "Size is required ";

    if (pranesimas || isNaN(body.size))
      return res.status(400).send(pranesimas + " Size must be a number");

    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    body.createDate = date;

    createRegion(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      body.id_region = results.insertId;
      return res.status(201).json(body);
    });
  },
  getRegionByRegionId: (req, res) => {
    const id = req.params.id;
    getRegionByRegionId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(404).send();
      }
      console.log("gauk man ji");
      return res.status(200).json(results);
    });
  },
  getRegions: (req, res) => {
    getRegions((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json(results);
    });
  },
  updateRegion: (req, res) => {
    if (req.privilege != 2) return res.status(403).send();

    if (Object.keys(req.body).length === 0)
      return res.status(400).send("Nenurodete ka atnaujinti");

    const body = Object.assign(req.body, req.params);

    if (body.size)
      if (isNaN(body.size))
        return res.status(400).send("Size must be a number");

    updateRegion(body, (err, results) => {
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

      getRegionByRegionId(body.id, (errr, resultss) => {
        return res.status(200).json(resultss);
      });
    });
  },
  deleteRegion: (req, res) => {
    if (req.privilege != 2) return res.status(403).send();

    const id = req.params.id;
    deleteRegion(id, (err, results) => {
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
