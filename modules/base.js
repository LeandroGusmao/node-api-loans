class BaseModule {
    constructor(rep, model) {
        this.model = model
        this.rep = {
            ...rep,
        }
    }

    async read(id) {
        return this.rep[this.model].read(id)
    }

    async list() {
        return this.rep[this.model].list()
    }

    async create(values) {
        return this.rep[this.model].create(values)
    }

    async update(id, values) {
        return this.rep[this.model].update(id, values)
    }

    async delete(id) {
        return this.rep[this.model].delete(id)
    }
    
}

module.exports = BaseModule