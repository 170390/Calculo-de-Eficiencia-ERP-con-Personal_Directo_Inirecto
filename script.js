let porcentajeGlobal = 0;
let horasAsignadasGlobal = 0;
let horasLineaGlobal = 0;
let minutosGlobal = 0;

// 1
function calcularPorcentaje() {
    let total = +document.getElementById("totalPersonal").value || 0;
    let linea = +document.getElementById("toLinea").value || 0;

    let porcentaje = (linea / total) * 100;

    document.getElementById("porcentajeLinea").innerText = porcentaje.toFixed(2) + "%";
    document.getElementById("porcentajeAsignado").value = porcentaje.toFixed(2);
}

// 2
function calcularIndirecto() {
    let to = +document.getElementById("toIndirecto").value || 0;
    let horas = +document.getElementById("horasIndirecto").value || 0;
    let tarde = +document.getElementById("tardeIndirecto").value || 0;

    let resultado = (to * horas) - tarde;

    document.getElementById("resultadoIndirecto").innerText = resultado.toFixed(2);
    document.getElementById("horasIndAsignadas").value = resultado.toFixed(2);
}

// 3
function calcularComun() {
    let to = +document.getElementById("toComun").value || 0;
    let horas = +document.getElementById("horasComun").value || 0;
    let tarde = +document.getElementById("tardeComun").value || 0;

    let resultado = (to * horas) - tarde;

    document.getElementById("resultadoComun").innerText = resultado.toFixed(2);
    document.getElementById("horasComAsignadas").value = resultado.toFixed(2);
}

// 4
function calcularAsignadas() {
    let ind = +document.getElementById("horasIndAsignadas").value || 0;
    let com = +document.getElementById("horasComAsignadas").value || 0;
    let porcentaje = +document.getElementById("porcentajeAsignado").value || 0;

    let suma = ind + com;
    let asignadas = suma * (porcentaje / 100);

    horasAsignadasGlobal = asignadas;

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
    let totalHoras = horasLineaGlobal + horasAsignadasGlobal;
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

    // VALIDACIÓN CLAVE
    if (minutosGlobal === 0) {
        alert("Primero debes calcular los minutos (Paso 6).");
        return;
    }

    let erp = (totalGeneral / minutosGlobal) * 100;

    document.getElementById("resultadoERP").innerText = erp.toFixed(2) + "%";
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
    let meta100 = minutosGlobal / smvBase;
    let meta95 = (minutosGlobal * 0.95) / smvBase;
    let meta90 = (minutosGlobal * 0.90) / smvBase;

    // Mostrar resultados
    document.getElementById("smvBase").innerText = smvBase.toFixed(2);
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

    puntos.forEach(id => {
        let el = document.getElementById(id);
        el.style.display = (modo === "directo") ? "none" : "block";
    });

}

document.addEventListener("DOMContentLoaded", cambiarModo);

function limpiarTodo() {
    console.log("limpiar funcionando");
function limpiarTodo() {

    // LIMPIAR INPUTS
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });

    // RESTAURAR VALORES POR DEFECTO
    document.getElementById("horasIndirecto").value = 9.6;
    document.getElementById("horasComun").value = 9.6;
    document.getElementById("jornada").value = 9.6;

    // LIMPIAR RESULTADOS
    document.getElementById("porcentajeLinea").innerText = "0%";
    document.getElementById("resultadoIndirecto").innerText = "0";
    document.getElementById("resultadoComun").innerText = "0";
    document.getElementById("sumaHoras").innerText = "0";
    document.getElementById("horasAsignadas").innerText = "0";
    document.getElementById("horasLinea").innerText = "0";
    document.getElementById("totalHoras").innerText = "0";
    document.getElementById("totalMinutos").innerText = "0";
    document.getElementById("resultadoERP").innerText = "0%";

    // LIMPIAR METAS
    document.getElementById("meta100").innerText = "0";
    document.getElementById("meta95").innerText = "0";
    document.getElementById("meta90").innerText = "0";
    document.getElementById("smvBase").innerText = "0";

    // REINICIAR SEMÁFORO
    document.getElementById("semaforo").style.background = "gray";

    // RESET VARIABLE GLOBAL
    minutosGlobal = 0;
}

function limpiarTodo() {

    if (!confirm("¿Deseas limpiar todos los datos?")) return;

    // (resto igual)
}
