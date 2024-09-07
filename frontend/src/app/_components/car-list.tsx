'use client'

import { CarService } from '@/services/service-car'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { CarCard } from './car-card'
import { useFilterParams } from '@/hooks/use-filter-params'
import { usePagination } from '@/hooks/use-pagination'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const CarList: FC = () => {
	const { limit, offset, page, toNextPage, toPreviousPage } = usePagination()
	const { orderBy, orderType, brandId, colorId } = useFilterParams()
	const { data: cars, isLoading } = useQuery({
		queryKey: ['get-all-cars', orderBy, orderType, brandId, colorId, page],
		queryFn: () =>
			CarService.getAll(
				{ brandId, colorId, orderBy, orderType },
				{ offset, limit }
			),
	})

	console.log('@offset', offset)
	console.log('@limit', limit)

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center gap-4'>
				<Button
					disabled={page === 1}
					onClick={toPreviousPage}
				>
					<ChevronLeft />
				</Button>
				<Button
					disabled={cars && cars?.length < limit}
					onClick={toNextPage}
				>
					<ChevronRight />
				</Button>
			</div>
			<div className='grid grid-cols-3 gap-10'>
				{cars?.map((car) => (
					<CarCard
						key={car.id}
						car={car}
					/>
				))}
			</div>
		</div>
	)
}
