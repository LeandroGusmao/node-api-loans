module.exports = async (request, should, host) => {
    it("It successfully executes /POST ", async () => {
        const author = {
            name: "Dan Brown",
        }

        const res = await request(host).post("/author").send(author)
   
        should(res.body.result.name).equal(author.name)
    })
}