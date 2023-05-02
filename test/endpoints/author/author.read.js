module.exports = async (request, should, host) => {
    it("It successfully executes /GET ", async () => {
        const authorList = await request(host).get("/author")
        const id = authorList.body.result[0].id

        const res = await request(host).get(`/author/${id}`)
        should(res.body.result.id).equal(id)
    })
}