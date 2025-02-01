# React + Vite

# Proyecto Full Stack - Frontend

Este repositorio contiene el **frontend** de la aplicación Full Stack, desarrollado en **React** con **React-Bootstrap** y utilizando **Vite** como bundler. El objetivo de este proyecto es demostrar cómo implementar una aplicación con rutas protegidas, autenticación basada en JWT y una interfaz de usuario interactiva y responsiva.

## Tecnologías Utilizadas

* **React** : Librería para la construcción de interfaces de usuario.
* **React-Bootstrap** : Framework de diseño basado en Bootstrap para componentes UI.
* **React-Router-Dom** : Librería para manejar la navegación entre páginas en la aplicación de una sola página (SPA).
* **React Context API** : Para manejar el estado global de la autenticación de usuarios.
* **React-Icons** : Para integrar iconos en la interfaz de usuario.
* **Vite** : Bundler de JavaScript moderno, rápido y eficiente.

## Estructura del Proyecto

src/
├── components/       # Componentes reutilizables
│   ├── Sidebar.jsx   # Sidebar de navegación
│   ├── Header.jsx    # Header de la página
│   ├── Login.jsx     # Componente de inicio de sesión
├── context/          # Gestión del estado global
│   └── AuthContext.jsx # Contexto de autenticación (login/logout)
├── pages/            # Páginas principales de la aplicación
│   ├── Dashboard.jsx # Página del Dashboard
│   ├── Empleados.jsx # Página de empleados
│   └── Solicitudes.jsx # Página de solicitudes
├── App.jsx           # Componente principal que contiene las rutas
└── main.jsx          # Punto de entrada de la aplicación
`</code></div>``</div></pre>`

## Instalación

### Requisitos

* **Node.js** (v16 o superior)
* **npm** o **yarn**

### Pasos de Instalación

1. Clona este repositorio:

git clone `<url-del-repositorio>`
cd `<nombre-del-repositorio>`
`</code></div>``</div></pre>`

2. Instala las dependencias:

npm install

# o con yarn

yarn install
`</code></div>``</div></pre>`

3. Inicia la aplicación en modo de desarrollo:

npm run dev

o con yarn

yarn dev
`</code></div>``</div></pre>`

La aplicación debería estar disponible en `http://localhost:5174`.

## Explicación del Frontend

### 1. **Estructura Principal del Layout**

El layout de la aplicación está compuesto por un **sidebar** y un  **header** , y contiene las siguientes rutas principales:

* **Dashboard** : Página principal de la aplicación.
* **Empleados** : Página donde se gestionan los empleados.
* **Solicitudes** : Página donde los administradores gestionan las solicitudes.

El `Layout.jsx` maneja la estructura global de la página, el cual contiene:

* Un **sidebar** con las rutas de navegación, cada una con un icono asociado.
* Un **header** con el título dinámico de la página y un botón para cerrar sesión.

### 2. **Sidebar y Navegación**

El **sidebar** se encuentra en el componente `Sidebar.jsx` y tiene las siguientes características:

* Muestra los elementos de navegación con un ícono al lado del texto.
* Se usa `React-Router-Dom` para manejar las rutas internas de la aplicación.
* Cada elemento del sidebar cambia de color y fondo cuando está seleccionado, utilizando la propiedad `location.pathname` de `useLocation`.

#### Características del Sidebar:

* Íconos de navegación usando `React Icons`.
* Hover para resaltar las opciones al pasar el mouse.
* Borde redondeado y sombra en cada opción de navegación.

### 3. **Autenticación con JWT**

El sistema de autenticación se maneja a través del contexto `AuthContext`. Los usuarios pueden iniciar sesión con su correo electrónico y contraseña.

* El **Login.jsx** permite a los usuarios ingresar sus credenciales.
* Al hacer login, se genera un **token JWT** que se almacena en el almacenamiento local (`localStorage`).
* El **logout** elimina el token y redirige al usuario a la página de inicio de sesión.

El `AuthContext.jsx` proporciona funciones para manejar el estado de autenticación, como `login` y `logout`.

### 4. **Página de Login**

El componente **Login.jsx** permite a los usuarios iniciar sesión. Está compuesto por un formulario que pide el correo electrónico y la contraseña. Los campos son controlados por el estado con `useState`.

El login está integrado con el contexto de autenticación `AuthContext`. El `login()` recibe el correo y la contraseña, y si son correctos, redirige al usuario a la página principal (`/dashboard`).

### 5. **Header**

El **Header** es un componente simple que se encuentra dentro del layout, mostrando el título de la página actual y un botón para cerrar sesión. Utiliza el estado global de la ruta activa (`location.pathname`) para cambiar el título dinámicamente.

* Si el usuario está autenticado, el botón de **Cerrar Sesión** estará visible.
* Al hacer clic en el botón de cerrar sesión, el estado de autenticación se elimina.

### 6. **Responsividad**

La interfaz de usuario está diseñada para ser  **responsiva** , utilizando las clases de **Bootstrap** y **React-Bootstrap** para adaptarse a diferentes tamaños de pantalla:

* **Sidebar** : Es ocultado en pantallas pequeñas (`d-md-none`).
* **Botón de menú (hamburguesa)** : En pantallas pequeñas, el botón de menú (hamburguesa) permite alternar la visibilidad del sidebar.

### 7. **Rutas y Navegación Dinámica**

Las rutas se gestionan mediante `React-Router-Dom` y se renderiza el componente correspondiente según la ruta seleccionada. Además, se utiliza un objeto para definir el título de cada página, lo cual se cambia dinámicamente en el  **header** .

### 8. **Componentes Responsivos con React-Bootstrap**

Se utiliza **React-Bootstrap** para la interfaz de usuario, haciendo uso de componentes como `Container`, `Navbar`, `Button`, `Col`, `Row`, `Nav` y `Form`. Esto ayuda a que la UI sea consistente, fácil de usar y accesible.

---

## Notas

* **JWT** : La autenticación con JWT se maneja a través de las cabeceras HTTP, y la validación se realiza en el backend.
* **Paginación y Filtrado** : Para optimizar el rendimiento en el futuro, se implementarán características como la paginación y filtrado en las páginas que muestren grandes cantidades de datos

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
