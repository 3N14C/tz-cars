'use client'

import { cn } from '@/lib/utils'
import { CarService } from '@/services/service-car'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
	carId: string
}

export const CarPage: FC<Props> = ({ carId }) => {
	const { data: car, isLoading } = useQuery({
		queryKey: ['get-car', carId],
		queryFn: () => CarService.getById(carId),
	})

	return (
		<div className='flex items-center justify-between'>
			<Image
				src={car?.img ?? ''}
				alt={car?.name ?? ''}
				width={1000}
				height={1000}
				className={cn('w-[400px]')}
			/>

			<div className='flex flex-col gap-3'>
				<p>{car?.name}</p>
				<p>{car?.brand?.name}</p>
			</div>
		</div>
	)
}
