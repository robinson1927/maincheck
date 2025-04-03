let dataTable;
let dataTableInitialized = false;

const dataTableOptions = {
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4,5,6] }
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
                columns: [1, 2, 3, 4, 5]
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
                columns: [1, 2, 3, 4, 5]
            },
            customize: function (doc) {
                doc.pageOrientation = 'landscape'; 
            }
        }
    ],
    destroy: true,
}
let tabla_programas = document.getElementById('tabla_programas');
const initDataTable = async () => {
    if (dataTableInitialized) {
        dataTable.destroy();
    }
    await list_services();

    dataTable = $('#reporte_programas').DataTable(dataTableOptions);
    dataTableInitialized = true;
};

const list_services = async () => {

    try {
        const response = await fetch(`http://127.0.0.1:8000/admins/lista_programas/`);
        const data = await response.json();
        let content = ``;
        data.forEach((service, index) => {
            content += `
                <tr> 
                    <td>${service.id_programa}</td>
                    <td>${service.nombre}</td>
                    <td>${service.duracion}</td>
                    <td>${service.facultad}</td>
                    <td>${service.docente}</td>
                    <td>
                        <a href=""
                            <button class='btn btn-sm btn-primary btn-yellow btn-modificar-programa' data-bs-toggle="modal"
									data-bs-target="#modificar-programa" data-bs-id="${service.id_programa}"><i class='fa-solid fa-pen'></i></button>
                        </a>
                    </td>
                    <td>
                        <a href="/admins/eliminar_programa/${service.id_programa}" onclick="return confirm('¿Estás seguro de que deseas eliminar este programa?')"
                            <button class='btn btn-sm btn-danger btn-yellow'><i class='fa-solid fa-trash-can'></i></button>
                        </a>
                    </td>
                </tr>
            `;

        });
        tabla_programas.innerHTML = content;
    } catch (ex) {
        alert(ex);
        console.log(ex)
    }
}

window.addEventListener('load', async () => {
    await initDataTable();
});