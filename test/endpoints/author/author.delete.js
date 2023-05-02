module.exports = async (request, should, host) => {
    it("It successfully executes /DELETE ", async () => {
        const response = await request(host).get("/author")
        const authorResponse = response.body.result[1]

        const author = {
            id: authorResponse.id,
        }

        const res = await request(host).delete("/author").send(author)
        should(res.body.result).equal(author.id)
    })
}