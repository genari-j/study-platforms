import { RestRepository } from '~/models/repositories/index'

class Repository extends RestRepository {}

const ProfilesRepository = new Repository('profiles')

export default ProfilesRepository
