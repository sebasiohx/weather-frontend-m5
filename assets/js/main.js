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

/* Funciones */
// Función para traducir el codigo del clima a un icono y texto
function traducirClima(codigo, esDia) {
  let objetoClima = {};

  if (codigo === 0)
    return (objetoClima = esDia
      ? climas["despejado"]
      : climas["nocheDespejada"]);
  if ([1, 2].includes(codigo))
    return (objetoClima = esDia
      ? climas["nubladoParcial"]
      : climas["nocheDespejada"]);
  if (codigo === 3)
    return (objetoClima = esDia ? climas["nublado"] : climas["nocheNublada"]);
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(codigo))
    return (objetoClima = esDia ? climas["lluvia"] : climas["nocheLluvia"]);
  if (codigo === 77) return (objetoClima = climas["granizo"]);
  if ([71, 73, 75, 85, 86].includes(codigo))
    return (objetoClima = climas["nevada"]);
  if ([95, 96, 99].includes(codigo)) return (objetoClima = climas["tormenta"]);

  return objetoClima;
}

// Función para poner en mayuscula la primera letra de un texto
function capitalizarTexto(texto) {
  if (!texto) return "";
  return texto[0].toUpperCase() + texto.slice(1);
}

// Función para poner un cero "0" para las temperaturas que vienen con 1 dígito
function anteponerCero(num) {
  if (!num) return "";
  return String(num).padStart(2, "0");
}

// Función para mostrar el listado con el pronostico
function renderizarPronostico(pronostico) {
  let vistaClass = "";
  if (body.classList.contains("body--detail")) {
    vistaClass = "forecast__list-item--detail";
  } else {
    vistaClass = "forecast__list-item--home";
  }

  const listaElementosPronostico = pronostico.fechas.map((fecha, index) => {
    const fechaDiaActual = new Date(fecha);
    const numeroDia = fechaDiaActual.getDate(); // 29
    const dias = ["dom", "lun", "mar", "miér", "juev", "vier", "sáb"];
    const diaSemana = dias[fechaDiaActual.getDay()];

    const liItemPronostico = document.createElement("li");
    liItemPronostico.className = `forecast__list-item ${vistaClass} list-group-item`;

    const pFecha = document.createElement("p");
    pFecha.className = "forecast__day mb-0";
    pFecha.textContent = `${diaSemana} ${numeroDia}`;

    const divClimas = document.createElement("div");
    divClimas.className = "forecast__climates text-center";

    const iconoClimaDia = document.createElement("i");
    iconoClimaDia.className = `fa-solid ${traducirClima(pronostico.climas[index], true).icono} tc-primary`;
    iconoClimaDia.title = traducirClima(pronostico.climas[index], true).titulo;
    const spanEstadoClimatico = document.createElement("span");
    spanEstadoClimatico.className = "badge bgc-accent";
    spanEstadoClimatico.textContent = traducirClima(
      pronostico.climas[index],
      true,
    ).titulo;
    divClimas.append(iconoClimaDia, " ", spanEstadoClimatico);
    const pTemperaturas = document.createElement("p");
    pTemperaturas.className = "forecast__temperatures mb-0";
    const tempMin = pronostico.tempMinimas[index];
    const tempMax = pronostico.tempMaximas[index];
    pTemperaturas.textContent = `${anteponerCero(tempMin)}°/${anteponerCero(tempMax)}°`;

    liItemPronostico.append(pFecha, divClimas, pTemperaturas);

    return liItemPronostico;
  });

  return listaElementosPronostico;
}

