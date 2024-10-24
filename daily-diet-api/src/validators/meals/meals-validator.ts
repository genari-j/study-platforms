import { z } from 'zod'

export const mealParamsSchema = z.object({
	id: z.string().min(1, 'ID inválido'),
})

export const getMealsFiltersQuerySchema = z.object({
	name: z.string().optional(),
	diet: z.boolean().optional(),
})

export const createMealBodySchema = z.object({
	name: z.string().min(1, 'Nome inválido'),
	description: z.string().min(1, 'Descrição inválida'),
	date: z
		.string()
		.min(1, 'Data inválida')
		.transform((date) => new Date(date)),
	diet: z.boolean().refine((val) => val !== null, {
		message: 'Dieta inválida',
	}),
	user_id: z.number().min(1, 'Usuário inválido'),
})

export const updateMealBodySchema = z.object({
	name: z.string().min(1, 'Nome inválido'),
	description: z.string().min(1, 'Descrição inválida'),
	date: z
		.string()
		.min(1, 'Data inválida')
		.transform((date) => new Date(date)),
	diet: z.boolean().refine((val) => val !== null, {
		message: 'Dieta inválida',
	}),
})
