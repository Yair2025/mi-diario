const PASSWORD = "270125"; // 🔐 KEY

function verificar() {
    const pass = document.getElementById("password").value;

    if (pass === PASSWORD) {
        document.getElementById("login").style.display = "none";
        document.getElementById("app").style.display = "block";
        mostrarEntradas();
        actualizarTextoBackup();
    } else {
        document.getElementById("error").innerText = "❌ Contraseña incorrecta";
    }
}

function cerrarSesion() {
    document.getElementById("app").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("password").value = "";
}