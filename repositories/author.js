const BaseRepository = require("./base")

class AuthorRepository extends BaseRepository{
    constructor(orm) {
        super("author", orm)
    }

    async findAuthorByName(name) {
        return await this.orm[this.model].findOne({
            where: {
                name,
            }
        })
    }
}

module.exports = AuthorRepository