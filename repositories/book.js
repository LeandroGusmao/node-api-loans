const BaseRepository = require("./base")

class BookRepository extends BaseRepository{
    constructor(orm) {
        super("book", orm)
    }

    async listBookByAuthorId(authorId) {
        return await this.orm[this.model].findAll({
            where: {
                author_id: authorId,
            }
        })
    }
}

module.exports = BookRepository