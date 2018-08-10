module.exports = function ()  {
    return async (req, res, next) => {
        //
        const requestData = req.body;

        const secondSave = ['amenities','pictures','videos'];

        const toSaveProperties = Object.keys(requestData)
            .filter(key => !secondSave.includes(key))
            .reduce((obj, key) => {
                obj[key] = requestData[key];
                return obj;
            }, {});
        
        const toSaveSecondProperties = Object.keys(requestData)
        .filter(key => secondSave.includes(key))
        .reduce((obj, key) => {
            obj[key] = requestData[key];
            return obj;
        }, {});

        req.value['toSaveProperties'] = toSaveProperties;
        req.value['toSaveSecondProperties'] = toSaveSecondProperties;
        next();
    }  
}