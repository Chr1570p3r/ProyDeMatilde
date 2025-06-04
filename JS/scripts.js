// CARRUSEL 
   
   
// FORMULARIO
document.addEventListener("DOMContentLoaded", function (){
    const form = document.getElementById("formularioCont");
   
    // Función para cargar los comentarios desde localStorage
    function cargarComentarios() {
        seccionComentarios.innerHTML = ''; // Limpiar la sección antes de cargar
        const comentariosGuardados = JSON.parse(localStorage.getItem('comentariosFormulario')) || [];

        if (comentariosGuardados.length === 0) {
            seccionComentarios.innerHTML = '<p style="text-align: center; color: #777;">Aún no hay comentarios. ¡Sé el primero en dejar uno!</p>';
            return;
        }

        // Mostrar los comentarios, los más recientes primero
        comentariosGuardados.reverse().forEach(comentario => {
            const comentarioDiv = document.createElement('div');
            comentarioDiv.classList.add('comentario-item');
            comentarioDiv.innerHTML = `
                <strong>${comentario.nombre}:</strong>
                <p>${comentario.comentario}</p>
            `;
            seccionComentarios.appendChild(comentarioDiv);
        });
    }

    // Cargar comentarios al iniciar la página
    cargarComentarios();

    form.addEventListener("submit", function (f){
        f.preventDefault(); // Evita el envío del formulario de forma predeterminada

        let isValid = true;

        // Obtener los campos del formulario
        const nombre = document.getElementById('nombre');
        const telefono = document.getElementById('telefono');
        const correo = document.getElementById('correo');
        const comentarios = document.getElementById('comentarios');

        // Obtener los mensajes de error
        const nombreError = document.getElementById('nombreError');
        const telefonoError = document.getElementById('telefonoError');
        const correoError = document.getElementById('correoError');
        const comentariosError = document.getElementById('comentariosError');

        // Resetear mensajes de error
        nombreError.style.display = 'none';
        telefonoError.style.display = 'none';
        correoError.style.display = 'none';
        comentariosError.style.display = 'none';

        // Validación del Nombre
        // value.trim() === '' -> Verifica si el campo está vacío después de eliminar espacios en blanco al inicio y al final.
        // !/^[a-zA-Z\s]+$/.test(nombre.value.trim()): Utiliza una expresión regular (/^[a-zA-Z\s]+$/) para verificar 
        // que el nombre solo contenga letras (mayúsculas y minúsculas) y espacios.
        if (nombre.value.trim() === '' || !/^[a-zA-Z\s]+$/.test(nombre.value.trim())) {
            nombreError.style.display = 'block';
            isValid = false;
        }

        // Validación del Teléfono (ejemplo: 10 dígitos numéricos)
        // Utiliza una expresión regular (/^\d{10}$/) para verificar que el teléfono contenga exactamente 10 dígitos numéricos. 
        if (telefono.value.trim() === '' || !/^\d{10}$/.test(telefono.value.trim())) { 
            telefonoError.style.display = 'block';
            isValid = false;
        }

        // Validación del Correo Electrónico
        // Utiliza una expresión regular (/^[^\s@]+@[^\s@]+\.[^\s@]+$/) para verificar que el correo tenga un formato válido.
        // Esta expresión regular verifica que el correo no esté vacío, contenga un '@' y un '.' en la parte del dominio.
        if (correo.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
            correoError.style.display = 'block';
            isValid = false;
        }

        // Validación de Comentarios (ejemplo: máximo 500 caracteres)
        if (comentarios.value.length > 500) {
            comentariosError.style.display = 'block';
            isValid = false;
        }

        // Si el formulario es válido, guardar los datos y procesar
        if (isValid) {
            // Obtener comentarios existentes o inicializar un array vacío
            const comentariosGuardados = JSON.parse(localStorage.getItem('comentariosFormulario')) || [];
            
            // Crear el objeto del nuevo comentario con nombre y comentarios
            const nuevoComentario = {
                nombre: nombre.value.trim(),
                comentario: comentarios.value.trim()
            };

            // Añadir el nuevo comentario al array
            comentariosGuardados.push(nuevoComentario);

            // Guardar el array actualizado en localStorage
            localStorage.setItem('comentariosFormulario', JSON.stringify(comentariosGuardados));

            alert('¡Formulario enviado y comentario guardado con éxito!');
            form.reset(); // Limpiar el formulario
            cargarComentarios(); // Recargar los comentarios en la sección
        }

    })
});

//PUBLICIDAD
document.addEventListener("DOMContentLoaded", ()=>{
            const overlay = document.getElementById("overlay");
            const cerrarBtn = document.getElementById("cerrarBtn");
            //Cierre de la publicidad al hacer clic en el botón cerrar
            cerrarBtn.addEventListener("click", ()=>{
                overlay.style.display = 'none';
            });
            
            //Cerrar la imagen automáticamente despues de 5 segundos
            //setTimeOut(función, tiempo en milisegundos)            
            setTimeout(()=>{
                overlay.style.display = "none";
            }, 5000);
});

//BOTON
// Obtiene el botón

document.addEventListener("DOMContentLoaded", ()=>{
        let btnArriba = document.getElementById("btnArriba");

    // Cuando el usuario se desplaza 20px hacia abajo desde la parte superior del documento, muestra el botón
    window.onscroll = function() {funcionRueda()};

    function funcionRueda() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btnArriba.style.display = "block"; // Muestra el botón
        } else {
            btnArriba.style.display = "none"; // Oculta el botón
        }
    }

    // Cuando el usuario hace clic en el botón, se desplaza a la parte superior del documento
    btnArriba.onclick = function() {funcionArriba()};

    function funcionArriba() {
        document.body.scrollTop = 0; // Para navegadores Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
}})
