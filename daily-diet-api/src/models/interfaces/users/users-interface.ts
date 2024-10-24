import type {
	CreateUserBody,
	UpdateUserBody,
	UserBaseResponse,
	GetUserResponse,
	GetUsersFilters,
	GetUsersResponse,
} from '~/@types/index'

interface UsersInterfaceRepository {
	create(data: CreateUserBody): Promise<UserBaseResponse>
	findOneBy(field: string | number, value: string | number | undefined): Promise<UserBaseResponse | null>
	findAllUsers(skip: number, limit: number, filters: GetUsersFilters): Promise<GetUsersResponse>
	findUserById(id: number): Promise<GetUserResponse | null>
	findUserByFieldExcludingCurrent(id: number, field: string, value: string | number): Promise<UserBaseResponse | null>
	findByIdAndUpdate(id: number, payload: UpdateUserBody): Promise<UserBaseResponse | null>
}

export type { UsersInterfaceRepository }
