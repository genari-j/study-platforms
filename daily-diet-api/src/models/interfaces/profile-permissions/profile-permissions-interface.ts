import type { GetProfilePermissionsResponse } from '~/@types/index'

export interface ProfilePermissionsInterfaceRepository {
	findOneBy(field: string | number, value: string | number | undefined): Promise<GetProfilePermissionsResponse | null>
}
