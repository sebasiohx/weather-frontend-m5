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
const diasSemana = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];
const hoy = new Date();
// para detectar que dia de la semana es hoy
const nombreDiaHoy = diasSemana[hoy.getDay()];

/* Funciones */
/**
 * Función para poner en mayuscula la primera letra de un texto
 * @param {string} texto
 */
function capitalizarTexto(texto) {
  if (!texto) return "";
  return texto[0].toUpperCase() + texto.slice(1);
}

/**
 * Función para imprimir la fecha con un formato legible
 * @param {Date} fecha
 */
function imprimirFecha(fecha) {
  const fechaLiteral = fecha
    .toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(",", "");

  return capitalizarTexto(fechaLiteral);
}

/**
 * Función para renderizar el pronostico con elementos de lista
 * @param {Object} region
 */
function renderizarPronostico(region) {
  // para buscar el indice del elemento donde el nombre de los dias coincida
  const indiceDiaHoyRegion = region.pronosticoSemanal.findIndex(
    (dia) => dia.nombreDia === nombreDiaHoy,
  );

  const pronosticoRotado = [
    ...region.pronosticoSemanal.slice(indiceDiaHoyRegion + 1),
    ...region.pronosticoSemanal.slice(0, indiceDiaHoyRegion + 1),
  ];

  let vistaClass = "";
  if (body.classList.contains("body--detail")) {
    vistaClass = "forecast__list-item--detail";
  } else {
    vistaClass = "forecast__list-item--home";
  }

  const listaElementosPronostico = pronosticoRotado.map((dia, index) => {
    const fechaParaEsteDia = new Date();
    // Uso +1 porque tu pronosticoRotado empieza desde "mañana"
    fechaParaEsteDia.setDate(hoy.getDate() + (index + 1));
    const diaCalculado = fechaParaEsteDia.getDate();

    const liItemPronostico = document.createElement("li");
    liItemPronostico.className = `forecast__list-item ${vistaClass} list-group-item`;

    const pFecha = document.createElement("p");
    pFecha.className = "forecast__day mb-0";
    pFecha.textContent = `${dia.siglas} ${diaCalculado}`;

    const divClimas = document.createElement("div");
    divClimas.className = "forecast__climates";

    const iconoClimaDia = document.createElement("i");
    iconoClimaDia.className = `fa-solid ${dia.climaDia.icono} tc-primary`;
    iconoClimaDia.title = dia.climaDia.texto;
    const iconoClimaNoche = document.createElement("i");
    iconoClimaNoche.className = `fa-solid ${dia.climaNoche.icono} tc-primary`;
    iconoClimaNoche.title = dia.climaNoche.texto;
    divClimas.append(iconoClimaDia, " / ", iconoClimaNoche);

    const pTemperaturas = document.createElement("p");
    pTemperaturas.className = "forecast__temperatures mb-0";
    pTemperaturas.textContent = `${dia.tempMin}°/${dia.tempMax}°`;

    liItemPronostico.append(pFecha, divClimas, pTemperaturas);

    return liItemPronostico;
  });

  return listaElementosPronostico;
}

/**
 * Funcion para renderizar la seccion Hero
 */
