import { z } from 'zod'

export const signUpSchema = z.object({
	email: z.string().email('Неверная почта'),
	password: z.string().min(6, 'Минимальная длина пароля 6 символов'),
})
