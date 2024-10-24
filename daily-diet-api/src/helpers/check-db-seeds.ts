import type { PrismaClient } from '@prisma/client'
import prismaClient from '~/config/prisma-client'

export const checkingDBToInsertSeeds = async <T extends Record<string, any>>(
	arrayValues: T[],
	table: keyof PrismaClient,
	field: keyof T,
) => {
	for (const value of arrayValues) {
		const existingValue = await (prismaClient as Record<string, any>)[table as string].findFirst({
			where: { [field]: value[field] },
		})

		if (!existingValue) {
			await (prismaClient as Record<string, any>)[table as string].create({
				data: value,
			})
		}
	}
}
