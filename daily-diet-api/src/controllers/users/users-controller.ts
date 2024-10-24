import type { FastifyReply, FastifyRequest } from 'fastify'

import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import path from 'node:path'
import fs from 'node:fs'
import { mailService } from '~/services/emails/index'
import { cryptPassword, decodeRequestAuthToken } from '~/helpers/index'

import type {
	ProfilePermissionsInterfaceRepository,
	ProfilesInterfaceRepository,
	UsersInterfaceRepository,
} from '~/models/interfaces/index'

import type {
	ApiResponse,
	UserBaseResponse,
	GetUserResponse,
	GetUsersResponse,
	SignInTokenResponse,
	UpdateUserBody,
} from '~/@types/index'

import {
	env,
	userParamsSchema,
	getUsersFiltersQuerySchema,
	signInBodySchema,
	signUpBodySchema,
	updateUserBodySchema,
	recoveryPasswordSchema,
	setNewPasswordSchema,
	updateLoggedUserPswSchema,
} from '~/validators/index'

export class UsersController {
	private readonly usersRepository: UsersInterfaceRepository
	private readonly profilesRepository: ProfilesInterfaceRepository
	private readonly profilePermissionsRepository: ProfilePermissionsInterfaceRepository

	constructor(
		usersRepository: UsersInterfaceRepository,
		profilesRepository: ProfilesInterfaceRepository,
		profilePermissionsRepository: ProfilePermissionsInterfaceRepository,
	) {
		this.usersRepository = usersRepository
		this.profilesRepository = profilesRepository
		this.profilePermissionsRepository = profilePermissionsRepository
	}