function renderizarHero() {
  const rm = regionesChile.find((ciudad) => ciudad.nombreCiudad === "Santiago");

  const h2Ciudad = document.querySelector("#nombre-ciudad-hero");
  const iconoCiudad = document.createElement("i");
  iconoCiudad.className = "fa-solid fa-location-dot tc-primary";
  const nombreCiudad = document.createElement("span");
  nombreCiudad.textContent = rm.nombreCiudad;
  h2Ciudad.append(iconoCiudad, " ", nombreCiudad);

  const h2Region = document.querySelector("#nombre-region-hero");
  const nombreRegion = document.createTextNode(rm.nombreRegion);
  h2Region.append(nombreRegion);

  const h1CifraTempreatura = document.querySelector("#cifra-temperatura-hero");
  const cifraTemperaturaActual = document.createTextNode(`${rm.tempActual}°`);
  h1CifraTempreatura.append(cifraTemperaturaActual);

  const h3MinMax = document.querySelector("#min-max-temperatura-hero");
  const cifrasMinMax = document.createTextNode(
    `${rm.tempMinima}° / ${rm.tempMaxima}°`,
  );
  h3MinMax.append(cifrasMinMax);

  const divEstadoClimatico = document.querySelector("#card-estado-climatico");
  const iconoEstadoClimatico = document.createElement("i");
  iconoEstadoClimatico.className = `fa-solid ${rm.estadoClimaticoActual.icono} display-1 tc-primary`;
  const textoEstadoClimatico = document.createElement("span");
  textoEstadoClimatico.className = "badge bgc-accent";
  textoEstadoClimatico.textContent = rm.estadoClimaticoActual.texto;
  divEstadoClimatico.append(iconoEstadoClimatico, textoEstadoClimatico);

  const divColFecha = document.querySelector("#container-fecha-hero");
  const h4Fecha = document.createElement("h4");
  h4Fecha.className = "hero-card__date";
  h4Fecha.textContent = `${imprimirFecha(hoy)}*`;
  const btnDetalleHero = document.createElement("button");
  btnDetalleHero.type = "button";
  btnDetalleHero.id = "btn-hero";
  btnDetalleHero.className = "btn hero-card__btn-action btn-lg";
  btnDetalleHero.dataset.id = rm.id;
  btnDetalleHero.textContent = "Ver detalles";
  divColFecha.append(h4Fecha, btnDetalleHero);

  btnDetalleHero.addEventListener("click", () =>
    mostrarDetalle(+btnDetalleHero.dataset.id),
  );

  const divCardPronostico = document.querySelector("#card-pronostico");
  const ulListaPronostico = document.createElement("ul");
  ulListaPronostico.className = "list-group forecast";
  ulListaPronostico.append(...renderizarPronostico(rm));
  divCardPronostico.append(ulListaPronostico);
}

/**
 * Funcion para crear una card
 * @param {Object} ciudad
 */
function crearCard(ciudad) {
  // <div class="col-12 col-sm-6 col-md-4 col-lg-3">
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

  // <article class="card regions-card" data-id="0">
  const article = document.createElement("article");
  article.className = "card regions-card";
  article.dataset.id = ciudad.id;

  // <img src="..." class="..." alt="...">
  const img = document.createElement("img");
  img.src = `./assets/img/${ciudad.img}`;
  img.className = "regions-card__image object-fit-cover";
  img.alt = ciudad.nombreCiudad;

  // <div class="card-body">
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // <h3 class="card-title h5">
  const h3 = document.createElement("h3");
  h3.className = "card-title h5";

  // <i class="fa-solid fa-location-dot tc-primary">
  const iconoUbicacion = document.createElement("i");
  iconoUbicacion.className = "fa-solid fa-location-dot tc-primary";

  // Texto del nombre de la ciudad
  const nombreCiudad = document.createTextNode(` ${ciudad.nombreCiudad}`);

  h3.append(iconoUbicacion);
  h3.append(nombreCiudad);

  // <h2 class="display-5 fw-bold ...">
  const h2 = document.createElement("h2");
  h2.className =
    "regions-card__current-climate display-5 text-body-emphasis mb-2";

  // <span class="tc-accent">27°</span>
  const spanTemperatura = document.createElement("span");
  spanTemperatura.className = "tc-accent";
  spanTemperatura.textContent = `${ciudad.tempActual}°`;

  // <i class="fa-solid fa-sun display-6 tc-primary mt-3">
  const iconoClima = document.createElement("i");
  iconoClima.className = `fa-solid ${ciudad.estadoClimaticoActual.icono} display-6 tc-primary mt-3`;

  h2.append(spanTemperatura);
  h2.append(iconoClima);

  // <p class="ms-1 mb-0 ...">
  const p = document.createElement("p");
  p.className = "regions-card__min-max ms-1 mb-0";

  // <span>16°/32°</span>
  const spanRango = document.createElement("span");
  spanRango.textContent = `${ciudad.tempMinima}°/${ciudad.tempMaxima}°`;

  // <span class="badge bgc-accent">soleado</span>
  const spanEstado = document.createElement("span");
  spanEstado.className = "badge bgc-accent";
  spanEstado.textContent = ciudad.estadoClimaticoActual.texto;

  p.append(spanRango);
  p.append(spanEstado);

  // Ensamblar todo
  cardBody.append(h3);
  cardBody.append(h2);
  cardBody.append(p);

  article.append(img);
  article.append(cardBody);

  col.append(article);

  return col;
}

