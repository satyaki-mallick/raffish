var ExcelToJSON = function () {
  this.parseExcel = function (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[workbook.SheetNames[0]]
      );

      display_in_table(XL_row_object);
    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};

function handleFileSelect(evt) {
  var files = evt.target.files;
  var xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
}

function display_in_table(XL_row_object) {
  var tableBody = document.getElementById("tableBody");
  for (item of XL_row_object) {
    var row = document.createElement("tr");

    var mycheckbox = document.createElement("input");
    mycheckbox.type = "checkbox";
    checkboxcell = document.createElement("td");
    checkboxcell.appendChild(mycheckbox);
    row.appendChild(checkboxcell);

    var idCell = document.createElement("td");
    idCell.textContent = item["ID"];
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

// Read a Table Code
// function get_selection() {
//   var myTab = document.getElementById('myTable');
//   for (var i = 1; i < myTab.rows.length; i++) {
//       var objCells = myTab.rows.item(i).cells.item(0);
//       console.log(objCells)
//       for (var j = 0; j < objCells.length; j++) {
//           // console.log(objCells.item(j).innerHTML);
//       }
//   }
// }