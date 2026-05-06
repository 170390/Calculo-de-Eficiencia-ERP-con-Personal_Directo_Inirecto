let porcentajeGlobal = 0;
let horasAsignadasGlobal = 0;
let horasLineaGlobal = 0;
let minutosGlobal = 0;
let porcentajeRealGlobal = 0;

// 1
function calcularPorcentaje() {
    let total = +document.getElementById("totalPersonal").value || 0;
    let linea = +document.getElementById("toLinea").value || 0;

    let porcentaje = (linea / total) * 100;

    // 🔥 GUARDAR REAL
    porcentajeRealGlobal = porcentaje;

    // 👁 MOSTRAR BONITO
    document.getElementById("porcentajeLinea").innerText = porcentaje.toFixed(2) + "%";
    document.getElementById("porcentajeAsignado").value = porcentaje.toFixed(2);
}

// 2
function calcularIndirecto() {
    let to = +document.getElementById("toIndirecto").value || 0;
    let horas = +document.getElementById("horasIndirecto").value || 0;
    let tarde = +document.getElementById("tardeIndirecto").value || 0;

   let resultado = (to * horas) - tarde;

document.getElementById("horasIndAsignadas").value = resultado; // sin redondeo
document.getElementById("resultadoIndirecto").innerText = resultado.toFixed(2);
}

// 3
function calcularComun() {
    let to = +document.getElementById("toComun").value || 0;
    let horas = +document.getElementById("horasComun").value || 0;
    let tarde = +document.getElementById("tardeComun").value || 0;

    let resultado = (to * horas) - tarde;

document.getElementById("horasComAsignadas").value = resultado;
document.getElementById("resultadoComun").innerText = resultado.toFixed(2);
}

// 4
function calcularAsignadas() {

    let ind = Number(document.getElementById("horasIndAsignadas").value) || 0;
    let com = Number(document.getElementById("horasComAsignadas").value) || 0;
    let porcentaje = porcentajeRealGlobal || 0;

    let suma = ind + com;
    let asignadas = suma * (porcentaje / 100);

    // 🔥 GUARDAR REAL (SIN REDONDEAR)
    horasAsignadasGlobal = asignadas;

    // 👁 MOSTRAR (SOLO VISUAL)
    document.getElementById("sumaHoras").innerText = suma.toFixed(2);
    document.getElementById("horasAsignadas").innerText = asignadas.toFixed(2);
}

// 5
function calcularHorasLinea() {
    let to = +document.getElementById("toLineaHoras").value || 0;
    let jornada = +document.getElementById("jornada").value || 0;
    let tarde = +document.getElementById("tardeLinea").value || 0;

    let horas = (to * jornada) - tarde;

horasLineaGlobal = horas;

document.getElementById("horasLinea").innerText = horas.toFixed(2);
}

// 6
function calcularMinutos() {
let modo = document.getElementById("modoCalculo").value;

let totalHoras = 0;

if (modo === "directo") {
    totalHoras = horasLineaGlobal;
} else {
    totalHoras = horasLineaGlobal + horasAsignadasGlobal;
}
let minutos = totalHoras * 60;

minutosGlobal = minutos;

document.getElementById("totalHoras").innerText = totalHoras.toFixed(2);
document.getElementById("totalMinutos").innerText = minutos.toFixed(2);
}

