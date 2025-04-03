let dataTable;
let dataTableInitialized = false;

const dataTableOptions = {
    columnDefs: [
        { className: "centered", targets: [0, 1, 2] }
    ],
    responsive: true,
    scrollY: 292,
    scrollX: true,
    scrollCollapse: true,
    dom: "fBrtp",
    buttons: [
        {
            extend: "excel",
            text: '<i class="fas fa-file-excel"></i>',
            className: 'btn btn-success',
            excelStyles: {
                template: 'header-blue'
            },
            exportOptions: {
                columns: [1, 2, 3]
            }
        },
        {
            extend: "pdf",
            text: '<i class="fas fa-file-pdf"></i>',
            className: 'btn btn-danger',
            excelStyles: {
                template: 'header-blue'
            },
            exportOptions: {
                columns: [1, 2, 3]
            },
            customize: function (doc) {
                doc.pageOrientation = 'landscape'; 
            }
        }
    ],
    destroy: true,
}
let tabla_grupos_investigacion = document.getElementById('tabla_grupos_investigacion');
const initDataTable = async () => {
    if (dataTableInitialized) {
        dataTable.destroy();
    }
    await list_services();

    dataTable = $('#resporte_grupos_investigacion').DataTable(dataTableOptions);
    dataTableInitialized = true;
};

const list_services = async () => {

    try {
        const response = await fetch(`http://127.0.0.1:8000/admins/lista_grupos_investigacion/`);
        const data = await response.json();
        let content = ``;
        data.forEach((service, index) => {
            content += `
                <tr> 
                    <td>${service.nombre}</td>
                    <td>${service.cantidad}</td>
                    <td>${service.promedio}</td>
                </tr>
            `;

        });
        tabla_grupos_investigacion.innerHTML = content;
    } catch (ex) {
        alert(ex);
        console.log(ex)
    }
}

window.addEventListener('load', async () => {
    await initDataTable();
    
});