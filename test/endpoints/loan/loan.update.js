module.exports = async (request, should, host) => {
    it("It successfully executes /PUT ", async () => {
        const response = await request(host).get("/loan")
        const loanResponse = response.body.result[1]

        const loan = {
            id: loanResponse.id,
            start_date: "2023-02-01T00:00:00.000Z",
            end_date: "2023-08-01T00:00:00.000Z",
        }

            const res = await request(host).put("/loan").send(loan)
            should(res.body.result.start_date).equal(loan.start_date)
            should(res.body.result.end_date).equal(loan.end_date)    
    })
}