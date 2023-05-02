module.exports = async(mod, should) => {
    let author_id = ""
    const authorMock = {
        name: "Paulo Coelho"
    }

    it("It successfully executes create", async () => {
        const resp = await mod.author.create(authorMock)
        author_id = resp.id
        should(resp.name).equal(authorMock.name)
    })

    it("It successfully executes list", async () => {
        const resp = await mod.author.list()
        should(resp.length).equal(2)
    })

    it("It successfully executes read", async () => {
        const resp = await mod.author.read(author_id)
        should(resp.name).equal(authorMock.name)
        should(resp.id).equal(author_id)
    })

    it("It successfully executes update", async () => {
        const resp = await mod.author.update(author_id, { 
            name: "P. Coelho"
        })
        should(resp.name).equal("P. Coelho")
    })

    it("It successfully executes delete", async () => {
        const resp = await mod.author.create(authorMock)
        const respDelete = await mod.author.delete(resp.id)
        should(respDelete).equal(1)

    })
}