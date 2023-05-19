# Implementación de Cloudinary
1. Crear una cuenta en el sitio de [cloudinary](https://cloudinary.com/)
2. Una vez creada la cuenta, obtener los siguientes datos necesarios para luego hacer la configuración:
    - Cloud Name
    - API Key
    - API Secret
3. Instalar la dependencia:
~~~
npm install cloudinary
~~~
4. Teniendo instalado `dotenv`, crear las variables de entorno correspondientes para requerirlas en el archivo `/config/cloudinary.js`, con la siguiente estructura;
~~~
require('dotenv').config();

module.exports = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
};
~~~
5. En el archivo `app.js` requerir la versión 2 del módulo de `cloudinary`:
~~~
const cloudinary = require('cloudinary').v2;
const cloudinary_config = require('./config/cloudinary');
~~~
6. Una vez requerido el módulo y la configuración ejecutar el método `.config()`
~~~
cloudinary.config(cloudinary_config);
~~~
7. En el controlador correspondiente requerir la versión 2 del módulo de `cloudinary`
~~~
const cloudinary = require('cloudinary').v2;
~~~
8. Teniendo instalado y configurado el módulo que se encarga de subir archivos al servidor por ejemplo `multer` este debería devolver un objeto con la siguiente información:
~~~
{
  fieldname: 'poster',
  originalname: '1545598838_aquaman.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'public/uploads',
  filename: 'vrh155555_poster.jpg',
  path: 'public\\uploads\\vrh155555_poster.jpg',
  size: 20988
}
~~~
9. Obtenida esta información llamar de la propiedad `uploeader` el método `upload()`, pasándole como parámetro la propiedad `path` del objeto que devolvió `multer`. (en el siguiente ejemplo se está utilizando el método `.fields()` de multer)
~~~
const poster = req.files.poster && await cloudinary.uploader.upload(req.files.poster[0].path)
~~~
10. Una vez subida la imagen a *cloudinary*, este devuelve un objeto:
~~~
{
  asset_id: 'ef917e74ae0ae651cec516eade66aacb',
  public_id: 'zhcc7kmhl0xlyzlid99c',
  version: 1683143629,
  version_id: 'c6028d495d1e33f9ebd608302df352c3',
  signature: 'd4912ba901270d1a8d563e56c48143210eeabeef',
  width: 250,
  height: 375,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2023-05-03T19:53:49Z',
  tags: [],
  bytes: 20988,
  type: 'upload',
  etag: '3abfb718dc9e3055453e00afd6d3370c',
  placeholder: false,
  url: 'http://res.cloudinary.com/ericm76/image/upload/v1683143629/zhcc7kmhl0xlyzlid99c.jpg',
  secure_url: 'https://res.cloudinary.com/ericm76/image/upload/v1683143629/zhcc7kmhl0xlyzlid99c.jpg',
  folder: '',
  access_mode: 'public',
  original_filename: 'vrh155555_poster',
  api_key: '345518247673872'
}
~~~
11. Una vez obtenido esta información se procede a guardar lo conveniente en la base de datos por ejemplo los valores de las propiedades *url* o *secure_url* las que nos dan acceso a la imagen hosteada en *cloudinary* y la propiedad *public_id* que puede ser útil luego, como por ejemplo para eliminar la imagen de *cloudinary*.
12. Luego se puede eliminar la imagen del servidor:
~~~
poster && fs.unlinkSync(req.files.poster[0].path)
~~~
