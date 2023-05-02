const Joi = require("joi")

const endpoint = async (req, res, mod) => {
    try {
        const {id, name} = req.params

        const authorValidate = Joi.object({
            id: Joi.string().uuid({version: 'uuidv4'}).required(),
            name: Joi.string().required(),
        })

        const {error} = authorValidate.validate(req.params)
        if(error) {
            throw error.details[0].message
        }

        const author = await mod.author.update(id, { 
            name: name
        })

        res.success(author)
    } catch(error) {
        if(error.name === "SequelizeUniqueConstraintError" && error.original.constraint === "author_name_key") {
            return res.send(409, {error: "An author with that name already exists."});
        }

        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint