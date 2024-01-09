var globalTable = NaN;

function parseExcel(file) {
  let reader = new FileReader();

  reader.onload = function (e) {
    let data = e.target.result;
    let workbook = XLSX.read(data, {
      type: "binary",
    });
    let XL_row_object = XLSX.utils.sheet_to_row_object_array(
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
  let files = evt.target.files;
  parseExcel(files[0]);
}

function display_in_table(XL_row_object) {
  let tableBody = document.getElementById("tableBody");
  for (item of XL_row_object) {
    let row = document.createElement("tr");

    let mycheckbox = document.createElement("input");
    mycheckbox.type = "checkbox";
    mycheckbox.className = "mycheckbox";
    mycheckbox.name = item["ID"];
    let checkboxcell = document.createElement("td");
    checkboxcell.appendChild(mycheckbox);
    row.appendChild(checkboxcell);

    let titleCell = document.createElement("td");
    titleCell.textContent = item["Campaign Title|||ignore"];
    row.appendChild(titleCell);

    let descCell = document.createElement("td");
    descCell.textContent = item["Campaign Description|||ignore"];
    row.appendChild(descCell);

    let startCell = document.createElement("td");
    startCell.textContent = item["Campaign Start Date|||ignore"];
    row.appendChild(startCell);

    let endCell = document.createElement("td");
    endCell.textContent = item["Campaign End Date|||ignore"];
    row.appendChild(endCell);

    let audienceCell = document.createElement("td");
    audienceCell.textContent = item["Audience|||schema:1383551219579469649"];
    row.appendChild(audienceCell);

    let brandCell = document.createElement("td");
    brandCell.textContent = item["Brand|||schema:1383551219579469649"];
    row.appendChild(brandCell);

    tableBody.appendChild(row);
    calc_selected_counter()
  }
}

function calc_selected_counter() {
  // var checkboxes = document.querySelector(".mycheckbox");
  var checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      enabledSettings = 
        Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
        .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
        .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
        
      // console.log(enabledSettings.length)
      selected_count.innerText = `Selected Campaigns: ${enabledSettings.length}`
    })
  });
}

