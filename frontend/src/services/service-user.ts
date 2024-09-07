import { axiosInstance } from '@/configs/config-axios'
import { User } from '@/interfaces/interface-user'
import { getCookie } from './service-cookie'

export const UserService = {
	getProfile: async () => {
		const { token } = await getCookie()
		const response = await axiosInstance.get<User>('users/get-profile', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return response.data
	},
}