// 7 (ACTUALIZADO MULTIESTILO)
function calcularERP() {

    let totalGeneral =
        (+document.getElementById("prod1").value || 0) * (+document.getElementById("smv1").value || 0) +
        (+document.getElementById("prod2").value || 0) * (+document.getElementById("smv2").value || 0) +
        (+document.getElementById("prod3").value || 0) * (+document.getElementById("smv3").value || 0);

    if (!minutosGlobal || minutosGlobal === 0) {
        alert("Primero debes calcular los minutos (Paso 6).");
        return;
    }

    let erp = (totalGeneral / minutosGlobal) * 100;

document.getElementById("resultadoERP").innerText = erp.toFixed(2) + "%";

    // 🔥 SEMÁFORO
    let semaforo = document.getElementById("semaforo");

   if (erp >= 100) {
    semaforo.style.background = "#22c55e"; // verde moderno
} else if (erp >= 90) {
    semaforo.style.background = "#facc15"; // amarillo pro
} else {
    semaforo.style.background = "#ef4444"; // rojo moderno
}

    calcularMetas();
}
function calcularMetas() {

    // Asegurar que minutos exista
    if (!minutosGlobal || minutosGlobal === 0) {
        calcularMinutos();
    }

    if (!minutosGlobal || minutosGlobal === 0) {
        alert("Error: primero debes calcular los minutos (Paso 6).");
        return;
    }

    // Obtener valores
    let prod1 = Number(document.getElementById("prod1").value) || 0;
    let prod2 = Number(document.getElementById("prod2").value) || 0;
    let prod3 = Number(document.getElementById("prod3").value) || 0;

    let smv1 = Number(document.getElementById("smv1").value) || 0;
    let smv2 = Number(document.getElementById("smv2").value) || 0;
    let smv3 = Number(document.getElementById("smv3").value) || 0;

    // Validación básica
    if (prod1 === 0 && prod2 === 0 && prod3 === 0) {
        alert("Ingresa al menos una producción.");
        return;
    }

    if (smv1 === 0 && smv2 === 0 && smv3 === 0) {
        alert("Ingresa al menos un SMV.");
        return;
    }

    // Determinar estilo con mayor producción
    let smvBase = 0;

    if (prod1 >= prod2 && prod1 >= prod3) {
        smvBase = smv1;
    } else if (prod2 >= prod1 && prod2 >= prod3) {
        smvBase = smv2;
    } else {
        smvBase = smv3;
    }

    // Validación final
    if (!smvBase || smvBase === 0) {
        alert("El SMV base es inválido.");
        return;
    }

    // Cálculo de metas
    let meta105 = (minutosGlobal * 1.05) / smvBase;
    let meta110 = (minutosGlobal * 1.10) / smvBase;
    let meta100 = minutosGlobal / smvBase;
    let meta95 = (minutosGlobal * 0.95) / smvBase;
    let meta90 = (minutosGlobal * 0.90) / smvBase;

    // Mostrar resultados
    document.getElementById("smvBase").innerText = smvBase.toFixed(2);
    document.getElementById("meta105").innerText = Math.round(meta105);
    document.getElementById("meta110").innerText = Math.round(meta110);
    document.getElementById("meta100").innerText = Math.round(meta100);
    document.getElementById("meta95").innerText = Math.round(meta95);
    document.getElementById("meta90").innerText = Math.round(meta90);

    // DEBUG (muy útil)
    console.log("Minutos:", minutosGlobal);
    console.log("SMV Base:", smvBase);
    console.log("Meta100:", meta100);
}

function calcularTodo() {

    if (!minutosGlobal || minutosGlobal === 0) {
        calcularMinutos();
    }

    if (!minutosGlobal || minutosGlobal === 0) {
        alert("Primero completa los pasos anteriores.");
        return;
    }

    let prod1 = +document.getElementById("prod1").value || 0;
    let prod2 = +document.getElementById("prod2").value || 0;
    let prod3 = +document.getElementById("prod3").value || 0;

    let smv1 = +document.getElementById("smv1").value || 0;
    let smv2 = +document.getElementById("smv2").value || 0;
    let smv3 = +document.getElementById("smv3").value || 0;

    let totalGeneral = (prod1 * smv1) + (prod2 * smv2) + (prod3 * smv3);

    let erp = (totalGeneral / minutosGlobal) * 100;

    document.getElementById("resultadoERP").innerText = erp.toFixed(2) + "%";

    // SEMÁFORO
    let semaforo = document.getElementById("semaforo");

    if (erp >= 100) {
        semaforo.style.background = "green";
    } else if (erp >= 90) {
        semaforo.style.background = "gold";
    } else {
        semaforo.style.background = "red";
    }

    // SMV BASE
    let smvBase = 0;

    if (prod1 >= prod2 && prod1 >= prod3) smvBase = smv1;
    else if (prod2 >= prod1 && prod2 >= prod3) smvBase = smv2;
    else smvBase = smv3;

    if (!smvBase) return;

    document.getElementById("meta100").innerText = Math.round(minutosGlobal / smvBase);
    document.getElementById("meta95").innerText = Math.round((minutosGlobal * 0.95) / smvBase);
    document.getElementById("meta90").innerText = Math.round((minutosGlobal * 0.90) / smvBase);
    document.getElementById("meta105").innerText = Math.round((minutosGlobal * 1.05) / smvBase);
    document.getElementById("meta110").innerText = Math.round((minutosGlobal * 1.10) / smvBase);
    document.getElementById("smvBase").innerText = smvBase.toFixed(2);
}

