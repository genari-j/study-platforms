import { z } from 'zod'

export const bearerTokenSchema = z.string().min(1, 'Token inválido')

export const getUsersFiltersQuerySchema = z.object({
	name: z.string().optional(),
})

export const userParamsSchema = z.object({
	id: z.string().min(1, 'ID inválido'),
})

export const recoveryPasswordSchema = z.object({
	email: z.string().min(1, 'Email inválido'),
})

export const setNewPasswordSchema = z.object({
	password: z.string().min(1, 'Senha inválida'),
	confirmPassword: z.string().min(1, 'Senha inválida'),
})

export const signInBodySchema = z.object({
	email: z.string().min(1, 'E-mail inválido'),
	password: z.string().min(1, 'Senha inválida'),
})

export const signUpBodySchema = z.object({
	name: z.string().min(1, 'Nome inválido'),
	email: z
		.string()
		.min(1, 'E-mail inválido')
		.refine((value) => value.endsWith('@hotmail.com'), {
			message: 'O e-mail deve conter um domínio @hotmail.com',
		}),
	password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
	contact: z
		.string()
		.nullable()
		.refine((val) => val == null || val.length < 11, {
			message: 'O número deve conter no mínio 11 caracteres.',
		}),
	profile_id: z.number().min(1, 'Perfil inválido'),
})

export const updateUserBodySchema = z.object({
	name: z.string().min(1, 'Nome inválido'),
	email: z
		.string()
		.min(1, 'E-mail inválido')
		.refine((value) => value.endsWith('@hotmail.com'), {
			message: 'O e-mail deve conter um domínio @hotmail.com',
		}),
	contact: z
		.string()
		.optional()
		.refine((val) => val == null || val.length < 11, {
			message: 'O número deve conter no mínio 11 caracteres.',
		}),
	profile_id: z.number().optional(),
	active: z.boolean().optional(),
})

export const updateLoggedUserPswSchema = z.object({
	oldPsw: z.string().min(1, 'Senha antiga inválida'),
	newPsw: z.string().min(1, 'Nova Senha inválida'),
	confirmPsw: z.string().min(1, 'Confirmação inválida'),
})
