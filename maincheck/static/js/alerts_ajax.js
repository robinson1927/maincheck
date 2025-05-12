var jQuery3_5_1 = $.noConflict(true);

jQuery3_5_1('form.ajax-form').submit(function(e) {
    e.preventDefault();
   /*
    Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera mientras procesamos la solicitud.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading(); // Muestra el spinner de carga
        }
    });*/

    jQuery3_5_1.ajax({
        type: 'POST',
        url: jQuery3_5_1(this).data('url'),
        data: jQuery3_5_1(this).serialize(),
        dataType: "json",
        success: function(data) {


            console.log("entro ajax")
        
            
        
            if (data.status == 'success') {

                console.log("entro" )
                console.log("prueba",data.redirect )
                Swal.fire({
                title: data.message,
                icon: "success",
                confirmButtonColor: "#e9c01b",
                confirmButtonText: "Aceptar",

                }).then((result) => {
                    if (result.isConfirmed){
                        window.location.href = data.redirect ;
                    }
                });
            }

            if (data.status == 'error') {
                
                Swal.fire({
                title: data.message,
                icon: "error",
                confirmButtonColor: "#e9c01b",
                confirmButtonText: "Aceptar",
            });
            }

            if (data.status == 'info') {
                
                Swal.fire({
                title: data.message,
                icon: "info",
                confirmButtonColor: "#e9c01b",
                confirmButtonText: "Aceptar",
            });
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la petición AJAX:', error);
            Swal.fire({
                title: "No se pudo completar la accion, error ajax",
                icon: "error",
                confirmButtonColor: "#e9c01b",
                confirmButtonText: "Aceptar",
            });

        }
    });
});