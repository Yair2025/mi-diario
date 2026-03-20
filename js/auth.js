// 🔐 Cambia tu contraseña aquí
const PASSWORD = "270125";

function verificar() {
    const input = document.getElementById("password").value;
    const error = document.getElementById("error");

    if (input === PASSWORD) {
        // Ocultar login
        document.getElementById("login").style.display = "none";

        // Mostrar app
        document.getElementById("app").style.display = "block";

        // Limpiar error
        error.textContent = "";

        // 🔥 Cargar historial
        if (typeof mostrarEntradas === "function") {
            mostrarEntradas();
        }

    } else {
        error.textContent = "❌ Contraseña incorrecta";
    }
}

// 🚪 Cerrar sesión
function cerrarSesion() {
    document.getElementById("app").style.display = "none";
    document.getElementById("login").style.display = "block";

    // Limpiar input
    document.getElementById("password").value = "";
}

document.getElementById("password").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        verificar();
    }
});
