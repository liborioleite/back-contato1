import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

    public async login({ request, response, auth }: HttpContextContract) {

        const {username,password} = request.body()

        const token = await auth.use('jwt').attempt(username,password)

        return token.toJSON()

    }

}
