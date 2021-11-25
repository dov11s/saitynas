require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const regionRouter = require("./api/regions/region.router");
const riverRouter = require("./api/rivers/river.router");
const orderRouter = require("./api/orders/order.router");

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/regions", regionRouter);
app.use(
  "/api/regions/:id_region/rivers",
  (req, res, next) => {
    req.id_region = req.params.id_region;
    next();
  },
  riverRouter
);

app.get("/", (req, res) => {
  res.send("labas veikia");
});

app.get("/api/users/login", (req, res) => {
  res.send("labas veikia loginas");
});

app.use(
  "/api/regions/:id_region/rivers/:id_river/orders",
  (req, res, next) => {
    req.id_region = req.params.id_region;
    req.id_river = req.params.id_river;
    next();
  },
  orderRouter
);

// app.use(
//   "/api/users",
//   (err, req, res, next) => {
//     if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
//       console.error(err);
//       return res.status(400).send({ status: 404, message: err.message }); // Bad request
//     }
//     next();
//   },
//   userRouter
// );
// app.use(
//   "/api/regions",
//   (err, req, res, next) => {
//     if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
//       console.error(err);
//       return res.status(400).send({ status: 404, message: err.message }); // Bad request
//     }
//     next();
//   },
//   regionRouter
// );
// app.use(
//   "/api/regions/:id_region/rivers",
//   (err, req, res, next) => {
//     if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
//       console.error(err);
//       return res.status(400).send({ status: 404, message: err.message });
//     } // Bad request
//     req.id_region = req.params.id_region;
//     next();
//   },
//   riverRouter
// );

// app.use(
//   "/api/regions/:id_region/rivers/:id_river/orders",
//   (err, req, res, next) => {
//     if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
//       console.error(err);
//       return res.status(400).send({ status: 404, message: err.message });
//     } // Bad request
//     req.id_region = req.params.id_region;
//     req.id_river = req.params.id_river;
//     next();
//   },
//   orderRouter
// );

app.listen(process.env.PORT, () => {
  console.log(`Server is runing on port ${process.env.PORT}`);
});