// Funcionn para rendrizar la seccion Hero
async function renderizarHero() {
  // Antes del await
  const h2Ciudad = document.querySelector("#nombre-ciudad-hero");
  const h2Region = document.querySelector("#nombre-region-hero");
  const h1CifraTempreatura = document.querySelector("#cifra-temperatura-hero");
  const h3MinMax = document.querySelector("#min-max-temperatura-hero");
  const divEstadoClimatico = document.querySelector("#card-estado-climatico");
  const divColFecha = document.querySelector("#container-fecha-hero");
  const btnDetalleHero = document.querySelector("#btn-hero");
  const divCardPronostico = document.querySelector("#card-pronostico");

  h2Ciudad.textContent = "Cargando ciudad...";
  h2Region.textContent = "Obteniendo región...";
  h1CifraTempreatura.textContent = "--°";
  h3MinMax.textContent = "--° / --°";
  divEstadoClimatico.textContent = "Cargando clima...";
  divColFecha.textContent = "Cargando fecha...";
  btnDetalleHero.textContent = "Cargando...";
  btnDetalleHero.classList.add("disabled", "bg-secondary", "placeholder");
  divCardPronostico.textContent = "Cargando pronóstico...";
  divCardPronostico.classList.add("d-flex", "align-content-center");

  // Llegan los datos
  const indexRm = climaChileApp.listaLugares.findIndex(
    (ciudad) => ciudad.nombreCiudad === "Santiago",
  );
  const RM = await climaChileApp.cargarDetalleLugar(indexRm);
  const climaActual = traducirClima(
    RM.climaActual.clima,
    RM.climaActual.esDeDia,
  );
  const hoy = new Date(RM.climaActual.fecha);
  const fecha = hoy
    .toLocaleDateString("es-CL", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(",", " ");

  const hora = hoy.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // limpiamos y renderizamos
  h2Ciudad.textContent = "";
  const iconoCiudad = document.createElement("i");
  iconoCiudad.className = "fa-solid fa-location-dot tc-primary";
  const nombreCiudad = document.createElement("span");
  nombreCiudad.textContent = RM.nombreCiudad;
  h2Ciudad.append(iconoCiudad, " ", nombreCiudad);
  //===================================================
  h2Region.textContent = "";
  h2Region.append(document.createTextNode(RM.nombreRegion));
  //===================================================
  h1CifraTempreatura.textContent = "";
  const spanUnidadTemp = document.createElement("span");
  spanUnidadTemp.className = "hero-card__unit mt-1 mt-md-2";
  spanUnidadTemp.textContent = RM.unidadMedida;
  h1CifraTempreatura.append(
    `${anteponerCero(RM.climaActual.tempActual)}`,
    spanUnidadTemp,
  );
  //===================================================
  h3MinMax.textContent = "";
  const pronostico = RM.pronosticoSemanal;
  const tempMin = pronostico.tempMinimas[0];
  const tempMax = pronostico.tempMaximas[0];
  const cifrasMinMax = document.createTextNode(
    `${anteponerCero(tempMin)}° / ${anteponerCero(tempMax)}°`,
  );
  h3MinMax.append(cifrasMinMax);
  //===================================================
  divEstadoClimatico.textContent = "";
  const iconoEstadoClimatico = document.createElement("i");
  iconoEstadoClimatico.className = `fa-solid ${climaActual.icono} display-1 tc-primary`;
  const textoEstadoClimatico = document.createElement("span");
  textoEstadoClimatico.className = "badge bgc-accent";
  textoEstadoClimatico.textContent = climaActual.titulo;
  divEstadoClimatico.append(iconoEstadoClimatico, textoEstadoClimatico);
  //===================================================
  divColFecha.textContent = "";
  const h4Fecha = document.createElement("h4");
  h4Fecha.className = "hero-card__date";
  h4Fecha.textContent = `última actualización: ${fecha}, a las ${hora}hrs.*`;
  divColFecha.append(h4Fecha);
  //===================================================
  btnDetalleHero.dataset.id = RM.id;
  btnDetalleHero.classList.remove("disabled", "bg-secondary", "placeholder");
  btnDetalleHero.textContent = "Ver detalles";
  btnDetalleHero.addEventListener("click", () =>
    console.log(+btnDetalleHero.dataset.id),
  );
  //===================================================
  divCardPronostico.textContent = "";
  divCardPronostico.classList.remove("d-flex", "align-content-center");
  const ulListaPronostico = document.createElement("ul");
  ulListaPronostico.className = "list-group forecast";
  ulListaPronostico.append(...renderizarPronostico(RM.pronosticoSemanal));
  divCardPronostico.append(ulListaPronostico);
}

renderizarHero();
