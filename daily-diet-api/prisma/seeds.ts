import { checkingDBToInsertSeeds } from '~/helpers/index'

async function execSeeds() {
	console.table('Iniciando a inserção das seeds 😊')

	// PROFILES
	const profiles = [
		{
			name: 'Admin',
			description: 'Poderá executar todas operações do sistema',
		},
		{
			name: 'Gestor de área',
			description: 'Poderá visualizar todas informações e realizar novos cadastros',
		},
		{
			name: 'Funcionário',
			description: 'Poderá apenas visualizar todas informações',
		},
	]
	await checkingDBToInsertSeeds(profiles, 'profile', 'name')
	console.table('Perfis inseridos com sucesso.')

	// PROFILE PERMISSIONS
	const profilePermissions = [
		{
			code: 'ADM',
			description: 'Poderá executar todas operações do sistema',
			profiles: '1',
		},
		{
			code: 'GA',
			description: 'Poderá visualizar todas informações e realizar novos cadastros',
			profiles: '2',
		},
		{
			code: 'FUN',
			description: 'Poderá apenas visualizar todas informações',
			profiles: '3',
		},
	]
	await checkingDBToInsertSeeds(profilePermissions, 'profile_permission', 'code')
	console.table('Permissões dos perfis inseridas com sucesso.')

	// USERS
	const users = [
		{
			name: 'Administrador',
			email: 'admin@hotmail.com',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11922225555',
			profile_id: 1,
		},
		{
			name: 'Gestor de Área',
			email: 'manager@hotmail.com',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11988889999',
			profile_id: 2,
		},
		{
			name: 'Funcionário',
			email: 'colaborator@hotmail.com',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11911113333',
			profile_id: 3,
		},
	]
	await checkingDBToInsertSeeds(users, 'users', 'email')
	console.table('Usuários inseridos com sucesso.')

	// MEALS
	const meals = [
		{
			name: 'Arroz',
			description: '98 gramas de arroz cozido',
			date: new Date(),
			diet: false,
			user_id: 1,
		},
		{
			name: 'Feijão',
			description: '74 gramas de feijão cozido',
			date: new Date(),
			diet: false,
			user_id: 2,
		},
		{
			name: 'Bananas',
			description: 'Duas bananas prata',
			date: new Date(),
			diet: false,
			user_id: 3,
		},
	]
	await checkingDBToInsertSeeds(meals, 'meal', 'name')
	console.table('Refeições inseridas com sucesso.')

	// FINISHING
	console.table('Finalização da inserção das seeds 😁')
}

execSeeds()
