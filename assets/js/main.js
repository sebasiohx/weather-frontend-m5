/* referencias DOM */
const body = document.querySelector("body");
const formularioBusqueda = document.querySelector("#form-busqueda");
const inputBusqueda = document.querySelector("#input-busqueda");
const heroSection = document.querySelector("#hero-section");
const vistaHome = document.querySelector("#vista-home");
const regionesContainer = document.querySelector("#regiones-container");
const vistaDetalle = document.querySelector("#vista-detalle");
const detalleContainer = document.querySelector("#detalle-container");
const pronosticoDetalle = document.querySelector("#pronostico-detalle");
const botonesHome = document.querySelectorAll(".btn-home");

/* variables globales */
const climaChileApp = new ClimaService(regionesChile);

function traducirClima(codigo, esDia) {
  let objetoClima = {};

  if (codigo === 0)
    objetoClima = esDia ? climas["despejado"] : climas["nocheDespejada"];
  if ([1, 2].includes(codigo))
    objetoClima = esDia ? climas["nubladoParcial"] : climas["nocheNublada"];
  if (codigo === 3)
    objetoClima = esDia ? climas["nublado"] : climas["nocheNublada"];
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(codigo))
    objetoClima = esDia ? climas["lluvia"] : climas["nocheLluvia"];
  if (codigo === 77) objetoClima = climas["granizo"];
  if ([71, 73, 75, 85, 86].includes(codigo)) objetoClima = climas["nevada"];
  if ([95, 96, 99].includes(codigo)) objetoClima = climas["tormenta"];

  return objetoClima;
}

async function renderizarHero() {
  // ✅ 1. Mostramos el loading ANTES del await
  const h2Ciudad = document.querySelector("#nombre-ciudad-hero");
  const h2Region = document.querySelector("#nombre-region-hero");
  const h1CifraTempreatura = document.querySelector("#cifra-temperatura-hero");
  const h3MinMax = document.querySelector("#min-max-temperatura-hero");
  const divEstadoClimatico = document.querySelector("#card-estado-climatico");

  h2Ciudad.textContent = "Cargando ciudad...";
  h2Region.textContent = "Obteniendo región...";
  h1CifraTempreatura.textContent = "--°";
  h3MinMax.textContent = "--° / --°";
  divEstadoClimatico.textContent = "Cargando clima...";

  // ⏳ 2. Aquí el código se pausa hasta que llegan los datos
  const indexRm = climaChileApp.listaLugares.findIndex(
    (ciudad) => ciudad.nombreCiudad === "Santiago",
  );
  const RM = await climaChileApp.cargarDetalleLugar(indexRm);
  const climaActual = traducirClima(
    RM.climaActual.clima,
    RM.climaActual.esDeDia,
  );

  // ✅ 3. Cuando llegan los datos, limpiamos y renderizamos
  h2Ciudad.textContent = ""; // limpiamos el "Cargando..."
  const iconoCiudad = document.createElement("i");
  iconoCiudad.className = "fa-solid fa-location-dot tc-primary";
  const nombreCiudad = document.createElement("span");
  nombreCiudad.textContent = RM.nombreCiudad;
  h2Ciudad.append(iconoCiudad, " ", nombreCiudad);

  h2Region.textContent = "";
  h2Region.append(document.createTextNode(RM.nombreRegion));

  h1CifraTempreatura.textContent = "";
  h1CifraTempreatura.append(
    document.createTextNode(`${RM.climaActual.tempActual}°`),
  );

  h3MinMax.textContent = "";
  const pronostico = RM.pronosticoSemanal;
  const cifrasMinMax = document.createTextNode(
    `${pronostico.tempMinimas[0]}° / ${pronostico.tempMaximas[0]}°`,
  );
  h3MinMax.append(cifrasMinMax);

  divEstadoClimatico.textContent = "";
  const iconoEstadoClimatico = document.createElement("i");
  iconoEstadoClimatico.className = `fa-solid ${climaActual.icono} display-1 tc-primary`;
  const textoEstadoClimatico = document.createElement("span");
  textoEstadoClimatico.className = "badge bgc-accent";
  textoEstadoClimatico.textContent = climaActual.titulo;
  divEstadoClimatico.append(iconoEstadoClimatico, textoEstadoClimatico);
}

renderizarHero();
