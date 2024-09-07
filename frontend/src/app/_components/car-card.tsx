'use client'

import { useParseRub } from '@/hooks/use-parse-rub'
import { Car } from '@/interfaces/interface-car'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
	car: Car
}

export const CarCard: FC<Props> = ({ car }) => {
	const price = useParseRub(car.price)

	return (
		<div className='flex flex-col items-start gap-3'>
			<Link href={`/cars/${car.id}`}>
				<Image
					src={car.img}
					alt={car.name}
					width={1000}
					height={1000}
					className={cn(
						'w-[300px] h-[200px] border border-zinc-400 rounded-lg'
					)}
				/>
			</Link>

			<div className='flex flex-col gap-2'>
				<p>{car.name}</p>
				<p className='font-bold'>{price}</p>
			</div>
		</div>
	)
}
