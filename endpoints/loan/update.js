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

        const loanActive = await mod.loan.read(id)
        if(!loanActive) {
            return res.send(404, {message: "Loan not found."})
        }

        const loan = await mod.loan.update(id, {
            start_date, end_date
        })

        res.success(loan)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint