module.exports = async (request, should, host) => {
    it("It successfully executes /GET ", async () => {
        const res = await request(host).get("/author")
   
        should(res.body.result.length).equal(2)
    })
}