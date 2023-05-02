module.exports = async (request, should, host) => {
    it("It successfully executes /GET ", async () => {
        const bookList = await request(host).get("/book")
        const id = bookList.body.result[0].id

        const res = await request(host).get(`/book/${id}`)
        should(res.body.result.id).equal(id)
    })
}