// ===== AUTO CALCULO =====
function activarAutoCalculo() {

    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        input.addEventListener("input", () => {

            // Punto 1
            if (valido("totalPersonal", "toLinea")) {
                calcularPorcentaje();
            }

            // Punto 2
            if (valido("toIndirecto", "horasIndirecto")) {
                calcularIndirecto();
            }

            // Punto 3
            if (valido("toComun", "horasComun")) {
                calcularComun();
            }

            // Punto 4
            if (valido("horasIndAsignadas", "horasComAsignadas", "porcentajeAsignado")) {
                calcularAsignadas();
            }

            // Punto 5
            if (valido("toLineaHoras", "jornada")) {
                calcularHorasLinea();
            }

            // Punto 6
            if (
                document.getElementById("horasAsignadas").innerText !== "0" &&
                document.getElementById("horasLinea").innerText !== "0"
            ) {
                calcularMinutos();
            }

        });
    });
}

// VALIDAR CAMPOS
function valido(...ids) {
    return ids.every(id => {
        let val = document.getElementById(id).value;
        return val !== "" && !isNaN(val);
    });
}

document.addEventListener("DOMContentLoaded", activarAutoCalculo);

function cambiarModo() {

    let modo = document.getElementById("modoCalculo").value;

    let puntos = ["punto1", "punto2", "punto3", "punto4"];

    // MOSTRAR / OCULTAR
    puntos.forEach(id => {
        let el = document.getElementById(id);
        if (el) el.style.display = (modo === "directo") ? "none" : "block";
    });

    // RENOMBRAR NUMEROS
    if (modo === "directo") {

        document.querySelectorAll("#punto5 .num")[0].innerText = "1.";
        document.querySelectorAll("#punto6 .num")[0].innerText = "2.";
        document.querySelectorAll("#punto7 .num")[0].innerText = "3.";

    } else {

        document.querySelectorAll("#punto5 .num")[0].innerText = "5.";
        document.querySelectorAll("#punto6 .num")[0].innerText = "6.";
        document.querySelectorAll("#punto7 .num")[0].innerText = "7.";

    }
// 🔥 RESETEAR VARIABLES
horasAsignadasGlobal = 0;
horasLineaGlobal = 0;
minutosGlobal = 0;

// 🔥 LIMPIAR RESULTADOS
document.getElementById("totalHoras").innerText = "0";
document.getElementById("totalMinutos").innerText = "0";
document.getElementById("resultadoERP").innerText = "0%";

let sem = document.getElementById("semaforo");
if (sem) sem.style.background = "gray";
}

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll("input").forEach(input => {

        if (input.value.trim() !== "") {
            input.style.setProperty("background-color", "#e9f7ef", "important");
            input.style.setProperty("border-color", "#28a745", "important");
        }

        input.addEventListener("focus", function () {
            this.style.setProperty("background-color", "#fff", "important");
        });

     input.addEventListener("blur", function () {
    if (this.value.trim() !== "") {
        this.style.setProperty("background-color", "#e9f7ef", "important");
        this.style.setProperty("border-color", "#28a745", "important");
    } else {
        this.style.setProperty("background-color", "#fdecea", "important");
        this.style.setProperty("border-color", "#f5c2c7", "important");
    }
});

    });

});

function limpiarTodo() {

    console.log("Limpiando...");

    // LIMPIAR INPUTS
    document.querySelectorAll("input").forEach(input => {
        input.value = "";

        input.style.setProperty("background-color", "#fdecea", "important");
        input.style.setProperty("border-color", "#f5c2c7", "important");
    });

    // RESTAURAR HORAS
    ["horasIndirecto", "horasComun", "jornada"].forEach(id => {
        let el = document.getElementById(id);
        if (el) {
            el.value = 9.6;
            el.style.setProperty("background-color", "#e9f7ef", "important");
            el.style.setProperty("border-color", "#28a745", "important");
        }
    });

// LIMPIAR RESULTADOS (CONTROLADO)
let resultados = [
    "porcentajeLinea",
    "resultadoIndirecto",
    "resultadoComun",
    "sumaHoras",
    "horasAsignadas",
    "horasLinea",
    "totalHoras",
    "totalMinutos",
    "resultadoERP"
];

resultados.forEach(id => {
    let el = document.getElementById(id);
    if (el) {
        el.innerText = (id === "porcentajeLinea" || id === "resultadoERP") ? "0%" : "0";
    }
});

// LIMPIAR METAS
["meta100", "meta95", "meta90", "meta105", "meta110"].forEach(id => {
    let el = document.getElementById(id);
    if (el) el.textContent = "0";
});

// LIMPIAR SMV BASE
let smv = document.getElementById("smvBase");
if (smv) smv.textContent = "0";
    
// SEMÁFORO
let sem = document.getElementById("semaforo");
if (sem) sem.style.background = "gray";

// VARIABLE GLOBAL
if (typeof minutosGlobal !== "undefined") {
    minutosGlobal = 0;
}
}
