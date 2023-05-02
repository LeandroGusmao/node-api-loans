module.exports = async(rep, should) => {
    let id = ""
    let book_id = ""

    before(async() => {
        book_id = (await rep.book.list())[0].id
    })

    it("Creates a loan", async () => {
        const loan = await rep.loan.create({
            book_id,
            start_date: "2023-04-30T00:00:00.000Z",
            end_date: "2023-05-11T00:00:00.000Z",
        })
        should(loan.id).not.equal(null)
        id = loan.id
    })

    it("Reads a loan", async () => {
        const loan = await rep.loan.read(id)
        should(loan.id).equal(id)
    })

    it("Updates a loan", async () => {
        const loanUpdate = {
            start_date: new Date("2023-05-01T00:00:00.000Z"),
            end_date: new Date("2023-06-01T00:00:00.000Z"),
        }

        const loan = await rep.loan.update(id, { 
            ...loanUpdate
        })

        should(loan.start_date).equal(loanUpdate.start_date)
        should(loan.end_date).equal(loanUpdate.end_date)
    })

    it("List all loans", async () => {
        const loans = await rep.loan.list()
        should(loans.length).equal(1)
    })

    it("List all by book_id", async () => {
        const loans = await rep.loan.listLoanByBookId(book_id)
        should(loans.length).equal(1)
    })
}