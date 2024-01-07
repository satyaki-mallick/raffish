var globalSheet = NaN

const express = require("express");
const XLSX = require("xlsx");
const app = express();

function parseExcel(file) {
  let workbook = XLSX.readFile (file, {
    type: "binary",
  });
  let XL_row_object = XLSX.utils.sheet_to_row_object_array(
    workbook.Sheets[workbook.SheetNames[0]]
  );
  return XL_row_object
}

app.get("/test", (req, res) => {
  payload = {
    name: "Test Campaign12",
    description: "Testing06",
    startDate: 1560159652000,
    endDate: 2209563421000,
    status: "DRAFT",
  };
  fetch("https://api2.sprinklr.com/prod3/api/v2/campaign", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer GPNjy6p150+lPLvdi3HHmyLJlVwfcbd1c92lTtwTxTthNjRlMjBiZi1kYzc2LTM4YzEtYjFjZC0yZTBjNzgxZjI1ZWE=",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  res.json("Hi");
});

app.get("/data", (req, res) => {
  globalSheet = parseExcel("/home/ec2-user/raffish-all/small_excel.xlsx");
  selection = globalSheet[0]
  id = selection["ID"];

  // campaign specific
  name_ = selection["Campaign Title|||ignore"];
  desc = selection["Campaign Description|||ignore"];
  startdate = selection["Campaign Start Date|||ignore"];
  enddate = selection["Campaign End Date|||ignore"];
  status_ = "DRAFT";
  audience = selection["Audience|||schema:1383551219579469649"];
  brand = selection["Brand|||schema:1383551219579469649"];

  // tags
  channel = selection["Channel|||schema:1383551219579469649"]; //fb or insta or email
  country = selection["Country|||schema:1383551219579469649"];
  region = selection["Region|||schema:1383551219579469649"];
  // year = calculate
  // quarter = calculate
  type = selection["Campaign Type|||schema:1383551219579469649"]; // fb or insta
  objective = selection["Primary Objective|||schema:1383551219579469649"];


  }
);

app.listen(3000);
