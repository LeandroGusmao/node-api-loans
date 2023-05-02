const Joi = require("joi")

const endpoint = async (req, res, mod) => {
    try {
        const {id} = req.params

        const authorValidate = Joi.object({
            id: Joi.string().uuid({version: 'uuidv4'}).required(),
        })

        const {error} = authorValidate.validate(req.params)
        if(error) {
            throw error.details[0].message
        }

        const author = await mod.author.read(id)
        if(!author) {
            return res.send(404, {message: "Author not found."})
        }

        const authorBooks = await mod.book.listBookByAuthorId(id)
        if(authorBooks.length) {
            return res.send(409, {message: "It is not allowed to delete a author because there are books linked to it."})
        }  

        await mod.author.delete(id)

       res.success(id)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint