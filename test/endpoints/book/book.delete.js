module.exports = async (request, should, host) => {
    it("It successfully executes /DELETE ", async () => {
        const response = await request(host).get("/book")
        const bookResponse = response.body.result[1]

        const book = {
            id: bookResponse.id,
        }

        const res = await request(host).delete("/book").send(book)
        should(res.body.result).equal(book.id)
    })
}