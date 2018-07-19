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
    confirmUser: (schema) => {
        return (req, res, next) => {

            const result = Joi.validate(req.user.status, schema);
            if(result.error){
                return res.status(422).json({error : "user not confirmed"});
            }
            
            if(!req.value) {
                req.value = {};
            }
            req.value['user'] = result.value;
            next();
        }
    },
    schemas: {
        
        //consider length
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            lozinka: Joi.string().required()
        }),

        confirmedSchema: Joi.boolean().invalid(false).required(),

        userDataSchema: Joi.object().keys({
            ime: Joi.string().required(),
            prezime: Joi.string().required()
        }),
    }
}