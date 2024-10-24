import type { FastifyRequest, FastifyReply } from 'fastify'

import type { MealsInterfaceRepository } from '~/models/interfaces/index'

import { decodeRequestAuthToken } from '~/helpers/index'
import type { MealBaseResponse, GetMealsResponse, GetMealResponse, UpdateMealBody } from '~/@types/index'
import { env, getMealsFiltersQuerySchema } from '~/validators/index'

import { createMealBodySchema, mealParamsSchema, updateMealBodySchema } from '~/validators/index'

export class MealsController {
	private readonly mealsRepository: MealsInterfaceRepository

	constructor(mealsRepository: MealsInterfaceRepository) {
		this.mealsRepository = mealsRepository
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetMealsResponse | undefined> {
		try {
			const { authorization } = request.headers

			const { page = env.INITIAL_DATA_OFFSET, limit = env.LIST_PER_PAGE } = request.query as {
				page?: string
				limit?: string
			}
			const skip = (Number(page) - 1) * Number(limit)

			const { name, diet } = getMealsFiltersQuerySchema.parse(request.query)
			const filters = { name, diet }

			const user = await decodeRequestAuthToken(authorization)

			const { data, total, pages, currentPage } = await this.mealsRepository.findAllMeals(
				skip,
				Number(limit),
				Number(user?.id),
				filters,
			)

			const mappedMeals = data?.map((meal) => {
				return {
					id: meal.id,
					name: meal.name,
					description: meal.description,
					diet: meal.diet,
					date: meal.date,
					user: {
						user_id: meal.user_id,
						name: meal.users.name,
					},
					created_at: meal.created_at,
					updated_at: meal.updated_at,
					deleted_at: meal.deleted_at,
				}
			})

			return reply.code(200).send({
				error: false,
				data: mappedMeals,
				limit: Number(limit),
				total,
				pages,
				currentPage,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async getById(request: FastifyRequest, reply: FastifyReply): Promise<GetMealResponse | undefined> {
		try {
			const { id } = mealParamsSchema.parse(request.params)

			const mealById = await this.mealsRepository.findMealById(Number(id))
			if (!mealById) {
				return reply.code(404).send({
					error: true,
					message: 'A refeição especificada não existe.',
				})
			}

			const meal = {
				id: mealById.id,
				name: mealById.name,
				description: mealById.description,
				diet: mealById.diet,
				date: mealById.date,
				user: {
					user_id: mealById.user_id,
					name: mealById.users.name,
				},
				created_at: mealById.created_at,
				updated_at: mealById.updated_at,
				deleted_at: mealById.deleted_at,
			}

			return reply.code(200).send({
				error: false,
				data: meal,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async create(request: FastifyRequest, reply: FastifyReply): Promise<MealBaseResponse | undefined> {
		try {
			const { name, description, date, diet, user_id } = createMealBodySchema.parse(request.body)

			const payload = {
				name,
				description,
				date,
				diet,
				user_id,
			}

			const mealCreated = await this.mealsRepository.create(payload)

			return reply.code(201).send({
				error: false,
				data: mealCreated,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async update(request: FastifyRequest, reply: FastifyReply): Promise<MealBaseResponse | undefined> {
		try {
			const { id } = mealParamsSchema.parse(request.params)
			const { name, description, date, diet } = updateMealBodySchema.parse(request.body)

			const mealById = await this.mealsRepository.findMealById(Number(id))
			if (!mealById) {
				return reply.code(404).send({
					error: true,
					message: 'A refeição informada não existe.',
				})
			}

			const payload: UpdateMealBody = {}

			if (name) {
				payload.name = name
			}
			if (description) {
				payload.description = description
			}
			if (date) {
				payload.date = date
			}
			if (diet) {
				payload.diet = diet
			}

			if (Object.keys(payload).length) {
				await this.mealsRepository.findByIdAndUpdate(Number(id), payload)
			}

			return reply.code(200).send({
				error: false,
				message: 'A refeição foi atualizado.',
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async disable(request: FastifyRequest, reply: FastifyReply): Promise<void> {
		try {
			const { id } = mealParamsSchema.parse(request.params)

			if (!id) {
				return reply.status(400).send({ error: true, message: 'ID da refeição não informado.' })
			}

			const meal = await this.mealsRepository.findOneBy('id', Number(id))
			if (!meal) {
				return reply.status(404).send({ error: true, message: 'A refeição informada não existe.' })
			}

			const payload = {
				active: false,
			}

			await this.mealsRepository.findByIdAndUpdate(Number(id), payload)

			return reply.status(204).send()
		} catch (err) {
			reply.status(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}
}
