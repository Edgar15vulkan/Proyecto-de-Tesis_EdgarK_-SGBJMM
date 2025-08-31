// resources/js/utils/fechas.js
export function formatearFecha(fecha, conDiaSemana = false) {
  if (!fecha) return "Sin fecha";

  // Normalizar cadenas "YYYY-MM-DD" para evitar desplazamientos por zona horaria
  let input = fecha;
  if (typeof fecha === "string" && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    input = fecha + "T00:00:00";
  }

  const d = new Date(input);
  if (isNaN(d)) return fecha; // fallback si no es una fecha válida

  const opciones = conDiaSemana
    ? { weekday: "long", day: "2-digit", month: "long", year: "numeric" }
    : { day: "2-digit", month: "long", year: "numeric" };

  const resultado = d.toLocaleDateString("es-MX", opciones);
  return resultado.charAt(0).toUpperCase() + resultado.slice(1);
}
