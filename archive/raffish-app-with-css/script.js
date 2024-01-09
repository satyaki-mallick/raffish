

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    const url = new URL(form.action);
    const formData = new FormData(form);

    event.preventDefault();
    // for (item of formData) {
    //     myfile = item[0].files[0]
    //     console.log(myfile)
        // const workbook = XLSX.read(myfile)
        // var first_sheet = workbook.Sheets[workbook.SheetNames[0]];
        // console.log(workbook.SheetNames)
        // const raw_data = XLSX.utils.sheet_to_json(first_sheet, {header: 1});
        // const table = XLSX.utils.sheet_to_html(first_sheet);    
    // }
    const myfile = document.querySelector("#file1")
    const filecontent = myfile.files[0]
    console.log(filecontent)
    const workbook = XLSX.read(filecontent, {type: 'array'})
    console.log(workbook.SheetNames)
}