	async verifyToken(request: FastifyRequest, reply: FastifyReply): Promise<ApiResponse | undefined> {
		try {
			const { authorization } = request.headers
			const user = await decodeRequestAuthToken(authorization)

			if (!user) {
				return reply.code(401).send({
					error: true,
					message: 'Não autorizado.',
				})
			}

			return reply.code(200).send({
				error: false,
				message: 'Requisição validada.',
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async userRecoveryPassword(request: FastifyRequest, reply: FastifyReply): Promise<ApiResponse | undefined> {
		try {
			const { email } = recoveryPasswordSchema.parse(request.body)

			const userByEmail = await this.usersRepository.findOneBy('email', email)
			if (!userByEmail) {
				return reply.code(404).send({
					error: true,
					message: 'O E-mail especificado não foi encontrado.',
				})
			}

			const token = jwt.sign(
				{
					sub: userByEmail?.id,
				},
				env.APP_SECRET as string,
				{
					expiresIn: env.EXP_RESET_PSW as string,
				},
			)

			const emailPath = path.resolve('src', 'services', 'emails', 'templates', 'user-recovery-psw.html')
			const [userFirstName] = userByEmail.name.split(' ')

			const html = fs
				.readFileSync(emailPath, { encoding: 'utf-8' })
				.replace('{{ emailLink }}', `${env.URL_FRONTEND}?token=${token}`)
				.replace('{{ name }}', userFirstName)

			await mailService(email, 'CallTrack - Recuperação de Senha', html)

			return reply.code(200).send({
				error: false,
				message: 'Um e-mail de recuperação de senha foi enviado.',
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async updateUserPassword(request: FastifyRequest, reply: FastifyReply): Promise<ApiResponse | undefined> {
		try {
			const { authorization } = request.headers
			const { password, confirmPassword } = setNewPasswordSchema.parse(request.body)

			const user = await decodeRequestAuthToken(authorization)

			if (!user) {
				return reply.code(404).send({
					error: true,
					message: 'O Usuário especificado não foi encontrado.',
				})
			}

			if (password !== confirmPassword) {
				return reply.code(400).send({
					error: true,
					message: 'As senhas especificadas não conferem.',
				})
			}

			if (password.length < 6) {
				return reply.code(400).send({
					error: true,
					message: 'A senha deve conter no mínimo 6 caracteres.',
				})
			}

			const encryptedPassword = await cryptPassword(password)
			const payload = { password: encryptedPassword }
			await this.usersRepository.findByIdAndUpdate(Number(user.id), payload)

			return reply.code(200).send({
				error: false,
				message: 'A senha foi atualizada.',
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async updateLoggedUserPassword(request: FastifyRequest, reply: FastifyReply): Promise<ApiResponse | undefined> {
		try {
			const { id } = userParamsSchema.parse(request.params)
			const { oldPsw, newPsw, confirmPsw } = updateLoggedUserPswSchema.parse(request.body)

			const userById = await this.usersRepository.findUserById(Number(id))

			const payload: UpdateUserBody = {}

			if (!userById) {
				return reply.code(404).send({
					error: true,
					message: 'O usuário especificado não existe.',
				})
			}

			const compareUserPassword = await bcryptjs.compare(String(oldPsw), String(userById.password))
			if (!compareUserPassword || newPsw !== confirmPsw) {
				return reply.code(400).send({
					error: true,
					message: 'As senhas não conferem.',
				})
			}

			const encryptedPassword = await cryptPassword(confirmPsw)
			if (confirmPsw) {
				payload.password = encryptedPassword
			}

			if (Object.keys(payload).length) {
				await this.usersRepository.findByIdAndUpdate(Number(id), payload)
			}

			return reply.code(200).send({
				error: false,
				message: 'Sua senha foi alterada.',
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async create(request: FastifyRequest, reply: FastifyReply): Promise<UserBaseResponse | undefined> {
		try {
			const { name, email, password, contact, profile_id } = signUpBodySchema.parse(request.body)

			const userByEmail = await this.usersRepository.findOneBy('email', email)
			if (userByEmail) {
				return reply.code(400).send({
					error: true,
					message: 'Erro ao utilizar este email.',
				})
			}

			const profileById = await this.profilesRepository.findOneBy('id', profile_id)
			if (!profileById) {
				return reply.code(404).send({
					error: true,
					message: 'O perfil informado não existe.',
				})
			}

			const cryptPsw = await cryptPassword(password)

			const payload = {
				name,
				email,
				password: cryptPsw,
				contact,
				profile_id,
			}
			const userCreated = await this.usersRepository.create(payload)

			return reply.code(201).send({
				error: false,
				data: userCreated,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async signIn(request: FastifyRequest, reply: FastifyReply): Promise<SignInTokenResponse | undefined> {
		try {
			const { email, password } = signInBodySchema.parse(request.body)

			const user = await this.usersRepository.findOneBy('email', email)
			console.log(user)

			if (!user || user.active !== true || user.deleted_at !== null) {
				return reply.code(401).send({
					error: true,
					message: 'Não autorizado.',
				})
			}

			const compareUserPassword = await bcryptjs.compare(String(password), String(user.password))
			if (!compareUserPassword) {
				return reply.code(401).send({
					error: true,
					message: 'Não autorizado.',
				})
			}

			const profiles = await this.profilePermissionsRepository.findOneBy('id', user.profile_id)

			const token = jwt.sign(
				{
					sub: user.id,
					name: user.name,
					email: user.email,
					contact: user.contact,
					profiles,
					active: user.active,
					avatar: user.avatar,
					created_at: user.created_at,
					updated_at: user.updated_at,
				},
				env.APP_SECRET as string,
				{ expiresIn: '12h' },
			)

			return reply.code(200).send({
				error: false,
				data: { token },
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetUsersResponse | undefined> {
		try {
			const { page = env.INITIAL_DATA_OFFSET, limit = env.LIST_PER_PAGE } = request.query as {
				page?: string
				limit?: string
			}
			const skip = (Number(page) - 1) * Number(limit)

			const { name } = getUsersFiltersQuerySchema.parse(request.query)
			const filters = { name }

			const { data, total, pages, currentPage } = await this.usersRepository.findAllUsers(skip, Number(limit), filters)

			const mappedUsers = data?.map((user) => {
				return {
					id: user.id,
					name: user.name,
					email: user.email,
					contact: user.contact,
					profile: {
						id: user.profile_id,
						name: user.profile.name,
						description: user.profile.description,
						active: user.profile.active,
						created_at: user.profile.created_at,
						updated_at: user.profile.updated_at,
					},
					avatar: user.avatar,
					active: user.active,
					created_at: user.created_at,
					updated_at: user.updated_at,
					deleted_at: user.deleted_at,
				}
			})

			return reply.code(200).send({
				error: false,
				data: mappedUsers,
				limit: Number(limit),
				total,
				pages,
				currentPage,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async getById(request: FastifyRequest, reply: FastifyReply): Promise<GetUserResponse | undefined> {
		try {
			const { id } = userParamsSchema.parse(request.params)

			const userById = await this.usersRepository.findUserById(Number(id))
			if (!userById) {
				return reply.code(404).send({
					error: true,
					message: 'O usuário especificado não existe.',
				})
			}

			const user = {
				id: userById.id,
				name: userById.name,
				email: userById.email,
				contact: userById.contact,
				profile: {
					id: userById.profile_id,
					name: userById.profile.name,
					description: userById.profile.description,
					active: userById.profile.active,
					created_at: userById.profile.created_at,
					updated_at: userById.profile.updated_at,
				},
				avatar: userById.avatar,
				active: userById.active,
				created_at: userById.created_at,
				updated_at: userById.updated_at,
				deleted_at: userById.deleted_at,
			}

			return reply.code(200).send({
				error: false,
				data: user,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async update(request: FastifyRequest, reply: FastifyReply): Promise<UserBaseResponse | undefined> {
		try {
			const { id } = userParamsSchema.parse(request.params)
			const { name, email, contact, profile_id, active } = updateUserBodySchema.parse(request.body)

			const userById = await this.usersRepository.findUserById(Number(id))
			if (!userById) {
				return reply.code(404).send({
					error: true,
					message: 'O usuário informado não existe.',
				})
			}

			const payload: UpdateUserBody = {}

			if (name) {
				payload.name = name
			}

			if (email) {
				const userByEmail = await this.usersRepository.findUserByFieldExcludingCurrent(Number(id), 'email', email)
				if (userByEmail) {
					return reply.code(400).send({
						error: true,
						message: 'O email informado já existe.',
					})
				}
				payload.email = email
			}

			if (contact) {
				payload.contact = contact
			}

			if (!profile_id) {
				payload.profile_id = userById.profile.id
			}

			if (profile_id) {
				if (userById.profile.name !== 'Admin') {
					return reply.code(400).send({
						error: true,
						message: 'Somente administradores podem alterar o Tipo de Perfil.',
					})
				}

				const profileById = await this.profilesRepository.findOneBy('id', profile_id)
				if (!profileById) {
					return reply.code(404).send({
						error: true,
						message: 'O perfil informado não existe.',
					})
				}

				payload.profile_id = profile_id
			}

			if (active || String(active) === '0') {
				payload.active = active
			}

			if (Object.keys(payload).length) {
				await this.usersRepository.findByIdAndUpdate(Number(id), payload)
			}

			return reply.code(200).send({
				error: false,
				message: 'O usuário foi atualizado.',
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async disable(request: FastifyRequest, reply: FastifyReply): Promise<UserBaseResponse | undefined> {
		try {
			const { id } = userParamsSchema.parse(request.params)

			if (!id) {
				return reply.code(400).send({
					error: true,
					message: 'ID do usuário não informado.',
				})
			}

			const user = await this.usersRepository.findOneBy('id', Number(id))
			if (!user) {
				return reply.code(404).send({
					error: true,
					message: 'O usuário informado não existe.',
				})
			}

			const payload = {
				active: false,
			}

			await this.usersRepository.findByIdAndUpdate(Number(id), payload)

			return reply.code(204).send()
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}
}
