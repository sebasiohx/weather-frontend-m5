# MeteoChile (prototipo de app del clima de Chile) v5.0

🔗[https://github.com/sebasiohx/weather-frontend-m5](https://github.com/sebasiohx/weather-frontend-m5)

## 📘 Características

- Muestra el clima actual de Santiago y las otras capitales de las regiones de Chile.
- Hecho con data falsa que simula la información del clima mediante una lista de objetos.
- Desarrollado con JavaScript vanilla para renderizar los datos en el DOM mediante la creación de nodos.
- Hecho con Bootstrap para el diseño responsivo y SASS (scss)
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

## 📦 Estructura de datos

Los datos están organizados en 4 niveles anidados:

1. Nivel 1: el arreglo `regionesChile[{}]` es una lista de objetos que contiene 16 elementos, cada uno por región.
2. Nivel 2: Cada elemento de la lista es un objeto `region{}` el cual tiene 2 tipo de datos: los datos simples (nombres, cifras de las temperaturas actuales y otros datos) y datos compuestos (referencias a un objeto `clima{}`, un array `pronosticoSemanal[]`)
3. Nivel 3: la lista `pronosticoSemanal[]` contiene 7 objetos, correspondientes a cada uno de los días de la semana. Cada elemento tiene las temperaturas de cada día junto con su estado climático (el cual hace referencia al objeto `clima{}`)
4. Nivel 4: el objeto `clima{}` tiene como propiedades otros 8 objetos con el nombre y el icono correspondiente a cada uno de los tipos de climas (o estados climáticos) posibles.

```js
regionesChile = [
  Region {
    id: number; // posición en el array (0 a 15)
    nombreRegion: string; // nombre oficial de la región
    nombreCiudad: string; // ciudad capital de la región
    img: string; // nombre del archivo de imagen (ej: "arica.jpg")
    descripcion: string; // párrafo descriptivo de la ciudad
    tempMinima: number; // temperatura mínima en °C
    tempMaxima: number; // temperatura máxima en °C
    tempActual: number; // temperatura a las 13:00 hrs en °C
    estadoClimaticoActual: Clima{}; // objeto Clima.clima{texto, icono}
    viento: number; // velocidad del viento en km/h
    humedad: number; // porcentaje de humedad
    pronosticoSemanal: [ // array de 7 días (lunes a domingo)
      DiaSemanal {
        nombreDia: string; // "lunes", "martes", etc.
        siglas: string; // "lun", "mar", etc.
        climaDia: Clima{}; // referencia a un objeto Clima
        climaNoche: Clima{}; // referencia a un objeto Clima
        tempMin: number; // temperatura mínima en °C
        tempMax: number; // temperatura máxima en °C
      },
    ];
  }
]
```

## 📊 Resumen calculo de estadísticas

### Estadísticas de la semana

- **Temperatura mínima:** Se toma el valor más bajo de las temperaturas mínimas de la semana.
- **Temperatura maxima:** Se toma el valor más alto de las temperaturas máximas de la semana.
- **Temperatura promedio:** Se hace una suma de todas las temperaturas mínimas y máximas de los días de la semana y se divide por el total (14 elementos) con la ayuda de la función `calcularPromedio()`

### Cantidad de días por tipo de clima

1. La variable `conteoTemporalClima`, tiene como valor la lista de `pronosticoSemanal` al cual se le aplica el metodo `.reduce()` para retornar un objeto que contiene los diferentes tipos de climas de la semana, con su icono y cantidad de días repetidos.
2. tomo la variable `conteoTemporalClima` y la convierto en array usando ` Object.values()` para crear un lista de objetos con los datos de los climas y cuantas veces se repitieron. Esto se le asigna a la variable `diasPorClimas` que sirve para renderizar el listado.

### Resumen del clima semanal

1. Se aplica el método `.reduce()` a `diasPorClimas` para retornar un único objeto con el clima más repetido, el cual se le asigna a la variable `climaMasRepetido`.
2. Se hace un promedio de las temperaturas máximas de la semana mediante la función `calcularPromedio()` y se le asigna a la variable `promedioTempMax`.
3. se utiliza la función `crearFraseResumen()` la cual recibe como argumentos las variables `promedioTempMax` y `climaMasRepetido`. Esta función maneja internamente un rango de niveles de temperatura y un listado de los climas con los textos conjugados. Usando los datos de los parámetros retorna una frase que resume el clima de la semana ( por ej: "Semana calurosa mayormente soleada") junto con el icono del clima mencionado.

## 📁 Estructura del proyecto

```
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
