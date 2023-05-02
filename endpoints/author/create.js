const Joi = require("joi")

const endpoint = async (req, res, mod) => {
    try {
        const {name} = req.params

        const authorValidate = Joi.object({
            name: Joi.string().required(),
        })

        const {error} = authorValidate.validate(req.params)
        if(error) {
            throw error.details[0].message
        }

        const authorName = await mod.author.findAuthorByName(name);
        if(authorName) {
            return res.send(409, {error: "An author with that name already exists."});
        }

        const author = await mod.author.create({
            name, 
        })

        res.success(author)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint