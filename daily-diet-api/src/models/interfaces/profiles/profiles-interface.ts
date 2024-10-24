import type { GetProfilesResponse } from '~/@types/index'

export interface ProfilesInterfaceRepository {
	findOneBy(field: string | number, value: string | number | undefined): Promise<GetProfilesResponse | null>
}
