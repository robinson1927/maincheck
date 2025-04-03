const idEstudianteInput = document.getElementById("id_estudiante");
const idDocenteInput = document.getElementById("id_docente");
const idAdministrativoInput = document.getElementById("id_administrativo");
const idProgramaInput = document.getElementById("id_programa");

// Escucha los clics en los botones "Modificar"
document.addEventListener("click", function(event) {
    // Verifica si el clic fue en un botón con la clase 'btn-modificar'
    if (event.target.matches(".btn-modificar-estudiante")) {
        // Obtiene el ID del estudiante del atributo 'data-bs-id'
        const idEstudiante = event.target.getAttribute("data-bs-id");

        // Asigna el valor al campo oculto en el formulario
        idEstudianteInput.value = idEstudiante;
        
    }
});


document.addEventListener("click", function(event) {
    
    if (event.target.matches(".btn-modificar-docente")) {
        // Obtiene el ID del estudiante del atributo 'data-bs-id'
        const idDocente = event.target.getAttribute("data-bs-id");

        // Asigna el valor al campo oculto en el formulario
        idDocenteInput.value = idDocente;
        
    }
    
});

document.addEventListener("click", function(event) {
    
    if (event.target.matches(".btn-modificar-administrativo")) {
        // Obtiene el ID del estudiante del atributo 'data-bs-id'
        const idAdministrativo = event.target.getAttribute("data-bs-id");

        // Asigna el valor al campo oculto en el formulario
        idAdministrativoInput.value = idAdministrativo;
        
    }
    
});


document.addEventListener("click", function(event) {
    
    if (event.target.matches(".btn-modificar-programa")) {
        // Obtiene el ID del estudiante del atributo 'data-bs-id'
        const idPrograma = event.target.getAttribute("data-bs-id");

        // Asigna el valor al campo oculto en el formulario
        idProgramaInput.value = idAdministrativo;
        
    }
    
});