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
const btnCelsius = document.querySelector("#btn-c");
const btnFarenheit = document.querySelector("#btn-f");

/* variables globales */
const climaChileApp = new ClimaService(regionesChile);

/* Funciones */
// Función para traducir el codigo del clima a un icono y texto

// Función para poner en mayuscula la primera letra de un texto
function capitalizarTexto(texto) {
  if (!texto) return "";
  return texto[0].toUpperCase() + texto.slice(1);
}

// Función para poner un cero "0" para las temperaturas que vienen con 1 dígito
function anteponerCero(num) {
  if (num === null || num === undefined) return "";
  if (num === 0) return "0";
  return String(num).padStart(2, "0");
}

// Funcion que devuelve un loading como elemento HTML
function mostrarLoading() {
  const divContainer = document.createElement("div");
  divContainer.className = "d-flex justify-content-center";
  const divSpinner = document.createElement("div");
  divSpinner.className = "spinner-border tc-primary border-5";
  divSpinner.role = "status";
  divSpinner.style.width = "4.5rem";
  divSpinner.style.height = "4.5rem";
  const spanLoading = document.createElement("span");
  spanLoading.className = "visually-hidden";
  spanLoading.textContent = "Cargando...";

  divSpinner.append(spanLoading);
  divContainer.append(divSpinner);

  return divContainer;
}

// Funcióm para mostrar un mensaje de alerta cuando no se carguen los datos
function mostrarAlertaErrorApi(elementoHtml) {
  //<div class="alert alert-danger" role="alert">
  const divAlerta = document.createElement("div");
  divAlerta.className = "alert alert-danger";
  divAlerta.setAttribute("role", "alert");
  // <i class="fa-solid fa-triangle-exclamation"></i>
  const iconoAlerta = document.createElement("i");
  iconoAlerta.className = "fa-solid fa-triangle-exclamation";
  // <a href="#" class="alert-link">
  const linkAlerta = document.createElement("a");
  linkAlerta.className = "alert-link";
  linkAlerta.href = "#";
  linkAlerta.textContent = "recargar la página";
  linkAlerta.onclick = () => location.reload();

  divAlerta.append(
    iconoAlerta,
    ` Error al cargar los datos, espere un momento o intenta `,
    linkAlerta,
    ".",
  );

  elementoHtml.append(divAlerta);
}

// Función para generar un "error" cuando pasa el tiempo más de "ms" milisegundos, sirve para comparar con otra promesa para ver cual termina primero
function timeoutPromesa(ms) {
  return new Promise((_, reject) => setTimeout(() => reject("timeout"), ms));
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
    const numeroDia = anteponerCero(fechaDiaActual.getDate());
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
    const clima = climaChileApp.traducirClima(pronostico.climas[index]);
    iconoClimaDia.className = `fa-solid ${clima.icono} tc-primary`;
    iconoClimaDia.title = clima.titulo;
    const spanEstadoClimatico = document.createElement("span");
    spanEstadoClimatico.className = "badge bgc-accent d-block d-lg-inline";
    spanEstadoClimatico.textContent = clima.titulo;
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
  const divAlerta = document.querySelector("#alerta-error");

  h2Ciudad.textContent = "Cargando ciudad...";
  h2Region.textContent = "Obteniendo región...";
  h1CifraTempreatura.textContent = "--°";
  h3MinMax.textContent = "--° / --°";
  divEstadoClimatico.append(mostrarLoading());
  divColFecha.textContent = "Cargando fecha...";
  btnDetalleHero.textContent = "Cargando...";
  btnDetalleHero.classList.add("disabled", "bg-secondary", "placeholder");
  divCardPronostico.append(mostrarLoading());
  divCardPronostico.classList.add("d-flex", "align-content-center");

  try {
    // Llegan los datos
    const indexRm = climaChileApp.listaLugares.findIndex(
      (ciudad) => ciudad.nombreCiudad === "Santiago",
    );

    const RM = await Promise.race([
      climaChileApp.cargarDetalleLugar(indexRm),
      timeoutPromesa(10000),
    ]);

    const climaActual = climaChileApp.traducirClima(
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
      mostrarDetalle(+btnDetalleHero.dataset.id),
    );
    //===================================================
    divCardPronostico.textContent = "";
    divCardPronostico.classList.remove("d-flex", "align-content-center");
    const ulListaPronostico = document.createElement("ul");
    ulListaPronostico.className = "list-group forecast";
    ulListaPronostico.append(...renderizarPronostico(RM.pronosticoSemanal));
    divCardPronostico.append(ulListaPronostico);
  } catch (error) {
    h2Ciudad.textContent = "⚠️ Error";
    h2Region.textContent = "";
    h1CifraTempreatura.textContent = "--°";
    h3MinMax.textContent = "";

    divEstadoClimatico.textContent = "";
    const iconoEstadoClimatico = document.createElement("i");
    iconoEstadoClimatico.className = `fa-solid fa-sun display-1 text-secondary`;
    const textoEstadoClimatico = document.createElement("span");
    textoEstadoClimatico.className = "badge text-bg-secondary";
    textoEstadoClimatico.textContent = "Error";
    divEstadoClimatico.append(iconoEstadoClimatico, textoEstadoClimatico);

    divColFecha.textContent = "";
    btnDetalleHero.textContent = "Error";
    divCardPronostico.textContent = "[Error al cargar pronóstico]";
    mostrarAlertaErrorApi(divAlerta);
  }
}

// Funcion para renderizar una card
function crearCard(lugar) {
  const clima = climaChileApp.traducirClima(
    lugar.climaActual.clima,
    lugar.climaActual.esDeDia,
  );

  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
  //=================================================
  const article = document.createElement("article");
  article.className = "card regions-card";
  article.dataset.id = lugar.id;
  //=================================================
  const figureCardImage = document.createElement("figure");
  figureCardImage.className = "regions-card_image-container";
  const img = document.createElement("img");
  img.src = `./assets/img/${lugar.img}`;
  img.className = "regions-card__image object-fit-cover";
  img.alt = lugar.nombreCiudad;
  const figcaption = document.createElement("figcaption");
  figcaption.className = "regions-card__caption";
  const spanRegion = document.createElement("span");
  spanRegion.className = "regions-card__region-title";
  spanRegion.textContent = lugar.nombreRegion;
  figcaption.append(spanRegion);
  figureCardImage.append(img, figcaption);
  //=================================================
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  //=================================================
  const h3 = document.createElement("h3");
  h3.className = "card-title h5";
  //=================================================
  const iconoUbicacion = document.createElement("i");
  iconoUbicacion.className = "fa-solid fa-location-dot tc-primary";
  //=================================================
  const nombreCiudad = document.createTextNode(`${lugar.nombreCiudad}`);

  h3.append(iconoUbicacion);
  h3.append(nombreCiudad);
  //=================================================
  const h2 = document.createElement("h2");
  h2.className =
    "regions-card__current-climate display-5 text-body-emphasis mb-2";
  //=================================================
  const spanTemperatura = document.createElement("span");
  spanTemperatura.className = "";
  spanTemperatura.textContent = `${anteponerCero(lugar.climaActual.tempActual)}`;
  const spanUnidadTemperatura = document.createElement("span");
  spanUnidadTemperatura.className = "regions-card__unit";
  spanUnidadTemperatura.textContent = lugar.unidadMedida;
  const divTempContainer = document.createElement("div");
  divTempContainer.className = "tc-accent d-flex";
  divTempContainer.append(spanTemperatura, spanUnidadTemperatura);
  //=================================================
  const iconoClima = document.createElement("i");
  iconoClima.className = `fa-solid ${clima.icono} display-6 tc-primary mt-3`;

  h2.append(divTempContainer, iconoClima);
  //=================================================
  const p = document.createElement("p");
  p.className = "regions-card__min-max ms-1 mb-0";
  //=================================================
  const spanRango = document.createElement("span");
  spanRango.textContent = `${anteponerCero(lugar.pronosticoSemanal.tempMinima)}°/${anteponerCero(lugar.pronosticoSemanal.tempMaxima)}°`;
  //=================================================
  const spanEstado = document.createElement("span");
  spanEstado.className = "badge bgc-accent";
  spanEstado.textContent = clima.titulo;

  p.append(spanRango);
  p.append(spanEstado);
  //=================================================
  // Ensamblar todo
  cardBody.append(h3);
  cardBody.append(h2);
  cardBody.append(p);

  article.append(figureCardImage);
  article.append(cardBody);

  col.append(article);

  return col;
}

// Funcion para renderizar todas las cards
async function rendeizarListaCards(listaLugares) {
  regionesContainer.append(mostrarLoading());

  const lugares = await listaLugares;
  regionesContainer.textContent = "";

  for (const lugar of lugares) {
    const card = crearCard(lugar);
    regionesContainer.append(card);
  }
}

