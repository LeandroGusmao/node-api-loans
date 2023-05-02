const AuthorRepository = require("./author")
const BookRepository = require("./book")
const LoanRepository = require("./loan")

module.exports = (orm) => {
    return {
        book: new BookRepository(orm),
        author: new AuthorRepository(orm),
        loan: new LoanRepository(orm)
    }
}