import { axiosInstance } from '@/configs/config-axios'
import { Color } from '@/interfaces/interface-color'

export const ColorService = {
	getAll: async () => {
    const response = await axiosInstance.get<Color[]>('colors/get-all')

    return response.data
	},
}
