
document.addEventListener('DOMContentLoaded', function () {

    var calendarUI = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarUI, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        locale: 'es',
        slotMinTime: '06:00:00',
        slotMaxTime: '19:00:00',
        allDaySlot: false,
        slotLabelFormat: {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short',
            hour12: true
        },
        dayHeaderFormat: {
            weekday: 'short',
            day: 'numeric'
        },
        events: '/list_tasks/',
        eventBackgroundColor: 'rgba(0, 0, 0, 0)',
        eventContent: function (info) {
            console.log("informacion",info)
            return {
                html: `<div class="event-content m-1 p-2" style="background-color:rgb(110, 112, 114)"> 
                    <div class="d-flex justify-content-between flex-wrap-reverse">
                        <div>
                           ${info.event.title}
                        </div> 
                        <div style="background-color:blue; padding: 0.15rem; border-radius: 20%">
                            ${info.event.extendedProps._id}
                            ${info.event.extendedProps.status == 'managed' ? `
                                <span class="position-absolute top-5 start-95 translate-middle p-1 bg-success border border-light rounded-circle">
                                    <span class="visually-hidden"></span>
                                </span>
                            ` : ''}
                        </div>
                    </div> 
                    </div>`
            };
        },
        eventClick: function (info) {

            let background_color = '#3232e4'
            let info_hour = info.event.extendedProps.start
            let observations = info.event.extendedProps.observations

            document.querySelectorAll('#event-detail input[name="id_mantenimiento"]').forEach(input => {
                input.value = info.event.extendedProps._id;
            });

            document.querySelectorAll('#event-detail input[name="responsable"]').forEach(input => {
                input.value = info.event.extendedProps.responsable;
            });

              

            $('#event-detail .modal-title').html(`<div class="d-flex">
                                                    <div>
                                                        <h1 style="font-size: 23px; font-weight: bold;">${info.event.title}</h1>
                                                    </div>
                                                    <div class="ms-2">
                                                        <h1 style="font-size: 23px; font-weight: bold;">${info.event.extendedProps._id}</h1>
                                                    </div>
                                                  </div>`);
            $('#event-detail .modal-header').css('background-color', background_color);
            $('#event-detail .modal-body').html(`
            <div>
                <div class="row">
                    <div class="col-9">
                        <ul>
                            <li><b>Nombre:</b> ${info.event.title}</li>
                            <li><b>Descripcion:</b> ${info.event.extendedProps.description}</li>
                            <li><b>Estado:</b> ${info.event.extendedProps.status}</li>
                            <li><b>Responsable:</b>${info.event.extendedProps.responsable}</li> 
                            <li><b>Tipo:</b> ${info.event.extendedProps.type}</li>
                        </ul>
                    </div>
                    <div class="vr p-0 col-1 d-none d-md-block" style="width: 1px;"></div>
                    <div class="d-flex flex-column align-items-center col p-3">
                        <div class="d-flex align-items-center justify-content-center gap-2">
                            <i class="fa-solid fa-user-gear fa-lg"></i>
                            <h6 class="m-1">${info.event.extendedProps.responsable}</h6>  
                        </div>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <i class="fa-solid fa-clipboard-user" title="Fecha programada" style="color:red"></i>
                                    </th>
                                    <td style="font-size: 0.8rem;">
                                    ${info.event.extendedProps.date_str} ${info_hour} 
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <i class="fa-solid fa-clipboard-list" title="En proceso de diagnostico" style="color:blue;"></i>
                                    </th>
                                    <td style="font-size: 0.8rem;">
                                        ${info.event.extendedProps.start_service != null ? info.event.extendedProps.start_service : ''}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <i class="fa-solid fa-clipboard-check" title="Diagnosticado" style="color:green;"></i>
                                    </th>
                                    <td style="font-size: 0.8rem;">
                                        ${info.event.extendedProps.finished_service != null ? info.event.extendedProps.finished_service : '' }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="accordion m-2" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2  class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                        <strong>Observaciones </strong> 
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        
                        ${observations}   

                    </div>
                    </div>
                </div>
            </div>

           
            
                </div>

            </div>

            
        `);
                
            // --------------------------------------------------------------------------------------- //

            $('#event-detail').modal('show');
        }


    });
    calendar.render();

});