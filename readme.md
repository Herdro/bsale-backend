# Desafio bsale

Construir una tienda online que despliegue productos agrupados por la categoría a la que pertenecen..

## Desarrollo

### Programas necesarios

para poder utilizar el proyecto en localhost en necesario clonar y tener los siguientes programas:

* [Node.js](https://nodejs.org/es/download/) V16.13.1 o superior.
* IDE de desarrollo
* [GIT](https://git-scm.com/downloads) para gestionar las versiones.

### Clonar Proyecto

```bash
cd existing_folder
git clone git@github.com:Herdro/bsale-backend.git

```

### Instalación

Una vez ya clonado el repositorio es necesario instalar las dependencias con el siguiente comando:

```bash
npm install
```

### Iniciar en Localhost

Se debe crear el archivo con las variables de entono en la carpeta raiz `./.env` con los siguientes valores:

```js
# Express
PORT = 

# Data Base MySQL
DB_HOST = 
DB_USER = 
DB_PASS = 
DB_NAME = 
```

Crado el archivo se ejecuta el siguiente comando:

```bash
npm run start
```

El cual ejecutará `nodemon src/index.js`

### Iniciar en producción

Dependiendo del entorno donde se ejecuten se deben configuirar las variables de entorno las contemplan las misma que el punto anterior

```js
# Express
PORT = 

# Data Base MySQL
DB_HOST = 
DB_USER = 
DB_PASS = 
DB_NAME =
```

A diferencia de ejecutarlo en producción se ejecutará el siguiente comando:

```bash
npm run start:prod
```

Este ejecutará `node src/index.js`

## Objetivos

* despliegue backend y frontend
  * backend (API rest)
    * conección a bases de datos
    * Manipular datos
      * filtro
      * busqueda
      * ordenar
      * paginación
  * frontend (APP consumo)

## Estructructura basica

Para crear un orden estructurado del uso de las herramienta se usara de la siguiente manera:

![image](https://i.ibb.co/Vjt3n00/bsale-APIRest.png "bsale-APIRest")

* `/products/` - **GET** - product list
* `/products/category/` - **GET** - product's category list
* `/product/search/` - **GET** - search product

## Diseño detallado

Para solucionar los distintos procesos usare las siguientes herramientas:

* Sequelize (ORM)
* joi (validador de esquemas)
* @hapi/boom (error handler)
* Express (router)

Para mantener un orden estructurados de los procesos usare una arquitectura exagonal:

```bash
bsale
├── configs
│   ├── environmet.js
│   └── mysql.js
└── src
    ├── domains
    │   └── DB
    ├── drivers
    │   ├── router
    │   └── MySQL
    ├── useCases
    │   └── productsServices
    └── utils
        └── validator
```

### Endpoints

#### Product list

* URL: `/products/`
* Method: `GET`
* Query: (to request additional information)
  * priceMax: `integer`
  * PriceMin: `integer`
  * discount: `enum("ASD", "DESC")`
  * category: `string`
  * limit: `integer`
  * page: `integer`
  * nameOrder: `enum("ASD", "DESC")`
  * priceOrder: `enum("ASD", "DESC")`
  * search: `string`
* Use: Get all product

##### Sucess Response

* Code: `200 OK`
* Instance: in case get product's list successfully
* Example:

```json
{
    {
        "id": "integer()",
        "name": "varchar()",
        "urlImage": "varchar(URL)",
        "price": "float()",
        "discount": "integer()",
        "category": {
          "name": "varchar()",          
        }
    },
    ...
}
```

#### Product's category list

* URL: `/products/category`
* Method: `GET`
* Use: Get all product's category

##### Sucess Response

* Code: `200 OK`
* Instance: in case get product's list successfully
* Example:

```json
{
    [
        "category1",
        "category2",
        ...
    ]
}
```

#### Search product
