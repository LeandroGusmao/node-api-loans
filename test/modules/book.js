module.exports = async(mod, should) => {
    let bookMock = {}
    let book_id = ""

    before(async() => {
        const author_id = (await mod.author.list())[0].id

        bookMock = {
            name: "O alquimista",
            author_id,
            year: 2017,
            units: 1
        }
    })

    it("It successfully executes create", async () => {
        const resp = await mod.book.create(bookMock)
        book_id = resp.id
        should(resp.name).equal(bookMock.name)
        should(resp.year).equal(bookMock.year)
        should(resp.units).equal(bookMock.units)
        should(resp.author_id).equal(bookMock.author_id)
    })

    it("It successfully executes list", async () => {
        const resp = await mod.book.list()
        should(resp.length).equal(2)
    })

    it("It successfully executes read", async () => {
        const resp = await mod.book.read(book_id)
        should(resp.name).equal(bookMock.name)
        should(resp.id).equal(book_id)
    })

    it("It successfully executes update", async () => {
        const bookUpdate = {
            name: "O diário de um mago",
            author_id: bookMock.author_id,
            year: 2017,
            units: 2
        }

        const resp = await mod.book.update(book_id, bookUpdate)

        should(resp.name).equal("O diário de um mago")
        should(resp.units).equal(2)
        should(resp.author_id).equal(bookMock.author_id)
    })

    it("It successfully executes delete", async () => {
        const resp = await mod.book.create(bookMock)
        const respDelete = await mod.book.delete(resp.id)
        should(respDelete).equal(1)
    })

    it("It successfully executes listBookByAuthorId", async () => {
        const resp = await mod.book.listBookByAuthorId(bookMock.author_id)
        should(resp.length).equal(2)
    })
}