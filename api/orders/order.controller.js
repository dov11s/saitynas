const {
  createOrder,
  getOrderByOrderId,
  getOrders,
  updateOrder,
  deleteOrder,
  getOrder,
  getRegionId,
} = require("./order.service.js");

module.exports = {
  createOrder: async (req, res) => {
    if (req.privilege < 1) return res.status(403).send();

    getRegionId(req.id_river, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      if (req.id_region != result.region_id) {
        return res.status(400).send();
      }
      const body = req.body;
      let pranesimas = "";

      if (!body.price) pranesimas += "Price is required ";
      else if (isNaN(body.price)) pranesimas += "Price must be a number ";

      if (!body.amount) pranesimas += "Amount is required ";
      else if (!Number.isInteger(body.amount))
        pranesimas += "Amount must be a integer ";

      if (!body.booking_period) pranesimas += "Booking period is required ";
      else if (!Number.isInteger(body.booking_period))
        pranesimas += "Booking period must be a integer ";

      if (pranesimas) return res.status(400).send(pranesimas);

      let today = new Date();
      let returnDate = new Date(
        today.getTime() + 86400000 * body.booking_period
      );

      body.createDate = today.toISOString().slice(0, 19).replace("T", " ");
      body.returnDate = returnDate.toISOString().slice(0, 19).replace("T", " ");

      body.id_river = req.id_river;
      body.id_user = req.User_ID;
      body.id_region = req.id_region;

      console.log(body);

      createOrder(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }
        body.id_order = results.insertId;
        return res.status(201).json(body);
      });
    });
  },
  getOrderByOrderId: (req, res) => {
    if (req.privilege < 1) return res.status(403).send();

    getRegionId(req.id_river, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      if (req.id_region != result.region_id) {
        return res.status(400).send();
      }

      const data = {
        id_river: req.id_river,
        id_region: req.id_region,
        id_order: req.params.id,
      };

      getOrderByOrderId(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json();
        }
        if (!results) {
          return res.status(404).send();
        }

        return res.status(200).json(results);
      });
    });
  },
  getOrders: (req, res) => {
    if (req.privilege < 1) return res.status(403).send();

    getRegionId(req.id_river, (err, resultss) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      if (req.id_region != resultss.region_id) return res.status(400).send();

      const data = { id_river: req.id_river, id_region: req.id_region };

      getOrders(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }
        if (results.length === 0) return res.status(204).send();
        return res.json(results);
      });
    });
  },
  updateOrder: (req, res) => {
    if (req.privilege != 2) return res.status(403).send();

    getRegionId(req.id_river, (err, resultss) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      if (req.id_region != resultss.region_id) return res.status(400).send();

      if (Object.keys(req.body).length === 0)
        return res.status(400).send("Nenurodete ka atnaujinti");

      const body = Object.assign(req.body, req.params);
      body.id_river = req.id_river;
      body.id_region = req.id_region;

      let pranesimas = "";

      if (body.price && isNaN(body.price))
        pranesimas += "Price must be a number ";

      if (body.amount && !Number.isInteger(body.amount))
        pranesimas += "Amount must be a integer ";

      if (pranesimas) return res.status(400).send(pranesimas);

      updateOrder(body, (err, results) => {
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

        getOrder(body.id, (errr, resultss) => {
          if (err) {
            console.log(err);
            return res.status(500).send();
          }

          return res.status(200).json(resultss);
        });
      });
    });
  },
  deleteOrder: (req, res) => {
    if (req.privilege != 2) return res.status(403).send();

    getRegionId(req.id_river, (err, resultss) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      if (req.id_region != resultss.region_id) return res.status(400).send();

      const data = {
        id_order: req.params.id,
        id_river: req.id_river,
        id_region: req.id_region,
      };

      deleteOrder(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }

        if (!results || results.affectedRows === 0) {
          return res.status(404).send();
        }

        return res.status(200).send();
      });
    });
  },
};
