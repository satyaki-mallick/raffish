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
  console.log(selections)
  hit_sprinkler_api(selections)
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

// function hit_sprinkler_api(payload) {

//   payload = {"Hi": "from JAVASCRIPT"}
//   fetch("http://127.0.0.1:5000/data", { mode: 'no-cors'}, {
//     method: "POST",
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(payload),
//   })
  // .then (response => response.json())
  // .then (json => console.log(json))
// }
// })

function hit_sprinkler_api(payload) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch('http://127.0.0.1:5000/data', {
      method: 'POST',
      headers: myHeaders,
      // mode: 'no-cors',
      cache: 'default',
      body: JSON.stringify({fe_data: payload})
    })
  .then (response => response.json())
  .then (json => console.log(json))
}
