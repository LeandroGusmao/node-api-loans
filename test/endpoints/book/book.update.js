module.exports = async (request, should, host) => {
    it("It successfully executes /PUT ", async () => {
        const response = await request(host).get("/book")
        const bookResponse = response.body.result[1]

        const book = {
            id: bookResponse.id,
            name: `${bookResponse.name} - New Test`,
            author_id: bookResponse.author_id,
            year: 2020,
            units: 1
        }

            const res = await request(host).put("/book").send(book)
            should(res.body.result.name).equal(book.name)
        
    })
}