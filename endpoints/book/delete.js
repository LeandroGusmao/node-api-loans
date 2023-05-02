const Joi = require('joi');

const endpoint = async (req, res, mod) => {
    try {
        const {id} = req.params

        const bookValidate = Joi.object({
            id: Joi.string().uuid({version: 'uuidv4'}).required(),
        })

        const {error} = bookValidate.validate(req.params)
        if(error) {
            throw error.details[0].message
        }

        const book = await mod.book.read(id)
        if(!book) {
            return res.send(404, {message: "Book not found."})
        }

        const loans = await mod.loan.listLoanByBookId(id)
        if(loans.length) {
            return res.send(409, {message: "It is not allowed to delete a book because there are loans linked to it."})
        }        

        await mod.book.delete(id)

        res.success(id)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint