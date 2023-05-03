const Joi = require('joi');

const endpoint = async (req, res, mod) => {
    try {
        const {id, start_date, end_date} = req.params

        const loanValidate = Joi.object({
            id: Joi.string().uuid({version: 'uuidv4'}).required(),
            start_date: Joi.date().iso().required(),
            end_date: Joi.date().iso().required(),
        })

        const {error} = loanValidate.validate(req.params)
        if(error) {
            throw error.details[0].message
        }

        const loan = await mod.loan.loanUpdate({id, start_date, end_date})
        if(loan.error) {
            return res.send(409, loan)
        }

        res.success(loan)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint