import type { Prisma } from '@prisma/client'

export type GetMealsFilters = Partial<
	Omit<MealBaseResponse, 'id' | 'description' | 'date' | 'user_id' | 'created_at' | 'updated_at' | 'deleted_at'>
>

export interface MealBaseResponse {
	id: number
	name: string
	description: string
	date: Date
	diet: boolean
	user_id: number
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type CreateMealBody = Omit<MealBaseResponse, 'id' | 'active' | 'created_at' | 'updated_at' | 'deleted_at'>

export type UpdateMealBody = Partial<
	Omit<MealBaseResponse, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'deleted_at'>
>

type PrismaMealsType = Prisma.MealGetPayload<{
	include: {
		users: {
			include: {
				profile: true
			}
		}
	}
}>

export interface GetMealsResponse {
	data: PrismaMealsType[]
	total: number
	pages: number
	currentPage: number
}

export type GetMealResponse = PrismaMealsType
