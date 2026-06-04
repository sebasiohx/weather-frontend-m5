# ClimaChile (prototipo de app del clima de Chile) v5.0

🔗[https://github.com/sebasiohx/weather-frontend-m5](https://github.com/sebasiohx/weather-frontend-m5)

## 📘 Características

- Muestra el clima actual de Santiago y las otras capitales de las regiones de Chile.
- Hecho con datos de una API del clima ([open-meteo.com](https://open-meteo.com/)) y data local con información de las regiones de Chile.
- Desarrollado con JavaScript vanilla para renderizar los datos en el DOM mediante la creación de nodos.
- Hecho con **Bootstrap** para el diseño responsivo y SASS (scss)
- Uso de la metodología BEM para escribir los estilos CSS.

## 🛠 Instalación

Sigue estos pasos para correr el proyecto localmente:

```bash
# 1. Clona el repositorio
git clone https://github.com/sebasiohx/weather-frontend-m5.git

# 2. Entra a la carpeta del proyecto
cd weather-frontend-m5

# 3. Abre el proyecto (sin dependencias, es vanilla JS)
# Opción A: Abre index.html directo en el navegador
# Opción B: Usa Live Server en VS Code
```

> ⚠️ **Requisitos previos:** Solo necesitas un navegador moderno. No se requiere Node.js ni npm.

## 📡 APIs utilizadas

En éste proyecto se utiliza una API del clima llamada **Open-Meteo** en 2 versiones, una que se llama _Geocoding API_ y otra que se llama _Weather Forecast API_

- Con **Geocoding API** se pueden obtener las coordenadas de una ciudad, se utilizan para darle la _latitud_ y _longitud_ a la API del pronóstico.
  Link: [open-meteo.com/en/docs/geocoding-api](https://open-meteo.com/en/docs/geocoding-api)

- Con **Weather Forecast API** se pueden obtener los datos del clima actual y el pronóstico climático de una ciudad en base a sus coordenadas.
  Link: [open-meteo.com/en/docs](https://open-meteo.com/en/docs)

## 📦 Estructura de datos

Para manejar los datos de creo un servicio en base a una clase llamada **ClimaService**, la cual recive como parametro la lista de lugares llamada **regionesChile** que es una lista con las regiones de Chile.

**ClimaService** puede hacer lo siguiente:

- Con **obtenerCoordenadas()** se pueden obtener las coordenadas específicas de un lugar utilizando su nombre como argumento (en este caso el nombre de la ciudad capital de cada región).
- Con **obtenerClima()** se pueden obtener los datos del clima actual y el pronóstico de los siguientes 6 días de un lugar utilizando su latitud y longitud (coordenadas que se pueden obtener con el método `obtenerCoordenadas()`)
- Con **cargarLugares()** se puede obtener un lista de objetos con ciertos datos climáticos específicos de cada ciudad (no todos los datos) Útil para renderizar un listado de ciudades.
- Con **cargarDetalleLugar()** se puede obtener un objeto con todos los datos de una ciudad específica (las variables de la API fueron renombradas como atributos del objeto para evitar errores en caso de que la API decida hacer cambios en los nombres que puedan afectar su consumo)
- Con **traducirClima()** se puede obtener uno de los climas del objeto `climas{}` correspondiente al codigo numérico del clima que trae la API. Cada clima es un objeto con el titulo y la referencia a un icono de la librería Font Awesome ([fontawesome.com](https://fontawesome.com/)) Dependiendo del clima se puede tener una versión para el día o la noche.
- Con **calcularEstadisticas()** Se puede obtener un objeto con los datos de las estadísticas calculadas a partir de los datos del _pronóstico_ que se pasa como argumento, correspondiente al objeto _pronosticoSemanal_ que trae el método `cargarDetalleLugar()`.

### Ejemplo de los datos que se obtienen de un lugar (en este caso Santiago)

```js
{
    "id": 6,
    "nombreRegion": "Región Metropolitana de Santiago",
    "nombreCiudad": "Santiago",
    "img": "santiago.jpg",
    "descripcion": "lorem ipsum...",
    "unidadMedida": "°C",
    "climaActual": {
        "fecha": "2026-06-03T01:45",
        "tempActual": 11,
        "humedad": 51,
        "coberturaNubes": 98,
        "viento": 1,
        "esDeDia": false,
        "clima": 3
    },
    "pronosticoSemanal": {
        "fechas": [],
        "tempMaximas": [],
        "tempMinimas": [],
        "climas": [],
        "tempMedias": [],
        "probPrecipitacion": []
    }
}
```

## 📊 Resumen cálculo de estadísticas

A continuación se describe como se hacen los cálculos dentro del método **calcularEstadisticas()**

### Estadísticas de la semana

1. **Temperatura mínima:** Se toma el valor más bajo de las temperaturas mínimas de la semana.
2. **Temperatura maxima:** Se toma el valor más alto de las temperaturas máximas de la semana.
3. **Temperatura promedio:** Se hace una suma de todas las temperaturas que vienen en la lista de temperaturas medias que vienen desde la API y se divide por el total.

### Cantidad de días por tipo de clima

1. La variable `conteoTemporalClima`, tiene como valor un `reduce()` aplicado a la lista de `climas[]` del pronostico `pronostico.climas` el cual internamente usa el método `traducirClima()` para obtener un tipo de clima y usarlo como propiedad por cada elemento de la lista. Si el clima se repite, se va sumando a la propiedad ya existente. Éste método devuelve un objeto con los tipos de climas y su cantidad de días repetidos.
2. Luego este objeto se convierte en lista y se asigna a la variable `diasPorClima`

### Resumen del clima semanal

1. Se aplica el método `.reduce()` a `diasPorClima` para retornar un único objeto con el clima más repetido, el cual se le asigna a la variable `climaMasRepetido`.
2. Se hace un promedio de las temperaturas máximas de la semana y se asigna a la variable `promedioTempMax`.
3. se utiliza la función `crearFraseResumen()`. Esta función maneja internamente un rango de niveles de temperatura y una función `convertirClima()` con los textos de los climas conjugados. Usando los resultados de `climaMasRepetido` y `convertirClima` retorna una frase que resume el clima de la semana ( por ej: _"Semana calurosa mayormente soleada"_) junto con el icono del clima mencionado.

### Mensaje de alerta climática

1. Este metodo de divide en 2 partes, la primera evalúa si la temperaturas son muy altas o muy bajas en un periodo de 5 días dentro del pronóstico, si es verdadero entonces activa la alerta por temperatura y devuelve un frase.
2. En la segunda parte, se evalúa si `climaMasRepetido` esta dentro de la funcion interna `convertirCodigoClima()` y si se repite durante 5 o más días seguidos dentro del pronóstico. En éste caso se activa una alerta por clima y devuelve una frase.
3. Finalmente, si `mostrarAlerta` es _true_ retorna en general una alerta de clima, o de temperatura o ambas. Si es _false_ devuelve un _string_ vacío y no muestra nada.

### Ejemplo del objeto con los datos calculados a partir de un pronóstico

```js
{
    "menorTempMin": 1,
    "mayorTempMax": 9,
    "tempPromedio": 5,
    "diasPorClima": [
        {
            "codigoClima": 61,
            "cantidadDias": 5
        },
        {
            "codigoClima": 3,
            "cantidadDias": 2
        }
    ],
    "climaMasRepetido": {
        "codigoClima": 61,
        "cantidadDias": 5
    },
    "fraseResumenClima": "Semana muy fría mayormente con lluvias",
    "fraseAlerta": "Se pronostican varios días muy fríos con mucha lluvia ¡tome precauciones!"
}
```

## 📁 Estructura del proyecto

```txt
WEATHER-FRONTEND-M3/
├── assets/
│   ├── css/
│   │   ├── styles.css             *estilos compilados
│   │   └── styles.css.map
│   ├── img/                       *imágenes del sitio
│   ├── js/
│   │   ├── data.js                *los datos del clima
│   │   └── main.js                *funcionalidades del sitio
│   └── scss/
│       ├── abstracts/             *variables, funciones y mixins
│       │   ├── _functions.scss
│       │   ├── _index.scss
│       │   ├── _mixins.scss
│       │   └── _variables.scss
│       ├── base/                  *estilos base del sitio
│       │   ├── _base.scss
│       │   ├── _index.scss
│       │   └── _reset.scss
│       ├── components/            *estilos de los componentes visuales
│       │   ├── _forecast.scss
│       │   ├── _hero-card.scss
│       │   ├── _index.scss
│       │   └── _regions-card.scss
│       ├── layout/                *estilos estructuras base
│       │   ├── _footer.scss
│       │   └── _index.scss
│       ├── pages/                 *estilos de paginas específicas
│       │   ├── _detail.scss
│       │   ├── _home.scss
│       │   └── _index.scss
│       ├── themes/                *estilos de tema de color
│       ├── vendors/               *estilos de recursos externos
│       └── styles.scss            *archivo índice de estilos
├── .gitignore
├── index.html
└── README.md
```

## 🧰 Tecnologías

| Tecnología | Versión | Uso                   |
| ---------- | ------- | --------------------- |
| HTML       | 5       | Estructura de la app  |
| CSS        | BEM     | Metodología de clases |
| SASS       | SCSS    | Estilos y animaciones |
| JavaScript | ES2024  | Lógica del frontend   |

---
