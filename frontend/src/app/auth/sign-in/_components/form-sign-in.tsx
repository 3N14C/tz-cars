'use client'

import { InputValidated } from '@/components/input-validated'
import { Button } from '@/components/ui/button'
import { signUpSchema } from '@/schemas/schema-sign-up'
import { AuthService } from '@/services/service-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const FormSignIn: FC = () => {
	const router = useRouter()
	const { mutateAsync, isPending } = useMutation({
		mutationFn: AuthService.signIn,
		onSuccess: () => {
			reset()
			router.replace('/')
		},
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
	})

	const onSunbmit = async (data: z.infer<typeof signUpSchema>) => {
		await mutateAsync(data)
	}

	return (
		<form
			onSubmit={handleSubmit(onSunbmit)}
			className='flex flex-col gap-10'
		>
			<InputValidated
				label='Электронный адрес'
				{...register('email')}
				type='email'
				error={errors.email?.message}
			/>
			<InputValidated
				label='Пароль'
				type='password'
				{...register('password')}
				error={errors.password?.message}
			/>

			<Button
				disabled={isPending}
				type='submit'
				className='py-7 text-lg'
			>
				{isPending ? <Loader2 className='animate-spin' /> : 'Войти'}
			</Button>
		</form>
	)
}
