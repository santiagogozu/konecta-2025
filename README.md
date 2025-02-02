# Instalación y Ejecución de la Aplicación en Docker

Este documento describe los pasos necesarios para instalar y ejecutar la aplicación utilizando Docker y Docker Compose.

## Requisitos Previos

Antes de comenzar, tener instalados lo siguientes:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Instalación y Ejecución

Sigue estos pasos para configurar y ejecutar la aplicación en un contenedor Docker:

### 1. Clonar el Repositorio

Ejecuta el siguiente comando en tu terminal para clonar el repositorio desde GitHub:

```sh
 git clone https://github.com/santiagogozu/konecta-2025.git
```

### 2. Construir Contenedores

Desde el directorio raiz del proyecto, ejecuta el siguiente comando para construir y levantar los contenedores:

```sh
docker compose up -d --build
```

Este comando iniciará los contenedores en segundo plano.

### 3. Crear la Base de Datos

Una vez que los contenedores estén en ejecución, accede a la base de datos y ejecuta el siguiente script SQL para crear las tablas necesarias y poblar los datos iniciales:

```sql
CREATE TABLE rol (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NULL
);

INSERT INTO rol (id, nombre) VALUES
(1, 'Empleado'),
(2, 'Administrador');

CREATE TABLE empleados (
    id SERIAL PRIMARY KEY,
    fecha_ingreso TIMESTAMP NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    salario INT NOT NULL
);

CREATE TABLE solicitud (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    resumen VARCHAR(255) NOT NULL,
    "empleadoId" INT NOT NULL,
    FOREIGN KEY ("empleadoId") REFERENCES empleados(id) ON DELETE CASCADE
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    "rolId" INT NOT NULL,
    "empleadoId" INT NOT NULL,
    FOREIGN KEY ("empleadoId") REFERENCES empleados(id),
    FOREIGN KEY ("rolId") REFERENCES rol(id)
);

INSERT INTO empleados (id, fecha_ingreso, nombre, salario) values
(0, '2025-01-01', 'admin', 100);

INSERT INTO usuarios (id, correo, password, "rolId", "empleadoId")
VALUES (1, 'admin@admin.com', '$2a$10$2kyo9kaog7X.ZCXagAAao.afv0jOZ1lmNojdmQyL1sTcVwogOvjqm', 2, 0);
```

## Verificación

Para verificar que la aplicación está corriendo correctamente, puedes acceder a:

- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:8080` (según configuración del proyecto)
- **Base de datos:** Acceder al contenedor correspondiente y conectarse a la base de datos.

## Detener los Contenedores

Si necesitas detener los contenedores, ejecuta:

```sh
docker compose down
```

---

## Uso de la Aplicación

Para acceder a la aplicación como usuario administrador, use las siguientes credenciales:

Correo: admin@admin.com

Contraseña: admin123

Una vez dentro, podrá gestionar empleados, solicitudes y usuarios según los permisos asignados.

## Explicación del Frontend

### 1. **Estructura Principal del Layout**

El layout de la aplicación está compuesto por un **sidebar** y un **header** , y contiene las siguientes rutas principales:

- **Dashboard** : Página principal de la aplicación.
- **Empleados** : Página donde se gestionan los empleados.
- **Solicitudes** : Página donde los administradores gestionan las solicitudes.

El `Layout.jsx` maneja la estructura global de la página, el cual contiene:

- Un **sidebar** con las rutas de navegación, cada una con un icono asociado.
- Un **header** con el título dinámico de la página y un botón para cerrar sesión.

### 2. **Sidebar y Navegación**

El **sidebar** se encuentra en el componente `Sidebar.jsx` y tiene las siguientes características:

- Muestra los elementos de navegación con un ícono al lado del texto.
- Se usa `React-Router-Dom` para manejar las rutas internas de la aplicación.
- Cada elemento del sidebar cambia de color y fondo cuando está seleccionado, utilizando la propiedad `location.pathname` de `useLocation`.

#### Características del Sidebar:

- Íconos de navegación usando `React Icons`.
- Hover para resaltar las opciones al pasar el mouse.
- Borde redondeado y sombra en cada opción de navegación.

### 3. **Autenticación con JWT**

El sistema de autenticación se maneja a través del contexto `AuthContext`. Los usuarios pueden iniciar sesión con su correo electrónico y contraseña.

- El **Login.jsx** permite a los usuarios ingresar sus credenciales.
- Al hacer login, se genera un **token JWT** que se almacena en el almacenamiento local (`localStorage`).
- El **logout** elimina el token y redirige al usuario a la página de inicio de sesión.

El `AuthContext.jsx` proporciona funciones para manejar el estado de autenticación, como `login` y `logout`.

### 4. **Página de Login**

El componente **Login.jsx** permite a los usuarios iniciar sesión. Está compuesto por un formulario que pide el correo electrónico y la contraseña. Los campos son controlados por el estado con `useState`.

El login está integrado con el contexto de autenticación `AuthContext`. El `login()` recibe el correo y la contraseña, y si son correctos, redirige al usuario a la página principal (`/dashboard`).

### 5. **Header**

El **Header** es un componente simple que se encuentra dentro del layout, mostrando el título de la página actual y un botón para cerrar sesión. Utiliza el estado global de la ruta activa (`location.pathname`) para cambiar el título dinámicamente.

- Si el usuario está autenticado, el botón de **Cerrar Sesión** estará visible.
- Al hacer clic en el botón de cerrar sesión, el estado de autenticación se elimina.

### 6. **Responsividad**

La interfaz de usuario está diseñada para ser **responsiva** , utilizando las clases de **Bootstrap** y **React-Bootstrap** para adaptarse a diferentes tamaños de pantalla:

- **Sidebar** : Es ocultado en pantallas pequeñas (`d-md-none`).
- **Botón de menú (hamburguesa)** : En pantallas pequeñas, el botón de menú (hamburguesa) permite alternar la visibilidad del sidebar.

### 7. **Rutas y Navegación Dinámica**

Las rutas se gestionan mediante `React-Router-Dom` y se renderiza el componente correspondiente según la ruta seleccionada. Además, se utiliza un objeto para definir el título de cada página, lo cual se cambia dinámicamente en el **header** .

### 8. **Componentes Responsivos con React-Bootstrap**

Se utiliza **React-Bootstrap** para la interfaz de usuario, haciendo uso de componentes como `Container`, `Navbar`, `Button`, `Col`, `Row`, `Nav` y `Form`. Esto ayuda a que la UI sea consistente, fácil de usar y accesible.

---

## Explicaicon de roles de usuario

La aplicación cuenta con dos tipos de usuarios con permisos diferenciados:

### Administrador

El usuario con rol de Administrador tiene los siguientes permisos:

    Gestión de empleados: Puede visualizar la lista de empleados, crear nuevos empleados y eliminar empleados existentes.
    Gestión de solicitudes: Puede visualizar la lista de solicitudes y crear nuevas solicitudes.

### Empleado

El usuario con rol de Empleado tiene permisos más limitados:

    Gestión de solicitudes: Puede visualizar la lista de solicitudes y crear nuevas solicitudes.
    No tiene acceso a la gestión de empleados.

# Pruebas Unitarias

Para ejecutar las pruebas unitarias del proyecto, usa el siguiente comando en la terminal:

    Backend:
    cd Back
    npm run test

    Frontend:
    cd Front
    npm run test

Este comando ejecutará los test definidos en el proyecto y mostrará los resultados en la terminal. Asegúrate de tener todas las dependencias instaladas antes de ejecutar las pruebas.


# Mejores Prácticas y Seguridad en el Código BackEnd

## BackEnd

Este proyecto implementa varias mejores prácticas de programación y medidas de seguridad para garantizar una aplicación robusta y segura. A continuación se resumen las principales características:

### 1. Autenticación y Autorización

Se utiliza un sistema de autenticación y autorización para proteger las rutas de la API y garantizar que solo los usuarios autorizados puedan realizar ciertas acciones.

- **`verifyToken`**: Verifica que el usuario esté autenticado antes de permitirle acceder a rutas protegidas.
- **`authorizeRoles`**: Restringe el acceso a ciertas rutas según el rol del usuario. Solo los usuarios con el rol de "Administrador" pueden crear nuevos empleados.

```javascript
router.post("/", verifyToken, authorizeRoles(["Administrador"]), create);
```

### 2. Manejo de Errores

Se capturan y gestionan adecuadamente los errores, devolviendo respuestas consistentes con códigos HTTP apropiados (ej. 500 para errores del servidor).

- Los errores son capturados dentro de bloques `try/catch` para garantizar que las excepciones no afecten el flujo de la aplicación.
- Las respuestas de error siempre incluyen un mensaje específico y un código de estado apropiado.

```javascript
try {
  const employee = await employeesService.create(req.body);
  res.json({data: employee});
} catch (error) {
  console.error(error);
  res.status(500).json({error: "Error al crear empleado"});
}
```

### 2. Variables de Entorno

El uso de variables de entorno como process.env.ALLOWED_HOSTS permite que el código sea más flexible y seguro. En este caso, se leen los hosts permitidos desde una variable de entorno:

```javascript
let allowedHosts = [];
if (process.env.ALLOWED_HOSTS) {
  allowedHosts = JSON.parse(process.env.ALLOWED_HOSTS);
}
```

### 3 Uso de Sequelize (ORM)

Se utiliza Sequelize para interactuar con la base de datos, lo que protege contra inyecciones SQL y facilita el manejo de modelos y validaciones.

### 4 Patrón MVC

El código sigue el patrón MVC (Modelo-Vista-Controlador), separando la lógica de negocio de la gestión de solicitudes HTTP, lo que mejora la organización y escalabilidad del proyecto.

## FromfEnd

### 1 Uso de lazy y Suspense para carga diferida de componentes

El uso de React.lazy y Suspense permite una carga diferida de componentes, lo que mejora el rendimiento de la aplicación al cargar solo los componentes necesarios en el momento adecuado. Esto ayuda a reducir el tiempo de carga inicial.

```javascript
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
```

### 2 Implementación de Rutas Protegidas con

Se utiliza rutas privadas para garantizar que solo los usuarios autenticados y con el rol adecuado puedan acceder a ciertas partes de la aplicación.

```javascript
<Route
  path="dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
