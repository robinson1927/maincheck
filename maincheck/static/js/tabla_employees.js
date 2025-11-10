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

let employeesData = [];

const list_services = async () => {

    try {
        const response = await fetch(`http://127.0.0.1:8000/list_employee/`);
        const data = await response.json();
        employeesData = data;
        let content = ``;
        data.forEach((service, index) => {
            content += `
                <tr> 

                    <td>
                        <button class='btn btn-sm btn-yellow' onclick="openModal(${service._id})">
                            <i class='fa-solid fa-eye'></i>
                        </button>
                    </td>
                    <td>${service.firts_name}</td>
                    <td>${service.last_name}</td>
                    <td>${service.positions}</td>
                    <td>${service.area}</td>
                    <td>
                        <button class='btn btn-sm btn-yellow' onclick="confirmDelete(${service._id})">
                            <i class='fa-solid fa-trash-can'></i> 
                        </button>
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

function confirmDelete(clientId) {
    if (confirm("¿Estás seguro de eliminar este cliente?")) {
        window.location.href = `/rrhh_page/delete_employee/${clientId}`;
    }
}

function openModal(employeeId) {
    console.log("Abrir modal para empleado:", employeeId);
    const service = employeesData.find(emp => emp._id === employeeId);
    if (!service) return;

    document.getElementById('modal_identity').textContent = service.identity;
    document.getElementById('modal_firts_name').textContent = service.firts_name;
    document.getElementById('modal_last_name').textContent = service.last_name;
    document.getElementById('modal_email').textContent = service.email;
    document.getElementById('modal_phone').textContent = service.phone;
    document.getElementById('modal_status').textContent = service.status;
    document.getElementById('modal_age').textContent = service.age;
    document.getElementById('modal_gender').textContent = service.gender;
    document.getElementById('modal_positions').textContent = service.positions;
    document.getElementById('modal_salary').textContent = service.salary;
    document.getElementById('modal_contract').textContent = service.contract;
    document.getElementById('modal_date_admission').textContent = service.date_admission;
    document.getElementById('modal_working_day').textContent = service.working_day;
    document.getElementById('modal_arl').textContent = service.arl;
    document.getElementById('modal_eps').textContent = service.eps;
    document.getElementById('modal_holydays').textContent = service.holydays;
    document.getElementById('modal_area').textContent = service.area;
    document.getElementById('modal_observations').textContent = service.observations;
    

    const modal = new bootstrap.Modal(document.getElementById('employee-detail'));
    modal.show();
}

window.addEventListener('load', async () => {
    await initDataTable();

});