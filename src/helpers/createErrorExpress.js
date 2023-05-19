const fs = require('fs');

module.exports = (errors, req) => {
    let errorMessages = {};
    let errorsObject = errors.mapped();
    console.log(req.files);

    if(req.files){
        req.files.poster && fs.unlinkSync('public/uploads/' + req.files.poster[0].filename)
        req.files.banner && fs.unlinkSync('public/uploads/' + req.files.banner[0].filename)
        req.files.thumbnail && fs.unlinkSync('public/uploads/' + req.files.thumbnail[0].filename)
    } 

    if(req.fileValidationError){
        errorsObject = {
            ...errorsObject,
            images : {
                msg : req.fileValidationError
            }
        }
    }

    for (const key in errorsObject) {
        //console.log(key, [key])
        errorMessages = {
            ...errorMessages,
            [key] : errorsObject[key].msg
        }
    }

    let error = new Error()
    error.status = 400;
    error.message = errorMessages
    
    return error

}