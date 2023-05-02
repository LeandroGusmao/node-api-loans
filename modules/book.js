const BaseModule = require("./base")
class BookModule extends BaseModule {
    constructor(rep){
        super(rep, "book")
        this.model = "book"
        this.rep = {
            ...rep,
        }
    }

    async listBookByAuthorId(authorId) {
        return await this.rep[this.model].listBookByAuthorId(authorId)
    }
}

module.exports = BookModule