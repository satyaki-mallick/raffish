var globalSheet = NaN

const express = require("express");
const XLSX = require("xlsx");
const app = express();

app.listen(3000);

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
  map_percolate_sprinklr()

  }
);

function map_percolate_sprinklr() {
  let selection = globalSheet[0]
  let id = selection["ID"];

  // campaign specific
  let name_ = selection["Campaign Title|||ignore"];
  let desc = selection["Campaign Description|||ignore"];
  let startdate = selection["Campaign Start Date|||ignore"];
  startdate = new Date(startdate)
  let startdate_unix = Math.floor(new Date(startdate).getTime())
  let enddate = selection["Campaign End Date|||ignore"];
  enddate = Math.floor(new Date(enddate).getTime())
  let status_ = "DRAFT";
  let audience = selection["Audience|||schema:1383551219579469649"];
  let brand = selection["Brand|||schema:1383551219579469649"];

  // tags
  let channel = selection["Channel|||schema:1383551219579469649"]; //fb or insta or email
  let country = selection["Country|||schema:1383551219579469649"];
  let region = selection["Region|||schema:1383551219579469649"];
  let year = startdate.getFullYear()
  let quarter = Math.floor((startdate.getMonth() + 3) / 3);
  let type = selection["Campaign Type|||schema:1383551219579469649"]; // fb or insta
  let objective = selection["Primary Objective|||schema:1383551219579469649"];

  // campaign brief
  brief_description = selection["Section Marketing Overview - Risks & Constraints|||ignore"];
  brief_creative_dirc_tov = selection["Section Marketing Overview - What do we want the audience to think, feel and do?|||ignore"];

  // Before pushing, add if ({___} !== undefined)

  // sub-campaign
  let stay_or_booking = selection["Booking or Stay|||schema:1383551219579469649"];

}