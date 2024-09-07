import { axiosInstance } from '@/configs/config-axios'
import { Car } from '@/interfaces/interface-car'
import { FilterParams } from '@/interfaces/interface-filter-params'
import { getCookie } from './service-cookie'
import { IPagination } from '@/interfaces/interface-pagination'

export const CarService = {
	getAll: async (
		filterParams: FilterParams,
		pagination: IPagination
	) => {
		const queryParams = {
			orderBy: filterParams.orderBy ?? 'year',
			orderType: filterParams.orderType ?? 'desc',
			colorId: filterParams.colorId ?? [],
			brandId: filterParams.brandId ?? [],
			offset: pagination.offset,
			limit: pagination.limit,
		}
		const response = await axiosInstance.get<Car[]>('cars/get-all', {
			params: queryParams,
		})

		return response.data
	},

	getById: async (id: string) => {
		const response = await axiosInstance.get<Car>(`cars/get-by-id/${id}`)

		return response.data
	},

	create: async (data: FormData) => {
		const { token } = await getCookie()
		const response = await axiosInstance.post<Car>('cars/create', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return response.data
	},
}
