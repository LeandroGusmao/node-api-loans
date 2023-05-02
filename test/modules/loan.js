module.exports = async(mod, should) => {
    let loan_id = ""
    let loanMock = {}

    before(async() => {
        book_id = (await mod.book.list())[0].id

        loanMock = {
            book_id,
            start_date: "2023-05-01T00:00:00.000Z",
            end_date: "2023-06-01T00:00:00.000Z",
        }
    })

    it("It successfully executes create", async () => {
        const resp = await mod.loan.create(loanMock)
        loan_id = resp.id
        should(resp.book_id).equal(loanMock.book_id)
    })

    it("It successfully executes list", async () => {
        const resp = await mod.loan.list()
        should(resp.length).equal(2)
    })

    it("It successfully executes read", async () => {
        const resp = await mod.loan.read(loan_id)
        should(resp.book_id).equal(loanMock.book_id)
        should(resp.id).equal(loan_id)
    })

    it("It successfully executes update", async () => {
        const loanUpdate = {
            book_id: loanMock.book_id,
            start_date: new Date("2023-09-01T00:00:00.000Z"),
            end_date: new Date("2023-09-30T00:00:00.000Z"),
        }

        const resp = await mod.loan.update(loan_id, loanUpdate)

        should(resp.start_date).equal(loanUpdate.start_date)
        should(resp.end_date).equal(loanUpdate.end_date)
    })

    it("It successfully executes delete", async () => {
        const resp = await mod.loan.create(loanMock)
        const respDelete = await mod.loan.delete(resp.id)
        should(respDelete).equal(1)
    })

    it("It successfully executes listLoanByBookId", async () => {
        const loans = await mod.loan.listLoanByBookId(book_id)
        should(loans.length).equal(2)
    })
}