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

        res.success(author)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint