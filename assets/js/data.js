/* ============================================================
   MeteoChile — Pseudo datos regiones de Chile
   Criterio climático aplicado:
   · Norte (zonas 0-3): desértico, soleado, temperaturas altas
   · Centro (zonas 4-7): mediterráneo, templado, mix sol/nubes
   · Sur (zonas 8-15): lluvioso, frío, predominio nublado/lluvia
   ============================================================ */

/* lista climas */
const climas = {
  despejado: { titulo: "despejado", icono: "fa-sun" },
  nubladoParcial: { titulo: "nub. parcial", icono: "fa-cloud-sun" },
  nublado: { titulo: "nublado", icono: "fa-cloud" },
  lluvia: { titulo: "lluvias", icono: "fa-cloud-rain" },
  granizo: { titulo: "granizo", icono: "fa-cloud-meatball" },
  nevada: { titulo: "nevada", icono: "fa-snowflake" },
  tormenta: { titulo: "tormenta", icono: "fa-cloud-bolt" },
  nocheDespejada: { titulo: "noche despejada", icono: "fa-moon" },
  nocheNublada: { titulo: "noche nublada", icono: "fa-cloud-moon" },
  nocheLluvia: { titulo: "noche lluviosa", icono: "fa-cloud-moon-rain" },
};

/* ── 00 ── Región de Arica y Parinacota */
/* ── 01 ── Región de Tarapacá */
/* ── 02 ── Región de Antofagasta */
/* ── 03 ── Región de Atacama */
/* ── 04 ── Región de Coquimbo */
/* ── 05 ── Región de Valparaíso */
/* ── 06 ── Región Metropolitana de Santiago */
/* ── 07 ── Región del Libertador General Bernardo O'Higgins */
/* ── 08 ── Región del Maule */
/* ── 09 ── Región de Ñuble */
/* ── 10 ── Región del Biobío */
/* ── 11 ── Región de La Araucanía */
/* ── 12 ── Región de Los Ríos */
/* ── 13 ── Región de Los Lagos */
/* ── 14 ── Región de Aysén del General Carlos Ibáñez del Campo */
/* ── 15 ── Región de Magallanes y de la Antártica Chilena */

const regionesChile = [
  /* ── 0 ── Región de Arica y Parinacota */
  {
    id: 0,
    nombreRegion: "Región de Arica y Parinacota",
    nombreCiudad: "Arica",
    img: "arica.jpg",
    descripcion:
      "Arica es conocida como 'La Ciudad de la Eterna Primavera' gracias a su clima cálido y soleado durante todo el año. Ubicada en el extremo norte de Chile, limita con Perú y Bolivia, lo que le otorga una rica mezcla cultural. Su costa ofrece playas ideales y es un importante punto de comercio fronterizo.",
  },

  /* ── 1 ── Región de Tarapacá */
  {
    id: 1,
    nombreRegion: "Región de Tarapacá",
    nombreCiudad: "Iquique",
    img: "iquique.jpg",
    descripcion:
      "Iquique es una ciudad costera del norte de Chile famosa por su zona franca ZOFRI y sus extensas playas de arena blanca. Rodeada por el desierto de Atacama y el océano Pacífico, goza de un clima cálido y muy seco prácticamente todo el año. Es además un destino turístico destacado por sus deportes acuáticos y su animada vida nocturna.",
  },

  /* ── 2 ── Región de Antofagasta */
  {
    id: 2,
    nombreRegion: "Región de Antofagasta",
    nombreCiudad: "Antofagasta",
    img: "antofagasta.jpg",
    descripcion:
      "Antofagasta es la capital minera de Chile, rodeada por el desierto de Atacama, el más árido del mundo. Su economía gira en torno a la extracción del cobre y el litio, recursos fundamentales para el país. Aunque es una ciudad desértica, su costa ofrece una vista impresionante del Pacífico y amaneceres únicos.",
  },

  /* ── 3 ── Región de Atacama */
  {
    id: 3,
    nombreRegion: "Región de Atacama",
    nombreCiudad: "Copiapó",
    img: "copiapo.jpg",
    descripcion:
      "Copiapó es una ciudad minera enclavada en el corazón del desierto de Atacama, conocida mundialmente por el rescate de los 33 mineros en 2010. Es una ciudad de contrastes: árido desierto de día y cielos estrellados espectaculares de noche. Su valle permite el cultivo de uvas y aceitunas gracias a los ríos que la atraviesan.",
  },

  /* ── 4 ── Región de Coquimbo */
  {
    id: 4,
    nombreRegion: "Región de Coquimbo",
    nombreCiudad: "La Serena",
    img: "laserena.jpg",
    descripcion:
      "La Serena es una de las ciudades más antiguas de Chile, famosa por su arquitectura colonial y sus largas playas de arena. Su clima templado y sus cielos despejados la convierten en un destino astronómico de primer nivel, albergando varios observatorios internacionales. El Valle del Elqui, célebre por sus piscos y viñedos, se extiende justo al interior de la ciudad.",
  },

  /* ── 5 ── Región de Valparaíso */
  {
    id: 5,
    nombreRegion: "Región de Valparaíso",
    nombreCiudad: "Valparaíso",
    img: "valparaiso.jpg",
    descripcion:
      "Valparaíso es una ciudad puerto icónica, declarada Patrimonio de la Humanidad por la UNESCO gracias a su arquitectura bohemia y sus coloridos cerros. Es la sede del Congreso Nacional de Chile y uno de los principales puertos de la costa del Pacífico sur. Su vibrante escena cultural, murales urbanos y ascensores históricos la hacen única en el mundo.",
  },

  /* ── 6 ── Región Metropolitana de Santiago */
  {
    id: 6,
    nombreRegion: "Región Metropolitana de Santiago",
    nombreCiudad: "Santiago",
    img: "santiago.jpg",
    descripcion:
      "Santiago es la capital y el corazón político, económico y cultural de Chile, albergando a más de 7 millones de personas en su área metropolitana. Enclavada entre la cordillera de los Andes y la cordillera de la Costa, ofrece paisajes impresionantes especialmente en invierno con las cumbres nevadas. Su clima mediterráneo con veranos secos e inviernos con lluvia moderada la convierte en una ciudad muy vivible.",
  },

  /* ── 7 ── Región del Libertador General Bernardo O'Higgins */
  {
    id: 7,
    nombreRegion: "Región del Libertador General Bernardo O'Higgins",
    nombreCiudad: "Rancagua",
    img: "rancagua.jpg",
    descripcion:
      "Rancagua es una ciudad de tradición huasa y agrícola, ubicada en el fértil Valle Central de Chile. Es reconocida por albergar El Teniente, la mina de cobre subterránea más grande del mundo, operada por Codelco. Sus rodeos, chinganas y festividades criollas la convierten en un símbolo de la identidad campesina chilena.",
  },

  /* ── 8 ── Región del Maule */
  {
    id: 8,
    nombreRegion: "Región del Maule",
    nombreCiudad: "Talca",
    img: "talca.jpg",
    descripcion:
      "Talca es una ciudad universitaria y agroindustrial, corazón de una de las zonas vitivinícolas más importantes de Chile. El río Maule y sus alrededores ofrecen paisajes de valles, viñedos y termas que atraen a visitantes durante todo el año. Reconstruida tras el terremoto de 2010, la ciudad combina su historia colonial con una arquitectura moderna.",
  },

  /* ── 9 ── Región de Ñuble */
  {
    id: 9,
    nombreRegion: "Región de Ñuble",
    nombreCiudad: "Chillán",
    img: "chillan.jpg",
    descripcion:
      "Chillán es una ciudad cargada de historia y cultura popular, cuna del prócer Bernardo O'Higgins y del muralista mexicano David Alfaro Siqueiros. Es famosa por su mercado artesanal, uno de los más coloridos del país, y por sus afamadas longanizas y dulces tradicionales. El cercano volcán Chillán ofrece además un centro de ski y termas de alta categoría.",
  },

  /* ── 10 ── Región del Biobío */
  {
    id: 10,
    nombreRegion: "Región del Biobío",
    nombreCiudad: "Concepción",
    img: "concepcion.jpg",
    descripcion:
      "Concepción es la segunda ciudad más grande de Chile y un importante polo universitario e industrial del país. Ubicada a orillas del río Biobío, es conocida por su activa escena cultural, musical y gastronómica. Su clima lluvioso y su entorno de bosques nativos le dan un carácter verde y fresco que la distingue del resto del país.",
  },

  /* ── 11 ── Región de La Araucanía */
  {
    id: 11,
    nombreRegion: "Región de La Araucanía",
    nombreCiudad: "Temuco",
    img: "temuco.jpg",
    descripcion:
      "Temuco es la puerta de entrada a La Araucanía, tierra del pueblo mapuche, cuya cultura y cosmovisión impregnan toda la región. Es una ciudad dinámica y comercial, rodeada de volcanes, lagos y bosques milenarios de araucarias. Su mercado La Recova y su feria agropecuaria son reconocidos como los más grandes del sur de Chile.",
  },

  /* ── 12 ── Región de Los Ríos */
  {
    id: 12,
    nombreRegion: "Región de Los Ríos",
    nombreCiudad: "Valdivia",
    img: "valdivia.jpg",
    descripcion:
      "Valdivia es una ciudad fluvial fundada por los españoles en 1552, bañada por varios ríos que convergen en su centro y desembocan en el Pacífico. Es conocida por su arquitectura de influencia alemana, su excelente cerveza artesanal y su bulliciosa costanera llena de lobos marinos. Su tradición lluviosa le ha dado el apodo de 'La ciudad de la lluvia'.",
  },

  /* ── 13 ── Región de Los Lagos */
  {
    id: 13,
    nombreRegion: "Región de Los Lagos",
    nombreCiudad: "Puerto Montt",
    img: "puertomontt.jpg",
    descripcion:
      "Puerto Montt es la puerta de entrada a la Patagonia chilena, una ciudad portuaria rodeada de volcanes, fiordos y lagos de aguas turquesas. Es el principal polo de la industria salmonera de Chile y de Sudamérica, con un puerto de gran actividad comercial y turística. Su feria artesanal de Angelmo es famosa por sus mariscos frescos y artesanías en madera de alerce.",
  },

  /* ── 14 ── Región de Aysén */
  {
    id: 14,
    nombreRegion: "Región de Aysén del General Carlos Ibáñez del Campo",
    nombreCiudad: "Coyhaique",
    img: "coyhaique.jpg",
    descripcion:
      "Coyhaique es el centro de servicios de la Región de Aysén, rodeada de una naturaleza salvaje y prístina en plena Patagonia. Es conocida por sus ríos de clase mundial para la pesca deportiva y sus impresionantes parques nacionales de acceso remoto. La Carretera Austral, que atraviesa la región, la convierte en un destino de aventura para viajeros de todo el mundo.",
  },

  /* ── 15 ── Región de Magallanes y de la Antártica Chilena */
  {
    id: 15,
    nombreRegion: "Región de Magallanes y de la Antártica Chilena",
    nombreCiudad: "Punta Arenas",
    img: "puntaarenas.jpg",
    descripcion:
      "Punta Arenas es la ciudad más austral del mundo de más de 100.000 habitantes, ubicada a orillas del estrecho de Magallanes en la Patagonia extrema. Fue un importante enclave durante la era del oro y de la lana ovina, y hoy es la puerta de entrada a la Antártica chilena y a la Tierra del Fuego. Sus pingüineras, vientos persistentes y cielos estrellados del hemisferio sur son experiencias únicas en el planeta.",
  },
];

class ClimaService {
  constructor(listaLugares) {
    this.listaLugares = listaLugares;
    this.dataClimaLugares = [];
    this.dataLugarDetalle = {};
    this.unidadTemperatura = "celsius";
  }

  async obtenerCoordenadas(nombreCiudad) {
    try {
      const respuestaGeo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${nombreCiudad}&country=CL&count=1`,
      );

      if (!respuestaGeo.ok) throw new Error(`Error ${respuestaGeo.status}`);

      const datosGeo = await respuestaGeo.json();

      return [datosGeo.results[0].latitude, datosGeo.results[0].longitude];
    } catch (error) {
      console.error("Falló la petición a las coordenadas:", error.message);
      return null;
    }
  }

  async obtenerClima(latitud, longitud) {
    try {
      const respuestaClima = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&daily=temperature_2m_max,temperature_2m_min,weather_code,temperature_2m_mean,precipitation_probability_mean&current=temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m,is_day,weather_code&timezone=auto&temperature_unit=${this.unidadTemperatura}`,
      );

      if (!respuestaClima.ok) throw new Error(`Error ${respuestaClima.status}`);

      const datosClima = await respuestaClima.json();

      return datosClima;
    } catch (error) {
      console.error("Falló la petición al clima:", error.message);
      return null;
    }
  }

  async cargarLugares() {
    const listaDatos = await Promise.all(
      this.listaLugares.map(async (lugar) => {
        const coordenadas = await this.obtenerCoordenadas(lugar.nombreCiudad);
        if (!coordenadas) return null;

        const [latitud, longitud] = coordenadas;
        const datosCiudadAPI = await this.obtenerClima(latitud, longitud);
        if (!datosCiudadAPI) return null;

        const { current, daily } = datosCiudadAPI;

        const climaActual = {
          fecha: current.time,
          tempActual: Math.round(current.temperature_2m),
          esDeDia: current.is_day === 1 ? true : false,
          clima: current.weather_code,
        };

        const pronosticoSemanal = {
          tempMaxima: Math.round(daily.temperature_2m_max[0]),
          tempMinima: Math.round(daily.temperature_2m_min[0]),
        };

        return {
          id: lugar.id,
          nombreRegion: lugar.nombreRegion,
          nombreCiudad: lugar.nombreCiudad,
          img: lugar.img,
          unidadMedida: datosCiudadAPI.current_units.temperature_2m,
          climaActual: climaActual,
          pronosticoSemanal: pronosticoSemanal,
        };
      }),
    );

    this.dataClimaLugares = listaDatos;
    return this.dataClimaLugares;
  }

  async cargarDetalleLugar(id) {
    if (id > this.listaLugares.length - 1) {
      console.error("Id de ciudad invalido");
      return;
    }
    const lugarSeleccionado = this.listaLugares.find(
      (ciudad) => ciudad.id === id,
    );

    const coordenadasCiudad = await this.obtenerCoordenadas(
      lugarSeleccionado.nombreCiudad,
    );
    if (!coordenadasCiudad) return null;

    const [latitud, longitud] = coordenadasCiudad;
    const datosCiudadAPI = await this.obtenerClima(latitud, longitud);
    if (!datosCiudadAPI) return null;

    const { current, daily } = datosCiudadAPI;

    const climaActual = {
      fecha: current.time,
      tempActual: Math.round(current.temperature_2m),
      humedad: Math.round(current.relative_humidity_2m),
      coberturaNubes: current.cloud_cover,
      viento: Math.round(current.wind_speed_10m),
      esDeDia: current.is_day === 1 ? true : false,
      clima: current.weather_code,
    };

    const pronosticoSemanal = {
      fechas: daily.time.map((d) => d.replaceAll("-", "/")),
      tempMaximas: daily.temperature_2m_max.map((t) => Math.round(t)),
      tempMinimas: daily.temperature_2m_min.map((t) => Math.round(t)),
      climas: daily.weather_code,
      tempMedias: daily.temperature_2m_mean.map((t) => Math.round(t)),
      probPrecipitacion: daily.precipitation_probability_mean,
    };

    this.dataLugarDetalle = {
      id: lugarSeleccionado.id,
      nombreRegion: lugarSeleccionado.nombreRegion,
      nombreCiudad: lugarSeleccionado.nombreCiudad,
      img: lugarSeleccionado.img,
      descripcion: lugarSeleccionado.descripcion,
      unidadMedida: datosCiudadAPI.current_units.temperature_2m,
      climaActual: climaActual,
      pronosticoSemanal: pronosticoSemanal,
    };

    return this.dataLugarDetalle;
  }

  cambiarUnidadTemp(nuevaUnidad) {
    if (!["celsius", "fahrenheit"].includes(nuevaUnidad)) {
      console.error("Unidad de temperatura invalida");
      return;
    }
    this.unidadTemperatura = nuevaUnidad;
    location.reload();
  }

  traducirClima(codigo, esDia = true) {
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
    if ([95, 96, 99].includes(codigo))
      return (objetoClima = climas["tormenta"]);

    return objetoClima;
  }

  calcularEstadisticas(pronostico) {
    if (!pronostico) {
      console.error(
        "Error al calcular las estadísticas, falta agregar un pronóstico",
      );
      return;
    }

    const menorTempMin = Math.min(...pronostico.tempMinimas);
    const mayorTempMax = Math.max(...pronostico.tempMaximas);

    const sumaTemperaturas = pronostico.tempMedias.reduce(
      (acc, numActual) => acc + numActual,
      0,
    );

    const promedioTemp = Math.floor(
      sumaTemperaturas / pronostico.tempMedias.length,
    );

    const conteoTemporalClimas = pronostico.climas.reduce((acc, codigo) => {
      let tipoClima = this.traducirClima(codigo).titulo;

      if (!acc[tipoClima]) {
        acc[tipoClima] = {
          codigoClima: codigo,
          cantidadDias: 0,
        };
      }
      acc[tipoClima].cantidadDias += 1;
      return acc;
    }, {});

    // transforma un objeto en un array de objetos sin las claves
    const diasPorClima = Object.values(conteoTemporalClimas);

    const climaMasRepetido = diasPorClima.reduce(
      (max, clima) => {
        return clima.cantidadDias > max.cantidadDias ? clima : max;
      },
      { codigoClima: null, cantidadDias: 0 },
    );

    const sumaTempMax = pronostico.tempMaximas.reduce(
      (acc, num) => acc + num,
      0,
    );
    const promedioTempMax = Math.ceil(
      sumaTempMax / pronostico.tempMaximas.length,
    );

    const crearFraseResumen = () => {
      const nivelesTemperatura = {
        muyFria: { max: 8, texto: "muy fría" },
        fria: { max: 17, texto: "fría" },
        templada: { max: 24, texto: "templada" },
        calurosa: { max: 50, texto: "calurosa" },
      };

      const listaNiveles = Object.values(nivelesTemperatura);
      // destructuring de la propiedad 'texto' del objeto que devuelve find()
      const { texto: nivelClima } = listaNiveles.find(
        ({ max }) => promedioTempMax <= max,
      );

      const { codigoClima } = climaMasRepetido;

      const traducirCodigoClima = (codigo) => {
        let textoClima = "";
        if (codigo === 0) textoClima = "despejada";
        if ([1, 2].includes(codigo)) textoClima = "con nubosidad parcial";
        if (codigo === 3) textoClima = "nublada";
        if (
          [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(codigo)
        )
          textoClima = "con lluvias";
        if (codigo === 77) textoClima = "con granizo";
        if ([71, 73, 75, 85, 86].includes(codigo)) textoClima = "con nevadas";
        if ([95, 96, 99].includes(codigo)) textoClima = "con tormentas";

        return textoClima;
      };

      return `Semana ${nivelClima} mayormente ${traducirCodigoClima(codigoClima)}`;
    };

    return {
      menorTempMin: menorTempMin,
      mayorTempMax: mayorTempMax,
      tempPromedio: promedioTemp,
      diasPorClima: diasPorClima,
      climaMasRepetido: climaMasRepetido,
      fraseResumenClima: crearFraseResumen(),
    };
  }
}

const climaChile = new ClimaService(regionesChile);

climaChile.cargarLugares().then((resultado) => {
  console.log("Lista lugares:", resultado);
});

climaChile.cargarDetalleLugar(6).then((resultado) => {
  console.log("Detalle lugar:", resultado);
  console.log(
    "Estadisticas detalle:",
    climaChile.calcularEstadisticas(resultado.pronosticoSemanal),
  );
});

async function testApi(app) {
  console.log(app);
}

testApi(climaChile);
