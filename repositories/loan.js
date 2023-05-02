const BaseRepository = require("./base")

class LoanRepository extends BaseRepository{
    constructor(orm) {
        super("loan", orm)
    }

    async listLoanByBookId(bookId) {
        return await this.orm[this.model].findAll({
            where: {
                book_id: bookId,
            }
        })
    }
}

module.exports = LoanRepository