/**
 * Funcion para renderizar el listado de cards
 * @param {Array} ciudades
 */
function renderizarCards(ciudades) {
  for (const ciudad of ciudades) {
    const card = crearCard(ciudad);
    regionesContainer.append(card);
  }
}

/**
 * Funcion para buscar la ciudad y renderizar las cards correspondientes
 */
function buscarCiudad() {
  const textoInput = inputBusqueda.value.trim().toLowerCase();

  const listaFiltrada = regionesChile.filter((region) =>
    region.nombreCiudad.toLowerCase().includes(textoInput),
  );

  regionesContainer.textContent = ""; // para resetear el listado

  if (listaFiltrada.length === 0) {
    const mensajeSinResultado = document.createElement("h3");
    mensajeSinResultado.textContent = `No se encontraron resultados para "${inputBusqueda.value}"`;
    regionesContainer.append(mensajeSinResultado);
    return;
  }

  renderizarCards(listaFiltrada);
}

/**
 * Función para renderizar la seccion Detalle con la info de cada ciudad
 * @param {Number} id
 */
function renderizarDetalle(id) {
  const regionData = regionesChile.find((region) => region.id === id);
  const { pronosticoSemanal } = regionData;

  if (!regionData) {
    const tituloNoData = document.createElement("h2");
    tituloNoData.textContent = "No se encontró la ciudad";
    detalleContainer.append(tituloNoData);
    return;
  }

  const listaTempMin = pronosticoSemanal.map((dia) => dia.tempMin);
  const listaTempMax = pronosticoSemanal.map((dia) => dia.tempMax);
  const listaMinMax = [...listaTempMin, ...listaTempMax];
  const menorTempMin = Math.min(...listaTempMin);
  const mayorTempMax = Math.max(...listaTempMax);
  const sumaTemperaturas = listaMinMax.reduce(
    (acumulador, numActual) => acumulador + numActual,
    0,
  );
  const calcularPromedio = (sumaTotal, cantidadElementos) =>
    sumaTotal / cantidadElementos;

  const promedioTemp = Math.floor(
    calcularPromedio(sumaTemperaturas, listaMinMax.length),
  );

  const conteoTemporalClima = pronosticoSemanal.reduce((acumulador, dia) => {
    const iconoClima = dia.climaDia.icono;
    const nombreClima = dia.climaDia.texto;

    if (!acumulador[nombreClima]) {
      acumulador[nombreClima] = {
        clima: nombreClima,
        icono: iconoClima,
        cantDias: 0,
      };
    }
    acumulador[nombreClima].cantDias += 1;

    return acumulador;
  }, {});

  const diasPorClimas = Object.values(conteoTemporalClima);

  const climaMasRepetido = diasPorClimas.reduce(
    (max, climaActual) => {
      return climaActual.cantDias > max.cantDias ? climaActual : max;
    },
    { clima: null, icono: null, cantDias: 0 },
  );

  const sumaTempMax = listaTempMax.reduce((acc, num) => acc + num, 0);
  const promedioTempMax = Math.ceil(
    calcularPromedio(sumaTempMax, listaTempMax.length),
  );

  const crearFraseResumen = (climaPromedio, climaRepetido) => {
    const nivelesTemperatura = {
      muyFria: { max: 8, texto: "muy fría" },
      fria: { max: 17, texto: "fría" },
      templada: { max: 24, texto: "templada" },
      calurosa: { max: 50, texto: "calurosa" },
    };

    // destructuring del elemento 'texto' que devuelve el objeto nivelesTemperatura transformado en array
    const { texto: nivelClima } = Object.values(nivelesTemperatura).find(
      ({ max }) => climaPromedio <= max,
    );

    // Objeto lookup
    const textosClima = {
      soleado: "soleada",
      nublado: "nublada",
      lluvioso: "lluviosa",
      granizo: "con granizo",
      tormenta: "con tormentas",
    };

    const { clima, icono: iconoClase } = climaRepetido;
    const textoClima = textosClima[clima] ?? "variable";

    const elementoIcono = document.createElement("i");
    elementoIcono.className = `fa-solid ${iconoClase} tc-primary`;

    return [`Semana ${nivelClima} mayormente ${textoClima} `, elementoIcono];
  };

  // Limpiar todos los contenedores antes de renderizar
  document.querySelector("#datos-container-1").textContent = "";
  document.querySelector("#img-ciudad-detalle").textContent = "";
  document.querySelector("#datos-container-2").textContent = "";
  document.querySelector("#datos-container-3").textContent = "";
  document.querySelector("#datos-container-4").textContent = "";
  document.querySelector("#pronostico-detalle").textContent = "";

  //==============================================
  const divDatosContainer1 = document.querySelector("#datos-container-1");

  const h2CiudadDetalle = document.createElement("h2");
  h2CiudadDetalle.className = "fw-bolder mb-1";
  const iconoPuntero = document.createElement("i");
  iconoPuntero.className = "fa-solid fa-location-dot tc-primary";
  const nombreCiudad = regionData.nombreCiudad;
  h2CiudadDetalle.append(iconoPuntero, nombreCiudad);

  const h5RegionDetalle = document.createElement("h5");
  h5RegionDetalle.className = "detail-view__region";
  const nombreRegion = regionData.nombreRegion;
  h5RegionDetalle.append(nombreRegion);

  const pResumenDetalle = document.createElement("p");
  pResumenDetalle.className = "detail-view__description mb-4";
  pResumenDetalle.textContent = regionData.descripcion;

  divDatosContainer1.append(h2CiudadDetalle, h5RegionDetalle, pResumenDetalle);

  //==============================================
  const imgCiudadDetalle = document.querySelector("#img-ciudad-detalle");

  const imgCiudad = document.createElement("img");
  imgCiudad.className = "detail-view__image object-fit-cover rounded";
  imgCiudad.src = `./assets/img/${regionData.img}`;
  imgCiudad.alt = `Ciudad ${regionData.nombreCiudad}`;
  imgCiudadDetalle.append(imgCiudad);

  //==============================================
  const divDatosContainer2 = document.querySelector("#datos-container-2");

  const pSubtituloTemperatura = document.createElement("p");
  pSubtituloTemperatura.className = "detail-view__subtitle mb-2";
  pSubtituloTemperatura.textContent = "Temperatura actual";

  const h3TemperaturaActualDetalle = document.createElement("h3");
  h3TemperaturaActualDetalle.className =
    "display-3 fw-bold lh-1 mb-2 d-flex justify-content-between align-items-baseline";
  const spanTemperaturaActual = document.createElement("span");
  spanTemperaturaActual.className = "tc-primary";
  spanTemperaturaActual.textContent = `${regionData.tempActual}°`;
  const iconoEstadoClimaActual = document.createElement("i");
  iconoEstadoClimaActual.className = `fa-solid ${regionData.estadoClimaticoActual.icono} display-5 mt-3`;
  h3TemperaturaActualDetalle.append(
    spanTemperaturaActual,
    iconoEstadoClimaActual,
  );

  const divMinMaxEstadoDetalle = document.createElement("div");
  divMinMaxEstadoDetalle.className =
    "ms-1 mb-0 d-flex align-items-baseline justify-content-between";
  const pMinMAx = document.createElement("p");
  const iconoFlechaMenor = document.createElement("i");
  iconoFlechaMenor.className = "fa-solid fa-arrow-down";
  const iconoFlechaMayor = document.createElement("i");
  iconoFlechaMayor.className = "fa-solid fa-arrow-up";
  pMinMAx.append(
    iconoFlechaMenor,
    `${regionData.tempMinima}°`,
    " / ",
    iconoFlechaMayor,
    `${regionData.tempMaxima}°`,
  );
  const pEstadoClimaActual = document.createElement("p");
  const spanEstadoClimaActual = document.createElement("span");
  spanEstadoClimaActual.className = "badge bgc-primary tc-accent";
  spanEstadoClimaActual.textContent = regionData.estadoClimaticoActual.texto;
  pEstadoClimaActual.append(spanEstadoClimaActual);
  divMinMaxEstadoDetalle.append(pMinMAx, pEstadoClimaActual);

  divDatosContainer2.append(
    pSubtituloTemperatura,
    h3TemperaturaActualDetalle,
    divMinMaxEstadoDetalle,
  );

  //==============================================
  const divDatosContainer3 = document.querySelector("#datos-container-3");

  const divVientoDetalle = document.createElement("div");
  const h5VientoDetalle = document.createElement("h5");
  const iconoViento = document.createElement("i");
  iconoViento.className = "fa-solid fa-wind";
  h5VientoDetalle.append(iconoViento, " Viento");
  const pVelocidadViento = document.createElement("p");
  pVelocidadViento.textContent = `${regionData.viento} km/h`;
  divVientoDetalle.append(h5VientoDetalle, pVelocidadViento);

  const divHumedadDetalle = document.createElement("div");
  const h5HumedadDetalle = document.createElement("h5");
  const iconoHumedad = document.createElement("i");
  iconoHumedad.className = "fa-solid fa-water";
  h5HumedadDetalle.append(iconoHumedad, " Humedad");
  const pPorcentajeHumedad = document.createElement("p");
  pPorcentajeHumedad.textContent = `${regionData.humedad}%`;
  divHumedadDetalle.append(h5HumedadDetalle, pPorcentajeHumedad);

  divDatosContainer3.append(divVientoDetalle, divHumedadDetalle);

  //==============================================
  const divDatosContainer4 = document.querySelector("#datos-container-4");

  const h5SubtituloResumenSemana = document.createElement("h5");
  h5SubtituloResumenSemana.className = "detail-view__subtitle";
  h5SubtituloResumenSemana.textContent = "Resumen del clima semanal";

  const pResumenCLimaDetalle = document.createElement("p");
  pResumenCLimaDetalle.append(
    ...crearFraseResumen(promedioTempMax, climaMasRepetido),
  );

  const h4SubtituloEstadisticas = document.createElement("h4");
  h4SubtituloEstadisticas.className = "detail-view__subtitle";
  h4SubtituloEstadisticas.textContent = "Estadísticas de la semana";

  const ulEstaditicasDetalle = document.createElement("ul");
  ulEstaditicasDetalle.className = "list-group list-group-horizontal mb-3";
  // menorTempMin / mayorTempMax / promedioTemp
  const temperaturasEstadisticas = [
    { etiqueta: "Temp. mínima", valor: menorTempMin },
    { etiqueta: "Temp. máxima", valor: mayorTempMax },
    { etiqueta: "Temp. promedio", valor: promedioTemp },
  ];
  temperaturasEstadisticas.forEach(({ etiqueta, valor }) => {
    let br = document.createElement("br");
    const li = document.createElement("li");
    li.className = "list-group-item detail-view__list-item";
    li.append(`${etiqueta}:`, br, `${valor}°`);
    ulEstaditicasDetalle.append(li);
  });

  const h4SubtituloCantidadDias = document.createElement("h4");
  h4SubtituloCantidadDias.className = "detail-view__subtitle";
  h4SubtituloCantidadDias.textContent = "Cantidad de días por tipo de clima";

  const ulDiasPorClima = document.createElement("ul");
  ulDiasPorClima.className = "list-group list-group-horizontal mb-4";
  /* const diasPorClimas = [
    { clima: "soleado", icono: "fa-sun", cantDias: 3 },
    { clima: "nublado", icono: "fa-sun", cantDias: 2 },
    { clima: "lluvioso", icono: "fa-sun", cantDias: 1 },
  ]; */
  diasPorClimas.forEach(({ clima, icono, cantDias }) => {
    const li = document.createElement("li");
    li.className = "list-group-item detail-view__list-item";
    const p = document.createElement("p");
    p.className = "mb-1";
    const i = document.createElement("i");
    i.className = `fa-solid ${icono} tc-primary`;
    p.append(capitalizarTexto(clima), " ", i);
    const span = document.createElement("span");
    span.textContent = `${cantDias} días`;
    li.append(p, span);
    ulDiasPorClima.append(li);
  });

  divDatosContainer4.append(
    h5SubtituloResumenSemana,
    pResumenCLimaDetalle,
    h4SubtituloEstadisticas,
    ulEstaditicasDetalle,
    h4SubtituloCantidadDias,
    ulDiasPorClima,
  );

  //==============================================
  const ulPronosticoDetalle = document.querySelector("#pronostico-detalle");
  ulPronosticoDetalle.append(...renderizarPronostico(regionData));
}

