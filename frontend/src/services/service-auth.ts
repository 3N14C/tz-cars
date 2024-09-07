import { axiosInstance } from '@/configs/config-axios'
import { User } from '@/interfaces/interface-user'
import { signInSchema } from '@/schemas/schema-sign-in'
import { signUpSchema } from '@/schemas/schema-sign-up'
import { z } from 'zod'
import { setCookie } from './service-cookie'

export const AuthService = {
	signUp: async (data: z.infer<typeof signUpSchema>) => {
		const response = await axiosInstance.post<{ user: User; token: string }>(
			'auth/sign-up',
			data
		)

		if (!response.data.token) throw new Error('User already exists')

		await setCookie(response.data.token)

		return response.data
	},

	signIn: async (data: z.infer<typeof signInSchema>) => {
		const response = await axiosInstance.post<{ user: User; token: string }>(
			'auth/sign-in',
			data
		)

		if (!response.data.token) throw new Error('Wrong email or password')

		await setCookie(response.data.token)

		return response.data
	},
}
