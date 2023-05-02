const Joi = require('joi');

const endpoint = async (req, res, mod) => {
    try {
        const {book_id, start_date, end_date} = req.params

        const loanValidate = Joi.object({
            book_id: Joi.string().uuid({version: 'uuidv4'}).required(),
            start_date: Joi.date().iso().required(),
            end_date: Joi.date().iso().required(),
        })

        const {error} = loanValidate.validate(req.params)
        if(error) {
            throw error.details[0].message
        }

        const book = await mod.book.read(book_id)
        if(!book) {
            return res.send(404, {message: "Book not found."})
        }

        const loanActive = await mod.loan.listLoanByBookId(book_id)
        if(loanActive.length === book.units) {
            return res.send(409,{message: "There are no units available for loan at this time."})
        }

        const loan = await mod.loan.create({book_id, start_date, end_date})

        res.success(loan)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint