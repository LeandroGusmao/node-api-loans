const BaseModule = require("./base")
class LoanModule extends BaseModule {
    constructor(rep){
        super(rep, "loan")
        this.model = "loan"
        this.rep = {
            ...rep,
        }
    }

    async listLoanByBookId(bookId) {
        return await this.rep[this.model].listLoanByBookId(bookId)
    }

    async loanCreate(data) {
        const {book_id, start_date, end_date} = data
        
        const book = await this.rep.book.read(book_id)
        if(!book) {
            return {error: true, message: "Book not found."}
        }

        const loanActive = await listLoanByBookId(book_id)
        if(loanActive.length === book.units) {
            return {error: true, message: "There are no units available for loan at this time."}
        }

        return await this.rep[this.model].create({book_id, start_date, end_date})
    }

    async loanUpdate(data) {
        const {id, start_date, end_date} = data
        
        const loanActive = await this.rep.loan.read(id)
        if(!loanActive) {
            return {error: true, message: "Loan not found."}
        }

        return await this.rep[this.model].update(id, {
            start_date, end_date
        })
    }
}

module.exports = LoanModule