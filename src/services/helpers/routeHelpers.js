const Joi = require('joi');

module.exports  = {
    
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            
            if(!req.value) {
                req.value = {};
            }
            req.value['body'] = result.value;
            next();
        }
    },
    schemas: {
        //consider length
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            lozinka: Joi.string().required()
        }),
        confirmedSchema: Joi.object().keys({
            status: Joi.boolean().invalid(false).required(),
        }),
    }
}