class BaseRepository {
    constructor(model, orm) {
        this.model = model
        this.orm = orm
    }

    async read(id) {
        return await this.orm[this.model].findOne({
            where: {
                id,
            }
        })
    }

    async list() {
        return await this.orm[this.model].findAll()
    }

    async create(values) {
        return await this.orm[this.model].create({
            ...values,
        })
    }

    async update(id, values) {
        const obj = await this.read(id)

        if (obj) {
            return await obj.update({
                ...values,
            })
        } else {
            return false
        }
    }

    async delete(id) {
        return await this.orm[this.model].destroy({
            where: {
                id,
            }
        })
    }
    
}

module.exports = BaseRepository