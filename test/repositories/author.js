module.exports = async(rep, should) => {
    let id = ""

    it("Creates an author", async () => {
        const author = await rep.author.create({
            name: "JRR Tolkien",
        })
        should(author.id).not.equal(null)
        id = author.id
    })

    it("Reads an author", async () => {
        const author = await rep.author.read(id)
        should(author.name).equal("JRR Tolkien")
    })

    it("Updates an author", async () => {
        const author = await rep.author.update(id, { 
            name: "J.R.R Tokien"
        })
        should(author.name).equal("J.R.R Tokien")
    })

    it("List all authors", async () => {
        const authors = await rep.author.list()
        should(authors.length).equal(1)
    })

    it("Find by author name", async () => {
        const authorName = "J.R.R Tokien"
        const author = await rep.author.findAuthorByName(authorName)
        should(author.name).equal(authorName)
    })
}