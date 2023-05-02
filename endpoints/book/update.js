const Joi = require('joi');

const endpoint = async (req, res, mod) => {
    try {
        const {id, name, author_id, year, units} = req.params

        const bookValidate = Joi.object({
            id: Joi.string().uuid({version: 'uuidv4'}).required(),
            name: Joi.string().required(),
            author_id: Joi.string().uuid({version: 'uuidv4'}).required(),
            year: Joi.number().integer().positive().required(),
            units: Joi.number().integer().positive().required(),
        })

        const {error} = bookValidate.validate(req.params)
        if(error) {
            throw error.details[0].message
        }

        const author = await mod.author.read(author_id)
  
        if(!author) {
            return res.send(404, {message: "Author not found."})
        }

        const book = await mod.book.update(id, {
            name, 
            author_id,
            year,
            units,
        })

        res.success(book)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint