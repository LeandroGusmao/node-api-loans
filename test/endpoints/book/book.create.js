module.exports = async (request, should, host) => {
    it("It successfully executes /POST", async () => {

        const authorList = await request(host).get("/author")
        const authorResult = authorList.body.result[0]

        const book = {
            name: "The Da Vinci Code",
            author_id: authorResult.id,
            year: 2023,
            units: 5
        }

        const res = await request(host).post("/book").send(book)
   
        should(res.body.result.name).equal("The Da Vinci Code")
        should(res.body.result.author_id).equal(authorResult.id)
    })
}