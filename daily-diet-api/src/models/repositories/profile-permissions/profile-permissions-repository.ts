import { RestRepository } from '~/models/repositories/index'

class Repository extends RestRepository {}

const ProfilePermissionsRepository = new Repository('profile_permission')

export default ProfilePermissionsRepository
