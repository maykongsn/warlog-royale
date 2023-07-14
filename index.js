require("dotenv").config();

const express = require("express");

const app = express();

const warLog = require("./src/warLog");

app.use("/war", warLog);

app.listen(3000);
