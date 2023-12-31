const knex = require("../database/knex")
const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")

class UsersController {
    async create(req, res) {
        const { name, email, password } = req.body

        const checkIfUserExists = await knex("users").where({ email })

        if (checkIfUserExists.length > 0) {
            throw new AppError(`Endereço de e-mail já está cadastrado.`)
        }

        const hashedPassword = await hash(password, 8)

        await knex("users").insert({ name, email, password: hashedPassword })

        return res.status(201).json(`Usuário cadastrado com sucesso!`)
    }

    async update(req, res) {
        const { name, email, password, old_password } = req.body
        const id = req.user.id

        const user = await knex("users").where({ id }).first()
    
        if (!user) {
            throw new AppError(`Usuário não encontrado no sistema.`)
        }

        const userWithUpdatedEmail = await knex("users").where({ email }).first()
    
        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id ) {
            throw new AppError(`Endereço de e-mail já está em uso.`)
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if (password && !old_password) {
            throw new AppError(`Você precisa informar a senha antiga para definir a nova senha`)
        }
        
        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)
        
            if (!checkOldPassword) {
                throw new AppError(`A senha antiga não confere!`)
            }

            user.password = await hash(password, 8)
        }

        await knex("users").update({ name, email, password: user.password, updated_at: knex.fn.now() }).where({ id })
    
        return res.status(201).json(`Usuário atualizado com sucesso!`)
    }

}

module.exports = UsersController;