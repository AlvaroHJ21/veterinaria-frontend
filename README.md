# Veterinaria - Frontend

Este es un proyecto de frontend desarrollado con React y Vite, utilizando TypeScript para una mejor experiencia de desarrollo y tipado seguro. La herramienta de gestión de paquetes utilizada es Yarn. El proyecto consume los endpoints del backend desarrollado [repositorio del backend ](https://github.com/AlvaroHJ21/veterinaria-backend), utilizando Axios para las peticiones HTTP y Zustand para manejar el estado de la aplicación.

## Instalación

1. Clone el repositorio desde Github en su máquina local.
2. En la raíz del proyecto, ejecute el comando `yarn install` para instalar las dependencias.

## Configuración del backend

Antes de ejecutar el proyecto, asegúrese de tener el backend desarrollado anteriormente en ejecución y con los endpoints correctamente configurados.

En el archivo `src/api/clientApi.ts` y `src/api/petsApi.ts`
se encuentran los endpoints a los que se realiza la conexión. Asegúrese de configurarlos correctamente para que coincidan con los endpoints del backend.

## Ejecución del servidor de desarrollo de Vite

Una vez instaladas las dependencias, puede ejecutar el servidor de desarrollo con el comando:

```
yarn dev
```

El servidor de desarrollo se ejecutará en el puerto 3000 por defecto.

## Diseño

El proyecto utiliza Material UI para la interfaz de usuario. El diseño es moderno y minimalista, con una paleta de colores neutros y un enfoque en la usabilidad.

## Dashboard

La aplicación tiene un dashboard que permite acceder al CRUD de clientes y mascotas. Desde el dashboard, se puede acceder a las páginas de creación, edición y eliminación de cada entidad.

## Diseño Responsivo

El diseño de la aplicación es totalmente responsive, lo que significa que se adapta automáticamente a diferentes tamaños de pantalla y dispositivos. El diseño está optimizado para proporcionar una experiencia de usuario óptima en pantallas pequeñas, como smartphones y tablets, así como en pantallas grandes como monitores de escritorio.

Para lograr esto, se utilizan técnicas modernas de diseño web, como flexbox y grid, junto con componentes de Material UI que se ajustan automáticamente a diferentes tamaños de pantalla.
