module.exports = async (request, should, host) => {
    it("It successfully executes /PUT ", async () => {
        const response = await request(host).get("/author")
        const authorResponse = response.body.result[1]

        const author = {
            id: authorResponse.id,
            name: `${authorResponse.name} - New Test`,
        }

        const res = await request(host).put("/author").send(author)
        should(res.body.result.name).equal(author.name)
    })
}