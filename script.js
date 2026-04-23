let minutosGlobales = 0;

// CÁLCULO DE MINUTOS INDIRECTOS
function calcularIndirecto() {

    let indirecto = parseFloat(document.getElementById("indirecto").value) || 0;
    let horasJornada = parseFloat(document.getElementById("horasJornada").value) || 0;
    let leaving = parseFloat(document.getElementById("leaving").value) || 0;
    let directo = parseFloat(document.getElementById("directo").value) || 0;
    let porcentaje = parseFloat(document.getElementById("porcentaje").value) || 0;

    // Horas indirectas reales
    let horasIndirectas = (indirecto * horasJornada) - leaving;

    // Horas directas
    let horasDirectas = directo * horasJornada;

    // Total base
    let sumaHoras = horasIndirectas + horasDirectas;

    // Aplicar porcentaje
    let horasAsignadas = sumaHoras * (porcentaje / 100);

    // Total final
    let totalHoras = (directo * horasJornada) + horasAsignadas;

    let minutos = totalHoras * 60;

    minutosGlobales = minutos;

    document.getElementById("horasTotales").innerText = totalHoras.toFixed(2);
    document.getElementById("minutosTotales").innerText = minutos.toFixed(2);
}


// CÁLCULO DE ERP
function calcularERP() {

    let produccion = parseFloat(document.getElementById("produccion").value) || 0;
    let smv = parseFloat(document.getElementById("smv").value) || 0;

    if (minutosGlobales === 0) {
        alert("Primero calcula los minutos.");
        return;
    }

    let erp = ((produccion * smv) / minutosGlobales) * 100;

    document.getElementById("erpResultado").innerText = erp.toFixed(2) + "%";
}
