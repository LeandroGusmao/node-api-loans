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

        res.success(book)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint