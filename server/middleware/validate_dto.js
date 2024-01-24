const validateDto = (validate) => {
    return (req, res, next)=>{
        const valid = validate(req.body);
        if(!valid){
            const errors = validate.errors;
            return res.status(400).json(errors);
        }
        next();
    }
}

module.exports = validateDto;