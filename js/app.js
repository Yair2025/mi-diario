// ---------------- GUARDAR ENTRADA ----------------
function guardarEntrada() {
    const texto = document.getElementById("entrada").value;

    if (texto === "") return;

    const entradas = JSON.parse(localStorage.getItem("diario")) || [];

    entradas.push({
        texto: texto,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem("diario", JSON.stringify(entradas));

    document.getElementById("entrada").value = "";

    mostrarEntradas();
}

// ---------------- MOSTRAR ENTRADAS ----------------
function mostrarEntradas() {
    const lista = document.getElementById("listaEntradas");
    lista.innerHTML = "";

    let entradas = JSON.parse(localStorage.getItem("diario")) || [];

    entradas.reverse().forEach(e => {
        const div = document.createElement("div");
        div.classList.add("entrada");

        div.innerHTML = `
            <p>${e.texto}</p>
            <small>${e.fecha}</small>
        `;

        lista.appendChild(div);
    });
}

// ---------------- BACKUP ----------------
function exportarDiario() {
    let entradas = JSON.parse(localStorage.getItem("diario")) || [];

    if (entradas.length === 0) {
        alert("No hay entradas para exportar");
        return;
    }

    let texto = "📓 MI DIARIO\n";
    texto += "=====================\n\n";

    entradas.forEach((e, index) => {
        texto += `Entrada ${index + 1}\n`;
        texto += `Fecha: ${e.fecha}\n`;
        texto += `Texto: ${e.texto}\n`;
        texto += "---------------------\n\n";
    });

    let blob = new Blob([texto], { type: "text/plain" });
    let enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(blob);
    enlace.download = "mi_diario_backup.txt";
    enlace.click();

    URL.revokeObjectURL(enlace.href);

    // Guardar fecha del backup
    let fecha = new Date().toLocaleDateString();
    localStorage.setItem("ultimoBackup", fecha);

    actualizarTextoBackup();
}

// ---------------- TEXTO DEL BOTÓN ----------------
function actualizarTextoBackup() {
    const btn = document.getElementById("btnBackup");
    const ultimaFecha = localStorage.getItem("ultimoBackup");

    if (ultimaFecha) {
        btn.innerText = `💾 Backup (Último: ${ultimaFecha})`;
    } else {
        btn.innerText = "💾 Backup";
    }
}

// Ejecutar al cargar
actualizarTextoBackup();

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letras = "01アカサタナハマヤラワ𓆩 𓆪 𓆰 𓆪";
const letrasArray = letras.split("");

const fontSize = 16;
const columnas = canvas.width / fontSize;

const gotas = [];

for (let i = 0; i < columnas; i++) {
    gotas[i] = 1;
}

function dibujarMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff88";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < gotas.length; i++) {
        const texto = letrasArray[Math.floor(Math.random() * letrasArray.length)];
        ctx.fillText(texto, i * fontSize, gotas[i] * fontSize);

        if (gotas[i] * fontSize > canvas.height && Math.random() > 0.975) {
            gotas[i] = 0;
        }

        gotas[i]++;
    }
}

setInterval(dibujarMatrix, 50);

// Ajustar tamaño si cambias pantalla
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function mostrarEntradas() {
    const lista = document.getElementById("listaEntradas");
    lista.innerHTML = "";

    const entradas = JSON.parse(localStorage.getItem("diario")) || [];

    entradas.reverse().forEach(e => {
        const div = document.createElement("div");
        div.classList.add("entrada");

        div.innerHTML = `
            <small>${e.fecha}</small>
            <p>${e.texto}</p>
        `;

        lista.appendChild(div);
    });
}
