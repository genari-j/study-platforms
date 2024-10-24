import prismaClient from '~/config/prisma-client'

export class RestRepository {
	public readonly entity: string

	constructor(entity: string) {
		this.entity = entity
	}

	async create(data: {} = {}) {
		const result = await (prismaClient as Record<string, any>)[this.entity].create({
			data,
		})
		return result
	}

	async findOneBy(field: string | number, value: string | number) {
		if (!field || !value) {
			throw new Error('Campos não especificados.')
		}

		const result = await (prismaClient as Record<string, any>)[this.entity].findFirst({
			where: { [field]: value },
		})

		return result
	}

	async findAll(filters: Record<string, any> = {}) {
		const data = await (prismaClient as Record<string, any>)[this.entity].findMany({
			where: {
				active: true,
				deleted_at: null,
				...filters,
			},
		})

		return data
	}

	async findByIdAndUpdate(id: number, data: {} = {}) {
		if (!id) {
			throw new Error('ID não informado.')
		}

		const result = await (prismaClient as Record<string, any>)[this.entity].update({
			where: { id },
			data,
		})

		return result
	}
}
