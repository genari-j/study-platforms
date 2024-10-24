import type { Prisma } from '@prisma/client'

export interface GetUsersFilters {
	name?: string
}

export interface SignInTokenResponse {
	token: string
}

export type UserBaseResponse = {
	id: number
	name: string
	email: string
	password: string
	contact: string | null
	profile_id: number
	active: boolean
	avatar: string | null
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type CreateUserBody = Omit<
	UserBaseResponse,
	'id' | 'active' | 'avatar' | 'created_at' | 'updated_at' | 'deleted_at'
> & { password: string }

export type UpdateUserBody = Partial<Omit<UserBaseResponse, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>>

export type UserWithProfileResponse = Prisma.UsersGetPayload<{
	include: {
		profile: true
	}
}>

export interface GetUsersResponse {
	data: UserWithProfileResponse[]
	total: number
	pages: number
	currentPage: number
}

export type GetUserResponse = UserWithProfileResponse
