const home = require("./endpoints")
const bookList = require("./endpoints/book/list")
const bookCreate = require("./endpoints/book/create")
const bookRead = require("./endpoints/book/read")
const bookUpdate = require("./endpoints/book/update")
const bookDelete = require("./endpoints/book/delete")
const authorList = require("./endpoints/author/list")
const authorCreate = require("./endpoints/author/create")
const authorUpdate = require("./endpoints/author/update")
const authorDelete = require("./endpoints/author/delete")
const authorRead = require("./endpoints/author/read")
const loanList = require("./endpoints/loan/list")
const loanCreate = require("./endpoints/loan/create")
const loanUpdate = require("./endpoints/loan/update")
const loanDelete = require("./endpoints/loan/delete")
const loanRead = require("./endpoints/loan/read")

const init = (server, mod) => {
    server.use((req, res, next) => {
        res.success = (result) => {
            return res.json(200, {
            result,
            })
        }
        res.error = (error) => {
            return res.json(400, {
            error,
            })
        }

        req.param = req?.body ? req.body : req.query

        return next()
    })

    server.get("/home", home)

    server.get("/book", async (req, res) => { await bookList(req, res, mod)})
    server.get("/book/:id", async (req, res) => { await bookRead(req, res, mod)})
    server.post("/book", async (req, res) => { await bookCreate(req, res, mod)})
    server.put("/book", async (req, res) => { await bookUpdate(req, res, mod)})
    server.del("/book", async (req, res) => { await bookDelete(req, res, mod)})

    server.get("/author", async (req, res) => { await authorList(req, res, mod)})
    server.get("/author/:id", async (req, res) => { await authorRead(req, res, mod)})
    server.post("/author", async (req, res) => { await authorCreate(req, res, mod)})
    server.put("/author", async (req, res) => { await authorUpdate(req, res, mod)})
    server.del("/author", async (req, res) => { await authorDelete(req, res, mod)})

    server.get("/loan", async (req, res) => { await loanList(req, res, mod)})
    server.get("/loan/:id", async (req, res) => { await loanRead(req, res, mod)})
    server.post("/loan", async (req, res) => { await loanCreate(req, res, mod)})
    server.put("/loan", async (req, res) => { await loanUpdate(req, res, mod)})
    server.del("/loan", async (req, res) => { await loanDelete(req, res, mod)})
}

module.exports.init = init