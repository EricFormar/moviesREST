# Implementación de Express Paginate
1. Instalar la dependencia:
~~~
npm install express-paginate
~~~
- ver [documentación](https://github.com/expressjs/express-paginate)
2. Requerir en `app.js` el módulo:
~~~
const paginate = require('express-paginate');
~~~
3. Crear un middleware de aplicacíon, con los siguientes argumentos: 
    - `limit`: un número que indica los resultados devueltos por página (predeterminado en 10), y
    - `maxLimit`. un número que restringe la cantidad máxima de elementos devueltos por página, a fin de evitar que alguien solicite una cantidad exacervada que haga que colapse el servidor (predeterminado en 50).
~~~
.use(paginate.middleware(10,50))
~~~
4. En el controlador respectivo hacer una consulta utilizando el método `.findAndCountAll()`, el cual devuelve `count` con la cantidad total de registros y `rows` con los registros según el criterio de búsqueda. A los efectos de recibir los registros paginados, pasamos por `limit` lo que devuelve el middleware en `req.query.limit` y por `offset` lo que devuelve el middleware en `req.skip` para inidicar la cantidad de elementos por página que mostraremos en cada consulta. Ejemplo:
~~~
const {count, rows} = db.Movie.findAndCountAll({
            limit : req.query.limit,
            offset : req.skip
        })
~~~
5. Utilizando `Match.ceil()`calculamos la **cantidad de páginas** a partir de la división de la cantidad *total* de elementos por la cantidad de *elementos por página.* Recordemos que el método `.ceil()` redondea un número decimal hacia arriba al entero más cercano:
~~~
const pagesCount = Math.ceil(count / req.query.limit);
~~~
6. Para inidicar la **página actual** utilizamos `req.query.page`:
~~~
const currentPage = req.query.page;
~~~
7. Obtenemos un array con todos números de página con su correspondiente url para armar el paginador desde el lado del frontend. Para ello utilizamos el método `.getArrayPage()` con la siguiente sintáxis:
~~~
const pages = paginate.getArrayPages(req)(pagesCount, pagesCount,req.query.page); 
// [{"number":1,"url":"/api/v1/movies?page=1&limit=8"},{"number":2,"url":"/api/v1/movies?page=2&limit=8"},{"number":3,"url":"/api/v1/movies?page=3&limit=8"}]
~~~
8. Por último podemos enviar en la respuesta, de corresponder la página siguiente y la página anterior de la página actual:
~~~
const prevPage = currentPage > 1 ? pages[currentPage - 2].url : null;
const nextPage = currentPage < pagesCount ?  pages[currentPage].url : null;
~~~
9. Utilizando un motor de plantias, por ejemplos **EJS** podemos utilizar las propiedades y métodos que nos proporciona `express-paginate` para armar el paginador. Ejemplo:
~~~
<div class="pagination">
    <% if (paginate.hasPreviousPages || paginate.hasNextPages(pagesCount)) { %>
        <% if (paginate.hasPreviousPages) { %>
            <a href="<%=paginate.href(true).prev%>" class="page-number prev"><i class="fa fa-angle-left"></i></a>
        <% } %>
        <% if (pages) { %>
            <% pages.forEach(page => { %>
                <a href="<%= page.url %>" class="page-number <%= page.number === currentPage && 'current' %> "><%= page.number%></a>
                <% }) %>
        <% } %>
    
        <% if (paginate.hasNextPages(pagesCount)) { %>
            <a href="<%= paginate.href() %>" class="page-number prev"><i class="fa fa-angle-right"></i></a>
        <% } %>
    <% } %>
</div>
~~~