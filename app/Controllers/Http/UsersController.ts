import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {

    public async index({ response }: HttpContextContract) {

        const user = await User.all()

        if (!user) {
            return response.notFound('Nenhum registro encontrado.')
        }

        console.log(user);

        return response.ok(user)
    }

    public async store({ response, request }: HttpContextContract) {

        const itemSchema = schema.create({

            email: schema.string(),
            username: schema.string(),
            password: schema.string(),
            first_name: schema.string(),
            last_name: schema.string(),
            sex: schema.string(),
            city: schema.string(),
            is_valid: schema.boolean(),
            is_actived: schema.boolean(),
            age: schema.number(),
            type: schema.string(),
        })

        const payload = await request.validate({ schema: itemSchema })

        const user = await User.create({

            username: payload.username,
            email: payload.email,
            password: payload.password,
            first_name: payload.first_name,
            last_name: payload.last_name,
            sex: payload.sex,
            city: payload.city,
            is_valid: payload.is_valid,
            is_actived: payload.is_actived,
            age: payload.age,
            type: payload.type,
        })

        return response.ok(user)

    }

    public async update({ response, request, params }: HttpContextContract) {

        const itemSchema = schema.create({

            name: schema.string(),
            age: schema.number(),
            username: schema.string(),
            email: schema.string(),
            password: schema.string(),
            type: schema.string(),
        })

        const payload = await request.validate({ schema: itemSchema })

        const user = await User.findBy('id', params.id)
        // const user = await User.find(params.id)
        // const user = await User.find(request.param('id'))
        // const user = await User.find(request.param('id', 1))

        if (!user) {
            return response.notFound('Nenhum usuário encontrado.')
        }

        user.merge(payload)
        await user.save()

        return response.ok('Dados alterados com sucesso')
    }

    public async destroy({ response, params }: HttpContextContract) {

        const user = await User.findBy('id', params.id)
        // const user = await User.find(params.id)
        // const user = await User.find(request.param('id'))
        // const user = await User.find(request.param('id', 1))

        if (!user) {
            return response.notFound('usuário não encontrado.')
        }

        await user.delete()

        return response.ok('Usuário deletado com sucesso.')
    }

    public async show({ response, params, request }: HttpContextContract) {

        const user = await User.findBy('id', params.id)
        // const user = await User.find(params.id)
        // const user = await User.find(request.param('id'))
        // const user = await User.find(request.param('id', 1))

        if (!user) {
            return response.notFound('Usuário não encontrado.')
        }

        return user
    }

}