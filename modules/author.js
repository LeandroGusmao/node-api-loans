const BaseModule = require("./base")

class AuthorModule extends BaseModule {
    constructor(rep){
        super(rep, "author")
        this.model = "author"
        this.rep = {
            ...rep,
        }
    }

    async findAuthorByName(name) {
        return await this.rep[this.model].findAuthorByName(name)
    }
}

module.exports = AuthorModule