```

### 3 Gestión de Autenticación y Autorización

Se utiliza un contexto (AuthContext) para gestionar el estado de autenticación y autorización en toda la aplicación. Este contexto se emplea para obtener información sobre el usuario, como su rol, y también para manejar el cierre de sesión.

```javascript
const {user, logout} = useContext(AuthContext);
```

### 4 Manejo de Errores en las Solicitudes HTTP

Las solicitudes HTTP se realizan de forma segura, manejando los errores de manera adecuada con bloques try/catch. Además, se usan respuestas detalladas que proporcionan un mensaje de error útil.

### 5 Implementación de Autenticación con Tokens (JWT)

La autenticación con tokens JWT se implementa de forma que los tokens se envían en los encabezados de las solicitudes HTTP. Esto asegura que los datos estén protegidos y solo los usuarios autenticados puedan realizar ciertas acciones.

```javascript
Authorization: `Bearer ${localStorage.getItem("token")}`,
```

### 6 Protección Contra Vulnerabilidades Comunes

Se toman medidas para proteger la aplicación contra vulnerabilidades comunes, como la inyección de SQL o XSS. Por ejemplo, se usa encodeURIComponent para proteger los valores de búsqueda antes de enviarlos al backend.

```javascript
const response = await fetch(
  `${API_URL}?page=${page.page}&limit=${page.limit}&search=${encodeURIComponent(
    page.search
  )}`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
```
