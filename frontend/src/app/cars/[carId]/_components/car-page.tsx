'use client'

import { useParseRub } from '@/hooks/use-parse-rub'
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
	const price = useParseRub(car?.price ?? 0)

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center gap-10'>
				<Image
					src={car?.img ?? ''}
					alt={car?.name ?? ''}
					width={1000}
					height={1000}
					className={cn('w-[400px]')}
				/>

				<div className='flex flex-col gap-3'>
					<p className='text-xl'>Модель автомобиля: {car?.name}</p>
					<p className='text-xl'>Бренд автомобиля: {car?.brand.name}</p>
				</div>
			</div>

			<div className=''>
				<p className='text-xl font-bold'>Дополнительные характеристики</p>
				<p>Цвет автомобиля: {car?.color.name}</p>
				<p>Цена автомобиля: {price}</p>
				<p>Год выпуска автомобиля: {car?.year}</p>
				<p>Тип двигателя: {car?.motor}</p>
				<p>
					Тип трансмиссии:{' '}
					{car?.transmission && car?.transmission.length > 0
						? car?.transmission
						: '-'}
				</p>
				<p>
					Запас хода (в км):{' '}
					{car?.reserve && car?.reserve?.length > 0 ? car?.reserve : '-'}
				</p>
			</div>
		</div>
	)
}
