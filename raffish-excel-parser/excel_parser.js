var globalTable = NaN;

function parseExcel(file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var data = e.target.result;
    var workbook = XLSX.read(data, {
      type: "binary",
    });
    var XL_row_object = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[workbook.SheetNames[0]]
    );
    globalTable = XL_row_object;
    display_in_table(XL_row_object);
  };
  reader.onerror = function (ex) {
    console.log(ex);
  };
  reader.readAsBinaryString(file);
}

function handleFileSelect(evt) {
  var files = evt.target.files;
  parseExcel(files[0]);
}

function display_in_table(XL_row_object) {
  var tableBody = document.getElementById("tableBody");
  for (item of XL_row_object) {
    var row = document.createElement("tr");

    var idCell = document.createElement("td");
    idCell.textContent = item["ID"];

    var mycheckbox = document.createElement("input");
    mycheckbox.type = "checkbox";
    mycheckbox.className = "mycheckbox";
    mycheckbox.name = item["ID"];
    checkboxcell = document.createElement("td");
    checkboxcell.appendChild(mycheckbox);
    row.appendChild(checkboxcell);

    row.appendChild(idCell);

    var titleCell = document.createElement("td");
    titleCell.textContent = item["Campaign Title|||ignore"];
    row.appendChild(titleCell);

    var descCell = document.createElement("td");
    descCell.textContent = item["Campaign Description|||ignore"];
    row.appendChild(descCell);

    tableBody.appendChild(row);
  }
}

function submit_selection() {
  checked_boxes = get_selection();
  selections = [];
  for (id of checked_boxes) {
    for (item of globalTable) {
      if (item["ID"] === id) {
        selections.push(item)
        break;
      }
    }
  }
  hit_sprinkler_api(selections);
}

function get_selection() {
  checked_campaigns = [];
  var inputElements = document.getElementsByClassName("mycheckbox");
  for (var i = 0; inputElements[i]; ++i) {
    if (inputElements[i].checked) {
      // console.log(inputElements[i].name)
      checked_campaigns.push(inputElements[i].name);
    }
  }
  return checked_campaigns;
}

function hit_sprinkler_api(selections) {
  let json_object = JSON.stringify(selections);
  console.log(json_object)
}
