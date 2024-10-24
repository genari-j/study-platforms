import jwt from 'jsonwebtoken'
import prismaClient from '~/config/prisma-client'

import { env, bearerTokenSchema } from '~/validators/index'

export const decodeRequestAuthToken = async (token: string | undefined) => {
	try {
		const bearerToken = bearerTokenSchema.parse(token?.replace('Bearer ', ''))
		const result = jwt.verify(bearerToken, env.APP_SECRET as string)

		const { sub } = result

		const user = await prismaClient.users.findFirst({
			where: { id: Number(sub) },
		})

		return user
	} catch (err) {
		console.log(`Algo saiu como não esperado: ${err}`)
	}
}
