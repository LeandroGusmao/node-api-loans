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
}

module.exports = LoanModule