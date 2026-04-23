let porcentajeGlobal = 0;
let horasAsignadasGlobal = 0;
let horasLineaGlobal = 0;
let minutosGlobal = 0;

// 1. PORCENTAJE
function calcularPorcentaje() {
    let total = +document.getElementById("totalPersonal").value || 0;
    let linea = +document.getElementById("toLinea").value || 0;

    let porcentaje = (linea / total) * 100;
    porcentajeGlobal = porcentaje;

    document.getElementById("porcentajeLinea").innerText = porcentaje.toFixed(2) + "%";
    document.getElementById("porcentajeAsignado").value = porcentaje.toFixed(2);
}

// 2. INDIRECTO
function calcularIndirecto() {
    let to = +document.getElementById("toIndirecto").value || 0;
    let horas = +document.getElementById("horasIndirecto").value || 0;
    let tarde = +document.getElementById("tardeIndirecto").value || 0;

    let resultado = (to * horas) - tarde;

    document.getElementById("resultadoIndirecto").innerText = resultado.toFixed(2);
    document.getElementById("horasIndAsignadas").value = resultado.toFixed(2);
}

// 3. COMUN
function calcularComun() {
    let to = +document.getElementById("toComun").value || 0;
    let horas = +document.getElementById("horasComun").value || 0;
    let tarde = +document.getElementById("tardeComun").value || 0;

    let resultado = (to * horas) - tarde;

    document.getElementById("resultadoComun").innerText = resultado.toFixed(2);
    document.getElementById("horasComAsignadas").value = resultado.toFixed(2);
}

// 4. HORAS ASIGNADAS
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

// 5. HORAS LINEA
function calcularHorasLinea() {
    let to = +document.getElementById("toLineaHoras").value || 0;
    let jornada = +document.getElementById("jornada").value || 0;
    let tarde = +document.getElementById("tardeLinea").value || 0;

    let horas = (to * jornada) - tarde;

    horasLineaGlobal = horas;

    document.getElementById("horasLinea").innerText = horas.toFixed(2);
}

// 6. TOTAL + MINUTOS
function calcularMinutos() {
    let totalHoras = horasLineaGlobal + horasAsignadasGlobal;
    let minutos = totalHoras * 60;

    minutosGlobal = minutos;

    document.getElementById("totalHoras").innerText = totalHoras.toFixed(2);
    document.getElementById("totalMinutos").innerText = minutos.toFixed(2);
}

// 7. ERP
function calcularERP() {
    let produccion = +document.getElementById("produccion").value || 0;
    let smv = +document.getElementById("smv").value || 0;

    let erp = ((produccion * smv) / minutosGlobal) * 100;

    document.getElementById("resultadoERP").innerText = erp.toFixed(2) + "%";
}
