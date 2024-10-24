import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type { UserBaseResponse, GetUserResponse, GetUsersFilters, GetUsersResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findAllUsers(skip: number, take: number, filters: GetUsersFilters): Promise<GetUsersResponse> {
		const [data, total] = await prismaClient.$transaction([
			prismaClient.users.findMany({
				orderBy: {
					created_at: 'desc',
				},
				where: {
					active: true,
					deleted_at: null,
					...filters,
				},
				include: {
					profile: true,
				},
				skip,
				take,
			}),
			prismaClient.users.count({
				where: {
					active: true,
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

	async findUserById(id: number): Promise<GetUserResponse | null> {
		const result = await prismaClient.users.findFirst({
			where: { id },
			include: {
				profile: true,
			},
		})
		return result
	}

	async findUserByFieldExcludingCurrent(
		id: number,
		field: string,
		value: string | number,
	): Promise<UserBaseResponse | null> {
		const result = await prismaClient.users.findFirst({
			where: {
				[field]: value,
				id: {
					not: id,
				},
			},
		})
		return result
	}
}

const UsersRepository = new Repository('users')

export default UsersRepository
