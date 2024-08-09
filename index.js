import dotenv from "dotenv";
import express from "express";
// import connectDB from "./config/db.js";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
// import dotenv from 'dotenv';
// dotenv.config();

import { connectDB } from './config/db.js';
import Bedrooms from './models/Bedrooms.js';
import BrokerDirect from './models/brokerDirect.js';
import budget from './models/budget.js';
import Builder from './models/builder.js';
import City from './models/city.js';
import Construction from './models/construction.js';
import Deal from './models/deal.js';
import Emp from './models/emp.js';
import Furnishing from './models/furnishing.js';
import Location from './models/location.js';
import Product from './models/product.js';
import Project from './models/project.js';
import PropertyType from './models/propertyType.js';
import Registration from './models/registration.js';
import SaleRent from './models/saleRent.js';
import User from './models/user.js';

const init = async () => {
  await connectDB();
  await Bedrooms.sync();
  await BrokerDirect.sync();
  await budget.sync();
  await Builder.sync();
  await City.sync();
  await Construction.sync();
  await Deal.sync();
  await Emp.sync();
  await Furnishing.sync();
  await Location.sync();
  await Product.sync();
  await Project.sync();
  await PropertyType.sync();
  await Registration.sync();
  await SaleRent.sync();
  await User.sync();
};

init();
app.use(
  cors({
    origin: "*",
  })
);


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10kb" }));
app.use("/images", express.static("uploads"));

fs.readdirSync("./routes").map(async (route) => {
  const { router } = await import(`./routes/${route}`);
  app.use(`/api/${route.replace(".js", "")}`, router);
});

app.listen(process.env.PORT, () =>
  console.log(`Server Running on port ${process.env.PORT}`)
);