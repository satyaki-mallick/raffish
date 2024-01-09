const URL = "https://api2.sprinklr.com/prod3/api/v2/campaign";
const TOKEN =
  "GPNjy6p150+lPLvdi3HHmyLJlVwfcbd1c92lTtwTxTthNjRlMjBiZi1kYzc2LTM4YzEtYjFjZC0yZTBjNzgxZjI1ZWE=";
const APP_KEY = "ugu4863nf94nx8va75ges4ps";

function submit_selection() {
  checked_boxes = get_selection();
  selections = [];
  for (id of checked_boxes) {
    for (item of globalTable) {
      if (item["ID"] === id) {
        selections.push(item);
        break;
      }
    }
  }
  selection = selections[0];
  payload = map_selections_to_sprinklr_format(selection);
  console.log(payload);
  hit_sprinkler_api(payload);
}

function get_selection() {
  checked_campaigns = [];
  let inputElements = document.getElementsByClassName("mycheckbox");
  for (let i = 0; inputElements[i]; ++i) {
    if (inputElements[i].checked) {
      checked_campaigns.push(inputElements[i].name);
    }
  }
  return checked_campaigns;
}

function map_selections_to_sprinklr_format(selection) {
  id = selection["ID"];
  brand = selection["Brand|||schema:1383551219579469649"];
  name_ = selection["Campaign Title|||ignore"];
  desc = selection["Campaign Description|||ignore"];
  startdate = selection["Campaign Start Date|||ignore"];
  enddate = selection["Campaign End Date|||ignore"];
  updatedate = selection["Campaign Updated At|||ignore"];
  channel = selection["Channel|||schema:1383551219579469649"];
  country = selection["Country|||schema:1383551219579469649"];
  region = selection["Region|||schema:1383551219579469649"];
  // year = calculate
  // quarter = calculate
  type = selection["Campaign Type|||schema:1383551219579469649"];
  objective = selection["Primary Objective|||schema:1383551219579469649"];
  audience = selection["Audience|||schema:1383551219579469649"];
  status_ = "Draft";
  payload = {
    name: "satyaki_api_campaign",
    description: desc,
    status: status_,
  };
  return payload;
}

function hit_sprinkler_api(payload) {
  payload = {
    name: "satyaki_api_campaign",
    description:
      "Create marketing assets and disseminate to Corporate teams and Hotels:\nEmail campaign to APAC non-members\nEmail footer Banners\nTV & Digital Signage banners\nSocial Media Assets\n",
    status: "Draft",
  };
  // { mode: 'no-cors'},
  fetch("https://api2.sprinklr.com/prod3/api/v2/campaign", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization":
        "Bearer GPNjy6p150+lPLvdi3HHmyLJlVwfcbd1c92lTtwTxTthNjRlMjBiZi1kYzc2LTM4YzEtYjFjZC0yZTBjNzgxZjI1ZWE=",
      "Key": "ugu4863nf94nx8va75ges4ps",
    },
  });
  // .then (response => response.json())
  // .then (json => console.log(json))
}