// Función para buscar
async function buscarLugar() {
  const textoInput = inputBusqueda.value.trim().toLowerCase();

  // para reiniciar el listado o si no los datos se van acumulando
  regionesContainer.textContent = "";
  regionesContainer.append(mostrarLoading());

  const lista = await climaChileApp.cargarLugares();

  const listaFiltrada = lista.filter((lugar) => {
    return lugar.nombreCiudad.toLowerCase().includes(textoInput);
  });

  if (listaFiltrada.length === 0) {
    const mensajeSinResultado = document.createElement("h3");
    mensajeSinResultado.textContent = `No se encontraron resultados para "${inputBusqueda.value}"`;
    regionesContainer.append(mensajeSinResultado);
    return;
  }

  rendeizarListaCards(listaFiltrada);
}

// Función para renderizar la vista Detalle
async function renderizarDetalle(id) {
  const divAlerta = document.querySelector("#alerta-error");
  const divAlertaClimatica = document.querySelector("#alerta-climatica");

  // Limpiar todos los contenedores antes de renderizar
  document.querySelector("#datos-container-1").textContent = "";
  document.querySelector("#img-ciudad-detalle").textContent = "";
  document.querySelector("#datos-container-2").textContent = "";
  document.querySelector("#datos-container-3").textContent = "";
  document.querySelector("#datos-container-4").textContent = "";

  document.querySelector("#datos-container-1").append(mostrarLoading());
  document.querySelector("#img-ciudad-detalle").append(mostrarLoading());
  document.querySelector("#pronostico-detalle").textContent =
    "Cargando pronóstico...";
  divAlerta.textContent = "";
  divAlertaClimatica.textContent = "";
  divAlertaClimatica.classList.add("d-none");

  try {
    // cargo los datos y genero estadisticas
    const lugarData = await climaChileApp.cargarDetalleLugar(id);

    /* const lugarData = await Promise.race([
      climaChileApp.cargarDetalleLugar(id),
      timeoutPromesa(4000),
    ]); */

    const climaActual = climaChileApp.traducirClima(
      lugarData.climaActual.clima,
      lugarData.climaActual.esDeDia,
    );
    console.log("clima actual: ", climaActual);

    const pronostico = lugarData.pronosticoSemanal;

    const estadisticas = climaChileApp.calcularEstadisticas(
      lugarData.pronosticoSemanal,
    );

    console.log("Info estadisticas detalle", estadisticas);

    //===================================================
    const divDatosContainer1 = document.querySelector("#datos-container-1");
    divDatosContainer1.textContent = "";

    const h2CiudadDetalle = document.createElement("h2");
    h2CiudadDetalle.className = "fw-bolder mb-1";
    const iconoPuntero = document.createElement("i");
    iconoPuntero.className = "fa-solid fa-location-dot tc-primary";
    const nombreCiudad = lugarData.nombreCiudad;
    h2CiudadDetalle.append(iconoPuntero, nombreCiudad);

    const h5RegionDetalle = document.createElement("h5");
    h5RegionDetalle.className = "detail-view__region";
    const nombreRegion = lugarData.nombreRegion;
    h5RegionDetalle.append(nombreRegion);

    const pResumenDetalle = document.createElement("p");
    pResumenDetalle.className = "detail-view__description mb-4";
    pResumenDetalle.textContent = lugarData.descripcion;

    divDatosContainer1.append(
      h2CiudadDetalle,
      h5RegionDetalle,
      pResumenDetalle,
    );
    //===================================================
    const imgCiudadDetalle = document.querySelector("#img-ciudad-detalle");
    imgCiudadDetalle.textContent = "";

    const imgCiudad = document.createElement("img");
    imgCiudad.className = "detail-view__image object-fit-cover rounded";
    imgCiudad.src = `./assets/img/${lugarData.img}`;
    imgCiudad.alt = `Ciudad ${lugarData.nombreCiudad}`;
    imgCiudadDetalle.append(imgCiudad);
    //===================================================
    const divDatosContainer2 = document.querySelector("#datos-container-2");

    const pSubtituloTemperatura = document.createElement("p");
    pSubtituloTemperatura.className = "detail-view__subtitle mb-2";
    pSubtituloTemperatura.textContent = "Temperatura actual";

    const h3TemperaturaActualDetalle = document.createElement("h3");
    h3TemperaturaActualDetalle.className =
      "display-3 fw-bold lh-1 mb-2 d-flex justify-content-between align-items-baseline";
    const spanTemperatura = document.createElement("span");
    spanTemperatura.className = "";
    spanTemperatura.textContent = `${anteponerCero(lugarData.climaActual.tempActual)}`;
    const spanUnidadTemperatura = document.createElement("span");
    spanUnidadTemperatura.className = "regions-card__unit";
    spanUnidadTemperatura.textContent = lugarData.unidadMedida;
    const divTempContainer = document.createElement("div");
    divTempContainer.className = "tc-primary d-flex";
    divTempContainer.append(spanTemperatura, spanUnidadTemperatura);
    const iconoEstadoClimaActual = document.createElement("i");
    iconoEstadoClimaActual.className = `fa-solid ${climaActual.icono} display-5 mt-3`;
    h3TemperaturaActualDetalle.append(divTempContainer, iconoEstadoClimaActual);

    const divMinMaxEstadoDetalle = document.createElement("div");
    divMinMaxEstadoDetalle.className =
      "ms-1 mb-0 d-flex align-items-baseline justify-content-between";
    const pMinMAx = document.createElement("p");
    const iconoFlechaMenor = document.createElement("i");
    iconoFlechaMenor.className = "fa-solid fa-arrow-down";
    const iconoFlechaMayor = document.createElement("i");
    iconoFlechaMayor.className = "fa-solid fa-arrow-up";
    const tempMin = pronostico.tempMinimas[0];
    const tempMax = pronostico.tempMaximas[0];
    pMinMAx.append(
      iconoFlechaMenor,
      `${anteponerCero(tempMin)}°`,
      " / ",
      iconoFlechaMayor,
      `${anteponerCero(tempMax)}°`,
    );
    const pEstadoClimaActual = document.createElement("p");
    const spanEstadoClimaActual = document.createElement("span");
    spanEstadoClimaActual.className = "badge bgc-primary tc-accent";
    spanEstadoClimaActual.textContent = climaActual.titulo;
    pEstadoClimaActual.append(spanEstadoClimaActual);
    divMinMaxEstadoDetalle.append(pMinMAx, pEstadoClimaActual);

    divDatosContainer2.append(
      pSubtituloTemperatura,
      h3TemperaturaActualDetalle,
      divMinMaxEstadoDetalle,
    );
    //===================================================
    const divDatosContainer3 = document.querySelector("#datos-container-3");

    const divVientoDetalle = document.createElement("div");
    const h5VientoDetalle = document.createElement("h5");
    const iconoViento = document.createElement("i");
    iconoViento.className = "fa-solid fa-wind";
    h5VientoDetalle.append(iconoViento, " Viento");
    const pVelocidadViento = document.createElement("p");
    pVelocidadViento.textContent = `${lugarData.climaActual.viento} km/h`;
    divVientoDetalle.append(h5VientoDetalle, pVelocidadViento);

    const divHumedadDetalle = document.createElement("div");
    const h5HumedadDetalle = document.createElement("h5");
    const iconoHumedad = document.createElement("i");
    iconoHumedad.className = "fa-solid fa-water";
    h5HumedadDetalle.append(iconoHumedad, " Humedad");
    const pPorcentajeHumedad = document.createElement("p");
    pPorcentajeHumedad.textContent = `${lugarData.climaActual.humedad}%`;
    divHumedadDetalle.append(h5HumedadDetalle, pPorcentajeHumedad);

    divDatosContainer3.append(divVientoDetalle, divHumedadDetalle);
    //===================================================
    const divDatosContainer4 = document.querySelector("#datos-container-4");

    const h5SubtituloResumenSemana = document.createElement("h5");
    h5SubtituloResumenSemana.className = "detail-view__subtitle";
    h5SubtituloResumenSemana.textContent = "Resumen del clima semanal";

    const pResumenCLimaDetalle = document.createElement("p");
    const elementoIcono = document.createElement("i");
    const { climaMasRepetido } = estadisticas;
    const dataClimaMasRepetido = climaChileApp.traducirClima(
      climaMasRepetido.codigoClima,
    );

    elementoIcono.className = `fa-solid ${dataClimaMasRepetido.icono} tc-primary`;
    pResumenCLimaDetalle.append(
      estadisticas.fraseResumenClima,
      " ",
      elementoIcono,
    );

    const h4SubtituloEstadisticas = document.createElement("h4");
    h4SubtituloEstadisticas.className = "detail-view__subtitle";
    h4SubtituloEstadisticas.textContent = "Estadísticas de la semana";

    const ulEstaditicasDetalle = document.createElement("ul");
    ulEstaditicasDetalle.className = "list-group list-group-horizontal mb-3";
    // menorTempMin / mayorTempMax / tempPromedio
    const { menorTempMin, mayorTempMax, tempPromedio } = estadisticas;
    const temperaturasEstadisticas = [
      { etiqueta: "Temp. mínima", valor: menorTempMin },
      { etiqueta: "Temp. máxima", valor: mayorTempMax },
      { etiqueta: "Temp. promedio", valor: tempPromedio },
    ];
    temperaturasEstadisticas.forEach(({ etiqueta, valor }) => {
      let br = document.createElement("br");
      const li = document.createElement("li");
      li.className = "list-group-item detail-view__list-item";
      li.append(`${etiqueta}:`, br, `${anteponerCero(valor)}°`);
      ulEstaditicasDetalle.append(li);
    });

    const h4SubtituloCantidadDias = document.createElement("h4");
    h4SubtituloCantidadDias.className = "detail-view__subtitle";
    h4SubtituloCantidadDias.textContent = "Cantidad de días por tipo de clima";

    const ulDiasPorClima = document.createElement("ul");
    ulDiasPorClima.className = "list-group list-group-horizontal mb-4";

    estadisticas.diasPorClima.forEach(({ cantidadDias, codigoClima }) => {
      const clima = climaChileApp.traducirClima(codigoClima);
      console.log("clima: ", clima);

      const li = document.createElement("li");
      li.className = "list-group-item detail-view__list-item";
      const p = document.createElement("p");
      p.className = "mb-1";
      const i = document.createElement("i");
      i.className = `fa-solid ${clima.icono} tc-primary`;
      p.append(capitalizarTexto(clima.titulo), " ", i);
      const span = document.createElement("span");
      span.textContent = `${cantidadDias} ${cantidadDias === 1 ? "día" : "días"}`;
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
    const iconoAlerta = document.createElement("i");
    iconoAlerta.className = "fa-solid fa-triangle-exclamation";
    if (estadisticas.fraseAlerta !== "") {
      divAlertaClimatica.classList.remove("d-none");
      divAlertaClimatica.append(iconoAlerta, " ", estadisticas.fraseAlerta);
    }
    //===================================================
    const ulPronosticoDetalle = document.querySelector("#pronostico-detalle");
    ulPronosticoDetalle.textContent = "";
    ulPronosticoDetalle.append(...renderizarPronostico(pronostico));
  } catch (error) {
    document.querySelector("#datos-container-1").textContent = "";
    document.querySelector("#img-ciudad-detalle").textContent = "";
    const tituloNoData = document.createElement("h2");
    tituloNoData.textContent = "Error al cargar los datos";
    document.querySelector("#datos-container-1").append(tituloNoData);
    const ulPronosticoDetalle = document.querySelector("#pronostico-detalle");
    ulPronosticoDetalle.textContent = "[Error al cargar pronóstico]";
    mostrarAlertaErrorApi(divAlerta);
  }
}

// Funcion para mostrar el detalle en base a un id
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

// Funcion para mostrar la vista Home
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

/* Eventos */
// evento buscador
formularioBusqueda.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!inputBusqueda.value) {
    console.error("Ingrese una ciudad válida");
    inputBusqueda.classList.add("is-invalid");
    return;
  } else {
    inputBusqueda.classList.remove("is-invalid");
  }

  mostrarHome();

  vistaHome.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  buscarLugar();
});

// evento para que al dejar el input vacio se vuelvan a renderizar todas las cards
inputBusqueda.addEventListener("input", (e) => {
  if (!inputBusqueda.value) {
    regionesContainer.textContent = "";
    rendeizarListaCards(climaChileApp.cargarLugares());
  }
});

// evento click en alguna card
regionesContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".regions-card");
  // guardian
  if (!card) return;
  const idCiudad = +card.dataset.id;
  mostrarDetalle(idCiudad);
});

// evento para volver al Home
botonesHome.forEach((btn) => {
  btn.addEventListener("click", mostrarHome);
});

/* Ejecución */
renderizarHero();
rendeizarListaCards(climaChileApp.cargarLugares());
