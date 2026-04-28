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

    let erp = (totalGeneral / minutosGlobal) * 100;

    document.getElementById("resultadoERP").innerText = erp.toFixed(2) + "%";
}
