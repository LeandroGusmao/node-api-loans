module.exports = async (request, should, host) => {
    it("It successfully executes /POST ", async () => {

        const bookList = await request(host).get("/book")
        const bookResult = bookList.body.result[0]

        const loan = {
            book_id: bookResult.id,
            start_date: "2023-05-01T00:00:00.000Z",
            end_date: "2023-06-01T00:00:00.000Z",
        }

        const res = await request(host).post("/loan").send(loan)
   
        should(loan.start_date).equal(res.body.result.start_date)
        should(loan.end_date).equal(res.body.result.end_date)
        should(res.body.result.book_id).equal(bookResult.id)
    })
}
