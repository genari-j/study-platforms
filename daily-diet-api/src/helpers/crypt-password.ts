import { genSalt, hash } from 'bcryptjs'
import { env } from '~/validators/index'

export const cryptPassword = async (password: string | undefined): Promise<string> => {
	if (!password) {
		throw new Error('A senha deve conter pelo menos 6 caracteres')
	}

	try {
		const salt = await genSalt(Number(env.BCRYPT_SALT_ROUNDS))
		return await hash(password, salt)
	} catch (error) {
		console.error(`Ocorreu algum erro ao aplicar o Hash de Senha: ${error}`)
		throw error
	}
}
