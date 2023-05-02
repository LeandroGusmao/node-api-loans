module.exports = async (request, should, host) => {
    it("It successfully executes /DELETE ", async () => {
        const response = await request(host).get("/loan")
        const loanResponse = response.body.result[1]

        const loan = {
            id: loanResponse.id,
        }

        const res = await request(host).delete("/loan").send(loan)
        should(res.body.result).equal(loan.id)
    })
}