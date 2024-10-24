import type {
	CreateMealBody,
	MealBaseResponse,
	GetMealsFilters,
	GetMealsResponse,
	GetMealResponse,
	UpdateMealBody,
} from '~/@types/index'

export interface MealsInterfaceRepository {
	create(data: CreateMealBody): Promise<MealBaseResponse>
	findAllMeals(skip: number, limit: number, userId: number, filters: GetMealsFilters): Promise<GetMealsResponse>
	findMealById(mealId: number): Promise<GetMealResponse | null>
	findOneBy(field: string | number, value: string | number | undefined): Promise<MealBaseResponse | null>
	findByIdAndUpdate(id: number, data: UpdateMealBody): Promise<MealBaseResponse | null>
}
