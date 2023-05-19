module.exports = (res,error) => {
    console.log(error);
    return res.status(error.status || 500).json({
        ok : false,
        status : error.status || 500,
        error : error.message || 'Upss, hubo un error :('
      });
}