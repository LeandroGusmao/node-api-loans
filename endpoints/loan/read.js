const Joi = require('joi');

const endpoint = async (req, res, mod) => {
    try {
        const {id} = req.params

        const loanValidate = Joi.object({
            id: Joi.string().uuid({version: 'uuidv4'}).required(),
        })

        const {error} = loanValidate.validate(req.params)
        if(error) {
            throw error.details[0].message
        }

        const loan = await mod.loan.read(id)
        if(!loan) {
            return res.send(404, {message: "Loan not found."})
        } 

        res.success(loan)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint