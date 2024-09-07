'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { UserService } from '@/services/service-user'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { ModalAddCarForm } from './modal-add-car-form'
import { ScrollArea } from '@/components/ui/scroll-area'

export const ModalAddCar: FC = () => {
	const [open, setOpen] = useState<boolean>(false)
	const router = useRouter()
	const { data: user, isPending } = useQuery({
		queryKey: ['get-profile'],
		queryFn: UserService.getProfile,
	})

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<Button
				disabled={isPending}
				onClick={() => {
					if (!user) return router.push('/auth/sign-in')
					if (user?.role !== 'ADMIN') return router.push('/auth/sign-in')
					setOpen(true)
				}}
				className='py-7'
			>
				{isPending ? (
					<Loader2 className='animate-spin' />
				) : !user ? (
					'Войти'
				) : user && user.role === 'ADMIN' ? (
					'Добавить машину'
				) : (
					'Войти в аккаунт администратора'
				)}
			</Button>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Добавить машину</DialogTitle>
					<DialogDescription>Добавьте информацию о машине</DialogDescription>
				</DialogHeader>

				<ScrollArea className='h-[400px]'>
					<div className='w-full'>
						<ModalAddCarForm />
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}
