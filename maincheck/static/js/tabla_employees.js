let dataTable;
let dataTableInitialized = false;

const dataTableOptions = {
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5] }
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
                columns: [0, 1, 2, 3, 4, 5]
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
                columns: [0, 1, 2, 3, 4, 5]
            },
            customize: function (doc) {
                doc.pageOrientation = 'landscape'; 
            }
        }
    ],
    destroy: true,
}
let tabla_tareas = document.getElementById('tabla_empleados');
const initDataTable = async () => {
    if (dataTableInitialized) {
        dataTable.destroy();
    }
    await list_services();

    dataTable = $('#reporte_empleados').DataTable(dataTableOptions);
    dataTableInitialized = true;
};

const list_services = async () => {

    try {
        const response = await fetch(`http://127.0.0.1:8000/list_employee/`);
        const data = await response.json();
        let content = ``;
        data.forEach((service, index) => {
            content += `
                <tr> 

                    <td>
                        <a href=""
                            <button class='btn btn-sm btn-yellow'><i class='fa-solid fa-eye'></i></button>
                        </a>
                    </td>
                    <td>${service.firts_name}</td>
                    <td>${service.last_name}</td>
                    <td>${service.positions}</td>
                    <td>${service.area}</td>
                    <td>
                        <a href="delete_employee/${service._id}" onclick="return confirm('¿Estás seguro de que deseas eliminar este empleado?')"
                            <button class='btn btn-sm btn-yellow'><i class='fa-solid fa-trash-can'></i></button>
                        </a>
                    </td>
                </tr>
            `;

        });
        tabla_tareas.innerHTML = content;
    } catch (ex) {
        alert(ex);
        console.log(ex)
    }
}

window.addEventListener('load', async () => {
    await initDataTable();
    
});