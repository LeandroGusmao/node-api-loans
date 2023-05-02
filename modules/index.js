const AuthorModule = require("./author")
const BookModule = require("./book")
const LoanModule = require('./loan')

module.exports = (rep) => {
    return {
        author: new AuthorModule(rep),
        book: new BookModule(rep),
        loan: new LoanModule(rep)
    }
}