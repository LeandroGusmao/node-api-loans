module.exports = async (request, should, host) => {
    it("It successfully executes /GET ", async () => {
        const loanList = await request(host).get("/loan")
        const id = loanList.body.result[0].id

        const res = await request(host).get(`/loan/${id}`)
        should(res.body.result.id).equal(id)
    })
}