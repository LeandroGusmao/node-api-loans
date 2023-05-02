const request = require("supertest")
const should = require("should")
const orm = require("../schema/models")
const config = require("./../config")
const server = require("./../index")

try {
    const host = `localhost:${config.test.port}`

    const bookRepository = require("./repositories/book")
    const authorRepository = require("./repositories/author")
    const loanRepository = require("./repositories/loan")

    const authorCreateEndpoint = require("./endpoints/author/author.create")
    const authorListEndpoint = require("./endpoints/author/author.list")
    const authorReadEndpoint = require("./endpoints/author/author.read")
    const authorUpdateEndpoint = require("./endpoints/author/author.update")
    const authorDeleteEndpoint = require("./endpoints/author/author.delete")

    const bookCreateEndpoint = require("./endpoints/book/book.create")
    const bookListEndpoint = require("./endpoints/book/book.list")
    const bookReadEndpoint = require("./endpoints/book/book.read")
    const bookUpdateEndpoint = require("./endpoints/book/book.update")
    const bookDeleteEndpoint = require("./endpoints/book/book.delete")

    const loanCreateEndpoint = require("./endpoints/loan/loan.create")
    const loanListEndpoint = require("./endpoints/loan/loan.list")
    const loanReadEndpoint = require("./endpoints/loan/loan.read")
    const loanUpdateEndpoint = require("./endpoints/loan/loan.update")
    const loanDeleteEndpoint = require("./endpoints/loan/loan.delete")

    const authorModule = require('./modules/author')
    const bookModule = require('./modules/book')
    const loanModule = require('./modules/loan')

    describe("Testing Books API", async () => {
        it("Api should return message and code 200 \n", async () => {
            const res = await request(host).get("/home")

            should(res.body.result.message).equal("Api Up!")
        })

        before(async() => {
            await orm.sequelize.sync({force: true})
        })

        const rep = require("../repositories")(orm)
        const modules = require("../modules")(rep)

        describe("\n Testing repositories \n", async () => {
            describe("\n Author \n", async () => {    
                await authorRepository(rep, should)
            })
            describe("\n Book \n", async () => {
                await bookRepository(rep, should)
            })

            describe("\n Loan \n", async () => {
                await loanRepository(rep, should)
            })
        })

        describe("\n Testing endpoints \n", async () => {
            describe("Author - Create endpoint", async () => {
                await authorCreateEndpoint(request, should, host)
            })

            describe("Author - List endpoint", async () => {
                await authorListEndpoint(request, should, host)
            })

            describe("Author - Read endpoint", async () => {
                await authorReadEndpoint(request, should, host)
            })

            describe("Author - Update endpoint", async () => {
                await authorUpdateEndpoint(request, should, host)
            })

            describe("Author - Delete endpoint", async () => {
                await authorDeleteEndpoint(request, should, host)
            })           

            describe("Book - Create endpoint", async () => {
                await bookCreateEndpoint(request, should, host)
            }) 

            describe("Book - List endpoint", async () => {
                await bookListEndpoint(request, should, host)
            }) 

            describe("Book - Read endpoint", async () => {
                await bookReadEndpoint(request, should, host)
            })

            describe("Book - Update endpoint", async () => {
                await bookUpdateEndpoint(request, should, host)
            })

            describe("Book - Delete endpoint", async () => {
                await bookDeleteEndpoint(request, should, host)
            })

            describe("Loan - Create endpoint", async () => {
                await loanCreateEndpoint(request, should, host)
            })

            describe("Loan - List endpoint", async () => {
                await loanListEndpoint(request, should, host)
            })

            describe("Loan - Read endpoint", async () => {
                await loanReadEndpoint(request, should, host)
            })

            describe("Loan - Update endpoint", async () => {
                await loanUpdateEndpoint(request, should, host)
            })

            describe("Loan - Delete endpoint", async () => {
                await loanDeleteEndpoint(request, should, host)
            })
        })

        describe("\n Testing modules \n", async () => {
            describe("\n Author \n", async () => {    
                await authorModule(modules, should)
            })

            describe("\n Book \n", async () => {    
                await bookModule(modules, should)
            })

            describe("\n Loan \n", async () => {    
                await loanModule(modules, should)
            })
        })
    })

    after(() => {
        server.close()
        process.exit(0)
    })

} catch (err){
    console.log("Error starting test server. \n")
    console.log(err)
    server.close()
    process.exit(1)
}




