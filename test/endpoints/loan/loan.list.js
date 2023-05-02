module.exports = async (request, should, host) => {
    it("It successfully executes /GET ", async () => {
        const res = await request(host).get("/loan")
   
        should(res.body.result.length).equal(2)
    })
}