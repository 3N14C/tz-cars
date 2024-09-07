'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { useFilterParams } from "@/hooks/use-filter-params"
import { OrderType } from "@/interfaces/interface-filter-params"
import { ArrowDown, ArrowUp } from "lucide-react"
import { FC } from "react"

export const GlobalFilters: FC = () => {
  const { orderBy, orderType, setOrderBy, setOrderType } = useFilterParams()

  return (
		<div className='my-5 flex flex-col gap-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<Checkbox
						checked={orderBy === 'price'}
						onClick={() => setOrderBy('price')}
						className='w-4 h-4'
					/>
					<p>По цене</p>
				</div>
				{orderType === 'asc' && orderBy === 'price' ? (
					<ArrowUp
						onClick={() => {
							setOrderType(OrderType.DESC)
							setOrderBy('price')
						}}
						strokeWidth={1}
						size={20}
						className='cursor-pointer'
					/>
				) : (
					<ArrowDown
						onClick={() => {
							setOrderType(OrderType.ASC)
							setOrderBy('price')
						}}
						strokeWidth={1}
						size={20}
						className='cursor-pointer'
					/>
				)}
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<Checkbox
						checked={orderBy === 'year'}
						onClick={() => setOrderBy('year')}
						className='w-4 h-4'
					/>
					<p>По дате выпуска</p>
				</div>

				{orderType === 'asc' && orderBy === 'year' ? (
					<ArrowUp
						onClick={() => {
							setOrderType(OrderType.DESC)
							setOrderBy('year')
						}}
						strokeWidth={1}
						size={20}
						className='cursor-pointer'
					/>
				) : (
					<ArrowDown
						onClick={() => {
							setOrderType(OrderType.ASC)
							setOrderBy('year')
						}}
						strokeWidth={1}
						size={20}
						className='cursor-pointer'
					/>
				)}
			</div>
		</div>
	)
}
