let dataTable;
let dataTableInitialized = false;

const dataTableOptions = {
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6,7,8,9,10] }
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
                columns: [1, 2, 3, 4, 5, 6, 7,8,9]
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
                columns: [1, 2, 3, 4, 5, 6,7,8,9 ]
            },
            customize: function (doc) {
                doc.pageOrientation = 'landscape'; 
            }
        }
    ],
    destroy: true,
}
let tabla_administrativos = document.getElementById('tabla_administrativos');
const initDataTable = async () => {
    if (dataTableInitialized) {
        dataTable.destroy();
    }
    await list_services();

    dataTable = $('#resporte_administrativos').DataTable(dataTableOptions);
    dataTableInitialized = true;
};

const list_services = async () => {

    try {
        const response = await fetch(`http://127.0.0.1:8000/admins/lista_administrativos/`);
        const data = await response.json();
        let content = ``;
        data.forEach((service, index) => {
            content += `
                <tr> 
                    <td>${service.id_administrativo}</td>
                    <td>${service.nombre}</td>
                    <td>${service.apellido}</td>
                    <td>${service.direccion}</td>
                    <td>${service.telefono}</td>
                    <td>${service.email}</td>
                    <td>${service.fechaNacimiento}</td>
                    <td>${service.cargo}</td>
                    <td>${service.dependencia}</td>
                    <td>
                        <a href=""
                            <button class='btn btn-sm btn-primary btn-yellow btn-modificar-administrativo' data-bs-toggle="modal"
									data-bs-target="#modificar-administrativo" data-bs-id="${service.id_administrativo}"><i class='fa-solid fa-pen'></i></button>
                        </a>
                    </td>
                    <td>
                        <a href="/admins/eliminar_administrativo/${service.id_administrativo}" onclick="return confirm('¿Estás seguro de que deseas eliminar el administrativo?')"
                            <button class='btn btn-sm btn-danger btn-yellow'><i class='fa-solid fa-trash-can'></i></button>
                        </a>
                    </td>
                </tr>
            `;

        });
        tabla_administrativos.innerHTML = content;
    } catch (ex) {
        alert(ex);
        console.log(ex)
    }
}

window.addEventListener('load', async () => {
    await initDataTable();
});