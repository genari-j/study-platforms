import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type { GetMealsFilters, GetMealsResponse, GetMealResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findAllMeals(skip: number, take: number, userId: number, filters: GetMealsFilters): Promise<GetMealsResponse> {
		const [data, total] = await prismaClient.$transaction([
			prismaClient.meal.findMany({
				orderBy: {
					created_at: 'desc',
				},
				where: {
					user_id: userId,
					deleted_at: null,
					...filters,
				},
				include: {
					users: {
						include: {
							profile: true,
						},
					},
				},
				skip,
				take,
			}),
			prismaClient.meal.count({
				where: {
					user_id: userId,
					deleted_at: null,
					...filters,
				},
			}),
		])
		const pages = Math.ceil(total / take)
		const currentPage = Math.ceil(skip / take) + 1

		return {
			data,
			total,
			pages,
			currentPage,
		}
	}

	async findMealById(mealId: number): Promise<GetMealResponse | null> {
		const result = await prismaClient.meal.findFirst({
			where: { id: mealId },
			include: {
				users: {
					include: {
						profile: true,
					},
				},
			},
		})
		return result
	}
}

const MealsRepository = new Repository('meals')

export default MealsRepository