/**
 * Función para cambiar la vista a Detalle
 * @param {Number} id
 */
function mostrarDetalle(id) {
  renderizarDetalle(id);
  let forecastListItem = document.querySelectorAll(".forecast__list-item");

  heroSection.classList.add("d-none");
  vistaHome.classList.add("d-none");
  vistaDetalle.classList.remove("d-none");
  body.classList.replace("body--home", "body--detail");
  forecastListItem.forEach((item) =>
    item.classList.replace(
      "forecast__list-item--home",
      "forecast__list-item--detail",
    ),
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/**
 * Función para cambiar la vista a Home
 */
function mostrarHome() {
  let forecastListItem = document.querySelectorAll(".forecast__list-item");

  heroSection.classList.remove("d-none");
  vistaHome.classList.remove("d-none");
  vistaDetalle.classList.add("d-none");
  body.classList.replace("body--detail", "body--home");
  forecastListItem.forEach((item) =>
    item.classList.replace(
      "forecast__list-item--detail",
      "forecast__list-item--home",
    ),
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// evento buscador
formularioBusqueda.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!inputBusqueda.value) {
    console.error("Ingrese una ciudad válida");
    inputBusqueda.classList.add("nav-weather__input--error");
    return;
  } else {
    inputBusqueda.classList.remove("nav-weather__input--error");
  }

  mostrarHome();

  vistaHome.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  buscarCiudad();
});

// evento para que al dejar el input vacio se vuelvan a renderizar todas las cards
inputBusqueda.addEventListener("input", (e) => {
  if (!inputBusqueda.value) {
    regionesContainer.textContent = "";
    renderizarCards(regionesChile);
  }
});

regionesContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".regions-card");
  // guardian
  if (!card) return;
  const idRegion = +card.dataset.id;
  mostrarDetalle(idRegion);
});

// evento para volver al Home
botonesHome.forEach((btn) => {
  btn.addEventListener("click", mostrarHome);
});

renderizarHero();
renderizarCards(regionesChile);
